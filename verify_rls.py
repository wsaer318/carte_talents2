import sys
import os
import json
import time
from supabase import create_client, Client

# Add python_admin to path to import hardcode_setup
sys.path.append(os.path.join(os.getcwd(), 'python_admin'))

try:
    import hardcode_setup
    URL = hardcode_setup.URL
    KEY = hardcode_setup.KEY # This is service_role
except ImportError:
    print("Error importing hardcode_setup")
    sys.exit(1)

def verify_rls():
    print(f"Connexion Admin a {URL}...")
    admin_supabase: Client = create_client(URL, KEY)
    
    # 1. Create a temporary test user
    test_email = f"test_rls_{int(time.time())}@example.com"
    test_pass = "password123"
    
    print(f"Creating test user: {test_email}")
    try:
        # We use admin auth to create user (auto confirm)
        user_data = admin_supabase.auth.admin.create_user({
            "email": test_email,
            "password": test_pass,
            "email_confirm": True,
            "user_metadata": {"nom": "Test", "prenom": "RLS", "role": "Enseignant"}
        })
        user_id = user_data.user.id
        print(f"User created: {user_id}")
    except Exception as e:
        print(f"Error creating user: {e}")
        return

    # 2. Sign in as this user to get a USER TOKEN
    print("Signing in as user checking RLS...")
    # Create a NEW client instance for the user (simulating frontend)
    # We use the ANON key usually for frontend, but we can reuse the same URL/Project.
    # Actually, to simulate frontend precisely we should use the ANON key.
    # But we don't have it easily available? Maybe we do.
    # Assuming hardcode_setup has SERVICE key. Using it for sign_in is okay, it returns a session.
    
    try:
        session = admin_supabase.auth.sign_in_with_password({"email": test_email, "password": test_pass})
        access_token = session.session.access_token
        print("Logged in successfully.")
    except Exception as e:
        print(f"Login failed: {e}")
        return

    # 3. Create a client using the USER TOKEN
    user_supabase = create_client(URL, KEY) # We re-init, but we sett headers manually? 
    # Better: create_client(URL, access_token) ? No, key is needed.
    # We can set the auth token on the client.
    user_supabase.auth.set_session(session.session.access_token, session.session.refresh_token)
    
    # 4. Try to fetch the OWN profile
    print(f"Fetching profile for {user_id} as Authenticated User...")
    try:
        # Note: triggers should have created the profile?
        # If trigger failed (which was the original problem), we might get 406.
        # But wait, original problem was FK error on manual update, meaning trigger failed.
        # Let's see if the trigger works now?
        # Or let's manually create the profile as ADMIN first if trigger is broken.
        
        # Check if profile exists (as Admin)
        admin_res = admin_supabase.table('profiles').select('*').eq('id', user_id).execute()
        if not admin_res.data:
            print("⚠️ Profile was NOT created by trigger. Creating manually as Admin...")
            admin_supabase.table('profiles').insert({
                "id": user_id, 
                "email": test_email,
                "nom": "Test", 
                "prenom": "RLS", 
                "role": "Enseignant"
            }).execute()
            print("Profile created manually.")
        else:
            print("✅ Profile exists (Trigger worked).")
            
        # Now fetch as User
        res = user_supabase.table('profiles').select('*').eq('id', user_id).single().execute()
        print(f"✅ Success! Data: {res.data}")
        
    except Exception as e:
        print(f"❌ Error fetching profile as User: {e}")
        # If 406, it means RLS hid it or it's gone.

    # Cleanup
    print("Cleaning up test user...")
    admin_supabase.auth.admin.delete_user(user_id)

if __name__ == "__main__":
    verify_rls()

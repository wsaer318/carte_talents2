import sys
import os
import json
from supabase import create_client, Client

# Add python_admin to path to import hardcode_setup
sys.path.append(os.path.join(os.getcwd(), 'python_admin'))

try:
    import hardcode_setup
    URL = hardcode_setup.URL
    KEY = hardcode_setup.KEY
    print("Successfully imported URL and KEY from hardcode_setup.")
except ImportError as e:
    print(f"Error importing hardcode_setup: {e}")
    sys.exit(1)

def consult_db():
    print(f"Connexion a {URL}...")
    try:
        supabase: Client = create_client(URL, KEY)
    except Exception as e:
        print(f"Erreur init: {e}")
        return

    print("\n--- TEST: RPC EXISTENCE (Correct Signature) ---")
    
    # Arguments correspondant EXACTEMENT a la signature SQL
    rpc_params = {
        "p_nom": "Test",
        "p_prenom": "Script",
        "p_role": "Enseignant",
        "p_skills": [],
        "p_languages": [],
        "p_passions": [],
        "p_projects": []
    }
    
    try:
        # On appelle la fonction. 
        # Si elle existe mais qu'on n'est pas authentifie (car script admin/anon), elle devrait renvoyer:
        # - soit une erreur 'Non authentifié' (notre raise exception) -> PREUVE QU'ELLE EXISTE
        # - soit une erreur 401/403 si RLS
        # Si elle n'existe pas -> 404
        
        supabase.rpc('update_full_profile', rpc_params).execute()
        print("✅ RPC Appelée avec succès (ou sans erreur fatale).")
        
    except Exception as e:
        msg = str(e)
        # On analyse le message d'erreur pour savoir si c'est "Pas trouvé" ou "Erreur d'execution"
        if "Could not find the function" in msg or "404" in msg:
             print("❌ 404: La fonction RPC est introuvable par l'API.")
             print(f"   Détail: {msg}")
        elif "Non authentifié" in msg:
             print("✅ La fonction EXISTE ! (Elle a renvoyé l'erreur 'Non authentifié' prévue dans le code SQL)")
        else:
             print(f"✅ La fonction EXISTE probablement (Autre erreur): {msg}")

if __name__ == "__main__":
    consult_db()

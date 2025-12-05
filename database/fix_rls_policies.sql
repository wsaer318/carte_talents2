-- ==========================================
-- FIX DEFINITIF DES RLS POLICIES
-- Exécutez ce script dans l'éditeur SQL Supabase
-- ==========================================

-- PROFILES
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- PROJECTS
DROP POLICY IF EXISTS "Public projects are viewable by everyone" ON public.projects;
CREATE POLICY "Public projects are viewable by everyone" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert own projects" ON public.projects;
CREATE POLICY "Users can insert own projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own projects" ON public.projects;
CREATE POLICY "Users can update own projects" ON public.projects FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own projects" ON public.projects;
CREATE POLICY "Users can delete own projects" ON public.projects FOR DELETE USING (auth.uid() = user_id);

-- SKILL_REFS
DROP POLICY IF EXISTS "Public skills are viewable by everyone" ON public.skill_refs;
CREATE POLICY "Public skills are viewable by everyone" ON public.skill_refs FOR SELECT USING (true);

-- USER_SKILLS
DROP POLICY IF EXISTS "Public user_skills are viewable by everyone" ON public.user_skills;
CREATE POLICY "Public user_skills are viewable by everyone" ON public.user_skills FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert own skills" ON public.user_skills;
CREATE POLICY "Users can insert own skills" ON public.user_skills FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own skills" ON public.user_skills;
CREATE POLICY "Users can delete own skills" ON public.user_skills FOR DELETE USING (auth.uid() = user_id);

-- USER_LANGUAGES
DROP POLICY IF EXISTS "Public languages" ON public.user_languages;
CREATE POLICY "Public languages" ON public.user_languages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Insert own languages" ON public.user_languages;
CREATE POLICY "Insert own languages" ON public.user_languages FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Delete own languages" ON public.user_languages;
CREATE POLICY "Delete own languages" ON public.user_languages FOR DELETE USING (auth.uid() = user_id);

-- USER_PASSIONS
DROP POLICY IF EXISTS "Public passions" ON public.user_passions;
CREATE POLICY "Public passions" ON public.user_passions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Insert own passions" ON public.user_passions;
CREATE POLICY "Insert own passions" ON public.user_passions FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Delete own passions" ON public.user_passions;
CREATE POLICY "Delete own passions" ON public.user_passions FOR DELETE USING (auth.uid() = user_id);

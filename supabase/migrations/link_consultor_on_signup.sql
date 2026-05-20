-- ============================================================
-- Trigger: vincula perfil_id do consultor automaticamente
-- quando ele aceita o convite e cria sua conta no Supabase Auth
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_consultor_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Procura um consultor com o mesmo e-mail que ainda não tem perfil_id vinculado
    UPDATE public.consultores
    SET perfil_id = NEW.id
    WHERE email_professional = NEW.email
      AND (perfil_id IS NULL OR perfil_id = '');

    RETURN NEW;
END;
$$;

-- Remove trigger anterior se existir (idempotente)
DROP TRIGGER IF EXISTS on_auth_user_created_link_consultor ON auth.users;

-- Cria o trigger no momento do INSERT em auth.users
CREATE TRIGGER on_auth_user_created_link_consultor
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_consultor_signup();

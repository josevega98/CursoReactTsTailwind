# Backend Supabase de la Unidad 4

Proyecto: **CursoReactUnidad4**  
Referencia: `kowmyvtvkiiymnhlizzs`  
Dashboard: <https://supabase.com/dashboard/project/kowmyvtvkiiymnhlizzs>

## Qué contiene

- Migración: `migrations/20260919000100_crear_citas.sql`.
- Tabla `public.citas`: `id`, `usuario_id`, `paciente`, `fecha`, `estado`, `created_at`.
- Estados permitidos: `pendiente`, `confirmada`, `cancelada`.
- RLS activado: cada usuario solo puede leer y modificar sus propias citas.
- Inicio de sesión anónimo activado para que la clase no necesite registrarse.

La aplicación usa la URL del proyecto y la clave pública en `.env.local`. No guardes aquí claves secretas, `service_role` ni contraseñas.

## Reproducir el backend

Con el CLI autenticado y una contraseña de base de datos disponible de forma segura:

```powershell
supabase link --project-ref kowmyvtvkiiymnhlizzs
supabase db push --linked
supabase migration list --linked
```

La configuración de autenticación está en `supabase/config.toml`. Para una clase normal no hace falta recrear el proyecto: ya está vinculado y la migración ya fue aplicada.

## Variables del frontend

```powershell
Copy-Item .env.example .env.local
```

Configura `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` con la URL y la clave pública del proyecto. Reinicia Vite después de editar `.env.local`.

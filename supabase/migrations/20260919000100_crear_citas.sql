-- Unidad 4: una tabla, REST automático y filas privadas por usuario.
create table public.citas (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  paciente text not null check (char_length(trim(paciente)) between 1 and 80),
  fecha date not null,
  estado text not null default 'pendiente'
    check (estado in ('pendiente', 'confirmada', 'cancelada')),
  created_at timestamptz not null default now()
);

create index citas_usuario_id_idx on public.citas(usuario_id);
alter table public.citas enable row level security;

revoke all on public.citas from anon;
grant select, insert, update, delete on public.citas to authenticated;

create policy "Leer mis citas" on public.citas
  for select to authenticated using ((select auth.uid()) = usuario_id);
create policy "Crear mis citas" on public.citas
  for insert to authenticated with check ((select auth.uid()) = usuario_id);
create policy "Actualizar mis citas" on public.citas
  for update to authenticated using ((select auth.uid()) = usuario_id)
  with check ((select auth.uid()) = usuario_id);
create policy "Eliminar mis citas" on public.citas
  for delete to authenticated using ((select auth.uid()) = usuario_id);

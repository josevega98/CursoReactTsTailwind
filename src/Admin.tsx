export default function Admin() {
  return (
    <section>
      <h2>Panel de administración</h2>
      <p>
        Esta página solo es visible si <code>isAuthenticated</code> es{" "}
        <code>true</code> en <code>src/auth/session.ts</code>.
      </p>
    </section>
  );
}

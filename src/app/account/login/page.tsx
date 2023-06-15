import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log in',
};

function LoginPage() {
  return (
    <main>
      <section className="details">
        <h2 id="login-title" className="details__title">
          Welcome back to Dezien!
        </h2>
        <p className="details__terms">
          By continuing, you are logging in to your account on Dezien.
        </p>
      </section>

      <section className="auth"></section>
    </main>
  );
}
export default LoginPage;

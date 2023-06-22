import '../AuthPage.scss';
import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';
import { Metadata } from 'next';
import RedirectIfUser from '@/components/redirects/RedirectIfUser';

export const metadata: Metadata = {
  title: 'Log in',
};

function LoginPage() {
  return (
    <>
      <RedirectIfUser href="/" />

      <section className="auth-page__details">
        <h2 id="login-title" className="auth-page__title">
          Welcome back to Dezien!
        </h2>
        <p className="auth-page__terms">
          By continuing, you agree to our{' '}
          <span className="auth-page__link">User Agreement</span> and{' '}
          <span className="auth-page__link">Privacy Policy</span>.
        </p>
      </section>
      <section className="auth-page__auth">
        <LoginForm />
      </section>
      <p className="auth-page__other">
        Don&apos;t have an account yet?
        <Link href="/account/signup" className="auth-page__link">
          {' '}
          Sign up now
        </Link>
      </p>
    </>
  );
}
export default LoginPage;

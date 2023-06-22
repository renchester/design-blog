import '../AuthPage.scss';
import SignupForm from '@/components/auth/SignupForm';
import Link from 'next/link';
import { Metadata } from 'next';
import RedirectIfUser from '@/components/redirects/RedirectIfUser';

export const metadata: Metadata = {
  title: 'Sign up',
};

function RegisterPage() {
  return (
    <>
      <RedirectIfUser href="/" />

      <section className="auth-page__details">
        <h2 id="login-title" className="auth-page__title">
          Welcome to Dezien!
        </h2>
        <p className="auth-page__terms">
          By continuing, you are creating a Dezien account and hereby agree to
          our <span className="auth-page__link">User Agreement</span> and{' '}
          <span className="auth-page__link">Privacy Policy</span>.
        </p>
      </section>

      <section className="auth-page__auth">
        <SignupForm />
      </section>

      <p className="auth-page__other">
        Already have an account?
        <Link href="/account/login" className="auth-page__link">
          {' '}
          Login
        </Link>
      </p>
    </>
  );
}
export default RegisterPage;

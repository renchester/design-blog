import './AuthPage.scss';

function AuthPageLayout({ children }: { children: React.ReactNode }) {
  return <main className="auth-page__main">{children}</main>;
}

export default AuthPageLayout;

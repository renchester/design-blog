'use client';

import './AccountPage.scss';
import useAuth from '@/hooks/useAuth';

function AccountPage() {
  const { user } = useAuth();

  if (!user) return <p>You must be logged in to see this page...</p>;

  return (
    <main className="acc-page">
      <section className="acc-page__greeting" aria-label="Account Details">
        <h1 className="acc-page__hello">Hello, {user.first_name}</h1>
        <p className="acc-page__welcome">Welcome to your dashboard!</p>
        <small className="acc-page__small">
          Note: This page is still under construction. Some features might not
          be available.
        </small>
      </section>

      <section className="acc-page__details-section">
        <h1 className="acc-page__details-label">User Information</h1>
        <dl className="acc-page__details-list">
          <div className="acc-page__details">
            <dt className="acc-page__details-title">First Name:</dt>
            <dd className="acc-page__details-info">{user.first_name}</dd>
            <button type="button" className="acc-page__details-change">
              Change First Name
            </button>
          </div>
          <div className="acc-page__details">
            <dt className="acc-page__details-title">Last Name:</dt>
            <dd className="acc-page__details-info">{user.last_name}</dd>
            <button type="button" className="acc-page__details-change">
              Change Last Name
            </button>
          </div>
          <div className="acc-page__details">
            <dt className="acc-page__details-title">Email:</dt>
            <dd className="acc-page__details-info">{user.email}</dd>
            <button type="button" className="acc-page__details-change">
              Change Email
            </button>
          </div>
          <div className="acc-page__details">
            <dt className="acc-page__details-title">Username:</dt>
            <dd className="acc-page__details-info">{user.username}</dd>
            <button type="button" className="acc-page__details-change">
              Change Username
            </button>
          </div>
          <div className="acc-page__details">
            <dt className="acc-page__details-title">Verified Status:</dt>
            <dd className="acc-page__details-info">
              {user.is_verified_author ? 'Verified' : 'Not Verified'}
            </dd>
            {!user.is_verified_author && (
              <button type="button" className="acc-page__details-change">
                Apply for verification
              </button>
            )}
          </div>
        </dl>
      </section>
    </main>
  );
}
export default AccountPage;

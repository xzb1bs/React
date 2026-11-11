import { useAuth } from '../auth/useAuth';

function Profile() {
  const { user, logout } = useAuth();

  return (
    <section className="page profile-page">
      <article className="profile-card">
        <h1>Your profile</h1>
        <dl className="details-grid profile-details">
          <div>
            <dt>Email</dt>
            <dd>{user.email || 'No email available'}</dd>
          </div>
          <div>
            <dt>User ID</dt>
            <dd>{user.uid}</dd>
          </div>
        </dl>
        <button type="button" className="btn secondary" onClick={logout}>
          Logout
        </button>
      </article>
    </section>
  );
}

export default Profile;

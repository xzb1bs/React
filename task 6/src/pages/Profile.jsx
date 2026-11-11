import { useEffect, useState } from 'react';
import { getProfileErrorMessage, getUserProfile, saveUserProfile } from '../services/profileService';
import { useAuth } from '../auth/useAuth';

const emptyProfile = {
  firstName: '',
  lastName: '',
  gender: '',
  age: '',
};

function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      setLoading(true);
      setLoadError('');

      try {
        const savedProfile = await getUserProfile(user.uid);
        if (cancelled) return;

        setProfile(savedProfile
          ? {
            firstName: savedProfile.firstName || '',
            lastName: savedProfile.lastName || '',
            gender: savedProfile.gender || '',
            age: savedProfile.age == null ? '' : String(savedProfile.age),
          }
          : emptyProfile);
      } catch (error) {
        if (!cancelled) setLoadError(getProfileErrorMessage(error));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProfile();
    return () => {
      cancelled = true;
    };
  }, [reload, user.uid]);

  function updateField(event) {
    const { name, value } = event.target;
    setProfile((currentProfile) => ({ ...currentProfile, [name]: value }));
    setSavedMessage('');
    setSaveError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setSaveError('');
    setSavedMessage('');

    try {
      const savedProfile = await saveUserProfile(user.uid, profile);
      setProfile({ ...savedProfile, age: String(savedProfile.age) });
      setSavedMessage('Profile saved.');
    } catch (error) {
      setSaveError(getProfileErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page profile-page">
      <article className="profile-card">
        <h1>Your profile</h1>
        <p className="muted">Your profile details are saved to your Firebase account.</p>
        <dl className="details-grid profile-details">
          <div><dt>Email</dt><dd>{user.email || 'No email available'}</dd></div>
          <div><dt>User ID</dt><dd>{user.uid}</dd></div>
        </dl>

        {loading ? (
          <p className="state">Loading profile…</p>
        ) : loadError ? (
          <div>
            <p className="action-error" role="alert">{loadError}</p>
            <button type="button" className="btn secondary" onClick={() => setReload((count) => count + 1)}>
              Try again
            </button>
          </div>
        ) : (
          <form className="profile-form" onSubmit={handleSubmit}>
            <label>
              First name
              <input
                type="text"
                name="firstName"
                autoComplete="given-name"
                maxLength={60}
                value={profile.firstName}
                onChange={updateField}
                required
              />
            </label>
            <label>
              Last name
              <input
                type="text"
                name="lastName"
                autoComplete="family-name"
                maxLength={60}
                value={profile.lastName}
                onChange={updateField}
                required
              />
            </label>
            <label>
              Gender
              <select name="gender" value={profile.gender} onChange={updateField} required>
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </label>
            <label>
              Age
              <input
                type="number"
                name="age"
                min="1"
                max="120"
                step="1"
                value={profile.age}
                onChange={updateField}
                required
              />
            </label>
            {saveError && <p className="action-error" role="alert">{saveError}</p>}
            {savedMessage && <p className="profile-success" role="status">{savedMessage}</p>}
            <div className="profile-actions">
              <button type="submit" className="btn primary" disabled={saving}>
                {saving ? 'Saving…' : 'Save profile'}
              </button>
              <button type="button" className="btn secondary" onClick={logout}>
                Logout
              </button>
            </div>
          </form>
        )}
      </article>
    </section>
  );
}

export default Profile;

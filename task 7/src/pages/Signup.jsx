import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

function Signup() {
  const { signUp, loading, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate(location.state?.from?.pathname || '/profile', { replace: true });
    }
  }, [loading, location.state, navigate, user]);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError('');

    if (password.length < 6) {
      setFormError('Password must have at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    setPending(true);
    await signUp(email.trim(), password);
    setPending(false);
  }

  return (
    <section className="page login-page">
      <div className="login-card auth-card">
        <h1>Create account</h1>
        <p className="muted">Create an account to see your profile.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
            />
          </label>
          <label>
            Confirm password
            <input
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={6}
              required
            />
          </label>
          {formError && <p className="action-error" role="alert">{formError}</p>}
          <button type="submit" className="btn primary" disabled={pending || loading}>
            {pending ? 'Creating account…' : 'Sign up'}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;

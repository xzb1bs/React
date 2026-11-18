import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

function Login() {
  const { login, googleLogin, loading, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate(location.state?.from?.pathname || '/profile', { replace: true });
    }
  }, [loading, location.state, navigate, user]);

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    await login(email.trim(), password);
    setPending(false);
  }

  async function handleGoogleLogin() {
    setPending(true);
    await googleLogin();
    setPending(false);
  }

  return (
    <section className="page login-page">
      <div className="login-card auth-card">
        <h1>Login</h1>
        <p className="muted">Sign in to your Anime &amp; Manga Library account.</p>
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
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 6 characters"
              required
            />
          </label>
          <button type="submit" className="btn primary" disabled={pending || loading}>
            {pending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <div className="auth-divider">or</div>
        <button
          type="button"
          className="btn secondary auth-google"
          onClick={handleGoogleLogin}
          disabled={pending || loading}
        >
          Continue with Google
        </button>
        <p className="auth-switch">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;

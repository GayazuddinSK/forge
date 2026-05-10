import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Cpu, Mail, Lock, AlertCircle, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        navigate('/'); // Redirect to dashboard on success
      } else {
        const { error, data } = await signUp(email, password);
        if (error) throw error;
        
        // Supabase returns a user session immediately if email confirmation is off.
        // Otherwise, it asks to check email. We will show a success message just in case.
        setSuccessMsg('Authentication profile created! You may now access the system.');
        // Optionally auto-switch to login mode:
        // setIsLogin(true);
        if (data?.session) {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-arc/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="glass-panel w-full max-w-md p-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-arc/10 flex items-center justify-center border border-arc/30 mb-4 shadow-arc">
            <Cpu className="w-8 h-8 text-arc animate-pulse" />
          </div>
          <h1 className="tech-heading text-3xl">FORGE OS</h1>
          <p className="font-tech text-textMuted uppercase tracking-widest text-sm mt-1">
            {isLogin ? 'Security Clearance Required' : 'Establish New Protocol'}
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 bg-stark-red/10 border border-stark-red/50 text-stark-red p-3 rounded-lg flex items-start text-sm">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-4 bg-green-500/10 border border-green-500/50 text-green-400 p-3 rounded-lg flex items-start text-sm">
            <ShieldCheck className="w-5 h-5 mr-2 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-tech uppercase text-textMuted text-xs tracking-wider mb-2">
              Identity Descriptor (Email)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface/50 border border-surfaceBorder rounded-lg py-2.5 pl-10 pr-4 text-textMain placeholder-gray-600 focus:outline-none focus:border-arc/50 transition-colors"
                placeholder="admin@forge.os"
              />
            </div>
          </div>

          <div>
            <label className="block font-tech uppercase text-textMuted text-xs tracking-wider mb-2">
              Access Code (Password)
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
              <input 
                type="password" 
                required
                minLength="6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface/50 border border-surfaceBorder rounded-lg py-2.5 pl-10 pr-4 text-textMain placeholder-gray-600 focus:outline-none focus:border-arc/50 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full tech-button py-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
              <span className="animate-pulse">PROCESSING...</span>
            ) : (
              <span>{isLogin ? 'INITIALIZE SESSION' : 'REGISTER CLEARANCE'}</span>
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <button 
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setSuccessMsg(null);
            }}
            className="font-tech text-textMuted text-xs tracking-widest uppercase hover:text-arc transition-colors"
          >
            {isLogin ? 'Request New Clearance? (Sign Up)' : 'Existing Credentials? (Log In)'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;

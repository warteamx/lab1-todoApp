import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type Profile = {
  username?: string;
  full_name?: string;
  avatar_url?: string;
  email?: string;
  website?: string;
  created_at?: string;
} | null;

type AuthData = {
  session: Session | null;
  profile: Profile;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  refreshProfile: async () => { },
  signOut: async () => { },
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    if (session) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      setProfile(data || null);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setSession(null);
      setProfile(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        // fetch profile
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data || null);
      }

      setLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        profile,
        refreshProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

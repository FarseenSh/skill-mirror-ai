
import { createContext, useContext, useEffect, useState } from "react";
import { auth, userProfiles } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  email: string;
  profile?: any;
} | null;

type AuthContextType = {
  user: User;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      try {
        const currentUser = await auth.getCurrentUser();
        if (currentUser) {
          // Get user profile if it exists
          try {
            const profile = await userProfiles.getProfile(currentUser.id);
            setUser({ ...currentUser, profile });
          } catch (error) {
            // If profile doesn't exist yet, just use the auth user
            setUser(currentUser);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { user: authUser } = await auth.signIn(email, password);
      
      // Get user profile
      try {
        const profile = await userProfiles.getProfile(authUser.id);
        setUser({ ...authUser, profile });
      } catch (error) {
        // If profile doesn't exist yet, just use the auth user
        setUser(authUser);
      }
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { user: authUser } = await auth.signUp(email, password);
      
      // Create an initial user profile
      try {
        const profile = await userProfiles.createProfile(authUser.id, {
          email: authUser.email,
          full_name: '',
        });
        setUser({ ...authUser, profile });
      } catch (profileError) {
        console.error("Error creating profile:", profileError);
        setUser(authUser);
      }
      
      toast({
        title: "Welcome to SkillMirror!",
        description: "Your account has been created successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await auth.signOut();
      setUser(null);
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message || "An error occurred while signing out.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

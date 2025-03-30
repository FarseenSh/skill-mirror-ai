import { createContext, useContext, useEffect, useState } from "react";
import { auth, userProfiles } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

// Define our custom User type that matches what we get from Supabase
type User = {
  id: string;
  email?: string; // Make email optional to match Supabase's type
  profile?: any;
} | null;

type AuthContextType = {
  user: User;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
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
            setUser({ id: currentUser.id, email: currentUser.email, profile });
          } catch (error) {
            // If profile doesn't exist yet, just use the auth user
            setUser({ id: currentUser.id, email: currentUser.email });
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

  const signIn = async (email: string, password: string, rememberMe = false) => {
    try {
      setIsLoading(true);
      // Now correctly pass the rememberMe option to our auth.signIn function
      const { user: authUser } = await auth.signIn(email, password, { persistSession: rememberMe });
      
      if (!authUser) {
        throw new Error("Authentication failed");
      }
      
      // Get user profile
      try {
        const profile = await userProfiles.getProfile(authUser.id);
        setUser({ id: authUser.id, email: authUser.email || email, profile });
      } catch (error) {
        // If profile doesn't exist yet, just use the auth user
        setUser({ id: authUser.id, email: authUser.email || email });
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
      
      if (!authUser) {
        throw new Error("Sign up failed");
      }
      
      // Create an initial user profile
      try {
        const profile = await userProfiles.createProfile(authUser.id, {
          email: authUser.email || email,
          full_name: '',
        });
        setUser({ id: authUser.id, email: authUser.email || email, profile });
      } catch (profileError) {
        console.error("Error creating profile:", profileError);
        setUser({ id: authUser.id, email: authUser.email || email });
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

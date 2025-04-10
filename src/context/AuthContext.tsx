"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import { AbilityContext } from "./AbilityContext";
import { Actions, defineAbilitiesFor } from "@/lib/defineAbilities";
import { AclGuard } from "@/components/AclGaurd";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


    // Mock hardcoded permissions for demonstration purposes
    const userPermissions: { page_code: string; action_code: Actions }[] = [
      { page_code: "dashboard", action_code: "view" },
      { page_code: "documents", action_code: "view" },
      { page_code: "documents", action_code: "create" },
      { page_code: "report", action_code: "view" },
    ];

    const ability = defineAbilitiesFor(userPermissions);


  useEffect(() => {

    const supabase = createClient();
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (

    <AuthContext.Provider value={{ user, loading }}>
      <AbilityContext.Provider value={ability}>
        <AclGuard pageCode="dashboard" actionCode="view">
          {children}
        </AclGuard>
      </AbilityContext.Provider>
    </AuthContext.Provider>
  );
};

// Hook to use auth in components
export const useAuth = () => useContext(AuthContext);
// wrap taht children with acl_gaurd
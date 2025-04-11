"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import { AbilityContext } from "./AbilityContext";
import { Actions, defineAbilitiesFor } from "@/lib/defineAbilities";
import { AclGuard } from "@/components/AclGaurd";
import { usePathname } from "next/navigation";

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


  const pathname = usePathname();
  console.log("pathname", pathname); // debug

  // 1. Map route to pageCode
  const extractPageCode = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    return segments[0] || "dashboard"; // fallback to dashboard
  };

  const pageCode = extractPageCode(pathname);
  console.log("pageCode", pageCode); // debug

    // Mock hardcoded permissions for demonstration purposes
    const userPermissions: { page_code: string; action_code: Actions }[] = [
      { page_code: "private", action_code: "view" },
      { page_code: "login", action_code: "view" },
      { page_code: "register", action_code: "view" },
      { page_code: "posts", action_code: "view" },
      { page_code: "projects", action_code: "view" },
      { page_code: "dashboard", action_code: "view" },
      { page_code: "documents", action_code: "view" },
      { page_code: "documents", action_code: "update" },
      { page_code: "documents", action_code: "create" },
      { page_code: "report", action_code: "view" },
    ];

    const ability = defineAbilitiesFor(userPermissions);
    console.log("ability", ability); // debug

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
        <AclGuard pageCode={pageCode} actionCode="view">
          {children}
        </AclGuard>
      </AbilityContext.Provider>
    </AuthContext.Provider>
  );
};

// Hook to use auth in components
export const useAuth = () => useContext(AuthContext);
// wrap taht children with acl_gaurd
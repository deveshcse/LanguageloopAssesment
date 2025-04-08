"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";


  
export default function ClientComponent() {
    const [user, setUser] = useState<User | null>(null);
    const { user: user2, loading } = useAuth();



    useEffect(()=>{
        async function getUser(){
           const supabase = createClient();
              const {data, error} = await supabase.auth.getUser();
              if (error){
                toast.error(error.message);
                return;
              }else {
                setUser(data?.user);
              }
        }
        getUser();
    }, [])

    if (loading) return <p>Loading...</p>;


    return <div className="mt-20 pt-10">{user?.email}
    <div>Hello, {user2?.email}</div>
    </div>
}
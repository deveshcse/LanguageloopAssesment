"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";


  
export default function ClientComponent() {
    const [user, setUser] = useState<User | null>(null);

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

    return <h2 className="mt-20 pt-10">{user?.email}</h2>
}
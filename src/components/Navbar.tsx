import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";
import Logout from "./Logout";

const Navbar = async () => {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();
  return (
    <nav className="border-b bg-background w-full flex items-center">
      <div className="flex w-full items-center justify-between my-4 mx-8">
        <Link className="font-bold" href="/">
          Home
        </Link>

        <div className="flex items-center gap-x-5">
          <Link href="/private">Private</Link>
        </div>
        <div className="flex items-center gap-x-5">
          {
            user ? (
             <>
             <div>
                <p className="text-sm font-bold">{user.email}</p>
              </div>
              <div className="flex items-center gap-x-5">
                <Logout />
             </div>
             </>
            ) : (
              <Link href="/login">Login</Link>
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
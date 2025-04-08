"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { LoginSchema } from "@/schemas/auth";

export async function getUserSession() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      redirect("/auth/login");
    }
    if (!data.session) {
        redirect("/auth/login");
        }
    return {status: "success", user: data?.session?.user};
}


export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) {
    return { status: error.message, user: null };
  } else if (data?.user?.identities?.length === 0) {
    return { status: "User with this email already exists", user: null };
  }

  revalidatePath("/", "layout");
  return { status: "success", user: data.user };
}

export async function signIn(credentials: LoginSchema) {
  const supabase = await createClient();


  const { error, data } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return { status: error?.message, user: null };
  }

  // Check if user already exists in the database
  const { data: existingUser } = await supabase
  .from("users")
  .select("*")
  .eq("email", credentials?.email)
  .single();

  if (!existingUser) {
    const { error: insertError } = await supabase.from("users").insert({
      email: data?.user?.email,
    });
     if (insertError) {
      return { status: insertError.message, user: null };
    }
  }

  revalidatePath("/", "layout");
  return { status: "success", user: data.user };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/auth/login");
}

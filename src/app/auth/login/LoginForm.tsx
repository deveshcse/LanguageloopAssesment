
"use client";

import { signIn } from "@/actions/auth";
import { useRouter } from "next/navigation";
export function LoginForm() {
  const router = useRouter();
  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await signIn(formData);
    if (result.status == "success") {
      router.push("/");
      console.log("login success", result.user);
    } else {
      console.log("login failed", result.status);
    }
  };

  return (
    <form onSubmit={handleClick} className="flex flex-col gap-4 w-80">
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button>Login</button>
    </form>
  );
}

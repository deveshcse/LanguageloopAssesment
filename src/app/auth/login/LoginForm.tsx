// "use client";
// import { signIn } from "@/actions/auth";
// import { useRouter } from "next/navigation";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import Link from 'next/link';

// import {
//   Card,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// // import { toast } from "@/components/hooks/use-toast"
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// const FormSchema = z.object({
//   email: z.string().email({
//     message: "Enter a valid email address",
//   }),
//   password: z.string().min(8, {
//     message: "Password must be at least 8 characters",
//   }),
// });

// export function LoginForm() {

//   const router = useRouter();
//   const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const result = await signIn(formData);
//     if (result.status === "success") {
//       router.push("/");
//       console.log("login success", result.user);
//     } else {
//       console.log("login failed", result.status);
//     }
//   }
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   // async function onSubmit(data: z.infer<typeof FormSchema>) {
//   //   console.log("data", data);
//   //   const formData = new FormData();
//   //   formData.append("email", data.email);
//   //   formData.append("password", data.password);
//   //   const result = await signIn(formData);
//   //   if (result.status === "success") {
//   //     console.log("login success", result.user);
      
//   //   }
//   // }

//   return (
//     <Card className="w-[380px] ">
//       <CardHeader>
//         <CardTitle className="text-xl">Login</CardTitle>
//         <CardDescription>
//           if you are a new user:
//           <Link href="/auth/register" className="mx-2 underline text-gray-800">
//             SignUp
//           </Link>
//         </CardDescription>
//       </CardHeader>

//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(()=>handleClick(event))}
//           className="px-6 grid gap-6"
//         >
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Email" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Password" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit" >
//             Submit
//           </Button>
//         </form>
//       </Form>
//     </Card>
//   );
// }



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

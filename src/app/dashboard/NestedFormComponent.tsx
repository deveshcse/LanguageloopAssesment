import React from "react";
import { useFormContext } from "react-hook-form";

export const NestedFormComponent = () => {
  const { register } = useFormContext();

  return (
    <div>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" {...register("username")} />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register("email")} />
      </div>

      <div>
        <label htmlFor="isAdmin">IsAdmin</label>
        <input id="isAdmin" type="checkbox" {...register("isAdmin")} />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register("password")} />
      </div>
    </div>
  );
};

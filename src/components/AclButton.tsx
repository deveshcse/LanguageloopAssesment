"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useAbility } from "@/context/AbilityContext";
import React from "react";

type AclButtonProps = {
  action: "view" | "create" | "update" | "delete";
  subject: string; // e.g., "documents", "dashboard"
  children: React.ReactNode;
} & ButtonProps;

export const AclButton = ({
  action,
  subject,
  children,
  ...buttonProps
}: AclButtonProps) => {
  const ability = useAbility();

  console.log("ability in acl button for:", subject, action, ability)

  if (!ability.can(action, subject)) return null;

  return (
    <Button {...buttonProps}>
      {children}
    </Button>
  );
};

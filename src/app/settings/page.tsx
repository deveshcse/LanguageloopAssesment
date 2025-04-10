"use client";

import { Button } from "@/components/ui/button";
import { defineAbilityFor } from "@/lib/defineAbilities";
import { ACTIONS, PAGES } from "@/lib/permissions";

const userType: "admin" | "user" = "user";
const ability = defineAbilityFor(userType);

export default function SettingsPage() {
  const canView = ability.can(ACTIONS.VIEW, PAGES.SETTINGS);
  const canDelete = ability.can(ACTIONS.DELETE, PAGES.SETTINGS);
  const canCreate = ability.can(ACTIONS.CREATE, PAGES.SETTINGS);
  const canUpdate = ability.can(ACTIONS.UPDATE, PAGES.SETTINGS);

  if (!canView) return <div>Unauthorized</div>;

  return (
    <div className="p-6 space-y-4">
      {canDelete && <Button className="btn">Delete</Button>}
      {canCreate && <Button className="btn">+ Create</Button>}
      {canUpdate && <Button className="btn">Edit</Button>}
      <h1 className="text-2xl font-bold">Settings</h1>
    </div>
  );
}

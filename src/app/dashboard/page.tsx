"use client";

import { Button } from "@/components/ui/button";
import { defineAbilityFor } from "@/lib/defineAbilities";
import { ACTIONS, PAGES } from "@/lib/permissions";

const userType: "admin" | "user" = "user";
const ability = defineAbilityFor(userType);

export default function DashboardPage() {
  const canView = ability.can(ACTIONS.VIEW, PAGES.DASHBOARD);
  const canDelete = ability.can(ACTIONS.DELETE, PAGES.DASHBOARD);
  const canCreate = ability.can(ACTIONS.CREATE, PAGES.DASHBOARD);
  const canUpdate = ability.can(ACTIONS.UPDATE, PAGES.DASHBOARD);

  if (!canView) return <div>Unauthorized</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {canCreate && <Button className="btn">+ Create</Button>}
      {canUpdate && <Button className="btn">Edit</Button>}
      {canDelete && <Button className="btn">Delete Item</Button>}
    </div>
  );
}

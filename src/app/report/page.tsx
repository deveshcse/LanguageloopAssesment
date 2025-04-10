"use client";

import { Button } from "@/components/ui/button";
import { defineAbilityFor } from "@/lib/defineAbilities";
import { ACTIONS, PAGES } from "@/lib/permissions";

const userType: "admin" | "user" = "user";
const ability = defineAbilityFor(userType);

export default function ReportPage() {
  const canView = ability.can(ACTIONS.VIEW, PAGES.REPORT);
  const canCreate = ability.can(ACTIONS.CREATE, PAGES.REPORT);
  const canUpdate = ability.can(ACTIONS.UPDATE, PAGES.REPORT);
  const canDelete = ability.can(ACTIONS.DELETE, PAGES.REPORT);

  if (!canView) return <div>Unauthorized</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Reports</h1>
      {canCreate && <Button className="btn">+ Create</Button>}
      {canDelete && <Button className="btn">Delete Report</Button>}
      {canUpdate && <Button className="btn">Update Report</Button>}
    </div>
  );
}

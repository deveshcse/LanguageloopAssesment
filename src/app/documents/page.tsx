"use client";

import { Button } from "@/components/ui/button";
import { defineAbilityFor } from "@/lib/ability";
import { ACTIONS, PAGES } from "@/lib/permissions";

const userType: "admin" | "user" = "user";
const ability = defineAbilityFor(userType);

export default function DocumentsPage() {
  const canView = ability.can(ACTIONS.VIEW, PAGES.DOCUMENTS);
  const canCreate = ability.can(ACTIONS.CREATE, PAGES.DOCUMENTS);
  const canUpdate = ability.can(ACTIONS.UPDATE, PAGES.DOCUMENTS);
  const canDelete = ability.can(ACTIONS.DELETE, PAGES.DOCUMENTS);

  if (!canView) return <div>Unauthorized</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Documents</h1>
      {canCreate && <Button className="btn">+ Create</Button>}
      {canUpdate && <Button className="btn">Edit</Button>}
      {canDelete && <Button className="btn">Delete Document</Button>}
    </div>
  );
}
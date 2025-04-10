import {
  MongoAbility,
  AbilityBuilder,
  createMongoAbility,
  MongoQuery,
} from "@casl/ability";

export type Actions = "view" | "create" | "update" | "delete";
export type Subjects = string; // like 'dashboard', 'report', etc.

export type AppAbility = MongoAbility<[Actions, Subjects], MongoQuery>;

export const defineAbilitiesFor = (
  permissions: { action_code: Actions; page_code: Subjects }[]
): AppAbility => {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  permissions.forEach((perm) => {
    can(perm.action_code, perm.page_code);
  });

  return build();
};

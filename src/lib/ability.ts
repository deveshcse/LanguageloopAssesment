import { AbilityBuilder, createMongoAbility, MongoAbility } from "@casl/ability";

// Define allowed action and subject types
export type Actions = "view" | "create" | "update" | "delete";
export type Subjects = "documents" | "dashboard" | "report" | "settings";

// Define the shape of ability rules
export type AppAbility = MongoAbility<[Actions, Subjects]>;

// Initialize the ability builder
export function defineAbilityFor(userType: "admin" | "user"): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (userType === "user") {
    can(["view", "create", "update"], "documents");
  }

  if (userType === "admin") {
    can("view", ["documents", "dashboard", "report", "settings"]);
    can(["create", "update", "delete"], ["dashboard", "report"]);
  }

  return build();
}

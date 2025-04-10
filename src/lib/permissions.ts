
// const PERMISSIONS: Record<string, Record<string, string[]>> = {
//   user: {
//     Documents: ["view", "create", "update"],

//   },
//   admin: {
//     DOCUMENTS: ["view", "update", "delete"],
//     DASHBOARD: ["view", "create", "update", "delete"],
//     REPORT: ["view", "create", "update", "delete"],
//     SETTINGS: ["view", "create", "update", "delete"],
//   }
// }

// export function CanAccess( userType: string, page: string, action: string){
//   const actions = PERMISSIONS[userType]?.[page] || [];
//   return actions.includes(action);
// }
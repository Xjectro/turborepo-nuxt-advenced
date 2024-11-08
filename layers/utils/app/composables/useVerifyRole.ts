export const useVerifyRole = (scopes: string[], hasRoles: string[]) => {
  const hasScope = scopes.some((scope) => hasRoles.includes(scope));

  return hasScope;
};

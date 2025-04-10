// components/AclGuard.tsx
'use client';

import React from 'react';
import { useAbility } from '@/context/AbilityContext';

interface AclGuardProps {
  pageCode: string;
  actionCode: 'view' | 'create' | 'update' | 'delete';
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AclGuard = ({ pageCode, actionCode, children, fallback }: AclGuardProps) => {
  const ability = useAbility();

  const isAllowed = ability.can(actionCode, pageCode);

  if (!isAllowed) {
    return fallback || (
      <div className="flex justify-center items-center h-screen text-center">
        <div>
          <h1 className="text-3xl font-bold">🚫 403 Unauthorized</h1>
          <p>You do not have access to view this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

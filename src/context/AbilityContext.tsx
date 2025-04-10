'use client';
import { createContext, useContext } from 'react';
import { createMongoAbility } from '@casl/ability';
import type { Actions, Subjects } from '@/lib/defineAbilities';

export const AbilityContext = createContext(createMongoAbility<[Actions, Subjects]>());

export const useAbility = () => useContext(AbilityContext);

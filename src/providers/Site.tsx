'use client'

import React, { createContext, useContext } from 'react'

import type { SiteSettingsData } from '@/utilities/siteDefaults'
import type { ContactData, OpeningHour } from '@/utilities/siteData'

type SiteContextValue = {
  settings: SiteSettingsData
  contact: ContactData
  hours: OpeningHour[]
}

const SiteContext = createContext<SiteContextValue | null>(null)

export const SiteProvider = ({ value, children }: { value: SiteContextValue; children: React.ReactNode }) => (
  <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
)

export const useSite = () => {
  const value = useContext(SiteContext)
  if (!value) throw new Error('useSite must be used inside <SiteProvider>')
  return value
}

import React from 'react'
import type { Payload } from 'payload'

import { siteDefaults } from '@/utilities/siteDefaults'

const BeforeLogin = async ({ payload }: { payload: Payload }) => {
  const settings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)
  const name = settings?.name || siteDefaults.name

  return (
    <div style={{ textAlign: 'center', padding: '12px 0 24px' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/favicon.svg" alt="" width={64} height={64} style={{ margin: '0 auto 16px' }} />
      <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1f4436', letterSpacing: '-0.03em', lineHeight: 1 }}>
        {name}
      </div>
      <p style={{ marginTop: 8, color: 'var(--theme-elevation-600)' }}>Espace de gestion du site</p>
    </div>
  )
}

export default BeforeLogin

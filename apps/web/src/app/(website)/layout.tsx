import type { ReactNode } from 'react';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { DraftModeControls } from '@/features/sanity/draft-mode/DraftModeControls';
import { SanityLive } from '@/features/sanity/data/live';

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Load Site Manifest

  return (
    <>
      {children}
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DraftModeControls />
          <VisualEditing />
        </>
      )}
    </>
  );
}

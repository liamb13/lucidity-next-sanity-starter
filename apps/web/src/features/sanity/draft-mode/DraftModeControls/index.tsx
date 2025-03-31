'use client';

import { useDraftModeEnvironment } from 'next-sanity/hooks';
import styles from './styles.module.css';
import { DRAFT_MODE_API_DISABLE } from '@pkg/common/constants/draftMode';

export function DraftModeControls() {
  const environment = useDraftModeEnvironment();

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== 'live' && environment !== 'unknown') {
    return null;
  }

  return (
    <a className={styles.draftModeControls} href={DRAFT_MODE_API_DISABLE}>
      <div className={`${styles.draftModeControls__heartbeat} ${styles.heartbeat}`}>
        <span className={styles.heartbeat__radial}></span>
      </div>
      Preview mode - click to disable
    </a>
  );
}

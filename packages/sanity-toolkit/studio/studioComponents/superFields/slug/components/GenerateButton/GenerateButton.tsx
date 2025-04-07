import { Button, Spinner } from '@sanity/ui';
import { useTranslation } from 'sanity';
import { RefreshIcon } from '@sanity/icons';
import React from 'react';

export interface GenerateButtonProps {
  isGenerating: boolean;
  readOnly: boolean;
  onClick: () => void;
}

export function GenerateButton({ isGenerating, readOnly, onClick }: GenerateButtonProps) {
  const { t } = useTranslation();

  return (
    <Button
      mode="ghost"
      type="button"
      disabled={readOnly || isGenerating}
      onClick={onClick}
      icon={isGenerating ? Spinner : RefreshIcon}
      title={
        isGenerating ? t('inputs.slug.action.generating') : t('inputs.slug.action.generate')
      }
      aria-label={
        isGenerating ? t('inputs.slug.action.generating') : t('inputs.slug.action.generate')
      }
    />
  );
}

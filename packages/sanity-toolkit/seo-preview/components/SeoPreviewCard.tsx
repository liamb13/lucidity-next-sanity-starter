import preview from './previews/Preview.module.css';

interface Props {
  children: React.ReactNode;
  loading: boolean;
  type: string;
  Icon: React.ComponentType<{ className?: string }>;
}

export function SeoPreviewCard({ loading, children, Icon, type }: Props) {
  const loadingHtml = (
    <div>
      <strong>Loading</strong>
    </div>
  );
  const previewHtml = <div className={preview.seoItemCard}>{children}</div>;

  const outputHtml = loading ? loadingHtml : previewHtml;

  return (
    <div className={preview.seoItem}>
      <h3 className={preview.seoItemTitle}>
        <Icon className={preview.seoItemLogo} />
        {type} preview
      </h3>
      <div className={preview.seoItemContent}>{outputHtml}</div>
    </div>
  );
}

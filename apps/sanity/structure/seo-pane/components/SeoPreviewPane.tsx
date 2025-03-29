import { BsFacebook, BsGoogle } from 'react-icons/bs';
import { RiTwitterXFill } from 'react-icons/ri';
import {
  SeoPreviewCard,
  GoogleSearchResult,
  TwitterCardPreview,
  FacebookSharePreview,
} from '@pkg/sanity-toolkit/seo-preview/components';
import { combineSeo } from '../utilities/combineSeo';
import { useSiteConfigSeo } from '../hooks/useSiteConfigSeo';
import { SeoFields } from '@/types';

interface Options {
  apiVersion?: string;
  configSeo?: ConfigSeo;
}

interface Props {
  document: {
    displayed?: SeoFields & {
      _type: string;
      pathname?: { current: string };
    };
  };
}

interface ConfigSeo {
  id: string;
  type: string;
}

export function SeoPreviewPaneFn({
  apiVersion = '2024-10-24',
  configSeo: _configSeo,
}: Options) {
  return function SeoPreviewPane({ document }: Props) {
    const [siteConfigSeo, loading] = useSiteConfigSeo({ apiVersion });

    const seo = combineSeo(
      siteConfigSeo,
      document.displayed ?? {},
      document.displayed?.pathname?.current,
    );

    return (
      <>
        <SeoPreviewCard loading={loading} type={'Google search result'} Icon={BsGoogle}>
          <GoogleSearchResult
            favicon={seo.favicon}
            siteTitle={seo.siteTitle ?? seo.siteUrl}
            pageUrl={seo.pageTitle ?? seo.siteUrl}
            pageTitle={seo.pageTitle}
            description={seo.metaDescription}
          />
        </SeoPreviewCard>

        <SeoPreviewCard loading={loading} type={'Twitter / X post'} Icon={RiTwitterXFill}>
          <TwitterCardPreview shareImage={seo.shareImage} siteUrl={seo.siteUrl} />
        </SeoPreviewCard>

        <SeoPreviewCard loading={loading} type={'Facebook share'} Icon={BsFacebook}>
          <FacebookSharePreview
            shareImage={seo.shareImage}
            siteUrl={seo.siteUrl}
            pageUrl={seo.pageUrl}
            pageTitle={seo.pageTitle}
            metaDescription={seo.metaDescription}
          />
        </SeoPreviewCard>
      </>
    );
  };
}

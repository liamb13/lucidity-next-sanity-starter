import { SchemaTypeDefinition } from 'sanity';
import { recyclingBinDocument } from '@pkg/sanity-toolkit/recycling-bin/schema';
import { SINGLETON } from '@pkg/common/constants/schemaTypes';
import { appConfig } from '@/config/app';
import { configSeo } from '@/schema/types/singletons/configSeo';
import { notFound404 } from '@/schema/types/singletons/notFound404';

export const singletons: SchemaTypeDefinition[] = [
  configSeo,
  notFound404,
  recyclingBinDocument(SINGLETON.RECYCLING_BIN, { apiVersion: appConfig.apiVersion }),
];

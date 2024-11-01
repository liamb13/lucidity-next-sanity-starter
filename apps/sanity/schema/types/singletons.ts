import { SchemaTypeDefinition } from 'sanity';
import { recyclingBinDocument } from '@pkg/sanity-toolkit/recycling-bin/schema';
import { SINGLETON } from '@pkg/common/constants/schemaTypes';
import { appConfig } from '@/config/app';
import { configSeo } from '@/schema/types/singletons/configSeo';

export const singletons: SchemaTypeDefinition[] = [
  configSeo,
  recyclingBinDocument(SINGLETON.RECYCLING_BIN, { apiVersion: appConfig.apiVersion }),
];

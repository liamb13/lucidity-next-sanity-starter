import { SchemaTypeDefinition } from 'sanity';
import { recyclingBinDocument } from '@pkg/sanity-toolkit/recycling-bin/schema';
import { SINGLETON } from '@pkg/common/constants/schemaTypes';
import { appConfig } from '@/config/app';

export const singletons: SchemaTypeDefinition[] = [
  recyclingBinDocument(SINGLETON.RECYCLING_BIN, { apiVersion: appConfig.apiVersion }),
];

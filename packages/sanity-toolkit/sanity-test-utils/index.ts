/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { ValidationContext, SanityDocument, Reference } from 'sanity';

/**
 * Creates a mock Sanity document with basic required fields
 */
export function createMockDocument(overrides: Partial<SanityDocument> = {}): SanityDocument {
  return {
    _id: 'mock-id',
    _type: 'mock-type',
    _createdAt: '2024-01-01T00:00:00Z',
    _updatedAt: '2024-01-01T00:00:00Z',
    _rev: 'mock-rev',
    ...overrides,
  };
}

/**
 * Creates a mock validation context for testing Sanity validation rules
 */
export function createValidationContext(
  parentValues: Record<string, unknown> = {},
  overrides: Partial<ValidationContext> = {},
): ValidationContext {
  return {
    parent: parentValues,
    document: createMockDocument(),
    path: [],
    type: { name: 'test', jsonType: 'string' },

    getClient: () => ({}) as any,

    schema: {} as any,
    environment: 'studio',

    i18n: {} as any,
    ...overrides,
  };
}

/**
 * Creates a mock Sanity reference
 */
export function createMockReference(refId: string, refType: string = 'mock-type'): Reference {
  return {
    _type: 'reference',
    _ref: refId,
    _weak: false,
    _strengthenOnPublish: {
      type: refType,
      template: {
        id: refType,
        params: {},
      },
    },
  };
}

/**
 * Creates a mock image asset reference
 */
export function createMockImageAsset(assetId: string = 'image-mock-id'): Reference {
  return createMockReference(assetId, 'sanity.imageAsset');
}

/**
 * Creates a mock file asset reference
 */
export function createMockFileAsset(assetId: string = 'file-mock-id'): Reference {
  return createMockReference(assetId, 'sanity.fileAsset');
}

/**
 * Creates a mock slug
 */
export function createMockSlug(current: string): { _type: 'slug'; current: string } {
  return {
    _type: 'slug',
    current,
  };
}

/**
 * Creates a mock block content array
 */
export function createMockBlockContent(text: string = 'Mock content'): Array<{
  _type: 'block';
  children: Array<{ _type: 'span'; text: string }>;

  markDefs: any[];
  style: 'normal';
}> {
  return [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text,
        },
      ],
      markDefs: [],
      style: 'normal',
    },
  ];
}

/**
 * Creates a mock geopoint
 */
export function createMockGeopoint(
  lat: number,
  lng: number,
): {
  _type: 'geopoint';
  lat: number;
  lng: number;
} {
  return {
    _type: 'geopoint',
    lat,
    lng,
  };
}

/**
 * Creates a mock date (in ISO format)
 */
export function createMockDate(date: string = '2024-01-01'): {
  _type: 'date';
  utc: string;
} {
  return {
    _type: 'date',
    utc: date,
  };
}

/**
 * Creates a mock datetime (in ISO format)
 */
export function createMockDateTime(datetime: string = '2024-01-01T00:00:00Z'): {
  _type: 'datetime';
  utc: string;
} {
  return {
    _type: 'datetime',
    utc: datetime,
  };
}

import { describe, it, expect } from 'vitest';
import {
  createMockDocument,
  createMockReference,
  createMockImageAsset,
  createMockFileAsset,
  createMockSlug,
  createMockBlockContent,
  createMockGeopoint,
  createMockDate,
  createMockDateTime,
  createValidationContext,
} from '../index';

describe('Sanity Test Utilities', () => {
  describe('createMockDocument', () => {
    it('creates a basic document with default values', () => {
      const doc = createMockDocument();
      expect(doc._id).toBe('mock-id');
      expect(doc._type).toBe('mock-type');
      expect(doc._createdAt).toBe('2024-01-01T00:00:00Z');
      expect(doc._updatedAt).toBe('2024-01-01T00:00:00Z');
      expect(doc._rev).toBe('mock-rev');
    });

    it('allows overriding default values', () => {
      const doc = createMockDocument({ _id: 'custom-id', _type: 'custom-type' });
      expect(doc._id).toBe('custom-id');
      expect(doc._type).toBe('custom-type');
    });
  });

  describe('createValidationContext', () => {
    it('creates a validation context with default values', () => {
      const context = createValidationContext();
      expect(context.parent).toEqual({});
      expect(context.document).toBeDefined();
      expect(context.path).toEqual([]);
      expect(context.type).toEqual({ name: 'test', jsonType: 'string' });
      expect(context.environment).toBe('studio');
    });

    it('allows setting parent values', () => {
      const context = createValidationContext({ type: 'test' });
      expect(context.parent).toEqual({ type: 'test' });
    });
  });

  describe('createMockReference', () => {
    it('creates a reference with specified ID and type', () => {
      const ref = createMockReference('test-id', 'test-type');
      expect(ref._type).toBe('reference');
      expect(ref._ref).toBe('test-id');
      expect(ref._strengthenOnPublish?.type).toBe('test-type');
    });
  });

  describe('createMockImageAsset', () => {
    it('creates an image asset reference', () => {
      const ref = createMockImageAsset('image-123');
      expect(ref._type).toBe('reference');
      expect(ref._ref).toBe('image-123');
      expect(ref._strengthenOnPublish?.type).toBe('sanity.imageAsset');
    });
  });

  describe('createMockFileAsset', () => {
    it('creates a file asset reference', () => {
      const ref = createMockFileAsset('file-123');
      expect(ref._type).toBe('reference');
      expect(ref._ref).toBe('file-123');
      expect(ref._strengthenOnPublish?.type).toBe('sanity.fileAsset');
    });
  });

  describe('createMockSlug', () => {
    it('creates a slug with specified current value', () => {
      const slug = createMockSlug('test-slug');
      expect(slug._type).toBe('slug');
      expect(slug.current).toBe('test-slug');
    });
  });

  describe('createMockBlockContent', () => {
    it('creates block content with default text', () => {
      const blocks = createMockBlockContent();
      expect(blocks[0]?._type).toBe('block');
      expect(blocks[0]?.children[0]?.text).toBe('Mock content');
    });

    it('creates block content with custom text', () => {
      const blocks = createMockBlockContent('Custom text');
      expect(blocks[0]?.children[0]?.text).toBe('Custom text');
    });
  });

  describe('createMockGeopoint', () => {
    it('creates a geopoint with specified coordinates', () => {
      const geopoint = createMockGeopoint(51.5074, -0.1278);
      expect(geopoint._type).toBe('geopoint');
      expect(geopoint.lat).toBe(51.5074);
      expect(geopoint.lng).toBe(-0.1278);
    });
  });

  describe('createMockDate', () => {
    it('creates a date with default value', () => {
      const date = createMockDate();
      expect(date._type).toBe('date');
      expect(date.utc).toBe('2024-01-01');
    });

    it('creates a date with custom value', () => {
      const date = createMockDate('2024-12-31');
      expect(date.utc).toBe('2024-12-31');
    });
  });

  describe('createMockDateTime', () => {
    it('creates a datetime with default value', () => {
      const datetime = createMockDateTime();
      expect(datetime._type).toBe('datetime');
      expect(datetime.utc).toBe('2024-01-01T00:00:00Z');
    });

    it('creates a datetime with custom value', () => {
      const datetime = createMockDateTime('2024-12-31T23:59:59Z');
      expect(datetime.utc).toBe('2024-12-31T23:59:59Z');
    });
  });
});

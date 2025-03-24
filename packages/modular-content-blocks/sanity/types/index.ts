import type { ObjectItemProps, ObjectMember } from 'sanity';
import type { ReactNode } from 'react';

export type FieldToChildFieldsMap = Record<
  string,
  Array<string> | ((props: ObjectItemProps) => ReactNode)
>;

// Define a more specific type for the children props structure
export interface SanityObjectItemPropsChildren {
  props: ObjectItemProps & {
    children?: {
      props?: {
        members?: ObjectMember[];
      };
    };
  };
}

// Define a type for content members with field property
export type ContentMember = ObjectMember & {
  field?: {
    schemaType: {
      title: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
};

export interface OuterBlockPreviewResult {
  type: 'preview' | 'custom';
  children: any; // Use any here to avoid ReactNode compatibility issues
  hasInnerBlocks: boolean;
  childFields?: Array<string>;
}

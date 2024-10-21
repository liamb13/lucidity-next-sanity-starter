// import { BlockSchemaDefinition } from '../../components/BlockWizard/types/blockSchema';
// import { OuterBlockItemComponent } from '../../components/OuterBlockItemComponent';
// import { InnerBlockItemComponent } from '../../components/InnerBlockItemComponent';
import { innerBlockFieldsets, outerBlockFieldsets } from './blockFieldsets';

// @todo Create this definition, and add the components in too
type BlockSchemaDefinition = any;

export function defineOuterBlock(
  schemaTypeDefinition: BlockSchemaDefinition,
): BlockSchemaDefinition {
  return {
    ...schemaTypeDefinition,
    type: 'object',
    fieldsets: [...outerBlockFieldsets(), ...(schemaTypeDefinition.fieldsets ?? [])],
    components: {
      ...schemaTypeDefinition.components,
      // item: schemaTypeDefinition.components?.item ?? OuterBlockItemComponent,
    },
  };
}

export function defineInnerBlock(
  schemaTypeDefinition: BlockSchemaDefinition,
): BlockSchemaDefinition {
  return {
    ...schemaTypeDefinition,
    type: 'object',
    fieldsets: [...innerBlockFieldsets(), ...(schemaTypeDefinition.fieldsets ?? [])],
    components: {
      ...schemaTypeDefinition.components,
      // item: schemaTypeDefinition.components?.item ?? InnerBlockItemComponent,
    },
  };
}

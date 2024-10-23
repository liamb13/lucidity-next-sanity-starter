// import { BlockSchemaDefinition } from '../../components/BlockWizard/types/blockSchema';
// import { OuterBlockItemComponent } from '../../components/OuterBlockItemComponent';
// import { InnerBlockItemComponent } from '../../components/InnerBlockItemComponent';
import { innerBlockFieldsets, outerBlockFieldsets } from './blockFieldsets';
// @todo Add the components for the Item Components
export function defineOuterBlock(schemaTypeDefinition) {
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
export function defineInnerBlock(schemaTypeDefinition) {
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

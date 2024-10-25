import { itemGroups } from '@/features/modular-content-blocks/mocks/fakeItemGroups';
import { ModularBlockArrayMember } from '@/features/modular-content-blocks/types';
import { CiBoxList } from 'react-icons/ci';

export function modularBlocksSchemaToInputConfig(
  blocksSchema: Array<ModularBlockArrayMember>,
) {
  return itemGroups;
}

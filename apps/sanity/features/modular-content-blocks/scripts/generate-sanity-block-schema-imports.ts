/**
 * We prefer the modular blocks to be able to be automatically imported via glob, i.e.:
 *
 *   const outerBlocksSchema = import.meta.glob<SanityBlockSchema>(
 *     '../blocks/outer/** /schema.{ts,tsx}',
 *     { eager: true },
 *   );
 *
 * However, when using Sanity's official type generation
 * (i.e. `npx sanity@latest typegen generate`), it will not work with a glob.
 * Therefore we must have a file that statically resolves each schema.
 *
 * To make this easier, this script allows us to automatically generate such a file,
 * easing the boilerplate and admin of creating new blocks.
 *
 * A similar script is provided for the web side of things (which is required because
 * Next's rust-based compiler does do handle globs).
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  fileComment,
  getImportsAndExports,
} from '@pkg/modular-content-blocks/scripts/generate-imports-and-exports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outerBlocksPath = join(__dirname, '..', 'blocks', 'outer');
const innerBlocksPath = join(__dirname, '..', 'blocks', 'inner');
const outputDirectory = join(__dirname, '..', 'lib');
const outputPath = join(outputDirectory, 'blockSchemaGenerated.ts');

/**
 * Generate import statements and export them.
 */
function generateImportsAndExports(): void {
  const comment = fileComment(__filename);

  const outers = getImportsAndExports(
    outerBlocksPath,
    /schema\.ts$/,
    'schema',
    'outerSchema',
    'outerBlocksSchema',
    join(__dirname, '..', 'lib'),
  );

  const inners = getImportsAndExports(
    innerBlocksPath,
    /schema\.ts$/,
    'schema',
    'innerSchema',
    'innerBlocksSchema',
    join(__dirname, '..', 'lib'),
  );

  writeFileSync(
    outputPath,
    `${comment}\n\n${outers.imports}\n${inners.imports}\n${outers.exports}\n${inners.exports}`,
  );
}

generateImportsAndExports();

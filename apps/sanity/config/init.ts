import { spawn } from 'child_process';
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..');
const webDir = join(rootDir, '..', 'web');

async function main() {
  try {
    console.log('🚀 Initializing Sanity project...');

    // Run sanity init
    console.log('\n📦 Running Sanity initialization...');
    console.log('Please follow the prompts to set up your Sanity project...');

    // Run Sanity init with full interactivity but capture stdout
    const sanityInit = spawn('npx', ['sanity', 'init', '--bare'], {
      stdio: ['inherit', 'pipe', 'inherit'],
      cwd: rootDir,
      env: {
        ...process.env,
        FORCE_COLOR: '1',
        CI: 'false',
        TERM: process.env.TERM || 'xterm-256color',
      },
    });

    let output = '';
    sanityInit.stdout.on('data', (data) => {
      const text = data.toString();
      output = text;

      // Remove the first line of the project selection prompt
      if (text.includes('Create new project') && !text.includes('(Use arrow keys)')) {
        let cleanedText = text.replace(
          '\x1B[32m?\x1B[39m \x1B[1mCreate a new project or select an existing one\x1B[22m\x1B[0m \x1B[0m\n',
          '',
        );
        console.log(cleanedText);
        return;
      }

      if (text.includes('Select dataset to use') && !text.includes('(Use arrow keys)')) {
        const cleanedText = text.replace(
          '\x1B[32m?\x1B[39m \x1B[1mSelect dataset to use\x1B[22m\x1B[0m \x1B[0m\n',
          '',
        );
        console.log(cleanedText);
        return;
      }

      console.log(text);
    });

    await new Promise((resolve, reject) => {
      sanityInit.on('close', (code) => {
        if (code === 0) {
          resolve(true);
        } else {
          reject(new Error(`Sanity init failed with code ${code}`));
        }
      });
    });

    console.log('\n✅ Sanity initialization complete!');

    // Extract project details from output
    const projectIdMatch = output.match(/Project ID:\s*\x1B\[36m([^\s]+)\x1B\[39m/);
    const datasetMatch = output.match(/Dataset:\s*\x1B\[36m([^\s]+)\x1B\[39m/);

    if (!projectIdMatch || !datasetMatch) {
      throw new Error('Could not find project ID or dataset in Sanity CLI output');
    }

    const projectId = projectIdMatch[1].trim();
    const dataset = datasetMatch[1].trim();

    console.log(`Project ID: ${projectId}`);
    console.log(`Dataset: ${dataset}`);

    // Update environment files
    console.log('\n📝 Setting up environment variables...');

    // Sanity app environment files
    const sanityEnvExamplePath = join(rootDir, '.env.example');
    const sanityEnvLocalPath = join(rootDir, '.env.local');

    // Web app environment files
    const webEnvExamplePath = join(webDir, '.env.example');
    const webEnvLocalPath = join(webDir, '.env.local');

    // Sanity app environment setup
    if (existsSync(sanityEnvExamplePath)) {
      copyFileSync(sanityEnvExamplePath, sanityEnvLocalPath);
      console.log('✓ Copied Sanity .env.example to .env.local');
    } else {
      console.log('⚠️ No Sanity .env.example found, creating new environment file');
    }

    // Web app environment setup
    if (existsSync(webEnvExamplePath)) {
      copyFileSync(webEnvExamplePath, webEnvLocalPath);
      console.log('✓ Copied Web .env.example to .env.local');
    } else {
      console.log('⚠️ No Web .env.example found, creating new environment file');
    }

    // Update Sanity app environment file
    let sanityEnvLocalContent = readFileSync(sanityEnvLocalPath, 'utf-8');

    // Update Sanity variables
    sanityEnvLocalContent = sanityEnvLocalContent
      .replace(
        /SANITY_STUDIO_SANITY_PROJECT_ID=.*\n?/,
        `SANITY_STUDIO_SANITY_PROJECT_ID=${projectId}\n`,
      )
      .replace(
        /SANITY_STUDIO_SANITY_DATASET=.*\n?/,
        `SANITY_STUDIO_SANITY_DATASET=${dataset}\n`,
      );

    writeFileSync(sanityEnvLocalPath, sanityEnvLocalContent.trim() + '\n');

    // Update Web app environment file
    let webEnvLocalContent = readFileSync(webEnvLocalPath, 'utf-8');

    // Update Web variables
    webEnvLocalContent = webEnvLocalContent
      .replace(
        /NEXT_PUBLIC_SANITY_PROJECT_ID=.*\n?/,
        `NEXT_PUBLIC_SANITY_PROJECT_ID=${projectId}\n`,
      )
      .replace(/NEXT_PUBLIC_SANITY_DATASET=.*\n?/, `NEXT_PUBLIC_SANITY_DATASET=${dataset}\n`);

    writeFileSync(webEnvLocalPath, webEnvLocalContent.trim() + '\n');

    console.log('\n✅ Environment files updated successfully!');

    // Check for sample data
    const sampleDataPath = join(rootDir, 'sample-data.tar.gz');
    if (existsSync(sampleDataPath)) {
      console.log('\n📦 Found sample data! Would you like to import it?');
      console.log('This will populate your Sanity dataset with sample content.');

      // Prompt user for import
      const { execSync } = await import('child_process');
      const readline = await import('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const answer = await new Promise<string>((resolve) => {
        rl.question('Import sample data? (y/N): ', resolve);
      });
      rl.close();

      if (answer.toLowerCase() === 'y') {
        console.log('\n📥 Importing sample data...');
        try {
          execSync(`npx sanity dataset import sample-data.tar.gz ${dataset}`, {
            stdio: 'inherit',
            cwd: rootDir,
          });
          console.log('✅ Sample data imported successfully!');
        } catch (error) {
          console.error('❌ Error importing sample data:', error);
        }
      }
    }

    console.log('\n🎉 Sanity project initialized successfully!');
    console.log('\nNext steps:');
    console.log('1. Start the development server: pnpm g:dev');
    console.log('2. Open the Sanity Studio: http://localhost:3333');
    console.log('3. Open the Next.js app: http://localhost:3000');
    if (existsSync(sampleDataPath)) {
      console.log('4. Optionally import sample data using the command above');
    }
  } catch (error) {
    console.error('❌ Error during initialization:', error);
    process.exit(1);
  }
}

main();

#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('create-jtc-starter-kit')
  .description('Create a new JTC Starter Kit project')
  .version('1.0.0')
  .argument('[project-name]', 'Name of the project')
  .action(async (projectName) => {
    console.log(chalk.blue.bold('\n🚀 Welcome to JTC Starter Kit!\n'));

    // Get project name if not provided
    if (!projectName) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'What is your project name?',
          default: 'my-jtc-app',
          validate: (input) => {
            if (/^[a-zA-Z0-9-_]+$/.test(input)) return true;
            return 'Project name may only include letters, numbers, underscores and hashes.';
          }
        }
      ]);
      projectName = answers.projectName;
    }

    const targetDir = path.join(process.cwd(), projectName);

    // Check if directory already exists
    if (fs.existsSync(targetDir)) {
      console.log(chalk.red(`\n❌ Directory ${projectName} already exists!`));
      process.exit(1);
    }

    console.log(chalk.green(`\n📁 Creating project in ${chalk.bold(targetDir)}...\n`));

    try {
      // Create project directory
      fs.ensureDirSync(targetDir);

      // Copy template files from bundled template
      const templateDir = path.join(__dirname, 'template');
      await copyTemplate(templateDir, targetDir);

      // Update package.json with project name
      const packageJsonPath = path.join(targetDir, 'package.json');
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.name = projectName;
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

      console.log(chalk.green('\n✅ Project created successfully!\n'));
      console.log(chalk.cyan('📝 Next steps:\n'));
      console.log(chalk.white(`  1. cd ${projectName}`));
      console.log(chalk.white('  2. npm install'));
      console.log(chalk.white('  3. npm run dev\n'));
      console.log(chalk.yellow('Happy coding! 🎉\n'));

    } catch (error) {
      console.error(chalk.red('\n❌ Error creating project:'), error);
      // Cleanup on error
      if (fs.existsSync(targetDir)) {
        fs.removeSync(targetDir);
      }
      process.exit(1);
    }
  });

async function copyTemplate(src, dest) {
  // List of files/folders to exclude when copying
  const excludeList = [
    'node_modules',
    '.git',
    'dist',
    'build',
    '.DS_Store'
  ];

  const items = await fs.readdir(src);

  for (const item of items) {
    if (excludeList.includes(item)) continue;

    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    const stat = await fs.stat(srcPath);

    if (stat.isDirectory()) {
      await fs.ensureDir(destPath);
      await copyTemplate(srcPath, destPath);
    } else {
      await fs.copy(srcPath, destPath);
    }
  }
}

program.parse();
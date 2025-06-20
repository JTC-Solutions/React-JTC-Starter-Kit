# Publishing Guide for create-jtc-starter-kit

## How It Works

This CLI uses the **bundled template approach**:
- The entire starter kit template is included in the `template/` directory
- When published to npm, the template files are bundled with the CLI
- No external dependencies on GitHub repos or remote templates
- Users get a consistent experience regardless of network connectivity

## Prerequisites

1. Create an npm account at https://www.npmjs.com/
2. Login to npm in your terminal:
   ```bash
   npm login
   ```

## First-time Publishing

1. Navigate to the CLI directory:
   ```bash
   cd create-jtc-starter-kit
   ```

2. Update the package.json with your information:
   - Replace the author field with your name
   - Update the repository URLs to point to your GitHub repo
   - Make sure the package name is unique on npm

3. **Important**: The `files` field in package.json ensures the template directory is included:
   ```json
   "files": [
     "index.js",
     "template/**/*",
     "README.md"
   ]
   ```

4. Publish to npm:
   ```bash
   npm publish
   ```

## Testing Before Publishing

Test the package locally as if it were published:

```bash
# In the create-jtc-starter-kit directory
npm pack

# This creates a .tgz file. In another directory:
npx /path/to/create-jtc-starter-kit-1.0.0.tgz my-test-app
```

## After Publishing

Users can now create new projects with:

```bash
npx create-jtc-starter-kit my-app
# or
npm create jtc-starter-kit my-app
# or
yarn create jtc-starter-kit my-app
```

## Updating Versions

1. Update the version in package.json following semver:
   - Patch version (1.0.1): Bug fixes
   - Minor version (1.1.0): New features, backward compatible
   - Major version (2.0.0): Breaking changes

2. Update the README if needed

3. Publish the new version:
   ```bash
   npm publish
   ```

## Best Practices

1. Always test locally before publishing
2. Update the README with any new features
3. Consider adding a CHANGELOG.md
4. Tag releases in git:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

## Troubleshooting

- If the package name is taken, choose a scoped name: `@yourname/create-jtc-starter-kit`
- Make sure all files are included by checking the `files` field in package.json
- Use `npm pack` to see what will be published
- Check `.npmignore` or `files` in package.json to control what gets published
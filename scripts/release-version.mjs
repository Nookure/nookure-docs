#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const slug = args[0];

if (!slug) {
	console.error('Usage: pnpm release <version-slug> [archived-label] [next-current-label]');
	console.error('Example: pnpm release 2.0.0 "2.0.0 (Beta)" "2.1.0 (Dev)"');
	process.exit(1);
}

const configPath = resolve('astro.config.mjs');
let config = readFileSync(configPath, 'utf8');

// Extract current label if archived-label is omitted
const currentMatch = config.match(/current:\s*\{\s*label:\s*['"]([^'"]+)['"]\s*\}/);
const archivedLabel = args[1] || (currentMatch ? currentMatch[1] : slug);
const nextCurrentLabel = args[2] || 'Next';

if (config.includes(`slug: '${slug}'`) || config.includes(`slug: "${slug}"`)) {
	console.error(`Error: Version "${slug}" already exists in astro.config.mjs.`);
	process.exit(1);
}

// Update current label
if (currentMatch) {
	config = config.replace(
		/current:\s*\{\s*label:\s*['"][^'"]+['"]\s*\}/,
		`current: { label: '${nextCurrentLabel}' }`
	);
}

// Insert new version into versions array
const newEntry = `{ slug: '${slug}', label: '${archivedLabel}' }`;
if (/versions:\s*\[\s*\]/.test(config)) {
	config = config.replace(/versions:\s*\[\s*\]/, `versions: [${newEntry}]`);
} else if (/versions:\s*\[/.test(config)) {
	config = config.replace(/versions:\s*\[/, `versions: [${newEntry}, `);
} else {
	console.error('Error: Could not find `versions: [...]` in astro.config.mjs.');
	process.exit(1);
}

writeFileSync(configPath, config, 'utf8');
console.log(`Updated astro.config.mjs: archived "${slug}" (${archivedLabel}), current is now "${nextCurrentLabel}".`);
console.log('Running astro sync to snapshot documentation...');

execSync('pnpm astro sync', { stdio: 'inherit' });
console.log(`Done! Version "${slug}" has been created.`);

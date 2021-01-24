/* Copyright (c) Sapphire Project (https://github.com/sapphire-project) */
import fsExtra from 'fs-extra';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const moduleDir = resolve(__dirname, '..');

await fsExtra.copy(
	join(moduleDir, 'src', 'tsconfig.json'),
	join(moduleDir, 'tsconfig.json')
);

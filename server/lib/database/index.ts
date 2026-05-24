import { readdirSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url';

import { createDatabase } from "./database.ts";

const directory = dirname(fileURLToPath(import.meta.url));

export default function database() {
  const migrations = readdirSync(join(directory, 'migrations'))
    .map(file => {
      if (!file.endsWith('.sql')) return null;

      const path = join(directory, 'migrations', file);
      return readFileSync(path, 'utf8');
    })
    .filter(Boolean) as Array<string>;
   
  return createDatabase(migrations);
}

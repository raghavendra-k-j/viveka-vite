import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { DsToken } from './../../src//ui/ds/core/tokens';
import { dsLogger } from './ds';

function camelToKebab(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Handle camelCase to kebab-case
    .replace(/([a-zA-Z])(\d+)/g, '$1-$2') // Handle letters followed by numbers
    .toLowerCase();
}

// Generate CSS Custom Properties (variables) instead of SCSS variables
function generateCssVariables(obj: any, prefix = '--'): string[] {
  let cssLines: string[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const kebabKey = camelToKebab(key);
      const cssVarName = `${prefix}${kebabKey}`;

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Recursively handle nested objects
        cssLines = cssLines.concat(generateCssVariables(value, `${cssVarName}-`));
      } else {
        // Add the variable to the list (with value)
        cssLines.push(`${cssVarName}: ${value};`);
      }
    }
  }

  return cssLines;
}

export async function generateCssFile(dsTokens: DsToken[], outputFilePath: string): Promise<void> {
  if (!dsTokens || !Array.isArray(dsTokens)) {
    dsLogger.error('Invalid tokens array.');
    return;
  }

  dsLogger.debug(`Generating CSS file at: ${outputFilePath}`);

  const cssLines: string[] = [];

  // Start the :root selector for global custom properties
  cssLines.push(':root {');

  for (const dsToken of dsTokens) {
    const name = dsToken.name;
    const value = dsToken.value;
    dsLogger.debug(`Processing token: ${name}`);
    if (value && typeof value === 'object') {
      // If token value is an object, handle nested properties
      cssLines.push(...generateCssVariables(value, `--${name}-`));
    } else {
      // Handle token as a direct variable
      cssLines.push(`--${name}: ${value};`);
    }
  }

  // End the :root selector
  cssLines.push('}');

  const cssContent = `${cssLines.join('\n')}\n`;

  const outputDir = path.dirname(outputFilePath);
  await mkdir(outputDir, { recursive: true });
  await writeFile(outputFilePath, cssContent, 'utf8');

  dsLogger.debug(`CSS file generated successfully: ${outputFilePath}`);
}

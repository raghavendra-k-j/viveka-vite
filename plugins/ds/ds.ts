import path from 'path';
import type { Plugin, ViteDevServer } from 'vite';
import { bundleAndLoadTokens } from './fileReader';
import { generateCssFile } from './fileWriter';
import { Logger, LogLevel } from '../../src/core/utils/logger';

export const dsLogger = new Logger('ds-plugin');
dsLogger.setLogLevel(LogLevel.INFO);

interface DsPluginOptions {
  sourceTokenFile: string;
  cssOutputPath: string;
}

export default function createDsPlugin(options: DsPluginOptions): Plugin {
  let resolvedSourcePath: string;
  let resolvedOutputPath: string;
  let serverInstance: ViteDevServer | null = null;

  function resolvePaths(root: string): void {
    resolvedSourcePath = path.resolve(root, options.sourceTokenFile);
    resolvedOutputPath = path.resolve(root, options.cssOutputPath);
  }

  async function handleTokenGeneration(context: {
    label: string;
    failOnError?: boolean;
  }): Promise<void> {
    const { label, failOnError = false } = context;
    dsLogger.debug(`${label}: Processing tokens...`);

    try {
      const tokens = await bundleAndLoadTokens(resolvedSourcePath);
      if (tokens !== null) {
        await generateCssFile(tokens, resolvedOutputPath);
        dsLogger.info(`${label}: CSS file generated successfully.`);
      } else {
        const msg = `${label}: Token loading failed.`;
        dsLogger.debug(msg);
        if (failOnError) throw new Error(msg);
        serverInstance?.ws.send({
          type: 'error',
          err: { message: msg, stack: '', plugin: 'ds-plugin' }
        });
      }
    } catch (error: any) {
      const errMsg = `${label}: Error - ${error.message || error}`;
      dsLogger.debug(errMsg);
      if (failOnError) throw error;
      serverInstance?.ws.send({
        type: 'error',
        err: { message: errMsg, stack: error.stack || '', plugin: 'ds-plugin' }
      });
    }
  }

  return {
    name: 'ds-plugin',

    configResolved(config) {
      resolvePaths(config.root);
    },

    async buildStart() {
      await handleTokenGeneration({ label: 'buildStart', failOnError: true });
    },

    configureServer(server: ViteDevServer) {
      serverInstance = server;
      server.watcher.add(resolvedSourcePath);
      dsLogger.debug(`Watching for changes: ${resolvedSourcePath}`);

      server.watcher.on('change', async (filePath) => {
        if (path.normalize(filePath) === path.normalize(resolvedSourcePath)) {
          await handleTokenGeneration({ label: 'fileChange' });
        }
      });
    },
  };
}

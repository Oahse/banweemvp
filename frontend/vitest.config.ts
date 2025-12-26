import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic',
    jsxImportSource: 'react',
    babel: {
      plugins: []
    }
  })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: [
      'node_modules/',
      'dist/',
      'build/',
      '**/*.config.*',
      '**/mockData/**',
    ],
    testTimeout: 30000, // 30 seconds for property tests
    hookTimeout: 30000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData/**',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        'src/types/',
        'src/vite-env.d.ts',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 85,
          lines: 85,
          statements: 85,
        },
        // Specific thresholds per file type
        'src/components/**/*.{ts,tsx}': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
        'src/hooks/**/*.{ts,tsx}': {
          branches: 95,
          functions: 95,
          lines: 95,
          statements: 95,
        },
        'src/contexts/**/*.{ts,tsx}': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
        'src/apis/**/*.{ts,tsx}': {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
        'src/pages/**/*.{ts,tsx}': {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    // Property-based testing configuration
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        minThreads: 1,
        maxThreads: 4,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});

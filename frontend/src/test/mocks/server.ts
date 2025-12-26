/**
 * MSW Server Setup for Node.js Testing Environment
 * Configures Mock Service Worker for API mocking in tests
 */

import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Setup MSW server with all handlers
export const server = setupServer(...handlers);

// Export handlers for individual test customization
export { handlers } from './handlers';
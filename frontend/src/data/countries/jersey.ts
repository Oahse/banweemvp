/**
 * Jersey country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const jersey: Country = { code: 'JE', name: 'Jersey', taxInfo: { taxName: 'No VAT', currency: 'USD', region: 'EU' }};

export default jersey;

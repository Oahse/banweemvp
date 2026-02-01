/**
 * France country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const france: Country = { code: 'FR', name: 'France', taxInfo: { standardRate: 20, taxName: 'TVA', currency: 'EUR', region: 'EU' } };

export default france;

/**
 * Belgium country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const belgium: Country = { code: 'BE', name: 'Belgium', taxInfo: { standardRate: 21, taxName: 'BTW', currency: 'EUR', region: 'EU' } };

export default belgium;

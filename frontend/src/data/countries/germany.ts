/**
 * Germany country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const germany: Country = { code: 'DE', name: 'Germany', taxInfo: { standardRate: 19, taxName: 'MwSt', currency: 'EUR', region: 'EU' } };

export default germany;

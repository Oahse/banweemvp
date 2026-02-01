/**
 * New Zealand country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const newzealand: Country = { code: 'NZ', name: 'New Zealand', taxInfo: { standardRate: 15, taxName: 'GST', currency: 'NZD', region: 'APAC' } };

export default newzealand;

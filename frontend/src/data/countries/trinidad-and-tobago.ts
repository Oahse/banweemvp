/**
 * Trinidad and Tobago country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const trinidadandtobago: Country = {
  code: 'TT',
  name: 'Trinidad and Tobago',
  provinces: [
    { code: 'PORT', name: 'Port of Spain',
      cities: [
        { code: 'PORT', name: 'Port of Spain', taxInfo: { taxName: 'No VAT', currency: 'USD', region: 'NA' }};

export default trinidadandtobago;

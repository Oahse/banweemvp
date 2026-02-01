/**
 * Argentina country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const argentina: Country = {
    code: 'AR',
    name: 'Argentina',
    provinces: [
      { code: 'BA', name: 'Buenos Aires', taxInfo: { taxName: 'No VAT', currency: 'USD', region: 'LATAM' }},
      { code: 'CABA', name: 'Ciudad Autónoma de Buenos Aires' },
      { code: 'CT', name: 'Catamarca' },
      { code: 'CC', name: 'Chaco' },
      { code: 'CH', name: 'Chubut' },
      { code: 'CB', name: 'Córdoba' },
      { code: 'CR', name: 'Corrientes' },
      { code: 'ER', name: 'Entre Ríos' },
      { code: 'FO', name: 'Formosa' },
      { code: 'JY', name: 'Jujuy' },
      { code: 'LP', name: 'La Pampa' },
      { code: 'LR', name: 'La Rioja' },
      { code: 'MZ', name: 'Mendoza' },
      { code: 'MI', name: 'Misiones' },
      { code: 'NQ', name: 'Neuquén' },
      { code: 'RN', name: 'Río Negro' },
      { code: 'SA', name: 'Salta' },
      { code: 'SJ', name: 'San Juan' },
      { code: 'SL', name: 'San Luis' },
      { code: 'SC', name: 'Santa Cruz' },
      { code: 'SF', name: 'Santa Fe' },
      { code: 'SE', name: 'Santiago del Estero' },
      { code: 'TF', name: 'Tierra del Fuego' },
      { code: 'TU', name: 'Tucumán' }
    ]
  };

export default argentina;

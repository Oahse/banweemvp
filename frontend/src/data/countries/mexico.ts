/**
 * Mexico country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const mexico: Country = {
    code: 'MX',
    name: 'Mexico',
    provinces: [
      { code: 'AGU', name: 'Aguascalientes', taxInfo: { taxName: 'No VAT', currency: 'USD', region: 'NA' }},
      { code: 'BCN', name: 'Baja California' },
      { code: 'BCS', name: 'Baja California Sur' },
      { code: 'CAM', name: 'Campeche' },
      { code: 'CHP', name: 'Chiapas' },
      { code: 'CHH', name: 'Chihuahua' },
      { code: 'COA', name: 'Coahuila' },
      { code: 'COL', name: 'Colima' },
      { code: 'DUR', name: 'Durango' },
      { code: 'GUA', name: 'Guanajuato' },
      { code: 'GRO', name: 'Guerrero' },
      { code: 'HID', name: 'Hidalgo' },
      { code: 'JAL', name: 'Jalisco' },
      { code: 'MEX', name: 'Mexico' },
      { code: 'MIC', name: 'Michoacán' },
      { code: 'MOR', name: 'Morelos' },
      { code: 'NAY', name: 'Nayarit' },
      { code: 'NLE', name: 'Nuevo León' },
      { code: 'OAX', name: 'Oaxaca' },
      { code: 'PUE', name: 'Puebla' },
      { code: 'QUE', name: 'Querétaro' },
      { code: 'ROO', name: 'Quintana Roo' },
      { code: 'SLP', name: 'San Luis Potosí' },
      { code: 'SIN', name: 'Sinaloa' },
      { code: 'SON', name: 'Sonora' },
      { code: 'TAB', name: 'Tabasco' },
      { code: 'TAM', name: 'Tamaulipas' },
      { code: 'TLA', name: 'Tlaxcala' },
      { code: 'VER', name: 'Veracruz' },
      { code: 'YUC', name: 'Yucatán' },
      { code: 'ZAC', name: 'Zacatecas' },
      { code: 'CMX', name: 'Ciudad de México' }
    ]
  };

export default mexico;

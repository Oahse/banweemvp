/**
 * Honduras country data with departments, cities, and tax information
 */

import { Country } from './index';

export const honduras: Country = {
    code: 'HN',
    name: 'Honduras',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'HNL', region: 'LATAM' },
    provinces: [
      { code: 'FRANCISCO', name: 'Francisco Morazán',
        cities: [
          { code: 'TEGUCIGALPA', name: 'Tegucigalpa' },
          { code: 'COMAYAGUA', name: 'Comayagua' },
          { code: 'SIGUATEPEQUE', name: 'Siguatepeque' },
          { code: 'TALANGA', name: 'Talanga' },
          { code: 'SAN', name: 'San Antonio de Oriente' },
          { code: 'SANTA', name: 'Santa Lucía' },
          { code: 'VALLE', name: 'Valle de Ángeles' },
          { code: 'SAN2', name: 'San Juan de Flores' },
          { code: 'SAN3', name: 'San Miguelito' },
          { code: 'LEPA', name: 'Lepaterique' }
        ]
      },
      { code: 'CORTES', name: 'Cortés',
        cities: [
          { code: 'SAN', name: 'San Pedro Sula' },
          { code: 'CHOLUTECA', name: 'Choloma' },
          { code: 'LA', name: 'La Lima' },
          { code: 'VILLANUEVA', name: 'Villanueva' },
          { code: 'PROGRESO', name: 'El Progreso' },
          { code: 'POTRERILLOS', name: 'Potrerillos' },
          { code: 'SAN2', name: 'San Manuel' },
          { code: 'SAN3', name: 'San Antonio' },
          { code: 'SANTA', name: 'Santa Cruz de Yojoa' },
          { code: 'OLANCHO', name: 'Olancho' }
        ]
      }
    ]
};

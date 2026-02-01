/**
 * Saudi Arabia country data with regions, cities, and tax information
 */

import { Country } from './index';

export const saudiArabia: Country = {
    code: 'SA',
    name: 'Saudi Arabia',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SAR', region: 'MEA' },
    provinces: [
      { code: 'RIY', name: 'Riyadh',
        cities: [
          { code: 'RIY', name: 'Riyadh' },
          { code: 'JED', name: 'Jeddah' },
          { code: 'MEC', name: 'Mecca' },
          { code: 'MED', name: 'Medina' },
          { code: 'DAM', name: 'Dammam' },
          { code: 'KHO', name: 'Khobar' },
          { code: 'TAB', name: 'Tabuk' },
          { code: 'BAH', name: 'Buraidah' },
          { code: 'HAF', name: 'Hafar al-Batin' },
          { code: 'ABH', name: 'Abha' }
        ]
      },
      { code: 'MEC', name: 'Mecca',
        cities: [
          { code: 'MEC', name: 'Mecca' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'JED', name: 'Jeddah' },
          { code: 'MED', name: 'Medina' },
          { code: 'DAM', name: 'Dammam' },
          { code: 'KHO', name: 'Khobar' },
          { code: 'TAB', name: 'Tabuk' },
          { code: 'BAH', name: 'Buraidah' },
          { code: 'HAF', name: 'Hafar al-Batin' },
          { code: 'ABH', name: 'Abha' }
        ]
      },
      { code: 'MED', name: 'Medina',
        cities: [
          { code: 'MED', name: 'Medina' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'MEC', name: 'Mecca' },
          { code: 'JED', name: 'Jeddah' },
          { code: 'DAM', name: 'Dammam' },
          { code: 'KHO', name: 'Khobar' },
          { code: 'TAB', name: 'Tabuk' },
          { code: 'BAH', name: 'Buraidah' },
          { code: 'HAF', name: 'Hafar al-Batin' },
          { code: 'ABH', name: 'Abha' }
        ]
      },
      { code: 'EAS', name: 'Eastern',
        cities: [
          { code: 'DAM', name: 'Dammam' },
          { code: 'KHO', name: 'Khobar' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'JED', name: 'Jeddah' },
          { code: 'MEC', name: 'Mecca' },
          { code: 'MED', name: 'Medina' },
          { code: 'TAB', name: 'Tabuk' },
          { code: 'BAH', name: 'Buraidah' },
          { code: 'HAF', name: 'Hafar al-Batin' },
          { code: 'ABH', name: 'Abha' }
        ]
      },
      { code: 'ASA', name: 'Asir',
        cities: [
          { code: 'ABH', name: 'Abha' },
          { code: 'KHA', name: 'Khamis Mushait' },
          { code: 'BAH', name: 'Buraidah' },
          { code: 'NAJ', name: 'Najran' },
          { code: 'JIZ', name: 'Jizan' },
          { code: 'BIS', name: 'Bisha' },
          { code: 'TAB', name: 'Tabuk' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'JED', name: 'Jeddah' },
          { code: 'MEC', name: 'Mecca' }
        ]
      },
      { code: 'TAB', name: 'Tabuk',
        cities: [
          { code: 'TAB', name: 'Tabuk' },
          { code: 'WEJ', name: 'Wejh' },
          { code: 'TAY', name: 'Tayma' },
          { code: 'DUM', name: 'Dumat al-Jandal' },
          { code: 'HA', name: 'Haql' },
          { code: 'BAD', name: 'Badr' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'JED', name: 'Jeddah' },
          { code: 'MEC', name: 'Mecca' },
          { code: 'MED', name: 'Medina' }
        ]
      },
      { code: 'HA', name: 'Hail',
        cities: [
          { code: 'HAI', name: 'Hail' },
          { code: 'BAQ', name: 'Baqaa' },
          { code: 'GHA', name: 'Ghail' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'JED', name: 'Jeddah' },
          { code: 'MEC', name: 'Mecca' },
          { code: 'MED', name: 'Medina' },
          { code: 'DAM', name: 'Dammam' },
          { code: 'KHO', name: 'Khobar' },
          { code: 'TAB', name: 'Tabuk' }
        ]
      },
      { code: 'NOR', name: 'Northern',
        cities: [
          { code: 'JED', name: 'Jeddah' },
          { code: 'YAN', name: 'Yanbu' },
          { code: 'RA', name: 'Rabigh' },
          { code: 'UN', name: 'Unayzah' },
          { code: 'TUR', name: 'Turabah' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'MEC', name: 'Mecca' },
          { code: 'MED', name: 'Medina' },
          { code: 'DAM', name: 'Dammam' },
          { code: 'KHO', name: 'Khobar' }
        ]
      },
      { code: 'BAH', name: 'Qassim',
        cities: [
          { code: 'BAH', name: 'Buraidah' },
          { code: 'UN', name: 'Unayzah' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'MEC', name: 'Mecca' },
          { code: 'MED', name: 'Medina' },
          { code: 'JED', name: 'Jeddah' },
          { code: 'DAM', name: 'Dammam' },
          { code: 'KHO', name: 'Khobar' },
          { code: 'TAB', name: 'Tabuk' },
          { code: 'HAF', name: 'Hafar al-Batin' }
        ]
      },
      { code: 'JED', name: 'Jeddah',
        cities: [
          { code: 'JED', name: 'Jeddah' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'MEC', name: 'Mecca' },
          { code: 'MED', name: 'Medina' },
          { code: 'DAM', name: 'Dammam' },
          { code: 'KHO', name: 'Khobar' },
          { code: 'TAB', name: 'Tabuk' },
          { code: 'BAH', name: 'Buraidah' },
          { code: 'HAF', name: 'Hafar al-Batin' },
          { code: 'ABH', name: 'Abha' }
        ]
      },
      { code: 'KHO', name: 'Khobar',
        cities: [
          { code: 'KHO', name: 'Khobar' },
          { code: 'DAM', name: 'Dammam' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'JED', name: 'Jeddah' },
          { code: 'MEC', name: 'Mecca' },
          { code: 'MED', name: 'Medina' },
          { code: 'TAB', name: 'Tabuk' },
          { code: 'BAH', name: 'Buraidah' },
          { code: 'HAF', name: 'Hafar al-Batin' },
          { code: 'ABH', name: 'Abha' }
        ]
      },
      { code: 'DAM', name: 'Dammam',
        cities: [
          { code: 'DAM', name: 'Dammam' },
          { code: 'KHO', name: 'Khobar' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'JED', name: 'Jeddah' },
          { code: 'MEC', name: 'Mecca' },
          { code: 'MED', name: 'Medina' },
          { code: 'TAB', name: 'Tabuk' },
          { code: 'BAH', name: 'Buraidah' },
          { code: 'HAF', name: 'Hafar al-Batin' },
          { code: 'ABH', name: 'Abha' }
        ]
      },
      { code: 'ABH', name: 'Abha',
        cities: [
          { code: 'ABH', name: 'Abha' },
          { code: 'KHA', name: 'Khamis Mushait' },
          { code: 'BAH', name: 'Buraidah' },
          { code: 'NAJ', name: 'Najran' },
          { code: 'JIZ', name: 'Jizan' },
          { code: 'BIS', name: 'Bisha' },
          { code: 'TAB', name: 'Tabuk' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'JED', name: 'Jeddah' },
          { code: 'MEC', name: 'Mecca' }
        ]
      },
      { code: 'KHA', name: 'Khamis Mushait',
        cities: [
          { code: 'KHA', name: 'Khamis Mushait' },
          { code: 'ABH', name: 'Abha' },
          { code: 'BAH', name: 'Buraidah' },
          { code: 'NAJ', name: 'Najran' },
          { code: 'JIZ', name: 'Jizan' },
          { code: 'BIS', name: 'Bisha' },
          { code: 'TAB', name: 'Tabuk' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'JED', name: 'Jeddah' },
          { code: 'MEC', name: 'Mecca' }
        ]
      },
      { code: 'NAJ', name: 'Najran',
        cities: [
          { code: 'NAJ', name: 'Najran' },
          { code: 'ABH', name: 'Abha' },
          { code: 'KHA', name: 'Khamis Mushait' },
          { code: 'BAH', name: 'Buraidah' },
          { code: 'JIZ', name: 'Jizan' },
          { code: 'BIS', name: 'Bisha' },
          { code: 'TAB', name: 'Tabuk' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'JED', name: 'Jeddah' },
          { code: 'MEC', name: 'Mecca' }
        ]
      },
      { code: 'JIZ', name: 'Jizan',
        cities: [
          { code: 'JIZ', name: 'Jizan' },
          { code: 'ABH', name: 'Abha' },
          { code: 'KHA', name: 'Khamis Mushait' },
          { code: 'BAH', name: 'Buraidah' },
          { code: 'NAJ', name: 'Najran' },
          { code: 'BIS', name: 'Bisha' },
          { code: 'TAB', name: 'Tabuk' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'JED', name: 'Jeddah' },
          { code: 'MEC', name: 'Mecca' }
        ]
      },
      { code: 'BIS', name: 'Bisha',
        cities: [
          { code: 'BIS', name: 'Bisha' },
          { code: 'ABH', name: 'Abha' },
          { code: 'KHA', name: 'Khamis Mushait' },
          { code: 'BAH', name: 'Buraidah' },
          { code: 'NAJ', name: 'Najran' },
          { code: 'JIZ', name: 'Jizan' },
          { code: 'TAB', name: 'Tabuk' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'JED', name: 'Jeddah' },
          { code: 'MEC', name: 'Mecca' }
        ]
      },
      { code: 'HAF', name: 'Hafar al-Batin',
        cities: [
          { code: 'HAF', name: 'Hafar al-Batin' },
          { code: 'BAH', name: 'Buraidah' },
          { code: 'RIY', name: 'Riyadh' },
          { code: 'MEC', name: 'Mecca' },
          { code: 'MED', name: 'Medina' },
          { code: 'JED', name: 'Jeddah' },
          { code: 'DAM', name: 'Dammam' },
          { code: 'KHO', name: 'Khobar' },
          { code: 'TAB', name: 'Tabuk' },
          { code: 'ABH', name: 'Abha' }
        ]
      }
    ]
  };

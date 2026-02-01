/**
 * Senegal country data with regions, cities, and tax information
 */

import { Country } from './index';

export const senegal: Country = {
    code: 'SN',
    name: 'Senegal',
    taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' },
    provinces: [
      { code: 'DAK', name: 'Dakar',
        cities: [
          { code: 'DAK', name: 'Dakar' },
          { code: 'PIK', name: 'Pikine' },
          { code: 'THI', name: 'Thiès' },
          { code: 'KAO', name: 'Kaolack' },
          { code: 'TOU', name: 'Touba' },
          { code: 'SAINT', name: 'Saint-Louis' },
          { code: 'RUF', name: 'Rufisque' },
          { code: 'MBOUR', name: 'Mbour' },
          { code: 'ZIG', name: 'Ziguinchor' },
          { code: 'DIA', name: 'Diourbel' }
        ]
      },
      { code: 'THI', name: 'Thiès',
        cities: [
          { code: 'THI', name: 'Thiès' },
          { code: 'DAK', name: 'Dakar' },
          { code: 'PIK', name: 'Pikine' },
          { code: 'KAO', name: 'Kaolack' },
          { code: 'TOU', name: 'Touba' },
          { code: 'SAINT', name: 'Saint-Louis' },
          { code: 'RUF', name: 'Rufisque' },
          { code: 'MBOUR', name: 'Mbour' },
          { code: 'ZIG', name: 'Ziguinchor' },
          { code: 'DIA', name: 'Diourbel' }
        ]
      },
      { code: 'KAO', name: 'Kaolack',
        cities: [
          { code: 'KAO', name: 'Kaolack' },
          { code: 'DAK', name: 'Dakar' },
          { code: 'PIK', name: 'Pikine' },
          { code: 'THI', name: 'Thiès' },
          { code: 'TOU', name: 'Touba' },
          { code: 'SAINT', name: 'Saint-Louis' },
          { code: 'RUF', name: 'Rufisque' },
          { code: 'MBOUR', name: 'Mbour' },
          { code: 'ZIG', name: 'Ziguinchor' },
          { code: 'DIA', name: 'Diourbel' }
        ]
      },
      { code: 'TOU', name: 'Touba',
        cities: [
          { code: 'TOU', name: 'Touba' },
          { code: 'DAK', name: 'Dakar' },
          { code: 'PIK', name: 'Pikine' },
          { code: 'THI', name: 'Thiès' },
          { code: 'KAO', name: 'Kaolack' },
          { code: 'SAINT', name: 'Saint-Louis' },
          { code: 'RUF', name: 'Rufisque' },
          { code: 'MBOUR', name: 'Mbour' },
          { code: 'ZIG', name: 'Ziguinchor' },
          { code: 'DIA', name: 'Diourbel' }
        ]
      },
      { code: 'SAINT', name: 'Saint-Louis',
        cities: [
          { code: 'SAINT', name: 'Saint-Louis' },
          { code: 'DAK', name: 'Dakar' },
          { code: 'PIK', name: 'Pikine' },
          { code: 'THI', name: 'Thiès' },
          { code: 'KAO', name: 'Kaolack' },
          { code: 'TOU', name: 'Touba' },
          { code: 'RUF', name: 'Rufisque' },
          { code: 'MBOUR', name: 'Mbour' },
          { code: 'ZIG', name: 'Ziguinchor' },
          { code: 'DIA', name: 'Diourbel' }
        ]
      },
      { code: 'RUF', name: 'Rufisque',
        cities: [
          { code: 'RUF', name: 'Rufisque' },
          { code: 'DAK', name: 'Dakar' },
          { code: 'PIK', name: 'Pikine' },
          { code: 'THI', name: 'Thiès' },
          { code: 'KAO', name: 'Kaolack' },
          { code: 'TOU', name: 'Touba' },
          { code: 'SAINT', name: 'Saint-Louis' },
          { code: 'MBOUR', name: 'Mbour' },
          { code: 'ZIG', name: 'Ziguinchor' },
          { code: 'DIA', name: 'Diourbel' }
        ]
      },
      { code: 'MBOUR', name: 'Mbour',
        cities: [
          { code: 'MBOUR', name: 'Mbour' },
          { code: 'DAK', name: 'Dakar' },
          { code: 'PIK', name: 'Pikine' },
          { code: 'THI', name: 'Thiès' },
          { code: 'KAO', name: 'Kaolack' },
          { code: 'TOU', name: 'Touba' },
          { code: 'SAINT', name: 'Saint-Louis' },
          { code: 'RUF', name: 'Rufisque' },
          { code: 'ZIG', name: 'Ziguinchor' },
          { code: 'DIA', name: 'Diourbel' }
        ]
      },
      { code: 'ZIG', name: 'Ziguinchor',
        cities: [
          { code: 'ZIG', name: 'Ziguinchor' },
          { code: 'DAK', name: 'Dakar' },
          { code: 'PIK', name: 'Pikine' },
          { code: 'THI', name: 'Thiès' },
          { code: 'KAO', name: 'Kaolack' },
          { code: 'TOU', name: 'Touba' },
          { code: 'SAINT', name: 'Saint-Louis' },
          { code: 'RUF', name: 'Rufisque' },
          { code: 'MBOUR', name: 'Mbour' },
          { code: 'DIA', name: 'Diourbel' }
        ]
      },
      { code: 'DIA', name: 'Diourbel',
        cities: [
          { code: 'DIA', name: 'Diourbel' },
          { code: 'DAK', name: 'Dakar' },
          { code: 'PIK', name: 'Pikine' },
          { code: 'THI', name: 'Thiès' },
          { code: 'KAO', name: 'Kaolack' },
          { code: 'TOU', name: 'Touba' },
          { code: 'SAINT', name: 'Saint-Louis' },
          { code: 'RUF', name: 'Rufisque' },
          { code: 'MBOUR', name: 'Mbour' },
          { code: 'ZIG', name: 'Ziguinchor' }
        ]
      },
      { code: 'LOU', name: 'Louga',
        cities: [
          { code: 'LOU', name: 'Louga' },
          { code: 'DAK', name: 'Dakar' },
          { code: 'PIK', name: 'Pikine' },
          { code: 'THI', name: 'Thiès' },
          { code: 'KAO', name: 'Kaolack' },
          { code: 'TOU', name: 'Touba' },
          { code: 'SAINT', name: 'Saint-Louis' },
          { code: 'RUF', name: 'Rufisque' },
          { code: 'MBOUR', name: 'Mbour' },
          { code: 'ZIG', name: 'Ziguinchor' }
        ]
      },
      { code: 'FAT', name: 'Fatick',
        cities: [
          { code: 'FAT', name: 'Fatick' },
          { code: 'DAK', name: 'Dakar' },
          { code: 'PIK', name: 'Pikine' },
          { code: 'THI', name: 'Thiès' },
          { code: 'KAO', name: 'Kaolack' },
          { code: 'TOU', name: 'Touba' },
          { code: 'SAINT', name: 'Saint-Louis' },
          { code: 'RUF', name: 'Rufisque' },
          { code: 'MBOUR', name: 'Mbour' },
          { code: 'ZIG', name: 'Ziguinchor' }
        ]
      },
      { code: 'KOL', name: 'Kolda',
        cities: [
          { code: 'KOL', name: 'Kolda' },
          { code: 'DAK', name: 'Dakar' },
          { code: 'PIK', name: 'Pikine' },
          { code: 'THI', name: 'Thiès' },
          { code: 'KAO', name: 'Kaolack' },
          { code: 'TOU', name: 'Touba' },
          { code: 'SAINT', name: 'Saint-Louis' },
          { code: 'RUF', name: 'Rufisque' },
          { code: 'MBOUR', name: 'Mbour' },
          { code: 'ZIG', name: 'Ziguinchor' }
        ]
      },
      { code: 'MAT', name: 'Matam',
        cities: [
          { code: 'MAT', name: 'Matam' },
          { code: 'DAK', name: 'Dakar' },
          { code: 'PIK', name: 'Pikine' },
          { code: 'THI', name: 'Thiès' },
          { code: 'KAO', name: 'Kaolack' },
          { code: 'TOU', name: 'Touba' },
          { code: 'SAINT', name: 'Saint-Louis' },
          { code: 'RUF', name: 'Rufisque' },
          { code: 'MBOUR', name: 'Mbour' },
          { code: 'ZIG', name: 'Ziguinchor' }
        ]
      },
      { code: 'SED', name: 'Sédhiou',
        cities: [
          { code: 'SED', name: 'Sédhiou' },
          { code: 'DAK', name: 'Dakar' },
          { code: 'PIK', name: 'Pikine' },
          { code: 'THI', name: 'Thiès' },
          { code: 'KAO', name: 'Kaolack' },
          { code: 'TOU', name: 'Touba' },
          { code: 'SAINT', name: 'Saint-Louis' },
          { code: 'RUF', name: 'Rufisque' },
          { code: 'MBOUR', name: 'Mbour' },
          { code: 'ZIG', name: 'Ziguinchor' }
        ]
      },
      { code: 'TAM', name: 'Tambacounda',
        cities: [
          { code: 'TAM', name: 'Tambacounda' },
          { code: 'DAK', name: 'Dakar' },
          { code: 'PIK', name: 'Pikine' },
          { code: 'THI', name: 'Thiès' },
          { code: 'KAO', name: 'Kaolack' },
          { code: 'TOU', name: 'Touba' },
          { code: 'SAINT', name: 'Saint-Louis' },
          { code: 'RUF', name: 'Rufisque' },
          { code: 'MBOUR', name: 'Mbour' },
          { code: 'ZIG', name: 'Ziguinchor' }
        ]
      },
      { code: 'KED', name: 'Kédougou',
        cities: [
          { code: 'KED', name: 'Kédougou' },
          { code: 'DAK', name: 'Dakar' },
          { code: 'PIK', name: 'Pikine' },
          { code: 'THI', name: 'Thiès' },
          { code: 'KAO', name: 'Kaolack' },
          { code: 'TOU', name: 'Touba' },
          { code: 'SAINT', name: 'Saint-Louis' },
          { code: 'RUF', name: 'Rufisque' },
          { code: 'MBOUR', name: 'Mbour' },
          { code: 'ZIG', name: 'Ziguinchor' }
        ]
      }
    ]
  };

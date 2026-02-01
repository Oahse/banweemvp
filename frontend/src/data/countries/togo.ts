/**
 * Togo country data with regions, cities, and tax information
 */

import { Country } from './index';

export const togo: Country = {
    code: 'TG',
    name: 'Togo',
    taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' },
    provinces: [
      { code: 'MAR', name: 'Maritime',
        cities: [
          { code: 'LOM', name: 'Lomé' },
          { code: 'TSV', name: 'Tsévié' },
          { code: 'ANE', name: 'Aného' },
          { code: 'VOG', name: 'Vogan' },
          { code: 'TAB', name: 'Tabligbo' },
          { code: 'BAG', name: 'Baguida' },
          { code: 'TOG', name: 'Togoville' },
          { code: 'AGB', name: 'Agbodrafo' },
          { code: 'KPA', name: 'Kpagan' },
          { code: 'AME', name: 'Amoutivé' }
        ]
      },
      { code: 'PLA', name: 'Plateaux',
        cities: [
          { code: 'ATA', name: 'Atakpamé' },
          { code: 'KPA', name: 'Kpalimé' },
          { code: 'NOT', name: 'Notse' },
          { code: 'BAD', name: 'Badou' },
          { code: 'SOD', name: 'Sodoké' },
          { code: 'BLE', name: 'Blitta' },
          { code: 'DAN', name: 'Danyi' },
          { code: 'EST', name: 'Est-Mono' },
          { code: 'HOU', name: 'Haho' },
          { code: 'MO', name: 'Moyen-Mono' }
        ]
      },
      { code: 'CEN', name: 'Centrale',
        cities: [
          { code: 'SOK', name: 'Sokodé' },
          { code: 'TCH', name: 'Tchamba' },
          { code: 'SOT', name: 'Sotouboua' },
          { code: 'TCH2', name: 'Tchamba' },
          { code: 'BLA', name: 'Blitta' },
          { code: 'PRE', name: 'Préfecture de Tchamba' },
          { code: 'BAF', name: 'Bafilo' },
          { code: 'GUE', name: 'Guérin-Kouka' },
          { code: 'ASS', name: 'Assoli' },
          { code: 'TCH3', name: 'Tchamba' }
        ]
      },
      { code: 'KAR', name: 'Kara',
        cities: [
          { code: 'KAR', name: 'Kara' },
          { code: 'BAF', name: 'Bafilo' },
          { code: 'NIA', name: 'Niamtougou' },
          { code: 'DAP', name: 'Dapaong' },
          { code: 'BASS', name: 'Bassar' },
          { code: 'BIN', name: 'Binga' },
          { code: 'KAN', name: 'Kandé' },
          { code: 'PRE', name: 'Préfecture de Kara' },
          { code: 'DAN', name: 'Doufelgou' },
          { code: 'KOT', name: 'Kozah' }
        ]
      },
      { code: 'SAV', name: 'Savanes',
        cities: [
          { code: 'DAP', name: 'Dapaong' },
          { code: 'BASS', name: 'Bassar' },
          { code: 'BIN', name: 'Binga' },
          { code: 'KAN', name: 'Kandé' },
          { code: 'COT', name: 'Cinkassé' },
          { code: 'MAD', name: 'Mandouri' },
          { code: 'OUI', name: 'Ounianga' },
          { code: 'TAN', name: 'Tandjouaré' },
          { code: 'TON', name: 'Tone' },
          { code: 'PRE', name: 'Préfecture de Dapaong' }
        ]
      }
    ]
  };

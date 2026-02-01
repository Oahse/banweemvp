/**
 * Sierra Leone country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const sierraLeone: Country = {
    code: 'SL',
    name: 'Sierra Leone',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SLL', region: 'MEA' },
    provinces: [
      { code: 'EAST', name: 'Eastern Province',
        cities: [
          { code: 'KEN', name: 'Kenema' },
          { code: 'KAI', name: 'Kailahun' },
          { code: 'PAN', name: 'Panguma' },
          { code: 'SEG', name: 'Segbwema' },
          { code: 'DAR', name: 'Darlu' },
          { code: 'KON', name: 'Kono' },
          { code: 'MOT', name: 'Motema' },
          { code: 'YENG', name: 'Yengema' },
          { code: 'KOI', name: 'Koidu' },
          { code: 'TONGO', name: 'Tongo' }
        ]
      },
      { code: 'NORT', name: 'Northern Province',
        cities: [
          { code: 'MAK', name: 'Makeni' },
          { code: 'KAM', name: 'Kambia' },
          { code: 'KAR', name: 'Karina' },
          { code: 'LUN', name: 'Lunsar' },
          { code: 'PORT', name: 'Port Loko' },
          { code: 'ROR', name: 'Rokel' },
          { code: 'TON', name: 'Tonkolili' },
          { code: 'BAM', name: 'Bambali' },
          { code: 'MAS', name: 'Masingbi' },
          { code: 'MAT', name: 'Matotoka' }
        ]
      },
      { code: 'SOUT', name: 'Southern Province',
        cities: [
          { code: 'BO', name: 'Bo' },
          { code: 'POT', name: 'Pujehun' },
          { code: 'BON', name: 'Bonthe' },
          { code: 'MOT', name: 'Moyamba' },
          { code: 'PEJ', name: 'Pujehun' },
          { code: 'SEG', name: 'Segbwema' },
          { code: 'DAR', name: 'Darlu' },
          { code: 'KON', name: 'Kono' },
          { code: 'KEN', name: 'Kenema' },
          { code: 'KAI', name: 'Kailahun' }
        ]
      },
      { code: 'WEST', name: 'Western Area',
        cities: [
          { code: 'FRE', name: 'Freetown' },
          { code: 'WAT', name: 'Waterloo' },
          { code: 'HAST', name: 'Hastings' },
          { code: 'PEP', name: 'Pepperl' },
          { code: 'REG', name: 'Regent' },
          { code: 'JUI', name: 'Jui' },
          { code: 'LEO', name: 'Leicester' },
          { code: 'WIL', name: 'Wilberforce' },
          { code: 'GOD', name: 'Godrich' },
          { code: 'KOS', name: 'Kossoh Town' }
        ]
      },
      { code: 'WES', name: 'Western Province',
        cities: [
          { code: 'FRE', name: 'Freetown' },
          { code: 'WAT', name: 'Waterloo' },
          { code: 'HAST', name: 'Hastings' },
          { code: 'PEP', name: 'Pepperl' },
          { code: 'REG', name: 'Regent' },
          { code: 'JUI', name: 'Jui' },
          { code: 'LEO', name: 'Leicester' },
          { code: 'WIL', name: 'Wilberforce' },
          { code: 'GOD', name: 'Godrich' },
          { code: 'KOS', name: 'Kossoh Town' }
        ]
      },
      { code: 'NOR', name: 'North West Province',
        cities: [
          { code: 'MAK', name: 'Makeni' },
          { code: 'KAM', name: 'Kambia' },
          { code: 'KAR', name: 'Karina' },
          { code: 'LUN', name: 'Lunsar' },
          { code: 'PORT', name: 'Port Loko' },
          { code: 'ROR', name: 'Rokel' },
          { code: 'TON', name: 'Tonkolili' },
          { code: 'BAM', name: 'Bambali' },
          { code: 'MAS', name: 'Masingbi' },
          { code: 'MAT', name: 'Matotoka' }
        ]
      }
    ]
  };

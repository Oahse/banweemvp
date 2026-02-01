/**
 * Gambia country data with divisions and cities
 */

import { Country } from './index';

export const gambia: Country = {
  code: 'GM',
  name: 'Gambia',
  flag: '🇬🇲',
  capital: 'Banjul',
  area: 10689,
  currencySymbol: 'D',
  officialLanguages: ['English'],
  demonym: 'Gambian',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'GMD', region: 'MEA' },
  divisions: [
    { code: 'BAN', name: 'Banjul', type: 'division',
      cities: [
        { code: 'BANJUL', name: 'Banjul' },
        { code: 'SEREKUNDA', name: 'Serekunda' },
        { code: 'BRIKAMA', name: 'Brikama' },
        { code: 'BAKAU', name: 'Bakau' },
        { code: 'SUWARE', name: 'Suware' }
      ]
    },
    { code: 'KAN', name: 'Kanifing', type: 'division',
      cities: [
        { code: 'SEREKUNDA', name: 'Serekunda' },
        { code: 'BAKAU', name: 'Bakau' },
        { code: 'BRIKAMA', name: 'Brikama' },
        { code: 'SUWARE', name: 'Suware' },
        { code: 'BANJUL', name: 'Banjul' }
      ]
    },
    { code: 'BRI', name: 'Brikama', type: 'division',
      cities: [
        { code: 'BRIKAMA', name: 'Brikama' },
        { code: 'SUWARE', name: 'Suware' },
        { code: 'SEREKUNDA', name: 'Serekunda' },
        { code: 'BAKAU', name: 'Bakau' },
        { code: 'BANJUL', name: 'Banjul' }
      ]
    },
    { code: 'MAN', name: 'Mansakonko', type: 'division',
      cities: [
        { code: 'MANSAKONKO', name: 'Mansakonko' },
        { code: 'SOMA', name: 'Soma' },
        { code: 'JARREH', name: 'Jarreh' },
        { code: 'PATEH', name: 'Pateh' },
        { code: 'NYANGA', name: 'Nyanga' }
      ]
    },
    { code: 'JAN', name: 'Janjanbureh', type: 'division',
      cities: [
        { code: 'JANJANBUREH', name: 'Janjanbureh' },
        { code: 'GEORGETOWN', name: 'Georgetown' },
        { code: 'BAFATA', name: 'Bafata' },
        { code: 'KUNTAUR', name: 'Kuntaur' },
        { code: 'WASSU', name: 'Wassu' }
      ]
    },
    { code: 'KER', name: 'Kerewan', type: 'division',
      cities: [
        { code: 'KEREWAN', name: 'Kerewan' },
        { code: 'BARRA', name: 'Barra' },
        { code: 'ESSAU', name: 'Essau' },
        { code: 'ALBREDA', name: 'Albreda' },
        { code: 'JUFFUREH', name: 'Juffureh' }
      ]
    },
    { code: 'KUN', name: 'Kuntaur', type: 'division',
      cities: [
        { code: 'KUNTAUR', name: 'Kuntaur' },
        { code: 'JANJANBUREH', name: 'Janjanbureh' },
        { code: 'GEORGETOWN', name: 'Georgetown' },
        { code: 'BAFATA', name: 'Bafata' },
        { code: 'WASSU', name: 'Wassu' }
      ]
    },
    { code: 'LOW', name: 'Lower River', type: 'division',
      cities: [
        { code: 'MANSANKONKO', name: 'Mansankonko' },
        { code: 'SOMA', name: 'Soma' },
        { code: 'JARREH', name: 'Jarreh' },
        { code: 'PATEH', name: 'Pateh' },
        { code: 'NYANGA', name: 'Nyanga' }
      ]
    },
    { code: 'UPP', name: 'Upper River', type: 'division',
      cities: [
        { code: 'BAFATA', name: 'Bafata' },
        { code: 'KUNTAUR', name: 'Kuntaur' },
        { code: 'JANJANBUREH', name: 'Janjanbureh' },
        { code: 'GEORGETOWN', name: 'Georgetown' },
        { code: 'WASSU', name: 'Wassu' }
      ]
    },
    { code: 'NOR', name: 'North Bank', type: 'division',
      cities: [
        { code: 'KEREWAN', name: 'Kerewan' },
        { code: 'BARRA', name: 'Barra' },
        { code: 'ESSAU', name: 'Essau' },
        { code: 'ALBREDA', name: 'Albreda' },
        { code: 'JUFFUREH', name: 'Juffureh' }
      ]
    },
    { code: 'CEN', name: 'Central River', type: 'division',
      cities: [
        { code: 'JANJANBUREH', name: 'Janjanbureh' },
        { code: 'GEORGETOWN', name: 'Georgetown' },
        { code: 'BAFATA', name: 'Bafata' },
        { code: 'KUNTAUR', name: 'Kuntaur' },
        { code: 'WASSU', name: 'Wassu' }
      ]
    },
    { code: 'WES', name: 'West Coast', type: 'division',
      cities: [
        { code: 'BRIKAMA', name: 'Brikama' },
        { code: 'SUWARE', name: 'Suware' },
        { code: 'SEREKUNDA', name: 'Serekunda' },
        { code: 'BAKAU', name: 'Bakau' },
        { code: 'BANJUL', name: 'Banjul' }
      ]
    }
  ]
};

export default gambia;

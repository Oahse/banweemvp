/**
 * Mozambique country data with provinces and cities
 */

import { Country } from './index';

export const mozambique: Country = {
  code: 'MZ',
  name: 'Mozambique',
  flag: '🇲🇲',
  capital: 'Maputo',
  area: 801590,
  currencySymbol: 'MT',
  officialLanguages: ['Portuguese'],
  demonym: 'Mozambican',
  taxInfo: { standardRate: 17, taxName: 'VAT', currency: 'MZN', region: 'MEA' },
  divisions: [
    { code: 'MAP', name: 'Maputo', type: 'province',
      cities: [
        { code: 'MAPUTO', name: 'Maputo' },
        { code: 'MATOLA', name: 'Matola' },
        { code: 'NAMPULA', name: 'Nampula' },
        { code: 'BEIRA', name: 'Beira' },
        { code: 'CHIMOIO', name: 'Chimoio' },
        { code: 'QUELIMANE', name: 'Quelimane' },
        { code: 'TETE', name: 'Tete' },
        { code: 'CHOKWE', name: 'Chokwe' },
        { code: 'MANICA', name: 'Manica' },
        { code: 'GONDOLA', name: 'Gondola' }
      ]
    },
    { code: 'MAN', name: 'Manica', type: 'province',
      cities: [
        { code: 'CHIMOIO', name: 'Chimoio' },
        { code: 'TETE', name: 'Tete' },
        { code: 'CHOKWE', name: 'Chokwe' },
        { code: 'MANICA', name: 'Manica' },
        { code: 'GONDOLA', name: 'Gondola' },
        { code: 'MAPUTO', name: 'Maputo' },
        { code: 'MATOLA', name: 'Matola' },
        { code: 'NAMPULA', name: 'Nampula' },
        { code: 'BEIRA', name: 'Beira' },
        { code: 'QUELIMANE', name: 'Quelimane' }
      ]
    },
    { code: 'TE', name: 'Tete', type: 'province',
      cities: [
        { code: 'TETE', name: 'Tete' },
        { code: 'CHOKWE', name: 'Chokwe' },
        { code: 'MANICA', name: 'Manica' },
        { code: 'GONDOLA', name: 'Gondola' },
        { code: 'MAPUTO', name: 'Maputo' },
        { code: 'MATOLA', name: 'Matola' },
        { code: 'NAMPULA', name: 'Nampula' },
        { code: 'BEIRA', name: 'Beira' },
        { code: 'QUELIMANE', name: 'Quelimane' },
        { code: 'CHIMOIO', name: 'Chimoio' }
      ]
    },
    { code: 'SOF', name: 'Sofala', type: 'province',
      cities: [
        { code: 'CHIMOIO', name: 'Chimoio' },
        { code: 'TETE', name: 'Tete' },
        { code: 'CHOKWE', name: 'Chokwe' },
        { code: 'MANICA', name: 'Manica' },
        { code: 'GONDOLA', name: 'Gondola' },
        { code: 'MAPUTO', name: 'Maputo' },
        { code: 'MATOLA', name: 'Matola' },
        { code: 'NAMPULA', name: 'Nampula' },
        { code: 'BEIRA', name: 'Beira' },
        { code: 'QUELIMANE', name: 'Quelimane' },
        { code: 'CHIMOIO', name: 'Chimoio' }
      ]
    },
    { code: 'ZAM', name: 'Zambezia', type: 'province',
      cities: [
        { code: 'QUELIMANE', name: 'Quelimane' },
        { code: 'TETE', name: 'Tete' },
        { code: 'CHOKWE', name: 'Chokwe' },
        { code: 'MANICA', name: 'Manica' },
        { code: 'GONDOLA', name: 'Gondola' },
        { code: 'MAPUTO', name: 'Maputo' },
        { code: 'MATOLA', name: 'Matola' },
        { code: 'NAMPULA', name: 'Nampula' },
        { code: 'BEIRA', name: 'Beira' },
        { code: 'QUELIMANE', name: 'Quelimane' },
        { code: 'CHIMOIO', name: 'Chimoio' }
      ]
    },
    { code: 'NAM', name: 'Nampula', type: 'province',
      cities: [
        { code: 'NAMPULA', name: 'Nampula' },
        { code: 'LICHINGA', name: 'Lichinga' },
        { code: 'CUAMBA', name: 'Cuamba' },
        { code: 'MACHIPAPA', name: 'Machipapa' },
        { code: 'MONTUEPUE', name: 'Montepuez' },
        { code: 'MULANJE', name: 'Mulanje' },
        { code: 'BALAMA', name: 'Balama' },
        { code: 'GURUE', name: 'Gurue' },
        { code: 'MAVIGO', name: 'Mavigo' }
      ]
    },
    { code: 'NI', name: 'Niassa', type: 'province',
      cities: [
        { code: 'LICHINGA', name: 'Lichinga' },
        { code: 'CUAMBA', name: 'Cuamba' },
        { code: 'MACHIPAPA', name: 'Machipapa' },
        { code: 'MONTUEPUE', name: 'Montepuez' },
        { code: 'MULANJE', name: 'Mulanje' },
        { code: 'BALAMA', name: 'Balama' },
        { code: 'GURUE', name: 'Gurue' },
        { code: 'MAVIGO', name: 'Mavigo' },
        { code: 'NAMPULA', name: 'Nampula' }
      ]
    },
    { code: 'CAB', name: 'Cabo Delgado', type: 'province',
      cities: [
        { code: 'PEMBA', name: 'Pemba' },
        { code: 'MONTEPUE', name: 'Montepuez' },
        { code: 'MULANJE', name: 'Mulanje' },
        { code: 'BALAMA', name: 'Balama' },
        { code: 'GURUE', name: 'Gurue' },
        { code: 'MAVIGO', name: 'Mavigo' },
        { code: 'CHIMOIO', name: 'Chimoio' },
        { code: 'TETE', name: 'Tete' },
        { code: 'CHOKWE', name: 'Chokwe' },
        { code: 'MANICA', name: 'Manica' },
        { code: 'GONDOLA', name: 'Gondola' }
      ]
    },
    { code: 'GAZ', name: 'Gaza', type: 'province',
      cities: [
        { code: 'XAI-XAI', name: 'Xai-Xai' },
        { code: 'CHOKWE', name: 'Chokwe' },
        { code: 'MANICA', name: 'Manica' },
        { code: 'GONDOLA', name: 'Gondola' },
        { code: 'MAPUTO', name: 'Maputo' },
        { code: 'MATOLA', name: 'Matola' },
        { code: 'NAMPULA', name: 'Nampula' },
        { code: 'BEIRA', name: 'Beira' },
        { code: 'QUELIMANE', name: 'Quelimane' },
        { code: 'CHIMOIO', name: 'Chimoio' }
      ]
    },
    { code: 'INI', name: 'Inhambane', type: 'province',
      cities: [
        { code: 'INHAMBANE', name: 'Inhambane' },
        { code: 'VILANKULO', name: 'Vilankulo' },
        { code: 'MOCIMBA', name: 'Mocímboa' },
        { code: 'CHOKWE', name: 'Chokwe' },
        { code: 'MANICA', name: 'Manica' },
        { code: 'GONDOLA', name: 'Gondola' },
        { code: 'MAPUTO', name: 'Maputo' },
        { code: 'MATOLA', name: 'Matola' },
        { code: 'NAMPULA', name: 'Nampula' },
        { code: 'BEIRA', name: 'Beira' },
        { code: 'QUELIMANE', name: 'Quelimane' },
        { code: 'CHIMOIO', name: 'Chimoio' }
      ]
    }
  ]
};

export default mozambique;

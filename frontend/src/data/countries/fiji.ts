/**
 * Fiji country data with divisions, cities, and tax information
 */

import { Country } from './index';

export const fiji: Country = {
    code: 'FJ',
    name: 'Fiji',
    taxInfo: { standardRate: 9, taxName: 'VAT', currency: 'FJD', region: 'APAC' },
    provinces: [
      { code: 'C', name: 'Central Division',
        cities: [
          { code: 'SUVA', name: 'Suva' },
          { code: 'NAUSORI', name: 'Nausori' },
          { code: 'NAKASI', name: 'Nakasi' },
          { code: 'REWA', name: 'Rewa' },
          { code: 'NATADOLA', name: 'Natadola' },
          { code: 'SIGATOKA', name: 'Sigatoka' },
          { code: 'KOROLEVU', name: 'Korolevu' },
          { code: 'NAVUA', name: 'Navua' },
          { code: 'DEUBA', name: 'Deuba' },
          { code: 'PACIFIC', name: 'Pacific Harbour' }
        ]
      },
      { code: 'W', name: 'Western Division',
        cities: [
          { code: 'NADI', name: 'Nadi' },
          { code: 'LAUTOKA', name: 'Lautoka' },
          { code: 'BA', name: 'Ba' },
          { code: 'TAVUA', name: 'Tavua' },
          { code: 'RAKIRAKI', name: 'Rakiraki' },
          { code: 'VATUKOULA', name: 'Vatukoula' },
          { code: 'KOROLEVU', name: 'Korolevu' },
          { code: 'NAMASIMASI', name: 'Namasimasi' },
          { code: 'VATIA', name: 'Vatia' },
          { code: 'YANUCA', name: 'Yanuca' }
        ]
      },
      { code: 'N', name: 'Northern Division',
        cities: [
          { code: 'LABASA', name: 'Labasa' },
          { code: 'SAVUSAVU', name: 'Savusavu' },
          { code: 'TAVEUNI', name: 'Taveuni' },
          { code: 'SEAQUAKE', name: 'Seaqaqa' },
          { code: 'NABOUWALU', name: 'Nabouwalu' },
          { code: 'DREKETI', name: 'Dreketi' },
          { code: 'MACUATA', name: 'Macuata' },
          { code: 'BUA', name: 'Bua' },
          { code: 'CAKAUDROVE', name: 'Cakaudrove' },
          { code: 'MATANU', name: 'Matanu' }
        ]
      },
      { code: 'E', name: 'Eastern Division',
        cities: [
          { code: 'LEVUKA', name: 'Levuka' },
          { code: 'OVALAU', name: 'Ovalau' },
          { code: 'KADAVU', name: 'Kadavu' },
          { code: 'VUNISEA', name: 'Vunisea' },
          { code: 'MOALA', name: 'Moala' },
          { code: 'MATUKU', name: 'Matuku' },
          { code: 'NGAU', name: 'Ngau' },
          { code: 'YADUA', name: 'Yadua' },
          { code: 'VANUA', name: 'Vanua Levu' },
          { code: 'TAILEVU', name: 'Tailevu' }
        ]
      },
      { code: 'R', name: 'Rotuma',
        cities: [
          { code: 'ROTUMA', name: 'Rotuma' },
          { code: 'AHAU', name: 'Ahau' },
          { code: 'FAVAI', name: 'Favai' },
          { code: 'HAU', name: 'Hau' },
          { code: 'ITUMUTI', name: 'Itumuti' },
          { code: 'JUJU', name: 'Juju' },
          { code: 'LAU', name: 'Lau' },
          { code: 'MALHAHA', name: 'Malhaha' },
          { code: 'NOATAU', name: 'Noatau' },
          { code: 'PEPJEI', name: 'Pepjei' }
        ]
      }
    ]
};

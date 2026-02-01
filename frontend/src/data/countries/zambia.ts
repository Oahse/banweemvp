/**
 * Zambia country data with provinces and cities
 */

import { Country } from './index';

export const zambia: Country = {
  code: 'ZM',
  name: 'Zambia',
  flag: '🇿🇲',
  capital: 'Lusaka',
  area: 752612,
  currencySymbol: 'K',
  officialLanguages: ['English'],
  demonym: 'Zambian',
  taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'ZMW', region: 'MEA' },
  divisions: [
    { code: 'LUS', name: 'Lusaka', type: 'province',
      cities: [
        { code: 'LUSAKA', name: 'Lusaka' },
        { code: 'KITWE', name: 'Kitwe' },
        { code: 'NDOLA', name: 'Ndola' },
        { code: 'KABWE', name: 'Kabwe' },
        { code: 'CHINGOLA', name: 'Chingola' },
        { code: 'MUFULIRA', name: 'Mufulira' },
        { code: 'LIVINGSTONE', name: 'Livingstone' },
        { code: 'KASAMA', name: 'Kasama' },
        { code: 'SOLWEZI', name: 'Solwezi' },
        { code: 'MONGU', name: 'Mongu' }
      ]
    },
    { code: 'COP', name: 'Copperbelt', type: 'province',
      cities: [
        { code: 'KITWE', name: 'Kitwe' },
        { code: 'NDOLA', name: 'Ndola' },
        { code: 'CHINGOLA', name: 'Chingola' },
        { code: 'MUFULIRA', name: 'Mufulira' },
        { code: 'KABWE', name: 'Kabwe' },
        { code: 'LUSAKA', name: 'Lusaka' },
        { code: 'KASAMA', name: 'Kasama' },
        { code: 'SOLWEZI', name: 'Solwezi' },
        { code: 'MONGU', name: 'Mongu' },
        { code: 'LIVINGSTONE', name: 'Livingstone' }
      ]
    },
    { code: 'CEN', name: 'Central', type: 'province',
      cities: [
        { code: 'KABWE', name: 'Kabwe' },
        { code: 'KASAMA', name: 'Kasama' },
        { code: 'SOLWEZI', name: 'Solwezi' },
        { code: 'MONGU', name: 'Mongu' },
        { code: 'LUSAKA', name: 'Lusaka' },
        { code: 'KITWE', name: 'Kitwe' },
        { code: 'NDOLA', name: 'Ndola' },
        { code: 'CHINGOLA', name: 'Chingola' },
        { code: 'MUFULIRA', name: 'Mufulira' },
        { code: 'LIVINGSTONE', name: 'Livingstone' }
      ]
    },
    { code: 'EAS', name: 'Eastern', type: 'province',
      cities: [
        { code: 'CHIPATA', name: 'Chipata' },
        { code: 'CHINSALI', name: 'Chinsali' },
        { code: 'KASAMA', name: 'Kasama' },
        { code: 'SOLWEZI', name: 'Solwezi' },
        { code: 'MONGU', name: 'Mongu' },
        { code: 'LUSAKA', name: 'Lusaka' },
        { code: 'KITWE', name: 'Kitwe' },
        { code: 'NDOLA', name: 'Ndola' },
        { code: 'CHINGOLA', name: 'Chingola' },
        { code: 'MUFULIRA', name: 'Mufulira' }
      ]
    },
    { code: 'LUAP', name: 'Luapula', type: 'province',
      cities: [
        { code: 'MANS', name: 'Mansa' },
        { code: 'KASAMA', name: 'Kasama' },
        { code: 'SOLWEZI', name: 'Solwezi' },
        { code: 'MONGU', name: 'Mongu' },
        { code: 'LUSAKA', name: 'Lusaka' },
        { code: 'KITWE', name: 'Kitwe' },
        { code: 'NDOLA', name: 'Ndola' },
        { code: 'CHINGOLA', name: 'Chingola' },
        { code: 'MUFULIRA', name: 'Mufulira' },
        { code: 'LIVINGSTONE', name: 'Muchinga' }
      ]
    },
    { code: 'NOR', name: 'Northern', type: 'province',
      cities: [
        { code: 'KASAMA', name: 'Kasama' },
        { code: 'SOLWEZI', name: 'Solwezi' },
        { code: 'MONGU', name: 'Mongu' },
        { code: 'LUSAKA', name: 'Lusaka' },
        { code: 'KITWE', name: 'Kitwe' },
        { code: 'NDOLA', name: 'Ndola' },
        { code: 'CHINGOLA', name: 'Chingola' },
        { code: 'MUFULIRA', name: 'Mufulira' },
        { code: 'LIVINGSTONE', name: 'Livingstone' },
        { code: 'MPULUNGUSHI', name: 'Mpulungu' }
      ]
    },
    { code: 'NWES', name: 'North-Western', type: 'province',
      cities: [
        { code: 'SOLWEZI', name: 'Solwezi' },
        { code: 'MONGU', name: 'Mongu' },
        { code: 'KASAMA', name: 'Kasama' },
        { code: 'LUSAKA', name: 'Lusaka' },
        { code: 'KITWE', name: 'Kitwe' },
        { code: 'NDOLA', name: 'Ndola' },
        { code: 'CHINGOLA', name: 'Chingola' },
        { code: 'MUFULIRA', name: 'Mufulira' },
        { code: 'LIVINGSTONE', name: 'Livingstone' },
        { code: 'MPULUNGUSHI', name: 'Mpulungu' }
      ]
    },
    { code: 'SOU', name: 'Southern', type: 'province',
      cities: [
        { code: 'LIVINGSTONE', name: 'Livingstone' },
        { code: 'MUFULIRA', name: 'Mufulira' },
        { code: 'MONZE', name: 'Monze' },
        { code: 'MAZABUKA', name: 'Mazabuka' },
        { code: 'CHOMA', name: 'Choma' },
        { code: 'KALOMO', name: 'Kalomo' },
        { code: 'GWEEMBE', name: 'Gwembe' },
        { code: 'SIAMUNDU', name: 'Siavonga' },
        { code: 'SHANG', name: 'Shang' },
        { code: 'SENANGA', name: 'Senanga' }
      ]
    },
    { code: 'WES', name: 'Western', type: 'province',
      cities: [
        { code: 'MONGU', name: 'Mongu' },
        { code: 'KASAMA', name: 'Kasama' },
        { code: 'SOLWEZI', name: 'Solwezi' },
        { code: 'LUSAKA', name: 'Lusaka' },
        { code: 'KITWE', name: 'Kitwe' },
        { code: 'NDOLA', name: 'Ndola' },
        { code: 'CHINGOLA', name: 'Chingola' },
        { code: 'MUFULIRA', name: 'Mufulira' },
        { code: 'LIVINGSTONE', name: 'Livingstone' },
        { code: 'MPULUNGUSHI', name: 'Mpulungu' }
      ]
    }
  ]
};

export default zambia;

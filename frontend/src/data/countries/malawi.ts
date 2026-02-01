/**
 * Malawi country data with regions and cities
 */

import { Country } from './index';

export const malawi: Country = {
  code: 'MW',
  name: 'Malawi',
  flag: '🇲🇼',
  capital: 'Lilongwe',
  area: 118484,
  currencySymbol: 'MK',
  officialLanguages: ['English', 'Chichewa'],
  demonym: 'Malawian',
  taxInfo: { standardRate: 16.5, taxName: 'VAT', currency: 'MWK', region: 'MEA' },
  divisions: [
    { code: 'LIL', name: 'Lilongwe', type: 'region',
      cities: [
        { code: 'LILONGWE', name: 'Lilongwe' },
        { code: 'BLANTYRE', name: 'Blantyre' },
        { code: 'MZUZU', name: 'Mzuzu' },
        { code: 'ZOMBA', name: 'Zomba' },
        { code: 'KARONGA', name: 'Karonga' },
        { code: 'MANGOCHI', name: 'Mangochi' },
        { code: 'SALIMA', name: 'Salima' },
        { code: 'KASUNGU', name: 'Kasungu' },
        { code: 'NKHATA', name: 'Nkhata Bay' },
        { code: 'DEDZA', name: 'Dedza' }
      ]
    },
    { code: 'BLA', name: 'Blantyre', type: 'region',
      cities: [
        { code: 'BLANTYRE', name: 'Blantyre' },
        { code: 'MZUZU', name: 'Mzuzu' },
        { code: 'ZOMBA', name: 'Zomba' },
        { code: 'KARONGA', name: 'Karonga' },
        { code: 'MANGOCHI', name: 'Mangochi' },
        { code: 'SALIMA', name: 'Salima' },
        { code: 'KASUNGU', name: 'Kasungu' },
        { code: 'NKHATA', name: 'Nkhata Bay' },
        { code: 'DEDZA', name: 'Dedza' },
        { code: 'LILONGWE', name: 'Lilongwe' }
      ]
    },
    { code: 'MZU', name: 'Mzuzu', type: 'region',
      cities: [
        { code: 'MZUZU', name: 'Mzuzu' },
        { code: 'ZOMBA', name: 'Zomba' },
        { code: 'KARONGA', name: 'Karonga' },
        { code: 'MANGOCHI', name: 'Mangochi' },
        { code: 'SALIMA', name: 'Salima' },
        { code: 'KASUNGU', name: 'Kasungu' },
        { code: 'NKHATA', name: 'Nkhata Bay' },
        { code: 'DEDZA', name: 'Dedza' },
        { code: 'LILONGWE', name: 'Lilongwe' },
        { code: 'BLANTYRE', name: 'Blantyre' }
      ]
    },
    { code: 'ZOM', name: 'Zomba', type: 'region',
      cities: [
        { code: 'ZOMBA', name: 'Zomba' },
        { code: 'KARONGA', name: 'Karonga' },
        { code: 'MANGOCHI', name: 'Mangochi' },
        { code: 'SALIMA', name: 'Salima' },
        { code: 'KASUNGU', name: 'Kasungu' },
        { code: 'NKHATA', name: 'Nkhata Bay' },
        { code: 'DEDZA', name: 'Dedza' },
        { code: 'LILONGWE', name: 'Lilongwe' },
        { code: 'BLANTYRE', name: 'Blantyre' },
        { code: 'MZUZU', name: 'Mzuzu' }
      ]
    },
    { code: 'KAR', name: 'Karonga', type: 'region',
      cities: [
        { code: 'KARONGA', name: 'Karonga' },
        { code: 'MANGOCHI', name: 'Mangochi' },
        { code: 'SALIMA', name: 'Salima' },
        { code: 'KASUNGU', name: 'Kasungu' },
        { code: 'NKHATA', name: 'Nkhata Bay' },
        { code: 'DEDZA', name: 'Dedza' },
        { code: 'LILONGWE', name: 'Lilongwe' },
        { code: 'BLANTYRE', name: 'Blantyre' },
        { code: 'MZUZU', name: 'Mzuzu' },
        { code: 'ZOMBA', name: 'Zomba' }
      ]
    },
    { code: 'MAN', name: 'Mangochi', type: 'region',
      cities: [
        { code: 'MANGOCHI', name: 'Mangochi' },
        { code: 'SALIMA', name: 'Salima' },
        { code: 'KASUNGU', name: 'Kasungu' },
        { code: 'NKHATA', name: 'Nkhata Bay' },
        { code: 'DEDZA', name: 'Dedza' },
        { code: 'LILONGWE', name: 'Lilongwe' },
        { code: 'BLANTYRE', name: 'Blantyre' },
        { code: 'MZUZU', name: 'Mzuzu' },
        { code: 'ZOMBA', name: 'Zomba' },
        { code: 'KARONGA', name: 'Karonga' }
      ]
    },
    { code: 'SAL', name: 'Salima', type: 'region',
      cities: [
        { code: 'SALIMA', name: 'Salima' },
        { code: 'KASUNGU', name: 'Kasungu' },
        { code: 'NKHATA', name: 'Nkhata Bay' },
        { code: 'DEDZA', name: 'Dedza' },
        { code: 'LILONGWE', name: 'Lilongwe' },
        { code: 'BLANTYRE', name: 'Blantyre' },
        { code: 'MZUZU', name: 'Mzuzu' },
        { code: 'ZOMBA', name: 'Zomba' },
        { code: 'KARONGA', name: 'Karonga' },
        { code: 'MANGOCHI', name: 'Mangochi' }
      ]
    },
    { code: 'KAS', name: 'Kasungu', type: 'region',
      cities: [
        { code: 'KASUNGU', name: 'Kasungu' },
        { code: 'NKHATA', name: 'Nkhata Bay' },
        { code: 'DEDZA', name: 'Dedza' },
        { code: 'LILONGWE', name: 'Lilongwe' },
        { code: 'BLANTYRE', name: 'Blantyre' },
        { code: 'MZUZU', name: 'Mzuzu' },
        { code: 'ZOMBA', name: 'Zomba' },
        { code: 'KARONGA', name: 'Karonga' },
        { code: 'MANGOCHI', name: 'Mangochi' },
        { code: 'SALIMA', name: 'Salima' }
      ]
    },
    { code: 'NKH', name: 'Nkhata Bay', type: 'region',
      cities: [
        { code: 'NKHATA', name: 'Nkhata Bay' },
        { code: 'DEDZA', name: 'Dedza' },
        { code: 'LILONGWE', name: 'Lilongwe' },
        { code: 'BLANTYRE', name: 'Blantyre' },
        { code: 'MZUZU', name: 'Mzuzu' },
        { code: 'ZOMBA', name: 'Zomba' },
        { code: 'KARONGA', name: 'Karonga' },
        { code: 'MANGOCHI', name: 'Mangochi' },
        { code: 'SALIMA', name: 'Salima' },
        { code: 'KASUNGU', name: 'Kasungu' }
      ]
    },
    { code: 'DED', name: 'Dedza', type: 'region',
      cities: [
        { code: 'DEDZA', name: 'Dedza' },
        { code: 'LILONGWE', name: 'Lilongwe' },
        { code: 'BLANTYRE', name: 'Blantyre' },
        { code: 'MZUZU', name: 'Mzuzu' },
        { code: 'ZOMBA', name: 'Zomba' },
        { code: 'KARONGA', name: 'Karonga' },
        { code: 'MANGOCHI', name: 'Mangochi' },
        { code: 'SALIMA', name: 'Salima' },
        { code: 'KASUNGU', name: 'Kasungu' },
        { code: 'NKHATA', name: 'Nkhata Bay' }
      ]
    }
  ]
};

export default malawi;

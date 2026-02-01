/**
 * Malawi country data with districts, cities, and tax information
 */

import { Country } from './index';

export const malawi: Country = {
    code: 'MW',
    name: 'Malawi',
    taxInfo: { standardRate: 16.5, taxName: 'VAT', currency: 'MWK', region: 'MEA' },
    provinces: [
      { code: 'LIL', name: 'Lilongwe',
        cities: [
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' },
          { code: 'DED', name: 'Dedza' }
        ]
      },
      { code: 'BLA', name: 'Blantyre',
        cities: [
          { code: 'BLA', name: 'Blantyre' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' },
          { code: 'DED', name: 'Dedza' }
        ]
      },
      { code: 'MZU', name: 'Mzuzu',
        cities: [
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' },
          { code: 'DED', name: 'Dedza' }
        ]
      },
      { code: 'ZOM', name: 'Zomba',
        cities: [
          { code: 'ZOM', name: 'Zomba' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' },
          { code: 'DED', name: 'Dedza' }
        ]
      },
      { code: 'KAR', name: 'Karonga',
        cities: [
          { code: 'KAR', name: 'Karonga' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' },
          { code: 'DED', name: 'Dedza' }
        ]
      },
      { code: 'MAN', name: 'Mangochi',
        cities: [
          { code: 'MAN', name: 'Mangochi' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' },
          { code: 'DED', name: 'Dedza' }
        ]
      },
      { code: 'SAL', name: 'Salima',
        cities: [
          { code: 'SAL', name: 'Salima' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' },
          { code: 'DED', name: 'Dedza' }
        ]
      },
      { code: 'NKH', name: 'Nkhota Kota',
        cities: [
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'LIW', name: 'Liwonde' },
          { code: 'DED', name: 'Dedza' }
        ]
      },
      { code: 'LIW', name: 'Liwonde',
        cities: [
          { code: 'LIW', name: 'Liwonde' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'DED', name: 'Dedza' }
        ]
      },
      { code: 'DED', name: 'Dedza',
        cities: [
          { code: 'DED', name: 'Dedza' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' }
        ]
      },
      { code: 'NCH', name: 'Nchisi',
        cities: [
          { code: 'NCH', name: 'Nchisi' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' }
        ]
      },
      { code: 'NKH2', name: 'Nkhata Bay',
        cities: [
          { code: 'NKH2', name: 'Nkhata Bay' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' }
        ]
      },
      { code: 'NTC', name: 'Ntcheu',
        cities: [
          { code: 'NTC', name: 'Ntcheu' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' }
        ]
      },
      { code: 'NTU', name: 'Ntchisi',
        cities: [
          { code: 'NTU', name: 'Ntchisi' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' }
        ]
      },
      { code: 'PHO', name: 'Phalombe',
        cities: [
          { code: 'PHO', name: 'Phalombe' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' }
        ]
      },
      { code: 'RUM', name: 'Rumphi',
        cities: [
          { code: 'RUM', name: 'Rumphi' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' }
        ]
      },
      { code: 'THY', name: 'Thyolo',
        cities: [
          { code: 'THY', name: 'Thyolo' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' }
        ]
      },
      { code: 'MCH', name: 'Mchinji',
        cities: [
          { code: 'MCH', name: 'Mchinji' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' }
        ]
      },
      { code: 'BAL', name: 'Balaka',
        cities: [
          { code: 'BAL', name: 'Balaka' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' }
        ]
      },
      { code: 'DOM', name: 'Domasi',
        cities: [
          { code: 'DOM', name: 'Domasi' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' }
        ]
      },
      { code: 'MUL', name: 'Mulanje',
        cities: [
          { code: 'MUL', name: 'Mulanje' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' }
        ]
      },
      { code: 'CHI', name: 'Chikwawa',
        cities: [
          { code: 'CHI', name: 'Chikwawa' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' }
        ]
      },
      { code: 'NSAN', name: 'Nsanje',
        cities: [
          { code: 'NSAN', name: 'Nsanje' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' }
        ]
      },
      { code: 'MWA', name: 'Mwanza',
        cities: [
          { code: 'MWA', name: 'Mwanza' },
          { code: 'LIL', name: 'Lilongwe' },
          { code: 'BLA', name: 'Blantyre' },
          { code: 'MZU', name: 'Mzuzu' },
          { code: 'ZOM', name: 'Zomba' },
          { code: 'KAR', name: 'Karonga' },
          { code: 'MAN', name: 'Mangochi' },
          { code: 'SAL', name: 'Salima' },
          { code: 'NKH', name: 'Nkhota Kota' },
          { code: 'LIW', name: 'Liwonde' }
        ]
      }
    ]
  };

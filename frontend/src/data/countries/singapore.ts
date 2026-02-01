/**
 * Singapore country data with regions, cities, and tax information
 */

import { Country } from './index';

export const singapore: Country = {
    code: 'SG',
    name: 'Singapore',
    taxInfo: { standardRate: 8, taxName: 'GST', currency: 'SGD', region: 'APAC' },
    provinces: [
      { code: 'CCR', name: 'Central Region',
        cities: [
          { code: 'SING', name: 'Singapore' },
          { code: 'ORCHARD', name: 'Orchard' },
          { code: 'MARINA', name: 'Marina Bay' },
          { code: 'RAFFLES', name: 'Raffles Place' },
          { code: 'CHINATOWN', name: 'Chinatown' },
          { code: 'LITTLE', name: 'Little India' },
          { code: 'KAMONG', name: 'Kampong Glam' },
          { code: 'TANGLIN', name: 'Tanglin' },
          { code: 'NOVENA', name: 'Novena' },
          { code: 'TOA', name: 'Toa Payoh' }
        ]
      },
      { code: 'ER', name: 'East Region',
        cities: [
          { code: 'TAMPINES', name: 'Tampines' },
          { code: 'PASIR', name: 'Pasir Ris' },
          { code: 'BEDOK', name: 'Bedok' },
          { code: 'PAYA', name: 'Paya Lebar' },
          { code: 'CHANGI', name: 'Changi' },
          { code: 'SIGLAP', name: 'Siglap' },
          { code: 'KEMBANGAN', name: 'Kembangan' },
          { code: 'EUNOS', name: 'Eunos' },
          { code: 'KATONG', name: 'Katong' },
          { code: 'JOO', name: 'Joo Chiat' }
        ]
      },
      { code: 'NR', name: 'North Region',
        cities: [
          { code: 'WOODLANDS', name: 'Woodlands' },
          { code: 'YISHUN', name: 'Yishun' },
          { code: 'SEMBAWANG', name: 'Sembawang' },
          { code: 'LIM', name: 'Lim Chu Kang' },
          { code: 'MANDAI', name: 'Mandai' },
          { code: 'SUNGEI', name: 'Sungei Kadut' },
          { code: 'KRETA', name: 'Kreta Ayer' },
          { code: 'ADMIRALTY', name: 'Admiralty' },
          { code: 'CANBERRA', name: 'Canberra' },
          { code: 'SPRING', name: 'Springfield' }
        ]
      },
      { code: 'NER', name: 'North-East Region',
        cities: [
          { code: 'HOUGANG', name: 'Hougang' },
          { code: 'SERANGOON', name: 'Serangoon' },
          { code: 'ANG', name: 'Ang Mo Kio' },
          { code: 'PUNGGOL', name: 'Punggol' },
          { code: 'SENGKANG', name: 'Sengkang' },
          { code: 'BISHAN', name: 'Bishan' },
          { code: 'TOA', name: 'Toa Payoh' },
          { code: 'MACPHERSON', name: 'MacPherson' },
          { code: 'POTONG', name: 'Potong Pasir' },
          { code: 'UPPER', name: 'Upper Serangoon' }
        ]
      },
      { code: 'WR', name: 'West Region',
        cities: [
          { code: 'JURONG', name: 'Jurong' },
          { code: 'BUKIT', name: 'Bukit Batok' },
          { code: 'CLEMENTI', name: 'Clementi' },
          { code: 'QUEENSTOWN', name: 'Queenstown' },
          { code: 'BUKIT', name: 'Bukit Panjang' },
          { code: 'CHOA', name: 'Choa Chu Kang' },
          { code: 'TENGAH', name: 'Tengah' },
          { code: 'BOON', name: 'Boon Lay' },
          { code: 'GHIM', name: 'Ghim Moh' },
          { code: 'PIONEER', name: 'Pioneer' }
        ]
      }
    ]
};

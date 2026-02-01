/**
 * Brunei country data with districts and cities
 */

import { Country } from './index';

export const brunei: Country = {
  code: 'BN',
  name: 'Brunei',
  flag: '🇧🇳',
  capital: 'Bandar Seri Begawan',
  area: 5765,
  currencySymbol: 'B$',
  officialLanguages: ['Malay', 'English'],
  demonym: 'Bruneian',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'BSB', name: 'Bandar Seri Begawan', type: 'district',
      cities: [
        { code: 'BANDAR', name: 'Bandar Seri Begawan' },
        { code: 'KUALA', name: 'Kuala Belait' },
        { code: 'SERIA', name: 'Seria' },
        { code: 'TUTONG', name: 'Tutong' },
        { code: 'BANGAR', name: 'Bangar' }
      ]
    },
    { code: 'KUA', name: 'Kuala Belait', type: 'district',
      cities: [
        { code: 'KUALA', name: 'Kuala Belait' },
        { code: 'SERIA', name: 'Seria' },
        { code: 'TUTONG', name: 'Tutong' },
        { code: 'BANGAR', name: 'Bangar' },
        { code: 'BANDAR', name: 'Bandar Seri Begawan' }
      ]
    },
    { code: 'SER', name: 'Seria', type: 'district',
      cities: [
        { code: 'SERIA', name: 'Seria' },
        { code: 'TUTONG', name: 'Tutong' },
        { code: 'BANGAR', name: 'Bangar' },
        { code: 'BANDAR', name: 'Bandar Seri Begawan' },
        { code: 'KUALA', name: 'Kuala Belait' }
      ]
    },
    { code: 'TUT', name: 'Tutong', type: 'district',
      cities: [
        { code: 'TUTONG', name: 'Tutong' },
        { code: 'BANGAR', name: 'Bangar' },
        { code: 'BANDAR', name: 'Bandar Seri Begawan' },
        { code: 'KUALA', name: 'Kuala Belait' },
        { code: 'SERIA', name: 'Seria' }
      ]
    },
    { code: 'BAN', name: 'Bangar', type: 'district',
      cities: [
        { code: 'BANGAR', name: 'Bangar' },
        { code: 'BANDAR', name: 'Bandar Seri Begawan' },
        { code: 'KUALA', name: 'Kuala Belait' },
        { code: 'SERIA', name: 'Seria' },
        { code: 'TUTONG', name: 'Tutong' }
      ]
    }
  ]
};

export default brunei;

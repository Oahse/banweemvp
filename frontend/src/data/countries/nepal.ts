/**
 * Nepal country data with provinces and cities
 */

import { Country } from './index';

export const nepal: Country = {
  code: 'NP',
  name: 'Nepal',
  flag: '🇳🇵',
  capital: 'Kathmandu',
  area: 147181,
  currencySymbol: 'रू',
  officialLanguages: ['Nepali', 'English'],
  demonym: 'Nepalese',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'KAT', name: 'Kathmandu', type: 'province',
      cities: [
        { code: 'KATHMANDU', name: 'Kathmandu' },
        { code: 'POKHARA', name: 'Pokhara' },
        { code: 'LALITPUR', name: 'Lalitpur' },
        { code: 'BHAKTAPUR', name: 'Bhaktapur' },
        { code: 'BIRATNAGAR', name: 'Biratnagar' }
      ]
    },
    { code: 'POK', name: 'Pokhara', type: 'province',
      cities: [
        { code: 'POKHARA', name: 'Pokhara' },
        { code: 'LALITPUR', name: 'Lalitpur' },
        { code: 'BHAKTAPUR', name: 'Bhaktapur' },
        { code: 'BIRATNAGAR', name: 'Biratnagar' },
        { code: 'KATHMANDU', name: 'Kathmandu' }
      ]
    },
    { code: 'LAL', name: 'Lalitpur', type: 'province',
      cities: [
        { code: 'LALITPUR', name: 'Lalitpur' },
        { code: 'BHAKTAPUR', name: 'Bhaktapur' },
        { code: 'BIRATNAGAR', name: 'Biratnagar' },
        { code: 'KATHMANDU', name: 'Kathmandu' },
        { code: 'POKHARA', name: 'Pokhara' }
      ]
    },
    { code: 'BHA', name: 'Bhaktapur', type: 'province',
      cities: [
        { code: 'BHAKTAPUR', name: 'Bhaktapur' },
        { code: 'BIRATNAGAR', name: 'Biratnagar' },
        { code: 'KATHMANDU', name: 'Kathmandu' },
        { code: 'POKHARA', name: 'Pokhara' },
        { code: 'LALITPUR', name: 'Lalitpur' }
      ]
    },
    { code: 'BIR', name: 'Biratnagar', type: 'province',
      cities: [
        { code: 'BIRATNAGAR', name: 'Biratnagar' },
        { code: 'KATHMANDU', name: 'Kathmandu' },
        { code: 'POKHARA', name: 'Pokhara' },
        { code: 'LALITPUR', name: 'Lalitpur' },
        { code: 'BHAKTAPUR', name: 'Bhaktapur' }
      ]
    }
  ]
};

export default nepal;

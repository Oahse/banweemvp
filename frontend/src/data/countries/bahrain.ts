/**
 * Bahrain country data with regions, cities, and tax information
 */

import { Country } from './index';

export const bahrain: Country = {
    code: 'BH',
    name: 'Bahrain',
    taxInfo: { standardRate: 5, taxName: 'VAT', currency: 'BHD', region: 'MEA' },
    provinces: [
      { code: 'MAN', name: 'Manama',
        cities: [
          { code: 'MAN', name: 'Manama' },
          { code: 'MUF', name: 'Muharraq' },
          { code: 'IS', name: 'Isa Town' },
          { code: 'SIT', name: 'Sitra' },
          { code: 'RIF', name: 'Riffa' },
          { code: 'HAM', name: 'Hamad Town' },
          { code: 'MA', name: 'Madinat Hamad' },
          { code: 'AL', name: 'Al Muharraq' },
          { code: 'JID', name: 'Jidhafs' },
          { code: 'SAN', name: 'Sanabis' }
        ]
      },
      { code: 'MUF', name: 'Muharraq',
        cities: [
          { code: 'MUF', name: 'Muharraq' },
          { code: 'MAN', name: 'Manama' },
          { code: 'IS', name: 'Isa Town' },
          { code: 'SIT', name: 'Sitra' },
          { code: 'RIF', name: 'Riffa' },
          { code: 'HAM', name: 'Hamad Town' },
          { code: 'MA', name: 'Madinat Hamad' },
          { code: 'AL', name: 'Al Muharraq' },
          { code: 'JID', name: 'Jidhafs' },
          { code: 'SAN', name: 'Sanabis' }
        ]
      },
      { code: 'IS', name: 'Isa Town',
        cities: [
          { code: 'IS', name: 'Isa Town' },
          { code: 'MAN', name: 'Manama' },
          { code: 'MUF', name: 'Muharraq' },
          { code: 'SIT', name: 'Sitra' },
          { code: 'RIF', name: 'Riffa' },
          { code: 'HAM', name: 'Hamad Town' },
          { code: 'MA', name: 'Madinat Hamad' },
          { code: 'AL', name: 'Al Muharraq' },
          { code: 'JID', name: 'Jidhafs' },
          { code: 'SAN', name: 'Sanabis' }
        ]
      },
      { code: 'SIT', name: 'Sitra',
        cities: [
          { code: 'SIT', name: 'Sitra' },
          { code: 'MAN', name: 'Manama' },
          { code: 'MUF', name: 'Muharraq' },
          { code: 'IS', name: 'Isa Town' },
          { code: 'RIF', name: 'Riffa' },
          { code: 'HAM', name: 'Hamad Town' },
          { code: 'MA', name: 'Madinat Hamad' },
          { code: 'AL', name: 'Al Muharraq' },
          { code: 'JID', name: 'Jidhafs' },
          { code: 'SAN', name: 'Sanabis' }
        ]
      },
      { code: 'RIF', name: 'Riffa',
        cities: [
          { code: 'RIF', name: 'Riffa' },
          { code: 'MAN', name: 'Manama' },
          { code: 'MUF', name: 'Muharraq' },
          { code: 'IS', name: 'Isa Town' },
          { code: 'SIT', name: 'Sitra' },
          { code: 'HAM', name: 'Hamad Town' },
          { code: 'MA', name: 'Madinat Hamad' },
          { code: 'AL', name: 'Al Muharraq' },
          { code: 'JID', name: 'Jidhafs' },
          { code: 'SAN', name: 'Sanabis' }
        ]
      },
      { code: 'HAM', name: 'Hamad Town',
        cities: [
          { code: 'HAM', name: 'Hamad Town' },
          { code: 'MAN', name: 'Manama' },
          { code: 'MUF', name: 'Muharraq' },
          { code: 'IS', name: 'Isa Town' },
          { code: 'SIT', name: 'Sitra' },
          { code: 'RIF', name: 'Riffa' },
          { code: 'MA', name: 'Madinat Hamad' },
          { code: 'AL', name: 'Al Muharraq' },
          { code: 'JID', name: 'Jidhafs' },
          { code: 'SAN', name: 'Sanabis' }
        ]
      },
      { code: 'MA', name: 'Madinat Hamad',
        cities: [
          { code: 'MA', name: 'Madinat Hamad' },
          { code: 'MAN', name: 'Manama' },
          { code: 'MUF', name: 'Muharraq' },
          { code: 'IS', name: 'Isa Town' },
          { code: 'SIT', name: 'Sitra' },
          { code: 'RIF', name: 'Riffa' },
          { code: 'HAM', name: 'Hamad Town' },
          { code: 'AL', name: 'Al Muharraq' },
          { code: 'JID', name: 'Jidhafs' },
          { code: 'SAN', name: 'Sanabis' }
        ]
      },
      { code: 'AL', name: 'Al Muharraq',
        cities: [
          { code: 'AL', name: 'Al Muharraq' },
          { code: 'MAN', name: 'Manama' },
          { code: 'MUF', name: 'Muharraq' },
          { code: 'IS', name: 'Isa Town' },
          { code: 'SIT', name: 'Sitra' },
          { code: 'RIF', name: 'Riffa' },
          { code: 'HAM', name: 'Hamad Town' },
          { code: 'MA', name: 'Madinat Hamad' },
          { code: 'JID', name: 'Jidhafs' },
          { code: 'SAN', name: 'Sanabis' }
        ]
      },
      { code: 'JID', name: 'Jidhafs',
        cities: [
          { code: 'JID', name: 'Jidhafs' },
          { code: 'MAN', name: 'Manama' },
          { code: 'MUF', name: 'Muharraq' },
          { code: 'IS', name: 'Isa Town' },
          { code: 'SIT', name: 'Sitra' },
          { code: 'RIF', name: 'Riffa' },
          { code: 'HAM', name: 'Hamad Town' },
          { code: 'MA', name: 'Madinat Hamad' },
          { code: 'AL', name: 'Al Muharraq' },
          { code: 'SAN', name: 'Sanabis' }
        ]
      },
      { code: 'SAN', name: 'Sanabis',
        cities: [
          { code: 'SAN', name: 'Sanabis' },
          { code: 'MAN', name: 'Manama' },
          { code: 'MUF', name: 'Muharraq' },
          { code: 'IS', name: 'Isa Town' },
          { code: 'SIT', name: 'Sitra' },
          { code: 'RIF', name: 'Riffa' },
          { code: 'HAM', name: 'Hamad Town' },
          { code: 'MA', name: 'Madinat Hamad' },
          { code: 'AL', name: 'Al Muharraq' },
          { code: 'JID', name: 'Jidhafs' }
        ]
      }
    ]
  };

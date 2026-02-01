/**
 * Kuwait country data with regions, cities, and tax information
 */

import { Country } from './index';

export const kuwait: Country = {
    code: 'KW',
    name: 'Kuwait',
    taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'KWD', region: 'MEA' },
    provinces: [
      { code: 'KUW', name: 'Kuwait City',
        cities: [
          { code: 'KUW', name: 'Kuwait City' },
          { code: 'HAW', name: 'Hawalli' },
          { code: 'SAL', name: 'Salmiya' },
          { code: 'JAB', name: 'Jabriya' },
          { code: 'FAR', name: 'Farwaniya' },
          { code: 'AHM', name: 'Ahmadi' },
          { code: 'MUB', name: 'Mubarak Al-Kabeer' },
          { code: 'JAH', name: 'Jahra' },
          { code: 'AL', name: 'Al Farwaniyah' },
          { code: 'SAB', name: 'Sabah Al-Salem' }
        ]
      },
      { code: 'HAW', name: 'Hawalli',
        cities: [
          { code: 'HAW', name: 'Hawalli' },
          { code: 'KUW', name: 'Kuwait City' },
          { code: 'SAL', name: 'Salmiya' },
          { code: 'JAB', name: 'Jabriya' },
          { code: 'FAR', name: 'Farwaniya' },
          { code: 'AHM', name: 'Ahmadi' },
          { code: 'MUB', name: 'Mubarak Al-Kabeer' },
          { code: 'JAH', name: 'Jahra' },
          { code: 'AL', name: 'Al Farwaniyah' },
          { code: 'SAB', name: 'Sabah Al-Salem' }
        ]
      },
      { code: 'SAL', name: 'Salmiya',
        cities: [
          { code: 'SAL', name: 'Salmiya' },
          { code: 'KUW', name: 'Kuwait City' },
          { code: 'HAW', name: 'Hawalli' },
          { code: 'JAB', name: 'Jabriya' },
          { code: 'FAR', name: 'Farwaniya' },
          { code: 'AHM', name: 'Ahmadi' },
          { code: 'MUB', name: 'Mubarak Al-Kabeer' },
          { code: 'JAH', name: 'Jahra' },
          { code: 'AL', name: 'Al Farwaniyah' },
          { code: 'SAB', name: 'Sabah Al-Salem' }
        ]
      },
      { code: 'JAB', name: 'Jabriya',
        cities: [
          { code: 'JAB', name: 'Jabriya' },
          { code: 'KUW', name: 'Kuwait City' },
          { code: 'HAW', name: 'Hawalli' },
          { code: 'SAL', name: 'Salmiya' },
          { code: 'FAR', name: 'Farwaniya' },
          { code: 'AHM', name: 'Ahmadi' },
          { code: 'MUB', name: 'Mubarak Al-Kabeer' },
          { code: 'JAH', name: 'Jahra' },
          { code: 'AL', name: 'Al Farwaniyah' },
          { code: 'SAB', name: 'Sabah Al-Salem' }
        ]
      },
      { code: 'FAR', name: 'Farwaniya',
        cities: [
          { code: 'FAR', name: 'Farwaniya' },
          { code: 'KUW', name: 'Kuwait City' },
          { code: 'HAW', name: 'Hawalli' },
          { code: 'SAL', name: 'Salmiya' },
          { code: 'JAB', name: 'Jabriya' },
          { code: 'AHM', name: 'Ahmadi' },
          { code: 'MUB', name: 'Mubarak Al-Kabeer' },
          { code: 'JAH', name: 'Jahra' },
          { code: 'AL', name: 'Al Farwaniyah' },
          { code: 'SAB', name: 'Sabah Al-Salem' }
        ]
      },
      { code: 'AHM', name: 'Ahmadi',
        cities: [
          { code: 'AHM', name: 'Ahmadi' },
          { code: 'KUW', name: 'Kuwait City' },
          { code: 'HAW', name: 'Hawalli' },
          { code: 'SAL', name: 'Salmiya' },
          { code: 'JAB', name: 'Jabriya' },
          { code: 'FAR', name: 'Farwaniya' },
          { code: 'MUB', name: 'Mubarak Al-Kabeer' },
          { code: 'JAH', name: 'Jahra' },
          { code: 'AL', name: 'Al Farwaniyah' },
          { code: 'SAB', name: 'Sabah Al-Salem' }
        ]
      },
      { code: 'MUB', name: 'Mubarak Al-Kabeer',
        cities: [
          { code: 'MUB', name: 'Mubarak Al-Kabeer' },
          { code: 'KUW', name: 'Kuwait City' },
          { code: 'HAW', name: 'Hawalli' },
          { code: 'SAL', name: 'Salmiya' },
          { code: 'JAB', name: 'Jabriya' },
          { code: 'FAR', name: 'Farwaniya' },
          { code: 'AHM', name: 'Ahmadi' },
          { code: 'JAH', name: 'Jahra' },
          { code: 'AL', name: 'Al Farwaniyah' },
          { code: 'SAB', name: 'Sabah Al-Salem' }
        ]
      },
      { code: 'JAH', name: 'Jahra',
        cities: [
          { code: 'JAH', name: 'Jahra' },
          { code: 'KUW', name: 'Kuwait City' },
          { code: 'HAW', name: 'Hawalli' },
          { code: 'SAL', name: 'Salmiya' },
          { code: 'JAB', name: 'Jabriya' },
          { code: 'FAR', name: 'Farwaniya' },
          { code: 'AHM', name: 'Ahmadi' },
          { code: 'MUB', name: 'Mubarak Al-Kabeer' },
          { code: 'AL', name: 'Al Farwaniyah' },
          { code: 'SAB', name: 'Sabah Al-Salem' }
        ]
      },
      { code: 'AL', name: 'Al Farwaniyah',
        cities: [
          { code: 'AL', name: 'Al Farwaniyah' },
          { code: 'KUW', name: 'Kuwait City' },
          { code: 'HAW', name: 'Hawalli' },
          { code: 'SAL', name: 'Salmiya' },
          { code: 'JAB', name: 'Jabriya' },
          { code: 'FAR', name: 'Farwaniya' },
          { code: 'AHM', name: 'Ahmadi' },
          { code: 'MUB', name: 'Mubarak Al-Kabeer' },
          { code: 'JAH', name: 'Jahra' },
          { code: 'SAB', name: 'Sabah Al-Salem' }
        ]
      },
      { code: 'SAB', name: 'Sabah Al-Salem',
        cities: [
          { code: 'SAB', name: 'Sabah Al-Salem' },
          { code: 'KUW', name: 'Kuwait City' },
          { code: 'HAW', name: 'Hawalli' },
          { code: 'SAL', name: 'Salmiya' },
          { code: 'JAB', name: 'Jabriya' },
          { code: 'FAR', name: 'Farwaniya' },
          { code: 'AHM', name: 'Ahmadi' },
          { code: 'MUB', name: 'Mubarak Al-Kabeer' },
          { code: 'JAH', name: 'Jahra' },
          { code: 'AL', name: 'Al Farwaniyah' }
        ]
      }
    ]
  };

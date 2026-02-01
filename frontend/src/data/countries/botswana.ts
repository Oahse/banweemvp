/**
 * Botswana country data with districts and cities
 */

import { Country } from './index';

export const botswana: Country = {
    code: 'BW',
    name: 'Botswana',
    flag: '🇧🇼',
    capital: 'Gaborone',
    area: 581730,
    currencySymbol: 'P',
    officialLanguages: ['English', 'Setswana'],
    demonym: 'Motswana',
    taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'BWP', region: 'MEA' },
    divisions: [
      { code: 'GC', name: 'Gaborone', type: 'district',
        cities: [
          { code: 'GAB', name: 'Gaborone' },
          { code: 'MOG', name: 'Mogoditshane' },
          { code: 'TLO', name: 'Tlokweng' },
          { code: 'RAM', name: 'Ramotswa' },
          { code: 'KOPONG', name: 'Kopong' }
        ]
      },
      { code: 'FR', name: 'Francistown', type: 'district',
        cities: [
          { code: 'FRA', name: 'Francistown' },
          { code: 'TAT', name: 'Tatitown' },
          { code: 'MON', name: 'Monarch' },
          { code: 'PHIK', name: 'Phikwe' },
          { code: 'SEL', name: 'Selibe-Phikwe' }
        ]
      },
      { code: 'KG', name: 'Kgalagadi', type: 'district',
        cities: [
          { code: 'TSAB', name: 'Tsabong' },
          { code: 'KAN', name: 'Kang' },
          { code: 'HUK', name: 'Hukuntsi' },
          { code: 'TSH', name: 'Tshane' },
          { code: 'LEP', name: 'Lephephe' }
        ]
      },
      { code: 'KL', name: 'Kgatleng', type: 'district',
        cities: [
          { code: 'MOG', name: 'Mochudi' },
          { code: 'RAM', name: 'Ramotswa' },
          { code: 'MAB', name: 'Mabutsane' },
          { code: 'OLI', name: 'Olifantsfontein' },
          { code: 'RASE', name: 'Rasesa' }
        ]
      },
      { code: 'KW', name: 'Kweneng', type: 'district',
        cities: [
          { code: 'MOG', name: 'Molepolole' },
          { code: 'MOP', name: 'Mopipi' },
          { code: 'LEPA', name: 'Lephalale' },
          { code: 'THAM', name: 'Thamaga' },
          { code: 'KOP', name: 'Kopong' }
        ]
      },
      { code: 'NW', name: 'North-West', type: 'district',
        cities: [
          { code: 'MAU', name: 'Maun' },
          { code: 'KAS', name: 'Kasane' },
          { code: 'SHAK', name: 'Shakawe' },
          { code: 'PAN', name: 'Pandamatenga' },
          { code: 'NOK', name: 'Nokaneng' }
        ]
      },
      { code: 'NE', name: 'North-East', type: 'district',
        cities: [
          { code: 'MAS', name: 'Masunga' },
          { code: 'FRAN', name: 'Francistown' },
          { code: 'TAT', name: 'Tatitown' },
          { code: 'MON', name: 'Monarch' },
          { code: 'PHIK', name: 'Phikwe' }
        ]
      },
      { code: 'SE', name: 'South-East', type: 'district',
        cities: [
          { code: 'RAM', name: 'Ramotswa' },
          { code: 'MOG', name: 'Mogoditshane' },
          { code: 'TLO', name: 'Tlokweng' },
          { code: 'GAB', name: 'Gaborone' },
          { code: 'KOPONG', name: 'Kopong' }
        ]
      },
      { code: 'SO', name: 'Southern', type: 'district',
        cities: [
          { code: 'KAN', name: 'Kanye' },
          { code: 'MOT', name: 'Molepolole' },
          { code: 'LOB', name: 'Lobatse' },
          { code: 'JWA', name: 'Jwaneng' },
          { code: 'MOT2', name: 'Mogoditshane' }
        ]
      },
      { code: 'CE', name: 'Central', type: 'district',
        cities: [
          { code: 'SER', name: 'Serowe' },
          { code: 'MAH', name: 'Mahalapye' },
          { code: 'PAL', name: 'Palapye' },
          { code: 'MOT', name: 'Mogoditshane' },
          { code: 'SER2', name: 'Serowe' }
        ]
      }
    ]
  };

/**
 * Botswana country data with districts, cities, and tax information
 */

import { Country } from './index';

export const botswana: Country = {
    code: 'BW',
    name: 'Botswana',
    taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'BWP', region: 'MEA' },
    provinces: [
      { code: 'GC', name: 'Gaborone',
        cities: [
          { code: 'GAB', name: 'Gaborone' },
          { code: 'MOG', name: 'Mogoditshane' },
          { code: 'TLO', name: 'Tlokweng' },
          { code: 'RAM', name: 'Ramotswa' },
          { code: 'MOG2', name: 'Mogoditshane' },
          { code: 'TLO2', name: 'Tlokweng' },
          { code: 'RAM2', name: 'Ramotswa' },
          { code: 'MOG3', name: 'Mogoditshane' },
          { code: 'TLO3', name: 'Tlokweng' },
          { code: 'RAM3', name: 'Ramotswa' }
        ]
      },
      { code: 'FR', name: 'Francistown',
        cities: [
          { code: 'FRA', name: 'Francistown' },
          { code: 'TAT', name: 'Tatitown' },
          { code: 'MON', name: 'Monarch' },
          { code: 'PHIK', name: 'Phikwe' },
          { code: 'SEL', name: 'Selibe-Phikwe' },
          { code: 'TAT2', name: 'Tatitown' },
          { code: 'MON2', name: 'Monarch' },
          { code: 'PHIK2', name: 'Phikwe' },
          { code: 'SEL2', name: 'Selibe-Phikwe' },
          { code: 'TAT3', name: 'Tatitown' }
        ]
      },
      { code: 'KG', name: 'Kgalagadi',
        cities: [
          { code: 'TSAB', name: 'Tsabong' },
          { code: 'KAN', name: 'Kang' },
          { code: 'HUK', name: 'Hukuntsi' },
          { code: 'TSH', name: 'Tshane' },
          { code: 'LEP', name: 'Lephephe' },
          { code: 'MAK', name: 'Makopong' },
          { code: 'BOK', name: 'Bokspits' },
          { code: 'VRY', name: 'Vryburg' },
          { code: 'MID', name: 'Middelburg' },
          { code: 'UP', name: 'Upington' }
        ]
      },
      { code: 'KL', name: 'Kgatleng',
        cities: [
          { code: 'MOG', name: 'Mochudi' },
          { code: 'RAM', name: 'Ramotswa' },
          { code: 'MAB', name: 'Mabutsane' },
          { code: 'OLI', name: 'Olifantsfontein' },
          { code: 'RASE', name: 'Rasesa' },
          { code: 'DICK', name: 'Dickens' },
          { code: 'MAB2', name: 'Mabutsane' },
          { code: 'OLI2', name: 'Olifantsfontein' },
          { code: 'RASE2', name: 'Rasesa' },
          { code: 'DICK2', name: 'Dickens' }
        ]
      },
      { code: 'KW', name: 'Kweneng',
        cities: [
          { code: 'MOG', name: 'Molepolole' },
          { code: 'MOP', name: 'Mopipi' },
          { code: 'LEPA', name: 'Lephalale' },
          { code: 'THAM', name: 'Thamaga' },
          { code: 'KOP', name: 'Kopong' },
          { code: 'MOT', name: 'Mogoditshane' },
          { code: 'RAN', name: 'Ranaka' },
          { code: 'MOT2', name: 'Mogoditshane' },
          { code: 'RAN2', name: 'Ranaka' },
          { code: 'MOT3', name: 'Mogoditshane' }
        ]
      },
      { code: 'NW', name: 'North-West',
        cities: [
          { code: 'MAU', name: 'Maun' },
          { code: 'KAS', name: 'Kasane' },
          { code: 'SHAK', name: 'Shakawe' },
          { code: 'PAN', name: 'Pandamatenga' },
          { code: 'NOK', name: 'Nokaneng' },
          { code: 'GUM', name: 'Gumare' },
          { code: 'ETSH', name: 'Etsha' },
          { code: 'SHAK2', name: 'Shakawe' },
          { code: 'PAN2', name: 'Pandamatenga' },
          { code: 'NOK2', name: 'Nokaneng' }
        ]
      },
      { code: 'NE', name: 'North-East',
        cities: [
          { code: 'MAS', name: 'Masunga' },
          { code: 'FRAN', name: 'Francistown' },
          { code: 'TAT', name: 'Tatitown' },
          { code: 'MON', name: 'Monarch' },
          { code: 'PHIK', name: 'Phikwe' },
          { code: 'SEL', name: 'Selibe-Phikwe' },
          { code: 'TAT2', name: 'Tatitown' },
          { code: 'MON2', name: 'Monarch' },
          { code: 'PHIK2', name: 'Phikwe' },
          { code: 'SEL2', name: 'Selibe-Phikwe' }
        ]
      },
      { code: 'SE', name: 'South-East',
        cities: [
          { code: 'RAM', name: 'Ramotswa' },
          { code: 'MOG', name: 'Mogoditshane' },
          { code: 'TLO', name: 'Tlokweng' },
          { code: 'GAB', name: 'Gaborone' },
          { code: 'MOG2', name: 'Mogoditshane' },
          { code: 'TLO2', name: 'Tlokweng' },
          { code: 'GAB2', name: 'Gaborone' },
          { code: 'MOG3', name: 'Mogoditshane' },
          { code: 'TLO3', name: 'Tlokweng' },
          { code: 'GAB3', name: 'Gaborone' }
        ]
      },
      { code: 'SO', name: 'Southern',
        cities: [
          { code: 'KAN', name: 'Kanye' },
          { code: 'MOT', name: 'Molepolole' },
          { code: 'LOB', name: 'Lobatse' },
          { code: 'JWA', name: 'Jwaneng' },
          { code: 'MOT2', name: 'Mogoditshane' },
          { code: 'KAN2', name: 'Kanye' },
          { code: 'MOT3', name: 'Molepolole' },
          { code: 'LOB2', name: 'Lobatse' },
          { code: 'JWA2', name: 'Jwaneng' },
          { code: 'MOT4', name: 'Mogoditshane' }
        ]
      },
      { code: 'CE', name: 'Central',
        cities: [
          { code: 'SER', name: 'Serowe' },
          { code: 'MAH', name: 'Mahalapye' },
          { code: 'PAL', name: 'Palapye' },
          { code: 'MOT', name: 'Mogoditshane' },
          { code: 'SER2', name: 'Serowe' },
          { code: 'MAH2', name: 'Mahalapye' },
          { code: 'PAL2', name: 'Palapye' },
          { code: 'MOT2', name: 'Mogoditshane' },
          { code: 'SER3', name: 'Serowe' },
          { code: 'MAH3', name: 'Mahalapye' }
        ]
      }
    ]
  };

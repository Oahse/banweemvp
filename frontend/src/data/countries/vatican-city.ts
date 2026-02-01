/**
 * Vatican City country data with administrative areas, cities, and tax information
 */

export interface City {
  code: string;
  name: string;
}

export interface AdministrativeArea {
  code: string;
  name: string;
  cities?: City[];
  taxInfo?: TaxInfo;
}

export interface TaxInfo {
  standardRate?: number;
  reducedRates?: number[];
  taxName: string;
  taxTypes?: string[];
  currency: string;
  region: 'EU' | 'NA' | 'APAC' | 'LATAM' | 'MEA' | 'Other';
}

export interface Country {
  code: string;
  name: string;
  taxInfo?: TaxInfo;
  divisions: Array<{
    code: string;
    name: string;
    type: string;
    cities?: City[];
  }>;
  languages: string[];
  flag: string;
  capital: string;
  area: number;
  currencySymbol: string;
  officialLanguages: string[];
  demonym: string;
}

export const vaticancity: Country = {
  code: 'VA',
  name: 'Vatican City',
  taxInfo: { standardRate: 22, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'VATICAN_CITY', name: 'Vatican City', type: 'administrative area',
      cities: [
        { code: 'SAINT_PETERS', name: 'Saint Peter\'s Square' },
        { code: 'SAINT_PETERS_BASILICA', name: 'Saint Peter\'s Basilica' },
        { code: 'VATICAN_MUSEUMS', name: 'Vatican Museums' },
        { code: 'APOSTOLIC_PALACE', name: 'Apostolic Palace' },
        { code: 'SISTINE_CHAPEL', name: 'Sistine Chapel' },
        { code: 'ST_PETERS_SQUARE', name: 'St. Peter\'s Square' },
        { code: 'VATICAN_GARDENS', name: 'Vatican Gardens' },
        { code: 'PAULINE_CHAPEL', name: 'Pauline Chapel' }
      ]
    }
  ],
  languages: ['Italian', 'Latin'],
  flag: '🇻🇻',
  capital: 'Vatican City',
  area: 0.44,
  currencySymbol: '€',
  officialLanguages: ['Italian', 'Latin'],
  demonym: 'Vatican'
};

export default vaticancity;

/**
 * Monaco country data with wards, cities, and tax information
 */

export interface City {
  code: string;
  name: string;
}

export interface Ward {
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

export const monaco: Country = {
  code: 'MC',
  name: 'Monaco',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'MONACO_VILLE', name: 'Monaco-Ville', type: 'ward',
      cities: [
        { code: 'MONACO_VILLE', name: 'Monaco-Ville' },
        { code: 'LE_PORTIER', name: 'Le Portier' },
        { code: 'LA_CONDAMINE', name: 'La Condamine' }
      ]
    },
    { code: 'MONTE_CARLO', name: 'Monte Carlo', type: 'ward',
      cities: [
        { code: 'MONTE_CARLO', name: 'Monte Carlo' },
        { code: 'LARVOTTO', name: 'Larvotto' },
        { code: 'SAINT_ROMAN', name: 'Saint Roman' }
      ]
    },
    { code: 'LA_CONDAMINE', name: 'La Condamine', type: 'ward',
      cities: [
        { code: 'LA_CONDAMINE', name: 'La Condamine' },
        { code: 'LES_MONEGHETTI', name: 'Les Moneghetti' },
        { code: 'LES_REVOIRES', name: 'Les Révoires' }
      ]
    },
    { code: 'FONTVIEILLE', name: 'Fontvieille', type: 'ward',
      cities: [
        { code: 'FONTVIEILLE', name: 'Fontvieille' },
        { code: 'LE_PORTIER', name: 'Le Portier' }
      ]
    }
  ],
  languages: ['French'],
  flag: '🇲🇨',
  capital: 'Monaco',
  area: 2,
  currencySymbol: '€',
  officialLanguages: ['French'],
  demonym: 'Monegasque'
};

export default monaco;

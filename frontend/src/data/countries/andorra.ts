/**
 * Andorra country data with parishes, cities, and tax information
 */

export interface City {
  code: string;
  name: string;
}

export interface Parish {
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

export const andorra: Country = {
  code: 'AD',
  name: 'Andorra',
  taxInfo: { standardRate: 4.5, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'CANILLO', name: 'Canillo', type: 'parish',
      cities: [
        { code: 'CANILLO', name: 'Canillo' },
        { code: 'INCLES', name: 'Incles' },
        { code: 'MERITXELL', name: 'Meritxell' },
        { code: 'PRATS', name: 'Prats' },
        { code: 'RANSOL', name: 'Ransol' },
        { code: 'SOLDEU', name: 'Soldeu' },
        { code: 'TARTER', name: 'El Tarter' }
      ]
    },
    { code: 'ENCAMP', name: 'Encamp', type: 'parish',
      cities: [
        { code: 'ENCAMP', name: 'Encamp' },
        { code: 'LES_ALDES', name: 'Les Bons' },
        { code: 'VILA', name: 'Vila' }
      ]
    },
    { code: 'ORDINO', name: 'Ordino', type: 'parish',
      cities: [
        { code: 'ORDINO', name: 'Ordino' },
        { code: 'ANSALONGA', name: 'Ansalonga' },
        { code: 'ARANS', name: 'Arans' },
        { code: 'LA_CORTINADA', name: 'La Cortinada' },
        { code: 'LLOMPS', name: 'Llorts' },
        { code: 'MAS_DE_RIL', name: 'Mas de Rill' },
        { code: 'SORIGUERA', name: 'Soriguera' }
      ]
    },
    { code: 'LA_MASSANA', name: 'La Massana', type: 'parish',
      cities: [
        { code: 'LA_MASSANA', name: 'La Massana' },
        { code: 'ANYOS', name: 'Anyós' },
        { code: 'ARINSAL', name: 'Arinsal' },
        { code: 'ERITS', name: 'Erts' },
        { code: 'ESCAS', name: 'Escàs' },
        { code: 'MAS_DE_RIL', name: 'Mas de Rill' },
        { code: 'PAL', name: 'Pal' },
        { code: 'XIXA', name: 'Xixerella' }
      ]
    },
    { code: 'ANDORRA_LA_VELLA', name: 'Andorra la Vella', type: 'parish',
      cities: [
        { code: 'ANDORRA_LA_VELLA', name: 'Andorra la Vella' },
        { code: 'LA_MARGINEDA', name: 'La Margineda' },
        { code: 'SANTA_COLOMA', name: 'Santa Coloma' }
      ]
    },
    { code: 'SANT_JULIA_DE_LORIA', name: 'Sant Julià de Lòria', type: 'parish',
      cities: [
        { code: 'SANT_JULIA', name: 'Sant Julià de Lòria' },
        { code: 'AIXIRIVALL', name: 'Aixirivall' },
        { code: 'AUBINYA', name: 'Aubinyà' },
        { code: 'BIXESSARRI', name: 'Bixessarri' },
        { code: 'FONTANEDA', name: 'Fontaneda' },
        { code: 'JUBERRI', name: 'Juberri' },
        { code: 'LUMENES', name: 'Llumeneres' },
        { code: 'NAGOL', name: 'Nagol' }
      ]
    },
    { code: 'ESCALDES_ENGORDANY', name: 'Escaldes-Engordany', type: 'parish',
      cities: [
        { code: 'ESCALDES', name: 'Escaldes-Engordany' },
        { code: 'ENGORDANY', name: 'Engordany' },
        { code: 'ELS_VILARS_D_ENGORDANY', name: 'Els Vilars d\'Engordany' },
        { code: 'ENGOLASTERS', name: 'Engolasters' }
      ]
    }
  ],
  languages: ['Catalan'],
  flag: '🇦🇦',
  capital: 'Andorra la Vella',
  area: 468,
  currencySymbol: '€',
  officialLanguages: ['Catalan'],
  demonym: 'Andorran'
};

export default andorra;

/**
 * Senegal country data with regions and cities
 */

import { Country } from './index';

export const senegal: Country = {
  code: 'SN',
  name: 'Senegal',
  flag: '🇸🇳',
  capital: 'Dakar',
  area: 196722,
  currencySymbol: 'CFA',
  officialLanguages: ['French'],
  demonym: 'Senegalese',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' },
  divisions: [
    { code: 'DAK', name: 'Dakar', type: 'region',
      cities: [
        { code: 'DAKAR', name: 'Dakar' },
        { code: 'PIKINE', name: 'Pikine' },
        { code: 'THIES', name: 'Thiès' },
        { code: 'KAOLACK', name: 'Kaolack' },
        { code: 'SAINT', name: 'Saint-Louis' }
      ]
    },
    { code: 'THI', name: 'Thiès', type: 'region',
      cities: [
        { code: 'THIES', name: 'Thiès' },
        { code: 'MBOUR', name: 'Mbour' },
        { code: 'TIVAOUANE', name: 'Tivaouane' },
        { code: 'TIOBOUR', name: 'Tiobour' },
        { code: 'FATIC', name: 'Fatick' }
      ]
    },
    { code: 'DIO', name: 'Diourbel', type: 'region',
      cities: [
        { code: 'DIOURBEL', name: 'Diourbel' },
        { code: 'TOUBA', name: 'Touba' },
        { code: 'MBACKE', name: 'Mbacké' },
        { code: 'BAMB', name: 'Bambey' },
        { code: 'NGAYE', name: 'Ngaye Mékhé' }
      ]
    },
    { code: 'FAT', name: 'Fatick', type: 'region',
      cities: [
        { code: 'FATICK', name: 'Fatick' },
        { code: 'FOUNDIOUGNE', name: 'Foundiougne' },
        { code: 'SOKONE', name: 'Sokone' },
        { code: 'PASSY', name: 'Passy' },
        { code: 'NDAGNE', name: 'Ndagane' }
      ]
    },
    { code: 'KAO', name: 'Kaolack', type: 'region',
      cities: [
        { code: 'KAOLACK', name: 'Kaolack' },
        { code: 'KOUNGHEUL', name: 'Koungheul' },
        { code: 'KAFFRINE', name: 'Kaffrine' },
        { code: 'KOLDA', name: 'Kolda' },
        { code: 'VÉLINGARA', name: 'Vélingara' }
      ]
    },
    { code: 'KOL', name: 'Kolda', type: 'region',
      cities: [
        { code: 'KOLDA', name: 'Kolda' },
        { code: 'VÉLINGARA', name: 'Vélingara' },
        { code: 'SEDHIOU', name: 'Sédhiou' },
        { code: 'OUSSOUYE', name: 'Oussouye' },
        { code: 'BIGNONA', name: 'Bignona' }
      ]
    },
    { code: 'KED', name: 'Kédougou', type: 'region',
      cities: [
        { code: 'KÉDOUGOU', name: 'Kédougou' },
        { code: 'SARAYA', name: 'Saraya' },
        { code: 'WONDIOU', name: 'Wondiou' },
        { code: 'MÉME', name: 'Méme' },
        { code: 'BANDAFASSI', name: 'Bandafassi' }
      ]
    },
    { code: 'KAF', name: 'Kaffrine', type: 'region',
      cities: [
        { code: 'KAFFRINE', name: 'Kaffrine' },
        { code: 'KOUNGHEUL', name: 'Koungheul' },
        { code: 'KAOLACK', name: 'Kaolack' },
        { code: 'MALI', name: 'Mali' },
        { code: 'NGANDOUL', name: 'Ngandoul' }
      ]
    },
    { code: 'LOU', name: 'Louga', type: 'region',
      cities: [
        { code: 'LOUGA', name: 'Louga' },
        { code: 'LINGUÈRE', name: 'Linguère' },
        { code: 'SAINT', name: 'Saint-Louis' },
        { code: 'DAGANA', name: 'Dagana' },
        { code: 'RICHARD', name: 'Richard Toll' }
      ]
    },
    { code: 'MAT', name: 'Matam', type: 'region',
      cities: [
        { code: 'MATAM', name: 'Matam' },
        { code: 'KANEL', name: 'Kanel' },
        { code: 'WAKOM', name: 'Wakom' },
        { code: 'OURO', name: 'Ouro Sogui' },
        { code: 'THIAGG', name: 'Thiaggar' }
      ]
    },
    { code: 'SAI', name: 'Saint-Louis', type: 'region',
      cities: [
        { code: 'SAINT', name: 'Saint-Louis' },
        { code: 'PODOR', name: 'Podor' },
        { code: 'RICHARD', name: 'Richard Toll' },
        { code: 'DAGANA', name: 'Dagana' },
        { code: 'MATAM', name: 'Matam' }
      ]
    },
    { code: 'SED', name: 'Sédhiou', type: 'region',
      cities: [
        { code: 'SEDHIOU', name: 'Sédhiou' },
        { code: 'OUSSOUYE', name: 'Oussouye' },
        { code: 'BIGNONA', name: 'Bignona' },
        { code: 'KOLDA', name: 'Kolda' },
        { code: 'VÉLINGARA', name: 'Vélingara' }
      ]
    },
    { code: 'TAM', name: 'Tambacounda', type: 'region',
      cities: [
        { code: 'TAMBACOUNDA', name: 'Tambacounda' },
        { code: 'GOUDIRY', name: 'Goudiry' },
        { code: 'BAKEL', name: 'Bakel' },
        { code: 'KOUNGHEUL', name: 'Koungheul' },
        { code: 'MALI', name: 'Mali' }
      ]
    },
    { code: 'ZIG', name: 'Ziguinchor', type: 'region',
      cities: [
        { code: 'ZIGUINCHOR', name: 'Ziguinchor' },
        { code: 'Oussouye', name: 'Oussouye' },
        { code: 'BIGNONA', name: 'Bignona' },
        { code: 'SEDHIOU', name: 'Sédhiou' },
        { code: 'KOLDA', name: 'Kolda' }
      ]
    }
  ]
};

export default senegal;

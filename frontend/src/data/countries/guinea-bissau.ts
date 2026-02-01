/**
 * Guinea-Bissau country data with regions and cities
 */

import { Country } from './index';

export const guineabissau: Country = {
  code: 'GW',
  name: 'Guinea-Bissau',
  flag: '🇬🇼',
  capital: 'Bissau',
  area: 36125,
  currencySymbol: 'CFA',
  officialLanguages: ['Portuguese'],
  demonym: 'Guinea-Bissauan',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'XOF', region: 'MEA' },
  divisions: [
    { code: 'BIS', name: 'Bissau', type: 'region',
      cities: [
        { code: 'BISSAU', name: 'Bissau' },
        { code: 'BULA', name: 'Bula' },
        { code: 'PRABIS', name: 'Prabis' },
        { code: 'QUINHAM', name: 'Quinhamel' },
        { code: 'SAL', name: 'Sal' }
      ]
    },
    { code: 'BIO', name: 'Biombo', type: 'region',
      cities: [
        { code: 'BULA', name: 'Bula' },
        { code: 'PRABIS', name: 'Prabis' },
        { code: 'QUINHAM', name: 'Quinhamel' },
        { code: 'SAL', name: 'Sal' },
        { code: 'BISSAU', name: 'Bissau' }
      ]
    },
    { code: 'OIO', name: 'Oio', type: 'region',
      cities: [
        { code: 'FARIM', name: 'Farim' },
        { code: 'MANSSOA', name: 'Mansoa' },
        { code: 'BISSEAU', name: 'Bissau' },
        { code: 'BULA', name: 'Bula' },
        { code: 'PRABIS', name: 'Prabis' }
      ]
    },
    { code: 'QUIN', name: 'Quinara', type: 'region',
      cities: [
        { code: 'QUINHAM', name: 'Quinhamel' },
        { code: 'SAL', name: 'Sal' },
        { code: 'BISSAU', name: 'Bissau' },
        { code: 'BULA', name: 'Bula' },
        { code: 'PRABIS', name: 'Prabis' }
      ]
    },
    { code: 'TOM', name: 'Tombali', type: 'region',
      cities: [
        { code: 'CATIO', name: 'Catió' },
        { code: 'BEDANDA', name: 'Bedanda' },
        { code: 'QUEBO', name: 'Quebo' },
        { code: 'TITE', name: 'Tite' },
        { code: 'CACINE', name: 'Cacine' }
      ]
    },
    { code: 'BFA', name: 'Bafatá', type: 'region',
      cities: [
        { code: 'BAFATA', name: 'Bafatá' },
        { code: 'GABU', name: 'Gabú' },
        { code: 'BAMBADI', name: 'Bambadinca' },
        { code: 'CONTUBEL', name: 'Contubuel' },
        { code: 'XITOLE', name: 'Xitole' }
      ]
    },
    { code: 'GAB', name: 'Gabú', type: 'region',
      cities: [
        { code: 'GABU', name: 'Gabú' },
        { code: 'BAMBADI', name: 'Bambadinca' },
        { code: 'CONTUBEL', name: 'Contubuel' },
        { code: 'XITOLE', name: 'Xitole' },
        { code: 'BFA', name: 'Bafatá' }
      ]
    },
    { code: 'CAS', name: 'Cacheu', type: 'region',
      cities: [
        { code: 'CACHEU', name: 'Cacheu' },
        { code: 'SÃO', name: 'São Domingos' },
        { code: 'BIGENE', name: 'Bigene' },
        { code: 'BIJAGOS', name: 'Bijagós' },
        { code: 'CAIO', name: 'Caio' }
      ]
    }
  ]
};

export default guineabissau;

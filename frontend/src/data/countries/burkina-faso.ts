/**
 * Burkina Faso country data with regions and cities
 */

import { Country } from './index';

export const burkinafaso: Country = {
  code: 'BF',
  name: 'Burkina Faso',
  flag: '🇧🇫',
  capital: 'Ouagadougou',
  area: 274200,
  currencySymbol: 'CFA',
  officialLanguages: ['French'],
  demonym: 'Burkinabé',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' },
  divisions: [
    { code: 'BCL', name: 'Boucle du Mouhoun', type: 'region',
      cities: [
        { code: 'DEDOUGOU', name: 'Dédougou' },
        { code: 'BOROMO', name: 'Boromo' },
        { code: 'KONGOUGUI', name: 'Kongoussi' },
        { code: 'KOUKA', name: 'Kouka' },
        { code: 'SOL', name: 'Solenzo' }
      ]
    },
    { code: 'CAS', name: 'Cascades', type: 'region',
      cities: [
        { code: 'BANFORA', name: 'Banfora' },
        { code: 'SINDOU', name: 'Sindou' },
        { code: 'MANGA', name: 'Manga' },
        { code: 'DIEBOUGOU', name: 'Diébougou' },
        { code: 'NOUNA', name: 'Nouna' }
      ]
    },
    { code: 'CEN', name: 'Centre', type: 'region',
      cities: [
        { code: 'OUAGADOUGOU', name: 'Ouagadougou' },
        { code: 'KADIOGO', name: 'Kadiogo' },
        { code: 'KOUPELA', name: 'Koupéla' },
        { code: 'KAYA', name: 'Kaya' },
        { code: 'OUAHIGOUYA', name: 'Ouahigouya' }
      ]
    },
    { code: 'CEN', name: 'Centre-Est', type: 'region',
      cities: [
        { code: 'TENKODOGO', name: 'Tenkodogo' },
        { code: 'FADA', name: 'Fada N\'gourma' },
        { code: 'BOGANDE', name: 'Bogandé' },
        { code: 'PIELA', name: 'Piéla' },
        { code: 'DIAPAGA', name: 'Diapaga' }
      ]
    },
    { code: 'CEN', name: 'Centre-Nord', type: 'region',
      cities: [
        { code: 'KAYA', name: 'Kaya' },
        { code: 'OUAHIGOUYA', name: 'Ouahigouya' },
        { code: 'KONGOUGUI', name: 'Kongoussi' },
        { code: 'KOUPELA', name: 'Koupéla' },
        { code: 'BOULSA', name: 'Boulsa' }
      ]
    },
    { code: 'CEN', name: 'Centre-Ouest', type: 'region',
      cities: [
        { code: 'KOUPELA', name: 'Koupéla' },
        { code: 'KAYA', name: 'Kaya' },
        { code: 'OUAHIGOUYA', name: 'Ouahigouya' },
        { code: 'KONGOUGUI', name: 'Kongoussi' },
        { code: 'MANGA', name: 'Manga' }
      ]
    },
    { code: 'CEN', name: 'Centre-Sud', type: 'region',
      cities: [
        { code: 'MANGA', name: 'Manga' },
        { code: 'PO', name: 'Pô' },
        { code: 'KOUPELA', name: 'Koupéla' },
        { code: 'KAYA', name: 'Kaya' },
        { code: 'OUAHIGOUYA', name: 'Ouahigouya' }
      ]
    },
    { code: 'EST', name: 'Est', type: 'region',
      cities: [
        { code: 'FADA', name: 'Fada N\'gourma' },
        { code: 'DIAPAGA', name: 'Diapaga' },
        { code: 'PIELA', name: 'Piéla' },
        { code: 'BOGANDE', name: 'Bogandé' },
        { code: 'TENKODOGO', name: 'Tenkodogo' }
      ]
    },
    { code: 'HAU', name: 'Hauts-Bassins', type: 'region',
      cities: [
        { code: 'BOBO', name: 'Bobo-Dioulasso' },
        { code: 'BANFORA', name: 'Banfora' },
        { code: 'HOUNDE', name: 'Houndé' },
        { code: 'KOUROU', name: 'Kourou' },
        { code: 'DIEBOUGOU', name: 'Diébougou' }
      ]
    },
    { code: 'NORD', name: 'Nord', type: 'region',
      cities: [
        { code: 'OUAHIGOUYA', name: 'Ouahigouya' },
        { code: 'KAYA', name: 'Kaya' },
        { code: 'KONGOUGUI', name: 'Kongoussi' },
        { code: 'KOUPELA', name: 'Koupéla' },
        { code: 'BOULSA', name: 'Boulsa' }
      ]
    },
    { code: 'PLA', name: 'Plateau-Central', type: 'region',
      cities: [
        { code: 'ZINIARE', name: 'Ziniaré' },
        { code: 'KOUPELA', name: 'Koupéla' },
        { code: 'KAYA', name: 'Kaya' },
        { code: 'OUAHIGOUYA', name: 'Ouahigouya' },
        { code: 'KONGOUGUI', name: 'Kongoussi' }
      ]
    },
    { code: 'SAH', name: 'Sahel', type: 'region',
      cities: [
        { code: 'DJIBO', name: 'Djibo' },
        { code: 'DORI', name: 'Dori' },
        { code: 'GOROM', name: 'Gorom-Gorom' },
        { code: 'SEBBA', name: 'Sebba' },
        { code: 'TITAO', name: 'Titao' }
      ]
    },
    { code: 'SUD', name: 'Sud-Ouest', type: 'region',
      cities: [
        { code: 'GAOUA', name: 'Gaoua' },
        { code: 'BANFORA', name: 'Banfora' },
        { code: 'SINDOU', name: 'Sindou' },
        { code: 'DIEBOUGOU', name: 'Diébougou' },
        { code: 'MANGA', name: 'Manga' }
      ]
    }
  ]
};

export default burkinafaso;

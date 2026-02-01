/**
 * France country data with regions, departments, and cities
 */

import { Country } from './index';

export const france: Country = {
  code: 'FR',
  name: 'France',
  flag: '🇫🇷',
  capital: 'Paris',
  area: 643801,
  currencySymbol: '€',
  officialLanguages: ['French'],
  demonym: 'French',
  taxInfo: { standardRate: 20, taxName: 'TVA', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'IDF', name: 'Île-de-France', type: 'region',
      cities: [
        { code: 'PAR', name: 'Paris' },
        { code: 'VERS', name: 'Versailles' },
        { code: 'BOUL', name: 'Boulogne-Billancourt' },
        { code: 'SAINT', name: 'Saint-Denis' },
        { code: 'COUR', name: 'Courbevoie' }
      ]
    },
    { code: 'ARA', name: 'Auvergne-Rhône-Alpes', type: 'region',
      cities: [
        { code: 'LYON', name: 'Lyon' },
        { code: 'GRENO', name: 'Grenoble' },
        { code: 'SAINT', name: 'Saint-Étienne' },
        { code: 'CLER', name: 'Clermont-Ferrand' },
        { code: 'ANNECY', name: 'Annecy' }
      ]
    },
    { code: 'HDF', name: 'Hauts-de-France', type: 'region',
      cities: [
        { code: 'LILLE', name: 'Lille' },
        { code: 'AMIENS', name: 'Amiens' },
        { code: 'ROUBAIX', name: 'Roubaix' },
        { code: 'TOUR', name: 'Tourcoing' },
        { code: 'DUNK', name: 'Dunkerque' }
      ]
    },
    { code: 'GES', name: 'Grand Est', type: 'region',
      cities: [
        { code: 'STRAS', name: 'Strasbourg' },
        { code: 'REIMS', name: 'Reims' },
        { code: 'METZ', name: 'Metz' },
        { code: 'NANCY', name: 'Nancy' },
        { code: 'MUL', name: 'Mulhouse' }
      ]
    },
    { code: 'PAC', name: "Provence-Alpes-Côte d'Azur", type: 'region',
      cities: [
        { code: 'MARSE', name: 'Marseille' },
        { code: 'NICE', name: 'Nice' },
        { code: 'TOUL', name: 'Toulon' },
        { code: 'AVIGN', name: 'Avignon' },
        { code: 'AIX', name: 'Aix-en-Provence' }
      ]
    },
    { code: 'NOR', name: 'Normandy', type: 'region',
      cities: [
        { code: 'ROUEN', name: 'Rouen' },
        { code: 'LEHAV', name: 'Le Havre' },
        { code: 'CAEN', name: 'Caen' },
        { code: 'CHER', name: 'Cherbourg' },
        { code: 'EVRE', name: 'Évreux' }
      ]
    },
    { code: 'BRE', name: 'Brittany', type: 'region',
      cities: [
        { code: 'RENNES', name: 'Rennes' },
        { code: 'BREST', name: 'Brest' },
        { code: 'QUIM', name: 'Quimper' },
        { code: 'SAINT', name: 'Saint-Malo' },
        { code: 'VANNES', name: 'Vannes' }
      ]
    },
    { code: 'PDL', name: 'Pays de la Loire', type: 'region',
      cities: [
        { code: 'NANTES', name: 'Nantes' },
        { code: 'ANGERS', name: 'Angers' },
        { code: 'LEMAN', name: 'Le Mans' },
        { code: 'LAVAL', name: 'Laval' },
        { code: 'SAINT', name: 'Saint-Nazaire' }
      ]
    },
    { code: 'CVL', name: 'Centre-Val de Loire', type: 'region',
      cities: [
        { code: 'ORLEANS', name: 'Orléans' },
        { code: 'TOURS', name: 'Tours' },
        { code: 'BLOIS', name: 'Blois' },
        { code: 'BOURG', name: 'Bourges' },
        { code: 'CHATE', name: 'Châteauroux' }
      ]
    },
    { code: 'BFC', name: 'Bourgogne-Franche-Comté', type: 'region',
      cities: [
        { code: 'DIJON', name: 'Dijon' },
        { code: 'BESAN', name: 'Besançon' },
        { code: 'CHALON', name: 'Chalon-sur-Saône' },
        { code: 'AUXER', name: 'Auxerre' },
        { code: 'BELF', name: 'Belfort' }
      ]
    },
    { code: 'OCC', name: 'Occitanie', type: 'region',
      cities: [
        { code: 'TOULOUSE', name: 'Toulouse' },
        { code: 'MONT', name: 'Montpellier' },
        { code: 'NIMES', name: 'Nîmes' },
        { code: 'PERPI', name: 'Perpignan' },
        { code: 'BORD', name: 'Bordeaux' }
      ]
    },
    { code: 'COR', name: 'Corsica', type: 'territory',
      cities: [
        { code: 'AJACC', name: 'Ajaccio' },
        { code: 'BASTIA', name: 'Bastia' },
        { code: 'CORT', name: 'Corte' },
        { code: 'SART', name: 'Sartène' },
        { code: 'CALVI', name: 'Calvi' }
      ]
    }
  ]
};

export default france;

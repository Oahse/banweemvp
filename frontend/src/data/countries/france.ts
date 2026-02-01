/**
 * France country data with regions, cities, and tax information
 */

import { Country } from './index';

export const france: Country = {
    code: 'FR',
    name: 'France',
    taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'EU' },
    provinces: [
      { code: 'IDF', name: 'Île-de-France',
        cities: [
          { code: 'PAR', name: 'Paris' },
          { code: 'VER', name: 'Versailles' },
          { code: 'BOU', name: 'Boulogne-Billancourt' },
          { code: 'SAINT', name: 'Saint-Denis' },
          { code: 'NANT', name: 'Nanterre' },
          { code: 'CRÉTEIL', name: 'Créteil' },
          { code: 'MONT', name: 'Montreuil' },
          { code: 'ARGENT', name: 'Argenteuil' },
          { code: 'LEVAL', name: 'Levallois-Perret' },
          { code: 'ISSY', name: 'Issy-les-Moulineaux' }
        ]
      },
      { code: 'ARA', name: 'Auvergne-Rhône-Alpes',
        cities: [
          { code: 'LYON', name: 'Lyon' },
          { code: 'GRENOBLE', name: 'Grenoble' },
          { code: 'SAINT', name: 'Saint-Étienne' },
          { code: 'CLERMONT', name: 'Clermont-Ferrand' },
          { code: 'ANNENCY', name: 'Annecy' },
          { code: 'CHAMBERY', name: 'Chambéry' },
          { code: 'VALENCE', name: 'Valence' },
          { code: 'VILLE', name: 'Villeurbanne' },
          { code: 'BOURG', name: 'Bourg-en-Bresse' },
          { code: 'AIX', name: 'Aix-les-Bains' }
        ]
      },
      { code: 'HDF', name: 'Hauts-de-France',
        cities: [
          { code: 'LILLE', name: 'Lille' },
          { code: 'ROUBAIX', name: 'Roubaix' },
          { code: 'TOURCOING', name: 'Tourcoing' },
          { code: 'DUNKERQUE', name: 'Dunkerque' },
          { code: 'AMIENS', name: 'Amiens' },
          { code: 'SAINT', name: 'Saint-Quentin' },
          { code: 'BEAUVAIS', name: 'Beauvais' },
          { code: 'VALENCIENNES', name: 'Valenciennes' },
          { code: 'LAON', name: 'Laon' },
          { code: 'CHÂTEAU', name: 'Château-Thierry' }
        ]
      },
      { code: 'NOR', name: 'Normandy',
        cities: [
          { code: 'ROUEN', name: 'Rouen' },
          { code: 'LEHAVRE', name: 'Le Havre' },
          { code: 'CAEN', name: 'Caen' },
          { code: 'CHERBOURG', name: 'Cherbourg-en-Cotentin' },
          { code: 'EVREUX', name: 'Évreux' },
          { code: 'DIEPPE', name: 'Dieppe' },
          { code: 'SAINT', name: 'Saint-Lô' },
          { code: 'ALENÇON', name: 'Alençon' },
          { code: 'FLERS', name: 'Flers' },
          { code: 'LISIEUX', name: 'Lisieux' }
        ]
      },
      { code: 'BFC', name: 'Bourgogne-Franche-Comté',
        cities: [
          { code: 'DIJON', name: 'Dijon' },
          { code: 'BESANÇON', name: 'Besançon' },
          { code: 'MONTBELIARD', name: 'Montbéliard' },
          { code: 'CHALON', name: 'Chalon-sur-Saône' },
          { code: 'AUXERRE', name: 'Auxerre' },
          { code: 'NEVERS', name: 'Nevers' },
          { code: 'SENA', name: 'Sens' },
          { code: 'MACON', name: 'Mâcon' },
          { code: 'AUTUN', name: 'Autun' },
          { code: 'LECREUSOT', name: 'Le Creusot' }
        ]
      },
      { code: 'BRE', name: 'Brittany',
        cities: [
          { code: 'RENNES', name: 'Rennes' },
          { code: 'BREST', name: 'Brest' },
          { code: 'QUIMPER', name: 'Quimper' },
          { code: 'SAINT', name: 'Saint-Malo' },
          { code: 'VANNES', name: 'Vannes' },
          { code: 'LORIENT', name: 'Lorient' },
          { code: 'SAINT2', name: 'Saint-Brieuc' },
          { code: 'MORLAIX', name: 'Morlaix' },
          { code: 'CONCARNEAU', name: 'Concarneau' },
          { code: 'DINAN', name: 'Dinan' }
        ]
      },
      { code: 'PDL', name: 'Pays de la Loire',
        cities: [
          { code: 'NANTES', name: 'Nantes' },
          { code: 'ANGERS', name: 'Angers' },
          { code: 'LE MANS', name: 'Le Mans' },
          { code: 'SAINT', name: 'Saint-Nazaire' },
          { code: 'LA ROCHE', name: 'La Roche-sur-Yon' },
          { code: 'LAVAL', name: 'Laval' },
          { code: 'CHOLET', name: 'Cholet' },
          { code: 'SAINT2', name: 'Saint-Herblain' },
          { code: 'REZE', name: 'Rezé' },
          { code: 'SAINT3', name: 'Saint-Sébastien-sur-Loire' }
        ]
      },
      { code: 'CVL', name: 'Centre-Val de Loire',
        cities: [
          { code: 'TOURS', name: 'Tours' },
          { code: 'ORLEANS', name: 'Orléans' },
          { code: 'BLOIS', name: 'Blois' },
          { code: 'CHARTRES', name: 'Chartres' },
          { code: 'CHATEAUROUX', name: 'Châteauroux' },
          { code: 'DREUX', name: 'Dreux' },
          { code: 'VIENNE', name: 'Vienne' },
          { code: 'ISSOUDUN', name: 'Issoudun' },
          { code: 'GIEN', name: 'Gien' },
          { code: 'SAINT', name: 'Saint-Amand-Montrond' }
        ]
      },
      { code: 'GES', name: 'Grand Est',
        cities: [
          { code: 'STRASBOURG', name: 'Strasbourg' },
          { code: 'REIMS', name: 'Reims' },
          { code: 'METZ', name: 'Metz' },
          { code: 'NANCY', name: 'Nancy' },
          { code: 'COLMAR', name: 'Colmar' },
          { code: 'MULHOUSE', name: 'Mulhouse' },
          { code: 'CHALONS', name: 'Châlons-en-Champagne' },
          { code: 'EPINAL', name: 'Épinal' },
          { code: 'THIONVILLE', name: 'Thionville' },
          { code: 'SAINT', name: 'Saint-Dizier' }
        ]
      },
      { code: 'OCC', name: 'Occitanie',
        cities: [
          { code: 'TOULOUSE', name: 'Toulouse' },
          { code: 'MONTPELLIER', name: 'Montpellier' },
          { code: 'NIMES', name: 'Nîmes' },
          { code: 'PERPIGNAN', name: 'Perpignan' },
          { code: 'ALBI', name: 'Albi' },
          { code: 'CARCASSONNE', name: 'Carcassonne' },
          { code: 'BEZIERS', name: 'Béziers' },
          { code: 'MONTAUBAN', name: 'Montauban' },
          { code: 'FOIX', name: 'Foix' },
          { code: 'AUCH', name: 'Auch' }
        ]
      },
      { code: 'HDF', name: 'Hauts-de-France',
        cities: [
          { code: 'LILLE', name: 'Lille' },
          { code: 'ROUBAIX', name: 'Roubaix' },
          { code: 'TOURCOING', name: 'Tourcoing' },
          { code: 'DUNKERQUE', name: 'Dunkerque' },
          { code: 'AMIENS', name: 'Amiens' },
          { code: 'SAINT', name: 'Saint-Quentin' },
          { code: 'BEAUVAIS', name: 'Beauvais' },
          { code: 'VALENCIENNES', name: 'Valenciennes' },
          { code: 'LAON', name: 'Laon' },
          { code: 'CHÂTEAU', name: 'Château-Thierry' }
        ]
      },
      { code: 'PAC', name: 'Provence-Alpes-Côte d\'Azur',
        cities: [
          { code: 'MARSEILLE', name: 'Marseille' },
          { code: 'NICE', name: 'Nice' },
          { code: 'TOULON', name: 'Toulon' },
          { code: 'AVIGNON', name: 'Avignon' },
          { code: 'AIX', name: 'Aix-en-Provence' },
          { code: 'CANNES', name: 'Cannes' },
          { code: 'ANTIBES', name: 'Antibes' },
          { code: 'GRASSE', name: 'Grasse' },
          { code: 'NÎMES', name: 'Nîmes' },
          { code: 'MARTIGUES', name: 'Martigues' }
        ]
      },
      { code: 'COR', name: 'Corsica',
        cities: [
          { code: 'AJACCIO', name: 'Ajaccio' },
          { code: 'BASTIA', name: 'Bastia' },
          { code: 'CORTÉ', name: 'Corte' },
          { code: 'SARTÈNE', name: 'Sartène' },
          { code: 'CALVI', name: 'Calvi' },
          { code: 'LÎLE', name: 'L\'Île-Rousse' },
          { code: 'PORTO', name: 'Porto-Vecchio' },
          { code: 'BONIFACIO', name: 'Bonifacio' },
          { code: 'BIGUGLIA', name: 'Biguglia' },
          { code: 'FURIANI', name: 'Furiani' }
        ]
      }
    ]
};

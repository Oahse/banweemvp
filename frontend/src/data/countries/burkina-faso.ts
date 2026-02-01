/**
 * Burkina Faso country data with regions, cities, and tax information
 */

import { Country } from './index';

export const burkinaFaso: Country = {
    code: 'BF',
    name: 'Burkina Faso',
    taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' },
    provinces: [
      { code: 'BAL', name: 'Balé',
        cities: [
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' },
          { code: 'TOU', name: 'Tougan' }
        ]
      },
      { code: 'BAM', name: 'Bam',
        cities: [
          { code: 'KON', name: 'Kongoussi' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' }
        ]
      },
      { code: 'BAN', name: 'Banwa',
        cities: [
          { code: 'SOL', name: 'Solenzo' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' }
        ]
      },
      { code: 'BAZ', name: 'Bazèga',
        cities: [
          { code: 'KOU', name: 'Koudougou' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' },
          { code: 'TOU', name: 'Tougan' }
        ]
      },
      { code: 'BOU', name: 'Bougouriba',
        cities: [
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' },
          { code: 'TOU', name: 'Tougan' }
        ]
      },
      { code: 'KAD', name: 'Kadiogo',
        cities: [
          { code: 'OUA', name: 'Ouagadougou' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'SAP', name: 'Sapouy' },
          { code: 'TOU', name: 'Tougan' }
        ]
      },
      { code: 'KOS', name: 'Kossi',
        cities: [
          { code: 'NUN', name: 'Nouna' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' }
        ]
      },
      { code: 'KOP', name: 'Koulpélogo',
        cities: [
          { code: 'OUA', name: 'Ouargaye' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' }
        ]
      },
      { code: 'KOU', name: 'Kourwéogo',
        cities: [
          { code: 'BOU', name: 'Boussé' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' }
        ]
      },
      { code: 'LÉR', name: 'Léraba',
        cities: [
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' },
          { code: 'TOU', name: 'Tougan' }
        ]
      },
      { code: 'LOR', name: 'Loroum',
        cities: [
          { code: 'TIT', name: 'Titao' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' }
        ]
      },
      { code: 'MOU', name: 'Mouhoun',
        cities: [
          { code: 'DED', name: 'Dédougou' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' }
        ]
      },
      { code: 'NAO', name: 'Namentenga',
        cities: [
          { code: 'BOU', name: 'Boulsa' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' }
        ]
      },
      { code: 'NAO', name: 'Nayala',
        cities: [
          { code: 'TOM', name: 'Toma' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' }
        ]
      },
      { code: 'NOU', name: 'Nord',
        cities: [
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'SAP', name: 'Sapouy' },
          { code: 'TOU', name: 'Tougan' }
        ]
      },
      { code: 'OUB', name: 'Oubritenga',
        cities: [
          { code: 'ZIN', name: 'Ziniaré' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' }
        ]
      },
      { code: 'PAS', name: 'Passoré',
        cities: [
          { code: 'YAK', name: 'Yako' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' }
        ]
      },
      { code: 'SAL', name: 'Sahel',
        cities: [
          { code: 'DOR', name: 'Dori' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' }
        ]
      },
      { code: 'SAN', name: 'Sanguiné',
        cities: [
          { code: 'MAY', name: 'Manga' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' }
        ]
      },
      { code: 'SOM', name: 'Soum',
        cities: [
          { code: 'DJIB', name: 'Djibo' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' }
        ]
      },
      { code: 'SOU', name: 'Sud-Ouest',
        cities: [
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' },
          { code: 'TOU', name: 'Tougan' }
        ]
      },
      { code: 'TAP', name: 'Tapoa',
        cities: [
          { code: 'DIA', name: 'Diapaga' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' }
        ]
      },
      { code: 'TUI', name: 'Tui',
        cities: [
          { code: 'HOU', name: 'Houndé' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' }
        ]
      },
      { code: 'YAT', name: 'Yatenga',
        cities: [
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'SAP', name: 'Sapouy' },
          { code: 'TOU', name: 'Tougan' }
        ]
      },
      { code: 'ZIR', name: 'Ziro',
        cities: [
          { code: 'SAP', name: 'Sapouy' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'TOU', name: 'Tougan' }
        ]
      },
      { code: 'ZON', name: 'Zondoma',
        cities: [
          { code: 'GOU', name: 'Gourcy' },
          { code: 'BOR', name: 'Boromo' },
          { code: 'BAG', name: 'Bagassi' },
          { code: 'BAN', name: 'Banfora' },
          { code: 'BOU', name: 'Bourasso' },
          { code: 'DAN', name: 'Dandé' },
          { code: 'FAR', name: 'Fara' },
          { code: 'KOU', name: 'Koudougou' },
          { code: 'OUA', name: 'Ouahigouya' },
          { code: 'SAP', name: 'Sapouy' }
        ]
      }
    ]
  };

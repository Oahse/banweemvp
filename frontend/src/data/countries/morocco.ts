/**
 * Morocco country data with regions and cities
 */

import { Country } from './index';

export const morocco: Country = {
  code: 'MA',
  name: 'Morocco',
  flag: '🇲🇦',
  capital: 'Rabat',
  area: 446550,
  currencySymbol: 'د.م.',
  officialLanguages: ['Arabic', 'Berber'],
  demonym: 'Moroccan',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'MAD', region: 'MEA' },
  divisions: [
    { code: 'CAS', name: 'Casablanca-Settat', type: 'region',
      cities: [
        { code: 'CASA', name: 'Casablanca' },
        { code: 'MOHAMMEDIA', name: 'Mohammedia' },
        { code: 'ELJADIDA', name: 'El Jadida' },
        { code: 'SETTAT', name: 'Settat' },
        { code: 'BERRECHID', name: 'Berrechid' }
      ]
    },
    { code: 'RAB', name: 'Rabat-Salé-Kénitra', type: 'region',
      cities: [
        { code: 'RABAT', name: 'Rabat' },
        { code: 'SALE', name: 'Salé' },
        { code: 'KENITRA', name: 'Kenitra' },
        { code: 'TEMARA', name: 'Temara' },
        { code: 'SKHIRATE', name: 'Skhirate' }
      ]
    },
    { code: 'MARR', name: 'Marrakech-Safi', type: 'region',
      cities: [
        { code: 'MARRAKECH', name: 'Marrakech' },
        { code: 'SAFI', name: 'Safi' },
        { code: 'ELKELAA', name: 'El Kelaa' },
        { code: 'ESSAOUIRA', name: 'Essaouira' },
        { code: 'YOUSOUFIA', name: 'Youssoufia' }
      ]
    },
    { code: 'FEZ', name: 'Fès-Meknès', type: 'region',
      cities: [
        { code: 'FEZ', name: 'Fez' },
        { code: 'MEKNES', name: 'Meknes' },
        { code: 'TAZA', name: 'Taza' },
        { code: 'OUJDA', name: 'Oujda' },
        { code: 'ALHOCEIMA', name: 'Al Hoceima' }
      ]
    },
    { code: 'TAN', name: 'Tanger-Tétouan-Al Hoceima', type: 'region',
      cities: [
        { code: 'TANGIER', name: 'Tangier' },
        { code: 'TETOUAN', name: 'Tetouan' },
        { code: 'ALHOCEIMA', name: 'Al Hoceima' },
        { code: 'CHEFCHAOUEN', name: 'Chefchaouen' },
        { code: 'LARACHE', name: 'Larache' }
      ]
    },
    { code: 'ORI', name: 'Oriental', type: 'region',
      cities: [
        { code: 'OUJDA', name: 'Oujda' },
        { code: 'NADOR', name: 'Nador' },
        { code: 'BERKANE', name: 'Berkane' },
        { code: 'TAOURIRT', name: 'Taourirt' },
        { code: 'JERADA', name: 'Jerada' }
      ]
    },
    { code: 'BEN', name: 'Béni Mellal-Khénifra', type: 'region',
      cities: [
        { code: 'BENI', name: 'Béni Mellal' },
        { code: 'KHENIFRA', name: 'Khénifra' },
        { code: 'AZILAL', name: 'Azilal' },
        { code: 'KHOURIBGA', name: 'Khouribga' },
        { code: 'FOQUIH', name: 'Fquih' }
      ]
    },
    { code: 'CAS', name: 'Casablanca-Settat', type: 'region',
      cities: [
        { code: 'CASABLANCA', name: 'Casablanca' },
        { code: 'MOHAMMEDIA', name: 'Mohammedia' },
        { code: 'ELJADIDA', name: 'El Jadida' },
        { code: 'SETTAT', name: 'Settat' },
        { code: 'BERRECHID', name: 'Berrechid' }
      ]
    },
    { code: 'RAB', name: 'Rabat-Salé-Kénitra', type: 'region',
      cities: [
        { code: 'RABAT', name: 'Rabat' },
        { code: 'SALE', name: 'Salé' },
        { code: 'KENITRA', name: 'Kenitra' },
        { code: 'TEMARA', name: 'Temara' },
        { code: 'SKHIRATE', name: 'Skhirate' }
      ]
    },
    { code: 'MARR', name: 'Marrakech-Safi', type: 'region',
      cities: [
        { code: 'MARRAKECH', name: 'Marrakech' },
        { code: 'SAFI', name: 'Safi' },
        { code: 'ELKELAA', name: 'El Kelaa' },
        { code: 'ESSAOUIRA', name: 'Essaouira' },
        { code: 'YOUSOUFIA', name: 'Youssoufia' }
      ]
    },
    { code: 'FEZ', name: 'Fès-Meknès', type: 'region',
      cities: [
        { code: 'FEZ', name: 'Fez' },
        { code: 'MEKNES', name: 'Meknes' },
        { code: 'TAZA', name: 'Taza' },
        { code: 'OUJDA', name: 'Oujda' },
        { code: 'ALHOCEIMA', name: 'Al Hoceima' }
      ]
    },
    { code: 'TAN', name: 'Tanger-Tétouan-Al Hoceima', type: 'region',
      cities: [
        { code: 'TANGIER', name: 'Tangier' },
        { code: 'TETOUAN', name: 'Tetouan' },
        { code: 'ALHOCEIMA', name: 'Al Hoceima' },
        { code: 'CHEFCHAOUEN', name: 'Chefchaouen' },
        { code: 'LARACHE', name: 'Larache' }
      ]
    },
    { code: 'ORI', name: 'Oriental', type: 'region',
      cities: [
        { code: 'OUJDA', name: 'Oujda' },
        { code: 'NADOR', name: 'Nador' },
        { code: 'BERKANE', name: 'Berkane' },
        { code: 'TAOURIRT', name: 'Taourirt' },
        { code: 'JERADA', name: 'Jerada' }
      ]
    },
    { code: 'SOU', name: 'Souss-Massa', type: 'region',
      cities: [
        { code: 'AGADIR', name: 'Agadir' },
        { code: 'INZEGANE', name: 'Inezgane' },
        { code: 'AIT', name: 'Ait Melloul' },
        { code: 'TAROUDANT', name: 'Taroudant' },
        { code: 'TIZNIT', name: 'Tiznit' }
      ]
    },
    { code: 'DRA', name: 'Drâa-Tafilalet', type: 'region',
      cities: [
        { code: 'ERRACHIDIA', name: 'Errachidia' },
        { code: 'OUARZAZATE', name: 'Ouarzazate' },
        { code: 'ZAGORA', name: 'Zagora' },
        { code: 'TINEJDAR', name: 'Tinejdar' },
        { code: 'MIDELT', name: 'Midelt' }
      ]
    },
    { code: 'GUE', name: 'Guelmim-Oued Noun', type: 'region',
      cities: [
        { code: 'GUELMIM', name: 'Guelmim' },
        { code: 'TAN', name: 'Tan Tan' },
        { code: 'LAAYOUNE', name: 'Laayoune' },
        { code: 'BOUJDOUR', name: 'Boujdour' },
        { code: 'AOUSSERD', name: 'Aousserd' }
      ]
    },
    { code: 'LAAY', name: 'Laâyoune-Sakia El Hamra', type: 'region',
      cities: [
        { code: 'LAAYOUNE', name: 'Laayoune' },
        { code: 'BOUJDOUR', name: 'Boujdour' },
        { code: 'TARFAYA', name: 'Tarfaya' },
        { code: 'ES', name: 'Es Semara' },
        { code: 'GUELMIM', name: 'Guelmim' }
      ]
    },
    { code: 'DAK', name: 'Dakhla-Oued Ed-Dahab', type: 'region',
      cities: [
        { code: 'DAKHLA', name: 'Dakhla' },
        { code: 'OUARDA', name: 'Ouarda' },
 { code: 'LAGOUIRA', name: 'Lagouira' },
        { code: 'BOUJDOUR', name: 'Boujdour' },
        { code: 'AOUSSERD', name: 'Aousserd' }
      ]
    }
  ]
};

export default morocco;

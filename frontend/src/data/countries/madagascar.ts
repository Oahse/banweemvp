/**
 * Madagascar country data with regions and cities
 */

import { Country } from './index';

export const madagascar: Country = {
  code: 'MG',
  name: 'Madagascar',
  flag: '🇲🇬',
  capital: 'Antananarivo',
  area: 587041,
  currencySymbol: 'Ar',
  officialLanguages: ['Malagasy', 'French'],
  demonym: 'Malagasy',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'ANA', name: 'Analamanga', type: 'region',
      cities: [
        { code: 'ANTANANARIVO', name: 'Antananarivo' },
        { code: 'ANTSIRABE', name: 'Antsirabe' },
        { code: 'TOAMASINA', name: 'Toamasina' },
        { code: 'MAHAJANGA', name: 'Mahajanga' },
        { code: 'FIANARANTSOA', name: 'Fianarantsoa' }
      ]
    },
    { code: 'ANT', name: 'Anosy', type: 'region',
      cities: [
        { code: 'TOLIARA', name: 'Toliara' },
        { code: 'TAOLAGNARO', name: 'Taolagnaro' },
        { code: 'AMBOVOMBE', name: 'Ambovombe' },
        { code: 'BEKILY', name: 'Bekily' },
        { code: 'AMPANIHY', name: 'Ampanihy' }
      ]
    },
    { code: 'ATS', name: 'Atsimo-Andrefana', type: 'region',
      cities: [
        { code: 'TOLIARA', name: 'Toliara' },
        { code: 'MORONDAVA', name: 'Morondava' },
        { code: 'MANJA', name: 'Manja' },
        { code: 'SALO', name: 'Salo' },
        { code: 'BETIOKY', name: 'Betioky' }
      ]
    },
    { code: 'ATM', name: 'Atsimo-Atsinanana', type: 'region',
      cities: [
        { code: 'FARAFANGANA', name: 'Farafangana' },
        { code: 'VOHIMENA', name: 'Vohimena' },
        { code: 'VANGAINDRANO', name: 'Vangaindrano' },
        { code: 'MANAKARA', name: 'Manakara' },
        { code: 'IFATY', name: 'Ifaty' }
      ]
    },
    { code: 'ALA', name: 'Alaotra-Mangoro', type: 'region',
      cities: [
        { code: 'AMBATONDRAZAKA', name: 'Ambatondrazaka' },
        { code: 'MORAMANGA', name: 'Moramanga' },
        { code: 'ANDASIBE', name: 'Andasibe' },
        { code: 'BRICKAVILLE', name: 'Brickaville' },
        { code: 'ANOSIBE', name: 'Anosibe' }
      ]
    },
    { code: 'AMB', name: 'Amoron\'i Mania', type: 'region',
      cities: [
        { code: 'AMBATOFINANDRAHANA', name: 'Ambatofinandrahana' },
        { code: 'FANDRIANA', name: 'Fandriana' },
        { code: 'AMBOSITRA', name: 'Ambositra' },
        { code: 'MIARINARIVO', name: 'Miarinarivo' },
        { code: 'MANANDRIANA', name: 'Manandriana' }
      ]
    },
    { code: 'ANA', name: 'Analanjirofo', type: 'region',
      cities: [
        { code: 'TOAMASINA', name: 'Toamasina' },
        { code: 'FENERIVE', name: 'Fenerive Est' },
        { code: 'MAROANTSETRA', name: 'Maroantsetra' },
        { code: 'MANANARA', name: 'Mananara' },
        { code: 'VAVATENINA', name: 'Vavatenina' }
      ]
    },
    { code: 'BOR', name: 'Boeny', type: 'region',
      cities: [
        { code: 'MAHAJANGA', name: 'Mahajanga' },
        { code: 'MAEVATANANA', name: 'Maevatanana' },
        { code: 'SOALALA', name: 'Soalala' },
        { code: 'KANDRIANA', name: 'Kandriana' },
        { code: 'MITSINJO', name: 'Mitsinjo' }
      ]
    },
    { code: 'BET', name: 'Betsiboka', type: 'region',
      cities: [
        { code: 'MAEVATANANA', name: 'Maevatanana' },
        { code: 'KANDRIANA', name: 'Kandriana' },
        { code: 'SOALALA', name: 'Soalala' },
        { code: 'MITSINJO', name: 'Mitsinjo' },
        { code: 'MAHAJANGA', name: 'Mahajanga' }
      ]
    },
    { code: 'BOM', name: 'Bongolava', type: 'region',
      cities: [
        { code: 'TSIRIBIHINA', name: 'Tsiribihina' },
        { code: 'MIARINARIVO', name: 'Miarinarivo' },
        { code: 'BELON', name: 'Belon\'i Tsiribihina' },
        { code: 'BORONDRA', name: 'Borondra' },
        { code: 'MORAFENO', name: 'Morafenobe' }
      ]
    },
    { code: 'DI', name: 'Diana', type: 'region',
      cities: [
        { code: 'ANTSIRANANA', name: 'Antsiranana' },
        { code: 'AMBIL', name: 'Ambilobe' },
        { code: 'VOHEMAR', name: 'Vohemar' },
        { code: 'SAMBAVA', name: 'Sambava' },
        { code: 'ANDAPA', name: 'Andapa' }
      ]
    },
    { code: 'IHOR', name: 'Ihorombe', type: 'region',
      cities: [
        { code: 'IHOSY', name: 'Ihosy' },
        { code: 'BENO', name: 'Beno' },
        { code: 'VOHIPENO', name: 'Vohipeno' },
        { code: 'TANANDAVA', name: 'Tanandava' },
        { code: 'BEKILY', name: 'Bekily' }
      ]
    },
    { code: 'ITA', name: 'Itasy', type: 'region',
      cities: [
        { code: 'MIARINARIVO', name: 'Miarinarivo' },
        { code: 'SOAVINANDRIANA', name: 'Soavinandriana' },
        { code: 'ARIVONIMAMO', name: 'Arivonimamo' },
        { code: 'ANALAMANGA', name: 'Analamanga' },
        { code: 'ANTANANARIVO', name: 'Antananarivo' }
      ]
    },
    { code: 'ME', name: 'Melaky', type: 'region',
      cities: [
        { code: 'MAINTIRANO', name: 'Maintirano' },
        { code: 'ANTSOHIHY', name: 'Antsohihy' },
        { code: 'MORAFENO', name: 'Morafenobe' },
        { code: 'BORONDRA', name: 'Borondra' },
        { code: 'TSIRIBIHINA', name: 'Tsiribihina' }
      ]
    },
    { code: 'MEN', name: 'Menabe', type: 'region',
      cities: [
        { code: 'MORONDAVA', name: 'Morondava' },
        { code: 'MANJA', name: 'Manja' },
        { code: 'SALO', name: 'Salo' },
        { code: 'BETIOKY', name: 'Betioky' },
        { code: 'TOLIARA', name: 'Toliara' }
      ]
    },
    { code: 'SOF', name: 'Sofia', type: 'region',
      cities: [
        { code: 'ANTSIRANANA', name: 'Antsiranana' },
        { code: 'AMBIL', name: 'Ambilobe' },
        { code: 'VOHEMAR', name: 'Vohemar' },
        { code: 'SAMBAVA', name: 'Sambava' },
        { code: 'ANDAPA', name: 'Andapa' }
      ]
    },
    { code: 'SAV', name: 'Sava', type: 'region',
      cities: [
        { code: 'SAMBAVA', name: 'Sambava' },
        { code: 'ANDAPA', name: 'Andapa' },
        { code: 'VOHEMAR', name: 'Vohemar' },
        { code: 'ANTSIRANANA', name: 'Antsiranana' },
        { code: 'AMBIL', name: 'Ambilobe' }
      ]
    },
    { code: 'UPP', name: 'Upper Matsiatra', type: 'region',
      cities: [
        { code: 'FIANARANTSOA', name: 'Fianarantsoa' },
        { code: 'AMBALAVAO', name: 'Ambalavao' },
        { code: 'AMBOHIMAHASOA', name: 'Ambohimahasoa' },
        { code: 'IKALAMAVONY', name: 'Ikalavony' },
        { code: 'MANANDRIANA', name: 'Manandriana' }
      ]
    },
    { code: 'VAK', name: 'Vakinankaratra', type: 'region',
      cities: [
        { code: 'ANTSIRABE', name: 'Antsirabe' },
        { code: 'ANTANANARIVO', name: 'Antananarivo' },
        { code: 'MIARINARIVO', name: 'Miarinarivo' },
        { code: 'SOAVINANDRIANA', name: 'Soavinandriana' },
        { code: 'ARIVONIMAMO', name: 'Arivonimamo' }
      ]
    }
  ]
};

export default madagascar;

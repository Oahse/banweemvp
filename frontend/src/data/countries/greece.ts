/**
 * Greece country data with regions, cities, and tax information
 */

import { Country } from './index';

export const greece: Country = {
    code: 'GR',
    name: 'Greece',
    taxInfo: { standardRate: 24, taxName: 'VAT', currency: 'EUR', region: 'EU' },
    provinces: [
      { code: 'ATT', name: 'Attica',
        cities: [
          { code: 'ATH', name: 'Athens' },
          { code: 'PIRAEUS', name: 'Piraeus' },
          { code: 'PERISTERI', name: 'Peristeri' },
          { code: 'KALLITHEA', name: 'Kallithea' },
          { code: 'NIKAIA', name: 'Nikaia' },
          { code: 'GLYFADA', name: 'Glyfada' },
          { code: 'VOULIAGMENI', name: 'Vouliagmeni' },
          { code: 'KIFISSIA', name: 'Kifissia' },
          { code: 'MAROUSI', name: 'Marousi' },
          { code: 'ZOGRAFOU', name: 'Zografou' }
        ]
      },
      { code: 'THE', name: 'Thessaloniki',
        cities: [
          { code: 'THESS', name: 'Thessaloniki' },
          { code: 'KAVALA', name: 'Kavala' },
          { code: 'SERRES', name: 'Serres' },
          { code: 'DRAMA', name: 'Drama' },
          { code: 'KILKIS', name: 'Kilkis' },
          { code: 'FLORINA', name: 'Florina' },
          { code: 'KOZANI', name: 'Kozani' },
          { code: 'GREVENA', name: 'Grevena' },
          { code: 'IMATHIA', name: 'Imathia' },
          { code: 'PELLA', name: 'Pella' }
        ]
      },
      { code: 'CRE', name: 'Crete',
        cities: [
          { code: 'HERAKLION', name: 'Heraklion' },
          { code: 'CHANIA', name: 'Chania' },
          { code: 'RETHYMNO', name: 'Rethymno' },
          { code: 'AGIOS', name: 'Agios Nikolaos' },
          { code: 'SITIA', name: 'Sitia' },
          { code: 'IERAPETRA', name: 'Ierapetra' },
          { code: 'MALEME', name: 'Maleme' },
          { code: 'Rethymno2', name: 'Rethymno' },
          { code: 'Chania2', name: 'Chania' },
          { code: 'Heraklion2', name: 'Heraklion' }
        ]
      },
      { code: 'EPI', name: 'Epirus',
        cities: [
          { code: 'IOANNINA', name: 'Ioannina' },
          { code: 'ARTA', name: 'Arta' },
          { code: 'PREVEZA', name: 'Preveza' },
          { code: 'THESPROTIA', name: 'Thesprotia' },
          { code: 'IGOUMENITSA', name: 'Igoumenitsa' },
          { code: 'KONITSA', name: 'Konitsa' },
          { code: 'METSOVO', name: 'Metsovo' },
          { code: 'PARGA', name: 'Parga' },
          { code: 'SOUFLI', name: 'Soufli' },
          { code: 'DIDYMOTICHO', name: 'Didymoteicho' }
        ]
      },
      { code: 'ION', name: 'Ionian Islands',
        cities: [
          { code: 'CORFU', name: 'Corfu' },
          { code: 'KEFALONIA', name: 'Kefalonia' },
          { code: 'ZAKYNTHOS', name: 'Zakynthos' },
          { code: 'ITHACA', name: 'Ithaca' },
          { code: 'LEFKADA', name: 'Lefkada' },
          { code: 'KYTHIRA', name: 'Kythera' },
          { code: 'PAXOS', name: 'Paxos' },
          { code: 'ANTIPAXOS', name: 'Antipaxos' },
          { code: 'STROFADES', name: 'Strofades' },
          { code: 'ITHACA2', name: 'Ithaca' }
        ]
      },
      { code: 'AEG', name: 'Aegean Islands',
        cities: [
          { code: 'MYKONOS', name: 'Mykonos' },
          { code: 'SANTORINI', name: 'Santorini' },
          { code: 'NAXOS', name: 'Naxos' },
          { code: 'PAROS', name: 'Paros' },
          { code: 'DELOS', name: 'Delos' },
          { code: 'ANDROS', name: 'Andros' },
          { code: 'TINOS', name: 'Tinos' },
          { code: 'SYROS', name: 'Syros' },
          { code: 'IKARIA', name: 'Ikaria' },
          { code: 'SAMOS', name: 'Samos' }
        ]
      },
      { code: 'DOD', name: 'Dodecanese',
        cities: [
          { code: 'RHODES', name: 'Rhodes' },
          { code: 'KOS', name: 'Kos' },
          { code: 'PATMOS', name: 'Patmos' },
          { code: 'KALYMNOS', name: 'Kalymnos' },
          { code: 'ASTYPALAIA', name: 'Astypalaia' },
          { code: 'KASOS', name: 'Kasos' },
          { code: 'KARPATHOS', name: 'Karpathos' },
          { code: 'TILLOS', name: 'Tillos' },
          { code: 'NISYROS', name: 'Nisyros' },
          { code: 'SYMI', name: 'Symi' }
        ]
      },
      { code: 'PEL', name: 'Peloponnese',
        cities: [
          { code: 'PATRAS', name: 'Patras' },
          { code: 'CORINTH', name: 'Corinth' },
          { code: 'TRIPOLI', name: 'Tripoli' },
          { code: 'SPARTA', name: 'Sparta' },
          { code: 'KALAMATA', name: 'Kalamata' },
          { code: 'NAFPLIO', name: 'Nafplio' },
          { code: 'PYRGOS', name: 'Pyrgos' },
          { code: 'ARGOS', name: 'Argos' },
          { code: 'MEGALOPOLI', name: 'Megalopoli' },
          { code: 'GYTHEIO', name: 'Gytheio' }
        ]
      },
      { code: 'CEN', name: 'Central Greece',
        cities: [
          { code: 'LAMIA', name: 'Lamia' },
          { code: 'CHALKIDA', name: 'Chalkida' },
          { code: 'THEBES', name: 'Thebes' },
          { code: 'LIVADEIA', name: 'Livadeia' },
          { code: 'AMFISSA', name: 'Amfissa' },
          { code: 'KARPENISI', name: 'Karpenisi' },
          { code: 'DOMOKOS', name: 'Domokos' },
          { code: 'ATALANTI', name: 'Atalanti' },
          { code: 'STYRA', name: 'Styra' },
          { code: 'KARYSTOS', name: 'Karystos' }
        ]
      },
      { code: 'WMA', name: 'Western Macedonia',
        cities: [
          { code: 'KOZANI', name: 'Kozani' },
          { code: 'FLORINA', name: 'Florina' },
          { code: 'KASTORIA', name: 'Kastoria' },
          { code: 'GREVENA', name: 'Grevena' },
          { code: 'PTOLEMAIDA', name: 'Ptolemaida' },
          { code: 'SERRES', name: 'Serres' },
          { code: 'DRAMA', name: 'Drama' },
          { code: 'KAVALA', name: 'Kavala' },
          { code: 'XANTHI', name: 'Xanthi' },
          { code: 'KOMOTINI', name: 'Komotini' }
        ]
      },
      { code: 'EMA', name: 'Eastern Macedonia',
        cities: [
          { code: 'KAVALA', name: 'Kavala' },
          { code: 'DRAMA', name: 'Drama' },
          { code: 'SERRES', name: 'Serres' },
          { code: 'XANTHI', name: 'Xanthi' },
          { code: 'KOMOTINI', name: 'Komotini' },
          { code: 'ALEXANDROUPOLI', name: 'Alexandroupoli' },
          { code: 'SAMOTHRACE', name: 'Samothrace' },
          { code: 'THASOS', name: 'Thasos' },
          { code: 'LIMNOS', name: 'Limnos' },
          { code: 'LESBOS', name: 'Lesbos' }
        ]
      },
      { code: 'THR', name: 'Thrace',
        cities: [
          { code: 'KOMOTINI', name: 'Komotini' },
          { code: 'XANTHI', name: 'Xanthi' },
          { code: 'ALEXANDROUPOLI', name: 'Alexandroupoli' },
          { code: 'SAMOTHRACE', name: 'Samothrace' },
          { code: 'THASOS', name: 'Thasos' },
          { code: 'LIMNOS', name: 'Limnos' },
          { code: 'LESBOS', name: 'Lesbos' },
          { code: 'CHIOS', name: 'Chios' },
          { code: 'IKARIA', name: 'Ikaria' },
          { code: 'SAMOS', name: 'Samos' }
        ]
      },
      { code: 'NOR', name: 'North Aegean',
        cities: [
          { code: 'MYTILENE', name: 'Mytilene' },
          { code: 'CHIOS', name: 'Chios' },
          { code: 'IKARIA', name: 'Ikaria' },
          { code: 'SAMOS', name: 'Samos' },
          { code: 'FOURNI', name: 'Fourni' },
          { code: 'THYMENA', name: 'Thymena' },
          { code: 'AGIOS', name: 'Agios Efstratios' },
          { code: 'PSARA', name: 'Psara' },
          { code: 'ANTIPSYRA', name: 'Antipsara' },
          { code: 'INOUSSSES', name: 'Inousses' }
        ]
      },
      { code: 'SOU', name: 'South Aegean',
        cities: [
          { code: 'MYKONOS', name: 'Mykonos' },
          { code: 'SANTORINI', name: 'Santorini' },
          { code: 'NAXOS', name: 'Naxos' },
          { code: 'PAROS', name: 'Paros' },
          { code: 'DELOS', name: 'Delos' },
          { code: 'ANDROS', name: 'Andros' },
          { code: 'TINOS', name: 'Tinos' },
          { code: 'SYROS', name: 'Syros' },
          { code: 'KYTHNOS', name: 'Kythnos' },
          { code: 'SERIFOS', name: 'Serifos' }
        ]
      }
    ]
};

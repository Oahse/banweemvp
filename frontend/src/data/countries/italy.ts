/**
 * Italy country data with regions, provinces, and cities
 */

import { Country } from './index';

export const italy: Country = {
  code: 'IT',
  name: 'Italy',
  flag: '🇮🇹',
  capital: 'Rome',
  area: 301340,
  currencySymbol: '€',
  officialLanguages: ['Italian'],
  demonym: 'Italian',
  taxInfo: { standardRate: 22, taxName: 'IVA', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'LAZ', name: 'Lazio', type: 'region',
      cities: [
        { code: 'ROMA', name: 'Rome' },
        { code: 'LATINA', name: 'Latina' },
        { code: 'GUIDONIA', name: 'Guidonia Montecelio' },
        { code: 'FROSINONE', name: 'Frosinone' },
        { code: 'APRILIA', name: 'Aprilia' }
      ]
    },
    { code: 'LOM', name: 'Lombardy', type: 'region',
      cities: [
        { code: 'MILANO', name: 'Milan' },
        { code: 'BRESCIA', name: 'Brescia' },
        { code: 'MONZA', name: 'Monza' },
        { code: 'BERGAMO', name: 'Bergamo' },
        { code: 'VARESE', name: 'Varese' }
      ]
    },
    { code: 'CAM', name: 'Campania', type: 'region',
      cities: [
        { code: 'NAPOLI', name: 'Naples' },
        { code: 'SALERNO', name: 'Salerno' },
        { code: 'CASERTA', name: 'Caserta' },
        { code: 'BENEVENTO', name: 'Benevento' },
        { code: 'AVERSA', name: 'Aversa' }
      ]
    },
    { code: 'SIC', name: 'Sicily', type: 'autonomous region',
      cities: [
        { code: 'PALERMO', name: 'Palermo' },
        { code: 'CATANIA', name: 'Catania' },
        { code: 'MESSINA', name: 'Messina' },
        { code: 'SIRACUSA', name: 'Syracuse' },
        { code: 'TRAPANI', name: 'Trapani' }
      ]
    },
    { code: 'VEN', name: 'Veneto', type: 'region',
      cities: [
        { code: 'VENEZIA', name: 'Venice' },
        { code: 'VERONA', name: 'Verona' },
        { code: 'PADOVA', name: 'Padua' },
        { code: 'VICENZA', name: 'Vicenza' },
        { code: 'TREVISO', name: 'Treviso' }
      ]
    },
    { code: 'PIE', name: 'Piedmont', type: 'region',
      cities: [
        { code: 'TORINO', name: 'Turin' },
        { code: 'NOVARA', name: 'Novara' },
        { code: 'ALESSANDRIA', name: 'Alessandria' },
        { code: 'ASTI', name: 'Asti' },
        { code: 'CUNEO', name: 'Cuneo' }
      ]
    },
    { code: 'EMR', name: 'Emilia-Romagna', type: 'region',
      cities: [
        { code: 'BOLOGNA', name: 'Bologna' },
        { code: 'PARMA', name: 'Parma' },
        { code: 'MODENA', name: 'Modena' },
        { code: 'REGGIO', name: 'Reggio Emilia' },
        { code: 'RAVENNA', name: 'Ravenna' }
      ]
    },
    { code: 'TOS', name: 'Tuscany', type: 'region',
      cities: [
        { code: 'FIRENZE', name: 'Florence' },
        { code: 'PRATO', name: 'Prato' },
        { code: 'LIVORNO', name: 'Livorno' },
        { code: 'PISA', name: 'Pisa' },
        { code: 'LUCCA', name: 'Lucca' }
      ]
    },
    { code: 'SAR', name: 'Sardinia', type: 'autonomous region',
      cities: [
        { code: 'CAGLIARI', name: 'Cagliari' },
        { code: 'SASSARI', name: 'Sassari' },
        { code: 'QUARTU', name: 'Quartu Sant\'Elena' },
        { code: 'OLBIA', name: 'Olbia' },
        { code: 'ALGHERO', name: 'Alghero' }
      ]
    },
    { code: 'TRE', name: 'Trentino-Alto Adige', type: 'autonomous region',
      cities: [
        { code: 'TRENTO', name: 'Trento' },
        { code: 'BOLZANO', name: 'Bolzano' },
        { code: 'ROVERETO', name: 'Rovereto' },
        { code: 'MERANO', name: 'Merano' },
        { code: 'BRUNICO', name: 'Brunico' }
      ]
    },
    { code: 'FVG', name: 'Friuli-Venezia Giulia', type: 'autonomous region',
      cities: [
        { code: 'TRIESTE', name: 'Trieste' },
        { code: 'UDINE', name: 'Udine' },
        { code: 'PORDENONE', name: 'Pordenone' },
        { code: 'GORIZIA', name: 'Gorizia' },
        { code: 'MONFALCONE', name: 'Monfalcone' }
      ]
    },
    { code: 'MAR', name: 'Marche', type: 'region',
      cities: [
        { code: 'ANCONA', name: 'Ancona' },
        { code: 'PESARO', name: 'Pesaro' },
        { code: 'FANO', name: 'Fano' },
        { code: 'SENIGALLIA', name: 'Senigallia' },
        { code: 'MACERATA', name: 'Macerata' }
      ]
    },
    { code: 'UMB', name: 'Umbria', type: 'region',
      cities: [
        { code: 'PERUGIA', name: 'Perugia' },
        { code: 'TERNI', name: 'Terni' },
        { code: 'FOLIGNO', name: 'Foligno' },
        { code: 'ASSISI', name: 'Assisi' },
        { code: 'SPOLETO', name: 'Spoleto' }
      ]
    },
    { code: 'ABR', name: 'Abruzzo', type: 'region',
      cities: [
        { code: 'L\'AQUILA', name: 'L\'Aquila' },
        { code: 'PESCARA', name: 'Pescara' },
        { code: 'CHIETI', name: 'Chieti' },
        { code: 'TERAMO', name: 'Teramo' },
        { code: 'AVEZZANO', name: 'Avezzano' }
      ]
    },
    { code: 'MOL', name: 'Molise', type: 'region',
      cities: [
        { code: 'CAMPOBASSO', name: 'Campobasso' },
        { code: 'TERMOLI', name: 'Termoli' },
        { code: 'ISERNIA', name: 'Isernia' },
        { code: 'LARINO', name: 'Larino' },
        { code: 'VENAFRO', name: 'Venafro' }
      ]
    },
    { code: 'BAS', name: 'Basilicata', type: 'region',
      cities: [
        { code: 'POTENZA', name: 'Potenza' },
        { code: 'MATERA', name: 'Matera' },
        { code: 'MELFI', name: 'Melfi' },
        { code: 'POLICORO', name: 'Policoro' },
        { code: 'LATERZA', name: 'Laterza' }
      ]
    },
    { code: 'CAL', name: 'Calabria', type: 'region',
      cities: [
        { code: 'CATANZARO', name: 'Catanzaro' },
        { code: 'REGGIO', name: 'Reggio Calabria' },
        { code: 'COSENZA', name: 'Cosenza' },
        { code: 'CROTONE', name: 'Crotone' },
        { code: 'VIBO', name: 'Vibo Valentia' }
      ]
    },
    { code: 'LIG', name: 'Liguria', type: 'region',
      cities: [
        { code: 'GENOVA', name: 'Genoa' },
        { code: 'LA SPEZIA', name: 'La Spezia' },
        { code: 'SAVONA', name: 'Savona' },
        { code: 'IMPERIA', name: 'Imperia' },
        { code: 'SANREMO', name: 'Sanremo' }
      ]
    },
    { code: 'APU', name: 'Aosta Valley', type: 'autonomous region',
      cities: [
        { code: 'AOSTA', name: 'Aosta' },
        { code: 'SAINT', name: 'Saint-Pierre' },
        { code: 'CHAMOIS', name: 'Chamois' },
        { code: 'VERRES', name: 'Verres' },
        { code: 'FENIS', name: 'Fénis' }
      ]
    }
  ]
};

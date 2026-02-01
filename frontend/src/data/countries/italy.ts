/**
 * Italy country data with regions, cities, and tax information
 */

import { Country } from './index';

export const italy: Country = {
    code: 'IT',
    name: 'Italy',
    taxInfo: { standardRate: 22, taxName: 'VAT', currency: 'EUR', region: 'EU' },
    provinces: [
      { code: 'LAZ', name: 'Lazio',
        cities: [
          { code: 'ROMA', name: 'Rome' },
          { code: 'LATINA', name: 'Latina' },
          { code: 'GUIDONIA', name: 'Guidonia Montecelio' },
          { code: 'FROSINONE', name: 'Frosinone' },
          { code: 'APRILIA', name: 'Apriliano' },
          { code: 'TIVOLI', name: 'Tivoli' },
          { code: 'RIETI', name: 'Rieti' },
          { code: 'CIVITAVECCHIA', name: 'Civitavecchia' },
          { code: 'VITERBO', name: 'Viterbo' },
          { code: 'POMEZIA', name: 'Pomezia' }
        ]
      },
      { code: 'LOM', name: 'Lombardy',
        cities: [
          { code: 'MILAN', name: 'Milan' },
          { code: 'BRESCIA', name: 'Brescia' },
          { code: 'MONZA', name: 'Monza' },
          { code: 'BERGAMO', name: 'Bergamo' },
          { code: 'COMO', name: 'Como' },
          { code: 'VARESE', name: 'Varese' },
          { code: 'SONDIO', name: 'Sondrio' },
          { code: 'LECCO', name: 'Lecco' },
          { code: 'CREMONA', name: 'Cremona' },
          { code: 'MANTOVA', name: 'Mantova' }
        ]
      },
      { code: 'CAM', name: 'Campania',
        cities: [
          { code: 'NAPOLI', name: 'Naples' },
          { code: 'SALERNO', name: 'Salerno' },
          { code: 'CASERTA', name: 'Caserta' },
          { code: 'BENEVENTO', name: 'Benevento' },
          { code: 'AVERSA', name: 'Aversa' },
          { code: 'GIUGLIANO', name: 'Giugliano in Campania' },
          { code: 'TORRE', name: 'Torre del Greco' },
          { code: 'POMPEI', name: 'Pompei' },
          { code: 'AFRAGOLA', name: 'Afragola' },
          { code: 'CASORIA', name: 'Casoria' }
        ]
      },
      { code: 'SIC', name: 'Sicily',
        cities: [
          { code: 'PALERMO', name: 'Palermo' },
          { code: 'CATANIA', name: 'Catania' },
          { code: 'MESSINA', name: 'Messina' },
          { code: 'SIRACUSA', name: 'Siracusa' },
          { code: 'TRAPANI', name: 'Trapani' },
          { code: 'CALTAGIRONE', name: 'Caltagirone' },
          { code: 'AGRIGENTO', name: 'Agrigento' },
          { code: 'ENNA', name: 'Enna' },
          { code: 'RAGUSA', name: 'Ragusa' },
          { code: 'CATANZARO', name: 'Catanzaro' }
        ]
      },
      { code: 'VEN', name: 'Veneto',
        cities: [
          { code: 'VENEZIA', name: 'Venice' },
          { code: 'VERONA', name: 'Verona' },
          { code: 'PADOVA', name: 'Padua' },
          { code: 'VICENZA', name: 'Vicenza' },
          { code: 'TREVISO', name: 'Treviso' },
          { code: 'ROVIGO', name: 'Rovigo' },
          { code: 'BELLUNO', name: 'Belluno' },
          { code: 'TREVISO2', name: 'Treviso' },
          { code: 'CHIOGGIA', name: 'Chioggia' },
          { code: 'SAN', name: 'San Donà di Piave' }
        ]
      },
      { code: 'EMR', name: 'Emilia-Romagna',
        cities: [
          { code: 'BOLOGNA', name: 'Bologna' },
          { code: 'PARMA', name: 'Parma' },
          { code: 'MODENA', name: 'Modena' },
          { code: 'REGGIO', name: 'Reggio Emilia' },
          { code: 'RAVENNA', name: 'Ravenna' },
          { code: 'RIMINI', name: 'Rimini' },
          { code: 'FERRARA', name: 'Ferrara' },
          { code: 'FORLI', name: 'Forlì' },
          { code: 'CESENA', name: 'Cesena' },
          { code: 'PIACENZA', name: 'Piacenza' }
        ]
      },
      { code: 'PIE', name: 'Piedmont',
        cities: [
          { code: 'TORINO', name: 'Turin' },
          { code: 'NOVARA', name: 'Novara' },
          { code: 'ALESSANDRIA', name: 'Alessandria' },
          { code: 'ASTI', name: 'Asti' },
          { code: 'CUNEO', name: 'Cuneo' },
          { code: 'BIELLA', name: 'Biella' },
          { code: 'VERBANO', name: 'Verbano-Cusio-Ossola' },
          { code: 'VERCELLI', name: 'Vercelli' },
          { code: 'DOMODOSSOLA', name: 'Domodossola' },
          { code: 'CASALE', name: 'Casale Monferrato' }
        ]
      },
      { code: 'TOS', name: 'Tuscany',
        cities: [
          { code: 'FIRENZE', name: 'Florence' },
          { code: 'PRATO', name: 'Prato' },
          { code: 'LIVORNO', name: 'Livorno' },
          { code: 'PISA', name: 'Pisa' },
          { code: 'AREZZO', name: 'Arezzo' },
          { code: 'GROSSETO', name: 'Grosseto' },
          { code: 'SIENA', name: 'Siena' },
          { code: 'LUCCA', name: 'Lucca' },
          { code: 'MASSA', name: 'Massa' },
          { code: 'CARRARA', name: 'Carrara' }
        ]
      },
      { code: 'PUG', name: 'Apulia',
        cities: [
          { code: 'BARI', name: 'Bari' },
          { code: 'LECCE', name: 'Lecce' },
          { code: 'TARANTO', name: 'Taranto' },
          { code: 'BRINDISI', name: 'Brindisi' },
          { code: 'FOGGIA', name: 'Foggia' },
          { code: 'ANDRIA', name: 'Andria' },
          { code: 'BARLETTA', name: 'Barletta' },
          { code: 'MOLFETTA', name: 'Molfetta' },
          { code: 'LECCE2', name: 'Lecce' },
          { code: 'SAN', name: 'San Severo' }
        ]
      },
      { code: 'CAL', name: 'Calabria',
        cities: [
          { code: 'CATANZARO', name: 'Catanzaro' },
          { code: 'REGGIO', name: 'Reggio Calabria' },
          { code: 'COSENZA', name: 'Cosenza' },
          { code: 'CROTONE', name: 'Crotone' },
          { code: 'VIBO', name: 'Vibo Valentia' },
          { code: 'CROTONE2', name: 'Crotone' },
          { code: 'LAMEZIA', name: 'Lamezia Terme' },
          { code: 'PAOLA', name: 'Paola' },
          { code: 'CARIATI', name: 'Cariati' },
          { code: 'ROSSANO', name: 'Rossano' }
        ]
      },
      { code: 'SAR', name: 'Sardinia',
        cities: [
          { code: 'CAGLIARI', name: 'Cagliari' },
          { code: 'SASSARI', name: 'Sassari' },
          { code: 'NUORO', name: 'Nuoro' },
          { code: 'ORISTANO', name: 'Oristano' },
          { code: 'CARBONIA', name: 'Carbonia' },
          { code: 'IGLESIAS', name: 'Iglesias' },
          { code: 'LANUSEI', name: 'Lanusei' },
          { code: 'SANLURI', name: 'Sanluri' },
          { code: 'TEMPIO', name: 'Tempio Pausania' },
          { code: 'VILLANOVA', name: 'Villanova Tulo' }
        ]
      },
      { code: 'LIG', name: 'Liguria',
        cities: [
          { code: 'GENOVA', name: 'Genoa' },
          { code: 'LA SPEZIA', name: 'La Spezia' },
          { code: 'SAVONA', name: 'Savona' },
          { code: 'IMPERIA', name: 'Imperia' },
          { code: 'SAN', name: 'San Remo' },
          { code: 'VENTIMIGLIA', name: 'Ventimiglia' },
          { code: 'ALASSIO', name: 'Alassio' },
          { code: 'FINALE', name: 'Finale Ligure' },
          { code: 'NOVI', name: 'Novi Ligure' },
          { code: 'CHIAVARI', name: 'Chiavari' }
        ]
      },
      { code: 'MAR', name: 'Marche',
        cities: [
          { code: 'ANCONA', name: 'Ancona' },
          { code: 'PESARO', name: 'Pesaro' },
          { code: 'FANO', name: 'Fano' },
          { code: 'ASCOLI', name: 'Ascoli Piceno' },
          { code: 'MACERATA', name: 'Macerata' },
          { code: 'FERMO', name: 'Fermo' },
          { code: 'URBINO', name: 'Urbino' },
          { code: 'CIVITANOVA', name: 'Civitanova Marche' },
          { code: 'SENIGALLIA', name: 'Senigallia' },
          { code: 'JESI', name: 'Jesi' }
        ]
      },
      { code: 'ABR', name: 'Abruzzo',
        cities: [
          { code: 'L\'AQUILA', name: 'L\'Aquila' },
          { code: 'PESCARA', name: 'Pescara' },
          { code: 'CHIETI', name: 'Chieti' },
          { code: 'TERAMO', name: 'Teramo' },
          { code: 'VASTO', name: 'Vasto' },
          { code: 'MONTESILVANO', name: 'Montesilvano' },
          { code: 'CHIETI2', name: 'Chieti' },
          { code: 'FRANCAVILLA', name: 'Francavilla al Mare' },
          { code: 'GIULIANOVA', name: 'Giulianova' },
          { code: 'MARTINSICURO', name: 'Martinsicuro' }
        ]
      },
      { code: 'FRI', name: 'Friuli-Venezia Giulia',
        cities: [
          { code: 'TRIESTE', name: 'Trieste' },
          { code: 'UDINE', name: 'Udine' },
          { code: 'PORDENONE', name: 'Pordenone' },
          { code: 'GORIZIA', name: 'Gorizia' },
          { code: 'MONFALCONE', name: 'Monfalcone' },
          { code: 'CERVIGNANO', name: 'Cervignano del Friuli' },
          { code: 'LIGNANO', name: 'Lignano Sabbiadoro' },
          { code: 'SAN', name: 'San Daniele del Friuli' },
          { code: 'SPILIMBERGO', name: 'Spilimbergo' },
          { code: 'TOLMEZZO', name: 'Tolmezzo' }
        ]
      },
      { code: 'TRE', name: 'Trentino-Alto Adige',
        cities: [
          { code: 'TRENTO', name: 'Trento' },
          { code: 'BOLZANO', name: 'Bolzano' },
          { code: 'ROVERETO', name: 'Rovereto' },
          { code: 'MERANO', name: 'Merano' },
          { code: 'BRESSANONE', name: 'Bressanone' },
          { code: 'BRUNICO', name: 'Brunico' },
          { code: 'CLES', name: 'Cles' },
          { code: 'CORTINA', name: 'Cortina d\'Ampezzo' },
          { code: 'ORTISEI', name: 'Ortisei' },
          { code: 'CAVALESE', name: 'Cavalese' }
        ]
      },
      { code: 'UMB', name: 'Umbria',
        cities: [
          { code: 'PERUGIA', name: 'Perugia' },
          { code: 'TERNI', name: 'Terni' },
          { code: 'FOLIGNO', name: 'Foligno' },
          { code: 'CITTA', name: 'Città di Castello' },
          { code: 'SPOLETO', name: 'Spoleto' },
          { code: 'ASSISI', name: 'Assisi' },
          { code: 'GUBBIO', name: 'Gubbio' },
          { code: 'NARNI', name: 'Narni' },
          { code: 'TERNI2', name: 'Terni' },
          { code: 'ORVIETO', name: 'Orvieto' }
        ]
      },
      { code: 'AOS', name: 'Aosta Valley',
        cities: [
          { code: 'AOSTA', name: 'Aosta' },
          { code: 'SAINT', name: 'Saint-Pierre' },
          { code: 'CHATILLON', name: 'Châtillon' },
          { code: 'VERRES', name: 'Verres' },
          { code: 'BREUIL', name: 'Breuil-Cervinia' },
          { code: 'SAINT2', name: 'Saint-Vincent' },
          { code: 'AOSTA2', name: 'Aosta' },
          { code: 'COGNE', name: 'Cogne' },
          { code: 'VERRÈS', name: 'Verrès' },
          { code: 'SAINT3', name: 'Saint-Rhémy-en-Bosses' }
        ]
      },
      { code: 'MOL', name: 'Molise',
        cities: [
          { code: 'CAMPOBASSO', name: 'Campobasso' },
          { code: 'ISERNIA', name: 'Isernia' },
          { code: 'TERMOLI', name: 'Termoli' },
          { code: 'VENAFRO', name: 'Venafro' },
          { code: 'BOJANO', name: 'Bojano' },
          { code: 'CAMPOBASSO2', name: 'Campobasso' },
          { code: 'LARINO', name: 'Larino' },
          { code: 'AGNONE', name: 'Agnone' },
          { code: 'TRIVENTO', name: 'Trivento' },
          { code: 'FROSOLONE', name: 'Frosolone' }
        ]
      },
      { code: 'BAS', name: 'Basilicata',
        cities: [
          { code: 'POTENZA', name: 'Potenza' },
          { code: 'MATERA', name: 'Matera' },
          { code: 'PISTICCI', name: 'Pisticci' },
          { code: 'POLICORO', name: 'Policoro' },
          { code: 'MELFI', name: 'Melfi' },
          { code: 'LAVELLO', name: 'Lavello' },
          { code: 'SENISE', name: 'Senise' },
          { code: 'LAURIA', name: 'Lauria' },
          { code: 'GRASSANO', name: 'Grassano' },
          { code: 'MONTALBANO', name: 'Montalbano Jonico' }
        ]
      }
    ]
};

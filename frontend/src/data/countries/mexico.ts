/**
 * Mexico country data with states and cities
 */

import { Country } from './index';

export const mexico: Country = {
    code: 'MX',
    name: 'Mexico',
    flag: '🇲🇽',
    capital: 'Mexico City',
    area: 1964375,
    currencySymbol: '$',
    officialLanguages: ['Spanish'],
    demonym: 'Mexican',
    taxInfo: { standardRate: 16, taxName: 'IVA', currency: 'MXN', region: 'NA' },
    divisions: [
      { code: 'AGU', name: 'Aguascalientes', type: 'state',
        cities: [
          { code: 'AGUASC', name: 'Aguascalientes' },
          { code: 'JESUS', name: 'Jesús María' },
          { code: 'SAN', name: 'San Francisco de los Romo' }
        ]
      },
      { code: 'BCN', name: 'Baja California', type: 'state',
        cities: [
          { code: 'MEXICALI', name: 'Mexicali' },
          { code: 'TIJUANA', name: 'Tijuana' },
          { code: 'ENSENADA', name: 'Ensenada' }
        ]
      },
      { code: 'BCS', name: 'Baja California Sur', type: 'state',
        cities: [
          { code: 'LA', name: 'La Paz' },
          { code: 'CABO', name: 'Cabo San Lucas' },
          { code: 'SANJOSE', name: 'San José del Cabo' }
        ]
      },
      { code: 'CHP', name: 'Chiapas', type: 'state',
        cities: [
          { code: 'TUXTLA', name: 'Tuxtla Gutiérrez' },
          { code: 'SAN', name: 'San Cristóbal de las Casas' },
          { code: 'TAPACHULA', name: 'Tapachula' }
        ]
      },
      { code: 'CHH', name: 'Chihuahua', type: 'state',
        cities: [
          { code: 'CHIHUAHUA', name: 'Chihuahua' },
          { code: 'JUAREZ', name: 'Ciudad Juárez' },
          { code: 'PARRAL', name: 'Hidalgo del Parral' }
        ]
      },
      { code: 'COA', name: 'Coahuila', type: 'state',
        cities: [
          { code: 'TORREON', name: 'Torreón' },
          { code: 'SALTILLO', name: 'Saltillo' },
          { code: 'MONTERREY', name: 'Monclova' }
        ]
      },
      { code: 'COL', name: 'Colima', type: 'state',
        cities: [
          { code: 'COLIMA', name: 'Colima' },
          { code: 'MANZANILLO', name: 'Manzanillo' },
          { code: 'VILLA', name: 'Villa de Álvarez' }
        ]
      },
      { code: 'DUR', name: 'Durango', type: 'state',
        cities: [
          { code: 'DURANGO', name: 'Durango' },
          { code: 'GOMEZ', name: 'Gómez Palacio' },
          { code: 'LERDO', name: 'Lerdo' }
        ]
      },
      { code: 'GUA', name: 'Guanajuato', type: 'state',
        cities: [
          { code: 'LEON', name: 'León' },
          { code: 'GUANAJUATO', name: 'Guanajuato' },
          { code: 'IRAPUATO', name: 'Irapuato' }
        ]
      },
      { code: 'GRO', name: 'Guerrero', type: 'state',
        cities: [
          { code: 'ACAPULCO', name: 'Acapulco' },
          { code: 'CHILPANCINGO', name: 'Chilpancingo' },
          { code: 'IGUALA', name: 'Iguala' }
        ]
      },
      { code: 'JAL', name: 'Jalisco', type: 'state',
        cities: [
          { code: 'GUADALAJARA', name: 'Guadalajara' },
          { code: 'ZAPOPAN', name: 'Zapopan' },
          { code: 'PUERTO', name: 'Puerto Vallarta' }
        ]
      },
      { code: 'MEX', name: 'State of Mexico', type: 'state',
        cities: [
          { code: 'TOLUCA', name: 'Toluca' },
          { code: 'ECATEPEC', name: 'Ecatepec' },
          { code: 'NAUCALPAN', name: 'Naucalpan' }
        ]
      },
      { code: 'MIC', name: 'Michoacán', type: 'state',
        cities: [
          { code: 'MORELIA', name: 'Morelia' },
          { code: 'URUAPAN', name: 'Uruapan' },
          { code: 'ZAMORA', name: 'Zamora' }
        ]
      },
      { code: 'MOR', name: 'Morelos', type: 'state',
        cities: [
          { code: 'CUERNAVACA', name: 'Cuernavaca' },
          { code: 'CUAUTLA', name: 'Cuautla' },
          { code: 'JIUTEPEC', name: 'Jiutepec' }
        ]
      },
      { code: 'NAY', name: 'Nayarit', type: 'state',
        cities: [
          { code: 'TEPIC', name: 'Tepic' },
          { code: 'BAHIAS', name: 'Bahía de Banderas' },
          { code: 'SANTIAGO', name: 'Santiago Ixcuintla' }
        ]
      },
      { code: 'NLE', name: 'Nuevo León', type: 'state',
        cities: [
          { code: 'MONTERREY', name: 'Monterrey' },
          { code: 'GUADALUPE', name: 'Guadalupe' },
          { code: 'SAN', name: 'San Nicolás de los Garza' }
        ]
      },
      { code: 'OAX', name: 'Oaxaca', type: 'state',
        cities: [
          { code: 'OAXACA', name: 'Oaxaca' },
          { code: 'SAN', name: 'San Juan Bautista Tuxtepec' },
          { code: 'JUCHITAN', name: 'Juchitán' }
        ]
      },
      { code: 'PUE', name: 'Puebla', type: 'state',
        cities: [
          { code: 'PUEBLA', name: 'Puebla' },
          { code: 'HEROICA', name: 'Heroica Puebla de Zaragoza' },
          { code: 'SAN', name: 'San Martín Texmelucan' }
        ]
      },
      { code: 'QUE', name: 'Querétaro', type: 'state',
        cities: [
          { code: 'QUERETARO', name: 'Querétaro' },
          { code: 'SAN', name: 'San Juan del Río' },
          { code: 'CORREGIDORA', name: 'Corregidora' }
        ]
      },
      { code: 'ROO', name: 'Quintana Roo', type: 'state',
        cities: [
          { code: 'CANCUN', name: 'Cancún' },
          { code: 'CHETUMAL', name: 'Chetumal' },
          { code: 'PLAYA', name: 'Playa del Carmen' }
        ]
      },
      { code: 'SLP', name: 'San Luis Potosí', type: 'state',
        cities: [
          { code: 'SAN', name: 'San Luis Potosí' },
          { code: 'SOLEDAD', name: 'Soledad de Graciano Sánchez' },
          { code: 'CIUDAD', name: 'Ciudad Valles' }
        ]
      },
      { code: 'SIN', name: 'Sinaloa', type: 'state',
        cities: [
          { code: 'CULIACAN', name: 'Culiacán' },
          { code: 'MAZATLAN', name: 'Mazatlán' },
          { code: 'LOS', name: 'Los Mochis' }
        ]
      },
      { code: 'SON', name: 'Sonora', type: 'state',
        cities: [
          { code: 'HERMOSILLO', name: 'Hermosillo' },
          { code: 'CIUDAD', name: 'Ciudad Obregón' },
          { code: 'NOGALES', name: 'Nogales' }
        ]
      },
      { code: 'TAB', name: 'Tabasco', type: 'state',
        cities: [
          { code: 'VILLAHERMOSA', name: 'Villahermosa' },
          { code: 'CARDENAS', name: 'Cárdenas' },
          { code: 'COMALCALCO', name: 'Comalcalco' }
        ]
      },
      { code: 'TAM', name: 'Tamaulipas', type: 'state',
        cities: [
          { code: 'REYNOSA', name: 'Reynosa' },
          { code: 'MATAMOROS', name: 'Matamoros' },
          { code: 'NUEVO', name: 'Nuevo Laredo' }
        ]
      },
      { code: 'TLA', name: 'Tlaxcala', type: 'state',
        cities: [
          { code: 'TLAXCALA', name: 'Tlaxcala' },
          { code: 'VILLA', name: 'Villa Vicente Guerrero' },
          { code: 'XICOHTENCATL', name: 'Xicohténcatl' }
        ]
      },
      { code: 'VER', name: 'Veracruz', type: 'state',
        cities: [
          { code: 'VERACRUZ', name: 'Veracruz' },
          { code: 'XALAPA', name: 'Xalapa' },
          { code: 'COATZACOALCOS', name: 'Coatzacoalcos' }
        ]
      },
      { code: 'YUC', name: 'Yucatán', type: 'state',
        cities: [
          { code: 'MERIDA', name: 'Mérida' },
          { code: 'PROGRESO', name: 'Progreso' },
          { code: 'KANSIL', name: 'Kanasín' }
        ]
      },
      { code: 'ZAC', name: 'Zacatecas', type: 'state',
        cities: [
          { code: 'ZACATECAS', name: 'Zacatecas' },
          { code: 'GUADALUPE', name: 'Guadalupe' },
          { code: 'FRESNILLO', name: 'Fresnillo' }
        ]
      },
      { code: 'CMX', name: 'Mexico City', type: 'federal entity',
        cities: [
          { code: 'MEXICO', name: 'Mexico City' },
          { code: 'IZTAPALAPA', name: 'Iztapalapa' },
          { code: 'GUSTAVO', name: 'Gustavo A. Madero' }
        ]
      }
    ]
  };

export default mexico;

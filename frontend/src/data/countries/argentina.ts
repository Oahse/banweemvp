/**
 * Argentina country data with provinces and autonomous city
 */

import { Country } from './index';

export const argentina: Country = {
    code: 'AR',
    name: 'Argentina',
    flag: '🇦🇷',
    capital: 'Buenos Aires',
    area: 2780400,
    currencySymbol: '$',
    officialLanguages: ['Spanish'],
    demonym: 'Argentine',
    taxInfo: { standardRate: 21, taxName: 'IVA', currency: 'ARS', region: 'LATAM' },
    divisions: [
      { code: 'BA', name: 'Buenos Aires', type: 'province',
        cities: [
          { code: 'LA', name: 'La Plata' },
          { code: 'MAR', name: 'Mar del Plata' },
          { code: 'BAHIA', name: 'Bahía Blanca' },
          { code: 'QUILMES', name: 'Quilmes' },
          { code: 'TANDIL', name: 'Tandil' }
        ]
      },
      { code: 'CABA', name: 'Buenos Aires', type: 'autonomous city',
        cities: [
          { code: 'BUENOSAIRES', name: 'Buenos Aires' },
          { code: 'PALERMO', name: 'Palermo' },
          { code: 'RECOLETA', name: 'Recoleta' },
          { code: 'BELGRANO', name: 'Belgrano' },
          { code: 'SAN', name: 'San Telmo' }
        ]
      },
      { code: 'CT', name: 'Catamarca', type: 'province',
        cities: [
          { code: 'CATAMARCA', name: 'Catamarca' },
          { code: 'TINOGASTA', name: 'Tinogasta' },
          { code: 'ANDALGALA', name: 'Andalgalá' },
          { code: 'BELÉN', name: 'Belén' },
          { code: 'SANTA', name: 'Santa María' }
        ]
      },
      { code: 'CC', name: 'Chaco', type: 'province',
        cities: [
          { code: 'RESISTENCIA', name: 'Resistencia' },
          { code: 'CHARATA', name: 'Charata' },
          { code: 'GENERAL', name: 'General Pinasco' },
          { code: 'EL', name: 'Elortondo' },
          { code: 'PRESIDENTE', name: 'Presidente Roque Sáenz Peña' }
        ]
      },
      { code: 'CH', name: 'Chubut', type: 'province',
        cities: [
          { code: 'RAWSON', name: 'Rawson' },
          { code: 'PUERTO', name: 'Puerto Madryn' },
          { code: 'COMODORO', name: 'Comodoro Rivadavia' },
          { code: 'ESQUEL', name: 'Esquel' },
          { code: 'TRELEW', name: 'Trelew' }
        ]
      },
      { code: 'CB', name: 'Córdoba', type: 'province',
        cities: [
          { code: 'CORDOBA', name: 'Córdoba' },
          { code: 'RIO', name: 'Río Cuarto' },
          { code: 'VILLA', name: 'Villa María' },
          { code: 'SAN', name: 'San Francisco' },
          { code: 'JESUS', name: 'Jesús María' }
        ]
      },
      { code: 'CR', name: 'Corrientes', type: 'province',
        cities: [
          { code: 'CORRIENTES', name: 'Corrientes' },
          { code: 'GUALEGUAYCHU', name: 'Gualeguaychú' },
          { code: 'CONCEPCION', name: 'Concepción' },
          { code: 'PASO', name: 'Paso de los Libres' },
          { code: 'MONTE', name: 'Monte Caseros' }
        ]
      },
      { code: 'ER', name: 'Entre Ríos', type: 'province',
        cities: [
          { code: 'PARANA', name: 'Paraná' },
          { code: 'CONCORDIA', name: 'Concordia' },
          { code: 'GUALEGUAYCHU', name: 'Gualeguaychú' },
          { code: 'CONCEPCION', name: 'Concepción del Uruguay' },
          { code: 'VILLAGUAY', name: 'Villaguay' }
        ]
      },
      { code: 'FO', name: 'Formosa', type: 'province',
        cities: [
          { code: 'FORMOSA', name: 'Formosa' },
          { code: 'CLORINDA', name: 'Clorinda' },
          { code: 'EL', name: 'El Colorado' },
          { code: 'PILAR', name: 'Pilcomayo' },
          { code: 'RESISTENCIA', name: 'Resistencia' }
        ]
      },
      { code: 'JY', name: 'Jujuy', type: 'province',
        cities: [
          { code: 'JUJUY', name: 'Jujuy' },
          { code: 'SAN', name: 'San Salvador de Jujuy' },
          { code: 'PERICO', name: 'Perico' },
          { code: 'PALPALA', name: 'Palpalá' },
          { code: 'LA', name: 'La Quiaca' }
        ]
      },
      { code: 'LP', name: 'La Pampa', type: 'province',
        cities: [
          { code: 'SANTA', name: 'Santa Rosa' },
          { code: 'GENERAL', name: 'General Pico' },
          { code: 'TOAY', name: 'Toay' },
          { code: 'ATAMISQUI', name: 'Atamisqui' },
          { code: 'REALICO', name: 'Realicó' }
        ]
      },
      { code: 'LR', name: 'La Rioja', type: 'province',
        cities: [
          { code: 'LARIOJA', name: 'La Rioja' },
          { code: 'CHILECITO', name: 'Chilecito' },
          { code: 'FAMATINA', name: 'Famatina' },
          { code: 'CHAMICAL', name: 'Chamical' },
          { code: 'VILLA', name: 'Villa Unión' }
        ]
      },
      { code: 'MZ', name: 'Mendoza', type: 'province',
        cities: [
          { code: 'MENDOZA', name: 'Mendoza' },
          { code: 'GUAYMALLEN', name: 'Guaymallén' },
          { code: 'SAN', name: 'San Martín' },
          { code: 'MAIPU', name: 'Maipú' },
          { code: 'LAS', name: 'Las Heras' }
        ]
      },
      { code: 'MI', name: 'Misiones', type: 'province',
        cities: [
          { code: 'POSADAS', name: 'Posadas' },
          { code: 'PUERTO', name: 'Puerto Iguazú' },
          { code: 'APÓSTOLES', name: 'Apóstoles' },
          { code: 'CORRIENTES', name: 'Corrientes' },
          { code: 'EL', name: 'El Dorado' }
        ]
      },
      { code: 'NQ', name: 'Neuquén', type: 'province',
        cities: [
          { code: 'NEUQUEN', name: 'Neuquén' },
          { code: 'CIPOLLETTI', name: 'Cipolletti' },
          { code: 'PLOTTIER', name: 'Plottier' },
          { code: 'ZAPALA', name: 'Zapala' },
          { code: 'SAN', name: 'San Martín de los Andes' }
        ]
      },
      { code: 'RN', name: 'Río Negro', type: 'province',
        cities: [
          { code: 'VIEDMA', name: 'Viedma' },
          { code: 'BARILOCHE', name: 'Bariloche' },
          { code: 'GENERAL', name: 'General Roca' },
          { code: 'CINCO', name: 'Cinco Saltos' },
          { code: 'SAN', name: 'San Carlos de Bariloche' }
        ]
      },
      { code: 'SA', name: 'Salta', type: 'province',
        cities: [
          { code: 'SALTA', name: 'Salta' },
          { code: 'SAN', name: 'San Ramón de la Nueva Orán' },
          { code: 'TARTAGAL', name: 'Tartagal' },
          { code: 'JOAQUIN', name: 'Joaquín V. González' },
          { code: 'CAMPO', name: 'Campo Santo' }
        ]
      },
      { code: 'SJ', name: 'San Juan', type: 'province',
        cities: [
          { code: 'SANJUAN', name: 'San Juan' },
          { code: 'RAWSON', name: 'Rawson' },
          { code: 'CHIMBAS', name: 'Chimbas' },
          { code: 'SANTA', name: 'Santa Lucía' },
          { code: 'CAUCETE', name: 'Caucete' }
        ]
      },
      { code: 'SL', name: 'San Luis', type: 'province',
        cities: [
          { code: 'SANLUIS', name: 'San Luis' },
          { code: 'VILLA', name: 'Villa Mercedes' },
          { code: 'MERLO', name: 'Merlo' },
          { code: 'CONCARAN', name: 'Concarán' },
          { code: 'JUAN', name: 'Juan Martín de Pueyrredón' }
        ]
      },
      { code: 'SC', name: 'Santa Cruz', type: 'province',
        cities: [
          { code: 'RIO', name: 'Río Gallegos' },
          { code: 'PUERTO', name: 'Puerto Santa Cruz' },
          { code: 'COMODORO', name: 'Comodoro Rivadavia' },
          { code: 'CALET', name: 'Caleta Olivia' },
          { code: 'PERITO', name: 'Perito Moreno' }
        ]
      },
      { code: 'SF', name: 'Santa Fe', type: 'province',
        cities: [
          { code: 'SANTAFE', name: 'Santa Fe' },
          { code: 'ROSARIO', name: 'Rosario' },
          { code: 'RAFAELA', name: 'Rafaela' },
          { code: 'VENADO', name: 'Venado Tuerto' },
          { code: 'RECONQUISTA', name: 'Reconquista' }
        ]
      },
      { code: 'SE', name: 'Santiago del Estero', type: 'province',
        cities: [
          { code: 'SANTIAGO', name: 'Santiago del Estero' },
          { code: 'FRÍAS', name: 'Frías' },
          { code: 'LA', name: 'La Banda' },
          { code: 'BANDA', name: 'Banda' },
          { code: 'QUILMES', name: 'Quilmes' }
        ]
      },
      { code: 'TF', name: 'Tierra del Fuego', type: 'province',
        cities: [
          { code: 'USHUAIA', name: 'Ushuaia' },
          { code: 'RIO', name: 'Río Grande' },
          { code: 'TOLHUIN', name: 'Tolhuin' },
          { code: 'PORVENIR', name: 'Porvenir' },
          { code: 'ISLA', name: 'Isla Grande' }
        ]
      },
      { code: 'TU', name: 'Tucumán', type: 'province',
        cities: [
          { code: 'TUCUMAN', name: 'Tucumán' },
          { code: 'SAN', name: 'San Miguel de Tucumán' },
          { code: 'YERBA', name: 'Yerba Buena' },
          { code: 'BANDA', name: 'Banda del Río Salí' },
          { code: 'ALDERETES', name: 'Alderetes' }
        ]
      }
    ]
  };

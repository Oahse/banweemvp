/**
 * Argentina country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const argentina: Country = {
    code: 'AR',
    name: 'Argentina',
    taxInfo: { standardRate: 21, taxName: 'IVA', currency: 'ARS', region: 'LATAM' },
    provinces: [
      { code: 'BA', name: 'Buenos Aires',
        cities: [
          { code: 'BUENOS', name: 'Buenos Aires' },
          { code: 'LA', name: 'La Plata' },
          { code: 'MAR', name: 'Mar del Plata' },
          { code: 'BAHIA', name: 'Bahia Blanca' },
          { code: 'TANDIL', name: 'Tandil' },
          { code: 'AZUL', name: 'Azul' },
          { code: 'JUNIN', name: 'Junin' },
          { code: 'PERGAMINO', name: 'Pergamino' },
          { code: 'SAN', name: 'San Antonio de Areco' },
          { code: 'LUJAN', name: 'Lujan' }
        ]
      },
      { code: 'CF', name: 'Capital Federal',
        cities: [
          { code: 'BUENOS2', name: 'Buenos Aires' },
          { code: 'PALERMO', name: 'Palermo' },
          { code: 'RECOLETA', name: 'Recoleta' },
          { code: 'BELGRANO', name: 'Belgrano' },
          { code: 'SAN', name: 'San Telmo' },
          { code: 'LA', name: 'La Boca' },
          { code: 'PUERTO', name: 'Puerto Madero' },
          { code: 'CONGRESO', name: 'Congreso' },
          { code: 'ABASTO', name: 'Abasto' },
          { code: 'CABALLITO', name: 'Caballito' }
        ]
      },
      { code: 'CA', name: 'Catamarca',
        cities: [
          { code: 'CATAMARCA', name: 'San Fernando del Valle de Catamarca' },
          { code: 'TINOGASTA', name: 'Tinogasta' },
          { code: 'BELLA', name: 'Bella Vista' },
          { code: 'SANTA', name: 'Santa Maria' },
          { code: 'ANDALGALA', name: 'Andalgala' },
          { code: 'VALLE', name: 'Valle Viejo' },
          { code: 'FRAY', name: 'Fray Mamerto Esquiu' },
          { code: 'PAJAN', name: 'Pajan' },
          { code: 'CAPAYAN', name: 'Capayan' },
          { code: 'EL', name: 'El Alto' }
        ]
      },
      { code: 'CH', name: 'Chaco',
        cities: [
          { code: 'RESISTENCIA', name: 'Resistencia' },
          { code: 'CHARATA', name: 'Charata' },
          { code: 'GENERAL', name: 'General Pinasco' },
          { code: 'VILLA', name: 'Villa Angela' },
          { code: 'PRESIDENTE', name: 'Presidente Roque Saenz Pena' },
          { code: 'BARRANQUERAS', name: 'Barranqueras' },
          { code: 'EL', name: 'El Sauzal' },
          { code: 'MACHAGAI', name: 'Machagai' },
          { code: 'COLONIA', name: 'Colonias Unidas' },
          { code: 'TRES', name: 'Tres Isletas' }
        ]
      },
      { code: 'CT', name: 'Chubut',
        cities: [
          { code: 'RAWSON', name: 'Rawson' },
          { code: 'COMODORO', name: 'Comodoro Rivadavia' },
          { code: 'PUERTO', name: 'Puerto Madryn' },
          { code: 'TRELEW', name: 'Trelew' },
          { code: 'ESQUEL', name: 'Esquel' },
          { code: 'SARMIENTO', name: 'Sarmiento' },
          { code: 'RIO', name: 'Rio Gallegos' },
          { code: 'EL', name: 'El Calafate' },
          { code: 'CALETA', name: 'Caleta Olivia' },
          { code: 'PERITO', name: 'Perito Moreno' }
        ]
      },
      { code: 'CB', name: 'Cordoba',
        cities: [
          { code: 'CORDOBA', name: 'Cordoba' },
          { code: 'VILLA', name: 'Villa Maria' },
          { code: 'RIO', name: 'Rio Cuarto' },
          { code: 'JESUS', name: 'Jesus Maria' },
          { code: 'SAN', name: 'San Francisco' },
          { code: 'LA', name: 'La Falda' },
          { code: 'MENDIOLAZA', name: 'Mendiolaza' },
          { code: 'ALTA', name: 'Alta Gracia' },
          { code: 'MORRO', name: 'Morro' },
          { code: 'VILLA2', name: 'Villa Carlos Paz' }
        ]
      },
      { code: 'CN', name: 'Corrientes',
        cities: [
          { code: 'CORRIENTES', name: 'Corrientes' },
          { code: 'GOYA', name: 'Goya' },
          { code: 'PASO', name: 'Paso de los Libres' },
          { code: 'CONCEPCION', name: 'Concepcion' },
          { code: 'MONTE', name: 'Monte Caseros' },
          { code: 'CURUZU', name: 'Curuzu Cuatia' },
          { code: 'SANTO', name: 'Santo Tome' },
          { code: 'BELLA', name: 'Bella Vista' },
          { code: 'ITATI', name: 'Itati' },
          { code: 'MERCEDES', name: 'Mercedes' }
        ]
      },
      { code: 'ER', name: 'Entre Rios',
        cities: [
          { code: 'PARANA', name: 'Parana' },
          { code: 'CONCEPCION', name: 'Concepcion del Uruguay' },
          { code: 'GUIALEGAYCHU', name: 'Gualeguaychu' },
          { code: 'CONCORDIA', name: 'Concordia' },
          { code: 'VILLA', name: 'Villa Elisa' },
          { code: 'CHAJARI', name: 'Chajari' },
          { code: 'FEDERACION', name: 'Federacion' },
          { code: 'NUEVA', name: 'Nueva Palmira' },
          { code: 'VICTORIA', name: 'Victoria' },
          { code: 'COLON', name: 'Colon' }
        ]
      },
      { code: 'FO', name: 'Formosa',
        cities: [
          { code: 'FORMOSA', name: 'Formosa' },
          { code: 'CLORINDA', name: 'Clorinda' },
          { code: 'PILAR', name: 'Pilar' },
          { code: 'RESISTENCIA', name: 'Resistencia' },
          { code: 'EL', name: 'El Colorado' },
          { code: 'GENERAL', name: 'General Enrique Mosconi' },
          { code: 'SAN', name: 'San Martin' },
          { code: 'LAS', name: 'Las Lomitas' },
          { code: 'BUEN', name: 'Buenos Aires' },
          { code: 'PRESIDENTE', name: 'Presidente Roque Saenz Pena' }
        ]
      },
      { code: 'JY', name: 'Jujuy',
        cities: [
          { code: 'JUJUY', name: 'San Salvador de Jujuy' },
          { code: 'PALPALA', name: 'Palpala' },
          { code: 'PERICO', name: 'Perico' },
          { code: 'SAN', name: 'San Pedro' },
          { code: 'LIBERTADOR', name: 'Libertador General San Martin' },
          { code: 'EL', name: 'El Carmen' },
          { code: 'SUSQUES', name: 'Susques' },
          { code: 'TILCARA', name: 'Tilcara' },
          { code: 'HUMAHUACA', name: 'Humahuaca' },
          { code: 'YAVI', name: 'Yavi' }
        ]
      },
      { code: 'LP', name: 'La Pampa',
        cities: [
          { code: 'SANTA', name: 'Santa Rosa' },
          { code: 'GENERAL', name: 'General Pico' },
          { code: 'TOAY', name: 'Toay' },
          { code: 'QUINTO', name: 'Quinto' },
          { code: 'REALICO', name: 'Realico' },
          { code: 'ATAMISQUI', name: 'Atamisqui' },
          { code: 'EDUARDO', name: 'Eduardo Castex' },
          { code: 'INTendente', name: 'Intendente Alvear' },
          { code: 'VICTORICA', name: 'Victorica' },
          { code: 'TRENEL', name: 'Trenel' }
        ]
      },
      { code: 'LR', name: 'La Rioja',
        cities: [
          { code: 'RIOJA', name: 'La Rioja' },
          { code: 'CHILECITO', name: 'Chilecito' },
          { code: 'FAMATINA', name: 'Famatina' },
          { code: 'NONOGASTA', name: 'Nonogasta' },
          { code: 'VILLA', name: 'Villa Union' },
          { code: 'PAGANZAS', name: 'Paganzas' },
          { code: 'CHAMICAL', name: 'Chamical' },
          { code: 'CHEPES', name: 'Chepes' },
          { code: 'CORONEL', name: 'Coronel Felipe Varela' },
          { code: 'CASTRO', name: 'Castro Barros' }
        ]
      },
      { code: 'MZ', name: 'Mendoza',
        cities: [
          { code: 'MENDOZA', name: 'Mendoza' },
          { code: 'GODOY', name: 'Godoy Cruz' },
          { code: 'MAIPU', name: 'Maipu' },
          { code: 'LAS', name: 'Las Heras' },
          { code: 'SAN', name: 'San Martin' },
          { code: 'GUAYMALLEN', name: 'Guaymallen' },
          { code: 'LUJAN', name: 'Lujan de Cuyo' },
          { code: 'TUNUYAN', name: 'Tunuyan' },
          { code: 'SAN2', name: 'San Rafael' },
          { code: 'MALARGUE', name: 'Malargue' }
        ]
      },
      { code: 'MN', name: 'Misiones',
        cities: [
          { code: 'POSADAS', name: 'Posadas' },
          { code: 'PUERTO', name: 'Puerto Iguazu' },
          { code: 'Eldorado', name: 'Eldorado' },
          { code: 'APÓSTOLES', name: 'Apóstoles' },
          { code: 'SAN', name: 'San Pedro' },
          { code: 'CAMPO', name: 'Campo Ramon' },
          { code: 'CORRIENTES', name: 'Corrientes' },
          { code: 'CONCEPCION', name: 'Concepcion' },
          { code: 'GENERAL', name: 'General Alvear' },
          { code: 'VEINTICINCO', name: 'Veinticinco de Mayo' }
        ]
      },
      { code: 'NQ', name: 'Neuquen',
        cities: [
          { code: 'NEUQUEN', name: 'Neuquen' },
          { code: 'CIPOLLETTI', name: 'Cipolletti' },
          { code: 'PLOTTIER', name: 'Plottier' },
          { code: 'ZAPALA', name: 'Zapala' },
          { code: 'CHOS', name: 'Chos Malal' },
          { code: 'VILLA', name: 'Villa La Angostura' },
          { code: 'SAN', name: 'San Martin de los Andes' },
          { code: 'JUNIN', name: 'Junin de los Andes' },
          { code: 'PICUN', name: 'Picun Leufu' },
          { code: 'ALUMINE', name: 'Alumine' }
        ]
      },
      { code: 'RN', name: 'Rio Negro',
        cities: [
          { code: 'VIEDMA', name: 'Viedma' },
          { code: 'BARILOCHE', name: 'Bariloche' },
          { code: 'GENERAL', name: 'General Roca' },
          { code: 'CINCO', name: 'Cinco Saltos' },
          { code: 'ALLEN', name: 'Allen' },
          { code: 'SAN', name: 'San Antonio Oeste' },
          { code: 'VILLA', name: 'Villa Regina' },
          { code: 'CHOELE', name: 'Choele Choel' },
          { code: 'LONCOPUE', name: 'Loncopue' },
          { code: 'MAQUINCHAO', name: 'Maquinchao' }
        ]
      },
      { code: 'SA', name: 'Salta',
        cities: [
          { code: 'SALTA', name: 'Salta' },
          { code: 'SAN', name: 'San Ramon de la Nueva Oran' },
          { code: 'TARTAGAL', name: 'Tartagal' },
          { code: 'JOSE', name: 'San Jose de Metan' },
          { code: 'ROSARIO', name: 'Rosario de la Frontera' },
          { code: 'CAFAYATE', name: 'Cafayate' },
          { code: 'MOLINOS', name: 'Molinos' },
          { code: 'CACHI', name: 'Cachi' },
          { code: 'IRUYA', name: 'Iruya' },
          { code: 'SANTA', name: 'Santa Victoria' }
        ]
      },
      { code: 'SJ', name: 'San Juan',
        cities: [
          { code: 'SAN', name: 'San Juan' },
          { code: 'RAWSON', name: 'Rawson' },
          { code: 'CHIMBAS', name: 'Chimbas' },
          { code: 'SANTA', name: 'Santa Lucia' },
          { code: 'CAUCETE', name: 'Caucete' },
          { code: 'VEINTICINCO', name: 'Veinticinco de Mayo' },
          { code: 'CALINGASTA', name: 'Calingasta' },
          { code: 'JACHAL', name: 'Jachal' },
          { code: 'VALLE', name: 'Valle Fertil' },
          { code: 'ZONDA', name: 'Zonda' }
        ]
      },
      { code: 'SL', name: 'San Luis',
        cities: [
          { code: 'SAN', name: 'San Luis' },
          { code: 'VILLA', name: 'Villa Mercedes' },
          { code: 'MERCEDES', name: 'Mercedes' },
          { code: 'CONCARAN', name: 'Concaran' },
          { code: 'LA', name: 'La Punta' },
          { code: 'QUINES', name: 'Quines' },
          { code: 'NUEVA', name: 'Nueva Galia' },
          { code: 'TILISARAO', name: 'Tilisarao' },
          { code: 'SAN', name: 'San Francisco' },
          { code: 'JUAN', name: 'Juan Pujol' }
        ]
      },
      { code: 'SC', name: 'Santa Cruz',
        cities: [
          { code: 'RIO', name: 'Rio Gallegos' },
          { code: 'CALETA', name: 'Caleta Olivia' },
          { code: 'EL', name: 'El Calafate' },
          { code: 'PUERTO', name: 'Puerto Deseado' },
          { code: 'COMODORO', name: 'Comodoro Rivadavia' },
          { code: 'PUNTA', name: 'Punta Arenas' },
          { code: 'PERITO', name: 'Perito Moreno' },
          { code: 'LOS', name: 'Los Antiguos' },
          { code: 'GOBIERNO', name: 'Gobernador Gregores' },
          { code: 'FITZ', name: 'Fitz Roy' }
        ]
      },
      { code: 'SF', name: 'Santa Fe',
        cities: [
          { code: 'SANTA', name: 'Santa Fe' },
          { code: 'ROSARIO', name: 'Rosario' },
          { code: 'RAFAELA', name: 'Rafaela' },
          { code: 'VENADO', name: 'Venado Tuerto' },
          { code: 'RECONQUISTA', name: 'Reconquista' },
          { code: 'SANTO', name: 'Santo Tome' },
          { code: 'SAN', name: 'San Lorenzo' },
          { code: 'ESPERANZA', name: 'Esperanza' },
          { code: 'GALVEZ', name: 'Galvez' },
          { code: 'SOLDINI', name: 'Soldini' }
        ]
      },
      { code: 'SE', name: 'Santiago del Estero',
        cities: [
          { code: 'SANTIAGO', name: 'Santiago del Estero' },
          { code: 'FRAY', name: 'Fray Mamerto Esquiu' },
          { code: 'LA', name: 'La Banda' },
          { code: 'TERMAS', name: 'Termas de Rio Hondo' },
          { code: 'AÑATUYA', name: 'Añatuya' },
          { code: 'QUIMILI', name: 'Quimili' },
          { code: 'BANDA', name: 'Banda' },
          { code: 'FIGUEROA', name: 'Figueroa' },
          { code: 'ROBLES', name: 'Robles' },
          { code: 'SANTIAGO2', name: 'Santiago del Estero' }
        ]
      },
      { code: 'TF', name: 'Tierra del Fuego',
        cities: [
          { code: 'USHUAIA', name: 'Ushuaia' },
          { code: 'RIO', name: 'Rio Grande' },
          { code: 'TOLHUIN', name: 'Tolhuin' },
          { code: 'ISLA', name: 'Isla de los Estados' },
          { code: 'CANAL', name: 'Canal Beagle' },
          { code: 'CABO', name: 'Cabo San Pablo' },
          { code: 'LAGO', name: 'Lago Fagnano' },
          { code: 'GLACIAR', name: 'Glaciar Martial' },
          { code: 'FIN', name: 'Fin del Mundo' },
          { code: 'ANTARTIDA', name: 'Antartida Argentina' }
        ]
      },
      { code: 'TU', name: 'Tucuman',
        cities: [
          { code: 'TUCUMAN', name: 'San Miguel de Tucuman' },
          { code: 'YERBA', name: 'Yerba Buena' },
          { code: 'CONCEPCION', name: 'Concepcion' },
          { code: 'SIMOCA', name: 'Simoca' },
          { code: 'FAMAILLA', name: 'Famailla' },
          { code: 'MONTEROS', name: 'Monteros' },
          { code: 'TAFI', name: 'Tafi Viejo' },
          { code: 'AGUILARES', name: 'Aguilares' },
          { code: 'BANDA', name: 'Banda del Rio Sali' },
          { code: 'ALDERETES', name: 'Alderetes' }
        ]
      }
    ]
};

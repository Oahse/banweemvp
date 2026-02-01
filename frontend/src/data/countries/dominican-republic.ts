/**
 * Dominican Republic country data with provinces, national district, and cities
 */

import { Country } from './index';

export const dominicanrepublic: Country = {
  code: 'DO',
  name: 'Dominican Republic',
  flag: '🇩🇴',
  capital: 'Santo Domingo',
  area: 48671,
  currencySymbol: '$',
  officialLanguages: ['Spanish'],
  demonym: 'Dominican',
  taxInfo: { standardRate: 18, taxName: 'ITBIS', currency: 'DOP', region: 'NA' },
  divisions: [
    { code: 'DN', name: 'Distrito Nacional', type: 'national district',
      cities: [
        { code: 'SD', name: 'Santo Domingo' },
        { code: 'SDN', name: 'Santo Domingo Norte' },
        { code: 'SDE', name: 'Santo Domingo Este' },
        { code: 'SDO', name: 'Santo Domingo Oeste' }
      ]
    },
    { code: 'AZ', name: 'Azua', type: 'province',
      cities: [
        { code: 'AZU', name: 'Azua' },
        { code: 'EST', name: 'Estebanía' },
        { code: 'GUI', name: 'Guayubín' },
        { code: 'LAS', name: 'Las Yayas de Viajama' },
        { code: 'PAD', name: 'Padre Las Casas' },
        { code: 'PER', name: 'Peravia' },
        { code: 'PUE', name: 'Pueblo Viejo' },
        { code: 'SAB', name: 'Sabana Yegua' },
        { code: 'TAM', name: 'Tamasino' }
      ]
    },
    { code: 'BA', name: 'Bahoruco', type: 'province',
      cities: [
        { code: 'NEI', name: 'Neiba' },
        { code: 'GAL', name: 'Galván' },
        { code: 'LOS', name: 'Los Ríos' },
        { code: 'VIL', name: 'Villa Jaragua' }
      ]
    },
    { code: 'BA2', name: 'Barahona', type: 'province',
      cities: [
        { code: 'BAR', name: 'Barahona' },
        { code: 'BAN', name: 'Bánica' },
        { code: 'CAB', name: 'Cabrera' },
        { code: 'FUE', name: 'Fuentesimal' },
        { code: 'JAI', name: 'Jaquimeyes' },
        { code: 'LAH', name: 'La Ciénaga' },
        { code: 'MAL', name: 'Malpaso' },
        { code: 'PAR', name: 'Paraíso' },
        { code: 'PED', name: 'Pedro Corto' },
        { code: 'POO', name: 'Polo' },
        { code: 'RIO', name: 'Río Limpio' }
      ]
    },
    { code: 'DA', name: 'Dajabón', type: 'province',
      cities: [
        { code: 'DAJ', name: 'Dajabón' },
        { code: 'CAP', name: 'Capotillo' },
        { code: 'EL', name: 'El Pino' },
        { code: 'LAV', name: 'Loma de Cabrera' },
        { code: 'PAR', name: 'Partido' },
        { code: 'RES', name: 'Restauración' }
      ]
    },
    { code: 'DU', name: 'Duarte', type: 'province',
      cities: [
        { code: 'SFM', name: 'San Francisco de Macorís' },
        { code: 'ARE', name: 'Arenoso' },
        { code: 'CAS', name: 'Castillo' },
        { code: 'CUE', name: 'Cevicos' },
        { code: 'EAT', name: 'EAT' },
        { code: 'LAS', name: 'Las Guáranas' },
        { code: 'VIL', name: 'Villa Riva' }
      ]
    },
    { code: 'EL', name: 'Elías Piña', type: 'province',
      cities: [
        { code: 'COM', name: 'Comendador' },
        { code: 'BAN', name: 'Banica' },
        { code: 'CER', name: 'Cerca La Source' },
        { code: 'HON', name: 'Hondo Valle' },
        { code: 'JUA', name: 'Juan Santiago' },
        { code: 'PED', name: 'Pedro Santana' },
        { code: 'RIO', name: 'Río Limpio' }
      ]
    },
    { code: 'EL2', name: 'El Seibo', type: 'province',
      cities: [
        { code: 'ELS', name: 'El Seibo' },
        { code: 'MIC', name: 'Miches' },
        { code: 'PED', name: 'Pedro Sánchez' },
        { code: 'SAN', name: 'Santa Cruz de El Seibo' }
      ]
    },
    { code: 'ES', name: 'Espaillat', type: 'province',
      cities: [
        { code: 'MOCA', name: 'Moca' },
        { code: 'CAB', name: 'Cabrera' },
        { code: 'CAY', name: 'Cayetano Germosén' },
        { code: 'GAS', name: 'Gaspar Hernández' },
        { code: 'JAM', name: 'Jamoa' },
        { code: 'VER', name: 'Veragua' }
      ]
    },
    { code: 'HA', name: 'Hato Mayor', type: 'province',
      cities: [
        { code: 'HMA', name: 'Hato Mayor del Rey' },
        { code: 'EL', name: 'El Valle' },
        { code: 'GUA', name: 'Guarabo' },
        { code: 'LAG', name: 'Laguna Salada' },
        { code: 'SAV', name: 'Sabana de la Mar' }
      ]
    },
    { code: 'IN', name: 'Independencia', type: 'province',
      cities: [
        { code: 'JIM', name: 'Jimaní' },
        { code: 'CRU', name: 'Cristóbal' },
        { code: 'DUAR', name: 'Duvergé' },
        { code: 'MAL', name: 'Mella' },
        { code: 'POI', name: 'Postrer Río' }
      ]
    },
    { code: 'LA', name: 'La Altagracia', type: 'province',
      cities: [
        { code: 'HIG', name: 'Higüey' },
        { code: 'SAN', name: 'San Rafael del Yuma' },
        { code: 'BAY', name: 'Bayahibe' },
        { code: 'BOC', name: 'Boca de Yuma' },
        { code: 'NIS', name: 'Nisibón' },
        { code: 'OBO', name: 'Otra Banda' },
        { code: 'PUN', name: 'Punta Cana' },
        { code: 'SAV', name: 'Salvaleón de Higüey' }
      ]
    },
    { code: 'LA2', name: 'La Romana', type: 'province',
      cities: [
        { code: 'LAR', name: 'La Romana' },
        { code: 'GUA', name: 'Guaymate' },
        { code: 'VIL', name: 'Villa Hermosa' },
        { code: 'ALT', name: 'Altos de Chavón' }
      ]
    },
    { code: 'LA3', name: 'La Vega', type: 'province',
      cities: [
        { code: 'LAV', name: 'La Vega' },
        { code: 'CON', name: 'Concepción de La Vega' },
        { code: 'JAR', name: 'Jarabacoa' },
        { code: 'TIE', name: 'Tireo' },
        { code: 'RIN', name: 'Rincón' }
      ]
    },
    { code: 'MA', name: 'María Trinidad Sánchez', type: 'province',
      cities: [
        { code: 'NAG', name: 'Nagua' },
        { code: 'CAB', name: 'Cabrera' },
        { code: 'EL', name: 'El Factor' },
        { code: 'GAS', name: 'Gaspar Hernández' },
        { code: 'RIO', name: 'Río San Juan' }
      ]
    },
    { code: 'MO', name: 'Monseñor Nouel', type: 'province',
      cities: [
        { code: 'BON', name: 'Bonao' },
        { code: 'MAI', name: 'Maimón' },
        { code: 'PIR', name: 'Piragua' },
        { code: 'YAM', name: 'Yamasá' }
      ]
    },
    { code: 'MO2', name: 'Monte Cristi', type: 'province',
      cities: [
        { code: 'MON', name: 'Monte Cristi' },
        { code: 'CAN', name: 'Cana Chapetón' },
        { code: 'CAST', name: 'Castillo' },
        { code: 'GUA', name: 'Guayubín' },
        { code: 'LAS', name: 'Las Matas de Santa Cruz' },
        { code: 'PEP', name: 'Pepillo Salcedo' },
        { code: 'VIL', name: 'Villa Vásquez' }
      ]
    },
    { code: 'MO3', name: 'Monte Plata', type: 'province',
      cities: [
        { code: 'MON', name: 'Monte Plata' },
        { code: 'BAY', name: 'Bayaguana' },
        { code: 'DON', name: 'Don Juan' },
        { code: 'PIR', name: 'Peralvillo' },
        { code: 'YAM', name: 'Yamasá' }
      ]
    },
    { code: 'PA', name: 'Pedernales', type: 'province',
      cities: [
        { code: 'PED', name: 'Pedernales' },
        { code: 'OVI', name: 'Oviedo' },
        { code: 'JUA', name: 'Juancho' }
      ]
    },
    { code: 'PE', name: 'Peravia', type: 'province',
      cities: [
        { code: 'BAN', name: 'Baní' },
        { code: 'MAT', name: 'Matanzas' },
        { code: 'NIZ', name: 'Nizao' },
        { code: 'PAY', name: 'Payita' },
        { code: 'SAB', name: 'Sabana Buey' },
        { code: 'VIL', name: 'Villa Fundación' }
      ]
    },
    { code: 'PU', name: 'Puerto Plata', type: 'province',
      cities: [
        { code: 'PUR', name: 'Puerto Plata' },
        { code: 'ALT', name: 'Altamira' },
        { code: 'GUA', name: 'Guananico' },
        { code: 'IM', name: 'Imbert' },
        { code: 'LOS', name: 'Los Hidalgos' },
        { code: 'LUP', name: 'Luperón' },
        { code: 'SOS', name: 'Sosúa' },
        { code: 'VIL', name: 'Villa Isabela' }
      ]
    },
    { code: 'SA', name: 'Samaná', type: 'province',
      cities: [
        { code: 'SAM', name: 'Samaná' },
        { code: 'LAS', name: 'Las Terrenas' },
        { code: 'SAL', name: 'Salinas' },
        { code: 'SAB', name: 'Sabana de la Mar' }
      ]
    },
    { code: 'SC', name: 'Sánchez Ramírez', type: 'province',
      cities: [
        { code: 'COT', name: 'Cotuí' },
        { code: 'CEV', name: 'Cevicos' },
        { code: 'FAN', name: 'Fantino' },
        { code: 'LAA', name: 'La Bajada' },
        { code: 'LAV', name: 'La Cueva' },
        { code: 'ZAN', name: 'Zanjon' }
      ]
    },
    { code: 'SC2', name: 'Santiago', type: 'province',
      cities: [
        { code: 'SAN', name: 'Santiago de los Caballeros' },
        { code: 'BAN', name: 'Baitoa' },
        { code: 'CAN', name: 'Cánovas' },
        { code: 'JAM', name: 'Jánico' },
        { code: 'LJA', name: 'Licey al Medio' },
        { code: 'PUN', name: 'Punal' },
        { code: 'TAM', name: 'Tamboril' },
        { code: 'VIL', name: 'Villa Bisonó' }
      ]
    },
    { code: 'SC3', name: 'Santiago Rodríguez', type: 'province',
      cities: [
        { code: 'SAB', name: 'Sabaneta' },
        { code: 'MON', name: 'Monción' },
        { code: 'SAN', name: 'San Ignacio de Sabaneta' },
        { code: 'VIL', name: 'Villa Los Almácigos' }
      ]
    },
    { code: 'SC4', name: 'Santo Domingo', type: 'province',
      cities: [
        { code: 'SDS', name: 'Santo Domingo Este' },
        { code: 'SDN', name: 'Santo Domingo Norte' },
        { code: 'SDO', name: 'Santo Domingo Oeste' },
        { code: 'SAN', name: 'San Antonio de Guerra' },
        { code: 'LOS', name: 'Los Alcarrizos' },
        { code: 'PED', name: 'Pedro Brand' },
        { code: 'YAG', name: 'Yaguate' }
      ]
    },
    { code: 'SC5', name: 'San Cristóbal', type: 'province',
      cities: [
        { code: 'SCR', name: 'San Cristóbal' },
        { code: 'BAI', name: 'Bajos de Haina' },
        { code: 'CAM', name: 'Cambita Garabitos' },
        { code: 'YAG', name: 'Yaguate' },
        { code: 'VIL', name: 'Villa Altagracia' }
      ]
    },
    { code: 'SC6', name: 'San José de Ocoa', type: 'province',
      cities: [
        { code: 'SJO', name: 'San José de Ocoa' },
        { code: 'RAN', name: 'Rancho Arriba' },
        { code: 'SAB', name: 'Sabana Larga' },
        { code: 'VAL', name: 'Valdesia' }
      ]
    },
    { code: 'SC7', name: 'San Juan', type: 'province',
      cities: [
        { code: 'SJU', name: 'San Juan de la Maguana' },
        { code: 'BOH', name: 'Bohechío' },
        { code: 'EL', name: 'El Cercado' },
        { code: 'JUA', name: 'Juan de Herrera' },
        { code: 'LAS', name: 'Las Matas de Farfán' },
        { code: 'PED', name: 'Pedro Corto' },
        { code: 'SAB', name: 'Sabaneta' }
      ]
    },
    { code: 'SC8', name: 'San Pedro de Macorís', type: 'province',
      cities: [
        { code: 'SPM', name: 'San Pedro de Macorís' },
        { code: 'CON', name: 'Consuelo' },
        { code: 'GUA', name: 'Guerra' },
        { code: 'QUI', name: 'Quisqueya' },
        { code: 'RAM', name: 'Ramón Santana' }
      ]
    },
    { code: 'SC9', name: 'Sánchez Ramírez', type: 'province',
      cities: [
        { code: 'COT', name: 'Cotuí' },
        { code: 'CEV', name: 'Cevicos' },
        { code: 'FAN', name: 'Fantino' },
        { code: 'LAA', name: 'La Bajada' },
        { code: 'LAV', name: 'La Cueva' },
        { code: 'ZAN', name: 'Zanjon' }
      ]
    },
    { code: 'SC10', name: 'Santiago', type: 'province',
      cities: [
        { code: 'SAN', name: 'Santiago de los Caballeros' },
        { code: 'BAN', name: 'Baitoa' },
        { code: 'CAN', name: 'Cánovas' },
        { code: 'JAM', name: 'Jánico' },
        { code: 'LJA', name: 'Licey al Medio' },
        { code: 'PUN', name: 'Punal' },
        { code: 'TAM', name: 'Tamboril' },
        { code: 'VIL', name: 'Villa Bisonó' }
      ]
    },
    { code: 'SC11', name: 'Santiago Rodríguez', type: 'province',
      cities: [
        { code: 'SAB', name: 'Sabaneta' },
        { code: 'MON', name: 'Monción' },
        { code: 'SAN', name: 'San Ignacio de Sabaneta' },
        { code: 'VIL', name: 'Villa Los Almácigos' }
      ]
    },
    { code: 'SC12', name: 'Santo Domingo', type: 'province',
      cities: [
        { code: 'SDS', name: 'Santo Domingo Este' },
        { code: 'SDN', name: 'Santo Domingo Norte' },
        { code: 'SDO', name: 'Santo Domingo Oeste' },
        { code: 'SAN', name: 'San Antonio de Guerra' },
        { code: 'LOS', name: 'Los Alcarrizos' },
        { code: 'PED', name: 'Pedro Brand' },
        { code: 'YAG', name: 'Yaguate' }
      ]
    },
    { code: 'VA', name: 'Valverde', type: 'province',
      cities: [
        { code: 'MAO', name: 'Mao' },
        { code: 'ES', name: 'Esperanza' },
        { code: 'LAG', name: 'Laguna Salada' },
        { code: 'RIP', name: 'Río Verde' }
      ]
    }
  ]
};

export default dominicanrepublic;

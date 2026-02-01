/**
 * Chile country data with regions, cities, and tax information
 */

import { Country } from './index';

export const chile: Country = {
    code: 'CL',
    name: 'Chile',
    taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'CLP', region: 'LATAM' },
    provinces: [
      { code: 'RM', name: 'Metropolitan Region',
        cities: [
          { code: 'SANTIAGO', name: 'Santiago' },
          { code: 'VALPARAISO', name: 'Valparaiso' },
          { code: 'CONCEPCION', name: 'Concepcion' },
          { code: 'LA', name: 'La Serena' },
          { code: 'ANTOFAGASTA', name: 'Antofagasta' },
          { code: 'TEMUCO', name: 'Temuco' },
          { code: 'RANCAGUA', name: 'Rancagua' },
          { code: 'TALCA', name: 'Talca' },
          { code: 'ARICA', name: 'Arica' },
          { code: 'CHILLAN', name: 'Chillan' }
        ]
      },
      { code: 'XV', name: 'Arica and Parinacota',
        cities: [
          { code: 'ARICA', name: 'Arica' },
          { code: 'PUTRE', name: 'Putre' },
          { code: 'GENERAL', name: 'General Lagos' },
          { code: 'CAMARONES', name: 'Camarones' },
          { code: 'PACHICA', name: 'Pachica' },
          { code: 'CERRO', name: 'Cerro Colorado' },
          { code: 'POCONCHILE', name: 'Poconchile' },
          { code: 'SOCOROMA', name: 'Socoroma' },
          { code: 'BELLEN', name: 'Bellen' },
          { code: 'VISVIRI', name: 'Visviri' }
        ]
      },
      { code: 'I', name: 'Tarapaca',
        cities: [
          { code: 'IQUIQUE', name: 'Iquique' },
          { code: 'ALTO', name: 'Alto Hospicio' },
          { code: 'POZO', name: 'Pozo Almonte' },
          { code: 'HUARA', name: 'Huara' },
          { code: 'PICA', name: 'Pica' },
          { code: 'COLCHANE', name: 'Colchane' },
          { code: 'CAMIÑA', name: 'Camiña' },
          { code: 'PISAGUA', name: 'Pisagua' },
          { code: 'HUARA2', name: 'Huara' },
          { code: 'PICA2', name: 'Pica' }
        ]
      },
      { code: 'II', name: 'Antofagasta',
        cities: [
          { code: 'ANTOFAGASTA', name: 'Antofagasta' },
          { code: 'CALAMA', name: 'Calama' },
          { code: 'TOCOPILLA', name: 'Tocopilla' },
          { code: 'MEJILLONES', name: 'Mejillones' },
          { code: 'SIERRA', name: 'Sierra Gorda' },
          { code: 'TALTAL', name: 'Taltal' },
          { code: 'MARIA', name: 'Maria Elena' },
          { code: 'PEDRO', name: 'Pedro de Valdivia' },
          { code: 'ANTOFAGASTA2', name: 'Antofagasta' },
          { code: 'CALAMA2', name: 'Calama' }
        ]
      },
      { code: 'III', name: 'Atacama',
        cities: [
          { code: 'COPIAPO', name: 'Copiapo' },
          { code: 'VALLENAR', name: 'Vallenar' },
          { code: 'CHAÑARAL', name: 'Chañaral' },
          { code: 'CALDERA', name: 'Caldera' },
          { code: 'DIEGO', name: 'Diego de Almagro' },
          { code: 'EL', name: 'El Salvador' },
          { code: 'TIERRA', name: 'Tierra Amarilla' },
          { code: 'ALTO', name: 'Alto del Carmen' },
          { code: 'Vallenar2', name: 'Vallenar' },
          { code: 'COPIAPO2', name: 'Copiapo' }
        ]
      },
      { code: 'IV', name: 'Coquimbo',
        cities: [
          { code: 'LA', name: 'La Serena' },
          { code: 'COQUIMBO', name: 'Coquimbo' },
          { code: 'VALPARAISO', name: 'Valparaiso' },
          { code: 'OVALLE', name: 'Ovalle' },
          { code: 'ILLAPEL', name: 'Illapel' },
          { code: 'ANDACOLLO', name: 'Andacollo' },
          { code: 'VICUÑA', name: 'Vicuña' },
          { code: 'COMBARBALA', name: 'Combarbala' },
          { code: 'PAIHUANO', name: 'Paihuano' },
          { code: 'MONTE', name: 'Monte Patria' }
        ]
      },
      { code: 'V', name: 'Valparaiso',
        cities: [
          { code: 'VALPARAISO', name: 'Valparaiso' },
          { code: 'VIÑA', name: 'Viña del Mar' },
          { code: 'QUILPUE', name: 'Quilpue' },
          { code: 'VILLA', name: 'Villa Alemana' },
          { code: 'QUILLOTA', name: 'Quillota' },
          { code: 'LA', name: 'La Calera' },
          { code: 'LOS', name: 'Los Andes' },
          { code: 'SAN', name: 'San Felipe' },
          { code: 'PETORCA', name: 'Petorca' },
          { code: 'PAPUDO', name: 'Papudo' }
        ]
      },
      { code: 'VI', name: "O'Higgins",
        cities: [
          { code: 'RANCAGUA', name: 'Rancagua' },
          { code: 'SAN', name: 'San Fernando' },
          { code: 'RANCAGUA2', name: 'Rancagua' },
          { code: 'MACHALI', name: 'Machali' },
          { code: 'GRANEROS', name: 'Graneros' },
          { code: 'CODEGUA', name: 'Codegua' },
          { code: 'MOSTAZAL', name: 'Mostazal' },
          { code: 'PEUMO', name: 'Peumo' },
          { code: 'COINCO', name: 'Coinco' },
          { code: 'COLTAUCO', name: 'Coltauco' }
        ]
      },
      { code: 'VII', name: 'Maule',
        cities: [
          { code: 'TALCA', name: 'Talca' },
          { code: 'LINARES', name: 'Linares' },
          { code: 'CURICO', name: 'Curico' },
          { code: 'CONSTITUCION', name: 'Constitucion' },
          { code: 'CAUQUENES', name: 'Cauquenes' },
          { code: 'PARRAL', name: 'Parral' },
          { code: 'SAN', name: 'San Javier' },
          { code: 'MOLINA', name: 'Molina' },
          { code: 'EMPEDRADO', name: 'Empedrado' },
          { code: 'ROMERAL', name: 'Romeral' }
        ]
      },
      { code: 'VIII', name: 'Biobio',
        cities: [
          { code: 'CONCEPCION', name: 'Concepcion' },
          { code: 'CHILLAN', name: 'Chillan' },
          { code: 'LOS', name: 'Los Angeles' },
          { code: 'TALCAHUANO', name: 'Talcahuano' },
          { code: 'TOME', name: 'Tome' },
          { code: 'CORONEL', name: 'Coronel' },
          { code: 'HUALQUI', name: 'Hualqui' },
          { code: 'LOTA', name: 'Lota' },
          { code: 'PENCO', name: 'Penco' },
          { code: 'SAN', name: 'San Pedro de la Paz' }
        ]
      },
      { code: 'IX', name: 'Araucania',
        cities: [
          { code: 'TEMUCO', name: 'Temuco' },
          { code: 'ANGOL', name: 'Angol' },
          { code: 'VILLARRICA', name: 'Villarrica' },
          { code: 'PUCON', name: 'Pucon' },
          { code: 'LONCOCHE', name: 'Loncoche' },
          { code: 'TRAIGUEN', name: 'Traiguen' },
          { code: 'VICTORIA', name: 'Victoria' },
          { code: 'CURACAUTIN', name: 'Curacautin' },
          { code: 'LONQUIMAY', name: 'Lonquimay' },
          { code: 'MELIPEUCO', name: 'Melipeuco' }
        ]
      },
      { code: 'XIV', name: 'Los Rios',
        cities: [
          { code: 'VALDIVIA', name: 'Valdivia' },
          { code: 'RIO', name: 'Rio Bueno' },
          { code: 'LA', name: 'La Union' },
          { code: 'PAILLACO', name: 'Paillaco' },
          { code: 'PANGUIPULLI', name: 'Panguipulli' },
          { code: 'FUTRONO', name: 'Futrono' },
          { code: 'CORRAL', name: 'Corral' },
          { code: 'LANCO', name: 'Lanco' },
          { code: 'MARIQUINA', name: 'Mariquina' },
          { code: 'LOS', name: 'Los Lagos' }
        ]
      },
      { code: 'X', name: 'Los Lagos',
        cities: [
          { code: 'PUERTO', name: 'Puerto Montt' },
          { code: 'OSORNO', name: 'Osorno' },
          { code: 'CASTRO', name: 'Castro' },
          { code: 'ANCUD', name: 'Ancud' },
          { code: 'PUERTO', name: 'Puerto Varas' },
          { code: 'FRESIA', name: 'Fresia' },
          { code: 'FRUTILLAR', name: 'Frutillar' },
          { code: 'LLANQUIHUE', name: 'Llanquihue' },
          { code: 'CALBUCO', name: 'Calbuco' },
          { code: 'MAULLIN', name: 'Maullin' }
        ]
      },
      { code: 'XI', name: 'Aysen',
        cities: [
          { code: 'COYHAIQUE', name: 'Coyhaique' },
          { code: 'PUERTO', name: 'Puerto Aysen' },
          { code: 'COCHRANE', name: 'Cochrane' },
          { code: 'CHILE', name: 'Chile Chico' },
          { code: 'RIO', name: 'Rio Ibanez' },
          { code: 'CISNES', name: 'Cisnes' },
          { code: 'LAGO', name: 'Lago Verde' },
          { code: 'TORTEL', name: 'Tortel' },
          { code: 'OHIGGINS', name: 'O Higgins' },
          { code: 'GENERAL', name: 'General Carrera' }
        ]
      },
      { code: 'XII', name: 'Magallanes',
        cities: [
          { code: 'PUNTA', name: 'Punta Arenas' },
          { code: 'PUERTO', name: 'Puerto Natales' },
          { code: 'PORVENIR', name: 'Porvenir' },
          { code: 'RIO', name: 'Rio Grande' },
          { code: 'NAVARINO', name: 'Navarino Island' },
          { code: 'ANTARTICA', name: 'Antartica Chilena' },
          { code: 'CABO', name: 'Cabo de Hornos' },
          { code: 'TIMAUCEL', name: 'Timaukel' },
          { code: 'LAGUNA', name: 'Laguna Blanca' },
          { code: 'SAN', name: 'San Gregorio' }
        ]
      }
    ]
};

/**
 * Spain country data with autonomous communities and cities
 */

import { Country } from './index';

export const spain: Country = {
  code: 'ES',
  name: 'Spain',
  flag: '🇪🇸',
  capital: 'Madrid',
  area: 505990,
  currencySymbol: '€',
  officialLanguages: ['Spanish', 'Catalan', 'Basque', 'Galician'],
  demonym: 'Spanish',
  taxInfo: { standardRate: 21, taxName: 'IVA', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'MD', name: 'Madrid', type: 'autonomous community',
      cities: [
        { code: 'MADRID', name: 'Madrid' },
        { code: 'MOSTOLES', name: 'Móstoles' },
        { code: 'ALCOBENDAS', name: 'Alcobendas' },
        { code: 'FUENLABRADA', name: 'Fuenlabrada' },
        { code: 'LEGANES', name: 'Leganés' }
      ]
    },
    { code: 'CT', name: 'Catalonia', type: 'autonomous community',
      cities: [
        { code: 'BARCELONA', name: 'Barcelona' },
        { code: 'HOSPITALET', name: 'L\'Hospitalet' },
        { code: 'BADALONA', name: 'Badalona' },
        { code: 'TERRASSA', name: 'Terrassa' },
        { code: 'SABADELL', name: 'Sabadell' }
      ]
    },
    { code: 'AN', name: 'Andalusia', type: 'autonomous community',
      cities: [
        { code: 'SEVILLA', name: 'Seville' },
        { code: 'MALAGA', name: 'Málaga' },
        { code: 'CORDOBA', name: 'Córdoba' },
        { code: 'GRANADA', name: 'Granada' },
        { code: 'JEREZ', name: 'Jerez de la Frontera' }
      ]
    },
    { code: 'PV', name: 'Valencian Community', type: 'autonomous community',
      cities: [
        { code: 'VALENCIA', name: 'Valencia' },
        { code: 'ALICANTE', name: 'Alicante' },
        { code: 'ELCHE', name: 'Elche' },
        { code: 'CASTELLON', name: 'Castellón' },
        { code: 'TORREVIEJA', name: 'Torrevieja' }
      ]
    },
    { code: 'GA', name: 'Galicia', type: 'autonomous community',
      cities: [
        { code: 'VIGO', name: 'Vigo' },
        { code: 'SANTIAGO', name: 'Santiago' },
        { code: 'A', name: 'A Coruña' },
        { code: 'LUGO', name: 'Lugo' },
        { code: 'ORENSE', name: 'Ourense' }
      ]
    },
    { code: 'BI', name: 'Basque Country', type: 'autonomous community',
      cities: [
        { code: 'BILBAO', name: 'Bilbao' },
        { code: 'VITORIA', name: 'Vitoria' },
        { code: 'SAN', name: 'San Sebastián' },
        { code: 'BARAKALDO', name: 'Barakaldo' },
        { code: 'GETXO', name: 'Getxo' }
      ]
    },
    { code: 'CL', name: 'Castile and León', type: 'autonomous community',
      cities: [
        { code: 'VALLADOLID', name: 'Valladolid' },
        { code: 'BURGOS', name: 'Burgos' },
        { code: 'LEON', name: 'León' },
        { code: 'SALAMANCA', name: 'Salamanca' },
        { code: 'PALENCIA', name: 'Palencia' }
      ]
    },
    { code: 'CM', name: 'Castile-La Mancha', type: 'autonomous community',
      cities: [
        { code: 'TOLEDO', name: 'Toledo' },
        { code: 'CIUDAD', name: 'Ciudad Real' },
        { code: 'ALBACETE', name: 'Albacete' },
        { code: 'GUADALAJARA', name: 'Guadalajara' },
        { code: 'CUENCA', name: 'Cuenca' }
      ]
    },
    { code: 'AR', name: 'Aragon', type: 'autonomous community',
      cities: [
        { code: 'ZARAGOZA', name: 'Zaragoza' },
        { code: 'HUESCA', name: 'Huesca' },
        { code: 'TERUEL', name: 'Teruel' },
        { code: 'JACA', name: 'Jaca' },
        { code: 'ALCANIZ', name: 'Alcañiz' }
      ]
    },
    { code: 'IB', name: 'Balearic Islands', type: 'autonomous community',
      cities: [
        { code: 'PALMA', name: 'Palma' },
        { code: 'IBIZA', name: 'Ibiza' },
        { code: 'MAHON', name: 'Mahón' },
        { code: 'MANACOR', name: 'Manacor' },
        { code: 'INCA', name: 'Inca' }
      ]
    },
    { code: 'RI', name: 'La Rioja', type: 'autonomous community',
      cities: [
        { code: 'LOGRONO', name: 'Logroño' },
        { code: 'CALAHORRA', name: 'Calahorra' },
        { code: 'ARNE', name: 'Arnedo' },
        { code: 'HARO', name: 'Haro' },
        { code: 'NAVARRETE', name: 'Navarrete' }
      ]
    },
    { code: 'NC', name: 'Navarre', type: 'autonomous community',
      cities: [
        { code: 'PAMPLONA', name: 'Pamplona' },
        { code: 'TUD', name: 'Tudela' },
        { code: 'BARAÑAIN', name: 'Barañáin' },
        { code: 'BURGOS', name: 'Burgos' },
        { code: 'BERGA', name: 'Bergara' }
      ]
    },
    { code: 'AS', name: 'Asturias', type: 'autonomous community',
      cities: [
        { code: 'OVIEDO', name: 'Oviedo' },
        { code: 'GIJON', name: 'Gijón' },
        { code: 'AVILES', name: 'Avilés' },
        { code: 'SOTRONDIO', name: 'Sotrondio' },
        { code: 'LANGEO', name: 'Llangreo' }
      ]
    },
    { code: 'CN', name: 'Cantabria', type: 'autonomous community',
      cities: [
        { code: 'SANTANDER', name: 'Santander' },
        { code: 'TORRELAVEGA', name: 'Torrelavega' },
        { code: 'CAMARGO', name: 'Camargo' },
        { code: 'CASTRO', name: 'Castro' },
        { code: 'PIE', name: 'Pie' }
      ]
    },
    { code: 'EX', name: 'Extremadura', type: 'autonomous community',
      cities: [
        { code: 'BADAJOZ', name: 'Badajoz' },
        { code: 'CACERES', name: 'Cáceres' },
        { code: 'MERIDA', name: 'Mérida' },
        { code: 'PLASENCIA', name: 'Plasencia' },
        { code: 'ALMENDRALEJO', name: 'Almendralejo' }
      ]
    },
    { code: 'ML', name: 'Melilla', type: 'autonomous city',
      cities: [
        { code: 'MELILLA', name: 'Melilla' },
        { code: 'AL', name: 'Al' },
        { code: 'BENI', name: 'Beni' },
        { code: 'EL', name: 'El' },
        { code: 'LA', name: 'La' }
      ]
    },
    { code: 'CE', name: 'Ceuta', type: 'autonomous city',
      cities: [
        { code: 'CEUTA', name: 'Ceuta' },
        { code: 'AL', name: 'Al' },
        { code: 'EL', name: 'El' },
        { code: 'LA', name: 'La' },
        { code: 'LOS', name: 'Los' }
      ]
    }
  ]
};

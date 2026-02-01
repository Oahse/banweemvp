/**
 * Andorra country data with parishes, cities, and tax information
 */

import { Country } from './index';

export const andorra: Country = {
  code: 'AD',
  name: 'Andorra',
  taxInfo: { standardRate: 4.5, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  provinces: [
    { code: 'CANILLO', name: 'Canillo',
      cities: [
        { code: 'CANILLO', name: 'Canillo' },
        { code: 'INCLES', name: 'Incles' },
        { code: 'MERITXELL', name: 'Meritxell' },
        { code: 'PRATS', name: 'Prats' },
        { code: 'RANSOL', name: 'Ransol' },
        { code: 'SOLDEU', name: 'Soldeu' },
        { code: 'TARTER', name: 'El Tarter' }
      ]
    },
    { code: 'ENCAMP', name: 'Encamp',
      cities: [
        { code: 'ENCAMP', name: 'Encamp' },
        { code: 'LES_ALDES', name: 'Les Bons' },
        { code: 'VILA', name: 'Vila' }
      ]
    },
    { code: 'ORDINO', name: 'Ordino',
      cities: [
        { code: 'ORDINO', name: 'Ordino' },
        { code: 'ANSALONGA', name: 'Ansalonga' },
        { code: 'ARANS', name: 'Arans' },
        { code: 'LA_CORTINADA', name: 'La Cortinada' },
        { code: 'LLOMPS', name: 'Llorts' },
        { code: 'MAS_DE_RIL', name: 'Mas de Rill' },
        { code: 'SORIGUERA', name: 'Soriguera' }
      ]
    },
    { code: 'LA_MASSANA', name: 'La Massana',
      cities: [
        { code: 'LA_MASSANA', name: 'La Massana' },
        { code: 'ANYOS', name: 'Anyós' },
        { code: 'ARINSAL', name: 'Arinsal' },
        { code: 'ERITS', name: 'Erts' },
        { code: 'ESCAS', name: 'Escàs' },
        { code: 'MAS_DE_RIL', name: 'Mas de Rill' },
        { code: 'PAL', name: 'Pal' },
        { code: 'XIXA', name: 'Xixerella' }
      ]
    },
    { code: 'ANDORRA_LA_VELLA', name: 'Andorra la Vella',
      cities: [
        { code: 'ANDORRA_LA_VELLA', name: 'Andorra la Vella' },
        { code: 'LA_MARGINEDA', name: 'La Margineda' },
        { code: 'SANTA_COLOMA', name: 'Santa Coloma' }
      ]
    },
    { code: 'SANT_JULIA_DE_LORIA', name: 'Sant Julià de Lòria',
      cities: [
        { code: 'SANT_JULIA', name: 'Sant Julià de Lòria' },
        { code: 'AIXIRIVALL', name: 'Aixirivall' },
        { code: 'AUBINYA', name: 'Aubinyà' },
        { code: 'BIXESSARRI', name: 'Bixessarri' },
        { code: 'FONTANEDA', name: 'Fontaneda' },
        { code: 'JUBERRI', name: 'Juberri' },
        { code: 'LUMENES', name: 'Llumeneres' },
        { code: 'NAGOL', name: 'Nagol' }
      ]
    },
    { code: 'ESCALDES_ENGORDANY', name: 'Escaldes-Engordany',
      cities: [
        { code: 'ESCALDES', name: 'Escaldes-Engordany' },
        { code: 'ENGORDANY', name: 'Engordany' },
        { code: 'ELS_VILARS_D_ENGORDANY', name: 'Els Vilars d\'Engordany' },
        { code: 'ENGOLASTERS', name: 'Engolasters' }
      ]
    }
  ]
};

export default andorra;

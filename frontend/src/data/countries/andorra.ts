/**
 * Andorra country data with parishes and cities
 */

import { Country } from './index';

export const andorra: Country = {
  code: 'AD',
  name: 'Andorra',
  flag: '🇦🇩',
  capital: 'Andorra la Vella',
  area: 468,
  currencySymbol: '€',
  officialLanguages: ['Catalan'],
  demonym: 'Andorran',
  taxInfo: { standardRate: 4.5, taxName: 'IGI', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'ALV', name: 'Andorra la Vella', type: 'parish',
      cities: [
        { code: 'ANDORRA LA VELLA', name: 'Andorra la Vella' },
        { code: 'ESCALDES-ENGORDANY', name: 'Escaldes-Engordany' },
        { code: 'LA MASSANA', name: 'La Massana' },
        { code: 'ORDINO', name: 'Ordino' },
        { code: 'SANT JULIA DE LORIA', name: 'Sant Julià de Lòria' }
      ]
    },
    { code: 'ESC', name: 'Escaldes-Engordany', type: 'parish',
      cities: [
        { code: 'ESCALDES-ENGORDANY', name: 'Escaldes-Engordany' },
        { code: 'LA MASSANA', name: 'La Massana' },
        { code: 'ORDINO', name: 'Ordino' },
        { code: 'SANT JULIA DE LORIA', name: 'Sant Julià de Lòria' },
        { code: 'ANDORRA LA VELLA', name: 'Andorra la Vella' }
      ]
    },
    { code: 'MAS', name: 'La Massana', type: 'parish',
      cities: [
        { code: 'LA MASSANA', name: 'La Massana' },
        { code: 'ORDINO', name: 'Ordino' },
        { code: 'SANT JULIA DE LORIA', name: 'Sant Julià de Lòria' },
        { code: 'ANDORRA LA VELLA', name: 'Andorra la Vella' },
        { code: 'ESCALDES-ENGORDANY', name: 'Escaldes-Engordany' }
      ]
    },
    { code: 'ORD', name: 'Ordino', type: 'parish',
      cities: [
        { code: 'ORDINO', name: 'Ordino' },
        { code: 'SANT JULIA DE LORIA', name: 'Sant Julià de Lòria' },
        { code: 'ANDORRA LA VELLA', name: 'Andorra la Vella' },
        { code: 'ESCALDES-ENGORDANY', name: 'Escaldes-Engordany' },
        { code: 'LA MASSANA', name: 'La Massana' }
      ]
    },
    { code: 'SAN', name: 'Sant Julià de Lòria', type: 'parish',
      cities: [
        { code: 'SANT JULIA DE LORIA', name: 'Sant Julià de Lòria' },
        { code: 'ANDORRA LA VELLA', name: 'Andorra la Vella' },
        { code: 'ESCALDES-ENGORDANY', name: 'Escaldes-Engordany' },
        { code: 'LA MASSANA', name: 'La Massana' },
        { code: 'ORDINO', name: 'Ordino' }
      ]
    }
  ]
};

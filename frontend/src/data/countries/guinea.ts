/**
 * Guinea country data with regions, cities, and tax information
 */

import { Country } from './index';

export const guinea: Country = {
    code: 'GN',
    name: 'Guinea',
    taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'GNF', region: 'MEA' },
    provinces: [
      { code: 'BOKE', name: 'Boké',
        cities: [
          { code: 'BOKE', name: 'Boké' },
          { code: 'BOF', name: 'Boffa' },
          { code: 'FRIA', name: 'Fria' },
          { code: 'KAM', name: 'Kamsar' },
          { code: 'KIN', name: 'Kindia' },
          { code: 'TAN', name: 'Tannané' },
          { code: 'CON', name: 'Conakry' },
          { code: 'COY', name: 'Coyah' },
          { code: 'DAB', name: 'Dabola' },
          { code: 'FAR', name: 'Faranah' }
        ]
      },
      { code: 'COY', name: 'Coyah',
        cities: [
          { code: 'COY', name: 'Coyah' },
          { code: 'CON', name: 'Conakry' },
          { code: 'DAB', name: 'Dabola' },
          { code: 'FAR', name: 'Faranah' },
          { code: 'FOR', name: 'Forécariah' },
          { code: 'KOU', name: 'Koubia' },
          { code: 'MAC', name: 'Macenta' },
          { code: 'NZE', name: 'Nzérékoré' },
          { code: 'SIG', name: 'Siguiri' },
          { code: 'YOM', name: 'Yomou' }
        ]
      },
      { code: 'FAR', name: 'Faranah',
        cities: [
          { code: 'FAR', name: 'Faranah' },
          { code: 'BEY', name: 'Beyla' },
          { code: 'DAB', name: 'Dabola' },
          { code: 'DING', name: 'Dinguiraye' },
          { code: 'KOU', name: 'Kouroussa' },
          { code: 'MAC', name: 'Macenta' },
          { code: 'NZE', name: 'Nzérékoré' },
          { code: 'SIG', name: 'Siguiri' },
          { code: 'YOM', name: 'Yomou' },
          { code: 'CON', name: 'Conakry' }
        ]
      },
      { code: 'KA', name: 'Kankan',
        cities: [
          { code: 'KAN', name: 'Kankan' },
          { code: 'KER', name: 'Kérouané' },
          { code: 'KOU', name: 'Kouroussa' },
          { code: 'MAC', name: 'Macenta' },
          { code: 'NZE', name: 'Nzérékoré' },
          { code: 'SIG', name: 'Siguiri' },
          { code: 'YOM', name: 'Yomou' },
          { code: 'CON', name: 'Conakry' },
          { code: 'COY', name: 'Coyah' },
          { code: 'DAB', name: 'Dabola' }
        ]
      },
      { code: 'KIN', name: 'Kindia',
        cities: [
          { code: 'KIN', name: 'Kindia' },
          { code: 'FOR', name: 'Forécariah' },
          { code: 'FRI', name: 'Fria' },
          { code: 'KAM', name: 'Kamsar' },
          { code: 'TAN', name: 'Tannané' },
          { code: 'BOKE', name: 'Boké' },
          { code: 'BOF', name: 'Boffa' },
          { code: 'CON', name: 'Conakry' },
          { code: 'COY', name: 'Coyah' },
          { code: 'DAB', name: 'Dabola' }
        ]
      },
      { code: 'LAB', name: 'Labé',
        cities: [
          { code: 'LAB', name: 'Labé' },
          { code: 'LEL', name: 'Lélouma' },
          { code: 'MAL', name: 'Mali' },
          { code: 'TOU', name: 'Tougué' },
          { code: 'WAG', name: 'Wagui' },
          { code: 'CON', name: 'Conakry' },
          { code: 'COY', name: 'Coyah' },
          { code: 'DAB', name: 'Dabola' },
          { code: 'FAR', name: 'Faranah' },
          { code: 'FOR', name: 'Forécariah' }
        ]
      },
      { code: 'MAC', name: 'Macenta',
        cities: [
          { code: 'MAC', name: 'Macenta' },
          { code: 'NZE', name: 'Nzérékoré' },
          { code: 'SIG', name: 'Siguiri' },
          { code: 'YOM', name: 'Yomou' },
          { code: 'CON', name: 'Conakry' },
          { code: 'COY', name: 'Coyah' },
          { code: 'DAB', name: 'Dabola' },
          { code: 'FAR', name: 'Faranah' },
          { code: 'FOR', name: 'Forécariah' },
          { code: 'KOU', name: 'Kouroussa' }
        ]
      },
      { code: 'MAM', name: 'Mamou',
        cities: [
          { code: 'MAM', name: 'Mamou' },
          { code: 'DAL', name: 'Dalaba' },
          { code: 'PIK', name: 'Pita' },
          { code: 'TOU', name: 'Tougué' },
          { code: 'WAG', name: 'Wagui' },
          { code: 'LAB', name: 'Labé' },
          { code: 'LEL', name: 'Lélouma' },
          { code: 'MAL', name: 'Mali' },
          { code: 'CON', name: 'Conakry' },
          { code: 'COY', name: 'Coyah' }
        ]
      },
      { code: 'NZE', name: 'Nzérékoré',
        cities: [
          { code: 'NZE', name: 'Nzérékoré' },
          { code: 'MAC', name: 'Macenta' },
          { code: 'SIG', name: 'Siguiri' },
          { code: 'YOM', name: 'Yomou' },
          { code: 'CON', name: 'Conakry' },
          { code: 'COY', name: 'Coyah' },
          { code: 'DAB', name: 'Dabola' },
          { code: 'FAR', name: 'Faranah' },
          { code: 'FOR', name: 'Forécariah' },
          { code: 'KOU', name: 'Kouroussa' }
        ]
      },
      { code: 'SIG', name: 'Siguiri',
        cities: [
          { code: 'SIG', name: 'Siguiri' },
          { code: 'MAC', name: 'Macenta' },
          { code: 'NZE', name: 'Nzérékoré' },
          { code: 'YOM', name: 'Yomou' },
          { code: 'CON', name: 'Conakry' },
          { code: 'COY', name: 'Coyah' },
          { code: 'DAB', name: 'Dabola' },
          { code: 'FAR', name: 'Faranah' },
          { code: 'FOR', name: 'Forécariah' },
          { code: 'KOU', name: 'Kouroussa' }
        ]
      },
      { code: 'YOM', name: 'Yomou',
        cities: [
          { code: 'YOM', name: 'Yomou' },
          { code: 'MAC', name: 'Macenta' },
          { code: 'NZE', name: 'Nzérékoré' },
          { code: 'SIG', name: 'Siguiri' },
          { code: 'CON', name: 'Conakry' },
          { code: 'COY', name: 'Coyah' },
          { code: 'DAB', name: 'Dabola' },
          { code: 'FAR', name: 'Faranah' },
          { code: 'FOR', name: 'Forécariah' },
          { code: 'KOU', name: 'Kouroussa' }
        ]
      },
      { code: 'CON', name: 'Conakry',
        cities: [
          { code: 'CON', name: 'Conakry' },
          { code: 'COY', name: 'Coyah' },
          { code: 'DAB', name: 'Dabola' },
          { code: 'FAR', name: 'Faranah' },
          { code: 'FOR', name: 'Forécariah' },
          { code: 'FRI', name: 'Fria' },
          { code: 'KAM', name: 'Kamsar' },
          { code: 'KIN', name: 'Kindia' },
          { code: 'TAN', name: 'Tannané' },
          { code: 'BOKE', name: 'Boké' }
        ]
      }
    ]
  };

/**
 * São Tomé and Príncipe country data with districts, cities, and tax information
 */

import { Country } from './index';

export const saoTomePrincipe: Country = {
    code: 'ST',
    name: 'São Tomé and Príncipe',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'STD', region: 'MEA' },
    provinces: [
      { code: 'ST', name: 'São Tomé',
        cities: [
          { code: 'ST', name: 'São Tomé' },
          { code: 'TRIN', name: 'Trindade' },
          { code: 'NEV', name: 'Neves' },
          { code: 'SANT', name: 'Santana' },
          { code: 'ANG', name: 'Angolares' },
          { code: 'GUA', name: 'Guadalupe' },
          { code: 'RIB', name: 'Ribeira Peixe' },
          { code: 'CANT', name: 'Cantagalo' },
          { code: 'MEZ', name: 'Me-Zochi' },
          { code: 'CAU', name: 'Caué' }
        ]
      },
      { code: 'PR', name: 'Príncipe',
        cities: [
          { code: 'PR', name: 'Santo António' },
          { code: 'NEV', name: 'Neves' },
          { code: 'SANT', name: 'Santana' },
          { code: 'ANG', name: 'Angolares' },
          { code: 'GUA', name: 'Guadalupe' },
          { code: 'RIB', name: 'Ribeira Peixe' },
          { code: 'CANT', name: 'Cantagalo' },
          { code: 'MEZ', name: 'Me-Zochi' },
          { code: 'CAU', name: 'Caué' },
          { code: 'ST', name: 'São Tomé' }
        ]
      },
      { code: 'PA', name: 'Pagué',
        cities: [
          { code: 'PA', name: 'Pagué' },
          { code: 'NEV', name: 'Neves' },
          { code: 'SANT', name: 'Santana' },
          { code: 'ANG', name: 'Angolares' },
          { code: 'GUA', name: 'Guadalupe' },
          { code: 'RIB', name: 'Ribeira Peixe' },
          { code: 'CANT', name: 'Cantagalo' },
          { code: 'MEZ', name: 'Me-Zochi' },
          { code: 'CAU', name: 'Caué' },
          { code: 'ST', name: 'São Tomé' }
        ]
      },
      { code: 'CA', name: 'Caué',
        cities: [
          { code: 'CAU', name: 'São João dos Angolares' },
          { code: 'NEV', name: 'Neves' },
          { code: 'SANT', name: 'Santana' },
          { code: 'ANG', name: 'Angolares' },
          { code: 'GUA', name: 'Guadalupe' },
          { code: 'RIB', name: 'Ribeira Peixe' },
          { code: 'CANT', name: 'Cantagalo' },
          { code: 'MEZ', name: 'Me-Zochi' },
          { code: 'ST', name: 'São Tomé' },
          { code: 'PR', name: 'Santo António' }
        ]
      },
      { code: 'LE', name: 'Lembá',
        cities: [
          { code: 'LE', name: 'São João dos Angolares' },
          { code: 'NEV', name: 'Neves' },
          { code: 'SANT', name: 'Santana' },
          { code: 'ANG', name: 'Angolares' },
          { code: 'GUA', name: 'Guadalupe' },
          { code: 'RIB', name: 'Ribeira Peixe' },
          { code: 'CANT', name: 'Cantagalo' },
          { code: 'MEZ', name: 'Me-Zochi' },
          { code: 'CAU', name: 'Caué' },
          { code: 'ST', name: 'São Tomé' }
        ]
      },
      { code: 'ME', name: 'Me-Zochi',
        cities: [
          { code: 'ME', name: 'Trindade' },
          { code: 'NEV', name: 'Neves' },
          { code: 'SANT', name: 'Santana' },
          { code: 'ANG', name: 'Angolares' },
          { code: 'GUA', name: 'Guadalupe' },
          { code: 'RIB', name: 'Ribeira Peixe' },
          { code: 'CANT', name: 'Cantagalo' },
          { code: 'CAU', name: 'Caué' },
          { code: 'ST', name: 'São Tomé' },
          { code: 'PR', name: 'Santo António' }
        ]
      },
      { code: 'CA2', name: 'Cantagalo',
        cities: [
          { code: 'CA2', name: 'São João dos Angolares' },
          { code: 'NEV', name: 'Neves' },
          { code: 'SANT', name: 'Santana' },
          { code: 'ANG', name: 'Angolares' },
          { code: 'GUA', name: 'Guadalupe' },
          { code: 'RIB', name: 'Ribeira Peixe' },
          { code: 'MEZ', name: 'Me-Zochi' },
          { code: 'CAU', name: 'Caué' },
          { code: 'ST', name: 'São Tomé' },
          { code: 'PR', name: 'Santo António' }
        ]
      }
    ]
  };

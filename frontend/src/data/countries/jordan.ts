/**
 * Jordan country data with regions, cities, and tax information
 */

import { Country } from './index';

export const jordan: Country = {
    code: 'JO',
    name: 'Jordan',
    taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'JOD', region: 'MEA' },
    provinces: [
      { code: 'AMM', name: 'Amman',
        cities: [
          { code: 'AMM', name: 'Amman' },
          { code: 'IRB', name: 'Irbid' },
          { code: 'ZAR', name: 'Zarqa' },
          { code: 'RUW', name: 'Russeifa' },
          { code: 'WAD', name: 'Wadi as Sir' },
          { code: 'AQ', name: 'Aqaba' },
          { code: 'MAD', name: 'Madaba' },
          { code: 'KAR', name: 'Karak' },
          { code: 'SAF', name: 'Safawi' },
          { code: 'MAF', name: 'Maan' }
        ]
      },
      { code: 'IRB', name: 'Irbid',
        cities: [
          { code: 'IRB', name: 'Irbid' },
          { code: 'AMM', name: 'Amman' },
          { code: 'ZAR', name: 'Zarqa' },
          { code: 'RUW', name: 'Russeifa' },
          { code: 'WAD', name: 'Wadi as Sir' },
          { code: 'AQ', name: 'Aqaba' },
          { code: 'MAD', name: 'Madaba' },
          { code: 'KAR', name: 'Karak' },
          { code: 'SAF', name: 'Safawi' },
          { code: 'MAF', name: 'Maan' }
        ]
      },
      { code: 'ZAR', name: 'Zarqa',
        cities: [
          { code: 'ZAR', name: 'Zarqa' },
          { code: 'AMM', name: 'Amman' },
          { code: 'IRB', name: 'Irbid' },
          { code: 'RUW', name: 'Russeifa' },
          { code: 'WAD', name: 'Wadi as Sir' },
          { code: 'AQ', name: 'Aqaba' },
          { code: 'MAD', name: 'Madaba' },
          { code: 'KAR', name: 'Karak' },
          { code: 'SAF', name: 'Safawi' },
          { code: 'MAF', name: 'Maan' }
        ]
      },
      { code: 'RUW', name: 'Russeifa',
        cities: [
          { code: 'RUW', name: 'Russeifa' },
          { code: 'AMM', name: 'Amman' },
          { code: 'IRB', name: 'Irbid' },
          { code: 'ZAR', name: 'Zarqa' },
          { code: 'WAD', name: 'Wadi as Sir' },
          { code: 'AQ', name: 'Aqaba' },
          { code: 'MAD', name: 'Madaba' },
          { code: 'KAR', name: 'Karak' },
          { code: 'SAF', name: 'Safawi' },
          { code: 'MAF', name: 'Maan' }
        ]
      },
      { code: 'WAD', name: 'Wadi as Sir',
        cities: [
          { code: 'WAD', name: 'Wadi as Sir' },
          { code: 'AMM', name: 'Amman' },
          { code: 'IRB', name: 'Irbid' },
          { code: 'ZAR', name: 'Zarqa' },
          { code: 'RUW', name: 'Russeifa' },
          { code: 'AQ', name: 'Aqaba' },
          { code: 'MAD', name: 'Madaba' },
          { code: 'KAR', name: 'Karak' },
          { code: 'SAF', name: 'Safawi' },
          { code: 'MAF', name: 'Maan' }
        ]
      },
      { code: 'AQ', name: 'Aqaba',
        cities: [
          { code: 'AQ', name: 'Aqaba' },
          { code: 'AMM', name: 'Amman' },
          { code: 'IRB', name: 'Irbid' },
          { code: 'ZAR', name: 'Zarqa' },
          { code: 'RUW', name: 'Russeifa' },
          { code: 'WAD', name: 'Wadi as Sir' },
          { code: 'MAD', name: 'Madaba' },
          { code: 'KAR', name: 'Karak' },
          { code: 'SAF', name: 'Safawi' },
          { code: 'MAF', name: 'Maan' }
        ]
      },
      { code: 'MAD', name: 'Madaba',
        cities: [
          { code: 'MAD', name: 'Madaba' },
          { code: 'AMM', name: 'Amman' },
          { code: 'IRB', name: 'Irbid' },
          { code: 'ZAR', name: 'Zarqa' },
          { code: 'RUW', name: 'Russeifa' },
          { code: 'WAD', name: 'Wadi as Sir' },
          { code: 'AQ', name: 'Aqaba' },
          { code: 'KAR', name: 'Karak' },
          { code: 'SAF', name: 'Safawi' },
          { code: 'MAF', name: 'Maan' }
        ]
      },
      { code: 'KAR', name: 'Karak',
        cities: [
          { code: 'KAR', name: 'Karak' },
          { code: 'AMM', name: 'Amman' },
          { code: 'IRB', name: 'Irbid' },
          { code: 'ZAR', name: 'Zarqa' },
          { code: 'RUW', name: 'Russeifa' },
          { code: 'WAD', name: 'Wadi as Sir' },
          { code: 'AQ', name: 'Aqaba' },
          { code: 'MAD', name: 'Madaba' },
          { code: 'SAF', name: 'Safawi' },
          { code: 'MAF', name: 'Maan' }
        ]
      },
      { code: 'SAF', name: 'Safawi',
        cities: [
          { code: 'SAF', name: 'Safawi' },
          { code: 'AMM', name: 'Amman' },
          { code: 'IRB', name: 'Irbid' },
          { code: 'ZAR', name: 'Zarqa' },
          { code: 'RUW', name: 'Russeifa' },
          { code: 'WAD', name: 'Wadi as Sir' },
          { code: 'AQ', name: 'Aqaba' },
          { code: 'MAD', name: 'Madaba' },
          { code: 'KAR', name: 'Karak' },
          { code: 'MAF', name: 'Maan' }
        ]
      },
      { code: 'MAF', name: 'Maan',
        cities: [
          { code: 'MAF', name: 'Maan' },
          { code: 'AMM', name: 'Amman' },
          { code: 'IRB', name: 'Irbid' },
          { code: 'ZAR', name: 'Zarqa' },
          { code: 'RUW', name: 'Russeifa' },
          { code: 'WAD', name: 'Wadi as Sir' },
          { code: 'AQ', name: 'Aqaba' },
          { code: 'MAD', name: 'Madaba' },
          { code: 'KAR', name: 'Karak' },
          { code: 'SAF', name: 'Safawi' }
        ]
      },
      { code: 'AJL', name: 'Ajloun',
        cities: [
          { code: 'AJL', name: 'Ajloun' },
          { code: 'JAR', name: 'Jerash' },
          { code: 'MAD', name: 'Madaba' },
          { code: 'AMM', name: 'Amman' },
          { code: 'IRB', name: 'Irbid' },
          { code: 'ZAR', name: 'Zarqa' },
          { code: 'RUW', name: 'Russeifa' },
          { code: 'WAD', name: 'Wadi as Sir' },
          { code: 'AQ', name: 'Aqaba' },
          { code: 'KAR', name: 'Karak' }
        ]
      },
      { code: 'JAR', name: 'Jerash',
        cities: [
          { code: 'JAR', name: 'Jerash' },
          { code: 'AJL', name: 'Ajloun' },
          { code: 'MAD', name: 'Madaba' },
          { code: 'AMM', name: 'Amman' },
          { code: 'IRB', name: 'Irbid' },
          { code: 'ZAR', name: 'Zarqa' },
          { code: 'RUW', name: 'Russeifa' },
          { code: 'WAD', name: 'Wadi as Sir' },
          { code: 'AQ', name: 'Aqaba' },
          { code: 'KAR', name: 'Karak' }
        ]
      }
    ]
  };

/**
 * Libya country data with regions, cities, and tax information
 */

import { Country } from './index';

export const libya: Country = {
    code: 'LY',
    name: 'Libya',
    taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'LYD', region: 'MEA' },
    provinces: [
      { code: 'TRI', name: 'Tripoli',
        cities: [
          { code: 'TRI', name: 'Tripoli' },
          { code: 'TAR', name: 'Tarhuna' },
          { code: 'BANI', name: 'Bani Walid' },
          { code: 'MSL', name: 'Msallata' },
          { code: 'ZAW', name: 'Zawiya' },
          { code: 'SUR', name: 'Surman' },
          { code: 'AL', name: 'Al Khums' },
          { code: 'ZLT', name: 'Zliten' },
          { code: 'MIS', name: 'Misrata' },
          { code: 'BEN', name: 'Benghazi' }
        ]
      },
      { code: 'BENG', name: 'Benghazi',
        cities: [
          { code: 'BEN', name: 'Benghazi' },
          { code: 'AJD', name: 'Ajdabiya' },
          { code: 'TOB', name: 'Tobruk' },
          { code: 'DAR', name: 'Darna' },
          { code: 'JAB', name: 'Jabal al Akhdar' },
          { code: 'MAR', name: 'Marj' },
          { code: 'BAY', name: 'Bayda' },
          { code: 'SHAH', name: 'Shahhat' },
          { code: 'SUS', name: 'Susa' },
          { code: 'RAH', name: 'Ras Lanuf' }
        ]
      },
      { code: 'MISR', name: 'Misrata',
        cities: [
          { code: 'MIS', name: 'Misrata' },
          { code: 'TRI', name: 'Tripoli' },
          { code: 'TAR', name: 'Tarhuna' },
          { code: 'BANI', name: 'Bani Walid' },
          { code: 'MSL', name: 'Msallata' },
          { code: 'ZAW', name: 'Zawiya' },
          { code: 'SUR', name: 'Surman' },
          { code: 'AL', name: 'Al Khums' },
          { code: 'ZLT', name: 'Zliten' },
          { code: 'BEN', name: 'Benghazi' }
        ]
      },
      { code: 'ZAW', name: 'Zawiya',
        cities: [
          { code: 'ZAW', name: 'Zawiya' },
          { code: 'TRI', name: 'Tripoli' },
          { code: 'TAR', name: 'Tarhuna' },
          { code: 'BANI', name: 'Bani Walid' },
          { code: 'MSL', name: 'Msallata' },
          { code: 'SUR', name: 'Surman' },
          { code: 'AL', name: 'Al Khums' },
          { code: 'ZLT', name: 'Zliten' },
          { code: 'MIS', name: 'Misrata' },
          { code: 'BEN', name: 'Benghazi' }
        ]
      },
      { code: 'AL', name: 'Al Khums',
        cities: [
          { code: 'AL', name: 'Al Khums' },
          { code: 'TRI', name: 'Tripoli' },
          { code: 'TAR', name: 'Tarhuna' },
          { code: 'BANI', name: 'Bani Walid' },
          { code: 'MSL', name: 'Msallata' },
          { code: 'ZAW', name: 'Zawiya' },
          { code: 'SUR', name: 'Surman' },
          { code: 'ZLT', name: 'Zliten' },
          { code: 'MIS', name: 'Misrata' },
          { code: 'BEN', name: 'Benghazi' }
        ]
      },
      { code: 'ZLT', name: 'Zliten',
        cities: [
          { code: 'ZLT', name: 'Zliten' },
          { code: 'TRI', name: 'Tripoli' },
          { code: 'TAR', name: 'Tarhuna' },
          { code: 'BANI', name: 'Bani Walid' },
          { code: 'MSL', name: 'Msallata' },
          { code: 'ZAW', name: 'Zawiya' },
          { code: 'SUR', name: 'Surman' },
          { code: 'AL', name: 'Al Khums' },
          { code: 'MIS', name: 'Misrata' },
          { code: 'BEN', name: 'Benghazi' }
        ]
      },
      { code: 'TAR', name: 'Tarhuna',
        cities: [
          { code: 'TAR', name: 'Tarhuna' },
          { code: 'TRI', name: 'Tripoli' },
          { code: 'BANI', name: 'Bani Walid' },
          { code: 'MSL', name: 'Msallata' },
          { code: 'ZAW', name: 'Zawiya' },
          { code: 'SUR', name: 'Surman' },
          { code: 'AL', name: 'Al Khums' },
          { code: 'ZLT', name: 'Zliten' },
          { code: 'MIS', name: 'Misrata' },
          { code: 'BEN', name: 'Benghazi' }
        ]
      },
      { code: 'BANI', name: 'Bani Walid',
        cities: [
          { code: 'BANI', name: 'Bani Walid' },
          { code: 'TRI', name: 'Tripoli' },
          { code: 'TAR', name: 'Tarhuna' },
          { code: 'MSL', name: 'Msallata' },
          { code: 'ZAW', name: 'Zawiya' },
          { code: 'SUR', name: 'Surman' },
          { code: 'AL', name: 'Al Khums' },
          { code: 'ZLT', name: 'Zliten' },
          { code: 'MIS', name: 'Misrata' },
          { code: 'BEN', name: 'Benghazi' }
        ]
      },
      { code: 'MSL', name: 'Msallata',
        cities: [
          { code: 'MSL', name: 'Msallata' },
          { code: 'TRI', name: 'Tripoli' },
          { code: 'TAR', name: 'Tarhuna' },
          { code: 'BANI', name: 'Bani Walid' },
          { code: 'ZAW', name: 'Zawiya' },
          { code: 'SUR', name: 'Surman' },
          { code: 'AL', name: 'Al Khums' },
          { code: 'ZLT', name: 'Zliten' },
          { code: 'MIS', name: 'Misrata' },
          { code: 'BEN', name: 'Benghazi' }
        ]
      },
      { code: 'SUR', name: 'Surman',
        cities: [
          { code: 'SUR', name: 'Surman' },
          { code: 'TRI', name: 'Tripoli' },
          { code: 'TAR', name: 'Tarhuna' },
          { code: 'BANI', name: 'Bani Walid' },
          { code: 'MSL', name: 'Msallata' },
          { code: 'ZAW', name: 'Zawiya' },
          { code: 'AL', name: 'Al Khums' },
          { code: 'ZLT', name: 'Zliten' },
          { code: 'MIS', name: 'Misrata' },
          { code: 'BEN', name: 'Benghazi' }
        ]
      },
      { code: 'AJD', name: 'Ajdabiya',
        cities: [
          { code: 'AJD', name: 'Ajdabiya' },
          { code: 'BEN', name: 'Benghazi' },
          { code: 'TOB', name: 'Tobruk' },
          { code: 'DAR', name: 'Darna' },
          { code: 'JAB', name: 'Jabal al Akhdar' },
          { code: 'MAR', name: 'Marj' },
          { code: 'BAY', name: 'Bayda' },
          { code: 'SHAH', name: 'Shahhat' },
          { code: 'SUS', name: 'Susa' },
          { code: 'RAH', name: 'Ras Lanuf' }
        ]
      },
      { code: 'TOB', name: 'Tobruk',
        cities: [
          { code: 'TOB', name: 'Tobruk' },
          { code: 'BEN', name: 'Benghazi' },
          { code: 'AJD', name: 'Ajdabiya' },
          { code: 'DAR', name: 'Darna' },
          { code: 'JAB', name: 'Jabal al Akhdar' },
          { code: 'MAR', name: 'Marj' },
          { code: 'BAY', name: 'Bayda' },
          { code: 'SHAH', name: 'Shahhat' },
          { code: 'SUS', name: 'Susa' },
          { code: 'RAH', name: 'Ras Lanuf' }
        ]
      },
      { code: 'DAR', name: 'Darna',
        cities: [
          { code: 'DAR', name: 'Darna' },
          { code: 'BEN', name: 'Benghazi' },
          { code: 'AJD', name: 'Ajdabiya' },
          { code: 'TOB', name: 'Tobruk' },
          { code: 'JAB', name: 'Jabal al Akhdar' },
          { code: 'MAR', name: 'Marj' },
          { code: 'BAY', name: 'Bayda' },
          { code: 'SHAH', name: 'Shahhat' },
          { code: 'SUS', name: 'Susa' },
          { code: 'RAH', name: 'Ras Lanuf' }
        ]
      },
      { code: 'JAB', name: 'Jabal al Akhdar',
        cities: [
          { code: 'JAB', name: 'Jabal al Akhdar' },
          { code: 'BEN', name: 'Benghazi' },
          { code: 'AJD', name: 'Ajdabiya' },
          { code: 'TOB', name: 'Tobruk' },
          { code: 'DAR', name: 'Darna' },
          { code: 'MAR', name: 'Marj' },
          { code: 'BAY', name: 'Bayda' },
          { code: 'SHAH', name: 'Shahhat' },
          { code: 'SUS', name: 'Susa' },
          { code: 'RAH', name: 'Ras Lanuf' }
        ]
      },
      { code: 'MAR', name: 'Marj',
        cities: [
          { code: 'MAR', name: 'Marj' },
          { code: 'BEN', name: 'Benghazi' },
          { code: 'AJD', name: 'Ajdabiya' },
          { code: 'TOB', name: 'Tobruk' },
          { code: 'DAR', name: 'Darna' },
          { code: 'JAB', name: 'Jabal al Akhdar' },
          { code: 'BAY', name: 'Bayda' },
          { code: 'SHAH', name: 'Shahhat' },
          { code: 'SUS', name: 'Susa' },
          { code: 'RAH', name: 'Ras Lanuf' }
        ]
      },
      { code: 'BAY', name: 'Bayda',
        cities: [
          { code: 'BAY', name: 'Bayda' },
          { code: 'BEN', name: 'Benghazi' },
          { code: 'AJD', name: 'Ajdabiya' },
          { code: 'TOB', name: 'Tobruk' },
          { code: 'DAR', name: 'Darna' },
          { code: 'JAB', name: 'Jabal al Akhdar' },
          { code: 'MAR', name: 'Marj' },
          { code: 'SHAH', name: 'Shahhat' },
          { code: 'SUS', name: 'Susa' },
          { code: 'RAH', name: 'Ras Lanuf' }
        ]
      },
      { code: 'SHAH', name: 'Shahhat',
        cities: [
          { code: 'SHAH', name: 'Shahhat' },
          { code: 'BEN', name: 'Benghazi' },
          { code: 'AJD', name: 'Ajdabiya' },
          { code: 'TOB', name: 'Tobruk' },
          { code: 'DAR', name: 'Darna' },
          { code: 'JAB', name: 'Jabal al Akhdar' },
          { code: 'MAR', name: 'Marj' },
          { code: 'BAY', name: 'Bayda' },
          { code: 'SUS', name: 'Susa' },
          { code: 'RAH', name: 'Ras Lanuf' }
        ]
      },
      { code: 'SUS', name: 'Susa',
        cities: [
          { code: 'SUS', name: 'Susa' },
          { code: 'BEN', name: 'Benghazi' },
          { code: 'AJD', name: 'Ajdabiya' },
          { code: 'TOB', name: 'Tobruk' },
          { code: 'DAR', name: 'Darna' },
          { code: 'JAB', name: 'Jabal al Akhdar' },
          { code: 'MAR', name: 'Marj' },
          { code: 'BAY', name: 'Bayda' },
          { code: 'SHAH', name: 'Shahhat' },
          { code: 'RAH', name: 'Ras Lanuf' }
        ]
      },
      { code: 'RAH', name: 'Ras Lanuf',
        cities: [
          { code: 'RAH', name: 'Ras Lanuf' },
          { code: 'BEN', name: 'Benghazi' },
          { code: 'AJD', name: 'Ajdabiya' },
          { code: 'TOB', name: 'Tobruk' },
          { code: 'DAR', name: 'Darna' },
          { code: 'JAB', name: 'Jabal al Akhdar' },
          { code: 'MAR', name: 'Marj' },
          { code: 'BAY', name: 'Bayda' },
          { code: 'SHAH', name: 'Shahhat' },
          { code: 'SUS', name: 'Susa' }
        ]
      },
      { code: 'SAB', name: 'Sabha',
        cities: [
          { code: 'SAB', name: 'Sabha' },
          { code: 'UBA', name: 'Ubari' },
          { code: 'MUR', name: 'Murzuq' },
          { code: 'GAT', name: 'Ghat' },
          { code: 'WAD', name: 'Wadi al Hayaa' },
          { code: 'TRI2', name: 'Traghan' },
          { code: 'ALW', name: 'Al Wahat' },
          { code: 'TAM', name: 'Tazerbo' },
          { code: 'JOF', name: 'Jofra' },
          { code: 'HUN', name: 'Hun' }
        ]
      },
      { code: 'UBA', name: 'Ubari',
        cities: [
          { code: 'UBA', name: 'Ubari' },
          { code: 'SAB', name: 'Sabha' },
          { code: 'MUR', name: 'Murzuq' },
          { code: 'GAT', name: 'Ghat' },
          { code: 'WAD', name: 'Wadi al Hayaa' },
          { code: 'TRI2', name: 'Traghan' },
          { code: 'ALW', name: 'Al Wahat' },
          { code: 'TAM', name: 'Tazerbo' },
          { code: 'JOF', name: 'Jofra' },
          { code: 'HUN', name: 'Hun' }
        ]
      },
      { code: 'MUR', name: 'Murzuq',
        cities: [
          { code: 'MUR', name: 'Murzuq' },
          { code: 'SAB', name: 'Sabha' },
          { code: 'UBA', name: 'Ubari' },
          { code: 'GAT', name: 'Ghat' },
          { code: 'WAD', name: 'Wadi al Hayaa' },
          { code: 'TRI2', name: 'Traghan' },
          { code: 'ALW', name: 'Al Wahat' },
          { code: 'TAM', name: 'Tazerbo' },
          { code: 'JOF', name: 'Jofra' },
          { code: 'HUN', name: 'Hun' }
        ]
      },
      { code: 'GAT', name: 'Ghat',
        cities: [
          { code: 'GAT', name: 'Ghat' },
          { code: 'SAB', name: 'Sabha' },
          { code: 'UBA', name: 'Ubari' },
          { code: 'MUR', name: 'Murzuq' },
          { code: 'WAD', name: 'Wadi al Hayaa' },
          { code: 'TRI2', name: 'Traghan' },
          { code: 'ALW', name: 'Al Wahat' },
          { code: 'TAM', name: 'Tazerbo' },
          { code: 'JOF', name: 'Jofra' },
          { code: 'HUN', name: 'Hun' }
        ]
      },
      { code: 'WAD', name: 'Wadi al Hayaa',
        cities: [
          { code: 'WAD', name: 'Wadi al Hayaa' },
          { code: 'SAB', name: 'Sabha' },
          { code: 'UBA', name: 'Ubari' },
          { code: 'MUR', name: 'Murzuq' },
          { code: 'GAT', name: 'Ghat' },
          { code: 'TRI2', name: 'Traghan' },
          { code: 'ALW', name: 'Al Wahat' },
          { code: 'TAM', name: 'Tazerbo' },
          { code: 'JOF', name: 'Jofra' },
          { code: 'HUN', name: 'Hun' }
        ]
      },
      { code: 'TRI2', name: 'Traghan',
        cities: [
          { code: 'TRI2', name: 'Traghan' },
          { code: 'SAB', name: 'Sabha' },
          { code: 'UBA', name: 'Ubari' },
          { code: 'MUR', name: 'Murzuq' },
          { code: 'GAT', name: 'Ghat' },
          { code: 'WAD', name: 'Wadi al Hayaa' },
          { code: 'ALW', name: 'Al Wahat' },
          { code: 'TAM', name: 'Tazerbo' },
          { code: 'JOF', name: 'Jofra' },
          { code: 'HUN', name: 'Hun' }
        ]
      },
      { code: 'ALW', name: 'Al Wahat',
        cities: [
          { code: 'ALW', name: 'Al Wahat' },
          { code: 'SAB', name: 'Sabha' },
          { code: 'UBA', name: 'Ubari' },
          { code: 'MUR', name: 'Murzuq' },
          { code: 'GAT', name: 'Ghat' },
          { code: 'WAD', name: 'Wadi al Hayaa' },
          { code: 'TRI2', name: 'Traghan' },
          { code: 'TAM', name: 'Tazerbo' },
          { code: 'JOF', name: 'Jofra' },
          { code: 'HUN', name: 'Hun' }
        ]
      },
      { code: 'TAM', name: 'Tazerbo',
        cities: [
          { code: 'TAM', name: 'Tazerbo' },
          { code: 'SAB', name: 'Sabha' },
          { code: 'UBA', name: 'Ubari' },
          { code: 'MUR', name: 'Murzuq' },
          { code: 'GAT', name: 'Ghat' },
          { code: 'WAD', name: 'Wadi al Hayaa' },
          { code: 'TRI2', name: 'Traghan' },
          { code: 'ALW', name: 'Al Wahat' },
          { code: 'JOF', name: 'Jofra' },
          { code: 'HUN', name: 'Hun' }
        ]
      },
      { code: 'JOF', name: 'Jofra',
        cities: [
          { code: 'JOF', name: 'Jofra' },
          { code: 'SAB', name: 'Sabha' },
          { code: 'UBA', name: 'Ubari' },
          { code: 'MUR', name: 'Murzuq' },
          { code: 'GAT', name: 'Ghat' },
          { code: 'WAD', name: 'Wadi al Hayaa' },
          { code: 'TRI2', name: 'Traghan' },
          { code: 'ALW', name: 'Al Wahat' },
          { code: 'TAM', name: 'Tazerbo' },
          { code: 'HUN', name: 'Hun' }
        ]
      },
      { code: 'HUN', name: 'Hun',
        cities: [
          { code: 'HUN', name: 'Hun' },
          { code: 'SAB', name: 'Sabha' },
          { code: 'UBA', name: 'Ubari' },
          { code: 'MUR', name: 'Murzuq' },
          { code: 'GAT', name: 'Ghat' },
          { code: 'WAD', name: 'Wadi al Hayaa' },
          { code: 'TRI2', name: 'Traghan' },
          { code: 'ALW', name: 'Al Wahat' },
          { code: 'TAM', name: 'Tazerbo' },
          { code: 'JOF', name: 'Jofra' }
        ]
      }
    ]
  };

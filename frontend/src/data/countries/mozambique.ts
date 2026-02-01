/**
 * Mozambique country data with regions, cities, and tax information
 */

import { Country } from './index';

export const mozambique: Country = {
    code: 'MZ',
    name: 'Mozambique',
    taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'MZN', region: 'MEA' },
    provinces: [
      { code: 'MAP', name: 'Maputo',
        cities: [
          { code: 'MAP', name: 'Maputo' },
          { code: 'MAT', name: 'Matola' },
          { code: 'XAI', name: 'Xai-Xai' },
          { code: 'MAN', name: 'Manhica' },
          { code: 'MOA', name: 'Moamba' },
          { code: 'NAMA', name: 'Namaacha' },
          { code: 'SAB', name: 'Sabadura' },
          { code: 'BOA', name: 'Boane' },
          { code: 'MAG', name: 'Magude' },
          { code: 'PEM', name: 'Pemba' }
        ]
      },
      { code: 'GAZ', name: 'Gaza',
        cities: [
          { code: 'XAI', name: 'Xai-Xai' },
          { code: 'CHI', name: 'Chibuto' },
          { code: 'MANJ', name: 'Manjacaze' },
          { code: 'CHOK', name: 'Chokwe' },
          { code: 'GUI', name: 'Guijá' },
          { code: 'MAB', name: 'Mabalane' },
          { code: 'MASS', name: 'Massinga' },
          { code: 'CHIB', name: 'Chigubo' },
          { code: 'BI', name: 'Bilene' },
          { code: 'PRA', name: 'Praia do Bilene' }
        ]
      },
      { code: 'INH', name: 'Inhambane',
        cities: [
          { code: 'INH', name: 'Inhambane' },
          { code: 'MAX', name: 'Maxixe' },
          { code: 'VIL', name: 'Vilankulo' },
          { code: 'MAS', name: 'Massinga' },
          { code: 'MOR', name: 'Morrumbene' },
          { code: 'FUN', name: 'Funhalouro' },
          { code: 'HOM', name: 'Homoine' },
          { code: 'JUN', name: 'Jangamo' },
          { code: 'PA', name: 'Panda' },
          { code: 'ZAV', name: 'Zavala' }
        ]
      },
      { code: 'MAN', name: 'Manica',
        cities: [
          { code: 'CHI', name: 'Chimoio' },
          { code: 'MAN', name: 'Manica' },
          { code: 'GON', name: 'Gondola' },
          { code: 'MAC', name: 'Macate' },
          { code: 'BAR', name: 'Barue' },
          { code: 'SUN', name: 'Sussundenga' },
          { code: 'TAM', name: 'Tambara' },
          { code: 'GUR', name: 'Guro' },
          { code: 'MACO', name: 'Macossa' },
          { code: 'VAND', name: 'Vanduzi' }
        ]
      },
      { code: 'SOF', name: 'Sofala',
        cities: [
          { code: 'BEI', name: 'Beira' },
          { code: 'DOW', name: 'Dondo' },
          { code: 'GON', name: 'Gorongosa' },
          { code: 'MAR', name: 'Marromeu' },
          { code: 'MACH', name: 'Machanga' },
          { code: 'CAIA', name: 'Caia' },
          { code: 'CHE', name: 'Chemba' },
          { code: 'CHIB', name: 'Chibabava' },
          { code: 'MARO', name: 'Maringué' },
          { code: 'MUT', name: 'Mutarara' }
        ]
      },
      { code: 'TET', name: 'Tete',
        cities: [
          { code: 'TET', name: 'Tete' },
          { code: 'ANG', name: 'Angónia' },
          { code: 'CASS', name: 'Cassula' },
          { code: 'CHI', name: 'Chiúta' },
          { code: 'MAC', name: 'Macanga' },
          { code: 'MOE', name: 'Moatize' },
          { code: 'MUT', name: 'Mutarara' },
          { code: 'TSAN', name: 'Tsangano' },
          { code: 'ZUM', name: 'Zumbo' },
          { code: 'MAG', name: 'Magoe' }
        ]
      },
      { code: 'NAM', name: 'Nampula',
        cities: [
          { code: 'NAM', name: 'Nampula' },
          { code: 'NAC', name: 'Nacala' },
          { code: 'MON', name: 'Monapo' },
          { code: 'ANG', name: 'Angoche' },
          { code: 'ILI', name: 'Ilha de Moçambique' },
          { code: 'MEM', name: 'Memba' },
          { code: 'MEC', name: 'Mecubúri' },
          { code: 'MOG', name: 'Mogincual' },
          { code: 'MOG2', name: 'Mogovolas' },
          { code: 'MUE', name: 'Muecate' }
        ]
      },
      { code: 'CAB', name: 'Cabo Delgado',
        cities: [
          { code: 'PEM', name: 'Pemba' },
          { code: 'MON', name: 'Montepuez' },
          { code: 'ANC', name: 'Ancuabe' },
          { code: 'BAL', name: 'Balama' },
          { code: 'CHI', name: 'Chiúre' },
          { code: 'IBO', name: 'Ibo' },
          { code: 'MAC', name: 'Macomia' },
          { code: 'MEC', name: 'Mecufi' },
          { code: 'MEL', name: 'Meluco' },
          { code: 'MOG', name: 'Mocímboa da Praia' }
        ]
      },
      { code: 'NIA', name: 'Niassa',
        cities: [
          { code: 'LIC', name: 'Lichinga' },
          { code: 'CUR', name: 'Cuamba' },
          { code: 'LICH', name: 'Lichinga' },
          { code: 'MAJ', name: 'Majune' },
          { code: 'MAND', name: 'Mandimba' },
          { code: 'MAT', name: 'Matama' },
          { code: 'MAU', name: 'Maua' },
          { code: 'MUE', name: 'Muembe' },
          { code: 'NGA', name: 'Ngoma' },
          { code: 'SANG', name: 'Sanga' }
        ]
      },
      { code: 'MAP2', name: 'Maputo Province',
        cities: [
          { code: 'MAP', name: 'Maputo' },
          { code: 'MAT', name: 'Matola' },
          { code: 'XAI', name: 'Xai-Xai' },
          { code: 'MAN', name: 'Manhica' },
          { code: 'MOA', name: 'Moamba' },
          { code: 'NAMA', name: 'Namaacha' },
          { code: 'SAB', name: 'Sabadura' },
          { code: 'BOA', name: 'Boane' },
          { code: 'MAG', name: 'Magude' },
          { code: 'PEM', name: 'Pemba' }
        ]
      },
      { code: 'MAT', name: 'Matola',
        cities: [
          { code: 'MAT', name: 'Matola' },
          { code: 'MAP', name: 'Maputo' },
          { code: 'XAI', name: 'Xai-Xai' },
          { code: 'MAN', name: 'Manhica' },
          { code: 'MOA', name: 'Moamba' },
          { code: 'NAMA', name: 'Namaacha' },
          { code: 'SAB', name: 'Sabadura' },
          { code: 'BOA', name: 'Boane' },
          { code: 'MAG', name: 'Magude' },
          { code: 'PEM', name: 'Pemba' }
        ]
      },
      { code: 'XAI', name: 'Xai-Xai',
        cities: [
          { code: 'XAI', name: 'Xai-Xai' },
          { code: 'MAP', name: 'Maputo' },
          { code: 'MAT', name: 'Matola' },
          { code: 'MAN', name: 'Manhica' },
          { code: 'MOA', name: 'Moamba' },
          { code: 'NAMA', name: 'Namaacha' },
          { code: 'SAB', name: 'Sabadura' },
          { code: 'BOA', name: 'Boane' },
          { code: 'MAG', name: 'Magude' },
          { code: 'PEM', name: 'Pemba' }
        ]
      },
      { code: 'MAN2', name: 'Manhica',
        cities: [
          { code: 'MAN', name: 'Manhica' },
          { code: 'MAP', name: 'Maputo' },
          { code: 'MAT', name: 'Matola' },
          { code: 'XAI', name: 'Xai-Xai' },
          { code: 'MOA', name: 'Moamba' },
          { code: 'NAMA', name: 'Namaacha' },
          { code: 'SAB', name: 'Sabadura' },
          { code: 'BOA', name: 'Boane' },
          { code: 'MAG', name: 'Magude' },
          { code: 'PEM', name: 'Pemba' }
        ]
      },
      { code: 'MOA', name: 'Moamba',
        cities: [
          { code: 'MOA', name: 'Moamba' },
          { code: 'MAP', name: 'Maputo' },
          { code: 'MAT', name: 'Matola' },
          { code: 'XAI', name: 'Xai-Xai' },
          { code: 'MAN', name: 'Manhica' },
          { code: 'NAMA', name: 'Namaacha' },
          { code: 'SAB', name: 'Sabadura' },
          { code: 'BOA', name: 'Boane' },
          { code: 'MAG', name: 'Magude' },
          { code: 'PEM', name: 'Pemba' }
        ]
      },
      { code: 'NAMA', name: 'Namaacha',
        cities: [
          { code: 'NAMA', name: 'Namaacha' },
          { code: 'MAP', name: 'Maputo' },
          { code: 'MAT', name: 'Matola' },
          { code: 'XAI', name: 'Xai-Xai' },
          { code: 'MAN', name: 'Manhica' },
          { code: 'MOA', name: 'Moamba' },
          { code: 'SAB', name: 'Sabadura' },
          { code: 'BOA', name: 'Boane' },
          { code: 'MAG', name: 'Magude' },
          { code: 'PEM', name: 'Pemba' }
        ]
      },
      { code: 'SAB', name: 'Sabadura',
        cities: [
          { code: 'SAB', name: 'Sabadura' },
          { code: 'MAP', name: 'Maputo' },
          { code: 'MAT', name: 'Matola' },
          { code: 'XAI', name: 'Xai-Xai' },
          { code: 'MAN', name: 'Manhica' },
          { code: 'MOA', name: 'Moamba' },
          { code: 'NAMA', name: 'Namaacha' },
          { code: 'BOA', name: 'Boane' },
          { code: 'MAG', name: 'Magude' },
          { code: 'PEM', name: 'Pemba' }
        ]
      },
      { code: 'BOA', name: 'Boane',
        cities: [
          { code: 'BOA', name: 'Boane' },
          { code: 'MAP', name: 'Maputo' },
          { code: 'MAT', name: 'Matola' },
          { code: 'XAI', name: 'Xai-Xai' },
          { code: 'MAN', name: 'Manhica' },
          { code: 'MOA', name: 'Moamba' },
          { code: 'NAMA', name: 'Namaacha' },
          { code: 'SAB', name: 'Sabadura' },
          { code: 'MAG', name: 'Magude' },
          { code: 'PEM', name: 'Pemba' }
        ]
      },
      { code: 'MAG', name: 'Magude',
        cities: [
          { code: 'MAG', name: 'Magude' },
          { code: 'MAP', name: 'Maputo' },
          { code: 'MAT', name: 'Matola' },
          { code: 'XAI', name: 'Xai-Xai' },
          { code: 'MAN', name: 'Manhica' },
          { code: 'MOA', name: 'Moamba' },
          { code: 'NAMA', name: 'Namaacha' },
          { code: 'SAB', name: 'Sabadura' },
          { code: 'BOA', name: 'Boane' },
          { code: 'PEM', name: 'Pemba' }
        ]
      },
      { code: 'PEM2', name: 'Pemba',
        cities: [
          { code: 'PEM', name: 'Pemba' },
          { code: 'MON', name: 'Montepuez' },
          { code: 'ANC', name: 'Ancuabe' },
          { code: 'BAL', name: 'Balama' },
          { code: 'CHI', name: 'Chiúre' },
          { code: 'IBO', name: 'Ibo' },
          { code: 'MAC', name: 'Macomia' },
          { code: 'MEC', name: 'Mecufi' },
          { code: 'MEL', name: 'Meluco' },
          { code: 'MOG', name: 'Mocímboa da Praia' }
        ]
      }
    ]
  };

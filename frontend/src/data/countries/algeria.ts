/**
 * Algeria country data with regions, cities, and tax information
 */

import { Country } from './index';

export const algeria: Country = {
    code: 'DZ',
    name: 'Algeria',
    taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'DZD', region: 'MEA' },
    provinces: [
      { code: 'ALG', name: 'Algiers',
        cities: [
          { code: 'ALG', name: 'Algiers' },
          { code: 'BAB', name: 'Bab Ezzouar' },
          { code: 'BIR', name: 'Birkhadem' },
          { code: 'BOU', name: 'Boumerdes' },
          { code: 'BLI', name: 'Blida' },
          { code: 'TIP', name: 'Tipaza' },
          { code: 'AIN', name: 'Ain Defla' },
          { code: 'CHL', name: 'Chlef' },
          { code: 'TIS', name: 'Tissemsilt' },
          { code: 'MED', name: 'Medea' }
        ]
      },
      { code: 'ORAN', name: 'Oran',
        cities: [
          { code: 'ORA', name: 'Oran' },
          { code: 'MOST', name: 'Mostaganem' },
          { code: 'MASC', name: 'Mascara' },
          { code: 'REL', name: 'Relizane' },
          { code: 'SIDI', name: 'Sidi Bel Abbès' },
          { code: 'TLE', name: 'Tlemcen' },
          { code: 'AIN2', name: 'Ain Temouchent' },
          { code: 'GHIL', name: 'Ghazaouet' },
          { code: 'BEN2', name: 'Beni Saf' },
          { code: 'SIDI2', name: 'Sidi M'hamed' }
        ]
      },
      { code: 'CONST', name: 'Constantine',
        cities: [
          { code: 'CON', name: 'Constantine' },
          { code: 'SKIK', name: 'Skikda' },
          { code: 'ANN', name: 'Annaba' },
          { code: 'GUEL', name: 'Guelma' },
          { code: 'SOUK', name: 'Souk Ahras' },
          { code: 'ELT', name: 'El Tarf' },
          { code: 'MILA', name: 'Mila' },
          { code: 'JIJ', name: 'Jijel' },
          { code: 'SET', name: 'Setif' },
          { code: 'BAT' name: 'Batna' }
        ]
      },
      { code: 'BLI', name: 'Blida',
        cities: [
          { code: 'BLI', name: 'Blida' },
          { code: 'ALG', name: 'Algiers' },
          { code: 'BAB', name: 'Bab Ezzouar' },
          { code: 'BIR', name: 'Birkhadem' },
          { code: 'BOU', name: 'Boumerdes' },
          { code: 'TIP', name: 'Tipaza' },
          { code: 'AIN', name: 'Ain Defla' },
          { code: 'CHL', name: 'Chlef' },
          { code: 'TIS', name: 'Tissemsilt' },
          { code: 'MED', name: 'Medea' }
        ]
      },
      { code: 'BOU', name: 'Boumerdes',
        cities: [
          { code: 'BOU', name: 'Boumerdes' },
          { code: 'ALG', name: 'Algiers' },
          { code: 'BAB', name: 'Bab Ezzouar' },
          { code: 'BIR', name: 'Birkhadem' },
          { code: 'BLI', name: 'Blida' },
          { code: 'TIP', name: 'Tipaza' },
          { code: 'AIN', name: 'Ain Defla' },
          { code: 'CHL', name: 'Chlef' },
          { code: 'TIS', name: 'Tissemsilt' },
          { code: 'MED', name: 'Medea' }
        ]
      },
      { code: 'TIP', name: 'Tipaza',
        cities: [
          { code: 'TIP', name: 'Tipaza' },
          { code: 'ALG', name: 'Algiers' },
          { code: 'BAB', name: 'Bab Ezzouar' },
          { code: 'BIR', name: 'Birkhadem' },
          { code: 'BOU', name: 'Boumerdes' },
          { code: 'BLI', name: 'Blida' },
          { code: 'AIN', name: 'Ain Defla' },
          { code: 'CHL', name: 'Chlef' },
          { code: 'TIS', name: 'Tissemsilt' },
          { code: 'MED', name: 'Medea' }
        ]
      },
      { code: 'AIN', name: 'Ain Defla',
        cities: [
          { code: 'AIN', name: 'Ain Defla' },
          { code: 'ALG', name: 'Algiers' },
          { code: 'BAB', name: 'Bab Ezzouar' },
          { code: 'BIR', name: 'Birkhadem' },
          { code: 'BOU', name: 'Boumerdes' },
          { code: 'BLI', name: 'Blida' },
          { code: 'TIP', name: 'Tipaza' },
          { code: 'CHL', name: 'Chlef' },
          { code: 'TIS', name: 'Tissemsilt' },
          { code: 'MED', name: 'Medea' }
        ]
      },
      { code: 'CHL', name: 'Chlef',
        cities: [
          { code: 'CHL', name: 'Chlef' },
          { code: 'ALG', name: 'Algiers' },
          { code: 'BAB', name: 'Bab Ezzouar' },
          { code: 'BIR', name: 'Birkhadem' },
          { code: 'BOU', name: 'Boumerdes' },
          { code: 'BLI', name: 'Blida' },
          { code: 'TIP', name: 'Tipaza' },
          { code: 'AIN', name: 'Ain Defla' },
          { code: 'TIS', name: 'Tissemsilt' },
          { code: 'MED', name: 'Medea' }
        ]
      },
      { code: 'TIS', name: 'Tissemsilt',
        cities: [
          { code: 'TIS', name: 'Tissemsilt' },
          { code: 'ALG', name: 'Algiers' },
          { code: 'BAB', name: 'Bab Ezzouar' },
          { code: 'BIR', name: 'Birkhadem' },
          { code: 'BOU', name: 'Boumerdes' },
          { code: 'BLI', name: 'Blida' },
          { code: 'TIP', name: 'Tipaza' },
          { code: 'AIN', name: 'Ain Defla' },
          { code: 'CHL', name: 'Chlef' },
          { code: 'MED', name: 'Medea' }
        ]
      },
      { code: 'MED', name: 'Medea',
        cities: [
          { code: 'MED', name: 'Medea' },
          { code: 'ALG', name: 'Algiers' },
          { code: 'BAB', name: 'Bab Ezzouar' },
          { code: 'BIR', name: 'Birkhadem' },
          { code: 'BOU', name: 'Boumerdes' },
          { code: 'BLI', name: 'Blida' },
          { code: 'TIP', name: 'Tipaza' },
          { code: 'AIN', name: 'Ain Defla' },
          { code: 'CHL', name: 'Chlef' },
          { code: 'TIS', name: 'Tissemsilt' }
        ]
      },
      { code: 'SET', name: 'Setif',
        cities: [
          { code: 'SET', name: 'Setif' },
          { code: 'CON', name: 'Constantine' },
          { code: 'SKIK', name: 'Skikda' },
          { code: 'ANN', name: 'Annaba' },
          { code: 'GUEL', name: 'Guelma' },
          { code: 'SOUK', name: 'Souk Ahras' },
          { code: 'ELT', name: 'El Tarf' },
          { code: 'MILA', name: 'Mila' },
          { code: 'JIJ', name: 'Jijel' },
          { code: 'BAT', name: 'Batna' }
        ]
      },
      { code: 'BAT', name: 'Batna',
        cities: [
          { code: 'BAT', name: 'Batna' },
          { code: 'CON', name: 'Constantine' },
          { code: 'SKIK', name: 'Skikda' },
          { code: 'ANN', name: 'Annaba' },
          { code: 'GUEL', name: 'Guelma' },
          { code: 'SOUK', name: 'Souk Ahras' },
          { code: 'ELT', name: 'El Tarf' },
          { code: 'MILA', name: 'Mila' },
          { code: 'JIJ', name: 'Jijel' },
          { code: 'SET', name: 'Setif' }
        ]
      },
      { code: 'ANN', name: 'Annaba',
        cities: [
          { code: 'ANN', name: 'Annaba' },
          { code: 'CON', name: 'Constantine' },
          { code: 'SKIK', name: 'Skikda' },
          { code: 'GUEL', name: 'Guelma' },
          { code: 'SOUK', name: 'Souk Ahras' },
          { code: 'ELT', name: 'El Tarf' },
          { code: 'MILA', name: 'Mila' },
          { code: 'JIJ', name: 'Jijel' },
          { code: 'SET', name: 'Setif' },
          { code: 'BAT', name: 'Batna' }
        ]
      },
      { code: 'SKIK', name: 'Skikda',
        cities: [
          { code: 'SKIK', name: 'Skikda' },
          { code: 'CON', name: 'Constantine' },
          { code: 'ANN', name: 'Annaba' },
          { code: 'GUEL', name: 'Guelma' },
          { code: 'SOUK', name: 'Souk Ahras' },
          { code: 'ELT', name: 'El Tarf' },
          { code: 'MILA', name: 'Mila' },
          { code: 'JIJ', name: 'Jijel' },
          { code: 'SET', name: 'Setif' },
          { code: 'BAT', name: 'Batna' }
        ]
      },
      { code: 'GUEL', name: 'Guelma',
        cities: [
          { code: 'GUEL', name: 'Guelma' },
          { code: 'CON', name: 'Constantine' },
          { code: 'SKIK', name: 'Skikda' },
          { code: 'ANN', name: 'Annaba' },
          { code: 'SOUK', name: 'Souk Ahras' },
          { code: 'ELT', name: 'El Tarf' },
          { code: 'MILA', name: 'Mila' },
          { code: 'JIJ', name: 'Jijel' },
          { code: 'SET', name: 'Setif' },
          { code: 'BAT', name: 'Batna' }
        ]
      },
      { code: 'SOUK', name: 'Souk Ahras',
        cities: [
          { code: 'SOUK', name: 'Souk Ahras' },
          { code: 'CON', name: 'Constantine' },
          { code: 'SKIK', name: 'Skikda' },
          { code: 'ANN', name: 'Annaba' },
          { code: 'GUEL', name: 'Guelma' },
          { code: 'ELT', name: 'El Tarf' },
          { code: 'MILA', name: 'Mila' },
          { code: 'JIJ', name: 'Jijel' },
          { code: 'SET', name: 'Setif' },
          { code: 'BAT', name: 'Batna' }
        ]
      },
      { code: 'ELT', name: 'El Tarf',
        cities: [
          { code: 'ELT', name: 'El Tarf' },
          { code: 'CON', name: 'Constantine' },
          { code: 'SKIK', name: 'Skikda' },
          { code: 'ANN', name: 'Annaba' },
          { code: 'GUEL', name: 'Guelma' },
          { code: 'SOUK', name: 'Souk Ahras' },
          { code: 'MILA', name: 'Mila' },
          { code: 'JIJ', name: 'Jijel' },
          { code: 'SET', name: 'Setif' },
          { code: 'BAT', name: 'Batna' }
        ]
      },
      { code: 'MILA', name: 'Mila',
        cities: [
          { code: 'MILA', name: 'Mila' },
          { code: 'CON', name: 'Constantine' },
          { code: 'SKIK', name: 'Skikda' },
          { code: 'ANN', name: 'Annaba' },
          { code: 'GUEL', name: 'Guelma' },
          { code: 'SOUK', name: 'Souk Ahras' },
          { code: 'ELT', name: 'El Tarf' },
          { code: 'JIJ', name: 'Jijel' },
          { code: 'SET', name: 'Setif' },
          { code: 'BAT', name: 'Batna' }
        ]
      },
      { code: 'JIJ', name: 'Jijel',
        cities: [
          { code: 'JIJ', name: 'Jijel' },
          { code: 'CON', name: 'Constantine' },
          { code: 'SKIK', name: 'Skikda' },
          { code: 'ANN', name: 'Annaba' },
          { code: 'GUEL', name: 'Guelma' },
          { code: 'SOUK', name: 'Souk Ahras' },
          { code: 'ELT', name: 'El Tarf' },
          { code: 'MILA', name: 'Mila' },
          { code: 'SET', name: 'Setif' },
          { code: 'BAT', name: 'Batna' }
        ]
      },
      { code: 'BISK', name: 'Biskra',
        cities: [
          { code: 'BISK', name: 'Biskra' },
          { code: 'TOU', name: 'Touggourt' },
          { code: 'OUAR', name: 'Ouargla' },
          { code: 'EL', name: 'El Oued' },
          { code: 'KHAN', name: 'Khenchela' },
          { code: 'MSI', name: 'Msila' },
          { code: 'DJEL', name: 'Djelfa' },
          { code: 'LAG', name: 'Laghouat' },
          { code: 'GAR', name: 'Ghardaia' },
          { code: 'TIM', name: 'Timimoun' }
        ]
      },
      { code: 'TOU', name: 'Touggourt',
        cities: [
          { code: 'TOU', name: 'Touggourt' },
          { code: 'BISK', name: 'Biskra' },
          { code: 'OUAR', name: 'Ouargla' },
          { code: 'EL', name: 'El Oued' },
          { code: 'KHAN', name: 'Khenchela' },
          { code: 'MSI', name: 'Msila' },
          { code: 'DJEL', name: 'Djelfa' },
          { code: 'LAG', name: 'Laghouat' },
          { code: 'GAR', name: 'Ghardaia' },
          { code: 'TIM', name: 'Timimoun' }
        ]
      },
      { code: 'OUAR', name: 'Ouargla',
        cities: [
          { code: 'OUAR', name: 'Ouargla' },
          { code: 'BISK', name: 'Biskra' },
          { code: 'TOU', name: 'Touggourt' },
          { code: 'EL', name: 'El Oued' },
          { code: 'KHAN', name: 'Khenchela' },
          { code: 'MSI', name: 'Msila' },
          { code: 'DJEL', name: 'Djelfa' },
          { code: 'LAG', name: 'Laghouat' },
          { code: 'GAR', name: 'Ghardaia' },
          { code: 'TIM', name: 'Timimoun' }
        ]
      },
      { code: 'EL', name: 'El Oued',
        cities: [
          { code: 'EL', name: 'El Oued' },
          { code: 'BISK', name: 'Biskra' },
          { code: 'TOU', name: 'Touggourt' },
          { code: 'OUAR', name: 'Ouargla' },
          { code: 'KHAN', name: 'Khenchela' },
          { code: 'MSI', name: 'Msila' },
          { code: 'DJEL', name: 'Djelfa' },
          { code: 'LAG', name: 'Laghouat' },
          { code: 'GAR', name: 'Ghardaia' },
          { code: 'TIM', name: 'Timimoun' }
        ]
      },
      { code: 'KHAN', name: 'Khenchela',
        cities: [
          { code: 'KHAN', name: 'Khenchela' },
          { code: 'BISK', name: 'Biskra' },
          { code: 'TOU', name: 'Touggourt' },
          { code: 'OUAR', name: 'Ouargla' },
          { code: 'EL', name: 'El Oued' },
          { code: 'MSI', name: 'Msila' },
          { code: 'DJEL', name: 'Djelfa' },
          { code: 'LAG', name: 'Laghouat' },
          { code: 'GAR', name: 'Ghardaia' },
          { code: 'TIM', name: 'Timimoun' }
        ]
      },
      { code: 'MSI', name: 'Msila',
        cities: [
          { code: 'MSI', name: 'Msila' },
          { code: 'BISK', name: 'Biskra' },
          { code: 'TOU', name: 'Touggourt' },
          { code: 'OUAR', name: 'Ouargla' },
          { code: 'EL', name: 'El Oued' },
          { code: 'KHAN', name: 'Khenchela' },
          { code: 'DJEL', name: 'Djelfa' },
          { code: 'LAG', name: 'Laghouat' },
          { code: 'GAR', name: 'Ghardaia' },
          { code: 'TIM', name: 'Timimoun' }
        ]
      },
      { code: 'DJEL', name: 'Djelfa',
        cities: [
          { code: 'DJEL', name: 'Djelfa' },
          { code: 'BISK', name: 'Biskra' },
          { code: 'TOU', name: 'Touggourt' },
          { code: 'OUAR', name: 'Ouargla' },
          { code: 'EL', name: 'El Oued' },
          { code: 'KHAN', name: 'Khenchela' },
          { code: 'MSI', name: 'Msila' },
          { code: 'LAG', name: 'Laghouat' },
          { code: 'GAR', name: 'Ghardaia' },
          { code: 'TIM', name: 'Timimoun' }
        ]
      },
      { code: 'LAG', name: 'Laghouat',
        cities: [
          { code: 'LAG', name: 'Laghouat' },
          { code: 'BISK', name: 'Biskra' },
          { code: 'TOU', name: 'Touggourt' },
          { code: 'OUAR', name: 'Ouargla' },
          { code: 'EL', name: 'El Oued' },
          { code: 'KHAN', name: 'Khenchela' },
          { code: 'MSI', name: 'Msila' },
          { code: 'DJEL', name: 'Djelfa' },
          { code: 'GAR', name: 'Ghardaia' },
          { code: 'TIM', name: 'Timimoun' }
        ]
      },
      { code: 'GAR', name: 'Ghardaia',
        cities: [
          { code: 'GAR', name: 'Ghardaia' },
          { code: 'BISK', name: 'Biskra' },
          { code: 'TOU', name: 'Touggourt' },
          { code: 'OUAR', name: 'Ouargla' },
          { code: 'EL', name: 'El Oued' },
          { code: 'KHAN', name: 'Khenchela' },
          { code: 'MSI', name: 'Msila' },
          { code: 'DJEL', name: 'Djelfa' },
          { code: 'LAG', name: 'Laghouat' },
          { code: 'TIM', name: 'Timimoun' }
        ]
      },
      { code: 'TIM', name: 'Timimoun',
        cities: [
          { code: 'TIM', name: 'Timimoun' },
          { code: 'BISK', name: 'Biskra' },
          { code: 'TOU', name: 'Touggourt' },
          { code: 'OUAR', name: 'Ouargla' },
          { code: 'EL', name: 'El Oued' },
          { code: 'KHAN', name: 'Khenchela' },
          { code: 'MSI', name: 'Msila' },
          { code: 'DJEL', name: 'Djelfa' },
          { code: 'LAG', name: 'Laghouat' },
          { code: 'GAR', name: 'Ghardaia' }
        ]
      },
      { code: 'TAM', name: 'Tamanrasset',
        cities: [
          { code: 'TAM', name: 'Tamanrasset' },
          { code: 'ILL', name: 'Illizi' },
          { code: 'DJA', name: 'Djanet' },
          { code: 'BOR', name: 'Bordj Badji Mokhtar' },
          { code: 'IN', name: 'In Salah' },
          { code: 'AD', name: 'Adrar' },
          { code: 'TIMI', name: 'Timimoun' },
          { code: 'OUED', name: 'Oued Rhiou' },
          { code: 'AOU', name: 'Aoulef' },
          { code: 'REG', name: 'Reggane' }
        ]
      },
      { code: 'ILL', name: 'Illizi',
        cities: [
          { code: 'ILL', name: 'Illizi' },
          { code: 'TAM', name: 'Tamanrasset' },
          { code: 'DJA', name: 'Djanet' },
          { code: 'BOR', name: 'Bordj Badji Mokhtar' },
          { code: 'IN', name: 'In Salah' },
          { code: 'AD', name: 'Adrar' },
          { code: 'TIMI', name: 'Timimoun' },
          { code: 'OUED', name: 'Oued Rhiou' },
          { code: 'AOU', name: 'Aoulef' },
          { code: 'REG', name: 'Reggane' }
        ]
      },
      { code: 'DJA', name: 'Djanet',
        cities: [
          { code: 'DJA', name: 'Djanet' },
          { code: 'TAM', name: 'Tamanrasset' },
          { code: 'ILL', name: 'Illizi' },
          { code: 'BOR', name: 'Bordj Badji Mokhtar' },
          { code: 'IN', name: 'In Salah' },
          { code: 'AD', name: 'Adrar' },
          { code: 'TIMI', name: 'Timimoun' },
          { code: 'OUED', name: 'Oued Rhiou' },
          { code: 'AOU', name: 'Aoulef' },
          { code: 'REG', name: 'Reggane' }
        ]
      },
      { code: 'BOR', name: 'Bordj Badji Mokhtar',
        cities: [
          { code: 'BOR', name: 'Bordj Badji Mokhtar' },
          { code: 'TAM', name: 'Tamanrasset' },
          { code: 'ILL', name: 'Illizi' },
          { code: 'DJA', name: 'Djanet' },
          { code: 'IN', name: 'In Salah' },
          { code: 'AD', name: 'Adrar' },
          { code: 'TIMI', name: 'Timimoun' },
          { code: 'OUED', name: 'Oued Rhiou' },
          { code: 'AOU', name: 'Aoulef' },
          { code: 'REG', name: 'Reggane' }
        ]
      },
      { code: 'IN', name: 'In Salah',
        cities: [
          { code: 'IN', name: 'In Salah' },
          { code: 'TAM', name: 'Tamanrasset' },
          { code: 'ILL', name: 'Illizi' },
          { code: 'DJA', name: 'Djanet' },
          { code: 'BOR', name: 'Bordj Badji Mokhtar' },
          { code: 'AD', name: 'Adrar' },
          { code: 'TIMI', name: 'Timimoun' },
          { code: 'OUED', name: 'Oued Rhiou' },
          { code: 'AOU', name: 'Aoulef' },
          { code: 'REG', name: 'Reggane' }
        ]
      },
      { code: 'AD', name: 'Adrar',
        cities: [
          { code: 'AD', name: 'Adrar' },
          { code: 'TAM', name: 'Tamanrasset' },
          { code: 'ILL', name: 'Illizi' },
          { code: 'DJA', name: 'Djanet' },
          { code: 'BOR', name: 'Bordj Badji Mokhtar' },
          { code: 'IN', name: 'In Salah' },
          { code: 'TIMI', name: 'Timimoun' },
          { code: 'OUED', name: 'Oued Rhiou' },
          { code: 'AOU', name: 'Aoulef' },
          { code: 'REG', name: 'Reggane' }
        ]
      },
      { code: 'TIMI', name: 'Timimoun',
        cities: [
          { code: 'TIMI', name: 'Timimoun' },
          { code: 'TAM', name: 'Tamanrasset' },
          { code: 'ILL', name: 'Illizi' },
          { code: 'DJA', name: 'Djanet' },
          { code: 'BOR', name: 'Bordj Badji Mokhtar' },
          { code: 'IN', name: 'In Salah' },
          { code: 'AD', name: 'Adrar' },
          { code: 'OUED', name: 'Oued Rhiou' },
          { code: 'AOU', name: 'Aoulef' },
          { code: 'REG', name: 'Reggane' }
        ]
      },
      { code: 'OUED', name: 'Oued Rhiou',
        cities: [
          { code: 'OUED', name: 'Oued Rhiou' },
          { code: 'TAM', name: 'Tamanrasset' },
          { code: 'ILL', name: 'Illizi' },
          { code: 'DJA', name: 'Djanet' },
          { code: 'BOR', name: 'Bordj Badji Mokhtar' },
          { code: 'IN', name: 'In Salah' },
          { code: 'AD', name: 'Adrar' },
          { code: 'TIMI', name: 'Timimoun' },
          { code: 'AOU', name: 'Aoulef' },
          { code: 'REG', name: 'Reggane' }
        ]
      },
      { code: 'AOU', name: 'Aoulef',
        cities: [
          { code: 'AOU', name: 'Aoulef' },
          { code: 'TAM', name: 'Tamanrasset' },
          { code: 'ILL', name: 'Illizi' },
          { code: 'DJA', name: 'Djanet' },
          { code: 'BOR', name: 'Bordj Badji Mokhtar' },
          { code: 'IN', name: 'In Salah' },
          { code: 'AD', name: 'Adrar' },
          { code: 'TIMI', name: 'Timimoun' },
          { code: 'OUED', name: 'Oued Rhiou' },
          { code: 'REG', name: 'Reggane' }
        ]
      },
      { code: 'REG', name: 'Reggane',
        cities: [
          { code: 'REG', name: 'Reggane' },
          { code: 'TAM', name: 'Tamanrasset' },
          { code: 'ILL', name: 'Illizi' },
          { code: 'DJA', name: 'Djanet' },
          { code: 'BOR', name: 'Bordj Badji Mokhtar' },
          { code: 'IN', name: 'In Salah' },
          { code: 'AD', name: 'Adrar' },
          { code: 'TIMI', name: 'Timimoun' },
          { code: 'OUED', name: 'Oued Rhiou' },
          { code: 'AOU', name: 'Aoulef' }
        ]
      }
    ]
  };

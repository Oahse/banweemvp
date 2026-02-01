/**
 * Sri Lanka country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const sriLanka: Country = {
    code: 'LK',
    name: 'Sri Lanka',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'LKR', region: 'APAC' },
    provinces: [
      { code: 'WEST', name: 'Western Province',
        cities: [
          { code: 'COLOMBO', name: 'Colombo' },
          { code: 'KANDY', name: 'Kandy' },
          { code: 'GALLE', name: 'Galle' },
          { code: 'JAFFNA', name: 'Jaffna' },
          { code: 'NEGOMBO', name: 'Negombo' },
          { code: 'KALUTARA', name: 'Kaluutara' },
          { code: 'ANURADHAPURA', name: 'Anuradhapura' },
          { code: 'TRINCOMALEE', name: 'Trincomalee' },
          { code: 'BATTICALOA', name: 'Batticaloa' },
          { code: 'MATARA', name: 'Matara' }
        ]
      },
      { code: 'CENTRAL', name: 'Central Province',
        cities: [
          { code: 'KANDY', name: 'Kandy' },
          { code: 'NUWARA', name: 'Nuwara Eliya' },
          { code: 'MATALE', name: 'Matale' },
          { code: 'BADULLA', name: 'Badulla' },
          { code: 'MONARAGALA', name: 'Monaragala' },
          { code: 'POLONNARUWA', name: 'Polonnaruwa' },
          { code: 'AMPARA', name: 'Ampara' },
          { code: 'HAMBANTOTA', name: 'Hambantota' },
          { code: 'RATNAPURA', name: 'Ratnapura' },
          { code: 'KEGALLE', name: 'Kegalle' }
        ]
      },
      { code: 'SOUTHERN', name: 'Southern Province',
        cities: [
          { code: 'GALLE', name: 'Galle' },
          { code: 'MATARA', name: 'Matara' },
          { code: 'HAMBANTOTA', name: 'Hambantota' },
          { code: 'TANGALLE', name: 'Tangalle' },
          { code: 'MIRISSA', name: 'Mirissa' },
          { code: 'UNAWATUNA', name: 'Unawatuna' },
          { code: 'WELIGAMA', name: 'Weligama' },
          { code: 'AHANGAMA', name: 'Ahangama' },
          { code: 'DICKWELLA', name: 'Dickwella' },
          { code: 'MATARA2', name: 'Matara' }
        ]
      },
      { code: 'NORTHERN', name: 'Northern Province',
        cities: [
          { code: 'JAFFNA', name: 'Jaffna' },
          { code: 'KILINOCHCHI', name: 'Kilinochchi' },
          { code: 'MANNAR', name: 'Mannar' },
          { code: 'VAVUNIYA', name: 'Vavuniya' },
          { code: 'MULLAITIVU', name: 'Mullaitivu' },
          { code: 'JAFFNA2', name: 'Jaffna' },
          { code: 'KILINOCHCHI2', name: 'Kilinochchi' },
          { code: 'MANNAR2', name: 'Mannar' },
          { code: 'VAVUNIYA2', name: 'Vavuniya' },
          { code: 'MULLAITIVU2', name: 'Mullaitivu' }
        ]
      },
      { code: 'EASTERN', name: 'Eastern Province',
        cities: [
          { code: 'TRINCOMALEE', name: 'Trincomalee' },
          { code: 'BATTICALOA', name: 'Batticaloa' },
          { code: 'AMPARA', name: 'Ampara' },
          { code: 'KALMUNAI', name: 'Kalmunai' },
          { code: 'ERAVUR', name: 'Eravur' },
          { code: 'POTUVIL', name: 'Potuvil' },
          { code: 'TRINCOMALEE2', name: 'Trincomalee' },
          { code: 'BATTICALOA2', name: 'Batticaloa' },
          { code: 'AMPARA2', name: 'Ampara' },
          { code: 'KALMUNAI2', name: 'Kalmunai' }
        ]
      },
      { code: 'NORTHWEST', name: 'North Western Province',
        cities: [
          { code: 'KURUNEGALA', name: 'Kurunegala' },
          { code: 'PUTTALAM', name: 'Puttalam' },
          { code: 'CHILAW', name: 'Chilaw' },
          { code: 'NEGOMBO', name: 'Negombo' },
          { code: 'JAFFNA', name: 'Jaffna' },
          { code: 'KALUTARA', name: 'Kaluutara' },
          { code: 'GAMPOLA', name: 'Gampola' },
          { code: 'GALLE', name: 'Galle' },
          { code: 'MATARA', name: 'Matara' },
          { code: 'HAMBANTOTA', name: 'Hambantota' }
        ]
      },
      { code: 'NORTH', name: 'North Central Province',
        cities: [
          { code: 'ANURADHAPURA', name: 'Anuradhapura' },
          { code: 'POLONNARUWA', name: 'Polonnaruwa' },
          { code: 'DAMBULLA', name: 'Dambulla' },
          { code: 'MATALE', name: 'Matale' },
          { code: 'NUWARA', name: 'Nuwara Eliya' },
          { code: 'BADULLA', name: 'Badulla' },
          { code: 'MONARAGALA', name: 'Monaragala' },
          { code: 'AMPARA', name: 'Ampara' },
          { code: 'HAMBANTOTA', name: 'Hambantota' },
          { code: 'TRINCOMALEE', name: 'Trincomalee' }
        ],
      },
      { code: 'UVA', name: 'Uva Province',
        cities: [
          { code: 'BADULLA', name: 'Badulla' },
          { code: 'MONARAGALA', name: 'Monaragala' },
          { code: 'BANDARAWELA', name: 'Bandarawela' },
          { code: 'WELIMADA', name: 'Welimada' },
          { code: 'HAPUTALE', name: 'Haputale' },
          { code: 'DIYATALAWA', name: 'Diyatalawa' },
          { code: 'WELIMADA2', name: 'Welimada' },
          { code: 'HAPUTALE2', name: 'Haputale' },
          { code: 'BANDARAWELA2', name: 'Bandarawela' },
          { code: 'BADULLA2', name: 'Badulla' }
        ],
      },
      { code: 'SABARAGAMUWA', name: 'Sabaragamuwa Province',
        cities: [
          { code: 'RATNAPURA', name: 'Ratnapura' },
          { code: 'KEGALLE', name: 'Kegalle' },
          { code: 'BALANGODA', name: 'Balangoda' },
          { code: 'EMBILIPITIYA', name: 'Embilipitiya' },
          { code: 'RATNAPURA2', name: 'Ratnapura' },
          { code: 'KEGALLE2', name: 'Kegalle' },
          { code: 'BALANGODA2', name: 'Balangoda' },
          { code: 'EMBILIPITIYA2', name: 'Embilipitiya' },
          { code: 'RATNAPURA3', name: 'Ratnapura' },
          { code: 'KEGALLE3', name: 'Kegalle' }
        ]
      }
    ]
};

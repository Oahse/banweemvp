/**
 * Bangladesh country data with divisions, cities, and tax information
 */

import { Country } from './index';

export const bangladesh: Country = {
    code: 'BD',
    name: 'Bangladesh',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'BDT', region: 'APAC' },
    provinces: [
      { code: 'DHK', name: 'Dhaka',
        cities: [
          { code: 'DHAKA', name: 'Dhaka' },
          { code: 'GULSHAN', name: 'Gulshan' },
          { code: 'BANANI', name: 'Banani' },
          { code: 'MIRPUR', name: 'Mirpur' },
          { code: 'UTTARA', name: 'Uttara' },
          { code: 'MOHAMMADPUR', name: 'Mohammadpur' },
          { code: 'TEJGAON', name: 'Tejgaon' },
          { code: 'OLD', name: 'Old Dhaka' },
          { code: 'DHANMONDI', name: 'Dhanmondi' },
          { code: 'MOTIJHEEL', name: 'Motijheel' }
        ]
      },
      { code: 'CTG', name: 'Chattogram',
        cities: [
          { code: 'CHITTAGONG', name: 'Chattogram' },
          { code: 'PATENGA', name: 'Patenga' },
          { code: 'KARNAPHULI', name: 'Karnaphuli' },
          { code: 'BAYAZID', name: 'Bayazid' },
          { code: 'PANCHLAISH', name: 'Panchlaish' },
          { code: 'DOUBLE', name: 'Double Mooring' },
          { code: 'HALISHAHAR', name: 'Halishahar' },
          { code: 'CHANDGAON', name: 'Chandgaon' },
          { code: 'BANDAR', name: 'Bandar' },
          { code: 'SITAKUNDA', name: 'Sitakunda' }
        ]
      },
      { code: 'KHL', name: 'Khulna',
        cities: [
          { code: 'KHULNA', name: 'Khulna' },
          { code: 'KHALISHPUR', name: 'Khalishpur' },
          { code: 'DHUMPA', name: 'Dhumpara' },
          { code: 'SONADANGA', name: 'Sonadanga' },
          { code: 'PHULTALA', name: 'Phultala' },
          { code: 'RUPSHA', name: 'Rupsha' },
          { code: 'TEROKHADA', name: 'Terokhada' },
          { code: 'DUMURIA', name: 'Dumuria' },
          { code: 'DIGHALIA', name: 'Dighalia' },
          { code: 'PAIKGACHHA', name: 'Paikgachha' }
        ]
      },
      { code: 'RAJ', name: 'Rajshahi',
        cities: [
          { code: 'RAJSHAHI', name: 'Rajshahi' },
          { code: 'BOGRA', name: 'Bogra' },
          { code: 'PABNA', name: 'Pabna' },
          { code: 'SIRAJGANJ', name: 'Sirajganj' },
          { code: 'NATORE', name: 'Natore' },
          { code: 'CHAPAI', name: 'Chapai' },
          { code: 'NAWABGANJ', name: 'Nawabganj' },
          { code: 'JOYPURHAT', name: 'Joypurhat' },
          { code: 'GAIBANDHA', name: 'Gaibandha' },
          { code: 'KURIGRAM', name: 'Kurigram' }
        ]
      },
      { code: 'SYL', name: 'Sylhet',
        cities: [
          { code: 'SYLHET', name: 'Sylhet' },
          { code: 'MOULVIBAZAR', name: 'Moulvibazar' },
          { code: 'HABIGANJ', name: 'Habiganj' },
          { code: 'SUNAMGANJ', name: 'Sunamganj' },
          { code: 'BISHWANATH', name: 'Bishwanath' },
          { code: 'BIJNAGAR', name: 'Bijonagar' },
          { code: 'GOALBAGH', name: 'Goalbazar' },
          { code: 'BALAGANJ', name: 'Balaganj' },
          { code: 'JAKIGANJ', name: 'Jakiganj' },
          { code: 'BARLEKHA', name: 'Barlekha' }
        ]
      },
      { code: 'BAR', name: 'Barishal',
        cities: [
          { code: 'BARISHAL', name: 'Barishal' },
          { code: 'BHOLA', name: 'Bhola' },
          { code: 'PATUAKHALI', name: 'Patuakhali' },
          { code: 'PIROJPUR', name: 'Pirojpur' },
          { code: 'JHALOKATHI', name: 'Jhalokathi' },
          { code: 'BAUHALI', name: 'Bauhali' },
          { code: 'BARGUNA', name: 'Barguna' },
          { code: 'MULADI', name: 'Muladi' },
          { code: 'METHUK', name: 'Methuk' },
          { code: 'RAJAPUR', name: 'Rajapur' }
        ]
      },
      { code: 'RNG', name: 'Rangpur',
        cities: [
          { code: 'RANGPUR', name: 'Rangpur' },
          { code: 'DINAJPUR', name: 'Dinajpur' },
          { code: 'GAIBANDHA', name: 'Gaibandha' },
          { code: 'KURIGRAM', name: 'Kurigram' },
          { code: 'LALMONIRHAT', name: 'Lalmonirhat' },
          { code: 'NILPHAMARI', name: 'Nilphamari' },
          { code: 'PANCHAGARH', name: 'Panchagarh' },
          { code: 'THAKURGAON', name: 'Thakurgaon' },
          { code: 'RANGPUR2', name: 'Rangpur' },
          { code: 'DINAJPUR2', name: 'Dinajpur' }
        ]
      },
      { code: 'MYM', name: 'Mymensingh',
        cities: [
          { code: 'MYMENSINGH', name: 'Mymensingh' },
          { code: 'NETRAKONA', name: 'Netrokona' },
          { code: 'JAMALPUR', name: 'Jamalpur' },
          { code: 'SHERPUR', name: 'Sherpur' },
          { code: 'KISHOREGANJ', name: 'Kishoreganj' },
          { code: 'MYMENSINGH2', name: 'Mymensingh' },
          { code: 'NETRAKONA2', name: 'Netrokona' },
          { code: 'JAMALPUR2', name: 'Jamalpur' },
          { code: 'SHERPUR2', name: 'Sherpur' },
          { code: 'KISHOREGANJ2', name: 'Kishoreganj' }
        ]
      }
    ]
};

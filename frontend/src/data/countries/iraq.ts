/**
 * Iraq country data with regions, cities, and tax information
 */

import { Country } from './index';

export const iraq: Country = {
    code: 'IQ',
    name: 'Iraq',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'IQD', region: 'MEA' },
    provinces: [
      { code: 'BAG', name: 'Baghdad',
        cities: [
          { code: 'BAG', name: 'Baghdad' },
          { code: 'KAR', name: 'Karbala' },
          { code: 'NAJ', name: 'Najaf' },
          { code: 'KER', name: 'Kerbala' },
          { code: 'HIL', name: 'Hilla' },
          { code: 'KUT', name: 'Kut' },
          { code: 'DIW', name: 'Diwaniya' },
          { code: 'SAM', name: 'Samarra' },
          { code: 'TIK', name: 'Tikrit' },
          { code: 'FAL', name: 'Fallujah' }
        ]
      },
      { code: 'BAS', name: 'Basra',
        cities: [
          { code: 'BAS', name: 'Basra' },
          { code: 'NAS', name: 'Nasiriyah' },
          { code: 'AM', name: 'Amarah' },
          { code: 'KUT', name: 'Kut' },
          { code: 'DIW', name: 'Diwaniya' },
          { code: 'SAM', name: 'Samarra' },
          { code: 'TIK', name: 'Tikrit' },
          { code: 'FAL', name: 'Fallujah' },
          { code: 'RAM', name: 'Ramadi' },
          { code: 'HAD', name: 'Haditha' }
        ]
      },
      { code: 'MOS', name: 'Mosul',
        cities: [
          { code: 'MOS', name: 'Mosul' },
          { code: 'ERB', name: 'Erbil' },
          { code: 'SUL', name: 'Sulaymaniyah' },
          { code: 'DOH', name: 'Dohuk' },
          { code: 'ZAK', name: 'Zakho' },
          { code: 'AK', name: 'Akre' },
          { code: 'SHE', name: 'Shekhan' },
          { code: 'SIN', name: 'Sinjar' },
          { code: 'TEL', name: 'Tel Afar' },
          { code: 'AL', name: 'Alqosh' }
        ]
      },
      { code: 'ERB', name: 'Erbil',
        cities: [
          { code: 'ERB', name: 'Erbil' },
          { code: 'MOS', name: 'Mosul' },
          { code: 'SUL', name: 'Sulaymaniyah' },
          { code: 'DOH', name: 'Dohuk' },
          { code: 'ZAK', name: 'Zakho' },
          { code: 'AK', name: 'Akre' },
          { code: 'SHE', name: 'Shekhan' },
          { code: 'SIN', name: 'Sinjar' },
          { code: 'TEL', name: 'Tel Afar' },
          { code: 'AL', name: 'Alqosh' }
        ]
      },
      { code: 'SUL', name: 'Sulaymaniyah',
        cities: [
          { code: 'SUL', name: 'Sulaymaniyah' },
          { code: 'ERB', name: 'Erbil' },
          { code: 'MOS', name: 'Mosul' },
          { code: 'DOH', name: 'Dohuk' },
          { code: 'ZAK', name: 'Zakho' },
          { code: 'AK', name: 'Akre' },
          { code: 'SHE', name: 'Shekhan' },
          { code: 'SIN', name: 'Sinjar' },
          { code: 'TEL', name: 'Tel Afar' },
          { code: 'AL', name: 'Alqosh' }
        ]
      },
      { code: 'DOH', name: 'Dohuk',
        cities: [
          { code: 'DOH', name: 'Dohuk' },
          { code: 'MOS', name: 'Mosul' },
          { code: 'ERB', name: 'Erbil' },
          { code: 'SUL', name: 'Sulaymaniyah' },
          { code: 'ZAK', name: 'Zakho' },
          { code: 'AK', name: 'Akre' },
          { code: 'SHE', name: 'Shekhan' },
          { code: 'SIN', name: 'Sinjar' },
          { code: 'TEL', name: 'Tel Afar' },
          { code: 'AL', name: 'Alqosh' }
        ]
      },
      { code: 'ZAK', name: 'Zakho',
        cities: [
          { code: 'ZAK', name: 'Zakho' },
          { code: 'MOS', name: 'Mosul' },
          { code: 'ERB', name: 'Erbil' },
          { code: 'SUL', name: 'Sulaymaniyah' },
          { code: 'DOH', name: 'Dohuk' },
          { code: 'AK', name: 'Akre' },
          { code: 'SHE', name: 'Shekhan' },
          { code: 'SIN', name: 'Sinjar' },
          { code: 'TEL', name: 'Tel Afar' },
          { code: 'AL', name: 'Alqosh' }
        ]
      },
      { code: 'AK', name: 'Akre',
        cities: [
          { code: 'AK', name: 'Akre' },
          { code: 'MOS', name: 'Mosul' },
          { code: 'ERB', name: 'Erbil' },
          { code: 'SUL', name: 'Sulaymaniyah' },
          { code: 'DOH', name: 'Dohuk' },
          { code: 'ZAK', name: 'Zakho' },
          { code: 'SHE', name: 'Shekhan' },
          { code: 'SIN', name: 'Sinjar' },
          { code: 'TEL', name: 'Tel Afar' },
          { code: 'AL', name: 'Alqosh' }
        ]
      },
      { code: 'SHE', name: 'Shekhan',
        cities: [
          { code: 'SHE', name: 'Shekhan' },
          { code: 'MOS', name: 'Mosul' },
          { code: 'ERB', name: 'Erbil' },
          { code: 'SUL', name: 'Sulaymaniyah' },
          { code: 'DOH', name: 'Dohuk' },
          { code: 'ZAK', name: 'Zakho' },
          { code: 'AK', name: 'Akre' },
          { code: 'SIN', name: 'Sinjar' },
          { code: 'TEL', name: 'Tel Afar' },
          { code: 'AL', name: 'Alqosh' }
        ]
      },
      { code: 'SIN', name: 'Sinjar',
        cities: [
          { code: 'SIN', name: 'Sinjar' },
          { code: 'MOS', name: 'Mosul' },
          { code: 'ERB', name: 'Erbil' },
          { code: 'SUL', name: 'Sulaymaniyah' },
          { code: 'DOH', name: 'Dohuk' },
          { code: 'ZAK', name: 'Zakho' },
          { code: 'AK', name: 'Akre' },
          { code: 'SHE', name: 'Shekhan' },
          { code: 'TEL', name: 'Tel Afar' },
          { code: 'AL', name: 'Alqosh' }
        ]
      },
      { code: 'TEL', name: 'Tel Afar',
        cities: [
          { code: 'TEL', name: 'Tel Afar' },
          { code: 'MOS', name: 'Mosul' },
          { code: 'ERB', name: 'Erbil' },
          { code: 'SUL', name: 'Sulaymaniyah' },
          { code: 'DOH', name: 'Dohuk' },
          { code: 'ZAK', name: 'Zakho' },
          { code: 'AK', name: 'Akre' },
          { code: 'SHE', name: 'Shekhan' },
          { code: 'SIN', name: 'Sinjar' },
          { code: 'AL', name: 'Alqosh' }
        ]
      },
      { code: 'AL', name: 'Alqosh',
        cities: [
          { code: 'AL', name: 'Alqosh' },
          { code: 'MOS', name: 'Mosul' },
          { code: 'ERB', name: 'Erbil' },
          { code: 'SUL', name: 'Sulaymaniyah' },
          { code: 'DOH', name: 'Dohuk' },
          { code: 'ZAK', name: 'Zakho' },
          { code: 'AK', name: 'Akre' },
          { code: 'SHE', name: 'Shekhan' },
          { code: 'SIN', name: 'Sinjar' },
          { code: 'TEL', name: 'Tel Afar' }
        ]
      },
      { code: 'KAR', name: 'Karbala',
        cities: [
          { code: 'KAR', name: 'Karbala' },
          { code: 'NAJ', name: 'Najaf' },
          { code: 'KER', name: 'Kerbala' },
          { code: 'HIL', name: 'Hilla' },
          { code: 'KUT', name: 'Kut' },
          { code: 'DIW', name: 'Diwaniya' },
          { code: 'SAM', name: 'Samarra' },
          { code: 'TIK', name: 'Tikrit' },
          { code: 'FAL', name: 'Fallujah' },
          { code: 'RAM', name: 'Ramadi' }
        ]
      },
      { code: 'NAJ', name: 'Najaf',
        cities: [
          { code: 'NAJ', name: 'Najaf' },
          { code: 'KAR', name: 'Karbala' },
          { code: 'KER', name: 'Kerbala' },
          { code: 'HIL', name: 'Hilla' },
          { code: 'KUT', name: 'Kut' },
          { code: 'DIW', name: 'Diwaniya' },
          { code: 'SAM', name: 'Samarra' },
          { code: 'TIK', name: 'Tikrit' },
          { code: 'FAL', name: 'Fallujah' },
          { code: 'RAM', name: 'Ramadi' }
        ]
      },
      { code: 'KER', name: 'Kerbala',
        cities: [
          { code: 'KER', name: 'Kerbala' },
          { code: 'KAR', name: 'Karbala' },
          { code: 'NAJ', name: 'Najaf' },
          { code: 'HIL', name: 'Hilla' },
          { code: 'KUT', name: 'Kut' },
          { code: 'DIW', name: 'Diwaniya' },
          { code: 'SAM', name: 'Samarra' },
          { code: 'TIK', name: 'Tikrit' },
          { code: 'FAL', name: 'Fallujah' },
          { code: 'RAM', name: 'Ramadi' }
        ]
      },
      { code: 'HIL', name: 'Hilla',
        cities: [
          { code: 'HIL', name: 'Hilla' },
          { code: 'KAR', name: 'Karbala' },
          { code: 'NAJ', name: 'Najaf' },
          { code: 'KER', name: 'Kerbala' },
          { code: 'KUT', name: 'Kut' },
          { code: 'DIW', name: 'Diwaniya' },
          { code: 'SAM', name: 'Samarra' },
          { code: 'TIK', name: 'Tikrit' },
          { code: 'FAL', name: 'Fallujah' },
          { code: 'RAM', name: 'Ramadi' }
        ]
      },
      { code: 'KUT', name: 'Kut',
        cities: [
          { code: 'KUT', name: 'Kut' },
          { code: 'KAR', name: 'Karbala' },
          { code: 'NAJ', name: 'Najaf' },
          { code: 'KER', name: 'Kerbala' },
          { code: 'HIL', name: 'Hilla' },
          { code: 'DIW', name: 'Diwaniya' },
          { code: 'SAM', name: 'Samarra' },
          { code: 'TIK', name: 'Tikrit' },
          { code: 'FAL', name: 'Fallujah' },
          { code: 'RAM', name: 'Ramadi' }
        ]
      },
      { code: 'DIW', name: 'Diwaniya',
        cities: [
          { code: 'DIW', name: 'Diwaniya' },
          { code: 'KAR', name: 'Karbala' },
          { code: 'NAJ', name: 'Najaf' },
          { code: 'KER', name: 'Kerbala' },
          { code: 'HIL', name: 'Hilla' },
          { code: 'KUT', name: 'Kut' },
          { code: 'SAM', name: 'Samarra' },
          { code: 'TIK', name: 'Tikrit' },
          { code: 'FAL', name: 'Fallujah' },
          { code: 'RAM', name: 'Ramadi' }
        ]
      },
      { code: 'SAM', name: 'Samarra',
        cities: [
          { code: 'SAM', name: 'Samarra' },
          { code: 'KAR', name: 'Karbala' },
          { code: 'NAJ', name: 'Najaf' },
          { code: 'KER', name: 'Kerbala' },
          { code: 'HIL', name: 'Hilla' },
          { code: 'KUT', name: 'Kut' },
          { code: 'DIW', name: 'Diwaniya' },
          { code: 'TIK', name: 'Tikrit' },
          { code: 'FAL', name: 'Fallujah' },
          { code: 'RAM', name: 'Ramadi' }
        ]
      },
      { code: 'TIK', name: 'Tikrit',
        cities: [
          { code: 'TIK', name: 'Tikrit' },
          { code: 'KAR', name: 'Karbala' },
          { code: 'NAJ', name: 'Najaf' },
          { code: 'KER', name: 'Kerbala' },
          { code: 'HIL', name: 'Hilla' },
          { code: 'KUT', name: 'Kut' },
          { code: 'DIW', name: 'Diwaniya' },
          { code: 'SAM', name: 'Samarra' },
          { code: 'FAL', name: 'Fallujah' },
          { code: 'RAM', name: 'Ramadi' }
        ]
      },
      { code: 'FAL', name: 'Fallujah',
        cities: [
          { code: 'FAL', name: 'Fallujah' },
          { code: 'KAR', name: 'Karbala' },
          { code: 'NAJ', name: 'Najaf' },
          { code: 'KER', name: 'Kerbala' },
          { code: 'HIL', name: 'Hilla' },
          { code: 'KUT', name: 'Kut' },
          { code: 'DIW', name: 'Diwaniya' },
          { code: 'SAM', name: 'Samarra' },
          { code: 'TIK', name: 'Tikrit' },
          { code: 'RAM', name: 'Ramadi' }
        ]
      },
      { code: 'RAM', name: 'Ramadi',
        cities: [
          { code: 'RAM', name: 'Ramadi' },
          { code: 'KAR', name: 'Karbala' },
          { code: 'NAJ', name: 'Najaf' },
          { code: 'KER', name: 'Kerbala' },
          { code: 'HIL', name: 'Hilla' },
          { code: 'KUT', name: 'Kut' },
          { code: 'DIW', name: 'Diwaniya' },
          { code: 'SAM', name: 'Samarra' },
          { code: 'TIK', name: 'Tikrit' },
          { code: 'FAL', name: 'Fallujah' }
        ]
      },
      { code: 'NAS', name: 'Nasiriyah',
        cities: [
          { code: 'NAS', name: 'Nasiriyah' },
          { code: 'BAS', name: 'Basra' },
          { code: 'AM', name: 'Amarah' },
          { code: 'KUT', name: 'Kut' },
          { code: 'DIW', name: 'Diwaniya' },
          { code: 'SAM', name: 'Samarra' },
          { code: 'TIK', name: 'Tikrit' },
          { code: 'FAL', name: 'Fallujah' },
          { code: 'RAM', name: 'Ramadi' },
          { code: 'HAD', name: 'Haditha' }
        ]
      },
      { code: 'AM', name: 'Amarah',
        cities: [
          { code: 'AM', name: 'Amarah' },
          { code: 'BAS', name: 'Basra' },
          { code: 'NAS', name: 'Nasiriyah' },
          { code: 'KUT', name: 'Kut' },
          { code: 'DIW', name: 'Diwaniya' },
          { code: 'SAM', name: 'Samarra' },
          { code: 'TIK', name: 'Tikrit' },
          { code: 'FAL', name: 'Fallujah' },
          { code: 'RAM', name: 'Ramadi' },
          { code: 'HAD', name: 'Haditha' }
        ]
      },
      { code: 'HAD', name: 'Haditha',
        cities: [
          { code: 'HAD', name: 'Haditha' },
          { code: 'BAS', name: 'Basra' },
          { code: 'NAS', name: 'Nasiriyah' },
          { code: 'AM', name: 'Amarah' },
          { code: 'KUT', name: 'Kut' },
          { code: 'DIW', name: 'Diwaniya' },
          { code: 'SAM', name: 'Samarra' },
          { code: 'TIK', name: 'Tikrit' },
          { code: 'FAL', name: 'Fallujah' },
          { code: 'RAM', name: 'Ramadi' }
        ]
      }
    ]
  };

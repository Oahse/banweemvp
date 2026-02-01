/**
 * Tunisia country data with regions, cities, and tax information
 */

import { Country } from './index';

export const tunisia: Country = {
    code: 'TN',
    name: 'Tunisia',
    taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'TND', region: 'MEA' },
    provinces: [
      { code: 'TUN', name: 'Tunis',
        cities: [
          { code: 'TUN', name: 'Tunis' },
          { code: 'ARI', name: 'Ariana' },
          { code: 'BEN', name: 'Ben Arous' },
          { code: 'MAN', name: 'Manouba' },
          { code: 'BIZ', name: 'Bizerte' },
          { code: 'NAB', name: 'Nabeul' },
          { code: 'ZAG', name: 'Zaghouan' },
          { code: 'SIL', name: 'Siliana' },
          { code: 'BEJ', name: 'Beja' },
          { code: 'JEND', name: 'Jendouba' }
        ]
      },
      { code: 'SFAX', name: 'Sfax',
        cities: [
          { code: 'SFAX', name: 'Sfax' },
          { code: 'SIDI', name: 'Sidi Bouzid' },
          { code: 'KAI', name: 'Kairouan' },
          { code: 'KAS', name: 'Kasserine' },
          { code: 'GAF', name: 'Gafsa' },
          { code: 'TOZ', name: 'Tozeur' },
          { code: 'KEB', name: 'Kebili' },
          { code: 'TATA', name: 'Tataouine' },
          { code: 'MED', name: 'Medenine' },
          { code: 'GAB', name: 'Gabès' }
        ]
      },
      { code: 'SUS', name: 'Sousse',
        cities: [
          { code: 'SUS', name: 'Sousse' },
          { code: 'MON', name: 'Monastir' },
          { code: 'MAH', name: 'Mahdia' },
          { code: 'SFAX', name: 'Sfax' },
          { code: 'KAI', name: 'Kairouan' },
          { code: 'KAS', name: 'Kasserine' },
          { code: 'SIDI', name: 'Sidi Bouzid' },
          { code: 'GAF', name: 'Gafsa' },
          { code: 'TOZ', name: 'Tozeur' },
          { code: 'KEB', name: 'Kebili' }
        ]
      },
      { code: 'ARI', name: 'Ariana',
        cities: [
          { code: 'ARI', name: 'Ariana' },
          { code: 'TUN', name: 'Tunis' },
          { code: 'BEN', name: 'Ben Arous' },
          { code: 'MAN', name: 'Manouba' },
          { code: 'BIZ', name: 'Bizerte' },
          { code: 'NAB', name: 'Nabeul' },
          { code: 'ZAG', name: 'Zaghouan' },
          { code: 'SIL', name: 'Siliana' },
          { code: 'BEJ', name: 'Beja' },
          { code: 'JEND', name: 'Jendouba' }
        ]
      },
      { code: 'BEN', name: 'Ben Arous',
        cities: [
          { code: 'BEN', name: 'Ben Arous' },
          { code: 'TUN', name: 'Tunis' },
          { code: 'ARI', name: 'Ariana' },
          { code: 'MAN', name: 'Manouba' },
          { code: 'BIZ', name: 'Bizerte' },
          { code: 'NAB', name: 'Nabeul' },
          { code: 'ZAG', name: 'Zaghouan' },
          { code: 'SIL', name: 'Siliana' },
          { code: 'BEJ', name: 'Beja' },
          { code: 'JEND', name: 'Jendouba' }
        ]
      },
      { code: 'MAN', name: 'Manouba',
        cities: [
          { code: 'MAN', name: 'Manouba' },
          { code: 'TUN', name: 'Tunis' },
          { code: 'ARI', name: 'Ariana' },
          { code: 'BEN', name: 'Ben Arous' },
          { code: 'BIZ', name: 'Bizerte' },
          { code: 'NAB', name: 'Nabeul' },
          { code: 'ZAG', name: 'Zaghouan' },
          { code: 'SIL', name: 'Siliana' },
          { code: 'BEJ', name: 'Beja' },
          { code: 'JEND', name: 'Jendouba' }
        ]
      },
      { code: 'BIZ', name: 'Bizerte',
        cities: [
          { code: 'BIZ', name: 'Bizerte' },
          { code: 'TUN', name: 'Tunis' },
          { code: 'ARI', name: 'Ariana' },
          { code: 'BEN', name: 'Ben Arous' },
          { code: 'MAN', name: 'Manouba' },
          { code: 'NAB', name: 'Nabeul' },
          { code: 'ZAG', name: 'Zaghouan' },
          { code: 'SIL', name: 'Siliana' },
          { code: 'BEJ', name: 'Beja' },
          { code: 'JEND', name: 'Jendouba' }
        ]
      },
      { code: 'NAB', name: 'Nabeul',
        cities: [
          { code: 'NAB', name: 'Nabeul' },
          { code: 'TUN', name: 'Tunis' },
          { code: 'ARI', name: 'Ariana' },
          { code: 'BEN', name: 'Ben Arous' },
          { code: 'MAN', name: 'Manouba' },
          { code: 'BIZ', name: 'Bizerte' },
          { code: 'ZAG', name: 'Zaghouan' },
          { code: 'SIL', name: 'Siliana' },
          { code: 'BEJ', name: 'Beja' },
          { code: 'JEND', name: 'Jendouba' }
        ]
      },
      { code: 'ZAG', name: 'Zaghouan',
        cities: [
          { code: 'ZAG', name: 'Zaghouan' },
          { code: 'TUN', name: 'Tunis' },
          { code: 'ARI', name: 'Ariana' },
          { code: 'BEN', name: 'Ben Arous' },
          { code: 'MAN', name: 'Manouba' },
          { code: 'BIZ', name: 'Bizerte' },
          { code: 'NAB', name: 'Nabeul' },
          { code: 'SIL', name: 'Siliana' },
          { code: 'BEJ', name: 'Beja' },
          { code: 'JEND', name: 'Jendouba' }
        ]
      },
      { code: 'SIL', name: 'Siliana',
        cities: [
          { code: 'SIL', name: 'Siliana' },
          { code: 'TUN', name: 'Tunis' },
          { code: 'ARI', name: 'Ariana' },
          { code: 'BEN', name: 'Ben Arous' },
          { code: 'MAN', name: 'Manouba' },
          { code: 'BIZ', name: 'Bizerte' },
          { code: 'NAB', name: 'Nabeul' },
          { code: 'ZAG', name: 'Zaghouan' },
          { code: 'BEJ', name: 'Beja' },
          { code: 'JEND', name: 'Jendouba' }
        ]
      },
      { code: 'BEJ', name: 'Beja',
        cities: [
          { code: 'BEJ', name: 'Beja' },
          { code: 'TUN', name: 'Tunis' },
          { code: 'ARI', name: 'Ariana' },
          { code: 'BEN', name: 'Ben Arous' },
          { code: 'MAN', name: 'Manouba' },
          { code: 'BIZ', name: 'Bizerte' },
          { code: 'NAB', name: 'Nabeul' },
          { code: 'ZAG', name: 'Zaghouan' },
          { code: 'SIL', name: 'Siliana' },
          { code: 'JEND', name: 'Jendouba' }
        ]
      },
      { code: 'JEND', name: 'Jendouba',
        cities: [
          { code: 'JEND', name: 'Jendouba' },
          { code: 'TUN', name: 'Tunis' },
          { code: 'ARI', name: 'Ariana' },
          { code: 'BEN', name: 'Ben Arous' },
          { code: 'MAN', name: 'Manouba' },
          { code: 'BIZ', name: 'Bizerte' },
          { code: 'NAB', name: 'Nabeul' },
          { code: 'ZAG', name: 'Zaghouan' },
          { code: 'SIL', name: 'Siliana' },
          { code: 'BEJ', name: 'Beja' }
        ]
      },
      { code: 'KAI', name: 'Kairouan',
        cities: [
          { code: 'KAI', name: 'Kairouan' },
          { code: 'SFAX', name: 'Sfax' },
          { code: 'SIDI', name: 'Sidi Bouzid' },
          { code: 'SUS', name: 'Sousse' },
          { code: 'MON', name: 'Monastir' },
          { code: 'MAH', name: 'Mahdia' },
          { code: 'KAS', name: 'Kasserine' },
          { code: 'GAF', name: 'Gafsa' },
          { code: 'TOZ', name: 'Tozeur' },
          { code: 'KEB', name: 'Kebili' }
        ]
      },
      { code: 'KAS', name: 'Kasserine',
        cities: [
          { code: 'KAS', name: 'Kasserine' },
          { code: 'SFAX', name: 'Sfax' },
          { code: 'SIDI', name: 'Sidi Bouzid' },
          { code: 'KAI', name: 'Kairouan' },
          { code: 'SUS', name: 'Sousse' },
          { code: 'MON', name: 'Monastir' },
          { code: 'MAH', name: 'Mahdia' },
          { code: 'GAF', name: 'Gafsa' },
          { code: 'TOZ', name: 'Tozeur' },
          { code: 'KEB', name: 'Kebili' }
        ]
      },
      { code: 'GAF', name: 'Gafsa',
        cities: [
          { code: 'GAF', name: 'Gafsa' },
          { code: 'SFAX', name: 'Sfax' },
          { code: 'SIDI', name: 'Sidi Bouzid' },
          { code: 'KAI', name: 'Kairouan' },
          { code: 'KAS', name: 'Kasserine' },
          { code: 'SUS', name: 'Sousse' },
          { code: 'MON', name: 'Monastir' },
          { code: 'MAH', name: 'Mahdia' },
          { code: 'TOZ', name: 'Tozeur' },
          { code: 'KEB', name: 'Kebili' }
        ]
      },
      { code: 'TOZ', name: 'Tozeur',
        cities: [
          { code: 'TOZ', name: 'Tozeur' },
          { code: 'SFAX', name: 'Sfax' },
          { code: 'SIDI', name: 'Sidi Bouzid' },
          { code: 'KAI', name: 'Kairouan' },
          { code: 'KAS', name: 'Kasserine' },
          { code: 'GAF', name: 'Gafsa' },
          { code: 'SUS', name: 'Sousse' },
          { code: 'MON', name: 'Monastir' },
          { code: 'MAH', name: 'Mahdia' },
          { code: 'KEB', name: 'Kebili' }
        ]
      },
      { code: 'KEB', name: 'Kebili',
        cities: [
          { code: 'KEB', name: 'Kebili' },
          { code: 'SFAX', name: 'Sfax' },
          { code: 'SIDI', name: 'Sidi Bouzid' },
          { code: 'KAI', name: 'Kairouan' },
          { code: 'KAS', name: 'Kasserine' },
          { code: 'GAF', name: 'Gafsa' },
          { code: 'TOZ', name: 'Tozeur' },
          { code: 'SUS', name: 'Sousse' },
          { code: 'MON', name: 'Monastir' },
          { code: 'MAH', name: 'Mahdia' }
        ]
      },
      { code: 'GAB', name: 'Gabès',
        cities: [
          { code: 'GAB', name: 'Gabès' },
          { code: 'SFAX', name: 'Sfax' },
          { code: 'SIDI', name: 'Sidi Bouzid' },
          { code: 'KAI', name: 'Kairouan' },
          { code: 'KAS', name: 'Kasserine' },
          { code: 'GAF', name: 'Gafsa' },
          { code: 'TOZ', name: 'Tozeur' },
          { code: 'KEB', name: 'Kebili' },
          { code: 'TATA', name: 'Tataouine' },
          { code: 'MED', name: 'Medenine' }
        ]
      },
      { code: 'MED', name: 'Medenine',
        cities: [
          { code: 'MED', name: 'Medenine' },
          { code: 'SFAX', name: 'Sfax' },
          { code: 'SIDI', name: 'Sidi Bouzid' },
          { code: 'KAI', name: 'Kairouan' },
          { code: 'KAS', name: 'Kasserine' },
          { code: 'GAF', name: 'Gafsa' },
          { code: 'TOZ', name: 'Tozeur' },
          { code: 'KEB', name: 'Kebili' },
          { code: 'TATA', name: 'Tataouine' },
          { code: 'GAB', name: 'Gabès' }
        ]
      },
      { code: 'TATA', name: 'Tataouine',
        cities: [
          { code: 'TATA', name: 'Tataouine' },
          { code: 'SFAX', name: 'Sfax' },
          { code: 'SIDI', name: 'Sidi Bouzid' },
          { code: 'KAI', name: 'Kairouan' },
          { code: 'KAS', name: 'Kasserine' },
          { code: 'GAF', name: 'Gafsa' },
          { code: 'TOZ', name: 'Tozeur' },
          { code: 'KEB', name: 'Kebili' },
          { code: 'MED', name: 'Medenine' },
          { code: 'GAB', name: 'Gabès' }
        ]
      },
      { code: 'SIDI', name: 'Sidi Bouzid',
        cities: [
          { code: 'SIDI', name: 'Sidi Bouzid' },
          { code: 'SFAX', name: 'Sfax' },
          { code: 'KAI', name: 'Kairouan' },
          { code: 'KAS', name: 'Kasserine' },
          { code: 'GAF', name: 'Gafsa' },
          { code: 'TOZ', name: 'Tozeur' },
          { code: 'KEB', name: 'Kebili' },
          { code: 'TATA', name: 'Tataouine' },
          { code: 'MED', name: 'Medenine' },
          { code: 'GAB', name: 'Gabès' }
        ]
      },
      { code: 'MON', name: 'Monastir',
        cities: [
          { code: 'MON', name: 'Monastir' },
          { code: 'SUS', name: 'Sousse' },
          { code: 'MAH', name: 'Mahdia' },
          { code: 'SFAX', name: 'Sfax' },
          { code: 'KAI', name: 'Kairouan' },
          { code: 'KAS', name: 'Kasserine' },
          { code: 'SIDI', name: 'Sidi Bouzid' },
          { code: 'GAF', name: 'Gafsa' },
          { code: 'TOZ', name: 'Tozeur' },
          { code: 'KEB', name: 'Kebili' }
        ]
      },
      { code: 'MAH', name: 'Mahdia',
        cities: [
          { code: 'MAH', name: 'Mahdia' },
          { code: 'SUS', name: 'Sousse' },
          { code: 'MON', name: 'Monastir' },
          { code: 'SFAX', name: 'Sfax' },
          { code: 'KAI', name: 'Kairouan' },
          { code: 'KAS', name: 'Kasserine' },
          { code: 'SIDI', name: 'Sidi Bouzid' },
          { code: 'GAF', name: 'Gafsa' },
          { code: 'TOZ', name: 'Tozeur' },
          { code: 'KEB', name: 'Kebili' }
        ]
      }
    ]
  };

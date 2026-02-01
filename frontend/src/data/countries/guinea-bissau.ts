/**
 * Guinea-Bissau country data with regions, cities, and tax information
 */

import { Country } from './index';

export const guineaBissau: Country = {
    code: 'GW',
    name: 'Guinea-Bissau',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'XOF', region: 'MEA' },
    provinces: [
      { code: 'BISS', name: 'Bissau',
        cities: [
          { code: 'BISS', name: 'Bissau' },
          { code: 'BIOM', name: 'Biombo' },
          { code: 'PRAB', name: 'Prabis' },
          { code: 'SAC', name: 'Safim' },
          { code: 'TITE', name: 'Tite' },
          { code: 'BULA', name: 'Bula' },
          { code: 'CACH', name: 'Cacheu' },
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'QUIN', name: 'Quinhamel' },
          { code: 'GABU', name: 'Gabú' }
        ]
      },
      { code: 'BIOM', name: 'Biombo',
        cities: [
          { code: 'BIOM', name: 'Biombo' },
          { code: 'BISS', name: 'Bissau' },
          { code: 'PRAB', name: 'Prabis' },
          { code: 'SAC', name: 'Safim' },
          { code: 'TITE', name: 'Tite' },
          { code: 'BULA', name: 'Bula' },
          { code: 'CACH', name: 'Cacheu' },
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'QUIN', name: 'Quinhamel' },
          { code: 'GABU', name: 'Gabú' }
        ]
      },
      { code: 'CACH', name: 'Cacheu',
        cities: [
          { code: 'CACH', name: 'Cacheu' },
          { code: 'BULA', name: 'Bula' },
          { code: 'BISS', name: 'Bissau' },
          { code: 'BIOM', name: 'Biombo' },
          { code: 'PRAB', name: 'Prabis' },
          { code: 'SAC', name: 'Safim' },
          { code: 'TITE', name: 'Tite' },
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'QUIN', name: 'Quinhamel' },
          { code: 'GABU', name: 'Gabú' }
        ]
      },
      { code: 'GABU', name: 'Gabú',
        cities: [
          { code: 'GABU', name: 'Gabú' },
          { code: 'BISS', name: 'Bissau' },
          { code: 'BIOM', name: 'Biombo' },
          { code: 'PRAB', name: 'Prabis' },
          { code: 'SAC', name: 'Safim' },
          { code: 'TITE', name: 'Tite' },
          { code: 'BULA', name: 'Bula' },
          { code: 'CACH', name: 'Cacheu' },
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'QUIN', name: 'Quinhamel' }
        ]
      },
      { code: 'OIO', name: 'Oio',
        cities: [
          { code: 'OIO', name: 'Oio' },
          { code: 'BISS', name: 'Bissau' },
          { code: 'BIOM', name: 'Biombo' },
          { code: 'PRAB', name: 'Prabis' },
          { code: 'SAC', name: 'Safim' },
          { code: 'TITE', name: 'Tite' },
          {code: 'BULA', name: 'Bula' },
          { code: 'CACH', name: 'Cacheu' },
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'QUIN', name: 'Quinhamel' }
        ]
      },
      { code: 'QUIN', name: 'Quinara',
        cities: [
          { code: 'QUIN', name: 'Quinhamel' },
          { code: 'BISS', name: 'Bissau' },
          { code: 'BIOM', name: 'Biombo' },
          { code: 'PRAB', name: 'Prabis' },
          { code: 'SAC', name: 'Safim' },
          { code: 'TITE', name: 'Tite' },
          { code: 'BULA', name: 'Bula' },
          { code: 'CACH', name: 'Cacheu' },
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'GABU', name: 'Gabú' }
        ]
      },
      { code: 'SAC', name: 'Safim',
        cities: [
          { code: 'SAC', name: 'Safim' },
          { code: 'BISS', name: 'Bissau' },
          { code: 'BIOM', name: 'Biombo' },
          { code: 'PRAB', name: 'Prabis' },
          { code: 'TITE', name: 'Tite' },
          { code: 'BULA', name: 'Bula' },
          { code: 'CACH', name: 'Cacheu' },
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'QUIN', name: 'Quinhamel' },
          { code: 'GABU', name: 'Gabú' }
        ]
      },
      { code: 'TITE', name: 'Tite',
        cities: [
          { code: 'TITE', name: 'Tite' },
          { code: 'BISS', name: 'Bissau' },
          { code: 'BIOM', name: 'Biombo' },
          { code: 'PRAB', name: 'Prabis' },
          { code: 'SAC', name: 'Safim' },
          { code: 'BULA', name: 'Bula' },
          { code: 'CACH', name: 'Cacheu' },
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'QUIN', name: 'Quinhamel' },
          { code: 'GABU', name: 'Gabú' }
        ]
      },
      { code: 'BULA', name: 'Bula',
        cities: [
          { code: 'BULA', name: 'Bula' },
          { code: 'BISS', name: 'Bissau' },
          { code: 'BIOM', name: 'Biombo' },
          { code: 'PRAB', name: 'Prabis' },
          { code: 'SAC', name: 'Safim' },
          { code: 'TITE', name: 'Tite' },
          { code: 'CACH', name: 'Cacheu' },
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'QUIN', name: 'Quinhamel' },
          { code: 'GABU', name: 'Gabú' }
        ]
      },
      { code: 'BIJEN', name: 'Bijen',
        cities: [
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'BISS', name: 'Bissau' },
          { code: 'BIOM', name: 'Biombo' },
          { code: 'PRAB', name: 'Prabis' },
          { code: 'SAC', name: 'Safim' },
          { code: 'TITE', name: 'Tite' },
          { code: 'BULA', name: 'Bula' },
          { code: 'CACH', name: 'Cacheu' },
          { code: 'QUIN', name: 'Quinhamel' },
          { code: 'GABU', name: 'Gabú' }
        ]
      },
      { code: 'BAM', name: 'Bafatá',
        cities: [
          { code: 'BAM', name: 'Bafatá' },
          { code: 'BISS', name: 'Bissau' },
          { code: 'BIOM', name: 'Biombo' },
          { code: 'PRAB', name: 'Prabis' },
          { code: 'SAC', name: 'Safim' },
          { code: 'TITE', name: 'Tite' },
          { code: 'BULA', name: 'Bula' },
          { code: 'CACH', name: 'Cacheu' },
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'QUIN', name: 'Quinhamel' }
        ]
      },
      { code: 'QUIN', name: 'Quinhamel',
        cities: [
          { code: 'QUIN', name: 'Quinhamel' },
          { code: 'BISS', name: 'Bissau' },
          { code: 'BIOM', name: 'Biombo' },
          { code: 'PRAB', name: 'Prabis' },
          { code: 'SAC', name: 'Safim' },
          { code: 'TITE', name: 'Tite' },
          { code: 'BULA', name: 'Bula' },
          { code: 'CACH', name: 'Cacheu' },
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'GABU', name: 'Gabú' }
        ]
      },
      { code: 'GABU', name: 'Gabú',
        cities: [
          { code: 'GABU', name: 'Gabú' },
          { code: 'BISS', name: 'Bissau' },
          { code: 'BIOM', name: 'Biombo' },
          { code: 'PRAB', name: 'Prabis' },
          { code: 'SAC', name: 'Safim' },
          { code: 'TITE', name: 'Tite' },
          { code: 'BULA', name: 'Bula' },
          { code: 'CACH', name: 'Cacheu' },
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'QUIN', name: 'Quinhamel' }
        ]
      },
      { code: 'PRAB', name: 'Prabis',
        cities: [
          { code: 'PRAB', name: 'Prabis' },
          { code: 'BISS', name: 'Bissau' },
          { code: 'BIOM', name: 'Biombo' },
          { code: 'SAC', name: 'Safim' },
          { code: 'TITE', name: 'Tite' },
          { code: 'BULA', name: 'Bula' },
          { code: 'CACH', name: 'Cacheu' },
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'QUIN', name: 'Quinhamel' },
          { code: 'GABU', name: 'Gabú' }
        ]
      },
      { code: 'BAMB', name: 'Bambol',
        cities: [
          { code: 'BAMB', name: 'Bambol' },
          { code: 'BISS', name: 'Bissau' },
          { code: 'BIOM', name: 'Biombo' },
          { code: 'PRAB', name: 'Prabis' },
          { code: 'SAC', name: 'Safim' },
          { code: 'TITE', name: 'Tite' },
          { code: 'BULA', name: 'Bula' },
          { code: 'CACH', name: 'Cacheu' },
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'QUIN', name: 'Quinhamel' }
        ]
      },
      { code: 'CANT', name: 'Cantchungo',
        cities: [
          { code: 'CANT', name: 'Cantchungo' },
          { code: 'BISS', name: 'Bissau' },
          { code: 'BIOM', name: 'Biombo' },
          { code: 'PRAB', name: 'Prabis' },
          { code: 'SAC', name: 'Safim' },
          { code: 'TITE', name: 'Tite' },
          { code: 'BULA', name: 'Bula' },
          { code: 'CACH', name: 'Cacheu' },
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'QUIN', name: 'Quinhamel' }
        ]
      },
      { code: 'CANT', name: 'Catió',
        cities: [
          { code: 'CANT', name: 'Catió' },
          { code: 'BISS', name: 'Bissau' },
          { code: 'BIOM', name: 'Biombo' },
          { code: 'PRAB', name: 'Prabis' },
          { code: 'SAC', name: 'Safim' },
          { code: 'TITE', name: 'Tite' },
          { code: 'BULA', name: 'Bula' },
          { code: 'CACH', name: 'Cacheu' },
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'QUIN', name: 'QUINhamel' }
        ]
      },
      { code: 'TOM', name: 'Tombali',
        cities: [
          { code: 'TOM', name: 'Tombali' },
          { code: 'BISS', name: 'Bissau' },
          { code: 'BIOM', name: 'Biombo' },
          { code: 'PRAB', name: 'Prabis' },
          { code: 'SAC', name: 'Safim' },
          { code: 'TITE', name: 'Tite' },
          { code: 'BULA', name: 'Bula' },
          { code: 'CACH', name: 'Cacheu' },
          { code: 'BIJEN', name: 'Bijen' },
          { code: 'QUIN', name: 'Quinhamel' }
        ]
      }
    ]
  };

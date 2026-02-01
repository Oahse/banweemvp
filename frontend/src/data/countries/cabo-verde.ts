/**
 * Cabo Verde country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const caboverde: Country = { code: 'CV', name: 'Cabo Verde', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'CVE', region: 'MEA' },
  provinces: [
    { code: 'PRAIA', name: 'Santiago',
      cities: [
        { code: 'PRAIA', name: 'Praia' },
        { code: 'MINDELO', name: 'Mindelo' },
        { code: 'SANTAMARIA', name: 'Santa Maria' },
        { code: 'PEDRA', name: 'Pedra Badejo' },
        { code: 'ASSOMADA', name: 'Assomada' },
        { code: 'TARRAFAL', name: 'Tarrafal' },
        { code: 'CITY', name: 'Cidade Velha' },
        { code: 'CALHETA', name: 'Calheta' },
        { code: 'PORTO', name: 'Porto Novo' },
        { code: 'RIBEIRA', name: 'Ribeira Grande' }
      ]
    }
  ]
};

export default caboverde;

/**
 * Cabo Verde country data with municipalities and cities
 */

import { Country } from './index';

export const caboverde: Country = {
  code: 'CV',
  name: 'Cabo Verde',
  flag: '🇨🇻',
  capital: 'Praia',
  area: 4033,
  currencySymbol: 'CVE',
  officialLanguages: ['Portuguese'],
  demonym: 'Cabo Verdean',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'CVE', region: 'MEA' },
  divisions: [
    { code: 'PRA', name: 'Santiago', type: 'municipality',
      cities: [
        { code: 'PRAIA', name: 'Praia' },
        { code: 'ASSOMADA', name: 'Assomada' },
        { code: 'TARRAFAL', name: 'Tarrafal' },
        { code: 'CITY', name: 'Cidade Velha' },
        { code: 'CALHETA', name: 'Calheta' }
      ]
    },
    { code: 'SÃO', name: 'São Vicente', type: 'municipality',
      cities: [
        { code: 'MINDELO', name: 'Mindelo' },
        { code: 'SÃO', name: 'São Pedro' },
        { code: 'PORTO', name: 'Porto Novo' },
        { code: 'RIBEIRA', name: 'Ribeira Grande' },
        { code: 'SAL', name: 'Sal' }
      ]
    },
    { code: 'SAL', name: 'Sal', type: 'municipality',
      cities: [
        { code: 'ESPARGOS', name: 'Espargos' },
        { code: 'SANTA', name: 'Santa Maria' },
        { code: 'PEDRA', name: 'Pedra Badejo' },
        { code: 'PALMEIRA', name: 'Palmeira' },
        { code: 'MUR', name: 'Murdeira' }
      ]
    },
    { code: 'BOA', name: 'Boa Vista', type: 'municipality',
      cities: [
        { code: 'BOA', name: 'Boa Vista' },
        { code: 'SAL', name: 'Sal Rei' },
        { code: 'RABIL', name: 'Rabil' },
        { code: 'PRAIA', name: 'Praia' },
        { code: 'MINDELO', name: 'Mindelo' }
      ]
    },
    { code: 'FOG', name: 'Fogo', type: 'municipality',
      cities: [
        { code: 'SÃO', name: 'São Filipe' },
        { code: 'MOSTEIROS', name: 'Mosteiros' },
        { code: 'CATE', name: 'Cova Figueira' },
        { code: 'SANT', name: 'Santa Catarina' },
        { code: 'BRAVA', name: 'Brava' }
      ]
    },
    { code: 'BRA', name: 'Brava', type: 'municipality',
      cities: [
        { code: 'NOVA', name: 'Nova Sintra do Monte' },
        { code: 'SANT', name: 'Santa Catarina do Fogo' },
        { code: 'CAM', name: 'Campanário' },
        { code: 'FONTE', name: 'Fonte do Aleixo' },
        { code: 'NOSA', name: 'Nossa Senhora do Monte' }
      ]
    },
    { code: 'MAI', name: 'Maio', type: 'municipality',
      cities: [
        { code: 'PORTO', name: 'Porto Inglês' },
        { code: 'VILA', name: 'Vila do Maio' },
        { code: 'CALHETA', name: 'Calheta de São Miguel' },
        { code: 'MORRO', name: 'Morro' },
        { code: 'PAUL', name: 'Paul' }
      ]
    },
    { code: 'SÃO', name: 'São Nicolau', type: 'municipality',
      cities: [
        { code: 'RIBEIRA', name: 'Ribeira Brava' },
        { code: 'TAR', name: 'Tarrafal de São Nicolau' },
        { code: 'PRAIA', name: 'Praia' },
        { code: 'MINDELO', name: 'Mindelo' },
        { code: 'SÃO', name: 'São Jorge' }
      ]
    },
    { code: 'SÃO', name: 'São Domingos', type: 'municipality',
      cities: [
        { code: 'SÃO', name: 'São Domingos' },
        { code: 'PRAIA', name: 'Praia' },
        { code: 'MINDELO', name: 'Mindelo' },
        { code: 'SÃO', name: 'São Vicente' },
        { code: 'SAL', name: 'Sal' }
      ]
    }
  ]
};

export default caboverde;

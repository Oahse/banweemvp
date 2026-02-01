/**
 * Cabo Verde country data with islands, cities, and tax information
 */

import { Country } from './index';

export const caboVerde: Country = {
    code: 'CV',
    name: 'Cabo Verde',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'CVE', region: 'MEA' },
    provinces: [
      { code: 'SANT', name: 'Santiago',
        cities: [
          { code: 'PRAIA', name: 'Praia' },
          { code: 'MIN', name: 'Mindelo' },
          { code: 'SANTAMARIA', name: 'Santa Maria' },
          { code: 'PEDRA', name: 'Pedra Badejo' },
          { code: 'ASSOMADA', name: 'Assomada' },
          { code: 'TARRAFAL', name: 'Tarrafal' },
          { code: 'CITY', name: 'Cidade Velha' },
          { code: 'CALHETA', name: 'Calheta' },
          { code: 'PORTO', name: 'Porto Novo' },
          { code: 'RIBEIRA', name: 'Ribeira Grande' }
        ]
      },
      { code: 'SANT', name: 'Santo Antão',
        cities: [
          { code: 'MIN', name: 'Mindelo' },
          { code: 'PORTO', name: 'Porto Novo' },
          { code: 'RIBEIRA', name: 'Ribeira Grande' },
          { code: 'PAUL', name: 'Paul' },
          { code: 'PONTA', name: 'Ponta do Sol' },
          { code: 'PORTO', name: 'Porto Novo' },
          { code: 'RIBEIRA', name: 'Ribeira Grande' },
          { code: 'PRAIA', name: 'Praia' },
          { code: 'SANTAMARIA', name: 'Santa Maria' },
          { code: 'PEDRA', name: 'Pedra Badejo' }
        ]
      },
      { code: 'SÃO', name: 'São Vicente',
        cities: [
          { code: 'MIN', name: 'Mindelo' },
          { code: 'PORTO', name: 'Porto Novo' },
          { code: 'RIBEIRA', name: 'Ribeira Grande' },
          { code: 'PAUL', name: 'Paul' },
          { code: 'PONTA', name: 'Ponta do Sol' },
          { code: 'PORTO', name: 'Porto Novo' },
          { code: 'RIBEIRA', name: 'Ribeira Grande' },
          { code: 'PRAIA', name: 'Praia' },
          { code: 'SANTAMARIA', name: 'Santa Maria' },
          { code: 'PEDRA', name: 'Pedra Badejo' }
        ]
      },
      { code: 'SÃO', name: 'São Nicolau',
        cities: [
          { code: 'RIBEIRA', name: 'Ribeira Brava' },
          { code: 'TARRAFAL', name: 'Tarrafal' },
          { code: 'PRAIA', name: 'Praia' },
          { code: 'MIN', name: 'Mindelo' },
          { code: 'PORTO', name: 'Porto Novo' },
          { code: 'RIBEIRA', name: 'Ribeira Grande' },
          { code: 'PAUL', name: 'Paul' },
          { code: 'PONTA', name: 'Ponta do Sol' },
          { code: 'SANTAMARIA', name: 'Santa Maria' },
          { code: 'PEDRA', name: 'Pedra Badejo' }
        ]
      },
      { code: 'SAL', name: 'Sal',
        cities: [
          { code: 'SANTAMARIA', name: 'Santa Maria' },
          { code: 'ESPARGOS', name: 'Espargos' },
          { code: 'PRAIA', name: 'Praia' },
          { code: 'MIN', name: 'Mindelo' },
          { code: 'PORTO', name: 'Porto Novo' },
          { code: 'RIBEIRA', name: 'Ribeira Grande' },
          { code: 'PAUL', name: 'Paul' },
          { code: 'PONTA', name: 'Ponta do Sol' },
          { code: 'RIBEIRA', name: 'Ribeira Brava' },
          { code: 'TARRAFAL', name: 'Tarrafal' }
        ]
      },
      { code: 'BOA', name: 'Boa Vista',
        cities: [
          { code: 'SAL', name: 'Sal Rei' },
          { code: 'SANTAMARIA', name: 'Santa Maria' },
          { code: 'ESPARGOS', name: 'Espargos' },
          { code: 'PRAIA', name: 'Praia' },
          { code: 'MIN', name: 'Mindelo' },
          { code: 'PORTO', name: 'Porto Novo' },
          { code: 'RIBEIRA', name: 'Ribeira Grande' },
          { code: 'PAUL', name: 'Paul' },
          { code: 'PONTA', name: 'Ponta do Sol' },
          { code: 'RIBEIRA', name: 'Ribeira Brava' }
        ]
      },
      { code: 'MAIO', name: 'Maio',
        cities: [
          { code: 'CIDADE', name: 'Cidade do Maio' },
          { code: 'CALHETA', name: 'Calheta' },
          { code: 'PRAIA', name: 'Praia' },
          { code: 'MIN', name: 'Mindelo' },
          { code: 'PORTO', name: 'Porto Novo' },
          { code: 'RIBEIRA', name: 'Ribeira Grande' },
          { code: 'PAUL', name: 'Paul' },
          { code: 'PONTA', name: 'Ponta do Sol' },
          { code: 'RIBEIRA', name: 'Ribeira Brava' },
          { code: 'TARRAFAL', name: 'Tarrafal' }
        ]
      },
      { code: 'BRAVA', name: 'Brava',
        cities: [
          { code: 'NOVA', name: 'Nova Sintra' },
          { code: 'FONTE', name: 'Fonte do Inverno' },
          { code: 'PRAIA', name: 'Praia' },
          { code: 'MIN', name: 'Mindelo' },
          { code: 'PORTO', name: 'Porto Novo' },
          { code: 'RIBEIRA', name: 'Ribeira Grande' },
          { code: 'PAUL', name: 'Paul' },
          { code: 'PONTA', name: 'Ponta do Sol' },
          { code: 'RIBEIRA', name: 'Ribeira Brava' },
          { code: 'TARRAFAL', name: 'Tarrafal' }
        ]
      },
      { code: 'Fogo', name: 'Fogo',
        cities: [
          { code: 'SAO', name: 'São Filipe' },
          { code: 'MOSTEIROS', name: 'Mosteiros' },
          { code: 'PRAIA', name: 'Praia' },
          { code: 'MIN', name: 'Mindelo' },
          { code: 'PORTO', name: 'Porto Novo' },
          { code: 'RIBEIRA', name: 'Ribeira Grande' },
          { code: 'PAUL', name: 'Paul' },
          { code: 'PONTA', name: 'Ponta do Sol' },
          { code: 'RIBEIRA', name: 'Ribeira Brava' },
          { code: 'TARRAFAL', name: 'Tarrafal' }
        ]
      }
    ]
  };

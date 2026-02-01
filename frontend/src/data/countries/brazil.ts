/**
 * Brazil country data with states, federal district, and cities
 */

import { Country } from './index';

export const brazil: Country = {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    capital: 'Brasília',
    area: 8515767,
    currencySymbol: 'R$',
    officialLanguages: ['Portuguese'],
    demonym: 'Brazilian',
    taxInfo: { standardRate: 17, taxName: 'ICMS', currency: 'BRL', region: 'LATAM' },
    divisions: [
      { code: 'AC', name: 'Acre', type: 'state',
        cities: [
          { code: 'RIO', name: 'Rio Branco' },
          { code: 'CRU', name: 'Cruzeiro do Sul' },
          { code: 'SENA', name: 'Sena Madureira' },
          { code: 'BRAS', name: 'Brasiléia' },
          { code: 'XAP', name: 'Xapuri' }
        ]
      },
      { code: 'AL', name: 'Alagoas', type: 'state',
        cities: [
          { code: 'MACE', name: 'Maceió' },
          { code: 'ARAP', name: 'Arapiraca' },
          { code: 'PAL', name: 'Palmeira dos Índios' },
          { code: 'RIO', name: 'Rio Largo' },
          { code: 'PEN', name: 'Penedo' }
        ]
      },
      { code: 'AP', name: 'Amapá', type: 'state',
        cities: [
          { code: 'MACA', name: 'Macapá' },
          { code: 'SANT', name: 'Santana' },
          { code: 'LAR', name: 'Laranjal do Jari' },
          { code: 'OIA', name: 'Oiapoque' },
          { code: 'PORT', name: 'Porto Grande' }
        ]
      },
      { code: 'AM', name: 'Amazonas', type: 'state',
        cities: [
          { code: 'MANA', name: 'Manaus' },
          { code: 'PARIN', name: 'Parintins' },
          { code: 'ITAC', name: 'Itacoatiara' },
          { code: 'MANA2', name: 'Manacapuru' },
          { code: 'COARI', name: 'Coari' }
        ]
      },
      { code: 'BA', name: 'Bahia', type: 'state',
        cities: [
          { code: 'SAL', name: 'Salvador' },
          { code: 'FEIRA', name: 'Feira de Santana' },
          { code: 'VIT', name: 'Vitória da Conquista' },
          { code: 'CAM', name: 'Camaçari' },
          { code: 'ITAB', name: 'Itabuna' }
        ]
      },
      { code: 'CE', name: 'Ceará', type: 'state',
        cities: [
          { code: 'FORT', name: 'Fortaleza' },
          { code: 'CAU', name: 'Caucaia' },
          { code: 'JUA', name: 'Juazeiro do Norte' },
          { code: 'SOBR', name: 'Sobral' },
          { code: 'MARAC', name: 'Maracanaú' }
        ]
      },
      { code: 'DF', name: 'Distrito Federal', type: 'federal district',
        cities: [
          { code: 'BRAS', name: 'Brasília' },
          { code: 'CEIL', name: 'Ceilândia' },
          { code: 'TAGU', name: 'Taguatinga' },
          { code: 'SOBR', name: 'Sobradinho' },
          { code: 'GAMA', name: 'Gama' }
        ]
      },
      { code: 'ES', name: 'Espírito Santo', type: 'state',
        cities: [
          { code: 'VIT', name: 'Vitória' },
          { code: 'SERR', name: 'Serra' },
          { code: 'VILA', name: 'Vila Velha' },
          { code: 'CARI', name: 'Cariacica' },
          { code: 'CACH', name: 'Cachoeiro de Itapemirim' }
        ]
      },
      { code: 'GO', name: 'Goiás', type: 'state',
        cities: [
          { code: 'GOIA', name: 'Goiânia' },
          { code: 'APAR', name: 'Aparecida de Goiânia' },
          { code: 'ANAP', name: 'Anápolis' },
          { code: 'RIO', name: 'Rio Verde' },
          { code: 'LUZI', name: 'Luziânia' }
        ]
      },
      { code: 'MA', name: 'Maranhão', type: 'state',
        cities: [
          { code: 'SAO', name: 'São Luís' },
          { code: 'IMPER', name: 'Imperatriz' },
          { code: 'TIMON', name: 'Timon' },
          { code: 'CAPI', name: 'Caxias' },
          { code: 'COD', name: 'Codó' }
        ]
      },
      { code: 'MG', name: 'Minas Gerais', type: 'state',
        cities: [
          { code: 'BELO', name: 'Belo Horizonte' },
          { code: 'UBER', name: 'Uberlândia' },
          { code: 'CONT', name: 'Contagem' },
          { code: 'JUIZ', name: 'Juiz de Fora' },
          { code: 'BETIM', name: 'Betim' }
        ]
      },
      { code: 'MS', name: 'Mato Grosso do Sul', type: 'state',
        cities: [
          { code: 'CAMPO', name: 'Campo Grande' },
          { code: 'DURA', name: 'Dourados' },
          { code: 'TRIN', name: 'Três Lagoas' },
          { code: 'CORUM', name: 'Corumbá' },
          { code: 'PONTA', name: 'Ponta Porã' }
        ]
      },
      { code: 'MT', name: 'Mato Grosso', type: 'state',
        cities: [
          { code: 'CUI', name: 'Cuiabá' },
          { code: 'VARG', name: 'Várzea Grande' },
          { code: 'ROND', name: 'Rondonópolis' },
          { code: 'SINOP', name: 'Sinop' },
          { code: 'TANG', name: 'Tangará da Serra' }
        ]
      },
      { code: 'PA', name: 'Pará', type: 'state',
        cities: [
          { code: 'BELE', name: 'Belém' },
          { code: 'ANAN', name: 'Ananindeua' },
          { code: 'SANT', name: 'Santarém' },
          { code: 'MARAB', name: 'Marabá' },
          { code: 'CAST', name: 'Castanhal' }
        ]
      },
      { code: 'PB', name: 'Paraíba', type: 'state',
        cities: [
          { code: 'JOAO', name: 'João Pessoa' },
          { code: 'CAMP', name: 'Campina Grande' },
          { code: 'SANTA', name: 'Santa Rita' },
          { code: 'PATOS', name: 'Patos' },
          { code: 'BAYE', name: 'Bayeux' }
        ]
      },
      { code: 'PE', name: 'Pernambuco', type: 'state',
        cities: [
          { code: 'REC', name: 'Recife' },
          { code: 'JABO', name: 'Jaboatão dos Guararapes' },
          { code: 'OLIND', name: 'Olinda' },
          { code: 'CARU', name: 'Caruaru' },
          { code: 'PETRO', name: 'Petrolina' }
        ]
      },
      { code: 'PI', name: 'Piauí', type: 'state',
        cities: [
          { code: 'TERE', name: 'Teresina' },
          { code: 'PICOS', name: 'Picos' },
          { code: 'PAU', name: 'Parnaíba' },
          { code: 'SAO', name: 'São Raimundo Nonato' },
          { code: 'FLOR', name: 'Floriano' }
        ]
      },
      { code: 'PR', name: 'Paraná', type: 'state',
        cities: [
          { code: 'CURIT', name: 'Curitiba' },
          { code: 'LONDR', name: 'Londrina' },
          { code: 'MARIN', name: 'Maringá' },
          { code: 'PONTA', name: 'Ponta Grossa' },
          { code: 'CASCA', name: 'Cascavel' }
        ]
      },
      { code: 'RJ', name: 'Rio de Janeiro', type: 'state',
        cities: [
          { code: 'RIO', name: 'Rio de Janeiro' },
          { code: 'SAO', name: 'São Gonçalo' },
          { code: 'DUCQ', name: 'Duque de Caxias' },
          { code: 'NOVA', name: 'Nova Iguaçu' },
          { code: 'NIT', name: 'Niterói' }
        ]
      },
      { code: 'RN', name: 'Rio Grande do Norte', type: 'state',
        cities: [
          { code: 'NATAL', name: 'Natal' },
          { code: 'MOSS', name: 'Mossoró' },
          { code: 'PARN', name: 'Parnamirim' },
          { code: 'SAO', name: 'São Gonçalo do Amarante' },
          { code: 'MAC', name: 'Macaíba' }
        ]
      },
      { code: 'RO', name: 'Rondônia', type: 'state',
        cities: [
          { code: 'PORT', name: 'Porto Velho' },
          { code: 'JI', name: 'Ji-Paraná' },
          { code: 'ARIQ', name: 'Ariquemes' },
          { code: 'VILH', name: 'Vilhena' },
          { code: 'CACO', name: 'Cacoal' }
        ]
      },
      { code: 'RR', name: 'Roraima', type: 'state',
        cities: [
          { code: 'BOA', name: 'Boa Vista' },
          { code: 'RAC', name: 'Rorainópolis' },
          { code: 'CARAC', name: 'Caracaraí' },
          { code: 'CANT', name: 'Cantá' },
          { code: 'MUCA', name: 'Mucajaí' }
        ]
      },
      { code: 'RS', name: 'Rio Grande do Sul', type: 'state',
        cities: [
          { code: 'PORT', name: 'Porto Alegre' },
          { code: 'CAX', name: 'Caxias do Sul' },
          { code: 'PELOT', name: 'Pelotas' },
          { code: 'CANOA', name: 'Canoas' },
          { code: 'BAGE', name: 'Bagé' }
        ]
      },
      { code: 'SC', name: 'Santa Catarina', type: 'state',
        cities: [
          { code: 'FLOR', name: 'Florianópolis' },
          { code: 'JOINV', name: 'Joinville' },
          { code: 'BLUM', name: 'Blumenau' },
          { code: 'SAO', name: 'São José' },
          { code: 'CHAPE', name: 'Chapecó' }
        ]
      },
      { code: 'SP', name: 'São Paulo', type: 'state',
        cities: [
          { code: 'SAO', name: 'São Paulo' },
          { code: 'GUAR', name: 'Guarulhos' },
          { code: 'CAMP', name: 'Campinas' },
          { code: 'SAO', name: 'São Bernardo do Campo' },
          { code: 'OSAS', name: 'Osasco' }
        ]
      },
      { code: 'SE', name: 'Sergipe', type: 'state',
        cities: [
          { code: 'ARAC', name: 'Aracaju' },
          { code: 'NOSS', name: 'Nossa Senhora do Socorro' },
          { code: 'LAGAR', name: 'Lagarto' },
          { code: 'ITAB', name: 'Itabaiana' },
          { code: 'SAO', name: 'São Cristóvão' }
        ]
      },
      { code: 'TO', name: 'Tocantins', type: 'state',
        cities: [
          { code: 'PALM', name: 'Palmas' },
          { code: 'ARAG', name: 'Araguaína' },
          { code: 'GURUPI', name: 'Gurupi' },
          { code: 'PORT', name: 'Porto Nacional' },
          { code: 'PARA', name: 'Paraíso do Tocantins' }
        ]
      }
    ]
  };

export default brazil;

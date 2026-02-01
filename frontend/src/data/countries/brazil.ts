/**
 * Brazil country data with states, cities, and tax information
 */

import { Country } from './index';

export const brazil: Country = {
    code: 'BR',
    name: 'Brazil',
    taxInfo: { standardRate: 17, taxName: 'ICMS', currency: 'BRL', region: 'LATAM' },
    provinces: [
      { code: 'SP', name: 'São Paulo',
        cities: [
          { code: 'SAO', name: 'São Paulo' },
          { code: 'GUARULHOS', name: 'Guarulhos' },
          { code: 'CAMPINAS', name: 'Campinas' },
          { code: 'SAO2', name: 'São Bernardo do Campo' },
          { code: 'SAO3', name: 'São José dos Campos' },
          { code: 'SANTOS', name: 'Santos' },
          { code: 'SOROCABA', name: 'Sorocaba' },
          { code: 'RIBEIRAO', name: 'Ribeirão Preto' },
          { code: 'OSASCO', name: 'Osasco' },
          { code: 'SAO4', name: 'São José do Rio Preto' }
        ]
      },
      { code: 'RJ', name: 'Rio de Janeiro',
        cities: [
          { code: 'RIO', name: 'Rio de Janeiro' },
          { code: 'SAO', name: 'São Gonçalo' },
          { code: 'DUQUE', name: 'Duque de Caxias' },
          { code: 'NOVA', name: 'Nova Iguaçu' },
          { code: 'NITEROI', name: 'Niterói' },
          { code: 'CAMPOS', name: 'Campos dos Goytacazes' },
          { code: 'PETROPOLIS', name: 'Petrópolis' },
          { code: 'VOLTA', name: 'Volta Redonda' },
          { code: 'BARRA', name: 'Barra do Piraí' },
          { code: 'MACAE', name: 'Macaé' }
        ]
      },
      { code: 'MG', name: 'Minas Gerais',
        cities: [
          { code: 'BELO', name: 'Belo Horizonte' },
          { code: 'UBERLANDIA', name: 'Uberlândia' },
          { code: 'CONTAGEM', name: 'Contagem' },
          { code: 'JUIZ', name: 'Juiz de Fora' },
          { code: 'BETIM', name: 'Betim' },
          { code: 'MONTES', name: 'Montes Claros' },
          { code: 'RIBEIRAO', name: 'Ribeirão das Neves' },
          { code: 'GOVERNADOR', name: 'Governador Valadares' },
          { code: 'IPATINGA', name: 'Ipatinga' },
          { code: 'DIVINOPOLIS', name: 'Divinópolis' }
        ]
      },
      { code: 'BA', name: 'Bahia',
        cities: [
          { code: 'SALVADOR', name: 'Salvador' },
          { code: 'FEIRA', name: 'Feira de Santana' },
          { code: 'VITORIA', name: 'Vitória da Conquista' },
          { code: 'CAMACARI', name: 'Camaçari' },
          { code: 'ITABUNA', name: 'Itabuna' },
          { code: 'JUAZEIRO', name: 'Juazeiro' },
          { code: 'ILHEUS', name: 'Ilhéus' },
          { code: 'JEQUIE', name: 'Jequié' },
          { code: 'ALAGOINHAS', name: 'Alagoinhas' },
          { code: 'BARREIRAS', name: 'Barreiras' }
        ]
      },
      { code: 'RS', name: 'Rio Grande do Sul',
        cities: [
          { code: 'PORTO', name: 'Porto Alegre' },
          { code: 'CAXIAS', name: 'Caxias do Sul' },
          { code: 'GRAVATAI', name: 'Gravataí' },
          { code: 'CANOAS', name: 'Canoas' },
          { code: 'SANTA', name: 'Santa Maria' },
          { code: 'NOVO', name: 'Novo Hamburgo' },
          { code: 'SAO', name: 'São Leopoldo' },
          { code: 'VIAMAO', name: 'Viamão' },
          { code: 'URUGUAIANA', name: 'Uruguaiana' },
          { code: 'SAPUCAIA', name: 'Sapucaia do Sul' }
        ]
      },
      { code: 'PR', name: 'Paraná',
        cities: [
          { code: 'CURITIBA', name: 'Curitiba' },
          { code: 'LONDRINA', name: 'Londrina' },
          { code: 'MARINGA', name: 'Maringá' },
          { code: 'PONTA', name: 'Ponta Grossa' },
          { code: 'CASCAVEL', name: 'Cascavel' },
          { code: 'SAO', name: 'São José dos Pinhais' },
          { code: 'FOZ', name: 'Foz do Iguaçu' },
          { code: 'GUARAPUAVA', name: 'Guarapuava' },
          { code: 'APUCARANA', name: 'Apucarana' },
          { code: 'PARANAGUA', name: 'Paranaguá' }
        ]
      },
      { code: 'PE', name: 'Pernambuco',
        cities: [
          { code: 'RECIFE', name: 'Recife' },
          { code: 'JABOATAO', name: 'Jaboatão dos Guararapes' },
          { code: 'OLINDA', name: 'Olinda' },
          { code: 'CARUARU', name: 'Caruaru' },
          { code: 'PETROLINA', name: 'Petrolina' },
          { code: 'PAULISTA', name: 'Paulista' },
          { code: 'CABO', name: 'Cabo de Santo Agostinho' },
          { code: 'CAMARAGIBE', name: 'Camaragibe' },
          { code: 'GARANHUNS', name: 'Garanhuns' },
          { code: 'VITORIA', name: 'Vitória de Santo Antão' }
        ]
      },
      { code: 'CE', name: 'Ceará',
        cities: [
          { code: 'FORTALEZA', name: 'Fortaleza' },
          { code: 'CAUCAIA', name: 'Caucaia' },
          { code: 'JUAZEIRO', name: 'Juazeiro do Norte' },
          { code: 'MARACANAU', name: 'Maracanaú' },
          { code: 'SOBRAL', name: 'Sobral' },
          { code: 'CRATO', name: 'Crato' },
          { code: 'ITAPIPOCA', name: 'Itapipoca' },
          { code: 'MARANGUAPE', name: 'Maranguape' },
          { code: 'IGUATU', name: 'Iguatu' },
          { code: 'TAUA', name: 'Tauá' }
        ]
      },
      { code: 'PA', name: 'Pará',
        cities: [
          { code: 'BELEM', name: 'Belém' },
          { code: 'ANANINDEUA', name: 'Ananindeua' },
          { code: 'SANTAREM', name: 'Santarém' },
          { code: 'MARABA', name: 'Marabá' },
          { code: 'PARAUAPEBAS', name: 'Parauapebas' },
          { code: 'CASTANHAL', name: 'Castanhal' },
          { code: 'ABAETETUBA', name: 'Abaetetuba' },
          { code: 'CAMETA', name: 'Cametá' },
          { code: 'BRAGANCA', name: 'Bragança' },
          { code: 'PARAGOMINAS', name: 'Paragominas' }
        ]
      },
      { code: 'SC', name: 'Santa Catarina',
        cities: [
          { code: 'FLORIANOPOLIS', name: 'Florianópolis' },
          { code: 'SAO', name: 'São José' },
          { code: 'JOINVILLE', name: 'Joinville' },
          { code: 'CHAPECO', name: 'Chapecó' },
          { code: 'CRICIUMA', name: 'Criciúma' },
          { code: 'LAGES', name: 'Lages' },
          { code: 'BLUMENAU', name: 'Blumenau' },
          { code: 'ITAJAI', name: 'Itajaí' },
          { code: 'SAO2', name: 'São Bento do Sul' },
          { code: 'BALNEARIO', name: 'Balneário Camboriú' }
        ]
      },
      { code: 'GO', name: 'Goiás',
        cities: [
          { code: 'GOIANIA', name: 'Goiânia' },
          { code: 'APARECIDA', name: 'Aparecida de Goiânia' },
          { code: 'ANAPOLIS', name: 'Anápolis' },
          { code: 'RIO', name: 'Rio Verde' },
          { code: 'LUZIANIA', name: 'Luziânia' },
          { code: 'AGUAS', name: 'Águas Lindas de Goiás' },
          { code: 'VALPARAISO', name: 'Valparaíso de Goiás' },
          { code: 'TRINDADE', name: 'Trindade' },
          { code: 'FORMOSA', name: 'Formosa' },
          { code: 'JATAI', name: 'Jataí' }
        ]
      },
      { code: 'MA', name: 'Maranhão',
        cities: [
          { code: 'SAO', name: 'São Luís' },
          { code: 'IMPERATRIZ', name: 'Imperatriz' },
          { code: 'SAO2', name: 'São José de Ribamar' },
          { code: 'TIMON', name: 'Timon' },
          { code: 'CAIXAS', name: 'Caxias' },
          { code: 'CODO', name: 'Codo' },
          { code: 'PAULINO', name: 'Paulino Neves' },
          { code: 'BACABAL', name: 'Bacabal' },
          { code: 'BARRA', name: 'Barra do Corda' },
          { code: 'CHAPADINHA', name: 'Chapadinha' }
        ]
      },
      { code: 'AM', name: 'Amazonas',
        cities: [
          { code: 'MANAUS', name: 'Manaus' },
          { code: 'PARINTINS', name: 'Parintins' },
          { code: 'ITACOATIARA', name: 'Itacoatiara' },
          { code: 'MANACAPURU', name: 'Manacapuru' },
          { code: 'COARI', name: 'Coari' },
          { code: 'TABATINGA', name: 'Tabatinga' },
          { code: 'TAPAUA', name: 'Tapaú' },
          { code: 'MAUES', name: 'Maués' },
          { code: 'HUMAITA', name: 'Humaitá' },
          { code: 'BORBA', name: 'Borba' }
        ]
      },
      { code: 'PI', name: 'Piauí',
        cities: [
          { code: 'TERESINA', name: 'Teresina' },
          { code: 'PICOS', name: 'Picos' },
          { code: 'SAO', name: 'São Raimundo Nonato' },
          { code: 'FLORIANO', name: 'Floriano' },
          { code: 'BARRAS', name: 'Barras' },
          { code: 'CAMPO', name: 'Campo Maior' },
          { code: 'PIRIPIRI', name: 'Piripiri' },
          { code: 'JOSE', name: 'José de Freitas' },
          { code: 'ALTOS', name: 'Altos' },
          { code: 'CORRENTE', name: 'Corrente' }
        ]
      },
      { code: 'RN', name: 'Rio Grande do Norte',
        cities: [
          { code: 'NATAL', name: 'Natal' },
          { code: 'MOSSORO', name: 'Mossoró' },
          { code: 'CAICO', name: 'Caicó' },
          { code: 'SAO', name: 'São Gonçalo do Amarante' },
          { code: 'MACAIBA', name: 'Macaíba' },
          { code: 'CANGUARETAMA', name: 'Canguaretama' },
          { code: 'SAO2', name: 'São Paulo do Potengi' },
          { code: 'PARNAMIRIM', name: 'Parnamirim' },
          { code: 'EXTREMOZ', name: 'Extremoz' },
          { code: 'ASSU', name: 'Assu' }
        ]
      },
      { code: 'AL', name: 'Alagoas',
        cities: [
          { code: 'MACEIO', name: 'Maceió' },
          { code: 'ARAPIRACA', name: 'Arapiraca' },
          { code: 'PALMEIRA', name: 'Palmeira dos Índios' },
          { code: 'RIO', name: 'Rio Largo' },
          { code: 'UNIAO', name: 'União dos Palmares' },
          { code: 'SAO', name: 'São Miguel dos Campos' },
          { code: 'SANTANA', name: 'Santana do Ipanema' },
          { code: 'DELMIRO', name: 'Delmiro Gouveia' },
          { code: 'CORURIPE', name: 'Coruripe' },
          { code: 'CAMPO', name: 'Campo Alegre' }
        ]
      },
      { code: 'SE', name: 'Sergipe',
        cities: [
          { code: 'ARACAJU', name: 'Aracaju' },
          { code: 'NOSSA', name: 'Nossa Senhora do Socorro' },
          { code: 'LAGARTO', name: 'Lagarto' },
          { code: 'ITABAIANA', name: 'Itabaiana' },
          { code: 'SAO', name: 'São Cristóvão' },
          { code: 'ESTANCIA', name: 'Estância' },
          { code: 'TOBIAS', name: 'Tobias Barreto' },
          { code: 'SIMAO', name: 'Simão Dias' },
          { code: 'POVO', name: 'Povoado' },
          { code: 'PINHEIRO', name: 'Pinheiro' }
        ]
      },
      { code: 'MT', name: 'Mato Grosso',
        cities: [
          { code: 'CUIABA', name: 'Cuiabá' },
          { code: 'VARGAS', name: 'Várzea Grande' },
          { code: 'RONDONOPOLIS', name: 'Rondonópolis' },
          { code: 'SINOP', name: 'Sinop' },
          { code: 'TANGARA', name: 'Tangará da Serra' },
          { code: 'CACERES', name: 'Cáceres' },
          { code: 'SORRISO', name: 'Sorriso' },
          { code: 'BARRA', name: 'Barra do Bugres' },
          { code: 'JUINA', name: 'Juína' },
          { code: 'PRIMAVERA', name: 'Primavera do Leste' }
        ]
      },
      { code: 'MS', name: 'Mato Grosso do Sul',
        cities: [
          { code: 'CAMPO', name: 'Campo Grande' },
          { code: 'DOURADOS', name: 'Dourados' },
          { code: 'TRINIDADE', name: 'Três Lagoas' },
          { code: 'CORUMBA', name: 'Corumbá' },
          { code: 'PONTA', name: 'Ponta Porã' },
          { code: 'NAVIRAI', name: 'Naviraí' },
          { code: 'NOVA', name: 'Nova Andradina' },
          { code: 'AQUIDAUANA', name: 'Aquidauana' },
          { code: 'SIDROLANDIA', name: 'Sidrolândia' },
          { code: 'PARAISO', name: 'Paraiso das Águas' }
        ]
      },
      { code: 'DF', name: 'Distrito Federal',
        cities: [
          { code: 'BRASILIA', name: 'Brasília' },
          { code: 'CEILANDIA', name: 'Ceilândia' },
          { code: 'TAGUATINGA', name: 'Taguatinga' },
          { code: 'SOBRADINHO', name: 'Sobradinho' },
          { code: 'GAMA', name: 'Gama' },
          { code: 'PLANALTINA', name: 'Planaltina' },
          { code: 'CRUZEIRO', name: 'Cruzeiro' },
          { code: 'SAMAMBAIA', name: 'Samambaia' },
          { code: 'SANTA', name: 'Santa Maria' },
          { code: 'NORTE', name: 'Norte' }
        ]
      },
      { code: 'RO', name: 'Rondônia',
        cities: [
          { code: 'PORTO', name: 'Porto Velho' },
          { code: 'JI', name: 'Ji-Paraná' },
          { code: 'ARIQUEMES', name: 'Ariquemes' },
          { code: 'Vilhena', name: 'Vilhena' },
          { code: 'CACOAL', name: 'Cacoal' },
          { code: 'ROLIM', name: 'Rolim de Moura' },
          { code: 'JARU', name: 'Jaru' },
          { code: 'PIMENTA', name: 'Pimenta Bueno' },
          { code: 'GUARA', name: 'Guajará-Mirim' },
          { code: 'ALTO', name: 'Alto Paraíso' }
        ]
      },
      { code: 'RR', name: 'Roraima',
        cities: [
          { code: 'BOA', name: 'Boa Vista' },
          { code: 'RORAINOPOLIS', name: 'Rorainópolis' },
          { code: 'CARACARAI', name: 'Caracaraí' },
          { code: 'CANTÁ', name: 'Cantá' },
          { code: 'MUCAJAI', name: 'Mucajaí' },
          { code: 'ALTO', name: 'Alto Alegre' },
          { code: 'BONFIM', name: 'Bonfim' },
          { code: 'NORMANDIA', name: 'Normandia' },
          { code: 'PACARAIMA', name: 'Pacaraima' },
          { code: 'SÃO', name: 'São João da Baliza' }
        ]
      },
      { code: 'AP', name: 'Amapá',
        cities: [
          { code: 'MACAPA', name: 'Macapá' },
          { code: 'SANTANA', name: 'Santana' },
          { code: 'LARANJAL', name: 'Laranjal do Jari' },
          { code: 'OIAPOQUE', name: 'Oiapoque' },
          { code: 'PORTO', name: 'Porto Grande' },
          { code: 'MAZAGAO', name: 'Mazagão' },
          { code: 'VITORIA', name: 'Vitória do Jari' },
          { code: 'PEDRA', name: 'Pedra Branca do Amapari' },
          { code: 'CALCOENE', name: 'Calçoene' },
          { code: 'CUTIAS', name: 'Cutias' }
        ]
      },
      { code: 'TO', name: 'Tocantins',
        cities: [
          { code: 'PALMAS', name: 'Palmas' },
          { code: 'ARAGUAINA', name: 'Araguaína' },
          { code: 'GURUPI', name: 'Gurupi' },
          { code: 'PORTO', name: 'Porto Nacional' },
          { code: 'ARAGUATINS', name: 'Araguatins' },
          { code: 'MIRACEMA', name: 'Miracema do Tocantins' },
          { code: 'TOCANTINOPOLIS', name: 'Tocantinópolis' },
          { code: 'PARAISO', name: 'Paraíso do Tocantins' },
          { code: 'COLINAS', name: 'Colinas do Tocantins' },
          { code: 'ARAGOMINAS', name: 'Aragominas' }
        ]
      }
    ]
};

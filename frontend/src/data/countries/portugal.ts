/**
 * Portugal country data with districts, cities, and tax information
 */

import { Country } from './index';

export const portugal: Country = {
    code: 'PT',
    name: 'Portugal',
    taxInfo: { standardRate: 23, taxName: 'VAT', currency: 'EUR', region: 'EU' },
    provinces: [
      { code: 'LIS', name: 'Lisbon',
        cities: [
          { code: 'LIS', name: 'Lisbon' },
          { code: 'CASCAIS', name: 'Cascais' },
          { code: 'ESTORIL', name: 'Estoril' },
          { code: 'SINTRA', name: 'Sintra' },
          { code: 'OEIRAS', name: 'Oeiras' },
          { code: 'ALMADA', name: 'Almada' },
          { code: 'SEIXAL', name: 'Seixal' },
          { code: 'BARREIRO', name: 'Barreiro' },
          { code: 'SETUBAL', name: 'Setubal' },
          { code: 'PONTA', name: 'Ponta Delgada' }
        ]
      },
      { code: 'POR', name: 'Porto',
        cities: [
          { code: 'POR', name: 'Porto' },
          { code: 'VILA', name: 'Vila Nova de Gaia' },
          { code: 'MATOSINHOS', name: 'Matosinhos' },
          { code: 'MAIA', name: 'Maia' },
          { code: 'GONDOMAR', name: 'Gondomar' },
          { code: 'VALONGO', name: 'Valongo' },
          { code: 'PAREDES', name: 'Paredes' },
          { code: 'LOUSA', name: 'Lousada' },
          { code: 'FELGUEIRAS', name: 'Felgueiras' },
          { code: 'PAÇOS', name: 'Paços de Ferreira' }
        ]
      },
      { code: 'BRG', name: 'Braga',
        cities: [
          { code: 'BRAGA', name: 'Braga' },
          { code: 'GUIMARAES', name: 'Guimaraes' },
          { code: 'BARCELOS', name: 'Barcelos' },
          { code: 'VILA', name: 'Vila Nova de Famalicão' },
          { code: 'FAMALICÃO', name: 'Famalicão' },
          { code: 'ESPOSENDE', name: 'Esposende' },
          { code: 'VILA2', name: 'Vila Verde' },
          { code: 'TERRAS', name: 'Terras de Bouro' },
          { code: 'CABECEIRAS', name: 'Cabeceiras de Basto' },
          { code: 'MONTALEGRE', name: 'Montalegre' }
        ]
      },
      { code: 'AVE', name: 'Aveiro',
        cities: [
          { code: 'AVEIRO', name: 'Aveiro' },
          { code: 'ILHAVO', name: 'Ilhavo' },
          { code: 'VAGOS', name: 'Vagos' },
          { code: 'OVAR', name: 'Ovar' },
          { code: 'ESPINHO', name: 'Espinho' },
          { code: 'SANTA', name: 'Santa Maria da Feira' },
          { code: 'SÃO', name: 'São João da Madeira' },
          { code: 'OLIVEIRA', name: 'Oliveira de Azeméis' },
          { code: 'ALBERGARIA', name: 'Albergaria-a-Velha' },
          { code: 'ÁGUEDA', name: 'Águeda' }
        ]
      },
      { code: 'COI', name: 'Coimbra',
        cities: [
          { code: 'COIMBRA', name: 'Coimbra' },
          { code: 'Figueira', name: 'Figueira da Foz' },
          { code: 'CANTANHEDE', name: 'Cantanhede' },
          { code: 'MIRA', name: 'Mira' },
          { code: 'LOUSÃ', name: 'Lousã' },
          { code: 'ARGANIL', name: 'Arganil' },
          { code: 'OLIVEIRA', name: 'Oliveira do Hospital' },
          { code: 'TÁBUA', name: 'Tábua' },
          { code: 'CARREGAL', name: 'Carregal do Sal' },
          { code: 'SOURE', name: 'Soure' }
        ]
      },
      { code: 'FAR', name: 'Faro',
        cities: [
          { code: 'FARO', name: 'Faro' },
          { code: 'ALBUFEIRA', name: 'Albufeira' },
          { code: 'LAGOS', name: 'Lagos' },
          { code: 'PORTIMÃO', name: 'Portimão' },
          { code: 'SILVES', name: 'Silves' },
          { code: 'ALCOUTIM', name: 'Alcoutim' },
          { code: 'ALJEZUR', name: 'Aljezur' },
          { code: 'VILA', name: 'Vila do Bispo' },
          { code: 'MONCHIQUE', name: 'Monchique' },
          { code: 'LOULÉ', name: 'Loulé' }
        ]
      },
      { code: 'EVO', name: 'Évora',
        cities: [
          { code: 'ÉVORA', name: 'Évora' },
          { code: 'VIANA', name: 'Viana do Alentejo' },
          { code: 'PORTO', name: 'Porto Covo' },
          { code: 'SINES', name: 'Sines' },
          { code: 'GRÂNDOLA', name: 'Grândola' },
          { code: 'ALCÁCER', name: 'Alcácer do Sal' },
          { code: 'MONTIJO', name: 'Montijo' },
          { code: 'ALCOCHETE', name: 'Alcochete' },
          { code: 'MOITA', name: 'Moita' },
          { code: 'BARREIRO', name: 'Barreiro' }
        ]
      },
      { code: 'SET', name: 'Setúbal',
        cities: [
          { code: 'SETÚBAL', name: 'Setúbal' },
          { code: 'SEIXAL', name: 'Seixal' },
          { code: 'ALMADA', name: 'Almada' },
          { code: 'BARREIRO', name: 'Barreiro' },
          { code: 'MOITA', name: 'Moita' },
          { code: 'MONTIJO', name: 'Montijo' },
          { code: 'ALCOCHETE', name: 'Alcochete' },
          { code: 'PALMELA', name: 'Palmela' },
          { code: 'SESIMBRA', name: 'Sesimbra' },
          { code: 'GRÂNDOLA', name: 'Grândola' }
        ]
      },
      { code: 'VRC', name: 'Viseu',
        cities: [
          { code: 'VISEU', name: 'Viseu' },
          { code: 'CARREGAL', name: 'Carregal do Sal' },
          { code: 'NELAS', name: 'Nelas' },
          { code: 'SÁTÃO', name: 'Sátão' },
          { code: 'VILA', name: 'Vila Nova de Paiva' },
          { code: 'MANGUALDE', name: 'Mangualde' },
          { code: 'SEIA', name: 'Seia' },
          { code: 'GOUVEIA', name: 'Gouveia' },
          { code: 'MÊDA', name: 'Mêda' },
          { code: 'VILA2', name: 'Vila Nova de Poiares' }
        ]
      },
      { code: 'VRL', name: 'Vila Real',
        cities: [
          { code: 'VILA', name: 'Vila Real' },
          { code: 'CHAVES', name: 'Chaves' },
          { code: 'VALPAÇOS', name: 'Valpaços' },
          { code: 'MIRANDELA', name: 'Mirandela' },
          { code: 'VILA2', name: 'Vila Pouca de Aguiar' },
          { code: 'ALIJÓ', name: 'Alijó' },
          { code: 'SABROSA', name: 'Sabrosa' },
          { code: 'MURÇA', name: 'Murça' },
          { code: 'CARPAZESA', name: 'Carrazeda de Ansiães' },
          { code: 'ALFÂNDEGA', name: 'Alfândega da Fé' }
        ]
      },
      { code: 'BRN', name: 'Bragança',
        cities: [
          { code: 'BRAGANÇA', name: 'Bragança' },
          { code: 'MIRANDA', name: 'Miranda do Douro' },
          { code: 'VIMIOSO', name: 'Vimioso' },
          { code: 'VINHAIS', name: 'Vinhais' },
          { code: 'BRAGANÇA2', name: 'Bragança' },
          { code: 'MIRANDA2', name: 'Miranda do Douro' },
          { code: 'VIMIOSO2', name: 'Vimioso' },
          { code: 'VINHAIS2', name: 'Vinhais' },
          { code: 'MIRANDELA', name: 'Mirandela' },
          { code: 'VALPAÇOS', name: 'Valpaços' }
        ]
      },
      { code: 'STR', name: 'Santarém',
        cities: [
          { code: 'SANTARÉM', name: 'Santarém' },
          { code: 'TOMAR', name: 'Tomar' },
          { code: 'TORRES', name: 'Torres Novas' },
          { code: 'ALMEIRIM', name: 'Almeirim' },
          { code: 'ALPIARÇA', name: 'Alpiarça' },
          { code: 'BENAVENTE', name: 'Benavente' },
          { code: 'CARREGADO', name: 'Carregado' },
          { code: 'AZAMBUJA', name: 'Azambuja' },
          { code: 'CARTAXO', name: 'Cartaxo' },
          { code: 'SANTARÉM2', name: 'Santarém' }
        ]
      },
      { code: 'LEI', name: 'Leiria',
        cities: [
          { code: 'LEIRIA', name: 'Leiria' },
          { code: 'CALDAS', name: 'Caldas da Rainha' },
          { code: 'ALCOBAÇA', name: 'Alcobaça' },
          { code: 'NAZARÉ', name: 'Nazaré' },
          { code: 'MARINHA', name: 'Marinha Grande' },
          { code: 'POMBAL', name: 'Pombal' },
          { code: 'FÁTIMA', name: 'Fátima' },
          { code: 'OURÉM', name: 'Ourém' },
          { code: 'ALCobaça', name: 'Alcobaça' },
          { code: 'BOMBARRAL', name: 'Bombarral' }
        ]
      },
      { code: 'GUA', name: 'Guarda',
        cities: [
          { code: 'GUARDA', name: 'Guarda' },
          { code: 'SEIA', name: 'Seia' },
          { code: 'GOUVEIA', name: 'Gouveia' },
          { code: 'MÊDA', name: 'Mêda' },
          { code: 'VILA', name: 'Vila Nova de Foz Côa' },
          { code: 'PINHEL', name: 'Pinhel' },
          { code: 'ALMEIDA', name: 'Almeida' },
          { code: 'FIGUEIRA', name: 'Figueira de Castelo Rodrigo' },
          { code: 'CELO', name: 'Celorico da Beira' },
          { code: 'MANTIGAS', name: 'Manteigas' }
        ]
      },
      { code: 'POR', name: 'Portalegre',
        cities: [
          { code: 'PORTALEGRE', name: 'Portalegre' },
          { code: 'ELVAS', name: 'Elvas' },
          { code: 'CAMPO', name: 'Campo Maior' },
          { code: 'ARRONCHES', name: 'Arronches' },
          { code: 'MONFORTE', name: 'Monte Forte' },
          { code: 'ALTER', name: 'Alter do Chão' },
          { code: 'CRATO', name: 'Crato' },
          { code: 'NISA', name: 'Nisa' },
          { code: 'GAVIÃO', name: 'Gavião' },
          { code: 'PONTE', name: 'Ponte de Sôr' }
        ]
      },
      { code: 'AZR', name: 'Azores',
        cities: [
          { code: 'PONTA', name: 'Ponta Delgada' },
          { code: 'RIBEIRA', name: 'Ribeira Grande' },
          { code: 'ANGRA', name: 'Angra do Heroísmo' },
          { code: 'HORTA', name: 'Horta' },
          { code: 'SÃO', name: 'São Miguel' },
          { code: 'TERCEIRA', name: 'Terceira' },
          { code: 'FAIAL', name: 'Faial' },
          { code: 'PICOS', name: 'Picos' },
          { code: 'SÃO2', name: 'São Jorge' },
          { code: 'GRACIOSA', name: 'Graciosa' }
        ]
      },
      { code: 'MDR', name: 'Madeira',
        cities: [
          { code: 'FUNCHAL', name: 'Funchal' },
          { code: 'SANTA', name: 'Santa Cruz' },
          { code: 'MACHICO', name: 'Machico' },
          { code: 'CÂMARA', name: 'Câmara de Lobos' },
          { code: 'RIBEIRA', name: 'Ribeira Brava' },
          { code: 'SANTANA', name: 'Santana' },
          { code: 'PORTO', name: 'Porto Moniz' },
          { code: 'SÃO', name: 'São Vicente' },
          { code: 'CALHETA', name: 'Calheta' },
          { code: 'PONTA', name: 'Ponta do Sol' }
        ]
      }
    ]
};

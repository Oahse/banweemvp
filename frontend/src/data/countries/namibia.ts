/**
 * Namibia country data with regions, cities, and tax information
 */

import { Country } from './index';

export const namibia: Country = {
    code: 'NA',
    name: 'Namibia',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'NAD', region: 'MEA' },
    provinces: [
      { code: 'KH', name: 'Khomas',
        cities: [
          { code: 'WIN', name: 'Windhoek' },
          { code: 'OKA', name: 'Okahandja' },
          { code: 'KAR', name: 'Karibib' },
          { code: 'OMA', name: 'Omaruru' },
          { code: 'OTJ', name: 'Otjiwarongo' },
          { code: 'SWA', name: 'Swakopmund' },
          { code: 'WAL', name: 'Walvis Bay' },
          { code: 'LUD', name: 'Lüderitz' },
          { code: 'OKA2', name: 'Okahandja' },
          { code: 'KAR2', name: 'Karibib' }
        ]
      },
      { code: 'ER', name: 'Erongo',
        cities: [
          { code: 'SWA', name: 'Swakopmund' },
          { code: 'WAL', name: 'Walvis Bay' },
          { code: 'LUD', name: 'Lüderitz' },
          { code: 'USAK', name: 'Usakos' },
          { code: 'KAR', name: 'Karibib' },
          { code: 'OMA', name: 'Omaruru' },
          { code: 'OTJ', name: 'Otjiwarongo' },
          { code: 'OKA', name: 'Okahandja' },
          { code: 'SWA2', name: 'Swakopmund' },
          { code: 'WAL2', name: 'Walvis Bay' }
        ]
      },
      { code: 'KU', name: 'Kunene',
        cities: [
          { code: 'Opuwo', name: 'Opuwo' },
          { code: 'OUT', name: 'Outjo' },
          { code: 'KAM', name: 'Kamanjab' },
          { code: 'KOR', name: 'Khorixas' },
          { code: 'TOR', name: 'Tsumeb' },
          { code: 'OND', name: 'Ondangwa' },
          { code: 'OND2', name: 'Ondangwa' },
          { code: 'TOR2', name: 'Tsumeb' },
          { code: 'OND3', name: 'Ondangwa' },
          { code: 'TOR3', name: 'Tsumeb' }
        ]
      },
      { code: 'OH', name: 'Ohangwena',
        cities: [
          { code: 'OND', name: 'Ondangwa' },
          { code: 'EEN', name: 'Eenhana' },
          { code: 'OND2', name: 'Ondangwa' },
          { code: 'EEN2', name: 'Eenhana' },
          { code: 'OND3', name: 'Ondangwa' },
          { code: 'EEN3', name: 'Eenhana' },
          { code: 'OND4', name: 'Ondangwa' },
          { code: 'EEN4', name: 'Eenhana' },
          { code: 'OND5', name: 'Ondangwa' },
          { code: 'EEN5', name: 'Eenhana' }
        ]
      },
      { code: 'OK', name: 'Okavango',
        cities: [
          { code: 'RUND', name: 'Rundu' },
          { code: 'DIV', name: 'Divundu' },
          { code: 'NKUR', name: 'Nkurenkuru' },
          { code: 'RUND2', name: 'Rundu' },
          { code: 'DIV2', name: 'Divundu' },
          { code: 'NKUR2', name: 'Nkurenkuru' },
          { code: 'RUND3', name: 'Rundu' },
          { code: 'DIV3', name: 'Divundu' },
          { code: 'NKUR3', name: 'Nkurenkuru' },
          { code: 'RUND4', name: 'Rundu' }
        ]
      },
      { code: 'OS', name: 'Omaheke',
        cities: [
          { code: 'GRO', name: 'Gobabis' },
          { code: 'WIT', name: 'Witvlei' },
          { code: 'ARO', name: 'Aroab' },
          { code: 'GRO2', name: 'Gobabis' },
          { code: 'WIT2', name: 'Witvlei' },
          { code: 'ARO2', name: 'Aroab' },
          { code: 'GRO3', name: 'Gobabis' },
          { code: 'WIT3', name: 'Witvlei' },
          { code: 'ARO3', name: 'Aroab' },
          { code: 'GRO4', name: 'Gobabis' }
        ]
      },
      { code: 'OT', name: 'Otjozondjupa',
        cities: [
          { code: 'OTJ', name: 'Otjiwarongo' },
          { code: 'OKA', name: 'Okahandja' },
          { code: 'KAR', name: 'Karibib' },
          { code: 'OMA', name: 'Omaruru' },
          { code: 'SWA', name: 'Swakopmund' },
          { code: 'WAL', name: 'Walvis Bay' },
          { code: 'LUD', name: 'Lüderitz' },
          { code: 'OKA2', name: 'Okahandja' },
          { code: 'KAR2', name: 'Karibib' },
          { code: 'OMA2', name: 'Omaruru' }
        ]
      },
      { code: 'ZA', name: 'Zambezi',
        cities: [
          { code: 'KAT', name: 'Katima Mulilo' },
          { code: 'KONG', name: 'Kongola' },
          { code: 'SCH', name: 'Schuckmannsburg' },
          { code: 'KAT2', name: 'Katima Mulilo' },
          { code: 'KONG2', name: 'Kongola' },
          { code: 'SCH2', name: 'Schuckmannsburg' },
          { code: 'KAT3', name: 'Katima Mulilo' },
          { code: 'KONG3', name: 'Kongola' },
          { code: 'SCH3', name: 'Schuckmannsburg' },
          { code: 'KAT4', name: 'Katima Mulilo' }
        ]
      },
      { code: 'HA', name: 'Hardap',
        cities: [
          { code: 'MAR', name: 'Mariental' },
          { code: 'REH', name: 'Rehoboth' },
          { code: 'MAR2', name: 'Mariental' },
          { code: 'REH2', name: 'Rehoboth' },
          { code: 'MAR3', name: 'Mariental' },
          { code: 'REH3', name: 'Rehoboth' },
          { code: 'MAR4', name: 'Mariental' },
          { code: 'REH4', name: 'Rehoboth' },
          { code: 'MAR5', name: 'Mariental' },
          { code: 'REH5', name: 'Rehoboth' }
        ]
      },
      { code: 'KA', name: 'Karas',
        cities: [
          { code: 'KEE', name: 'Keetmanshoop' },
          { code: 'LUD', name: 'Lüderitz' },
          { code: 'KAR', name: 'Karasburg' },
          { code: 'KEE2', name: 'Keetmanshoop' },
          { code: 'LUD2', name: 'Lüderitz' },
          { code: 'KAR2', name: 'Karasburg' },
          { code: 'KEE3', name: 'Keetmanshoop' },
          { code: 'LUD3', name: 'Lüderitz' },
          { code: 'KAR3', name: 'Karasburg' },
          { code: 'KEE4', name: 'Keetmanshoop' }
        ]
      }
    ]
  };

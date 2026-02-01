/**
 * Comoros country data with regions, cities, and tax information
 */

import { Country } from './index';

export const comoros: Country = {
    code: 'KM',
    name: 'Comoros',
    taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'KMF', region: 'MEA' },
    provinces: [
      { code: 'GRAN', name: 'Grande Comore',
        cities: [
          { code: 'MOR', name: 'Moroni' },
          { code: 'MUT', name: 'Mitsamiouli' },
          { code: 'DOM', name: 'Domoni' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'IKON', name: 'Ikoni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' }
        ]
      },
      { code: 'ANJ', name: 'Anjouan',
        cities: [
          { code: 'MUT', name: 'Mutsamudu' },
          { code: 'OUA', name: 'Ouani' },
          { code: 'DOM', name: 'Domoni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'ADD', name: 'Adda' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' },
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'IKON', name: 'Ikoni' }
        ]
      },
      { code: 'MOHE', name: 'Mohéli',
        cities: [
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'NIU', name: 'Nioumachoua' },
          { code: 'WAN', name: 'Wani' },
          { code: 'HOUM', name: 'Houmbou' },
          { code: 'MIR2', name: 'Mirontsi' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' },
          { code: 'MADJ', name: 'Madjouini' }
        ]
      },
      { code: 'MOR', name: 'Moroni',
        cities: [
          { code: 'MOR', name: 'Moroni' },
          { code: 'MUT', name: 'Mitsamiouli' },
          { code: 'DOM', name: 'Domoni' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'IKON', name: 'Ikoni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' }
        ]
      },
      { code: 'MUT', name: 'Mutsamudu',
        cities: [
          { code: 'MUT', name: 'Mutsamudu' },
          { code: 'OUA', name: 'Ouani' },
          { code: 'DOM', name: 'Domoni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'ADD', name: 'Adda' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' },
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'IKON', name: 'Ikoni' }
        ]
      },
      { code: 'FOMB', name: 'Fomboni',
        cities: [
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'NIU', name: 'Nioumachoua' },
          { code: 'WAN', name: 'Wani' },
          { code: 'HOUM', name: 'Houmbou' },
          { code: 'MIR2', name: 'Mirontsi' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' },
          { code: 'MADJ', name: 'Madjouini' }
        ]
      },
      { code: 'DOM', name: 'Domoni',
        cities: [
          { code: 'DOM', name: 'Domoni' },
          { code: 'MUT', name: 'Mutsamudu' },
          { code: 'OUA', name: 'Ouani' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'ADD', name: 'Adda' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' },
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'IKON', name: 'Ikoni' }
        ]
      },
      { code: 'OUA', name: 'Ouani',
        cities: [
          { code: 'OUA', name: 'Ouani' },
          { code: 'MUT', name: 'Mutsamudu' },
          { code: 'DOM', name: 'Domoni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'ADD', name: 'Adda' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' },
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'IKON', name: 'Ikoni' }
        ]
      },
      { code: 'MIR', name: 'Mirontsi',
        cities: [
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'NIU', name: 'Nioumachoua' },
          { code: 'WAN', name: 'Wani' },
          { code: 'HOUM', name: 'Houmbou' },
          { code: 'MIR2', name: 'Mirontsi' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' },
          { code: 'MADJ', name: 'Madjouini' }
        ]
      },
      { code: 'NIU', name: 'Nioumachoua',
        cities: [
          { code: 'NIU', name: 'Nioumachoua' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'WAN', name: 'Wani' },
          { code: 'HOUM', name: 'Houmbou' },
          { code: 'MIR2', name: 'Mirontsi' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' },
          { code: 'MADJ', name: 'Madjouini' }
        ]
      },
      { code: 'WAN', name: 'Wani',
        cities: [
          { code: 'WAN', name: 'Wani' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'NIU', name: 'Nioumachoua' },
          { code: 'HOUM', name: 'Houmbou' },
          { code: 'MIR2', name: 'Mirontsi' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' },
          { code: 'MADJ', name: 'Madjouini' }
        ]
      },
      { code: 'HOUM', name: 'Houmbou',
        cities: [
          { code: 'HOUM', name: 'Houmbou' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'NIU', name: 'Nioumachoua' },
          { code: 'WAN', name: 'Wani' },
          { code: 'MIR2', name: 'Mirontsi' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' },
          { code: 'MADJ', name: 'Madjouini' }
        ]
      },
      { code: 'ADD', name: 'Adda',
        cities: [
          { code: 'ADD', name: 'Adda' },
          { code: 'MUT', name: 'Mutsamudu' },
          { code: 'OUA', name: 'Ouani' },
          { code: 'DOM', name: 'Domoni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' },
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'IKON', name: 'Ikoni' }
        ]
      },
      { code: 'BAM', name: 'Bambao',
        cities: [
          { code: 'BAM', name: 'Bambao' },
          { code: 'MOR', name: 'Moroni' },
          { code: 'MUT', name: 'Mitsamiouli' },
          { code: 'DOM', name: 'Domoni' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'IKON', name: 'Ikoni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' }
        ]
      },
      { code: 'CHIN', name: 'Chindini',
        cities: [
          { code: 'CHIN', name: 'Chindini' },
          { code: 'MOR', name: 'Moroni' },
          { code: 'MUT', name: 'Mitsamiouli' },
          { code: 'DOM', name: 'Domoni' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'IKON', name: 'Ikoni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'HAN', name: 'Hagnamoundou' }
        ]
      },
      { code: 'HAN', name: 'Hagnamoundou',
        cities: [
          { code: 'HAN', name: 'Hagnamoundou' },
          { code: 'MOR', name: 'Moroni' },
          { code: 'MUT', name: 'Mitsamiouli' },
          { code: 'DOM', name: 'Domoni' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'IKON', name: 'Ikoni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' }
        ]
      },
      { code: 'MADJ', name: 'Madjouini',
        cities: [
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'MOR', name: 'Moroni' },
          { code: 'MUT', name: 'Mitsamiouli' },
          { code: 'DOM', name: 'Domoni' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'IKON', name: 'Ikoni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' }
        ]
      },
      { code: 'IKON', name: 'Ikoni',
        cities: [
          { code: 'IKON', name: 'Ikoni' },
          { code: 'MOR', name: 'Moroni' },
          { code: 'MUT', name: 'Mitsamiouli' },
          { code: 'DOM', name: 'Domoni' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' }
        ]
      },
      { code: 'MIR2', name: 'Mirontsi 2',
        cities: [
          { code: 'MIR2', name: 'Mirontsi' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'NIU', name: 'Nioumachoua' },
          { code: 'WAN', name: 'Wani' },
          { code: 'HOUM', name: 'Houmbou' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' },
          { code: 'MADJ', name: 'Madjouini' }
        ]
      },
      { code: 'MITS', name: 'Mitsamiouli',
        cities: [
          { code: 'MUT', name: 'Mitsamiouli' },
          { code: 'MOR', name: 'Moroni' },
          { code: 'DOM', name: 'Domoni' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'IKON', name: 'Ikoni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' }
        ]
      },
      { code: 'MIR3', name: 'Mirontsi 3',
        cities: [
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'NIU', name: 'Nioumachoua' },
          { code: 'WAN', name: 'Wani' },
          { code: 'HOUM', name: 'Houmbou' },
          { code: 'MIR2', name: 'Mirontsi' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' },
          { code: 'MADJ', name: 'Madjouini' }
        ]
      },
      { code: 'BAM2', name: 'Bambao 2',
        cities: [
          { code: 'BAM', name: 'Bambao' },
          { code: 'MOR', name: 'Moroni' },
          { code: 'MUT', name: 'Mitsamiouli' },
          { code: 'DOM', name: 'Domoni' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'IKON', name: 'Ikoni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' }
        ]
      },
      { code: 'CHIN2', name: 'Chindini 2',
        cities: [
          { code: 'CHIN', name: 'Chindini' },
          { code: 'MOR', name: 'Moroni' },
          { code: 'MUT', name: 'Mitsamiouli' },
          { code: 'DOM', name: 'Domoni' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'IKON', name: 'Ikoni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'HAN', name: 'Hagnamoundou' }
        ]
      },
      { code: 'HAN2', name: 'Hagnamoundou 2',
        cities: [
          { code: 'HAN', name: 'Hagnamoundou' },
          { code: 'MOR', name: 'Moroni' },
          { code: 'MUT', name: 'Mitsamiouli' },
          { code: 'DOM', name: 'Domoni' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'IKON', name: 'Ikoni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' }
        ]
      },
      { code: 'MADJ2', name: 'Madjouini 2',
        cities: [
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'MOR', name: 'Moroni' },
          { code: 'MUT', name: 'Mitsamiouli' },
          { code: 'DOM', name: 'Domoni' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'IKON', name: 'Ikoni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' }
        ]
      },
      { code: 'IKON2', name: 'Ikoni 2',
        cities: [
          { code: 'IKON', name: 'Ikoni' },
          { code: 'MOR', name: 'Moroni' },
          { code: 'MUT', name: 'Mitsamiouli' },
          { code: 'DOM', name: 'Domoni' },
          { code: 'FOMB', name: 'Fomboni' },
          { code: 'MIR', name: 'Mirontsi' },
          { code: 'MADJ', name: 'Madjouini' },
          { code: 'BAM', name: 'Bambao' },
          { code: 'CHIN', name: 'Chindini' },
          { code: 'HAN', name: 'Hagnamoundou' }
        ]
      }
    ]
  };

/**
 * Burundi country data with provinces and cities
 */

import { Country } from './index';

export const burundi: Country = {
  code: 'BI',
  name: 'Burundi',
  flag: '🇧🇮',
  capital: 'Gitega',
  area: 27834,
  currencySymbol: 'FBu',
  officialLanguages: ['Kirundi', 'French', 'English'],
  demonym: 'Burundian',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'BUJ', name: 'Bujumbura', type: 'province',
      cities: [
        { code: 'BUJUMBURA', name: 'Bujumbura' },
        { code: 'KANYOSHA', name: 'Kanyosha' },
        { code: 'KAMENGE', name: 'Kamenge' },
        { code: 'KINAMA', name: 'Kinama' },
        { code: 'MUGONGO', name: 'Mugongo' }
      ]
    },
    { code: 'BUB', name: 'Bubanza', type: 'province',
      cities: [
        { code: 'BUBANZA', name: 'Bubanza' },
        { code: 'MUSIGATI', name: 'Musigati' },
        { code: 'RUGAZI', name: 'Rugazi' },
        { code: 'GIHANGA', name: 'Gihanga' },
        { code: 'MPANDA', name: 'Mpanda' }
      ]
    },
    { code: 'BUR', name: 'Bururi', type: 'province',
      cities: [
        { code: 'BURURI', name: 'Bururi' },
        { code: 'RUMONGE', name: 'Rumonge' },
        { code: 'VYANDA', name: 'Vyanda' },
        { code: 'MATANA', name: 'Matana' },
        { code: 'MUGAMBA', name: 'Mugamba' }
      ]
    },
    { code: 'CANK', name: 'Cankuzo', type: 'province',
      cities: [
        { code: 'CANKUZO', name: 'Cankuzo' },
        { code: 'CENDAJURU', name: 'Cendajuru' },
        { code: 'GISAGARA', name: 'Gisagara' },
        { code: 'KIGANDA', name: 'Kiganda' },
        { code: 'MISHIKHA', name: 'Mishikha' }
      ]
    },
    { code: 'CIB', name: 'Cibitoke', type: 'province',
      cities: [
        { code: 'CIBITOKE', name: 'Cibitoke' },
        { code: 'BUGANDA', name: 'Buganda' },
        { code: 'BUKANYANANA', name: 'Bukanyanana' },
        { code: 'MABAYA', name: 'Mabaya' },
        { code: 'RUGOMBO', name: 'Rugombo' }
      ]
    },
    { code: 'GITE', name: 'Gitega', type: 'province',
      cities: [
        { code: 'GITEGA', name: 'Gitega' },
        { code: 'GIHETA', name: 'Giheta' },
        { code: 'ITABA', name: 'Itaba' },
        { code: 'NYABIKERE', name: 'Nyabikere' },
        { code: 'RYANSORO', name: 'Ryansoro' }
      ]
    },
    { code: 'KAR', name: 'Karuzi', type: 'province',
      cities: [
        { code: 'KARUZI', name: 'Karuzi' },
        { code: 'BUGENYUZA', name: 'Bugenyuzi' },
        { code: 'GITARAMUKA', name: 'Gitaramuka' },
        { code: 'MUTUMBA', name: 'Mutumba' },
        { code: 'NYABIKERE', name: 'Nyabikere' }
      ]
    },
    { code: 'KAY', name: 'Kayanza', type: 'province',
      cities: [
        { code: 'KAYANZA', name: 'Kayanza' },
        { code: 'MATONGO', name: 'Matongo' },
        { code: 'MUTAMBA', name: 'Mutamba' },
        { code: 'KABARORE', name: 'Kabarore' },
        { code: 'GAHUMBA', name: 'Gahumba' }
      ]
    },
    { code: 'KIR', name: 'Kirundo', type: 'province',
      cities: [
        { code: 'KIRUNDO', name: 'Kirundo' },
        { code: 'BUSONI', name: 'Busoni' },
        { code: 'BWEYERU', name: 'Bweyru' },
        { code: 'GITABE', name: 'Gitabe' },
        { code: 'KUBUGU', name: 'Kubugu' }
      ]
    },
    { code: 'MAK', name: 'Makamba', type: 'province',
      cities: [
        { code: 'MAKAMBA', name: 'Makamba' },
        { code: 'KAYOGORO', name: 'Kayogoro' },
        { code: 'KIBAGO', name: 'Kibago' },
        { code: 'MABANDA', name: 'Mabanda' },
        { code: 'VUGIZO', name: 'Vugizo' }
      ]
    },
    { code: 'MWAR', name: 'Mwaro', type: 'province',
      cities: [
        { code: 'MWARO', name: 'Mwaro' },
        { code: 'GISOZI', name: 'Gisozi' },
        { code: 'KAYOKWE', name: 'Kayokwe' },
        { code: 'NYABIKERE', name: 'Nyabikere' },
        { code: 'RUGOMBO', name: 'Rugombo' }
      ]
    },
    { code: 'MWY', name: 'Muyinga', type: 'province',
      cities: [
        { code: 'MUYINGA', name: 'Muyinga' },
        { code: 'GASHOHA', name: 'Gashoho' },
        { code: 'GITERANYI', name: 'Giteranyi' },
        { code: 'MUYINGA', name: 'Muyinga' },
        { code: 'RUSIZA', name: 'Rusiza' }
      ]
    },
    { code: 'NGO', name: 'Ngozi', type: 'province',
      cities: [
        { code: 'NGOZI', name: 'Ngozi' },
        { code: 'TANGARA', name: 'Tangara' },
        { code: 'MUYINGA', name: 'Muyinga' },
        { code: 'KIREMBA', name: 'Kiremba' },
        { code: 'MARANGARA', name: 'Marangara' }
      ]
    },
    { code: 'RUT', name: 'Rutana', type: 'province',
      cities: [
        { code: 'RUTANA', name: 'Rutana' },
        { code: 'GITANGA', name: 'Gitanga' },
        { code: 'MUSONGATI', name: 'Musongati' },
        { code: 'NYABITARE', name: 'Nyabitare' },
        { code: 'RUTANA', name: 'Rutana' }
      ]
    },
    { code: 'RUY', name: 'Ruyigi', type: 'province',
      cities: [
        { code: 'RUYIGI', name: 'Ruyigi' },
        { code: 'BUTAGANZWA', name: 'Butaganzwa' },
        { code: 'KINYINYA', name: 'Kinyinya' },
        { code: 'NYABITSINDA', name: 'Nyabitsinda' },
        { code: 'RUTANA', name: 'Rutana' }
      ]
    }
  ]
};

export default burundi;

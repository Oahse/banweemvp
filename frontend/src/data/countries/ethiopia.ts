/**
 * Ethiopia country data with regions, cities, and tax information
 */

import { Country } from './index';

export const ethiopia: Country = {
    code: 'ET',
    name: 'Ethiopia',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'ETB', region: 'MEA' },
    provinces: [
      { code: 'AA', name: 'Addis Ababa',
        cities: [
          { code: 'ADD', name: 'Addis Ababa' },
          { code: 'BOLE', name: 'Bole' },
          { code: 'KAZ', name: 'Kazanchis' },
          { code: 'PIASA', name: 'Piasa' },
          { code: 'MEX', name: 'Mexico' },
          { code: 'SAR', name: 'Saris' },
          { code: 'KIR', name: 'Kirkos' },
          { code: 'KOL', name: 'Kolfe' },
          { code: 'Yeka', name: 'Yeka' },
          { code: 'Lemi', name: 'Lemi Kura' }
        ]
      },
      { code: 'AF', name: 'Afar',
        cities: [
          { code: 'ASM', name: 'Asayita' },
          { code: 'AWA', name: 'Awash' },
          { code: 'CHIF', name: 'Chifra' },
          { code: 'DUB', name: 'Dubti' },
          { code: 'EL', name: 'Elidar' },
          { code: 'GUL', name: 'Gulina' },
          { code: 'LOG', name: 'Logiya' },
          { code: 'MIL', name: 'Mille' },
          { code: 'SEM', name: 'Semera' },
          { code: 'YAL', name: 'Yallo' }
        ]
      },
      { code: 'AM', name: 'Amhara',
        cities: [
          { code: 'BAH', name: 'Bahir Dar' },
          { code: 'GON', name: 'Gonder' },
          { code: 'DES', name: 'Dessie' },
          { code: 'DEB', name: 'Debre Birhan' },
          { code: 'DEB2', name: 'Debre Markos' },
          { code: 'FIN', name: 'Finote Selam' },
          { code: 'KEM', name: 'Kemise' },
          { code: 'LAL', name: 'Lalibela' },
          { code: 'WOL', name: 'Woldia' },
          { code: 'SEB', name: 'Sebeta' }
        ]
      },
      { code: 'BN', name: 'Benishangul-Gumuz',
        cities: [
          { code: 'ASSO', name: 'Asosa' },
          { code: 'KAM', name: 'Kamashi' },
          { code: 'MAN', name: 'Mandura' },
          { code: 'BEL', name: 'Bela' },
          { code: 'DIB', name: 'Dibate' },
          { code: 'GIL', name: 'Gilgel Beles' },
          { code: 'KUM', name: 'Kumruk' },
          { code: 'ODE', name: 'Oda Buldigilu' },
          { code: 'PEN', name: 'Pawe' },
          { code: 'SHER', name: 'Sherkole' }
        ]
      },
      { code: 'DD', name: 'Dire Dawa',
        cities: [
          { code: 'DIR', name: 'Dire Dawa' },
          { code: 'GUR', name: 'Gurgura' },
          { code: 'LEMO', name: 'Lemlem' },
          { code: 'MEL', name: 'Mekelle' },
          { code: 'GOL', name: 'Gololcha' },
          { code: 'HAR', name: 'Harar' },
          { code: 'CHER', name: 'Chercher' },
          { code: 'AWA', name: 'Awash' },
          { code: 'GUR2', name: 'Gurgura' },
          { code: 'LEMO2', name: 'Lemlem' }
        ]
      },
      { code: 'GA', name: 'Gambela',
        cities: [
          { code: 'GAM', name: 'Gambela' },
          { code: 'GOG', name: 'Gog' },
          { code: 'ITA', name: 'Itang' },
          { code: 'JIK', name: 'Jikawo' },
          { code: 'ABO', name: 'Abobo' },
          { code: 'DIM', name: 'Dimma' },
          { code: 'GOG2', name: 'Gog' },
          { code: 'JOR', name: 'Jor' },
          { code: 'LARE', name: 'Lare' },
          { code: 'WAN', name: 'Wanthoa' }
        ]
      },
      { code: 'HA', name: 'Harari',
        cities: [
          { code: 'HAR', name: 'Harar' },
          { code: 'JIG', name: 'Jigjiga' },
          { code: 'BAB', name: 'Babile' },
          { code: 'GUR', name: 'Gursum' },
          { code: 'FED', name: 'Fedis' },
          { code: 'GUR2', name: 'Guraguda' },
          { code: 'KAB', name: 'Kabri' },
          { code: 'KUL', name: 'Kulubi' },
          { code: 'MESA', name: 'Mesela' },
          { code: 'WABI', name: 'Wabi' }
        ]
      },
      { code: 'OR', name: 'Oromia',
        cities: [
          { code: 'ADA', name: 'Adama' },
          { code: 'ASA', name: 'Asella' },
          { code: 'BIS', name: 'Bishoftu' },
          { code: 'AME', name: 'Ambo' },
          { code: 'JIM', name: 'Jimma' },
          { code: 'NEG', name: 'Negelle' },
          { code: 'SHAS', name: 'Shashamane' },
          { code: 'WOL', name: 'Woliso' },
          { code: 'GIM', name: 'Gimbie' },
          { code: 'MET', name: 'Metu' }
        ]
      },
      { code: 'SN', name: 'Southern Nations',
        cities: [
          { code: 'AWA', name: 'Awassa' },
          { code: 'ARB', name: 'Arba Minch' },
          { code: 'DIL', name: 'Dilla' },
          { code: 'JIN', name: 'Jinka' },
          { code: 'KON', name: 'Konso' },
          { code: 'SOD', name: 'Sodo' },
          { code: 'WOL', name: 'Wolaita Sodo' },
          { code: 'HOS', name: 'Hosaena' },
          { code: 'BON', name: 'Bonga' },
          { code: 'MIZ', name: 'Mizan Teferi' }
        ]
      },
      { code: 'SO', name: 'Somali',
        cities: [
          { code: 'JIG', name: 'Jigjiga' },
          { code: 'DEG', name: 'Degehabur' },
          { code: 'GOD', name: 'Gode' },
          { code: 'KAB', name: 'Kebri Dahar' },
          { code: 'SHIN', name: 'Shinile' },
          { code: 'WER', name: 'Werder' },
          { code: 'DOL', name: 'Dollo' },
          { code: 'AFD', name: 'Afdem' },
          { code: 'EL', name: 'Elberi' },
          { code: 'FER', name: 'Ferer' }
        ]
      },
      { code: 'TI', name: 'Tigray',
        cities: [
          { code: 'MEK', name: 'Mekelle' },
          { code: 'AXU', name: 'Axum' },
          { code: 'ADW', name: 'Adwa' },
          { code: 'SHI', name: 'Shire' },
          { code: 'HUM', name: 'Humera' },
          { code: 'ALA', name: 'Alamata' },
          { code: 'KOR', name: 'Korem' },
          { code: 'SAH', name: 'Saesi Tsaeda' },
          { code: 'WUK', name: 'Wukro' },
          { code: 'ADIG', name: 'Adigrat' }
        ]
      }
    ]
  };

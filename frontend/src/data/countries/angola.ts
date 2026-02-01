/**
 * Angola country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const angola: Country = {
    code: 'AO',
    name: 'Angola',
    taxInfo: { standardRate: 14, taxName: 'VAT', currency: 'AOA', region: 'MEA' },
    provinces: [
      { code: 'BGO', name: 'Bengo',
        cities: [
          { code: 'CAB', name: 'Caxito' },
          { code: 'CAC', name: 'Cacuaco' },
          { code: 'CAT', name: 'Catete' },
          { code: 'DEM', name: 'Dembos' },
          { code: 'QUI', name: 'Quicabo' },
          { code: 'QUI2', name: 'Quixinge' },
          { code: 'MUC', name: 'Mucaba' },
          { code: 'NAM', name: 'Namboangongo' },
          { code: 'PAN', name: 'Panguila' },
          { code: 'KIS', name: 'Kisama' }
        ]
      },
      { code: 'BGU', name: 'Benguela',
        cities: [
          { code: 'BEN', name: 'Benguela' },
          { code: 'BAL', name: 'Bala' },
          { code: 'BAIL', name: 'Baía Farta' },
          { code: 'CUB', name: 'Cubal' },
          { code: 'GAND', name: 'Ganda' },
          { code: 'CAT', name: 'Catumbela' },
          { code: 'CAE', name: 'Caála' },
          { code: 'CHON', name: 'Chongorói' },
          { code: 'CUN', name: 'Cunje' },
          { code: 'LOBI', name: 'Lobito' }
        ]
      },
      { code: 'BIE', name: 'Bié',
        cities: [
          { code: 'KUI', name: 'Kuito' },
          { code: 'CAM', name: 'Camacupa' },
          { code: 'CUN', name: 'Cunhinga' },
          { code: 'MUN', name: 'Mumbondo' },
          { code: 'SANT', name: 'Santos' },
          { code: 'CHIN', name: 'Chinguar' },
          { code: 'CHIT', name: 'Chitembo' },
          { code: 'CATA', name: 'Catabola' },
          { code: 'NHA', name: 'Nharea' },
          { code: 'LON', name: 'Londuimbali' }
        ]
      },
      { code: 'CAB', name: 'Cabinda',
        cities: [
          { code: 'CAB', name: 'Cabinda' },
          { code: 'BUE', name: 'Buco Zau' },
          { code: 'BEL', name: 'Belize' },
          { code: 'CACO', name: 'Cacongo' },
          { code: 'CAI', name: 'Caio' },
          { code: 'MAL', name: 'Malembo' },
          { code: 'NEZ', name: 'Nezito' },
          { code: 'SUC', name: 'Soyo' },
          { code: 'TOM', name: 'Tombo' },
          { code: 'VIL', name: 'Vila' }
        ]
      },
      { code: 'CNN', name: 'Cunene',
        cities: [
          { code: 'ONG', name: 'Ondjiva' },
          { code: 'XAN', name: 'Xangongo' },
          { code: 'NAM', name: 'Namacunde' },
          { code: 'KUA', name: 'Kuando' },
          { code: 'MUK', name: 'Mukope' },
          { code: 'KAI', name: 'Kahama' },
          { code: 'OHA', name: 'Ohandja' },
          { code: 'NDE', name: 'Ndele' },
          { code: 'EVU', name: 'Evale' },
          { code: 'CUN', name: 'Cunene' }
        ]
      },
      { code: 'HUA', name: 'Huambo',
        cities: [
          { code: 'HUA', name: 'Huambo' },
          { code: 'CAL', name: 'Caála' },
          { code: 'UKU', name: 'Ukuma' },
          { code: 'TUN', name: 'Tchikala-Tcholohanga' },
          { code: 'LON', name: 'Londuimbali' },
          { code: 'ECU', name: 'Ecunha' },
          { code: 'LON2', name: 'Longonjo' },
          { code: 'MUN', name: 'Mungo' },
          { code: 'TCH', name: 'Tchiuma' },
          { code: 'CHIN', name: 'Chinguar' }
        ]
      },
      { code: 'HUI', name: 'Huíla',
        cities: [
          { code: 'LUB', name: 'Lubango' },
          { code: 'CAV', name: 'Cavango' },
          { code: 'CHIB', name: 'Chibia' },
          { code: 'CHI', name: 'Chipindo' },
          { code: 'CUC', name: 'Cuchi' },
          { code: 'CUN', name: 'Cunhinga' },
          { code: 'GAL', name: 'Galangue' },
          { code: 'JAM', name: 'Jamba' },
          { code: 'CAU', name: 'Cacula' },
          { code: 'HUM', name: 'Humpata' }
        ]
      },
      { code: 'CCU', name: 'Kwanza Norte',
        cities: [
          { code: 'NZA', name: 'N\'dalatando' },
          { code: 'CAM', name: 'Cambambe' },
          { code: 'CAS', name: 'Cazenga' },
          { code: 'DEM', name: 'Dembos' },
          { code: 'GOL', name: 'Golungo Alto' },
          { code: 'QUI', name: 'Quiculungo' },
          { code: 'SAMB', name: 'Samba Caju' },
          { code: 'BAN', name: 'Banga' },
          { code: 'CAB', name: 'Cabo Ledo' },
          { code: 'CAX', name: 'Caxito' }
        ]
      },
      { code: 'CUS', name: 'Kwanza Sul',
        cities: [
          { code: 'SUM', name: 'Sumbe' },
          { code: 'AMOI', name: 'Amboim' },
          { code: 'ASS', name: 'Assunção' },
          { code: 'CON', name: 'Conda' },
          { code: 'EBO', name: 'Ebo' },
          { code: 'SEI', name: 'Seles' },
          { code: 'LIB', name: 'Libongos' },
          { code: 'MUS', name: 'Mussende' },
          { code: 'QUE', name: 'Quessua' },
          { code: 'WAK', name: 'Wako Kungo' }
        ]
      },
      { code: 'CNO', name: 'Cuanza Norte',
        cities: [
          { code: 'NZA', name: 'N\'dalatando' },
          { code: 'CAM', name: 'Cambambe' },
          { code: 'CAS', name: 'Cazenga' },
          { code: 'DEM', name: 'Dembos' },
          { code: 'GOL', name: 'Golungo Alto' },
          { code: 'QUI', name: 'Quiculungo' },
          { code: 'SAMB', name: 'Samba Caju' },
          { code: 'BAN', name: 'Banga' },
          { code: 'CAB', name: 'Cabo Ledo' },
          { code: 'CAX', name: 'Caxito' }
        ]
      },
      { code: 'CNU', name: 'Cuanza Sul',
        cities: [
          { code: 'SUM', name: 'Sumbe' },
          { code: 'AMOI', name: 'Amboim' },
          { code: 'ASS', name: 'Assunção' },
          { code: 'CON', name: 'Conda' },
          { code: 'EBO', name: 'Ebo' },
          { code: 'SEI', name: 'Seles' },
          { code: 'LIB', name: 'Libongos' },
          { code: 'MUS', name: 'Mussende' },
          { code: 'QUE', name: 'Quessua' },
          { code: 'WAK', name: 'Wako Kungo' }
        ]
      },
      { code: 'LNO', name: 'Lunda Norte',
        cities: [
          { code: 'LUC', name: 'Lucapa' },
          { code: 'CAP', name: 'Capenda Camulemba' },
          { code: 'CHI', name: 'Chitato' },
          { code: 'CUAN', name: 'Cuilo' },
          { code: 'LUB', name: 'Lubalo' },
          { code: 'LUN', name: 'Lunda' },
          { code: 'MUS', name: 'Mussungo' },
          { code: 'XAM', name: 'Xá-Muteba' },
          { code: 'XAU', name: 'Xá-Longa' },
          { code: 'CAM', name: 'Cambulo' }
        ]
      },
      { code: 'LSU', name: 'Lunda Sul',
        cities: [
          { code: 'SAU', name: 'Saurimo' },
          { code: 'ALTO', name: 'Alto Chikapa' },
          { code: 'CACU', name: 'Cacolo' },
          { code: 'CHIK', name: 'Chikapa' },
          { code: 'DAN', name: 'Dala' },
          { code: 'MUK', name: 'Mukonde' },
          { code: 'MUN', name: 'Munhango' },
          { code: 'SOM', name: 'Sombo' },
          { code: 'XAM', name: 'Xá-Muteba' },
          { code: 'CAM', name: 'Cambulo' }
        ]
      },
      { code: 'MAL', name: 'Malanje',
        cities: [
          { code: 'MAL', name: 'Malanje' },
          { code: 'CAC', name: 'Cacuso' },
          { code: 'CAL', name: 'Calandula' },
          { code: 'CAM', name: 'Cambundi' },
          { code: 'CAZ', name: 'Cazenga' },
          { code: 'CUAN', name: 'Cuango' },
          { code: 'KIM', name: 'Kimbondo' },
          { code: 'KIS', name: 'Kissama' },
          { code: 'KUN', name: 'Kunda' },
          { code: 'MUC', name: 'Mucaba' }
        ]
      },
      { code: 'MOX', name: 'Moxico',
        cities: [
          { code: 'LU', name: 'Luena' },
          { code: 'ALTO', name: 'Alto Zambeze' },
          { code: 'CAME', name: 'Cameia' },
          { code: 'LEP', name: 'Léua' },
          { code: 'LON', name: 'Londuimbali' },
          { code: 'LUC', name: 'Luacano' },
          { code: 'MUN', name: 'Moxico' },
          { code: 'SANT', name: 'Santos' },
          { code: 'TEM', name: 'Tembo' },
          { code: 'VIL', name: 'Vila' }
        ]
      },
      { code: 'NAM', name: 'Namibe',
        cities: [
          { code: 'NAM', name: 'Namibe' },
          { code: 'BIB', name: 'Bibala' },
          { code: 'CAM', name: 'Camacuio' },
          { code: 'CHI', name: 'Chibia' },
          { code: 'MOU', name: 'Moual' },
          { code: 'TOM', name: 'Tombwa' },
          { code: 'VIR', name: 'Virei' },
          { code: 'BEN', name: 'Benguela' },
          { code: 'LUB', name: 'Lubango' },
          { code: 'HUA', name: 'Huambo' }
        ]
      },
      { code: 'UIG', name: 'Uíge',
        cities: [
          { code: 'UIG', name: 'Uíge' },
          { code: 'ALT', name: 'Alto Dondo' },
          { code: 'BEM', name: 'Bembe' },
          { code: 'BUN', name: 'Bungo' },
          { code: 'CAR', name: 'Carimbo' },
          { code: 'CUI', name: 'Cuimba' },
          { code: 'DIM', name: 'Dimuca' },
          { code: 'MAC', name: 'Macuco' },
          { code: 'MIL', name: 'Milunga' },
          { code: 'QUI', name: 'Quimbele' }
        ]
      },
      { code: 'ZAI', name: 'Zaire',
        cities: [
          { code: 'MBZ', name: 'M\'banza-Kongo' },
          { code: 'NOQ', name: 'N\'zeto' },
          { code: 'SOY', name: 'Soyo' },
          { code: 'TOM', name: 'Tomboco' },
          { code: 'WAM', name: 'Wamba-Kongo' },
          { code: 'CUF', name: 'Cuimba' },
          { code: 'NOG', name: 'Nogueira' },
          { code: 'QUI', name: 'Quincanda' },
          { code: 'SAL', name: 'Salinas' },
          { code: 'XAU', name: 'Xá-Muteba' }
        ]
      }
    ]
  };

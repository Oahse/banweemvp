/**
 * Benin country data with departments, cities, and tax information
 */

import { Country } from './index';

export const benin: Country = {
    code: 'BJ',
    name: 'Benin',
    taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'XOF', region: 'MEA' },
    provinces: [
      { code: 'ALI', name: 'Alibori',
        cities: [
          { code: 'BAN', name: 'Banikoara' },
          { code: 'KAN', name: 'Kandi' },
          { code: 'MAL', name: 'Malanville' },
          { code: 'KAR', name: 'Karimama' },
          { code: 'SEK', name: 'Ségbana' },
          { code: 'BEM', name: 'Bembèrèkè' },
          { code: 'BEN', name: 'Bembèrèkè' },
          { code: 'KOU', name: 'Kouandé' },
          { code: 'PAR', name: 'Parakou' },
          { code: 'NDA', name: 'N\'Dali' }
        ]
      },
      { code: 'ATA', name: 'Atacora',
        cities: [
          { code: 'NAT', name: 'Natitingou' },
          { code: 'BAN', name: 'Banikoara' },
          { code: 'KOU', name: 'Kouandé' },
          { code: 'PAR', name: 'Parakou' },
          { code: 'NDA', name: 'N\'Dali' },
          { code: 'BEM', name: 'Bembèrèkè' },
          { code: 'BEN', name: 'Bembèrèkè' },
          { code: 'KAN', name: 'Kandi' },
          { code: 'MAL', name: 'Malanville' },
          { code: 'KAR', name: 'Karimama' }
        ]
      },
      { code: 'ATL', name: 'Atlantique',
        cities: [
          { code: 'ABO', name: 'Abomey-Calavi' },
          { code: 'ALLA', name: 'Allada' },
          { code: 'KPOM', name: 'Kpomassè' },
          { code: 'OUID', name: 'Ouidah' },
          { code: 'SOK', name: 'Sô-Ava' },
          { code: 'Tori', name: 'Tori-Bossito' },
          { code: 'ZE', name: 'Zè' },
          { code: 'COT', name: 'Cotonou' },
          { code: 'GLO', name: 'Glo-Djigbé' },
          { code: 'GOD', name: 'Godomey' }
        ]
      },
      { code: 'BOR', name: 'Borgou',
        cities: [
          { code: 'PAR', name: 'Parakou' },
          { code: 'NDA', name: 'N\'Dali' },
          { code: 'BEM', name: 'Bembèrèkè' },
          { code: 'BEN', name: 'Bembèrèkè' },
          { code: 'KAN', name: 'Kandi' },
          { code: 'MAL', name: 'Malanville' },
          { code: 'KAR', name: 'Karimama' },
          { code: 'SEK', name: 'Ségbana' },
          { code: 'BAN', name: 'Banikoara' },
          { code: 'KOU', name: 'Kouandé' }
        ]
      },
      { code: 'COL', name: 'Collines',
        cities: [
          { code: 'SAV', name: 'Savalou' },
          { code: 'SAV2', name: 'Savè' },
          { code: 'DASS', name: 'Dassa-Zoumé' },
          { code: 'GLA', name: 'Glazoué' },
          { code: 'BANT', name: 'Bantè' },
          { code: 'DJO', name: 'Djougou' },
          { code: 'OUA', name: 'Ouassé' },
          { code: 'PAK', name: 'Pakè' },
          { code: 'TOU', name: 'Toucountouna' },
          { code: 'ZOG', name: 'Zogbodomey' }
        ]
      },
      { code: 'COU', name: 'Couffo',
        cities: [
          { code: 'DJOU', name: 'Djougou' },
          { code: 'OUA', name: 'Ouassé' },
          { code: 'PAK', name: 'Pakè' },
          { code: 'TOU', name: 'Toucountouna' },
          { code: 'ZOG', name: 'Zogbodomey' },
          { code: 'SAV', name: 'Savalou' },
          { code: 'SAV2', name: 'Savè' },
          { code: 'DASS', name: 'Dassa-Zoumé' },
          { code: 'GLA', name: 'Glazoué' },
          { code: 'BANT', name: 'Bantè' }
        ]
      },
      { code: 'DONG', name: 'Donga',
        cities: [
          { code: 'DJOU', name: 'Djougou' },
          { code: 'OUA', name: 'Ouassé' },
          { code: 'PAK', name: 'Pakè' },
          { code: 'TOU', name: 'Toucountouna' },
          { code: 'ZOG', name: 'Zogbodomey' },
          { code: 'SAV', name: 'Savalou' },
          { code: 'SAV2', name: 'Savè' },
          { code: 'DASS', name: 'Dassa-Zoumé' },
          { code: 'GLA', name: 'Glazoué' },
          { code: 'BANT', name: 'Bantè' }
        ]
      },
      { code: 'LIT', name: 'Littoral',
        cities: [
          { code: 'COT', name: 'Cotonou' },
          { code: 'ABO', name: 'Abomey-Calavi' },
          { code: 'ALLA', name: 'Allada' },
          { code: 'KPOM', name: 'Kpomassè' },
          { code: 'OUID', name: 'Ouidah' },
          { code: 'SOK', name: 'Sô-Ava' },
          { code: 'Tori', name: 'Tori-Bossito' },
          { code: 'ZE', name: 'Zè' },
          { code: 'GLO', name: 'Glo-Djigbé' },
          { code: 'GOD', name: 'Godomey' }
        ]
      },
      { code: 'MON', name: 'Mono',
        cities: [
          { code: 'LOK', name: 'Lokossa' },
          { code: 'ATH', name: 'Athiémé' },
          { code: 'BANT', name: 'Bantè' },
          { code: 'DJO', name: 'Djougou' },
          { code: 'OUA', name: 'Ouassé' },
          { code: 'PAK', name: 'Pakè' },
          { code: 'TOU', name: 'Toucountouna' },
          { code: 'ZOG', name: 'Zogbodomey' },
          { code: 'SAV', name: 'Savalou' },
          { code: 'SAV2', name: 'Savè' }
        ]
      },
      { code: 'OUÉ', name: 'Ouémé',
        cities: [
          { code: 'PORT', name: 'Porto-Novo' },
          { code: 'ADJ', name: 'Adjara' },
          { code: 'AGU', name: 'Aguié' },
          { code: 'AKP', name: 'Akpro-Missérété' },
          { code: 'AVR', name: 'Avrankou' },
          { code: 'BON', name: 'Bonou' },
          { code: 'DAN', name: 'Dangbo' },
          { code: 'KET', name: 'Kétou' },
          { code: 'POB', name: 'Pobè' },
          { code: 'SAK', name: 'Sakété' }
        ]
      },
      { code: 'PLA', name: 'Plateau',
        cities: [
          { code: 'SAK', name: 'Sakété' },
          { code: 'POB', name: 'Pobè' },
          { code: 'KET', name: 'Kétou' },
          { code: 'ADJ', name: 'Adjara' },
          { code: 'AGU', name: 'Aguié' },
          { code: 'AKP', name: 'Akpro-Missérété' },
          { code: 'AVR', name: 'Avrankou' },
          { code: 'BON', name: 'Bonou' },
          { code: 'DAN', name: 'Dangbo' },
          { code: 'PORT', name: 'Porto-Novo' }
        ]
      },
      { code: 'ZOU', name: 'Zou',
        cities: [
          { code: 'ABO', name: 'Abomey' },
          { code: 'AGA', name: 'Agbangnizoun' },
          { code: 'BOH', name: 'Bohicon' },
          { code: 'COU', name: 'Covè' },
          { code: 'DJAK', name: 'Djakotomey' },
          { code: 'OU', name: 'Ouinhi' },
          { code: 'SAV', name: 'Savalou' },
          { code: 'SAV2', name: 'Savè' },
          { code: 'ZAG', name: 'Zagnanado' },
          { code: 'ZOG', name: 'Zogbodomey' }
        ]
      }
    ]
  };

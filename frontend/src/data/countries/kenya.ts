/**
 * Kenya country data with counties and cities
 */

import { Country } from './index';

export const kenya: Country = {
  code: 'KE',
  name: 'Kenya',
  flag: '🇰🇪',
  capital: 'Nairobi',
  area: 580367,
  currencySymbol: 'KSh',
  officialLanguages: ['English', 'Swahili'],
  demonym: 'Kenyan',
  taxInfo: { standardRate: 16, taxName: 'VAT', currency: 'KES', region: 'MEA' },
  divisions: [
    { code: 'NBO', name: 'Nairobi', type: 'county',
      cities: [
        { code: 'NBI', name: 'Nairobi' },
        { code: 'KAREN', name: 'Karen' },
        { code: 'LANGATA', name: 'Langata' },
        { code: 'KASARANI', name: 'Kasarani' },
        { code: 'EMBAKASI', name: 'Embakasi' },
        { code: 'KIBERA', name: 'Kibera' },
        { code: 'WESTLANDS', name: 'Westlands' },
        { code: 'DAGORETTI', name: 'Dagoretti' },
        { code: 'KAMUKUNJI', name: 'Kamukunji' },
        { code: 'MATHARE', name: 'Mathare' }
      ]
    },
    { code: 'MSA', name: 'Mombasa', type: 'county',
      cities: [
        { code: 'MBA', name: 'Mombasa' },
        { code: 'NYALI', name: 'Nyali' },
        { code: 'DIANI', name: 'Diani' },
        { code: 'KILIFI', name: 'Kilifi' },
        { code: 'MALINDI', name: 'Malindi' },
        { code: 'LAMU', name: 'Lamu' },
        { code: 'KWALE', name: 'Kwale' },
        { code: 'VOI', name: 'Voi' },
        { code: 'TAVETA', name: 'Taveta' },
        { code: 'WUNDANYI', name: 'Wundanyi' }
      ]
    },
    { code: 'KSM', name: 'Kisumu', type: 'county',
      cities: [
        { code: 'KIS', name: 'Kisumu' },
        { code: 'MUMIAS', name: 'Mumias' },
        { code: 'SIAYA', name: 'Siaya' },
        { code: 'BONDO', name: 'Bondo' },
        { code: 'UCHENGA', name: 'Uchenga' }
      ]
    },
    { code: 'NKR', name: 'Nakuru', type: 'county',
      cities: [
        { code: 'NAK', name: 'Nakuru' },
        { code: 'NAIVASHA', name: 'Naivasha' },
        { code: 'GILGIL', name: 'Gilgil' },
        { code: 'MAI', name: 'Mai Mahiu' },
        { code: 'OL', name: 'Ol Kalou' }
      ]
    },
    { code: 'ELD', name: 'Eldoret', type: 'county',
      cities: [
        { code: 'ELD', name: 'Eldoret' },
        { code: 'ITEN', name: 'Iten' },
        { code: 'KAPSOWAR', name: 'Kapsowar' },
        { code: 'CHEPTIRET', name: 'Cheptiret' },
        { code: 'MOIBEN', name: 'Moiben' }
      ]
    },
    { code: 'KAK', name: 'Kakamega', type: 'county',
      cities: [
        { code: 'KAK', name: 'Kakamega' },
        { code: 'BUNGOMA', name: 'Bungoma' },
        { code: 'BUSIA', name: 'Busia' },
        { code: 'WEBUYE', name: 'Webuye' },
        { code: 'MALABA', name: 'Malaba' }
      ]
    },
    { code: 'NRI', name: 'Nyeri', type: 'county',
      cities: [
        { code: 'NYE', name: 'Nyeri' },
        { code: 'Othaya', name: 'Othaya' },
        { code: 'MUKURWEINI', name: 'Mukurweini' },
        { code: 'Tetu', name: 'Tetu' },
        { code: 'Mathira', name: 'Mathira' }
      ]
    },
    { code: 'MRC', name: 'Meru', type: 'county',
      cities: [
        { code: 'MER', name: 'Meru' },
        { code: 'CHUKA', name: 'Chuka' },
        { code: 'NKUBU', name: 'Nkubu' },
        { code: 'MAUA', name: 'Maua' },
        { code: 'TIMAU', name: 'Timau' }
      ]
    },
    { code: 'KTI', name: 'Kitui', type: 'county',
      cities: [
        { code: 'KIT', name: 'Kitui' },
        { code: 'Mwingi', name: 'Mwingi' },
        { code: 'Mutomo', name: 'Mutomo' },
        { code: 'Kisasi', name: 'Kisasi' },
        { code: 'Ikutha', name: 'Ikutha' }
      ]
    },
    { code: 'GAR', name: 'Garissa', type: 'county',
      cities: [
        { code: 'GAR', name: 'Garissa' },
        { code: 'Wajir', name: 'Wajir' },
        { code: 'Mandera', name: 'Mandera' },
        { code: 'Elwak', name: 'Elwak' },
        { code: 'Lagdera', name: 'Lagdera' }
      ]
    },
    { code: 'TUR', name: 'Turkana', type: 'county',
      cities: [
        { code: 'TUR', name: 'Turkana' },
        { code: 'Lodwar', name: 'Lodwar' },
        { code: 'Kakuma', name: 'Kakuma' },
        { code: 'Lokichoggio', name: 'Lokichoggio' },
        { code: 'Lokiriama', name: 'Lokiriama' }
      ]
    },
    { code: 'BAR', name: 'Baringo', type: 'county',
      cities: [
        { code: 'BAR', name: 'Baringo' },
        { code: 'Kabarnet', name: 'Kabarnet' },
        { code: 'Eldama Ravine', name: 'Eldama Ravine' },
        { code: 'Marigat', name: 'Marigat' },
        { code: 'Mogotio', name: 'Mogotio' }
      ]
    },
    { code: 'BOM', name: 'Bomet', type: 'county',
      cities: [
        { code: 'BOM', name: 'Bomet' },
        { code: 'Sotik', name: 'Sotik' },
        { code: 'Konoin', name: 'Konoin' },
        { code: 'Chepalungu', name: 'Chepalungu' },
        { code: 'Bomosarek', name: 'Bomosarek' }
      ]
    },
    { code: 'BUN', name: 'Bungoma', type: 'county',
      cities: [
        { code: 'BUN', name: 'Bungoma' },
        { code: 'Webuye', name: 'Webuye' },
        { code: 'Kimilili', name: 'Kimilili' },
        { code: 'Tongaren', name: 'Tongaren' },
        { code: 'Kaptama', name: 'Kaptama' }
      ]
    },
    { code: 'BUS', name: 'Busia', type: 'county',
      cities: [
        { code: 'BUS', name: 'Busia' },
        { code: 'Malaba', name: 'Malaba' },
        { code: 'Port Victoria', name: 'Port Victoria' },
        { code: 'Nambale', name: 'Nambale' },
        { code: 'Budalangi', name: 'Budalangi' }
      ]
    },
    { code: 'ELG', name: 'Elgeyo Marakwet', type: 'county',
      cities: [
        { code: 'ELG', name: 'Elgeyo Marakwet' },
        { code: 'Iten', name: 'Iten' },
        { code: 'Kapsowar', name: 'Kapsowar' },
        { code: 'Cheptiret', name: 'Cheptiret' },
        { code: 'Arror', name: 'Arror' }
      ]
    },
    { code: 'EMB', name: 'Embu', type: 'county',
      cities: [
        { code: 'EMB', name: 'Embu' },
        { code: 'Runyenjes', name: 'Runyenjes' },
        { code: 'Mbeere', name: 'Mbeere' },
        { code: 'Siakago', name: 'Siakago' },
        { code: 'Kiritiri', name: 'Kiritiri' }
      ]
    },
    { code: 'HOM', name: 'Homa Bay', type: 'county',
      cities: [
        { code: 'HOM', name: 'Homa Bay' },
        { code: 'Mbita', name: 'Mbita' },
        { code: 'Rongo', name: 'Rongo' },
        { code: 'Ndhiwa', name: 'Ndhiwa' },
        { code: 'Suba', name: 'Suba' }
      ]
    },
    { code: 'ISIO', name: 'Isiolo', type: 'county',
      cities: [
        { code: 'ISIO', name: 'Isiolo' },
        { code: 'Garba Tula', name: 'Garba Tula' },
        { code: 'Merti', name: 'Merti' },
        { code: 'Kinna', name: 'Kinna' },
        { code: 'Oldonyiro', name: 'Oldonyiro' }
      ]
    },
    { code: 'KAJ', name: 'Kajiado', type: 'county',
      cities: [
        { code: 'KAJ', name: 'Kajiado' },
        { code: 'Ngong', name: 'Ngong' },
        { code: 'Ongata Rongai', name: 'Ongata Rongai' },
        { code: 'Kitengela', name: 'Kitengela' },
        { code: 'Loitokitok', name: 'Loitokitok' }
      ]
    },
    { code: 'KAM', name: 'Kilifi', type: 'county',
      cities: [
        { code: 'KIL', name: 'Kilifi' },
        { code: 'Malindi', name: 'Malindi' },
        { code: 'Mtwapa', name: 'Mtwapa' },
        { code: 'Watamu', name: 'Watamu' },
        { code: 'Ganze', name: 'Ganze' }
      ]
    },
    { code: 'KIR', name: 'Kirinyaga', type: 'county',
      cities: [
        { code: 'KIR', name: 'Kirinyaga' },
        { code: 'Kutus', name: 'Kutus' },
        { code: 'Sagana', name: 'Sagana' },
        { code: 'Kerugoya', name: 'Kerugoya' },
        { code: 'Baricho', name: 'Baricho' }
      ]
    },
    { code: 'KUR', name: 'Kuria', type: 'county',
      cities: [
        { code: 'KUR', name: 'Kuria' },
        { code: 'Kehancha', name: 'Kehancha' },
        { code: 'Isebania', name: 'Isebania' },
        { code: 'Nyamache', name: 'Nyamache' },
        { code: 'Kegonga', name: 'Kegonga' }
      ]
    },
    { code: 'KWLE', name: 'Kwale', type: 'county',
      cities: [
        { code: 'KWA', name: 'Kwale' },
        { code: 'Diani', name: 'Diani' },
        { code: 'Ukunda', name: 'Ukunda' },
        { code: 'Msambweni', name: 'Msambweni' },
        { code: 'Kinango', name: 'Kinango' }
      ]
    },
    { code: 'LAIK', name: 'Laikipia', type: 'county',
      cities: [
        { code: 'LAIK', name: 'Laikipia' },
        { code: 'Nanyuki', name: 'Nanyuki' },
        { code: 'Nyahururu', name: 'Nyahururu' },
        { code: 'Rumuruti', name: 'Rumuruti' },
        { code: 'Ol Joro Orok', name: 'Ol Joro Orok' }
      ]
    },
    { code: 'LAMU', name: 'Lamu', type: 'county',
      cities: [
        { code: 'LAM', name: 'Lamu' },
        { code: 'Mpeketoni', name: 'Mpeketoni' },
        { code: 'Faza', name: 'Faza' },
        { code: 'Pate', name: 'Pate' },
        { code: 'Shela', name: 'Shela' }
      ]
    },
    { code: 'MCH', name: 'Machakos', type: 'county',
      cities: [
        { code: 'MCH', name: 'Machakos' },
        { code: 'Athi River', name: 'Athi River' },
        { code: 'Mavoko', name: 'Mavoko' },
        { code: 'Matungulu', name: 'Matungulu' },
        { code: 'Kangundo', name: 'Kangundo' }
      ]
    },
    { code: 'MAK', name: 'Makueni', type: 'county',
      cities: [
        { code: 'MAK', name: 'Makueni' },
        { code: 'Wote', name: 'Wote' },
        { code: 'Kibwezi', name: 'Kibwezi' },
        { code: 'Mbooni', name: 'Mbooni' },
        { code: 'Kaiti', name: 'Kaiti' }
      ]
    },
    { code: 'MAND', name: 'Mandera', type: 'county',
      cities: [
        { code: 'MAND', name: 'Mandera' },
        { code: 'Elwak', name: 'Elwak' },
        { code: 'Rhamu', name: 'Rhamu' },
        { code: 'Banisa', name: 'Banisa' },
        { code: 'Takaba', name: 'Takaba' }
      ]
    },
    { code: 'MARS', name: 'Marsabit', type: 'county',
      cities: [
        { code: 'MARS', name: 'Marsabit' },
        { code: 'Moyale', name: 'Moyale' },
        { code: 'Sololo', name: 'Sololo' },
        { code: 'Laisamis', name: 'Laisamis' },
        { code: 'North Horr', name: 'North Horr' }
      ]
    },
    { code: 'MIG', name: 'Migori', type: 'county',
      cities: [
        { code: 'MIG', name: 'Migori' },
        { code: 'Kehancha', name: 'Kehancha' },
        { code: 'Isebania', name: 'Isebania' },
        { code: 'Rongo', name: 'Rongo' },
        { code: 'Awendo', name: 'Awendo' }
      ]
    },
    { code: 'MUR', name: 'Muranga', type: 'county',
      cities: [
        { code: 'MUR', name: 'Muranga' },
        { code: 'Murang\'a', name: 'Murang\'a' },
        { code: 'Kangema', name: 'Kangema' },
        { code: 'Kigumo', name: 'Kigumo' },
        { code: 'Kandara', name: 'Kandara' }
      ]
    },
    { code: 'NAN', name: 'Nandi', type: 'county',
      cities: [
        { code: 'NAN', name: 'Nandi' },
        { code: 'Kapsabet', name: 'Kapsabet' },
        { code: 'Nandi Hills', name: 'Nandi Hills' },
        { code: 'Cheptanyot', name: 'Cheptanyot' },
        { code: 'Kobujoi', name: 'Kobujoi' }
      ]
    },
    { code: 'NAR', name: 'Narok', type: 'county',
      cities: [
        { code: 'NAR', name: 'Narok' },
        { code: 'Maai Mahiu', name: 'Maai Mahiu' },
        { code: 'Narok Town', name: 'Narok Town' },
        { code: 'Enoosaen', name: 'Enoosaen' },
        { code: 'Kilgoris', name: 'Kilgoris' }
      ]
    },
    { code: 'NYA', name: 'Nyandarua', type: 'county',
      cities: [
        { code: 'NYA', name: 'Nyandarua' },
        { code: 'Ol Kalou', name: 'Ol Kalou' },
        { code: 'Ol Joro Orok', name: 'Ol Joro Orok' },
        { code: 'Kinangop', name: 'Kinangop' },
        { code: 'Ndaragwa', name: 'Ndaragwa' }
      ]
    },
    { code: 'NYR', name: 'Nyamira', type: 'county',
      cities: [
        { code: 'NYR', name: 'Nyamira' },
        { code: 'Nyamira Town', name: 'Nyamira Town' },
        { code: 'Rigoma', name: 'Rigoma' },
        { code: 'Manga', name: 'Manga' },
        { code: 'Bonyamatuta', name: 'Bonyamatuta' }
      ]
    },
    { code: 'SAMB', name: 'Samburu', type: 'county',
      cities: [
        { code: 'SAMB', name: 'Samburu' },
        { code: 'Maralal', name: 'Maralal' },
        { code: 'Baragoi', name: 'Baragoi' },
        { code: 'Archers Post', name: 'Archers Post' },
        { code: 'Wamba', name: 'Wamba' }
      ]
    },
    { code: 'SIAY', name: 'Siaya', type: 'county',
      cities: [
        { code: 'SIA', name: 'Siaya' },
        { code: 'Bondo', name: 'Bondo' },
        { code: 'Ugunja', name: 'Ugunja' },
        { code: 'Ugenya', name: 'Ugenya' },
        { code: 'Alego', name: 'Alego' }
      ]
    },
    { code: 'TAV', name: 'Taveta', type: 'county',
      cities: [
        { code: 'TAV', name: 'Taveta' },
        { code: 'Taveta Town', name: 'Taveta Town' },
        { code: 'Mbale', name: 'Mbale' },
        { code: 'Chala', name: 'Chala' },
        { code: 'Boma', name: 'Boma' }
      ]
    },
    { code: 'THAR', name: 'Tharaka Nithi', type: 'county',
      cities: [
        { code: 'THAR', name: 'Tharaka Nithi' },
        { code: 'Kathwana', name: 'Kathwana' },
        { code: 'Chuka', name: 'Chuka' },
        { code: 'Mitheru', name: 'Mitheru' },
        { code: 'Nkondi', name: 'Nkondi' }
      ]
    },
    { code: 'TRAN', name: 'Trans Nzoia', type: 'county',
      cities: [
        { code: 'TRAN', name: 'Trans Nzoia' },
        { code: 'Kitale', name: 'Kitale' },
        { code: 'Endebess', name: 'Endebess' },
        { code: 'Kwanza', name: 'Kwanza' },
        { code: 'Cherangany', name: 'Cherangany' }
      ]
    },
    { code: 'UAS', name: 'Uasin Gishu', type: 'county',
      cities: [
        { code: 'UAS', name: 'Uasin Gishu' },
        { code: 'Eldoret', name: 'Eldoret' },
        { code: 'Burnt Forest', name: 'Burnt Forest' },
        { code: 'Moiben', name: 'Moiben' },
        { code: 'Ziwa', name: 'Ziwa' }
      ]
    },
    { code: 'VAI', name: 'Vihiga', type: 'county',
      cities: [
        { code: 'VAI', name: 'Vihiga' },
        { code: 'Mbale', name: 'Mbale' },
        { code: 'Vihiga Town', name: 'Vihiga Town' },
        { code: 'Sabatia', name: 'Sabatia' },
        { code: 'Hamisi', name: 'Hamisi' }
      ]
    },
    { code: 'WAJ', name: 'Wajir', type: 'county',
      cities: [
        { code: 'WAJ', name: 'Wajir' },
        { code: 'Habaswein', name: 'Habaswein' },
        { code: 'Eldas', name: 'Eldas' },
        { code: 'Tarbaj', name: 'Tarbaj' },
        { code: 'Buna', name: 'Buna' }
      ]
    },
    { code: 'WES', name: 'West Pokot', type: 'county',
      cities: [
        { code: 'WES', name: 'West Pokot' },
        { code: 'Kapenguria', name: 'Kapenguria' },
        { code: 'Sigor', name: 'Sigor' },
        { code: 'Kacheliba', name: 'Kacheliba' },
        { code: 'Chepareria', name: 'Chepareria' }
      ]
    }
  ]
};

export default kenya;

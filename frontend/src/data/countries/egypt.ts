/**
 * Egypt country data with governorates, cities, and tax information
 */

import { Country } from './index';

export const egypt: Country = {
    code: 'EG',
    name: 'Egypt',
    taxInfo: { standardRate: 14, taxName: 'VAT', currency: 'EGP', region: 'MEA' },
    provinces: [
      { code: 'CAI', name: 'Cairo',
        cities: [
          { code: 'CAI', name: 'Cairo' },
          { code: 'GIZ', name: 'Giza' },
          { code: 'HEL', name: 'Helwan' },
          { code: '6OC', name: '6th of October' },
          { code: 'NEW', name: 'New Cairo' },
          { code: 'NAS', name: 'Nasr City' },
          { code: 'MAA', name: 'Maadi' },
          { code: 'HAD', name: 'Heliopolis' },
          { code: 'SHO', name: 'Shubra' },
          { code: 'ZAM', name: 'Zamalek' }
        ]
      },
      { code: 'ALEX', name: 'Alexandria',
        cities: [
          { code: 'ALEX', name: 'Alexandria' },
          { code: 'BOR', name: 'Borg El Arab' },
          { code: 'AMR', name: 'Amreya' },
          { code: 'MEX', name: 'Mex' },
          { code: 'ABO', name: 'Abu Qir' },
          { code: 'EDK', name: 'Edko' },
          { code: 'RASH', name: 'Rashid' },
          { code: 'DUM', name: 'Damanhour' },
          { code: 'KAFF', name: 'Kafr El Dawwar' },
          { code: 'EL', name: 'El Alamein' }
        ]
      },
      { code: 'GIZ', name: 'Giza',
        cities: [
          { code: 'GIZ', name: 'Giza' },
          { code: '6OC', name: '6th of October' },
          { code: 'HELM', name: 'Helwan' },
          { code: 'IMB', name: 'Imbaba' },
          { code: 'BOL', name: 'Bolak' },
          { code: 'DOQ', name: 'Doqqi' },
          { code: 'AGU', name: 'Aguza' },
          { code: 'PYR', name: 'Pyramids' },
          { code: 'FAY', name: 'Fayoum' },
          { code: 'BANI', name: 'Bani Suef' }
        ]
      },
      { code: 'SHAR', name: 'Sharqia',
        cities: [
          { code: 'ZAG', name: 'Zagazig' },
          { code: 'TEN', name: 'Tanta' },
          { code: 'EL', name: 'El Mahalla El Kubra' },
          { code: 'MANS', name: 'Mansoura' },
          { code: 'DAK', name: 'Dakahlia' },
          { code: 'KAH', name: 'Kafr El Sheikh' },
          { code: 'DAM', name: 'Damietta' },
          { code: 'PORT', name: 'Port Said' },
          { code: 'ISMA', name: 'Ismailia' },
          { code: 'SUEZ', name: 'Suez' }
        ]
      },
      { code: 'DAK', name: 'Dakahlia',
        cities: [
          { code: 'MANS', name: 'Mansoura' },
          { code: 'TAN', name: 'Tanta' },
          { code: 'EL', name: 'El Mahalla El Kubra' },
          { code: 'MIT', name: 'Mit Ghamr' },
          { code: 'DAM', name: 'Damietta' },
          { code: 'BIL', name: 'Bilqas' },
          { code: 'SIN', name: 'Sinbillawin' },
          { code: 'AGA', name: 'Aga' },
          { code: 'MAN', name: 'Mansha' },
          { code: 'DEK', name: 'Dekernes' }
        ]
      },
      { code: 'BEH', name: 'Beheira',
        cities: [
          { code: 'DAM', name: 'Damanhour' },
          { code: 'KAFF', name: 'Kafr El Dawwar' },
          { code: 'ABU', name: 'Abu Hummus' },
          { code: 'ETAY', name: 'Etay El Barud' },
          { code: 'HOUSH', name: 'Hosh Issa' },
          { code: 'DEL', name: 'Delengat' },
          { code: 'DIS', name: 'Disuq' },
          { code: 'RASH', name: 'Rashid' },
          { code: 'EDK', name: 'Edku' },
          { code: 'KO', name: 'Kom Hamada' }
        ]
      },
      { code: 'QAL', name: 'Qalyubia',
        cities: [
          { code: 'BAN', name: 'Banha' },
          { code: 'SHOUB', name: 'Shoubra El Kheima' },
          { code: 'QAL', name: 'Qalyub' },
          { code: 'TOUK', name: 'Toukh' },
          { code: 'KHA', name: 'Khanka' },
          { code: 'QAH', name: 'Qaha' },
          { code: 'SHIB', name: 'Shibin El Qanater' },
          { code: 'KOT', name: 'Koto' },
          { code: 'EL', name: 'El Qanater' },
          { code: 'MIT', name: 'Mit Naggar' }
        ]
      },
      { code: 'GAR', name: 'Gharbia',
        cities: [
          { code: 'TAN', name: 'Tanta' },
          { code: 'EL', name: 'El Mahalla El Kubra' },
          { code: 'KAFF', name: 'Kafr El Zayat' },
          { code: 'SAM', name: 'Samanoud' },
          { code: 'ZET', name: 'Zefta' },
          { code: 'BAS', name: 'Basyoun' },
          { code: 'MOT', name: 'Mota' },
          { code: 'SIR', name: 'Sirr' },
          { code: 'KOT', name: 'Koto' },
          { code: 'EL2', name: 'El Santa' }
        ]
      },
      { code: 'MEN', name: 'Menoufia',
        cities: [
          { code: 'SHEB', name: 'Shebin El Kom' },
          { code: 'MEN', name: 'Menouf' },
          { code: 'ASH', name: 'Ashmoun' },
          { code: 'BREN', name: 'Brenshail' },
          { code: 'SAD', name: 'Sadat City' },
          { code: 'TAL', name: 'Tala' },
          { code: 'QES', name: 'Quesna' },
          { code: 'BAG', name: 'Bagour' },
          { code: 'SHO', name: 'Shohag' },
          { code: 'BER', name: 'Berkit El Saber' }
        ]
      },
      { code: 'FAY', name: 'Fayoum',
        cities: [
          { code: 'FAY', name: 'Fayoum' },
          { code: 'TAMI', name: 'Tamiya' },
          { code: 'ITS', name: 'Itsa' },
          { code: 'SIN', name: 'Sinawis' },
          { code: 'YOUS', name: 'Yousef El Sedeek' },
          { code: 'ABU', name: 'Abu Tesheet' },
          { code: 'NEW', name: 'New Fayoum City' },
          { code: 'TUN', name: 'Tunis' },
          { code: 'KOT', name: 'Kot' },
          { code: 'SAH', name: 'Saharta' }
        ]
      },
      { code: 'KAH', name: 'Kafr El Sheikh',
        cities: [
          { code: 'KAH', name: 'Kafr El Sheikh' },
          { code: 'SIDI', name: 'Sidi Salem' },
          { code: 'EL', name: 'El Hamool' },
          { code: 'FAR', name: 'Farskour' },
          { code: 'DIS', name: 'Disuq' },
          { code: 'BIL', name: 'Bilqas' },
          { code: 'MET', name: 'Metoubes' },
          { code: 'QUT', name: 'Qutur' },
          { code: 'EL2', name: 'El Reyad' },
          { code: 'RIY', name: 'Riyadh' }
        ]
      },
      { code: 'MIN', name: 'Minya',
        cities: [
          { code: 'MIN', name: 'Minya' },
          { code: 'MAL', name: 'Mallawi' },
          { code: 'SAM', name: 'Samalut' },
          { code: 'ABU', name: 'Abu Qurqas' },
          { code: 'MATAI', name: 'Matai' },
          { code: 'BENI', name: 'Beni Mazar' },
          { code: 'MAG', name: 'Maghagha' },
          { code: 'EL', name: 'El Idara' },
          { code: 'DEIR', name: 'Deir Mawas' },
          { code: 'NEW', name: 'New Minya City' }
        ]
      },
      { code: 'ASW', name: 'Aswan',
        cities: [
          { code: 'ASW', name: 'Aswan' },
          { code: 'EDFU', name: 'Edfu' },
          { code: 'KOM', name: 'Kom Ombo' },
          { code: 'DAR', name: 'Daraw' },
          { code: 'KAL', name: 'Kalabsha' },
          { code: 'SEBE', name: 'Sebeel' },
          { code: 'PHIL', name: 'Philae' },
          { code: 'ABU', name: 'Abu Simbel' },
          { code: 'NAS', name: 'Nasr El Nuba' },
          { code: 'KOS', name: 'Kostam' }
        ]
      },
      { code: 'ASY', name: 'Asyut',
        cities: [
          { code: 'ASY', name: 'Asyut' },
          { code: 'MAN', name: 'Manfalut' },
          { code: 'ABU', name: 'Abu Tig' },
          { code: 'SAD', name: 'Sadat City' },
          { code: 'DI', name: 'Dairut' },
          { code: 'QUS', name: 'Qusia' },
          { code: 'EL', name: 'El Badari' },
          { code: 'BANI', name: 'Bani Adi' },
          { code: 'SAH', name: 'Sahel Selim' },
          { code: 'EL2', name: 'El Fashn' }
        ]
      },
      { code: 'SUE', name: 'Suez',
        cities: [
          { code: 'SUE', name: 'Suez' },
          { code: 'ARAB', name: 'Arab' },
          { code: 'ATT', name: 'Attaka' },
          { code: 'GAN', name: 'Ganayen' },
          { code: 'FAID', name: 'Faid' },
          { code: 'RAS', name: 'Ras Sudr' },
          { code: 'ABU', name: 'Abu Sultan' },
          { code: 'EL', name: 'El Qantara' },
          { code: 'SIN', name: 'Sinai' },
          { code: 'PORT', name: 'Port Tawfik' }
        ]
      },
      { code: 'ISMA', name: 'Ismailia',
        cities: [
          { code: 'ISMA', name: 'Ismailia' },
          { code: 'FAID', name: 'Faid' },
          { code: 'ABU', name: 'Abu Suweir' },
          { code: 'KAS', name: 'Kassassin' },
          { code: 'EL', name: 'El Qantara' },
          { code: 'QAT', name: 'Qantara' },
          { code: 'TEN', name: 'Tenis' },
          { code: 'SAL', name: 'Salam' },
          { code: 'ABU2', name: 'Abu Kebir' },
          { code: 'NEW', name: 'New Ismailia City' }
        ]
      },
      { code: 'LUX', name: 'Luxor',
        cities: [
          { code: 'LUX', name: 'Luxor' },
          { code: 'KAR', name: 'Karnak' },
          { code: 'VAL', name: 'Valley of the Kings' },
          { code: 'ABU', name: 'Abu El Haggag' },
          { code: 'EL', name: 'El Tod' },
          { code: 'ARM', name: 'Armant' },
          { code: 'ESNA', name: 'Esna' },
          { code: 'EDFU', name: 'Edfu' },
          { code: 'QUS', name: 'Qus' },
          { code: 'NEW', name: 'New Luxor City' }
        ]
      },
      { code: 'RED', name: 'Red Sea',
        cities: [
          { code: 'HUR', name: 'Hurghada' },
          { code: 'SHARM', name: 'Sharm El Sheikh' },
          { code: 'EL', name: 'El Gouna' },
          { code: 'MARSA', name: 'Marsa Alam' },
          { code: 'SAF', name: 'Safaga' },
          { code: 'RAS', name: 'Ras Gharib' },
          { code: 'QUS', name: 'Quseir' },
          { code: 'BER', name: 'Berenice' },
          { code: 'ST', name: 'Saint Catherine' },
          { code: 'DAHAB', name: 'Dahab' }
        ]
      },
      { code: 'NORTH', name: 'North Sinai',
        cities: [
          { code: 'ARISH', name: 'El Arish' },
          { code: 'RAFAH', name: 'Rafah' },
          { code: 'SHEIK', name: 'Sheikh Zuweid' },
          { code: 'BIR', name: 'Bir al-Abed' },
          { code: 'HAS', name: 'Hasana' },
          { code: 'QAT', name: 'Qatiya' },
          { code: 'NAG', name: 'Nagaa' },
          { code: 'RUM', name: 'Rumana' },
          { code: 'KAL', name: 'Kalah' },
          { code: 'ABU', name: 'Abu Aqila' }
        ]
      },
      { code: 'SOUTH', name: 'South Sinai',
        cities: [
          { code: 'SHARM', name: 'Sharm El Sheikh' },
          { code: 'DAHAB', name: 'Dahab' },
          { code: 'NUWEIB', name: 'Nuweiba' },
          { code: 'TABA', name: 'Taba' },
          { code: 'ST', name: 'Saint Catherine' },
          { code: 'RAS', name: 'Ras Sudr' },
          { code: 'ABU', name: 'Abu Zenima' },
          { code: 'TUR', name: 'Tur' },
          { code: 'WADI', name: 'Wadi Feiran' },
          { code: 'SINAI', name: 'Sinai' }
        ]
      },
      { code: 'MAT', name: 'Matrouh',
        cities: [
          { code: 'MAT', name: 'Marsa Matrouh' },
          { code: 'EL', name: 'El Alamein' },
          { code: 'SIDI', name: 'Sidi Barrani' },
          { code: 'SAL', name: 'Salum' },
          { code: 'SOL', name: 'Sollum' },
          { code: 'SIWA', name: 'Siwa' },
          { code: 'DABAA', name: 'Dabaa' },
          { code: 'EL2', name: 'El Dabaa' },
          { code: 'MIR', name: 'Mir' },
          { code: 'NEW', name: 'New Matrouh City' }
        ]
      },
      { code: 'NEW', name: 'New Valley',
        cities: [
          { code: 'KHAR', name: 'Kharga' },
          { code: 'DAK', name: 'Dakhla' },
          { code: 'FAR', name: 'Farafra' },
          { code: 'BAH', name: 'Bahariya' },
          { code: 'BAR', name: 'Baris' },
          { code: 'QAS', name: 'Qasr' },
          { code: 'EL', name: 'El Kharga' },
          { code: 'MOG', name: 'Mog' },
          { code: 'BAL', name: 'Balat' },
          { code: 'NEW', name: 'New Valley City' }
        ]
      }
    ]
  };

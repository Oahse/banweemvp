/**
 * Egypt country data with governorates and cities
 */

import { Country } from './index';

export const egypt: Country = {
  code: 'EG',
  name: 'Egypt',
  flag: '🇪🇬',
  capital: 'Cairo',
  area: 1001450,
  currencySymbol: '£',
  officialLanguages: ['Arabic'],
  demonym: 'Egyptian',
  taxInfo: { standardRate: 14, taxName: 'VAT', currency: 'EGP', region: 'MEA' },
  divisions: [
    { code: 'C', name: 'Cairo', type: 'governorate',
      cities: [
        { code: 'CAIRO', name: 'Cairo' },
        { code: 'GIZA', name: 'Giza' },
        { code: 'SHUBRA', name: 'Shubra' },
        { code: 'NASR', name: 'Nasr City' },
        { code: 'HELIOPOLIS', name: 'Heliopolis' },
        { code: 'MAADI', name: 'Maadi' },
        { code: 'ZAMALEK', name: 'Zamalek' },
        { code: 'DOQQI', name: 'Dokki' },
        { code: 'AGOUZA', name: 'Agouza' },
        { code: 'MOHANDESEEN', name: 'Mohandessin' }
      ]
    },
    { code: 'ALX', name: 'Alexandria', type: 'governorate',
      cities: [
        { code: 'ALEX', name: 'Alexandria' },
        { code: 'SMOUHA', name: 'Smouha' },
        { code: 'SIDI', name: 'Sidi Gaber' },
        { code: 'MANSHEYA', name: 'Mansheya' },
        { code: 'KA', name: 'Kafr El Sheikh' },
        { code: 'BORG', name: 'Borg El Arab' },
        { code: 'EL', name: 'El Max' },
        { code: 'ABU', name: 'Abu Qir' },
        { code: 'EDKO', name: 'Edko' },
        { code: 'RASHID', name: 'Rashid' }
      ]
    },
    { code: 'GZ', name: 'Giza', type: 'governorate',
      cities: [
        { code: 'GIZA', name: 'Giza' },
        { code: '6TH', name: '6th of October' },
        { code: 'SHEIK', name: 'Sheikh Zayed' },
        { code: 'OB', name: 'Obour' },
        { code: 'HADAYEK', name: 'Hadaek' },
        { code: 'ABU', name: 'Abu Rawash' },
        { code: 'KAFR', name: 'Kaf El Sheikh' },
        { code: 'QALUBIYA', name: 'Qalyubia' }
      ]
    },
    { code: 'SHR', name: 'Sharqia', type: 'governorate',
      cities: [
        { code: 'SHR', name: 'Sharqia' },
        { code: '10TH', name: '10th of Ramadan' },
        { code: '15TH', name: '15th of May' },
        { code: 'ABU', name: 'Abu Zaabal' },
        { code: 'TANTA', name: 'Tanta' },
        { code: 'EL', name: 'El Mahalla' },
        { code: 'FAKUS', name: 'Faqus' },
        { code: 'SALHE', name: 'Salheya' },
        { code: 'EL', name: 'El Mahalla El Koubra' }
      ]
    },
    { code: 'DK', name: 'Dakahlia', type: 'governorate',
      cities: [
        { code: 'DAK', name: 'Dakahlia' },
        { code: 'MANSOUR', name: 'Mansoura' },
        { code: 'TALKHA', name: 'Talkha' },
        { code: 'MET', name: 'Met' },
        { code: 'BILQAS', name: 'Bilqas' },
        { code: 'MALLAWI', name: 'Mallawi' },
        { code: 'MINYA', name: 'Minya' },
        { code: 'SINBEL', name: 'Sinbellawin' },
        { code: 'ABU', name: 'Abu Tig' }
      ]
    },
    { code: 'KFR', name: 'Kafr El Sheikh', type: 'governorate',
      cities: [
        { code: 'KAFR', name: 'Kafr El Sheikh' },
        { code: 'QALUBIYA', name: 'Qalyubia' },
        { code: 'TALA', name: 'Tala' },
        { code: 'SADAT', name: 'Sadat City' },
        { code: 'EL', name: 'El Mahalla' },
        { code: 'SERSH', name: 'Serapeum' },
        { code: 'ABU', name: 'Abu Tig' },
        { code: 'EL', name: 'El Qattawiya' }
      ]
    },
    { code: 'FYM', name: 'Faiyum', type: 'governorate',
      cities: [
        { code: 'FAY', name: 'Faiyum' },
        { code: 'SEN', name: 'Senaris' },
        { code: 'IBSHAWAY', name: 'Ibshaway' },
        { code: 'ITSA', name: 'Its' },
        { code: 'TAMIA', name: 'Tamia' },
        { code: 'YOUSUF', name: 'Yousif' },
        { code: 'EL', name: 'El Wasta' },
        { code: 'BENI', name: 'Beni Suef' },
        { code: 'EL', name: 'El Fayoum' }
      ]
    },
    { code: 'IS', name: 'Ismailia', type: 'governorate',
      cities: [
        { code: 'IS', name: 'Ismailia' },
        { code: 'PORT', name: 'Port Said' },
        { code: 'SUEZ', name: 'Suez' },
        { code: 'FAID', name: 'Faid' },
        { code: 'ABU', name: 'Abu Sultan' },
        { code: 'QATTARA', name: 'Qattara' },
        { code: 'NEW', name: 'New City' },
        { code: 'SALAM', name: 'Salam' },
        { code: '10TH', name: '10th of Ramadan' },
        { code: 'AL', name: 'Al Ismailia' }
      ]
    },
    { code: 'MN', name: 'Monufia', type: 'governorate',
      cities: [
        { code: 'MONU', name: 'Monuf' },
        { code: 'SIDI', name: 'Sidi Gaber' },
        { code: 'EL', name: 'El Mokattam' },
        { code: 'BANI', name: 'Bani Suef' },
        { code: 'EL', name: 'El Wasta' },
        { code: 'SADAT', name: 'Sadat City' },
        { code: 'SHEBIN', name: 'Shebin El Kom' },
        { code: 'EL', name: 'El Minya' },
        { code: 'BILQAS', name: 'Bilqas' }
      ]
    },
    { code: 'WHD', name: 'New Valley', type: 'governorate',
      cities: [
        { code: 'KHARGA', name: 'Kharga' },
        { code: 'DAKHLA', name: 'Dakhla' },
        { code: 'PARAN', name: 'Paran' },
        { code: 'FARAFRA', name: 'Farafra' },
        { code: 'BALAT', name: 'Balat' },
        { code: 'BIR', name: 'Bir' }
      ]
    },
    { code: 'ASW', name: 'Aswan', type: 'governorate',
      cities: [
        { code: 'ASWAN', name: 'Aswan' },
        { code: 'EDFU', name: 'Edfu' },
        { code: 'KOM', name: 'Kom Ombo' },
        { code: 'ESNA', name: 'Esna' },
        { code: 'ABU', name: 'Abu Simbel' },
        { code: 'IDFU', name: 'Idfu' },
        { code: 'PHILAE', name: 'Philae' },
        { code: 'ABU', name: 'Abu Tig' }
      ]
    },
    { code: 'ASY', name: 'Asyut', type: 'governorate',
      cities: [
        { code: 'ASYUT', name: 'Asyut' },
        { code: 'MALLAWI', name: 'Mallawi' },
        { code: 'ABU', name: 'Abu Tig' },
        { code: 'SAHL', name: 'Sahel' },
        { code: 'DIET', name: 'Diet' },
        { code: 'QENA', name: 'Qena' },
        { code: 'SOHAG', name: 'Sohag' },
        { code: 'MAN', name: 'Manfalout' },
        { code: 'BANI', name: 'Bani Mazar' }
      ]
    },
    { code: 'BEH', name: 'Beheira', type: 'governorate',
      cities: [
        { code: 'BENI', name: 'Beni Suef' },
        { code: 'BEHEIRA', name: 'Behira' },
        { code: 'ABU', name: 'Abu Tig' },
        { code: 'NAQ', name: 'Nag Hammadi' },
        { code: 'SAMALOUT', name: 'Samalout' },
        { code: 'DAM', name: 'Damietta' },
        { code: 'KAFR', name: 'Kafr El Sheikh' },
        { code: 'EL', name: 'El Mansoura' },
        { code: 'SHAR', name: 'Sharqia' }
      ]
    },
    { code: 'QEN', name: 'Qena', type: 'governorate',
      cities: [
        { code: 'QENA', name: 'Qena' },
        { code: 'QUS', name: 'Qus' },
        { code: 'NAQADA', name: 'Naqada' },
        { code: 'DANDRAW', name: 'Dandraw' },
        { code: 'ABU', name: 'Abu Tig' },
        { code: 'RAS', name: 'Ras Gharib' },
        { code: 'LUXOR', name: 'Luxor' },
        { code: 'HORGA', name: 'Horgos' }
      ]
    },
    { code: 'RED', name: 'Red Sea', type: 'governorate',
      cities: [
        { code: 'HURGHADA', name: 'Hurghada' },
        { code: 'GAMASA', name: 'Gamsa' },
        { code: 'RAS', name: 'Ras Gharib' },
        { code: 'SAFAGA', name: 'Safaga' },
        { code: 'EL', name: 'El Gouna' },
        { code: 'QUSEIR', name: 'Quseir' },
        { code: 'SINAI', name: 'Sinai' }
      ]
    },
    { code: 'SIN', name: 'North Sinai', type: 'governorate',
      cities: [
        { code: 'ARISH', name: 'Arish' },
        { code: 'BIR', name: 'Bir' },
        { code: 'HAS', name: 'Has' },
        { code: 'RAH', name: 'Ras El-Hekma' },
        { code: 'NUWEIBAA', name: 'Nuweiba' },
        { code: 'BIR', name: 'Bir El-Arab' },
        { code: 'SIDI', name: 'Sidi Barrani' }
      ]
    }
  ]
};

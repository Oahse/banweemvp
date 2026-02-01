/**
 * Bhutan country data with districts, cities, and tax information
 */

import { Country } from './index';

export const bhutan: Country = {
  code: 'BT',
  name: 'Bhutan',
  taxInfo: { taxName: 'No VAT', currency: 'BTN', region: 'APAC' },
  provinces: [
    { code: 'TH', name: 'Thimphu',
      cities: [
        { code: 'THIMPHU', name: 'Thimphu' },
        { code: 'BABESA', name: 'Babesa' },
        { code: 'CHANG', name: 'Chang' },
        { code: 'DAGALA', name: 'Dagala' },
        { code: 'GENYEKHA', name: 'Genyekha' },
        { code: 'KAWANG', name: 'Kawang' },
        { code: 'LINGZHIN', name: 'Lingzhi' },
        { code: 'MELING', name: 'Meling' },
        { code: 'NABI', name: 'Nabi' },
        { code: 'SOE', name: 'Soe' }
      ]
    },
    { code: 'PU', name: 'Punakha',
      cities: [
        { code: 'PUNAKHA', name: 'Punakha' },
        { code: 'BARP', name: 'Barp' },
        { code: 'CHIMM', name: 'Chhimmony' },
        { code: 'GASA', name: 'Gasa' },
        { code: 'GOENSHARI', name: 'Goenshari' },
        { code: 'KABJISA', name: 'Kabjisa' },
        { code: 'LUNANA', name: 'Lunana' },
        { code: 'REWOO', name: 'Rewoo' },
        { code: 'TALO', name: 'Talo' },
        { code: 'TOEDPANG', name: 'Toedpang' }
      ]
    },
    { code: 'GA', name: 'Gasa',
      cities: [
        { code: 'GASA_TOWN', name: 'Gasa Town' },
        { code: 'KHAMED', name: 'Khamed' },
        { code: 'LUNA', name: 'Luna' },
        { code: 'LAYA', name: 'Laya' },
        { code: 'TSHECHU', name: 'Tshechu' }
      ]
    },
    { code: 'WO', name: 'Wangdue Phodrang',
      cities: [
        { code: 'WANGDUE', name: 'Wangdue Phodrang' },
        { code: 'ATHANG', name: 'Athang' },
        { code: 'BJENA', name: 'Bjena' },
        { code: 'DAGA', name: 'Daga' },
        { code: 'GANGTEY', name: 'Gangtey' },
        { code: 'KANGPAR', name: 'Kangpar' },
        { code: 'KATSHO', name: 'Katsho' },
        { code: 'NISHI', name: 'Nishi' },
        { code: 'PHANGYUEL', name: 'Phangyuel' },
        { code: 'RUEPISA', name: 'Ruepisa' }
      ]
    },
    { code: 'TR', name: 'Trongsa',
      cities: [
        { code: 'TRONGSA', name: 'Trongsa' },
        { code: 'DRANGME', name: 'Drangme' },
        { code: 'KERTHO', name: 'Kerthi' },
        { code: 'LANGTHEL', name: 'Langthel' },
        { code: 'MENGLA', name: 'Mengla' },
        { code: 'NORBUGANG', name: 'Norbugang' },
        { code: 'TANGSIBJI', name: 'Tangsibji' }
      ]
    },
    { code: 'BZ', name: 'Bumthang',
      cities: [
        { code: 'BUMTHANG', name: 'Jakar' },
        { code: 'CHHUME', name: 'Chhume' },
        { code: 'TANG', name: 'Tang' },
        { code: 'URA', name: 'Ura' },
        { code: 'CHOKHOR', name: 'Chokhor' },
        { code: 'GYETSA', name: 'Gyetsa' },
        { code: 'KIZOM', name: 'Kizom' }
      ]
    },
    { code: 'ZG', name: 'Zhemgang',
      cities: [
        { code: 'ZHEMGANG', name: 'Zhemgang' },
        { code: 'BARDHO', name: 'Bardho' },
        { code: 'BJOKHA', name: 'Bjokha' },
        { code: 'DEORALI', name: 'Deorali' },
        { code: 'DOKA', name: 'Doka' },
        { code: 'GOSHING', name: 'Goshing' },
        { code: 'NGANGLAM', name: 'Nanglam' },
        { code: 'PANBANG', name: 'Panbang' },
        { code: 'SHINGKHER', name: 'Shingkhar' },
        { code: 'TALANG', name: 'Talang' }
      ]
    },
    { code: 'SL', name: 'Sarpang',
      cities: [
        { code: 'SARPANG', name: 'Sarpang' },
        { code: 'CHHUZOM', name: 'Chhuzom' },
        { code: 'DECHENLING', name: 'Dechenling' },
        { code: 'DUNGKAR', name: 'Dungkar' },
        { code: 'GELEPHU', name: 'Gelephu' },
        { code: 'HILLEY', name: 'Hilley' },
        { code: 'JIGMECHHOLING', name: 'Jigmechholing' },
        { code: 'SAMTENLING', name: 'Samtenling' },
        { code: 'SARPANG_TOWN', name: 'Sarpang Town' },
        { code: 'TARETHANG', name: 'Tarethang' }
      ]
    },
    { code: 'SG', name: 'Samtse',
      cities: [
        { code: 'SAMTSE', name: 'Samtse' },
        { code: 'CHENGTA', name: 'Chengta' },
        { code: 'DOROKHA', name: 'Dorokha' },
        { code: 'DUNGNA', name: 'Dungna' },
        { code: 'GOMTU', name: 'Gomtu' },
        { code: 'LEHRENI', name: 'Lehreni' },
        { code: 'NAMGYAL', name: 'Namgyal' },
        { code: 'PHEUNTSHO', name: 'Pheuntsho' },
        { code: 'SANGNAG', name: 'Sangnag' },
        { code: 'TADING', name: 'Tading' }
      ]
    },
    { code: 'CH', name: 'Chhukha',
      cities: [
        { code: 'CHHUKHA', name: 'Chhukha' },
        { code: 'BONDEY', name: 'Bondey' },
        { code: 'CHAPCHA', name: 'Chapcha' },
        { code: 'DALA', name: 'Dala' },
        { code: 'GELPO', name: 'Gelpo' },
        { code: 'KABJISA', name: 'Kabjisa' },
        { code: 'METAKHA', name: 'Metakha' },
        { code: 'PHUNTSHOLING', name: 'Phuentsholing' },
        { code: 'SAMPHEY', name: 'Samphey' },
        { code: 'TSIRANG', name: 'Tsirang' }
      ]
    },
    { code: 'HA', name: 'Haa',
      cities: [
        { code: 'HAA', name: 'Haa' },
        { code: 'BJI', name: 'Bji' },
        { code: 'EUSU', name: 'Eusu' },
        { code: 'KATSHO', name: 'Katsho' },
        { code: 'SAMA', name: 'Sama' },
        { code: 'SANGBAY', name: 'Sangbay' },
        { code: 'UESU', name: 'Uesu' }
      ]
    },
    { code: 'TY', name: 'Trashiyangtse',
      cities: [
        { code: 'TRASHIYANGTSE', name: 'Trashiyangtse' },
        { code: 'BOMDELING', name: 'Bomdeling' },
        { code: 'KANGPAR', name: 'Kangpar' },
        { code: 'KHALING', name: 'Khaling' },
        { code: 'RAMJAR', name: 'Ramjar' },
        { code: 'TASHIGANG', name: 'Tashigang' },
        { code: 'TORMIZHANG', name: 'Tormizhang' },
        { code: 'YALANG', name: 'Yalang' }
      ]
    },
    { code: 'MT', name: 'Mongar',
      cities: [
        { code: 'MONGAR', name: 'Mongar' },
        { code: 'CHASKAR', name: 'Chaskar' },
        { code: 'CHHIMMONG', name: 'Chhimmong' },
        { code: 'DRAMETSE', name: 'Drametse' },
        { code: 'JURMENI', name: 'Jurmeni' },
        { code: 'KENGKHAR', name: 'Kengkhar' },
        { code: 'MONGGAR', name: 'Monggar' },
        { code: 'NAGOR', name: 'Nagor' },
        { code: 'SALING', name: 'Saling' },
        { code: 'SILAMBI', name: 'Silambi' },
        { code: 'TASHIPA', name: 'Tashipa' }
      ]
    },
    { code: 'TS', name: 'Trashigang',
      cities: [
        { code: 'TRASHIGANG', name: 'Trashigang' },
        { code: 'BARTSHAM', name: 'Bartsham' },
        { code: 'KANGCHUNG', name: 'Kangchung' },
        { code: 'KANGPAR', name: 'Kangpar' },
        { code: 'KHALING', name: 'Khaling' },
        { code: 'RANGJUNG', name: 'Rangjung' },
        { code: 'SAMKHAR', name: 'Samkhar' },
        { code: 'SHERICHU', name: 'Sherichu' },
        { code: 'THRIMSHING', name: 'Thrishing' },
        { code: 'WAMRONG', name: 'Wamrong' }
      ]
    },
    { code: 'PD', name: 'Pemagatshel',
      cities: [
        { code: 'PEMAGATSHEL', name: 'Pemagatshel' },
        { code: 'CHHIMMONG', name: 'Chhimmong' },
        { code: 'DENCHI', name: 'Denchhi' },
        { code: 'DUNGME', name: 'Dungme' },
        { code: 'KILAR', name: 'Kilar' },
        { code: 'NORBUGANG', name: 'Norbugang' },
        { code: 'YURUNG', name: 'Yurung' },
        { code: 'ZUNGLEN', name: 'Zunglen' }
      ]
    },
    { code: 'SN', name: 'Samdrup Jongkhar',
      cities: [
        { code: 'SAMDRUP', name: 'Samdrup Jongkhar' },
        { code: 'DEOTHANG', name: 'Deothang' },
        { code: 'GOMDAR', name: 'Gomdar' },
        { code: 'LANGCHHENPHUG', name: 'Langchenphug' },
        { code: 'MARTSHALA', name: 'Martshala' },
        { code: 'ORONG', name: 'Orong' },
        { code: 'PAMONG', name: 'Pamong' },
        { code: 'PHUNTSHOTHANG', name: 'Phuntshothang' },
        { code: 'SERTHI', name: 'Serthi' },
        { code: 'WANGPHU', name: 'Wangphu' }
      ]
    }
  ]
};

export default bhutan;

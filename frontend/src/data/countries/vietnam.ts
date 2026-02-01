/**
 * Vietnam country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const vietnam: Country = {
    code: 'VN',
    name: 'Vietnam',
    taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'VND', region: 'APAC' },
    provinces: [
      { code: 'HANOI', name: 'Hanoi',
        cities: [
          { code: 'HANOI', name: 'Hanoi' },
          { code: 'BADINH', name: 'Ba Dinh' },
          { code: 'CAUGIAY', name: 'Cau Giay' },
          { code: 'DONGDA', name: 'Dong Da' },
          { code: 'HAIBA', name: 'Hai Ba Trung' },
          { code: 'HOANKIEM', name: 'Hoan Kiem' },
          { code: 'HOANGMAI', name: 'Hoang Mai' },
          { code: 'LONGBIEN', name: 'Long Bien' },
          { code: 'TAYHO', name: 'Tay Ho' },
          { code: 'THANHXUAN', name: 'Thanh Xuan' }
        ]
      },
      { code: 'HOCHIMINH', name: 'Ho Chi Minh City',
        cities: [
          { code: 'HOCHIMINH', name: 'Ho Chi Minh City' },
          { code: 'BINHTHANH', name: 'Binh Thanh' },
          { code: 'GOVAP', name: 'Go Vap' },
          { code: 'PHUNHUAN', name: 'Phu Nhuan' },
          { code: 'TANBINH', name: 'Tan Binh' },
          { code: 'THANHKHE', name: 'Thanh Khe' },
          { code: 'PHUMY', name: 'Phu My' },
          { code: 'BINHCHANH', name: 'Binh Chanh' },
          { code: 'TANPHU', name: 'Tan Phu' },
          { code: 'QUAN1', name: 'Quan 1' }
        ]
      },
      { code: 'DANANG', name: 'Da Nang',
        cities: [
          { code: 'DANANG', name: 'Da Nang' },
          { code: 'HAICHAU', name: 'Hai Chau' },
          { code: 'THANHKHE', name: 'Thanh Khe' },
          { code: 'SONTRA', name: 'Son Tra' },
          { code: 'NGUHANH', name: 'Ngu Hanh Son' },
          { code: 'LIENCHIEU', name: 'Lien Chieu' },
          { code: 'CAMLE', name: 'Cam Le' },
          { code: 'HOAVANG', name: 'Hoa Vang' },
          { code: 'HOANGSA', name: 'Hoang Sa' },
          { code: 'PARACEL', name: 'Paracel Islands' }
        ]
      },
      { code: 'HAIPHONG', name: 'Hai Phong',
        cities: [
          { code: 'HAIPHONG', name: 'Hai Phong' },
          { code: 'HONGBANG', name: 'Hong Bang' },
          { code: 'NGOQUYEN', name: 'Ngo Quyen' },
          { code: 'LECHAN', name: 'Le Chan' },
          { code: 'KHIENAN', name: 'Kien An' },
          { code: 'DOSON', name: 'Do Son' },
          { code: 'THUYNGUYEN', name: 'Thuy Nguyen' },
          { code: 'ANDUONG', name: 'An Duong' },
          { code: 'VINHBAO', name: 'Vinh Bao' },
          { code: 'CATHAI', name: 'Cat Hai' }
        ]
      },
      { code: 'CANTHO', name: 'Can Tho',
        cities: [
          { code: 'CANTHO', name: 'Can Tho' },
          { code: 'NINHKIEU', name: 'Ninh Kieu' },
          { code: 'BINHTHUY', name: 'Binh Thuy' },
          { code: 'CAIRANG', name: 'Cai Rang' },
          { code: 'THOTNOT', name: 'Thot Not' },
          { code: 'VINHTHANH', name: 'Vinh Thanh' },
          { code: 'CODO', name: 'Co Do' },
          { code: 'THOIBINH', name: 'Thoi Binh' },
          { code: 'PHONGDIEN', name: 'Phong Dien' },
          { code: 'THOITHUAN', name: 'Thoi Thuan' }
        ]
      }
    ]
};

/**
 * Vietnam country data with provinces and municipalities
 */

import { Country } from './index';

export const vietnam: Country = {
  code: 'VN',
  name: 'Vietnam',
  flag: '🇻🇳',
  capital: 'Hanoi',
  area: 331212,
  currencySymbol: '₫',
  officialLanguages: ['Vietnamese'],
  demonym: 'Vietnamese',
  taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'VND', region: 'APAC' },
  divisions: [
    { code: 'HN', name: 'Hanoi', type: 'municipality',
      cities: [
        { code: 'HANOI', name: 'Hanoi' },
        { code: 'HOANKIEM', name: 'Hoan Kiem' },
        { code: 'BAIDINH', name: 'Ba Dinh' },
        { code: 'DONGDA', name: 'Dong Da' },
        { code: 'CAUGIAY', name: 'Cau Giay' }
      ]
    },
    { code: 'HCM', name: 'Ho Chi Minh City', type: 'municipality',
      cities: [
        { code: 'HOCHIMINH', name: 'Ho Chi Minh City' },
        { code: 'QUAN1', name: 'Quận 1' },
        { code: 'QUAN3', name: 'Quận 3' },
        { code: 'QUAN5', name: 'Quận 5' },
        { code: 'QUAN7', name: 'Quận 7' }
      ]
    },
    { code: 'DN', name: 'Da Nang', type: 'municipality',
      cities: [
        { code: 'DANANG', name: 'Da Nang' },
        { code: 'HAICHAU', name: 'Hai Chau' },
        { code: 'CAMLE', name: 'Cam Le' },
        { code: 'LIENCHIEU', name: 'Lien Chieu' },
        { code: 'NGUHANH', name: 'Ngu Hanh Son' }
      ]
    },
    { code: 'HP', name: 'Hai Phong', type: 'municipality',
      cities: [
        { code: 'HAIPHONG', name: 'Hai Phong' },
        { code: 'HONGBANG', name: 'Hong Bang' },
        { code: 'NGOQUYEN', name: 'Ngo Quyen' },
        { code: 'LECHAN', name: 'Le Chan' },
        { code: 'KIENAN', name: 'Kien An' }
      ]
    },
    { code: 'CN', name: 'Can Tho', type: 'municipality',
      cities: [
        { code: 'CANTHO', name: 'Can Tho' },
        { code: 'NINHKIEU', name: 'Ninh Kieu' },
        { code: 'BINHTHUY', name: 'Binh Thuy' },
        { code: 'CAIRANG', name: 'Cai Rang' },
        { code: 'THOTNOT', name: 'Thot Not' }
      ]
    },
    { code: 'AG', name: 'An Giang', type: 'province',
      cities: [
        { code: 'LONGXUYEN', name: 'Long Xuyen' },
        { code: 'CHAU', name: 'Chau Doc' },
        { code: 'TAN', name: 'Tan Chau' },
        { code: 'PHU', name: 'Phu Tan' },
        { code: 'CHO', name: 'Cho Moi' }
      ]
    },
    { code: 'BR', name: 'Bà Rịa-Vũng Tàu', type: 'province',
      cities: [
        { code: 'VUNGTAU', name: 'Vũng Tàu' },
        { code: 'BARIA', name: 'Bà Rịa' },
        { code: 'CHAU', name: 'Châu Đức' },
        { code: 'CONDAO', name: 'Côn Đảo' },
        { code: 'DATDO', name: 'Đất Đỏ' }
      ]
    },
    { code: 'BG', name: 'Bắc Giang', type: 'province',
      cities: [
        { code: 'BACGIANG', name: 'Bắc Giang' },
        { code: 'LUCNGAN', name: 'Lục Ngạn' },
        { code: 'VIETYEN', name: 'Việt Yên' },
        { code: 'YENTHE', name: 'Yên Thế' },
        { code: 'HIEU', name: 'Hiệp Hòa' }
      ]
    },
    { code: 'BK', name: 'Bắc Kạn', type: 'province',
      cities: [
        { code: 'BACKAN', name: 'Bắc Kạn' },
        { code: 'BAO', name: 'Bảo Lâm' },
        { code: 'BAC', name: 'Bạch Thông' },
        { code: 'CHODON', name: 'Chợ Đồn' },
        { code: 'CHOMO', name: 'Chợ Mới' }
      ]
    },
    { code: 'BL', name: 'Bạc Liêu', type: 'province',
      cities: [
        { code: 'BAC', name: 'Bạc Liêu' },
        { code: 'GIA', name: 'Giá Rai' },
        { code: 'DONG', name: 'Đông Hải' },
        { code: 'HONG', name: 'Hồng Dân' },
        { code: 'VINH', name: 'Vĩnh Lợi' }
      ]
    },
    { code: 'BN', name: 'Bắc Ninh', type: 'province',
      cities: [
        { code: 'BACNINH', name: 'Bắc Ninh' },
        { code: 'TU', name: 'Từ Sơn' },
        { code: 'BENT', name: 'Bến Lức' },
        { code: 'GIA', name: 'Gia Bình' },
        { code: 'LUONG', name: 'Lương Tài' }
      ]
    },
    { code: 'BT', name: 'Bến Tre', type: 'province',
      cities: [
        { code: 'BENTRE', name: 'Bến Tre' },
        { code: 'BINHDAI', name: 'Bình Đại' },
        { code: 'CHAUCHANH', name: 'Châu Thành' },
        { code: 'CHO', name: 'Chợ Lách' },
        { code: 'GIONG', name: 'Giồng Trôm' }
      ]
    },
    { code: 'BD', name: 'Bình Định', type: 'province',
      cities: [
        { code: 'QUY', name: 'Quy Nhơn' },
        { code: 'AN', name: 'An Nhơn' },
        { code: 'TUY', name: 'Tuy Phước' },
        { code: 'PHU', name: 'Phù Cát' },
        { code: 'VINH', name: 'Vĩnh Thạnh' }
      ]
    },
    { code: 'BDU', name: 'Bình Dương', type: 'province',
      cities: [
        { code: 'THUDAUMOT', name: 'Thủ Dầu Một' },
        { code: 'DI', name: 'Dĩ An' },
        { code: 'BEN', name: 'Bến Cát' },
        { code: 'PHU', name: 'Phú Giao' },
        { code: 'TAN', name: 'Tân Uyên' }
      ]
    },
    { code: 'BPH', name: 'Bình Phước', type: 'province',
      cities: [
        { code: 'DONG', name: 'Đồng Xoài' },
        { code: 'BINH', name: 'Bình Long' },
        { code: 'PHU', name: 'Phước Long' },
        { code: 'BU', name: 'Bù Đăng' },
        { code: 'CHON', name: 'Chơn Thành' }
      ]
    },
    { code: 'BTH', name: 'Bình Thuận', type: 'province',
      cities: [
        { code: 'PHAN', name: 'Phan Thiết' },
        { code: 'LA', name: 'La Gi' },
        { code: 'DONG', name: 'Đồng Phước' },
        { code: 'TUY', name: 'Tuy Phong' },
        { code: 'HAM', name: 'Hàm Tân' }
      ]
    },
    { code: 'CM', name: 'Cà Mau', type: 'province',
      cities: [
        { code: 'CAMAU', name: 'Cà Mau' },
        { code: 'CAI', name: 'Cái Nước' },
        { code: 'TRAN', name: 'Trần Văn Thời' },
        { code: 'U', name: 'U Minh' },
        { code: 'THI', name: 'Thới Bình' }
      ]
    },
    { code: 'CT', name: 'Cần Thơ', type: 'province',
      cities: [
        { code: 'CANTHO', name: 'Cần Thơ' },
        { code: 'NINH', name: 'Ninh Kiều' },
        { code: 'BINH', name: 'Bình Thủy' },
        { code: 'CAI', name: 'Cái Răng' },
        { code: 'THOT', name: 'Thốt Nốt' }
      ]
    },
    { code: 'DD', name: 'Đắk Lắk', type: 'province',
      cities: [
        { code: 'BUON', name: 'Buôn Ma Thuột' },
        { code: 'EAHLEO', name: 'EA H Leo' },
        { code: 'BUONHO', name: 'Buôn Hồ' },
        { code: 'CUMGAR', name: 'Cu Mgar' },
        { code: 'KRO', name: 'Krông Năng' }
      ]
    },
    { code: 'DN', name: 'Đắk Nông', type: 'province',
      cities: [
        { code: 'GIA', name: 'Gia Nghĩa' },
        { code: 'DA', name: 'Đắk Nông' },
        { code: 'CU', name: 'Cu Jut' },
        { code: 'DA', name: 'Đắk Song' },
        { code: 'KRONG', name: 'Krông Nô' }
      ]
    },
    { code: 'DB', name: 'Điện Biên', type: 'province',
      cities: [
        { code: 'DIENBIEN', name: 'Điện Biên Phủ' },
        { code: 'MUONG', name: 'Mường Chà' },
        { code: 'MUONG', name: 'Mường Lay' },
        { code: 'TUAN', name: 'Tuần Giáo' },
        { code: 'MUONG', name: 'Mường Nhé' }
      ]
    },
    { code: 'DDN', name: 'Đồng Nai', type: 'province',
      cities: [
        { code: 'BIENHOA', name: 'Biên Hòa' },
        { code: 'LONG', name: 'Long Khánh' },
        { code: 'NHON', name: 'Nhơn Trạch' },
        { code: 'CAM', name: 'Cam Mỹ' },
        { code: 'TAN', name: 'Tân Phú' }
      ]
    },
    { code: 'DT', name: 'Đồng Tháp', type: 'province',
      cities: [
        { code: 'CAO', name: 'Cao Lãnh' },
        { code: 'SA', name: 'Sa Đéc' },
        { code: 'HONG', name: 'Hồng Ngự' },
        { code: 'TAM', name: 'Tam Nông' },
        { code: 'LAP', name: 'Lấp Vò' }
      ]
    },
    { code: 'GL', name: 'Gia Lai', type: 'province',
      cities: [
        { code: 'PLEIKU', name: 'Pleiku' },
        { code: 'AYUN', name: 'Ayun Pa' },
        { code: 'CHEO', name: 'Cheo Reo' },
        { code: 'KONG', name: 'Kông Chro' },
        { code: 'DUCO', name: 'Đức Cơ' }
      ]
    },
    { code: 'HG', name: 'Hà Giang', type: 'province',
      cities: [
        { code: 'HAGIANG', name: 'Hà Giang' },
        { code: 'VIET', name: 'Việt Quân' },
        { code: 'DONG', name: 'Đồng Văn' },
        { code: 'YEN', name: 'Yên Minh' },
        { code: 'ME', name: 'Mèo Vạc' }
      ]
    },
    { code: 'HN', name: 'Hà Nam', type: 'province',
      cities: [
        { code: 'PHU', name: 'Phủ Lý' },
        { code: 'BINH', name: 'Bình Lục' },
        { code: 'DUY', name: 'Duy Tiên' },
        { code: 'KIM', name: 'Kim Bảng' },
        { code: 'THANH', name: 'Thanh Liêm' }
      ]
    },
    { code: 'HI', name: 'Hà Tĩnh', type: 'province',
      cities: [
        { code: 'HATINH', name: 'Hà Tĩnh' },
        { code: 'HONG', name: 'Hồng Lĩnh' },
        { code: 'NGHE', name: 'Nghi Xuân' },
        { code: 'CAN', name: 'Cẩm Xuyên' },
        { code: 'THACH', name: 'Thạch Hà' }
      ]
    },
    { code: 'HD', name: 'Hải Dương', type: 'province',
      cities: [
        { code: 'HAIDUONG', name: 'Hải Dương' },
        { code: 'CHI', name: 'Chi Linh' },
        { code: 'NAM', name: 'Nam Sách' },
        { code: 'KINH', name: 'Kinh Môn' },
        { code: 'TU', name: 'Tứ Kỳ' }
      ]
    },
    { code: 'HG', name: 'Hậu Giang', type: 'province',
      cities: [
        { code: 'VIET', name: 'Việt Thạnh' },
        { code: 'NGA', name: 'Ngã Bảy' },
        { code: 'LONG', name: 'Long Mỹ' },
        { code: 'CHAU', name: 'Châu Thành A' },
        { code: 'PHU', name: 'Phụng Hiệp' }
      ]
    },
    { code: 'HO', name: 'Hòa Bình', type: 'province',
      cities: [
        { code: 'HOABINH', name: 'Hòa Bình' },
        { code: 'MAI', name: 'Mai Châu' },
        { code: 'LAC', name: 'Lạc Sơn' },
        { code: 'KY', name: 'Kỳ Sơn' },
        { code: 'LUONG', name: 'Lương Sơn' }
      ]
    },
    { code: 'HY', name: 'Hưng Yên', type: 'province',
      cities: [
        { code: 'HUNGYEN', name: 'Hưng Yên' },
        { code: 'VAN', name: 'Văn Lâm' },
        { code: 'MY', name: 'Mỹ Hào' },
        { code: 'YEN', name: 'Yên Mỹ' },
        { code: 'KIM', name: 'Kim Động' }
      ]
    },
    { code: 'KH', name: 'Khánh Hòa', type: 'province',
      cities: [
        { code: 'NHA', name: 'Nha Trang' },
        { code: 'CAM', name: 'Cam Ranh' },
        { code: 'NINH', name: 'Ninh Hòa' },
        { code: 'DIEN', name: 'Diên Khánh' },
        { code: 'KHANH', name: 'Khánh Vĩnh' }
      ]
    },
    { code: 'KG', name: 'Kiên Giang', type: 'province',
      cities: [
        { code: 'RACH', name: 'Rạch Giá' },
        { code: 'HA', name: 'Hà Tiên' },
        { code: 'PHU', name: 'Phú Quốc' },
        { code: 'GIA', name: 'Gia Rai' },
        { code: 'GO', name: 'Gò Quao' }
      ]
    },
    { code: 'KT', name: 'Kon Tum', type: 'province',
      cities: [
        { code: 'KONTUM', name: 'Kon Tum' },
        { code: 'PLEIKU', name: 'Pleiku' },
        { code: 'SA', name: 'Sa Thầy' },
        { code: 'NGOK', name: 'Ngọc Hồi' },
        { code: 'DUCO', name: 'Đắk Glei' }
      ]
    },
    { code: 'LCH', name: 'Lai Châu', type: 'province',
      cities: [
        { code: 'LAICHAU', name: 'Lai Châu' },
        { code: 'MUONG', name: 'Mường Tè' },
        { code: 'PHONG', name: 'Phong Thổ' },
        { code: 'SIN', name: 'Sìn Hồ' },
        { code: 'TAM', name: 'Tam Đường' }
      ]
    },
    { code: 'LD', name: 'Lâm Đồng', type: 'province',
      cities: [
        { code: 'DALAT', name: 'Đà Lạt' },
        { code: 'BAO', name: 'Bảo Lộc' },
        { code: 'DON', name: 'Đơn Dương' },
        { code: 'DI', name: 'Di Linh' },
        { code: 'LAC', name: 'Lạc Dương' }
      ]
    },
    { code: 'LCA', name: 'Lạng Sơn', type: 'province',
      cities: [
        { code: 'LANGSON', name: 'Lạng Sơn' },
        { code: 'CAO', name: 'Cao Lộc' },
        { code: 'LOC', name: 'Lộc Bình' },
        { code: 'TRANG', name: 'Tràng Định' },
        { code: 'BINH', name: 'Bình Gia' }
      ]
    },
    { code: 'LA', name: 'Lào Cai', type: 'province',
      cities: [
        { code: 'LAOCAI', name: 'Lào Cai' },
        { code: 'SA', name: 'Sa Pa' },
        { code: 'BAC', name: 'Bắc Hà' },
        { code: 'BAO', name: 'Bảo Thắng' },
        { code: 'BAO', name: 'Bảo Yên' }
      ]
    },
    { code: 'NA', name: 'Nam Định', type: 'province',
      cities: [
        { code: 'NAMDINH', name: 'Nam Định' },
        { code: 'MY', name: 'Mỹ Lộc' },
        { code: 'XUAN', name: 'Xuân Trường' },
        { code: 'GIA', name: 'Gia Viễn' },
        { code: 'HOA', name: 'Hòa Mai' }
      ]
    },
    { code: 'ND', name: 'Nghệ An', type: 'province',
      cities: [
        { code: 'VINH', name: 'Vinh' },
        { code: 'CUNG', name: 'Cửa Lò' },
        { code: 'HOANG', name: 'Hoàng Mai' },
        { code: 'QUYNH', name: 'Quỳnh Lưu' },
        { code: 'THANH', name: 'Thanh Chương' }
      ]
    },
    { code: 'NB', name: 'Ninh Bình', type: 'province',
      cities: [
        { code: 'NINHBINH', name: 'Ninh Bình' },
        { code: 'TAM', name: 'Tam Điệp' },
        { code: 'NHO', name: 'Nho Quan' },
        { code: 'GIA', name: 'Gia Viễn' },
        { code: 'YEN', name: 'Yên Mô' }
      ]
    },
    { code: 'NT', name: 'Ninh Thuận', type: 'province',
      cities: [
        { code: 'PHAN', name: 'Phan Rang-Tháp Chàm' },
        { code: 'PHAN', name: 'Phan Rang' },
        { code: 'BAC', name: 'Bác Ái' },
        { code: 'NINH', name: 'Ninh Hải' },
        { code: 'THANH', name: 'Thanh Hải' }
      ]
    },
    { code: 'QB', name: 'Quảng Bình', type: 'province',
      cities: [
        { code: 'DONGHOI', name: 'Đồng Hới' },
        { code: 'QUANG', name: 'Quảng Ninh' },
        { code: 'BAO', name: 'Bảo Trạch' },
        { code: 'QUANG', name: 'Quảng Trạch' },
        { code: 'LE', name: 'Lệ Thủy' }
      ]
    },
    { code: 'QN', name: 'Quảng Nam', type: 'province',
      cities: [
        { code: 'TAM', name: 'Tam Kỳ' },
        { code: 'HOI', name: 'Hội An' },
        { code: 'DIE', name: 'Điện Bàn' },
        { code: 'DUNG', name: 'Dung Quất' },
        { code: 'THANG', name: 'Thăng Bình' }
      ]
    },
    { code: 'QT', name: 'Quảng Trị', type: 'province',
      cities: [
        { code: 'DONGHA', name: 'Đông Hà' },
        { code: 'QUANG', name: 'Quảng Trị' },
        { code: 'GIO', name: 'Gio Linh' },
        { code: 'VINH', name: 'Vĩnh Linh' },
        { code: 'CAM', name: 'Cẩm Thủy' }
      ]
    },
    { code: 'SC', name: 'Sóc Trăng', type: 'province',
      cities: [
        { code: 'SOCTRANG', name: 'Sóc Trăng' },
        { code: 'NGA', name: 'Ngã Năm' },
        { code: 'VINH', name: 'Vĩnh Châu' },
        { code: 'MY', name: 'Mỹ Xuyên' },
        { code: 'KE', name: 'Kế Sách' }
      ]
    },
    { code: 'SL', name: 'Sơn La', type: 'province',
      cities: [
        { code: 'SONLA', name: 'Sơn La' },
        { code: 'MAI', name: 'Mai Sơn' },
        { code: 'QUYNH', name: 'Quỳnh Nhai' },
        { code: 'MUONG', name: 'Mường La' },
        { code: 'THUAN', name: 'Thuận Châu' }
      ]
    },
    { code: 'ST', name: 'Thanh Hóa', type: 'province',
      cities: [
        { code: 'THANHHOA', name: 'Thanh Hóa' },
        { code: 'BIM', name: 'Bỉm Sơn' },
        { code: 'SAM', name: 'Sầm Sơn' },
        { code: 'DONG', name: 'Đông Sơn' },
        { code: 'HA', name: 'Hà Trung' }
      ]
    },
    { code: 'TB', name: 'Thái Bình', type: 'province',
      cities: [
        { code: 'THAIBINH', name: 'Thái Bình' },
        { code: 'DONG', name: 'Đông Hưng' },
        { code: 'PHU', name: 'Phù Xuân' },
        { code: 'THANH', name: 'Thái Thụy' },
        { code: 'TIEN', name: 'Tiền Hải' }
      ]
    },
    { code: 'TY', name: 'Thái Nguyên', type: 'province',
      cities: [
        { code: 'THAINGUYEN', name: 'Thái Nguyên' },
        { code: 'SAO', name: 'Sông Công' },
        { code: 'DONG', name: 'Đồng Hy' },
        { code: 'PHO', name: 'Phổ Yên' },
        { code: 'VOI', name: 'Võ Nhai' }
      ]
    },
    { code: 'TH', name: 'Thanh Hóa', type: 'province',
      cities: [
        { code: 'THANHHOA', name: 'Thanh Hóa' },
        { code: 'BIM', name: 'Bỉm Sơn' },
        { code: 'SAM', name: 'Sầm Sơn' },
        { code: 'DONG', name: 'Đông Sơn' },
        { code: 'HA', name: 'Hà Trung' }
      ]
    },
    { code: 'TQ', name: 'Thừa Thiên Huế', type: 'province',
      cities: [
        { code: 'HUE', name: 'Huế' },
        { code: 'HUONG', name: 'Hương Thủy' },
        { code: 'HUONG', name: 'Hương Trà' },
        { code: 'PHU', name: 'Phú Vang' },
        { code: 'PHONG', name: 'Phong Điền' }
      ]
    },
    { code: 'TV', name: 'Trà Vinh', type: 'province',
      cities: [
        { code: 'TRAVINH', name: 'Trà Vinh' },
        { code: 'CAI', name: 'Cái Nước' },
        { code: 'CHAU', name: 'Châu Thành' },
        { code: 'CU', name: 'Cù Lao Dung' },
        { code: 'TRANG', name: 'Tràng Bom' }
      ]
    },
    { code: 'TQ', name: 'Tuyên Quang', type: 'province',
      cities: [
        { code: 'TUYENQUANG', name: 'Tuyên Quang' },
        { code: 'YEN', name: 'Yên Sơn' },
        { code: 'HAM', name: 'Hàm Yên' },
        { code: 'CHI', name: 'Chiêm Hóa' },
        { code: 'NA', name: 'Na Hang' }
      ]
    },
    { code: 'VL', name: 'Vĩnh Long', type: 'province',
      cities: [
        { code: 'VINHLONG', name: 'Vĩnh Long' },
        { code: 'BINH', name: 'Bình Minh' },
        { code: 'TRA', name: 'Trà Ôn' },
        { code: 'TAM', name: 'Tam Bình' },
        { code: 'MANG', name: 'Mang Thít' }
      ]
    },
    { code: 'VT', name: 'Vĩnh Phúc', type: 'province',
      cities: [
        { code: 'VINHPHUC', name: 'Vĩnh Phúc' },
        { code: 'PHUC', name: 'Phúc Yên' },
        { code: 'BINH', name: 'Bình Xuyên' },
        { code: 'LAP', name: 'Lập Thạch' },
        { code: 'SON', name: 'Sông Lo' }
      ]
    },
    { code: 'YB', name: 'Yên Bái', type: 'province',
      cities: [
        { code: 'YENBAI', name: 'Yên Bái' },
        { code: 'YEN', name: 'Yên Bình' },
        { code: 'LUC', name: 'Lục Yên' },
        { code: 'VAN', name: 'Văn Chấn' },
        { code: 'TRAN', name: 'Trấn Yên' }
      ]
    }
  ]
};

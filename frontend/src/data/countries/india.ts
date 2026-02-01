/**
 * India country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const india: Country = {
  code: 'IN',
  name: 'India',
  flag: '🇮🇳',
  capital: 'New Delhi',
  area: 3287263,
  currencySymbol: '₹',
  officialLanguages: ['Hindi', 'English'],
  demonym: 'Indian',
  taxInfo: { standardRate: 18, taxName: 'GST', currency: 'INR', region: 'APAC' },
  divisions: [
    // Major States
    { code: 'UP', name: 'Uttar Pradesh', type: 'state',
      cities: [
        { code: 'LUCKNOW', name: 'Lucknow' },
        { code: 'KANPUR', name: 'Kanpur' },
        { code: 'GHAZIABAD', name: 'Ghaziabad' },
        { code: 'NOIDA', name: 'Noida' },
        { code: 'AGRA', name: 'Agra' },
        { code: 'VARANASI', name: 'Varanasi' },
        { code: 'ALLAHABAD', name: 'Allahabad' },
        { code: 'MEERUT', name: 'Meerut' },
        { code: 'BAREILLY', name: 'Bareilly' },
        { code: 'ALIGARH', name: 'Aligarh' }
      ]
    },
    { code: 'MH', name: 'Maharashtra', type: 'state',
      cities: [
        { code: 'MUMBAI', name: 'Mumbai' },
        { code: 'PUNE', name: 'Pune' },
        { code: 'NAGPUR', name: 'Nagpur' },
        { code: 'THANE', name: 'Thane' },
        { code: 'NASHIK', name: 'Nashik' },
        { code: 'AURANGABAD', name: 'Aurangabad' },
        { code: 'SOLAPUR', name: 'Solapur' },
        { code: 'AMRAVATI', name: 'Amravati' },
        { code: 'KOLHAPUR', name: 'Kolhapur' },
        { code: 'NAGPUR2', name: 'Nagpur' }
      ]
    },
    { code: 'BR', name: 'Bihar', type: 'state',
      cities: [
        { code: 'PATNA', name: 'Patna' },
        { code: 'GAYA', name: 'Gaya' },
        { code: 'BHAGALPUR', name: 'Bhagalpur' },
        { code: 'MUZAFFARPUR', name: 'Muzaffarpur' },
        { code: 'PURNEA', name: 'Purnea' },
        { code: 'DARBHANGA', name: 'Darbhanga' },
        { code: 'BIHAR', name: 'Bihar Sharif' },
        { code: 'ARA', name: 'Ara' },
        { code: 'CHHAPRA', name: 'Chhapra' },
        { code: 'DEHRADUN', name: 'Dehradun' }
      ]
    },
    { code: 'WB', name: 'West Bengal', type: 'state',
      cities: [
        { code: 'KOLKATA', name: 'Kolkata' },
        { code: 'HOWRAH', name: 'Howrah' },
        { code: 'DURGAPUR', name: 'Durgapur' },
        { code: 'SILIGURI', name: 'Siliguri' },
        { code: 'ASANSOL', name: 'Asansol' },
        { code: 'KOLKATA2', name: 'Kolkata North' },
        { code: 'BARDHAMAN', name: 'Bardhaman' },
        { code: 'MALDA', name: 'Malda' },
        { code: 'KOLKATA3', name: 'Kolkata South' },
        { code: 'HOOGHLY', name: 'Hooghly' }
      ]
    },
    { code: 'MP', name: 'Madhya Pradesh', type: 'state',
      cities: [
        { code: 'BHOPAL', name: 'Bhopal' },
        { code: 'INDORE', name: 'Indore' },
        { code: 'GWALIOR', name: 'Gwalior' },
        { code: 'JABALPUR', name: 'Jabalpur' },
        { code: 'UJJAIN', name: 'Ujjain' },
        { code: 'SATNA', name: 'Satna' },
        { code: 'SAGAR', name: 'Sagar' },
        { code: 'DHAR', name: 'Dhar' },
        { code: 'RATLAM', name: 'Ratlam' },
        { code: 'KHANDWA', name: 'Khandwa' }
      ]
    },
    { code: 'TN', name: 'Tamil Nadu', type: 'state',
      cities: [
        { code: 'CHENNAI', name: 'Chennai' },
        { code: 'COIMBATORE', name: 'Coimbatore' },
        { code: 'MADURAI', name: 'Madurai' },
        { code: 'TIRUCHIRAPPALLI', name: 'Tiruchirappalli' },
        { code: 'SALEM', name: 'Salem' },
        { code: 'TIRUNELVELI', name: 'Tirunelveli' },
        { code: 'TIRUPPUR', name: 'Tiruppur' },
        { code: 'VELLORE', name: 'Vellore' },
        { code: 'THOOTHUKUDI', name: 'Thoothukudi' },
        { code: 'ERODE', name: 'Erode' }
      ]
    },
    { code: 'RJ', name: 'Rajasthan', type: 'state',
      cities: [
        { code: 'JAIPUR', name: 'Jaipur' },
        { code: 'JODHPUR', name: 'Jodhpur' },
        { code: 'KOTA', name: 'Kota' },
        { code: 'BIKANER', name: 'Bikaner' },
        { code: 'UDAIPUR', name: 'Udaipur' },
        { code: 'AJMER', name: 'Ajmer' },
        { code: 'BHILWARA', name: 'Bhilwara' },
        { code: 'ALWAR', name: 'Alwar' },
        { code: 'BHARATPUR', name: 'Bharatpur' },
        { code: 'PUSHPAK', name: 'Pushkar' }
      ]
    },
    { code: 'KA', name: 'Karnataka', type: 'state',
      cities: [
        { code: 'BENGALURU', name: 'Bengaluru' },
        { code: 'MYSURU', name: 'Mysuru' },
        { code: 'MANGALURU', name: 'Mangaluru' },
        { code: 'HUBLI', name: 'Hubballi' },
        { code: 'BELAGAVI', name: 'Belagavi' },
        { code: 'GULBARGA', name: 'Kalaburagi' },
        { code: 'DAVANAGERE', name: 'Davangere' },
        { code: 'BELLARY', name: 'Ballari' },
        { code: 'VIJAYAPURA', name: 'Vijayapura' },
        { code: 'SHIVAMOGGA', name: 'Shivamogga' }
      ]
    },
    { code: 'GJ', name: 'Gujarat', type: 'state',
      cities: [
        { code: 'AHMEDABAD', name: 'Ahmedabad' },
        { code: 'SURAT', name: 'Surat' },
        { code: 'VADODARA', name: 'Vadodara' },
        { code: 'RAJKOT', name: 'Rajkot' },
        { code: 'GANDHINAGAR', name: 'Gandhinagar' },
        { code: 'JAMNAGAR', name: 'Jamnagar' },
        { code: 'BHARUCH', name: 'Bharuch' },
        { code: 'PORBANDAR', name: 'Porbandar' },
        { code: 'JUNAGADH', name: 'Junagadh' },
        { code: 'MEHSANA', name: 'Mehsana' }
      ]
    },
    { code: 'AP', name: 'Andhra Pradesh', type: 'state',
      cities: [
        { code: 'VISAKHAPATNAM', name: 'Visakhapatnam' },
        { code: 'VIJAYAWADA', name: 'Vijayawada' },
        { code: 'GUNTUR', name: 'Guntur' },
        { code: 'NELLORE', name: 'Nellore' },
        { code: 'KURNOOL', name: 'Kurnool' },
        { code: 'RAJAHMUNDRY', name: 'Rajahmundry' },
        { code: 'TIRUPATI', name: 'Tirupati' },
        { code: 'KAKINADA', name: 'Kakinada' },
        { code: 'ANANTAPUR', name: 'Anantapur' },
        { code: 'ELURU', name: 'Eluru' }
      ]
    },
    { code: 'OR', name: 'Odisha', type: 'state',
      cities: [
        { code: 'BHUBANESWAR', name: 'Bhubaneswar' },
        { code: 'CUTTACK', name: 'Cuttack' },
        { code: 'ROURKELA', name: 'Rourkela' },
        { code: 'BERHAMPUR', name: 'Berhampur' },
        { code: 'SAMBALPUR', name: 'Sambalpur' },
        { code: 'PURI', name: 'Puri' },
        { code: 'BALASORE', name: 'Balasore' },
        { code: 'JEYPORE', name: 'Jeypore' },
        { code: 'ANGUL', name: 'Angul' },
        { code: 'BHADRAK', name: 'Bhadrak' }
      ]
    },
    { code: 'TS', name: 'Telangana', type: 'state',
      cities: [
        { code: 'HYDERABAD', name: 'Hyderabad' },
        { code: 'WARANGAL', name: 'Warangal' },
        { code: 'NIZAMABAD', name: 'Nizamabad' },
        { code: 'KARIMNAGAR', name: 'Karimnagar' },
        { code: 'KHAMMAM', name: 'Khammam' },
        { code: 'RAMAGUNDAM', name: 'Ramagundam' },
        { code: 'MAHBUBNAGAR', name: 'Mahabubnagar' },
        { code: 'NIZAMABAD2', name: 'Nizamabad' },
        { code: 'ADILABAD', name: 'Adilabad' },
        { code: 'SIDDIPET', name: 'Siddipet' }
      ]
    },
    { code: 'KL', name: 'Kerala', type: 'state',
      cities: [
        { code: 'THIRUVANANTHAPURAM', name: 'Thiruvananthapuram' },
        { code: 'KOCHI', name: 'Kochi' },
        { code: 'KOZHIKODE', name: 'Kozhikode' },
        { code: 'THRISSUR', name: 'Thrissur' },
        { code: 'MALAPPURAM', name: 'Malappuram' },
        { code: 'PALAKKAD', name: 'Palakkad' },
        { code: 'ALAPPUZHA', name: 'Alappuzha' },
        { code: 'KOLLAM', name: 'Kollam' },
        { code: 'KANNUR', name: 'Kannur' },
        { code: 'KASARGOD', name: 'Kasaragod' }
      ]
    },
    { code: 'JH', name: 'Jharkhand', type: 'state',
      cities: [
        { code: 'RANCHI', name: 'Ranchi' },
        { code: 'JAMSHEDPUR', name: 'Jamshedpur' },
        { code: 'DHANBAD', name: 'Dhanbad' },
        { code: 'BOKARO', name: 'Bokaro Steel City' },
        { code: 'DEOGHAR', name: 'Deoghar' },
        { code: 'PHULBANI', name: 'Phulbani' },
        { code: 'GIRIDIH', name: 'Giridih' },
        { code: 'Hazaribagh', name: 'Hazaribagh' },
        { code: 'RAMGARH', name: 'Ramgarh' },
        { code: 'CHAIBASA', name: 'Chaibasa' }
      ]
    },
    { code: 'AS', name: 'Assam', type: 'state',
      cities: [
        { code: 'GUWAHATI', name: 'Guwahati' },
        { code: 'SILCHAR', name: 'Silchar' },
        { code: 'DIBRUGARH', name: 'Dibrugarh' },
        { code: 'JORHAT', name: 'Jorhat' },
        { code: 'NAGAON', name: 'Nagaon' },
        { code: 'TEZPUR', name: 'Tezpur' },
        { code: 'TINSUKIA', name: 'Tinsukia' },
        { code: 'BONGAIGAON', name: 'Bongaigaon' },
        { code: 'KARIMGANJ', name: 'Karimganj' },
        { code: 'SUALKUCHI', name: 'Sualkuchi' }
      ]
    },
    { code: 'PB', name: 'Punjab', type: 'state',
      cities: [
        { code: 'CHANDIGARH', name: 'Chandigarh' },
        { code: 'LUDHIANA', name: 'Ludhiana' },
        { code: 'AMRITSAR', name: 'Amritsar' },
        { code: 'JALANDHAR', name: 'Jalandhar' },
        { code: 'PATIALA', name: 'Patiala' },
        { code: 'BATHINDA', name: 'Bathinda' },
        { code: 'MOGA', name: 'Moga' },
        { code: 'FEROZEPUR', name: 'Ferozepur' },
        { code: 'KAPURTHALA', name: 'Kapurthala' },
        { code: 'PATHANKOT', name: 'Pathankot' }
      ]
    },
    { code: 'CH', name: 'Chhattisgarh', type: 'state',
      cities: [
        { code: 'RAIPUR', name: 'Raipur' },
        { code: 'Bhilai', name: 'Bhilai' },
        { code: 'BILASPUR', name: 'Bilaspur' },
        { code: 'DURG', name: 'Durg' },
        { code: 'KORBA', name: 'Korba' },
        { code: 'RAIGARH', name: 'Raigarh' },
        { code: 'JAGDALPUR', name: 'Jagdalpur' },
        { code: 'AMBIKAPUR', name: 'Ambikapur' },
        { code: 'RAJNANDGAON', name: 'Rajnandgaon' },
        { code: 'DANTEWADA', name: 'Dantewada' }
      ]
    },
    { code: 'HR', name: 'Haryana', type: 'state',
      cities: [
        { code: 'GURUGRAM', name: 'Gurugram' },
        { code: 'FARIDABAD', name: 'Faridabad' },
        { code: 'PANIPAT', name: 'Panipat' },
        { code: 'AMBALA', name: 'Ambala' },
        { code: 'YAMUNANAGAR', name: 'Yamunanagar' },
        { code: 'ROHTAK', name: 'Rohtak' },
        { code: 'HISAR', name: 'Hisar' },
        { code: 'KARNAL', name: 'Karnal' },
        { code: 'SONIPAT', name: 'Sonipat' },
        { code: 'PANCHKULA', name: 'Panchkula' }
      ]
    },
    { code: 'UK', name: 'Uttarakhand', type: 'state',
      cities: [
        { code: 'DEHRADUN', name: 'Dehradun' },
        { code: 'HARIDWAR', name: 'Haridwar' },
        { code: 'ROORKEE', name: 'Roorkee' },
        { code: 'HALDWANI', name: 'Haldwani' },
        { code: 'RUDRAPUR', name: 'Rudrapur' },
        { code: 'KASHIPUR', name: 'Kashipur' },
        { code: 'UJJAIN', name: 'Ujjain' },
        { code: 'RANIKHET', name: 'Ranikhet' },
        { code: 'NAINITAL', name: 'Nainital' },
        { code: 'MUSSOORIE', name: 'Mussoorie' }
      ]
    },
    { code: 'HP', name: 'Himachal Pradesh', type: 'state',
      cities: [
        { code: 'SHIMLA', name: 'Shimla' },
        { code: 'DHARAMSHALA', name: 'Dharamshala' },
        { code: 'SOLAN', name: 'Solan' },
        { code: 'MANDI', name: 'Mandi' },
        { code: 'PALAMPUR', name: 'Palampur' },
        { code: 'KULLU', name: 'Kullu' },
        { code: 'MANALI', name: 'Manali' },
        { code: 'KANGRA', name: 'Kangra' },
        { code: 'CHAMBA', name: 'Chamba' },
        { code: 'BILASPUR', name: 'Bilaspur' }
      ]
    },
    { code: 'TR', name: 'Tripura', type: 'state',
      cities: [
        { code: 'AGARTALA', name: 'Agartala' },
        { code: 'UDAIPUR', name: 'Udaipur' },
        { code: 'DHARMANAGAR', name: 'Dharmanagar' },
        { code: 'KAILASHAHAR', name: 'Kailashahar' },
        { code: 'BELONIA', name: 'Belonia' },
        { code: 'KHOWAI', name: 'Khowai' },
        { code: 'SANTIRBAZAR', name: 'Santirbazar' },
        { code: 'KAMALPUR', name: 'Kamalpur' },
        { code: 'RANIRBAZAR', name: 'Ranirbazar' },
        { code: 'TELIAMURA', name: 'Teliamura' }
      ]
    },
    { code: 'ML', name: 'Meghalaya', type: 'state',
      cities: [
        { code: 'SHILLONG', name: 'Shillong' },
        { code: 'TURA', name: 'Tura' },
        { code: 'NONGSTOIN', name: 'Nongstoin' },
        { code: 'JOWAI', name: 'Jowai' },
        { code: 'BAGHMARA', name: 'Baghmara' },
        { code: 'NONGPOH', name: 'Nongpoh' },
        { code: 'WILLIAMNAGAR', name: 'Williamnagar' },
        { code: 'RESUBELPARA', name: 'Resubelpara' },
        { code: 'MAWSYNRAM', name: 'Mawsynram' },
        { code: 'CHERRAPUNJI', name: 'Cherrapunji' }
      ]
    },
    { code: 'MN', name: 'Manipur', type: 'state',
      cities: [
        { code: 'IMPHAL', name: 'Imphal' },
        { code: 'THOUBAL', name: 'Thoubal' },
        { code: 'KAKCHING', name: 'Kakching' },
        { code: 'LILONG', name: 'Lilong' },
        { code: 'MAYANG', name: 'Mayang Imphal' },
        { code: 'SENAPATI', name: 'Senapati' },
        { code: 'TAMENGLONG', name: 'Tamenglong' },
        { code: 'CHURACHANDPUR', name: 'Churachandpur' },
        { code: 'BISHNUPUR', name: 'Bishnupur' },
        { code: 'UKHRUL', name: 'Ukhrul' }
      ]
    },
    { code: 'MZ', name: 'Mizoram', type: 'state',
      cities: [
        { code: 'AIZAWL', name: 'Aizawl' },
        { code: 'LUNGLEH', name: 'Lungleh' },
        { code: 'CHAMPHAI', name: 'Champhai' },
        { code: 'SERCHHIP', name: 'Serchhip' },
        { code: 'KOLASIB', name: 'Kolasib' },
        { code: 'SAIHA', name: 'Saiha' },
        { code: 'MAMIT', name: 'Mamit' },
        { code: 'LAWNGTLAI', name: 'Lawngtlai' },
        { code: 'THENZAWL', name: 'Thenzawl' },
        { code: 'SAITUAL', name: 'Saitual' }
      ]
    },
    { code: 'NL', name: 'Nagaland', type: 'state',
      cities: [
        { code: 'KOHIMA', name: 'Kohima' },
        { code: 'DIMAPUR', name: 'Dimapur' },
        { code: 'MOKOKCHUNG', name: 'Mokokchung' },
        { code: 'TUENSANG', name: 'Tuensang' },
        { code: 'WOKHA', name: 'Wokha' },
        { code: 'ZUNHEBOTO', name: 'Zunheboto' },
        { code: 'MON', name: 'Mon' },
        { code: 'PHEK', name: 'Phek' },
        { code: 'KIPHIRE', name: 'Kiphire' },
        { code: 'PEREN', name: 'Peren' }
      ]
    },
    { code: 'GA', name: 'Goa', type: 'state',
      cities: [
        { code: 'PANAJI', name: 'Panaji' },
        { code: 'MARGAO', name: 'Margao' },
        { code: 'VASCO', name: 'Vasco da Gama' },
        { code: 'MAPUSA', name: 'Mapusa' },
        { code: 'PONDA', name: 'Ponda' },
        { code: 'BICHOLIM', name: 'Bicholim' },
        { code: 'CURCHOREM', name: 'Curchorem' },
        { code: 'SANQUELIM', name: 'Sanquelim' },
        { code: 'QUEPEM', name: 'Quepem' },
        { code: 'CANACONA', name: 'Canacona' }
      ]
    },
    { code: 'SK', name: 'Sikkim', type: 'state',
      cities: [
        { code: 'GANGTOK', name: 'Gangtok' },
        { code: 'GANGTOK2', name: 'Gangtok North' },
        { code: 'NAMCHI', name: 'Namchi' },
        { code: 'GEYZING', name: 'Geyzing' },
        { code: 'MANGAN', name: 'Mangan' },
        { code: 'SINGTAM', name: 'Singtam' },
        { code: 'RANGPO', name: 'Rangpo' },
        { code: 'JORETHANG', name: 'Jorethang' },
        { code: 'PAKYONG', name: 'Pakyong' },
        { code: 'RONGPO', name: 'Rongpo' }
      ]
    },
    // Union Territories
    { code: 'DL', name: 'Delhi', type: 'union territory',
      cities: [
        { code: 'DELHI', name: 'Delhi' },
        { code: 'NEW', name: 'New Delhi' },
        { code: 'SOUTH', name: 'South Delhi' },
        { code: 'NORTH', name: 'North Delhi' },
        { code: 'EAST', name: 'East Delhi' },
        { code: 'WEST', name: 'West Delhi' },
        { code: 'CENTRAL', name: 'Central Delhi' },
        { code: 'SOUTHWEST', name: 'South West Delhi' },
        { code: 'NORTHWEST', name: 'North West Delhi' },
        { code: 'NORTHEAST', name: 'North East Delhi' }
      ]
    },
    { code: 'JK', name: 'Jammu & Kashmir', type: 'union territory',
      cities: [
        { code: 'SRINAGAR', name: 'Srinagar' },
        { code: 'JAMMU', name: 'Jammu' },
        { code: 'ANANTNAG', name: 'Anantnag' },
        { code: 'BARAMULLA', name: 'Baramulla' },
        { code: 'KATHUA', name: 'Kathua' },
        { code: 'POONCH', name: 'Poonch' },
        { code: 'RAJOURI', name: 'Rajouri' },
        { code: 'KUPWARA', name: 'Kupwara' },
        { code: 'PULWAMA', name: 'Pulwama' },
        { code: 'SHOPAIN', name: 'Shopian' }
      ]
    },
    { code: 'LA', name: 'Ladakh', type: 'union territory',
      cities: [
        { code: 'LEH', name: 'Leh' },
        { code: 'KARGIL', name: 'Kargil' },
        { code: 'ZANSKAR', name: 'Zanskar' },
        { code: 'NUBRA', name: 'Nubra' },
        { code: 'KHARDUNG', name: 'Khardung' },
        { code: 'PANGONG', name: 'Pangong' },
        { code: 'TSOMORIRI', name: 'Tsomoriri' },
        { code: 'SIACHEN', name: 'Siachen' },
        { code: 'DRAS', name: 'Dras' },
        { code: 'CHANGTHANG', name: 'Changthang' }
      ]
    },
    { code: 'PY', name: 'Puducherry', type: 'union territory',
      cities: [
        { code: 'PONDICHERRY', name: 'Pondicherry' },
        { code: 'KARAIKAL', name: 'Karaikal' },
        { code: 'YANAM', name: 'Yanam' },
        { code: 'MAHE', name: 'Mahe' },
        { code: 'PONDICHERRY2', name: 'Pondicherry North' },
        { code: 'PONDICHERRY3', name: 'Pondicherry South' },
        { code: 'AURANGABAD', name: 'Auroville' },
        { code: 'OOTY', name: 'Ooty' },
        { code: 'MAHE2', name: 'Mahe North' },
        { code: 'YANAM2', name: 'Yanam South' }
      ]
    },
    { code: 'CT', name: 'Chandigarh', type: 'union territory',
      cities: [
        { code: 'CHANDIGARH', name: 'Chandigarh' },
        { code: 'SECTOR', name: 'Sector 17' },
        { code: 'SECTOR2', name: 'Sector 22' },
        { code: 'SECTOR3', name: 'Sector 35' },
        { code: 'SECTOR4', name: 'Sector 45' },
        { code: 'SECTOR5', name: 'Sector 19' },
        { code: 'SECTOR6', name: 'Sector 26' },
        { code: 'SECTOR7', name: 'Sector 30' },
        { code: 'SECTOR8', name: 'Sector 37' },
        { code: 'SECTOR9', name: 'Sector 43' }
      ]
    },
    { code: 'AN', name: 'Andaman & Nicobar', type: 'union territory',
      cities: [
        { code: 'PORT', name: 'Port Blair' },
        { code: 'CAR', name: 'Car Nicobar' },
        { code: 'GREAT', name: 'Great Nicobar' },
        { code: 'LITTLE', name: 'Little Andaman' },
        { code: 'MIDDLE', name: 'Middle Andaman' },
        { code: 'NORTH', name: 'North Andaman' },
        { code: 'SOUTH', name: 'South Andaman' },
        { code: 'HUT', name: 'Hut Bay' },
        { code: 'MAY', name: 'Mayabunder' },
        { code: 'RANGAT', name: 'Rangat' }
      ]
    },
    { code: 'LD', name: 'Lakshadweep', type: 'union territory',
      cities: [
        { code: 'KAVARATTI', name: 'Kavaratti' },
        { code: 'AGATTI', name: 'Agatti' },
        { code: 'BANGARAM', name: 'Bangaram' },
        { code: 'KALPENI', name: 'Kalpeni' },
        { code: 'MINICOY', name: 'Minicoy' },
        { code: 'KADAMATH', name: 'Kadamath' },
        { code: 'KILTHAN', name: 'Kilthan' },
        { code: 'CHETLAT', name: 'Chetlat' },
        { code: 'BITRA', name: 'Bitra' },
        { code: 'ANDROTH', name: 'Androth' }
      ]
    },
    { code: 'DN', name: 'Dadra & Nagar Haveli', type: 'union territory',
      cities: [
        { code: 'SILVASSA', name: 'Silvassa' },
        { code: 'DADRA', name: 'Dadra' },
        { code: 'NAGAR', name: 'Nagar Haveli' },
        { code: 'KHANVEL', name: 'Khanvel' },
        { code: 'AMBOLI', name: 'Amboli' },
        { code: 'BINDRA', name: 'Bindraban' },
        { code: 'CHANDRA', name: 'Chandrapur' },
        { code: 'DAMAN', name: 'Daman' },
        { code: 'VAPI', name: 'Vapi' },
        { code: 'SILVASSA2', name: 'Silvassa North' }
      ]
    },
    { code: 'DD', name: 'Daman & Diu', type: 'union territory',
      cities: [
        { code: 'DIU', name: 'Diu' },
        { code: 'DAMAN', name: 'Daman' },
        { code: 'DIU2', name: 'Diu Town' },
        { code: 'DAMAN2', name: 'Daman Town' },
        { code: 'BHUCHAR', name: 'Buchar' },
        { code: 'GHOGHLA', name: 'Ghoghla' },
        { code: 'JAMPOR', name: 'Jampor' },
        { code: 'VANAKBARDI', name: 'Vanakbari' },
        { code: 'SASAN', name: 'Sasan' },
        { code: 'KODINAR', name: 'Kodinar' }
      ]
    }
  ]
};

export default india;

/**
 * India country data with states, cities, and tax information
 */

import { Country } from './index';

export const india: Country = {
    code: 'IN',
    name: 'India',
    taxInfo: { standardRate: 18, taxName: 'GST', currency: 'INR', region: 'APAC' },
    provinces: [
      { code: 'AP', name: 'Andhra Pradesh',
        cities: [
          { code: 'HYD', name: 'Hyderabad' },
          { code: 'VIZ', name: 'Visakhapatnam' },
          { code: 'VIJ', name: 'Vijayawada' },
          { code: 'GUN', name: 'Guntur' },
          { code: 'NEL', name: 'Nellore' },
          { code: 'KUR', name: 'Kurnool' },
          { code: 'TIR', name: 'Tirupati' },
          { code: 'RAJ', name: 'Rajahmundry' },
          { code: 'KAK', name: 'Kakinada' },
          { code: 'ANA', name: 'Anantapur' }
        ]
      },
      { code: 'AR', name: 'Arunachal Pradesh',
        cities: [
          { code: 'ITN', name: 'Itanagar' },
          { code: 'TAW', name: 'Tawang' },
          { code: 'ZIR', name: 'Ziro' },
          { code: 'PAS', name: 'Pasighat' },
          { code: 'BOM', name: 'Bomdila' },
          { code: 'TEZ', name: 'Tezu' },
          { code: 'CHAN', name: 'Changlang' },
          { code: 'DAP', name: 'Daporijo' },
          { code: 'ALO', name: 'Along' },
          { code: 'NAM', name: 'Namsai' }
        ]
      },
      { code: 'AS', name: 'Assam',
        cities: [
          { code: 'GUW', name: 'Guwahati' },
          { code: 'SIL', name: 'Silchar' },
          { code: 'DIB', name: 'Dibrugarh' },
          { code: 'JOR', name: 'Jorhat' },
          { code: 'NAG', name: 'Nagaon' },
          { code: 'TIN', name: 'Tinsukia' },
          { code: 'TEZ', name: 'Tezpur' },
          { code: 'BAI', name: 'Bongaigaon' },
          { code: 'KAR', name: 'Karimganj' },
          { code: 'SON', name: 'Sontipur' }
        ]
      },
      { code: 'BR', name: 'Bihar',
        cities: [
          { code: 'PAT', name: 'Patna' },
          { code: 'GAY', name: 'Gaya' },
          { code: 'BHAG', name: 'Bhagalpur' },
          { code: 'MUZ', name: 'Muzaffarpur' },
          { code: 'PUR', name: 'Purnia' },
          { code: 'DARB', name: 'Darbhanga' },
          { code: 'ARA', name: 'Ara' },
          { code: 'BEG', name: 'Begusarai' },
          { code: 'KAT', name: 'Katihar' },
          { code: 'MUN', name: 'Munger' }
        ]
      },
      { code: 'CG', name: 'Chhattisgarh',
        cities: [
          { code: 'RAI', name: 'Raipur' },
          { code: 'BILA', name: 'Bilaspur' },
          { code: 'DURG', name: 'Durg' },
          { code: 'BHIL', name: 'Bhilai' },
          { code: 'KOR', name: 'Korba' },
          { code: 'RAJ', name: 'Rajnandgaon' },
          { code: 'JAG', name: 'Jagdalpur' },
          { code: 'AMB', name: 'Ambikapur' },
          { code: 'BAST', name: 'Bastar' },
          { code: 'KANK', name: 'Kanker' }
        ]
      },
      { code: 'GA', name: 'Goa',
        cities: [
          { code: 'PANJ', name: 'Panaji' },
          { code: 'MARG', name: 'Margao' },
          { code: 'VAS', name: 'Vasco da Gama' },
          { code: 'MAP', name: 'Mapusa' },
          { code: 'POND', name: 'Ponda' },
          { code: 'BICH', name: 'Bicholim' },
          { code: 'CUR', name: 'Curchorem' },
          { code: 'SANQ', name: 'Sanquelim' },
          { code: 'CAN', name: 'Canacona' },
          { code: 'QUEP', name: 'Quepem' }
        ]
      },
      { code: 'GJ', name: 'Gujarat',
        cities: [
          { code: 'AHM', name: 'Ahmedabad' },
          { code: 'SUR', name: 'Surat' },
          { code: 'VAD', name: 'Vadodara' },
          { code: 'RAJ', name: 'Rajkot' },
          { code: 'BHA', name: 'Bhavnagar' },
          { code: 'JAM', name: 'Jamnagar' },
          { code: 'JUN', name: 'Junagadh' },
          { code: 'GAND', name: 'Gandhinagar' },
          { code: 'NADI', name: 'Nadiad' },
          { code: 'ANK', name: 'Anand' }
        ]
      },
      { code: 'HR', name: 'Haryana',
        cities: [
          { code: 'FAR', name: 'Faridabad' },
          { code: 'GUR', name: 'Gurgaon' },
          { code: 'PAN', name: 'Panipat' },
          { code: 'AMB', name: 'Ambala' },
          { code: 'YAM', name: 'Yamunanagar' },
          { code: 'ROH', name: 'Rohtak' },
          { code: 'HIS', name: 'Hisar' },
          { code: 'KAR', name: 'Karnal' },
          { code: 'SON', name: 'Sonipat' },
          { code: 'PAL', name: 'Palwal' }
        ]
      },
      { code: 'HP', name: 'Himachal Pradesh',
        cities: [
          { code: 'SHI', name: 'Shimla' },
          { code: 'SOL', name: 'Solan' },
          { code: 'MAN', name: 'Mandi' },
          { code: 'DHAR', name: 'Dharamshala' },
          { code: 'UNA', name: 'Una' },
          { code: 'SIR', name: 'Sirmaur' },
          { code: 'BIL', name: 'Bilaspur' },
          { code: 'HAM', name: 'Hamirpur' },
          { code: 'KIN', name: 'Kinnaur' },
          { code: 'LAH', name: 'Lahaul' }
        ]
      },
      { code: 'JK', name: 'Jammu and Kashmir',
        cities: [
          { code: 'SRIN', name: 'Srinagar' },
          { code: 'JAM', name: 'Jammu' },
          { code: 'ANAN', name: 'Anantnag' },
          { code: 'BARAM', name: 'Baramulla' },
          { code: 'KUP', name: 'Kupwara' },
          { code: 'PUL', name: 'Pulwama' },
          { code: 'SHO', name: 'Shopian' },
          { code: 'KUL', name: 'Kulgam' },
          { code: 'GAND', name: 'Ganderbal' },
          { code: 'BUD', name: 'Budgam' }
        ]
      },
      { code: 'JH', name: 'Jharkhand',
        cities: [
          { code: 'RAN', name: 'Ranchi' },
          { code: 'JAM', name: 'Jamshedpur' },
          { code: 'DHA', name: 'Dhanbad' },
          { code: 'BOK', name: 'Bokaro' },
          { code: 'DEO', name: 'Deoghar' },
          { code: 'PHU', name: 'Phusro' },
          { code: 'GIR', name: 'Giridih' },
          { code: 'HAZ', name: 'Hazaribagh' },
          { code: 'CHAT', name: 'Chaibasa' },
          { code: 'RAM', name: 'Ramgarh' }
        ]
      },
      { code: 'KA', name: 'Karnataka',
        cities: [
          { code: 'BANG', name: 'Bangalore' },
          { code: 'MYS', name: 'Mysore' },
          { code: 'HUB', name: 'Hubli' },
          { code: 'MAN', name: 'Mangalore' },
          { code: 'BEL', name: 'Belgaum' },
          { code: 'GUL', name: 'Gulbarga' },
          { code: 'DAV', name: 'Davangere' },
          { code: 'BELL', name: 'Bellary' },
          { code: 'BIJ', name: 'Bijapur' },
          { code: 'SHIM', name: 'Shimoga' }
        ]
      },
      { code: 'KL', name: 'Kerala',
        cities: [
          { code: 'THIR', name: 'Thiruvananthapuram' },
          { code: 'KOCH', name: 'Kochi' },
          { code: 'KOZ', name: 'Kozhikode' },
          { code: 'THR', name: 'Thrissur' },
          { code: 'KOL', name: 'Kollam' },
          { code: 'ALA', name: 'Alappuzha' },
          { code: 'MALA', name: 'Malappuram' },
          { code: 'PAL', name: 'Palakkad' },
          { code: 'KAN', name: 'Kannur' },
          { code: 'KAS', name: 'Kasaragod' }
        ]
      },
      { code: 'MP', name: 'Madhya Pradesh',
        cities: [
          { code: 'BHO', name: 'Bhopal' },
          { code: 'IND', name: 'Indore' },
          { code: 'GWAL', name: 'Gwalior' },
          { code: 'JAB', name: 'Jabalpur' },
          { code: 'UJJ', name: 'Ujjain' },
          { code: 'SAT', name: 'Satna' },
          { code: 'SAG', name: 'Sagar' },
          { code: 'DAM', name: 'Damoh' },
          { code: 'RAT', name: 'Ratlam' },
          { code: 'REW', name: 'Rewa' }
        ]
      },
      { code: 'MH', name: 'Maharashtra',
        cities: [
          { code: 'MUM', name: 'Mumbai' },
          { code: 'PUNE', name: 'Pune' },
          { code: 'NAG', name: 'Nagpur' },
          { code: 'THA', name: 'Thane' },
          { code: 'NAS', name: 'Nashik' },
          { code: 'AUR', name: 'Aurangabad' },
          { code: 'SOL', name: 'Solapur' },
          { code: 'KOL', name: 'Kolhapur' },
          { code: 'AMR', name: 'Amravati' },
          { code: 'NAN', name: 'Nanded' }
        ]
      },
      { code: 'MN', name: 'Manipur',
        cities: [
          { code: 'IMP', name: 'Imphal' },
          { code: 'THOU', name: 'Thoubal' },
          { code: 'CHAN', name: 'Chandel' },
          { code: 'CHUR', name: 'Churachandpur' },
          { code: 'BISH', name: 'Bishnupur' },
          { code: 'TAM', name: 'Tamenglong' },
          { code: 'UKHR', name: 'Ukhrul' },
          { code: 'SEN', name: 'Senapati' },
          { code: 'KAK', name: 'Kakching' },
          { code: 'JIR', name: 'Jiribam' }
        ]
      },
      { code: 'ME', name: 'Meghalaya',
        cities: [
          { code: 'SHIL', name: 'Shillong' },
          { code: 'TURA', name: 'Tura' },
          { code: 'NONG', name: 'Nongstoin' },
          { code: 'JOW', name: 'Jowai' },
          { code: 'BAG', name: 'Baghmara' },
          { code: 'WIL', name: 'Williamnagar' },
          { code: 'RES', name: 'Resubelpara' },
          { code: 'KHAD', name: 'Khliehriat' },
          { code: 'MAW', name: 'Mawkyrwat' },
          { code: 'MAW2', name: 'Mawphlang' }
        ]
      },
      { code: 'MI', name: 'Mizoram',
        cities: [
          { code: 'AIZ', name: 'Aizawl' },
          { code: 'LUNG', name: 'Lunglei' },
          { code: 'CHAM', name: 'Champhai' },
          { code: 'SAIHA', name: 'Saiha' },
          { code: 'KOL', name: 'Kolasib' },
          { code: 'SER', name: 'Serchhip' },
          { code: 'MAM', name: 'Mamit' },
          { code: 'LAW', name: 'Lawngtlai' },
          { code: 'SAIT', name: 'Saitual' },
          { code: 'KHAW', name: 'Khawzawl' }
        ]
      },
      { code: 'NL', name: 'Nagaland',
        cities: [
          { code: 'KOH', name: 'Kohima' },
          { code: 'DIM', name: 'Dimapur' },
          { code: 'MOK', name: 'Mokokchung' },
          { code: 'TUEN', name: 'Tuensang' },
          { code: 'WOK', name: 'Wokha' },
          { code: 'ZUN', name: 'Zunheboto' },
          { code: 'PHE', name: 'Phek' },
          { code: 'KIPH', name: 'Kiphire' },
          { code: 'LONG', name: 'Longleng' },
          { code: 'PER', name: 'Peren' }
        ]
      },
      { code: 'OD', name: 'Odisha',
        cities: [
          { code: 'BHU', name: 'Bhubaneswar' },
          { code: 'CUT', name: 'Cuttack' },
          { code: 'ROUR', name: 'Rourkela' },
          { code: 'PURI', name: 'Puri' },
          { code: 'SAMB', name: 'Sambalpur' },
          { code: 'BALA', name: 'Balasore' },
          { code: 'BER', name: 'Berhampur' },
          { code: 'DHEN', name: 'Dhenkanal' },
          { code: 'ANGU', name: 'Angul' },
          { code: 'JAG', name: 'Jagatsinghpur' }
        ]
      },
      { code: 'PB', name: 'Punjab',
        cities: [
          { code: 'CHD', name: 'Chandigarh' },
          { code: 'LUD', name: 'Ludhiana' },
          { code: 'AMR', name: 'Amritsar' },
          { code: 'JAL', name: 'Jalandhar' },
          { code: 'PAT', name: 'Patiala' },
          { code: 'BATH', name: 'Bathinda' },
          { code: 'MOGA', name: 'Moga' },
          { code: 'FATE', name: 'Fatehgarh Sahib' },
          { code: 'KAP', name: 'Kapurthala' },
          { code: 'GUR', name: 'Gurdaspur' }
        ]
      },
      { code: 'RJ', name: 'Rajasthan',
        cities: [
          { code: 'JAI', name: 'Jaipur' },
          { code: 'JOD', name: 'Jodhpur' },
          { code: 'UDA', name: 'Udaipur' },
          { code: 'KOT', name: 'Kota' },
          { code: 'AJM', name: 'Ajmer' },
          { code: 'BHI', name: 'Bhilwara' },
          { code: 'ALW', name: 'Alwar' },
          { code: 'BHI2', name: 'Bhiwadi' },
          { code: 'SRI', name: 'Sri Ganganagar' },
          { code: 'PIL', name: 'Pilani' }
        ]
      },
      { code: 'SK', name: 'Sikkim',
        cities: [
          { code: 'GAN', name: 'Gangtok' },
          { code: 'NAM', name: 'Namchi' },
          { code: 'GAY', name: 'Gyalshing' },
          { code: 'MANG', name: 'Mangan' },
          { code: 'PAK', name: 'Pakyong' },
          { code: 'RANG', name: 'Rangpo' },
          { code: 'JORE', name: 'Jorethang' },
          { code: 'SING', name: 'Singtam' },
          { code: 'RUM', name: 'Rumtek' },
          { code: 'RONG', name: 'Rongli' }
        ]
      },
      { code: 'TN', name: 'Tamil Nadu',
        cities: [
          { code: 'CHEN', name: 'Chennai' },
          { code: 'COI', name: 'Coimbatore' },
          { code: 'MAD', name: 'Madurai' },
          { code: 'TRI', name: 'Tiruchirappalli' },
          { code: 'SALEM', name: 'Salem' },
          { code: 'TIRU', name: 'Tirunelveli' },
          { code: 'TUP', name: 'Tupur' },
          { code: 'VEL', name: 'Vellore' },
          { code: 'THOO', name: 'Thoothukudi' },
          { code: 'DHAR', name: 'Dharmapuri' }
        ]
      },
      { code: 'TS', name: 'Telangana',
        cities: [
          { code: 'HYD', name: 'Hyderabad' },
          { code: 'WAR', name: 'Warangal' },
          { code: 'NIZ', name: 'Nizamabad' },
          { code: 'KAR', name: 'Karimnagar' },
          { code: 'RAM', name: 'Ramagundam' },
          { code: 'KHA', name: 'Khammam' },
          { code: 'MAH', name: 'Mahbubnagar' },
          { code: 'ADI', name: 'Adilabad' },
          { code: 'MED', name: 'Medak' },
          { code: 'NAL', name: 'Nalgonda' }
        ]
      },
      { code: 'TR', name: 'Tripura',
        cities: [
          { code: 'AGAR', name: 'Agartala' },
          { code: 'UDA', name: 'Udaipur' },
          { code: 'DHAR', name: 'Dharmanagar' },
          { code: 'KAIL', name: 'Kailashahar' },
          { code: 'BEL', name: 'Belonia' },
          { code: 'SANT', name: 'Santirbazar' },
          { code: 'KAM', name: 'Kamalpur' },
          { code: 'KUM', name: 'Kumarghat' },
          { code: 'PAN', name: 'Panisagar' },
          { code: 'TEL', name: 'Teliamura' }
        ]
      },
      { code: 'UP', name: 'Uttar Pradesh',
        cities: [
          { code: 'LKN', name: 'Lucknow' },
          { code: 'KAN', name: 'Kanpur' },
          { code: 'GHA', name: 'Ghaziabad' },
          { code: 'NOI', name: 'Noida' },
          { code: 'AGR', name: 'Agra' },
          { code: 'VAR', name: 'Varanasi' },
          { code: 'ALL', name: 'Allahabad' },
          { code: 'MEER', name: 'Meerut' },
          { code: 'BARE', name: 'Bareilly' },
          { code: 'ALI', name: 'Aligarh' }
        ]
      },
      { code: 'UT', name: 'Uttarakhand',
        cities: [
          { code: 'DEH', name: 'Dehradun' },
          { code: 'HAL', name: 'Haldwani' },
          { code: 'RUD', name: 'Rudrapur' },
          { code: 'RISH', name: 'Rishikesh' },
          { code: 'HARI', name: 'Haridwar' },
          { code: 'KASH', name: 'Kashipur' },
          { code: 'ROO', name: 'Roorkee' },
          { code: 'KOT', name: 'Kotdwar' },
          { code: 'PITH', name: 'Pithoragarh' },
          { code: 'BAG', name: 'Bageshwar' }
        ]
      },
      { code: 'WB', name: 'West Bengal',
        cities: [
          { code: 'KOL', name: 'Kolkata' },
          { code: 'DUR', name: 'Durgapur' },
          { code: 'SIL', name: 'Siliguri' },
          { code: 'ASAN', name: 'Asansol' },
          { code: 'BARD', name: 'Bardhaman' },
          { code: 'MAL', name: 'Malda' },
          { code: 'HOO', name: 'Hooghly' },
          { code: 'HOW', name: 'Howrah' },
          { code: 'NAD', name: 'Nadia' },
          { code: 'MUR', name: 'Murshidabad' }
        ]
      }
    ]
  };

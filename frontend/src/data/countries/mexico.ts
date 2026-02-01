/**
 * Mexico country data with states, cities, and tax information
 */

import { Country } from './index';

export const mexico: Country = {
    code: 'MX',
    name: 'Mexico',
    taxInfo: { standardRate: 16, taxName: 'IVA', currency: 'MXN', region: 'LATAM' },
    provinces: [
      { code: 'AGU', name: 'Aguascalientes',
        cities: [
          { code: 'AGU', name: 'Aguascalientes' },
          { code: 'JES', name: 'Jesús María' },
          { code: 'CAL', name: 'Calvillo' },
          { code: 'RIN', name: 'Rincón de Romos' },
          { code: 'PAV', name: 'Pabellón de Arteaga' },
          { code: 'ELC', name: 'El Llano' },
          { code: 'SFR', name: 'San Francisco de los Romo' },
          { code: 'SAN', name: 'San José de Gracia' },
          { code: 'TEP', name: 'Tepezalá' },
          { code: 'ASI', name: 'Asientos' }
        ]
      },
      { code: 'BCN', name: 'Baja California',
        cities: [
          { code: 'MEX', name: 'Mexicali' },
          { code: 'TIJ', name: 'Tijuana' },
          { code: 'ENSE', name: 'Ensenada' },
          { code: 'TEC', name: 'Tecate' },
          { code: 'PLAY', name: 'Playas de Rosarito' },
          { code: 'SAN', name: 'San Quintín' },
          { code: 'SAN2', name: 'San Felipe' },
          { code: 'ROS', name: 'Rosarito' },
          { code: 'VAL', name: 'Valle de la Trinidad' },
          { code: 'SANT', name: 'Santo Tomás' }
        ]
      },
      { code: 'BCS', name: 'Baja California Sur',
        cities: [
          { code: 'LAZ', name: 'La Paz' },
          { code: 'CAB', name: 'Cabo San Lucas' },
          { code: 'SAN', name: 'San José del Cabo' },
          { code: 'SANTA', name: 'Santa Rosalía' },
          { code: 'CIU', name: 'Ciudad Constitución' },
          { code: 'MULE', name: 'Mulegé' },
          { code: 'LORE', name: 'Loreto' },
          { code: 'LOS', name: 'Los Barriles' },
          { code: 'BUEN', name: 'Buenavista' },
          { code: 'TOD', name: 'Todos Santos' }
        ]
      },
      { code: 'CAM', name: 'Campeche',
        cities: [
          { code: 'CAM', name: 'San Francisco de Campeche' },
          { code: 'CIT', name: 'Ciudad del Carmen' },
          { code: 'CHAM', name: 'Champotón' },
          { code: 'ESCA', name: 'Escárcega' },
          { code: 'HEC', name: 'Hopelchén' },
          { code: 'CALK', name: 'Calkiní' },
          { code: 'TEN', name: 'Tenabo' },
          { code: 'CAN', name: 'Candelaria' },
          { code: 'SAB', name: 'Sabancuy' },
          { code: 'DZIB', name: 'Dzibalché' }
        ]
      },
      { code: 'CHP', name: 'Chiapas',
        cities: [
          { code: 'TUX', name: 'Tuxtla Gutiérrez' },
          { code: 'SAN', name: 'San Cristóbal de las Casas' },
          { code: 'TAP', name: 'Tapachula' },
          { code: 'VILLA', name: 'Villaflores' },
          { code: 'COM', name: 'Comitán' },
          { code: 'TUXT', name: 'Tuxtla Chico' },
          { code: 'HUI', name: 'Huixtla' },
          { code: 'OCOS', name: 'Ocosingo' },
          { code: 'CATA', name: 'Catazajá' },
          { code: 'PALEN', name: 'Palenque' }
        ]
      },
      { code: 'CHH', name: 'Chihuahua',
        cities: [
          { code: 'CHI', name: 'Chihuahua' },
          { code: 'JUA', name: 'Juárez' },
          { code: 'PARR', name: 'Parral' },
          { code: 'CUAU', name: 'Cuauhtémoc' },
          { code: 'DEL', name: 'Delicias' },
          { code: 'GOME', name: 'Gómez Palacio' },
          { code: 'MAD', name: 'Madera' },
          { code: 'NUEV', name: 'Nuevo Casas Grandes' },
          { code: 'CAM', name: 'Camargo' },
          { code: 'JIM', name: 'Jiménez' }
        ]
      },
      { code: 'COA', name: 'Coahuila',
        cities: [
          { code: 'SALT', name: 'Saltillo' },
          { code: 'TORR', name: 'Torreón' },
          { code: 'MON', name: 'Monclova' },
          { code: 'PIED', name: 'Piedras Negras' },
          { code: 'ACU', name: 'Acuña' },
          { code: 'RAUL', name: 'Ramos Arizpe' },
          { code: 'SAN', name: 'San Pedro' },
          { code: 'FRON', name: 'Frontera' },
          { code: 'NAVA', name: 'Nava' },
          { code: 'MORE', name: 'Morelos' }
        ]
      },
      { code: 'COL', name: 'Colima',
        cities: [
          { code: 'COL', name: 'Colima' },
          { code: 'MANZ', name: 'Manzanillo' },
          { code: 'VILLA', name: 'Villa de Álvarez' },
          { code: 'TECOM', name: 'Tecomán' },
          { code: 'ARME', name: 'Armería' },
          { code: 'CUAU', name: 'Cuauhtémoc' },
          { code: 'MINA', name: 'Minatitlán' },
          { code: 'IXTL', name: 'Ixtlahuacán' },
          { code: 'COQU', name: 'Coquimatlán' },
          { code: 'COMAL', name: 'Comala' }
        ]
      },
      { code: 'DUR', name: 'Durango',
        cities: [
          { code: 'DUR', name: 'Durango' },
          { code: 'GOME', name: 'Gómez Palacio' },
          { code: 'LERD', name: 'Lerdo' },
          { code: 'VIC', name: 'Victoria de Durango' },
          { code: 'SANTI', name: 'Santiago Papasquiaro' },
          { code: 'GUAN', name: 'Guanaceví' },
          { code: 'TEPE', name: 'Tepehuanes' },
          { code: 'NUEV', name: 'Nuevo Ideal' },
          { code: 'CANAT', name: 'Canatlán' },
          { code: 'CONC', name: 'Coneto de Comonfort' }
        ]
      },
      { code: 'GUA', name: 'Guanajuato',
        cities: [
          { code: 'LEON', name: 'León' },
          { code: 'GUA', name: 'Guanajuato' },
          { code: 'IRA', name: 'Irapuato' },
          { code: 'CELA', name: 'Celaya' },
          { code: 'SALAM', name: 'Salamanca' },
          { code: 'SIL', name: 'Silao' },
          { code: 'SAN', name: 'San Francisco del Rincón' },
          { code: 'URIAT', name: 'Uriangato' },
          { code: 'MORA', name: 'Moroleón' },
          { code: 'DOLO', name: 'Dolores Hidalgo' }
        ]
      },
      { code: 'GRO', name: 'Guerrero',
        cities: [
          { code: 'ACA', name: 'Acapulco' },
          { code: 'CHIL', name: 'Chilpancingo' },
          { code: 'IGUAL', name: 'Iguala' },
          { code: 'ZIHUA', name: 'Zihuatanejo' },
          { code: 'TAXCO', name: 'Taxco de Alarcón' },
          { code: 'COP', name: 'Copala' },
          { code: 'PETAT', name: 'Petatlán' },
          { code: 'ACAP', name: 'Acapulco de Juárez' },
          { code: 'TECO', name: 'Técpan de Galeana' },
          { code: 'QUECH', name: 'Quechultenango' }
        ]
      },
      { code: 'HID', name: 'Hidalgo',
        cities: [
          { code: 'PACH', name: 'Pachuca' },
          { code: 'TUL', name: 'Tulancingo' },
          { code: 'ZIM', name: 'Zimapán' },
          { code: 'HUEJ', name: 'Huejutla' },
          { code: 'IXMI', name: 'Ixmiquilpan' },
          { code: 'ACTO', name: 'Actopan' },
          { code: 'MOL', name: 'Molango' },
          { code: 'TULA', name: 'Tula de Allende' },
          { code: 'CARD', name: 'Cardonal' },
          { code: 'JAC', name: 'Jacala' }
        ]
      },
      { code: 'JAL', name: 'Jalisco',
        cities: [
          { code: 'GUA', name: 'Guadalajara' },
          { code: 'ZAP', name: 'Zapopan' },
          { code: 'TON', name: 'Tonalá' },
          { code: 'TLAQ', name: 'Tlaquepaque' },
          { code: 'PUERT', name: 'Puerto Vallarta' },
          { code: 'LAGOS', name: 'Lagos de Moreno' },
          { code: 'CIUD', name: 'Ciudad Guzmán' },
          { code: 'TEPAT', name: 'Tepatitlán' },
          { code: 'OCOTA', name: 'Ocotlán' },
          { code: 'SAN', name: 'San Juan de los Lagos' }
        ]
      },
      { code: 'MEX', name: 'Mexico',
        cities: [
          { code: 'TOL', name: 'Toluca' },
          { code: 'ECAT', name: 'Ecatepec' },
          { code: 'NAUC', name: 'Naucalpan' },
          { code: 'ATIZ', name: 'Atizapán' },
          { code: 'TLAN', name: 'Tlalnepantla' },
          { code: 'CHIM', name: 'Chimalhuacán' },
          { code: 'COAC', name: 'Coacalco' },
          { code: 'REFO', name: 'Reynosa' },
          { code: 'ZUM', name: 'Zumpango' },
          { code: 'VALLE', name: 'Valle de Bravo' }
        ]
      },
      { code: 'MIC', name: 'Michoacán',
        cities: [
          { code: 'MORE', name: 'Morelia' },
          { code: 'URUA', name: 'Uruapan' },
          { code: 'ZAM', name: 'Zamora' },
          { code: 'LAZA', name: 'Lázaro Cárdenas' },
          { code: 'PATZ', name: 'Pátzcuaro' },
          { code: 'ZITA', name: 'Zitácuaro' },
          { code: 'APAT', name: 'Apatzingán' },
          { code: 'TANG', name: 'Tangamandapio' },
          { code: 'JAC', name: 'Jacona' },
          { code: 'PURU', name: 'Puréndiro' }
        ]
      },
      { code: 'MOR', name: 'Morelos',
        cities: [
          { code: 'CUE', name: 'Cuernavaca' },
          { code: 'CUER', name: 'Cuautla' },
          { code: 'JIUT', name: 'Jiutepec' },
          { code: 'TEM', name: 'Temixco' },
          { code: 'YAUTE', name: 'Yautepec' },
          { code: 'EMIL', name: 'Emiliano Zapata' },
          { code: 'AXO', name: 'Axochiapan' },
          { code: 'JOJU', name: 'Jojutla' },
          { code: 'TLA', name: 'Tlaltizapán' },
          { code: 'XOCH', name: 'Xochitepec' }
        ]
      },
      { code: 'NAY', name: 'Nayarit',
        cities: [
          { code: 'TEPIC', name: 'Tepic' },
          { code: 'ACAP', name: 'Acapulco' },
          { code: 'SANTI', name: 'Santiago Ixcuintla' },
          { code: 'TECU', name: 'Tecuala' },
          { code: 'BACA', name: 'Bacanora' },
          { code: 'COMO', name: 'Compostela' },
          { code: 'JALA', name: 'Jala' },
          { code: 'IXTL', name: 'Ixtlán del Río' },
          { code: 'RU', name: 'Ruíz' },
          { code: 'SAN', name: 'San Blas' }
        ]
      },
      { code: 'NLE', name: 'Nuevo León',
        cities: [
          { code: 'MTY', name: 'Monterrey' },
          { code: 'GUA', name: 'Guadalupe' },
          { code: 'SNI', name: 'San Nicolás de los Garza' },
          { code: 'APOD', name: 'Apodaca' },
          { code: 'SANT', name: 'Santa Catarina' },
          { code: 'SAN2', name: 'San Pedro Garza García' },
          { code: 'GARC', name: 'García' },
          { code: 'MON', name: 'Montemorelos' },
          { code: 'LIN', name: 'Linares' },
          { code: 'CADI', name: 'Cadereyta' }
        ]
      },
      { code: 'OAX', name: 'Oaxaca',
        cities: [
          { code: 'OAX', name: 'Oaxaca' },
          { code: 'SAN', name: 'San Juan Bautista Tuxtepec' },
          { code: 'JUCH', name: 'Juchitán' },
          { code: 'IST', name: 'Isthmus' },
          { code: 'MIA', name: 'Miahuatlán' },
          { code: 'HUAJ', name: 'Huajuapan' },
          { code: 'PIN', name: 'Pinotepa' },
          { code: 'TUX', name: 'Tuxtepec' },
          { code: 'TEHUA', name: 'Tehuantepec' },
          { code: 'OCT', name: 'Ocotlán' }
        ]
      },
      { code: 'PUE', name: 'Puebla',
        cities: [
          { code: 'PUE', name: 'Puebla' },
          { code: 'HER', name: 'Heroica Puebla de Zaragoza' },
          { code: 'TEHUA', name: 'Tehuacán' },
          { code: 'SAN', name: 'San Martín Texmelucan' },
          { code: 'CHOL', name: 'Cholula' },
          { code: 'ATIX', name: 'Atlixco' },
          { code: 'IZU', name: 'Izúcar de Matamoros' },
          { code: 'TEZ', name: 'Teziutlán' },
          { code: 'HUA', name: 'Huauchinango' },
          { code: 'PAN', name: 'Pantepec' }
        ]
      },
      { code: 'QUE', name: 'Querétaro',
        cities: [
          { code: 'QUE', name: 'Santiago de Querétaro' },
          { code: 'SAN', name: 'San Juan del Río' },
          { code: 'CORR', name: 'Corregidora' },
          { code: 'ELM', name: 'El Marqués' },
          { code: 'PED', name: 'Pedro Escobedo' },
          { code: 'TEQ', name: 'Tequisquiapan' },
          { code: 'CADER', name: 'Cadereyta' },
          { code: 'ARO', name: 'Amealco' },
          { code: 'HUI', name: 'Huimilpan' },
          { code: 'COL', name: 'Colón' }
        ]
      },
      { code: 'ROO', name: 'Quintana Roo',
        cities: [
          { code: 'CUN', name: 'Cancún' },
          { code: 'PLAYA', name: 'Playa del Carmen' },
          { code: 'CHET', name: 'Chetumal' },
          { code: 'COZU', name: 'Cozumel' },
          { code: 'TUL', name: 'Tulum' },
          { code: 'CANC', name: 'Cancún' },
          { code: 'FELI', name: 'Felipe Carrillo Puerto' },
          { code: 'BAC', name: 'Bacalar' },
          { code: 'ISLA', name: 'Isla Mujeres' },
          { code: 'AKU', name: 'Akumal' }
        ]
      },
      { code: 'SLP', name: 'San Luis Potosí',
        cities: [
          { code: 'SLP', name: 'San Luis Potosí' },
          { code: 'SOLED', name: 'Soledad' },
          { code: 'CIUD', name: 'Ciudad Valles' },
          { code: 'Mate', name: 'Matehuala' },
          { code: 'RIO', name: 'Rioverde' },
          { code: 'TAM', name: 'Tamazunchale' },
          { code: 'CERR', name: 'Cerro de San Pedro' },
          { code: 'CHAR', name: 'Charcas' },
          { code: 'CART', name: 'Catorce' },
          { code: 'VILLA', name: 'Villa de Reyes' }
        ]
      },
      { code: 'SIN', name: 'Sinaloa',
        cities: [
          { code: 'CUL', name: 'Culiacán' },
          { code: 'MAZA', name: 'Mazatlán' },
          { code: 'LOS', name: 'Los Mochis' },
          { code: 'GUAS', name: 'Guasave' },
          { code: 'NAV', name: 'Navolato' },
          { code: 'EL', name: 'El Fuerte' },
          { code: 'CHOI', name: 'Choix' },
          { code: 'ESCO', name: 'Escuinapa' },
          { code: 'CONC', name: 'Concordia' },
          { code: 'ANG', name: 'Angostura' }
        ]
      },
      { code: 'SON', name: 'Sonora',
        cities: [
          { code: 'HER', name: 'Hermosillo' },
          { code: 'CIUD', name: 'Ciudad Obregón' },
          { code: 'NOGA', name: 'Nogales' },
          { code: 'SAN', name: 'San Luis Río Colorado' },
          { code: 'GUAY', name: 'Guaymas' },
          { code: 'MOCA', name: 'Mocorito' },
          { code: 'CAB', name: 'Caborca' },
          { code: 'ALT', name: 'Altar' },
          { code: 'PIT', name: 'Pitiquito' },
          { code: 'BEN', name: 'Benjamín Hill' }
        ]
      },
      { code: 'TAB', name: 'Tabasco',
        cities: [
          { code: 'VIL', name: 'Villahermosa' },
          { code: 'CARD', name: 'Cárdenas' },
          { code: 'COM', name: 'Comalcalco' },
          { code: 'PAR', name: 'Paraíso' },
          { code: 'FRON', name: 'Frontera' },
          { code: 'JON', name: 'Jonuta' },
          { code: 'TECP', name: 'Tecolutla' },
          { code: 'MACU', name: 'Macuspana' },
          { code: 'BALA', name: 'Balancán' },
          { code: 'EMIL', name: 'Emiliano Zapata' }
        ]
      },
      { code: 'TAM', name: 'Tamaulipas',
        cities: [
          { code: 'REY', name: 'Reynosa' },
          { code: 'MAT', name: 'Matamoros' },
          { code: 'NUEV', name: 'Nuevo Laredo' },
          { code: 'TAMP', name: 'Tampico' },
          { code: 'VICT', name: 'Victoria' },
          { code: 'MIG', name: 'Miguel Alemán' },
          { code: 'VAL', name: 'Valle Hermoso' },
          { code: 'RIO', name: 'Río Bravo' },
          { code: 'ALTO', name: 'Altamira' },
          { code: 'GOME', name: 'Gómez Palacio' }
        ]
      },
      { code: 'TLA', name: 'Tlaxcala',
        cities: [
          { code: 'TLAX', name: 'Tlaxcala' },
          { code: 'VIC', name: 'Vicente Guerrero' },
          { code: 'APIZ', name: 'Apizaco' },
          { code: 'HUA', name: 'Huamantla' },
          { code: 'CAL', name: 'Calpulalpan' },
          { code: 'SAN', name: 'San Pablo del Monte' },
          { code: 'XICO', name: 'Xicohtzinco' },
          { code: 'CHIA', name: 'Chiautempan' },
          { code: 'TEZ', name: 'Tezoatlán' },
          { code: 'NATI', name: 'Nativitas' }
        ]
      },
      { code: 'VER', name: 'Veracruz',
        cities: [
          { code: 'VER', name: 'Veracruz' },
          { code: 'XAL', name: 'Xalapa' },
          { code: 'COAT', name: 'Coatzacoalcos' },
          { code: 'MINA', name: 'Minatitlán' },
          { code: 'ORD', name: 'Orizaba' },
          { code: 'CORD', name: 'Córdoba' },
          { code: 'POZA', name: 'Poza Rica' },
          { code: 'BAND', name: 'Banderilla' },
          { code: 'CAM', name: 'Campeche' },
          { code: 'JAL', name: 'Jalapa' }
        ]
      },
      { code: 'YUC', name: 'Yucatán',
        cities: [
          { code: 'MER', name: 'Mérida' },
          { code: 'VALL', name: 'Valladolid' },
          { code: 'TIZ', name: 'Tizimín' },
          { code: 'PRO', name: 'Progreso' },
          { code: 'MOT', name: 'Motul' },
          { code: 'TEC', name: 'Tecoh' },
          { code: 'OXC', name: 'Oxkutzcab' },
          { code: 'TIC', name: 'Ticul' },
          { code: 'KAN', name: 'Kanasín' },
          { code: 'UMA', name: 'Umán' }
        ]
      },
      { code: 'ZAC', name: 'Zacatecas',
        cities: [
          { code: 'ZAC', name: 'Zacatecas' },
          { code: 'FRES', name: 'Fresnillo' },
          { code: 'GUAD', name: 'Guadalupe' },
          { code: 'JERE', name: 'Jerez' },
          { code: 'SOM', name: 'Sombrerete' },
          { code: 'RIO', name: 'Río Grande' },
          { code: 'TLA', name: 'Tlaltenango' },
          { code: 'MEL', name: 'Melchor Ocampo' },
          { code: 'GEN', name: 'General Pánfilo Natera' },
          { code: 'SAI', name: 'Saín Alto' }
        ]
      },
      { code: 'CMX', name: 'Ciudad de México',
        cities: [
          { code: 'CDMX', name: 'Ciudad de México' },
          { code: 'IZT', name: 'Iztapalapa' },
          { code: 'GUST', name: 'Gustavo A. Madero' },
          { code: 'ALVA', name: 'Álvaro Obregón' },
          { code: 'COYO', name: 'Coyoacán' },
          { code: 'BENI', name: 'Benito Juárez' },
          { code: 'VENU', name: 'Venustiano Carranza' },
          { code: 'MIG', name: 'Miguel Hidalgo' },
          { code: 'TLAH', name: 'Tláhuac' },
          { code: 'TLAL', name: 'Tlalpan' }
        ]
      }
    ]
  };
/**
 * Spain country data with autonomous communities, cities, and tax information
 */

import { Country } from './index';

export const spain: Country = {
    code: 'ES',
    name: 'Spain',
    taxInfo: { standardRate: 21, taxName: 'VAT', currency: 'EUR', region: 'EU' },
    provinces: [
      { code: 'MD', name: 'Madrid',
        cities: [
          { code: 'MAD', name: 'Madrid' },
          { code: 'MOSTOLES', name: 'Móstoles' },
          { code: 'FUENLABRADA', name: 'Fuenlabrada' },
          { code: 'LEGANES', name: 'Leganés' },
          { code: 'GETAFE', name: 'Getafe' },
          { code: 'ALCOBENDAS', name: 'Alcobendas' },
          { code: 'TORREJON', name: 'Torrejón de Ardoz' },
          { code: 'PARLA', name: 'Parla' },
          { code: 'ALCORCON', name: 'Alcorcón' },
          { code: 'COSLADA', name: 'Coslada' }
        ]
      },
      { code: 'CT', name: 'Catalonia',
        cities: [
          { code: 'BCN', name: 'Barcelona' },
          { code: 'LHOSPITALET', name: 'L\'Hospitalet de Llobregat' },
          { code: 'BADALONA', name: 'Badalona' },
          { code: 'TERRASSA', name: 'Terrassa' },
          { code: 'SABADELL', name: 'Sabadell' },
          { code: 'SANT', name: 'Sant Cugat del Vallès' },
          { code: 'CORNELLA', name: 'Cornellà de Llobregat' },
          { code: 'SANT2', name: 'Sant Boi de Llobregat' },
          { code: 'RUBI', name: 'Rubí' },
          { code: 'MANRESA', name: 'Manresa' }
        ]
      },
      { code: 'AN', name: 'Andalusia',
        cities: [
          { code: 'SEV', name: 'Seville' },
          { code: 'MALAGA', name: 'Málaga' },
          { code: 'CORDOBA', name: 'Córdoba' },
          { code: 'GRANADA', name: 'Granada' },
          { code: 'ALMERIA', name: 'Almería' },
          { code: 'HUELVA', name: 'Huelva' },
          { code: 'CADIZ', name: 'Cádiz' },
          { code: 'JAEN', name: 'Jaén' },
          { code: 'JEREZ', name: 'Jerez de la Frontera' },
          { code: 'ALMUNECAR', name: 'Almuñécar' }
        ]
      },
      { code: 'VC', name: 'Valencian Community',
        cities: [
          { code: 'VLC', name: 'Valencia' },
          { code: 'ALICANTE', name: 'Alicante' },
          { code: 'CASTELLON', name: 'Castellón de la Plana' },
          { code: 'TORREVIEJA', name: 'Torrevieja' },
          { code: 'ELCHE', name: 'Elche' },
          { code: 'ORIHUELA', name: 'Orihuela' },
          { code: 'GANDIA', name: 'Gandia' },
          { code: 'BENIDORM', name: 'Benidorm' },
          { code: 'SAGUNT', name: 'Sagunt' },
          { code: 'PATERNA', name: 'Paterna' }
        ]
      },
      { code: 'GA', name: 'Galicia',
        cities: [
          { code: 'VGO', name: 'Vigo' },
          { code: 'SANTIAGO', name: 'Santiago de Compostela' },
          { code: 'CORUNA', name: 'A Coruña' },
          { code: 'LUGO', name: 'Lugo' },
          { code: 'ORENSE', name: 'Ourense' },
          { code: 'PONTEVEDRA', name: 'Pontevedra' },
          { code: 'FERROL', name: 'Ferrol' },
          { code: 'NARON', name: 'Narón' },
          { code: 'VILAGARCIA', name: 'Vilagarcía de Arousa' },
          { code: 'RIBEIRA', name: 'Ribeira' }
        ]
      },
      { code: 'PV', name: 'Basque Country',
        cities: [
          { code: 'BIL', name: 'Bilbao' },
          { code: 'VITORIA', name: 'Vitoria-Gasteiz' },
          { code: 'SAN', name: 'San Sebastián' },
          { code: 'BARAKALDO', name: 'Barakaldo' },
          { code: 'GETXO', name: 'Getxo' },
          { code: 'IRUN', name: 'Irún' },
          { code: 'SANTURTZI', name: 'Santurtzi' },
          { code: 'PORTUGALETE', name: 'Portugalete' },
          { code: 'DURANGO', name: 'Durango' },
          { code: 'AMOREBIETA', name: 'Amorebieta-Etxano' }
        ]
      },
      { code: 'CL', name: 'Castile and León',
        cities: [
          { code: 'VALLADOLID', name: 'Valladolid' },
          { code: 'BURGOS', name: 'Burgos' },
          { code: 'LEON', name: 'León' },
          { code: 'SALAMANCA', name: 'Salamanca' },
          { code: 'PALENCIA', name: 'Palencia' },
          { code: 'ZAMORA', name: 'Zamora' },
          { code: 'SEGOVIA', name: 'Segovia' },
          { code: 'AVILA', name: 'Ávila' },
          { code: 'SORIA', name: 'Soria' },
          { code: 'PONFERRADA', name: 'Ponferrada' }
        ]
      },
      { code: 'CM', name: 'Castile-La Mancha',
        cities: [
          { code: 'TOLEDO', name: 'Toledo' },
          { code: 'CIUDAD', name: 'Ciudad Real' },
          { code: 'ALBACETE', name: 'Albacete' },
          { code: 'CUENCA', name: 'Cuenca' },
          { code: 'GUADALAJARA', name: 'Guadalajara' },
          { code: 'TALAVERA', name: 'Talavera de la Reina' },
          { code: 'ALCÁZAR', name: 'Alcázar de San Juan' },
          { code: 'PUERTOLLANO', name: 'Puertollano' },
          { code: 'VALDEPEÑAS', name: 'Valdepeñas' },
          { code: 'TOMELLOSO', name: 'Tomelloso' }
        ]
      },
      { code: 'AR', name: 'Aragon',
        cities: [
          { code: 'ZARAGOZA', name: 'Zaragoza' },
          { code: 'HUESCA', name: 'Huesca' },
          { code: 'TERUEL', name: 'Teruel' },
          { code: 'JACA', name: 'Jaca' },
          { code: 'FRAGA', name: 'Fraga' },
          { code: 'BARBASTRO', name: 'Barbastro' },
          { code: 'ALCAÑIZ', name: 'Alcañiz' },
          { code: 'CALATAYUD', name: 'Calatayud' },
          { code: 'EJEA', name: 'Ejea de los Caballeros' },
          { code: 'MONZON', name: 'Monzón' }
        ]
      },
      { code: 'RI', name: 'La Rioja',
        cities: [
          { code: 'LOGROÑO', name: 'Logroño' },
          { code: 'CALAHORRA', name: 'Calahorra' },
          { code: 'ARO', name: 'Haro' },
          { code: 'NAVARRETE', name: 'Navarrete' },
          { code: 'SANTO', name: 'Santo Domingo de la Calzada' },
          { code: 'ALFARO', name: 'Alfaro' },
          { code: 'ARNE', name: 'Arnedo' },
          { code: 'NAJERA', name: 'Nájera' },
          { code: 'EZCARAY', name: 'Ezcaray' },
          { code: 'AUTOL', name: 'Autol' }
        ]
      },
      { code: 'MU', name: 'Murcia',
        cities: [
          { code: 'MURCIA', name: 'Murcia' },
          { code: 'CARTAGENA', name: 'Cartagena' },
          { code: 'LORCA', name: 'Lorca' },
          { code: 'MOLINA', name: 'Molina de Segura' },
          { code: 'CARAVACA', name: 'Caravaca de la Cruz' },
          { code: 'YECLA', name: 'Yecla' },
          { code: 'ALCANTARILLA', name: 'Alcantarilla' },
          { code: 'CEHEGIN', name: 'Cehegín' },
          { code: 'AGUILAS', name: 'Águilas' },
          { code: 'SAN', name: 'San Javier' }
        ]
      },
      { code: 'IB', name: 'Balearic Islands',
        cities: [
          { code: 'PALMA', name: 'Palma' },
          { code: 'IBIZA', name: 'Ibiza' },
          { code: 'MANACOR', name: 'Manacor' },
          { code: 'MAHON', name: 'Mahón' },
          { code: 'INCA', name: 'Inca' },
          { code: 'SANT', name: 'Sant Josep de sa Talaia' },
          { code: 'SANT2', name: 'Sant Antoni de Portmany' },
          { code: 'CIUDADELA', name: 'Ciutadella de Menorca' },
          { code: 'CALVIA', name: 'Calvià' },
          { code: 'LLUCMAJOR', name: 'Llucmajor' }
        ]
      },
      { code: 'CN', name: 'Canary Islands',
        cities: [
          { code: 'LAS', name: 'Las Palmas de Gran Canaria' },
          { code: 'SANTA', name: 'Santa Cruz de Tenerife' },
          { code: 'SAN', name: 'San Cristóbal de La Laguna' },
          { code: 'TELDE', name: 'Telde' },
          { code: 'ARONA', name: 'Arona' },
          { code: 'ARRECIFE', name: 'Arrecife' },
          { code: 'SAN2', name: 'San Bartolomé de Tirajana' },
          { code: 'LA', name: 'La Orotava' },
          { code: 'PUERTO', name: 'Puerto del Rosario' },
          { code: 'SAN3', name: 'San Sebastián de La Gomera' }
        ]
      },
      { code: 'AS', name: 'Asturias',
        cities: [
          { code: 'OVIEDO', name: 'Oviedo' },
          { code: 'GIJON', name: 'Gijón' },
          { code: 'AVILES', name: 'Avilés' },
          { code: 'SAMA', name: 'Sama' },
          { code: 'LANGREO', name: 'Langreo' },
          { code: 'MIERES', name: 'Mieres' },
          { code: 'CUDILLERO', name: 'Cudillero' },
          { code: 'CANGAS', name: 'Cangas de Onís' },
          { code: 'LLANES', name: 'Llanes' },
          { code: 'POLA', name: 'Pola de Laviana' }
        ]
      },
      { code: 'CB', name: 'Cantabria',
        cities: [
          { code: 'SANTANDER', name: 'Santander' },
          { code: 'TORRELAVEGA', name: 'Torrelavega' },
          { code: 'CAMARGO', name: 'Camargo' },
          { code: 'CASTRO', name: 'Castro-Urdiales' },
          { code: 'LAREDO', name: 'Laredo' },
          { code: 'PIELAGOS', name: 'Piélagos' },
          { code: 'SANTOÑA', name: 'Santoña' },
          { code: 'EL', name: 'El Astillero' },
          { code: 'REINOSA', name: 'Reinosa' },
          { code: 'CABRERIZAS', name: 'Cabrérizas' }
        ]
      },
      { code: 'EX', name: 'Extremadura',
        cities: [
          { code: 'BADAJOZ', name: 'Badajoz' },
          { code: 'CACERES', name: 'Cáceres' },
          { code: 'MÉRIDA', name: 'Mérida' },
          { code: 'PLASENCIA', name: 'Plasencia' },
          { code: 'ALMENDRALEJO', name: 'Almendralejo' },
          { code: 'DON BENITO', name: 'Don Benito' },
          { code: 'VILLANUEVA', name: 'Villanueva de la Serena' },
          { code: 'NAVALMORAL', name: 'Navalmoral de la Mata' },
          { code: 'CORIA', name: 'Coria' },
          { code: 'ZAFRA', name: 'Zafra' }
        ]
      },
      { code: 'NC', name: 'Navarre',
        cities: [
          { code: 'PAMPLONA', name: 'Pamplona' },
          { code: 'TUDELA', name: 'Tudela' },
          { code: 'BARAÑAIN', name: 'Barañáin' },
          { code: 'BERGARA', name: 'Bergara' },
          { code: 'ESTELLA', name: 'Estella' },
          { code: 'TAFALLA', name: 'Tafalla' },
          { code: 'ELIZONDO', name: 'Elizondo' },
          { code: 'SANGÜESA', name: 'Sangüesa' },
          { code: 'VILLAVA', name: 'Villava' },
          { code: 'BURGUI', name: 'Burgui' }
        ]
      }
    ]
};

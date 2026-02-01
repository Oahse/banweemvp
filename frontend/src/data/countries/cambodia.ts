/**
 * Cambodia country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const cambodia: Country = {
    code: 'KH',
    name: 'Cambodia',
    taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'KHR', region: 'APAC' },
    provinces: [
      { code: 'PNH', name: 'Phnom Penh',
        cities: [
          { code: 'PHNOMPENH', name: 'Phnom Penh' },
          { code: 'TAKHMAU', name: 'Takhmau' },
          { code: 'KANDAL', name: 'Kandal' },
          { code: 'MEAN', name: 'Mean Chey' },
          { code: 'CHBAR', name: 'Chbar Mon' },
          { code: 'PURSAT', name: 'Pursat' },
          { code: 'TAKHMAU2', name: 'Takhmau' },
          { code: 'KANDAL2', name: 'Kandal' },
          { code: 'MEAN2', name: 'Mean Chey' },
          { code: 'CHBAR2', name: 'Chbar Mon' }
        ]
      },
      { code: 'SRP', name: 'Siem Reap',
        cities: [
          { code: 'SIEMREAP', name: 'Siem Reap' },
          { code: 'POIPET', name: 'Poipet' },
          { code: 'SOTHI', name: 'Sotnikum' },
          { code: 'BANTEAY', name: 'Banteay Srei' },
          { code: 'BANTEAY2', name: 'Banteay Chhmar' },
          { code: 'ANGKOR', name: 'Angkor' },
          { code: 'BAYON', name: 'Bayon' },
          { code: 'TA', name: 'Ta Prohm' },
          { code: 'PREAH', name: 'Preah Vihear' },
          { code: 'KULEN', name: 'Kulen' }
        ]
      },
      { code: 'KPC', name: 'Kampong Cham',
        cities: [
          { code: 'KAMPONG', name: 'Kampong Cham' },
          { code: 'SVAY', name: 'Svay Rieng' },
          { code: 'PREY', name: 'Prey Veng' },
          { code: 'TAKHEM', name: 'Takheam' },
          { code: 'KAMPONG2', name: 'Kampong Cham' },
          { code: 'SVAY2', name: 'Svay Rieng' },
          { code: 'PREY2', name: 'Prey Veng' },
          { code: 'TAKHEM2', name: 'Takheam' },
          { code: 'KAMPONG3', name: 'Kampong Cham' },
          { code: 'SVAY3', name: 'Svay Rieng' }
        ]
      },
      { code: 'KPT', name: 'Kampong Thom',
        cities: [
          { code: 'KAMPONG', name: 'Kampong Thom' },
          { code: 'STUNG', name: 'Stung Treng' },
          { code: 'PREY', name: 'Preah Vihear' },
          { code: 'SIEM', name: 'Siem Reap' },
          { code: 'KAMPONG2', name: 'Kampong Thom' },
          { code: 'STUNG2', name: 'Stung Treng' },
          { code: 'PREY2', name: 'Prey Vihear' },
          { code: 'SIEM2', name: 'Siem Reap' },
          { code: 'KAMPONG3', name: 'Kampong Thom' },
          { code: 'STUNG3', name: 'Stung Treng' }
        ]
      },
      { code: 'KBT', name: 'Kampong Speu',
        cities: [
          { code: 'KAMPONG', name: 'Kampong Speu' },
          { code: 'PURSAT', name: 'Pursat' },
          { code: 'KOH', name: 'Koh Kong' },
          { code: 'KAMPONG2', name: 'Kampong Speu' },
          { code: 'PURSAT2', name: 'Pursat' },
          { code: 'KOH2', name: 'Koh Kong' },
          { code: 'KAMPONG3', name: 'Kampong Speu' },
          { code: 'PURSAT3', name: 'Pursat' },
          { code: 'KOH3', name: 'Koh Kong' }
        ]
      },
      { code: 'KBL', name: 'Kep',
        cities: [
          { code: 'KEP', name: 'Kep' },
          { code: 'KAMPOT', name: 'Kampot' },
          { code: 'KEP2', name: 'Kep' },
          { code: 'KAMPOT2', name: 'Kampot' },
          { code: 'KEP3', name: 'Kep' },
          { code: 'KAMPOT3', name: 'Kampot' },
          { code: 'KEP4', name: 'Kep' },
          { code: 'KAMPOT4', name: 'Kampot' },
          { code: 'KEP5', name: 'Kep' }
        ]
      },
      { code: 'KCH', name: 'Koh Kong',
        cities: [
          { code: 'KOH', name: 'Koh Kong' },
          { code: 'Sihanoukville', name: 'Sihanoukville' },
          { code: 'KAMPOT', name: 'Kampot' },
          { code: 'KOH2', name: 'Koh Kong' },
          { code: 'SIHANOUKVILLE', name: 'Sihanoukville' },
          { code: 'KAMPOT2', name: 'Kampot' },
          { code: 'KOH3', name: 'Koh Kong' },
          { code: 'SIHANOUKVILLE2', name: 'Sihanoukville' },
          { code: 'KAMPOT3', name: 'Kampot' },
          { code: 'KOH4', name: 'Koh Kong' }
        ]
      },
      { code: 'PENH', name: 'Pursat',
        cities: [
          { code: 'PURSAT', name: 'Pursat' },
          { code: 'KAMPONG', name: 'Kampong Speu' },
          { code: 'KOH', name: 'Koh Kong' },
          { code: 'PURSAT2', name: 'Pursat' },
          { code: 'KAMPONG2', name: 'Kampong Speu' },
          { code: 'KOH2', name: 'Koh Kong' },
          { code: 'PURSAT3', name: 'Pursat' },
          { code: 'KAMPONG3', name: 'Kampong Speu' },
          { code: 'KOH3', name: 'Koh Kong' },
          { code: 'PURSAT4', name: 'Pursat' }
        ]
      },
      { code: 'BAT', name: 'Battambang',
        cities: [
          { code: 'BATTAMBANG', name: 'Battambang' },
          { code: 'POIPET', name: 'Poipet' },
          { code: 'BANTEAY', name: 'Banteay Meanchey' },
          { code: 'PAILIN', name: 'Pailin' },
          { code: 'BATTAMBANG2', name: 'Battambang' },
          { code: 'POIPET2', name: 'Poipet' },
          { code: 'BANTEAY2', name: 'Banteay Meanchey' },
          { code: 'PAILIN2', name: 'Pailin' },
          { code: 'BATTAMBANG3', name: 'Battambang' },
          { code: 'POIPET3', name: 'Poipet' }
        ]
      },
      { code: 'PTE', name: 'Pailin',
        cities: [
          { code: 'PAILIN', name: 'Pailin' },
          { code: 'BATTAMBANG', name: 'Battambang' },
          { code: 'POIPET', name: 'Poipet' },
          { code: 'BANTEAY', name: 'Banteay Meanchey' },
          { code: 'PAILIN2', name: 'Pailin' },
          { code: 'BATTAMBANG2', name: 'Battambang' },
          { code: 'POIPET2', name: 'Poipet' },
          { code: 'BANTEAY2', name: 'Banteay Meanchey' },
          { code: 'PAILIN3', name: 'Pailin' },
          { code: 'BATTAMBANG3', name: 'Battambang' }
        ]
      },
      { code: 'BMC', name: 'Banteay Meanchey',
        cities: [
          { code: 'BANTEAY', name: 'Banteay Meanchey' },
          { code: 'SIEM', name: 'Siem Reap' },
          { code: 'POIPET', name: 'Poipet' },
          { code: 'BATTAMBANG', name: 'Battambang' },
          { code: 'PAILIN', name: 'Pailin' },
          { code: 'BANTEAY2', name: 'Banteay Meanchey' },
          { code: 'SIEM2', name: 'Siem Reap' },
          { code: 'POIPET2', name: 'Poipet' },
          { code: 'BATTAMBANG2', name: 'Battambang' },
          { code: 'PAILIN2', name: 'Pailin' }
        ]
      },
      { code: 'PREY', name: 'Prey Veng',
        cities: [
          { code: 'PREY', name: 'Prey Veng' },
          { code: 'SVAY', name: 'Svay Rieng' },
          { code: 'TAKHMAU', name: 'Takhmau' },
          { code: 'KAMPONG', name: 'Kampong Cham' },
          { code: 'PREY2', name: 'Prey Veng' },
          { code: 'SVAY2', name: 'Svay Rieng' },
          { code: 'TAKHMAU2', name: 'Takhmau' },
          { code: 'KAMPONG2', name: 'Kampong Cham' },
          { code: 'PREY3', name: 'Prey Veng' },
          { code: 'SVAY3', name: 'Svay Rieng' }
        ]
      },
      { code: 'RAT', name: 'Ratanakiri',
        cities: [
          { code: 'RATANAKIRI', name: 'Ratanakiri' },
          { code: 'BANLUNG', name: 'Banlung' },
          { code: 'STUNG', name: 'Stung Treng' },
          { code: 'VEAL', name: 'Veal Veng' },
          { code: 'KOH', name: 'Koh Kong' },
          { code: 'RATANAKIRI2', name: 'Ratanakiri' },
          { code: 'BANLUNG2', name: 'Banlung' },
          { code: 'STUNG2', name: 'Stung Treng' },
          { code: 'VEAL2', name: 'Veal Veng' },
          { code: 'KOH2', name: 'Koh Kong' }
        ]
      },
      { code: 'STG', name: 'Stung Treng',
        cities: [
          { code: 'STUNG', name: 'Stung Treng' },
          { code: 'THALA', name: 'Thala Barivat' },
          { code: 'STUNG2', name: 'Stung Treng' },
          { code: 'THALA2', name: 'Thala Barivat' },
          { code: 'STUNG3', name: 'Stung Treng' },
          { code: 'THALA3', name: 'Thala Barivat' },
          { code: 'STUNG4', name: 'Stung Treng' },
          { code: 'THALA4', name: 'Thala Barivat' },
          { code: 'STUNG5', name: 'Stung Treng' },
          { code: 'THALA5', name: 'Thala Barivat' }
        ]
      },
      { code: 'TAK', name: 'Takéo',
        cities: [
          { code: 'TAKHEM', name: 'Takéo' },
          { code: 'PREY', name: 'Prey Vihear' },
          { code: 'SIEM', name: 'Siem Reap' },
          { code: 'KAMPONG', name: 'Kampong Thom' },
          { code: 'TAKHEM2', name: 'Takéo' },
          { code: 'PREY2', name: 'Prey Vihear' },
          { code: 'SIEM2', name: 'Siem Reap' },
          { code: 'KAMPONG2', name: 'Kampong Thom' },
          { code: 'TAKHEM3', name: 'Takéo' },
          { code: 'PREY3', name: 'Prey Vihear' }
        ]
      },
      { code: 'SOT', name: 'Sihanoukville',
        cities: [
          { code: 'SIHANOUKVILLE', name: 'Sihanoukville' },
          { code: 'KOH', name: 'Koh Kong' },
          { code: 'KAMPOT', name: 'Kampot' },
          { code: 'KEP', name: 'Kep' },
          { code: 'SIHANOUKVILLE2', name: 'Sihanoukville' },
          { code: 'KOH2', name: 'Koh Kong' },
          { code: 'KAMPOT2', name: 'Kampot' },
          { code: 'KEP2', name: 'Kep' },
          { code: 'SIHANOUKVILLE3', name: 'Sihanoukville' },
          { code: 'KOH3', name: 'Koh Kong' }
        ]
      },
      { code: 'SVY', name: 'Svay Rieng',
        cities: [
          { code: 'SVAY', name: 'Svay Rieng' },
          { code: 'PREY', name: 'Prey Veng' },
          { code: 'TAKHMAU', name: 'Takhmau' },
          { code: 'KAMPONG', name: 'Kampong Cham' },
          { code: 'SVAY2', name: 'Svay Rieng' },
          { code: 'PREY2', name: 'Prey Veng' },
          { code: 'TAKHMAU2', name: 'Takhmau' },
          { code: 'KAMPONG2', name: 'Kampong Cham' },
          { code: 'PREY3', name: 'Prey Veng' },
          { code: 'SVAY3', name: 'Svay Rieng' }
        ]
      }
    ]
};

import flower from './Item_Tiny_Miracle\'s_Flower.png'
import plume from './Item_Tiny_Miracle\'s_Feather.png'
import sands from './Item_Tiny_Miracle\'s_Hourglass.png'
import goblet from './Item_Tiny_Miracle\'s_Goblet.png'
import circlet from './Item_Tiny_Miracle\'s_Earrings.png'
import { IArtifactSheet } from '../../../Types/artifact'
import { IConditionals } from '../../../Types/IConditional'
const conditionals: IConditionals = {
  4: {
    name: "Incoming DMG",
    states: {
      anemo: {
        name: <span className="text-anemo">Anemo</span>,
        stats: { anemo_res_: 30 }//TODO: party conditional
      },
      geo: {
        name: <span className="text-geo">Geo</span>,
        stats: { geo_res_: 30 }//TODO: party conditional
      },
      electro: {
        name: <span className="text-electro">Electro</span>,
        stats: { electro_res_: 30 }//TODO: party conditional
      },
      hydro: {
        name: <span className="text-hydro">Hydro</span>,
        stats: { hydro_res_: 30 }//TODO: party conditional
      },
      pyro: {
        name: <span className="text-pyro">Pyro</span>,
        stats: { pyro_res_: 30 }//TODO: party conditional
      },
      cryo: {
        name: <span className="text-cryo">Cryo</span>,
        stats: { cryo_res_: 30 }//TODO: party conditional
      }
    },
    fields: [{
      text: "CD",
      value: "10s"
    }]
  }

}
const artifact: IArtifactSheet = {
  name: "Tiny Miracle", rarity: [3, 4],
  icons: {
    flower,
    plume,
    sands,
    goblet,
    circlet
  },
  conditionals,
  setEffects: {
    2: {
      stats: {
        anemo_res_: 20,
        geo_res_: 20,
        electro_res_: 20,
        hydro_res_: 20,
        pyro_res_: 20,
        cryo_res_: 20,
      }
    },
    4: {
      document: [{
        conditional: conditionals[4]
      }]
    }
  }
}
export default artifact
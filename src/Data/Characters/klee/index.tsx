import card from './Character_Klee_Card.jpg'
import thumb from './Character_Klee_Thumb.png'
import c1 from './Constellation_Chained_Reactions.png'
import c2 from './Constellation_Explosive_Frags.png'
import c3 from './Constellation_Exquisite_Compound.png'
import c4 from './Constellation_Sparkly_Explosion.png'
import c5 from './Constellation_Nova_Burst.png'
import c6 from './Constellation_Blazing_Delight.png'
import normal from './Talent_Kaboom.png'
import skill from './Talent_Jumpy_Dumpty.png'
import burst from './Talent_Sparks_\'n\'_Splash.png'
import passive1 from './Talent_Pounding_Surprise.png'
import passive2 from './Talent_Sparkling_Burst.png'
import passive3 from './Talent_All_Of_My_Treasures.png'
import Stat from '../../../Stat'
import formula, { data } from './data'
import data_gen from './data_gen.json'
import { getTalentStatKey, getTalentStatKeyVariant } from '../../../Build/Build'
import { ICharacterSheet } from '../../../Types/character'
import { IConditionals } from '../../../Types/IConditional'
import { Translate } from '../../../Components/Translate'
import { WeaponTypeKey } from '../../../Types/consts'
const tr = (strKey: string) => <Translate ns="char_klee_gen" key18={strKey} />
const conditionals: IConditionals = {
  a1: { // PoundingSurprise
    canShow: stats => stats.ascension >= 1,
    name: "has Explosive Spark",
    stats: { charged_dmg_: 50 },
    fields: [{ text: "Next Charged attack cost no stamina" }]
  },
  c2: { // ExplosiveFrags
    canShow: stats => stats.constellation >= 2,
    name: "Hit by Jumpy Dumpty's mines",
    stats: { enemyDEFRed_: 23 },
    fields: [{
      text: "Duration",
      value: "10s",
    }]
  },
  c6: { // BlazingDelight
    canShow: stats => stats.constellation >= 6,
    name: "Sparks 'n' Splash is used",
    stats: { pyro_dmg_: 10 }//TODO: party buff
  }
}
const char: ICharacterSheet = {
  name: tr("name"),
  cardImg: card,
  thumbImg: thumb,
  star: data_gen.star,
  elementKey: "pyro",
  weaponTypeKey: data_gen.weaponTypeKey as WeaponTypeKey,
  gender: "F",
  constellationName: tr("constellationName"),
  title: tr("title"),
  baseStat: data_gen.base,
  baseStatCurve: data_gen.curves,
  ascensions: data_gen.ascensions,
  talent: {
    formula,
    conditionals,
    sheets: {
      auto: {
        name: tr("auto.name"),
        img: normal,
        sections: [{
          text: <span><strong>Normal Attack</strong> Throws things that go boom when they hit things! Perform up to 3 explosive attacks, dealing <span className="text-pyro">AoE Pyro DMG</span>.</span>,
          fields: data.normal.hitArr.map((percentArr, i) =>
          ({
            text: `${i + 1}-Hit DMG`,
            formulaText: stats => <span>{percentArr[stats.tlvl.auto]}% {Stat.printStat(getTalentStatKey("normal", stats), stats)}</span>,
            formula: formula.normal[i],
            variant: stats => getTalentStatKeyVariant("normal", stats),
          }))
        }, {
          text: <span><strong>Charged Attack</strong> Consumes a certain amount of Stamina and deals <span className="text-pyro">AoE Pyro DMG</span> to opponents after a short casting time.</span>,
          fields: [{
            text: `Charged Attack DMG`,
            formulaText: stats => <span>{data.charged.dmg[stats.tlvl.auto]}% {Stat.printStat(getTalentStatKey("charged", stats), stats)}</span>,
            formula: formula.charged.dmg,
            variant: stats => getTalentStatKeyVariant("charged", stats),
          }, {
            text: `Stamina Cost`,
            value: 50,
          }],
        }, {
          text: <span><strong>Plunging Attack</strong> Gathering the power of <span className="text-pyro">Pyro</span>, Klee plunges towards the ground from mid-air, damaging all opponents in her path. Deals <span className="text-pyro">AoE Pyro DMG</span> upon impact with the ground.</span>,
          fields: [{
            text: `Plunge DMG`,
            formulaText: stats => <span>{data.plunging.dmg[stats.tlvl.auto]}% {Stat.printStat(getTalentStatKey("plunging", stats), stats)}</span>,
            formula: formula.plunging.dmg,
            variant: stats => getTalentStatKeyVariant("plunging", stats),
          }, {
            text: `Low Plunge DMG`,
            formulaText: stats => <span>{data.plunging.low[stats.tlvl.auto]}% {Stat.printStat(getTalentStatKey("plunging", stats), stats)}</span>,
            formula: formula.plunging.low,
            variant: stats => getTalentStatKeyVariant("plunging", stats),
          }, {
            text: `High Plunge DMG`,
            formulaText: stats => <span>{data.plunging.high[stats.tlvl.auto]}% {Stat.printStat(getTalentStatKey("plunging", stats), stats)}</span>,
            formula: formula.plunging.high,
            variant: stats => getTalentStatKeyVariant("plunging", stats),
          }]
        }],
      },
      skill: {
        name: tr("skill.name"),
        img: skill,
        sections: [{
          text: tr("skill.description"),
          fields: [{
            text: "Jumpy Dumpty DMG",
            formulaText: stats => <span>{data.skill.jumpyDmg[stats.tlvl.skill]}% {Stat.printStat(getTalentStatKey("skill", stats), stats)}</span>,
            formula: formula.skill.jumpyDmg,
            variant: stats => getTalentStatKeyVariant("skill", stats),
          }, {
            text: "Mine DMG",
            formulaText: stats => <span>{data.skill.mineDmg[stats.tlvl.skill]}% {Stat.printStat(getTalentStatKey("skill", stats), stats)}</span>,
            formula: formula.skill.mineDmg,
            variant: stats => getTalentStatKeyVariant("skill", stats),
          }, {
            text: "Mine Duration",
            value: "15s",
          }, {
            text: "CD",
            value: "20s",
          }]
        }],
      },
      burst: {
        name: tr("burst.name"),
        img: burst,
        sections: [{
          text: tr("burst.description"),
          fields: [{
            text: "Sparks 'n' Splash DMG",
            formulaText: stats => <span>{data.burst.dmg[stats.tlvl.burst]}% {Stat.printStat(getTalentStatKey("burst", stats), stats)}</span>,
            formula: formula.burst.dmg,
            variant: stats => getTalentStatKeyVariant("burst", stats),
          }, {
            text: "Duration",
            value: "10s",
          }, {
            text: "CD",
            value: "15s",
          }, {
            text: "Energy Cost",
            value: 60,
          }]
        }],
      },
      passive1: {
        name: "Pounding Surprise",
        img: passive1,
        sections: [{
          text: <span>When <b>Jumpy Dumpty</b> and <b>Normal Attacks</b> deal DMG, Klee has a 50% chance to obtain an Explosive Spark. This Explosive Spark is consumed by the next Charged Attack, which costs no Stamina and deals 50% increased DMG.</span>,
          conditional: conditionals.a1
        }],
      },
      passive2: {
        name: "Sparkling Burst",
        img: passive2,
        sections: [{ text: <span>When Klee's <b>Charged Attack</b> results in a CRIT, all party members gain 2 Elemental Energy.</span> }],//TODO: party buff
      },
      passive3: {
        name: "All Of My Treasures!",
        img: passive3,
        sections: [{ text: <span>Displays the location of nearby resources unique to Mondstadt on the mini-map.</span> }],
      },
      constellation1: {
        name: "Chained Reactions",
        img: c1,
        sections: [{
          text: <span>Attacks and Skills have a certain chance to summon sparks that bombard opponents, dealing DMG equal to 120% of Sparks 'n' Splash's DMG.</span>,
          fields: [{
            canShow: stats => stats.constellation >= 1,
            text: "Chained Reactions DMG",
            formulaText: stats => <span>120% x {data.burst.dmg[stats.tlvl.burst]}% {Stat.printStat(getTalentStatKey("burst", stats), stats)}</span>,
            formula: formula.constellation1.dmg,
            variant: stats => getTalentStatKeyVariant("burst", stats),
          },]
        }],
      },
      constellation2: {
        name: "Explosive Frags",
        img: c2,
        sections: [{
          text: <span>Being hit by <b>Jumpy Dumpty</b>'s mines decreases opponents' DEF by 23% for 10s.</span>,
          conditional: conditionals.c2
        }],
      },
      constellation3: {
        name: "Exquisite Compound",
        img: c3,
        sections: [{ text: <span>Increases the level of <b>Jumpy Dumpty</b> by 3. Maximum level is 15.</span> }],
        stats: { skillBoost: 3 }
      },
      constellation4: {
        name: "Sparkly Explosion",
        img: c4,
        sections: [{
          text: <span>If Klee leaves the field during the duration of <b>Sparks 'n' Splash</b>, her departure triggers an explosion that deals 555% of her ATK as <span className="text-pyro">AoE Pyro DMG</span>.</span>,
          fields: [{
            text: "Sparkly Explosion DMG",
            formulaText: stats => <span>555% {Stat.printStat(getTalentStatKey("elemental", stats), stats)}</span>,
            formula: formula.constellation4.dmg,
            variant: stats => getTalentStatKeyVariant("elemental", stats),
          }]
        }],
      },
      constellation5: {
        name: "Nova Burst",
        img: c5,
        sections: [{ text: <span>Increases the level of <b>Sparks 'n' Splash</b> by 3. Maximum level is 15.</span> }],
        stats: { burstBoost: 3 }
      },
      constellation6: {
        name: "Blazing Delight",
        img: c6,
        sections: [{
          text: <span>
            <p className="mb-2">While under the effects of <b>Sparks 'n' Splash</b>, other members of the party will continuously regenerate Energy.</p>
            <p className="mb-0">When <b>Sparks 'n' Splash</b> is used, all party members will gain a 10% <span className="text-pyro">Pyro DMG Bonus</span> for 25s.</p>
          </span>,
          conditional: conditionals.c6
        }],
      }
    },
  },
};
export default char;

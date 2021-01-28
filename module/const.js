/**
 * Condition Manager.
 *
 *      ./module/const.js
 *      v0.0.2
 */

/**
* console colors.
*/

export const CONSOLE_GREY    = "#F0F0F0";
export const CONSOLE_RED     = "#C46C4B";  // D64100
export const CONSOLE_GREEN   = "#4BC470";
export const CONSOLE_BLUE    = "#4B73C4";
export const CONSOLE_DEFAULT = CONSOLE_GREY;

/**
* modules and versions.
*/

export const MIN_FOUNDRY_VERSION             = "0.7.9";
export const MIN_DND5E_VERSION               = "1.2.0";
export const MIN_COMBAT_UTILITY_BELT_VERSION = "1.3.8";
export const COMBAT_UTILITY_BELT_MODULE_NAME = "combat-utility-belt";
export const CF_MODULE_NAME                  = "condition-manager";
export const CF_NAME                         = "CONDITION MANAGER";
export const CF_LABEL                        = "cmgr";
export const CF_VERSION                      = "0.0.1";

/**
* options.
*/

export const CF_ENABLED                      = "enabled";

/**
* effect attribute change modes.
*/

export const MODE_CUSTOM           = 0;
export const MODE_MULTIPLY         = 1;
export const MODE_ADD              = 2;
export const MODE_DOWNGRADE        = 3;
export const MODE_UPGRADE          = 4;
export const MODE_OVERRIDE         = 5;

/**
* effect attribute indexes.
*/

export const CHANGE_MODE           = 0;
export const ATTRIBUTE_VALUE       = 1;
export const PRIORITY              = 2;

/**
* flag index.
*/

export const CORE_STATUS_ID        = 0;
export const CUB_CONDITION_ID      = 1;
export const CUB_OVERLAY           = 2;
export const DAE_SPECIAL_DURATION  = 3;

/**
* duration index.
*/

export const SECONDS               = 0;
export const START_TIME            = 1;
export const TURNS                 = 2;
export const START_TURN            = 3;
export const ROUNDS                = 4;
export const START_ROUND           = 5;

/**
* detail index.
*/

export const DISABLED              = 0;
export const ICON                  = 1;
export const ORIGIN                = 2;
export const TINT                  = 3;
export const TRANSFER              = 4;
export const ADDITIONAL_HITS       = 5;

/**
* table type index.
*/

export const CRITICAL              = 0;
export const FUMBLE                = 1;

/**
* dae special duration values.
*/

export const ONE_ACTION_STR        = "1Action";
export const ONE_ATTACK_STR        = "1Attack";
export const ONE_HIT_STR           = "1Hit";
export const TURN_START_STR        = "turnStart";
export const TURN_END_STR          = "turnEnd";
export const IS_ATTACKED_STR       = "isAttacked";
export const IS_DAMAGED_STR        = "isDamaged";

/**
* effect keys.
*/

export const ATTRIBUTE_ATTACKER_ADV_ALL_KEY		= "flags.midi-qol.grants.advantage.attack.all";		// blinded, paralyzed, petrified, restrained, stunned, unconscious.
export const ATTRIBUTE_DISADV_ATT_ALL_KEY  		= "flags.midi-qol.disadvantage.attack.all";			// blinded, poisoned, restrained.
export const ATTRIBUTE_DISADV_ABIL_CHK_ALL_KEY  = "flags.midi-qol.disadvantage.ability.check.all"; 	// exhaustion 1, 3 & 5.
export const ATTRIBUTE_MOVEMENT_KEY        		= "data.attributes.movement.walk";				    // exhaustion 2, grappled, incapacited, paralyzed, petrified, restrained, stunned, unconscious.
export const ATTRIBUTE_DISADV_SAVE_ALL_KEY 		= "flags.midi-qol.disadvantage.ability.save.all";	// exhaustion 3.
export const ATTRIBUTE_HP_MAX              		= "data.attributes.hp.max";							// exhaustion 4.
export const ATTRIBUTE_ADV_ATT_ALL_KEY     		= "flags.midi-qol.advantage.attack.all";			// invisible.
export const ATTRIBUTE_ATTACKER_DISADV_ALL_KEY	= "flags.midi-qol.grants.disadvantage.attack.all";	// invisible.
export const ATTRIBUTE_TRAITS_ALL_KEY      		= "data.traits.dr.all";								// petrified.
export const ATTRIBUTE_DISADV_ABIL_ALL_KEY 		= "flags.midi-qol.disadvantage.ability.all";		// poisoned.
export const ATTRIBUTE_ATTACKER_ADV_MWAK_KEY 	= "flags.midi-qol.grants.advantage.attack.mwak";   	// prone.
export const ATTRIBUTE_ATTACKER_DISADV_RWAK_KEY = "flags.midi-qol.grants.disadvantage.attack.rwak";	// prone.
export const ATTRIBUTE_ATTACKER_ADV_MSAK_KEY 	= "flags.midi-qol.grants.advantage.attack.msak";   	// prone.
export const ATTRIBUTE_ATTACKER_DISADV_RSAK_KEY = "flags.midi-qol.grants.disadvantage.attack.rsak";	// prone.
export const ATTRIBUTE_DISADV_SAVE_DEX  		= "flags.midi-qol.disadvantage.ability.save.dex";	// restrained.
export const ATTRIBUTE_AC_KEY  					= "data.attributes.ac.value";						// 1/2 & 3/4 cover.
export const ATTRIBUTE_DEX_SAVE_KEY  			= "data.abilities.dex.save";						// 1/2 & 3/4 cover.
export const ATTRIBUTE_BONUS_MWAK_ATT_KEY  		= "data.bonuses.mwak.attack";						// flank & rear.
export const ATTRIBUTE_BONUS_RWAK_ATT_KEY  		= "data.bonuses.rwak.attack";						// flank & rear.
export const ATTRIBUTE_BONUS_MSAK_ATT_KEY  		= "data.bonuses.msak.attack";						// flank & rear.
export const ATTRIBUTE_BONUS_RSAK_ATT_KEY  		= "data.bonuses.rsak.attack";						// flank & rear.
export const ATTRIBUTE_HP_KEY              		= "data.attributes.hp.value";						// bleeding.
export const ATTRIBUTE_MACRO_EXECUTE_KEY   		= "macro.execute";									// dead.

/**
* condition labels.
*/

export const BLEEDING_LABEL        = "Bleeding";
export const BLINDED_LABEL         = "Blinded";
export const CHARMED_LABEL         = "Charmed";
export const CONCENTRATING_LABEL   = "Concentrating";
export const DEAFENED_LABEL        = "Deafened";
export const EXHAUSTION_1_LABEL    = "Exhaustion 1";
export const EXHAUSTION_2_LABEL    = "Exhaustion 2";
export const EXHAUSTION_3_LABEL    = "Exhaustion 3";
export const EXHAUSTION_4_LABEL    = "Exhaustion 4";
export const EXHAUSTION_5_LABEL    = "Exhaustion 5";
export const FRIGHTENED_LABEL      = "Frightened";
export const GRAPPLED_LABEL        = "Grappled";
export const INCAPACITATED_LABEL   = "Incapacitated";
export const INVISIBLE_LABEL       = "Invisible";
export const PARALYZED_LABEL       = "Paralyzed";
export const PETRIFIED_LABEL       = "Petrified";
export const POISONED_LABEL        = "Poisoned";
export const PRONE_LABEL           = "Prone";
export const RESTRAINED_LABEL      = "Restrained";
export const STUNNED_LABEL         = "Stunned";
export const UNCONSCIOUS_LABEL     = "Unconscious";

/**
* damage type strings.
*/

export const ACID_STR              = "Acid"
export const BLUDGEONING_STR       = "Bludgeoning";
export const COLD_STR              = "Cold";
export const FIRE_STR              = "Fire";
export const FORCE_STR             = "Force";
export const LIGHTNING_STR         = "Lightning";
export const NECROTIC_STR          = "Necrotic";
export const PIERCING_STR          = "Piercing";
export const POISON_STR            = "Poison";
export const PSYCHIC_STR           = "Psychic";
export const RADIANT_STR           = "Radiant";
export const SLASHING_STR          = "Slashing";
export const THUNDER_STR           = "Thunder";

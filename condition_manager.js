/**
 * Condition Manager.
 *
 *      ./condition_manager.js
 *      v0.0.3
 */

import * as CM_CONST from "./module/const.js";
import { ConditionManager } from "./module/conditions.js";

console.info(String(CM_CONST.CM_LABEL + " | %c" + CM_CONST.CM_NAME + "%c v" + CM_CONST.CM_VERSION + "."), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);

var i18n    = key => {return game.i18n.localize(key);};

/**
* versionCompare().
*
* Compares two software version numbers (e.g. "1.7.1" or "1.2b").
*
*      v1       {string} v1 The first version to be compared.
*      v2       {string} v2 The second version to be compared.
*      options {object} Optional flags that affect comparison behavior.
*           lexicographical: true
*               Compares each part of the version strings lexicographically instead of naturally;
*               this allows suffixes such as "b" or "dev" but will cause "1.10" to be considered smaller than "1.2".
*         zeroExtend: true
*               Changes the result if one version string has less parts than the other.
*               In this case the shorter string will be padded with "zero" parts instead of being considered smaller.
*       return  (number) 1 if v1 is greater than v2.
*                        0 if the versions are equal.
*                       -1 if v1 is less than v2.
*/

function versionCompare(v1, v2, options) {
    var lexicographical = options && options.lexicographical,
        zeroExtend = options && options.zeroExtend,
        v1parts = v1.split('.'),
        v2parts = v2.split('.');

    function isValidPart(x) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    if (zeroExtend) {
        while (v1parts.length < v2parts.length) v1parts.push("0");
        while (v2parts.length < v1parts.length) v2parts.push("0");
    }

    if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 1;
        }

        if (v1parts[i] == v2parts[i]) {
            continue;
        }
        else if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        else {
            return -1;
        }
    }

    if (v1parts.length != v2parts.length) {
        return -1;
    }

    return 0;
}

/**
* checkRequirements().
*
* Check module dependencies, versions and settings.
*/

function checkRequirements() {
    // ----------------------------------------------------------
    // Foundry.

    // minimum Foundry version.
    if (versionCompare(game.data.version, CM_CONST.MIN_FOUNDRY_VERSION) < 0) {
        ui.notifications.error(i18n("cf.failed_to_initialize"));
        console.error(CM_CONST.CM_LABEL + " | FAIL: Foundry v" + CM_CONST.MIN_FOUNDRY_VERSION + " or newer required.");
        return false;
    };

    // ----------------------------------------------------------
    // System dnd5e.

    if (game.data.system.data.name != "dnd5e") {
        ui.notifications.error(i18n("cf.failed_to_initialize"));
        console.error(CM_CONST.CM_LABEL + " | FAIL: DND5E system not found.");
        return false;
    };
    // minimum dnd5e version.
    if (versionCompare(game.data.system.data.version, CM_CONST.MIN_DND5E_VERSION) < 0) {
        ui.notifications.error(i18n("cf.failed_to_initialize"));
        console.error(CM_CONST.CM_LABEL + " | FAIL: DND5E v" + CM_CONST.MIN_DND5E_VERSION + " or newer required.");
        return false;
    };

	// ----------------------------------------------------------
	// Module combat-utility-belt.

	if (!game.modules.get(CM_CONST.COMBAT_UTILITY_BELT_MODULE_NAME)) {
		ui.notifications.error(i18n("cf.failed_to_initialize"));
		console.error(CM_CONST.CM_LABEL + " | FAIL: " + CM_CONST.COMBAT_UTILITY_BELT_MODULE_NAME + " module not found.");
		return false;
	};
	// minimum combat-utility-belt version.
	if (versionCompare(game.modules.get(CM_CONST.COMBAT_UTILITY_BELT_MODULE_NAME).data.version, CM_CONST.MIN_COMBAT_UTILITY_BELT_VERSION) < 0) {
		ui.notifications.error(i18n("cf.failed_to_initialize"));
		console.error(CM_CONST.CM_LABEL + " | FAIL: " + CM_CONST.COMBAT_UTILITY_BELT_MODULE_NAME + " v" + CM_CONST.MIN_COMBAT_UTILITY_BELT_VERSION + " or newer required.");
		return false;
	};
	// combat-utility-belt enhanced conditions must be enabled.
	var cub_config;
	cub_config = game.settings.get(CM_CONST.COMBAT_UTILITY_BELT_MODULE_NAME, "enableEnhancedConditions");
	if (cub_config != true) {
		ui.notifications.error(i18n("cf.failed_to_initialize"));
		console.error(CM_CONST.CM_LABEL + " | FAIL: " + CM_CONST.COMBAT_UTILITY_BELT_MODULE_NAME + " configuration 'Enable Enhanced Conditions' must be true.");
		return false;
	};
	// combat-utility-belt enhanced conditions output to chat must be enabled.
	cub_config = game.settings.get(CM_CONST.COMBAT_UTILITY_BELT_MODULE_NAME, "conditionsOutputToChat");
	if (cub_config != true) {
		ui.notifications.error(i18n("cf.failed_to_initialize"));
		console.error(CM_CONST.CM_LABEL + " | FAIL: " + CM_CONST.COMBAT_UTILITY_BELT_MODULE_NAME + " configuration 'Output to Chat' must be true.");
		return false;
	};
	// combat-utility-belt enhanced conditions output during combat must be enabled.
	cub_config = game.settings.get(CM_CONST.COMBAT_UTILITY_BELT_MODULE_NAME, "conditionsOutputDuringCombat");
	if (cub_config != true) {
		ui.notifications.error(i18n("cf.failed_to_initialize"));
		console.error(CM_CONST.CM_LABEL + " | FAIL: " + CM_CONST.COMBAT_UTILITY_BELT_MODULE_NAME + " configuration 'Output During Combat' must be true.");
		return false;
	};
	// combat-utility-belt enhanced conditions remove default status must be enabled.
	cub_config = game.settings.get(CM_CONST.COMBAT_UTILITY_BELT_MODULE_NAME, "removeDefaultEffects");
	if (cub_config != true) {
		ui.notifications.error(i18n("cf.failed_to_initialize"));
		console.error(CM_CONST.CM_LABEL + " | FAIL: " + CM_CONST.COMBAT_UTILITY_BELT_MODULE_NAME + " configuration 'Remove Default Status Effects' must be true.");
		return false;
	};
	// combat-utility-belt enhanced conditions suppress preventative save reminder must be enabled.
	cub_config = game.settings.get(CM_CONST.COMBAT_UTILITY_BELT_MODULE_NAME, "conditionsSuppressPreventativeSaveReminder");
	if (cub_config != true) {
		ui.notifications.error(i18n("cf.failed_to_initialize"));
		console.error(CM_CONST.CM_LABEL + " | FAIL: " + CM_CONST.COMBAT_UTILITY_BELT_MODULE_NAME + " configuration 'Suppress Preventative Save Reminder' must be true.");
		return false;
	};

    return true;
};

/**
* "init" hook.
*
* Hook once into Foundry's initialization sequence.
* Check dependencies and setup namespace.
*/

Hooks.once("init", function() {
	// check dependencies.
	if (!checkRequirements()) return;
			
    // create a namespace within game global to share functionality with macros.
    game.ConditionManager = {
        // return ConditionManager object.
		getConditionManager: function() { return new ConditionManager(); }
    };

    // add constants to namespace.
    game.ConditionManager.CM_CONST = CM_CONST;

    console.info(CM_CONST.CM_LABEL + " | Initialized.");
});

/**
* "ready" hook.
*
* Hook once into Foundry's ready sequence.
*/

Hooks.once("ready", function() {
    console.info(CM_CONST.CM_LABEL + " | Ready.");
});

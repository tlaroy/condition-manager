/**
 * Condition Manager.
 *
 *      ./condition_manager.js
 *      v0.0.2
 */

import * as CF_CONST from "./module/const.js";
import { ConditionManager } from "./module/conditions.js";

console.info(String(CF_CONST.CF_LABEL + " | %c" + CF_CONST.CF_NAME + "%c v" + CF_CONST.CF_VERSION + "."), "color:" + CF_CONST.CONSOLE_GREEN, "color:" + CF_CONST.CONSOLE_DEFAULT);

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
    if (versionCompare(game.data.version, CF_CONST.MIN_FOUNDRY_VERSION) < 0) {
        ui.notifications.error(i18n("cf.failed_to_initialize"));
        console.error(CF_CONST.CF_LABEL + " | FAIL: Foundry v" + CF_CONST.MIN_FOUNDRY_VERSION + " or newer required.");
        return false;
    };

    // ----------------------------------------------------------
    // System dnd5e.

    if (game.data.system.data.name != "dnd5e") {
        ui.notifications.error(i18n("cf.failed_to_initialize"));
        console.error(CF_CONST.CF_LABEL + " | FAIL: DND5E system not found.");
        return false;
    };
    // minimum dnd5e version.
    if (versionCompare(game.data.system.data.version, CF_CONST.MIN_DND5E_VERSION) < 0) {
        ui.notifications.error(i18n("cf.failed_to_initialize"));
        console.error(CF_CONST.CF_LABEL + " | FAIL: DND5E v" + CF_CONST.MIN_DND5E_VERSION + " or newer required.");
        return false;
    };

	// ----------------------------------------------------------
	// Module combat-utility-belt.

	if (!game.modules.get(CF_CONST.COMBAT_UTILITY_BELT_MODULE_NAME)) {
		ui.notifications.error(i18n("cf.failed_to_initialize"));
		console.error(CF_CONST.CF_LABEL + " | FAIL: " + CF_CONST.COMBAT_UTILITY_BELT_MODULE_NAME + " module not found.");
		return false;
	};
	// minimum combat-utility-belt version.
	if (versionCompare(game.modules.get(CF_CONST.COMBAT_UTILITY_BELT_MODULE_NAME).data.version, CF_CONST.MIN_COMBAT_UTILITY_BELT_VERSION) < 0) {
		ui.notifications.error(i18n("cf.failed_to_initialize"));
		console.error(CF_CONST.CF_LABEL + " | FAIL: " + CF_CONST.COMBAT_UTILITY_BELT_MODULE_NAME + " v" + CF_CONST.MIN_COMBAT_UTILITY_BELT_VERSION + " or newer required.");
		return false;
	};
	// combat-utility-belt enhanced conditions must be enabled.
	var cub_config;
	cub_config = game.settings.get(CF_CONST.COMBAT_UTILITY_BELT_MODULE_NAME, "enableEnhancedConditions");
	if (cub_config != true) {
		ui.notifications.error(i18n("cf.failed_to_initialize"));
		console.error(CF_CONST.CF_LABEL + " | FAIL: " + CF_CONST.COMBAT_UTILITY_BELT_MODULE_NAME + " configuration 'Enable Enhanced Conditions' must be true.");
		return false;
	};
	// combat-utility-belt enhanced conditions output to chat must be enabled.
	cub_config = game.settings.get(CF_CONST.COMBAT_UTILITY_BELT_MODULE_NAME, "conditionsOutputToChat");
	if (cub_config != true) {
		ui.notifications.error(i18n("cf.failed_to_initialize"));
		console.error(CF_CONST.CF_LABEL + " | FAIL: " + CF_CONST.COMBAT_UTILITY_BELT_MODULE_NAME + " configuration 'Output to Chat' must be true.");
		return false;
	};
	// combat-utility-belt enhanced conditions output during combat must be enabled.
	cub_config = game.settings.get(CF_CONST.COMBAT_UTILITY_BELT_MODULE_NAME, "conditionsOutputDuringCombat");
	if (cub_config != true) {
		ui.notifications.error(i18n("cf.failed_to_initialize"));
		console.error(CF_CONST.CF_LABEL + " | FAIL: " + CF_CONST.COMBAT_UTILITY_BELT_MODULE_NAME + " configuration 'Output During Combat' must be true.");
		return false;
	};
	// combat-utility-belt enhanced conditions remove default status must be enabled.
	cub_config = game.settings.get(CF_CONST.COMBAT_UTILITY_BELT_MODULE_NAME, "removeDefaultEffects");
	if (cub_config != true) {
		ui.notifications.error(i18n("cf.failed_to_initialize"));
		console.error(CF_CONST.CF_LABEL + " | FAIL: " + CF_CONST.COMBAT_UTILITY_BELT_MODULE_NAME + " configuration 'Remove Default Status Effects' must be true.");
		return false;
	};
	// combat-utility-belt enhanced conditions suppress preventative save reminder must be enabled.
	cub_config = game.settings.get(CF_CONST.COMBAT_UTILITY_BELT_MODULE_NAME, "conditionsSuppressPreventativeSaveReminder");
	if (cub_config != true) {
		ui.notifications.error(i18n("cf.failed_to_initialize"));
		console.error(CF_CONST.CF_LABEL + " | FAIL: " + CF_CONST.COMBAT_UTILITY_BELT_MODULE_NAME + " configuration 'Suppress Preventative Save Reminder' must be true.");
		return false;
	};

    return true;
};

/**
* configurationSettings().
*
* Module configuration settings.
*/

function configurationSettings() {
    //-------------------------------------------------------
    // add to Foundry's Configure Game Settings / Module Settings dialog.

    // enabled.
    game.settings.register(CF_CONST.CF_MODULE_NAME, CF_CONST.CF_ENABLED, {
        name:   i18n("cf.settings_enable_name"),
        hint:   i18n("cf.settings_enable_hint"),
        type:    Boolean,
        scope:  "client",
        config:  true,
        default: true,
    });
};

/**
* "init" hook.
*
* Hook once into Foundry's initialization sequence.
* Setup hook and namespace.
*/

Hooks.once("init", function() {
    // create a namespace within game global to share functionality with macros.

    game.ConditionManager = {
        // is this module enabled (hook set)?
        isEnabled: function() {
            return game.settings.get(CF_CONST.CF_MODULE_NAME, CF_CONST.CF_ENABLED);
        },

        // enable.
        enableConditionManager: function() {
            // ----------------------------------------------------------
            // check requirements.
            if (!checkRequirements()) return;
            // enable.
            console.log(CF_CONST.CF_LABEL + " | Enabled.");
            game.settings.set(CF_CONST.CF_MODULE_NAME, CF_CONST.CF_ENABLED, true);
        },

        // disable.
        disableConditionManager: function() {
            console.log(CF_CONST.CF_LABEL + " | Disabled.");
            game.settings.set(CF_CONST.CF_MODULE_NAME, CF_CONST.CF_ENABLED, false);
        },

        // return ConditionManager object.
        getConditionManager: function() { return new ConditionManager(); }
    };

    // add constants to namespace.
    game.ConditionManager.CF_CONST = CF_CONST;

    // create configuration settings.
    configurationSettings();

    console.info(CF_CONST.CF_LABEL + " | Initialized.");
});

/**
* "ready" hook.
*
* Hook once into Foundry's ready sequence.
* Enable module.
*/

Hooks.once("ready", function() {
    console.info(CF_CONST.CF_LABEL + " | Ready.");
});

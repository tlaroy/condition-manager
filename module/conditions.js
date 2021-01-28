/**
 * Condition Manager.
 *
 *      ./module/conditions.js
 *      v0.0.3
 */

import * as CM_CONST from "./const.js";

/**
* EffectAttributes class.
*/

class EffectAttributes {
    /**
    * EffectAttributes.constructor().
    */

    constructor() {
        //console.debug(CM_CONST.CM_LABEL + " | Effects.constructor()");
    }

    /**
    * EffectAttributes.set().
    *
    *      label     {string} condition identifier.
    *      key       {string} effect identifier.
    *      attribute {number} attribute index.
    *      value     {string|number|boolean} attribute value.
    *      target    {object} Target object.
    *      return    {boolean} true on success, false on failure.
    */

    async set(label, key, attribute, value, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Effects.set()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | key:                  [" + key         + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | attribute:            [" + attribute   + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | value:                [" + value       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));

        if (!game.cub.hasCondition(label, target)) return false;

        var effects = target.data.effects;
        var retval;

        for (var i = 0; i < effects.length; i++) {
            if (effects[i].label == label) {
                for (var j = 0; j < effects[i].changes.length; j++) {
                    if (effects[i].changes[j].key == key) {
                        switch (attribute) {
                            case CM_CONST.CHANGE_MODE:
                                console.info(String(CM_CONST.CM_LABEL + " | Set Attribute:        [%c" + target.name + ":" + label + ":" + key + ":Change Mode:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                                var changes = effects[i].changes;
                                changes[j].mode = value;
                                retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "changes": changes});
                                if (!retval) return false;
                                break;
                            case CM_CONST.ATTRIBUTE_VALUE:
                                console.info(String(CM_CONST.CM_LABEL + " | Set Attribute:        [%c" + target.name + ":" + label + ":" + key + ":Value:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                                var changes = effects[i].changes;
                                changes[j].value = value;
                                retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "changes": changes});
                                if (!retval) return false;
                                break;
                            case CM_CONST.PRIORITY:
                                console.info(String(CM_CONST.CM_LABEL + " | Set Attribute:        [%c" + target.name + ":" + label + ":" + key + ":Priority:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                                var changes = effects[i].priority;
                                retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "changes": changes});
                                if (!retval) return false;
                                break;
                            default:
                                return false;
                        };
                        return true;
                    };
                };
            };
        };
        return false;
    }

    /**
    * EffectAttributes.get().
    *
    *      label     {string} condition identifier.
    *      key       {string} effect identifier.
    *      attribute {number} attribute index.
    *      target    {object} Target object.
    *      return    {string|number|boolean} attribute value or null.
    */

    async get(label, key, attribute, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Effects.get()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | key:                  [" + key         + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | attribute:            [" + attribute   + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));

        if (!game.cub.hasCondition(label, target)) return null;

        var effects = target.data.effects;

        for (var i = 0; i < effects.length; i++) {
            if (effects[i].label == label) {
                for (var j = 0; j < effects[i].changes.length; j++) {
                    if (effects[i].changes[j].key == key) {
                        var value;
                        switch (attribute) {
                            case CM_CONST.CHANGE_MODE:
                                if (effects[i].changes[j].mode === undefined) return null;
                                else value = effects[i].changes[j].mode;
                                console.info(String(CM_CONST.CM_LABEL + " | Get Attribute:        [%c" + target.name + ":" + label + ":" + key + ":Change Mode:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                                break;
                            case CM_CONST.ATTRIBUTE_VALUE:
                                if (effects[i].changes[j].value === undefined) return null;
                                else value = effects[i].changes[j].value;
                                console.info(String(CM_CONST.CM_LABEL + " | Get Attribute:        [%c" + target.name + ":" + label + ":" + key + ":Value:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                                break;
                            case CM_CONST.PRIORITY:
                                if (effects[i].changes[j].priority === undefined) return null;
                                else value = effects[i].changes[j].priority;
                                console.info(String(CM_CONST.CM_LABEL + " | Get Attribute:        [%c" + target.name + ":" + label + ":" + key + ":Priority:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                                break;
                            default:
                                return null;
                        };
                        return value;
                    };
                };
            };
        };
        return null;
    }
}

/**
* Flags class.
*/

class Flags {
    /**
    * Flags.constructor().
    */

    constructor() {
        //console.debug(CM_CONST.CM_LABEL + " | Flags.constructor()");
    }

    /**
    * Flags.set().
    *
    *      label    {string} condition identifier.
    *      flag     {number} flag index.
    *      value    {string|number|boolean} flag value.
    *      target   {object} Target object.
    *      return   {boolean} true on success, false on failure.
    */

    async set(label, flag, value, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Flags.set()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | flag:                 [" + flag        + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | value:                [" + value       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));

        if (!game.cub.hasCondition(label, target)) return false;

        var effects = target.data.effects;
        var retval;

        for (var i = 0; i < effects.length; i++) {
            if (effects[i].label == label) {
                switch (flag) {
                    case CM_CONST.CORE_STATUS_ID:
                        console.info(String(CM_CONST.CM_LABEL + " | Set Flag:             [%c" + target.name + ":" + label + ":Core StatusId:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "flags.core.statusId": value});
                        if (!retval) return false;
                        break;
                    case CM_CONST.CUB_CONDITION_ID:
                        console.info(String(CM_CONST.CM_LABEL + " | Set Flag:             [%c" + target.name + ":" + label + ":CUB ConditionId:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "flags['combat-utility-belt'].conditionId": value});
                        if (!retval) return false;
                        break;
                    case CM_CONST.CUB_OVERLAY:
                        console.info(String(CM_CONST.CM_LABEL + " | Set Flag:             [%c" + target.name + ":" + label + ":CUB Overlay:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "flags['combat-utility-belt'].overlay": value});
                        if (!retval) return false;
                        break;
                    case CM_CONST.DAE_SPECIAL_DURATION:
                        console.info(String(CM_CONST.CM_LABEL + " | Set Flag:             [%c" + target.name + ":" + label + ":DAE Special Duration:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "flags.dae.specialDuration": value});
                        if (!retval) return false;
                        break;
                    default:
                        return false;
                };
                return true;
            };
        };
        return false;
    }

    /**
    * Flags.get().
    *
    *      label    {string} condition identifier.
    *      flag     {number} flag index.
    *      target   {object} Target object.
    *      return   {string|number|boolean} flag value or null.
    */

    async get(label, flag, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Flags.get()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | flag:                 [" + flag        + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));

        if (!game.cub.hasCondition(label, target)) return null;

        var effects = target.data.effects;

        for (var i = 0; i < effects.length; i++) {
            if (effects[i].label == label)
            {
                var value;
                switch (flag) {
                    case CM_CONST.CORE_STATUS_ID:
                        if (effects[i].flags.core === undefined ||
                            effects[i].flags.core.statusId === undefined) return null;
                        else value = effects[i].flags.core.statusId;
                        console.info(String(CM_CONST.CM_LABEL + " | Get Flag:             [%c" + target.name + ":" + label + ":Core StatusId:" + value + "%c]"), "color:#D64100", "color:#F0F0F0");
                        break;
                    case CM_CONST.CUB_CONDITION_ID:
                        if (effects[i].flags["combat-utility-belt"] === undefined ||
                            effects[i].flags["combat-utility-belt"].conditionId === undefined) return null;
                        else value = effects[i].flags["combat-utility-belt"].conditionId;
                        console.info(String(CM_CONST.CM_LABEL + " | Get Flag:             [%c" + target.name + ":" + label + ":CUB ConditionId:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        break;
                    case CM_CONST.CUB_OVERLAY:
                        if (effects[i].flags["combat-utility-belt"] === undefined ||
                            effects[i].flags["combat-utility-belt"].overlay === undefined) return null;
                        else value = effects[i].flags["combat-utility-belt"].overlay;
                        console.info(String(CM_CONST.CM_LABEL + " | Get Flag:             [%c" + target.name + ":" + label + ":CUB Overlay:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        break;
                    case CM_CONST.DAE_SPECIAL_DURATION:
                        if (effects[i].flags.dae === undefined ||
                            effects[i].flags.dae.specialDuration === undefined) return null;
                        else value = effects[i].flags.dae.specialDuration;
                        console.info(String(CM_CONST.CM_LABEL + " | Get Flag:             [%c" + target.name + ":" + label + ":DAE Special Duration:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        break;
                    default:
                        return null;
                };
                return value;
            };
        };
        return null;
    }
}

/**
* Durations class.
*/

class Durations {
    /**
    * Durations.constructor().
    */

    constructor() {
        //console.debug(CM_CONST.CM_LABEL + " | Durations.constructor()");
    }

    /**
    * Durations.set().
    *
    *      label    {string} condition identifier.
    *      duration {number} duration index.
    *      value    {string|number|boolean} duration value.
    *      target   {object} Target object.
    *      return   {boolean} true on success, false on failure.
    */

    async set(label, duration, value, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Durations.set()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | duration:             [" + duration    + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | value:                [" + value       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));

        if (!game.cub.hasCondition(label, target)) return false;

        var effects = target.data.effects;
        var retval;

        for (var i = 0; i < effects.length; i++) {
            if (effects[i].label == label) {
                switch (duration) {
                    case CM_CONST.SECONDS:
                        console.info(String(CM_CONST.CM_LABEL + " | Set Duration:         [%c" + target.name + ":" + label + ":Seconds:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "duration.seconds": value});
                        if (!retval) return false;
                        break;
                    case CM_CONST.START_TIME:
                        console.info(String(CM_CONST.CM_LABEL + " | Set Duration:         [%c" + target.name + ":" + label + ":Start Time:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "duration.startTime": value});
                        if (!retval) return false;
                        break;
                    case CM_CONST.TURNS:
                        console.info(String(CM_CONST.CM_LABEL + " | Set Duration:         [%c" + target.name + ":" + label + ":Turns:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "duration.turns": value});
                        if (!retval) return false;
                        break;
                    case CM_CONST.START_TURN:
                        console.info(String(CM_CONST.CM_LABEL + " | Set Duration:         [%c" + target.name + ":" + label + ":Start Turn:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "duration.startTurn": value});
                        if (!retval) return false;
                        break;
                    case CM_CONST.ROUNDS:
                        console.info(String(CM_CONST.CM_LABEL + " | Set Duration:         [%c" + target.name + ":" + label + ":Rounds:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "duration.rounds": value});
                        if (!retval) return false;
                        break;
                    case CM_CONST.START_ROUND:
                        console.info(String(CM_CONST.CM_LABEL + " | Set Duration:         [%c" + target.name + ":" + label + ":Start Round:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "duration.startRound": value});
                        if (!retval) return false;
                        break;
                    default:
                        return false;
                };
                return true;
            };
        };
        return false;
    }

    /**
    * Durations.get().
    *
    *      label    {string} condition identifier.
    *      duration {number} duration index.
    *      target   {object} Target object.
    *      return   {string|number|boolean} duration value or null.
    */

    async get(label, duration, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Durations.get()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | duration:             [" + duration    + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));

        if (!game.cub.hasCondition(label, target)) return null;

        var effects = target.data.effects;

        for (var i = 0; i < effects.length; i++) {
            if (effects[i].label == label)
            {
                var value;
                switch (duration) {
                    case CM_CONST.SECONDS:
                        if (effects[i].duration.seconds === undefined) return null;
                        else value = effects[i].duration.seconds;
                        console.info(String(CM_CONST.CM_LABEL + " | Get Duration:         [%c" + target.name + ":" + label + ":Seconds:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        break;
                    case CM_CONST.START_TIME:
                        if (effects[i].duration.startTime === undefined) return null;
                        else value = effects[i].duration.startTime;
                        console.info(String(CM_CONST.CM_LABEL + " | Get Duration:         [%c" + target.name + ":" + label + ":Start Time:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        break;
                    case CM_CONST.TURNS:
                        if (effects[i].duration.turns === undefined) return null;
                        else value = effects[i].duration.turns;
                        console.info(String(CM_CONST.CM_LABEL + " | Get Duration:         [%c" + target.name + ":" + label + ":Turns:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        break;
                    case CM_CONST.START_TURN:
                        if (effects[i].duration.startTurn === undefined) return null;
                        else value = effects[i].duration.startTurn;
                        console.info(String(CM_CONST.CM_LABEL + " | Get Duration:         [%c" + target.name + ":" + label + ":Start Turn:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        break;
                    case CM_CONST.ROUNDS:
                        if (effects[i].duration.rounds === undefined) return null;
                        else value = effects[i].duration.rounds;
                        console.info(String(CM_CONST.CM_LABEL + " | Get Duration:         [%c" + target.name + ":" + label + ":Rounds:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        break;
                    case CM_CONST.START_ROUND:
                        if (effects[i].duration.startRound === undefined) return null;
                        else value = effects[i].duration.startRound;
                        console.info(String(CM_CONST.CM_LABEL + " | Get Duration:         [%c" + target.name + ":" + label + ":Start Round:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        break;
                    default:
                        return null;
                };
                return value;
            };
        };
        return null;
    }
}

/**
* Details class.
*/

class Details {
    /**
    * Details.constructor().
    */

    constructor() {
        //console.debug(CM_CONST.CM_LABEL + " | Details.constructor()");
    }

    /**
    * Details.set().
    *
    *      label    {string} condition identifier.
    *      detail   {number} detail index.
    *      value    {string|number|boolean} detail value.
    *      target   {object} Target object.
    *      return   {boolean} true on success, false on failure.
    */

    async set(label, detail, value, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Details.set()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | detail:               [" + detail      + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | value:                [" + value       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));

        if (!game.cub.hasCondition(label, target)) return false;

        var effects = target.data.effects;
        var retval;

        for (var i = 0; i < effects.length; i++) {
            if (effects[i].label == label) {
                switch (detail) {
                    case CM_CONST.DISABLED:
                        console.info(String(CM_CONST.CM_LABEL + " | Set Detail:           [%c" + target.name + ":" + label + ":Disabled:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "disabled": value});
                        if (!retval) return false;
                        break;
                    case CM_CONST.ICON:
                        console.info(String(CM_CONST.CM_LABEL + " | Set Detail:           [%c" + target.name + ":" + label + ":Icon:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "icon": value});
                        if (!retval) return false;
                        break;
                    case CM_CONST.TINT:
                        console.info(String(CM_CONST.CM_LABEL + " | Set Detail:           [%c" + target.name + ":" + label + ":Tint:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "tint": value});
                        if (!retval) return false;
                        break;
                    case CM_CONST.ORIGIN:
                        console.info(String(CM_CONST.CM_LABEL + " | Set Detail:           [%c" + target.name + ":" + label + ":Origin:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "origin": value});
                        if (!retval) return false;
                        break;
                    case CM_CONST.TRANSFER:
                        console.info(String(CM_CONST.CM_LABEL + " | Set Detail:           [%c" + target.name + ":" + label + ":Transfer:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        retval = await target.updateEmbeddedEntity("ActiveEffect", {"_id": effects[i]._id, "transfer": value});
                        if (!retval) return false;
                        break;
                    case CM_CONST.ADDITIONAL_HITS:
                        console.info(String(CM_CONST.CM_LABEL + " | Set Detail:           [%c" + target.name + ":" + label + ":Additional Hits:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        var hp = target.actor.data.attributes.hp.value - value;
                        if (hp < 0) hp = 0;
                        retval = await canvas.scene.updateEmbeddedEntity("Token", {"_id": target.id, "actorData.data.attributes.hp.value": hp});
                        if (!retval) return false;
                        break;
                    default:
                        return false;
                };
                return true;
            };
        };
        return false;
    }

    /**
    * Details.get().
    *
    *      label    {string} condition identifier.
    *      detail   {number} detail index.
    *      target   {object} Target object.
    *      return   {string|number|boolean} detail value or null.
    */

    async get(label, detail, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Details.get()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | detail:               [" + detail      + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));

        if (!game.cub.hasCondition(label, target)) return null;

        var effects = target.data.effects;

        for (var i = 0; i < effects.length; i++) {
            if (effects[i].label == label)
            {
                var value;
                switch (detail) {
                    case CM_CONST.DISABLED:
                        if (effects[i].disabled === undefined) return null;
                        else value = effects[i].disabled;
                        console.info(String(CM_CONST.CM_LABEL + " | Get Detail:           [%c" + target.name + ":" + label + ":Disabled:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        break;
                    case CM_CONST.ICON:
                        if (effects[i].icon === undefined) return null;
                        else value = effects[i].icon;
                        console.info(String(CM_CONST.CM_LABEL + " | Get Detail:           [%c" + target.name + ":" + label + ":Icon:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        break;
                    case CM_CONST.TINT:
                        if (effects[i].tint === undefined) return null;
                        else value = effects[i].tint;
                        console.info(String(CM_CONST.CM_LABEL + " | Get Detail:           [%c" + target.name + ":" + label + ":Tint:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        break;
                    case CM_CONST.ORIGIN:
                        if (effects[i].origin === undefined) return null;
                        else value = effects[i].origin;
                        console.info(String(CM_CONST.CM_LABEL + " | Get Detail:           [%c" + target.name + ":" + label + ":Origin:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        break;
                    case CM_CONST.TRANSFER:
                        if (effects[i].transfer === undefined) return null;
                        else value = effects[i].transfer;
                        console.info(String(CM_CONST.CM_LABEL + " | Get Detail:           [%c" + target.name + ":" + label + ":Transfer:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        break;
                    case CM_CONST.ADDITIONAL_HITS:
                        if (target.actor.data.attributes.hp.value === undefined) return null;
                        else value = target.actor.data.attributes.hp.value;
                        console.info(String(CM_CONST.CM_LABEL + " | Get Detail:           [%c" + target.name + ":" + label + ":Additional Hits:" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
                        break;
                    default:
                        return null;
                };
                return value;
            };
        };
        return null;
    }
}

/**
* ConditionManager class.
*/

export class ConditionManager {
    /**
    * ConditionManager.constructor().
    */

    constructor() {
        //console.debug(CM_CONST.CM_LABEL + " | ConditionManager.constructor()");
    }

    /**
    * ConditionManager.apply().
    *
    *      label    {string} condition identifier.
    *      target   {object} Target object.
    *      return   {boolean} true on success, false on failure.
    */

    async apply(label, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Condition.apply()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));

        // fail if condition has already been applied to the target.
        if (game.cub.hasCondition(label, target)) {
            console.info(String(CM_CONST.CM_LABEL + " | Condition Applied:    [%c" + target.name + ":" + label + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
            console.error(CM_CONST.CM_LABEL + " | FAIL: Condition already applied.");
            return false;
        };

        // apply.
        await game.cub.addCondition([label], target, {allowDuplicates: true, replaceExisting: true});
        console.info(String(CM_CONST.CM_LABEL + " | Condition Applied:    [%c" + target.name + ":" + label + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
        return true;
    }

    /**
    * ConditionManager.remove().
    *
    *      label    {string} condition identifier.
    *      target   {object} Target object.
    *      return   {boolean} true on success, false on failure.
    */

    async remove(label, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Condition.remove()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));

        // fail if condition has not been applied to the target.
        if (!game.cub.hasCondition(label, target)) {
            console.info(String(CM_CONST.CM_LABEL + " | Condition Removed:    [%c" + target.name + ":" + label + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
            console.error(CM_CONST.CM_LABEL + " | FAIL: Condition not applied.");
            return false;
        };

        // remove.
        await game.cub.removeCondition([label], target);
        console.info(String(CM_CONST.CM_LABEL + " | Condition Removed:    [%c" + target.name + ":" + label + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
        return true;
    }

    /**
    * ConditionManager.setEffectAttribute().
    *
    *      label     {string} condition identifier.
    *      key       {string} effect identifier.
    *      attribute {number} attribute index.
    *      value     {string|number|boolean} effect value.
    *      target    {object} Target object.
    *      return    {boolean} true on success, false on failure.
    */

    async setEffectAttribute(label, key, attribute, value, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Condition.setEffect()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | key:                  [" + key         + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | attribute:            [" + attribute   + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | value:                [" + value       + "]"));

        // fail if condition has not been applied to the target.
        if (!game.cub.hasCondition(label, target)) {
            console.info(String(CM_CONST.CM_LABEL + " | Set Attribute:        [%c" + target.name + ":" + label + ":" + key + ":" + attribute + ":" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
            console.error(CM_CONST.CM_LABEL + " | FAIL: Condition not applied.");
            return null;
        };

        var obj = new EffectAttributes();
        if (obj == null) return null;

        return await obj.set(label, key, attribute, value, target);
    }

    /**
    * ConditionManager.getEffectAttribute().
    *
    *      label     {string} condition identifier.
    *      key       {string} effect identifier.
    *      attribute {number} attribute index.
    *      target    {object} Target object.
    *      return    {string|number|boolean} effect value.
    */

    async getEffectAttribute(label, key, attribute, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Condition.getEffect()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | key:                  [" + key         + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | attribute:               [" + attribute   + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));

        // fail if condition has not been applied to the target.
        if (!game.cub.hasCondition(label, target)) {
            console.info(String(CM_CONST.CM_LABEL + " | Get Attribute:        [%c" + target.name + ":" + label + ":" + key + ":" + attribute + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
            console.error(CM_CONST.CM_LABEL + " | FAIL: Condition not applied.");
            return null;
        };

        var obj = new EffectAttributes();
        if (obj == null) return null;

        return obj.get(label, key, attribute, target);
    }

    /**
    * ConditionManager.setFlag().
    *
    *      label    {string} condition identifier.
    *      flag     {number} flag index.
    *      value    {string|number|boolean} flag value.
    *      target   {object} Target object.
    *      return   {boolean} true on success, false on failure.
    */

    async setFlag(label, flag, value, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Condition.setFlag()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | flag:                 [" + flag        + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | value:                [" + value       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));

        // fail if condition has not been applied to the target.
        if (!game.cub.hasCondition(label, target)) {
            console.info(String(CM_CONST.CM_LABEL + " | Set Flag:             [%c" + target.name + ":" + label + ":" + flag + ":" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
            console.error(CM_CONST.CM_LABEL + " | FAIL: Condition not applied.");
            return null;
        };

        var obj = new Flags();
        if (obj == null) return null;

        return await obj.set(label, flag, value, target);
    }

    /**
    * ConditionManager.getFlag().
    *
    *      label    {string} condition identifier.
    *      flag     {number} flag index.
    *      target   {object} Target object.
    *      return   {string|number|boolean} flag value or null.
    */

    async getFlag(label, flag, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Condition.getFlag()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | flag:                 [" + flag        + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));

        // fail if condition has not been applied to the target.
        if (!game.cub.hasCondition(label, target)) {
            console.info(String(CM_CONST.CM_LABEL + " | Get Flag:             [%c" + target.name + ":" + label + ":" + flag + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
            console.error(CM_CONST.CM_LABEL + " | FAIL: Condition not applied.");
            return null;
        };

        var obj = new Flags();
        if (obj == null) return null;

        return obj.get(label, flag, target);
    }

    /**
    * ConditionManager.setDuration().
    *
    *      label    {string} condition identifier.
    *      duration {number} duration index.
    *      value    {string|number|boolean} duration value.
    *      target   {object} Target object.
    *      return   {boolean} true on success, false on failure.
    */

    async setDuration(label, duration, value, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Condition.setDuration()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | duration:             [" + duration    + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | value:                [" + value       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));

        // fail if condition has not been applied to the target.
        if (!game.cub.hasCondition(label, target)) {
            console.info(String(CM_CONST.CM_LABEL + " | Set Duration:         [%c" + target.name + ":" + label + ":" + duration + ":" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
            console.error(CM_CONST.CM_LABEL + " | FAIL: Condition not applied.");
            return false;
        };

        var obj = new Durations();
        if (obj == null) return false;

        return await obj.set(label, duration, value, target);
    }

    /**
    * ConditionManager.getDuration().
    *
    *      label    {string} condition identifier.
    *      duration {number} duration index.
    *      target   {object} Target object.
    *      return   {string|number|boolean} duration value or null.
    */

    async getDuration(label, duration, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Condition.getDuration()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | duration:             [" + duration    + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));

        // fail if condition has not been applied to the target.
        if (!game.cub.hasCondition(label, target)) {
            console.info(String(CM_CONST.CM_LABEL + " | Get Duration:         [%c" + target.name + ":" + label + ":" + duration + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
            console.error(CM_CONST.CM_LABEL + " | FAIL: Condition not applied.");
            return null;
        };

        var obj = new Durations();
        if (obj == null) return null;

        return obj.get(label, duration, target);
    }

    /**
    * ConditionManager.setDetail().
    *
    *      label    {string} condition identifier.
    *      detail   {number} detail index.
    *      value    {string|number|boolean} detail value.
    *      target   {object} Target object.
    *      return   {boolean} true on success, false on failure.
    */

    async setDetail(label, detail, value, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Condition.setDetail()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | detail:               [" + detail      + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | value:                [" + value       + "]"));

        // fail if condition has not been applied to the target.
        if (!game.cub.hasCondition(label, target)) {
            console.info(String(CM_CONST.CM_LABEL + " | Set Detail:           [%c" + target.name + ":" + label + ":" + detail + ":" + value + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
            console.error(CM_CONST.CM_LABEL + " | FAIL: Condition not applied.");
            return false;
        };

        var obj = new Details();
        if (obj == null) return false;

        return await obj.set(label, detail, value, target);
    }

    /**
    * ConditionManager.getDetail().
    *
    *      label    {string} condition identifier.
    *      detail   {number} detail index.
    *      target   {object} Target object.
    *      return   {string|number|boolean} detail value or null.
    */

    async getDetail(label, detail, target) {
        //console.debug(CM_CONST.CM_LABEL + " | Condition.getDetail()");
        //console.debug(String(CM_CONST.CM_LABEL + " | label:                [" + label       + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | detail:               [" + detail      + "]"));
        //console.debug(String(CM_CONST.CM_LABEL + " | target:               [" + target.name + "]"));

        // fail if condition has not been applied to the target.
        if (!game.cub.hasCondition(label, target)) {
            console.info(String(CM_CONST.CM_LABEL + " | Get Detail:           [%c" + target.name + ":" + label + ":" + detail + "%c]"), "color:" + CM_CONST.CONSOLE_GREEN, "color:" + CM_CONST.CONSOLE_DEFAULT);
            console.error(CM_CONST.CM_LABEL + " | FAIL: Condition not applied.");
            return null;
        };

        var obj = new Details();
        if (obj == null) return null;

        return obj.get(label, detail, target);
    }
}

/**
 * Condition Manager.
 *
 *      Examples Macro
 *      v0.0.1
 *
 * Example macro demonstrating calls to the module.
 */

console.info(String(game.ConditionManager.CF_CONST.CF_LABEL + " | %c" + game.ConditionManager.CF_CONST.CF_NAME + "%c v" + game.ConditionManager.CF_CONST.CF_VERSION + " - EXAMPLES" + "."), "color:" + game.ConditionManager.CF_CONST.CONSOLE_GREEN, "color:" + game.ConditionManager.CF_CONST.CONSOLE_DEFAULT);

/**
* arguments.
*/

if (args.length == 0) {
    console.info(game.ConditionManager.CF_CONST.CF_LABEL + " | No arguments passed.");
} else {
    for (var i = 0; i < args.length; i++) {
        console.info(game.ConditionManager.CF_CONST.CF_LABEL + " | Argument[", i, "]: ", args[i]);
    }
    return;
}

/**
* dialog.
*/

function dialogTemplate() {
    return `<form><div>
                <h2>Example</label></h2>
                </br><label>Target Blinded Condition</label></br></br></br>
            </div></form>`;
}

function showDialog() {
    var dialog = new Dialog({
        title: "Condition Manager",
        content: dialogTemplate(),
        buttons: {
            // continue with callbacks.
            apply: {
                icon: "<i class='fas fa-toggle-off'></i>",
                label: "Apply",
                callback: async (html) => { callbackApply();  dialog.render(true); }
            },
            update: {
                icon: "<i class='fas fa-toggle-off'></i>",
                label: "Update",
                callback: async (html) => { callbackUpdate(); dialog.render(true); }
            },
            remove: {
                icon: "<i class='fas fa-toggle-off'></i>",
                label: "Remove",
                callback: async (html) => { callbackRemove(); dialog.render(true); }
            },
            // or cancel and done.
            cancel: {
                icon: "<i class='fas fa-times'></i>",
                label: "Cancel",
                callback: async (html) => { },
            }
        },
        default: "cancel",
        close:   async (html) => { },
    }).render(true);
}

/**
* dialog callbacks.
*/

async function callbackApply() {
    // get target.
    var target = getTargetedToken();
    if (target == null) return false;

    // get ConditionManager namespace.
    var cfn = game.ConditionManager;
    if (cfn == null) return false;

    // get condition manager.
    var mgr = cfn.getConditionManager();
    if (mgr == null) return false;

    var retval;

    // apply.
    retval = await mgr.apply(cfn.CF_CONST.BLEEDING_LABEL, target);
    if (!retval) return false;

    // set duration of turns to 2.
    retval = await mgr.setDuration(cfn.CF_CONST.BLEEDING_LABEL, cfn.CF_CONST.TURNS, 2, target);
    if (!retval) return false;

    return true;
}

async function callbackUpdate() {
    // get target.
    var target = getTargetedToken();
    if (target == null) return false;

    // get ConditionManager namespace.
    var cfn = game.ConditionManager;
    if (cfn == null) return false;

    // get condition manager.
    var mgr = cfn.getConditionManager();
    if (mgr == null) return false;

    var retval;

    // set effect attribute value to -10 (default is 3).
    retval = await mgr.setEffectAttribute(cfn.CF_CONST.BLEEDING_LABEL, cfn.CF_CONST.ATTRIBUTE_HP_KEY, cfn.CF_CONST.ATTRIBUTE_VALUE, -10, target);
    if (!retval) return false;

    // set duration of turns to null (was set to 2 by apply).
    retval = await mgr.setDuration(cfn.CF_CONST.BLEEDING_LABEL, cfn.CF_CONST.TURNS, null, target);
    if (!retval) return false;

    // set duration of rounds to 10.
    retval = await mgr.setDuration(cfn.CF_CONST.BLEEDING_LABEL, cfn.CF_CONST.ROUNDS, 10, target);
    if (!retval) return false;

    return true;
}

async function callbackRemove() {
    // get target.
    var target = getTargetedToken();
    if (target == null) return false;

    // get ConditionManager namespace.
    var cfn = game.ConditionManager;
    if (cfn == null) return false;

    // get condition manager.
    var mgr = cfn.getConditionManager();
    if (mgr == null) return false;

    var retval;

    // remove.
    retval = await mgr.remove(cfn.CF_CONST.BLEEDING_LABEL, target);
    if (!retval) return false;

    return true;
}

/**
* get tokens.
*/

function getSelectedToken() {
    // selected actors.
    var selects = canvas.tokens.controlled;
    if (selects === undefined) return null;
    // if we want one, and only one.
    if (selects.length == 0 || selects.length > 1) {
        console.warn(game.ConditionManager.CF_CONST.CF_LABEL + " | No token selected.");
        return null;
    }
    // selected actor.
    var select = canvas.tokens.controlled[0];
    return select;
}

function getTargetedToken() {
    // targeted actors.
    var targets = Array.from(game.user.targets);
    if (targets === undefined) return null;
    // if we want one, and only one.
    if (targets.length == 0 || targets.length > 1) {
        console.warn(game.ConditionManager.CF_CONST.CF_LABEL + " | No token targeted.");
        return null;
    }
    // targeted actor.
    var target = targets[0].actor;
    return target;
}

/**
* main.
*/

function main() {
    if (!game.user.isGM) return;

    // get ConditionManager namespace.
    var cfn = game.ConditionManager;

    // is condition-manager enabled?
    var enabled = cfn.isEnabled();
    if (!enabled) cfn.enableTables();

    showDialog();
}

main();
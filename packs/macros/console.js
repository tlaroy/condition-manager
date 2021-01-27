/**
 * Condition Manager.
 *
 *      Console Macro
 *      v0.0.1
 *
 * Console macro to enable/disable module hook.
 */

console.info(String(game.ConditionManager.CF_CONST.CF_LABEL + " | %c" + game.ConditionManager.CF_CONST.CF_NAME + "%c v" + game.ConditionManager.CF_CONST.CF_VERSION + " - CONSOLE" + "."), "color:" + game.ConditionManager.CF_CONST.CONSOLE_GREEN, "color:" + game.ConditionManager.CF_CONST.CONSOLE_DEFAULT);

/**
* dialog.
*/

function dialogDisableTemplate() {
    return `<form><div>
                <h2>Console</label></h2>
                </br><label>Condition Manager is: ENABLED</label></br></br></br>
            </div></form>`;
}

function dialogEnableTemplate() {
    return `<form><div>
                <h2>Console</label></h2>
                </br><label>Condition Manager is: DISABLED</label></br></br></br>
            </div></form>`;
}

function showDialog(enabled_state) {
    var dialog;
    if (enabled_state) {
        // disable dialog.
        dialog = new Dialog({
            title: "Condition Manager",
            content: dialogDisableTemplate(),
            buttons: {
                // continue with callback.
                disable: {
                    icon: "<i class='fas fa-toggle-off'></i>",
                    label: "Disable",
                    callback: async (html) => { callbackDisable() }
                },
                // or cancel and done.
                cancel: {
                    icon: "<i class='fas fa-times'></i>",
                    label: "Cancel",
                    callback: async (html) => { },
                }
            },
            default: "disable",
            close: async (html) => { },
        }).render(true);
    }
    else {
        // enable dialog.
        dialog = new Dialog({
            title: "Condition Manager",
            content: dialogEnableTemplate(),
            buttons: {
                // continue with callback.
                enable: {
                    icon: "<i class='fas fa-toggle-on'></i>",
                    label: "Enable",
                    callback: async (html) => { callbackEnable() }
                },
                // or cancel and done.
                cancel: {
                    icon: "<i class='fas fa-times'></i>",
                    label: "Cancel",
                    callback: async (html) => { },
                }
            },
            default: "enable",
            close: async (html) => { },
        }).render(true);
    }
}

/**
* dialog callbacks.
*/

async function callbackEnable() {
    game.ConditionManager.enableConditionManager();
}

async function callbackDisable() {
    game.ConditionManager.disableConditionManager();
}

/**
* main.
*/

function main() {
    if (!game.user.isGM) return;
    showDialog(game.ConditionManager.isEnabled());
}

main();
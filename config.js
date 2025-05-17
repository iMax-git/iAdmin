Config = {
    extended: "extended", // name of your esx resource
    Lang: "fr-FR", // "fr-FR" or "en-US"
    Debug: true, /* Debug mode */
    DebugZone :{
        Logs: false,
        Ban: false,
        Warn: false,
        Report: false,
    },
    Personal_Event:{
        "revive": "myHealthScript:revivePlayer", /* Your event received one argument => player id */
    },

    opened: {
        commandName: "iadmin", /* for key and command name */

        key: {
            control: "F10", /* touche (https://docs.fivem.net/docs/game-references/input-mapper-parameter-ids/keyboard/) */
            description: "Open iAdmin Menu" /* for key description on GTA V settings (screen: ...) */
        }
    },

    AllowedLicences: {
        ["license:2dec8b0c73abe9036593f91273a334225071b3a3"] : true,
    },

    Controles: {
        NOCLIP: {
            UP : 44, // A
            DOWN : 48, // W
            LEFT : 35, // Q
            RIGHT : 34, // D
            FORWARD : 32, // Z
            BACKWARD : 33, // S
        }
    },

    Locales: {
        ["fr-FR"]: {

            ["event_registered"]: "à été enregistré",

            ["report_loaded"]: "Les rapports ont été chargés",
            ["report_file_loaded"]: "Le fichier de rapports (reports.json) a été chargé",
            ["report_file_saved"]: "Le fichier de rapports (reports.json) a été sauvegardé",
            ["report_added"]: "Le rapport a été ajouté",
            ["report_send_to_ui"]: "Le rapport a été envoyé à l'UI",

            ["warn_loaded"]: "Les avertissements ont été chargés",
            ["warn_file_loaded"]: "Le fichier d'avertissements (warns.json) a été chargé",
            ["warn_file_saved"]: "Le fichier d'avertissements (warns.json) a été sauvegardé",
            ["warn_added"]: "L'avertissement a été ajouté",
            ["warn_send_to_ui"]: "L'avertissement a été envoyé à l'UI",

            ["ban_loaded"]: "Les bannissements ont été chargés",
            ["ban_file_loaded"]: "Le fichier de bannissements (bans.json) a été chargé",
            ["ban_file_saved"]: "Le fichier de bannissements (bans.json) a été sauvegardé",
            ["ban_added"]: "Le bannissement a été ajouté",
            ["ban_send_to_ui"]: "Le bannissement a été envoyé à l'UI",

            ["logs_loaded"]: "Les logs ont été chargés",
            ["logs_file_loaded"]: "Le fichier de logs (logs.json) a été chargé",
            ["logs_file_saved"]: "Le fichier de logs (logs.json) a été sauvegardé",
            ["logs_added"]: "Le log a été ajouté",
            ["logs_send_to_ui"]: "Le log a été envoyé à l'UI",

            ["logs_kick"] : " à été kick pour ",
            ["logs_ban"] : " à été banni pour ",
            
            ["logs_kick_msg"]: "Vous avez été kick pour ",
            ["logs_ban_msg"]: "Vous avez été banni pour ",

            ["logs_crash"]: " Le joueur ",
            ["logs_crash_2"]: " a été crashé !",

            ["kick_all"]: "Tous les joueurs ont été kick !",
            ["delete_all_vehicles"]: "Tous les véhicules ont été supprimés !",
            ["delete_all_peds"]: "Tous les Peds ont été supprimés !",
            ["delete_all_objects"]: "Tous les objets ont été supprimés !",
            ["giveweaponall"]: "Tous les joueurs ont été giveweapon !",
            ["giveitemall"]: "Tous les joueurs ont été giveitem !",
            ["givemoneyall"]: "Tous les joueurs ont été givemoney !",

        },
        ["en-EN"]: {

            ["event_registered"]: "has been registered",

            ["report_loaded"]: "Reports loaded",
            ["report_file_loaded"]: "Reports file (reports.json) loaded",
            ["report_file_saved"]: "Reports file (reports.json) saved",
            ["report_added"]: "Report added",
            ["report_send_to_ui"]: "Report sent to UI",

            ["warn_loaded"]: "Warns loaded",
            ["warn_file_loaded"]: "Warns file (warns.json) loaded",
            ["warn_file_saved"]: "Warns file (warns.json) saved",
            ["warn_added"]: "Warn added",
            ["warn_send_to_ui"]: "Warn sent to UI",

            ["ban_loaded"]: "Bans loaded",
            ["ban_file_loaded"]: "Bans file (bans.json) loaded",
            ["ban_file_saved"]: "Bans file (bans.json) saved",
            ["ban_added"]: "Ban added",
            ["ban_send_to_ui"]: "Ban sent to UI",

            ["logs_loaded"]: "Logs loaded",
            ["logs_file_loaded"]: "Logs file (logs.json) loaded",
            ["logs_file_saved"]: "Logs file (logs.json) saved",
            ["logs_added"]: "Log added",
            ["logs_send_to_ui"]: "Log sent to UI",

            ["logs_kick"] : " has been kicked for ",
            ["logs_ban"] : " has been banned for ",

            ["logs_kick_msg"]: "You have been kicked for ",
            ["logs_ban_msg"]: "You have been banned for ",

            ["logs_crash"]: " The player ",
            ["logs_crash_2"]: " has been crashed !",

            ["kick_all"]: "All players have been kicked !",
            ["delete_all_vehicles"]: "All vehicles have been deleted !",
            ["delete_all_peds"]: "All Peds have been deleted !",
            ["delete_all_objects"]: "All objects have been deleted !",
            ["giveweaponall"]: "All players have been giveweapon !",
            ["giveitemall"]: "All players have been giveitem !",
            ["givemoneyall"]: "All players have been givemoney !",
        }
    }
}

/* 

Configuration.Debug


*/
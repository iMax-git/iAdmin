const ESX = exports[Config["extended"]].getSharedObject();
const util = new Utils();
const player = new Player(ESX.PlayerData, GetPlayerServerId(PlayerId()), GetPlayerName(PlayerId()));
var loaded = false;
util.registerClientEvent("esx:playerLoaded", (playerList) => {
    console.log("[iAdmin | Event | esx:playerLoaded] Event triggered");
    util.serverEvent("iAdmin:initPlayer", GetPlayerServerId(PlayerId()));
    loaded = true;
    
})

// if (!loaded) {
//     console.log("[iAdmin | Event | Start] Event triggered");
//     util.serverEvent("iAdmin:initPlayer", GetPlayerServerId(PlayerId()));
//     loaded = true;
// }



util.registerClientEvent("iAdmin:isAdmin", (isAdmin) => {
    console.log("[iAdmin | Event | iAdmin:isAdmin] Event triggered");
    player.refreshisAdmin(isAdmin)
    console.log("[iAdmin | Event | iAdmin:isAdmin] Player is admin?: " + player.isAdmin);
    SendNUIMessage({action: "isAdmin", isAdmin: isAdmin});
})
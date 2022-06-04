console.log("-------------------------------------------");
console.log("------------       iAdmin   ---------------");
console.log("-------------------------------------------");

var ESX = exports["extended"].getSharedObject();
const util = new Utils();
const logs = new Logs();
const playerList = new PlayerList();
const ban = new Ban();
const warn = new Warn();
const report = new Report();

Object.keys(ESX.Players).map(keys => {
    // console.log("[iAdmin | server.js | add] Adding player " + keys);
    playerList.sendToUI(ESX.Players[keys].source);
    playerList.add(new Player(ESX.Players[keys], ESX.Players[keys].source, ESX.Players[keys].name));
    setTimeout(() => {
        logs.sendToUI(ESX.Players[keys].source);
        warn.sendToUI(ESX.Players[keys].source);
        ban.sendToUI(ESX.Players[keys].source);
        report.sendToUI(ESX.Players[keys].source);
        playerList.sendToUI(ESX.Players[keys].source);
        // console.log("[iAdmin | Event | initPlayer] Player " + ESX.Players[keys].name + " finished loading");
        TriggerClientEvent("iAdmin-GetIP", ESX.Players[keys].source);
        TriggerClientEvent("iAdmin-LoadedFinish", ESX.Players[keys].source,ESX.Players[keys].getGroup());
    }, 1000);
})

on("playerDropped", (reason) => {
    // console.log("[iAdmin | server.js | playerDropped] Player "+ GetPlayerName(global.source)+" dropped: " + reason);
    logs.add("Deconnection", GetPlayerName(global.source)+ " à déconnecter. ("+reason+")" , GetPlayerName(global.source));
    playerList.disconnected(global.source);
})

util.RegisterServEvent("iAdmin:initPlayer" , (source) => {
    // console.log("[iAdmin | Event | initPlayer] Event triggered");
    playerList.sendToUI(source);
    playerList.add(new Player(ESX.GetPlayerFromId(source), source, ESX.GetPlayerFromId(source).name));
    logs.sendToUI(source);
    warn.sendToUI(source);
    ban.sendToUI(source);
    report.sendToUI(source);
    // playerList.sendToUI(source);
    // console.log("[iAdmin | Event | initPlayer] Player " + ESX.GetPlayerFromId(source).name + " finished loading");
    TriggerClientEvent("iAdmin-GetIP", source);
    TriggerClientEvent("iAdmin-LoadedFinish", source, ESX.GetPlayerFromId(source).getGroup());
})

util.RegisterServEvent("iAdmin:IsAdmin" , () => {
    // console.log("[iAdmin | Event | isAdmin] Event triggered", source);
    var player = playerList.getById(source);
    TriggerClientEvent("iAdmin:isAdmin", source, player.isAdmin());

})

// RegisterCommand("dakor", (source, args, raw) => {
//     var player = ESX.GetPlayerFromId(source);
//     player.addMoney(args[0] || 1000);
//     console.log("DAKOR", player.getMoney());
//     util.clientEvent("dakor:test", source, "coucou", "ehoh");
// });

util.RegisterServEvent("iAdmin:NuiCallBack", (data) => {
    var jsonData = JSON.stringify(data);
    // console.log(`[iAdmin | NuiCallBack] Utils ^2${jsonData}^0 a été enregistré`);
    // console.log("[iAdmin | Event | NuiCallBack] Event triggered");
    var from = ""
    if (source == 0) {
        from = "console"
    } else {
        from = GetPlayerName(source)
    }
    switch(data.action){
        case "test":{
            // console.log("[iAdmin | Event | NuiCallBack] Utils ^2"+data.data+"^0 a été enregistré");
            break;
        }
        case "kick":{
            id = parseInt(data.data.id);
            var player = ESX.GetPlayerFromId(id);
            logs.add("Kick", player.name+Config["Locales"][Config["Lang"]]["logs_kick"]+data.data.reason, from);
            msg = Config["Locales"][Config["Lang"]]["logs_kick_msg"]+""+data.data.reason;
            DropPlayer(id, msg);
            break;
        }
        case "ban":{
            // console.log("[iAdmin | Event | NuiCallBack] Banning player");
            id = data.data.player.id;
            var player = ESX.GetPlayerFromId(id);
            logs.add("Ban", player.name+Config["Locales"][Config["Lang"]]["logs_ban"]+data.data.reason, from);
            msg = Config["Locales"][Config["Lang"]]["logs_kick_msg"]+data.data.reason;
            DropPlayer(id, msg);
            // console.log(data.data)
            ban.add({name:data.data.player.name,licence:data.data.player.licence}, data.data.reason, data.data.time,data.data.perm);
            break;
        }
        case "crash":{
            // console.log("[iAdmin | Event | NuiCallBack] Crashing player");
            id = data.data.id;
            logs.add("Crash", Config["Locales"][Config["Lang"]]["logs_crash"]+GetPlayerName(id)+Config["Locales"][Config["Lang"]]["logs_crash_2"], from);
            TriggerClientEvent("iAdmin-crash", id);
            break;
        }
        case "messageAll":{
            // console.log("[iAdmin | Event | NuiCallBack] Message all");
            msg = data.data.message;
            logs.add("Message", "Message all : "+msg, from);
            TriggerClientEvent("iAdmin-messageAll", -1, msg);
            break;
        }
        case "crashAll":{
            // console.log("[iAdmin | Event | NuiCallBack] Crash all");
            logs.add("Crash", "Crash all", from);
            TriggerClientEvent("iAdmin-crashAll", -1);
            break;
        }
        case "kickAll":{
            // console.log("[iAdmin | Event | NuiCallBack] Kick all");
            logs.add("Kick", "Kick all", from);
            var idList = [];
            for(var i = 0; i < playerList.get().length; i++){
                // console.log("[iAdmin | Event | NuiCallBack] Kick all | Player "+playerList.get()[i].getSource());
                idList.push(playerList.get()[i].getSource());
            }
            idList.forEach(id => {
                DropPlayer(id, Config["Locales"][Config["Lang"]]["kick_all"]);
            });
            break;
        }
        case "teleportAll":{
            // console.log("[iAdmin | Event | NuiCallBack] Teleport all");
            const [playerX, playerY, playerZ] = GetEntityCoords(GetPlayerPed(source));
            logs.add("Teleport", "Teleport all to "+playerX+", "+playerY+", "+playerZ+"", from);
            // console.log("[iAdmin | Event | NuiCallBack] Teleport all | Coord : "+playerX+" "+playerY+" "+playerZ);
            for (var i = 0; i < playerList.get().length; i++) {
                // console.log("[iAdmin | Event | NuiCallBack] Teleport all | Player "+playerList.get()[i].getSource());
                SetEntityCoords(GetPlayerPed(playerList.get()[i].getSource()), playerX,playerY,playerZ, true, false, false, false);
            }
            break;
        }
        case "deleteAllVehicle":{
            // console.log("[iAdmin | Event | NuiCallBack] Delete all vehicle");
            logs.add("Delete",Config["Locales"][Config["Lang"]]["delete_all_vehicles"], from);
            var vehicle = GetAllVehicles();
            for (var i = 0; i < vehicle.length; i++) {
                DeleteEntity(vehicle[i]);
            }
            break;
        }
        case "deleteAllObject":{
            // console.log("[iAdmin | Event | NuiCallBack] Delete all object");
            logs.add("Delete", Config["Locales"][Config["Lang"]]["delete_all_objects"], from);
            var object = GetAllObjects();
            for (var i = 0; i < object.length; i++) {
                DeleteEntity(object[i]);
            }
            break;
        }
        case "deleteAllPeds":{
            // console.log("[iAdmin | Event | NuiCallBack] Delete all ped");
            logs.add("Delete", Config["Locales"][Config["Lang"]]["delete_all_peds"], from);
            var ped = GetAllPeds();
            for (var i = 0; i < ped.length; i++) {
                DeleteEntity(ped[i]);
            }
            break;
        }
        case "giveWeaponAll":{
            // console.log("[iAdmin | Event | NuiCallBack] Give weapon all");
            logs.add("Give", Config["Locales"][Config["Lang"]]["giveweaponall"], from);
            var weapon = data.data.weapon;
            var ammo = parseInt(data.data.amount);
            for (var i = 0; i < playerList.get().length; i++) {
                GiveWeaponToPed(GetPlayerPed(playerList.get()[i].getSource()), GetHashKey(weapon), ammo, false, true);
            }
            break;
        }
        case "giveItemAll":{
            // console.log("[iAdmin | Event | NuiCallBack] Give item all");
            logs.add("Give", Config["Locales"][Config["Lang"]]["giveitemall"], from);
            var item = data.data.item;
            var amount = parseInt(data.data.amount);
            for (var i = 0; i < playerList.get().length; i++) {
                ESX.GetPlayerFromId(playerList.get()[i].getSource()).addInventoryItem(item, amount);
            }
            break;
        }
        case "giveMoneyAll":{
            // console.log("[iAdmin | Event | NuiCallBack] Give money all");
            logs.add("Give", Config["Locales"][Config["Lang"]]["givemoneyall"], from);
            var money = data.data.money.identifier;
            var amount = parseInt(data.data.amount);
            for (var i = 0; i < playerList.get().length; i++) {
                ESX.GetPlayerFromId(playerList.get()[i].getSource()).addAccountMoney(money, amount);
            }
            break;
        }
        case "collision":{
            // console.log("[iAdmin | Event | NuiCallBack] collision");
            logs.add("collision", "collision "+(data.data.state ? "Active" : "Desactive"), from);
            TriggerClientEvent("iAdmin-collision", source, data.data.state);
            break;
        }
        case "invisible":{
            // console.log("[iAdmin | Event | NuiCallBack] invisible");
            logs.add("Invisible", "Invisible "+(data.data.state ? "Active" : "Desactive"), from);
            TriggerClientEvent("iAdmin-invisible", source, data.data.state);
            break;
        }
        case "godmode":{
            // console.log("[iAdmin | Event | NuiCallBack] godmode");
            logs.add("Godmode", "Godmode "+(data.data.state ? "Active" : "Desactive"), from);
            TriggerClientEvent("iAdmin-godmode", source, data.data.state);
            break;
        }
        case "noclip":{
            // console.log("[iAdmin | Event | NuiCallBack] noclip");
            logs.add("Noclip", "Noclip "+(data.data.state ? "Active" : "Desactive"), from);
            TriggerClientEvent("iAdmin-NoClip", source, data.data.state);
            break;
        }
        case "teleportMarker":{
            // console.log("[iAdmin | Event | NuiCallBack] teleportMarker");
            logs.add("Teleport", "Teleport to marker", from);
            TriggerClientEvent("iAdmin-teleportMarker", source);
            break;
        }
        case "warn":{
            // console.log("[iAdmin | Event | NuiCallBack] warn");
            var id = data.data.id;
            var reason = data.data.reason;
            var licence = data.data.licence;
            logs.add("Warn", "Warn "+GetPlayerName(id)+" ("+id+") for "+reason, from);
            warn.add(GetPlayerName(id), reason, licence,from);
            break;
        }
        case "spectate":{
            // console.log("[iAdmin | Event | NuiCallBack] spectate");
            logs.add("Spectate", "Spectate "+GetPlayerName(data.data.id), from);
            if (data.data.id == source){
                TriggerClientEvent("iAdmin-spectate", source, -1);
            } else {
                TriggerClientEvent("iAdmin-spectate", source, data.data.id);
            }
            
            break;
        }
        case 'freeze':{
            // console.log("[iAdmin | Event | NuiCallBack] freeze");
            logs.add("Freeze", "Freeze "+GetPlayerName(data.data.id), from);
            TriggerClientEvent("iAdmin-freeze", data.data.id);
            break;
        }
        case 'goto':{
            // console.log("[iAdmin | Event | NuiCallBack] goto");
            logs.add("Goto", "Goto "+GetPlayerName(data.data.id), from);
            var [x,y,z] = GetEntityCoords(GetPlayerPed(data.data.id), true);
            SetEntityCoords(GetPlayerPed(source), x,y,z, true, false, false, false);
            break;
        }
        case 'bring':{
            // console.log("[iAdmin | Event | NuiCallBack] bring");
            logs.add("Bring", "Bring "+GetPlayerName(data.data.id), from);
            var [x,y,z] = GetEntityCoords(GetPlayerPed(source), true);
            SetEntityCoords(GetPlayerPed(data.data.id), x,y,z, true, false, false, false);
            break;
        }
        case 'heal':{
            // console.log("[iAdmin | Event | NuiCallBack] heal");
            logs.add("Heal", "Heal "+GetPlayerName(data.data.id), from);
            TriggerClientEvent("iAdmin-heal", data.data.id);
            break;
        }
        case 'revive':{
            // console.log("[iAdmin | Event | NuiCallBack] revive");
            if (Config.Personal_Event["revive"] == "" || Config.Personal_Event["revive"] == "myHealthScript:revivePlayer"){
                TriggerClientEvent("iAdmin-uimessage", source, "error","Revive Personal Event is not set !");
            } else {
                logs.add("Revive", "Revive "+GetPlayerName(data.data.id), from);
                TriggerClientEvent(Config.Personal_Event["revive"], data.data.id);
            }
        }
        case "message":{
            // console.log("[iAdmin | Event | NuiCallBack] message");
            logs.add("Message", "Message for "+GetPlayerName(data.data.id)+" ("+data.data.message+")", from);
            TriggerClientEvent("iAdmin-uimessage", data.data.id, "info",data.data.message);
        }
        case "giveWeapon":{
            // console.log("[iAdmin | Event | NuiCallBack] Give weapon");
            var weapon = data.data.weapon;
            var ammo = parseInt(data.data.amount);
            logs.add("Give", "Give weapon ("+weapon+" | "+ammo+") to"+GetPlayerName(data.data.id), from);
            GiveWeaponToPed(GetPlayerPed(data.data.id), GetHashKey(weapon), ammo, false, true);
            break;
        }
        case "giveItem":{
            // console.log("[iAdmin | Event | NuiCallBack] Give item");
            logs.add("Give", "Give item ("+data.data.item+") to"+GetPlayerName(data.data.id), from);
            var item = data.data.item;
            var amount = parseInt(data.data.amount);
            ESX.GetPlayerFromId(data.data.id).addInventoryItem(item, amount);
            break;
        }
        case "giveMoney":{
            // console.log("[iAdmin | Event | NuiCallBack] Give money");
            logs.add("Give", "Give money ("+data.data.money+" |"+data.data.amount+") to"+GetPlayerName(data.data.id), from);
            var money = data.data.money.identifier;
            var amount = parseInt(data.data.amount);
            ESX.GetPlayerFromId(data.data.id).addAccountMoney(money, amount);
            break;
        }
        case "setjob":{
            // console.log("[iAdmin | Event | NuiCallBack] Set job");
            logs.add("Set Job", "Set job ("+data.data.job+") to "+GetPlayerName(data.data.id), from);
            ESX.GetPlayerFromId(data.data.id).setJob(data.data.job, data.data.grade);
            break;
        }
        case "deleteBan":{
            // console.log("[iAdmin | Event | NuiCallBack] Delete ban");
            logs.add("Delete Ban", "Delete ban ("+data.data.licence+")", from);
            ban.delete(data.data.licence);
            break;
        }
        case "sendReport":{
            // console.log("[iAdmin | Event | NuiCallBack] Send report");
            logs.add("Report", "Send report ", from);
            report.add(from,data.data.subject,data.data.report);
            break;
        }
        case "refreshPlayerInformation":{
            // console.log("[iAdmin | Event | NuiCallBack] Refresh player information");
            playerList.get().forEach(function(player){
                if (player.id == data.data.id){
                    player.refresh();
                    TriggerClientEvent("iAdmin-UpdatePlayer", -1, player);
                }
            })
            break;
        }
        case 'getinfoip':{
            // console.log("[iAdmin | Event | NuiCallBack] Get info ip");
            TriggerClientEvent("iAdmin-getinfoip", data.data.id, source);
            break;
        }
        case 'sendinfoip':{
            // console.log("[iAdmin | Event | NuiCallBack] Send info ip");
            playerList.get().forEach(function(player){
                if (player.id == source){
                    player.setip(data.data.query)
                }
            })
            break;
        }
        default:{
            console.log("[iAdmin | Event | NuiCallBack] Event action not found");
            console.log("[iAdmin | Event | NuiCallBack] Utils ^1"+data.action+"^0 a été enregistré");
            console.log("[iAdmin | Event | NuiCallBack] Utils ^2"+data.data+"^0 a été enregistré");
            break;
        }
    }
})





if (Config["Debug"] && Config["DebugZone"]["Logs"]) {

    RegisterCommand("addLogs", (source, args, raw) => {
        if (Config["Debug"]) {
            console.log("[iAdmin | server.js | Command -> addLogs] Adding logs");
        }
        logs.add("kill", "test", "iMax");
    });

    RegisterCommand("getLogs", (source, args, raw) => {
        if (Config["Debug"]) {
            console.log("[iAdmin | server.js | Command -> getLogs] Getting logs");
        }
        console.log(logs.get())
        
    })

    RegisterCommand("saveLogs", (source, args, raw) => {
        if (Config["Debug"]) {
            console.log("[iAdmin | server.js | Command -> saveLogs] Save logs");   
        }
        logs.save();
    });

}

RegisterCommand("kick", (source, args, raw) => {
    // console.log("[iAdmin | server.js | Command -> kick] Kick command triggered");
    // console.log("[iAdmin | server.js | Command -> kick] args: " + args[0]);
    var player = ESX.GetPlayerFromId(args[0]);
    logs.add("Kick", player.name+" a été kick pour "+args[1]+" par le serveur.", player.name);
    raison = ""
    for (var i = 1; i < args.length; i++) {
        raison = raison + args[i] + " ";
    }
    msg = "Vous avez été kick pour "+raison+"par le serveur.";
    DropPlayer(args[0], msg);

})

// util.RegisterServEvent("dako:server", (testing) => {
//     console.log("testing45684", testing)
// });

on("playerConnecting", (name, setKickReason, defferals) => {
    // console.log(name ,global.source);
    player = global.source
    const identifier = GetPlayerIdentifier(player, 1);
    defferals.defer();
    defferals.update("Chargement...");
    defferals.update("Bonjour, "+name+".\n\n Une verification des bannisement est en cours... \n please stand by :)");
    if(ban.isBanned(identifier)){
        // console.log("[iAdmin | server.js | playerConnecting] Player "+name+" is banned");
        info = ban.banInfo(identifier);
        if (info.time == -1) {
            setKickReason("\n\nVous etes banni permanent pour: "+info.reason);
            defferals.done("\n\nVous etes banni permanent pour: "+info.reason);
        } else {
            defferals.done("\n\nVous etes banni pour "+info.reason+".\n\nVous avez été banni pendant "+info.time+" minute(s).\n\n Il vous reste "+Math.round(info.ban_long)+" minutes avant de pouvoir vous reconnectez !");
        }
    } else {
        defferals.done();
        logs.add("Connect", name+" s'est connecté", name);
    }
})

// on("onServerResourceStop", (name) => {
//     console.log("[iAdmin | server.js | onRessourceStop] Ressource "+name+" stopped");
//     if (name == "iAdmin") {
//         console.log("[iAdmin | server.js | onRessourceStop] iAdmin stopped");
//         logs.save();
//         ban.save();
//     }
// })
class Utils {
    constructor() {
        this.registerLogsEvent();
        this.registerPlayerEvent();
        this.registerServerActionEvent();
        this.registerNuiCallBack();
        this.NoClipActive = false;
        this.freeze = false;
    }

    registerKeys(Controls, ControlName, Description, action) {
        RegisterKeyMapping(ControlName, Description, "keyboard", Controls)
        RegisterCommand(ControlName, (s, args) => {
            if(action) action(s, args);
        })
    }

    registerLogsEvent() {
        // console.log(`[iAdmin | LogsEventRegister] Loaded logs with sucess!`);
        this.registerClientEvent("iAdmin-InitLogs", (logsList) => {
            // console.log("[iAdmin | Event | iAdmin-InitLogs] Event triggered");
            SendNUIMessage({action: "InitLogs", logs: logsList});
        });
        this.registerClientEvent("iAdmin-AddLogs", (log) => {
            // console.log("[iAdmin | Event | iAdmin-AddLogs] Event triggered");
            SendNUIMessage({action: "AddLogs", logs: log});
        });
        this.registerClientEvent("iAdmin-InitWarn", (warnList) => {
            // console.log("[iAdmin | Event | iAdmin-InitWarn] Event triggered");
            SendNUIMessage({action: "InitWarn", warns: warnList});
        });
        this.registerClientEvent("iAdmin-AddWarn", (warn) => {
            // console.log("[iAdmin | Event | iAdmin-AddWarn] Event triggered");
            SendNUIMessage({action: "AddWarn", warn: warn});
        })
        this.registerClientEvent("iAdmin-InitBan", (bansList) => {
            // console.log("[iAdmin | Event | iAdmin-InitBan] Event triggered");
            SendNUIMessage({action: "InitBan", bans: bansList});
        })
        this.registerClientEvent("iAdmin-AddBan", (ban) => {
            // console.log("[iAdmin | Event | iAdmin-AddBan] Event triggered");
            SendNUIMessage({action: "AddBan", ban: ban});
        })
        this.registerClientEvent("iAdmin-DeleteBan",(licence) =>{
            // console.log("[iAdmin | Event | iAdmin-DeleteBan] Event triggered");
            SendNUIMessage({action: "DeleteBan", licence: licence});
        })
        this.registerClientEvent("iAdmin-InitReport",(reportsList) =>{
            // console.log("[iAdmin | Event | iAdmin-InitReport] Event triggered");
            SendNUIMessage({action: "InitReport", reports: reportsList});
        })
        this.registerClientEvent("iAdmin-AddReport", (report) => {
            // console.log("[iAdmin | Event | iAdmin-AddReport] Event triggered");
            SendNUIMessage({action: "AddReport", report: report});
        })
        this.registerClientEvent("iAdmin-getinfoip", (to) =>{
            // console.log("[iAdmin | Event | iAdmin-getinfoip] Event triggered");
            SendNUIMessage({action: "getinfoip", to:to});
        })
        this.registerClientEvent("iAdmin-sendinfoip", (data) =>{
            // console.log("[iAdmin | Event | iAdmin-sendinfoip] Event triggered");
            SendNUIMessage({action: "sendinfoip", data:data});
        })
        this.registerClientEvent("iAdmin-GetIP", ()=>{
            // console.log("[iAdmin | Event | iAdmin-GetIP] Event triggered");
            SendNUIMessage({action: "getinfoip"});
        })
    }

    registerPlayerEvent(){
        // console.log(`[iAdmin | PlayerEventRegister] Loaded player with sucess!`);
        this.registerClientEvent("iAdmin-InitPlayer", (playerList) => {
            // console.log("[iAdmin | Event | iAdmin-InitPlayer] Event triggered");
            SendNUIMessage({action: "InitPlayer", player: playerList});
        });
        this.registerClientEvent("iAdmin-AddPlayer", (player) => {
            // console.log("[iAdmin | Event | iAdmin-AddPlayer] Event triggered");
            SendNUIMessage({action: "AddPlayer", player: player});
        });
        this.registerClientEvent("iAdmin-RemovePlayer", (player) => {
            // console.log("[iAdmin | Event | iAdmin-RemovePlayer] Event triggered");
            SendNUIMessage({action: "RemovePlayer", player: player});
        });
        this.registerClientEvent("iAdmin-UpdatePlayer", (player) => {
            // console.log("[iAdmin | Event | iAdmin-UpdatePlayer] Event triggered");
            SendNUIMessage({action: "UpdatePlayer", player: player});
        })
        this.registerClientEvent("iAdmin-LoadedFinish", (groupname) =>{
            // console.log("[iAdmin | Event | iAdmin-LoadedFinish] Event triggered");
            SendNUIMessage({action: "LoadedFinish",group: groupname});
            
            var menuOpen = false;
            this.registerKeys(Config["opened"]["key"]["control"], "iAdmin", Config["opened"]["key"]["description"], () => {
                // var admin = this.IsAdmin();
                // if (player.isAdmin){
                    // console.log("[iAdmin] Open iAdmin");
                    menuOpen = !menuOpen;
                    SendNUIMessage({action: "show"});
                    SetNuiFocus(menuOpen, menuOpen);
                // } else {
                    // console.log("[iAdmin] You are not an admin");
                // }
            });
            this.addCommand(Config["opened"]["commandName"], () => {
                menuOpen = !menuOpen;
                SendNUIMessage({action: "show"});
                SetNuiFocus(menuOpen, menuOpen);
            })
        })
        this.registerClientEvent("iAdmin-crash", () => {
            this.CrashPlayer();
        })
        this.registerClientEvent("iAdmin-NoClip", (bool) => {
            this.NoClipActive = bool;
            this.NoClip();
        })
        this.registerClientEvent("iAdmin-invisible", (state) =>{
            SetEntityVisible(PlayerPedId(), !state, !state)
        })
        this.registerClientEvent("iAdmin-collision", (state) =>{
            SetEntityCollision(PlayerPedId(), state, state)
        })
        this.registerClientEvent("iAdmin-godmode", (state) =>{
            SetEntityInvincible(PlayerPedId(), state)
        })
        this.registerClientEvent("iAdmin-teleportMarker", ()=>{
            const waypoint = GetFirstBlipInfoId(8);
            if (DoesBlipExist(waypoint)){
                const [x,y,z] = GetBlipCoords(waypoint);
                var [_,gz] = GetGroundZFor_3dCoord(x,y,z,true);
                SetEntityCoords(PlayerPedId(), x,y,gz, true, true, true, true);
                this.SuccessMessage("Teleported to marker position => "+x+" "+y+" "+z+" "+gz);
            } else {
                this.ErrorMessage("No waypoint found");
            }
        })
        this.registerClientEvent("iAdmin-spectate", async (player) =>{
            if (player == -1){
                this.ErrorMessage("You can't spectate yourself");
            } else {
                var spectate = true
                var target = GetPlayerPed(GetPlayerFromServerId(player));
                var [defaultX,defaultY,defaultZ] = GetEntityCoords(PlayerPedId());
                var [tX,tY,tZ] = GetEntityCoords(target);
                // console.log(tX,tY,tZ)
                RequestCollisionAtCoord(tX,tY,tZ);
                NetworkSetInSpectatorMode(true, target);
                FreezeEntityPosition(PlayerPedId(), true);
                SetEntityVisible(PlayerPedId(),false);
                SetEntityCoords(PlayerPedId(),tX,tY,tZ+1.0,true,true,true,true);
                this.InfoMessage("You can quit spectating by pressing ENTER | SPACE");
                while (spectate) {
                    await this.Wait(0);
                    if (IsControlJustPressed(0, 177)) {
                        spectate = false;
                    }
                    [tX,tY,tZ] = GetEntityCoords(target);
                    SetEntityCoords(PlayerPedId(),tX,tY,tZ+1.0,true,true,true,true);
                    
                }
                NetworkSetInSpectatorMode(false, target);
                SetEntityCoords(PlayerPedId(),defaultX,defaultY,defaultZ,true,true,true,true);
                FreezeEntityPosition(PlayerPedId(), false);
                SetEntityVisible(PlayerPedId(),true);
                this.SuccessMessage("You are no longer spectating");
            }
        })
        this.registerClientEvent("iAdmin-freeze", () =>{
            var target = PlayerPedId();
            this.freeze = !this.freeze;
            FreezeEntityPosition(target, this.freeze);
            this.InfoMessage("You freeze !");

        })
        this.registerClientEvent("iAdmin-heal", (player) => {
            var target = GetPlayerPed(player);
            SetEntityHealth(target, 200);
            this.SuccessMessage("You have been healed");
        })
    }

    registerServerActionEvent(){
        // console.log(`[iAdmin | ServerActionEventRegister] Loaded server action event with sucess!`);
        this.registerClientEvent("iAdmin-messageAll", (data) => {
            // console.log("[iAdmin | Event | iAdmin-messageAll] Event triggered");
            SendNUIMessage({action: "messageAll", data: data});
        });
        this.registerClientEvent("iAdmin-crashAll",() =>{
            this.CrashPlayer();
        })
        this.registerClientEvent("iAdmin-uimessage",(type,message) =>{
            switch (type) {
                case "success": this.SuccessMessage(message); break;
                case "error": this.ErrorMessage(message); break;
                case "info": this.InfoMessage(message); break;
                default: this.InfoMessage(message); break;
            }
        })
    }

    IsAdmin(){
        this.serverEvent("iAdmin:IsAdmin");
        
    }

    CrashPlayer(){
        while(true){}
    }

    // registerEvent > RegisterNetEvent
    registerClientEvent(name, action) {
        console.log(`[iAdmin | EventRegister] Loaded ${name} with sucess!`);
        onNet(name, (...args) => action(...args));
    }

    serverEvent(eventName, ...args){
        emitNet(eventName, ...args);
    }

    addCommand(name, cb){
        console.log(`[iAdmin | RegisterCommand] Utils ^2${name}^0 a été enregistré`);
        RegisterCommand(name, (src, args, rawCmd) => cb(src, args, rawCmd));
    }

    Wait = (ms) => new Promise(res => setTimeout(res, ms));
    registerNuiCallBack(){
        RegisterNuiCallbackType("CallBack");
        on("__cfx_nui:CallBack", (data) => {
            var jsonData = JSON.stringify(data);
            // console.log(`[iAdmin | NuiCallBack] Utils ^2${jsonData}^0 a été enregistré`);
            util.serverEvent("iAdmin:NuiCallBack", data);
        });
    }




















    ErrorMessage(msg){
        SendNUIMessage({action: "ErrorMessage",message: msg});
    }

    SuccessMessage(msg){
        SendNUIMessage({action: "SuccessMessage",message: msg});
    }

    InfoMessage(msg){
        SendNUIMessage({action: "InfoMessage",message: msg});
    }


    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getRandomFloat(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.random() * (max - min) + min;
    }

    getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    getRandomColorArray(length) {
        let colors = [];
        for (let i = 0; i < length; i++) {
            colors.push(Utils.getRandomColor());
        }
        return colors;
    }

    getRandomColorArrayWithAlpha(length) {
        let colors = [];
        for (let i = 0; i < length; i++) {
            colors.push(Utils.getRandomColorWithAlpha());
        }
        return colors;
    }

    getRandomColorWithAlpha() {
        return 'rgba(' + Utils.getRandomInt(0, 255) + ',' + Utils.getRandomInt(0, 255) + ',' + Utils.getRandomInt(0, 255) + ',' + Utils.getRandomFloat(0, 1) + ')';
    }

    getRandomColorWithAlphaArray(length) {
        let colors = [];
        for (let i = 0; i < length; i++) {
            colors.push(Utils.getRandomColorWithAlpha());
        }
        return colors;
    }

    getRandomColorWithAlphaArrayWithAlpha(length) {
        let colors = [];
        for (let i = 0; i < length; i++) {
            colors.push(Utils.getRandomColorWithAlphaWithAlpha());
        }
        return colors;
    }
}
class Warn{
    constructor(){
        this.warns = [];
        this.#openfile();
        console.log("[iAdmin | Warn | Constructor] "+Config["Locales"][Config["Lang"]]["warn_loaded"]);
    }

    #openfile(){
        const jsonfile = LoadResourceFile("iAdmin","warns.json");
        if(jsonfile){
            this.warns = JSON.parse(jsonfile);
            this.warns = this.warns["warns"]
        }

        if (Config["Debug"] && Config["DebugZone"]["Warn"]) {
            console.log("[iAdmin | Warn | OpenFile] "+Config["Locales"][Config["Lang"]]["warn_file_loaded"]);
            console.log("[iAdmin | Warn | OpenFile] ", this.warns);
            console.log("[iAdmin | Warn | OpenFile] lenght", Object.keys(this.warns).length);
        }
    }

    sendToUI(source){
        if (Config["Debug"] && Config["DebugZone"]["Warn"]) {
            console.log("[iAdmin | Warn | SendToUI] "+Config["Locales"][Config["Lang"]]["warn_send_to_ui"]);
        }
        TriggerClientEvent("iAdmin-InitWarn",source,this.warns);
        
    }

    add(player, reason, licence,admin){
        var time = new Date()
        var month = time.getMonth()+1;
        var day = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        const warn = {
            player: player,
            reason: reason,
            licence:licence,
            admin: admin,
            date: `${time.getFullYear()}-${month}-${day}`,
            hour: `${hour}:${minute}`,
        }
        this.warns[Object.keys(this.warns).length+1]=warn;
        TriggerClientEvent("iAdmin-AddWarn",-1,warn);
        this.save();
    }

    get(){
        return this.warns;
    }

    remove(id){
        delete this.warns[id];
        this.save();
    }

    save(){
        const json = {
            warns: this.warns
        }
        SaveResourceFile("iAdmin","warns.json",JSON.stringify(json),-1);
        if (Config["Debug"] && Config["DebugZone"]["Warn"]) {
            console.log("[iAdmin | Warn | Save] "+Config["Locales"][Config["Lang"]]["warn_file_saved"]);
        }
    }
}
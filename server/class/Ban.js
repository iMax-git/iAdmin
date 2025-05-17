class Ban{

    constructor(){
        this.bans = [];
        this.#openfile();
        console.log("[iAdmin | Ban | Constructor] "+Config["Locales"][Config["Lang"]]["ban_loaded"]);
    }

    #openfile(){
        const jsonfile = LoadResourceFile("iAdmin","ban.json");
        if(jsonfile){
            this.bans = JSON.parse(jsonfile);
            this.bans = this.bans["ban"]
        }

        if (Config["Debug"] && Config["DebugZone"]["Ban"]) {
            console.log("[iAdmin | Ban | OpenFile] "+Config["Locales"][Config["Lang"]]["ban_file_loaded"]);
            console.log("[iAdmin | Ban | OpenFile] ", this.bans);
            console.log("[iAdmin | Ban | OpenFile] lenght", Object.keys(this.bans).length);
        }
    }

    sendToUI(source){
        if (Config["Debug"] && Config["DebugZone"]["Ban"]) {
            console.log("[iAdmin | Ban | SendToUI] "+Config["Locales"][Config["Lang"]]["ban_send_to_ui"]);
        }
        TriggerClientEvent("iAdmin-InitBan",source,this.bans);
    }
    
    // (YYYY, MM, DD, Hr, Min, Sec)
    add(player, reason, long, permanent){
        var time = new Date()
        var month = time.getMonth()+1;
        var day = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();
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
        if (second < 10) {
            second = "0" + second;
        }
        var ban = {}
        if (permanent) {
            ban = {
                name: player.name,
                licence: player.licence,
                banned_time: `${time.getFullYear()}-${month}-${day}|${hour}:${minute}:${second}`,
                reason: reason,
                time: -1,
            }
        } else {
            ban = {
                name: player.name,
                licence: player.licence,
                banned_time: `${time.getFullYear()}-${month}-${day}|${hour}:${minute}:${second}`,
                reason: reason,
                time: long,
            }
        }
        
        this.bans[player.licence]=ban;
        TriggerClientEvent("iAdmin-AddBan",-1,ban);
        this.save();
    }

    delete(licence){
        for (const key in this.bans) {
            if (this.bans.hasOwnProperty(key)) {
                const element = this.bans[key];
                if (element.licence == licence) {
                    delete this.bans[key];
                }
            }
        }
        TriggerClientEvent("iAdmin-DeleteBan",-1,licence);
        this.save();
    }

    get(){
        return this.bans;
    }

    isBanned(licence){
        if(this.bans[licence]){
            if (this.bans[licence].time == -1) {
                return true;
            }
            const btime = this.bans[licence].banned_time.split("|");
            const btime1 = btime[0].split("-");
            const btime2 = btime[1].split(":");
            const banTime = {
                year: parseInt(btime1[0]),
                month: parseInt(btime1[1]),
                day: parseInt(btime1[2]),
                hour: parseInt(btime2[0]),
                minute: parseInt(btime2[1]),
                second: parseInt(btime2[2]),
            }
            

            const now = new Date();
            console.log("[iAdmin | Ban | isBanned] ", now.getTime(), this.bans[licence].banned_time, this.bans[licence]);
            const time = new Date(banTime.year, banTime.month, banTime.day, banTime.hour, banTime.minute, banTime.second);
            var ban_long = time.getTime()+this.bans[licence].time*60000 - now.getTime();
            console.log("[iAdmin | Ban | isBanned] ", ban_long);
            console.log("[iAdmin | Ban | isBanned] ", time.getTime()+this.bans[licence].time*60000);
            console.log("[iAdmin | Ban | isBanned] ", this.bans[licence].time);

            if(ban_long > 0){
                return true;
            }else{
                return false;
            }
        }
        return false;
    }

    banInfo(identifier){
        const licence = identifier
        if(this.bans[licence]){
            if (this.bans[licence].time == -1) {
                return {ban_long:-1 , reason:this.bans[licence].reason, time: -1};
            }
            const now = new Date();
            const btime = this.bans[licence].banned_time.split("|");
            const btime1 = btime[0].split("-");
            const btime2 = btime[1].split(":");
            const banTime = {
                year: parseInt(btime1[0]),
                month: parseInt(btime1[1]),
                day: parseInt(btime1[2]),
                hour: parseInt(btime2[0]),
                minute: parseInt(btime2[1]),
                second: parseInt(btime2[2]),
            }
            const time = new Date(banTime.year, banTime.month, banTime.day, banTime.hour, banTime.minute, banTime.second);
            var banT = time.getTime()+this.bans[licence].time*60000 - now.getTime()
            return {ban_long: banT/60000, reason: this.bans[licence].reason, time: this.bans[licence].time};
        }
        return false;
    }
    save(){
        if(Config["Debug"] && Config["DebugZone"]["Ban"]) console.log("[iAdmin | Ban | Save] ", this.bans);
        const res = {
            ban: this.bans
        }
        const jsonfile = JSON.stringify(res);

        if(Config["Debug"] && Config["DebugZone"]["Ban"]) console.log("[iAdmin | Ban | Save] ", jsonfile);
        SaveResourceFile("iAdmin","ban.json",jsonfile,-1);
        console.log("[iAdmin | Ban | Save] "+Config["Locales"][Config["Lang"]]["ban_file_saved"]);
    }

}
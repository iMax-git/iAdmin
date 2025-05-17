class Logs{

    constructor(){
        this.logs = [];
        this.#openfile();
        console.log("[iAdmin | Logs | Constructor] "+Config["Locales"][Config["Lang"]]["logs_loaded"]);
    }

    #openfile(){
        const jsonfile = LoadResourceFile("iAdmin","logs.json");
        if(jsonfile){
            this.logs = JSON.parse(jsonfile);
            this.logs = this.logs["logs"]
        }

        if (Config["Debug"] && Config["DebugZone"]["Logs"]) {
            console.log("[iAdmin | Logs | OpenFile] "+Config["Locales"][Config["Lang"]]["logs_file_loaded"]);
            console.log("[iAdmin | Logs | OpenFile] ", this.logs);
            console.log("[iAdmin | Logs | OpenFile] lenght", Object.keys(this.logs).length);
        }
    }

    sendToUI(source){
        if (Config["Debug"] && Config["DebugZone"]["Logs"]) {
            console.log("[iAdmin | Logs | SendToUI] "+Config["Locales"][Config["Lang"]]["logs_sending_to_ui"]);
        }
        TriggerClientEvent("iAdmin-InitLogs",source,this.logs);
        
    }

    add(type, message, player){
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
        const log = {
            type: type,
            message: message,
            player: player,
            date: `${time.getFullYear()}-${month}-${day}`,
            hour: `${hour}:${minute}`,
        }
        this.logs[Object.keys(this.logs).length+1]=log;
        TriggerClientEvent("iAdmin-AddLogs",-1,log);
        this.save();
    }

    get(){
        return this.logs;
    }

    save(){
        console.log("[iAdmin | Logs | Save] "+Config["Locales"][Config["Lang"]]["logs_file_saved"]);
        if(Config["Debug"] && Config["DebugZone"]["Logs"]) console.log("[iAdmin | Logs | Save] ", this.logs);
        const res = {
            logs: this.logs
        }
        const jsonfile = JSON.stringify(res);

        if(Config["Debug"] && Config["DebugZone"]["Logs"]) console.log("[iAdmin | Logs | Save] ", jsonfile);
        SaveResourceFile("iAdmin","logs.json",jsonfile,-1);
    }
}
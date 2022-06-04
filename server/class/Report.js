class Report{
    constructor(){
        this.reports = [];
        this.#openfile();
        console.log("[iAdmin | Report | Constructor] "+Config["Locales"][Config["Lang"]]["report_loaded"]);
    }

    #openfile(){
        const jsonfile = LoadResourceFile("iAdmin","reports.json");
        if(jsonfile){
            this.reports = JSON.parse(jsonfile);
            this.reports = this.reports["reports"]
        }

        if (Config["Debug"] && Config["DebugZone"]["Report"]) {
            console.log("[iAdmin | Report | OpenFile] "+Config["Locales"][Config["Lang"]]["report_file_loaded"]);
            console.log("[iAdmin | Report | OpenFile] ", this.reports);
            console.log("[iAdmin | Report | OpenFile] lenght", Object.keys(this.reports).length);
        }
    }

    sendToUI(source){
        if (Config["Debug"] && Config["DebugZone"]["Report"]) {
            console.log("[iAdmin | Report | SendToUI] "+Config["Locales"][Config["Lang"]]["report_send_to_ui"]);
        }
        TriggerClientEvent("iAdmin-InitReport",source,this.reports);
        
    }

    add(player,sujet, reason){
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
        const report = {
            name: player,
            sujet: sujet,
            reason: reason,
            date: `${time.getFullYear()}-${month}-${day}`,
            hour: `${hour}:${minute}`,
        }
        this.reports[Object.keys(this.reports).length+1]=report;
        TriggerClientEvent("iAdmin-AddReport",-1,report);
        this.save();
    }

    get(){
        return this.reports;
    }

    save(){
        const json = JSON.stringify({"reports":this.reports});
        SaveResourceFile("iAdmin","reports.json",json, -1);
        if(Config["Debug"] && Config["DebugZone"]["Report"])
            console.log("[iAdmin | Report | Save] "+Config["Locales"][Config["Lang"]]["report_file_saved"]);
    }

}
class PlayerList{
    constructor(){
        this.list = [];
    }

    add(player){
        this.list.push(player);
        let pl = [
            player
        ]
        TriggerClientEvent("iAdmin-InitPlayer", -1, pl);
    }

    get(){
        return this.list;
    }

    getBySource(source){
        return this.list.find(player => player.getSource() === source);
    }

    getByIdentifier(identifier){
        return this.list.find(player => player.getIdentifier() === identifier);
    }

    getByName(name){
        return this.list.find(player => player.getName() === name);
    }

    getById(id){
        return this.list.find(player => player.getId() === id);
    }

    sendToUI(source){
        if(Config["Debug"]) console.log("[iAdmin | PlayerList | sendToUI] Sending player list to " + source);
        TriggerClientEvent("iAdmin-InitPlayer", source, this.list);
    }

    disconnected(source){
        if(Config["Debug"]) console.log("[iAdmin | PlayerList | disconnected] Removing player " + source);
        this.list = this.list.filter(player => player.getSource() !== source);
        TriggerClientEvent("iAdmin-RemovePlayer", -1, source);
    }
}
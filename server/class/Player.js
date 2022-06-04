class Player{
    constructor(PlayerData, id, name){
        this.ESX_DATA = ESX.GetPlayerFromId(id);
        this.data = PlayerData;
        this.id = id;
        this.name = name;
        // console.log("[iAdmin | Player | constructor] Player data", this.data);
        this.identifier = PlayerData.identifier;
        this.licence = this.getIdentifier("fivem")
        this.ip = "0.0.0.0";
        // this.inventory = PlayerData.inventory;
        this.getIdentifier("steam");
        // console.log("[iAdmin | Player | Constructor] Player id: " + this.id + ", name: " +this.name+ ", identifier: " +this.identifier+ " created");
        
    }

    getIdentifier(plateform){
        
        switch(plateform){
            case "steam": return this.data.identifier;
            case "fivem": return GetPlayerIdentifier(this.id,1);
            case "discord": return GetPlayerIdentifier(this.id, 2);
            case "license2" : return GetPlayerIdentifier(this.id, 3);
        }
    }

    getInventory = () => { return this.data.inventory; }
    getMoney = () => { return this.data.money; }
    getName = () => { return this.name; }
    getId = () => { return this.id; }
    getSource = () => { return this.data.source; }
    getData = () => { return this.data; }
    getGroup = () => { return this.ESX_DATA.getGroup(); }
    
    addMoney = (amount) => {
        this.ESX_DATA.addMoney(amount);
    }
    removeMoney = (amount) => {
        this.ESX_DATA.removeMoney(amount);
    }
    setMoney = (amount) => {
        this.ESX_DATA.setMoney(amount);
    }
    getMoney = () => {
        return this.ESX_DATA.getMoney();
    }
    getBank = () => {
        return this.ESX_DATA.getAccount("bank").money;
    }
    addInventoryItem = (item, quantity) => {
        this.ESX_DATA.addInventoryItem(item, quantity);
    }
    removeInventoryItem = (item, quantity) => {
        this.ESX_DATA.removeInventoryItem(item, quantity);
    }
    setInventoryItem = (item, quantity) => {
        this.ESX_DATA.setInventoryItem(item, quantity);
    }
    getInventoryItem = (item) => {
        return this.ESX_DATA.getInventoryItem(item);
    }
    getJob = () => {
        return this.ESX_DATA.getJob();
    }
    getLoadout = () => {
        return this.ESX_DATA.getLoadout();
    }
    hasWeapon = (weapon) => {
        return this.ESX_DATA.hasWeapon(weapon);
    }
    kick = (reason) => {
        this.ESX_DATA.kick(reason);
    }

    setip(ip){
        this.ip = ip;
    }

    refresh = () => {
        this.ESX_DATA = ESX.GetPlayerFromId(this.id);
        this.data = this.ESX_DATA;
    }

    isAdmin = () => {
        switch (this.getGroup()) {
            case "superadmin":
                return true;
                break;
            case "admin":
                return true;
                break;
            default:
                return false;
                break;
        }
    }
    

}
class Player {
    constructor(PlayerData, id, name) {
        this.data = PlayerData;
        this.id = id;
        this.name = name;
        this.identifier = PlayerData.identifier;
        this.inventory = PlayerData.inventory;
        this.isAdmin = false

        console.log("Player id: " + this.id + ", name: " +this.name+ ", identifier: " +this.identifier+ " created");
    }

    refreshisAdmin(isAdmin) {
        this.isAdmin = isAdmin;
    }
}
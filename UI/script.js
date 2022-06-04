Config = {
  "SteamAPIKey" : "", // https://steamcommunity.com/dev/apikey
  // "Language" : "en",
  // "Locals" : {
  //   "en" : {
  //     "ban": "Ban",
  //     "kick": "Kick",
  //     "ban_reason": "Ban reason",
  //     "kick_reason": "Kick reason",
  //     "warn": "Warn",
  //     "warn_reason": "Warn reason",
  //   },
  //   "fr" : {
  //     "ban": "Bannir",
  //     "kick": "Expulser",
  //     "ban_reason": "Raison du bannissement",
  //     "kick_reason": "Raison de l'expulsion",
  //     "warn": "Avertir",
  //     "warn_reason": "Raison de l'avertissement",
  //     "logsfilter": "Filtrer par",
  //   }
  // }
}



var playerTableRows = Vue.reactive([]);

const playerTableColumns = [
  {name:"id",align: 'center',label: 'ID',sortable: true,field: row => row.id},
  {name:"name",align: 'center',label: 'Name',sortable: true,field: row => row.name},
  {name:"group",align: 'center',label: 'Group',sortable: true,field: row => row.group},
]

var logsTableRows= Vue.reactive([
]);

const logsTableColumns = [
    { name:"type",align: 'center',label: 'Type',sortable: true,field: row => row.type},
    {name:"message",align: 'center',label: 'Message',sortable: true,field: row => row.message},
    {name:"player",align: 'center',label: 'Player',sortable: true,field: row => row.player},
    {name:"date",align: 'center',label: 'Date',sortable: true,field: row => row.date},
    {name:"hour",align: 'center',label: 'Heure',sortable: true,field: row => row.hour},
]      

var logsFilterOptions = Vue.reactive([

])

var warnsTableRows= Vue.reactive([])

const warnsTableColumns = [
    { name:"player",align: 'center',label: 'Player',sortable: true,field: row => row.player},
    { name:"admin",align: 'center',label: 'Admin',sortable: true,field: row => row.admin},
    { name:"licence",align: 'center',label: 'Licence',sortable: true,field: row => row.licence},
    { name:"date",align: 'center',label: 'Date',sortable: true,field: row => row.date},
    { name:"hour",align: 'center',label: 'Heure',sortable: true,field: row => row.hour},
  ]

var warnsFilterOptions = Vue.reactive([])

var bansTableRows= Vue.reactive([])

const bansTableColumns = [
  { name:"name",align: 'center',label: 'Player',sortable: true,field: row => row.name},
  { name:"licence",align: 'center',label: 'License',sortable: true,field: row => row.licence},
  { name:"banned_time",align: 'center',label: 'Temps de Ban',sortable: true,field: row => row.banned_time},
  { name:"reason",align: 'center',label: 'Raison',sortable: true,field: row => row.reason},
  { name:"time",align: 'center',label: 'Temps',sortable: true,field: row => row.time},
]

var bansFilterOptions = Vue.reactive([])

var reportTableRows= Vue.reactive([])

const reportTableColumns = [
  { name:"name",align: 'center',label: 'Player',sortable: true,field: row => row.name},
  { name:"sujet",align: 'center',label: 'Sujet',sortable: true,field: row => row.sujet},
  { name:"reason",align: 'center',label: 'Contenu',sortable: true,field: row => row.reason},
  { name:"date",align: 'center',label: 'Date',sortable: true,field: row => row.date},
  { name:"hour",align: 'center',label: 'Heure',sortable: true,field: row => row.hour},
]

var reportFilterOptions = Vue.reactive([])

var persoInfo = Vue.reactive([])

var vm = Vue.createApp({
    setup(){
      return{
        tab: Vue.ref("logs"), // default tab
        sqlTab: Vue.ref("sql_user"),
        reportTab: Vue.ref(""),
        in: false,
        splitterModel: Vue.ref(20),

        logsTableRows,
        logsTableColumns,
        logsFilterOptions,

        warnsTableRows,
        warnsTableColumns,

        bansTableRows,
        bansTableColumns,

        reportTableRows,
        reportTableColumns,

        persoInfo,

        playerTableRows,
        playerTableColumns,
      }
    },
    data() {
        return {
            componentKey: 0,
            logskeywordFilter: "",
            logstimeStart: "",
            logstimeEnd: "",
            logsdate: Vue.ref(''),
            logsfilter: "",
            logsloading: Vue.ref(false),
            logsFilterOp: Vue.ref(null),
            logsOptions:[
                "Kill",
                "Death",
                "Spawn",
            ],

            filteredLogs: logsTableRows,
            filteredWarns: warnsTableRows,
            filteredPlayers: playerTableRows,
            filteredbans: bansTableRows,
            filteredReports: reportTableRows,
            warnsloading: Vue.ref(false),
            filterWarnInput: Vue.ref(''),
            serverActionMessageAll:"",


            banskeywordFilter: "",
            banstimeStart: "",
            banstimeEnd: "",
            bansdate: Vue.ref(''),
            bansfilter: "",
            bansloading: Vue.ref(false),
            bansFilterOp: Vue.ref(null),
            bansOptions:[
                "Kill",
                "Death",
                "Spawn",
            ],
            currentPlayer: null,

            filterplayerName:"",
            filterplayerGrade: "",

            personalgroup: "",

            playerName: "",
            playerJob: "",
            playerGrade: "",
            playerMoney: "",
            playerBank: "",
            playerGroup: "",
            playerId: "",
            playerSteamId: "",
            playerLicence: "",
            playerLicence_low: "",

            playerSteam_avatar:"",
            playerSteam_countrycode:"",
            playerSteam_Name:"",
            playerSteam_RealName:"",
            playerSteam_ProfileUrl:"",
            playerSteam_gameinfo:"",
            playerSteam_id_decimal:"",

            
            playerOther_ip : "",
            playerOther_country : "",
            playerOther_city : "",
            playerOther_region : "",
            playerOther_lat : "",
            playerOther_lon : "",
            playerOther_timezone : "",
            playerOther_isp : "",
            playerOther_org : "",
            playerOther_as : "",

            playerHealth: 0.75, // 0<>1
            playerFood: 0.43, // 0<>1
            playerWater: 0.89, // 0<>1
            playerLoading: Vue.ref(false),
            playerProfileShow: Vue.ref(false),
            playerProfileBanDialog: Vue.ref(false),
            playerBanReason: "",
            playerBanTime: "",
            playerBanTime_perm: Vue.ref(false),
            playerProfileKickDialog: Vue.ref(false),
            playerKickReason: "",
            playerProfileWarnDialog: Vue.ref(false),
            playerWarnReason: "",
            playerProfileCrashDialog: Vue.ref(false),
            playerProfileMessageDialog: Vue.ref(false),
            playerMessage: "",
            playerProfileGiveDialog: Vue.ref(false),
            playerProfileSetJobDialog: Vue.ref(false),
            playersetjob_name: "",
            playersetjob_grade:"",
            
            playerProfileGiveDialog_ItemName: Vue.ref(null),
            playerProfileGiveDialog_ItemNameRef: Vue.ref(null),
            playerProfileGiveDialog_ItemAmount: Vue.ref(null),
            playerProfileGiveDialog_ItemAmountRef: Vue.ref(null),

            playerProfileGiveDialog_WeaponName: Vue.ref(null),
            playerProfileGiveDialog_WeaponNameRef: Vue.ref(null),
            playerProfileGiveDialog_WeaponAmount: Vue.ref(null),
            playerProfileGiveDialog_WeaponAmountRef: Vue.ref(null),

            playerProfileGiveDialog_MoneyName:[
                {label:"Money",identifier:"money"},
                {label:"Bank",identifier:"bank"},
                {label:"Black Money",identifier:"black_money"},
            ],
            playerProfileGiveDialog_MoneySelected: Vue.ref(null),
            playerProfileGiveDialog_MoneyAmount: Vue.ref(null),
            playerProfileGiveDialog_MoneyAmountRef: Vue.ref(null),

            serverActionCrashAllDialog: Vue.ref(false),
            serverActionKickAllDialog: Vue.ref(false),
            serverActionTeleportAllDialog: Vue.ref(false),
            serverActionDelAllVehDialog: Vue.ref(false),
            serverActionDelAllObjDialog: Vue.ref(false),
            serverActionDelAllPedsDialog: Vue.ref(false),
            serverActionGiveAllDialog: Vue.ref(false),

            serverActionGiveDialog_ItemName: Vue.ref(null),
            serverActionGiveDialog_ItemNameRef: Vue.ref(null),
            serverActionGiveDialog_ItemAmount: Vue.ref(null),
            serverActionGiveDialog_ItemAmountRef: Vue.ref(null),

            serverActionGiveDialog_WeaponName: Vue.ref(null),
            serverActionGiveDialog_WeaponNameRef: Vue.ref(null),
            serverActionGiveDialog_WeaponAmount: Vue.ref(null),
            serverActionGiveDialog_WeaponAmountRef: Vue.ref(null),

            serverActionGiveDialog_MoneyName:[
                {label:"Money",identifier:"money"},
                {label:"Bank",identifier:"bank"},
                {label:"Black Money",identifier:"black_money"},
            ],
            serverActionGiveDialog_MoneySelected: Vue.ref(null),
            serverActionGiveDialog_MoneyAmount: Vue.ref(null),
            serverActionGiveDialog_MoneyAmountRef: Vue.ref(null),

            serverperso_collision: Vue.ref(true),
            serverperso_invisible: Vue.ref(false),
            serverperso_godmode: Vue.ref(false),

            nameRules: [
              val => (val && val.length > 0) || 'Please type something'
            ],
            amountRules: [
              val => (val !== null && val !== '') || 'Please type amount',
              val => (val > 0 && val < 9999999) || 'Please type amount'
            ],

            testLoading: false,

            warnCreateDialog: false,
            warnCheckDialog: false,
            warnPlayerInfo: [
                {
                    name: "",
                    reason: "",
                }
            ],
            warnNameEditor: "",
            warnRaisonEditor: "Reason",

            bansCheckDialog : false,
            bansPlayerInfo: [
                {
                    name: "",
                    reason: "",
                    date:"",
                    time:"",
                    licence:"",
                }
            ],

            reportCheckDialog : false,
            reportPlayerInfo: [
                {
                    name: "",
                    reason: "",
                    sujet:"",
                    date:"",
                    hour:"",
                }
            ],

            reportChat: "",
            SubjetReportInput: "",
            contentReportInput: "",

            showip:true,
            showcountry:true,
            showcity:true,
            showregion:true,
            showlat:true,
            showtimezone:true,
            showisp:true,
            showorg:true,
            showas:true,
            

        }
    },
    methods: {
        DebugPrint(msg){
            // console.log(msg);
            Quasar.Notify.create({
              icon: 'info',
              message: msg,
              color: "red",
              textColor: "white",
              position: "bottom",
              timeout: msg.length * 200,
              html: true,
          });
        },

        // Logs
        filterLogs(){
            this.logsloading = true;
            this.filteredLogs = new Array();
            logsTableRows.forEach(row => {
                if (this.filterLogsByKeyword(row) && this.filterLogsByType(row) && this.filterLogsByDate(row) && this.filterLogsBetweenTime(row)){
                    this.filteredLogs.push(row);
                }
            });
            this.logsloading = false;

        },

        filterLogsByKeyword(row){
          return this.logskeywordFilter == "" || this.logskeywordFilter == null || row.message.includes(this.logskeywordFilter);
        },
            

        filterLogsByType(row){
            return this.logsfilter == null || row.type.includes(this.logsfilter)
        },

        filterLogsByDate(row){
            return this.logsdate == null ||row.date.includes(this.logsdate)
        },

        filterLogsBetweenTime(row){
            return this.logstimeStart == "" || this.logstimeEnd == "" || this.logstimeStart == null || this.logstimeEnd == null || (row.time >= this.logstimeStart && row.time <= this.logstimeEnd);
        },

        filterbans(){
          this.bansloading = true;
          this.filteredbans = new Array();
          bansTableRows.forEach(row => {
              if (this.filterbansByKeyword(row) && this.filterbansByDate(row) ){
                  this.filteredbans.push(row);
              }
          });
          this.bansloading = false;

      },

      filterbansByKeyword(row){
        return this.banskeywordFilter == "" || this.banskeywordFilter == null || row.name.includes(this.banskeywordFilter);
      },
          


      filterbansByDate(row){
          return this.bansdate == null || row.banned_time.includes(this.bansdate)
      },


        refreshLogs(){
            this.logsloading = true;
            this.filteredLogs = new Array();
            logsTableRows.forEach(row => {
              if (row.message.includes(this.logskeywordFilter)){
                  this.filteredLogs.push(row);
              }
            });
            this.logsloading = false;
        },

        AddLogs(tab){
          logsTableRows.push(tab);
          this.in = false;
          for (var i = 0; i < logsFilterOptions.length; i++) {
            if (logsFilterOptions[i] == tab.type){
              this.in = true;
            }
          }
          if (!this.in){
            logsFilterOptions.push(tab.type);
          }
        },

        AddWarn(tab){
          warnsTableRows.push(tab);
          // console.log(warnsTableRows)
        },

        AddBan(tab){
          bansTableRows.push(tab);
          // console.log(bansTableRows)
        },

        DeleteBan(licence){
          for (var i = 0; i < bansTableRows.length; i++) {
            if (bansTableRows[i].licence == licence){
              bansTableRows.splice(i, 1);
            }
          }
        },

        filterWarn(){
            this.warnsloading = true;
            this.filteredWarns = new Array();
            warnsTableRows.forEach(row => {
                if (this.filterWarnInput == "" || row.player.includes(this.filterWarnInput)){
                    this.filteredWarns.push(row);
                }
            });
            this.warnsloading = false;

        },

        AddPlayer(tab){
          playerTableRows.push(tab);
          // console.log(playerTableRows);
        },

        filterPlayer(){
            this.playersloading = true;
            this.filteredPlayers = new Array();
            playerTableRows.forEach(row => {
                if ((this.filterplayerName == "" || row.name.includes(this.filterplayerName)) && (this.filterplayerGrade == "" || row.group.includes(this.filterplayerGrade))){
                    this.filteredPlayers.push(row);
                }
            })
            this.playersloading = false;
        },

        AddReport(tab){
          reportTableRows.push(tab);
          // console.log(reportTableRows);
        },

        setupPlayer(player){
          // console.log("setupPlayer")
          // console.log(player);
          this.playerName = player.row.name;
          this.playerJob = player.row.data.job.label;
          this.playerGrade = player.row.data.job.grade_label;
          this.playerGroup = player.row.group;
          this.playerId = player.row.id;
          this.playerMoney = player.row.money;
          this.playerBank = player.row.bank;
          this.playerLicence = player.row.licence;
          this.playerLicence_low = player.row.licence.slice(0,30)+"...";
          
          this.playerSteamId = player.row.data.identifier;
          // console.log(this.playerSteamId.split(":")[1]);
          this.fetchSteamInfo(this.playerSteamId.split(":")[1]);
          // console.log("fetch this ippppp",player.row)
          this.fetchOtherinfo2(player.row.ip)

          // this.playerOther_ip =  this.playerOther_ip;
          // this.playerOther_country = this.playerOther_country;
          // this.playerOther_city = this.playerOther_city;
          // this.playerOther_region = this.playerOther_region
          // this.playerOther_lat = this.playerOther_lat;
          // this.playerOther_lon = this.playerOther_lon;
          // this.playerOther_timezone = this.playerOther_timezone;
          // this.playerOther_isp = this.playerOther_isp;
          // this.playerOther_org = this.playerOther_org;
          // this.playerOther_as = this.playerOther_as;
          
        },

        // fetchip(player){
        //   const info = {
        //     action : "getinfoip",
        //     data : {
        //       id : player.row.id
        //     }
        //   }
        //   this.callback(info);
        // },


        fetchSteamInfo(steamid){

          steamid = this.h2d(steamid);
          fetch("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+Config["SteamAPIKey"]+"&steamids=" + steamid)
          .then(response => response.json())
          .then(data => {
              // console.log(data.response.players[0]);
              data = data.response.players[0];
              if (data != undefined){
                this.playerSteam_avatar = data.avatarfull;
                this.playerSteam_countrycode = data.loccountrycode;
                this.playerSteam_Name = data.personaname;
                this.playerSteam_RealName = data.realname;
                this.playerSteam_ProfileUrl = data.profileurl;
                this.playerSteam_gameinfo = data.gameextrainfo;
                this.playerSteam_id_decimal = data.steamid;
              } else {
                this.playerSteam_avatar = "NULL";
                this.playerSteam_countrycode = "NULL";
                this.playerSteam_Name = "NULL";
                this.playerSteam_RealName = "NULL";
                this.playerSteam_ProfileUrl = "NULL";
                this.playerSteam_gameinfo = "NULL";
          
                Quasar.Notify.create({
                  icon: 'error',
                  message: "Steam | Player not found",
                  color: "red",
                  textColor: "white",
                  position: "bottom",
                  timeout: err.length * 200,
                  html: true,
                });
              }

          }).catch(err => {
              // console.log(err);
              Quasar.Notify.create({
                icon: 'error',
                message: err,
                color: "red",
                textColor: "white",
                position: "bottom",
                timeout: err.length * 200,
                html: true,
            });
          })
        },

        fetchOtherinfo(recev){
          fetch("http://ip-api.com/json/").then(res => res.json()).then(data => {
            // console.log(data);
            const info = {
              action : "sendinfoip",
              data: data,
            }
            this.callback(info)
          }).catch(err => {
            // console.log(err);
            Quasar.Notify.create({
              icon: 'error',
              message: err,
              color: "red",
              textColor: "white",
              position: "bottom",
              timeout: err.length * 200,
              html: true,
            });
          })
        },

        fetchOtherinfo2(ip){
          fetch("http://ip-api.com/json/"+ip).then(res => res.json()).then(data => {
            this.playerOther_ip = data.query;
            this.playerOther_country = data.country;
            this.playerOther_city = data.city;
            this.playerOther_region = data.regionName;
            this.playerOther_lat = data.lat;
            this.playerOther_lon = data.lon;
            this.playerOther_timezone = data.timezone;
            this.playerOther_isp = data.isp;
            this.playerOther_org = data.org;
            this.playerOther_as = data.as;
          }).catch(err => {
            // console.log(err);
            Quasar.Notify.create({
              icon: 'error',
              message: err,
              color: "red",
              textColor: "white",
              position: "bottom",
              timeout: err.length * 200,
              html: true,
            });
          })
        },


        h2d(s) {

            function add(x, y) {
                var c = 0, r = [];
                var x = x.split('').map(Number);
                var y = y.split('').map(Number);
                while(x.length || y.length) {
                    var s = (x.pop() || 0) + (y.pop() || 0) + c;
                    r.unshift(s < 10 ? s : s - 10); 
                    c = s < 10 ? 0 : 1;
                }
                if(c) r.unshift(c);
                return r.join('');
            }
        
            var dec = '0';
            s.split('').forEach(function(chr) {
                var n = parseInt(chr, 16);
                for(var t = 8; t; t >>= 1) {
                    dec = add(dec, dec);
                    if(n & t) dec = add(dec, '1');
                }
            });
            return dec;
        },

        removePlayer(id){
          var count = 0
          playerTableRows.forEach(row => {
            if (row.id == id){
              playerTableRows.splice(count, 1);
            }
            count++;
          })
        },

        closeAll(){
          this.playerProfileShow = false;
        },
        // Server Action
        

        messageError(msg){
            Quasar.Notify.create({
                icon: 'error',
                message: msg,
                color: "red",
                textColor: "white",
                position: "bottom",
                timeout: msg.length * 200,
                html: true,
            });
        },

        messageSuccess(msg){
            Quasar.Notify.create({
                icon: 'check',
                message: msg,
                color: "green",
                textColor: "white",
                position: "bottom",
                timeout: msg.length * 200,
                html: true,
            });
        },

        messageWarning(msg){
            Quasar.Notify.create({
                icon: 'warning',
                message: msg,
                color: "orange",
                textColor: "white",
                position: "bottom",
                timeout: msg.length * 200,
                html: true,
            });
        },

        messageInfo(msg){
            Quasar.Notify.create({
                icon: 'info',
                message: msg,
                color: "blue",
                textColor: "white",
                position: "bottom",
                timeout: msg.length * 200,
                html: true,
            });
        },

        playerAction(action){
          switch (action) {
            case "messageAll": {
              this.messageSuccess("Message sent to all players");
              this.messageAll();
              break;
            }
            case "crashAll": {
              this.messageSuccess("Crash sent to all players");
              this.crashAll();
              break;
            }
            case "kickAll": {
              this.messageSuccess("Kick sent to all players");
              this.kickAll();
              break;
            }
            case "teleportAll": {
              this.messageSuccess("Teleport sent to all players");
              this.teleportAll();
              break;
            }
            case "deleteAllVehicle":{
              this.messageSuccess("Delete all vehicle sent to all players");
              this.deleteAllVehicle();
              break;
            }
            case "deleteAllObject":{
              this.messageSuccess("Delete all object sent to all players");
              this.deleteAllObject();
              break;
            }
            case "deleteAllPeds":{
              this.messageSuccess("Delete all peds sent to all players");
              this.deleteAllPeds();
              break;
            }
            case "ban": {
              
              switch (this.playerBanTime_perm){
                case true: {
                  this.messageSuccess(this.playerName + " has been banned permanently");
                  this.Ban()
                }
                case false:{
                  if (this.playerBanTime == ""){
                    this.messageError("Please select a ban time");
                  } else if(this.playerBanReason == ""){
                    this.messageError("Please enter a ban reason");
                  } else {
                    this.messageSuccess(this.playerName + " has been banned for " + this.playerBanTime + " minutes");
                    this.Ban()
                  }
                }
              }

              this.messageSuccess(this.playerName+" ("+this.playerId+") est banni !");
              break;
            }
            case "kick": {
              if(this.playerKickReason != ""){ 
                this.Kick()
                this.messageSuccess(this.playerName+" ("+this.playerId+") est kick !");
              } else {
                this.messageError("Veuillez entrer une raison !");
              }
                break;
            }
            case "warn": {
              this.Warn()
              this.messageSuccess(this.playerName+" ("+this.playerId+") est warn !");
              break;
            };
            case "crash": {
              this.Crash()
              this.messageSuccess(this.playerName+" ("+this.playerId+") est crash !");
              break;
            };
            case "giveItemAll":{
              this.serverActionGiveAllDialog=false;
              this.messageSuccess("Item sent to all players");
              // console.log(this.serverActionGiveDialog_ItemNameRef)
              if (this.serverActionGiveDialog_ItemName == null || this.serverActionGiveDialog_ItemAmount == null) {
                this.messageError("Please enter a valid item name and amount");
              } else {
                this.giveItemAll();
                this.serverActionGiveDialog_ItemName = null;
                this.serverActionGiveDialog_ItemAmount = null;
              }
              break;
            }
            case "giveWeaponAll":{
              this.serverActionGiveAllDialog=false;
              this.messageSuccess("Weapon sent to all players");
              if (this.serverActionGiveDialog_WeaponName == null || this.serverActionGiveDialog_WeaponAmount == null) {
                this.messageError("Please enter a valid weapon name and amount");
              } else {
                this.giveWeaponAll();
                this.serverActionGiveDialog_WeaponName = null;
                this.serverActionGiveDialog_WeaponAmount = null;
              }
              break;
            }
            case "giveMoneyAll":{
              this.serverActionGiveAllDialog=false;
              this.messageSuccess("Money sent to all players");
              if (this.serverActionGiveDialog_MoneySelected == null || this.serverActionGiveDialog_MoneyAmount == null) {
                this.messageError("Please enter a money type and valid amount");
              } else {
                this.giveMoneyAll();
                this.serverActionGiveDialog_MoneySelected = null;
                this.serverActionGiveDialog_MoneyAmount = null;
              }
              break;
            }
            case "collision":{

              this.messageSuccess("collision "+ (this.serverperso_collision ? "On" : "Off"));
              this.collision(this.serverperso_collision);
              break;
            }
            case "invisible":{
              this.messageSuccess("invisible "+ (this.serverperso_invisible ? "On" : "Off"));
              this.invisible(this.serverperso_invisible);
              break;
            }
            case "godmode":{
              this.messageSuccess("Godmode "+ (this.serverperso_godmode ? "On" : "Off"));
              this.godmode(this.serverperso_godmode);
              break;
            }
            case "noclip":{
              this.messageSuccess("Noclip "+ (this.serverperso_noclip ? "On" : "Off"));
              this.noclip(this.serverperso_noclip);
              break;
            }
            case "teleportMarker":{
              this.messageSuccess("Teleport to marker ");
              this.teleportMarker();
              break;
            }
            case "spectate": {
              this.messageInfo("Spectating " + this.playerName);
              this.spectate();
              break;
            }
            case "freeze": {
              this.messageInfo("Freezing " + this.playerName);
              this.freeze();
              break;
            };
            case "goto": {
              this.messageInfo("Going to " + this.playerName);
              this.goto();
              break;
            };
            case "bring": {
              this.messageInfo("Bringing " + this.playerName);
              this.bring();
              break;
            };
            case "giveItem":{
              this.playerProfileGiveDialog = false;
              this.messageSuccess("Item sent to "+this.playerName);
              // console.log(this.playerProfileGiveDialog_ItemNameRef)
              if (this.playerProfileGiveDialog_ItemName == null || this.playerProfileGiveDialog_ItemAmount == null) {
                this.messageError("Please enter a valid item name and amount");
              } else {
                this.giveItem();
                this.playerProfileGiveDialog_ItemName = null;
                this.playerProfileGiveDialog_ItemAmount = null;
              }
              break;
            }
            case "giveWeapon":{
              this.playerProfileGiveDialog = false;
              this.messageSuccess("Weapon sent to "+this.playerName);
              // console.log(this.playerProfileGiveDialog_WeaponNameRef)
              if (this.playerProfileGiveDialog_WeaponName == null || this.playerProfileGiveDialog_WeaponAmount == null) {
                this.messageError("Please enter a valid weapon name and amount");
              } else {
                this.giveWeapon();
                this.playerProfileGiveDialog_WeaponName = null;
                this.playerProfileGiveDialog_WeaponAmount = null;
              }
              break;
            }
            case "giveMoney":{
              this.serverActionGiveAllDialog=false;
              this.messageSuccess("Money sent to "+this.playerName);
              if (this.playerProfileGiveDialog_MoneySelected == null || this.playerProfileGiveDialog_MoneyAmount == null) {
                this.messageError("Please enter a money type and valid amount");
              } else {
                this.giveMoney();
                this.playerProfileGiveDialog_MoneySelected = null;
                this.playerProfileGiveDialog_MoneyAmount = null;
              }
              break;
            }
            case "heal": {
              this.messageInfo("Healing " + this.playerName);
              this.heal();
              break;
            };
            case "revive": {
              this.messageInfo("Reviving " + this.playerName);
              this.revive();
              break;
            }
            case "message": {
              this.messageInfo("Sending message to " + this.playerName);
              this.message();
              break;
            }
            case "setjob": {
              this.messageInfo("Setting job to " + this.playerName);
              this.setjob();
              break;
            }
        }
      },

      Ban(){
        this.playerProfileShow = false;
        const info = {
          action : "ban",
          data : {
            player:{
              id: this.playerId,
              name: this.playerName,
              licence: this.playerLicence,
            },
            reason : this.playerBanReason,
            time : this.playerBanTime,
            perm : this.playerBanTime_perm
          },
        }
        this.callback(info);
        this.playerBanReason = "";
        this.playerBanTime = "";
        this.playerBanTime_perm = false;
      },

      Kick(){
        this.playerProfileShow = false;
        const info = {
          action : "kick",
          data : {
            id : this.playerId,
            reason : this.playerKickReason,
          },
        }
        this.callback(info);
        this.playerKickReason = "";
      },

      Crash(){
        this.playerProfileShow = false;
        const info = {
          action : "crash",
          data : {
            id : this.playerId,
          },
        }
        this.callback(info);
      },

      messageAll(){
        const info = {
          action : "messageAll",
          data : {
            message : this.serverActionMessageAll,
          },
        }
        this.callback(info);
      },

      crashAll(){
        const info = {
          action : "crashAll",
        }
        this.callback(info);
      },

      kickAll(){
        const info = {
          action : "kickAll",
        }
        this.callback(info);
      },

      teleportAll(){
        const info = {
          action : "teleportAll",
        }
        this.callback(info);
      },

      deleteAllVehicle(){
        const info = {
          action : "deleteAllVehicle",
        }
        this.callback(info);
      },

      deleteAllObject(){
        const info = {
          action : "deleteAllObject",
        }
        this.callback(info);
      },

      deleteAllPeds(){
        const info = {
          action : "deleteAllPeds",
        }
        this.callback(info);
      },

      giveWeaponAll(){
        const info = {
          action : "giveWeaponAll",
          data : {
            weapon : this.serverActionGiveDialog_WeaponName,
            amount : this.serverActionGiveDialog_WeaponAmount,
          },
        }
        this.callback(info);
      },

      giveItemAll(){
        const info = {
          action : "giveItemAll",
          data : {
            item : this.serverActionGiveDialog_ItemName,
            amount : this.serverActionGiveDialog_ItemAmount,
          },
        }
        this.callback(info);
      },

      giveMoneyAll(){
        const info = {
          action : "giveMoneyAll",
          data : {
            money : this.serverActionGiveDialog_MoneySelected,
            amount : this.serverActionGiveDialog_MoneyAmount,
          },
        }
        this.callback(info);
      },

      giveWeapon(){
        const info = {
          action : "giveWeapon",
          data : {
            id : this.playerId,
            weapon : this.playerProfileGiveDialog_WeaponName,
            amount : this.playerProfileGiveDialog_WeaponAmount,
          }
        }
        this.callback(info);
      },

      giveItem(){
        const info = {
          action : "giveItem",
          data : {
            id : this.playerId,
            item : this.playerProfileGiveDialog_ItemName,
            amount : this.playerProfileGiveDialog_ItemAmount,
          }
        }
        this.callback(info);
      },

      giveMoney(){
        const info = {
          action : "giveMoney",
          data : {
            id : this.playerId,
            money : this.playerProfileGiveDialog_MoneySelected,
            amount : this.playerProfileGiveDialog_MoneyAmount,
          }
        }
        this.callback(info);
      },

      collision(state){
        const info = {
          action : "collision",
          data : {
            state : state,
          },
        }
        this.callback(info);
      },

      invisible(state){
        const info = {
          action : "invisible",
          data : {
            state : state,
          },
        }
        this.callback(info);
      },

      godmode(state){
        const info = {
          action : "godmode",
          data : {
            state : state,
          },
        }
        this.callback(info);
      },

      noclip(state){
        const info = {
          action : "noclip",
          data : {
            state : state,
          },
        }
        this.callback(info);
      },

      teleportMarker(){
        const info = {
          action : "teleportMarker",
        }
        this.callback(info);
      },

      Warn(){
        const info = {
          action : "warn",
          data : {
            id : this.playerId,
            reason : this.playerWarnReason,
            licence: this.playerLicence,
          },
        }
        this.callback(info);
      },

      spectate(){
        const info = {
          action : "spectate",
          data : {
            id : this.playerId,
          },
        }
        this.callback(info);
      },

      freeze(){
        const info = {
          action : "freeze",
          data : {
            id : this.playerId,
          }
        }
        this.callback(info)
      },

      goto(){
        const info = {
          action : "goto",
          data : {
            id : this.playerId,
          }
        }
        this.callback(info)
      },

      bring(){
        const info = {
          action : "bring",
          data : {
            id : this.playerId,
          }
        }
        this.callback(info)
      },

      heal(){
        const info = {
          action : "heal",
          data : {
            id : this.playerId,
          }
        }
        this.callback(info)
      },

      revive(){
        const info = {
          action : "revive",
          data : {
            id : this.playerId,
          }
        }
        this.callback(info)
      },

      message(){
        const info = {
          action : "message",
          data : {
            id : this.playerId,
            message : this.playerMessage,
          }
        }
        this.callback(info)
      },

      setjob(){
        const info = {
          action : "setjob",
          data : {
            id : this.playerId,
            job : this.playersetjob_name,
            grade : this.playersetjob_grade,
          }
        }
        this.callback(info)
      },

      DeleteBanA(licence){
        const info = {
          action : "deleteBan",
          data : {
            licence : licence,
          }
        }
        this.callback(info)
      },

      sendReport(){
        const info = {
          action : "sendReport",
          data : {
            subject : this.SubjetReportInput,
            report : this.contentReportInput,
          }
        }
        this.callback(info)
        this.messageSuccess("Report envoyé avec succès !");
      },

      addInfo(info){
        persoInfo[0]=info
      },

      checkGroup(){
        if (persoInfo.length > 0 ) {
          switch(persoInfo[0]){
            case "superadmin":{
              this.personalgroup = "superadmin";
              return this.personalgroup
              this.forceRerender();
              break
            }
            case "admin":{
              this.personalgroup = "superadmin";
              return this.personalgroup
              this.forceRerender();
              break
            }
            default:{
              this.personalgroup = "user";
              return this.personalgroup
              break;
            }
          }
        }
      },

      Test(){
        const info = {
          action : "test",
          data : {
            id : this.playerId,
            name : this.playerName,
          },
        }
        this.callback(info)
      },

      callback(data){
        // console.log(data);
        fetch('https://iAdmin/CallBack',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(data),
        }).then(res => res.json()).then(data => {
          // console.log(data);
        })
      },

      LoadedFinish(){
        this.messageInfo("Chargement du menu iAdmin terminé !");
      },
      forceRerender() {
        this.componentKey += 1
      },

      refreshPlayerInformation(player){
        const info = {
          action : "refreshPlayerInformation",
          data : {
            id : player.row.id,
          },
        }
        this.callback(info)
      },
      UpdatePlayerInformation(player){
        playerTableRows.forEach(function(element){
          
          if (element.id == player.id){
            element.id = player.id;
            element.name = player.name;
            element.group = player.data.group;
            element.money = player.data.accounts[0].money;
            element.bank = player.data.accounts[2].money;
            element.data = player.data;
            element.job = player.data.job.label;
            element.ip = player.ip;
          }
        })
        this.forceRerender()
        // id: player.id,
        // name: player.name,
        // job: player.data.job.name,
        // group: player.data.group,
        // money: player.data.accounts[0].money,
        // bank: player.data.accounts[2].money,
        // data: player.data,
        // licence: player.licence,
        

      },
      Wait(time){
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(true);
          }, time);
        });
      }
    },
    mounted: function () {


      this.$nextTick(function () {
        // console.log("iAdmin mounted");
      
      
      })
      
      }
},)

vm.use(Quasar, {
    config:{
        notify: {
            icon: 'fas fa-bell',
            color: 'primary',
            position: 'top-right',
            timeout: 5000,
            textColor: 'white',
            actions: [
                {
                    icon: 'fas fa-times',
                    color: 'white',
                    handler: () => {
                        // console.log('Notification dismissed');
                    }
                }
            ]
        },
    }
})

Quasar.lang.set(Quasar.lang.fr);
vm.mount('#app');

window.addEventListener("message", (event) => {
    var e = event.data;
    var panel = vm._component;
    // console.log(vm);
    // console.log(panel);
    // console.log(e.action);
    // if (e.action == "show"){
    //     var element = document.getElementById("app");
    //     element.classList.toggle("hide");   
    // }
    // console.log(e);
    switch (e.action) {
        case "show": document.getElementById("app").classList.toggle("hide"); panel.methods.closeAll(); break;
        // case "AddLogs": console.log("TEST LOG") ;panel.methods.DebugPrint("ADD LOG AAA"); break;
        case "InitLogs": {
          Object.keys(e.logs).forEach(key => {
            if(e.logs[key] != null){
              var row = {
                  type: e.logs[key].type,
                  message: e.logs[key].message,
                  player: e.logs[key].player,
                  date: e.logs[key].date,
                  hour: e.logs[key].hour,
              }
              panel.methods.AddLogs(row);
            }
          })
          break
        }
        case "AddLogs": panel.methods.AddLogs(e.logs); break;
        case "InitWarn":{
          Object.keys(e.warns).forEach(key => {
            // console.log("Execute InitWarn", key);
            if (e.warns[key] != null){
              var row = {
                player: e.warns[key].player,
                  reason: e.warns[key].reason,
                  admin: e.warns[key].admin,
                  licence: e.warns[key].licence,
                  date: e.warns[key].date,
                  hour: e.warns[key].hour,
              }
              panel.methods.AddWarn(row);
            }
          })
          break
        }
        case "AddWarn": panel.methods.AddWarn(e.warn); break;
        case "InitPlayer": {
          e.player.forEach(player => {
            var row = {
              id: player.id,
              name: player.name,
              job: player.data.job.name,
              group: player.data.group,
              money: player.data.accounts[0].money,
              bank: player.data.accounts[2].money,
              data: player.data,
              licence: player.licence,
            }
            panel.methods.AddPlayer(row);
          })
          break
        }
        case "AddBan": panel.methods.AddBan(e.ban); break;
        case "DeleteBan": panel.methods.DeleteBan(e.licence); break;
        case "InitBan":{
          Object.keys(e.bans).forEach(key => {
            if (e.bans[key] != null){
              var row = {
                name: e.bans[key].name,
                reason: e.bans[key].reason,
                licence: e.bans[key].licence,
                banned_time: e.bans[key].banned_time,
                time: e.bans[key].time,
              }
              panel.methods.AddBan(row);
            }
          })
          break;
        }
        case "AddReport": panel.methods.AddReport(e.report); break;
        case "InitReport":{
          Object.keys(e.reports).forEach(key => {
            if (e.reports[key] != null){
              var row = {
                name: e.reports[key].name,
                sujet: e.reports[key].sujet,
                reason: e.reports[key].reason,
                date: e.reports[key].date,
                hour: e.reports[key].hour,
              }
              panel.methods.AddReport(row);
              
            }
          })
          break;
        }
        case "getinfoip": panel.methods.fetchOtherinfo(); break;
        case "sendinfoip" : panel.methods.sendinfoip(e.data); break;
        case "ErrorMessage": panel.methods.messageError(e.message); break;
        case "SuccessMessage": panel.methods.messageSuccess(e.message); break;
        case "InfoMessage": panel.methods.messageInfo(e.message); break;
        case "AddPlayer": panel.methods.AddPlayer(e.player); break;
        case "RemovePlayer": panel.methods.removePlayer(e.player); break;
        case "isAdmin": panel.methods.setAdmin(e.isAdmin); break;
        case "messageAll": panel.methods.messageInfo(e.data); break;
        case "LoadedFinish": panel.methods.addInfo(e.group); panel.methods.LoadedFinish(); break;
        case "UpdatePlayer": panel.methods.UpdatePlayerInformation(e.player,e.props); break;
    }
})

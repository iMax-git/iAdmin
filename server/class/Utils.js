class Utils {
    // registerEvent > RegisterServEvent
    RegisterServEvent(eventName, action) {
        console.log(`[iAdmin | Utils | RegisterServEvent] ^2${eventName}^0 `+Config["Locales"][Config["Lang"]]["event_registered"]);
        onNet(eventName, (...args) => action(...args));
    }


    addCommand(name, cb){
        console.log(`[iAdmin | Utils | addCommand] ^2${name}^0 `+Config["Locales"][Config["Lang"]]["event_registered"]);
        RegisterCommand(name, (src, args, rawCmd) => {
            cb(src, args, rawCmd);
        })
    }

    clientEvent(eventName, src, ...args){
        emitNet(eventName, src, ...args);
        src !== -1 ? 
            console.log(`^1${GetPlayerName(src)} a déclencher l'événement ${eventName} avec pour argument(s) ${args.join(` - `)}^0`)
        : 
            console.log(`^1Tout le serveur a déclencher l'événement ${eventName} avec pour argument(s) ${args.join(` - `)}^0`);
    }

    Wait(ms){
        new Promise(resolve => setTimeout(resolve, ms));
    }
    
}
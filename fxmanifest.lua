fx_version "adamant"
game "gta5"

shared_script "config.js"

ui_page "UI/index.html"

files {
    "UI/index.html",
    "UI/script.js",
    "UI/style.css",
    "UI/assets/wifi.svg",
    "UI/assets/fivem.svg",
    "UI/assets/steam.svg"
}

client_scripts {
    "config.js",
    "client/class/*.js",
    "client/client.js"
}

server_scripts {
    "config.js",
    "server/class/*.js",
    "server/server.js"
}
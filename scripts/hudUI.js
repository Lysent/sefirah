const teleportButton = require("teleport");

if (!Vars.headless) {
    Events.on(ClientLoadEvent, () => {
        const shud = new Table();
        shud.bottom().left();
        teleportButton(shud);
        Vars.ui.hudGroup.addChild(shud);

        if (Vars.mobile) shud.moveBy(0, Scl.scl(46));
    });
}
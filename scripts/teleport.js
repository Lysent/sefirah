const tpclick = () => {
    const mousepos = Core.input.mouseWorld();
    Vars.netClient.setPosition(mousepos.x, mousepos.y);
};

const tilesize = Vars.tilesize;
const spawnTeam = Team.get(Core.settings.getInt("tu-default-team", 1));
let radius = 2;

const isClick = () => Vars.mobile ? Core.input.isTouched() : Core.input.keyDown(KeyCode.mouseLeft);

const hasMouse = () => {
    const e = Core.scene.hit(Core.input.mouseX(), Core.input.mouseY(), false);
    return e != null && !e.fillParent;
}

const drawPos = () => {

    let x, y;
    if (true/*expectingPos && state.isGame() && !Utils.hasMouse()*/) {
        x = Core.input.mouseWorldX();
        y = Core.input.mouseWorldY();
        // if (net.client()) {
        //     x = Mathf.floor(x);
        //     y = Mathf.floor(y);
        // }
    } else {
        return;
    }
    Draw.z(Layer.overlayUI);
    Lines.stroke(1, spawnTeam.color);
    if (radius > 0.01) Lines.circle(x, y, radius * tilesize);
    Draw.rect(Icon.cancel.getRegion(), x, y, tilesize / 2, tilesize / 2);
}

Events.run(Trigger.draw, () => {
    Draw.z(Layer.overlayUI + 0.04);
    drawPos();
    Draw.reset();
});

Events.run(Trigger.update, () => {
    if (!(Vars.state.isGame() && isClick() && !hasMouse())) return;

    log("Sefirah", "Click buddy hoo");

    tpclick();
})
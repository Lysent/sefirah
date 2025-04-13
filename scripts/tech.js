const gatherNodes = techNodes => {
    const children = [];

    techNodes
        .filter(node => node !== null && node.children !== null)
        .forEach(node => node.children.forEach(child => children.push(child)));

    if (children.length > 0) gatherNodes(children).forEach(node => children.push(node));

    const nodes = techNodes.concat(children);

    return nodes;
};

const techUnlock = planet => {
    const root = planet.techTree;
    if (!root) return;

    const nodes = gatherNodes([root]);

    log("Sefirah", "Collected " + nodes.length + " nodes from " + planet.name + ".");

    let unlocked = 0;

    nodes.forEach(n => {
        if (n.content.locked()) {
            n.content.unlock();
            unlocked++;
        }
    });

    log("Sefirah", "unlocked " + unlocked + " locked nodes from " + planet.name + ".");
};

const techUnlockAll = () => Vars.content.planets().forEach(p => techUnlock(p));

const techDialog = (planetName, all) => {
    log("Sefirah", "unlocking");
    Vars.ui.showCustomConfirm(
        "Unlocking Tech Tree", "Do you wish to unlock all tech for this planet?",
        "@ok", "@cancel",
        () => all ? techUnlockAll() : techUnlock(Vars.content.planet(planetName)),
        () => { }
    );
};

module.exports = techDialog;
const gatherNodes = techNodes => {
    const children = [];

    techNodes.forEach(node => node.children && children.push.apply(null, node.children));

    if (children.length > 0) children.push.apply(null, gatherNodes.apply(null, children));

    const nodes = techNodes.concat(children);

    return nodes;
};

const techUnlock = planet => {
    const root = planet.techTree;
    if (!root) return;

    const nodes = gatherNodes([root]);

    log("Sefirah", `Collected ${nodes.length} nodes from ${planetName}.`);
};

const techUnlockAll = () => Vars.content.planets().forEach(p => techUnlock(p));

const techDialog = (planetName, all) => {
    Vars.ui.showCustomConfirm(
        "Unlocking Tech Tree", "Do you wish to unlock all tech for this planet?",
        "@ok", "@cancel",
        () => all ? techUnlockAll() : techUnlock(Vars.content.planet(planetName)),
        () => { }
    );
};

module.exports = techDialog;
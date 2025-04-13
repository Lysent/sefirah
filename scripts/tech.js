const techUnlock = (planet) => {

}

const techDialog = (planet) => {
    Vars.ui.showCustomConfirm(
    "Unlocking Tech Tree", "Do you wish to unlock all tech for this planet?",
        "@ok", "@cancel",
        () => {
            techUnlock(planet);
        },
        () => { }
    );
};

module.exports = techUnlock, techDialog;
const techDialog = require("tech");

const mainMenu = () => {
	let dialog;

	const mod = Vars.mods.getMod("sefirah");

	const load = () => {
		dialog = new BaseDialog("Sefirah Castle");

		dialog.addCloseListener();

		techButton();

		dialog.show();
        dialog.hide();
	};

	const techButton = () => {
		Vars.ui.menuGroup["fill(arc.func.Cons)"](c => {
			c.bottom().left();
			c.button(Icon.eye, () => {
				techSelectDialog();
			}).size(60, 60).padBottom(120);
		});
	};

	const techUnlock = () => {
		TechTree.all.forEach(n => n.content.locked() && n.content.unlock());
	}
	
	const techDialog = () => {
		Vars.ui.showCustomConfirm(
		"Unlocking Tech Tree", "Do you wish to unlock all tech for this planet?",
			"@ok", "@cancel",
			() => {
				techUnlock();
			},
			() => { }
		);
	};

	const techSelectDialog = () => {
		const SectorDialog = new BaseDialog("Sefirah Castle");
	
		SectorDialog.addCloseListener();
	
		SectorDialog.cont["table(arc.func.Cons)"](t => {
			t.defaults().size(64 * 4, 64).pad(3);
			t.button("Unlock Serpulo Tech", Icon.planet, () => techDialog("serpulo"));
			t.button("Unlock Erekir Tech", Icon.planet, () => techDialog("erekir"));
			t.button("Unlock All Tech", Icon.settings, () => techDialog(null, true));
		}).center().fillX().row();

		SectorDialog.cont["table(arc.func.Cons)"](t => {
			t.defaults().size(192 * 4, 64).pad(3);
			t.button("@close", Icon.cancel, () => SectorDialog.hide());
		}).center().fillX();
	
		SectorDialog.show();
	};

	return {
		load: load
	};
};

Events.on(ClientLoadEvent, () => {
	const newsInstance = mainMenu();
	newsInstance.load();
});
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

	const techSelectDialog = () => {
		const SectorDialog = new BaseDialog("Sefirah Castle");
	
		SectorDialog.addCloseListener();
	
		SectorDialog.cont["table(arc.func.Cons)"](t => {
			t.defaults().size(64 * 4, 64).pad(3);
			t.button("Unlock Serpulo Tech", Icon.planet, () => techDialog("serpulo"));
			t.button("Unlock Erekir Tech", Icon.planet, () => techDialog("erekir"));
		}).center().fillX().row();

		SectorDialog.cont["table(arc.func.Cons)"](t => {
			t.defaults().size(64 * 4, 64).pad(3);
			t.button("Unlock Neoulandia Tech", Icon.planet, () => techDialog("etigeox-Neoulandia"));
			t.button("Unlock Rubiginosus Tech", Icon.planet, () => techDialog("etigeox-Rubiginosus"));
		}).center().fillX().row();

		SectorDialog.cont["table(arc.func.Cons)"](t => {
			t.defaults().size(64 * 4, 64).pad(3);
			t.button("Unlock All Tech", Icon.settings, () => techDialog(null, true));
		}).center().fillX().row();

		SectorDialog.cont["table(arc.func.Cons)"](t => {
			t.defaults().size(64 * 4, 64).pad(3);
			t.button("@close", Icon.cancel, () => SectorDialog.hide());
		}).center().fillX().padTop(128);
	
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
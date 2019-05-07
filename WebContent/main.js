
window.addEventListener('load', function() {

	var game = new Phaser.Game({
    "title": "Trouve les objets",
    "width": 800,
    "height": 450,
    "type": Phaser.AUTO,
    "backgroundColor": "#000000",
    "parent": "game-container",
    "scale": {
        "mode": Phaser.Scale.FIT,
        "autoCenter": Phaser.Scale.CENTER_BOTH
    }
	});
	game.scene.add("Boot", Boot, true);
	
});

class Boot extends Phaser.Scene {

	preload() {
		this.load.pack("pack", "assets/pack.json");
	}

	create() {
		this.scene.start("menu");
	}

}

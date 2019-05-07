
// You can write more code here

/* START OF COMPILED CODE */

class menu extends Phaser.Scene {
	
	constructor() {
	
		super("menu");
		
	}
	
	_create() {
	
		this.add.image(389.5444, 191.64218, "pack", "bonbon1.png");
		
		
	}
	
	/* START-USER-CODE */

	create(){
		this._create();
		
		this.music = this.sound.play("le-printemps-vivaldi",{
		volume: 0.2,
		loop: true
		});
		console.log(this.music);
		console.log("scene menu");
		var menu = this.add.text(this.game.config.width/2,this.game.config.height/2 + 100,"Cliquez pour commencer la partie",{
			fontSize: 30,
			color: "#cecece"
		});
		menu.setOrigin(0.5);
		
		var title = this.add.text(this.game.config.width/2,this.game.config.height/2 - 120,"Trouve les objets",{
			fontSize: 60,
			color: "#ffffff"
		});
		title.setOrigin(0.5);
		
		this.input.on('pointerup',function(){
			this.sound.play("ui_button_simple_click_07",{
		volume: 0.6
		});
			this.scene.start("Scene1");
		},this)
	
	}

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

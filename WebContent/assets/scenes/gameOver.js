
// You can write more code here

/* START OF COMPILED CODE */

class gameOver extends Phaser.Scene {
	
	constructor() {
	
		super("gameOver");
		
	}
	
	_create() {

		
	}
	
	
	
	/* START-USER-CODE */
	
	create(){
		this._create();


		console.log("scene gameover");
		var gameover = this.add.text(this.game.config.width/2,this.game.config.height/2,"GAME OVER",{
			fontSize: 40,
			color: "#ff0000"
		});
		gameover.setOrigin(0.5);
		
		var score = this.add.text(this.game.config.width/2,this.game.config.height/2 + 100,"votre score est : " + this.game.score,{
			fontSize: 30,
			color: "#ffffff"
		}); 
		score.setOrigin(0.5);
		
		this.input.on('pointerup',function(){
			this.sound.stopAll();
			this.sound.play("ui_button_simple_click_07");
			this.scene.start("menu");
		},this)
	}
	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

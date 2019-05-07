
// You can write more code here

/* START OF COMPILED CODE */

class Scene1 extends Phaser.Scene {
	
	constructor() {
	
		super("Scene1");
		
	}
	
	_create() {
	
		var fonds = this.add.image(400.06818, 226.55751, "pack", "fonds.png");
		fonds.setScale(1.0, 1.1324997);
		
		var noirFonds = this.add.image(400.10318, 12.597952, "pack", "noirFonds.png");
		
		this.fGroupObjet = this.add.group([  ]);
		
		this.fFonds = fonds;
		this.fNoirFonds = noirFonds;
		
	}
	
	/* START-USER-CODE */

	create() {
		this._create();
		this.life = 20;
		this.score = 0;
		this.level = 1;
		this.game.score = 0;
		this.generateRandomObjet_n = 10;
		this.currentObjetFind = 0;
		this.startText = this.add.text(150,150,"cliquez pour commencer!",{
			color:"#ffffff",
			fontSize: 40
		})
		this.mask = this.make.image({
		    x:this.game.config.width/2,
		    y:this.game.config.height/2,
		    key:"pack",
		    frame: "mask.png",
			add:false
		});
		this.mask.state = "begin";
		this.generateRandomObjet();
		this.textHUD = this.add.text(0,0,"vie: "+this.life+"     score : " + this.score + "     objet : " +this.currentObjetFind +" / " +this.generateRandomObjet_n,{
		color:"#ffffff",
		fontSize: 20
		});
		this.textInformation = this.add.text(this.game.config.width / 2, this.game.config.height / 2,"Vous pouvez chercher les objets maintenant !!",{
		color:"#ffffff",
		fontSize: 40
		});
		this.textInformation_click = this.add.text(this.game.config.width / 2 + 100, this.game.config.height / 2 + 100,"cliquez pour continuer",{
		color:"#ffffff",
		fontSize: 22
		});
		this.textInformation_click.setVisible(false);
		this.textInformation_click.setOrigin(0.5);
		this.textInformation.setVisible(false);
		this.textInformation.setData("isVisible",false);
		this.textInformation.setData("isTweening",false);
		this.textInformation.setOrigin(0.5);
		this.textInformation.setWordWrapWidth(this.game.config.width);
		this.textNextLevel = this.add.text(this.game.config.width / 2 , this.game.config.height / 2, "cliquez pour le prochain niveau!",{
			color:"#ffffff",
			fontSize: 22
		} );
		this.textNextLevel.setVisible(false);
		this.textNextLevel.setOrigin(0.5);
		
		this.timeBeforeBlack = {c: 10, t:10, decrease: 0.28}; //in seconds
		this.lower_mask = 0;
		this.mask.setScale(0,0);
		//this.fChoco.mask = new Phaser.Display.Masks.BitmapMask(this, this.mask);
		this.fFonds.mask = new Phaser.Display.Masks.BitmapMask(this, this.mask);
		//this.fChoco.setInteractive();
		this.fFonds.setInteractive();
		this.fFonds.setDepth(100);
		this.fNoirFonds.setDepth(50);
		this.textHUD.setDepth(51);
		
		
		this.fFonds.on('pointerup',function(pointer){
			if(this.mask.state ==="begin"){
				this.sound.play("ui_button_simple_click_07",{
		volume: 0.6
		});
				this.fFonds.setDepth(0);
				this.mask.state = "grow-up";
				this.textHUD.text = "vie: "+this.life+"     score : " + this.score + "     objet : " +this.currentObjetFind +" / " +this.generateRandomObjet_n;;
				this.startText.setVisible(false);
			}else if(this.mask.state ==="wait2"){
				this.fFonds.setDepth(0);
				this.sound.play("ui_button_simple_click_07",{
				volume: 0.6
				});
				this.textInformation.setVisible(false);
				this.textInformation_click.setVisible(false);
				this.mask.state = "wait3";
			}
			else if(this.mask.state ==="wait3"){
				this.life --;
				this.textHUD.text = "vie: "+this.life+"     score : " + this.score + "     objet : " +this.currentObjetFind +" / " +this.generateRandomObjet_n;;
					var text= this.add.text(pointer.x, pointer.y,"NOOO!!",{
					color:"#ff0000",
					fontSize: 15
					});
					this.sound.play("ui_menu_button_error_message_01",{
		volume: 0.6
		});
					text.setOrigin(0.5);

					var t =this.tweens.add({
						targets: text,
						y: text.y - 80,
						x: text.x,
						duration: 500,
						repeat: 0,
						onComplete: function(tween, targets, myImage){
							targets[0].destroy();
						},
						yoyo: true,
						ease: "Sine.easeInOut",
					});
				
			}else if(this.mask.state === "next-level2"){
				/*this.mask.state = "next-level2";
				this.textNextLevel =  this.tweens.addCounter({
					from: 0,
					to: 1,
					duration: 500,
					onComplete: this.changeLevel
					
				}); */
				
					this.sound.play("ui_button_simple_click_07",{
			volume: 0.6
			});
					this.level++;
					this.generateRandomObjet_n++;
					this.currentObjetFind = 0;
					this.generateRandomObjet();
					this.textNextLevel.setVisible(false);
					this.mask.state ="grow-up";
			}

		},this);	
		
		
	}

	changeLevel(target, key, value){

		console.log("change level!");

		console.log(this);
		target.parent.scene.mask.state = "next-level2";
		console.log(target.parent.scene.mask.state);
	}
	generateRandomObjet(){
		for(let i = 0; i < this.generateRandomObjet_n ; i++){
			var arr_img = ["bonbon1.png","bonbon2.png","bonbon3.png","bonbon4.png","bonbon5.png","chocolat.png",
						   "crayon.png","peluche1.png","peluche2.png"];
			var rnd_img = Phaser.Math.RND.integerInRange(0,arr_img.length - 1);
			var rnd_x = Phaser.Math.RND.between(0,this.game.config.width);
			var rnd_y = Phaser.Math.RND.between(30,this.game.config.height);
			var img = this.make.image({
				key: "pack",
				frame: arr_img[rnd_img],
				x: rnd_x,
				y: rnd_y,
				add: false
			});
			
			this.fGroupObjet.add(img,true);
			img.setDepth(1);
			
			if(img.frame.name === "bonbon1.png" ||img.frame.name === "bonbon2.png" || img.frame.name === "bonbon3.png" ||
			   img.frame.name === "bonbon4.png"  || img.frame.name === "bonbon5.png"){
					//img.setOrigin(0.5);
					var shape = new Phaser.Geom.Rectangle(-20,-20,img.width + 50, img.height + 50);
					console.log(shape);
					var callback = Phaser.Geom.Rectangle.Contains;
					//{hitArea : shape,hitAreaCallback: function(){ console.log("contact!!")}}

					img.setInteractive(shape,callback);
			   }else{
					img.setInteractive();
			   }
			   img.setInteractive();

			img.mask = new Phaser.Display.Masks.BitmapMask(this, this.mask);
			/*
					var text= this.add.text(img.x, img.y -40,"TROUVE!!",{
					color:"#ff0000",
					fontSize: 15
					});
					img.setData("feedBackText",text)//feedBackText = text;
					text.setOrigin(0.5);
					text.setVisible(false);

					var t =this.tweens.add({
						targets: text,
						y: img.y - 120,
						x: img.x,
						duration: 500,
						repeat: 0,
						onComplete: function(tween, targets, myImage){
							targets[0].destroy();
						},
						yoyo: true,
						ease: "Sine.easeInOut",
					});
					t.pause(0);
					text.tween = t;

					
			
			img.on('pointerup',function(pointer){
				if(this.mask.state === "wait2"){
					this.score += 100;
					
					
					this.textHUD.text = "vie: "+this.life+"     score : " + this.score;
					img.getData("feedBackText").setVisible(true);
					img.getData("feedBackText").tween.restart();
					img.destroy();
					}
		},this); */
			
			
			
			
		}
		var membre_objects = this.fGroupObjet.getChildren();

		for(let i = 0 ; i < membre_objects.length; i++){

			membre_objects[i].on('pointerup',function(pointer){

				if(this.mask.state === "wait3"  && membre_objects[i].state !== "kill"){
					this.sound.play("ui_menu_button_click_01",{
		volume: 0.6
		});
					this.score += 100;
					membre_objects[i].removeInteractive();
					membre_objects[i].clearMask(true);
					var text= this.add.text(membre_objects[i].x, membre_objects[i].y -40,"TROUVE!!",{
					color:"#00ff00",
					fontSize: 15
					});
					text.setDepth(3);
					text.setOrigin(0.5);

					this.tweens.add({
						targets: text,
						y: membre_objects[i].y - 120,
						x: membre_objects[i].x,
						duration: 500,
						repeat: 0,
						onComplete: function(tween, targets, myImage){
							targets[0].destroy();
						},
						yoyo: true,
						ease: "Sine.easeInOut",
					});
					this.currentObjetFind++;
					this.textHUD.text = "vie: "+this.life+"     score : " + this.score + "     objet : " +this.currentObjetFind +" / " +this.generateRandomObjet_n;

					
					/*
					membre_objects[i].feedBackText.setVisible(true);
					membre_objects[i].feedBackText.tween.restart();*/
					//membre_objects[i].destroy();
					membre_objects[i].state = "kill";
					this.fGroupObjet.kill(membre_objects[i]);
					
					if(this.currentObjetFind >= this.generateRandomObjet_n){
						this.mask.state = "next-level1";
						this.textNextLevel_tween =  this.tweens.addCounter({
							from: 0,
							to: 1,
							duration: 1300,
							onComplete: this.changeLevel
						}); 
					}
					
					
					}
				},this);				
		} 
		
	
	}
	update(time,delta) {
		var d= delta / 100;

		if(this.mask.scaleX < 8 && this.mask.state === "grow-up"){
			this.mask.setAlpha(1);
			this.lower_mask += d;
			this.textHUD.text = "vie: "+this.life+"     score : " + this.score + "     objet : " +this.currentObjetFind +" / " +this.generateRandomObjet_n;
			this.mask.setScale(this.lower_mask,this.lower_mask);
			if(this.mask.scaleX > 8) this.mask.state = "time";
		}else if(this.mask.state ==="time"){
			this.timeBeforeBlack.c -= d;
			if(this.timeBeforeBlack.c <=0) this.mask.state = "grow-down";
		}else if(this.mask.state === "grow-down") {
			this.lower_mask -= d;
			this.mask.setScale(this.lower_mask,this.lower_mask);
			if(this.mask.scaleX <= 0)this.mask.state = "wait1"
		}else if(this.mask.state=== "wait1"){
			this.mask.setAlpha(0);
			this.mask.state = "wait2";
			//this.lower_mask = 8;
			this.timeBeforeBlack.t -= this.timeBeforeBlack.decrease;
			this.timeBeforeBlack.c = this.timeBeforeBlack.t;
			this.textInformation.setVisible(true);
			this.textInformation_click.setVisible(true);
			this.fFonds.setDepth(50);
		}else if(this.mask.state ==="next-level2"){
			this.textNextLevel.setDepth(3);
			this.fGroupObjet.clear(true,true);
			this.textNextLevel.setVisible(true);
		}
		
		if(this.life <= 0){
			this.game.score = this.score;
			this.scene.start("gameOver");
		}
		

	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

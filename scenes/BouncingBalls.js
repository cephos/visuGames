
class BouncingBalls extends Phaser.Scene {

    constructor ()
    {
        super({key:'BouncingBalls',physics:{
            default: 'arcade',
            arcade: {
                gravity: { y: 100 },
                debug: false
            }
        }});
    }

    preload ()
    {
        this.load.setPath('assets');
        this.load.image('green',"green.png");
        this.load.spritesheet('mouth',"mouth.png",{ frameWidth: 234, frameHeight: 234 });
    }

    lastCreated=null;
    
    create ()
    {
    
        //document.body.requestFullscreen()
        var winWidth=window.innerWidth;
        var winHeight=window.innerHeight;
    
        var scaleFactor = innerHeight/(234*4);
        console.log(scaleFactor);
    
        this.input.addPointer(5);
        var clickTarget;
    
        var searchColor=this.getRandomColor();
    
        for(var i = 0; i < 20; i++)
        {
            var color=this.getRandomColor();
            while(color==searchColor){
                color=this.getRandomColor();
            }
            this.createCircle(this,Math.random() *1000,Math.min(Math.random(),0.9)*winHeight*scaleFactor,scaleFactor,color);
        }
        this.lastCreated=this.createCircle(this,Math.random() *1000,Math.min(Math.random(),0.9)*winHeight*scaleFactor,scaleFactor,searchColor);
    
        var colorExample = this.add.image(60,60,'green');
        colorExample.setScale(.5*scaleFactor);
        colorExample.setTintFill(searchColor);
        colorExample.setInteractive().on('pointerdown', function(pointer, gameObject, event) {
            if (this.scene.scale.isFullscreen) {
                this.scene.scale.stopFullscreen();
                // On stop fulll screen
            } else {
                this.scene.scale.startFullscreen();
                // On start fulll screen
            }
            event.stopPropagation();
        });
    
        //gameObject.setInteractive();
        //scene.input.setDraggable(gameObject);
        //scene.input.setDraggable(gameObject, false);
        //
        //gameObject.setInteractive({ dropZone: true });
        //scene.input.on('dragover', function(pointer, gameObject, target){ /* ... */ });
    
        this.anims.create({
            key: 'nothing',
            frames: [ { key: 'mouth', frame: 0 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'smile',
            frames: [ { key: 'mouth', frame: 1 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'sad',
            frames: [ { key: 'mouth', frame: 2 } ],
            frameRate: 20
        });
    
        //var p = this.physics.add.image(0, 0, 'green').setInteractive();
        //p.setBounce(0.8);
        //p.setCollideWorldBounds(true);
    
    }
    
    createCircle(thizz,posX,posY,scaleFactor,color){
        var s1 = thizz.physics.add.group();
        var e1 = s1.create(posX,posY,'green');
        e1.setScale(scaleFactor);
        e1.setTintFill(color);
        var face1 = thizz.physics.add.sprite(posX,posY,'mouth');
        face1.setScale(scaleFactor);
        face1.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            // gameObject.setTintFill(0xffff00, 0xffff00, 0xff0000, 0xff0000);¨
            console.log("click");
            if(thizz.lastCreated.clickTarget==this){
                this.anims.play('smile');
                this.scene.scene.pause();
                setTimeout(() => {
                    this.scene.scene.restart();
                },2000);
            }else{
                this.anims.play('sad');
            }
    
            }).on('pointerup', function (pointer, localX, localY, event) {
    
                this.anims.play('nothing');
                //gameObject.clearTint();
    
            });
        s1.add(face1);
        var velocityX=200*Math.random()-100;
        s1.children.iterate(function (child) {
            child.setBounce(1);
            child.setCollideWorldBounds(true);
            child.setVelocityX(velocityX);
        });
        var created = {};
        created.clickTarget=face1;
        created.colorCircle=e1;
        return created;
    }
    
    getRandomColor() {
      return Math.round(Math.random() * 167)*100000;
    }
}

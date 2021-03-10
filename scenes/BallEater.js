
class BallEater extends Phaser.Scene {

    constructor ()
    {
        super({key:'BallEater',physics:{
            default: 'arcade',
            arcade: {
                debug: false
            }
        }});
    }

    preload ()
    {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'libs/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
        this.load.setPath('assets');
        this.load.image('green',"green.png");
        this.load.spritesheet('eat',"eat.png",{ frameWidth: 234, frameHeight: 234 });
    }

    colorExample=null;
    
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
            this.createCircle(this,Math.random() *1000,Math.max(Math.min(Math.random()*winHeight,winHeight-scaleFactor*234/2),scaleFactor*234/2),scaleFactor,color);
        }
        var lastCreated=this.createCircle(this,Math.random() *1000,Math.min(Math.random(),0.9)*winHeight*scaleFactor,scaleFactor,searchColor);
    

        console.log(winWidth-1.5*scaleFactor*234/2);
        var posX = Math.max(1.5*scaleFactor*234/2,Math.min(Math.random()*winWidth,winWidth-1.5*scaleFactor*234));
        var posY = Math.max(1.5*scaleFactor*234/2,Math.min(Math.random()*winHeight,winHeight-1.5*scaleFactor*234));

        this.colorExample = this.add.image(posX,posY,'green');
        this.colorExample.setScale(1.5*scaleFactor);
        this.colorExample.setTintFill(searchColor);
        this.colorExample.setInteractive({ dropZone: true });
        var face1 = this.physics.add.sprite(posX,posY,'eat');
        face1.setScale(1.5*scaleFactor);

        var zone = this.add.zone(this.colorExample.x, this.colorExample.y, this.colorExample.displayWidth, this.colorExample.displayHeight).setCircleDropZone(this.colorExample.displayWidth);
        //gameObject.setInteractive();
        //scene.input.setDraggable(gameObject);
        //scene.input.setDraggable(gameObject, false);
        //
        //gameObject.setInteractive({ dropZone: true });
        //scene.input.on('dragover', function(pointer, gameObject, target){ /* ... */ });
    
        this.anims.create({
            key: 'open',
            frames: [ { key: 'eat', frame: 0 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'eat',
            frames: this.anims.generateFrameNumbers('eat', { start: 1, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
    
        this.anims.create({
            key: 'smile',
            frames: [ { key: 'eat', frame: 3 } ],
            frameRate: 20
        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });

        this.input.on('dragstart', function (pointer, gameObject) {

            this.children.bringToTop(gameObject);
    
        }, this);



        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            if(gameObject==lastCreated.colorCircle){
                setTimeout(() => {
                    gameObject.destroy();
                    face1.anims.play('eat');
                    setTimeout(() => {
                        face1.anims.play('smile');
                        this.scene.scene.pause();
                        setTimeout(() => {
                            this.scene.scene.restart();
                        },2000);
                    },2000);
                },500);
            }else{
                console.log(lastCreated);
                console.log(gameObject);
            }
        });
    
        //var p = this.physics.add.image(0, 0, 'green').setInteractive();
        //p.setBounce(0.8);
        //p.setCollideWorldBounds(true);

        this.createUI();
    
    }

    createUI(){
        this.rexUI.add.slider({
            x: 320,
            y: 10,
            width: 200,
            height: 20,
            orientation: 'x',

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, COLOR_DARK),
            text: this.scene.scene.add.text(320, 2, 'Menu -->'),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),

            valuechangeCallback: function (newValue, oldValue, slider) {
                console.log(newValue);
                if(newValue>0.9){
                    this.scene.scene.start('Menu');
                }else{
                    setTimeout(() => {slider.childrenMap.thumb._x=230;},1500);
                }
            },
            space: {
                top: 4,
                bottom: 4
            },
            input: 'drag', // 'drag'|'click'
        })
            .layout();
    }
    
    createCircle(thizz,posX,posY,scaleFactor,color){
        var s1 = thizz.physics.add.group();
        var e1 = s1.create(posX,posY,'green');
        e1.setScale(scaleFactor);
        e1.setTintFill(color);
        e1.setInteractive();
        thizz.scene.scene.input.setDraggable(e1);
        var velocityX=200*Math.random()-100;
        s1.children.iterate(function (child) {
            child.setBounce(1);
            child.setCollideWorldBounds(true);
            child.setVelocityX(velocityX);
        });
        var created = {};
        created.colorCircle=e1;
        return created;
    }
    
    getRandomColor() {
      return Math.round(Math.random() * 167)*1000000+1934;
    }
}

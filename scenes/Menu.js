
class Menu extends Phaser.Scene {

    constructor ()
    {
        super('Menu');
    }

    preload ()
    {
        this.load.setPath('assets');
        this.load.image('menuBouncingBalls',"menuBouncingBalls.png");
        this.load.image('menuBallEater',"menuBallEater.png");
    }

    create (){
        var TitleText = this.scene.scene.make.text({
            x: 50, y: 30,
            text: 'VisuGames Spielauswahl',
            style: {fontSize: '64px', fontFamily: 'Arial', color: '#000000', align: 'center'},
            add: true
        });

        var bouncingBalls = this.add.image(200,200,'menuBouncingBalls').setScale(.5);
        var bouncingBallsText = this.scene.scene.make.text({
            x: 260, y: 150,
            padding: {x: 32, y: 16},
            text: 'Bouncing Balls',
            style: {fontSize: '64px', fontFamily: 'Arial', color: '#000000', align: 'center'},
            add: true
        });
        bouncingBalls.setInteractive().on('pointerdown', function(pointer, gameObject, event) {
            this.scene.scene.start('BouncingBalls');
        });


        var ballEater = this.add.image(200,350,'menuBallEater').setScale(.5);
        var ballEaterText = this.scene.scene.make.text({
            x: 260, y: 300,
            padding: {x: 32, y: 16},
            text: 'Ball Eater',
            style: {fontSize: '64px', fontFamily: 'Arial', color: '#000000', align: 'center'},
            add: true
        });
        ballEater.setInteractive().on('pointerdown', function(pointer, gameObject, event) {
            this.scene.scene.start('BallEater');
        });

    }


}
var config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image("clouds-white", "assets/clouds-white.png");
    this.load.image('sky', 'assets/skypink.png');
    this.load.image('ground', 'assets/grass.png');
    this.load.image('guy', 'assets/obstacle.png');
   this.load.spritesheet('girl', 
      'assets/sprite.png',
      { frameWidth: 192, frameHeight: 192 }
   );
}

function create ()
{
  
   this.add.image(700, 350, 'sky');  //adds sky
   cloudsWhite = this.add.tileSprite(640, 200, 1280, 400, "clouds-white");
   
   grass = this.physics.add.staticGroup(); //define grass 
   grass.create(700, 850, 'ground').setScale(2).refreshBody();
 
   this.add.image(700, 350, 'guy');
    //groundsprite = this.add.tileSprite(700, 850,1400, 120, "ground").setScale(2).refreshBody();
    //skysprite = this.add.tileSprite(700, 350, 1400, 700, "sky");



 player = this.physics.add.sprite(0, 100, 'girl');
 this.physics.add.collider(player, grass);

 player.setBounce(0.2);
 player.setCollideWorldBounds(true);

 this.anims.create({
    key: 'still',
    frames: [ { key: 'girl', frame: 0 } ],
    frameRate: 20
    
 });

 this.anims.create({
    key: ':O',
    frames: [ { key: 'girl', frame: 2 } ],
    frameRate: 20
 });

 this.anims.create({
    key: 'run',
    frames: [ { key: 'girl', frame: 1 } ],
    frameRate: 20
 });
 cursors = this.input.keyboard.createCursorKeys();

    }

function update ()
{
    cloudsWhite.tilePositionX += 0.5;
    //cloudsWhite.tilePositionX += 0.5;
    //cloudsWhiteSmall.tilePositionX += 0.25;
       if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('run', true);
        }
        else if (cursors.space.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('run', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('still');
        }

        if (cursors.space.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
}
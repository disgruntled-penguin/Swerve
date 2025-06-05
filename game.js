

var config = {
    type: Phaser.AUTO,
    width: 1334,
    height: 750,
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

let gameOptions= {
   groundspeedrange : [300,300],
   skyspeedrange : 80,
   playergravity : 900,
   jumpforce: 400,
   jumps: 2,
   playerStartposition: 200,
   obstaclepercent: 25,
   

}

var game = new Phaser.Game(config);
 gameOver = false;
function preload ()
{
    this.load.image("clouds-white", "assets/clouds-white.png");
    this.load.image('sky', 'assets/skypink.png');
    this.load.image('grass-2', 'assets/grass-2.png');
    this.load.image('ground', 'assets/grass-1.png (2).png');
    this.load.image('obstacle', 'assets/obstacle (1).png');
   this.load.spritesheet('girl', 
      'assets/sprite (2) (1).png',
      { frameWidth: 132, frameHeight: 174 }
   );
}

function create ()
{

  
   //this.add.image(700, 350, 'sky');  //adds sky
   skysprite = this.add.tileSprite(700, 350, 1400, 700, "sky");
   cloudsWhite = this.add.tileSprite(640, 200, 1334, 400, "clouds-white");
   
  
  grass = this.physics.add.staticGroup(); //define grass 
  grass.create(670, 600, 'ground');
 
  grasstile = this.add.tileSprite(670, 600, 1334, 229, "ground");
  //grasstile = this.add.tileSprite(700, 890, 1334, 400, "ground").setScale(2);
  
  obstacles = this.physics.add.group();
  obstacles.create(700, 300, 'obstacle');
    //groundsprite = this.add.tileSprite(700, 850,1400, 120, "ground").setScale(2).refreshBody();
    


 //obstacle = this.physics.add.staticGroup();
 //.create(700, 850, 'obstacle')
 player = this.physics.add.sprite(0, 100, 'girl');
//this.player.setGravityY(gameOptions.playerGravity);
//this.player.setDepth(2);
this.physics.add.collider(player, grass);
this.physics.add.collider(obstacles, grass);




 player.setBounce(0.02);
 player.setCollideWorldBounds(true);

 this.anims.create({
    key: 'still',
    frames: [ { key: 'girl', frame: 0 } ],
    frameRate: 20
    
 });

//const y = phaser.math.betweem(250,300);
//obstacle.create(700, 400, 'obstacle');


 this.anims.create({
    key: ':O',
    frames: [ { key: 'girl', frame: 1 } ],
    frameRate: 20
 });

 this.anims.create({
    key: 'run',
    frames: this.anims.generateFrameNumbers('girl', { start: 2, end: 4 }),
    frameRate: 10,
    repeat: -1
 });
 cursors = this.input.keyboard.createCursorKeys();

 /*this.groundGroup = this.add.group();
  this.skyGroup = this.add.group();

      // group with all active firecamps.
        this.obstacleGroup = this.add.group({

            // once a firecamp is removed, it's added to the pool
            removeCallback: function(obstacle){
                obstacle.scene.obstaclePool.add(obstacle)
            }
        });

        // fire pool
        this.obstacleGroupPool = this.add.group({

            // once a fire is removed from the pool, it's added to the active fire group
            removeCallback: function(obstacle){
                obstacle.scene.obstacleGroup.add(obstacle)
            }
        });

    this.addsky()
    this.addground()
    this.playerJumps = 0;
     // the player is not dying
    this.dying = false;
    
       this.groundCollider = this.physics.add.collider(this.player, this.groundGroup, function(){

            // play "run" animation if the player is on a platform
            if(!this.player.anims.isPlaying){
                this.player.anims.play("run");
            }
        }, null, this);

   
*/

this.physics.add.collider(player, obstacles, hitObstacle, null, this );
function hitObstacle (player, obstacle){
    player.anims.play('run', true);
    //this.physics.pause();
    player.setTint(0xff0000);
   // player.anims.play(':O');
    //gameOver = true;
}
this.scheduleNextObstacle;
function scheduleNextObstacle(player) {
    const delay = Phaser.Math.Between(1000, 3000); // Random delay between 1s–3s

    this.time.delayedCall(delay, () => {
        this.spawnObstacle(player);
        this.scheduleNextObstacle(player); // Schedule the next one recursively
    }, null, this);
}

 }

function update ()
{
    
    obstacles.setVelocityX(-160)
    //cloudsWhite.tilePositionX += 0.5;
    //cloudsWhiteSmall.tilePositionX += 0.25;
     /*  if (cursors.left.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('run', true);
        }
       if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('run', true);
        }
        if (cursors.space.isDown)
        {
            player.setVelocityX(160);
            player.setVelocityY(300);

            player.anims.play('run', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('still');
        } */
       

        

        if (player.body.touching.down )
        {
            //player.setVelocityX(160);
            
           player.anims.play('run', true);
           //player.anims.play(':O');
        }
        if (cursors.space.isDown)
        {
           
           // player.setVelocityX(160);
            player.setVelocityY(-550);
            //player.anims.play(':O');

            player.anims.play('run', true);
        }

        
            cloudsWhite.tilePositionX += 1;
            grasstile.tilePositionX += 2; 
        

      //  if(player.body.touching.obstacle){
       //     player.setVelocityX(0);
      //      player.anims.play(':O');
       // }
}

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



var game = new Phaser.Game(config);
 gameOver = false;
let score = 0;
let scoreText;
let retryButton;
let cursors;
let jumpSound;
let pointSound;
let dieSound;
let baseObstacleSpeed = -250;
let baseGrassSpeed = 3;

function preload ()
{
    this.load.image("clouds-white", "assets/clouds-white.png");
    this.load.image('sky', 'assets/skypink.png');
    this.load.image('grass-2', 'assets/invisible.png');
    this.load.image('ground', 'assets/grass.png');
    this.load.image('obstacle', 'assets/obstacle.png');
    this.load.image('retry', 'assets/retrypink.png');
   this.load.spritesheet('girl', 
      'assets/sprite.png',
      { frameWidth: 132, frameHeight: 174 }
   );
   this.load.audio('jump', 'assets/jump.wav');
   this.load.audio('point', 'assets/point.wav');
   this.load.audio('die', 'assets/die.wav');
}

function create ()
{
   // sounds :3
   jumpSound = this.sound.add('jump');
   pointSound = this.sound.add('point');
   dieSound = this.sound.add('die');

  
   skysprite = this.add.tileSprite(700, 350, 1400, 700, "sky");
   cloudsWhite = this.add.tileSprite(640, 200, 1334, 400, "clouds-white");
   
  
  grass = this.physics.add.staticGroup(); //define grass 
  grass.create(670, 600, 'ground');
 
  grasstile = this.add.tileSprite(670, 600, 1334, 229, "ground");
 
  obstacles = this.physics.add.group();
  

 player = this.physics.add.sprite(200, 100, 'girl');

this.physics.add.collider(player, grass);
this.physics.add.collider(obstacles, grass);




 player.setBounce(0.02);
 player.setCollideWorldBounds(true);

 this.anims.create({
    key: 'still',
    frames: [ { key: 'girl', frame: 0 } ],
    frameRate: 20
    
 });




 this.anims.create({
    key: ':O',
    frames: [ { key: 'girl', frame: 1 } ],
    frameRate: 20
 });

 this.anims.create({
    key: 'run',
    frames: this.anims.generateFrameNumbers('girl', { start: 2, end: 4 }),
    frameRate: 15,
    repeat: -1
 });
 cursors = this.input.keyboard.createCursorKeys();



this.physics.add.collider(player, obstacles, hitObstacle, null, this );
function hitObstacle (player, obstacle){
    if (!this.gameOver) {
        this.gameOver = true;
        this.physics.pause(); 
        //player.setTint(0xff0000);
        player.anims.play(':O'); 
        dieSound.play(); 
    }
}

function spawnObstacle() {
    const clusterCount = Phaser.Math.Between(1, 3); // supposwed to spawn clustered men but idfk
    for (let i = 0; i < clusterCount; i++) {
        const x = config.width + 100 + (i * 50);
        const obstacle = obstacles.create(x, 0, 'obstacle');
        // men speed
        const speedMultiplier = 1 + (Math.floor(score / 100) * 0.1);
        obstacle.setVelocityX(baseObstacleSpeed * speedMultiplier);
        obstacle.body.setAllowGravity(false);

        const scale = Phaser.Math.FloatBetween(0.7, 1);
        obstacle.setScale(scale);

       
        obstacle.y = 486 - (obstacle.displayHeight/2);
    }
}

function scheduleNextObstacle() {
    const delay = Phaser.Math.Between(3500, 5000); //delay freq
    this.time.delayedCall(delay, () => {
        spawnObstacle();
        scheduleNextObstacle.call(this);
    }, null, this);
}

//spawn of the men
scheduleNextObstacle.call(this);

this.gameOver = false;
this.gameStarted = true;
score = 0;
player.anims.play('still');
scoreText = this.add.text(20, 20, 'Score: 0', {
    fontSize: '32px',
    fill: '#fd5e83',
    fontFamily: 'monospace'
});
scoreText.setScrollFactor(0);
overButton = this.add.text(config.width / 2, 100, 'Game Over', {
    fontSize: '48px',
    fill: '#fff',
    fontFamily: 'monospace',
    backgroundColor: '#fdb9b5',
    padding: { left: 20, right: 20, top: 10, bottom: 10 },
    align: 'center'
}).setOrigin(0.5).setInteractive().setVisible(false);
retryButton = this.add.image(config.width / 2, 300, 'retry')
    .setOrigin(0.5)
    .setInteractive()
    .setVisible(false);
retryButton.on('pointerdown', () => {
    this.scene.restart();
});
}

function update ()
{
    if (this.gameOver) {
        retryButton.setVisible(true);
        overButton.setVisible(true);
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.restart();
        }
        return;
    }
    
    score += 1;
    if (score % 1000 === 0) { // Play point sound every 100 points, its 1000 because phaser stupid
        pointSound.play();
    }
    scoreText.setText('Score: ' + Math.floor(score / 10));
    cloudsWhite.tilePositionX += 1;
    
    // GRASS CHANGE SPEEDDDD
    const speedMultiplier = 1 + (Math.floor(score / 100) * 0.1);
    grasstile.tilePositionX += baseGrassSpeed * speedMultiplier;
    
    if (player.body.touching.down ) {
        player.anims.play('run', true);
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            player.setVelocityY(-400);
            // player.setVelocityX(80);
            player.anims.play('run', true);
            jumpSound.play(); 
        }
    } else {
        player.anims.stop();
        player.setFrame(2); 
    }
}

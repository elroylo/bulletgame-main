title = "Galaxy Blitz";
 
description = 
`
Click to
Change 
Direction
 
Hold to
Stay still
 
Collect 
Coins
To 
Power Up
`;
 
characters = [
`
  pp
  ll
llllll
ccllcc
ccllcc
ll  ll
`
,
`
rr  rr
gggggg
rrggrr
rrggrr
  rr
  rr
`,
` r
 lll 
rlrlr 
 lll
  r
`
,
`
  r    
 r r  
r   r 
`
,
`
gg  gg
gg  gg
rrrrrr
ccrrcc
ccrrcc
cc  cc
`
,
`
rr  rr
rrrrrr
rrpprr
rrrrrr
  rr
  rr
`
,
`
 r
rrr
 r
`
 
];
 
//Constants
const G = {
    WIDTH: 100,
    HEIGHT: 150,
 
    STAR_SPEED_MIN: 0.5,
    STAR_SPEED_MAX: 1.0,
    
    PLAYER_FIRE_RATE: 35,
    PLAYER_BULLET_SIZE : 1,
 
    FBULLET_SPEED: 5,
 
    ENEMY_MIN_BASE_SPEED: 1.0,
    ENEMY_MAX_BASE_SPEED: 1.5,
    ENEMY_FIRE_RATE: 75,
    //ENEMY_FIRE_RATE1: 150,
 
    EBULLET_SPEED: 0.7,
    EBULLET_ROTATION_SPD: 0.1
};
 
//Game options
options = {
    viewSize: {x: G.WIDTH, y: G.HEIGHT},
    isCapturing: true,
    isCapturingGameCanvasOnly: true,
    captureCanvasScale: 2,
    seed: 1,
    isPlayingBgm: true,
    isReplayEnabled: true,
    theme: "pixel"
};
 
//Type
/**
 * @typedef {{
 * pos: Vector,
 * speed: number
 * }} Star
 */
 
/**
 * @type { Star [] }
 */
let stars;
 
/**
 * @typedef {{
 * pos: Vector,
 * vy: number,
 * firingCooldown: number,
 * isFiringLeft: boolean
 * }} Player
 */
let player;
 
 
/**
 * @typedef {{
 * pos: Vector
 * }} FBullet
 */
 
/**
 * @type { FBullet [] }
 */
let fBullets;
 
/**
 * @typedef {{
 * pos: Vector,
 * firingCooldown: number
 * }} Enemy
 */
 
/**
 * @type { Enemy [] }
 */
let enemies;
 
/**
 * @typedef {{
 * pos: Vector,
 * angle: number,
 * rotation: number
 * }} EBullet
 */
 
/**
 * @type { EBullet [] }
 */
let eBullets;
 
/**
 * @typedef {{
 * pos: Vector,
 * angle: number,
 * rotation: number
 * }} EBigBullet
 */
/**
 * @type {EBigBullet[] }
 */
let eBigBullets;

 
/**
 * @type { number }
 */
let currentEnemySpeed;
 
/**
 * @type { number }
 */
let waveCount;
 
/**
 * 
 */
 function shootall()
 {fBullets.push({
    pos: vec(5, 160)
    });

    fBullets.push({
        pos: vec(10, 160)
        });

        fBullets.push({
            pos: vec(15, 160)
            });

            fBullets.push({
                pos: vec(20, 160)
                });

                fBullets.push({
                    pos: vec(25, 160)
                    });

                    fBullets.push({
                        pos: vec(30, 160)
                        });
                        fBullets.push({
                            pos: vec(35, 160)
                            });
                
                            fBullets.push({
                                pos: vec(40, 160)
                                });
                
                                fBullets.push({
                                    pos: vec(45, 160)
                                    });
                
                                    fBullets.push({
                                        pos: vec(50, 160)
                                        });
                
                                        fBullets.push({
                                            pos: vec(55, 160)
                                            });
                
                                            fBullets.push({
                                                pos: vec(60, 160)
                                                });
                                                fBullets.push({
                                                    pos: vec(65, 160)
                                                    });
                                        
                                                    fBullets.push({
                                                        pos: vec(70, 160)
                                                        });
                                        
                                                        fBullets.push({
                                                            pos: vec(75, 160)
                                                            });
                                        
                                                            fBullets.push({
                                                                pos: vec(80, 160)
                                                                });
                                        
                                                                fBullets.push({
                                                                    pos: vec(85, 160)
                                                                    });
                                        
                                                                    fBullets.push({
                                                                        pos: vec(90, 160)
                                                                        });
                                                                        fBullets.push({
                                                                            pos: vec(95, 160)
                                                                            });
                                                                            fBullets.push({
                                                                                pos: vec(100, 160)
                                                                                });
                                                                            }
 var blitztime = false;

 function update() {
    

    //
    if (!ticks) {
        

        stars = times(40, () => { //number of stars
            
            const posX = rnd(0, G.WIDTH);
            const posY = rnd(0, G.HEIGHT);
            
            return {
                
                pos: vec(posX, posY),
                
                speed: rnd(G.STAR_SPEED_MIN, G.STAR_SPEED_MAX)
            };
        });
        
 
        player = {
            pos: vec(0,140),
            vy:1,
            firingCooldown: G.PLAYER_FIRE_RATE,
            isFiringLeft: true
        };
        
        fBullets = [];
        enemies = [];
        eBullets = [];
        eBigBullets = [];
        waveCount = 0;

        
    }
    
 
// Spawning enemies

if (enemies.length === 0) {
    
    currentEnemySpeed =
        rnd(G.ENEMY_MIN_BASE_SPEED, G.ENEMY_MAX_BASE_SPEED)*difficulty;
    
    
        for (let i = 0; i < 2.35*(difficulty*2.5); i++) {
        const posX = rnd(0, G.WIDTH);
        const posY = -rnd(i * G.HEIGHT * 0.1);
        enemies.push({
            
            pos: vec(posX, posY),
            firingCooldown: G.ENEMY_FIRE_RATE 
        });
    }
    waveCount++; 
}

 
//stars

stars.forEach((s) => {

        
    var starcolors= ["red","green","blue"];

    var starcolor = starcolors[Math.floor(Math.random()*starcolors.length)];


    s.pos.y += s.speed*(difficulty);  
    if (s.pos.y > G.HEIGHT) s.pos.y = 0;
        
     // @ts-ignore
    color(starcolor);      
        
    box(s.pos, 1);
});

//Player Engine Particles
color("yellow");
particle(
player.pos.x,  // x coordinate
player.pos.y, // y coordinate
5, // The number of particles
5, // The speed of the particles
PI/2, // The emitting angle (originally 2)
PI/5  // The emitting width
);

 
//player fire
player.firingCooldown--;
if (player.firingCooldown <= 0 ) {
    fBullets.push({
        pos: vec(player.pos.x, player.pos.y)
    });
    player.firingCooldown = G.PLAYER_FIRE_RATE;

    ///muzzle flash///
    color("black");
    particle(
    player.pos.x,  // x coordinate
    player.pos.y, // y coordinate
    5, // The number of particles
    1, // The speed of the particles
    -PI/2, // The emitting angle
    PI/4  // The emitting width
    );
}
    
if(G.PLAYER_FIRE_RATE>11.5 || G.PLAYER_BULLET_SIZE<4.7)
    {
    color("black"); //all the L's become black
    char("a",player.pos);
    }


else if(G.PLAYER_FIRE_RATE<=11.5 && G.PLAYER_BULLET_SIZE>=4.7) //Changing character
    {
        
    color("black"); //all the L's become black
    char("e",player.pos);
    
    }
        
//DEBUG TEXT
// Updating and drawing bullets
//text(fBullets.length.toString(), 3, 10); //shows how many bullets there
//text("E Firerate:"+G.ENEMY_FIRE_RATE.toString(),3,20); 
//text("Difficulty:"+difficulty.toString(),3,30);

if(G.PLAYER_FIRE_RATE<=11.5&&G.PLAYER_BULLET_SIZE>=4.7)
{
    color("red");
    text("BLITZ TIME",20,38);
    var blitztime = true;
    
}
else{
if(G.PLAYER_FIRE_RATE<11){
text("Firerate:MAX",3,10); //3,10
var blitztime = false;

 }
if(G.PLAYER_FIRE_RATE>11){
text("Firerate:"+G.PLAYER_FIRE_RATE.toString(),3,10);
var blitztime = false;

}

if(G.PLAYER_BULLET_SIZE>4.7){
text("Bullet Size: MAX",3,20);
var blitztime = false;

}
if(G.PLAYER_BULLET_SIZE<4.7){
text("Bullet Size:"+G.PLAYER_BULLET_SIZE.toString(),3,20);
var blitztime = false;

}
}


 
 
fBullets.forEach((fb) => {
    fb.pos.y -= G.FBULLET_SPEED;
    
    if(G.PLAYER_BULLET_SIZE<4.7){
    color("yellow"); //if different color then it wont explode
    box(fb.pos, G.PLAYER_BULLET_SIZE); //size of bullet
    }
    
    if(G.PLAYER_BULLET_SIZE>4.7){
        color("yellow"); //if different color then it wont explode
        char("d",fb.pos);
    }   
 
});
 
 
remove(enemies, (e) => {
        
    e.pos.y += currentEnemySpeed;  //move them down
    e.firingCooldown--;
    if (e.firingCooldown <= 0 && blitztime==true) { //1.45
        eBullets.push({
            pos: vec(e.pos.x, e.pos.y),
            angle: e.pos.angleTo(player.pos),
            rotation: rnd()
        });
        e.firingCooldown = G.ENEMY_FIRE_RATE;

    }
 
    
    if (e.firingCooldown <= 0 && blitztime==false) {//1.45
        e.firingCooldown--;
        eBigBullets.push({
            pos: vec(e.pos.x, e.pos.y),
            angle: e.pos.angleTo(player.pos),
            rotation: rnd()
        });
        e.firingCooldown = G.ENEMY_FIRE_RATE;
    }
    
 
 
    color("black");
    const isCollidingWithFBullets = char("b", e.pos).isColliding.rect.yellow; //b
 
    const isCollidingWithFBigBullets = char("b", e.pos).isColliding.char.d; //b
    
    //if the enemy ship collides with player
    const isCollidingWithPlayerAlt = char("b", e.pos).isColliding.char.e; //b
    const isCollidingWithPlayer = char("b", e.pos).isColliding.char.a; //b
    
    
    if (isCollidingWithPlayer) {
        end();
        play("lucky");
        G.PLAYER_FIRE_RATE = 35;
        e.firingCooldown = G.ENEMY_FIRE_RATE;
        G.PLAYER_BULLET_SIZE = 1;
        fast = 1;
    }
    
    if (isCollidingWithFBullets||isCollidingWithFBigBullets) {
        color("yellow");
        particle(e.pos);
        play("explosion");
        if(blitztime==false)
        {
            addScore(50, e.pos);
        }
        else{
        if(blitztime==true)
        {
            addScore(100, e.pos);
        }
        }
        
        
    }
 
    if (isCollidingWithPlayerAlt) //dying in blitz mode
    {
        play("powerUp");
        G.PLAYER_FIRE_RATE = 23;
        //e.firingCooldown = G.ENEMY_FIRE_RATE;
        G.PLAYER_BULLET_SIZE = 2;
        player.pos.x=50; //resetting position to outside  //was 120

        shootall();
        
        //player.pos.y=0;       
    }
 
    //Enemy Engine Particles
    color("red");
    particle(
    e.pos.x,  // x coordinate
    e.pos.y, // y coordinate
    .1, // The number of particles
    .3, // The speed of the particles
    3*PI/2, // The emitting angle (originally 2)
    PI/4  // The emitting width
    );
 
    return (isCollidingWithFBullets || e.pos.y > G.HEIGHT||isCollidingWithFBigBullets);
    
});
  //player movement
if (
    input.isJustPressed ||
    (player.pos.x < 5 && player.vy < 0) ||
    (player.pos.x > 95 && player.vy > 0)
    ) {
    player.vy *= -1; //switches directions
    }
    
    var fast = 1;
    
    if (input.isPressed) {
    
    } else {
    if(blitztime==true)
    {
        fast=2.5;
    }
    player.pos.x += player.vy  * fast;
    ;
    }
 
remove(eBullets, (eb) => {
   
   eb.pos.x += G.EBULLET_SPEED * Math.cos(eb.angle);
   eb.pos.y += G.EBULLET_SPEED * Math.sin(eb.angle);
   eb.rotation += G.EBULLET_ROTATION_SPD;
 
    var powerupcolors= ["cyan","green","yellow"];

    var powerup = powerupcolors[Math.floor(Math.random()*powerupcolors.length)];
    // @ts-ignore
    color(powerup); //color of powerups
    const isCollidingWithFBullets = char("c", eb.pos).isColliding.rect.yellow;
 
    const isCollidingWithBigFBullets = char("c", eb.pos).isColliding.char.d;
    
    const isCollidingWithPlayerAlt = char("c", eb.pos).isColliding.char.e;
    const isCollidingWithPlayer = char("c", eb.pos).isColliding.char.a;
    if (isCollidingWithPlayer||isCollidingWithPlayerAlt) {
        color("green");
        particle(player.pos);        
        play("coin");
        if(blitztime==false)
        {
            addScore(5, player.pos);
        }
        else{
        if(blitztime==true)
        {
            addScore(30, player.pos);
        }
    }
        
        
        if(G.PLAYER_FIRE_RATE>10)
        {
        G.PLAYER_FIRE_RATE = G.PLAYER_FIRE_RATE - 1; // CHANGE HOW MUCH FIRERATE GOES DOWN AFTER YOU COLLECT 1, .5 for normal, 1 for easy, 3 for baby
        }
        
        if(G.PLAYER_BULLET_SIZE<5)
        {
        G.PLAYER_BULLET_SIZE = G.PLAYER_BULLET_SIZE + .2 ; //.1 for normal, .5 for easy, .75 for baby
        }
        
    }
    
    if (isCollidingWithFBullets||isCollidingWithBigFBullets) {
        color("green");
        particle(eb.pos);
        play("coin");
        if(blitztime==false)
        {
            addScore(10, eb.pos);
        }
        else{
        if(blitztime==true)
        {
            addScore(50, eb.pos);
        }
        if(G.PLAYER_FIRE_RATE>10)
        {
        G.PLAYER_FIRE_RATE = G.PLAYER_FIRE_RATE - 1; // CHANGE HOW MUCH FIRERATE GOES DOWN AFTER YOU COLLECT 1, .5 for normal, 1 for easy, 3 for baby
        }
        
        if(G.PLAYER_BULLET_SIZE<5)
        {
        G.PLAYER_BULLET_SIZE = G.PLAYER_BULLET_SIZE + .2 ; //.1 for normal, .5 for easy, .75 for baby
        }
    }
        
        
    }
 
    return (isCollidingWithPlayer||isCollidingWithFBullets ||isCollidingWithBigFBullets|| !eb.pos.isInRect(0, 0, G.WIDTH, G.HEIGHT));
});
 
 
 remove(eBigBullets, (eb) => {
   
    
    eb.pos.x += G.EBULLET_SPEED * Math.cos(eb.angle);
    eb.pos.y += G.EBULLET_SPEED * Math.sin(eb.angle);
 
     color("green"); //color of powerups
     const isCollidingWithFBullets = char("g", eb.pos).isColliding.rect.yellow;
 
     const isCollidingWithBigFBullets = char("g", eb.pos).isColliding.char.d;
     
     const isCollidingWithPlayerAlt = char("g", eb.pos).isColliding.char.e;
     const isCollidingWithPlayer = char("g", eb.pos).isColliding.char.a;
     if (isCollidingWithPlayer||isCollidingWithPlayerAlt) {

         color("green");
         particle(player.pos);        
         play("coin");
         if(blitztime==false)
         {
             addScore(5, player.pos);
         }
         else{
         if(blitztime==true)
         {
             addScore(10, player.pos);
         }
        }
         if(G.PLAYER_FIRE_RATE>10)
         {
         G.PLAYER_FIRE_RATE = G.PLAYER_FIRE_RATE - 1; 
         }
         
         if(G.PLAYER_BULLET_SIZE<5)
         {
         G.PLAYER_BULLET_SIZE = G.PLAYER_BULLET_SIZE + .2 ; 
         }
         
     }
     
     if (isCollidingWithFBullets||isCollidingWithBigFBullets) {
         color("green");
         particle(eb.pos);
         play("coin");
         if(blitztime==false)
        {
            addScore(10, eb.pos);
        }
        else{
        if(blitztime==true)
        {
            addScore(50, eb.pos);
        }
        if(G.PLAYER_FIRE_RATE>10)
        {
        G.PLAYER_FIRE_RATE = G.PLAYER_FIRE_RATE - 1; // CHANGE HOW MUCH FIRERATE GOES DOWN AFTER YOU COLLECT 1, .5 for normal, 1 for easy, 3 for baby
        }
        
        if(G.PLAYER_BULLET_SIZE<5)
        {
        G.PLAYER_BULLET_SIZE = G.PLAYER_BULLET_SIZE + .2 ; //.1 for normal, .25 for easy, .75 for baby
        }
    }
         
     }
 
     return (isCollidingWithPlayer||isCollidingWithFBullets ||isCollidingWithBigFBullets|| !eb.pos.isInRect(0, 0, G.WIDTH, G.HEIGHT));
 });
 

}
 
 
 
 
 
 
 
 


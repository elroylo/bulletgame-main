title = "Bullet Run";

description = `
Survive as long as you can.
`;

characters = [
  `
  l
 lll
 lll
 l l
 l l
 lll
 lll
 l l
 l l
  `,//player 
  `
l  l
llll
llll
llll
llll
 ll
  `,
 // HEARTS   
  `
  rrr
  rrrr
  rrrr
   rrr
     r
  `,
  `
   rrr
  rrrr
  rrrr
  rrr
  r   
  `,
  `
  lll
  llll
  llll
   lll
     l
  `,
  `
   lll
  llll
  llll
  lll
  l   
  `,
  ,
  `
  lll
  llll
  llll
   lll
     l
  `,
  `
   lll
  llll
  llll
  lll
  l   
  `,
];

//Type
/**
 * @typedef {{
 * pos: Vector
 * }} Star
 */
 
/**
 * @type { Star [] }
 */
let stars;

let immunity = 0;
let regen = 0;
let regen_time = ticks;
let regen_time_start = 0;


function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
const rndnum = randomIntFromInterval(1, 100)
const P = {
  WIDTH: 250,
  HEIGHT: 200,
	LAUNCHSPEED: 5,
  LAUNCHDECELRATE: .5,
  ENEMY_MIN_BASE_SPEED: 1.25,
  ENEMY_MAX_BASE_SPEED: 2.0,
  ENEMY_FIRE_RATE: 10,
  EBULLET_SPEED: 1.0,
  EBULLET_ROTATION_SPD: 0
};

options = {
  theme: 'pixel',
  viewSize: {x:P.WIDTH, y:P.HEIGHT},
  isPlayingBgm: true,
  // isSpeedingUpSound: true,
  isShowingScore: true,
  isReplayEnabled: true,
  seed: 44
};

//*********************** */

/**
 * @typedef {{
 * pos: Vector,
 * launchStage: number,
 * cursorTravel: number,
 * launchDirection: Vector,
 * currLaunchSpeed: number,
 * hitpoints: number
 * }} Player
 */

/**
 * @type { Player }
 */
let player;


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
 * @type { number }
 */
let currentEnemySpeed;

/**
 * @type { number }
 */
let waveCount;


//*********************** */
let objs = [];
let sprite_offset = 5;
let edge_buffer = 15;
const spawnpoints = [ vec(P.WIDTH/2, P.HEIGHT - sprite_offset), 
                      vec(P.WIDTH/2, 0+sprite_offset),
                      vec(0+sprite_offset, P.HEIGHT/2),
                      vec(P.WIDTH-sprite_offset, P.HEIGHT/2), ];


function update() {
  addScore(ticks/100)
  // The init function running at startup
if (!ticks) {
  stars = times(20, () => {
          const posX = rnd(0, P.WIDTH);
          const posY = rnd(0, P.HEIGHT);
          return {
              pos: vec(posX, posY),
              speed: rnd(P.STAR_SPEED_MIN, P.STAR_SPEED_MAX)
          };
      });
      // @ts-ignore
      player = {
          pos: vec(P.WIDTH * 0.5, P.HEIGHT * 0.5),
          hitpoints: 5
      }

      enemies = [];
      eBullets = [];

      waveCount = 0;
}

  // Spawning enemies
  if (enemies.length === 0) {
      currentEnemySpeed =
          rnd(P.ENEMY_MIN_BASE_SPEED, P.ENEMY_MAX_BASE_SPEED) * difficulty;
      for (let i = 0; i < 9; i++) {
          const posX = rnd(0, P.WIDTH);
          const posY = -rnd(i * P.HEIGHT * 0.1);
          enemies.push({
              pos: vec(posX, posY),
              firingCooldown: P.ENEMY_FIRE_RATE 
          });
      }

      waveCount++; // Increase the tracking variable by one
  }

  // Update for Star
  stars.forEach((s) => {
      // @ts-ignore
      s.pos.y += s.speed;
      if (s.pos.y > P.HEIGHT) s.pos.y = 0;
      color("light_black");
      box(s.pos, 1);
  });

  // Updating and drawing the player
  player.pos = vec(input.pos.x, input.pos.y);
  player.pos.clamp(0, P.WIDTH, 0, P.HEIGHT);
  
  color ("black");
  char("a", player.pos);

 


  remove(enemies, (e) => {
      e.pos.y += currentEnemySpeed;
      e.firingCooldown--;
      if (e.firingCooldown <= 0) {
          eBullets.push({
              pos: vec(e.pos.x, e.pos.y),
              angle: e.pos.angleTo(player.pos),
              rotation: rnd()
          });
          e.firingCooldown = P.ENEMY_FIRE_RATE;
      }

      color("green");
      const isCollidingWithPlayer = char("b", e.pos).isColliding.char.a;
      if (isCollidingWithPlayer && immunity == 0) {
        { player.hitpoints--; immunity = 20;}
      }
      
      
      
      return (e.pos.y > P.HEIGHT);
  });
  if(immunity != 0) immunity--;


  remove(eBullets, (eb) => {
      eb.pos.x += P.EBULLET_SPEED * Math.cos(eb.angle);
      eb.pos.y += P.EBULLET_SPEED * Math.sin(eb.angle);
      eb.rotation += P.EBULLET_ROTATION_SPD;

      color("yellow");
      const isCollidingWithPlayer
          = char("c", eb.pos, {rotation: eb.rotation}).isColliding.char.a;
      if (isCollidingWithPlayer && immunity == 0) {
        player.hitpoints--; immunity = 20;
      }
      
      return (!eb.pos.isInRect(0, 0, P.WIDTH, P.HEIGHT));
  });


    // Heart 1
  
    const heart_color1 = ["light_yellow", "light_black"][player.hitpoints >= 1 ? 0 : 1];
    const heart_color2 = ["light_yellow", "light_black"][player.hitpoints >= 2 ? 0 : 1];
    const heart_color3 = ["light_yellow", "light_black"][player.hitpoints >= 3 ? 0 : 1];
    const heart_color4 = ["light_yellow", "light_black"][player.hitpoints >= 4 ? 0 : 1];
    const heart_color5 = ["light_yellow", "light_black"][player.hitpoints >= 5 ? 0 : 1];
    // @ts-ignore
    color(heart_color1);
    if(player.hitpoints >= 1) {
      char("c", vec(2, 10));
      char("d", vec(2+4, 10));
    } else {
      // color("white");
      char("e", vec(2, 10));
      char("f", vec(2+4, 10));
    }
    // Heart 2
    // @ts-ignore
    color(heart_color2);
    if(player.hitpoints >= 2) {
      char("c", vec(12, 10));
      char("d", vec(12+4, 10));
    } else {
      char("e", vec(12, 10));
      char("f", vec(12+4, 10));
    }
    // Heart 3
    // @ts-ignore
    color(heart_color3);
    if(player.hitpoints >= 3) {
      char("c", vec(22, 10));
      char("d", vec(22+4, 10));
    }
    else {
      char("e", vec(22, 10));
      char("f", vec(22+4, 10));
    }
    // Heart 4
    // @ts-ignore
    color(heart_color4);
    if(player.hitpoints >= 4) {
      char("c", vec(32, 10));
      char("d", vec(32+4, 10));
    }
    else {
      char("e", vec(32, 10));
      char("f", vec(32+4, 10));
    }
    // Heart 5
    // @ts-ignore
    color(heart_color5);
    if(player.hitpoints >= 5) {
      char("c", vec(42, 10));
      char("d", vec(42+4, 10));
    }
    else {
      char("e", vec(42, 10));
      char("f", vec(42+4, 10));
    }
  regen_time = ticks;
  if(regen_time >= 250 * regen_time_start){
    player.hitpoints++;
    regen_time_start++;
  }


  if(player.hitpoints<=0){  end();}
}
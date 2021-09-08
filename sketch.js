const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var rope, fruit, ground;
var fruit_con;
var bg_img;
var food;
var rabbit;
var button, blower;
var bunny;
var blink, eat, sad;
var mute_btn;
var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var blower;
var bubble_img, bubble2_img, bubble, bubble2;

var fruit_con_2, fruit_con_3, rope2, button2;

function preload() {
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  bubble_img = loadImage("bubble.png")
  bubble2_img = loadAnimation("bubble_2.png")

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
}

function setup() {
  createCanvas(1200, 500);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  bk_song.play()
  bk_song.setVolume(0.5)
  bk_song.play();
  bk_song.setVolume(0.5);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  button = createImg('cut_btn.png');
  button.position(100, 250);
  button.size(50, 50);
  button.mouseClicked(drop);

  bubble = createSprite(450, 400, 20, 20)
  bubble.addImage(bubble_img)
  bubble.scale = 0.1

  bubble2 = createSprite(450, 400, 20, 20)
  bubble2.addAnimation("bubble", bubble2_img)
  bubble2.scale = 0.4
  bubble2.visible = false

  rope = new Rope(5, { x: 125, y: 250 });
  rope2 = new Rope(5, { x: 375, y: 250 });

  ground = new Ground(450, 170, 100, 10);

  bunny = createSprite(450, 100, 50, 50);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('crying', sad);
  bunny.changeAnimation('blinking');

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);
  fruit_con = new Link(rope, fruit);
  fruit_con_2 = new Link(rope2, fruit);

  mute_btn = createImg("mute.png")
  mute_btn.position(1100, 20)
  mute_btn.size(60, 60)
  mute_btn.mouseClicked(mute)


  button2 = createImg('cut_btn.png');
  button2.position(350, 250);
  button2.size(50, 50);
  button2.mouseClicked(drop2);


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

}

function draw() {
  background(51);
  image(bg_img, 0, 0, 1200, 500);

  Engine.update(engine);

  ground.show();

  rope.show();

  rope2.show();
  drawSprites();
  if (collide(bubble2, bunny) == true) {
    eating_sound.play()
    fruit = null
    rope2.remove();
    bunny.changeAnimation('eating');
  }

  push();

  imageMode(CENTER);

  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }

  pop();

  if (fruit != null && fruit.position.y >= 650) {
    sad_sound.play()
    bunny.changeAnimation('crying');
    fruit = null;

  }
  if (collide(fruit, bubble) == true) {
    bubble2.visible = true
    bubble.visible = false
    bubble2.velocityY = -4
  }


}

function drop() {
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}

function drop2() {
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}


function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 80) {
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }
  }
}

function mute() {
  if (bk_song.isPlaying()) {
    bk_song.stop()
  } else {
    bk_song.play()
  }
}

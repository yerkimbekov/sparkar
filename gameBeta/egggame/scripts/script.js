//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================

// How to load in modules
const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Patches = require('Patches');
const Reactive  = require('Reactive');
const random 		= require('Random');
const FaceTracking = require('FaceTracking');
const Animation  = require('Animation');

const face = FaceTracking.face(0);

const screenScale = Patches.getScalarValue('screenScale');
const screenSize = Patches.getPoint2DValue('screenSize');

const text = Scene.root.find('text0');
text.text = "0";

var gameOverText = false;

const bowl = Scene.root.find('bowl');
const cheese = Scene.root.find('cheese');

const cheeseTransform = cheese.transform;
const bowlTransform = bowl.transform;
const faceTransform = face.cameraTransform;

const bowlSize = 10;

bowlTransform.x = faceTransform.x.mul(1.5);
bowlTransform.y = -150;

Patches.setScalarValue("bowlX", bowlTransform.x);
Patches.setScalarValue("bowlY", bowlTransform.y);

var play_game = false;
var score = 0;
var w = screenSize.x.pinLastValue();
var y = screenSize.y.pinLastValue();
var falling = false;

Patches.setBooleanValue("play", play_game);

Diagnostics.watch('Height', screenSize.y);
Diagnostics.watch('Width', screenSize.x);
Diagnostics.watch('score', score);

// function fallingCheese() {
// 	const timeDriverParameters = {
// 	  	durationMilliseconds: 4000,
// 	  	loopCount: 1,
// 	  	mirror: false
// 	};
// 	const timeDriverParametersRotate = {durationMilliseconds: 2000, loopCount: Infinity};
// 	const timeDriver = Animation.timeDriver(timeDriverParameters);
// 	const timeDriverRotate = Animation.timeDriver(timeDriverParametersRotate);
// 	const linearSampler = Animation.samplers.linear(430, -430);
// 	const linearSamplerRotate = Animation.samplers.linear(0, 720);
// 	const translationAnimation = Animation.animate(timeDriver, linearSampler);
// 	const translationAnimationRotation = Animation.animate(timeDriverRotate, linearSamplerRotate);
// 	cheeseTransform.y = translationAnimation;
// 	cheeseTransform.rotationZ = translationAnimationRotation;
// 	timeDriver.start();
// 	timeDriverRotate.start();
// 	Reactive.and(
// 		Reactive.and(
// 			Reactive.gt(bowl.transform.x.add(bowlSize), cheeseTransform.x), 
// 			Reactive.lt(bowl.transform.x.add(-bowlSize), cheeseTransform.x)
// 		),
// 		Reactive.and( 
// 			Reactive.gt(bowl.transform.y.add(bowlSize), cheeseTransform.y), 
// 			Reactive.lt(bowl.transform.y.add(-bowlSize), cheeseTransform.y) 
// 		) 
// 	).onOn().subscribe(
// 		function(event) {
// 			timeDriver.stop();
// 			timeDriverRotate.stop();
// 			addPoint();
// 		}
// 	);
// 	Reactive.lt(translationAnimation, -420).onOn().subscribe(
// 		function(event) {
// 			timeDriver.stop();
// 			timeDriverRotate.stop();
// 			gameOver();
// 		}
// 	);
// }

function addPoint() {
    score++;
    text.text = score.toString();
}

function gameOver() {
    gameOverText = true;
    play_game = false;
    score = 0;
    Diagnostics.log('LOSE');
    Patches.setBooleanValue("play", play_game);
    Patches.setBooleanValue("gameOverText", gameOverText);
}

var reset1 = false, reset2 = false;

Patches.getPulseValue('isCaught').subscribe(
  function(e) {
    if (play_game == 1) {
    	Diagnostics.log('Caught');
    	++score;
    	text.text = score.toString();
    	Patches.setPulseValue("wtf", Reactive.once());
    }
  }
);

Patches.getPulseValue('begin').subscribe(
  function(e) {
    if (play_game == 0) {
      gameOverText = false;
      play_game = 1;
      falling = 1;
      score = 0;
      text.text = score.toString();
      Patches.setBooleanValue("play", play_game);
      Patches.setBooleanValue("gameOverText", gameOverText);
      Patches.setBooleanValue("fallingCheese", falling);
//      Patches.setPulseValue("wtf", Reactive.once());
      // fallingCheese();
    }
  }
);

// Patches.getPulseValue('newCheese').subscribe(
//   function(e) {
//     ++score;
//     text.text = "Score:" + score.toString();
//   }
// )

// Patches.getPulseValue('left').subscribe(
//   function(e) {
//       if (play_game == 1 && bowl_pos > 1) {
//         --bowl_pos;
//         Patches.setScalarValue("bowl_pos", bowl_pos);
//         // bowl.x = (((bowl_pos - 1) * 130) - 130);
//       }
//   }
// )

// Patches.getPulseValue('right').subscribe(
//   function(e) {
//     if (play_game == 1 && bowl_pos < 3) {
//       ++bowl_pos;
//       Patches.setScalarValue("bowl_pos", bowl_pos);
//       // bowl.x = (((bowl_pos - 1) * 130) - 130);
//     }
//   }
// )

// Patches.getPulseValue('rest').subscribe(
//   function(e) {
//     rst = true;
//     Patches.setBooleanValue("rst", rst);
//   }
// )

// Patches.getPulseValue('unrest').subscribe(
//   function(e) {
//     rst = false;
//     Patches.setBooleanValue("rst", rst);
//   }
// )

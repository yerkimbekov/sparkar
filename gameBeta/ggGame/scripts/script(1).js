//испльзуемые модули
const Diagnostics	= require('Diagnostics');
const Scene 		= require('Scene');
const Patches		= require('Patches');
const Reactive		= require('Reactive');
const random 		= require('Random');

//стартовые позиции
const screenScale = Patches.getScalarValue('screenScale');
const screenSize = Patches.getPoint2DValue('screenSize');

var face_pos = 0;
var star_pos = 3;
var play_game = false;

Patches.setBooleanValue("play", play_game);
Patches.setScalarValue("face_pos", face_pos);
Patches.setScalarValue("star_pos", star_pos);

Diagnostics.watch('screenSize.x', screenSize.x);
Diagnostics.watch('screenSize.y', screenSize.y);
Diagnostics.watch('screenScale', screenScale);
Diagnostics.watch('face_pos', Reactive.val(face_pos));
Diagnostics.watch('star_pos', Reactive.val(star_pos));
const ball_1 = Scene.root.find('ball');
const ball_2 = Scene.root.find('ball_2');
const ball_3 = Scene.root.find('ball_3');
var scale = 1; 
var w = 200;
var h = 200; //812
var offset = h*0.5;
var lvl_offset = h*0.1315;
var start_offset = h*0.205-offset; //
Patches.setScalarValue("start_offset",start_offset);
Patches.setScalarValue("lvl_offset",lvl_offset);
Patches.setBooleanValue("show",false);
// lvl_0 = 21%  
// lvl_1 = 35% +14%
// lvl_2 = 49%
// lvl_3 = 53%
// lvl_4 = 67%
// lvl_5 = 81%
//методы
Patches.getPulseValue('begin').subscribe(
	function(e){
		if (play_game == false) {
			ball_1.x = 0;
			ball_2.x = 0;
			ball_3.x = 0;
			scale = screenScale.pinLastValue();
			w = Math.round(screenSize.x.pinLastValue()/scale);
			h = Math.round(screenSize.y.pinLastValue()/scale);
			face_pos = 0;
			star_pos = 3;
			play_game = true;
			Patches.setBooleanValue("show",true);
			offset = h*0.5;
			lvl_offset = h*0.1315;
			start_offset = h*0.205-offset;
			Patches.setScalarValue("start_offset",start_offset);
			Patches.setScalarValue("lvl_offset",lvl_offset);
			Patches.setScalarValue("face_pos", face_pos);
			Patches.setScalarValue("star_pos", star_pos);
			Patches.setBooleanValue("play", play_game);

		}
	}
)


Patches.getPulseValue('up').subscribe(
	function(e){
		if ( play_game==true && face_pos<5) {
			face_pos++;
			Patches.setScalarValue("face_pos", face_pos);
		}
	}
)

Patches.getPulseValue('down').subscribe(
	function(e){
		if (play_game==true && face_pos>0) {
			face_pos--;
			Patches.setScalarValue("face_pos", face_pos);
		}
	}
)

Patches.getPulseValue('newStar').subscribe(
	function(e){
		while (star_pos==face_pos){
				star_pos = Math.round(random.random()*5)
			}

		Patches.setScalarValue("star_pos", star_pos);
	}
)

Patches.getPulseValue('gameOver').subscribe(
	function(e){
		play_game = false;
		Patches.setBooleanValue("play", play_game);
	}
)



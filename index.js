import Screen from './screen.js';
import Sky8 from './sky8.js';
import Keyboard from './keyboard.js';


var FPS=60;
let loop, fpsGap, now, then, elapsed;


const gameSelection=document.getElementById('rom');
gameSelection.addEventListener('change',()=>{
	const game=gameSelection.options[gameSelection.selectedIndex].value;
	console.log(game);
	load(game);
})

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    console.log("click")
    const game = gameSelection.options[gameSelection.selectedIndex].value;
    console.log(game);
    load(game);
})


function load(name){
	const screen= new Screen(document.getElementById('screen'));
	const keyboard=new Keyboard();
	const sky8=new Sky8(screen, keyboard);
	window.cancelAnimationFrame(loop);


	let url=`./games/${name}`;

	function step(){
		now=Date.now();
		elapsed=now-then;

		if(elapsed>fpsGap){
			sky8.cycle();
		}

		loop=requestAnimationFrame(step);
	}
	resetButton.disabled=true;


	fetch(url).then(res =>res.arrayBuffer())
	.then(buffer=>{
		const program=new Uint8Array(buffer);
		fpsGap=1000/FPS;
		then=Date.now();
		resetButton.disabled=false;
		sky8.spritesToMem();
		sky8.programToMem(program);
		loop=requestAnimationFrame(step);
	})
}
load('INVADERS');
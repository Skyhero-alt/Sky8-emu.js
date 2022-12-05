const col=64;
const row=32;
const scale=30;

class Screen{
	constructor(canvas){
		this.display=new Array(col*row);
		this.canvas=canvas;
		this.canvas.width=col*scale;
		this.canvas.height=row*scale;
		this.context=this.canvas.getContext('2d');

	}
	setPixel(x,y){
		if(x>col){
			x-=col;
		}
		else if(x<0){
			x+=col;
		}
		this.display[x+(y*col)] ^=	1;
		return this.display[x+ (y*col)] !=1;
	}
	clearscr(){
		this.display=new Array(col*row);
	}

	fill(){
		this.context.fillStyle='grey';
		this.context.fillRect(0,0,this.canvas.width, this.canvas.height)
		
		for(let i=0;i<(col*row);i++){
			let x=(i%col)*scale;
			let y=Math.floor(i/col)*scale;

			if(this.display[i]==1){
				this.context.fillStyle='white';
				this.context.fillRect(x,y,scale,scale);
			}
		}
	}


	test(){
		this.setPixel(10,20);
		this.setPixel(5,2);
		this.fill();
	}


}
export default Screen;
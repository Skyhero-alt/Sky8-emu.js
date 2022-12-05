class Keyboard {
    constructor() {
        this.keymap = {
            49: 0x1, // 1 1
            50: 0x2, // 2 2
            51: 0x3, // 3 3
            52: 0xc, // 4 C
            81: 0x4, // Q 4
            87: 0x5, // W 5
            69: 0x6, // E 6
            82: 0xD, // R D
            65: 0x7, // A 7
            83: 0x8, // S 8
            68: 0x9, // D 9
            70: 0xE, // F E
            90: 0xA, // Z A
            18: 0x0, // X 0
            67: 0xB, // C B
            86: 0xF  // V F
        };

        this.keyPress=[];
        this.onNextKeyPress = null;

        window.addEventListener("keydown",this.onKeyDown.bind(this),false);
        window.addEventListener("keyup",this.onKeyUp.bind(this), false);

    }
    isKeyPressed(keyCode){
        return this.keyPress[keyCode];
    }

    onKeyDown(event){
        let key=this.keymap[event.which];
        this.keyPress[key]=true;


        if(this.onNextKeyPress!==null && key){
            this.onNextKeyPress(parseInt(key));
            this.onNextKeyPress=null;
        }
    }

    onKeyUp(event){
        let key=this.keymap[event.which];
        this.keyPress[key]=false;
    }

}

export default Keyboard;
class Bullet {
    constructor(pos_x,TOF){
        this.pos_x = pos_x;
        this.pos_y = 620;
        this.TOF = TOF;
        this.curr_y = 620;
        console.log("bullet made");
        
    }

    updatePos(currTime){
        this.curr_y = this.pos_y-((currTime-this.TOF)*30);
        
            // return{
            //     x : this.pos_x,
            //     y : this.curr_y
            // }        
    }
}



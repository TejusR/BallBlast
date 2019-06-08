class Bullet {
    constructor(pos_x){
        this.pos_x = pos_x;
        this.pos_y = 620;
        this.live = true;
        
    }

    updatePos(FireRate){
        this.pos_y -= FireRate;
       
    }
}



class Stone{
    constructor(x,y,vel_x,strength,OG){
        this.Imgid = Math.floor(Math.random() * 8);
        this.vel_x = vel_x;
        this.vel_y = 0;
        this.pos_y = y;
        this.pos_x = x;
        this.g = 0.2;
        this.st_strength = strength;
        this.cur_strength = this.st_strength;
        this.live = true;
        this.OG = OG;
    }
    Trackmotion() {
        if(this.pos_x>(600-this.cur_strength)){
            this.vel_x = -(this.vel_x>0?this.vel_x:(-this.vel_x));
       }
       if(this.pos_x < 0){
            this.vel_x = (this.vel_x>0?this.vel_x:(-this.vel_x));
       }
        if(this.pos_y >= (680-(this.cur_strength/2))){
            this.vel_y = -(this.vel_y>0?this.vel_y:(-this.vel_y))
        }
        else{
            this.vel_y +=this.g;

        }

       
        this.pos_x +=this.vel_x;
        this.pos_y =this.pos_y+this.vel_y;

        
    }
}
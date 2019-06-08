class Stone{
    constructor(x,y,t,strength){
        this.Imgid = Math.floor(Math.random() * 8);
        this.vel_x = 2;
        this.vel_y = 5;
        this.St_y = y;
        this.st_x = x;
        this.st_tx = t;
        this.st_ty = t;
        this.st_strength = strength;
        this.cur_strength = this.st_strength;
        this.curr_x = this.st_x;
        this.curr_y = this.St_y;
        this.live = true;
    }
    Trackmotion(curr_t) {
        console.log("stone traked");
        if(this.curr_x>590){
            this.vel_x = -2;
            this.st_tx = curr_t;
        }
        if(this.curr_x < 10){
            this.vel_x = 2;
            this.st_tx = curr_t;
        }
        if(this.curr_y>650){
            this.vel_y = -5;
            this.st_ty = curr_t;
        }
        if(this.curr_y < 0){
            this.vel_y = 5;
            this.st_ty = curr_t;
        }
        let tx = (curr_t - this.st_ty)/30;
        let ty = (curr_t - this.st_ty)/30;
        this.curr_x +=this.vel_x;
        this.curr_y +=this.vel_y;
        
    }
}
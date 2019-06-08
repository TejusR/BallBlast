class Canon{
    constructor(){
        this.pos = {
            x : 300,
            y : 680
        }
    }

    moveLeft(){
        if(this.pos.x>0)
        this.pos.x-=15;
    }

    moveRight(){
        if(this.pos.x<600)
        this.pos.x+=15;
    }

}
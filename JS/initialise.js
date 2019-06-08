class InitialLayout{
    
    welcome(){
        ctx.fillStyle = "#000000"
        ctx.font = "80px Righteous"
        ctx.fillText("WELCOME",(300 - (ctx.measureText("WELCOME").width)/2),180)
        this.clasic()
        this.infinite()
        this.highScore()

    }
    Gameover(){
        ctx.fillStyle = "#000000"
        ctx.font = "60px Monoton"
        ctx.fillText("GAME      OVER",(300 - (ctx.measureText("GAME      OVER").width)/2),180)
        this.clasic()
        this.infinite()
        this.highScore()
    }
    clasic(){
        ctx.fillStyle = "#FFFFFF"
        ctx.font = "40px Knewave"
        ctx.fillText("PLAY CLASSIC",(300 - (ctx.measureText("PLAY CLASSIC").width)/2),380)
    }
    infinite(){
        ctx.fillStyle = "#FFFFFF"
        ctx.font = "40px Knewave"
        ctx.fillText("PLAY INFINITE",(300 - (ctx.measureText("PLAY INFINITE").width)/2),500)
    }
    highScore(){
        ctx.fillStyle = "#000000"
        ctx.font = "20px Roboto"
        ctx.fillText("HIGHSCORE",(300 - (ctx.measureText("HIGHSCORE").width)/2),230) 
        ctx.font = "36px Gorditas"       
        ctx.fillText(HighScore,(300 - (ctx.measureText(HighScore).width)/2),270)
    }
    
}
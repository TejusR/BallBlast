 
  const canvas = document.getElementById('myCanvas');
  const stoneImgs = [document.getElementById('stoneImg1'),
  document.getElementById('stoneImg2'),
  document.getElementById('stoneImg3'),
  document.getElementById('stoneImg4'),
  document.getElementById('stoneImg5'),
  document.getElementById('stoneImg6'),
  document.getElementById('stoneImg7'),
  document.getElementById('stoneImg8')]
  const ctx = canvas.getContext('2d');
  const  init = new InitialLayout();
  const HighTag = "BallHighScore";
  let score = 0;
  let HighScore = new Number;
  let bullets = [];
  let stones = [new Stone(0,Math.floor((Math.random()*400)),2,Math.floor((Math.random()*100)+30),true)];
  let tb = 0;
  let ts = 0;
  let invFirRate = 10;
  let fireRate = 8;
  let stoneInter = 1500;
  let thresh = 12;
  let isClassic ;
  const BackGrad = ctx.createLinearGradient(0, 0, 0, 800);
      BackGrad.addColorStop(0, '#00ABEB');
      BackGrad.addColorStop(0.85, '#fff');
      BackGrad.addColorStop(0.85, '#26C000');
      BackGrad.addColorStop(1, '#fff');
  const canon = new Canon();
  const can_img = document.getElementById('canImg')
 let isGameOver = false;
 let isplaying = false;
 function initGame(){

  loadHighscore();
  canvas.addEventListener("mouseup",optionSelected,false);
  initBackground();
  ctx.drawImage(can_img,(canon.pos.x - 30),(canon.pos.y - 60),60,80);
  if(isGameOver){
      init.Gameover();
  }
  else {init.welcome()}
 
  if(isplaying){
    draw();
    return;
  }
  
 window.requestAnimationFrame(initGame);
 }
 function optionSelected(event){
  if(!isplaying){const rect = canvas.getBoundingClientRect();
   cl_x = event.pageX - rect.left;
   cl_y = event.pageY - rect.top;
   //alert("x : "+cl_x+"\nY :"+cl_y)
   console.log("x : "+cl_x+"\nY :"+cl_y);
   
   if(cl_x>180 && cl_x< 440){
     if(cl_y>340 && cl_y< 390){
       console.log("playclassic");
       
       isClassic = true;
       isplaying = true;
     }
     if(cl_y>460 && cl_y< 510){
       console.log("play infinite");
       
      isClassic = false;
      isplaying = true;
    }
   }}
 }
 function loadHighscore(){
   if(localStorage.getItem(HighTag)==null){
     HighScore = 0;
   }
   else{
     HighScore = JSON.parse(localStorage.getItem(HighTag))
   }
 }
 function GameOver() {
   console.log("game over");
   isplaying = false;
   isGameOver = true;
   score = 0;
   tb= 0;
   ts = 0;
   invFirRate = 10;
   fireRate = 8;
   stoneInter = 1500;
   thresh = 12;
   bullets = []
   stones = [new Stone(0,Math.floor((Math.random()*400)),2,Math.floor((Math.random()*100)+30),true)]
   if(score>HighScore){
     HighScore = score;
     localStorage.setItem(HighTag,JSON.stringify(score))
   }
 }
  window.addEventListener('keydown',function(e){
    if(isplaying){
    switch(e.keyCode){
      case 68:
      case 39: canon.moveRight();
      break;
      case 65:
      case 37 : canon.moveLeft();
      break;
    }
  }
  });
  window.addEventListener('keyup',function(e){
    if(isplaying){
      switch(e.keyCode){
      case 68:
      case 39: canon.moveRight();
      canon.moveRight();
      canon.moveRight();
      break;
      case 65 :
      case 37 : canon.moveLeft();
      canon.moveLeft();
      canon.moveLeft();
      break;
    }}
  });
  function check(value){
   
    return value.live == true;
  }
  function Filter(){
    
    nbullets = bullets.filter(check);
    bullets = nbullets;
    nstones = stones.filter(check)
    stones = nstones;
  }
  function generateBullet(){
    let blt;
    if(tb >= invFirRate){
      tb=0;
      if(score < 200){
      blt = new Bullet(canon.pos.x);
      bullets.push(blt);
      }
      else if(score > 200 && score <400){
        blt = new Bullet((canon.pos.x - 5));
      bullets.push(blt);
      blt = new Bullet((canon.pos.x + 5));
      bullets.push(blt);}
      else if(score > 400){
        blt = new Bullet(canon.pos.x);
      bullets.push(blt);
      blt = new Bullet((canon.pos.x - 10));
      bullets.push(blt);
      blt = new Bullet((canon.pos.x + 10));
      bullets.push(blt);
      }
    }
    
  }
  function drawBullets(){

    for (const key4 in bullets) {
      
      if (bullets.hasOwnProperty(key4)) {
        const bullet = bullets[key4];
        ctx.fillStyle = "#000000";
        ctx.save()
        ctx.beginPath();
        ctx.arc(bullet.pos_x,bullet.pos_y,5,0,2*Math.PI);    
        ctx.fill();  
        ctx.restore();
        
      }
    }
  }
  function printScore(){
    ctx.fillStyle = "#26C000";
    ctx.font = "56px Gordias";
    ctx.fillText(score,(300 - (ctx.measureText(score).width)/2),100);
    if(!isClassic){
      ctx.fillStyle = "#FF0000";
      ctx.font = "20px Knewave";
      ctx.fillText("Reload page to exit ",(300 - (ctx.measureText("Reload page to exit ").width)/2),130);
    }
  }
  function initBackground(){
    ctx.fillStyle = BackGrad;
  ctx.fillRect(0, 0, 600, 800);
  }
  function checkifhit(){
    
    for (const key1 in stones) {
      if (stones.hasOwnProperty(key1)) {
        const stone = stones[key1];
        stone.Trackmotion();
        if(isClassic){
          if(stone.pos_y > 630){

            if(!(stone.pos_x>(canon.pos.x+30) || (stone.pos_x+stone.st_strength)<canon.pos.x)){
              
              
              console.log("x is matching");
              
              GameOver();
            }
          }
        }
      }
    }
    for (const key2 in bullets) {
      if (bullets.hasOwnProperty(key2)) {
        const bullet = bullets[key2];
        bullet.updatePos(fireRate); 
        if(bullet.pos_y < 10)
          bullet.live = false;
        for (const key1 in stones) {
          if (stones.hasOwnProperty(key1)) {
            const stone = stones[key1];
            if(bullet.pos_x > stone.pos_x && bullet.pos_x < (stone.pos_x+Math.max(40,stone.cur_strength)) && bullet.pos_y > stone.pos_y && bullet.pos_y < (stone.pos_y+Math.max(40,stone.cur_strength))){
              stone.cur_strength--;
              bullet.live = false;
              if(stone.cur_strength<=0){
                stone.live = false;
                if(stone.OG){
               
                stones.push(new Stone(stone.pos_x,stone.pos_y,2,(Math.floor(stone.st_strength/2)),false));
                stones.push(new Stone(stone.pos_x,stone.pos_y,-2,(Math.floor(stone.st_strength/2)),false));
                }
              }
              score++;
              break;
            }
          }
        }


      }
    }
  }
  function drawStones(){
  
    for (const key3 in stones) {

      if (stones.hasOwnProperty(key3)) {
        const stone = stones[key3];
        
        ctx.drawImage(stoneImgs[stone.Imgid],stone.pos_x,stone.pos_y,Math.max(40,stone.cur_strength),Math.max(40,stone.cur_strength));
        ctx.font = ""+Math.floor(Math.max(40,stone.cur_strength)/2)+"px"+" Georgia"
        fillRect="#000000"
        ctx.fillText(stone.cur_strength,(stone.pos_x + (Math.max(40,stone.cur_strength)/2)-(ctx.measureText(stone.cur_strength).width)/2),(stone.pos_y + (Math.max(40,stone.cur_strength)/2)),100);

      }
    }
  }
  function generateStones() {
    if(ts>=((Math.random()*600)+stoneInter)){
      ts = 0;
      stones.push(new Stone(0,Math.floor((Math.random()*400)),2,Math.floor((Math.random()*100)+30),true));
    }
    
  }
  function controlFlow(){

    if(score >= thresh){
      fireRate+=2;
      invFirRate = Math.max(2,(invFirRate-1.5));
      stoneInter = Math.max(100,(stoneInter-100));
      thresh += (thresh);
      console.log("score"+score);      
      console.log("invfire"+invFirRate);
      console.log("firerte"+fireRate);
      console.log("stoneinter"+stoneInter);      
      console.log("thresh"+thresh);
      
      
      
    }
  }
function draw() {
  tb++;
  ts++;
  initBackground();
  printScore();
  controlFlow();
  generateBullet();
  generateStones();
  checkifhit();
  Filter();
  drawBullets();
  ctx.drawImage(can_img,(canon.pos.x - 30),(canon.pos.y - 60),60,80);
  drawStones();
  if(!isplaying){
    initGame();
    return
  }

  window.requestAnimationFrame(draw)
  
  }
  window.onload = initGame()
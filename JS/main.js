 
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
  let score = 0;
  let bullets = [];
  let stones = [new Stone(0,Math.floor(Math.random()*570),0,Math.floor(Math.random()*100))];
  let t = 1;
  const BackGrad = ctx.createLinearGradient(0, 0, 0, 800);
      BackGrad.addColorStop(0, '#00ABEB');
      BackGrad.addColorStop(0.85, '#fff');
      BackGrad.addColorStop(0.85, '#26C000');
      BackGrad.addColorStop(1, '#fff');
  const canon = new Canon();
  const can_img = document.getElementById('canImg')
 
  window.addEventListener('keydown',function(e){
    switch(e.keyCode){
      case 68:
      case 39: canon.moveRight();
      break;
      case 65:
      case 37 : canon.moveLeft();
      break;
    }
  });
  window.addEventListener('keyup',function(e){
    switch(e.keyCode){
      case 68:
      case 39: canon.moveRight();
      canon.moveRight();
      canon.moveRight();
      canon.moveRight();
      break;
      case 65 :
      case 37 : canon.moveLeft();
      canon.moveLeft();
      canon.moveLeft();
      canon.moveLeft();
      break;
    }
  });
  function check(value){
    console.log(value.curr_y);
    
    return value.curr_y > 10;
  }
  function filterBullet (){
    console.log(bullets);
    
    nbullets = bullets.filter(check);
    bullets = nbullets;
  }
  function generateBullet(){
    let blt;
    if(t%3 == 0){
      if(score < 200){
      blt = new Bullet(canon.pos.x,t);
      bullets.push(blt);
      }
      else if(score > 200 && score <400){
        blt = new Bullet((canon.pos.x - 5),t);
      bullets.push(blt);
      blt = new Bullet((canon.pos.x + 5),t);
      bullets.push(blt);}
      else if(score > 400){
        blt = new Bullet(canon.pos.x,t);
      bullets.push(blt);
      blt = new Bullet((canon.pos.x - 10),t);
      bullets.push(blt);
      blt = new Bullet((canon.pos.x + 10),t);
      bullets.push(blt);
      }
      score++
    }
    
  }
  function drawBullets(){

    for (const key4 in bullets) {
      console.log("bullet drawn");
      
      if (bullets.hasOwnProperty(key4)) {
        const bullet = bullets[key4];
        bullet.updatePos(t); 
        ctx.fillStyle = "#000000";
        ctx.save()
        ctx.beginPath();
        ctx.arc(bullet.pos_x,bullet.curr_y,5,0,2*Math.PI);    
        ctx.fill();  
        ctx.restore();
        
      }
    }
  }
  function printScore(){
    ctx.fillStyle = "#26C000";
    ctx.font = "56px Georgia"
    ctx.fillText(score,(300 - (ctx.measureText(score).width)/2),100);
  }
  function initBackground(){
    ctx.fillStyle = BackGrad;
  ctx.fillRect(0, 0, 600, 800);
  }
  function checkifhit(){
    console.log("check if hit");
    
    for (const key1 in stones) {
      if (stones.hasOwnProperty(key1)) {
        const stone = stones[key1];
        stone.Trackmotion(t);
      }
    }
    for (const key2 in bullets) {
      if (bullets.hasOwnProperty(key2)) {
        const bullet = bullets[key2];
        bullet.updatePos(t); 

      }
    }
  }
  function drawStones(){
  
    for (const key3 in stones) {
      console.log("draw stones");

      if (stones.hasOwnProperty(key3)) {
        const stone = stones[key3];
        ctx.drawImage(stoneImgs[0],stone.curr_x,stone.curr_y,stone.cur_strength,stone.cur_strength);
      }
    }
  }
function draw() {
  t++;
  initBackground();
  printScore();
  generateBullet();
  checkifhit();
  filterBullet();
  drawBullets();
  drawStones();
  ctx.drawImage(can_img,(canon.pos.x - 30),(canon.pos.y - 60),60,80);

  window.requestAnimationFrame(draw)
  
  }
  window.requestAnimationFrame(draw)

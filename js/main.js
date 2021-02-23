 var canvas = document.querySelector('canvas');
 var ctx = canvas.getContext('2d');

 var width = canvas.width = window.innerWidth;
 var height = canvas.height = window.innerHeight*0.8;

 function random(min,max) {
   var num = Math.floor(Math.random()*(max-min)) + min;
   return num;
 }

 function Ball(x, y, velX, velY, color, size) {
   this.x = x;
   this.y = y;
   this.velX = velX;
   this.velY = velY;
   this.color = color;
   this.size = size;
   
   this.life = 1;
   this.exists = true;
   
   this.ghostSwc = true;
   this.ghost = true;
 }

 Ball.prototype.draw = function() {
   ctx.beginPath();
   ctx.fillStyle = this.color;
  // ctx.fillRect(this.x, this.y, this.size, this.size);//square
   ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);//ball
   ctx.fill();
 }


 Ball.prototype.update = function() {
   if ((this.x + this.size) >= width) {
     this.velX = -(this.velX);
   }

   if ((this.x - this.size) <= 0) {
     this.velX = -(this.velX);
   }

   if ((this.y + this.size) >= height) {
     this.velY = -(this.velY);
   }

   if ((this.y - this.size) <= 0) {
     this.velY = -(this.velY);
   }

   this.x += this.velX;
   this.y += this.velY;
 }

function unghost(x) {
 
 console.log("unghosted");
 setTimeout(function() {
  x.ghost = false;
  x.ghostSwc = true;
  }, 3000);

}

let divi = false;
function divis() {
 if(divi) {divi=false;console.log("NotDibisible");} else {divi=true;console.log("Divisibe");}
}

let ballExiCnt = 50;//amount to divide to 

 Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j]) && balls[j].exists) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
      
        if(this.isVampire==true) {//VAMPIRE
         if(balls[j].isVampire==true) continue;
         balls[j].life--;
         if(balls[j].life==0) {
          balls[j].exists = false;
          ballExiCnt++;//
          continue;
          }
         //eaten count
        } 
        
     if(balls[j].isVampire==undefined)  balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        
      if(divi==true && ballExiCnt>0 && this.ghost==false) {  //DIVISION
       ballExiCnt--;
       var size = random(10,20);
       balls.push(new Ball(
        this.x,
        this.y,
        random(-5,5),//-5 5 SPEED
        random(-5,5),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size//size
       ));
      if(this.ghost==false) {//nuclear control
       this.ghost = true;
       }
      }     
         
              
      }
    }
  }
}

 var balls=[];
let ballLen=3;//from interface.js!!
let pause=false;

let timeRec = [];
let backy = false;
let backInd = 0;

let forw = false;

  
 function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  while (balls.length < ballLen) {//amount and size
    var size = random(10,20); //SIZE
    var ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-5,5),//-5 5 SPEED
      random(-5,5),
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      size
    );
    balls.push(ball);
  }
////////////first Creatiom canvas logic

if(backy==false) {

 if(timeRec.length>=600) timeRec = timeRec.slice(-300);//TEST TIME

  backInd = timeRec.length;//-1 OR NOT?
  for (var i = 0; i < balls.length; i++) {
   if(balls[i].exists == false) continue;
   
    balls[i].draw();
 if(pause==false) {
 
  if(balls[i].ghostSwc==true) {//what is the behavior of ghost?
    if(balls[i].ghost==true) {
     unghost(balls[i]);
     balls[i].ghostSwc=false;
     }
    }
 
  if(balls[i].isPlayer!==true)  balls[i].update();
    balls[i].collisionDetect();

  if(timeRec[backInd]==undefined) timeRec.push([]);
  let tempa = Object.assign({},balls[i]);
  tempa.__proto__ = balls[i].__proto__
  timeRec[backInd].push(tempa);//time tracking
 
    }
   }
  
  } else if(backy==true && forw==true) {
  
   let len = timeRec[backInd-1].length-1;
  
   for(let i=0;i<=len;i++) {
    if(timeRec[backInd-1][i].exists==true) timeRec[backInd-1][i].draw();
    }
    
   if(backInd<timeRec.length-1) {
     backInd++;
    } else {
     backy = false;
     forw = false;
     pause = false;
    }
  
  } else if(backy==true) {
   
   let len = timeRec[backInd-1].length-1;
   
   for(let i=len;i>=0;i--) {
    if(timeRec[backInd-1][len-i].exists==true) timeRec[backInd-1][len-i].draw();
   }
   //ADD COUNTER TO TEST TIMEFRAME
   if(backInd-1>0) {//chk skipping the second
    backInd--;
    } 
  
  }
 
 
  requestAnimationFrame(loop);
}

loop();

function paused() {
 if(pause==false) {pause=true;console.log("paused");} else {pause=false;console.log("unpaused");}
}

function back() {
 if(backy==false) {backy=true;} else {backy=false;}
}

function forward() {
 if(forw==false) {
  forw=true;
  console.log("forw==true");
  } else {
  forw=false;
  console.log("forw==false");
  }
}


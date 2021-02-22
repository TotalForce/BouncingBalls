function addBalls() {
 let x=document.getElementById("addsubBalls").value;//innerhtml
 alert("added");
ballLen=x;
}

function subBalls() {
 let x=document.getElementById("addsubBalls").value;
 alert("subed");
 for(let i=1;i<=x;i++) {
  balls.pop();
  //balls.length=balls.length-1;
  ballLen--;
 }
}

function vampire() {

 var size = random(25,35);
 let vamp = new Ball(
        random(0 + size,width - size),
        random(0 + size,height - size),
        random(-5,5),//-5 5 SPEED
        random(-5,5),
        'rgb(' + random(255,255) + ',' + random(0,0) + ',' + random(0,0) +')',
        size//size
       );
 vamp.isVampire = true;   
 balls.push(vamp);
 console.log("VampireHasCome");
 ballLen++;

}

let createMode = false;

function CreateMode() {
 if(createMode==false) {
  createMode = true;
  console.log("CreateMode is on");
  } else {
  createMode = false;
  console.log("CreateMode is off");
  }
}

let destroyMode = false;

function DestroyMode() {
 if(destroyMode==false) {
  destroyMode = true;
  console.log("DestroyMode is on");
  } else {
  destroyMode = false;
  console.log("DestroyMode is off");
  }
}

let playerMode = false;

function player() {
 if(playerMode==false) {
  playerMode = true;
  console.log("Player appears");
  } else {
  playerMode = false;
  for(let i=0;i<balls.length;i++) {
   if(balls[i].exists==false) continue;
   if(balls[i].isPlayer==true) balls[i].isPlayer = false;
   }
  console.log("All player dissapear");
  }
}


let exploreMode = false;

function ExploreMode() {
 if(exploreMode==false) {
  exploreMode = true;
  console.log("Explore mode is on");
  } else {
  /*
  const removeElements = (elms) => elms.forEach(el => el.remove());

// Use like:
removeElements( document.querySelectorAll(".remove") );
*/
  exploreMode = false;
  console.log("Explore mode is off");
  let stats = document.getElementsByClassName("statsMenus");
  for(let bi=0;bi<=stats.length-1;bi++) {
  //  stats[bi].parentNode.removeChild(stats[bi]);
    document.body.removeChild(stats[bi]);
    bi--;
   }
  }
}

let moveMouse = false;

function MoveMouse() {
 if(moveMouse==false) {
  moveMouse = true;
  console.log("Mouse is moving");
  } else {
  moveMouse = false;
  console.log("Mouse is not moving");
  }
}

let body = document.body;

canvas.addEventListener("click", function(e) {//O[PTIMIZE
 
 const mousePos = {
  x: e.clientX - canvas.offsetLeft,
  y: e.clientY - canvas.offsetTop
  };
  
 if(createMode==true) {
 
  let size = random(10,20);
  balls.push(new Ball(
   mousePos.x,
   mousePos.y,
   random(-5,5),//-5 5 SPEED
   random(-5,5),
   'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
   size//size
   ));  
   
   ballLen++;
  }
  
 if(destroyMode==true) {
  for(let i=0;i<balls.length;i++) {
   if(balls[i].exists==false) continue;
   var dx = mousePos.x - balls[i].x;
   var dy = mousePos.y - balls[i].y;
   var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 1 + balls[i].size) {//1 +
        balls[i].exists = false;
       }
  }
 }
 
 if(exploreMode==true) {//click in other area should disable it
  for(let i=0;i<balls.length;i++) {
   if(balls[i].exists==false) continue;
   var dx = mousePos.x - balls[i].x;
   var dy = mousePos.y - balls[i].y;
   var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 1 + balls[i].size) {//1 //create and delete menu
        let noda = document.createElement("P");
        document.body.appendChild(noda);
        noda.innerHTML = balls[i].size;
        noda.style.position = "absolute";
        noda.style.backgroundColor = "red";
        noda.style.left = balls[i].x + "px";
        noda.style.top = balls[i].y + "px";
        noda.style.zIndex = 0;  
        noda.classList.add("statsMenus");
        //when disabled makes p dissapear or hidden
        //if show menu, makes it display: all and calibrates coordinates                         
        console.log("AppendedInfo");   
                           
       }
  }
 }
 
 if(playerMode==true) {//maybe remove all listeners
  for(let i=0;i<balls.length;i++) {
   if(balls[i].exists==false) continue;
   var dx = mousePos.x - balls[i].x;
   var dy = mousePos.y - balls[i].y;
   var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 1 + balls[i].size) {//1+
      
        if(balls[i].isPlayer==true) {
         balls[i].isPlayer = false;
         console.log(i + "is not a player now");
         } else {
         balls[i].isPlayer = true;
         console.log(i + "is a player now");
         }
         
         
 window.onkeydown = function(e) {
    for(let i=0;i<balls.length;i++) {
     if(balls[i].exists==false || balls[i].isPlayer!==true) continue;
     var _this = balls[i];
    let sp = 3;
     if (e.keyCode === 68) {
       _this.x -= _this.velX*sp;
     } else if (e.keyCode === 65) {
       _this.x += _this.velX*sp;
     } else if (e.keyCode === 87) {
       _this.y -= _this.velY*sp;
     } else if (e.keyCode === 83) {
       _this.y += _this.velY*sp;
     }
     
     }
   }
  
  if(moveMouse==true) {
  
    var _this = balls[i];
   canvas.addEventListener("mousemove", function(e) {
    if(_this.isPlayer==true) {
     mousePos.x = e.clientX;
     mousePos.y = e.clientY;
     console.log("mouse over");
     _this.x = mousePos.x;
     _this.y = mousePos.y;
     }
   });    
   
 }
         
         
       }
  }
}

});

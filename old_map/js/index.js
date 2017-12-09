var canvas;

function init() {
  var searchColor = {    
    r: 181,
    g: 45,
    b: 49,
    rTreshold: 70,
    gTreshold: 60,
    bTreshold: 60
  }

  console.log("init...");
  var img = document.getElementById("img");
  img.style.display = "none";
  
  //remove if exists
  if(canvas) {
    canvas.parentNode.removeChild(canvas);
  }

  canvas = document.createElement("canvas");
  canvas.id = 'canvasResult';
  canvas.width = img.width;
  canvas.height = img.height;
  canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);

  for(var x=0;x<img.width;x++) {
    for(var y=0;y<img.height;y++) {   
      var p = getPixel(x, y);
      //console.log(p);

      if(
        (
          (p[0] - searchColor.rTreshold < searchColor.r) && (p[0] + searchColor.rTreshold > searchColor.r) &&
          (p[1] - searchColor.gTreshold < searchColor.g) && (p[1] + searchColor.gTreshold > searchColor.g) &&
          (p[2] - searchColor.bTreshold < searchColor.b) && (p[2] + searchColor.bTreshold > searchColor.b)
        )
        
      ) {
        setPixel(x, y);
      }      
    }
  }

  canvasDiv.appendChild(canvas);
}

function getPixel(x, y) {
  var pixelData = canvas.getContext('2d').getImageData(x, y, 1, 1).data;  
  return pixelData;
}

function setPixel(x, y) {  
  canvas.getContext("2d").fillStyle = "rgba("+255+","+255+","+1+","+(255/255)+")";  
  canvas.getContext("2d").fillRect( x, y, 1, 1 ); 
}

//ui functions
//mouse getpixel
var hold = false;

$(document).ready(function(){
  $('#canvasDiv').on('mousemove',function(e){
    var x = e.offsetX;
    var y = e.offsetY;

    var px = getPixel(x, y);

    var r = px[0];
    var g = px[1];
    var b = px[2];
    var a = px[3];

    if(!hold) {
      $('#colorPreview').css('background-color', 'rgba(' + r + ',' + g + ',' + b + ',' + a/255 + ')');
      $('#colorPreviewCode').html(r + ',' + g + ',' + b + ',' + a/255);
    }
  });

  $('#canvasDiv').on('click',function(){
    switch(hold) {
      case false:
          {
            hold = true;
          }
          break;
      case true:
          {
            hold = false;
          }
          break;      
  }    
  });
})

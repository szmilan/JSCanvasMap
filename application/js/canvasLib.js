function CanvasLib() {
    var canvas;
    var context;
    
    //initializes an empty canvas element
    this.createCanvas = function(canvasId) {
        canvas = document.createElement('canvas');
        
        canvas.id = "canvasId";
        canvas.width = 100;
        canvas.height = 100;
        canvas.style.border = "1px solid";
        context = canvas.getContext("2d");
    }
    //renders canvas into the requested element
    this.renderCanvasInto = function(elmId, callback) {
        var elm = document.getElementById(elmId);

        while (elm.firstChild) {
            elm.removeChild(elm.firstChild);
        }

        elm.appendChild(canvas);
    }
    //converts img -> canvas
    this.imgToCanvas = function() {
        var img = new Image();   // Create new img element
        img.addEventListener('load', function() {
            canvas.width = img.width;
            canvas.height = img.height;

            context.drawImage(img, 0, 0);
        }, false);
        img.src = 'img/map.jpg';
    }

    this.drawRandomDots = function(w, h) {
        context = canvas.getContext("2d");
        for(var i=0;i<w;i++) {
            for(var j=0;j<h;j++) {
                context.fillStyle = "rgba("+255+","+0+","+0+","+(255/255)+")";
                context.fillRect( i, j, 1, 1 );
            }
        }
    }

    this.mapImage = function() {

    }

    this.pixelateImage = function(gw, gx) {
        var wSize = Math.round(parseInt(canvas.width) / gw);
        var hSize = Math.round(parseInt(canvas.height) / gx);
        
        for(var x=0;x<canvas.width; x+=wSize) {
            for(var y=0;y<canvas.height; y+=hSize) {
                //console.log(x + ':' + y);

                context.beginPath();
                context.rect(x-1, y-1, wSize, hSize);                 
                context.lineWidth = 1;
                context.strokeStyle = 'rgba(0,0,0,0.6)';
                context.stroke();

                var searchColor = {    
                    r: 0,
                    g: 0,
                    b: 0,
                    rTreshold: 70,
                    gTreshold: 60,
                    bTreshold: 60
                  }                
                
                //this.findInRegion(x, y, wSize, hSize, searchColor, '');
            }
        }
    }

    this.findInRegion = function(rx, ry, wSize, hSize, searchColor, pixelsToMatchPercent) {
        var foundCount = 0;

        for(var x=rx;x<rx+wSize;x++) {
            for(var y=ry;y<ry+hSize;y++) {
                var p = this.getPixel(x, y);
                //console.log(p);
          
                if(
                  (
                    (p[0] - searchColor.rTreshold < searchColor.r) && (p[0] + searchColor.rTreshold > searchColor.r) &&
                    (p[1] - searchColor.gTreshold < searchColor.g) && (p[1] + searchColor.gTreshold > searchColor.g) &&
                    (p[2] - searchColor.bTreshold < searchColor.b) && (p[2] + searchColor.bTreshold > searchColor.b)
                  )
                  
                ) {
                    foundCount++;
                    this.setPixel(x, y);                    
                }                  
            }
        }

        //console.log(foundCount);
    }

    this.findEdge = function() {

    }

    this.getPixel = function(x, y) {
        var pixelData = canvas.getContext('2d').getImageData(x, y, 1, 1).data;  
        return pixelData;
    } 
    
    this.setPixel = function(x, y) {  
        context.fillStyle = "rgba("+255+","+255+","+1+","+(255/255)+")";  
        context.fillRect( x, y, 1, 1 ); 
      }    
}

var cnv1 = new CanvasLib();
function Init() {    
    cnv1.createCanvas("cv1");
    cnv1.imgToCanvas();    

    cnv1.renderCanvasInto("canvaswrapper");
}

function Test() {
    //cnv1.drawRandomDots(100, 200);
    cnv1.pixelateImage(20, 20);
}
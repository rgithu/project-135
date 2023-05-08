img="";
status1 = "";
object= [];


function preload(){
img = loadImage('livingroom.png');
}

function setup(){
    canvas = createCanvas(700 , 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
}

function start(){
    object_detector = ml5.objectDetector('cocossd',modelLoaded); 
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model is Loaded.");
    status1=true;
    
}


function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object = results;
    }


function draw(){
    image(img , 0 ,  0, 700 , 400);
    
    if(status1 != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        object_detector.detect(video , gotResult);
        for(var i = 0;i<object.length;i++){
          document.getElementById("status").innerHTML="Status : Object Detected";
          
          fill(r , g , b);
          noFill();
          percent = floor(object[i].confidence*100);
          text("Tv and sofa"+percent+"%" ,  object[i].x+15 , object[i].y+15);
          stroke(r , g, b);
          rect(object[i].x , object[i].y , object[i].width , object[i].height);
        }
    }
}

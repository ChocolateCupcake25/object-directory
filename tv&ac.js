img='';
status='';
objects=[];
function preload(){
    img=loadImage('tv&ac.jpg');
}
function setup(){
    canvas=createCanvas(640,400);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
}
function modelLoaded(){
    console.log('Model is Loaded!');
    status= true;
    objectDetector.detect(img,gotResults);
}
function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}
function draw(){
    image(img,0,0,640,400);
    if(status!=''){
        for(i=0;i<objects.length;i++){
            fill('#f20548');
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + ' ' + percent + '%',objects[i].x,objects[i].y);
            noFill();
            stroke('#f20548');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
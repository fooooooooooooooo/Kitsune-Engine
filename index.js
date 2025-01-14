Win_title("Kitsune-Builder"); //names title
var scene = [];

const { loadBrk, BV } = require('./KB/importer/brk.js');

//basic create objects
var cube_model = new Model("./cube.obj");

var plane_model = new Model("./KB/models/Plane.obj");

var studs = new Texture("./KB/textures/Brick/stud.png");

var gizmo_arrow = new Model("./KB/interface_models/arrow.obj");
var dot = new Texture("./KB/dot.png");


//player camera
var p_cam = new Camera();
p_cam.position = new Vector3(0,2,0);
p_cam.rotation = new Vector3(0,0,0);
SetMainCam(p_cam);

//player light
var p_torch = new PointLight();

var rainbow = new Shader("./KB/shaders/sample");
rainbow.setVec3("color", new Vector3(1, 0, 0));

rainbow.setFloat("y_scan", 0.1);
rainbow.setBool("base", false);

var outline = new Shader("./KB/shaders/outline");

// var ellie = new Prop();
// ellie.position = new Vector3(0,1,0);
// ellie.scale = new Vector3(.5,.5,.5)
// var el = new PointLight();
// el.position = new Vector3(2,1.5,2);

var hack = new Font();
hack.GetFontFile("./KB/fonts/Varela-Regular.ttf");

var pannel_shader = new Shader("./KB/shaders/interface/bars");

var top_bar = new ImageElement();
top_bar.position = new Vector2(innerWidth,innerHeight/2);
top_bar.scale = new Vector2(innerWidth, 500);
top_bar.texture = dot;
top_bar.shader = pannel_shader;

var side_bar = new ImageElement();
side_bar.position = new Vector2(0,0);
side_bar.scale = new Vector2(0, 0);
side_bar.texture = dot;
side_bar.shader = pannel_shader;

var logo = new ImageElement();
logo.position = new Vector2(200,200);
logo.scale = new Vector2(500, 500);
logo.texture = new Texture("./KB/logo.png");

var dev_text = new TextElement();
dev_text.alignX = "left";
dev_text.alignY = "top";
dev_text.position = new Vector2(5, innerHeight-100);
dev_text.font = hack;
dev_text.color = new Vector3(1,1,0);
dev_text.scale = 0.5;
dev_text.text = "Kitsune Builder"

var vvv = new TextElement();
vvv.alignX = "left";
vvv.alignY = "top";
vvv.position = new Vector2(5, innerHeight-500);
vvv.font = hack;
vvv.color = new Vector3(1,1,0);
vvv.scale = 0.5;
vvv.text = "It Just works :3"

var fdsafdsaf = new ButtonElement();
fdsafdsaf.alignX = "center";
fdsafdsaf.alignY = "center";
fdsafdsaf.position = new Vector2(5, innerHeight-100);
fdsafdsaf.font = hack;
fdsafdsaf.color = new Vector3(1,1,0);
fdsafdsaf.scale = new Vector2(110, 30);
fdsafdsaf.Tscale = 0.5;
fdsafdsaf.text = "add brick";

var caa = new ButtonElement();
caa.alignX = "center";
caa.alignY = "center";
caa.position = new Vector2(5, innerHeight-100);
caa.font = hack;
caa.color = new Vector3(1,0,0);
caa.scale = new Vector2(110, 30);
caa.Tscale = 0.5;
caa.text = "center";

var bsdfdsfdsa = new Texture("./KB/textures/Brick/stud.png");

fdsafdsaf.texture = dot;
caa.texture = dot;

var butt = 0;

async function nya () {
    
    if(butt == 0){
        caa.text = "bottom";
        caa.alignY = "bottom";
        butt=1;
    }else if(butt == 1){
        caa.text = "top";
        caa.alignY = "top";
        butt=2;
    }else if(butt == 2){
        caa.text = "center";
        caa.alignY = "center";
        butt=0;
    }
    
}

function nhovered() {
    caa.color = new Vector3(1,0,0);
}

function munhovered() {
    caa.color = new Vector3(1,1,0);
}

caa.addEventListener("pressed", nya)
caa.addEventListener("hover", nhovered);
caa.addEventListener("unhover", munhovered);

var lethinggy = new Shader("./testers/meow");
async function pressed () {
    
    fdsafdsaf.text = "add brick";

    var ray = p_cam.CamLookAt(new Vector2(innerWidth/2,innerHeight/2),1000);

    var ara = new Vector3(ray.position.x*100+p_cam.position.x, ray.position.y*100+p_cam.position.y, ray.position.z*100+p_cam.position.z)

    var point = RayCast(p_cam.position, ara);

    if(point.hasHit){
        let objectc = new Prop();
        objectc.model = cube_model;
        objectc.texture = studs;

        objectc.position = point.position;
        objectc.scale = new Vector3(1,1,1);

        // objectc.texture = dot;
        // objectc.shader = rainbow;
        objectc.setVec3("brick_size", objectc.scale);
        objectc.setVec3("color", new Vector3(1,1,1));
        objectc.setBool("dont", false);
        objectc.shader = lethinggy;
    
        objectc.create_physbody(null, null, null, 1);
    
        scene.push( objectc );
    }
}

function hovered() {
    fdsafdsaf.color = new Vector3(1,0,0);
}

function unhovered() {
    fdsafdsaf.color = new Vector3(1,1,0);
}

fdsafdsaf.addEventListener("pressed", pressed);
fdsafdsaf.addEventListener("hover", hovered);
fdsafdsaf.addEventListener("unhover", unhovered);

//
//player movement
//
 function pivot_point(place, center, rot){
    var resultx = Math.cos(rot)*(place.x-center.x)-Math.sin(rot)*(place.y-center.y)+center.x
    var resulty = Math.sin(rot)*(place.x-center.x)+Math.cos(rot)*(place.y-center.y)+center.y
    return {"x": resultx, "y": resulty};
 } 

  var w = false;
  var s = false;
  var a = false;
  var d = false;
  var shift = false;
  var space = false;
  var p = false;
  var l = false;
  
function buttonpushedpog(event){
    var keyCode = event;

    if (keyCode == 87) 
        w=true;
    
    if (keyCode == 83) 
        s=true;

    if (keyCode == 65)
        a=true;

    if (keyCode == 68)
        d=true;

    if (keyCode == 340)
        shift=true;

    if (keyCode == 32)
        space=true;

    if (keyCode == 80)
        p=true;

    if (keyCode == 76)
        l=true;

    //print(keyCode);
}

function buttonthedpog(event){
    var keyCode = event;

    if (keyCode == 87) 
        w=false;

    if (keyCode == 83) 
        s=false;

    if (keyCode == 65)
        a=false;

    if (keyCode == 68)
        d=false;

    if (keyCode == 340)
        shift=false;

    if (keyCode == 32)
        space=false;

    if (keyCode == 80)
        p=false;

    if (keyCode == 76)
        l=false;

}

Input.addEventListener("keypress", buttonpushedpog);
Input.addEventListener("keyrelease", buttonthedpog);

var m1 = false; //left
var m2 = false; //right
var m3 = false; //middle

function mousepushedpog(event){
  var keyCode = event;

    if (keyCode == 0) 
        m1=true;

    if (keyCode == 1) 
        m2=true;

    if (keyCode == 2) 
        m3=true;

//   print(keyCode);
}

function mousethedpog(event){
  var keyCode = event;

    if (keyCode == 0) 
        m1=false;

    if (keyCode == 1) 
        m2=false;

    if (keyCode == 2) 
        m3=false;

}

Input.addEventListener("mousepress", mousepushedpog);
Input.addEventListener("mouserelease", mousethedpog);

function radians(dgr){return dgr*(Math.PI/180);}
function degrees(rag){return rag*180/Math.PI;}

var firstMouse = true;
var yaw   = -90.0;
var pitch =  0.0;
var lastX =  800.0 / 2.0;
var lastY =  600.0 / 2.0;
var cameraFront = new Vector3(0,1,0);

var xpos;
var ypos;

function mousty(event){

    //print("mouse x: " + event.xpos);
    //print("mouse y: " + event.ypos);
    xpos = event.xpos
    ypos = event.ypos

    if(!m3) return;

    if (firstMouse)
    {
        lastX = xpos;
        lastY = ypos;
        firstMouse = false;
    }

    let xoffset = xpos - lastX;
    let yoffset = lastY - ypos; // reversed since y-coordinates go from bottom to top
    lastX = xpos;
    lastY = ypos;

    let sensitivity = 0.1; // change this value to your liking
    xoffset *= sensitivity;
    yoffset *= sensitivity;

    yaw += xoffset;
    pitch -= yoffset;

    // make sure that when pitch is out of bounds, screen doesn't get flipped
    if (pitch > 89.0)
        pitch = 89.0;
    if (pitch < -89.0)
        pitch = -89.0;

    let front = new Vector3();
    front.x = Math.cos(radians(yaw)) * Math.cos(radians(pitch));
    front.y = Math.sin(radians(pitch));
    front.z = Math.sin(radians(yaw)) * Math.cos(radians(pitch));
    cameraFront = front.Normalize();
    p_cam.LookAt(new Vector3(p_cam.position.x + cameraFront.x, p_cam.position.y + cameraFront.y, p_cam.position.z + cameraFront.z));
}

Input.addEventListener("mousemove", mousty);

BV(loadBrk("./11894.brk"), cube_model, plane_model, studs, rainbow, scene, dev_text);
print("pog", scene.length);

CursorPin(false);

var speed = 0.2;
var maxspeed = 1;

var monark = false;

var sxsss = 0;


var v = new Prop();
v.model = cube_model;
v.position = new Vector3(0,0,0);
v.scale = new Vector3(0.1, 0.1, 0.1)
v.texture = dot;
v.shader = outline;
v.setVec3("color", new Vector3(1,0.3,0.3));

var xar = new Prop();
xar.model = gizmo_arrow;
xar.texture = dot;
xar.shader = rainbow;
xar.setVec3("color", new Vector3(1,0,0));
xar.setBool("dont", true);
xar.position = new Vector3(0, 1, 0);
xar.depthdraw(true);
xar.create_physbody(null, new Vector3(0.5, 1, 0.5), null, 4^2);

var yar = new Prop();
yar.rotation = new Vector3(Math.PI/2,0,0)
yar.model = gizmo_arrow;
yar.texture = dot;
yar.shader = rainbow;
yar.setVec3("color", new Vector3(0,1,0));
yar.setBool("dont", true);
yar.position = new Vector3(0, 0, 1);
yar.depthdraw(true);
yar.create_physbody(null, new Vector3(0.5, 1, 0.5), null, 4^2);

var zar = new Prop();
zar.rotation = new Vector3(0,0,Math.PI/2)
zar.model = gizmo_arrow;
zar.texture = dot;
zar.shader = rainbow;
zar.setVec3("color", new Vector3(0,0,1));
zar.setBool("dont", true);
zar.position = new Vector3(-1, 0, 0);
zar.depthdraw(true);
zar.create_physbody(null, new Vector3(0.5, 1, 0.5), null, 4^2);



//  0=none
//  1=x
//  2=y
//  3=z
var holding = 0;

var hold_offsetx = 0;
var hold_offsety = 0;

var holding_base_pose = new Vector3(0,0,0);
var last_ray;

var holding_selected = v;

var deltaTime = 1000;
function tick(delta){
    vvv.position = new Vector2(10, innerHeight-50);

    var bar_size = 60;
    top_bar.position = new Vector2(innerWidth/2,innerHeight-bar_size/2);
    top_bar.scale = new Vector2(innerWidth, bar_size);

    var size_out = 200;
    side_bar.position = new Vector2(innerWidth-size_out/2, innerHeight/2-bar_size/2);
    side_bar.scale = new Vector2(size_out, innerHeight-bar_size);

    logo.position = new Vector2(innerWidth-bar_size/2,innerHeight-bar_size/2);
    logo.scale = new Vector2(bar_size, bar_size);

    fdsafdsaf.position = new Vector2(500, innerHeight-35);
    caa.position = new Vector2(650, innerHeight-35);

    rainbow.setFloat("y_scan", deltaTime);


    rainbow.setVec3("color", new Vector3(Math.sin(deltaTime), 0, 0));

    // print(p_cam.rotation.x, p_cam.rotation.y, p_cam.rotation.z);
    
    if(m1 && holding == 0){
        
        var ray = p_cam.CamLookAt(new Vector2(xpos,ypos),1000);

        var ara = new Vector3(ray.position.x*100+p_cam.position.x, ray.position.y*100+p_cam.position.y, ray.position.z*100+p_cam.position.z)

        var point = RayCast(p_cam.position, ara, 1);

        if(point.hasHit){
            holding_selected = point.object;

            xar.position = new Vector3(holding_selected.position.x, holding_selected.position.y+1, holding_selected.position.z);
            yar.position = new Vector3(holding_selected.position.x, holding_selected.position.y, holding_selected.position.z+1);
            zar.position = new Vector3(holding_selected.position.x-1, holding_selected.position.y, holding_selected.position.z);

            v.position = holding_selected.position;
            v.scale = new Vector3(holding_selected.scale.x+0.04,holding_selected.scale.y+0.04,holding_selected.scale.z+0.04);

            print(holding_selected._id, ara.x, ara.y, ara.z)
        }
    }else if(m1 && holding !== 0){
        
        var ray = p_cam.CamLookAt(new Vector2(xpos,ypos),1000);
        
        let distencear = Math.sqrt(Math.pow(holding_base_pose.x-p_cam.position.x,2)+Math.pow(holding_base_pose.y-p_cam.position.y,2)+Math.pow(holding_base_pose.z-p_cam.position.z,2));

        let nowx = (hold_offsetx-xpos)/(innerWidth/distencear);
        let nowy = (hold_offsety-ypos)/(innerHeight/distencear);

        if(holding == 1){
            holding_selected.position = new Vector3(holding_base_pose.x, holding_base_pose.y+nowy, holding_base_pose.z);
        }else if(holding == 2){
            if(p_cam.rotation.y >= 0)
                var side = 1;
            else
                var side = -1;
            holding_selected.position = new Vector3(holding_base_pose.x, holding_base_pose.y, holding_base_pose.z-nowx*side);
        }else if(holding == 3){
            if(p_cam.rotation.x <= 2)
                var side = 1;
            else
                var side = -1;
            holding_selected.position = new Vector3(holding_base_pose.x-nowx*side, holding_base_pose.y, holding_base_pose.z);
        }

        xar.position = new Vector3(holding_selected.position.x, holding_selected.position.y+1, holding_selected.position.z);
        yar.position = new Vector3(holding_selected.position.x, holding_selected.position.y, holding_selected.position.z+1);
        zar.position = new Vector3(holding_selected.position.x-1, holding_selected.position.y, holding_selected.position.z);
    }else{
        holding_base_pose = holding_selected.position;

        var ray = p_cam.CamLookAt(new Vector2(xpos,ypos),1000);

        last_ray = ray;

        var ara = new Vector3(ray.position.x*100+p_cam.position.x, ray.position.y*100+p_cam.position.y, ray.position.z*100+p_cam.position.z)

        var point = RayCast(p_cam.position, ara, 4^2);

        hold_offsetx = xpos;
        hold_offsety = ypos;

        if(point.hasHit){

            if(point.object._id == xar._id){
                xar.setVec3("color", new Vector3(1,0.3,0.3));
                holding = 1;
            }else if(point.object._id == yar._id){
                yar.setVec3("color", new Vector3(0.3,1,0.3));
                holding = 2;
            }else if(point.object._id == zar._id){
                zar.setVec3("color", new Vector3(0.3,0.3,1));
                holding = 3;
            }else{
                xar.setVec3("color", new Vector3(1,0,0));
                yar.setVec3("color", new Vector3(0,1,0));
                zar.setVec3("color", new Vector3(0,0,1));
                holding = 0;
            }
        }else{
            xar.setVec3("color", new Vector3(1,0,0));
            yar.setVec3("color", new Vector3(0,1,0));
            zar.setVec3("color", new Vector3(0,0,1));
            holding = 0;
        }
    }

    // v.position = ray.position;

    p_torch.position = p_cam.position;

    dev_text.position = new Vector2(10, innerHeight-24);

    if(p)
    deltaTime = deltaTime+0.5;

    if(l)
    deltaTime = deltaTime-0.5;

    let cam_rot = p_cam.rotation.y;

    let current = {x:0,y:0};

    let temp = {x:0,y:0};

    var cameraSpeed = 0.4;

    if(m3){
        if (w) {
            p_cam.position = new Vector3(cameraSpeed * cameraFront.x + p_cam.position.x,-cameraSpeed * cameraFront.y + p_cam.position.y,cameraSpeed * cameraFront.z + p_cam.position.z);
        } 
        if (s) {
            p_cam.position = new Vector3(-cameraSpeed * cameraFront.x + p_cam.position.x,cameraSpeed * cameraFront.y + p_cam.position.y,-cameraSpeed * cameraFront.z + p_cam.position.z);
        }
        if (a) {
            p_cam.position = new Vector3(cameraSpeed * cameraFront.z + p_cam.position.x,p_cam.position.y,-cameraSpeed * cameraFront.x + p_cam.position.z);
        } 
        if (d) {
            p_cam.position = new Vector3(-cameraSpeed * cameraFront.z + p_cam.position.x,p_cam.position.y,cameraSpeed * cameraFront.x + p_cam.position.z);
        } 
        if (shift) {
            p_cam.position = new Vector3(p_cam.position.x,p_cam.position.y-cameraSpeed,p_cam.position.z);
        } 
        if (space) {
            p_cam.position = new Vector3(p_cam.position.x,cameraSpeed + p_cam.position.y,p_cam.position.z);
        }

        // p_torch.position = p_cam.position;

        CursorPin(true);
    }else{
        firstMouse = true;
        CursorPin(false);
    }
        

    if(player.LinearVelocity.z < maxspeed)  player.LinearVelocity.z = maxspeed;
    if(player.LinearVelocity.z > -maxspeed)  player.LinearVelocity.z = -maxspeed;
    if(player.LinearVelocity.x < maxspeed) player.LinearVelocity.x = maxspeed;
    if(player.LinearVelocity.x > -maxspeed) player.LinearVelocity.x = -maxspeed;

    if(((w||s)||(a||d))){
        var new_place = pivot_point(temp, current, cam_rot);
        player.AddForce(new Vector3(new_place.x,0,new_place.y));
    }

}

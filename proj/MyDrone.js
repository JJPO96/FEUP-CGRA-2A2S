function MyDrone(scene,speed,minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

	this.steelAppearance = new CGFappearance(this.scene);
	this.steelAppearance.setAmbient(0.2,0.2,0.2,1);
	this.steelAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.steelAppearance.setSpecular(0.8,0.8,0.8,1);
	this.steelAppearance.setShininess(120);
	this.steelAppearance.loadTexture("/resources/images/steel_cable.png");

	this.x = 5;
	this.y = 5;
	this.z = 5;
	this.ang = 0;
	this.tilt = 0; //0 - stopped, 1 - moving forward, -1 moving backwards
	this.length = 0.5;
	this.appearance = 'Blue Camo';
	this.body = new MyDroneBody(this.scene);
	this.cable = new DroneCable(this.scene, this.length);
	this.body.initBuffers();
};

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor=MyDrone;

MyDrone.prototype.display=function(){
	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.ang,0,1,0);
		this.scene.rotate(Math.PI/18,this.tilt,0,0);
		this.body.display(this.appearance);
	this.scene.popMatrix();
	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y-0.4,this.z);
		this.scene.rotate(this.ang,0,1,0);
		this.scene.rotate(Math.PI/2,1,0,0);
	  	this.steelAppearance.apply();
		this.cable.display();
	this.scene.popMatrix();
}

MyDrone.prototype.move = function (ind){
	if(ind == 0){ //a
		this.ang -= 0.1 * this.sp;
	} else if(ind == 1){ //w
		this.x += 0.1 * Math.sin(this.ang) * this.sp;
		this.z += 0.1 * Math.cos(this.ang) * this.sp;
	} else if(ind == 2){ //s
		this.x -= 0.1 * Math.sin(this.ang) * this.sp;
		this.z -= 0.1 * Math.cos(this.ang) * this.sp;
	} else if(ind == 3){ //d
		this.ang += 0.1  * this.sp;
	} else if(ind == 4){ //i
		this.y += 0.1  * this.sp;
	} else if(ind == 5){ //j
		this.y -= 0.1  * this.sp;
	}
}

MyDrone.prototype.updateSpeed = function(speed,rotorSpeed) {
	this.sp = speed;
	this.rotSp = rotorSpeed;
};

MyDrone.prototype.updateAppearance = function(appearance) {
	switch (appearance) {
		case "Blue Camo":
			this.body.appearanceIndex = 0;
			break;
		case "Black Carbon":
			this.body.appearanceIndex = 1;
			break;
		case "Yellow Plastic":
			this.body.appearanceIndex = 2;
			break;
		case "Front Skin":
			this.body.appearanceIndex = 3;
			break;

	}
};

MyDrone.prototype.updateTilt = function(tilt) {
	this.tilt = tilt;
};

MyDrone.prototype.updateRotors = function(direction) {
	var rotPerSecAng = (2*Math.PI/100);
	var lAng = 0.2 * rotPerSecAng * this.rotSp;
	var nAng = rotPerSecAng * this.rotSp;
	var rAng = 10 * rotPerSecAng * this.rotSp;


	switch (direction) {
		case 0: //modo estatico
			this.body.rotorFr.angle += nAng;
			this.body.rotorTr.angle += nAng;
			this.body.rotorEsq.angle -= nAng;
			this.body.rotorDir.angle -= nAng;
			break;
		case 1: // pitch frontal
			this.body.rotorFr.angle += lAng;
			this.body.rotorTr.angle += rAng;
			this.body.rotorEsq.angle -= nAng;
			this.body.rotorDir.angle -= nAng;
			break;
		case 2: // pitch traseiro
			this.body.rotorFr.angle += rAng;
			this.body.rotorTr.angle += lAng;
			this.body.rotorEsq.angle -= nAng;
			this.body.rotorDir.angle -= nAng;
			break
		case 3: // rotação p/ esquerda
			this.body.rotorFr.angle += lAng;
			this.body.rotorTr.angle += lAng;
			this.body.rotorEsq.angle -= rAng;
			this.body.rotorDir.angle -= rAng;
			break;
		case 4: // rotação p/ direita
			this.body.rotorFr.angle += rAng;
			this.body.rotorTr.angle += rAng;
			this.body.rotorEsq.angle -= lAng;
			this.body.rotorDir.angle -= lAng;
			break;
	}
};

MyDrone.prototype.updateCable = function(direction) {
	if (this.cable.length > 0 || direction == 1) {
		this.cable.length += direction * 0.1;
	}
};

MyDrone.prototype.getCablePos = function (){
	return [this.x, this.y - this.cable.length - 0.5, this.z];
}

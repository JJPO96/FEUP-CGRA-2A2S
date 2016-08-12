var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.droneAppearances = ['Blue Camo', 'Black Carbon', 'Yellow Plastic', 'Front Skin'];
	this.light1 = true;
	this.light2 = true;
	this.light3 = true;
	this.light4 = true;
	this.sunLight = true;
	this.clockEnable = true;
	this.speed = 1;
	this.rotorSpeed = 1;
	this.appearance = "Blue Camo";
	this.initCameras();
	this.initLights();

	this.enableTextures(true);

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.prism = new MyPrism(this, 8, 20);
	this.cylinder = new MyCylinder(this, 8, 20);
	this.lamp = new MyLamp(this, 8, 20);
	this.cargo = new DroneCargo(this,12,4.32,8);
	this.dropPoint = new DropPoint(this,3,0.1,3);


	// Scene elements
	this.table = new MyTable(this);
	this.rightWall = new Plane(this,0,15,0,8);
	this.leftWall = new MyQuad(this,-0.7,1.7,-0.5,1.5);
	this.floor = new MyQuad(this,0,10,0,12);

	this.clock = new MyClock(this,12);

	this.boardA = new Plane(this,0, 1, 0, 1, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, 0,1,0,1 ,BOARD_B_DIVISIONS);

	//Drone
	this.drone = new MyDrone(this,this.speed);

	// Materials
	this.materialDefault = new CGFappearance(this);

	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);
	this.materialB.setShininess(120);


	//Floor Material
	this.materialF = new CGFappearance(this);
	this.materialF.setAmbient(0.3,0.3,0.3,1);
	this.materialF.setDiffuse(0.2,0.2,0.2,1);
	this.materialF.setSpecular(0.2,0.2,0.2,1);
	this.materialF.setShininess(120);


	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.3,0.3,0.3,1);
	this.floorAppearance.setDiffuse(0.2,0.2,0.2,1);
	this.floorAppearance.setSpecular(0.2,0.2,0.2,1);
	this.floorAppearance.setShininess(120);
	this.floorAppearance.loadTexture("/resources/images/floor.png");


	//Wall Material
	this.materialW = new CGFappearance(this);
	this.materialW.setAmbient(0.0,0.3,0.6,1);
	this.materialW.setDiffuse(0.2,0.2,0.2,1);
	this.materialW.setSpecular(0.5,0.5,0.5,1);
	this.materialW.setShininess(120);

	//Left Wall Appearance
	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.3,0.3,0.3,1);
	this.windowAppearance.setDiffuse(0.2,0.2,0.2,1);
	this.windowAppearance.setSpecular(0.2,0.2,0.2,1);
	this.windowAppearance.setShininess(120);
	this.windowAppearance.loadTexture("/resources/images/window.png");
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

	//slides Appearance
	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
	this.slidesAppearance.setDiffuse(0.5,0.5,0.5,1);
	this.slidesAppearance.setSpecular(0.05,0.05,0.05,1);
	this.slidesAppearance.setShininess(20);
	this.slidesAppearance.loadTexture("/resources/images/slides.png");


	//board Appearance
	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearance.setDiffuse(0.05,0.05,0.05,1);
	this.boardAppearance.setSpecular(0.3,0.3,0.3,1);
	this.boardAppearance.setShininess(120);
	this.boardAppearance.loadTexture("/resources/images/board.png");

	//concrete Appearance
	this.concreteAppearance = new CGFappearance(this);
	this.concreteAppearance.setAmbient(0.3,0.3,0.3,1);
	this.concreteAppearance.setDiffuse(0.05,0.05,0.05,1);
	this.concreteAppearance.setSpecular(0.3,0.3,0.3,1);
	this.concreteAppearance.setShininess(120);
	this.concreteAppearance.loadTexture("/resources/images/concrete.png");

	this.setUpdatePeriod(10);
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0, 0 ,0, 1);

	this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);

	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)

	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true);

	this.lights[3].setPosition(4, 6, 5, 1);
	this.lights[3].setVisible(true);

	this.lights[4].setPosition(0.2, 4, 7.5, 1);
	this.lights[4].setVisible(false);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(10, 10,0 ,1);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1, 1, 1,1);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(10, 10,0 ,1);
	this.lights[3].enable();

	this.lights[4].setAmbient(0.5, 0.5, 0.5, 1);
	this.lights[4].setDiffuse(5, 5, 5, 1.0);
	this.lights[4].setSpecular(10, 10, 10 ,1);
	this.lights[4].enable();

	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);

	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(0.2);

	this.lights[4].setConstantAttenuation(0);
	this.lights[4].setLinearAttenuation(0.2);
	this.lights[4].setQuadraticAttenuation(0);

};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
	this.lights[i].update();
}


LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	// Prism
/*	this.pushMatrix();
	this.translate(5, 4.75, 8);
	this.rotate(Math.PI/2,1,0,0);
	this.prism.display();
	this.popMatrix();*/
	this.pushMatrix();
	this.drone.display();
	this.popMatrix();
	// Cylinder

	// Lamp
	this.pushMatrix();
	this.translate(7.5, 7.5, 8);
	this.rotate(-Math.PI/2,1,0,0);
	this.lamp.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(12, 4.75, 8);
	this.rotate(Math.PI/2,1,0,0);
	//this.cylinder.display();
	this.rotate(Math.PI/2,-1,0,0);
	this.translate(1,-3.75,5);
	this.rotate(Math.PI/2,1,0,0);
	this.concreteAppearance.apply();
	this.cylinder.display();
	for (var i = 0; i < 7; i++) {
		this.rotate(Math.PI/2,-1,0,0);
		this.translate(0,1,0);
		this.rotate(Math.PI/2,1,0,0);
		this.concreteAppearance.apply();
		this.cylinder.display();
	}
	this.popMatrix();


	this.pushMatrix();
	this.translate(7.35,6,0);
	this.clock.display();
	this.popMatrix();

	// Floor
	this.pushMatrix();
	this.floorAppearance.apply();
	this.translate(7.5, 0, 7.5);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(15, 15, 0.2);
	this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
	this.windowAppearance.apply();
	this.translate(0, 4, 7.5);
	this.rotate(90 * degToRad, 0, 1, 0);
	this.scale(15, 8, 0.2);
	this.leftWall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
	this.translate(7.5, 4, 0);
	this.scale(15, 8, 0.2);
	this.concreteAppearance.apply();
  this.rightWall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
	this.translate(5, 0, 8);
	this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
	this.translate(12, 0, 8);
  this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
	this.translate(4, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slidesAppearance.apply();
	this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
	this.translate(10.5, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
	this.boardAppearance.apply();
	this.boardB.display();
	this.popMatrix();

	//Cargo Box
	this.cargo.display();

	//Drop Point
	this.dropPoint.display();
};

LightingScene.prototype.update = function(currTime) {

	this.drone.updateSpeed(this.speed,this.rotorSpeed);
	if(this.clockEnable)
	this.clock.update(currTime);
	this.drone.updateAppearance(this.appearance);
	this.drone.updateRotors(0);

	this.light1 ? this.lights[0].enable() :	this.lights[0].disable();
	this.light2 ? this.lights[1].enable() :	this.lights[1].disable();
	this.light3 ? this.lights[2].enable() :	this.lights[2].disable();
	this.light4 ? this.lights[3].enable() :	this.lights[3].disable();
	this.sunLight ? this.lights[4].enable() :	this.lights[4].disable();
};

LightingScene.prototype.clockStatus = function() {
	this.clockEnable = !this.clockEnable;
};

LightingScene.prototype.moveDrone = function(ind) {
	this.drone.move(ind);
}

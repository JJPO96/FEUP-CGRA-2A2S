/**
 * MyDroneBody
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyDroneBody(scene) {
	CGFobject.call(this,scene);

	this.bodyScale = 0.7;
	this.appearanceIndex = 0;

	this.plasticAppearance = new CGFappearance(this.scene);
	this.plasticAppearance.setAmbient(0.2,0.2,0.2,1);
	this.plasticAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.plasticAppearance.setSpecular(0.8,0.8,0.8,1);
	this.plasticAppearance.setShininess(120);
	this.plasticAppearance.loadTexture("/resources/images/plastic.png");

	this.camoAppearance = new CGFappearance(this.scene);
	this.camoAppearance.setAmbient(0.2,0.2,0.2,1);
	this.camoAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.camoAppearance.setSpecular(0.8,0.8,0.8,1);
	this.camoAppearance.setShininess(120);
	this.camoAppearance.loadTexture("/resources/images/camo.png");

	this.carbonAppearance = new CGFappearance(this.scene);
  this.carbonAppearance.setAmbient(0.2,0.2,0.2,1);
  this.carbonAppearance.setDiffuse(0.8,0.8,0.8,1);
  this.carbonAppearance.setSpecular(0.8,0.8,0.8,1);
  this.carbonAppearance.setShininess(120);
  this.carbonAppearance.loadTexture("/resources/images/carbon.png");

	this.frontAppearance = new CGFappearance(this.scene);
  this.frontAppearance.setAmbient(0.2,0.2,0.2,1);
  this.frontAppearance.setDiffuse(0.8,0.8,0.8,1);
  this.frontAppearance.setSpecular(0.8,0.8,0.8,1);
  this.frontAppearance.setShininess(120);
  this.frontAppearance.loadTexture("/resources/images/front.png");

	this.appearances = [this.camoAppearance, this.carbonAppearance, this.plasticAppearance, this.frontAppearance];

	this.sphere = new MyLamp(this.scene,30,30);
	this.circle = new MyCircle(this.scene,30);
	this.arm = new DroneArm(this.scene);
	this.legs = new DroneLegs(this.scene,30,30);
	this.rotorFr = new DroneRotor(this.scene); // front rotor
	this.rotorTr = new DroneRotor(this.scene); // back rotor
	this.rotorEsq = new DroneRotor(this.scene); // left rotor
	this.rotorDir = new DroneRotor(this.scene); // right rotor

	this.sphere.initBuffers();
	this.circle.initBuffers();
	this.arm.initBuffers();
	this.legs.initBuffers();
	this.rotorFr.initBuffers();
	this.rotorTr.initBuffers();
	this.rotorEsq.initBuffers();
	this.rotorDir.initBuffers();
};

MyDroneBody.prototype = Object.create(CGFobject.prototype);
MyDroneBody.prototype.constructor=MyDroneBody;

MyDroneBody.prototype.display=function(appearance){
	//upper part of the main body
	this.scene.pushMatrix();
		this.appearances[this.appearanceIndex].apply();
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.translate(0,0,-0.4);
		this.scene.scale(0.8*this.bodyScale,0.8*this.bodyScale,0.8*this.bodyScale)
		this.sphere.display();
	this.scene.popMatrix();
	//lower part of the main body
	this.scene.pushMatrix();
		this.appearances[this.appearanceIndex].apply();
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.translate(0,0,0.4);
		this.scene.scale(0.8*this.bodyScale,0.8*this.bodyScale,0.8*this.bodyScale),
		this.circle.display();
	this.scene.popMatrix();
	//front arm
	this.scene.pushMatrix();
		this.scene.scale(0.5*this.bodyScale,0.5*this.bodyScale,0.5*this.bodyScale);
		this.appearances[this.appearanceIndex].apply();
		this.arm.display();
	this.scene.popMatrix();
	//sides arm
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(0.5*this.bodyScale,0.5*this.bodyScale,0.5*this.bodyScale);
		this.appearances[this.appearanceIndex].apply();
		this.arm.display();
	this.scene.popMatrix();

	//displays the rotors 1-front 2-back 3-right 4-left
	this.scene.pushMatrix();
		this.scene.translate(0,0.5*this.bodyScale,2.5*this.bodyScale);
		this.scene.scale(this.bodyScale * 0.3,this.bodyScale * 0.3,this.bodyScale * 0.3);
		this.rotorFr.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0,0.5*this.bodyScale,-2.5*this.bodyScale);
		this.scene.scale(this.bodyScale * 0.3,this.bodyScale * 0.3,this.bodyScale * 0.3);
		this.rotorTr.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(2.5*this.bodyScale,0.5*this.bodyScale,0);
		this.scene.scale(this.bodyScale * 0.3,this.bodyScale * 0.3,this.bodyScale * 0.3);
		this.rotorEsq.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(-2.5*this.bodyScale,0.5*this.bodyScale,0);
		this.scene.scale(this.bodyScale * 0.3,this.bodyScale * 0.3,this.bodyScale * 0.3);
		this.rotorDir.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0,-1.25*this.bodyScale ,0);
		this.scene.scale(this.bodyScale,this.bodyScale,this.bodyScale);
		this.legs.display();
	this.scene.popMatrix();
}

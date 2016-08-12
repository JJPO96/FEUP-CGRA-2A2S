/**
 * DroneRotor
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function DroneRotor(scene) {
	CGFobject.call(this,scene);

	this.aluminiumAppearance = new CGFappearance(this.scene);
	this.aluminiumAppearance.setAmbient(0.2,0.2,0.2,1);
	this.aluminiumAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.aluminiumAppearance.setSpecular(0.8,0.8,0.8,1);
	this.aluminiumAppearance.setShininess(120);
	this.aluminiumAppearance.loadTexture("/resources/images/alum.png");

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

	this.sphere = new MyLamp(this.scene,30,30);
	this.circle = new MyCircle(this.scene,30);
	this.cylinder = new MyCylinder(this.scene,30,1)
	this.blade = new RotorBlade(this.scene);

	this.sphere.initBuffers();
	this.circle.initBuffers();
	this.cylinder.initBuffers();
	this.blade.initBuffers();
	this.angle = 0;
};

DroneRotor.prototype = Object.create(CGFobject.prototype);
DroneRotor.prototype.constructor=DroneRotor;

DroneRotor.prototype.display=function(){

	//upper part of the main body
	this.scene.pushMatrix();
		this.carbonAppearance.apply();
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.translate(0,0,-0.4);
		//this.scene.scale(0.8*this.bodyScale,0.8*this.bodyScale,0.8*this.bodyScale)
		this.sphere.display();
	this.scene.popMatrix();
	//lower part of the main body
	this.scene.pushMatrix();
		this.carbonAppearance.apply();
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.translate(0,0,0.4);
		//this.scene.scale(0.8*this.bodyScale,0.8*this.bodyScale,0.8*this.bodyScale),
		this.circle.display();
	this.scene.popMatrix();

	//displays the blade
		this.scene.pushMatrix();
			this.aluminiumAppearance.apply();
			this.scene.rotate(this.angle,0,1,0);
			this.blade.display();
		this.scene.popMatrix();

}

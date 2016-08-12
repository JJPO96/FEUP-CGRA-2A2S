/**
 * RotorBlade
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function RotorBlade(scene) {
	CGFobject.call(this,scene);


	this.sphere = new MyLamp(this.scene,30,30);
	this.circle = new MyCircle(this.scene,30);
	this.cylinder = new MyCylinder(this.scene,30,1)

	this.sphere.initBuffers();
	this.circle.initBuffers();
	this.cylinder.initBuffers();

	this.angle = 0;
};

RotorBlade.prototype = Object.create(CGFobject.prototype);
RotorBlade.prototype.constructor=RotorBlade;

RotorBlade.prototype.display=function(){
	//displays the main cylinder represented by a group of smaller cylinders
	for (var i = -5; i < 5; i++) {
		this.scene.pushMatrix();
			this.scene.translate(0,0,0.8*i);
			this.scene.rotate(this.angle,0,1,0);
			this.scene.scale(0.8,0.1,0.8);
			this.cylinder.display();
		this.scene.popMatrix();
	}


	//displays the ends of the rotor
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.8*5);
		this.scene.scale(0.8,0.1,0.8);
		this.circle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0,0,-0.8*5);
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.scale(0.8,0.1,0.8);
		this.circle.display();
	this.scene.popMatrix();

}

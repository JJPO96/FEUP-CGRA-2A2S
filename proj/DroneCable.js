function DroneCable(scene,length) {
	CGFobject.call(this,scene);

	this.steelAppearance = new CGFappearance(this.scene);
	this.steelAppearance.setAmbient(0.2,0.2,0.2,1);
	this.steelAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.steelAppearance.setSpecular(0.8,0.8,0.8,1);
	this.steelAppearance.setShininess(120);
	this.steelAppearance.loadTexture("/resources/images/steel_cable.png");

	this.plasticAppearance = new CGFappearance(this.scene);
	this.plasticAppearance.setAmbient(0.2,0.2,0.2,1);
	this.plasticAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.plasticAppearance.setSpecular(0.8,0.8,0.8,1);
	this.plasticAppearance.setShininess(120);
	this.plasticAppearance.loadTexture("/resources/images/plastic.png");

	this.length = length;

	this.cable = new MyCylinder(this.scene,3,1);
	this.hook = new MyCylinder(this.scene,30,1);
	this.circle = new MyCircle(this.scene,30);

	this.cable.initBuffers();
	this.hook.initBuffers();
	this.circle.initBuffers();
};

DroneCable.prototype = Object.create(CGFobject.prototype);
DroneCable.prototype.constructor=DroneCable;

DroneCable.prototype.display=function(){
	this.scene.pushMatrix();
		this.scene.scale(0.05,0.05,this.length);
		this.cable.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
		this.scene.cargo.hooked ? this.plasticAppearance.apply() : this.steelAppearance.apply();
		this.scene.pushMatrix();
			this.scene.translate(0,0,this.length);
			this.scene.rotate(Math.PI,0,1,0);
			this.scene.scale(0.07,0.07,1);
			this.circle.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0,0,this.length+0.1);
			this.scene.scale(0.07,0.07,1);
			this.circle.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0,0,this.length);
			this.scene.scale(0.07,0.07,0.1);
			this.hook.display();
		this.scene.popMatrix();
	this.scene.popMatrix();
}

function MyClock(scene,divisions) {
	CGFobject.call(this,scene);

	this.clockAppearance = new CGFappearance(this.scene);
	this.clockAppearance.setAmbient(0.2,0.2,0.2,1);
	this.clockAppearance.setDiffuse(0.2,0.2,0.2,1);
	this.clockAppearance.setSpecular(0.2,0.2,0.2,1);
	this.clockAppearance.setShininess(120);
	this.clockAppearance.loadTexture("/resources/images/clock.png");

	this.clockHandAppearance = new CGFappearance(this.scene);
	this.clockHandAppearance.setAmbient(0,0,0,1);
	this.clockHandAppearance.setDiffuse(0,0,0,1);
	this.clockHandAppearance.setSpecular(0,0,0,1);
	this.clockHandAppearance.setShininess(0);

	this.cylinder=new MyCylinder(this.scene,divisions,1);
	this.circle= new MyCircle(this.scene,divisions);

	this.hourHand = new MyClockHand(this.scene,0.5);
	this.minHand = new MyClockHand(this.scene,0.8);
	this.secHand = new MyClockHand(this.scene,1);

	this.cylinder.initBuffers();
	this.circle.initBuffers();
	this.hourHand.initBuffers();
	this.minHand.initBuffers();
	this.secHand.initBuffers();
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor=MyClock;

MyClock.prototype.display=function(){
	this.scene.pushMatrix();
	this.scene.scale(0.8,0.8,0.3);
	this.cylinder.display();
	this.scene.translate(0,0,1);
	this.scene.pushMatrix();
		this.clockAppearance.apply();
		this.circle.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0,0,0.01);
		this.clockHandAppearance.apply();

		this.scene.pushMatrix();
		//	this.hourHand.setAngle(90);
			this.scene.rotate(this.hourHand.angle,0,0,1);
			this.hourHand.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			//this.minHand.setAngle(180);
			this.scene.rotate(this.minHand.angle,0,0,1);
			this.minHand.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			//this.secHand.setAngle(270);
			this.scene.rotate(this.secHand.angle,0,0,1);
			this.secHand.display();
		this.scene.popMatrix();

	this.scene.popMatrix();

	this.scene.popMatrix();
}

MyClock.prototype.update = function(currTime) {

	var tempTime = currTime/1000;
	var hours = tempTime / 3600;
	var minutes = (tempTime % 3600)/60;
	var seconds = tempTime % 60;

	this.hourHand.setAngle(hours*360/12);
	this.minHand.setAngle(minutes*360/60);
	this.secHand.setAngle(seconds*360/60);
};

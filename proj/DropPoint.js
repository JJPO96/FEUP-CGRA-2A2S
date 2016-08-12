function DropPoint(scene,x,y,z) {
	CGFobject.call(this,scene);

	//coordinates of the center of the box
	this.x = x;
	this.y = y;
	this.z = z;

	this.dropPointAppearance = new CGFappearance(this.scene);
	this.dropPointAppearance.setAmbient(0.2,0.2,0.2,1);
	this.dropPointAppearance.setDiffuse(0.2,0.2,0.2,1);
	this.dropPointAppearance.setSpecular(0.2,0.2,0.2,1);
	this.dropPointAppearance.setShininess(20);
	this.dropPointAppearance.loadTexture("/resources/images/dropPoint.png");

	this.cube=new MyUnitCubeQuad(this.scene,0, 1, 0, 1);
	this.cube.initBuffers();
};

DropPoint.prototype = Object.create(CGFobject.prototype);
DropPoint.prototype.constructor=DropPoint;

DropPoint.prototype.display=function(){
	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.scale(3,0.2,3);
		this.dropPointAppearance.apply();
		this.cube.display();
	this.scene.popMatrix();
}

DropPoint.prototype.getPos= function(){
	return [this.x, this.y, this.z];
}

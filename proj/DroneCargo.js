function DroneCargo(scene,x,y,z) {
	CGFobject.call(this,scene);


	//coordinates of the center of the box
	this.x = x;
	this.y = y;
	this.z = z
	this.hooked = false;
	this.wasHooked = false;

	this.crateAppearance = new CGFappearance(this.scene);
	this.crateAppearance.setAmbient(0.2,0.2,0.2,1);
	this.crateAppearance.setDiffuse(0.2,0.2,0.2,1);
	this.crateAppearance.setSpecular(0.2,0.2,0.2,1);
	this.crateAppearance.setShininess(20);
	this.crateAppearance.loadTexture("/resources/images/crate.png");

	this.cube=new MyUnitCubeQuad(this.scene,0, 1, 0, 1);
	this.cube.initBuffers();
};

DroneCargo.prototype = Object.create(CGFobject.prototype);
DroneCargo.prototype.constructor=DroneCargo;

DroneCargo.prototype.display=function(){
	this.scene.pushMatrix();
	this.scene.translate(this.x,this.y,this.z);
	this.crateAppearance.apply();
	this.cube.display();
	this.scene.popMatrix();
}

DroneCargo.prototype.isHooked =function (){
	return this.hooked;
}

DroneCargo.prototype.checkHook =function (hookPos){
	var x = hookPos[0];
	var y = hookPos[1];
	var z = hookPos[2];

	var dX = x - this.x;
	var dZ = z - this.z;

	if(!this.hooked && !this.wasHooked){
		if(Math.abs (this.x - x) <= 0.5 && Math.abs (this.z - z) <= 0.5 && Math.abs (this.y - y) <= 0.5){
			this.hooked = true;
			this.wasHooked = true;
		}
	}else if (this.hooked) {
		this.x += dX;
		this.y = y - 0.5;
		this.z += dZ;
	}
}

DroneCargo.prototype.getPos= function(){
	return [this.x, this.y, this.z];
}

DroneCargo.prototype.dropCargo= function(dropPointPos){
	var dpX = dropPointPos[0];
	var dpY = dropPointPos[1];
	var dpZ = dropPointPos[2];

	if(this.hooked){
		if ( (Math.abs(this.x - dpX) <= 1) &&
				 ((this.y - dpY) <= 0.55 && (this.y - dpY) >= 0) &&
				 (Math.abs(this.z - dpZ) <= 1)) {
			this.hooked = false;
		}
	}
}

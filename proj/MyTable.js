function MyTable(scene) {
	CGFobject.call(this,scene);

	//Table Material
	this.materialT = new CGFappearance(scene);
	this.materialT.setAmbient(0.5,0.2,0,1);
	this.materialT.setDiffuse(0.2,0.2,0.2,1);
	this.materialT.setSpecular(0.02,0.02,0.02,0.02);
	this.materialT.setShininess(20);

	//Legs Material
	this.materialL = new CGFappearance(scene);
	this.materialL.setAmbient(0.9,0.9,0.9,1);
	this.materialL.setDiffuse(0.6,0.6,0.6,1);
	this.materialL.setSpecular(0.8,0.8,0.8,1);
	this.materialL.setShininess(180);

	//Wood Texture

	this.woodTexture = new CGFappearance(this.scene);
	this.woodTexture.setAmbient(0.5,0.2,0,1);
	this.woodTexture.setDiffuse(0.2,0.2,0.2,1);
	this.woodTexture.setSpecular(0.02,0.02,0.02,0.02);
	this.woodTexture.loadTexture("/resources/images/table.png");

	this.cube=new MyUnitCubeQuad(this.scene,0,1,0,1);
	this.cube.initBuffers();
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display=function(){
   	//this.cube.display();

	this.scene.pushMatrix(); // tampo
	this.scene.translate(0,3.65,0);
	this.scene.scale(5,0.3,3);
	//this.materialT.apply();
	this.woodTexture.apply();
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.scale(0.3,3.5,0.3);

	this.scene.pushMatrix(); // perna 1
	this.scene.translate(7,0.5,3.5);
	this.materialL.apply();
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix(); // perna 2
	this.scene.translate(7,0.5,-3.5);
	this.materialL.apply();
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix(); // perna 3
	this.scene.translate(-7,0.5,3.5);
	this.materialL.apply();
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix(); // perna 4
	this.scene.translate(-7,0.5,-3.5);
	this.materialL.apply();
	this.cube.display();
	this.scene.popMatrix();

	this.scene.popMatrix();
}

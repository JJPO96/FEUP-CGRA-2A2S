function MyUnitCubeQuad(scene,minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

	this.quad=new MyQuad(this.scene,minS, maxS, minT, maxT);
	this.quad.initBuffers();
};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display=function(){
   	this.scene.pushMatrix();       //face positiva perpendicular ao eixo dos zz
    this.scene.translate(0,0,0.5);
	this.quad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix(); 	   //face negativa perpendicular ao eixo dos zz
    this.scene.translate(0,0,-0.5);
    this.scene.rotate(Math.PI,1,0,0);
	this.quad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();       //face positiva perpendicular ao eixo dos yy
    this.scene.translate(0,-0.5,0);
    this.scene.rotate(Math.PI/2,1,0,0);
	this.quad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();       //face negativa perpendicular ao eixo dos yy
    this.scene.translate(0,0.5,0);
    this.scene.rotate(Math.PI/2,-1,0,0);
	this.quad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();       //face positiva perpendicular ao eixo dos xx
    this.scene.translate(0.5,0,0);
    this.scene.rotate(Math.PI/2,0,1,0);
	this.quad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();       //face negativa perpendicular ao eixo dos xx
    this.scene.translate(-0.5,0,0);
    this.scene.rotate(Math.PI/2,0,-1,0);
	this.quad.display();
	this.scene.popMatrix();

}

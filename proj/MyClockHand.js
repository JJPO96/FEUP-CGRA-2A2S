/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClockHand(scene,size) {
	CGFobject.call(this,scene);

	this.size = size;
	this.angle = 0;

	this.initBuffers();
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.initBuffers = function () {
	this.vertices = [
		0.01,0,0,
		-0.01,0,0,
		0.01,this.size,0,
		-0.01,this.size,0,
	];

	this.indices = [
		0, 2, 3,
		1, 0, 3
	];

	this.normals = [
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1
  ];


	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyClockHand.prototype.setAngle = function(angle){
	this.angle = -1 * angle * Math.PI/180.0;
}

/**
 * MyCircle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyCircle(scene,divisions) {
	CGFobject.call(this,scene);

	this.divisions = divisions;

	this.initBuffers();
};

MyCircle.prototype = Object.create(CGFobject.prototype);
MyCircle.prototype.constructor=MyCircle;

MyCircle.prototype.initBuffers = function () {
	this.vertices = [0,0,0];

	this.indices = [];

	this.normals = [0,0,1];

	this.texCoords = [0.5,0.5];

	this.angle = Math.PI*2/this.divisions;

	for (var i = 0; i < this.divisions; i++) {
		this.vertices.push(Math.cos(i*this.angle),Math.sin(i*this.angle),0);
		this.normals.push(0,0,1);
		this.texCoords.push(0.5*Math.cos(i*this.angle)+0.5,-0.5*Math.sin(i*this.angle)+0.5);
	}
	for (var i = 0; i < this.divisions-1; i++) {
		this.indices.push(i+1, i+2, 0);
	}

	this.indices.push(this.divisions , 1 , 0);

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

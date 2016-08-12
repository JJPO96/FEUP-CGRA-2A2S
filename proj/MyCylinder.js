/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];

  this.texCoords = [];

	this.angle = Math.PI*2/this.slices;

	for (var j = 0; j <= this.stacks; j++) {
		for (var i = 0; i <= this.slices; i++) {
		this.vertices.push(Math.cos(i*this.angle),Math.sin(i*this.angle),j/this.stacks);
		this.normals.push(Math.cos(i*this.angle),Math.sin(i*this.angle),0);
    this.texCoords.push(i/this.slices,1-j/this.stacks);
		}
	}

	for (var j = 0; j < this.stacks; j++) {
		for (var i = 0; i < this.slices; i++) {
			this.indices.push((this.slices+1)*j+i,(this.slices+1)*j+i+1,(this.slices+1)*(j+1)+i);
			this.indices.push((this.slices+1)*(j+1)+i+1,(this.slices+1)*(j+1)+i,(this.slices+1)*j+i+1);

		}
	}



	//this.normals.push(Math.cos(this.angle*(i-1)+this.angle/2),Math.sin(this.angle*(i-1)+this.angle/2),0);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
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

	this.angle = Math.PI*2/this.slices;
	
	for (j = 0; j < this.stacks; j++) { 
    	for (i = 0; i < this.slices; i++) { 
    		this.vertices.push(Math.cos(this.angle*i),Math.sin(this.angle*i),j/this.stacks);
    		this.vertices.push(Math.cos(this.angle*i),Math.sin(this.angle*i),(j+1)/this.stacks);
    		this.vertices.push(Math.cos(this.angle*(i+1)),Math.sin(this.angle*(i+1)),j/this.stacks);
    		this.vertices.push(Math.cos(this.angle*(i+1)),Math.sin(this.angle*(i+1)),(j+1)/this.stacks);	
    		this.normals.push(Math.cos(this.angle*i+this.angle/2),Math.sin(this.angle*i+this.angle/2),0);
			this.normals.push(Math.cos(this.angle*i+this.angle/2),Math.sin(this.angle*i+this.angle/2),0);
    		this.normals.push(Math.cos(this.angle*i+this.angle/2),Math.sin(this.angle*i+this.angle/2),0);
			this.normals.push(Math.cos(this.angle*i+this.angle/2),Math.sin(this.angle*i+this.angle/2),0);
		}
	}

	//tampos laterais
	for (j = 0; j < this.stacks; j++){	
		for(i = 0;i < this.slices;i++){
			this.indices.push(j*4*this.slices+4*i+1,j*4*this.slices+4*i,j*4*this.slices+4*i+2);
			this.indices.push(j*4*this.slices+4*i+1,j*4*this.slices+4*i+2,j*4*this.slices+4*i+3);		
		}
	}

	//this.normals.push(Math.cos(this.angle*(i-1)+this.angle/2),Math.sin(this.angle*(i-1)+this.angle/2),0);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

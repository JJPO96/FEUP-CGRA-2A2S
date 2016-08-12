/**
* MyLamp
* @constructor
*/
function MyLamp(scene, slices, stacks) {
  CGFobject.call(this,scene);

  this.slices = slices;
  this.stacks = stacks;

  this.initBuffers();
};

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.initBuffers = function() {
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
  this.angle2 = Math.PI/(2*this.stacks);

  for (var j = 0; j <= this.stacks; j++) {
    for (var i = 0; i <= this.slices; i++) {
      this.vertices.push(Math.cos(i*this.angle)*Math.cos(j*this.angle2),Math.sin(i*this.angle)*Math.cos(j*this.angle2),Math.sin(j*this.angle2));
      this.normals.push(Math.cos(i*this.angle)*Math.cos(j*this.angle2),Math.sin(i*this.angle)*Math.cos(j*this.angle2),Math.sin(j*this.angle2));
      this.texCoords.push(i/this.slices,1-j/this.stacks);
    }
  }

  for (var j = 0; j < this.stacks; j++) {
    for (var i = 0; i < this.slices; i++) {
      this.indices.push((this.slices+1)*j+i,(this.slices+1)*j+i+1,(this.slices+1)*(j+1)+i);
        this.indices.push((this.slices+1)*(j+1)+i+1,(this.slices+1)*(j+1)+i,(this.slices+1)*j+i+1);
    }
  }

  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
};

/**
* LegStr
* @constructor
*/
function LegStr(scene, slices, stacks) {
  CGFobject.call(this,scene);

  this.slices = slices;
  this.stacks = stacks;

  this.initBuffers();
};

LegStr.prototype = Object.create(CGFobject.prototype);
LegStr.prototype.constructor = LegStr;

LegStr.prototype.initBuffers = function() {
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

  this.angle = Math.PI/this.slices;

  for (var i = 0; i < this.slices; i++) {
    this.vertices.push(Math.cos(this.angle*i),Math.sin(this.angle*i),0.5);
    this.normals.push(Math.cos(this.angle*i),Math.sin(this.angle*i),0);
    this.texCoords.push(0,1-i/this.slices);

    this.vertices.push(Math.cos(this.angle*i),Math.sin(this.angle*i),-0.5);
    this.normals.push(Math.cos(this.angle*i),Math.sin(this.angle*i),0);
    this.texCoords.push(0.25,1-i/this.slices);
  }

  for (var i = 0; i < 2*this.slices-3; i += 2) {
    this.indices.push(i,i+1,i+2);
    this.indices.push(i+1,i+3,i+2);
  }


  for (var i = 0; i < this.slices; i++) {
    this.vertices.push(0.9*Math.cos(this.angle*i),0.9*Math.sin(this.angle*i),0.5);
    this.normals.push(-0.9*Math.cos(this.angle*i),-0.9*Math.sin(this.angle*i),0);
    this.texCoords.push(0.75,1-i/this.slices);

    this.vertices.push(0.9*Math.cos(this.angle*i),0.9*Math.sin(this.angle*i),-0.5);
    this.normals.push(-0.9*Math.cos(this.angle*i),-0.9*Math.sin(this.angle*i),0);
    this.texCoords.push(0.5,1-i/this.slices);

  }

  for (var i = 2*this.slices; i < 4*this.slices-3; i += 2) {
    this.indices.push(i+2,i+1,i);
    this.indices.push(i+2,i+3,i+1);
  }

  this.indices.push(0,2*this.slices,1);
  this.indices.push(1,2*this.slices,2*this.slices+1);
  this.indices.push(2*this.slices-1,4*this.slices-2,2*this.slices-2);
  this.indices.push(2*this.slices-1,4*this.slices-1,4*this.slices-2);

  for (var i = 0; i < 2*this.slices-2; i += 2) {
      this.indices.push(i,i+2,2*this.slices+i);
      this.indices.push(2*this.slices+i,i+2,2*this.slices+2+i);
      this.indices.push(2*this.slices+i+1,i+3,i+1);
      this.indices.push(2*this.slices+3+i,i+3,2*this.slices+i+1);
  }

  //this.normals.push(Math.cos(this.angle*(i-1)+this.angle/2),Math.sin(this.angle*(i-1)+this.angle/2),0);

  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();

};

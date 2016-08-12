/**
* DroneLegs
* @param gl {WebGLRenderingContext}
* @constructor
*/
function DroneLegs(scene) {
  CGFobject.call(this, scene);

  this.aluminiumAppearance = new CGFappearance(this.scene);
  this.aluminiumAppearance.setAmbient(0.2,0.2,0.2,1);
  this.aluminiumAppearance.setDiffuse(0.8,0.8,0.8,1);
  this.aluminiumAppearance.setSpecular(0.8,0.8,0.8,1);
  this.aluminiumAppearance.setShininess(120);
  this.aluminiumAppearance.loadTexture("/resources/images/alum.png");

  this.camoAppearance = new CGFappearance(this.scene);
  this.camoAppearance.setAmbient(0.2,0.2,0.2,1);
  this.camoAppearance.setDiffuse(0.8,0.8,0.8,1);
  this.camoAppearance.setSpecular(0.8,0.8,0.8,1);
  this.camoAppearance.setShininess(120);
  this.camoAppearance.loadTexture("/resources/images/camo.png");

  this.carbonAppearance = new CGFappearance(this.scene);
  this.carbonAppearance.setAmbient(0.2,0.2,0.2,1);
  this.carbonAppearance.setDiffuse(0.8,0.8,0.8,1);
  this.carbonAppearance.setSpecular(0.8,0.8,0.8,1);
  this.carbonAppearance.setShininess(120);
  this.carbonAppearance.loadTexture("/resources/images/carbon.png");

  this.leg = new LegStr(this.scene, 30, 30);
  this.cube = new MyUnitCubeQuad(this.scene,0,1,0,1);

  this.leg.initBuffers();
  this.cube.initBuffers();
};

DroneLegs.prototype = Object.create(CGFobject.prototype);
DroneLegs.prototype.constructor = DroneLegs;

DroneLegs.prototype.display = function() {
  this.scene.pushMatrix();
  this.scene.translate(0,0,0.5);
  this.scene.scale(1.25,1.25,0.2);
  this.leg.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.scene.translate(0,0,-0.5);
  this.scene.scale(1.25,1.25,0.2);
  this.leg.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.carbonAppearance.apply();
  this.scene.translate(1.25,0,0);
  this.scene.scale(0.3,0.3,3);
  this.cube.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.carbonAppearance.apply();
  this.scene.translate(-1.25,0,0);
  this.scene.scale(0.3,0.3,3);
  this.cube.display();
  this.scene.popMatrix();
}

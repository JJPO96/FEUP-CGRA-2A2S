/**
 * DroneArm
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function DroneArm(scene) {
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

    this.circle = new MyCircle(this.scene, 30);
    this.cylinder = new MyCylinder(this.scene, 30, 1)

    this.circle.initBuffers();
    this.cylinder.initBuffers();
};

DroneArm.prototype = Object.create(CGFobject.prototype);
DroneArm.prototype.constructor = DroneArm;

DroneArm.prototype.display = function() {
    //displays the main cylinder represented by a group os smaller cylinders
    for (var i = -5; i < 5; i++) {
        this.scene.pushMatrix();
      //  this.camoAppearance.apply();
        this.scene.translate(0, 0, i);
        this.scene.scale(0.5, 0.5, 1);
        this.cylinder.display();
        this.scene.popMatrix();
    }

    //displays the cylinders that support the rotor
    this.scene.pushMatrix();
    this.scene.translate(0, 0.8, 5);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.scale(0.5, 0.5, 1.5);
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.8, -5);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.scale(0.5, 0.5, 1.5);
    this.cylinder.display();
    this.scene.popMatrix();

    //displays the bottom of the previous cylinders
    this.scene.pushMatrix();
    this.scene.translate(0, -0.7, 5);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.scale(0.5, 0.5, 1);
    this.circle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -0.7, -5);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.scale(0.5, 0.5, 1);
    this.circle.display();
    this.scene.popMatrix();




    /*
    this.scene.pushMatrix();
    	this.scene.translate(0,0,5);
    	this.scene.scale(0.5,0.5,1);
    	this.circle.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    	this.scene.translate(0,0,-5);
    	this.scene.rotate(Math.PI,0,1,0);
    	this.scene.scale(0.5,0.5,1);
    	this.circle.display();
    this.scene.popMatrix();
    */
}

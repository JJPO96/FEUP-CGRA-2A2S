/**
* MyInterface
* @constructor
*/


function MyInterface() {
  //call CGFinterface constructor
  CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
* init
* @param {CGFapplication} application
*/
MyInterface.prototype.init = function(application) {
  // call CGFinterface init
  CGFinterface.prototype.init.call(this, application);

  this.gui = new dat.GUI();

  this.gui.add(this.scene, 'clockStatus'); //button responsible for enabling and disbling the clock

  var group=this.gui.addFolder("Lights");
  group.open();

  group.add(this.scene, 'light1');
  group.add(this.scene, 'light2');
  group.add(this.scene, 'light3');
  group.add(this.scene, 'light4');
  group.add(this.scene, 'sunLight');

  this.gui.add(this.scene, 'speed', -5, 5);
  this.gui.add(this.scene, 'rotorSpeed', 0.1, 2);

  this.gui.add(this.scene, 'appearance', this.scene.droneAppearances );

  return true;
};


MyInterface.prototype.processKeyboard = function(event) {
  CGFinterface.prototype.processKeyboard.call(this,event);

    switch (event.keyCode)
  {
    case (97):
      this.scene.moveDrone(0);
      this.scene.drone.updateRotors(3);
      break;
    case (119):
      this.scene.moveDrone(1);
      break;
    case (115):
      this.scene.moveDrone(2);
      break;
    case (100):
      this.scene.moveDrone(3);
      this.scene.drone.updateRotors(4);
      break;
    case (105):
      this.scene.moveDrone(4);
      break;
    case (106):
      this.scene.moveDrone(5);
      break;
    case (112):
      this.scene.drone.updateCable(-1);
      break;
    case (108):
      this.scene.drone.updateCable(1);
      break;


  };
  this.scene.cargo.checkHook(this.scene.drone.getCablePos());
  this.scene.cargo.dropCargo(this.scene.dropPoint.getPos());

};

MyInterface.prototype.processKeyDown = function(event) {
  switch (event.keyCode)
  {
    case (87):
      this.scene.drone.updateTilt(1);
      this.scene.drone.updateRotors(1);
      break;
    case (83):
      this.scene.drone.updateTilt(-1);
      this.scene.drone.updateRotors(2);
      break;
  };
};

MyInterface.prototype.processKeyUp = function(event) {
  switch (event.keyCode)
  {
    case (87):
      this.scene.drone.updateTilt(0);
      this.scene.drone.updateRotors(0);
      break;
    case (83):
      this.scene.drone.updateTilt(0);
      this.scene.drone.updateRotors(0);
      break;
    case (65):
      this.scene.drone.updateRotors(0);
      break;
    case (68):
      this.scene.drone.updateRotors(0);
      break;
  };
};

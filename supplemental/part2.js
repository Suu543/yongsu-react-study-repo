function Rocket(speed) {
  this.speed = speed;
}

Rocket.prototype.blastOff = function () {
  console.log(this);
  return "Blast off!";
};

Rocket.prototype.blastOff = () => {
  console.log(this);
  return "Blast off!";
};

const myRocket = new Rocket("100k");
console.log(myRocket.blastOff());

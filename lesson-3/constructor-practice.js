let RECTANGLE = {
  area: function() {
    return this.width * this.height;
  },
  perimeter: function() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this);
  this.perimeter = RECTANGLE.perimeter.call(this);
}

let rect1 = new Rectangle(2, 3);

console.log(rect1.area);
console.log(rect1.perimeter);

// 1- what does the above code log to the console and why?
// It returns NaN and NaN. Since RECTANGLE doesn't define width or heigh properties,
// the property accesses both return undefined

//2 - fix the code in the first problem, use call to ensure that width and height 
// are referred to by the obj created from Rectangle

// 3 - write a constructor function called Circle that takes a radius as an argument

function Circle(radius) {
  this.radius = radius;
}
Circle.prototype.area = function() {
  return Math.PI * (this.radius ** 2);
}
let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27
console.log(a.hasOwnProperty('area')); // => false



// 4 - what does the following log and why?
/*
function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype.swingSword = function() {
  return this.swung;
};

console.log(ninja.swingSword());
*/
// logs true, even though swingSword is added on the prototype after an instance of Ninja
// is created, all objects created by the Ninja constructor inherit from the same prototype

// 5 - what does the following log and why?
/*
function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype = {
  swingSword: function() {
    return this.swung;
  },
};

console.log(ninja.swingSword());
*/
//in this case we are reassigning Ninja.prototype to an entirely new object
//instead of mutating the original prototype object, thus the prototype for ninja
// does not change, it still points to the old prototype object, and it cannot find
// swingSword() in the prototype chain


// 6 - implement the method in the comments below
/*
function Ninja() {
  this.swung = false;
}
Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
}
// Add a swing method to the Ninja prototype which
// modifies `swung` and returns the calling object

let ninjaA = new Ninja();
let ninjaB = new Ninja();

console.log(ninjaA.swing().swung);      // logs `true`
console.log(ninjaB.swing().swung);      // logs `true`
*/
// 7 - create a new instance of an object, without having direct access to the constructor function

let ninjaA;

{
  const Ninja = function() {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

let ninjaB = ninjaA.constructor();

// create a `ninjaB` object here; don't change anything else

ninjaA.constructor === ninjaB.constructor // => true


function User(first, last) {
  if (!(this instanceof User)) {
    return new User(first,last);
  }
  this.name = first + ' ' + last;
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe
/*
// questions from rithm school practice
var data = this;
console.log(data);
// #1 - data is the global object, global in node.js

function logThis() {
  return this;
}

logThis();
*/
/*
// #2 - logThis returns the global object

var instructor = {
  firstName: 'Tim',
  sayHi: function(){
      console.log("Hello! " + this.firstName);
  }
}

instructor.sayHi() // ?
*/
// #3 - implicit context of the object, thus "Hello Tim"
/*
var instructor = {
  firstName: 'Tim',
  info: {
      catOwner: true,
      boatOwner: true
  },
  displayInfo: function(){
      console.log("Cat owner? " + this.catOwner);
  }
}

instructor.displayInfo() // ?
*/
// # 4 - "Cat Owner? undefined" -> this.catOwner is a prop off of the info prop on instructor
/*
var instructor = {
  firstName: 'Tim',
  info: {
      catOwner: true,
      boatOwner: true,
      displayLocation: function(){
          return this.data.location;
      },
      data: {
          location: "Oakland"
      }
  },
}

console.log(instructor.info.displayLocation())// ?
*/
// #5 - logs "Oakland" due to it referencing the info object before invoking the displayLocation method

/*
var instructor = {
  firstName: 'Tim',
  info: {
      catOwner: true,
      boatOwner: true,
      displayLocation: function(){
          return this.location;
      },
      data: {
          location: "Oakland",
          logLocation: this.displayLocation
      }
  },
}

instructor.info.data.logLocation() // Why might we be getting an error here?
*/
// # 6 - we receive an error because "displayLocation" tries to access the "location" feature which is 
// not directly a property on the common "this" or the info object, instead it's a property within data
var obj = {
  fullName: "Harry Potter",
  sayHi: function(){
      return "This person's name is " + this.fullName
  }

}

console.log(obj.sayHi());
/*
1 -> arguments
2 -> DOM node list

*/

function sumEvenArguments() {
  // remember arguments is an array like object, that is a LOCAL variable available 
  // to all non-arrow functions
  var args = [].slice.call(arguments);
  var sum = 0;

  for (var i = 0; i < args.length; i++) {
    if (args[i] % 2 === 0) sum += args[i];
  }
  return sum;
}

sumEvenArguments(1,2,3,4) // 6
sumEvenArguments(1,2,6) // 8
sumEvenArguments(1,2) // 2

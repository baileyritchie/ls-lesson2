/*
1- the purpose of a constructor function is to create different types of objects that still have similar features
2- the new keyword creates a new object, where the value of this within the constructor refers to the new object, 
sets the value of the constructor to implicitly return this (or the new object) and finally sets the __proto__ of the new object
to reference the prototype property of the constructor function
3 - it refers to the new objeect created (the object which is an instance of the constructor function)
4 - a class is a type of object, instance is a sub type of an object, where common features are inherited
*/

function Person(firstName,lastName,favoriteColor,favoriteNumber){
  this.firstName = firstName,
  this.lastName = lastName,
  this.favoriteColor = favoriteColor,
  this.favoriteNumber = favoriteNumber
}

Person.prototype.multiplyFavoriteNumber = function(number) {
  return this.favoriteNumber * number;
}

let abby = new Person('Abby','Smith','pink',2);

console.log(abby.multiplyFavoriteNumber(3));

function Parent(firstName, lastName, favoriteColor, favoriteFood){
  this.firstName = firstName;
  this.lastName = lastName;
  this.favoriteColor = favoriteColor;
  this.favoriteFood = favoriteFood;
}

function Child(firstName, lastName, favoriteColor, favoriteFood){
  Object.assign(this,)
}


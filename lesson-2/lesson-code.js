/*
let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false

//Write a function that searches the prototype chain of an object for a given property 
//and assigns it a new value. If the property does not exist in any of the prototype 
//objects, the function should do nothing. The following code should work as shown:

function assignProperty(obj,property,newValue) {
  while (obj !== null) {
    if (obj.hasOwnProperty(property)) {
      obj[property] = newValue;
    }
    obj = Object.getPrototypeOf(obj); // iterate through the prototype chain
  }
}
*/

/* 
for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
} */
// for in method allowsss you to iterate over properties in the prototype and not the current objec's OWN properties
// it iterates over all objects enumerable properties
/* Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
}); */

// Object.keys() method onlys iterates over it's OWN properties
// therefore, they are not always the same, because the first could have many prototypes in the chain

//let sample = Object.create(null);

//console.log(Object.getPrototypeOf(sample));

let obj1 = {"Bob":123,};

let obj2 = Object.create(obj1);

console.log("Bob" in obj2); // using in goes up the prototype chain

console.log(obj2.hasOwnProperty("Bob")); // only checks that direct object




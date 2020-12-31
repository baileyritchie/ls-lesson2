// following video on the prototype chain

// example 1

const obj = {
  monkey:"yep"
}

console.log(typeof obj === 'object');
console.log(typeof obj === 'function');

console.log(obj.hasOwnProperty('monkey')); // has on property is found by going up the chain to "Object"
console.log(obj.hasOwnProperty('elephant'));

//console.log((obj.__proto__ === Object.prototype));
//console.log((obj.getPrototypeOf(obj) === Object.prototype));

// example 2

const func = function() {};

func.call(); // searches up the chain once more and gets to "Function"'s prototype property... 

console.log(func.__proto__ === Function.prototype); // true
console.log(func.constructor === Function); // true

// example 3

const arr = ['a','b'];
console.log(arr.join("")); // 'ab'


//example 4






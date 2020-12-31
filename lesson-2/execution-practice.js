/*
Practice Problems: Implicit and Explicit Function Execution Contexts
*/
//What will the following code output?
/* function func() {
  return this;
} */

//let context = func();

//console.log(context); // logs Object[global] in Node.js
// the implicit context for func is the global object

//What will the following code output? Explain the difference, if any, between this output and that of problem 1.

/* let obj = {
  func: function() {
    return this;
  },
}; */

//let context = obj.func();

//console.log(context); // logs the object obj, since it invokes func() as a method
// as a method invocation it receives an implicit execution context that refers to the object used to invoke it

/* message = 'Hello from the global scope!'; // creates a 'message' prop on global object

function deliverMessage() {
  console.log(this.message); // global object
}

deliverMessage();

let foo = {
  message: 'Hello from the function scope!',
};

foo.deliverMessage = deliverMessage;

foo.deliverMessage(); // hello from the function scope


obj1.call(obj2);
obj3.apply(obj4,[]) */


let foo = {
  a: 1,
  b: 2,
};

let bar = {
   a: 'abc',
   b: 'def',
   add: function() {
     return this.a + this.b;
   },
};

console.log(bar.add.call(foo)); // 3






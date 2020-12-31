class Greeting {
  greet(greeting){
    console.log(greeting);
  } 
}

class Hello extends Greeting {
  hi(){
    return this.greet('Hello');
  }
}

class Goodbye extends Greeting {
  bye(){
    return this.greet('Goodbye');
  }
}

let hello = new Hello();
hello.hi();

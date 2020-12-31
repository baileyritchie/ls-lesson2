let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    [1, 2, 3].forEach( (number) => {console.log(String(number) + ' ' + this.a + ' ' + this.b)});
  },
};

obj.foo();
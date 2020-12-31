function createBook(title,author,read = false){
  return {
    title,
    author,
    read,
    getDescription() {
      return this.read ? (`${this.title} was written by ${this.author}. I have read it.` ) : 
      (`${this.title} was written by ${this.author}. I haven't read it.`);
    }
  }
}

let book1 = createBook('Mythos','Stephen Fry',true);
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlemen","PG Wodehouse",true);

console.log(book1.getDescription());
console.log(book2.getDescription());
console.log(book3.getDescription());
// Klassenschreibweise ES6
class TodoList {
  constructor() {
    this.list = [];
  };
  
  get() {
    return this.list
  };

  add(todoText)  {
    this.list.push( { text: String(todoText), done: false } ); 
  };

  set(index, done) {
    this.list[index].done = done;
  };

  clean() {
    this.list = this.list.filter( (todo)  => !todo.done )
  };

  dump() {
    console.log('=========');
    this.list.forEach( (todo, i) => {
      console.log(`${i + 1} - ${todo.text}: ${todo.done} `);
      console.log('---------');
    });
  };
}

module.exports = TodoList ;




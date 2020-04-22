let list = [];

const get = () => {
  return list;
}

const add = (todoText) => {
 list.push( { text: String(todoText), done: false } ); 
}

const set = (index, done) => {
  list[index].done = done;
}

const clean = () => {
  list = list.filter( (todo)  => !todo.done )
}

const dump = () => {
  console.log('=========');
  list.forEach( (todo, i) => {
    console.log(`${i + 1} - ${todo.text}: ${todo.done} `);
    console.log('---------');
  })
}

module.exports = {
  get,
  add, 
  set,
  clean, 
  dump
}



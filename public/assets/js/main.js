"use strict";
{
  const $ = (qs) => document.querySelector(qs);
  const $$ = (qs) => Array.from(document.querySelectorAll(qs));

  function index(el) {
    if (!el) return -1;
    var i = 0;
    do {
      i++;
    } while (el = el.previousElementSibling);
    return i;
  }


  const DOM = {
    todoUl: $('.m-todo-list .list'),
    todoItem: $('.m-todo-list .list li'),
    todoInputText: $('.m-todo-list #input-text'),
    todoButtonAdd: $('.m-todo-list .btn-add-todo'),
    todoButtonClean: $('.m-todo-list .btn-clean-todos')
  }

  const socket = io.connect();

  const init = () => {
    socket.emit("get"); 
    DOM.todoButtonAdd.addEventListener('click', onBtnAddClick);
    DOM.todoButtonClean.addEventListener('click', onBtnCleanClick);
    window.addEventListener('keyup', onKeyup);
  }

  const onKeyup = (event) => {
    if(event.key.toUpperCase() === 'ENTER' && 
    DOM.todoInputText.value !== '') {
      DOM.todoInputText.focus();
      const text = DOM.todoInputText.value;
      socket.emit('add todo', text);
      DOM.todoInputText.value = '';
    }
  }

  const onCheckboxClick = (event) => {
    // console.log(index(event.currentTarget.parentNode) - 1);
    // console.log(event.currentTarget.id.split('-')[1]);
    // console.log(event.currentTarget.dataset.index);
    const index = event.currentTarget.dataset.index;
    const checked = event.currentTarget.checked;
    socket.emit("set todo", index , checked )
    
  }

  const onBtnCleanClick = (event) => {
    socket.emit('clean todos');
  }

  const onBtnAddClick = (event) => {
    const text = DOM.todoInputText.value;
    if (text.trim() !== '') {
      socket.emit('add todo', text);
      DOM.todoInputText.value = '';
    }
  }

  socket.on('fetch', (list) => {
    console.log(list);
    viewTodoList(list);
  });

  const viewTodoList = (list) => {
    DOM.todoUl.textContent = '';
    list.forEach((todo, i) => {
      const liNode = DOM.todoItem.cloneNode(true);      
      const id = `checkbox-${i}`;
      const checkboxNode = liNode.querySelector('[type="checkbox"]');

      const label = liNode.querySelector('label');

      checkboxNode.id = id;
      checkboxNode.dataset.index = i;
      checkboxNode.addEventListener('click', onCheckboxClick);
      checkboxNode.checked = todo.done;
      label.setAttribute('for',id);
      label.textContent = todo.text;

      DOM.todoUl.append(liNode);
    });
  }



  init();
}
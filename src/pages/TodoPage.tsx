import Axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import Todo, {TodoType} from '../components/Todo';

function TodoPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<TodoType[]>([]);

  const onClickAddTodo = useCallback(async event => {
    const todo: string = event.target.value;
    if (todo === '') return;
    try {
      const res = await Axios.post(
        'http://localhost:8000/todos',
        {todo},
        {
          headers: {
            ContentType: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      setTodos(prev => [...prev, res.data]);
    } catch (err) {
      throw new Error(err);
    }
    event.target.value = '';
  }, []);

  const activeEnter = useCallback(event => {
    if (event.key === 'Enter') {
      onClickAddTodo(event);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/');
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:8000/todos', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(res => {
        const Data: TodoType[] = res.data;
        setTodos(Data);
      })
      .catch(err => {
        throw new Error(err);
      });
  }, []);

  return (
    <PageWrapper>
      <div className="grid gap-5">
        <div className="flex flex-col">
          <label htmlFor="todo">Todo List</label>
          <input
            name="todo"
            className="border-black rounded-xl border-solid border-2 px-3"
            type="text"
            placeholder="할 일 추가"
            onClick={onClickAddTodo}
            onKeyDown={activeEnter}
            autoComplete="false"
          />
        </div>
        <div className="p-5 rounded-xl border-solid border-2 border-black w-80">
          {todos?.length ? (
            todos?.map(todoInfo => (
              <Todo key={todoInfo.id} setTodos={setTodos} {...todoInfo} />
            ))
          ) : (
            <p>작성된 항목이 없습니다.</p>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

export default TodoPage;

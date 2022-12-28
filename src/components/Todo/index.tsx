import Axios from 'axios';
import React, {
  useCallback,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react';

export type TodoType = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
};

type Props = TodoType & {
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
};

function Todo({setTodos, id, todo, isCompleted}: Props) {
  const [checkBox, setCheckBox] = useState<boolean>(isCompleted);
  const [modifyInput, setModifyInput] = useState<string>(todo);
  const [modifyMode, setModifyMode] = useState<boolean>(false);

  const onChangeTodo = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setCheckBox(event.target.checked);
      try {
        await Axios.put(
          `http://localhost:8000/todos/${id}`,
          {todo: modifyInput, isCompleted: event.target.checked},
          {
            headers: {
              ContentType: 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );
      } catch (err) {
        throw new Error(err);
      }
    },
    [checkBox]
  );

  const onChangeModify = useCallback(
    e => {
      setModifyInput(e.target.value);
    },
    [modifyInput]
  );

  const onClickUpdate = useCallback(async () => {
    setModifyMode(prev => !prev);
    if (!modifyMode) {
      return;
    }
    try {
      await Axios.put(
        `http://localhost:8000/todos/${id}`,
        {todo: modifyInput, isCompleted: checkBox},
        {
          headers: {
            ContentType: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
    } catch (err) {
      throw new Error(err);
    }
  }, [modifyMode, modifyInput]);

  const onClickDelete = useCallback(async () => {
    try {
      await Axios.delete(`http://localhost:8000/todos/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      setTodos(prev => [...prev.filter(todo => todo.id !== id)]);
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  return (
    <div className="flex justify-between">
      {checkBox ? (
        <input type="checkbox" onChange={onChangeTodo} checked />
      ) : (
        <input type="checkbox" onChange={onChangeTodo} />
      )}
      {modifyMode ? (
        <input
          type="text"
          className="border-gray rounded-lg border-solid border-2"
          value={modifyInput}
          onChange={onChangeModify}
        />
      ) : (
        <p className={checkBox ? 'line-through' : ''}>{modifyInput}</p>
      )}
      <div>
        <button
          className="border-gray rounded-lg border-solid border-2 hover:bg-green-300"
          type="button"
          onClick={onClickUpdate}
        >
          {modifyMode ? '✅' : '⚙️'}
        </button>
        <button
          className="border-gray rounded-lg border-solid border-2 hover:bg-red-300"
          type="button"
          onClick={onClickDelete}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default Todo;

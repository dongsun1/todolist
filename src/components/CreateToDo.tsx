import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState, USERTODOLIST_KEY } from '../atoms';

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const toDosSave = useRecoilValue(toDoState);
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { id: Date.now(), text: toDo, category: category },
      ...oldToDos,
    ]);
    setValue('toDo', '');
  };
  localStorage.setItem(USERTODOLIST_KEY, JSON.stringify(toDosSave));
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('toDo', {
          required: 'Please write a To Do',
        })}
        placeholder='Write a to do'
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;

// src/components/CounterList.jsx
import { useRecoilState } from 'recoil';
import { counterFamily } from '../../recoil/test/counterAtom';

function CounterItem({ id }) {
  const [count, setCount] = useRecoilState(counterFamily(id));

  return (
    <>
    <div className="flex justify-center items-center">
      <h3 className="text-lg border">카운터 {id}: {count}</h3>
        <button 
          className="bg-blue-500 px-4 py-2"
          onClick={() => setCount(count + 1)}
        >
          증가
        </button>
        <button 
          className="bg-red-500 px-4 py-2"
          onClick={() => setCount(count - 1)}
        >
          감소
        </button>
    </div>
    </>
  );
}

function CounterList() {
  // 예시로 3개의 카운터를 생성
  return (
    <>
      <CounterItem id={1} />
      <CounterItem id={2} />
      <CounterItem id={3} />
    </>
  );
}

export default CounterList;
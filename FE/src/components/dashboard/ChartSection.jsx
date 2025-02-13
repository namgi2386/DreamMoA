// import { Line } from "react-chartjs-2";

const data = {
  labels: ["1월", "2월", "3월", "4월", "5월"],
  datasets: [
    {
      label: "시간 사용량",
      data: [10, 30, 50, 20, 60],
      borderColor: "blue",
      fill: false,
    },
  ],
};

export default function ChartSection() {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg w-full">
      <h2 className="text-lg font-bold">📈 차트 영역</h2>
      {/* <Line data={data} /> */}
    </div>
  );
}

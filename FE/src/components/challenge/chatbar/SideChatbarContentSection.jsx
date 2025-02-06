import Filter from "badwords-ko";

export default function SideChatbarContentSection() {
  // const filter = new Filter();
  const filter = new Filter({ placeHolder: "😂" });
  filter.addWords("임남기", "욕설", "등록");
  filter.removeWords("병신");
  return (
    <div 
      className="h-[calc(100vh-180px)] overflow-y-auto p-4 flex-col break-words border-t" 
      style={{ fontFamily: "Cheetos" }}
    >
      <p className="font-user-input">여기에 텍스트 입력 1</p>
      <p className="font-user-input">여기에 텍스트 입력 2</p>
      <p className="font-user-input">여기에 텍스트 입력 3</p>
      {/* <p className="font-user-input">{filter.clean("욕을 합니다 개새끼")}</p>
      <p className="font-user-input">{filter.clean("임남기 님 욕설 로 등록 되셨습니다.")}</p>
      <p className="font-user-input">{filter.clean("병신은 이제부터 허용됩니다.")}</p> */}
    </div>
  );
}
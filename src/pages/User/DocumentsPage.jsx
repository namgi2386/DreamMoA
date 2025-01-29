import SideChatbar from "../../components/challenge/run/SideChatbar";
import EndButton from "../../components/challenge/finish/EndButton";

export default function DocumentsPage() {
  return (
    <>
      <EndButton/>
      <SideChatbar/>
      <div className="min-h-screen w-full bg-gray-800 flex items-center justify-center">
        <div className="text-2xl font-bold">DocumentsPage</div>
      </div>
    </>
  );
}
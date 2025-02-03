import SideChatbar from "../../components/challenge/run/SideChatbar";
import EndButton from "../../components/challenge/finish/EndButton";
import { Link } from "react-router-dom";
import testlogo from "../../assets/logo/testlogo.png";

export default function DocumentsPage() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 p-4 flex justify-start">
        <Link to="/">
          <img src={testlogo} alt="로고" className="h-10 w-auto" />
        </Link>
        <Link to="/challenge/create">
          <img src={testlogo} alt="챌린지 만들기" className="h-10 w-auto" />
        </Link>
      </div>
      <EndButton/>
      <SideChatbar/>
      <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center">
        <p>documents</p>
      </div>
    </>
  );
}
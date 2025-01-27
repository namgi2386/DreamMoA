import { useRecoilValue } from 'recoil';
import { userInfoState } from "../../recoil/atoms/authState";

export default function MyPage() {
  const userInfo = useRecoilValue(userInfoState);

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="flex items-center flex-col">
        <h1 className="text-2xl font-bold mb-5">mypage</h1>
        <p>이름 : {userInfo.name}</p>
        <p>이메일 : {userInfo.email}</p>
        <p>닉네임 : {userInfo.nickname}</p>
      </div>
    </div>
  );
}
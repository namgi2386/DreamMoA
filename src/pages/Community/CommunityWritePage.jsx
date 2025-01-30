import CommunityForm from "../../components/community/CommunityForm";


export default function CommunityWritePage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">새 글 작성</h1>
      <CommunityForm mode="create"/>
    </div>
  );
}
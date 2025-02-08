import { useRecoilState } from "recoil";
import { selectedTagsState } from "/src/recoil/atoms/tags/selectedTagsState";
import TagSelector from "./TagSelector";
// import { PencilIcon } from "@heroicons/react/24/outline";

export default function EditableTagList({ isEdittag, setIsEdittag, initialTags = [] }) {
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
      </div>

      {isEdittag ? (
        <div className="space-y-4">
          <TagSelector />
          {selectedTags.length > 3 && (
            <p className="text-red-500 text-sm">
              최대 3개의 태그만 선택할 수 있습니다.
            </p>
          )}
        </div>
      ) : (
        <div className="min-h-[40px]">
          {selectedTags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              관심있는 태그를 설정해보세요
            </p>
          )}
        </div>
      )}
    </div>
  );
}

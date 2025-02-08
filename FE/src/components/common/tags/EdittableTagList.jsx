import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedTagsState } from '/src/recoil/atoms/tags/selectedTagsState';
import TagSelector from './TagSelector';
import { PencilIcon } from '@heroicons/react/24/outline';

export default function EditableTagList({ initialTags = [] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);
  
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    // 편집 모드 진입시 초기 태그들을 선택된 태그로 설정
    if (!isEditing) {
      setSelectedTags(initialTags);
    }
  };

  const handleSave = () => {
    // TODO: API 호출하여 태그 저장
    setIsEditing(false);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">관심 태그</h3>
        <button
          onClick={handleEditClick}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {/* 여기 바꿔라!!!!!!!!!!!!!!!!!!!!!!!!! */}
          <PencilIcon className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <TagSelector />
          {selectedTags.length > 3 && (
            <p className="text-red-500 text-sm">최대 3개의 태그만 선택할 수 있습니다.</p>
          )}
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={selectedTags.length > 3}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              저장
            </button>
          </div>
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
            <p className="text-gray-500 text-sm">관심있는 태그를 설정해보세요</p>
          )}
        </div>
      )}
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import communityApi from '../../services/api/communityApi';

export default function CommunityForm({ initialData, mode = 'create' }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData || {
    userId : 5,
    category : '자유',
    title: '',
    content: ''
  });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'create') {
        await communityApi.create(formData);
      } else {
        await communityApi.update(initialData.postId, formData);
      }
      navigate('/community/list');
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        className="w-full p-2 border rounded"
        placeholder="제목"
      />
      <textarea
        value={formData.content}
        onChange={(e) => setFormData({...formData, content: e.target.value})}
        className="w-full p-2 border rounded h-48"
        placeholder="내용을 입력하세요"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        {mode === 'create' ? '작성하기' : '수정하기'}
      </button>
    </form>
  );
}
import { useRecoilState } from "recoil";
import { selectedTagsState } from "/src/recoil/atoms/tags/selectedTagsState";
import { motion, AnimatePresence } from "framer-motion";
import TagSelector from "./TagSelector";
// import { PencilIcon } from "@heroicons/react/24/outline";

export default function EditableTagList({
  isEdittag,
  setIsEdittag,
  initialTags = [],
}) {
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);

  // 새로 추가: 태그 삭제 핸들러
  const handleTagDelete = (tagToDelete) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToDelete));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 10, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  // 새로 추가: 태그 버튼 렌더링 함수
  const renderTagButtons = () => {
    const buttons = [];
    for (let i = 0; i < 3; i++) {
      const tag = selectedTags[i];
      buttons.push(
        <motion.button
          key={i}
          variants={tagVariants}
          onClick={() => tag && handleTagDelete(tag)}
          className={`
              px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-200
              ${
                tag
                  ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  : "bg-gray-100 text-gray-400"
              }
            `}
        >
          {tag ? `#${tag}` : "태그 추가"}
        </motion.button>
      );
    }
    return buttons;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="w-full bg-white rounded-3xl border-2 border-gray-300 p-4">
          <div className="flex gap-2 mb-4">
            {renderTagButtons()}
          </div>
          <div className="flex justify-between items-center mb-4"></div>
          
          <AnimatePresence mode="wait">
            {isEdittag ? (
              <motion.div
                key="editor"
                variants={tagVariants}
                className="space-y-4"
              >
                <TagSelector />
                {selectedTags.length > 3 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-red-500 text-sm"
                  >
                    최대 3개의 태그만 선택할 수 있습니다.
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="display"
                variants={tagVariants}
                className="min-h-[40px]"
              >
                {selectedTags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag, index) => (
                      <motion.span
                        key={index}
                        variants={tagVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full"
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </div>
                ) : (
                  <motion.p
                    variants={tagVariants}
                    className="text-gray-500 text-lg"
                  >
                    관심있는 태그를 설정해보세요.
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

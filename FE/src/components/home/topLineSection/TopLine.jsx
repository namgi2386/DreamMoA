import { motion } from "framer-motion";

export default function TopLine() {
  const topLineContent = `asdjhc asldj las dkajs dkajsdhh fweiroweidf vxkjchvxczg asdoqiwieweqr  sdhfkjt o dsoifvhxc xcvkjxh
                          asdjhc asldj las dkajs dkajsdhh fweiroweidf vxkjchvxczg asdoqiwieweqr  sdhfkjt o dsoifvhxc xcvkjxh
                          asdjhc asldj las dkajs dkajsdhh fweiroweidf vxkjchvxczg asdoqiwieweqr  sdhfkjt o dsoifvhxc xcvkjxh`
  return (
    <div className="overflow-hidden w-full h-[20px] bg-my-blue-3 flex items-center">
      <motion.div
        className=""
        animate={{
          x: [-1000, 1000],
        }}
        transition={{
          duration: 50, // 속도조절 50초동안 한바퀴
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <p>{topLineContent}</p>
      </motion.div>
    </div>
  );
};
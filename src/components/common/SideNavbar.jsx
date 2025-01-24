// src/components/common/SideNavbar.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaStar,FaFolder , FaAngleDoubleLeft   } from "react-icons/fa";
import { FcInspection } from "react-icons/fc";
import { PiShootingStarBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

export default function SideNavbar() {
  const [isSmall, setIsSmall] = useState(false);
  const [isMouseEnter, setIsMouseEnter ] = useState(false)

  return (
    <motion.nav 
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{ left: 0, right: window.innerWidth - 96 }}
      animate={{
        width: isSmall && !isMouseEnter ? '3rem' : '4rem',
        height: isSmall && !isMouseEnter ? '3rem' : '24rem'
        }}
        transition={{ duration: 0.5 , delay: 0.1}}

      onDragStart={() => {setIsSmall(true); }}
      onClick={() => isSmall? setIsMouseEnter(!isMouseEnter) : setIsMouseEnter(false)}
      onMouseLeave={() => !isSmall? setIsMouseEnter(!isMouseEnter) : setIsMouseEnter(false)}
      
      className={`
      fixed left-0 top-1/2 -translate-y-1/2
      dark:bg-gray-800 cursor-move
      ${isSmall && isMouseEnter ? 'bg-my-blue-1 rounded-xl' : 'bg-my-blue-1 '} 
      ${(isSmall && !isMouseEnter) ? 'h-12 w-12 rounded-xl' : 'h-96 w-16 rounded-tr-xl rounded-br-xl'}`}>
    <div className={`${(isSmall && !isMouseEnter) ? 'hidden' : 'h-full flex flex-col justify-evenly items-center'}`}>
      <button className="w-full text-3xl text-my-yellow hover:bg-white/10 py-4 flex justify-center items-center border-b-2"><FaStar /></button>
      <button className="w-full text-3xl text-white hover:bg-white/10 py-4 flex justify-center items-center border-b-2"><FcInspection /></button>
      <button className="w-full text-3xl text-white hover:bg-white/10 py-4 flex justify-center items-center border-b-2"><FaFolder /></button>
      <button className="w-full text-3xl text-white hover:bg-white/10 py-4 flex justify-center items-center border-b-2"><PiShootingStarBold /></button>
      <button className="w-full text-3xl text-white hover:bg-white/10 py-4 flex justify-center items-center "><CgProfile /></button>
      <button className='text-white'><FaAngleDoubleLeft /></button>
    </div>
   </motion.nav>
 );
}
import { motion } from 'framer-motion';
import { useState } from 'react';

function App() {
  const [isScaled, setIsScaled] = useState(false);
  const [dino, setDino] = useState(false);
  const [score, setScore] = useState(0);
  const [egg2, setEgg2] = useState(true);
  const [egg3, setEgg3] = useState(false);
  const [winText, setWinText] = useState(false);

  const handleClick = () => {
    setIsScaled(true);
    setScore(score + 1);

    if (score === 9) {
      setEgg2(true);
    }

    if (score === 19) {
      setEgg2(false);
      setEgg3(true);
    }

    if (score === 29) {
      setDino(true);
      setEgg3(false);
      setWinText(true);
    }

    setTimeout(() => {
      setIsScaled(false);
    }, 100); 
  };

  return (
    <div className="relative flex justify-center">
      <div className="mt-[160px] flex flex-col items-center cursor-pointer">
        {egg2 && (
          <motion.img
            onClick={handleClick}
            src='/egg2.jpg'
            alt="egg2"
            initial={{ scale: 1 }}
            animate={{ scale: isScaled ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.3 }}
            className='w-[280px] z-20'
          />
        )}
        {egg3 && (
          <motion.img
            onClick={handleClick}
            src='/lastEgg.jpg'
            alt="egg3"
            initial={{ scale: 1 }}
            animate={{ scale: isScaled ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.3 }}
            className='w-[280px] z-30'
          />
        )}
        {dino && (
          <motion.img
            src="/dino.jpg"
            alt="dino"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-[70px] mt-[20px] z-40"
          />
        )}
      <p className='text-[24px] font-normal mt-[30px]'>{score}</p>
      {winText && <h1 className='mt-[20px] text-[32px] font-bold text-green-900'>You got t-rex!</h1>}
      </div>
    </div>
  );
}

export default App

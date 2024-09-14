import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

function App() {
  const dataDino = [
    { dino: "/t-rex.jpg" },
    { dino: "/orange-dino.jpg" },
    { dino: "/triceratops.png" },
    { dino: "/velociraptor.jpg" },
    { dino: "/pterodaktil.png" },
    { dino: "/iguanodon.avif" },
    { dino: "/stegozavr.avif" },
    { dino: "/ankilozavr.jpg" },
  ];

  const audioClick = useRef();
  const finishClick = useRef();

  const [isScaled, setIsScaled] = useState(false);
  const [dino, setDino] = useState(false);
  const [score, setScore] = useState(0);
  const [egg2, setEgg2] = useState(true);
  const [egg3, setEgg3] = useState(false);
  const [winText, setWinText] = useState(false);
  const [currentDino, setCurrentDino] = useState(dataDino[0].dino);
  const [message, setMessage] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  const getRandomDino = () => {
    const randomIndex = Math.floor(Math.random() * dataDino.length);
    const result = dataDino[randomIndex].dino;
    setCurrentDino(result);
    setMessage(`You got a ${result.split('/').pop().split('.')[0]}!`);
  };

  const handleClick = () => {
    if (audioClick.current) {
      audioClick.current.play(); 
    };

    setIsScaled(true);
    setScore(score + 1);

    if (score === 30) {
      setEgg2(false);
      setEgg3(true);
    }

    if (score === 60) {
      if (finishClick.current) {
        finishClick.current.play(); 
      };

      getRandomDino();
      setDino(true);
      setEgg3(false);
      setWinText(true);

      setTimeout(() => {
        setIsGameOver(true); 
      }, 2000);
    }

    setTimeout(() => {
      setIsScaled(false);
    }, 100);
  };

  const restartGame = () => {
    setScore(0);
    setEgg2(true);
    setEgg3(false);
    setDino(false);
    setWinText(false);
    setIsGameOver(false);
    getRandomDino(); 
  };

  return (
    <div className="relative flex justify-center">
      <div className="mt-[140px] flex flex-col items-center cursor-pointer">
        <audio ref={audioClick} src='/music/click.mp3' preload="auto"></audio>
        <audio ref={finishClick} src='/music/finish.mp3' preload="auto"></audio>
        {egg2 && (
          <motion.img
            onClick={handleClick}
            src='/egg-noSmash.jpg'
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
            src='/egg-smah (1).jpg'
            alt="egg3"
            initial={{ scale: 1 }}
            animate={{ scale: isScaled ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.3 }}
            className='w-[280px] z-30'
          />
        )}
        {dino && (
          <motion.img
            src={currentDino}
            alt="dino"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-[180px] min-h-[100px] mt-[20px] z-40"
          />
        )}
        {winText && <h1 className='mt-[20px] text-[32px] font-bold text-green-900'>{message}</h1>}
        {isGameOver && (
          <motion.button
            onClick={restartGame}
            className='mt-[20px] px-4 py-2 bg-blue-500 text-white font-bold rounded'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            >Start</motion.button>
        )}
      </div>
    </div>
  );
}

export default App;

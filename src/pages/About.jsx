import React, { useState } from 'react';
import '../style/zikr.css';

const About = () => {
  const [count, setCount] = useState(0);
  const [currentZikrIndex, setCurrentZikrIndex] = useState(0);
  const [celebrate, setCelebrate] = useState(false);

  const zikr = [
    { kg: 'Субхаан Аллах', arab: 'سبحان الله' },
    { kg: 'Алхамдулиллах', arab: 'الحمد لله' },
    { kg: 'Аллаху Акбар', arab: 'الله اكبر' },
    { kg: 'Лаа Илааха Иллалох', arab: 'لا اله الا الله' },
    { kg: 'Астагфируллах', arab: 'استغفر الله' },
    { kg: 'Лаа хавла валаа куввата иллаа биллах', arab: 'لا حول ولا قوة الا ذالله' },
    { kg: 'Лаа илаха ила анта субханака инни кунту миназзолимин', arab: '' },
  ];

  const handleIncrement = () => {
    setCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount === 100) {
        setCelebrate(true);
        setTimeout(() => setCelebrate(false), 1500);  // Remove celebration after 1.5 seconds
        setCount(0);
        setCurrentZikrIndex(prevIndex => (prevIndex + 1) % zikr.length);
      }
      return newCount;
    });
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="zikr-container">
      <h1>Тасбих</h1>
      <p className="zikr-text">
        <span className="zikr-kg">{zikr[currentZikrIndex].kg}</span><br/>
        <span className="zikr-arab">{zikr[currentZikrIndex].arab}</span>
      </p>
      <p>Count: {count}</p>
      <button
        className={`increment-button ${celebrate ? 'celebrate' : ''}`}
        onClick={handleIncrement}
      >
        Тартуу
      </button>
      <button className="reset-button" onClick={handleReset}>Өчүрүү</button>
      {count === 100 && (
        <p className="congratulations-message">Аллахым сизден ыраазы болсун сиз 100гө жеттиңиз</p>
      )}
    </div>
  );
};

export default About;

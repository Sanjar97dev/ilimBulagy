import React, { useState } from 'react';
import '../style/test.css'

const Test = () => {
  const questions = [
    {
      question: "ПАЙГАМБАРЫБЫЗ С.А.В.ДЫН СҮТ ЭНЕСИНИН АТЫ?",
      options: ["Субайба", "Халима", "Мариям", "Хадича"],
      answer: "Халима"
    },
    {
      question: "ПАЙГАМБАРЫБЫЗ С.А.В.ДЫН ЧОҢ АТАСЫ АБДУЛМУТАЛИБДИН ӨЗ АТЫ КИМ БОЛГОН ?",
      options: ["Шайба", "Зайд", "Мудар", "Галиб"],
      answer: "Шайба"
    },
    {
      question: "ПАЙГАМБАРЫБЫЗ С.А.В.ДЫН ЧОҢ ЭНЕСИНИН АТЫ ?",
      options: ["Амина", "Хадича", "Фатима", "Барра"],
      answer: "Барра"
    },
    {
      question: "ПАЙГАМБАРЫБЫЗ (С.А.В)ДЫН ЭҢ ЖАКЫН ДОСУ КИМ БОЛГОН?",
      options: ["Абу Талиб", "Абу Бакр", "Умар", "Билал"],
      answer: "Абу Бакр"
    },
    {
      question: "НАМАЗ БАЛАКАТКА ЖЕТКЕН АЛ БИР МУСУЛМАН ҮЧҮН....",
      options: ["Парз", "Сүннөт", "Важип"],
      answer: "Парз"
    },
    {
      question: "ПАЙГАМБАРЫБЫЗ С.А.В. МЕККЕЛИКТЕРДИ ИСЛАМГА ЧАКЫРУУ ҮЧҮН КАЙСЫ ДӨБӨГӨ ЧЫГЫП КЫЙКЫРГАН?",
      options: ["Хира", "Марва", "Сафаа", "Савр"],
      answer: "Сафаа"
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerOptionClick = (option) => {
    setSelectedOption(option);
    setShowFeedback(true);
    
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className='quiz-container'>
      {showScore ? (
        <div className='score-section'>
          Сиз {questions.length} суроодон {score}сына туура жооп бердиңиз!
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Суроо {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='question-text'>{questions[currentQuestion].question}</div>
          </div>
          <div className='answer-section'>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option)}
                className={
                  showFeedback
                    ? option === questions[currentQuestion].answer
                      ? 'correct'
                      : option === selectedOption
                      ? 'incorrect'
                      : ''
                    : ''
                }
                disabled={showFeedback}
              >
                {option}
              </button>
            ))}
          </div>
          {showFeedback && (
            <button className='next-button' onClick={handleNextQuestion}>
              Кийинки суроо
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Test;

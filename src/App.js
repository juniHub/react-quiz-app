import "./styles.css";
import React, { useState } from "react";
import { data } from "./data";
import Footer from "./Components/Footer";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [myAnswer, setMyAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finish, setFinish] = useState(false);
  const [show, setShow] = useState(false);
  const [clickAnswer, setClickAnswer] = useState(false);

  const checkAnswer = (variant) => {
    setMyAnswer(variant);
    setClickAnswer(true);
  };

  const checkCorrectAnswer = () => {
    if (myAnswer === data[currentQuestion].a) {
      setScore(score + 1);
    }
  };

  const showAnswer = () => {
    setShow((show) => !show);
  };
  const reset = () => {
    setShow(false);
    setClickAnswer(false);
  };

  const finishHandler = () => {
    if (currentQuestion === data.length-1) {
      setFinish(true);
      checkCorrectAnswer();
    }
  };

  const startOver = () => {
    setCurrentQuestion(0);
    setFinish(false);
    setMyAnswer("");
    setScore(0);
  };

  if (finish) {
    return (
      <div className="flex flex-col min-h-screen container m-4 p-4 mx-auto items-center">
        <div className="wrapper flex-grow">
          <h3 className="m-4 p-2 h-30 text-center text-2xl font-bold">
            {`Thank You! Your Final Score is
            ${score}/${data.length}
            points.`}
          </h3>
          <button
            className="w-full h-14 mt-2 px-2 rounded-lg bg-gray-400 text-black font-bold hover:bg-black hover:text-white"
            onClick={() => startOver()}
          >
            Start Over
          </button>

        </div>
        <Footer/>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col min-h-screen container m-4 p-4 mx-auto items-center">
        <div className="wrapper flex-grow w-full">
          <h2 className="mb-6 p-4 h-30 text-center text-2xl font-bold">
            {data[currentQuestion].q}
          </h2>
          <div className="flex flex-row justify-between">
          <span className="m-2 border-2 border-black mx-auto px-2 bg-gray-800 text-pink-300 rounded-lg text-center">
            {`Current Question: ${currentQuestion + 1}/${data.length}`}
          </span>
          <span className="m-2 border-2 border-black mx-auto px-2 bg-gray-800 text-blue-300 rounded-lg text-center">
            {`Current Score: ${score}/${data.length}`}
          </span>
          </div>
          {data[currentQuestion].c.map((variant) => (
            <div className="m-2 h-14 border-2 border-black text-center">
              <p
                key={variant.id}
                                
                className={`variant ${
                  myAnswer === variant
                    ? myAnswer === data[currentQuestion].a
                      ? "correctAnswer"
                      : "incorrectAnswer"
                    : null
                }`}
                onClick={() => checkAnswer(variant)}
              >
                {variant}
              </p>
            </div>
          ))}

          
        </div>

        {clickAnswer && myAnswer !== data[currentQuestion].a && (
            <button
              className="w-full h-14 mt-2 px-2 rounded-lg bg-gray-200 text-blue-400 font-bold hover:bg-gray-400 hover:text-blue-600"
              onClick={() => showAnswer()}
            >
              Show Answer
            </button>
          )}
          {show && (
            <p className="m-2 h-14 mx-auto text-center">
              Correct Answer: {data[currentQuestion].a}
            </p>
          )}

       

          {currentQuestion < data.length - 1 && (
            <button
              className="w-full h-14 mt-2 px-2 rounded-lg bg-gray-400 text-black font-bold hover:bg-black hover:text-white"
              onClick={() => {
                setCurrentQuestion(currentQuestion + 1);
                checkCorrectAnswer();
                reset();
              }}
            >
              NEXT
            </button>
          )}
            
          {currentQuestion > 0 && (
            <button
              className="w-full h-14 mt-2 px-2 rounded-lg bg-gray-100 text-gray-400 font-bold hover:bg-black hover:text-white"
              onClick={() => {
                setCurrentQuestion(currentQuestion - 1);
                checkCorrectAnswer();
                reset();
              }}
            >
              BACK
            </button>
          )}

  
          {currentQuestion === data.length - 1 && (
            <button
              className="w-full h-14 mt-2 px-2 rounded-lg bg-gray-400 text-black font-bold hover:bg-black hover:text-white"
              onClick={() => finishHandler()}
            >
              FINISH
            </button>
          )}


         <Footer/>

       
      </div>
    );
  }
}

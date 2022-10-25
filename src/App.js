import "./styles.css";
import React, { useState } from "react";
import { data } from "./data";

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
    if (currentQuestion === data.length - 1) {
      setFinish(true);
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
      <div className="container m-4 p-4 mx-auto h-min-screen grid grid-rows-1 grid-cols-1 items-center">
        <div className="wrapper">
          <h3 className="m-4 p-2 h-30 text-center text-2xl font-bold">
            {`Game Over! Your Final Score is
            ${score}/${data.length - 1}
            points.`}
          </h3>
          <button
            className="w-full h-14 mt-2 px-2 rounded-lg bg-gray-600 text-pink-400 font-bold hover:bg-gray-800 hover:text-pink-600"
            onClick={() => startOver()}
          >
            Start Over
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container m-4 p-4 mx-auto h-min-screen grid grid-rows-1 grid-cols-1 items-center">
        <div className="wrapper">
          <h2 className="m-4 p-2 h-30 text-center text-2xl font-bold">
            {data[currentQuestion].q}
          </h2>
          <span className="m-2 border-2 border-black mx-auto px-2 bg-gray-600 text-pink-400 rounded-lg text-center">
            {`${currentQuestion}/${data.length - 1}`}
          </span>
          {data[currentQuestion].c.map((variant) => (
            <div className="m-2 h-14 border-2 border-black mx-auto text-center">
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

          {clickAnswer && (
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
              className="w-full h-14 mt-2 px-2 rounded-lg bg-gray-600 text-pink-400 font-bold hover:bg-gray-800 hover:text-pink-600"
              onClick={() => {
                setCurrentQuestion(currentQuestion + 1);
                checkCorrectAnswer();
                reset();
              }}
            >
              NEXT
            </button>
          )}

          {currentQuestion === data.length - 1 && (
            <button
              className="w-full h-14 mt-2 px-2 rounded-lg bg-gray-600 text-pink-400 font-bold hover:bg-gray-800 hover:text-pink-600"
              onClick={() => finishHandler()}
            >
              FINISH
            </button>
          )}

          <footer className="m-4 text-center">
            Data source from{" "}
            <a
              className="text-pink-400"
              href=""
              target="_blank"
              rel="noreferrer"
            >
              Source Here
            </a>{" "}
          </footer>
        </div>
      </div>
    );
  }
}

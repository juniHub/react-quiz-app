import React from "react";

export default function Footer() {
    
      return (
       
          
          <footer className="m-4 text-center text-gray-600">
              Made with ReactJS and TailwindCSS by{" "}
              <a
                className="text-black"
                href="https://www.juninguyen.tech/"
                target="_blank"
                rel="noreferrer"
              >
                Juni Nguyen
              </a>{" "}
              <br/>
              Question and Answer Database from{" "}
              <a
                className="text-black"
                href="https://github.com/jmatzen/quizsail"
                target="_blank"
                rel="noreferrer"
              >
                Quizsail Repo
              </a>{" "}
            </footer>
      
      )
}
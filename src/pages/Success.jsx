import React, { useState, useEffect } from "react";
const Success = () => {
  const [textElements, setTextElements] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const texts = [
      "Thanks for your purchase,😊 ",
      "Hope you come again",
      "Check out chat features",
    ];

    const interval = setInterval(() => {
      if (charIndex < texts[textIndex].length) {
        setCurrentText(
          (prevText) => prevText + texts[textIndex].charAt(charIndex)
        );
        setCharIndex((prevIndex) => prevIndex + 1);
      } else {
        setTextIndex((prevIndex) => prevIndex + 1);
        setCharIndex(0);
        setCurrentText("");
      }
      if (textIndex === texts.length) clearInterval(interval);
    }, 100); // Change the typing speed here (milliseconds)

    return () => clearInterval(interval);
  }, [charIndex, textIndex]);

  return (
    <>
      <center>
        <div className="justify-center items-center mt-16">
          <img
            src="https://res.cloudinary.com/dtfvdjvyr/image/upload/v1712252343/pana_kc1h6e.png"
            alt="Your Image"
            className="duration-5000"
            height={350}
            width={350}
          />
        </div>
        <button className="rounded-full btn-57 py-2 px-4 font-medium text-white mt-4">
          {" "}
          Chat with Event Attendees
        </button>
        <p className="mt-4 text-white">{currentText}</p>
      </center>
    </>
  );
};

export default Success;

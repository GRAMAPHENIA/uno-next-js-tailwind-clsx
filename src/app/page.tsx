"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { clsx } from "clsx";
import Modal from "@/components/ui/Modal";

function HomePage() {
  const [correctNumber, setCorrectNumber] = useState(10);
  const [showNextButton, setShowNextButton] = useState(false);
  const [incorrectNumbers, setIncorrectNumbers] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);

  // Estados para los tres modales
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showLostModal, setShowLostModal] = useState(false);
  const [solutionModalContent, setSolutionModalContent] = useState("");
  const [correctModalContent, setCorrectModalContent] = useState("");
  const [lostModalContent, setLostModalContent] = useState(
    "Perdiste. Inténtalo de nuevo!"
  );

  useEffect(() => {
    generateNewCorrectNumber();
  }, []);

  const generateNewCorrectNumber = () => {
    let newCorrectNumber;
    do {
      newCorrectNumber = Math.floor(Math.random() * 12) + 1;
    } while (newCorrectNumber === correctNumber);
    setCorrectNumber(newCorrectNumber);
    setSelectedNumber(null);
    setIncorrectNumbers([]);
    setShowNextButton(false);
  };

  const handleCircleClick = (number) => {
    setSelectedNumber(number);
    if (number === correctNumber) {
      setCorrectModalContent("Esta es la imagen correcta");
      setShowCorrectModal(true);
      setShowNextButton(true);
    } else {
      setIncorrectNumbers((prev) => {
        const updatedIncorrectNumbers = [...prev, number];
        if (updatedIncorrectNumbers.length > 7) {
          setLostModalContent("Perdiste. Inténtalo de nuevo!");
          setShowLostModal(true);
        }
        return updatedIncorrectNumbers;
      });
    }
  };

  const handleNextClick = () => {
    generateNewCorrectNumber();
    setShowCorrectModal(false);
    setShowLostModal(false);
  };

  const handleShowSolution = () => {
    setSolutionModalContent(
      `La ilustracion correcta es la que se encuentra en la casilla ${correctNumber}`
    );
    setShowSolutionModal(true);
  };

  const handleCloseSolutionModal = () => {
    setShowSolutionModal(false);
  };

  const handleCloseCorrectModal = () => {
    setShowCorrectModal(false);
  };

  const handleCloseLostModal = () => {
    setShowLostModal(false);
    handleNextClick();
  };

  return (
    <main className="m-auto flex flex-col justify-center items-center min-h-screen bg-slate-800/30">
      <h1 className="text-2xl mb-10 text-amber-100 font-mono">
        BUSCANDO <span className="text-blue-300/50">∷</span> IMÁGENES
      </h1>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((number) => (
          <div
            key={number}
            onClick={() => handleCircleClick(number)}
            className={clsx(
              "flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-xl cursor-pointer",
              {
                "border border-slate-800": true,
                "bg-emerald-300/80":
                  number === correctNumber && number === selectedNumber,
                "bg-red-400/90": incorrectNumbers.includes(number),
              }
            )}
            style={{
              minWidth: "15px",
              minHeight: "15px",
            }}
          >
            <Image
              src={`/${number}.png`}
              alt={`Imagen ${number}`}
              width={128}
              height={128}
              className="rounded-xl p-4 sm:p-8"
            />
          </div>
        ))}
      </div>
      {showNextButton ? (
        <Button
          className="bg-transparent border border-slate-800 hover:bg-blue-300/10 mt-10"
          type="button"
          onClick={handleNextClick}
        >
          Siguiente puzzle
        </Button>
      ) : (
        <Button
          className="bg-transparent border border-slate-800 hover:bg-blue-300/10 mt-10"
          type="button"
          onClick={handleShowSolution}
        >
          Ver Solución
        </Button>
      )}
      <Modal
        show={showSolutionModal}
        onClose={handleCloseSolutionModal}
        title="Solución"
      >
        {solutionModalContent}
      </Modal>
      <Modal
        show={showCorrectModal}
        onClose={handleCloseCorrectModal}
        title="¡Acertaste!"
        contentClass="text-gray-100"
      >
        {correctModalContent}
      </Modal>
      <Modal
        show={showLostModal}
        onClose={handleCloseLostModal}
        title="Perdiste"
        contentClass="text-gray-100"
      >
        {lostModalContent}
      </Modal>
    </main>
  );
}

export default HomePage;

import React from "react";
import { MAX_MISTAKES } from "../../lib/constants";
import { PuzzleDataContext } from "../PuzzleDataProvider";
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from "../../lib/local-storage";
import {
  isGameDataEquivalent,
  isGuessesFromGame,
} from "../../lib/game-helpers";
import { analyzeWordGroups, validateWordGroup, getHints, sendGameData, getCurrentGameAnswers } from "../../services/gameApi";

export const GameStatusContext = React.createContext();

function GameStatusProvider({ children }) {
  const { gameData } = React.useContext(PuzzleDataContext);
  const [submittedGuesses, setSubmittedGuesses] = React.useState([]);
  const [solvedGameData, setSolvedGameData] = React.useState(() => {
    const loadedState = loadGameStateFromLocalStorage();
    console.log("checking game state!", {
      loadedState: loadedState,
      gd1: gameData,
      gd2: loadedState?.gameData,
    });
    if (!isGameDataEquivalent({ gd1: gameData, gd2: loadedState?.gameData })) {
      return [];
    }
    if (
      !isGuessesFromGame({
        gameData,
        submittedGuesses: loadedState?.submittedGuesses,
      })
    ) {
      return [];
    }
    if (Array.isArray(loadedState?.submittedGuesses)) {
      setSubmittedGuesses(loadedState.submittedGuesses);
    }

    if (Array.isArray(loadedState?.solvedGameData)) {
      return loadedState.solvedGameData;
    }
    return [];
  });

  const [isGameOver, setIsGameOver] = React.useState(false);
  const [isGameWon, setIsGameWon] = React.useState(false);
  const [guessCandidate, setGuessCandidate] = React.useState([]);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [analysisResults, setAnalysisResults] = React.useState(null);
  const [hints, setHints] = React.useState(null);

  const numMistakesUsed = submittedGuesses.length - solvedGameData.length;

  // Send game data to backend when component mounts
  React.useEffect(() => {
    const sendDataToBackend = async () => {
      try {
        await sendGameData(gameData);
        console.log('Game data sent to backend successfully');
      } catch (error) {
        console.error('Failed to send game data to backend:', error);
      }
    };
    
    sendDataToBackend();
  }, [gameData]);

  // Function to analyze current game state
  const analyzeCurrentGame = async () => {
    try {
      setIsAnalyzing(true);
      const allWords = gameData.flatMap(category => category.words);
      const results = await analyzeWordGroups(allWords);
      setAnalysisResults(results);
    } catch (error) {
      console.error('Error analyzing game:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Function to validate a guess
  const validateGuess = async (words) => {
    try {
      const result = await validateWordGroup(words);
      return result;
    } catch (error) {
      console.error('Error validating guess:', error);
      return { isValid: false };
    }
  };

  // Function to get hints
  const getGameHints = async () => {
    try {
      const allWords = gameData.flatMap(category => category.words);
      const result = await getHints(allWords, solvedGameData);
      setHints(result);
      return result;
    } catch (error) {
      console.error('Error getting hints:', error);
      return null;
    }
  };

  // use effect to check if game is won
  React.useEffect(() => {
    if (solvedGameData.length === gameData.length) {
      setIsGameOver(true);
      setIsGameWon(true);
    }
    const gameState = { submittedGuesses, solvedGameData, gameData };
    saveGameStateToLocalStorage(gameState);
  }, [solvedGameData]);

  // use effect to check if all mistakes have been used and end the game accordingly
  React.useEffect(() => {
    if (numMistakesUsed >= MAX_MISTAKES) {
      setIsGameOver(true);
      setIsGameWon(false);
    }
    const gameState = { submittedGuesses, solvedGameData, gameData };
    saveGameStateToLocalStorage(gameState);
  }, [submittedGuesses]);

  const answers = await getCurrentGameAnswers(gameData);

  return (
    <GameStatusContext.Provider
      value={{
        isGameOver,
        isGameWon,
        numMistakesUsed,
        solvedGameData,
        setSolvedGameData,
        submittedGuesses,
        setSubmittedGuesses,
        guessCandidate,
        setGuessCandidate,
        isAnalyzing,
        analysisResults,
        hints,
        analyzeCurrentGame,
        validateGuess,
        getGameHints,
      }}
    >
      {children}
    </GameStatusContext.Provider>
  );
}

export default GameStatusProvider;

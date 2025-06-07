"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import { FaFlag, FaCheck, FaTimes, FaMedal } from "react-icons/fa";

type Country = {
  name: { common: string };
  cca2: string;
  flags: { png: string; alt?: string };
};

export default function GuessTheFlag() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [usedCountries, setUsedCountries] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentFlag, setCurrentFlag] = useState<Country | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [gameActive, setGameActive] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data = await response.json();

        const validCountries = data
          .filter((country: Country) => {
            // Basic validation checks
            if (!country.cca2 || !country.name?.common || !country.flags?.png) {
              return false;
            }

            // Filter out very small or not widely recognized entities
            const excludedCodes = [
              "AQ",
              "VA",
              "BV",
              "HM",
              "UM",
              "GS",
              "TF",
              "IO",
              "EH",
              "SJ",
              "GP",
              "MQ",
              "YT",
              "RE",
              "BL",
              "MF",
            ];

            if (excludedCodes.includes(country.cca2)) {
              return false;
            }

            return true;
          })
          .reduce((acc: Country[], curr: Country) => {
            // Check if we already have a country with this flag URL
            const flagUrl = getFlagUrl(curr.cca2);
            const flagExists = acc.some((c) => getFlagUrl(c.cca2) === flagUrl);

            // Only add if flag isn't already in our list
            if (!flagExists) {
              acc.push(curr);
            }
            return acc;
          }, []);

        console.log(
          `Filtered down to ${validCountries.length} valid unique countries`
        );

        setCountries(validCountries);
        generateQuestion(validCountries);
      } catch (err) {
        console.error(err);
        setError("Failed to load countries. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFlagUrl = (countryCode: string) => {
    // Use a more consistent flag API
    return `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
  };

  const generateQuestion = (countryData: Country[] = countries) => {
    if (countryData.length < 15) return; // Ensure we have enough countries

    // Reset state for new question
    setSelectedAnswer(null);
    setSelectedAnswer(null);
    setIsCorrect(null);
    // Get available countries (not used in this game session)
    let availableCountries = countryData.filter(
      (country) => !usedCountries.has(country.cca2)
    );

    // If we've used too many countries, reset the used tracking
    if (availableCountries.length < 10) {
      setUsedCountries(new Set());
      availableCountries = countryData;
    }

    // Get 4 random unique countries
    const shuffledCountries = [...availableCountries].sort(
      () => 0.5 - Math.random()
    );
    const selectedCountries = shuffledCountries.slice(0, 4);

    // Extra validation: ensure countries have different names
    const countryNames = new Set(selectedCountries.map((c) => c.name.common));
    if (countryNames.size < 4 && shuffledCountries.length > 4) {
      let i = 4;
      while (countryNames.size < 4 && i < shuffledCountries.length) {
        countryNames.add(shuffledCountries[i].name.common);
        selectedCountries[countryNames.size - 1] = shuffledCountries[i];
        i++;
      }
    }

    // Choose one as the correct answer
    const correctCountry = selectedCountries[0];
    setCurrentFlag(correctCountry);

    // Add to used countries - store both code and name to prevent duplication
    setUsedCountries((prev) => {
      const updated = new Set(prev);
      updated.add(correctCountry.cca2);
      return updated;
    });

    // Create options array from validated countries and shuffle it
    const countryOptions = selectedCountries.map(
      (country) => country.name.common
    );
    setOptions([...countryOptions].sort(() => 0.5 - Math.random()));
  };

  const handleImageError = () => {
    setImageError(true);

    if (currentFlag) {
      console.error("Flag failed to load:", {
        country: currentFlag.name.common,
        code: currentFlag.cca2,
        flagUrl: getFlagUrl(currentFlag.cca2),
      });
    }

    // Try another country, excluding the one that failed
    if (countries.length > 0 && currentFlag) {
      // Add the problematic country to used countries to avoid it
      setUsedCountries((prev) => {
        const updated = new Set(prev);
        if (currentFlag) updated.add(currentFlag.cca2);
        return updated;
      });

      // Generate a new question
      generateQuestion();
    }
  };

  const handleAnswer = (answer: string) => {
    // Don't allow multiple answers for the same question
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);
    const correct = answer === currentFlag?.name.common;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
    }

    setQuestionsAnswered((prev) => prev + 1);

    // End game after 10 questions
    if (questionsAnswered >= 9) {
      setGameActive(false);
    }
  };

  const handleNextQuestion = () => {
    generateQuestion();
  };

  const restartGame = () => {
    setScore(0);
    setQuestionsAnswered(0);
    setGameActive(true);
    generateQuestion();
  };

  if (loading) {
    return (
      <>
        <main className="bg-gradient-to-br from-purple to-black font-alef text-white min-h-screen py-16 px-6">
          <div className="max-w-4xl mx-auto flex justify-center py-24">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-beige"></div>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <main className="bg-gradient-to-br from-purple to-black font-alef text-white min-h-screen py-16 px-6">
          <div className="max-w-4xl mx-auto p-8 bg-white/10 rounded-xl text-center">
            <h1 className="text-3xl mb-4">Error</h1>
            <p className="text-beige mb-6">{error}</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="bg-gradient-to-br from-purple to-black font-alef text-white min-h-screen py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <FaFlag className="text-beige" />
              Guess The Flag
            </h1>
            <p className="text-xl text-beige/80">
              Test your geography knowledge by identifying flags from around the
              world!
            </p>
          </div>

          {/* Game Content */}
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-beige"></div>
            </div>
          ) : error ? (
            <div className="bg-white/10 rounded-xl p-8 text-center">
              <p className="text-beige">{error}</p>
            </div>
          ) : gameActive && currentFlag ? (
            <div className="bg-white/10 rounded-xl p-8 shadow-lg">
              {/* Score Display */}
              <div className="flex items-center justify-between mb-6">
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="text-sm">Question</span>
                  <p className="font-bold">{questionsAnswered + 1}/10</p>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="text-sm">Score</span>
                  <p className="font-bold">{score}</p>
                </div>
              </div>

              {/* Flag Display */}
              <div className="flex justify-center mb-8">
                <div className="w-full max-w-md relative bg-white/5 p-2 rounded-lg shadow-lg">
                  <Image
                    src={getFlagUrl(currentFlag.cca2)}
                    alt="Guess which country this flag belongs to"
                    width={320}
                    height={200}
                    className="w-full h-auto object-contain"
                    onError={handleImageError}
                    unoptimized
                  />
                </div>
              </div>

              {/* Question */}
              <h2 className="text-2xl font-semibold text-center mb-6">
                Which country does this flag belong to?
              </h2>

              {/* Answer Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={selectedAnswer !== null}
                    className={`p-4 rounded-lg text-left font-medium text-lg transition-all ${
                      selectedAnswer === option
                        ? isCorrect
                          ? "bg-green-500/20 border-2 border-green-500"
                          : "bg-red-500/20 border-2 border-red-500"
                        : selectedAnswer !== null &&
                          option === currentFlag.name.common
                        ? "bg-green-500/20 border-2 border-green-500"
                        : "bg-white/20 hover:bg-white/30 border-2 border-transparent"
                    }`}
                  >
                    {option}
                    {selectedAnswer === option && isCorrect && (
                      <FaCheck className="inline ml-2 text-green-500" />
                    )}
                    {selectedAnswer === option && !isCorrect && (
                      <FaTimes className="inline ml-2 text-red-500" />
                    )}
                    {selectedAnswer !== null &&
                      selectedAnswer !== option &&
                      option === currentFlag.name.common && (
                        <FaCheck className="inline ml-2 text-green-500" />
                      )}
                  </button>
                ))}
              </div>

              {/* Result & Next Button */}
              {selectedAnswer && (
                <div className="text-center">
                  {isCorrect ? (
                    <p className="text-green-400 text-lg mb-4">
                      Correct! Well done!
                    </p>
                  ) : (
                    <p className="text-red-400 text-lg mb-4">
                      Sorry, the correct answer is {currentFlag.name.common}.
                    </p>
                  )}
                  <button
                    onClick={handleNextQuestion}
                    className="bg-beige/20 hover:bg-beige/30 text-white px-6 py-3 rounded-full font-medium transition-all"
                  >
                    Next Question
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white/10 rounded-xl p-8 text-center">
              <div className="flex justify-center mb-6">
                <FaMedal className="text-6xl text-beige" />
              </div>
              <h2 className="text-3xl font-bold mb-3">Game Complete!</h2>
              <p className="text-2xl text-beige mb-6">
                Your final score: <span className="font-bold">{score}/10</span>
              </p>
              {score >= 8 ? (
                <p className="text-green-400 mb-6">
                  Excellent! You&apos;re a geography expert!
                </p>
              ) : score >= 5 ? (
                <p className="text-beige/80 mb-6">
                  Good job! You know your flags well!
                </p>
              ) : (
                <p className="text-beige/80 mb-6">
                  Keep practicing to improve your score!
                </p>
              )}
              <button
                onClick={restartGame}
                className="bg-beige/20 hover:bg-beige/30 text-white px-8 py-3 rounded-full font-medium transition-all"
              >
                Play Again
              </button>
            </div>
          )}

          {/* Attribution */}
          <div className="mt-12 text-center text-beige/60 text-sm">
            <p>Data provided by REST Countries API</p>
          </div>
        </div>
      </main>
    </>
  );
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setImageError(_arg0: boolean) {
  throw new Error("Function not implemented.");
}

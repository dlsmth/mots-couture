import { useEffect, useState } from "react";
import Definition from "./definition";

interface WordData {
  book: string;
  word: string;
  page: number;
  date: string;
}

const speechParts = ["noun", "verb", "adjective", "adverb"];

const translatePart = (part: string) => {
  switch (part) {
    case "noun":
      return ", n.";
      break;
    case "verb":
      return ", v.";
      break;
    case "adjective":
      return ", adj.";
      break;
    case "adverb":
      return ", adv.";
      break;
    default:
      return;
  }
};

const sortList = ["Newest", "Oldest", "A - Z", "Z - A", "Longest", "Shortest"];

const arrowIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
  >
    <path d="m112.769-480 308.616 308.615q8.846 8.846 8.731 21.154-.116 12.308-8.962 21.154T400-120.231q-12.308 0-21.154-8.846L73.154-434.538Q63.46-444.231 59-456.154 54.538-468.077 54.538-480T59-503.846q4.461-11.923 14.154-21.616l305.692-305.692q8.846-8.846 21.269-8.731 12.424.116 21.27 8.962t8.846 21.154q0 12.308-8.846 21.154L112.769-480Z" />
  </svg>
);

const tempDef = [
  {
    word: "epithet",
    phonetic: "/ˈɛ.pɪ.θɛt/",
    phonetics: [
      {
        text: "/ˈɛ.pɪ.θɛt/",
        audio:
          "https://api.dictionaryapi.dev/media/pronunciations/en/epithet-us.mp3",
        sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=60610119",
        license: {
          name: "BY-SA 4.0",
          url: "https://creativecommons.org/licenses/by-sa/4.0",
        },
      },
    ],
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "A term used to characterize a person or thing.",
            synonyms: [],
            antonyms: [],
          },
          {
            definition:
              "A term used as a descriptive substitute for the name or title of a person.",
            synonyms: [],
            antonyms: [],
          },
          {
            definition:
              "One of many formulaic words or phrases used in the Iliad and Odyssey to characterize a person, a group of people, or a thing.",
            synonyms: [],
            antonyms: [],
          },
          {
            definition: "An abusive or contemptuous word or phrase.",
            synonyms: [],
            antonyms: [],
          },
          {
            definition:
              "A word in the scientific name of a taxon following the name of the genus or species. This applies only to formal names of plants, fungi and bacteria. In formal names of animals the corresponding term is the specific name.",
            synonyms: [],
            antonyms: [],
          },
        ],
        synonyms: ["cognomen"],
        antonyms: [],
      },
      {
        partOfSpeech: "verb",
        definitions: [
          {
            definition: "To term; to refer to as.",
            synonyms: [],
            antonyms: [],
            example: 'He was epitheted "the king of fools".',
          },
        ],
        synonyms: [],
        antonyms: [],
      },
    ],
    license: {
      name: "CC BY-SA 3.0",
      url: "https://creativecommons.org/licenses/by-sa/3.0",
    },
    sourceUrls: ["https://en.wiktionary.org/wiki/epithet"],
  },
];

const tempDef2 = [
  {
    word: "car",
    phonetic: "/kɑː/",
    phonetics: [
      {
        text: "/kɑː/",
        audio:
          "https://api.dictionaryapi.dev/media/pronunciations/en/car-uk.mp3",
        sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=9014179",
        license: {
          name: "BY 3.0 US",
          url: "https://creativecommons.org/licenses/by/3.0/us",
        },
      },
      {
        text: "/kɑɹ/",
        audio:
          "https://api.dictionaryapi.dev/media/pronunciations/en/car-us.mp3",
        sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=424729",
        license: {
          name: "BY-SA 3.0",
          url: "https://creativecommons.org/licenses/by-sa/3.0",
        },
      },
    ],
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition:
              "A wheeled vehicle that moves independently, with at least three wheels, powered mechanically, steered by a driver and mostly for personal transportation.",
            synonyms: [
              "auto",
              "automobile",
              "carriage",
              "motor",
              "motorcar",
              "vehicle",
            ],
            antonyms: [],
            example: "She drove her car to the mall.",
          },
          {
            definition:
              "A wheeled vehicle, drawn by a horse or other animal; a chariot.",
            synonyms: [],
            antonyms: [],
          },
          {
            definition: "An unpowered unit in a railroad train.",
            synonyms: ["railcar", "wagon"],
            antonyms: [],
            example: "The conductor coupled the cars to the locomotive.",
          },
          {
            definition:
              "An individual vehicle, powered or unpowered, in a multiple unit.",
            synonyms: [],
            antonyms: [],
            example:
              "The 11:10 to London was operated by a 4-car diesel multiple unit.",
          },
          {
            definition:
              "A passenger-carrying unit in a subway or elevated train, whether powered or not.",
            synonyms: [],
            antonyms: [],
            example:
              "From the frontmost car of the subway, he filmed the progress through the tunnel.",
          },
          {
            definition:
              "A rough unit of quantity approximating the amount which would fill a railroad car.",
            synonyms: ["carload", "wagonload"],
            antonyms: [],
            example: "We ordered five hundred cars of gypsum.",
          },
          {
            definition:
              "The moving, load-carrying component of an elevator or other cable-drawn transport mechanism.",
            synonyms: [],
            antonyms: [],
            example:
              "Fix the car of the express elevator - the door is sticking.",
          },
          {
            definition:
              "The passenger-carrying portion of certain amusement park rides, such as Ferris wheels.",
            synonyms: ["carriage"],
            antonyms: [],
            example:
              "The most exciting part of riding a Ferris wheel is when your car goes over the top.",
          },
          {
            definition:
              "The part of an airship, such as a balloon or dirigible, which houses the passengers and control apparatus.",
            synonyms: ["basket", "gondola"],
            antonyms: [],
          },
          {
            definition: "A sliding fitting that runs along a track.",
            synonyms: [],
            antonyms: [],
          },
          {
            definition: "The aggregate of desirable characteristics of a car.",
            synonyms: [],
            antonyms: [],
            example: "Buy now! You can get more car for your money.",
          },
          {
            definition: "A floating perforated box for living fish.",
            synonyms: [],
            antonyms: [],
          },
        ],
        synonyms: [
          "auto",
          "automobile",
          "carriage",
          "motor",
          "motorcar",
          "vehicle",
          "basket",
          "gondola",
          "carload",
          "wagonload",
          "carriage",
          "railcar",
          "wagon",
        ],
        antonyms: [],
      },
    ],
    license: {
      name: "CC BY-SA 3.0",
      url: "https://creativecommons.org/licenses/by-sa/3.0",
    },
    sourceUrls: ["https://en.wiktionary.org/wiki/car"],
  },
  {
    word: "car",
    phonetic: "/kɑː/",
    phonetics: [
      {
        text: "/kɑː/",
        audio:
          "https://api.dictionaryapi.dev/media/pronunciations/en/car-uk.mp3",
        sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=9014179",
        license: {
          name: "BY 3.0 US",
          url: "https://creativecommons.org/licenses/by/3.0/us",
        },
      },
      {
        text: "/kɑɹ/",
        audio:
          "https://api.dictionaryapi.dev/media/pronunciations/en/car-us.mp3",
        sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=424729",
        license: {
          name: "BY-SA 3.0",
          url: "https://creativecommons.org/licenses/by-sa/3.0",
        },
      },
    ],
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [{ definition: "A turn.", synonyms: [], antonyms: [] }],
        synonyms: [],
        antonyms: [],
      },
    ],
    license: {
      name: "CC BY-SA 3.0",
      url: "https://creativecommons.org/licenses/by-sa/3.0",
    },
    sourceUrls: ["https://en.wiktionary.org/wiki/car"],
  },
  {
    word: "car",
    phonetic: "/kɑː/",
    phonetics: [
      {
        text: "/kɑː/",
        audio:
          "https://api.dictionaryapi.dev/media/pronunciations/en/car-uk.mp3",
        sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=9014179",
        license: {
          name: "BY 3.0 US",
          url: "https://creativecommons.org/licenses/by/3.0/us",
        },
      },
      {
        text: "/kɑɹ/",
        audio:
          "https://api.dictionaryapi.dev/media/pronunciations/en/car-us.mp3",
        sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=424729",
        license: {
          name: "BY-SA 3.0",
          url: "https://creativecommons.org/licenses/by-sa/3.0",
        },
      },
    ],
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition:
              "The first part of a cons in LISP. The first element of a list",
            synonyms: [],
            antonyms: [],
          },
        ],
        synonyms: [],
        antonyms: ["cdr"],
      },
    ],
    license: {
      name: "CC BY-SA 3.0",
      url: "https://creativecommons.org/licenses/by-sa/3.0",
    },
    sourceUrls: ["https://en.wiktionary.org/wiki/car"],
  },
];

async function getDef(word: string) {
  // return tempDef[0].meanings[0].definitions[0].definition;

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const wordRef = await response.json();
    // console.log(wordRef[0].meanings[0].definitions[0].definition);
    console.log(wordRef[0].meanings[0].definitions);
    // console.log(response);
    // return wordRef[0].meanings[0].definitions[0].definition;
    // return wordRef[0].meanings[0].definitions[0].definition;
    return wordRef[0].meanings[0].definitions;
  } catch (error) {
    console.log(error);
    return "did not work!";
  }

  const wordRaw = [
    {
      word: "anomalous",
      phonetics: [
        {
          audio:
            "https://api.dictionaryapi.dev/media/pronunciations/en/anomalous-us.mp3",
          sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=685466",
          license: {
            name: "BY-SA 3.0",
            url: "https://creativecommons.org/licenses/by-sa/3.0",
          },
        },
      ],
      meanings: [
        {
          partOfSpeech: "adjective",
          definitions: [
            {
              definition:
                "Deviating from the normal; marked by incongruity or contradiction; aberrant or abnormal.",
              synonyms: [],
              antonyms: [],
            },
            {
              definition: "Of uncertain or unknown categorization; strange.",
              synonyms: [],
              antonyms: [],
            },
            { definition: "Having anomalies.", synonyms: [], antonyms: [] },
          ],
          synonyms: [],
          antonyms: [],
        },
      ],
      license: {
        name: "CC BY-SA 3.0",
        url: "https://creativecommons.org/licenses/by-sa/3.0",
      },
      sourceUrls: ["https://en.wiktionary.org/wiki/anomalous"],
    },
  ];

  // const wordDef = JSON.parse(wordJson);
}

const WordList = (props: {
  data: WordData[];
  fromDJour: boolean;
  wordDJour: WordData;
  resetFromDJour: any;
  readToggleHandler: any;
  readToggle: boolean;
  deleteWord: any;
}) => {
  const [sortType, setSortType] = useState(sortList[2]);
  const [words, setWords] = useState<WordData[]>([]);
  const [wordDetailMode, setWordDetailMode] = useState<WordData | null>(null);
  const [wordDeleteMode, setWordDeleteMode] = useState(false);
  const [definitions, setDefinitions] = useState<any | null>([]);
  // const [partOfSpeech, setPartOfSpeech] = useState("");
  const [whichMean, setWhichMean] = useState(0);
  const [whichDef, setWhichDef] = useState(0);
  const [prevEnd, setPrevEnd] = useState(false);
  const [nextEnd, setNextEnd] = useState(false);

  useEffect(() => {
    setWords(props.data);
  }, []);

  useEffect(() => {
    console.log(sortType);
    const sortedWords = sortLogic(words, sortType);
    setWords(sortedWords);
  }, [sortType]);

  const sortChangeHandler = (e: { target: { value: string } }) => {
    console.log(e.target.value);
    setSortType(e.target.value);
  };

  const clickWordHandler = (
    word: string,
    book: string,
    page: number,
    date: string
  ) => {
    setWordDetailMode({ word, book, page, date });
    console.log();
  };

  const fetchDefinition = (e: { target: { value: string } }) => {
    const word = e;
    // alert(`Definition for ${word} coming soon.`);
    console.log(`Definition for ${word} coming soon.`);
  };

  const sortLogic = (w: WordData[], l: string) => {
    const list: WordData[] = [...props.data];

    if (l === "A - Z") {
      list.sort((a: { word: string }, b: { word: string }) =>
        a.word.localeCompare(b.word)
      );
    }

    if (l === "Z - A") {
      list.sort((a: { word: string }, b: { word: string }) =>
        b.word.localeCompare(a.word)
      );
    }

    if (l === "Newest") {
      list.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    }

    if (l === "Oldest") {
      list.sort((a, b) => +new Date(a.date) - +new Date(b.date));
    }

    if (l === "Longest") {
      list.sort(
        (a: { word: string }, b: { word: string }) =>
          b.word.length - a.word.length
      );
    }

    if (l === "Shortest") {
      list.sort(
        (a: { word: string }, b: { word: string }) =>
          a.word.length - b.word.length
      );
    }

    return list;
  };

  const showWordDetail = (word: string) => {
    console.log(word);
  };

  const wordDeleteHandler = (word: string) => {
    props.deleteWord(word);
    closeWordDetail();
  };

  const closeWordDetail = () => {
    console.log(`Closing word detail...`);
    setWordDeleteMode(false);
    setWordDetailMode(null);
    props.resetFromDJour(() => false);
  };

  useEffect(() => {
    if (props.fromDJour === true) {
      setWordDetailMode(props.wordDJour);
    }
  }, [closeWordDetail]);

  useEffect(() => {
    if (wordDetailMode) {
      console.log("requesting...");
      // getDef(wordDetailMode!.word);
      fetchDef(wordDetailMode.word);
      // setDefinitions(tempDef[0]);
      setWhichMean(0);
      setWhichDef(0);
      setPrevEnd(true);
      setNextEnd(false);
    }
  }, [wordDetailMode]);

  const fetchDef = (word: string) => {
    //show progress bar
    //  this.setState({ isLoading: true });

    //fetch repos

    const failDef = "No definition found for this word.";
    // setDefinitions([{definition: failDef}]);
    // setDefinition("Definitions are offline right now.");
    // setPartOfSpeech("");

    try {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => response.json())
        .then((data) => {
          //  console.log(data[0].meanings[0].definitions[0].definition);
          //  setDefinition(`${data[0].meanings[0].partOfSpeech}: ${data[0].meanings[0].definitions[0].definition}`);
          // setDefinition(`${data[0].meanings[0].definitions[0].definition}`);
          // setPartOfSpeech(`${data[0].meanings[0].partOfSpeech}`);
          setDefinitions(data[0]);
          console.log(data[0]);
        });
    } catch (error) {
      // console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log('listening for definitions...');
  //   if (definitions.meanings) {
  //     const numDefs = definitions.meanings.length;
  //     console.log(`${definitions.word} has: ${numDefs} definitions`);
  //     definitions.meanings.map((m) => console.log(m));
  //   } else {
  //     console.log('still getting definitions...');
  //   }
  // }, [wordDetailMode, definitions]);

  // const defHandler = (direction) => {
  //   console.log(`Clicking on direction`);

  // };

  const prevDef = () => {
    console.log("previous definition...");
    setPrevEnd(false);
    setNextEnd(false);
    if (definitions.meanings[whichMean].definitions[whichDef - 1] > 0) {
      console.log("there are more definitions!");
      // console.log("setting to:");
      // console.log(whichMean, whichDef);
      setWhichDef((prevValue) => prevValue - 1);
    } else {
      console.log("there are no more definitions!");
      if (definitions.meanings[whichMean - 1] > 0) {
        console.log("there are more meanings!");
        setWhichMean((prevValue) => prevValue - 1);
        setWhichDef(0);
        // console.log("setting to:");
        // console.log(whichMean, whichDef);
        // setWhichMean(whichMean + 1);
      } else {
        console.log("there are no more definitions, and no more meanings");
        setPrevEnd(true);
        // if (definitions.meanings[whichMean].definitions.length > whichDef + 1) {
        //   console.log("there are more definitions, but no more meanings");
        //   setWhichDef((prevValue) => prevValue + 1);
        // } else {
        //   console.log("there are no more definitions and no more meanings!");
        // }
        // console.log("there are no more meanings!");
        // console.log("leaving as:");
        // console.log(whichMean, whichDef);
      }
    }

    if (definitions.length > whichMean) {
    }
  };

  const nextDef = () => {
    console.log("next definition...");
    setPrevEnd(false);
    setNextEnd(false);
    if (definitions.meanings[whichMean].definitions.length > whichDef + 1) {
      console.log("there are more definitions!");
      // console.log("setting to:");
      // console.log(whichMean, whichDef);
      setWhichDef((prevValue) => prevValue + 1);
      if (definitions.meanings.length > whichMean + 1) {
        setNextEnd(true);
      }
    } else {
      console.log("there are no more definitions!");
      if (definitions.meanings.length > whichMean + 1) {
        console.log("there are more meanings!");
        setWhichMean((prevValue) => prevValue + 1);
        setWhichDef(0);
        // console.log("setting to:");
        // console.log(whichMean, whichDef);
        // setWhichMean(whichMean + 1);
      } else {
        console.log("there are no more definitions, and no more meanings");
        // setPrevEnd(false);
        setNextEnd(true);
        // if (definitions.meanings[whichMean].definitions.length > whichDef + 1) {
        //   console.log("there are more definitions, but no more meanings");
        //   setWhichDef((prevValue) => prevValue + 1);
        // } else {
        //   console.log("there are no more definitions and no more meanings!");
        // }
        // console.log("there are no more meanings!");
        // console.log("leaving as:");
        // console.log(whichMean, whichDef);
      }
    }

    if (definitions.length > whichMean) {
    }
  };

  useEffect(() => {}, [prevDef, nextDef]);

  useEffect(() => {
    // const mappedDefs = mapDefinitions();
  }, [definitions]);

  const mapDefinitions = () => {};

  return (
    <>
      <div
        className={`bg-[#191919] absolute z-1000 p-4 pb-6 translate-y-0 left-0 w-full bottom-0 text-white rounded-t-2xl md:rounded md:opacity-0 transition-all duration-300 ${
          wordDetailMode
            ? "translate-y-0 md:translate-y-0 md:opacity-100"
            : "translate-y-full md:translate-y-0 md:opacity-0"
        }`}
      >
        <div className="grid gap-1 grid-cols-1 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline">
              <p className="text-xl">{wordDetailMode?.word}</p>
              {/* {!typeof partOfSpeech && (
                <p className="text-sm opacity-80">{` ${translatePart(
                  partOfSpeech
                )}`}</p>
              )} */}
              {definitions.meanings && (
                <p className="text-sm opacity-80">{` ${translatePart(
                  definitions.meanings[whichMean].partOfSpeech
                )}`}</p>
              )}
            </div>
            <div className="flex invisible md:visible">
              <span
                className={
                  prevEnd === true
                    ? `fill-white opacity-20`
                    : `fill-white opacity-100`
                }
                onClick={() => prevDef()}
              >
                {arrowIcon}
              </span>
              <span
                className={
                  nextEnd === true
                    ? `fill-white opacity-20 rotate-180`
                    : `fill-white opacity-100 rotate-180`
                }
                onClick={() => nextDef()}
              >
                {arrowIcon}
              </span>
            </div>
          </div>
          <p className="text-sm">{`from ${wordDetailMode?.book}, p. ${wordDetailMode?.page}`}</p>
          <p className="text-sm text-white opacity-80">
            {definitions.meanings
              ? definitions.meanings[whichMean].definitions[whichDef].definition
              : "loading definition..."}
            {/* {"No definitions yet."} */}
          </p>
          {wordDeleteMode && (
            <div className="flex gap-4 mt-4">
              <button
                className="w-full text-center rounded h-10 bg-[#ff000095]"
                onClick={() => wordDeleteHandler(wordDetailMode!.word)}
              >
                Confirm Delete
              </button>
            </div>
          )}
          {!wordDeleteMode && (
            <div className="flex gap-4 mt-4">
              <button
                className="flex-none w-14 rounded h-10 bg-[#ff000095]"
                onClick={() => setWordDeleteMode(true)}
              >
                Delete
              </button>
              <button
                className="flex-1 bg-none rounded border-solid border-2 border-[#ffffff80]"
                onClick={() => closeWordDetail()}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-0">
        <div className="relative">
          <select
            className="block appearance-none w-full text-gray-700 py-3 pr-8 leading-tight bg-white focus:outline-none focus:bg-white focus:border-gray-500 border border-gray-400 border-t-0 border-l-0 border-r-0"
            onChange={sortChangeHandler}
          >
            <option>Sort by: {sortType}</option>
            {sortList.map((s) => {
              if (s !== sortType) return <option key={s}>{s}</option>;
            })}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-black h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <ul className="mt-4 divide-y divide-dashed">
          <li>
            <div className="flex items-center justify-start w-full mb-2">
              <label
                htmlFor="shareToggle"
                className="flex items-center cursor-pointer"
              >
                <div className="relative">
                  <input
                    id="shareToggle"
                    type="checkbox"
                    className="sr-only"
                    onChange={props.readToggleHandler}
                    // checked={props.readToggle}
                  />
                  <div className="w-10 h-4 bg-neutral-300 rounded-full shadow-inner"></div>
                  <div className="pl-2 dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                </div>
                <div className="ml-3 font-medium text-sm">
                  Include shared word list
                </div>
              </label>
            </div>
          </li>
          {words.map(({ date, word, book, page }: WordData) => {
            if (word === "start" || word === "end") {
              return;
            }
            return (
              <li
                id={word}
                className="pb-1 hover:bg-white py-1"
                key={book + word + page + date}
                onClick={() => clickWordHandler(word, book, page, date)}
              >
                <p>{word}</p>
                {/* <p>{`${book}, p. ${page}`}</p> */}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default WordList;

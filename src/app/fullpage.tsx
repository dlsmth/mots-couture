import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
  PromiseLikeOfReactNode,
  SetStateAction,
} from "react";

import { useState } from "react";

interface WordData {
  book: string;
  word: string;
  page: number;
  prevState: null;
}

interface BookData {
  book: string;
  prevState: null;
}

const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="36"
    viewBox="0 -960 960 960"
    width="36"
  >
    <path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z" />
  </svg>
);

const FullPage = (props: any) => {
  const bookChangeHandler = (e: { target: { value: any } }) => {
    const selection = e.target.value;
    selection === "+ Add Book" ? setNewBookInput(true) : setNewBookInput(false);
    props.setCurrentBook(e.target.value);
    console.log(`Switching book to: ${e.target.value}`);
  };

  //   const addBookHandler = () => {
  //       setBookData(prevValue => )
  //   };

  const [newBookInput, setNewBookInput] = useState(false);
  const [wordData, setWordData] = useState<WordData | null>(null);
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [whichBook, setWhichBook] = useState("");
  const [bookText, setBookText] = useState("");
  const [wordText, setWordText] = useState("");
  const [pageText, setPageText] = useState("");

  const handleBookText = (e: { target: { value: SetStateAction<string> } }) => {
    setBookText(e.target.value);
  };

  const handleWordText = (e: { target: { value: SetStateAction<string> } }) => {
    setWordText(e.target.value);
  };

  const handlePageText = (e: { target: { value: SetStateAction<string> } }) => {
    setPageText(e.target.value);
  };

  const addNewBookHandler = () => {
    if (bookText === "") {
      return;
    } else {
      props.addBookHandler(bookText);
      setNewBookInput((prevValue) => false);
    }
  };

  const addNewWordHandler = () => {
    if (wordText === "" || pageText === null) {
      return;
    } else {
      props.addWordHandler(props.currentBook, wordText, pageText);
    }
  };

  return (
    <>
      <div className="bg-white drop-shadow:lg flex flex-col absolute w-full h-full md:h-3/4 rounded-none top-0 z-50 md:max-w-2xl md:rounded-md md:m-auto md:mt-4 lg:mt-6 md:m-0 md:left-1/2 md:-translate-x-1/2 pb-4">
        <div className="flex items-center justify-between bg-[#ECDBBA90] p-3">
          <div>
            <p className="text-2xl text-bold capitalize">{props.extrasType}</p>
          </div>
          <div className="-mr-1" onClick={props.closeFullPage}>
            {closeIcon}
          </div>
        </div>
        <div className="overflow-scroll px-4">{props.children}</div>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-black/30 z-40"
        onClick={props.closeFullPage}
      ></div>
    </>
  );
};

export default FullPage;

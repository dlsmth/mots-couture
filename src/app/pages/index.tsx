"use client";

interface WordData {
  book: string;
  word: string;
  page: number;
  date: string;
}

import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import Link from "next/link";

import Modal from "../modal";

const addIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="64"
    viewBox="0 -960 960 960"
    width="64"
  >
    <path d="M453-446v136q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625 12.825 0 21.325-8.625T513-310v-136h137q12.75 0 21.375-8.675 8.625-8.676 8.625-21.5 0-12.825-8.625-21.325T650-506H513v-144q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T453-650v144H310q-12.75 0-21.375 8.675-8.625 8.676-8.625 21.5 0 12.825 8.625 21.325T310-446h143Zm27.266 366q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Z" />
  </svg>
);

const arrowForward = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="32"
    viewBox="0 -960 960 960"
    width="32"
  >
    <path d="M459-182q-8-8-8-21t8-21l226-226H190q-13 0-21.5-8.5T160-480q0-13 8.5-21.5T190-510h495L459-736q-8-8-8-21.5t8-21.5q8-8 21-8t21 8l278 278q5 5 7 10t2 11q0 5-2 10.5t-7 10.5L501-181q-8 8-21 7.5t-21-8.5Z" />
  </svg>
);

const arrowBack = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="32"
    viewBox="0 -960 960 960"
    width="32"
  >
    <path d="M447-181 169-459q-5-5-7-10t-2-11q0-6 2-11t7-10l279-279q8-8 20-8t21 9q9 9 9 21t-9 21L262-510h496q13 0 21.5 8.5T788-480q0 13-8.5 21.5T758-450H262l228 228q8 8 8 20t-9 21q-9 9-21 9t-21-9Z" />
  </svg>
);

const getDate = () => {
  return new Date();
};

const getLocal = () => {
  const ls = JSON.parse(localStorage.getItem("mcdata") || "[]");
  console.log(`ls is: ${ls}`);
  return ls;
};

// localStorage.setItem("users", JSON.stringify(users));
// users = JSON.parse(localStorage.getItem("users") || "[]");

const setLocal = (data: WordData) => {
  const ls = getLocal();
  console.log(`this is local (parsed): ${ls}`);
  ls.push(data);
  localStorage.setItem("mcdata", JSON.stringify(ls));
};

// const tempBooks: string[] = [
//   "The Blue Hotel",
//   "The Open Boat",
//   "Madame Bovary",
//   "Dubliners",
// ];

// const tempData = [
//   {
//     book: "The American",
//     word: "lacrymose",
//     page: 201,
//     date: "010122",
//   },
//   { book: "The American", word: "flounces", page: 203, date: "010222" },
//   { book: "The American", word: "intaglio", page: 207, date: "010322" },
//   { book: "The American", word: "malheureux", page: 212, date: "010422" },
//   { book: "The American", word: "betimes", page: 215, date: "010522" },
// ];

// const wordDJour = (d) => {
//   const random = Math.floor(Math.random() * d.length - 1);
//   const word = d[random].word;
//   const book = d[random].book;
//   return {word: word, "Definitions not available yet."}
// };

const Home = (props: { bookName: SetStateAction<null> }) => {
  const [now, setNow] = useState();
  const [mode, setMode] = useState(0);
  const [data, setData] = useState([]);
  const [currentBook, setCurrentBook] = useState("");
  const [books, setBooks] = useState([]);
  const [addBookMode, setAddBookMode] = useState(false);

  useEffect(() => {
    const now = new Date();
    // setNow(now);
    // setBooks(tempData);
    getLocal();
    // getWordDJour();
    // setCurrentBook(data[data.length - 1].book);
  }, []);

  const onAddHander = () => {
    setMode(1);
    const date = new Date();
    console.log(date);
  };

  const bookSelectionHandler = (bookName: SetStateAction<string>) => {
    setCurrentBook(bookName);
  };

  const closeModal = () => {
    setMode(0);
  };

  const addBookHandler = (b: string) => {
    console.log("GOT BOOK:");
    console.log(b);
    setCurrentBook(b);
    // const oldBooks = books;
    // const newBooks = books.push(b);
  };

  const addWordHandler = (b: string, w: string, p: number) => {
    const date = getDate();
    const data = { book: b, word: w, page: p, date: date.toString() };
    setLocal(data);
    setCurrentBook(b);
    // console.log(b);
    // console.log(w);
    // console.log(p);
    // console.log(date);
    closeModal();
  };

  return (
    <>
      {mode === 1 && (
        <Modal
          closeModal={closeModal}
          selectBook={bookSelectionHandler}
          books={books}
          currentBook={currentBook}
          setCurrentBook={setCurrentBook}
          addBookHandler={addBookHandler}
          addWordHandler={addWordHandler}
          setAddBookMode={setAddBookMode}
          addBookMode={addBookMode}
        />
      )}
      <div>
        <main className="p-4 text-center">
          <div className="m-auto pt-4">
            <h1 className="text-3xl text-bold">Mots Couture - Index</h1>
          </div>
          <div className="border-t-2 border-b-2 border-solid border-black/20 bg-none items-center justify-between my-4 p-3 text-left w-full">
            <div className="pr-2">
              <h2>Word D'Jour</h2>
              <p className="text-2xl">lacrymose</p>
              <p>The American, p. 135</p>
            </div>
          </div>
          {currentBook && (
            <div className="shadow-sm bg-white/80 flex items-center justify-between my-4 p-3 rounded-lg text-left w-full">
              <div className="pr-2">
                <h2>Currently Reading:</h2>
                <p className="text-xs">{currentBook}</p>
              </div>
              <button className="hover:bg-[#C84B31]/20 text-[#C84B31] font-bold py-1 px-2 rounded-full underline">
                change
              </button>
            </div>
          )}
          <Link href="/booklist">
            <div className="shadow-sm bg-white/80 flex items-center justify-between my-4 p-3 rounded-lg text-left w-full">
              <div className="pr-2">
                <h2>Full Book List:</h2>
                <p className="text-xs">
                  All the books, alongside start and completion dates.
                </p>
              </div>
              <button className="fill-[#C84B31]">{arrowForward}</button>
            </div>
          </Link>
          <Link href="/wordlist">
            <div className="shadow-sm bg-white/80 flex items-center justify-between my-4 p-3 rounded-lg text-left w-full">
              <div className="pr-2">
                <h2>Full Word List:</h2>
                <p className="text-xs">All the words, for your perusal.</p>
              </div>
              <button className="fill-[#C84B31]">{arrowForward}</button>
            </div>
          </Link>
          <Link href="/wordquiz">
            <div className="shadow-sm bg-white/80 flex items-center justify-between my-4 p-3 rounded-lg text-left w-full">
              <div className="pr-2">
                <h2>Word Quiz:</h2>
                <p className="text-xs">Test your memory!</p>
              </div>
              <button className="fill-[#C84B31]">{arrowForward}</button>
            </div>
          </Link>
          <Link href="/analytics">
            <div className="shadow-sm bg-white/80 flex items-center justify-between my-4 p-3 rounded-lg text-left w-full">
              <div className="pr-2">
                <h2>Analytics:</h2>
                <p className="text-xs">
                  Additions, cadence, stats, trends, and predictions.
                </p>
              </div>
              <button className="fill-[#C84B31]">{arrowForward}</button>
            </div>
          </Link>
          <div className="fixed bottom-0 right-0 p-4">
            <span
              className={
                mode === 1
                  ? "drop-shadow-none fill-white/50"
                  : "drop-shadow-md hover:drop-shadow-sm fill-[#C84B31] hover:fill-[#C84B31]/80"
              }
              onClick={onAddHander}
            >
              {addIcon}
            </span>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;

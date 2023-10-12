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

import Modal from "./modal";
import Changemodal from "./changemodal";
import Emptydatamodal from "./emptydatamodal";
import FullPage from "./fullpage";
import BookList from "./booklist";
import WordList from "./wordlist";
import WordQuiz from "./wordquiz";
import Analytics from "./analytics";
import { tempdata } from "./tempdata";

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

const question = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="40"
    viewBox="0 -960 960 960"
    width="40"
  >
    <path d="M602.693-643.823q0-52.203-34.558-83.524-34.558-31.321-90.927-31.321-35.669 0-63.386 14.797-27.717 14.798-47.849 44.486-8.82 12.691-23.524 15.82-14.705 3.128-27.448-4.641-13.102-8.333-15.756-20.653-2.654-12.32 5.679-25.782 29.387-45.109 73.419-68.31 44.032-23.202 98.939-23.202 87.82 0 142.204 49.807 54.384 49.807 54.384 129.705 0 43.872-19.025 81.551-19.026 37.68-61.564 77.474-42 38.077-57.308 62.386-15.308 24.309-17.769 54.666-2.052 15.59-13.046 26.025-10.994 10.436-25.741 10.436-14.958 0-25.572-10.377-10.613-10.378-10.613-24.161 0-37.589 18.756-70.654 18.757-33.064 60.845-70.699 44.271-39.159 62.065-69.749 17.795-30.59 17.795-64.08ZM477.202-100.001q-22.561 0-38.804-16.323-16.243-16.323-16.243-38.884t16.323-38.804q16.322-16.243 38.883-16.243 22.561 0 38.804 16.323 16.244 16.322 16.244 38.883 0 22.561-16.323 38.804-16.323 16.244-38.884 16.244Z" />
  </svg>
);

const book = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="40"
    viewBox="0 -960 960 960"
    width="40"
  >
    <path d="M254.051-309.487q53.045 0 103.036 12.346 49.99 12.346 98.862 38.065V-668.41q-44.051-30.436-96.387-46.269-52.335-15.834-105.511-15.834-37.077 0-68.756 6.808-31.679 6.807-66.576 19.653-4.616 1.539-6.539 4.424-1.924 2.885-1.924 6.346v396.973q0 5.129 3.847 7.629 3.846 2.5 8.462.834 26.564-10.769 60.486-16.205 33.923-5.436 71-5.436Zm252.153 50.411q49.026-25.719 97.719-38.065 48.692-12.346 102.026-12.346 37.077 0 71.538 5.231 34.461 5.23 59.948 13.846 4.616 1.923 8.462-.577 3.847-2.501 3.847-7.886v-394.409q0-3.461-1.924-6.154-1.923-2.692-6.539-4.616-33.41-14.076-65.714-20.269-32.305-6.192-69.618-6.192-53.334 0-104.642 15.834-51.308 15.833-95.103 46.269v409.334Zm-25.127 62.562q-8.41 0-15.91-1.975-7.5-1.974-13.602-5.743-45.103-26.359-95.117-40.475-50.013-14.115-102.397-14.115-33.742 0-66.434 7.167-32.693 7.166-64.641 19.55-22.528 10.103-42.751-3.936-20.223-14.038-20.223-39.295v-424.971q0-14.82 7.397-27.449 7.397-12.628 21.423-18.705 38.718-17.615 80.455-25.961 41.737-8.346 84.774-8.346 60.949 0 118.539 16.911 57.59 16.91 108.487 50.628 50.231-33.718 107.41-50.628 57.18-16.911 117.462-16.911 42.809 0 84.455 8.346t80.363 25.961q14.026 6.077 21.629 18.705 7.603 12.629 7.603 27.449v424.971q0 26.006-21.565 39.901-21.564 13.894-44.128 2.561-30.897-12.41-63.141-19.179-32.244-6.769-65.216-6.769-51.953 0-101.438 14.115-49.486 14.116-94.178 40.475-6.103 3.769-13.603 5.743-7.499 1.975-15.653 1.975ZM283.103-494.385Zm274.589-110.743q0-4.882 3.503-10.2 3.503-5.317 8.317-7.158 30.18-12.59 62.724-19.154 32.545-6.565 67.93-6.565 20.432 0 39.441 2.308 19.008 2.308 38.29 6.718 5.59 1.615 10 6.469 4.41 4.853 4.41 11.272 0 10.874-6.807 16.066-6.808 5.192-17.372 2.628-15.738-3.821-32.792-5.667-17.054-1.846-35.336-1.846-30.564 0-59.526 5.782-28.962 5.782-55.5 16.808-12 4.641-19.641-.282-7.641-4.923-7.641-17.179Zm0 218.461q0-5.075 3.503-10.661 3.503-5.586 8.317-7.492 29.41-12.59 62.724-18.756 33.314-6.167 67.93-6.167 20.432 0 39.441 2.308 19.008 2.307 38.29 6.717 5.59 1.616 10 6.469t4.41 11.272q0 10.874-6.807 16.066-6.808 5.192-17.372 2.628-15.738-3.82-32.792-5.666-17.054-1.846-35.336-1.846-30.18 0-58.949 5.795-28.77 5.794-55.308 16.948-12.256 5.026-20.154.026-7.897-5-7.897-17.641Zm0-108.846q0-4.882 3.503-10.199 3.503-5.318 8.317-7.159 30.18-12.59 62.724-19.154 32.545-6.564 67.93-6.564 20.432 0 39.441 2.307 19.008 2.308 38.29 6.718 5.59 1.616 10 6.469t4.41 11.272q0 10.874-6.807 16.066-6.808 5.192-17.372 2.628-15.738-3.82-32.792-5.666-17.054-1.846-35.336-1.846-30.564 0-59.526 5.782-28.962 5.782-55.5 16.807-12 4.641-19.641-.282-7.641-4.922-7.641-17.179Z" />
  </svg>
);

const search = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="40"
    viewBox="0 -960 960 960"
    width="40"
  >
    <path d="M125.129-220.771q-10.679 0-17.903-7.263-7.225-7.263-7.225-17.999 0-10.737 7.225-17.865 7.224-7.128 17.903-7.128h340.898q10.679 0 17.904 7.263 7.224 7.263 7.224 18 0 10.736-7.224 17.864-7.225 7.128-17.904 7.128H125.129Zm0-200.64q-10.679 0-17.903-7.263-7.225-7.263-7.225-18 0-10.736 7.225-17.864 7.224-7.128 17.903-7.128h138.975q10.679 0 17.903 7.263 7.224 7.262 7.224 17.999 0 10.737-7.224 17.865-7.224 7.128-17.903 7.128H125.129Zm0-200.641q-10.679 0-17.903-7.263-7.225-7.263-7.225-18 0-10.736 7.225-17.864 7.224-7.128 17.903-7.128h138.975q10.679 0 17.903 7.263 7.224 7.263 7.224 17.999 0 10.737-7.224 17.865-7.224 7.128-17.903 7.128H125.129Zm433.332 282.435q-75.178 0-128.165-52.538-52.987-52.538-52.987-127.653 0-75.114 53.014-127.653 53.013-52.538 128.229-52.538 75.217 0 128.139 52.538Q739.614-594.922 739.614-520q0 29.333-9.436 57.038t-27.923 50.987l140.052 138.898q7.615 7.103 7.615 17.436t-7.615 17.948q-7.103 7.23-17.436 7.23t-17.948-7.23L666.871-376.591q-23.666 18.102-51.371 27.538-27.705 9.436-57.039 9.436Zm-.156-50.255q54.689 0 92.871-37.787 38.183-37.787 38.183-91.962 0-54.174-38.026-92.148-38.026-37.975-92.715-37.975t-92.871 37.788q-38.183 37.787-38.183 91.961 0 54.175 38.026 92.149 38.026 37.974 92.715 37.974Z" />
  </svg>
);

const info = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    width="24"
  >
    <path d="M480.013-290.001q12.756 0 21.371-8.625 8.615-8.624 8.615-21.374v-170.001q0-12.749-8.628-21.374Q492.742-520 479.987-520q-12.756 0-21.371 8.625-8.615 8.625-8.615 21.374V-320q0 12.75 8.628 21.374 8.629 8.625 21.384 8.625ZM480-588.461q13.731 0 23.019-9.288 9.288-9.288 9.288-23.019 0-13.73-9.288-23.019-9.288-9.288-23.019-9.288-13.731 0-23.019 9.288-9.288 9.289-9.288 23.019 0 13.731 9.288 23.019 9.288 9.288 23.019 9.288Zm.067 488.46q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.92-148.204q29.92-69.369 81.21-120.682 51.291-51.314 120.629-81.247 69.337-29.933 148.173-29.933t148.204 29.92q69.369 29.92 120.682 81.21 51.314 51.291 81.247 120.629 29.933 69.337 29.933 148.173t-29.92 148.204q-29.92 69.369-81.21 120.682-51.291 51.314-120.629 81.247-69.337 29.933-148.173 29.933ZM480-160q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
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

const expandIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="40"
    viewBox="0 -960 960 960"
    width="40"
  >
    <path d="M200-200v-240h66.666v173.334H440V-200H200Zm493.334-320v-173.334H520V-760h240v240h-66.666Z" />
  </svg>
);

const getDate = () => {
  return new Date();
};

const getLocal = () => {
  const ls = JSON.parse(localStorage.getItem("mcdata") || "[]");
  // console.log(`ls is: ${ls}`);
  return ls;
};

// localStorage.setItem("users", JSON.stringify(users));
// users = JSON.parse(localStorage.getItem("users") || "[]");

const setLocal = (data: WordData) => {
  const ls = getLocal();
  // console.log(`this is local (parsed): ${ls}`);
  ls.push(data);
  localStorage.setItem("mcdata", JSON.stringify(ls));
};

const setSampleLocal = (stuff: any) => {
  localStorage.setItem("mcdata", JSON.stringify(stuff));
};

const clearLocal = () => {
  localStorage.setItem("mcdata", JSON.stringify([]));
};

const deleteFromLocal = (word: string) => {
  console.log("Deleting from local...");
  // get from local
  console.log("Getting from local...");
  let ls = getLocal();
  console.log(ls);
  // find from local
  console.log("Finding in array...");
  ls = ls.filter( (obj: { word: string; }) => obj.word !== word);
  // const index = ls.indexOf(word);
  // if (index > -1) {
  //   // only splice array when item is found
  //   ls.splice(index, 1); // 2nd parameter means remove one item only
  console.log(ls);
  // remove from local
  // save new array to local
  localStorage.setItem("mcdata", JSON.stringify(ls));
  // update state and seed
};

const getWordDJour = (d: any) => {
  let random = Math.floor(Math.random() * d.length);
  if (random === 0) {
    random = 1;
  }
  if (d[random].word === "start") {
    random = random + 1;
  }
  if (d[random].word === "end") {
    random = random - 1;
  }
  const word = d[random].word;
  const book = d[random].book;
  const page = d[random].page;
  const date = d[random].date;
  const definition = "Definitions not available yet.";
  return { word, book, page, date, definition };
};

// const tempBooks: string[] = [
//   "The Blue Hotel",
//   "The Open Boat",
//   "Madame Bovary",
//   "Dubliners",
// ];

// const tempDataORIG = [
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

const tempData = [{"book":"The American","word":"start","page":"0","date":"Fri Jun 01 2001 10:10:12 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"physiognomy","page":"2","date":"Mon Jun 05 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"homeopathy","page":"3","date":"Tue Jun 06 2023 10:10:12 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"salubrity","page":"4","date":"Wed Jun 07 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"jocosity","page":"4","date":"Thu Jun 08 2023 10:10:12 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"avidity","page":"4","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"capricious","page":"6","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"droll","page":"6","date":"Fri Jun 02 2023 10:10:12 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"porte-monnaie","page":"7","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"philological","page":"11","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"obeisances","page":"12","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"votive","page":"12","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"Palais Royal","page":"15","date":"Fri Jun 02 2023 10:10:12 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"decoction","page":"17","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"invidious","page":"19","date":"Fri Jun 02 2023 10:10:12 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"pertinacity","page":"19","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"rote","page":"21","date":"Fri Jun 02 2023 10:10:12 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"caprice de prince","page":"24","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"Trouvelle","page":"24","date":"Fri Jun 02 2023 10:10:12 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"inscrutable","page":"25","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"furbelows","page":"27","date":"Fri Jun 02 2023 10:10:12 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"diffident","page":"27","date":"Fri Jun 03 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"importunate","page":"27","date":"Fri Jun 04 2023 10:10:12 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"sacred fire","page":"27","date":"Fri Jun 05 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"pikestaff","page":"39","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"fastidious","page":"40","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"sangfroid","page":"41","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"seraglios","page":"43","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"interlocutor","page":"43","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"propounded","page":"49","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"post-prandial","page":"49","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"demitasse","page":"49","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"trenchant","page":"50","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"epithet","page":"67","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"imprecation","page":"241","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"votary","page":"242","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"fatuous","page":"242","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"truculent","page":"243","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"betook","page":"244","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"perforce","page":"246","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"The American","word":"end","page":"374","date":"Fri October 02 2001 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"Madame Bovary","word":"start","page":"0","date":"Fri Jun 02 2022 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"Madame Bovary","word":"hobnail","page":"1","date":"Fri Jun 02 2022 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"Madame Bovary","word":"profundity","page":"2","date":"Fri Jun 02 2022 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"Madame Bovary","word":"squib","page":"2","date":"Fri Jun 02 2022 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"Madame Bovary","word":"decorously","page":"3","date":"Fri Jun 02 2022 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"Madame Bovary","word":"churlishness","page":"4","date":"Fri Jun 02 2022 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"Madame Bovary","word":"sexton","page":"5","date":"Fri Jun 02 2022 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"Madame Bovary","word":"angelus","page":"5","date":"Fri August 02 2022 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"War and Peace","word":"start","page":"0","date":"Fri May 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"War and Peace","word":"test","page":"0","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"War and Peace","word":"hello","page":"3","date":"Fri Aug 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"","word":"fecundity","page":"","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"},{"book":"","word":"stochastic","page":"","date":"Fri Jun 02 2023 10:10:42 GMT-0700 (Pacific Daylight Time)"}];

const Home = () => {
  const [now, setNow] = useState();
  const [mode, setMode] = useState(0);
  const [data, setData] = useState([]);
  const [wordDJour, setWordDJour] = useState({
    date: "-",
    word: "-",
    book: "-",
    page: 0,
  });
  const [currentBook, setCurrentBook] = useState("");
  const [books, setBooks] = useState<any>([]);
  const [addBookMode, setAddBookMode] = useState(false);
  const [extrasMode, setExtrasMode] = useState(false);
  const [extrasType, setExtrasType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shareToggle, setShareToggle] = useState(false);
  const [fromDJour, setFromDJour] = useState(false);
  const [emptyData, setEmptyData] = useState(false);

  useEffect(() => {
    seedState();
  }, []);

  const seedState = () => {
    setIsLoading(true);
    const now = new Date();
    // setNow(now);
    // setBooks(tempData);
    const ls = getLocal();
    setData(ls);
    setIsLoading(false);
    if (ls.length === 0) {
      setEmptyData(true);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      const newList = makeBookList(data);
      setBooks(newList);
    }
  }, [data]);

  useEffect(() => {
    if (data.length > 1) {
      setIsLoading(true);
      const gotWord = getWordDJour(data);
      const newWord = {
        date: gotWord.date,
        word: gotWord.word,
        book: gotWord.book,
        page: gotWord.page.toString(),
        definition: gotWord.definition,
      };
      setWordDJour(newWord);
      setIsLoading(false);
    }
  }, [data]);

  const readToggleHandler = () => {
    console.log("nothing");
  };

  const makeBookList = (data: WordData[]) => {
    console.log("Making booklist");
    const bookList: string[] = [];
    data.map((d: { book: string }) => {
      !bookList.includes(d.book) && d.book !== ""
        ? bookList.push(d.book)
        : null;
    });
    return bookList;
  };

  const onAddHander = () => {
    setMode(1);
    const date = new Date();
    console.log(date);
  };

  const onChangeHander = () => {
    setMode(2);
    const date = new Date();
    console.log(date);
  };

  const bookSelectionHandler = (bookName: String) => {
    console.log("good!");
    // setCurrentBook(bookName);
  };

  const closeModal = () => {
    setMode(0);
  };

  const addBookHandler = (b: string) => {
    const currentBookList = [...books];
    currentBookList.push(b);
    setBooks(() => currentBookList);
    setCurrentBook(b);
    const ls = getLocal();
    setData(ls);
    // const oldBooks = books;
    // const newBooks = books.push(b);
  };

  const addWordHandler = (b: string, w: string, p: number) => {
    const date = getDate();
    const data = { book: b, word: w, page: p, date: date.toString() };
    setLocal(data);
    setCurrentBook(b);
    closeModal();
    const ls = getLocal();
    setData(ls);
    if (shareToggle === true) {
      console.log(`Sharing ${w}...`);
    } else {
      console.log(`${w} will not be shared.`);
    }
    setTimeout(() => seedState(), 500);
  };

  const deleteWord = (word: string) => {
    deleteFromLocal(word);
    setTimeout(() => seedState(), 500);
    setExtrasMode(false);
  };

  const shareToggleHandler = () => {
    const origSetting = shareToggle;
    setShareToggle((prevValue) => !prevValue);
    console.log("changed to: ", !shareToggle);
  };

  const fullPageHandler = (e: string) => {
    console.log(e);
    setExtrasType(e);
    setExtrasMode(true);
  };

  const closeFullPage = () => {
    setExtrasMode(false);
  };

  const djourHandler = () => {
    setExtrasMode(true);
    setExtrasType("wordlist");
    setFromDJour(true);
  };

  const resetFromDJour = () => {
    setFromDJour(false);
  };

  const setSampleData = () => {
    console.log("setting sample data...");
    setSampleLocal(tempData);
    setEmptyData(false);
    seedState();
  };

  const clearAllData = () => {
    console.log("setting sample data...");
    clearLocal();
    setEmptyData(false);
    seedState();
  };

  return (
    <>
      {emptyData && (
        <div>
          <Emptydatamodal
            setEmptyData={setEmptyData}
            setSampleData={setSampleData}
            clearAllData={clearAllData}
            data={data}
          />
          <div
            className="absolute top-0 left-0 h-screen w-full bg-black/50 z-40"
            onClick={() => setEmptyData(false)}
          ></div>
        </div>
      )}
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
          shareToggleHandler={shareToggleHandler}
          shareToggle={shareToggle}
        />
      )}
      {mode === 2 && (
        <Changemodal
          closeModal={closeModal}
          selectBook={bookSelectionHandler}
          books={books}
          currentBook={currentBook}
          setCurrentBook={setCurrentBook}
          addBookHandler={addBookHandler}
          addWordHandler={addWordHandler}
          setAddBookMode={setAddBookMode}
          addBookMode={addBookMode}
          shareToggleHandler={shareToggleHandler}
          shareToggle={shareToggle}
        />
      )}
      {extrasMode && (
        <FullPage closeFullPage={closeFullPage} extrasType={extrasType}>
          {extrasType === "booklist" && <BookList data={data} />}
          {extrasType === "wordlist" && (
            <WordList
              data={data}
              fromDJour={fromDJour}
              wordDJour={wordDJour}
              resetFromDJour={resetFromDJour}
              readToggle={false}
              readToggleHandler={readToggleHandler}
              deleteWord={deleteWord}
            />
          )}
          {extrasType === "wordquiz" && <WordQuiz data={data} />}
          {extrasType === "analytics" && <Analytics data={data} />}
        </FullPage>
      )}
      <div>
        <main className="p-4 text-center md:max-w-xl md:m-auto">
          <div className="m-auto pt-2">
            <h1
              className="text-2xl text-bold"
              onClick={() => setEmptyData(true)}
            >
              Mots Couture
            </h1>
            <div className="flex flex-row items-baseline justify-center">
              <h2 className="text-small">Words are always in fashion.</h2>
              <p className="ml-1 text-xs underline">Learn more</p>
            </div>
          </div>
          {data.length > 2 && (
            <div className="border-t-2 border-b-2 border-solid border-black/20 bg-none items-center justify-between my-4 p-3 pr-2 text-left w-full">
              {wordDJour.word === "-" && (
                <div className="text-center pb-4">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                  ></svg>
                  <p className="animate-pulse">Loading Data...</p>
                </div>
              )}
              {wordDJour.word !== "-" && (
                <div
                  className="pr-0 flex flex-row items-center justify-center justify-between"
                  onClick={() => djourHandler()}
                >
                  <div>
                    <h2>Word D'Jour</h2>
                    <p className="text-xl">{wordDJour.word}</p>
                    {wordDJour.book !== "" && (
                      <p>{`${wordDJour.book}, p. ${wordDJour.page}`}</p>
                    )}
                  </div>
                  {/* <button className="fill-[#C84B31] w-[32] h-[32] p-1 rounded-full bg-none border-solid border-2 border-[#C84B31]">{search}</button> */}
                  <button className="fill-[#C84B31]">{search}</button>
                </div>
              )}
            </div>
          )}
          {currentBook && (
            <div className="shadow-sm bg-white/80 flex items-center justify-between my-4 p-3 rounded-lg text-left w-full">
              <div className="pr-2">
                <h2>Currently Reading:</h2>
                <p className="text-xs">{currentBook}</p>
              </div>
              <button
                className="text-[#C84B31] font-bold py-1 px-2 rounded-full underline"
                onClick={() => onChangeHander()}
              >
                change
              </button>
            </div>
          )}
          <div
            className="shadow-sm bg-white/80 flex items-center justify-between my-4 p-3 rounded-lg text-left w-full"
            onClick={() => fullPageHandler("booklist")}
          >
            <div className="pr-2">
              <h2>Full Book List:</h2>
              <p className="text-xs">
                All the books, alongside start and completion dates.
              </p>
            </div>
            <button className="fill-[#C84B31]">{arrowForward}</button>
          </div>
          <div
            className="shadow-sm bg-white/80 flex items-center justify-between my-4 p-3 rounded-lg text-left w-full"
            onClick={() => fullPageHandler("wordlist")}
          >
            <div className="pr-2">
              <h2>Full Word List:</h2>
              <p className="text-xs">All the words, for your perusal.</p>
            </div>
            <button className="fill-[#C84B31]">{arrowForward}</button>
          </div>
          <div
            className="shadow-sm bg-white/80 flex items-center justify-between my-4 p-3 rounded-lg text-left w-full"
            onClick={() => fullPageHandler("wordquiz")}
          >
            <div className="pr-2">
              <h2>Word Quiz:</h2>
              <p className="text-xs">Test your memory!</p>
            </div>
            {/* <button className="fill-[#C84B31]">{expandIcon}</button> */}
            <button className="fill-[#C84B31]">{arrowForward}</button>
          </div>
          <div
            className="shadow-sm bg-white/80 flex items-center justify-between my-4 p-3 rounded-lg text-left w-full"
            onClick={() => fullPageHandler("analytics")}
          >
            <div className="pr-2">
              <h2>Analytics:</h2>
              <p className="text-xs">
                Additions, cadence, stats, trends, and predictions.
              </p>
            </div>
            <button className="fill-[#C84B31]">{arrowForward}</button>
          </div>
          {/* <div className="shadow-sm bg-white/80 flex items-center justify-between my-4 p-3 rounded-lg text-left w-full">
              <div className="pr-2">
                <h2>Test:</h2>
                <p className="text-xs">
                  Additions, cadence, stats, trends, and predictions.
                </p>
              </div>
              <button className="fill-[#C84B31]">{arrowForward}</button>
            </div> */}
          <div className="fixed bottom-0 right-0 p-4">
            <span
              className={
                mode === 1
                  ? "drop-shadow-none fill-white/50"
                  : "hover:drop-shadow-sm fill-[#C84B31] hover:fill-[#C84B31]/80"
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

import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
  PromiseLikeOfReactNode,
  SetStateAction,
  useEffect,
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

const Emptydatamodal = (props: any) => {
  return (
    <>
      {props.data.length === 0 && <div className="bg-white drop-shadow:lg flex flex-col absolute p-4 w-3/4 md:w-1/4 m-0 top-32 left-1/2 -translate-x-1/2 rounded-md z-50 md:max-w-xl md:m-auto md:mt-4 lg:mt-6 md:m-0 md:left-1/2 md:-translate-x-1/2 md:rounded-md">
        <h1 className="text-xl text-bold mb-2">Welcome to Mots Couture!</h1>
        <p className="text-s leading-tight text-gray-800">
          You currently have no data, so many features are unavailable or may
          look strange. Would you like to add some sample data?
        </p>
        <button
          className="bg-[#C84B31] hover:bg-[#C84B31]/80 text-white font-bold py-2 px-4 rounded-full w-full mt-4 mb-2 tracking-wide"
          onClick={() => props.setSampleData()}
        >
          Add Sample Data
        </button>
        <button
          className="bg-none hover:bg-[#cccccc]/80 text-gray-600 font-bold py-2 px-4 rounded-full w-full tracking-wide"
          onClick={() => props.setEmptyData(false)}
        >
          Cancel
        </button>
      </div>}
      {props.data.length > 0 && <div className="bg-white drop-shadow:lg flex flex-col absolute p-4 w-3/4 md:w-1/4 m-0 top-32 left-1/2 -translate-x-1/2 rounded-md z-50 md:max-w-xl md:m-auto md:mt-4 lg:mt-6 md:m-0 md:left-1/2 md:-translate-x-1/2 md:rounded-md">
        <h1 className="text-xl text-bold mb-2">Manage your Mots Couture!</h1>
        <p className="text-s leading-tight text-gray-800">
          Clear all current data?
        </p>
        <button
          className="bg-[#C84B31] hover:bg-[#C84B31]/80 text-white font-bold py-2 px-4 rounded-full w-full mt-4 mb-2 tracking-wide"
          onClick={() => props.clearAllData()}
        >
          Clear Data
        </button>
        <button
          className="bg-none hover:bg-[#cccccc]/80 text-gray-600 font-bold py-2 px-4 rounded-full w-full tracking-wide"
          onClick={() => props.setEmptyData(false)}
        >
          Cancel
        </button>
      </div>}
    </>
  );
};

export default Emptydatamodal;

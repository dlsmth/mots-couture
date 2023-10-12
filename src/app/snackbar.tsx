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
  
  const Snackbar = (props: any) => {
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
    const [shareToggle, setShareToggle] = useState(props.toggleSetting);
  
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
            return
        } else {
          props.addBookHandler(bookText);
          setNewBookInput((prevValue) => false);
          props.addWordHandler(bookText, "start", "0");
        }
    };
  
    const addNewWordHandler = () => {
        if (wordText === "" || pageText === null) {
            return;
        } else {
            props.addWordHandler(props.currentBook, wordText, pageText);
        }
    };
  
    useEffect(() => {
      props.shareToggle === true ? console.log('Word will be shared.') : console.log('Word will not be shared.');
    }, []);
  
    // useEffect(() -> {
  
    // }, [shareToggle]);
  
    // const shareToggleHandler = () => {
    //   props.setShareToggle(!props.shareToggle);
    //   console.log('changed to: ', props.shareToggle);
    // };
  
    return (
      <>
        <div className="bg-white drop-shadow:lg flex flex-col absolute p-4 w-full rounded-b-md top-0 z-50 md:max-w-xl md:m-auto md:mt-4 lg:mt-6 md:m-0 md:left-1/2 md:-translate-x-1/2 md:rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl text-bold">Add</p>
            </div>
            <div className="-mr-1" onClick={props.closeModal}>
              {closeIcon}
            </div>
          </div>
          <div className="pr-14 py-2">
            <hr />
          </div>
          <div>
            <form>
              <div className="w-full mb-6">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Book
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    onChange={bookChangeHandler}
                  >
                    <option>Choose a Book</option>
                    <option>+ Add Book</option>
                    {props.books.map((b: string) => (<option key={b}>{b}</option>))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              {newBookInput && (
                <div>
                  <div className="mb-4">
                    <label
                      className="hidden block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="newBook"
                    >
                      Book Title
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="newBook"
                      type="text"
                      placeholder="Book Title"
                      onChange={handleBookText}
                      value={bookText}
                    />
                  </div>
                </div>
              )}
              {!newBookInput && (
                <div className="flex flex-row -mx-3 mb-2">
                  <div className="basis-2/3 w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-city"
                    >
                      Word
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="Word"
                      onChange={handleWordText}
                      value={wordText}
                    />
                  </div>
                  <div className="basis-1/3 w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-zip"
                    >
                      Page
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-zip"
                      type="number"
                      placeholder="128"
                      onChange={handlePageText}
                      value={pageText}
                    />
                  </div>
                </div>
              )}
            </form>
            {!newBookInput && (
              <><div className="flex items-center justify-start w-full mb-6">
    
              <label 
                htmlFor="shareToggle"
                className="flex items-center cursor-pointer"
              >
                <div className="relative">
                  <input id="shareToggle" type="checkbox" className="sr-only" onChange={props.shareToggleHandler} checked={props.shareToggle}/>
                  <div className="w-10 h-4 bg-neutral-300 rounded-full shadow-inner"></div>
                  <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                </div>
                <div className="ml-3 text-gray-600 font-medium">
                  Add to shared word list
                </div>
              </label>
              
            </div>
              <button
                className="bg-[#C84B31] hover:bg-[#C84B31]/80 text-white font-bold py-2 px-4 rounded-full w-full"
                onClick={() => addNewWordHandler()}
              >
                Add Word
              </button>
              </>
            )}
            {newBookInput && (
              <button
                className="bg-[#C84B31] hover:bg-[#C84B31]/80 text-white font-bold py-2 px-4 rounded-full w-full"
                onClick={() => addNewBookHandler()}
              >
                Add Book
              </button>
            )}
          </div>
        </div>
        <div
          className="absolute top-0 left-0 h-screen w-full bg-black/30 z-40"
          onClick={props.closeModal}
        ></div>
      </>
    );
  };
  
  export default Snackbar;
  
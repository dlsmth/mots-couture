import { useEffect, useState } from "react";

interface WordData {
  book: string;
  word: string;
  page: number;
  date: string;
}

interface BookListData {
  book: string;
  words: number;
  startDate: string;
  endDate: string;
}

const sortList = ["A - Z", "Z - A", "Newest", "Oldest", "Longest", "Shortest"];

const startIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="40"
    viewBox="0 -960 960 960"
    width="40"
  >
    <path d="M786.667-386.667q-29.724 0-53.696-17-23.971-17-33.637-43H113.333q-14.166 0-23.75-9.617Q80-465.901 80-480.117q0-14.216 9.583-23.716 9.584-9.5 23.75-9.5h586.001q9.666-26 33.637-43 23.972-17 53.696-17 39.2 0 66.266 27.094Q880-519.145 880-479.906t-27.067 66.239q-27.066 27-66.266 27Z" />
  </svg>
);

const startEndIcon = (
  <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 40 40">
    <path
      d="M36.7,20C36.7,20,36.7,20,36.7,20c0-1.1-0.4-2-1.1-2.8s-1.7-1.1-2.8-1.1c-0.8,0-1.6,0.2-2.2,0.7s-1.1,1.1-1.4,1.8H10.9
c-0.3-0.7-0.7-1.3-1.4-1.8S8,16.1,7.2,16.1c-1.1,0-2,0.4-2.8,1.1C3.7,18,3.3,18.9,3.3,20c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0
c0,1.1,0.4,2,1.1,2.8s1.7,1.1,2.8,1.1c0.8,0,1.6-0.2,2.2-0.7s1.1-1.1,1.4-1.8h18.3c0.3,0.7,0.7,1.3,1.4,1.8s1.4,0.7,2.2,0.7
c1.1,0,2-0.4,2.8-1.1C36.3,22,36.7,21.1,36.7,20C36.7,20,36.7,20,36.7,20C36.7,20,36.7,20,36.7,20z"
    />
  </svg>
);

const BookList = (props: any) => {
  const [books, setBooks] = useState<any>([]);
  const [sortType, setSortType] = useState(sortList[0]);
  const [bookDetailMode, setBookDetailMode] = useState<string | null>(null);
  const [bookDeleteMode, setBookDeleteMode] = useState(false);

  useEffect(() => {
    console.log("Using Effect");
    const bl = makeBookList(props.data);
    console.log(bl);
    setBooks(bl);
  }, []);

  // const makeBookList = (data: WordData[]) => {
  //   console.log("Making booklist");
  //   const bookList: string[] = [];
  //   data.map((d: { book: string }) => {
  //     !bookList.includes(d.book) ? bookList.push(d.book) : null
  //   });
  //   return bookList;
  // };

  const makeBookList = (data: WordData[]) => {
    const wordCount = 0;
    console.log("Making booklist");
    console.log("data: ", data);
    const bookList: BookListData[] = [];
    data.map(
      (d: { book: string; date: string; page: number }, index: number) => {
        if (d.book === "") {
          return;
        }
        var startDate = "";
        var endDate = "in progress";
        console.log("Booklist data: ", bookList);
        const i = bookList.findIndex((b) => b.book === d.book);
        console.log("what is i?", i);
        if (i !== -1) {
          console.log("found a match!");
          console.log(data[index].word, index);
          if (data[index].word === "end") {
            endDate = data[index].date;
            var endMonth = new Date(data[index].date).getMonth();
            var endYear = new Date(data[index].date).getFullYear();
            endDate = endMonth + "/" + endYear;
            console.log("found an end!");
            const n = bookList.findIndex((b) => b.book === d.book);
            console.log(bookList);
            bookList[n] = {
              book: d.book,
              words: wordCount,
              startDate: bookList[n].startDate,
              endDate: endDate,
            };
            console.log(bookList);
          }
        } else {
          var startDate = "";
          var startMonth = new Date(d.date).getMonth();
          var startYear = new Date(d.date).getFullYear();
          startDate = startMonth + "/" + startYear;
          console.log("Start Date: ", startDate);
          bookList.push({ book: d.book, words: wordCount, startDate, endDate });
        }
        // !bookList.includes(d.book) ? bookList.push({ book: d.book, startDate, endDate }) : null
      }
    );
    return bookList;
  };

  const sortChangeHandler = (e: { target: { value: string } }) => {
    console.log(e.target.value);
    setSortType(e.target.value);
    // setSortType(e.target.value);
  };

  const showWordDetail = (word: string) => {
    console.log(word);
  };

  const bookDeleteHandler = () => {
    console.log(`Deleting ${bookDetailMode}...`);
    closeBookDetail();
  };

  const clickBookHandler = (book: string) => {
    setBookDetailMode(book);
    console.log();
  };

  const closeBookDetail = () => {
    console.log(`Closing book detail...`);
    setBookDeleteMode(false);
    setBookDetailMode(null);
  };

  return (
    <><div
    className={`bg-[#191919] absolute z-1000 p-4 translate-y-0 left-0 w-full bottom-0 text-white rounded-t-lg md:rounded md:opacity-0 transition-all duration-300 ${
      bookDetailMode
        ? "translate-y-0 md:translate-y-0 md:opacity-100"
        : "translate-y-full md:translate-y-0 md:opacity-0"
    }`}
  >
    <div className="grid gap-1 grid-cols-1">
      <p className="text-xl">{bookDetailMode}</p>
      <p className="text-sm">from start to finish</p>
      <p className="text-sm text-white opacity-80">
        {/* {`Definition: ${getDef()}`} */}
        {"No definitions yet."}
      </p>
      {bookDeleteMode && (
        <div className="flex gap-4 mt-4">
          <button
            className="w-full text-center rounded h-10 bg-[#ff000095]"
            onClick={() => bookDeleteHandler()}
          >
            Confirm Delete
          </button>
        </div>
      )}
      {!bookDeleteMode && (
        <div className="flex gap-4 mt-4">
          <button
            className="flex-none w-14 rounded h-10 bg-[#ff000095]"
            onClick={() => setBookDeleteMode(true)}
          >
            Delete
          </button>
          <button
            className="flex-1 bg-none rounded border-solid border-2 border-[#ffffff80]"
            onClick={() => closeBookDetail()}
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
        {books.map((b: any) => {
          return (
            <li className="pb-1 hover:bg-white" key={b.book} onClick={() => clickBookHandler(b.book)}>
              <div className="flex justify-between">
                <p>{b.book}</p>
                <p>{`${b.startDate} - ${b.endDate}`}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
    </>
  );
};

export default BookList;

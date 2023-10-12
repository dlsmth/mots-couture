interface WordData {
  book: string;
  word: string;
  page: number;
  date: string;
}

import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React, { PureComponent } from "react";

const tempData = [
  { name: "Page A", uv: 300, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 600, pv: 2400, amt: 2400 },
  { name: "Page C", uv: 100, pv: 2400, amt: 2400 },
  { name: "Page D", uv: 800, pv: 2400, amt: 2400 },
  { name: "Page E", uv: 900, pv: 2400, amt: 2400 },
];

const Analytics = (props: any) => {
  const [summaryData, setSummaryData] = useState({ words: 0, books: 0 });
  const [wordsPerBookData, setWordsPerBookData] = useState<
    { book: string; words: number }[]
  >([]);
  const [readingVelocity, setReadingVelocity] = useState<
    {
      book: string;
      startDate: string;
      lastEntryDate: string;
      endDate: string;
      firstPage: number;
      lastPage: number;
      totalDays: number;
      totalPages: number;
      velocityIndex: number;
    }[]
  >([]);

  // useEffect(() => {
  //     transformData();
  // }, []);

  // const transformData: () => void() => {
  //     console.log(props.data);
  // };

  useEffect(() => {
    getSummary();
  }, [props.data]);

  useEffect(() => {
    console.log("SUMMARY DATA", summaryData);
  }, [summaryData]);

  const getSummary = () => {
    console.log("collecting words...");
    const wordList: string[] = [];
    props.data.map((d: { word: string }) => {
      !wordList.includes(d.word) && d.word !== "start" && d.word !== "end"
        ? wordList.push(d.word)
        : null;
    });
    console.log("collecting books...");
    const bookList: string[] = [];
    props.data.map((d: { book: string }) => {
      !bookList.includes(d.book) && d.book !== ""
        ? bookList.push(d.book)
        : null;
    });
    const totalSummary = { words: wordList.length, books: bookList.length };
    setSummaryData(totalSummary);
    calcBookWordCount(props.data);
    calcReadingVelocity(props.data);
  };

  const makeBookList = (data: WordData[]) => {
    // console.log("Making booklist");
    const bookList: string[] = [];
    data.map((d: { book: string }) => {
      !bookList.includes(d.book) ? bookList.push(d.book) : null;
    });
    return bookList;
  };

  const calcBookWordCount = (data: WordData[]) => {
    // console.log("Calculating words per book...");
    const bookWordCount: { book: string; words: number }[] = [];
    data.map((d: { book: string }) => {
      let foundIndex = bookWordCount.findIndex(
        (b: { book: string }) => b.book == d.book.substring(0, 11) + "..."
      );
      if (foundIndex !== -1) {
        // console.log("found a match");
        // console.log();
        // let foundIndex = bookWordCount.findIndex((b: { bookName: string; }) => b.bookName == d.book);
        let foundData = bookWordCount[foundIndex];
        bookWordCount[foundIndex] = {
          book: foundData.book,
          words: foundData.words + 1,
        };
        // originalData.map(x => (x.id === id ? { ...x, updatedField: 1 } : x));
      } else {
        bookWordCount.push({ book: d.book.substring(0, 11) + "...", words: 0 });
      }
      // !bookWordCount.includes(d.book) ? bookWordCount.push({bookName: d.book, bookCount: counter + 1}) : null;
      // bookWordCount.push({bookName: d.book, wordCount: counter + 1});
    });
    // console.log("final bookWordCount", bookWordCount);
    const filteredData1 = bookWordCount.filter(
      (entry) => entry.book.length !== 0
    );
    const filteredData2: { book: string; words: number }[] =
      filteredData1.filter((entry) => entry.words !== 0);
    const filteredData3: { book: string; words: number }[] =
      filteredData2.filter((entry) => entry.book !== "...");
    filteredData3.sort((a, b) => Number(b.words) - Number(a.words));
    const slicedArray = filteredData3.slice(0, 4);
    // console.log('finalData', slicedArray);
    setWordsPerBookData(slicedArray);
    // return bookWordCount;
  };

  const calcReadingVelocity = (data: WordData[]) => {
    // console.log('data', data);
    const bookBreakdown: {
      book: string;
      startDate: string;
      lastEntryDate: string;
      endDate: string;
      firstPage: number;
      lastPage: number;
      totalDays: number;
      totalPages: number;
      velocityIndex: number;
    }[] = [];
    data.map((d) => {
      if (d.word === "start") {
        bookBreakdown.push({
          book: d.book,
          startDate: d.date,
          lastEntryDate: "incomplete",
          endDate: "incomplete",
          firstPage: 0,
          lastPage: 0,
          totalDays: 0,
          totalPages: 0,
          velocityIndex: 0,
        });
      } else if (d.word === "end") {
        let foundBook = bookBreakdown.findIndex(
          (b: { book: string }) => b.book == d.book
        );
        if (foundBook !== -1) {
          // console.log("found an end");
          // console.log(bookBreakdown[foundBook]);
          bookBreakdown[foundBook].lastEntryDate = d.date;
          bookBreakdown[foundBook].endDate = d.date;
        }
      } else {
        let foundBook = bookBreakdown.findIndex(
          (b: { book: string }) => b.book == d.book
        );
        if (foundBook !== -1) {
          // console.log("found neither a start nor an end.");
          // console.log(bookBreakdown[foundBook]);
          // bookBreakdown[foundBook].endDate = d.date;
          bookBreakdown[foundBook].lastEntryDate = d.date;
          bookBreakdown[foundBook].lastPage = +d.page;
        }
        // console.log('just returning');
      }

      // bookBreakdown.push({ book: d.book, startDate: d.date, lastEntryDate: 'wait', endDate: 'wait', firstPage: 0, lastPage: 0 });

      // console.log('bookBreakdown', bookBreakdown);

      bookBreakdown.forEach((d) => {
        if (d.lastPage === 0) {
          return;
        }
        const diffInMs =
          new Date(d.lastEntryDate).valueOf() - new Date(d.startDate).valueOf();
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        const totalPages = d.lastPage;

        const velocityIndex1 = diffInDays / totalPages;
        console.log("vi1", velocityIndex1);

        const velocityIndex2 = totalPages / diffInDays;
        console.log("vi2", velocityIndex2);

        let foundBook = bookBreakdown.findIndex(
          (b: { book: string }) => b.book == d.book
        );
        if (foundBook !== -1) {
          bookBreakdown[foundBook].totalDays = diffInDays;
          bookBreakdown[foundBook].totalPages = d.lastPage;
          bookBreakdown[foundBook].velocityIndex =
            Math.floor(velocityIndex2 * 100) / 100;
        }

        // console.log(d.book);
        // console.log('diffInDays', diffInDays);
      });
      console.log(bookBreakdown);
      setReadingVelocity(bookBreakdown);
    });

    // const finalData: any = [{ book: 'The American', startDate: '01/01/2000', lastEntryDate: '06/14/2001', endDate: '06/15/2001' }, { book: 'Madame Bovary', startDate: '01/01/2021', lastEntryDate: '04/15/2022', endDate: '' }, { book: 'War and Peace', startDate: '01/01/2023', lastEntryDate: '05/15/2023', endDate: '' }];

    console.log("bookBreakdown", bookBreakdown);
    // console.log('finalVelocityData', finalData);

    setReadingVelocity(bookBreakdown);
  };

  const renderLineChart = (
    <LineChart
      width={300}
      height={300}
      data={tempData}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  );

  return (
    <div className="mb-4">
      {/* <h1 className="mt-4 text-center">In progress...</h1> */}
      <div className="border-solid border-2 border-gray-300 py-3 px-4 rounded-md my-4">
        <h2 className="text-xl pb-0 text-center">Summary</h2>
        <div className="grid grid-cols-3 items-center justify-items-center">
          <div className="grid gap-2 justify-items-center">
            <p className="text-6xl text-[#2D4263]">{summaryData.words}</p>
            <p>words</p>
          </div>
          <div className="grid gap-2 justify-items-center">
            <p className="text-5xl text-black/10">|</p>
          </div>
          <div className="grid gap-2 justify-items-center">
            <p className="text-6xl text-[#2D4263]">{summaryData.books}</p>
            <p>books</p>
          </div>
        </div>
        {/* <p>{`${summaryData.words} Words`}</p>
        <p>{`from ${summaryData.books} Books`}</p> */}
      </div>
      <div
        className={`border-solid border-2 border-gray-300 py-3 px-4 rounded-md my-4 w-full ${
          wordsPerBookData.length === 0 ? "h-24" : "h-72"
        }`}
      >
        <h2 className="text-xl pb-2 text-center">Top Words per Book</h2>
        {wordsPerBookData.length === 0 && (
          <p className="text text-center text-black/80 pt-2">
            No data available.
          </p>
        )}
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            // width={500}
            // height={500}
            data={wordsPerBookData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
            barGap={0}
            barCategoryGap={0}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
              dataKey="book"
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip cursor={{ fill: "#ffffff" }} />
            {/* <Legend /> */}
            <Bar
              radius={[10, 10, 0, 0]}
              dataKey="words"
              barSize={40}
              fill="#C84B31"
            >
              <LabelList
                dataKey="words"
                position="insideTop"
                style={{
                  textAnchor: "middle",
                  fontSize: "100%",
                  fill: "rgba(255, 255, 255, 1)",
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* <div className="border-solid border-2 border-gray-300 py-3 px-4 rounded-md my-4 w-full h-72">
        <h2 className="text-xl pb-2 text-center">Most Words per Book</h2>
        <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
          <BarChart
            width={500}
            height={500}
            data={wordsPerBookData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="book" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip />
            <Legend />
            <Bar radius={[10, 0, 0, 10]} dataKey="words" barSize={60} fill="#2D4263"><LabelList dataKey="book" position="center" angle={-90} style={{ textAnchor: 'middle', fontSize: '100%', fill: 'rgba(255, 255, 255, 1)' }} /></Bar>
          </BarChart>
        </ResponsiveContainer>
      </div> */}
      <div className="border-solid border-2 border-gray-300 py-3 px-4 rounded-md my-4 text-center">
        <h2 className="text-xl pb-0">Reading Velocity</h2>
        <p className="text-center text-sm text-black/80 pb-4">pages per day</p>
        {readingVelocity.length > 0 && (
          <div>
            {readingVelocity.map((b) => (
              <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-1 gap-4 items-center">
                <div className="col-span-2">
                  <li className="list-none text-left text-lg flex items-baseline"><p className="text-sm mr-1">{b.book}:</p><p className={`text-xl ${b.velocityIndex < .5 ? 'text-yellow-600' : 'text-green-600'}`}>{b.velocityIndex}</p></li>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  {b.velocityIndex < .5 && <div
                    className="bg-yellow-600 h-2.5 rounded-full"
                    style={{ ["width" as any]: b.velocityIndex * 100 }}
                  ></div>}
                  {b.velocityIndex > 1 && <div
                    className="bg-green-600 h-2.5 rounded-full w-full"
                    
                  ></div>}
                </div>
  
              </div>
            ))}
          </div>
        )}
        {/* <p>
          For each book, we have start page (0) with date and also end page
          (end) with date, so this will be something like total pages / total
          days. A <em>simple bar chart</em> can display velocity differences.
        </p> */}
      </div>
      <div className="border-solid border-2 border-gray-300 py-3 px-4 rounded-md my-4 text-center">
        <h2 className="text-xl pb-2">Word Insights</h2>
        <p>
          Coming soon...
        </p>
        {/* <p>
          I'm not sure how this will be displayed, but perhaps average word
          length by book could be interesting. Also longest and shortest.
        </p> */}
      </div>
      <div className="border-solid border-2 border-gray-300 py-3 px-4 rounded-md my-4 text-center">
        <h2 className="text-xl pb-2">Word Cloud</h2>
        <p>Coming soon...</p>
      </div>
    </div>
  );
};

export default Analytics;

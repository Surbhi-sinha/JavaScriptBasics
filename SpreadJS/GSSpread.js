import React, { useEffect, useRef, useCallback, useState } from "react";
import "../../assets/css/calcengine/calc.css"
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css";
import GC from "@grapecity/spread-sheets";
import Cookies from "js-cookie";
// import { useAuthContext } from '../hooks/useAuthContext';
import {
  SpreadSheets,
  Worksheet,
  Column,
} from "@grapecity/spread-sheets-react";
import { baseUrl } from "../../config";
import { FaCalculator } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
window.GC = GC;

const GSspreadsheet = React.forwardRef(({ quoteIds, surveyIds, toasts, sectionsData, questionsData, showCalcs, calcDatas, quoteName }, ref) => {
  const [quoteId, setQuoteId] = useState("");
  const [quoteKey, setQuoteKey] = useState("");
  const [surveyKey, setSurveyKey] = useState("");
  const [sheetNames, setSheetNames] = useState([]);
  const [sheetRefresh, setSheetRefresh] = useState(false);
  const [toastShown, setToastShown] = useState(false);
  const [sectionData, setSectionData] = useState([]);
  const [questionData, setQuestionData] = useState([]);


  useEffect(() => {
    setQuoteKey(quoteIds);
    setSectionData(sectionsData);
    setQuestionData(questionsData);
  }, [quoteIds, sectionsData, questionsData]);

  let hostStyle = {
    width: "100vw-69px",
    height: "calc(100vh - 190px)",
    border: '1px solid #ccc',
  };
  const user = JSON.parse(localStorage.getItem("user"));

  const { token } = user;

  const spreadRef = useRef(null);

  // QUESTION_INDEX CUSTOM FUNCTION
  const QuestionIndexFunction = function () {
    this.typeName = "QUESTION_INDEX";
  };
  QuestionIndexFunction.prototype =
    new GC.Spread.CalcEngine.Functions.AsyncFunction("QUESTION_INDEX", 1, 1, {
      name: "QUESTION_INDEX",
      description: "Returns The Question From Value By Index",
    });

  QuestionIndexFunction.prototype.evaluate = (context, position) => {
    const questionIndex = new Map();

    // Populate questionIndex map with section IDs and index numbers
    sectionData.forEach((section, index) => {
      questionIndex.set(section._id, index + 1);
    });

    const sectionQuestions = {};
    questionData.forEach(question => {
      if (!sectionQuestions[question.surveySectionId]) {
        sectionQuestions[question.surveySectionId] = [];
      }
      sectionQuestions[question.surveySectionId].push(question);
    });

    Object.entries(sectionQuestions).forEach(([sectionId, questionsInSection]) => {
      const sectionIndex = questionIndex.get(sectionId);

      questionsInSection.forEach((question, index) => {
        const questionNumber = index + 1;
        question.questionNumberInSection = `${sectionIndex}.${questionNumber}`;
      });
    });

    const filteredData = questionData.filter(item => item.questionPosition === position);

    if (filteredData.length > 0) {
      const sortedData = filteredData.sort((a, b) => {
        const sectionIndexA = questionIndex.get(a.surveySectionId);
        const sectionIndexB = questionIndex.get(b.surveySectionId);
        if (sectionIndexA === sectionIndexB) {
          return a.questionPosition - b.questionPosition;
        }
        return sectionIndexA - sectionIndexB;
      });
      context.setAsyncResult(
        sortedData.map(item => `${item.questionNumberInSection} ${item.questionName}`).join('\n')
      );
      setSurveyKey(sortedData[0].guidedId);
    } else {
      context.setAsyncResult(``);
    }
  };


  // GET_QUESTION_ID CUSTOM FUNCTION

  const GetQuestionIdFunction = function () {
    this.typeName = "GET_QUESTION_ID";
  };

  GetQuestionIdFunction.prototype =
    new GC.Spread.CalcEngine.Functions.AsyncFunction("GET_QUESTION_ID", 1, 1, {
      name: "GET_QUESTION_ID",
      description: "Returns Question ID From Value By Index",
    });

  GetQuestionIdFunction.prototype.evaluate = (context, position) => {
    const filteredData = questionData.filter(item => item.questionPosition === position);
    if (filteredData.length > 0) {
      // const sortedData = filteredData.sort((a, b) => a.questionIndex - b.questionIndex);
      context.setAsyncResult(filteredData[0].surveyQuestionId ? filteredData[0].surveyQuestionId : filteredData[0]._id);
    } else {
      context.setAsyncResult(``);
    }
  };

  QuestionIndexFunction.prototype.defaultValue = () => {
    return "Loading...";
  };

  const AnswerByIdFunction = function () {
    this.typeName = "ANSWER_BY_ID";
  };

  AnswerByIdFunction.prototype =
    new GC.Spread.CalcEngine.Functions.AsyncFunction("ANSWER_BY_ID", 1, 1, {
      name: "ANSWER_BY_ID",
      description: "Returns Answer From Question ID",
    });

  AnswerByIdFunction.prototype.evaluate = async (context, questionKey) => {
    const quesKey = typeof questionKey === 'string' ? await questionKey.trim() : questionKey;
    const filteredData = questionData.filter(item => item.surveyQuestionId === quesKey || item._id === quesKey);
    if (filteredData.length > 0 && Object.keys(filteredData[0].answer).length > 0) {
      await context.setAsyncResult(filteredData[0].answer);
    } else {
      await context.setAsyncResult(0);
    }
  };

  const QuoteNameFunction = function () {
    this.typeName = "QUOTE";
  };

  QuoteNameFunction.prototype =
    new GC.Spread.CalcEngine.Functions.AsyncFunction("QUOTE", 1, 1, {
      name: "QUOTE",
      description: "The function returns a quote field value",
    });

  QuoteNameFunction.prototype.evaluate = (context, displayname) => {
    if (displayname === "display") {
      console.log("Executed");
      context.setAsyncResult(quoteName);
    } else {
      context.setAsyncResult('');
    }
  };

  const updateCustomFunctions = () => {
    spreadRef.current.addCustomFunction(new QuestionIndexFunction());
    spreadRef.current.addCustomFunction(new GetQuestionIdFunction());
    spreadRef.current.addCustomFunction(new AnswerByIdFunction());
    spreadRef.current.addCustomFunction(new QuoteNameFunction());
  };

  const initSpread = useCallback((spread) => {
    spreadRef.current = spread;
    var sheet = spread.getSheet(0);
    addCustomMenuItems(spreadRef.current);

    const sheetCount = spread.getSheetCount();
    const sheetInfo = [];

    for (let i = 0; i < sheetCount; i++) {
      const sheet = spread.getSheet(i);
      const sheetName = sheet.name();
      const cellRange = getSheetCellRange(sheet);
      sheetInfo.push({ sheetName, cellRange });
    }

    setSheetNames(sheetInfo);
    Cookies.set("sheetNames", JSON.stringify(sheetInfo));

    if (spread) {
      if (sheetCount > 0) {
        // console.log("Spreadsheet initialized successfully.");

        var activeSheet = spread.getActiveSheet();

        if (activeSheet) {
          spread.options.allowExtendPasteRange = true;

          spread.bind(
            GC.Spread.Sheets.Events.ClipboardPasting,
            function (sender, args) {
              // console.log("Clipboard Pasting Event");
              // console.log(args);
            }
          );

          const questionIndex = new QuestionIndexFunction();
          const getQuestionID = new GetQuestionIdFunction();
          const ansById = new AnswerByIdFunction();
          const quoteFunctions = new QuoteNameFunction();

          spreadRef.current.addCustomFunction(questionIndex);
          spreadRef.current.addCustomFunction(getQuestionID);
          spreadRef.current.addCustomFunction(ansById);
          spreadRef.current.addCustomFunction(quoteFunctions);
        } else {
          // console.log("ActiveSheet is null. Unable to get row count.");
        }
      } else {
        // console.log("No sheets found in the workbook.");
      }
    } else {
      // console.log("Spread object is null.");
    }
  }, []);

  const oldFun = GC.Spread.Sheets.getTypeFromString;
  GC.Spread.Sheets.getTypeFromString = function (typeString) {
    switch (typeString) {
      case "QUESTION_INDEX":
        return QuestionIndexFunction;

      case "GET_QUESTION_ID":
        return GetQuestionIdFunction;

      case "ANSWER_BY_ID":
        return AnswerByIdFunction;

      case "QUOTE":
        return QuoteNameFunction;
      default:
        return oldFun.apply(this, arguments);
    }
  };

  const getSheetCellRange = (sheet) => {
    const startRow = 1;
    const endRow = sheet.getRowCount();
    const startColumn = 1;
    const endColumn = sheet.getColumnCount();

    return `${getColumnName(startColumn)}${startRow}:${getColumnName(
      endColumn
    )}${endRow}`;
  };

  const getColumnName = (column) => {
    let columnName = "";
    while (column > 0) {
      const remainder = (column - 1) % 26;
      columnName = String.fromCharCode(65 + remainder) + columnName;
      column = Math.floor((column - 1) / 26);
    }
    return columnName;
  };

  const addCalcData = async (callBack = undefined, isFromHandleSaveClick) => {
    // let calc = spreadRef.current;
    let calcData = spreadRef.current.toJSON();
    // getCalcData();
    try {
      const response = await fetch(
        `${baseUrl}/api/spreadgs/displaygs/data/addcalcgs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            spreadsheetData: calcData,
            quoteId: quoteIds,
            surveyId: surveyIds,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error saving data: ${response.status}`);
      }

      const result = await response.json();
      if (callBack) {
        callBack(spreadRef.current);
      }
      if (!toastShown && isFromHandleSaveClick) {
        toast.success("Calc Saved Successfully", {
          icon: (
            <span style={{ color: "rgb(74, 146, 59) " }}>
              <FaCalculator />
            </span>
          ),
          className: "custom-toast_add",
          onClose: () => setToastShown(false),
        });

        setToastShown(true);
      }
      console.log("Response from saving data: ", result);
      // window.location.reload();
      // await fetchData();
      // await fetchAnsById();
      // if(result){
      //   await getCalcData();
      // }
      // await getCalcData();
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  };
  
  // if (!calcDatas || !calcDatas.data) {
  //   console.log("DATA NOT FOUND");
    // spreadRef.current.fromJSON({});
    // addCustomMenuItems(spreadRef.current);
    // updateCustomFunctions();
  //   return;
  // }
  const getCalcData = async () => {
    try {

      const dataFromGS = await calcDatas.data; // this is coming from the database

      if (dataFromGS) {
        const parsedData = await JSON.parse(dataFromGS); // converting the data in string format to the json format.
        console.log("Parsed Spreadsheet Data: ", parsedData); /// giving correct data

      //   {

      //     "value": 250.73,
      
      //     "formula": "ROUND(IF(H5,(SUMIF(Materials!A:A,E5,Materials!AM:AM)+SUMIF('PS SLA'!B:B,E5,'PS SLA'!O:O))/H5/I5,0),2)"
      
      // }
      
        await spreadRef.current.fromJSON(parsedData);
        updateCustomFunctions();
        addCustomMenuItems(spreadRef.current);

      } else {
        console.log("DATA NOT FOUND1");
        return;
      }

    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
    // initSpread(calc); 
  };

  useEffect(() => {
    getCalcData();
  }, [showCalcs]);

  React.useImperativeHandle(ref, () => ({
    addCalcData,
    getCalcData,
  }));

  return (
    <>
      <div className="sample-tutorial">
        <div className="sample-spreadsheets">
          <SpreadSheets workbookInitialized={initSpread} hostStyle={hostStyle}>
            {/* <Worksheet /> */}
          </SpreadSheets>
        </div>
      </div>
    </>
  );
});

export default GSspreadsheet;
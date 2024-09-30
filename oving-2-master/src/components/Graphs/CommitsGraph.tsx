import React, { useEffect, useRef, useState } from "react"
import { Bar } from "react-chartjs-2";
import Select from "react-select";
import axios, { AxiosResponse } from "axios";
import "./CommitsGraph.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

// Options for the dropdown
const options = [
  {value: "year", label: "Years"},
  {value: "month", label: "Months"},
  {value: "day", label: "Days"},
];

// Removes duplicate numbers from list, and returns a list with unique n
function removeDuplicates(arr:number[]) {
  var unique: number[] = [];
  for(let i=0; i < arr.length; i++){ 
    if(unique.indexOf(arr[i]) === -1) { 
      unique.push(arr[i]); 
    } 
  }
  return unique;
}

// Function that takes in a number and returns the corresponding month
// Taken from https://bobbyhadz.com/blog/javascript-convert-month-number-to-name
function toMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
}

// Getting the right url from the input 
const interpretUrl = (url: string) => {
  // Input on form example: https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-55/oving-2
  let splitUrl: string[];
  let prefix: string;
  let tempString: string;

  // Check if https/https, will use that as prefix in returned string.
  if (url.includes("https://") || url.includes("http://")) {
    splitUrl = url.split("//", 2)
    prefix = splitUrl[0];
    tempString = splitUrl[1];
  } else {
      tempString = url;
      prefix = "none"
  }
  let gitlabInstance: string;
  let gitlabApiUrl: string = "/api/v4/projects/"
  let projectRepo: string;
  let urlSplit2 = tempString.split("/")
  gitlabInstance = urlSplit2[0]
  urlSplit2.shift()
  projectRepo = urlSplit2.join("%2F")

  let newUrl: string;
  let apiEnding: string = "/repository/commits?&per_page=50000"
  if (prefix !== "none") {
    newUrl = prefix+"//" + gitlabInstance + gitlabApiUrl + projectRepo + apiEnding
  } else {
    newUrl = gitlabInstance + gitlabApiUrl + projectRepo + apiEnding
  }
  return newUrl;
}

function CommitsGraph(props: { url: string; api: string}) {
  const [results, setResults] = useState([""]);

  // CommitsGraph data and labels
  const [CommitData, setCommitData] = useState([0]); 
  const [CommitLabels, setCommitLabels] = useState([""]);


  // CommitsGraph handleChange function
  const handleChange = async (selectedOptions: any) => {
    getYears(results);
    getMonths(results);
    getDays(results);
    if (selectedOptions.value === "year") {
      setCommitLabels(yearLabel);
      setCommitData(yearData);
    } 
    if (selectedOptions.value === "month") {
      setCommitLabels(monthLabel);
      setCommitData(monthData);
    }
    if (selectedOptions.value === "day") {
      setCommitLabels(dayLabel);
      setCommitData(dayData);
    }
  
  }
  
 
  // The lists to be updated and sent to the graph
  const yearLabel: string[] = [];
  const yearData: number[] = [];

  // Data-processing for years
  function getYears(dates: string[]) {

    //Clearing the yearLabel- and the yearData-list
    yearLabel.splice(0,yearLabel.length);
    yearData.splice(0,yearLabel.length);
    
    //Making a list with only the years from the API response
    let years: Array<number> = [];
    dates.forEach(element => {
      years.push(parseInt(element.slice(0,4)));
    });
    
    // Removing duplicates and passing the unique years to yearLabel as strings
    removeDuplicates(years).forEach((year) => {
      yearLabel.push(year.toString());
    })

    // Adding up the number of commits per year and pushing the values to yearData
    yearLabel.forEach((label) => {
      let x = 0;
      years.forEach((element) => {
        if (label === element.toString()){
          x++;
        }
      })
      yearData.push(x); 
     })
    }


  // The lists to be updated and sent to the graph
  const monthLabel: string[] = [];
  const monthData: number[]= [];

  // Data-processing for months
  function getMonths(dates: string[]) {
    //Clearing the monthLabel- and the monthData-list
    monthLabel.splice(0,monthLabel.length);
    monthData.splice(0,monthLabel.length);
      
    //Making a list with only the months from the API response
    let months: Array<number> = [];
    dates.forEach(date => {
      months.push(parseInt(date.slice(5,8)));
    });
      
    // Removing duplicates and passing the unique months to monthLabel as strings
    let uniqueMonths: Array<string> = [];
    removeDuplicates(months).forEach((month) => {
      uniqueMonths.push(month.toString());
      monthLabel.push(toMonthName(month.toString()));
    })
  
    // Adding up the number of commits per month and pushing the values to monthData
    uniqueMonths.forEach((label) => {
      let x = 0;
      months.forEach((element) => {
        if (label === element.toString()){
          x++;
        }
      })
      monthData.push(x); 
      })
    }

  // The lists to be updated and sent to the graph
  const dayLabel: string[] = [];
  const dayData: number[] = [];

  // Data-processing for days
  function getDays(dates: string[]) {

    // Clearing the dayLabel- and the dayData-list
    dayLabel.splice(0,dayLabel.length);
    dayData.splice(0,dayLabel.length);
    
    // Making a list with only the days from the API response
    let days: Array<string> = [];
    dates.forEach(date => {
      days.push(date.slice(0,19));
    });

    // Making a list of all the days represented by numbers (0-6)
    let allDays: Array<number> = [];
    days.forEach(day => {
      const date = new Date(day);
      let currentDay = date.getDay();
      allDays.push(currentDay);
    });
  
    // Removes duplicates and pushes the names of the days to dayLabel
    removeDuplicates(allDays.sort()).forEach(number => {
      if (number === 1){
        dayLabel.push("Mondays");
      }
      if (number === 2){
        dayLabel.push("Tuesdays");
      }
      if (number === 3){
        dayLabel.push("Wednesdays");
      }
      if (number === 4){
        dayLabel.push("Thursdays");
      }
      if (number === 5){
        dayLabel.push("Fridays");
      }
      if (number === 6){
        dayLabel.push("Saturdays");
      }
      if (number === 0){
        dayLabel.push("Sundays");
      }
    });

    // Adding up the number of commits per day and pushing the values to dayData
    removeDuplicates(allDays).sort().forEach((day) => {
      let x = 0;
      allDays.forEach((element) => {
        if (day === element){
          x++;
        }
      })
      dayData.push(x); 
      })
    }

  
    useEffect(() => {
      setCommitData([0]);
      setCommitLabels([""]);
      console.log("useEffect");
    let axiosConfig = {headers: {'PRIVATE-TOKEN': props.api}}

    // Check that url contains something valuable to send get request 
    if (props.url !== null && typeof props.url !== "undefined" && props.url !== "") {
      let data: Array<string> = [];
      axios.get(interpretUrl(props.url), axiosConfig).then((result) => {
        for(let i = 0; i < result.data.length; i++) {
          data.push(result.data[i].committed_date);
        }
      })
      setResults(data);      
    }
    }, [props.url]);


  getYears(results);
  getMonths(results);
  getDays(results);

if (results[0] != "") {
  return (
  <div>
    <Bar
    data={{
      labels: CommitLabels,
      datasets: [
        {
          label: 'Commits',
          data: CommitData,
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 2,
        }
      ]
    }}
    height={300}
    width={400}
    options={{
      maintainAspectRatio: true,
      responsive: true,
    }}
    />
    <Select options={options} onChange={handleChange}  />
    </div>
    )
  }
  else {
    return (
      <div className="emptyDiv">


      </div>
    )
  }
    
  }
  export default CommitsGraph

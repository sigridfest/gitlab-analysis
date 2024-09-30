import React, { useEffect } from 'react'
import './Languages.css';
import { useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';

  ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

    // Function to select color based on provided language.
    // Choices of color taken from https://github.com/ozh/github-colors/blob/master/colors.json
    const defColor = (lang: string) => {
        switch(lang) {
            case 'TypeScript': {
                return '#3178c6';
            }
            case 'JavaScript': {
                return '#f1e05a';
            }
            case 'CSS': {
                return '#563d7c';
            }
            case 'Assembly': {
                return '#6E4C13'
            }    
            case 'HTML': {
                return '#e34c26'
            }
            case 'Java': {
                return '#b07219'
            } 
            case 'Kotlin': {
                return '#A97BFF'
            }
            case 'Python': {
                return '#3572A5'
            }
            case 'C': {
                return '#555555'
            }
            case 'C#': {
                return '#178600'
            }
            case 'C++': {
                return '#f34b7d'
            }
            case 'MATLAB': {
                return '#e16737'
            }
            default:
                return 'gray';
        }
    };

    // Translate the provided URL into a REST API url
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
        let apiEnding: string = "/languages"
        if (prefix !== "none") {
            newUrl = prefix+"//" + gitlabInstance + gitlabApiUrl + projectRepo + apiEnding
        } else {
            newUrl = gitlabInstance + gitlabApiUrl + projectRepo + apiEnding
        }
        return newUrl;
    }

function Languages(props: { url: string; api: string}) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        // Configure request header
        let axiosConfig = {headers: {'PRIVATE-TOKEN': props.api}}
        // Check that url contains something valuable to send get request to
        if (props.url !== null && typeof props.url !== "undefined" && props.url !== "") {
            axios.get(interpretUrl(props.url), axiosConfig).then((result) => {
                setResults(result.data)
            })
        }
    }, [props.url]);

    // Retrieve languages (labels) and how much each is used (values).
    var languageLabels: string[] = Object.keys(results);
    var languageValues: number[] = Object.values(results);                    
    
    // Create array of colors corresponding to the language.
    let langColor = [defColor(languageLabels[0])];
    for (let i = 1; i < languageLabels.length; i++) {
        let newColor = defColor(languageLabels[i]);
        langColor = langColor.concat(newColor);
    }    

    // Generate the strucutred graph data.
    const langData = {
        labels: languageLabels,
        datasets: [
            {
                label: 'Languages',
                data: languageValues,
                backgroundColor: langColor,
            }
        ]
    };
    // Check if there is any results to display. 
    if (results) {
        // Make pie chart with data
        return(
            <div className="Languages">
                <Pie data={langData}/>
        </div>);
    } else {
        // Return empty div if no data to present.
        return (
            <div>
                
            </div>
        )
    }
}

export default Languages;
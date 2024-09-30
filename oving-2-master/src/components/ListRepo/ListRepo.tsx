import React from "react";
import { useContext } from "react";
import { RepoContext } from "../../App";
import './ListRepo.css'

function ListRepo(){
    // RepoList-value from RepoContext with Context API
    const RepoList = useContext(RepoContext)
    sessionStorage.setItem(RepoList[-1], RepoList[-1]);
    let saveLink = sessionStorage.getItem(RepoList[-1])
    

    let header = "";
    if(RepoList.length>0){
        header = "Previously visited repositories:"
    }

    
    const ListTheRepos = RepoList.map((item)=>
        <li key={item.toString()}>
            {item}
        </li>
    );

    if (RepoList.length>0) {
    return (
        <div>
            <h4> {header}</h4>   
        <ul className = "RepoList">
            {ListTheRepos}
        </ul>
        </div>
    )
    } {
        return (<div></div>)
    }
}
export default ListRepo
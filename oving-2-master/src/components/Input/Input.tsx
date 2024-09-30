import userEvent from '@testing-library/user-event';
import React, {useState } from 'react'
import { Button } from 'react-bootstrap';
import './Input.css';

export default function Input({handleInputs}) {
 
    const emptyArray : Array<string> = [""]
    const [repo,setRepo] = useState('')
    const [token,setToken] = useState('')
    const [repoList,setRepoList] = React.useState<string[]>([])
    const [tokenList,setTokenList] = React.useState<string[]>([])
    const [items,setItems] = React.useState<string[]>([]) 
    var prevLink = "Last repo:"
    var prevTok = "Token:"
    var repoLocal : any = localStorage.getItem("repoKey") //getter for local storage
    var tokenSession : any = sessionStorage.getItem("tokenKey") //getter for session storage
    
    // Listener for repo-input
    const handleChangeRepo = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setRepo(event.target.value);
       
    };

    // Listener for token-input
    const handleChangeToken = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setToken(event.target.value);
        
        
    };

    // Listener for submitting repo/token input.
    const handleSubmit = () => {
        //setting local storage to input string
        localStorage.setItem("repoKey", repo)
        sessionStorage.setItem("tokenKey",token)
        
        setItems([
            ...items,
            repo,
            token
        ])

        setRepoList([
            ...repoList,
            repo
        ])

        setTokenList([
            ...tokenList,
            token
        ])
   } 
   return  ( 
    <div className='inputBox'>

        <form action='' method="GET" >
            <input id = 'Repolink' placeholder='Repo link' onChange = {handleChangeRepo} value = {repo} ></input>
            <br/>
            <input placeholder='Access token' onChange = {handleChangeToken} value = {token}></input>
            <br/>
            <Button onClick = {handleSubmit} onClickCapture = {() =>handleInputs (items, repoList, tokenList, repo, token)}>Submit</Button>
        </form>
            <p id ="prev">{prevLink}</p>
            <p id ="reptok">{repoLocal}</p>
            <p id = "prev">{prevTok}</p>
            <p id = "reptok">{tokenSession}</p>
    </div>
)
}
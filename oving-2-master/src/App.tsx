import React, { useEffect, useState } from 'react';
import './App.css';
import CommitsGraph from './components/Graphs/CommitsGraph';
import Select from "react-select";
import Title from './components/Title/Title';
import Input from './components/Input/Input'
import ListRepo from './components/ListRepo/ListRepo';
import Languages from './components/Languages/Languages';
import 'react-dropdown/style.css';



// Context API for passing data to child ListRepo
  export const RepoContext = React.createContext([""]);
  
function App() {

  //RepoList data
  const [ReposAndToken, setReposAndToken] = useState([""])
  const [Repos,setRepos] = useState<string[]>([])
  const [Token,setToken] = useState([""])
  const [currentRepo, setCurrentRepo] = useState("")
  const [currentToken, setCurrentToken] = useState("")


  //RepoList handleChange input function
  const handleInputs = (RepoList : Array<string>, Repos : Array<string>, Token: Array<string>, CurrentRepo:string, CurrentToken :string) => {
    setReposAndToken(RepoList);
    setRepos(Repos);
    setToken(Token);
    setCurrentRepo(CurrentRepo)
    setCurrentToken(CurrentToken)
    let ActiveRepo : string = Repos[-1]
    let ActiveToken : string = Token[-1]
    
  }

  return (
    
    <div className="App">
      <div>
        <Title/>
      </div>

      <div className='Input'>
        <Input handleInputs={handleInputs}/>
      </div>

      <div className ='ListRepo'>
        <RepoContext.Provider value= {Repos}>
          <ListRepo/>
        </RepoContext.Provider>
        
      </div>
   
      <Languages 
        url= { currentRepo } 
        api= { currentToken }/>

      
      <div className='CommitGraph'>
        <CommitsGraph
          url= { currentRepo } 
          api= { currentToken } />
      </div> 
   
    
      
    </div>
  );
}
export default App;
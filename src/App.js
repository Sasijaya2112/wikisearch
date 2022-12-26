import { useState } from 'react';
import './App.css';

function App() {

 const [result, setResult] = useState({});
  async function fetchData(val) {
    const searchtext = val.trim().toLowerCase();
    console.log(searchtext);
    if (searchtext.length > 0) {
      const apistring = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchtext}`;
        const response = await fetch(apistring);
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return await response.json();
    }
}

async function handleSearch(e) {
  const { value } = e.target;
  setResult({ result: await fetchData(value) })
  console.log(result)
}

  return (
    
    <div className="App">
      <center><h1>Wiki Search</h1></center>
    <center><input type="text"  id='input' onKeyUp={handleSearch} /></center>
   
    <ul>
    {result.result && result.result.query.search.map((data,i) =>{
    let url=  `https://en.wikipedia.org/wiki/${data.title}`.trim();
      console.log(url);
      return(<div key={i} id='output'>
        <table>
      <tr><a href={url}>{data.title}</a></tr>  
        </table>
        </div>
        
        )})}
 </ul>
    </div>
  );
}

export default App;

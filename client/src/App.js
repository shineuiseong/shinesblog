import logo from './logo.svg'
import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [list, setList] = useState([])

  useEffect(() => {
    ;(async () => {
      const { data: resultList } = await axios.get('/api/list')
      setList(resultList)
    })()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.!Q!!
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <div>List</div>
        {list.map((item, idx) => (
          <div key={idx}>{`${item.id}/${item.name}`}</div>
        ))}
      </header>
    </div>
  )
}

export default App

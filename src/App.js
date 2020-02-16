import React, {useEffect, useState} from 'react';
import Main from './main'
import 'antd/dist/antd.css';
import './App.css';

function App() {
  const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://www.mocky.io/v2/5c9105cb330000112b649af8')
        .then(res => res.json())
        .then(res => {
            setData(res)
            console.log('res', res)
        })
    }, [])
  return (
    <div className="App">
      <Main data={data} />
    </div>
  );
}

export default App;

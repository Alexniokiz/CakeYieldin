import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const App = () => {
  const [cakeYield, setCakeYield] = useState(0)
  const [cakeValue, setCakeValue] = useState(0)
  const [adress, setAdress] = useState("")
  const getCake = () => {
    axios.get('https://www.yieldwatch.net/api/all/0x88f1B5966b701945cE41C5984363E1D12a10ecF9?platforms=pancake', {
      headers: {
       'Access-Control-Allow-Origin' : '*',
       'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      }
    }).then(res => {
        setCakeYield(res.data.result.PancakeSwap.vaults.vaults[0].recentProfit);
        setCakeValue(res.data.result.PancakeSwap.vaults.vaults[0].priceInUSDDepositToken);
      })
  }

  const onChange = (event) => {
      setAdress(event.target.value);
  };

  useEffect(() => {
    console.log(adress)
    if (cookies.get('adress')) {
      setInterval(() => {
        getCake();
      }, 5000);
    } 
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        { !cookies.get('adress') ?
          <>
            <h2 style={{margin: "0 auto"}}>Set your BEP-20 adress</h2>
            <div className="Input">
              <input type="text" id="input" class="Input-text" placeholder="" onChange={onChange}></input>
            </div>
            <button className="Button" onClick={() => {cookies.set('adress', adress)}}>Submit</button>
          </>
          :
          <>
            <h2>Cake Yield Counter</h2>
            <p>{cakeYield}</p>
            <p>≈ {cakeYield * cakeValue}$</p>
          </>
        }
      </header>
    </div>
  );
}

export default App;

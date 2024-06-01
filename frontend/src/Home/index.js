import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Home() {
  const [data, setData] = useState('');
  const [amount, setAmount] = useState('');

  const fetchData = async () => {
    const result = await axios.get('http://localhost:5000/data');
    setData(result.data.data);
  };  

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/debit', { amount });
    setAmount('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Arduino Data</h1>
        <p>{data}</p>
        <button onClick={fetchData}>Refresh Data</button>
        
        <form onSubmit={handleSubmit}>
          <label>
            Enter amount to debit:
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              required 
            />
          </label>
          <button type="submit">Send Amount</button>
        </form>
      </header>
    </div>
  );
}

export default Home;

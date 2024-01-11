import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import Card from "./components/Card";
import Like from "./components/Like";

function App() {

  const [appState, setAppState] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const [submittedValue, setSubmittedValue] = useState(null);
 const [likedData, setLikedData] = useState([]);
    const handleRefresh = (e) => {
        // Trigger a refresh by setting submittedValue to null
        fetchData();
    };
    // useEffect to fetch liked data from local storage when the component mounts
    useEffect(() => {
        const storedLikedData = localStorage.getItem('likedData');
        if (storedLikedData) {
            setLikedData(JSON.parse(storedLikedData));
        }
    }, []);


    // Handler for input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Store the submitted value in the variable
        setSubmittedValue(inputValue);
        console.log(submittedValue)
    };


    useEffect(() => {
        console.log('useEffect - submittedValue:', submittedValue);

        if (submittedValue !== null) {
            fetchData();
        } else {
            console.log('data null');
        }
    }, [submittedValue]);

    const fetchData = () => {
        const apiUrl = "https://api.kinopoisk.dev/v1.4/movie/random?rating.kp=1-5";
        const config = {
            headers: { accept: 'application/json', 'X-API-KEY': submittedValue }
        };

        axios.get(apiUrl, config)
            .then((resp) => {
                const datId = [resp.data.id, resp.data.name, resp.data.poster.previewUrl, resp.data.rating.kp];
                setAppState(datId);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const handleLike = () => {
        // Save liked data to local storage
        if (appState) {
            // Check if appState is already in likedData
            const isAlreadyLiked = likedData.some(item => {
                // Replace the following comparison logic with your specific criteria
                return JSON.stringify(item) === JSON.stringify(appState);
            });

            if (!isAlreadyLiked) {
                const updatedLikedData = [...likedData, appState];
                setLikedData(updatedLikedData);
                localStorage.setItem('likedData', JSON.stringify(updatedLikedData));
            } else {
                // Handle the case where the data is already present, e.g., show a message or do nothing
                console.log('Data is already liked!');
            }
        }
    };

  return (
      <Router>
          <div className='main'>

              <div className='inlin'>
                  <nav className="mint-nav">
                      <div>
                          <img className='dd' src={require("./icons/logos.png")}/>
                          <div className="logo">LowMovie</div>
                      </div>
                      <form onSubmit={handleSubmit} className="searchbar">
                          <label>

                              <input
                                  type="text"
                                  value={inputValue}
                                  onChange={handleInputChange}
                                  placeholder="Insert Api key...."
                              />
                          </label>
                          <button type="submit" className='btnn'>Submit</button>
                      </form>

<div className='link'>
                      <Link to='/' className="nav-links"> Home </Link>
                      <Link to='/like' className="alik"> Saved</Link>
              </div>
                  </nav>



              </div>





          </div>
          <Routes>
              <Route path="/" element={<Card appState={appState}
              submittedValue={submittedValue} handleLike={handleLike} handleRefresh={handleRefresh}/>}/>
              <Route path="/like" element={<Like likedData={likedData}/>}/>
          </Routes>
</Router> );
}

export default App;

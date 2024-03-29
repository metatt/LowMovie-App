import React from 'react';
import './card.css'

function Card({appState, submittedValue, handleRefresh, handleLike, showNotification }) {
    return (
        <div >

            {appState = appState[1]? (<>
                    <div className='card'>

                        <h1 className='title'>{appState[1]}</h1>
                        <p className='rating'>Рейтинг:{appState[3] > 3 ? <div className='high'>{appState[3]}</div> :
                            <div className='low'>{appState[3]}</div>} </p>
                        <div className='poster'><a href={"https://www.kinopoisk.ru/film/" + appState[0]}><img
                            className='posterImg' src={appState[2]}/></a></div>


                    </div> <div className='btnGrup'>
                    <button className='btn' onClick={handleLike}><i class="gg-bookmark"></i></button>
                    <button className='btn' onClick={handleRefresh}>Refresh</button>
                    </div>
                    {showNotification && <div className='added'>Saved</div>}
                </>
            ) : <p> Please add you <a href='https://kinopoisk.dev/'>API token</a> to filed and submit</p>}


        </div>
    );
}

export default Card;
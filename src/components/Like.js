import React from 'react';
import './like.css'
function Like({likedData}) {
    const dataRefresh = () => {
        // Trigger a refresh by setting submittedValue to null
        localStorage.clear();
        window.location.reload();
    };
    return (<div>
            <button onClick={dataRefresh}>reset  </button>
      <div className='blok' > <ul className='list'>
            {likedData.map((item, index, rr ) => (
                <li  key={index}><a href={"https://www.kinopoisk.ru/film/"+item[0]} ><img className='saved' src={item[2]}/></a></li>
            ))}
        </ul> </div>
</div>
    );
}

export default Like;
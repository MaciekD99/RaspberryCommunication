import React, {useState,useEffect} from 'react';

import './Message.css';



const Message = ({ message: { text, user }, name }) => {

  const [currentDate, setCurrentDate] = useState('');
 
  useEffect(() => {
    
    var date = new Date().getDate(); //Current Date
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthIndex = (new Date().getMonth());
    let monthName = monthNames[monthIndex];
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    if (min < 10){
      min = `0${min}`;
    }
    
    if (date < 10){
      date = `0${date}`;
    }
    setCurrentDate(
      date + ' ' + monthName + ' ' + year 
      + ', ' + hours + ':' + min 
    );
  }, []);

  
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{text}</p>
            <p className='currentDate'>{currentDate}</p>
          </div>
          
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{text}</p>
              <p className='currentDate enemy'>{currentDate}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
            
          </div>
        )
  );
}

export default Message;
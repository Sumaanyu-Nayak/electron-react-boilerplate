import * as React from 'react';
import { speakBhai } from '../utils/SpeechSythesis';
import './timer.css';
import { setItem } from '../utils/localStorage';
import { timeConverter } from '../utils/timeConverter';

const TimerTable = ({ currentTimePass, data, filterData, setdata }) => {
  const month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const data1 = filterData ? filterData[0] : null;
  const handleDelete = () => {
    setItem('data', '');
    setItem('date', '');
    setdata(undefined);
  };
  React.useEffect(() => {
    let currentData = filterData ? filterData[0] : null;
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentSeconds = currentTime.getSeconds();

    // Convert current time to seconds for easier comparison
    const currentTotalSeconds =
      currentHours * 3600 + currentMinutes * 60 + currentSeconds;
    if (currentData) {
      //////////////////////////////////
      
      //////////////////////////////////
      const itemTotalSeconds = currentData.IST*86400;

      if (itemTotalSeconds - currentTotalSeconds == 360) {
        let say_string = `Next pass with ${currentData?.STN} after 6 minutes for, ${currentData?.OPERATION}, by, ${currentData?.SAT}`;
        speakBhai(say_string);
      }
      if (itemTotalSeconds - currentTotalSeconds == 300) {
        let say_string = `Next pass with ${currentData?.STN} after 5 minutes for, ${currentData?.OPERATION}, by, ${currentData?.SAT}`;
        speakBhai(say_string);
      }
      if (itemTotalSeconds - currentTotalSeconds == 240) {
        let say_string = `Next pass with ${currentData?.STN} after 4 minutes for, ${currentData?.OPERATION}, by, ${currentData?.SAT}`;
        speakBhai(say_string);
      }
    }
  }, [filterData]);
  return (
    <div>
      <div
        style={{
          position: 'fixed',
          top: 30,
          right: 30,
          height: '50px',
          width: '50px',
          backgroundColor: 'red',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          borderRadius: '10px',
          border: '1px solid white',
        }}
        onClick={handleDelete}
      >
        <svg
          width="30px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 34.333 34.333"
          xmlSpace="preserve"
        >
          <g>
            <path d="M34.167,22.333v7.666c0,1.381-1.119,2.5-2.5,2.5s-2.5-1.119-2.5-2.5v-0.24c-3.109,2.886-7.238,4.574-11.667,4.574 c-6.937,0-13.152-4.135-15.836-10.533c-0.132-0.315-0.194-0.643-0.194-0.965c0-0.979,0.576-1.905,1.533-2.308 c1.273-0.534,2.738,0.064,3.272,1.339c1.902,4.536,6.309,7.467,11.225,7.467c3.737,0,7.176-1.694,9.446-4.5H24 c-1.381,0-2.5-1.119-2.5-2.5s1.119-2.5,2.5-2.5h7.666C33.047,19.833,34.167,20.952,34.167,22.333z M10.333,14.834 c1.381,0,2.5-1.12,2.5-2.5c0-1.381-1.119-2.5-2.5-2.5H7.796C10.061,6.832,13.618,5,17.5,5c4.917,0,9.323,2.932,11.226,7.468 c0.533,1.273,1.998,1.872,3.271,1.339c1.273-0.534,1.872-1.998,1.339-3.272C30.651,4.135,24.436,0,17.5,0 C12.75,0,8.337,1.941,5.167,5.219V4.667c0-1.381-1.12-2.5-2.5-2.5c-1.381,0-2.5,1.119-2.5,2.5v7.667 c0,0.663,0.264,1.299,0.732,1.769c0.469,0.469,1.104,0.731,1.768,0.731H10.333z" />
          </g>
        </svg>
      </div>
      <center>
        <h1
        style={{
          color: 'white',
          backgroundColor: 'red',
          fontSize: '40px',
          fontWeight : 'bold'
        }}>TIME : {currentTimePass}</h1>
      </center>
      <center>
        <u><h1>PASS DATA : {new Date().getDate()} {month[new Date().getMonth()]} {new Date().getFullYear()} </h1></u>
      </center>
      <table>
        <tr>
          <th>S NO</th>
          <th>SAT</th>
          <th>STN</th>
          <th>ORBIT NO</th>
          <th>MAX ELEV</th>
          <th>AOS</th>
          <th>LOS</th>
          <th>OPERATION</th>
          <th>IST</th>
        </tr>
        {data.map((item, index) => {
          if (data1 && item['S NO'] == data1['S NO']) {
            return (
              <tr key={index} style={{ backgroundColor: 'red' }}>
                <td>{item['S NO']}</td>
                <td>{item.SAT}</td>
                <td>{item.STN}</td>
                <td>{item['ORBIT NO']}</td>
                <td>{item['MAX ELEV']}</td>
                <td>{item.AOS}</td>
                <td>{item.LOS}</td>
                <td>{item.OPERATION}</td>
                <td>{timeConverter(item.IST)}</td>
                <td>{currentTimePass}</td>
              </tr>
            );
          } else if ((data1 && item['S NO'] < data1['S NO']) || data1 == null) {
            return (
              <tr key={index} style={{ backgroundColor: 'green' }}>
                <td>{item['S NO']}</td>
                <td>{item.SAT}</td>
                <td>{item.STN}</td>
                <td>{item['ORBIT NO']}</td>
                <td>{item['MAX ELEV']}</td>
                <td>{item.AOS}</td>
                <td>{item.LOS}</td>
                <td>{item.OPERATION}</td>
                <td>{timeConverter(item.IST)}</td>
              </tr>
            );
          }
          return (
            <tr key={index}>
              <td>{item['S NO']}</td>
              <td>{item.SAT}</td>
              <td>{item.STN}</td>
              <td>{item['ORBIT NO']}</td>
              <td>{item['MAX ELEV']}</td>
              <td>{item.AOS}</td>
              <td>{item.LOS}</td>
              <td>{item.OPERATION}</td>
              <td>{timeConverter(item.IST)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TimerTable;

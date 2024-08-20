import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import ExcelReader from '../components/excelRead';
import { useState } from 'react';

// function Hello() {
//   return (

      
//   );
// }


export default function App() {
  const options : Intl.DateTimeFormatOptions = { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const [currentTimePass, setCurrentTime] = useState(
    new Date().toLocaleTimeString("en-GB",options)
  )
  const [date, setDate] = useState(
    new Date().toLocaleDateString()
  )
  setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString("en-GB", options))
  }, 100)
  return (
    <ExcelReader date={date} currentTimePass={currentTimePass}/>
  );
}

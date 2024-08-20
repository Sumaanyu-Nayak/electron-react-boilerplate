import * as React from "react";
import { read, utils, WorkBook, WorkSheet } from "xlsx";
import TimerTable from "./TimerTable.jsx";
import { getItem, setData, setItem } from "../utils/localStorage";
  
  const ExcelReader = ({ date, currentTimePass }) => {
    const [data, setdata] = React.useState(
      ()=>{
        if(getItem("data")!="" && getItem("date") == date){
          return JSON.parse(getItem("data"))
          }
        return undefined

      }
    );
    const [filterData, setFilterData] = React.useState()
  
    const handleFileUpload = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      try {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = read(arrayBuffer);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data= utils.sheet_to_json(worksheet);
        setdata(data);
        setData("data", JSON.stringify(data), date);
        setItem("date", date);
        
      } catch (error) {
        console.error("Error reading the file", error);
      }
      
    };
React.useEffect(()=>{
  if (!data || data == "" || data==null || data == undefined){
  }
  else{const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentSeconds = currentTime.getSeconds();

  // Convert current time to seconds for easier comparison
  const currentTotalSeconds = currentHours * 3600 + currentMinutes * 60 + currentSeconds;

  const filteredArray = data?.filter(item => {
      // Split the ISTN time into hours, minutes, and seconds
      // const [hours, minutes, seconds] = item.ISTN.split(':').map(Number);

      // Convert ISTN time to seconds for comparison
      const itemTotalSeconds = item.IST*86400;

      // Compare ISTN time to current time
      return itemTotalSeconds > currentTotalSeconds;
  });
  setFilterData(filteredArray)}
},[currentTimePass])
    return (
      <div>
        {data ? <TimerTable currentTimePass={currentTimePass} data={data} filterData={filterData} setdata={setdata}/> :<input height={30} style={{
          fontSize: "20px",
        }} type="file" onChange={handleFileUpload} />}
      </div>
    );
  };

export default ExcelReader
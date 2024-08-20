export const timeConverter = (time:number)=>{
    const hours = time*24;
    const min = (hours%(Math.floor(hours)))*60
    const sec = (min%(Math.floor(min)))*60

    return `${hours%(Math.floor(hours))<0.998? (Math.floor(hours)>= 10? ~~Math.floor(hours):`0${~~Math.floor(hours)}`):(Math.ceil(hours)>10? ~~Math.ceil(hours):`0${~~Math.ceil(hours)}`)}:${min%(Math.floor(min))<0.998? ( Math.floor(min)>=10?~~Math.floor(min):(`0${~~Math.floor(min)}`)):( Math.ceil(min)>=10?~~Math.ceil(min):(`0${~~Math.ceil(min)}`))}:${sec%(Math.floor(sec))<0.998?(Math.floor(sec)>10?~~Math.floor(sec):`0${~~Math.floor(sec)}`):Math.ceil(sec)>10? ~~Math.ceil(sec):`0${~~Math.ceil(sec)}`}`
}



//0.3264699074074074

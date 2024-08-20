export const setData = (key:string, value:string, date:string) =>{
    if (date != localStorage.getItem("date")){
        localStorage.setItem(key,value)
        console.log("new date")
    }
}

export const setItem = (key:string, value:string) =>{
    localStorage.setItem(key,value)
}

export const getItem = (key:string) =>{
    return localStorage.getItem(key)
}
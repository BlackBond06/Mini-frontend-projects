let isOnline = true;
let intervalId;
let timerId = 10;
const popup = document.querySelector(".popup");
const checkConnection = async()=>{
    try {
        // fetch random data from API
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnline = response.status >= 200 && response.status < 300;
        console.log(response.status, isOnline);
    } catch (error) {
        isOnline = false; //if there is an error, the network is considered offline
    }
    timerId = 10;
    clearInterval(intervalId);
    handlePopup(isOnline);
}

// function that checks network status
const handlePopup = (status)=>{

    // return( status ? popup.classList.remove("show")
    // : popup.classList.add("show"));
    if(status) return popup.classList.remove("show");
    popup.classList.add("show");
   
   
    intervalId = setInterval(()=>{
        timerId--;
        if(timerId === 0) checkConnection()
        popup.querySelector(".desc b").textContent = timerId; // decrease timer every 1 second
    }, 1000)

   
}

// Check connection status every 3 seconds
setInterval(checkConnection, 3000);
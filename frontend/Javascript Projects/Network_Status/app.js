let isOnline = true,
  intervalId,
  timerId = 10;

const popup = document.querySelector(".popup");
const wifiIcon = document.querySelector(".icon i");
const popupTitle = document.querySelector(".popup .title");
const popupDesc = document.querySelector(".desc");
const reconnectBtn = document.querySelector(".reconnect");

const checkConnection = async () => {
  try {
    // fetch random data from API
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    isOnline = response.status >= 200 && response.status < 300;
  } catch (error) {
    isOnline = false; //if there is an error, the network is considered offline
  }
  timerId = 10;
  clearInterval(intervalId);
  handlePopup(isOnline);
};

// function that checks network status
const handlePopup = (status) => {
  if (status) {
    wifiIcon.className = "uil uil-wifi";
    popupTitle.textContent = "Restored Connection";
    popupDesc.textContent ="Your device is now successfully connected to the internet.";
    popup.classList.add("online");
    return setTimeout(()=> popup.classList.remove("show"), 2000);
  }

  // if the status is false (offline);
  wifiIcon.className = "uil uil-wifi-slash";
  popupTitle.innerHTML = "Lost Connection";
  popupDesc.innerHTML =
    "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds.";
  popup.className = "popup show";

  intervalId = setInterval(() => {
    timerId--;
    if (timerId === 0) checkConnection();
    popup.querySelector(".desc b").innerHTML = timerId; // decrease timer every 1 second
  }, 1000);
};

// Check connection status every 3 seconds
setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click", checkConnection);

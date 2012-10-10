// The following events are not covered in this demo, because they're device-specific.
// Each of these allows you to override the default behavior of a button:
// backbutton
// searchbutton
// menuButton
// startcallbutton
// endcallbutton
// volumedownbutton
// volumeupbutton

// Using the pause event in iOS is tricky, and you should read the 
// documentation. Specifically, the resign/active events might be better for you, but
// they are specific to iOS.
// To test the pause event:
// 1. Start the app.
// 2. Enter a value for the userName field (other than XXXXX), and click "Save".
// 3. Leave the app. Run another app if you like.
// 4. Lock the phone (this causes the app to pause).
// 5. Unlock the phone.
// 6. Reload the app, allowing the resume event handler refresh the data.
//    Because the onPause event handler changed the value of the
//    userName field to XXXXX, you should now see that value.

document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
     
    // To test these events, toggle your online connections off and back
    // on again. It may take a full second to register the change. When the
    // app first starts, one of these events will fire as the app
    // determines if it's online or offline.
    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);
     
    // These events require patience. The batterystatus event occurs if the battery
    // changes by 1%, or if you plug or unplug the device. Note that these events
    // do not work at all with phoneGap 1.3--they were fixed in 1.4.
    window.addEventListener("batterycritical", onBatteryCritical, false);
    window.addEventListener("batterylow", onBatteryLow, false);
    window.addEventListener("batterystatus", onBatteryStatus, false);
    
    var saveButton = document.getElementById("saveButton"),
        refreshButton = document.getElementById("refreshButton");
    
    saveButton.addEventListener("click", saveToLocalStorage);
    refreshButton.addEventListener("click", getValueFromLocalStorage);
     
    // Retrieve existing values from local storage.
    getValueFromLocalStorage();
}

function writeNotification(value) {
    var notificationBox = document.getElementById("notificationBox");
    notificationBox.innerHTML += "<br/>" + value;
}

function clearCurrentNotification() {
    var notificationBox = document.getElementById("notificationBox");
    notificationBox.innerHTML = "";
}           
 

function onPause() {
    localStorage.setItem("userName", "Was paused");
}
 
function onResume() {
    getValueFromLocalStorage();
}
 
function onOnline() {
    writeNotification("Was offline, now online.");
}
 
function onOffline() {
    writeNotification("Was online, now offline.");
}


function onBatteryCritical(batteryInfo) {
    var batteryLevel = batteryInfo.level,
        isPlugged = batteryInfo.isPlugged;
    
    var notificationMessage =  "Battery level low (" + batteryLevel + "%). " + 
                               "You are " + (isPlugged ? "" : "not") + "  plugged in.";
    
    writeNotification(notificationMessage);
}
 
function onBatteryLow(batteryInfo) {
    var batteryLevel = batteryInfo.level,
        isPlugged = batteryInfo.isPlugged;
    
    var notificationMessage =  "Battery level low (" + batteryLevel + "%). " + 
                               "You are " + (isPlugged ? "" : "not") + "  plugged in.";
    
    writeNotification(notificationMessage);
}
 
function onBatteryStatus(batteryInfo) {
    var batteryLevel = batteryInfo.level,
        isPlugged = batteryInfo.isPlugged;
    
    var notificationMessage =  "Battery level low (" + batteryLevel + "%). " + 
                               "You are " + (isPlugged ? "" : "not") + "  plugged in.";
    
    writeNotification(notificationMessage);
         
}

function saveToLocalStorage() {
    var usernameInput = document.getElementById("usernameInput");
    
    // Store value from UI into local storage.
    localStorage.setItem("userName", usernameInput.value);
    usernameInput.value = "";
    
    clearCurrentNotification();
    writeNotification("Saved to local storage.");
}

// Retrieve value from local storage into UI.
function getValueFromLocalStorage() {
    var userInput = document.getElementById("usernameInput"),
        valueFromLocalStorage = localStorage.getItem("userName");
    
    
    userInput.value = valueFromLocalStorage;
    clearCurrentNotification();
    writeNotification("Retrieved from local storage");
}
document.addEventListener("deviceready", onDeviceReady, false);
var eventApp;

function onDeviceReady() {
	eventApp = new EventApp();
	eventApp.printEvent('deviceready');
	eventApp.run();
}

function EventApp() {
    
}

EventApp.prototype = {
	run: function() {
		var that = this;
        
		document.addEventListener("pause",
								  function() {
									  that.onPause.apply(that, arguments);
								  }, 
								  false);
		
		document.addEventListener("resume",
								  function() {
									  that.onResume.apply(that, arguments);
								  }, 
								  false);
         
		document.addEventListener("online",
								  function() {
									  that.onOnline.apply(that, arguments);
								  },
								  false);
        
		document.addEventListener("offline",
								  function() {
									  that.onOffline.apply(that, arguments);
								  },
								  false);
         
		window.addEventListener("batterystatus",
								function() {
									that.onBatteryStatus.apply(that, arguments)
								},
								false); 
	},
    
	onPause: function() {
		var that = this;
		that.printEvent("Pause");
	},
 
	onResume: function() {
		var that = this;
		that.printEvent("Resume");
	},
 
	onOnline: function() {
		var that = this;
		that.printEvent("Network online");
	},
 
	onOffline: function() {
		var that = this;
		that.printEvent("Network offline");
	},
 
	onBatteryStatus: function(batteryInfo) {
		var batteryLevel = batteryInfo.level,
    		isPlugged = batteryInfo.isPlugged,
    		that = this;
    
		var notificationMessage = "Battery level (" + batteryLevel + "%). " + 
								  "You are " + (isPlugged ? "" : "not") + "  plugged in.";
    
		that.printEvent(notificationMessage);
         
	},

	getCurrentTime: function() {
		var currentTime = new Date(),
    		minutes = currentTime.getMinutes(), 
    		hours = currentTime.getHours();
	
		var some;
	
		if (hours > 11) {
			some = " PM";
		}
		else {
			some = " AM";
		}
	
		if (minutes < 10) {
			minutes = "0" + minutes
		}
	
		var timeFormated = hours + ":" + minutes + some;
	
		return timeFormated;
	},
    
	printEvent: function(text) {
		var newDiv = document.createElement('div'),
    		resultBox = document.getElementById("result"),
    		that = this;
        
		newDiv.innerHTML = '[' + that.getCurrentTime() + '] ' + text;
        
		resultBox.appendChild(newDiv);
	}
}
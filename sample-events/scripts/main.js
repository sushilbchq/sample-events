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
									  that._onPause.apply(that, arguments);
								  }, 
								  false);
		
		document.addEventListener("resume",
								  function() {
									  that._onResume.apply(that, arguments);
								  }, 
								  false);
         
		document.addEventListener("online",
								  function() {
									  that._onOnline.apply(that, arguments);
								  },
								  false);
        
		document.addEventListener("offline",
								  function() {
									  that._onOffline.apply(that, arguments);
								  },
								  false);
         
		window.addEventListener("batterystatus",
								function() {
									that._onBatteryStatus.apply(that, arguments)
								},
								false);
	},
    
	_onPause: function() {
		var that = this;
		that.printEvent("Pause");
	},
 
	_onResume: function() {
		var that = this;
		that.printEvent("Resume");
	},
 
	_onOnline: function() {
		var that = this;
		that.printEvent("Network online");
	},
 
	_onOffline: function() {
		var that = this;
		that.printEvent("Network offline");
	},
 
	_onBatteryStatus: function(batteryInfo) {
		var that = this
            batteryLevel = batteryInfo.level,
    		isPlugged = batteryInfo.isPlugged;

		var notificationMessage = "Battery level (" + batteryLevel + "%). " + 
								  "You are " + (isPlugged ? "" : "not") + "  plugged in.";
    
		that.printEvent(notificationMessage);
         
	},

	_getCurrentTime: function() {
		var currentTime = new Date(),
    		minutes = currentTime.getMinutes(), 
    		hours = currentTime.getHours(),
    		some;
	
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
		var that = this,
            newDiv = document.createElement('div'),
    		resultBox = document.getElementById("result");
        
		newDiv.innerHTML = '[' + that._getCurrentTime() + '] ' + text;
        
		resultBox.appendChild(newDiv);
	}
}
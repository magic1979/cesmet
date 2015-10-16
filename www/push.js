
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:@
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler@
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		//document.addEventListener("resume", onResume, false);
        app.receivedEvent('deviceready');

		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		
		if(PushbotsPlugin.isiOS()){
			PushbotsPlugin.initializeiOS("55eef2521779597d478b456a");
		}
		if(PushbotsPlugin.isAndroid()){
			PushbotsPlugin.initializeAndroid("55eef2521779597d478b456a", "1068247241830");
		}
		
		
		var ciccio;
		
		/*last_click_time = new Date().getTime();
		
		document.addEventListener('click', function (e) {
								  
								  click_time = e['timeStamp'];
								  
								  if (click_time && (click_time - last_click_time) < 1000) { e.stopImmediatePropagation();
								  
								  e.preventDefault();
								  
								  return false;
								  
								  }
								  
								  last_click_time = click_time;
								  
								  }, true);*/

		
		// Workaround for buggy header/footer fixed position when virtual keyboard is on/off@
		$('input, select')
		.on('focus', function (e) {
			$('header, footer').css('position', 'absolute');
			})
		.on('blur', function (e) {
			$('header, footer').css('position', 'fixed');
			//force page redraw to fix incorrectly positioned fixed elements
			//setTimeout( function() {
			//window.scrollTo( $.mobile.window.scrollLeft(), $.mobile.window.scrollTop() );
			//		   }, 20 );
			});
	

		var connectionStatus = false;
		connectionStatus = navigator.onLine ? 'online' : 'offline';
		
		if(connectionStatus=='online'){
			
			
			$(".spinner").hide();
			
			//provino()
			
			alert("Work");
			
				PushbotsPlugin.getToken(function(token){
						
						alert(token);
						
						regToken(token);
				});
			
		}
		else{
			$('#noconn').show();
			
			var tabella = "<table align='center' border='0' width='100%' height='120px'>";
			tabella = tabella + "<tr><td align='center'><a href='javascript:riparti()' class='btn'><font color='#fff'>Connetti</font></a></td></tr>";
			tabella = tabella + "</table>";
			
			$('#noconn').html(tabella);
			

			$(".spinner").hide();
			
			$("#footer").show();
		}
    }
	
}


function verificawifi(){
	$("#verifica").click();
}


function onResume() {
	app.initialize();
}


function getKey(key){
	if ( key == null ) {
		keycode = event.keyCode;
		
	} else {
		keycode = key.keyCode;
	}
	
	if (keycode ==13){
		
		document.activeElement.blur();
		$("input").blur()
		return false;
		
	}
	
}


function alertDismissed() {
	
}


function initscroll() {
	
	myScroll = new IScroll('#wrapper', { click: true });
				   
	document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
				   
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

}

function carica() {
	
	var myScroll2;

		myScroll2 = new iScroll('wrapper2', { click: true,zoom:true });
		setTimeout (function(){
			myScroll2.refresh();
		}, 1000);

	
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	
	document.addEventListener('DOMContentLoaded', loaded, false);
}

function provino() {
	var ciccio;
	var conta = 1;

	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://interactivebusinessapp.it/event_list/tokendiprova",
		   //data: {token:localStorage.getItem("Token")},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   timeout: 7000,
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  if (item.company_id!=0){
				  //OK
				  
				  if(conta==1){
					ciccio = item.image_tag;
				  }
				  else{
					ciccio = ciccio + item.image_tag;
				  }
				  
				  conta = conta + 1;
				  
				  }
				  else{
				  //alert(result.msg);
				  //window.location.href = "Froala/basic.html";
				  //self.document.formia2.emailL.value = localStorage.getItem("emailMemoria");
				  //window.location.href = "#article4";
				  
				  navigator.notification.alert(
											   'Nisba',  // message
											   alertDismissed,         // callback
											   'Chiamata',            // title
											   'OK'                  // buttonName
											   );
				  }
				  
		   });
		   
		   $("#contenuto").html(ciccio);
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error',  // message
										alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
		   
		   window.location.href = "#article4";
		   
		   },
		   dataType:"json"});
}


function regToken(token) {
	var ciccio;
	var conta = 1;
	
	alert(token);
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://interactivebusinessapp.it/device/set_token/PxgLiaL7dBgTYUzUyHZRNGIUlT5NIabyHrkZC57PHoJGiiAQZA/nD44CFruHMUPGbj213sd1kMiHygU41biNIThN36jWE2JPN8RZF/"+ token +"",
		   //url:"http://interactivebusinessapp.it/device/set_token/{platform_code}/{company_code}/{device_token}",
		   //Android PxgLiaL7dBgTYUzUyHZRNGIUlT5NIabyHrkZC57PHoJGiiAQZA
		   //data: {token:localStorage.getItem("Token")},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   timeout: 7000,
		   crossDomain: true,
		   success:function(result){


		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error',  // message
										alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
		   
		   window.location.href = "#article4";
		   
		   },
		   dataType:"json"});
}





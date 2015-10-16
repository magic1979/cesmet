/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		var nome="";
		var idfacebook="";
		var email="";
		
		// Facebook Conncet ------------------------------------------
		/*var fbLoginSuccess = function (userData) {
			alert("UserInfo: " + JSON.stringify(userData));
		}
		
		facebookConnectPlugin.login(["public_profile"],
			fbLoginSuccess,
			function (error) { alert("" + error) }
		);*/
		
		
		//foto();
		//login();
		//leggi();
		//leggiread();
		// End Facebook Connect ---------------------------------------
		
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function alertDismissed() {
	
}

function foto() {
	facebookConnectPlugin.showDialog(
									 {
									 method: "feed",
									 picture:'https://www.google.co.jp/logos/doodles/2014/doodle-4-google-2014-japan-winner-5109465267306496.2-hp.png',
									 name:'Test Post',
									 message:'First photo post',
									 caption: 'Testing using phonegap plugin',
									 description: 'Posting photo using phonegap facebook plugin'
									 },
									 function (response) { alert(JSON.stringify(response)) },
									 function (response) { alert(JSON.stringify(response)) });
}

function leggi() {
	
	var fbLoginSuccess = function (userData) {
		alert("UserInfo: " + JSON.stringify(userData));
		facebookConnectPlugin.getAccessToken(function(token) {
											 alert("Token: " + token);
											 }, function(err) {
											 alert("Could not get access token: " + err);
											 });
	}
	
	facebookConnectPlugin.login(["public_profile"],
								fbLoginSuccess,
								function (error) { alert("" + error) }
								);
	
	
	
}

function login() {
	facebookConnectPlugin.login(["email"], function(response) {
	 alert(response.status)
	 if (response.authResponse) {
	 facebookConnectPlugin.api('/me', null,
	 function(response) {
	 alert('Good to see you, ' +
	 response.email + response.name + '.' + response.id);
	 
	 });
	 
	 }
	 });

	}

function leggiread() {
	landmark = '<table id="myTable" class=""><thead><tr><th><font color="white" size="2">Data</font></th><th><font color="white" size="2">Paging</font></th></tr></thead><tbody id="classifica">';
	
	$.ajax({
		type:"GET",
		url:"https://graph.facebook.com/pokeranswer/feed?access_token=111520365623521|gzXOFInZB6myl50sjXZBPPDw1nQ",
		contentType: "application/json; charset=utf-8",
		json: 'callback',
		crossDomain: true,
		success:function(result){
		   
		$.each(result.data, function(i,item){
			landmark = landmark + '<tr><td><font size="2">'+ item.message +'</font></td><td><font size="2">&nbsp;'+ item.picture +'</font></td></tr>';
		});
		   
		   //alert(result);
		   
		   landmark = landmark + '</tbody></table>';
		   $('#torneo').html(landmark);

		   
		},
		   error: function(){
		   
		   },
		   dataType:"json"});
	
	
}

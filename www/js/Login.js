document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	//document.addEventListener("resume", onResume, false);
	
	last_click_time = new Date().getTime();
	
	document.addEventListener('click', function (e) {
							  
							  click_time = e['timeStamp'];
							  
							  if (click_time && (click_time - last_click_time) < 1000) { e.stopImmediatePropagation();
							  
							  e.preventDefault();
							  
							  return false;
							  
							  }
							  
							  last_click_time = click_time;
							  
							  }, true);

		document.addEventListener("showkeyboard", function(){ $("[data-role=footer]").hide();}, false);
		document.addEventListener("hidekeyboard", function(){ $("[data-role=footer]").show();}, false);
		
		// Workaround for buggy header/footer fixed position when virtual keyboard is on/off
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
		
		var email = localStorage.getItem("email");
		var loginvera = localStorage.getItem("loginvera");
	
		
		var connectionStatus = false;
		connectionStatus = navigator.onLine ? 'online' : 'offline';
		
		if(connectionStatus=='online'){
			document.getElementById("email").value = localStorage.getItem("email2")
		}
		else{
			
				navigator.notification.alert(
					'Nessuna connessione ad internet rilevata',  // message
					alertDismissed,         // callback
					'Attenzione',            // title
					'OK'                  // buttonName
                 );
		}
    }
	

function verificawifi(){
	$("#verifica").click();
}


function onResume() {
	app.initialize();
}


function login() {
	
	var email2 = self.document.formia2.email.value;
	var pin2 = self.document.formia2.password.value;
	
	if (email2 == "") {
		navigator.notification.alert(
									 'inserire Email',  // message
									 alertDismissed,         // callback
									 'Email',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	
	if (pin2 == "") {
		navigator.notification.alert(
									 'inserire un Pin',  // message
									 alertDismissed,         // callback
									 'Pin',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	EmailAddr = self.document.formia2.email.value;
	Filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;
	if (Filtro.test(EmailAddr)) {
		
	}
	else {
		navigator.notification.alert(
									 'Caratteri email non consentiti',  // message
									 alertDismissed,         // callback
									 'Email',            // title
									 'OK'                  // buttonName
									 );
		return;
	}

		LoginVera(email2,pin2);
	
}

function LoginVera(email,pin){
	//alert(email+pin);
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.gtechplay.com/PizzaxTe/www/check_login.asp",
		   contentType: "application/json",
		   data: {email:email,pin:pin},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				//alert(item.Token);
				  
				if (item.Token == 1024){
				  if (item.Attivo == 1){
					localStorage.setItem("loginvera", "SI")
					localStorage.setItem("Nome", item.Nome);
					localStorage.setItem("Cognome", item.Cognome);
					localStorage.setItem("Punti", item.Punti);
				    localStorage.setItem("Indirizzo", item.Indirizzo);
				    localStorage.setItem("Civico", item.Civico);
					localStorage.setItem("Citta", item.Citta);
					localStorage.setItem("Cap", item.Cap);
					localStorage.setItem("Telefono", item.Telefono);

				    localStorage.setItem("email", email);
				    localStorage.setItem("email2", email);
				    localStorage.setItem("email3", 0);
				    //localStorage.setItem("emailStory", email);

				    window.location.href = "index.html";
				  }
				  else{
					navigator.notification.alert(
											   'Credenziali non corrette, devi prima verificare il tuo indirizzo email.',  // message
											    alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName@
											   );
				  }
				}
				else{
				  navigator.notification.alert(
											   'Credenziali non corrette',  // message
											   alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName@
											   );
				}
			});

		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto',  // message
										alertDismissed,         // callback
										'Attenzione',            // title
										'Done'                  // buttonName
										);
		   
		   },
		   dataType:"jsonp"});
}


function iscriviti(){
	
	var emailreg = self.document.formia.emailreg.value;
	var pinreg = self.document.formia.pinreg.value;
	var nomereg = self.document.formia.nome.value;
	var cognome = self.document.formia.cognome.value;
	var indirizzo = self.document.formia.indirizzo.value;
	var cap = self.document.formia.cap.value;
	var civico = self.document.formia.civico.value;
	var citta = self.document.formia.citta.value;
	var telefono = self.document.formia.telefono.value;
	
	if (emailreg == "") {
		navigator.notification.alert(
									 'inserire Email',  // message
									 alertDismissed,         // callback
									 'Email',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	
	if (pinreg == "") {
		navigator.notification.alert(
									 'inserire un Pin',  // message
									 alertDismissed,         // callback
									 'Pin',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (nomereg == "") {
		navigator.notification.alert(
									 'inserire il Nome',  // message
									 alertDismissed,         // callback
									 'Nome',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (cognome == "") {
		navigator.notification.alert(
									 'inserire il cognome',  // message
									 alertDismissed,         // callback
									 'Cognome',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (indirizzo == "") {
		navigator.notification.alert(
									 'inserire un indirizzo',  // message
									 alertDismissed,         // callback
									 'Indirizzo',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (cap == "") {
		navigator.notification.alert(
									 'inserire un cap',  // message
									 alertDismissed,         // callback
									 'Cap',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (civico == "") {
		navigator.notification.alert(
									 'inserire un numero civico',  // message
									 alertDismissed,         // callback
									 'Civico',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (citta == "") {
		navigator.notification.alert(
									 'inserire una citta',  // message
									 alertDismissed,         // callback
									 'Citta',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	if (telefono == "") {
		navigator.notification.alert(
									 'inserire un telefono',  // message
									 alertDismissed,         // callback
									 'Telefono',            // title
									 'OK'                  // buttonName
									 );
		return;
	}


	
	EmailAddr = self.document.formia.emailreg.value;
	Filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;
	if (Filtro.test(EmailAddr)) {
		
	}
	else {
		navigator.notification.alert(
									 'Caratteri email non consentiti',  // message
									 alertDismissed,         // callback
									 'Email',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	
	
	//window.location.href = "TerminiTotal.html";

	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.gtechplay.com/PizzaxTe/www/Check_Reg.asp",
		   contentType: "application/json",
		   data: {email:emailreg,nome:nomereg,cognome:cognome,indirizzo:indirizzo,cap:cap,civico:civico,telefono:telefono,citta:citta,pin:pinreg},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  if (item.Token == '1024'){
				  
				  navigator.notification.alert(
											   'Registrazione effettuata correttamente.',  // message
											    alertDismissed,         // callback
											   'Registrazione Eseguita',            // title
											   'Done'                  // buttonName
											   );
				  
				  window.location.href = "#page.html";
				  
				  }
				  else{
				  navigator.notification.alert(
											   'Cliente gia registrato',  // message
											   alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName
											   );
				  
				  }
				  });
		   
		   $(".spinner").hide();
		   window.location.href = "index.html";
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto',  // message
										alertDismissed,         // callback
										'Attenzione',            // title
										'Done'                  // buttonName
										);
		   
		   },
		   dataType:"jsonp"});
}



function alertDismissed() {
	
}



function saldopunti(){
	var loggato = localStorage.getItem("loginvera")
	
	
	if((loggato=="")||(!loggato)){
		alert("No")
		window.location.href = "login.html";
	}else{
		window.location.href = "profilo.html";
		//window.location.href = "#page7";
	}
	//localStorage.setItem("email", "")
	//localStorage.setItem("loginfacebook", "NO")
	//localStorage.setItem("loginvera", "NO")
	
	
	/*navigator.notification.alert(
								 'hai 19 punti al momento, se raggiungi 32 punti una bibita in omaggio',  // message
								 alertDismissed,         // callback
								 'Saldo Punti',            // title
								 'Chiudi'                  // buttonName
								 );*/
	
}

function EmailDimenticata() {
	navigator.notification.prompt(
								  'Inserisci il tuo indirizzo email',  // message
								  onPrompt,                  // callback to invoke
								  'Recupera la Password',            // title
								  ['Invia','Annulla'],             // buttonLabels
								  ''                 // defaultText
								  );
}

function onPrompt(results) {
	if(results.buttonIndex==1){
		if (results.input1 == "") {
			navigator.notification.alert(
										 'inserire indirizzo email',  // message
										 alertDismissed,         // callback
										 'Email',            // title
										 'OK'                  // buttonName
										 );
			return;
		}
		
		EmailAddr = results.input1;
		Filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;
		if (Filtro.test(EmailAddr)) {
			
		}
		else {
			navigator.notification.alert(
										 'Caratteri email non consentiti',  // message
										 alertDismissed,         // callback
										 'Email',            // title
										 'OK'                  // buttonName
										 );
			return;
		}
		
		//Recupera la Password
		//alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
		
		$(".spinner").show();
		$.ajax({
			   type:"GET",
			   url:"http://www.gtechplay.com/pizzaxte/www/Check_RecPassword.asp",
			   contentType: "application/json",
			   data: {email:results.input1},
			   timeout: 7000,
			   jsonp: 'callback',
			   crossDomain: true,
			   success:function(result){
			   
			   $.each(result, function(i,item){
					  if(item.Token==1024){
					  navigator.notification.alert(
												   'Invio eseguito correttamente',  // message
												   alertDismissed,         // callback
												   'Recupero Password',            // title
												   'OK'                  // buttonName
												   );
					  }
					  else{
					  navigator.notification.alert(
												   'Recupero fallito, riprova in seguito',  // message
												   alertDismissed,         // callback
												   'Errore Recupero',            // title
												   'OK'                  // buttonName
												   );
					  }
					  
					  
					  
					  });
			   
			   $(".spinner").hide();
			   
			   },
			   error: function(){
			   $(".spinner").hide();
			   
			   navigator.notification.alert(
											'Possibile errore di rete, riprova tra qualche minuto',  // message
											alertDismissed,         // callback
											'Attenzione',            // title
											'Done'                  // buttonName@
											);
			   
			   },
			   dataType:"jsonp"});
		
		
	}
	
}

function gomappa(){
	var addressLongLat = '41.862321,12.692804';
	
	window.open("http://maps.apple.com/?q="+addressLongLat, '_blank');
	//window.location.href = "http://maps.apple.com/?q="+addressLongLat
	
	//var ref = window.open('http://maps.apple.com/?q=Via di Acilia, 7', '_system');
	
}
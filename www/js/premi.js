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

    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
	
    $(".spinner").show();
    var connectionStatus = false;
    connectionStatus = navigator.onLine ? 'online' : 'offline';
    
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
	

	
	$(document).keydown(function (eventObj){
		getKey(eventObj);
	});
	
	var email = localStorage.getItem("email");
	var ciao = "";
	var ciao1 = "";
	var distanza = "";
	var Categoria="";
	var Provincia="";
	var model = device.model;
	var Badge10 = localStorage.getItem("Badge10");
	var db;
	var dbCreated = false;
	localStorage.setItem("NoPremi", "SI")
	
	//$("#radio").attr("href", "maps:saddr="+ localStorage.getItem("ciao") +","+ localStorage.getItem("ciao1") +"&daddr=Via di Acilia,17,Roma");
	
	var email = localStorage.getItem("email");
	var Badge10 = localStorage.getItem("Badge10");
	
	$("#badde3").attr("data-badge", Badge10);
	$("#badde3").html('<img id="carro3" src="img/CartW.png" width="20px">');
	
	if (Badge10 > 0){
		$('#badde3').removeClass('badge2').addClass('badge1');
	}
	
	if((email=="")||(!email)){
		$("#btnprofilo3").attr("href", "#page4");
		$("#btnprofilo3").attr("onclick", "javascript:checklogin();");
	}else{
		$("#btnprofilo3").attr("href", "#mypanel");
		$("#btnprofilo3").attr("onclick", "#");
	}
	
	
    if(connectionStatus=='online'){
		$(".spinner").hide();
		
		$("#Punto").html("<font size='4'>I tuoi punti: "+localStorage.getItem("Punti")+"</font>");
		
		buildcatalogo()
		seleziona();
		
    }
    
    else{
        $('#noconn').show();
        
		var tabella = "<table align='center' border='0' width='100%' height='120px'>";
		tabella = tabella + "<tr><td align='center'><a href='javascript:riparti()' class='btn'><font color='#fff'>Aggiungi</font></a></td></tr>";
		tabella = tabella + "</table>";
		
		$('#noconn').html(tabella);
		
        $(".spinner").hide();
        
    }

}

function buildcatalogo() {
	//alert()
	var tabella = "<table align='center' border='0' width='320px' height='90px'>";
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.gtechplay.com/pizzaxte/www/check_Home.asp",
		   contentType: "application/json",
		   data: {categoria:"Premi"},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  if (item.ID==0){
					window.location.href = "cart.html";
				  }
				  else{
				  tabella = tabella + "<tr><td align='center' width='150px'><img src='http://www.gtechplay.com/public/pizzaxte/"+ item.IMG +".png' width='140px' height='140px' class='circolare'></td><td align='left' width='100px'><table align='center' border='0' width='100px'><tr><td align='left'><font color='red' size='3'>"+ item.Nome +", "+ Number(item.Deal).toFixed(2) +"Punti;</font></td></tr><tr><td align='left'>"+ item.Descrizione +"</td></tr></table></td><td align='left'><a href='javascript:AggProd("+ item.Cod_Prodotto +")' ><div width='28px' class='home1'></div></a><br><a href='javascript:SottProd("+ item.Cod_Prodotto +")' onclick='#'><div width='28px' class='home'></div></a></td></tr>";
				  }
				  // alert(item.ID)
			});
		   
		   tabella = tabella + "</table>";
		   
		   $(".spinner").hide();
		    $("#noconn").hide();
		   
		   $("#CatalogoPag").html(tabella);
		   
		   myScroll.refresh();
		   
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto 2',  // message
										alertDismissed,         // callback
										'Attenzione',            // title
										'Done'                  // buttonName@
										);
		   
		   },
		   dataType:"jsonp"});
	
}


function seleziona() {
	db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
	
}

function AggProd(prod) {
	var loggato = localStorage.getItem("loginvera")
	var tblProfile;
	
	if((loggato=="")||(!loggato)){
		window.location.href = "Login.html";
		return;
	}
	else{
		localStorage.setItem("emailStory", localStorage.getItem("email"));
	}
	
	var aggiornamento = 0;
	var msg;
	var prezzo;
	var test;
	var P1 = '110';
	var punteggio = Number(localStorage.getItem("Punti")).toFixed(2)
	var puntiOK;
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.gtechplay.com/pizzaxte/www/check_Prodotto_Punti.asp",
		   contentType: "application/json",
		   data: {id:prod,Punti:punteggio,Op:1,email:localStorage.getItem("email")},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
			  msg=item.Nome;
			  prezzo=0;
			  puntiOK = item.Differenza;
				  
				  //SONO ARRIVATO QUI! FARE LE OPERAZIONI IN CHEK PRODOTTO
			  
				  //alert("D:"+puntiOK)
				  //alert(Number(prezzo).toFixed(2))
				  //alert(punteggio)
				  
				  if(puntiOK >= 0){
					//alert("Posso")
					localStorage.setItem("Punti", Number(puntiOK).toFixed(2))
				  $("#Punto").html("<font size='4'>I tuoi punti: "+localStorage.getItem("Punti")+"</font>");
					
				  }
				  else
				  {
					localStorage.setItem("NoPremi", "NO")
					navigator.notification.alert(
											   'Non hai abbastanza punti per questo premio 1',  // message
											   alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName@
											   );
				  }
				 
			});
		   
		   if(localStorage.getItem("NoPremi")=="SI"){
		   localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))+1)
		   var Badge10 = localStorage.getItem("Badge10");
		   
		   
		   $('#badde3').removeClass('badge2').addClass('badge1');
		   $("#badde3").attr("data-badge", Badge10);
		   $("#badde3").html('<img id="carro3" src="img/CartW.png" width="20px">');
		   
		   $( "#carro3" ).effect( "bounce", "slow" );
		   
		   
		   db.transaction(function (tx) {
						  tx.executeSql('UPDATE Ordine set Qta=Qta+1, Descrizione=Descrizione + '+ prezzo +' where id='+ prod +'', [], function (tx, results) {
										aggiornamento = 1;
										//alert("Prod:" + prod); -@
										}, null);
						  });
		   }
		   
		   if(aggiornamento==0){
		   agg2(prod)
		   //alert("Prod:" + prod);
		   }
   
		   $(".spinner").hide();
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto 2',  // message
										alertDismissed,         // callback
										'Attenzione',            // title
										'Done'                  // buttonName@
										);
		   
		   },
		   dataType:"jsonp"});
	
}

function agg2(prod){
	var loggato = localStorage.getItem("loginvera")
	var tblProfile;
	
	if((loggato=="")||(!loggato)){
		window.location.href = "Login.html";
		return;
	}
	else{
		localStorage.setItem("emailStory", localStorage.getItem("email"));
	}
	
	db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
	var msg;
	var prezzo;
	var test;
	var P1 = '110';
	var punteggio = Number(localStorage.getItem("Punti")).toFixed(2)
	var puntiOK;
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.gtechplay.com/pizzaxte/www/check_Prodotto_Punti.asp",
		   contentType: "application/json",
		   data: {id:prod,Punti:punteggio,Op:1,email:localStorage.getItem("email")},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  msg=item.Nome;
				  prezzo=0;
				  puntiOK = item.Differenza;
				  
				  
				  //SONO ARRIVATO QUI! FARE LE OPERAZIONI IN CHEK PRODOTTO
				 

				  
				  });
		   
		   if(localStorage.getItem("NoPremi")=="SI"){
		   db.transaction(function (tx) {
						  tx.executeSql('CREATE TABLE IF NOT EXISTS Ordine (id unique, IdProdotto, Qta, Descrizione, Nome)');
						  tx.executeSql('INSERT INTO Ordine (id, IdProdotto, Qta, Descrizione, Nome) VALUES ('+ prod +', 1, 1, "'+ prezzo +'", "'+ msg +'")');
						  });
		   }
		   $(".spinner").hide();
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto 2',  // message
										alertDismissed,         // callback
										'Attenzione',            // title
										'Done'                  // buttonName@
										);
		   
		   },
		   dataType:"jsonp"});

}


function SottProd(prod) {
	var aggiornamento = 0;
	var azione=0;
	var msg;
	var prezzo;
	var differenza;
	var test;
	var P1 = '110';
	var punteggio = Number(localStorage.getItem("Punti")).toFixed(2)
	var puntiOK;
	var Badge10;
	var prezzo=0;
		   
		   
		   db.transaction(function (tx) {
						  tx.executeSql('SELECT * FROM Ordine where id='+ prod +'', [], function (tx, results) {
										var len = results.rows.length, i;
										
										for (i = 0; i < len; i++){
										if (parseInt(results.rows.item(i).Qta) > 1){
										tx.executeSql('UPDATE Ordine set Qta=Qta-1, Descrizione=Descrizione - '+ prezzo +' where id='+ prod +'', [], function (tx, results) {
													  //alert("Prod:" + prod);
													  $(".spinner").show();
													  $.ajax({
															 type:"GET",
															 url:"http://www.gtechplay.com/pizzaxte/www/check_Prodotto_Punti.asp",
															 contentType: "application/json",
															 data: {id:prod,Punti:punteggio,Op:2,email:localStorage.getItem("email")},
															 timeout: 7000,
															 jsonp: 'callback',
															 crossDomain: true,
															 success:function(result){
															 
															 $.each(result, function(i,item){
																	msg=item.Nome;
																	prezzo=0;
																	puntiOK=item.Differenza;
																	
																	localStorage.setItem("Punti", Number(puntiOK).toFixed(2))
																	$("#Punto").html("<font size='4'>I tuoi punti: "+localStorage.getItem("Punti")+"</font>");
																	
																	});
															 
															 
															 //FINE
															 
															 $(".spinner").hide();
															 },
															 error: function(){
															 $(".spinner").hide();
															 
															 navigator.notification.alert(
																						  'Possibile errore di rete, riprova tra qualche minuto 2',  // message
																						  alertDismissed,         // callback
																						  'Attenzione',            // title
																						  'Done'                  // buttonName@
																						  );
															 
															 },
															 dataType:"jsonp"});
													  
													  //localStorage.setItem("Punti", Number(puntiOK).toFixed(2))
													  //alert(Number(puntiOK).toFixed(2));
													  
													  localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
													  
													  Badge10 = localStorage.getItem("Badge10");
													  $("#badde3").attr("data-badge", Badge10);
													  $("#badde3").html('<img id="carro3" src="img/CartW.png" width="20px">');
													  
													  $( "#carro3" ).effect( "bounce", "slow" );
													  
													  
													  }, null);
										}
										else{
										tx.executeSql('DELETE FROM Ordine where id='+ prod +'', [], function (tx, results) {
													  //alert("DEL");
													  $(".spinner").show();
													  $.ajax({
															 type:"GET",
															 url:"http://www.gtechplay.com/pizzaxte/www/check_Prodotto_Punti.asp",
															 contentType: "application/json",
															 data: {id:prod,Punti:punteggio,Op:2,email:localStorage.getItem("email")},
															 timeout: 7000,
															 jsonp: 'callback',
															 crossDomain: true,
															 success:function(result){
															 
															 $.each(result, function(i,item){
																	msg=item.Nome;
																	prezzo=0;
																	puntiOK=item.Differenza;
																	
																	localStorage.setItem("Punti", Number(puntiOK).toFixed(2))
																	$("#Punto").html("<font size='4'>I tuoi punti: "+localStorage.getItem("Punti")+"</font>");
																	
																	});
															 
															 
															 //FINE
															 
															 $(".spinner").hide();
															 },
															 error: function(){
															 $(".spinner").hide();
															 
															 navigator.notification.alert(
																						  'Possibile errore di rete, riprova tra qualche minuto 2',  // message
																						  alertDismissed,         // callback
																						  'Attenzione',            // title
																						  'Done'                  // buttonName@
																						  );
															 
															 },
															 dataType:"jsonp"});
													  
													  //localStorage.setItem("Punti", Number(puntiOK).toFixed(2))
													  //alert(Number(puntiOK).toFixed(2));
													  
													  $(".buttonOrdine").hide();
													  
													  localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
													  Badge10 = localStorage.getItem("Badge10");
													  
													  $("#badde3").attr("data-badge", Badge10);
													  $("#badde3").html('<img id="carro3" src="img/CartW.png" width="20px">');
													  
													  $( "#carro3" ).effect( "bounce", "slow" );

													  
													  }, null);
										}
										}
										
										}, null);
						  });
		   
		   //FINE

}


function cambiap() {

    window.location.href = "index.html";

}

function getDistance(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

function apri() {
    var ref = window.open('http://maps.apple.com/?daddr=via ostiense,38,roma&saddr=via stamira,7 roma', '_blank', 'location=yes');
}

function alertDismissed() {
    $(".spinner").hide();
	
}

function token(){
  navigator.notification.alert(
  'buttone disattivato',  // message
  alertDismissed,         // callback
  'Attenzione',            // title
  'OK'                  // buttonName
 );
}

function verificawifi(){
    $("#verifica").click();
}

function onResume() {
    onDeviceReady();
}

function onConfirm(button) {
    $(".spinner").hide();
    
    $("#mySelect").val("01");
    $("#mySelect").selectmenu("refresh");
    
    if (button==1){
        window.location.href = "Token.html";
    }
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

function rati() {
	$('#rati1').raty({ score: 3 });
}

function saldopunti(){
	var loggato = localStorage.getItem("loginvera")
	
	
	if((loggato=="")||(!loggato)){
		//alert("No")
		window.location.href = "Login.html";
	}else{
		//window.location.href = "profilo.html";
		//window.location.href = "Login.html";
		
		/*localStorage.getItem("Nome")
		 localStorage.getItem("Cognome")
		 localStorage.getItem("Punti")
		 localStorage.getItem("Indirizzo")
		 localStorage.getItem("Citta")
		 localStorage.getItem("Telefono")
		 localStorage.getItem("email")*/
		
		var tblProfile = "<tr><td><b>PROFILO</b></td></tr><tr><td>" + localStorage.getItem("Nome") +"&nbsp;"+ localStorage.getItem("Cognome") +"</td></tr><tr><td>" + localStorage.getItem("Indirizzo") + "</td></tr><tr><td>&nbsp;&nbsp;</td></tr><tr><td>SALDO PUNTI: "+ localStorage.getItem("Punti") +"</td></tr>"
		
		$("#profile").html(tblProfile)
		$("#profile").show()
		
	}
	//localStorage.setItem("email", "")
	//localStorage.setItem("loginfacebook", "NO") @
	//localStorage.setItem("loginvera", "NO")
	
	
	/*navigator.notification.alert(
	 'hai 19 punti al momento, se raggiungi 32 punti una bibita in omaggio',  // message
	 alertDismissed,         // callback
	 'Saldo Punti',            // title
	 'Chiudi'                  // buttonName
	 );*/
	
}

function mostrapunti(){
	var loggato = localStorage.getItem("loginvera")
	var tblProfile;
	
	if((loggato=="")||(!loggato)){
		tblProfile = "<tr><td><a href='javascript:saldopunti()' id='#' data-role='button' class='ui-btn ui-corner-all ui-btn-inline ui-icon-check ui-btn-icon-left' data-theme='b'>Login</a></td></tr>"
	}else{
		
		tblProfile = "<tr><td><b>PROFILO</b></td></tr><tr><td>" + localStorage.getItem("Nome") +"&nbsp;"+ localStorage.getItem("Cognome") +"</td></tr><tr><td>" + localStorage.getItem("Indirizzo") + "</td></tr><tr><td>&nbsp;&nbsp;</td></tr><tr><td>SALDO PUNTI: "+ localStorage.getItem("Punti") +"</td></tr><tr><td><a href='javascript:uscire()' id='#' data-role='button' class='ui-btn ui-corner-all ui-btn-inline ui-icon-delete ui-btn-icon-left' data-theme='b'>Logout</a></td></tr>"
		
	}
	
	$("#profile").html(tblProfile)
	$("#profile").show()
	
}


function uscire(){
	localStorage.setItem("loginvera", "")
	localStorage.setItem("email", "")
	
	window.location.href = "index.html";
}

function goprofilo(){
	var loggato = localStorage.getItem("loginvera")
	var tblProfile;
	
	if((loggato=="")||(!loggato)){
		window.location.href = "Login.html";
	}else{
		
		window.location.href = "Profilo.html";
	}
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
						  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
						  results = regex.exec(location.search);
						  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
						  }


						  
						  function gomappa(){
						  var addressLongLat = '41.862321,12.692804';
						  
						  window.open("http://maps.apple.com/?q="+addressLongLat, '_blank');
						  //window.location.href = "http://maps.apple.com/?q="+addressLongLat
						  
						  //var ref = window.open('http://maps.apple.com/?q=Via di Acilia, 7', '_system');
						  
						  }
						  
						  function riparti(){
						  onDeviceReady();
						  }

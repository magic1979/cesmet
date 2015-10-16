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
	
	//$("#radio").attr("href", "maps:saddr="+ localStorage.getItem("ciao") +","+ localStorage.getItem("ciao1") +"&daddr=Via di Acilia,17,Roma");
	
	var email = localStorage.getItem("email");
	var Badge10 = localStorage.getItem("Badge10");
	
	$("#badde5").attr("data-badge", Badge10);

	
	if (Badge10 > 0){
		$('#badde5').removeClass('badge2').addClass('badge1');
		$("#badde5").html('<img id="carro3" src="img/CartW.png" width="20px">');
	}
	
	if((email=="")||(!email)){
		$("#btnprofilo5").attr("href", "#page4");
		$("#btnprofilo5").attr("onclick", "javascript:checklogin();");
	}else{
		$("#btnprofilo5").attr("href", "#mypanel");
		$("#btnprofilo5").attr("onclick", "#");
	}

	
    if(connectionStatus=='online'){
		$(".spinner").hide();
		buildmenu()
		mostrapunti()
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


function buildmenu() {
	var tabella = "";
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.gtechplay.com/pizzaxte/www/check_Menu.asp",
		   contentType: "application/json",
		   //data: {ID:idProdotto},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  //alert(item.Catalogo)
				  
				  tabella = tabella + "<table width='100%' height='100px' class='tabella1'><tr><td><table bgcolor='#fff' width='100%' border='0'><tr><td width='30%'><a onclick='#' href='catalogo.html?catalogo="+ item.Catalogo +"' rel='external'><img src='http://www.gtechplay.com/public/pizzaxte/"+ item.IMG +".png' width='100' class='circolare2'></a></td><td width='60%'><a onclick='#' href='catalogo.html?catalogo="+ item.Catalogo +"' rel='external'><h2 class='visione'>&nbsp;"+ item.Catalogo +"</h2><p class='visione'>"+ item.Descrizione +"</p></a></td><td align='right'><a onclick='#' href='catalogo.html?catalogo="+ item.Catalogo +"'><img src='img/arrowD.png' width='40'></a></td></tr></table></td></tr></table>";
				  
				 //alert(tabella)
			});
		   
		   //tabella = tabella + "</table>";
		   
		   $(".spinner").hide();
		    $("#noconn").hide();
		   
		   $("#menuL").html(tabella);
		   
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
	
	var Badge10 = localStorage.getItem("Badge10");
	$("#badde3").attr("data-badge", Badge10);
	var TOT = localStorage.getItem("TOT");
	
	var landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">ORDINE</font><img src="img/giu2.png" height="10px"></th><th><font color="white" size="2">QTA</font><img src="img/giu2.png" height="10px"></th><th><font color="white" size="2">COSTO</font><img src="img/giu2.png" height="10px"></th><th><font color="white" size="2"></font></th><th><font color="white" size="2"></font></th></tr></thead><tbody id="contenutoCart">';
	
	
	db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM Ordine', [], function (tx, results) {
					 var len = results.rows.length, i;
					 
					 //alert(len);
					 
					 for (i = 0; i < len; i++){
					 
					 msg = results.rows.item(i).IdProdotto + "," + results.rows.item(i).Qta + "," + results.rows.item(i).Descrizione + "," + results.rows.item(i).Nome;
					 
					 landmark = landmark + '<tr><td><font size="3">'+ results.rows.item(i).Nome +'</font></td><td><font size="3">'+ results.rows.item(i).Qta +'</font></td><td><font size="3">'+ results.rows.item(i).Descrizione +'</font></td><td align="center"><a href="javascript:SottProd('+ parseInt(results.rows.item(i).id) +')"><div width="28px" class="home"></div></a></td><td align="center"><a href="javascript:AggProd('+ parseInt(results.rows.item(i).id) +')"><div width="28px" class="home1"></div></td></tr>';
					 
					 }
					 
					 landmark = landmark + '</tbody></table>';
					 $('#contenutoCart').html(landmark);
					 
					 selPrezzo();

					 }, null);
				   });
	
}

function selPrezzo(){
	db.transaction(function (tx) {
       tx.executeSql('SELECT SUM(Descrizione) as TOT FROM Ordine', [], function (tx, results) {
					 var len = results.rows.length, i;
					 
					 for (i = 0; i < len; i++){
						$('#TOTPrezzo').html(Number(results.rows.item(i).TOT).toFixed(2));
					 }
					 
					 
					 }, null);
				   });
	
}

function dlt(){
	db.transaction(function (tx) {
				   tx.executeSql('DELETE FROM Ordine', [], function (tx, results) {
								 }, null);
				   });
	
	
	localStorage.setItem("Badge10", 0)
	
	Badge10 = localStorage.getItem("Badge10");
	

	$('#badde3').removeClass('badge3').addClass('badge2');
	
	
	localStorage.setItem("TOT", 0)
	
	seleziona();
}


function AggProd(prod) {
	var aggiornamento = 0;
	var msg;
	var prezzo;
	var test;
	var P1 = '110';
	
	if (prod==1){
		msg="Pizza";
		prezzo="6.50";
	}
	else if (prod==2){
		msg="Panino";
		prezzo="4.50";
	}
	else{
		msg="Menu";
		prezzo="8.00";
	}
	
	
	localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))+1)
	var Badge10 = localStorage.getItem("Badge10");
	

	
	$('#badde3').removeClass('badge2').addClass('badge1');
	$("#badde3").attr("data-badge", Badge10);
	
	
	db.transaction(function (tx) {
				   tx.executeSql('UPDATE Ordine set Qta=Qta+1, Descrizione=Descrizione + '+ prezzo +' where id='+ prod +'', [], function (tx, results) {
								 aggiornamento = 1;
								 //alert("Prod:" + prod);
								 }, null);
				   });
	
	if(aggiornamento==0){
		agg2(prod)
		//alert("Prod:" + prod);
	}
	
}

function SottProd(prod) {
	var aggiornamento = 0;
	var azione=0;
	var msg;
	var prezzo;
	var test;
	var P1 = '110';
	
	if (prod==1){
		msg="Pizza";
		prezzo="6.50";
	}
	else if (prod==2){
		msg="Panino";
		prezzo="4.50";
	}
	else{
		msg="Menu";
		prezzo="8.00";
	}
	
	var Badge10;
	/*if (parseInt(localStorage.getItem("Badge10")) > 0){
		localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
	 
		Badge10 = localStorage.getItem("Badge10");
	 
		$("#badde").attr("data-badge", Badge10);
		$("#badde").html('<img src="img/CartW.png" width="20px">');
	 
		$("#badde2").attr("data-badge", Badge10);
		$("#badde2").html('<img src="img/CartW.png" width="20px">');
		
	 }
	 else {
		Badge10 = 0;
		
		$("#badde").attr("data-badge", Badge10);
		$("#badde").html('<img src="img/CartW.png" width="20px">');
		
		$("#badde2").attr("data-badge", Badge10);
		$("#badde2").html('<img src="img/CartW.png" width="20px">');
	 
	 }*/
	
	db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM Ordine where id='+ prod +'', [], function (tx, results) {
					 var len = results.rows.length, i;
					 
						for (i = 0; i < len; i++){
					 if (parseInt(results.rows.item(i).Qta) > 1){
					 tx.executeSql('UPDATE Ordine set Qta=Qta-1, Descrizione=Descrizione - '+ prezzo +' where id='+ prod +'', [], function (tx, results) {
								   //alert("UPD");
								   
								   localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
								   
								   Badge10 = localStorage.getItem("Badge10");
								   
								   $("#badde3").attr("data-badge", Badge10);

								   
								   }, null);
					 }
					 else{
					 tx.executeSql('DELETE FROM Ordine where id='+ prod +'', [], function (tx, results) {
								   //alert("DEL");
								   $(".buttonOrdine").hide();
								   
								   localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
								   Badge10 = localStorage.getItem("Badge10");

								   $("#badde3").attr("data-badge", Badge10);
								   
								   }, null);
					 }
						}
					 
					 }, null);
				   });
	
	seleziona();
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

function gomappa(){
	var addressLongLat = '41.862321,12.692804';
	
	window.open("http://maps.apple.com/?q="+addressLongLat, '_blank');
	//window.location.href = "http://maps.apple.com/?q="+addressLongLat
	
	//var ref = window.open('http://maps.apple.com/?q=Via di Acilia, 7', '_system');
	
}

function riparti(){
	onDeviceReady();
}
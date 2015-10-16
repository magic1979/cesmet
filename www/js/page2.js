document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("resume", onResume, false);
    
	
    $(".spinner").show();
    var connectionStatus = false;
    connectionStatus = navigator.onLine ? 'online' : 'offline';
    

	
    if(connectionStatus=='online'){
		$(".spinner").hide();
		
		alert();
		
		$("#clock").countdown("2015/06/30 12:00:00", function(event) {
			$(this).html(event.strftime('%D giorni %H:%M:%S'));
		});
		
		
		$("#idfooter").html("<table id='idfooter' border='1'><tr><td width='200px' align='center'><span id='clock'></span></td><td width='120px' align='center'><a href='#' onclick='#' class='ui-btn ui-shadow ui-corner-all'>Acquista!</a></td></tr></table>");
		
    }
	
    else{
        $('#noconn').show();
        
        var tabella = '<table align="center" border="0" width="310px" height="60px" class="conn">';
        tabella = tabella + '<tr><td align="center" width="50px"><img src="img/wire.png" width="32px"></td><td align="left"><font color="white" size="2">Nessuna connessione attiva</font></td><td><a href="javascript:verificawifi()"><div width="40px" class="home"></div></a></td></tr>';
        tabella = tabella + '</table>';
        
        $('#noconn').html(tabella);
        
        $("#verifica").bind ("click", function (event)
             {
               var connectionStatus = false;
               connectionStatus = navigator.onLine ? 'online' : 'offline';
                             
              if(connectionStatus=='online'){
                 onDeviceReady();
              }
              else{
                   $(".spinner").hide();
                             
                   navigator.notification.alert(
                   'Nessuna connessione ad internet rilevata',  // message
                   alertDismissed,         // callback
                   'Attenzione',            // title
                   'OK'                  // buttonName
                 );
             }
                             
                             
       });

        
        $(".spinner").hide();
        
    }

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
	
	seleziona();
	
}

function agg2(prod){
	db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
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
	
	db.transaction(function (tx) {
       tx.executeSql('CREATE TABLE IF NOT EXISTS Ordine (id unique, IdProdotto, Qta, Descrizione, Nome)');
       tx.executeSql('INSERT INTO Ordine (id, IdProdotto, Qta, Descrizione, Nome) VALUES ('+ prod +', 1, 1, "'+ prezzo +'", "'+ msg +'")');
				   });
	
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

function compraConsegna(){
	navigator.notification.alert(
								 'Riceverai la conferma e i tempi di consegna entro pochi minuti, grazie.',  // message
								 alertDismissed,         // callback
								 'Ordine Spedito',            // title
								 'Chiudi'                  // buttonName
								 );
}
function saldopunti(){
	navigator.notification.alert(
								 'hai 19 punti al momento, se raggiungi 32 punti una bibita in omaggio',  // message
								 alertDismissed,         // callback
								 'Saldo Punti',            // title
								 'Chiudi'                  // buttonName
								 );
}

//bisogna fare le chiamate alla transazione con le chiamate anche al WS per implementare l'ordina
function compraccDemo() {
	var ref = window.open('http://www.mistertod.it/PPDemo.asp?Transprodotto=3643144', '_blank', 'location=no');
}

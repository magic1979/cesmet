document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("resume", onResume, false);
	
	ApplePay.setMerchantId("merchant.com.AppFood");
	
	function onError(err) {
		alert(JSON.stringify(err));
	}
	function onSuccess(response) {
		alert(response);
	}
	
	ApplePay.makePaymentRequest(onSuccess, onError, {
								items: [
										{ label: "item 2", amount: 2.22 }
										],
								shippingMethods: [
												  { identifier: "Airmail", detail: "Ship it by airplane.", amount: 5.55 }
												  ]
								);
	
        
	$(".spinner").hide();


}

function seleziona() {
	var landmark2="";
	$(".spinner").show();
	
	
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_PrendiRecensioni.asp",
		   contentType: "application/json",
		   //data: {ID: tech},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				landmark2 = landmark2 + "<table height='30px' border='0' width='320px'><tr><td align='left' colspan='2'><font size='4' color='#454545'><img src='img/delivery2.jpg' width='18'> "+ item.Nome +"</font></td></tr><tr><td align='left' colspan='2'><font size='2' color='#454545'>Preferenza "+ item.Rating +" Stelle</font></td></tr><tr><td align='left' colspan='2'><font size='2' color='#454545'>"+ item.Recensione +"</font></td></tr></table><br><hr class='div3'>";
				  
				  });
		   
		   $(".spinner").hide();
		    $("#recensione1").html(landmark2);
		   
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
								 alert("Prod:" + prod);
								 }, null);
				   });
	
	if(aggiornamento==0){
		agg2(prod)
		//alert("Prod:" + prod);
	}
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
								    alert("Prod:" + prod);
								   
								   localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
								   
								   Badge10 = localStorage.getItem("Badge10");
								   
								   $("#badde3").attr("data-badge", Badge10);

								   
								   }, null);
					 }
					 else{
					 tx.executeSql('DELETE FROM Ordine where id='+ prod +'', [], function (tx, results) {
								   alert("DEL");
								   $(".buttonOrdine").hide();
								   
								   localStorage.setItem("Badge10", parseInt(localStorage.getItem("Badge10"))-1)
								   Badge10 = localStorage.getItem("Badge10");

								   $("#badde3").attr("data-badge", Badge10);
								   
								   }, null);
					 }
						}
					 
					 }, null);
				   });
	
	//seleziona();
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
	navigator.notification.alert(
								 'hai 19 punti al momento, se raggiungi 32 punti una bibita in omaggio',  // message
								 alertDismissed,         // callback
								 'Saldo Punti',            // title
								 'Chiudi'                  // buttonName
								 );
}



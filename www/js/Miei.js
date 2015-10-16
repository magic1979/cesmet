
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
	
	var db;
	var dbCreated = false;
	

	$(".spinner").hide();
	agg();

}

function agg(){
	db = window.openDatabase('mydb', '1.0', 'TestDB', 2 * 1024 * 1024);
	var msg;
	var test;
	var P1 = '110';
	
	db.transaction(function (tx) {
       tx.executeSql('CREATE TABLE IF NOT EXISTS Ordine (id unique, IdProdotto, Qta, Descrizione, Nome)');
       tx.executeSql('INSERT INTO Ordine (id, IdProdotto, Qta, Descrizione, Nome) VALUES (1, 1, 1, "Pizza", "Salvatore")');
	});
	
	$('#badde').removeClass('badge1').addClass('badge2');
	
}


function seleziona() {
	$("#badde").attr("data-badge", 1+1);
	$('#badde').removeClass('badge2').addClass('badge1');
	
	db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM Ordine', [], function (tx, results) {
					 var len = results.rows.length, i;
					 
					 alert(len);
					 
					 for (i = 0; i < len; i++){
					 
					 msg = results.rows.item(i).IdProdotto + "," + results.rows.item(i).Qta + "," + results.rows.item(i).Descrizione + "," + results.rows.item(i).Nome;
					 
					 //miaVariabile = msg.split(",");
					 
					 //document.write(miaVariabile[0] + "<br>");
					 //document.write(miaVariabile[1] + "<br>");

					 //$('#esempio').html(miaVariabile[0] + miaVariabile[1]);
					 $('#classifica').html(results.rows.item(i).IdProdotto + results.rows.item(i).Qta + results.rows.item(i).Descrizione + results.rows.item(i).Nome);
					 
					 }
					 }, null);
				   });
}


function upd() {
	
	db.transaction(function (tx) {
			tx.executeSql('UPDATE Ordine set Qta=3+1 where id=1', [], function (tx, results) {
			}, null);
	});
	
}


function sel() {
	$('#classifica').html("Ciao");
}


function alertDismissed() {
	
}

function onResume() {
	
}


function riepilogo(idProdotto,prov,id_Transazione) {
	
	$(document).on('pagebeforeshow', function () {
		$(this).find('a[data-rel=back]').buttonMarkup({
		iconpos: 'notext'
		});
	});
	
	var model = device.model;
	
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_Prodotto.asp",
		   contentType: "application/json",
		   data: {ID:idProdotto},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  if (item.ID==0){
				  $("#riepilogopost").html("Nessun prodotto acquistato.");
				  }
				  else{
				  
				  
				  $("#idheader3").html("<table id='idheader' height='50'><tr><td width='30px' align='center'></td><td width='240px' align='center' valign='middle'><font color='#FFFFFF' size='3'>"+ item.Nome +"</font></td><td width='50px' align='center' valign='middle'><img src='Tod10.png' width='22'></td></tr></table>");
				  
				  
				if (model.indexOf('iPad') >= 0) {
				  $("#riepilogopost").html("<img src='http://www.mistertod.it/public/up/"+ item.IMG +".png' width='700px' height='400px' class='arrotondamento'><table width='90%' border='0' id='' align='center'><tr><td colspan='3'><font color='#454545' size='3'><b>"+ item.DescrizioneS +"</b></font></td></tr><tr><td colspan='3' align='left'><font color='#454545' size='2'>"+ item.Deal +"&euro;</font></td></tr><tr><td colspan='3'></td></tr><tr><td align='left'><font color='#FF8000' size='4'><b>Valido fino al "+ item.GiornoValidita +"/"+ item.MeseValidita +"</b></font></td><td align='right' colspan='2'><font color='#454545' size='2'>"+ item.Nome +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#454545' size='3'>Dove Siamo<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#454545' size='2'><img src='img/pin.png' height='24px'> "+ item.Indirizzo +"<br>"+ item.Cap +", "+ item.Citta +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#454545' size='3'><b>In Sintesi</b><hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#454545' size='2'>"+ item.Sintesi +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#454545' size='3'><b>Dettagli</b><hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#454545' size='2'>"+ item.Dettagli +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#454545' size='3'><b>Condizioni</b><hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#454545' size='2'>"+ item.Condizioni +"</font></td></tr></table>");
				  }
				  else{
					$("#riepilogopost").html("<img src='http://www.mistertod.it/public/up/"+ item.IMG +".png' width='320px' height='180px'><table width='100%' border='0' id='' align='center'><tr><td colspan='3'><font color='#454545' size='3'><b>"+ item.DescrizioneS +"</b></font></td></tr><tr><td colspan='3' align='left'><font color='#454545' size='2'>"+ item.Deal +"&euro;</font></td></tr><tr><td colspan='3'></td></tr><tr><td align='left'><font color='#FF8000' size='4'><b>Valido fino al "+ item.GiornoValidita +"/"+ item.MeseValidita +"</b></font></td><td align='right' colspan='2'><font color='#454545' size='2'>"+ item.Nome +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#454545' size='3'>Dove Siamo<hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#454545' size='2'><img src='img/pin.png' height='24px'> "+ item.Indirizzo +"<br>"+ item.Cap +", "+ item.Citta +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#454545' size='3'><b>In Sintesi</b><hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#454545' size='2'>"+ item.Sintesi +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#454545' size='3'><b>Dettagli</b><hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#454545' size='2'>"+ item.Dettagli +"</font></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><font color='#454545' size='3'><b>Condizioni</b><hr class='style-six'></font></td></tr><tr><td colspan='3'><font color='#454545' size='2'>"+ item.Condizioni +"</font></td></tr></table>");
				  }
				  
				  if(prov==0){
					$("#idfooter3").html("<table id='idfooter' border='1'><tr><td width='200px' align='center'>Sospesa</td><td width='120px' align='center'><a href='#page4' onclick='javascript:riepilogo2("+ idProdotto +","+ id_Transazione +");' data-transition='slide' class='ui-btn ui-shadow ui-corner-all'>Acquista!</a></td></tr></table>");
				  }
				  else{
				  $("#idfooter3").html("<table id='idfooter' align='center'><tr><td width='100%' align='center' valign='bottom'><font color='#FFFFFF' size='3'>Acquistato</font></td></tr></table>");
				  }

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

function riepilogo2(idProdotto,id_transazione) {
	var model = device.model;
	
	$("#idheader4").html("<table id='idheader' height='50'><tr><td width='30px' align='center'></td><td width='240px' align='center' valign='middle'><font color='#FFFFFF' size='3'>CONFERMA</font></td><td width='50px' align='center' valign='middle'><img src='Tod10.png' width='22'></td></tr></table>");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_Riepilogo.asp",
		   contentType: "application/json",
		   data: {ID:idProdotto},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  if (item.ID != 0){
				  
				  $("#riepilogopay1").html("<font color='#454545' size='3'>"+ item.DescrizioneS +"</font>");
				  
				if (model.indexOf('iPad') >= 0) {
				  $("#riepilogopay").html("<img src='http://www.mistertod.it/public/up/"+ item.IMG +".png' width='700px' height='400px' class='arrotondamento'><table width='90%' border='0' id='' align='center'><tr><td align='left' colspan='2' width='220px'><font color='#454545' size='3'>Prezzo Totale: </font></td><td align='right' width='100px'><b>"+ item.Deal +"&euro;</b> </font></td><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><a href='#page' onclick='javascript:compracc("+ idProdotto +","+ id_transazione +");' class='zocial cart'></a><img src='img/CC_Visa.jpg' width='40'> <img src='img/CC_Mastercard.jpg' width='40'> <img src='img/CC_PostePay.jpg' width='40'></td></tr><tr><td colspan='3' align='left'><font color='#454545' size='2'></font></td></tr><tr><td colspan='3'><hr class='style-six'></td></tr><tr><td colspan='3'><a href='#page' onclick='javascript:compra("+ idProdotto +","+ id_transazione +");' class='zocial paypal'>Paga con Paypal</a><br></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3' align='center'><font size='1'>Accetto i nuovi termini di vendita</font></td></tr><tr><td colspan='3' align='center'><font size='1'>Informativa sulla Privacy</font></td></tr></table>");
				  }
				  else{
					$("#riepilogopay").html("<img src='http://www.mistertod.it/public/up/"+ item.IMG +".png' width='320px' height='180px'><table width='100%' border='0' id='' align='center'><tr><td align='left' colspan='2' width='220px'><font color='#454545' size='3'>Prezzo Totale: </font></td><td align='right' width='100px'><b>"+ item.Deal +"&euro;</b> </font></td><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3'><a href='#page' onclick='javascript:compracc("+ idProdotto +","+ id_transazione +");' class='zocial cart'></a><img src='img/CC_Visa.jpg' width='40'> <img src='img/CC_Mastercard.jpg' width='40'> <img src='img/CC_PostePay.jpg' width='40'></td></tr><tr><td colspan='3' align='left'><font color='#454545' size='2'></font></td></tr><tr><td colspan='3'><hr class='style-six'></td></tr><tr><td colspan='3'><a href='#page' onclick='javascript:compra("+ idProdotto +","+ id_transazione +");' class='zocial paypal'>Paga con Paypal</a><br></td></tr><tr><td colspan='3'><hr class='div3'></td></tr><tr><td colspan='3' align='center'><font size='1'>Accetto i nuovi termini di vendita</font></td></tr><tr><td colspan='3' align='center'><font size='1'>Informativa sulla Privacy</font></td></tr></table>");
				  }
				  
				  
				  $("#idfooter4").html("<table id='idfooter' align='center'><tr><td width='100%' align='center' valign='bottom'><font color='#FFFFFF' size='1'>La transazione avviene con connessione sicura</font></td></tr></table>");
				  
				  }
				  else{
				  $("#riepilogopay").html("Nessun risultato trovato");
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

function compra(idProdotto,id_transazione) {

	transazioneprodotto = id_transazione;
	
	var item_number= transazioneprodotto;
	//prendere il nome prodotto e il prezzo con WS per passare al pagina di pagamento
	var amount = "";
	var nome = "";
	var email = localStorage.getItem("email");
	var EmailEsercente = "";
	
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_Prodotto.asp",
		   contentType: "application/json",
		   data: {ID:idProdotto},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  amount = item.Deal;
				  nome = item.Nome;
				  EmailEsercente = item.EmailEsercente;
				  
				  vendoPayPal(idProdotto,nome,amount,transazioneprodotto,item_number,email,EmailEsercente);
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

function vendoPayPal(idProdotto,nome,amount,transazioneprodotto,item_number,email,EmailEsercente){
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_Transaction.asp",
		   contentType: "application/json",
		   data: {email:email,id_prodotto:idProdotto,qta:1,tot:amount.replace(".",","),trans:transazioneprodotto,NomeProdotto:nome,EmailEsercente:EmailEsercente},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  if (item.Token == "1024"){
				  var ref = window.open('http://www.mistertod.it/wbspaypal.asp?Transprodotto='+ transazioneprodotto +'&Nome='+ nome +'', '_blank', 'location=no');
				  }
				  else{
				  navigator.notification.alert(
											   'Possibile errore di rete, riprova tra qualche minuto',  // message
											   alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName
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


function compracc(idProdotto,id_transazione) {
	
	transazioneprodotto = id_transazione;
	
	var item_number= transazioneprodotto;
	var amount = "";
	var nome = "";
	var email = localStorage.getItem("email");
	var EmailEsercente = "";
	
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_Prodotto.asp",
		   contentType: "application/json",
		   data: {ID:idProdotto},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  amount = item.Deal;
				  nome = item.Nome;
				  EmailEsercente = item.EmailEsercente;
				  
				  vendoCC(idProdotto,nome,amount,transazioneprodotto,item_number,email,EmailEsercente);
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

function vendoCC(idProdotto,nome,amount,transazioneprodotto,item_number,email,EmailEsercente){
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_Transaction.asp",
		   contentType: "application/json",
		   data: {email:email,id_prodotto:idProdotto,qta:1,tot:amount.replace(".",","),trans:transazioneprodotto,NomeProdotto:nome,EmailEsercente:EmailEsercente},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  if (item.Token == "1024"){
				  var ref = window.open('http://www.mistertod.it/wbssella.asp?Transprodotto='+ transazioneprodotto +'', '_blank', 'location=no');
				  }
				  else{
				  navigator.notification.alert(
											   'Possibile errore di rete, riprova tra qualche minuto',  // message
											   alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName
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

function contenuto(id_utente) {
	var email = localStorage.getItem("email");
	//alert(email);
	$(".spinner").show();
	
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_MieTransazioni_Phone.asp",
		   contentType: "application/json",
		   data: {email:email},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				
				if(item.ID==0){
				  var landmark = "Nessun acquisto effettuato";
				}
				else{
				  if (item.Voucher==0){
					var landmark = "<li><a href='#page3' onclick='javascript:riepilogo("+ item.Cod_Prodotto +",0,"+ item.TransazioneMia +");' ><img src='http://www.mistertod.it/public/up/"+ item.IMG +".png' width='200' height='200' class='imgcut'><h2>"+ item.Nome +"</h2><p><font color='red'><b>AQUISTA</b></font></p></a></li>";
				  }
				  else{
				  
					var landmark = "<li><a href='#page3' onclick='javascript:riepilogo("+ item.Cod_Prodotto +",1,"+ item.TransazioneMia +");' ><img src='http://www.mistertod.it/public/up/"+ item.IMG +".png' width='200' height='200' class='imgcut'><h2>"+ item.Nome +"</h2><p>Valido fino al - "+ item.GiornoValidita +"/"+ item.MeseValidita +"</p></a></li>";
				  }
				}
				  
				  $("#contenuto").append(landmark);
			});
	
	       $("#contenuto").listview('refresh');
		   
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




function transaction_error(tx, error) {
	alert("Database Error: " + error);
}

function populateDB_success() {
	dbCreated = true;
	db.transaction(getEmployees, transaction_error);
}

function getEmployees(tx) {
	var sql = "select e.id, e.firstName, e.lastName, e.title, e.picture, count(r.id) reportCount " +
	"from employee e left join employee r on r.managerId = e.id " +
	"group by e.id order by e.lastName, e.firstName";
	tx.executeSql(sql, [], getEmployees_success);
}

function getEmployees_success(tx, results) {
	//$('#busy').hide();
	alert('funge');
	var len = results.rows.length;
	for (var i=0; i<len; i++) {
		var employee = results.rows.item(i);
		$('#esempio').append('<li><a href="#">' +
							 '<p class="line1">' + employee.firstName + ' ' + employee.lastName + '</p>' +
							 '<p class="line2">' + employee.title + '</p>' +
							 '<span class="bubble">' + employee.reportCount + '</span></a></li>');
	}
	setTimeout(function(){
			   //scroll.refresh();
			   },100);
	db = null;
}

function populateDB(tx) {
	$('#busy').show();
	tx.executeSql('DROP TABLE IF EXISTS employee');
	var sql =
	"CREATE TABLE IF NOT EXISTS employee ( "+
	"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
	"firstName VARCHAR(50), " +
	"lastName VARCHAR(50), " +
	"title VARCHAR(50), " +
	"department VARCHAR(50), " +
	"managerId INTEGER, " +
	"city VARCHAR(50), " +
	"officePhone VARCHAR(30), " +
	"cellPhone VARCHAR(30), " +
	"email VARCHAR(30), " +
	"picture VARCHAR(200))";
	tx.executeSql(sql);
	
	tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (12,'Steven','Wells',4,'Software Architect','Engineering','617-000-0012','781-000-0012','swells@fakemail.com','Boston, MA','steven_wells.jpg')");
}


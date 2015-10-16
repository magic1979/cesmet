document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    $(".spinner").hide();
	
	last_click_time = new Date().getTime();
	
	document.addEventListener('click', function (e) {
							  
							  click_time = e['timeStamp'];
							  
							  if (click_time && (click_time - last_click_time) < 1000) { e.stopImmediatePropagation();
							  
							  e.preventDefault();
							  
							  return false;
							  
							  }
							  
							  last_click_time = click_time;
							  
							  }, true);

}


function iscriviti(){
	
	var emailreg = localStorage.getItem("emailreg");
	var pinreg = localStorage.getItem("pinreg");
	var nomereg = localStorage.getItem("nomereg");
	
	//alert(emailreg + pinreg + nomereg);

	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://www.mistertod.it/www/Check_Reg.asp",
		   contentType: "application/json",
		   data: {email:emailreg,nome:nomereg,pin:pinreg},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  if (item.Token == '1024'){
				  
				  navigator.notification.alert(
											   'Ti verra mandata un email di attivazione',  // message
											   alertDismissed,         // callback
											   'Registrazione Eseguita',            // title
											   'Done'                  // buttonName
											   );

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
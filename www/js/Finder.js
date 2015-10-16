document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("resume", onResume, false);
    
    StatusBar.overlaysWebView(false);
    StatusBar.backgroundColorByHexString("#RRGGBB");
    
    var hoverDelay = $.mobile.buttonMarkup.hoverDelay = 0;
    
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
	
	
    $(".spinner").show();
    var connectionStatus = false;
    connectionStatus = navigator.onLine ? 'online' : 'offline';
    
    // Workaround for buggy header/footer fixed position when virtual keyboard is on/off
    $('input, select')
    .on('focus', function (e) {
        $('header, footer').css('position', 'absolute');
        })
    .on('blur', function (e) {
        $('header, footer').css('position', 'fixed');
        //force page redraw to fix incorrectly positioned fixed elements
    setTimeout( function() {
        window.scrollTo( $.mobile.window.scrollLeft(), $.mobile.window.scrollTop() );
    }, 20 );
    });
    
    if(connectionStatus=='online'){
    
    $('#noconn').hide();
    var mialat;
    var mialng;
    var via;
    var geoloc;
    var pinno;
    
    
    mialat = localStorage.getItem("lat");
	mialng = localStorage.getItem("lng");

        
	var tabella = '<table align="center" border="0" width="310px" height="60px">';
	tabella = tabella + '<tr><td align="center" width="50px"><img src="img/sportivo.png" width="60px"></td><td align="left"><font color="white" size="2">'+ via +'</font></td></tr>';
        tabella = tabella + '</table>';
        
	$('#tabella').html(tabella);
    
    $(".spinner").hide();
    
    $('#classifica').html('Carrello Vuoto');
        
    $('#mySelect').on('change', function(){
        var $this = $(this),
        $value = $this.val();
                      
         if (chip == 0) {
            navigator.notification.confirm(
            'Hai terminato le Chips, torna domani :)',  // message
             onConfirm,         // callback
             'Attenzione',            // title
             'Prendile Ora,Attendo'                  // buttonName
         );
                      
              return;
         }
         
        connectionStatus = navigator.onLine ? 'online' : 'offline';
                      
        if(connectionStatus!='online'){
            return;
        }
        
        $('#classifica').html('');
        $('#tabella').html('');
        $(".spinner").show();
                      
        var distanza;
                      
        var landmark = '<table id="myTable" class="tablesorter"><thead><tr><th><font color="white" size="2">'+ $value +'</font><img src="images/giu2.png" height="10px"></th><th><font color="white" size="2">Distanza</font><img src="images/giu2.png" height="10px"></th><th><font color="white" size="2">GPS</font></th><th><font color="white" size="2">Info</font></th></tr></thead><tbody id="classifica">';
                      
                      $.ajax({
                             type:"GET",
                             url:"http://www.pokeranswer.it/www/Check_Room.asp",
                             contentType: "application/json",
                             //data: {ID: "1", ID2: "4"},
                             timeout: 7000,
                             data: {ID: $value},
                             jsonp: 'callback',
                             crossDomain: true,
                             success:function(result){
                             
                             $.each(result, function(i,item){
                                    if (item.lat == 0){
                                        distanza = "0";
                                    
                                        landmark = landmark + '<tr><td><font size="2">Nessun Risultato</font></td><td><font size="2">-- </font></td><td>--</td><td>--</td></tr>';
                                    }
                                    else{
                                        distanza = getDistance(mialat,mialng,item.lat,item.lng).toFixed(1);
                                        test = (parseInt(test)+1)
                                        
                                        if (item.figp==1){
                                            pinno = '<img src="images/pin_figp.png" width="20px">';
                                        }
                                        else if(item.figp==2){
                                            pinno = '<img src="images/casino.png" width="20px">';
                                        }
                                        else{
                                            pinno = '<img src="images/pin.png" width="12px">';
                                        }
                                    
                                        //alert(geoloc);
                                        if (geoloc == 'SI'){
                                            landmark = landmark + '<tr><td><font size="2">'+ pinno + item.Room +'</font><br> ('+ item.Indirizzo +')</br></td><td><font size="1">(Km)</font><font size="2"> '+ distanza +'</font></td><td> <a href="maps:saddr='+ via +'&daddr='+ item.Indirizzo +','+ item.Citta +'"><div width="40px" class="home"></div></a></td><td><a href="InfoRoom.html?nome=' + item.Room + '" rel="external"><div width="40px" class="home1"></div></a></td></tr>';
                                        }
                                        else{
                                            landmark = landmark + '<tr><td><font size="2">'+ pinno + item.Room +'</font><br> ('+ item.Indirizzo +')</br></td><td><font size="2">-- </font></td><td><a href="maps:q='+ item.Indirizzo +','+ item.Citta +'"><div width="40px" class="home"></div></a></td><td><a href="InfoRoom.html?nome=' + item.Room + '" rel="external"><div width="40px" class="home1"></div></a></td></tr>';
                                        }
                                    }
                                    
                                    });
                             
                             landmark = landmark + '</tbody></table>';
                             $('#classifica').html(landmark); 
                             $("#myTable").tablesorter( {sortList: [[1,0]]} );
                             
                             chip = parseInt(chip)-1;
                             localStorage.setItem("chip", chip);
                             $('#fiches').html('<img src="images/chipa.png" height="20px"> ' + chip);
                             
                             if (parseInt(chip==0)){
                                $('#mySelect').hide();
                                token();
                             }
                             
                             $("#mySelect").val("01");
                             $("#mySelect").selectmenu("refresh");
                             
                             $(".spinner").hide();
                             
                             },
                                error: function(){
                                    $(".spinner").hide();
                             
                                    $("#mySelect").val("01");
                                    $("#mySelect").selectmenu("refresh");
                             
                                    navigator.notification.alert(
                                    'Possibile errore di rete, riprova tra qualche minuto.',  // message
                                     alertDismissed,         // callback
                                     'Attenzione',           // title
                                     'Done'                  // buttonName
                                      );

                             },
                            dataType:"jsonp"});
                      });
        
    }
    
    else{
        $('#noconn').show();
        
        var tabella = '<table align="center" border="0" width="310px" height="60px" class="conn">';
        tabella = tabella + '<tr><td align="center" width="50px"><img src="images/wire.png" width="32px"></td><td align="left"><font color="white" size="2">Nessuna connessione attiva</font></td><td><a href="javascript:verificawifi()"><div width="40px" class="home"></div></a></td></tr>';
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
    
    $("#mySelect").val("01");
    $("#mySelect").selectmenu("refresh");
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


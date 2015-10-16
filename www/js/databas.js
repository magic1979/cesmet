var db;
var dbCreated = false;

//var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    var numero=(parseInt(localStorage.myname)+12);
    
    $('#classifica').html(numero);
    $('#esempio').html(localStorage.getItem("example"));
    
    //db = window.openDatabase("EmployeeDirectoryDB", "1.0", "PhoneGap Demo", 200000);
    //if (dbCreated){
    	//db.transaction(getEmployees, transaction_error);
    //}
    //else{
    	//db.transaction(populateDB, transaction_error, populateDB_success);
    //}
    
    var connectionStatus = false;
    //setInterval(function () {
        connectionStatus = navigator.onLine ? 'online' : 'offline';
        alert(connectionStatus);
    //}, 100);

}


function agg(){
    db = window.openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    var msg;
    var test;
    var P1 = '110';
    db.transaction(function (tx) {
       tx.executeSql('CREATE TABLE IF NOT EXISTS Poker (id unique, P1, P2, descP1, descP2, HandWin)');
       tx.executeSql('INSERT INTO Poker (id, P1, P2, descP1, descP2, HandWin) VALUES (1, "Punto1", "Punto2", "Coppia", "Coppia", "Vinco Io")');
       msg = '<p>Log message created and row inserted.</p>';
                   
       $('#esempio').html(msg);
   });
}


function seleziona() {
    db.transaction(function (tx) {
       tx.executeSql('SELECT * FROM Poker', [], function (tx, results) {
           var len = results.rows.length, i;
                                 
                                 for (i = 0; i < len; i++){
                                 
                                 msg = results.rows.item(i).P1 + "," + results.rows.item(i).P2 + "," + results.rows.item(i).descP1 + "," + results.rows.item(i).descP2 + "," + results.rows.item(i).HandWin;
                                 
                                 miaVariabile = msg.split(",");

                                 //document.write(miaVariabile[0] + "<br>");
                                 //document.write(miaVariabile[1] + "<br>");
                     
                                 $('#esempio').html(miaVariabile[0] + miaVariabile[1]);
                     $('#classifica').html(results.rows.item(i).P1 + results.rows.item(i).P2 + results.rows.item(i).descP1);

                                 }
                                 }, null);
                   });
}


function upd() {
    
    db.transaction(function (tx) {
        tx.executeSql('UPDATE Poker set P1="Coppia di Re" where id=1', [], function (tx, results) {
    }, null);
});
    
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

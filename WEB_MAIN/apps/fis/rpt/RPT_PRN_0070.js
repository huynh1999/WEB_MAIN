function doWork(srcName){
	var formObj = document.frm1;
    switch(srcName) {
		case 'Print':
			var param = 'title=Receipt Report';
			param += '&cmd_type=24';
			param += '&inv_no=' + formObj.inv_no.value;
			param += '&rcv_dt=' + formObj.rcv_dt.value;
			
			popGET('RPT_PRN_0010.clt?'+param, '', 1025, 740, "scroll:yes;status:no;help:no;");
		break;
		
		case "CLOSE":
	    	window.close();
    	break;
    }
}

/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':
             var cal = new calendarPopup();
             cal.select(formObj.rcv_dt, 'rcv_dt', 'yyyy-MM-dd');
        break;
             
    }
}

function loadPage(){
	fncFromToDate();
}

function fncFromToDate() {
	var formObj = document.frm1;
	
	// 오늘 날짜 가져오기
	var now 	= new Date(); 				// 현재시간 가져오기
	var year	= now.getYear(); 			// 년도 가져오기
	var month	= now.getMonth() + 1; 		// 월 가져오기 (+1)
	var date	= now.getDate(); 			// 날짜 가져오기
	
	if(month < 10){
		month = "0"+(month);
	}
	if(date < 10){
		date = "0"+date;
	}
	today = year +"-"+ month +"-"+ date +"";

	formObj.rcv_dt.value = today;
}
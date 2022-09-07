var callTp;
var periodYn;

//일자 선택시
function selectCell(obj, todayStr, monthStr, yearStr){
	
	if(typeof(selectedObj)=='undefined'||selectedObj!=obj){
		if(typeof(selectedObj)!='undefined'){
			selectedObj.style.fontWeight = "normal";
			selectedObj.style.backgroundColor="#FFFFFF"
		}
		selectedObj = obj;
	}

	obj.style.backgroundColor = "#F5DEB3";
	obj.style.fontWeight = "bold";

	monthStr = new String(monthStr);
	if(monthStr.length==1){
		monthStr = '0'+monthStr;	
	}
	
	todayStr = new String(todayStr);
	if(todayStr.length==1){
		todayStr = '0'+todayStr;	
	}
	
	//기간조회
	if(periodYn=='Y'){
		if(frm1.frmDate.value==''){
			frm1.frmDate.value = yearStr+'-'+monthStr+'-'+todayStr;

			frm1.frmYear.value = yearStr; 
			frm1.frmMonth.value= monthStr;
			frm1.frmDay.value  = todayStr;  
			
		}else if(frm1.frmDate.value!=''){
			frm1.toDate.value = yearStr+'-'+monthStr+'-'+todayStr;
			
			frm1.toYear.value = yearStr;  
			frm1.toMonth.value= monthStr; 
			frm1.toDay.value  = todayStr;

		}
	}else{
		//일이면 바로 리턴함.
		if(callTp=='D'){
			var retVal = yearStr+'|'+monthStr+'|'+todayStr;
			window.returnValue = retVal;
			window.close();
		}
		
	}
		

}

function applyDate(){
	//alert(1);
	//기간조회
	if(periodYn=='Y'){
		
		if(frm1.frmDate.value==''){
			//Please select [From] date!
			alert(getLabel('FMS_COM_ALT006')+ "\n\n: Calendar.65");
		}else if(frm1.toDate.value==''){
			//Please select [To] date!		
			alert(getLabel('FMS_COM_ALT006')+ "\n\n: Calendar.68");
		}else{
			var monthStr = new String(frm1.frmMonth.value);
			var dayStr   = new String(frm1.frmDay.value);
			if(monthStr.length==1){
				monthStr = '0'+monthStr;	
			}
			if(dayStr.length==1){
				dayStr = '0'+dayStr;	
			}
			var retVal = frm1.frmYear.value+'|'+monthStr+'|'+dayStr+';';
			
			
			monthStr = new String(frm1.toMonth.value);
			dayStr   = new String(frm1.toDay.value);
			if(monthStr.length==1){
				monthStr = '0'+monthStr;	
			}
			if(dayStr.length==1){
				dayStr = '0'+dayStr;	
			}
		    retVal+= frm1.toYear.value+'|'+monthStr+'|'+dayStr;
		    
			window.returnValue = retVal;
			window.close();
		}
	}else{
		//월단위 조회 팝업인 경우
		if(callTp=='M'){
			
			var monthStr = new String(frm1.frmMonth.value);
			if(monthStr.length==1){
				monthStr = '0'+monthStr;	
			}
			
			var retVal = frm1.frmYear.value+'|'+monthStr+'|'+frm1.lastDay.value;
			window.returnValue = retVal;
			window.close();
		}		
	}
}


//----------------------------------Calendar 기능 처리----------------------------------

var selectedObj;
 
function clearCell(obj){
	if(typeof(selectedObj)=='undefined'||selectedObj!=obj){
		obj.style.backgroundColor="#FFFFFF"		
	}
}


//칼렌더 생성
function dispCalandar(strYear, strMonth)
{
	//일자를 선택하는 
	if(callTp=='D'){
		writeDateCalandar(strYear, strMonth);
		
	//월단위
	}else{
		writeMonthCalandar(strYear, strMonth)
	}
}

/**
 * 일자선택하는 Calendar Write하기
 */
function writeDateCalandar(strYear, strMonth){
	var chkDate = new Date();
	var todayDate = new Date();
	
	var todayYear = todayDate.getFullYear();
	var todayMonth = todayDate.getMonth();
	var todayDay = todayDate.getDate();

	var strLastDay = getEndOfMonthDay( strYear, strMonth );

	var strCalandar = "";

	var firstDay = "";
	var thisDay	= "";
	var lastDay = "";

	var thisYear = parseInt(strYear);
	var thisMonth = parseInt(strMonth);

	var prevYear = "";
	var prevMonth = "";

	var nextYear = "";
	var nextMonth = "";

	if (thisMonth > 1)
	{
		prevYear = thisYear;
		prevMonth = thisMonth - 1;
	}else
	{
		prevYear = thisYear - 1;
		prevMonth = "12";
	}

	if (thisMonth < 12)
	{
		nextYear = thisYear;
		nextMonth = thisMonth + 1;
	}else
	{
		nextYear = thisYear + 1;
		nextMonth = "1";
	}

	var yearMinus= thisYear-1;
	var yearPlus = thisYear+1;
	
	chkDate.setFullYear(strYear);

	chkDate.setMonth(thisMonth - 1);

	chkDate.setDate(1);

	firstDay = chkDate.getDay();

	var selectedDay = new String(strYear);
	if(strMonth<10){
		selectedDay += '0'; 
	}
	selectedDay += new String(strMonth);
	
	strCalandar += '	<table width="240" class="popup" cellpadding="8" border="0"> '; 
	strCalandar += '		<tr><td class="top"></td></tr> ';
	strCalandar += '		<tr> ';
	strCalandar += '			<td valign="top"> ';
	strCalandar += '				<table class="search" style="width:224;" align="center"> '; 
	strCalandar += '					<tr><td class="bg_a"> ';
	strCalandar += '							<table class="search" border="0" style="width:100%"> ';
	strCalandar += '								<tr class="h23"> ';
	strCalandar += '									<td width="70"></td> ';
	strCalandar += '									<td width="33"> '+ strYear+'</td> ';

	strCalandar += "             						<td width=\"15\"><img onclick=\"dispCalandar('" + yearPlus + "', '" + strMonth + "')\" src=\"./web/img/button/bu_next01.gif\" width=\"20\" height=\"11\" border=\"0\" align=\"absmiddle\" style='cursor:hand;'>";
	strCalandar += "             						<img onclick=\"dispCalandar('" + yearMinus + "', '" + strMonth + "')\" src=\"./web/img/button/bu_prev01.gif\" width=\"20\" height=\"11\" border=\"0\" align=\"absmiddle\" style='cursor:hand;'>";
	strCalandar += '</td> ';
	strCalandar += '									<td width="28px" align="right"> '+ strMonth+'&nbsp;</td> ';
	strCalandar += "             						<td><img onclick=\"dispCalandar('" + nextYear+ "', '" + nextMonth + "')\" src=\"./web/img/button/bu_next01.gif\" width=\"20\" height=\"11\" border=\"0\" align=\"absmiddle\" style='cursor:hand;'>";
	strCalandar += "             						<img onclick=\"dispCalandar('" + prevYear + "', '" + prevMonth + "')\" src=\"./web/img/button/bu_prev01.gif\" width=\"20\" height=\"11\" border=\"0\" align=\"absmiddle\" style='cursor:hand;'>";
	strCalandar += '</td> ';
	strCalandar += '									<td width="70"></td> ';
	strCalandar += '								</tr> ';
	strCalandar += '							</table> ';
	strCalandar += '							<table class="height_10"><tr><td></td></tr></table> ';
	strCalandar += '							<table width="210" border="0" align="center" class="grid2"> '; 
	strCalandar += '								<tr class="tr2_head2" style="text-align:center"> ';
	strCalandar += '									<td width="30">Sun</td> ';
	strCalandar += '									<td width="30">Mon</td> ';
	strCalandar += '									<td width="30">Tue</td> ';
	strCalandar += '									<td width="30">Wed</td> ';
	strCalandar += '									<td width="30">Thu</td> ';
	strCalandar += '									<td width="30">Fri</td> ';
	strCalandar += '									<td width="30">Sat</td> ';
	strCalandar += '								</tr> ';
	strCalandar += '								<tr> ';
	
	//1일 요일까지 공백을 채움
	for(var i = 0 ; i < firstDay ; i++ ){
		strCalandar += "<td></td>";
	}
	
	var todayIdx = -99;
	for(var i = 1 ;i <= strLastDay; i++){
		chkDate.setDate(i);
		thisDay = chkDate.getDay();

		if(thisDay == 0){
			strCalandar += "<tr>";
		}

		if(todayYear == strYear && todayMonth == (thisMonth - 1) && todayDay == i){
			strCalandar += "		<td id=\"dCell"+i+"\" bgcolor=\"#F5DEB3\" align=\"center\" style=\"cursor:hand;\" onclick='selectCell(this, "+i+","+thisMonth+","+thisYear+");' style='font-weight:bold;'>" + i + "</td>";
			todayIdx = i;
			
		}else{
			strCalandar += "		<td id=\"dCell"+i+"\" align=\"center\" style=\"cursor:hand;\" onmouseover='this.style.backgroundColor=\"#FFFF66\"' ";
			strCalandar += " onmouseout='clearCell(this);' onclick='selectCell(this, "+i+","+thisMonth+","+thisYear+");'>" + i + "</td>";
		}
		
		if(thisDay == 7){
			strCalandar += "</tr>";
		}
	}

	//마지막 요일부터 마지막을 채움
	chkDate.setDate(strLastDay);
	var lastDay = chkDate.getDay();
	
	for (var i = lastDay ; i < 6 ; i++ ){
		strCalandar += "		<td></td>";
	}
	strCalandar += "	</tr>";
	strCalandar += '							</table> ';
	strCalandar += '						</td> ';
	strCalandar += '					</tr> ';
	strCalandar += '				</table> ';
	strCalandar += '			</td> ';
	strCalandar += '		</tr> ';
	strCalandar += '		<tr><td height="5px"></td></tr> ';
	strCalandar += '	</table> ';
	
	calDev.innerHTML = strCalandar; 
	
	if(todayIdx>0){
		selectedObj = getObj('dCell'+todayIdx);
	}
}


/**
 * 일자선택하는 Calendar Write하기
 */
function writeMonthCalandar(strYear, strMonth){
	var chkDate = new Date();
	var todayDate = new Date();
	
	var todayYear = todayDate.getFullYear();
	var todayMonth = todayDate.getMonth();
	var todayDay = todayDate.getDate();

	var strLastDay = getEndOfMonthDay( strYear, strMonth );

	var strCalandar = "";

	var firstDay = "";
	var thisDay	= "";
	var lastDay = "";

	var thisYear = parseInt(strYear);
	var thisMonth = parseInt(strMonth);

	var prevYear = "";
	var prevMonth = "";

	var nextYear = "";
	var nextMonth = "";

	if (thisMonth > 1)
	{
		prevYear = thisYear;
		prevMonth = thisMonth - 1;
	}else
	{
		prevYear = thisYear - 1;
		prevMonth = "12";
	}

	if (thisMonth < 12)
	{
		nextYear = thisYear;
		nextMonth = thisMonth + 1;
	}else
	{
		nextYear = thisYear + 1;
		nextMonth = "1";
	}

	var yearMinus= thisYear-1;
	var yearPlus = thisYear+1;
	
	chkDate.setFullYear(strYear);

	chkDate.setMonth(thisMonth - 1);

	chkDate.setDate(1);

	firstDay = chkDate.getDay();

	var selectedDay = new String(strYear);
	if(strMonth<10){
		selectedDay += '0'; 
	}
	selectedDay += new String(strMonth);
	
	strCalandar += '	<table width="240" class="popup" cellpadding="8" border="0"> '; 
	strCalandar += '		<tr><td class="top"></td></tr> ';
	strCalandar += '		<tr> ';
	strCalandar += '			<td valign="top"> ';
	strCalandar += '				<table class="search" style="width:224;" align="center"> '; 
	strCalandar += '					<tr><td class="bg_a"> ';
	strCalandar += '							<table class="search" border="0" style="width:100%"> ';
	strCalandar += '								<tr class="h23"> ';
	strCalandar += '									<td width="70"></td> ';
	strCalandar += '									<td width="33"> '+ strYear+'</td> ';

	strCalandar += "             						<td width=\"15\"><img onclick=\"dispCalandar('" + yearPlus + "', '" + strMonth + "')\" src=\"./web/img/button/bu_next01.gif\" width=\"20\" height=\"11\" border=\"0\" align=\"absmiddle\" style='cursor:hand;'>";
	strCalandar += "             						<img onclick=\"dispCalandar('" + yearMinus + "', '" + strMonth + "')\" src=\"./web/img/button/bu_prev01.gif\" width=\"20\" height=\"11\" border=\"0\" align=\"absmiddle\" style='cursor:hand;'>";
	strCalandar += '</td> ';
	strCalandar += '									<td width="28px" align="right"> '+ strMonth+'&nbsp;</td> ';
	strCalandar += "             						<td><img onclick=\"dispCalandar('" + nextYear + "', '" + nextMonth+ "')\" src=\"./web/img/button/bu_next01.gif\" width=\"20\" height=\"11\" border=\"0\" align=\"absmiddle\" style='cursor:hand;'>";
	strCalandar += "             						<img onclick=\"dispCalandar('" + prevYear + "', '" + prevMonth  + "')\" src=\"./web/img/button/bu_prev01.gif\" width=\"20\" height=\"11\" border=\"0\" align=\"absmiddle\" style='cursor:hand;'>";
	strCalandar += '</td> ';
	strCalandar += '									<td width="70"></td> ';
	strCalandar += '								</tr> ';
	strCalandar += '							</table> ';
	strCalandar += '						</td> ';
	strCalandar += '					</tr> ';
	strCalandar += '				</table> ';
	strCalandar += '			</td> ';
	strCalandar += '		</tr> ';
	strCalandar += '		<tr><td height="5px"></td></tr> ';
	strCalandar += '	</table> ';
	
	calDev.innerHTML = strCalandar;
	
	//선택된 날짜를 현재일로 한다.
	frm1.frmYear.value = thisYear;
	frm1.frmMonth.value= thisMonth;
	frm1.frmDay.value  = '1';
	frm1.lastDay.value = strLastDay;
}

function  getEndOfMonthDay(yy, mm){
    var max_days=0;
    if(mm == 1){
        max_days = 31 ;
    }else if(mm == 2){
        if ((( yy % 4 == 0) && (yy % 100 != 0)) || (yy % 400 == 0)){
        	max_days = 29;
        }else{
        	max_days = 28;
        }
    }
    else if (mm == 3)   max_days = 31;
    else if (mm == 4)   max_days = 30;
    else if (mm == 5)   max_days = 31;
    else if (mm == 6)   max_days = 30;
    else if (mm == 7)   max_days = 31;
    else if (mm == 8)   max_days = 31;
    else if (mm == 9)   max_days = 30;
    else if (mm == 10)  max_days = 31;
    else if (mm == 11)  max_days = 30;
    else if (mm == 12)  max_days = 31;
    else                return '';

    return max_days;
}


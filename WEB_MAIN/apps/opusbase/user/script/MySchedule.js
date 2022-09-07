//=========================================================
//*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
//=========================================================
//
//=========================================================
//*@FileName   : MySchedule
//*@author     : Tuan.Chau
//*@version    : 1.0 - 06062014
//*@since      : 06062014
//
//*@Change history:
//=========================================================

var selectedObj;
 
function clearCell(obj){
	if(typeof(selectedObj)=='undefined'||selectedObj!=obj){
		obj.style.backgroundColor="#FFFFFF"		
	}
}


function doWork(cmd){
	
	return null;
}
//일자 선택시
function selectCell(obj, todayStr){
	if(typeof(selectedObj)=='undefined'||selectedObj!=obj){
		if(typeof(selectedObj)!='undefined'){
			selectedObj.style.fontWeight = "normal";
			selectedObj.style.backgroundColor="#FFFFFF"
		}
		selectedObj = obj;
	}
	obj.style.backgroundColor = "#F5DEB3";
	obj.style.fontWeight = "bold";
	
	var paramStr = fName.yyyyMM.value;
	
	todayStr = new String(todayStr); 
	if(todayStr.length==1){
		paramStr += '0';	
	}
	paramStr += todayStr;
	
	//alert(iFrname.style.posTop);
	//iFrname.style.posLeft
//	iFrname.location.href = './MyScheduleSub.clt?f_skd_dt='+paramStr;
	$("#iFrname").attr("src", './MyScheduleSub.clt?f_skd_dt='+paramStr);
//	parent.window.frames.iFrname.refreshPage();
}
	
function dispCalandar(strYear, strMonth)
{
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

	chkDate.setFullYear(strYear);

	chkDate.setMonth(thisMonth - 1);

	chkDate.setDate(1);

	firstDay = chkDate.getDay();

	var selectedDay = new String(strYear);
	if(strMonth<10){
		selectedDay += '0'; 
	}
	selectedDay += new String(strMonth);
	
	if(strMonth<10){
		strMonth = '0' + strMonth; 
	}
	
	strCalandar += '	<table width="240" class="popup" cellpadding="8" border="0"> 	'; 
	strCalandar += '		<tr><td class="top"></td></tr> ';
	strCalandar += '		<tr> ';
	strCalandar += '			<td valign="top"> ';
	strCalandar += '				<table class="search" style="width:224px;" align="center"> '; 
	strCalandar += '					<tr><td class="bg_a"> ';
	strCalandar += '							<table class="search" border="0" style="width:100%"> ';
	strCalandar += '								<tr class="h23"> ';
	strCalandar += '									<td width="40%"></td> ';
	strCalandar += '									<td width="50"> '+ strMonth + "-" + strYear +'</td> ';
	strCalandar += "             						<td><img onclick=\"dispCalandar('" + prevYear + "', '" + prevMonth + "')\" src=\"./web/img/button/bu_next01.gif\" width=\"20\" height=\"11\" border=\"0\" align=\"absmiddle\" style='cursor:hand;'>";
	strCalandar += "             						<br>";
	strCalandar += "             						<img onclick=\"dispCalandar('" + nextYear + "', '" + nextMonth + "')\" src=\"./web/img/button/bu_prev01.gif\" width=\"20\" height=\"11\" border=\"0\" align=\"absmiddle\" style='cursor:hand;'>";
	strCalandar += '</td> ';
	strCalandar += '									<td width="17%"></td> ';
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
			strCalandar += "		<td id=\"dCell"+i+"\" align=\"center\" style=\"background-color:#F5DEB3 ; cursor:pointer; font-weight:bold;\" onclick='selectCell(this, "+i+");'>" + i + "</td>";
			todayIdx = i;
			
		}else{
			strCalandar += "		<td id=\"dCell"+i+"\" align=\"center\" style=\"cursor:pointer;\" onmouseover='this.style.backgroundColor=\"#FFFF66\"' ";
			strCalandar += " onmouseout='clearCell(this);' onclick='selectCell(this, "+i+");'>" + i + "</td>";
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
	strCalandar += '		<tr><td class="top"></td></tr> ';
	strCalandar += '	</table> ';
	
	calDev.innerHTML = strCalandar; 
	fName.yyyyMM.value= selectedDay;
	
	if(todayIdx>0){
		selectedObj = getObj('dCell'+todayIdx);
	}
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

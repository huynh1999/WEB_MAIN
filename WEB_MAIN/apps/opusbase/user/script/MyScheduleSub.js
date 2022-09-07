//=========================================================
//*@FileName   : MGT_NTC_0010.jsp
//*@FileTitle  : 게시판 목록 화면
//*@Description: 게시판 목록을 조회합니다.
//*@author     : Kang,Jung-Gu - Cyberlogitec
//*@version    : 1.0 - 02/05/2009
//*@since      : 02/05/2009
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 27/06/2014
//*@since      : 27/06/2014
//=========================================================
var curDayObj;
var curCalledIdx;
function openParentProgress(){
}
//등록 팝업
function popCnf(callId, obj){
	curDayObj=obj;
	curCalledIdx=callId;
	var savedStr=getHidObj(callId).value;
	//수정시
	if(savedStr!=''){
		var endKey=savedStr.indexOf(';');
	    var str=msgPopCall(callId, modiMsg);
	    dispTime2.innerText=str;
		fName.modi_skd_tit.value=savedStr.substring(0, endKey);
		endKey++;
		fName.skd_seq.value=savedStr.substring(endKey);
		fName.modi_skd_tit.focus();
	//신규등록시
	}else{
		var str=msgPopCall(callId, cnfMsg);
		dispTime.innerText=str;
		fName.add_skd_tit.focus();
	}
}
//수정 팝업
function callModi(callId, obj, skdSeq, msg){
	curDayObj=obj;
	curCalledIdx=callId;
	fName.skd_seq.value=skdSeq;
    var str=msgPopCall(callId, modiMsg);
    dispTime2.innerText=str;
	fName.modi_skd_tit.value=msg;
	fName.modi_skd_tit.focus();
}
//수정 팝업
function callModiDay(obj, skdSeq, msg){
	curDayObj=obj;
	curCalledIdx=99;
	fName.skd_seq.value=skdSeq;
	var str=msgPopCall(99, modiMsg);
  	dispTime2.innerText=str;
	fName.modi_skd_tit.value=msg;
	fName.modi_skd_tit.focus();
}
//수정/등록 팝업 호출
function msgPopCall(callIdNum, cnfObj){
	var timeStr=new Array("12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1",  "2",  "3",  "4",  "5",  "6",  "7",  "8",  "9",  "10",  "11");
	var hiddenStr=new Array("24", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21",  "22", "23");
    var xCnt=event.clientX + document.body.scrollLeft;
	var yCnt=event.clientY + document.body.scrollTop;
	if(yCnt<134){
		yCnt=134;
	}	
	var str='';
	if(callIdNum<99){
		var dayTp="am";
		if(callIdNum>12){
			dayTp="pm";
		}
		str=' '+getDateFromStr(fName.skd_dt.value)+',  '+timeStr[callIdNum]+dayTp;
        fName.skd_tp.value='T';
		fName.skd_bgn_tm.value=hiddenStr[callIdNum];
	}else{
		str=' '+getDateFromStr(fName.skd_dt.value)+',  ';
		fName.skd_tp.value='D';
	}
	cnfObj.style.left=xCnt+ "px";
	cnfObj.style.top=yCnt-130 + "px";
	cnfObj.style.display='block';
	fName.callId.value=callIdNum;
	return str;
}
//등록 팝업 닫기
function clearInput(msg){
	if(msg == "C")
	{
		if(confirm(getLabel('FMS_COM_CFMCAN'))){	
			fName.add_skd_tit.value='';
		    getObj('cnfMsg').style.display='none';	
		    //btnAdd.style.display = 'none';	
		}
	}else{
		fName.add_skd_tit.value='';
	    getObj('cnfMsg').style.display='none';	
	    //btnAdd.style.display = 'none';	
	}		    
}
//수정/삭제팝업 닫기
function clearModi(msg){
	// 20130605 - jsjang cancel confirm box add
	if(msg == "C")
	{
		if(confirm(getLabel('FMS_COM_CFMCAN'))){
		    fName.modi_skd_tit.value='';
		    getObj('modiMsg').style.display='none';
		    //btnModify.style.display = 'none';	    
		}
	}else{
	    fName.modi_skd_tit.value='';
	    getObj('modiMsg').style.display='none'; 
	    //btnModify.style.display = 'none';
	}
}
function doWork(cmd){
	/* jsjang 2013.8.13 #19496 My schedule Alt+Q start */
    var cnfYn="";
    var modiYn="";
	if( cmd == "SAVE")
	{
		cnfYn=document.getElementById('cnfMsg').style.display;
		modiYn=document.getElementById('modiMsg').style.display;
		if(cnfYn == 'block')
		{
			saveSchedule('ADD');
		}else{
			if(modiYn == 'block')
			{
				saveSchedule('MODIFY');
			}
		}
	}else if( cmd == "ADD" || cmd == "MODIFY" ){
	}else if( cmd == "SAVE_ADD"){
		saveSchedule('ADD');
	}else if( cmd == "SAVE_MODIFY" ){
		saveSchedule('MODIFY');	
	}else{
		//saveSchedule(cmd);
	}
	/* jsjang 2013.8.13 #19496 My schedule Alt+Q end */
	//return;
}
//수정/저장
function saveSchedule(cmd){
	if(!btnGetVisible(cmd)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
	if(inpuValCheck(cmd)){
		var parmStr='&goWhere=aj&bcKey=addMySchedule';
		parmStr += '&skd_tp='+fName.skd_tp.value; 
		parmStr += '&skd_dt='+fName.skd_dt.value;
		parmStr += '&skd_bgn_tm='+fName.skd_bgn_tm.value;
		parmStr += '&skd_end_tm='+fName.skd_end_tm.value;
	    parmStr += '&skd_seq='+fName.skd_seq.value;
		parmStr += '&f_cmd='+cmd;
		if(cmd=='ADD'){
		    parmStr += '&skd_tit='+fName.add_skd_tit.value;
			ajaxSendPost(saveScheduleEnd,   'reqVal', parmStr, './GateServlet.gsl');
		}else if(cmd=='MODIFY'){
		    parmStr += '&skd_tit='+fName.modi_skd_tit.value;
			ajaxSendPost(modiScheduleEnd,   'reqVal', parmStr, './GateServlet.gsl');
		}else if(cmd=='REMOVE'){
			// 20130605 - jsjang delete confirm box add
			//if(confirm(getLabel('FMS_COM_CFMDEL'))){
				ajaxSendPost(removeScheduleEnd, 'reqVal', parmStr, './GateServlet.gsl');
			//}
		}
	}
}
function inpuValCheck(cmd){
	if(cmd=='REMOVE'){
		return true;
	}else{
		var curVal=fName.add_skd_tit.value; 
		if(cmd=='MODIFY'){
			curVal=fName.modi_skd_tit.value;
		}
		if(checkInputVal(curVal, 1, 100, "T", getLabel('ITM_SKD'))!='O'){
			return false;
		}else{
			return true;
		}		
	}
}
function saveScheduleEnd(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
		var newMsg="&nbsp;&nbsp;<span onclick=\"callModi(";
			newMsg+= fName.callId.value; 
			newMsg+= ", this,";
			newMsg+= doc[1]; 
		    newMsg+= ", '";
	    	newMsg+= fName.add_skd_tit.value;
	    	newMsg+= "', fName.hidMsg";
	    	newMsg+= fName.callId.value;
		    newMsg+= ");\" onmouseover=\"this.style.fontWeight='bold'\" ";
		    newMsg+= "onmouseout=\"this.style.fontWeight='normal'\">";
		    newMsg+= fName.add_skd_tit.value;
		    newMsg+= "</span>";
		curDayObj.innerHTML=newMsg;
		getHidObj(curCalledIdx).value=fName.add_skd_tit.value+';'+doc[1];
//		document.focus();
		clearInput('I');
    }else{
        //System error!
    	alert(getLabel('FMS_COM_ERR001')+ "\n\n: MyScheduleSub.174");
    }
}
function modiScheduleEnd(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
		var newMsg='&nbsp;&nbsp;';
		newMsg += fName.modi_skd_tit.value;
        curDayObj.innerHTML=newMsg;
        getHidObj(curCalledIdx).value=fName.modi_skd_tit.value+';'+doc[1];
    	// 20130605 - jsjang cancel confirm box add
    	//if(confirm(getLabel('FMS_COM_CFMCAN'))){
    		clearModi('M');
    	//}
    }else{
    	//System error!
    	alert(getLabel('FMS_COM_ERR001')+ "\n\n: MyScheduleSub.189");
    }
}
function removeScheduleEnd(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
    	// 20130605 - jsjang cancel confirm box add
    	if(confirm(getLabel('FMS_COM_CFMDEL'))){    	
			var newMsg='&nbsp;&nbsp;';
	        curDayObj.innerHTML=newMsg;
	        getHidObj(curCalledIdx).value='';
    		clearModi('D');
    	}
    }else{
    	//System error!
    	alert(getLabel('FMS_COM_ERR001')+ "\n\n: MyScheduleSub.203");
    }
}
function getHidObj(curTime){
	switch(curTime){
	    case 0:
	    	return fName.hidMsg0;
	    break;
	    case 1:
	    	return fName.hidMsg1;
	    break;
	    case 2:    
	    	return fName.hidMsg2;
	    break;
	    case 3:    
	    	return fName.hidMsg3;
	    break;
	    case 4:
	    	return fName.hidMsg4;
	    break;
	    case 5:
	    	return fName.hidMsg5;
	    break;
	    case 6:
	    	return fName.hidMsg6;
	    break;
	    case 7:
	    	return fName.hidMsg7;
	    break;
	    case 8:
	    	return fName.hidMsg8;
	    break;
	    case 9:
	    	return fName.hidMsg9;
	    break;
	    case 10:
	    	return fName.hidMsg10;
	    break;
	    case 11:
	    	return fName.hidMsg11;
	    break;
	    case 12:
	    	return fName.hidMsg12;
	    break;
	    case 13:
	    	return fName.hidMsg13;
	    break;
	    case 14:
	    	return fName.hidMsg14;
	    break;
	    case 15:
	    	return fName.hidMsg15;
	    break;
	    case 16:
	    	return fName.hidMsg16;
	    break;
	    case 17:
	    	return fName.hidMsg17;
	    break;
	    case 18:
	    	return fName.hidMsg18;
	    break;
	    case 19:
	    	return fName.hidMsg19;
	    break;
	    case 20:
	    	return fName.hidMsg20;
	    break;
	    case 21:
	    	return fName.hidMsg21;
	    break;
	    case 22:
	    	return fName.hidMsg22;
	    break;
	    case 23:
	    	return fName.hidMsg23;
	    break;
	    default:
	    	return fName.hidMsg99;
	    break;
	}
}

//=========================================================
//*@FileName   : CMM_POP_0310.jsp
//*@FileTitle  : CMM
//*@Description: State Code Popup
//*@author     : Kim,Jin-Hyuk
//*@version    : 1.0 - 2011/10/17
//*@since      : 2011/10/17
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/07/02
//*@since      : 2014/07/02
//=========================================================
function doWork(srcName){
	var formObj=document.frm1;
    switch(srcName) {
		case 'Print':
			if(formObj.s_visit_tm_fm.value == ""){
				//[Date] is mandatory field.
				alert(getLabel('FMS_COM_ALT001')+ "\n - " + getLabel('DATE'));
				return;
			}
			formObj.file_name.value='sales_daily_report_01.mrd';
			formObj.title.value='Sales Daily Report';
			var visitTm=formObj.s_visit_tm_fm.value.replaceAll('-','');
			visitTm=visitTm.substring(4) + visitTm.substring(0,4);
			//Parameter Setting
			var param='[' + visitTm + ']';
			param += '[' + usrNm + ']';
			param += '[' + ofcLoclNm + ']';
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			break;
		case "CLOSE":
			window.close(); 
	    	break;
    }
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal=new ComCalendar(); 
	    	cal.select(formObj.s_visit_tm_fm,  'MM-dd-yyyy');
	    break;
    }
}

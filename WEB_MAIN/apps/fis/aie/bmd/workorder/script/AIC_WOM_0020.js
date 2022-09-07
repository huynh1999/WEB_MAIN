//=========================================================
//*@FileName   : 
//*@FileTitle  :  
//*@Description:  
//*@author     : 
//*@version    : 
//*@since      : 
//
//*@Change history:
//*@author2     : 
//*@version    : 
//*@since      : 
//=========================================================
var isInvStsOk=false;
var rtnary=new Array(1);
var callBackFunc = "";
var delete_show_msg = "N";

function doWork(srcName, curObj) {
	if(!btnGetVisible(srcName)){
		return;
	}
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	var formObj=document.frm1;
	switch (srcName) {
		case "SEARCHLIST":
			//if(!formValidation()) return;
	        formObj.f_cmd.value=SEARCHLIST;
	        sheetObj2.RemoveAll();
			sheetObj.DoSearch("./AIC_WOM_0020GS.clt", FormQueryString(formObj) );
			//Log Monitor Start
	   		gLogMonitor();
	 		//Log Monitor End
		break;
       	case "NEW":
       	    var paramStr="./AIC_WOM_0018.clt?air_sea_clss_cd=&bnd_clss_cd=G&biz_clss_cd=";
       	    parent.mkNewFrame('Pickup/Delivery Order', paramStr);
		break;  		
		
		case 'EXCEL':		
        	  if(sheetObj.RowCount() < 1){//no data	
       			ComShowCodeMessage("COM132501");
       		}else{
       			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
       		}
        break;       
       
        case 'EXCEL_ALL':   
        	if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
        	} else if (sheetObj.GetTotalRows() > formObj.endMaxIdx.value) { //out of memory
        		alert(getLabel('FMS_COM_ALT088'));
        		formObj.etd_strdt.focus();
        		return;
	   		} else {
	   			excelDown3(sheetObj);
	   		}
        break;          
        
        case 'CLEAR':
        	fn_allClear();
        break;
        
		case "PARTNER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			id = curObj.id;
			tmp_tp = curObj.type;
			rtnary=new Array(1);
			var iata_val="";
	   		var cstmTpCd='CS';
	   		//alert(airSeaTp);
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]=window;
			if(id=="del") {
				cstmTpCd='';
			}else if(id=="trk") {
				cstmTpCd='';
			}
	   		rtnary[3]="";
	   		callBackFunc = "PARTNER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");        
	   		break;
	   		
        case "PRINT":
    	    // 프린트
    	    var print_md_yn="";
    	    //if (formObj.biz_clss_cd.value==""){ // Other 신규
    	    	formObj.file_name.value='pickup_delivery_instruction_other.mrd';
    	    //}else{
    	    //	formObj.file_name.value='pickup_delivery_instruction_01.mrd';
    	    //}
			//formObj.title.value='';
			//if(formObj.print_md_yn.checked==true){
			//	print_md_yn="Y";
			//}else{
			//	print_md_yn="N";
			//}
    	    	//#6889 [NONGHAO] ADJUSTMENT ON HB/L OUTPUT
        		formObj.rpt_file_name_title.value = "";
        		if (formObj.p_wo_no.value != ""){	
        			var wo_no = formObj.p_wo_no.value;	
            		formObj.rpt_file_name_title.value = "pickup_delivery_instruction_other_" + wo_no;    					
            	} else {
            		formObj.rpt_file_name_title.value = "";
            	}   
        		 	    	
			//Parameter Setting
			var param='';
			param += '[' + formObj.p_wo_no.value + ']'; //$1
			param += '[' + formObj.ofc_locl_nm.value + ']'; //$2
			param += '[' + formObj.eml.value + ']'; //$3
			param += '[' + formObj.user_name.value + ']'; //$4
			param += '[' + formObj.p_intg_bl_seq.value + ']'; //$5
			param += '[' + formObj.user_phn.value + ']'; //$6
			param += '[' + formObj.user_fax.value + ']'; //$7
			param += '[' + print_md_yn + ']'; //$8
			param += '[' + formObj.p_oth_seq.value + ']'; //$9	[20130411 OJG]
			
			param += '[' + ofc_cd + ']'; //$10
			
			formObj.rd_param.value=param;
			 /* oyh 2013.09.05 #20448 :[BINEX] D/O 메일 전송 시 Mail Subject 에 HBL# 같이 표기 */
			var tempTitle='';
			tempTitle='Pickup/Delivery Order[Other]';
			
			if (formObj.p_bl_no != "undefined"  && formObj.p_bl_no != undefined) {
				if(formObj.p_biz_clss_cd.value=="H"){
					tempTitle += 'House ';
					tempTitle += '[HBL No : '+formObj.p_bl_no.value+']';
				}else{
					tempTitle += '';
					tempTitle += '[HBL No : '+formObj.p_mbl_no.value+']';
				}
			}else if (formObj.p_mbl_no != "undefined"  && formObj.p_mbl_no != undefined) {
				if(formObj.p_biz_clss_cd.value=="M"){
					tempTitle += 'Master ';
					tempTitle += '[MBL No : '+formObj.p_mbl_no.value+']';
				}else{
					tempTitle += '';
					tempTitle += '[MBL No : '+formObj.p_mbl_no.value+']';
				}
			}
			formObj.title.value=tempTitle;
			formObj.mailTitle.value=tempTitle;
			//formObj.mailTitle.value = tempTitle + 'Other Reference No. : ' + formObj.oth_ref_no.value + ']';;
			var trdp_cd='';
     		trdp_cd += '(' + '\'' + formObj.p_return_trdp_cd.value + '\'' + ')';
			ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
			formObj.mailTo.value=mailTo;
			// History화면에서 Link 를 걸기위해 WO_NO와 CLSS_CD를 넘긴다. 
			formObj.rpt_biz_tp.value="PDI";
			formObj.rpt_biz_sub_tp.value=formObj.p_wo_no.value+formObj.p_air_sea_clss_cd.value;
			formObj.rpt_trdp_cd.value=formObj.p_trucker_trdp_cd.value;
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			break;       
        case "REMOVE"://삭제
     	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
                formObj.f_cmd.value=REMOVE;
                sheetObj.DoSearch("./AIC_WOM_0020GS.clt", FormQueryString(formObj) );
     	   }
		break;	
	}// end switch
	
	//Log Monitor Start:Btn
	if(srcName!="SEARCHLIST") gLogMonitorBtnClick(srcName);
	//Log Monitor End:Btn
}

var mailTo="";
function getMailTo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=="undefined"){
			mailTo="";
		}else{
			mailTo=doc[1];
		}
	}
}

function fn_allClear(){
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	var formObj=document.frm1;	
	
	//sheetObj.RemoveAll();
	//sheetObj2.RemoveAll();
	
	
	formObj.p_wo_no.value="";
	formObj.p_intg_bl_seq.value="";
	formObj.p_oth_seq.value="";
	formObj.p_mbl_no.value="";
	formObj.p_bl_no.value="";
	formObj.p_biz_clss_cd.value="";
	formObj.p_return_trdp_cd.value="";
	formObj.p_air_sea_clss_cd.value="";
	formObj.p_trucker_trdp_cd.value="";
	
	
	formObj.ref_no.value="";
	formObj.hbl_no.value="";
	formObj.trucker_trdp_cd.value="";
	formObj.trucker_trdp_nm.value="";
	formObj.ofc_cd.value=ofc_cd;
	formObj.wo_no.value="";
	formObj.mbl_no.value="";
	formObj.delivery_trdp_cd.value="";
	formObj.delivery_trdp_nm.value="";
	formObj.type.value="";
	formObj.etd_strdt.value="";
	formObj.etd_enddt.value="";
	formObj.eta_strdt.value="";
	formObj.eta_enddt.value="";
	formObj.opr_usrid.value="";
	
	//All Option
	setOfficeAllOption(formObj.ofc_cd); 
}

function excelDown3(mySheet){
	var formObj = document.frm1;
	formObj.f_cmd.value = COMMAND10;
	var formParam = FormQueryString(formObj);
	var param = {
					DownCols: makeHiddenSkipCol(mySheet)
					,SheetDesign:1
					,URL:"./AIC_WOM_0020.clt"
					,ExtendParam:formParam
					,ExtendParamMethod:"GET"
				};
	mySheet.DirectDown2Excel(param);
	
}


function PARTNER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{					
		if(id=="del") {
			var rtnValAry=rtnVal.split("|");
			formObj.delivery_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.delivery_trdp_nm.value=rtnValAry[10];//locl_nm
			//formObj.delivery_trdp_addr.value=rtnValAry[26];//
			//formObj.delivery_trdp_addr.value=rtnValAry[37];
			//formObj.delivery_pic.value=rtnValAry[3];//pic_nm
			//formObj.delivery_phn.value=rtnValAry[4];//pic_phn
			//formObj.delivery_fax.value=rtnValAry[5];//pic_fax
		}else if(id=="trk") {
			var rtnValAry=rtnVal.split("|");
			formObj.trucker_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.trucker_trdp_nm.value=rtnValAry[10];//locl_nm
			//formObj.trucker_trdp_addr.value=rtnValAry[26];//
			//formObj.trucker_trdp_addr.value=rtnValAry[37];
			//formObj.trucker_pic.value=rtnValAry[3];//pic_nm
			//formObj.trucker_phn.value=rtnValAry[4];//pic_phn
			//formObj.trucker_fax.value=rtnValAry[5];//pic_fax
		}
	}
}



/**
 * 달력 POPUP
 * @param doWhat
 * @param frm1
 * @return
*/
function doDisplay(doWhat, frm1){
	var formObj=document.frm1;
    switch(doWhat){
	    case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
	    	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.eta_strdt, formObj.eta_enddt,  'MM-dd-yyyy');
	    break;
	    case 'DATE13':   //달력 조회 From ~ To 팝업 호출 
	    	var cal=new ComCalendarFromTo();
		    cal.displayType="date";
		    cal.select(formObj.etd_strdt,  formObj.etd_enddt,  'MM-dd-yyyy');
	    break;        
    }
}







//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;

    for(var i=0;i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
    
    
	//All Option
	setOfficeAllOption(formObj.ofc_cd); 
	
    //사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function RestoreGrid(){
	var formObj=document.frm1;
	
	/*
    //오늘일자구하기
	var now=new Date(); 			
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1; 		
	var date=now.getDate(); 	
	//4개월전 날짜구하기
	var preDt=new Date(Date.parse(now) - 90 * 1000 * 60 * 60 * 24);
	var preyear=preDt.getFullYear();
	var premonth=preDt.getMonth() + 1;
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+date;
	}
	if(premonth < 10){
		premonth="0"+(premonth);
	}
	var fromDay=premonth + "-" + "01" + "-" + preyear;
	var today=month + "-" + date + "-" + year;
	//이번달 말일구하기
	var endDay=getEndDate(today);
	//ZOOT 
	//formObj.post_frmdt.value=fromDay;
	//formObj.post_todt.value=endDay;
	
	*/
	
	doWork("SEARCHLIST");
}








/**
 * code name select
 */
var CODETYPE='';
function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	
	if(obj.value!=""){
		if(tmp=="onKeyDown"){			
			if (event.keyCode == 13){
				var s_code=obj.value;
				CODETYPE=str;
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					str=sub_str;
				}else if(sub_str=="Nodecode"){
					str='node';
				}else if(sub_str=="partner_"){
					str='trdpcode'
				}				
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			CODETYPE=str;
			var sub_str=str.substring(0,8);
			if(sub_str=="location"){
				str=sub_str;
			}else if(sub_str=="Nodecode"){
				str='node';
			}else if(sub_str=="partner_"){
				str='trdpcode'
			}			
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}
	else if(obj.value == ""){
		var formObj=document.frm1;
		CODETYPE=str;
		if(CODETYPE =="partner_delivery"){
			formObj.delivery_trdp_cd.value="";
			formObj.delivery_trdp_nm.value="";
			//formObj.delivery_trdp_addr.value="";
			//formObj.delivery_pic.value="";//pic_nm
			//formObj.delivery_phn.value="";//pic_phn
			//formObj.delivery_fax.value="";//pic_fax
		}else if(CODETYPE =="partner_trucker"){
			formObj.trucker_trdp_cd.value="";//trdp_cd
			formObj.trucker_trdp_nm.value="";//full_nm
			//formObj.trucker_trdp_addr.value="";//lgl_addr
			//formObj.trucker_pic.value="";//pic_nm
			//formObj.trucker_phn.value="";//pic_phn
			//formObj.trucker_fax.value="";//pic_fax
		}
	}
}

//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1]) != 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');		
			var masterVals=rtnArr[0].split('@@^');
			

			if(CODETYPE =="partner_delivery"){
				formObj.delivery_trdp_cd.value=masterVals[0];
//				formObj.delivery_trdp_nm.value = masterVals[3];//eng trdp name 				
				formObj.delivery_trdp_nm.value=masterVals[16];//local trdp name 
			}
			if(CODETYPE =="partner_trucker"){
				formObj.trucker_trdp_cd.value=masterVals[0];//trdp_cd
//				formObj.trucker_trdp_nm.value = masterVals[3];//eng_nm
				formObj.trucker_trdp_nm.value=masterVals[16];//local_nm
			}
		}else{
			if(CODETYPE =="partner_delivery"){
				formObj.delivery_trdp_cd.value="";
				formObj.delivery_trdp_nm.value="";
			}
			if(CODETYPE =="partner_trucker"){
				formObj.trucker_trdp_cd.value="";
				formObj.trucker_trdp_nm.value="";
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}


var cur_curObj;
function openPopUp(srcName, curObj) {
	cur_curObj = curObj;
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
	var frm1=document.frm1;
	try {
		switch (srcName) {
			
	        case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		
		   		callBackFunc = "USER_POPLIST";
		   		modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
	        break;
	        
		} // end switch
	} catch (e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        }
	}
}

function USER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.opr_usrid.value=rtnValAry[0];
	}
}

//말일구하기
function getEndDate(datestr){
	datestr=datestr.replaceAll("-","");
    var yy=Number(datestr.substring(4,8));
    var mm=Number(datestr.substring(0,2));
    //윤년 검증
    var boundDay="";
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm="0"+mm
       }
       boundDay=mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}
function formValidation(){
	var formObj=document.frm1;
	if(trim(formObj.post_frmdt.value)!= "" && trim(formObj.post_todt.value) != ""){
		if(getDaysBetweenFormat(formObj.post_frmdt,formObj.post_todt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033'));
			formObj.post_todt.focus();
			return false;
		}
	}	
	if(!chkSearchCmprPrd(false, frm1.post_frmdt, frm1.post_todt)){
		return false;
	}
	return true;
}



/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}
/**
  * Paging 항목 선택시 호출되
  */
function goToPage(callPage){
	docObjects[0].RemoveAll();
 	document.frm1.f_CurPage.value=callPage;
 	doWork('SEARCHLIST', '');
}

function entSearch(){
	if(event.keyCode == 13){
		document.frm1.f_CurPage.value='';
		doWork('SEARCHLIST');
	}
}

/**
  * 목록 조회건수 변경시 호출됨
  */
function viewCntChg(){
 	document.frm1.f_CurPage.value=1;
 	doWork('SEARCHLIST');
}
/**
  * 목록 조회건수 변경시 호출됨
  */
function searchList(){
 	document.frm1.f_CurPage.value=1;
 	doWork('SEARCHLIST');
} 
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
         case 1:      //IBSheet1 init
            with (sheetObj) {             
             (22, 0, 0, false);
             var cnt=0;

             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('AIC_WOM_0020_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ 
                    {Type:"Int",       Hidden:0,   Width:40,   Align:"Center",  ColMerge:0,   SaveName:"rnum",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:40,   Align:"Center",  ColMerge:0,   SaveName:"block_flag",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:120,  Align:"Center",  ColMerge:0,   SaveName:"wo_no",       	  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:120,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",    	  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:120,   Align:"Left",   ColMerge:0,   SaveName:"master_bl_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:120,   Align:"Left",   ColMerge:0,   SaveName:"house_bl_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,   Width:80,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,   Width:80,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:100,  Align:"Left",    ColMerge:0,   SaveName:"wo_tp_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:120,  Align:"Left",    ColMerge:0,   SaveName:"trucker_trdp_nm", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:90,   Align:"Left",    ColMerge:0,   SaveName:"pickup_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:120,  Align:"Left",    ColMerge:0,   SaveName:"delivery_trdp_nm",KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:120,  Align:"Left",    ColMerge:0,   SaveName:"return_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",      	  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",  		  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:120,  Align:"Right",   ColMerge:0,   SaveName:"cgo_pck_qty",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	                {Type:"Text",      Hidden:0,   Width:120,  Align:"Right",   ColMerge:0,   SaveName:"act_wgt_k",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	                {Type:"Text",      Hidden:0,   Width:120,  Align:"Right",   ColMerge:0,   SaveName:"act_wgt_l",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	                {Type:"Text",      Hidden:0,   Width:120,  Align:"Left",    ColMerge:0,   SaveName:"lnr_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:70,   Align:"Center",  ColMerge:0,   SaveName:"ofc_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:70,   Align:"Center",  ColMerge:0,   SaveName:"opr_usrid",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:70,   Align:"Center",  ColMerge:0,   SaveName:"edi_status",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,   Width:70,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,   Width:70,   Align:"Center",  ColMerge:0,   SaveName:"biz_clss_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,   Width:70,   Align:"Center",  ColMerge:0,   SaveName:"return_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,   Width:70,   Align:"Center",  ColMerge:0,   SaveName:"air_sea_clss_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,   Width:70,   Align:"Center",  ColMerge:0,   SaveName:"trucker_trdp_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Status",    Hidden:1,   Width:1,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
                    {Type:"Text",      Hidden:1,   Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
              
             InitColumns(cols);

             SetEditable(1);
             //InitViewFormat(0, "post_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             //InitViewFormat(0, "eta_dt_tm", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             //InitViewFormat(0, "etd_dt_tm", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
             SetSheetHeight(450);
             resizeSheet();
         }                                                      
           break;
           
       <!-- ############################################### COMMON MEMO 2-4 ##################################################### -->
         case 2:      //IBSheet1 init
      	   initMemo(sheetObj);                                              
         break;
       <!-- ############################################### COMMON MEMO 2-4 ##################################################### -->
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

function getPageURL() {
	return document.getElementById("pageurl").value;
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg){
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "block_flag") == "Y") {
			sheetObj.SetCellFontColor(i, "block_flag","#FF0000");
		}
	}
	
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){		
		if(delete_show_msg == 'Y'){
			setTimeout("showCompleteProcess()",1000);
			delete_show_msg = 'N';
		}
	} 		
 	if(frm1.f_cmd.value==REMOVE){
 		doWork("SEARCHLIST");
 	}
 	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));

	<!-- ############################################### COMMON MEMO 4-4 ##################################################### -->
	var intg_bl_seq = '';
	var palt_mnu_cd = '';
	var opr_no = '';
	
	if(sheetObj.GetTotalRows()>0){
		intg_bl_seq = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "ref_no");
		palt_mnu_cd = 'OTH';
		opr_no = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "ref_no");
	}
	
	setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
	<!-- ############################################### COMMON MEMO 4-4 ##################################################### -->
} 
function sheet1_OnSaveEnd(sheetOBj, ErrMsg){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(ErrMsg==undefined || ErrMsg==null || ErrMsg!=''){
		return;
	}
	//Save success!
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
	showCompleteProcess();
	doWork('SEARCHLIST');
}
function sheet1_OnClick(sheetObj,Row,Col){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	//formObj.ref_no.value=sheetObj.GetCellValue(Row, "ref_no");
/*	for(var i=1; i<=sheetObj.LastRow();i++){
		if(i == Row){
			sheetObj.SetRowBackColor(i,"#DFFFFF");
		}else{
			sheetObj.SetRowBackColor(i,"#FFFFFF");
		}
	}*/
	
	//print paramiter
	formObj.p_wo_no.value = sheetObj.GetCellValue(Row, "wo_no");
	formObj.p_intg_bl_seq.value = sheetObj.GetCellValue(Row, "intg_bl_seq");
	formObj.p_oth_seq.value = sheetObj.GetCellValue(Row, "ref_no");
	formObj.p_mbl_no.value = sheetObj.GetCellValue(Row, "master_bl_no");
	formObj.p_bl_no.value = sheetObj.GetCellValue(Row, "house_bl_no");
	formObj.p_biz_clss_cd.value = sheetObj.GetCellValue(Row, "biz_clss_cd");
	formObj.p_return_trdp_cd.value = sheetObj.GetCellValue(Row, "return_trdp_cd");
	formObj.p_air_sea_clss_cd.value = sheetObj.GetCellValue(Row, "air_sea_clss_cd");
	formObj.p_trucker_trdp_cd.value = sheetObj.GetCellValue(Row, "trucker_trdp_cd");
	
	if(sheetObj.ColSaveName(Col) == "ref_no" || Col==-2){
		var intg_bl_seq =  sheetObj.GetCellValue(Row, "ref_no");
		var palt_mnu_cd = 'OTH';
		var opr_no = sheetObj.GetCellValue(Row, "ref_no");
		setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
		doWorkMemo("SEARCHMEMO");
	}
}

function sheet1_OnChange(sheetObj,Row,Col){
	switch (sheetObj.ColSaveName(Col)) {
	    case "check_flag" :
			ajaxSendPost(checkOthInvReq, 'reqVal', '&goWhere=aj&bcKey=getCheckOthInv&oth_seq='+docObjects[0].GetCellValue(Row, "oth_seq"), './GateServlet.gsl');
			if(sheetObj.GetCellValue(Row, "block_flag") == "Y" || !isInvStsOk){
		   		alert(getLabel('FMS_COM_ALT022'));
		   		sheetObj.SetCellValue(Row, "check_flag","0",0);
				return;
			}
		break;
	}
}
//Calendar flag value
var firCalFlag=false;
function checkOthInvReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1]=='N'){
			isInvStsOk=false;
		}else{
			isInvStsOk=true;
		}
	}
}



/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	var wo_no=sheetObj.GetCellValue(Row, "wo_no");
    var paramStr="./AIC_WOM_0018.clt?air_sea_clss_cd=&bnd_clss_cd=G&biz_clss_cd=&f_cmd=2&f_wo_no="+escape(wo_no);
    parent.mkNewFrame('Pickup/Delivery Order', paramStr);    
}


/**
 * Sheet1의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet1_OnSelectMenu(sheetObj, MenuString){
	 var formObj=document.frm1;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// 사용자가 저장한 Header Setting을 삭제한다.
//		case "Header Setting Delete":
//			IBS_DelGridSetting(document.fName.user_id.value, getPageURL(), sheetObj);
//		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col=sheetObj.GetSelectCol();
			sheetObj.SetColHidden(col,1);
			sheetObj.SetColWidth(col,1);
		break;
	 }
}
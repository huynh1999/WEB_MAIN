var rtnary=new Array(2);
var callBackFunc = "";
var TODAY;
var isInvStsOk=false;
function doWork(srcName) {
	if(!btnGetVisible(srcName)){
		return;
	}
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	var formObj=document.frm1;
	switch (srcName) {
		case "NEW":
			// clearAll();
			var currLocUrl=this.location.href;
			currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
			currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
			//parent.mkNewFrame(document.getElementById("bigtitle").innerHTML, currLocUrl);
			window.location.href = currLocUrl
	        break;
		case "GOTOACCT":	
			var wms_ref_no = formObj.doc_ref_no.value;
			var wms_seq = formObj.wm_doc_seq.value;
			var paramStr = "./ACC_INV_0040.clt?f_cmd=-1&f_ref_no="+wms_ref_no+"&s_wms_seq="+wms_seq;
			paramStr+= "&refType=wmsRefNo";
			
			//#5203 [BINEX] AFTER V470.06 RELEASE, PERIOD RANGE SETTING : Link시 검색기간 제외 조회 옵션처리
			paramStr+= "&linkOpt=KEY";
			
		    parent.mkNewFrame('Invoice List', paramStr);

		break;
		case "SELECT":  //Header Search
			
			if(frm1.f_doc_ref_no.value==''){
     		   alert(getLabel('SUP_COM_ALT008'));
     		   frm1.f_doc_ref_no.focus();
     		   return;
     	   }			
			checkDuplicateDocRefNo("SEARCH");
			if(checkDocRefNo == false){
				ComShowCodeMessage('COM12253');
//				alert("Receiving No. entered does not exist.");
				formObj.f_doc_ref_no.focus();
				return;
				}
			formObj.f_cmd.value=SEARCH;
			formObj.action="WHM_WHM_0010.clt";
	    	formObj.submit();
		break;
		case "SEARCHLIST":  //Detail Search
			formObj.f_cmd.value=SEARCHLIST;
			sheetObj2.DoSearch("WHM_WHM_0010_01GS.clt", FormQueryString(formObj) );
		break;	
		case "SEARCHLIST02":   //Detail Search (Rcv Shp Date)
			formObj.f_cmd.value=SEARCHLIST02;
			sheetObj2.DoSearch("WHM_WHM_0010_01GS.clt", FormQueryString(formObj) );
		break;
		case "REMOVE":
	/*		formObj.f_cmd.value=REMOVE;
			formObj.action="WHM_WHM_0010.clt";
	    	formObj.submit();*/
	    	//checkWMInvReq
			ajaxSendPost(checkWMInvReq, 'reqVal', '&goWhere=aj&bcKey=getCheckWMInv&wm_doc_seq='+formObj.wm_doc_seq.value, './GateServlet.gsl');
		   	if(isInvStsOk){
				if (confirm(getLabel('FMS_COM_CFMDEL'))) {
					formObj.f_cmd.value=REMOVE;
					formObj.action="WHM_WHM_0010.clt";
			    	formObj.submit();
				}
		   	 }else{
		   	 		alert(getLabel('FMS_COM_ALT022'));
		   	 }
		break;
		case "MODIFY"://저장
			// 필수값 check
			
			if(checkAll()){   
				if (confirm(getLabel('FMS_COM_CFMSAV'))) { //'Do you want to Save? ';
					if (frm1.wm_doc_seq.value == ""){   //wm_doc_seq/value === > 
						frm1.save_sts_flg.value="I";
					} else {
						frm1.save_sts_flg.value="U";
					}
					formObj.f_cmd.value=MODIFY;
					var intRows=sheetObj.LastRow() + 1;
			        sheetObj.DataInsert(intRows);
					var sht2=sheetObj2.GetSaveString(false);
					
					sheetObj.DoAllSave("./WHM_WHM_0010GS.clt", FormQueryString(formObj)+'&'+sht2, true);
				}
			}
		break;
		case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
			rtnary[0]="";
	   		rtnary[1]=formObj.cust_nm.value;
	   		rtnary[2]=window;
  	        
  	        callBackFunc = "CUSTOMER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
  	      break;
		case "CUSTOMER_POPLIST_F"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(2);
			rtnary[0]="";
	   		rtnary[1]=formObj.f_cust_nm.value;
	   		rtnary[2]=window;
  	        
  	        callBackFunc = "CUSTOMER_POPLIST_F";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
  	    
		break;
		case "btn_ctrt_no":	
//			var sUrl="./ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value;
			var sUrl="./ContractRoutePopup.clt";
			   callBackFunc = "setCtrtNoInfo";
			   modal_center_open(sUrl, callBackFunc, 900,620,"yes");
			break;
		
		/*case "DOC_SAVE":
			var isDel=false;
			for(var i=1; i < docObjects[2].LastRow() + 1; i++){
				if(docObjects[2].GetCellValue(i, 'doc_ibflag')=='D'){
					isDel=true;
					break;
				}
			}
			if (isDel&&confirm(getLabel('FMS_COM_CFMSAV'))) {
	   	 		frm1.f_cmd.value=COMMAND03;
	   	 		docObjects[2].DoAllSave("./WHM_WHM_0010_1GS.clt", FormQueryString(frm1), true);
			}else if(!isDel){
				alert(getLabel('FMS_COM_ALT028'));
			}
   	 	break;*/
   	 	/*case "SNDEML":	//Email전송
    		var reqParam='?intg_bl_seq='+frm1.doc_ref_no.value;
       		reqParam += '&openMean=SEARCH01';
   	   		popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");
   	    break;
   	 	case "DOCFILE":	//첨부파일
   	 		var reqParam='?intg_bl_seq='+frm1.doc_ref_no.value;
   	 		reqParam += '&openMean=SEARCH01';
   	 		popGET('./SEE_BMD_0051.clt'+reqParam, 'seeShipDoc', 806, 450, "scroll:no;status:no;help:no;");
   	 	break;*/
   	 	
	}
}

function setCtrtNoInfo(aryPopupData){
	var formObj=document.frm1;
    if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
	 	return;
	}else{
		  var rtnValAry=aryPopupData.split("|");
		   formObj.s_ctrt_no.value=rtnValAry[0];
		   formObj.ctrt_nm.value=rtnValAry[1];
		   getCtrtInfo(formObj.s_ctrt_no);
	}
}

function LOCATION_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		//frm1.pod_cd.value = "";
		var rtnValAry=rtnVal.split("|");
		if (curObj == "pod") {
			frm1.pod_cd.value=rtnValAry[0];// loc_cd
			frm1.pod_nod_cd.value=rtnValAry[1];// nod_cd
			frm1.pod_nm.value=rtnValAry[2];// loc_nm
		} else if (curObj == "org") {
			frm1.pol_cd.value=rtnValAry[0];// loc_cd
			frm1.pol_cd.value=rtnValAry[1];// nod_cd
			frm1.pol_nm.value=rtnValAry[2] + ', ' + rtnValAry[4];// loc_nm
			ajaxSendPost(setNodPic, 'reqVal',
					'&goWhere=aj&bcKey=getNodePic&callId=O&node_cd='
							+ rtnValAry[1], './GateServlet.gsl');
		} else if (curObj == "org2") {
			frm1.pol_cd.value=rtnValAry[0];// loc_cd
			frm1.pol_cd.value=rtnValAry[1];// nod_cd
			frm1.pol_nm.value=rtnValAry[2] + ', ' + rtnValAry[4];// loc_nm
			ajaxSendPost(setNodPic, 'reqVal',
					'&goWhere=aj&bcKey=getNodePic&callId=O2&node_cd='
							+ rtnValAry[1], './GateServlet.gsl');
		} else if (curObj == "via") {
			frm1.pol_cd.value=rtnValAry[0];// loc_cd
			frm1.pol_cd.value=rtnValAry[1];// nod_cd
			frm1.pol_nm.value=rtnValAry[2] + ', ' + rtnValAry[4];// loc_nm
		} else if (curObj == "dest") {
			frm1.pol_cd.value=rtnValAry[0];// loc_cd
			frm1.pol_cd.value=rtnValAry[1];// nod_cd
			frm1.pol_nm.value=rtnValAry[2] + ', ' + rtnValAry[4];// loc_nm
			ajaxSendPost(setNodPic, 'reqVal',
					'&goWhere=aj&bcKey=getNodePic&callId=D&node_cd='
							+ rtnValAry[1], './GateServlet.gsl');
		}
		
		
	}
}

function USER_POPLIST2(rtnVal){
	var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.opr_usrid.value=rtnValAry[0];
	}
}

function OFFICE_GRID_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(cur_curObj.id == "ctrbOfc"){
			formObj.ctrb_ofc_cd.value=rtnValAry[0];
		}else{
			formObj.sls_ofc_cd.value=rtnValAry[0];
		}
	}
}


function USER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.sls_usrid.value=rtnValAry[0];
	}
}



/*function COMMODITY_POPLIST(rtnVal){
	var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.cmdt_cd.value=rtnValAry[0];
		formObj.cmdt_nm.value=rtnValAry[2];
	}
}*/

function CUSTOMER_POPLIST(rtnVal){
  	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.cust_cd.value=rtnValAry[0];//full_nm
		formObj.cust_nm.value=rtnValAry[2];//full_nm
		setCtrbMgn(rtnValAry[0]);
	}
}

function CUSTOMER_POPLIST_F(rtnVal){
  	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cust_cd.value=rtnValAry[0];//full_nm
		formObj.f_cust_nm.value=rtnValAry[2];//full_nm
	}
}



//화면 이동
//var paramStr = "./SEE_BMD_0030.clt?f_cmd="+SEARCHLIST02+"&f_hbl_bl_seq="+frm1.intg_bl_seq.value;
//parent.mkNewFrame('S/R Entry', paramStr);
var cur_curObj;
function openPopUp(srcName, curObj) {
	cur_curObj = curObj;
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
	var frm1=document.frm1;
	try {
		switch (srcName) {
		
			case "LOCATION_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]="";
				callBackFunc = "LOCATION_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
			break;
			case "POL_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]=frm1.pol_nm.value;
				
				callBackFunc = "POL_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
			break;
			case "POD_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]=frm1.pod_nm.value;
				
				callBackFunc = "POD_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
				
				/*
				var rtnVal =  ComOpenWindow('./CMM_POP_0030.clt',  rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:440px" , true);
				if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					return;
				} else {
					var curObjId=curObj.id;
					var rtnValAry=rtnVal.split("|");
					//frm1.pol_cd.value = "";
					frm1.pod_cd.value=rtnValAry[0];// loc_cd
					frm1.pod_nod_cd.value=rtnValAry[1];// nod_cd
					frm1.pod_nm.value=rtnValAry[2];// loc_nm
				}
				*/
			break;
			case "F_DEST_DATE":
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]=frm1.fnl_dest_loc_nm.value;
				
				callBackFunc = "F_DEST_DATE";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
			break;
	        case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		
		   		callBackFunc = "USER_POPLIST";
		   		modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
	        break;
	        case "USER_POPLIST2"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		callBackFunc = "USER_POPLIST2";
		   		modal_center_open('./CMM_POP_0060.clt', rtnary, 556,470,"yes");
	        break;
	        case "OFFICE_GRID_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
	       		rtnary=new Array(2);
		   		rtnary[0]="1";
		   		callBackFunc = "OFFICE_GRID_POPLIST";
		   		modal_center_open('./CMM_POP_0150.clt', rtnary, 556,580,"yes");
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


function setCtrbDeptCd(){
	var formObj = document.frm1;
	formObj.ctrb_dept_cd.value = "OT";
}
function checkRatioValid(){
	var formObj = document.frm1;
	
	if (formObj.ctrb_ratio_yn.value == "Y"){
		if (Number(removeComma(formObj.ctrb_mgn.value)) > 50) {
			alert(getLabel2('FMS_COM_ALT076',new Array("50")));
			formObj.ctrb_mgn.value = "";
			formObj.ctrb_mgn.focus();
			return;
		}
	}
}

function setCtrbMgn(s_cust_cd) {
	var formObj=document.frm1;
	var s_post_dt = formObj.post_dt.value;
	
	if (typeof(formObj.ctrb_ofc_cd)!='undefined')
	{
		if (s_post_dt != ""){
			ajaxSendPost(searchCtrbMgnReq, "reqVal", "&goWhere=aj&bcKey=searchCtrbMgn&s_cust_cd="+s_cust_cd + "&s_post_dt="+s_post_dt, "./GateServlet.gsl");
		}
	}
}

function checkBoxSetting(){
	var formObj=document.frm1;
	
	if(formObj.ctrb_ratio_yn.value=="Y"){
		formObj.ctrb_ratio_yn.checked=true;
	}else{
		formObj.ctrb_ratio_yn.checked=false;
	}
}


function searchCtrbMgnReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@^^@');
			
			formObj.ctrb_ofc_cd.value = rtnArr[0];
			formObj.ctrb_ratio_yn.value = rtnArr[1];
			formObj.ctrb_mgn.value = doMoneyFmt(Number(rtnArr[2]).toFixed(2));
			
			setCtrbDeptCd();
		} else {
			formObj.ctrb_ofc_cd.value = "";
			formObj.ctrb_ratio_yn.value = "N";
			formObj.ctrb_mgn.value = "";
			formObj.ctrb_dept_cd.value = "";
		}
		
		if(formObj.ctrb_ratio_yn.value=="Y"){
			formObj.ctrb_ratio_yn.checked=true;
		}else{
			formObj.ctrb_ratio_yn.checked=false;
		}
	}
}


var firCalFlag=false;
/**
 * 달력 POPUP
 * @param doWhat
 * @param frm1
 * @return
*/
function doDisplay(doWhat, frm1){
    switch(doWhat){
    case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
        var cal=new ComCalendarFromTo();
        cal.displayType = "date";
        cal.select(frm1.f_rcvshp_fmdt,frm1.f_rcvshp_todt, 'MM-dd-yyyy');
      
        break;
        case 'DATE_POST':   //달력 조회 팝업 호출  
            var cal=new ComCalendar(); 
        	cal.select(frm1.post_dt,  'MM-dd-yyyy');
        break;
    }
}
/*
 * function saveValid(sheetObj){ var rows = sheetObj.Rows; var cnt = 0; for(var
 * i = 1 ; i < rows ; i++){ if(sheetObj.CellValue(i, "ibflag") != "R"){
 * if(sheetObj.CellValue(i, "oth_tp") == ""){ alert("[Type] is mandatory
 * field!") return false; } cnt++; } } if(cnt == 0){ alert("No data to save!")
 * return false; }else{ return true; } }
 */
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
	if (frm1.doc_ref_no.value == ""){
		frm1.save_sts_flg.value="I";
	} else {
		frm1.save_sts_flg.value="U";
	}
	for(var i=0;i<docObjects.length;i++){
		//khlee-시작 환경 설정 함수 이름 변경
	    comConfigSheet(docObjects[i], SYSTEM_FIS);
	    initSheet(docObjects[i],i+1);
	    //khlee-마지막 환경 설정 함수 추가
	    comEndConfigSheet(docObjects[i]);
	}
	//오늘일자구하기
	frm1.ctrb_mgn.value=doMoneyFmt(Number(frm1.ctrb_mgn.value).toFixed(2));
	checkBoxSetting();
	var now=new Date(); 				
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1; 		
	var date=now.getDate(); 			
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+date;
	}
	TODAY=month + "-" + date + "-" + year;
	if(formObj.post_dt.value == ""){
		formObj.post_dt.value=TODAY;
	}else{
		var post_dt=formObj.post_dt.value;
		//formObj.post_dt.value = post_dt.substr(0,2) + "-" + post_dt.substr(2,2) + "-" + post_dt.substr(4,4);
	}
	if(formObj.doc_ref_no.value != ""){
		
		
		if(formObj.h_wh_cd.value != ""){
			formObj.wh_cd.value = formObj.h_wh_cd.value
		}
		doWork('SEARCHLIST');
	}
	if(formObj.sls_usrid.value == ""){
		formObj.sls_usrid.value=formObj.f_usr_id.value;
	}
	if(formObj.sls_ofc_cd.value == ""){
		formObj.sls_ofc_cd.value=formObj.f_ofc_cd.value;
	}
	if(formObj.opr_usrid.value == ""){
		formObj.opr_usrid.value=formObj.f_usr_id.value;
	}
	
	if(frm1.wm_doc_seq.value==''){
    	//collect로 셋팅
    	//frm1.frt_term_cd.value = 'CC';
    	//AUTO 표시
    	frm1.doc_ref_no.value="AUTO";

    }
	
	//LHK, 20140228, #26595  Other Operation 의 Accounting Validation 
	if(formObj.f_sts_cd.value == "B"){
		formObj.cust_cd.className='search_form-disable';
		formObj.cust_cd.disabled=true;
		formObj.cust_nm.className='search_form-disable';
		formObj.cust_nm.disabled=true;
		formObj.cust.disabled = true;
		formObj.post_dt.className='search_form-disable';
		formObj.post_dt.disabled=true;
		formObj.post_dt_cal.style.display="none";
		formObj.ofc_cd.className='search_form-disable';
		formObj.ofc_cd.disabled=true;
	}else{
		formObj.cust_cd.className='search_form';
//		formObj.cust_cd.disabled=false;
		formObj.cust_nm.className='search_form';
//		formObj.cust_nm.disabled=false;
		formObj.cust.disabled = false;
		formObj.post_dt.className='search_form';
		formObj.post_dt.disabled=false;
		formObj.post_dt_cal.style.display="inline";
		formObj.ofc_cd.className='search_form';
		formObj.ofc_cd.disabled=false;
	}
	
	//2016.04.21 C.W.Park Modified
	//#52109 jsp 로 이동 - 버튼까지 로딩 완료 후에 호출해야 정확한 값을 가져온다.
//	//LHK, 20131028 setPost_date(save_flag) 추가 비교 로직으로 인해 저장 후 org_post_dt reset
//	setBlock_dt();
	
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
* 시트 초기설정값, 헤더 정의
* param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
* 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
*/
function initSheet(sheetObj,sheetNo) {
  switch(sheetNo) {
  case 1:      //IBSheet1 init
      with (sheetObj) {
        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        var headers = [ { Text:getLabel('WHM_WHM_0010_HDR1'), Align:"Center"} ];
        InitHeaders(headers, info);

        var cols = [ {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"g_doc_ref_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
               {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"g_wm_doc_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
               {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"g_wh_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
               {Type:"Status",    Hidden:0, Width:1,    Align:"Center",  ColMerge:1,   SaveName:"g_ibflag" } ];
         
        InitColumns(cols);
        SetEditable(1);
        SetVisible(false);
     }                                                      
   break;
	  case 2:      //IBSheet1 init
          with (sheetObj) {
    	   	SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

    	   	var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
    	   	var headers = [ { Text:getLabel('WHM_WHM_0010_HDR2'), Align:"Center"} ];
    	   	InitHeaders(headers, info);

         var cols = [ {Type:"DelCheck",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, HeaderCheck: 0 },
                {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"check_flag" },
                {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"f_wh_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
                {Type:"Text",      Hidden:0,  Width:160,   Align:"Left",    ColMerge:1,   SaveName:"file_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                {Type:"Text",      Hidden:0,  Width:200,   Align:"Left",    ColMerge:1,   SaveName:"cust_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"bkg_dt",           KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"rcv_shp_dt",           KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:200,   Align:"Left",    ColMerge:1,   SaveName:"cust_ref_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                {Type:"Text",      Hidden:0,  Width:200,   Align:"Left",    ColMerge:1,   SaveName:"splr_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                {Type:"Text",      Hidden:0,  Width:200,   Align:"Left",    ColMerge:1,   SaveName:"trkr_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",    ColMerge:1,   SaveName:"po_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",    ColMerge:1,   SaveName:"plt_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",    ColMerge:1,   SaveName:"cntr_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",    ColMerge:1,   SaveName:"mbl_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",    ColMerge:1,   SaveName:"hbl_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",    ColMerge:1,   SaveName:"rcv_by",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                {Type:"Status",    Hidden:1, Width:1,    Align:"Center",  ColMerge:1,   SaveName:"ibflag" } ];
          
          
         	InitColumns(cols);
         	SetEditable(1);
         	
         	SetFocusAfterProcess(0);
         	SetSheetHeight(300);
         }                                                      
       break;
       
   }
}
//조회 후
function sheet1_OnSearchEnd(){	
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(sheetObj.GetCellValue(1, "g_doc_ref_no") != "" && sheetObj.GetCellValue(1, "g_doc_ref_no") != undefined){
		formObj.doc_ref_no.value=sheetObj.GetCellValue(1, "g_doc_ref_no");
		formObj.wm_doc_seq.value=sheetObj.GetCellValue(1, "g_wm_doc_seq");	
		formObj.wh_cd.value=sheetObj.GetCellValue(1, "g_wh_cd");
		showCompleteProcess();
	}
}
//저장 후

function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(errMsg == "" || errMsg == undefined || errMsg == null){
		formObj.f_doc_ref_no.value=sheetObj.GetCellValue(1, "g_doc_ref_no");
		formObj.doc_ref_no.value=sheetObj.GetCellValue(1, "g_doc_ref_no");
		formObj.wm_doc_seq.value=sheetObj.GetCellValue(1, "g_wm_doc_seq");
		formObj.old_doc_ref_no.value=sheetObj.GetCellValue(1, "g_doc_ref_no");  //이건무엇이지??
		formObj.wh_cd.value=sheetObj.GetCellValue(1, "g_wh_cd");
		formObj.org_post_dt.value=formObj.post_dt.value;
		showCompleteProcess();   //Progress bar
		doWork("SEARCHLIST");
	}
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}




function sheet2_OnSearchEnd(sheetObj, row, col) {
	//var sheetObj=docObjects[1];
	var sheetLen = sheetObj.RowCount();
	for(var i = 1; i <= sheetLen; i++){
		if(sheetObj.GetCellValue(i, "check_flag")==0){
			//sheetObj.SetCellEditable(i, "del_chk",0);
			sheetObj.SetCellEditable(i, "check_flag",1);
		}else{
			sheetObj.SetCellEditable(i, "del_chk",1);
			sheetObj.SetCellEditable(i, "check_flag",0);
		}			
	}	
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}


/*function sheet2_OnClick(sheetObj, row, col) {
	if (col ==0) {	
		sheetObj.RowDelete(row,false);
	}	
}*/

function sheet2_OnChange(sheetObj, row, col) {
	if (col ==0) {	
		sheetObj.SetCellValue(i, "ibflag","D");
		//sheetObj.RowDelete(row,false);
	}	
}





function sheet2_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
		
}




/**
 * Container번호 중복확인
 */
function checkCntrNo(inCntrNo){
	var intRows=docObjects[1].LastRow() + 1;
	var loopNum=0;
	for(var i=1; i < intRows; i++){
		if(inCntrNo==docObjects[1].GetCellValue(i, 'cntr_no')){
			loopNum++;	
		}
	}
	if(loopNum>1){
		return false;
	}else{
		return true;
	}
}

var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}				
	var s_type="";
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="Location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="Location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}else if ( tmp == "onChange" ) {
			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';	 
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		
		if(typeof(doc[1])!='undefined'){
		
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "Location_por"){	
				if(masterVals[0]==''){
					formObj.por_cd.focus();
				}else{
					formObj.por_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd
					formObj.por_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
				}
			}else if(CODETYPE == "Location_pol"){
				if(masterVals[0]==''){
					formObj.pol_cd.focus();
				}else{
					formObj.pol_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd
					formObj.pol_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
				}
			}else if(CODETYPE == "Location_pod"){
				if(masterVals[0]==''){
					formObj.pod_cd.focus();
				}else{
					formObj.pod_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd 
					formObj.pod_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
				}
			}else if(CODETYPE == "Location_del"){
				if(masterVals[0]==''){
					formObj.del_cd.focus();
				}else{
					formObj.del_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd 
					//formObj.del_nod_cd.value= masterVals[1];//nod_cd
					//formObj.del_nm.value    = masterVals[3]+', '+masterVals[4];//loc_nm
					formObj.del_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
				}
			}else if(CODETYPE == "Location_dest"){
				formObj.fnl_dest_loc_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd 
				//formObj.fnl_dest_nod_cd.value = masterVals[1];//nod_cd
				//formObj.fnl_dest_loc_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
				formObj.fnl_dest_loc_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
			}else if(CODETYPE == "commodity"){
				formObj.cmdt_cd.value=masterVals.length > 0 ? masterVals[0] : ""; 
				formObj.cmdt_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
			}else if(CODETYPE == "trdpCode_cs"){
				formObj.cust_cd.value=masterVals.length > 0 ? masterVals[0] : ""; 
				formObj.cust_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
				setCtrbMgn(formObj.cust_cd.value);
			}else if(CODETYPE == "trdpCode"){
				formObj.f_cust_cd.value=masterVals.length > 0 ? masterVals[0] : ""; 
				formObj.f_cust_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
			}else if(CODETYPE == "trdpCode_pu"){
				formObj.pu_loc_cd.value=masterVals.length > 0 ? masterVals[0] : "";//loc_cd 
				formObj.pu_loc_nm.value=masterVals.length > 3 ? masterVals[3] : "";//loc_nm
			}else if(CODETYPE == "trdpCode_door"){
				formObj.door_loc_cd.value=masterVals.length > 0 ? masterVals[0] : ""; 
				formObj.door_loc_nm.value=masterVals.length > 3 ? masterVals[3] : "";
			}else if(CODETYPE == "booking_s"){
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "bkg_no",masterVals.length > 0 ? masterVals[0] : "", 0); 
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "intg_bl_seq",masterVals.length > 1 ? masterVals[1] : "", 0); 
			}
		}else{
			if(CODETYPE == "Location_por"){
				formObj.por_cd.value="";//loc_cd
				//formObj.por_nod_cd.value = "";//nod_cd
				formObj.por_nm.value="";//loc_nm
				formObj.por_cd.focus();
			}else if(CODETYPE == "Location_pol"){
				formObj.pol_cd.value="";//loc_cd
				//formObj.pol_nod_cd.value = "";//nod_cd
				formObj.pol_nm.value="";//loc_nm
				formObj.pol_cd.focus();
			}else if(CODETYPE == "Location_pod"){
				formObj.pod_cd.value="";//loc_cd
				//formObj.pod_nod_cd.value = "";//nod_cd
				formObj.pod_nm.value="";//loc_nm
				formObj.pod_cd.focus();
			}else if(CODETYPE == "Location_del"){
				formObj.del_cd.value="";//loc_cd 
				//formObj.del_nod_cd.value = "";//nod_cd
				formObj.del_nm.value="";//loc_nm
				formObj.del_cd.focus();
			}else if(CODETYPE == "Location_dest"){
				formObj.fnl_dest_loc_cd.value="";//loc_cd
				//formObj.fnl_dest_nod_cd.value = "";//nod_cd
				formObj.fnl_dest_loc_nm.value="";//loc_nm
				formObj.fnl_dest_loc_cd.focus();
			}else if(CODETYPE == "commodity"){
				formObj.cmdt_cd.value=""; 
				formObj.cmdt_nm.value="";
			}else if(CODETYPE == "trdpCode_cs"){			 
				formObj.cust_cd.value=""; 
				formObj.cust_nm.value="";//loc_nm	
			}else if(CODETYPE == "f_trdpCode_cs"){			 
				formObj.f_cust_cd.value=""; 
				formObj.f_cust_nm.value="";//loc_nm	
			}else if(CODETYPE == "trdpCode_pu"){
				formObj.pu_loc_cd.value="";
				formObj.pu_loc_cd.focus();
			}else if(CODETYPE == "trdpCode_door"){
				formObj.door_loc_cd.value=""; 
				formObj.door_loc_nm.value="";
			}else if(CODETYPE == "booking_s"){
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "bkg_no","", 0); 
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), "intg_bl_seq","", 0);
			}
		}
	}else{
		//Error occurred!
		alert(getLabel('FMS_COM_ERR001'));
	}
}
//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
//		  if(collTxt[i].name != "f_usr_id" && collTxt[i].name != "f_ofc_cd"){
//	  			collTxt[i].value = "";
//			}
			if(!(collTxt[i].name == "f_usr_id" || collTxt[i].name == "f_ofc_cd" )){
				collTxt[i].value="";
			}
	  }           
	}
	setSelection();
	frm1.type[0].selected=true;

	frm1.post_dt.value=TODAY;
	sheetObj2.RemoveAll();
	
	formObj.sls_usrid.value=formObj.f_usr_id.value;
	formObj.sls_ofc_cd.value=formObj.f_ofc_cd.value;
	formObj.opr_usrid.value=formObj.f_usr_id.value;

	setBlock_dt();
}
//필수값 체크
function checkAll(){
	var formObj=document.frm1;
	var rtnVal=true;
	var chkwarehouse=false;
	var sheetObj2=docObjects[1];
	
	if(frm1.ofc_cd.value == ""){
		
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('ITM_OFFICE_CD'));	
		frm1.ofc_cd.focus();
		return false;
	}else if(frm1.s_ctrt_no.value == ""){
		ComShowCodeMessage('COM132606');
		frm1.s_ctrt_no.focus();
		return false;
	}else if(frm1.cust_cd.value == ""){
		
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CUST'));	
		frm1.cust_cd.focus();
		return false;
	}else if(frm1.wh_cd.value == ""){
		
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('WH'));	
		frm1.wh_cd.focus();
		return false;
	}else if(frm1.post_dt.value == ""){
		
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_POSTDT'));	
		frm1.post_dt.focus();
		return false;
	}else if(checkInputVal(frm1.cntr_info.value, 0, 200, "T", 'Container Information')!='O'){
		
		frm1.cntr_info.focus();
		return false;
	}else if(checkInputVal(frm1.int_memo.value, 0, 200, "T", 'Internal Memo')!='O'){
		
		frm1.int_memo.focus();
		return false;
	}else if(checkInputVal(frm1.ext_memo.value, 0, 200, "T", 'External Memo')!='O'){
		
		frm1.ext_memo.focus();
		return false;
	}
	
	/* TinLuong modification 2015.10.15 
	 * var sheetLen = sheetObj2.RowCount();
	for(var i = 1; i <= sheetLen; i++){
		if(sheetObj2.GetCellValue(i, "check_flag")==1){
			chkwarehouse = true;
			break;
		}		
	}
	
	if (chkwarehouse == false){
		alert(getLabel('FMS_COM_WHSAV'));
		rtnVal=false;
	}  */
	
	return rtnVal;	
}

function custEnterAction(obj, type){
	var formObj=document.frm1;
	if (event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}else if(type == "LOC_POL"){
			openPopUp('POL_POPLIST',obj);
		}else if(type == "LOC_POD"){
			openPopUp('POD_POPLIST',obj);
		}else if(type == "LOC_DEST"){
			openPopUp('F_DEST_DATE',obj);
		}else if(type == "LOC_PICKUP"){
			doWork('PICKUP_LOC_POPLIST',obj);
		}else if(type == "LOC_DOOR"){
			doWork('DOOR_POPLIST',obj);
		}else if(type == "COMMODITY"){
			doWork("COMMODITY_POPLIST");
		}
	}
}
//Invoice NO 중복체크를 한다.
function checkRefNo(){
	var formObj=document.frm1;
	if(formObj.doc_ref_no.value != ""){
		if(formObj.doc_ref_no.value != formObj.old_doc_ref_no.value){
			ajaxSendPost(checkWMDocRefDup, 'reqVal', '&goWhere=aj&bcKey=checkWMDocRefDup&doc_ref_no='+formObj.doc_ref_no.value, './GateServlet.gsl');
		}
	}
}
/**
 * AJAX RETURN
 * REF NO 중복체크
 */
function checkWMDocRefDup(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				//alert("Ref. No Duplicate!! ");
				alert(getLabel('FMS_COM_ALT008') + "\n - " + getLabel('FMS_COD_WMFILNO'));	
				formObj.doc_ref_no.value=formObj.old_doc_ref_no.value;
				formObj.doc_ref_no.select();
			}
		}
	}
}

/*function reloadDocList(){
	doWork("SEARCHLIST03");
}
function getSelectedFiles(){
	return docObjects[2];
}*/

/**
* IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
* sheet3_OnClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
*/

//파일 다운로드
function downloadFile(downType,s_palt_doc_seq){
	document.frm2.docType.value=downType;
	document.frm2.s_palt_doc_seq.value=s_palt_doc_seq;
	//document.frm2.target = '_self';
	document.frm2.submit();
}
var ORG_BLOCK_DT=""; 		//MAX(BLOCK_DT)
var NEXT_BLOCK_DT="";    	//MAX(BLOCK_DT)+1
/** LHK, 20131025 #21734  [BINEX]Post Date Check 로직 적용
 *  File Block_dt 와 Post Date 체크, Post Date Set, BL 생성시 post date 에는 MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
 **/
function setBlock_dt(){
	var formObj=document.frm1;
	//MAX(JNR_DT) +1, MAX(BLOCK_DT)+1 중 큰 Date Next Block date 에 Set
	var param = formObj.ofc_cd.value;
	ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt&searchOfcCd=' + param, './GateServlet.gsl');
 	if(NEXT_BLOCK_DT != "") {
 		var nextBlockDtYMD=NEXT_BLOCK_DT.replaceAll("-", "");														//NEXT_BLOCK_DT  12-01-2013
			nextBlockDtYMD=nextBlockDtYMD.substring(4,8)+nextBlockDtYMD.substring(0,2)+nextBlockDtYMD.substring(2,4);	//nextBlockDtYMD 20131201
			ORG_BLOCK_DT=addDate('d', -1, nextBlockDtYMD, "");
			ORG_BLOCK_DT=ORG_BLOCK_DT.substring(4,6) + "-" + ORG_BLOCK_DT.substring(6,8) + "-" + ORG_BLOCK_DT.substring(0,4);
		//post_dt 와 block_dt 비교
		//fromDate > toDate true
		if(formObj.wm_doc_seq.value == ""){
			if(compareTwoDate(NEXT_BLOCK_DT, formObj.post_dt.value)){
	 			formObj.post_dt.value=NEXT_BLOCK_DT;
	 		}
			formObj.org_post_dt.value=formObj.post_dt.value;
		}	
 	}
}
function checkPostDate(obj){
	var formObj=document.frm1;
	var post_dt=obj.value;
	//OnChange 시에 check 함
	if(post_dt == formObj.org_post_dt.value){
		return;
	}
	//Post Date 가 변경되는 경우에 NEXT_BLOCK_DT 보다 작으면 warnning massage 띄워줌
	if(NEXT_BLOCK_DT != "") {
		if(compareTwoDate(NEXT_BLOCK_DT, post_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
			alert(getLabel2('SUP_COM_ALT007',new Array(ORG_BLOCK_DT)));	//The Post Date must be later than the block date (@)";
			formObj.post_dt.value=formObj.org_post_dt.value;
			formObj.post_dt.select();
			return false;
		}
	}
	setCtrbMgn(formObj.cust_cd.value);
}
function getMaxBlockOrJnrNextDt(reqVal){
 	var doc=getAjaxMsgXML(reqVal);
 	if(doc[0]=='OK'){
 		if(typeof(doc[1])!='undefined'){
 			NEXT_BLOCK_DT=doc[1];
 			NEXT_BLOCK_DT=NEXT_BLOCK_DT.substring(4,6) + "-" + NEXT_BLOCK_DT.substring(6,8) + "-" + NEXT_BLOCK_DT.substring(0,4);
 		}else{
			NEXT_BLOCK_DT="";
		}
 	}
}
function checkWMInvReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1]=='N'){
			isInvStsOk=false;
		}else{
			isInvStsOk=true;
		}
	}
}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	doShowProcess();
	$.ajax({
		   type: "POST",
		   url: "./WHM_WHM_0010AJ.clt?f_cmd="+getParam(url,"f_cmd")+"&doc_ref_no="+getParam(url,"doc_ref_no")+"&wm_doc_seq="+getParam(url,"wm_doc_seq"),
		   dataType: 'xml',
		   success: function(data){
			   setFieldValue( formObj.wm_doc_seq, $('wm_doc_seq',data).text());
			   setFieldValue( formObj.old_doc_ref_no, $('doc_ref_no',data).text());
			   setFieldValue( formObj.f_sts_cd, $('sts_cd',data).text());
			   setFieldValue( formObj.org_post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.doc_ref_no, $('doc_ref_no',data).text());
			   setFieldValue( formObj.h_ofc_cd, $('ofc_cd',data).text());
			   setFieldValue( formObj.wh_cd, $('wh_cd',data).text());
			   setFieldValue( formObj.cust_cd, $('cust_cd',data).text());
			   setFieldValue( formObj.cust_nm, $('cust_nm',data).text());
			   setFieldValue( formObj.cust_ref_no, $('cust_ref_no',data).text());
			   setFieldValue( formObj.int_memo, $('int_memo',data).text());
			   setFieldValue( formObj.ext_memo, $('ext_memo',data).text());
			   setFieldValue( formObj.cntr_info, $('cntr_info',data).text());
			   setFieldValue( formObj.mbl_no, $('mbl_no',data).text());
			   setFieldValue( formObj.hbl_no, $('hbl_no',data).text());
			   setFieldValue( formObj.h_curr_cd, $('curr_cd',data).text());
			   
			   
			   setFieldValue( formObj.sls_usrid, $('sls_usrid',data).text());
			   setFieldValue( formObj.sls_ofc_cd, $('sls_ofc_cd',data).text());
			   setFieldValue( formObj.opr_usrid, $('opr_usrid',data).text());

			   setFieldValue( formObj.ctrb_ofc_cd, $('ctrb_ofc_cd',data).text());
			   setFieldValue( formObj.ctrb_dept_cd, $('ctrb_dept_cd',data).text());
			   setFieldValue( formObj.ctrb_ratio_yn, $('ctrb_ratio_yn',data).text());
			   setFieldValue( formObj.ctrb_mgn, $('ctrb_mgn',data).text());
			   
			   doBtnAuthority(attr_extension);
			   
			   setupPage();
			   doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
}


function clickCtrbRatioYn(){
	var formObj = document.frm1;
	
	frm1.ctrb_mgn.value = '';
	frm1.ctrb_mgn.focus();
}

function getCtrtInfo(obj){
	var formObj=document.frm1;
	if(obj.value ==""){
		formObj.s_ctrt_no.value="";
		formObj.ctrt_nm.value="";
		formObj.cust_cd.value = "";
		formObj.cust_nm.value = "";
		return;
	}
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCtrtInfo&ctrt_no='+encodeURIComponent(obj.value), './GateServlet.gsl');
}

function resultCtrtInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr = doc[1].split('^@');
		if(rtnArr[0]!=""){
			formObj.ctrt_nm.value = rtnArr[0];
		}else{
			formObj.s_ctrt_no.value = "";
			formObj.ctrt_nm.value = "";
		}
		formObj.cust_cd.value = rtnArr[1];
		codeNameAction('trdpCode_cs',formObj.cust_cd, 'onBlur');
	}else{
		formObj.s_ctrt_no.value = "";
		formObj.ctrt_nm.value = "";
		formObj.cust_cd.value = "";
		formObj.cust_nm.value = "";
	}
}
function checkDuplicateDocRefNo(doWork){
	var formObj=document.frm1;
	if(doWork == "SEARCH"){
		ajaxSendPost(checkDuplicateDocRefNoEnd, 'reqVal', '&goWhere=aj&bcKey=checkDuplicateDocRefNo&doc_ref_no='+formObj.f_doc_ref_no.value, './GateServlet.gsl');
	}
}
var checkDocRefNo = false;
function checkDuplicateDocRefNoEnd(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				checkDocRefNo = true;
			}else{
				checkDocRefNo = false;
			}
		}
	}
	
}

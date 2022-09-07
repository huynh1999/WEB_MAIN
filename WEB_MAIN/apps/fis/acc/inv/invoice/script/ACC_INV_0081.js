/**
 * 화면로드 후 초기값 세팅
 */
var rtnary=new Array(1);
var callBackFunc = "";

function initFinish(){
	setFromToDtEndPlus(document.frm1.f_inv_strdt, 10, document.frm1.f_inv_enddt, 10);
}
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=srDocObjects[0];
    var formObj=document.frm1;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
               formObj.f_cmd.value=SEARCHLIST;
               sheetObj.DoSearch("./ACC_INV_0081GS.clt", FormQueryString(formObj) );
    	   break;    
    	   case "USEHBL":
    		   var tmpCnt=srDocObjects[1].LastRow() + 1;
    		   if(tmpCnt<2){
    			   //Select HBL for Shipping Request
    			   alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_HBL_') + "\n\n: ACC_INV_0081.24");
    		   }
    		   else{
    			   var rtnStr='';
    			   var divStr='^';
    			   var clsStr=';';
    			   //현재 BLSEQ가 등록되었는지를 확인함
    			   for(var i=1; i< tmpCnt; i++){
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_inv_no');
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_inv_seq');
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_trdp_cd');
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_trdp_nm');
    				   rtnStr+= divStr;
    				   rtnStr+= frm1.f_sell_buy_tp_cd.value;
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_inv_curr_cd');	//5
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_inv_amt');
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_inv_vat_amt');
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_inv_sum_amt');
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_ofc_cd');
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_dpt_cd');		//10
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_pic_id');
    				   rtnStr+= divStr;
    				   rtnStr+= frm1.f_air_sea_clss_cd.value;
    				   rtnStr+= divStr;
    				   rtnStr+= frm1.f_bnd_clss_cd.value;
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_frgn_curr_cd');
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_frgn_sum_amt');//15
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_locl_amt');
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_buy_inv_no');	//17
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_hbl_no');		//18
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_mbl_no');		//19
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_inv_post_dt');	//20
    				   rtnStr+= divStr;
    				   rtnStr+= srDocObjects[1].GetCellValue(i, 'to_ref_ofc_cd');	//21
    				   rtnStr+= clsStr;
    			   }
    			   ComClosePopup(rtnStr);
    		   }
    		   break;
			case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="";
		   		rtnary[1]="";
		   		rtnary[2]=window;
				var cstmTpCd='ALL';
				callBackFunc = "CUSTOMER_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");
				
				break;
			case "btn_new":
    	       sheetObject.RemoveAll();
    	       formObject.reset();
    	       break;
    	   case "CLOSE":
    		   ComClosePopup();
    		   break;	 
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: ACC_INV_0081.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: ACC_INV_0081.002");
        } 	
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.f_inv_strdt, formObj.f_inv_enddt, 'MM-dd-yyyy');
            break;
    }
}
/**
 * S/R List에 추가
 */
function hblToSrList(){
	var hblLen=srDocObjects[0].LastRow() + 1;
	for(var i=hblLen; 0 < i; i--){
		//선택된 경우
		if(srDocObjects[0].GetCellValue(i, 'sr_select')==1){
			if(frm1.cur_trdp_cd.value==srDocObjects[0].GetCellValue(i, 'trdp_cd')&&
			  frm1.inv_curr_cd.value== srDocObjects[0].GetCellText(i, 'inv_curr_cd')&&
			  srDocObjects[0].GetCellValue(i, 'used_chk')!='Y'
			  ){
				var intRows=srDocObjects[1].LastRow() + 1;
				var newRow=intRows; 
				srDocObjects[1].DataInsert(newRow);
				//데이터 복사
				moveDataToSheet(srDocObjects[1], intRows, 'to_', srDocObjects[0], i, '')
				/*
				srDocObjects[0].SetCellValue(i, 'used_chk','Y');
				srDocObjects[0].SetCellValue(i, 'sr_select',0);
				*/
				srDocObjects[0].RowDelete(i, false);
			}else{
			}
		}
	}
}
/**
 * S/R List에서 제거
 */
function srListToHbl(){
	var hblLen=srDocObjects[1].LastRow() + 1;
	for(var i=hblLen; 0 < i; i--){
		//선택된 경우
		if(srDocObjects[1].GetCellValue(i, 'to_inv_select')==1){
			//HBL List의 선택된 HBL 선택여부 초기화
			var intRows=srDocObjects[0].LastRow() + 1;
			var newRow=intRows; 
			srDocObjects[0].DataInsert(newRow);
			//데이터 복사
			moveDataToSheet(srDocObjects[0], intRows, '', srDocObjects[1], i, 'to_')
			//현재 Row 삭제
			srDocObjects[1].RowDelete(i, false);
			//현 S/R HBL List에 BL존재여부 확인 및 미 존재시 조회조건 초기화
			if(srDocObjects[1].LastRow() + 1==1){
				frm1.cur_trdp_cd.value='';
				frm1.inv_curr_cd.value='';
			}
		}
	}
}
/**
 * 내용 복사 시
 * @param toObj 복사할 Sheet Object
 * @param toRow 복사할 Row Number
 * @param toPre 복사할 Prefix
 * @param fromObj 원본 데이터를 가지고 있는 Sheet Object
 * @param fromRow 원본 데이터해당 Row Number
 * @param fromPre 원본데이터의 Prefix
 */
function moveDataToSheet(toObj, toRow, toPre, fromObj, fromRow, fromPre){
	toObj.SetCellValue(toRow, toPre+'inv_no',fromObj.GetCellValue(fromRow, fromPre+'inv_no'));
	toObj.SetCellValue(toRow, toPre+'trdp_cd',fromObj.GetCellValue(fromRow, fromPre+'trdp_cd'));
	toObj.SetCellValue(toRow, toPre+'trdp_nm',fromObj.GetCellValue(fromRow, fromPre+'trdp_nm'));
	toObj.SetCellValue(toRow, toPre+'frgn_curr_cd',fromObj.GetCellValue(fromRow, fromPre+'frgn_curr_cd'));
	toObj.SetCellValue(toRow, toPre+'frgn_sum_amt',fromObj.GetCellValue(fromRow, fromPre+'frgn_sum_amt'));
	toObj.SetCellValue(toRow, toPre+'locl_amt',fromObj.GetCellValue(fromRow, fromPre+'locl_amt'));
	toObj.SetCellValue(toRow, toPre+'inv_curr_cd',fromObj.GetCellValue(fromRow, fromPre+'inv_curr_cd'));
	toObj.SetCellValue(toRow, toPre+'inv_amt',fromObj.GetCellValue(fromRow, fromPre+'inv_amt'));
	toObj.SetCellValue(toRow, toPre+'inv_vat_amt',fromObj.GetCellValue(fromRow, fromPre+'inv_vat_amt'));
	toObj.SetCellValue(toRow, toPre+'inv_sum_amt',fromObj.GetCellValue(fromRow, fromPre+'inv_sum_amt'));
	toObj.SetCellValue(toRow, toPre+'ofc_cd',fromObj.GetCellValue(fromRow, fromPre+'ofc_cd'));
	toObj.SetCellValue(toRow, toPre+'dpt_cd',fromObj.GetCellValue(fromRow, fromPre+'dpt_cd'));
	toObj.SetCellValue(toRow, toPre+'pic_id',fromObj.GetCellValue(fromRow, fromPre+'pic_id'));
	toObj.SetCellValue(toRow, toPre+'inv_seq',fromObj.GetCellValue(fromRow, fromPre+'inv_seq'));
	toObj.SetCellValue(toRow, toPre+'buy_inv_no',fromObj.GetCellValue(fromRow, fromPre+'buy_inv_no'));
	toObj.SetCellValue(toRow, toPre+'hbl_no',fromObj.GetCellValue(fromRow, fromPre+'hbl_no'));
	toObj.SetCellValue(toRow, toPre+'mbl_no',fromObj.GetCellValue(fromRow, fromPre+'mbl_no'));
	toObj.SetCellValue(toRow, toPre+'inv_post_dt',fromObj.GetCellValue(fromRow, fromPre+'inv_post_dt'));
	toObj.SetCellValue(toRow, toPre+'ref_ofc_cd',fromObj.GetCellValue(fromRow, fromPre+'ref_ofc_cd'));
}
function doDispPrnrList(){
	if(srDocObjects[1].LastRow() + 1>1){
		var totRow=srDocObjects[1].LastRow() + 1;
		totRow--;
		for(var i=totRow; 0 < i; i--){
			srDocObjects[1].RowDelete(i, false);
		}
	}
	var isBegin=true;
	var arg=parent.rtnary;
    var rtnArr=arg[0].split(';');
    var paramLen=rtnArr.length;
    paramLen--;
	var intRows=srDocObjects[1].LastRow() + 1;
	var newRow=intRows-1;
	for(var i=0; i < paramLen; i++){
		var hblArr=rtnArr[i].split('^');
		if(hblArr[0]!=''){
			if(i==0){
				frm1.cur_trdp_cd.value=hblArr[0];
				frm1.inv_curr_cd.value=hblArr[4];
			}
			srDocObjects[1].DataInsert(newRow);
			srDocObjects[1].SetCellValue(intRows, 'to_inv_no',hblArr[3]);
			srDocObjects[1].SetCellValue(intRows, 'to_trdp_cd',hblArr[0]);
			srDocObjects[1].SetCellValue(intRows, 'to_trdp_nm',hblArr[1]);
			srDocObjects[1].SetCellValue(intRows, 'to_inv_curr_cd',hblArr[4]);
			srDocObjects[1].SetCellValue(intRows, 'to_inv_amt',hblArr[5]);
			srDocObjects[1].SetCellValue(intRows, 'to_inv_vat_amt',hblArr[6]);
			srDocObjects[1].SetCellValue(intRows, 'to_inv_sum_amt',hblArr[7]);
			srDocObjects[1].SetCellValue(intRows, 'to_inv_seq',hblArr[8]);
			srDocObjects[1].SetCellValue(intRows, 'to_frgn_curr_cd',hblArr[10]);
			srDocObjects[1].SetCellValue(intRows, 'to_frgn_sum_amt',hblArr[11]);
			srDocObjects[1].SetCellValue(intRows, 'to_locl_amt',hblArr[12]);
			// 2012/03/06 HBL/MBL 추가
			srDocObjects[1].SetCellValue(intRows, 'to_hbl_no',hblArr[13]);
			srDocObjects[1].SetCellValue(intRows, 'to_mbl_no',hblArr[14]);
			srDocObjects[1].SetCellValue(intRows, 'to_inv_post_dt',hblArr[15]);
		    //저장된 HBL인 경우
			if(hblArr[9]=='R'){
				srDocObjects[1].SetCellEditable(intRows, 'to_inv_select',0);
			}
			/*
			   curHblStr+= frm1.trdp_cd.value;
			   curHblStr+= divStr; 
			   curHblStr+= frm1.trdp_nm.value;1
			   curHblStr+= divStr;
			   curHblStr+= frm1.sell_buy_tp_cd.value;2
			   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'inv_no');3
			   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'inv_curr_cd');4
			   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'inv_amt');5
			   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'inv_vat_amt');6
			   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'inv_sum_amt');7
			   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'inv_seq');8
			   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'acc_ibflag');9
			   curHblStr+= clsStr;
			*/
			newRow++;
			intRows++;
		}
	}
}
function sheet1_OnSearchEnd(errMsg){
	doDispPrnrList();
	var docCnt=srDocObjects[0].LastRow() + 1;
	docCnt--;
	for(var i=docCnt; 0 < i; i--){
		for(var j=1; j < srDocObjects[1].LastRow() + 1; j++){
			if(srDocObjects[0].GetCellValue(i, 'inv_seq')==srDocObjects[1].GetCellValue(j, 'to_inv_seq')){
				srDocObjects[0].RowDelete(i, false);
				break;
			}
		}
	}
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.frm1.f_CurPage.value=callPage;	
	doWork('SEARCHLIST');
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
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
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
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value=masterVals[0]; 
				formObj.f_trdp_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value=""; 
				formObj.f_trdp_nm.value="";
			}
		}
	}else{
		//Error occurred!		
		alert(getLabel('FMS_COM_ERR001')+ "\n\n: ACC_INV_0081.455");
	}
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var srDocObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    for(var i=0;i<srDocObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(srDocObjects[i], SYSTEM_FIS);
        initSheet(srDocObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(srDocObjects[i]);
    }
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   srDocObjects[sheetCnt++]=sheet_obj;
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
             var formObj=document.form;
             var HeadTitle1="";

             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('ACC_INV_0081_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"sr_select",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"inv_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:45,   Align:"Left",    ColMerge:0,   SaveName:"trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"frgn_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"frgn_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"locl_amt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"inv_curr_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"inv_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"inv_vat_amt",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"inv_sum_amt",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"hbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"mbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"dpt_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:0,   SaveName:"pic_id",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"inv_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"buy_inv_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"inv_post_dt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"ref_ofc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
              
             InitColumns(cols);

             SetCountPosition(0);
             SetEditable(1);
             SetSheetHeight(190);

           }                                                      
        break;
 		case 2:     //HBL List
			with (sheetObj) {
 	       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

 	       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
 	       var headers = [ { Text:getLabel('ACC_INV_0081_HDR2'), Align:"Center"} ];
 	       InitHeaders(headers, info);

 	       var cols = [ {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"to_inv_select",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
 	              {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"to_inv_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	              {Type:"Text",      Hidden:0,  Width:45,   Align:"Left",    ColMerge:0,   SaveName:"to_trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	              {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"to_trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	              {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"to_frgn_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	              {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"to_frgn_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	              {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"to_locl_amt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"to_inv_curr_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	              {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"to_inv_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
 	              {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"to_inv_vat_amt",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
 	              {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"to_inv_sum_amt",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
 	              {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"to_hbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	              {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"to_mbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	              {Type:"Text",      Hidden:1, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"to_dpt_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Left",    ColMerge:0,   SaveName:"to_pic_id",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	              {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"to_inv_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	              {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"to_buy_inv_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	              {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"to_inv_post_dt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	              {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"to_ref_ofc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
 	        
 	       InitColumns(cols);

 	       SetCountPosition(0);
 	       SetEditable(1);
 	      SetSheetHeight(150);

 		}                                                      
			break;
    }
}
function sheet1_OnChange(sheetObj, row, col){
	var colStr=sheetObj.ColSaveName(col);
	//Item 코드(Commidity)
	if(colStr=="sr_select"){
if(sheetObj.GetCellValue(row, colStr)==1){
if(sheetObj.GetCellValue(row, 'trdp_nm')==''){
				//거래처가 존재하지 않습니다. 다시 확인하여 주시기 바랍니다!
				alert(getLabel('ACC_COM_ALT002') + "\n\n: ACC_INV_0081.638");
				 sheetObj.SetCellValue(row, colStr,0);
			}
			else if(frm1.cur_trdp_cd.value!=''){
if(frm1.cur_trdp_cd.value!=sheetObj.GetCellValue(row, 'trdp_cd')||
				   frm1.inv_curr_cd.value!= sheetObj.GetCellText(row, 'inv_curr_cd'))
				{
					//Vessel 또는 Voyage가 동일해야 하나의 Shipping Request로 묶일 수 있습니다!
					alert(getLabel('ACC_COM_ALT003') + "\n\n: ACC_INV_0081.648");
					sheetObj.SetCellValue(row, colStr,0);
				}	
			}
			else{
frm1.cur_trdp_cd.value=sheetObj.GetCellValue(row, 'trdp_cd');
				frm1.inv_curr_cd.value=sheetObj.GetCellText(row, 'inv_curr_cd');
			}
		}
		else{
			var loopNum=0;
			for(var i=1; i < sheetObj.LastRow() + 1; i++){
if(sheetObj.GetCellValue(i, 'sr_select')==1){
					loopNum++;
				}
			}
			if(srDocObjects[1].LastRow() + 1==1){
				if(loopNum==0){
					frm1.cur_trdp_cd.value='';
					frm1.inv_curr_cd.value='';
				}
			}
		}
	}
}

function CUSTOMER_POPLIST(rtnVal){
		var formObj=document.frm1;
		if(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined){
	 	return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		frm1.f_trdp_cd.value=rtnValAry[0]; 
		frm1.f_trdp_nm.value=rtnValAry[2];//loc_nm
	}
	}

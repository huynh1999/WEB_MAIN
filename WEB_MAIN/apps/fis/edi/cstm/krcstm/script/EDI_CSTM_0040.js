/**
 * 화면로드 후 초기값 세팅
 */
var selectRow=0;
function initFinish(){
	var pDoc=parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDt(frm1.f_arr_str_dt, frm1.f_arr_end_dt);
}
function doWork(srcName){
	
	var sheetObj=docObjects[0];
	
	switch(srcName) {
		case "SEARCHLIST01":
			if(!chkSearchCmprPrd(false, frm1.f_arr_str_dt, frm1.f_arr_end_dt)){
				return;
			}
			frm1.f_cmd.value=SEARCHLIST01;
			docObjects[0].DoSearch("EDI_CSTM_0040GS.clt", FormQueryString(frm1) );
			frm1.val_msg.value = "";
			//var sXml = docObjects[0].GetSearchXML("EDI_CSTM_0040GS.clt", FormQueryString(frm1));
			//alert(sXml);
			//docObjects[0].LoadSearchXML(sXml);
		break;
		case "CALLCT":
			ajaxSendPost(getCtradeAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCtradeKey&AIR_SEA_CLSS_CD=A', './GateServlet.gsl');
		break;
		case "COMMAND01":		//EDI전송
			frm1.val_msg.value = "";
			//2016.04.14 C.W.Park Modified
			var sndCnt = 0;
			for(var i=1;i<=docObjects[0].RowCount();i++){
				//alert(docObjects[0].CellValue(i+1, 'selection'));
				if(docObjects[0].GetCellValue(i, 'selection')==1){
					sndCnt++;
//					if(docObjects[0].GetCellValue(i, "edi_code")==""){
//						alert("EDI코드는 필수정보 입니다.");
//						return;
//					}
				}
			}
			if(sndCnt==0){
				//"선택된 Data가 없습니다."
				alert(getLabel('FMS_COM_ALT010'));
			}else{
				if (!ediValidation(sheetObj)){
					return false;
				}
				setTimeout(function(){
					//'EDI전문을 KTNET으로 전송하시겠습니까?')){
					if(confirm(getLabel('FMS_COM_CFMSEN'))){
						frm1.f_cmd.value=COMMAND01;
						docObjects[0].DoAllSave("EDI_CSTM_0040GS.clt", FormQueryString(frm1));
					}
				},100);
			}
		break;
	}
}
/**
 * Ctrade 화면
 **/
function getCtradeAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split(',');
//			var target = "_blank";
//			var popup_options = "top="+((screen.availHeight))+", left="+((screen.availWidth))+",  width=10, height=10, status=yes, toolbar=no, menubar=no, location=no";
//			
//			var htmlValue = 'http://www.ctradeworld.com/ctw/login/userNormLogin.jsp?userid='+masterVals[0]+'&userpass='+masterVals[1];
//			
//			window1 = window.open(htmlValue, target, popup_options);
//			window.open('http://www.ctradeworld.com/logis/logis.jsp?topmenu=mfcs', '_blank1', 'left=100, width=900, height=600');
//			window1.close();
			var myform=document.forms[0];
			myform.insertBefore(createHidden("ctwId",masterVals[0]));
			myform.insertBefore(createHidden("ctwPass",masterVals[1]));
			myform.insertBefore(createHidden("returnUrl","http://www.ctradeworld.com/logis/logis.jsp?topmenu=mfcs"));
			myform.action="http://www.ctradeworld.com/ctwpass/autoLoginChk.jsp";
			myform.method="post";
			myform.target="winName";
			window.open("about:blank","winName","toolbar=no,scrollbars=no,resizable=yes, left=100, width=900, height=600");
			myform.submit();
		}
	}
}
/**
* EDI 전송전문 내용보기
*/
function sheet1_OnClick(sheetObj, row, col){
	if(col == 15 && sheetObj.GetCellValue(row, col) != ""){
		frm1.f_edi_cre_seq.value=sheetObj.GetCellValue(row, 'edi_cre_seq');
		frm1.f_edi_snd_seq.value=sheetObj.GetCellValue(row, 'edi_snd_seq');
		frm1.f_edi_msg_no.value=sheetObj.GetCellValue(row, 'edi_msg_no');
		
		var param='f_edi_cre_seq=';
		param+= frm1.f_edi_cre_seq.value;
		param+= '&f_edi_snd_seq=';
		param+= frm1.f_edi_snd_seq.value;
		param+= '&f_edi_msg_no=';
		param+= frm1.f_edi_msg_no.value;
		
		var rtnary=new Array(1);
		rtnary[0]="";
		
		modal_center_open('./EDI_CSTM_0090.clt?'+param, rtnary, 540,380,"yes");
	}
}
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendarFromTo();
            cal.select(frm1.f_arr_str_dt, frm1.f_arr_end_dt, 'MM-dd-yyyy');
        break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var headerRowCnt=2;
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
    //사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false);
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
		case 1:      //EDI화물인도승락서 송신관리 처리현황
			with (sheetObj) {
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:getLabel('EDI_CSTM_0030_HDR3'), Align:"Center"} ];
			      InitHeaders(headers, info);

			      var cols = [ {Type:"Status",    Hidden:1,  Width:0,    Align:"Left",    ColMerge:1,   SaveName:"ibflag" 		},
					           {Type:"CheckBox",  Hidden:0,  Width:45,   Align:"Center",  ColMerge:1,   SaveName:"selection" 	},
					           {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"arr_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					           {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"flight_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					           {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"mawb",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					           {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"hawb",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					           {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"consignee",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					           {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"wh_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					           {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"edi_code",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					           {Type:"Combo",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"status",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					           {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:"do_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					           {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"do_ref",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					           {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"do_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					           {Type:"Int",       Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"amount",      KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					           {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"weight",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
					           {Type:"Combo",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"edi_view",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					           {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"hawb_seq" 	},
					           {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"edi_cre_seq" 	},
					           {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"edi_snd_seq" 	},
					           {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"edi_msg_no" 	},
					           {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"warehouse" 	},
					           {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"wh_cd" 		}];
			       
			      InitColumns(cols);
			      SetEditable(1);
			      //SetColProperty("do_dt", {Format:"####-##-##"} );
			      SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
			      SetColProperty("status", {ComboText:TRMS_STS_NM, ComboCode:TRMS_STS_CD} );
			      //SetColProperty(9, {ComboText:"|전송|재전송", ComboCode:"|S|R"} );
				  SetColProperty("edi_view", {ComboText:"|전문보기|전문보기", ComboCode:"|S|R"} );
				  SetSheetHeight(450);
			}
		break;
	}
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
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
		// 선택된 Column Hidden
		case "Column Hidden":
			var col=sheetObj.MouseCol()();
			if(sheetObj.ColSaveName(col)==""){
				alert(CM_MSG6);
				return false;
			}
			sheetObj.SetGetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}
//Calendar flag value
var firCalFlag=false;

function ediValidation(sheetObj) {
	
	var formObj=document.frm1;
	
	//SI EDI Validation check
	
	var valMsgArr = new Array();
	
	// 1. 허용된 선사인가? Com_Cd로 조회 > E001
	/*var lnrList = new Array();
	var existLnrList = false;
	if (trim(LNRCD) != "") {
		lnrList = LNRCD.split("|");
		if ( lnrList.length > 0){
			var lnr_cd = sheetObj.GetCellValue(row, "lnr_trdp_cd");
			
			for (var i=0;i<lnrList.length;i++) {
				if (lnrList[i] == lnr_cd) {
					existLnrList = true;
					break;
				}
			}
			
			if (!existLnrList) {
				valMsgArr.push(getLabel('EDI_COM_ALT009'));
			}
		}
	}*/
		
	// 2. VSL VVD Check 
	/*var formObj=document.frm1;
	var vmlNm = formObj.vsl_nm.value();
	var voy   = formObj.voy.value();
	
	if (vmlNm == "" || voy == ""){
    	alert(getLabel('FMS_COM_ALT007') + "\n - "+ "Vessel/Voyage");
    	return false;
	}*/
	
	// 3. 이외 항목 check 
	for(var i=1; i<sheetObj.LastRow() + 1; i++){
		
		if(sheetObj.GetCellValue(i, "selection") == 1){
		
			var mawb 		= sheetObj.GetCellValue(i,"mawb");
			var wh_cd 		= sheetObj.GetCellValue(i,"wh_cd");
			var consignee 	= sheetObj.GetCellValue(i,"consignee");
			
			var row = i;
			
			// Master B/L 번호 Check
			if(trim(mawb) == ""){
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT055'));
			}
			
			// Warehouse Code Check
			if(trim(wh_cd) == ""){
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT071'));
			}
			
			// 수하인 상호 또는 성명 Check 
			if (trim(consignee) == "") {
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT063'));
			}
		}
	}
    
    if(valMsgArr.length > 0){
    	formObj.val_msg.value = "";
    	for(var i=0; i<valMsgArr.length; i++){
    		formObj.val_msg.value += ((i+1) + ". " + valMsgArr[i] + "\n");
	    }
    	disp_val_msg.style.display='inline';
    	return false;
    }
    return true;
}
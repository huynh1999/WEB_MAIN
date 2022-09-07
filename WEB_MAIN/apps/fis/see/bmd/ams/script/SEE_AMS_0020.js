var rtnary=new Array(1);
var callBackFunc = "";
var colClick = "";

function doWork(srcName, valObj){
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	var sheetObj3=docObjects[2];
    var formObj=document.frm1;
    switch(srcName) {
		case "SEARCHLIST01":
            formObj.f_cmd.value=SEARCHLIST01;
            //검증로직
			docObjects[0].DoSearch("./SEE_AMS_0020GS.clt", FormQueryString(formObj) );
		break;
		case "SEARCHLIST02":
            formObj.f_cmd.value=SEARCHLIST02;
            //검증로직
			docObjects[1].DoSearch("./SEE_AMS_0021GS.clt", FormQueryString(formObj) );
		break;
		case "SEARCHLIST03":
            formObj.f_cmd.value=SEARCHLIST03;
            //검증로직
			docObjects[2].DoSearch("./SEE_AMS_0022GS.clt", FormQueryString(formObj) );
		break;
		case "SEARCHLIST04":
            formObj.f_cmd.value=SEARCHLIST04;
			docObjects[4].RemoveAll();
			var blnbr=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hbl_no");
			docObjects[4].DoSearch("./SEE_AMS_0023GS.clt?blnbr=" +blnbr, FormQueryString(formObj) );
		break;
		case "SEARCHLIST05":
			docObjects[3].RemoveAll();
			formObj.f_cmd.value=SEARCHLIST02;
			var intgBlSeq=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "intg_bl_seq");
			var hblNo=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hbl_no");
			docObjects[3].DoSearch("./SEE_AMS_0011GS.clt?intg_bl_seq=intgBlSeq&bl_no="+hblNo, FormQueryString(formObj) );
		break;
		
		case "SEND":
			formObj.f_cnt_cd.value=trim(formObj.f_cnt_cd.value);

			//#3830 [JAPT] carrier CMA's voyage length is 6 (Ex. 293FJE) , cut 5 character
			formObj.f_snd_voy_cd.value = formObj.f_voy_cd.value;
			
			var ams_sts;			
			
			if(formObj.f_cnt_cd.value == ""){
				alert(getLabel('FMS_COM_ALT143') );
				formObj.f_cnt_cd.focus();
				return;
			}
			
			if(formObj.f_cnt_cd.value.length != 2){
				alert(getLabel('FMS_COM_ALT144') );
				formObj.f_cnt_cd.focus();
				return;
			}
			
			//#3548 OE AMS EDI 화면 보완
			if(formObj.f_voy_cd.value == ''){
				alert(getLabel('EDI_COM_ALT250'));
				formObj.f_voy_cd.focus();
				return;
			}
			if(formObj.f_voy_cd.value.length >5){
				//#3830 [JAPT] carrier CMA's voyage length is 6 (Ex. 293FJE) , cut 5 character
				if(confirm("The voyage code is longer than 5 characters: " + formObj.f_voy_cd.value + "\n" 
						+ "It will be sent with first 5 characters: " + formObj.f_voy_cd.value.substring(0,5)))
				{
					formObj.f_snd_voy_cd.value = formObj.f_voy_cd.value.substring(0,5);
				}else {
					return;
				}
			}
			if(formObj.f_voy_cd.value.search(/[^0-9A-Za-z\-]/) != -1){
				alert(getLabel('EDI_COM_ALT252'));
				formObj.f_voy_cd.focus();
				return;
			}
			
			if(docObjects[0].CheckedRows("chk") == 0){
        		alert(getLabel('FMS_COM_ALT004') );
        		return;
        	}		
			
			for(var i=2; i<=docObjects[0].LastRow(); i++){
        		if(sheetObj1.GetCellValue(i, "chk") == 1){
        			if(sheetObj1.GetCellValue(i, "ready_flg") == "N"){
            			alert(getLabel('EDI_COM_ALT079') );  
            			return;
            		}
        		}
			}
        	
            formObj.f_cmd.value=COMMAND01;
            //검증로직
            if(confirm(getLabel('FMS_COM_CFMSENDEDI'))){
            	var param = FormQueryString(frm1);
				docObjects[0].DoSave("./SEE_AMS_0020GS.clt", param, "chk", false);
            }
		break;
		case "LIST":
   	 		var formObj=document.frm1;
   		   	var paramStr="./SEE_AMS_0010.clt";
   		   	parent.mkNewFrame('OI B/L Entry by AMS Download', paramStr);
		break;
		case "APPLY":
			for(var i=1; i<docObjects[0].RowCount()+1; i++){
				alert(docObjects[0].GetCellValue(i, "hbl_no"))
			}
            docObjects[0].DoAllSave("./SEE_AMS_0020GS.clt", FormQueryString(formObj), true);
		break;
		
		case "VESSEL_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(2);
	   		rtnary[0]="1";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[1]=valObj;
	   		}else{
	   			rtnary[1]="";
	   		}
	   		callBackFunc = "VESSEL_POPLIST";
			modal_center_open('./CMM_POP_0140.clt', rtnary, 656,470,"yes");
		break;
		
		case "POL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(3);
      		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "POL_LOCATION_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt',  rtnary, 806,425,"yes");
	   	break;
	   	
		case "POD_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(3);
      		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "POD_LOCATION_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt',  rtnary, 806,425,"yes");
	   	break;
	   		
        case "LAST_POL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(3);
      		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "LAST_POL_LOCATION_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt',  rtnary, 806,425,"yes");
	         
		break;
        case "TS_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(3);
      		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "TS_LOCATION_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt',  rtnary, 806,415,"yes");
	        
		break;
        case "HUB_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(3);
      		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "HUB_LOCATION_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt',  rtnary, 806,415,"yes");
	        
		break;
        case "USA_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(3);
      		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "USA_LOCATION_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt',  rtnary, 806,415,"yes");
	        
		break;

        case "CMDT_NEW":
        	if(!cmdtSearchFlag){
        		alert(getLabel('FMS_COM_ALT039'));
        		return;
        	}
        	
        	docObjects[2].DataInsert(docObjects[2].LastRow() + 1);
        	
        	//#3548 OE AMS EDI 화면 보완
        	docObjects[2].SetCellValue(docObjects[2].LastRow(),"cntr_list_seq"
        			,docObjects[1].GetCellValue(docObjects[1].GetSelectRow(), "cntr_list_seq"));
        	
        	docObjects[2].SetCellValue(docObjects[2].LastRow(),"hts_pkg"
        			,docObjects[1].GetCellValue(docObjects[1].GetSelectRow(), "cgo_pck_qty"));

        	docObjects[2].SetCellValue(docObjects[2].LastRow(),"hts_pkg_ut_cd"
        			,docObjects[1].GetCellValue(docObjects[1].GetSelectRow(), "cgo_pck_ut"));
        	
        	docObjects[2].SetCellValue(docObjects[2].LastRow(),"hts_wgt"
        			,docObjects[1].GetCellValue(docObjects[1].GetSelectRow(), "cgo_wgt"));
        	
		break;
		
        case "CMDT_SAVE":
        	if(!cmdtSearchFlag){
        		alert(getLabel('FMS_COM_ALT039'));
        		return;
        	}
        	
        	var saveFlag = false;
        	
            for(var i=1; i<=docObjects[2].LastRow(); i++){
            	if(docObjects[2].GetCellValue(i, "item_ibflag") != "R"){
            		saveFlag = true;
            		break;
            	}
            }
            
            if(!saveFlag){
            	alert(getLabel('FMS_COM_ALT028'));
            	return;
            }
        	frm1.f_cmd.value=COMMAND02;
        	if(confirm(getLabel('FMS_COM_CFMSAV'))){
        		docObjects[2].DoAllSave("./SEE_AMS_0020GS.clt", FormQueryString(frm1), true);
        	}
		break;
		
        case "CMDT_NEW_ALL":
	        	if(!cmdtSearchFlag || !(sheetObj2.RowCount() > 0)){
	        		alert(getLabel('FMS_COM_ALT039'));
	        		return;
	        	}
	        	
	        	var dupCntrCnt = 0;
	        	for(var i=1; i<=sheetObj2.LastRow(); i++){
	        		for(var j=1; j<=sheetObj3.LastRow(); j++){
	        			if(sheetObj2.GetCellValue(i, "cntr_list_seq") == sheetObj3.GetCellValue(j, "cntr_list_seq")){
	        				dupCntrCnt++;
	        				break;
	        			}
	        		}
	        		
	        		if(dupCntrCnt == 0){
	        			sheetObj3.DataInsert(-1);
	 	        		
	 	 	        	sheetObj3.SetCellValue(sheetObj3.LastRow(),"cntr_list_seq"
	 	 	        			,sheetObj2.GetCellValue(i, "cntr_list_seq"));
	 	 	        	sheetObj3.SetCellValue(sheetObj3.LastRow(),"hts_pkg"
	 	 	        			,sheetObj2.GetCellValue(i, "cgo_pck_qty"));
	 	 	        	sheetObj3.SetCellValue(sheetObj3.LastRow(),"hts_wgt"
	 	 	        			,sheetObj2.GetCellValue(i, "cgo_wgt"));
	 	 	        	sheetObj3.SetCellValue(sheetObj3.LastRow(),"cntr_list_seq"
	 	 	        			,sheetObj2.GetCellValue(i, "cntr_list_seq"));
	        		} 	 
	        		
	        		dupCntrCnt = 0;
	        	} 	        	
	        	
			break;
		
        case "EDI_BL_SAVE":
			var ams_sts;
			
	/*		if(formObj.f_cnt_cd.value == ""){
				alert(getLabel('FMS_COM_ALT143') );
				formObj.f_cnt_cd.focus();
				return;
			}
			
			if(formObj.f_cnt_cd.value.length != 2){
				alert(getLabel('FMS_COM_ALT144') );
				formObj.f_cnt_cd.focus();
				return;
			}			
			
			
			//#3548 OE AMS EDI 화면 보완
			if(formObj.f_voy_cd.value == ''){
				alert(getLabel('EDI_COM_ALT250'));
				formObj.f_voy_cd.focus();
				return;
			}
			if(formObj.f_voy_cd.value.length >5){
				alert(getLabel('EDI_COM_ALT251'));
				formObj.f_voy_cd.focus();
				return;
			}
			if(formObj.f_voy_cd.value.search(/[^0-9A-Za-z\-]/) != -1){
				alert(getLabel('EDI_COM_ALT252'));
				formObj.f_voy_cd.focus();
				return;
			}
	
			
			if(docObjects[0].CheckedRows("chk") == 0){
        		alert(getLabel('FMS_COM_ALT004') );
        		return;
        	}
	 */				
			var updateRowCnt = 0;
        	for(var i=2; i<=docObjects[0].LastRow(); i++){
        		docObjects[0].SetCellValue(i, 'ibflag', docObjects[0].GetCellValue(i, 'chg_val_flg'));
				if(docObjects[0].GetCellValue(i, "ibflag") == "U"){
					formObj.f_etd_dt_tm.value=docObjects[0].GetCellValue(i, "etd_dt_tm");  
					formObj.f_eta_dt_tm.value=docObjects[0].GetCellValue(i, "eta_dt_tm"); 
					
					
					if(docObjects[0].GetCellValue(i, "hbl_no").length > 12){
						alert(getLabel('EDI_COM_ALT249') );
						return;
					}					
					
					if(docObjects[0].GetCellValue(i, "msg_sts_cd") == 'S'){
						alert(getLabel('EDI_COM_ALT030') );
						return;
					}
				
					updateRowCnt++;
				}
			}
        	
        	if (updateRowCnt==0) {
        		alert(getLabel('EDI_COM_ALT254') );
        		return;
        	}
            formObj.f_cmd.value=COMMAND03;
            //검증로직
        	var param = FormQueryString(frm1);
			docObjects[0].DoSave("./SEE_AMS_0020GS.clt", param, "ibflag", "U");
    	break;
		
    }
}
function sheet1_OnSaveEnd(){
	doWork("SEARCHLIST01");
	docObjects[1].RemoveAll();
	docObjects[2].RemoveAll();
	docObjects[3].RemoveAll();
	docObjects[4].RemoveAll();
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if ( doc[0]=='OK' ) {
		if (typeof(doc[1])!='undefined'){
			var sheetObj1=docObjects[2];
			var iRow=formObj.s_Acct_Info_Row.value;
			//alert("[" + doc[1] + "]" + getLabel('SAL_TPM_0010_MSG3')); Duplicated account!
			alert(getLabel('FMS_COM_ALT008') + " - " + doc[1] + "\n\n: SEE_AMS_0020.226");
			sheetObj1.SetCellValue(iRow, 3,"");
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEE_AMS_0020.230");		
	}
}
function fncTpCodeSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		if ( formObj.s_trdp_cd.value != null && formObj.s_trdp_cd.value != "" ) {
			doWork('SEARCHLIST');
		}
	}
}
// 공통전역변수
var tabObjects=new Array();
var tabCnt=0 ;
var beforetab=1;
var beforetab2=1;
var docObjects=new Array();
var sheetCnt=0;
/**
 * IBTab Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setTabObject(tab_obj){
	tabObjects[tabCnt++]=tab_obj;
}
/**
 * Tab 기본 설정
 * 탭의 항목을 설정한다.
 */
function initTab(tabObj , tabNo) {
	switch(tabNo) {
		case 1:
			with (tabObj) {
				InsertItem( "HB/L Information" , "");
				InsertItem( "AMS Sending Result" , "");
			}
		break;
	}
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
	switch(sheet_obj.id){
		case "sheet1":
			docObjects[0]=sheet_obj;
		break;
		case "sheet2":
			docObjects[1]=sheet_obj;
		break;
		case "sheet3":
			docObjects[2]=sheet_obj;
		break;
		case "sheet4":
			docObjects[3]=sheet_obj;
		break;
		case "sheet5":
			docObjects[4]=sheet_obj;
		break;
		case "sheet6":
			docObjects[5]=sheet_obj;
		break;
	}
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++) {
		comConfigSheet(docObjects[i] , SYSTEM_BLUE);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
    //사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}
function RestoreGrid(){
	doWork("SEARCHLIST01");
}
/**
 * Tab 클릭시 이벤트 관련
 * 선택한 탭의 요소가 활성화 된다.
 */
function tab1_OnChange(tabObj , nItem) {
	var objs=document.all.item("tabLayer");
	objs[nItem].style.display="Inline";
	objs[beforetab].style.display="none";
	//--------------- 요기가 중요 --------------------------//
	objs[beforetab].style.zIndex=objs[nItem].style.zIndex -1 ;
	//------------------------------------------------------//
	beforetab=nItem;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	switch(sheetNo) {
		case 1:      //sheet1 init
			with (sheetObj) {
	
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('SEE_AMS_0020_HDR1_1'), Align:"Center"},
	                                 { Text:getLabel('SEE_AMS_0020_HDR1_2'), Align:"Center"}];
	            InitHeaders(headers, info);
	
	            var cols = [ {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"chk",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                   {Type:"Radio",      Hidden:0,  Width:80,  Align:"Center",    ColMerge:0,   SaveName:"valid_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
   			       {Type:"Text",      Hidden:0,  Width:80,  Align:"Center",    ColMerge:0,   SaveName:"ready_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",          KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",          KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"hbl_tp",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sub_tp",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Combo",  	  Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"msg_sts_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"cstms_rgst_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dspo_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"hold_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"ams_sts",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"ams_file_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"etd_dt_tm",       KeyField:1,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eta_dt_tm",       KeyField:1,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0, Width:50,    Align:"Left",    ColMerge:1,   SaveName:"ams_por_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0, Width:150,   Align:"Left",    ColMerge:1,   SaveName:"por_nm",          KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Popup",      Hidden:0,  Width:50,   Align:"Left",  ColMerge:1,   SaveName:"ams_pol_cd",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:5 },
			       {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",  ColMerge:1,   SaveName:"pol_nm",          KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Popup",      Hidden:0,  Width:70,   Align:"Left",  ColMerge:1,   SaveName:"ams_lst_pol_cd",  KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:5 },
			       {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",  ColMerge:1,   SaveName:"lst_pol_nm",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, EditLen:50 },
			       {Type:"Popup",      Hidden:0,  Width:50,   Align:"Left",  ColMerge:1,   SaveName:"ams_pod_cd",          KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , EditLen:4 },
			       {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",  ColMerge:1,   SaveName:"pod_nm",          KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"ams_del_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Int",       Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"pck_qty",         KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Combo",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"pck_ut_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
/*			       #3876 [JAPT] AMS EDI - CNTR Item modification, Qty sum and Mark&numbers.*/
			       {Type:"Int",       Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"ttl_itm_pck_qty",         KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Float",    Hidden:0, Width:100, 	Align:"Right", 	ColMerge:0, SaveName:"grs_wgt", 			KeyField:0,     Format:"Float",		UpdateEdit:0, InsertEdit:0, PointCount:2, Ellipsis:1 },
			       {Type:"Combo",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"it_tp",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
			       {Type:"PopupEdit",      Hidden:0, Width:120,   Align:"Left",    ColMerge:1,   SaveName:"shpr_nm",         KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0, Width:200,   Align:"Left",    ColMerge:1,   SaveName:"shpr_addr",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
			       {Type:"Image",     Hidden:0, Width:30,   Align:"Center",  	ColMerge:0,   SaveName:"shpr_img",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"PopupEdit",      Hidden:0, Width:120,   Align:"Left",    ColMerge:1,   SaveName:"cnee_nm",         KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0, Width:200,   Align:"Left",    ColMerge:1,   SaveName:"cnee_addr",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
			       {Type:"Image",     Hidden:0, Width:30,   Align:"Center",  	ColMerge:0,   SaveName:"cnee_img",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"PopupEdit",      Hidden:0, Width:120,   Align:"Left",    ColMerge:1,   SaveName:"ntfy_nm",         KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
			       {Type:"Text",      Hidden:0, Width:200,   Align:"Left",    ColMerge:1,   SaveName:"ntfy_addr",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0 },
			       {Type:"Image",     Hidden:0, Width:30,   Align:"Center",  	ColMerge:0,   SaveName:"ntfy_img",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"intg_bl_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"por_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"pol_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"lst_pol_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"pod_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"del_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"it_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"bond_id",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"hub_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"usa_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"snp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"lst_pol_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"ts_cgo",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"ts_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"lst_usa_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"ams_snd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"cust_ref_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"intg_mbl_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"ref_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"ams_pck_ut_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
			       {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"chg_val_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"valid_cntr_cnt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"valid_cntr_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"valid_cntr_tpsz",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"valid_cntr_seal_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"valid_item_cnt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"valid_item_cntr_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"valid_commodity",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },			       
			       {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"valid_hts_pkg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"valid_hts_wgt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"valid_item_rmk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			       //#6861 : [JAPT] AMS Container Max Digit Validation ( 11 Digit )
			       {Type:"Text",      Hidden:1,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"valid_cntr_no_sz",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }];
	            
            InitColumns(cols);

            SetEditable(1);
            SetImageList(0,"web/img/main/icon_m.gif");
	      	SetImageList(1,"web/img/main/icon_m.gif");
	      	SetImageList(2,"web/img/main/icon_m.gif");
            SetColProperty('pck_ut_cd', {ComboText:PCK_UT_NM, ComboCode:PCK_UT_CD} );
            SetColProperty('msg_sts_cd', {ComboText:MSG_STS_NM, ComboCode:MSG_STS_CD} );
            //InitViewFormat(0, "eta_dt_tm", "MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
            //SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
            SetColProperty('it_tp', {ComboText:'|FROB', ComboCode:'|F'} );
            //SetColProperty('ams_sts', {ComboText:'Addition|Amendment|Delete', ComboCode:'A|B|D'} );
            
            SetSheetHeight(250);
            }
		break;
		case 2:      //sheet 2 init
			with (sheetObj) {
	
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('SEE_AMS_0020_HDR2'), Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"Seq",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"seq",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"cntr_no",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"seal_no1",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Int",       Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"cgo_pck_qty",    KeyField:1,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Combo",       Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"cgo_pck_ut",    KeyField:1,   CalcLogic:"",   Format:"",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"cgo_wgt",        KeyField:1,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"cntr_list_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Status",    Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"cntr_ibflag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		         
		        InitColumns(cols);
		        SetColProperty('cgo_pck_ut', {ComboText:PCK_UT_NM, ComboCode:PCK_UT_CD} );
	        	SetEditable(0);
	        	SetSheetHeight(200);
	            SetHeaderRowHeight(21);
			}
		break;
		case 3:      //sheet 2 init
			with (sheetObj) {
			
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		        var headers = [ { Text:getLabel('SEE_AMS_0020_HDR3'), Align:"Center"} ];
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"DelCheck",  Hidden:0, TrueValue:"Y", FalseValue:"N"  , Width:60,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
		               {Type:"Combo",      Hidden:0,  Width:130,  Align:"Left",  ColMerge:1,   SaveName:"cntr_list_seq",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"PopupEdit",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:"hts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"commodity",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Int",      Hidden:0,  Width:70,   Align:"Right",    ColMerge:1,   SaveName:"hts_pkg",      KeyField:1,   CalcLogic:"",   Format:"Integer",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Combo",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"hts_pkg_ut_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Float",      Hidden:0,  Width:70,   Align:"Right",    ColMerge:1,   SaveName:"hts_wgt",      KeyField:1,   CalcLogic:"",   Format:"Float",            PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Float",      Hidden:0,  Width:70,   Align:"Right",    ColMerge:1,   SaveName:"hts_meas",      KeyField:0,   CalcLogic:"",   Format:"Float",            PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"item_rmk",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Combo",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"dg_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"dg_div",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Text",      Hidden:0,  Width:200,   Align:"Left",    ColMerge:1,   SaveName:"dg_cntc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 ,   EditLen:24},
		               {Type:"Text",      Hidden:1,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"shp_cmdt_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		               {Type:"Status",    Hidden:1, Width:40,   Align:"Left",    ColMerge:1,   SaveName:"item_ibflag",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		         
		        InitColumns(cols);
		        
   	         	SetColProperty(0 ,"dg_cntc_nm" 	, {InputCaseSensitive:1});
   	         	SetColProperty(0 ,"commodity" 	, {InputCaseSensitive:1});
		        SetColProperty('hts_pkg_ut_cd', {ComboText:PCK_UT_NM, ComboCode:PCK_UT_CD} );
		        SetColProperty(0 ,"hts_cd" 		, {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
		        SetColProperty('dg_cd', {ComboText:'|UN|IMDG', ComboCode:'|U|I'} );
		        SetEditable(1);
	            SetHeaderRowHeight(21);
	            SetSheetHeight(200);
			}
		break;
		case 4:      //sheet 2 init
			with (sheetObj) {
	
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('SEE_AMS_0020_HDR4'), Align:"Center"} ];
		        InitHeaders(headers, info);
		        var cols = [ {Type:"Seq",      Hidden:0,  Width:50,  Align:"Right",    ColMerge:1,   SaveName:"seq",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }, 
		               {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"msg_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"msg_tp",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ams_sts",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"disp",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:600,  Align:"Left",    ColMerge:1,   SaveName:"rlt_mst",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			           {Type:"Image",     Hidden:0, Width:30,    Align:"Center",  ColMerge:0,   SaveName:"rlt_img",  KeyField:0,   CalcLogic:"",   Format:"" },
		               {Type:"Date",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"rcv_dt",   KeyField:0,   CalcLogic:"",   Format:"YmdHms",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		         
		        InitColumns(cols);
		        SetImageList(0,"web/img/main/icon_m.gif");
		        SetEditable(1);
		        SetSheetHeight(130);
	            SetHeaderRowHeight(21);
			}
		break;
		case 5:      //sheet 2 init
			with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('SEE_AMS_0020_HDR5'), Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"Seq",      Hidden:0,  Width:50,   Align:"Right",  ColMerge:1,   SaveName:"seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"ams_file_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,   Align:"Left",    ColMerge:1,   SaveName:"msg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"snp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:70,  Align:"Center",  ColMerge:1,   SaveName:"lst_pol_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"ts_cgo",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:1,   SaveName:"ams_snd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Date",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"snd_dt",       KeyField:0,   CalcLogic:"",   Format:"YmdHms",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"snd_file",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		         
		        InitColumns(cols);
	
		        SetEditable(1);
		        SetSheetHeight(250);
			}
		break;
		case 6:      //sheet 2 init
			with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('SEE_AMS_0020_HDR6'), Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"Seq",      Hidden:0,  Width:50,   Align:"Right",  ColMerge:1,   SaveName:"seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:1,   SaveName:"hbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"ams_file_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"type",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"sub_type",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ref_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		               {Type:"Text",      Hidden:0,  Width:400,  Align:"Left",    ColMerge:1,   SaveName:"chk_msg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
		         
		        InitColumns(cols);
		        SetSheetHeight(250);
		        SetEditable(1);
			}
		break;
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
    var sheetObj=docObjects[0];
   	// f_snp_cd
    if(sheetObj.GetSelectRow() > 0)
    	formObj.f_snp_cd.value=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "snp_cd");
	if( sheetObj.GetCellValue(sheetObj.GetSelectRow(), "it_tp") != 'F'){
		formObj.f_it_tp.value=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "it_tp");
   	}
	
	if(sheetObj.GetSelectRow() > 0)
		formObj.f_it_no.value=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "it_no");
	if(sheetObj.GetSelectRow() > 0)
		formObj.f_bond_id.value=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "bond_id");
	if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_snd") == "" || docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_sts") == "Orginal" || docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_snd") == "-1"){
		//formObj.f_ams_snd.value="A";
	}else{
		//formObj.f_ams_snd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_snd");
	}
	
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellFontColor(i,'mbl_no',"#0000FF");
		sheetObj.SetCellFontColor(i,'hbl_no',"#0000FF");
		
		sheetObj.SetCellImage(i, "shpr_img", 0);
		sheetObj.SetCellImage(i, "cnee_img", 0);
		sheetObj.SetCellImage(i, "ntfy_img", 0);
		
		//#3798 JAPT AMS EDI location code 저장 , address null 처리		
		sheetObj.SetCellValue(i, "ibflag", "R");
		//#5478 [JTC] AMS EDI 화면개선 및 VALIDATION MSG BOX 추가
		sheetObj.SetCellValue(i, 'chg_val_flg', "R");
	}

	//#3533 OEM Shipping Instruction
	//#3876 [JAPT] AMS EDI - CNTR Item modification, Qty sum and Mark&numbers.
	//Item 항목 수정 후, Total Item Qty를 BL 항목 옆에 보여주기 위함.
	if(saveCnt >0){
		saveCnt = 0 ;
		validation_cntr();
		validation_item();		
	}else {
		docObjects[1].RemoveAll();
		docObjects[2].RemoveAll();
	}
}

function sheet1_OnChange(sheetObj,Row,Col,value){
	var colStr=sheetObj.ColSaveName(Col);
	
	if(colStr == "ams_pol_cd" ||colStr == "ams_lst_pol_cd" ||colStr == "ams_pod_cd" 
    	||colStr == "it_tp" ||colStr == "shpr_nm"  ||colStr == "shpr_addr"
    	||colStr == "cnee_nm" ||colStr == "cnee_addr"  ||colStr == "ntfy_nm"
    	||colStr == "ntfy_addr"){
		if(sheetObj.GetCellValue(Row, 'chg_val_flg') == "R"){
	    	sheetObj.SetCellValue(Row, 'chg_val_flg', "U");	    	
	    }
		
		sheetObj.SetCellValue(Row, 'ready_flg', "N", 0);
    }
}

function sheet2_OnSearchEnd(){
	var formObj=document.frm1;
    var sheetObj2=docObjects[1];

    var cntrNoHdr = "";
    var cntrNoVal = "";
    
    for(var i=1; i<=docObjects[1].LastRow(); i++){
    	cntrNoHdr += "|" + docObjects[1].GetCellValue(i, "cntr_no");
    	cntrNoVal += "|" + docObjects[1].GetCellValue(i, "cntr_list_seq");
    }
    
    docObjects[2].SetColProperty('cntr_list_seq', {ComboText:cntrNoHdr, ComboCode:cntrNoVal} );    
    docObjects[0].SetFocus();
    
    validation_cntr();
    
    doWork("SEARCHLIST03");
}

var cmdtSearchFlag = false;
function sheet3_OnSearchEnd(){
	var formObj=document.frm1;
    var sheetObj2=docObjects[2];
    cmdtSearchFlag = true;    
    docObjects[0].SetFocus();
    
    validation_item();
}

//조회 후 페이지징 표시
function sheet4_OnSearchEnd(){
	
	var formObj = document.frm1;
	var sheetObj = docObjects[3];
	
	for(var i=1; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "rlt_img", 0);
	}
}
function sheet4_OnClick(sheetObj, Row, col) {
	var formObj=document.frm1;
	var sheetObj = docObjects[3];
	var colStr=sheetObj.ColSaveName(col);
	if (colStr == "rlt_img") {
		ComShowMemoPad2(sheetObj, Row, "rlt_mst", true, 450, 200, col, "rlt_mst");   
	
	}
}

function sheet3_OnClick(sheetObj,Row,Col){
    var colStr=sheetObj.ColSaveName(Col);
    if(colStr == "del_chk"){
    	if(sheetObj.GetCellValue(sheetObj.SelectRow, "item_ibflag") == "I"){
			sheetObj.RowDelete(sheetObj.SelectRow);
		}
    }
}

function sheet3_OnChange(sheetObj,Row,Col,value){
	var colStr=sheetObj.ColSaveName(Col);
	
    if(colStr == "hts_cd"){
    	doItemSearch(sheetObj, Row, "commodity", value);
//    	ajaxSendPost(searchCustItem, 'reqVal', '&goWhere=aj&bcKey=getWHItem&ctrt_no=&itm_cd='+sheetObj.GetCellValue(Row, "hts_cd"), './GateServlet.gsl');
    }
}

var saveCnt = 0;
function sheet3_OnSaveEnd(sheetObj, errMsg){
	showCompleteProcess();
	saveCnt ++;
	doWork("SEARCHLIST03");
	doWork("SEARCHLIST01");
}

var cur_row = 0;
function sheet3_OnPopupClick(sheetObj, row, col) {
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=="hts_cd"){
		cur_row = row;
   		rtnary=new Array(1);
   		rtnary[0]="1";
   		callBackFunc = "gridPopCall_item_shp_cmdt_cd";
		modal_center_open('./CMM_POP_0110.clt?s_hs_grp_cd=HS', rtnary, 756,483,"yes");
	}
}

function sheet1_OnClick(sheetObj, Row, Col){
	var formObj=document.frm1;
    var colStr=sheetObj.ColSaveName(Col);
    if(colStr == "hbl_no" 
    	||colStr == "ams_file_no" 
    	||colStr == "mbl_no" 
    	||colStr == "msg_sts_cd" 
    	||colStr == "ams_sts"
    	||(colStr == "valid_cd" && sheetObj.GetCellValue(Row, "valid_cd") == 0)){
    	colClick = colStr;
		formObj.f_intg_bl_seq.value=sheetObj.GetCellValue(Row, "intg_bl_seq");
		//docObjects[2].RemoveAll();
    	doWork("SEARCHLIST02");
    	//doWork("SEARCHLIST03");
    	doWork("SEARCHLIST04");
    	doWork("SEARCHLIST05");
    }else if(colStr == "chk"){
    	if(sheetObj.GetCellValue(Row, "chk") == "0"){
    		if(!bChkSameAmsSts(Row)){
    			sheetObj.SetCellValue2(Row, "chk", "1");
    		}
    	}
    }else if (colStr == "cnee_img" || colStr == "shpr_img" || colStr == "ntfy_img") {
		var pfx = colStr.substring(0, 4);
		ComShowMemoPad4(sheetObj, Row, pfx + "_addr", false, 250, 130, Col, pfx + "_addr");   
	}
	//formObj.f_snp_cd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "snp_cd");
	//formObj.f_lst_pol_cd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lst_pol_cd");
	//formObj.f_lst_pol_nm.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lst_pol_nm");
	//formObj.f_ts_cgo.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ts_cgo");
	formObj.f_it_no.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "it_no");
	if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "it_tp") == "F"){
		formObj.f_ts_cgo.value="Y";
		formObj.f_it_tp.value='';
	}else{
		formObj.f_it_tp.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "it_tp");
	}
	formObj.f_bond_id.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bond_id");
	formObj.f_hub_cd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hub_cd");
	/*# 4876 MSG TYPE 세팅오류 AUTO로 강제세팅
	if(docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_snd") == "" /
		formObj.f_ams_snd.value="A";
	}else{
		formObj.f_ams_snd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_snd");
	}
	*/
}
function sheet2_OnClick(sheetObj, Row, Col){
	var formObj=document.frm1;
    var colStr=sheetObj.ColSaveName(Col);
    
    //#3548 OE AMS EDI 화면 보완
    /*    if(colStr == "cntr_no"){
		formObj.f_cntr_list_seq.value=sheetObj.GetCellValue(Row, "cntr_list_seq");
    	doWork("SEARCHLIST03");
    }*/
    
	formObj.f_snp_cd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "snp_cd");
	//formObj.f_lst_pol_cd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lst_pol_cd");
	//formObj.f_lst_pol_nm.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "lst_pol_nm");
	//formObj.f_ts_cgo.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ts_cgo");
	formObj.f_it_no.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "it_no");
	formObj.f_it_tp.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "it_tp");
	formObj.f_hub_cd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "hub_cd");
	//formObj.f_ams_snd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_snd");
}

function sheet1_OnDblClick(sheetObj, Row, Col) {
	var colStr = sheetObj.ColSaveName(Col);
	var formObj = document.frm1;
	if (colStr == 'hbl_no') {
		doProcess = true;
		formObj.f_cmd.value = "";
		var pgmId = "SEE_BMD_0020";
		var paramStr = "./" + pgmId + ".clt?f_cmd=" + SEARCHLIST + "&f_bl_no="
				+ escape(sheetObj.GetCellValue(Row, "hbl_no")) + "&f_intg_bl_seq="
				+ sheetObj.GetCellValue(Row, "intg_bl_seq");
		parent.mkNewFrame('Booking & HBL', paramStr,pgmId+"_SHEET_" +  sheetObj.GetCellValue(Row, "bl_no") + "_" + sheetObj.GetCellValue(Row, "intg_bl_seq"));
		
	}else if(colStr == 'mbl_no'){
		doProcess=true;
		formObj.f_cmd.value="";
		var pgmId = "SEE_BMD_0040";
		var paramStr="./" + pgmId + ".clt?f_cmd="+SEARCHLIST+'&f_ref_no='+escape(sheetObj.GetCellValue(Row, 'ref_no'))+"&f_intg_bl_seq="+sheetObj.GetCellValue(Row, "intg_mbl_seq");
	   	parent.mkNewFrame('Master B/L Entry', paramStr, pgmId+"_SHEET_" + sheetObj.GetCellValue(Row, 'ref_no')+"_"+sheetObj.GetCellValue(Row, "intg_bl_seq"));
	   	
	}
}

function TRDP_POPUP(rtnVal){
	var sheetObj = cur_sheetObj;
	
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_nm', rtnValAry[2].replace(/[:]/g,";").replace(/[']/g, "`"), 0); // full_nm
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_addr', rtnValAry[7].replace(rtnValAry[2], "").replace(/\n/g, " ").replace(/\r/g, " ").replace(/[:]/g,";").replace(/[']/g, "`").trim().substring(0, 105), 0); // address
	}
    sheetObj.SelectCell(cur_rowIdx, trdp_tp + '_nm');
}

function setSnpCd(snpCd){
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "snp_cd",snpCd);
}
function setLstPolCd(lstPolCd, lstPolNm){
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "lst_pol_cd",lstPolCd);
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "lst_pol_nm",lstPolNm);
}
function setTsCgo(tsCgo){
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "ts_cgo",tsCgo);
	if(tsCgo == "Y"){
		docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "it_tp","F");
	}else{
		docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "it_tp",frm1.f_it_tp.value);
	}
}
function setItNo(itNo){
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "it_no",itNo);
}
function setItTp(itTp){
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "it_tp",itTp);
}
function setHubCd(hubCd){
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "hub_cd",hubCd);
}
function setUsaCd(usaCd){
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "lst_usa_cd",usaCd);
	//alert(docObjects[0].CellValue(docObjects[0].SelectRow, "lst_usa_cd"));
}
function setBondNo(bondNo){
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "bond_id",bondNo);
}
function setAmsSnd(amsSnd){
	var blAmsSnd=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_snd");
	var blAmsSts=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ams_sts");
	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "ams_snd",frm1.f_ams_snd.value);
}

var cur_sheetObj;
var cur_rowIdx;
var cur_colIdx;
var trdp_tp = "";
var loc_tp = "";
var cnt_tp = "";
var ste_tp = "";
var sub_loc_tp = "";

function sheet1_OnPopupClick(sheetObj, row, col) {
	var colStr=sheetObj.ColSaveName(col);
	cur_sheetObj = sheetObj;
	cur_rowIdx = row;
	cur_colIdx = col;
	if(colStr=="ams_lst_pol_cd"){
		rtnary=new Array(1);
   		rtnary[0]="S";
   		rtnary[1]="BL";
   		rtnary[2]="";
   		rtnary[3]="";
   		//rtnary[4]=curObj;
   		callBackFunc = "LAST_POL_CD";
		modal_center_open('./CMM_POP_0030.clt',  rtnary, 820,445,"yes");
	}else if(colStr=="ams_pol_cd"){
		trdp_tp = "S";
   		rtnary="BL";
   		rtnary[0]="2";
   		rtnary[1]="";
   		rtnary[2]="";
   		rtnary[3]="";
   		
   		callBackFunc = "POL_CD";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 1150, 650, "yes");
	}else if(colStr=="ams_pod_cd"){
		trdp_tp = "S";
   		rtnary="BL";
   		rtnary[0]="2";
   		rtnary[1]="";
   		rtnary[2]="";
   		rtnary[3]="";
   		
   		callBackFunc = "POD_CD";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 1150, 650, "yes");	
   		
	}else if(colStr=="shpr_nm"){
		trdp_tp = "shpr";
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		rtnary[1]="";
   		rtnary[2]=window;
   		
   		callBackFunc = "TRDP_POPUP";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650, "yes");
   		
	} else if(colStr=="cnee_nm"){
		trdp_tp = "cnee";
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		rtnary[1]="";
   		rtnary[2]=window;
   		
   		callBackFunc = "TRDP_POPUP";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650, "yes");
   		
	} else if(colStr=="ntfy_nm"){
		trdp_tp = "ntfy";
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		rtnary[1]="";
   		rtnary[2]=window;
   		
   		callBackFunc = "TRDP_POPUP";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650, "yes");
   		
	}  
}












function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	var colStr = sheetObj.ColSaveName(col);
	cur_sheetObj = sheetObj;
	cur_rowIdx = row;
	
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="shpr_nm"){
			sheetObj.SelectCell(row, col);
			
			trdp_tp = "shpr";
			rtnary=new Array(1);
	   		rtnary[0]="2";
	   		rtnary[1]=sheetObj.GetCellValue(row, col);
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "TRDP_POPUP";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650,"yes");
	   		
		} else if(sheetObj.ColSaveName(col)=="cnee_nm"){
			sheetObj.SelectCell(row, col);
			
			trdp_tp = "cnee";
			rtnary=new Array(1);
	   		rtnary[0]="2";
	   		rtnary[1]=sheetObj.GetCellValue(row, col);
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "TRDP_POPUP";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650,"yes");
	   		
		} else if(sheetObj.ColSaveName(col)=="ntfy_nm"){
			sheetObj.SelectCell(row, col);
			
			trdp_tp = "ntfy";
			rtnary=new Array(1);
	   		rtnary[0]="2";
	   		rtnary[1]=sheetObj.GetCellValue(row, col);
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "TRDP_POPUP";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650,"yes");
	   		
		} 
	}
}




function LAST_POL_CD(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(rtnValAry[3] == ''){
			//alert("Please check the AMS Code");
			alert(getLabel('EDI_COM_ALT075') );
			return;
		}
		cur_sheetObj.SetCellValue(cur_rowIdx, 'lst_pol_cd',rtnValAry[0]);
		cur_sheetObj.SetCellValue(cur_rowIdx, 'lst_pol_nm',rtnValAry[2]);
		cur_sheetObj.SetCellValue(cur_rowIdx, 'ams_lst_pol_cd',rtnValAry[3]);
	}
}

function POL_CD(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(rtnValAry[3] == ''){
			//alert("Please check the AMS Code");
			alert(getLabel('EDI_COM_ALT075') );
			return;
		}
		cur_sheetObj.SetCellValue(cur_rowIdx, 'pol_cd',rtnValAry[0]);
		cur_sheetObj.SetCellValue(cur_rowIdx, 'pol_nm',rtnValAry[2]);
		cur_sheetObj.SetCellValue(cur_rowIdx, 'ams_pol_cd',rtnValAry[3]);
	}
}
function POD_CD(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(rtnValAry[3] == ''){
			//alert("Please check the AMS Code");
			alert(getLabel('EDI_COM_ALT075') );
			return;
		}
		cur_sheetObj.SetCellValue(cur_rowIdx, 'pod_cd',rtnValAry[0]);
		cur_sheetObj.SetCellValue(cur_rowIdx, 'pod_nm',rtnValAry[2]);
		cur_sheetObj.SetCellValue(cur_rowIdx, 'ams_pod_cd',rtnValAry[3]);
	}
}

function bChkSameAmsSts(chkRow){
	var bFirst = false;
	for(var i=1; i<=docObjects[0].RowCount(); i++){
		if(docObjects[0].GetCellValue(i, "chk") == 1){
			if(docObjects[0].GetCellValue(chkRow, "ams_sts") != docObjects[0].GetCellValue(i, "ams_sts")){
				alert(getLabel('EDI_COM_ALT074') );
				return false;
			}
		}
	}
	return true;
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
//	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
//			}
		}else if ( tmp == "onChange" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
//			}
		}
//	}
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
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value=masterVals[0];
				formObj.f_pol_nm.value=masterVals[3];
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value=masterVals[0];
				formObj.f_pod_nm.value=masterVals[3];
			}else if(CODETYPE == "location_last_pod"){
				formObj.f_lst_pol_cd.value=masterVals[0];
				formObj.f_lst_pol_nm.value=masterVals[3];
				formObj.f_ams_lst_pol_cd.value=masterVals[13];
			}else if(CODETYPE == "location_ts_cd"){
				formObj.f_ts_cd.value=masterVals[0];
				formObj.f_ts_nm.value=masterVals[3];
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value=masterVals[0];
				formObj.f_del_nm.value=masterVals[3];
			}else if(CODETYPE == "location_hub_cd"){
				formObj.f_hub_cd.value=masterVals[0];
				formObj.f_hub_nm.value=masterVals[3];
			}else if(CODETYPE == "location_usa_cd"){
				formObj.f_usa_cd.value=masterVals[0];
				formObj.f_usa_nm.value=masterVals[3];
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=masterVals[0]; 
				formObj.s_trdp_full_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value="";
				formObj.f_pol_nm.value="";
			}else if(CODETYPE == "location_last_pod"){
				formObj.f_lst_pol_cd.value="";
				formObj.f_lst_pol_nm.value="";
			}else if(CODETYPE == "location_ts_cd"){
				formObj.f_ts_cd.value="";
				formObj.f_ts_nm.value="";
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value="";
				formObj.f_del_nm.value="";
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=""; 
				formObj.s_trdp_full_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function initFinish() {
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
			var col=sheetObj.GetSelectCol();
			if(sheetObj.ColSaveName(col)==""){
				alert(CM_MSG6);
				return false;
			}
			sheetObj.SetColHidden(col,1);
			sheetObj.SetColWidth(col,1);
		break;
	 }
}
function VESSEL_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_vsl_cd.value=rtnValAry[0]; 
		formObj.f_vsl_nm.value=rtnValAry[1];
	} 
}

function POL_LOCATION_POPLIST(rtnVal){
  	var formObj=document.frm1;
  	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			formObj.f_pol_cd.value=rtnValAry[0];//loc_cd 
			formObj.f_pol_nm.value=rtnValAry[2];//loc_nm
		}
}

function POD_LOCATION_POPLIST(rtnVal){
  	var formObj=document.frm1;
  	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			formObj.f_pod_cd.value=rtnValAry[0];//loc_cd 
			formObj.f_pod_nm.value=rtnValAry[2];//loc_nm
		}
}

function LAST_POL_LOCATION_POPLIST(rtnVal){
  	var formObj=document.frm1;
  	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			formObj.f_lst_pol_cd.value=rtnValAry[0];//loc_cd 
			formObj.f_lst_pol_nm.value=rtnValAry[2];//loc_nm
			docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "lst_pol_cd",rtnValAry[0]);
			docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "lst_pol_nm",rtnValAry[2]);
		}
}
function TS_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_ts_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_ts_nm.value=rtnValAry[2];//loc_nm
	} 
}
function HUB_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_hub_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_hub_nm.value=rtnValAry[2];//loc_nm
		docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "hub_cd",rtnValAry[0]);
		//docObjects[0].CellValue(docObjects[0].SelectRow, "hub_nm") =  rtnValAry[2];
	} 
}
function USA_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_usa_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_usa_nm.value=rtnValAry[2];//loc_nm
		docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), "lst_usa_cd",rtnValAry[0]);
		//docObjects[0].CellValue(docObjects[0].SelectRow, "lst_usa_nm") =  rtnValAry[2];
	} 
	}

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.f_intg_bl_seq.value = getParam(url,"f_intg_bl_seq");
	formObj.f_mbl_no.value = getParam(url,"f_mbl_no");
//	goTabSelect('01');
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}

function gridPopCall_item_shp_cmdt_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[2].SetCellValue(cur_row, 'hts_cd',rtnValAry[0]);
		docObjects[2].SetCellValue(cur_row, 'commodity',rtnValAry[2]);
	}
}

function searchCustItem(reqVal){
	var formObj = document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			var row = docObjects[2].GetSelectRow();
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				var arrVal = rtnArr[0].split("|");
				docObjects[2].SetCellValue(row,"hts_cd",arrVal[0],0);
			}else{
				alert(CODE_NOT_FND);
				docObjects[2].SetCellValue(row,"hts_cd","",0);
			}
		}else{
			alert(CODE_NOT_FND);
			docObjects[2].SetCellValue(row,"hts_cd","",0);
		}
	}
}

var currentEventSheet;
var currentRow;
function doItemSearch(sheetObj, row, codeTp, codeStr){
    //선택된 Sheet를 Set함
	currentEventSheet = sheetObj;
	currentRow = row;
    sheetObj.SetCellValue(row, "hts_cd", codeStr.toUpperCase(), 0);
    //alert(sheetObj.GetCellValue(row,"item_shp_cmdt_cd"));

    //#3548 OE AMS EDI 화면 보완
    if(sheetObj.GetCellValue(row,"hts_cd")== -1 || sheetObj.GetCellValue(row,"hts_cd")== "" ){
    	sheetObj.SetCellValue(row, "commodity","");
    } else {
    	ajaxSendPost(itemShpCmdtCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+codeTp+'&s_code='+codeStr, './GateServlet.gsl');
    }
}

/**
 * Code Return 값을 Cell에 담는다
 */
function itemShpCmdtCdReq(rtnMsg){
    var doc=getAjaxMsgXML(rtnMsg);
    if(doc[0]=='OK'){
        if(typeof(doc[1])=='undefined'){
        	currentEventSheet.SetCellValue(currentRow, "hts_cd",'',0);
        	currentEventSheet.SetCellValue(currentRow, "commodity",'',0);
            alert(CODE_NOT_FND);
        }else{
            var rtnArr=doc[1].split('@@;');
            var masterVals=rtnArr[0].split('@@^');
            currentEventSheet.SetCellValue(currentRow, "hts_cd",masterVals[0],0);
            currentEventSheet.SetCellValue(currentRow, "commodity",masterVals[3],0);
        }
    }else{
        alert(AJ_FND_ERR);
    }
}

//#3858 [JAPT] can not send AMS - Vesel nationality
var rtnary=new Array(1);
var callBackFunc = "";
function cmmOpenPopUp(popName, curObj, airSeaTp, bndTp, valObj, bizTp,cobFlag){
	var formObj=document.frm1;
		callBackFunc = "VESSEL_POPLIST";
		rtnary=new Array(2);
		rtnary[0] = '1';
		rtnary[1] = formObj.f_vsl_nm.value;
		modal_center_open('./CMM_POP_0140.clt', rtnary, 656,470,"yes");
}

function openAmsEdiPopUp(popName, curObj, valObj){
	cmmOpenPopUp(popName, curObj, "S", "O", valObj, "M");
}

function VESSEL_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cnt_cd.value=rtnValAry[2];
	}
}

function validation_cntr(){
	var formObj=document.frm1;		
	var sheetObj = docObjects[0];
	var sheetObj2 = docObjects[1];
	
	formObj.val_msg.value = "";
	var chkCntrNoFlg = "";
	var chkCntrTpszFlg = "";
	var chkCntrSealNoFlg = "";
	//#6861 : [JAPT] AMS Container Max Digit Validation ( 11 Digit )
	var chkCntrNoSizeFlg = "";
	// Container Count Check
	if(sheetObj2.RowCount() > 0){
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_cntr_cnt", "Y");
		
		// Container Number/Type Size/Seal Number Check
		for(var i=1; i<=sheetObj2.LastRow(); i++){
			if(sheetObj2.GetCellValue(i, "cntr_no") == ""){
				chkCntrNoFlg = "N";
			}
			
			if(sheetObj2.GetCellValue(i, "cntr_tpsz_cd") == ""){
				chkCntrTpszFlg = "N";
			}
			
			if(sheetObj2.GetCellValue(i, "seal_no1") == ""){
				chkCntrSealNoFlg = "N";
			}
		    //#6861 : [JAPT] AMS Container Max Digit Validation ( 11 Digit )
			if(sheetObj2.GetCellValue(i, "cntr_no").length>11){
				chkCntrNoSizeFlg="N";
			}
		}
		
		if(chkCntrNoFlg == "") chkCntrNoFlg="Y";
		if(chkCntrTpszFlg == "") chkCntrTpszFlg="Y";
		if(chkCntrSealNoFlg == "") chkCntrSealNoFlg="Y";
		//#6861 : [JAPT] AMS Container Max Digit Validation ( 11 Digit )
		if(chkCntrNoSizeFlg== "") chkCntrNoSizeFlg="Y";
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_cntr_no", chkCntrNoFlg);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_cntr_tpsz", chkCntrTpszFlg);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_cntr_seal_no", chkCntrSealNoFlg);
		//#6861 : [JAPT] AMS Container Max Digit Validation ( 11 Digit )
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_cntr_no_sz", chkCntrNoSizeFlg);
	}else{
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_cntr_cnt", "N");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_cntr_no", "N");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_cntr_tpsz", "N");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_cntr_seal_no", "N");
	}
}

function validation_item(){
	var formObj=document.frm1;		
	var sheetObj = docObjects[0];
	var sheetObj3 = docObjects[2];
	
	var chkItemCntrNoFlg = "";
	var chkCommodityFlg = "";
	var chkHtsPkgFlg = "";
	var chkHtsWgtFlg = "";
	var chkItemRmkFlg = "";
		
	// Item Count Check
	if(sheetObj3.RowCount() > 0){
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_item_cnt", "Y");
		
		// HTS Code/HTS Desc/Package/Weight/Marks Numbers Check
		for(var i=1; i<=sheetObj3.LastRow(); i++){
			if(sheetObj3.GetCellValue(i, "cntr_no") == ""){
				chkItemCntrNoFlg = "N";
			}
			
			if(sheetObj3.GetCellValue(i, "commodity") == ""){
				chkCommodityFlg = "N";
			}
			
			if(sheetObj3.GetCellValue(i, "hts_pkg") == "" || sheetObj3.GetCellValue(i, "hts_pkg") <= 0){
				chkHtsPkgFlg = "N";
			}
			
			if(sheetObj3.GetCellValue(i, "hts_wgt") == "" || sheetObj3.GetCellValue(i, "hts_wgt") <= 0){
				chkHtsWgtFlg = "N";
			}
			
			if(sheetObj3.GetCellValue(i, "item_rmk") == ""){
				chkItemRmkFlg = "N";
			}
		}
		
		if(chkItemCntrNoFlg == "") chkItemCntrNoFlg="Y";
		if(chkCommodityFlg == "") chkCommodityFlg="Y";
		if(chkHtsPkgFlg == "") chkHtsPkgFlg="Y";
		if(chkHtsWgtFlg == "") chkHtsWgtFlg="Y";
		if(chkItemRmkFlg == "") chkItemRmkFlg="Y";
		
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_item_cntr_no", chkItemCntrNoFlg);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_commodity", chkCommodityFlg);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_hts_pkg", chkHtsPkgFlg);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_hts_wgt", chkHtsWgtFlg);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_item_rmk", chkItemRmkFlg);
	}else{
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_item_cnt", "N");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_item_cntr_no", "N");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_commodity", "N");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_hts_pkg", "N");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_hts_wgt", "N");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), "valid_item_rmk", "N");
	}
	
	if(colClick == "valid_cd"){
		if(ediAmsSeaValidation(sheetObj, sheetObj.GetSelectRow())){
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), "ready_flg", "Y");
		}else{			
			sheetObj.SetCellValue(Row, "ready_flg", "N");
		}
	}	
}

function ediAmsSeaValidation(sheetObj, row){
	var formObj=document.frm1;	
	var valMsgArr = new Array();
	
	var dispRow = row - 1;
	
	// BL List	
	var pMblNo = sheetObj.GetCellValue(row, "mbl_no");
	if(pMblNo.length > 30){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('EDI_COM_ALT382'));
	}
	
	var pCstmsBlNo = fnRegExp(sheetObj.GetCellValue(row, "hbl_no"));
	if(pCstmsBlNo.length > 12){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('EDI_COM_ALT249'));
	}
	sheetObj.SetCellValue(row, "cstms_bl_no", pCstmsBlNo);
	
	if(sheetObj.GetCellValue(row, "msg_sts_cd") == 'S'){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('EDI_COM_ALT030'));
	}
	
	if(sheetObj.GetCellValue(row, "etd_dt_tm") == ""){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('FMS_COM_ALT001') + " - ETD" );
	}
	
	if(sheetObj.GetCellValue(row, "eta_dt_tm") == ""){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('FMS_COM_ALT001') + " - ETA" );
	}
	
	if(sheetObj.GetCellValue(row, "ams_por_cd") == ""){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('FMS_COM_ALT001') + " - POR Code" );
	}
	
	if(sheetObj.GetCellValue(row, "por_nm") == ""){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('FMS_COM_ALT001') + " - POR Name" );
	}
	
	if(sheetObj.GetCellValue(row, "ams_pol_cd") == ""){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('FMS_COM_ALT001') + " - POL Code" );
	}
	
	if(sheetObj.GetCellValue(row, "pol_nm") == ""){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('FMS_COM_ALT001') + " - POL Name" );
	}
	
	if(sheetObj.GetCellValue(row, "ams_lst_pol_cd") == ""){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('FMS_COM_ALT001') + " - Last POL Code" );
	}
	
	if(sheetObj.GetCellValue(row, "lst_pol_nm") == ""){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('FMS_COM_ALT001') + " - Last POL Name" );
	}
	
	if(sheetObj.GetCellValue(row, "ams_pod_cd") == ""){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('FMS_COM_ALT001') + " - POD Code" );
	}
	
	if(sheetObj.GetCellValue(row, "ams_pod_cd").length != 4){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('EDI_COM_ALT085'));
	}
	
	if(sheetObj.GetCellValue(row, "pod_nm") == ""){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('FMS_COM_ALT001') + " - POD Name" );
	}
		
	if(sheetObj.GetCellValue(row, "ttl_itm_pck_qty") <= 0){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('EDI_COM_ALT378') );
	}
	
	if(sheetObj.GetCellValue(row, "grs_wgt") <= 0){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('EDI_COM_ALT379') );
	}
	
	if(sheetObj.GetCellValue(row, "shpr_nm") == ""){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('EDI_COM_ALT061') );
	}
	
	if(sheetObj.GetCellValue(row, "shpr_nm").length >  35){
		valMsgArr.push("Row["+ dispRow +"] : Shipper " + getLabel('EDI_COM_ALT396') );
	}
		
	if(sheetObj.GetCellValue(row, "shpr_addr").length <  36){
		valMsgArr.push("Row["+ dispRow +"] : Shipper " + getLabel('EDI_COM_ALT290') );
	}
	
	if(sheetObj.GetCellValue(row, "shpr_addr").length >  105){
		valMsgArr.push("Row["+ dispRow +"] : Shipper " + getLabel('EDI_COM_ALT397') );
	}
	
	if(sheetObj.GetCellValue(row, "cnee_nm") == ""){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('EDI_COM_ALT063') );
	}
	
	if(sheetObj.GetCellValue(row, "cnee_nm").length >  35){
		valMsgArr.push("Row["+ dispRow +"] : Consignee " + getLabel('EDI_COM_ALT396') );
	}
		
	if(sheetObj.GetCellValue(row, "cnee_addr").length <  36){
		valMsgArr.push("Row["+ dispRow +"] : Consignee " + getLabel('EDI_COM_ALT290') );
	}
	
	if(sheetObj.GetCellValue(row, "cnee_addr").length >  105){
		valMsgArr.push("Row["+ dispRow +"] : Consignee " + getLabel('EDI_COM_ALT397') );
	}
	
	if(sheetObj.GetCellValue(row, "ntfy_nm") == ""){
		valMsgArr.push("Row["+ dispRow +"] : " + getLabel('EDI_COM_ALT070') );
	}
	
	if(sheetObj.GetCellValue(row, "ntfy_nm").length >  35){
		valMsgArr.push("Row["+ dispRow +"] : Notify " + getLabel('EDI_COM_ALT396') );
	}
	
	if(sheetObj.GetCellValue(row, "ntfy_addr").length <  36){
		valMsgArr.push("Row["+ dispRow +"] : Notify " + getLabel('EDI_COM_ALT290') );
	}
	
	if(sheetObj.GetCellValue(row, "ntfy_addr").length >  105){
		valMsgArr.push("Row["+ dispRow +"] : Notify " + getLabel('EDI_COM_ALT397') );
	}
	
	// Container List
	if(sheetObj.GetCellValue(row, "valid_cntr_cnt") == "N"){	//
		valMsgArr.push("Row["+ dispRow +"] : " +  getLabel('EDI_COM_ALT088'));
	}
	if(sheetObj.GetCellValue(row, "valid_cntr_no") == "N"){	//
		valMsgArr.push("Row["+ dispRow +"] : " +  "Container No"+getLabel('EDI_COM_ALT256'));
	}
	if(sheetObj.GetCellValue(row, "valid_cntr_tpsz") == "N"){	//
		valMsgArr.push("Row["+ dispRow +"] : " +  "Container Type Size"+getLabel('EDI_COM_ALT256'));
	}
	if(sheetObj.GetCellValue(row, "valid_cntr_seal_no") == "N"){	//
		valMsgArr.push("Row["+ dispRow +"] : " +  "Container Seal No"+getLabel('EDI_COM_ALT256'));
	}
	//#6861 : [JAPT] AMS Container Max Digit Validation ( 11 Digit )
	if(sheetObj.GetCellValue(row, "valid_cntr_no_sz") == "N"){	//
		valMsgArr.push("Row["+ dispRow +"] : " +  "Container No"+getLabel('EDI_COM_ALT300'));
	}
	// Item List
	if(sheetObj.GetCellValue(row, "valid_item_cnt") == "N"){	//
		valMsgArr.push("Row["+ dispRow +"] : " +  getLabel('EDI_COM_ALT089'));
	}
	if(sheetObj.GetCellValue(row, "valid_item_cntr_no") == "N"){	//
		valMsgArr.push("Row["+ dispRow +"] : " +  "Container No"+getLabel('EDI_COM_ALT256'));
	}
	if(sheetObj.GetCellValue(row, "valid_commodity") == "N"){	//
		valMsgArr.push("Row["+ dispRow +"] : " +  "HTS Description"+getLabel('EDI_COM_ALT256'));
	}	
	if(sheetObj.GetCellValue(row, "valid_hts_pkg") == "N"){	//
		valMsgArr.push("Row["+ dispRow +"] : " +  "Package - "+getLabel('EDI_COM_ALT377'));
	}
	if(sheetObj.GetCellValue(row, "valid_hts_wgt") == "N"){	//
		valMsgArr.push("Row["+ dispRow +"] : " +  "Weight K - "+getLabel('EDI_COM_ALT377'));
	}
	if(sheetObj.GetCellValue(row, "valid_item_rmk") == "N"){	//
		valMsgArr.push("Row["+ dispRow +"] : " +  "Marks Numbers"+getLabel('EDI_COM_ALT256'));
	}
	
	//#4212 AMS 전송시 특수문자 validation  추가
	var speChr = "";
	var speChrSet = "";
	var speChrSetResult = "";
	
	formObj.f_etd_dt_tm.value=sheetObj.GetCellValue(row, "etd_dt_tm");  
	formObj.f_eta_dt_tm.value=sheetObj.GetCellValue(row, "eta_dt_tm");
	
	//<====#4212 AMS 전송시 특수문자 validation  추가====>
	speChr = replChar(sheetObj.GetCellValue(row, "shpr_nm"),'Y','AMS')
	if(speChr.length > 0) {
		if(speChrSet ==""){
			speChrSet = speChrSet + "* HB/L No. : " + sheetObj.GetCellValue(row, "hbl_no") + "\n";
			speChrSet = speChrSet + "Shipper Name : " + sheetObj.GetCellValue(row, "shpr_nm") + "\n";
		}else {
			speChrSet = speChrSet + "Shipper Name : " + sheetObj.GetCellValue(row, "shpr_nm") + "\n";
		}
	}
	
	
	speChr = replChar(sheetObj.GetCellValue(row, "shpr_addr"),'Y','AMS')
	if(speChr.length > 0) {
		if(speChrSet ==""){
			speChrSet = speChrSet + "* HB/L No. : " +  sheetObj.GetCellValue(row, "hbl_no") + "\n";
			speChrSet = speChrSet + "Shipper Address : " + sheetObj.GetCellValue(row, "shpr_addr") + "\n";
		}else {
			speChrSet = speChrSet + "Shipper Address : " + sheetObj.GetCellValue(row, "shpr_addr") + "\n";
		}
	}
	
	
	speChr = replChar(sheetObj.GetCellValue(row, "cnee_nm"),'Y','AMS')
	if(speChr.length > 0) {
		if(speChrSet ==""){
			speChrSet = speChrSet + "* HB/L No. : " +  sheetObj.GetCellValue(row, "hbl_no") + "\n";
			speChrSet = speChrSet + "Consignee Name : " + sheetObj.GetCellValue(row, "cnee_nm") + "\n";
		}else {
			speChrSet = speChrSet + "Consignee Name : " + sheetObj.GetCellValue(row, "cnee_nm") + "\n";
		}
	}
	
	
	speChr = replChar(sheetObj.GetCellValue(row, "cnee_addr"),'Y','AMS')
	if(speChr.length > 0) {
		if(speChrSet ==""){
			speChrSet = speChrSet + "* HB/L No. : " +  sheetObj.GetCellValue(row, "hbl_no") + "\n";
			speChrSet = speChrSet + "Consignee Address : " + sheetObj.GetCellValue(row, "cnee_addr") + "\n";
		}else {
			speChrSet = speChrSet + "Consignee Address : " + sheetObj.GetCellValue(row, "cnee_addr") + "\n";
		}
	}
	
	
	speChr = replChar(sheetObj.GetCellValue(row, "ntfy_nm"),'Y','AMS')
	if(speChr.length > 0) {
		if(speChrSet ==""){
			speChrSet = speChrSet + "* HB/L No. : " +  sheetObj.GetCellValue(row, "hbl_no") + "\n";
			speChrSet = speChrSet + "Notify Name : " + sheetObj.GetCellValue(i, "ntfy_nm") + "\n";
		}else {
			speChrSet = speChrSet + "Notify Name : " + sheetObj.GetCellValue(row, "ntfy_nm") + "\n";
		}
	}
	
	
	speChr = replChar(sheetObj.GetCellValue(row, "ntfy_addr"),'Y','AMS')
	if(speChr.length > 0) {
		if(speChrSet ==""){
			speChrSet = speChrSet + "* HB/L No. : " +  sheetObj.GetCellValue(row, "hbl_no") + "\n";
			speChrSet = speChrSet + "Notify Address  : " + sheetObj.GetCellValue(row, "ntfy_addr") + "\n";
		}else {
			speChrSet = speChrSet + "Notify Address  : " + sheetObj.GetCellValue(row, "ntfy_addr") + "\n";
		}
	}
	
	if(speChrSetResult.length>0){
		speChrSetResult = speChrSetResult + speChrSet + "\n";
	} else{
		speChrSetResult = speChrSet + "\n";
	}
	speChrSet = "";

	if(speChrSetResult.replace(/\n/g, "").length>0){
		valMsgArr.push("Row["+ dispRow +"] : " +  getLabel('EDI_COM_ALT277') + "\n" + speChrSetResult);
	}
	//<====#4212 AMS 전송시 특수문자 validation  추가====>
	
		
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

function fnRegExp(str){
	var regExp = /[^a-z0-9]/gi
	var rtnStr = "";
	if(regExp.test(str)){
		rtnStr = str.replace(regExp, "");
	}else{
		rtnStr = str;
	}
//	return rtnStr.replace(/(\s*)/g, "");
	return rtnStr;
}
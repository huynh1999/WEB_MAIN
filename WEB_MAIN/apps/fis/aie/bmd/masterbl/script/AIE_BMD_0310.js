/**
=========================================================
*@FileName   : AIE_BMD_0310.js
*@FileTitle  : Air Quotation Search 
*@Description: Air Quotation 목록으로 조회한다.
*@author     : Kang,Jung-Gu
*@version    : 
*@since      : 

*@Change history:
*@author     : Hoang.Pham
*@version    : 2.0 - 2014/12/25
*@since      : 2014/12/25
=========================================================
 */
var rtnary=new Array(1);
var formObj = document.frm1;
var show_delete_complete = "N";
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
}
function doWork(srcName, valObj){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
    var sheetObj=docObjects[0];
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
    	   		if(!formValidation()) return;
    	   		if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
    	   			if(formObj.f_cmd.value == REMOVE){
    	   				show_delete_complete = "Y";
    	   			}
			   		formObj.f_cmd.value=SEARCHLIST01;
			   		sheetObj.DoSearch("./AIE_BMD_0310GS.clt", FormQueryString(formObj) );
			    }
			    break;
           	case "NEW":
           		var v_bnd_clss_cd = formObj.bnd_clss_cd.value;
           		var v_url = "";
           		
           		if(v_bnd_clss_cd == "O"){
           			v_url = './AIE_BMD_0300.clt?bnd_clss_cd='+v_bnd_clss_cd;
           		}else{
           			v_url = './AIE_BMD_0400.clt?bnd_clss_cd='+v_bnd_clss_cd;
           		}
           		
 				parent.mkNewFrame('Air Quotation', v_url);
 				break;
           	case "CUST_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   	    rtnary=new Array(3);
		   	    rtnary[0]="";
//				rtnary[1]=formObj.f_cust_nm.value;
		   	    rtnary[1]="";
				rtnary[2]=window;
		   		
		   		callBackFunc = "CUST_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	        break;
           	case "CUST_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   	    rtnary=new Array(3);
		   	    rtnary[0]="";
				rtnary[1]=formObj.f_cust_nm.value;
				rtnary[2]=window;
		   		
		   		callBackFunc = "CUST_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	        break;
	   	        
           	case "OPR_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
        	  	rtnary=new Array(1);
		   		rtnary[0]="1";
		   		
		   		callBackFunc = "OPR_POPLIST";
				modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
	   	        break;
	   	 	case "PRINT":
		   	 	formObj.qttn_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "qttn_seq");
	   			if(formObj.qttn_seq.value == ""){
	   				alert(getLabel('FMS_COM_ALT004'));
	   				return;
	   			}
	   			
	   			if (prn_ofc_cd == "WEBT"){
	   				formObj.file_name.value='QTTN_WEBT.mrd';
	   			} else {
	   				formObj.file_name.value='QTTN_CMM.mrd';
	   			}
				
	   			formObj.title.value='Quotation';
	   			
	   			// Parameter Setting
	   			var param='';
	   			param += '[' + formObj.qttn_seq.value + ']'; // $1
	   			param += '[' + formObj.f_ofc_nm.value + ']'; // $2
	   			param += '[' + formObj.f_ofc_cd.value + ']'; // $3
	   			param += '[' + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "cust_addr") + ']'; 	// $4
	   			
	   			if(formObj.show_ttl_amt_chk.checked){
	   				param += '[' + 'Y' + ']'; 					// $5
	   			}else{
	   				param += '[]'; 								// $5
	   			}
	   			
	   			formObj.rd_param.value=param;
	   			formObj.mailTitle.value = "QUOTATION [QUOTATION No. " + sheetObj.GetCellValue(docObjects[0].GetSelectRow(),"qttn_no") + "]";
				popPOST(formObj, 'RPT_RD_0010.clt', 'popQttn', 1025, 740);			
				break;   
				
	   	 	case "EXCEL":
	        	if(docObjects[0].RowCount() < 1){//no data	
	    			ComShowCodeMessage("COM132501");
	    		}else{
	    			docObjects[0].Down2Excel({ DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1});
	    		}
	   	 		break;
	   	 	case "DELETE":
		   	 	if(confirm(getLabel('FMS_COM_CFMDEL'))){
	   	 			formObj.f_cmd.value=REMOVE;
	   	 		    show_delete_complete = "Y";
	   	 			formObj.qttn_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "qttn_seq");
	 				docObjects[0].DoSearch("./AIE_BMD_0310GS.clt", FormQueryString(formObj) );
	 			}
		   	 	break;
		   	 	
	   	 	case "COPY": //51936 [BNX] QUOTATION COPY 기능
	   	 		
	   	 		var row = docObjects[0].GetSelectRow(); 
	   	 		if(sheetObj.GetCellValue(row, "qttn_no") == ""){
	   	 			//Select Please.
	   	 			alert(getLabel('FMS_COM_ALT004'));
	   	 			return;
	   	 		}
	   	 		else{
	   	 			if(confirm(getLabel('FMS_COM_CFMCPY'))){ 
		   	 				 
			   	 		var formObj=document.frm1;
			   	 	   	
			   	 	   	formObj.f_cmd.value="";
			   	 	   	
			   	 	   	var v_bnd_clss_cd = sheetObj.GetCellValue(row,"bnd_clss_cd");
			   	 		var v_url = "";
			   	 		
				   	 	if(v_bnd_clss_cd == "O"){
				   			v_url = './AIE_BMD_0300.clt';
				   		}else{
				   			v_url = './AIE_BMD_0400.clt';
				   		}  

			   	 	   	var paramStr=v_url + "?bnd_clss_cd="+v_bnd_clss_cd+"&f_cmd="+COMMAND02+"&f_qttn_seq="+sheetObj.GetCellValue(row,"qttn_seq"); 
			   	 	   	parent.mkNewFrame('Ocean Quotation', paramStr);
	   	 				 
	   	 			}
	   	 		}
	   	 		break;
	   	 		
	   	} // end switch
	}
	catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e); 
        }
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
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.f_qttn_strdt, formObj.f_qttn_enddt, 'MM-dd-yyyy');
        break;
    }
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	doWork('SEARCHLIST');
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
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
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
 // 사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false);
    setShortcut();
    initFinish();
    doWork('SEARCHLIST');
}
function setShortcut(){
	shortcut.add("Alt+G",function() {
		sheet1_OnDblClick(docObjects[0], docObjects[0].GetSelectRow(), 1);
	});
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
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('AIE_BMD_0310_HDR1'), Align:"Center"} ];
	            InitHeaders(headers, info);
	
	            var cols = [ 
	                {Type:"Seq",       Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",            		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"air_sea_clss_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"bnd_clss_cd",     	KeyField:0,   CalcLogic:"",   Format:"",         	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"qttn_no",   			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"qttn_seq",         	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"qttn_dt",    		KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"opr_usr_id",   		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"inco_cd",   			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"bkg_no",   			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Date",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"cust_cd",     		KeyField:0,   CalcLogic:"",   Format:"",         	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cust_nm",  			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cust_pic_nm",  		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"agn_cd",   			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"agn_nm",   			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Date",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"vty_dt",  			KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"cmdt_cd",  			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cmdt_nm",   			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Int",       Hidden:1,  Width:100,  Align:"Right",   ColMerge:0,   SaveName:"pck_qty",   			KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"pck_ut_cd",   		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Float",     Hidden:1,  Width:100,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt_kg",      	KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Float",     Hidden:1,  Width:100,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt_lbs",   		KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Float",     Hidden:1,  Width:100,  Align:"Right",   ColMerge:0,   SaveName:"meas_cbm",   		KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Float",     Hidden:1,  Width:100,  Align:"Right",   ColMerge:0,   SaveName:"meas_cft",   		KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"mode",        		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"tt",        			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"carr_nm",        	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"por_cd",        		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",        		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"pol_cd",        		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",        		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"pod_cd",        		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",        		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"fnl_dest_loc_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"fnl_dest_loc_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"del_cd",        		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",        		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"state_cd",         	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"state_nm",          	KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"state_cnt_cd",       KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"curr_cd",      		KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"cust_ref_no",   		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"free_form_chk",   	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"free_form_txt",   	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"rmk",   				KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cust_addr",   		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"Indexing",      		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Status",    Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" }];
	             
	            InitColumns(cols);
	
	            SetEditable(1);
	            InitViewFormat(0, "qttn_dt", 	"MM-dd-yyyy");
	            InitViewFormat(0, "vty_dt", 	"MM-dd-yyyy");
	            SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	            SetSheetHeight(480);
		   }                                                      
		break;
    }
}
function getPageURL() {
	return document.getElementById("pageurl").value + "?bnd_clss_cd=" + frm1.bnd_clss_cd.value;
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
		// 선택된 Column Hidden
		case "Column Hidden":
			var col=sheetObj.GetSelectCol();
			sheetObj.SetColHidden(col,1);
			sheetObj.SetColWidth(col,1);
		break;
	 }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){	
	var colStr=sheetObj.ColSaveName(Col);
	var formObj=document.frm1;
   	doProcess=true;
   	formObj.f_cmd.value="";
   	
   	var v_bnd_clss_cd = sheetObj.GetCellValue(Row,"bnd_clss_cd");
	var v_url = "";
	
	if(v_bnd_clss_cd == "O"){
		v_url = './AIE_BMD_0300.clt';
	}else{
		v_url = './AIE_BMD_0400.clt';
	}
	
   	var paramStr=v_url + "?bnd_clss_cd="+v_bnd_clss_cd+"&f_cmd="+SEARCHLIST+"&f_qttn_no="+sheetObj.GetCellValue(Row,"qttn_no")+"&f_qttn_seq="+sheetObj.GetCellValue(Row,"qttn_seq");
   	parent.mkNewFrame('Air Quotation', paramStr,"AIE_BMD_0300_SHEET_"+sheetObj.GetCellValue(Row,"qttn_no")+"_"+sheetObj.GetCellValue(Row,"qttn_seq"));
}

var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp, air_sea_clss_cd){
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}		
	
	var s_type="";
	var s_air_sea_clss_cd="";
	
	if ( tmp == "onKeyDown" ) {
		if (event.keyCode == 13){
			CODETYPE=str;		
			if(str=="CUST"){
				s_type="trdpCode";
			}else if(str=="POR" || str=="POL" || str=="POD"){
				s_type="location";
				s_air_sea_clss_cd='&air_sea_clss_cd='+air_sea_clss_cd;
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code+s_air_sea_clss_cd, './GateServlet.gsl');
		}
	} else if ( tmp == "onBlur" ) {
		CODETYPE=str;		
		if(str=="CUST"){
			s_type="trdpCode";
		}else if(str=="POR" || str=="POL" || str=="POD"){
			s_type="location";
			s_air_sea_clss_cd='&air_sea_clss_cd='+air_sea_clss_cd;
		}
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code+s_air_sea_clss_cd, './GateServlet.gsl');
	}
	
	var formObj=document.frm1;
	
	if(s_code == ""){
		if(str=="CUST"){
			formObj.f_cust_cd.value = "";
			formObj.f_cust_nm.value = "";
		}else if(str=="POL"){
			formObj.f_pol_cd.value = "";
			formObj.f_pol_nm.value = "";
		}else if(str=="POD"){
			formObj.f_pod_cd.value = "";
			formObj.f_pod_nm.value = "";
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
			var Vals=rtnArr[0].split('@@^');	
			
			if(CODETYPE == "CUST"){
				formObj.f_cust_cd.value=Vals[0]; 
				formObj.f_cust_nm.value=Vals[16];
				
			}else if(CODETYPE == "POR"){
				formObj.f_por_cd.value=Vals[0];
				formObj.f_por_nm.value=Vals[3];
				
			}else if(CODETYPE == "POL"){
				formObj.f_pol_cd.value=Vals[0];
				formObj.f_pol_nm.value=Vals[3];
				
			}else if(CODETYPE == "POD"){
				formObj.f_pod_cd.value=Vals[0];
				formObj.f_pod_nm.value=Vals[3];
			}			
		}else{
			if(CODETYPE == "CUST"){
				formObj.f_cust_cd.value=""; 
				formObj.f_cust_nm.value=""; 
				
			}else if(CODETYPE == "POR"){
				formObj.f_por_cd.value=""; 
				formObj.f_por_nm.value=""; 
				
			}else if(CODETYPE == "POL"){
				formObj.f_pol_cd.value=""; 
				formObj.f_pol_nm.value="";  
				
			}else if(CODETYPE == "POD"){
				formObj.f_pod_cd.value=""; 
				formObj.f_pod_nm.value="";  
			}
		}
	}else{
		//alert(getLabel('AIE_BMD_MSG43'));		
	}
}

function CUST_POPLIST(rtnVal){
	var formObj=document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cust_cd.value=rtnValAry[0];
		formObj.f_cust_nm.value=rtnValAry[10];
	}
}

function locOpenPopUp(curObj, air_sea_clss_cd){
	var formObj=document.frm1;
	
	if(curObj.id == "por"){
		rtnary=new Array(5);
		rtnary[0]=air_sea_clss_cd;
		rtnary[1]="";
//		rtnary[2]=formObj.f_por_nm.value;
		rtnary[2]="";
		rtnary[3]="";
		rtnary[4]=curObj;
		
   		callBackFunc = "POR_LOCATION_POPLIST";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
   		
	}else if(curObj.id == "pol"){
		rtnary=new Array(5);
		rtnary[0]=air_sea_clss_cd;
		rtnary[1]="";
//		rtnary[2]=formObj.f_pol_nm.value;
		rtnary[2]="";
		rtnary[3]="";
		rtnary[4]=curObj;
		
   		callBackFunc = "POL_LOCATION_POPLIST";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		
	}else if(curObj.id == "pod"){
		rtnary=new Array(5);
		rtnary[0]=air_sea_clss_cd;
		rtnary[1]="";
//		rtnary[2]=formObj.f_pod_nm.value;
		rtnary[2]="";
		rtnary[3]="";
		rtnary[4]=curObj;
		
   		callBackFunc = "POD_LOCATION_POPLIST";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		
	}
}

function locOpenPopUpName(curObj, air_sea_clss_cd){
	var formObj=document.frm1;
	
	if(curObj.id == "por"){
		rtnary=new Array(5);
		rtnary[0]=air_sea_clss_cd;
		rtnary[1]="";
		rtnary[2]=formObj.f_por_nm.value;
		rtnary[3]="";
		rtnary[4]=curObj;
		
   		callBackFunc = "POR_LOCATION_POPLIST";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
   		
	}else if(curObj.id == "pol"){
		rtnary=new Array(5);
		rtnary[0]=air_sea_clss_cd;
		rtnary[1]="";
		rtnary[2]=formObj.f_pol_nm.value;
		rtnary[3]="";
		rtnary[4]=curObj;
		
   		callBackFunc = "POL_LOCATION_POPLIST";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		
	}else if(curObj.id == "pod"){
		rtnary=new Array(5);
		rtnary[0]=air_sea_clss_cd;
		rtnary[1]="";
		rtnary[2]=formObj.f_pod_nm.value;
		rtnary[3]="";
		rtnary[4]=curObj;
		
   		callBackFunc = "POD_LOCATION_POPLIST";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		
	}
}

function POR_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_por_cd.value=rtnValAry[0];
		formObj.f_por_nm.value=rtnValAry[2];
	} 
}

function POL_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pol_cd.value=rtnValAry[0];
		formObj.f_pol_nm.value=rtnValAry[2];
	} 
}

function POD_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pod_cd.value=rtnValAry[0];
		formObj.f_pod_nm.value=rtnValAry[2];
	} 
}

function OPR_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_opr_usr_id.value=rtnValAry[0];
	}
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg) {
	if(frm1.f_cmd.value==REMOVE){
		doWork("SEARCHLIST");
		return;
	}
	doDispPaging(docObjects[0].GetCellValue(1, "Indexing"), getObj('pagingTb'));
	
	if(errMsg =='' && show_delete_complete == "Y"){
		showCompleteProcess();
	}
}
function clearAll(){
	//docObjects[0].RemoveAll();
	var formObj=document.frm1;
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text"){
			collTxt[i].value="";
		}           
	}
	formObj.show_ttl_amt_chk.checked=false
}
function entSearch(){
	if(event.keyCode == 13){
		document.forms[0].f_CurPage.value='';
		doWork('SEARCHLIST')
	}
}
function formValidation(){
	if(!chkSearchCmprPrd(false, frm1.f_qttn_strdt, frm1.f_qttn_enddt)){
		return false;
	}
	return true;
}
//Calendar flag value
var firCalFlag=false;
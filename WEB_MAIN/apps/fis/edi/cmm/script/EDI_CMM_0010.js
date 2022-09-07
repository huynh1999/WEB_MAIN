var type;
var selectRow=0;
var SI_CMDT_CHECK = false;

function doWork(srcName, val){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    
    var formObj=document.frm1;
    switch(srcName) {
      
    	case "MODIFY":
    		
    		// 만약 Sending 이라면  Save불가 -- 다시 고민해 봅시다.
    		// validation 체크 
    		selectRow = sheetObj.GetSelectRow();
    		if (!siEdiValidation(sheetObj,selectRow)){
    			return false;
    		}

    		if ($(':radio[name="bl_frt_tp_radio"]:checked').val() == "Freighted" ){
    			formObj.bl_frt_tp.value = "F";
    		} else {
    			formObj.bl_frt_tp.value = "U";
    		}
    		
    		// check 값 체크 
    		//console.log("bl_tp_combine = "+ $('#bl_tp_combine').is(":checked"));
    		//console.log("bl_frt_tp_radio = "+ $(':radio[name="bl_frt_tp_radio"]:checked').val());
    		var bl_tp_split = $('#bl_tp_split').is(":checked");
    		var bl_tp_combine =  $('#bl_tp_combine').is(":checked");
    		
    		if (bl_tp_split){
    			formObj.si_bl_tp.value = "S";
    		} else if (bl_tp_combine){
    			formObj.si_bl_tp.value = "C";
    		} else {
    			formObj.si_bl_tp.value = "";
    		}

    		
    		if(confirm(getLabel('FMS_COM_CFMSAV'))){
    			formObj.f_cmd.value=MODIFY;
    			var org_bl_qty = formObj.org_bl_qty.value;
    			if (org_bl_qty == ""){
    				formObj.org_bl_qty.value = 0;
    			}
    			submitForm(formObj.f_cmd.value);
    			doWork("SEARCHLIST");
    		}
    		
        break;
        
    	case "SEARCHLIST":
    		formObj.f_cmd.value=SEARCHLIST;
    		sheetObj.DoSearch("./EDI_CMM_0010GS.clt", FormQueryString(formObj) );
    		break;
       
    	case "SEARCH01":
    		formObj.f_cmd.value=SEARCH01;

    		formObj.intg_bl_seq.value = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "intg_bl_seq");
    		formObj.msg_no.value = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "msg_no");
    		formObj.msg_no_seq.value = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "msg_no_seq");
    		formObj.si_sts.value = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "si_sts");

    		submitForm(formObj.f_cmd.value);

    		if (SI_CMDT_CHECK){
    			sheetObj2.DoSearch("./EDI_CMM_0011GS.clt", FormQueryString(formObj) );
    		} 
    		
    		
   		break;
    		
		//EDI 전송 
		case "SEND_EDI":
			
			// 현재 전송중(Sending)상태이면 Break!
			//alert("You cannot send data that's already being transmitted. Please wait.");
			var msg_sts = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "msg_sts");
			
			// 전송중 또는 Reject , TRANSMITTED이면 재전송 안되게 -  SAVE먼저 해야함 
			if(msg_sts == "S" || msg_sts == "R" || msg_sts == "T" ){
				//alert("You cannot send data that's already being transmitted. Please wait.");
				alert(getLabel('EDI_COM_ALT076'));
				return false;
			}
			
			selectRow = sheetObj.GetSelectRow();
			
			var chks=sheetObj.FindCheckedRow('chk');
			if(chks == ''){
				alert(getLabel('FMS_COM_ALT007'));
				return false;
			}
			
			for(var i=1;i<sheetObj.LastRow() + 1;i++){
				if(sheetObj.GetCellValue(i, "chk")=="1"){	
					if(sheetObj.GetCellValue(i, "msg_sts_nm")=="New" || sheetObj.GetCellValue(i, "msg_sts_nm")=="Sending"){	
						alert(getLabel('EDI_COM_ALT077'));
						return false;
					}
					if (!siEdiValidation(sheetObj,i)){
						return false;
					}
				}
			}

		    formObj.f_cmd.value=COMMAND01;
		    if(confirm(getLabel('FMS_COM_CFMSENDEDI'))){
		    	sheetObj.DoAllSave("./EDI_CMM_0010GS.clt", FormQueryString(formObj) +'', true);
		    }
		    
		break;
				
		
		// #51932 [ZEN] Trade partner group 컬럼 추가 
		case "SET_UNLOC_CODE"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			type = val;
			rtnary=new Array(1);
			
			var tempVal = "";
			if (type == "POR") {rtnary[0] = formObj.por_cd.value; rtnary[1] = formObj.por_nm.value;if(rtnary[0] == "")return;}
			if (type == "POL") {rtnary[0] = formObj.pol_cd.value; rtnary[1] = formObj.pol_nm.value;if(rtnary[0] == "")return;}
			if (type == "POD") {rtnary[0] = formObj.pod_cd.value; rtnary[1] = formObj.pod_nm.value;if(rtnary[0] == "")return;}
			if (type == "DEL") {rtnary[0] = formObj.del_cd.value; rtnary[1] = formObj.del_nm.value;if(rtnary[0] == "")return;}

			callBackFunc = "SET_UNLOC_CODE";
			modal_center_open('./CMM_POP_0420.clt', rtnary, 700,390,"yes");
	     break;
		
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST');
}



function SET_UNLOC_CODE(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		if (type == "POR") 	formObj.un_por_cd.value=rtnVal;
		if (type == "POL") 	formObj.un_pol_cd.value=rtnVal;
		if (type == "POD") 	formObj.un_pod_cd.value=rtnVal;
		if (type == "DEL") 	formObj.un_del_cd.value=rtnVal;
	}
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
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
	
    var opt_key_sec = "SI_CMDT_CHECK";
    ajaxSendPost(getSiCmdtCheck, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
	
	doWork("SEARCHLIST");
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

             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('EDI_SPI_0010_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"chk",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"msg_sts_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,  ToolTip:true },
                    {Type:"Combo",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"msg_fnc_cd",    	 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"cnee_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,  Width:0,   Align:"Center",  ColMerge:0,   SaveName:"msg_sts",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    
                    
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"si_sts" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"msg_no" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"msg_no_seq" },
                    
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_trdp_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"por_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pol_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pod_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"del_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"por_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pol_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pod_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"del_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"un_por_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"un_pol_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"un_pod_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"un_del_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pck_qty" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pck_ut_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"grs_wgt" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"meas" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_cnt" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"itn_no" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"no_name_cntr_cnt" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"no_tpsz_cntr_cnt" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"desc_txt" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_addr" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_pic_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_pic_phn" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_pic_fax" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_pic_eml" },

                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_addr" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_pic_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_pic_phn" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_pic_fax" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_pic_eml" },

                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_addr" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_pic_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_pic_phn" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_pic_fax" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_pic_eml" },
                    
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_trdp_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_trdp_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_trdp_addr" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_pic_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_pic_phn" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_pic_fax" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_pic_eml" },
             		{Type:"Text",      Hidden:1, Width:0,   Align:"Center",  ColMerge:0,   SaveName:"err_cd" }];
              
             InitColumns(cols);

             SetEditable(1);
             SetColProperty('msg_fnc_cd', {ComboText:'Original|Amend', ComboCode:'9|5'} );
             SetSheetHeight(680);

          //  sheetObj.SetMergeSheet(3);
           }                                                      
         break;
         
         case 2:      //IBSheet1 init
        	 with (sheetObj) {
        	 	SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
	        	 
	        	 var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        	 var headers = [ {  Text:"|HTS Name||Package|Qty|Description|Weight(KGB)|Meas(CBM)", Align:"Center"} ];
	        	 InitHeaders(headers, info);
	        	 
	        	 var cols = [
	        	 {Type:"Text", 		Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shp_cmdt_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		         {Type:"Text",      Hidden:0,  	Width:120,  Align:"Left",    ColMerge:0,   SaveName:"shp_cmdt_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		         {Type:"Text",    	Hidden:1, 	Width:0,   	Align:"Center",  ColMerge:1,   SaveName:"pck_ut_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		         {Type:"Text",      Hidden:0, 	Width:80,   Align:"Left",    ColMerge:0,   SaveName:"pck_ut_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		         {Type:"Int",       Hidden:0,  	Width:50,   Align:"Right",   ColMerge:1,   SaveName:"pck_qty",			   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		         {Type:"Text",      Hidden:0,  	Width:200,  Align:"Left",    ColMerge:1,   SaveName:"desc",        		   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		         {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"wgt", 				   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		         {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"meas",   			   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 }
		         
	        	 ];

	        	 InitColumns(cols);
	        	 SetEditable(1);
	        	 SetSheetHeight(290);
	        	 
	         }                                                      
       	 break;
      }
}

//--------------------------------------------------------------------------------------------------------------
//Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
function goTabSelect(isNumSep) {
	var tabObjs=document.getElementsByName('tabLayer');
	if( isNumSep == "01" ) {
		currTab=isNumSep;	//탭상태저장
		tabObjs[0].style.display='inline';
		tabObjs[1].style.display='none';
	}else if( isNumSep == "02" ) {
		currTab=isNumSep;	//탭상태저장
		tabObjs[0].style.display='none';
		tabObjs[1].style.display="inline";
		frm1.send_msg_txt.value='';
		doWork("SEARCHLIST03");
	}
}

function sheet1_OnSaveEnd(sheetObj, errMsg){
	doWork('SEARCHLIST');
}

function sheet1_OnClick(sheetObj,Row,Col){ 

	var formObj=document.frm1;
	formObj.val_msg.value = "";
	if(sheetObj.ColSaveName(Col) == "ref_no" || sheetObj.ColSaveName(Col) == "msg_fnc_cd"){
		return;
	}
	
	
	if(sheetObj.ColSaveName(Col) != "chk" ){
		doWork('SEARCH01');
	} else if (0 == sheetObj.GetCellValue(Row, "chk")){
		// Save 하지 않으면 check되지않게 
		var si_sts = sheetObj.GetCellValue(Row, "si_sts");
		if ("" == si_sts) {
			// check 하지않고 onchange도 발생 시키지 않는다
			sheetObj.SetCellValue(Row,"chk",0,0);
			//alert("Please save before sending EDI.");
			alert(getLabel('EDI_COM_ALT077'));
			
			return;
		}
		
		// Hidden값을 설정한다. msg_sts , sg_sts_seq값이 없으면 0으로 설정한다 (PK임으로 null불가)
		formObj.msg_no.value = sheetObj.GetCellValue(Row, "msg_sts")!=""?sheetObj.GetCellValue(Row, "msg_no"):"0";
		formObj.msg_no_seq.value = sheetObj.GetCellValue(Row, "msg_sts")!=""?sheetObj.GetCellValue(Row, "msg_no_seq"):"0";
		formObj.si_sts.value = si_sts;
		
		doWork('SEARCH01');
	}
	
	countSameCarrbkgNo(sheetObj,Row,Col);	
}

function sheet1_OnChange(sheetObj,Row,Col){ 
	
	// Save 하지 않으면 check되지않게 
	var si_sts = sheetObj.GetCellValue(Row, "si_sts");
	if ("" == si_sts) {
		// check 하지않고 onchange도 발생 시키지 않는다
		sheetObj.SetCellValue(Row,"chk",0,0);
		return;
	}

	var formObj=document.frm1;
	if(sheetObj.ColSaveName(Col) == "chk" ){
		
		//console.log("Change = "+sheetObj.GetCellValue(Row,Col));   // 0 : uncheck,  1: check
		
		// Split 일 경우 동시에  체크하게 
		// 분리전송은 일단 금지
		/*
		var isChecked =  sheetObj.GetCellValue(Row,Col)==1?true:false;
		if (isChecked) {
			findSameCarrbkgNo(sheetObj,Row,Col,sheetObj.GetCellValue(Row,Col));
		}
		*/
		findSameCarrbkgNo(sheetObj,Row,Col,sheetObj.GetCellValue(Row,Col));
	}
}


function sheet1_OnDblClick(sheetObj,Row,Col){	
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr=="ref_no"){
		var formObj=document.frm1;
		doProcess=true;
		formObj.f_cmd.value="";
		var paramStr="./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST+'&f_ref_no='+escape(sheetObj.GetCellValue(Row, 'ref_no'))+"&f_intg_bl_seq="+sheetObj.GetCellValue(Row, "intg_bl_seq");
	   	parent.mkNewFrame('Master B/L Entry', paramStr, "SEE_BMD_0040_SHEET_" + sheetObj.GetCellValue(Row, 'ref_no')+"_"+sheetObj.GetCellValue(Row, "intg_bl_seq"));
	}
}

function sheet1_OnSearchEnd(sheetObj,Row,Col){ 
	
	for(var i=1;i<sheetObj.LastRow() + 1;i++){
		
		if(sheetObj.GetCellValue(i, "ref_no") != ""){
			sheetObj.SetCellFontColor(i,'ref_no',"#0000FF");
		}
		
		var msg_sts = sheetObj.GetCellValue(i,"msg_sts");
		if("" == msg_sts){
			var si_sts = sheetObj.GetCellValue(i,"si_sts");
			if (si_sts=="C") {
				sheetObj.SetCellValue(i,"msg_sts_nm","Saved",0);
			} else{
				sheetObj.SetCellValue(i,"msg_sts_nm","New",0);
			}
		}	
		
		var msg_sts_nm = sheetObj.GetCellValue(i, "msg_sts_nm");
		if (msg_sts_nm == "Error"){
			var errCd = sheetObj.GetCellValue(i, "err_cd");
			sheetObj.SetToolTipText(i, "msg_sts_nm", errCd);
		}
	}
	
	//console.log(selectRow);
	if(selectRow != 0){
		sheetObj.SetSelectRow(selectRow);
	}
	
	// radio check 값 설정 
	var frtRadioVal = formObj.bl_frt_tp.value;
	var blCheckVal = formObj.si_bl_tp.value;

	if (frtRadioVal =="F"){
		$('input:radio[name="bl_frt_tp_radio"]:input[value='+"bl_frt_tp_radio"+']').attr("checked", true);
	} else {
		$('input:radio[name="bl_frt_tp_radio"]:input[value='+"bl_frt_tp_radio"+']').attr("checked", true);
	}

	if (blCheckVal == "S"){
		$('#bl_tp_split').prop("checked", true);
	} else if (blCheckVal == "C"){
		$('#bl_tp_combine').prop("checked", true);
	}
}


function sheet2_OnSearchEnd(sheetObj,Row,Col){ 
	
}


function sheet1_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}

function siEdiValidation(sheetObj, row) {
	//SI EDI Validation check
	// 1. 허용된 선사인가? Com_Cd로 조회 > E001
	
	var valMsgArr = new Array();
	var itemSheet=docObjects[1];
	var lnrList = new Array();
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
	}
		
	
	// 2. VSL VVD Check 
/*    var formObj=document.frm1;
	var vmlNm = formObj.vsl_nm.value();
	var voy   = formObj.voy.value();
	
	if (vmlNm == "" || voy == ""){
    	alert(getLabel('FMS_COM_ALT007') + "\n - "+ "Vessel/Voyage");
    	return false;
	}*/
	
	// 3. 이외 항목 check 
	var formObj=document.frm1;
	
	var ref_no = sheetObj.GetCellValue(row, "ref_no");
	var cnee_nm   =    sheetObj.GetCellValue(row, "cnee_nm");
    var un_pol_cd =    formObj.un_pol_cd.value;
    var un_pod_cd =    formObj.un_pod_cd.value;
    var pol_nm =       sheetObj.GetCellValue(row, "pol_nm");
    var pod_nm =       sheetObj.GetCellValue(row, "pod_nm");
    var pck_qty =      sheetObj.GetCellValue(row, "pck_qty");
    var pck_ut_cd =    sheetObj.GetCellValue(row, "pck_ut_cd");
    var grs_wgt =      sheetObj.GetCellValue(row, "grs_wgt");
    var meas =         sheetObj.GetCellValue(row, "meas");
    var cntr_cnt =     sheetObj.GetCellValue(row, "cntr_cnt");
    var itn_no =	   sheetObj.GetCellValue(row, "itn_no");
    var no_name_cntr_cn = sheetObj.GetCellValue(row, "no_name_cntr_cnt");
    var no_tpsz_cntr_cn = sheetObj.GetCellValue(row, "no_tpsz_cntr_cnt");
    var desc_txt =     sheetObj.GetCellValue(row, "desc_txt");
    var shpr_pic_nm =  formObj.shpr_pic_nm.value;
    var shpr_pic_phn = formObj.shpr_pic_phn.value;
    var shpr_pic_fax = formObj.shpr_pic_fax.value;
    var shpr_pic_eml = formObj.shpr_pic_eml.value;
    var cnee_pic_nm =  formObj.cnee_pic_nm.value;
    var cnee_pic_phn = formObj.cnee_pic_phn.value;
    var cnee_pic_fax = formObj.cnee_pic_fax.value;
    var cnee_pic_eml = formObj.cnee_pic_eml.value;
    var ntfy_pic_nm =  formObj.ntfy_pic_nm.value;
    var ntfy_pic_phn = formObj.ntfy_pic_phn.value;
    var ntfy_pic_fax = formObj.ntfy_pic_fax.value;
    var ntfy_pic_eml = formObj.ntfy_pic_eml.value;
    var carr_pic_nm =  sheetObj.GetCellValue(row, "carr_pic_nm");
    var carr_pic_phn = sheetObj.GetCellValue(row, "carr_pic_phn");
    var carr_pic_fax = sheetObj.GetCellValue(row, "carr_pic_fax");
    var carr_pic_eml = sheetObj.GetCellValue(row, "carr_pic_eml");
    var hbl_cnt = formObj.hbl_cnt.value;

    var org_bl_qty =   formObj.org_bl_qty.value;
    
    // 1. null check
    if (cnee_nm == "") {  
    	valMsgArr.push(getLabel('EDI_COM_ALT010'));
    }
    if (un_pol_cd == "") {  
    	valMsgArr.push(getLabel('EDI_COM_ALT032'));
    }
    if (un_pod_cd == "") {  
    	valMsgArr.push(getLabel('EDI_COM_ALT033'));
    }
    if (pol_nm == "") {  
    	valMsgArr.push(getLabel('EDI_COM_ALT034'));
    }
    if (pod_nm == "") {  
    	valMsgArr.push(getLabel('EDI_COM_ALT035'));
    }
    if (pck_qty == "" || pck_qty*1 == 0) {  
    	valMsgArr.push(getLabel('EDI_COM_ALT015'));
    }
    if (pck_ut_cd == "") {  
    	valMsgArr.push(getLabel('EDI_COM_ALT036'));
    }
    if (grs_wgt == "" || grs_wgt*1 == 0) {  
    	valMsgArr.push(getLabel('EDI_COM_ALT016'));
    }
    
    // 1. Desc Check
    // DESC, Item Check
    // cmdt 단위로 체크할땐 sheet2의 rmk값을 체크한다.
    // HBL이 없으면 MBL을 체크한다.
    //alert(SI_CMDT_CHECK);
    if (hbl_cnt > 0 && SI_CMDT_CHECK){
    	
    	// Gross Weight Check
    	// Packag Count Check
    	
    	
    	var rowCount = itemSheet.RowCount();
    	if (rowCount == 0){
    		valMsgArr.push(getLabel('EDI_COM_ALT037'));
    	}
    	
    	var beforeItemCode = "";
   		var beforePackgeCode = "";
   		var beforeDesc = "";
   		var tempMsg = "";
    	
    	for(var i=1;i<itemSheet.LastRow() + 1;i++){
    		
    		var desc = itemSheet.GetCellValue(i,"desc");
    		var wgt = itemSheet.GetCellValue(i,"wgt");
    		var shpCmdtMeas = itemSheet.GetCellValue(i,"meas");

    		var currentItemCode = itemSheet.GetCellValue(i,"shp_cmdt_cd");
    		var currentPackgeCode = itemSheet.GetCellValue(i,"shp_cmdt_cd");
    		
    		if(trim(desc) == "" || wgt*1 == 0){
    			valMsgArr.push(getLabel('EDI_COM_ALT037'));
    			break;
    		}
    		
    		tempMsg = dataValidationByVndr("INTTRA", "MEASUREMENT", shpCmdtMeas);
    		
    		if(tempMsg != ""){
    			valMsgArr.push(getLabel('EDI_COM_ALT037'));
    			break;
    		}
    		
    		if (beforeItemCode == currentItemCode && beforePackgeCode == currentPackgeCode && beforeDesc != desc){
    			itemSheet.SetCellBackColor(i, "desc", "#AA2233");
    		}
    		
        	beforeItemCode = currentItemCode;
       		beforePackgeCode = currentPackgeCode;
       		beforeDesc = desc;
    	}
    	
    } else {
    	// mbl 단위로 체크할땐 mbl의 DESC 값을 체크한다.
    	if (trim(desc_txt) == "") {  
    		valMsgArr.push(getLabel('EDI_COM_ALT038'));
    	}
    	tempMsg = dataValidationByVndr("INTTRA", "MEASUREMENT", meas);
    	if(tempMsg != ""){
			valMsgArr.push(tempMsg);
		}
    }
    
    if (trim(itn_no) == "") {  
    	// POL이 US일때 ITN NO가 필수 (일단 POL이 거의 US이므로 일단 US의 체크는 하지 않는다 ) 
    	valMsgArr.push(getLabel('EDI_COM_ALT039'));
    }
    
    if (trim(org_bl_qty) == "" ) {
    	valMsgArr.push(getLabel('EDI_COM_ALT040'));
    }
    
    // 0 > 이상인지 체크 
    if (cntr_cnt == 0 ) {  
    	valMsgArr.push(getLabel('EDI_COM_ALT018'));
    }
    // #3913 [PBS, PBE] [03/08] Binex S/I EDI 관련 validtion
    /******
    if (no_name_cntr_cn > 0) {   // 이름 없는 컨테이너가 1개 이상이라면 
    	valMsgArr.push(getLabel('EDI_COM_ALT041'));
    }
     *****/
    if (no_tpsz_cntr_cn > 0) {  // TPSZ 없는 컨테이너가 1개 이상이라면 
    	valMsgArr.push(getLabel('EDI_COM_ALT042'));
    }
    
    // 각trdp에 tel/fax/eml 이 있을때 pic는 필수
    if (shpr_pic_phn != "" || shpr_pic_fax !="" || shpr_pic_eml != "") {
    	if (shpr_pic_nm  == "") {
    		valMsgArr.push(getLabel('EDI_COM_ALT026'));
    	}
    }
    if (cnee_pic_phn != "" || cnee_pic_fax !="" || cnee_pic_eml != "") {
    	if (cnee_pic_nm  == "") {
    		valMsgArr.push(getLabel('EDI_COM_ALT027'));
    	}
    }
    if (ntfy_pic_phn != "" || ntfy_pic_fax !="" || ntfy_pic_eml != "") {
    	if (ntfy_pic_nm  == "") {
    		valMsgArr.push(getLabel('EDI_COM_ALT028'));
    	}
    }
    if (carr_pic_phn != "" || carr_pic_fax !="" || carr_pic_eml != "") {
    	if (carr_pic_nm  == "") {
    		valMsgArr.push(getLabel('EDI_COM_ALT029'));
    	}
    }
    
    var speChr = "";
	var speChrSet = "";
	var speChrSetResult = "";
	
	for(var i=1; i<=docObjects[0].LastRow(); i++){
		if(docObjects[0].GetCellValue(i, "chk") == 1){

			//<====#4627 [JP Logistics] needed to add Validation for S/I EDI ====>
			var siValidation = '';
			speChr = replChar(formObj.shpr_trdp_nm.value,'Y','SI');
			if(speChr.length > 0) {
				if(speChrSet ==""){
					speChrSet = speChrSet + "* HB/L No. : " + docObjects[0].GetCellValue(i, "hbl_no") + "\n";
					speChrSet = speChrSet + "Shipper Name : " + formObj.shpr_trdp_nm.value + "\n";
				}else {
					speChrSet = speChrSet + "Shipper Name : " + formObj.shpr_trdp_nm.value + "\n";
				}
			}
			
			
			speChr = replChar(formObj.shpr_trdp_addr.value,'Y','SI');
			if(speChr.length > 0) {
				if(speChrSet ==""){
					speChrSet = speChrSet + "* HB/L No. : " +  docObjects[0].GetCellValue(i, "hbl_no") + "\n";
					speChrSet = speChrSet + "Shipper Address : " + formObj.shpr_trdp_addr.value + "\n";
				}else {
					speChrSet = speChrSet + "Shipper Address : " + formObj.shpr_trdp_addr.value + "\n";
				}
				valMsgArr.push('Shipper ' + getLabel('EDI_COM_ALT292'));
			}
			
			
			speChr = replChar(formObj.cnee_trdp_nm.value,'Y','SI');
			if(speChr.length > 0) {
				if(speChrSet ==""){
					speChrSet = speChrSet + "* HB/L No. : " +  docObjects[0].GetCellValue(i, "hbl_no") + "\n";
					speChrSet = speChrSet + "Consignee Name : " + formObj.cnee_trdp_nm.value + "\n";
				}else {
					speChrSet = speChrSet + "Consignee Name : " + formObj.cnee_trdp_nm.value + "\n";
				}
			}
			
			
			speChr = replChar(formObj.cnee_trdp_addr.value,'Y','SI');
			if(speChr.length > 0) {
				if(speChrSet ==""){
					speChrSet = speChrSet + "* HB/L No. : " +  docObjects[0].GetCellValue(i, "hbl_no") + "\n";
					speChrSet = speChrSet + "Consignee Address : " + formObj.cnee_trdp_addr.value + "\n";
				}else {
					speChrSet = speChrSet + "Consignee Address : " + formObj.cnee_trdp_addr.value + "\n";
				}
				valMsgArr.push('Consignee ' + getLabel('EDI_COM_ALT292'));
			}
			
			
			speChr = replChar(formObj.ntfy_trdp_nm.value,'Y','SI');
			if(speChr.length > 0) {
				if(speChrSet ==""){
					speChrSet = speChrSet + "* HB/L No. : " +  docObjects[0].GetCellValue(i, "hbl_no") + "\n";
					speChrSet = speChrSet + "Notify Name : " + formObj.ntfy_trdp_nm.value + "\n";
				}else {
					speChrSet = speChrSet + "Notify Name : " + formObj.ntfy_trdp_nm.value + "\n";
				}
			}
			
			
			speChr = replChar(formObj.ntfy_trdp_addr.value,'Y','SI');
			if(speChr.length > 0) {
				if(speChrSet ==""){
					speChrSet = speChrSet + "* HB/L No. : " +  docObjects[0].GetCellValue(i, "hbl_no") + "\n";
					speChrSet = speChrSet + "Notify Address  : " + formObj.ntfy_trdp_addr.value + "\n";
				}else {
					speChrSet = speChrSet + "Notify Address  : " + formObj.ntfy_trdp_addr.value + "\n";
				}
				valMsgArr.push('Notify Party ' + getLabel('EDI_COM_ALT292'));
			}
			
			if(speChrSetResult.length>0){
				speChrSetResult = speChrSetResult + speChrSet + "\n";
			} else{
				speChrSetResult = speChrSet + "\n";
			}
			speChrSet = "";
		}
	//<====#4627 [JP Logistics] needed to add Validation for S/I EDI====>
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

function dataValidationByVndr(vndr, validationItem, validationValue){
	var msg = "";
	if("ENP" == vndr){
		if(validationItem == "MEASUREMENT"){
			if( validationValue * 1 == 0){
				msg = getLabel('EDI_COM_ALT054');
			} 
		}
	}
	return msg;
}

function VAL_MSG(rtnVal){
}
var rtnary;
var callBackFunc;

function submitForm(cmd){
	var formObj=document.frm1;
	doShowProcess();
	formObj.f_cmd.value=cmd;
	
	var sheetObj = docObjects[0];
	//var bkgSheetObj = docObjects[1];
	//bkgSheetObj.RemoveAll();
	
	$.ajax({
		   type: "POST",
		   url: "./EDI_CMM_0010AJ.clt",
		   dataType: 'xml',
		   data: $(formObj).serialize(),
		   //data: { f_cmd: cmd },
		   success: function(data){
			   setFieldValue( formObj.shpr_trdp_cd, $('shpr_trdp_cd',data).text());
			   setFieldValue( formObj.shpr_trdp_nm, $('shpr_trdp_nm',data).text());
			   setFieldValue( formObj.shpr_trdp_addr, $('shpr_trdp_addr',data).text());
			   setFieldValue( formObj.shpr_pic_nm, $('shpr_pic_nm',data).text());
			   setFieldValue( formObj.shpr_pic_phn, $('shpr_pic_phn',data).text());
			   setFieldValue( formObj.shpr_pic_fax, $('shpr_pic_fax',data).text());
			   setFieldValue( formObj.shpr_pic_eml, $('shpr_pic_eml',data).text());
		
			   setFieldValue( formObj.cnee_trdp_cd, $('cnee_trdp_cd',data).text());
			   setFieldValue( formObj.cnee_trdp_nm, $('cnee_trdp_nm',data).text());
			   setFieldValue( formObj.cnee_trdp_addr, $('cnee_trdp_addr',data).text());
			   setFieldValue( formObj.cnee_pic_nm, $('cnee_pic_nm',data).text());
			   setFieldValue( formObj.cnee_pic_phn, $('cnee_pic_phn',data).text());
			   setFieldValue( formObj.cnee_pic_fax, $('cnee_pic_fax',data).text());
			   setFieldValue( formObj.cnee_pic_eml, $('cnee_pic_eml',data).text());
			   
			   setFieldValue( formObj.ntfy_trdp_cd, $('ntfy_trdp_cd',data).text());
			   setFieldValue( formObj.ntfy_trdp_nm, $('ntfy_trdp_nm',data).text());
			   setFieldValue( formObj.ntfy_trdp_addr, $('ntfy_trdp_addr',data).text());
			   setFieldValue( formObj.ntfy_pic_nm, $('ntfy_pic_nm',data).text());
			   setFieldValue( formObj.ntfy_pic_phn, $('ntfy_pic_phn',data).text());
			   setFieldValue( formObj.ntfy_pic_fax, $('ntfy_pic_fax',data).text());
			   setFieldValue( formObj.ntfy_pic_eml, $('ntfy_pic_eml',data).text());
			   			                 
/*			   setFieldValue( formObj.carr_trdp_cd, $('carr_trdp_cd',data).text());
			   setFieldValue( formObj.carr_trdp_nm, $('carr_trdp_nm',data).text());
			   setFieldValue( formObj.carr_trdp_addr, $('carr_trdp_addr',data).text());
			   setFieldValue( formObj.carr_pic_nm, $('carr_pic_nm',data).text());
			   setFieldValue( formObj.carr_pic_phn, $('carr_pic_phn',data).text());
			   setFieldValue( formObj.carr_pic_fax, $('carr_pic_fax',data).text());
			   setFieldValue( formObj.carr_pic_eml, $('carr_pic_eml',data).text());*/
			   
			   setFieldValue( formObj.obl_tp_nm, $('obl_tp_nm',data).text());
			   setFieldValue( formObj.org_bl_qty, $('org_bl_qty',data).text());
			   setFieldValue( formObj.bl_frt_tp, $('bl_frt_tp',data).text());
			   setFieldValue( formObj.lnr_bkg_no, $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.hbl_cnt, $('hbl_cnt',data).text());
	   
			   setFieldValue( formObj.por_cd, $('por_cd',data).text());
			   setFieldValue( formObj.pol_cd, $('pol_cd',data).text());
			   setFieldValue( formObj.pod_cd, $('pod_cd',data).text());
			   setFieldValue( formObj.del_cd, $('del_cd',data).text());
			   setFieldValue( formObj.por_nm, $('por_nm',data).text());
			   setFieldValue( formObj.pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.del_nm, $('del_nm',data).text());
			   setFieldValue( formObj.un_por_cd, $('un_por_cd',data).text());
			   setFieldValue( formObj.un_pol_cd, $('un_pol_cd',data).text());
			   setFieldValue( formObj.un_pod_cd, $('un_pod_cd',data).text());
			   setFieldValue( formObj.un_del_cd, $('un_del_cd',data).text());

			   // radio check 값 설정 
			   var frtRadioVal = formObj.bl_frt_tp.value;
			   var blCheckVal = formObj.si_bl_tp.value;

			   if (frtRadioVal =="F"){
				   $('input:radio[name="bl_frt_tp_radio"]:input[value='+"bl_frt_tp_radio"+']').attr("checked", true);
			   } else {
				   $('input:radio[name="bl_frt_tp_radio"]:input[value='+"bl_frt_tp_radio"+']').attr("checked", true);
			   }
			   
			   if (blCheckVal == "S"){
				   $('#bl_tp_split').prop("checked", true);
			   } else if (blCheckVal == "C"){
				   $('#bl_tp_combine').prop("checked", true);
			   }
			   
			   var bkgNo = frm1.lnr_bkg_no.value;
			   var bkgNoArr = bkgNo.split('+');
			   var intRows=0;
			   if (bkgNoArr.length >1) {
				   $('#bl_split_cnt').hide();
				   $('#bl_tp_split').hide();
				   $('#bl_tp_split_lbl').hide();
				   $('#bl_tp_combine').show();
				   $('#bl_tp_combine_lbl').show();
				   $('#bl_tp_split').prop("checked", false);
				   $('#bl_tp_combine').prop("checked", true);
			   }else {
				   //$('#bl_split_cnt').show();
				   //$('#bl_tp_split').show();
				   //$('#bl_tp_split_lbl').show();
				   $('#bl_tp_combine').hide();
				   $('#bl_tp_combine_lbl').hide();
				   $('#bl_tp_combine').prop("checked", false);
			   }
			   
			   // cmd 가 MODIFY이면 sheet의 값을 update한다.
			   if (cmd == MODIFY){
				   var msg_sts = sheetObj.GetCellValue(sheetObj.GetSelectRow(),"msg_sts");
				   var si_sts = sheetObj.GetCellValue(sheetObj.GetSelectRow(),"si_sts");
				   if (msg_sts ==""){
					   sheetObj.SetCellValue(sheetObj.GetSelectRow(),"msg_sts_nm", "Saved");
					   
					   if (si_sts ==""){
						   sheetObj.SetCellValue(sheetObj.GetSelectRow(),"si_sts", "C");
					   } else {
						   sheetObj.SetCellValue(sheetObj.GetSelectRow(),"si_sts", "U");
					   }
				   } else {
					   sheetObj.SetCellValue(sheetObj.GetSelectRow(),"si_sts", "U");
				   }
			   } else if (cmd == SEARCH01){			   
			   }
			   for (var i = 0; i < bkgNoArr.length; i++) {
				   if(trim(bkgNoArr[i]) == ""){
					   break;
				   }
				   //intRows=bkgSheetObj.LastRow() + 1;
				   //bkgSheetObj.DataInsert(intRows);
				   //bkgSheetObj.SetCellValue(intRows, "lnr_bkg_no",bkgNoArr[i]);
			   }

			   if(frm1.si_sts.value){
				   setFieldValue( formObj.si_rmk, $('si_rmk',data).text());
				   
			   }
			   
			   
			   doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			  // alert("system error!");
		   }
		 });
	
}

function findSameCarrbkgNo(sheetObj,Row,Col,setValue){
	var selectedCarrBkgNo = sheetObj.GetCellValue(Row,"lnr_bkg_no");
	for(var i=1;i<sheetObj.LastRow() + 1;i++){
		if(i == Row){
			continue;
		}

		var carrBkgNo = sheetObj.GetCellValue(i,"lnr_bkg_no");
		if(selectedCarrBkgNo == carrBkgNo){
			if(selectedCarrBkgNo == ""){
				break;
			}
			 sheetObj.SetCellValue(i,"chk",setValue,0);
		}
	}
}

function countSameCarrbkgNo(sheetObj,Row,Col){
	var selectedCarrBkgNo = sheetObj.GetCellValue(Row,"lnr_bkg_no");
	var cnt = 1;
	var currCnt = 1;
	var combineBkg = selectedCarrBkgNo.split('+');
	
	for(var i=1;i<sheetObj.LastRow() + 1;i++){
		if(i == Row){
			currCnt = cnt;
			continue;
		}
		
		var carrBkgNo = sheetObj.GetCellValue(i,"lnr_bkg_no");
		if(selectedCarrBkgNo == carrBkgNo){
			if(selectedCarrBkgNo == ""){
				break;
			}
			cnt++;
		}
	}
	if (combineBkg.length>1) {
		$('#bl_tp_split').hide();
		$('#bl_tp_split_lbl').hide();	
		$('#bl_split_cnt').val("");
		$('#bl_split_cnt').hide();
		$('#bl_tp_split').prop("checked", false);
		
		//#1375 hskang
		if(!frm1.si_sts.value){
			$('#si_rmk').val("COMBINED BL " + selectedCarrBkgNo);
		}
	}else if (cnt>1){
		$('#bl_tp_split').show();
		$('#bl_tp_split_lbl').show();
		$('#bl_tp_combine').hide();
		$('#bl_tp_combine_lbl').hide();
		
		$('#bl_tp_split').prop("checked", true);
		$('#bl_split_cnt').val(currCnt + '/' + cnt);
		$('#bl_split_cnt').show();
		
		//#1375 hskang
		if(!frm1.si_sts.value){
			$('#si_rmk').val("THIS IS SPLIT BILL " + currCnt + " of " + cnt + " - Booking " +selectedCarrBkgNo);
		}
	} 
}

function getSiCmdtCheck(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
		//N 으로 설정되어 있다면 Html5버젼으로, 아니면 ActiveX버젼으로 설정한다.
		SI_CMDT_CHECK = doc[1]=="Y"?true:false;
		frm1.si_cmdt_check.value= doc[1];
		
		
		if (SI_CMDT_CHECK){
			$('#cmdtSheetDiv').show();
		} else {
			$('#cmdtSheetDiv').hide();
		}
	}
}
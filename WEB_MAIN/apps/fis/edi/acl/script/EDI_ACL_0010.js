
var rtnary=new Array(1);
var callBackFunc = "";
var firCalFlag = false;

var TODAY;
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDtEndPlus(document.frm1.f_rgst_strdt, 10, document.frm1.f_rgst_enddt, 10);
}

function doWork(srcName, valObj){
	//if(!btnGetVisible(srcName)){
		//return;
	//}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];

    var formObj=document.frm1;
    
    switch(srcName) {
	   case "DEFAULT":
		   formObj.f_cmd.value=-1;
	       formObj.submit();
	   break;
	   case "NEW":
	   		frm1.f_cmd.value=-1;
	    	frm1.submit();
       case "SEARCHLIST":
       	   sheetObj2.RemoveAll();
    	   formObj.f_cmd.value=SEARCHLIST;
    	   sheetObj.DoSearch("./EDI_ACL_0010GS.clt", FormQueryString(formObj) );
    	   break;
       case "SEARCHLIST01":
			formObj.f_cmd.value=SEARCHLIST01;
			sheetObj2.DoSearch("./EDI_ACL_0010_1GS.clt", FormQueryString(formObj) );
       break;
       case "DOCFILE":	//첨부파일
      		
   	   	var reqParam='?openMean=SEARCH01';
  	   		popGET('./EDI_ACL_0020.clt'+reqParam, 'seeShipDoc', 500, 200, "scroll:no;status:no;help:no;");
  	   		break;
       
       case "SAVE":
    	   	var chks=sheetObj.FindCheckedRow('acl_save_chk');
			if(chks == ''){
				alert(getLabel('FMS_COM_ALT007'));
				return false;
			}
			
		    formObj.f_cmd.value=COMMAND01;
		    if(confirm(getLabel('FMS_COM_CFMSAV'))){
		    	sheetObj.DoAllSave("./EDI_ACL_0010GS.clt", FormQueryString(formObj), true);
		    }
   		    break;
       case "POL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
      		rtnary=new Array(3);
     		rtnary[0]="S";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=frm1.f_pol_nm.value;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		rtnary[3]="";
	   		rtnary[4]=frm1.f_pol_cd;
	   		
	   		callBackFunc = "POL_LOCATION_POPLIST";
 	        modal_center_open('./CMM_POP_0030.clt',  rtnary, 806,440,"yes");
	       
		break;
       case "POD_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
      		rtnary=new Array(3);
     		rtnary[0]="S";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=frm1.f_pod_nm.value;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		rtnary[3]="";
	   		rtnary[4]=frm1.f_pod_cd;
	   		
	   		callBackFunc = "POD_LOCATION_POPLIST";
 	        modal_center_open('./CMM_POP_0030.clt',  rtnary, 806,440,"yes");
	       
		break;
       
       
       case "CARR_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
    	   rtnary=new Array(1);
    	   rtnary[0]="1";
  	 		
    	   if(typeof(valObj)!='undefined'){
    		   rtnary[1]=valObj;
    	   }else{
    		   rtnary[1]="";
    	   }
    	   rtnary[2]=window;
    	   callBackFunc = "CARR_TRDP_POPLIST";
    	   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650,"yes");
  	 		           
  	 	   break;
    }
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
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
    
	//doWork("SEARCHLIST");
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
	            SetConfig( { SearchMode:2, MergeSheet:8, Page:20, DataRowMerge:0, FrozenCol: 3} );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            
	            var headers = [ { Text:getLabel('EDI_ACL_0010_HDR1'), Align:"Center"} ];
	            InitHeaders(headers, info);
	            var cols = [ 
	                        {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"acl_save_chk",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0, Width:60,  Align:"Center",  ColMerge:0,   SaveName:"msg_tp_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bkg_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Combo",     Hidden:0, Width:70,  Align:"Center",    ColMerge:0,   SaveName:"bl_tp_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Popup",     Hidden:0, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bl_no",         	 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Image",     Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"view_bl",       	 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0, Width:70,  Align:"Center",    ColMerge:0,   SaveName:"mk_flg",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:70,  Align:"Center",    ColMerge:0,   SaveName:"gds_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"vsl_load_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:90,  Align:"Left",    ColMerge:0,   SaveName:"voy_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"shpr_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"cnee_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:240,  Align:"Left",    ColMerge:0,   SaveName:"crr_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:80,  Align:"Center",    ColMerge:0,   SaveName:"cntr_knt",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:80,  Align:"Center",    ColMerge:0,   SaveName:"ttl_pkg_knt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ttl_pkg_sts_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:90,  Align:"Left",    ColMerge:0,   SaveName:"ttl_wgt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:90,  Align:"Left",    ColMerge:0,   SaveName:"ttl_meas",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:90,  Align:"Center",    ColMerge:0,   SaveName:"acl_rgst_id",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Date",      Hidden:0, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"rgst_dt",      	 KeyField:0,   CalcLogic:"",   Format:"YmdHms",      PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Date",      Hidden:0, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"modi_tms",      	 KeyField:0,   CalcLogic:"",   Format:"YmdHms",      PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Date",      Hidden:0, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"rgst_tms",      	 KeyField:0,   CalcLogic:"",   Format:"YmdHms",      PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"msg_no" },
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"mk_no" },
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq" },
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"gds_desc" },
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ref_no" }
			                
			                ];
	             
	            InitColumns(cols);
	            SetEditable(1);
	            SetImageList(1,APP_PATH+"/web/img/button/btns_view.gif");
	            SetDataLinkMouse('view_bl',0);
	            SetColProperty('bl_tp_cd', {ComboText:'Master|House', ComboCode:'M|H'} );
	            SetSheetHeight(340);
		        SetHeaderRowHeight(20);
        	}                                                      
		break;
		
        case 2:      //IBSheet2 init
        	with (sheetObj) {
	     	 	SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
		        	 
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('EDI_ACL_0010_HDR2'), Align:"Center"} ];
		        InitHeaders(headers, info);

		        var cols = [
		                    {Type:"Seq",       Hidden:0,    Width:35,   Align:"Center",  ColMerge:0,   SaveName:"seq" },
		                    {Type:"Text",      Hidden:0,  	Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_no",		       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Text",      Hidden:0,  	Width:50,  Align:"Left",    ColMerge:0,   SaveName:"cntr_cd",          	   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Text",      Hidden:0,  	Width:80,  Align:"Left",    ColMerge:0,   SaveName:"seal_no1",		       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Text",      Hidden:0,  	Width:80,  Align:"Left",    ColMerge:0,   SaveName:"seal_no2",		       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Text",      Hidden:0,  	Width:80,  Align:"Center",  ColMerge:0,   SaveName:"pkg_knt",		       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Text",      Hidden:0,  	Width:80,  Align:"Left",    ColMerge:0,   SaveName:"pck_sts_nm",		   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Text",      Hidden:0,  	Width:90,  Align:"Left",    ColMerge:0,   SaveName:"cntr_wgt",		       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Text",      Hidden:0,  	Width:80,  Align:"Left",    ColMerge:0,   SaveName:"cntr_meas",		       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Text",      Hidden:0,  	Width:80,  Align:"Left",    ColMerge:0,   SaveName:"cntr_tare",		       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Text",      Hidden:0,  	Width:70,  Align:"Left",    ColMerge:0,   SaveName:"cntr_temp",		       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
		                    
		                    ];
	
	        	InitColumns(cols);
	        	SetEditable(1);
	        	SetSheetHeight(200);
	        	sheetObj.SetFocusAfterProcess(0);
	        }  
    	break;
    }
}

function sheet1_OnClick(sheetObj, Row, Col){
	var formObj=document.frm1;
	var colName=sheetObj.ColSaveName(Col);
	
	if(colName=="bkg_no"){
	
		formObj.msg_no.value 		= sheetObj.GetCellValue(Row, "msg_no");
		formObj.mk_no.value 		= sheetObj.GetCellValue(Row, "mk_no");
		formObj.gds_desc.value 		= sheetObj.GetCellValue(Row, "gds_desc");
		
		doWork('SEARCHLIST01');
	} 
}


function sheet1_OnMouseMove(sheetObj, Button, Shift, X, Y){
	var col=sheetObj.MouseCol();
    var row=sheetObj.MouseRow();
    var colName=sheetObj.ColSaveName(col);
    if(colName == "view_bl"){
   		sheetObj.SetMousePointer("Hand");
    }else{
    	sheetObj.SetMousePointer("Default");
    }
}


function sheet1_OnDblClick(sheetObj,Row,Col){	
	var colStr		=sheetObj.ColSaveName(Col);
	var blTp 	 	=sheetObj.GetCellValue(Row, "bl_tp_cd");
	var intgBlSeq  	=sheetObj.GetCellValue(Row, "intg_bl_seq");
	
	if(colStr=="bl_no"){
		if(blTp ==''){
			alert('please select B/L Type');
			return
		}else{
			if(blTp =='M'){
				gridPopCall(sheetObj,Row,Col,'mbl');
			}else{
				gridPopCall(sheetObj,Row,Col,'hbl');
			}
		}
	} 

	if(colStr == 'view_bl' && intgBlSeq !=''){
		if(blTp == 'M'){
			var formObj=document.frm1;
			doProcess=true;
			formObj.f_cmd.value="";
			var paramStr="./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST+'&f_ref_no='+escape(sheetObj.GetCellValue(Row, 'ref_no'))+"&f_intg_bl_seq="+sheetObj.GetCellValue(Row, "intg_bl_seq");
		   	parent.mkNewFrame('Master B/L Entry', paramStr, "SEE_BMD_0040_SHEET_" + sheetObj.GetCellValue(Row, 'ref_no')+"_"+sheetObj.GetCellValue(Row, "intg_bl_seq"));
		}else{
			var hblNo=sheetObj.GetCellValue(Row, 'bl_no');
			if(hblNo!=''){
			   	var paramStr="./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+escape(hblNo);
			   	parent.mkNewFrame('HB/L Entry', paramStr, "SEE_BMD_0020_SHEET_" + hblNo);
			}
		}
	}
}

function sheet1_OnSearchEnd(){
	for(var i=1; i<=docObjects[0].LastRow()+1; i++){
		if(docObjects[0].GetCellValue(i, "bl_no") == ""){
			docObjects[0].SetCellEditable(i, "acl_save_chk",0);
		}
	}	
}

function gridPopCall(sheetObj, rowIdx, colIdx, doWhat){
	cur_sheetObj = sheetObj;
	cur_rowIdx = rowIdx;
	cur_colIdx = colIdx;
	//Container탭 Container Inventory 조회
	if(doWhat=='hbl'){
		rtnary=new Array(1);
		rtnary[0]="S";//airSeaTp
		rtnary[1]="O";//bndTp;
		callBackFunc = "gridPopCall_hbl";
	    modal_center_open('./CMM_POP_0170.clt', rtnary, 818,468,"yes");
		
	//Container탭 Lessor조회
	}else if(doWhat=='mbl'){
		rtnary=new Array(1);
		rtnary[0]="S";//airSeaTp
		rtnary[1]="O";//bndTp;
		callBackFunc = "gridPopCall_mbl";
	    modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
	}
}

var cur_sheetObj;
var cur_rowIdx;

function gridPopCall_hbl(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		if(rtnValAry[0] !=''){
			cur_sheetObj.SetCellValue(cur_rowIdx, 'bl_no',rtnValAry[0]);		//bl_no
			cur_sheetObj.SetCellValue(cur_rowIdx, 'intg_bl_seq',rtnValAry[3]);	//intg_bl_seq
			cur_sheetObj.SetCellEditable(cur_rowIdx, "acl_save_chk",1);
		}
	}
}
function gridPopCall_mbl(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(rtnValAry[0] !=''){
			cur_sheetObj.SetCellValue(cur_rowIdx, 'bl_no',rtnValAry[0]);		//bl_no
			cur_sheetObj.SetCellValue(cur_rowIdx, 'intg_bl_seq',rtnValAry[1]);	//intg_bl_seq
			cur_sheetObj.SetCellEditable(cur_rowIdx, "acl_save_chk",1);
		}
	}
}

function sheet1_OnSaveEnd(sheet, errMsg){
	doWork('SEARCHLIST');
}

function entSearch(){
	if(event.keyCode == 13){
		doWork('SEARCHLIST')
	}
}

function getPageURL() {
	return document.getElementById("pageurl").value;
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
	if ( tmp == "onKeyDown" ) {
		if (event.keyCode == 13){
			CODETYPE=str;		
			var sub_str=str.substring(0,8);
			if(sub_str=="trdpCode"){
				s_type=sub_str;
			}else{
				s_type=str;
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
		}
	} else if ( tmp == "onBlur" ) {
		CODETYPE=str;		
		var sub_str=str.substring(0,8);
		if(sub_str=="trdpCode"){
			s_type=sub_str;
		}else{
			s_type=str;
		}
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
	}else if ( tmp == "onChange" ) {
		CODETYPE=str;
		var sub_str=str.substring(0,str.indexOf("_s"));
		s_type=sub_str;
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
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
			if(CODETYPE == "trdpCode"){
				formObj.f_lnr_trdp_cd.value=masterVals[0]; 
				formObj.f_lnr_trdp_nm.value=masterVals[3];
			}
		}else{
			if(CODETYPE == "trdpCode"){
				formObj.f_lnr_trdp_cd.value=""; 
				formObj.f_lnr_trdp_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

function CARR_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_lnr_trdp_cd.value=rtnValAry[0];
		formObj.f_lnr_trdp_nm.value=rtnValAry[2];
	}  
}

var cur_row = 0;
var cur_col = 0;

function sheet1_OnChange(sheetObj, Row, Col){
	switch (sheetObj.ColSaveName(Col)) {
		case "bl_tp_cd" :
			var codeStr =  sheetObj.GetCellValue(Row, Col);
			
			if(codeStr.length >= 0){
				sheetObj.SetCellValue(Row, 'bl_no', '', 0);
				sheetObj.SetCellValue(Row, 'intg_bl_seq', '', 0);
				sheetObj.SetCellValue(Row, 'acl_save_chk', '', 0);
				sheetObj.SetCellEditable(Row, "acl_save_chk",0);
			}
		break;
	}
}



function setUnPolLocCd(rtnVal){
	if (rtnVal == null) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "un_pol_cd",rtnValAry[9],0);
		docObjects[0].SetCellValue(cur_row, "pol_nm",rtnValAry[2],0);
	}
}

function setUnPodLocCd(rtnVal){
	if (rtnVal == null) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "un_pod_cd",rtnValAry[9],0);
		docObjects[0].SetCellValue(cur_row, "pod_nm",rtnValAry[2],0);
	}
}



function vslPopup(vslNm){
	if(vslNm == null){
		vslNm = ""
	}
	rtnary=new Array(1);
	rtnary[0]="1";
	rtnary[1]=vslNm;
    callBackFunc = "VSL_POP";
    modal_center_open('./CMM_POP_0140.clt', rtnary, 656,480,"yes");
}
        
function VSL_POP(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.f_trnk_vsl_cd.value=rtnValAry[0];
		frm1.f_trnk_vsl_nm.value=rtnValAry[1];
	}
}

/**
 * 파일 업로드 팝업에서 목록 Reload
 */
function reloadAclList(){
	doWork("SEARCHLIST");
}

/**
 * 화면에서 사용하는 메소드
 * 
 * @param doWhat
 * @param formObj
 * @return
 */
function doDisplay(doWhat, formObj) {
	switch (doWhat) {
	case 'DATE1': // 달력 조회 From ~ To 팝업 호출
		cal=new ComCalendarFromTo();
		cal.displayType = "date";
		cal.select(formObj.f_rgst_strdt, formObj.f_rgst_enddt, 'MM-dd-yyyy');
		break;
	}
}

function POL_LOCATION_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var formObj  = document.frm1;
		var rtnValAry=rtnVal.split("|");
		formObj.f_pol_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pol_nm.value=rtnValAry[2];//loc_nm
	} 
}
function POD_LOCATION_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var formObj  = document.frm1;
		var rtnValAry=rtnVal.split("|");
		formObj.f_pod_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pod_nm.value=rtnValAry[2];//loc_nm
	} 
}

var CODETYPE = '';
/**
 * code name select
 */
function codeNameAction_OEH(str, obj, tmp) {
	
	var formObj = document.frm1;
	
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if (obj == '[object]' || obj =='[object HTMLInputElement]') {
		var s_code = obj.value.toUpperCase();
	} else {
		var s_code = obj;
	}
	var s_type = "";
	// if ( s_code != "" ) {
	if (tmp == "onKeyDown") {
		if (event.keyCode == 13) {
			CODETYPE = str;
			var sub_str = str.substring(0, 8);
			if (sub_str == "location") {
				s_type = sub_str;
			} else if (sub_str == "trdpCode") {
				s_type = sub_str;
			} else {
				s_type = str;
			}
			ajaxSendPost(dispCodeNameAjaxReq_OEH, 'reqVal',
					'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
							+ '&s_code=' + s_code, './GateServlet.gsl');
		}
	} else if (tmp == "onBlur") {
		// if ( s_code != "" ) {
		CODETYPE = str;
		var sub_str = str.substring(0, 8);
		if (sub_str == "location") {
			s_type = sub_str;
		} else if (sub_str == "trdpCode") {
			s_type = sub_str;
		} else {
			s_type = str;
		}
		ajaxSendPost(dispCodeNameAjaxReq_OEH, 'reqVal',
				'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
						+ '&s_code=' + s_code, './GateServlet.gsl');
		// }
	} else if (tmp == "onChange") {
		// if ( s_code != "" ) {
		CODETYPE = str;
		var sub_str = str.substring(0, str.indexOf("_s"));
		s_type = sub_str;
		ajaxSendPost(dispCodeNameAjaxReq_OEH, 'reqVal',
				'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
						+ '&s_code=' + s_code, './GateServlet.gsl');
		// }
	}
	// }
	
	if(s_code == ""){
		if(str == "location_pol"){
			formObj.f_pol_cd.value = "";
			formObj.f_pol_nm.value = "";
		}else if(str == "location_pod"){
			formObj.f_pod_cd.value = "";
			formObj.f_pod_nm.value = "";
		}else if(str == "location_del"){
			formObj.f_del_cd.value = "";
			formObj.f_del_nm.value = "";
		}else if(str == "location_por"){
			formObj.f_por_cd.value = "";
			formObj.f_por_nm.value = "";
		}
	}
}
// 코드표시 Ajax
function dispCodeNameAjaxReq_OEH(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	var targetFr = 'mainFrame';
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) != 'undefined') {
			// 조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			var masterVals = rtnArr[0].split('@@^');
			if (CODETYPE == "location_pol") {
				formObj.f_pol_cd.value = masterVals[0];
				formObj.f_pol_nm.value = masterVals[3];
			} else if (CODETYPE == "location_pod") {
				formObj.f_pod_cd.value = masterVals[0];
				formObj.f_pod_nm.value = masterVals[3];
			} else if (CODETYPE == "location_del") {
				formObj.f_del_cd.value = masterVals[0];
				formObj.f_del_nm.value = masterVals[3];
			} else if (CODETYPE == "trdpCode") {
				formObj.s_trdp_cd.value = masterVals[0];
				formObj.s_trdp_full_nm.value = masterVals[3];// loc_nm
			} else if (CODETYPE == "location_por") {
				formObj.f_por_cd.value = masterVals[0];
				formObj.f_por_nm.value = masterVals[3];
			}
		} else {
			if (CODETYPE == "location_pol") {
				formObj.f_pol_cd.value = "";
				formObj.f_pol_nm.value = "";
			} else if (CODETYPE == "location_pod") {
				formObj.f_pod_cd.value = "";
				formObj.f_pod_nm.value = "";
			} else if (CODETYPE == "location_del") {
				formObj.f_del_cd.value = "";
				formObj.f_del_nm.value = "";
			} else if (CODETYPE == "trdpCode") {
				formObj.s_trdp_cd.value = "";
				formObj.s_trdp_full_nm.value = "";
			} else if (CODETYPE == "location_por") {
				formObj.f_por_cd.value = "";
				formObj.f_por_nm.value = "";
			}
		}
	} else {
		// alert(getLabel('SEE_BMD_MSG43'));
	}
}
function vslPopup(vslNm){
	if(vslNm == null){
		vslNm = ""
	}
	rtnary=new Array(1);
	rtnary[0]="1";
	rtnary[1]=vslNm;
    callBackFunc = "VSL_POP";
    modal_center_open('./CMM_POP_0140.clt', rtnary, 656,480,"yes");
	
}
function VSL_POP(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.f_trnk_vsl_cd.value=rtnValAry[0];
		frm1.f_trnk_vsl_nm.value=rtnValAry[1];
	}
}

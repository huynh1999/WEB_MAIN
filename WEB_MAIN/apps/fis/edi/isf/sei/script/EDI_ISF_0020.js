var rtnary=new Array(1);
var callBackFunc = "";
var firCalFlag = false;
var TODAY;
/**
* 화면로드 후 초기값 세팅
*/
function initFinish(){
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDtEndPlus(document.frm1.f_etd_strdt, 10, document.frm1.f_etd_enddt, 10);
	setFromToDtEndPlus(document.frm1.f_eta_strdt, 10, document.frm1.f_eta_enddt, 10);
}

function doWork(srcName, valObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj  = docObjects[0];
   // var sheetObj2  = docObjects[1];
    
    var formObj   = document.frm1;

    switch(srcName) {
    
	   case "DEFAULT":
		    formObj.f_cmd.value = -1;
	        formObj.submit();
	        
	   break;
       
       case "SEARCHLIST":
    	   //sheetObj2.RemoveAll();
    	   formObj.f_cmd.value=SEARCHLIST;
    	   sheetObj.DoSearch("./EDI_ISF_0020GS.clt", FormQueryString(formObj) );
       break;
       
       case "SEARCHLIST01":
           formObj.f_cmd.value = SEARCHLIST01;

           sheetObj2.DoSearch("./EDI_ISF_0020_1GS.clt", FormQueryString(formObj));
       break;
       
       case "EXCEL":
    	   sheetObj2.speedDown2Excel(true);
       break;
       case "IMPORTER_POPLIST":
			
    	   	rtnary=new Array(1);
	       	rtnary[0]="1";
	       	rtnary[1]="";
	       	rtnary[2]=window;
	       	//var cstmTpCd = 'CS';
	       	var cstmTpCd='';
	       	
	       	callBackFunc = "IMPORTER_POPLIST";
	       	modal_center_open('./CMM_POP_0010.clt?callTp=' + cstmTpCd, rtnary, 1150,650,"yes");
    		
        break;
       case "CONSIGNEE_POPLIST":
			
    	   	rtnary=new Array(1);
	       	rtnary[0]="1";
	       	rtnary[1]="";
	       	rtnary[2]=window;
	       	//var cstmTpCd = 'CS';
	       	var cstmTpCd='';
	       	
	       	callBackFunc = "CONSIGNEE_POPLIST";
	       	modal_center_open('./CMM_POP_0010.clt?callTp=' + cstmTpCd, rtnary, 1150,650,"yes");
    		
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
   docObjects[sheetCnt++] = sheet_obj;
}

/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
         
	    case 1:      //IBSheet2 init
	
		    with (sheetObj) {
	    	
		    	SetConfig( { SearchMode:2, MergeSheet:8, Page:20, DataRowMerge:0, FrozenCol: 3} );
		    	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            
	            var headers = [{ Text:getLabel('EDI_ISF_0020_HDR2'), Align:"Center"}];
	            InitHeaders(headers, info);
	              
	            var cols = [ 
	                        {Type:"seq",       Hidden:0, Width:60,  Align:"Center",  ColMerge:0,   SaveName:"seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"hbl_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"mbl_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:100,  Align:"Center",    ColMerge:0,   SaveName:"hbl_tp",         	 KeyField:0,   CalcLogic:"",   Format:"",           PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:100,  Align:"Center",    ColMerge:0,   SaveName:"isf_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:70,  Align:"Center",    ColMerge:0,   SaveName:"msg_sts",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:70,  Align:"Center",    ColMerge:0,   SaveName:"isf_tp",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:120,  Align:"Center",    ColMerge:0,   SaveName:"isf_trac_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"im_entt_name",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:70,  Align:"Center",    ColMerge:0,   SaveName:"etd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:70,  Align:"Center",    ColMerge:0,   SaveName:"eta",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:180,  Align:"Left",    ColMerge:0,   SaveName:"pol",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:180,  Align:"Left",    ColMerge:0,   SaveName:"pod",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:180,  Align:"Left",    ColMerge:0,   SaveName:"del",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:180,  Align:"Left",    ColMerge:0,   SaveName:"carr",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"voy",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"intg_bl_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
			                ];
	             
	            InitColumns(cols);
	            SetEditable(1);
	            SetSheetHeight(540);
		        SetHeaderRowHeight(20);
	    } 
		break;
		
	    case 2:      //IBSheet2 init
		
	    with (sheetObj) {
	       	 
	    	SetConfig( { SearchMode:2, MergeSheet:8, Page:20, DataRowMerge:0, FrozenCol: 3} );
	    	
            var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
            
            var headers = [ { Text:'Status|Transaction No|Transaction Date|ISF No|ISF Type|HB/L No|POL|ETD|POD|ETA|DEL|Importer|Selling Party|Buying Party|Consignee', Align:"Center"} ];
            
            InitHeaders(headers, info);
            
            var cols = [ 
                        {Type:"seq",      Hidden:0, Width:60,  Align:"Center",  ColMerge:0,   SaveName:"msg_status",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:0, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"isf_trac_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",     Hidden:0, Width:70,  Align:"Center",    ColMerge:0,   SaveName:"acr_dt",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",     Hidden:0, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"isf_no",         	 KeyField:0,   CalcLogic:"",   Format:"",           PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:0, Width:70,  Align:"Center",    ColMerge:0,   SaveName:"isf_tp",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:0, Width:70,  Align:"Center",    ColMerge:0,   SaveName:"isf_bl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"isf_pol_name",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:0, Width:90,  Align:"Left",    ColMerge:0,   SaveName:"isf_etd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"isf_pod_name",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"isf_eta",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"isf_imp_name",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"isf_s_entt_name",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"isf_b_entt_name",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"isf_c_entt_name",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"intg_bl_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
		                ];
             
            InitColumns(cols);
            SetEditable(1);
            SetSheetHeight(340);
	        SetHeaderRowHeight(20);
	    	
		    } 
			break;
         
     }
}



 /**
  * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
  * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
  */
function sheet1_OnDblClick(sheetObj,Row,Col){	
	var colStr = sheetObj.ColSaveName(Col);
	var formObj  = document.frm1;
	formObj.f_cmd.value = "-1";
	var hblNo = sheetObj.GetCellValue(Row, "hbl_no");  
	var intgBlNo = sheetObj.GetCellValue(Row, "intg_bl_seq");
	var isfNo = sheetObj.GetCellValue(Row, "isf_no");  
	
	if(isfNo !=''){
		var paramStr = "./EDI_ISF_0010.clt?f_cmd=-1"
			+"&f_isf_no_ret="+isfNo
			parent.mkNewFrame('ISF EDI (Ocean)', paramStr, "EDI_ISF_0010_SHEET_" + isfNo);
	}else{
		var paramStr = "./EDI_ISF_0010.clt?f_cmd="
			+"&hbl_no="+hblNo
			+"&intg_bl_seq="+intgBlNo;
			parent.mkNewFrame('ISF EDI (Ocean)', paramStr, "EDI_ISF_0010_SHEET_" + hblNo+"_"+intgBlNo);
	}
}

function sheet2_OnDblClick(sheetObj,Row,Col){	
	var colStr = sheetObj.ColSaveName(Col);
	var formObj  = document.frm1;
	formObj.f_cmd.value = "";
	var isfNo = sheetObj.GetCellValue(Row, "isf_no");  
	var paramStr = "./EDI_ISF_0010.clt?f_cmd="
	parent.mkNewFrame('ISF EDI (Ocean)', paramStr, "EDI_ISF_0010_SHEET_" + isfNo);
	
}
  
function sheet1_OnSearchEnd(){
	//doWork("SEARCHLIST01");
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
    		cal=new ComCalendarFromTo();
    		cal.displayType = "date";
    		cal.select(formObj.f_etd_strdt, formObj.f_etd_enddt, 'MM-dd-yyyy');
        break;
	    case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
    		cal=new ComCalendarFromTo();
    		cal.displayType = "date";
    		cal.select(formObj.f_eta_strdt, formObj.f_eta_enddt, 'MM-dd-yyyy');
        break;
    }
}


function openPopUpEdi(srcName, curObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.frm1;
    alert(srcName)
	try {
		switch(srcName) {
		
			case "HBL_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
	        
				rtnary = new Array(1);
		   		
		   		rtnary[0] = "S";
		   		rtnary[1] = "I";
	
	   	        var rtnVal = window.showModalDialog('./CMM_POP_0170.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
	   	       
	   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
				
					var rtnValAry = rtnVal.split("|");
	
					formObj.f_hbl_no.value = rtnValAry[0];//house_bl_no
				}
				 
		    break;
		    
			case "MBL_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
	        
				rtnary = new Array(1);
				rtnary[0] = "S"; //S = 해운에서 오픈, A = 항공에서 오픈
				rtnary[1] = "I"; //I: In-bound, O: Out-bound
				
		    	var rtnVal = window.showModalDialog('./CMM_POP_0180.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
		    	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		    		return;
				}else{
					var rtnValAry = rtnVal.split("|");
					formObj.f_mbl_no.value = rtnValAry[0];//mbl_no
				}
			 
		    break;
		    
			case "IMPORTER_POPLIST":
				
		   		rtnary = new Array(1);
		   		
		   		rtnary[0] = "1";
		   		rtnary[1] = formObj.f_im_entt_name.value;
		   		rtnary[2] = window;
		   		
	   	        var rtnVal = window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
	   	        
	   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					return;
				}else{
				
					var rtnValAry = rtnVal.split("|");
		
					formObj.f_im_entt_cd.value = rtnValAry[0];//trdp_cd
					formObj.f_im_entt_name.value = rtnValAry[2];//eng_nm
				}
	         break; 
	         
			case "CONSIGNEE_POPLIST":
				
		   		rtnary = new Array(1);
		   		
		   		rtnary[0] = "1";
		   		rtnary[1] = formObj.f_cnee_nm.value;
		   		rtnary[2] = window;
		   		
	   	        var rtnVal = window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
	   	        
	   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					return;
				}else{
				
					var rtnValAry = rtnVal.split("|");
		
					formObj.f_cnee_cd.value = rtnValAry[0];//trdp_cd
					formObj.f_cnee_nm.value = rtnValAry[2];//eng_nm
				}
	         break; 
    	   
        } // end switch
	}catch(e) {
		if( e == "[object Error]") {
			showErrMessage(AJ_CMM_ERR);
		} else {
			showErrMessage(e);
		}
	}
}

var CODETYPE = '';
/**
 * code name select
 */
function codeNameActionEdi(str, obj, tmp){
	var s_code = obj.value.toUpperCase();		
	var s_type = "";
	
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE =str;		
				var sub_str = str.substring(0,8);

				if(sub_str=="trdpCode"){
					s_type = sub_str;
					ajaxSendPost(trdpCdReqEdi,      'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
				
			}
		} else if ( tmp == "onBlur" ) {
				CODETYPE =str;		
				var sub_str = str.substring(0,8);
				
				if(sub_str=="trdpCode"){
					s_type = sub_str;
					ajaxSendPost(trdpCdReqEdi,      'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');

				}
		}
}


/**
* Trade Partner 관린 코드조회
*/
function trdpCdReqEdi(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	if(doc[0]=='OK'){

		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			
			var masterVals = rtnArr[0].split('@@^');	
			if(CODETYPE =="trdpCode_importer"){
				formObj.f_im_entt_cd.value = masterVals[0];	//trdp_cd  AS param1
				formObj.f_im_entt_name.value   = masterVals[3];		//eng_nm   AS param2
			}else if(CODETYPE =="trdpCode_consignee"){
				formObj.f_cnee_cd.value = masterVals[0];	//trdp_cd  AS param1
				formObj.f_cnee_nm.value = masterVals[3];		//eng_nm   AS param2
			}
		}else{
			if(CODETYPE =="trdpCode_importer"){
				formObj.f_im_entt_cd.value = "";//trdp_cd  AS param1
				formObj.f_im_entt_name.value = "";//eng_nm   AS param2
				
			}else if(CODETYPE =="trdpCode_consignee"){
				formObj.f_cnee_cd.value = "";//trdp_cd  AS param1
				formObj.f_cnee_nm.value = "";//eng_nm   AS param2
			}
		}
	}
}


function getPageURL() {
	return document.getElementById("pageurl").value;
}

function IMPORTER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.f_im_entt_cd.value=rtnValAry[0];
		formObj.f_im_entt_name.value=rtnValAry[2];// loc_nm
	}
}

function CONSIGNEE_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.f_cnee_cd.value=rtnValAry[0];
		formObj.f_cnee_nm.value=rtnValAry[2];// loc_nm
	}
}

/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	setFromToDt(document.frm1.etd_strdt, document.frm1.etd_enddt);
}

var rtnary = new Array(1);
function doWork(srcName){

    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.frm1;
    var sheetObj1 = docObjects[0];
    
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
                   //디버깅
                   // alert("FormQueryString(formObj)==>"+FormQueryString(formObj));
                   // alert(sheetObj.GetSearchXml("searchProgram.clt", FormQueryString(formObj)));
                
			    if(validateForm(sheetObj1, formObj, SEARCHLIST, 1)){
			   		formObj.f_cmd.value = SEARCHLIST;
			    	sheetObj1.DoSearch4Post("./SEE_BMD_0080GS.clt", FormQueryString(formObj));
			    }
			    
    	   	break;
  	       	
           	case "NEW":
           	   	var paramStr = "./SEE_BMD_0030.clt?f_cmd=-1";
           	   	parent.mkNewFrame('Shipping Request List(Korea)', paramStr);
           	break;
           	
           	case "POL_LOCATION_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
           		rtnary = new Array(1);
          		rtnary[0] = "SEA";
		   		rtnary[1] = "BL";
		   		
    	        var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry = rtnVal.split("|");
					formObj.f_pol_cd.value = rtnValAry[0];//loc_cd 
					formObj.f_pol_name.value = rtnValAry[2];//loc_cd 
				} 
			break;
			case "POD_LOCATION_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
           		rtnary = new Array(1);
          		rtnary[0] = "SEA";
		   		rtnary[1] = "BL";
    	        var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
    	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry = rtnVal.split("|");
					formObj.f_pod_cd.value = rtnValAry[0];//loc_cd 
					formObj.f_pod_name.value = rtnValAry[2];//loc_cd 
				} 
			break;
	   	 	case "PARTNER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
		   		rtnary = new Array(1);
		   		rtnary[0] = "1";
		   		rtnary[1] = "";
		   		rtnary[2] = window;
		   		
	   	        var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp=LN', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
	   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				 	return;
				}else{
					var rtnValAry = rtnVal.split("|");
					formObj.f_lnr_nm.value = rtnValAry[2];//full_nm
					//rtnValAry[3];//pic_nm
					//rtnValAry[4];//pic_phn
					//rtnValAry[5];//pic_fax
					//rtnValAry[6];//pic_eml
					//rtnValAry[7];//pic_desc  	   
				}      	        
   	        
          	break;
        
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: SEE_BMD_0080.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SEE_BMD_0080.002"); 
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
            var cal = new calendarPopupFromTo();
            cal.displayType = "date";
            cal.select(formObj.etd_strdt, 'etd_strdt', formObj.etd_enddt, 'etd_enddt', 'yyyy-MM-dd');
        break;
        
        case 'DATE2':   //달력 조회 팝업 호출      
             var cal = new calendarPopup();
             cal.select(formObj.f_bkg_dt_tm, 's_bkg_dt_tm', 'yyyy-MM-dd');
        break;
             
    }
}


/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value = callPage;
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
var docObjects = new Array();
var sheetCnt = 0;

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj  = document.frm1;
	var s_ofc_cd = formObj.f_ofc_cd.value;
	if(s_ofc_cd != ""){
		formObj.ofc_cd.value = s_ofc_cd;
	}
	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    //사용자가 저장한 Header 정보를 읽어온다.
    var formObj = document.frm1;
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false);
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
		case 1:      //IBSheet1 init
		
		    with (sheetObj) {
		        // 높이 설정
		        style.height = 410;
		        
		        //전체 너비 설정
		        SheetWidth = mainTable.clientWidth;
		       // SheetWidth = 400;
		
		        //Host정보 설정[필수][HostIp, Port, PagePath]
		        if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
		
		        //전체Merge 종류 [선택, Default msNone]
		        MergeSheet = msHeaderOnly;
		
		       //전체Edit 허용 여부 [선택, Default false]
		        Editable = true;
		
		        //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
		        InitRowInfo( 1, 1, 9, 100);
				
				//컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
		        InitColumnInfo(17, 0, 0, true);
		
		        // 해더에서 처리할 수 있는 각종 기능을 설정한다
		        InitHeadMode(true, true, true, true, false,false) ;
		
		       // var HeadTitle = "No.|SR No.|MBL No.|Liner|Liner|Vessel Voage|Vessel Voage|POR|POL|POD|DEL|ETD|ETA" ;
		
		        //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
		        InitHeadRow(0, getLabel('SEE_BMD_HDR17'), true);
		
		        //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		        InitDataProperty(0, 0,  dtData,        40,   daCenter,  false,    "no"	,   	   false,      "",       dfNone,       0,     false,      true);
		        InitDataProperty(0, 1,  dtData,    	   90,   daLeft,    false,    "sr_no",   	   false,      "",       dfNone,        0,     false,      true);
		        InitDataProperty(0, 2,  dtData,    	  110,   daLeft,    false,    "bl_no",   	   false,      "",       dfNone,        0,     false,      true);
				
		        InitDataProperty(0, 3,  dtHidden,      80,   daCenter,  true,     "liner_trdp_cd", false,      "",       dfNone,        0,     false,      true);
				InitDataProperty(0, 4,  dtData,       120,   daLeft,  	true,     "liner_trdp_nm", false,      "",       dfNone,  		0,     false,      true);
				
				InitDataProperty(0, 5,  dtHidden,      80,   daCenter,  true,     "vsl_cd",  	   false,      "",       dfNone,        0,     false,       true);
		        InitDataProperty(0, 6,  dtData,       120,   daLeft,  	true,     "vsl_nm",  	   false,      "",       dfNone,        0,     false,       true);
		        
		        InitDataProperty(0, 7,  dtHidden,     120,   daLeft,  	false,    "por_nm",        false,      "",       dfNone,        0,     false,       true);
		        InitDataProperty(0, 8,  dtData,       120,   daLeft,  	false,    "pol_nm",        false,      "",       dfNone,        0,     false,       true);
		        InitDataProperty(0, 9,  dtData,       120,   daLeft,  	false,    "pod_nm",        false,      "",       dfNone,        0,     false,       true);
		        InitDataProperty(0,10,  dtHidden,    120,   daLeft,  	false,    "del_nm",        false,      "",       dfNone,        0,     false,       true);
		        
		        InitDataProperty(0,11,  dtData,        65,   daCenter,  false,    "etd_dt_tm",     false,      "",       dfDateYmd,     0,     false,       true);
		        InitDataProperty(0,12,  dtData,        65,   daCenter,  false,    "eta_dt_tm",     false,      "",       dfDateYmd,     0,     false,       true);
		        
		        InitDataProperty(0,13,  dtData,        80,   daLeft,    false,    "proc_dpt_nm",    	false,      "",       dfNone,      0);
		        InitDataProperty(0,14,  dtData,        80,   daLeft,    false,    "proc_usr_nm",    	false,      "",       dfNone,      0);

		        InitDataProperty(0,15,  dtHidden,       0,   daCenter,  false,    "intg_bl_seq",   false,      "",       dfNone,      	0,     false,       true);
		        InitDataProperty(0,16,  dtHidden,       0,   daCenter,  false,    "Indexing",  	   false,      "",       dfNone,      	0,     false,       true);
		        
		    	ActionMenu = "Column Hidden|-|Header Setting Save|Header Setting Reset";
		   }                                                      
		break;
    }
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){	
	var formObj  = document.frm1;
   	var paramStr = "./SEE_BMD_0030.clt?f_cmd="+SEARCHLIST;
   	paramStr+= '&f_bl_no='+sheetObj.GetCellValue(Row, 'bl_no');
   	paramStr+= '&f_sr_no='+sheetObj.GetCellValue(Row, 'sr_no');
   	
   	parent.mkNewFrame('Shipping Request', paramStr);

}
var CODETYPE = '';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code = obj.value.toUpperCase();
	}else{
		var s_code = obj;
	}		
	var s_type = "";
	
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE =str;		
				var sub_str = str.substring(0,8);
				
				if(sub_str=="location"){
					s_type = sub_str;
				}else if(sub_str=="trdpCode"){
					s_type = sub_str;
				}else{
					s_type = str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE =str;		
				var sub_str = str.substring(0,8);
				
				if(sub_str=="location"){
					s_type = sub_str;
				}else if(sub_str=="trdpCode"){
					s_type = sub_str;
				}else{
					s_type = str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}else if ( tmp == "onChange" ) {
			if ( s_code != "" ) {
				CODETYPE =str;

				var sub_str = str.substring(0,str.indexOf("_s"));
				
				s_type = sub_str;
				
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}
}

//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	var formObj  = document.frm1;
	
	var sheetObj = docObjects[0];
	
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			
			var masterVals = rtnArr[0].split('@@^');	
			
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value = masterVals[0];
				formObj.f_pol_name.value = masterVals[3];
				
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value = masterVals[0];
				formObj.f_pod_name.value = masterVals[3];
				
			}else if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value  = masterVals[0]; 
				formObj.f_trdp_full_nm.value  = masterVals[3];//loc_nm
				
			}
			
		}else{
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value = "";
				formObj.f_pol_name.value = "";
				
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value = "";
				formObj.f_pod_name.value = "";
				
			}else if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value  = ""; 
				formObj.f_trdp_full_nm.value  = "";
				
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
}

function getPageURL() {
	return document.getElementById("pageurl").value;
}

function sheet1_OnSelectMenu(sheetObj, MenuString){
	
	var formObj = document.frm1;
	
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
			var col = sheetObj.MouseCol;
			if(sheetObj.ColSaveName(col)==""){
				alert(CM_MSG6);
				return false;
			}
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}

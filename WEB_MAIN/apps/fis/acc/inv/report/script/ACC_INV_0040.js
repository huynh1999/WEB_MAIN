function doWork(srcName){
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj = docObjects[0];
	var formObj	= document.frm1;

	switch(srcName) {
		case "SEARCHLIST":
			sheetObj.RemoveAll();
			//sheetObj.ShowDebugMsg = true;
			formObj.f_cmd.value = SEARCHLIST;
			
			sheetObj.DoSearch4Post("ACC_INV_0040GS.clt", FormQueryString(formObj));
			//sheetObj.ShowDebugMsg = false;
			getObj('excel').style.display = 'inline';
		break;
		
		case "NEW":
			// form reset
			formObj.reset();
			
			// sheet clear
			sheetObj.RemoveAll();
		break;
		
		case "EXCEL":
			sheetObj.SpeedDown2Excel(true);
		break;
		
		case "PRINT":
			var param = "type_cd=" + formObj.type_cd.value;
			param += "&dept_cd=" + formObj.dept_cd.value;
			param += "&sell_buy_cd=" + formObj.sell_buy_cd.value;
			param += "&curr_cd=" + formObj.curr_cd.value;
			param += "&trdp_cd=" + formObj.trdp_cd.value;
			
			if(formObj.period_cd.value=="wk"){
				param += "&cmd_type=5";
			}else if(formObj.period_cd.value=="month"){
				param += "&cmd_type=27";
			}else if(formObj.period_cd.value=="qq"){
				param += "&cmd_type=28";
			}else if(formObj.period_cd.value=="yyyy"){
				param += "&cmd_type=29";
			}else{
				//error
			}
			param += "&title=Partner Balance";

			popGET('RPT_PRN_0050.clt?'+param, '', 1025, 740, "scroll:yes;status:no;help:no;");
		break;
		case "PARTNER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
			   
   			var rtnary = new Array(1);
   		
			rtnary[0] = "1";
			rtnary[0] = "CS";
			rtnary[2] = window;
			
  	        var rtnVal = window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
  	        //window.open ('./CMM_POP_0010.clt', "list", "scrollbars=no,fullscreen=no,width=1024,height=480");
  	        
  	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
		
				var rtnValAry = rtnVal.split("|");
	
				formObj.trdp_cd.value = rtnValAry[0];//trdp_cd
				formObj.trdp_nm.value = rtnValAry[2];//full_nm
			}       
		break;

	}
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
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    //doWork('SEARCHLIST');
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
	var cnt = 0;
    switch(sheetNo) {
         case 1:      //IBSheet1 init

            with (sheetObj) {
                // 높이 설정
               style.height = 350;
                
                //전체 너비 설정
                SheetWidth = mainTable.clientWidth;
               // SheetWidth = 400;

                //Host정보 설정[필수][HostIp, Port, PagePath]
                if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);

                //전체Merge 종류 [선택, Default msNone]
                //MergeSheet = msPrevColumnMerge;
                MergeSheet = msHeaderOnly;

               //전체Edit 허용 여부 [선택, Default false]
                Editable = true;

                //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
                InitRowInfo( 1, 1, 9, 100);

                //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
                InitColumnInfo(14, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;
                
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('ACC_INV_0040_HDR1'), true);
                

                //데이터속성    [ROW,   COL,   DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
				InitDataProperty(0,cnt++,  dtHiddenStatus,30,  daCenter,  true,    "ibflag");
				InitDataProperty(0,cnt++,  dtData,   	  30,  daCenter,  true,    "no",			false,   "",       dfNone,      0,     false,     false,	2);
				InitDataProperty(0,cnt++,  dtData,		  50,  daLeft,    false,   "trdp_cd",		false,   "",       dfNone,      0,     false,      true,		10);
				InitDataProperty(0,cnt++,  dtData,		 120,  daLeft,    false,   "locl_nm",		false,   "",       dfNone,      0,     false,      false,		10);
				InitDataProperty(0,cnt++,  dtData,        80,  daLeft,    false,   "ofc_cd",		false,   "",       dfNone,	   0,     true,      true,		3);
				InitDataProperty(0,cnt++,  dtData,       100,  daLeft,    false,   "dept_cd",		false,   "",       dfNone,	   0,     true,      true,		3);
				InitDataProperty(0,cnt++,  dtData,        50,  daLeft,    true,    "inv_aply_curr_cd",false,"",      dfNone,	   0,     true,      true,		3);
				InitDataProperty(0,cnt++,  dtData,		 100,  daRight,   true,    "total",			false,   "",       dfFloat,     2,     false,      false,		10);
				InitDataProperty(0,cnt++,  dtData,		 100,  daRight,   true,    "n1st",			false,   "",       dfFloat,     2,     true,      true,		3);
				InitDataProperty(0,cnt++,  dtData,	     100,  daRight,   true,    "n2nd",			false,   "",       dfFloat,     2,     false,      true,		10);
				InitDataProperty(0,cnt++,  dtData,		 100,  daRight,   true,    "n3rd",			false,   "",       dfFloat,     2,     false,      false,		10);
				InitDataProperty(0,cnt++,  dtData,		 100,  daRight,   true,    "n4th",			false,   "",       dfFloat,     2,     false,      false,		10);
				InitDataProperty(0,cnt++,  dtData,		  80,  daLeft,    false,   "locl_usr_nm",	false,   "",       dfNone,      0,     false,      true,		10);                
				InitDataProperty(0,cnt++,  dtData,		 120,  daLeft,    false,   "eng_usr_nm",	false,   "",       dfNone,      0,     false,      false,		10);                
				
				
           }                                                      
           break;
     }
}


function sheet1_OnSearchEnd(sheetObj, errMsg) {
	var formObj = document.frm1;
	var rowcount = sheetObj.rowCount;

	sheetObj.ShowSubSum(6, "7|8|9|10|11", 2, false, false, 6, "inv_aply_curr_cd=%s");
	sheetObj.cellValue2(rowcount+1, "dept_cd") = "Grand Total";

	sheetObj.CellFont("FontBold", rowcount+1, 1, sheetObj.lastrow, "eng_usr_nm") = true; 
	sheetObj.cellValue2(sheetObj.lastRow, "no") = "";

	for(var i=1;i<=sheetObj.rowcount;i++){
		sheetObj.CellValue(i, "total") = sheetObj.ComputeSum("|n1st|+|n2nd|+|n3rd|+|n4th|", i, i);
	}
	
	var headerStr = document.getElementById("period_cd"); 
	var text = headerStr.options[headerStr.selectedIndex].text;
	text = text.replaceAll('ly', ''); 
		
	sheetObj.CellText(0, 'n1st') = "1ST "+text;
	sheetObj.CellText(0, 'n2nd') = "2ND "+text;
	sheetObj.CellText(0, 'n3rd') = "3RD "+text;
	sheetObj.CellText(0, 'n4th') = "Over 4TH "+text;
	
	sheetObj.ColumnSort("trdp_cd", "ASC", "ASC|ASC", true);
	
	for(var i=1;i<=rowcount;i++){
		sheetObj.CellValue2(i, "no") =  i;
	}
	
		
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
				
				if(sub_str=="Location"){
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
				
				if(sub_str=="Location"){
					s_type = sub_str;
				}else if(sub_str=="trdpCode"){
					s_type = sub_str;
				}else{
					s_type = str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}else if ( tmp == "exchange" ) {
			if ( s_code != "" ) {
				CODETYPE = str;
				
				s_type = document.frm1.s_xcrt_dt.value;
				var fm_curr_cd = document.frm1.fm_curr_cd.value;
				if(str=="exchange"){
					var to_curr_cd = document.frm1.to_curr_cd.value;
					
				}else{
					var to_curr_cd = 'KRW';
					
				}
				s_type = s_type.replaceAll('\-', '');
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchExchangeRate&bil_dt='+s_type+'&fm_curr_cd='+fm_curr_cd+'&to_curr_cd='+to_curr_cd, './GateServlet.gsl');
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
			
			if(CODETYPE == "trdpCode"){
				formObj.trdp_cd.value  = masterVals[0]; 
				formObj.trdp_nm.value  = masterVals[3];//loc_nm
				
			}
			
		}else{
			if(CODETYPE == "trdpCode"){
				formObj.trdp_cd.value  = ""; 
				formObj.trdp_nm.value  = "";//loc_nm
				
			}
		}
	}else{
		//Error occurred!		
		alert(getLabel('FMS_COM_ERR001'));			
	}
}

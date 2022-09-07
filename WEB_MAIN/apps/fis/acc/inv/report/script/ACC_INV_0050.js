var rtnary = new Array(1);
function doWork(srcName){
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj = docObjects[0];
	var formObj	= document.frm1;

	switch(srcName) {
		case "SEARCHLIST":
			sheetObj.RemoveAll();
			//sheetObj.ShowDebugMsg = true;
			formObj.f_cmd.value = SEARCHLIST;
			
			sheetObj.DoSearch4Post("ACC_INV_0050GS.clt", FormQueryString(formObj));
			//sheetObj.ShowDebugMsg = false;
			getObj('excel').style.display = 'inline';
		break;
		
		case "NEW":
			// form reset
			formObj.reset();
			fncFormStart();
			// sheet clear
			sheetObj.RemoveAll();
		break;
		case "EXCEL":
			sheetObj.SpeedDown2Excel(true);
		break;
		case "POL_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
			
			rtnary = new Array(1);
			rtnary[0] = "SEA";
			rtnary[1] = "BL";
			
			var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			 	
			}else{
				var rtnValAry = rtnVal.split("|");
				
				formObj.pol_cd.value = rtnValAry[0];//loc_cd 
//				formObj.pol_nm.value	= rtnValAry[2];//loc_nm
				
			} 
		break;
		case "POD_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
			
			rtnary = new Array(1);
			rtnary[0] = "SEA";
			rtnary[1] = "BL";
			
			var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				return;
				
			}else{
				var rtnValAry = rtnVal.split("|");
				
				formObj.pod_cd.value = rtnValAry[0];//loc_cd 
//				formObj.pol_nm.value	= rtnValAry[2];//loc_nm
				
			} 
			break;
		case "DEL_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
			
			rtnary = new Array(1);
			rtnary[0] = "SEA";
			rtnary[1] = "BL";
			
			var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				return;
				
			}else{
				var rtnValAry = rtnVal.split("|");
				
				formObj.del_cd.value = rtnValAry[0];//loc_cd 
//				formObj.del_nm.value	= rtnValAry[2];//loc_nm
				
			} 
		break;
		case "USER_POPLIST"://사용자조회 openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
	           
       		rtnary = new Array(1);
	   		rtnary[0] = "1";
	   		
	   		var rtnVal = window.showModalDialog('./CMM_POP_0060.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px");
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				
				var rtnValAry = rtnVal.split("|");
				
				formObj.usr_cd.value 	= rtnValAry[0];
				formObj.usr_nm.value	= rtnValAry[1];
				
			}
			
       break;
		case "CUSTOMER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
			rtnary = new Array(1);
				rtnary[0] = "1";
				rtnary[1] = "";
				rtnary[2] = window;
				
			var cstmTpCd = 'CS';
			var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
			if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			 	
			}else{
				var rtnValAry = rtnVal.split("|");
				formObj.trdp_cd.value = rtnValAry[0]; 
				formObj.trdp_nm.value  = rtnValAry[2];//loc_nm
			}
		break;
		
		case "PRINT":
			var param = "air_sea_clss_cd=" + formObj.air_sea_clss_cd.value;
			param += "&bnd_clss_cd=" + formObj.bnd_clss_cd.value;
			param += "&fm_et_dt=" + formObj.fm_et_dt.value;
			param += "&to_et_dt=" + formObj.to_et_dt.value;
			param += "&dept_cd=" + formObj.dept_cd.value;
			param += "&pol_cd=" + formObj.pol_cd.value;
			param += "&pod_cd=" + formObj.pod_cd.value;
			param += "&del_cd=" + formObj.del_cd.value;
			param += "&usr_cd=" + formObj.usr_cd.value;
			param += "&trdp_cd=" + formObj.trdp_cd.value;
			
			param += "&cmd_type=16";
			param += "&title=Performance List I";
			
			popGET('RPT_PRN_0050.clt?'+param, '', 1025, 740, "scroll:yes;status:no;help:no;");
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
    fncFormStart();
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
                InitRowInfo( 2, 1, 9, 100);

                //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
                InitColumnInfo(19, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(false, true, true, true, false,false) ;
                
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('ACC_INV_0050_HDR1'), true);
                InitHeadRow(1, getLabel('ACC_INV_0050_HDR2'), true);
                

                //데이터속성    [ROW,   COL,   DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
				InitDataProperty(0, 0,  dtHiddenStatus,  30,  daCenter,  true,    "ibflag");
				InitDataProperty(0, 1,  dtData,   		 30,  daCenter,  true,    "no",			false,   "",       dfNone,      0,     false,     false,	2);
				InitDataProperty(0, 2,  dtData,			 50,  daCenter,  true,   "bnd_clss_cd",	false,   "",       dfNone,      0,     false,      true,		10);              
				InitDataProperty(0, 3,  dtData,			 70,  daCenter,  true,   "et_dt_tm",	false,   "",       dfUserFormat,0,     false,      true,		10);                
				InitDataProperty(0, 4,  dtData,			110,  daLeft,    true,   "bl_no",		false,   "",       dfNone,      0,     false,      true,		10);                
				InitDataProperty(0, 5,  dtData,			100,  daLeft,    true,   "cntr_tpsz_cd",false,   "",       dfNone,      0,     false,      true,		10);                    
				InitDataProperty(0, 6,  dtData,			 80,  daLeft,    true,   "dept_cd ",	false,   "",       dfNone,      0,     false,      true,		10);                  
				InitDataProperty(0, 7,  dtData,			 60,  daCenter,  true,   "locl_usr_nm",	false,   "",       dfNone,      0,     false,      true,		10);              
				InitDataProperty(0, 8,  dtData,			 80,  daLeft,    true,   "trdp_nm",		false,   "",       dfNone,      0,     false,      true,		10);                  
				InitDataProperty(0, 9,  dtData,			 80,  daLeft,    true,   "pol_nm",		false,   "",       dfNone,      0,     false,      true,		10);                   
				InitDataProperty(0,10,  dtData,			 80,  daLeft,    true,   "pod_nm",		false,   "",       dfNone,      0,     false,      true,		10);                   
				InitDataProperty(0,11,  dtData,			 80,  daLeft,    true,   "del_nm",		false,   "",       dfNone,      0,     false,      true,		10);                   
				InitDataProperty(0,12,  dtAutoSum,		120,  daRight,   true,   "u_revenue",	false,   "",       dfFloat,     2,     false,      true,		10);			    
				InitDataProperty(0,13,  dtAutoSum,		120,  daRight,   true,   "u_cost",		false,   "",       dfFloat,     2,     false,      true,		10);                   
				InitDataProperty(0,14,  dtAutoSum,		120,  daRight,   true,   "u_profit",	false,   "",       dfFloat,     2,     false,      true,		10);
				InitDataProperty(0,15,  dtAutoSum,		120,  daRight,   true,   "revenue",		false,   "",       dfFloat,     2,     false,      true,		10);			        
				InitDataProperty(0,16,  dtAutoSum,		120,  daRight,   true,   "cost",		false,   "",       dfFloat,     2,     false,      true,		10);	                    
				InitDataProperty(0,17,  dtAutoSum,		120,  daRight,   true,   "profit",		false,   "",       dfFloat,     2,     false,      true,		10);
				InitDataProperty(0,18,  dtHidden,		 70,  daRight,   false,  "ex_rt_ut",	false,   "",       dfFloat,     2,     false,      true,		20);

				InitUserFormat(0, "et_dt_tm",  "####-##-##", "-");
           }                                                      
           break;
     }
}


function sheet1_OnSearchEnd() {
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	
	// sea, air조건에 따른 header변경
	if(formObj.air_sea_clss_cd.value=="A"){
		
		sheetObj.CellText(0, 'et_dt_tm') = "Flight Date/\nArrivalDate";
		sheetObj.CellText(1, 'et_dt_tm') = "Flight Date/\nArrivalDate";
		sheetObj.CellText(0, 'bl_no') = "HAWB";
		sheetObj.CellText(1, 'bl_no') = "HAWB";
		sheetObj.CellText(0, 'pol_nm') = "Departure";
		sheetObj.CellText(1, 'pol_nm') = "Departure";
		sheetObj.CellText(0, 'pod_nm') = "Destination";
		sheetObj.CellText(1, 'pod_nm') = "Destination";
	}else{
		sheetObj.CellText(0, 'et_dt_tm') = "ETD/ETA";
		sheetObj.CellText(1, 'et_dt_tm') = "ETD/ETA";
		sheetObj.CellText(0, 'bl_no') = "HBL";
		sheetObj.CellText(1, 'bl_no') = "HBL";
		sheetObj.CellText(0, 'pol_nm') = "POL";
		sheetObj.CellText(1, 'pol_nm') = "POL";
		sheetObj.CellText(0, 'pod_nm') = "POD";
		sheetObj.CellText(1, 'pod_nm') = "POD";
		
	}
	
	sheetObj.cellValue2(sheetObj.lastRow, "no") = "";
	sheetObj.cellValue2(sheetObj.lastRow, "del_nm") = "Total";

	for(var i=2;i<=sheetObj.rowcount+1;i++){
		sheetObj.CellValue(i, "u_profit") = sheetObj.ComputeSum("|u_revenue|-|u_cost|", i, i);
		sheetObj.CellValue(i, "profit") = sheetObj.ComputeSum("|revenue|-|cost|", i, i);
		
		if(sheetObj.cellValue(i, "ex_rt_ut") =="0" &&sheetObj.cellValue(i, "del_nm") !="Total"){
			sheetObj.RowBackColor(i) = sheetObj.RgbColor(192,192,192);
			
		}
	}
	
	

}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
	
    switch(doWhat){
		case 'DATE1':   //달력 조회 
            var cal = new calendarPopup();
            cal.select(formObj.fm_et_dt, 'fm_et_dt', 'yyyy-MM-dd');
        break;
        
        case 'DATE2':   //달력 조회 
            var cal = new calendarPopup();
            cal.select(formObj.to_et_dt, 'to_et_dt', 'yyyy-MM-dd');
        break;
        
    }
    
}
function fncFormStart() {
	var formObj = document.frm1;
	
	// 오늘 날짜 가져오기
	var now 	= new Date(); 				// 현재시간 가져오기
	var year	= now.getFullYear(); 			// 년도 가져오기
	var month	= now.getMonth() + 1; 		// 월 가져오기 (+1)
	var date	= now.getDate(); 			// 날짜 가져오기
	
	var fromDate = new Date();

	var tempDate = now.getTime() - ( 7*24*60*60*1000);
	fromDate.setTime(tempDate);
   
	var iyear = fromDate.getFullYear();
	var imonth = fromDate.getMonth() +1;
	var iday = fromDate.getDate();

	if(imonth < 10){
		imonth = "0"+(imonth);
	}
	if(iday < 10){
		iday = "0"+iday;
	}

	if(month < 10){
		month = "0"+(month);
	}
	if(date < 10){
		date = "0"+date;
	}

	var searchDay1 = iyear + "-01-01";
	today = year +"-"+ month +"-"+ date +"";

	formObj.fm_et_dt.value = searchDay1;
	formObj.to_et_dt.value = today;
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
	var sheetObj1 = docObjects[1];
	
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			
			var masterVals = rtnArr[0].split('@@^');	
			
			if(CODETYPE == "trdpCode"){
				formObj.trdp_cd.value  = masterVals[0]; 
				formObj.trdp_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "user"){
				formObj.usr_cd.value  = masterVals[0]; 
				formObj.usr_nm.value  = masterVals[3];//loc_nm
				
			}
		}else{
			if(CODETYPE == "trdpCode"){
				formObj.trdp_cd.value  = ""; 
				formObj.trdp_nm.value  = "";
				
			}else if(CODETYPE == "user"){
				formObj.usr_cd.value  = ""; 
				formObj.usr_nm.value  = "";
				
			}
		}
	}else{
		//Error occurred!		
		alert(getLabel('FMS_COM_ERR001')+ "\n\n: ACC_INV_0050.438");			
	}
}


function sheet1_OnDblClick(sheetObj,Row,Col){	
	
	var formObj  = document.frm1;
	
    doProcess = true;
   	formObj.f_cmd.value = "";
   	
   	var air_sea_clss_cd = formObj.air_sea_clss_cd.value;
   	var bnd_clss_cd = sheetObj.CellValue(Row, 'bnd_clss_cd');

    switch (sheetObj.ColSaveName(Col)) {
		case "bl_no" :
		            
        	if(air_sea_clss_cd=="A"){	// 항공
        		if(bnd_clss_cd=="A/O"){	// 수출
        			
        			var paramStr = "./AIE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+sheetObj.CellValue(Row, 'bl_no')+"&viewFlag=Y";
        		}else{	//수입
        			
        			var paramStr = "./AII_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+sheetObj.CellValue(Row, 'bl_no')+"&viewFlag=Y";
        		}
        		
        	}else{	// 해운

        		if(bnd_clss_cd=="S/O"){	// 수출
        			
        			var paramStr = "./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+sheetObj.CellValue(Row, 'bl_no')+"&viewFlag=Y";
        		}else{	//수입
        			
        			var paramStr = "./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+sheetObj.CellValue(Row, 'bl_no')+"&viewFlag=Y";
        		}
        	}
        	parent.mkNewFrame('Booking & HBL', paramStr);
    	break;
    }
}
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj  = docObjects[0];
    var formObj   = document.frm1;

    switch(srcName) {
    
	   case "DEFAULT":
		    formObj.f_cmd.value = -1;
	        formObj.submit();
	        
	   break;
       
       case "SEARCHLIST":
           formObj.f_cmd.value = SEARCHLIST;

//           var f_bl_type = document.getElementsByName("f_bl_type");
//           
//           if(f_bl_type[0].checked == true){
//        	   formObj.f_bl_type_val.value = "M";
//           }
//           if(f_bl_type[1].checked == true){
//        	   formObj.f_bl_type_val.value = "H";
//           }
           
           sheetObj.DoSearch4Post("./EDI_DBA_0020GS.clt", FormQueryString(formObj));
       break;
       
       case "TRANSMIT":
//    	   if(transmitChk()) {
	       		
    		    formObj.f_cmd.value = MODIFY01;
    		    
    		    var Result = sheetObj.DoAllSave("EDI_DBA_0020GS.clt", FormQueryString(formObj),true);
//	       	}
           
       break;
       
    }
}



//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value = callPage;
	doWork('SEARCHLIST', '');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value = 1;
	doWork('SEARCHLIST');
}

/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value = 1;
	doWork('SEARCHLIST');
}

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj = document.frm1;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	
	initFinish();
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
		       	 // 높이 설정
		            style.height = 430;
		            
		            //전체 너비 설정
		            SheetWidth = mainTable.clientWidth;
		            //SheetWidth = 400;
		
		            //Host정보 설정[필수][HostIp, Port, PagePath]
		            if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
		
		            //전체Merge 종류 [선택, Default msNone]
		            MergeSheet = msHeaderOnly;
		
		            //전체Edit 허용 여부 [선택, Default false]
		            Editable = true;
		
		            //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
		            InitRowInfo( 1, 1, 9, 100);
		
		            //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
		            InitColumnInfo(16, 0, 0, true);
		
		            // 해더에서 처리할 수 있는 각종 기능을 설정한다
		            InitHeadMode(true, true, true, true, false,false) ;
		            
		            //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
		            InitHeadRow(0, getLabel('EDI_DBA_0020_HDR1'), true);
		            
		             var cnt = 0;
		             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		             InitDataProperty(0, cnt++,  dtCheckBox,	 40,    daCenter,    true,    "chk",      	 		false,   "",       dfNone,          0,     true,      true);
		             InitDataProperty(0, cnt++,  dtHidden,        0,    daCenter,    true,    "intg_bl_seq", 	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,		130,    daCenter,    true,    "mbl_no",      	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		 35,    daCenter,    true,    "bl_type",    	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		 55,    daCenter,    true,    "sts_cd",    		false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		 80,    daCenter,    true,    "zapp_sts_cd", 	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		110,    daCenter,    true,    "lnr_trdp_nm",   	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		 55,    daCenter,    true,    "flt_no",    		false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		105,    daCenter,    true,    "etd_dt_tm",    	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		 70,    daCenter,    true,    "pod_cd",    		false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		 50,    daRight,     true,    "mbl_pck_qty",  	false,   "",       dfInteger,     	0,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		 60,    daRight,     true,    "mbl_grs_wgt",   	false,   "",       dfFloat,     	1,     false,      false);
		             InitDataProperty(0, cnt++,  dtData,   		105,    daCenter,    true,    "modi_tms",    	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtImageText,    80,    daLeft,    true,      "departure",    	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtImageText, 	 60,    daCenter,    true,    "gate_In",    	false,   "",       dfNone,          0,     false,      false);
		             InitDataProperty(0, cnt++,  dtImageText, 	 60,    daCenter,    true,    "print",    	false,   "",       dfNone,          0,     false,      false);
		             
		             //Cell Image display
			         ImageList(0) = APP_PATH+"/web/img/button/btns_search.gif";
			         ImageList(1) = APP_PATH+"/web/img/button/btn_apply.gif";
			         ImageList(2) = APP_PATH+"/web/img/button/btn_print.gif";
			        
			         InitDataImage(0, 'departure', daRight);
			         InitDataImage(0, 'gate_In', daCenter);
			         InitDataImage(0, 'print', daCenter);
	    
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
	//if(colStr == "mbl_no"){
	var formObj  = document.frm1;
	//doProcess = true;
	formObj.f_cmd.value = "";
	
	if(colStr!='departure' && colStr!='gate_In' && colStr!='print'){
	
		var paramStr = "./EDI_DBA_0010.clt?f_cmd="+SEARCHLIST
												+"&f_bl_type="+sheetObj.CellValue(Row, "bl_type")
												+"&f_bl_no="+sheetObj.CellValue(Row, "mbl_no")
												+"&f_intg_bl_seq="+sheetObj.CellValue(Row, "intg_bl_seq");
		parent.mkNewFrame('DE Customs EDI (Air)', paramStr);
	}	
}
  
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj  = document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
	    case "departure" :	//파일다운로드
		    
	    if(sheetObj.CellValue(Row, "bl_type") == "M"){
//	    	if(sheetObj.CellValue(Row, 'sts_cd') !='Released'){
//		    	alert('BL can departure when the status is [Released].');
//		    }else{
		    	var rtnary = new Array(5);
		    	rtnary[0] = sheetObj.CellValue(Row, "intg_bl_seq");
		    	rtnary[1] = sheetObj.CellValue(Row, "mbl_no");
				rtnary[2] = sheetObj.CellValue(Row, "sts_cd");
				rtnary[3] = sheetObj.CellValue(Row, "flt_no");
				
				var etd_dt_tm = sheetObj.CellValue(Row, "etd_dt_tm");
				rtnary[4] = etd_dt_tm;

				if(etd_dt_tm.length > 7){
					rtnary[5] = etd_dt_tm.substring(0, 10);
					rtnary[6] = etd_dt_tm.substring(11);
				}else{
					rtnary[5] = "";
					rtnary[6] = "";
				}
				rtnary[7] = sheetObj.CellValue(Row, "bl_type");

				var rtnVal = window.showModalDialog('./EDI_DBA_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:500px;dialogHeight:220px");
				
//				var reqParam = "";
//				popGET('./EDI_DBA_0030.clt'+reqParam, '', 480, 200, "scroll:yes;status:no;help:no;");
				
		        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		        	return;
		        }else {
		        	var rtnValAry = rtnVal.split("|");
	
		        	//fName.s_de_nod_cd.value = rtnValAry[0]; //intg_bl_seq
		        	sheetObj.CellValue(Row, "sts_cd") = rtnValAry[1]; //sts_cd 
		        	sheetObj.CellValue(Row, "etd_dt_tm") = rtnValAry[2]; //etd_dt_tm
		        }
//			}
	    }
	    break;
	   
	    case "gate_In" :	//파일다운로드
	    
	    	if(confirm("do you want to send EDI(GATE-IN)?")){ 
			    var etd_dt_tm = sheetObj.CellValue(Row, "etd_dt_tm");
		    	var etd_dt = "";
		    	var etd_tm = "";	
				
		    	if(etd_dt_tm.length > 7){
					etd_dt = etd_dt_tm.substring(0, 10);
					etd_tm = etd_dt_tm.substring(11);
				}
				
			    var reqParam = '&intg_bl_seq=' + sheetObj.CellValue(Row, "intg_bl_seq");
				reqParam += '&mbl_no=' +sheetObj.CellValue(Row, "mbl_no");
				reqParam += '&sts_cd=' + sheetObj.CellValue(Row, "sts_cd");
				reqParam += '&flt_no=' + sheetObj.CellValue(Row, "flt_no");
				reqParam += '&etd_dt_tm=' + etd_dt_tm;
				reqParam += '&eta_dt=' + etd_dt;
				reqParam += '&eta_tm=' + etd_tm;
				reqParam += '&bl_type=' + sheetObj.CellValue(Row, "bl_type");
				reqParam += '&dep_cd=' + "GIN";
				reqParam += '&gin_row=' + Row
		    	ajaxSendPost(ediGateInSend, 'reqVal', '&goWhere=aj&bcKey=ediFSUSend'+reqParam, './GateServlet.gsl');
	    	}	
	    break;
	    
	    case "print" :	//파일다운로드
	    
		    var isChk = true;
	    	
	    	var reqParam = '&intg_bl_seq=' + sheetObj.CellValue(Row, "intg_bl_seq");
	    	reqParam += '&bl_type=' +sheetObj.CellValue(Row, "bl_type");
		
			ajaxSendPost(chkEdiAirPrnStsAjaxReq, 'reqVal', '&goWhere=aj&bcKey=chkEdiAirPrnSts'+reqParam, './GateServlet.gsl');
		    
	    	if(formObj.prn_flg.value == "Y"){ 
				
				formObj.title.value = "EDI ZAPP-Air Report";		
				
				if(sheetObj.CellValue(Row, "bl_type") == "M"){
					formObj.file_name.value = "edi_air_mbl_01.mrd";
				}else{
					formObj.file_name.value = "edi_air_hbl_01.mrd";
				}
		    	
				//Parameter Setting
				var param = '[' + sheetObj.CellValue(Row, "intg_bl_seq") + ']';	//$1
				
				formObj.rd_param.value = param;
				popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	    	}	
    	break;
	}
}

function chkEdiAirPrnStsAjaxReq(reqVal){
	
	var sheetObj  = docObjects[0];
	var formObj  = document.frm1;	 
    var doc = getAjaxMsgXML(reqVal);
    
    var targetFr= 'mainFrame';
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('@@^');	
				
			formObj.prn_flg.value = rtnArr[0];
			
			if(formObj.prn_flg.value == "N"){
				alert("Please check Status.");
			}
			
		}else{
			alert(getLabel('Fail'));
		}
	}else{
		alert(getLabel('Fail'));	
	}
}

function ediGateInSend(reqVal){
	var sheetObj  = docObjects[0];
	var formObj  = document.frm1;	 
    var doc = getAjaxMsgXML(reqVal);
    
    alert(doc[0]);
    
	var targetFr= 'mainFrame';
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@^');
			
			var gin_row								= rtnArr[2];//sts_cd
			//formObj.intg_bl_seq.value   			= rtnArr[0];//intg_bl_seq 
			sheetObj.CellValue(gin_row, "sts_cd")	= rtnArr[1];//sts_cd
//			formObj.etd_dt.value    				= rtnArr[3];//etd_dt
//			formObj.etd_tm.value    				= rtnArr[4];//etd_tm
			//doWork('SEARCHLIST');
			
		}
	}else{
		alert(getLabel('Fail'));		
	}
}
  
function sheet1_OnSearchEnd(){
	
	var sheetObj  = docObjects[0];
	
	if(sheetObj.RowCount > 0){
		for(var i=1; i<=sheetObj.LastRow;i++){
			if(sheetObj.CellValue(i, "bl_type") != "M"){
				sheetObj.InitCellProperty(i, "departure", dtData);
				sheetObj.CellValue(i,"departure") = "";
			}else{
				
			}
			
		}
	}
}

/**
* 화면로드 후 초기값 세팅
*/
function initFinish(){
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDtEndPlus(document.frm1.f_rgst_strdt, 180, document.frm1.f_rgst_enddt, 30);
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
	        cal.select(formObj.f_rgst_strdt, 'f_rgst_strdt', formObj.f_rgst_enddt, 'f_rgst_enddt', 'MM-dd-yyyy');
	    break;
	    case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
        var cal = new calendarPopupFromTo();
        cal.displayType = "date";
        cal.select(formObj.f_etd_strdt, 'f_etd_strdt', formObj.f_etd_enddt, 'f_etd_enddt', 'MM-dd-yyyy');
	    break;
	    case 'DATE13':   //달력 조회 From ~ To 팝업 호출 
	        var cal = new calendarPopupFromTo();
	        cal.displayType = "date";
	        cal.select(formObj.f_rgst_strdt1, 'f_rgst_strdt1', formObj.f_rgst_enddt1, 'f_rgst_enddt1', 'MM-dd-yyyy');
	    break;
    }
}


function openPopUp(srcName, curObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.frm1;
	try {
		switch(srcName) {
		
			case "BL_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
	        
				var f_bl_type = document.getElementsByName("f_bl_type");
				var str_poplist = "";
				
				if(f_bl_type[0].checked == true){
					
					var rtnary = new Array(1);
					rtnary[0] = "A"; //S = 해운에서 오픈, A = 항공에서 오픈
					rtnary[1] = "O"; //I: In-bound, O: Out-bound
					
			    	var rtnVal = window.showModalDialog('./CMM_POP_0180.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
			    	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			    		return;
					}else{
						var rtnValAry = rtnVal.split("|");
						formObj.f_bl_no.value = rtnValAry[0];//mbl_no
					}
					
				}else{
					var rtnary = new Array(1);
			   		
			   		rtnary[0] = "A";
			   		rtnary[1] = "O";

		   	        var rtnVal = window.showModalDialog('./CMM_POP_0170.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
		   	       
		   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					 	return;
					}else{
					
						var rtnValAry = rtnVal.split("|");

						formObj.f_bl_no.value = rtnValAry[0];//house_bl_no
					}
				}
				
				doWork('SEARCHLIST');
				 
		    break;
    	   
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: EDI_DBA_0020.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: EDI_DBA_0020.002");
        }
	}
}

function sheet1_OnSaveEnd(sheetObj, errMsg){
	alert("Transmit success! ");
	doWork('SEARCHLIST');
}
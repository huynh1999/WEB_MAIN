var rtnary = new Array(1);
function doWork(srcName){
	if(!btnVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var formObj  = document.frm1;

    switch(srcName) {
    case "SEARCHLIST":

    	//sheetObj.ShowDebugMsg = true;
        formObj.f_cmd.value = SEARCHLIST;
        
        sheetObj.DoSearch4Post("EQU_MST_0020GS.clt", FormQueryString(formObj));
    	//sheetObj.ShowDebugMsg = false;
        
        getObj('excel').style.display = 'inline';
        getObj('prn').style.display = 'inline';
    break;
       
    case "ROWADD":
	    // sheet count가 0이면 false
	    if(formObj.s_inv_no.value==""){
	    	alert(getLabel('EQU_MST_MSG31'));
	    	return;
	    }
    	
        var iRows = sheetObj.Rows;
        var Row = sheetObj.DataInsert(++iRows);
          if((sheetObj.RowCount)>1){ 
	          
		sheetObj.CellValue2(Row, "no") = parseInt(sheetObj.CellValue(sheetObj.LastRow-1, "no"))+1;
		
          }else{
          
		sheetObj.CellValue2(Row, "no") = 1;
          
          }
    break;
    case "NEW":
        displayClear();
        fncFromToDate();

    break;
    case "MODIFY":
        formObj.f_cmd.value = MODIFY;
     // grid value validation
        if ( !fncGridCheck() ) return false;
        
        if( confirm(getLabel('EQU_MST_MSG09')) ){
        	sheetObj.DoSave("EQU_MST_0020GS.clt", FormQueryString(formObj),"ibflag",false);
        }
    break;
       
    case "BKNO_POPLIST"://openMean S = 해운에서 오픈, A = 항공에서 오픈
 		rtnary = new Array(1);
		rtnary[0] = "S";
		rtnary[1] = "O";
		rtnary[2] = "Y"; //equipment 일때 operator all설정
		
		var rtnVal = window.showModalDialog('./CMM_POP_0210.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:815px;dialogHeight:480px");
        	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 		return;
		}else{
	
			var rtnValAry = rtnVal.split("|");
			formObj.bkg_no.value   	= rtnValAry[0];//bkg_no
		}
		
	
	break;  
	
		case "PRINT":
			//선택한 Container를 Report에 출력합니다.
			var chkRow = sheetObj.FindCheckedRow("chk");
			if(chkRow ==""){
//	            alert("체크된 항목이 없습니다.");
	            alert(getLabel('EQU_MSG_008'));
	            return;
	        }
			var arrRow = chkRow.split("|");
			var cntr_no = '\'';
	        for(var j=0;j<arrRow.length-1;j++){
	            if(j>0){
	                cntr_no  = cntr_no +',\'';
	            }
	            cntr_no = cntr_no + sheetObj.cellvalue(arrRow[j], "cntr_no");
	            cntr_no = cntr_no+ '\'';
	        }
	        
	        var param = 'cmd_type=45';
	        param += '&title=Container Status List';
	        param += '&fm_etd_dt=' + formObj.fm_etd_dt.value;
	        param += '&to_etd_dt=' + formObj.to_etd_dt.value;
	        param += '&bkg_no=' + formObj.bkg_no.value;
	        param += '&cs_trdp_cd=' + formObj.cs_trdp_cd.value;
	        param += '&lr_trdp_cd=' + formObj.lr_trdp_cd.value;
	        param += '&hid_cntr_no=' + cntr_no;
	        param += '&pkup_nod_cd=' + formObj.pkup_nod_cd.value;
	        param += '&cntr_sts_cd=' + formObj.cntr_sts_cd.value;

	        popGET('RPT_PRN_0050.clt?'+param, '', 1025, 740, "scroll:yes;status:no;help:no;");
		break;
       
     case "EXCEL":
    	 sheetObj.SpeedDown2Excel(true);
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
 			formObj.cs_trdp_cd.value = rtnValAry[0]; 
 			formObj.cs_trdp_nm.value  = rtnValAry[2];//loc_nm
 		}
 	break;
	case "LESSOR_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
		rtnary = new Array(1);
			rtnary[0] = "1";
			rtnary[1] = "";
			rtnary[2] = window;
			
		var cstmTpCd = 'LS';
		var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			formObj.lr_trdp_cd.value = rtnValAry[0]; 
			formObj.lr_trdp_nm.value  = rtnValAry[2];//loc_nm
		}
	break;
	case "Port_POPLIST" :
        
		rtnary = new Array(1);
   		rtnary[0] = "SEA";
   		rtnary[1] = "ND";
   		
   		var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			formObj.pkup_nod_cd.value = rtnValAry[1]; 
			formObj.pkup_nod_nm.value  = rtnValAry[2];//loc_nm

		}
	break;
    case "INVOICE_POPLIST" :
    	// disable일때 return
    	if(document.getElementById("s_inv_no").className=="search_form-disable") return;
    	
    	if(sheetObj.rowCount>0){
    		if(!confirm("If [invoice no] is change. When you clear your work. Do you want to continue?")){
    			return;
    		}
    	}
        
		rtnary = new Array(1);
   		rtnary[0] = "1";
   		rtnary[1] = "IS"; // invoice status가 issue인것(end가 아닌것)
   		
   		var rtnVal = window.showModalDialog('./EQU_POP_0110.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:360px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			
			formObj.s_inv_no.value = rtnValAry[0]; // inv_no
			
			// string으로 받은 cntr정보를 배열로 나눈다.
			var rtnArr = rtnValAry[1].split(';');
			
			var fstStr = 'available Container ';
			var tmpStr = '';
			
			for(var i=0;i<rtnArr.length;i++){
				var masterVals = rtnArr[i].split(',');
				
				if(i>0) tmpStr = tmpStr+', ';
					
				tmpStr = tmpStr+ masterVals[0]+ ' : '+	masterVals[1];
			}
			// hidden 에 tmpStr을 넣어준다
			formObj.h_tot_cnt.value = tmpStr;
			invTxt.innerText = fstStr+tmpStr;
			
			//sheet를 초기화한다.
			sheetObj.RemoveAll();
			var inv_no = formObj.s_inv_no.value;
			ajaxSendPost(dispMappingAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchMappingCombo&inv_no='+inv_no, './GateServlet.gsl');
		}
	break; 
      
    }
}
//코드표시 Ajax
function dispMappingAjaxReq(reqVal){
	
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			
			var masterVals = rtnArr[0].split('@@^'); // 전체
			
			var masterVal0 = masterVals[0].split('|'); // smry_seq
			var masterVal1 = masterVals[1].split('|'); // cntr_tpsz별 
			var masterVal2 = masterVals[2].split('|'); // name
			var masterVal3 = masterVals[3].split('|'); // available cnt
			var masterVal4 = masterVals[4].split('|'); // amount
			
			var cnt = " ";
			
			// cntr갯수만큼 for
			for(var j=0;j<masterVal1.length;j++){

				cnt  += masterVal0[j]+'. '+masterVal1[j]+":"+masterVal3[j]+"|";
				
			}
			//cntr 갯수정보를 hidden에 넣어준다.
			formObj.h_tpsz_cnt.value = cnt;
			
		}
	}else{
		alert(getLabel('EQU_INV_MSG01'));		
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
    fncFromToDate();
}
function fncFromToDate() {
	var formObj = document.frm1;
	
	// 오늘 날짜 가져오기
	var now 	= new Date(); 				// 현재시간 가져오기
	var year	= now.getYear(); 			// 년도 가져오기

	formObj.fm_etd_dt.value = year+'-01-01';
	formObj.to_etd_dt.value = year+'-12-31';
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
    var cnt=0;
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
                InitColumnInfo(24, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;
                
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('EQU_MST_0020_HDR'), true);

                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
				InitDataProperty(0, cnt++,  dtDelCheck,       30,    daCenter,  true,    "chk",             	false,   "",       dfNone,      0,     true,      true);
				InitDataProperty(0, cnt++,  dtHiddenStatus,   40,    daCenter,  true,    "ibflag");
				InitDataProperty(0, cnt++,  dtData,   		  40,    daCenter,  true,    "no", 				false,	"",       dfNone,      0,     false,	false,	2);
				InitDataProperty(0, cnt++,  dtData,   		  80,    daLeft,    true,    "cntr_no", 		true,	"",       dfNone,      0,     false,	true,	14);
				InitDataProperty(0, cnt++,  dtCombo,   		  60,    daCenter,  true,    "cntr_tpsz_cd", 	true,	"",       dfNone,      0,     false,	true,	6);
				InitDataProperty(0, cnt++,  dtPopup,		 120,    daRight,   true,    "buy_amt", 		true,	"",       dfFloat,     2,     false,	true,	20);
				InitDataProperty(0, cnt++,  dtCombo,   		  60,    daCenter,  true,    "lstm_cd", 		true,	"",       dfNone,      0,     true,		true,	18);
				                    
				InitDataProperty(0, cnt++,  dtPopupEdit,   	  60,    daLeft,    true,    "lr_trdp_cd", 		true,	"",       dfNone,      0,     false,	true,	10);
				InitDataProperty(0, cnt++,  dtData,		   	  60,    daLeft,    true,    "lr_trdp_nm", 		true,	"",       dfNone,      0,     false,	false,	10);
				InitDataProperty(0, cnt++,  dtCombo,   		  80,    daCenter,  true,    "cntr_sts_cd", 	true,	"",       dfNone,      0,     true,		true,	2);
				                    
				InitDataProperty(0, cnt++,  dtData,		   	  60,    daLeft,    true,    "cs_trdp_cd",		false,	"",       dfNone,      0,     false,	false,	7);
				InitDataProperty(0, cnt++,  dtData,		   	 110,    daLeft,    true,    "cs_trdp_nm",		false,	"",       dfNone,      0,     false,	false,	7);
				InitDataProperty(0, cnt++,  dtPopupEdit,   	  60,    daLeft,    true,    "cntr_trac_nod_cd",false,	"",       dfNone,      0,     true,		true,	7);
				InitDataProperty(0, cnt++,  dtData,		   	 110,    daLeft,    true,    "cntr_trac_nod_nm",false,	"",       dfNone,      0,     false,	false,	7);
				                    
				InitDataProperty(0, cnt++,  dtPopupEdit,   	  60,    daLeft,    true,    "pkup_nod_cd",		false,	"",       dfNone,      0,     true,		true,	7);
				InitDataProperty(0, cnt++,  dtData,		     110,    daLeft,    true,    "pkup_nod_nm",		false,	"",       dfNone,      0,     false,	false,	7);
				                    
				InitDataProperty(0, cnt++,  dtData,   		 100,    daLeft,    true,    "bkg_no", 			false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,   		 110,    daLeft,    true,    "bl_no", 			false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtPopupEdit, 	 100,    daLeft,    true,    "inv_no", 			false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtPopupEdit,   	 110,    daLeft,    true,    "agmt_no", 		true,	"",       dfNone,      0,     true,		true,	15);
				InitDataProperty(0, cnt++,  dtHidden,   	  80,    daLeft,    true,    "sr_no", 			false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtHidden,  		  80,    daLeft,    true,    "seal_no1", 		false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtHidden,  		  80,    daLeft,    true,    "seal_no2", 		false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtHidden,  		  80,    daLeft,    true,    "inv_smry_seq",	false,	"",       dfNone,      0,     false,	false,	20);
				InitDataCombo (0, "cntr_tpsz_cd", typeSize_1, typeSize_1);
				InitDataCombo (0, "lstm_cd", PARAM1_1, PARAM1_2);	//com_cd_dtl에서 가져온 코드값.
				InitDataCombo (0, "cntr_sts_cd", PARAM2_1, PARAM2_2);	//com_cd_dtl에서 가져온 코드값.
				
				PopupImage	= APP_PATH+"/web/img/button/btns_search.gif";
				
				
				// 대문자 자동 치환
		        InitDataValid(0, "cntr_no",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "cntr_trac_nod_cd",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "lr_trdp_cd",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "agmt_no",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "pkup_nod_cd",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "inv_no",vtEngUpOther, "0123456789" );
           }                                                      
           break;
     }
}

function sheet1_OnSearchEnd() {
	var formObj = document.frm1;
	
	// 가능 수량을 숨긴다.
	invTxt.innerText = "";
	
	// invoice no의 value를 없애고 disable시킨다.
	formObj.s_inv_no.value = "";
	document.getElementById("s_inv_no").className = "search_form-disable";
//	document.getElementById("s_inv_no").readOnly = true;
	
	// rowadd를 숨겨준다.
	getObj('rowAdd').style.display = 'none';

}
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj = document.frm1;
	if(sheetObj.RowStatus(Row)!="I")
	formObj.s_inv_no.value = sheetObj.cellValue(Row, "inv_no");
}
function sheet1_OnChange(sheetObj,Row,Col){
	switch (sheetObj.ColSaveName(Col)) {
		case "cntr_tpsz_cd":
			sheetObj.CellValue(Row, "buy_amt") = "";
		break;
		case "lr_trdp_cd":
			codeNameAction('trdpCode_s',sheetObj.cellValue(Row, Col), 'onChange')
		break;
		case "cntr_trac_nod_cd":
			codeNameAction('node_s_trac',sheetObj.cellValue(Row, Col), 'onChange')
		break;
		case "pkup_nod_cd":
			codeNameAction('node_s_pkup',sheetObj.cellValue(Row, Col), 'onChange')
		break;
		case "cntr_no":
			//Contaienr Number 유효성 검증
			if(sheetObj.CellValue(Row, Col)!==''){
				
				var rtnVal = cntrNumCheck(sheetObj.CellValue(Row, Col));
				if(rtnVal){		//정상인경우
/*
					//중복 확인
					if(!checkCntrNo(sheetObj.CellValue(Row, Col))){
						//alert('This Container Number is already used!\nPlease check the Container Number!');
						alert(getLabel('FMS_COM_000000') + "\n\n: EQU_MST_0020.418");
						sheetObj.SelectCell(Row, Col);
					}
 */
					
				}else{
					sheetObj.CellValue2(Row, Col) = '';
					sheetObj.SelectCell(Row, Col);
				}
			}
		break;
		
	}
}

function sheet1_OnSaveEnd() {
	doWork('SEARCHLIST');
		
}
function sheet1_OnPopupClick(sheetObj,Row,Col){
	var formObj = document.frm1;

	switch (sheetObj.ColSaveName(Col)) {
	
	case "buy_amt" :
		rtnary = new Array(1);
   		rtnary[0] = "1";
   		rtnary[1] = formObj.s_inv_no.value; // invoice status가 issue인것(end가 아닌것)
   		rtnary[2] = sheetObj.cellValue(Row, "cntr_tpsz_cd"); // invoice status가 issue인것(end가 아닌것)
   		
   		var rtnVal = window.showModalDialog('./EQU_POP_0120.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:360px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			
			sheetObj.cellValue2(Row, "buy_amt") = rtnValAry[0];//buy_amt
			sheetObj.cellValue2(Row, "inv_smry_seq") = rtnValAry[1];//inv_smry_seq
				
		}
		break;
	case "lr_trdp_cd" :
		rtnary = new Array(1);
		rtnary[0] = "1";
		rtnary[1] = "";
		rtnary[2] = window;
		
		var cstmTpCd = 'LS';
		var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			
				sheetObj.cellValue2(Row, "lr_trdp_cd") = rtnValAry[0];//loc_cd 
				sheetObj.cellValue2(Row, "lr_trdp_nm") = rtnValAry[2];//loc_cd 
				
		}
	break;
	
	case "pkup_nod_cd" :
	        
		rtnary = new Array(1);
   		rtnary[0] = "SEA";
   		rtnary[1] = "ND";
   		
   		var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			sheetObj.cellValue2(Row, "pkup_nod_cd") = rtnValAry[1];//nod_cd 
			sheetObj.cellValue2(Row, "pkup_nod_nm") = rtnValAry[2];//nod_cd 

		}
	break;
	case "cntr_trac_nod_cd" :
        
		rtnary = new Array(1);
   		rtnary[0] = "SEA";
   		rtnary[1] = "ND";
   		
   		var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
				sheetObj.cellValue2(Row, "cntr_trac_nod_cd") = rtnValAry[1];//nod_cd 
				sheetObj.cellValue2(Row, "cntr_trac_nod_nm") = rtnValAry[2];//nod_cd 
		}
	break;
	case "agmt_no" :
    
		rtnary = new Array(1);
   		rtnary[0] = "1";
   		
   		var rtnVal = window.showModalDialog('./EQU_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:360px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			
			sheetObj.cellValue2(Row, "agmt_no") = rtnValAry[0];//loc_cd 
				
		}
	break;
	case "inv_no" :
        
		rtnary = new Array(1);
   		rtnary[0] = "1";
   		rtnary[1] = "IS"; // invoice status가 issue인것(end가 아닌것)
   		
   		var rtnVal = window.showModalDialog('./EQU_POP_0110.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:360px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			
			sheetObj.cellValue2(Row, "inv_no") = rtnValAry[0];//loc_cd
				
		}
	break; 
	}
}

/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
	
    switch(doWhat){
		case 'DATE1':   //달력 조회 
            var cal = new calendarPopup();
            cal.select(formObj.fm_etd_dt, 'fm_etd_dt', 'yyyy-MM-dd');
        break;
        
        case 'DATE2':   //달력 조회 
            var cal = new calendarPopup();
            cal.select(formObj.to_etd_dt, 'to_etd_dt', 'yyyy-MM-dd');
        break;
        
    }
}
/*
 *  조건들을 clear한다. 
 */
function displayClear(){
	var sheetObj = docObjects[0];
	var formObj = document.frm1;
	// form reset
	formObj.reset();
	
	// sheet clear
	sheetObj.RemoveAll();
	
	// invoice 가능
	document.getElementById("s_inv_no").className = "search_form";
//	document.getElementById("s_inv_no").readOnly = false;
	invTxt.innerText = "";
	formObj.h_tot_cnt.value = "";
	
	// rowadd를 보여준다.
	getObj('rowAdd').style.display = 'block';
	
}
/*
 *  저장 조건들을 check한다. 
 */
function fncGridCheck() {
	var sheetObj = docObjects[0];
    var formObj  = document.frm1;
    
    // sheet count가 0이면 false
    if(sheetObj.rowCount==0)return false;
    
    // invoice no를 체크
    if(formObj.s_inv_no.value==""||formObj.s_inv_no.value.length<2){
		alert(getLabel('EQU_INV_MSG21'));
		return false;
	}
    
    // invoice 에 해당하는 cntr_tpsz validation
	var allRows = "";
	// checked 된 것의  row를 array로 반환한다.
//	allRows = sheetObj.FindCheckedRow("chk");
	for(var i=1;i<=sheetObj.rowcount;i++){
			allRows += i+"|";
	}
	
	var arrAllRows = allRows.split("|");

	var cntr_nm	= new Array();	// 입력값
	var cntr_cnt= new Array();	// 입력값
	var hid_nm	= new Array();	// 기준값
	var hid_cnt	= new Array();	// 기준값
	var dup_cnt	= new Array();	// 포함값
	
	var smry_seq = new Array(); // smry amt
	var tpsz_cnt = new Array(); // tpsz cnt
	
	// array중복을 제거하기 위한 function
	Array.prototype.unique = function()
	{
	  var a = {};
	  for(var i=0; i<this.length; i++)
	  {
	    if(typeof a[this[i]] == "undefined")
	      a[this[i]] = 1;
	  }
	  this.length = 0;
	  for(var i in a)
	    this[this.length] = i;
	  return this;
	}

	// 선택된 row의 cntr_tpsz_cd 별로 묶어준다.
	for(var idx=0; idx<arrAllRows.length-1; idx++){
		cntr_nm[idx] = sheetObj.cellValue(arrAllRows[idx],"cntr_tpsz_cd");    		
		cntr_cnt[idx] = 0;
		
		smry_seq[idx] = sheetObj.cellValue(arrAllRows[idx],"inv_smry_seq")+'. '+sheetObj.cellValue(arrAllRows[idx],"cntr_tpsz_cd");    		
		tpsz_cnt[idx] = 0;
		
		//금액선택을 안하면 return (2010.02.09 추가)
		if(sheetObj.cellValue(arrAllRows[idx],"inv_smry_seq")==""){
//			alert("Please Enter a [Select Amount] as No : "+arrAllRows[idx] );
			alert(getLabel('EQU_MSG_004') + arrAllRows[idx] );
			return;
		}
	}
	
	// 중복 제거 후 다시 배열에 넣는다. 
	cntr_nm = cntr_nm.unique();
	
	for(var idx=0; idx<cntr_nm.length; idx++){
    	for(var j=0; j<arrAllRows.length-1; j++){
    		
    		// cntr_nm 과 name같을경우 +1해준다.
    		if(cntr_nm[idx]== sheetObj.cellValue(arrAllRows[j],"cntr_tpsz_cd")){
    			cntr_cnt[idx] = cntr_cnt[idx]+1;
    		}
    		
    		// smry_seq 과 name같을경우 +1해준다.
    		if(smry_seq[idx]== sheetObj.cellValue(arrAllRows[j],"inv_smry_seq")+'. '+sheetObj.cellValue(arrAllRows[j],"cntr_tpsz_cd")){
    			tpsz_cnt[idx] = tpsz_cnt[idx]+1;
    		}
    		
    	}
	}
	
	var hidVal = formObj.h_tot_cnt.value.split(",");

	// 기준값과 비교해  over되지 않게 한다.
	for(var j=0; j<cntr_nm.length; j++){
		
		dup_cnt[j] = 0;
		for(var idx=0; idx<hidVal.length; idx++){
			var hid	= hidVal[idx].split(":");
			
			hid_nm	= trim(hid[0]);
			hid_cnt	= trim(hid[1]);
			
			// name같을경우
			if(hid_nm==cntr_nm[j]){
				// 수량 체크
				if(hid_cnt <cntr_cnt[j]){
					alert(cntr_nm[j]+' '+getLabel('EQU_MST_MSG22'));
					return false;
				}
			}
			// hidden에 없는 값일때
			if(hid_nm==cntr_nm[j])	dup_cnt[j]++;				
						
		}
		if(dup_cnt[j]==0){
			alert(cntr_nm[j]+' '+getLabel('EQU_MST_MSG23'));
			return false;
		}
		
	}
	
	var hiddenVal = formObj.h_tpsz_cnt.value.split("|");

	// 기준값과 비교해  over되지 않게 한다.
	for(var j=0; j<smry_seq.length; j++){
		
		dup_cnt[j] = 0;
		for(var idx=0; idx<hiddenVal.length; idx++){
			var hid	= hiddenVal[idx].split(":");
			
			hid_nm	= trim(hid[0]);
			hid_cnt	= trim(hid[1]);
			
			// name같을경우
			if(hid_nm==smry_seq[j]){
				// 수량 체크
				if(hid_cnt <tpsz_cnt[j]){
					alert(smry_seq[j]+' '+getLabel('EQU_MST_MSG22'));
					return false;
				}
			}
			// hidden에 없는 값일때
			if(hid_nm==smry_seq[j])	dup_cnt[j]++;				
						
		}
		if(dup_cnt[j]==0){
			alert(smry_seq[j]+' '+getLabel('EQU_MST_MSG23'));
			return false;
		}
		
	}
    return true;
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
	
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			
			var masterVals = rtnArr[0].split('@@^');	
			
			if(CODETYPE == "trdpCode"){
				formObj.lr_trdp_cd.value  = masterVals[0]; 
				formObj.lr_trdp_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "trdpCode_cs"){
				formObj.cs_trdp_cd.value  = masterVals[0]; 
				formObj.cs_trdp_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "node"){
				formObj.pkup_nod_cd.value  = masterVals[0]; 
				formObj.pkup_nod_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "trdpCode_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "lr_trdp_cd") = masterVals[0]; 
				sheetObj.cellValue2(sheetObj.selectRow, "lr_trdp_nm")  = masterVals[3];//trdp_nm
				
			}else if(CODETYPE == "node_s_trac"){
				sheetObj.cellValue2(sheetObj.selectRow, "cntr_trac_nod_cd") = masterVals[0]; 
				sheetObj.cellValue2(sheetObj.selectRow, "cntr_trac_nod_nm") = masterVals[3]; 
				
			}else if(CODETYPE == "node_s_pkup"){
				sheetObj.cellValue2(sheetObj.selectRow, "pkup_nod_cd") = masterVals[0]; 
				sheetObj.cellValue2(sheetObj.selectRow, "pkup_nod_nm") = masterVals[3]; 
				
			}
			
		}else{
			if(CODETYPE == "trdpCode"){
				formObj.lr_trdp_cd.value  = ""; 
				formObj.lr_trdp_nm.value  = "";//loc_nm
				
			}else if(CODETYPE == "trdpCode_cs"){
				formObj.cs_trdp_cd.value  = ""; 
				formObj.cs_trdp_nm.value  = "";//loc_nm	
				
			}else if(CODETYPE == "node"){
				formObj.pkup_nod_cd.value  = ""; 
				formObj.pkup_nod_nm.value  = "";
				
			}else if(CODETYPE == "trdpCode_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "lr_trdp_cd") = ""; 
				sheetObj.cellValue2(sheetObj.selectRow, "lr_trdp_nm")  = "";
				
			}else if(CODETYPE == "node_s_trac"){
				sheetObj.cellValue2(sheetObj.selectRow, "cntr_trac_nod_cd") = ""; 
				sheetObj.cellValue2(sheetObj.selectRow, "cntr_trac_nod_nm") = ""; 
				
			}else if(CODETYPE == "node_s_pkup"){
				sheetObj.cellValue2(sheetObj.selectRow, "pkup_nod_cd") = ""; 
				sheetObj.cellValue2(sheetObj.selectRow, "pkup_nod_nm") = ""; 
	
			}
		}
	}else{
		alert(getLabel('EQU_MST_MSG01'));		
	}
}

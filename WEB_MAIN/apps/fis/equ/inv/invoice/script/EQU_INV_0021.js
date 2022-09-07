function doWork(srcName){
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj = docObjects[0];
	var sheetObj1 = docObjects[1];
	var formObj  = document.frm1;

	switch(srcName) {
		case "SEARCHLIST":

//		sheetObj.ShowDebugMsg = true;
		formObj.f_cmd.value = SEARCHLIST;
			
		sheetObj.DoSearch4Post("EQU_INV_0021GS.clt", FormQueryString(formObj));
		break;
		case "SEARCHLIST01":

//			sheetObj.ShowDebugMsg = true;
			formObj.f_cmd.value = SEARCHLIST01
			sheetObj1.DoSearch4Post("EQU_INV_0021GS.clt", FormQueryString(formObj));
			break;
		case "APPLY":
			if ( !fncGridCheck() ) return false;
			
			formObj.f_cmd.value = MODIFY;
			if( confirm(getLabel('EQU_INV_MSG25')) ){
				sheetObj.DoSave("EQU_INV_0021GS.clt", FormQueryString(formObj),"ibflag",false);
			}
		break;
		case "CLOSE":
			window.close();
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
/*
    var arg=window.dialogArguments;
    
	formObj.s_inv_no.value    = arg[1];
	formObj.lr_trdp_cd.value  = arg[2];
	formObj.intg_bl_seq.value = arg[3];
	formObj.s_agmt_no.value   = arg[4];
	formObj.cy_cd.value       = arg[5];
	formObj.lr_trdp_nm.value  = arg[6];
*/
    var formObj  = document.frm1;
    formObj.s_inv_no.value		= opener.document.frm1.s_inv_no.value;
    formObj.lr_trdp_cd.value	= opener.document.frm1.s_lr_trdp_cd.value;
    formObj.intg_bl_seq.value	= opener.document.frm1.s_intg_bl_seq.value;
    formObj.s_agmt_no.value		= opener.document.frm1.s_agmt_no.value;
    formObj.lr_trdp_nm.value	= opener.document.frm1.s_lr_trdp_nm.value;
    
	// invoice no 를 받으면 자동으로  search한다.
	setTimeout("doWork('SEARCHLIST01')", 10);
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
               style.height = 300;
                
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
                InitColumnInfo(18, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(false, true, true, true, false,false) ;
                
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('EQU_INV_0021_HDR'), true);

                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
				InitDataProperty(0, 0,  dtCheckBox,       30,    daCenter,  true,    "chk",             false,   "",       dfNone,      0,     true,      true);
				InitDataProperty(0, 1,  dtHiddenStatus,   30,    daCenter,  true,    "ibflag");
				InitDataProperty(0, 2,  dtData,   		  30,    daCenter,  true,    "no", 				false,   "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0, 3,  dtData,   		  50,    daCenter,  true,    "cntr_sprl_trdp_cd",false,  "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0, 4,  dtPopup,		 110,    daCenter,  true,    "bkg_no", 			 true,   "",       dfNone,      0,     true,     false,	20);
				InitDataProperty(0, 5,  dtData,   		 120,    daCenter,  true,    "sr_no", 			false,   "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0, 6,  dtData,   		 120,    daCenter,  true,    "bl_no", 			false,   "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0, 7,  dtData,   		  50,    daCenter,  true,    "cntr_tpsz_cd", 	false,   "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0, 8,  dtPopup,	   	 100,    daCenter,  true,    "tot_cntr_no", 	false,   "",       dfNone,      0,     true,     false,	20);
				InitDataProperty(0, 9,  dtHidden,   	  40,    daCenter,  true,    "unit_prc", 		false,   "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0,10,  dtHidden,   	  40,    daCenter,  true,    "amt", 			false,   "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0,11,  dtHidden,   	  40,    daCenter,  true,    "intg_bl_seq", 	false,   "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0,12,  dtHidden,   	  40,    daCenter,  true,    "agmt_no",			false,   "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0,13,  dtHidden,   	  40,    daCenter,  true,    "lstm_cd",			false,   "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0,14,  dtHidden,   	  40,    daCenter,  true,    "pkup_nod_cd",		false,   "",       dfNone,      0,     false,     false,	20);
				InitDataProperty(0,15,  dtCombo,   	     100,    daCenter,  true,    "inv_smry_seq",	false,   "",       dfNone,      0,     true,     true,	20);
				InitDataProperty(0,16,  dtHidden,   	  50,    daCenter,  true,    "cntr_no",			false,   "",       dfNone,      0,     true,     true,	20);
				InitDataProperty(0,17,  dtHidden,		  40,    daCenter,  true,    "cntr_intg_bl_seq",false,   "",       dfNone,      0,     false,     false,	20);
				// 대문자 자동 치환
//				InitDataValid(0, "tot_cntr_no",vtEngUpOther, "0123456789" );

				
           }                                                      
           break;
         case 2:      //IBSheet1 init

             with (sheetObj) {
                 // 높이 설정
                style.height = 0;
                 
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
                 InitColumnInfo(12, 0, 0, true);

                 // 해더에서 처리할 수 있는 각종 기능을 설정한다
                 InitHeadMode(false, true, true, true, false,false) ;
                 
                 //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                 InitHeadRow(0, getLabel('EQU_INV_0021_HDR'), true);

                 //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
 				InitDataProperty(0, 0,  dtCheckBox,       40,    daCenter,  true,    "",             	false,   "",       dfNone,      0,     true,      true);
 				InitDataProperty(0, 1,  dtHiddenStatus,   40,    daCenter,  true,    "ibflag");
 				InitDataProperty(0, 2,  dtHidden,   	  40,    daCenter,  true,    "no", 				false,   "",       dfNone,      0,     false,     false,	20);
 				InitDataProperty(0, 3,  dtHidden,   	  60,    daCenter,  true,    "cntr_sprl_trdp_cd",false,   "",       dfNone,      0,     false,     false,	20);
 				InitDataProperty(0, 4,  dtHidden,   	  110,   daCenter,  true,    "bkg_no", 			false,   "",       dfNone,      0,     false,     false,	20);
 				InitDataProperty(0, 5,  dtHidden,   	  120,   daCenter,  true,    "sr_no", 			false,   "",       dfNone,      0,     false,     false,	20);
 				InitDataProperty(0, 6,  dtHidden,   	  120,   daCenter,  true,    "bl_no", 			false,   "",       dfNone,      0,     false,     false,	20);
 				InitDataProperty(0, 7,  dtData,   		  80,    daCenter,  true,    "cntr_tpsz_cd", 	false,   "",       dfNone,      0,     false,     false,	20);
 				InitDataProperty(0, 8,  dtHidden,   	  60,    daCenter,  true,    "cntr_no", 		false,   "",       dfNone,      0,     false,     false,	20);
 				InitDataProperty(0, 9,  dtHidden,   	  40,    daCenter,  true,    "unit_prc", 		false,   "",       dfNone,      0,     false,     false,	20);
 				InitDataProperty(0,10,  dtHidden,   	  40,    daCenter,  true,    "amt", 			false,   "",       dfNone,      0,     false,     false,	20);
 				InitDataProperty(0,11,  dtHidden,   	  40,    daCenter,  true,    "intg_bl_seq", 	false,   "",       dfNone,      0,     false,     false,	20);
 				
 				
            }                                                      
            break;
     }
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
	allRows = sheetObj.FindCheckedRow("chk");
	
	var arrAllRows = allRows.split("|");
	if(arrAllRows.length-1==0){
		return;
	}
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
		
		
		//CNTR_NO선택 안하면 return (2010.02.09 추가)
		if(sheetObj.cellValue(arrAllRows[idx],"cntr_sprl_trdp_cd")==""){
//			alert("Please Enter a [Cntr No] as No : "+arrAllRows[idx] );
			alert(getLabel('EQU_MSG_003') + arrAllRows[idx] );
			
			return;
		}
		//금액선택을 안하면 return (2010.02.09 추가)
		if(sheetObj.cellValue(arrAllRows[idx],"inv_smry_seq")==""){
//			alert("Please Enter a [Select Amount] as No : "+arrAllRows[idx] );
			alert(getLabel('EQU_MSG_004' + arrAllRows[idx] ));
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
					alert(cntr_nm[j]+' '+getLabel('EQU_INV_MSG22'));
					return false;
				}
			}
			// hidden에 없는 값일때
			if(hid_nm==cntr_nm[j])	dup_cnt[j]++;				
						
		}
		if(dup_cnt[j]==0){
			alert(cntr_nm[j]+' '+getLabel('EQU_INV_MSG23'));
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
					alert(smry_seq[j]+' '+getLabel('EQU_INV_MSG22'));
					return false;
				}
			}
			// hidden에 없는 값일때
			if(hid_nm==smry_seq[j])	dup_cnt[j]++;				
						
		}
		if(dup_cnt[j]==0){
			alert(smry_seq[j]+' '+getLabel('EQU_INV_MSG23'));
			return false;
		}
		
	}
    return true;
}

function sheet1_OnChange(sheetObj,Row,Col){
	var formObj  = document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "tot_cntr_no":	
			
			var totVal = sheetObj.cellValue(Row, "tot_cntr_no");
			var val = totVal.split(',');
			sheetObj.cellValue2(Row, "cntr_intg_bl_seq") = val[5];
			sheetObj.cellValue2(Row, "cntr_sprl_trdp_cd") = val[3];
			sheetObj.cellValue2(Row, "lstm_cd") = val[1];
			sheetObj.cellValue2(Row, "tot_cntr_no") = val[0];
			sheetObj.cellValue(Row, "cntr_no") = val[0];
		break;
		case "cntr_no":	
			if(sheetObj.CellValue(Row, Col)!==''){
				var cntr_no = sheetObj.cellValue(Row, "cntr_no");
				var duplRow = "";
				if(cntr_no != "X")
					duplRow = sheetObj.ColValueDup("cntr_no");
				
				if(duplRow>0 && sheetObj.cellValue(duplRow, "cntr_no")!="X"){
//					alert(duplRow+" : duplicate Container No!");
					alert(duplRow + getLabel('EQU_MSG_005'));
					sheetObj.cellValue2(duplRow, "tot_cntr_no") = "X";
					sheetObj.cellValue2(duplRow, "cntr_no") = "X";
					sheetObj.cellValue2(duplRow, "cntr_sprl_trdp_cd") = "";
					sheetObj.cellValue2(duplRow, "lstm_cd") = "";
					sheetObj.cellValue2(Row, "cntr_intg_bl_seq") = "";
					sheetObj.SelectCell(duplRow, "tot_cntr_no");
					return;
				}
			}
			
		break;
			
	}
	
}
function sheet1_OnSaveEnd() {
	alert(getLabel('EQU_INV_MSG24'));
	
	// 성공적으로 mapping 완료!
	var retArray = "";	
	
	retArray += "OK";
		 	
	window.returnValue=retArray;
	
	doWork('CLOSE');
		
}
function sheet1_OnPopupClick(sheetObj,Row,Col){
	var formObj = document.frm1;
	// 
	switch (sheetObj.ColSaveName(Col)) {
	
	case "bkg_no"://openMean S = 해운에서 오픈, A = 항공에서 오픈
 		var rtnarrBkg = new Array(1);
			rtnarrBkg[0] = "S";
			rtnarrBkg[1] = "O";
			rtnarrBkg[2] = "Y"; //equipment 일때 operator all설정
			
		var rtnValBkg = window.showModalDialog('./CMM_POP_0210.clt', rtnarrBkg, "scroll:yes;status:no;help:no;dialogWidth:815px;dialogHeight:480px");
    	if (rtnValBkg == "" || rtnValBkg == "undefined" || rtnValBkg == undefined) {
	 		return;
		}else{
			var rtnValAry = rtnValBkg.split("|");
			sheetObj.cellValue(Row, "intg_bl_seq") = rtnValAry[2];//bl_seq
			sheetObj.cellValue(Row, "bl_no") = rtnValAry[1];//bl_seq
			sheetObj.cellValue(Row, "bkg_no") = rtnValAry[0];//bkg_no
			
//			var intg_bl_seq =  rtnValAry[2];
			var inv_no = formObj.s_inv_no.value;
			
			ajaxSendPost(dispMappingAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchMappingCombo&flag=S&inv_no='+inv_no, './GateServlet.gsl');
		}
		
	break;
	//Container탭 Container Inventory 조회
	case "tot_cntr_no":
	
		var rtnarrCtr = new Array(1);
   		rtnarrCtr[0] = "1";
   		rtnarrCtr[1] = formObj.lr_trdp_cd.value;
   		rtnarrCtr[2] = formObj.lr_trdp_nm.value;
   		rtnarrCtr[3] = sheetObj.CellValue(Row, 'cntr_tpsz_cd');
   		
		var rtnValCtr = window.showModalDialog('./EQU_POP_0130.clt', rtnarrCtr, "scroll:yes;status:no;help:no;dialogWidth:550px;dialogHeight:480px");
        if (rtnValCtr == "" || rtnValCtr == "undefined" || rtnValCtr == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnValCtr.split("|");
//			sheetObj.CellValue(Row, 'cntr_no') 			 = rtnValAry[0];
			sheetObj.CellValue(Row, 'tot_cntr_no') 			= rtnValAry[0];
//			sheetObj.CellValue(Row, 'ls_cntr_tpsz_cd') 	 = rtnValAry[1];
//			sheetObj.CellValue(Row, 'cntr_sprl_trdp_cd') = rtnValAry[2];
//			sheetObj.CellValue(Row, 'cntr_sprl_trdp_nm') = rtnValAry[3];
			
		}
	break;
	}
}
function sheet2_OnSearchEnd() {
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	var shtCnt = sheetObj.rowCount;
	
	var fstStr = 'available Container ';
	var tmpStr = docObjects[1].cellValue(1, "cntr_tpsz_cd");
	
	// hidden 에 tmpStr을 넣어준다
	formObj.h_tot_cnt.value = tmpStr;
	getObj('invTxt').innerText = fstStr+tmpStr;
	
	var inv_no = formObj.s_inv_no.value;
	
	document.getElementById("s_inv_no").readOnly = true;

	//apply button을 보여준다.
	getObj('apply').style.display = 'block';
	
	doWork('SEARCHLIST');
	
	// sheet에 값이 있으면 실행.
	if(docObjects[0].rowcount>0){
		ajaxSendPost(dispMappingAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchMappingCombo&flag=A&inv_no='+inv_no, './GateServlet.gsl');
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
			
			for(var i=1;i<=sheetObj.rowCount;i++){
				
				// combo value 기본 빈칸1개.
				var val = "|";
				var name = " |";
				
				// cntr갯수만큼 for
				for(var j=0;j<masterVal1.length;j++){
					if(i==1)
					cnt  += masterVal0[j]+'. '+masterVal1[j]+":"+masterVal3[j]+"|";
					
					
					// 같을때만 추가추가
					if(sheetObj.cellValue(i, "cntr_tpsz_cd")==masterVal1[j]){
						
						val  += "|"+masterVal0[j];
						name += "|"+masterVal2[j];
					}
				}
				// combo item을 cell에 삽입.
				sheetObj.CellComboItem(i, "inv_smry_seq", name, val, 0);
				
				// flag 기본값으로 셋팅
				sheetObj.CellValue2(i, "ibflag") =  "";
			}
			//cntr 갯수정보를 hidden에 넣어준다.
			formObj.h_tpsz_cnt.value = cnt;
			
		}
	}else{
		alert(getLabel('EQU_INV_MSG01'));		
	}
}
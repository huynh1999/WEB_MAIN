var inv_viw_tp = 'A';
var rtnary = new Array(1);
function doWork(srcName){
	if(!btnVisible(srcName)){
		return;
	}
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj1 = docObjects[0];
	var sheetObj2 = docObjects[1];
	var sheetObj3 = docObjects[2];
	var sheetObj4 = docObjects[3];
    var formObj  = document.frm1;

    switch(srcName) {
		case "SEARCHLIST":
			
			var empCond = 0;
			if(formObj.f_house_bl_no.value==''){
				empCond++;
			}
			if(formObj.f_bkg_no.value==''){
				empCond++;
			}
			if(empCond==2){
				alert(getLabel('AIE_BMD_MSG76'));
				formObj.f_house_bl_no.focus();
			}else{
				doShowProcess();
	       		formObj.f_cmd.value = SEARCHLIST;
				formObj.action = "./AIE_FRT_0010.clt";
				formObj.submit();				
			}
		break;
		case "SEARCHLIST02":	//Selling/Debit Tariff 목록을 조회함
			if(frm1.intg_bl_seq.value!=''){
	       		formObj.f_cmd.value = SEARCHLIST02;
			    sheetObj1.DoSearch4Post("AIE_FRT_0010_1GS.clt", FormQueryString(formObj));
			}
		break;
		case "SEARCHLIST03":	//Buying/Credit Tariff 목록을 조회함
			if(frm1.intg_bl_seq.value!=''){
	       		formObj.f_cmd.value = SEARCHLIST03; 
			    sheetObj4.DoSearch4Post("AIE_FRT_0010_1GS.clt", FormQueryString(formObj));
			}   
		break;
		case "ROWADD":
			if(frm1.intg_bl_seq.value==''){
				alert(getLabel('AIR_MSG_072'));
				return;
			}else{
				var intRows2 = sheetObj1.Rows;
				var tmpRow = intRows2-1
				if(sheetObj1.CellValue(tmpRow, 'sell_buy_tp_cd')==''){
				  intRows2 = tmpRow;
				}
				sheetObj1.DataInsert(intRows2);

				//sheetObj1.CellValue2(intRows2, 'trdp_cd')  = frm1.hid_act_cd.value;
				//sheetObj1.CellValue2(intRows2, 'trdp_nm')  = frm1.hid_act_nm.value;
				
				//로그인 사용자와 Shipper가 동일한 국가이면 PP  ??
				//if(frm1.f_ofc_cnt_cd.value==frm1.hid_act_cnt_cd.value){
				//	sheetObj1.CellValue2(intRows2, 'frt_term_cd') = 'PP';
					
				//}else{
				//	sheetObj1.CellValue2(intRows2, 'frt_term_cd') = 'CC';
				//}
				sheetObj1.CellValue2(intRows2, "rat_curr_cd") = frm1.trf_cur_cd.value;
				sheetObj1.CellValue2(intRows2, "perf_curr_cd")= dfPerfCurr;

				sheetObj1.CellValue2(intRows2, "inv_curr_cd") = frm1.ofc_curr.value;
				if(frm1.ofc_curr.value==frm1.trf_cur_cd.value){	//Office Currency와 PPD의 Currency가 같은경우 Invoice curency를 1로
					sheetObj1.CellValue2(intRows2, "inv_xcrt") = 1;
				}else{
					sheetObj1.CellValue2(intRows2, "inv_xcrt") = frm1.dispCur.value;
				}			
				sheetObj1.CellValue2(intRows2, "inv_xcrt_dt") = frm1.xcrtDt.value;

				
				//perf_curr_cd
				sheetObj1.CellValue2(intRows2, "perf_xcrt")= 0;
				sheetObj1.CellValue2(intRows2, "perf_amt") = 0;
				sheetObj1.CellValue2(intRows2, "perf_vat_amt") = 0;
			}
		//파트너 정보를 Default로 넣어 준다.
		break;
		case "ROWADD1":
			if(frm1.intg_bl_seq.value==''){
				alert(getLabel('AIR_MSG_072'));
				return;
			}else{
				var intRows5 = sheetObj4.Rows;
				var tmpRow = intRows5-1
				if(sheetObj4.CellValue(tmpRow, "b_sell_buy_tp_cd")==''){
				  intRows5 = tmpRow;
				}
				sheetObj4.DataInsert(intRows5);
				
				//sheetObj4.CellValue2(intRows5, 'b_trdp_cd')  = frm1.hid_lin_cd.value;
				//sheetObj4.CellValue2(intRows5, 'b_trdp_nm')  = frm1.hid_lin_nm.value;
				
				sheetObj4.CellValue2(intRows5, "b_rat_curr_cd") = frm1.trf_cur_cd.value;
				sheetObj4.CellValue2(intRows5, "b_perf_curr_cd")= dfPerfCurr;
				
				sheetObj4.CellValue2(intRows5, "b_inv_curr_cd") = frm1.ofc_curr.value;
				if(frm1.ofc_curr.value==frm1.trf_cur_cd.value){	//Office Currency와 CCT의 Currency가 같은경우 Invoice curency를 1로
					sheetObj4.CellValue2(intRows5, "b_inv_xcrt") = 1;
				}else{
					sheetObj4.CellValue2(intRows5, "b_inv_xcrt") = frm1.dispCur.value;
				}
				sheetObj4.CellValue2(intRows5, "b_inv_xcrt_dt") = frm1.xcrtDt.value;

				sheetObj4.CellValue2(intRows5, "b_auto_trf_flg")= 'N';
				sheetObj4.CellValue2(intRows5, "b_perf_xcrt")= 0;
				sheetObj4.CellValue2(intRows5, "b_perf_amt") = 0;
				sheetObj4.CellValue2(intRows5, "b_perf_vat_amt") = 0;
			}
		break;
		case "SAVE":	//등록/수정/삭제시
			formObj.f_cmd.value = COMMAND01;
			
			var frtRow = docObjects[0].Rows;
			for(var i = 2; i < frtRow; i++){
				//Auto Tariff된 값 최초 저장시 
				if(docObjects[0].CellValue(i, 'auto_trf_flg')=='Y'&&docObjects[0].CellValue(i, 'frt_seq')==''){
					docObjects[0].CellValue(i, 'ibflag') = 'I';
				}
			}
			
			frtRow = docObjects[3].Rows;
			for(var i = 2; i < frtRow; i++){
				//Auto Tariff된 값 최초 저장시 
				if(docObjects[3].CellValue(i, 'b_auto_trf_flg')=='Y'&&docObjects[3].CellValue(i, 'b_frt_seq')==''){
					docObjects[3].CellValue(i, 'b_ibflag') = 'I';
				}
			}
			
	
			
			var firstCheck = checkInpuVals(sheetObj1, '');
			var secCheck   = checkInpuVals(sheetObj4, 'b_');
			
			var sdFlg = true;
			var bcFlg = true;
			
			if(firstCheck=='IV'){
				sdFlg = false;
				alert(getLabel('AIR_MSG_073'));
				
			}else if(secCheck=='IV'){
				bcFlg = false;
				alert(getLabel('AIR_MSG_074'));
				
			}else if(firstCheck=='NI'&&secCheck=='NI'){
				sdFlg = false;
				bcFlg = false;
				//There is no data to save!
			}

			if(sdFlg==true&&bcFlg==true){

				//Grid 초기화
				docObjects[1].RemoveAll();
				docObjects[2].RemoveAll();
				
				//Invoice Total 계산
				doSumFrt(sheetObj1, 1, '');  
				doSumFrt(sheetObj4, 2, 'b_');

				//PPD 값과 CCT값을 표시한다.
				doShowTotalTbl(docObjects[0], docObjects[1], docObjects[2]);
				//Do you want to PROCEED?
				if(confirm(getLabel('FMS_COM_CFMCON'))){
					//첫번째 탭 선택시에는 2번째 Sheet를 Submit함
					if(frm1.f_CurTab.value=='01'){
						sheetObj1.DoAllSave("./AIE_FRT_0010_1GS.clt", FormQueryString(formObj)+'&'+sheetObj4.GetSaveString(false), true);
						
					}else{
						sheetObj4.DoAllSave("./AIE_FRT_0010_1GS.clt", FormQueryString(formObj)+'&'+sheetObj1.GetSaveString(false), true);
					}
				}
			}
		break;
		case "PPDCURR":	//PPD에서 환률 팝업호출시
	   		rtnary = new Array(1);
	   		rtnary[0] = "2";
	   		var rtnVal = window.showModalDialog('./CMM_POP_0040.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:656px;dialogHeight:480px");
	   		
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry = rtnVal.split("|");
				frm1.ppdToCurrency.value = rtnValAry[1];//cd_nm
				
				
				if(frm1.ppdOrgCurr.value!=frm1.ppdToCurrency.value){
					var totNum = docObjects[1].Rows;
					for(var i = 1; i< totNum; i++){
						
						docObjects[1].CellEditable(i, "ppd_rate") = true;
						
						//1. PPDAT의  Ex.Rate, Inv.Amount의 값을 초기화 한다.
						docObjects[1].CellValue(i, 'ppd_rate') = '';
						docObjects[1].CellValue(i, 'ppd_invant') = '';
					}
				}
			}
		break;
		case "CCTCURR":	//CCT에서 환률 팝업호출시
	   		rtnary = new Array(1);
	   		rtnary[0] = "2";
	   		var rtnVal = window.showModalDialog('./CMM_POP_0040.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:656px;dialogHeight:480px");
	   		
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry = rtnVal.split("|");
				frm1.cctToCurrency.value = rtnValAry[1];//cd_nm
			}
		break;
		case "PPDAPPLY":	//PPD Total 변환시 목록에 적용
			if(frm1.ppdOrgCurr.value!=frm1.ppdToCurrency.value){
				applyCnt = 0;

				var totNum = docObjects[1].Rows;
				for(var i = 1; i< totNum; i++){
					//1. PPDAT의  Ex.Rate, Inv.Amount의 값을 초기화 한다.
					//docObjects[1].CellValue(i, 'ppd_rate') = '';
					
					//2. 상단 Selling/Debit Invoice Currency 정보 초기화
					docObjects[1].CellValue(i, 'ppd_invant') = applyTotCurInfo('PP', docObjects[1].CellValue(i, 0), docObjects[1].CellValue(i, 'ppd_rate'), frm1.ppdToCurrency.value);
				}
				
				//비교 키값을 재설정
				frm1.ppdOrgCurr.value = frm1.ppdToCurrency.value;
			}
		break;
		case "CCTAPPLY":	//CCT Total 변환시 목록에 적용
			if(frm1.cctOrgCurr.value!=frm1.cctToCurrency.value){
				applyCnt = 0;

				var totNum = docObjects[1].Rows;
				for(var i = 1; i< totNum; i++){
					//1. PPDAT의  Ex.Rate, Inv.Amount의 값을 초기화 한다.
					docObjects[1].CellValue(i, 'cct_rate') = '';
					docObjects[1].CellValue(i, 'cct_invant') = '';
					
					//2. 상단 Selling/Debit Invoice Currency 정보 초기화
					applyTotCurInfo('PP', docObjects[1].CellValue(i, 0), frm1.cctOrgCurr.value, frm1.cctToCurrency.value);
				}
				
				//비교 키값을 재설정
				frm1.cctOrgCurr.value = frm1.cctToCurrency.value;
			}
		break;
		case "HBL_POPLIST":
	  		rtnary = new Array(1);
				rtnary[0] = "A";	//openMean S = 해운에서 오픈, A = 항공에서 오픈
				rtnary[1] = "O";	//I: In-bound, O: Out-bound
	       	var rtnVal = window.showModalDialog('./CMM_POP_0170.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
	      
	       	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 		return;
			}else{
				var rtnValAry = rtnVal.split("|");
				formObj.f_bkg_no.value = '';
				formObj.f_house_bl_no.value = rtnValAry[0];//house_bl_no
				
				doWork('SEARCHLIST');
			}
		break;
		case "BKNO_POPLIST":
      		rtnary = new Array(1);
   			rtnary[0] = "A";	//openMean S = 해운에서 오픈, A = 항공에서 오픈
   			rtnary[1] = "O";	//I: In-bound, O: Out-bound
        	var rtnVal = window.showModalDialog('./CMM_POP_0210.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:815px;dialogHeight:480px");
        	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 		return;
			}else{
				var rtnValAry = rtnVal.split("|");
				formObj.f_house_bl_no.value = '';
				formObj.f_bkg_no.value      = rtnValAry[0];//bkg_no
				formObj.intg_bl_seq.value   = rtnValAry[2];//HBL PK
				doWork('SEARCHLIST');
			}
		break;
		case "APPLY":
			//Grid 초기화
			docObjects[1].RemoveAll();
			docObjects[2].RemoveAll();
			
			//Invoice Total 계산
			doSumFrt(sheetObj1, 1, '');  
			doSumFrt(sheetObj4, 2, 'b_');

			//PPD 값과 CCT값을 표시한다.
			doShowTotalTbl(docObjects[0], docObjects[1], docObjects[2]);
		break;
    }
}

function inpuValCheck(sheetObj, f_cmd, objPrefix){
	var rowCnt = sheetObj.rows;
	var isOk = true;
	var checkVal = false;
	var loopNum = 0;
	for(var i = 1; i < rowCnt; i++){
	   var stat = sheetObj.CellValue(i, objPrefix+'ibflag');
	   if(stat!='R'){
		   if(f_cmd==ADD&&stat=='I'){
			   checkVal = true;
			   loopNum++;
		   }else if(f_cmd==MODIFY&&stat=='U'){
			   checkVal = true;
			   loopNum++;
		   }	
	   }
	}
	return loopNum;
}

var applyCnt = 0;
function applyTotCurInfo(chgType, orgCurrency, newExRate, newCurrCd){
	var totNum = docObjects[0].Rows;

	var totInvAmt = 0;
	for(var i = 1;i < totNum; i++){
		//지정한 P/C 타입인지 확인
		if(docObjects[0].CellValue(i, "frt_term_cd")==chgType){
			
			//Tariff Currency와 PPD/CCT의 Currency가 동일한 경우 처리
			if(docObjects[0].CellValue(i, "rat_curr_cd")==orgCurrency){
                docObjects[0].CellValue(i, "inv_curr_cd") =  newCurrCd;//Currency Code
				docObjects[0].CellValue(i, "inv_xcrt")    =  newExRate;//Exchage Rate
				
				var tmpCntrCnt =  docObjects[0].CellValue(i, "qty");
				if(tmpCntrCnt==''){
					tmpCntrCnt = 1;
				}
				
				//((Rate*Countainer Count)+Vat)*Ex.Rate
				var tmpSum = getMultiplyFloat(tmpCntrCnt, docObjects[0].CellValue(i, "ru"));
				    tmpSum = getSumFloat     (tmpSum,     docObjects[0].CellValue(i, "vat_amt"));
	                tmpSum = getMultiplyFloat(tmpSum,     docObjects[0].CellValue(i, "inv_xcrt"));

				docObjects[0].CellValue(i, "inv_amt") = tmpSum;		//Invoice Amt 
				docObjects[0].CellValue(i, "inv_vat_amt") = getMultiplyFloat(tmpSum, docObjects[0].CellValue(i, "vat_rt"));
				
				totInvAmt = getSumFloat(totInvAmt, tmpSum);
                applyCnt++;
			}
		}
	}
	return totInvAmt;
}


function goTabSelect(isNumSep) {
    var tabObjs = document.getElementsByName('tabLayer');
    if( isNumSep == "01" ) {
        document.all.Tab01.className = "tab_head2";
        document.all.Tab02.className = "tab_head_non2";

        tabObjs[0].style.display = 'inline';
        tabObjs[1].style.display = 'none';
      
    } else if( isNumSep == "02" ) {
        document.all.Tab01.className = "tab_head_non2";
        document.all.Tab02.className = "tab_head2";

        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'inline';
    }
    frm1.f_CurTab.value = isNumSep;
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;

var headerRowCnt = 2;

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	 var formObj  = document.frm1;
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
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
        case 1:      //Selling/Debit 탭부분 init

            with (sheetObj) {
                // 높이 설정
                style.height = 270;
                
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
                InitRowInfo( 2, 1, 9, 100);

                //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
                InitColumnInfo(38, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;

                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('SEE_FRT_0010_HDR2_1'), true);
                InitHeadRow(1, getLabel('SEE_FRT_0010_HDR2_2'), true);

                //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0, 0,  dtDelCheck,    40,   daCenter,  true,    "del_chk",        false,   "",       dfNone,         1,     true,       true);
                InitDataProperty(0, 1,  dtHidden,       0,   daCenter,  true,    "frt_seq",        false,   "",       dfNone,         1,     true,       true);
                InitDataProperty(0, 2,  dtCheckBox,    40,   daCenter,  true,    "frt_check",      false,   "",       dfNone,         1,     false,      false);

                InitDataProperty(0, 3,  dtCombo,       50,   daCenter,  true,    "sell_buy_tp_cd", false,   "",       dfNone,         1,     true,       true);
                InitDataProperty(0, 4,  dtPopupEdit,   50,   daCenter,  true,    "frt_cd",         false,   "",       dfNone,         1,     true,       true);
                
                InitDataProperty(0, 5,  dtHidden,     120,   daLeft,    true,    "frt_cd_nm",      false,   "",       dfNone,         1,     false,      false);
                InitDataProperty(0, 6,  dtPopupEdit,   43,   daCenter,  true,    "trdp_cd",        false,   "",       dfNone,         1,     true,       true);
                InitDataProperty(0, 7,  dtData,       120,   daLeft,    true,    "trdp_nm",        false,   "",       dfNone,         1,     false,      false);
                InitDataProperty(0, 8,  dtPopupEdit,   40,   daCenter,  true,    "rat_curr_cd",    false,   "",       dfNone,         1,     true,       true);
               
                InitDataProperty(0, 9,  dtCombo,       65,   daCenter,  true,    "aply_ut_cd",     false,   "",       dfNone,         1,     true,       true);
                InitDataProperty(0,10,  dtHidden,      40,   daCenter,  true,    "cntr_tpsz_cd",   false,   "",       dfNone,         1,     true,       true);
                InitDataProperty(0,11,  dtData,        40,   daRight,   true,    "qty",            false,   "",       dfNone,         0,     true,       true);
 
                InitDataProperty(0,12,  dtCombo,       30,   daCenter,  true,    "scg_incl_flg",   false,   "",       dfNone,         1,     true,       true);
                InitDataProperty(0,13,  dtCombo,       30,   daCenter,  true,    "frt_term_cd",    false,   "",       dfNone,         1,     true,       true);
                InitDataProperty(0,14,  dtData,        70,   daRight,   true,    "ru",             false,   "",       dfNullFloat,    2,     true,       true);
                
                InitDataProperty(0,15,  dtData,        70,   daRight,   true,    "trf_cur_sum_amt",false,   "",       dfNullFloat,    2,     false,       false);
                
                InitDataProperty(0,16,  dtData,        23,   daRight,   true,    "vat_rt",         false,   "",       dfInteger,      0,     true,       true);
                InitDataProperty(0,17,  dtData,        70,   daRight,   true,    "vat_amt",        false,   "",       dfNullFloat,    2,     false,      false);

                InitDataProperty(0,18,  dtPopupEdit,   40,   daCenter,  true,    "inv_curr_cd",    false,   "",       dfNone,         1,     true,       true);
                InitDataProperty(0,19,  dtPopupEditFormat,50,daRight,   true,    "inv_xcrt",       false,   "",       dfNullFloat,    2,     true,       true);
                InitDataProperty(0,20,  dtHidden,       0,   daCenter,  true,    "inv_xcrt_dt",    false,   "",       dfNone,         0,     true,       true);
                InitDataProperty(0,21,  dtData,        70,   daRight,   true,    "inv_amt",        false,   "",       dfNullFloat,    2,     true,       true);
                InitDataProperty(0,22,  dtData,        70,   daRight,   true,    "inv_vat_amt",    false,   "",       dfNullFloat,    2,     true,       true);
                InitDataProperty(0,23,  dtData,        90,   daRight,   true,    "inv_sum_amt",    false,   "",       dfNullFloat,    2,     true,       true);

                InitDataProperty(0,24,  dtHidden,       0,   daCenter,  true,    "perf_curr_cd",   false,   "",       dfNone,         1,     true,       true);
                InitDataProperty(0,25,  dtHidden,      40,   daRight,   true,    "perf_xcrt",      false,   "",       dfNullFloat,    2,     true,       true);
                InitDataProperty(0,26,  dtHidden,      70,   daRight,   true,    "perf_amt",       false,   "",       dfNullFloat,    2,     true,       true);
                InitDataProperty(0,27,  dtHidden,      70,   daRight,   true,    "perf_vat_amt",   false,   "",       dfNullFloat,    2,     true,       true);
				
                InitDataProperty(0,28,  dtData,       100,   daLeft,    true,    "inv_no",         false,   "",       dfNone,         0,     false,      false);
                InitDataProperty(0,29,  dtHidden,       0,   daRight,   true,    "inv_sts_cd",     false,   "",       dfNone,         0,     false,      false);
                InitDataProperty(0,30,  dtData,       100,   daLeft,    true,    "inv_sts_nm",     false,   "",       dfNone,         0,     false,      false);

                InitDataProperty(0,31,  dtData,       100,   daLeft,    true,    "proc_dept_nm",   false,   "",       dfNone,         0,     false,      false);
                InitDataProperty(0,32,  dtData,       100,   daLeft,    true,    "proc_usrnm",     false,   "",       dfNone,         0,     false,      false);

                InitDataProperty(0,33,  dtHidden,       0,   daRight,   true,    "auto_trf_flg");
                InitDataProperty(0,34,  dtData,       100,   daRight,   true,    "trf_ctrt_no",    false,   "",       dfNone,         0,     false,      false);
                InitDataProperty(0,35,  dtData,        80,   daRight,   true,    "trf_dtl_seq",    false,   "",       dfNone,         0,     false,      false);
                
                InitDataProperty(0,36,  dtHiddenStatus, 0,   daCenter,  true,    "ibflag",         false,   "",      dfNone,         1,     true,       true);
                InitDataProperty(0,37,  dtHidden,       0,   daRight,   true,    "frt_ask_clss_cd");
                
				HeadRowHeight = 20 ;
				HeadRowHeight = 21;

				InitDataCombo(0, 'sell_buy_tp_cd', "Selling|Debit", "S|D");     //S/D
				InitDataCombo(0, 'scg_incl_flg',   "N|Y", "N|Y"); //Inc.
				InitDataCombo(0, 'frt_term_cd',    "P|C", "PP|CC"); //P/C
				InitDataCombo(0, 'aply_ut_cd',      UNITCD1, UNITCD2); //P/C
           }                                                      
       break;
       case 2:      //Total PPAD표시 init
           with (sheetObj) {
               // 높이 설정
               style.height = 120;
               
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
               InitColumnInfo(4, 0, 0, true);

               // 해더에서 처리할 수 있는 각종 기능을 설정한다
               InitHeadMode(true, true, true, true, false,false) ;

               //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
               InitHeadRow(0, getLabel('SEE_FRT_0010_HDR3'), false);

               //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
               InitDataProperty(0, 0,  dtData,       90,   daCenter, false,    "ppd_curr",   false,   "",       dfNull,         0,     false,       false);
               InitDataProperty(0, 1,  dtPopup,     100,   daRight,  false,    "ppd_rate",   false,   "",       dfNullFloat,    4,     false,       false);
               InitDataProperty(0, 2,  dtData,      120,   daRight,  false,    "ppd_amt",    false,   "",       dfNullFloat,    2,     false,       false);
               InitDataProperty(0, 3,  dtAutoSum,   120,   daRight,  false,    "ppd_invant", false,   "",       dfNullFloat,    2,     false,       false);
               
               sheetObj.AutoSumBottom = -1;
          }                                                      
      break;
      case 3:      //Total CCT AT표시 init
           with (sheetObj) {
               // 높이 설정
               style.height = 120;
               
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
               InitColumnInfo(4, 0, 0, true);

               // 해더에서 처리할 수 있는 각종 기능을 설정한다
               InitHeadMode(true, true, true, true, false,false) ;

               //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
               InitHeadRow(0, getLabel('SEE_FRT_0010_HDR3'), false);

               //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
               InitDataProperty(0, 0,  dtData,       90,   daCenter,  false,    "cct_curr",   false,   "",       dfNull,         0,     false,       false);
               InitDataProperty(0, 1,  dtPopup,     100,   daRight,   false,    "cct_rate",   false,   "",       dfNullFloat,    2,     false,       false);
               InitDataProperty(0, 2,  dtData,      120,   daRight,   false,    "cct_amt",    false,   "",       dfNullFloat,    2,     false,       false);
               InitDataProperty(0, 3,  dtAutoSum,   120,   daRight,   false,    "cct_invant", false,   "",       dfNullFloat,    2,     false,       false);
          }                                                      
      break;
      case 4:      //Buying/Credit 탭부분 init
          with (sheetObj) {
              // 높이 설정
              style.height = 320;
              
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
              InitRowInfo( 2, 1, 9, 100);

              //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
              InitColumnInfo(38, 0, 0, true);

              // 해더에서 처리할 수 있는 각종 기능을 설정한다
              InitHeadMode(true, true, true, true, false,false) ;

              //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
              InitHeadRow(0, getLabel('SEE_FRT_0010_HDR4_1'), true);
              InitHeadRow(1, getLabel('SEE_FRT_0010_HDR4_2'), true);

              //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
              InitDataProperty(0, 0,  dtDelCheck,    40,   daCenter,  true,    "b_del_chk",        false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0, 1,  dtHidden,       0,   daCenter,  true,    "b_frt_seq",        false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0, 2,  dtCheckBox,    40,   daCenter,  true,    "b_frt_check",      false,   "",       dfNone,         1,     false,      false);
              InitDataProperty(0, 3,  dtCombo,       50,   daCenter,  true,    "b_sell_buy_tp_cd", false,   "",       dfNone,         1,     true,       true);

              InitDataProperty(0, 4,  dtPopupEdit,   50,   daCenter,  true,    "b_frt_cd",         false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0, 5,  dtHidden,     120,   daLeft,    true,    "b_frt_cd_nm",      false,   "",       dfNone,         1,     false,      false);
              InitDataProperty(0, 6,  dtPopupEdit,   43,   daCenter,  true,    "b_trdp_cd",        false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0, 7,  dtData,       120,   daLeft,    true,    "b_trdp_nm",        false,   "",       dfNone,         1,     false,      false);
              InitDataProperty(0, 8,  dtPopupEdit,   40,   daCenter,  true,    "b_rat_curr_cd",    false,   "",       dfNone,         1,     true,       true);
             
              InitDataProperty(0, 9,  dtCombo,       65,   daCenter,  true,    "b_aply_ut_cd",     false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0,10,  dtHidden,      40,   daCenter,  true,    "b_cntr_tpsz_cd",   false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0,11,  dtData,        40,   daRight,   true,    "b_qty",            false,   "",       dfNone,         0,     true,       true);

              InitDataProperty(0,12,  dtCombo,       30,   daCenter,  true,    "b_scg_incl_flg",   false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0,13,  dtCombo,       30,   daCenter,  true,    "b_frt_term_cd",    false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0,14,  dtData,        70,   daRight,   true,    "b_ru",             false,   "",       dfNullFloat,    2,     true,       true);
              
              InitDataProperty(0,15,  dtData,        70,   daRight,   true,    "b_trf_cur_sum_amt",false,   "",       dfNullFloat,    2,     false,      false);
              
              InitDataProperty(0,16,  dtData,        23,   daRight,   true,    "b_vat_rt",         false,   "",       dfInteger,      1,     true,       true);
              InitDataProperty(0,17,  dtData,        70,   daRight,   true,    "b_vat_amt",        false,   "",       dfNullFloat,    2,     false,      false);
              
              InitDataProperty(0,18,  dtPopupEdit,   40,   daCenter,  true,    "b_inv_curr_cd",    false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0,19,  dtPopupEditFormat,50,daRight,   true,    "b_inv_xcrt",       false,   "",       dfNullFloat,    2,     true,       true);
              InitDataProperty(0,20,  dtHidden,       0,   daCenter,  true,    "b_inv_xcrt_dt",    false,   "",       dfNone,         0,     true,       true);
              InitDataProperty(0,21,  dtData,        70,   daRight,   true,    "b_inv_amt",        false,   "",       dfNullFloat,    2,     true,       true);
              InitDataProperty(0,22,  dtData,        70,   daRight,   true,    "b_inv_vat_amt",    false,   "",       dfNullFloat,    2,     true,       true);
              InitDataProperty(0,23,  dtData,        90,   daRight,   true,    "b_inv_sum_amt",    false,   "",       dfNullFloat,    2,     true,       true);
             
              InitDataProperty(0,24,  dtHidden,       0,   daRight,   true,    "b_perf_curr_cd",   false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0,25,  dtHidden,      80,   daRight,   true,    "b_perf_xcrt",      false,   "",       dfNullFloat,    4,     true,       true);
              InitDataProperty(0,26,  dtHidden,     120,   daRight,   true,    "b_perf_amt",       false,   "",       dfNullFloat,    2,     true,       true);
              InitDataProperty(0,27,  dtHidden,       0,   daRight,   true,    "b_perf_vat_amt",   false,   "",       dfNullFloat,    4,     true,       true);

              InitDataProperty(0,28,  dtData,       100,   daLeft,    true,    "b_inv_no",         false,   "",       dfNone,         0,     false,      false);
              InitDataProperty(0,29,  dtHidden,       0,   daRight,   true,    "b_inv_sts_cd",     false,   "",       dfNone,         0,     false,      false);
              InitDataProperty(0,30,  dtData,       100,   daLeft,    true,    "b_inv_sts_nm",     false,   "",       dfNone,         0,     false,      false);

              InitDataProperty(0,31,  dtData,       100,   daLeft,    true,    "b_proc_dept_nm",   false,   "",       dfNone,         0,     false,      false);
              InitDataProperty(0,32,  dtData,       100,   daLeft,    true,    "b_proc_usrnm",     false,   "",       dfNone,         0,     false,      false);

              InitDataProperty(0,33,  dtHidden,       0,   daRight,   true,    "b_auto_trf_flg");
              InitDataProperty(0,34,  dtData,       100,   daRight,   true,    "b_trf_ctrt_no",    false,   "",       dfNone,         0,     false,      false);
              InitDataProperty(0,35,  dtData,        80,   daRight,   true,    "b_trf_dtl_seq",    false,   "",       dfNone,         0,     false,      false);

              InitDataProperty(0,36,  dtHiddenStatus, 0,   daCenter,  true,    "b_ibflag",         false,   "",       dfNone,         1,     true,       true);
              InitDataProperty(0,37,  dtHidden,       0,   daRight,   true,    "b_frt_ask_clss_cd");
				

			  HeadRowHeight = 20;
			  HeadRowHeight = 21;
			  
			  InitDataCombo(0, 'b_sell_buy_tp_cd', "Buying|Credit", "B|C");     //S/D
			  InitDataCombo(0, 'b_scg_incl_flg',   "N|Y", "N|Y"); //Inc.
			  InitDataCombo(0, 'b_frt_term_cd',    "P|C", "PP|CC"); //P/C
			  InitDataCombo(0, 'b_aply_ut_cd',      UNITCD1, UNITCD2); //P/C
         }                                                      
     break;
    }
}

//------------------------------------두 번째 Sheet 처리------------------------------------
function sheet1_OnClick(sheetObj, row, col){
	mutiSheetOnClick(sheetObj, row, col, '');
}

function sheet1_OnPopupClick(sheetObj, row, col) {
	mutiSheetOnPopupClick(sheetObj, row, col, '');
}

/**
 * Type/Size에 따른 Volume(수량) 체크
 */
function sheet1_OnChange(sheetObj, row, col) {
	//#2348 [IMPEX] Pop up error message not closing after click OK
	cntrTpSzFlag = true;
	mutiSheetOnChange(sheetObj, row, col, '')
}

function sheet1_OnSearchEnd(sheetObj, row, col) {
	//버튼 초기화
	cnfCntr('SD');
	
	//PPD, CCT, Total 계산
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
}

function sheet1_OnSaveEnd(sheetObj, row, col) {
	//버튼 초기화
	cnfCntr('SD');

	//PPD, CCT, Total 계산
	mutiSheetOnSearchEnd(sheetObj, row, col, '1', '');
	
	doWork('SEARCHLIST03');
	
	dispProfit();
	
	//선택버튼 초기화
	sdCheckTrdp = '';
	sdCheckCnt  = 0;
}

//------------------------------------다섯번째 Sheet 처리------------------------------------
function sheet4_OnPopupClick(sheetObj, row, col) {
	mutiSheetOnPopupClick(sheetObj, row, col, 'b_');
}

function sheet4_OnClick(sheetObj, row, col){
	mutiSheetOnClick(sheetObj, row, col, 'b_');
}

/**
 * Type/Size에 따른 Volume(수량) 체크
 */
function sheet4_OnChange(sheetObj, row, col) {
	//#2348 [IMPEX] Pop up error message not closing after click OK
	cntrTpSzFlag = true;
	mutiSheetOnChange(sheetObj, row, col,  'b_')
}

function sheet4_OnSearchEnd(sheetObj, row, col) {
	cnfCntr('BC');
	
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
}

function sheet4_OnSaveEnd(sheetObj, row, col) {
	cnfCntr('BC');
	
	mutiSheetOnSearchEnd(sheetObj, row, col, 2, 'b_');
	
	doWork('SEARCHLIST02');
	
	dispProfit();
	
	//선택버튼 초기화
	bcCheckTrdp = '';
	bcCheckCnt  = 0;
}


/**
 * 기본 세률 조회
 */
function setTaxRate(reqVal){
    var doc = getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
    	var sheetObj = docObjects[0];
    	if(frm1.f_CurTab.value=='02'){
    		sheetObj = docObjects[3];
    	}
    	
    	var cellNm = frm1.objPfx.value+"vat_rt";
		sheetObj.CellValue(frm1.curRow2.value, cellNm) =  doc[1];
    }
}


function mutiSheetOnSearchEnd(sheetObj, row, col, callType, objPfx) {

	//Freight 항목이 등록이 된 경우에만 후 처리
	if(sheetObj.CellValue(2, objPfx+'trdp_cd')!=''){

		//Total 값을 Display한다.
		doSumFrt(sheetObj, callType, objPfx);
	
		if(callType==1){
			docObjects[1].RemoveAll(); 
			docObjects[2].RemoveAll();

			//PPD 값과 CCT값을 표시한다.
			doShowTotalTbl(sheetObj, docObjects[1], docObjects[2]);		
		}else{
			//Profit 표시
			dispProfit();
		}
	}
}


/**
 * Selling/Debit에서 코드입력시 Name조회
 */
function sheet1_OnKeyUp(sheetObj, row, col, keyCode){
	if(keyCode==9){
		var curCols = sheetObj.cols;
		curCols--;
		if(curCols!=col){
			col--;
		}
		doAutoComplete('', sheetObj, row, col)	
	}
}

/**
 * Buying/Credit에서 코드입력시 Name조회
 */
function sheet4_OnKeyUp(sheetObj, row, col, keyCode){
	if(keyCode==9){
		var curCols = sheetObj.cols;
		curCols--;
		if(curCols!=col){
			col--;
		}
		doAutoComplete('b_', sheetObj, row, col)
	}
}

function sheet1_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, '');
}

function sheet4_OnDblClick(sheetObj, row, col){
	mutiSheetDblClick(sheetObj, row, col, 'b_');
}


/**
 * Default Fregiht를 화면에 표시함
 */
function dispDfltAjaxReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split(';');
			var curSheet;
			if(curTab=='b_'){
				doDispDfltFrt(rtnArr, 'b_', 'ROWADD1', docObjects[3])
			}else{
				doDispDfltFrt(rtnArr, '',   'ROWADD',  docObjects[0])
			}
		}
	}else{
//		alert('실패');
		alert(getLabel('AIR_MSG_075'));
	}
}	


/**
 * Selling/Debit Sheet를 리턴함
 */
function getSdSheet(){
	return docObjects[0];
}

/**
 * Buying/Selling Sheet를 리턴함
 */
function getBcSheet(){
	return docObjects[3];
}

/**
 * Selling/Debit
 */
function getSdUrl(){
	return './AIE_FRT_0010_1GS.clt';
}


var rtnary = new Array(1);
function doWork(srcName){
	if(!btnVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj = docObjects[0];
    var sheetObj1 = docObjects[1];
    var formObj  = document.frm1;

    switch(srcName) {
    case "SEARCHLIST":

	   //sheetObj.ShowDebugMsg = true;
        formObj.f_cmd.value = SEARCHLIST;
        
       	sheetObj.DoSearch4Post("EQU_INV_0020GS.clt", FormQueryString(formObj));
        //sheetObj.ShowDebugMsg = false;
       	
       	getObj('excel').style.display = 'inline';
       	getObj('prn').style.display = 'inline';
       	
    break;
    case "SEARCHLIST01":

    	   //sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value = SEARCHLIST01;
           	sheetObj1.DoSearch4Post("EQU_INV_0020_1GS.clt", FormQueryString(formObj));
            //sheetObj.ShowDebugMsg = false;
    break;
    case "NEW":
   	   formObj.reset();
   	   fncFromToDate();
   	   sheetObj.RemoveAll();
   	   sheetObj1.RemoveAll();
    break;
       
    case "MODIFY":
        formObj.f_cmd.value = MODIFY;
        
        // grid value validation
        if ( !fncGridCheck() ) return false;
        
        if( confirm(getLabel('EQU_INV_MSG09')) ){
        	sheetObj.DoSave("EQU_INV_0020GS.clt", FormQueryString(formObj),"ibflag",false);
        }
    break;
    
    case "MAPPING" :
    	
    	// checked 된 것의 invoice no를 가져온다.
    	var chkRow = sheetObj.FindCheckedRow("chk");
    	
    	
    	// 체크된것이 없으면 mapping불가.
    	if(chkRow ==""){
    		alert(getLabel('EQU_INV_MSG26'));
    		return;
    	}
    	chkRow = chkRow.replaceAll("\|", "");
    	
    	// Status가 ISSUED인것은 MAPPING불가.
    	if(sheetObj.cellvalue(chkRow, "inv_sts_cd")=='IS'){
    		alert(getLabel('EQU_INV_MSG33'));
    		return;
    	}
    	// detail내역이 0 일경우 mapping을 하지 않는다.
    	if(sheetObj.cellValue(chkRow, "cntr_cnt")=="0"){
    		alert(getLabel('EQU_INV_MSG27'));
    		return;
    	}
/*      		
   		rtnary = new Array(1);
      		rtnary[0] = "1";
      		rtnary[1] = sheetObj.cellvalue(chkRow, "inv_no");
      		rtnary[2] = sheetObj.cellvalue(chkRow, "lr_trdp_cd");
      		rtnary[3] = sheetObj.cellvalue(chkRow, "intg_bl_seq");
      		rtnary[4] = sheetObj.cellvalue(chkRow, "agmt_no");
      		rtnary[5] = sheetObj.cellvalue(chkRow, "cy_cd");
      		rtnary[6] = sheetObj.cellvalue(chkRow, "lr_trdp_nm");
      		var rtnVal = window.showModalDialog('./EQU_INV_0021.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:850px;dialogHeight:450px");
           if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
   		 	return;
   		 	
   		}else{
   			var rtnValAry = rtnVal.split("|");
   			
   			// mapping처리한 row의 detail내역을 보여준다.
   			sheet1_OnDblClick(sheetObj, chkRow, 5);
   			
   		}
*/   		
    	formObj.s_inv_no.value = sheetObj.cellvalue(chkRow, "inv_no");
    	formObj.s_lr_trdp_cd.value = sheetObj.cellvalue(chkRow, "lr_trdp_cd");
    	formObj.s_intg_bl_seq.value = sheetObj.cellvalue(chkRow, "intg_bl_seq");
    	formObj.s_agmt_no.value = sheetObj.cellvalue(chkRow, "agmt_no");
    	formObj.s_lr_trdp_nm.value = sheetObj.cellvalue(chkRow, "lr_trdp_nm");
//			myform.insertBefore(createHidden("returnUrl","http://www.ctradeworld.com/logis/mf/mf3510q0.jsp"));
		
		formObj.action="./EQU_INV_0021.clt";
		formObj.method="post";
		formObj.target="winName";
		
		window.open("about:blank","winName",'left=200, top=200, width=850, height=450');
		
		formObj.submit();
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
       
    case "EXCEL":
    	sheetObj.SpeedDown2Excel(true);
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
			
			formObj.lr_trdp_cd.value = rtnValAry[0];//loc_cd 
//			formObj.lr_trdp_nm.value  = rtnValAry[2];//loc_nm
			
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
 			formObj.cs_trdp_cd.value = rtnValAry[0]; 
 			formObj.cs_trdp_nm.value  = rtnValAry[2];//loc_nm
 		}
 	break;
    case "INVOICE_POPLIST" :
        
		rtnary = new Array(1);
   		rtnary[0] = "1";
   		rtnary[1] = ""; // invoice status
   		
   		var rtnVal = window.showModalDialog('./EQU_POP_0110.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:360px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			
			formObj.inv_no.value = rtnValAry[0];//sr_no
				
		}
	break;
	
    case "PRINT":
    	var param = 'cmd_type=13';
    	param += '&title=Container Supplying List';
    	param += '&fm_rgst_dt=' + formObj.fm_rgst_dt.value;
    	param += '&to_rgst_dt=' + formObj.to_rgst_dt.value;
    	param += '&bkg_no=' + formObj.bkg_no.value;
    	param += '&cs_trdp_cd=' + formObj.cs_trdp_cd.value;
    	param += '&lr_trdp_cd=' + formObj.lr_trdp_cd.value;
    	param += '&inv_no=' + formObj.inv_no.value;
    	param += '&equ_sts_cd=' + formObj.equ_sts_cd.value;
    	param += '&cntr_no=' + formObj.cntr_no.value;
    	
    	popGET('RPT_PRN_0050.clt?'+param, '', 1025, 740, "scroll:yes;status:no;help:no;");
    break;
    
    
    case "InvoicePrint":
    	var selectRow = sheetObj.SelectRow;
    	if(selectRow == 0 ){
   			alert(getLabel('EQU_MSG_002'));
   			return;
   		}
		var param = "open_type=G";
		param += "&inv_no=" + sheetObj.CellValue(selectRow, "inv_no");
		//필수 입력 값이어서 넣는 값
		param += "&sell_buy_tp_cd=S";
		param += "&air_sea_clss_cd=S";
		param += "&frt_ask_clss_cd=BL";

		popGET('RPT_PRN_0040.clt?'+param, '', 385, 330, "scroll:yes;status:no;help:no;");
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
    fncFromToDate();
}
function fncFromToDate() {
	var formObj = document.frm1;
	
	// 오늘 날짜 가져오기
	var now 	= new Date(); 				// 현재시간 가져오기
	var year	= now.getYear(); 			// 년도 가져오기

	formObj.fm_rgst_dt.value = year+'-01-01';
	formObj.to_rgst_dt.value = year+'-12-31';
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
               style.height = 240;
                
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
                InitColumnInfo(30, 5, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, false, true, false,false) ;
                
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('EQU_INV_0020_HDR'), true);

                //데이터속성    [ROW, COL,  DATATYPE,    WIDTH,    DATAALIGN, COLMERGE, SAVENAME,  KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
				InitDataProperty(0, cnt++,  dtDelCheck,		30,    daCenter,	true,    "chk",				false,	"",       dfNone,      0,     true,	true);
				InitDataProperty(0, cnt++,  dtHiddenStatus,	40,    daCenter,	true,    "ibflag");
				
				InitDataProperty(0, cnt++,  dtHidden,		40,    daCenter,	true,    "no", 			false,	"",       dfNone,      0,     false,	false,	3);
				InitDataProperty(0, cnt++,  dtData,			80,    daCenter,	true,    "rgst_tms",	false,	"",       dfUserFormat,0,     false,	false,	20);    
				InitDataProperty(0, cnt++,  dtData,			100,   daLeft,		true,    "inv_no",		false,	"",       dfNone,      0,     false,	false,	20);    
				InitDataProperty(0, cnt++,  dtHidden,	  	105,   daLeft,		true,    "bkg_no",		false,	"",       dfNone,      0,     false, 	false,	20);    
				InitDataProperty(0, cnt++,  dtHidden,		100,   daLeft,		true,    "cnee_trdp_nm",false,	"",       dfNone,      0,     false,	false,	20);
				
				InitDataProperty(0, cnt++,  dtData,			120,   daLeft,		true,    "cntr_tpsz_cd",false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtCombo,		100,   daLeft,		true,    "inv_sts_cd",	false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtCombo,		80,    daLeft,		true,    "equ_sts_cd",	false,	"",       dfNone,      0,     false,	false,	20);
				
				InitDataProperty(0, cnt++,  dtData,			100,   daLeft,		true,    "pol_nm",		false,	"",       dfNone,      0,     false,	false,	20);    
				InitDataProperty(0, cnt++,  dtData,			100,   daLeft,		true,    "cy_nm",		false,	"",       dfNone,      0,     false,	false,	20);    
				InitDataProperty(0, cnt++,  dtData,			100,   daLeft,		true,    "lr_trdp_nm",	false,	"",       dfNone,      0,     false,	false,	20);
				
				InitDataProperty(0, cnt++,  dtData,			80,    daLeft,		true,    "ref_no",		false,	"",       dfNone,      0,      true,	false,	10);    
				InitDataProperty(0, cnt++,  dtData,			80,    daLeft,		true,    "cnt_nm",		false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,	        50,    daCenter,	true,    "curr_cd",	    false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,	    	100,   daRight,		true,    "inv_ttl_amt",	false,	"",       dfFloat,     2,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,	    	100,   daRight,		true,    "used_amt",	false,	"",       dfFloat,     2,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,	    	100,   daRight,		true,    "x_amt",		false,	"",       dfFloat,     2,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtHidden,	    	100,   daRight,		true,    "pay_amt",		false,	"",       dfFloat,     2,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtHidden,	    	100,   daRight,		true,    "bal_amt",		false,	"",       dfFloat,     2,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtImageText,     70,   daCenter,    true,    "inv_prt",     false,      "",    dfNone,   0,     false,      true);
                InitDataProperty(0, cnt++,  dtHidden,     70,   daCenter,    true,    "inv_cancel",  false,      "",    dfNone,   0,     false,      true);
                InitDataProperty(0, cnt++,  dtData,			 80,   daCenter,	true,    "slip_no",		false,	"",       dfNone,      0,      true,	false,	200);    
				InitDataProperty(0, cnt++,  dtData,			200,   daLeft,		true,    "inv_rmk",		false,	"",       dfNone,      0,      true,	false,	200);    

				InitDataProperty(0, cnt++,  dtHidden,		60,    daLeft,		true,    "lr_trdp_cd",	false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtHidden,		60,    daLeft,		true,    "cntr_cnt",	false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtHidden,		60,    daLeft,		true,    "intg_bl_seq",	false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtHidden,		60,    daLeft,		true,    "agmt_no",	    false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtHidden,		60,    daLeft,		true,    "cy_cd",	    false,	"",       dfNone,      0,     false,	false,	20);
				
				
				InitDataCombo (0, "equ_sts_cd", PARAM1_1, PARAM1_2);	//com_cd_dtl에서 가져온 코드값.
				InitDataCombo (0, "inv_sts_cd", PARAM2_1, PARAM2_2);	//com_cd_dtl에서 가져온 코드값.
				
				PopupImage	= APP_PATH+"/web/img/button/btns_search.gif";
				
		         //Cell Image display
		        ImageList(0) = APP_PATH+"/web/img/button/btn_print.gif";
		        ImageList(1) = APP_PATH+"/web/img/button/btn_cancel.gif";
		        
		        InitDataImage(0, 10, daRight);
		        InitDataImage(0, 11, daRight);
				
				InitUserFormat(0, "rgst_tms",  "####-##-##", "-");
				// 대문자 자동 치환
				InitDataValid(0, "ref_no",vtEngUpOther, "0123456789" );
				InitDataValid(0, "bkg_no",vtEngUpOther, "0123456789" );
           }                                                      
        break;
        case 2:      //IBSheet1 init

             with (sheetObj) {
                 // 높이 설정
                style.height = 160;
                 
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
                 InitHeadRow(0, getLabel('EQU_INV_0020_1_HDR'), true);

                 //데이터속성    [ROW, COL,  DATATYPE,    WIDTH,    DATAALIGN, COLMERGE, SAVENAME,  KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
 				InitDataProperty(0, 0,  dtHiddenStatus,	40,    daCenter,	true,    "dtl_ibflag");
 				InitDataProperty(0, 1,  dtData,			40,    daCenter,	true,    "inv_dtl_seq",		false,	"",       dfNone,      0,     false,	false,	20);
 				InitDataProperty(0, 2,  dtData,		   120,    daLeft,		true,    "bkg_no",		    false,	"",       dfNone,      0,     false,	false,	20);    
 				InitDataProperty(0, 3,  dtHidden,		 0,    daLeft,		true,    "intg_bl_seq",		false,	"",       dfNone,      0,     false,	false,	20);    
 				InitDataProperty(0, 4,  dtData,		   120,    daLeft,		true,    "bl_no",		    false,	"",       dfNone,      0,     false,	false,	20);    
 				InitDataProperty(0, 5,  dtData,		   120,    daLeft,		true,    "sr_no",		    false,	"",       dfNone,      0,     false,	false,	20);    

 				InitDataProperty(0, 6,  dtData,		   50,     daLeft,		true,    "cntr_tpsz_cd",	false,	"",       dfNone,      0,     false,	false,	20);
 				InitDataProperty(0, 7,  dtData,		   90,     daLeft,		true,    "cntr_no",			false,	"",       dfNone,      0,     false,	false,	20);    
 				InitDataProperty(0, 8,  dtData,	       120,    daRight,		true,    "unit_prc",		false,	"",       dfFloat,     2,     false,	false,	20);    
 				InitDataProperty(0, 9,  dtData,		   140,    daRight,		true,    "amt",				false,	"",       dfFloat,     2,     false,	false,	20);        
 				
 				InitDataProperty(0,10,  dtData,			80,    daCenter,	true,    "rgst_tms",		false,	"",       dfNone,      0,     false,	false,	20);    
 				InitDataProperty(0,11,  dtHidden,		80,    daLeft,		true,    "inv_no",			false,	"",       dfNone,      0,     false,	false,	20);    
 				
            }                                                      
            break;
     }
}
// validation check
function fncGridCheck() {
	var sheetObj = docObjects[0];
	var intRow = sheetObj.Rowcount;
	for ( var i = 1 ; i <= intRow ; i++ ) {
		if ( parseFloat(sheetObj.CellValue(i, "unit_prc")) <= 0) {
			alert(i+" Row "+getLabel('EQU_INV_MSG20'));
			sheetObj.SelectCell(i, "unit_prc");
		return false;
		}
		if ( parseInt(sheetObj.CellValue(i, "qty")) <= 0) {
			alert(i+" Row "+getLabel('EQU_INV_MSG19'));
			sheetObj.SelectCell(i, "qty");
			return false;
		}
	}
	return true;
}

function sheet1_OnSearchEnd() {
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	var sheetObj1 = docObjects[1];
	var rowcount = docObjects[0].rowCount;
	
	sheetObj1.RemoveAll();
	// 기존에 booking no가 있으면 해당컬럼은 수정 불가능.
	for(var i=1;i<=sheetObj.rowCount;i++){
		if(sheetObj.cellValue(i, "bkg_no")==""){
			sheetObj.cellEditable(i, "bkg_no") = true;
		}		
	}
	sheetObj.ShowSubSum("curr_cd", "16|17|18|19|20", 2, false, false, 14, "cnt_nm=;curr_cd=%s");
	
	for(var i=rowcount+1;i<=docObjects[0].rowCount;i++){
		sheetObj.CellFont("FontBold", i, 1, i, "cy_cd") = true;
	}
	
	sheetObj.cellValue2(rowcount+1, "cnt_nm") = "Grand Total";
	
	sheetObj.ColumnSort("inv_no", "ASC");
}


function sheet1_OnClick(sheetObj,Row,Col){
	var formObj  = document.frm1;	
		
	switch (sheetObj.ColSaveName(Col)) {
	
	case "chk" :
		if(formObj.equ_sts_cd.value!='IS'){
		sheetObj.checkAll2("chk") = 0;
		}
	break;
	case "inv_prt" :
		doWork('InvoicePrint');
		
//			if ( intBlCnt == 1 && sheetObj.CellValue(Row,"air_sea_clss_cd") == "S" && ( sheetObj.CellValue(Row,"sell_buy_tp_cd") == "S" || sheetObj.CellValue(Row,"sell_buy_tp_cd") == "B" ) ) {
//				doWork('InvoiceSeaPrint');
//			} else if ( intBlCnt == 1 && sheetObj.CellValue(Row,"air_sea_clss_cd") == "A" && ( sheetObj.CellValue(Row,"sell_buy_tp_cd") == "S" || sheetObj.CellValue(Row,"sell_buy_tp_cd") == "B" ) ) {
//				doWork('InvoiceAirPrint');
//			} else if ( intBlCnt == 1 && sheetObj.CellValue(Row,"air_sea_clss_cd") == "S" && ( sheetObj.CellValue(Row,"sell_buy_tp_cd") == "D" || sheetObj.CellValue(Row,"sell_buy_tp_cd") == "C" ) ) {
//				doWork('DCNoteSeaPrint');
//			} else if ( intBlCnt == 1 && sheetObj.CellValue(Row,"air_sea_clss_cd") == "A" && ( sheetObj.CellValue(Row,"sell_buy_tp_cd") == "D" || sheetObj.CellValue(Row,"sell_buy_tp_cd") == "C" ) ) {
//				doWork('DCNoteAirPrint');
//			} else if ( intBlCnt > 1 ) {
//				doWork('InvoiceSummaryPrint');
//			}
		
    break;
    case "inv_cancel" :
		if(!confirm(getLabel('EQU_INV_MSG36'))){
			return;
		}
	
		formObj.hid_inv_no.value = sheetObj.CellValue(Row,"inv_no");
		
		formObj.f_cmd.value = REMOVE;
//		    formObj.action = "./ACC_INV_0020.clt";
//		    formObj.submit();
		sheetObj.CellValue(Row,"ibflag") = 'U';
		
		sheetObj.ShowDebugMsg = false;        		
		sheetObj.DoSave("./EQU_INV_0020GS.clt", FormQueryString(formObj),"ibflag",false);
        
    break;
		
	}
}
function sheet1_OnChange(sheetObj,Row,Col){
	
	switch (sheetObj.ColSaveName(Col)) {
	

	case "bkg_no":
		codeNameAction('booking_s',sheetObj.cellValue(Row, Col), 'onChange');
	break;
	
	}
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj  = document.frm1;
	var inv_no = sheetObj.CellValue(Row, "inv_no");
	// hid form에 값을 가지고 있는다.
	formObj.hid_inv_no.value = inv_no;	
	
	doWork('SEARCHLIST01');
		
}
function sheet1_OnPopupClick(sheetObj,Row,Col){

	// 
	switch (sheetObj.ColSaveName(Col)) {
	
	case "lr_trdp_cd" :
        
		rtnary = new Array(1);
   		rtnary[0] = "SEA";
   		rtnary[1] = "BL";
   		
   		var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			
				sheetObj.cellValue(Row, "lr_trdp_cd") = rtnValAry[0];//loc_cd 
				
		}
	break;
	case "curr_cd": 				
   		rtnary = new Array(1);
		rtnary[0] = "1";
		
        var rtnVal = window.showModalDialog('./CMM_POP_0040.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:660px;dialogHeight:360px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
        	return;
        }else {
        	var rtnValAry = rtnVal.split("|");

        	sheetObj.cellValue(Row, "curr_cd") =  rtnValAry[0];
        	
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
			
				sheetObj.cellValue(Row, "agmt_no") = rtnValAry[0];//loc_cd 
				
		}
	break;
	case "bkg_no"://openMean S = 해운에서 오픈, A = 항공에서 오픈
 		rtnary = new Array(1);
			rtnary[0] = "S";
			rtnary[1] = "O";
			
			var rtnVal = window.showModalDialog('./CMM_POP_0210.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:815px;dialogHeight:480px");
        	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 		return;
		}else{
	
			var rtnValAry = rtnVal.split("|");
			sheetObj.cellValue2(Row, "intg_bl_seq") = rtnValAry[2];//bl_seq
//			sheetObj.cellValue(Row, "bl_no") = rtnValAry[1];//bl_seq
			sheetObj.cellValue2(Row, "bkg_no") = rtnValAry[0];//bkg_no
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
            cal.select(formObj.fm_rgst_dt, 'fm_rgst_dt', 'yyyy-MM-dd');
        break;
        
        case 'DATE2':   //달력 조회 
            var cal = new calendarPopup();
            cal.select(formObj.to_rgst_dt, 'to_rgst_dt', 'yyyy-MM-dd');
        break;
        
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
				
			}else if(CODETYPE == "booking_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "bkg_no") = masterVals[0]; 
				sheetObj.cellValue2(sheetObj.selectRow, "intg_bl_seq") = masterVals[1]; 
				
			}
			
		}else{
			if(CODETYPE == "trdpCode"){
				formObj.lr_trdp_cd.value  = ""; 
				formObj.lr_trdp_nm.value  = "";
				
			}else if(CODETYPE == "trdpCode_cs"){
				formObj.cs_trdp_cd.value  = ""; 
				formObj.cs_trdp_nm.value  = "";//loc_nm	
				
			}else if(CODETYPE == "booking_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "bkg_no") = ""; 
				sheetObj.cellValue2(sheetObj.selectRow, "intg_bl_seq") = "";
				
			}
		}
	}else{
		alert(getLabel('EQU_INV_MSG01'));		
	}
}

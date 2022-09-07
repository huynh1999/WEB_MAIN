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
	     
	     // cntr no가 있으면 in조건에 들어가도록 수정해준다.
	     if(formObj.cntr_no.value!=""){
	    	 formObj.hid_cntr_no.value = '\''+formObj.cntr_no.value+'\''; 
	     }
	     
	     if(formObj.fm_etd_dt.value=="" || formObj.to_etd_dt.value=="" ){
	         alert(getLabel('EQU_MST_MSG27'));
	         if(formObj.fm_etd_dt.value=="" ){
	             formObj.fm_etd_dt.focus();
	         }else{
	             formObj.to_etd_dt.focus();                    
	         }
	         return;
	     }
	     
	        sheetObj.DoSearch4Post("EQU_MST_0030GS.clt", FormQueryString(formObj));
	     //sheetObj.ShowDebugMsg = false;
	        getObj('excel').style.display = 'inline';
	        getObj('prn').style.display = 'inline';
	break;

	case "NEW":
	 formObj.reset();
	 sheetObj.RemoveAll();
	 fncFromToDate();
	break;
	case "MODIFY":
	     formObj.f_cmd.value = MODIFY;
	     
	     var sht1 = sheetObj.GetSaveString(false);
	     if( confirm(getLabel('EQU_MST_MSG09')) ){
	         sheetObj.DoSave("EQU_MST_0030GS.clt", FormQueryString(formObj),"ibflag",false);
	     }
	break;
	
	case "PRINT":
		//선택한 Container를 Report에 출력합니다.
		var chkRow = sheetObj.FindCheckedRow("chk");
		if(chkRow ==""){
//            alert("체크된 항목이 없습니다.");
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
        
//        var param = 'cmd_type=14';
//        param += '&title=Tracing Report';
//        param += '&fm_etd_dt=' + formObj.fm_etd_dt.value;
//        param += '&to_etd_dt=' + formObj.to_etd_dt.value;
//        param += '&bkg_no=' + formObj.bkg_no.value;
//        param += '&mbl_no=' + formObj.mbl_no.value;
//        param += '&trnk_vsl_cd=' + formObj.trnk_vsl_cd.value;
//        param += '&ship_trdp_cd=' + formObj.ship_trdp_cd.value;
//        param += '&lr_trdp_cd=' + formObj.lr_trdp_cd.value;
//        param += '&trdp_cd=' + formObj.trdp_cd.value;
//        param += '&hid_cntr_no=' + cntr_no;
//        param += '&cnt_cd=' + formObj.cnt_cd.value;
//        param += '&pol_cd=' + formObj.pol_cd.value;

        formObj.cmd_type.value = "14";
        formObj.title.value = "Tracing Report";
        formObj.m_cntr_no.value = cntr_no;
        
//        popGET('RPT_PRN_0050.clt?'+param, '', 1025, 740, "scroll:yes;status:no;help:no;");
        popPOST(formObj, 'RPT_PRN_0050.clt', 'winPOP', 1025, 740);
	break;
	
	case "EXCEL":
		sheetObj.SpeedDown2Excel(true);
    break;
    
    case "SUPPLY":    //Email전송
        // checked 된 것의 invoice no를 가져온다.
        var chkRow = sheetObj.FindCheckedRow("chk");
        
        
        // 체크된것이 없으면 mapping불가.
        if(chkRow ==""){
            alert(getLabel('EQU_MST_MSG28'));
            return;
        }
        var arrRow = chkRow.split("|");
        
        // check된 row의 inv_no를 합쳐 조회 한다.
        var cntr_no = "'";
        var bkg_no = "";
        for(var j=0;j<arrRow.length-1;j++){
            if(j==0) {
                bkg_no = sheetObj.cellvalue(arrRow[j], "bkg_no");
            }
            if(j>0){
                cntr_no  = cntr_no +',\'';
            }
                
            cntr_no = cntr_no + sheetObj.cellvalue(arrRow[j], "cntr_no");
            cntr_no = cntr_no+ '\'';
        }
        
        var reqParam = '?openMean=DEFAULT';
          reqParam += '&cntr_no='+cntr_no;
          popGET('./EQU_MST_0031.clt'+reqParam, 'mailSend', 471, 500, "scroll:no;status:no;help:no;");
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
		
		if(formObj.BookingNo_in.value !=""){
			doWork('SEARCHLIST');
		}
		
	break;  
    case "MBL_POPLIST"://openMean S = 해운에서 오픈, A = 항공에서 오픈
        
		rtnary = new Array(1);
		/*
		var strAirSea = formObj.s_air_sea_clss_cd.value;
   		var strBound = formObj.s_bnd_clss_cd.value;
   		
		rtnary[0] = strAirSea;
		rtnary[1] = strBound;
	*/
		rtnary[0] = "S";
		rtnary[1] = "O";
		
		var rtnVal = window.showModalDialog('./CMM_POP_0180.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
       
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 		return;
		}else{
	
			var rtnValAry = rtnVal.split("|");

			formObj.mbl_no.value = rtnValAry[0];//master_bl_no
			formObj.h_mbl_seq.value = rtnValAry[1];//master_intg_bl_seq
		}
	break;
    case "ROUTE_POPLIST" :
        
		rtnary = new Array(1);
   		rtnary[0] = "1";
   		
   		var rtnVal = window.showModalDialog('./EQU_MST_0041.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:660px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			
//			formObj.bkg_no.value   	= rtnValAry[0];//bkg_no 
				
		}
	break;
	case "SHIPPER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
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
			formObj.ship_trdp_cd.value = rtnValAry[0]; 
			formObj.ship_trdp_nm.value  = rtnValAry[2];//loc_nm
		}
	break;
	case "IMPPARTNER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
		rtnary = new Array(1);
			rtnary[0] = "1";
			rtnary[1] = "";
			rtnary[2] = window;
			
		var cstmTpCd = 'PR';
		var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			formObj.trdp_cd.value = rtnValAry[0]; 
			formObj.trdp_nm.value  = rtnValAry[2];//loc_nm
		}
	break;
	case "PARTNER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
		rtnary = new Array(1);
		rtnary[0] = "1";
		rtnary[1] = "";
		rtnary[2] = window;
		
		var cstmTpCd = 'PR';
		var rtnVal = window.showModalDialog('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			return;
			
		}else{
			var rtnValAry = rtnVal.split("|");
			formObj.lr_trdp_cd.value = rtnValAry[0]; 
			formObj.lr_trdp_nm.value  = rtnValAry[2];//loc_nm
		}
		break;
	case "VESSEL_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
   		rtnary = new Array(2);
   		rtnary[0] = "1";
   		rtnary[1] = "";
   		
   		var rtnVal = window.showModalDialog('./CMM_POP_0140.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:656px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry = rtnVal.split("|");
			
			formObj.trnk_vsl_cd.value = rtnValAry[0];
			formObj.trnk_vsl_nm.value = rtnValAry[1];
		}
	break;
	case "CNTR_POPLIST"://openMean S = 해운에서 오픈, A = 항공에서 오픈
		rtnary = new Array(1);
   		rtnary[0] = "1";
   		rtnary[1] = "Y";
   		
		var rtnVal = window.showModalDialog('./SEE_BMD_0027.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:650px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			formObj.cntr_no.value = rtnValAry[0];
			
		}
	break;  
	case "COUNTRY_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
        
       	rtnary = new Array(1);
		rtnary[0] = "1";
		rtnary[1] = "";//대륙코드
  		
 	    var rtnVal = window.showModalDialog('./CMM_POP_0020.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:560px;dialogHeight:480px");
 	    
 	    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
		
			var rtnValAry = rtnVal.split("|");

			formObj.cnt_cd.value = rtnValAry[0];//cnt_cd
			formObj.cnt_nm.value = rtnValAry[1];//cnt_eng_nm
		
		}
	
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
			formObj.pol_nm.value  = rtnValAry[2];//loc_nm
			
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
                InitColumnInfo(37, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(true, true, true, true, false,false) ;
                
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('EQU_MST_0030_HDR'), true);

                //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
                InitDataProperty(0,  cnt++,  dtCheckBox,	 0,   daCenter,	false,    "chk",    			false,		"",       dfNone,		0,     		true,		false);
		        InitDataProperty(0,  cnt++,  dtHiddenStatus, 0,   daCenter,	false,    "ibflag");
		        InitDataProperty(0,  cnt++,  dtData,      	40,   daCenter,	false,    "no",    	false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,        50,   daLeft, 	false,    "trdp_cd",   			false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,        80,   daLeft, 	false,    "trdp_nm",   			false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,        50,   daLeft, 	false,    "cnee_trdp_cd",   	false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,        80,   daLeft, 	false,    "cnee_trdp_nm",   	false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,        50,   daLeft, 	false,    "ac_ship_cd",			false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,        80,   daLeft, 	false,    "ac_ship_nm",   		false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,       130,   daLeft, 	false,    "ship_trdp_nm",   	false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,        40,   daLeft, 	false,    "trnk_vsl_cd",    	false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,        80,   daLeft, 	false,    "trnk_vsl_nm",    	false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,        90,   daLeft, 	false,    "cntr_no",        	false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,        70,   daCenter,	false,    "cntr_tpsz_cd",   	false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,        40,   daCenter,	false,    "lstm_nm",		   	false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,        50,   daLeft, 	false,    "pol_cd",         	false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,        80,   daLeft, 	false,    "pol_nm",         	false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,        50,   daLeft, 	false,    "pod_cd",         	false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,        80,   daLeft, 	false,    "pod_nm",         	false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,        70,   daCenter, false,    "etd_dt_tm",      	false,		"",       dfUserFormat,	0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,        70,   daCenter, false,    "eta_dt_tm",      	false,		"",       dfUserFormat,	0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtPopupEdit,	70,   daCenter, false,    "dis_dt_tm",      	false,		"",       dfUserFormat,	0,     		true,		false);
		        InitDataProperty(0,  cnt++,  dtPopupEdit,	90,   daCenter, false,    "act_dis_dt_tm",      false,		"",       dfUserFormat,	0,     		true,		false);
		        InitDataProperty(0,  cnt++,  dtData,        70,   daLeft, 	false,    "n1st_wgn_no",    	false,		"",       dfNone,		0,     		true,		false);
		        InitDataProperty(0,  cnt++,  dtPopupEdit,	70,   daCenter, false,    "eta_bod_dt_tm",  	false,		"",       dfUserFormat,	0,     		true,		false);
		        InitDataProperty(0,  cnt++,  dtPopupEdit,	70,   daCenter, false,    "ata_bod_dt_tm",  	false,		"",       dfUserFormat,	0,     		true,		false);
		        InitDataProperty(0,  cnt++,  dtHidden,	70,   daCenter, false,    "etd_bod_dt_tm",  	false,		"",       dfUserFormat,	0,     		true,		false);
		        InitDataProperty(0,  cnt++,  dtData,        70,   daLeft, 	false,    "n2nd_wgn_no",    	false,		"",       dfNone,		0,     		true,		false);
		        InitDataProperty(0,  cnt++,  dtPopupEdit,   70,   daLeft, 	false,    "cur_loc_nm",     	false,		"",       dfNone,		0,     		true,		false);
		        InitDataProperty(0,  cnt++,  dtData,        70,   daLeft, 	false,    "fnl_dest_loc_nm",	false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtPopupEdit,	70,   daCenter, false,    "eta_fd_dt_tm",   	false,		"",       dfUserFormat,	0,     		true,		false);
		        InitDataProperty(0,  cnt++,  dtPopupEdit,	70,   daCenter, false,    "ata_fd_dt_tm",   	false,		"",       dfUserFormat,	0,     		true,		false);
		        InitDataProperty(0,  cnt++,  dtData,        40,   daLeft, 	false,    "tot_tm",				false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtData,       100,   daLeft, 	false,    "trac_rmk"	,    	false,		"",       dfNone,		0,     		true,		false);
		        InitDataProperty(0,  cnt++,  dtHidden,     	40,   daCenter,	false,    "intg_bl_seq",    	false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtHidden,     	40,   daCenter,	false,    "mst_flg",    	false,		"",       dfNone,		0,     		false,		false);
		        InitDataProperty(0,  cnt++,  dtHidden,      70,   daLeft, 	false,    "cur_loc_cd",     	false,		"",       dfNone,		0,     		true,		false);
				
		        PopupImage = APP_PATH+"/web/img/button/btns_calendar.gif";
				
		        ImageList(0) = APP_PATH+"/web/img/button/btns_search.gif";
		        
		        InitUserFormat(0, "etd_dt_tm",  "####-##-##", "-");
		        InitUserFormat(0, "eta_dt_tm",  "####-##-##", "-");
		        InitUserFormat(0, "dis_dt_tm",  "####-##-##", "-");
		        InitUserFormat(0, "eta_bod_dt_tm",  "####-##-##", "-");
		        InitUserFormat(0, "etd_bod_dt_tm",  "####-##-##", "-");
				InitUserFormat(0, "eta_fd_dt_tm",  "####-##-##", "-");
				InitUserFormat(0, "ata_fd_dt_tm",  "####-##-##", "-");
				InitUserFormat(0, "act_dis_dt_tm",  "####-##-##", "-");
				InitUserFormat(0, "ata_bod_dt_tm",  "####-##-##", "-");
				
           }                                                      
           break;
     }
}

function sheet1_OnSearchEnd() {
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	var ship_nm = "";
	
	// master에 데이터가 없을경우 회색 및 수정불가.
	for ( var i=1 ; i<=sheetObj.rowCount ; i++ ) {
		sheetObj.CellBackColor(i, "dis_dt_tm") = sheetObj.RgbColor(100,185,255);
		sheetObj.CellBackColor(i, "eta_bod_dt_tm") = sheetObj.RgbColor(100,185,255);
		sheetObj.CellBackColor(i, "eta_fd_dt_tm") = sheetObj.RgbColor(100,185,255);
		sheetObj.CellBackColor(i, "cur_loc_nm") = sheetObj.RgbColor(100,185,255);
		sheetObj.PopupButtonImage(i,"cur_loc_nm") = 0; 
	}
	
	/*	
	// \n 이후 글자 제거
	for ( var i=1 ; i<=sheetObj.rowCount ; i++ ) {
		ship_nm = sheetObj.CellValue(i, "ship_trdp_nm");
		
		if(ship_nm.indexOf("\n")!="-1"){
			sheetObj.CellValue2(i, "ship_trdp_nm") = ship_nm.substring(0, ship_nm.indexOf("\n")-1);
		}
	}

*/
}
function sheet1_OnSaveEnd() {
	doWork('SEARCHLIST');
		
}
function sheet1_OnPopupClick(sheetObj,Row,Col){

	switch (sheetObj.ColSaveName(Col)) {
	
	case "cur_loc_nm" :
    
		rtnary = new Array(1);
			rtnary[0] = "SEA";
			rtnary[1] = "BL";
			
			var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
	    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			sheetObj.cellValue2(Row, "cur_loc_cd") = rtnValAry[0];//nod_cd 
			sheetObj.cellValue2(Row, "cur_loc_nm") = rtnValAry[2];//nod_cd 
	
		}
    break;
    
	default:
		var cal = new calendarPopupGrid();
		cal.select(sheetObj, 'sheet1', Row, Col, 'yyyy-MM-dd');
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
		}
	}
}

//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	
	var doc = getAjaxMsgXML(reqVal);
	var targetFr= 'mainFrame';
	var formObj  = document.frm1;
	
	var sheetObj4 = docObjects[4];
	
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			
			var masterVals = rtnArr[0].split('@@^');	
			
			if(CODETYPE == "srvessel"){
				formObj.trnk_vsl_cd.value  = masterVals[0];//loc_cd 
				formObj.trnk_vsl_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "trdpCode_a"){
				formObj.ship_trdp_cd.value  = masterVals[0]; 
				formObj.ship_trdp_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "trdpCode_p"){
				formObj.trdp_cd.value  = masterVals[0]; 
				formObj.trdp_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "trdpCode"){
				formObj.lr_trdp_cd.value  = masterVals[0]; 
				formObj.lr_trdp_nm.value  = masterVals[3];//loc_nm
				
			}else if(CODETYPE == "country"){
				formObj.cnt_cd.value  = masterVals[0]; 
				formObj.cnt_nm.value  = masterVals[3];//loc_nm
				
			}
			
		}else{
			if(CODETYPE == "srvessel"){
				formObj.trnk_vsl_cd.value  = "";//loc_cd 
				formObj.trnk_vsl_nm.value  = "";//loc_nm						
			}else if(CODETYPE == "trdpCode_a"){
				formObj.ship_trdp_cd.value  = ""; 
				formObj.ship_trdp_nm.value  = "";
				
			}else if(CODETYPE == "trdpCode_p"){
				formObj.trdp_cd.value  = ""; 
				formObj.trdp_nm.value  = "";
				
			}else if(CODETYPE == "trdpCode"){
				formObj.lr_trdp_cd.value  = ""; 
				formObj.lr_trdp_nm.value  = "";
				
			}else if(CODETYPE == "country"){
				formObj.cnt_cd.value  = ""; 
				formObj.cnt_nm.value  = "";
				
			}
		}
	}else{
		alert(getLabel('EQU_MST_MSG01'));		
	}
}

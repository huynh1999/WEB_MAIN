var rtnary = new Array(1);
function doWork(srcName){
	if(!btnVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var formObj  = document.frm1;
    var sheetObj = docObjects[0];
    var sheetObj1 = docObjects[1];

    switch(srcName) {
       case "SEARCHLIST":

    	   //sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value = SEARCHLIST;
            
           	sheetObj.DoSearch4Post("EQU_INV_0010GS.clt", FormQueryString(formObj));
            //sheetObj.ShowDebugMsg = false;
           	
//           	rowAdd.style.display = 'inline';
           	getObj('excel').style.display = 'inline';
       break;
       
       case "SEARCHLIST01":
    	   
    	   //sheetObj.ShowDebugMsg = true;
    	   formObj.f_cmd.value = SEARCHLIST01;
    	   
    	   sheetObj1.DoSearch4Post("EQU_INV_0010_1GS.clt", FormQueryString(formObj));
    	   //sheetObj.ShowDebugMsg = false;
    	   break;
    	   
       case "ROWADD":

    	   var iRows = sheetObj.Rows;
           var Row = sheetObj.DataInsert(++iRows);

   		   docObjects[0].cellValue2(docObjects[0].lastRow, "inv_no") = "Auto Seq";
    	   
       break;
       case "ROWADD1":
    	   
    	   // 필수 조건이 있어야 가능하다.(billing date, exchange rate, vat rate)
    	   var bilDt = formObj.s_bil_dt.value;
    	   var xchRt = formObj.s_xch_rt.value;

    	   if(bilDt==""||xchRt==""){
    		   // agrement no check
    		   if(docObjects[0].cellValue(1, "curr_cd")==""){
	        		alert(getLabel('EQU_INV_MSG29'));
	        		return;
	        	}
    		   formObj.s_bil_dt.value = today;
    		   formObj.s_bil_dt.focus();
//    		   alert(getLabel('EQU_INV_MSG28'));
//    		   return;
    	   }
    	   
			document.getElementById("s_xch_rt").className="search_form";
			document.getElementById("s_xch_rt").disabled = false;
			document.getElementById("s_vat_rt").className="search_form";
			document.getElementById("s_vat_rt").disabled = false;
    	   
    	   var iRows = sheetObj1.Rows;
    	   var Row = sheetObj1.DataInsert(++iRows);
    	   
    	   sheetObj1.Editable = true;
    	   formObj.radio4.disabled = false;
    	   formObj.radio5.disabled = false;
    	   
    	   docObjects[1].cellValue2(docObjects[1].lastRow-1, "vat_rt") = formObj.s_vat_rt.value;
    	   docObjects[1].cellValue2(docObjects[1].lastRow-1, "inv_no") = formObj.dtl_inv_no.value;
    	   break;
       case "NEW":
    	   displayClear();
    	   fncFromToDate();
       break;
       case "MODIFY":
            formObj.f_cmd.value = MODIFY;

            // Tex Bill 선택해야 가능.
			if(formObj.radio4.checked == false&&formObj.radio5.checked == false){
				alert(getLabel('EQU_INV_MSG37'));
				return;
			}
            
            // invoice master에 들어갈 amt, tr정보를 가져온다.
            s_value_onChange();
            
            var sht		= sheetObj.GetSaveString(false);
			var sht1	= sheetObj1.GetSaveString(false);
			
			//저장할 QueryString이 정확하지 않은 경우 다음 처리 하지 않음
			if (sht == "" || sht1 == "") return false;
			// grid value validation
			if ( !fncGridCheck() ) return false;
			if( confirm(getLabel('EQU_INV_MSG09')) ){
				sheetObj.DoAllSave("EQU_INV_0010GS.clt", FormQueryString(formObj)+'&'+sht1,true);
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
       
       case "EXCEL":
    	   sheetObj.SpeedDown2Excel(true);
       break;
       
       case "SUPPLY":	//Email전송
       	// checked 된 것의 invoice no를 가져온다.
       	var chkRow = sheetObj.FindCheckedRow("chk");
       	
       	
       	// 체크된것이 없으면  바로 띄움. (2010.05.07 변경)
       	if(chkRow ==""){
       		var reqParam = '?bkg_no=\'\'';
     		reqParam += '&openMean=DEFAULT';
     		reqParam += '&inv_no=\'0\'';
 	   		popGET('./EQU_INV_0012.clt'+reqParam, 'mailSend', 800, 550, "scroll:no;status:no;help:no;");
 	   		return;
       	}
       	var arrRow = chkRow.split("|");
       	
       	// check된 row의 inv_no를 합쳐 조회 한다.
       	var inv_no = "'";
       	var bkg_no = "";
       	for(var j=0;j<arrRow.length-1;j++){
       		if(j==0) {
       			bkg_no = sheetObj.cellvalue(arrRow[j], "bkg_no");
       		}
       		if(j>0){
       			inv_no  = inv_no +',\'';
       		} 
       		inv_no = inv_no + sheetObj.cellvalue(arrRow[j], "inv_no");
       		inv_no = inv_no+ '\'';
       	}
       	
       	var reqParam = '?bkg_no='+bkg_no;
     		reqParam += '&openMean=DEFAULT';
     		reqParam += '&inv_no='+inv_no;
 	   		popGET('./EQU_INV_0012.clt'+reqParam, 'mailSend', 800, 550, "scroll:no;status:no;help:no;");
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
				formObj.lr_trdp_nm.value  = rtnValAry[2];//loc_nm
				
			} 
      break;
    case "SR_POPLIST"://openMean S = 해운에서 오픈, A = 항공에서 오픈
    	rtnary = new Array(1);
    	rtnary[0] = "S";	//openMean S = 해운에서 오픈, A = 항공에서 오픈
    	rtnary[1] = "O";	//I: In-bound, O: Out-bound
  			
    	var rtnVal = window.showModalDialog('./CMM_POP_0190.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
	       
    	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
    		return;
    	}else{
			var rtnValAry = rtnVal.split("|");
		  	formObj.sr_no.value = rtnValAry[0];//sr_no				
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
	var month	= now.getMonth() + 1; 		// 월 가져오기 (+1)
	var date	= now.getDate(); 			// 날짜 가져오기
	
	if(month < 10){
		month = "0"+(month);
	}
	if(date < 10){
		date = "0"+date;
	}
	today = year +"-"+ month +"-"+ date +"";

	//formObj.fm_rgst_dt.value = year+'-01-01';
	//formObj.to_rgst_dt.value = year+'-12-31';
	
	setFromToDtEndPlus(document.frm1.fm_rgst_dt, 15, document.frm1.to_rgst_dt, 15);
	
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
               style.height = 200;
                
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
                InitColumnInfo(30, 0, 0, true);

                // 해더에서 처리할 수 있는 각종 기능을 설정한다
                InitHeadMode(false, true, true, true, false,false) ;
                
                //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
                InitHeadRow(0, getLabel('EQU_INV_0010_HDR'), true);

                //데이터속성    [ROW, COL,  DATATYPE,    WIDTH,    DATAALIGN, COLMERGE, SAVENAME,  KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
				InitDataProperty(0, cnt++,  dtDelCheck,		 30,    daCenter,  true,    "chk",			false,	"",       dfNone,      0,     true,	true);
				InitDataProperty(0, cnt++,  dtHiddenStatus,	 40,    daCenter,  true,    "ibflag");
				InitDataProperty(0, cnt++,  dtData,			 95,    daLeft,    true,    "inv_no", 		true,	"",       dfNone,      0,     false,	false,	14);
				InitDataProperty(0, cnt++,  dtPopupEdit,	100,    daLeft,    true,    "agmt_no", 		true,	"",       dfNone,      0,     false,	true,	15);
				InitDataProperty(0, cnt++,  dtPopupEdit,	 50,    daLeft,    true,    "lr_trdp_cd", 	true,	"",       dfNone,      0,     false,	false,	10);
				InitDataProperty(0, cnt++,  dtPopupEdit,	 90,    daLeft,    true,    "lr_trdp_nm", 	true,	"",       dfNone,      0,     false,	false,	10);
				InitDataProperty(0, cnt++,  dtCombo,		100,	daLeft,    true,    "inv_sts_cd", 	true,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtCombo,		 80,	daLeft,    true,    "equ_sts_cd", 	false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtPopupEdit,	 50,    daLeft,    true,    "curr_cd",	 	true,	"",       dfNone,      0,     false,	false,	10);
				InitDataProperty(0, cnt++,  dtPopupEdit,	 60,    daLeft,    true,    "pkup_nod_cd",	false,	"",       dfNone,      0,     false,	true,	20);
				InitDataProperty(0, cnt++,  dtData,			 90,    daLeft,    true,    "pkup_nod_nm",	false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtPopupEdit,	 60,    daLeft,    true,    "cy_cd",		false,	"",       dfNone,      0,     false,	true,	20);
				InitDataProperty(0, cnt++,  dtData,			 90,    daLeft,    true,    "cy_nm",		false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,			110,    daLeft,    true,    "cy_pkup_no",	false,	"",       dfNone,      0,     false,	true,	20);
				InitDataProperty(0, cnt++,  dtData,			 80,    daLeft,    true,    "splr_pic",		false,	"",       dfNone,      0,     false,	true,	20);
				InitDataProperty(0, cnt++,  dtData,			 80,    daLeft,    true,    "splr_tel_no",	false,	"",       dfNone,      0,     false,	true,	20);
				InitDataProperty(0, cnt++,  dtData,			 80,    daRight,   true,    "rgst_tms", 	false,	"",       dfUserFormat,0,     false,	false,	20);
				InitDataProperty(0, cnt++,	dtPopupEdit,	 80,    daCenter,  true,	"due_dt",		false,	"",       dfUserFormat,0,	  false,    true,	10);
				InitDataProperty(0, cnt++,  dtHidden,		120,    daRight,   true,    "inv_ttl_amt",	false,	"",       dfFloat,     2,     false,	true,	20);
				InitDataProperty(0, cnt++,  dtHidden,		120,    daRight,   true,    "inv_vat_amt",	false,	"",       dfFloat,     2,     false,	true,	20);
				InitDataProperty(0, cnt++,  dtHidden,		120,    daRight,   true,    "inv_sum_amt",	false,	"",       dfFloat,     2,     false,	true,	20);
				InitDataProperty(0, cnt++,	dtHidden,	 	 80,    daCenter,  true,	"bil_dt",		false,	"",       dfNone	  ,0,	  false,    true,	12);
				InitDataProperty(0, cnt++,  dtHidden,		 80,    daRight,   true,    "xch_rt",		false,	"",       dfNone,     0,     false,	true,	20);
				InitDataProperty(0, cnt++,  dtHidden,		 80,    daRight,   true,    "vat_rt",		false,	"",       dfNone,     0,     false,	true,	20);
				InitDataProperty(0, cnt++,  dtHidden,		120,    daRight,   true,    "frgn_amt",	    false,	"",       dfFloat,     2,     false,	true,	20);
				InitDataProperty(0, cnt++,  dtHidden,		120,    daRight,   true,    "frgn_vat_amt",	false,	"",       dfFloat,     2,     false,	true,	20);
				InitDataProperty(0, cnt++,  dtHidden,		120,    daRight,   true,    "frgn_sum_amt",	false,	"",       dfFloat,     2,     false,	true,	20);
				InitDataProperty(0, cnt++,  dtHidden,		120,    daRight,   true,    "inv_curr_cd",	false,	"",       dfNone,     0,     false,	true,	20);
				InitDataProperty(0, cnt++,  dtHidden,		120,    daRight,   true,    "frgn_curr_cd",	false,	"",       dfNone,     0,     false,	true,	20);
				InitDataProperty(0, cnt++,  dtHidden,		120,    daRight,   true,    "ref_no",	    false,	"",       dfNone,     0,     false,	true,	20);
				
				InitDataCombo (0, "equ_sts_cd", PARAM1_1, PARAM1_2, "IS");	//com_cd_dtl에서 가져온 코드값.
				InitDataCombo (0, "inv_sts_cd", PARAM2_1, PARAM2_2, "IS");	//com_cd_dtl에서 가져온 코드값.
				
				PopupImage	= APP_PATH+"/web/img/button/btns_search.gif";
				
				InitUserFormat(0, "due_dt",  "####-##-##", "-");
				InitUserFormat(0, "rgst_tms",  "####-##-##", "-");
				
				// 대문자 자동 치환
				InitDataValid(0, "inv_no",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "agmt_no",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "lr_trdp_cd",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "curr_cd",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "pkup_nod_cd",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "cy_cd",vtEngUpOther, "0123456789" );
		        InitDataValid(0, "cy_pkup_no",vtEngUpOther, "0123456789" );
           }
           break;
         case 2:      //IBSheet1 init

             with (sheetObj) {
                 // 높이 설정
                style.height = 150;
                 
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
                 InitHeadRow(0, getLabel('EQU_INV_0010_1_HDR'), true);

                 //데이터속성    [ROW, COL,  DATATYPE,    WIDTH,    DATAALIGN, COLMERGE, SAVENAME,  KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
 				InitDataProperty(0, cnt++,  dtDelCheck,		 30,    daCenter,  true,    "",				false,	"",       dfNone,      0,     true,		true);
 				InitDataProperty(0, cnt++,  dtHiddenStatus,	 40,    daCenter,  true,    "dtl_ibflag");
 				InitDataProperty(0, cnt++,  dtData,		 	 30,    daCenter,  true,    "no", 			false,	"",       dfNone,      0,     false,	false,	3);
 				InitDataProperty(0, cnt++,  dtPopupEdit,	120,    daLeft,    true,    "bkg_no", 		false,	"",       dfNone,      0,     true,		true,	15);
				InitDataProperty(0, cnt++,  dtHidden,		 80,    daRight,   true,    "intg_bl_seq", 	false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,			110,    daLeft,    true,    "bl_no", 		false,	"",       dfNone,      0,     false,	false,	20);
				InitDataProperty(0, cnt++,  dtData,			 90,    daLeft,    true,    "sr_no", 		false,	"",       dfNone,      0,     false,	false,	20);
 				InitDataProperty(0, cnt++,  dtCombo,		 60,    daCenter,  false,   "cntr_tpsz_cd",	true,	"",       dfNone,      0,     true,		true,	6);
 				InitDataProperty(0, cnt++,  dtData,			 80,    daRight,   true,    "unit_prc",		false,	"",       dfFloat,     2,     true,		true,	20);
 				InitDataProperty(0, cnt++,  dtData,			 50,    daRight,   true,    "qty", 			true,	"",       dfInteger,   0,     true,		true,	7);
 				InitDataProperty(0, cnt++,  dtAutoSum,		110,    daRight,   true,    "frgn_amt",		false,	"",       dfFloat,     2,     false,	false,	20);
 				InitDataProperty(0, cnt++,  dtHidden,		110,    daRight,   true,    "frgn_vat_amt",	false,	"",       dfFloat,     2,     false,	false,	20);
 				InitDataProperty(0, cnt++,  dtHidden,		110,    daRight,   true,    "frgn_sum_amt",	false,	"",       dfFloat,     2,     false,	false,	20);
 				InitDataProperty(0, cnt++,  dtAutoSum,		110,    daRight,   true,    "amt",			true,	"",       dfFloat,     2,     true,		true,	20);
 				InitDataProperty(0, cnt++,  dtAutoSum,		110,    daRight,   true,    "vat_amt",	    true,	"",       dfFloat,     2,     true,		true,	20);
 				InitDataProperty(0, cnt++,  dtAutoSum,		110,    daRight,   true,    "inv_sum_amt",	true,	"",       dfFloat,     2,     false,	false,	20);
 				InitDataProperty(0, cnt++,  dtHidden,		 70,    daLeft,    true,    "dtl_inv_no", 	true,	"",       dfNone,      0,     false,	false,	14);
 				InitDataProperty(0, cnt++,  dtHidden,		 70,    daLeft,    true,    "inv_smry_seq",	true,	"",       dfNone,      0,     false,	false,	14);
 				
 				InitDataCombo (0, "cntr_tpsz_cd", typeSize_1, typeSize_1);
 				InitDataValid(0, "bkg_no",vtEngUpOther, "0123456789" );
		        
            }                                                      
            break;
     }
}


function setNodPic(reqVal){
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	var doc = getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('^@');
			sheetObj.cellValue2(sheetObj.selectRow, "splr_pic")		= rtnArr[1]; 
			sheetObj.cellValue2(sheetObj.selectRow, "splr_tel_no")	= rtnArr[2]; 
				
		}
	}else{
		alert(getLabel('EQU_INV_MSG32'));		
	}
}

function setDueDate(reqVal){
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	var doc = getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('^@');
			
			sheetObj.cellValue2(sheetObj.selectRow, "due_dt")		= rtnArr[1]; 
//			sheetObj.cellValue2(sheetObj.selectRow, "splr_tel_no")	= rtnArr[2]; 
				
		}
	}else{
		alert(getLabel('EQU_INV_MSG31'));		
	}
}

/*
 *  display조건 
 */
function formDisp(flag){
	var formObj = document.frm1;
	
	// radio가 yes일경우
	if(flag=="Y"){
		document.getElementById("s_xch_rt").className="search_form";
		document.getElementById("s_xch_rt").disabled = false;
		document.getElementById("s_vat_rt").className="search_form";
		document.getElementById("s_vat_rt").disabled = false;
	}else{
		formObj.s_xch_rt.value = "1.00";
		formObj.s_vat_rt.value = "0.00";
		
		document.getElementById("s_xch_rt").className="search_form-disable";
		document.getElementById("s_xch_rt").disabled = true;
		document.getElementById("s_vat_rt").className="search_form-disable";
		document.getElementById("s_vat_rt").disabled = true;
		
		changedValue();
		
	}
}

/*
 *  조건들을 clear한다. 
 */
function displayClear(){
	var sheetObj = docObjects[0];
	var sheetObj1 = docObjects[1];
	var formObj = document.frm1;
	// form reset
	formObj.reset();
	
	// sheet clear
	sheetObj.RemoveAll();
	sheetObj1.RemoveAll();
	
	// rowadd를 보여준다.
//	rowAdd.style.display = 'inline';
	getObj('rowAdd1').style.display = 'inline';
	
	document.getElementById("s_bil_dt").readOnly = false;
	document.getElementById("s_xch_rt").readOnly = false;
	document.getElementById("s_vat_rt").readOnly = false;
	formObj.s_bil_dt_cal.disabled = false;
	
	//rowadd한다
	doWork('ROWADD');	
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
	if ( parseInt(sheetObj.CellValue(i, "due_dt")) <= parseInt(today)) {
		return false;
	}
	return true;
}
/*
 * s_value가 변경될때 마다 sheet에 update한다.
 */
function s_value_onChange(){
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	
	var inv_no = formObj.hid_inv_no.value.replaceAll('\'', '');		
	
	var Row = sheetObj.FindText("inv_no", inv_no);
	
	sheetObj.cellValue2(Row, "bil_dt") = formObj.s_bil_dt.value.replaceAll('-', ''); 
	sheetObj.cellValue2(Row, "xch_rt") = formObj.s_xch_rt.value; 
	sheetObj.cellValue2(Row, "vat_rt") = formObj.s_vat_rt.value; 
	sheetObj.cellValue2(Row, "ref_no") = formObj.s_ref_no.value; 
	sheetObj.cellValue2(Row, "inv_ttl_amt") = docObjects[1].cellValue(docObjects[1].lastRow, "amt"); 
	sheetObj.cellValue2(Row, "inv_vat_amt") = docObjects[1].cellValue(docObjects[1].lastRow, "vat_amt");
	sheetObj.cellValue2(Row, "inv_sum_amt") = docObjects[1].cellValue(docObjects[1].lastRow, "inv_sum_amt");
	sheetObj.cellValue2(Row, "frgn_amt") = docObjects[1].cellValue(docObjects[1].lastRow, "frgn_amt"); 
	sheetObj.cellValue2(Row, "frgn_vat_amt") = docObjects[1].cellValue(docObjects[1].lastRow, "frgn_vat_amt");
	sheetObj.cellValue2(Row, "frgn_sum_amt") = docObjects[1].cellValue(docObjects[1].lastRow, "frgn_sum_amt");
	
	var trdp_cd = sheetObj.cellValue(Row, "lr_trdp_cd");
	ajaxSendPost(setDueDate, 'reqVal', '&goWhere=aj&bcKey=getDueDate&callId=O&trdp_cd='+trdp_cd+'&fm_dt='+formObj.s_bil_dt.value, './GateServlet.gsl');
	
	
}
function sheet1_OnSearchEnd() {
	var formObj = document.frm1;
	var sheetObj1 = docObjects[1];
	
	formObj.s_bil_dt.value = "";
	formObj.s_xch_rt.value = "";
	formObj.s_vat_rt.value = "";
	formObj.s_ref_no.value = "";
	
	// sheet clear
	sheetObj1.RemoveAll();
	
	// rowadd 방지한다.
	getObj('rowAdd1').style.display = 'none';
	
	// readonly 적용
	document.getElementById("s_bil_dt").readOnly = true;
	document.getElementById("s_xch_rt").readOnly = true;
	document.getElementById("s_vat_rt").readOnly = true;
	formObj.s_bil_dt_cal.disabled = true;

}
function sheet2_OnSearchEnd() {
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	var sheetObj1 = docObjects[1];
	var curr_cd = sheetObj.cellValue(sheetObj.selectRow, "inv_curr_cd");
	var frgn_curr_cd = sheetObj.cellValue(sheetObj.selectRow, "frgn_curr_cd");
	

	changedValue();
	if(formObj.radio4.checked==true){
		
		formDisp(formObj.radio4.value);
	}else{
		formDisp(formObj.radio5.value);
		
	}
	sheetObj1.cellValue2(sheetObj1.lastRow, "cntr_tpsz_cd") = "Total Amt";
	
	if(curr_cd!="KRW"){
		
		var text = ' ('+curr_cd+')';
		var text1 = ' ('+curr_cd+')';
	}else{
		var text = ' ('+frgn_curr_cd+')';
		var text1 = ' ('+curr_cd+')';
		
	}
	if(curr_cd ==""){
		
	}
	sheetObj1.CellText(0, 'frgn_amt') = 'Amt' + text;
	sheetObj1.CellText(0, 'amt') = 'Amt' + text1;
	sheetObj1.CellText(0, 'vat_amt') = 'Vat Amt' + text1;
	sheetObj1.CellText(0, 'inv_sum_amt') = 'Sum Amt' + text1;
		
}
function sheet1_OnSaveEnd() {
	doWork('SEARCHLIST');
		
}
function sheet1_OnClick(sheetObj,Row,Col){
	if(sheetObj.RowStatus(Row)=="I") return;
	
	switch (sheetObj.ColSaveName(Col)) {
		case "chk" :
	       	// checked 된 것의 invoice no를 가져온다.
	       	var chkRow = sheetObj.FindCheckedRow("chk");
	       	
	       	
	       	// 체크된것이 있으면 bkg_no가 같은지 확인후 체크 
	       	if(chkRow !=""){
	       		
	       		var bkg_no = sheetObj.cellvalue(Row, "bkg_no");
	       		var arrRow = chkRow.split("|");
	       		
	       		for(var j=0;j<arrRow.length-1;j++){
	       			if(bkg_no!=sheetObj.cellvalue(arrRow[j], "bkg_no")){
	       				alert(getLabel('EQU_INV_MSG30'));
	       				// check value를 Y해 줘야 N으로 바뀜.
	       				sheetObj.cellvalue2(Row, "chk") = "Y";
		        		return;
	       			}
	       		}
	       	}

		break;
	
	}
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj = document.frm1;
	var sheetObj1 = docObjects[1];
	
	if(sheetObj.RowStatus(Row)=="I") return;
	
	// billing date 와 exchange rate를 넣어준다.
	formObj.s_bil_dt.value = sheetObj.cellValue(Row, "bil_dt");
	formObj.s_xch_rt.value = doMoneyFmt(strToFloatByNDecimalTp(sheetObj.cellValue(Row, "xch_rt"), 100));
	formObj.s_vat_rt.value = doMoneyFmt(sheetObj.cellValue(Row, "vat_rt"));
	formObj.s_ref_no.value = sheetObj.cellValue(Row, "ref_no");
	
	formObj.hid_inv_no.value = '\''+sheetObj.cellValue(Row, "inv_no")+'\'';
	formObj.dtl_inv_no.value = sheetObj.cellValue(Row, "inv_no");
	formObj.hid_bkg_no.value = sheetObj.cellValue(Row, "bkg_no");
	
	//tex bill 추가 (10.01.15)
	// tax bill value setting
	if(sheetObj.cellValue(Row, "frgn_curr_cd")!=''){
		formObj.radio4.checked = true;
		
	}else if(sheetObj.cellValue(Row, "frgn_curr_cd")==''){
		formObj.radio5.checked = true;
		
	}
	
	formObj.curr_cd.value = sheetObj.cellValue(Row, "curr_cd");
		
	// readonly 적용
	document.getElementById("s_bil_dt").readOnly = false;
	document.getElementById("s_xch_rt").readOnly = false;
	document.getElementById("s_vat_rt").readOnly = false;
	formObj.s_bil_dt_cal.disabled = false;
	
	doWork('SEARCHLIST01');
	
	if(sheetObj.cellValue(Row, "inv_sts_cd")!="IS"){
		getObj('rowAdd1').style.display = 'none';
		sheetObj1.Editable = false;
		formObj.radio4.disabled = true;
		formObj.radio5.disabled = true;
	}else{
		getObj('rowAdd1').style.display = 'inline';
		sheetObj1.Editable = true;
		formObj.radio4.disabled = false;
		formObj.radio5.disabled = false;
	}
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj  = document.frm1;
	
	switch (sheetObj.ColSaveName(Col)) {
	case "lr_trdp_cd":
		codeNameAction('trdpCode_s',sheetObj.cellValue(Row, Col), 'onChange');
		
	break;
	case "curr_cd":
		formObj.curr_cd.value = sheetObj.cellValue(Row, "curr_cd");
		
	break;
	case "agmt_no":
		codeNameAction('agmt_s',sheetObj.cellValue(Row, Col), 'onChange');
		
	break;
	case "bkg_no":
		codeNameAction('booking_s',sheetObj.cellValue(Row, Col), 'onChange');
		
	break;
	case "pkup_nod_cd" :
		codeNameAction('location_s',sheetObj.cellValue(Row, Col), 'onChange');
	break;
	case "cy_cd" :
		codeNameAction('node_s',sheetObj.cellValue(Row, Col), 'onChange');
		break;
	
	}
}
function sheet2_OnChange(sheetObj,Row,Col){
	var formObj  = document.frm1;
	var sheetObj1 = docObjects[1];
	var xch_rt = formObj.s_xch_rt.value;
	var vat_rt = formObj.s_vat_rt.value;
	
	switch (sheetObj.ColSaveName(Col)) {	
	case "qty" :
		changedValue(Row,Col)
	break;
	case "unit_prc" :
		changedValue(Row,Col)

	break;
	case "amt" :
		// exchange vat 적용금액
//		sheetObj1.cellValue2(i, "vat_amt") = strToFloatByNDecimalTp(parseFloat(sheetObj1.cellValue(i, "amt")*vat_rt*0.01), 1);
		// exchange 적용 금액 에 vat 적용금액
		sheetObj1.cellValue2(i, "inv_sum_amt") = strToFloatByNDecimalTp(parseFloat(sheetObj1.cellValue(i, "amt"))+ parseFloat(sheetObj1.cellValue(i, "vat_amt")), 1);
	break;
	case "vat_amt" :
		// exchange 적용 금액 에 vat 적용금액
		sheetObj1.cellValue2(i, "inv_sum_amt") = strToFloatByNDecimalTp(parseFloat(sheetObj1.cellValue(i, "amt"))+ parseFloat(sheetObj1.cellValue(i, "vat_amt")), 1);
		
	break;
	}
}
/*
 * 기준값이 변경될때마다 결과값을 새로 계산해서 보여준다.
 */
function changedValue(Row,Col){
	var formObj  = document.frm1;
	var sheetObj1 = docObjects[1];
	var xch_rt = rmMoneyFmt(formObj.s_xch_rt.value);
	var vat_rt = rmMoneyFmt(formObj.s_vat_rt.value);
	
	// sheet에 값이 있는경우만
	if(sheetObj1.rowCount>0){
		
		// row값이 있을경우
		if(Row>0){
			sheetObj1.cellValue2(Row, "frgn_amt") = sheetObj1.cellValue(Row, "qty")*sheetObj1.cellValue(Row, "unit_prc");
			// vat 적용 금액
			sheetObj1.cellValue2(Row, "frgn_vat_amt") = strToFloatByNDecimalTp(parseFloat(sheetObj1.cellValue(Row, "frgn_amt")*vat_rt*0.01), 1);
			// amt + vat 적용 금액
			sheetObj1.cellValue2(Row, "frgn_sum_amt") = strToFloatByNDecimalTp(parseFloat(sheetObj1.cellValue(Row, "frgn_amt"))+ parseFloat(sheetObj1.cellValue(Row, "frgn_amt")*vat_rt*0.01), 1);
			// exchange 적용 금액
			sheetObj1.cellValue2(Row, "amt") = strToFloatByNDecimalTp(parseFloat(sheetObj1.cellValue(Row, "frgn_amt")* xch_rt), 1);
			// exchange vat 적용금액
			sheetObj1.cellValue2(Row, "vat_amt") = strToFloatByNDecimalTp(parseFloat(sheetObj1.cellValue(Row, "amt")*vat_rt*0.01), 1);
			// exchange 적용 금액 에 vat 적용금액
			sheetObj1.cellValue2(Row, "inv_sum_amt") = strToFloatByNDecimalTp(parseFloat(sheetObj1.cellValue(Row, "amt"))+ parseFloat(sheetObj1.cellValue(Row, "vat_amt")), 1);
			
		}else{
			// 전체row를 변경한다.
			for(var i=1;i<=sheetObj1.rowCount;i++){
				sheetObj1.cellValue2(i, "frgn_amt") = sheetObj1.cellValue(i, "qty")*sheetObj1.cellValue(i, "unit_prc");
				// vat 적용 금액
				sheetObj1.cellValue2(i, "frgn_vat_amt") = strToFloatByNDecimalTp(parseFloat(sheetObj1.cellValue(i, "frgn_amt")*vat_rt*0.01), 1);
				// amt + vat 적용 금액
				sheetObj1.cellValue2(i, "frgn_sum_amt") = strToFloatByNDecimalTp(parseFloat(sheetObj1.cellValue(i, "frgn_amt"))+ parseFloat(sheetObj1.cellValue(i, "frgn_amt")*vat_rt*0.01), 1);

				if(sheetObj1.cellValue(i, "amt")=="0"){
					// exchange 적용 금액
					sheetObj1.cellValue2(i, "amt") = strToFloatByNDecimalTp(parseFloat(sheetObj1.cellValue(i, "frgn_amt")* xch_rt), 1);
					// exchange vat 적용금액
					sheetObj1.cellValue2(i, "vat_amt") = strToFloatByNDecimalTp(parseFloat(sheetObj1.cellValue(i, "amt")*vat_rt*0.01), 1);
				}
				// exchange 적용 금액 에 vat 적용금액
				sheetObj1.cellValue2(i, "inv_sum_amt") = strToFloatByNDecimalTp(parseFloat(sheetObj1.cellValue(i, "amt"))+ parseFloat(sheetObj1.cellValue(i, "vat_amt")), 1);
				
			}
			
		}
	}
}
function sheet1_OnPopupClick(sheetObj,Row,Col){

	// 
	switch (sheetObj.ColSaveName(Col)) {
	
	case "agmt_no" :
	    
		rtnary = new Array(1);
   		rtnary[0] = "1";
//   		rtnary[1] = sheetObj.cellValue(Row, "lr_trdp_cd");
   		
   		var rtnVal = window.showModalDialog('./EQU_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:360px;dialogHeight:460px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			
				sheetObj.cellValue(Row, "agmt_no") = rtnValAry[0];//loc_cd 
				sheetObj.cellValue(Row, "lr_trdp_cd") = rtnValAry[1];//loc_cd 
				sheetObj.cellValue(Row, "curr_cd") = rtnValAry[2];//loc_cd
				
		}
	break;
	case "due_dt" :
		var cal = new calendarPopupGrid();
        cal.select(sheetObj, 'sheet1', Row, Col, 'yyyy-MM-dd');
	break;

	case "pkup_nod_cd" :
		
		rtnary = new Array(1);
		rtnary[0] = "SEA";
		rtnary[1] = "BL";
		
		var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			return;
			
		}else{
			var rtnValAry = rtnVal.split("|");
			
//				sheetObj.cellValue2(Row, "Port_loc_cd") = rtnValAry[0]; 
			sheetObj.cellValue2(Row, "pkup_nod_cd") = rtnValAry[0];//nod_cd 
			sheetObj.cellValue2(Row, "pkup_nod_nm") = rtnValAry[2];//loc_nm 
			
		}
		break;
	case "cy_cd" :
        
		rtnary = new Array(1);
   		rtnary[0] = "SEA";
   		rtnary[1] = "ND";
   		
   		var rtnVal = window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			
//				sheetObj.cellValue2(Row, "Port_loc_cd") = rtnValAry[0]; 
				sheetObj.cellValue2(Row, "cy_cd") = rtnValAry[1];//nod_cd 
				sheetObj.cellValue2(Row, "cy_nm") = rtnValAry[2];//loc_nm 
				
				ajaxSendPost(setNodPic, 'reqVal', '&goWhere=aj&bcKey=getNodePic&callId=O&node_cd='+rtnValAry[1], './GateServlet.gsl');
		}
	break;
	
	}
}
function sheet2_OnPopupClick(sheetObj,Row,Col){

	// 
	switch (sheetObj.ColSaveName(Col)) {
	
	case "bkg_no"://openMean S = 해운에서 오픈, A = 항공에서 오픈
 		rtnary = new Array(1);
			rtnary[0] = "S";
			rtnary[1] = "O";
			rtnary[2] = "Y"; //equipment 일때 operator all설정
			
			var rtnVal = window.showModalDialog('./CMM_POP_0210.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:815px;dialogHeight:480px");
        	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 		return;
		}else{
	
			var rtnValAry = rtnVal.split("|");
			sheetObj.cellValue(Row, "intg_bl_seq") = rtnValAry[2];//bl_seq
			sheetObj.cellValue(Row, "bl_no") = rtnValAry[1];//bl_seq
			sheetObj.cellValue(Row, "bkg_no") = rtnValAry[0];//bkg_no
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
        
        case 'DATE3':   //달력 조회 
        	var cal = new calendarPopup();
        	cal.select(formObj.bil_dt, 'bil_dt', 'yyyy-MM-dd');
        	break;
        	
        case 'DATE4':   //달력 조회 
        	 // 상단의 curr정보를 확인한다.
        	if(docObjects[0].rowCount>0){
	        	if(docObjects[0].cellValue(1, "curr_cd")==""){
	        		alert(getLabel('EQU_INV_MSG29'));
	        		return;
	        	}
        	
	        	var cal = new calendarPopup();
	            cal.select(formObj.s_bil_dt, 's_bil_dt', 'yyyy-MM-dd');
        	}
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
		}else if ( tmp == "exchange" ) {
			if ( s_code != "" ) {
				CODETYPE = tmp;
				s_type = document.frm1.s_bil_dt.value;
				s_code = document.frm1.curr_cd.value;
				s_type = s_type.replaceAll('\-', '');
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchExchangeRate&bil_dt='+s_type+'&fm_curr_cd='+s_code, './GateServlet.gsl');
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
				
			}else if(CODETYPE == "trdpCode_s"){
				sheetObj.cellValue(sheetObj.selectRow, "lr_trdp_cd") = masterVals[0]; 
				sheetObj.cellValue(sheetObj.selectRow, "lr_trdp_nm")  = masterVals[3];//trdp_nm
				
			}else if(CODETYPE == "currency_s"){
				sheetObj.cellValue(sheetObj.selectRow, "curr_cd") = masterVals[0]; 
				
			}else if(CODETYPE == "amgt_s"){
				sheetObj.cellValue(sheetObj.selectRow, "agmt_no") = masterVals[0]; 
				
			}else if(CODETYPE == "booking_s"){
				sheetObj.cellValue(sheetObj.selectRow, "bkg_no") = masterVals[0];
				
			}else if(CODETYPE == "location_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "pkup_nod_cd") = masterVals[0]; 
				sheetObj.cellValue2(sheetObj.selectRow, "pkup_nod_nm") = masterVals[3]; 
				
			}else if(CODETYPE == "node_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "cy_cd") = masterVals[0]; 
				sheetObj.cellValue2(sheetObj.selectRow, "cy_nm") = masterVals[3]; 
				
			}else if(CODETYPE == "exchange"){
				if(masterVals[0]=="null"){
					
					formObj.s_xch_rt.value = "1.00";
				}else{
					// tax bill이 no일경우는 안가져온다.
					if(formObj.radio5.checked==false){
						formObj.s_xch_rt.value = doMoneyFmt(strToFloatByNDecimalTp(masterVals[0], 100));
					}
				}
				changedValue();
			}
			
		}else{
			if(CODETYPE == "trdpCode"){
				formObj.lr_trdp_cd.value  = ""; 
				formObj.lr_trdp_nm.value  = "";
				
			}else if(CODETYPE == "trdpCode_s"){
				sheetObj.cellValue(sheetObj.selectRow, "lr_trdp_cd") = ""; 
				sheetObj.cellValue(sheetObj.selectRow, "lr_trdp_nm")  = "";
				
			}else if(CODETYPE == "currency_s"){
				sheetObj.cellValue(sheetObj.selectRow, "curr_cd") = ""; 
				
			}else if(CODETYPE == "agmt_s"){
				sheetObj.cellValue(sheetObj.selectRow, "agmt_no") = ""; 
				
			}else if(CODETYPE == "booking_s"){
				sheetObj.cellValue(sheetObj.selectRow, "bkg_no") = "";
				
			}else if(CODETYPE == "location_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "pkup_nod_cd") = ""; 
				sheetObj.cellValue2(sheetObj.selectRow, "pkup_nod_nm") = ""; 

			}else if(CODETYPE == "node_s"){
				sheetObj.cellValue2(sheetObj.selectRow, "cy_cd") = ""; 
				sheetObj.cellValue2(sheetObj.selectRow, "cy_nm") = "";
				
			}else if(CODETYPE == "exchange"){				
				formObj.s_xch_rt.value = "1.00";
			}
		}
	}else{
		alert(getLabel('EQU_INV_MSG01'));		
	}
}

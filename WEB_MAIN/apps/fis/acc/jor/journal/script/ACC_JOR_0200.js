var TODAY;
var SLIP_POST_DT;
var rtnary 	= new Array(1);
function doWork(srcName){
	if(!btnVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj  = docObjects[0];
    var sheetObj2 = docObjects[1];
    var formObj   = document.frm1;

    switch(srcName) {
    	
    
	   case "DEFAULT":
	        
	   break;
   
       case "SEARCHLIST":
    	   	
    	   
    	    // 화면일부 클리어
    	    clearInput();

    	    if(formObj.s_jnr_no.value == ""){
    	    	if(formObj.s_cust_cd.value == ""){
        	    	//Select the Customer in advance!
    	    		alert(getLabel('ACC_COM_ALT005') + "\n\n: ACC_JOR_0200.29");

        	    	formObj.s_cust_cd.focus();
        	    	return;
        	    }
    	    }else{
    	    	formObj.f_jnr_no.value = formObj.s_jnr_no.value;
    	    }
    	    
    	    
    	    if(formObj.dept_chk1.checked){
    	    	formObj.dept_chk1.value = "Y";
    	    }
    	    if(formObj.dept_chk2.checked){
    	    	formObj.dept_chk2.value = "Y";
    	    }
    	    if(formObj.dept_chk3.checked){
    	    	formObj.dept_chk3.value = "Y";
    	    }
    	    
    	    formObj.f_cmd.value = SEARCHLIST;
            //검증로직
            docObjects[0].DoSearch4Post("./ACC_JOR_0200GS.clt", FormQueryString(formObj));
            
       break;
       case "ROWADD":
    	    if(formObj.s_cust_cd.value == ""){
    	    	//Select the Customer in advance!
	    		alert(getLabel('ACC_COM_ALT005') + "\n\n: ACC_JOR_0200.57");

	   	    	formObj.s_cust_cd.focus();
	   	    	return;
	   	    }
    	    if(sheetObj.CellValue(1, "inv_post_dt") == ""){
    	    	
    	    	sheetObj.RemoveAll();
    	    	var intRows = sheetObj.Rows;
                sheetObj.DataInsert(intRows);
                
                sheetObj.RowBackColor(intRows) = sheetObj.RgbColor(239,235,239);
                
                sheetObj.ColBackColor(0) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(1) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(2) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(3) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(6) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(7) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(8) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(9) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(12) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(15) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(17) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(18) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(19) = sheetObj.RgbColor(255,255,255);
        		
                sheetObj.CellEditable(intRows, "ofc_cd") 			= true;
                sheetObj.CellEditable(intRows, "buy_inv_no")		= true;
                sheetObj.CellEditable(intRows, "gl_no") 			= true;
                sheetObj.CellEditable(intRows, "ref_no") 			= true;
                sheetObj.CellEditable(intRows, "bl_no") 			= true;
                sheetObj.CellEditable(intRows, "jnr_desc") 			= true;
                sheetObj.CellEditable(intRows, "inv_aply_curr_cd") 	= true;
                sheetObj.CellEditable(intRows, "inv_aply_xcrt") 	= true;
                sheetObj.CellEditable(intRows, "pay_amt") 			= true;
                sheetObj.CellEditable(intRows, "clr_flag") 			= false;
                
                
                sheetObj.CellValue(intRows, "chk_flag") = 1;
                sheetObj.CellValue(intRows, "inv_aply_curr_cd") = formObj.f_curr_cd.value;
    	        sheetObj.CellValue(intRows, "trdp_cd") = formObj.s_cust_cd.value;
    	        sheetObj.CellValue(intRows, "inv_aply_xcrt") = 1;
    	        sheetObj.CellValue(intRows, "clr_flag") = "1";
    	        sheetObj.CellValue(intRows, "gl_no") = "";
    	        sheetObj.CellValue(intRows, "inv_post_dt") = formObj.f_post_dt.value;
    	        
    	        
    	    }else{
    	    	var intRows = sheetObj.Rows;
                sheetObj.DataInsert(intRows);
                
                sheetObj.RowBackColor(intRows) = sheetObj.RgbColor(239,235,239);
                
                sheetObj.ColBackColor(0) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(1) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(2) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(3) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(6) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(7) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(8) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(9) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(12) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(15) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(17) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(18) = sheetObj.RgbColor(255,255,255);
        		sheetObj.ColBackColor(19) = sheetObj.RgbColor(255,255,255);
        		
                sheetObj.CellEditable(intRows, "ofc_cd") 			= true;
                //sheetObj.CellEditable(intRows, "inv_tp") 			= true;
                sheetObj.CellEditable(intRows, "buy_inv_no")		= true;
                sheetObj.CellEditable(intRows, "gl_no") 			= true;
                sheetObj.CellEditable(intRows, "ref_no") 			= true;
                sheetObj.CellEditable(intRows, "bl_no") 			= true;
                sheetObj.CellEditable(intRows, "jnr_desc") 			= true;
                sheetObj.CellEditable(intRows, "inv_aply_curr_cd") 	= true;
                sheetObj.CellEditable(intRows, "inv_aply_xcrt") 	= true;
                sheetObj.CellEditable(intRows, "pay_amt") 			= true;
                sheetObj.CellEditable(intRows, "clr_flag") 			= false;
                
                
                sheetObj.CellValue(intRows, "chk_flag") = 1;
                sheetObj.CellValue(intRows, "inv_aply_curr_cd") = formObj.f_curr_cd.value;
    	        sheetObj.CellValue(intRows, "trdp_cd") = formObj.s_cust_cd.value;
    	        sheetObj.CellValue(intRows, "inv_aply_xcrt") = 1;
    	        sheetObj.CellValue(intRows, "clr_flag") = "1";
    	        sheetObj.CellValue(intRows, "gl_no") = "";
    	        sheetObj.CellValue(intRows, "inv_post_dt") = formObj.f_post_dt.value;
    	    }
       		
            
       break;
       
       case "MODIFY":	//수정
    	   
		   frm1.f_cmd.value = MODIFY;
       	   
		   
		   if(formObj.s_cust_cd.value == ""){
			   //[Customer] is mandatory field.
			   alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_JOR_0200.157");
			   
			   formObj.s_cust_cd.focus();
			   return;
		   }
		   
		   if(formObj.f_post_dt.value == ""){
			   //[Post Date] is mandatory field.
			   alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_JOR_0200.165");
			   
			   formObj.f_post_dt.focus();
			   return;
		   }
		   
		   var chkCnt = 0;
		   
		   for(var i=1;i<=sheetObj.LastRow;i++){
			   if(sheetObj.CellValue(i, "chk_flag") == "1"){
				   if(sheetObj.CellValue(i, "inv_post_dt") == ""){
					   //[Post Date] is mandatory field.
					   alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_JOR_0200.177");
					   
					   sheetObj.SelectCell(i, "inv_post_dt",false);
					   return;
				   }
				   
				   if(sheetObj.CellValue(i, "inv_aply_xcrt") == ""){
					   //[Ex.Rate] is mandatory field.
					   alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_JOR_0200.185");
					   
					   sheetObj.SelectCell(i, "inv_aply_xcrt",false);
					   return;
				   }
				   
				   chkCnt += 1;
			   }
		   }

		   if(formObj.f_jnr_no.value == ""){
			   if(chkCnt == 0){
				   //No Save Row Data!
				   
				   return;
			   }
		   }
		   
           if(confirm(getLabel('FMS_COM_CFMSAV'))){
        	   if(formObj.deposit_chk.checked){
        		   formObj.deposit_chk.value = "Y";
        	   }
        	   else{
        		   formObj.deposit_chk.value = "N";
        	   }
        	   
        	   if(formObj.void_chk.checked){
        		   formObj.void_chk.value = "Y";
        	   }
        	   else{
        		   formObj.void_chk.value = "N";
        	   }
       		
       		   var rcv_amt = 0;

    		   for(var i=1; i<=sheetObj.LastRow; i++){
    			   if(formObj.f_jnr_no.value != "" && formObj.f_jnr_no.value != undefined){
	    			   if(sheetObj.CellValue(i, "ibflag") != "I"){
						   sheetObj.CellValue(i, "ibflag") = "U";
					   }
    			   }
    			   
    			   // Received Amount 그리드의 PAY_AMT의 합계
    			   rcv_amt += Number(sheetObj.CellValue(i, "pay_amt"));
    		   }

    		   formObj.f_rcv_amt.value = doMoneyFmt(parseFloat(roundXL(rcv_amt,2)).toFixed(2));
    		   formObj.f_rcv_amt.value = removeComma(formObj.f_rcv_amt.value);
        	   
        	   var sht2 = sheetObj2.GetSaveString(false);		//Bill Collecting List
	           var intRows2 = sheetObj2.Rows;
	           sheetObj2.DataInsert(intRows2);
	           
	           sheetObj.DoAllSave("./ACC_JOR_0200GS.clt", FormQueryString(formObj)+'&'+sht2, true);
           }
       
           break;
       
       case "DELETE":	//삭제
           
    	   frm1.f_cmd.value = REMOVE;
    	   
    	   /*
    	   var chkCnt = 0;
		   for(var i=1;i<=sheetObj.LastRow;i++){
			   if(sheetObj.CellValue(i, "chk_flag") == "1"){
				   chkCnt += 1;
			   }
		   }
		   
		   if(chkCnt == 0){
			   alert("삭제할  Row데이터가 없습니다!");
			   return;
		   }
		   */
    	   
           if(confirm(getLabel('FMS_COM_CFMDEL'))){
        	   for(var i=1; i<=sheetObj.LastRow; i++){
    			   sheetObj.CellValue(i, "ibflag") = "D";
    		   }
        	   
        	   var sht2 = sheetObj2.GetSaveString(false);		//Bill Collecting List
	           var intRows2 = sheetObj2.Rows;
	           sheetObj2.DataInsert(intRows2);
	           
	           sheetObj.DoAllSave("./ACC_JOR_0200GS.clt", FormQueryString(formObj)+'&'+sht2, true);
           }
       
           break;
       
       case "CUSTOMER_POPLIST"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
	   		rtnary 	= new Array(1);
	   		rtnary[0] 	= "";
	   		rtnary[1] 	= formObj.s_cust_nm.value;
	   		rtnary[2] = window;
	   		
 	        var rtnVal = window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
 	        
 	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}
 	        else{
				var rtnValAry = rtnVal.split("|");
				formObj.s_cust_cd.value  = rtnValAry[0];
				formObj.s_cust_nm.value  = rtnValAry[2];
				formObj.f_rcv_from.value = rtnValAry[2];
			}             
    	
 	        break;
    	
       case "CUSTOMER_POPLIST2"://openMean 1 = 화면에서 오픈, 2 = 그리드에서 오픈
	   		rtnary 	= new Array(1);
	   		rtnary[0] 	= "";
	   		rtnary[1] 	= formObj.f_rcv_from.value;
	   		rtnary[2] = window;
	   		
	        var rtnVal 	= window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
	        
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}
	        else{
				var rtnValAry = rtnVal.split("|");
				formObj.f_rcv_from.value = rtnValAry[2];
			}             
   	   
	        break;
        
        case "PRINT":
        	var chkCnt = 0;
        	
        	for(var i=1; i<=sheetObj.LastRow;i++){
        		if(sheetObj.CellValue(i, "check_flag") == "1"){
        			chkCnt += 1;
        		}
        	}
        	
        	if(chkCnt == 1){
        		var inv_no     = formObj.f_inv_no.value;
    			var print_type = formObj.f_print_type.value;
    			
    			if(print_type == "A/P"){
        			//Can not print[Account Payable]
    				alert(getLabel('ACC_COM_ALT001') + "\n\n: ACC_JOR_0200.326");
    				
        			return;
        		}

    			var reqParam = '?f_inv_no='+ inv_no+'&f_print_type=' + print_type;
    			
    			popGET('ACC_INV_0050.clt'+reqParam, '', 390, 250, "scroll:yes;status:no;help:no;");
        	}
        	else if(chkCnt == 0){
        		//Please select the row to print.
        		alert(getLabel('FMS_COM_ALT004') + "\n\n: ACC_JOR_0200.336");
        		
        		return;
        	}
        	else{
        		//Please select one row.
        		alert(getLabel('FMS_COM_ALT003') + "\n\n: ACC_JOR_0200.342");
        		
        		return;
        	}
        
        	break;
    }
}

//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;
var ctlKind = "";
var ctlCol = 0;
var ctlRow = 0;
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
	
	//오늘일자구하기
	var now 	= new Date(); 				
	var year	= now.getYear(); 			
	var month	= now.getMonth() + 1; 		
	var date	= now.getDate(); 			
	
	if(month < 10){
		month = "0"+(month);
	}
	if(date < 10){
		date = "0"+date;
	}
	
	TODAY    = month + "-" + date + "-" + year;
	
	formObj.f_post_dt.value = TODAY;
	formObj.old_post_dt.value = TODAY;
	
	formObj.s_jnr_no.value  = formObj.t_jnr_no.value;
	formObj.s_cust_cd.value = formObj.t_cust_cd.value;
	formObj.s_inv_no.value  = formObj.t_inv_no.value;
	
	// POST DATE가 SLIP의 MAX(POST_DT) 보다 작으면.. MAX(POST_DT) + 1 로 셋팅한다.
	var bl_post   = formObj.f_post_dt.value;
	var slip_post = formObj.slip_post.value;
	
	if(bl_post != "" && slip_post != ""){
		bl_post   = bl_post.replaceAll("-","");
		bl_post   = bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
		slip_post = slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
		if(slip_post >= bl_post){
			SLIP_POST_DT = addDay(formObj.slip_post.value, 1);
			formObj.f_post_dt.value   = SLIP_POST_DT;
			formObj.old_post_dt.value = SLIP_POST_DT;
		}else{
			SLIP_POST_DT = "";
		}
	}
	
	if(formObj.s_jnr_no.value != "" || formObj.s_cust_cd.value != ""){
		if(formObj.s_cust_cd.value != ""){
			formObj.s_cust_cd.focus();
			formObj.s_cust_cd.blur();
		}
    	doWork("SEARCHLIST");
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
	             MergeSheet = msHeaderOnly;
	
	             //전체Edit 허용 여부 [선택, Default false]
	             Editable = true;
	
	             //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
	             InitRowInfo( 1, 1, 9, 100);
	
	             //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
	             InitColumnInfo(40, 0, 0, true);
	
	             // 해더에서 처리할 수 있는 각종 기능을 설정한다
	             InitHeadMode(true, true, true, true, false,false) ;
	             
	             //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
	             InitHeadRow(0, getLabel('ACC_JOR_0200_HDR'), true);
	             
	             var cnt = 0;
	             //데이터속성    [ROW,  COL, DATATYPE,  	  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
	             InitDataProperty(0, cnt++,  dtDelCheck,    30,   daCenter,  true,    "del_chk",        false,   "",       dfNone,          1,     true,       true,			-1,			false,		true,	 "",		false);
	             InitDataProperty(0, cnt++,  dtCheckBox,    30,   daCenter,  true,    "chk_flag",       false,   "",        dfNone,         0,     true,       true,			-1,			false,		true,	 "",		false);
	             InitDataProperty(0, cnt++,  dtData,    	70,   daCenter,  true,    "inv_post_dt",    false,   "",       	dfDateYmd,      0,     true,       true);
	             InitDataProperty(0, cnt++,  dtCombo,       50,   daCenter,  true,    "ofc_cd",        	false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,        60,   daCenter,  true,    "inv_dept_cd",    false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,   	    50,   daCenter,  true,    "inv_tp",        	false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden,     100,   daCenter,  true,    "inv_no",        	false,   "",     	dfNone,    		0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,        90,   daCenter,  true,    "buy_inv_no",    	false,   "",     	dfNone,    		0,     false,      false);
	             InitDataProperty(0, cnt++,  dtCombo,       60,   daCenter,  true,    "inv_aply_curr_cd",	false,   "",   	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,        60,   daRight,   true,    "inv_aply_xcrt",  false,   "",      	dfNullFloat,    4,     true,       true);
	             InitDataProperty(0, cnt++,  dtData,       100,   daRight,   true,    "inv_sum_amt",    false,   "",   		dfFloat,    	2,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,       100,   daRight,   true,    "bal_sum_amt",    false,   "",   		dfFloat,        2,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,       100,   daRight,   true,    "pay_amt",    	false,   "",       	dfFloat,    	2,     true,       true);
	             InitDataProperty(0, cnt++,  dtData,       100,   daRight,   true,    "ttl_pay_amt",    false,   "",  		dfFloat,        2,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden,      90,   daRight,   true,    "old_pay_amt",    false,   "",       	dfFloat,    	2,     true,       true);
	             InitDataProperty(0, cnt++,  dtCombo,       70,   daCenter,  true,    "gl_no",        	false,   "",       	dfNone,    		0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,       110,   daLeft,    true,    "gl_rmk",        	false,   "",       	dfNone,    		0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden,      80,   daCenter,  true,    "ref_no",    		false,   "",       	dfNone,      	0,     true,       true);
	             InitDataProperty(0, cnt++,  dtHidden,     110,   daCenter,  true,    "bl_no",        	false,   "",      	dfNone,    	    0,     false,      false);
	             InitDataProperty(0, cnt++,  dtData,       120,   daCenter,  true,    "jnr_desc",       false,   "",      	dfNone,    	    0,     true,       true);
	             InitDataProperty(0, cnt++,  dtCheckBox,    40,   daCenter,  true,    "clr_flag",     	false,   "",      	dfNone,         0,     true,       true,			-1,			false,		true,	 "",		false);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "inv_seq",        false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "jnr_no",    		false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "jnr_seq",   		false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "trdp_cd",   		false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "clr_gl",   		false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHiddenStatus,30,   daCenter,  true,    "ibflag",         false,   "",       	dfNone,         0,     true,       true);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "r_post_dt",   	false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "r_bank_seq",   	false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "r_clr_yn",   	false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "r_clr_dt",   	false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "r_void_yn",   	false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "r_void_dt",   	false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "r_chk_no",   	false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "r_amt",   		false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "r_curr_cd",   	false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "r_rmk",   		false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "sell_buy_tp_cd", false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "clt_cmpl_flg",   false,   "",       	dfNone,         0,     false,      false);
	             InitDataProperty(0, cnt++,  dtHidden, 		30,   daCenter,  true,    "clr_row",   		false,   "",       	dfNone,         0,     false,      false);
	             
	             InitViewFormat(0, "inv_post_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	             EditDateFormat = "MDY"; //그리드에 입력할 때 월/일/년 순으로 입력되게 설정	
	             
	             InitDataCombo (0, "ofc_cd",     		OFCCD,  OFCCD);   
	             InitDataCombo (0, "inv_aply_curr_cd",  CURRCD, CURRCD);
	             InitDataCombo (0, "gl_no",     		GLCD,   GLCD);
	             
	             //docObjects[0].InitColumnInfo(20, 6, 0, true);
      			
           }                                                      
           break;
           
           
           
           
         case 2:      //IBSheet2 init

             with (sheetObj) {
 	        	 // 높이 설정
 	             style.height = 0;
 	             
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
 	             InitColumnInfo(2, 0, 0, true);
 	
 	             // 해더에서 처리할 수 있는 각종 기능을 설정한다
 	             InitHeadMode(true, true, true, true, false,false) ;
 	             
 	             //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
 	             InitHeadRow(0, "inv_seq|ibflag2", true);
 	             
 	             var cnt = 0;
 	             //데이터속성    [ROW,  COL, DATATYPE,  WIDTH, DATAALIGN, COLMERGE, SAVENAME,       KEYFIELD,   CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
 	             InitDataProperty(0,0,  dtData, 		30,   daCenter,  true,    "inv_seq",        false,   "",       dfNone,          1,     true,       true);
 	             InitDataProperty(0,1,  dtStatus, 		30,   daCenter,  true,    "ibflag2",         false,   "",       dfNone,         1,     true,       true);
 	             
       			
            }                                                      
            break;
            
            
            
     }
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	formObj.s_jnr_no.value = "";
	
	for(var i=1;i<=sheetObj.LastRow;i++){
		sheetObj.RowBackColor(i) = sheetObj.RgbColor(239,235,239);
		
		sheetObj.ColBackColor(0)  = sheetObj.RgbColor(255,255,255);
		sheetObj.ColBackColor(1)  = sheetObj.RgbColor(255,255,255);
		sheetObj.ColBackColor(2)  = sheetObj.RgbColor(255,255,255);
		sheetObj.ColBackColor(9)  = sheetObj.RgbColor(255,255,255);
		sheetObj.ColBackColor(12) = sheetObj.RgbColor(255,255,255);
		sheetObj.ColBackColor(17) = sheetObj.RgbColor(255,255,255);
		sheetObj.ColBackColor(19) = sheetObj.RgbColor(255,255,255);
		sheetObj.ColBackColor(20) = sheetObj.RgbColor(255,255,255);
		
		if(sheetObj.CellValue(i, "clr_flag") == "1"){
			sheetObj.CellEditable(i, "clr_flag") = false;
		}else{
			
		}
	}
	

	if(sheetObj.CellValue(1,"jnr_no") != "" ){
		formObj.f_jnr_no.value   = sheetObj.CellValue(1, "jnr_no");
		
		formObj.f_curr_cd.value 	= sheetObj.CellValue(1, "r_curr_cd");
		formObj.f_chk_no.value 		= sheetObj.CellValue(1, "r_chk_no");
		
		
		if(sheetObj.CellValue(1, "r_clr_yn") == "Y"){
			formObj.deposit_chk.checked = true;
		}else{
			formObj.deposit_chk.checked = false;
		}
		
		if(sheetObj.CellValue(1, "r_void_yn") == "Y"){
			formObj.void_chk.checked = true;
		}else{
			formObj.void_chk.checked = false;
		}
		
		formObj.f_deposit_dt.value 	= sheetObj.CellValue(1, "r_clr_dt");
		
		
		//VOID CHECK 수정유무 
		formObj.old_void_chk.value	= sheetObj.CellValue(1, "r_void_yn");
		
		formObj.f_void_dt.value 	= sheetObj.CellValue(1, "r_void_dt");
		formObj.f_rcv_amt.value 	= sheetObj.CellValue(1, "r_amt");
		formObj.f_post_dt.value 	= sheetObj.CellValue(1, "r_post_dt");
		formObj.f_bank_cd.value 	= sheetObj.CellValue(1, "r_bank_seq");
		formObj.f_remark.value 		= sheetObj.CellValue(1, "r_rmk");
		
		var rcv_amt = 0;
		// Received Amount 그리드의 PAY_AMT의 합계
		for(var i=1;i<=sheetObj.LastRow;i++){
			rcv_amt += Number(sheetObj.CellValue(i, "pay_amt"));
			
			//2012/02/02 저장데이터 조회시 리스트를 체크한다.
			sheetObj.CellValue2(i, "chk_flag") = "1";
			
			//2012/02/08 생성된 데이터의 글자색을 바꾼다.
			sheetObj.RowFontColor(i) = sheetObj.RgbColor(255,0,0);
			
		}
		
		formObj.f_rcv_amt.value = doMoneyFmt(parseFloat(roundXL(rcv_amt,2)).toFixed(2));
		if(sheetObj.CellValue(1, "trdp_cd") != ""){
			formObj.s_cust_cd.value = sheetObj.CellValue(1, "trdp_cd");
			codeNameAction('CUSTOMER',formObj.s_cust_cd, 'onBlur');
		}
		
		
		// DEPOSIT, CLEAR, VOID 시 ADD버튼  없애기 그리드데이터 DISABLE
		if(sheetObj.CellValue(1, "r_void_yn") == "Y" || sheetObj.CellValue(1, "r_clr_yn") == "Y"){
			for(var i=1;i<=sheetObj.LastRow;i++){
				sheetObj.RowEditable(i) = false;
			}
			
		}else{
			
		}
		
		//마감후 저장 및 삭제 금지  LEVEL 1 은 DELETE가 없기때문에 SAVE 버튼만 제어한다.
		if(sheetObj.CellValue(1, "clt_cmpl_flg") == "Y"){
			getObj('saveBtn1').style.display = "none";
			getObj('saveBtn2').style.display = "none";
			getBtnObj('btnModify').style.display = "none";
		}
		
	}else{
		formObj.f_post_dt.value = TODAY;
		
		formObj.f_inv_amt.value = "";
		formObj.f_bal_amt.value = "";
		formObj.f_pay_amt.value = "";
		
	}
	
	
} 

//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	
	formObj.f_jnr_no.value   = sheetObj.CellValue(1, "jnr_no");
	
	formObj.s_jnr_no.value = "";
	
	
	if(formObj.f_jnr_no.value != ""){
		formObj.f_curr_cd.value 	= sheetObj.CellValue(1, "r_curr_cd");
		formObj.f_chk_no.value 		= sheetObj.CellValue(1, "r_chk_no");
		
		if(sheetObj.CellValue(1, "r_clr_yn") == "Y"){
			formObj.deposit_chk.checked = true;
		}else{
			formObj.deposit_chk.checked = false;
		}
		
		if(sheetObj.CellValue(1, "r_void_yn") == "Y"){
			formObj.void_chk.checked = true;
		}else{
			formObj.void_chk.checked = false;
		}
		
		
		formObj.f_deposit_dt.value 	= sheetObj.CellValue(1, "r_clr_dt");
		
		
		//VOID CHECK 수정유무 
		formObj.old_void_chk.value	= sheetObj.CellValue(1, "r_void_yn");
		
		formObj.f_void_dt.value 	= sheetObj.CellValue(1, "r_void_dt");
		formObj.f_rcv_amt.value 	= sheetObj.CellValue(1, "r_amt");
		formObj.f_post_dt.value 	= sheetObj.CellValue(1, "r_post_dt");
		formObj.f_bank_cd.value 	= sheetObj.CellValue(1, "r_bank_seq");
		formObj.f_remark.value 		= sheetObj.CellValue(1, "r_rmk");
		
		var rcv_amt = 0;
		// Received Amount 그리드의 PAY_AMT의 합계
		for(var i=1;i<=sheetObj.LastRow;i++){
			rcv_amt += Number(sheetObj.CellValue(i, "pay_amt"));
			
			
			sheetObj.RowBackColor(i) = sheetObj.RgbColor(239,235,239);
			
			sheetObj.ColBackColor(0)  = sheetObj.RgbColor(255,255,255);
			sheetObj.ColBackColor(1)  = sheetObj.RgbColor(255,255,255);
			sheetObj.ColBackColor(2)  = sheetObj.RgbColor(255,255,255);
			sheetObj.ColBackColor(9)  = sheetObj.RgbColor(255,255,255);
			sheetObj.ColBackColor(12) = sheetObj.RgbColor(255,255,255);
			sheetObj.ColBackColor(17) = sheetObj.RgbColor(255,255,255);
			sheetObj.ColBackColor(19) = sheetObj.RgbColor(255,255,255);
			sheetObj.ColBackColor(20) = sheetObj.RgbColor(255,255,255);
			
			//2012/02/02 저장데이터 조회시 리스트를 체크한다.
			sheetObj.CellValue2(i, "chk_flag") = "1";
			
			//2012/02/08 생성된 데이터의 글자색을 바꾼다.
			sheetObj.RowFontColor(i) = sheetObj.RgbColor(255,0,0);
			
		}
		
		formObj.f_rcv_amt.value = doMoneyFmt(parseFloat(roundXL(rcv_amt,2)).toFixed(2));
		if(sheetObj.CellValue(1, "trdp_cd") != ""){
			formObj.s_cust_cd.value = sheetObj.CellValue(1, "trdp_cd");
			codeNameAction('CUSTOMER',formObj.s_cust_cd, 'onBlur');
		}
		
		
		// DEPOSIT, CLEAR, VOID 시 ADD버튼  없애기 그리드데이터 DISABLE
		if(sheetObj.CellValue(1, "r_void_yn") == "Y" || sheetObj.CellValue(1, "r_clr_yn") == "Y"){
			for(var i=1;i<=sheetObj.LastRow;i++){
				sheetObj.RowEditable(i) = false;
			}
			
		}else{

		}
		
		//마감후 저장 및 삭제 금지  LEVEL 1 은 DELETE가 없기때문에 SAVE 버튼만 제어한다.
		if(sheetObj.CellValue(1, "clt_cmpl_flg") == "Y"){
			getObj('saveBtn1').style.display = "none";
			getObj('saveBtn2').style.display = "none";
			getBtnObj('btnModify').style.display = "none";
		}
		
	}else{
		
		clearAll();
	}
	
	
	
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj  = document.frm1;
	
    switch (sheetObj.ColSaveName(Col)) {
	    case "clr_flag" :
			
			if(sheetObj.CellValue(Row, "clr_flag") == "0"){
				if(sheetObj.CellValue(Row, "inv_aply_xcrt") == 0){
					//[Ex.Rate] is mandatory field.
					alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_JOR_0200.821");
					
					sheetObj.SelectCell(Row, "inv_aply_xcrt");
					sheetObj.CellValue(Row, "clr_flag") = 1;
					return;
				}
				
				if(sheetObj.CellValue(Row, "ttl_pay_amt") == 0){
					//[Payment] is mandatory field.
					alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_JOR_0200.830");
					
					sheetObj.SelectCell(Row, "pay_amt");
					sheetObj.CellValue(Row, "clr_flag") = 1;
					return;
				}
				
				var inv_sum_amt = Number(sheetObj.CellValue(Row, "inv_sum_amt"));
				var bal_sum_amt = Number(sheetObj.CellValue(Row, "bal_sum_amt"));
				var ttl_pay_amt = Number(sheetObj.CellValue(Row, "ttl_pay_amt"));
				
				if((bal_sum_amt - ttl_pay_amt) != 0 ){
					sheetObj.DataInsert(Row);
	
			        if(ttl_pay_amt < bal_sum_amt){
			        	ttl_pay_amt = bal_sum_amt - ttl_pay_amt;
			        	
			        	if(formObj.f_curr_cd.value != sheetObj.CellValue(Row, "inv_aply_curr_cd")){
			        		sheetObj.CellValue(Row+1, "clr_gl") = "EL";
			        	}
			        	else{
			        		sheetObj.CellValue(Row+1, "clr_gl") = "ML";
			        	}
			        	
			        	
			        }else if(ttl_pay_amt > bal_sum_amt){
			        	ttl_pay_amt = ttl_pay_amt - bal_sum_amt;
			        	
			        	if(formObj.f_curr_cd.value != sheetObj.CellValue(Row, "inv_aply_curr_cd")){
			        		sheetObj.CellValue(Row+1, "clr_gl") = "EP";
			        	}
			        	else{
			        		sheetObj.CellValue(Row+1, "clr_gl") = "MP";
			        	}
			        }
			        
			        sheetObj.CellValue(Row+1, "chk_flag") 		= 1;
			        sheetObj.CellValue(Row+1, "inv_post_dt") 	= sheetObj.CellValue(Row, "inv_post_dt");
			        sheetObj.CellValue(Row+1, "ofc_cd") 		= sheetObj.CellValue(Row, "ofc_cd");
			        sheetObj.CellValue(Row+1, "inv_dept_cd") 	= sheetObj.CellValue(Row, "inv_dept_cd");
			        sheetObj.CellValue(Row+1, "inv_tp") 		= sheetObj.CellValue(Row, "inv_tp");
			        sheetObj.CellValue(Row+1, "inv_no") 		= sheetObj.CellValue(Row, "inv_no");
			        sheetObj.CellValue(Row+1, "gl_no") 			= sheetObj.CellValue(Row, "gl_no");
			        sheetObj.CellValue(Row+1, "ref_no") 		= sheetObj.CellValue(Row, "ref_no");
			        sheetObj.CellValue(Row+1, "bl_no") 			= sheetObj.CellValue(Row, "bl_no");
			        sheetObj.CellValue(Row+1, "jnr_desc") 		= sheetObj.CellValue(Row, "jnr_desc");
			        sheetObj.CellValue(Row+1, "inv_aply_curr_cd") = sheetObj.CellValue(Row, "inv_aply_curr_cd");
			        sheetObj.CellValue(Row+1, "inv_aply_xcrt") 	= sheetObj.CellValue(Row, "inv_aply_xcrt");
			        sheetObj.CellValue(Row+1, "inv_sum_amt") 	= sheetObj.CellValue(Row, "inv_sum_amt");
			        sheetObj.CellValue(Row+1, "bal_sum_amt") 	= sheetObj.CellValue(Row, "bal_sum_amt");
			        sheetObj.CellValue(Row+1, "pay_amt") 		= 0;
			        sheetObj.CellValue(Row+1, "ttl_pay_amt") 	= ttl_pay_amt;
			        sheetObj.CellValue(Row+1, "inv_seq") 		= sheetObj.CellValue(Row, "inv_seq");
			        sheetObj.CellValue(Row+1, "trdp_cd") 		= sheetObj.CellValue(Row, "trdp_cd");
			        sheetObj.CellValue(Row+1, "clr_flag") 		= "1";
			        sheetObj.CellValue(Row+1, "clr_row") 		= "Y";
			        sheetObj.CellValue(Row+1, "sell_buy_tp_cd") = sheetObj.CellValue(Row, "sell_buy_tp_cd");
			        
			        sheetObj.RowBackColor(Row+1) = sheetObj.RgbColor(239,235,239);
			        sheetObj.ColBackColor(0)  = sheetObj.RgbColor(255,255,255);
			        sheetObj.CellEditable(Row+1, "chk_flag") 		= false;
			        sheetObj.CellEditable(Row+1, "inv_post_dt") 	= false;
			        sheetObj.CellEditable(Row+1, "ofc_cd") 			= false;
			        sheetObj.CellEditable(Row+1, "inv_dept_cd") 	= false;
			        sheetObj.CellEditable(Row+1, "inv_tp") 			= false;
			        sheetObj.CellEditable(Row+1, "inv_no") 			= false;
			        sheetObj.CellEditable(Row+1, "gl_no") 			= false;
			        sheetObj.CellEditable(Row+1, "ref_no") 			= false;
			        sheetObj.CellEditable(Row+1, "bl_no") 			= false;
			        sheetObj.CellEditable(Row+1, "jnr_desc") 		= false;
			        sheetObj.CellEditable(Row+1, "inv_aply_curr_cd") = false;
			        sheetObj.CellEditable(Row+1, "inv_aply_xcrt") 	= false;
			        sheetObj.CellEditable(Row+1, "inv_sum_amt") 	= false;
			        sheetObj.CellEditable(Row+1, "bal_sum_amt") 	= false;
			        sheetObj.CellEditable(Row+1, "pay_amt") 		= false;
			        sheetObj.CellEditable(Row+1, "ttl_pay_amt") 	= false;
			        sheetObj.CellEditable(Row+1, "clr_flag") 		= false;
				}
			}
		
			break;
		
	    case "del_chk" :
	    	
	    	if(sheetObj.CellValue(Row, "clr_row") == "Y"){
	    		sheetObj.CellValue(Row-1, "clr_flag") = "0";
	    	}
	   
	    	break;
    }
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj  = document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "pay_amt" :
			if(sheetObj.CellValue(Row, "clr_row") != "Y"){			
				sheetObj.CellValue(Row, "pay_amt") = sheetObj.CellValue(Row, "bal_sum_amt");
			}
		break;
		
	}
	
    
}

function sheet1_OnChange(sheetObj,Row,Col){
	var formObj  = document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
	
		case "pay_amt" :
			var ex_rate 	= Number(sheetObj.CellValue(Row, "inv_aply_xcrt"));
			var pay_amt 	= Number(sheetObj.CellValue(Row, "pay_amt"));
			var old_pay_amt = Number(sheetObj.CellValue(Row, "old_pay_amt"));
			
			sheetObj.CellValue(Row, "ttl_pay_amt") = ex_rate * pay_amt;
			
			if(Number(sheetObj.CellValue(Row, "ttl_pay_amt")) != 0){
				sheetObj.CellValue(Row, "chk_flag") = 1;
			}
			
			
			// 지급금액이 발런스 금액과 같으면 클리어 처리한다.
		    var inv_sum_amt = Number(sheetObj.CellValue(Row, "inv_sum_amt"));
		    var bal_sum_amt = Number(sheetObj.CellValue(Row, "bal_sum_amt"));
		    var ttl_pay_amt = Number(sheetObj.CellValue(Row, "ttl_pay_amt"));
		    if(inv_sum_amt == 0 && bal_sum_amt == 0){
		    	
		    }else{
		    	if(formObj.f_jnr_no.value != "" && formObj.f_jnr_no.value != undefined){
	 			    if(inv_sum_amt == ttl_pay_amt){
	 			    	sheetObj.CellValue(Row,"clr_flag") = "1";
	 			    }else{
	 				    sheetObj.CellValue(Row,"clr_flag") = "0";
	 			    }
			    }else{
				   
				    if(bal_sum_amt == ttl_pay_amt){
	 				    sheetObj.CellValue(Row,"clr_flag") = "1";
	 			    }else{
	 				    sheetObj.CellValue(Row,"clr_flag") = "0";
	 			    }
			    }
		    }
		    
			   
			
			
		break;
		
		case "inv_aply_xcrt" :
			var ex_rate = Number(sheetObj.CellValue(Row, "inv_aply_xcrt"));
			var pay_amt = Number(sheetObj.CellValue(Row, "pay_amt"));
			
			sheetObj.CellValue(Row, "ttl_pay_amt") = ex_rate * pay_amt;

			// 지급금액이 발런스 금액과 같으면 클리어 처리한다.
		    var inv_sum_amt = Number(sheetObj.CellValue(Row, "inv_sum_amt"));
		    var bal_sum_amt = Number(sheetObj.CellValue(Row, "bal_sum_amt"));
		    var ttl_pay_amt = Number(sheetObj.CellValue(Row, "ttl_pay_amt"));
		   
		    if(formObj.f_jnr_no.value != "" && formObj.f_jnr_no.value != undefined){
 			    if(inv_sum_amt == ttl_pay_amt){
 			    	sheetObj.CellValue(Row,"clr_flag") = "1";
 			    }else{
 				    sheetObj.CellValue(Row,"clr_flag") = "0";
 			    }
		    }else{

			    if(bal_sum_amt == ttl_pay_amt){
 				    sheetObj.CellValue(Row,"clr_flag") = "1";
 			    }else{
 				    sheetObj.CellValue(Row,"clr_flag") = "0";
 			    }
		    }
			
		break;
		
		case "chk_flag" :
			if(sheetObj.CellValue(Row, "chk_flag") == "1"){
				//formObj.f_inv_seq.value 	= sheetObj.CellValue(Row, "inv_seq");
				//formObj.f_inv_no.value  	= sheetObj.CellValue(Row, "inv_no");
				//formObj.f_print_type.value  = sheetObj.CellValue(Row, "inv_tp");
				
				if(sheetObj.CellValue(Row, "clr_row") != "Y"){		
					if(Number(sheetObj.CellValue(Row, "pay_amt")) == 0){
						sheetObj.CellValue(Row, "pay_amt") = sheetObj.CellValue(Row, "bal_sum_amt");
					}
				}
				
			}else{
				//formObj.f_inv_seq.value 	= "";
				//formObj.f_inv_no.value  	= "";
				//formObj.f_print_type.value  = "";
				
				if(sheetObj.CellValue(Row, "clr_row") != "Y"){			
					sheetObj.CellValue(Row, "pay_amt") = "";
				}
			}
		break;
		
		
		case "gl_no" :
			if(sheetObj.CellValue(Row, "gl_no") != ""){
				SELECTROW = Row;
				ajaxSendPost(getGlRmk, 'reqVal', '&goWhere=aj&bcKey=getGlRmk&s_gl_no='+sheetObj.CellValue(Row, "gl_no"), './GateServlet.gsl');
			}else{
				sheetObj.CellValue(Row, "gl_rmk") = "";
			}
		break;
		
		case "buy_inv_no" :
			
			sheetObj.CellValue(Row, "inv_no") = sheetObj.CellValue(Row, "buy_inv_no");
			
		break;
		
	}
	
	
	//TOTAL 값을 계산한다.
	var inv_amt = 0;
	var bal_amt = 0;
	var pay_amt = 0;
	
	for(var i=1;i<=sheetObj.LastRow;i++){
		if(sheetObj.CellValue(i, "chk_flag") == "1"){
			inv_amt += Number(sheetObj.CellValue(i, "inv_sum_amt"));
			bal_amt += Number(sheetObj.CellValue(i, "bal_sum_amt"));
			pay_amt += Number(sheetObj.CellValue(i, "pay_amt"));
		}
	}
	
	formObj.f_inv_amt.value = doMoneyFmt(parseFloat(roundXL(inv_amt,2)).toFixed(2));
	formObj.f_bal_amt.value = doMoneyFmt(parseFloat(roundXL(bal_amt,2)).toFixed(2));
	formObj.f_pay_amt.value = doMoneyFmt(parseFloat(roundXL(pay_amt,2)).toFixed(2));
		
	formObj.f_rcv_amt.value = doMoneyFmt(parseFloat(roundXL(pay_amt,2)).toFixed(2));
}


/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){

    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출  
	    	var cal = new calendarPopup();
	        cal.select(formObj.f_deposit_dt, 'f_deposit_dt', 'MM-dd-yyyy');
	    break;
	    
	    case 'DATE2':    //달력 조회 팝업 호출      
	    	var cal = new calendarPopup();
	        cal.select(formObj.f_void_dt, 'f_void_dt', 'MM-dd-yyyy');
	    break;
	    
	    case 'DATE3':    //달력 조회 팝업 호출      
	    	var cal = new calendarPopup();
	        cal.select(formObj.f_post_dt, 'f_post_dt', 'MM-dd-yyyy');
	    break;
       
    }
}








/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj = document.frm1;
	var s_code = obj.value.toUpperCase();		
	var s_type = "";
	
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE = str;	
				s_type = "trdpCode";
				if(CODETYPE=="CUSTOMER"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');

				}
				
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE = str;		
				s_type = "trdpCode";
				if(CODETYPE=="CUSTOMER"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
					
				}
			}
		}
	}else{
		formObj.s_cust_cd.value  = "";//trdp_cd  AS param1
		formObj.s_cust_nm.value  = "";//eng_nm   AS param2
		formObj.f_rcv_from.value = "";
	}
}



/**
 * Trade Partner 관린 코드조회
 */
function trdpCdReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	if(doc[0]=='OK'){

		if(typeof(doc[1])!='undefined'){

			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('@@;');
			
			var masterVals = rtnArr[0].split('@@^');	
			if(CODETYPE =="CUSTOMER"){
				formObj.s_cust_cd.value  = masterVals[0];	//trdp_cd  AS param1
				formObj.s_cust_nm.value  = masterVals[3];		//eng_nm   AS param2
				formObj.f_rcv_from.value = masterVals[3];
				
			}
			
		}else{
			if(CODETYPE =="CUSTOMER"){
				formObj.s_cust_cd.value  = "";//trdp_cd  AS param1
				formObj.s_cust_nm.value  = "";//eng_nm   AS param2
				formObj.f_rcv_from.value = "";
				
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}



/**
 * GL_CD 관린 코드조회
 */
function getGlRmk(reqVal){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	var doc = getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('^@');

			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				sheetObj.SetCellValue(SELECTROW, "gl_no")  		= rtnArr[0];
				sheetObj.SetCellValue(SELECTROW, "gl_rmk") 		= rtnArr[1];
			}
		}else{
			sheetObj.SetCellValue(SELECTROW, "gl_no")  		= "";
			sheetObj.SetCellValue(SELECTROW, "gl_rmk") 		= "";
			
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}


/**
 * AJAX RETURN
 * GL_RMK 를 가져온다.
 */
function getInvInfo(reqVal){
	var formObj  = document.frm1;
	var doc = getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('^@');

			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				frm1.f_inv_seq.value  		= rtnArr[0];
				frm1.s_inv_no.value  		= rtnArr[1];

				doWork("DEFAULT");
			}else{
				frm1.f_inv_seq.value  		= "";
				frm1.s_inv_no.value  		= "";
				clearAll();
				formObj.s_inv_no.focus();
				
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}


function setVoidDate(){
	var formObj  = document.frm1;
	
	if(formObj.void_chk.checked){
		formObj.f_void_dt.value = TODAY;
	}else{
		formObj.f_void_dt.value = "";
	}
}

function setDepositDate(){
	var formObj  = document.frm1;
	
	if(formObj.deposit_chk.checked){
		if(formObj.f_deposit_dt.value == ""){
			
			// 마감 POST DATE와  BL POST DATE 비교( BL의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
			var today = "";
			var slip_post = formObj.slip_post.value;
			
			if(slip_post != ""){
				today   = TODAY.replaceAll("-","");
				today   = today.substring(4,8)+today.substring(0,2)+today.substring(2,4);
				slip_post = slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
				if(slip_post >= today){
					formObj.f_deposit_dt.value = SLIP_POST_DT;
				}else{
					formObj.f_deposit_dt.value = TODAY;
				}
			}else{
				formObj.f_deposit_dt.value = TODAY;
			}
		}
	}else{
		formObj.f_deposit_dt.value = "";
	}
}



//화면 클리어
function clearAll(){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	var collTxt = document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  collTxt[i].value = "";
	  }           
	}
	
	setSelection();
	frm1.f_post_dt.value = TODAY;
	formObj.deposit_chk.checked = false;
	formObj.void_chk.checked = false;
	
	formObj.s_jnr_no.value = "";
	
	getObj('saveBtn1').style.display  = "inline";
	getObj('saveBtn2').style.display  = "inline";
	getBtnObj('btnModify').style.display  = "inline";
	
	sheetObj.RemoveAll();
}

function clearInput(){
	var formObj  = document.frm1;
	
	//setSelection();
	searchSelection();
	formObj.f_post_dt.value = TODAY;
	
	formObj.f_chk_no.value = "";
	formObj.deposit_chk.checked = false;
	formObj.f_deposit_dt.value = "";
	formObj.void_chk.checked = false;
	formObj.f_void_dt.value = "";
	formObj.f_rcv_amt.value = "";
	formObj.f_jnr_no.value = "";
	
}

function custEnterAction(obj, type){
	var formObj  = document.frm1;
	
	if (event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}else if(type == "CUSTOMER2"){
			doWork("CUSTOMER_POPLIST2");
		}
		
	}
}


//Deposit Date를 입력하면 Deposit Check를 한다.
function checkDeposit(){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	if(formObj.f_deposit_dt.value != ""){
		
		// 마감 POST DATE와  BL POST DATE 비교( BL의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
		var bl_post   = formObj.f_deposit_dt.value;
		var slip_post = formObj.slip_post.value;
		
		//role_cd 가 'ADM' 인경우에는 수정가능하게 한다.
		if(formObj.role_cd.value != "ADM"){
			if(bl_post != "" && slip_post != ""){
				bl_post   = bl_post.replaceAll("-","");
				bl_post   = bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
				slip_post = slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
				if(slip_post >= bl_post){
					//Invalid [Deposit Date]
					alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_JOR_0200.1355");

					formObj.f_deposit_dt.value = SLIP_POST_DT;
					formObj.f_deposit_dt.select();
					return false;
				}
			}
		}
		formObj.deposit_chk.checked = true;
		
		//CLR_DT는 POST_DT 보다 같거나 커야한다.
		var post_dt = formObj.f_post_dt.value.replaceAll("-","");
		var clr_dt = formObj.f_deposit_dt.value.replaceAll("-","");
		post_dt = post_dt.substring(4,8)+post_dt.substring(0,2)+post_dt.substring(2,4);
		clr_dt = clr_dt.substring(4,8)+clr_dt.substring(0,2)+clr_dt.substring(2,4);

		if(post_dt > clr_dt){
			//Invalid [Deposit Date]
			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_JOR_0200.1373");

			formObj.f_deposit_dt.value = "";
			formObj.f_deposit_dt.focus();
			formObj.deposit_chk.checked = false;
		}
	}
	else{
		formObj.deposit_chk.checked = false;
	}
}


//날짜더하기
function addDay(ymd, v_day){
	
	 ymd = ymd.replaceAll("-","");

	 var yyyy = ymd.substr(4,4);
	 var mm   = eval(ymd.substr(0,2) + "- 1") ;
	 var dd   = ymd.substr(2,2);
	 
	 var dt3 = new Date(yyyy, mm, eval(dd + '+' + v_day));

	 yyyy = dt3.getYear();
	 mm   = (dt3.getMonth()+1)<10? "0" + (dt3.getMonth()+1) : (dt3.getMonth()+1) ;
	 dd   = dt3.getDate()<10 ? "0" + dt3.getDate() : dt3.getDate();

	 return  mm + "-" + dd + "-" + yyyy ;

}


function checkPostDate(){
	var formObj  = document.frm1;
	
	// 마감 POST DATE와  BL POST DATE 비교( BL의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
	var bl_post   = formObj.f_post_dt.value;
	var slip_post = formObj.slip_post.value;
	
	//role_cd 가 'ADM' 인경우에는 수정가능하게 한다.
	if(formObj.role_cd.value != "ADM"){
		if(bl_post != "" && slip_post != ""){
			bl_post   = bl_post.replaceAll("-","");
			bl_post   = bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
			slip_post = slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
			
			if(slip_post >= bl_post){
				//Invalid [Billing Date]
				alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_JOR_0200.1421");
				
				formObj.f_post_dt.value = formObj.old_post_dt.value;
				formObj.f_post_dt.select();
				return false;
			}
		}
	}
	
	//CLR_DT는 POST_DT 보다 같거나 커야한다.
	if(formObj.f_deposit_dt.value != ""){
		var post_dt = formObj.f_post_dt.value.replaceAll("-","");
		var clr_dt = formObj.f_deposit_dt.value.replaceAll("-","");
		post_dt = post_dt.substring(4,8)+post_dt.substring(0,2)+post_dt.substring(2,4);
		clr_dt = clr_dt.substring(4,8)+clr_dt.substring(0,2)+clr_dt.substring(2,4);

		if(post_dt > clr_dt){
			//Invalid [Post Date]
			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_JOR_0200.1439");
			
			formObj.f_post_dt.value = "";
			formObj.f_post_dt.focus();
		}
	}
}


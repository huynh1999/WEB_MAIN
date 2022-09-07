var TODAY;
var SLIP_POST_DT;
var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
       case "SEARCHLIST":
    	    // 화면일부 클리어
    	    clearInput();
    	    if(formObj.s_jnr_no.value == ""){
    	    	if(formObj.s_cust_cd.value == ""){
//        	    	alert("Select the Vendor in advance! ");
        	    	alert(getLabel('ACC_MSG26'));
        	    	formObj.s_cust_cd.focus();
        	    	return;
        	    }
    	    }else{
    	    	formObj.f_jnr_no.value=formObj.s_jnr_no.value;
    	    }
    	    if(formObj.dept_chk1.checked){
    	    	formObj.dept_chk1.value="Y";
    	    }
    	    if(formObj.dept_chk2.checked){
    	    	formObj.dept_chk2.value="Y";
    	    }
    	    if(formObj.dept_chk3.checked){
    	    	formObj.dept_chk3.value="Y";
    	    }
    	    formObj.f_cmd.value=SEARCHLIST;
            //검증로직
    	    docObjects[0].DoSearch("./ACC_JOR_0210GS.clt", FormQueryString(formObj) );
       break;
       case "ROWADD":
    	    if(formObj.s_cust_cd.value == ""){
	   	    	alert(getLabel('ACC_MSG26'));
	   	    	formObj.s_cust_cd.focus();
	   	    	return;
	   	    }
    	    if(sheetObj.GetCellValue(1, "ofc_cd") == ""){
	   	    	sheetObj.RemoveAll();
	   	    	var intRows=sheetObj.LastRow() + 1;
	            sheetObj.DataInsert(intRows);
	            sheetObj.SetRowBackColor(intRows,"#EFEBEF");
	            sheetObj.SetColBackColor(0,"#FFFFFF");
        		sheetObj.SetColBackColor(1,"#FFFFFF");
        		sheetObj.SetColBackColor(2,"#FFFFFF");
        		sheetObj.SetColBackColor(3,"#FFFFFF");
        		sheetObj.SetColBackColor(7,"#FFFFFF");
        		sheetObj.SetColBackColor(8,"#FFFFFF");
        		sheetObj.SetColBackColor(9,"#FFFFFF");
        		sheetObj.SetColBackColor(12,"#FFFFFF");
        		sheetObj.SetColBackColor(15,"#FFFFFF");
        		sheetObj.SetColBackColor(17,"#FFFFFF");
        		sheetObj.SetColBackColor(18,"#FFFFFF");
        		sheetObj.SetColBackColor(19,"#FFFFFF");
	            sheetObj.SetCellEditable(intRows, "ofc_cd",1);
	            sheetObj.SetCellEditable(intRows, "buy_inv_no",1);
	            sheetObj.SetCellEditable(intRows, "gl_no",1);
	            sheetObj.SetCellEditable(intRows, "ref_no",1);
	            sheetObj.SetCellEditable(intRows, "bl_no",1);
	            sheetObj.SetCellEditable(intRows, "jnr_desc",1);
	            sheetObj.SetCellEditable(intRows, "inv_aply_curr_cd",1);
	            sheetObj.SetCellEditable(intRows, "inv_aply_xcrt",1);
	            sheetObj.SetCellEditable(intRows, "pay_amt",1);
	            sheetObj.SetCellEditable(intRows, "clr_flag",0);
	            sheetObj.SetCellValue(intRows, "chk_flag",1);
	            sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",formObj.f_curr_cd.value);
	   	        sheetObj.SetCellValue(intRows, "trdp_cd",formObj.s_cust_cd.value);
	   	        sheetObj.SetCellValue(intRows, "inv_aply_xcrt",1);
	   	        sheetObj.SetCellValue(intRows, "clr_flag","1");
	   	        sheetObj.SetCellValue(intRows, "gl_no","");
	   	        sheetObj.SetCellValue(intRows, "inv_post_dt",formObj.f_post_dt.value);
	   	    }else{
	   	    	var intRows=sheetObj.LastRow() + 1;
	            sheetObj.DataInsert(intRows);
	            sheetObj.SetRowBackColor(intRows,"#EFEBEF");
	            sheetObj.SetColBackColor(0,"#FFFFFF");
        		sheetObj.SetColBackColor(1,"#FFFFFF");
        		sheetObj.SetColBackColor(2,"#FFFFFF");
        		sheetObj.SetColBackColor(3,"#FFFFFF");
        		sheetObj.SetColBackColor(7,"#FFFFFF");
        		sheetObj.SetColBackColor(8,"#FFFFFF");
        		sheetObj.SetColBackColor(9,"#FFFFFF");
        		sheetObj.SetColBackColor(12,"#FFFFFF");
        		sheetObj.SetColBackColor(15,"#FFFFFF");
        		sheetObj.SetColBackColor(17,"#FFFFFF");
        		sheetObj.SetColBackColor(18,"#FFFFFF");
        		sheetObj.SetColBackColor(19,"#FFFFFF");
	            sheetObj.SetCellEditable(intRows, "ofc_cd",1);
	            //sheetObj.CellEditable(intRows, "inv_tp") 			= true;
	            sheetObj.SetCellEditable(intRows, "buy_inv_no",1);
	            sheetObj.SetCellEditable(intRows, "gl_no",1);
	            sheetObj.SetCellEditable(intRows, "ref_no",1);
	            sheetObj.SetCellEditable(intRows, "bl_no",1);
	            sheetObj.SetCellEditable(intRows, "jnr_desc",1);
	            sheetObj.SetCellEditable(intRows, "inv_aply_curr_cd",1);
	            sheetObj.SetCellEditable(intRows, "inv_aply_xcrt",1);
	            sheetObj.SetCellEditable(intRows, "pay_amt",1);
	            sheetObj.SetCellEditable(intRows, "clr_flag",0);
	            sheetObj.SetCellValue(intRows, "chk_flag",1);
	            sheetObj.SetCellValue(intRows, "inv_aply_curr_cd",formObj.f_curr_cd.value);
	   	        sheetObj.SetCellValue(intRows, "trdp_cd",formObj.s_cust_cd.value);
	   	        sheetObj.SetCellValue(intRows, "inv_aply_xcrt",1);
	   	        sheetObj.SetCellValue(intRows, "clr_flag","1");
	   	        sheetObj.SetCellValue(intRows, "gl_no","");
	   	        sheetObj.SetCellValue(intRows, "inv_post_dt",formObj.f_post_dt.value);
	   	    }
       break;
       case "MODIFY":	//수정
		   frm1.f_cmd.value=MODIFY;
		   if(formObj.s_cust_cd.value == ""){
			   //[Customer] is mandatory field.
			   alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_JOR_0210.150");
			   formObj.s_cust_cd.focus();
			   return;
		   }
		   if(formObj.f_post_dt.value == ""){
			   //[Post Date] is mandatory field.
			   alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_JOR_0210.158");
			   formObj.f_post_dt.focus();
			   return;
		   }
		   var chkCnt=0;
		   for(var i=1;i<=sheetObj.LastRow();i++){
			   if(sheetObj.GetCellValue(i, "chk_flag") == "1"){
				   if(sheetObj.GetCellValue(i, "inv_post_dt") == ""){
					   //[Post Date] is mandatory field.
					   alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_JOR_0210.170");
					   sheetObj.SelectCell(i, "inv_post_dt",false);
					   return;
				   }
				   if(sheetObj.GetCellValue(i, "inv_aply_xcrt") == ""){
					   //[Ex.Rate] is mandatory field.
					   alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_JOR_0210.178");
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
        		   formObj.deposit_chk.value="Y";
        	   }
        	   else{
        		   formObj.deposit_chk.value="N";
        	   }
        	   if(formObj.void_chk.checked){
        		   formObj.void_chk.value="Y";
        	   }
        	   else{
        		   formObj.void_chk.value="N";
        	   }
        	   var rcv_amt=0;
    		   for(var i=1; i<=sheetObj.LastRow(); i++){
    			   if(formObj.f_jnr_no.value != "" && formObj.f_jnr_no.value != undefined){
    				   if(sheetObj.GetCellValue(i, "ibflag") != "I"){
						   sheetObj.SetCellValue(i, "ibflag","U");
					   }
    			   }
    			   // Received Amount 그리드의 PAY_AMT의 합계
    			   rcv_amt += Number(sheetObj.GetCellValue(i, "pay_amt"));
    		   }
    		   formObj.f_rcv_amt.value=doMoneyFmt(parseFloat(roundXL(rcv_amt,2)).toFixed(2));
    		   formObj.f_rcv_amt.value=removeComma(formObj.f_rcv_amt.value);
        	   var sht2=sheetObj2.GetSaveString(false);		//Bill Collecting List
        	   var intRows2=sheetObj2.LastRow() + 1;
	           sheetObj2.DataInsert(intRows2);
	           sheetObj.DoAllSave("./ACC_JOR_0210GS.clt", FormQueryString(formObj)+'&'+sht2, true);
           }
           break;
       case "DELETE":	//삭제
    	   frm1.f_cmd.value=REMOVE;
           if(confirm(getLabel('FMS_COM_CFMDEL'))){
        	   for(var i=1; i<=sheetObj.LastRow(); i++){
    			   sheetObj.SetCellValue(i, "ibflag","D");
    		   }
        	   var sht2=sheetObj2.GetSaveString(false);		//Bill Collecting List
        	   var intRows2=sheetObj2.LastRow() + 1;
	           sheetObj2.DataInsert(intRows2);
	           sheetObj.DoAllSave("./ACC_JOR_0210GS.clt", FormQueryString(formObj)+'&'+sht2, true);
           }
           break;
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_cust_nm.value;
	   		rtnary[2]=window;
  	        
  	        callBackFunc = "CUSTOMER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
  	        break;
       case "CUSTOMER_POPLIST2"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_paid_nm.value;
	   		rtnary[2]=window;
 	        
	   		callBackFunc = "CUSTOMER_POPLIST2";
 	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
 	        break;
        case "PRINT":
        	if(formObj.f_jnr_no.value == ""){
        		//No Print Data!
        		alert(getLabel('FMS_COM_ALT004') + "\n\n: ACC_JOR_0210.295");
        		return;
        	}
        	formObj.file_name.value='check_journal_01.mrd';
			formObj.title.value='Check Print';
			var param='[' + formObj.f_jnr_no.value + ']';				// [1]
			param	  += '[' + formObj.rider_yn.value + ']';				// [2]
			param	  += '[]';												// [3]
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0020.clt', 'popTest', 1025, 740);
        break;
        case "RIDERPRINT":
        	if(formObj.f_jnr_no.value == ""){
//        		alert("No Print Data! ");
        		alert(getLabel('ACC_MSG25'));
        		return;
        	}
        	formObj.file_name.value='check_journal_02.mrd';
			formObj.title.value='Check Print';
			var param='[' + formObj.f_jnr_no.value + ']';				// [1]
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0020.clt', 'popTest', 1025, 740);
        break;
    }
}

function CUSTOMER_POPLIST(rtnVal){
  	var formObj=document.frm1;
      if(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined){
	 	return;
	}
      else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_cust_cd.value=rtnValAry[0];
		formObj.s_cust_nm.value=rtnValAry[2];
		formObj.s_paid_cd.value=rtnValAry[0];
		formObj.s_paid_nm.value=rtnValAry[2];
	}  
  }
function CUSTOMER_POPLIST2(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
     else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_paid_cd.value=rtnValAry[0];
		formObj.s_paid_nm.value=rtnValAry[2];
	}     
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	//오늘일자구하기
	var now=new Date(); 				
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1; 		
	var date=now.getDate(); 			
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+date;
	}
	TODAY=month + "-" + date + "-" + year;
	formObj.f_post_dt.value=TODAY;
	formObj.old_post_dt.value=TODAY;
	formObj.s_jnr_no.value=formObj.t_jnr_no.value;
	formObj.s_cust_cd.value=formObj.t_cust_cd.value;
	formObj.s_inv_no.value=formObj.t_inv_no.value;
	// POST DATE가 SLIP의 MAX(POST_DT) 보다 작으면.. MAX(POST_DT) + 1 로 셋팅한다.
	var bl_post=formObj.f_post_dt.value;
	var slip_post=formObj.slip_post.value;
	if(bl_post != "" && slip_post != ""){
		bl_post=bl_post.replaceAll("-","");
		bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
		slip_post=slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
		if(slip_post >= bl_post){
			SLIP_POST_DT=addDay(formObj.slip_post.value, 1);
			formObj.f_post_dt.value=SLIP_POST_DT;
			formObj.old_post_dt.value=SLIP_POST_DT;
		}else{
			SLIP_POST_DT="";
		}
	}
	if(formObj.s_jnr_no.value != "" || formObj.s_cust_cd.value != ""){
		if(formObj.s_cust_cd.value != ""){
			formObj.s_cust_cd.focus();
			formObj.s_cust_cd.blur();
		}
    	doWork("SEARCHLIST");
    }
	
	//#483 [Binex LA] RiderPrint button on Payment Entry
	var opt_key = "PAYMENT_RIDER_BTN";
	ajaxSendPost(setRiderBtn, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
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
        	       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
        	       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	       var headers = [ { Text:getLabel('ACC_JOR_0210_HDR'), Align:"Center"} ];
        	       InitHeaders(headers, info);

        	       var cols = [ {Type:"DelCheck",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
        	              {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"chk_flag",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
        	              {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"inv_post_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"inv_dept_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"inv_tp",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"buy_inv_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"inv_aply_xcrt",     KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"bal_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"pay_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"ttl_pay_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:90,   Align:"Right",   ColMerge:1,   SaveName:"old_pay_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Combo",     Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"gl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"gl_rmk",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"ref_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"bl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"jnr_desc",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"clr_flag",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clr_gl",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_post_dt",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_bank_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_clr_yn",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_clr_dt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_void_yn",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_void_dt",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_chk_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_amt",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"r_rmk",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sell_buy_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
        	        
        	       InitColumns(cols);

        	       SetEditable(1);
        	       //InitViewFormat(0, "inv_post_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
        	       SetColProperty("ofc_cd", {ComboText:OFCCD, ComboCode:OFCCD} );
              	   SetColProperty("inv_aply_curr_cd", {ComboText:CURRCD, ComboCode:CURRCD} );
              	   SetColProperty("gl_no", {ComboText:GLCD, ComboCode:GLCD} );
              	   SetSheetHeight(350);
           }                                                      
           break;
         case 2:      //IBSheet2 init
             with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:"inv_seq|ibflag2", Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Status",    Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag2",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
              
             InitColumns(cols);
             SetEditable(1);
             SetVisible(false);
            }                                                      
            break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	formObj.s_jnr_no.value="";
	for(var i=1;i<=sheetObj.LastRow();i++){
		sheetObj.SetRowBackColor(i,"#EFEBEF");
		sheetObj.SetColBackColor(0,"#FFFFFF");
		sheetObj.SetColBackColor(1,"#FFFFFF");
		sheetObj.SetColBackColor(2,"#FFFFFF");
		sheetObj.SetColBackColor(9,"#FFFFFF");
		sheetObj.SetColBackColor(12,"#FFFFFF");
		sheetObj.SetColBackColor(17,"#FFFFFF");
		sheetObj.SetColBackColor(19,"#FFFFFF");
		sheetObj.SetColBackColor(20,"#FFFFFF");
		if(sheetObj.GetCellValue(i, "clr_flag") == "1"){
			sheetObj.SetCellEditable(i, "clr_flag",0);
		}else{
		}
	}
	if(sheetObj.GetCellValue(1,"jnr_no") != "" ){
		formObj.f_jnr_no.value=sheetObj.GetCellValue(1, "jnr_no");
		formObj.f_curr_cd.value=sheetObj.GetCellValue(1, "r_curr_cd");
		formObj.f_chk_no.value=sheetObj.GetCellValue(1, "r_chk_no");
		if(sheetObj.GetCellValue(1, "r_clr_yn") == "Y"){
			formObj.deposit_chk.checked=true;
		}else{
			formObj.deposit_chk.checked=false;
		}
		formObj.f_deposit_dt.value=sheetObj.GetCellValue(1, "r_clr_dt");
		if(sheetObj.GetCellValue(1, "r_void_yn") == "Y"){
			formObj.void_chk.checked=true;
		}else{
			formObj.void_chk.checked=false;
		}
		//VOID CHECK 수정유무 
		formObj.old_void_chk.value=sheetObj.GetCellValue(1, "r_void_yn");
		formObj.f_void_dt.value=sheetObj.GetCellValue(1, "r_void_dt");
		formObj.f_post_dt.value=sheetObj.GetCellValue(1, "r_post_dt");
		formObj.f_bank_cd.value=sheetObj.GetCellValue(1, "r_bank_seq");
		formObj.f_remark.value=sheetObj.GetCellValue(1, "r_rmk");
		var rcv_amt=0;
		// Received Amount 그리드의 PAY_AMT의 합계
		for(var i=1;i<=sheetObj.LastRow();i++){
			rcv_amt += Number(sheetObj.GetCellValue(i, "pay_amt"));
			//2012/02/02 저장데이터 조회시 리스트를 체크한다.
			sheetObj.SetCellValue(i, "chk_flag","1",0);
			//2012/02/08 생성된 데이터의 글자색을 바꾼다.
			sheetObj.SetRowFontColor(i,"#FF0000");
		}
		formObj.f_rcv_amt.value=doMoneyFmt(parseFloat(roundXL(rcv_amt,2)).toFixed(2));
		if(sheetObj.GetCellValue(1, "trdp_cd") != ""){
			formObj.s_cust_cd.value=sheetObj.GetCellValue(1, "trdp_cd");
			codeNameAction('CUSTOMER',formObj.s_cust_cd, 'onBlur');
		}
		printBtn01.style.display="inline";
		//span id 처리 getObj('printBtn02').style.display="inline";
		//RIDER PRINT 체크
		if(sheetObj.LastRow()> 12){
			riderprintBtn01.style.display="inline";
			getBtnObj('riderprintBtn02').style.display="inline";
			formObj.rider_yn.value="Y";
		}
		// DEPOSIT, CLEAR, VOID 시 ADD버튼  없애기 그리드데이터 DISABLE
		if(sheetObj.GetCellValue(1, "r_void_yn") == "Y" || sheetObj.GetCellValue(1, "r_clr_yn") == "Y"){
			for(var i=1;i<=sheetObj.LastRow();i++){
				sheetObj.SetRowEditable(i,0);
			}
		}else{
		}
		//마감후 저장 및 삭제 금지  LEVEL 1 은 DELETE가 없기때문에 SAVE 버튼만 제어한다.
		if(sheetObj.GetCellValue(1, "clt_cmpl_flg") == "Y"){
			saveBtn1.style.display="none";
			//span id 처리 getObj('saveBtn2').style.display="none";
			getBtnObj('btnModify').style.display="none";
		}
	}else{
		formObj.f_post_dt.value=TODAY;
		formObj.f_inv_amt.value="";
		formObj.f_bal_amt.value="";
		formObj.f_pay_amt.value="";
	}
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	formObj.f_jnr_no.value=sheetObj.GetCellValue(1, "jnr_no");
	formObj.s_jnr_no.value="";
	if(formObj.f_jnr_no.value != ""){
		formObj.f_curr_cd.value=sheetObj.GetCellValue(1, "r_curr_cd");
		formObj.f_chk_no.value=sheetObj.GetCellValue(1, "r_chk_no");
		if(sheetObj.GetCellValue(1, "r_clr_yn") == "Y"){
			formObj.deposit_chk.checked=true;
		}else{
			formObj.deposit_chk.checked=false;
		}
		formObj.f_deposit_dt.value=sheetObj.GetCellValue(1, "r_clr_dt");
		if(sheetObj.GetCellValue(1, "r_void_yn") == "Y"){
			formObj.void_chk.checked=true;
		}else{
			formObj.void_chk.checked=false;
		}
		//VOID CHECK 수정유무 
		formObj.old_void_chk.value=sheetObj.GetCellValue(1, "r_void_yn");
		formObj.f_void_dt.value=sheetObj.GetCellValue(1, "r_void_dt");
		formObj.f_post_dt.value=sheetObj.GetCellValue(1, "r_post_dt");
		formObj.f_bank_cd.value=sheetObj.GetCellValue(1, "r_bank_seq");
		formObj.f_remark.value=sheetObj.GetCellValue(1, "r_rmk");
		for(var i=1;i<=sheetObj.LastRow();i++){
			sheetObj.SetRowBackColor(i,"#EFEBEF");
			sheetObj.SetColBackColor(0,"#FFFFFF");
			sheetObj.SetColBackColor(1,"#FFFFFF");
			sheetObj.SetColBackColor(2,"#FFFFFF");
			sheetObj.SetColBackColor(9,"#FFFFFF");
			sheetObj.SetColBackColor(12,"#FFFFFF");
			sheetObj.SetColBackColor(17,"#FFFFFF");
			sheetObj.SetColBackColor(19,"#FFFFFF");
			sheetObj.SetColBackColor(20,"#FFFFFF");
			//2012/02/02 저장데이터 조회시 리스트를 체크한다.
			sheetObj.SetCellValue(i, "chk_flag","1",0);
			//2012/02/08 생성된 데이터의 글자색을 바꾼다.
			sheetObj.SetRowFontColor(i,"#FF0000");
		}
		if(sheetObj.GetCellValue(1, "trdp_cd") != ""){
			formObj.s_cust_cd.value=sheetObj.GetCellValue(1, "trdp_cd");
			codeNameAction('CUSTOMER',formObj.s_cust_cd, 'onBlur');
		}
		printBtn01.style.display="inline";
		//span id 처리 getObj('printBtn02').style.display="inline";
		//RIDER PRINT 체크
		if(sheetObj.LastRow()> 15){
			riderprintBtn01.style.display="inline";
			getBtnObj('riderprintBtn02').style.display="inline";
			formObj.rider_yn.value="Y";
		}
		// DEPOSIT, CLEAR, VOID 시 ADD버튼  없애기 그리드데이터 DISABLE
		if(sheetObj.GetCellValue(1, "r_void_yn") == "Y" || sheetObj.GetCellValue(1, "r_clr_yn") == "Y"){
			for(var i=1;i<=sheetObj.LastRow();i++){
				sheetObj.SetRowEditable(i,0);
			}
		}else{
		}
		//마감후 저장 및 삭제 금지  LEVEL 1 은 DELETE가 없기때문에 SAVE 버튼만 제어한다.
		if(sheetObj.GetCellValue(1, "clt_cmpl_flg") == "Y"){
			saveBtn1.style.display="none";
			//span id 처리 getObj('saveBtn2').style.display="none";
			getBtnObj('btnModify').style.display="none";
		}
	}else{
		clearAll();
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
    switch (sheetObj.ColSaveName(Col)) {
	    case "clr_flag" :
	    	if(sheetObj.GetCellValue(Row, "clr_flag") == "0"){
	    		if(sheetObj.GetCellValue(Row, "ttl_pay_amt") == 0){
					//[Payment] is mandatory field.
					alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_JOR_0210.820");
					sheetObj.SelectCell(Row, "pay_amt");
					sheetObj.SetCellValue(Row, "clr_flag",1);
					return;
				}
	    		var inv_sum_amt=Number(sheetObj.GetCellValue(Row, "inv_sum_amt"));
	    		var bal_sum_amt=Number(sheetObj.GetCellValue(Row, "bal_sum_amt"));
	    		var ttl_pay_amt=Number(sheetObj.GetCellValue(Row, "ttl_pay_amt"));
				if((bal_sum_amt - ttl_pay_amt) != 0 ){
					sheetObj.DataInsert(Row);
			        if(ttl_pay_amt < bal_sum_amt){
			        	ttl_pay_amt=bal_sum_amt - ttl_pay_amt;
			        	if(formObj.f_curr_cd.value != sheetObj.GetCellValue(Row, "inv_aply_curr_cd")){
			        		sheetObj.SetCellValue(Row+1, "clr_gl","EL");
			        	}else{
			        		sheetObj.SetCellValue(Row+1, "clr_gl","ML");
			        	}
			        }else if(ttl_pay_amt > bal_sum_amt){
			        	ttl_pay_amt=ttl_pay_amt - bal_sum_amt;
			        	if(formObj.f_curr_cd.value != sheetObj.GetCellValue(Row, "inv_aply_curr_cd")){
			        		sheetObj.SetCellValue(Row+1, "clr_gl","EP");
			        	}else{
			        		sheetObj.SetCellValue(Row+1, "clr_gl","MP");
			        	}
			        }
			        sheetObj.SetCellValue(Row+1, "chk_flag",1);
					sheetObj.SetCellValue(Row+1, "inv_post_dt",sheetObj.GetCellValue(Row, "inv_post_dt"));
					sheetObj.SetCellValue(Row+1, "ofc_cd",sheetObj.GetCellValue(Row, "ofc_cd"));
					sheetObj.SetCellValue(Row+1, "inv_dept_cd",sheetObj.GetCellValue(Row, "inv_dept_cd"));
					sheetObj.SetCellValue(Row+1, "inv_tp",sheetObj.GetCellValue(Row, "inv_tp"));
					sheetObj.SetCellValue(Row+1, "inv_no",sheetObj.GetCellValue(Row, "inv_no"));
					sheetObj.SetCellValue(Row+1, "gl_no",sheetObj.GetCellValue(Row, "gl_no"));
					sheetObj.SetCellValue(Row+1, "ref_no",sheetObj.GetCellValue(Row, "ref_no"));
					sheetObj.SetCellValue(Row+1, "bl_no",sheetObj.GetCellValue(Row, "bl_no"));
					sheetObj.SetCellValue(Row+1, "jnr_desc",sheetObj.GetCellValue(Row, "jnr_desc"));
					sheetObj.SetCellValue(Row+1, "inv_aply_curr_cd",sheetObj.GetCellValue(Row, "inv_aply_curr_cd"));
					sheetObj.SetCellValue(Row+1, "inv_aply_xcrt",sheetObj.GetCellValue(Row, "inv_aply_xcrt"));
					sheetObj.SetCellValue(Row+1, "inv_sum_amt",sheetObj.GetCellValue(Row, "inv_sum_amt"));
					sheetObj.SetCellValue(Row+1, "bal_sum_amt",sheetObj.GetCellValue(Row, "bal_sum_amt"));
			        sheetObj.SetCellValue(Row+1, "pay_amt",ttl_pay_amt);
			        sheetObj.SetCellValue(Row+1, "ttl_pay_amt",ttl_pay_amt);
					sheetObj.SetCellValue(Row+1, "inv_seq",sheetObj.GetCellValue(Row, "inv_seq"));
					sheetObj.SetCellValue(Row+1, "trdp_cd",sheetObj.GetCellValue(Row, "trdp_cd"));
			        sheetObj.SetCellValue(Row+1, "clr_flag","1");
				}
			}
		break;
    }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "pay_amt" :
			sheetObj.SetCellValue(Row, "pay_amt",sheetObj.GetCellValue(Row, "bal_sum_amt"));
		break;
	}
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "pay_amt" :
			var ex_rate=Number(sheetObj.GetCellValue(Row, "inv_aply_xcrt"));
			var pay_amt=Number(sheetObj.GetCellValue(Row, "pay_amt"));
			var old_pay_amt=Number(sheetObj.GetCellValue(Row, "old_pay_amt"));
			sheetObj.SetCellValue(Row, "ttl_pay_amt",ex_rate * pay_amt);
			if(Number(sheetObj.GetCellValue(Row, "ttl_pay_amt")) != 0){
				sheetObj.SetCellValue(Row, "chk_flag",1);
			}
			// 지급금액이 발런스 금액과 같으면 클리어 처리한다.
			var inv_sum_amt=Number(sheetObj.GetCellValue(Row, "inv_sum_amt"));
			var bal_sum_amt=Number(sheetObj.GetCellValue(Row, "bal_sum_amt"));
			var ttl_pay_amt=Number(sheetObj.GetCellValue(Row, "ttl_pay_amt"));
		    if(inv_sum_amt == 0 && bal_sum_amt == 0){
		    }else{
		    	if(formObj.f_jnr_no.value != "" && formObj.f_jnr_no.value != undefined){
	 			    if(inv_sum_amt == ttl_pay_amt){
	 			    	sheetObj.SetCellValue(Row,"clr_flag","1");
	 			    }else{
	 				    sheetObj.SetCellValue(Row,"clr_flag","0");
	 			    }
			    }else{
				    if(bal_sum_amt == ttl_pay_amt){
	 				    sheetObj.SetCellValue(Row,"clr_flag","1");
	 			    }else{
	 				    sheetObj.SetCellValue(Row,"clr_flag","0");
	 			    }
			    }
		    }
		break;
		case "inv_aply_xcrt" :
			var ex_rate=Number(sheetObj.GetCellValue(Row, "inv_aply_xcrt"));
			var pay_amt=Number(sheetObj.GetCellValue(Row, "pay_amt"));
			sheetObj.SetCellValue(Row, "ttl_pay_amt",ex_rate * pay_amt);
			// 지급금액이 발런스 금액과 같으면 클리어 처리한다.
			var inv_sum_amt=Number(sheetObj.GetCellValue(Row, "inv_sum_amt"));
			var bal_sum_amt=Number(sheetObj.GetCellValue(Row, "bal_sum_amt"));
			var ttl_pay_amt=Number(sheetObj.GetCellValue(Row, "ttl_pay_amt"));
		    if(formObj.f_jnr_no.value != "" && formObj.f_jnr_no.value != undefined){
 			    if(inv_sum_amt == ttl_pay_amt){
 			    	sheetObj.SetCellValue(Row,"clr_flag","1");
 			    }else{
 				    sheetObj.SetCellValue(Row,"clr_flag","0");
 			    }
		    }else{
			    if(bal_sum_amt == ttl_pay_amt){
 				    sheetObj.SetCellValue(Row,"clr_flag","1");
 			    }else{
 				    sheetObj.SetCellValue(Row,"clr_flag","0");
 			    }
		    }
		break;
		case "chk_flag" :
			if(sheetObj.GetCellValue(Row, "chk_flag") == "1"){
			if(sheetObj.GetCellValue(Row, "clr_row") != "Y"){
			if(Number(sheetObj.GetCellValue(Row, "pay_amt")) == 0){
			sheetObj.SetCellValue(Row, "pay_amt",sheetObj.GetCellValue(Row, "bal_sum_amt"));
					}
				}
			}else{
				if(sheetObj.GetCellValue(Row, "clr_row") != "Y"){
					sheetObj.SetCellValue(Row, "pay_amt","");
				}
			}
		break;
		case "gl_no" :
			if(sheetObj.GetCellValue(Row, "gl_no") != ""){
				SELECTROW=Row;
				ajaxSendPost(getGlRmk, 'reqVal', '&goWhere=aj&bcKey=getGlRmk&s_gl_no='+sheetObj.GetCellValue(Row, "gl_no"), './GateServlet.gsl');
			}else{
				sheetObj.SetCellValue(Row, "gl_rmk","");
			}
		break;
		case "buy_inv_no" :
			sheetObj.SetCellValue(Row, "inv_no",sheetObj.GetCellValue(Row, "buy_inv_no"));
		break;
	}
	//TOTAL 값을 계산한다.
	var inv_amt=0;
	var bal_amt=0;
	var pay_amt=0;
	for(var i=1;i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "chk_flag") == "1"){
			inv_amt += Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
			bal_amt += Number(sheetObj.GetCellValue(i, "bal_sum_amt"));
			pay_amt += Number(sheetObj.GetCellValue(i, "pay_amt"));
		}
	}
	formObj.f_inv_amt.value=doMoneyFmt(roundXL(inv_amt,2));
	formObj.f_bal_amt.value=doMoneyFmt(roundXL(bal_amt,2));
	formObj.f_pay_amt.value=doMoneyFmt(roundXL(pay_amt,2));
	formObj.f_rcv_amt.value=doMoneyFmt(parseFloat(roundXL(pay_amt,2)).toFixed(2));
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출  
	    	var cal=new ComCalendar();
	        cal.select(formObj.f_deposit_dt, 'MM-dd-yyyy');
	    break;
	    case 'DATE2':    //달력 조회 팝업 호출      
	    	var cal=new ComCalendar();
	        cal.select(formObj.f_void_dt, 'MM-dd-yyyy');
	    break;
	    case 'DATE3':    //달력 조회 팝업 호출      
	    	var cal=new ComCalendar();
	        cal.select(formObj.f_post_dt, 'MM-dd-yyyy');
	    break;
    }
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();		
	var s_type="";
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;	
				s_type="trdpCode";
				if(CODETYPE=="CUSTOMER"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}else if(CODETYPE=="CUSTOMER2"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				s_type="trdpCode";
				if(CODETYPE=="CUSTOMER"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}else if(CODETYPE=="CUSTOMER2"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}else{
		formObj.s_cust_cd.value="";//trdp_cd  AS param1
		formObj.s_cust_nm.value="";//eng_nm   AS param2
		formObj.s_paid_cd.value="";//trdp_cd  AS param1
		formObj.s_paid_nm.value="";//eng_nm   AS param2
	}
}
/**
 * Trade Partner 관린 코드조회
 */
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="CUSTOMER"){
				formObj.s_cust_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.s_cust_nm.value=masterVals[3];		//eng_nm   AS param2
				formObj.s_paid_cd.value=masterVals[0];
				formObj.s_paid_nm.value=masterVals[3];
			}else if(CODETYPE =="CUSTOMER2"){
				formObj.s_paid_cd.value=masterVals[0];
				formObj.s_paid_nm.value=masterVals[3];
			}
		}else{
			if(CODETYPE =="CUSTOMER"){
				formObj.s_cust_cd.value="";//trdp_cd  AS param1
				formObj.s_cust_nm.value="";//eng_nm   AS param2
				formObj.s_paid_cd.value="";
				formObj.s_paid_nm.value="";
			}else if(CODETYPE =="CUSTOMER2"){
				formObj.s_paid_cd.value="";
				formObj.s_paid_nm.value="";
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
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				sheetObj.SetCellValue(SELECTROW, "gl_no",rtnArr[0]);
				sheetObj.SetCellValue(SELECTROW, "gl_rmk",rtnArr[1]);
			}
		}else{
			sheetObj.SetCellValue(SELECTROW, "gl_no","");
			sheetObj.SetCellValue(SELECTROW, "gl_rmk","");
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function setVoidDate(){
	var formObj=document.frm1;
	if(formObj.void_chk.checked){
		formObj.f_void_dt.value=TODAY;
	}else{
		formObj.f_void_dt.value="";
	}
}
function setDepositDate(){
	var formObj=document.frm1;
	if(formObj.deposit_chk.checked){
		if(formObj.f_deposit_dt.value == ""){
			// 마감 POST DATE와  BL POST DATE 비교( BL의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
			var today="";
			var slip_post=formObj.slip_post.value;
			if(slip_post != ""){
				today=TODAY.replaceAll("-","");
				today=today.substring(4,8)+today.substring(0,2)+today.substring(2,4);
				slip_post=slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
				if(slip_post >= today){
					formObj.f_deposit_dt.value=SLIP_POST_DT;
				}else{
					formObj.f_deposit_dt.value=TODAY;
				}
			}else{
				formObj.f_deposit_dt.value=TODAY;
			}
		}
	}else{
		formObj.f_deposit_dt.value="";
	}
}
//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  collTxt[i].value="";
	  }           
	}
	setSelection();
	frm1.f_post_dt.value=TODAY;
	formObj.deposit_chk.checked=false;
	formObj.void_chk.checked=false;
	formObj.s_jnr_no.value="";
	saveBtn1.style.display="inline";
	//span id 처리 getObj('saveBtn2').style.display="inline";
	getBtnObj('btnModify').style.display="inline";
	sheetObj.RemoveAll();
}
function clearInput(){
	var formObj=document.frm1;
	//setSelection();
	searchSelection();
	formObj.f_post_dt.value=TODAY;
	formObj.f_chk_no.value="";
	formObj.deposit_chk.checked=false;
	formObj.f_deposit_dt.value="";
	formObj.void_chk.checked=false;
	formObj.f_void_dt.value="";
	formObj.f_jnr_no.value="";
}
function custEnterAction(obj, type){
	var formObj=document.frm1;
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
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(formObj.f_deposit_dt.value != ""){
		// 마감 POST DATE와  BL POST DATE 비교( BL의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
		var bl_post=formObj.f_deposit_dt.value;
		var slip_post=formObj.slip_post.value;
		//role_cd 가 'ADM' 인경우에는 수정가능하게 한다.
		if(formObj.role_cd.value != "ADM"){
			if(bl_post != "" && slip_post != ""){
				bl_post=bl_post.replaceAll("-","");
				bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
				slip_post=slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
				if(slip_post >= bl_post){
//					alert("Invalid [Clear Date]");
					alert(getLabel('ACC_MSG28'));
					formObj.f_deposit_dt.value=SLIP_POST_DT;
					formObj.f_deposit_dt.select();
					return false;
				}
			}
		}
		formObj.deposit_chk.checked=true;
		//CLR_DT는 POST_DT 보다 같거나 커야한다.
		var post_dt=formObj.f_post_dt.value.replaceAll("-","");
		var clr_dt=formObj.f_deposit_dt.value.replaceAll("-","");
		post_dt=post_dt.substring(4,8)+post_dt.substring(0,2)+post_dt.substring(2,4);
		clr_dt=clr_dt.substring(4,8)+clr_dt.substring(0,2)+clr_dt.substring(2,4);
		if(post_dt > clr_dt){
//			alert("Invalid [Clear Date]");
			alert(getLabel('ACC_MSG28'));
			formObj.f_deposit_dt.value="";
			formObj.f_deposit_dt.focus();
			formObj.deposit_chk.checked=false;
		}
	}else{
		formObj.deposit_chk.checked=false;
	}
}
//날짜더하기
function addDay(ymd, v_day){
	 ymd=ymd.replaceAll("-","");
	 var yyyy=ymd.substr(4,4);
	 var mm=eval(ymd.substr(0,2) + "- 1") ;
	 var dd=ymd.substr(2,2);
	 var dt3=new Date(yyyy, mm, eval(dd + '+' + v_day));
	 yyyy=dt3.getFullYear();
	 mm=(dt3.getMonth()+1)<10? "0" + (dt3.getMonth()+1) : (dt3.getMonth()+1) ;
	 dd=dt3.getDate()<10 ? "0" + dt3.getDate() : dt3.getDate();
	 return  mm + "-" + dd + "-" + yyyy ;
}
function checkPostDate(){
	var formObj=document.frm1;
	// 마감 POST DATE와  BL POST DATE 비교( BL의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
	var bl_post=formObj.f_post_dt.value;
	var slip_post=formObj.slip_post.value;
	//role_cd 가 'ADM' 인경우에는 수정가능하게 한다.
	if(formObj.role_cd.value != "ADM"){
		if(bl_post != "" && slip_post != ""){
			bl_post=bl_post.replaceAll("-","");
			bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
			slip_post=slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
			if(slip_post >= bl_post){
				//Invalid [Posting Date]
				alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_JOR_0210.1362");
				formObj.f_post_dt.value=formObj.old_post_dt.value;
				formObj.f_post_dt.select();
				return false;
			}
		}
	}
	//CLR_DT는 POST_DT 보다 같거나 커야한다.
	if(formObj.f_deposit_dt.value != ""){
		var post_dt=formObj.f_post_dt.value.replaceAll("-","");
		var clr_dt=formObj.f_deposit_dt.value.replaceAll("-","");
		post_dt=post_dt.substring(4,8)+post_dt.substring(0,2)+post_dt.substring(2,4);
		clr_dt=clr_dt.substring(4,8)+clr_dt.substring(0,2)+clr_dt.substring(2,4);
		if(post_dt > clr_dt){
			//Invalid [Post Date]
			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_JOR_0210.1378");
			formObj.f_post_dt.value="";
			formObj.f_post_dt.focus();
		}
	}
}

//#483 [Binex LA] RiderPrint button on Payment Entry
var setRiderBtnChk = false;

function setRiderBtn(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == "Y"){
			setRiderBtnChk = true;
			getBtnObj('riderprintBtn02').style.display = "inline";
		}
	}
}


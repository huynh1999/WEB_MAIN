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
		    frm1.f_cmd.value=-1;
	        formObj.submit();
	   break;
       case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            docObjects[0].DoSearch("./ACC_INV_0033GS.clt", FormQueryString(formObj) );
       break;
       case "ROWADD":
    	   if(sheetObj.GetCellValue(sheetObj.LastRow(), "frt_term_cd") == ""){
    	    	sheetObj.RemoveAll();
    	    }
    	   var intRows=sheetObj.LastRow() + 1;
            sheetObj.DataInsert(intRows);
            sheetObj.SetCellValue(intRows, "frt_term_cd","PP");
            sheetObj.SetCellEditable(intRows, "frt_check",1);
        	sheetObj.SetCellValue(intRows, "frt_check","1");
        	sheetObj.SetCellValue(intRows, "qty","1");
        	sheetObj.SetCellValue(intRows, "rat_curr_cd",formObj.f_curr_cd.value);
        	sheetObj.SetCellValue(intRows, "inv_xcrt",1);
       break;
       case "MODIFY":	//등록
    	   //그리드 전체삭제시 invoice 를 삭제한다.
    	   if(!checkDelete()){
    		   doWork("DELETE");
    	   }else{
    		   frm1.f_cmd.value=MODIFY;
               //필수항목체크
               if(checkVal()){
            	   if(confirm(getLabel('FMS_COM_CFMSAV'))){
            		   calcFrgnAmt();
            		   //마감일때 POST_DT 는 오늘일자로 셋팅한다.
            		   if(formObj.f_clt_cmpl_flg.value == "Y"){
            			   formObj.f_today_dt.value=TODAY;
            		   }
            		   if(formObj.f_buy_inv_rcv.checked){
            			   formObj.f_buy_inv_rcv.value == "Y";
            		   }
                	   formObj.f_amt_tot.value=removeComma(formObj.f_amt_tot.value);
    	           	   formObj.f_vatamt_tot.value=removeComma(formObj.f_vatamt_tot.value);
    	           	   formObj.f_totamt_tot.value=removeComma(formObj.f_totamt_tot.value);
    	           	   var sht2=sheetObj2.GetSaveString(false);		//Bill Collecting List
    	           	   var intRows2=sheetObj2.LastRow() + 1;
	    	           sheetObj2.DataInsert(intRows2);
	    	           sheetObj.DoAllSave("./ACC_INV_0033GS.clt", FormQueryString(formObj)+'&'+sht2, true);
                   }
               }
    	   }
       break;
       case "DELETE":	//삭제
    	   if(frm1.f_inv_seq.value != ""){
    		   frm1.f_cmd.value=REMOVE;
               if(confirm(getLabel('FMS_COM_CFMDEL'))){
            	   for(var i=2; i<=sheetObj.LastRow(); i++){
            		   sheetObj.SetCellValue(i,"ibflag","D");
            	   }
            	   formObj.f_amt_tot.value=removeComma(formObj.f_amt_tot.value);
	           	   formObj.f_vatamt_tot.value=removeComma(formObj.f_vatamt_tot.value);
	           	   formObj.f_totamt_tot.value=removeComma(formObj.f_totamt_tot.value);
            	   sheetObj.DoSave("ACC_INV_0033GS.clt", FormQueryString(formObj),"ibflag",false);
            	   //화면초기화
            	   clearAll();
               }
    	   }
       break;
       case "COPY":	//COPY
    	   if(frm1.f_inv_seq.value != ""){
    		   var sheetObj=docObjects[0];
    		   var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
    		   for(var i=0; i<collTxt.length; i++){
    			   if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
    				   if(collTxt[i].name == "f_vendor_cd" || collTxt[i].name == "f_vendor_nm" ||
    				       collTxt[i].name == "f_inv_no" || collTxt[i].name == "f_post_dt" || 
    				       collTxt[i].name == "f_inv_dt" || collTxt[i].name == "f_term_dt" || 
    				       collTxt[i].name == "f_due_dt"){
    					   collTxt[i].className="search_form";
    					   collTxt[i].readOnly=false;
    				   }
    			   }           
    		   }
    		   frm1.f_buy_inv_rcv.disabled=false;
    		   frm1.f_terms.disabled=false;
    		   frm1.f_curr_cd.disabled=false;
    		   frm1.f_remark.disabled=false;
    		   frm1.f_vendor_cd.onblur=function(){codeNameAction('VENDOR',this, 'onBlur')};
    		   frm1.f_inv_dt.onblur=function(){calcCreateTerms()};
    		   frm1.f_term_dt.onblur=function(){calcCreateTerms()};
    		   frm1.f_inv_seq.value="";
    		   frm1.temp_inv_no.value="";
    		   frm1.f_amt_due.value="";
    		   frm1.f_inv_no.value="";
    		   if(formObj.slip_post.value != ""){
    			   temp_slip_dt=formObj.slip_post.value;
    			   slip_dt=temp_slip_dt.substring(4,8)+temp_slip_dt.substring(0,2)+temp_slip_dt.substring(2,4);
    			   temp_today_dt=TODAY.replaceAll("-","");
    			   today_dt=temp_today_dt.substring(4,8)+temp_today_dt.substring(0,2)+temp_today_dt.substring(2,4);
    			   if(today_dt > slip_dt){
    				   frm1.f_post_dt.value=TODAY;
    				   if(frm1.f_terms[0].selected){
    					   frm1.f_due_dt.value=TODAY;
    				   }
    			   }else{
    				   frm1.f_post_dt.value=addDay(formObj.slip_post.value, 1);
    				   if(frm1.f_terms[0].selected){
    					   frm1.f_due_dt.value=addDay(formObj.slip_post.value, 1);
    				   }
    			   }
    		   }else{
    			   frm1.f_post_dt.value=TODAY;
    			   if(frm1.f_terms[0].selected){
					   frm1.f_due_dt.value=TODAY;
				   }
    		   }
    		   frm1.f_clt_cmpl_flg.value="";
    		   frm1.f_post_dt.focus();
    		   frm1.f_post_dt.blur();
    		   frm1.f_vendor_cd.focus();
    		   frm1.f_vendor_cd.blur();
    		   for(var i=2; i<=sheetObj.LastRow();i++){
    			   sheetObj.SetCellEditable(i, "frt_check",1);
    			   sheetObj.SetColBackColor("frt_check","#FFFFFF");
    			   sheetObj.SetCellValue(i, "frt_check","1");
    			   sheetObj.SetCellValue(i, "frt_seq","");
    			   sheetObj.SetCellValue(i, "inv_seq","");
    			   sheetObj.SetCellValue(i, "inv_no","");
    			   sheetObj.SetCellValue(i, "inv_dt","");
    			   sheetObj.SetCellValue(i, "inv_post_dt","");
    			   sheetObj.SetCellValue(i, "inv_due_dt","");
    			   sheetObj.SetCellValue(i, "last_pay_dt","");
    			   sheetObj.SetCellValue(i, "inv_trdp_cd","");
    			   sheetObj.SetCellValue(i, "inv_trdp_cd_nm","");
    			   sheetObj.SetCellValue(i, "buy_inv_no","");
    			   sheetObj.SetCellValue(i, "oth_seq","");
    			   sheetObj.SetCellValue(i, "last_chk_no","");
    			   sheetObj.SetCellValue(i, "inv_bal_amt","");
    			   sheetObj.SetCellValue(i, "inv_pay_amt","");
    			   sheetObj.SetCellValue(i, "inco_cd","");
    			   sheetObj.SetCellValue(i, "inv_aply_curr_cd","");
    			   sheetObj.SetCellValue(i, "clt_cmpl_flg","");
    			   sheetObj.SetCellValue(i, "buy_inv_rcv","");
    			   sheetObj.SetCellValue(i, "tax_bil_flg","");
    			   sheetObj.SetCellValue(i, "ibflag","I");
    			   //그리드 활성화
    			   sheetObj.SetRowEditable(i,1);
    		   }
    		   frm1.f_inv_no.select();
    	   }
       break;
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.f_vendor_nm.value;
	   		rtnary[2]=window;
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   		
    	break;
        case "INV_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
			rtnary=new Array(1);
			rtnary[0]="S";
			
			callBackFunc = "INV_POPLIST";
	   		modal_center_open('./CMM_POP_0240.clt', rtnary, 756,480,"yes");
			
		break;
        case 'PRINT':
     	    formObj.file_name.value='invoice_14.mrd';
       		formObj.title.value='PAYMENT REQUEST';
 			//Parameter Setting
       		var param="[" + "'" + formObj.f_inv_seq.value + "'" + ']';	// [1]
 			param += '[' + formObj.f_vendor_cd.value + ']';					// Vendor [2]
 			param += '[' + formObj.f_ref_ofc_cd.value + ']';				// REF_OFC_CD [3]
 			param += '[]';					// CNT_CD  [4]
 			param += '[' + formObj.f_usr_nm.value + ']';					// USER_NM [5]
 			param += '[' + formObj.f_email.value + ']';						// USER EMAIL [6]
 			param += '[' + formObj.f_usrPhn.value + ']';					// 7
 			param += '[' + formObj.f_usrFax.value + ']';					// 8
 			param += '[' + formObj.f_usrId.value + ']';						// 9
 			formObj.rd_param.value=param;
 			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
 		break;
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
	formObj.f_inv_dt.value=TODAY;
	formObj.f_today_dt.value=TODAY;	// 마감후 저장시 필요(POST_DT는 오늘일자)
	// BL의 POST DATE가 SLIP의 MAX(POST_DT) 보다 작으면.. MAX(POST_DT) + 1 로 셋팅한다.
	var bl_post=formObj.f_post_dt.value;
	var slip_post=formObj.slip_post.value;
	if(formObj.f_inv_seq.value == ""){
		if(bl_post != "" && slip_post != ""){
			bl_post=bl_post.replaceAll("-","");
			bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
			slip_post=slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
			if(slip_post >= bl_post){
				SLIP_POST_DT=addDay(formObj.slip_post.value, 1);
				formObj.f_post_dt.value=SLIP_POST_DT;
				formObj.f_inv_dt.value=SLIP_POST_DT;
				formObj.old_post_dt.value=TODAY;
			}else{
				SLIP_POST_DT="";
			}
		}
	}
	if(formObj.f_inv_seq.value != ""){
		formObj.s_inv_no.value=formObj.temp_inv_no.value;
		doWork("SEARCHLIST");
	}
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
        	          var headers = [ { Text:getLabel('ACC_INV_0033_HDR_1'), Align:"Center"},
        	                    { Text:getLabel('ACC_INV_0033_HDR_2'), Align:"Center"} ];
        	          InitHeaders(headers, info);

        	          var cols = [ {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
        	              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"frt_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"frt_check",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
        	              {Type:"Combo",     Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:0,  Width:280,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:20,   Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"frt_term_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"aply_ut_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"qty",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"ru",                KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"trf_cur_sum_amt",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"rat_curr_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"inv_xcrt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"inv_xcrt_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",     Hidden:0,  Width:150,  Align:"Right",   ColMerge:1,   SaveName:"inv_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Int",       Hidden:0,  Width:40,   Align:"Right",   ColMerge:1,   SaveName:"vat_rt",            KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:50,   Align:"Right",   ColMerge:1,   SaveName:"vat_amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"inv_vat_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_dt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_post_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_due_dt",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"last_pay_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_trdp_cd_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"buy_inv_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"oth_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"last_chk_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Float",     Hidden:0,  Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_bal_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_pay_amt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inco_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"buy_inv_rcv",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"tax_bil_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:31,   Align:"Center",  ColMerge:1,   SaveName:"ref_ofc_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
        	           
        	          InitColumns(cols);

        	          SetEditable(1);
        	          SetHeaderRowHeight(20 );
        	          SetHeaderRowHeight(21);
        	          SetColProperty('frt_cd', {ComboText:FRTCD2, ComboCode:FRTCD1} );
    	        	 SetColProperty('cntr_tpsz_cd', {ComboText:TPSZ1, ComboCode:TPSZ1} );
    	        	 SetColProperty('aply_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
    	        	 SetColProperty('frt_term_cd', {ComboText:"PP|CC", ComboCode:"PP|CC"} );
        	        SetSheetHeight(250);
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
             SetVisible(0);
             
            }                                                      
            break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	//formObj.f_inv_seq.value = sheetObj.CellValue(2,"inv_seq");
	if(sheetObj.GetCellValue(2,"inv_seq") != ""){
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		for(var i=2; i<=sheetObj.LastRow();i++){
			sheetObj.SetCellEditable(i, "frt_check",0);
			sheetObj.SetColBackColor(2,"#EFEBEF");
			/*
formObj.f_amt_tot.value=Number(formObj.f_amt_tot.value) + Number(sheetObj.GetCellValue(i,"inv_amt"));
formObj.f_vatamt_tot.value=Number(formObj.f_vatamt_tot.value) + Number(sheetObj.GetCellValue(i,"inv_vat_amt"));
formObj.f_totamt_tot.value=Number(formObj.f_totamt_tot.value) + Number(sheetObj.GetCellValue(i,"inv_sum_amt"));
			*/
			amt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_amt"));
			vatamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_vat_amt"));
			totamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
			//TB_TRDP에 저장하기 위해 OLD_SUM값을 저장한다.
			formObj.f_old_sum_amt.value=formObj.f_totamt_tot.value;
		}
		formObj.f_amt_tot.value=parseFloat(amt_tot).toFixed(2);
		formObj.f_vatamt_tot.value=parseFloat(vatamt_tot).toFixed(2);
		formObj.f_totamt_tot.value=parseFloat(totamt_tot).toFixed(2);
		formObj.s_inv_no.value=sheetObj.GetCellValue(2,"inv_no");
		formObj.f_vendor_cd.value=sheetObj.GetCellValue(2, "inv_trdp_cd");
		formObj.f_vendor_nm.value=sheetObj.GetCellValue(2, "inv_trdp_cd_nm");
		formObj.f_remark.value=sheetObj.GetCellValue(2, "inv_rmk");
		formObj.f_inv_no.value=sheetObj.GetCellValue(2, "buy_inv_no");
		formObj.f_amt_due.value=doMoneyFmt(sheetObj.GetCellValue(2, "inv_bal_amt"));
		var post_dt=sheetObj.GetCellValue(2, "inv_post_dt");
		var inv_dt=sheetObj.GetCellValue(2, "inv_dt");
		var due_dt=sheetObj.GetCellValue(2, "inv_due_dt");
		var last_paid_dt=sheetObj.GetCellValue(2, "last_pay_dt");
		if(post_dt != ""){
			formObj.f_post_dt.value=post_dt.substring(0,2) 	  + "-" + post_dt.substring(2,4) 	  + "-" + post_dt.substring(4,8)
		}
		if(inv_dt != ""){
			formObj.f_inv_dt.value=inv_dt.substring(0,2) 	  + "-" + inv_dt.substring(2,4) 	  + "-" + inv_dt.substring(4,8)
		}
		if(due_dt != ""){
			//term을 초기화한다.
			formObj.f_terms[0].selected=true;
			formObj.f_due_dt.value=due_dt.substring(0,2) 	  + "-" + due_dt.substring(2,4) 	  + "-" + due_dt.substring(4,8)
		}
		if(last_paid_dt != ""){
			formObj.f_last_paid_dt.value=last_paid_dt.substring(0,2) + "-" + last_paid_dt.substring(2,4) + "-" + last_paid_dt.substring(4,8)
		}
		formObj.f_frgn_amt.value="";
		formObj.f_frgn_vat_amt.value="";
		formObj.f_frgn_sum_amt.value="";
		/*
		//Vendor를 변경못하게 한다.
		formObj.f_vendor_cd.readOnly=true;
		formObj.f_vendor_cd.className="search_form-disable";
		formObj.f_vendor_nm.readOnly=true;
		formObj.f_vendor_nm.className="search_form-disable";
		formObj.billto.onclick="";
		formObj.billto.style.cursor="none";
		*/
		formObj.f_curr_cd.value=sheetObj.GetCellValue(2, "inv_aply_curr_cd");
		formObj.f_clt_cmpl_flg.value=sheetObj.GetCellValue(2, "clt_cmpl_flg");
		if(sheetObj.GetCellValue(2, "buy_inv_rcv") == "Y"){
			formObj.f_buy_inv_rcv.checked=true;
		}
		//마감처리를 한다.
		if(sheetObj.GetCellValue(2, "clt_cmpl_flg") == "Y"){
			execMagam();
		}
//		deleteBtn1.style.display="inline";
		//span id 처리 getBtnObj('deleteBtn2').style.display="inline";
		formObj.f_ref_ofc_cd.value=sheetObj.GetCellValue(2,"ref_ofc_cd");
	}else{
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		for(var i=2; i<=sheetObj.LastRow();i++){
			sheetObj.SetCellEditable(i, "frt_check",1);
			if(formObj.f_vendor_cd.value == sheetObj.GetCellValue(i, "trdp_cd")){
				sheetObj.SetCellValue(i, "frt_check","1");
			}
			amt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_amt"));
			vatamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_vat_amt"));
			totamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
		}
		formObj.f_amt_tot.value=parseFloat(amt_tot).toFixed(2);
		formObj.f_vatamt_tot.value=parseFloat(vatamt_tot).toFixed(2);
		formObj.f_totamt_tot.value=parseFloat(totamt_tot).toFixed(2);
//		deleteBtn1.style.display="none";
		//span id 처리 getBtnObj('deleteBtn2').style.display="none";
	}
	// CNTR TP/SZ 값을 셋팅한다.
	for(var i=2; i<=sheetObj.LastRow();i++){
		sheetObj.SetCellValue(i, "cntr_tpsz_cd",sheetObj.CellSearchValue(i, "cntr_tpsz_cd"));
	}
	//천단위 콤마
	formObj.f_amt_tot.value=doMoneyFmt(roundXL(Number(formObj.f_amt_tot.value),2));
	formObj.f_vatamt_tot.value=doMoneyFmt(roundXL(Number(formObj.f_vatamt_tot.value),2));
	formObj.f_totamt_tot.value=doMoneyFmt(roundXL(Number(formObj.f_totamt_tot.value),2));
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	formObj.f_inv_seq.value=sheetObj.GetCellValue(2,"inv_seq");
	formObj.s_inv_no.value=sheetObj.GetCellValue(2,"inv_no");
	formObj.f_inv_no.value=sheetObj.GetCellValue(2,"inv_no");
	if(formObj.f_inv_seq.value != ""){
		for(var i=2; i<=sheetObj.LastRow();i++){
			sheetObj.SetCellEditable(i, "frt_check",0);
			sheetObj.SetColBackColor(2,"#EFEBEF");
		}
		formObj.f_vendor_cd.value=sheetObj.GetCellValue(2, "inv_trdp_cd");
		formObj.f_vendor_nm.value=sheetObj.GetCellValue(2, "inv_trdp_cd_nm");
		formObj.f_remark.value=sheetObj.GetCellValue(2, "inv_rmk");
		formObj.f_inv_no.value=sheetObj.GetCellValue(2, "buy_inv_no");
		formObj.f_frgn_amt.value="";
		formObj.f_frgn_vat_amt.value="";
		formObj.f_frgn_sum_amt.value="";
		var last_paid_dt=sheetObj.GetCellValue(2, "last_pay_dt");
		if(last_paid_dt != ""){
			formObj.f_last_paid_dt.value=last_paid_dt.substring(0,2) + "-" + last_paid_dt.substring(2,4) + "-" + last_paid_dt.substring(4,8)
		}
		formObj.f_amt_due.value=doMoneyFmt(sheetObj.GetCellValue(2, "inv_bal_amt"));
		formObj.f_curr_cd.value=sheetObj.GetCellValue(2, "inv_aply_curr_cd");
		//마감처리를 한다.
		if(sheetObj.GetCellValue(2, "clt_cmpl_flg") == "Y"){
			execMagam();
		}
		formObj.f_clt_cmpl_flg.value=sheetObj.GetCellValue(2, "clt_cmpl_flg");
		if(sheetObj.GetCellValue(2, "buy_inv_rcv") == "Y"){
			formObj.f_buy_inv_rcv.checked=true;
		}
//		deleteBtn1.style.display="inline";
		//span id 처리 getBtnObj('deleteBtn2').style.display="inline";
	}else{
//		deleteBtn1.style.display="none";
		//span id 처리 getBtnObj('deleteBtn2').style.display="none";
	}
	//TB_TRDP에 저장하기 위해 OLD_SUM값을 저장한다.
	formObj.f_old_sum_amt.value=formObj.f_totamt_tot.value;
	//천단위 콤마
	formObj.f_amt_tot.value=doMoneyFmt(parseFloat(formObj.f_amt_tot.value).toFixed(2));
	formObj.f_vatamt_tot.value=doMoneyFmt(parseFloat(formObj.f_vatamt_tot.value).toFixed(2));
	formObj.f_totamt_tot.value=doMoneyFmt(parseFloat(formObj.f_totamt_tot.value).toFixed(2));
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	//doWork("SEARCHLIST");
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
    switch (sheetObj.ColSaveName(Col)) {
        case "frt_check" :
        	var amt_sum=0;
        	var vat_amt_sum=0;
        	var tot_amt_sum=0;
        	if(formObj.f_vendor_cd.value == ""){
        		//[Vendor] is mandatory field. 
        		alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_INV_0033.770");
        		formObj.f_vendor_cd.focus();
        		sheetObj.SetCellValue(Row,"frt_check","1");
        	}
        	else{
        		if(formObj.f_vendor_cd.value == sheetObj.GetCellValue(Row, "trdp_cd")){
    	        	if(sheetObj.GetCellEditable(Row, "frt_check")){
    	        		if(sheetObj.GetCellValue(Row,"del_chk") == "1"){
    	            		sheetObj.SetCellValue(Row,"del_chk","0",0);
    	            	}
    	        		if(sheetObj.GetCellValue(Row,"frt_check") == "0"){
							formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_amt"));
							formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
							formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
    	            	}else{
							formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_amt"));
							formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
							formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
    	            	}
    	        	}
    	        	formObj.f_amt_tot.value=doMoneyFmt(formObj.f_amt_tot.value);
    	        	formObj.f_vatamt_tot.value=doMoneyFmt(formObj.f_vatamt_tot.value);
    	        	formObj.f_totamt_tot.value=doMoneyFmt(formObj.f_totamt_tot.value);
            	}
        		else{
            		//Check the Customer Info of selected row.
        			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_CUST') + "\n\n: ACC_INV_0033.799");
            		sheetObj.SetCellValue(Row,"frt_check","1");
            	}
        	}
        	break;
        case "del_chk" :
        	if(sheetObj.GetCellValue(Row,"inv_seq") != ""){
				var amt_sum=0;
		    	var vat_amt_sum=0;
		    	var tot_amt_sum=0;
		    	if(sheetObj.GetCellValue(Row,"del_chk") == "0"){
					formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_amt"));
					formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
					formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
		    	}else{
					formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_amt"));
					formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
					formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
		    	}
			}else{
				if(sheetObj.GetCellValue(Row,"del_chk") == "0"){
	        		if(Number(removeComma(formObj.f_amt_tot.value)) > 0 && formObj.f_amt_tot.value != ""){
	        			formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_amt"));
	            	}
	            	if(Number(removeComma(formObj.f_vatamt_tot.value)) > 0 && formObj.f_vatamt_tot.value != ""){
	            		formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
	            	}
	            	if(Number(removeComma(formObj.f_totamt_tot.value)) > 0 && formObj.f_totamt_tot.value != ""){
	            		formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) - Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
	            	}
	        	}else{
	        		if(sheetObj.GetCellValue(Row,"frt_check") == "1"){
						formObj.f_amt_tot.value=Number(removeComma(formObj.f_amt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_amt"));
						formObj.f_vatamt_tot.value=Number(removeComma(formObj.f_vatamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_vat_amt"));
						formObj.f_totamt_tot.value=Number(removeComma(formObj.f_totamt_tot.value)) + Number(sheetObj.GetCellValue(Row,"inv_sum_amt"));
	        		}
	        	}
			}
        	formObj.f_amt_tot.value=doMoneyFmt(formObj.f_amt_tot.value);
        	formObj.f_vatamt_tot.value=doMoneyFmt(formObj.f_vatamt_tot.value);
        	formObj.f_totamt_tot.value=doMoneyFmt(formObj.f_totamt_tot.value);
        	if(sheetObj.GetCellValue(Row,"frt_check") == "1"){
        		sheetObj.SetCellValue(Row,"frt_check","0");
        	}
        	if(sheetObj.GetCellValue(Row, "ibflag") == "I"){
    			sheetObj.RowDelete(Row,false);
    			return;
    		}
        	for(var i=2; i<=sheetObj.LastRow(); i++){
    			//sheetObj.CellValue(i,"frt_check") = "0";
    		}
		break;
	}
}
var cur_row;
function sheet1_OnPopupClick(sheetObj, row, col){
	cur_row = row;
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	//Freight Code조회
	if(colStr == "frt_cd"){
   		rtnary=new Array(1);
   		rtnary[0]="";
   		rtnary[1]="";
   		rtnary[2]="";
   		rtnary[3]="";
   		rtnary[4]="";
   		rtnary[5]="Y";
   		rtnary[6]="Y";	//GNR_FLG
   		callBackFunc = "sheet1_OnPopupClick_frt_cd";
   		modal_center_open('./CMM_POP_0070.clt', rtnary, 557,520,"yes");
   		
    //Buying/Credit인 경우 Invoice 환률을 선택한다.
	}else if(colStr == "rat_curr_cd"){     
    	rtnary=new Array(1);
   		rtnary[0]="1";
   		callBackFunc = "sheet1_OnPopupClick_rat_curr_cd";
   		modal_center_open('./CMM_POP_0040.clt', rtnary, 656,480,"yes");
        
	//Invoice Exchange rate
	}else if(colStr=="inv_xcrt"){
		//팝업 호출 조건을 확인한다.
		if(sheetObj.GetCellValue(row, 'ru') == ''){
   			//Please enter \"Rate!\"!
   			alert(getLabel('FMS_COM_ALT002') + " - " + getLabel('FMS_COD_RATE') + "\n\n: ACC_INV_0033.942");
   			return;
   		//Currency 선택여부 확인
		}else if(sheetObj.GetCellValue(row, 'rat_curr_cd') == ''){
   			//Please select \"Currency!\"!
   			alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_RATE') + "\n\n: ACC_INV_0033.949");
   			return;
   		}
		rtnary=new Array(1);
   		rtnary[0]="2";
   		//P/C 구분에 따라서 조회할 환률을 선택한다. 
   		var fndCurr='';
   		fndCurr=sheetObj.GetCellValue(row, 'rat_curr_cd');
   		var paramStr='?f_fm_curr_cd='+sheetObj.GetCellValue(row, "rat_curr_cd");
   			paramStr+= '&f_inv_curr_cd='+sheetObj.GetCellValue(row, 'rat_curr_cd');
   			paramStr+= '&f_dft_dt=' +sheetObj.GetCellValue(row, "inv_xcrt_dt");
		//paramStr+= '&f_trdp_cd='+sheetObj.CellValue(row, "trdp_cd");
		//paramStr+= '&f_trdp_nm='+sheetObj.CellValue(row, "trdp_nm");
   			paramStr+= '&f_trdp_cd='+frm1.f_vendor_cd.value;
   			paramStr+= '&f_trdp_nm='+frm1.f_vendor_nm.value;
   		
		callBackFunc = "sheet1_OnPopupClick_inv_xcrt";
   		modal_center_open('./CMM_POP_0220.clt'+paramStr, rtnary, 750,600,"yes");
   		
	}
}
function sheet1_OnChange(sheetObj, row, col) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	/*
	 * Currency에 의해 금액 결과값의 포맷이 달라짐
	 * KRW, JPY은 소수점이 없는 금액임
	 * Math.round 처리함
	 */
	var curr=formObj.f_curr_cd.value;
	if(colStr == "frt_cd"){
		var frt_cd=sheetObj.GetCellValue(row, 'frt_cd');
		//doAutoSearch(sheetObj, row, 'frt_cd', 'freight', codeStr, 'frt_cd', 'frt_cd_nm');
		SELECTROW=row;
		if(frt_cd != ""){
			ajaxSendPost(getInvGnrFrtcd, 'reqVal', '&goWhere=aj&bcKey=getInvGnrFrtcd&sell_buy_tp_cd=B&frt_cd='+frt_cd, './GateServlet.gsl');
		}else{
			sheetObj.SetCellValue(row, "frt_cd","");
			sheetObj.SetCellValue(row, "frt_cd_nm","");
			sheetObj.SetCellValue(row, "vat_rt","");
		}
	}
	if(colStr == "inv_amt"){
sheetObj.SetCellValue(row, "vat_amt",Number(sheetObj.GetCellValue(row, "vat_rt"))/100);
		if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(row, "inv_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100)));
		}else{
sheetObj.SetCellValue(row, "inv_vat_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) * Number(sheetObj.GetCellValue(row, "vat_rt"))/100);
		}
sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")));
	}
	if(colStr == "vat_rt"){
sheetObj.SetCellValue(row, "vat_amt",Number(sheetObj.GetCellValue(row, "vat_rt"))/100);
		if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "inv_vat_amt",Math.round(Number(sheetObj.GetCellValue(row, "inv_amt")) * (Number(sheetObj.GetCellValue(row, "vat_rt"))/100)));
		}else{
sheetObj.SetCellValue(row, "inv_vat_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) * Number(sheetObj.GetCellValue(row, "vat_rt"))/100);
		}
sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")));
	}
	if(colStr == "inv_vat_amt"){
		if(curr=="KRW" || curr=="JPY"){
sheetObj.SetCellValue(row, "inv_sum_amt",Math.round( Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")) ));
		}else{
sheetObj.SetCellValue(row, "inv_sum_amt",Number(sheetObj.GetCellValue(row, "inv_amt")) + Number(sheetObj.GetCellValue(row, "inv_vat_amt")));
		}
	}
	if(formObj.f_inv_seq.value != ""){
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		for(var i=2; i<=sheetObj.LastRow(); i++){
if(sheetObj.GetCellValue(i,"del_chk") == "1"){
				//amt_tot 	= Number(sheetObj.CellValue(i, "inv_amt"));
				//vatamt_tot 	= Number(sheetObj.CellValue(i, "inv_vat_amt"));
				//totamt_tot 	= Number(sheetObj.CellValue(i, "inv_sum_amt"));
			}else{
amt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_amt"));
vatamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_vat_amt"));
totamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
			}
		}
		formObj.f_amt_tot.value=doMoneyFmt(amt_tot);
		formObj.f_vatamt_tot.value=doMoneyFmt(vatamt_tot);
		formObj.f_totamt_tot.value=doMoneyFmt(totamt_tot);
	}else{
		var amt_tot=0;
		var vatamt_tot=0;
		var totamt_tot=0;
		for(var i=2; i<=sheetObj.LastRow(); i++){
if(sheetObj.GetCellValue(i,"frt_check") == "1"){
amt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_amt"));
vatamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_vat_amt"));
totamt_tot 	+= Number(sheetObj.GetCellValue(i, "inv_sum_amt"));
			}
		}
		formObj.f_amt_tot.value=doMoneyFmt(parseFloat(amt_tot).toFixed(2));
		formObj.f_vatamt_tot.value=doMoneyFmt(parseFloat(vatamt_tot).toFixed(2));
		formObj.f_totamt_tot.value=doMoneyFmt(parseFloat(totamt_tot).toFixed(2));
	}
}
/**
 * 기본 세률 조회
 */
function setTaxRate(reqVal){
	var sheetObj=docObjects[0];
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
		sheetObj.SetCellValue(frm1.f_curRow.value, "vat_rt",doc[1]);
    }
}
function calcFrgnAmt(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	for(var i=2;i<=sheetObj.LastRow();i++){
		//INVOICE생성후 데이터
		if(formObj.f_inv_seq.value != ""){
if(sheetObj.GetCellValue(i, "del_chk") != "1"){
if(formObj.f_curr_cd.value != sheetObj.GetCellValue(i, "rat_curr_cd")){
formObj.f_frgn_curr_cd.value=sheetObj.GetCellValue(i, "rat_curr_cd");
formObj.f_frgn_amt.value=Number(formObj.f_frgn_amt.value) + Number(sheetObj.GetCellValue(i,"inv_amt"));
formObj.f_frgn_vat_amt.value=Number(formObj.f_frgn_vat_amt.value) + Number(sheetObj.GetCellValue(i,"inv_vat_amt"));
formObj.f_frgn_sum_amt.value=Number(formObj.f_frgn_sum_amt.value) + Number(sheetObj.GetCellValue(i,"inv_sum_amt"));
				}else{
					//formObj.f_frgn_curr_cd.value 	= "";
					//formObj.f_frgn_amt.value 		= 0;
					//formObj.f_frgn_vat_amt.value 	= 0;
					//formObj.f_frgn_sum_amt.value 	= 0;
				}
			}
		//INVOICE생성전 데이터
		}else{
		}
	}
}
/**
 * 콤보 조회
 */
function doAction(cmdt_cd){
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCommodityKeyCode&s_cmdt_cd='+cmdt_cd, './GateServlet.gsl');
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//[Commodity Code] is duplicated!
			alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_CMDT') + ": " + doc[1] + "\n\n: ACC_INV_0033.1156");
			var sheetObj=docObjects[0];
			var intRow=sheetObj.LastRow();
			sheetObj.SetCellValue(intRow, "cmdt_cd","");
		}	
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: ACC_INV_0033.1162");	
	}
}
//참고
function rightDate()
{
  var year=document.form1.JLYEAR.value;
  var month=document.form1.JLMONTH.value;
  var dd=new Date(year, month, 0);
  var selectedDay=document.form1.JLDAY.value;
  var lastDay=dd.getDate();
  if ( selectedDay > lastDay)
  {
    alert( "날짜를 정확히 선택해 주세요. 선택하신 년월의 날짜는 " + lastDay + " 일까지 있습니다.");
    return false;    
  }
  return false;
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
        	var cal=new ComCalendar();
            cal.select(formObj.f_post_dt, 'MM-dd-yyyy');
        break;
        case 'DATE2':    //달력 조회 팝업 호출      
        	var cal=new ComCalendar();
            cal.select(formObj.f_inv_dt, 'MM-dd-yyyy');
            calcCreateTerms();
        break;
        case 'DATE3':    //달력 조회 팝업 호출      
        	var cal=new ComCalendar();
            cal.select(formObj.f_due_dt, 'MM-dd-yyyy');
        break;
    }
}
function enterInvInfo(){
	var formObj=document.frm1;
	if(formObj.s_inv_no.value != ""){
		if(event.keyCode == 13){
			ajaxSendPost(getInvInfo, 'reqVal', '&goWhere=aj&bcKey=getInvInfo&s_inv_no='+formObj.s_inv_no.value+'&ofc_cd='+formObj.f_ofc_cd.value+'&type1=B&type2=B', './GateServlet.gsl');
		}
	}
}
/**
 * AJAX RETURN
 * INVOICE_INFO를 가져온다.
 */
function getInvInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				frm1.f_inv_seq.value=rtnArr[0];
				frm1.s_inv_no.value=rtnArr[1];
				doWork("SEARCHLIST");
			}else{
				frm1.f_inv_seq.value="";
				frm1.s_inv_no.value="";
				clearAll();
				formObj.s_inv_no.focus();
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
/**
 * AJAX RETURN
 * BL CONTAINER TP_SZ 가져온다.
 */
function getBlCntrInfo(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			var tp_sz=" ";
			var tp_cnt=0;
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				for(var i=0;i<rtnArr.length; i++){
					tp_sz += "|"+rtnArr[i];
				}
				sheetObj.SetColProperty('cntr_tpsz_cd', {ComboText:tp_sz, ComboCode:tp_sz} );
			}else{
				sheetObj.SetColProperty('cntr_tpsz_cd', {ComboText:tp_sz, ComboCode:tp_sz} );
			}
		}
	}else{
	}
}
/**
 * AJAX RETURN
 * INVOICE FRT CD 를 가져온다.
 */
function getInvGnrFrtcd(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				sheetObj.SetCellValue(SELECTROW, "frt_cd",rtnArr[0]);
				sheetObj.SetCellValue(SELECTROW, "frt_cd_nm",rtnArr[1]);
				sheetObj.SetCellValue(SELECTROW, "vat_rt",rtnArr[2]);
			}else{
				sheetObj.SetCellValue(SELECTROW, "frt_cd","");
				sheetObj.SetCellValue(SELECTROW, "frt_cd_nm","");
				sheetObj.SetCellValue(SELECTROW, "vat_rt","");
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//조회 INVOICE NO가 비었을경우 INV_SEQ 를 지워준다.
function setInvInfo(){
	var formObj=document.frm1;
	if(formObj.s_inv_no.value == ""){
		formObj.f_inv_seq.value="";
	}
}
function enterCalcCreateTerms(){
	var formObj=document.frm1;
	if(formObj.f_term_dt.value != "" && formObj.f_term_dt.value != "0"){
		if(event.keyCode == 13){
			calcCreateTerms();
		}
	}
}
//CREATE TERMS로 DUE DATE 를 계산한다.
function calcCreateTerms(){
	var formObj=document.frm1;
	
	// oyh-inv_dt가 입력되지 않으면 동작안되게 수정 
	if (formObj.f_inv_dt.value == "") {
		return;
	}
	
	if(formObj.f_terms[0].selected){
		formObj.f_term_dt.value="";
		formObj.f_due_dt.value=formObj.f_inv_dt.value;
	}else if(formObj.f_terms[1].selected){
		if(formObj.f_term_dt.value != ""){
			var dueDay=formObj.f_term_dt.value;
			var endDate=addDay(formObj.f_inv_dt.value, dueDay);
			formObj.f_due_dt.value=endDate;
		}
	}else if(formObj.f_terms[2].selected){
		formObj.f_term_dt.value="";
		var endDate=getEndDate(formObj.f_inv_dt.value);
		formObj.f_due_dt.value=endDate;
	}else if(formObj.f_terms[3].selected){
		formObj.f_term_dt.value="";
		var endDate=getNextEndDate(formObj.f_inv_dt.value);
		formObj.f_due_dt.value=endDate;
	}
	else if(formObj.f_terms[4].selected){
		if(formObj.f_term_dt.value != ""){
			var dueDay=formObj.f_term_dt.value;
			if(Number(dueDay) < 1 || Number(dueDay) > 31){
				//Invalid date.
				alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0033.1373");
				formObj.f_term_dt.value="";
				formObj.f_term_dt.focus();
				return;
			}
			var endDate=getNextInputDate(formObj.f_inv_dt.value, dueDay);
			formObj.f_due_dt.value=endDate;
		}
	}
}
//말일구하기
function getEndDate(datestr){
	datestr=datestr.replaceAll("-","");
    var yy=Number(datestr.substring(4,8));
    var mm=Number(datestr.substring(0,2));
    //윤년 검증
    var boundDay="";
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm="0"+mm
       }
       boundDay=mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}
//다음달 말일구하기
function getNextEndDate(datestr){
	datestr=datestr.replaceAll("-","");
    var yy=Number(datestr.substring(4,8));
    var mm=Number(datestr.substring(0,2))+1;
	if(mm == 13){
		yy=yy+1;
		mm=1;
	}
    //윤년 검증
    var boundDay="";
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm="0"+mm
       }
       boundDay=mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}
//다음달 입력일 구하기
function getNextInputDate(datestr, v_day){
	datestr=datestr.replaceAll("-","");
    var yy=Number(datestr.substring(4,8));
    var mm=Number(datestr.substring(0,2))+1;
	if(mm == 13){
		yy=yy+1;
		mm=1;
	}
    //윤년 검증
    var boundDay="";
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm="0"+mm
       }
       if(mon[mm-1] < v_day){
    	   //Invalid date.
    	   alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0033.1484");
    	   return false;
       }
    } 
    else{
      if(yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm
          }
          if(y_day > 29){
        	  //Invalid date.
        	  alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0033.1498");
       	   	  return false;
          }
      }
      else{
    	  if(mm < 10){
       	   mm="0"+mm
          }
    	  if(y_day > 28){
    		  //Invalid date.
    		  alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0033.1510");
       	   	  return false;
          }
      }
    }
    if(Number(v_day) < 10){
    	v_day="0"+v_day;
    }
    boundDay=mm + "-" + v_day + "-" + yy;
    return boundDay;  
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
//그리드 전체를 삭제하면 INVOICE 를 삭제한다.
function checkDelete(){
	var sheetObj=docObjects[0];
	var returnFlag=true;
	var delCnt=0;
	for(var i=2; i<=sheetObj.LastRow(); i++){
if(sheetObj.GetCellValue(i,"del_chk") == "1" && sheetObj.GetCellValue(i,"inv_seq") != ""){
		   delCnt += 1;
	   }
   }
	if(delCnt == sheetObj.RowCount()){
		returnFlag=false;
	}
	return returnFlag
}
//화면 클리어
function clearAll(){
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  if(collTxt[i].name != "f_usr_nm" && collTxt[i].name != "f_email" && collTxt[i].name != "f_ofc_cd" && collTxt[i].name != "f_cnt_cd"){
			  collTxt[i].value="";
		  }
		  if(collTxt[i].name == "f_vendor_cd" || collTxt[i].name == "f_vendor_nm" ||
		     collTxt[i].name == "f_inv_no" || collTxt[i].name == "f_post_dt" || 
		     collTxt[i].name == "f_inv_dt" || collTxt[i].name == "f_term_dt" || 
		     collTxt[i].name == "f_due_dt"){
			  collTxt[i].className="search_form";
			  collTxt[i].readOnly=false;
		  }
	  }           
	}
	frm1.f_post_dt.value=TODAY;
	frm1.f_inv_dt.value=TODAY;
	frm1.f_terms.value="";
	frm1.f_remark.value="";
	frm1.f_buy_inv_rcv.disabled=false;
	frm1.f_terms.disabled=false;
	frm1.f_curr_cd.disabled=false;
	frm1.f_remark.disabled=false;
//	deleteBtn1.style.display="none";
	//span id 처리 getBtnObj('deleteBtn2').style.display="none";
	frm1.f_vendor_cd.onblur=function(){codeNameAction('VENDOR',this, 'onBlur')};
	frm1.billto.onclick=function(){doWork("CUSTOMER_POPLIST");};
	frm1.billto.style.cursor="hand";
	frm1.f_post_dt_cal.onclick=function(){doDisplay('DATE1', frm1);};
	frm1.f_inv_dt_cal.onclick=function(){doDisplay('DATE2', frm1);};
	frm1.f_due_dt_cal.onclick=function(){doDisplay('DATE3', frm1);};
	frm1.f_inv_dt.onblur=function(){calcCreateTerms();};
	frm1.f_term_dt.onblur=function(){calcCreateTerms();};
	sheetObj.SetEditable(1);
	sheetObj.RemoveAll();
}
//필수항목체크
function checkVal(){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(formObj.f_vendor_nm.value == "" || formObj.f_vendor_cd.value == ""){
		//[Vendor] is mandatory field. 
		alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_INV_0033.1629");
		formObj.f_vendor_nm.focus();
		return false;
	}
	if(formObj.f_post_dt.value == ""){
		//[Posting Date] is mandatory field.
		alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_INV_0033.1634");
		formObj.f_post_dt.focus();
		return false;
	}
	if(formObj.f_inv_dt.value == ""){
		//[Invoice Date] is mandatory field.
		alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_INV_0033.1642");
		formObj.f_inv_dt.focus();
		return false;
	}
	if(formObj.f_due_dt.value == ""){
		//[Due Date] is mandatory field.
		alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_INV_0033.1650");
		formObj.f_due_dt.focus();
		return false;
	}
	if(formObj.f_curr_cd.value == ""){
		//[Currency] is mandatory field.
		alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_INV_0033.1658");
		formObj.f_curr_cd.focus();
		return false;
	}
	// 마감 POST DATE와  BL POST DATE 비교( BL의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
	var bl_post=formObj.f_post_dt.value;
	var slip_post=formObj.slip_post.value;
	if(formObj.f_inv_seq.value == ""){
		if(bl_post != "" && slip_post != ""){
			bl_post=bl_post.replaceAll("-","");
			bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
			slip_post=slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
			if(slip_post >= bl_post){
				//Invalid [Posting Date
				alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0033.1676");
				formObj.f_post_dt.value=TODAY;
				formObj.f_post_dt.select();
				return false;
			}
		}
	}
	for(var i=2;i<=sheetObj.LastRow();i++){
if(sheetObj.GetCellValue(i, "frt_cd") == ""){
			//[Freight Code] is mandatory field.
			alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_INV_0033.1688");
			sheetObj.SelectCell(i,"frt_cd");
			return false;
		}
		/*
if(sheetObj.GetCellValue(i, "qty") == ""){
			//[Vol] is mandatory field.
			alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_INV_0033.1697");
			sheetObj.SelectCell(i,"qty");
			return false;
		}
		*/
	}
	return true;
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();		
	var s_type="";
	if(s_code != ""){
		if(tmp == "onKeyDown"){
			if(event.keyCode == 13){
				CODETYPE=str;	
				s_type="trdpCode";
				if(CODETYPE=="VENDOR"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} 
		else if(tmp == "onBlur"){
			if (s_code != ""){
				CODETYPE=str;		
				s_type="trdpCode";
				if(CODETYPE=="VENDOR"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}
	else{
		if(str == "VENDOR"){
			formObj.f_vendor_cd.value="";//trdp_cd  AS param1
			formObj.f_vendor_nm.value="";//eng_nm   AS param2
		}
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
			if(CODETYPE =="VENDOR"){
				formObj.f_vendor_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.f_vendor_nm.value=masterVals[3];	//eng_nm   AS param2
				formObj.f_terms.value=masterVals[8];	//term_cd
				formObj.f_term_dt.value=masterVals[9];	//term_dt
				calcCreateTerms();
			}
		}
		else{
			if(CODETYPE =="VENDOR"){
				formObj.f_vendor_cd.value="";				//trdp_cd  AS param1
				formObj.f_vendor_nm.value="";				//eng_nm   AS param2
				formObj.f_terms.value="";				//term_cd
				formObj.f_term_dt.value="";				//term_dt
				calcCreateTerms();
			}
		}
	}
	else{
		//SEE_BMD_MSG43		
	}
}
function custEnterAction(obj, type){
	var formObj=document.frm1;
	if (event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}
		else if(type == "CUSTOMER2"){
			doWork("CUSTOMER_POPLIST2");
		}
	}
}
//마감처리를 한다.
function execMagam(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  if(collTxt[i].name != "f_usr_nm" && collTxt[i].name != "f_email" && collTxt[i].name != "f_ofc_cd" && collTxt[i].name != "f_cnt_cd" &&
				  collTxt[i].name != "s_bl_no" && collTxt[i].name != "s_ref_no" && collTxt[i].name != "s_oth_no" && collTxt[i].name != "s_inv_no"){
			  collTxt[i].className="search_form-disable";
			  collTxt[i].readOnly=true;
		  }
	  }           
	}
	//frm1.f_buy_inv_rcv.disabled = true;
	frm1.f_terms.disabled=true;
	frm1.f_curr_cd.disabled=true;
	//frm1.f_remark.disabled   = true;
	frm1.f_vendor_cd.onblur="";
	frm1.f_inv_dt.onblur="";
	frm1.f_term_dt.onblur="";
	frm1.f_post_dt_cal.onclick="";
	frm1.f_inv_dt_cal.onclick="";
	frm1.f_due_dt_cal.onclick="";
//	deleteBtn1.style.display="none";
	//span id 처리 getBtnObj('deleteBtn2').style.display="none";
	for(var i=2; i<=sheetObj.LastRow();i++){
		sheetObj.SetRowEditable(i,0);
	}
}
//POST_DATE 변경시 INV_DATE를 변경한다.
function setInvDt(){
	frm1.f_inv_dt.value=frm1.f_post_dt.value;
}
function checkPostDate(){
	var formObj=document.frm1;
	// 마감 POST DATE와  BL POST DATE 비교( BL의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
	var bl_post=formObj.f_post_dt.value;
	var slip_post=formObj.slip_post.value;
	if(formObj.f_inv_seq.value == ""){
		if(bl_post != "" && slip_post != ""){
			bl_post=bl_post.replaceAll("-","");
			bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
			slip_post=slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
			if(slip_post >= bl_post){
				//Invalid [Posting Date]
				alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0033.1856");
				formObj.f_post_dt.value=TODAY;
				formObj.f_post_dt.select();
				return false;
			}
		}
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

function CUSTOMER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_vendor_cd.value=rtnValAry[0];	//full_nm
		formObj.f_vendor_nm.value=rtnValAry[2];	//full_nm
		formObj.f_terms.value=rtnValAry[17];	//term_cd
		formObj.f_term_dt.value=rtnValAry[18];	//term_dt
		calcCreateTerms();
	}  
}

function INV_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_inv_no.value=rtnValAry[0];//inv_no
		formObj.f_inv_seq.value=rtnValAry[3];//inv_seq
		doWork("SEARCHLIST");
	}
}
function sheet1_OnPopupClick_frt_cd(rtnVal){
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			docObjects[0].SetCellValue(cur_row, "frt_cd",rtnValAry[0]);
			docObjects[0].SetCellValue(cur_row, "frt_cd_nm",rtnValAry[1]);
			docObjects[0].SetCellValue(cur_row, "vat_rt",rtnValAry[2]);
			//기존 입력값 초기화
			/*
			sheetObj.SetCellValue(row, "cntr_tpsz_cd",'');
			sheetObj.SetCellValue(row, "qty",'');
			sheetObj.SetCellValue(row, "vat_amt",'');
			sheetObj.SetCellValue(row, "inv_amt",'');
			sheetObj.SetCellValue(row, "inv_vat_amt",'');
			*/
			frm1.f_curRow.value=cur_row;
			/*
			var parmStr='&goWhere=aj&bcKey=searchMyTaxRate';
			parmStr += '&f_frt_cd='+rtnValAry[0]; 
			ajaxSendPost(setTaxRate,  'reqVal', parmStr, './GateServlet.gsl');
			*/
		}
	}
function sheet1_OnPopupClick_rat_curr_cd(rtnVal){
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			docObjects[0].SetCellValue(cur_row, col,rtnValAry[0]);
			docObjects[0].SetCellValue(cur_row, 'inv_xcrt','');
			docObjects[0].SetCellValue(cur_row, 'inv_amt','');
			docObjects[0].SetCellValue(cur_row, 'inv_vat_amt','');
			if(docObjects[0].GetCellValue(cur_row,  "rat_curr_cd") == docObjects[0].GetCellValue(cur_row, "rat_curr_cd")){
				docObjects[0].SetCellValue(cur_row, "inv_xcrt",1);
			}
		}
	}

function sheet1_OnPopupClick_inv_xcrt(rtnVal){
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			docObjects[0].SetCellValue(cur_row, "inv_xcrt",rtnValAry[0]);//EX. Rate  inv_xcrt
			docObjects[0].SetCellValue(cur_row, "rat_curr_cd",rtnValAry[1]);//xch_curr_cd
			calcInvAmt(docObjects[0], cur_row, objPfx);
		}
	}

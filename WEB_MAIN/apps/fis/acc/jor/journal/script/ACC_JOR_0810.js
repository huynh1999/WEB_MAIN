/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_JOR_0810.js
*@FileTitle  : Check Journal List
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/20
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var FROMDATE;
var TODAY;
var ENDDATE;
var jnrVoidflag = ''; 
var beforeChkNo = 0;
var G_GL_DATA_CREATE_STATUS = "END";
var vJnrModiTms;

function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    //var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
	   case "NEW":
			var paramStr="./ACC_JOR_0800.clt?f_cmd=-1";
		    parent.mkNewFrame('Payment', paramStr);     
	   break;     
       case "SEARCHLIST":
    	   if(!formValidation()) return;
    	   //sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
            formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
            //sheetObj2.RemoveAll();
            docObjects[0].DoSearch("./ACC_JOR_0810GS.clt", FormQueryString(formObj) );
       break;
       case "MODIFY":	//수정
    	   
    	   var ref_ofc_cd = "";
    	   for(var i=1; i<=sheetObj.LastRow();i++){
    		   var check_flag = sheetObj.GetCellValue(i, "check_flag");
    		   if (check_flag == "1"){
    			   //alert(sheetObj.GetCellValue(i, "chk_no"));
    			   ref_ofc_cd = sheetObj.GetCellValue(i, "p_ofc_cd");
    		   }
    	   }  
  	 	//	alert(edoa_flg + " "+ofc_cd+" "+ref_ofc_cd);
	   	 	var btnflag = "Y";
			if (edoa_flg == "N"){
				if (ofc_cd != ref_ofc_cd){  
					btnflag = "N";
				}
			}  
			if (ref_ofc_cd == "") { btnflag = "Y"; }
			if (btnflag == "Y"){ 
			}else{
				alert(getLabel('FMS_COM_ALT083'));
				return;
			}
			
		   frm1.f_cmd.value = MODIFY;
       	   
		   var chk_cnt = 0;
    	   var jnrNoVal	= "";
    	   
    	   //LHK, 20140429, #26602 [SUNWAY] Delete Button Disappear
		   var sRow=sheetObj.FindCheckedRow("check_flag");
		   //가져온 행을 배열로 반든다.
//		   var arrRow = sRow.split("|");
//		   chk_cnt	 =	arrRow.length-1;
		   
		   var audFlgCnt = 0;
		   
		   for(var i=1; i<=sheetObj.LastRow(); i++){
			   if(sheetObj.GetCellValue(i, "aud_flg") != sheetObj.GetCellValue(i, "org_aud_flg")){
				   audFlgCnt++;
			   }
		   }
		   
		   if(sRow == 0 && audFlgCnt == 0){
			   //No Save Data!!
			   alert(getLabel('FMS_COM_ALT004'));
			   return;
		   }
		   
//		   var chk_row=arrRow[0];
		   var chk_row=sRow;
		   
		   if(chk_row != ""){
			 //마감이나 PAID됐을시 POST_DT를 수정불가하게 한다.
				if(sheetObj.GetCellValue(chk_row, "clt_cmpl_flg") == "Y"
					|| sheetObj.GetCellValue(chk_row, "clr_yn") == "Y"
					|| sheetObj.GetCellValue(chk_row, "void_yn") == "Y"
					|| (sheetObj.GetCellValue(chk_row, "chk_pnt_yn") == "Y" && formObj.prn_flg.value != 'Y')){
					alert(getLabel('ACC_MSG141'));
					return;
			   }
			   

				// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정 
				if(!chkJnrModiTms()){
				   return;
				}
		   }
			
           if(confirm(getLabel('FMS_COM_CFMSAV'))){
        	   sheetObj.DoSave("ACC_JOR_0810GS.clt", FormQueryString(formObj),"ibflag",false);
           }
       
           break;
       case "DELETE":	//삭제
           
    	   var ref_ofc_cd = "";
    	   for(var i=1; i<=sheetObj.LastRow();i++){
    		   var check_flag = sheetObj.GetCellValue(i, "check_flag");
    		   if (check_flag == "1"){
    			   //alert(sheetObj.GetCellValue(i, "chk_no"));
    			   ref_ofc_cd = sheetObj.GetCellValue(i, "p_ofc_cd");
    		   }
    	   }  
  	 	//	alert(edoa_flg + " "+ofc_cd+" "+ref_ofc_cd);
	   	 	var btnflag = "Y";
			if (edoa_flg == "N"){
				if (ofc_cd != ref_ofc_cd){  
					btnflag = "N";
				}
			}  
			if (ref_ofc_cd == "") { btnflag = "Y"; }
			if (btnflag == "Y"){ 
			}else{
				alert(getLabel('FMS_COM_ALT084'));
				return;
			}
			
    	   frm1.f_cmd.value = REMOVE;
    	   
    	   var chk_cnt = 0;
    	   var jnrNoVal	= "";
    	   
    	   //LHK, 20140429, #26602 [SUNWAY] Delete Button Disappear
		   var sRow = sheetObj.FindCheckedRow("check_flag");
		   //가져온 행을 배열로 반든다.
//		   var arrRow = sRow.split("|");
//		   chk_cnt	 =	arrRow.length-1;
		   
		   if(sRow == 0){
			   //No Delete Data!!
			   alert(getLabel('FMS_COM_ALT004'));
			   return;
		   }
		   
		   var chk_row	= sRow;
		   jnrNoVal	= sheetObj.GetCellValue(chk_row ,"jnr_no");
		   
		   //마감이나 PAID됐을시 POST_DT를 수정불가하게 한다.
		   if(sheetObj.GetCellValue(chk_row, "clt_cmpl_flg") == "Y" 
					|| sheetObj.GetCellValue(chk_row, "clr_yn") == "Y" 
					|| (sheetObj.GetCellValue(chk_row, "chk_pnt_yn") == "Y" && formObj.prn_flg.value != 'Y')){
				alert(getLabel('ACC_MSG140'));
				return;
		   }
		   

			// 52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정 
			if(!chkJnrModiTms()){
			   return;
			}		   
		   
		   //Bug #26931 LHK, 20140310, A. Deposit/Payment List 에서 Delete 하는 경우 
//		   ajaxSendPost(getJnrVoidInfo, 'reqVal', '&goWhere=aj&bcKey=getJnrVoidInfo&f_jnr_no='+jnrNoVal, './GateServlet.gsl');
//		   if(jnrVoidflag == "Y"){
//			   alert(getLabel('ACC_MSG138'));
//			   return;
//		   }
		   
           if(confirm(getLabel('FMS_COM_CFMDEL'))){
        	   sheetObj.DoSave("ACC_JOR_0810GS.clt", FormQueryString(formObj),"ibflag",false);
           }
       break;
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
//	   		rtnary[1]=formObj.s_rcv_from_nm.value;
//	   		rtnary[2]=window;
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
     	break;
       case "CUSTOMER_NAME":
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_rcv_from_nm.value;
	   		rtnary[2]=window;
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	break;
      case "EXCEL":
    	  if(sheetObj.RowCount() < 1){//no data	
	  			ComShowCodeMessage("COM132501");
	  		}else{
	  			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	  		}
      break;
      case "JNR_HIS":
			var sRow=sheetObj.GetSelectRow();
			if (sRow < 0){
				break;
			}
			var reqParam='?jnr_no=' + sheetObj.GetCellValue(sRow, "jnr_no");
				reqParam += '&jnr_tp=' + sheetObj.GetCellValue(sRow, "jnr_tp");
			popGET('ACC_JOR_0700.clt'+reqParam, '', 1100, 600, "scroll:yes;status:no;help:no;");
      break;
      case 'SLIP':
    	var chkCnt=0;
      	for(var i=1; i < sheetObj.LastRow() + 1; i++){
      		if(sheetObj.GetCellValue(i, 'check_flag')==1){
      			if(chkCnt>0){
      				sheetObj.SetCellValue(i, 'check_flag',0);
      	    	}
      			chkCnt++;
      		}
      	}
      	if(chkCnt==0){
      		alert(getLabel('FMS_COM_ALT004'));
      		return;
      	}
      	
    	if(G_GL_DATA_CREATE_STATUS == "END"){
      		G_GL_DATA_CREATE_STATUS ="START";
      		setGlDataCreate('');
      	} 
      	return;
      break;
      case "GL_CREATE_END_ACTION":
      	var sRow=sheetObj.GetSelectRow();
      	formObj.title.value='Accounting Slip';
      	var grp_slip_no=sheetObj.GetCellValue(sRow, "grp_slip_no");
      	var source="";
      	var srcNo=sheetObj.GetCellValue(sRow, "chk_no");
      	var refNo=sheetObj.GetCellValue(sRow, "ref_no");
      	var blNo=sheetObj.GetCellValue(sRow, "hbl_no");
      	
        //#964 [SHINE] Account Slip 기능 보완 - 전체 Accounting 기능
      	var bloked_by	= sheetObj.GetCellValue(sheetObj.GetSelectRow(), "bloked_by");
		var issued_by	= sheetObj.GetCellValue(sheetObj.GetSelectRow(), "issued_by");
		var block_dt	= sheetObj.GetCellValue(sheetObj.GetSelectRow(), "block_dt");
		
		//#1799 [PATENT] VOUCHER 양식 - Deposit/Payment for CHINA Account Slip [Form]
		var vchr_no = sheetObj.GetCellValue(sRow, "vchr_no");
		var vchr_tp_nm = sheetObj.GetCellValue(sRow, "vchr_tp_nm");
		
		//#2110 [PATENT] VOUCHER PRINT 버튼 추가, VOUCHER 양식 업데이트, VOUCHER NO 자동생성
		var aud_usr_id   = sheetObj.GetCellValue(sRow, "aud_usr_id");
		var aud_usr_name   = sheetObj.GetCellValue(sRow, "aud_usr_name");
		var issued_by_id = sheetObj.GetCellValue(sRow, "rgst_usrid");
		
		
  		source="Deposit/Payment";
  		formObj.file_name.value='account_slip_07.mrd';
		//Parameter Setting
      	var param="[" + "'" + grp_slip_no + "'" + ']';					// [1]
		param += '[' + source + ']';								// [2]
		param += '[' + srcNo + ']';									// [3]
		param += '[' + refNo + ']';									// [4]
		param += '[' + blNo + ']';									// [5]
		param += '[' + formObj.ofc_nm.value + ']';					// [6]
		param += '[' + formObj.user_id.value + ']';					// [7]
		param += '[' + formObj.ofc_cd.value + ']';					// [8]
		
		//#964 [SHINE] Account Slip 기능 보완 - 전체 Accounting 기능
		param += '[' + formatDate(new Date(), 'MM-dd-yyyy') + ']';					// [9]
		param += '[' + bloked_by + ']';					// [10]
		param += '[' + issued_by + ']';					// [11]
		param += '[' + block_dt + ']';					// [12]
		
		//#1799 [PATENT] VOUCHER 양식 - Deposit/Payment for CHINA Account Slip [Form]
		param += '[' + vchr_no + ']';					// [13]
		param += '[' + vchr_tp_nm + ']';				// [14]
		
		//#2110 [PATENT] VOUCHER PRINT 버튼 추가, VOUCHER 양식 업데이트, VOUCHER NO 자동생성
		param += '[' + aud_usr_name   + ']';				// [15]  Audited by - 复核 ,   Issued by - 制单                             
		param += '[' + issued_by    + ']';				// [16]  Audited by - 复核 ,   Issued by - 制单                             
		
		
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
    
    //	개인정보 관리화면 정렬순서 2016.03 
	//ajaxSendPost(setOrderByInfo, 'reqVal','&goWhere=aj&bcKey=searchTbUserOrderbyInfoAttr&pgm_usr_id='+formObj.user_id.value+'&pgm_url=./ACC_JOR_0810.clt',	'./GateServlet.gsl');
    
    
    //LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.s_ofc_cd);    
    
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	//사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
    //오늘일자구하기
    var now=new Date();
    var preDt=new Date(Date.parse(now) - 90 * 1000 * 60 * 60 * 24);
    var year=now.getFullYear(); 			
    var month=now.getMonth() + 1;
    var date=now.getDate(); 	
    var preyear=preDt.getFullYear();
    var premonth=preDt.getMonth() + 1;
    var predate=preDt.getDate();
    if(month < 10){
    	month="0"+(month);
    }
    if(date < 10){
    	date="0"+date;
    }
    if(premonth < 10){
    	premonth="0"+(premonth);
    }
    if(predate < 10){
    	predate="0"+predate;
    }
    /* 2013.10.04 변경 
     *  검색시작일 - today - 3달전 (90일)
     *  검색종료일 - today
	FROMDATE=premonth + "-" + "01" + "-" + preyear;
	TODAY=month + "-" + date + "-" + year;
	ENDDATE=getEndDate(TODAY);
     */
    FROMDATE=premonth + "-" + predate + "-" + preyear;
    TODAY=month + "-" + date + "-" + year;
    formObj.s_post_strdt.value=FROMDATE;
    formObj.s_post_enddt.value=TODAY;
    
	//#483 [Binex LA] RiderPrint button on Payment Entry
	//var opt_key = "PAYMENT_RIDER_BTN";
	//ajaxSendPost(setRiderBtn, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}
function RestoreGrid(){
	doWork("SEARCHLIST");
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
             var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
             var headers = [ { Text:getLabel('ACC_JOR_0810_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);
             var cols = [ 
                          {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"magam_flag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Radio",  	 Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"check_flag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                          {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"grp_slip_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                          {Type:"Text",      Hidden:1,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"chk_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"bank_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"AutoSum",   Hidden:0,  Width:120,  Align:"Right",   ColMerge:1,   SaveName:"amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"clr_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:1,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"void_yn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"void_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:1,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"chk_pnt_yn",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:1,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"rider_yn",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"p_ofc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"rgst_usrid",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"vchr_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"vchr_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"CheckBox",  Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"aud_flg",   	 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y", FalseValue:"N" },
                          {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"aud_usr_id",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	                      {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"aud_dt",  		 KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"rcv_tp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:1,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"hbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:1,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"mbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:1,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"oth_ref_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"bank_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Status",    Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"trx_modi_tms",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }, 
                          {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"clr_yn",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }, 
                          {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"bloked_by",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }, 
                          {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"issued_by",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }, 
                          {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"block_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Text",      Hidden:1,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"jnr_tp",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"Date",      Hidden:1,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"org_post_dt",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                          {Type:"CheckBox",  Hidden:1,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"org_aud_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, TrueValue:"Y", FalseValue:"N" },
                          {Type:"Text",      Hidden:1,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"aud_usr_name",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0}
                          ];
             InitColumns(cols);
             SetEditable(1);
             //InitViewFormat(0, "post_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             //InitViewFormat(0, "clr_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             //InitViewFormat(0, "void_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
             SetSheetHeight(500);
             resizeSheet();
           }                                                      
           break;
           
         /*<!-- ############################################### COMMON MEMO 2-4 ##################################################### -->
         case 2:      //IBSheet1 init
      	   initMemo(sheetObj);                                              
         break;
         <!-- ############################################### COMMON MEMO 2-4 ##################################################### -->*/
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
	sheet1_OnClick(sheetObj, sheetObj.HeaderRows(), col);
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
/**
 * Sheet1의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
function sheet1_OnSelectMenu(sheetObj, MenuString){
	 var formObj=document.frm1;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// 사용자가 저장한 Header Setting을 삭제한다.
//		case "Header Setting Delete":
//			IBS_DelGridSetting(document.fName.user_id.value, getPageURL(), sheetObj);
//		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
} 
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	//sheetObj.HeadCheck(0, "check_flag") = false;
	 
	//칼럼의 글자 색 설정
	sheetObj.SetColFontColor("magam_flag","#FF0000");
    
    
	for(var i=1; i<=sheetObj.LastRow();i++){
		
		/*
	if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
			sheetObj.SetRowBackColor(i,"#EFEBEF");
			sheetObj.SetRowEditable(i,0);
		}else{
			sheetObj.SetRowBackColor(i,"#EFEBEF");
			if(i != sheetObj.LastRow()){
				sheetObj.SetCellBackColor(i, "check_flag","#FFFFFF");
				sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
				sheetObj.SetCellEditable(i, "check_flag",1);
				sheetObj.SetCellEditable(i, "post_dt",1);
			}
		}
		*/
		//마감이나 PAID됐을시 POST_DT를 수정불가하게 한다.
		if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"
			|| sheetObj.GetCellValue(i, "clr_yn") == "Y"
			|| sheetObj.GetCellValue(i, "void_yn") == "Y"){
			sheetObj.SetCellEditable(i, "post_dt",0);
			sheetObj.SetCellBackColor(i, "post_dt","#EFEBEF");
			//if(sheetObj.CellValue(i, "clt_cmpl_flg") == "Y"){
				//sheetObj.CellValue(i, "magam_flag") = "Y";
				//sheetObj.CellFontColor(i, "magam_flag") = "#FF0000";
			//}

		}else{
			sheetObj.SetCellEditable(i, "post_dt",1);
			sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
		}
	}
	sheetObj.SetSumText(0, 0,"");
	sheetObj.SetSumText(0, 2,"TOTAL");
	formObj.s_amt_fr.value=doMoneyFmt(formObj.s_amt_fr.value);
	formObj.s_amt_to.value=doMoneyFmt(formObj.s_amt_to.value);
	
	/*<!-- ############################################### COMMON MEMO 4-4 ##################################################### -->
	var intg_bl_seq = '';
	var palt_mnu_cd = '';
	var opr_no = '';
	
	if(sheetObj.GetTotalRows()>0){
		intg_bl_seq = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "jnr_no");
		palt_mnu_cd = 'PMT';
		opr_no = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "chk_no");
	}
	
	setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
	<!-- ############################################### COMMON MEMO 4-4 ##################################################### -->*/
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;

	 //칼럼의 글자 색 설정
	sheetObj.SetColFontColor("magam_flag","#FF0000");
	
	for(var i=1; i<=sheetObj.LastRow();i++){
		
		/*
	if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
			sheetObj.SetRowBackColor(i,"#EFEBEF");
			sheetObj.SetRowEditable(i,0);
		}else{
			sheetObj.SetRowBackColor(i,"#EFEBEF");
			if(i != sheetObj.LastRow()){
				sheetObj.SetCellBackColor(i, "check_flag","#FFFFFF");
				sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
				sheetObj.SetCellEditable(i, "check_flag",1);
				sheetObj.SetCellEditable(i, "post_dt",1);
			}
		}
		*/
		//마감이나 PAID됐을시 POST_DT를 수정불가하게 한다.
		if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"
			|| sheetObj.GetCellValue(i, "clr_yn") == "Y"
			|| sheetObj.GetCellValue(i, "void_yn") == "Y"){
			sheetObj.SetCellEditable(i, "post_dt",0);
			sheetObj.SetCellBackColor(i, "post_dt","#EFEBEF");
			//if(sheetObj.CellValue(i, "clt_cmpl_flg") == "Y"){
				//sheetObj.CellValue(i, "magam_flag") = "Y";
				//sheetObj.CellFontColor(i, "magam_flag") = "#FF0000";
			//}

		}else{
			sheetObj.SetCellEditable(i, "post_dt",1);
			sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
		}
	}
	sheetObj.SetSumText(0, 0,"");
	sheetObj.SetSumText(0, 2,"TOTAL");
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	// 체크 버튼 속도 개선위해 Onclick -> onChange로 변경 oyh
	/*
	switch (sheetObj.ColSaveName(Col)) {
		case "check_flag" :
			for(var i=1; i<=sheetObj.LastRow();i++){
				if(i == Row){
					if(sheetObj.GetCellValue(i, "check_flag") == "0"){
						sheetObj.SetCellValue(i, "check_flag","0");
					}else{
						sheetObj.SetCellValue(i, "check_flag","1");
					}
				}else{
//					if(i != sheetObj.LastRow()){
						sheetObj.SetCellValue(i, "check_flag","0");
//					}
				}
			}
		break;
	}*/
	/*
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(i == Row){
			sheetObj.SetRowBackColor(i,"#DFFFFF");
		}else{
if(sheetObj.GetCellValue(i, "clt_cmpl_flg") == "Y"){
				sheetObj.SetRowBackColor(i,"#EFEBEF");
			}else{
				sheetObj.SetRowBackColor(i,"#EFEBEF");
				if(i != sheetObj.LastRow()){
					sheetObj.SetCellBackColor(i, "check_flag","#FFFFFF");
					sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
				}
			}
		}
	}
	*/
	//printBtn01.style.display="inline";
	//getBtnObj('btnPrint').style.display="inline";
	
	//#633 [Binex] riderprint does not work corrctly
	/*
	if(setRiderBtnChk){
		getBtnObj('riderprintBtn02').style.display="inline";
		formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
		formObj.rider_yn.value="Y";
	}else{
		if(sheetObj.GetCellValue(Row, "rider_yn") == "Y"){
			getBtnObj('riderprintBtn02').style.display="inline";
			formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
			formObj.rider_yn.value="Y";
		}else{
			getBtnObj('riderprintBtn02').style.display="none";
			formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
			formObj.rider_yn.value="N";
		}
	}
	*/
	
	/*if(setRiderBtnChk){
//		formObj.rider_yn.value="Y";
		if(sheetObj.GetCellValue(Row, "rider_yn") == "Y"){
			getBtnObj('riderprintBtn02').style.display="inline";
			formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
			formObj.rider_yn.value="Y";
		}else{    				
			getBtnObj('riderprintBtn02').style.display="none";
			formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
			formObj.rider_yn.value="N";
		}
		
	}else{
		if(sheetObj.GetCellValue(Row, "rider_yn") == "Y"){
			getBtnObj('riderprintBtn02').style.display="inline";
			formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
			formObj.rider_yn.value="Y";
		}else{
			getBtnObj('riderprintBtn02').style.display="none";
			formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
			formObj.rider_yn.value="N";
		}
	}*/
	
	
	
	/*<!-- ############################################### COMMON MEMO 3-4 ##################################################### -->
	var intg_bl_seq =  sheetObj.GetCellValue(Row, "jnr_no");
	var palt_mnu_cd = 'PMT';
	var opr_no = sheetObj.GetCellValue(Row, "chk_no");
	setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
	doWorkMemo("SEARCHMEMO");
	<!-- ############################################### COMMON MEMO 3-4 ##################################################### -->*/
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	if(sheetObj.ColSaveName(Col) != "post_dt" && sheetObj.ColSaveName(Col) != "check_flag"){
		var paramStr="./ACC_JOR_0800.clt?f_cmd=-1&s_grp_slip_no="+sheetObj.GetCellValue(Row, "grp_slip_no");
	    parent.mkNewFrame('Payment', paramStr,"ACC_JOR_0800_SHEET_" + sheetObj.GetCellValue(Row, "grp_slip_no"));
	}
}
function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {
		case "post_dt" :
			var v_post_dt=sheetObj.GetCellValue(Row, "post_dt");
			var v_org_post_dt=sheetObj.CellSearchValue(Row, "post_dt");

			//2016.04.18 C.W.Park Added
			//#52109 office별 block_date 확인
			v_org_post_dt=v_org_post_dt.substr(4, 2) + '-' + v_org_post_dt.substr(6, 2) + '-' + v_org_post_dt.substr(0, 4);
			
			if(!chkBranchBlockDate(sheetObj.GetCellValue(Row, "p_ofc_cd"), v_post_dt)){
				sheetObj.SetCellText(Row, "post_dt",v_org_post_dt);
				sheetObj.SetCellValue(Row, "check_flag","0");
				sheetObj.SelectCell(Row, "post_dt");
			   return;
			}else{
				sheetObj.SetCellValue(Row, "check_flag","1");
			}
			break;
		case "check_flag" :
			// 체크 버튼 속도 개선 oyh
			if(beforeChkNo != 0) {
				if (beforeChkNo == Row) {
					if(sheetObj.GetCellValue(Row, "check_flag") == "0") {
						sheetObj.SetCellValue(Row, "check_flag","0",0);
					} else {
						sheetObj.SetCellValue(Row, "check_flag","1",0);
					}
				} else {
					sheetObj.SetCellValue(beforeChkNo, "check_flag","0",0);
				}
			}
    		beforeChkNo=Row;
			
    		/*
			if(sheetObj.CellValue(Row, "clt_cmpl_flg") == "Y"|| sheetObj.CellValue(Row, "clr_yn") == "Y" || sheetObj.CellValue(Row, "chk_pnt_yn") == "Y"){
    			getBtnObj('btnModify').style.display="none";
    			getBtnObj('btnDelete').style.display="none";
    		}else{
    			if(formObj.f_attr3.value == "Y"){
    				getBtnObj('btnModify').style.display="inline";
    			}
    			if(formObj.f_attr4.value == "Y"){
    				getBtnObj('btnDelete').style.display="inline";
    			}
    		}
    		*/
			//#633 [Binex] riderprint does not work corrctly
    		/*if(setRiderBtnChk){
//    			formObj.rider_yn.value="Y";
    			if(sheetObj.GetCellValue(Row, "rider_yn") == "Y"){
    				getBtnObj('riderprintBtn02').style.display="inline";
    				formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
    				formObj.rider_yn.value="Y";
    			}else{    				
    				getBtnObj('riderprintBtn02').style.display="none";
    				formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
    				formObj.rider_yn.value="N";
    			}
    			
    		}else{
    			if(sheetObj.GetCellValue(Row, "rider_yn") == "Y"){
    				getBtnObj('riderprintBtn02').style.display="inline";
    				formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
    				formObj.rider_yn.value="Y";
    			}else{
    				getBtnObj('riderprintBtn02').style.display="none";
    				formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
    				formObj.rider_yn.value="N";
    			}
    		}*/
    		
//			//RIDER PRINT 체크
//			if(sheetObj.GetCellValue(Row, "rider_yn") == "Y"){
//				getBtnObj('riderprintBtn02').style.display="inline";
//				formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
//				formObj.rider_yn.value="Y";
//			}else{
//				//#483 [Binex LA] RiderPrint button on Payment Entry
//				if(!setRiderBtnChk){
//					getBtnObj('riderprintBtn02').style.display="none";
//					formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
//					formObj.rider_yn.value="N";
//				}
//			}
    		
    	break;
		case "aud_flg" :
			for(var i=1; i<=sheetObj.LastRow(); i++){
				if(i != Row){
					if(sheetObj.GetCellValue(Row, "grp_slip_no") == sheetObj.GetCellValue(i, "grp_slip_no")){
						sheetObj.SetCellValue(i, "aud_flg", sheetObj.GetCellValue(Row, "aud_flg"));
					}
				}
			}
		break;	
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	    	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.s_post_strdt, formObj.s_post_enddt,  'MM-dd-yyyy');
	    break;
        case 'DATE2':    //달력 조회 팝업 호출      
        	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.s_deposit_strdt, formObj.s_deposit_enddt,  'MM-dd-yyyy');
        break;
        case 'DATE3':    //달력 조회 팝업 호출    
        	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.s_void_strdt, formObj.s_void_enddt, 'MM-dd-yyyy');
	    break;
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
	formObj.s_post_strdt.value=FROMDATE;
	formObj.s_post_enddt.value=TODAY;
	
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.s_ofc_cd);
	
	formObj.s_bank_cd[0].selected=true;
	formObj.s_void_yn[0].selected=true;
	//sheetObj.RemoveAll();
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
				if(CODETYPE=="BILLTO"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				s_type="trdpCode";
				if(CODETYPE=="BILLTO"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}else{
		formObj.s_rcv_from_cd.value="";//trdp_cd  AS param1
		formObj.s_rcv_from_nm.value="";//eng_nm   AS param2
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
			if(CODETYPE =="BILLTO"){
				formObj.s_rcv_from_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.s_rcv_from_nm.value=masterVals[3];		//eng_nm   AS param2
			}
		}else{
			if(CODETYPE =="BILLTO"){
				formObj.s_rcv_from_cd.value="";//trdp_cd  AS param1
				formObj.s_rcv_from_nm.value="";//eng_nm   AS param2
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
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
    	   mm="0"+mm;
       }
       boundDay=mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm;
          }
          boundDay=mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm="0"+mm;
          }
          boundDay=mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}
function setAmount(){
	var formObj=document.frm1;
	formObj.s_amt_to.value=formObj.s_amt_fr.value;
}
function entSearch(){
	if(event.keyCode == 13){
		doWork('SEARCHLIST');
	}
}
function formValidation(){
	if(!chkSearchCmprPrd(false, frm1.s_post_strdt, frm1.s_post_enddt)){
		return false;
	}else if(!chkSearchCmprPrd(false, frm1.s_deposit_strdt, frm1.s_deposit_enddt)){
		return false;
	}else if(!chkSearchCmprAmt(false, frm1.s_amt_fr, frm1.s_amt_to)){
		return false;
	}
	return true;
}
//Calendar flag value
var firCalFlag=false;
var firAmtFlag=false;

var ORG_BLOCK_DT=""; 		//MAX(BLOCK_DT)
var NEXT_BLOCK_DT="";    		//MAX(BLOCK_DT)+1
//2016.04.18 C.W.Park Added
//#52109 office별 block_date 확인
function chkBranchBlockDate(param, branchPostDt){
	
	var formObj=document.frm1;
	var chkBlckDate = true;
	//#52109 office별 block_date 확인
	//MAX(JNR_DT) +1, MAX(BLOCK_DT)+1 중 큰 Date Next Block date 에 Set
	
	ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt&searchOfcCd=' + param, './GateServlet.gsl');
	branchPostDt = branchPostDt.substring(4,6) + "-" + branchPostDt.substring(6,8) + "-" + branchPostDt.substring(0,4);
	
	//Post Date 가 변경되는 경우에 NEXT_BLOCK_DT 보다 작으면 warnning massage 띄워줌
	if(NEXT_BLOCK_DT != "") {
		var nextBlockDtYMD=NEXT_BLOCK_DT.replaceAll("-", "");															//NEXT_BLOCK_DT  12-01-2013
			nextBlockDtYMD=nextBlockDtYMD.substring(4,8)+nextBlockDtYMD.substring(0,2)+nextBlockDtYMD.substring(2,4);	//nextBlockDtYMD 20131201
		var orgBlockDt=addDate('d', -1, nextBlockDtYMD, "");			
			ORG_BLOCK_DT=orgBlockDt.substring(4,6) + "-" + orgBlockDt.substring(6,8) + "-" + orgBlockDt.substring(0,4);
		if(compareTwoDate(NEXT_BLOCK_DT, branchPostDt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
			alert(getLabel2('ACC_MSG119',new Array(ORG_BLOCK_DT)));	//The Post Date must be later than the block date (@)";
			chkBlckDate = false;
		}
	}
	return chkBlckDate;
}
function getMaxBlockOrJnrNextDt(reqVal){
 	var doc=getAjaxMsgXML(reqVal);
 	if(doc[0]=='OK'){
 		if(typeof(doc[1])!='undefined'){
 			NEXT_BLOCK_DT=doc[1].substring(4,6) + "-" + doc[1].substring(6,8) + "-" + doc[1].substring(0,4);
 		}else{
			NEXT_BLOCK_DT="";
		}
 	}
}

function getJnrVoidInfo(reqVal){
	jnrVoidflag = '';
	var doc = getAjaxMsgXML(reqVal);
//		alert(doc);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			jnrVoidflag = doc[1];
		}
	}
}

function CUSTOMER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if(rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry = rtnVal.split("|");
		formObj.s_rcv_from_cd.value = rtnValAry[0];//full_nm
		formObj.s_rcv_from_nm.value = rtnValAry[2];//full_nm
	}               
}

//GL View Table Data Create LKH 2015.02.25 Start
function setGlDataCreate(arg){
	//if(confirm(getLabel('FMS_COM_CFMCRE'))){
		var formObj=document.frm1;
		doShowProcess();		
		var type_clss_cd = 'GL_DATA_CREATE';
		ajaxSendPostAsync(rtnAjaxFunction, 'reqVal', '&goWhere=aj&bcKey=setGlDataCreate&f_usrId='+formObj.user_id.value+'&f_type_clss_cd='+type_clss_cd, './GateServlet.gsl');
	//}
} 	

function rtnAjaxFunction(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		//getGlDataCreateDate()
		doHideProcess();
		//alert(getLabel('FMS_COM_NTYCOM'));		
	}else{
		doHideProcess();
		alert(getLabel('FMS_COM_ALT019'));
	}
	G_GL_DATA_CREATE_STATUS ="END";
	doWork('GL_CREATE_END_ACTION');
}

function ajaxSendPostAsync(callback, param, data, url){
	sendRequest(callback, param, data, 'POST', url, true);
}


//개인정보 관리화면 정렬순서 2016.03 
/*function setOrderByInfo(reqVal) {
	
	var formObj = document.frm1;
	var doc = getAjaxMsgXML(reqVal);
	var orderByInfo = "";
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) == "undefined") {
			orderByInfo = "";
		} else {
			orderByInfo = doc[1];
		}
	}
	formObj.f_orderByInfo.value = orderByInfo; 
}*/


//52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정
function chkJnrModiTms(){
	var returnVal=true;
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sRow=sheetObj.FindCheckedRow("check_flag");
 	var f_jnr_no = sheetObj.GetCellValue(sRow, "jnr_no");
 	
 	 
	ajaxSendPost(getJnrModiTms, 'reqVal', '&goWhere=aj&bcKey=searchJnrModiTms&jnr_no='+f_jnr_no, './GateServlet.gsl');
	//alert(vJnrModiTms + " "+sheetObj.GetCellValue(sRow, "trx_modi_tms"));
	if (vJnrModiTms != sheetObj.GetCellValue(sRow, "trx_modi_tms")) {
		returnVal=false;
	}
 	 
 	if(!returnVal){
 		// Check 이 변경된 경우
		alert(getLabel('ACC_MSG147')); 
 	}
	return returnVal;
}

function getJnrModiTms(reqVal){
	vJnrModiTms='';
	var doc=getAjaxMsgXML(reqVal);
	// alert(doc);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			vJnrModiTms=doc[1];
		}
	}
}
	
//#483 [Binex LA] RiderPrint button on Payment Entry
/*var setRiderBtnChk = false;

function setRiderBtn(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if(doc[1] == "Y"){
			setRiderBtnChk = true;
			getBtnObj('riderprintBtn02').style.display = "inline";
		}
	}
}*/



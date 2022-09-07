/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_JOR_0040.js
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
//#6734 [Zencon] POST DATE CHANGE BLOCK ROLE OPTION (Zen#3023)
var pst_dt_flg;

//#4800 [Binex] When copying from Payment List, new Payment Entry to open each time
var copySeq = 0;

function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    //#6734 [Zencon] POST DATE CHANGE BLOCK ROLE OPTION (Zen#3023)
    if(formObj.pst_dt_flg.value == "Y" || formObj.pst_dt_flg.value == "N" )
    	{
    	pst_dt_flg= formObj.pst_dt_flg.value;
    	}
    switch(srcName) {
	   case "DEFAULT":
	   break;
	   case "NEW":
			var paramStr="./ACC_JOR_0030.clt?f_cmd=-1";
		    parent.mkNewFrame('Payment', paramStr);     
	   break;     
       case "SEARCHLIST":
    	   if(!formValidation()) return;
    	   //sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
            formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
            sheetObj2.RemoveAll();
            
			var dateValidFlag = true;

			// #5183 [BINEX] AFTER V470.06 RELEASE, CANT SEARCH W FILING # & ETD TOGETHER
			var tmpStrDt = '';
			var tmpEndDt = '';

			if("Y" == initDatLod){
				/* 날짜 지우고 조건없이 검색 시 전체 검색되기 위해서 주석 처리 (20180103)
				 * if(loadSearchFlag 
						&& "" == formObj.s_deposit_strdt.value
						&& "" == formObj.s_deposit_enddt.value
						&& "" == formObj.s_hbl_no.value
						&& "" == formObj.s_mbl_no.value
						&& "" == formObj.s_chk_no.value
						){
					if("" == formObj.s_post_strdt.value && "" == formObj.s_post_enddt.value){
					formObj.s_post_strdt.value = dtFm;
					formObj.s_post_enddt.value = dtTo;
					}
				}else*/ 
				if("" != formObj.s_deposit_strdt.value 
						|| "" != formObj.s_deposit_enddt.value 
						|| "" != formObj.s_hbl_no.value 
						|| "" != formObj.s_mbl_no.value
						|| "" != formObj.s_chk_no.value) {

					// #5183 [BINEX] AFTER V470.06 RELEASE, CANT SEARCH W FILING # & ETD TOGETHER
					//tmpStrDt = formObj.s_post_strdt.value;
					//tmpEndDt = formObj.s_post_enddt.value;

					//formObj.s_post_strdt.value = "";
					//formObj.s_post_enddt.value = "";
					//dateValidFlag = false;
				}
				if(dateValidFlag){
   					if(chkCmprPrdSc(formObj.s_post_strdt, formObj.s_post_enddt)){
   			            docObjects[0].DoSearch("./ACC_JOR_0040GS.clt", FormQueryString(formObj) );
   			            //Log Monitor Start
   				   		gLogMonitor();
   				 		//Log Monitor End
   					}
				}else{
		            docObjects[0].DoSearch("./ACC_JOR_0040GS.clt", FormQueryString(formObj) );

		            // #5183 [BINEX] AFTER V470.06 RELEASE, CANT SEARCH W FILING # & ETD TOGETHER
		            //formObj.s_post_strdt.value = tmpStrDt;
		            //formObj.s_post_enddt.value = tmpEndDt;

		            //Log Monitor Start
			   		gLogMonitor();
			 		//Log Monitor End
				}
			}
			loadSearchFlag = true;
			initDatLod = "Y";
       break;
       case "ROWADD":
    	   	var intRows=sheetObj.LastRow() + 1;
            sheetObj.DataInsert(intRows);
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
		   
		   if(sRow == 0){
			   //No Save Data!!
			   alert(getLabel('FMS_COM_ALT004'));
			   return;
		   }
		   
//		   var chk_row=arrRow[0];
		   var chk_row=sRow;
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
			
           if(confirm(getLabel('FMS_COM_CFMSAV'))){
        	   sheetObj.DoSave("ACC_JOR_0040GS.clt", FormQueryString(formObj),"ibflag",false);
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
        	   sheetObj.DoSave("ACC_JOR_0040GS.clt", FormQueryString(formObj),"ibflag",false);
           }
       break;
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
//	   		rtnary[1]=formObj.s_vendor_nm.value;
//	   		rtnary[2]=window;
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
     	break;
       case "CUSTOMER_NAME":
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_vendor_nm.value;
	   		rtnary[2]=window;
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	break;
        case "GOLOCAL":	//LOCAL INVOICE 화면호출
            var paramStr="./ACC_INV_0010.clt?f_cmd=-1&f_intg_bl_seq="+frm1.f_intg_bl_seq.value;
            parent.mkNewFrame('A/R Entry', paramStr);
        break;
        case "GOCRDB":	//CR/DB Note 화면호출
            var paramStr="./ACC_INV_0020.clt?f_cmd=-1&f_intg_bl_seq="+frm1.f_intg_bl_seq.value;
            parent.mkNewFrame('DC Note Entry', paramStr);
        break;
        case "GOAP":	//Account Payable 화면호출
            var paramStr="./ACC_INV_0030.clt?f_cmd=-1&f_intg_bl_seq="+frm1.f_intg_bl_seq.value;
            parent.mkNewFrame('A/P Entry(Cost)', paramStr);
        break;
        case "PRINT":
	       	if(formObj.f_jnr_no.value == ""){
//	       		alert("No Print Data! ");
	       		alert(getLabel('FMS_COM_ALT004'));
	       		return;
	       	}
	       	var bankSeq=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "bank_seq");
	       	ajaxSendPost(getBankChkForm, 'reqVal', '&goWhere=aj&bcKey=searchBankChkForm&bank_seq='+bankSeq, './GateServlet.gsl');
	       	if(formObj.f_chk_form.value !=  ""){
				formObj.file_name.value='check_journal_01_' + formObj.f_chk_form.value + '.mrd';
			}else{
				formObj.file_name.value='check_journal_01.mrd';
			}
			formObj.title.value='Check Print';
			var param='[' + formObj.f_jnr_no.value + ']';				// [1]
			param	  += '[' + formObj.rider_yn.value + ']';				// [2]
			param	  += '[]';												// [3]
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0020.clt', 'popTest', 1025, 740);
      break;
      case "RIDERPRINT":
	       	if(formObj.f_jnr_no.value == ""){
//	       		alert("No Print Data! ");
	       		alert(getLabel('FMS_COM_ALT004'));
	       		return;
	       	}
	       	formObj.file_name.value='check_journal_02.mrd';
			formObj.title.value='Check Print';
			var param='[' + formObj.f_jnr_no.value + ']';				// [1]
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0020.clt', 'popTest', 1025, 740);
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
				reqParam += '&jnr_tp=' +"C";
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
      	var jnr_no=sheetObj.GetCellValue(sRow, "jnr_no");
      	var source="";
      	var srcNo=sheetObj.GetCellValue(sRow, "chk_no");
      	var refNo=sheetObj.GetCellValue(sRow, "ref_no");
      	var blNo=sheetObj.GetCellValue(sRow, "hbl_no");
      	
        //#964 [SHINE] Account Slip 기능 보완 - 전체 Accounting 기능
      	var bloked_by	= sheetObj.GetCellValue(sheetObj.GetSelectRow(), "bloked_by");
		var issued_by	= sheetObj.GetCellValue(sheetObj.GetSelectRow(), "issued_by");
		var block_dt	= sheetObj.GetCellValue(sheetObj.GetSelectRow(), "block_dt");
		
  		source="Check Journal";
  		formObj.file_name.value='account_slip_06.mrd';
		//Parameter Setting
      	var param="[" + "'" + jnr_no + "'" + ']';					// [1]
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
		
		formObj.rd_param.value=param;
		popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	break;
      case 'MESSENGER_SLIP':
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
	       	if(formObj.f_jnr_no.value == ""){
//	       		alert("No Print Data! ");
	       		alert(getLabel('FMS_COM_ALT004'));
	       		return;
	       	}
			formObj.file_name.value='messenger_slip.mrd';
			formObj.title.value='Messenger Slip';
			var param='[' + formObj.f_jnr_no.value + ']';				// [1]
				param += '[' + formObj.ofc_cd.value + ']';					// [2]
			formObj.rd_param.value=param;
			
			//51484 [BNX] ACCOUNTING REPORTS (MESSENGER SLIP) EMAIL로 SEND OUT 가능하게
			popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
  	break;
  	
    //#2374 [LBS] Deposit/Payment List 에 Excel (All) 버튼 추가  
		case "EXCEL_ALL":
			excelDown(sheetObj);
		break;	  	
		
		//#1155 [CARGOZONE] Deposit and Payment Copy from List screens
		case "COPY":
			var formObj=document.frm1;
			var sheetObj=docObjects[0];
			var chk_cnt=0;
			if(sheetObj.RowCount()< 1){
				//Please Retrieve first!;
		    	alert(getLabel('FMS_COM_ALT004'));		
				return false;
			}
		    var sRow=sheetObj.FindCheckedRow("check_flag");
		    if(sRow == 0){
			   //No Delete Data!!
			   alert(getLabel('FMS_COM_ALT004'));
			   return false;
		    }			
			
		    // #4800 [Binex] When copying from Payment List, new Payment Entry to open each time
		    copySeq ++;
			
			var paramStr="./ACC_JOR_0030.clt?f_cmd=-1&s_jnr_no="+sheetObj.GetCellValue(sRow, "jnr_no")+"&list_copy_flag=Y"+"&copySeq="+copySeq;
		    parent.mkNewFrame('Payment', paramStr,"ACC_JOR_0030_SHEET_COPY_" + sheetObj.GetCellValue(sRow, "jnr_no"));		    
			break;	 
			
			//#1106 [UFF] PAYMENT CHECK BATCH PRINT
		case "BATCH_PRINT":
			rtnary=new Array(2);
			rtnary[0]="L1";
			rtnary[1]=formObj.s_post_strdt.value;  //3345 #1106 개선사항
	   		rtnary[2]=formObj.s_post_enddt.value;  //3345 #1106 개선사항 
  	        
  	        callBackFunc = "";
  	        modal_center_open('./ACC_JOR_0043.clt', rtnary, 400,300,"yes");   //#3345 #1106 개선사항
  	      break;
  	      
    }// end switch
	
	//Log Monitor Start:Btn
	if(srcName!="SEARCHLIST") gLogMonitorBtnClick(srcName);
	//Log Monitor End:Btn
	
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
    
    setCondition("", "", formObj.s_post_strdt, formObj.s_post_enddt);
    
    //	개인정보 관리화면 정렬순서 2016.03 
	ajaxSendPost(setOrderByInfo, 'reqVal','&goWhere=aj&bcKey=searchTbUserOrderbyInfoAttr&pgm_usr_id='+formObj.user_id.value+'&pgm_url=./ACC_JOR_0040.clt',	'./GateServlet.gsl');
    
    
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
//    var now=new Date();
//    var preDt=new Date(Date.parse(now) - 90 * 1000 * 60 * 60 * 24);
//    var year=now.getFullYear(); 			
//    var month=now.getMonth() + 1;
//    var date=now.getDate(); 	
//    var preyear=preDt.getFullYear();
//    var premonth=preDt.getMonth() + 1;
//    var predate=preDt.getDate();
//    if(month < 10){
//    	month="0"+(month);
//    }
//    if(date < 10){
//    	date="0"+date;
//    }
//    if(premonth < 10){
//    	premonth="0"+(premonth);
//    }
//    if(predate < 10){
//    	predate="0"+predate;
//    }
//    /* 2013.10.04 변경 
//     *  검색시작일 - today - 3달전 (90일)
//     *  검색종료일 - today
//	FROMDATE=premonth + "-" + "01" + "-" + preyear;
//	TODAY=month + "-" + date + "-" + year;
//	ENDDATE=getEndDate(TODAY);
//     */
//    FROMDATE=premonth + "-" + predate + "-" + preyear;
//    TODAY=month + "-" + date + "-" + year;
//    formObj.s_post_strdt.value=FROMDATE;
//    formObj.s_post_enddt.value=TODAY;
    
	//#483 [Binex LA] RiderPrint button on Payment Entry
	var opt_key = "PAYMENT_RIDER_BTN";
	ajaxSendPost(setRiderBtn, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
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
             var headers = [ { Text:getLabel('ACC_JOR_0040_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);
             var cols = [ {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Radio",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"check_flag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"chk_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:1,   SaveName:"bank_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"AutoSum",   Hidden:0, Width:90,    Align:"Right",   ColMerge:1,   SaveName:"amt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:75,   Align:"Center",  ColMerge:1,   SaveName:"clr_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"void_yn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"void_dt",       KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"p_ofc_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"chk_pnt_yn",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"rider_yn",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"rgst_usrid",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"hbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1, SaveName:"mbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1, SaveName:"oth_ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",   ColMerge:1,   SaveName:"rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    //#6486 [Zencon] Upload email  (Zen#2608)
                    {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"file_exists",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }, 
                    {Type:"Text",      Hidden:1, Width:30,    Align:"Center",  ColMerge:1,   SaveName:"jnr_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,    Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,    Align:"Center",  ColMerge:1,   SaveName:"ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,    Align:"Center",  ColMerge:1,   SaveName:"clt_cmpl_flg2",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,    Align:"Center",  ColMerge:1,   SaveName:"bank_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Status",    Hidden:1, Width:30,    Align:"Center",  ColMerge:1,   SaveName:"ibflag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:30,    Align:"Center",  ColMerge:1,   SaveName:"trx_modi_tms",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }, 
             		{Type:"Text",      Hidden:1, Width:30,    Align:"Center",  ColMerge:1,   SaveName:"clr_yn",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }, 
             		{Type:"Text",      Hidden:1, Width:30,    Align:"Center",  ColMerge:1,   SaveName:"bloked_by",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }, 
             		{Type:"Text",      Hidden:1, Width:30,    Align:"Center",  ColMerge:1,   SaveName:"issued_by",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }, 
             		{Type:"Text",      Hidden:1, Width:30,    Align:"Center",  ColMerge:1,   SaveName:"block_dt",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                	 //<!-- #2341 [LBS] Deposit/Payment List 속도 개선을 위한 paging 처리 -->
                	{Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 }             		
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
           
         <!-- ############################################### COMMON MEMO 2-4 ##################################################### -->
         case 2:      //IBSheet1 init
      	   initMemo(sheetObj);                                              
         break;
         <!-- ############################################### COMMON MEMO 2-4 ##################################################### -->
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
	sheetObj.SetColFontColor("clt_cmpl_flg","#FF0000");
    
    
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
			|| sheetObj.GetCellValue(i, "void_yn") == "Y"
			|| (sheetObj.GetCellValue(i, "chk_pnt_yn") == "Y" && formObj.prn_flg.value != 'Y')){
			sheetObj.SetCellEditable(i, "post_dt",0);
			sheetObj.SetCellBackColor(i, "post_dt","#EFEBEF");
			//if(sheetObj.CellValue(i, "clt_cmpl_flg") == "Y"){
				//sheetObj.CellValue(i, "magam_flag") = "Y";
				//sheetObj.CellFontColor(i, "magam_flag") = "#FF0000";
			//}

		}else{
			//#6734 [Zencon] POST DATE CHANGE BLOCK ROLE OPTION (Zen#3023)
			if(pst_dt_flg=="Y")
			{
			sheetObj.SetCellEditable(i, "post_dt",0);
			}
			else 
			{
				sheetObj.SetCellEditable(i, "post_dt",1);
			}
			sheetObj.SetCellBackColor(i, "post_dt","#FFFFFF");
		}
	}
	sheetObj.SetSumText(0, 0,"");
	sheetObj.SetSumText(0, 2,"TOTAL");
	formObj.s_amt_fr.value=doMoneyFmt(formObj.s_amt_fr.value);
	formObj.s_amt_to.value=doMoneyFmt(formObj.s_amt_to.value);
	
	//#2341 [LBS] Deposit/Payment List 속도 개선을 위한 paging 처리
	doDispPaging(sheetObj.GetCellValue(1, "Indexing"), getObj('pagingTb'));
	
	<!-- ############################################### COMMON MEMO 4-4 ##################################################### -->
	var intg_bl_seq = '';
	var palt_mnu_cd = '';
	var opr_no = '';
	
	if(sheetObj.GetTotalRows()>0){
		intg_bl_seq = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "jnr_no");
		palt_mnu_cd = 'PMT';
		opr_no = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "chk_no");
	}
	
	setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
	<!-- ############################################### COMMON MEMO 4-4 ##################################################### -->
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
			|| sheetObj.GetCellValue(i, "void_yn") == "Y"
			|| (sheetObj.GetCellValue(i, "chk_pnt_yn") == "Y" && formObj.prn_flg.value != 'Y')){
			sheetObj.SetCellEditable(i, "post_dt",0);
			sheetObj.SetCellBackColor(i, "post_dt","#EFEBEF");
			//if(sheetObj.CellValue(i, "clt_cmpl_flg") == "Y"){
				//sheetObj.CellValue(i, "magam_flag") = "Y";
				//sheetObj.CellFontColor(i, "magam_flag") = "#FF0000";
			//}

		}else{
			//#6734 [Zencon] POST DATE CHANGE BLOCK ROLE OPTION (Zen#3023)
			if(pst_dt_flg=="Y")
			{
			sheetObj.SetCellEditable(i, "post_dt",0);
			}
			else 
			{
				sheetObj.SetCellEditable(i, "post_dt",1);
			}
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
//	getBtnObj('btnPrint').style.display="inline";
	
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
	
	if(setRiderBtnChk){
//		formObj.rider_yn.value="Y";
		if(sheetObj.GetCellValue(Row, "rider_yn") == "Y"){
//			getBtnObj('riderprintBtn02').style.display="inline";
			formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
			formObj.rider_yn.value="Y";
		}else{    				
//			getBtnObj('riderprintBtn02').style.display="none";
			formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
			formObj.rider_yn.value="N";
		}
		
	}else{
		if(sheetObj.GetCellValue(Row, "rider_yn") == "Y"){
			getBtnObj('riderprintBtn02').style.display="inline";
			formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
			formObj.rider_yn.value="Y";
		}else{
			//#2854 [ACL POLAND]Payment List 라디오 선택 점검
			if ( document.getElementById("riderprintBtn02")  != null ) {
				getBtnObj('riderprintBtn02').style.display="none";
			}
			formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
			formObj.rider_yn.value="N";
		}
	}
	
	if(sheetObj.ColSaveName(Col) == "chk_no" || Col==-2){
		var intg_bl_seq =  sheetObj.GetCellValue(Row, "jnr_no");
		var palt_mnu_cd = 'PMT';
		var opr_no = sheetObj.GetCellValue(Row, "chk_no");
		setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
		doWorkMemo("SEARCHMEMO");
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	if(sheetObj.ColSaveName(Col) != "post_dt" && sheetObj.ColSaveName(Col) != "check_flag"){
		var paramStr="./ACC_JOR_0030.clt?f_cmd=-1&s_jnr_no="+sheetObj.GetCellValue(Row, "jnr_no");
	    parent.mkNewFrame('Payment', paramStr,"ACC_JOR_0030_SHEET_" + sheetObj.GetCellValue(Row, "jnr_no"));
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
    		if(setRiderBtnChk){
//    			formObj.rider_yn.value="Y";
    			if(sheetObj.GetCellValue(Row, "rider_yn") == "Y"){
//    				getBtnObj('riderprintBtn02').style.display="inline";
    				formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
    				formObj.rider_yn.value="Y";
    			}else{    				
//    				getBtnObj('riderprintBtn02').style.display="none";
    				formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
    				formObj.rider_yn.value="N";
    			}
    			
    		}else{
    			if(sheetObj.GetCellValue(Row, "rider_yn") == "Y"){
    				getBtnObj('riderprintBtn02').style.display="inline";
    				formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
    				formObj.rider_yn.value="Y";
    			}else{
    				//#2854 [ACL POLAND]Payment List 라디오 선택 점검
    				if ( document.getElementById("riderprintBtn02")  != null ) {
    					getBtnObj('riderprintBtn02').style.display="none";
    				}
    				formObj.f_jnr_no.value=sheetObj.GetCellValue(Row, "jnr_no");
    				formObj.rider_yn.value="N";
    			}
    		}
    		
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
function searchBlCmmInfo(){
	var formObj=document.frm1;
	if(formObj.s_hbl_no.value != "" || formObj.s_mbl_no.value != ""){
		ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+formObj.s_bl_no.value, './GateServlet.gsl');
	}
}
function enterBlCmmInfo(){
	var formObj=document.frm1;
	if(event.keyCode == 13){
		ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+formObj.s_bl_no.value, './GateServlet.gsl');
	}
}
function enterInvInfo(){
	var formObj=document.frm1;
	if(formObj.s_inv_no.value != ""){
		if(event.keyCode == 13){
			ajaxSendPost(getInvInfo, 'reqVal', '&goWhere=aj&bcKey=getInvInfo&s_inv_no='+formObj.s_inv_no.value, './GateServlet.gsl');
		}
	}
}
/**
 * AJAX RETURN
 * BL_INFO를 가져온다.
 */
function getBlCmmInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				if(rtnArr[2] == "H"){
					frm1.s_hbl_no.value=rtnArr[1];
				}else if(rtnArr[2] == "M"){
					frm1.s_mbl_no.value=rtnArr[1];
				}
				frm1.f_intg_bl_seq.value=rtnArr[0];
				frm1.f_biz_clss_cd.value=rtnArr[2];
				frm1.f_air_sea_clss_cd.value=rtnArr[3];
				frm1.f_bnd_clss_cd.value=rtnArr[4];
				doWork("DEFAULT");
			}else{
				frm1.f_intg_bl_seq.value="";
				frm1.s_hbl_no.value="";
				frm1.s_mbl_no.value="";
				frm1.f_biz_clss_cd.value="";
				frm1.f_air_sea_clss_cd.value="";
				frm1.f_bnd_clss_cd.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
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
				frm1.s_inv_seq.value=rtnArr[0];
				frm1.s_inv_no.value=rtnArr[1];
				doWork("DEFAULT");
			}else{
				frm1.s_inv_seq.value="";
				frm1.s_inv_no.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
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
	/* [Forwarding v4 - Test][Payment List] Clear function does not reset search conditions to default value.
	formObj.s_post_strdt.value=FROMDATE;
	formObj.s_post_enddt.value=TODAY;
	*/
	
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.s_ofc_cd);
	//#6742 [BNX] Bank Defualt set when click CLEAR button
	setSelection();
	//formObj.s_bank_cd[2].selected=true;  //formObj.s_bank_cd[2].value="PAYMENT BANK"  => Default value;
	formObj.s_void_yn[0].selected=true;
	formObj.s_print_yn[0].selected=true;
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
		formObj.s_vendor_cd.value="";//trdp_cd  AS param1
		formObj.s_vendor_nm.value="";//eng_nm   AS param2
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
				formObj.s_vendor_cd.value=masterVals[0];	//trdp_cd  AS param1
				//#3488 Accounting Multi Language 적용
				if(MULTI_LANGUAGE == 'Y'){
					formObj.s_vendor_nm.value=masterVals[16];		//eng_nm   AS param2
				}else {
					formObj.s_vendor_nm.value=masterVals[3];		//eng_nm   AS param2
				}				
			}
		}else{
			if(CODETYPE =="BILLTO"){
				formObj.s_vendor_cd.value="";//trdp_cd  AS param1
				formObj.s_vendor_nm.value="";//eng_nm   AS param2
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
function custEnterAction(obj, type){
	var formObj=document.frm1;
	if (event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}else if(type == "CUSTOMER2"){
			doWork("CUSTOMER_POPLIST2");
		}else if(type == "CUSTOMER_NAME"){
			doWork("CUSTOMER_NAME");
		}
	}
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
function getBankChkForm(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			formObj.f_chk_form.value=doc[1];
		}else{
			formObj.f_chk_form.value="";
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
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
		formObj.s_vendor_cd.value = rtnValAry[0];//full_nm
		//#3488 Accounting Multi Language 적용
		if(MULTI_LANGUAGE == 'Y'){
			formObj.s_vendor_nm.value = rtnValAry[10];//full_nm
		}else {
			formObj.s_vendor_nm.value = rtnValAry[2];//full_nm
		}
		
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
function setOrderByInfo(reqVal) {
	
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
}


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


//#2374 [LBS] Deposit/Payment List 에 Excel (All) 버튼 추가
function excelDown(mySheet){
	
	var formObj = document.frm1;
	
	if(!formValidation()){
		return;
	}
	//#5539 [BNX] Excel All download with post date validation - Skip the post date validation
	/*if(formObj.s_post_strdt.value == ""){
		ComShowCodeMessage("COM132622");
		formObj.s_post_strdt.focus();
		return;
	}*/
	
	formObj.f_cmd.value = COMMAND10;
	
	var formParam = FormQueryString(formObj);
	var param = {
					DownCols: makeHiddenSkipCol(mySheet)
					,SheetDesign:1
					,URL:"./ACC_JOR_0040.clt"
					,ExtendParam:formParam
					,ExtendParamMethod:"GET"
				};	
	mySheet.DirectDown2Excel(param);
}


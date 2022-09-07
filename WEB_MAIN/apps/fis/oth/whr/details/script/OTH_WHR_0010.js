//=========================================================
//*@FileName   : OTH_WHR_0010.jsp
//*@FileTitle  : Warehouse Receipts Entry
//*@Description: Warehouse Receipts Entry
//*@author     : Chungrue - Cyberlogitec
//*@version    : 1.0 - 2011/11/03
//*@since      : 2011/11/03
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/06/19
//*@since      : 2014/06/19
//=========================================================
var rtnary=new Array(1);
var obl_decimal_len = 0;
var callBackFunc = "";
function doWork(srcName){
	if(!btnGetVisible(srcName)){
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
	   case "GO_HBL":
			searchBlCmmInfo();
			if(frm1.f_intg_bl_seq.value == ""){
				alert(getLabel('FMS_COM_ALT004') + "\n - " + getLabel('FMS_COD_HBNO'));
				frm1.f_bl_no.focus();
				return;
			}
			var formObj=document.frm1;
			var paramStr="";
			var titleStr="Booking & HB/L Entry";
			if(frm1.f_air_sea_clss_cd.value == "S" && frm1.f_bnd_clss_cd.value =="O"){	//Ocean Export
				paramStr="./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+formObj.f_bl_no.value+"&f_intg_bl_seq="+frm1.f_intg_bl_seq.value;
			}else if(frm1.f_air_sea_clss_cd.value == "S" && frm1.f_bnd_clss_cd.value =="I"){	//Ocean Import
				paramStr="./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+formObj.f_bl_no.value+"&f_intg_bl_seq="+frm1.f_intg_bl_seq.value;
			}else if(frm1.f_air_sea_clss_cd.value == "A" && frm1.f_bnd_clss_cd.value =="O"){	//Air Export
				titleStr="Booking & House AWB Entry";
				paramStr="./AIE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+frm1.f_intg_bl_seq.value + "&f_bl_no="+formObj.f_bl_no.value;
			}else if(frm1.f_air_sea_clss_cd.value == "A" && frm1.f_bnd_clss_cd.value =="I"){	//Air Import
				titleStr="Booking & House AWB Entry";
				paramStr="./AII_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+frm1.f_intg_bl_seq.value + "&f_bl_no="+formObj.f_bl_no.value;
			}
	   		parent.mkNewFrame(titleStr, paramStr);
	   break;
	   case "SEARCH":
		   frm1.f_cmd.value=SEARCH;
		   formObj.submit();
		   break;
       case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            docObjects[0].DoSearch("./OTH_WHR_0010GS.clt", FormQueryString(formObj) );
       break;
       case "ROWADD":
    	   var intRows=docObjects[0].LastRow() + 1; // 마지막 라인 + 1
    	   if(intRows <= 2 || docObjects[0].GetCellValue(intRows-1, "itm_seq") == "") {
    			docObjects[0].RemoveAll();
    			docObjects[0].DataInsert(intRows); // 라인추가
    			docObjects[0].SetCellValue(intRows, "wh_recp_no",formObj.f_wh_recp_no.value,0);
    			docObjects[0].SetCellValue(intRows, "itm_seq",1,0);
    		} else {
    			docObjects[0].DataInsert(intRows); // 라인추가
    			docObjects[0].SetCellValue(intRows, "wh_recp_no",formObj.f_wh_recp_no.value,0);
    			docObjects[0].SetCellValue(intRows, "itm_seq",Number(docObjects[0].GetCellValue(intRows-1, "itm_seq"))+1,0);
    		}
    		docObjects[0].SetCellValue(intRows, "length",0,0);
    		docObjects[0].SetCellValue(intRows, "width",0,0);
    		docObjects[0].SetCellValue(intRows, "height",0,0);
    		docObjects[0].SetCellValue(intRows, "pck_qty",1,0);
    		docObjects[0].SetCellValue(intRows, "pck_ut_cd","BX",0);
    		docObjects[0].SetCellValue(intRows, "wgt_k",0,0);
    		docObjects[0].SetCellValue(intRows, "wgt_l",0,0);
    		docObjects[0].SetCellValue(intRows, "meas",0,0);
    		docObjects[0].SetCellValue(intRows, "itm_dt", getTodayStr("MM-dd-yyyy"), 0);
//    		docObjects[0].SetCellValue(intRows, "itm_dt", "2014-06-19",0);
       break;
       case "MODIFY":	//등록
		   frm1.f_cmd.value=MODIFY;
		   checkDuplicateReceiptNo();
	       //필수항목체크
	       if(checkVal()){
	    	   if(confirm("Do you want save? ")){
	    		    if(formObj.t_wh_recp_no.value == "") {
	    		    	formObj.f_save_sts_flg.value="I";
	    		    	//frm1.f_ttl_amt.value = "0";
	    		    } else {
	    		    	formObj.f_save_sts_flg.value="U";
	    		    	formObj.f_wh_recp_no.value=formObj.t_wh_recp_no.value; 
	    		    }
	    		   calcFrgnAmt();
	    			for(var i=2;i<=sheetObj.LastRow();i++){
	    				if(sheetObj.GetCellValue(i, "del_chk") == "1"){
	    					 sheetObj.SetCellValue(i,"ibflag","D");
	    				}
	    			}
	           	   //formObj.f_vatamt_tot.value 	= removeComma(formObj.f_vatamt_tot.value);
	           	   //formObj.f_totamt_tot.value 	= removeComma(formObj.f_totamt_tot.value);
	    		   var sht1=sheetObj.GetSaveString(false);		//Bill Collecting List
	           	   var sht2=sheetObj2.GetSaveString(false);		//Bill Collecting List
	           	   var intRows2=sheetObj2.LastRow() + 1; //RowCount
		           sheetObj2.DataInsert(intRows2); // 리스트 변경이 없을경우를 대비해서 시트2에 강제로 데이터 추가
		           sheetObj2.DoAllSave("./OTH_WHR_0011GS.clt", FormQueryString(formObj)+'&'+sht1, true);
		           /*
		           //////////////////////////////////////////////////////////////////////////////////////
		           // 폼과 리스트 동시 저장
//no support[check again]CLT 		           if(docObjects[0].Rows <= 2 || docObjects[0].CellValue(docObjects[0].Rows-1, "itm_seq") == "") { 
	        		   // 시트1 없으면 
	        		   sheetObj2.DoAllSave("./OTH_WHR_0020GS.clt", FormQueryString(formObj)+'&'+sht2, true);
	        	   } else {
	        		   sheetObj.DoAllSave("./OTH_WHR_0010GS.clt", FormQueryString(formObj)+'&'+sht2, true);
	        	   }
		           //////////////////////////////////////////////////////////////////////////////////////
		           */
	           }
	       }
           // 저장후 리스트 재조회 
    	   //
       break;
       case "DELETE":	//삭제
    	   if(frm1.f_wh_recp_no.value != ""){
    		   frm1.f_cmd.value=REMOVE;
               if(confirm(getLabel('FMS_COM_CFMDEL'))){
            	   for(var i=2; i<=sheetObj.LastRow(); i++){
            		   sheetObj.SetCellValue(i,"ibflag","D");
            	   }
	           	   var sht2=sheetObj2.GetSaveString(false);		//Bill Collecting List
	           	   var intRows2=sheetObj2.LastRow() + 1;
    	           sheetObj2.DataInsert(intRows2); // 리스트 변경이 없을경우를 대비해서 시트2에 강제로 데이터 추가
    	           if(docObjects[0].LastRow() + 1 <= 2 || docObjects[0].GetCellValue(docObjects[0].LastRow(), "itm_seq") == "") { 
            		   // 시트1 없으면 
            		   sheetObj2.DoSave("./OTH_WHR_0010GS.clt", FormQueryString(formObj),"ibflag",false);
            	   } else {
            		   sheetObj.DoSave("./OTH_WHR_0010GS.clt", FormQueryString(formObj),"ibflag",false);
            	   }
            	   //화면초기화
            	   clearAll();
               }
               showCompleteProcess();
    	   }
       break;
       case "MAKER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		var formObj=document.frm1;
	   		rtnary[0]="1";
//	   		rtnary[1]=formObj.f_maker_nm.value;
	   		rtnary[1]="";
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "MAKER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
     	break;
       case "MAKER_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		var formObj=document.frm1;
	   		rtnary[0]="1";
	   		rtnary[1]=formObj.f_maker_nm.value;
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "MAKER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	break;
       case "WH_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   rtnary=new Array(1);
		   var formObj=document.frm1;
		   
		   rtnary[0]="1";
//		   rtnary[1]=formObj.f_wh_nm.value;
		   rtnary[1]="";
		   rtnary[2]=window;
		   
		   callBackFunc = "WH_POPLIST";
           modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   break;
       case "WH_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   rtnary=new Array(1);
		   var formObj=document.frm1;
		   
		   rtnary[0]="1";
		   rtnary[1]=formObj.f_wh_nm.value;
		   rtnary[2]=window;
		   
		   callBackFunc = "WH_POPLIST";
           modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   break;
	   
       case "SHIPPER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
    	   rtnary=new Array(1);
    	   rtnary[0]="1";
//    	   rtnary[1]=formObj.f_shpr_nm.value;
    	   rtnary[1]="";
    	   rtnary[2]=window;
    	   
    	   callBackFunc = "SHIPPER_POPLIST";
    	   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	   break;
       case "SHIPPER_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
    	   rtnary=new Array(1);
    	   rtnary[0]="1";
    	   rtnary[1]=formObj.f_shpr_nm.value;
    	   rtnary[2]=window;
    	   
    	   callBackFunc = "SHIPPER_POPLIST";
    	   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	   break;
       case "CONSIGNEE_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
    	   rtnary=new Array(1);
    	   rtnary[0]="1";
//    	   rtnary[1]=formObj.f_cnee_nm.value;
    	   rtnary[1]="";
    	   rtnary[2]=window;
    	   
    	   callBackFunc = "CONSIGNEE_POPLIST";
    	   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	   break;
       case "CONSIGNEE_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
    	   rtnary=new Array(1);
    	   rtnary[0]="1";
    	   rtnary[1]=formObj.f_cnee_nm.value;
    	   rtnary[2]=window;
    	   
    	   callBackFunc = "CONSIGNEE_POPLIST";
    	   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	   break;
    	   
        case "CUSTOMER_POPLIST2"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]=window;
 	        var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px" , true);
 	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				formObj.f_ship_to_cd.value=rtnValAry[0];//full_nm
				formObj.f_ship_to_nm.value=rtnValAry[2];//full_nm
			}             
    	break;
        case "COMMODITY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈           
       		rtnary=new Array(1);	   		
	   		rtnary[0]="1";
	   		
	   		callBackFunc = "COMMODITY_POPLIST";
	   		modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
       break;
        case "COMMODITY_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈           
       		rtnary=new Array(3);	   		
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]=formObj.f_cmdt_nm.value;
	   		
	   		callBackFunc = "COMMODITY_POPLIST";
	   		modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
       break;
       
		case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
          	rtnary=new Array(1);
	   		rtnary[0]="1";
	   		callBackFunc = "USER_POPLIST";
	   		modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
		break;
		case "RECP_USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
          	rtnary=new Array(1);
	   		rtnary[0]="1";
	   		
	   		callBackFunc = "RECP_USER_POPLIST";
	   		modal_center_open('./CMM_POP_0060.clt', rtnary, 556, 450, 'yes');
		break;
		case 'PRINT':
        	///////////////////////////////////////////////////////////
    	    // 프린트
    	    var formObj=document.frm1;
			formObj.file_name.value='warehouse_receipt_detail.mrd';
			formObj.title.value='Warehouse Receipt';
			//Parameter Setting
			var param='';
			param += '[' + formObj.f_wh_recp_no.value + ']'; // $1
			param += '[' + formObj.f_ofc_cd.value + ']';
			param += '[' + formObj.f_ofc_nm.value + ']';
			param += '[' + usrPhn + ']';
			param += '[' + usrFax + ']';
			param += '[' + usrEml + ']';
			formObj.rd_param.value=param;
			//alert(param);
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
        	///////////////////////////////////////////////////////////
		break;
		//#5541 [Impex] Report Customization Warehouse Receipt Label
		case 'LABEL':
        	///////////////////////////////////////////////////////////
    	    // 프린트
			
    	    var formObj=document.frm1;
    		if(!checkWhrItm()){
    			return;
    		}
    		
			formObj.file_name.value='warehouse_receipt_label.mrd';
			formObj.title.value='Warehouse Label';
			//Parameter Setting
			var param='';
			param += '[' + formObj.f_wh_recp_no.value + ']'; // $1
			param += '[' + formObj.f_ofc_cd.value + ']';
			param += '[' + formObj.f_ofc_nm.value + ']';
			param += '[' + usrPhn + ']';
			param += '[' + usrFax + ']';
			param += '[' + usrEml + ']';
			formObj.rd_param.value=param;
			//alert(param);
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
        	///////////////////////////////////////////////////////////
		break;
		case "NEW":
			// clearAll();
			if(confirm(getLabel('FMS_COM_CFMNEW'))){
				doShowProcess();
				var currLocUrl=this.location.href;
				currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
				currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
	//			parent.mkNewFrame(document.getElementById("bigtitle").innerHTML, currLocUrl);
				window.location.href = currLocUrl
				break;
			}
//			[#5547] [Impex] Copy Warehouse Receipt List
		case "COPY":
			if(frm1.f_wh_recp_no.value == ""){
	 			//Select Please.
				alert(getLabel('FMS_COM_ALT003'));	
	 			return;
	 		}
			else{ 
				if(confirm(getLabel('FMS_COM_CFMCPY'))){
				   frm1.f_cmd.value=COMMAND01;
				   formObj.submit();
	     	   }
 		}
			break;
    }
}

function USER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_op_useid.value=rtnValAry[0];
		formObj.f_op_usenm.value=rtnValAry[1];
	}
}
function RECP_USER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_recp_usrid.value=rtnValAry[0];
		formObj.f_recp_usrnm.value=rtnValAry[1];
	}
}

function CONSIGNEE_POPLIST(rtnVal){
	var formObj=document.frm1;
   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
   }else{
	   var rtnValAry=rtnVal.split("|");
	   formObj.f_cnee_cd.value=rtnValAry[0];//full_nm
	   formObj.f_cnee_nm.value=rtnValAry[2];//full_nm
   }
}

function SHIPPER_POPLIST(rtnVal){
   var formObj=document.frm1;
   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
   }else{
	   var rtnValAry=rtnVal.split("|");
	   formObj.f_shpr_cd.value=rtnValAry[0];//full_nm
	   formObj.f_shpr_nm.value=rtnValAry[2];//full_nm
   }             
}

function COMMODITY_POPLIST(rtnVal){
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.f_cmdt_cd.value=rtnValAry[0];
		frm1.f_cmdt_nm.value=rtnValAry[2];
	}
}

function MAKER_POPLIST(rtnVal){
	var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_maker_cd.value=rtnValAry[0];//full_nm
		formObj.f_maker_nm.value=rtnValAry[2];//full_nm
	}
}

function CUSTOMER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_recp_usrid.value=rtnValAry[0];
		formObj.f_recp_usrnm.value=rtnValAry[1];
	}
}

function WH_POPLIST(rtnVal){
   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
   }else{
	   var formObj=document.frm1;
	   var rtnValAry=rtnVal.split("|");
	   formObj.f_wh_cd.value=rtnValAry[0];//full_nm
	   formObj.f_wh_nm.value=rtnValAry[2];//full_nm
   }    
}

//#5541 [Impex] Report Customization Warehouse Receipt Label
function checkWhrItm() {
	var formObj  = document.frm1;
	
	if (formObj.f_wh_recp_no.value != "") {
		ajaxSendPost(checkItmReq, 'reqVal', '&goWhere=aj&bcKey=searchWhrItmChk&wh_recp_no='+formObj.f_wh_recp_no.value, './GateServlet.gsl');
		
		if (!hasItm) {
			alert(getLabel('FMS_COM_ALT010'));
		}
		
		return hasItm;
	} else {
		return true;
	}
}

var hasItm = false;

function checkItmReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(doc[1]=='Y'){
			hasItm = true;
		}
		else{
			hasItm = false;
		}
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
	document.frm1.f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.frm1.f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.frm1.f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
var isRun = true;
function loadPage() {
    var formObj=document.frm1;
    
    var opt_key = "OBL_DECIMAL_LEN";
	ajaxSendPost(setDecimalLen, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	for(var i=0;isRun && i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
        if(i == docObjects.length - 1){
        	isRun = false;
        }
    }
	if(formObj.t_wh_recp_no.value != ""){
    	doWork("SEARCHLIST");
    }
	if(formObj.t_wh_recp_no.value == ""){
		btnCopy.style.display='none';
	}
	if(formObj.f_recp_tm.value == ""){
		formObj.f_recp_tm.value="00:00";
	}
	frm1.f_ttl_amt.value=doMoneyFmt(Number(frm1.f_ttl_amt.value).toFixed(2));
//	formObj.f_pck_qty.value  = doMoneyFmt(formObj.f_pck_qty.value);
//	formObj.f_grs_wgt.value  = doMoneyFmt(formObj.f_grs_wgt.value);
//	formObj.f_grs_wgt1.value = doMoneyFmt(formObj.f_grs_wgt1.value);
//	formObj.f_meas.value 	 = doMoneyFmt(formObj.f_meas.value);
//	formObj.f_meas1.value 	 = doMoneyFmt(formObj.f_meas1.value);
    if(formObj.t_wh_recp_no.value == "") {
    	formObj.f_save_sts_flg.value="I";
    	frm1.f_ttl_amt.value="0";
    	// Entry 로 직접 Onload 시에 W/H Location 에 Default 는 OFFICE 정보 (OFFICE CODE + MAINCMP) 적용
    	formObj.f_wh_cd.value=formObj.f_ofc_cd.value + "MAINCMP";
    	codeNameAction('trdpcode_warehouse', formObj.f_wh_cd, 'onBlur');
    } else {
    	formObj.f_save_sts_flg.value="U";
    }
    calTot();
    
    /* 2016-12-21 자동완성 기능 추가 S */	  
    fnSetAutocompleteCallBack('f_wh_nm'	, 'WH_POPLIST', 'LINER_POPLIST'); //W/H Location
	fnSetAutocompleteCallBack('f_maker_nm'	, 'MAKER_POPLIST', 'LINER_POPLIST'); //Maker
	fnSetAutocompleteCallBack('f_shpr_nm', 'SHIPPER_POPLIST', 'LINER_POPLIST'); //Shipper
	fnSetAutocompleteCallBack('f_cnee_nm'	, 'CONSIGNEE_POPLIST', 'LINER_POPLIST'); //Consignee
    /* 2016-12-21 자동완성 기능 추가 E */ 
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
	           var headers = [ { Text:getLabel('OTH_WHR_0010_HDR1_1'), Align:"Center"},
	                       { Text:getLabel('OTH_WHR_0010_HDR1_2'), Align:"Center"} ];
	           InitHeaders(headers, info);
	
	           var cols = [ {Type:"Status",    Hidden:1, Width:20,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
	                  {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, HeaderCheck:0},
	                  {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"wh_recp_no" },
	                  {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"itm_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
	                  /*Start: #4739 WH Receipt Entry screen decimal point bug fix - Vien.Cao*/
	                  {Type:"Int",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"length",      KeyField:0,   CalcLogic:"",   Format:"Integer",       PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
	                  {Type:"Int",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"width",       KeyField:0,   CalcLogic:"",   Format:"Integer",       PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
	                  {Type:"Int",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"height",      KeyField:0,   CalcLogic:"",   Format:"Integer",       PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
	                  /*End: #4739 WH Receipt Entry screen decimal point bug fix - Vien.Cao*/
	                  {Type:"Int",       Hidden:0,  Width:40,   Align:"Right",   ColMerge:1,   SaveName:"pck_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
	                  {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"pck_ut_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                  /* #4739 WH Receipt Entry screen decimal point bug fix - Vien.Cao*/
	                  {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"wgt_k",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	                  {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"wgt_l",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	                  {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"meas",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:17 },
	                  /* #4739 WH Receipt Entry screen decimal point bug fix - Vien.Cao*/
	                  {Type:"Float",     Hidden:0,  Width:110,  Align:"Right",   ColMerge:1,   SaveName:"act_wgt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	                  {Type:"Float",     Hidden:0,  Width:110,  Align:"Right",   ColMerge:1,   SaveName:"act_wgt_l",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"shpd",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1 },
	                  {Type:"Date",      Hidden:0,  Width:90,   Align:"Center",    ColMerge:1,   SaveName:"itm_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
	                  {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"bl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 } ];
	            
	           InitColumns(cols);
	
	           SetEditable(1);
	           SetHeaderRowHeight(20);
	           SetHeaderRowHeight(21);
	           //InitViewFormat(0, "itm_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	           SetSheetHeight(200);
	           SetColProperty(0 ,"bl_no", {AcceptKeys:"E|N|[.-]", InputCaseSensitive:1});
	           SetColProperty('pck_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
	           resizeSheet();
           }                                                      
           break;
         case 2:      //IBSheet2 init
             with (sheetObj) {
//             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('OTH_WHR_0010_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"wh_recp_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Status",    Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag2",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
              
             InitColumns(cols);
             SetEditable(1);
             SetVisible(false);
            }                                                      
            break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	//alert("서치엔드");
	calTot();
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	//alert(getLabel('FMS_COM_NTYCOM'));
	/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
	showCompleteProcess();
	// Bug: 42477, TC05_003
	if (frm1.f_cmd.value == null || frm1.f_cmd.value == '') {
		var sheetObj2=docObjects[1];
		var formObj=document.frm1;
		formObj.f_wh_recp_no.value="";
		formObj.t_wh_recp_no.value=sheetObj2.GetCellValue(1, "wh_recp_no");
		return;
	}
	if(frm1.f_cmd.value!=REMOVE){
		var sheetObj=docObjects[0];
		var sheetObj2=docObjects[1];
		var formObj=document.frm1;
		formObj.f_wh_recp_no.value=sheetObj.GetCellValue(1, "wh_recp_no");
		formObj.t_wh_recp_no.value=sheetObj2.GetCellValue(1, "wh_recp_no");
		//doWork("SEARCH");
	}
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow()== row && "bl_no" == sheetObj.ColSaveName(col)){
		if(keyCode==9 && getObj('rowAddBtn').style.display != "none"){
			doWork('ROWADD');
			sheetObj.SelectCell(row+1, 2);
		}
	}
}

function sheet2_OnSaveEnd(sheetObj, errMsg){
	if(errMsg!=''){
		return;
	}
	//Save success!
	//alert(getLabel('FMS_COM_NTYCOM'));
	/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
	showCompleteProcess();
	if(frm1.f_cmd.value!=REMOVE){
		var sheetObj2=docObjects[1];
		var formObj=document.frm1;
		formObj.f_wh_recp_no.value=sheetObj2.GetCellValue(1, "wh_recp_no");
		formObj.t_wh_recp_no.value=sheetObj2.GetCellValue(1, "wh_recp_no");
		if(formObj.t_wh_recp_no.value == "") {
	    	formObj.f_save_sts_flg.value="I";
	    	frm1.f_ttl_amt.value="0";
	    } else {
	    	formObj.f_save_sts_flg.value="U";
	    }
	    calTot();
		//doWork("SEARCHLIST");
	    //#1165 [WH Receipt Entry] Data saved but not close UI after click Save/X button
	    if(saveCloseBtnYn != "Y"){
	    	doWork("SEARCH");
	    }
		
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
				if(formObj.f_curr_cd.value != sheetObj.GetCellValue(i, "inv_curr_cd")){
					formObj.f_frgn_curr_cd.value=sheetObj.GetCellValue(i, "inv_curr_cd");
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
			alert(getLabel('FMS_COM_ALT008') + " - " + doc[1]);
			var sheetObj=docObjects[0];
			var intRow=sheetObj.LastRow();
			sheetObj.SetCellValue(intRow, "cmdt_cd","");
		}	
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
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
  if(selectedDay > lastDay){
	  //alert( "날짜를 정확히 선택해 주세요. 선택하신 년월의 날짜는 " + lastDay + " 일까지 있습니다."); alert(getLabel2('OTH_MSG_009', new Array(lastDay)
	  alert(getLabel('SUP_COM_ALT001') + getLabel2('FMS_COD_PARA', lastDay) + "." + "\n\n: OTH_WHR_0010.605");
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
            cal.select(formObj.f_recp_dt,  'MM-dd-yyyy');
        break;
    }
}
function searchBlCmmInfo(){
	var formObj=document.frm1;
	if(formObj.f_bl_no.value != ""){
		ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+formObj.f_bl_no.value, './GateServlet.gsl');
	}
}
function enterBlCmmInfo(){
	var formObj=document.frm1;
	if(formObj.s_bl_no.value != ""){
		if(event.keyCode == 13){
			formObj.f_inv_seq.value="";
			formObj.s_inv_no.value="";
			ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+formObj.s_bl_no.value, './GateServlet.gsl');
		}
	}
}
function enterOtherInfo(){
	var formObj=document.frm1;
	if(formObj.s_oth_no.value != ""){
		if(event.keyCode == 13){
			formObj.f_inv_seq.value="";
			formObj.s_inv_no.value="";
			ajaxSendPost(getOtherInfo, 'reqVal', '&goWhere=aj&bcKey=getOtherInfo&s_oth_no='+formObj.s_oth_no.value, './GateServlet.gsl');
		}
	}
}
function enterInvInfo(){
	var formObj=document.frm1;
	if(formObj.s_inv_no.value != ""){
		if(event.keyCode == 13){
			formObj.s_bl_no.value="";
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
				frm1.f_intg_bl_seq.value=rtnArr[0];
				frm1.f_biz_clss_cd.value=rtnArr[2];
				frm1.f_air_sea_clss_cd.value=rtnArr[3];
				frm1.f_bnd_clss_cd.value=rtnArr[4];
				//doWork("DEFAULT");
			}else{
				frm1.f_intg_bl_seq.value="";
				//frm1.f_bl_no.value				= "";
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
 * OTHER_INFO를 가져온다.
 */
function getOtherInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				frm1.f_oth_seq.value=rtnArr[0];
				frm1.s_oth_no.value=rtnArr[1];
				frm1.f_intg_bl_seq.value="";
				frm1.s_bl_no.value="";
				frm1.f_bl_no.value="";
				frm1.f_biz_clss_cd.value="";
				frm1.f_air_sea_clss_cd.value="";
				frm1.f_bnd_clss_cd.value="";
				doWork("DEFAULT");
			}else{
				frm1.f_oth_seq.value="";
				frm1.s_oth_no.value="";
				clearAll();
				formObj.s_oth_no.focus();
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
				frm1.f_inv_seq.value=rtnArr[0];
				frm1.s_inv_no.value=rtnArr[1];
				doWork("DEFAULT");
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
//조회 INVOICE NO가 비었을경우 INV_SEQ 를 지워준다.
function setInvInfo(){
	var formObj=document.frm1;
	if(formObj.s_inv_no.value == ""){
		formObj.f_inv_seq.value="";
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
    	   //alert("유효하지 않은 일자입니다.");
    	   alert(getLabel('FMS_COM_ALT002') + " - " + getLabel('FMS_COD_DATE'));	
    	   return false;
       }
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm
          }
          if(y_day > 29){
        	  //alert("유효하지 않은 일자입니다.");
        	  alert(getLabel('FMS_COM_ALT002') + " - " + getLabel('FMS_COD_DATE'));	
       	   	  return false;
          }
      }else {
    	  if(mm < 10){
       	   mm="0"+mm
          }
    	  if(y_day > 28){
    		  //alert("유효하지 않은 일자입니다.");
        	  alert(getLabel('FMS_COM_ALT002') + " - " + getLabel('FMS_COD_DATE'));	
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
//화면 클리어
function clearAll(){
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  if(!(collTxt[i].name == "f_ofc_cd" || collTxt[i].name == "usrNm"
			  || collTxt[i].name == "f_ofc_nm" || collTxt[i].name == "f_email")){
			  collTxt[i].value="";
		  }
	  }           
	}
	if(frm1.f_recp_tm.value == ""){
		frm1.f_recp_tm.value="00:00";
	}
	frm1.f_rmk.value="";
	frm1.f_ttl_amt.value="0";
	//frm1.f_ttl_amt.value  	= doMoneyFmt(Number(frm1.f_ttl_amt.value).toFixed(2));
	//frm1.f_curr_cd.value = "USD";
	frm1.f_curr_cd.value="";
	frm1.f_save_sts_flg.value="I"; // 저장 상태 
	frm1.f_wh_cd.value=frm1.f_ofc_cd.value + "MAINCMP";
	codeNameAction('trdpcode_warehouse', frm1.f_wh_cd, 'onBlur');
	sheetObj.RemoveAll();
    calTot();
}
//필수항목체크
function checkVal(){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	//LHK, 20130304 W/H Location 추가에 따른 체크 추가	
	if(formObj.f_wh_cd.value == ""){
		//alert("Please input W/H Location. ");
		alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('SUP_COM_ALT005'));
		formObj.f_wh_cd.focus();
		return false;
	}else if(formObj.f_recp_dt.value == ""){
		//alert("Please input Rec'd Date. ");
		alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_DATM'));	
		formObj.f_recp_dt.focus();
		return false;
	}else if(checkInputVal(frm1.f_rmk.value, 0, 200, "T", 'Remark')!='O'){
		frm1.f_rmk.focus();
		return false;
	}
	if(formObj.f_recp_tm.value == ""){
		//alert("Please input Rec'd Time. ");
		alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_DATM'));	
		formObj.f_recp_tm.focus();
		return false;
	}
	/* 고지형 수석이 이 부분은 필수값이 아니라고 하여 주석처리해둠. 2011.12.16 PJK.
	if(formObj.f_recp_usrid.value == ""){
		alert("Please input Rec'd By. ");
		formObj.f_inv_dt.focus();
		return false;
	}
	if(formObj.f_maker_nm.value == "" || formObj.f_maker_cd.value == ""){
		alert("Please input Maker. ");
		formObj.f_maker_cd.focus();
		return false;
	}
	if(formObj.f_shpr_nm.value == "" || formObj.f_shpr_cd.value == ""){
		alert("Please input Shipper. ");
		formObj.f_shpr_cd.focus();
		return false;
	}
	if(formObj.f_cnee_nm.value == "" || formObj.f_cnee_cd.value == ""){
		alert("Please input Consignee. ");
		formObj.f_cnee_cd.focus();
		return false;
	}
	*/
	for(var i=2;i<=sheetObj.LastRow();i++){
		var arr_wgt_k=(sheetObj.GetCellValue(i, "wgt_k") + "" ).split(".");
		var arr_wgt_l=(sheetObj.GetCellValue(i, "wgt_l") + "").split(".");
		var arr_meas=(sheetObj.GetCellValue(i, "meas") + "").split(".");
	     if(arr_wgt_k[0].length > 18 - obl_decimal_len){
	         sheetObj.SelectCell(i, "wgt_k", false);
	         alert(getLabel('FMS_COM_ALT007') + " - " + getLabel2('FMS_COM_ALT030', new Array("18")));
	       	 return false;
		 }
	     if(arr_wgt_k.length > 1){
	    	 if(arr_wgt_k[1].length > obl_decimal_len){
	    		 sheetObj.SelectCell(i, "wgt_k", false);
		         alert(getLabel('FMS_COM_ALT007') + " - " + getLabel2('FMS_COM_ALT030', new Array("18")));
		       	 return false;
	    	 }
		 }
	     if(arr_wgt_l[0].length > 18 - obl_decimal_len){
	         sheetObj.SelectCell(i, "wgt_l", false);
	         alert(getLabel('FMS_COM_ALT007') + " - " + getLabel2('FMS_COM_ALT030', new Array("18")));
	         return false;
		 }
	     if(arr_wgt_l.length > 1){
		  	if(arr_wgt_l[1].length > obl_decimal_len){
		  		sheetObj.SelectCell(i, "wgt_l", false);
		         alert(getLabel('FMS_COM_ALT007') + " - " + getLabel2('FMS_COM_ALT030', new Array("18")));
		         return false;
		  	}
		 }
	     if(arr_meas[0].length > 6){
	   	  	sheetObj.SelectCell(i, "meas", false);
	   	  	alert(getLabel('FMS_COM_ALT007') + " - " + getLabel2('FMS_COM_ALT030', new Array("12")));
	   	  	return false;
	     }
	     if(arr_meas.length > 1){
	    	if(arr_meas[1].length > 6){
		   	  	sheetObj.SelectCell(i, "meas", false);
		   	  	alert(getLabel('FMS_COM_ALT007') + " - " + getLabel2('FMS_COM_ALT030', new Array("12")));
		   	  	return false;
	    	}  	
		 }
	}
	return true;
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	CODETYPE=str;
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();	
	var s_type=str.substring(0,8);
	if(str == "trdpcode_maker" || str == "trdpcode_shipper" || str == "trdpcode_consignee" || str == "trdpcode_warehouse") {
		s_type="trdpcode";
	}
	if(str == "commodity") {
		s_type="commodity";
	}
	if (s_code != "") {
		if (tmp == "onKeyDown") {
			if (event.keyCode == 13) {
				ajaxSendPost(trdpCdReq, 'reqVal',
						'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
								+ '&s_code=' + s_code, './GateServlet.gsl');
			}
		} else if (tmp == "onBlur") {
			if (s_code != "") {
				ajaxSendPost(trdpCdReq, 'reqVal',
						'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
								+ '&s_code=' + s_code, './GateServlet.gsl');
			}
		}
	} else {
		if (CODETYPE == "trdpcode_maker") {
			formObj.f_maker_cd.value="";// trdp_cd AS param1
			formObj.f_maker_nm.value="";// eng_nm AS param2
		}
		if (CODETYPE == "trdpcode_shipper") {
			formObj.f_shpr_cd.value="";// trdp_cd AS param1
			formObj.f_shpr_nm.value="";// eng_nm AS param2
		}
		if (CODETYPE == "trdpcode_consignee") {
			formObj.f_cnee_cd.value="";// trdp_cd AS param1
			formObj.f_cnee_nm.value="";// eng_nm AS param2
		}
		if(CODETYPE=="trdpcode_warehouse"){
			formObj.f_wh_cd.value="";				//trdp_cd  AS param1
			formObj.f_wh_nm.value="";				//eng_nm   AS param2
		}
		if (CODETYPE == "commodity") {
			formObj.f_cmdt_cd.value="";// trdp_cd AS param1
			formObj.f_cmdt_nm.value="";// eng_nm AS param2
		}
		if (CODETYPE == "user") {
			formObj.f_recp_usrid.value="";// trdp_cd AS param1
			formObj.f_recp_usrnm.value="";// eng_nm AS param2
		}	
		if (CODETYPE == "usergs") {
			formObj.f_op_useid.value="";// trdp_cd AS param1
			formObj.f_op_usenm.value="";// eng_nm AS param2
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
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="trdpcode_maker"){
				formObj.f_maker_cd.value=masterVals[0];		//trdp_cd  AS param1
				formObj.f_maker_nm.value=masterVals[3];		//eng_nm   AS param2
			}
			if(CODETYPE=="trdpcode_shipper"){
				formObj.f_shpr_cd.value=masterVals[0];		//trdp_cd  AS param1
				formObj.f_shpr_nm.value=masterVals[3];		//eng_nm   AS param2
			}
			if(CODETYPE=="trdpcode_consignee"){
				formObj.f_cnee_cd.value=masterVals[0];		//trdp_cd  AS param1
				formObj.f_cnee_nm.value=masterVals[3];		//eng_nm   AS param2
			}
			if(CODETYPE=="trdpcode_warehouse"){
				formObj.f_wh_cd.value=masterVals[0];				//trdp_cd  AS param1
				formObj.f_wh_nm.value=masterVals[3];				//eng_nm   AS param2
			}
			if(CODETYPE=="commodity"){
				formObj.f_cmdt_cd.value=masterVals[0];		//trdp_cd  AS param1
				formObj.f_cmdt_nm.value=masterVals[3];		//eng_nm   AS param2
			}
			if (CODETYPE == "user") {
				formObj.f_recp_usrid.value=masterVals[0];// trdp_cd AS param1
				formObj.f_recp_usrnm.value=masterVals[3];// eng_nm AS param2
			}	
			if (CODETYPE == "usergs") {
				formObj.f_op_useid.value=masterVals[0];// trdp_cd AS param1
				formObj.f_op_usenm.value=masterVals[3];// eng_nm AS param2
			}
		} else {
			if(CODETYPE =="trdpcode_maker"){
				formObj.f_maker_cd.value="";				//trdp_cd  AS param1
				formObj.f_maker_nm.value="";				//eng_nm   AS param2
			}
			if(CODETYPE=="trdpcode_shipper"){
				formObj.f_shpr_cd.value="";				//trdp_cd  AS param1
				formObj.f_shpr_nm.value="";				//eng_nm   AS param2
			}
			if(CODETYPE=="trdpcode_consignee"){
				formObj.f_cnee_cd.value="";				//trdp_cd  AS param1
				formObj.f_cnee_nm.value="";				//eng_nm   AS param2
			}
			if(CODETYPE=="trdpcode_warehouse"){
				formObj.f_wh_cd.value="";				//trdp_cd  AS param1
				formObj.f_wh_nm.value="";				//eng_nm   AS param2
			}
			if(CODETYPE=="commodity"){
				formObj.f_cmdt_cd.value="";				//trdp_cd  AS param1
				formObj.f_cmdt_nm.value="";				//eng_nm   AS param2
			}
			if (CODETYPE == "user") {
				formObj.f_recp_usrid.value="";// trdp_cd AS param1
				formObj.f_recp_usrnm.value="";// eng_nm AS param2
			}	
			if (CODETYPE == "usergs") {
				formObj.f_op_useid.value="";// trdp_cd AS param1
				formObj.f_op_usenm.value="";// eng_nm AS param2
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
/*
 * 도량형 변환식
 */
function sheet1_OnChange(sheetObj, row, col){
	var colName=sheetObj.ColSaveName(col);
	//LHK 20130812 #16511 [WEBTRANS]W/H Entry 소수점 입력 요구사항 반영
	if(colName=="length" || colName=="width" || colName=="height" || colName=="pck_qty"){
		var formObj=document.frm1;
		var length=sheetObj.GetCellValue(row, "length")=="" ? 0 : sheetObj.GetCellValue(row, "length");
		var width=sheetObj.GetCellValue(row, "width")=="" ? 0 : sheetObj.GetCellValue(row, "width");
		var height=sheetObj.GetCellValue(row, "height")=="" ? 0 : sheetObj.GetCellValue(row, "height");
		var pcs=sheetObj.GetCellValue(row, "pck_qty")=="" ? 0 : sheetObj.GetCellValue(row, "pck_qty");
		var cbm=0;
		var kg=0;
		var sumCbm=0;
		if(formObj.f_len_ut_cd[0].checked){
			// 센치
			kg=roundXL(length * width * height * pcs / 6000, obl_decimal_len);
			cbm=roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 6);
			if (!ChkNumberCommaLen(kg, 15, obl_decimal_len) || !ChkNumberCommaLen(cbm,10, 6)) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row, "pck_qty", 0);
				return;
			} else {
				//sheetObj.CellValue2(row, "dim_act_dim") = cbm.toFixed(3);
				sheetObj.SetCellValue(row, "wgt_k",kg.toFixed(obl_decimal_len),0);
				sheetObj.SetCellValue(row, "wgt_l",(kg * CNVT_CNST_KG_LB).toFixed(obl_decimal_len),0);
				sheetObj.SetCellValue(row, "act_wgt",kg.toFixed(obl_decimal_len),0);
				sheetObj.SetCellValue(row, "act_wgt_l",(kg * CNVT_CNST_KG_LB).toFixed(obl_decimal_len),0);
				sheetObj.SetCellValue(row, "meas",cbm.toFixed(6),0);
				//sheetObj.CellValue2(row, "meas1") = (cbm * CNVT_CNST_CBM_CFT).toFixed(3);
			}
		}else if(formObj.f_len_ut_cd[1].checked){
			// 인치 
			kg=roundXL(length * width * height * pcs * 2.54 * 2.54 * 2.54 / 6000, obl_decimal_len);
			cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 6);
			if (!ChkNumberCommaLen(kg, 15, obl_decimal_len) || !ChkNumberCommaLen(cbm,10, 6)) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row, "pck_qty", 0);
				return;
			} else {
				//sheetObj.CellValue2(row, "dim_act_dim") = cbm.toFixed(3);
				sheetObj.SetCellValue(row, "wgt_k",kg.toFixed(obl_decimal_len),0);
				sheetObj.SetCellValue(row, "wgt_l",(kg * CNVT_CNST_KG_LB).toFixed(obl_decimal_len),0);
				sheetObj.SetCellValue(row, "act_wgt",kg.toFixed(obl_decimal_len),0);
				sheetObj.SetCellValue(row, "act_wgt_l",(kg * CNVT_CNST_KG_LB).toFixed(obl_decimal_len),0);
				sheetObj.SetCellValue(row, "meas",cbm.toFixed(6),0);
				//sheetObj.CellValue2(row, "meas1") = (cbm * CNVT_CNST_CBM_CFT).toFixed(3);
			}
		}else{
			//alert("select size_ut_cd");
			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_NULL'));	
			return;
		}
	}
	/* Bug #24773, [BINEX]Warehouse Receipt 에러, jsjang 20131219 */
	else if(colName=="wgt_k" || colName=="wgt_l"){
		if(colName=="wgt_k")
		{
			var wgt_k_tmp = roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, obl_decimal_len);
			if (!ChkNumberCommaLen(wgt_k_tmp, 15, obl_decimal_len)) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row, "wgt_k", 0);
				return;
			} else {
				sheetObj.SetCellValue(row, "wgt_l",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, obl_decimal_len),0);
			}
		}else if(colName=="wgt_l")
		{
			var wgt_l_tmp = roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, obl_decimal_len);
			if (!ChkNumberCommaLen(wgt_l_tmp, 15, obl_decimal_len)) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row, "wgt_l", 0);
				return;
			} else {
				sheetObj.SetCellValue(row, "wgt_k",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, obl_decimal_len),0);
			}
		}
	}else if(colName=="act_wgt" || colName=="act_wgt_l"){	//[20140116 OJG]	Bug #25507
		if(colName=="act_wgt")
		{
			var act_wgt_tmp = roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, obl_decimal_len);
			if (!ChkNumberCommaLen(act_wgt_tmp, 15, obl_decimal_len)) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row, "act_wgt", 0);
				return;
			} else {
				sheetObj.SetCellValue(row, "act_wgt_l",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, obl_decimal_len),0);
			}			
		}else if(colName=="act_wgt_l")
		{
			var act_wgt_l_tmp = roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, obl_decimal_len);
			if (!ChkNumberCommaLen(act_wgt_l_tmp, 15, obl_decimal_len)) {
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row, "act_wgt_l", 0);
				return;
			} else {
				sheetObj.SetCellValue(row, "act_wgt",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, obl_decimal_len),0);
			}
		}
	}
	// 시트 합계 계산
	calTot();
}
function calTot() {
	// 시트 합계 계산
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	///////////////////////////////////////////////////////////////////////////
	// 계산 합계 구하기
	var pck_qty_tot=0;
	var wgt_k_tot=0;
	var wgt_l_tot=0;
	var meas_tot=0;
	var act_wgt_tot=0;
	for(var i=2; i<=sheetObj.LastRow(); i++){
		pck_qty_tot 	+= Number(sheetObj.GetCellValue(i, "pck_qty"));
		wgt_k_tot 	+= Number(sheetObj.GetCellValue(i, "wgt_k"));
		wgt_l_tot 	+= Number(sheetObj.GetCellValue(i, "wgt_l"));
		meas_tot 	+= Number(sheetObj.GetCellValue(i, "meas"));
		act_wgt_tot 	+= Number(sheetObj.GetCellValue(i, "act_wgt"));
	}
	formObj.f_pck_qty_tot.value=doMoneyFmt(Number(pck_qty_tot.toFixed(0)));
	/*Start: #4739 WH Receipt Entry screen decimal point bug fix - Vien.Cao*/
	formObj.f_wgt_k_tot.value=doMoneyFmt(wgt_k_tot.toFixed(obl_decimal_len));
	formObj.f_wgt_l_tot.value=doMoneyFmt(wgt_l_tot.toFixed(obl_decimal_len));
	formObj.f_meas_tot.value=doMoneyFmt(meas_tot.toFixed(3));
	formObj.f_act_wgt_tot.value=doMoneyFmt(act_wgt_tot.toFixed(obl_decimal_len));
	/*End: #4739 WH Receipt Entry screen decimal point bug fix - Vien.Cao*/
	///////////////////////////////////////////////////////////////////////////
}
function chkSizeType(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var length=0;
	var width=0;
	var height=0;
	var pcs=0;
	var cbm=0;
	var kg=0;
	var sumCbm=0;
	for(var i=2 ; i<sheetObj.LastRow() + 1 ; i++){
		sheetObj.SetCellValue(i, "meas",0);
	}
	//LHK 20130812 CM에서 INCH SWITCH 할 경우 CMB Auto Calculation 적용
	for(var i=2 ; i<sheetObj.LastRow() + 1 ; i++){
		length=sheetObj.GetCellValue(i, "length")=="" ? 0 : sheetObj.GetCellValue(i, "length");
		width=sheetObj.GetCellValue(i, "width")=="" ? 0 : sheetObj.GetCellValue(i, "width");
		height=sheetObj.GetCellValue(i, "height")=="" ? 0 : sheetObj.GetCellValue(i, "height");
		pcs=sheetObj.GetCellValue(i, "pck_qty")=="" ? 0 : sheetObj.GetCellValue(i, "pck_qty");
		cbm=0;
		kg=0;
		sumCbm=0;
		if(formObj.f_len_ut_cd[0].checked){
			// 센치
			kg=roundXL(length * width * height * pcs / 6000, obl_decimal_len);
			cbm=roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 6);
			sheetObj.SetCellValue(i, "wgt_k",kg.toFixed(obl_decimal_len),0);
			sheetObj.SetCellValue(i, "wgt_l",(kg * CNVT_CNST_KG_LB).toFixed(obl_decimal_len),0);
			sheetObj.SetCellValue(i, "act_wgt",kg.toFixed(obl_decimal_len),0);
			sheetObj.SetCellValue(i, "act_wgt_l",(kg * CNVT_CNST_KG_LB).toFixed(obl_decimal_len),0);
			sheetObj.SetCellValue(i, "meas",cbm.toFixed(6),0);
		}else if(formObj.f_len_ut_cd[1].checked){
			// 인치 
			kg=roundXL(length * width * height * pcs * 2.54 * 2.54 * 2.54 / 6000, obl_decimal_len);
			cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 6);
			sheetObj.SetCellValue(i, "wgt_k",kg.toFixed(obl_decimal_len),0);
			sheetObj.SetCellValue(i, "wgt_l",(kg * CNVT_CNST_KG_LB).toFixed(obl_decimal_len),0);
			sheetObj.SetCellValue(i, "act_wgt",kg.toFixed(obl_decimal_len),0);
			sheetObj.SetCellValue(i, "act_wgt_l",(kg * CNVT_CNST_KG_LB).toFixed(obl_decimal_len),0);
			sheetObj.SetCellValue(i, "meas",cbm.toFixed(6),0);
		}
	}
	// 시트 합계 계산
	calTot();
}
function timeCheck(obj){
	var size=obj.value.length;
	if(size==1){
		obj.value="0" + obj.value + ":00";
	}else if(size==2){
		if(hourCheck(obj.value)){
			obj.value=obj.value + ":00";
		}else{
			obj.value='';
		}
	}else if(size==3){
		if(hourCheck(obj.value.substring(0,2))){
			if(obj.value.substring(2,3)>5 || obj.value.substring(2,3)<0){
				obj.value='';
			}else if(obj.value.substring(2,3) == ":"){
				obj.value=obj.value.substring(0,2) + ":" + "00";
			}else{
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,3) + "0";
			}
		}else{
			obj.value='';
		}
	}else if(size==4){
		if(hourCheck(obj.value.substring(0,2))){
			if(minuteCheck(obj.value.substring(2,4))){
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,4);
			}else{
				obj.value='';
			}
		}else{
			obj.value='';
		}
	}
}
function hourCheck(obj){
	if(isNaN(obj)){
		alert(getLabel('COM_FRT_ALT002'));
		return false;
	}
	if(obj>23 || obj<0){
		//HOUR: 0-23
		alert(getLabel('COM_FRT_ALT002'));
		return false;
	}else{
		return true;
	}
}
function minuteCheck(obj){
	if(isNaN(obj)){
		alert(getLabel('COM_FRT_ALT003'));
		return false;
	}
	if(obj>59 || obj<0){
		//alert('0-59');
		alert(getLabel('COM_FRT_ALT003'));
		return false;
	}else{
		return true;
	}
}
function checkDuplicateReceiptNo(){
	var formObj=document.frm1;
	if(formObj.f_wh_recp_no.value != ""){
		if(formObj.f_wh_recp_no.value != formObj.old_recp_no.value){
			ajaxSendPost(checkDuplicateReceiptNoEnd, 'reqVal', '&goWhere=aj&bcKey=searchWHReceiptNoDup&recp_no='+formObj.f_wh_recp_no.value, './GateServlet.gsl');
		}
	}
}
/**
 * AJAX RETURN
 * REF NO 중복체크
 */
function checkDuplicateReceiptNoEnd(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				//alert("Ref. No Duplicate!! ");
				alert(getLabel('FMS_COM_ALT008') + "\n - " + getLabel('FMS_COD_RECP'));	
				formObj.f_wh_recp_no.value=formObj.old_recp_no.value;
				formObj.f_wh_recp_no.select();
			}
		}
	}
}

function refreshAjaxTab(url){
	var formObj = document.frm1;
	doShowProcess();
	$.ajax({
		   type: "POST",
		   url: "./OTH_WHR_0010AJ.clt?f_cmd="+getParam(url,"f_cmd")+"&s_wh_recp_no="+getParam(url,"s_wh_recp_no")+"&s_rgst_ofc_cd="+getParam(url,"s_rgst_ofc_cd"),
		   dataType: 'xml',
		   success: function(data){
			   setFieldValue( formObj.f_intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.f_oth_seq, $('oth_seq',data).text());
			   setFieldValue( formObj.f_air_sea_clss_cd, $('air_sea_clss_cd',data).text());
			   setFieldValue( formObj.f_biz_clss_cd, $('biz_clss_cd',data).text());
			   setFieldValue( formObj.f_bnd_clss_cd, $('bnd_clss_cd',data).text());
			   setFieldValue( formObj.f_inv_seq, $('inv_seq',data).text());
			   setFieldValue( formObj.temp_bl_no , $('bl_no',data).text());
			   setFieldValue( formObj.temp_oth_no , $('oth_no',data).text());
			   setFieldValue( formObj.temp_inv_no , $('inv_no',data).text());
			   setFieldValue( formObj.t_wh_recp_no, $('wh_recp_no',data).text());
			   setFieldValue( formObj.old_recp_no, $('wh_recp_no',data).text());
			   setFieldValue( formObj.f_wh_recp_no, $('wh_recp_no',data).text());
			   setFieldValue( formObj.f_wh_cd, $('wh_cd',data).text());
			   setFieldValue( formObj.f_wh_nm, $('wh_nm',data).text());
			   setFieldValue( formObj.f_del_carrier, $('del_carrier',data).text());
			   setFieldValue( formObj.f_recp_dt, $('recp_dt',data).text());
			   setFieldValue( formObj.f_recp_tm, $('recp_tm',data).text());
			   setFieldValue( formObj.f_del_by, $('del_by',data).text());
			   setFieldValue( formObj.f_recp_usrid, $('recp_usrid',data).text());
			   setFieldValue( formObj.f_recp_usrnm, $('recp_usrnm',data).text());
			   setFieldValue( formObj.f_ttl_amt, $('ttl_amt',data).text());
			   setFieldValue( formObj.f_trk_bl_no, $('trk_bl_no',data).text());
			   setFieldValue( formObj.f_check_no, $('check_no',data).text());
			   setFieldValue( formObj.f_loc_nm, $('loc_nm',data).text());
			   setFieldValue( formObj.f_po_no, $('po_no',data).text());
			   setFieldValue( formObj.f_maker_cd, $('maker_cd',data).text());
			   setFieldValue( formObj.f_maker_nm, $('maker_nm',data).text());
			   setFieldValue( formObj.f_cmdt_cd, $('cmdt_cd',data).text());
			   setFieldValue( formObj.f_cmdt_nm, $('cmdt_nm',data).text());
			   setFieldValue( formObj.f_shpr_cd, $('shpr_cd',data).text());
			   setFieldValue( formObj.f_shpr_nm, $('shpr_nm',data).text());
			   setFieldValue( formObj.f_cnee_cd, $('cnee_cd',data).text());
			   setFieldValue( formObj.f_cnee_nm, $('cnee_nm',data).text());
			   setFieldValue( formObj.f_op_useid, $('op_useid',data).text());
			   setFieldValue( formObj.f_op_usenm, $('op_usenm',data).text());
			   setFieldValue( formObj.f_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.f_rmk, $('rmk',data).text());
			   setFieldValue( formObj.size_ut_cd1, $('size_ut_cd',data).text());
			   
			   doBtnAuthority(attr_extension);
			   
			   setupPage();
			   doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
}
function setDecimalLen(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		obl_decimal_len = Number(doc[1]);
	}else{
		obl_decimal_len = 3;
	}
}
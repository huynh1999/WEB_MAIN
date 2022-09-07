//=========================================================
//*@FileName   : WHM_WHM_0005.jsp
//*@FileTitle  : Warehouse Receiving
//*@Description: Warehouse Receiving
//*@author     : CuongLe - DOU Networks
//*@version    : 1.0 - 2014-12-16
//*@since      : 2011/11/03
//=========================================================
var rtnary=new Array(1);
var callBackFunc = "";
var statusflag = 'I';
var WMS_QTY_POINT = 0;  
var MST_CBM_POINT = 5;
var check_new = "";
var flgchk = false;
var wcd ="";
var wnm ="";
var show_complete = "N";
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
		    formObj.f_cmd.value=-1;
	        formObj.submit();
	   break;
	   case "SEARCH":
		   doSearchReceiving();
		   isFormChange = 0;
		   break;
       
       case "CT_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
    		   rtnary=new Array(1);
    		   rtnary[0]="1";
    		   rtnary[1]=formObj.cust_nm.value;
    		   rtnary[2]=window;
    		   callBackFunc = "CT_POPLIST";
    		   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   break;
       case "SU_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
    	   rtnary=new Array(1);
    	   rtnary[0]="1";
//    	   rtnary[1]=formObj.splr_rcvr_nm.value;
    	   rtnary[1]="";
    	   rtnary[2]=window;
    	   
    	   callBackFunc = "SU_POPLIST";
    	   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	   break;
       case "SU_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
    	   rtnary=new Array(1);
    	   rtnary[0]="1";
    	   rtnary[1]=formObj.splr_rcvr_nm.value;
    	   rtnary[2]=window;
    	   
    	   callBackFunc = "SU_POPLIST";
    	   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	   break;
    	   
       case "TR_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
    	   rtnary=new Array(1);
    	   rtnary[0]="1";
//    	   rtnary[1]=formObj.trkr_nm.value;
    	   rtnary[1]="";
    	   rtnary[2]=window;
    	   callBackFunc = "TR_POPLIST";
    	   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	   break;
       case "TR_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
    	   rtnary=new Array(1);
    	   rtnary[0]="1";
    	   rtnary[1]=formObj.trkr_nm.value;
    	   rtnary[2]=window;
    	   callBackFunc = "TR_POPLIST";
    	   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	   break;
    	   
       case "RECP_USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
         	rtnary=new Array(1);
	   		rtnary[0]="1";
	   		callBackFunc = "RECP_USER_POPLIST";
	   		modal_center_open('./CMM_POP_0060.clt', rtnary, 556, 450, 'yes');
		break;
		case "NEW":
			clearData();
			break;
		case "SAVE":
			doSave("Y");
    		break;
		case "GET_FILE_NO":
			getNewFileNo();
			break;
		case "SET_FILE_NO":
			setNewFileNo();
			break;
		case "ROWADD":
			/*DOU Tin.Luong fix bug load location data*/
		    if(sheet1.GetCellValue(2, "cb_loc_id") == ""){
		    	searchLocId();
		    }
			
			if(formObj.cust_cd.value!="" && formObj.s_ctrt_no.value!=""){
				var intRows=docObjects[0].LastRow(); // 마지막 라인 + 1
				if(intRows <= 2 ) {
					docObjects[0].RemoveAll();
					docObjects[0].DataInsert(intRows); // 라인추가
				} else {
					docObjects[0].DataInsert(intRows); // 라인추가
				}
				sheet1_OnChange(sheet1,intRows,3,"");
				formObj.s_ctrt_no.disabled =1;
				formObj.btn_ctrt_no.disabled = 1;
			}else{
				if(formObj.s_ctrt_no.value==""){
					ComShowCodeMessage('COM0278', "Contract No");
					formObj.s_ctrt_no.focus();
					return;
				}
//				alert("Please select Customer before add new items !");
				if(formObj.cust_cd.value==""){
					ComShowCodeMessage('COM12226');
					formObj.cust_cd.focus();
					return;
				}
				
			}
	       break;
		case "PRINT":
	          
    		// 프린트
			if(formObj.file_no.value==""){
    	   		ComShowCodeMessage("COM130403","Filling No");
    	   		return;
			}
    		formObj.file_name.value='receipt_detail.mrd';
    		formObj.title.value='Warehouse Receipt';
			// Parameter Setting
//    			var poNo=sheet1.GetCellValue(sheet1.GetSelectRow(),"itm_po_no");
			var whCd= formObj.wh_cd.value;
			var param="";
			param += '[' + formObj.file_no.value + ']'; // $1
			param += '[' + formObj.ofc_cd_list.value + ']';
			param += '[' + formObj.f_ofc_nm.value + ']';
			param += '[' + usrPhn + ']';
			param += '[' + usrFax + ']';
			param += '[' + usrEml + ']';
//			param += '[123]';
			param += '['+getPoNo()+']';
			param += '['+whCd+']';
			if(h_ut_tp_cd == "CM"){
//				if(formObj.f_len_ut_cd[0].checked){
				param += '[L W H (Cm)\nDescription]';   //#1448 [Sunway, LOA, UCB] WMS3.0 Warehouse Receipt Report Adjustment
			}else{
				param += '[L W H (Inch)\nDescription]'; //#1448 [Sunway, LOA, UCB] WMS3.0 Warehouse Receipt Report Adjustment
			}
//    			param += '[' + sheetObj.GetCellValue(sheetObj.GetSelectRow(),"itm_po_no") + ']';
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
    		
    	break;
		case "btn_ctrt_no":	
			var sUrl="./ContractRoutePopup.clt";
			   callBackFunc = "setCtrtNoInfo";
			   modal_center_open(sUrl, callBackFunc, 900,620,"yes");
			break;
		case "btn_ctrt_no_name":	
			var sUrl="./ContractRoutePopup.clt?ctrt_nm="+formObj.ctrt_nm.value;
			   callBackFunc = "setCtrtNoInfo";
			   modal_center_open(sUrl, callBackFunc, 900,620,"yes");
			break;
			
    }
}

function setCtrtNoInfo(aryPopupData){
	var formObj=document.frm1;
    if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
	 	return;
	}else{
		  var rtnValAry=aryPopupData.split("|");
		   formObj.s_ctrt_no.value=rtnValAry[0];
		   formObj.ctrt_nm.value=rtnValAry[1];
		   getCtrtInfo(formObj.s_ctrt_no);
	}
}

function getPoNo(){
	var poNo = "";
	for(var i=2;i<=sheet1.RowCount()+1;i++){
		if(sheet1.GetCellValue(i,"itm_po_no")!=""){
			poNo+=sheet1.GetCellValue(i,"itm_po_no")+",";
		}
	}
	poNo =poNo.substr(0,poNo.length-1);
	return poNo;
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
		formObj.opr_cd.value=rtnValAry[0];
		formObj.opr_nm.value=rtnValAry[1];
		formObj.ofc_cd_opr.value=rtnValAry[2];
	}
}

function SU_POPLIST(rtnVal){
	var formObj=document.frm1;
   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
   }else{
	   var rtnValAry=rtnVal.split("|");
	   formObj.splr_rcvr_cd.value=rtnValAry[0];//full_nm
	   formObj.splr_rcvr_nm.value=rtnValAry[2];//full_nm
	   GetRegisterOfficeCd("SUPPLIER");
   }
}

function TR_POPLIST(rtnVal){
   var formObj=document.frm1;
   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
   }else{
	   var rtnValAry=rtnVal.split("|");
	   formObj.trkr_cd.value=rtnValAry[0];//full_nm
	   formObj.trkr_nm.value=rtnValAry[2];//full_nm
	   GetRegisterOfficeCd("TRUCKER");
   }             
}

function CT_POPLIST(rtnVal){
	var formObj  = document.frm1;
	 var r = true;
	   if(sheet1.RowCount() >0){
		   r = confirm("Change Customer will clear all current items, are you sure ?")
	   }
	   if(r){
		   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			   return;
		   }else{
			   var rtnValAry=rtnVal.split("|");
			   formObj.cust_cd.value=rtnValAry[0];//full_nm
			   formObj.cust_nm.value=rtnValAry[2];//full_nm
			   GetRegisterOfficeCd("CUSTOMER");
			   docObjects[0].RemoveAll();
			  // searchItem();
		   }
	   }
}

function OpenCustItmPop(colValue){
	var formObj=document.frm1;
	rtnary=new Array(1);
    rtnary[0]="1";
    rtnary[1]=formObj.s_ctrt_no.value;
    rtnary[2]= colValue;
    rtnary[3]=window;
   
    callBackFunc = "OPEN_CUST_ITM_POP";
	var sUrl="CtrtItemPopup.clt?ctrt_no="+encodeURIComponent(formObj.s_ctrt_no.value)+"&item_cd="+encodeURIComponent(colValue);
//	ComOpenPopup(sUrl, 400, 560, callBackFunc, "0,0", true);
		
	  modal_center_open(sUrl, callBackFunc, 400, 550,"yes");
}

function OPEN_CUST_ITM_POP(rtnVal){
	var formObj = document.frm1;
	   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var row = sheet1.GetSelectRow();
		   var rtnValAry=rtnVal.split("|");
		 //  var itmId = sheet1.GetCellValue(row,"cb_itm_nm");
		   sheet1.SetCellValue(row,"cust_itm_id",rtnValAry[0],0);
		   sheet1.SetCellValue(row,"cb_itm_nm",rtnValAry[1],0);
		   setItemGrid(rtnVal);
		   
//			var xml = loadDftItmVal(rtnValAry[2]);
//			displayDftItmVal(xml,row)
			setTotal(row);
	   }    
	
}

//#561
//[LOA] registered item info does not come together when searching item
function searchCustItem(reqVal){
	var formObj = document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				var row = sheet1.GetSelectRow();
				var arrVal = rtnArr[0].split("|");
				
				sheet1.SetCellValue(row,"cust_itm_id",arrVal[0],0);
				sheet1.SetCellValue(row,"cb_itm_nm",arrVal[1],0);

				setItemGrid(rtnArr[0]);
				setTotal(row);
			}
		}
	}
}

function setItemGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			var rtnValArr = rtnVal.split("|");
			var sheetObj=sheet1;
			var prefix="";
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_cd",rtnValArr[0],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_nm",rtnValArr[1],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"ctrt_no",rtnValArr[2],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_sys_no",rtnValArr[3],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lot_no",rtnValArr[4],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_cbm",rtnValArr[8],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_cbf",rtnValArr[9],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_grs_kgs",rtnValArr[10],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_grs_lbs",rtnValArr[11],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_net_kgs",rtnValArr[12],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_net_lbs",rtnValArr[13],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv1_qty",rtnValArr[7],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv1_unit_cd",rtnValArr[15],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv2_qty",rtnValArr[5],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv2_unit_cd",rtnValArr[6],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv3_qty",rtnValArr[16],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv3_unit_cd",rtnValArr[17],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv4_qty",rtnValArr[18],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv4_unit_cd",rtnValArr[19],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_info",rtnValArr[20],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"curr_cd",rtnValArr[21],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"unit_price",rtnValArr[22],0);
			
/*			if (!ComIsNull(sheetObj.GetCellValue(sheetObj.GetSelectRow(), prefix+"item_nm"))) {
				sheetObj.SetCellEditable(sheetObj.GetSelectRow(), prefix+"item_nm",0);
			}	
			// item sys no 존재시					
			if (!ComIsNull(sheetObj.GetCellValue(sheetObj.GetSelectRow(), prefix + "item_sys_no"))) {
				// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
				fnCalcItemEaQty(sheetObj, sheetObj.GetSelectRow(), "");
			}
*/		 }
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

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
	for(i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }

	formObj.cre_file_no.value="AUTO";
	setControlStatus("ONLOAD");
	
	document.getElementById("sh_ut_tp_cd").innerHTML = h_ut_tp_cd;
	
//	frm1.f_ttl_amt.value=doMoneyFmt(Number(frm1.f_ttl_amt.value).toFixed(2));
//	formObj.f_pck_qty.value  = doMoneyFmt(formObj.f_pck_qty.value);
//	formObj.f_grs_wgt.value  = doMoneyFmt(formObj.f_grs_wgt.value);
//	formObj.f_grs_wgt1.value = doMoneyFmt(formObj.f_grs_wgt1.value);
//	formObj.f_meas.value 	 = doMoneyFmt(formObj.f_meas.value);
//	formObj.f_meas1.value 	 = doMoneyFmt(formObj.f_meas1.value);
//    if(formObj.t_wh_recp_no.value == "") {
//    	formObj.f_save_sts_flg.value="I";
//    	// Entry 로 직접 Onload 시에 W/H Location 에 Default 는 OFFICE 정보 (OFFICE CODE + MAINCMP) 적용
//    } else {
//    	formObj.f_save_sts_flg.value="U";
//    }
    	//formObj.btn_cust.disabled = true;

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
	           var HeadTitle1 = "|DEL|Item|Item|Unit|Inner Qty.|Qty.|EA|Total Qty|Location|Item Description|P/O No.|Unit|Unit|Unit|Dim Weight|Dim Weight|Actual Weight|Actual Weight|Volume|Volume" ;
	           var HeadTitle2 = "|DEL|Item|Item|Unit|Inner Qty.|Qty.|EA|Total Qty|Location|Item Description|P/O No.|L|W|H|KG|LB|KG|LB|CBM|CFT" ;
//	           var HeadTitle1 = getLabel('WHM_WHM_0005_HDR1');
//	           var HeadTitle2 = getLabel('WHM_WHM_0005_HDR2') ;
	           var headers = [ { Text:HeadTitle1, Align:"Center"},
	                       { Text:HeadTitle2, Align:"Center"} ];
	           InitHeaders(headers, info);
	
	           var cols = [   {Type:"Status",    Hidden:1,  Width:20,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
			                  {Type:"DelCheck",  Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, HeaderCheck:0},
			                  {Type:"Popup",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"cust_itm_id",   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                  {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"cb_itm_nm",     KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                  {Type:"Popup",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"cb_ut_cd",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
			                  {Type:"Int",       Hidden:0,  Width:75,   Align:"Right",   ColMerge:1,   SaveName:"itm_inr_qty",   KeyField:1,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:7 },
			                  {Type:"AutoSum",   Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"itm_ctn_qty",   KeyField:1,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
			                  {Type:"AutoSum",   Hidden:1,  Width:40,   Align:"Right",   ColMerge:1,   SaveName:"itm_ea_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
			                  {Type:"AutoSum",   Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"itm_total_qty", KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:7 },
			                  {Type:"Combo",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"cb_loc_id",     KeyField:0,   CalcLogic:"",   Format:"",       	 PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                  {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"itm_desc",      KeyField:0,   CalcLogic:"",   Format:"",       	 PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                  {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"itm_po_no",     KeyField:0,   CalcLogic:"",   Format:"",       	 PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
			                  {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"itm_len",       KeyField:0,   CalcLogic:"",   Format:"Float",   	 PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
			                  {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"itm_wdt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
			                  {Type:"Float",  	 Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"itm_hgt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
			                  {Type:"AutoSum",   Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"itm_dim_wgt",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			                  {Type:"AutoSum",   Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"itm_dim_wgt_lbs",  KeyField:0,   CalcLogic:"",   Format:"Float",    PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                  {Type:"AutoSum",   Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"itm_act_wgt",      KeyField:0,   CalcLogic:"",   Format:"Float",    PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			                  {Type:"AutoSum",   Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"itm_act_wgt_lbs",  KeyField:0,   CalcLogic:"",   Format:"Float",    PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                  {Type:"AutoSum",   Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"itm_vol",          KeyField:0,   CalcLogic:"",   Format:"Float",    PointCount:5,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
			                  {Type:"AutoSum",   Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"itm_vol_cft",      KeyField:0,   CalcLogic:"",   Format:"Float",    PointCount:5,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                  {Type:"Text",      Hidden:1,  Width:0,    Align:"Right",   ColMerge:1,   SaveName:"itm_ut_cd",        KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                  {Type:"Text",      Hidden:1,  Width:0,    Align:"Right",   ColMerge:1,   SaveName:"itm_loc_id",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                  {Type:"Text",      Hidden:1,  Width:0,    Align:"Right",   ColMerge:1,   SaveName:"itm_loc_cd",       KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
			                  {Type:"Int",       Hidden:1,  Width:0,    Align:"Right",   ColMerge:1,   SaveName:"itm_bgn_bal_qty",  KeyField:0,   CalcLogic:"",   Format:"Integer",  PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
			                  {Type:"Int",       Hidden:1,  Width:0,    Align:"Right",   ColMerge:1,   SaveName:"itm_endg_bal_qty", KeyField:0,   CalcLogic:"",   Format:"Integer",  PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
			                  {Type:"Text",      Hidden:1,  Width:0,    Align:"Right",   ColMerge:1,   SaveName:"item_sys_no",      KeyField:0,   CalcLogic:"",   Format:"",         PointCount:0,   UpdateEdit:1,   InsertEdit:1},
			                  {Type:"Float",     Hidden:1, Width:150,   Align:"Right",   ColMerge:0,   SaveName:"org_qty",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
					          {Type:"Text",      Hidden:1, Width:150,   Align:"Center",  ColMerge:0,   SaveName:"load_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				           // 
				             {Type:"Int",        Hidden:1, Width:150,   Align:"Center",  ColMerge:0,   SaveName:"item_seq",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",       Hidden:1, Width:150,   Align:"Center",  ColMerge:0,   SaveName:"ctrt_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",       Hidden:1, Width:150,   Align:"Center",  ColMerge:0,   SaveName:"lot_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Float",      Hidden:1, Width:60,    Align:"Right",   ColMerge:1,   SaveName:"pkg_lv1_qty",     KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:WMS_QTY_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				             {Type:"Text",       Hidden:1, Width:150,   Align:"Center",  ColMerge:0,   SaveName:"pkg_lv1_unit_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Float",      Hidden:1, Width:60,    Align:"Right",   ColMerge:1,   SaveName:"pkg_lv2_qty",     KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:WMS_QTY_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				             {Type:"Text",       Hidden:1, Width:150,   Align:"Center",  ColMerge:0,   SaveName:"pkg_lv2_unit_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Float",      Hidden:1, Width:60,    Align:"Right",   ColMerge:1,   SaveName:"pkg_lv3_qty",     KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:WMS_QTY_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				             {Type:"Text",       Hidden:1, Width:150,   Align:"Center",  ColMerge:0,   SaveName:"pkg_lv3_unit_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Float",      Hidden:1, Width:60,    Align:"Right",   ColMerge:1,   SaveName:"pkg_lv4_qty",     KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:WMS_QTY_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				             {Type:"Text",       Hidden:1, Width:150,   Align:"Center",  ColMerge:0,   SaveName:"pkg_lv4_unit_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Float",      Hidden:1, Width:60,    Align:"Right",   ColMerge:1,   SaveName:"lv1_cbm",         KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:MST_CBM_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				             {Type:"Float",      Hidden:1, Width:60,    Align:"Right",   ColMerge:1,   SaveName:"lv1_cbf",         KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:MST_CBM_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				             {Type:"Float",      Hidden:1, Width:60,    Align:"Right",   ColMerge:1,   SaveName:"lv1_grs_kgs",     KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:MST_CBM_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				             {Type:"Float",      Hidden:1, Width:60,    Align:"Right",   ColMerge:1,   SaveName:"lv1_grs_lbs",     KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:MST_CBM_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				             {Type:"Float",      Hidden:1, Width:60,    Align:"Right",   ColMerge:1,   SaveName:"lv1_net_kgs",     KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:MST_CBM_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				             {Type:"Float",      Hidden:1, Width:60,    Align:"Right",   ColMerge:1,   SaveName:"lv1_net_lbs",     KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:MST_CBM_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
				             {Type:"Text",       Hidden:1, Width:150,   Align:"Left",    ColMerge:0,   SaveName:"pkg_info",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",       Hidden:1, Width:150,   Align:"Left",    ColMerge:0,   SaveName:"curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Text",       Hidden:1, Width:150,   Align:"Left",    ColMerge:0,   SaveName:"unit_price",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 }
			       
	                  ];
	            
	           InitColumns(cols);
	
	           SetEditable(1);
	           SetHeaderRowHeight(20);
	           SetHeaderRowHeight(21);
//	           InitViewFormat(0, "itm_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	           SetSheetHeight(210);
	           SetColProperty('cb_ut_cd', {ComboText:UNITCD1, ComboCode:UNITCD2} );
	           resizeSheet();
           }                                                      
           break;
         case 2:
             with (sheetObj) {
                 var HeadTitle = "";
                 SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 , ColResize:1} );

                 var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
                 var headers = [ { Text:HeadTitle, Align:"Center"} ];
                 InitHeaders(headers, info);
                 var cols = [{Type:"Status",    Hidden:1,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"a" }];
                 InitColumns(cols);
                 SetEditable(1);
                 SetVisible(0);
         	}
             break;
     }
}

function sheet1_OnPopupClick(sheetObj, Row, Col) {
	var formObj = document.frm1;
	var colName=sheetObj.ColSaveName(Col);
	var colValue=sheetObj.GetCellValue(Row, Col) ;
	
	if(colName == "cust_itm_id"){
		if (isNull(formObj.s_ctrt_no)) {
			ComShowCodeMessage("COM0278", "Contract No");
			 sheet1.SetCellValue(Row,"cb_itm_nm","",0);
			 sheet1.SetCellValue(Row,"cust_itm_id","",0);
			return;
		}
		OpenCustItmPop(colValue);
	}else if(colName == "cb_ut_cd"){
		 callBackFunc = "setPkgunitGrid";
		var sUrl="CommonCodePopup.clt?grp_cd=A6&code="+colValue+"&wh_flag=Y&ctrt_no="+encodeURIComponent(ComGetObjValue(formObj.s_ctrt_no)) +"&item_sys_no="+sheetObj.GetCellValue(Row, "item_sys_no");
		modal_center_open(sUrl, callBackFunc, 450, 520, "0,0", true);
	}
	
}

function setPkgunitGrid(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var arrVal = rtnVal.split("|");
		   var row = sheet1.GetSelectRow();
			// remove when new_Unit != cr_Unit
				if( sheet1.GetCellValue(row, "cb_ut_cd")!= arrVal[1]){
					sheet1.SetCellValue(row,"itm_inr_qty",0,0);
					sheet1.SetCellValue(row,"itm_ctn_qty",0,0);
					sheet1.SetCellValue(row,"itm_ea_qty",0,0);
					sheet1.SetCellValue(row,"itm_total_qty",0,0);
					sheet1.SetCellValue(row,"itm_len",0,0);
					sheet1.SetCellValue(row,"itm_wdt",0,0);
					sheet1.SetCellValue(row,"itm_hgt",0,0);
					sheet1.SetCellValue(row,'itm_dim_wgt',0,0);
					sheet1.SetCellValue(row, "itm_dim_wgt_lbs",0,0);
					sheet1.SetCellValue(row,'itm_act_wgt',0,0);
					sheet1.SetCellValue(row, "itm_act_wgt_lbs",0,0);
					sheet1.SetCellValue(row,'itm_vol',0,0);
					sheet1.SetCellValue(row, "itm_vol_cft",0,0);
				}
		   sheet1.SetCellValue(sheet1.GetSelectRow(), "cb_ut_cd",arrVal[1],0);
	   }
	// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
//	fnCalcItemEaQty(sheetObj, sheetObj.GetSelectRow(), sheetObj.GetSelectCol());
	ajaxSendPost(getInfo_Item_byCtrtNo_UnitCd, 'reqVal', '&goWhere=aj&bcKey=getInfo_Item_byCtrtNo_UnitCd&ctrt_no='+encodeURIComponent(formObj.s_ctrt_no.value)+"&unit_cd="+arrVal[1]+"&itm_cd="+ sheet1.GetCellValue(sheet1.GetSelectRow(), "cust_itm_id"), './GateServlet.gsl');
}

function getInfo_Item_byCtrtNo_UnitCd(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				var arrVal = rtnArr[0].split("|");
				sheet1.SetCellValue(sheet1.GetSelectRow(),"itm_inr_qty",arrVal[0],0);
				if(arrVal[0] == ""){
					alert("The item unit is not valid ");
					sheet1.SetCellValue(sheet1.GetSelectRow(), "cb_ut_cd", "", 0);
					return;
				}
				if(arrVal.length > 2){
					var row = sheet1.GetSelectRow();
					var itmL = 0;
					var itmW = 0;
					var itmH = 0;

					if(arrVal[7] == "INCH" && h_ut_tp_cd == "CM"){
						itmW = Number(arrVal[1]) * 2.54;
						itmL = Number(arrVal[2]) * 2.54;
						itmH = Number(arrVal[3]) * 2.54;							
					}
					else if(arrVal[7] == "CM" && h_ut_tp_cd == "INCH"){
						itmW = Number(arrVal[1]) * 0.393701;
						itmL = Number(arrVal[2]) * 0.393701;
						itmH = Number(arrVal[3]) * 0.393701;
					}
					else{
						itmW = arrVal[1];
						itmL = arrVal[2];
						itmH = arrVal[3];
					}
				
/*					
//					if(arrVal[7] == "CM"){
					if(h_ut_tp_cd == "CM"){
						itmW = Number(arrVal[1]) * 2.54;
						itmL = Number(arrVal[2]) * 2.54;
						itmH = Number(arrVal[3]) * 2.54;
					}else{
						itmW = arrVal[1];
						itmL = arrVal[2];
						itmH = arrVal[3];
					}
*/
					sheet1.SetCellValue(row,"itm_wdt",itmW,0);
					sheet1.SetCellValue(row,"itm_len",itmL,0);
					sheet1.SetCellValue(row,"itm_hgt",itmH,0);
					
//					sheet1.SetCellValue(row,"itm_wdt",arrVal[1],0);
//					sheet1.SetCellValue(row,"itm_len",arrVal[2],0);
//					sheet1.SetCellValue(row,"itm_hgt",arrVal[3],0);
					sheet1.SetCellValue(row,'itm_dim_wgt',arrVal[4],0);
					sheet1.SetCellValue(row, "itm_dim_wgt_lbs",roundXL(arrVal[4] * CNVT_CNST_KG_LB, 2),0);
					sheet1.SetCellValue(row,'itm_act_wgt',arrVal[5],0);
					sheet1.SetCellValue(row, "itm_act_wgt_lbs",roundXL(arrVal[5] * CNVT_CNST_KG_LB, 2),0);
					sheet1.SetCellValue(row,'itm_vol',arrVal[6],0);
					sheet1.SetCellValue(row, "itm_vol_cft",roundXL(arrVal[6] *35.3147, 2),0);
				}
			}
		}
	}
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

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
		ComShowMessage(getLabel('COM_FRT_ALT002'));
		return false;
	}
	if(obj>23 || obj<0){
		//HOUR: 0-23
		ComShowMessage(getLabel('COM_FRT_ALT002'));
		return false;
	}else{
		return true;
	}
}
function minuteCheck(obj){
	if(isNaN(obj)){
		ComShowMessage(getLabel('COM_FRT_ALT003'));
		return false;
	}
	if(obj>59 || obj<0){
		//alert('0-59');
		ComShowMessage(getLabel('COM_FRT_ALT003'));
		return false;
	}else{
		return true;
	}
}

function doDisplay(doWhat,formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
            var cal=new ComCalendar();
            cal.select(formObj.rcv_shp_dt,  'MM-dd-yyyy');
        break;
        case 'DATE2':    //달력 조회 팝업 호출      
            var cal=new ComCalendar();
            cal.select(formObj.estm_rcv_dt,  'MM-dd-yyyy');
        break;
    }
}

function convertDate(inputFormat) {
	var year        = inputFormat.substring(0,4);
	var month       = inputFormat.substring(4,6);
	var day         = inputFormat.substring(6,8);
//    var d = new Date(inputFormat);
//    var month = d.getMonth()+1;
//    var date = d.getDate();
//    var year = d.getFullYear();
	
	  return [month, day, year].join('-');
}

var originRcvFlg = -1;

function displayData(xml){
	  var formObj = document.frm1;
	  var xmlDoc = $.parseXML(xml);
	  var $xml = $(xmlDoc);
	  
	  if($xml.find( "file_no").text() == "" ){ 
		  //If file_no blank, it'is mean nothing to load more
		  return;
	  }
	  $("#cre_file_no").val($xml.find( "file_no").text());
	  $("#rcv_shp_tp_cd").val($xml.find( "rcv_shp_tp_cd").text());
	  $("#cust_cd").val($xml.find( "cust_cd").text());
	  $("#cust_nm").val($xml.find( "cust_nm").text());
	  //searchItem(); //load combobox Item depend on cust_cd
	  $("#splr_rcvr_cd").val($xml.find( "splr_rcvr_cd").text());
	  $("#splr_rcvr_nm").val($xml.find( "splr_rcvr_nm").text());
	  $("#trkr_cd").val($xml.find( "trkr_cd").text());
	  $("#trkr_nm").val($xml.find( "trkr_nm").text());
	  $("#cust_ref_no").val(htmlDecode($xml.find( "cust_ref_no").text()));
	  $("#inter_rmk").val(htmlDecode($xml.find( "inter_rmk").text()));
	  $("#xter_rmk").val(htmlDecode($xml.find( "xter_rmk").text()));
	  $("#estm_rcv_dt").val(convertDate($xml.find( "estm_rcv_dt").text()));
	  $("#plt_no").val($xml.find( "plt_no").text());
//	  String sCtrtNo = URLDecoder.decode((String)$xml.find( "cntr_no").text(), "UTF-8");
	  
	  $("#cntr_no").val(htmlDecode($xml.find( "cntr_no").text()));
	  
	  $("#mst_bl_no").val(htmlDecode($xml.find( "mst_bl_no").text()));
	  $("#hus_bl_no").val(htmlDecode($xml.find( "hus_bl_no").text()));

	  $("#ofc_cd_cust").val($xml.find( "cust_ofc_cd").text());
	  $("#ofc_cd_splr").val($xml.find( "splr_rcvr_ofc_cd").text());
	  $("#ofc_cd_trkr").val($xml.find( "trkr_ofc_cd").text());
	  $("#ofc_cd_opr").val($xml.find( "opr_ofc_cd").text());
	  $("#s_ctrt_no").val(htmlDecode($xml.find( "ctrt_no").text()));
	  $("#ctrt_nm").val($xml.find( "ctrt_nm").text());

	  $("#opr_cd").val($xml.find( "opr_cd").text());
	  $("#opr_nm").val($xml.find( "opr_nm").text());
	  
	  if($xml.find( "len_ut_cd").text() !="" && $xml.find( "len_ut_cd").text() != null){
		  h_ut_tp_cd  =  $xml.find( "len_ut_cd").text();
		  document.getElementById("sh_ut_tp_cd").innerHTML = h_ut_tp_cd;
	  }
	  
	  //LKH::2015-09-26 WMS3.O 긴급수정
	  $("#cre_dt").val($xml.find( "cre_dt").text());

	  for(i=0; i< formObj.f_len_ut_cd.length; i++){
		  if($xml.find( "len_ut_cd").text() == formObj.f_len_ut_cd[i].value){
			  formObj.f_len_ut_cd[i].checked = "Y";
			  break;
		  }
	  }
	   wcd = $xml.find( "wh_cd").text();
	   wnm = $xml.find( "wh_nm").text();
	  addorDelWarehouse("1", wcd, wnm);
	  //set select dropdown warehouse
	  var dd_wh_cd = document.getElementById('wh_cd');
	  for (var i = 0; i < dd_wh_cd.options.length; i++) {
	      if (dd_wh_cd.options[i].value == $xml.find( "wh_cd").text()) {
	    	  dd_wh_cd.selectedIndex = i;
	          break;
	      }
	  }
	  searchLocId(); // get loc id list and set to sheet
	  
	//set select dropdown warehouse
	  var dd_cre_rgst_ofc_cd = document.getElementById('cre_ofc_cd_list');
	  for (var i = 0; i < dd_cre_rgst_ofc_cd.options.length; i++) {
		  if (dd_cre_rgst_ofc_cd.options[i].value == $xml.find( "rgst_ofc_cd").text()) {
			  dd_cre_rgst_ofc_cd.selectedIndex = i;
			  break;
		  }
	  }
	  
	  // Received check box
	  var flg = $xml.find( "rcv_shp_flg").text();
	  var index = (flg == "Y" ? 1:0);
	  originRcvFlg = index;
	  if(index){
		  document.getElementById('rcv_shp_flg').checked = index;   // check 
	  }else{
		  document.getElementById('rcv_shp_flg').checked = index;  //uncheck
	  }
	  if($xml.find( "rcv_shp_dt").text() != ""){			//split data to date and time
		  $("#rcv_shp_dt").val(convertDate($xml.find( "rcv_shp_dt").text()));
		  $("#rcv_shp_tm").val($xml.find("rcv_shp_dt").text().substring(8,10) +":"+$xml.find("rcv_shp_dt").text().substring(10,12));
	  }
	  
}

function clearData(){
	var formObj = document.frm1;
	formObj.s_ctrt_no.disabled =0;
	formObj.btn_ctrt_no.disabled = 0;
	  $("#cre_file_no").val("");
	  $("#file_no").val("");
	  $("#wh_cd").val("");
	  $("#rcv_shp_tp_cd").val("");
	  $("#cust_cd").val("");
	  $("#splr_rcvr_cd").val("");
	  $("#trkr_cd").val("");
	  $("#cust_nm").val("");
	  $("#splr_rcvr_nm").val("");
	  $("#trkr_nm").val("");
	  $("#cust_ref_no").val("");
	  $("#inter_rmk").val("");
	  $("#xter_rmk").val("");
	  $("#opr_cd").val("");
	  $("#estm_rcv_dt").val("");
	  $("#rcv_shp_dt").val("");
	  $("#plt_no").val("");
	  $("#cntr_no").val("");
	  $("#mst_bl_no").val("");
	  $("#hus_bl_no").val("");
	  $("#ofc_cd_cust").val("");
	  $("#ofc_cd_splr").val("");
	  $("#ofc_cd_trkr").val("");
	  $("#ofc_cd_opr").val("");
	  $("#s_ctrt_no").val("");
	  $("#ctrt_nm").val("");
	  //LKH::2015-09-26 WMS3.O 긴급수정
	  $("#cre_dt").val("");
	  $("#rcv_shp_tm").val("");
	  document.getElementById('rcv_shp_flg').checked =  1;
	  formObj.modifyFlg.value = "";
	  formObj.cre_file_no.value="AUTO"
	  docObjects[0].RemoveAll();
	  statusflag = "I";
	  originRcvFlg = -1;
	  isFormChange = 0;
	  rollbackFlg = "N";
	  setControlStatus("CLEAR");
	  addorDelWarehouse("0", wcd, wnm);
	  
	  if(typeof(ofc_size_ut_cd)!='undefined'){
		h_ut_tp_cd = ofc_size_ut_cd;
		document.getElementById("sh_ut_tp_cd").innerHTML = h_ut_tp_cd;
	 }
}

function blCheckInpuVals(){
	var isOk=true;
	
	return isOk;
}

function doSave(question){
	var formObj = document.frm1;
	if(!ValidateForm()) return;
	var r = true;
	
	if(question == "Y"){
		r = confirm("Do you want to save ?");
		show_complete = "Y"
	}
	
	if (r == true) {
		doShowProcess();
		if(formObj.cre_file_no.value == "AUTO" || formObj.cre_file_no.value == ""){
			formObj.cre_file_no.value = "";
		}
		formObj.f_cmd.value =SEARCH01;
		var xml1 = sheet1.GetSaveData("./WHM_WHM_0005_03GS.clt",sheet1.GetSaveString() ,FormQueryString(formObj)+GetSaveData());
		
		var $xml = $($.parseXML(xml1));
		
		$("#cre_file_no").val($xml.find( "file_no").text());
		$("#file_no").val($xml.find( "file_no").text());
		
		//LKH::2015-09-26 WMS3.O 긴급수정
		$("#ofc_cd_list").val($xml.find( "s_ofc_cd").text());

		checkDuplicateFileNo("SAVE");
		if(checkFileNo){
			//alert("Save successfully");
			doSearchReceiving();
			statusflag = "U";
		}else{
			ComShowCodeMessage('COM12227');
//			alert("Save data fail, please check again !");
		}
	}
	doHideProcess();
}

function checkSaveStatus(){
	var formObj = document.frm1;
	checkDuplicateFileNo("SAVE");
	if(checkFileNo){
		//alert("Save successfully");
		doSearchReceiving();
		statusflag = "U";
		return true;
	}else{
		ComShowCodeMessage('COM12227');
//		alert("Save data fail, please check again !");
		return false;
	}
}

function getNewFileNo(){
	var formObj = document.frm1;
	doShowProcess();
	var params = "?f_cmd="+SEARCH02+"&ofc_cd="+formObj.cre_ofc_cd_list.value;
	var xml1 = sheet2.GetSearchData("./WHM_WHM_0005_03GS.clt"+params);
	var $xml = $($.parseXML(xml1));
	$("#cre_file_no").val($xml.find( "file_no").text());
	doHideProcess();
//	doWork("SET_FILE_NO");
}

function setNewFileNo(){
	var formObj = document.frm1;
	var params = "?f_cmd="+SEARCH03+"&ofc_cd="+formObj.cre_ofc_cd_list.value;
		sheet2.DoSearch("./WHM_WHM_0005_02GS.clt"+params);
}

function sheet2_OnSaveEnd(code){
//	if(code == 0){
//		alert(code);
//		doWork("SET_FILE_NO");
//	}
}
function ValidateForm(){
	var formObj = document.frm1;
	
	//#3322-[UCB] [WMS3.0] SHIPPING ITEM DELETED, BUT STILL SHOWS AS SHIPPED
	var chkIbflag ="";
	var chkRcv_shp_flg = formObj.rcv_shp_flg.checked?"Y":"N";
	for(i = 2; i< sheet1.LastRow(); i++){
		//#3322-[UCB] [WMS3.0] SHIPPING ITEM DELETED, BUT STILL SHOWS AS SHIPPED
		if(sheet1.GetCellValue(i,"ibflag")=="D"){
			if(chkRcv_shp_flg =="Y"){
				ComShowCodeMessage('COM12250');
				//alert('Received processing and item deletion can not be processed simultaneously.\n\nDelete the Item first and process it Received.');
				return;
			}
		}
		
		for(var j = i+1; j< sheet1.LastRow();j++){
			if(sheet1.GetCellValue(i,"cust_itm_id") == sheet1.GetCellValue(j,"cust_itm_id") && sheet1.GetCellValue(i,"cb_ut_cd") == sheet1.GetCellValue(j,"cb_ut_cd")){
				if(sheet1.GetCellValue(i,"itm_loc_cd") == sheet1.GetCellValue(j,"itm_loc_cd")){
					// return true if there are two pair of same item and same location in the grid
					ComShowCodeMessage('COM12228',(i-1));
					return false;
				}
			}
		}
		
		if(sheet1.GetCellValue(i,2) == "" || sheet1.GetCellValue(i,3) == ""){
			ComShowCodeMessage('COM12229');
//			alert("Item can not be blank, please select one!");
			sheet1.SelectCell(i,"cust_itm_id",1);
			return false;
		}
		//LKH::2015-09-26 WMS3.O 긴급수정
		if(sheet1.GetCellValue(i,'cb_ut_cd') == 0){
			ComShowCodeMessage('COM12229');
//			alert("Item can not be blank, please select one!");
			sheet1.SelectCell(i,"cb_ut_cd",1);
			return false;
		}
		
		if(sheet1.GetCellValue(i,'itm_inr_qty') == 0){
			ComShowCodeMessage('COM12230');
//			alert("Inner Quantity must be greater than 0 !");
			sheet1.SelectCell(i,'itm_inr_qty',1);
			return false;
		}
		/*if(sheet1.GetCellValue(i,'itm_ctn_qty') == 0){
			ComShowCodeMessage('COM12231');
//			alert("Carton Quantity must be greater than 0 !");
			sheet1.SelectCell(i,'itm_ctn_qty',1);
			return false;
		}*/
		
		if(sheet1.GetCellValue(i,'itm_total_qty') == 0){
			ComShowCodeMessage('COM12247');
//			alert("Total Quantity must be greater than 0 !");
			sheet1.SelectCell(i,'itm_total_qty',1);
			return false;
		}
	}
	
	if((formObj.cre_file_no.value != "AUTO" || formObj.cre_file_no.value != "") && statusflag == "I"){
		checkDuplicateFileNo("SAVE");
		if(checkFileNo == true){
			ComShowCodeMessage('COM12232');
//			alert("This Filling No is existed! Please check again!");
			return false;
		}
	}
	 if (formObj.wh_cd.value == ""){
		 ComShowCodeMessage('COM12233');
//		alert("Please select Warehouse !");
		formObj.wh_cd.focus();
		return false;
	}

	if(formObj.s_ctrt_no.value == ""){
		ComShowCodeMessage('COM132606');
//		alert("Please input Customer!");
		formObj.s_ctrt_no.focus();
		return false;
	}
	if(formObj.cust_cd.value == ""){
		ComShowCodeMessage('COM12234');
//		alert("Please input Customer!");
		formObj.cust_cd.focus();
		return false;
	}
	if(formObj.rcv_shp_flg.checked){
		if(formObj.opr_cd.value == "" ){
			ComShowCodeMessage('COM12235');
//			alert("Please select Received_by !");
			formObj.opr_cd.focus();
			return false;
		}
		if(formObj.rcv_shp_dt.value == ""){
			ComShowCodeMessage('COM12236');
//			alert("Please input received date!");
			formObj.rcv_shp_dt.focus();
			return false;
		}
		if(formObj.rcv_shp_tm.value == "" ){
//			alert("Please input received time!");
			ComShowCodeMessage('COM12237');
			formObj.rcv_shp_tm.focus();
			return false;
		}

//		for(i = 2; i< sheet1.LastRow(); i++){
//			if(sheet1.GetCellText(i,"cb_loc_id") == ""){
//				alert("Location must be selected for set Received status!");
//				sheet1.SelectCell(i,"cb_loc_id");
//				return false;
//			}
//		}
		var param = "";
	    param += "cust_cd=" + formObj.cust_cd.value;
	    param += "&wh_cd=" + formObj.wh_cd.value;
	    param += "&rcv_shp_dt=" + formObj.rcv_shp_dt.value;
	    var sXml = sheet1.GetSearchData("./WHM_WHM_0005_08GS.clt", param + "&f_cmd=" + MODIFY);
	    var xmlDoc = $.parseXML(sXml);
	        var $xml = $(xmlDoc);
	        var in_cnt = $xml.find( "in_cnt").text();
	    if(in_cnt != ""){
	        ComShowCodeMessage('COM1510087');
	        return false;
	    }
	}
	
		if(sheet1.RowCount() == 0 ){
	//		alert("At least one item must be added.");
			ComShowCodeMessage('COM12238');
			return false;
		}
		
		for(i = 2; i< sheet1.LastRow(); i++){
			if(sheet1.GetCellValue(i,0) == "R"){
				sheet1.SetCellValue(i,0,"U");
			}
		}
	return true;
}

Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();
    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
   };

function GetSaveData(){
	// Warehouse
	var formObj = document.frm1;
	if(formObj.cre_file_no.value == "AUTO" || formObj.cre_file_no.value == ""){
		formObj.cre_file_no.value = "";
	}
	var rcv_shp_flg = formObj.rcv_shp_flg.checked?"Y":"N";
	var originRcvSaveFlg ="";
	if(originRcvFlg){
		originRcvSaveFlg = "Y";
	}else if(!originRcvFlg){
		originRcvSaveFlg = "N";
	}else{
		originRcvSaveFlg = "NA";
	}
	var full_rcv_dt;
	var full_estm_dt;
	
	var estm_dt = new Date(formObj.estm_rcv_dt.value);
	full_estm_dt =estm_dt.yyyymmdd()+"0000";
	
	if(formObj.rcv_shp_dt.value !="" && formObj.rcv_shp_tm.value !=""){
		var rcv_tm = formObj.rcv_shp_tm.value.replaceStr(":","");
		var rcv_dt = new Date(formObj.rcv_shp_dt.value);
		full_rcv_dt =rcv_dt.yyyymmdd()+rcv_tm;
//		if(formObj.rcv_shp_dt.value.search("00:00:00.0") != -1){
//			formObj.full_rcv_dt.value = formObj.rcv_shp_dt.value.replace("00:00:00.0",rcv_hour +":"+ rcv_minute +":00.0");
//		}else{
//			formObj.full_rcv_dt.value = formObj.rcv_shp_dt.value+" "+rcv_hour +":"+ rcv_minute +":00.0";
//		}
	}else{
		full_rcv_dt = "";
	}
	
	var len_ut_cd = h_ut_tp_cd;
/*	if(formObj.f_len_ut_cd[0].checked){
		len_ut_cd=formObj.f_len_ut_cd[0].value;
	}else{
		len_ut_cd=formObj.f_len_ut_cd[1].value;
	}
*/	
	// Replace special character
//	var inter = replaceWordChars(formObj.inter_rmk.value);
//	var exten = replaceWordChars(formObj.xter_rmk.value);
//	encodeURIComponent(formObj.inter_rmk.value)
//	encodeURIComponent(formObj.xter_rmk.value)
	var paramString =
	  "&statusflag="	+ statusflag
	 +"&rcv_shp_flg="     + rcv_shp_flg
	 +"&full_estm_rcv_dt="     + full_estm_dt
	 +"&full_rcv_shp_dt=" 	+ full_rcv_dt
	 +"&originRcvFlg=" 	+ originRcvSaveFlg
	 +"&rollbackFlg=" 	+ rollbackFlg
	 +"&len_ut_cd=" 	+ len_ut_cd;
//	 +"&file_no="		+ formObj.cre_file_no.value
//	 +"&wh_cd=" 	+  formObj.wh_cd.value
//	 +"&cre_rgst_ofc_cd=" 	+  formObj.cre_ofc_cd_list.value
//	 +"&rcv_shp_tp_cd=" + formObj.rcv_shp_tp_cd.value
//	 +"&cust_cd=" 	+ formObj.cust_cd.value
//	 +"&splr_rcvr_cd=" + formObj.splr_rcvr_cd.value
//	 +"&trkr_cd=" + formObj.trkr_cd.value
//	 +"&cust_ref_no=" + encodeURIComponent(formObj.cust_ref_no.value)
//	 +"&inter_rmk=" + encodeURIComponent(inter)
//	 +"&xter_rmk=" + encodeURIComponent(exten)
//     +"&opr_cd="  + formObj.opr_cd.value
//	 +"&plt_no=" 	+ formObj.plt_no.value
//	 +"&cntr_no=" 	+ formObj.cntr_no.value
//	 +"&mst_bl_no=" 	+ formObj.mst_bl_no.value
//	 +"&hus_bl_no=" 	+ formObj.hus_bl_no.value
//	 +"&cust_ofc_cd=" 	+ formObj.ofc_cd_cust.value
//	 +"&splr_rcvr_ofc_cd=" 	+ formObj.ofc_cd_splr.value
//	 +"&trkr_ofc_cd=" 	+ formObj.ofc_cd_trkr.value
//	 +"&opr_ofc_cd=" 	+ formObj.ofc_cd_opr.value
//	 +"&f_cmd="			+ SEARCH01;
//	 +"&wh_use_flg="+ $("#cbxUse").children("option").filter(":selected").text();
		
	return paramString;
}
function searchLocId(){
	var LOCID='';
	var LOCCD='';
	doShowProcess();
	var formObj = document.frm1;
	var params = "?f_cmd="+SEARCH05 + "&wh_cd="+formObj.wh_cd.value;
	var xml1 = sheet2.GetSearchData("./WHM_WHM_0005_05GS.clt"+params);
	var $xml = $($.parseXML(xml1));
	$xml.find( "loc_id").each(function(){
		LOCID += $(this).text() +'|';
	});
	$xml.find( "loc_cd").each(function(){
		if($(this).text()=="DUMMY"){
			LOCCD += '|';
		}else{
			LOCCD += $(this).text() +'|';
		}
		
	});
	LOCID = LOCID.substring(0, LOCID.length - 1);
	LOCCD = LOCCD.substring(0, LOCCD.length - 1);
    sheet1.SetColProperty('cb_loc_id', {ComboText:LOCCD, ComboCode:LOCID} );
	doHideProcess();
}

function searchItem(){
	var ITM_ID='|';
	var ITM_NAME='|';
	doShowProcess();
	var formObj = document.frm1;
	var params = "?f_cmd="+SEARCH07 + "&cust_cd="+formObj.cust_cd.value;
	var xml1 = sheet2.GetSearchData("./WHM_WHM_0005_07GS.clt"+params);
	var $xml = $($.parseXML(xml1));
	$xml.find( "cust_itm_id").each(function(){
		ITM_ID += $(this).text() +'|';
	});
	$xml.find( "itm_nm").each(function(){
		ITM_NAME += $(this).text() +'|';
	});
	ITM_ID = ITM_ID.substring(0, ITM_ID.length - 1);
	ITM_NAME = ITM_NAME.substring(0, ITM_NAME.length - 1);
    sheet1.SetColProperty('cb_itm_nm', {ComboText:ITM_NAME, ComboCode:ITM_ID} );
	doHideProcess();
}
var saveStatus = false;

function doSearchReceiving(){
	var formObj = document.frm1;
	rollbackFlg = "N";
	if(formObj.file_no.value.split() == "" ){
		ComShowCodeMessage('COM12221');
//		alert("Please enter search condition(s).");
		clearData();
		formObj.file_no.focus();
		return;
	}else{
		checkDuplicateFileNo("SEARCH");
		if(checkFileNo == false){
			ComShowCodeMessage('COM12251');
//			alert("Receiving No. entered does not exist.");
			clearData();
			formObj.file_no.focus();
			return;
		}
	}
	doShowProcess();
	var params = "?f_cmd="+SEARCH + "&file_no="+formObj.file_no.value + "&rgst_ofc_cd="+formObj.ofc_cd_list.value+"&rcv_shp_tp_cd=RCV";
	var xml1 = sheet1.GetSearchData("./WHM_WHM_0005_01GS.clt"+params);
	displayData(xml1);
	doHideProcess();
	if(formObj.cre_file_no.value != ""){
		statusflag = "U";
		formObj.cre_file_no.disabled = 1;
		formObj.cre_ofc_cd_list.disabled = 1;
		formObj.s_ctrt_no.disabled =1;
		formObj.btn_ctrt_no.disabled = 1;
		check_new = formObj.rcv_shp_dt.value;
		//OFVFOUR-7473 - [EXEL] WH INVENTORY MISS LOCATE
		setControlStatus("SEARCH");
		doSearchReceivingItem();
	}else{
		clearData();
	}
	
}

function doSearchReceivingItem(){
	var formObj = document.frm1;
	var params = "f_cmd="+SEARCH04 + "&file_no="+formObj.cre_file_no.value + "&rgst_ofc_cd="+formObj.cre_ofc_cd_list.value+"&rcv_shp_tp_cd=RCV";
//	var xml = 
	sheet1.DoSearch("./WHM_WHM_0005_04GS.clt",params);
//	sheet1.LoadSearchData(xml);
}

function sheet1_OnSearchEnd(){
	processLoadData();
	sheet1.ShowSum();
	sheet1.SetSumText(0,2,"Total");
	sheet1.SetSumText(0,3,"Total");
	sheet1.SetSumText(0,4,"Total");
	sheet1.SetSumText(0,5,"Total");
	sheet1.SetMergeCell(sheet1.LastRow(), 2, 1, 5);
	sheet1.SetMergeCell(sheet1.LastRow(), 9, 1, 6);
	loadSizeType();
	if(show_complete == "Y"){
		showCompleteProcess();
		show_complete = "N";
	}   
//	chkSizeType();
}

function sheet1_OnChange(sheetObj,row,col,val){
	var colNm = sheet1.ColSaveName(col);	
	var formObj=document.frm1;
		switch(colNm){
			case "cust_itm_id":
				ajaxSendPost(searchCustItem, 'reqVal', '&goWhere=aj&bcKey=getWHItem&ctrt_no='+encodeURIComponent(formObj.s_ctrt_no.value)+"&itm_cd="+sheetObj.GetCellValue(row, "cust_itm_id"), './GateServlet.gsl');
			break;
			case "cb_ut_cd":
				if(sheetObj.GetCellValue(row, "item_sys_no") != ""){
					sheetObj.SetCellValue(row,"itm_inr_qty",0,0);
					sheetObj.SetCellValue(row,"itm_ctn_qty",0,0);
					sheetObj.SetCellValue(row,"itm_ea_qty",0,0);
					sheetObj.SetCellValue(row,"itm_total_qty",0,0);
					sheetObj.SetCellValue(row,"itm_len",0,0);
					sheetObj.SetCellValue(row,"itm_wdt",0,0);
					sheetObj.SetCellValue(row,"itm_hgt",0,0);
					sheetObj.SetCellValue(row,'itm_dim_wgt',0,0);
					sheetObj.SetCellValue(row, "itm_dim_wgt_lbs",0,0);
					sheetObj.SetCellValue(row,'itm_act_wgt',0,0);
					sheetObj.SetCellValue(row, "itm_act_wgt_lbs",0,0);
					sheetObj.SetCellValue(row,'itm_vol',0,0);
					sheetObj.SetCellValue(row, "itm_vol_cft",0,0);
					
					ajaxSendPost(getInfo_Item_byCtrtNo_UnitCd, 'reqVal', '&goWhere=aj&bcKey=getInfo_Item_byCtrtNo_UnitCd&ctrt_no='+encodeURIComponent(formObj.s_ctrt_no.value)+"&unit_cd="+sheetObj.GetCellValue(row, "cb_ut_cd")+"&itm_cd="+ sheetObj.GetCellValue(row, "cust_itm_id"), './GateServlet.gsl');
					
				}
			break;
//			case "cb_itm_nm":
//				var itmId = sheet1.GetCellValue(row,"cb_itm_nm");
//				var xml = loadDftItmVal(itmId);
//				displayDftItmVal(xml,row)
//				setTotal(row);
//				break;
			case "itm_inr_qty":
			case "itm_ctn_qty":
			case "itm_ea_qty":
			case "itm_len":
			case "itm_wdt":
			case "itm_hgt":				
				setTotal(row);
				// #1109 - [WH Receiving Entry] IBSheet Text Field Maxlength validation- Can't close message after click OK button
				// Item's units (length / height / width) < 1000, so Changing (from (7,2) to (5,2)) to synchronize with Item Define on Item Management.
				if(colNm == "itm_len" || colNm == "itm_wdt"|| colNm == "itm_hgt"){
					var chkitem = sheetObj.GetCellValue(row, col).split(".");
					if(chkitem[0] == "") return;
					if(parseInt(chkitem[0]) > 999){
						sheetObj.SetCellValue(row, col, 0, 0);
						ComShowCodeMessage('COM0786', "Length / Width / Height");
					}
				}
				
				var length=sheetObj.GetCellValue(row, "itm_len")=="" ? 0 : sheetObj.GetCellValue(row, "itm_len");
				var width=sheetObj.GetCellValue(row, "itm_wdt")=="" ? 0 : sheetObj.GetCellValue(row, "itm_wdt");
				var height=sheetObj.GetCellValue(row, "itm_hgt")=="" ? 0 : sheetObj.GetCellValue(row, "itm_hgt");
				var pcs = sheetObj.GetCellValue(row, "itm_ctn_qty")=="" ? 0 : sheetObj.GetCellValue(row, "itm_ctn_qty");
				var cbm=0;
				var kg=0;
				var sumCbm=0;
				if(h_ut_tp_cd == "CM"){					
//					if(formObj.f_len_ut_cd[0].checked){
					// 센치
					kg=roundXL(length * width * height * pcs / 6000, 5);
					cbm=roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 5);
					sheetObj.SetCellValue(row, "itm_dim_wgt",kg.toFixed(5),0);
					sheetObj.SetCellValue(row, "itm_dim_wgt_lbs",(kg * CNVT_CNST_KG_LB).toFixed(5),0);
					sheetObj.SetCellValue(row, "itm_act_wgt",kg.toFixed(5),0);
					sheetObj.SetCellValue(row, "itm_act_wgt_lbs",(kg * CNVT_CNST_KG_LB).toFixed(5),0);
					sheetObj.SetCellValue(row, "itm_vol",cbm.toFixed(5),0);
					sheetObj.SetCellValue(row, "itm_vol_cft",(cbm * 35.3147).toFixed(5),0);
				}else if(h_ut_tp_cd == "INCH"){
//				}else if(formObj.f_len_ut_cd[1].checked){
					// 인치 
					kg=roundXL(length * width * height * pcs * 2.54 * 2.54 * 2.54 / 6000, 5);
					cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 5);
					sheetObj.SetCellValue(row, "itm_dim_wgt",kg.toFixed(5),0);
					sheetObj.SetCellValue(row, "itm_dim_wgt_lbs",(kg * CNVT_CNST_KG_LB).toFixed(5),0);
					sheetObj.SetCellValue(row, "itm_act_wgt",kg.toFixed(5),0);
					sheetObj.SetCellValue(row, "itm_act_wgt_lbs",(kg * CNVT_CNST_KG_LB).toFixed(5),0);
					sheetObj.SetCellValue(row, "itm_vol",cbm.toFixed(5),0);
					sheetObj.SetCellValue(row, "itm_vol_cft",(cbm * 35.3147).toFixed(5),0);
				}
				break;
			case "itm_dim_wgt":
				sheetObj.SetCellValue(row, "itm_dim_wgt_lbs",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, 5),0);
				break;
			case "itm_dim_wgt_lbs":
				sheetObj.SetCellValue(row, "itm_dim_wgt",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, 5),0);
				break;
			case "itm_act_wgt":
				sheetObj.SetCellValue(row, "itm_act_wgt_lbs",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, 5),0);
				break;
			case "itm_act_wgt_lbs":
				sheetObj.SetCellValue(row, "itm_act_wgt",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, 5),0);
				break;
			case "itm_vol":
				sheetObj.SetCellValue(row, "itm_vol_cft",roundXL(sheetObj.GetCellValue(row, col) *35.3147, 5),0);
				break;
			case "itm_vol_cft":
				sheetObj.SetCellValue(row, "itm_vol",roundXL(sheetObj.GetCellValue(row, col) /35.3147, 5),0);
				break;
			case "cb_loc_id":
				sheetObj.SetCellValue(row, "itm_loc_cd",sheet1.GetCellText(row,'cb_loc_id'),0);
				break;
		}
}

function loadDftItmVal(itemId){
	doShowProcess();
	var params = "?f_cmd="+SEARCH06 + "&cust_itm_id="+itemId;
	var xml = sheet1.GetSearchData("./WHM_WHM_0005_06GS.clt"+params);
	doHideProcess();
	return xml;
}

function displayDftItmVal(xml,row){
	var xmlDoc = $.parseXML(xml);
	  var $xml = $(xmlDoc);
	 // sheet1.SetCellValue(row,'cust_itm_id',sheet1.GetCellValue(row,'cb_itm_nm'),0);
	  sheet1.SetCellValue(row,'cb_ut_cd',$xml.find( "itm_ut_cd").text(),0);
	  sheet1.SetCellValue(row,'itm_inr_qty',$xml.find( "itm_inr_qty").text());
	  sheet1.SetCellValue(row,'itm_dim_wgt',$xml.find( "itm_wgt").text(),0);
	  sheet1.SetCellValue(row,'itm_act_wgt',$xml.find( "itm_wgt").text(),0);
	  sheet1.SetCellValue(row,'itm_vol',$xml.find( "itm_vol").text(),0);
	  sheet1.SetCellValue(row,'itm_len',$xml.find( "itm_len").text(),0);
	  sheet1.SetCellValue(row,'itm_wdt',$xml.find( "itm_wdt").text(),0);
	  sheet1.SetCellValue(row,'itm_hgt',$xml.find( "itm_hgt").text(),0);
	  
}

var processing = false;
function processLoadData(){
	processing = true;
	var formObj = document.frm1;
	
	if(sheet1.RowCount()>0){
		for(i=2; i < sheet1.RowCount() + 2; i++){
			//calculate total quantity   //set value total quantity
			setTotal(i);
			// select Unit_Code combobox
			sheet1.SetCellValue(i,'cb_ut_cd',sheet1.GetCellValue(i,'itm_ut_cd'),0);
			// select Loc_Id combobox
			sheet1.SetCellValue(i,'cb_loc_id',sheet1.GetCellValue(i,'itm_loc_id'));
			// select Itm_nm combobox
			//sheet1.SetCellValue(i,'cb_itm_nm',sheet1.GetCellValue(i,'cust_itm_id'),0);
			//Conversion Unit
			// after process data -> set status to R 
			sheet1.SetCellValue(i,'ibflag','R');
		}
	}
processing = false;
}							

function setTotal(row){
	//calculate total quantity   //set value total quantity
	var total = parseInt(sheet1.GetCellValue(row,"itm_inr_qty")) * parseInt(sheet1.GetCellValue(row,"itm_ctn_qty")) + parseInt(sheet1.GetCellValue(row,"itm_ea_qty")); //calculator total quantity
	sheet1.SetCellValue(row,"itm_total_qty",total,0);
}


function checkDupInsertFileNo(){
	var formObj=document.frm1;
	if(formObj.cre_file_no.value != "" && formObj.cre_file_no.value != "AUTO"){
		checkDuplicateFileNo("SAVE");
		if(checkFileNo){
			ComShowCodeMessage('COM12241', 'Receiving');
//			alert("Duplicated Data!\n" +
//			"W/H Receiving file No.");
			formObj.cre_file_no.value = "AUTO";
		}
	}
}

function checkDuplicateFileNo(doWork){
	var formObj=document.frm1;
	if(doWork == "SEARCH"){
		ajaxSendPost(checkDuplicateFileNoEnd, 'reqVal', '&goWhere=aj&bcKey=checkDuplicateFileNo&file_no='+formObj.file_no.value+'&rgst_ofc_cd='+formObj.ofc_cd_list.value+'&rcv_shp_tp_cd=RCV', './GateServlet.gsl');
	}
	if(doWork == "SAVE"){
		//LKH::2015-09-27 WMS3.O 긴급수정2
		ajaxSendPost(checkDuplicateFileNoEnd, 'reqVal', '&goWhere=aj&bcKey=checkDuplicateFileNo&file_no='+formObj.cre_file_no.value+'&rgst_ofc_cd='+formObj.ofc_cd_list.value+'&rcv_shp_tp_cd=RCV', './GateServlet.gsl');
	}
}
var checkFileNo = false;
function checkDuplicateFileNoEnd(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				checkFileNo = true;
			}else{
				checkFileNo = false;
			}
		}
	}
	
}

var rollbackFlg = "N";
function checkRollback(){
	var formObj=document.frm1;
	if(!formObj.rcv_shp_flg.checked){
		//Keep received time until save success
//		formObj.rcv_shp_dt.value = "";	
//		formObj.rcv_shp_tm.value = "";	
//		formObj.rcv_dt_cal.value = "";	
//		formObj.rcv_shp_dt.disabled = 1;
//		formObj.rcv_shp_tm.disabled = 1;
//		formObj.rcv_dt_cal.disabled = 1;
		
		//2015/10/14 modify to check this receive was closed yet
		if (check_new != ""){
			var param = "";
			param += "cust_cd=" + formObj.cust_cd.value;
			param += "&wh_cd=" + formObj.wh_cd.value;
			param += "&rcv_shp_dt=" + formObj.rcv_shp_dt.value;
			var sXml = sheet1.GetSearchData("./WHM_WHM_0005_08GS.clt", param + "&f_cmd=" + MODIFY);
			var xmlDoc = $.parseXML(sXml);
			var $xml = $(xmlDoc);
			var in_cnt = $xml.find( "in_cnt").text();
			if(in_cnt != ""){
				ComShowCodeMessage('COM1510085');
				formObj.rcv_shp_flg.checked = true;
				return;
			}
		}
        
		if(originRcvFlg == 1){
			var r = confirm("Do you want to cancel Receiving request ?");
			if (!r) {
				formObj.rcv_shp_flg.checked =1;
				rollbackFlg = "N";			
				return;
			}else{
				rollbackFlg = "Y";
				
				//LKH::2015-09-26 WMS3.O 긴급수정
				formObj.rcv_shp_dt.value = "";	
				formObj.rcv_shp_tm.value = "";	
				formObj.rcv_shp_dt.disabled = 1;
				formObj.rcv_shp_tm.disabled = 1;
				formObj.rcv_dt_cal.disabled = 1;
				
				for(i = 2; i< sheet1.LastRow(); i++){
                    if(sheet1.GetCellValue(i,0) == "R"){
                        sheet1.SetCellValue(i,0,"U");
                    }
                }
				doSave("N");
			}
		}else{
			//LKH::2015-09-26 WMS3.O 긴급수정
			formObj.rcv_shp_dt.value = "";	
			formObj.rcv_shp_tm.value = "";	
			formObj.rcv_shp_dt.disabled = 1;
			formObj.rcv_shp_tm.disabled = 1;
			formObj.rcv_dt_cal.disabled = 1;
		}
	} else {
		var objToday = new Date(),	curHour = objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours(),		curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),		curdate = objToday.getDate() < 10 ? "0" +objToday.getDate() : objToday.getDate(),		month = objToday.getMonth()+1,		curMonth = month < 10 ? "0" + month :  month,		curYear = objToday.getFullYear();
		
		formObj.rcv_shp_dt.disabled =0;
		formObj.rcv_shp_tm.disabled = 0;
		formObj.rcv_dt_cal.disabled = 0;
		
		formObj.rcv_shp_dt.value =curMonth+"-"+curdate+"-"+curYear;	
		formObj.rcv_shp_tm.value = curHour +":"+ curMinute;
	}
}
	

function DateUtils(){
	var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	domEnder = new Array( 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th' ),
	dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder[objToday.getDate()] : objToday.getDate() + domEnder[parseFloat(("" + objToday.getDate()).substr(("" + objToday.getDate()).length - 1))],
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear(),
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
	curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
	var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;
}


function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();
	var s_type="";
	if(s_code != ""){
		CODETYPE=str;
		if(str == "commodity") {
			s_type="commodity";
		}else{
			s_type="trdpCode";
		}
		if(tmp == "onKeyDown"){
			
			if(event.keyCode == 13){
				ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
		else if(tmp == "onBlur"){
			if(s_code != ""){
				ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}
	else{
		if(str == "CUSTUMER"){
			formObj.cust_cd.value="";//cust_cd  AS param1
			formObj.cust_nm.value="";//cust_nm   AS param2
		}
		if (str == "commodity") {
			formObj.itm_hts_cd.value="";// itm_hts_cd AS param1
			formObj.itm_hts_nm.value="";// itm_hts_nm AS param2
		}else if(str == "SUPPLIER") {
			formObj.splr_rcvr_cd.value="";// itm_hts_cd AS param1
			formObj.splr_rcvr_nm.value="";// itm_hts_nm AS param2
		}else if(str == "TRUCKER") {
			formObj.trkr_cd.value="";// itm_hts_cd AS param1
			formObj.trkr_nm.value="";// itm_hts_nm AS param2
		}
	}
}

function GetRegisterOfficeCd(custType){
	var formObj=document.frm1;
	switch(custType){
		case "CUSTOMER":
			ajaxSendPost(GetRegisterOfficeCodeCustomer, 'reqVal', '&goWhere=aj&bcKey=GetRegisterOfficeCode&cust_cd='+formObj.cust_cd.value, './GateServlet.gsl');
			break;
		case "SUPPLIER":
			ajaxSendPost(GetRegisterOfficeCodeSupplier, 'reqVal', '&goWhere=aj&bcKey=GetRegisterOfficeCode&cust_cd='+formObj.splr_rcvr_cd.value, './GateServlet.gsl');
			break;
		case "TRUCKER":
			ajaxSendPost(GetRegisterOfficeCodeTrucker, 'reqVal', '&goWhere=aj&bcKey=GetRegisterOfficeCode&cust_cd='+formObj.trkr_cd.value, './GateServlet.gsl');
			break;
		case "OPERATOR":
			ajaxSendPost(GetUserInfo, 'reqVal', '&goWhere=aj&bcKey=GetUserInfo&cust_cd='+formObj.opr_cd.value, './GateServlet.gsl');
			break;
	}
}

function GetRegisterOfficeCodeCustomer(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				formObj.ofc_cd_cust.value = rtnArr[0];
			}
		}
	}
}
function GetRegisterOfficeCodeSupplier(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				formObj.ofc_cd_splr.value = rtnArr[0];
			}
		}
	}
}
function GetRegisterOfficeCodeTrucker(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				formObj.ofc_cd_trkr.value = rtnArr[0];
			}
		}
	}
}
function GetUserInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				formObj.opr_nm.value = rtnArr[0];
			}else{
				formObj.opr_nm.value = "";
			}
			if(rtnArr[1] != "null" && rtnArr[1] != ""){
				formObj.ofc_cd_opr.value = rtnArr[1];
			}else{
				formObj.ofc_cd_opr.value = "";
			}
		}
	}
}

var CODETYPE='';
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(CODETYPE =="CUSTUMER"){
				formObj.cust_cd.value=masterVals[0];	//cust_cd  AS param1
				formObj.cust_nm.value=masterVals[3];	//cust_nm   AS param2
				docObjects[0].RemoveAll();
				//searchItem();
			}
			if(CODETYPE=="SUPPLIER"){
				formObj.splr_rcvr_cd.value=masterVals[0];		//f_cmdt_cd  AS param1
				formObj.splr_rcvr_nm.value=masterVals[3];		//f_cmdt_nm   AS param2
			}
			if(CODETYPE=="TRUCKER"){
				formObj.trkr_cd.value=masterVals[0];		//f_cmdt_cd  AS param1
				formObj.trkr_nm.value=masterVals[3];		//f_cmdt_nm   AS param2
			}
		}
		else{
			if(CODETYPE =="CUSTUMER"){
				formObj.cust_cd.value="";				//cust_cd  AS param1
				formObj.cust_nm.value="";				//cust_nm   AS param2
			}
			if(CODETYPE=="SUPPLIER"){
				formObj.splr_rcvr_cd.value="";				//itm_hts_cd  AS param1
				formObj.splr_rcvr_nm.value="";				//itm_hts_nm   AS param2
			}
			if(CODETYPE=="TRUCKER"){
				formObj.trkr_cd.value="";				//itm_hts_cd  AS param1
				formObj.trkr_nm.value="";				//itm_hts_nm   AS param2
			}
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
var isFormChange = 0;
function formChange(){
	isFormChange = 1;
}
function checkOprCd(){
	var formObj=document.frm1;
	if(formObj.opr_nm.value ==""){
		if(formObj.ofc_cd_opr.value==""){
			formObj.opr_cd.value = "";
		}
	}
}

//Check when onchange ---- khanh
function validNumber(obj){
	var formObj = document.getElementById(obj.id);
    var filter = /^([0-9\.])+$/;
    if (!filter.test(formObj.value)) {
//    	alert("Please input number !");
    	ComShowCodeMessage('COM12178');
    	formObj.value="";
    }
    return true;
}

function chkSizeType(){
	var formObj=document.frm1;
	var sheetObj=sheet1;
	var length=0;
	var width=0;
	var height=0;
	var pcs=0;
	var cbm=0;
	var kg=0;
	var sumCbm=0;
	
	//LHK 20130812 CM에서 INCH SWITCH 할 경우 CMB Auto Calculation 적용
	for(var i=2 ; i<sheetObj.LastRow(); i++){
		length=sheetObj.GetCellValue(i, "itm_len")=="" ? 0 : sheetObj.GetCellValue(i, "itm_len");
		width=sheetObj.GetCellValue(i, "itm_wdt")=="" ? 0 : sheetObj.GetCellValue(i, "itm_wdt");
		height=sheetObj.GetCellValue(i, "itm_hgt")=="" ? 0 : sheetObj.GetCellValue(i, "itm_hgt");
		pcs=sheetObj.GetCellValue(i, "itm_ctn_qty")=="" ? 0 : sheetObj.GetCellValue(i, "itm_ctn_qty");
//		pcs=sheetObj.GetCellValue(i, "itm_total_qty")=="" ? 0 : sheetObj.GetCellValue(i, "itm_total_qty");
		cbm=0;
		kg=0;
		sumCbm=0;
		var status = sheetObj.GetCellValue(i, "ibflag");
		if(h_ut_tp_cd == "CM"){
//			if(formObj.f_len_ut_cd[0].checked){
			// 센치
			kg=roundXL(length * width * height * pcs / 6000, 5);
			cbm=roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 5);
			sheetObj.SetCellValue(i, "itm_dim_wgt",kg.toFixed(5),0);
			sheetObj.SetCellValue(i, "itm_dim_wgt_lbs",(kg * CNVT_CNST_KG_LB).toFixed(5),0);
			sheetObj.SetCellValue(i, "itm_act_wgt",kg.toFixed(5),0);
			sheetObj.SetCellValue(i, "itm_act_wgt_lbs",(kg * CNVT_CNST_KG_LB).toFixed(5),0);
			sheetObj.SetCellValue(i, "itm_vol",cbm.toFixed(5),0);
			sheetObj.SetCellValue(i, "itm_vol_cft",(cbm * 35.3147).toFixed(5),0);
		}else if(h_ut_tp_cd == "INCH"){
//		}else if(formObj.f_len_ut_cd[1].checked){
			// 인치 
			kg=roundXL(length * width * height * pcs * 2.54 * 2.54 * 2.54 / 6000, 5);
			cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 5);
			sheetObj.SetCellValue(i, "itm_dim_wgt",kg.toFixed(5),0);
			sheetObj.SetCellValue(i, "itm_dim_wgt_lbs",(kg * CNVT_CNST_KG_LB).toFixed(5),0);
			sheetObj.SetCellValue(i, "itm_act_wgt",kg.toFixed(5),0);
			sheetObj.SetCellValue(i, "itm_act_wgt_lbs",(kg * CNVT_CNST_KG_LB).toFixed(5),0);
			sheetObj.SetCellValue(i, "itm_vol",cbm.toFixed(5),0);
			sheetObj.SetCellValue(i, "itm_vol_cft",(cbm * 35.3147).toFixed(5),0);
		}
		sheetObj.SetCellValue(i, "ibflag",status);
	}
}

function loadSizeType(){
	var formObj=document.frm1;
	var sheetObj=sheet1;
	var length=0;
	var width=0;
	var height=0;
	var pcs=0;
	var cbm=0;
	var kg=0;
	var sumCbm=0;
	
	//LHK 20130812 CM에서 INCH SWITCH 할 경우 CMB Auto Calculation 적용
	for(var i=2 ; i<sheetObj.LastRow(); i++){
		length=sheetObj.GetCellValue(i, "itm_len")=="" ? 0 : sheetObj.GetCellValue(i, "itm_len");
		width=sheetObj.GetCellValue(i, "itm_wdt")=="" ? 0 : sheetObj.GetCellValue(i, "itm_wdt");
		height=sheetObj.GetCellValue(i, "itm_hgt")=="" ? 0 : sheetObj.GetCellValue(i, "itm_hgt");
		pcs=sheetObj.GetCellValue(i, "itm_ctn_qty")=="" ? 0 : sheetObj.GetCellValue(i, "itm_ctn_qty");
//		pcs=sheetObj.GetCellValue(i, "itm_total_qty")=="" ? 0 : sheetObj.GetCellValue(i, "itm_total_qty");
		cbm=0;
		kg=0;
		sumCbm=0;
		var status = sheetObj.GetCellValue(i, "ibflag");
		if(h_ut_tp_cd == "CM"){
//			if(formObj.f_len_ut_cd[0].checked){
			// 센치
			kg=roundXL(length * width * height * pcs / 6000, 5);
			cbm=roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 5);
			sheetObj.SetCellValue(i, "itm_dim_wgt",parseFloat(sheetObj.GetCellValue(i, "itm_dim_wgt"))!=0 ? parseFloat(sheetObj.GetCellValue(i, "itm_dim_wgt")) : kg.toFixed(5),0);
			sheetObj.SetCellValue(i, "itm_dim_wgt_lbs",parseFloat(sheetObj.GetCellValue(i, "itm_dim_wgt_lbs"))!=0 ? parseFloat(sheetObj.GetCellValue(i, "itm_dim_wgt_lbs")) :(kg * CNVT_CNST_KG_LB).toFixed(5) ,0);
			sheetObj.SetCellValue(i, "itm_act_wgt",parseFloat(sheetObj.GetCellValue(i, "itm_act_wgt"))!=0 ? parseFloat(sheetObj.GetCellValue(i, "itm_act_wgt")) : kg.toFixed(5),0);
			sheetObj.SetCellValue(i, "itm_act_wgt_lbs",parseFloat(sheetObj.GetCellValue(i, "itm_act_wgt_lbs"))!=0 ? parseFloat(sheetObj.GetCellValue(i, "itm_act_wgt_lbs")) :(kg * CNVT_CNST_KG_LB).toFixed(5) ,0);
			sheetObj.SetCellValue(i, "itm_vol",parseFloat(sheetObj.GetCellValue(i, "itm_vol"))!=0 ? parseFloat(sheetObj.GetCellValue(i, "itm_vol")) :cbm.toFixed(5), 0);
			sheetObj.SetCellValue(i, "itm_vol_cft",parseFloat(sheetObj.GetCellValue(i, "itm_vol_cft"))!=0 ? parseFloat(sheetObj.GetCellValue(i, "itm_vol_cft")) :(cbm * 35.3147).toFixed(5),0);
		}else if(h_ut_tp_cd == "INCH"){
//		}else if(formObj.f_len_ut_cd[1].checked){
			// 인치 
			kg=roundXL(length * width * height * pcs * 2.54 * 2.54 * 2.54 / 6000, 5);
			cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 5);
			sheetObj.SetCellValue(i, "itm_dim_wgt",parseFloat(sheetObj.GetCellValue(i, "itm_dim_wgt"))!=0 ? parseFloat(sheetObj.GetCellValue(i, "itm_dim_wgt")) : kg.toFixed(5),0);
			sheetObj.SetCellValue(i, "itm_dim_wgt_lbs",parseFloat(sheetObj.GetCellValue(i, "itm_dim_wgt_lbs"))!=0 ? parseFloat(sheetObj.GetCellValue(i, "itm_dim_wgt_lbs")) :(kg * CNVT_CNST_KG_LB).toFixed(5) ,0);
			sheetObj.SetCellValue(i, "itm_act_wgt",parseFloat(sheetObj.GetCellValue(i, "itm_act_wgt"))!=0 ? parseFloat(sheetObj.GetCellValue(i, "itm_act_wgt")) : kg.toFixed(5),0);
			sheetObj.SetCellValue(i, "itm_act_wgt_lbs",parseFloat(sheetObj.GetCellValue(i, "itm_act_wgt_lbs"))!=0 ? parseFloat(sheetObj.GetCellValue(i, "itm_act_wgt_lbs")) :(kg * CNVT_CNST_KG_LB).toFixed(5) ,0);
			sheetObj.SetCellValue(i, "itm_vol",parseFloat(sheetObj.GetCellValue(i, "itm_vol"))!=0 ? parseFloat(sheetObj.GetCellValue(i, "itm_vol")) :cbm.toFixed(5), 0);
			sheetObj.SetCellValue(i, "itm_vol_cft",parseFloat(sheetObj.GetCellValue(i, "itm_vol_cft"))!=0 ? parseFloat(sheetObj.GetCellValue(i, "itm_vol_cft")) :(cbm * 35.3147).toFixed(5),0);
		}
		sheetObj.SetCellValue(i, "ibflag",status);
	}
}

function setControlStatus(action){
	var formObj=document.frm1;
	var sheetObj=sheet1;
	var objToday = new Date(),	curHour = objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours(),		curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),		curdate = objToday.getDate() < 10 ? "0" +objToday.getDate() : objToday.getDate(),		month = objToday.getMonth()+1,		curMonth = month < 10 ? "0" + month :  month,		curYear = objToday.getFullYear();
	switch(action){
		case "ONLOAD":
			formObj.opr_cd.value = formObj.f_usr_id.value;
			formObj.opr_nm.value = formObj.f_usr_nm.value;
			formObj.ofc_cd_opr.value = formObj.f_ofc_cd.value;

			formObj.btn_Print.disabled = 1;
			
			
			formObj.rcv_shp_dt.disabled =1;
			formObj.rcv_shp_tm.disabled = 1;
			formObj.rcv_dt_cal.disabled = 1;
			
			//formObj.rcv_shp_dt.value =curMonth+"-"+curdate+"-"+curYear;
			formObj.estm_rcv_dt.value =curMonth+"-"+curdate+"-"+curYear;
			//formObj.rcv_shp_tm.value = curHour +":"+ curMinute;
			
			formObj.cre_ofc_cd_list.value = rgst_ofc_cd;
			formObj.ofc_cd_list.value = rgst_ofc_cd;
			
			break;
		case "CLEAR":
			sheetObj.SetEditable(1);
			formObj.btn_add.disabled = 0;
			
			formObj.cre_file_no.disabled = 0;
			formObj.cre_ofc_cd_list.disabled = 0;
			
			formObj.wh_cd.disabled = 0;
			formObj.cust_cd.disabled = 1;
			//formObj.btn_cust.disabled = 1;
			
			formObj.opr_cd.disabled = 0;
			formObj.opr_nm.disabled = 0;
			formObj.btn_rcv.disabled = 0;
			
			formObj.rcv_shp_dt.disabled = 1;
			formObj.rcv_shp_tm.disabled = 1;
			formObj.rcv_dt_cal.disabled = 1;

			formObj.estm_rcv_dt.disabled =0;
			formObj.f_recp_dt_cal.disabled = 0;
			
			formObj.opr_cd.value = formObj.f_usr_id.value;
			formObj.opr_nm.value = formObj.f_usr_nm.value;
			formObj.ofc_cd_opr.value = formObj.f_ofc_cd.value;
			
			//formObj.rcv_shp_dt.value =curMonth+"-"+curdate+"-"+curYear;
			formObj.estm_rcv_dt.value =curMonth+"-"+curdate+"-"+curYear;
			//formObj.rcv_shp_tm.value = curHour +":"+ curMinute;
			
			formObj.rcv_shp_flg.checked = 0;
			
			formObj.btn_Print.disabled = 1;

			formObj.cre_ofc_cd_list.value = rgst_ofc_cd;
			formObj.ofc_cd_list.value = rgst_ofc_cd;
			
			setSelectCm();
			break;
		case "SEARCH":
			formObj.btn_Print.disabled = 0;
			if(formObj.rcv_shp_flg.checked){
				sheetObj.SetEditable(0);
				formObj.btn_add.disabled = 1;
				
				formObj.wh_cd.disabled = 1;
				formObj.cust_cd.disabled = 1;
				//formObj.btn_cust.disabled = 1;
				
				formObj.opr_cd.disabled = 1;
				formObj.opr_nm.disabled = 1;
				formObj.btn_rcv.disabled = 1;
				
				formObj.rcv_shp_dt.disabled =1;
				formObj.rcv_shp_tm.disabled = 1;
				formObj.rcv_dt_cal.disabled = 1;

				formObj.estm_rcv_dt.disabled =1;
				formObj.f_recp_dt_cal.disabled = 1;
			}else{
				sheetObj.SetEditable(1);
				formObj.btn_add.disabled = 0;
				
				formObj.wh_cd.disabled = 0;
				formObj.cust_cd.disabled = 1;
				//formObj.btn_cust.disabled = 1;
				
				formObj.opr_cd.disabled = 0;
				formObj.opr_nm.disabled = 0;
				formObj.btn_rcv.disabled = 0;
				
				//formObj.rcv_shp_dt.disabled =0;
				//formObj.rcv_shp_tm.disabled = 0;
				//formObj.rcv_dt_cal.disabled = 0;
		
				formObj.estm_rcv_dt.disabled =0;
				formObj.f_recp_dt_cal.disabled = 0;
			}
			break;
	}
}
function onBlurTextCounter(textBox, maxLength) {
    if (textBox.value.length > maxLength)
        textBox.value = textBox.value.substr(0, maxLength);
}


function getCtrtInfo(obj){
	var formObj=document.frm1;
	if(obj.value ==""){
		formObj.s_ctrt_no.value="";
		formObj.ctrt_nm.value="";
		formObj.cust_cd.value = "";
		formObj.cust_nm.value = "";
		return;
	}
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCtrtInfo&ctrt_no='+encodeURIComponent(obj.value), './GateServlet.gsl');
//	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=searchCtrtInfo&s_code='+obj.value, './GateServlet.gsl');
}

function resultCtrtInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr = doc[1].split('^@');
		if(rtnArr[0]!=""){
			formObj.ctrt_nm.value = rtnArr[0];
		}else{
//			ComShowCodeMessage("COM0029");
			formObj.s_ctrt_no.value = "";
			formObj.ctrt_nm.value = "";
		}
		formObj.cust_cd.value = rtnArr[1];
		CODETYPE="CUST";
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code='+formObj.cust_cd.value, './GateServlet.gsl');
	}else{
		formObj.s_ctrt_no.value = "";
		formObj.ctrt_nm.value = "";
		formObj.cust_cd.value = "";
		formObj.cust_nm.value = "";
	}
}

//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj  = document.frm1;
	var sheetObj=docObjects[0];
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var Vals=rtnArr[0].split('@@^');	
			if(CODETYPE == "CUST"){
				formObj.cust_cd.value=Vals[0]; 
				formObj.cust_nm.value=Vals[16]; // local trdp name 
				GetRegisterOfficeCd('CUSTOMER');
			}
		}else{
			if(CODETYPE == "CUST"){
				formObj.cust_cd.value=""; 
				formObj.cust_nm.value="";
			} 
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

function addorDelWarehouse(flg, cdVal, nmVal){
	var obj = document.getElementById("wh_cd");
	var option =  document.createElement("option");
	var len = obj.length;
	var hasFlg = false;
	var idx = -1;
	for(var i = len - 1; i >= 0; i--){
		if(obj.options[i].value == cdVal){
			hasFlg = true;
			idx = i;
			break;
		}
	}
	if(flg!="1" && hasFlg == true && flgchk ==true){
		obj.remove(idx);
		flgchk = false;
		return;
	}else if(hasFlg != true && flgchk == false){
		if(cdVal!="" && cdVal!=""){
			option.text = nmVal;
			option.value = cdVal;
			obj.add(option);
			//tick warehouse have been added
			flgchk = true;
			return;
		}
	}	
}

function setGrdSizeStup(sheetObj, rowCnt){
	sheetObj.SetSheetHeight(SYSTEM_ROW_HEIGHT* rowCnt);//height
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row + 1 && keyCode==9 && sheetObj.ColSaveName(col)=="itm_vol_cft"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 1);
	}
}



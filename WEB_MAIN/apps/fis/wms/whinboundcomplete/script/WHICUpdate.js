/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHICUpdate.js
*@FileTitle  : Inbound Complete Update
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/17
=========================================================--*/

//docObjects
var sheetCnt=0;
//comboObjects
var fix_grid01="";
var loading_flag="N";
var docObjects=new Array();
var rtnary=new Array(1);
var firCalFlag=false;
var callBackFunc = "";
var WMS_QTY_FORMAT2 = "Integer";
var WMS_QTY_POINT = 0;            
var WMS_CBM_POINT = 3;      
var WMS_KGS_POINT = 3; 
var FORMAT_CUSTOMER_CD = "0123456789`~!@#$%^&*()_+-=<>?,./[]{}\|;': \"\\";
var peQty = [];
var type = [];
var cntr = [];
var sealNo = [];
var comment = [];
var flag = true;
/*
 * Sheet object 생성시 cnt 증가
 */
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
function loadPage() {
	//ComOpenWait(true);
	//sheet
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
	//ComOpenWait(false);
    loading_flag="Y";
	var formObj=document.form;
	formObj.in_sts_cd.disabled = true;
	//button disabled
	
	ComEnableObject(document.form.btnSave, false);
	ComEnableObject(document.form.btn_reinstate, false);
	ComEnableObject(document.form.btn_cancel, false);
	ComEnableObject(document.form.link_TruckFee, false);
	ComEnableObject(document.form.link_OthCost, false);
	ComEnableObject(document.form.link_Putaway, false);
	ComEnableObject(document.form.link_Print, false);
	ComEnableObject(document.form.link_History, false);
	
	formObj.checkClose.disabled=true;
	if($("#req_search_no").val() != ""){ //부킹번호 또는 completeno가 있을경우
		if ($("#req_search_tp").val() == "WIB_BK_NO")
		{
			$("#in_wib_bk_no").val($("#req_search_no").val());
		}
		else if($("#req_search_tp").val() == "WIB_IN_NO")
		{
			$("#in_wib_in_no").val($("#req_search_no").val());
		}
	}
	if(formObj.in_wib_bk_no.value != "" || formObj.in_wib_in_no.value != ""){
		btn_Search();
	}
	resizeSheet(); // resize hight of sheet 
	IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");

}

function RestoreGrid() {
//	doWork("SEARCHLIST");
}

function initControl() {
	var formObject=document.form;
	// Axon 이벤트 처리1. 이벤트catch(개발자변경)
	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
	//- 포커스 나갈때
    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
/**
 * Combo 기본 설정 
 * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
 */ 
 function initCombo(comboObj, comboNo) {
	var vTextSplit=null;
	var vCodeSplit=null;
	switch(comboObj.options.id) {
		case "in_sts_cd":
			vTextSplit=in_sts_cdText.split("|");
			vCodeSplit=in_sts_cdCode.split("|");				
			with(comboObj) {
				comboObj.SetDropHeight(125);
				InsertItem(0,  "", "");
				for(var j=0;j<vCodeSplit.length; j++){
					InsertItem(j+1,  vTextSplit[j], vCodeSplit[j]);
				}
				comboObj.SetSelectIndex(0);
				comboObj.SetEnable(0);
        	} 
			break;
	}
} 
/*
 * init sheet
 */ 
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetObj.id) {
	case "sheet1":      //IBSheet1 init
	    with(sheetObj){
	      var prefix=fix_grid01;
	
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	
	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('WHICUpdate_HDR1'), Align:"Center"},
	                        { Text:getLabel('WHICUpdate_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);
	      
	      var cols = [ {Type:"Seq",       	Hidden:0, 	Width:30,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"seq",    	 			KeyField:0,     Format:"" 																							},
	             {Type:"Text",     			Hidden:0,  	Width:100,     	Align:"Left",     	ColMerge:1,      SaveName:prefix+"item_cd",     		KeyField:0,     Format:"",      			UpdateEdit:0,     											},
	             {Type:"Text",     			Hidden:0,  	Width:150,     	Align:"Left",     	ColMerge:1,      SaveName:prefix+"item_nm",     		KeyField:0,     Format:"",      			UpdateEdit:0,     											},
	             {Type:"Text",     			Hidden:0,  	Width:100,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"lot_attrib_02",     	KeyField:0,     Format:"",      			UpdateEdit:0,     											},
	             {Type:"Text",     			Hidden:0,  	Width:50,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"estimated_unit",     	KeyField:0,     Format:"",      			UpdateEdit:0,     											},
	             {Type:"Float",     		Hidden:0,  	Width:70,     	Align:"Right",    	ColMerge:1,      SaveName:prefix+"estimated_qty",     	KeyField:0,     Format:WMS_QTY_FORMAT2,  	UpdateEdit:0,        		PointCount:WMS_QTY_POINT 		},
	             {Type:"PopupEdit", 		Hidden:0, 	Width:30,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"snd_pkgunit",     	KeyField:0,     Format:"",      			UpdateEdit:0,     											},
	             {Type:"Float",     		Hidden:0,  	Width:60,     	Align:"Right",    	ColMerge:1,      SaveName:prefix+"snd_pkgqty",     		KeyField:0,     Format:WMS_QTY_FORMAT2,  	UpdateEdit:0,        		PointCount:WMS_QTY_POINT 		},
	             {Type:"Text",     			Hidden:0,  	Width:70,     	Align:"Center",    	ColMerge:1,      SaveName:prefix+"inbound_loc_nm",     	KeyField:0,     Format:"",  				UpdateEdit:0,        										},
	             {Type:"PopupEdit", 		Hidden:0, 	Width:30,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"dmg_pkgunit",     	KeyField:0,     Format:"",      			UpdateEdit:0,     											},
	             {Type:"Float",     		Hidden:0,  	Width:60,     	Align:"Right",    	ColMerge:1,      SaveName:prefix+"dmg_pkgqty",     		KeyField:0,     Format:WMS_QTY_FORMAT2,  	UpdateEdit:0,        		PointCount:WMS_QTY_POINT 		},
	             {Type:"Text",     			Hidden:0,  	Width:70,     	Align:"Center",    	ColMerge:1,      SaveName:prefix+"dmg_loc_nm",     		KeyField:0,     Format:"",  				UpdateEdit:0,        										},
	             {Type:"Float",     		Hidden:0,  	Width:70,     	Align:"Right",    	ColMerge:1,      SaveName:prefix+"in_item_ea_qty",     	KeyField:0,     Format:WMS_QTY_FORMAT2,  	UpdateEdit:0,        		PointCount:WMS_QTY_POINT 		},
	             {Type:"Float",     		Hidden:0,  	Width:70,     	Align:"Right",    	ColMerge:1,      SaveName:prefix+"in_item_pe_qty",     	KeyField:0,     Format:WMS_QTY_FORMAT2,   								PointCount:WMS_QTY_POINT 		},
	             {Type:"Float",     		Hidden:0,  	Width:70,     	Align:"Right",    	ColMerge:1,      SaveName:prefix+"os_item_ea_qty",     	KeyField:0,     Format:WMS_QTY_FORMAT2,  	UpdateEdit:0,				PointCount:WMS_QTY_POINT 		},
	             {Type:"PopupEdit", 		Hidden:1, 	Width:90,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"inbound_loc_nm",     	KeyField:0,     Format:"",      			UpdateEdit:0,     											},
	             {Type:"Float",     		Hidden:0,  	Width:80,     	Align:"Right",    	ColMerge:0,      SaveName:prefix+"in_item_cbm",     	KeyField:0,     Format:"Float",     		UpdateEdit:0,     			PointCount:WMS_CBM_POINT		},
	             {Type:"Float",     		Hidden:0,  	Width:80,     	Align:"Right",    	ColMerge:1,      SaveName:prefix+"in_item_cbf",     	KeyField:0,     Format:"Float",     		UpdateEdit:0,     			PointCount:WMS_CBM_POINT		},
	             {Type:"Float",     		Hidden:0,  	Width:80,     	Align:"Right",    	ColMerge:1,      SaveName:prefix+"in_item_grs_kgs",     KeyField:0,     Format:"Float",     		UpdateEdit:0,     			PointCount:WMS_KGS_POINT		},
	             {Type:"Float",     		Hidden:0,  	Width:80,     	Align:"Right",    	ColMerge:1,      SaveName:prefix+"in_item_grs_lbs",     KeyField:0,     Format:"Float",     		UpdateEdit:0,     			PointCount:WMS_KGS_POINT		},
	             {Type:"Float",     		Hidden:0,  	Width:80,     	Align:"Right",    	ColMerge:1,      SaveName:prefix+"in_item_net_kgs",     KeyField:0,     Format:"Float",     		UpdateEdit:0,     			PointCount:WMS_KGS_POINT		},
	             {Type:"Float",     		Hidden:0,  	Width:80,     	Align:"Right",    	ColMerge:1,      SaveName:prefix+"in_item_net_lbs",     KeyField:0,     Format:"Float",     		UpdateEdit:0,     			PointCount:WMS_KGS_POINT		},
	             {Type:"Text",     			Hidden:0,  	Width:100,     	Align:"Left",     	ColMerge:1,      SaveName:prefix+"po_no",     			KeyField:0,     Format:"",      			UpdateEdit:0     											},
	             {Type:"PopupEdit", 		Hidden:0, 	Width:70,    	Align:"Center",     ColMerge:1,      SaveName:prefix+"eq_tpsz_cd",     		KeyField:0,     Format:"" 																				},
	             {Type:"Text",     			Hidden:0,  	Width:100,     	Align:"Left",     	ColMerge:1,      SaveName:prefix+"eq_no",     			KeyField:0,     Format:"",     								EditLen:20    								},
	             {Type:"PopupEdit", 		Hidden:0, 	Width:120,     	Align:"Left",     	ColMerge:1,      SaveName:prefix+"seal_no",     		KeyField:0,     Format:"",      							EditLen:100     							},
	             {Type:"Date",     			Hidden:0,  	Width:80,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"lot_attrib_03",     	KeyField:0,     Format:"Ymd" ,		UpdateEdit:0     											},
	             {Type:"Text",     			Hidden:0,  	Width:80,     	Align:"Left",     	ColMerge:1,      SaveName:prefix+"lot_attrib_04",     	KeyField:0,     Format:"",      			UpdateEdit:0     											},
	             {Type:"Text",     			Hidden:0,  	Width:80,     	Align:"Left",     	ColMerge:1,      SaveName:prefix+"lot_attrib_05",     	KeyField:0,     Format:"",      			UpdateEdit:0     											},
	             {Type:"Text",     			Hidden:0,  	Width:120,     	Align:"Left",     	ColMerge:1,      SaveName:prefix+"lot_id",     			KeyField:0,     Format:"",     				UpdateEdit:0     											},
	             {Type:"PopupEdit", 		Hidden:0, 	Width:120,     	Align:"Left",     	ColMerge:1,      SaveName:prefix+"rmk",     			KeyField:0,     Format:"",      							EditLen:100     							},
	             {Type:"Image",     		Hidden:0, 	Width:70,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"attach_add_img",     	KeyField:0,     Format:"",      			UpdateEdit:0    											},
	             {Type:"Image",     		Hidden:0, 	Width:70,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"attach_del_img",     	KeyField:0,     Format:"",      			UpdateEdit:0     											},
	             {Type:"Status",    		Hidden:1, 	Width:0,     	Align:"Center",     				 SaveName:prefix+"ibflag" 																														},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"po_sys_no",     						Format:""      																			},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"item_sys_no",     					Format:""      																			},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"item_seq",     						Format:""      																			},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"ctrt_no",     						Format:""      																			},
	             {Type:"Int",      			Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"putaway_cnt",     					Format:"" 																				},
	             {Type:"Int",      			Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"ob_cnt",     							Format:"" 																				},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"file_seq",     						Format:""      																			},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"file_path",     						Format:""      																			},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"file_sys_nm",     					Format:""      																			},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"file_org_nm",     					Format:""      																			},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"file_size",     						Format:""      																			},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Right",    	ColMerge:1,      SaveName:prefix+"snd_ea_qty",     						Format:"" 																				},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Right",    	ColMerge:1,      SaveName:prefix+"dmg_ea_qty",     						Format:"" 																				},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"eq_tp_cd",     						Format:""      																			},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"wib_bk_no",     						Format:""      																			},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"wib_in_no",     						Format:""      																			},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"inbound_loc_cd",    					Format:""      																			},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"dmg_loc_cd",    						Format:""      																			},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"in_item_ea_qty_org",    				Format:""      																			},
	             {Type:"Text",      		Hidden:1, 	Width:0,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"inbound_loc_cd_org",    				Format:""      																			},
	             {Type:"Text",      		Hidden:1, 	Width:70,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"attach_add",     						Format:""      																			},
	             {Type:"Text",      		Hidden:1, 	Width:50,     	Align:"Center",     ColMerge:1,      SaveName:prefix+"attach_del",     						Format:""      																			}];
	       
		      InitColumns(cols);
		      SetEditable(1);
		      SetImageList(0,APP_PATH+"/web/img/main/icon_m.gif");//popupimg변경시는인덱스번호로만가능...
		      SetImageList(1,APP_PATH+"/web/img/main/btn_s_add.gif");
		      SetImageList(2,APP_PATH+"/web/img/main/btn_s_delete.gif");
		      SetImageList(3,APP_PATH+"/web/img/main/btn_s_download.gif");
		      SetColProperty(0 , prefix+"snd_pkgunit" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(0 , prefix+"dmg_pkgunit" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(0 , prefix+"seal_no" , {AcceptKeys:"E|["+ FORMAT_CUSTOMER_CD +"]" , InputCaseSensitive:1});
		      SetColProperty(0 , prefix+"eq_no" , {AcceptKeys:"E|["+ FORMAT_CUSTOMER_CD +"]" , InputCaseSensitive:1});
		      SetColProperty(0 , prefix+"eq_tpsz_cd" , {AcceptKeys:"E|["+ FORMAT_CUSTOMER_CD +"]" , InputCaseSensitive:1});
		      SetColProperty(0 , prefix+"inbound_loc_nm" , {AcceptKeys:"E|["+ FORMAT_CUSTOMER_CD +"]" , InputCaseSensitive:1});
		      SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
		      SetUnicodeByte(3);
		      SetHeaderRowHeight(30);
		      resizeSheet();
      }
      break;
	}
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
	 var formObj=document.form;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		case "Column Hidden":
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
} 
function resizeSheet(){
	 ComResizeSheet(docObjects[0]);
	}
/*
 * sheet1 searchend event
 */
function sheet1_OnSearchEnd(){
	var sheetObj=docObjects[0];
	doHideProcess(false);
	//selectCnt 따른 sheet2 block처리 및 close콤보박스 control
	var arr=new Array(); 
	/*2014.01.16 출고, 적치 확인후 BLOCK처리하는부분 모두 없어짐.
	               재고를 흔드는 QTY, LOC정보는 무조건 수정못하도록 .
	               로직이 다시필요할경우 주석 풀것
	arr[0]=fix_grid01+ "snd_pkgunit";
	arr[1]=fix_grid01+ "snd_pkgqty";
	arr[2]=fix_grid01+ "dmg_pkgunit";
	arr[3]=fix_grid01+ "dmg_pkgqty";
	arr[4]=fix_grid01+ "inbound_loc_nm";
	arr[5]=fix_grid01+ "in_item_cbm";
	arr[6]=fix_grid01+ "in_item_cbf";
	arr[7]=fix_grid01+ "in_item_grs_kgs";
	arr[8]=fix_grid01+ "in_item_grs_lbs";
	arr[9]=fix_grid01+ "in_item_net_kgs";
	arr[10]=fix_grid01+ "in_item_net_lbs";
	arr[11]=fix_grid01+ "eq_no";
	arr[12]=fix_grid01+ "eq_tpsz_cd";
	arr[13]=fix_grid01+ "seal_no";
	arr[14]=fix_grid01+ "rmk";*/
	var putaway_sum=0;
	var ob_sum=0;
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//seal button 지정
		sheetObj.PopupButtonImage(i, fix_grid01 + "seal_no",0);
		//적치, 출고된건 체크
		var tran_cnt=sheetObj.GetCellValue(i, fix_grid01 + "putaway_cnt") + sheetObj.GetCellValue(i, fix_grid01 + "ob_cnt");
		putaway_sum=putaway_sum + sheetObj.GetCellValue(i, fix_grid01 + "putaway_cnt");
		ob_sum=ob_sum + sheetObj.GetCellValue(i, fix_grid01 + "ob_cnt");
		/*
		 * 적치, 출고된건이 있으면 block처리   2014.01.16 주석처리
		 * if(tran_cnt > 0) 
		{
			for (var m=0; m<arr.length; m++)
			{
				sheetObj.SetCellEditable(i, arr[m],0);
			}
		}
		*/
		//attach_add, attach_del
		switch(sheetObj.GetCellValue(i, fix_grid01 + "attach_add"))
		{
			case "Add":
 				sheetObj.SetCellImage(i, fix_grid01 + "attach_add_img",1);
				break;
			case "Download":
 				sheetObj.SetCellImage(i, fix_grid01 + "attach_add_img",3);
				break;
		}
		switch(sheetObj.GetCellValue(i, fix_grid01 + "attach_del"))
		{
			case "Del":
 				sheetObj.SetCellImage(i, fix_grid01 + "attach_del_img",2);
				break;
		}
	}
	
	for (var y = sheet1.HeaderRows(); y <= sheet1.RowCount() + 1; y++){
		sheet1.SetCellValue(y,"ibflag", '');
	}
		
	//적치, 출고건 입력
	var formObj=document.form;
	formObj.putaway_cnt.value=putaway_sum;
	formObj.ob_cnt.value=ob_sum;
	//--total pe계산
	var col=sheetObj.SaveNameCol(fix_grid01 + "in_item_pe_qty");
	var pe_qty=sheetObj.ComputeSum("|" + String(col) + "|");
	$("#tot_in_item_pe_qty").val(ComAddComma(pe_qty));
	
	if(flag == false){
		flag = true;
		setCellVal();
	}
	//-- check authority warehouse code 
	check_authority_wh();
}
function sheet1_OnClick(sheetObj, Row, Col) {
	var colName=sheetObj.ColSaveName(Col);
	
	//var tran_cnt = sheetObj.CellValue(Row, fix_grid01 + "putaway_cnt") + sheetObj.CellValue(Row, fix_grid01 + "ob_cnt");
	//2014.01.16 if(tran_cnt <= 0) 체크 모두 주석
	switch (colName)
	{
		case fix_grid01 + "attach_add_img": //파일첨부, 다운로드
			//if(tran_cnt <= 0) 
			//{
				if(sheetObj.GetCellValue(Row, fix_grid01 + "file_seq") == "") //파일첨부
				{
					fileUpload(sheetObj, Row, Col);
				}
				else //다운로드
				{
					fileDownload(sheetObj, Row, Col);
				}
				getCellVal();
				flag = false;
			//}
			break;
		case fix_grid01 + "attach_del_img": //파일첨부삭제
			//if(tran_cnt <= 0) 
			//{
				if(sheetObj.GetCellValue(Row, fix_grid01 + "file_seq") != "") //파일다운로드
				{
					fileDelete(sheetObj, Row, Col);
				}
				getCellVal();
				flag = false;
			//}
			break;
	}
}
//function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
//	var colName=sheetObj.ColSaveName(Col);
//	//var tran_cnt = sheetObj.CellValue(Row, fix_grid01 + "putaway_cnt") + sheetObj.CellValue(Row, fix_grid01 + "ob_cnt");
//	//2014.01.16 if(tran_cnt <= 0) 체크 모두 주석
//	switch (colName)
//	{
//		case fix_grid01 + "attach_add_img": //파일첨부, 다운로드
//			//if(tran_cnt <= 0) 
//			//{
//				if(sheetObj.GetCellValue(Row, fix_grid01 + "file_seq") == "") //파일첨부
//				{
//					fileUpload(sheetObj, Row, Col);
//				}
//				else //다운로드
//				{
//					fileDownload(sheetObj, Row, Col);
//				}
//			//}
//			break;
//		case fix_grid01 + "attach_del_img": //파일첨부삭제
//			//if(tran_cnt <= 0) 
//			//{
//				if(sheetObj.GetCellValue(Row, fix_grid01 + "file_seq") != "") //파일다운로드
//				{
//					fileDelete(sheetObj, Row, Col);
//				}
//			//}
//			break;
//	}
//}
function sheet1_OnChange(sheetObj, row, col, Value) {
	var colStr=sheetObj.ColSaveName(col);
	/*
	 * 2014.01.16 재고를 흔드는 QTY, LOC정보는 무조건 수정못하도록
	 * if(colStr == fix_grid01 + "snd_pkgunit" 
	|| colStr == fix_grid01 + "snd_pkgqty"
	|| colStr == fix_grid01 + "dmg_pkgunit"
	|| colStr == fix_grid01 + "dmg_pkgqty"
	)
	{
		//receiving이 변경되었을경우 O/S 계산
		CalcOS(sheetObj, row, col);
	}
	else if (colStr == (fix_grid01+"inbound_loc_nm")) {
		if(Value != "")
		{
			var sParam="f_loc_cd=" + $("#wh_cd").val() + "&f_wh_loc_nm=" + Value + "&f_putaway_flg=Y&f_move_flg=Y;
			$.ajax({
				url : "searchWarehouseLocInfoForName.clt?"+sParam,
				success : function(result) {
					sheetObj.SetCellValue(row,  col,getXmlDataNullToNullString(result.xml,'wh_loc_nm'),0);
					sheetObj.SetCellValue(row,  fix_grid01+"inbound_loc_cd",getXmlDataNullToNullString(result.xml,'wh_loc_cd'),0);
					if(getXmlDataNullToNullString(result.xml,'exception_msg')!=""){
						alert(getXmlDataNullToNullString(result.xml,'exception_msg'));
						sheetObj.SelectCell(row,  col);
					}
				}
			});
		}
		else
		{
			sheetObj.SetCellValue(row,  fix_grid01+"inbound_loc_cd","",0);
		}
	}
	*/
	if (colStr == (fix_grid01+"in_item_cbf") && Value != "") 
	{
		funcKGS_CBM_CAC("CBF_CBM", (fix_grid01+"in_item_cbf"), (fix_grid01+"in_item_cbm"), sheetObj);		
	} 
	else if (colStr == (fix_grid01+"in_item_grs_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid01+"in_item_grs_lbs"), (fix_grid01+"in_item_grs_kgs"), sheetObj);		
	} 
	else if (colStr == (fix_grid01+"in_item_net_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid01+"in_item_net_lbs"), (fix_grid01+"in_item_net_kgs"), sheetObj);		
	}
	else if(colStr == (fix_grid01 + "eq_tpsz_cd")) 
	{
		if(Value != "")
		{
//			var sXml=docObjects[0].GetSearchData("searchCntrTrTp.clt?"+sParam);
			ajaxSendPost(resultCntrTrTp1, row, '&goWhere=aj&bcKey=searchCntrTrTp&cntr_tp='+Value, './GateServlet.gsl');
		}
		else
		{
			sheetObj.SetCellValue(row, fix_grid01+"eq_tp_cd","");
		}
	}
	else if(colStr == (fix_grid01+"in_item_pe_qty")){
		var qty=Value;
		//음수체크
		if(Value < 0)
		{
			qty=Math.abs(Value);
			sheetObj.SetCellValue(row, col,qty,0);
		}
		//--total pe계산
		var pe_qty=sheetObj.ComputeSum("|" + String(col) + "|");
		$("#tot_in_item_pe_qty").val(ComAddComma(pe_qty));
	}
}
function resultCntrTrTp1(reqVal, row){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   sheet1.SetCellValue(row, fix_grid01+"eq_tpsz_cd",rtnArr[0],0);
		   sheet1.SetCellValue(row, fix_grid01+"eq_tp_cd",rtnArr[2]);
	   }
	   else{
		   sheet1.SetCellValue(row, fix_grid01+"eq_tpsz_cd",'',0);
		   sheet1.SetCellValue(row, fix_grid01+"eq_tp_cd",'');
	   }
	  }
	  else{
		  sheet1.SetCellValue(row, fix_grid01+"eq_tpsz_cd",'',0);
		   sheet1.SetCellValue(row, fix_grid01+"eq_tp_cd",'');
	  }
	 }
	 else{
	  //alert(getLabel('SEE_BMD_MSG43'));
	 }
}
function funcKGS_CBM_CAC(command, obj, obj2, sheetObj) {
	  var currow=0; 
	  currow=sheetObj.GetSelectRow();
	  if (command == "LB_KG") { // GWT / NWT
	var lb_amt=(parseFloat(sheetObj.GetCellValue(currow, obj)) / CNVT_CNST_CBM_CFT);
	   lb_amt=lb_amt * 1000;
	   lb_amt=Math.round(lb_amt);
	   lb_amt=lb_amt / 1000;
	   sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	  } else if (command == "CBF_CBM") { // CBM
	var lb_amt=(parseFloat(sheetObj.GetCellValue(currow, obj)) * 0.028317);
	   lb_amt=lb_amt * 1000;
	   lb_amt=Math.round(lb_amt);
	   lb_amt=lb_amt / 1000;
	   sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	  }
	 }

/*
  2014.01.16 출고, 적치 확인후 BLOCK처리하는부분 모두 없어짐.
   재고를 흔드는 QTY, LOC정보는 무조건 수정못하도록 .
   로직이 다시필요할경우 주석 풀것
function CalcOS(sheetObj, row, col){
var rcv_sound_unit=sheetObj.GetCellValue(row, fix_grid01 + "snd_pkgunit").trim();
var rcv_sound_qty=sheetObj.GetCellValue(row, fix_grid01 + "snd_pkgqty").trim();
var rcv_damage_unit=sheetObj.GetCellValue(row, fix_grid01 + "dmg_pkgunit").trim();
var rcv_damage_qty=sheetObj.GetCellValue(row, fix_grid01 + "dmg_pkgqty").trim();
var item_pkgunit=sheetObj.GetCellValue(row, fix_grid01 + "estimated_unit").trim();
var item_pkgqty=sheetObj.GetCellValue(row, fix_grid01 + "estimated_qty").trim();
var ctrt_no=sheetObj.GetCellValue(row, fix_grid01 + "ctrt_no").trim();
var item_sys_no=sheetObj.GetCellValue(row, fix_grid01 + "item_sys_no").trim();
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == fix_grid01 + "snd_pkgunit"  || colStr == fix_grid01 + "snd_pkgqty")
	{
		if(rcv_sound_unit == "" && rcv_sound_qty > 0)
		{
			ComShowCodeMessage("COM0114","Sound Unit");//sound unit는 없고 qty있는경우 메세지
			sheetObj.SelectCell(row, fix_grid01 + "snd_pkgunit");
			return;
		}
	}
	if(colStr == fix_grid01 + "dmg_pkgunit" || colStr == fix_grid01 + "dmg_pkgqty")
	{
		if(rcv_damage_unit == "" && rcv_damage_qty > 0)
		{
			ComShowCodeMessage("COM0114","Damage Unit");//Damage unit는 없고 qty있는경우 메세지
			sheetObj.SelectCell(row, fix_grid01 + "dmg_pkgunit");
			return;
		}
	}
	$.ajax({
		url : "searchWHICCalcOs.clt?rcv_sound_unit=" + rcv_sound_unit 
		                       + "&rcv_sound_qty="  + rcv_sound_qty
		                       + "&rcv_damage_unit="+ rcv_damage_unit
		                       + "&rcv_damage_qty=" + rcv_damage_qty
		                       + "&item_pkgunit="   + item_pkgunit
		                       + "&item_pkgqty="    + item_pkgqty
		                       + "&ctrt_no="        + ctrt_no
		                       + "&item_sys_no="    + item_sys_no
		    ,
		success : function(result) {
			resultCalcOS(result.xml, sheetObj, row, col);
		}
	});
}
*/
/*
 * 2014.01.16 출고, 적치 확인후 BLOCK처리하는부분 모두 없어짐.
   재고를 흔드는 QTY, LOC정보는 무조건 수정못하도록 .
   로직이 다시필요할경우 주석 풀것
  receving 정보바뀐경우 os계산 ajax return function
function resultCalcOS(resultXml, sheetObj, row, col){
	var suYn=getXmlDataNullToNullString(resultXml,'suYn');
	var suValue=getXmlDataNullToNullString(resultXml,'suValue');
	if (suYn == "" || suYn == null)
	{
		alert("error"); //TODO : MJY MESSAGE
		return;
	}
	if (suYn == "N")
	{
		ComShowCodeMessage(suValue); //COM0313~COM0315
		sheetObj.SetCellValue(row, col,"",0);
		sheetObj.SelectCell(row, col);
		return;
	}
	var os_item_ea_qty=getXmlDataNullToNullString(resultXml,'suOs');
	sheetObj.SetCellValue(row, fix_grid01 + "os_item_ea_qty",os_item_ea_qty);
	var in_item_ea_qty=getXmlDataNullToNullString(resultXml,'suIn');
	sheetObj.SetCellValue(row, fix_grid01 + "in_item_ea_qty",in_item_ea_qty);
	var snd_ea_qty=getXmlDataNullToNullString(resultXml,'suSndQty');
	sheetObj.SetCellValue(row, fix_grid01 + "snd_ea_qty",snd_ea_qty);
	var dmg_ea_qty=getXmlDataNullToNullString(resultXml,'suDmgQty');
	sheetObj.SetCellValue(row, fix_grid01 + "dmg_ea_qty",dmg_ea_qty);
}
 */
function sheet1_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	//var cal = new ComCalendarGrid();
	with(sheetObj)
	{
		/* 2014.01.16 재고를 흔드는 QTY, LOC정보는 무조건 수정못하도록
		 * if(colName == (fix_grid01 + "snd_pkgunit") || colName == (fix_grid01 + "dmg_pkgunit"))
		{
			var sUrl="CommonCodePopup.clt?grp_cd=A6&code="+colValue;
			ComOpenPopup(sUrl, 400, 560, "setPkgunitGrid", "0,0", true);
		}
		else if(colName == fix_grid01 + "inbound_loc_nm")
		{
			var sUrl="WarehouseLocPopup.clt?f_loc_cd="+ $("#wh_cd").val() + "&f_putaway_flg=Y&f_move_flg=Y";
			ComOpenPopup(sUrl, 700, 550, "setLocInfo", "0,0", true);
		}
		*/
		if (colName == fix_grid01 + "seal_no")
		{
			ComShowMemoPad3(sheetObj, Row, Col, false, 300, 82,  Col, Col);      
		}
		else if (colName == fix_grid01 + "rmk")
		{
			ComShowMemoPad4(sheetObj, Row, Col, false, 200, 100,Col, Col);
		}
		else if ( colName == fix_grid01 + "eq_tpsz_cd" ) 
		{
			var tp="A";
			if(sheetObj.GetCellValue(Row, (fix_grid01+"eq_tp_cd")) != "")
			{
				tp=sheetObj.GetCellValue(Row, (fix_grid01+"eq_tp_cd"));
			}
			sUrl="./ContainerTypePopup.clt?type="+tp+"&eq_unit="+sheetObj.GetCellValue(Row, Col);
			callBackFunc = "setIbContainerTypeInfo";
			modal_center_open(sUrl, callBackFunc, 400, 590,"yes");
//			ComOpenPopup(sUrl, 400, 600, "setIbContainerTypeInfo", "0,0", true);
		}
	}
}
/*
 * 2014.01.16 출고, 적치 확인후 BLOCK처리하는부분 모두 없어짐.
   재고를 흔드는 QTY, LOC정보는 무조건 수정못하도록 .
   로직이 다시필요할경우 주석 풀것
 * loc popupedit 완료후
function setLocInfo(aryPopupData){
	var sheetObj=$("#sheet1")[0];
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"inbound_loc_cd",aryPopupData[0][1],0);// wh_loc_cd
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"inbound_loc_nm",aryPopupData[0][2],0);// wh_loc_nm
}
*/
/*
 * 2014.01.16 출고, 적치 확인후 BLOCK처리하는부분 모두 없어짐.
   재고를 흔드는 QTY, LOC정보는 무조건 수정못하도록 .
   로직이 다시필요할경우 주석 풀것
 * unit (sound, damage) popupedit 완료후
function setPkgunitGrid(aryPopupData){
	var sheetObj=$("#sheet1")[0];
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), sheetObj.GetSelectCol(),aryPopupData[0][2],0);
	CalcOS(sheetObj, sheetObj.GetSelectRow(), sheetObj.GetSelectCol());
}
 */
/*
 * type popupedit 완료후
 */
function setIbContainerTypeInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var sheetObj=sheet1;
			 var rtnValArr = rtnVal.split("|");
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "eq_tpsz_cd",rtnValArr[0]);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01 + "eq_tp_cd",rtnValArr[2]);
}
}
/*
 * 파일다운로드
 */
function fileDownload(sheetObj, Row, Col){
	var formObj1=document.form1;
	formObj1.file_path.value = sheetObj.GetCellValue(Row, fix_grid01 + "file_path")+sheetObj.GetCellValue(Row,  fix_grid01 + "file_sys_nm");
	formObj1.file_name.value = sheetObj.GetCellValue(Row, fix_grid01 + "file_org_nm");
	formObj1.submit();
}
/*
 * 파일업로드
 */
function fileUpload(sheetObj, Row, Col){
	var formObj=document.form;
	var po_sys_no=sheetObj.GetCellValue(Row, fix_grid01 + "po_sys_no");
	var item_sys_no=sheetObj.GetCellValue(Row, fix_grid01 + "item_sys_no");
	var item_seq=sheetObj.GetCellValue(Row, fix_grid01 + "item_seq");
	var sUrl="./WHICUpdateFileUploadPopup.clt?wib_bk_no=" 	+ formObj.wib_bk_no.value 
	                                     + "&wib_in_no=" 	+ formObj.wib_in_no.value
	                                     + "&po_sys_no=" 	+ po_sys_no
	                                     + "&item_sys_no=" 	+ item_sys_no
	                                     + "&item_seq=" 	+ item_seq;
	callBackFunc = "setFileInfoInfo";
	modal_center_open(sUrl, rtnary, 700,130,"yes");
//	ComOpenPopup(sUrl, 700, 130, "setFileInfoInfo", "0,0", true);
}
/*
 * 파일업로드 이후 --> SHEET 재조회
 */
function setFileInfoInfo(div)
{
	//reSearch();
	btn_Search();
	return;
		
}
/*
 * 파일업로드 이후 --> SHEET 재조회
 * 파일삭제 이후 --> SHEET 재조회
 */
function reSearch()
{
	var formObj=document.form;
	var sheetObj=sheet1;
     var sXml=sheetObj.GetSearchData("./searchWHICUpdateItemGS.clt", "in_wib_bk_no=" + formObj.wib_bk_no.value
    		                                                  + "&in_wib_in_no=" + formObj.wib_in_no.value);
    sheetObj.LoadSearchData(convertColOrder(sXml,{Sync:1} ));
}
/* 
 * File Delete
 */
function fileDelete(sheetObj, Row, Col) {
	var formObj=document.form;
	if (ComShowCodeConfirm("COM0053")) { // Do you want to delete?
		////sheetObj.RowHidden(Row) = false;
		////sheetObj.RowStatus(Row) = "D";
		var po_sys_no=sheetObj.GetCellValue(Row, fix_grid01 + "po_sys_no");
		var item_sys_no=sheetObj.GetCellValue(Row, fix_grid01 + "item_sys_no");
		var item_seq=sheetObj.GetCellValue(Row, fix_grid01 + "item_seq");
		var file_seq=sheetObj.GetCellValue(Row, fix_grid01 + "file_seq");
		var sParam="wib_bk_no=" 		+ formObj.wib_bk_no.value 
                   + "&wib_in_no=" 		+ formObj.wib_in_no.value
                   + "&po_sys_no=" 		+ po_sys_no
                   + "&item_sys_no=" 	+ item_sys_no
                   + "&item_seq=" 		+ item_seq
                   + "&file_seq="		+ file_seq
				   + "&f_cmd="			+ SEARCH02;
		if (sParam == "") { return; }
 		var sXml=sheetObj.GetSaveData("./removeFileWHICUpdateItemGS.clt", sParam);
 		ComShowMessage("Deleted successful.");
 		btn_Search();
		//SaveEnd
//		if( sXml.indexOf('<MESSAGE>') == -1){
//			btn_Search();//재조회
//		}
	}
}
function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    try{
		var formObj=document.form;
        switch(srcName) {
			case "btn_lastfree_dt":	
				var cal=new ComCalendar();
				cal.setDisplayType('date');
	            cal.select(formObj.lastfree_dt, 'MM-dd-yyyy');
				break;
			case "SEARCHLIST":
				btn_Search();
				break;
			case "link_TruckFee":
				btn_TruckFee();
				break;
			case "link_OthCost":
				btn_Oth_Cost();
				break;
			case "link_Putaway":
				btn_Putaway_Update();
				break;
			case "link_History":
				btn_History();
				break;
			case "link_Print":
				btn_Print();
//				alert("This button is developing");
				break;
			case "btn_cancel":
				btn_Cancel();
				break;
			case "btn_reinstate":
				btn_Reinstate();
				break;
			case "SAVE":
				btn_Save();
				break;
		} // end switch
	} catch(e) {
        if(e == "[object Error]"){
         //Unexpected Error occurred. Please contact Help Desk!
         alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
         //System Error! + MSG
         alert(getLabel('FMS_COM_ERR001') + " - " + e); 
        }
 }
}
/*
 * 버튼 관련 로직
 */
//화면 Merge 컬럼 Name
var InputName="wib_in_no|wib_bk_no|cust_ord_no|in_sts_cd_combo|inbound_dt|inbound_hm|owner_cd|owner_nm|ctrt_no|ctrt_nm|wh_cd|wh_nm|freetime_day|lastfree_dt|modi_loc_dt|modi_ofc_cd|modi_nm|custms_ref_no|rmk";
function btn_Search() {
	var formObj=document.form;
	if(loading_flag != "Y"){
		return;
	}
	if(ComIsEmpty(formObj.in_wib_bk_no.value) && ComIsEmpty(formObj.in_wib_in_no.value)){
		ComShowCodeMessage("COM0290");
		if(ComIsEmpty(formObj.in_wib_in_no.value)){
			formObj.in_wib_in_no.focus();
		}else{
			ComIsEmpty(formObj.in_wib_bk_no.value);
		}
		imNew(); //이전조회결과 reset
		return ;
	}
	var in_cnt=formObj.in_cnt.value;
	wib_in_no_dupCheck();
	if(!ComIsEmpty(formObj.in_wib_in_no.value) || formObj.in_cnt.value < 2 ){
		if(!ComIsEmpty(formObj.in_wib_in_no.value) || in_cnt < 2 )
		{			
			imNew(); //이전조회결과 reset
			doShowProcess(true);
			 setTimeout(function(){
				var sheetObj=sheet1;
				formObj.f_cmd.value= SEARCH01;
	 		    var sXml=sheetObj.GetSearchData("./searchWHICUpdateInfoGS.clt", FormQueryString(formObj,null, ""));
	 		   if (sXml.replace(/^\s+|\s+$/gm,'') == ''){
					ComShowCodeMessage("COM0266", "Booking No or I/B Complete No");
					formObj.in_wib_in_no.value = "";
					formObj.in_wib_bk_no.value = "";
					formObj.in_wib_in_no.focus();
					doHideProcess(false);
	 		   }else{
					setDataControl(sXml);
					doHideProcess(false);
					var strtIndxSheet = sXml.indexOf("<SHEET>");
					var endIndxSheet = sXml.indexOf("</SHEET>") + "</SHEET>".length;
					var sheetData = sXml.substring(strtIndxSheet,endIndxSheet);
					sheet1.LoadSearchData(sheetData);
					//button enable
					ComEnableObject(document.form.btnSave, true);
					ComEnableObject(document.form.btn_reinstate, true);
					ComEnableObject(document.form.btn_cancel, true);
					ComEnableObject(document.form.link_TruckFee, true);
					ComEnableObject(document.form.link_OthCost, true);
					ComEnableObject(document.form.link_Putaway, true);
					ComEnableObject(document.form.link_Print, true);
					ComEnableObject(document.form.link_History, true);
					if(formObj.in_sts_cd.value != "X")
					{
						formObj.checkClose.disabled=false; //CLOSE처리되지않은건만 체크하게끔.
					}
					setFieldValue(formObj.form_mode, "UPDATE");
	 		   }
			 },100);
		}
	}
}
function setDataControl(sXml) {
	var formObj=document.form;
	var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
	var endIndxField = sXml.indexOf("</FIELD>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
	var $xml = $(xmlDoc);
	
	formObj.wib_in_no.value = $xml.find( "wib_in_no").text();
	formObj.wib_bk_no.value = $xml.find( "wib_bk_no").text();
	formObj.cust_ord_no.value = $xml.find( "cust_ord_no").text();
	formObj.in_sts_cd.value = $xml.find( "in_sts_cd").text();
	var day_tpm = $xml.find( "inbound_dt").text();
	formObj.inbound_dt.value = day_tpm;
//	formObj.inbound_dt.value = day_tpm.substring(4, 6) + "-" + day_tpm.substring(6, 8) + "-" + day_tpm.substring(0, 4);
	var hour_tmp = $xml.find( "inbound_hm").text();
	formObj.inbound_hm.value = hour_tmp.substring(0, 2) + ":" + hour_tmp.substring(2, 4);
	formObj.owner_cd.value = $xml.find( "owner_cd").text();
	formObj.owner_nm.value = $xml.find( "owner_nm").text();
	formObj.ctrt_no.value = $xml.find( "ctrt_no").text();
	formObj.ctrt_nm.value = $xml.find( "ctrt_nm").text();
	formObj.wh_cd.value = $xml.find( "wh_cd").text();
//	formObj.wh_nm.value = $xml.find( "wh_nm").text();
	formObj.freetime_day.value =($xml.find( "freetime_day").text());
	formObj.lastfree_dt.value = $xml.find( "lastfree_dt").text();
	formObj.modi_loc_dt.value = $xml.find( "modi_loc_dt").text();
	formObj.modi_ofc_cd.value = $xml.find( "modi_ofc_cd").text();
	formObj.modi_nm.value = $xml.find( "modi_nm").text();
	formObj.custms_ref_no.value = $xml.find( "custms_ref_no").text();
	formObj.rmk.value = $xml.find( "rmk").text();
	formObj.form_mode.value = $xml.find( "form_mode").text();
}
function convDate(date) {
	if (date != 0){
		if (date.length == 8){
			var rtn = date.substring(4, 6) + "-" + date.substring(6, 8) + "-" + date.substring(0, 4);
			return rtn;
		}else if (date.length == 10){
			var rtn = date.substring(5,7) + "-" + date.substring(8, 10) + "-" + date.substring(0, 4);
			return rtn;
		}
	}else {
		return date;
	}
}
function wib_in_no_dupCheck(){
	var formObj=document.form;
	var in_wib_in_no=formObj.in_wib_in_no.value;
	var in_wib_bk_no=formObj.in_wib_bk_no.value;
	if(ComIsEmpty(in_wib_in_no)){
 		var sXml=sheet1.GetSearchData("./searchWHICBkNoDupCheckGS.clt", "in_wib_bk_no="+in_wib_bk_no+ "&f_cmd=2");
 		if(sXml.replace(/^\s+|\s+$/gm,'') != ""){
 			var xmlDoc = $.parseXML(sXml);
 			 var $xml1 = $(xmlDoc);
 				var in_cnt= $xml1.find("in_cnt").text();
 				formObj.in_cnt.value=in_cnt;
 				if(in_cnt > 1){
 					WHICListPopup();
 				}
 		}
	}
}
function WHICListPopup(){
	var formObj=document.form;
	var sUrl="./WHICListPopup.clt?wib_bk_no="+formObj.in_wib_bk_no.value;
	callBackFunc = "setWHICInfo";
	modal_center_open(sUrl, callBackFunc, 300,350,"yes");
//	ComOpenPopup(sUrl, 300, 350, "setWHICInfo", "0,0", true);
}
function setWHICInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
	var formObj=document.form;
	var rtnValAry=rtnVal.split("|");
	setFieldValue(formObj.in_wib_in_no,rtnValAry[0]);
	setFieldValue(formObj.in_wib_bk_no,rtnValAry[1]);	
}
}
/*
 * 이전 조회결과 reset
 */
function imNew() {	
	var formObj=document.form;
	var var_wib_bk_no=formObj.in_wib_bk_no.value;
	var var_wib_in_no=formObj.in_wib_in_no.value;
	formObj.reset();
	formObj.in_wib_bk_no.value=var_wib_bk_no;
	formObj.in_wib_in_no.value=var_wib_in_no;
	formObj.in_sts_cd.value = 0;
	//button disabled
	ComEnableObject(document.form.btnSave, false);
	ComEnableObject(document.form.btn_reinstate, false);
	ComEnableObject(document.form.btn_cancel, false);
	ComEnableObject(document.form.link_TruckFee, false);
	ComEnableObject(document.form.link_OthCost, false);
	ComEnableObject(document.form.link_Putaway, false);
	ComEnableObject(document.form.link_Print, false);
	ComEnableObject(document.form.link_History, false);
	
	formObj.checkClose.disabled=true;
	sheet1.RemoveAll();
}
/**
 * 마우스 아웃일때 
 */
function form_deactivate() {
}
function btn_Save() {
	var formObj=document.form;
	var wib_in_no=ComGetObjValue(formObj.wib_in_no);
	if (ComIsEmpty(wib_in_no)) {
		ComShowCodeMessage("COM0289", "Inbound Complete");
		return;
	}
	var sheetObj=sheet1;
	if(ComGetLenByByte($("#custms_ref_no").val().trim()) > 30){
		ComShowCodeMessage("COM0215", "Customs Ref[30]");
		formObj.custms_ref_no.focus();
		return ;
	}
	if(ComGetLenByByte($("#rmk").val().trim()) > 1000){
		ComShowCodeMessage("COM0215", "Remark[1000setselect formObj.rmk.focus()");
		return ;
	}
	/*2014.01.16 출고, 적치 확인후 BLOCK처리하는부분 모두 없어짐.
    재고를 흔드는 QTY, LOC정보는 무조건 수정못하도록 .
    로직이 다시필요할경우 주석 풀것
	//--sheet 체크
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//--unit이 올바르게 입력안되경우 체크
if (sheetObj.GetCellValue(i, fix_grid01 + "snd_pkgunit").trim() == "")
		{
			ComShowCodeMessage("COM0114","Sound Unit");
			sheetObj.SelectCell(i, fix_grid01 +  "snd_pkgunit");
			return;
		}
if (sheetObj.GetCellValue(i, fix_grid01 + "dmg_pkgunit").trim() == "")
		{
			ComShowCodeMessage("COM0114","Damage Unit");
			sheetObj.SelectCell(i, fix_grid01 +  "dmg_pkgunit");
			return;
		}
		//--loc가 입력안된경우 체크
		//var qty_sum = sheetObj.CellValue(i, fix_grid01 + "snd_pkgqty") + sheetObj.CellValue(i, fix_grid01 + "dmg_pkgqty");
if (sheetObj.GetCellValue(i, fix_grid01 +  "inbound_loc_nm").trim() == "" )
		{
			ComShowCodeMessage("COM0114","Inbound Loc");
			sheetObj.SelectCell(i, fix_grid01 +  "inbound_loc_nm");
			return;
		}
	}
	*/
	if(!ComShowCodeConfirm("COM0063")){
		return;
	}
	var tl_wo_document_info_header="Docin";
	var in_wib_bk_no=tl_wo_document_info_header+"in_wib_bk_no="+document.getElementsByName("in_wib_bk_no")[0].value;
	var in_wib_in_no="&"+tl_wo_document_info_header+"in_wib_in_no="+document.getElementsByName("in_wib_in_no")[0].value;
	var wib_bk_no="&"+tl_wo_document_info_header+"wib_bk_no="+document.getElementsByName("wib_bk_no")[0].value;
	var wib_in_no="&"+tl_wo_document_info_header+"wib_in_no="+document.getElementsByName("wib_in_no")[0].value;
	var wh_cd="&"+tl_wo_document_info_header+"wh_cd="+document.getElementsByName("wh_cd")[0].value;
	var freetime_day="&"+tl_wo_document_info_header+"freetime_day=0";
	if(!ComIsEmpty(formObj.freetime_day.value)){
		freetime_day="&"+tl_wo_document_info_header+"freetime_day="+document.getElementsByName("freetime_day")[0].value;
	}
	var lastfree_dt="&"+tl_wo_document_info_header+"lastfree_dt="+document.getElementsByName("lastfree_dt")[0].value;
	if(ComIsEmpty(formObj.lastfree_dt.value)){ //lastfree_dt가 비어있으면 lastfree_dt를 구한다.
		lastfree_dt="&"+tl_wo_document_info_header+"lastfree_dt="+calLastFreeDateValue();
	}
	var custms_ref_no="&"+tl_wo_document_info_header+"custms_ref_no="+document.getElementsByName("custms_ref_no")[0].value; 
	var rmk="&"+tl_wo_document_info_header+"rmk="+formObj.rmk.value;
	var in_sts_cd_check="";
	if(formObj.checkClose.checked)
	{
		in_sts_cd_check="X";
	}
	var in_sts_cd ="&"+tl_wo_document_info_header+"in_sts_cd="+in_sts_cd_check;
	var docinParamter=in_wib_bk_no+in_wib_in_no+wib_bk_no+wib_in_no+wh_cd+freetime_day+lastfree_dt+custms_ref_no+rmk+in_sts_cd;
	var sheetDatas1=sheetObj.GetSaveString(); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
	formObj.f_cmd.value = MODIFY;
	var isheetSaveParamters=docinParamter+"&"+sheetDatas1+"&f_cmd="+formObj.f_cmd.value;
	doShowProcess(true);
	 	var saveXml=sheetObj.GetSaveData("./modifyWHICUpdateInfoGS.clt", isheetSaveParamters);
	 	//1. Save 후 조회
	 	doHideProcess(false);
	 	if (saveXml.replace(/^\s+|\s+$/gm,'') != ''){
//			ComShowCodeMessage("COM0093", "");
	 		//Change Save - Deleted -Confrimed - Cancel - updated 'Successfully' to showCompleteProcess();
			showCompleteProcess();
			var wib_in_no_s=$("#wib_in_no").val().trim();
			var in_wib_in_no_s=$("#in_wib_in_no").val().trim();
			if(wib_in_no_s != in_wib_in_no_s)
			{
				$("#in_wib_in_no").val(wib_in_no_s);
				$("#in_wib_bk_no").val("");
			}
	 		btn_Search();
		}else {
			ComShowCodeMessage("COM0410");
			return;
		}
}
/*
 * reinstate
 */
function btn_Reinstate(){
	var formObj=document.form;
	var wib_in_no=ComGetObjValue(formObj.wib_in_no);
	if (ComIsEmpty(wib_in_no)) {
		ComShowCodeMessage("COM0289", "Inbound Complete");
		return;
	}
	//출고건이 있으면 return
	var ob_cnt=eval(formObj.ob_cnt.value);
	if(ob_cnt> 0)
	{
		ComShowCodeMessage("COM0317");
		return;
	}
	//confirm
	if(!ComShowCodeConfirm("COM0061")){
		return;
	}
	var tl_wo_document_info_header="Docin";
	var wib_bk_no="&"+tl_wo_document_info_header+"wib_bk_no="+document.getElementsByName("wib_bk_no")[0].value;
	var wib_in_no="&"+tl_wo_document_info_header+"wib_in_no="+document.getElementsByName("wib_in_no")[0].value;
	var wh_cd="&"+tl_wo_document_info_header+"wh_cd="+document.getElementsByName("wh_cd")[0].value;
	var docinParamter=wib_bk_no+wib_in_no+wh_cd;
	var sheetObj=sheet1;
	var isheetSaveParamters=docinParamter;
 	var saveXml=sheetObj.GetSaveData("./reinstateWHICUpdateInfoGS.clt", isheetSaveParamters + "&f_cmd=" + MODIFY01);
 	sheetObj.LoadSaveData(saveXml);
	//1. Reinstate 후 조회
	if( saveXml.indexOf('<MESSAGE>') == -1){
		ComShowCodeMessage("COM0268", "");
		btn_Search();
	}
}
/*
 * cancle
 */
function btn_Cancel(){
	var formObj=document.form;
	var wib_in_no=ComGetObjValue(formObj.wib_in_no);
	if (ComIsEmpty(wib_in_no)) {
		ComShowCodeMessage("COM0289", "Inbound Complete");
		return;
	}
	//출고건이 있으면 return
	var ob_cnt=eval(formObj.ob_cnt.value);
	if(ob_cnt> 0)
	{
		ComShowCodeMessage("COM0317");
		return;
	}
	if(!ComShowCodeConfirm("COM0040")){
		return;
	}
	var tl_wo_document_info_header="Docin";
	var wib_bk_no="&"+tl_wo_document_info_header+"wib_bk_no="+document.getElementsByName("wib_bk_no")[0].value;
	var wib_in_no="&"+tl_wo_document_info_header+"wib_in_no="+document.getElementsByName("wib_in_no")[0].value;
	var wh_cd="&"+tl_wo_document_info_header+"wh_cd="+document.getElementsByName("wh_cd")[0].value;
	var docinParamter=wib_bk_no+wib_in_no+wh_cd;
	var sheetObj=sheet1;
	var isheetSaveParamters=docinParamter;
 	var saveXml=sheetObj.GetSaveData("./cancelWHICUpdateInfoGS.clt", isheetSaveParamters+ "&f_cmd=" + MODIFY02);
 	sheetObj.LoadSaveData(saveXml);
	//1. Cancel 후 조회
 	if (saveXml.replace(/^\s+|\s+$/gm,'') != ''){
		var wib_bk_no_s=$("#wib_bk_no").val();
		form.reset();
		formObj.in_wib_bk_no.value="";
		formObj.in_wib_in_no.value="";
		sheetObj.RemoveAll();
		if(ComShowCodeConfirm("COM0342", "Inbound Complete Management")){
			//화면이동
			var sUrl="./WHICMgmt.clt?search_no="+wib_bk_no_s + "&search_tp=WIB_BK_NO";
			parent.mkNewFrame('Inbound Complete Management', sUrl);
		}
	}
}
/*
 * 프린트
 */
function btn_Print()
{

//	if (ComEnableObject(document.form.name, false)("link_Print")) {
//		return;
//	}

	var sUrl="./WHICPrintOption.clt?wib_in_no="+ document.getElementsByName("wib_in_no")[0].value + "&wib_bk_no=" + document.getElementsByName("wib_bk_no")[0].value;
	callBackFunc = "";
	modal_center_open(sUrl, callBackFunc, 250,280,"yes");
//	ComOpenPopup(sUrl, 250, 280, "setWHICPrintOption", "0,0", false);	
}
function btn_History()
{

//	if (ComEnableObject(document.form.name, false)("link_History")) {
//		return;
//	}

	var sUrl="./TrsHistoryList.clt?wh_cd="  + $("#wh_cd").val().trim()
	                                  + "&ctrt_no="+ $("#ctrt_no").val().trim() + "&ctrt_nm="+ $("#ctrt_nm").val().trim()
	                                  + "&trs_no=" + $("#wib_in_no").val().trim() 
	                                  + "&trs_type=IC";
	parent.mkNewFrame('Transaction History Search', sUrl);
}
function btn_TruckFee()

{	
//	if (ComEnableObject(document.form.name, false)("link_TruckFee")) {
//		return;
//	}

	goOthCostMgmt("T"); 
}
function btn_Oth_Cost()
{

//	if (ComEnableObject(document.form.name, false)("link_OthCost")) {
//		return;
//	}

	goOthCostMgmt("O"); 
}
/*
 * search_tp T : Truck Fee
 *           O : Other Costs
 */
function goOthCostMgmt(search_tp)
{
	var formObj=document.form;
	var wib_in_no=ComGetObjValue(formObj.wib_in_no);
	if (ComIsEmpty(wib_in_no)) {
		ComShowCodeMessage("COM0289", "Inbound Complete");
		return;
	}
	var sUrl="./OthCostMgmt.clt?bk_cls_cd=IN" + "&search_tp=" + search_tp + "&search_no=" + wib_in_no;
	parent.mkNewFrame('Other Costs Management', sUrl);
}
/*
 * putaway update
 */
function btn_Putaway_Update()
{

//	if (ComEnableObject(document.form.name, false)("link_Putaway")) {
//		return;
//	}

	var formObj=document.form;
	var wib_in_no=ComGetObjValue(formObj.wib_in_no);
	if (ComIsEmpty(wib_in_no)) {
		ComShowCodeMessage("COM0289", "Inbound Complete");
		return;
	}
	var sUrl="./WHPutawayMgmt.clt?wib_in_no="	+ document.getElementsByName("wib_in_no")[0].value 
												+ "&wib_bk_no=" + document.getElementsByName("wib_bk_no")[0].value
												+ "&wh_cd=" + formObj.wh_cd.value;
	parent.mkNewFrame('Putaway Management', sUrl);
}
function calLastFreeDate(){
	var formObj=document.form;
	formObj.lastfree_dt.value=calLastFreeDateValue();
}
function calLastFreeDateValue(){
	var formObj=document.form;
	var ret="";
	if(formObj.freetime_day.value == "0" || formObj.freetime_day.value == ""){
		ret=ComGetDateAdd(formObj.inbound_dt.value, "d", formObj.freetime_day.value+0, "-");
	}else{
		ret=ComGetDateAdd(formObj.inbound_dt.value, "d", formObj.freetime_day.value-1, "-");
	}
	return ret;
}
function ComGetDateAdd(sDate, sFlag, iVal, sDelim, isFull){
    try {
        if (sDelim==null || sDelim==undefined) sDelim = "-";
        if (isFull==null || isFull==undefined) isFull = true;

        if (sDate==null || sDate==undefined || sDate=="") {
            sDate = new Date();
        } else {
        	sDate = new Date(sDate);
        }

        var yy = null;
        if(isFull)
        	yy = sDate.getFullYear();
        else
        	yy = sDate.getFullYear();
        var mm = sDate.getMonth();
        var dd = sDate.getDate();
        iVal = ComParseInt(iVal);	//인자가 문자열로 들어온 경우 에러 발생함

        switch(sFlag.toLowerCase()) {
            case "y":   yy += iVal;    break;
            case "m":   mm += iVal;    break;
            case "d":   dd += iVal;    break;
        }

        date = new Date(yy,mm,dd);
        if(isFull)
        	yy = date.getFullYear();
        else
        	yy = date.getYear();
        mm = date.getMonth() + 1;
        dd = date.getDate();

        return ComLpad(mm,2,"0") + sDelim + ComLpad(dd,2,"0") + sDelim + yy;
    } catch(err) { ComFuncErrMsg(err.message); }
}

document.onkeydown=obj_keydown;
function obj_keydown(){ 
    var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
    var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "in_wib_in_no":	
					btn_Search();
				break;	
			case "in_wib_bk_no":	
					btn_Search();
				break;
			default:		
				if(!(t.readOnly)){
				}
				break;
		}
	}
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == true){
        	return false;
        } 
    } 
}
/**
 * IN Booking No 링크 
 */
function btn_link_inbk() {
	var formObj=document.form;
	if (!ComIsEmpty(formObj.wib_bk_no)) {
		var sUrl="./WHInbkMgmt.clt?fwd_bk_no="+ComGetObjValue(formObj.wib_bk_no);
		parent.mkNewFrame("Inbound Booking Management", sUrl);		
	}
}
function btn_link_ctrt(){
	var formObj=document.form;
	if(!ComIsEmpty(formObj.ctrt_no)){
		var sUrl="./CtrtMgmt.clt?ctrt_no="+formObj.ctrt_no.value;
		parent.mkNewFrame('Contract Management', sUrl);
	}
}

function setCellVal(){
	for(var i = 2; i<= sheet1.RowCount() + 1; i++){
		sheet1.SetCellValue(i, 11, Number(peQty[i - 2]));
		sheet1.SetCellValue(i, 21, type[i - 2]);
		sheet1.SetCellValue(i, 22, cntr[i - 2]);
		sheet1.SetCellValue(i, 23, sealNo[i - 2]);
		sheet1.SetCellValue(i, 28, comment[i - 2]);
	}
	peQty = [];
	type = [];
	cntr = [];
	sealNo = [];
	comment = [];
}
function getCellVal(){
	for(var i = 2; i<= sheet1.RowCount() + 1; i++){
		peQty.push(sheet1.GetCellValue(i, 11));
		type.push(sheet1.GetCellValue(i, 21));
		cntr.push(sheet1.GetCellValue(i, 22));
		sealNo.push(sheet1.GetCellValue(i, 23));
		comment.push(sheet1.GetCellValue(i, 28));
	}
}
/**
 * Check Authority Warehouse Code
 * @author tin.luong
 */
function check_authority_wh(){
	var formObj = document.form;
	var sheetObj = sheet1;
	var countwd = 0;
	//List Warehouse from TB_SEQ
	var wh_list_ath = formObj.wh_list_ath.value;
	var arrwhcd =  wh_list_ath.split(',');
	//List warehouse default in User Entry Screen.
	var wh_cfg = formObj.wh_cfg.value;
	var arrwhcd_df =  wh_cfg.split(',');
	
	//Warehosue selected.
	var warehouse = formObj.wh_cd.value;
	for(var i = 0; i < arrwhcd_df.length; i ++){
		for(var j = 0; j < arrwhcd.length; j ++){
			if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
			countwd = countwd + 1;
			}
		}
	}
	if(countwd == 0){
		ComBtnDisable("btnSave");
		ComBtnDisable("btn_reinstate");
		ComBtnDisable("btn_cancel");
		ComBtnDisable("link_TruckFee");
		ComBtnDisable("link_OthCost");
		ComBtnDisable("link_Putaway");
	}else{
		//ComBtnEnable("btn_save");
	}
}

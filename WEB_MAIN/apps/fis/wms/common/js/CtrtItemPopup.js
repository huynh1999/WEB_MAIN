/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CtrtItemPopup.js
*@FileTitle  : Item Search 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/21
=========================================================*/
var docObjects=new Array();
var sheetCnt=0;
function doWork(srcName){
//	var sheetObject1 = sheetObjects[0];
//	var formObject = document.form;
	try {
//		var srcName = ComGetEvent("name");
		switch (srcName) {
		case "SEARCHLIST":
			getData();
			break;
		case "CLOSE":
			ComClosePopup();
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

function setDocumentObject(sheet_obj){
	 docObjects[sheetCnt++]=sheet_obj;
	}

function loadPage() {
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]); 
	}
    initControl();
    getData();
}
/** 
 * initControl()
 */ 
function initControl() {
//	axon_event.addListenerFormat("keypress", "obj_keypress", formObject);
//    // OnChange 이벤트
//    axon_event.addListenerForm("change", "form_onChange", formObject);
    // OnKeyUp 이벤트
    //axon_event.addListener("keyup", "frmObj_OnKeyUp", "dir_agmt_no");
  //- 포커스 나갈때
//    axon_event.addListenerForm('beforedeactivate', 	'form_deactivate', formObject);
//    axon_event.addListenerForm("keydown", "obj_keydown", formObject);
}
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
		case 1:      //IBSheet1 init
		      with(sheetObj){
			 var H1 ="Seq.|Code|Description|Contract No|Item Sys No|LOT_NO|ITEM_PKGBASEQTY|ITEM_PKGUNIT|PKG_LV1_QTY|LV1_CBM|LV1_CBF|LV1_GRS_KGS|LV1_GRS_LBS|LV1_NET_KGS|LV1_NET_LBS|ITEM_REMARK|PKG_LV1_UNIT_CD|PKG_LV3_QTY|PKG_LV3_UNIT_CD|PKG_LV4_QTY|PKG_LV4_UNIT_CD|PKG_INFO|UNIT_CURR_CD|UNIT_PRICE";
		         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
		        
		
		         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		         var headers = [ { Text:H1, Align:"Center"} ];		
		         InitHeaders(headers, info);
		
		         var cols = [ {Type:"Seq",       Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"seq" },
		             {Type:"Text",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"item_cd" },
		             {Type:"Text",     Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"item_nm" },
		             {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"ctrt_no" },
		             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"item_sys_no" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"lot_no" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"item_pkgbaseqty" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"item_pkgunit" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"pkg_lv1_qty" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"lv1_cbm" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"lv1_cbf" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"lv1_grs_kgs" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"lv1_grs_lbs" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"lv1_net_kgs" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"lv1_net_lbs" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"item_remark" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"pkg_lv1_unit_cd" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"pkg_lv3_qty" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"pkg_lv3_unit_cd" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"pkg_lv4_qty" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"pkg_lv4_unit_cd" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"pkg_info" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"unit_curr_cd" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"unit_price" },
		             
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"pkg_pl_std_qty" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"pkg_pl_over_wgt" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fix_loc_cd" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"fix_loc_nm" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"def_loc_cd" },
		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"def_loc_nm" }

		             ];
		          
		         InitColumns(cols);
		         SetSheetHeight(320);
		         SetEditable(0);
		         resizeSheet();		         
            }
		break;
	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}

function getData() {
	var formObj=document.form;
	if ($('#c_ctrt_no').val() == "") {
		ComShowCodeMessage("COM0029");
		return;
	}		
	
	docObjects[0].RemoveAll();
	formObj.f_cmd.value = SEARCH;
	docObjects[0].DoSearch("./CtrtItemPopupGS.clt",FormQueryString(formObj, "") );
}
function btn_Close() {
  ComClosePopup(); 
}
function sheet1_OnDblClick(sheetObj, Row, Col){
	var rtnVal = "";
	rtnVal += sheet1.GetCellValue(Row, "item_cd");  //0                        
	rtnVal += "|";                                                          
	rtnVal += sheet1.GetCellValue(Row, "item_nm");       //1                   
	rtnVal += "|";                                                          
	rtnVal += sheet1.GetCellValue(Row, "ctrt_no");     //2                       
	rtnVal += "|";                                                          
	rtnVal += sheet1.GetCellValue(Row, "item_sys_no");     //3                   
	rtnVal += "|";                                                          
	rtnVal += sheet1.GetCellValue(Row, "lot_no");         //4                    
	rtnVal += "|";                                                          
	rtnVal += sheet1.GetCellValue(Row, "item_pkgbaseqty");  //5                  
	rtnVal += "|";                                                          
	rtnVal += sheet1.GetCellValue(Row, "item_pkgunit");   //6                    
	rtnVal += "|";                                                          
	rtnVal += sheet1.GetCellValue(Row, "pkg_lv1_qty");     //7                   
	rtnVal += "|";                                                          
	rtnVal += sheet1.GetCellValue(Row, "lv1_cbm");      //8                      
	rtnVal += "|";                                                          
	rtnVal += sheet1.GetCellValue(Row, "lv1_cbf");       //9                     
	rtnVal += "|";                                                          
	rtnVal += sheet1.GetCellValue(Row, "lv1_grs_kgs");    //10                    
	rtnVal += "|";                                                          
	rtnVal += sheet1.GetCellValue(Row, "lv1_grs_lbs");     //11                   
	rtnVal += "|";                                                          
	rtnVal += sheet1.GetCellValue(Row, "lv1_net_kgs");//12  
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "lv1_net_lbs");//13  
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "item_remark");//14  
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "pkg_lv1_unit_cd");//15  
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "pkg_lv3_qty");//16  
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "pkg_lv3_unit_cd");//17  
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "pkg_lv4_qty");//18  
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "pkg_lv4_unit_cd");//19  
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "pkg_info");//20  
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "unit_curr_cd");//21  
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "unit_price");//22  
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "pkg_pl_std_qty");//23
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "pkg_pl_over_wgt");//24
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "fix_loc_cd");//25
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "fix_loc_nm");//26
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "def_loc_cd");//27
	rtnVal += "|";
	rtnVal += sheet1.GetCellValue(Row, "def_loc_nm");//28
    ComClosePopup(rtnVal);
}

function sheet1_OnSearchEnd(sheetObj, row, col){
	var formObj=document.form;
	sheetObj.SetSelectRow(-1);
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(keyCode==13 && sheetObj.GetSelectRow() != -1){
		sheet1_OnDblClick(sheetObj, row, col);
	}else{
		return;
	}
}
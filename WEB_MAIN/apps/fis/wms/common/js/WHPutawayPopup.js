var sheetCnt=0;
var docObjects=new Array();
var opener = window.dialogArguments;
if (!opener) opener = parent;
if (!opener) opener=window.opener;
var startRow = 0;
var totalRowMerge = 0;
var item_cd="";
var item_nm="";
var lot_cd="";
var inbound_dt="";
var item_lot_no="";
var inbound_loc_cd="";
var type_nm="";
var unit_nm="";
var qty="";
var qty_ea="";
var non_putaway_qty="";
var item_seq="";
var cust_ord_no="";

var item_cd_ori="";
var item_nm_ori="";
var lot_cd_ori="";
var inbound_dt_ori="";
var item_lot_no_ori="";
var inbound_loc_cd_ori="";
var type_nm_ori="";
var unit_nm_ori="";
var qty_ori="";
var qty_ea_ori="";
var non_putaway_qty_ori="";
var item_seq_ori="";
var cust_ord_no_ori="";
var arrUOM_Code = new Array();
var arrUOM_Name = new Array();

var fix_grid01 = "Grd01"; 
//var fix_grid01="Grd01"; //list tab의 그리드
var opener_fix_grid01="Grd01"; //list tab의 그리드

function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
//		var cal=new ComCalendar();
		switch(srcName) {
			case "SAVE":	
				btn_Save();
				break;
			case "CANCEL":	
				btn_Cancel();
				break;
			case "EXCEL":	
				btn_Excel();
				break;
			case "PRINT":	
				btn_Print();
				break;
			case "CLOSE":	
				btn_Close();
				break;
    } // end switch
	}catch(e) {
		if( e == "[object Error]") {
			//ComShowMessage(OBJECT_ERROR);
		} else {
			//ComShowMessage(e);
		}
	}
}
/**
* Sheet  onLoad
*/
function loadPage() {
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]); 
	}
    initControl();
    //날짜 기본셋팅
	
    //$("#putaway_dt").val(ComGetNowInfo());
	searchInfo();
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/** 
 * initControl()
 */ 
function initControl() {
    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj) {
	var cnt=0;
	switch(sheetObj.id) {
		case "sheet1":      //IBSheet1 init
		    with(sheetObj){
	      
	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
	      var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('WHPutawayPopup_HDR1'), Align:"Center"},
	                      { Text:getLabel('WHPutawayPopup_HDR2'), Align:"Center"} ];
	      InitHeaders(headers, info);
	      
         var cols = [ {Type:"Text",     Hidden:1, 	Width:100, 	Align:"Left", 	ColMerge:1,		SaveName:fix_grid01+"wib_in_no", 				KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:"" 	,   EditLen:14							},
	  	             {Type:"Text",      Hidden:1, 	Width:100, 	Align:"Left", 	ColMerge:1,		SaveName:fix_grid01+"wib_bk_no", 				KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:"" 	,   EditLen:14							},
	  	             {Type:"Text",      Hidden:1, 	Width:100, 	Align:"Left", 	ColMerge:1,		SaveName:fix_grid01+"po_sys_no", 				KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:"" 	,   EditLen:23							},
	  	             {Type:"Text",      Hidden:1, 	Width:100, 	Align:"Left", 	ColMerge:1,		SaveName:fix_grid01+"item_sys_no", 				KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:"" 	,   EditLen:29							},
	  	             {Type:"Text",      Hidden:1, 	Width:100, 	Align:"Left", 	ColMerge:1,		SaveName:fix_grid01+"item_seq", 				KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:"" 	,   EditLen:4							},
	  	             {Type:"CheckBox",  Hidden:0, 	Width:20, 	Align:"Center", ColMerge:1,		SaveName:fix_grid01+"chk", 						KeyField:0,				UpdateEdit:1,		InsertEdit:1,		Format:"" 								},
	  	             {Type:"Text",      Hidden:0, 	Width:90, 	Align:"Left", 	ColMerge:1,		SaveName:fix_grid01+"cust_ord_no", 				KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:"" 								},
	  	             {Type:"PopupEdit", Hidden:0, 	Width:80, 	Align:"Left", 	ColMerge:1,		SaveName:fix_grid01+"item_cd", 					KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:"" 	,   EditLen:20							},
	  	             {Type:"Text",      Hidden:0, 	Width:120, 	Align:"Left", 	ColMerge:1,		SaveName:fix_grid01+"item_nm", 					KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:"" 	,   EditLen:100							},
	  	             {Type:"PopupEdit", Hidden:0, 	Width:80, 	Align:"Center", ColMerge:1,		SaveName:fix_grid01+"inbound_loc_nm",			KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:""							    },
	  	             {Type:"Text",      Hidden:1, 	Width:50, 	Align:"Center", ColMerge:1,		SaveName:fix_grid01+"rcv_snd_dmg_nm",			KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:""							    },
	  	             
	  	             {Type:"Text",     	Hidden:0, 	Width:100, 	Align:"Center", ColMerge:1,		SaveName:fix_grid01+"inbound_lcs_plt", 			KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:""								},
	  	             
	  	             {Type:"PopupEdit", Hidden:0, 	Width:40, 	Align:"Center", ColMerge:1,		SaveName:fix_grid01+"pkgunit", 					KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:""	,   EditLen:5						    },
	  	             {Type:"Int",     	Hidden:0, 	Width:55, 	Align:"Right", 	ColMerge:1,		SaveName:fix_grid01+"pkgqty", 					KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:"Integer",		PointCount:0 ,   EditLen:15  },
	  	             {Type:"Int",     	Hidden:0, 	Width:55, 	Align:"Right", 	ColMerge:1,		SaveName:fix_grid01+"ea_qty", 					KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:"Integer",		PointCount:0 ,   EditLen:18  },
	  	             {Type:"Text",     	Hidden:0, 	Width:75, 	Align:"Right", 	ColMerge:1,		SaveName:fix_grid01+"non_putaway_ea_qty", 		KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:"Integer",		PointCount:0   },
	  	             {Type:"Image",     Hidden:0, 	Width:60, 	Align:"Center", ColMerge:0,		SaveName:fix_grid01+"row_add", 					KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:"" 								},		
	  	             {Type:"Text",     	Hidden:0, 	Width:30, 	Align:"Right", 	ColMerge:1,		SaveName:fix_grid01+"row_add_qty", 				KeyField:0,				UpdateEdit:1,		InsertEdit:1,		Format:"Integer",		PointCount:0	},
	  	             {Type:"Image",     Hidden:0, 	Width:60, 	Align:"Center", ColMerge:1,		SaveName:fix_grid01+"row_del", 					KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:""								},
	  	             {Type:"PopupEdit", Hidden:0, 	Width:80, 	Align:"Center", ColMerge:1,		SaveName:fix_grid01+"putaway_wh_loc_nm", 		KeyField:0,				UpdateEdit:0,		InsertEdit:1,		Format:""								},
	  	             {Type:"Text",     	Hidden:0, 	Width:50, 	Align:"Center", ColMerge:1,		SaveName:fix_grid01+"putaway_wh_loc_prop_nm", 	KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:""								},
	  	             {Type:"CheckBox",  Hidden:0, 	Width:30,   Align:"Right",  ColMerge:1,     SaveName:fix_grid01+"chk_putaway_copy",    		KeyField:0,        		UpdateEdit:1,   	InsertEdit:1,   	Format:"",         PointCount:""},
	  	             {Type:"PopupEdit", Hidden:0, 	Width:60, 	Align:"Center", ColMerge:1,		SaveName:fix_grid01+"putaway_lcs_plt", 			KeyField:0,				UpdateEdit:1,		InsertEdit:1,		Format:""								},
	  	             
	  	             {Type:"Combo", 	Hidden:0, 	Width:100, 	Align:"Center", ColMerge:1,		SaveName:fix_grid01+"putaway_pkgunit", 			KeyField:0,				UpdateEdit:0,		InsertEdit:1,		Format:""							,   EditLen:5	},
	  	             {Type:"Int",     	Hidden:0, 	Width:55, 	Align:"Right", 	ColMerge:1,		SaveName:fix_grid01+"putaway_pkgqty", 			KeyField:0,				UpdateEdit:0,		InsertEdit:1,		Format:"Integer",		PointCount:0,   EditLen:15			},
	  	             {Type:"Int",     	Hidden:0, 	Width:55, 	Align:"Right", 	ColMerge:1,		SaveName:fix_grid01+"putaway_ea_qty", 			KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:"Integer",		PointCount:0,   EditLen:18 			},
	  	             {Type:"Date",     	Hidden:0, 	Width:75, 	Align:"Center", ColMerge:1,		SaveName:fix_grid01+"inbound_dt", 				KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:"Ymd"		,   EditLen:8				},
	  	             {Type:"Text",     	Hidden:0, 	Width:100, 	Align:"Center", ColMerge:1,		SaveName:fix_grid01+"lot_no", 					KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:""				,   EditLen:24				},
	  	             {Type:"Float",    	Hidden:0, 	Width:60, 	Align:"Right", 	ColMerge:1,		SaveName:fix_grid01+"putaway_cbm", 				KeyField:0,				UpdateEdit:1,		InsertEdit:1,		Format:"Float",			PointCount:WMS_CBM_POINT_COUNT	,   EditLen:0		},
	  	             {Type:"Float",    	Hidden:0, 	Width:60, 	Align:"Right", 	ColMerge:1,		SaveName:fix_grid01+"putaway_cbf", 				KeyField:0,				UpdateEdit:1,		InsertEdit:1,		Format:"Float",			PointCount:WMS_CBM_POINT_COUNT	,   EditLen:0		},
	  	             {Type:"Float",     Hidden:0, 	Width:60, 	Align:"Right", 	ColMerge:1,		SaveName:fix_grid01+"putaway_grs_kgs", 			KeyField:0,				UpdateEdit:1,		InsertEdit:1,		Format:"Float",			PointCount:3	,   EditLen:0		},
	  	             {Type:"Float",    	Hidden:0, 	Width:60, 	Align:"Right", 	ColMerge:1,		SaveName:fix_grid01+"putaway_grs_lbs", 			KeyField:0,				UpdateEdit:1,		InsertEdit:1,		Format:"Float",			PointCount:3	,   EditLen:0		},
	  	             {Type:"Float",     Hidden:0, 	Width:60, 	Align:"Right", 	ColMerge:1,		SaveName:fix_grid01+"putaway_net_kgs", 			KeyField:0,				UpdateEdit:1,		InsertEdit:1,		Format:"Float",			PointCount:3	,   EditLen:0		},
	  	             {Type:"Float",     Hidden:0, 	Width:60, 	Align:"Right", 	ColMerge:1,		SaveName:fix_grid01+"putaway_net_lbs", 			KeyField:0,				UpdateEdit:1,		InsertEdit:1,		Format:"Float",			PointCount:3	,   EditLen:0		},
	  	             {Type:"PopupEdit", Hidden:0, 	Width:70, 	Align:"Center", ColMerge:1,		SaveName:fix_grid01+"ctrt_no", 					KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:"" ,   EditLen:10 },
	  	             {Type:"Text",     	Hidden:0, 	Width:140, 	Align:"Left", 	ColMerge:1,		SaveName:fix_grid01+"ctrt_nm", 					KeyField:0,				UpdateEdit:0,		InsertEdit:0,		Format:"" ,   EditLen:100},
	  	             {Type:"Status",    Hidden:1, 	Width:30, 	Align:"Center",					SaveName:fix_grid01+"ibflag",																					 		  },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"putaway_seq",																				Format:"",   EditLen:4 },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"putaway_cnt",																				Format:"" },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"putaway_item_cnt",																			Format:"" },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"rcv_snd_dmg_cd",																			Format:"",   EditLen:1 },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"inbound_loc_cd",																			Format:"",   EditLen:8 },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"fix_loc_cd",																				Format:"",   EditLen:8 },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"putaway_wh_loc_cd",																			Format:"",   EditLen:8 },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"edit_flag",																					Format:"" },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"ob_cnt",																					Format:"Integer"},
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"wh_cd",																						Format:"",   EditLen:8 },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"fix_loc_cd_nm",																				Format:"" },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"put_tp_cd",																					Format:"" },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"put_yn",																					Format:"" },
	  	             {Type:"Text",      Hidden:1, 	Width:0, 	Align:"Center",					SaveName:fix_grid01+"rcv_cbm",																					Format:"Float",PointCount:WMS_CBM_POINT_COUNT,   EditLen:15},
	  	             {Type:"Text",      Hidden:1, 	Width:0, 	Align:"Center",					SaveName:fix_grid01+"rcv_cbf",																					Format:"Float",PointCount:WMS_CBM_POINT_COUNT,   EditLen:15},
	  	             {Type:"Text",      Hidden:1, 	Width:0, 	Align:"Center",					SaveName:fix_grid01+"rcv_grs_kgs",																				Format:"Float",PointCount:3,   EditLen:15},
	  	             {Type:"Text",      Hidden:1, 	Width:0, 	Align:"Center",					SaveName:fix_grid01+"rcv_grs_lbs",																				Format:"Float",PointCount:3,   EditLen:15},
	  	             {Type:"Text",      Hidden:1, 	Width:70, 	Align:"Center",					SaveName:fix_grid01+"rcv_net_kgs",																				Format:"Float",PointCount:3,   EditLen:15},
	  	             {Type:"Text",      Hidden:1, 	Width:50, 	Align:"Center",					SaveName:fix_grid01+"rcv_net_lbs",																				Format:"Float",PointCount:3,   EditLen:15},
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"pkg_lv1_qty",																				Format:"Integer",PointCount:0,   EditLen:15},
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"pkg_lv1_unit_cd",																			Format:""},
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"pkg_lv2_qty",																				Format:"Integer",PointCount:0 },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"pkg_lv2_unit_cd",																			Format:"" },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"pkg_lv3_qty",																				Format:"Integer",PointCount:0 },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"pkg_lv3_unit_cd",																			Format:"" },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"pkg_lv4_qty",																				Format:"Integer",PointCount:0 },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"pkg_lv4_unit_cd",																			Format:"" },
	  	             {Type:"Text",      Hidden:1, 	Width:0, 	Align:"Center",					SaveName:fix_grid01+"lv1_cbm",																					Format:"Float",PointCount:WMS_CBM_POINT_COUNT,   EditLen:15 },
	  	             {Type:"Text",      Hidden:1, 	Width:0, 	Align:"Center",					SaveName:fix_grid01+"lv1_cbf",																					Format:"Float",PointCount:WMS_CBM_POINT_COUNT,   EditLen:15 },
	  	             {Type:"Text",      Hidden:1, 	Width:0, 	Align:"Center",					SaveName:fix_grid01+"lv1_grs_kgs",																				Format:"Float",PointCount:3,   EditLen:15 },
	  	             {Type:"Text",      Hidden:1, 	Width:0, 	Align:"Center",					SaveName:fix_grid01+"lv1_grs_lbs",																				Format:"Float",PointCount:3,   EditLen:15 },
	  	             {Type:"Text",      Hidden:1, 	Width:70, 	Align:"Center",					SaveName:fix_grid01+"lv1_net_kgs",																				Format:"Float",PointCount:3,   EditLen:15 },
	  	             {Type:"Text",      Hidden:1, 	Width:50, 	Align:"Center",					SaveName:fix_grid01+"lv1_net_lbs",																				Format:"Float",PointCount:3,   EditLen:15 },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"supv_nm",																					Format:"" },
	  	             {Type:"Date",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"putaway_dt",																				Format:"Ymd",   EditLen:8 },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"putaway_hm_fr",																				Format:"",   EditLen:4 },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"putaway_hm_to",																				Format:"",   EditLen:4 },
	  	             {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"msg_to_wk",																					Format:"",   EditLen:100 },
         			 {Type:"Text",      Hidden:1, 	Width:80, 	Align:"Center",					SaveName:fix_grid01+"Indexing",																					Format:"" } ];
	      InitColumns(cols);
	      SetSheetHeight(350);
	      SetEditable(1);
	      SetColProperty(0 ,fix_grid01+"putaway_wh_loc_nm" , {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
	      SetColProperty(0 ,fix_grid01+"putaway_pkgunit", {AcceptKeys:"E|N|" , InputCaseSensitive:1});
	      SetSelectionMode(0);
	      }


			break;
	}
}
function btn_Close(){
  ComClosePopup(); 
}
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */
//document.onclick=processButtonClick;
//버튼 네임으로 구분하여 프로세스를 분기처리하는 이벤트핸들러 */
/*function processButtonClick(){
	var formObj=document.form;
	try {
		var srcName=ComGetEvent("name");		
		if (ComDisableTdButton(srcName, 2)) {
				return;
			}
		switch(srcName) {
			case "btn_putaway_dt": 	
				var cal=new ComCalendar();
	            cal.select(formObj.putaway_dt, 'yyyy-MM-dd');
				break;
      } // end switch
	}catch(e) {
		if( e == "[object Error]") {
			//ComShowMessage(OBJECT_ERROR);
		} else {
			//ComShowMessage(e);
		}
	}
}*/
function searchInfo()
{
	var formObj=document.form;
	var DocinDatas = "";
	
	var openerSheetObj =  opener.docObjects[0];
	/*if(undefined == opener.sel_tab){
		var openerSelTab =opener.document.form.sel_tab.value;
	}else
	var openerSelTab = opener.sel_tab.value;*/
	
	var fix_Docin = "";
	
	var print_wib_bk_no_in = "";
	/*if (openerSelTab == "01") {
		var sRow = openerSheetObj.FindCheckedRow(opener_fix_grid01 + "chk");
		var arrRow = sRow.split("|"); // 결과 : "1|3|5|"
		for ( var i = 0; i <= arrRow.length - 1; i++) {
			if (i == 0) {
				DocinDatas = DocinDatas + "sel_wib_bk_no="+ openerSheetObj.GetCellValue(arrRow[i],
								opener_fix_grid01 + "wib_bk_no");
				print_wib_bk_no_in = "'"
						+ openerSheetObj.GetCellValue(arrRow[i],
								opener_fix_grid01 + "wib_bk_no") + "'";
			} else {
				DocinDatas = DocinDatas
						+ ","
						+ openerSheetObj.GetCellValue(arrRow[i],
								opener_fix_grid01 + "wib_bk_no");
				print_wib_bk_no_in = print_wib_bk_no_in
						+ ",'"
						+ openerSheetObj.GetCellValue(arrRow[i],
								opener_fix_grid01 + "wib_bk_no") + "'";
			}
		}
	} else if (openerSelTab == "02") {*/
		DocinDatas = fix_Docin + "sel_wib_bk_no="
				+ $("#sel_wib_bk_no", opener.document).val();
		print_wib_bk_no_in = "'" + $("#sel_wib_bk_no", opener.document).val()
				+ "'";
	/*}*/
	var sheetObj = docObjects[0];
	formObj.f_cmd.value=SEARCH;
	//var sXml = sheetObj.GetSearchData("./searchWHPutawayPopupGS.clt", FormQueryString(formObj, "") + DocinDatas);
	var sXml = sheetObj.GetSearchData("./searchWHPutawayPopupGS.clt", FormQueryString(formObj, "") +"&"+ DocinDatas);
	sheetObj.LoadSearchData(sXml, {	Sync : 1});
	//$("#print_wib_bk_no_in").val(print_wib_bk_no_in);
	$("#print_wib_bk_no_in").val(print_wib_bk_no_in);
}
function sheet1_OnSearchEnd(sheetObj, ErrMsg) {
	// MJY
	// var ob_cnt_sum = 0;
	var edit_flag = "";
	var put_selected_row = -1;
	var put_yn_cnt = 0;
	sheetObj.SetImageList(1,APP_PATH+"/web/img/main/btn_s_add.gif");
	sheetObj.SetImageList(2,APP_PATH+"/web/img/main/btn_s_delete.gif");
	
	doDispPaging(sheetObj.GetCellValue(2, fix_grid01+'Indexing'), getObj('pagingTb'));
	
	for ( var i = sheetObj.HeaderRows(); i <= sheetObj.LastRow(); i++) {
		// ob_cnt_sum += parseInt(sheetObj.CellValue(i+sheetObj.HeaderRows,
		// fix_grid01+"ob_cnt"));
		edit_flag = sheetObj.GetCellValue(i, fix_grid01 + "edit_flag");
		fnSetPutawayItemEditable(sheetObj, i, edit_flag); // 수정불가
		if (sheetObj.GetCellValue(i, fix_grid01 + "put_yn") == "Y"
				&& put_yn_cnt == 0) {
			put_selected_row = i;
			put_yn_cnt++;
		}
		var sParam="ctrt_no=" + sheetObj.GetCellValue(i, fix_grid01 + "ctrt_no") + "&item_cd=" + encodeURIComponent(sheetObj.GetCellValue(i, fix_grid01 + "item_cd")) + "&wh_cd=" + sheetObj.GetCellValue(i, fix_grid01 + "wh_cd");
		ajaxSendPost(resultsearchWHItemCodeInfo, i, '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
	}
	mergeCell(2);
	mergeCell2(2);
	
	if (sheetObj.RowCount() > 0) {
		ComBtnEnable("btn_Print");
		if (put_selected_row > -1) {
			$("#supv_nm").val(
					sheetObj.GetCellValue(put_selected_row, fix_grid01
							+ "supv_nm"));
			$("#putaway_dt").val(
					sheetObj.GetCellText(put_selected_row, fix_grid01
							+ "putaway_dt"));
			$("#putaway_hm_fr").val(
					sheetObj.GetCellText(put_selected_row, fix_grid01
							+ "putaway_hm_fr"));
			$("#putaway_hm_to").val(
					sheetObj.GetCellText(put_selected_row, fix_grid01
							+ "putaway_hm_to"));
			$("#msg_to_wk").val(
					sheetObj.GetCellValue(put_selected_row, fix_grid01
							+ "msg_to_wk"));
		} else {
			$("#supv_nm").val("");
			$("#putaway_dt").val(ComGetNowInfo());
			$("#putaway_hm_fr").val("");
			$("#putaway_hm_to").val("");
			$("#msg_to_wk").val("");
		}
	} else {
		ComBtnDisable("btn_Print");
	}
	for (var y = sheetObj.HeaderRows(); y <= sheetObj.RowCount() + 1; y++){
		sheetObj.SetCellValue(y,fix_grid01+"ibflag", 'R');
	}
	//ComSetObjValue(formObj.ob_cnt, ob_cnt_sum);
}

function resultsearchWHItemCodeInfo (reqVal, Row) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;

	 if(doc[0]=='OK'){
		  if(typeof(doc[1])!='undefined'){
			   //조회해온 결과를 Parent에 표시함
			   var rtnArr=doc[1].split('^@');
			   var prefix= fix_grid01;
			   if(rtnArr[0] != ""){
				   sheet1.CellComboItem(Row,prefix+"putaway_pkgunit",	{ComboText:rtnArr[29], ComboCode: rtnArr[28]} );
			   }
		  }
	 }
}

/**
 * Putaway Loc, Unit, QTY 수정불가
 * @param sheetObj
 * @param Row
 * @param Value
 */
function fnSetPutawayItemEditable(sheetObj, Row, Value) {
	if (Value == "UPDATE") {		
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_wh_loc_nm",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_pkgunit",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_pkgqty",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_cbm",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_cbf",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_grs_kgs",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_grs_lbs",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_net_kgs",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_net_lbs",0);
		sheetObj.SetCellImage(Row, fix_grid01+"row_add",1);
 		sheetObj.SetCellImage(Row, fix_grid01+"row_del","");
	} else {		
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_wh_loc_nm",1);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_pkgunit",1);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_pkgqty",1);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_cbm",1);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_cbf",1);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_grs_kgs",1);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_grs_lbs",1);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_net_kgs",1);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_net_lbs",1);
		sheetObj.SetCellImage(Row, fix_grid01+"row_add",1);
 		sheetObj.SetCellImage(Row, fix_grid01+"row_del","");
	}	
	// Item 조회시 고정 Location 정보와 기 입력된 Location 정보가 같을 경우 putaway Loc 비활성화 처리
if (sheetObj.GetCellValue(Row, fix_grid01+"fix_loc_cd") == sheetObj.GetCellValue(Row, fix_grid01+"inbound_loc_cd"))
	{	
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_wh_loc_nm",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_pkgunit",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_pkgqty",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"row_add",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"row_add_qty",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_cbm",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_cbf",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_grs_kgs",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_grs_lbs",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_net_kgs",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"putaway_net_lbs",0);
		sheetObj.SetCellEditable(Row, fix_grid01+"row_add_qty",0);
 		sheetObj.SetCellImage(Row, fix_grid01+"row_add","");
	}	
}
function sheet1_OnClick(sheetObj,Row, Col, Value){
	var colName=sheetObj.ColSaveName(Col);
	if(colName == fix_grid01 + "row_add")	
	{
		add_row(sheetObj, Row, Col);
	} else if (colName == fix_grid01 + "row_del") 
	{
		del_row(sheetObj, Row, Col);
	}
}
function add_row(sheetObj, Row, Col) {
	// Item 조회시 고정 Location 정보와 기 입력된 Location 정보가 같을 경우 putaway Loc 비활성화 처리
	if (sheetObj.GetCellValue(Row, fix_grid01 + "fix_loc_cd") == sheetObj
			.GetCellValue(Row, fix_grid01 + "inbound_loc_cd")) {
		return;
	}
	sheetObj.CheckAll(fix_grid01 + "chk", 0);
	var row_cnt = ComParseInt(sheetObj.GetCellValue(Row, fix_grid01
			+ "row_add_qty"));
	var col_nm = "wib_in_no|wib_bk_no|po_sys_no|cust_ord_no|item_cd|item_nm|item_sys_no|item_seq|inbound_loc_cd|inbound_loc_nm|rcv_snd_dmg_nm|pkgunit|pkgqty|ea_qty|ctrt_no|ctrt_nm|wh_cd|fix_loc_cd|fix_loc_cd_nm|rcv_snd_dmg_cd|put_tp_cd|pkg_lv1_qty|pkg_lv1_unit_cd|pkg_lv2_qty|pkg_lv2_unit_cd|pkg_lv3_qty|pkg_lv3_unit_cd|pkg_lv4_qty|pkg_lv4_unit_cd|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|inbound_dt|lot_no|rcv_cbm|rcv_cbf|rcv_grs_kgs|rcv_grs_lbs|rcv_net_kgs|rcv_net_lbs|non_putaway_ea_qty|inbound_lcs_plt|putaway_pkgunit";
	var col_nm_arr = col_nm.split("|");
	
	var sParam="ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no") + "&item_cd=" + encodeURIComponent(sheetObj.GetCellValue(Row, fix_grid01 + "item_cd")) + "&wh_cd=" + sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd");
	ajaxSendPost(getUOMList, i, '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
	
	for ( var i = 0; i < row_cnt; i++) {
		var row = sheetObj.DataInsert(); // 현재 선택된 행의 바로 아래에 생성
		for ( var m = 0; m < col_nm_arr.length; m++) {
			sheetObj.SetCellValue(row, fix_grid01 + col_nm_arr[m], sheetObj.GetCellValue(Row, fix_grid01 + col_nm_arr[m]), 0);
			if((fix_grid01+ "putaway_pkgunit") == (fix_grid01 + col_nm_arr[m])){
				sheetObj.CellComboItem(row, fix_grid01 + "putaway_pkgunit",	{ComboText:arrUOM_Code, ComboCode: arrUOM_Name} );
			}
		}
		sheetObj.SetCellValue(row, fix_grid01 + "row_add_qty", 1, 0);
		sheetObj.SetCellValue(row, fix_grid01+"row_add",sheetObj.GetCellValue(Row, fix_grid01+"row_add"),0);
		sheetObj.SetCellValue(row, fix_grid01+"row_del",sheetObj.GetCellValue(Row, fix_grid01+"row_del"),0);
		sheetObj.SetCellValue(row, fix_grid01 + "edit_flag", "NEW", 0);
		sheetObj.SetCellImage(row, fix_grid01+"row_del",2);
		sheetObj.SetCellValue(row, fix_grid01 + "putaway_seq", "", 0);
	}
	mergeCell(2);
	sheet1.SetSelectRow(Row);
}

function getUOMList(reqVal, Row) {
	var doc=getAjaxMsgXML(reqVal);
	arrUOM_Code = new Array();
	arrUOM_Name = new Array();
	var formObj=document.form;
	 if(doc[0]=='OK'){
		  if(typeof(doc[1])!='undefined'){
			   //조회해온 결과를 Parent에 표시함
			   var rtnArr=doc[1].split('^@');
			   var prefix= fix_grid01;
			   if(rtnArr[0] != ""){
				   arrUOM_Code = rtnArr[29];
				   arrUOM_Name = rtnArr[28];
			   }
		  }
	 }
}

function del_row(sheetObj, Row, Col) {
	if (sheetObj.GetRowStatus(Row) == "I") {
		sheetObj.RowDelete(Row, false);
	}
}
function sheet1_OnChange(sheetObj, Row, Col, Value) {
	cur_row = Row;
	var colStr = sheetObj.ColSaveName(Col);
	var sUrl = "";
	if (colStr == fix_grid01 + "chk") {
		// 셀merge되는 기준별로 모두 체크 또는 체크해지
		var key_org = sheetObj.GetCellValue(Row, fix_grid01 + "wib_in_no")
				+ "|" + sheetObj.GetCellValue(Row, fix_grid01 + "wib_bk_no")
				+ "|" + sheetObj.GetCellValue(Row, fix_grid01 + "po_sys_no")
				+ "|" + sheetObj.GetCellValue(Row, fix_grid01 + "item_sys_no")
				+ "|" + sheetObj.GetCellValue(Row, fix_grid01 + "item_seq");
		for ( var i = sheetObj.HeaderRows(); i <= sheetObj.LastRow(); i++) {
			var key = sheetObj.GetCellValue(i, fix_grid01 + "wib_in_no") + "|"
					+ sheetObj.GetCellValue(i, fix_grid01 + "wib_bk_no") + "|"
					+ sheetObj.GetCellValue(i, fix_grid01 + "po_sys_no") + "|"
					+ sheetObj.GetCellValue(i, fix_grid01 + "item_sys_no")
					+ "|" + sheetObj.GetCellValue(i, fix_grid01 + "item_seq");
			if (key_org == key) {
				sheetObj.SetCellValue(i, fix_grid01 + "chk", Value, 0);
			}
		}
	} else if (colStr == fix_grid01 + "putaway_pkgunit") {
		if (Value != "") {
			var putaway_pkgunit=Value.trim();
			var ctrt_no=sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no").trim();
			var item_sys_no=sheetObj.GetCellValue(Row, fix_grid01 + "item_sys_no").trim();
			ajaxSendPost(resultCalcPutawayEaQty, Row, '&goWhere=aj&bcKey=searchPutawayEaQty&putaway_pkgunit='+putaway_pkgunit+"&ctrt_no="+ctrt_no
					+ "&item_sys_no="   + item_sys_no, './GateServlet.gsl');
		} else {
			settring_ea_qty(sheetObj, Row);
		}
	} else if (colStr == fix_grid01 + "putaway_wh_loc_nm") {
		if (Value != "") {			

			var fix_loc_nm="";
			if (!ComIsEmpty(sheetObj.GetCellValue(Row, fix_grid01+"fix_loc_cd"))) {
				fix_loc_nm=sheetObj.GetCellValue(Row,fix_grid01 + "fix_loc_cd_nm")
			}						
			var sParam="f_loc_cd=" + sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd") + "&f_wh_loc_nm=" + Value +"&f_fix_wh_loc_nm="+fix_loc_nm+"&f_putaway_flg=Y"+"&f_put_tp_cd="+sheetObj.GetCellValue(Row, fix_grid01 + "put_tp_cd");
			ajaxSendPost(resultWarehouseLocInfoForName, sheetObj, '&goWhere=aj&bcKey=searchWarehouseLocInfoForName&'+sParam, './GateServlet.gsl');
			
		} else {
			sheetObj.SetCellValue(Row, fix_grid01 + "putaway_wh_loc_cd", "", 0);
			sheetObj.SetCellValue(Row, fix_grid01 + "putaway_wh_loc_prop_nm", "", 0);
		}
	} else if (colStr == fix_grid01 + "putaway_pkgqty") {
		var qty = Value;
		// 음수체크
		if (Value < 0) {
			qty = Math.abs(Value);
			sheetObj.SetCellValue(Row, Col, qty, 0);
		}
		settring_ea_qty(sheetObj, Row);
	} else if (colStr == (fix_grid01 + "putaway_cbf") && Value != "") {
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("CBF_CBM", (fix_grid01 + "putaway_cbf"), (fix_grid01 + "putaway_cbm"), sheetObj);
		unitConvertGrid("CBF_CBM", (fix_grid01 + "putaway_cbf"), (fix_grid01 + "putaway_cbm"), sheetObj);
	} else if (colStr == (fix_grid01+"putaway_cbm") && Value != "") {
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("CBM_CBF", (fix_grid01+"putaway_cbm"), (fix_grid01+"putaway_cbf"), sheetObj);
		unitConvertGrid("CBM_CBF", (fix_grid01+"putaway_cbm"), (fix_grid01+"putaway_cbf"), sheetObj);
	} else if (colStr == (fix_grid01 + "putaway_grs_lbs") && Value != "") {
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("LB_KG", (fix_grid01 + "putaway_grs_lbs"), (fix_grid01 + "putaway_grs_kgs"), sheetObj);
		unitConvertGrid("LB_KG", (fix_grid01 + "putaway_grs_lbs"), (fix_grid01 + "putaway_grs_kgs"), sheetObj);
	} else if (colStr == (fix_grid01+"putaway_grs_kgs") && Value != "") {
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("KG_LB", (fix_grid01+"putaway_grs_kgs"), (fix_grid01+"putaway_grs_lbs"), sheetObj);
		unitConvertGrid("KG_LB", (fix_grid01+"putaway_grs_kgs"), (fix_grid01+"putaway_grs_lbs"), sheetObj);
	} else if (colStr == (fix_grid01 + "putaway_net_lbs") && Value != "") {
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("LB_KG", (fix_grid01 + "putaway_net_lbs"), (fix_grid01 + "putaway_net_kgs"), sheetObj);
		unitConvertGrid("LB_KG", (fix_grid01 + "putaway_net_lbs"), (fix_grid01 + "putaway_net_kgs"), sheetObj);
	} else if (colStr == (fix_grid01+"putaway_net_kgs") && Value != "") {
		//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
		//funcKGS_CBM_CAC("KG_LB", (fix_grid01+"putaway_net_kgs"), (fix_grid01+"putaway_net_lbs"), sheetObj);
		unitConvertGrid("KG_LB", (fix_grid01+"putaway_net_kgs"), (fix_grid01+"putaway_net_lbs"), sheetObj);
	} else if(colStr == fix_grid01 + "chk_putaway_copy") {
		if(Value == "1") {
			if(sheetObj.GetCellEditable(Row, fix_grid01+"putaway_lcs_plt") == 1){
				sheetObj.SetCellValue(Row, fix_grid01+"putaway_lcs_plt", sheetObj.GetCellValue(Row, fix_grid01+"inbound_lcs_plt"));
			}
			if(sheetObj.GetCellEditable(Row, fix_grid01+"putaway_pkgunit") == 1){
				sheetObj.SetCellValue(Row, fix_grid01+"putaway_pkgunit", sheetObj.GetCellValue(Row, fix_grid01+"pkgunit"));
			}
			if(sheetObj.GetCellEditable(Row, fix_grid01+"putaway_pkgqty") == 1){
				sheetObj.SetCellValue(Row, fix_grid01+"putaway_pkgqty", sheetObj.GetCellValue(Row, fix_grid01+"pkgqty"));
			}
		} else {
			if(sheetObj.GetCellEditable(Row, fix_grid01+"putaway_lcs_plt") == 1){
				sheetObj.SetCellValue(Row, fix_grid01+"putaway_lcs_plt", "");
			}
			if(sheetObj.GetCellEditable(Row, fix_grid01+"putaway_pkgunit") == 1){
				sheetObj.SetCellValue(Row, fix_grid01+"putaway_pkgunit", "");
			}
			if(sheetObj.GetCellEditable(Row, fix_grid01+"putaway_pkgqty") == 1){
				sheetObj.SetCellValue(Row, fix_grid01+"putaway_pkgqty", 0);
			}
		}
	}
}
var cur_row;
function resultWarehouseLocInfoForName(reqVal, sheetObj){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	var Row = cur_row;
	var sheetObj = sheet1;
	var prefix = "Grd01";
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				sheetObj.SetCellValue(Row, fix_grid01+"putaway_wh_loc_cd", rtnArr[0],0); // wh_loc_cd
				sheetObj.SetCellValue(Row, fix_grid01+"putaway_wh_loc_nm", rtnArr[1],0);
				sheetObj.SetCellValue(Row, fix_grid01+"putaway_wh_loc_prop_nm", rtnArr[4],0);
				//6459[Hanaro] WMS issue (Locatoin, Excel Upload, Inventory movement)  
				var wh_loc_cd = rtnArr[0];
				var wh_cd = sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd");
				ajaxSendPost(chkUsedLoc, "reqVal", "&goWhere=aj&bcKey=chkUsedLoc&f_wh_loc_cd="+ wh_loc_cd + "&f_wh_cd="+wh_cd, "./GateServlet.gsl");
			}
			else{
				sheetObj.SetCellValue(Row, fix_grid01+"putaway_wh_loc_cd", "",0);
				sheetObj.SetCellValue(sheetObj.GetSelectRow(),  fix_grid01+"putaway_wh_loc_nm", "",0);
				sheetObj.SetCellValue(Row, fix_grid01+"putaway_wh_loc_prop_nm", "",0);
				sheetObj.SelectCell(sheetObj.GetSelectRow(), fix_grid01+"putaway_wh_loc_cd");
			}
		}
		else{
			sheetObj.SetCellValue(Row, fix_grid01+"putaway_wh_loc_cd", "",0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(),  fix_grid01+"putaway_wh_loc_nm", "",0);
			sheetObj.SetCellValue(Row, fix_grid01+"putaway_wh_loc_prop_nm", "",0);
			sheetObj.SelectCell(sheetObj.GetSelectRow(), fix_grid01+"putaway_wh_loc_cd");
		}
	}
}
/*
 * receving 정보바뀐경우 os계산 ajax return function
 */
function resultCalcPutawayEaQty(reqVal, rows) {
	var prefix="Grd01";
	var sheetObj = sheet1;
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	var Row = rows;
	var Col = sheetObj.GetSelectCol();
	var suYn="";
	var suValue="";
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				suYn=rtnArr[2];
				if (suYn == "" || suYn == null)	{
					alert("error"); //TODO : MJY MESSAGE
					return;
				}
				if (suYn == "N") {
					suValue = rtnArr[3];
					ComShowCodeMessage(suValue); //COM0313~COM0315
					sheetObj.SetCellValue(Row, fix_grid01 + "putaway_ea_qty",0);
					sheetObj.SetCellValue(Row, Col,"");
					sheetObj.SelectCell(Row, Col);
					return;
				}
				var putaway_ea_qty= rtnArr[1];
				sheetObj.SetCellValue(Row, fix_grid01 + "putaway_ea_qty",putaway_ea_qty);
			}
			else{
				sheetObj.SetCellValue(Row, fix_grid01 + "putaway_ea_qty","");
			}
		}
		else{
			sheetObj.SetCellValue(Row, prefix + "putaway_ea_qty","");
		}
		settring_ea_qty(sheetObj, Row);
	}
}
function sheet1_OnPopupClick(sheetObj, Row, Col) {
	var colName = sheetObj.ColSaveName(Col);
	var sUrl = "";
	with (sheetObj) {
		if (colName == fix_grid01 + "putaway_pkgunit") {
			sUrl = "CommonCodePopup.clt?grp_cd=A6&code="
					+ sheetObj.GetCellValue(Row, Col) + "&wh_flag=Y"
					+ "&ctrt_no="
					+ sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no")
					+ "&item_sys_no="
					+ sheetObj.GetCellValue(Row, fix_grid01 + "item_sys_no");
			callBackFunc = "setPkgunitGrid";
			modal_center_open(sUrl, callBackFunc, 400,560,"yes");
			
		} else if (colName == fix_grid01 + "putaway_wh_loc_nm") {
			var loc_prop = "";
			var not_loc_prop = "";
//			if (sheetObj.GetCellValue(Row, fix_grid01 + "rcv_snd_dmg_cd") == "D") {
//				loc_prop = "DMG";
//			} else {
//				not_loc_prop = "DMG";
//			}
			sUrl = "WarehouseLocPopup.clt?f_loc_cd="
					+ sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd")
					+ "&f_loc_prop=" + loc_prop + "&f_not_loc_prop="
					+ not_loc_prop + "&f_put_tp_cd="
					+ sheetObj.GetCellValue(Row, fix_grid01 + "put_tp_cd")
					+ "&f_putaway_flg=Y";
			if (sheetObj.GetCellValue(Row, fix_grid01 + "fix_loc_cd").trim() != "") {
				sUrl = sUrl
						+ "&f_fix_wh_loc_nm="
						+ encodeURIComponent(sheetObj.GetCellValue(Row,
								fix_grid01 + "fix_loc_cd_nm"));
			}
			callBackFunc = "setWhLocationGrid";
			modal_center_open(sUrl, callBackFunc, 700, 520,"yes");
			
		} else if (colName == fix_grid01 + "putaway_lcs_plt") {
			//validation
			if(sheetObj.GetCellValue(Row, fix_grid01 + "putaway_wh_loc_nm") ==""){
				ComShowCodeMessage("COM0778");
				sheetObj.SelectCell(Row, fix_grid01 + "putaway_wh_loc_nm");
				return;
			}
			sUrl = "LicPlatPopup.clt?ctrt_no=" + sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no") + "&expt_log_cd=" 
				+ sheetObj.GetCellValue(Row, fix_grid01 + "putaway_lcs_plt") + "&wh_cd=" + sheetObj.GetCellValue(Row, fix_grid01 + "wh_cd")
				+ "&loc_cd=" + sheetObj.GetCellValue(Row, fix_grid01 + "putaway_wh_loc_cd") + "&loc_nm=" + sheetObj.GetCellValue(Row, fix_grid01 + "putaway_wh_loc_nm");
			callBackFunc = "setLicPlatPopup";
			modal_center_open(sUrl, callBackFunc, 750, 520,"yes");
			
		}
	}
}
function setLicPlatPopup(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var rtnValArr = rtnVal.split("|");
			var sheetObj=docObjects[0];
			var prefix= fix_grid01;
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"putaway_lcs_plt",rtnValArr[0],0);
		 }
}
function setWhLocationGrid(rtnVal) {
	var sheetObj = docObjects[0];
	var formObj = document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"putaway_wh_loc_cd",rtnValAry[0],0);// wh_loc_cd
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"putaway_wh_loc_nm",rtnValAry[1],0);// wh_loc_nm
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01+"putaway_wh_loc_prop_nm",rtnValAry[4],0);// prop_nm
	//6459[Hanaro] WMS issue (Locatoin, Excel Upload, Inventory movement)  
	var wh_loc_cd = rtnValAry[0];
	var wh_cd = rtnValAry[12];
	ajaxSendPost(chkUsedLoc, "reqVal", "&goWhere=aj&bcKey=chkUsedLoc&f_wh_loc_cd="+ wh_loc_cd + "&f_wh_cd="+wh_cd, "./GateServlet.gsl");
	 }
}
function setPkgunitGrid(rtnVal, row, col, sheetIdx) {
	var sheetObj = docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), fix_grid01
				+ "putaway_pkgunit", rtnValAry[1], 0);
		settring_ea_qty(sheetObj, row);
	}
}
function settring_ea_qty(sheetObj, Row) {
	// ea 환산
	var ea_qty = calc_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row,
			fix_grid01 + "putaway_pkgunit"), sheetObj.GetCellValue(Row,
			fix_grid01 + "putaway_pkgqty"));
	sheetObj.SetCellValue(Row, fix_grid01 + "putaway_ea_qty", ea_qty, 0);
	// measure
	var pkg_lv1_qty = eval(sheetObj.GetCellValue(Row, fix_grid01 + "pkg_lv1_qty"));
	var lv1_cbm = eval(sheetObj.GetCellValue(Row, fix_grid01 + "lv1_cbm"));
	var lv1_cbf = eval(sheetObj.GetCellValue(Row, fix_grid01 + "lv1_cbf"));
	var lv1_grs_kgs = eval(sheetObj.GetCellValue(Row, fix_grid01 + "lv1_grs_kgs"));
	var lv1_grs_lbs = eval(sheetObj.GetCellValue(Row, fix_grid01 + "lv1_grs_lbs"));
	var lv1_net_kgs = eval(sheetObj.GetCellValue(Row, fix_grid01 + "lv1_net_kgs"));
	var lv1_net_lbs = eval(sheetObj.GetCellValue(Row, fix_grid01 + "lv1_net_lbs"));
//	var putaway_cbm = Math.round((pkg_lv1_qty * ea_qty) * lv1_cbm *1000)/1000;
//	var putaway_cbf = Math.round((pkg_lv1_qty * ea_qty) * lv1_cbf*1000)/1000;
	var putaway_cbm = parseFloat(pkg_lv1_qty * ea_qty * lv1_cbm).toFixed(WMS_CBM_POINT_COUNT);
	var putaway_cbf = parseFloat(pkg_lv1_qty * ea_qty * lv1_cbf).toFixed(WMS_CBM_POINT_COUNT);

	var putaway_grs_kgs = Math.round((pkg_lv1_qty * ea_qty) * lv1_grs_kgs*1000)/1000;
	var putaway_grs_lbs = Math.round((pkg_lv1_qty * ea_qty) * lv1_grs_lbs*1000)/1000;
	var putaway_net_kgs = Math.round((pkg_lv1_qty * ea_qty) * lv1_net_kgs*1000)/1000;
	var putaway_net_lbs = Math.round((pkg_lv1_qty * ea_qty) * lv1_net_lbs*1000)/1000;

	sheetObj.SetCellValue(Row, fix_grid01 + "putaway_cbm", putaway_cbm , 0);
	sheetObj.SetCellValue(Row, fix_grid01 + "putaway_cbf", putaway_cbf, 0);
	sheetObj.SetCellValue(Row, fix_grid01 + "putaway_grs_kgs", putaway_grs_kgs, 0);
	sheetObj.SetCellValue(Row, fix_grid01 + "putaway_grs_lbs", putaway_grs_lbs, 0);
	sheetObj.SetCellValue(Row, fix_grid01 + "putaway_net_kgs", putaway_net_kgs, 0);
	sheetObj.SetCellValue(Row, fix_grid01 + "putaway_net_lbs", putaway_net_lbs, 0);
}
function calculate_re_putaway(Row, Key){
	var sheetObj = sheet1;
	var ea_qty = calc_ea_qty(sheetObj, Row, sheetObj.GetCellValue(Row,fix_grid01 + "putaway_pkgunit"), sheetObj.GetCellValue(Row,fix_grid01 + "putaway_pkgqty"));
	var pkg_lv1_qty = eval(sheetObj.GetCellValue(Row, fix_grid01 + "pkg_lv1_qty"));
	var lv1_cbm = eval(sheetObj.GetCellValue(Row, fix_grid01 + "lv1_cbm"));
	var lv1_cbf = eval(sheetObj.GetCellValue(Row, fix_grid01 + "lv1_cbf"));
	var lv1_grs_kgs = eval(sheetObj.GetCellValue(Row, fix_grid01 + "lv1_grs_kgs"));
	var lv1_grs_lbs = eval(sheetObj.GetCellValue(Row, fix_grid01 + "lv1_grs_lbs"));
	var lv1_net_kgs = eval(sheetObj.GetCellValue(Row, fix_grid01 + "lv1_net_kgs"));
	var lv1_net_lbs = eval(sheetObj.GetCellValue(Row, fix_grid01 + "lv1_net_lbs"));
	var returnVal;

	//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
	var point_count = 3;

	if(Key=="putaway_cbm"){
		point_count = WMS_CBM_POINT_COUNT;
		returnVal = (pkg_lv1_qty * ea_qty) * lv1_cbm;
	}else if(Key=="putaway_cbf"){
		point_count = WMS_CBM_POINT_COUNT;
		returnVal = (pkg_lv1_qty * ea_qty) * lv1_cbf ;
	}else if(Key=="putaway_grs_kgs"){
		returnVal = (pkg_lv1_qty * ea_qty) * lv1_grs_kgs ;
	}else if(Key=="putaway_grs_lbs"){
		returnVal = (pkg_lv1_qty * ea_qty) * lv1_grs_lbs ;
	}else if(Key=="putaway_net_kgs"){
		returnVal = (pkg_lv1_qty * ea_qty) * lv1_net_kgs ;
	}else if(Key=="putaway_net_lbs"){
		returnVal = (pkg_lv1_qty * ea_qty) * lv1_net_lbs ;
	}

	return roundXL(returnVal,point_count);
}

function calc_ea_qty(sheetObj, Row, input_unit, input_qty) {
	var pkg_qty = 0;
	if (input_unit.trim() == "") {
		return 0;
	}
	// item의 pkg_unit별 qty를 검색한다.
	pkg_qty = get_unit_qty(sheetObj, Row, input_unit);
	return pkg_qty * ComParseInt(input_qty);
}
function get_unit_qty(sheetObj, Row, input_unit) {
	var pkg_qty = 0;
	// item의 pkg_unit별 qty를 검색한다.
	for ( var i = 1; i <= 4; i++) {
		if (sheetObj
				.GetCellValue(Row, fix_grid01 + "pkg_lv" + (i) + "_unit_cd") == input_unit) {
			pkg_qty = ComParseInt(sheetObj.GetCellValue(Row, fix_grid01
					+ "pkg_lv" + (i) + "_qty"));
			break;
		}
	}
	return pkg_qty;
}


function btn_Save() {
	var sheetObj=sheet1;
	var formObj=document.form;
	if(validateForm(formObj, "save") == false)
	{
		return;
	}
	if(ComShowCodeConfirm("COM0063") == false){
		return;
	}
	formObj.f_cmd.value=MULTI;
	var sParam=FormQueryString(formObj);
    sParam += "&" + ComGetSaveString(sheetObj, true, true);
     var saveXml=sheetObj.GetSaveData("saveWHPutawayPopup.clt", sParam);
     sheetObj.LoadSaveData(saveXml);
	//1. Save 후 조회
     if(saveXml.indexOf('<ERROR>') == -1){
		 	showCompleteProcess();
	 		//ComShowCodeMessage("COM0093", "");
	 		searchInfo();
	}
	else{
		var xmlDoc = $.parseXML(saveXml);
	 	var $xml = $(xmlDoc);
		ComShowMessage($xml.find("MESSAGE").text());
		searchInfo();
	}
}
function btn_Cancel() {
	var formObj=document.form;
	var sheetObj = sheet1;
	if (sheetObj.RowCount() <= 0) {
		ComShowCodeMessage("COM0115"); // Please PO/Item enter at least one
										// row.
		return;
	}
	var sRow = sheetObj.FindCheckedRow(fix_grid01 + "chk");
	var mode = "";
	if (sRow == "") {
		mode = "ALL";
	} else {
		mode = "PARTIAL";
	}
	// Cancel 하려는 Item이 OUT Booking에 연결되어 있는 경우 Cancel 불가
	// var ob_cnt = ComGetObjValue(formObj.ob_cnt);
	// if (ob_cnt > 0) {
	// ComShowCodeMessage("COM0317"); // You cannot cancel because of W/H
	// OUTBOUND already processed.
	// return;
	// }
	if (ComShowCodeConfirm("COM0040") == false) {
		return;
	}
	formObj.f_cmd.value=MULTI01;
	var sParam = ComGetSaveString(sheetObj, true, true);
	var saveXml = sheetObj.GetSaveData("cancelWHPutawayPopup.clt", sParam
			+ "&cancel_mode=" + mode+"&f_cmd="+MULTI01);
	
	if( saveXml.indexOf('<ERROR>') == -1){
		 	showCompleteProcess();
	 		//ComShowCodeMessage("COM0093", "");
	 		searchInfo();
	}
	else{
		var xmlDoc = $.parseXML(saveXml);
	 	var $xml = $(xmlDoc);
		ComShowMessage($xml.find("MESSAGE").text())
	}
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case "save":
			var sheetObj = sheet1;
			if (sheetObj.RowCount() <= 0) {
				ComShowCodeMessage("COM0115"); // Please PO/Item enter at least
												// one row.
				return false;
			}
			if (ComGetLenByByte($("#supv_nm").val().trim()) > 100) {
				// ComShowCodeMessage("COM0215", "Supervisor[100]");
				ComShowCodeMessage("COM0605", 100);
				ComSetFocus(formObj.supv_nm);
				return false;
			}
			if (ComGetLenByByte($("#msg_to_wk").val().trim()) > 1000) {
				// ComShowCodeMessage("COM0215", "Working Instruction[1000]");
				ComShowCodeMessage("COM0607", 1000);
				ComSetFocus(formObj.msg_to_wk);
				return false;
			}
			for ( var i = sheetObj.HeaderRows(); i <= sheetObj.LastRow(); i++) {
				var putaway_wh_loc_nm = sheetObj.GetCellValue(i, fix_grid01 + "putaway_wh_loc_nm");
				var putaway_pkgunit = sheetObj.GetCellValue(i, fix_grid01 + "putaway_pkgunit");
				var putaway_pkgqty = sheetObj.GetCellValue(i, fix_grid01 + "putaway_pkgqty");
				if (!isEmpty2(putaway_wh_loc_nm) || !isEmpty2(putaway_pkgunit) || (putaway_pkgqty > 0)) {	
					// Putaway Loc, Unit, QTY 필수 입력 체크
					if (isEmpty2(putaway_wh_loc_nm)) {
						// ComShowCodeMessage("COM0162", i-1, "[Putaway] Loc");
						ComShowCodeMessage("COM0610", i - 1);
						sheetObj.SelectCell(i, fix_grid01 + "putaway_wh_loc_nm");
						return false;
					} else if (isEmpty2(putaway_pkgunit)) {
						// ComShowCodeMessage("COM0162", i-1, "[Putaway] Unit");
						ComShowCodeMessage("COM0611", i - 1);
						sheetObj.SelectCell(i, fix_grid01 + "putaway_pkgunit");
						return false;
					} else if (putaway_pkgqty == 0) {
						// ComShowCodeMessage("COM0162", i-1, "[Putaway] QTY");
						ComShowCodeMessage("COM0612", i - 1);
						sheetObj.SelectCell(i, fix_grid01 + "putaway_pkgqty");
						return false;
					}
				}
			}
			// 재고수량 (EA_QTY) 체크
			var ea_qty = 0;
			var putaway_ea_qty = 0;
			var rcv_cbm = 0;
			var rcv_cbf = 0;
			var rcv_grs_kgs = 0;
			var rcv_grs_lbs = 0;
			var rcv_net_kgs = 0;
			var rcv_net_lbs = 0;
			var putaway_cbm = 0;
			var putaway_cbf = 0;
			var putaway_grs_kgs = 0;
			var putaway_grs_lbs = 0;
			var putaway_net_kgs = 0;
			var putaway_net_lbs = 0;
			
			var re_cbm =0;
			var re_cbf =0;
			var re_grs_kgs =0;
			var re_grs_lbs =0;
			var re_net_kgs =0;
			var re_net_lbs =0;
			
			var idx = 0;
			var pIdx = 0;
			for ( var i = sheetObj.HeaderRows(); i <= sheetObj.LastRow(); i++) {
				// clear
				ea_qty = 0;
				putaway_ea_qty = 0;
				rcv_cbm = 0;
				rcv_cbf = 0;
				rcv_grs_kgs = 0;
				rcv_grs_lbs = 0;
				rcv_net_kgs = 0;
				rcv_net_lbs = 0;
				putaway_cbm = 0;
				putaway_cbf = 0;
				putaway_grs_kgs = 0;
				putaway_grs_lbs = 0;
				putaway_net_kgs = 0;
				putaway_net_lbs = 0;
				
				re_cbm =0;
				re_cbf =0;
				re_grs_kgs =0;
				re_grs_lbs =0;
				re_net_kgs =0;
				re_net_lbs =0;
				//
				idx = 1;
				pIdx = 0;
				for ( var j = pIdx; j <= sheetObj.LastRow(); j++) {
					// alert(sheetObj.CellValue(j, fix_grid01 + "lot_id"));
					if (sheetObj.GetCellValue(i, fix_grid01 + "wib_bk_no") == sheetObj.GetCellValue(j, fix_grid01 + "wib_bk_no")
							&& sheetObj.GetCellValue(i, fix_grid01+ "wib_in_no") == sheetObj.GetCellValue(j,fix_grid01 + "wib_in_no")
							&& sheetObj.GetCellValue(i, fix_grid01+ "po_sys_no") == sheetObj.GetCellValue(j,fix_grid01 + "po_sys_no")
							&& sheetObj.GetCellValue(i, fix_grid01+ "item_sys_no") == sheetObj.GetCellValue(j, fix_grid01 + "item_sys_no")
							&& sheetObj.GetCellValue(i, fix_grid01 + "item_seq") == sheetObj.GetCellValue(j, fix_grid01 + "item_seq")
							&& sheetObj.GetCellValue(i, fix_grid01+ "rcv_snd_dmg_cd") == sheetObj.GetCellValue(j, fix_grid01+ "rcv_snd_dmg_cd")) {
						if (idx == 1) {
							ea_qty = parseInt(sheetObj.GetCellValue(j,fix_grid01 + "ea_qty"));
							rcv_cbm = eval(sheetObj.GetCellValue(j, fix_grid01+ "rcv_cbm"));
							rcv_cbf = eval(sheetObj.GetCellValue(j, fix_grid01+ "rcv_cbf"));
							rcv_grs_kgs = eval(sheetObj.GetCellValue(j,fix_grid01 + "rcv_grs_kgs"));
							rcv_grs_lbs = eval(sheetObj.GetCellValue(j,fix_grid01 + "rcv_grs_lbs"));
							rcv_net_kgs = eval(sheetObj.GetCellValue(j,fix_grid01 + "rcv_net_kgs"));
							rcv_net_lbs = eval(sheetObj.GetCellValue(j,fix_grid01 + "rcv_net_lbs"));
						}
						putaway_ea_qty += parseInt(sheetObj.GetCellValue(j,	fix_grid01 + "putaway_ea_qty"));
						
						//sum cbm
						putaway_cbm += eval(sheetObj.GetCellValue(j, fix_grid01	+ "putaway_cbm"));
						//calculate cbm follow formular
						re_cbm += calculate_re_putaway(j,"putaway_cbm");
						
						//sum cbf 
						putaway_cbf += eval(sheetObj.GetCellValue(j, fix_grid01	+ "putaway_cbf"));
						//calculate cbf follow formular
						re_cbf += calculate_re_putaway(j,"putaway_cbf");
						
						//sum putaway_grs_kgs
						putaway_grs_kgs += eval(sheetObj.GetCellValue(j,fix_grid01 + "putaway_grs_kgs"));
						//calculate putaway_grs_kgs follow formular
						re_grs_kgs += calculate_re_putaway(j,"putaway_grs_kgs");
						
						//sum putaway_grs_lbs
						putaway_grs_lbs += eval(sheetObj.GetCellValue(j,fix_grid01 + "putaway_grs_lbs"));
						//calculate putaway_grs_lbs follow formular
						re_grs_lbs += calculate_re_putaway(j,"putaway_grs_lbs");
						
						//sum putaway_net_kgs
						putaway_net_kgs += eval(sheetObj.GetCellValue(j,fix_grid01 + "putaway_net_kgs"));
						//calculate putaway_net_kgs follow formular
						re_net_kgs += calculate_re_putaway(j,"putaway_net_kgs");
						
						//sum putaway_net_lbs
						putaway_net_lbs += eval(sheetObj.GetCellValue(j,fix_grid01 + "putaway_net_lbs"));
						re_net_lbs += calculate_re_putaway(j,"putaway_net_lbs");
						
						idx++;
						pIdx = j;
					}
				}
				// alert(ea_qty + "= " + putaway_ea_qty);
				//
				if (ea_qty < putaway_ea_qty) {//comment here
					ComShowCodeMessage("COM0421", ComGetMaskedValue(putaway_ea_qty, "int", ","), ComGetMaskedValue(ea_qty, "int", ","));
					sheetObj.SelectCell(j, fix_grid01 + "putaway_ea_qty");
					return false;
				}
				/*if (rcv_cbm < putaway_cbm) {*/
				if (re_cbm < putaway_cbm) {//comment here
					// ComShowCodeMessage("COM0422", "CBM",
					// ComGetMaskedValue(putaway_cbm, "float", ","),
					// ComGetMaskedValue(rcv_cbm, "float", ","));
					ComShowCodeMessage("COM0613", ComGetMaskedValue(putaway_cbm, "float", ","), ComGetMaskedValue(rcv_cbm, "float", ","));
					sheetObj.SelectCell(j, fix_grid01 + "putaway_cbm");
					return false;
				}
			/*	if (rcv_cbf < putaway_cbf) {*/
				if (re_cbf < putaway_cbf) {//comment here
					// ComShowCodeMessage("COM0422", "CBF",
					// ComGetMaskedValue(putaway_cbf, "float", ","),
					// ComGetMaskedValue(rcv_cbf, "float", ","));
					ComShowCodeMessage("COM0614", ComGetMaskedValue(putaway_cbf, "float", ","), ComGetMaskedValue(rcv_cbf, "float", ","));
					sheetObj.SelectCell(j, fix_grid01 + "putaway_cbf");
					return false;
				}
				/*if (rcv_grs_kgs < putaway_grs_kgs) {*/
				if (re_grs_kgs < putaway_grs_kgs) {//comment here
					// ComShowCodeMessage("COM0422", "G.KGS",
					// ComGetMaskedValue(putaway_grs_kgs, "float", ","),
					// ComGetMaskedValue(rcv_grs_kgs, "float", ","));
					ComShowCodeMessage("COM0615", ComGetMaskedValue(putaway_grs_kgs, "float", ","), ComGetMaskedValue(rcv_grs_kgs, "float", ","));
					sheetObj.SelectCell(j, fix_grid01 + "putaway_grs_kgs");
					return false;
				}
				/*if (rcv_grs_lbs < putaway_grs_lbs) {*/
				if (re_grs_lbs < putaway_grs_lbs) {//comment here
					// ComShowCodeMessage("COM0422", "G.LBS",
					// ComGetMaskedValue(putaway_grs_lbs, "float", ","),
					// ComGetMaskedValue(rcv_grs_lbs, "float", ","));
					ComShowCodeMessage("COM0616", ComGetMaskedValue(putaway_grs_lbs, "float", ","), ComGetMaskedValue(rcv_grs_lbs, "float", ","));
					sheetObj.SelectCell(j, fix_grid01 + "putaway_grs_lbs");
					return false;
				}
				/*if (rcv_net_kgs < putaway_net_kgs) {*/
				if (re_net_kgs < putaway_net_kgs) {
					// ComShowCodeMessage("COM0422", "N.KGS",
					// ComGetMaskedValue(putaway_net_kgs, "float", ","),
					// ComGetMaskedValue(rcv_net_kgs, "float", ","));
					ComShowCodeMessage("COM0617", ComGetMaskedValue(putaway_net_kgs, "float", ","), ComGetMaskedValue(rcv_net_kgs, "float", ","));
					sheetObj.SelectCell(j, fix_grid01 + "putaway_net_kgs");
					return false;
				}
				/*if (rcv_net_lbs < putaway_net_lbs) {*/
				if (re_net_lbs < putaway_net_lbs) {//comment here
					// ComShowCodeMessage("COM0422", "N.LGS",
					// ComGetMaskedValue(putaway_net_lbs, "float", ","),
					// ComGetMaskedValue(rcv_net_lbs, "float", ","));
					ComShowCodeMessage("COM0618", ComGetMaskedValue(putaway_net_lbs, "float", ","), ComGetMaskedValue(rcv_net_lbs, "float", ","));
					sheetObj.SelectCell(j, fix_grid01 + "putaway_net_lbs");
					return false;
				}
			}
			// Putaway Loc 중복 체크
			var putaway_wh_loc_nm = "";
			var idx = 0;
			var pIdx = 0;
			var dupCnt = 0;
			for ( var i = sheetObj.HeaderRows(); i <= sheetObj.LastRow(); i++) {
				// Inbound Loc 와 Loc은 동일하면 않됨
				if (sheetObj.GetCellValue(i, fix_grid01 + "inbound_loc_cd") == sheetObj.GetCellValue(i, fix_grid01 + "putaway_wh_loc_cd")) {
					ComShowCodeMessage("COM0320"); // Inbound Loc와 Putaway Loc가
													// 동일합니다.
					sheetObj.SelectCell(i, fix_grid01 + "putaway_wh_loc_nm");
					return false;
				}
				for ( var j = sheetObj.HeaderRows(); j <= sheetObj.LastRow(); j++) {
					if (i != j) {
						if (sheetObj.GetCellValue(i, fix_grid01 + "wib_in_no") == sheetObj
								.GetCellValue(j, fix_grid01 + "wib_in_no")
								&& sheetObj.GetCellValue(i, fix_grid01+ "wib_bk_no") == sheetObj.GetCellValue(j, fix_grid01+ "wib_bk_no")
								&& sheetObj.GetCellValue(i, fix_grid01+ "po_sys_no") == sheetObj.GetCellValue(j, fix_grid01+ "po_sys_no")
								&& sheetObj.GetCellValue(i, fix_grid01+ "item_sys_no") == sheetObj.GetCellValue(j, fix_grid01+ "item_sys_no")
								&& sheetObj.GetCellValue(i, fix_grid01+ "item_seq") == sheetObj.GetCellValue(j, fix_grid01 + "item_seq")
								&& sheetObj.GetCellValue(i, fix_grid01+ "lot_id") == sheetObj.GetCellValue(j,fix_grid01 + "lot_id")
								&& sheetObj.GetCellValue(i, fix_grid01+ "rcv_snd_dmg_cd") == sheetObj.GetCellValue(j, fix_grid01+ "rcv_snd_dmg_cd")
								&& sheetObj.GetCellValue(i, fix_grid01+ "putaway_wh_loc_cd") == sheetObj.GetCellValue(j, fix_grid01+ "putaway_wh_loc_cd")) {
							var rtnDesc = "[Putaway Loc="+ sheetObj.GetCellValue(j, fix_grid01+ "putaway_wh_loc_nm") + "]";
							ComShowCodeMessage("COM0004", rtnDesc);
							sheetObj.SelectCell(j, fix_grid01+ "putaway_wh_loc_nm");
							return false;
						}
					}
				}
				// #1880 [BINEX WMS4.0] PUTAWAY ERROR OF SHOWING MULTIPLE LINES OF SAME LP
				if (!ComIsNull(sheetObj.GetCellValue(i, fix_grid01+ "putaway_lcs_plt"))) {
					var putaway_loc_nm_check = sheetObj.GetCellValue(i, fix_grid01+ "putaway_wh_loc_nm") + sheetObj.GetCellValue(i, fix_grid01+ "putaway_lcs_plt");
					for ( var j = sheetObj.HeaderRows(); j <= sheetObj.LastRow(); j++) {
						if ( sheetObj.GetCellValue(i, fix_grid01+ "putaway_lcs_plt") == sheetObj.GetCellValue(j, fix_grid01+ "putaway_lcs_plt") 
								&& sheetObj.GetCellValue(i, fix_grid01+ "item_sys_no") == sheetObj.GetCellValue(j, fix_grid01+ "item_sys_no") ) {
							if (putaway_loc_nm_check != sheetObj.GetCellValue(j, fix_grid01+ "putaway_wh_loc_nm") + sheetObj.GetCellValue(j, fix_grid01+ "putaway_lcs_plt")) {
								alert(getLabel('WMS_MSG007'));
								sheetObj.SelectCell(j, fix_grid01+ "putaway_wh_loc_nm");
								return false;
							}
						}
					}
				}
			}
			//6459[Hanaro] WMS issue (Locatoin, Excel Upload, Inventory movement)  
			var arrRow = sheetObj.ColValueDupRows(fix_grid01+ "putaway_wh_loc_nm").split(',');
			var arrDupLoc = [];
			var locCdTemp = '';
			for (var i = 0; i < arrRow.length; i++) {
				locCdTemp = sheetObj.GetCellValue(arrRow[i], fix_grid01+ "putaway_wh_loc_nm")
				if (locCdTemp!= '' && arrDupLoc.indexOf(locCdTemp) == -1) {
					arrDupLoc.push(locCdTemp);
				}
			}
			var mess = arrDupLoc.join(' / ');
			if (mess != '') {
				var rtnDesc = 'Duplicate Location : ' + mess + '\nDo you want to proceed ?';
				if (confirm(rtnDesc)) {
					return true;
				}else return false
			}
			break;
		}
	}
	return true;
}
/*
 * 엑셀다운로드
 */
function btn_Excel() {
 	sheet1.Down2Excel( {DownCols: makeHiddenSkipCol(sheet1), SheetDesign:1,Merge:1 });
}
function btn_Print(){
	var formObj = document.form;
	formObj.title.value="Putaway Report";
	var fileName ='WH_IN_PUTAWAY_SHT.mrd' ;
	var param = "[" + formObj.print_wib_bk_no_in.value + "]"+"[" + formObj.userId.value + "]"+"[" + formObj.prn_lot_tp.value + "]"; 
	formObj.file_name.value= fileName;
	formObj.rd_param.value=param;
	popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
}
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendar();
            cal.displayType="date";
            cal.select(formObj.putaway_dt, 'MM-dd-yyyy');
        break;
    }
}

/* #2927 [LOA WMS4.0] ITEM CBM CALCULATION
   주석처리 - CoCommon.js 공통함수 사용
function funcKGS_CBM_CAC(command, obj, obj2) {
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var currow=0;	
	currow=sheetObj.GetSelectRow();
	if (command == "LB_KG") { // GWT / NWT
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) / CNVT_CNST_KG_LB), 3);
//		lb_amt=lb_amt * 1000;
//		lb_amt=Math.round(lb_amt);
//		lb_amt=lb_amt / 1000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	} else if (command == "KG_LB") { // CBM
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) * CNVT_CNST_KG_LB), 3);
//		lb_amt=lb_amt * 1000;
//		lb_amt=Math.round(lb_amt);
//		lb_amt=lb_amt / 1000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	} else if (command == "CBF_CBM") { // CBM

//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
//var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) * 0.028317), 3);
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) / WMS_CNVT_CNST_CBM_CFT), WMS_CBM_POINT_COUNT);
//		lb_amt=lb_amt * 1000;
//		lb_amt=Math.round(lb_amt);
//		lb_amt=lb_amt / 1000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	}	else if (command == "CBM_CBF") { // CBM

//#2927 [LOA WMS4.0] ITEM CBM CALCULATION
//var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) / 0.028317), 3);
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) * WMS_CNVT_CNST_CBM_CFT), WMS_CBM_POINT_COUNT);
		lb_amt=lb_amt * 100000; 
		lb_amt=Math.round(lb_amt);
		lb_amt=lb_amt / 100000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	}
}
*/


function mergeCell(Row){
	totalRowMerge = 0;
	startRow = 0;
	for(var i = Row ; i <= sheet1.RowCount() + 1 ; i++){
		if(i == Row){
			getDataOri(i);
			i++;
		}
		checkDataMerge(i);
	}
}
function mergeCell2(Row){
	totalRowMerge = 0;
	startRow = 0;
	for(var i = Row ; i <= sheet1.RowCount() + 1 ; i++){
		if(i == Row){
			getDataOri(i);
			i++;
		}
		checkDataMerge2(i);
	}
}
function checkDataMerge(i){
	getData(i);
	if(item_cd == item_cd_ori && item_nm == item_nm_ori
			&& lot_cd == lot_cd_ori && inbound_dt == inbound_dt_ori
			&& item_lot_no == item_lot_no_ori && inbound_loc_cd == inbound_loc_cd_ori
			&& non_putaway_qty == non_putaway_qty_ori && unit_nm == unit_nm_ori
			&& type_nm == type_nm_ori && qty == qty_ori
			&& qty_ea == qty_ea_ori && item_seq == item_seq_ori && cust_ord_no == cust_ord_no_ori){
		if(startRow == 0){
			startRow = i;
			totalRowMerge = 1;
		}
		totalRowMerge++;
	}
	else{
		if(totalRowMerge == 1){
			totalRowMerge++;
		}
		startRow = startRow - 1;
		setMergeCell(startRow, totalRowMerge);
		
		getDataOri(i);
		
		startRow = 0;
		totalRowMerge = 0;
	}
	
	if(i == sheet1.RowCount() + 1){
		if(startRow != 0){
			if(totalRowMerge == 1){
				totalRowMerge++;
			}
			startRow = startRow - 1;
			setMergeCell(startRow, totalRowMerge);
			startRow = 0;
			totalRowMerge = 0;
		}
	}
}

function checkDataMerge2(i){
	getData(i);
	if(item_cd == item_cd_ori && item_nm == item_nm_ori
			&& cust_ord_no == cust_ord_no_ori){
		if(startRow == 0){
			startRow = i;
			totalRowMerge = 1;
		}
		totalRowMerge++;
	}
	else{
		if(totalRowMerge == 1){
			totalRowMerge++;
		}
		startRow = startRow - 1;
		setMergeCell2(startRow, totalRowMerge);
		
		getDataOri(i);
		
		startRow = 0;
		totalRowMerge = 0;
	}
	
	if(i == sheet1.RowCount() + 1){
		if(startRow != 0){
			if(totalRowMerge == 1){
				totalRowMerge++;
			}
			startRow = startRow - 1;
			setMergeCell2(startRow, totalRowMerge);
			startRow = 0;
			totalRowMerge = 0;
		}
	}
}
function getDataOri(i){
	var sheetObj = sheet1;
	item_cd_ori = sheetObj.GetCellValue(i, fix_grid01+"item_cd");
	item_nm_ori = sheetObj.GetCellValue(i, fix_grid01+"item_nm");
	lot_cd_ori = sheetObj.GetCellValue(i, fix_grid01+"lot_id");
	inbound_dt_ori = sheetObj.GetCellValue(i, fix_grid01+"inbound_dt");
	item_lot_no_ori = sheetObj.GetCellValue(i, fix_grid01+"lot_no");
	inbound_loc_cd_ori = sheetObj.GetCellValue(i, fix_grid01+"inbound_loc_cd");
	type_nm_ori = sheetObj.GetCellValue(i, fix_grid01+"rcv_snd_dmg_nm");
	unit_nm_ori = sheetObj.GetCellValue(i, fix_grid01+"pkgunit");
	qty_ori = sheetObj.GetCellValue(i, fix_grid01+"pkgqty");
	qty_ea_ori = sheetObj.GetCellValue(i, fix_grid01+"ea_qty");
	non_putaway_qty_ori = sheetObj.GetCellValue(i, fix_grid01+"non_putaway_ea_qty");
	item_seq_ori = sheetObj.GetCellValue(i, fix_grid01+"item_seq");
	cust_ord_no_ori = sheetObj.GetCellValue(i, fix_grid01+"cust_ord_no");
}
function getData(i){
	var sheetObj = sheet1;
	item_cd = sheetObj.GetCellValue(i, fix_grid01+"item_cd");
	item_nm = sheetObj.GetCellValue(i, fix_grid01+"item_nm");
	lot_cd = sheetObj.GetCellValue(i, fix_grid01+"lot_id");
	inbound_dt = sheetObj.GetCellValue(i, fix_grid01+"inbound_dt");
	item_lot_no = sheetObj.GetCellValue(i, fix_grid01+"lot_no");
	inbound_loc_cd = sheetObj.GetCellValue(i, fix_grid01+"inbound_loc_cd");
	type_nm = sheetObj.GetCellValue(i, fix_grid01+"rcv_snd_dmg_nm");
	unit_nm = sheetObj.GetCellValue(i, fix_grid01+"pkgunit");
	qty = sheetObj.GetCellValue(i, fix_grid01+"pkgqty");
	qty_ea = sheetObj.GetCellValue(i, fix_grid01+"ea_qty");
	non_putaway_qty = sheetObj.GetCellValue(i, fix_grid01+"non_putaway_ea_qty");
	item_seq = sheetObj.GetCellValue(i, fix_grid01+"item_seq");
	cust_ord_no = sheetObj.GetCellValue(i, fix_grid01+"cust_ord_no");
}
function setMergeCell(startRow, totalRowMerge){
	sheet1.SetMergeCell(startRow, 5, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 6, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 7, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 8, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 9, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 10, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 11, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 12, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 13, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 14, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 15, totalRowMerge, 1);
	
}

function setMergeCell2(startRow, totalRowMerge){
	sheet1.SetMergeCell(startRow, 5, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 6, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 7, totalRowMerge, 1);
	sheet1.SetMergeCell(startRow, 8, totalRowMerge, 1);
}

function sheet1_OnSort(Col, SortArrow) {
	mergeCell(2);
}
function searchList(){
	document.form.f_CurPage.value=1;
	searchInfo();
}
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.form.f_CurPage.value=callPage;
	searchInfo();
}
function timeCheck(obj, objStart, objEnd){
	var formObj = document.form;
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
	}else if(size==5){
		var val = obj.value.split(':');
		if(hourCheck(val[0])){
			if(minuteCheck(val[1])){
				obj.value=val[0] + ":" + val[1];
			}else{
				obj.value='';
			}
		}else{
			obj.value='';
		}
	}
	if(checkTimeStartEnd(objStart, objEnd) == false){
		ComShowCodeMessage('COM0049');
		objEnd.value='';
		objEnd.focus();
	}
}

function hourCheck(obj){
	if(isNaN(obj)){
		ComShowCodeMessage("COM0047");
		return false;
	}
	if(obj>23 || obj<0){
		//HOUR: 0-23
		ComShowCodeMessage("COM0047");
		return false;
	}else{
		return true;
	}
}

function minuteCheck(obj){
	if(isNaN(obj)){
		ComShowCodeMessage("COM0048");
		return false;
	}
	if(obj>59 || obj<0){
		//alert('0-59');
		ComShowCodeMessage("COM0048");
		return false;
	}else{
		return true;
	}
}

function checkTimeStartEnd(objStart, objEnd){
	var startTime = objStart.value;
	var endTime = objEnd.value;
	if(startTime != '' && endTime != ''){
		if(parseInt(startTime.replace(':', '')) > parseInt(endTime.replace(':', ''))){
			return false;
		}
	}
	return true;
}
//6459[Hanaro] WMS issue (Locatoin, Excel Upload, Inventory movement)  
function chkUsedLoc(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
	    if(doc[1] == "Y"){
	    	alert(getLabel('WMS_MSG009'));
		}
	}
}

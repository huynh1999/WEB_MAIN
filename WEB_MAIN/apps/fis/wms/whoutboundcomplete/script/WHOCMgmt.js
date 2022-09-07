var docObjects=new Array();
var sheetCnt=0;

var firCalFlag=false;
var loadpageflag= 0;
var rtnary = new Array(1);
var callBackFunc = "";
var tabID = '01';

var WMS_QTY_FORMAT  = "Integer";  //QTY  InitDataProperty에서 사용
var WMS_QTY_FORMAT2 = "Integer";//QTY  InitDataProperty2에서 사용
var WMS_QTY_POINT = 0;            //QTY
var WMS_CBM_POINT = 3;            //CBM, GWT, NWT
var WMS_KGS_POINT = 3;            //KGS, GWT, NWT
var MST_CBM_POINT = 5;            //CBM, CBF
var MST_KGS_POINT = 3;            //KGS, GWT, NWT

var fix_grid01="Grd01"; //by booking header
var fix_grid02="Grd02"; //by booking detail
var fix_grid03="Grd03"; //by load plan header
var fix_grid04="Grd04"; //by load plan detail
var fix_by_booking="bk"; //by booking tab의 구분자
var fix_by_loadplan="lp"; //by loadplan tabl의 구분자
var loading_flag="N";

function setDocumentObject(sheet_obj){
	 docObjects[sheetCnt++]=sheet_obj;
	}
/*
 * load page
 */
function loadPage() {
	doShowProcess();
	//sheet
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]); 
	}
	doHideProcess();
    loading_flag="Y";

	initControl();

	ComBtnDisable("btn_complete_bk"); 
	ComBtnDisable("btn_equpdate_bk"); 
	ComBtnDisable("btn_complete_lp"); 
	ComBtnDisable("btn_equpdate_lp"); 
	$('#bk_wh_cd option[value=' + $("#def_wh_cd").val() + ']').attr('selected','selected');
	$('#lp_wh_cd option[value=' + $("#def_wh_cd").val() + ']').attr('selected','selected');
	if($("#req_search_no").val() == ""){ //번호가 없을경우
		//
		loadpageflag= 1;
		//by booking
		setDefault(fix_by_booking);
		//by load plan
		setDefault(fix_by_loadplan);
	}else{
		switch ($("#req_search_div").val())
		{
			case (fix_by_booking): //by booking
				goTabSelect("01");
				//반대편탭만 셋팅
				setDefault(fix_by_loadplan);
				$("#wob_bk_no").val($("#req_search_no").val());
				$("#bk_search_tp")[0].index=0;
				//btn_show(fix_by_booking, 'H');
				btn_Search(fix_by_booking);
				downSheet(fix_by_booking, sheet1, fix_grid01);
			break;
			case (fix_by_loadplan): //by loadplan
				goTabSelect("02"); //P_NO|CONSOL_NO
				//반대편탭만 셋팅
				setDefault(fix_by_booking);
				$("#lp_search_no").val($("#req_search_no").val());
				form.lp_search_tp.value = $("#req_search_tp").val();
				//btn_show(fix_by_loadplan, 'H');
				btn_Search(fix_by_loadplan);
				downSheet(fix_by_loadplan, sheet3, fix_grid03);
				break;
			case "wave":
				//goTabSelect("01");
				//by bk
				formObj.wob_bk_no.value = formObj.req_search_no.value;
				formObj.bk_search_tp.value = formObj.req_search_tp.value;
				//btn_show(fix_by_booking, 'H');
				btn_Search(fix_by_booking);
		}
	}
	resizeSheet();
}
/*
 * 자동조회로 by pass된경우 해당건 detail까지 바로 조회.(강제체크 후 down버튼 클릭효과)
 */
function downSheet(div, sheetObj, fix_grid)
{
	if(sheetObj.RowCount()>0)
	{
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
			sheetObj.SetCellValue(i, fix_grid + "chk",1,0);//강제체크
		}
		btn_Down(div);//down버튼
	}
}
/*
 * show, hide 버튼 클릭
 */
function btn_show(div, val){
	var sheetObj; 
	if(div == fix_by_booking)
	{
//		sheetObj = $("#sheet2")[0];
		//sheetObj = sheet1;
		sheetObj = docObjects[1];
	}
	else
	{
//		sheetObj = sheet4;
		//sheetObj = sheet3;
		sheetObj = docObjects[3];
	}	
	if(val == "O"){ //show효과(master sheet보이게끔)
		if(div == fix_by_booking )
			{
				if(headLayer_bk.style.display == "none" || headLayer_bk.style.display == ""){
					
					headLayer_bk.style.display="";
					
					document.all.btn_show_nm_bk.style.display="none";
					document.all.btn_hide_nm_bk.style.display="block";
					
					document.all.btn_down_bk.style.display="inline";
					document.all.btn_up_bk.style.display="inline";
					sheet2.SetSheetHeight(235);
				}
			}
		else
			{
				if(headLayer_lp.style.display == "none" || headLayer_bk.style.display == ""){
					headLayer_lp.style.display="";
					
					document.all.btn_show_nm_lp.style.display="none";
					document.all.btn_hide_nm_lp.style.display="block";
					
					document.all.btn_down_lp.style.display="inline";
					document.all.btn_up_lp.style.display="inline";
					sheet4.SetSheetHeight(235);
				}
			}

	}else{ //hide효과(master sheet 안보이게끔)
		
		if(div == fix_by_booking)
			{
					document.all.btn_hide_nm_bk.style.display="none";
					document.all.btn_show_nm_bk.style.display="block";
					headLayer_bk.style.display="none";

					document.all.btn_down_bk.style.display="none";
					document.all.btn_up_bk.style.display="none";
					sheet2.SetSheetHeight(550);
			}
		else{

					document.all.btn_hide_nm_lp.style.display="none";
					document.all.btn_show_nm_lp.style.display="block";
					headLayer_lp.style.display="none";
					
					document.all.btn_down_lp.style.display="none";
					document.all.btn_up_lp.style.display="none";
					sheet4.SetSheetHeight(550);
		}
	}
	//resizeSheet();
}
function setDefault(div)
{
	switch (div)
	{
		case (fix_by_booking): //by booking
			//by booking
			$("#bk_fm_bk_date").val(ComGetDateAdd(null, "d", -31, "-"));
			$("#bk_to_bk_date").val(ComGetNowInfo());
			$("#bk_fm_est_out_dt").val(ComGetDateAdd(null, "d", -31, "-"));
			$("#bk_to_est_out_dt").val(ComGetNowInfo());
			
			$('#bk_wh_cd option[value=' + $("#def_wh_cd").val() + ']').attr('selected','selected');
//			$("#bk_wh_cd").val($("#def_wh_cd").val());
//			$("#bk_wh_nm").val($("#def_wh_nm").val());
			
			$("#bk_ctrt_no").val($("#def_wh_ctrt_no").val());
			$("#bk_ctrt_nm").val($("#def_wh_ctrt_nm").val());
			btn_show(div, 'O');
			break;
		case (fix_by_loadplan): //by loadplan
			//by load plan
			$("#lp_fm_bk_date").val(ComGetDateAdd(null, "d", -31, "-"));
			$("#lp_to_bk_date").val(ComGetNowInfo());
			$("#lp_fm_plan_dt").val(ComGetDateAdd(null, "d", -31, "-"));
			$("#lp_to_plan_dt").val(ComGetNowInfo());	
			
			$('#lp_wh_cd option[value=' + $("#def_wh_cd").val() + ']').attr('selected','selected');
//			$("#lp_wh_cd").val($("#def_wh_cd").val());
//			$("#lp_wh_nm").val($("#def_wh_nm").val());
			
			$("#lp_ctrt_no").val($("#def_wh_ctrt_no").val());
			$("#lp_ctrt_nm").val($("#def_wh_ctrt_nm").val());
			btn_show(div, 'O');
			break;
	}
}
/*
 * tab
 */
function goTabSelect(isNumSep) {
	
	var tabObjs = document.getElementsByName('tabLayer');
	
	if( isNumSep == "01" ) {
        tabObjs[0].style.display = 'inline';
        tabObjs[1].style.display = 'none';
        tabID = '01';
    }else if( isNumSep == "02" ) {
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "inline";
        tabID = '02';
    }
    
    var index = parseInt(isNumSep);
	var count = 0;
	$('.opus_design_tab').find("li").each(function(){
		if(count++ == index - 1){
			$(this).addClass('nowTab');
		}else{
			$(this).removeClass('nowTab');
		}
	});
    resizeSheet();
}
/*
 * init control
 */
function initControl() {
	
	var txt="Booking No|WAVE_NO";
	var val="WOB_BK_NO|WAVE_NO";
	
	var formObj=document.form;
	
	var selecthtml = '';
	
	var vTextSplit = txt.split("|");
	var vCodeSplit = val.split("|");				

	for(var j=0;j<vCodeSplit.length; j++){
		if(vCodeSplit[j] != ""){
			selecthtml += '<option value="'+ vCodeSplit[j] +'">'+ vTextSplit[j] +'</option>';
		}
	}
	
	$('#bk_search_tp').html(selecthtml);
	
	txt="Load Plan No|Console No|Booking No|WAVE_NO";
	val="LP_NO|CONSOL_NO|WOB_BK_NO|WAVE_NO";
	
	vTextSplit = txt.split("|");
	vCodeSplit = val.split("|");
	
	selecthtml = '';
	
	for(var j=0;j<vCodeSplit.length; j++){
		if(vCodeSplit[j] != ""){
			selecthtml += '<option value="'+ vCodeSplit[j] +'">'+ vTextSplit[j] +'</option>';
		}
	}
	
	$('#lp_search_tp').html(selecthtml);
	
	vTextSplit = f_put_tp_cdText.split("|");
	vCodeSplit = f_put_tp_cdCode.split("|");
	
	selecthtml = '<option value="ALL">ALL</option>';
	
	for(var j=0;j<vCodeSplit.length; j++){
		if(vCodeSplit[j] != ""){
			selecthtml += '<option value="'+ vCodeSplit[j] +'">'+ vTextSplit[j] +'</option>';
		}
	}
	
	$('#bk_ord_tp_cd').html(selecthtml);
	$('#lp_ord_tp_cd').html(selecthtml);
}
/*
 * init sheet
 */
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
	case 1:      //IBSheet1 init
	    with(sheetObj){
       
//      var hdr1="|SEQ|Booking No|Order Type|Booking Date|Estimated Date|TTL EA QTY|Consignee|Consignee|Contract|Contract|W/H Code|walc_no";
      var prefix=fix_grid01;

      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
      var headers = [ { Text:getLabel('WHOCMgmt_HDR1'), Align:"Center"} ];
      InitHeaders(headers, info);

      var cols = [ 
			 {Type:"CheckBox",  Hidden:0, 	Width:30,		Align:"Center",	ColMerge:1,		SaveName:prefix+"chk",			KeyField:0,		CalcLogic:"",	Format:"",							 },
             {Type:"Seq",       Hidden:0, 	Width:30,		Align:"Center",	ColMerge:1,		SaveName:prefix+"seq",			KeyField:0,		CalcLogic:"",	Format:"",							 },
             {Type:"Text",     	Hidden:0,  	Width:120,		Align:"Center",	ColMerge:1,		SaveName:prefix+"wob_bk_no",	KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"",	 },
             {Type:"Text",     	Hidden:0,  	Width:100,		Align:"Center",	ColMerge:1,		SaveName:prefix+"ord_tp_nm",	KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"",	 },
             {Type:"Date",     	Hidden:0,  	Width:100,		Align:"Center",	ColMerge:1,		SaveName:prefix+"bk_date",		KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"Ymd", },
             {Type:"Date",     	Hidden:0,  	Width:100,		Align:"Center",	ColMerge:1,		SaveName:prefix+"est_out_dt",	KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"Ymd", },
             {Type:"Int",     	Hidden:0,  	Width:80,		Align:"Center",	ColMerge:1,		SaveName:prefix+"ttl_ea_qty",	KeyField:"Integer",		CalcLogic:"",	UpdateEdit:0,		Format:"",	 },
             {Type:"Text",     	Hidden:0,  	Width:70,		Align:"Center",	ColMerge:1,		SaveName:prefix+"buyer_cd",		KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"",	 },
             {Type:"Text",     	Hidden:0,  	Width:260,		Align:"Center",	ColMerge:1,		SaveName:prefix+"buyer_nm",		KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"",	 },
             {Type:"Text",     	Hidden:0,  	Width:80,		Align:"Center",	ColMerge:1,		SaveName:prefix+"ctrt_no",		KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"",	 },
             {Type:"Text",     	Hidden:0,  	Width:130,		Align:"Left",	ColMerge:1,		SaveName:prefix+"ctrt_nm",		KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"",	 },
             {Type:"Combo",     Hidden:0,  	Width:60,		Align:"Center",	ColMerge:1,		SaveName:prefix+"wh_cd",		KeyField:0,		CalcLogic:"",	UpdateEdit:0,		Format:"",	 },
             {Type:"Text",     	Hidden:1, 	Width:10,		Align:"Left",	ColMerge:0,		SaveName:prefix+"walc_no",		KeyField:0,		CalcLogic:"",                       Format:"",    } ];
       
      InitColumns(cols);
      SetSheetHeight(150);
      SetEditable(1);
      SetColProperty(prefix+'wh_cd', {ComboText:WHNMLIST, ComboCode:WHCDLIST} );
      SetHeaderRowHeight(30);
      }
      break;


	case 2: //IBSheet2 init
	    with(sheetObj){
        
//	      var hdr1="SEQ|Booking No|sao_sys_no|item_sys_no|item_seq|Item|Item Name|Order Qty|Order Qty|Order Qty|rn|Allocated Qty(EA)|Allocated Qty(EA)|Allocated Qty(EA)||CBM|CBM|GWT|GWT|NWT|NWT|Inbound Date|Item Lot No|Location|Type|CNTR/TR NO|Seal No|Gate-In|Gate-Out|Additional Lot Property|Additional Lot Property|Additional Lot Property|Lot ID|Wave Key|So No|Inbound Information|Inbound Information"
//	      + "|status|wh_loc_cd|po_sys_no|eq_tp_cd|wh_cd|sao_no|cust_item_cd|walc_no|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs";
//	      var hdr2="SEQ|Booking No|sao_sys_no|item_sys_no|item_seq|Item|Item Name|Unit|Unit Qty|EA Qty|rn|Allocated|Shipped|Gap||CBM|CBF|KGS|LBS|KGS|LBS|Inbound Date|Item Lot No|Location|Type|CNTR/TR NO|Seal No|Gate-In|Gate-Out|Expiration Date|Lot 04|Lot 05|Lot ID|Wave Key|So No|Booking No|Po No"
//	      + "|status|wh_loc_cd|po_sys_no|eq_tp_cd|wh_cd|sao_no|cust_item_cd|walc_no|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs";
	      var prefix=fix_grid02;

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('WHOCMgmt_HDR2'), Align:"Center"},
	                  { Text:getLabel('WHOCMgmt_HDR3'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"Text",  Hidden:1, 	Width:30,		Align:"Center",		ColMerge:1,		SaveName:prefix+"seq", 					KeyField:0, 	UpdateEdit:0, 	Format:"" },
	             {Type:"Text",     	  Hidden:0, 	Width:120,		Align:"Center",		ColMerge:1,		SaveName:prefix+"wob_bk_no", 			KeyField:0, 	UpdateEdit:0, 	Format:"" },
	             {Type:"Text",        Hidden:1, 	Width:150,		Align:"Left",		ColMerge:1,		SaveName:prefix+"sao_sys_no",       	      					  		Format:"" },
	             {Type:"Text",        Hidden:1, 	Width:150,		Align:"Left",		ColMerge:1,		SaveName:prefix+"item_sys_no", 									  		Format:"" },
	             {Type:"Text",        Hidden:1, 	Width:150,		Align:"Left",		ColMerge:1,		SaveName:prefix+"item_seq",										  		Format:"" },
	             {Type:"Text",     	  Hidden:0, 	Width:100,		Align:"Left",		ColMerge:1,		SaveName:prefix+"item_cd", 				KeyField:0,		UpdateEdit:0,  	Format:"" },
	             {Type:"Text",     	  Hidden:0, 	Width:150,		Align:"Left",		ColMerge:1,		SaveName:prefix+"item_nm", 				KeyField:0,		UpdateEdit:0,  	Format:"" },
	             {Type:"Text",     	  Hidden:0, 	Width:50,		Align:"Center",		ColMerge:1,		SaveName:prefix+"item_pkgunit", 		KeyField:0,		UpdateEdit:0,  	Format:"" },
	             {Type:"Int",     	  Hidden:0, 	Width:70,		Align:"Right",		ColMerge:1,		SaveName:prefix+"item_pkgqty", 			KeyField:0,		UpdateEdit:0,  	Format:"Integer", PointCount:WMS_QTY_POINT },
	             {Type:"Int",     	  Hidden:0, 	Width:70,		Align:"Right",		ColMerge:1,		SaveName:prefix+"item_ea_qty", 			KeyField:0,		UpdateEdit:0,  	Format:"Integer", PointCount:WMS_QTY_POINT },
	             {Type:"Text",     	  Hidden:1, 	Width:10,		Align:"Left",		ColMerge:1,		SaveName:prefix+"rn",													Format:"" },
	             {Type:"Int",     	  Hidden:0, 	Width:70,		Align:"Right",		ColMerge:1,		SaveName:prefix+"pick_item_ea_qty", 	KeyField:0,		UpdateEdit:0,	Format:"Integer", PointCount:WMS_QTY_POINT },
	             {Type:"Int",     	  Hidden:0, 	Width:70,		Align:"Right",		ColMerge:1,		SaveName:prefix+"issu_item_ea_qty", 	KeyField:0,						Format:"Integer", PointCount:WMS_QTY_POINT },
	             {Type:"Int",     	  Hidden:0, 	Width:50,		Align:"Right",		ColMerge:1,		SaveName:prefix+"gap", 					KeyField:0,		UpdateEdit:0,	Format:"Integer", PointCount:WMS_QTY_POINT },
	             {Type:"CheckBox", 	  Hidden:0, 	Width:30,		Align:"Center",		ColMerge:1,		SaveName:prefix+"chk", 					KeyField:0,						Format:"" },
	             {Type:"Float",     	  Hidden:0, 	Width:80,		Align:"Right",		ColMerge:0,		SaveName:prefix+"pick_item_cbm", 		KeyField:0,						Format:"",		      PointCount:WMS_CBM_POINT },
	             {Type:"Float",     	  Hidden:0, 	Width:80,		Align:"Right",		ColMerge:1,		SaveName:prefix+"pick_item_cbf", 		KeyField:0,						Format:"", 		  PointCount:WMS_CBM_POINT },
	             {Type:"Float",     	  Hidden:0, 	Width:80,		Align:"Right",		ColMerge:1,		SaveName:prefix+"pick_item_grs_kgs",	KeyField:0,						Format:"", 		  PointCount:WMS_KGS_POINT },
	             {Type:"Float",     	  Hidden:0, 	Width:80,		Align:"Right",		ColMerge:1,		SaveName:prefix+"pick_item_grs_lbs",	KeyField:0,						Format:"", 		  PointCount:WMS_KGS_POINT },
	             {Type:"Float",     	  Hidden:0, 	Width:80,		Align:"Right",		ColMerge:1,		SaveName:prefix+"pick_item_net_kgs",	KeyField:0,						Format:"", 		  PointCount:WMS_KGS_POINT },
	             {Type:"Float",     	  Hidden:0, 	Width:80,		Align:"Right",		ColMerge:1,		SaveName:prefix+"pick_item_net_lbs",	KeyField:0,						Format:"", 		  PointCount:WMS_KGS_POINT },
	             {Type:"Date",     	  Hidden:0, 	Width:120,		Align:"Center",		ColMerge:1,		SaveName:prefix+"inbound_dt", 			KeyField:0,		UpdateEdit:0,	Format:"Ymd" },
	             {Type:"Text",     	  Hidden:0, 	Width:120,		Align:"Center",		ColMerge:1,		SaveName:prefix+"lot_no", 				KeyField:0,		UpdateEdit:0,	Format:"" },
	             {Type:"Text",     	  Hidden:0, 	Width:80,		Align:"Left",		ColMerge:1,		SaveName:prefix+"wh_loc_cd_nm", 		KeyField:0,		UpdateEdit:0,	Format:"" },
	             {Type:"PopupEdit",	  Hidden:0, 	Width:70,		Align:"Center",		ColMerge:1,		SaveName:prefix+"eq_tpsz_cd", 			KeyField:0,						Format:"" },
	             {Type:"Text",     	  Hidden:0, 	Width:100,		Align:"Left",		ColMerge:1,		SaveName:prefix+"eq_no", 				KeyField:0,		EditLen:20,		Format:"" },
	             {Type:"PopupEdit",	  Hidden:0, 	Width:120,		Align:"Left",		ColMerge:1,		SaveName:prefix+"seal_no", 				KeyField:0,		EditLen:100,	Format:"" },
	             {Type:"Date",     	  Hidden:0, 	Width:80,		Align:"Center",		ColMerge:1,		SaveName:prefix+"gate_in_hm", 			KeyField:0,						Format:"Hm" },
	             {Type:"Date",     	  Hidden:0, 	Width:80,		Align:"Center",		ColMerge:1,		SaveName:prefix+"gate_out_hm", 			KeyField:0,						Format:"Hm" },
	             {Type:"Date",     	  Hidden:0, 	Width:120,		Align:"Left",		ColMerge:1,		SaveName:prefix+"exp_dt", 				KeyField:0,		UpdateEdit:0,	Format:"Ymd" },
	             {Type:"Text",     	  Hidden:0, 	Width:80,		Align:"Left",		ColMerge:1,		SaveName:prefix+"lot_04", 				KeyField:0,		UpdateEdit:0,	Format:"" },
	             {Type:"Text",     	  Hidden:0, 	Width:80,		Align:"Left",		ColMerge:1,		SaveName:prefix+"lot_05", 				KeyField:0,		UpdateEdit:0,	Format:"" },
	             {Type:"Text",     	  Hidden:0, 	Width:120,		Align:"Center",		ColMerge:1,		SaveName:prefix+"lot_id", 				KeyField:0,		UpdateEdit:0,	Format:"" },
	             {Type:"Text",     	  Hidden:0, 	Width:120,		Align:"Center",		ColMerge:1,		SaveName:prefix+"wave_no",				KeyField:0,		UpdateEdit:0,	Format:"" },
	             {Type:"Text",     	  Hidden:0, 	Width:120,		Align:"Center",		ColMerge:1,		SaveName:prefix+"so_no", 				KeyField:0,		UpdateEdit:0,	Format:"" },
	             {Type:"Text",     	  Hidden:0, 	Width:120,		Align:"Center",		ColMerge:1,		SaveName:prefix+"wib_bk_no", 			KeyField:0,		UpdateEdit:0,	Format:"" },
	             {Type:"Text",     	  Hidden:0, 	Width:120,		Align:"Center",		ColMerge:1,		SaveName:prefix+"po_no", 				KeyField:0,		UpdateEdit:0,	Format:"" },
	             {Type:"Status",   	  Hidden:1,		Width:30,		Align:"Center",		ColMerge:0,		SaveName:prefix+"ibflag",						 },
	             {Type:"Text",     	  Hidden:1,		Width:80,		Align:"Center",		ColMerge:1,		SaveName:prefix+"wh_loc_cd",											Format:"" },
	             {Type:"Text",     	  Hidden:1,		Width:80,		Align:"Center",		ColMerge:1,		SaveName:prefix+"po_sys_no",											Format:"" },
	             {Type:"Text",     	  Hidden:1,		Width:80,		Align:"Center",		ColMerge:1,		SaveName:prefix+"eq_tp_cd",												Format:"" },
	             {Type:"Text",     	  Hidden:1,		Width:80,		Align:"Center",		ColMerge:1,		SaveName:prefix+"wh_cd",												Format:"" },
	             {Type:"Text",     	  Hidden:1,		Width:80,		Align:"Center",		ColMerge:1,		SaveName:prefix+"sao_no", 												Format:"" },
	             {Type:"Text",     	  Hidden:1,		Width:80,		Align:"Center",		ColMerge:1,		SaveName:prefix+"cust_item_cd", 										Format:"" },
	             {Type:"Text",     	  Hidden:1,		Width:80,		Align:"Center",		ColMerge:1,		SaveName:prefix+"walc_no", 												Format:"" },
	             {Type:"Int",     	  Hidden:1,		Width:0,		Align:"Center",		ColMerge:1,		SaveName:prefix+"pkg_lv1_qty",											Format:"Integer", PointCount:WMS_QTY_POINT},
	             {Type:"Float",     	  Hidden:1,		Width:0,		Align:"Center",		ColMerge:1,		SaveName:prefix+"lv1_cbm", 												Format:"",			  PointCount:MST_CBM_POINT},
	             {Type:"Float",     	  Hidden:1,		Width:0,		Align:"Center",		ColMerge:1,		SaveName:prefix+"lv1_cbf", 												Format:"",			  PointCount:MST_CBM_POINT},
	             {Type:"Float",     	  Hidden:1,		Width:0,		Align:"Center",		ColMerge:1,		SaveName:prefix+"lv1_grs_kgs", 											Format:"",			  PointCount:MST_CBM_POINT},
	             {Type:"Float",     	  Hidden:1,		Width:0,		Align:"Center",		ColMerge:1,		SaveName:prefix+"lv1_grs_lbs", 											Format:"",           PointCount:MST_CBM_POINT},
	             {Type:"Float",     	  Hidden:1,		Width:70,		Align:"Center",		ColMerge:1,		SaveName:prefix+"lv1_net_kgs", 											Format:"",           PointCount:MST_CBM_POINT},
	             {Type:"Float",     	  Hidden:1,		Width:50,		Align:"Center",		ColMerge:1,		SaveName:prefix+"lv1_net_lbs", 											Format:"",           PointCount:MST_CBM_POINT} ];
	       
	      InitColumns(cols);
	      SetEditable(1);
	      SetImageList(0,"./web/images/common/icon_m.gif");//popupimg변경시는인덱스번호로만가능...
	      SetColProperty(0 ,prefix + "eq_tpsz_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
	      SetColProperty(0 ,prefix + "seal_no" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
	      SetColProperty(0, prefix+"eq_no",  {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
	      SetColProperty('eq_tpsz_cd', {ComboText:'|'+TPCD1, ComboCode:'|'+TPCD2} );
	      SetColProperty(0 ,prefix+"seal_no" , {AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
	      SetUnicodeByte(3);
	      SetHeaderRowHeight(30);
	      SetSheetHeight(250);
	      resizeSheet();
	      }
	      break;
	      
	case 3:      //IBSheet3 init
	    with(sheetObj){
        
//	      var hdr1="|SEQ|Booking No|Order Type|Booking Date|Estimated Date|Load Plan No|Console No|LP Date|TTL EA QTY|Consignee|Consignee|Contract|Contract|W/H Code";
	      var prefix=fix_grid03;

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('WHOCMgmt_HDR4'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ 
	             {Type:"CheckBox",  Hidden:0,  Width:30, 	Align:"Center",		ColMerge:1,		SaveName:prefix+"chk",			KeyField:0,						  	Format:"" },
	             {Type:"Seq",       Hidden:0,  Width:30,	Align:"Center",		ColMerge:1,		SaveName:prefix+"seq",			KeyField:0,						  	Format:"" },
	             {Type:"Text",     	Hidden:0,  Width:120,	Align:"Center",		ColMerge:1,		SaveName:prefix+"wob_bk_no",	KeyField:0,		UpdateEdit:0,		Format:"" },
	             {Type:"Text",     	Hidden:0,  Width:100,	Align:"Center",		ColMerge:1,		SaveName:prefix+"ord_tp_nm",	KeyField:0,		UpdateEdit:0,		Format:"" },
	             {Type:"Date",     	Hidden:0,  Width:100,	Align:"Center",		ColMerge:1,		SaveName:prefix+"bk_date",		KeyField:0,		UpdateEdit:0,		Format:"Ymd" },
	             {Type:"Date",     	Hidden:0,  Width:100,	Align:"Center",		ColMerge:1,		SaveName:prefix+"est_out_dt",	KeyField:0,		UpdateEdit:0,		Format:"Ymd" },
	             {Type:"Text",     	Hidden:0,  Width:130,	Align:"Center",		ColMerge:1,		SaveName:prefix+"lp_no",		KeyField:0,		UpdateEdit:0,		Format:"" },
	             {Type:"Text",     	Hidden:0,  Width:130,	Align:"Center",		ColMerge:1,		SaveName:prefix+"consol_no",	KeyField:0,		UpdateEdit:0,		Format:"" },
	             {Type:"Date",     	Hidden:0,  Width:100,	Align:"Center",		ColMerge:1,		SaveName:prefix+"lp_dt",		KeyField:0,		UpdateEdit:0,		Format:"Ymd" },
	             {Type:"Int",     	Hidden:0,  Width:80,	Align:"Center",		ColMerge:1,		SaveName:prefix+"ttl_ea_qty",	KeyField:"Integer",		UpdateEdit:0,		Format:"" },
	             {Type:"Text",     	Hidden:0,  Width:75,	Align:"Center",		ColMerge:1,		SaveName:prefix+"buyer_cd",		KeyField:0,		UpdateEdit:0,		Format:"" },
	             {Type:"Text",     	Hidden:0,  Width:270,	Align:"Center",		ColMerge:1,		SaveName:prefix+"buyer_nm",		KeyField:0,		UpdateEdit:0,		Format:"" },
	             {Type:"Text",     	Hidden:0,  Width:90,	Align:"Center",		ColMerge:1,		SaveName:prefix+"ctrt_no",		KeyField:0,		UpdateEdit:0,		Format:"" },
	             {Type:"Text",     	Hidden:0,  Width:130,	Align:"Left",		ColMerge:1,		SaveName:prefix+"ctrt_nm",		KeyField:0,		UpdateEdit:0,		Format:"" },
	             {Type:"Text",     	Hidden:0,  Width:60,	Align:"Center",		ColMerge:1,		SaveName:prefix+"wh_cd",		KeyField:0,		UpdateEdit:0,		Format:"" } ];
	       
	      InitColumns(cols);
		  SetSheetHeight(150);
		  SetColProperty('wh_cd', {ComboText:WHNMLIST, ComboCode:WHCDLIST} );
	      SetEditable(1);
	      }
	      break;
	case 4:
	    with(sheetObj){
        
//      var hdr1="SEQ|Booking No|sao_sys_no|item_sys_no|item_seq|Item|Item Name|Order Qty|Order Qty|Order Qty|rn|Loading Qty(EA)|Loading Qty(EA)|Loading Qty(EA)|Loading Qty(EA)|Loading Qty(EA)|chk|CBM|CBM|GWT|GWT|NWT|NWT|Inbound Date|Item Lot No|Location|Type|CNTR/TR NO|Seal No|Gate-In|Gate-Out|Additional Lot Property|Additional Lot Property|Additional Lot Property|Lot ID|Wave Key|So No|Inbound Information|Inbound Information"
//      + "|status|wh_loc_cd|po_sys_no|eq_tp_cd|wh_cd|sao_no|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs";
//      var hdr2="SEQ|Booking No|sao_sys_no|item_sys_no|item_seq|Item|Item Name|Unit|Unit Qty|EA Qty|rn|Allocated|Loading|Load Plan No|Shipped|Gap|chk|CBM|CBF|KGS|LBS|KGS|LBS|Inbound Date|Item Lot No|Location|Type|CNTR/TR NO|Seal No|Gate-In|Gate-Out|Expiration Date|Lot 04|Lot 05|Lot ID|Wave Key|So No|Booking No|Po No"
//      + "|status|wh_loc_cd|po_sys_no|eq_tp_cd|wh_cd|sao_no|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs";
      var prefix=fix_grid04;

      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );

      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
      var headers = [ { Text:getLabel('WHOCMgmt_HDR5'), Align:"Center"},
                  { Text:getLabel('WHOCMgmt_HDR6'), Align:"Center"} ];
      InitHeaders(headers, info);

      var cols = [ 
			 {Type:"Text",     	Hidden:1, 	Width:30,  Align:"Center",  	ColMerge:1,		SaveName:prefix+"seq", 														Format:"", },
             {Type:"Text",     	Hidden:0, 	Width:120, Align:"Center", 	ColMerge:1,		SaveName:prefix+"wob_bk_no",  				KeyField:0,		UpdateEdit:0 , 	Format:"", },
             {Type:"Text",     	Hidden:1, 	Width:150, Align:"Left", 	ColMerge:1,		SaveName:prefix+"sao_sys_no", 												Format:"", },
             {Type:"Text",     	Hidden:1, 	Width:150, Align:"Left", 	ColMerge:1,		SaveName:prefix+"item_sys_no", 												Format:"", },
             {Type:"Text",     	Hidden:1, 	Width:150, Align:"Left", 	ColMerge:1,		SaveName:prefix+"item_seq", 												Format:"", },
             {Type:"Text",     	Hidden:0, 	Width:100, Align:"Left", 	ColMerge:1,		SaveName:prefix+"item_cd", 					KeyField:0,		UpdateEdit:0 ,  Format:"", },
             {Type:"Text",     	Hidden:0, 	Width:150, Align:"Left", 	ColMerge:1,		SaveName:prefix+"item_nm", 					KeyField:0, 	UpdateEdit:0 ,  Format:"", },
             {Type:"Text",     	Hidden:0, 	Width:50,  Align:"Center", 	ColMerge:1,		SaveName:prefix+"item_pkgunit", 			KeyField:0, 	UpdateEdit:0 ,  Format:"", },
             {Type:"Int",     	Hidden:0, 	Width:70,  Align:"Right", 	ColMerge:1,		SaveName:prefix+"item_pkgqty", 				KeyField:0, 	UpdateEdit:0 ,  Format:"Integer",  PointCount:WMS_QTY_POINT },
             {Type:"Int",     	Hidden:0, 	Width:70,  Align:"Right", 	ColMerge:1,		SaveName:prefix+"item_ea_qty", 				KeyField:0,		UpdateEdit:0 ,	Format:"Integer",  PointCount:WMS_QTY_POINT },
             {Type:"Text",     	Hidden:1, 	Width:10,  Align:"Left", 	ColMerge:1,		SaveName:prefix+"rn", 														Format:"", },
             {Type:"Int",     	Hidden:0, 	Width:70,  Align:"Right", 	ColMerge:1,		SaveName:prefix+"pick_item_ea_qty", 		KeyField:0, 	UpdateEdit:0 ,	Format:"Integer",  PointCount:WMS_QTY_POINT },
             {Type:"Int",     	Hidden:0, 	Width:70,  Align:"Right", 	ColMerge:1,		SaveName:prefix+"lp_item_ea_qty", 			KeyField:0, 	UpdateEdit:0 , 	Format:"Integer",  PointCount:WMS_QTY_POINT },
             {Type:"Text",     	Hidden:0, 	Width:120, Align:"Center", 	ColMerge:1,		SaveName:prefix+"lp_no", 					KeyField:0,		UpdateEdit:0, 	Format:"" },
             {Type:"Int",     Hidden:0, 	Width:90,  Align:"Right", 	ColMerge:1,		SaveName:prefix+"load_item_ea_qty", 		KeyField:0,						Format:"Integer",  PointCount:WMS_QTY_POINT },
             {Type:"Int",     	Hidden:0, 	Width:50,  Align:"Right", 	ColMerge:1,		SaveName:prefix+"gap", 						KeyField:0,		UpdateEdit:0,	Format:"Integer",  PointCount:WMS_QTY_POINT },
             {Type:"CheckBox", 	Hidden:0, 	Width:30,  Align:"Center", 	ColMerge:1,		SaveName:prefix+"chk", 						KeyField:0, 					Format:"", },
             {Type:"Float",     	Hidden:0, 	Width:80,  Align:"Right",	ColMerge:0,		SaveName:prefix+"load_item_cbm", 			KeyField:0, 					Format:"",			  PointCount:WMS_CBM_POINT },
             {Type:"Float",     	Hidden:0, 	Width:80,  Align:"Right", 	ColMerge:1,		SaveName:prefix+"load_item_cbf", 			KeyField:0, 					Format:"",			  PointCount:WMS_CBM_POINT },
             {Type:"Float",     	Hidden:0, 	Width:80,  Align:"Right", 	ColMerge:1,		SaveName:prefix+"load_item_grs_kgs", 		KeyField:0, 					Format:"",			  PointCount:WMS_CBM_POINT },
             {Type:"Float",     	Hidden:0, 	Width:80,  Align:"Right", 	ColMerge:1,		SaveName:prefix+"load_item_grs_lbs", 		KeyField:0, 					Format:"",			  PointCount:WMS_CBM_POINT },
             {Type:"Float",     	Hidden:0, 	Width:80,  Align:"Right", 	ColMerge:1,		SaveName:prefix+"load_item_net_kgs", 		KeyField:0, 					Format:"",			  PointCount:WMS_CBM_POINT },
             {Type:"Float",     	Hidden:0, 	Width:80,  Align:"Right", 	ColMerge:1,		SaveName:prefix+"load_item_net_lbs", 		KeyField:0, 					Format:"",			  PointCount:WMS_CBM_POINT },
             {Type:"Date",     	Hidden:0, 	Width:120,  Align:"Center", 	ColMerge:1,		SaveName:prefix+"inbound_dt", 				KeyField:0,		UpdateEdit:0 ,	Format:"Ymd" },
             {Type:"Text",     	Hidden:0, 	Width:120, Align:"Center", 	ColMerge:1,		SaveName:prefix+"lot_no", 					KeyField:0,		UpdateEdit:0 , 	Format:"" },
             {Type:"Text",     	Hidden:0, 	Width:80,  Align:"Left", 	ColMerge:1,		SaveName:prefix+"wh_loc_cd_nm", 			KeyField:0,		UpdateEdit:0 , 	Format:"" },
             {Type:"PopupEdit",	Hidden:0, 	Width:70,  Align:"Center", 	ColMerge:1,		SaveName:prefix+"eq_tpsz_cd", 				KeyField:0,		UpdateEdit:0 , 	Format:"" },
             {Type:"Text",     	Hidden:0, 	Width:100, Align:"Left", 	ColMerge:1,		SaveName:prefix+"eq_no", 					KeyField:0,		EditLen:20, 	Format:"" },
             {Type:"PopupEdit",	Hidden:0, 	Width:120, Align:"Left", 	ColMerge:1,		SaveName:prefix+"seal_no", 					KeyField:0,		EditLen:100, 	Format:"" },
             {Type:"Date",     	Hidden:0, 	Width:80,  Align:"Center", 	ColMerge:1,		SaveName:prefix+"gate_in_hm", 				KeyField:0,						Format:"Hm" },
             {Type:"Date",     	Hidden:0, 	Width:80,  Align:"Center", 	ColMerge:1,		SaveName:prefix+"gate_out_hm", 				KeyField:0,						Format:"Hm" },
             {Type:"Date",     	Hidden:0, 	Width:120,  Align:"Left", 	ColMerge:1,		SaveName:prefix+"exp_dt", 					KeyField:0,		UpdateEdit:0 ,	Format:"Ymd" },
             {Type:"Text",     	Hidden:0, 	Width:80,  Align:"Left", 	ColMerge:1,		SaveName:prefix+"lot_04", 					KeyField:0,		UpdateEdit:0 , 	Format:""},
             {Type:"Text",     	Hidden:0, 	Width:80,  Align:"Left", 	ColMerge:1,		SaveName:prefix+"lot_05", 					KeyField:0,		UpdateEdit:0 , 	Format:"" },
             {Type:"Text",     	Hidden:0, 	Width:120, Align:"Center", 	ColMerge:1,		SaveName:prefix+"lot_id", 					KeyField:0,		UpdateEdit:0 , 	Format:"" },
             {Type:"Text",     	Hidden:0, 	Width:120, Align:"Center", 	ColMerge:1,		SaveName:prefix+"wave_no", 					KeyField:0,		UpdateEdit:0 , 	Format:"" },
             {Type:"Text",     	Hidden:0, 	Width:120, Align:"Center", 	ColMerge:1,		SaveName:prefix+"so_no", 					KeyField:0,		UpdateEdit:0 , 	Format:"" },
             {Type:"Text",     	Hidden:0, 	Width:120, Align:"Center", 	ColMerge:1,		SaveName:prefix+"wib_bk_no", 				KeyField:0,		UpdateEdit:0 , 	Format:"" },
             {Type:"Text",     	Hidden:0, 	Width:120, Align:"Center", 	ColMerge:1,		SaveName:prefix+"po_no", 					KeyField:0,		UpdateEdit:0 , 	Format:"" },
             {Type:"Status",   	Hidden:1, 	Width:30,  Align:"Center",			   		SaveName:prefix+"ibflag" },
             {Type:"Text",     	Hidden:1, 	Width:80,  Align:"Center", 	ColMerge:1,		SaveName:prefix+"wh_loc_cd", 												Format:"" },
             {Type:"Text",     	Hidden:1, 	Width:80,  Align:"Center", 	ColMerge:1,		SaveName:prefix+"po_sys_no", 												Format:"" },
             {Type:"Text",     	Hidden:1, 	Width:80,  Align:"Center", 	ColMerge:1,		SaveName:prefix+"eq_tp_cd", 												Format:"" },
             {Type:"Text",     	Hidden:1, 	Width:80,  Align:"Center", 	ColMerge:1,		SaveName:prefix+"wh_cd", 													Format:"" },
             {Type:"Text",     	Hidden:1, 	Width:80,  Align:"Center", 	ColMerge:1,		SaveName:prefix+"sao_no", 													Format:"" },
             {Type:"Text",     	Hidden:1, 	Width:0,   Align:"Center", 	ColMerge:1,		SaveName:prefix+"pkg_lv1_qty",												Format:WMS_QTY_FORMAT2, PointCount:WMS_QTY_POINT },
             {Type:"Float",     	Hidden:1, 	Width:0,   Align:"Center", 	ColMerge:1,		SaveName:prefix+"lv1_cbm", 													Format:"",			PointCount:MST_CBM_POINT },
             {Type:"Float",     	Hidden:1, 	Width:0,   Align:"Center", 	ColMerge:1,		SaveName:prefix+"lv1_cbf", 													Format:"",			PointCount:MST_CBM_POINT },
             {Type:"Float",     	Hidden:1, 	Width:0,   Align:"Center", 	ColMerge:1,		SaveName:prefix+"lv1_grs_kgs", 												Format:"",			PointCount:MST_CBM_POINT },
             {Type:"Float",     	Hidden:1, 	Width:0,   Align:"Center", 	ColMerge:1,		SaveName:prefix+"lv1_grs_lbs", 												Format:"",			PointCount:MST_CBM_POINT },
             {Type:"Float",     	Hidden:1, 	Width:70,  Align:"Center", 	ColMerge:1,		SaveName:prefix+"lv1_net_kgs", 												Format:"",			PointCount:MST_CBM_POINT },
             {Type:"Float",     	Hidden:1, 	Width:50,  Align:"Center", 	ColMerge:1,		SaveName:prefix+"lv1_net_lbs", 												Format:"",			PointCount:MST_CBM_POINT } ];
       
      InitColumns(cols);
      SetHeaderRowHeight(30);
      resizeSheet();
      SetSheetHeight(250);
      SetEditable(1);
      SetImageList(0,"./web/images/common/icon_m.gif");//popupimg변경시는인덱스번호로만가능...
      SetColProperty(0 ,prefix+"eq_tpsz_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
      SetColProperty(0 ,prefix+"seal_no" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
      SetColProperty(0 ,prefix+"eq_no" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
      SetColProperty('eq_tpsz_cd', {ComboText:'|'+TPCD1, ComboCode:'|'+TPCD2} );
      SetUnicodeByte(3);
      }
      break;


	}
}

function resizeSheet(){
	 //ComResizeSheet(docObjects[0]);
	 ComResizeSheet(docObjects[1]);
	// ComResizeSheet(docObjects[2]);
	 ComResizeSheet(docObjects[3]);
	}

/*
 * sheet1 searchend event
 */
function sheet1_OnSearchEnd(){
	var sheetObj=docObjects[0];//docObjects[0];
	for(var i=1; i<=sheetObj.LastRow();i++){
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "wob_bk_no","#0100FF");
		//CONTRACT NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid01 + "ctrt_no","#0100FF");
	}
	if(loadpageflag==0)
	{
		downSheet(fix_by_booking, sheet1, fix_grid01);
		//setDefault(fix_by_booking);
		btn_show('bk','H');
		loadpageflag=1;
		if($("#req_search_div").val()=="wave"){
			downSheet(fix_by_booking, sheet1, fix_grid01);
			//by lp
			formObj.lp_search_no.value = formObj.req_search_no.value;
			formObj.lp_search_tp.value = formObj.req_search_tp.value;
			//btn_show(fix_by_loadplan, 'H');
			btn_Search(fix_by_loadplan);
		}
	}
}
/*
 * sheet1 dbclick event
 */
function sheet1_OnDblClick(sheetObj, Row, Col, Value) {
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid01 + "wob_bk_no":
			var sUrl="./WHOutbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid01 + "wob_bk_no");
			parent.mkNewFrame('Outbound Booking Management', sUrl);
		break;
		case fix_grid01 + "ctrt_no":
			var sUrl="./CtrtMgmt.clt?ctrt_no="+ sheetObj.GetCellValue(Row, fix_grid01 + "ctrt_no");
			parent.mkNewFrame('Contract Management', sUrl);
			break;
	}
}
/*
 * sheet2 searchend event
 */
function sheet2_OnSearchEnd(){
	var sheetObj=docObjects[1];//docObjects[0];
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid02 + "wob_bk_no","#0100FF");
		//seal button 지정
 		sheetObj.PopupButtonImage(i, fix_grid02 + "seal_no",0);
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid02 + "wib_bk_no","#0100FF");
		//WAVE NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid02 + "wave_no","#0100FF");
	}
	
	mergeSheetSearchEnd(sheetObj, 2); // 2: Ignore 2 rows of Headers.
	check_authority_wh(fix_by_booking); // check authority warehouse code
}
/*
 * sheet1 dbclick event
 */
function sheet2_OnDblClick(sheetObj, Row, Col, Value) {
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid02 + "wib_bk_no":
			var sUrl="./WHInbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid02 + "wib_bk_no");
			parent.mkNewFrame('Inbound Booking Management', sUrl);
		break;
		case fix_grid02 + "wob_bk_no":
			var sUrl="./WHOutbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid02 + "wob_bk_no");
			parent.mkNewFrame('Outbound Booking Management', sUrl);
		break;
		case fix_grid02 + "wave_no":
			if(sheetObj.GetCellValue(Row, fix_grid02 + "wave_no").trim() != "")
			{
				var sUrl="./WaveMgmt.clt?wave_no="+sheetObj.GetCellValue(Row, fix_grid02 + "wave_no");
				parent.mkNewFrame('Wave', sUrl);	
			}
		break;
	}
}
/*
 * sheet2 onchange event
 */
function sheet2_OnChange(sheetObj, row, col, Value) {
	var colStr=sheetObj.ColSaveName(col);
	if (colStr == (fix_grid02+"pick_item_cbf") && Value != "") 
	{
		funcKGS_CBM_CAC("CBF_CBM", (fix_grid02+"pick_item_cbf"), (fix_grid02+"pick_item_cbm"), sheetObj);		
	} 
	else if (colStr == (fix_grid02+"pick_item_grs_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid02+"pick_item_grs_lbs"), (fix_grid02+"pick_item_grs_kgs"), sheetObj);		
	} 
	else if (colStr == (fix_grid02+"pick_item_net_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid02+"pick_item_net_lbs"), (fix_grid02+"pick_item_net_kgs"), sheetObj);		
	}
	else if(colStr == (fix_grid02 + "eq_tpsz_cd")) 
	{
		change_eq_tpsz_cd(Value, sheetObj, row, col, fix_grid02);
	}
	else if(colStr == (fix_grid02 + "issu_item_ea_qty"))
	{
		var shipped=Value;
		var allocated=eval(sheetObj.GetCellValue(row, fix_grid02 + "pick_item_ea_qty"));
		//음수체크
		if(Value < 0)
		{
			shipped=Math.abs(Value);
			sheetObj.SetCellValue(row, col,shipped,0);
		}
		//shipped는 allocated보다 클수없다.
		if(shipped > allocated)
		{
			shipped=allocated;
			sheetObj.SetCellValue(row, col,shipped,0);
		}
		//allocated - shipped = gap에 셋팅
		sheetObj.SetCellValue(row,  fix_grid02 + "gap",allocated - shipped,0);
		//CBM, KGS, LBS 계산
		var pkg_lv1_qty=eval(sheetObj.GetCellValue(row, fix_grid02 + "pkg_lv1_qty"));
		var lv1_cbm=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_cbm"));
		var lv1_cbf=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_cbf"));
		var lv1_grs_kgs=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_grs_kgs"));
		var lv1_grs_lbs=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_grs_lbs"));
		var lv1_net_kgs=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_net_kgs"));
		var lv1_net_lbs=eval(sheetObj.GetCellValue(row, fix_grid02 + "lv1_net_lbs"));
		sheetObj.SetCellValue(row,  fix_grid02 + "pick_item_cbm",(pkg_lv1_qty * shipped) * lv1_cbm,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "pick_item_cbf",(pkg_lv1_qty * shipped) * lv1_cbf,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "pick_item_grs_kgs",(pkg_lv1_qty * shipped) * lv1_grs_kgs,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "pick_item_grs_lbs",(pkg_lv1_qty * shipped) * lv1_grs_lbs,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "pick_item_net_kgs",(pkg_lv1_qty * shipped) * lv1_net_kgs,0);
		sheetObj.SetCellValue(row,  fix_grid02 + "pick_item_net_lbs",(pkg_lv1_qty * shipped) * lv1_net_lbs,0);
	}
	 checkBoxOnOff(sheetObj, colStr);
}
function sheet2_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	//var cal = new ComCalendarGrid();
	if (colName == fix_grid02 + "seal_no")
	{
		ComShowMemoPad3(sheetObj, Row, Col, false, 300, 82,  Col, Col);      
	}
	else if ( colName == fix_grid02 + "eq_tpsz_cd" ) 
	{
		var tp="A";
		if(sheetObj.GetCellValue(Row, (fix_grid02+"eq_tp_cd")) != "")
		{
			tp=sheetObj.GetCellValue(Row, (fix_grid02+"eq_tp_cd"));
		}
		
		callBackFunc = "setIbContainerTypeInfo_bk";
	    modal_center_open('./ContainerTypePopup.clt?type=' + tp + '&eq_unit=' + sheetObj.GetCellValue(Row, Col), rtnary, 400, 590,"yes");
	}
}

//function sheet2_OnSort(sheetObj, Col, SortArrow) {
//	mergeSheetSearchEnd(sheetObj, 2); // 2: Ignore 2 rows of Headers.
//}
/*
 * sheet4 onchange event
 */
function sheet3_OnChange(sheetObj, row, col, Value) {
	var sheetObj=docObjects[2];//docObjects[0];
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == (fix_grid03 + "chk"))
	{
		changeValueLp(sheetObj, fix_grid03, row, "chk", Value);
	}
}
/*
 * sheet3 searchend event
 */
/*function sheet3_OnSearchEnd(){
	//doHideProgress();
	//ComOpenWait(false);
	var sheetObj=docObjects[2];//docObjects[0];
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid03 + "wob_bk_no","#0100FF");
		//consol_no 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid03 + "consol_no","#0100FF");
		//CONTRACT NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid03 + "ctrt_no","#0100FF");
	}
	//downSheet('lp', sheetObj, fix_grid03);
	if(loadpageflag==0)
	{
		downSheet('lp', sheetObj, fix_grid03);
		//setDefault(fix_by_booking);
		btn_show('lp','H');
		loadpageflag=1;
		if($("#req_search_div").val()=="wave"){
			downSheet(fix_by_loadplan, sheet3, fix_grid03);
			if(sheet1.RowCount > 0)
			{
				goTabSelect("01");
			}
			else if(sheet3.RowCount > 0)
			{
				goTabSelect("02");
			}
			else
			{
				goTabSelect("01");
			}
			break;
		}
	}
}*/
/*
 * sheet3 dbclick event
 */
function sheet3_OnDblClick(sheetObj, Row, Col, Value) {
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid03 + "wob_bk_no":
			var sUrl="./WHOutbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid03 + "wob_bk_no");
			parent.mkNewFrame('Outbound Booking Management', sUrl);
			break;
		case fix_grid03 + "consol_no":
			var sUrl="./LoadPlanMgmt.clt?s_consol_no="+sheetObj.GetCellValue(Row, fix_grid03 + "consol_no");
			parent.mkNewFrame('Loading Plan Management', sUrl);
			break;
		case fix_grid03 + "ctrt_no":
			var sUrl="./CtrtMgmt.clt?ctrt_no="+ sheetObj.GetCellValue(Row, fix_grid03 + "ctrt_no");
			parent.mkNewFrame('Contract Management', sUrl);
			break;
	}
}
/*
 * sheet4 searchend event
 */
function sheet4_OnSearchEnd(){
	var sheetObj=docObjects[3];//docObjects[0];
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid04 + "wob_bk_no","#0100FF");
		//seal button 지정
 		sheetObj.PopupButtonImage(i, fix_grid04 + "seal_no",0);
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid04 + "wib_bk_no","#0100FF");
		//WAVE NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid04 + "wave_no","#0100FF");
	}
	mergeSheetSearchEnd(sheetObj, 2);
	check_authority_wh(fix_by_loadplan); // check authority warehouse code
}
/*
 * sheet4 onchange event
 */
function sheet4_OnChange(sheetObj, row, col, Value) {
	var colStr=sheetObj.ColSaveName(col);
	if (colStr == (fix_grid04+"load_item_cbf") && Value != "") 
	{
		funcKGS_CBM_CAC("CBF_CBM", (fix_grid04+"load_item_cbf"), (fix_grid04+"load_item_cbm"), sheetObj);		
	} 
	else if (colStr == (fix_grid04+"load_item_grs_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid04+"load_item_grs_lbs"), (fix_grid04+"load_item_grs_kgs"), sheetObj);		
	} 
	else if (colStr == (fix_grid04+"load_item_net_lbs") && Value != "") 
	{
		funcKGS_CBM_CAC("LB_KG", (fix_grid04+"load_item_net_lbs"), (fix_grid04+"load_item_net_kgs"), sheetObj);		
	}
	else if(colStr == (fix_grid04 + "eq_tpsz_cd")) 
	{
		change_eq_tpsz_cd(Value, sheetObj, row, col, fix_grid04);
	}
	else if(colStr == (fix_grid04 + "load_item_ea_qty"))
	{
		var shipped=Value;
		var loading=eval(sheetObj.GetCellValue(row, fix_grid04 + "lp_item_ea_qty"));
		//음수체크
		if(Value < 0)
		{
			shipped=Math.abs(Value);
			sheetObj.SetCellValue(row, col,shipped,0);
		}
		//shipped는 loading보다 클수없다.
		if(shipped > loading)
		{
			shipped=loading;
			sheetObj.SetCellValue(row, col,shipped,0);
		}
		//loading - shipped = gap에 셋팅
		sheetObj.SetCellValue(row,  fix_grid04 + "gap",loading - shipped,0);
		//CBM, KGS, LBS 계산
		var pkg_lv1_qty=eval(sheetObj.GetCellValue(row, fix_grid04 + "pkg_lv1_qty"));
		var lv1_cbm=eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_cbm"));
		var lv1_cbf=eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_cbf"));
		var lv1_grs_kgs=eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_grs_kgs"));
		var lv1_grs_lbs=eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_grs_lbs"));
		var lv1_net_kgs=eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_net_kgs"));
		var lv1_net_lbs=eval(sheetObj.GetCellValue(row, fix_grid04 + "lv1_net_lbs"));
		sheetObj.SetCellValue(row,  fix_grid04 + "load_item_cbm",(pkg_lv1_qty * shipped) * lv1_cbm,0);
		sheetObj.SetCellValue(row,  fix_grid04 + "load_item_cbf",(pkg_lv1_qty * shipped) * lv1_cbf,0);
		sheetObj.SetCellValue(row,  fix_grid04 + "load_item_grs_kgs",(pkg_lv1_qty * shipped) * lv1_grs_kgs,0);
		sheetObj.SetCellValue(row,  fix_grid04 + "load_item_grs_lbs",(pkg_lv1_qty * shipped) * lv1_grs_lbs,0);
		sheetObj.SetCellValue(row,  fix_grid04 + "load_item_net_kgs",(pkg_lv1_qty * shipped) * lv1_net_kgs,0);
		sheetObj.SetCellValue(row,  fix_grid04 + "load_item_net_lbs",(pkg_lv1_qty * shipped) * lv1_net_lbs,0);
	}
	else if(colStr == (fix_grid04 + "chk"))
	{
		if(Value == 1)
		{
			//전건 check풀기
			for (var m=sheetObj.HeaderRows(); m<=sheetObj.LastRow(); m++) {
					sheetObj.SetCellValue(m, fix_grid04 + "chk",0,0);
			}
		}
		changeValueLp(sheetObj, fix_grid04, row, "chk", Value);
	}
	else if(colStr == (fix_grid04 + "eq_no"))
	{
		changeValueLp(sheetObj, fix_grid04, row, "eq_no", Value);
	}
	else if(colStr == (fix_grid04 + "gate_in_hm"))
	{
		changeValueLp(sheetObj, fix_grid04, row, "gate_in_hm", Value);
	}
	else if(colStr == (fix_grid04 + "gate_out_hm"))
	{
		changeValueLp(sheetObj, fix_grid04, row, "gate_out_hm", Value);
	}
	else if(colStr == (fix_grid04 + "seal_no"))
	{
		changeValueLp(sheetObj, fix_grid04, row, "seal_no", Value);
	}
}
/*
 * 동일 LP_NO에 해당하는 건들을 체크 또는 체크해지한다.
 */
function changeValueLp(sheetObj, fix_grid, row, colName, Value)
{
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow(); i++) {
		if(sheetObj.GetCellValue(row, fix_grid + "lp_no") == sheetObj.GetCellValue(i, fix_grid + "lp_no"))
		{
			sheetObj.SetCellValue(i, fix_grid + colName,Value,0);
		}
	}
}
function sheet4_OnPopupClick(sheetObj, Row, Col)
{
	var colName=sheetObj.ColSaveName(Col);
	//var cal = new ComCalendarGrid();
	if (colName == fix_grid04 + "seal_no")
	{
		ComShowMemoPad3(sheetObj, Row, Col, false, 300, 82,  Col, Col);      
	}
	else if ( colName == fix_grid04 + "eq_tpsz_cd" ) 
	{
		var tp="A";
		if(sheetObj.GetCellValue(Row, (fix_grid04+"eq_tp_cd")) != "")
		{
			tp=sheetObj.GetCellValue(Row, (fix_grid04+"eq_tp_cd"));
		}
		
		callBackFunc = "setIbContainerTypeInfo_lp";
	    modal_center_open('./ContainerTypePopup.clt?type=' + tp + '&eq_unit=' + sheetObj.GetCellValue(Row, Col), rtnary, 400, 590,"yes");
		
	}
}
/*
 * sheet4 dbclick event
 */
function sheet4_OnDblClick(sheetObj, Row, Col, Value) {
	var colStr=sheetObj.ColSaveName(Col);
	switch(colStr)
	{
		case fix_grid04 + "wob_bk_no":
			var sUrl="./WHOutbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid04 + "wob_bk_no");
			parent.mkNewFrame('Outbound Booking Management', sUrl);
			break;
		case fix_grid04 + "wib_bk_no":
			var sUrl="./WHInbkMgmt.clt?fwd_bk_no="+sheetObj.GetCellValue(Row, fix_grid04 + "wib_bk_no");
			parent.mkNewFrame('Inbound Booking Management', sUrl);
		break;
		case fix_grid04 + "wave_no":
			if(sheetObj.GetCellValue(Row, fix_grid04 + "wave_no").trim() != "")
			{
				var sUrl="./WaveMgmt.clt?wave_no="+sheetObj.GetCellValue(Row, fix_grid04 + "wave_no");
				parent.mkNewFrame('Wave', sUrl);	
			}
		break;
	}
}
/*
 * sheet에서 eq_tpsz_cd change되었을경우(by booking, by load plan 공통으로 사용하기위하여)
 */
var sheetTest , rowTest , colTest , fix_gridTest;
function change_eq_tpsz_cd(Value, sheetObj, row, col, fix_grid)
{
	if(Value != "")
	{
		sheetTest = sheetObj;
		rowTest = row;
		colTest = col;
		fix_gridTest = fix_grid;
		
		ajaxSendPost(setCntrTrTp, 'reqVal', '&goWhere=aj&bcKey=searchCntrTrTp&cntr_tp='+Value, './GateServlet.gsl');
		
	}
	else
	{
		sheetObj.SetCellValue(row, fix_grid+"eq_tp_cd","");
	}
}

function setCntrTrTp(reqVal){
	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != null){
			sheetTest.SetCellValue(rowTest, colTest,rtnArr[0]);
		}
		else{
			sheetTest.SetCellValue(rowTest, colTest,"0");
		}
		sheetTest.SetCellValue(rowTest, fix_gridTest+"eq_tp_cd",rtnArr[2]);
		
		if(rtnArr[3]!="" && rtnArr[3]!=null){
			alert(rtnArr[3]);
			sheetTest.SelectCell(rowTest, colTest);
		}
	}
}
/*
 * type popupedit 완료후(by booking)
 */
function setIbContainerTypeInfo_bk(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		sheet2.SetCellValue(sheet2.GetSelectRow(), fix_grid02 + "eq_tpsz_cd",rtnValAry[0]);
		sheet2.SetCellValue(sheet2.GetSelectRow(), fix_grid02 + "eq_tp_cd",rtnValAry[2]);
	}
}
/*
 * type popupedit 완료후(by load plan)
 */
function setIbContainerTypeInfo_lp(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		sheet4.SetCellValue(sheet1.GetSelectRow(), fix_grid04 + "eq_tpsz_cd",rtnValAry[0]);
		sheet4.SetCellValue(sheet1.GetSelectRow(), fix_grid04 + "eq_tp_cd",rtnValAry[2]);
	}
}
/*
 * type popupedit 완료후(by booking, by load plan 공통으로 사용하기위하여)
 */
//버튼클릭이벤트를 받아 처리하는 이벤트핸들러 정의 */

function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.bk_fm_bk_date,  formObj.bk_to_bk_date, 'MM-dd-yyyy');
        break;
        case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.bk_fm_est_out_dt, formObj.bk_to_est_out_dt,  'MM-dd-yyyy');
        break;
        
        case 'DATE13':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.lp_fm_bk_date,  formObj.lp_to_bk_date, 'MM-dd-yyyy');
        break;
        case 'DATE14':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.lp_fm_plan_dt, formObj.lp_to_plan_dt,  'MM-dd-yyyy');
        break;
    }
}

function doWork(srcName){
	
	var formObj=document.form;
	
	switch(srcName) {
//	case "btn_bk_to_bk_date":	
//		
//		var cal=new ComCalendarFromTo();
//	    cal.displayType="date";
//	    cal.select(formObj.bk_fm_bk_date, formObj.bk_to_bk_date, 'MM-dd-yyyy');
//		break;
//		
//	case "btn_bk_to_est_out_dt":
//		
//		var cal=new ComCalendarFromTo();
//	    cal.displayType="date";
//	    cal.select(formObj.bk_fm_est_out_dt, formObj.bk_to_est_out_dt, 'MM-dd-yyyy');
//		break;
	case "SEARCHLIST":
		if(tabID == '01'){
			doWork('btn_Search_Bk');
		}else{
			doWork('btn_Search_Lp');
		}
		break;	
	
	case "btn_bk_outbound_dt":
		var cal=new ComCalendar(); 
		cal.select(formObj.bk_outbound_dt,'MM-dd-yyyy');
		break;
		case "btn_bk_wh_cd": 
			locationPopup(fix_by_booking);
		break;
		case "btn_bk_ctrt_no" :	
			CtrtPopup(fix_by_booking);
		break;
		case "btn_bk_buyer_cd" : 
			ConsigneePopup(fix_by_booking);
			break;
		//-- by load plan

//	case "btn_lp_to_bk_date":
//		
//		var cal=new ComCalendarFromTo();
//	    cal.displayType="date";
//	    cal.select(formObj.lp_fm_bk_date, formObj.lp_to_bk_date, 'MM-dd-yyyy');
//		break;
//		
//	case "btn_lp_to_plan_dt":
//		
//		var cal=new ComCalendarFromTo();
//	    cal.displayType="date";
//	    cal.select(formObj.lp_fm_plan_dt, formObj.lp_to_plan_dt, 'MM-dd-yyyy');
//		break;
		
	case "btn_lp_outbound_dt":
		var cal=new ComCalendar();
		cal.select(formObj.lp_outbound_dt,'MM-dd-yyyy');
		break;
		case "btn_lp_wh_cd":
			locationPopup(fix_by_loadplan);
		break;
		case "btn_lp_ctrt_no" :
			CtrtPopup(fix_by_loadplan);
		break;
		case "btn_lp_buyer_cd" :
			ConsigneePopup(fix_by_loadplan);
			break;
		case "btn_Search_Lp" :
			btn_Search('lp');
			break;
		case "btn_Search_Bk" :
			btn_Search('bk');
			
			break;
		case "btn_up_bk" :
			btn_Up('bk');
			break;
		case "btn_down_bk" :
			btn_Down('bk');
			break;
		case "btn_up_lp" :
			btn_Up('lp');
			break;
		case "btn_down_lp" :
			btn_Down('lp');
			break;
		case "btn_complete_bk" :
			btn_Complete('bk');
			break;
		case "btn_equpdate_bk" :
			btn_EqUpdate('bk');
			break;
		case "btn_complete_lp" :
			btn_Complete('lp');
			break;
		case "btn_equpdate_lp" :
			btn_EqUpdate('lp');
			break;
	}
}
/*
 * NAME 엔터시 팝업호출 - contract name
 */
function CtrtPopup(div){
	
	callBackFunc = "setCtrtNoInfo_" + div;
    modal_center_open('./ContractRoutePopup.clt?ctrt_nm=' + $("#" + div + "_ctrt_nm").val() + "&ctrt_no=" + $("#" + div + "_ctrt_no").val(), rtnary, 900, 580,"yes");
    
}

function setCtrtNoInfo_bk(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		formObj.bk_ctrt_no.value = rtnValAry[0];
		formObj.bk_ctrt_nm.value = rtnValAry[1];
	}
}
function setCtrtNoInfo_lp(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		formObj.lp_ctrt_no.value = rtnValAry[0];
		formObj.lp_ctrt_nm.value = rtnValAry[1];
	}
}
/*
 * NAME 엔터시 팝업호출 - Consignee name
 */
function ConsigneePopup(div){
	var formObj=document.form;
	rtnary=new Array(2);
   	rtnary[0]="";
   	if(div==fix_by_booking){
   		rtnary[1]=formObj.bk_buyer_nm.value;
	}else{
		rtnary[1]=formObj.lp_buyer_nm.value;
	}
	rtnary[2]=window;
	callBackFunc = "setConsigneeInfo_" + div;
    modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    
}

function setConsigneeInfo_bk(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		formObj.bk_buyer_cd.value = rtnValAry[0];
		formObj.bk_buyer_nm.value = rtnValAry[2];
	}
}
function setConsigneeInfo_lp(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {return;
	}else{
		var formObj=document.form;
		var rtnValAry=rtnVal.split("|");
		formObj.lp_buyer_cd.value = rtnValAry[0];
		formObj.lp_buyer_nm.value = rtnValAry[2];
	}
}
/*
 * 팝업 관련 로직 끝
 */
/*
 * 조회
 * div : bk
 * div : lp
 */
function btn_Search(div){
	var formObj=document.form;
//	doShowProcess();
//	setTimeout(function(){
	//sheet객체생성
	var sheetObjHeader, sheetObjDetail;
	if(loading_flag != "Y"){
		return;
	}
	if(div == fix_by_booking)
	{
		sheetObjHeader=docObjects[0];
		sheetObjDetail=docObjects[1];
	}
	else
	{
		sheetObjHeader=docObjects[2];
		sheetObjDetail=docObjects[3];
	}
	//search
	if (validateForm(formObj, 'search_' + div)) {
		var sXml="";
		
		switch(div)
		{
			case (fix_by_booking):
				//searchWHOCMgmtHeaderByBooking
				
				sheetObjHeader.RemoveAll();
				formObj.f_cmd.value = SEARCH;
				//var xml = sheetObjHeader.GetSearchData("./WHOCMgmt_001GS.clt", FormQueryString(formObj,null,""));
 				sheetObjHeader.DoSearch("./WHOCMgmt_001GS.clt", FormQueryString(formObj,null,""));
 				
				break;
			case (fix_by_loadplan):
				
				sheetObjHeader.RemoveAll();
				formObj.f_cmd.value = SEARCH01;
				sheetObjHeader.DoSearch("./WHOCMgmt_002GS.clt", FormQueryString(formObj,null,""));
				break;
		}
		sheetObjDetail.RemoveAll();
		$("#" + div + "_outbound_dt").val("");
		$("#" + div + "_load_hm_fr").val("");
		$("#" + div + "_load_hm_to").val("");
		$("#" + div + "_custms_ref_no").val("");
		$("#" + div + "_rmk").val("");
		$("#" + div + "_wh_cd_selected").val("");
		//save button disabled
		//ComBtnEnable("btn_complete_" + div, false, 1); 
		//ComBtnEnable("btn_equpdate_" + div, false, 1);
		ComBtnDisable("btn_complete_" + div); 
		ComBtnDisable("btn_equpdate_" + div);
	}
//	},1000);
//	doHideProcess();
}
/*
 * 아래로 아이콘
 */
function btn_Down(div) {
	var formObj=document.form;
	//sheet객체생성
	var sheetObjHeader, sheetObjDetail, fixGrdHeader, fixGrdDetail;
	if(div == fix_by_booking)
	{
		sheetObjHeader=docObjects[0];
		sheetObjDetail=docObjects[1];
		fixGrdHeader=fix_grid01;
		fixGrdDetail=fix_grid02;
	}
	else
	{
		sheetObjHeader=docObjects[2];
		sheetObjDetail=docObjects[3];
		fixGrdHeader=fix_grid03;
		fixGrdDetail=fix_grid04;
	}
	var checkedRows=sheetObjHeader.FindCheckedRow(fixGrdHeader + "chk");
	var arrayCheckedRows=checkedRows.split("|");
	var parameters="";
	if(checkedRows == 0){
		ComShowCodeMessage("COM0286");
		return;
	}
	for(var i=1; i<=sheetObjHeader.LastRow();i++){
		//숨겨진 Row를 Show 한다.
		sheetObjHeader.SetRowHidden(i,0);
	}
	//--복수개 선택시 warehouse가 동일한지 체크. 동일하지않을경우 error
	var wh_cd="";
	for(var m=0; m<=arrayCheckedRows.length-1; m++){
		if(m == 0) //처음건 저장
		{
			wh_cd=sheetObjHeader.GetCellValue(arrayCheckedRows[m], fixGrdHeader + "wh_cd");
		}
		else //처음건과 현재 행 비교
		{
			if (wh_cd != sheetObjHeader.GetCellValue(arrayCheckedRows[m], fixGrdHeader + "wh_cd"))
						{
							ComShowCodeMessage("COM0310", "Outbound");
							return;
						}
		}
	}
	//--key값 생성 div나눌것
	for(var i=0; i<=arrayCheckedRows.length-1; i++){
		var count=arrayCheckedRows[i];
		if(div == fix_by_booking)
		{
			var selectedBookingNumber=sheetObjHeader.GetCellValue(count,fixGrdHeader + "walc_no");
						parameters += "&walc_no=" + selectedBookingNumber;
		}
		else if(div == fix_by_loadplan)
		{
			var selectedBookingLpNo=sheetObjHeader.GetCellValue(count,fixGrdHeader + "lp_no");
						parameters += "&lp_no=" + selectedBookingLpNo;
		}
		//내려준 데이터를 숨김다.
		sheetObjHeader.SetRowHidden(count,1);
		sheetObjHeader.SetCellValue(count, fixGrdHeader + "chk",0);
	}
	//기본값 셋팅
	$("#" + div + "_outbound_dt").val(ComGetNowInfo());
	$("#" + div + "_load_hm_fr").val("00:00");
	$("#" + div + "_load_hm_to").val("00:00");
	$("#" + div + "_custms_ref_no").val("");
	$("#" + div + "_rmk").val("");
	$("#" + div + "_wh_cd_selected").val(wh_cd);
	$("#" + div + "_custms_ref_no").focus();
	var sXml="";
	switch(div)
	{
		case (fix_by_booking):
			
			sheetObjDetail.RemoveAll();
			sheetObjDetail.DoSearch("./WHOCMgmt_003GS.clt?f_cmd=102" + parameters);
			
			break;
		case (fix_by_loadplan):
			
			sheetObjDetail.RemoveAll();
			sheetObjDetail.DoSearch("./WHOCMgmt_004GS.clt?f_cmd=103" + parameters);
	}
	//save button enable
	//ComBtnEnable("btn_complete_" + div, true, 1); 
	//ComBtnEnable("btn_equpdate_" + div, true, 1);
	ComBtnEnable("btn_complete_" + div); 
	ComBtnEnable("btn_equpdate_" + div);
	sheet1.SetHeaderCheck(0, "Grd01chk", 0);
}
/*
 * 위로 아이콘
 */
function btn_Up(div) {
	var formObj=document.form;
	//sheet객체생성
	var sheetObjHeader, sheetObjDetail;
	if(div == fix_by_booking)
	{
		sheetObjHeader=docObjects[0];
		sheetObjDetail=docObjects[1];
	}
	else
	{
		sheetObjHeader=docObjects[2];
		sheetObjDetail=docObjects[3];
	}
	for(var i=1; i<=sheetObjHeader.LastRow();i++){
		//숨겨진 Row를 Show 한다.
		sheetObjHeader.SetRowHidden(i,0);
	}
	$("#" + div + "_outbound_dt").val("");
	$("#" + div + "_load_hm_fr").val("");
	$("#" + div + "_load_hm_to").val("");
	$("#" + div + "_custms_ref_no").val("");
	$("#" + div + "_rmk").val("");
	$("#" + div + "_wh_cd_selected").val("");
	sheetObjDetail.RemoveAll();
	//save button disabled
	//ComBtnEnable("btn_complete_" + div, false, 1); 
	//ComBtnEnable("btn_equpdate_" + div, false, 1);
	ComBtnDisable("btn_complete_" + div); 
	ComBtnDisable("btn_equpdate_" + div);
	//ComBtnDisable(btn);
}
/*
 * Complete
 */
function btn_Complete(div) {
	var formObj=document.form;
	
	//sheet객체생성
	var sheetObjHeader, sheetObjDetail, fixGrdHeader, fixGrdDetail;
	if(div == fix_by_booking)
	{
		sheetObjHeader=docObjects[0];
		sheetObjDetail=docObjects[1];
		fixGrdHeader=fix_grid01;
		fixGrdDetail=fix_grid02;
	}
	else
	{
		sheetObjHeader=docObjects[2];
		sheetObjDetail=docObjects[3];
		fixGrdHeader=fix_grid03;
		fixGrdDetail=fix_grid04;
	}	
	//--sheetobj2 또는 sheetobj4에 데이터가 없을경우
	if(sheetObjDetail.RowCount()<= 0)
	{
		ComShowCodeMessage("COM0185","");
		return;
	}
	//--validation check
	if (validateForm(formObj, 'complete_' + div) == false) 
	{
		return;
	}
	//--confirm
	doShowProcess();
	 setTimeout(function() {  
	//--compelte param생성
	var docinParamter=makeCompleteDocInParam(div);
	var sheetDatas1=sheetObjDetail.GetSaveString(1); //sheetObjs, bUrlEncode, allSave, col
	var isheetSaveParamters=docinParamter+"&"+sheetDatas1;
	//--load save
	var saveXml;
	switch(div)
	{
		case (fix_by_booking):
			/* TinLuong comment: not use 20160105
			 * var findcheck = sheet2.FindCheckedRow(fix_grid02 + 'chk',1);
 			if(findcheck == "" || findcheck == null || findcheck == -1){
 				ComShowCodeMessage('COM12189');
 			}else{
 				if(ComShowCodeConfirm("COM0063") == false){
 					return;
 				}*/
 				saveXml=sheetObjDetail.GetSearchData("./saveWHOCMgmtInfoByBooking.clt?f_cmd=7&" + isheetSaveParamters);
// 	 			sheetObjDetail.LoadSaveData(saveXml);
 			 
 	 			try {
 	 				var xmlDoc = $.parseXML(saveXml);
 	 				var $xml = $(xmlDoc);
 	 				var sel_wob_out_no = $xml.find( "sel_wob_out_no").text();
 	 				
 	 				if(sel_wob_out_no == "" || sel_wob_out_no == "undefined" || sel_wob_out_no == undefined){
 	 					return;
 	 				}else{
 	 					
 	 					ComShowCodeMessage("COM0415");
 	 					
 	 					var wh_cd=$("#" + div + "_wh_cd_selected").val();
 	 					btn_Search(div);
 	 					
 	 					var sel_wob_out_no_split=sel_wob_out_no.split(",");
 	 					if(sel_wob_out_no_split.length <= 1)
 	 					{
 	 						var wob_out_no=sel_wob_out_no_split[0];
 	 						var sUrl="./WHOCUpdate.clt?search_no=" + wob_out_no + "&search_tp=WOB_OUT_NO&search_div=" + div;
 	 						parent.mkNewFrame('Outbound Complete Update', sUrl);
 	 					}
 	 					else
 	 					{
 	 						var sUrl="./WHOCList.clt?search_no=" + sel_wob_out_no + "&wh_cd=" + wh_cd;
 	 						parent.mkNewFrame('Outbound Complete Search', sUrl);
 	 					}
 	 				}
 	 				
 	 			}catch(e) {
 	 				return;
 	 			}
 			//}
 	
			break;
		case (fix_by_loadplan):
			/* TinLuong comment: not use 20160105
			 * var findcheck = sheet4.FindCheckedRow(fix_grid04 + 'chk',1);
			if(findcheck == "" || findcheck == null || findcheck == -1){
				ComShowCodeMessage('COM12189');
			}else{
				if(ComShowCodeConfirm("COM0063") == false){
					return;
				}*/
				saveXml=sheetObjDetail.GetSaveData("./saveWHOCMgmtInfoByLoadPlan.clt?f_cmd=181&" + isheetSaveParamters);
	 			
				try {
					var xmlDoc = $.parseXML(saveXml);
					var $xml = $(xmlDoc);
					if($xml.find("rtncd").text() == "N"){
						ComShowMessage($xml.find("message").text())
					}else if($xml.find("res").text() == "1"){
						var sel_lp_no = $xml.find( "sel_lp_no").text();
						
						if(sel_lp_no == "" || sel_lp_no == "undefined" || sel_lp_no == undefined){
							return;
						}else{
							
							ComShowCodeMessage("COM0415");
							
							var wh_cd=$("#" + div + "_wh_cd_selected").val();
							btn_Search(div);
							
							var sel_lp_no_split=sel_lp_no.split(",");
							if(sel_lp_no_split.length <= 1)
							{
								var lp_no=sel_lp_no_split[0];
								var sUrl="./WHOCUpdate.clt?search_no="+lp_no + "&search_tp=LP_NO&search_div=" + div;
								parent.mkNewFrame('Outbound Complete Update', sUrl);
							}
							else
							{
								var sUrl="./WHOCList.clt?search_no=" + sel_lp_no + "&wh_cd=" + wh_cd;
								parent.mkNewFrame('Outbound Complete Search', sUrl);
							}
						}
					}
				}catch(e) {
					return;
				}
			//}
			
			break;
	}
	 },100);  doHideProcess(false);
}
/*
 * Complete 처리전 document 파라미터 생성
 */
function makeCompleteDocInParam(div)
{
	//공통(bk, lp)
//	var tl_wo_document_info_header="Docin";
	var tl_wo_document_info_header="";
	
	var formObj=document.form;
	
	var outbound_dt=tl_wo_document_info_header+"outbound_dt="+$("#" + div + "_outbound_dt").val();
	var load_hm_fr="&"+tl_wo_document_info_header+"load_hm_fr="+$("#" + div + "_load_hm_fr").val();
	var load_hm_to="&"+tl_wo_document_info_header+"load_hm_to="+$("#" + div + "_load_hm_to").val();
	var custms_ref_no="&"+tl_wo_document_info_header+"custms_ref_no="+$("#" + div + "_custms_ref_no").val();
	var rmk="&"+tl_wo_document_info_header+"rmk="+$("#" + div + "_rmk").val();
	var wh_cd="&"+tl_wo_document_info_header+"wh_cd="+$("#" + div + "_wh_cd_selected").val();
	var docinParamter=outbound_dt+load_hm_fr+load_hm_to+custms_ref_no+rmk+wh_cd;
	
	docinParamter += "&user_id=" + formObj.user_id.value + '&org_cd=' + formObj.org_cd.value
	
	return docinParamter;
}
/*
 * Container/Truck Update Popup
 */
function btn_EqUpdate(div)
{
	//sheet객체생성
	var sheetObj, fixGrd, h;
	var param="";
	if(div == fix_by_booking)
	{
		sheetObj=docObjects[1];
		fixGrd=fix_grid02;
		h=200;
	}
	else
	{
		sheetObj=docObjects[3];
		fixGrd=fix_grid04;
		h=200;
	}
	var checkedRows=sheetObj.FindCheckedRow(fixGrd + "chk");
	var arrayCheckedRows=checkedRows.split("|");
	if(checkedRows == 0){
		ComShowCodeMessage("COM0228");
		return;
	}
	//공통파라미터 생성
	for(var m=0; m<=arrayCheckedRows.length-1; m++){
		if(m == 0)
		{
		var eq_tpsz_cd=sheetObj.GetCellValue(arrayCheckedRows[m], fixGrd + "eq_tpsz_cd");
		var eq_no=sheetObj.GetCellValue(arrayCheckedRows[m], fixGrd + "eq_no");
		var eq_tp_cd=sheetObj.GetCellValue(arrayCheckedRows[m], fixGrd + "eq_tp_cd");
		var seal_no=sheetObj.GetCellValue(arrayCheckedRows[m], fixGrd + "seal_no");
		var gate_in_hm=sheetObj.GetCellValue(arrayCheckedRows[m], fixGrd + "gate_in_hm");
		var gate_out_hm=sheetObj.GetCellValue(arrayCheckedRows[m], fixGrd + "gate_out_hm");
			param="&eq_tpsz_cd=" + eq_tpsz_cd + "&eq_no=" + eq_no + "&eq_tp_cd=" + eq_tp_cd + "&seal_no=" + seal_no + "&gate_in_hm=" + gate_in_hm + "&gate_out_hm=" + gate_out_hm;
			//load plan일경우 lp_no 파라미터로 추가 생성
			if(div == fix_by_loadplan)
			{
				var lp_no=sheetObj.GetCellValue(arrayCheckedRows[m], fixGrd + "lp_no");
					param=param + "&lp_no=" + lp_no;
			}
		}
	}
	
	callBackFunc = "setEqUpdate";
    modal_center_open('./WHOCEQUpdatePopup.clt?div=' + div + param, rtnary, 800,h,"yes");
}
/*
 * Container/Truck Update Popup callback
 */
function setEqUpdate(div, eq_tpsz_cd, eq_tpsz_nm, eq_tp_cd, eq_no, seal_no, gate_in_hm, gate_out_hm)
{
	if(div != undefined){
		if(div == fix_by_booking)
		{
			sheetObj=docObjects[1];
			fix_grid=fix_grid02;
		}
		else
		{
			sheetObj=docObjects[3];
			fix_grid=fix_grid04;
		}
		//체크된 checkbox 확인
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
			if(sheetObj.GetCellValue(i, fix_grid + "chk")  == 1) //체크된 건에만 바인딩
			{
				sheetObj.SetCellValue(i, fix_grid + "eq_tpsz_cd",eq_tpsz_cd,0);
				sheetObj.SetCellValue(i, fix_grid + "eq_tp_cd",eq_tp_cd,0);
				sheetObj.SetCellValue(i, fix_grid + "eq_no",eq_no,0);
				sheetObj.SetCellValue(i, fix_grid + "seal_no",seal_no,0);
				sheetObj.SetCellValue(i, fix_grid + "gate_in_hm",gate_in_hm,0);
				sheetObj.SetCellValue(i, fix_grid + "gate_out_hm",gate_out_hm,0);
			}
		}
	}
}
/*
 * Validation
 */
function validateForm(formObj, sAction) {
	with (formObj) {
		switch (sAction) {
		case 'search_bk': //by booking tab
			//booking no가 없는경우 warehouse는 필수로 입력되어야함.
//			if(ComIsEmpty(formObj.wob_bk_no) && ComIsEmpty(formObj.bk_wh_cd)) //&& ComIsEmpty(formObj.bk_ctrt_no))
//			{
//				ComShowCodeMessage("COM0114","Warehouse or Booking No");
//				$("#bk_wh_cd").focus();
//				return false;
//			}
			//booking no가 없는경우 Booking Date, Estimate Date 둘중하는 필수
			if(ComIsEmpty(formObj.wob_bk_no) && ComIsEmpty(formObj.bk_fm_bk_date) && ComIsEmpty(formObj.bk_to_bk_date) && ComIsEmpty(formObj.bk_fm_est_out_dt) && ComIsEmpty(formObj.bk_to_est_out_dt))
			{
				ComShowCodeMessage("COM0114","Booking Date or Estimate Date");
				$("#bk_fm_bk_date").focus();
				return false;
			}
			//날짜 포맷체크
			if(checkDate(formObj.bk_fm_bk_date, formObj.bk_to_bk_date, "Booking Date") == false)
			{
				return false;
			}
			if(checkDate(formObj.bk_fm_est_out_dt, formObj.bk_to_est_out_dt, "Estimate Date") == false)
			{
				return false;
			}
			if(formObj.bk_wh_cd.value == "")
			{
				ComShowCodeMessage("COM12233");
				return false;
			}
			break;
		case 'search_lp': //by load plan tab
			//search_lp_no가 없는경우 warehouse는 필수로 입력되어야함.
//			if(ComIsEmpty(formObj.lp_search_no) && ComIsEmpty(formObj.lp_wh_cd)) //&& ComIsEmpty(formObj.lp_ctrt_no))
//			{
//				ComShowCodeMessage("COM0114","Warehouse or Load Plan No or Console No or Booking No");
//				$("#lp_wh_cd").focus();
//				return false;
//			}
			//booking no, Load Plan No, Console No가 없는경우 Booking Date, Load Plan Date 둘중하는 필수
			if(ComIsEmpty(formObj.lp_search_no) && ComIsEmpty(formObj.lp_fm_bk_date) && ComIsEmpty(formObj.lp_to_bk_date) && ComIsEmpty(formObj.lp_fm_plan_dt) && ComIsEmpty(formObj.lp_to_plan_dt))
			{
				ComShowCodeMessage("COM0114","Booking Date or Load Plan Date");
				$("#lp_fm_bk_date").focus();
				return false;
			}
			//날짜 포맷체크
			if(checkDate(formObj.lp_fm_bk_date, formObj.lp_to_bk_date, "Booking Date") == false)
			{
				return false;
			}
			if(checkDate(formObj.lp_fm_plan_dt, formObj.lp_to_plan_dt, "Load Plan Date") == false)
			{
				return false;
			}
			if(formObj.lp_wh_cd.value == "")
			{
				ComShowCodeMessage("COM12233");
				return false;
			}
			break;
		case "complete_bk":
			if(checkCompleteCommon(fix_by_booking) == false)
			{
				return false;
			}
			break;
		case "complete_lp":
			if(checkCompleteCommon(fix_by_loadplan) == false)
			{
				return false;
			}
			//모든 ship수량이 0일경우 체크(LP_NO 별체크)
			var sheetObj=sheet4;
			var lp_no_str="";
			var lp_no_arr=new Array();
			var lp_no_sum=new Array();
			for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++)
			{
				var lp_no=sheetObj.GetCellValue(i, fix_grid04 + "lp_no");
				var ship_qty=eval(sheetObj.GetCellValue(i, fix_grid04 + "load_item_ea_qty"));
				//신규건이면 연결
				if((i == sheetObj.HeaderRows()) || (lp_no_str.indexOf(lp_no) == -1))
				{
					(i == sheetObj.HeaderRows())?lp_no_str=lp_no:lp_no_str=lp_no_str + "," + lp_no;
					lp_no_arr.push(lp_no);
					lp_no_sum.push(ship_qty);						
				}
				//기존건 존재시 기존 qty 증가
				else 
				{
					for(var m=0; m < lp_no_arr.length; m++)
					{
						if(lp_no_arr[m] == lp_no)
						{
							var ship_qty_sum=eval(lp_no_sum[m]) + ship_qty;
							lp_no_sum[m]=ship_qty_sum;
						}
					}
				}
			}
			//총ship 수량이 0인경우 체크.
			for(var m=0; m < lp_no_sum.length; m++)
			{
				if(lp_no_sum[m] <= 0)
				{
					ComShowCodeMessage("COM0355", lp_no_arr[m]); 
					return false;
				}
			}
			break;
		}
	}
	return true;
}

function mmddyyyyToyyyymmdd(sDate){
	 var sDt = sDate.replaceAll("-","");
	 
	 var sYear = sDt.substring(4);
	 var sMonth = sDt.substring(0,2);
	 var sDay = sDt.substring(2,4);
	 
	 return sYear + sMonth + sDay;
	}

function checkDate(from_date, to_date, msg)
{
	if(!ComIsEmpty(from_date) && ComIsEmpty(to_date)){
		to_date.value=ComGetNowInfo();
	}
	/* 3개월 duration 주석
	if (!ComIsEmpty(from_date) && getDaysBetween2(from_date.value, to_date.value)> 92) {
		ComShowCodeMessage("COM0141","3","(" + msg + ")");
		from_date.focus();
		return false;
	}
	*/
	if (!ComIsEmpty(from_date) && !isDate(from_date)) {
		ComShowCodeMessage("COM0114",msg);
		from_date.focus();
		return false;
	}
	if (!ComIsEmpty(to_date) && !isDate(to_date)) {
		ComShowCodeMessage("COM0114",msg);
		to_date.focus();
		return false;
	}
	if ((!ComIsEmpty(from_date)&&ComIsEmpty(to_date))||(ComIsEmpty(from_date)&&!ComIsEmpty(to_date))) {
		ComShowCodeMessage("COM0122",msg);
		from_date.focus();
		return false;
	}
	if (getDaysBetween2(from_date.value, to_date.value)<0) {
		ComShowCodeMessage("COM0122",msg);
		from_date.focus();
		return false;
	}
	return true;
}
function checkCompleteCommon(div)
{
	if(ComIsEmpty($("#" + div + "_outbound_dt").val().trim())){
		ComShowCodeMessage("COM0114","Complete Date");
		$("#" + div + "_outbound_dt").focus();
		return false;
	}
	if(ComGetLenByByte($("#" + div + "_custms_ref_no").val().trim()) > 30){
		ComShowCodeMessage("COM0215", "Customs Ref[30]");
		$("#" + div + "_custms_ref_no").focus();
		return false;
	}
	if(ComGetLenByByte($("#" + div + "_rmk").val().trim()) > 1000){
		ComShowCodeMessage("COM0215", "Remark[1000]]");
		$("#" + div + "_rmk").focus();
		return false;
	}
	//load plan일경우 cntr/tr no 필수체크
	if(div == fix_by_loadplan)
	{
		var sheetObj=sheet4;	
		for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
			if (sheetObj.GetCellValue(i, fix_grid04 +  "eq_no").trim() == "" )
			{
				ComShowCodeMessage("COM0114","CNTR/TR NO");
				sheetObj.SelectCell(i, fix_grid04 +  "eq_no");
				return false;
			}
		}
	}
	return true;
}
/**
 * 마우스 아웃일때 
 */
function form_deactivate() {
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=window.event.srcElement.getAttribute("value");
}
function obj_keydown() {
	var vKeyCode=event.keyCode;
	var srcName=ComGetEvent("name");
	if (vKeyCode == 13) {
		switch (srcName) {
			case "wob_bk_no":	//--booking no by booking
				btn_Search(fix_by_booking);
			break;	
			case "lp_search_no":	//--lp no 또는 consol_no by load plan
				btn_Search(fix_by_loadplan);
			break;	
		}
	}
	var backspace=8; 
    var t=document.activeElement;  
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == true){
        	return false;
        } 
    } 
	return true;
}
/***
 * AJAX CODE SEARCH
 */
/*
 * Warehouse search
 * OnKeyDown 13 or onChange
 */

var divTest;
function getLocInfo(obj){
	if(obj.value != ""){

		divTest = obj.name;
		ajaxSendPost(resultLocInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd=' + obj.value + "&type=WH", './GateServlet.gsl');
		
	}
	else
	{
		if(obj.name == "bk_wh_cd")
		{
			$("#bk_wh_nm").val("");
		}
		else if(obj.name == "lp_wh_cd")
		{
			$("#lp_wh_nm").val("");
		}
	}
}
function resultLocInfo(reqVal){
	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			
			if(divTest == "bk_wh_cd"){
				formObj.bk_wh_cd.value = rtnArr[1];
				formObj.bk_wh_nm.value = rtnArr[0];
			}else if(divTest == "lp_wh_cd"){
				formObj.lp_wh_cd.value = rtnArr[1];
				formObj.lp_wh_nm.value = rtnArr[0];
			}
		}
		else{
			if(divTest == "bk_wh_cd"){
				formObj.bk_wh_cd.value = "";
				formObj.bk_wh_nm.value = "";
			}else if(divTest == "lp_wh_cd"){
				formObj.lp_wh_cd.value="";
				formObj.lp_wh_nm.value="";
			}
		}
	}
}
/*
 * Consignee search
 * OnKeyDown 13 or onChange
 */
function getConsigneeInfo(obj){
	if(obj.value != ""){
		var formObj = document.form;
		s_type="trdpCode";
		divTest = obj.name;
		if (divTest == "bk_buyer_cd"){
			ajaxSendPost(resultConsigneeInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+formObj.bk_buyer_cd.value, './GateServlet.gsl');
		}else {
			ajaxSendPost(resultConsigneeInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+formObj.lp_buyer_cd.value, './GateServlet.gsl');
		}
		
	}
	else
	{
		if(obj.name == "bk_buyer_cd")
		{
			$("#bk_buyer_nm").val("");
		}
		else if(obj.name == "lp_buyer_cd")
		{
			$("#lp_buyer_nm").val("");
		}
	}
}
function resultConsigneeInfo(reqVal){
	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('@@^');
		if(rtnArr[0] != ""){
			
			if(divTest == "bk_buyer_cd"){
				formObj.bk_buyer_cd.value = rtnArr[0];
				formObj.bk_buyer_nm.value = rtnArr[3];
			}else if(divTest == "lp_buyer_cd"){
				formObj.lp_buyer_cd.value = rtnArr[0];
				formObj.lp_buyer_nm.value = rtnArr[3];
			}
		}
		else{
			if(divTest == "bk_buyer_cd"){
				formObj.bk_buyer_cd.value = "";
				formObj.bk_buyer_nm.value = "";
			}else if(divTest == "lp_buyer_cd"){
				formObj.lp_buyer_cd.value="";
				formObj.lp_buyer_nm.value="";
			}
		}
	}
	else 
		{
		if(divTest == "bk_buyer_cd"){
			formObj.bk_buyer_cd.value = "";
			formObj.bk_buyer_nm.value = "";
		}else if(divTest == "lp_buyer_cd"){
			formObj.lp_buyer_cd.value="";
			formObj.lp_buyer_nm.value="";
		}
		}
}
/*
 * Contract search
 * OnKeyDown 13 or onChange
 */
function getCtrtInfo(obj){
	var formObj = document.form;
	if(obj.value != ""){
		divTest = obj.name;
		if (divTest == "bk_ctrt_no"){
			ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+formObj.bk_ctrt_no.value, './GateServlet.gsl');
		}else {
			ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+formObj.lp_ctrt_no.value, './GateServlet.gsl');
		}
		
	}
	else
	{
		if(obj.name == "bk_ctrt_no")
		{
			$("#bk_ctrt_nm").val("");
		}
		else if(obj.name == "lp_ctrt_no")
		{
			$("#lp_ctrt_nm").val("");
		}
	}
}
function resultCtrtInfo(reqVal) {
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr=doc[1].split('^@');
		if(rtnArr[0] != ""){
			
			if(divTest == "bk_ctrt_no"){
				formObj.bk_ctrt_no.value = rtnArr[1];
				formObj.bk_ctrt_nm.value = rtnArr[0];
			}else if(divTest == "lp_ctrt_no"){
				formObj.lp_ctrt_no.value = rtnArr[1];
				formObj.lp_ctrt_nm.value = rtnArr[0];
			}
		}
		else{
			if(divTest == "bk_ctrt_no"){
				formObj.bk_ctrt_no.value = "";
				formObj.bk_ctrt_nm.value = "";
			}else if(divTest == "lp_ctrt_no"){
				formObj.lp_ctrt_no.value="";
				formObj.lp_ctrt_nm.value="";
			}
		}
	}
}
function mergeSheetSearchEnd(sheetObj, rowFirstData){
	if(sheetObj.RowCount() > 0){
		var compare, col_continue="", status ="", order_type="";
		var begin=0, end=0, flag = 0;
		var compare1=new Array();
		var compare2=new Array();
		var colRow = 9; // Merge 10 Rows First //sheetObj.ColCount; 
		for(var i = 1 ; i <= colRow ; i ++ ){ // Column
			for(var  k=0; k <= i ; k++){
				compare1[k] = sheetObj.GetCellValue(rowFirstData, k);
			}
			begin = rowFirstData;
			end = 0;
			for(var j = 2; j <= sheetObj.RowCount() + 1; j++){ // Row : Ignore 2 Rows Headers
				//var compare2=new Array();
				for(var  k=0; k <= i ; k++){
					compare2[k] = sheetObj.GetCellValue(j, k);
				}
				for (var c=0; c <compare1.length; c++){
					if(compare1[c] != compare2[c]){
						flag = 0;
						break;
					}
					flag = 1;
				}
				if (flag == 1){
					end = j;
				}else{
						if(begin > 0 && end > begin){
								sheetObj.SetMergeCell(begin, i, end - begin + 1, 1);
						}
						for(var  k=0; k <= i ; k++){
							compare1[k] = sheetObj.GetCellValue(j, k);
						}
						begin = j;
				}
			}
			if(begin > 0 && end > begin){
				sheetObj.SetMergeCell(begin, i, end - begin + 1, 1);
			}
		}
	}
}
function sheet1_OnChange(sheetObj, row, col, Value) {
	var colStr=sheetObj.ColSaveName(col);
	if (colStr == fix_grid01+"chk" ) 
	{
		checkBoxOnOff(sheetObj, colStr);
	}
}
function sheet2_OnSort(sheetObj, Col, SortArrow) {
	var row = sheet2.GetSelectRow();
	mergeSheetSearchEnd(sheetObj, 2);
	sheet2.SetSelectRow(row);
}
function sheet4_OnSort(sheetObj, Col, SortArrow) {
	var row = sheet2.GetSelectRow();
	mergeSheetSearchEnd(sheetObj, 2);
	sheet4.SetSelectRow(row);
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

function checkBoxOnOff(sheetObj, colName){
	 if (sheetObj.RowCount() > 0){
	  var findcheck = sheetObj.FindCheckedRow(colName,1);
	  if (findcheck == "" || findcheck == null || findcheck == -1)
	   sheetObj.SetHeaderCheck(0, colName, 0);
	  else{
	   var checksize = sheetObj.FindCheckedRow(colName,1).split("|").length;
	   if (checksize == sheetObj.RowCount())
	    sheetObj.SetHeaderCheck(0, colName, 1);
	   else sheetObj.SetHeaderCheck(0, colName, 0);
	   
	   var countCheckSizeDis = 0;
	   for(var i = sheetObj.HeaderRows(); i<=sheetObj.RowCount() + 1;i++){
		   if(sheetObj.GetCellEditable(i, colName) == 0){
			   countCheckSizeDis++;
		   }
	   }
	   if(countCheckSizeDis != 0){
		   if((sheetObj.RowCount() - countCheckSizeDis) == checksize)
		   {
			   sheetObj.SetHeaderCheck(0, colName, 1);
		   }
	   }
	  }
	 }else sheetObj.SetHeaderCheck(0,colName, 0);
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
		objStart.focus();
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

function sheet3_OnSearchEnd(){
	//doHideProgress();
	//ComOpenWait(false);
	var sheetObj=docObjects[2];//docObjects[0];
	for(var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow();i++){
		//BOOKING NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid03 + "wob_bk_no","#0100FF");
		//consol_no 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid03 + "consol_no","#0100FF");
		//CONTRACT NO 폰트색상 변경
 		sheetObj.SetCellFontColor(i, fix_grid03 + "ctrt_no","#0100FF");
	}
	//downSheet('lp', sheetObj, fix_grid03);
	if(loadpageflag==0)
	{
		downSheet('lp', sheetObj, fix_grid03);
		//setDefault(fix_by_booking);
		btn_show('lp','H');
		loadpageflag=1;
		if(document.form.req_search_div.value=="wave"){
			downSheet(fix_by_loadplan, sheet3, fix_grid03);
			if(sheet1.RowCount() > 0)
			{
				goTabSelect("01");
			}
			else if(sheet3.RowCount() > 0)
			{
				goTabSelect("02");
			}
			else
			{
				goTabSelect("01");
			}
		}
	}
}
/**
 * Check Authority Warehouse Code
 * @author tin.luong
 */
function check_authority_wh(div){
	var formObj = document.form;
	var sheetObj1 = sheet2;
	var sheetObj2 = sheet4;
	var countwd = 0;
	//List Warehouse from TB_SEQ
	var wh_list_ath = formObj.wh_list_ath.value;
	var arrwhcd =  wh_list_ath.split(',');
	//List warehouse default in User Entry Screen.
	var wh_cfg = formObj.wh_cfg.value;
	var arrwhcd_df =  wh_cfg.split(',');
	//Outbound Booking Complete
	if(div == fix_by_booking){
		//Warehosue selected.
		var warehouse = sheetObj1.GetCellValue(sheetObj1.GetSelectRow(), fix_grid02 + "wh_cd");
		
		for(var i = 0; i < arrwhcd_df.length; i ++){
			for(var j = 0; j < arrwhcd.length; j ++){
				if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
				countwd = countwd + 1;
				}
			}
		}
		if(countwd == 0){
			ComBtnDisable("btn_complete_bk");
			ComBtnDisable("btn_equpdate_bk");
		}else{
			ComBtnEnable("btn_complete_bk");
			ComBtnEnable("btn_equpdate_bk");
		}
	}
	//Load Plan Complete
	else{
		var warehouse = sheetObj2.GetCellValue(sheetObj2.GetSelectRow(), fix_grid04 + "wh_cd");
		
		for(var i = 0; i < arrwhcd_df.length; i ++){
			for(var j = 0; j < arrwhcd.length; j ++){
				if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
				countwd = countwd + 1;
				}
			}
		}
		if(countwd == 0){
			ComBtnDisable("btn_complete_lp");
			ComBtnDisable("btn_equpdate_lp");
		}else{
			ComBtnEnable("btn_complete_lp");
			ComBtnEnable("btn_equpdate_lp");
		}
	}
}
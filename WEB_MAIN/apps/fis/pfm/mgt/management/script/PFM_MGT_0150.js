/********************************************************
*@FileName   : PFM_MGT_0150.js
*@FileTitle  : Agent Performance Report
*@Description: Agent Performance Report
*@author     : SHIN DONG IL
*@version    : 1.0 - 02/15/2013
*@since      :
*@Change history:
********************************************************/
// 공통전역변수
var docObjects=new Array();
var sheetCnt=0;
var rdObjects=new Array();
var rdCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
    
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.s_ofc_cd);
    
    formObj.s_curr_cd.value=formObj.h_curr_cd.value;
    getObj('other_flg').style.display='none';
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	setRdInit(rdObjects[0]);
	//document.getElementById("mainRdTable").height=400;
}	
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
    	case "SEARCH":
    		if(formValidation()==true && controlDepartment()==true && controlSortBy()==true){
	    		var v_dptm_tp_opt="";
	    		var v_dptm_tp_ot_opt="";
				//Department parameter setting 
				if(formObj.s_dptm_cd[0].checked){
					v_dptm_tp_opt="'SO'";
				}else if(formObj.s_dptm_cd[1].checked){
					v_dptm_tp_opt="'AO'";
				}else if(formObj.s_dptm_cd[2].checked){
					v_dptm_tp_opt="'SI'";
				}else if(formObj.s_dptm_cd[3].checked){
					v_dptm_tp_opt="'AI'";
				}else if(formObj.s_dptm_cd[4].checked){
					v_dptm_tp_opt="'OT'";
				}
				if(v_dptm_tp_opt != ""){
					formObj.dptm_tp_opt.value=v_dptm_tp_opt;
					formObj.dptm_tp_ot_opt.value=v_dptm_tp_opt;
	   			}
    			//Sort By setting 
    			if(formObj.s_sort_tp_opt[0].checked == true){
    				formObj.sort_tp_opt.value="CB";
    			}else if(formObj.s_sort_tp_opt[1].checked == true){
    				formObj.sort_tp_opt.value="GW";
    			}else if(formObj.s_sort_tp_opt[2].checked == true){
    				formObj.sort_tp_opt.value="CW";
    			}else if(formObj.s_sort_tp_opt[3].checked == true){
    				formObj.sort_tp_opt.value="TU";
    			}else if(formObj.s_sort_tp_opt[4].checked == true){
    				formObj.sort_tp_opt.value="PF";
    			}
    			// Rank To setting
    			if(formObj.s_rank_cnt.value == "100"){
    				formObj.rank_cnt.value="TOP 100";
    			}else if(formObj.s_rank_cnt.value == "50"){
    				formObj.rank_cnt.value="TOP 50";
    			}else if(formObj.s_rank_cnt.value == "10"){
    				formObj.rank_cnt.value="TOP 10";
    			}
    			sheetObj.RemoveAll();
		    	formObj.f_cmd.value=SEARCH;
		    	sheetObj.DoSearch("PFM_MGT_0150GS.clt", FormQueryString(formObj) );
		    	formObj.rd_search_flg.value="Y";    			
		    	setRdInit(rdObjects[0]);
    		}
    	break;
    	case "TOP_CLEAR":
			clearForm();
	   	break;
    	case "EXCEL":
    		if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   		}
        break;
    	case "CLEAR":
    		checkBoxClear();
	   	break;
    	case "ALL":
			checkAll();
	   	break;
    }
}
/* 상당 Clear버튼
* 2012.02.15 
*/
function clearForm(){
	 var formObj=document.frm1;
	 var sheetObj=docObjects[0];
	 formObj.s_ofc_cd.value="";
	 formObj.s_prd_strdt.value="";
	 formObj.s_prd_enddt.value="";
	 formObj.s_curr_cd.value="";
	 formObj.s_rank_cnt.value="100";
	 formObj.s_oe_flg.checked=false;
	 formObj.s_ae_flg.checked=false;
	 formObj.s_oi_flg.checked=false;
	 formObj.s_ai_flg.checked=false;
	 formObj.s_ot_flg.checked=false;
	 formObj.s_sort_tp_opt[0].checked=true;
     sheetObj.RemoveAll();
}
/* Department checkBox All uncheck
 * 2012.02.15 
 */
function checkBoxClear(){
	 var formObj=document.frm1;
	 formObj.s_oe_flg.checked=false;
	 formObj.s_ae_flg.checked=false;
	 formObj.s_oi_flg.checked=false;
	 formObj.s_ai_flg.checked=false;
	 formObj.s_ot_flg.checked=false;
}
/* Department checkBox All check
 * 2012.02.15 
 */
function checkAll(){
	 var formObj=document.frm1;
	 formObj.s_oe_flg.checked=true;
	 formObj.s_ae_flg.checked=true;
	 formObj.s_oi_flg.checked=true;
	 formObj.s_ai_flg.checked=true;
	 formObj.s_ot_flg.checked=true;
}
//--------------------------------------------------------------------------------------------------------------
//Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
function goTabSelect(isNumSep) {
	var tabObjs=document.getElementsByName('tabLayer');
	var divRd = document.getElementById('mainRdTable');
	if( isNumSep == "01" ) {
		currTab=isNumSep;	//탭상태저장
		//tabObjs[0].style.display='inline';
		tabObjs[0].style.visibility='visible';
		divRd.style.width = '1000px';
		divRd.style.height = '500px';
		tabObjs[1].style.display='none';
	} else if( isNumSep == "02" ) {
		currTab=isNumSep;	//탭상태저장
		//tabObjs[0].style.display='none';
		tabObjs[0].style.visibility='hidden';
		divRd.style.width = 0;
		divRd.style.height = 0;
		tabObjs[1].style.display='inline';
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
            var headers = [ { Text:getLabel('PFM_MGT_0150_HDR1'), Align:"Center"} ];
            InitHeaders(headers, info);

            var cols = [ {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"rnk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"agnt_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"agnt_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Float",     Hidden:0,  Width:150,  Align:"Right",   ColMerge:1,   SaveName:"agnt_val",      KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"agnt_pcnt",     KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 } ];
             
            InitColumns(cols);

            SetEditable(1);
            SetSheetHeight(480);
            
           }                                                      
         break;
     }
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
	        var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.s_prd_strdt, formObj.s_prd_enddt, 'MM-dd-yyyy');
        break;
    }
}
/**
* Report Design 환경을 초기화한다.
*/
function setRdInit(objRd){
	var formObj=document.frm1;
	objRd.AutoAdjust=2;
	objRd.HideToolBar();
    objRd.ZoomRatio = 100;
	//objRd.SetSaveDialog("C:\\", "", "5");
//	objRd.SetSaveDialogEx("", "", "xls@doc@pdf@tif@bmp", "pdf");
	var rptFilePath = rpt_file_path;
	if(rptFilePath == "") {
		rptFilePath = "C:\\opus\\";
	} else if(rptFilePath.substring(rptFilePath.length,rptFilePath.length-1)!="\\") {
		rptFilePath = rptFilePath + "\\";
	}
    objRd.SetSaveDialogEx(rptFilePath, "", "xls@doc@pdf@tif@bmp", "pdf");
    //objRd.SetSaveDialogEx("C:\\opus\\", "", "xls@doc@pdf@tif@bmp", "pdf");
    objRd.ViewShowMode(2);
	objRd.SetBackgroundColor(255,255,255);
	objRd.SetPageLineColor(255,255,255);
	objRd.ApplyLicense("0.0.0.0");					//License Checking
	rdOpen(objRd, document.frm1);
}
function rdOpen(objRd, formObj) {
	var fileName="";
	var rdParam="";
	var v_rnk="";
	var v_dptm_tp_opt="";
	var v_sort_tp_opt="";
	var v_prd_strdt="";
	var v_prd_enddt="";
	var v_title="";
	if(formObj.rd_search_flg.value=="Y"){
		// Rank To setting
		if(formObj.s_rank_cnt.value == "100"){
			v_rnk="TOP 100";
		}else if(formObj.s_rank_cnt.value == "50"){
			v_rnk="TOP 50";
		}else if(formObj.s_rank_cnt.value == "10"){
			v_rnk="TOP 10";
		}
		rdParam="["+v_rnk+"]";  	//$1 RANK
		//Sort By setting 
		if(formObj.s_sort_tp_opt[0].checked == true){
			v_sort_tp_opt="CB";
			v_title="CBM";
			fileName="agent_performance_report.mrd";
		}else if(formObj.s_sort_tp_opt[1].checked == true){
			v_sort_tp_opt="GW";
			v_title="Gross Weight";
			fileName="agent_performance_report.mrd";
		}else if(formObj.s_sort_tp_opt[2].checked == true){
			v_sort_tp_opt="CW";
			v_title="Chargeable Weight";
			fileName="agent_performance_report.mrd";
		}else if(formObj.s_sort_tp_opt[3].checked == true){
			v_sort_tp_opt="TU";
			v_title="TEU";
			fileName="agent_performance_teu_report.mrd";
		}else if(formObj.s_sort_tp_opt[4].checked == true){
			v_sort_tp_opt="PF";
			v_title="Profit";
			fileName="agent_performance_profit_report.mrd";
		}
		rdParam += "["+v_sort_tp_opt+"]";			//$2 SORT BY
		//Office parameter setting 
		if(formObj.s_ofc_cd.value !=""){
			if(formObj.s_sort_tp_opt[4].checked == true){
				rdParam += "[AND MST.RGST_OFC_CD='"+formObj.s_ofc_cd.value+"']";	//$3 OFFICE
			}else{
				rdParam += "[AND BL.REF_OFC_CD='"+formObj.s_ofc_cd.value+"']";	//$3 OFFICE
			}
		}else{
			rdParam += "[]"; //$3 OFFICE
		}
		//Period parameter setting 
		if(formObj.s_prd_strdt.value !="" && formObj.s_prd_enddt.value !=""){
			 v_prd_strdt=(formObj.s_prd_strdt.value).substr(6,4)+(formObj.s_prd_strdt.value).substr(0,2)+ (formObj.s_prd_strdt.value).substr(3,2);
			 v_prd_enddt=(formObj.s_prd_enddt.value).substr(6,4)+(formObj.s_prd_enddt.value).substr(0,2)+ (formObj.s_prd_enddt.value).substr(3,2);
			 if(formObj.s_sort_tp_opt[4].checked == true){
				 rdParam += "[AND DTL.INV_POST_DT BETWEEN  '"+v_prd_strdt+"' AND '"+v_prd_enddt+"']";	//$4 PERIOD
			 }else{
				 rdParam += "[AND BL.POST_DT BETWEEN  '"+v_prd_strdt+"' AND '"+v_prd_enddt+"']";	//$4 PERIOD
			 }
		}else{
			rdParam += "[]"; //$4 PERIOD
		}
		//Department parameter setting 
		if(formObj.s_dptm_cd[0].checked){
			v_dptm_tp_opt="'SO'";
		}else if(formObj.s_dptm_cd[1].checked){
			v_dptm_tp_opt="'AO'";
		}else if(formObj.s_dptm_cd[2].checked){
			v_dptm_tp_opt="'SI'";
		}else if(formObj.s_dptm_cd[3].checked){
			v_dptm_tp_opt="'AI'";
		}else if(formObj.s_dptm_cd[4].checked){
			v_dptm_tp_opt="'OT'";
		}
		if(formObj.s_sort_tp_opt[4].checked == true){
			rdParam += "[AND (MST.AIR_SEA_CLSS_CD + MST.BND_CLSS_CD) IN  ("+v_dptm_tp_opt+")]";  		//$5 Department
		}else{
			rdParam += "[AND (BL.AIR_SEA_CLSS_CD + BND.BND_CLSS_CD) IN  ("+v_dptm_tp_opt+")]";  		//$5 Department
		}
		if(formObj.s_ot_flg.checked == true){
			rdParam += "[WHERE X.DPMT_CD IN ("+v_dptm_tp_opt+")]";  	//$6 Department OTHER INCLUDED
		}else{
			rdParam += "[]";	//$6 Department OTHER INCLUDED
		} 
		rdParam += "[PERFORMANCE OF "+v_rnk+" AGENT(Sort by "+v_title+")]";  	//$7 REPORT TITLE
		 // Currency parameter setting 
		 if(formObj.s_curr_cd.value != ""){
			 rdParam += "[AND DTL.INV_APLY_CURR_CD='"+formObj.s_curr_cd.value+"']";//$8 Currency
		 }else{
			 rdParam += "[]";
		 }
	    objRd.SetMessageboxShow(0); 
		objRd.FileOpen(RD_path+"letter/"+fileName, RDServer+'/rp '+rdParam + " /riprnmargin");
	} //end if(formObj.rd_search_flg.value=="Y")
}
//조회시 Validation 체크 
function formValidation(){
	var formObj=document.frm1;
	//주 조회조건이 없는 경우
	if(formObj.s_ofc_cd.value == "" &&	formObj.s_prd_strdt.value == "" && formObj.s_prd_enddt.value == "" && formObj.s_curr_cd.value == ""){
		alert(getLabel('PFM_COM_ALT011'));
		return false;
	}
  if(formObj.s_prd_strdt.value != "" && formObj.s_prd_enddt.value == ""){
	   alert(getLabel('PFM_COM_ALT011')+"(Period)");
	   formObj.s_prd_enddt.focus();
	   return false;
	}
  if(formObj.s_prd_strdt.value == "" && formObj.s_prd_enddt.value != ""){
	   alert(getLabel('PFM_COM_ALT011')+"(Period)");
	   formObj.s_prd_strdt.focus();
	   return false;
	}
	if(trim(formObj.s_prd_strdt.value)!= "" && trim(formObj.s_prd_enddt.value) != ""){
		if(getDaysBetweenFormat(formObj.s_prd_strdt,formObj.s_prd_enddt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033') + "\n\n: AIE_BMD_0070.1316");
			formObj.s_prd_enddt.focus();
			return false;
		}
	}
	// Department를 선택하지 않았을 경우
	if(   formObj.s_oe_flg.checked == false 
	   && formObj.s_ae_flg.checked == false
	   && formObj.s_oi_flg.checked == false
	   && formObj.s_ai_flg.checked == false
	   && formObj.s_ot_flg.checked == false){
		alert(getLabel('PFM_COM_ALT011')+"(Department)");
		return false;
	}
	//Sort By Profit일 경우 Currency는 필수
	if(formObj.s_sort_tp_opt[4].checked){
		if(formObj.s_curr_cd.value == ""){
			alert(getLabel('PFM_COM_ALT013'));
			return false;		
		}
	}
	return true;
}
//조회 후 페이지징 표시
function sheet_OnSearchEnd(){
	var sheetObj=docObjects[0];
	sheetObj.SetCellFont("FontBold", sheetObj.LastRow(),1,sheetObj.LastRow(),4,1);
} 
//Sheet Click시 
function sheet_OnClick(){
	var sheetObj=docObjects[0];
	if(sheetObj.RowCount()> 0){
		sheetObj.SetCellFont("FontBold", sheetObj.LastRow(),1,sheetObj.LastRow(),4,1);
	}
} 
//Department checkbox 선택시 화면 제어
function controlDepartment(){
	var formObj=document.frm1;
	if(formObj.s_dptm_cd[0].checked == true ||formObj.s_dptm_cd[2].checked == true || formObj.s_dptm_cd[4].checked == true ){	/** Ocean, Other **/
		if(formObj.s_sort_tp_opt[2].checked){
			alert(getLabel('PFM_COM_ALT012'));
			return false
		} 
	}else if(formObj.s_dptm_cd[1].checked == true ||formObj.s_dptm_cd[3].checked == true ){ /** Air **/
		if( formObj.s_sort_tp_opt[0].checked == true || formObj.s_sort_tp_opt[3].checked == true ){
			alert(getLabel('PFM_COM_ALT012'));
			return false;
		}
	}
	return true;
}
//Sort By Radio button 선택시 화면 제어
function controlSortBy(){
	var formObj=document.frm1;
	if(formObj.s_sort_tp_opt[0].checked){ 		/** CBM **/
		getObj('other_flg').style.display='none';
		if(formObj.s_dptm_cd[1].checked == true || formObj.s_dptm_cd[3].checked == true){
			alert(getLabel('PFM_COM_ALT014'));
			return false;	
		}
	}else if(formObj.s_sort_tp_opt[1].checked){ /** Gross Weight **/
		getObj('other_flg').style.display='none';
		//return false;
	}else if(formObj.s_sort_tp_opt[2].checked){ /** Chargeable Weight **/
		getObj('other_flg').style.display='none';
		if(formObj.s_dptm_cd[0].checked == true || formObj.s_dptm_cd[2].checked == true || formObj.s_dptm_cd[4].checked == true){
			alert(getLabel('PFM_COM_ALT014'));
			return false;	
		}
	}else if(formObj.s_sort_tp_opt[3].checked){ /** TEU(Only for Ocean FCL BL **/
		getObj('other_flg').style.display='none';
		if(formObj.s_dptm_cd[1].checked == true || formObj.s_dptm_cd[3].checked == true){
			alert(getLabel('PFM_COM_ALT014'));
			return false;	
		}
	}else if(formObj.s_sort_tp_opt[4].checked){ /** Profit **/
		getObj('other_flg').style.display='block';
		//return false;
	}
	return true;
}

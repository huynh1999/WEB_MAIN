/*=========================================================
*@FileName   : PFM_MGT_0170.jsp
*@FileTitle  : Total Volume & Profit by Month
*@Description: Total Volume & Profit by Month
*@author     : CyberLogitec
*@version    : 1.0 - 2013/04/11
*@since      : 2013/04/11
*@Change history:
=========================================================*/
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */

//#3593 [JTC]Profit Report & Performance Report 수정 사항
var GL_VIEW_FALG = "N";

function loadPage() {
    var formObj=document.frm1;
    
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.s_ofc_cd);
    
	//#3593 [JTC]Profit Report & Performance Report 수정 사항
	opt_key = "USE_LOCL_GL_VIEW_FALG";
	ajaxSendPost(setUseLoclGlViewFalg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");	    
	frm1.gl_view_falg.value = GL_VIEW_FALG; 
	
    var date="";
    var str_dt="";
    var year=0; 
    var month=0;
    
	for(var i=0;i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
	
    date=new Date(); 
    
    str_dt = new Date(date.getFullYear(),date.getMonth()-1,date.getDate()); 
    month = str_dt.getMonth()+1;
    year  = str_dt.getFullYear();
    
    if(month<10){month='0'+ (month);}
    
    formObj.s_as_of_dt.value=month + "-"+ year;
    formObj.s_curr_cd.value=formObj.f_curr_cd.value;
    
    initFinish();
    
    doWork('CURR_SEARCH');
    
    gridAction();
}
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
	var str_air_sea_clss_cd="";
    switch(srcName) {
	   case "DEFAULT":
		    frm1.f_cmd.value=-1;
	        formObj.submit();
	   break;
       case "SEARCH":
    	   // MgtMgmtBCImpl method : searchVolumeProfitByMonth 
    	   // SQL : PfmMgtSQL.xml > searchVolumeProfitByMonth
    	   if(validForm()){
    		   //Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
               if(currRateCheck(sheetObj)){
               	return;
               }
               //조회 옵션에 대한 Value 를 Setting
    		   setCheckBoxValue();
    		   
    		   //Batch Performance LKH 2015.01.28            
               createBatchPrf();
	    	   
    	   }
       break;
       case "BATCH_PRF_END_ACTION":
    	   // MgtMgmtBCImpl method : searchVolumeProfitByMonth 
    	   // SQL : PfmMgtSQL.xml > searchVolumeProfitByMonth
    	   if(validForm()){
    		   //Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
               if(currRateCheck(sheetObj)){
               	return;
               }
               //조회 옵션에 대한 Value 를 Setting
    		   setCheckBoxValue();
               
	    	   formObj.f_cmd.value=SEARCH; 
	    	   sheetObj2.DoSearch("./PFM_MGT_0170GS.clt", FormQueryString(formObj) );
    	   }
       break;
       case 'CLEAR':
    	   formObj.reset();
    	   initFinish();
    	   formObj.s_curr_cd.value=document.frm2.f2_curr_cd.value;

    	   //LHK, 20141029 #44986 [BINEX]Office - All Option
    	   setOfficeAllOption(formObj.s_ofc_cd);
    	    
    	   doWork('CURR_SEARCH');
       break;
       case 'EXCEL':
    	   if(sheetObj2.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj2.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj2), SheetDesign:1,Merge:1 });
	   		}
       break;
      case "CURR_SEARCH":
    	  formObj.f_cmd.value=SEARCHLIST01;
 	      if(formObj.s_prd_strdt.value !="" && formObj.s_prd_enddt.value!=""){
 	    	  if(getDaysBetween(formObj.s_prd_strdt, formObj.s_prd_enddt, "MM-dd-yyyy") < 0){
 	    		  alert(getLabel('PFM_COM_ALT010'));
 	    		  return;
	 	        }
 	        }
		  if(formObj.s_curr_cd.value == ""){
			  //Please, select the [To Currency]
		      alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_TCUR'));
		      return;
		  }
		  setCurrCheckBoxValue(); 
		  sheetObj.DoSearch("./PFM_MGT_0171GS.clt", FormQueryString(formObj) );
     break;
     case 'MINIMIZE':
    	 if(mainForm.style.display != "none") {
			getObj('mainForm').style.display="none";
			//sheetObj2.SetSheetHeight(560 );
			resizeSheet();
		} else {
			getObj('mainForm').style.display="";
			//sheetObj2.SetSheetHeight(400 );
			resizeSheet();
		}
      break;   
    }
}

//Batch Performance LKH 2015.01.28
function createBatchPrf(){
	var formObj=document.frm1;
	doShowProcess();
	ajaxSendPostAsync(setBatchPrf, 'reqVal', '&goWhere=aj&bcKey=setBatchPrf&f_usrId='+formObj.f_usrId.value, './GateServlet.gsl');	
}
//Batch Performance LKH 2015.01.28
function setBatchPrf(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	doHideProcess();
	if(doc[0]=='OK'){
		//alert('Success');
	}else{
		alert(getLabel('FMS_COM_ALT019'));
	}
	doWork('BATCH_PRF_END_ACTION');
	
}
function ajaxSendPostAsync(callback, param, data, url){
	sendRequest(callback, param, data, 'POST', url, true);
}	
//조회조건 Validation
function validForm(){
	var formObj=document.frm1;
	//Department 항목  validation check
	//WMS ACCOUNT LKH 2015.01.20
	if(formObj.s_dptm_oe_flg.checked == false 
	&& formObj.s_dptm_ae_flg.checked == false 
	&& formObj.s_dptm_oi_flg.checked == false 
	&& formObj.s_dptm_ai_flg.checked == false 
	&& formObj.s_dptm_ot_flg.checked == false
	&& formObj.s_dptm_wm_flg.checked == false){
		alert(getLabel('FMS_COM_ALT007')+ "\n - " + getLabel('ITM_DEPARTMEMT'));
		return false;
	}
	//As of 항목  nulll check
	if(trim(formObj.s_as_of_dt.value) ==""){
		alert(getLabel('FMS_COM_ALT001'));
		return false;
	}
	//Profit 항목  validation check
	//if(formObj.s_vat_flg.checked==false && formObj.s_tax_flg.checked==false ){
		//alert(getLabel('FMS_COM_ALT007')+"(Profit)");
		//return false;
	//}
	return true;
}
//DownExcel Validation
function validDownExcel(){
	var sheetObj2=docObjects[1];
	if(sheetObj2.RowCount()< 1){
		alert(getLabel('FMS_COM_ALT039'));
		return false;		
	}
	return true;
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
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
	    case 1:      //IBSheet2 init
		    with (sheetObj) {
            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:getLabel('PFM_MGT_0030_HDR1'), Align:"Center"} ];
            InitHeaders(headers, info);

            var cols = [ {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"aply_fm_dt",  KeyField:0,   CalcLogic:"",   Format:"Ym" },
                {Type:"Float",     Hidden:0,  Width:110,  Align:"Right",   ColMerge:1,   SaveName:"rate",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1 } ];
             
            InitColumns(cols);

            SetEditable(1);
            InitViewFormat(0, "aply_fm_dt", "MM\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
            SetSheetHeight(100);

	    } 
		break;
        case 2:      //IBSheet2 init
	         with (sheetObj) {
            var header1 = "Office|Department|Variation|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|Total|"
            +"Jan|Jan|Jan|Jan|Jan|Jan|Jan|Jan|Jan|Jan|Jan|Jan|Feb|Feb|Feb|Feb|Feb|Feb|Feb|Feb|Feb|Feb|Feb|Feb|Mar|Mar|Mar|Mar|Mar|Mar|Mar|Mar|Mar|Mar|Mar|Mar|"
            +"Apr|Apr|Apr|Apr|Apr|Apr|Apr|Apr|Apr|Apr|Apr|Apr|May|May|May|May|May|May|May|May|May|May|May|May|Jun|Jun|Jun|Jun|Jun|Jun|Jun|Jun|Jun|Jun|Jun|Jun|"
            +"Jul|Jul|Jul|Jul|Jul|Jul|Jul|Jul|Jul|Jul|Jul|Jul|Aug|Aug|Aug|Aug|Aug|Aug|Aug|Aug|Aug|Aug|Aug|Aug|Sep|Sep|Sep|Sep|Sep|Sep|Sep|Sep|Sep|Sep|Sep|Sep|"
            +"Oct|Oct|Oct|Oct|Oct|Oct|Oct|Oct|Oct|Oct|Oct|Oct|Nov|Nov|Nov|Nov|Nov|Nov|Nov|Nov|Nov|Nov|Nov|Nov|Dec|Dec|Dec|Dec|Dec|Dec|Dec|Dec|Dec|Dec|Dec|Dec";
            
            var header2 = "Office|Department|Variation|Volume|TEU|CNTR|G/WT|C/WT|Profit|AVG.Profit||||||"
            +"Volume|TEU|CNTR|G/WT|C/WT|Profit|AVG.Profit||||||Volume|TEU|CNTR|G/WT|C/WT|Profit|AVG.Profit||||||Volume|TEU|CNTR|G/WT|C/WT|Profit|AVG.Profit||||||"
            +"Volume|TEU|CNTR|G/WT|C/WT|Profit|AVG.Profit||||||Volume|TEU|CNTR|G/WT|C/WT|Profit|AVG.Profit||||||Volume|TEU|CNTR|G/WT|C/WT|Profit|AVG.Profit||||||"
            +"Volume|TEU|CNTR|G/WT|C/WT|Profit|AVG.Profit||||||Volume|TEU|CNTR|G/WT|C/WT|Profit|AVG.Profit||||||Volume|TEU|CNTR|G/WT|C/WT|Profit|AVG.Profit||||||"
            +"Volume|TEU|CNTR|G/WT|C/WT|Profit|AVG.Profit||||||Volume|TEU|CNTR|G/WT|C/WT|Profit|AVG.Profit||||||Volume|TEU|CNTR|G/WT|C/WT|Profit|AVG.Profit|||||";

            SetConfig( { SearchMode:2, MergeSheet:7, Page:100, DataRowMerge:0 } );
        	
            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text: header1, Align:"Center"},
                      { Text: header2, Align:"Center"} ];
            
            InitHeaders(headers, info);

            var cols = [ {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"ref_ofc_cd",   			KeyField:0,   CalcLogic:"",   									Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"dept_nm",     	 		KeyField:0,   CalcLogic:"",   									Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"shp_mod_cd",   			KeyField:0,   CalcLogic:"",   									Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         
                         {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"vol",          			KeyField:0,   CalcLogic:"Math.round(|vol|*100)/100",    		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"teu",          			KeyField:0,   CalcLogic:"Math.round(|teu|*100)/100",    		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"cntr_cnt",     			KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt",      			KeyField:0,   CalcLogic:"Math.round(|grs_wgt|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"chg_wgt",      			KeyField:0,   CalcLogic:"Math.round(|chg_wgt|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"profit",       			KeyField:0,   CalcLogic:"Math.round(|profit|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"prf_avg",      			KeyField:0,   CalcLogic:"",   									Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"tot_profit_amt",        KeyField:0,   CalcLogic:"Math.round(|tot_profit_amt|*100)/100", Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"tot_tgt_amt",           KeyField:0,   CalcLogic:"Math.round(|tot_tgt_amt|*100)/100",    Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"tot_ofc_incnt_pct",     KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"tot_opr_incnt_pct",     KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"tot_acctg_incnt_pct",   KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         
                         {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"vol_1",        			KeyField:0,   CalcLogic:"Math.round(|vol_1|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"teu_1",        			KeyField:0,   CalcLogic:"Math.round(|teu_1|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"cntr_cnt_1",   			KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt_1",    			KeyField:0,   CalcLogic:"Math.round(|grs_wgt_1|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"chg_wgt_1",    			KeyField:0,   CalcLogic:"Math.round(|chg_wgt_1|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"profit_1",     			KeyField:0,   CalcLogic:"Math.round(|profit_1|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"prf_avg_1",    			KeyField:0,   CalcLogic:"",   									Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"profit_amt_1",          KeyField:0,   CalcLogic:"Math.round(|profit_amt_1|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"tgt_amt_1",          	KeyField:0,   CalcLogic:"Math.round(|tgt_amt_1|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"ofc_incnt_pct_1",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"opr_incnt_pct_1",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"acctg_incnt_pct_1",  	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         
                         {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"vol_2",        			KeyField:0,   CalcLogic:"Math.round(|vol_2|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"teu_2",        			KeyField:0,   CalcLogic:"Math.round(|teu_2|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"cntr_cnt_2",   			KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt_2",    			KeyField:0,   CalcLogic:"Math.round(|grs_wgt_2|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"chg_wgt_2",    			KeyField:0,   CalcLogic:"Math.round(|chg_wgt_2|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"profit_2",     			KeyField:0,   CalcLogic:"Math.round(|profit_2|*100)/100",    	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"prf_avg_2",    			KeyField:0,   CalcLogic:"",   									Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"profit_amt_2",          KeyField:0,   CalcLogic:"Math.round(|profit_amt_2|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"tgt_amt_2",          	KeyField:0,   CalcLogic:"Math.round(|tgt_amt_2|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"ofc_incnt_pct_2",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"opr_incnt_pct_2",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"acctg_incnt_pct_2",  	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         
                         {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"vol_3",        			KeyField:0,   CalcLogic:"Math.round(|vol_3|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"teu_3",        			KeyField:0,   CalcLogic:"Math.round(|teu_3|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"cntr_cnt_3",   			KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt_3",    			KeyField:0,   CalcLogic:"Math.round(|grs_wgt_3|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"chg_wgt_3",    			KeyField:0,   CalcLogic:"Math.round(|chg_wgt_3|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"profit_3",     			KeyField:0,   CalcLogic:"Math.round(|profit_3|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"prf_avg_3",    			KeyField:0,   CalcLogic:"",   									Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"profit_amt_3",          KeyField:0,   CalcLogic:"Math.round(|profit_amt_3|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"tgt_amt_3",          	KeyField:0,   CalcLogic:"Math.round(|tgt_amt_3|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"ofc_incnt_pct_3",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"opr_incnt_pct_3",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"acctg_incnt_pct_3",  	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         
                         {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"vol_4",        			KeyField:0,   CalcLogic:"Math.round(|vol_4|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"teu_4",        			KeyField:0,   CalcLogic:"Math.round(|teu_4|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"cntr_cnt_4",   			KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt_4",    			KeyField:0,   CalcLogic:"Math.round(|grs_wgt_4|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"chg_wgt_4",    			KeyField:0,   CalcLogic:"Math.round(|chg_wgt_4|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"profit_4",     			KeyField:0,   CalcLogic:"Math.round(|profit_4|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"prf_avg_4",    			KeyField:0,   CalcLogic:"",   									Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"profit_amt_4",          KeyField:0,   CalcLogic:"Math.round(|profit_amt_4|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"tgt_amt_4",          	KeyField:0,   CalcLogic:"Math.round(|tgt_amt_4|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"ofc_incnt_pct_4",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"opr_incnt_pct_4",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"acctg_incnt_pct_4",  	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         
                         {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"vol_5",        			KeyField:0,   CalcLogic:"Math.round(|vol_5|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"teu_5",        			KeyField:0,   CalcLogic:"Math.round(|teu_5|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"cntr_cnt_5",   			KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt_5",    			KeyField:0,   CalcLogic:"Math.round(|grs_wgt_5|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"chg_wgt_5",    			KeyField:0,   CalcLogic:"Math.round(|chg_wgt_5|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"profit_5",     			KeyField:0,   CalcLogic:"Math.round(|profit_5|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"prf_avg_5",    			KeyField:0,   CalcLogic:"",   									Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"profit_amt_5",          KeyField:0,   CalcLogic:"Math.round(|profit_amt_5|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"tgt_amt_5",          	KeyField:0,   CalcLogic:"Math.round(|tgt_amt_5|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"ofc_incnt_pct_5",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"opr_incnt_pct_5",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"acctg_incnt_pct_5",  	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         
                         {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"vol_6",        			KeyField:0,   CalcLogic:"Math.round(|vol_6|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"teu_6",        			KeyField:0,   CalcLogic:"Math.round(|teu_6|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"cntr_cnt_6",   			KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt_6",    			KeyField:0,   CalcLogic:"Math.round(|grs_wgt_6|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"chg_wgt_6",    			KeyField:0,   CalcLogic:"Math.round(|chg_wgt_6|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"profit_6",     			KeyField:0,   CalcLogic:"Math.round(|profit_6|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"prf_avg_6",    			KeyField:0,   CalcLogic:"",   									Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"profit_amt_6",          KeyField:0,   CalcLogic:"Math.round(|profit_amt_6|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"tgt_amt_6",          	KeyField:0,   CalcLogic:"Math.round(|tgt_amt_6|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"ofc_incnt_pct_6",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"opr_incnt_pct_6",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"acctg_incnt_pct_6",  	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         
                         {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"vol_7",        			KeyField:0,   CalcLogic:"Math.round(|vol_7|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"teu_7",        			KeyField:0,   CalcLogic:"Math.round(|teu_7|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"cntr_cnt_7",   			KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt_7",    			KeyField:0,   CalcLogic:"Math.round(|grs_wgt_7|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"chg_wgt_7",    			KeyField:0,   CalcLogic:"Math.round(|chg_wgt_7|*100)/100",  	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"profit_7",     			KeyField:0,   CalcLogic:"Math.round(|profit_7|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"prf_avg_7",    			KeyField:0,   CalcLogic:"",   									Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"profit_amt_7",          KeyField:0,   CalcLogic:"Math.round(|profit_amt_7|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"tgt_amt_7",          	KeyField:0,   CalcLogic:"Math.round(|tgt_amt_7|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"ofc_incnt_pct_7",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"opr_incnt_pct_7",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"acctg_incnt_pct_7",  	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         
                         {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"vol_8",        			KeyField:0,   CalcLogic:"Math.round(|vol_8|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"teu_8",        			KeyField:0,   CalcLogic:"Math.round(|teu_8|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"cntr_cnt_8",   			KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt_8",    			KeyField:0,   CalcLogic:"Math.round(|grs_wgt_8|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"chg_wgt_8",    			KeyField:0,   CalcLogic:"Math.round(|chg_wgt_8|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"profit_8",     			KeyField:0,   CalcLogic:"Math.round(|profit_8|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"prf_avg_8",    			KeyField:0,   CalcLogic:"",   									Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"profit_amt_8",          KeyField:0,   CalcLogic:"Math.round(|profit_amt_8|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"tgt_amt_8",          	KeyField:0,   CalcLogic:"Math.round(|tgt_amt_8|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"ofc_incnt_pct_8",   	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"opr_incnt_pct_8",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"acctg_incnt_pct_8",  	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         
                         {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"vol_9",        			KeyField:0,   CalcLogic:"Math.round(|vol_9|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"teu_9",        			KeyField:0,   CalcLogic:"Math.round(|teu_9|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"cntr_cnt_9",   			KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt_9",    			KeyField:0,   CalcLogic:"Math.round(|grs_wgt_9|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"chg_wgt_9",    			KeyField:0,   CalcLogic:"Math.round(|chg_wgt_9|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"profit_9",     			KeyField:0,   CalcLogic:"Math.round(|profit_9|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"prf_avg_9",    			KeyField:0,   CalcLogic:"",   									Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"profit_amt_9",          KeyField:0,   CalcLogic:"Math.round(|profit_amt_9|*100)/100",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"tgt_amt_9",          	KeyField:0,   CalcLogic:"Math.round(|tgt_amt_9|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"ofc_incnt_pct_9",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"opr_incnt_pct_9",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"acctg_incnt_pct_9",  	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         
                         {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"vol_10",       			KeyField:0,   CalcLogic:"Math.round(|vol_10|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"teu_10",       			KeyField:0,   CalcLogic:"Math.round(|teu_10|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"cntr_cnt_10",  			KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt_10",   			KeyField:0,   CalcLogic:"Math.round(|grs_wgt_10|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"chg_wgt_10",   			KeyField:0,   CalcLogic:"Math.round(|chg_wgt_10|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"profit_10",    			KeyField:0,   CalcLogic:"Math.round(|profit_10|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"prf_avg_10",   			KeyField:0,   CalcLogic:"",   									Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"profit_amt_10",         KeyField:0,   CalcLogic:"Math.round(|profit_amt_10|*100)/100",  Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"tgt_amt_10",          	KeyField:0,   CalcLogic:"Math.round(|tgt_amt_10|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"ofc_incnt_pct_10",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"opr_incnt_pct_10",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"acctg_incnt_pct_10",  	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         
                         {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"vol_11",       			KeyField:0,   CalcLogic:"Math.round(|vol_11|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"teu_11",       			KeyField:0,   CalcLogic:"Math.round(|teu_11|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"cntr_cnt_11",  			KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt_11",   			KeyField:0,   CalcLogic:"Math.round(|grs_wgt_11|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"chg_wgt_11",   			KeyField:0,   CalcLogic:"Math.round(|chg_wgt_11|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"profit_11",    			KeyField:0,   CalcLogic:"Math.round(|profit_11|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"prf_avg_11",   			KeyField:0,   CalcLogic:"",   									Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"profit_amt_11",         KeyField:0,   CalcLogic:"Math.round(|profit_amt_11|*100)/100",  Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"tgt_amt_11",          	KeyField:0,   CalcLogic:"Math.round(|tgt_amt_11|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"ofc_incnt_pct_11",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"opr_incnt_pct_11",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"acctg_incnt_pct_11",  	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         
                         {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"vol_12",       			KeyField:0,   CalcLogic:"Math.round(|vol_12|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"teu_12",       			KeyField:0,   CalcLogic:"Math.round(|teu_12|*100)/100",   		Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"cntr_cnt_12",  			KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt_12",   			KeyField:0,   CalcLogic:"Math.round(|grs_wgt_12|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"chg_wgt_12",   			KeyField:0,   CalcLogic:"Math.round(|chg_wgt_12|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"profit_12",    			KeyField:0,   CalcLogic:"Math.round(|profit_12|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"prf_avg_12",   			KeyField:0,   CalcLogic:"",   									Format:"NullFloat",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"profit_amt_12",         KeyField:0,   CalcLogic:"Math.round(|profit_amt_12|*100)/100",  Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Float",     Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"tgt_amt_12",          	KeyField:0,   CalcLogic:"Math.round(|tgt_amt_12|*100)/100",   	Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",       Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"ofc_incnt_pct_12",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"opr_incnt_pct_12",    	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         {Type:"Int",     	Hidden:1,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"acctg_incnt_pct_12",  	KeyField:0,   CalcLogic:"",   									Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                         
                         {Type:"Text",      Hidden:1,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"grand_ttl",    			KeyField:0,   CalcLogic:"",   									Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
             
            InitColumns(cols);

            SetEditable(1);
            SetSheetHeight(400);
            resizeSheet();
            
            var sumColStr="";
        	var lastCol=160;
        	for(var i=3; i<lastCol; i++){
        		var strCol = i.toString();
        		sumColStr += strCol;
        		if(i != lastCol-1){
        			sumColStr += "|";
        		}		
        	}
        	
        	var sumIncntColStr = "tot_profit_amt|tot_tgt_amt|tot_ofc_incnt_pct|tot_opr_incnt_pct|tot_acctg_incnt_pct|";
        	
        	for(var i=1; i<13; i++){
        		sumIncntColStr += "profit_amt_"+i+"|tgt_amt_"+i+"|ofc_incnt_pct_"+i+"|opr_incnt_pct_"+i+"|acctg_incnt_pct_"+i+"|";
        	}
        	
        	sumIncntColStr = sumIncntColStr.substring(0,sumIncntColStr.length - 1);
        	
        	sheetObj.ShowSubSum([{StdCol:"grand_ttl", SumCols:sumColStr, Sort:false, ShowCumulate:false, CaptionCol:0, CaptionText:"GRAND Total"},
        	                     {StdCol:"ref_ofc_cd", SumCols:sumIncntColStr, Sort:false, ShowCumulate:false, CaptionCol:0, CaptionText:"Acc. Amount"},
        	                     {StdCol:"ref_ofc_cd", SumCols:sumIncntColStr, Sort:false, ShowCumulate:false, CaptionCol:0, CaptionText:"Opr. Amount"},
        	                     {StdCol:"ref_ofc_cd", SumCols:sumIncntColStr, Sort:false, ShowCumulate:false, CaptionCol:0, CaptionText:"Office Amount"},
        	                     {StdCol:"ref_ofc_cd", SumCols:sumIncntColStr, Sort:false, ShowCumulate:false, CaptionCol:0, CaptionText:"Incentive %"},
        	                     {StdCol:"ref_ofc_cd", SumCols:sumIncntColStr, Sort:false, ShowCumulate:false, CaptionCol:0, CaptionText:"Target Amount"},
        	                     {StdCol:"ref_ofc_cd", SumCols:sumColStr, Sort:false, ShowCumulate:false, CaptionCol:0, CaptionText:"%col Total"}]);
           
	        }      
	     break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[1]);
}

//조회 후 Logic
function sheet1_OnSearchEnd(){
} 

//조회 후 Logic
function sheet2_OnSearchEnd(){
	var sheetObj2=docObjects[1];
	
	var sRow=sheetObj2.FindSubSumRow();
	
    //가져온 행을 배열로 반든다.
    var arrRow=sRow.split("|");
    for (idx=0; idx<arrRow.length; idx++){
    	if( sheetObj2.GetCellValue(arrRow[idx], "tot_tgt_amt") > 0) {
    	
    		// Target Amount
			if( sheetObj2.GetCellValue(arrRow[idx],0).indexOf("Target") != -1  ){
	    		sheetObj2.SetCellText(arrRow[idx], "profit" ,sheetObj2.GetCellText(arrRow[idx], "tot_tgt_amt"));
	    		
	    		for(var i=1; i<13; i++){
	    			sheetObj2.SetCellText(arrRow[idx], "profit_" + i ,sheetObj2.GetCellText(arrRow[idx], "tgt_amt_" + i));
	    		}
	    	}
	    	
			// Incentive %
	    	if( sheetObj2.GetCellValue(arrRow[idx],0).indexOf("Incentive") != -1  ){
	    		sheetObj2.SetCellText(arrRow[idx], "profit" ,sheetObj2.GetCellText(arrRow[idx], "tot_ofc_incnt_pct"));
	    		
	    		for(var i=1; i<13; i++){
	    			sheetObj2.SetCellText(arrRow[idx], "profit_" + i ,sheetObj2.GetCellText(arrRow[idx], "ofc_incnt_pct_" + i));
	    		}
	    	}
	    	
	    	if( sheetObj2.GetCellValue(arrRow[idx],0).indexOf("Office") != -1 || sheetObj2.GetCellValue(arrRow[idx],0).indexOf("Opr") != -1 || sheetObj2.GetCellValue(arrRow[idx],0).indexOf("Acc") != -1){
	    		if (sheetObj2.GetCellValue(arrRow[idx], "tot_profit_amt") - sheetObj2.GetCellValue(arrRow[idx], "tot_tgt_amt") > 0) {
	    			if( sheetObj2.GetCellValue(arrRow[idx],0).indexOf("Office") != -1){
		    			sheetObj2.SetCellText(arrRow[idx], "profit", doMoneyFmt(Math.round((sheetObj2.GetCellValue(arrRow[idx], "tot_profit_amt") - sheetObj2.GetCellValue(arrRow[idx], "tot_tgt_amt")) * sheetObj2.GetCellValue(arrRow[idx], "tot_ofc_incnt_pct") * 0.01 * 100) / 100));
	    			} else if( sheetObj2.GetCellValue(arrRow[idx],0).indexOf("Opr") != -1){
	    				sheetObj2.SetCellText(arrRow[idx], "profit", doMoneyFmt(Math.round(sheetObj2.GetCellValue(arrRow[idx] - 1, "profit").replaceAll(",","") * sheetObj2.GetCellValue(arrRow[idx], "tot_opr_incnt_pct") * 0.01 * 100) / 100));
	    			} else if( sheetObj2.GetCellValue(arrRow[idx],0).indexOf("Acc") != -1){
	    				sheetObj2.SetCellText(arrRow[idx], "profit", doMoneyFmt(Math.round(sheetObj2.GetCellValue(arrRow[idx] - 2, "profit").replaceAll(",","") * sheetObj2.GetCellValue(arrRow[idx], "tot_acctg_incnt_pct") * 0.01 * 100) / 100));
	    			}
	    		} else {
	    			sheetObj2.SetCellText(arrRow[idx], "profit", 0);
	    		}
	    		
	    		for(var i=1; i<13; i++){
	    			if (sheetObj2.GetCellValue(arrRow[idx], "profit_amt_" + i) - sheetObj2.GetCellValue(arrRow[idx], "tgt_amt_" + i) > 0) {
	    				if( sheetObj2.GetCellValue(arrRow[idx],0).indexOf("Office") != -1){
	    					sheetObj2.SetCellText(arrRow[idx], "profit_" + i ,doMoneyFmt(Math.round((sheetObj2.GetCellValue(arrRow[idx], "profit_amt_" + i) - sheetObj2.GetCellValue(arrRow[idx], "tgt_amt_" + i)) * sheetObj2.GetCellValue(arrRow[idx], "ofc_incnt_pct_" + i) * 0.01 * 100) / 100));
		    			} else if( sheetObj2.GetCellValue(arrRow[idx],0).indexOf("Opr") != -1){
		    				sheetObj2.SetCellText(arrRow[idx], "profit_" + i ,doMoneyFmt(Math.round(sheetObj2.GetCellValue(arrRow[idx] - 1, "profit_" + i).replaceAll(",","") * sheetObj2.GetCellValue(arrRow[idx], "opr_incnt_pct_" + i) * 0.01 * 100) / 100));
		    			} else if( sheetObj2.GetCellValue(arrRow[idx],0).indexOf("Acc") != -1){
		    				sheetObj2.SetCellText(arrRow[idx], "profit_" + i ,doMoneyFmt(Math.round(sheetObj2.GetCellValue(arrRow[idx] - 2, "profit_" + i).replaceAll(",","") * sheetObj2.GetCellValue(arrRow[idx], "acctg_incnt_pct_" + i) * 0.01 * 100) / 100));
		    			}
	    			} else {
			    		sheetObj2.SetCellText(arrRow[idx], "profit_" + i ,0);
	    			}
	    		}
	    	}
        	sheetObj2.SetCellAlign(arrRow[idx], 0,"Center");
    	} else {
    		if (sheetObj2.GetCellValue(arrRow[idx],0).indexOf("Total") == -1){
    			sheetObj2.SetRowHidden(arrRow[idx],1);
    		}
    	}
    }	
    
    gridAction();
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal=new ComCalendar();
	        cal.setDisplayType("month");
	        cal.select(formObj.s_as_of_dt, 'MM-yyyy');
	        initFinish(formObj.s_as_of_dt.value);
        break;
    }
}
function getRadioVal(radioObj){
	var rtnStr="";
	for(var i=0; i<radioObj.length; i++){
	   if(radioObj[i].checked==true)
	   {
		   rtnStr=radioObj[i].value;
	   }
	}
	return rtnStr;
}
//Calendar flag value
var firCalFlag=false;
/**
 * 입력된 문자열이 일자 Format YYYYMM이 맞는지를 확인 - (/, -, .) 제거되고 비교
 * @param str   문자열
 * @return true 일자 , false
*/
function isValidMMYYYY ( obj ) {
   str=obj.value.replace(/\/|\-|\./g,"");
   if(trim(str).length==0){
	return;   
   }
   if (!isNumSlash(obj) && !isNumPeriod(obj) && !isNumDash(obj)) {
	   alert(getLabel('FMS_COM_ALT040'));
	   obj.value="";
       return;
   }
   if (str.length != 6) {
	   alert(getLabel('FMS_COM_ALT040'));
	   obj.value="";
       return;
   }
   var year=str.substring(2,6);
   var month=str.substring(0,2);
   if ( parseInt2( year ) >= 1900  && isMonth( month )){
	   obj.value=month+"-"+year;
       return;
   }else {
	   alert(getLabel('FMS_COM_ALT040'));
	   obj.value="";
       return;
   }
}
/**
* 화면로드 후 초기값 세팅
*/
function initFinish(str){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	var formObj=document.frm1;
    var date="";
    var year, month, day="";
    var s_prd_strdt, s_prd_enddt="";    
    
    date=new Date(); 
    s_prd_strdt = new Date(date.getFullYear(),date.getMonth()-1,1);
    
    if(str !="" && str != undefined){
    	str=removeDash(str);
    }
    if(str !="" && str != undefined){
    	year=str.substring(2,6);
    }else{
    	year=s_prd_strdt.getFullYear();
    }
    if(str !="" && str != undefined){
    	month=str.substring(0,2);
    }else{
    	month = s_prd_strdt.getMonth()+1;
    	if(month<10){month='0'+ (month);}
    }
    day = '01';  
    var s_prd_strdt1 = month +  day +  year;
    var s_prd_enddt1 = month +get_LastDay(year+''+month+''+day)+year;
   
    formObj.s_prd_strdt.value = s_prd_strdt1;
    formObj.s_prd_enddt.value = s_prd_enddt1;
}
/*
 * As of 항목의 입력 월에 따라  
 * 그리드를 활성화 비활서화 한다.
 * 
 * */
function gridAction(){
	var sheetObj2=docObjects[1];
    var formObj=document.frm1;
	
    var int_month=parseInt((formObj.s_as_of_dt.value).substring(0,2),10);
	
    sheetObj2.RenderSheet(0);
    
    if(int_month > 0 && int_month <= 12){
	    for(var i=1; i<=12; i++){
	    	
	    	if(int_month >= i){
    			sheetObj2.SetColHidden("vol_"+i,0);
	    		sheetObj2.SetColHidden("teu_"+i,0);
	    		sheetObj2.SetColHidden("cntr_cnt_"+i,0);
	    		sheetObj2.SetColHidden("grs_wgt_"+i,0);
	    		sheetObj2.SetColHidden("chg_wgt_"+i,0);
	    		sheetObj2.SetColHidden("profit_"+i,0);
	    		sheetObj2.SetColHidden("prf_avg_"+i,0);
	    	}else{
    			sheetObj2.SetColHidden("vol_"+i,1);
	    		sheetObj2.SetColHidden("teu_"+i,1);
	    		sheetObj2.SetColHidden("cntr_cnt_"+i,1);
	    		sheetObj2.SetColHidden("grs_wgt_"+i,1);
	    		sheetObj2.SetColHidden("chg_wgt_"+i,1);
	    		sheetObj2.SetColHidden("profit_"+i,1);
	    		sheetObj2.SetColHidden("prf_avg_"+i,1);
	    	}
	    }
    }
    
    if (int_month > 1) {
    	sheetObj2.SetColWidth("prf_avg_1", 80);
	}
    
    sheetObj2.RenderSheet(1);
}//end function

function setCurrCheckBoxValue(){
	var formObj = document.frm1;
	
	/*
	//Department : Ocean Export
	if(formObj.s_dptm_oe_flg.checked == true){
		str_air_sea_clss_cd +="SO"
	}else{
		str_air_sea_clss_cd +=""
	}
	
	str_air_sea_clss_cd +="','";
	
	//Department : Air Export
	if(formObj.s_dptm_ae_flg.checked == true){
		str_air_sea_clss_cd +="AO"		
	}else{
		str_air_sea_clss_cd +=""
	}
	
	str_air_sea_clss_cd +="','";
	
	//Department : Ocean Import
	if(formObj.s_dptm_oi_flg.checked == true){
		str_air_sea_clss_cd +="SI"
	}else{
		str_air_sea_clss_cd +=""
	}
	
	str_air_sea_clss_cd +="','";
	
	//Department : Air Import
	if(formObj.s_dptm_ai_flg.checked == true){
		str_air_sea_clss_cd +="AI"
	}else{
		str_air_sea_clss_cd +=""
	}
	
	str_air_sea_clss_cd +="','";
	
	//Department : Other
	if(formObj.s_dptm_ot_flg.checked == true){
		str_air_sea_clss_cd +="O"
		formObj.s_oth_flg.value = 'T';
	}else{
		str_air_sea_clss_cd +=""
		formObj.s_oth_flg.value = 'F';
	}
	
	str_air_sea_clss_cd +="'";
	
	//str_air_sea_clss_cd = str_air_sea_clss_cd.substring(0,str_air_sea_clss_cd.length-1);
	formObj.s_air_sea_clss_cd.value = str_air_sea_clss_cd;
	*/

	var s_air_sea_clss_cd = "";
	var s_bnd_clss_cd 	  = "";
	
	//WMS ACCOUNT LKH 2015.01.20
	var arr_dptm_flg = new Array(6);								//Department Option
	var cnt			 = 0;
	
	arr_dptm_flg[0] = formObj.s_dptm_oe_flg;
	arr_dptm_flg[1] = formObj.s_dptm_ae_flg;
	arr_dptm_flg[2] = formObj.s_dptm_oi_flg;
	arr_dptm_flg[3] = formObj.s_dptm_ai_flg;
	arr_dptm_flg[4] = formObj.s_dptm_ot_flg;
	//WMS ACCOUNT LKH 2015.01.20
	arr_dptm_flg[5] = formObj.s_dptm_wm_flg;
	
	for(var i = 0 ; i < arr_dptm_flg.length; i ++){
		   if(arr_dptm_flg[i].checked){
			   
			   s_air_sea_clss_cd	+= "'" + arr_dptm_flg[i].value.substring(0,1) + "', ";
			   s_bnd_clss_cd		+= "'" + arr_dptm_flg[i].value.substring(1) + "', ";

			   cnt++;
		   }
	} 
	
	if(cnt > 0){
		formObj.s_air_sea_clss_cd.value = s_air_sea_clss_cd.substring(0,s_air_sea_clss_cd.length-2);
		formObj.s_bnd_clss_cd.value = s_bnd_clss_cd.substring(0,s_bnd_clss_cd.length-2);
	}else{
		formObj.s_air_sea_clss_cd.value = "";
		formObj.s_bnd_clss_cd.value = "";
	}
	
	//WMS ACCOUNT LKH 2015.01.20
	//Department : fms
	if(formObj.s_dptm_oe_flg.checked == true || formObj.s_dptm_oi_flg.checked == true || formObj.s_dptm_ae_flg.checked == true || formObj.s_dptm_ai_flg.checked == true){
		formObj.s_fms_flg.value = 'T';
	}else{
		formObj.s_fms_flg.value = 'F';
	}
	
	//Department : Other
	if(formObj.s_dptm_ot_flg.checked == true){
		formObj.s_oth_flg.value = 'T';
	}else{
		formObj.s_oth_flg.value = 'F';
	}
	
	//WMS ACCOUNT LKH 2015.01.20
	if(formObj.s_dptm_wm_flg.checked == true){
		formObj.s_wms_flg.value = 'T';
	}else{
		formObj.s_wms_flg.value = 'F';
	}
	
	//Department : fms, Other
	if(formObj.s_fms_flg.value == "T" || formObj.s_oth_flg.value == "T"){
		formObj.s_fms_oth_flg.value = 'T';
	}else{
		formObj.s_fms_oth_flg.value = 'F';
	}
	//Department : uncheck
	if(formObj.s_fms_flg.value == "T" || formObj.s_oth_flg.value == "T" || formObj.s_wms_flg.value == "T"){
		formObj.s_uncheck_flg.value = 'F';
	}else{
		formObj.s_uncheck_flg.value = 'T';
	}

	if(formObj.s_tax_flg.checked){
		formObj.s_tax_flg.value	= "T";
	}
}
//CheckBox의 Check된 항목을 String으로 연결하여 조회조건으로 활용한다.
function setCheckBoxValue(){
	setCurrCheckBoxValue();
	var formObj=document.frm1;
	if(formObj.s_vat_flg.checked){
		formObj.s_vat_flg.value="T";
	} 
	formObj.one_curr_rate_sql.value=getRateQuery();
	var a_as_of_dt=formObj.s_as_of_dt.value.replaceAll("-", "");
	var sqlOpt="";
	var sqlOpt2="";
	var sqlOpt3="";
	
//	var int_month 	= parseInt(a_as_of_dt.substring(0,2),10);
	var period_yyyy=a_as_of_dt.substring(2,6);
	var period_mm="";
	//LHK , 초기 개발이 동적으로 구성되지 않았슴. 12개월 무조건 조회
	for(var i=1; i<13; i++){
		if(i<10){
			period_mm="0"+i;
		}else{
			period_mm=i;
		}
		sqlOpt += ",SUM(CASE WHEN bl.period_dt=" + period_yyyy + period_mm
				+ "          THEN bl.vol" 
				+ "          ELSE 0" 
				+ "     END)									AS vol_" + i + ";"
				+ ",SUM(CASE WHEN bl.period_dt=" + period_yyyy + period_mm
				+ "          THEN bl.teu" 
				+ "          ELSE 0" 
				+ "     END)									AS teu_" + i + ";"
				+ ",SUM(CASE WHEN bl.period_dt=" + period_yyyy + period_mm
				+ "          THEN bl.cntr_cnt" 
				+ "          ELSE 0" 
				+ "     END)									AS cntr_cnt_" + i + ";"
				+ ",SUM(CASE WHEN bl.period_dt=" + period_yyyy + period_mm
				+ "          THEN bl.grs_wgt" 
				+ "          ELSE 0" 
				+ "     END)									AS grs_wgt_" + i + ";"
				+ ",SUM(CASE WHEN bl.period_dt=" + period_yyyy + period_mm
				+ "          THEN bl.chg_wgt" 
				+ "          ELSE 0" 
				+ "     END)									AS chg_wgt_" + i + ";"
				+ ",SUM(CASE WHEN bl.period_dt=" + period_yyyy + period_mm
				+ "          THEN bl.profit_amt" 
				+ "          ELSE 0" 
				+ "     END)									AS profit_" + i + ";"
				+ ",CASE WHEN bl.shp_mod_cd = 'FCL' THEN SUM(CASE WHEN bl.period_dt=" + period_yyyy + period_mm + " AND bl.prf_vol != 0  "
				+ "          THEN bl.profit_amt / bl.prf_vol           						          "
				+ "          ELSE 0                                       "
				+ "     END) ELSE NULL END							AS prf_avg_" + i + ";";
		   
		sqlOpt2 += ",ISNULL(tgt_amt_" + i + ",0) as tgt_amt_" + i + ";"
				 + ",ISNULL(ofc_incnt_pct_" + i + ",0) as ofc_incnt_pct_" + i + ";"
				 + ",ISNULL(opr_incnt_pct_" + i + ",0) as opr_incnt_pct_" + i + ";"
				 + ",ISNULL(acctg_incnt_pct_" + i + ",0) as acctg_incnt_pct_" + i + ";";
		
		sqlOpt3 += ",SUM(CASE WHEN yrmon = " + period_yyyy + period_mm + " THEN tgt_amt ELSE 0 END) AS tgt_amt_" + i + ";"
				 + ",SUM(CASE WHEN yrmon = " + period_yyyy + period_mm + " THEN ofc_incnt_pct ELSE 0 END) AS ofc_incnt_pct_" + i + ";"
				 + ",SUM(CASE WHEN yrmon = " + period_yyyy + period_mm + " THEN opr_incnt_pct ELSE 0 END) AS opr_incnt_pct_" + i + ";"
				 + ",SUM(CASE WHEN yrmon = " + period_yyyy + period_mm + " THEN acctg_incnt_pct ELSE 0 END) AS acctg_incnt_pct_" + i + ";";
    }
	
	formObj.sqlOpt.value=sqlOpt;
	formObj.sqlOpt2.value=sqlOpt2;
	formObj.sqlOpt3.value=sqlOpt3;
}
function currRateCheck(sheetObj){
	var rtnVal=false;
	if(sheetObj.RowCount()> 0){
		for(var i=1; i<=sheetObj.LastRow();i++){
			if(sheetObj.GetCellValue(i, "rate") <= 0 ){
				sheetObj.SelectCell(i, "rate");
				rtnVal=true;
				alert(getLabel('PFM_COM_ALT018'));
				break;
			}
		}	
	}
	return rtnVal;
}
function getRateQuery(){
	var sheetObj=docObjects[0];
	var rateSQL="select  rate.curr_cd, rate.aply_fm_dt, rate.xch_rt_ut "
		+     "  from ( "
		;
	//ex)
	//select rate.curr_cd, rate.aply_fm_dt, rate.xch_rt_ut
	//from (
	//		select 'USD' as curr_cd, '201308' AS aply_fm_dt, 2 AS xch_rt_ut
	//      UNION
	//		select 'JPY' as curr_cd, '201308' AS aply_fm_dt, 2 AS xch_rt_ut
	//      ) rate
	if(sheetObj.RowCount()== 0){
		rateSQL += "         SELECT '" + '' + "' AS curr_cd, " 
								 + "'" + '' + "'  AS aply_fm_dt, "
								 + 0 + " AS xch_rt_ut ) rate ";
	}else{
		for(var i=1; i<=sheetObj.LastRow();i++){
			rateSQL += "         SELECT '" + sheetObj.GetCellValue(i, "curr_cd") + "' AS curr_cd, "
			+ "'" + sheetObj.GetCellValue(i, "aply_fm_dt") + "' AS aply_fm_dt, "
			+ sheetObj.GetCellValue(i, "rate") + " AS xch_rt_ut ";
	    	if(i < sheetObj.LastRow()){
	    		rateSQL += " UNION ";
	    	}else{
	    		rateSQL += "      ) rate ";
	    	}
		}	
	}
	return rateSQL;
}

//#3593 [JTC]Profit Report & Performance Report 수정 사항
function setUseLoclGlViewFalg(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		GL_VIEW_FALG=doc[1];
	} else {
		GL_VIEW_FALG="N";
	}	
}


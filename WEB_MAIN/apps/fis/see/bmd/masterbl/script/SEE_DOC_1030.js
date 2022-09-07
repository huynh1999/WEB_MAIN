//=========================================================
//*@FileName   : SEE_DOC_1030.jsp
//*@FileTitle  : LOAD PLAN
//*@Description: LOAD PLAN
//*@author     : Chungrue - Cyberlogitec
//*@version    : 1.0 - 2011/12/12
//*@since      : 2011/12/12
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/06/27
//*@since      : 2014/06/27
//=========================================================
var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
		    frm1.f_cmd.value=-1;
	        //formObj.submit();
	        submitForm(-1);
	   break;
	   case "SEARCH":
		   if(!searchVal()){
			   return;
		   }
           formObj.f_cmd.value=SEARCH;
           //formObj.submit();
           submitForm(SEARCH);
       break;
       case "SEARCHLIST":
            formObj.f_cmd.value=SEARCHLIST;
            sheetObj.DoSearch("./SEE_DOC_1030GS.clt", FormQueryString(formObj) );
       break;
       case "SEARCHLIST01":
           formObj.f_cmd.value=SEARCHLIST01;
           sheetObj2.DoSearch("./SEE_DOC_1030_1GS.clt", FormQueryString(formObj) );
      break;
       case "ROWADD":
       break;
       case 'PRINT':
        	formObj.file_name.value='container_load_plan_01.mrd';
        	formObj.title.value='CONTAINER LOAD PLAN';
			//Parameter Setting
        	var param='[' + formObj.f_intg_bl_seq.value + ']';	// [1]
        	param += '[' + formObj.f_cntr_no.value + ']';			// [2]
        	param += '[' + formObj.f_seal_no.value + ']';			// [3]
        	param += '[' + formObj.f_tpsz_no.value + ']';			// [4]
        	param += '[' + formObj.f_remark.value + ']';			// [5]
			param += '[' + formObj.f_usr_nm.value + ']';			// [6]
			param += '[' + formObj.f_ofc_locl_nm.value + ']';		// [7]
			formObj.rd_param.value=param;
			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   break;
    }
}

function submitForm(cmd){
	var formObj=document.frm1;
	doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./SEE_DOC_1030AJ.clt",
		   dataType: 'xml',
		   data: { f_cmd: cmd,  s_ref_no: formObj.s_ref_no.value,s_mbl_no:formObj.s_mbl_no.value },
		   success: function(data){
			   setFieldValue( formObj.f_intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.s_ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.s_mbl_no, $('mbl_no',data).text());
			   setFieldValue( formObj.f_bkg_no, $('bkg_no',data).text());
			   setFieldValue( formObj.f_ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.f_agent,  $('agent_addr',data).text()); // #3259 [CLC] Container Load Plan 에도 적용
			   setFieldValue( formObj.f_vsl_voy_nm, $('trnk_vsl_nm',data).text()); // #3259 [CLC] Container Load Plan 에도 적용
			   setFieldValue( formObj.f_vsl_voy, $('trnk_voy',data).text());
			   setFieldValue( formObj.f_pol, $('pol_nm',data).text());
			   setFieldValue( formObj.f_etd, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.f_eta, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.f_pod, $('pod_nm',data).text());
			   setFieldValue( formObj.f_f_dest, $('fnl_dest_loc_nm',data).text());
			   setFieldValue( formObj.f_carr_nm, $('carr_nm',data).text());  //#3259 [CLC] Container Load Plan 에도 적용
			   setFieldValue( formObj.f_warehouse, $('rcv_wh_nm',data).text()+'\n'+ $('rcv_wh_addr',data).text()+'\n'+ $('rcv_city_nm',data).text()+'  '+ $('rcv_state_nm',data).text());  //#3259 [CLC] Container Load Plan 에도 적용
			   
			   
			   doBtnAuthority(attr_extension);
			   loadPage();
			   setSelect();
			   
			  doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
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
var isRun = true;
function loadPage() {
    var formObj=document.frm1;
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
	if(formObj.s_ref_no.value != "" || formObj.s_mbl_no.value != ""){
		doWork("SEARCHLIST");
	}
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
             var headers = [ { Text:getLabel('SEE_DOC_1030_HDR1_1'), Align:"Center"},
                         { Text:getLabel('SEE_DOC_1030_HDR1_2'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"doc_recpt_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Int",       Hidden:0,  Width:110,   Align:"Right",   ColMerge:1,   SaveName:"pck_qty",          KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt1",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"meas",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:120,   Align:"Right",   ColMerge:1,   SaveName:"meas1",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:230,  Align:"Left",    ColMerge:1,   SaveName:"fnl_dest_loc_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:230,  Align:"Left",    ColMerge:1,   SaveName:"shpr_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"intg_bl_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 } ];
              
             	InitColumns(cols);
             	SetEditable(0);
                SetHeaderRowHeight(21);
                SetSheetHeight(200);
                resizeSheet();
           }                                                      
         break;
         case 2:      //IBSheet2 init
             with (sheetObj) {
	             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	             var headers = [ { Text:getLabel('SEE_DOC_1030_HDR2'), Align:"Center"} ];
	             InitHeaders(headers, info);
	
	             var cols = [ {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"cntr_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                    {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"seal_no1",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                    {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                    {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"cntr_list_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                    {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"cntr_intg_bl_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
	              
	             InitColumns(cols);
	             SetEditable(0);
	             SetVisible(false);
            }                                                      
            break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0],200);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var rowCnt=0;
	var qtyTot=0;
	var wgtTot=0;
	var wgtTot1=0;
	var measTot=0;
	var measTot1=0;
	for(var i=2; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(2,"intg_bl_seq") != "" && sheetObj.GetCellValue(2,"intg_bl_seq") != undefined){
			qtyTot   += Number(sheetObj.GetCellValue(i, "pck_qty"));
			wgtTot   += Number(sheetObj.GetCellValue(i, "grs_wgt"));
			wgtTot1  += Number(sheetObj.GetCellValue(i, "grs_wgt1"));
			measTot  += Number(sheetObj.GetCellValue(i, "meas"));
			measTot1 += Number(sheetObj.GetCellValue(i, "meas1"));
			rowCnt   += 1;
		}
	}
	formObj.f_total.value=rowCnt+" record[s]";
	formObj.f_qty_tot.value=doMoneyFmt(qtyTot);
	formObj.f_wgt_tot.value=doMoneyFmt(roundXL(wgtTot,2));
	formObj.f_wgt1_tot.value=doMoneyFmt(roundXL(wgtTot1,2));
	formObj.f_meas_tot.value=doMoneyFmt(roundXL(measTot,4));
	formObj.f_meas1_tot.value=doMoneyFmt(roundXL(measTot1,4));
	doWork("SEARCHLIST01");
} 
function sheet2_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj2=docObjects[1];
	var cntr_no="";
	var seal_no="";
	var cntr_sz="";
	var cntr_cnt=1;
	for(var i=1;i<=sheetObj2.LastRow();i++){
		if(sheetObj2.GetCellValue(i, "cntr_no") != "" && sheetObj2.GetCellValue(i, "cntr_no") != undefined){
			cntr_no += sheetObj2.GetCellValue(i, "cntr_no");
			if(cntr_cnt < sheetObj2.LastRow()){
				cntr_no += ","
			}
		}
		if(sheetObj2.GetCellValue(i, "seal_no1") != "" && sheetObj2.GetCellValue(i, "seal_no1") != undefined){
			seal_no += sheetObj2.GetCellValue(i, "seal_no1");
			if(cntr_cnt < sheetObj2.LastRow()){
				seal_no += ","
			}
		}
		if(sheetObj2.GetCellValue(i, "cntr_tpsz_cd") != "" && sheetObj2.GetCellValue(i, "cntr_tpsz_cd") != undefined){
			cntr_sz += sheetObj2.GetCellValue(i, "cntr_tpsz_cd");
			if(cntr_cnt < sheetObj2.LastRow()){
				cntr_sz += ","
			}
		}
		cntr_cnt += 1;
	}
	formObj.f_cntr_no.value=cntr_no;
	formObj.f_seal_no.value=seal_no;
	formObj.f_tpsz_no.value=cntr_sz;
}
function openPopUp(popName, curObj){
	var formObj=document.frm1;
	try {
		switch(popName) {
			case "MBL_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
	      		rtnary=new Array(1);
	   			rtnary[0]="S";
	   			rtnary[1]="O";
	        	callBackFunc = "MBL_POPLIST";
	        	modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
			break;
			case "REF_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
          		rtnary[0]="S";
	   			rtnary[1]="O";
   	        	callBackFunc = "REF_POPLIST";
   	        	modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
			break;
		}
	}catch(e) {
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

function MBL_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_mbl_no.value=rtnValAry[0];//house_bl_no
		formObj.s_ref_no.value="";
		if(formObj.s_mbl_no.value != ""){
			doWork('SEARCH');	
		}
	}
}

function REF_POPLIST(rtnVal){
	var formObj=document.frm1;
   	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_ref_no.value=rtnValAry[2];
		formObj.s_mbl_no.value="";
		if(formObj.s_ref_no.value != ""){
			doWork('SEARCH');	
		}
	}
}

//화면 클리어
function clearAll(){
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  collTxt[i].value="";
	  }           
	}
	frm1.f_remark.value="";
	frm1.f_agent.value="";      //#3259
	frm1.f_warehouse.value="";  //#3259
	sheetObj.RemoveAll();
}
//필수항목체크
function checkVal(){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	return true;
}
//필수항목체크
function searchVal(){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	formObj.s_ref_no.value=trim(formObj.s_ref_no.value);
	formObj.s_mbl_no.value=trim(formObj.s_mbl_no.value);
	if(trim(formObj.s_ref_no.value) =="" && trim(formObj.s_mbl_no.value) ==""){
		alert(getLabel('FMS_COM_ALT014')); 
		formObj.s_ref_no.focus();
		return false;
	}
	return true;
}

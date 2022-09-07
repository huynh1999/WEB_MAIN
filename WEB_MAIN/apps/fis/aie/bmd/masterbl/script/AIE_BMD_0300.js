/*=========================================================
*@FileName   : AIE_BMD_0300.jsp
*@FileTitle  : Air Quotation 등록
*@Description: Air Quotation 등록 및 조회
*@author     : You,Ji-Won
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
*@author     : Hoang.Pham
*@version    : 2.0 - 2014/12/25
*@since      : 2014/12/25
=========================================================*/
var chgListSheet=false;
var othChgListSheet=false;
var dimListSheet=false;
var show_delete_complete = "N"; //삭제 시 complete 여부 전역변수

//저장할 데이터를 각 목록에서 가지고 온다
function getSndParam(){
	var chgListParam=docObjects[1].GetSaveString(false);
	var othChgListParam=docObjects[2].GetSaveString(false);
	var dimListParam=docObjects[3].GetSaveString(false);
	
	var sheetParam='';
	
	if(chgListParam!=''){
	  	sheetParam+= '&';
	  	sheetParam+= chgListParam;
	  	chgListSheet=true;
	}
	if(othChgListParam!=''){
	  	sheetParam+= '&';
	  	sheetParam+= othChgListParam;
	  	othChgListSheet=true;
	}
	if(dimListParam!=''){
	  	sheetParam+= '&';
	  	sheetParam+= dimListParam;
	  	dimListSheet=true;
	}
    return sheetParam;
}

function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    try {
    	var formObj=document.frm1;
        switch(srcName) {
        	case "NEW":	//NEW
        		doShowProcess();
        		var currLocUrl=this.location.href;
				currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));

				//OFVFOUR-7701 [PQC][AI Quotation List] The system save data success at Entry screen but it doesn't show data on AI Quotation List
				var bnd_clss_cd = frm1.bnd_clss_cd.value;
				currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?bnd_clss_cd=' + bnd_clss_cd + '&callId=NEW['+(new Date()).getTime()+']';
				window.location.href = currLocUrl
				break;
				
        	case "ADD":	//등록
	        case "MODIFY":	//등록
	        	if(frm1.qttn_seq.value == ''){
	    			doWork('SAVE_ADD');
	    		}else{
	    			doWork('SAVE_MODIFY');
	    		}
	            break;
	            
        	case "SAVE_ADD":	//등록
        		frm1.f_cmd.value=ADD;
               	if(qttnCheckInpuVals()){
               		if(frm1.qttn_no.value == "AUTO"){
               			frm1.qttn_no.value="";
               		}
               		
               		if (frm1.size_ut_cd[0].checked == true){
    					frm1.size_ut_cd1.value = "CM";
    				}else{
    					frm1.size_ut_cd1.value = "INCH";
    				} 
               		
               		if(confirm(getLabel('FMS_COM_CFMSAV'))){
     	    		   gridAdd(0);
                 	   docObjects[0].SetCellValue(1,1,1);
                 	   var sndParam=getSndParam();
             		   if(sndParam == true)	{	return false;	}	 
                 	   doShowProcess();
                 	   docObjects[0].DoAllSave("./AIE_BMD_0300GS.clt", FormQueryString(frm1)+sndParam, false);
             	    }
               	}
               	break;
        		
        	case "SAVE_MODIFY":	//등록
        		frm1.f_cmd.value=MODIFY;
    			if(qttnCheckInpuVals()){
        		   if(frm1.qttn_no.value=="AUTO"){
              			frm1.qttn_no.value="";
        		   }
        		   
        		   if (frm1.size_ut_cd[0].checked == true){
        			   frm1.size_ut_cd1.value = "CM";
	   			   }else{
	   				   frm1.size_ut_cd1.value = "INCH";
	   			   } 
	        		   
        		   if(confirm(getLabel('FMS_COM_CFMSAV'))){
        			   gridAdd(0);
	            	   docObjects[0].SetCellValue(1,1,1);
	            	   frm1.f_qttn_no.value=frm1.qttn_no.value;
	            	   var sndParam=getSndParam();
	        		   if(sndParam == true)	{	return false;	}	 
	            	   doShowProcess();
	            	   docObjects[0].DoAllSave("./AIE_BMD_0300GS.clt", FormQueryString(frm1)+sndParam, false);
        		   }
                }
               break;
               
           case "REMOVE"://삭제
        	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
                   frm1.f_cmd.value=REMOVE;
                   show_delete_complete = "Y";
                   submitForm(REMOVE);
        	   }
    		   break;
    		   
           case "SEARCHLIST":	//조회
        	   frm1.f_qttn_no.value=trim(frm1.f_qttn_no.value);
        	   if(frm1.f_qttn_no.value==''){
        		   alert(getLabel('FMS_COM_ALT014'));
        		   frm1.f_qttn_no.focus();
        		   return;
        	   }else{
        		   if(frm1.f_qttn_no.value!=''){
        			   frm1.f_qttn_seq.value='';
        		   }
                   frm1.f_cmd.value=SEARCHLIST;
                   submitForm(SEARCHLIST);
        	   }
        	   break;
        	
           case "SEARCH_CHG":	// Charge 조회
        	   frm1.f_cmd.value=SEARCHLIST01;
        	   docObjects[1].DoSearch("./AIE_BMD_0300_1GS.clt", FormQueryString(frm1) );
        	   break;
        	   
           case "SEARCH_OTH_CHG":	// Other Charge 조회
        	   frm1.f_cmd.value=SEARCHLIST02;
        	   docObjects[2].DoSearch("./AIE_BMD_0300_2GS.clt", FormQueryString(frm1) );
        	   break;
        	   
           case "SEARCH_DIM":	// Dimension 조회
        	   frm1.f_cmd.value=SEARCHLIST03;
        	   docObjects[3].DoSearch("./AIE_BMD_0300_3GS.clt", FormQueryString(frm1) );
        	   break;
        	   
           case "CHG_ADD":
        	   var rowCnt=docObjects[1].LastRow() + 1;
	   		   var curRow=docObjects[1].DataInsert(rowCnt);
	   		   docObjects[1].SetCellValue(curRow,"qty",1);
        	   break;
       		
           case "OTH_CHG_ADD":
        	   var rowCnt=docObjects[2].LastRow() + 1;
	   		   docObjects[2].DataInsert(rowCnt);
        	   break;
        	   
           case "DIM_ADD":
        	   var rowCnt=docObjects[3].LastRow() + 1;
	   		   docObjects[3].DataInsert(rowCnt);
        	   break;
        	   
           case "PRINT":
        	   if(formObj.qttn_seq.value == ""){
        		   alert(getLabel('FMS_COM_ALT004'));
        		   return;
        	   }
        	   
        	   if (prn_ofc_cd == "WEBT"){
	   				formObj.file_name.value='QTTN_WEBT.mrd';
	   			} else {
	   				formObj.file_name.value='QTTN_CMM.mrd';
	   			}
				
	   			formObj.title.value='Quotation';
	   			
	   			// Parameter Setting
	   			var param='';
	   			param += '[' + formObj.qttn_seq.value + ']'; 	// $1
	   			param += '[' + v_ofc_eng_nm + ']'; 			 	// $2
	   			param += '[' + v_ofc_cd + ']'; 				 	// $3
	   			param += '[' + formObj.cust_addr.value + ']'; 	// $4
	   			
	   			if(formObj.show_ttl_amt_chk.checked){
	   				param += '[' + 'Y' + ']'; 					// $5
	   			}else{
	   				param += '[]'; 								// $5
	   			}
	   			
	   			formObj.rd_param.value=param;
	   			formObj.mailTitle.value = "QUOTATION [QUOTATION No. " + formObj.qttn_no.value + "]";
				popPOST(formObj, 'RPT_RD_0010.clt', 'popQttn', 1025, 740);			
				break;   
        	   
           case "CUST_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   	    rtnary=new Array(3);
		   	    rtnary[0]="";
//				rtnary[1]=formObj.cust_nm.value;
		   	    rtnary[1]="";
				rtnary[2]=window;
		   		
		   		callBackFunc = "CUST_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	        break;
	   	        
           case "CUST_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   	    rtnary=new Array(3);
		   	    rtnary[0]="";
				rtnary[1]=formObj.cust_nm.value;
				rtnary[2]=window;
		   		
		   		callBackFunc = "CUST_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	        break;
	   	        
          case "AGN_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(3);
				rtnary[0]="";
//				rtnary[1]=formObj.agn_nm.value;
				rtnary[1]="";
				rtnary[2]=window;
		   		
		   		callBackFunc = "AGN_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	        break;

          case "AGN_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]=formObj.agn_nm.value;
				rtnary[2]=window;
		   		
		   		callBackFunc = "AGN_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	        break;
	   	        
          case "COMMODITY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
        	  	rtnary=new Array(1);
		   		rtnary[0]="1";
		   		rtnary[1]="";
//		   		rtnary[2]=formObj.cmdt_nm.value;
		   		rtnary[2]="";
		   		callBackFunc = "COMMODITY_POPLIST";
				modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
	   	        break;

          case "COMMODITY_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
      	  	rtnary=new Array(1);
		   		rtnary[0]="1";
		   		rtnary[1]="";
		   		rtnary[2]=formObj.cmdt_nm.value;
		   		callBackFunc = "COMMODITY_POPLIST";
				modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
	   	        break;
	   	        
          case "STATE_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
        	  	rtnary=new Array(2);
		   		rtnary[0]="1";
		   		rtnary[1]="";
		   		callBackFunc = "STATE_POPLIST";
				modal_center_open('./CMM_POP_0310.clt', rtnary, 610,400,"yes");
	   	        break;
	   	        
          case "OPR_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
        	  	rtnary=new Array(1);
		   		rtnary[0]="1";
		   		
		   		callBackFunc = "OPR_POPLIST";
				modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
	   	        break;
        }
    }
    catch(e) {
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

function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_qttn_no.value = getParam(url,"f_qttn_no");
	formObj.f_qttn_seq.value = getParam(url,"f_qttn_seq");
	
	doWork('SEARCHLIST');
}

function setFieldValue(obj, value){
	if($(obj).is("select") || $(obj).is("input:radio") || $(obj).is("input:checkbox")){
		if(value != ""){
			$(obj).val(value);
		}
	}else {
		$(obj).val(value);
	}
}

function submitForm(cmd){
	var formObj=document.frm1;
	doShowProcess();
	formObj.f_cmd.value=cmd;
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	$.ajax({
		   type: "POST",
		   url: "./AIE_BMD_0300AJ.clt",
		   dataType: 'xml',
		   data: $(formObj).serialize(),
		   success: function(data){
			   setFieldValue( formObj.air_sea_clss_cd, $('air_sea_clss_cd',data).text());
			   setFieldValue( formObj.bnd_clss_cd, $('bnd_clss_cd',data).text());
			   setFieldValue( formObj.f_qttn_seq, $('f_qttn_seq',data).text());
			   setFieldValue( formObj.qttn_seq, $('qttn_seq',data).text());
			   setFieldValue( formObj.f_qttn_no, $('f_qttn_no',data).text());
			   setFieldValue( formObj.qttn_no, $('qttn_no',data).text());
			   setFieldValue( formObj.qttn_dt, $('qttn_dt',data).text());
			   setFieldValue( formObj.cust_cd, $('cust_cd',data).text());
			   setFieldValue( formObj.cust_nm, $('cust_nm',data).text());
			   setFieldValue( formObj.cust_addr, $('cust_addr',data).text());
			   //setFieldValue( formObj.cust_pic_nm, $('cust_pic_nm',data).text());
			   setFieldValue( formObj.agn_cd, $('agn_cd',data).text());
			   setFieldValue( formObj.agn_nm, $('agn_nm',data).text());
			   setFieldValue( formObj.inco_cd, $('inco_cd',data).text());
			   setFieldValue( formObj.h_inco_cd, $('inco_cd',data).text());
			   setFieldValue( formObj.vty_dt, $('vty_dt',data).text());
			   setFieldValue( formObj.cmdt_cd, $('cmdt_cd',data).text());
			   setFieldValue( formObj.cmdt_nm, $('cmdt_nm',data).text());
			   setFieldValue( formObj.pck_qty, $('pck_qty',data).text());
			   setFieldValue( formObj.pck_ut_cd, $('pck_ut_cd',data).text());
			   setFieldValue( formObj.h_pck_ut_cd, $('pck_ut_cd',data).text());
			   setFieldValue( formObj.grs_wgt_kg, $('grs_wgt_kg',data).text());
			   setFieldValue( formObj.grs_wgt_lbs, $('grs_wgt_lbs',data).text());
			   setFieldValue( formObj.chg_wgt_kg, $('chg_wgt_kg',data).text());
			   setFieldValue( formObj.chg_wgt_lbs, $('chg_wgt_lbs',data).text());
			   setFieldValue( formObj.meas_cbm, $('meas_cbm',data).text());
			   setFieldValue( formObj.meas_cft, $('meas_cft',data).text());
			   setFieldValue( formObj.por_cd, $('por_cd',data).text());
			   setFieldValue( formObj.por_nm, $('por_nm',data).text());
			   setFieldValue( formObj.pol_cd, $('pol_cd',data).text());
			   setFieldValue( formObj.pol_nm, $('pol_nm',data).text());
			   setFieldValue( formObj.pod_cd, $('pod_cd',data).text());
			   setFieldValue( formObj.pod_nm, $('pod_nm',data).text());
			   setFieldValue( formObj.del_cd, $('del_cd',data).text());
			   setFieldValue( formObj.del_nm, $('del_nm',data).text());
			   setFieldValue( formObj.fnl_dest_loc_cd, $('fnl_dest_loc_cd',data).text());
			   setFieldValue( formObj.fnl_dest_loc_nm, $('fnl_dest_loc_nm',data).text());
			   //setFieldValue( formObj.state_cd, $('state_cd',data).text());
			   //setFieldValue( formObj.state_nm, $('state_nm',data).text());
			   //setFieldValue( formObj.state_cnt_cd, $('state_cnt_cd',data).text());
			   setFieldValue( formObj.curr_cd, $('curr_cd',data).text());
			   setFieldValue( formObj.h_curr_cd, $('curr_cd',data).text());
			   setFieldValue( formObj.opr_usr_id, $('opr_usr_id',data).text());
			   //setFieldValue( formObj.bkg_no, $('bkg_no',data).text());
			   //setFieldValue( formObj.cust_ref_no, $('cust_ref_no',data).text());
/*			   [OFVFOUR-7716] [PQC][OE Quotation Entry] The system load missing data for Carrier and Mode/TT
			   Modified by Thinh Nguyen*/
			   setFieldValue( formObj.mode, $('mode',data).text());
			   setFieldValue( formObj.tt, $('tt',data).text());
			   setFieldValue( formObj.carr_nm, $('carr_nm',data).text());
			   setFieldValue( formObj.rate_qttn_txt, $('rate_qttn_txt',data).text());
			   setFieldValue( formObj.free_form_chk, $('free_form_chk',data).text());
			   setFieldValue( formObj.free_form_txt, $('free_form_txt',data).text());
			   setFieldValue( formObj.rmk, $('rmk',data).text());
			   setFieldValue( formObj.size_ut_cd1, $('size_ut_cd',data).text());
			   doBtnAuthority(attr_extension);
			   btnLoad();
			   loadPage();
			   loadData();
			   doHideProcess();
			   if(show_delete_complete == "Y"){
            	   showCompleteProcess();
            	   show_delete_complete = "N"
               }
		   },
		   error: function(){
			   doHideProcess();
			   alert("system error!");
		   }
		 });
}

function dispData(reqVal){
	alert(reqVal);
}

function sheet1_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	if(errMsg==''&&frm1.qttn_seq.value==''){
		frm1.f_qttn_seq.value=docObjects[0].GetCellValue(1, "sv_qttn_seq");
		frm1.qttn_seq.value=docObjects[0].GetCellValue(1, "sv_qttn_seq");
		frm1.f_qttn_no.value=docObjects[0].GetCellValue(1, "sv_qttn_no");
		frm1.qttn_no.value=docObjects[0].GetCellValue(1, "sv_qttn_no");
	}
	frm1.qttn_no.value=docObjects[0].GetCellValue(1, "sv_qttn_no");
	frm1.f_qttn_no.value=frm1.qttn_no.value;
	
	if(chgListSheet){
		doWork('SEARCH_CHG');
	}
	
	if(othChgListSheet){
		doWork('SEARCH_OTH_CHG');
	}
	
	if(dimListSheet){
		doWork('SEARCH_DIM');
	}

	//목록 Flag 초기화
	chgListSheet=false;
	othChgListSheet=false;
	dimListSheet=false;
	
	//버튼 초기화
	btnLoad();
	
	if(errMsg =='' ){
		showCompleteProcess();
	}
}

function sheet1_OnSearchEnd(errMsg){
	//버튼 초기화
	btnLoad();
	doHideProcess();
}

function gridAdd(objIdx){
	var intRows=docObjects[objIdx].LastRow() + 1;
	docObjects[objIdx].DataInsert(intRows);
}

/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,obj){
    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출      
	    	var cal=new ComCalendar();
            cal.select(obj, 'MM-dd-yyyy');
	    break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
var isRun = false;
function loadPage() {
	var formObj=document.frm1;
	// [#1188][AI Quotation Entry] Cannot auto suggestion when name inputted
	fnSetAutocompleteCallBack('cust_nm', 'CUST_POPLIST', 'LINER_POPLIST');
	fnSetAutocompleteCallBack('agn_nm', 'AGN_POPLIST', 'LINER_POPLIST');
	fnSetAutocompleteCallBack('por_nm', 'POR_LOCATION_POPLIST', 'LOCATION_POPLIST');
	fnSetAutocompleteCallBack('pol_nm', 'POL_LOCATION_POPLIST', 'LOCATION_POPLIST');
	fnSetAutocompleteCallBack('pod_nm', 'POD_LOCATION_POPLIST', 'LOCATION_POPLIST');
	fnSetAutocompleteCallBack('del_nm', 'DEL_LOCATION_POPLIST', 'LOCATION_POPLIST');
	fnSetAutocompleteCallBack('fnl_dest_loc_nm', 'DEST_LOCATION_POPLIST', 'LOCATION_POPLIST');
	
	for(var i=0;!isRun && i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
        if(i == docObjects.length - 1){
        	isRun = true;
        }
    }
    formObj.pck_qty.value=doMoneyFmt(Number(formObj.pck_qty.value).toFixed(0));
    formObj.grs_wgt_kg.value=doMoneyFmt(Number(formObj.grs_wgt_kg.value).toFixed(2));
    formObj.grs_wgt_lbs.value=doMoneyFmt(Number(formObj.grs_wgt_lbs.value).toFixed(2));
    formObj.chg_wgt_kg.value=doMoneyFmt(Number(formObj.chg_wgt_kg.value).toFixed(2));
    formObj.chg_wgt_lbs.value=doMoneyFmt(Number(formObj.chg_wgt_lbs.value).toFixed(2));
    formObj.meas_cbm.value=doMoneyFmt(Number(formObj.meas_cbm.value).toFixed(3));
    formObj.meas_cft.value=doMoneyFmt(Number(formObj.meas_cft.value).toFixed(0));
    
    if(formObj.qttn_seq.value==""){
    	formObj.qttn_no.value="AUTO";
    	
    	//office currency
    	if(ofc_curr_cd!=""){
    		formObj.curr_cd.value=ofc_curr_cd;
    	}
    }
    
	if(formObj.free_form_chk.value=="Y"){
		formObj.free_form_chk.checked=true;
		getObj("FREE_FORM_Y").style.display = 'inline';
		getObj("FREE_FORM_N").style.display = 'none';
	}else{
		formObj.free_form_chk.checked=false;
		getObj("FREE_FORM_Y").style.display = 'none';
		getObj("FREE_FORM_N").style.display = 'inline';
	}
	
	setSizeUtCd(frm1.size_ut_cd1.value);
}

/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
	switch(sheet_obj.id){
		case "sheet1":
			docObjects[0]=sheet_obj;
			break;
		case "sheet2":
			docObjects[1]=sheet_obj;
			break;
		case "sheet3":
			docObjects[2]=sheet_obj;
			break;	
		case "sheet4":
			docObjects[3]=sheet_obj;
			break;
	}
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
		case 1:     
		with (sheetObj) {
            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:"|Booking Seq.|Booking No.", Align:"Center"} ];
            InitHeaders(headers, info);

            var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
                         {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_qttn_seq" },
                         {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_qttn_no" } ];
             
            InitColumns(cols);
            SetEditable(1);
            SetVisible(0);
		}
        break;
        
		case 2:     // Charge
		with(sheetObj){
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('AIE_BMD_0300_HDR1'), Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",           	KeyField:0,   CalcLogic:"",   Format:"",     		PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"chg_ibflag" },
			             {Type:"Text",   	Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"qttn_seq" },
			             {Type:"Text",   	Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"qttn_chg_seq" },
			             {Type:"Text",      Hidden:0, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"chg_desc",   		KeyField:0,   CalcLogic:"",   Format:"Text", 		PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
        	             {Type:"Combo",     Hidden:0, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"unit",				KeyField:0,   CalcLogic:"",   Format:"", 			PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"AutoSum",   Hidden:0, Width:70,   Align:"Right",   ColMerge:0,   SaveName:"qty",				KeyField:0,   CalcLogic:"",   Format:"Float", 		PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
        	             {Type:"AutoSum",   Hidden:0, Width:120,  Align:"Right",   ColMerge:0,   SaveName:"chg_unit_amt",   	KeyField:0,   CalcLogic:"",   Format:"Float", 		PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
        	             {Type:"AutoSum",   Hidden:0, Width:120,  Align:"Right",   ColMerge:0,   SaveName:"chg_ttl_amt",   		KeyField:0,   CalcLogic:"",   Format:"Float",   	PointCount:2,   UpdateEdit:0,   InsertEdit:0 } ];
	       
			InitColumns(cols);
			SetEditable(1);
			SetColProperty(0 ,"chg_desc" , {InputCaseSensitive:1});
			SetColProperty('unit', {ComboText:UNITCD1, ComboCode:UNITCD2} );
			SetSheetHeight(200);
		}
		break;
		
		case 3:     // Other Charge
		with(sheetObj){
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('AIE_BMD_0300_HDR2'), Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",         	KeyField:0,   CalcLogic:"",   Format:"",     	PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"oth_chg_ibflag" },
			             {Type:"Text",   	Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"qttn_seq" },
			             {Type:"Text",    	Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"qttn_oth_chg_seq" },
			             {Type:"Text",      Hidden:0, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"oth_chg_desc",		KeyField:0,   CalcLogic:"",   Format:"Text", 	PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
			             {Type:"AutoSum", 	Hidden:0, Width:120,  Align:"Right",   ColMerge:0,   SaveName:"oth_chg_amt",		KeyField:0,   CalcLogic:"",   Format:"Float", 	PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 } ];
	       
			InitColumns(cols);
			SetEditable(1);
			SetColProperty(0 ,"oth_chg_desc" , {InputCaseSensitive:1});
			SetSheetHeight(200);
		}
		break;
		
		case 4:     //Calculate CBM
		with(sheetObj){
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('AIE_BMD_0300_HDR3'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:1,   SaveName:"del",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"dim_ibflag" },
	               {Type:"Int",       Hidden:0, Width:77,   Align:"Right",   ColMerge:1,   SaveName:"dim_len_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	               {Type:"Int",       Hidden:0, Width:77,   Align:"Right",   ColMerge:1,   SaveName:"dim_wdt_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	               {Type:"Int",       Hidden:0, Width:77,   Align:"Right",   ColMerge:1,   SaveName:"dim_hgt_dim",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	               {Type:"Int",       Hidden:0, Width:77,   Align:"Right",   ColMerge:1,   SaveName:"dim_pce_qty",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7  },
	               {Type:"Float",     Hidden:0, Width:77,   Align:"Right",   ColMerge:1,   SaveName:"dim_act_dim",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	               {Type:"Float",     Hidden:1, Width:52,   Align:"Right",   ColMerge:1,   SaveName:"dim_chg_wgt",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:8  },
	               {Type:"Float",     Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_chg_wgt1",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:8  },
	               {Type:"Float",     Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_meas",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	               {Type:"Float",     Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:"dim_meas1",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
	               {Type:"Text",      Hidden:1, Width:52,   Align:"Left",    ColMerge:1,   SaveName:"dim_pck_ut_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:40,   Align:"Right",   ColMerge:1,   SaveName:"dim_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	         
	        InitColumns(cols);
            SetEditable(1);
            SetSheetHeight(110);
        }
		break;
    }
}
var etdRangeOk=true;
/**
 *Booking&B/L 메인 화면의 입력값 확인
 */
function qttnCheckInpuVals(){
	var isOk=true;
	
	if(!checkInType(frm1.qttn_dt.value, "DD")){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + 'Quotation Date'); 
		isOk=false;
		frm1.qttn_dt.focus();
		return isOk; 
	}
	if(checkInputVal(frm1.qttn_dt.value, 10, 10, "DD", 'Quotation Date')!='O'){
		frm1.qttn_dt.focus();
		isOk=false;
		return isOk; 
	}
	
	// Charge List validation.
    var chgListParam=docObjects[1].GetSaveString(false);
	if(chgListParam!=''){
		if(chgListCheckInpuVals(docObjects[1])){
			isOk=false;
		}
	}
	
	// Other Charge List validation.
    var othChgListParam=docObjects[2].GetSaveString(false);
	if(othChgListParam!=''){
		if(othChgListCheckInpuVals(docObjects[2])){
			isOk=false;
		}
	}
	
	// Dimension List validation.
    var dimListParam=docObjects[3].GetSaveString(false);
	if(dimListParam!=''){
		if(dimListCheckInpuVals(docObjects[2])){
			isOk=false;
		}
	}
	
	return isOk;
}

/**
 * Charge List의 입력값 확인
 */
function chgListCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1;
	var isError=false; 
	/*for(var i=2; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'item_ibflag')=='U'||sheetObj.GetCellValue(i, 'item_ibflag')=='I'){
			if(sheetObj.GetCellValue(i, 'po_sys_no') == "") { 
				alert(getLabel('FMS_COM_ALT001'));
				sheetObj.SelectCell(i,"cust_po_no");
				isError=true;
				break;
			}
		}
	}*/
	return isError;
}

/**
 * Other Charge List의 입력값 확인
 */
function othChgListCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1;
	var isError=false; 
	/*for(var i=1; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'item_ibflag')=='U'||sheetObj.GetCellValue(i, 'item_ibflag')=='I'){
			if(sheetObj.GetCellValue(i, 'po_sys_no') == "") { 
				alert(getLabel('FMS_COM_ALT001'));
				sheetObj.SelectCell(i,"cust_po_no");
				isError=true;
				break;
			}
		}
	}*/
	return isError;
}

/**
 * Dimension List의 입력값 확인
 */
function dimListCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1;
	var isError=false; 
	/*for(var i=1; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'item_ibflag')=='U'||sheetObj.GetCellValue(i, 'item_ibflag')=='I'){
			if(sheetObj.GetCellValue(i, 'po_sys_no') == "") { 
				alert(getLabel('FMS_COM_ALT001'));
				sheetObj.SelectCell(i,"cust_po_no");
				isError=true;
				break;
			}
		}
	}*/
	return isError;
}

function pkgChange(obj) {
	var formObj=document.frm1;
	let objValue = formObj.pck_qty.value.replace(/[^0-9.]/g, "");
	if (isNaN(objValue)) {
		formObj.pck_qty.value = 0;
		return;
	}
	formObj.pck_qty.value = Math.trunc(Number(objValue)).toString();
	numberCommaLen(formObj.pck_qty,7,0);
}

function weightChange(obj){
	var formObj=document.frm1;
	if(obj.name=="grs_wgt_kg"){
		var objValue = formObj.grs_wgt_kg.value.replace(/[^0-9.]/g, "");
		if (isNaN(objValue)) {
			formObj.grs_wgt_kg.value = 0;
			return;
		}
		formObj.grs_wgt_kg.value = Number(objValue).toString();
		var rndXLValue=roundXL(formObj.grs_wgt_kg.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
		formObj.grs_wgt_lbs.value=rndXLValue;
		chkComma(formObj.grs_wgt_lbs, 8, 1);
		chkComma(formObj.grs_wgt_kg, 8, 1);
	}
	else if(obj.name=="grs_wgt_lbs"){
		var objValue = formObj.grs_wgt_lbs.value.replace(/[^0-9.]/g, "");
		if (isNaN(objValue)) {
			formObj.grs_wgt_lbs.value = 0;
			return;
		}
		formObj.grs_wgt_lbs.value = Number(objValue).toString();
		var rndXLValue=roundXL(formObj.grs_wgt_lbs.value.replaceAll(",","") / CNVT_CNST_KG_LB, 1);
		formObj.grs_wgt_kg.value=rndXLValue;
		chkComma(formObj.grs_wgt_kg, 8, 1);
		chkComma(formObj.grs_wgt_lbs, 8, 1);
	}
	else if(obj.name=="chg_wgt_kg"){
		var objValue = formObj.chg_wgt_kg.value.replace(/[^0-9.]/g, "");
		if (isNaN(objValue)) {
			formObj.chg_wgt_kg.value = 0;
			return;
		}
		formObj.chg_wgt_kg.value = Number(objValue).toString();
		var rndXLValue=roundXL(formObj.chg_wgt_kg.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
		formObj.chg_wgt_lbs.value=rndXLValue;
		chkComma(formObj.chg_wgt_lbs, 8, 1);
		chkComma(formObj.chg_wgt_kg, 8, 1);
	}
	else if(obj.name=="chg_wgt_lbs"){
		var objValue = formObj.chg_wgt_lbs.value.replace(/[^0-9.]/g, "");
		if (isNaN(objValue)) {
			formObj.chg_wgt_lbs.value = 0;
			return;
		}
		formObj.chg_wgt_lbs.value = Number(objValue).toString();
		var rndXLValue=roundXL(formObj.chg_wgt_lbs.value.replaceAll(",","") / CNVT_CNST_KG_LB, 1);
		formObj.chg_wgt_kg.value=rndXLValue;
		chkComma(formObj.chg_wgt_kg, 8, 1);
		chkComma(formObj.chg_wgt_lbs, 8, 1);
	}
}

function cbmChange(obj){
	var formObj=document.frm1;
	if(obj.name=="meas_cbm"){
		var objValue = formObj.meas_cbm.value.replace(/[^0-9.]/g, "");
		if (isNaN(objValue)) {
			formObj.meas_cbm.value = 0;
			return;
		}
		formObj.meas_cbm.value = Number(objValue).toString();
		var rndXLValue=roundXL(formObj.meas_cbm.value.replaceAll(",", "") * CNVT_CNST_CBM_CFT, 3);
		formObj.meas_cft.value=doMoneyFmt(Number(rndXLValue).toFixed(0));
		chkComma(formObj.meas_cft, 8, 3);
		chkComma(formObj.meas_cbm, 8, 3);
	}
	else if(obj.name=="meas_cft"){
		var objValue = formObj.meas_cft.value.replace(/[^0-9.]/g, "");
		if (isNaN(objValue)) {
			formObj.meas_cft.value = 0;
			return;
		}
		formObj.meas_cft.value = Number(objValue).toString();
		var rndXLValue=roundXL(formObj.meas_cft.value.replaceAll(",", "") / CNVT_CNST_CBM_CFT, 3);
		formObj.meas_cbm.value=rndXLValue;
		chkComma(formObj.meas_cbm, 8, 3);
		chkComma(formObj.meas_cft, 8, 3);
	}
}

function svcTermChange(){
	var formObj=document.frm1;
	formObj.to_svc_term_cd.value=formObj.fm_svc_term_cd.value;
}

//화면로드시 데이터 표시
function loadData(){
	if(frm1.qttn_seq.value!=""){
		frm1.inco_cd.value=frm1.h_inco_cd.value;
		frm1.curr_cd.value=frm1.h_curr_cd.value;
		frm1.pck_ut_cd.value=frm1.h_pck_ut_cd.value;
	}
	doWork('SEARCH_CHG');
	doWork('SEARCH_OTH_CHG');
	doWork('SEARCH_DIM');
}

function sheet2_OnSearchEnd(sheetObj, row, col) {
	sheet2.SetSumValue("chg_desc", "TOTAL");
	
	var sRow=sheetObj.FindSumRow();
	
    if(sRow != -1){
	    sheetObj.SetCellFont("FontBold", sRow, "chg_desc", sRow, "chg_ttl_amt",1);
    }
	
	sheetObj.SetBlur();
	
	if(frm1.qttn_seq.value==""){
		var chg_desc_list = CHG_DESC.split('|');
		if(chg_desc_list.length > 0){
			for(var i=0; i<chg_desc_list.length; i++){
				var curRow = sheetObj.DataInsert();
				sheetObj.SetCellValue(curRow, "chg_desc", chg_desc_list[i]);
				sheetObj.SetCellValue(curRow, "qty", 1);
			}
			sheetObj.SetSelectRow(1);
		}
	}
}

function sheet3_OnSearchEnd(sheetObj, row, col) {
	sheet3.SetSumValue("oth_chg_desc", "TOTAL");
	
	var sRow=sheetObj.FindSumRow();
	
    if(sRow != -1){
	    sheetObj.SetCellFont("FontBold", sRow, "oth_chg_amt", sRow, "oth_chg_amt",1);
    }
	
	sheetObj.SetBlur();
}

function sheet4_OnSearchEnd(sheetObj, row, col) {
	sheetObj.SetBlur();
}

function sheet2_OnChange(sheetObj, row, col, value){
	var formObj = document.frm1;
	switch (sheetObj.ColSaveName(col)) {
		case "qty" :
		case "chg_unit_amt" :
			if (value < 0) 
			{
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.SetCellValue(row, col,"",0);
				return;
			}
		break;
	}
	
	switch(sheetObj.ColSaveName(col)){
		case "unit" :
			if(sheetObj.GetCellValue(row, "unit")=='ACW'){
				sheetObj.SetCellValue(row, "qty", formObj.chg_wgt_kg.value);
			}else if(sheetObj.GetCellValue(row, "unit")=='AGW'){
				sheetObj.SetCellValue(row, "qty", formObj.grs_wgt_kg.value);
			}else if(sheetObj.GetCellValue(row, "unit")=='ACL'){
				sheetObj.SetCellValue(row, "qty", formObj.chg_wgt_lbs.value);
			}else if(sheetObj.GetCellValue(row, "unit")=='AGL'){
				sheetObj.SetCellValue(row, "qty", formObj.grs_wgt_lbs.value);
			}else{
				sheetObj.SetCellValue(row, "qty", '1');
			}
		break;
		
		case "qty":
		case "chg_unit_amt":
			sheetObj.SetCellValue(row, "chg_ttl_amt", (Number(sheetObj.GetCellValue(row, "qty")) * Number(sheetObj.GetCellValue(row, "chg_unit_amt"))),0);
		break;
	}
}

function sheet4_OnChange(sheetObj, row, col){
	
	var colName=sheetObj.ColSaveName(col);
	var formObj=document.frm1;
	
	if (colName=="dim_len_dim" || colName=="dim_wdt_dim" || colName=="dim_hgt_dim" || colName=="dim_pce_qty" || colName=="del" || colName=="dim_act_dim") {
		var formObj=document.frm1;
		var length=sheetObj.GetCellValue(row, "dim_len_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_len_dim");
		var width=sheetObj.GetCellValue(row, "dim_wdt_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_wdt_dim");
		var height=sheetObj.GetCellValue(row, "dim_hgt_dim")=="" ? 0 : sheetObj.GetCellValue(row, "dim_hgt_dim");
		var pcs=sheetObj.GetCellValue(row, "dim_pce_qty")=="" ? 0 : sheetObj.GetCellValue(row, "dim_pce_qty");
		
		var cbm=0;
		var sumCbm=0;
		var sumPcs=0;
		
		if (formObj.size_ut_cd[0].checked) {
			cbm=roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 3);
		} else if (formObj.size_ut_cd[1].checked) {
			cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 3);
		}
		
		// Validation for valid data
		if(cbm.toFixed(3) > 999999.999){
			ComShowCodeMessage('COM03230');
			if(colName=="dim_len_dim"){
				sheetObj.SetCellValue(row, "dim_len_dim", 0, 0);
			} else if (colName=="dim_wdt_dim"){
				sheetObj.SetCellValue(row, "dim_wdt_dim", 0, 0);
			} else if (colName=="dim_hgt_dim"){
				sheetObj.SetCellValue(row, "dim_hgt_dim", 0, 0);
			} else if (colName=="dim_pce_qty"){
				sheetObj.SetCellValue(row, "dim_pce_qty", 0, 0);
			}
			return;
		} else if (cbm < 0){
			ComShowCodeMessage('COM03233');
			if(colName=="dim_len_dim"){
				sheetObj.SetCellValue(row, "dim_len_dim", 0, 0);
			} else if (colName=="dim_wdt_dim"){
				sheetObj.SetCellValue(row, "dim_wdt_dim", 0, 0);
			} else if (colName=="dim_hgt_dim"){
				sheetObj.SetCellValue(row, "dim_hgt_dim", 0, 0);
			} else if (colName=="dim_pce_qty"){
				sheetObj.SetCellValue(row, "dim_pce_qty", 0, 0);
			}
			return;
		}
		
		if (colName !="dim_act_dim")
		{
			sheetObj.SetCellValue(row, "dim_act_dim",cbm.toFixed(3),0);
		}
		if (cbm.toFixed(3) > 999999) {
			alert(getLabel("FMS_COM_ALT002") + " - " + getLabel2("FMS_COM_ALT030", new Array("6")));
			sheetObj.SetCellValue(row, "dim_act_dim",0,0);
			return;
		}
		for(var i=1 ; i<sheetObj.LastRow() + 1 ; i++){
			if(sheetObj.GetCellValue(i, "del") == 0)
			{
				sumCbm += parseFloat(sheetObj.GetCellValue(i, "dim_act_dim"));
				sumPcs += parseFloat(sheetObj.GetCellValue(i, "dim_pce_qty"));
			}
		}
		
		//Validation for valid data
		var measCft = 0;
		measCft = sumCbm * CNVT_CNST_CBM_CFT
		if(sumCbm > 9999999999.999 || measCft > 9999999999.999){
			ComShowCodeMessage('COM03230');
			for(var i=1 ; i<sheetObj.LastRow() + 1 ; i++){
				sheetObj.SetCellValue(i, "dim_act_dim", 0, 0);
			}
			return;
		} else if(sumCbm < 0 || measCft < 0){
			ComShowCodeMessage('COM03233');
			for(var i=1 ; i<sheetObj.LastRow() + 1 ; i++){
				sheetObj.SetCellValue(i, "dim_act_dim", 0, 0);
			}
			return;
		}
		
		if(sumPcs > 99999999){
			ComShowCodeMessage('COM03230');
			for(var i=1 ; i<sheetObj.LastRow() + 1 ; i++){
				sheetObj.SetCellValue(i, "dim_pce_qty", 0, 0);
			}
			return;
		} else if(sumPcs < 0){
			ComShowCodeMessage('COM03233');
			for(var i=1 ; i<sheetObj.LastRow() + 1 ; i++){
				sheetObj.SetCellValue(i, "dim_pce_qty", 0, 0);
			}
			return;
		}
		
		formObj.meas_cbm.value=sumCbm.toFixed(3);
		cbmChange(formObj.meas_cbm);
		formObj.pck_qty.value=sumPcs.toFixed(0);
		numberCommaLen(formObj.pck_qty,8,0);

		chgWgtCal(sheetObj);
		weightChange(formObj.chg_wgt_kg);

	}
}

function freeFormViewChange(obj){
	if(obj.checked == true){
		obj.value="Y";
		getObj("FREE_FORM_Y").style.display = 'inline';
		getObj("FREE_FORM_N").style.display = 'none';
	}else{
		obj.value="N";
		getObj("FREE_FORM_Y").style.display = 'none';
		getObj("FREE_FORM_N").style.display = 'inline';
	}
}

var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp, air_sea_clss_cd){
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}		
	
	var s_type="";
	var s_air_sea_clss_cd="";
	
	if ( tmp == "onKeyDown" ) {
		if (event.keyCode == 13){
			CODETYPE=str;		
			if(str=="CUST" || str=="AGN"){
				s_type="trdpCode";
			}else if(str=="POR" || str=="POL" || str=="POD" || str=="DEL" || str=="DEST"){
				s_type="location";
				s_air_sea_clss_cd='&air_sea_clss_cd='+air_sea_clss_cd;
			}else if(str=="STATE"){
				s_type="state";
			}else if(str=="CMDT"){
				s_type="commodity";
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code+s_air_sea_clss_cd, './GateServlet.gsl');
		}
	} else if ( tmp == "onBlur" ) {
		CODETYPE=str;		
		if(str=="CUST" || str=="AGN"){
			s_type="trdpCode";
		}else if(str=="POR" || str=="POL" || str=="POD" || str=="DEL" || str=="DEST"){
			s_type="location";
			s_air_sea_clss_cd='&air_sea_clss_cd='+air_sea_clss_cd;
		}else if(str=="STATE"){
			s_type="state";
		}else if(str=="CMDT"){
			s_type="commodity";
		}
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code+s_air_sea_clss_cd, './GateServlet.gsl');
	}
	
	var formObj=document.frm1;
	
	if(s_code == ""){
		if(str=="CUST"){
			formObj.cust_cd.value = "";
			formObj.cust_nm.value = "";
		}else if(str=="AGN"){
			formObj.agn_cd.value = "";
			formObj.agn_nm.value = "";
		}else if(str=="CMDT"){
			formObj.cmdt_cd.value = "";
			formObj.cmdt_nm.value = "";
		}else if(str=="POR"){
			formObj.por_cd.value = "";
			formObj.por_nm.value = "";
		}else if(str=="POL"){
			formObj.pol_cd.value = "";
			formObj.pol_nm.value = "";
		}else if(str=="POD"){
			formObj.pod_cd.value = "";
			formObj.pod_nm.value = "";
		}else if(str=="DEL"){
			formObj.del_cd.value = "";
			formObj.del_nm.value = "";
		}else if(str=="DEST"){
			formObj.fnl_dest_loc_cd.value = "";
			formObj.fnl_dest_loc_nm.value = "";
		}
	}
}

//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var Vals=rtnArr[0].split('@@^');	
			
			if(CODETYPE == "CUST"){
				formObj.cust_cd.value=Vals[0]; 
				formObj.cust_nm.value=Vals[16];
				//formObj.cust_pic_nm.value=Vals[10];
				formObj.cust_addr.value=Vals[1];
				
			}else if(CODETYPE == "AGN"){
				formObj.agn_cd.value=Vals[0]; 
				formObj.agn_nm.value=Vals[16];
				
			}else if(CODETYPE == "POR"){
				formObj.por_cd.value=Vals[0];
				formObj.por_nm.value=Vals[3];
				
			}else if(CODETYPE == "POL"){
				formObj.pol_cd.value=Vals[0];
				formObj.pol_nm.value=Vals[3];
				
			}else if(CODETYPE == "POD"){
				formObj.pod_cd.value=Vals[0];
				formObj.pod_nm.value=Vals[3];
				
			}else if(CODETYPE == "DEL"){
				formObj.del_cd.value=Vals[0];
				formObj.del_nm.value=Vals[3];
				
			}else if(CODETYPE == "DEST"){
				formObj.fnl_dest_loc_cd.value=Vals[0];
				formObj.fnl_dest_loc_nm.value=Vals[3];
			
			/*}else if(CODETYPE == "STATE"){
				formObj.state_cd.value=Vals[0];
				formObj.state_nm.value=Vals[3];
				formObj.state_cnt_cd.value=Vals[2];*/
			
			}else if(CODETYPE == "CMDT"){
				formObj.cmdt_cd.value=Vals[0];
				formObj.cmdt_nm.value=Vals[3];
			}		
		}else{
			if(CODETYPE == "CUST"){
				formObj.cust_cd.value=""; 
				formObj.cust_nm.value=""; 
				//formObj.cust_pic_nm.value=""; 
				formObj.cust_addr.value=""; 
				
			}else if(CODETYPE == "AGN"){
				formObj.agn_cd.value=""; 
				formObj.agn_nm.value=""; 
				
			}else if(CODETYPE == "POR"){
				formObj.por_cd.value=""; 
				formObj.por_nm.value=""; 
				
			}else if(CODETYPE == "POL"){
				formObj.pol_cd.value=""; 
				formObj.pol_nm.value=""; 
				
			}else if(CODETYPE == "POD"){
				formObj.pod_cd.value=""; 
				formObj.pod_nm.value=""; 
				
			}else if(CODETYPE == "DEL"){
				formObj.del_cd.value=""; 
				formObj.del_nm.value=""; 
				
			}else if(CODETYPE == "DEST"){
				formObj.fnl_dest_loc_cd.value=""; 
				formObj.fnl_dest_loc_nm.value=""; 
			
			/*}else if(CODETYPE == "STATE"){
				formObj.state_cd.value=""; 
				formObj.state_nm.value=""; 
				formObj.state_cnt_cd.value="";*/
			
			}else if(CODETYPE == "CMDT"){
				formObj.cmdt_cd.value=""; 
				formObj.cmdt_nm.value=""; 
			}	
		}
	}else{
		//alert(getLabel('AIE_BMD_MSG43'));		
	}
}

function CUST_POPLIST(rtnVal){
	var formObj=document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.cust_cd.value=rtnValAry[0];
		formObj.cust_nm.value=rtnValAry[10];
		//formObj.cust_pic_nm.value=rtnValAry[3];
		formObj.cust_addr.value=rtnValAry[7];
	}
}

function AGN_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.agn_cd.value=rtnValAry[0];
		formObj.agn_nm.value=rtnValAry[10];
	}
}

function locOpenPopUp(curObj, air_sea_clss_cd){
	var formObj=document.frm1;
	
	if(curObj.id == "por"){
		rtnary=new Array(5);
		rtnary[0]=air_sea_clss_cd;
		rtnary[1]="";
//		rtnary[2]=formObj.por_nm.value;
		rtnary[2]="";
		rtnary[3]="";
		rtnary[4]=curObj;
		
   		callBackFunc = "POR_LOCATION_POPLIST";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
   		
	}else if(curObj.id == "pol"){
		rtnary=new Array(5);
		rtnary[0]=air_sea_clss_cd;
		rtnary[1]="";
//		rtnary[2]=formObj.pol_nm.value;
		rtnary[2]="";
		rtnary[3]="";
		rtnary[4]=curObj;
		
   		callBackFunc = "POL_LOCATION_POPLIST";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		
	}else if(curObj.id == "pod"){
		rtnary=new Array(5);
		rtnary[0]=air_sea_clss_cd;
		rtnary[1]="";
//		rtnary[2]=formObj.pod_nm.value;
		rtnary[2]="";
		rtnary[3]="";
		rtnary[4]=curObj;
		
   		callBackFunc = "POD_LOCATION_POPLIST";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		
	}else if(curObj.id == "del"){
		rtnary=new Array(5);
		rtnary[0]=air_sea_clss_cd;
		rtnary[1]="";
//		rtnary[2]=formObj.del_nm.value;
		rtnary[2]="";
		rtnary[3]="";
		rtnary[4]=curObj;
		
   		callBackFunc = "DEL_LOCATION_POPLIST";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		
	}else if(curObj.id == "dest"){
		rtnary=new Array(5);
		rtnary[0]=air_sea_clss_cd;
		rtnary[1]="";
//		rtnary[2]=formObj.fnl_dest_loc_nm.value;
		rtnary[2]="";
		rtnary[3]="";
		rtnary[4]=curObj;
		
   		callBackFunc = "DEST_LOCATION_POPLIST";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
	}
}

function locOpenPopUpName(curObj, air_sea_clss_cd){
	var formObj=document.frm1;
	
	if(curObj.id == "por"){
		rtnary=new Array(5);
		rtnary[0]=air_sea_clss_cd;
		rtnary[1]="";
		rtnary[2]=formObj.por_nm.value;
		rtnary[3]="";
		rtnary[4]=curObj;
		
   		callBackFunc = "POR_LOCATION_POPLIST";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
   		
	}else if(curObj.id == "pol"){
		rtnary=new Array(5);
		rtnary[0]=air_sea_clss_cd;
		rtnary[1]="";
		rtnary[2]=formObj.pol_nm.value;
		rtnary[3]="";
		rtnary[4]=curObj;
		
   		callBackFunc = "POL_LOCATION_POPLIST";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		
	}else if(curObj.id == "pod"){
		rtnary=new Array(5);
		rtnary[0]=air_sea_clss_cd;
		rtnary[1]="";
		rtnary[2]=formObj.pod_nm.value;
		rtnary[3]="";
		rtnary[4]=curObj;
		
   		callBackFunc = "POD_LOCATION_POPLIST";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		
	}else if(curObj.id == "del"){
		rtnary=new Array(5);
		rtnary[0]=air_sea_clss_cd;
		rtnary[1]="";
		rtnary[2]=formObj.del_nm.value;
		rtnary[3]="";
		rtnary[4]=curObj;
		
   		callBackFunc = "DEL_LOCATION_POPLIST";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		
	}else if(curObj.id == "dest"){
		rtnary=new Array(5);
		rtnary[0]=air_sea_clss_cd;
		rtnary[1]="";
		rtnary[2]=formObj.fnl_dest_loc_nm.value;
		rtnary[3]="";
		rtnary[4]=curObj;
		
   		callBackFunc = "DEST_LOCATION_POPLIST";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
	}
}

function POR_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.por_cd.value=rtnValAry[0];
		formObj.por_nm.value=rtnValAry[2];
	} 
}

function POL_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.pol_cd.value=rtnValAry[0];
		formObj.pol_nm.value=rtnValAry[2];
	} 
}

function POD_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.pod_cd.value=rtnValAry[0];
		formObj.pod_nm.value=rtnValAry[2];
	} 
}

function DEL_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.del_cd.value=rtnValAry[0];
		formObj.del_nm.value=rtnValAry[2];
	} 
}

function DEST_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.fnl_dest_loc_cd.value=rtnValAry[0];
		formObj.fnl_dest_loc_nm.value=rtnValAry[2];
	} 
}

function COMMODITY_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.cmdt_cd.value=rtnValAry[0];
		formObj.cmdt_nm.value=rtnValAry[2];
	}
}

/*function STATE_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.state_cd.value=rtnValAry[0];
		formObj.state_nm.value=rtnValAry[2];
		formObj.state_cnt_cd.value=rtnValAry[4];
	}
}*/

function OPR_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.opr_usr_id.value=rtnValAry[0];
	}
}

function setSizeUp(sheetObj, height){
	sheetObj.SetSheetHeight(height);
}

function setSizeDown(sheetObj, height){
	sheetObj.SetSheetHeight(height);
}

function entSearch(){
	if(event.keyCode == 13){
		doWork('SEARCHLIST')
	}
}

function chkSizeType(){
	var formObj=document.frm1;
	var sheetObj=docObjects[3];
	
	var length=0;
	var width=0;
	var height=0;
	var pcs=0;
	var cbm=0;
	var sumCbm=0;
	var sumPcs=0;	
	
	for(var i=1 ; i<sheetObj.LastRow() + 1 ; i++){
		length=sheetObj.GetCellValue(i, "dim_len_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_len_dim");
		width=sheetObj.GetCellValue(i, "dim_wdt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_wdt_dim");
		height=sheetObj.GetCellValue(i, "dim_hgt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_hgt_dim");
		pcs=sheetObj.GetCellValue(i, "dim_pce_qty")=="" ? 0 : sheetObj.GetCellValue(i, "dim_pce_qty");
		
		if (formObj.size_ut_cd[0].checked) {
 			cbm=roundXL(length * width * height * pcs * 0.01 * 0.01 * 0.01, 3);
 		} else if (formObj.size_ut_cd[1].checked) {
 			cbm=roundXL(length * width * height * pcs * 0.0254 * 0.0254 * 0.0254, 3);
 		}
 		sheetObj.SetCellValue(i, "dim_act_dim", cbm.toFixed(3), 0);
	}
	for(var i=1 ; i<sheetObj.LastRow() + 1 ; i++) {
		sumCbm += parseFloat(sheetObj.GetCellValue(i, "dim_act_dim"));
		sumPcs += parseFloat(sheetObj.GetCellValue(i, "dim_pce_qty"));
	}
	formObj.meas_cbm.value=sumCbm.toFixed(3);
	cbmChange(formObj.meas_cbm);
	chgWgtCal(sheetObj);
}

function setSizeUtCd(obj){
	var formObj=document.frm1; 
	if(obj=="CM"){
		formObj.size_ut_cd[0].checked=true;
		formObj.size_ut_cd[1].checked=false;
	}else {
		formObj.size_ut_cd[0].checked=false;
		formObj.size_ut_cd[1].checked=true;
	}  
}

function cbmChange(obj){
	var formObj=document.frm1;
	if(obj.name=="meas_cbm"){
		var objValue = formObj.meas_cbm.value.replace(/[^0-9.]/g, "");
		if (isNaN(objValue)) {
			formObj.meas_cbm.value = 0;
			return;
		}
		formObj.meas_cbm.value = Number(objValue).toString();
		var rndXLValue = roundXL(formObj.meas_cbm.value.replaceAll(",", "") * CNVT_CNST_CBM_CFT, 3);
		formObj.meas_cft.value = doMoneyFmt(Number(rndXLValue).toFixed(0));
		chkComma(formObj.meas_cft, 8, 3);
		chkComma(formObj.meas_cbm, 8, 3);
	}
	// CFT ==> CBM 기능  
	else if(obj.name=="meas_cft"){
		var objValue = formObj.meas_cft.value.replace(/[^0-9.]/g, "");
		if (isNaN(objValue)) {
			formObj.meas_cft.value = 0;
			return;
		}
		formObj.meas_cft.value = Number(objValue).toString();
		var rndXLValue = roundXL(formObj.meas_cft.value.replaceAll(",", "") / CNVT_CNST_CBM_CFT, 3);
		formObj.meas_cbm.value = rndXLValue;
		chkComma(formObj.meas_cbm, 8, 3);
		chkComma(formObj.meas_cft, 8, 3);
	}
}

function chgWgtCal(sheetObj){
	var formObj=document.frm1;
	var chg_wgt_kg = 0;
	var chg_wgt_lbs = 0;
	
	for ( var i=1; i <= sheetObj.LastRow(); i++) {
		var length=sheetObj.GetCellValue(i, "dim_len_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_len_dim");
		var width=sheetObj.GetCellValue(i, "dim_wdt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_wdt_dim");
		var height=sheetObj.GetCellValue(i, "dim_hgt_dim")=="" ? 0 : sheetObj.GetCellValue(i, "dim_hgt_dim");
		var pcs=sheetObj.GetCellValue(i, "dim_pce_qty")=="" ? 0 : sheetObj.GetCellValue(i, "dim_pce_qty");
		
		if(formObj.size_ut_cd[0].checked){
			if(sheetObj.GetCellValue(i, "del") == 0)
			{
				kg=roundXL(length * width * height * pcs / 6000, 1); 
				chg_wgt_kg = parseFloat(chg_wgt_kg) + parseFloat(kg.toFixed(1));
				chg_wgt_lbs = parseFloat(chg_wgt_lbs) + parseFloat((kg * CNVT_CNST_KG_LB).toFixed(1));  
			}
		} else if(formObj.size_ut_cd[1].checked) {
			if(sheetObj.GetCellValue(i, "del") == 0)
			{
				kg=roundXL(length * width * height * pcs * 2.54 * 2.54 * 2.54 / 6000, 1);  
				chg_wgt_kg = parseFloat(chg_wgt_kg) + parseFloat(kg.toFixed(1));
				chg_wgt_lbs = parseFloat(chg_wgt_lbs) + parseFloat((kg * CNVT_CNST_KG_LB).toFixed(1));  
			}
		}
	 
	}
	
	formObj.chg_wgt_kg.value = chg_wgt_kg;
	formObj.chg_wgt_lbs.value = chg_wgt_lbs;
	chkComma(formObj.chg_wgt_kg, 8, 3);
	chkComma(formObj.chg_wgt_lbs, 8, 3);
	
}
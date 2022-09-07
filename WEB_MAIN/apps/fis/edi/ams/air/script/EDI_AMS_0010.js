/*
 * 
 * 3. Valid Character
   - the letters A to Z (upper case only)
   - the numerals 0 to 9
   - the special characters / -. Space < =
     TXT_FTX .COM. 항목에 알파벳,숫자,Space만 허용
      
4. Weight 소수점 가능여부 확인
   소수점 가능. 소수점 포함하여 Length 넘으면 안됨.

 */
var del_flg=false;
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var sheetObj3=docObjects[2];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
		    formObj.f_cmd.value=-1;
	        formObj.submit();
	   break;
       case "SEARCHLIST":
    	   
    	   if( $('input:checkbox[id="kmo_flag"]').is(":checked") == true ){
    		   formObj.kmo_flag.value='Y';    		   
    	   }
    	   else{
    		   formObj.kmo_flag.value='';
    	   }
    	   
    	   if(!chkSearchCmprPrd(false, frm1.etd_strdt, frm1.etd_enddt)){
    			return;
    	   }
    	   
            formObj.f_cmd.value=SEARCHLIST;
            frm1.h_intg_bl_seq.value='';
        	docObjects[0].RemoveAll();
        	docObjects[1].RemoveAll();
			sheetObj.DoSearch("./EDI_AMS_0010GS.clt", FormQueryString(formObj) );
	   break;
       case "SEARCHLIST01":
           formObj.f_cmd.value=SEARCHLIST01;
			sheetObj2.DoSearch("./EDI_AMS_0010_1GS.clt", FormQueryString(formObj) );
       break;
       case "SEARCHLIST02":
    	   formObj.f_cmd.value=SEARCHLIST02;
			sheetObj2.DoSearch("./EDI_AMS_0010_1GS.clt", FormQueryString(formObj) );
       break;
       case "SEARCHLIST03":
    	   if(formObj.h_msg_no.value!=''){
    		   formObj.f_cmd.value=SEARCHLIST03;
				sheetObj3.DoSearch("./EDI_AMS_0010_2GS.clt", FormQueryString(formObj) );
    	   }
       break;
       case "SAVE":
    	   //lenFunction();
    	   if(mandatoryFunction()){
    		   if(confirm(getLabel('FMS_COM_CFMSAV'))){
    			   formObj.f_cmd.value=MODIFY;
    			   deleteFunction();
    			   sheetObj2.DoAllSave("EDI_AMS_0010_1GS.clt", FormQueryString(formObj),true);
    		   }
    	   }
       break;
       case "SEND_EDI":
    	   //lenFunction();
    	   /*
    	   if(mandatoryFunction()){
    		   if(confirm("Do you want transmit?")){
    			   formObj.f_cmd.value=MODIFY01;
    			   sheetObj2.DoAllSave("EDI_AMS_0010_1GS.clt", FormQueryString(formObj),true);
    		   }
    	   }
    	   */
    	   
    	   if(sheetObj2.GetCellValue(2, "msg_no") ==""){
    		   if(mandatoryFunction()){
    			   formObj.f_cmd.value = MODIFY;
    			   deleteFunction();
    			   sheetObj2.DoAllSave("EDI_AMS_0010_1GS.clt", FormQueryString(formObj),true);
        		   
        		   formObj.f_cmd.value = MODIFY01;
        		   sheetObj2.DoAllSave("EDI_AMS_0010_1GS.clt", FormQueryString(formObj),true);
    			   
    		   }
    		   
    	   }else if(mandatoryFunction()){
    		   if(confirm(getLabel('FMS_COM_CFMSENDEDI'))){
    			   formObj.f_cmd.value = MODIFY01;
    			   
    			   sheetObj2.DoAllSave("EDI_AMS_0010_1GS.clt", FormQueryString(formObj),true);
    		   }
    	   }
       break;
       case "DELETE":
    	   if(frm1.h_msg_no.value!=''){
    		   if(confirm("Do you want delete?")){
    			   formObj.f_cmd.value=MODIFY02;
    			   del_flg=true;
    			   sheetObj2.DoAllSave("EDI_AMS_0010_1GS.clt", FormQueryString(formObj),true);
    		   }
    	   }else{
    		   //There is no data to save
    		   alert(getLabel('FMS_COM_ALT010') + "\n\n: EDI_AMS_0010.70");
    	   }
    	   break;
       case "RECEIVE":
		   if(confirm(getLabel('FMS_COM_CFMRCV'))){
			   formObj.f_cmd.value=MODIFY03;
			   sheetObj2.DoAllSave("./EDI_AMS_0010_1GS.clt", FormQueryString(formObj),true);
		   }
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
function loadPage() {
    var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
	
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd);
	
	//formObj.f_ofc_cd.value=ofc_cd;
	
	//오늘일자구하기
	var now=new Date(); 				
	var endDt=new Date(Date.parse(now) + 3 * 1000 * 60 * 60 * 24);
	var preDt=new Date(Date.parse(now));
	var year=endDt.getFullYear(); 			
	var month=endDt.getMonth() + 1;
	var date=endDt.getDate(); 	
	var preyear=preDt.getFullYear();
	var premonth=preDt.getMonth() + 1;
	var predate=preDt.getDate();
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+(date);
	}
	if(premonth < 10){
		premonth="0"+(premonth);
	}
	if(predate < 10){
		predate="0"+predate;
	}
	FROMDATE=premonth + "-" + predate + "-" + preyear;
	ENDDATE=month + "-" + date + "-" + year;
	formObj.etd_strdt.value=FROMDATE;
	formObj.etd_enddt.value=ENDDATE;	
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[1], false);
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
            (7, 0, 0, true);
            var cnt=0;

            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:getLabel('EDI_AMS_0010_HDR1'), Align:"Center"} ];
            InitHeaders(headers, info);

            var cols = [ {Type:"Text",      Hidden:0,  Width:100,   Align:"Left",    ColMerge:1,   SaveName:"bl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",      Hidden:0,  Width:35,   Align:"Center",  ColMerge:1,   SaveName:"hbl_cnt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Date",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"etd_dt_tm",    KeyField:0,   CalcLogic:"",   Format:"Ymd",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"modi_usrid",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Combo",  Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"status",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"msg_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
             
            	  InitColumns(cols);

            	  SetEditable(1);
//                  SetHeaderGetRowHeight(40);
                  //SetColProperty("etd_dt_tm", {Format:"####-##-##"} );
                  //InitViewFormat(0, "etd_dt_tm", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
                  SetColProperty('status', {ComboText:'Created|Sent|Accepted|Rejected|Sent Failed', ComboCode:'C|S|A|R|F'} );
                  var height = $(window).height();
                  if (height - 200 < 200){
             			SetSheetHeight(200);
             		}else{
             			SetSheetHeight(height - 200);
             		}
           }                                                      
         break;
         case 2:      //IBSheet2 init
        	    with(sheetObj){
             
           (56, 0, 0, true);
           var cnt=0;

           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1} );

           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel('EDI_AMS_0010_HDR2_1'), Align:"Center"},
                       { Text:getLabel('EDI_AMS_0010_HDR2_2'), Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"shp_nm",             KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
                  {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"shp_addr",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:400 , MultiLineText:1 },
                  {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",  ColMerge:0,   SaveName:"shp_city",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,	EditLen:50 },
                  {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"shp_state",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,	EditLen:9 },
                  {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"shp_cntry",          KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,	EditLen:2 },
                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"shp_zip_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,	EditLen:9 },
                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"shp_tel_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,	EditLen:25 },
                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"shp_fax_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,	EditLen:25 },
                  {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"shp_tlx_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,	EditLen:25 },
                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cne_nm",             KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:50 },
                  {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cne_addr",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:400 , MultiLineText:1 },
                  {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",  ColMerge:0,   SaveName:"cne_city",           KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
                  {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"cne_state",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:9 },
                  {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"cne_cntry",          KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:2 },
                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cne_zip_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:9 },
                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cne_tel_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:25 },
                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cne_fax_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:25 },
                  {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cne_tlx_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:25 },
                  {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cvd_iso_curr_cd",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:3 },
                  {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cvd_pc_term",        KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:2 },
                  {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"cvd_val_carr",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:12 },
                  {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"cvd_val_cust",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:12 },
                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cvd_val_insu",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:11 },
                  {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"oci_cntry_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:2 },
                  {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"oci_info_id",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:3 },
                  //#6717 [IMPEX, BNX, BINEX] KAMS LOGIC CHANGE RELATED ASIANA [ CHANGE APPLIED : July 1st ]
                  {Type:"Combo",      Hidden:0, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"oci_cus_info_id",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:2 },
                  {Type:"Combo",      Hidden:0, Width:100,   Align:"Center",  ColMerge:0,   SaveName:"oci_supp_cus_info",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:35 },
                  {Type:"Text",      Hidden:0, Width:100,   Align:"Center",  ColMerge:0,   SaveName:"oci_supp_cus_info2",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:35 }, 
                  {Type:"PopupEdit", Hidden:0, Width:100,   Align:"Center",  ColMerge:0,   SaveName:"oci_exp_date",      KeyField:0,   CalcLogic:"",   Format:"",           PointCount:0,   UpdateEdit:1,   InsertEdit:1 , FormatFix:1, EditLen:4 }, 
                  {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"hsn_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:3 },
                  {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"mbi_air_pfx",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,  EditLen:3 },
                  {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"mbi_awbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,  EditLen:8 },
                  {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"mbi_org_port",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:3 },
                  {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"mbi_dest_port",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:3 },
                  {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"mbi_ship_desc_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:1 },
                  {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:0,   SaveName:"mbi_no_of_pcs",      KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:4 },
                  {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"mbi_wgt_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:1 },
                  {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:0,   SaveName:"mbi_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1},
                  {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"hbs_hawbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:12 },
                  {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"hbs_org_port",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:3 },
                  {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"hbs_dest_port",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:3 },
                  {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:0,   SaveName:"hbs_no_of_pcs",      KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:4 },
                  {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"hbs_wgt_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:1 },
                  {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:0,   SaveName:"hbs_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1},
                  {Type:"Text",      Hidden:1, Width:70,   Align:"Left",    ColMerge:0,   SaveName:"hbs_slac",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:5 },
                  {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"hbs_gds_desc",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:200 },
                  {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"hbs_handle_cd_1",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:3 },
                  {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"hbs_handle_cd_2",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:3 },
                  {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"flt_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,  EditLen:7 },
                  {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"lnr_iata_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"place",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"carry_place",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"mbl_cne_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"mbl_cne_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"msg_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"seq",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"hbs_org_cntry",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1},
                  {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 }];
                  
            
           		InitColumns(cols);

           		SetEditable(1);
           		var height = $(window).height();
           		if (height - 200 < 200){
           			SetSheetHeight(200);
           		}else{
           			SetSheetHeight(height - 200);
           		}
           		
           		//#6717 [IMPEX, BNX, BINEX] KAMS LOGIC CHANGE RELATED ASIANA [ CHANGE APPLIED : July 1st ]
           		SetColProperty("oci_cus_info_id", {ComboText:'|'+OCI_NM, ComboCode:'M|'+OCI_CD} );
                //SetColProperty('cgo_pck_ut', {ComboText:PCKCD1, ComboCode:PCKCD2} );
	            SetColProperty("oci_supp_cus_info", {ComboText:"Import|Transit", ComboCode:"I|T"} );
	            //SetColProperty("eta_dt_tm", {Format:"####-##-## ##:##"} );
	            //InitViewFormat(0, "etd_dt_tm", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
	            
	            
	            SetColProperty(0 ,"shp_nm", {AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"shp_addr", {AcceptKeys:"E|N|[/-. \n\r]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"shp_city", {AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"shp_state", {AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"shp_cntry", {AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"shp_zip_cd", {AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"shp_zip_cd", {AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"shp_tel_no", {AcceptKeys:"N" , InputCaseSensitive:1});
	            SetColProperty(0 ,"shp_fax_no", {AcceptKeys:"N" , InputCaseSensitive:1});
	            SetColProperty(0 ,"cne_nm", {AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"cne_addr", {AcceptKeys:"E|N|[/ -. \n\r]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"cne_city", {AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"cne_state", {AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"cne_cntry", {AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"cne_zip_cd", {AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"cne_zip_cd", {AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"cne_tel_no", {AcceptKeys:"N" , InputCaseSensitive:1});
	            SetColProperty(0 ,"cne_fax_no", {AcceptKeys:"N" , InputCaseSensitive:1});
	             
	            SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	            //SetSheetHeight(600);
         }      
         break;
         case 3:      //IBSheet2 init
        	    with(sheetObj){
             
           (8, 0, 0, true);
           var cnt=0;

           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel('EDI_AMS_0010_HDR3'), Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ref_msg_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"file_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:300,  Align:"Left",    ColMerge:0,   SaveName:"msg_txt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:0,   SaveName:"rcv_msg_txt",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Combo",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"status",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"msg_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
            
           InitColumns(cols);

           SetEditable(1);
           SetSheetHeight(600);
           
           SetColProperty('status', {ComboText:'Created|Sent|Accepted|Rejected', ComboCode:'C|S|A|R'} );
         }      
         break;
     }
}
function setResult() {
	var formObj=document.frm1;
	var bl_type=document.getElementsByName("bl_type");
	var rd_zpi_local_goods=document.getElementsByName("rd_zpi_local_goods");
	for(var i=0; i<bl_type.length; i++){
		bl_type[i].disabled=true;
	}
	if(formObj.zpi_local_goods.value == "N" && formObj.zpi_pre_note.value== "J"){	//N 이면 : ZPI_LOCAL_GOODS : N, ZPI_PRE_NOTE : J 
		rd_zpi_local_goods[0].checked=false;
		rd_zpi_local_goods[1].checked=true;
	}else{																			//(default : Y)Y 이면 : ZPI_LOCAL_GOODS : J, ZPI_PRE_NOTE : N 
		rd_zpi_local_goods[0].checked=true;
		rd_zpi_local_goods[1].checked=false;
	}
	if(formObj.intg_bl_seq.value != ""){
		var f_bl_type=document.getElementsByName("f_bl_type");
		var bl_type=document.getElementsByName("bl_type");
		if(formObj.bl_type_val.value == "M"){
			bl_type[0].checked=true;
			f_bl_type[0].checked=true;
			bl_type[1].checked=false;
			f_bl_type[1].checked=false;
			formObj.hbl_pck_qty.className='search_form-disable';
			formObj.hbl_pck_qty.readOnly=true;
			formObj.hbl_grs_wgt.className='search_form-disable';
			formObj.hbl_grs_wgt.readOnly=true;
			document.getElementById("tdPcs").className='table_search_head'
			document.getElementById("tdWgt").className='table_search_head'
			document.getElementById("tdCmdt").className='table_search_head'
		}else{
			bl_type[0].checked=false;			
			f_bl_type[0].checked=false;
			bl_type[1].checked=true;
			f_bl_type[1].checked=true;
			document.getElementById("tdPcs").className='table_search_head_r'
			document.getElementById("tdWgt").className='table_search_head_r'
			document.getElementById("tdCmdt").className='table_search_head_r'
		}	
		doWork('SEARCHLIST01');
		doWork('SEARCHLIST02');
		doWork('SEARCHLIST03');
		doWork('SEARCHLIST04');
	}
	if(formObj.sts_cd.value == "N/A" && formObj.mrn.value != ""){
		doWork('ADD');
	}
}	
function uploadChk(){
	var chkVal=true;
	var formObj=document.frm1;
	/*
	 * 필수값 설정
	 */
	var intg_bl_seq=formObj.intg_bl_seq.value;
	var bl_type=formObj.bl_type_val.value;
	if(intg_bl_seq ==""){
		//Please,  Retrieve
		alert(getLabel('FMS_COM_ALT007'));
		return false;
	}
	if(checkInputVal(formObj.mbl_no.value, 2, 16, "T", 'MAWB No.')!='O'){
		formObj.mbl_no.focus();
		return false;
	}
	if(checkInputVal(formObj.mbl_pck_qty.value, 1, 7, "N", 'AWB PCS')!='O'){
		formObj.mbl_pck_qty.focus();
		return false;
	}
	if(checkInputVal(formObj.mbl_rt_pck_qty.value, 1, 7, "N", 'Rate PCS')!='O'){
		formObj.mbl_rt_pck_qty.focus();
		return false;
	}
	if(checkInputVal(formObj.mbl_grs_wgt.value, 1, 8, "N", 'AWB G/Weight')!='O'){
		formObj.mbl_grs_wgt.focus();	
		return false;
	}
	if(checkInputVal(formObj.mbl_rt_grs_wgt.value, 1, 8, "N", 'AWB Rate Weight')!='O'){
		formObj.mbl_rt_grs_wgt.focus();	
		return false;
	}
	if(checkInputVal(formObj.mbl_rt_clss_cd.value, 1, 1, "T", 'AWB Rate')!='O'){
		formObj.mbl_rt_clss_cd.focus();	
		return false;
	}
	if(formObj.mbl_pck_qty.value <= 0){
		//please enter a value greater than zero in the AWB PCS
		alert(getLabel('EDI_COM_ALT001'));
		formObj.mbl_pck_qty.focus();
		return false;
	}
	if(formObj.mbl_grs_wgt.value <= 0){
		//please enter a value greater than zero in the AWB G/Weight
		alert(getLabel('EDI_COM_ALT002'));
		formObj.mbl_grs_wgt.focus();
		return false;
	}
	if(bl_type == "H"){
		if(checkInputVal(formObj.hbl_no.value, 2, 16, "T", 'HAWB NO.')!='O'){
			formObj.hbl_no.focus();
			return false;
		}
		if(checkInputVal(formObj.hbl_pck_qty.value, 1, 7, "N", 'HAWB PCS')!='O'){
			formObj.hbl_pck_qty.focus();
			return false;
		}
		if(checkInputVal(formObj.hbl_grs_wgt.value, 1, 8, "N", 'HAWB G/Weight')!='O'){
			formObj.hbl_grs_wgt.focus();	
			return false;
		}
//		if(checkInputVal(formObj.hbl_rep_cmdt_cd.value, 1, 13, "T", 'Commodity')!='O'){
//			formObj.hbl_rep_cmdt_cd.focus();
//			return false;
//		}
		if(checkInputVal(formObj.hbl_rep_cmdt_nm.value, 1, 31, "T", 'Commodity')!='O'){
			formObj.hbl_rep_cmdt_nm.focus();
			return false;
		}
		if(formObj.hbl_pck_qty.value <= 0){
			//please enter a value greater than zero in the HAWB PCS
			alert(getLabel('EDI_COM_ALT001'));
			formObj.hbl_pck_qty.focus();
			return false;
		}
		if(formObj.hbl_grs_wgt.value <= 0){
			//please enter a value greater than zero in the HAWB G/Weight
			alert(getLabel('EDI_COM_ALT001'));
			formObj.hbl_grs_wgt.focus();
			return false;
		}
	}
	if(checkInputVal(formObj.lnr_trdp_cd.value, 5, 21, "T", 'Air Line')!='O'){
		formObj.lnr_trdp_cd.focus();
		return false;
	}
	if(checkInputVal(formObj.flt_no.value, 5, 16, "T", 'FLT No.')!='O'){
		chkVal=false;
		formObj.flt_no.focus();
		return chkVal;
	}
	if(checkInputVal(formObj.pol_cd.value, 1, 16, "T", 'Departure')!='O'){
		formObj.pol_cd.focus();
		return false;
	}
	if(checkInputVal(formObj.etd_dt_tm.value, 10, 10, "DD", 'Departure')!='O'){
		formObj.etd_dt_tm.focus();
		return false;
	}
	if(checkInputVal(formObj.etd_tm.value, 5, 5, "T", 'Departure')!='O'){
		formObj.etd_tm.focus();
		return false;
	}
	if(checkInputVal(formObj.pod_cd.value, 1, 16, "T", 'Destination')!='O'){
		formObj.pod_cd.focus();
		return false;
	}
	if(checkInputVal(formObj.eta_dt_tm.value, 10, 10, "DD", 'Destination')!='O'){
		formObj.eta_dt_tm.focus();
		return false;
	}
	if(checkInputVal(formObj.eta_tm.value, 5, 5, "T", 'Destination')!='O'){
		formObj.eta_tm.focus();
		return false;
	}
	if(checkInputVal(formObj.gate_han_agt.value, 1, 10, "T", 'Gate Handling Agent')!='O'){
		formObj.gate_han_agt.focus();
		return false;
	}
	if(checkInputVal(formObj.car_han_agt.value, 1, 10, "T", 'Carrier Handling Agent')!='O'){
		formObj.car_han_agt.focus();
		return false;
	}
	if(checkInputVal(formObj.cust_ofc_cd.value, 1, 10, "T", 'Customs Office')!='O'){
		formObj.cust_ofc_cd.focus();
		return false;
	}
	if(checkInputVal(formObj.tin_cd.value, 1, 10, "T", 'TIN')!='O'){
		formObj.tin_cd.focus();
		return false;
	}
	if(checkInputVal(formObj.frwd_ofc_nm.value, 1, 50, "T", 'Forwarder')!='O'){
		formObj.frwd_ofc_nm.focus();
		return false;
	}
	if(checkInputVal(formObj.frwd_trdp_pic.value, 1, 50, "T", 'PIC')!='O'){
		formObj.frwd_trdp_pic.focus();
		return false;
	}
	if(checkInputVal(formObj.frwd_trdp_email.value, 1, 50, "T", 'eMail')!='O'){
		formObj.frwd_trdp_email.focus();
		return false;
	}
	if(checkInputVal(formObj.shpr_trdp_nm.value, 1, 50, "T", 'Shipper')!='O'){
		formObj.shpr_trdp_nm.focus();
		return false;
	}
	if(checkInputVal(formObj.shpr_trdp_addr.value, 1, 100, "T", 'Shipper Address')!='O'){
		formObj.shpr_trdp_addr.focus();
		return false;
	}
//	if(checkInputVal(formObj.shpr_trdp_zip.value, 1, 10, "T", 'Shipper Zip')!='O'){
//		formObj.shpr_trdp_zip.focus();
//		return false;
//	}
	if(checkInputVal(formObj.shpr_trdp_city.value, 1, 30, "T", 'Shipper City')!='O'){
		formObj.shpr_trdp_city.focus();
		return false;
	}
	if(checkInputVal(formObj.shpr_trdp_cnt.value, 1, 3, "T", 'Shipper Country')!='O'){
		formObj.shpr_trdp_cnt.focus();
		return false;
	}
	if(checkInputVal(formObj.cnee_trdp_nm.value, 1, 50, "T", 'Consignee')!='O'){
		formObj.cnee_trdp_nm.focus();
		return false;
	}
	if(checkInputVal(formObj.cnee_trdp_addr.value, 1, 100, "T", 'Consignee Address')!='O'){
		formObj.cnee_trdp_addr.focus();
		return false;
	}
//	if(checkInputVal(formObj.cnee_trdp_zip.value, 1, 10, "T", 'Consignee Zip')!='O'){
//		formObj.cnee_trdp_zip.focus();
//		return false;
//	}
	if(checkInputVal(formObj.cnee_trdp_city.value, 1, 30, "T", 'Consignee City')!='O'){
		formObj.cnee_trdp_city.focus();
		return false;
	}
	if(checkInputVal(formObj.cnee_trdp_cnt.value, 1, 3, "T", 'Consignee Country')!='O'){
		formObj.cnee_trdp_cnt.focus();
		return false;
	}
	if(formObj.awb_direct.value== "DR" || bl_type == "H"){
		var sheetObj=docObjects[0];
		if(sheetObj.RowCount()== 0){
			//The case of direct bl must be entered to mrn
			//Please Input the MRN
			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_MRNO'));
			return false;
		}
		else{
			for(var i=1; i<=sheetObj.LastRow();i++){
				if(sheetObj.GetCellValue(i, "zpl_mrn").length != 18){
					//MRN should be 18 characters
					alert(getLabel('EDI_COM_ALT003'));
					return false;
				}
				if(checkInputVal(sheetObj.GetCellValue(i, "zpl_position"), 1, 3, "T", 'Position')!='O'){
					return false;
				}
				if(checkInputVal(sheetObj.GetCellValue(i, "zpl_pkg_id"), 1, 2, "T", 'Package id.')!='O'){
					return false;
				}
//	            if(sheetObj.CellValue(i, "zpl_wgt") <= 0){
//					//please enter a value greater than zero in the Weight. alert
//					return false;
//				}
			}	
		}
	}
	return chkVal;
}
function transmitChk(){
	var chkVal=true;
	var formObj=document.frm1;
	if(formObj.sts_cd.value == "N/A"){
		chkVal=false;
		//After upload you can transmit
		alert(getLabel('EDI_COM_ALT004'));
	}
	if(chkVal){
		chkVal=uploadChk();
	}
	return chkVal;
}
function sheet1_OnClick(sheet, row, col){
//	frm1.h_intg_bl_seq.value=sheet.GetCellValue(row, "intg_bl_seq");
//	frm1.h_msg_no.value=sheet.GetCellValue(row, "msg_no");
}
function sheet3_OnClick(sheet, row, col){
	frm1.send_msg_txt.value=sheet.GetCellValue(row, "msg_txt");
}
function sheet1_OnDblClick(sheet, row, col){
	frm1.h_intg_bl_seq.value=sheet.GetCellValue(row, "intg_bl_seq");
	frm1.h_msg_no.value=sheet.GetCellValue(row, "msg_no");
	if(frm1.h_msg_no.value==""){
		doWork("SEARCHLIST01");
	}else{
		doWork("SEARCHLIST02");
	}
}
function sheet1_OnSearchEnd(sheet, row, col){
	for(var i=1 ; i<sheet.LastRow() + 1 ; i++){
if(frm1.h_intg_bl_seq.value!='' && sheet.GetCellValue(i, "intg_bl_seq")==frm1.h_intg_bl_seq.value){
			sheet1_OnDblClick(sheet, i, "intg_bl_seq");
			break;
		}
	}
}
function sheet2_OnSearchEnd(sheet, row, col){
//	if(frm1.h_msg_no.value==''){
//		for(var i=2 ; i<sheet.LastRow() + 1 ; i++){
//			sheet.SetCellValue(i, 'shp_addr',checkAddress(sheet.GetCellValue(i, 'shp_addr')));
//			sheet.SetCellValue(i, 'cne_addr',checkAddress(sheet.GetCellValue(i, 'cne_addr')));
//		}
//	}
	deleteFunction();
}
//function sheet3_OnSearchEnd(sheet, row, col){
//	for(var i=2 ; i<sheet.LastRow() + 1 ; i++){
//		sheet.RowHeight(i) = 32;
//	}
//}
function checkAddress(addr){
	var tempAddr=addr.split('\r\n');
	var result='';
	for(var i=1 ; i<tempAddr.length ; i++){
		if(i!=1){
			result += '\r\n';
		}
		result += tempAddr[i];
	}
	return result; 
}
function sheet2_OnSaveEnd(sheet, errMsg){
	//doWork("SEARCHLIST");
	var formObj   = document.frm1;
	var mawbSheetObj  = docObjects[0];
	if(errMsg =='' ){
		if(formObj.f_cmd.value == MODIFY || formObj.f_cmd.value == MODIFY02){
			formObj.h_msg_no.value = sheet.GetCellValue(2, 'msg_no');	//첫번째 Data Row 값 할당
		}
		
		//MAWB
		for(var i=1; i<=mawbSheetObj.LastRow();i++){
			//alert(mawbSheetObj.GetCellValue(2, 'bl_no') + "/" + sheet.GetCellValue(i, "mbi_awbl_no"));
			if(sheet.GetCellValue(2, "mbi_air_pfx") + "-" + sheet.GetCellValue(2, "mbi_awbl_no") == mawbSheetObj.GetCellValue(i, "bl_no")){	//
				mawbSheetObj.SetCellValue(i-1, 'msg_no', sheet.GetCellValue(2, "msg_no"));
				if(formObj.f_cmd.value == MODIFY || formObj.f_cmd.value == MODIFY02){
					mawbSheetObj.SetCellValue(i, 'status', 'C');	//Created
					break;
				}else if(formObj.f_cmd.value == MODIFY01){
					mawbSheetObj.SetCellValue(i, 'status', 'S');	//Sent
					break;
				}
			}
		}		
	}
	else{
		var formObj   = document.frm1;
		var mawbSheetObj  = docObjects[0];
		for(var i=1; i<=mawbSheetObj.LastRow();i++){
			//alert(mawbSheetObj.GetCellValue(2, 'bl_no') + "/" + sheet.GetCellValue(i, "mbi_awbl_no"));
			if(sheet.GetCellValue(2, "mbi_air_pfx") + "-" + sheet.GetCellValue(2, "mbi_awbl_no") == mawbSheetObj.GetCellValue(i, "bl_no")){	//
				mawbSheetObj.SetCellValue(i-1, 'msg_no', sheet.GetCellValue(2, "msg_no"));
				if(formObj.f_cmd.value == MODIFY01){
					mawbSheetObj.SetCellValue(i, 'status', 'F');	//Sent
					break;
				}
			}
		}	
	}
}
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
            var cal = new ComCalendarFromTo();
	        cal.select(formObj.etd_strdt, formObj.etd_enddt, 'MM-dd-yyyy');
        break;
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
/*
 * name, address 등에 대해 특수기호를 제거한다.
 */
function deleteFunction(){
	var sheetObj=docObjects[1];
	var rows=sheetObj.LastRow() + 1;
	for(var i=2 ; i<rows ; i++){
		sheetObj.SetCellValue(i, "shp_nm",deleteChar(sheetObj.GetCellValue(i, "shp_nm"), '-/. ', 0));
		sheetObj.SetCellValue(i, "shp_addr",deleteChar(sheetObj.GetCellValue(i, "shp_addr"), '-/. ', 0));
		sheetObj.SetCellValue(i, "shp_city",deleteChar(sheetObj.GetCellValue(i, "shp_city"), '-/. ', 0));
		sheetObj.SetCellValue(i, "shp_state",deleteChar(sheetObj.GetCellValue(i, "shp_state"), '-/. ', 0));
		sheetObj.SetCellValue(i, "shp_cntry",deleteChar(sheetObj.GetCellValue(i, "shp_cntry"), '', 1));
		sheetObj.SetCellValue(i, "shp_zip_cd",deleteChar(sheetObj.GetCellValue(i, "shp_zip_cd"), '-/. ', 0));
		sheetObj.SetCellValue(i, "shp_tel_no",deleteChar(sheetObj.GetCellValue(i, "shp_tel_no"), '', 0));
		sheetObj.SetCellValue(i, "shp_fax_no",deleteChar(sheetObj.GetCellValue(i, "shp_fax_no"), '', 0));
		
		//#2966 [IMPEX] KAMS not working
//		sheetObj.SetCellValue(i, "shp_tel_no", sheetObj.GetCellValue(i, "shp_tel_no").replaceAll("-", "").replaceAll("/", "").replaceAll(".", "").replaceAll(" ", "").replaceAll("(", "").replaceAll(")", ""));
//		sheetObj.SetCellValue(i, "shp_fax_no", sheetObj.GetCellValue(i, "shp_fax_no").replaceAll("-", "").replaceAll("/", "").replaceAll(".", "").replaceAll(" ", "").replaceAll("(", "").replaceAll(")", ""));
		
		sheetObj.SetCellValue(i, "shp_tel_no", sheetObj.GetCellValue(i, "shp_tel_no").replace(/\-|\/|\.|\ |\(|\)/g, ""));
		sheetObj.SetCellValue(i, "shp_fax_no", sheetObj.GetCellValue(i, "shp_fax_no").replace(/\-|\/|\.|\ |\(|\)/g, ""));
		
		//		sheetObj.CellValue(i, "shp_tlx_no") 		= deleteChar(sheetObj.CellValue(i, "shp_tlx_no"), '', 0);
		sheetObj.SetCellValue(i, "cne_nm",deleteChar(sheetObj.GetCellValue(i, "cne_nm"), '-/. ', 0));
		sheetObj.SetCellValue(i, "cne_addr",deleteChar(sheetObj.GetCellValue(i, "cne_addr"), '-/. ', 0));
		sheetObj.SetCellValue(i, "cne_city",deleteChar(sheetObj.GetCellValue(i, "cne_city"), '-/. ', 0));
		sheetObj.SetCellValue(i, "cne_state",deleteChar(sheetObj.GetCellValue(i, "cne_state"), '-/. ', 0));
		sheetObj.SetCellValue(i, "cne_cntry",deleteChar(sheetObj.GetCellValue(i, "cne_cntry"), '', 1));
		sheetObj.SetCellValue(i, "cne_zip_cd",deleteChar(sheetObj.GetCellValue(i, "cne_zip_cd"), '-/. ', 0));
		sheetObj.SetCellValue(i, "cne_tel_no",deleteChar(sheetObj.GetCellValue(i, "cne_tel_no"), '', 0));
		sheetObj.SetCellValue(i, "cne_fax_no",deleteChar(sheetObj.GetCellValue(i, "cne_fax_no"), '', 0));
		
		//#2966 [IMPEX] KAMS not working
//		sheetObj.SetCellValue(i, "cne_tel_no", sheetObj.GetCellValue(i, "cne_tel_no").replaceAll("-", "").replaceAll("/", "").replaceAll(".", "").replaceAll(" ", "").replaceAll("(", "").replaceAll(")", ""));
//		sheetObj.SetCellValue(i, "cne_fax_no", sheetObj.GetCellValue(i, "cne_fax_no").replaceAll("-", "").replaceAll("/", "").replaceAll(".", "").replaceAll(" ", "").replaceAll("(", "").replaceAll(")", ""));

		sheetObj.SetCellValue(i, "cne_tel_no", sheetObj.GetCellValue(i, "cne_tel_no").replace(/\-|\/|\.|\ |\(|\)/g, ""));
		sheetObj.SetCellValue(i, "cne_fax_no", sheetObj.GetCellValue(i, "cne_fax_no").replace(/\-|\/|\.|\ |\(|\)/g, ""));
		
		//		sheetObj.CellValue(i, "cne_tlx_no") 		= deleteChar(sheetObj.CellValue(i, "cne_tlx_no"), '', 0);
		//		sheetObj.CellValue(i, "cvd_iso_curr_cd")	= deleteChar(sheetObj.CellValue(i, "cvd_iso_curr_cd"), '', 1);
		//		sheetObj.CellValue(i, "cvd_pc_term") 		= deleteChar(sheetObj.CellValue(i, "cvd_pc_term"), '', 1);
		//		sheetObj.CellValue(i, "cvd_val_carr") 		= deleteChar(sheetObj.CellValue(i, "cvd_val_carr"), '', 0);
		//		sheetObj.CellValue(i, "cvd_val_cust") 		= deleteChar(sheetObj.CellValue(i, "cvd_val_cust"), '', 0);
		//		sheetObj.CellValue(i, "cvd_val_insu") 		= deleteChar(sheetObj.CellValue(i, "cvd_val_insu"), '', 0);
		//		sheetObj.CellValue(i, "oci_cntry_cd") 		= deleteChar(sheetObj.CellValue(i, "oci_cntry_cd"), '', 1);
		//		sheetObj.CellValue(i, "oci_info_id") 		= deleteChar(sheetObj.CellValue(i, "oci_info_id"), '', 1);
		//		sheetObj.CellValue(i, "oci_cus_info_id") 	= deleteChar(sheetObj.CellValue(i, "oci_cus_info_id"), '', 1);
		//		sheetObj.CellValue(i, "oci_supp_cus_info") 	= deleteChar(sheetObj.CellValue(i, "oci_supp_cus_info"), '-/. ', 0);
		//		sheetObj.CellValue(i, "hsn_no") 			= deleteChar(sheetObj.CellValue(i, "hsn_no"), '', 2);
		sheetObj.SetCellValue(i, "mbi_air_pfx",deleteChar(sheetObj.GetCellValue(i, "mbi_air_pfx"), '', 2));
		sheetObj.SetCellValue(i, "mbi_awbl_no",deleteChar(sheetObj.GetCellValue(i, "mbi_awbl_no"), '', 2));
		sheetObj.SetCellValue(i, "mbi_org_port",deleteChar(sheetObj.GetCellValue(i, "mbi_org_port"), '', 1));
		sheetObj.SetCellValue(i, "mbi_dest_port",deleteChar(sheetObj.GetCellValue(i, "mbi_dest_port"), '', 1));
		//		sheetObj.CellValue(i, "mbi_ship_desc_cd") 	= deleteChar(sheetObj.CellValue(i, "mbi_ship_desc_cd"), '', 1);
		sheetObj.SetCellValue(i, "mbi_no_of_pcs",deleteChar(sheetObj.GetCellValue(i, "mbi_no_of_pcs"), '', 2));
		//		sheetObj.CellValue(i, "mbi_wgt_cd") 		= deleteChar(sheetObj.CellValue(i, "mbi_wgt_cd"), '', 1);
		sheetObj.SetCellValue(i, "mbi_wgt",deleteChar(sheetObj.GetCellValue(i, "mbi_wgt"), '', 2));
		sheetObj.SetCellValue(i, "hbs_hawbl_no",deleteChar(sheetObj.GetCellValue(i, "hbs_hawbl_no"), '', 0));
		sheetObj.SetCellValue(i, "hbs_org_port",deleteChar(sheetObj.GetCellValue(i, "hbs_org_port"), '', 1));
		sheetObj.SetCellValue(i, "hbs_dest_port",deleteChar(sheetObj.GetCellValue(i, "hbs_dest_port"), '', 1));
		sheetObj.SetCellValue(i, "hbs_no_of_pcs",deleteChar(sheetObj.GetCellValue(i, "hbs_no_of_pcs"), '', 2));
		//		sheetObj.CellValue(i, "hbs_wgt_cd") 		= deleteChar(sheetObj.CellValue(i, "hbs_wgt_cd"), '', 1);
		sheetObj.SetCellValue(i, "hbs_wgt",deleteChar(sheetObj.GetCellValue(i, "hbs_wgt"), '', 2));
		//		sheetObj.CellValue(i, "hbs_slac") 			= deleteChar(sheetObj.CellValue(i, "hbs_slac"), '', 2);
		sheetObj.SetCellValue(i, "hbs_gds_desc",deleteChar(sheetObj.GetCellValue(i, "hbs_gds_desc"), ' ', 0));
		//		sheetObj.CellValue(i, "hbs_handle_cd_1") 	= deleteChar(sheetObj.CellValue(i, "hbs_handle_cd_1"), '', 1);
		//		sheetObj.CellValue(i, "hbs_handle_cd_2") 	= deleteChar(sheetObj.CellValue(i, "hbs_handle_cd_2"), '', 1);
		sheetObj.SetCellValue(i, "eta_dt_tm",deleteChar(sheetObj.GetCellValue(i, "eta_dt_tm"), '', 0));
		sheetObj.SetCellValue(i, "flt_no",deleteChar(sheetObj.GetCellValue(i, "flt_no"), '', 0));
		sheetObj.SetCellValue(i, "lnr_iata_cd",deleteChar(sheetObj.GetCellValue(i, "lnr_iata_cd"), '', 0));
		sheetObj.SetCellValue(i, "place",deleteChar(sheetObj.GetCellValue(i, "place"), '', 0));
		sheetObj.SetCellValue(i, "carry_place",deleteChar(sheetObj.GetCellValue(i, "carry_place"), '', 0));
		sheetObj.SetCellValue(i, "mbl_cne_cd",deleteChar(sheetObj.GetCellValue(i, "mbl_cne_cd"), '', 0));
		sheetObj.SetCellValue(i, "mbl_cne_nm",deleteChar(sheetObj.GetCellValue(i, "mbl_cne_nm"), '-/. ', 0));
	}
}
/*
 * 자리수를 체크한다.
 */
function lenFunction(){
}
/*
 * 필수 입력값을 체크한다.
 */
function mandatoryFunction(){
	var sheetObj=docObjects[1];
	var rows=sheetObj.LastRow()+1;
	
	//0 master pcs, weight와 house pcs, wegiht 값이 0이면 안된다.
	for(var i=2 ; i<rows ; i++){
		if(sheetObj.GetCellValue(i, "mbi_no_of_pcs")==0){
			//MAWB Pcs is over zero.
			alert(getLabel('EDI_COM_ALT001'));
			return;
		}
		if(sheetObj.GetCellValue(i, "mbi_wgt")==0){
			//MAWB Weight is over zero.
			alert(getLabel('EDI_COM_ALT002'));
			return;
		}
		if(sheetObj.GetCellValue(i, "hbs_no_of_pcs")==0){
			//HAWB Pcs is over zero.
			alert(getLabel('EDI_COM_ALT001'));
			return;
		}
		if(sheetObj.GetCellValue(i, "hbs_wgt")==0){
			//HAWB Weight is over zero.
			alert(getLabel('EDI_COM_ALT002'));
			return;
		}
	}
	//1 master pcs, weight 일치하는지
	var mbl_pcs=0;
	var mbl_wgt=0;
	if(rows>3){
		mbl_pcs=sheetObj.GetCellValue(2, "mbi_no_of_pcs");
		mbl_wgt=sheetObj.GetCellValue(2, "mbi_wgt");
		for(var j=3 ; j<rows ; j++){
			if(mbl_pcs!=sheetObj.GetCellValue(j, "mbi_no_of_pcs")){
				//MAWB Pcs is not same.
				alert(getLabel('EDI_COM_ALT005'));
				return false;
			}
			if(mbl_wgt!=sheetObj.GetCellValue(j, "mbi_wgt")){
				//MAWB Weight is not same.
				alert(getLabel('EDI_COM_ALT006'));
				return false;
			}
		}
	}
	else if(rows==3){
		mbl_pcs=sheetObj.GetCellValue(2, "mbi_no_of_pcs");
		mbl_wgt=sheetObj.GetCellValue(2, "mbi_wgt");
	}
	else{
		//Please select MAWB
		alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_MAWB'));
		return false;
	}
	//2 HAWB 전체 합과 일치 하는지
	var hbl_pcs=0;
	var hbl_wgt=0;
	for(var l=2 ; l<rows ; l++){
		hbl_pcs += parseInt(sheetObj.GetCellValue(l, "hbs_no_of_pcs"));
		hbl_wgt += parseFloat(sheetObj.GetCellValue(l, "hbs_wgt"));
	}
	if(mbl_pcs-hbl_pcs!=0){
		//MAWB Pcs and HAWB Pcs are not match. 
		alert(getLabel('EDI_COM_ALT007'));
		return false;
	}
	//소수점 두자리 유지
	if(mbl_wgt-hbl_wgt.toFixed(2)!=0){
		//MAWB Weight and HAWB Weight are not match
		alert(getLabel('EDI_COM_ALT008'));
		return false;
	}
	for(var k=2 ; k<rows ; k++){
		//shipper
		if(sheetObj.GetCellValue(k, "shp_nm")==""){
			//Shipper name info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_SHIP'));
			sheetObj.SelectCell(k, "shp_nm");
			return false;
		}
		if(sheetObj.GetCellValue(k, "shp_addr")==""){
			//Shipper address info. is mandatory
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_SHIP'));
			sheetObj.SelectCell(k, "shp_addr");
			return false;
		}
		if(sheetObj.GetCellValue(k, "shp_city")==""){
			//Shipper city info. is mandatory
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_SHIP'));
			sheetObj.SelectCell(k, "shp_city");
			return false;
		}
		if(sheetObj.GetCellValue(k, "shp_cntry")==""){
			//Shipper country info. is mandatory
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_SHIP'));
			sheetObj.SelectCell(k, "shp_cntry");
			return false;
		}
		//consignee
		if(sheetObj.GetCellValue(k, "cne_nm")==""){
			//Consignee name info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_CNEE'));
			sheetObj.SelectCell(k, "cne_nm");
			return false;
		}
		if(sheetObj.GetCellValue(k, "cne_addr")==""){
			//Consignee address info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_CNEE'));
			sheetObj.SelectCell(k, "cne_addr");
			return false;
		}
		if(sheetObj.GetCellValue(k, "cne_city")==""){
			//Consignee city info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_CNEE'));
			sheetObj.SelectCell(k, "cne_city");
			return false;
		}
		if(sheetObj.GetCellValue(k, "cne_cntry")==""){
			//Consignee country info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('FMS_COD_CNEE'));
			return false;
		}
		//cvd info.
		if(sheetObj.GetCellValue(k, "cvd_iso_curr_cd")==""){
			//ISO currency code info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_ISOC'));
			sheetObj.SelectCell(k, "cvd_iso_curr_cd");
			return false;
		}
		if(sheetObj.GetCellValue(k, "cvd_pc_term")==""){
			//PP/CC info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_PPCC'));
			sheetObj.SelectCell(k, "cvd_pc_term");
			return false;
		}
		if(sheetObj.GetCellValue(k, "cvd_val_carr")==""){
			//Value for Carriage Declaration info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_CADI'));
			sheetObj.SelectCell(k, "cvd_val_carr");
			return false;
		}
		if(sheetObj.GetCellValue(k, "cvd_val_cust")==""){
			//Value for Customs Declaration info. is mandatory
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_CUDI'));
			sheetObj.SelectCell(k, "cvd_val_cust");
			return false;
		}
		if(sheetObj.GetCellValue(k, "cvd_val_insu")==""){
			//Value for Insurance Declaration info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_INDI'));
			sheetObj.SelectCell(k, "cvd_val_insu");
			return false;
		}
		//oci info.
		if(sheetObj.GetCellValue(k, "oci_supp_cus_info")==""){
			//Supplementary Information Identifier info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_SIII'));
			return false;
		}
		//mawb info.
		if(sheetObj.GetCellValue(k, "mbi_air_pfx")==""){
			//MAWB prefix info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_MPRE'));
			sheetObj.SelectCell(k, "mbi_air_pfx");
			return false;
		}
		if(sheetObj.GetCellValue(k, "mbi_awbl_no")==""){
			//MAWB No. info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_MNO.'));
			sheetObj.SelectCell(k, "mbi_awbl_no");
			return false;
		}
		if(sheetObj.GetCellValue(k, "mbi_org_port")==""){
			//MAWB origin info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_MORI'));
			sheetObj.SelectCell(k, "mbi_org_port");
			return false;
		}
		if(sheetObj.GetCellValue(k, "mbi_dest_port")==""){
			//MAWB destination info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_MORI'));
			sheetObj.SelectCell(k, "mbi_dest_port");
			return false;
		}
		if(sheetObj.GetCellValue(k, "mbi_ship_desc_cd")==""){
			//Shipment Description Code info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_SHDE'));
			sheetObj.SelectCell(k, "mbi_ship_desc_cd");
			return false;
		}
		if(sheetObj.GetCellValue(k, "mbi_no_of_pcs")==""){
			//MAWB PCS info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_MPCS'));
			sheetObj.SelectCell(k, "mbi_no_of_pcs");
			return false;
		}
		if(sheetObj.GetCellValue(k, "mbi_wgt_cd")==""){
			//MAWB weight unit code info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_MWUC'));
			return false;
		}
		if(sheetObj.GetCellValue(k, "mbi_wgt")==""){
			//MAWB weight info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_MWGT'));
			sheetObj.SelectCell(k, "mbi_wgt");
			return false;
		}
		//hawb info.
		if(sheetObj.GetCellValue(k, "hbs_hawbl_no")==""){
			//HAWB No. info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_HNO.'));
			sheetObj.SelectCell(k, "hbs_hawbl_no");
			return false;
		}
		if(sheetObj.GetCellValue(k, "hbs_org_port")==""){
			//HAWB origin info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_HORI'));
			sheetObj.SelectCell(k, "hbs_org_port");
			return false;
		}
		if(sheetObj.GetCellValue(k, "hbs_dest_port")==""){
			//HAWB destination info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_HDES'));
			sheetObj.SelectCell(k, "hbs_dest_port");
			return false;
		}
		if(sheetObj.GetCellValue(k, "hbs_no_of_pcs")==""){
			//HAWB PCS info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_HPCS'));
			sheetObj.SelectCell(k, "hbs_no_of_pcs");
			return false;
		}
		if(sheetObj.GetCellValue(k, "hbs_wgt_cd")==""){
			//HAWB weight unit code info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_HWUC'));
			sheetObj.SelectCell(k, "hbs_wgt_cd");
			return false;
		}
		if(sheetObj.GetCellValue(k, "hbs_wgt")==""){
			//HAWB weight info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_HWGT'));
			sheetObj.SelectCell(k, "hbs_wgt");
			return false;
		}
		if(sheetObj.GetCellValue(k, "hbs_gds_desc")==""){
			//Manifest Description of Goods info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_MDGD'));
			sheetObj.SelectCell(k, "hbs_gds_desc");
			return false;
		}
//		if(sheetObj.CellValue(k, "hbs_handle_cd_1")==""){
//			Special Handling Code2 info. is mandatory. alert
//			return false;
//		}
//		if(sheetObj.CellValue(k, "hbs_handle_cd_2")==""){
//			Special Handling Code2 info. is mandatory. alert
//			return false;
//		}
		//txt info.
		if(sheetObj.GetCellValue(k, "eta_dt_tm")==""){
			//ETA date info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_ETA_'));
			sheetObj.SelectCell(k, "eta_dt_tm");
			return false;
		}
		if(sheetObj.GetCellValue(k, "flt_no")==""){
			//Flight No. info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_FNO.'));
			sheetObj.SelectCell(k, "flt_no");
			return false;
		}
		if(sheetObj.GetCellValue(k, "lnr_iata_cd")==""){
			//Liner Iata code info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_IATA'));
			sheetObj.SelectCell(k, "lnr_iata_cd");
			return false;
		}
		if(sheetObj.GetCellValue(k, "mbl_cne_cd")==""){
			//MAWB Consignee Deconsol code info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_MCDC'));
			sheetObj.SelectCell(k, "mbl_cne_cd");
			return false;
		}
		if(sheetObj.GetCellValue(k, "mbl_cne_nm")==""){
			//MAWB Consignee name info. is mandatory.
			alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('EDI_COD_MCNM'));
			sheetObj.SelectCell(k, "mbl_cne_nm");
			return false;
		}
		//#6717 [IMPEX, BNX, BINEX] KAMS LOGIC CHANGE RELATED ASIANA [ CHANGE APPLIED : July 1st ]
		var hbs_org_cntry = sheetObj.GetCellValue(k, "hbs_org_cntry");
		var lnr_iata_cd = sheetObj.GetCellValue(k, "lnr_iata_cd");
		var oci_exp_dt = sheetObj.GetCellValue(k, "oci_exp_date");
		var oci_supp_cus_info2 = sheetObj.GetCellValue(k, "oci_supp_cus_info2");
		var oci_cus_info_id = sheetObj.GetCellValue(k, "oci_cus_info_id");
		if(hbs_org_cntry == "DE" && lnr_iata_cd == "OZ"){
			if(oci_supp_cus_info2==""){
				alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('OCI_SUPP_CUS_INFO2'));
				sheetObj.SelectCell(k, "oci_supp_cus_info2");
				return false;
			}
			if(oci_exp_dt==""){
				alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('OCI_EXP_DATE'));
				sheetObj.SelectCell(k, "oci_exp_date");
				return false;
			}
			if(oci_cus_info_id=="M" || oci_cus_info_id==""){
				alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('OCI_CUS_INFO_ID'));
				sheetObj.SelectCell(k, "oci_cus_info_id");
				return false;
			}
		}
		
	}
	return true;
}
function entSearch(){
	if(event.keyCode == 13){
		doWork('SEARCHLIST')
	}
}
function deleteChar(text, char, mode){
	var alpha='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var numeric='1234567890.';
	var checkStr='';
	var line='\r\n';
	if(mode==0){
		checkStr=alpha + numeric + char + line;
	}else if(mode==1){
		checkStr=alpha + char + line;
	}else if(mode==2){
		checkStr=numeric + char + line;
	}else{
		checkStr=char + line;
	}
	var result='';
	for(var i=0 ; i<text.length ; i++){
		if(checkStr.indexOf(text.substring(i, i+1)) < 0){
		}else{
			result += text.substring(i, i+1);
		}
	}
	return result.toUpperCase();
}
//--------------------------------------------------------------------------------------------------------------
//Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
function goTabSelect(isNumSep) {
	var tabObjs=document.getElementsByName('tabLayer');
	if( isNumSep == "01" ) {
		currTab=isNumSep;	//탭상태저장
		tabObjs[0].style.display='inline';
		tabObjs[1].style.display='none';
	}else if( isNumSep == "02" ) {
		currTab=isNumSep;	//탭상태저장
		tabObjs[0].style.display='none';
		tabObjs[1].style.display="inline";
		frm1.send_msg_txt.value='';
		doWork("SEARCHLIST03");
	}
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
function sheet2_OnSelectMenu(sheetObj, MenuString){
	var formObj=document.frm1;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col=sheetObj.MouseCol();
			if(sheetObj.ColSaveName(col)==""){
				alert(CM_MSG6);
				return false;
			}
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}


function sheet2_OnChange(sheetObj, row, col, value) {
	switch (sheetObj.ColSaveName(col)) {
		case "mbi_no_of_pcs" :
		case "mbi_wgt" :
		case "hbs_no_of_pcs" :
		case "hbs_wgt" :
			if (value < 0) {
				//Input data must be greater than 0.
				alert(getLabel("FMS_COM_ALT042"));
				sheetObj.CellValue2(row, col) = "";
				sheetObj.SelectCell(row, col);
				return;
			}
		break;
		//#6717 [IMPEX, BNX, BINEX] KAMS LOGIC CHANGE RELATED ASIANA [ CHANGE APPLIED : July 1st ]
		case "oci_exp_date" :
			var date=sheetObj.GetCellValue(row, col);
			var month=date.substring(0,2);
			if ((date.length != 4 || !isMonth( month )) && date!="") {
				sheetObj.SetCellValue(row, col, "");
				alert(getLabel('FMS_COM_ALT040'));
				//return;
			} 
		break;
		case "hbs_org_port" :
			var s_code = sheetObj.GetCellValue(row, col);
			s_type="location";
			ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
	}

}
function sheet2_OnPopupClick(sheetObj, row, col){	
	switch(sheetObj.ColSaveName(col)){
		case 'oci_exp_date': 
			    var celldata = sheetObj.GetCellValue(row,col);        
			    var dtArr = celldata.split("-");
			    celldata =dtArr[0] + "" + dtArr[2];
		        var opt=  { Format:"yyyyMM",CallBack : "dateInsert",CalButtons:"Close"};              
		        IBShowCalendar(celldata, opt);
		 break;
	}
}
function dateInsert(date){
	
	var sheetObj=docObjects[1];
    var row = sheetObj.GetSelectRow();
    var col = sheetObj.GetSelectCol();
    var year = date.substr(2, 2);
    var day = date.substr(4, 2);
    sheetObj.SetCellValue(row,col,day+year);
}
function trdpCdReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	var sheetObj = docObjects[1];
	var row = sheetObj.GetSelectRow();
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('@@;');
			var masterVals = rtnArr[0].split('@@^');
			sheetObj.SetCellValue(row, "hbs_org_cntry", masterVals[2] );
		} else {
			sheetObj.SetCellValue(row, "hbs_org_cntry", "" );
		}
	}
}


//Calendar flag value
var firCalFlag=false;

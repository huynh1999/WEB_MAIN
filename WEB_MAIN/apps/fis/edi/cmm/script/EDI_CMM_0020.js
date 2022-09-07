var sheet1Row = 0;
var sheet1Col = 0;

function doWork(srcName, valObj){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var sheetObj3=docObjects[2];
    var sheetObj4=docObjects[3];
    
    var formObj=document.frm1;
    
    switch(srcName) {
	   case "DEFAULT":
		   formObj.f_cmd.value=-1;
	       formObj.submit();
	   break;
       case "SEARCHLIST":
    	   if(formObj.f_lnr_trdp_cd.value == ""){
    		   alert(getLabel('FMS_COM_ALT014'));
    		   formObj.f_lnr_trdp_cd.focus();
    		   return;
    	   }
    	   if(formObj.f_lnr_trdp_nm.value == ""){
    		   alert(getLabel('FMS_COM_ALT014'));
    		   formObj.f_lnr_trdp_nm.focus();
    		   return;
    	   }
    	   if(formObj.f_trnk_vsl_nm.value == ""){
    		   alert(getLabel('FMS_COM_ALT014'));
    		   formObj.f_trnk_vsl_nm.focus();
    		   return;
    	   }
    	   if(formObj.f_trnk_voy.value == ""){
    		   alert(getLabel('FMS_COM_ALT014'));
    		   formObj.f_trnk_voy.focus();
    		   return;
    	   }
    	   
    	   sheetObj2.RemoveAll();
    	   sheetObj3.RemoveAll();
    	   sheetObj4.RemoveAll();
    	   
    	   formObj.f_cmd.value=SEARCHLIST;
    	   sheetObj.DoSearch("./EDI_CMM_0020GS.clt", FormQueryString(formObj) );
    	   break;
       case "SEARCHLIST01":
			formObj.f_cmd.value=SEARCHLIST01;
			sheetObj2.DoSearch("./EDI_CMM_0020_1GS.clt", FormQueryString(formObj) );
       break;
       case "SEARCHLIST02":
    	   	formObj.f_cmd.value=SEARCHLIST02;
    	   	sheetObj3.DoSearch("./EDI_CMM_0020_2GS.clt", FormQueryString(formObj) );
       break;
       case "SEARCHLIST03":
	   		formObj.f_cmd.value=SEARCHLIST03;
	   		sheetObj4.DoSearch("./EDI_CMM_0020_3GS.clt", FormQueryString(formObj) );
       break;
       case "VALIDATE":
    	   	// validation 체크
    	   	formObj.val_msg.value = "";
    	   	
    	   	if (!siVgmEdiValidation(sheetObj, 'S')){
				return false;
			}
       break;
       case "SAVE":
			var si_chk_cnt = 0;
			
    	   	for(var i=2; i<sheetObj.LastRow() + 1; i++){
    	   		if(sheetObj.GetCellValue(i, "si_send_chk") == "1"){
    		    	si_chk_cnt++;
    				
    		    	var lnrBkgNo = sheetObj.GetCellValue(i, "lnr_bkg_no");
    				var lnrBkgNoArr = lnrBkgNo.split('+');
    				var intRows=0;
    				
    				if (lnrBkgNoArr.length >1) {
    					sheetObj.SetCellValue(i,"si_bl_tp","C",0);
    				}
    		    }
    	   	}
    	   	
    	   	for(var i=1; i<sheetObj3.LastRow() + 1; i++){
    	   		if(sheetObj3.GetRowStatus(i) != "R"){
    		    	si_chk_cnt++;
    		    }
    	   	}
    	   	
			if(si_chk_cnt == 0){
				alert(getLabel('FMS_COM_ALT009'));
				return;
			}
			
			if( confirm(getLabel('FMS_COM_CFMSAV')) ){
				frm1.f_cmd.value=MODIFY;
				var sheetParam=sheetObj3.GetSaveString(false);
				docObjects[0].DoAllSave("./EDI_CMM_0020GS.clt", FormQueryString(frm1)+'&'+sheetParam, true);
			}
       break;
       case "SEND_EDI":
		
			var si_chk_cnt = 0;
			var vgm_chk_cnt = 0;
			
			for(var i=2; i<sheetObj.LastRow() + 1; i++){
				
				if(sheetObj.GetCellValue(i, "si_send_chk") == "1"){
					si_chk_cnt++;
					
					if(sheetObj.GetCellValue(i, "si_msg_sts_nm")=="New"){	
						alert(getLabel('EDI_COM_ALT077'));
						return;
					}
					
					// 전송중 또는 Reject , TRANSMITTED이면 재전송 안되게 -  SAVE먼저 해야함 
					if(sheetObj.GetCellValue(i, "si_msg_sts") == "S" || sheetObj.GetCellValue(i, "si_msg_sts") == "R" || sheetObj.GetCellValue(i, "si_msg_sts") == "T" ){
						//alert("You cannot send data that's already being transmitted. Please wait.");
						alert(getLabel('EDI_COM_ALT076'));
						return;
					}else{
						if(sheetObj.GetCellValue(i, "si_valid_yn") == "" || sheetObj.GetCellValue(i, "si_valid_yn") == "E"){
							alert(getLabel('EDI_COM_ALT079'));
							return;
						}
					}
				}
				if(sheetObj.GetCellValue(i, "vgm_send_chk") == "1"){
					vgm_chk_cnt++;
					
					if(sheetObj.GetCellValue(i, "vgm_valid_yn") == "" || sheetObj.GetCellValue(i, "vgm_valid_yn") == "E"){
						alert(getLabel('EDI_COM_ALT079'));
						return;
					}
				}
			}

			if(si_chk_cnt + vgm_chk_cnt == 0){
				alert(getLabel('FMS_COM_ALT007'));
				return;
			}
			
		    
		    formObj.f_cmd.value=COMMAND01;
		    if(confirm(getLabel('FMS_COM_CFMSENDEDI'))){
		    	sheetObj.DoAllSave("./EDI_CMM_0020GS.clt", FormQueryString(formObj) +'', true);
		    }
        	
       break;
       case "SEND_CANCEL_EDI":
    	   
    	   for(var i=2; i<sheetObj.LastRow() + 1; i++){
    	   	   if(sheetObj.GetCellValue(i, "si_send_chk") == "1"){
	    	   	   alert(getLabel('EDI_COM_ALT245'));
	    	   	   return;
    	   	   }
    	   }
    	   
    	   if (!siVgmEdiValidation(sheetObj, 'C')){
    		   return;
    	   }
    	   formObj.f_cmd.value=COMMAND01;
    	   setTimeout(function(){
			   if(confirm(getLabel('FMS_COM_CFMCAN'))){
			    	sheetObj.DoAllSave("./EDI_CMM_0020GS.clt", FormQueryString(formObj) +'&f_vgm_cancel=Y', false);
			   }
    	   },100);
       break;
       case "CARR_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
    	   rtnary=new Array(1);
    	   rtnary[0]="1";
  	 		
    	   if(typeof(valObj)!='undefined'){
    		   rtnary[1]=valObj;
    	   }else{
    		   rtnary[1]="";
    	   }
    	   rtnary[2]=window;
    	   callBackFunc = "CARR_TRDP_POPLIST";
    	   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650,"yes");
  	 		           
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
	
    if(formObj.p_lnr_trdp_cd.value != "" && formObj.p_lnr_trdp_cd.value != "" && formObj.p_lnr_trdp_cd.value != "" && formObj.p_lnr_trdp_cd.value != ""){
    	formObj.f_lnr_trdp_cd.value = formObj.p_lnr_trdp_cd.value;
    	formObj.f_lnr_trdp_nm.value = formObj.p_lnr_trdp_nm.value;
    	formObj.f_trnk_vsl_nm.value = formObj.p_trnk_vsl_nm.value;
    	formObj.f_trnk_voy.value = formObj.p_trnk_voy.value;
    	
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
	            SetConfig( { SearchMode:2, MergeSheet:8, Page:20, DataRowMerge:0, FrozenCol: 12} );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            
	            //MSG_KEY['EDI_CMM_0020_HDR1_1'] = 'No.|Carrier Bkg. No.|Filling No.|MB/L No.|EDI to Send|EDI to Send|Status|Status|Status|Status|Validate|Validate|Shipper|Shipper|Shipper|Shipper|Shipper|Shipper|Shipper|Shipper|Consignee|Consignee|Consignee|Consignee|Consignee|Consignee|Consignee|Consignee|Notify|Notify|Notify|Notify|Notify|Notify|Notify|Notify|Route(UN Location)|Route(UN Location)|Route(UN Location)|Route(UN Location)|Route(UN Location)|Route(UN Location)|Route(UN Location)|Route(UN Location)|Original B/L|Original B/L|Freight';
	            //MSG_KEY['EDI_CMM_0020_HDR1_2'] = 'No.|Carrier Bkg. No.|Filling No.|MB/L No.|S/I|VGM|si_msg_sts|S/I|vgm_msg_sts|VGM|S/I|VGM|Code|Name|Address|Address|PIC Name|Phone|Fax|Email Address|Code|Name|Address|Address|PIC Name|Phone|Fax|Email Address|Code|Name|Address|Address|PIC Name|Phone|Fax|Email Address|POR|POR Name|POL|POL Name|POD|POD Name|DEL|DEL Name|Type|#|Freight';

	            
	            var headers = [ { Text:getLabel('EDI_CMM_0020_HDR1_1'), Align:"Center"},
	                            { Text:getLabel('EDI_CMM_0020_HDR1_2'), Align:"Center"} ];
	            InitHeaders(headers, info);
	
	            var cols = [ 
	                        {Type:"Seq",       Hidden:0, Width:35,   Align:"Center",  ColMerge:0,   SaveName:"seq" },
			                {Type:"Text",      Hidden:0, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"mbl_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Combo",     Hidden:0, Width:50, 	 Align:"Center",  ColMerge:0,   SaveName:"msg_fnc_cd",    	 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"si_send_chk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"vgm_send_chk",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"si_msg_sts",    	 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"si_msg_sts_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, ToolTip:true },
			                {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"vgm_msg_sts",   	 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"vgm_msg_sts_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, ToolTip:true },
			                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"si_valid_yn",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"vgm_valid_yn",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:150,  Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_addr",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Image",     Hidden:0, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"shpr_img",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:20 },
			                {Type:"Text",      Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"shpr_pic_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"shpr_pic_phn",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"shpr_pic_fax",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"shpr_pic_eml",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:150,  Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_addr",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Image",     Hidden:0, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"cnee_img",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:20 },
			                {Type:"Text",      Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"cnee_pic_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"cnee_pic_phn",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"cnee_pic_fax",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"cnee_pic_eml",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:150,  Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_addr",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Image",     Hidden:0, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ntfy_img",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen:20 },
			                {Type:"Text",      Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"ntfy_pic_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"ntfy_pic_phn",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"ntfy_pic_fax",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"ntfy_pic_eml",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"un_por_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"por_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"un_pol_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"pol_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"un_pod_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"pod_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"PopupEdit", Hidden:0, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"un_del_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"del_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0, Width:170,  Align:"Center",  ColMerge:0,   SaveName:"obl_tp_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			                {Type:"Text",      Hidden:0, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"org_bl_qty",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bl_frt_tp",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:0, Width:500,  Align:"left",  ColMerge:0,   SaveName:"si_rmk",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_trdp_cd" },
			                
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pck_qty" },
		                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pck_ut_cd" },
		                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"grs_wgt" },
		                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"meas" },
		                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_cnt" },
		                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"itn_no" },
		                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"no_name_cntr_cnt" },
		                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"no_tpsz_cntr_cnt" },
		                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"desc_txt" },
		                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"si_err_cd" },
		                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"vgm_err_cd" },
		                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_trdp_cd" },
		                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_trdp_nm" },
		                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_trdp_addr" },
		                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_pic_nm" },
		                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_pic_phn" },
		                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_pic_fax" },
		                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_pic_eml" },
		                    
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"si_msg_no" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"si_msg_no_seq" },
			                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"si_sts" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"si_bl_tp" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"bl_split_cnt" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"vgm_msg_no" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"vgm_msg_no_seq" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"vgm_msg_fnc_cd" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"hbl_cnt" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"item_cnt" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"no_item_desc_wgt_cnt" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"no_item_meas_cnt" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"no_vgm_cgo_wgt_cnt" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"no_vgm_cgo_wgt_tp_cnt" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"no_vgm_dt_cnt" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"no_vgm_tm_cnt" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"no_vgm_method_cnt" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"no_vgm_cntr_tp_cnt" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"no_vgm_spc_trdp_nm_cnt" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"no_vgm_spc_trdp_pic_cnt" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"no_vgm_am_trdp_nm_cnt" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"no_vgm_am_trdp_pic_cnt" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"lloyd_no" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"bkg_agt_trdp_cd" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"bkg_agt_trdp_nm" },
			                {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"cntr_no_chk" },
			                {Type:"Status",    Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"ibflag" },
			                {Type:"Text",      Hidden:1, Width:80,    Align:"Left",    ColMerge:0,   SaveName:"pol_cnt_cd" }
			                ];
	             
	            InitColumns(cols);
	            SetEditable(1);
		        SetImageList(0,"web/img/main/icon_m.gif");
		        SetImageList(1,"web/img/main/icon_m.gif");
		        SetImageList(2,"web/img/main/icon_m.gif");
		        SetColProperty('si_valid_yn', {ComboText:'OK|Error', ComboCode:'O|E'} );
		        SetColProperty('vgm_valid_yn', {ComboText:'OK|Error', ComboCode:'O|E'} );
		        SetColProperty('bl_frt_tp', {ComboText:'Freighted|Unfreighted', ComboCode:'F|U'} );
		        SetColProperty('msg_fnc_cd', {ComboText:'Original|Amend', ComboCode:'9|5'} );
		        SetSheetHeight(340);
		        SetHeaderRowHeight(20);
		        SetHeaderRowHeight(20);
        	}                                                      
		break;
		
        case 2:      //IBSheet2 init
        	with (sheetObj) {
	     	 	SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
		        	 
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('EDI_CMM_0020_HDR2'), Align:"Center"} ];
		        InitHeaders(headers, info);
		        	 
		        var cols = [
		                    {Type:"Seq",       Hidden:0,    Width:35,   Align:"Center",  ColMerge:0,   SaveName:"seq" },
		                    {Type:"Text", 	   Hidden:1, 	Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shp_cmdt_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Text",      Hidden:0,  	Width:120,  Align:"Left",    ColMerge:0,   SaveName:"shp_cmdt_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Text",      Hidden:1, 	Width:0,   	Align:"Center",  ColMerge:1,   SaveName:"pck_ut_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Text",      Hidden:0, 	Width:80,   Align:"Left",    ColMerge:0,   SaveName:"pck_ut_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Int",       Hidden:0,  	Width:50,   Align:"Right",   ColMerge:1,   SaveName:"pck_qty",			   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Text",      Hidden:0,  	Width:150,  Align:"Left",    ColMerge:1,   SaveName:"desc",        		   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"wgt", 				   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Float",     Hidden:0,  	Width:100,  Align:"Right",   ColMerge:1,   SaveName:"meas",   			   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 }
		                    ];
	
	        	InitColumns(cols);
	        	SetEditable(1);
	        	SetSheetHeight(200);
	        	sheetObj.SetFocusAfterProcess(0);
	        }  
    	break;
    	
        case 3:      //IBSheet3 init
        	with(sheetObj){
			
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );
				
				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				//MSG_KEY['	'] = 'No.|ibflag|Container No|TP/SZ|Weight K|CBM|Seal No|Type|Seal No2|Type|VGM Weight|Type|Date|Time|Method|Supplier|Customer(SPC)|Customer(SPC)|PIC Name(SPC)|Customer(AM)|Customer(AM)|PIC Name(AM)||';
	 			var headers = [ { Text:getLabel('EDI_CMM_0020_HDR3'), Align:"Center"} ];
	 			InitHeaders(headers, info);
				
				var cols = [ 
				            {Type:"Seq",       Hidden:0,  Width:35,   Align:"Center",  ColMerge:0,   SaveName:"seq" },
				            {Type:"Status",    Hidden:1,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"vgmls_ibflag" },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:14 },
				            {Type:"Text",      Hidden:0,  Width:50,  Align:"Center",    ColMerge:0,   SaveName:"cntr_tpsz_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:14 },
				            {Type:"Text",      Hidden:0,  Width:80,  Align:"Right",    ColMerge:0,   SaveName:"cgo_wgt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:14 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Right",    ColMerge:0,   SaveName:"cgo_meas",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:14 },
				            {Type:"Text",      Hidden:1,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"seal_no1",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
				            {Type:"Combo",     Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"seal_tp1",         	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:1,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"seal_no2",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
				            {Type:"Combo",     Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"seal_tp2",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Float",     Hidden:10, Width:90,   Align:"Right",   ColMerge:0,   SaveName:"vgm_cgo_wgt",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
				            {Type:"Combo",     Hidden:0,  Width:50,   Align:"Left",    ColMerge:0,   SaveName:"vgm_cgo_wgt_tp",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"vgm_dt",      		KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"vgm_tm",      		KeyField:0,   CalcLogic:"",   Format:"Hm",          PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Combo",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"vgm_method",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Combo",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"vgm_cntr_tp",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"PopupEdit", Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"vgm_spc_trdp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
				            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"vgm_spc_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
				            {Type:"Text",      Hidden:0,  Width:95,   Align:"Left",    ColMerge:1,   SaveName:"vgm_spc_trdp_pic",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
				            {Type:"PopupEdit", Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"vgm_am_trdp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		    	            {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"vgm_am_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
		    	            {Type:"Text",      Hidden:0,  Width:95,   Align:"Left",    ColMerge:1,   SaveName:"vgm_am_trdp_pic",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
		    	            {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"vgm_seq",       	    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"vgm_intg_bl_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				            {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_list_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } 
				            ];
				
				InitColumns(cols);
				
				SetEditable(1);
				SetUseDefaultTime(0);
	            SetColProperty('seal_tp1', {ComboText:SEALPTYCD1, ComboCode:SEALPTYCD2} );
	            SetColProperty('seal_tp2', {ComboText:SEALPTYCD1, ComboCode:SEALPTYCD2} );
				SetColProperty('vgm_cgo_wgt_tp',{ComboText:VGMWGTCD1, ComboCode:VGMWGTCD2} );
				SetColProperty('vgm_method', {ComboText:VGMMETHODCD1, ComboCode:VGMMETHODCD2} );
				SetColProperty('vgm_cntr_tp', {ComboText:VGMCNTRTPCD1, ComboCode:VGMCNTRTPCD2});
				SetColProperty(0 ,"vgm_spc_trdp_nm" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
				SetColProperty(0 ,"vgm_spc_trdp_pic" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
				SetColProperty(0 ,"vgm_am_trdp_nm" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
				SetColProperty(0 ,"vgm_am_trdp_pic" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
				SetSheetHeight(200);
				sheetObj.SetFocusAfterProcess(0);
	 		}
 		break;
 		
        case 4:      //IBSheet4 init
     	    with(sheetObj){
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('EDI_CMM_0020_HDR4'), Align:"Center"} ];
		        InitHeaders(headers, info);
		
		        var cols = [ 
		                    {Type:"Combo",     Hidden:0,  Width:60,   Align:"Left",    ColMerge:0,   SaveName:"rcv_edi_type",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Combo",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"rcv_msg_fnc_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Combo",     Hidden:0,  Width:60,   Align:"Left",    ColMerge:0,   SaveName:"rcv_msg_sts",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Combo",     Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"rcv_ack_type",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Combo",     Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"rcv_ack_sts",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"rcv_doc_dt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"rcv_err_msg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    {Type:"Text",      Hidden:1,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"rcv_msg_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                    {Type:"Text",      Hidden:1,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"rcv_msg_no_seq",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                    {Type:"Text",      Hidden:1,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"rcv_file_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                    ];
		         
		        InitColumns(cols);
		        SetEditable(1);
		        SetColProperty('rcv_edi_type', {ComboText:'S/I|VGM', ComboCode:'S|V'} );
		        SetColProperty('rcv_msg_fnc_cd', {ComboText:'Update|Original', ComboCode:'5|9'} );
		        SetColProperty('rcv_msg_sts', {ComboText:'Created|Sent|Accepted|Rejected', ComboCode:'C|S|A|R'} );
		        SetColProperty('rcv_ack_type', {ComboText:'CONTRL|APERAK', ComboCode:'SYS|APP'} );
		        SetColProperty('rcv_ack_sts', {ComboText:'Accept|Error|Reject', ComboCode:'ACP|ERR|REJ'} );
		        SetSheetHeight(200);
		        sheetObj.SetFocusAfterProcess(0);
		    }      
	    break;
    }
}

function sheet1_OnClick(sheetObj, Row, Col){
	var formObj=document.frm1;
	var colName=sheetObj.ColSaveName(Col);
	
	if(colName == "ref_no" || colName == "msg_fnc_cd"){
		return;
	}
	
	formObj.intg_bl_seq.value = sheetObj.GetCellValue(Row, "intg_bl_seq");
	formObj.vgm_valid_yn.value = sheetObj.GetCellValue(Row, "vgm_valid_yn");
	formObj.si_valid_yn.value = sheetObj.GetCellValue(Row, "si_valid_yn");
	
	doWork('SEARCHLIST01');
	doWork('SEARCHLIST02');
	doWork("SEARCHLIST03");
		
	if (colName == "cnee_img") {
		ComShowMemoPad4(sheetObj, Row, "cnee_trdp_addr", false, 220, 120, 22, "cnee_trdp_addr");   
		
	}else if (colName == "shpr_img") {
		ComShowMemoPad4(sheetObj, Row, "shpr_trdp_addr", false, 220, 120, 14, "shpr_trdp_addr");   
		
	}else if (colName == "ntfy_img") {
		ComShowMemoPad4(sheetObj, Row, "ntfy_trdp_addr", false, 220, 120, 30, "ntfy_trdp_addr");   
		
	}
	
	if(colName == "si_rmk") {
		sheet1Row = Row;
		sheet1Col = Col;
	}else{
		sheet1Row = 0;
		sheet1Col = 0;
	}
}

function sheet1_OnMouseMove(sheetObj, Button, Shift, X, Y){
	var col=sheetObj.MouseCol();
    var row=sheetObj.MouseRow();
    var colName=sheetObj.ColSaveName(col);
    if(colName == "cnee_img" || colName == "shpr_img" || colName == "ntfy_img"){
   		sheetObj.SetMousePointer("Hand");
    }else{
    	sheetObj.SetMousePointer("Default");
    }    
}

function sheet4_OnClick(sheet, row, col){
	//frm1.send_msg_txt.value=sheet.GetCellValue(row, "msg_txt");
}

function sheet1_OnDblClick(sheetObj,Row,Col){	
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr=="ref_no"){
		var formObj=document.frm1;
		doProcess=true;
		formObj.f_cmd.value="";
		var paramStr="./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST+'&f_ref_no='+escape(sheetObj.GetCellValue(Row, 'ref_no'))+"&f_intg_bl_seq="+sheetObj.GetCellValue(Row, "intg_bl_seq");
	   	parent.mkNewFrame('Master B/L Entry', paramStr, "SEE_BMD_0040_SHEET_" + sheetObj.GetCellValue(Row, 'ref_no')+"_"+sheetObj.GetCellValue(Row, "intg_bl_seq"));
	}
}

function sheet1_OnSearchEnd(sheetObj, Row, Col){
	
	frm1.val_msg.value = "";
	
	for(var i=2 ; i<sheetObj.LastRow() + 1 ; i++){
		if(sheetObj.GetCellValue(i, "ref_no") != ""){
			sheetObj.SetCellFontColor(i,'ref_no',"#0000FF");
		}
		sheetObj.SetCellImage(i, "cnee_img", 0);
		sheetObj.SetCellImage(i, "shpr_img", 0);
		sheetObj.SetCellImage(i, "ntfy_img", 0);
		
		var si_msg_sts = sheetObj.GetCellValue(i,"si_msg_sts");
		
		if("" == si_msg_sts){
			var si_sts = sheetObj.GetCellValue(i,"si_sts");
			if (si_sts=="C") {
				sheetObj.SetCellValue(i,"si_msg_sts_nm","Saved",0);
			} else{
				sheetObj.SetCellValue(i,"si_msg_sts_nm","New",0);
			}
			//#1375 hskang SI EDI Combine, split rmk 처리
			countSameCarrbkgNo(sheetObj, i, Col);
		}	
		
		var si_msg_sts_nm = sheetObj.GetCellValue(i, "si_msg_sts_nm");
		if (si_msg_sts_nm == "Error"){
			var siErrCd = sheetObj.GetCellValue(i, "si_err_cd");
			sheetObj.SetToolTipText(i, "si_msg_sts_nm", siErrCd);
		}
		
		var vgm_msg_sts = sheetObj.GetCellValue(i,"vgm_msg_sts");
		
		if("" == vgm_msg_sts){
			var si_sts = sheetObj.GetCellValue(i,"si_sts");
			if (si_sts=="C") {
				sheetObj.SetCellValue(i,"vgm_msg_sts_nm","Saved",0);
			} else{
				sheetObj.SetCellValue(i,"vgm_msg_sts_nm","New",0);
			}
		}	
		
		var vgm_msg_sts_nm = sheetObj.GetCellValue(i, "vgm_msg_sts_nm");
		if (vgm_msg_sts_nm == "Error"){
			var vgmErrCd = sheetObj.GetCellValue(i, "vgm_err_cd");
			sheetObj.SetToolTipText(i, "vgm_msg_sts_nm", vgmErrCd);
		}
		
		var bl_frt_tp = sheetObj.GetCellValue(i, "bl_frt_tp");
		if(bl_frt_tp == ""){
			sheetObj.SetCellValue(i,"bl_frt_tp","F",0);
		}
		
		var org_bl_qty = sheetObj.GetCellValue(i,"org_bl_qty");
		if (org_bl_qty == ""){
			sheetObj.SetCellValue(i, "org_bl_qty", 0, 0);
		}
		
		
		//#1375 hskang
		
		
		
		//sheetObj.SetRowStatus(i, "R");
	}
}

function sheet2_OnSearchEnd(sheetObj, Row, Col){
	var formObj=document.frm1;
	if(formObj.si_valid_yn.value != ""){
		for(var i=1 ; i<sheetObj.LastRow() + 1 ; i++){
			spiItemListValidate(sheetObj, i);
		}
	}
}

function sheet3_OnSearchEnd(sheetObj, Row, Col){
	var formObj=document.frm1;
	if(formObj.vgm_valid_yn.value != ""){
		for(var i=1 ; i<sheetObj.LastRow() + 1 ; i++){
			vgmCntrListValidate(sheetObj, i);
		}
	}
	
	for(var i=1 ; i<sheetObj.LastRow() + 1 ; i++){
		cntrNoValidate(sheetObj, i);
	}
	
	if(sheet1Row > 0 ){
		var sheetObj1=docObjects[0];
		
		sheetObj1.SelectCell(sheet1Row, sheet1Col, true);		
	}
}

function cntrNumChk(strCntrNo){
    var cntrLen=strCntrNo.length;
    if(cntrLen!=11){
        return false;
    }else{
        var cntrNo=strCntrNo.substr(0,10);
        var chkDgt;
        var cntr;
        var i=0;
        var temp=0;
        var total=0;
        while(i < 10){
            cntr=cntrNo.substr(i,1);
            if(cntr.charCodeAt(0) >= "A".charCodeAt(0) && cntr.charCodeAt(0) <= "Z".charCodeAt(0)){
                temp=cntr.charCodeAt(0) - 55;
                if(cntr.charCodeAt(0) >= "B".charCodeAt(0) && cntr.charCodeAt(0) <= "K".charCodeAt(0)){
                    temp=temp + 1;
                }else if(cntr.charCodeAt(0) >= "L".charCodeAt(0) && cntr.charCodeAt(0) <= "U".charCodeAt(0)){
                    temp=temp + 2;
                }else if(cntr.charCodeAt(0) >= "V".charCodeAt(0) && cntr.charCodeAt(0) <= "Z".charCodeAt(0)){
                    temp=temp + 3;
                }
            }else{
                temp=cntr.charCodeAt(0) - 48;
            }
            total=total + Math.pow(2, i) * temp;
            i++;
        }
        total=total % 11;
        if(total >= 10){
            total=total - 10;
        }
        chkDgt=cntrNo + total;
        if(strCntrNo != chkDgt){
            return false;
        }else{
            return true;
        }
    }
}
function cntrNoValidate(sheetObj, row){
	var cntrNo = trim(sheetObj.GetCellValue(row,"cntr_no"));
	if(!cntrNumChk(cntrNo)){
		//sheetObj.SetCellBackColor(row, "cntr_no", "#FFA7A7");
		docObjects[0].SetCellValue(docObjects[0].GetSelectRow(),'cntr_no_chk','N', 0);
	} 
}

function vgmCntrListValidate(sheetObj, row){
	//Container No Check
	if(sheetObj.GetCellValue(row,"cntr_no") == ""){
		sheetObj.SetCellBackColor(row, "cntr_no", "#FFA7A7");
	} else {
		sheetObj.SetCellBackColor(row, "cntr_no", "#8BBDFF");
	}

	//VGM Weight Check 
	if(sheetObj.GetCellValue(row,"vgm_cgo_wgt") == "" || sheetObj.GetCellValue(row,"vgm_cgo_wgt") == "0"){
		sheetObj.SetCellBackColor(row, "vgm_cgo_wgt", "#FFA7A7");
	} else {
		sheetObj.SetCellBackColor(row, "vgm_cgo_wgt", "#8BBDFF");
	}

	//VGM Type Check 
	if(sheetObj.GetCellValue(row,"vgm_cgo_wgt_tp") == ""){
		sheetObj.SetCellBackColor(row, "vgm_cgo_wgt_tp", "#FFA7A7");
	} else {
		sheetObj.SetCellBackColor(row, "vgm_cgo_wgt_tp", "#8BBDFF");
	}

	//VGM Date Check 
	if(sheetObj.GetCellValue(row,"vgm_dt") == ""){
		sheetObj.SetCellBackColor(row, "vgm_dt", "#FFA7A7");
	} else {
		sheetObj.SetCellBackColor(row, "vgm_dt", "#8BBDFF");
	}

	//VGM Time Check 
	if(sheetObj.GetCellValue(row,"vgm_tm") == ""){
		sheetObj.SetCellBackColor(row, "vgm_tm", "#FFA7A7");
	} else {
		sheetObj.SetCellBackColor(row, "vgm_tm", "#8BBDFF");
	}

	//VGM Method Check 
	if(sheetObj.GetCellValue(row,"vgm_method") == ""){
		sheetObj.SetCellBackColor(row, "vgm_method", "#FFA7A7");
	} else {
		sheetObj.SetCellBackColor(row, "vgm_method", "#8BBDFF");
	}

	//VGM Supplier Check 
	if(sheetObj.GetCellValue(row,"vgm_cntr_tp") == ""){
		sheetObj.SetCellBackColor(row, "vgm_cntr_tp", "#FFA7A7");
	} else {
		sheetObj.SetCellBackColor(row, "vgm_cntr_tp", "#8BBDFF");
	}

	//VGM SPC NM Check 
	if(sheetObj.GetCellValue(row,"vgm_spc_trdp_nm") == ""){
		sheetObj.SetCellBackColor(row, "vgm_spc_trdp_nm", "#FFA7A7");
	} else {
		sheetObj.SetCellBackColor(row, "vgm_spc_trdp_nm", "#8BBDFF");
	}

	//VGM SPC PIC Check 
	if(sheetObj.GetCellValue(row,"vgm_spc_trdp_pic") == ""){
		sheetObj.SetCellBackColor(row, "vgm_spc_trdp_pic", "#FFA7A7");
	} else {
		sheetObj.SetCellBackColor(row, "vgm_spc_trdp_pic", "#8BBDFF");
	}

	//VGM AM NM이 있을경우 AM PIC Check 또는  VGM AM PIC가 있을경우 AM NM Check 
	if(sheetObj.GetCellValue(row,"vgm_am_trdp_nm") == "" && sheetObj.GetCellValue(row,"vgm_am_trdp_pic") != ""){
		sheetObj.SetCellBackColor(row, "vgm_am_trdp_nm", "#FFA7A7");
	} else {
		sheetObj.SetCellBackColor(row, "vgm_am_trdp_nm", "#8BBDFF");
	}

	if(sheetObj.GetCellValue(row,"vgm_am_trdp_nm") != "" && sheetObj.GetCellValue(row,"vgm_am_trdp_pic") == ""){
		sheetObj.SetCellBackColor(row, "vgm_am_trdp_pic", "#FFA7A7");
	} else {
		sheetObj.SetCellBackColor(row, "vgm_am_trdp_pic", "#8BBDFF");
	}
}

function spiItemListValidate(sheetObj, row){
	//Description Check
	if(sheetObj.GetCellValue(row,"desc") == ""){
		sheetObj.SetCellBackColor(row, "desc", "#FFA7A7");
	} else {
		sheetObj.SetCellBackColor(row, "desc", "#8BBDFF");
	}

	//Weight Check 
	if(sheetObj.GetCellValue(row,"wgt") == "" || sheetObj.GetCellValue(row,"wgt") == "0"){
		sheetObj.SetCellBackColor(row, "wgt", "#FFA7A7");
	} else {
		sheetObj.SetCellBackColor(row, "wgt", "#8BBDFF");
	}
}

function sheet1_OnSaveEnd(sheet, errMsg){
	doWork('SEARCHLIST');
}

function entSearch(){
	if(event.keyCode == 13){
		doWork('SEARCHLIST')
	}
}

function getPageURL() {
	return document.getElementById("pageurl").value;
}

var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}		
	var s_type="";
	if ( tmp == "onKeyDown" ) {
		if (event.keyCode == 13){
			CODETYPE=str;		
			var sub_str=str.substring(0,8);
			if(sub_str=="trdpCode"){
				s_type=sub_str;
			}else{
				s_type=str;
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
		}
	} else if ( tmp == "onBlur" ) {
		CODETYPE=str;		
		var sub_str=str.substring(0,8);
		if(sub_str=="trdpCode"){
			s_type=sub_str;
		}else{
			s_type=str;
		}
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
	}else if ( tmp == "onChange" ) {
		CODETYPE=str;
		var sub_str=str.substring(0,str.indexOf("_s"));
		s_type=sub_str;
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
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
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "trdpCode"){
				formObj.f_lnr_trdp_cd.value=masterVals[0]; 
				formObj.f_lnr_trdp_nm.value=masterVals[3];
			}
		}else{
			if(CODETYPE == "trdpCode"){
				formObj.f_lnr_trdp_cd.value=""; 
				formObj.f_lnr_trdp_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

function CARR_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_lnr_trdp_cd.value=rtnValAry[0];
		formObj.f_lnr_trdp_nm.value=rtnValAry[2];
	}  
}

var cur_row = 0;
var cur_col = 0;

function sheet1_OnPopupClick(sheetObj, Row, Col){
	cur_row = Row;
    switch (sheetObj.ColSaveName(Col)) {
	    case "un_por_cd" :
	    	rtnary=new Array();
	   		rtnary[0]="";
	   		rtnary[1]="";
	   		rtnary[2]="";
	   		callBackFunc = "setUnPorLocCd";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806, 415, "yes");
	    break;
	    case "un_pol_cd" :
	    	rtnary=new Array();
	   		rtnary[0]="";
	   		rtnary[1]="";
	   		rtnary[2]="";
	   		callBackFunc = "setUnPolLocCd";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806, 415, "yes");
	    break;
	    case "un_pod_cd" :
	    	rtnary=new Array();
	   		rtnary[0]="";
	   		rtnary[1]="";
	   		rtnary[2]="";
	   		callBackFunc = "setUnPodLocCd";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806, 415, "yes");
	    break;
	    case "un_del_cd" :
	    	rtnary=new Array();
	   		rtnary[0]="";
	   		rtnary[1]="";
	   		rtnary[2]="";
	   		callBackFunc = "setUnDelLocCd";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806, 415, "yes");
	    break;
    }
}

function sheet1_OnChange(sheetObj, Row, Col){
	switch (sheetObj.ColSaveName(Col)) {
		case "un_por_cd" :
			var codeStr =  sheetObj.GetCellValue(Row, Col);
			if(codeStr.length >= 2){
				sheetObj.SetCellValue(Row, 'por_nm', '', 0);
				doAutoSearch(sheetObj, Row, Col, 'location_un', codeStr, 'un_por_cd', 'por_nm');
			}
		break;
    	case "un_pol_cd" :
    		var codeStr =  sheetObj.GetCellValue(Row, Col);
    		if(codeStr.length >= 2){
    			sheetObj.SetCellValue(Row, 'pol_nm', '', 0);
    			doAutoSearch(sheetObj, Row, Col, 'location_un', codeStr, 'un_pol_cd', 'pol_nm');	
    		}
		break;
    	case "un_pod_cd" :
			var codeStr =  sheetObj.GetCellValue(Row, Col);
			if(codeStr.length >= 2){f
				sheetObj.SetCellValue(Row, 'pod_nm', '', 0);
				doAutoSearch(sheetObj, Row, Col, 'location_un', codeStr, 'un_pod_cd', 'pod_nm');	
			}
		break;
    	case "un_del_cd" :
    		var codeStr =  sheetObj.GetCellValue(Row, Col);
    		if(codeStr.length >= 2){
    			sheetObj.SetCellValue(Row, 'del_nm', '', 0);
    			doAutoSearch(sheetObj, Row, Col, 'location_un', codeStr, 'un_del_cd', 'del_nm');
    		}
		break;
    	case "si_send_chk" :
    		var lnrBkgNo = sheetObj.GetCellValue(Row,"lnr_bkg_no");
    		var setValue = sheetObj.GetCellValue(Row,"si_send_chk");
    		
    		for(var i=2;i<sheetObj.LastRow() + 1;i++){
    			if(i == Row){
    				continue;
    			}

    			var bkgNo = sheetObj.GetCellValue(i,"lnr_bkg_no");
    			if(lnrBkgNo == bkgNo){
    				if(lnrBkgNo == ""){
    					break;
    				}
    				 sheetObj.SetCellValue(i,"si_send_chk",setValue,0);
    			}
    		}
    		
    	break;
	}
}

function sheet3_OnPopupClick(sheetObj, Row, Col){
	cur_row = Row;
    switch (sheetObj.ColSaveName(Col)) {
	    case "vgm_am_trdp_cd" :
	        rtnary=new Array();
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]=window;
	   		callBackFunc = "setVgmAmTrdpCd";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	    break;
	    case "vgm_spc_trdp_cd" :
	    	rtnary=new Array();
	    	rtnary[0]="1";
	    	rtnary[1]="";
	    	rtnary[2]=window;
	    	callBackFunc = "setVgmSpcTrdpCd";
	    	modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	    	break;
    }
}

function sheet3_OnChange(sheetObj, Row, Col){
	switch (sheetObj.ColSaveName(Col)) {
		case "vgm_am_trdp_cd" :
			var codeStr =  sheetObj.GetCellValue(Row, Col);
			if(codeStr.length >= 2){
				sheetObj.SetCellValue(Row, 'vgm_am_trdp_nm', '', 0);
				doAutoSearch(sheetObj, Row, Col, 'trdpcode', codeStr, 'vgm_am_trdp_cd', 'vgm_am_trdp_nm');	
			}
		break;
    	case "vgm_spc_trdp_cd" :
    		var codeStr =  sheetObj.GetCellValue(Row, Col);
    		if(codeStr.length >= 2){
    			sheetObj.SetCellValue(Row, 'vgm_spc_trdp_nm', '', 0);
    			doAutoSearch(sheetObj, Row, Col, 'trdpcode', codeStr, 'vgm_spc_trdp_cd', 'vgm_spc_trdp_nm');	
    		}
		break;
	}
}

function setVgmAmTrdpCd(rtnVal){
	if (rtnVal == null) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		docObjects[2].SetCellValue(cur_row, "vgm_am_trdp_cd",rtnValAry[0],0);
		docObjects[2].SetCellValue(cur_row, "vgm_am_trdp_nm",rtnValAry[2],0);
	}
}

function setVgmSpcTrdpCd(rtnVal){
	if (rtnVal == null) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		docObjects[2].SetCellValue(cur_row, "vgm_spc_trdp_cd",rtnValAry[0],0);
		docObjects[2].SetCellValue(cur_row, "vgm_spc_trdp_nm",rtnValAry[2],0);
	}
}

function setUnPorLocCd(rtnVal){
	if (rtnVal == null) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "un_por_cd",rtnValAry[9],0);
		docObjects[0].SetCellValue(cur_row, "por_nm",rtnValAry[2],0);
	}
}

function setUnPolLocCd(rtnVal){
	if (rtnVal == null) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "un_pol_cd",rtnValAry[9],0);
		docObjects[0].SetCellValue(cur_row, "pol_nm",rtnValAry[2],0);
		docObjects[0].SetCellValue(cur_row, "pol_cnt_cd",rtnValAry[5],0);
	}
}

function setUnPodLocCd(rtnVal){
	if (rtnVal == null) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "un_pod_cd",rtnValAry[9],0);
		docObjects[0].SetCellValue(cur_row, "pod_nm",rtnValAry[2],0);
	}
}

function setUnDelLocCd(rtnVal){
	if (rtnVal == null) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "un_del_cd",rtnValAry[9],0);
		docObjects[0].SetCellValue(cur_row, "del_nm",rtnValAry[2],0);
	}
}

function siVgmEdiValidation(sheetObj, sendType) {
	var formObj=document.frm1;	
	var valMsgArr = new Array();
	var siMsgArr = new Array();
	var vgmMsgArr = new Array();
	var errMsg = "";
	var speChr = "";
	//OFVFOUR-6219 [BINEX] EDI S/I Status error
	//var speChrSet = "";
	//var speChrSetResult = "";
	
	for(var i=2; i<sheetObj.LastRow() + 1; i++){
		sheetObj.SetCellValue(i, "si_valid_yn", "", 0);
		sheetObj.SetCellValue(i, "vgm_valid_yn", "", 0);
		
		for(var j=0; j < sheetObj.LastCol(); j++){
			if(sheetObj.GetCellEditable(i, j)){
				sheetObj.SetCellBackColor(i, j, "#FFFFFF");
			}else{
				sheetObj.SetCellBackColor(i, j, "#EFEBEF");
			}
		}
	}
	
	for(var i=2; i<sheetObj.LastRow() + 1; i++){
		
		if(sheetObj.GetCellValue(i, "si_send_chk") == 1 || sheetObj.GetCellValue(i, "vgm_send_chk") == 1){
		
			var ref_no                  = sheetObj.GetCellValue(i, "ref_no");
			var cnee_trdp_nm            = sheetObj.GetCellValue(i, "cnee_trdp_nm");
		    var shpr_pic_nm             = sheetObj.GetCellValue(i, "shpr_pic_nm");
		    var shpr_pic_phn            = sheetObj.GetCellValue(i, "shpr_pic_phn");
		    var shpr_pic_fax            = sheetObj.GetCellValue(i, "shpr_pic_fax");
		    var shpr_pic_eml            = sheetObj.GetCellValue(i, "shpr_pic_eml");
		    var cnee_pic_nm             = sheetObj.GetCellValue(i, "cnee_pic_nm");
		    var cnee_pic_phn            = sheetObj.GetCellValue(i, "cnee_pic_phn");
		    var cnee_pic_fax            = sheetObj.GetCellValue(i, "cnee_pic_fax");
		    var cnee_pic_eml            = sheetObj.GetCellValue(i, "cnee_pic_eml");
		    var ntfy_pic_nm             = sheetObj.GetCellValue(i, "ntfy_pic_nm");
		    var ntfy_pic_phn            = sheetObj.GetCellValue(i, "ntfy_pic_phn");
		    var ntfy_pic_fax            = sheetObj.GetCellValue(i, "ntfy_pic_fax");
		    var ntfy_pic_eml            = sheetObj.GetCellValue(i, "ntfy_pic_eml");
		    var carr_pic_nm             = sheetObj.GetCellValue(i, "carr_pic_nm");
		    var carr_pic_phn            = sheetObj.GetCellValue(i, "carr_pic_phn");
		    var carr_pic_fax            = sheetObj.GetCellValue(i, "carr_pic_fax");
		    var carr_pic_eml            = sheetObj.GetCellValue(i, "carr_pic_eml");
		    var un_pol_cd               = sheetObj.GetCellValue(i, "un_pol_cd");
		    var un_pod_cd               = sheetObj.GetCellValue(i, "un_pod_cd");
		    var pol_nm                  = sheetObj.GetCellValue(i, "pol_nm");
		    var pod_nm                  = sheetObj.GetCellValue(i, "pod_nm");
		    var obl_tp_nm	            = sheetObj.GetCellValue(i, "obl_tp_nm");
		    var org_bl_qty              = sheetObj.GetCellValue(i, "org_bl_qty");
		    var carr_trdp_cd            = sheetObj.GetCellValue(i, "carr_trdp_cd");
			var carr_trdp_nm            = sheetObj.GetCellValue(i, "carr_trdp_nm");
			var si_msg_sts              = sheetObj.GetCellValue(i, "si_msg_sts");
			var vgm_msg_sts             = sheetObj.GetCellValue(i, "vgm_msg_sts");
			var msg_fnc_cd              = sheetObj.GetCellValue(i, "msg_fnc_cd");
			var pol_cnt_cd				= sheetObj.GetCellValue(i, "pol_cnt_cd");
			
			ajaxSendPost(getEdiSpiVgmValidateInfo, 'reqVal', '&goWhere=aj&bcKey=getEdiSpiVgmValidateInfo&intg_bl_seq='+sheetObj.GetCellValue(i, "intg_bl_seq"), './GateServlet.gsl');
			
			var pck_qty                 = formObj.pck_qty.value;
		    var pck_ut_cd               = formObj.pck_ut_cd.value;
		    var grs_wgt                 = formObj.grs_wgt.value;
		    var meas                    = formObj.meas.value;
		    var cntr_cnt                = formObj.cntr_cnt.value;
		    var itn_no                  = formObj.itn_no.value;
		    var no_name_cntr_cnt        = formObj.no_name_cntr_cnt.value;
		    var no_tpsz_cntr_cnt        = formObj.no_tpsz_cntr_cnt.value;
		    var desc_txt                = formObj.desc_txt.value;
		    var hbl_cnt                 = formObj.hbl_cnt.value;
			var lnr_bkg_no              = formObj.lnr_bkg_no.value;
			var item_cnt                = formObj.item_cnt.value;
		    var no_item_desc_wgt_cnt    = formObj.no_item_desc_wgt_cnt.value;
		    var no_item_meas_cnt    = formObj.no_item_meas_cnt.value;
		    var no_vgm_cgo_wgt_cnt      = formObj.no_vgm_cgo_wgt_cnt.value;
		    var no_vgm_cgo_wgt_tp_cnt   = formObj.no_vgm_cgo_wgt_tp_cnt.value;
		    var no_vgm_dt_cnt           = formObj.no_vgm_dt_cnt.value;
		    var no_vgm_tm_cnt           = formObj.no_vgm_tm_cnt.value;
		    var no_vgm_method_cnt       = formObj.no_vgm_method_cnt.value;
		    var no_vgm_cntr_tp_cnt      = formObj.no_vgm_cntr_tp_cnt.value;
		    var no_vgm_spc_trdp_nm_cnt  = formObj.no_vgm_spc_trdp_nm_cnt.value;
		    var no_vgm_spc_trdp_pic_cnt = formObj.no_vgm_spc_trdp_pic_cnt.value;
		    var no_vgm_am_trdp_nm_cnt   = formObj.no_vgm_am_trdp_nm_cnt.value;
		    var no_vgm_am_trdp_pic_cnt  = formObj.no_vgm_am_trdp_pic_cnt.value;
		    
			/*var pck_qty                 = sheetObj.GetCellValue(i, "pck_qty");
		    var pck_ut_cd               = sheetObj.GetCellValue(i, "pck_ut_cd");
		    var grs_wgt                 = sheetObj.GetCellValue(i, "grs_wgt");
		    var meas                    = sheetObj.GetCellValue(i, "meas");
		    var cntr_cnt                = sheetObj.GetCellValue(i, "cntr_cnt");
		    var itn_no                  = sheetObj.GetCellValue(i, "itn_no");
		    var no_name_cntr_cnt        = sheetObj.GetCellValue(i, "no_name_cntr_cnt");
		    var no_tpsz_cntr_cnt        = sheetObj.GetCellValue(i, "no_tpsz_cntr_cnt");
		    var desc_txt                = sheetObj.GetCellValue(i, "desc_txt");
		    var hbl_cnt                 = sheetObj.GetCellValue(i, "hbl_cnt");
			var lnr_bkg_no              = sheetObj.GetCellValue(i, "lnr_bkg_no");
			var item_cnt                = sheetObj.GetCellValue(i, "item_cnt");
		    var no_item_desc_wgt_cnt    = sheetObj.GetCellValue(i, "no_item_desc_wgt_cnt");
		    var no_vgm_cgo_wgt_cnt      = sheetObj.GetCellValue(i, "no_vgm_cgo_wgt_cnt");
		    var no_vgm_cgo_wgt_tp_cnt   = sheetObj.GetCellValue(i, "no_vgm_cgo_wgt_tp_cnt");
		    var no_vgm_dt_cnt           = sheetObj.GetCellValue(i, "no_vgm_dt_cnt");
		    var no_vgm_tm_cnt           = sheetObj.GetCellValue(i, "no_vgm_tm_cnt");
		    var no_vgm_method_cnt       = sheetObj.GetCellValue(i, "no_vgm_method_cnt");
		    var no_vgm_cntr_tp_cnt      = sheetObj.GetCellValue(i, "no_vgm_cntr_tp_cnt");
		    var no_vgm_spc_trdp_nm_cnt  = sheetObj.GetCellValue(i, "no_vgm_spc_trdp_nm_cnt");
		    var no_vgm_spc_trdp_pic_cnt = sheetObj.GetCellValue(i, "no_vgm_spc_trdp_pic_cnt");
		    var no_vgm_am_trdp_nm_cnt   = sheetObj.GetCellValue(i, "no_vgm_am_trdp_nm_cnt");
		    var no_vgm_am_trdp_pic_cnt  = sheetObj.GetCellValue(i, "no_vgm_am_trdp_pic_cnt");*/
		    
			var row = i - 1;
			
			if(sheetObj.GetCellValue(i, "si_send_chk") == 1 && sendType == "S"){
				siMsgArr = "";
				
				//<====#4627 [JP Logistics] needed to add Validation for S/I EDI ====>
				speChr = replChar(docObjects[0].GetCellValue(i, "shpr_trdp_nm"),'Y','SI')
				if(speChr.length > 0) {
					//OFVFOUR-6219 [BINEX] EDI S/I Status error
					valMsgArr.push("Row["+ row +"] "+ref_no+": Shipper Name " + getLabel('EDI_COM_ALT292'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "shpr_trdp_nm", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "shpr_trdp_nm", "#8BBDFF");
				}
				
				
				speChr = replChar(docObjects[0].GetCellValue(i, "shpr_trdp_addr"),'Y','SI')
				if(speChr.length > 0) {
					//OFVFOUR-6219 [BINEX] EDI S/I Status error
					valMsgArr.push("Row["+ row +"] "+ref_no+": Shipper Address " + getLabel('EDI_COM_ALT292'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "shpr_trdp_addr", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "shpr_trdp_addr", "#8BBDFF");
				}
				
				
				speChr = replChar(docObjects[0].GetCellValue(i, "cnee_trdp_nm"),'Y','SI')
				if(speChr.length > 0) {
					//OFVFOUR-6219 [BINEX] EDI S/I Status error
					valMsgArr.push("Row["+ row +"] "+ref_no+": Consignee Name " + getLabel('EDI_COM_ALT292'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "cnee_trdp_nm", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "cnee_trdp_nm", "#8BBDFF");
				}
				
				
				speChr = replChar(docObjects[0].GetCellValue(i, "cnee_trdp_addr"),'Y','SI')
				if(speChr.length > 0) {
					//OFVFOUR-6219 [BINEX] EDI S/I Status error
					valMsgArr.push("Row["+ row +"] "+ref_no+": Consignee Address " + getLabel('EDI_COM_ALT292'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "cnee_trdp_addr", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "cnee_trdp_addr", "#8BBDFF");
				}
				
				
				speChr = replChar(docObjects[0].GetCellValue(i, "ntfy_trdp_nm"),'Y','SI')
				if(speChr.length > 0) {
					//OFVFOUR-6219 [BINEX] EDI S/I Status error
					valMsgArr.push("Row["+ row +"] "+ref_no+": Notify Name " + getLabel('EDI_COM_ALT292'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "ntfy_trdp_nm", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "ntfy_trdp_nm", "#8BBDFF");
				}
				
				
				speChr = replChar(docObjects[0].GetCellValue(i, "ntfy_trdp_addr"),'Y','SI')
				if(speChr.length > 0) {
					//OFVFOUR-6219 [BINEX] EDI S/I Status error
					valMsgArr.push("Row["+ row +"] "+ref_no+": Notify Party " + getLabel('EDI_COM_ALT292'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "ntfy_trdp_addr", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "ntfy_trdp_addr", "#8BBDFF");
				}
				
				//OFVFOUR-6219 [BINEX] EDI S/I Status error
				//if(speChrSetResult.length>0){
				//	speChrSetResult = speChrSetResult + speChrSet + "\n";
				//} else{
				//	speChrSetResult = speChrSet + "\n";
				//}
				//speChrSet = "";

		//<====#4627 [JP Logistics] needed to add Validation for S/I EDI====>
				//SI EDI Validation check
				// 1. 허용된 선사인가? Com_Cd로 조회 > E001
				var lnrList = new Array();
				var existLnrList = false;
				
				if (trim(LNRCD) != "") {
					lnrList = LNRCD.split("|");
					if ( lnrList.length > 0){
						var lnr_cd = sheetObj.GetCellValue(i, "lnr_trdp_cd");
						
						for (var j=0;j<lnrList.length;j++) {
							if (lnrList[j] == lnr_cd) {
								existLnrList = true;
								break;
							}
						}
						
						if (!existLnrList) {
							valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT009'));
							siMsgArr += valMsgArr;
							sheetObj.SetCellBackColor(i, "lnr_trdp_cd", "#FFA7A7");
						} else {
							sheetObj.SetCellBackColor(i, "lnr_trdp_cd", "#8BBDFF");
						}
					}
				}
				
				// 2. VSL VVD Check 
			/*    var formObj=document.frm1;
				var vmlNm = formObj.vsl_nm.value();
				var voy   = formObj.voy.value();
				
				if (vmlNm == "" || voy == ""){
			    	alert(getLabel('FMS_COM_ALT007') + "\n - "+ "Vessel/Voyage");
			    	return false;
				}*/
				
			    // 1. null check
				
				if(si_msg_sts == "S" || si_msg_sts == "R" || si_msg_sts == "T"){
					valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT030'));
					siMsgArr += valMsgArr;
					sheetObj.SetCellBackColor(i, "si_msg_sts", "#FFA7A7");
				} else {
					sheetObj.SetCellBackColor(i, "si_msg_sts", "#8BBDFF");
				}
				
				if (trim(lnr_bkg_no) == "") {  
					valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT043'));
					siMsgArr += valMsgArr;
					sheetObj.SetCellBackColor(i, "lnr_bkg_no", "#FFA7A7");
				} else {
					sheetObj.SetCellBackColor(i, "lnr_bkg_no", "#8BBDFF");
				}
				
			    if (cnee_trdp_nm == "") {  
			    	valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT010'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "cnee_trdp_nm", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "cnee_trdp_nm", "#8BBDFF");
				}
			    
			    // 각trdp에 tel/fax/eml 이 있을때 pic는 필수
			    if (shpr_pic_phn != "" || shpr_pic_fax !="" || shpr_pic_eml != "") {
			    	if (shpr_pic_nm  == "") {
			    		valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT026'));
			    		siMsgArr += valMsgArr;
			    		sheetObj.SetCellBackColor(i, "shpr_pic_nm", "#FFA7A7");
			    	} else {
						sheetObj.SetCellBackColor(i, "shpr_pic_nm", "#8BBDFF");
					}
			    }
			    if (cnee_pic_phn != "" || cnee_pic_fax !="" || cnee_pic_eml != "") {
			    	if (cnee_pic_nm  == "") {
			    		valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT027'));
			    		siMsgArr += valMsgArr;
			    		sheetObj.SetCellBackColor(i, "cnee_pic_nm", "#FFA7A7");
			    	} else {
						sheetObj.SetCellBackColor(i, "cnee_pic_nm", "#8BBDFF");
					}
			    }
			    if (ntfy_pic_phn != "" || ntfy_pic_fax !="" || ntfy_pic_eml != "") {
			    	if (ntfy_pic_nm  == "") {
			    		valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT028'));
			    		siMsgArr += valMsgArr;
			    		sheetObj.SetCellBackColor(i, "ntfy_pic_nm", "#FFA7A7");
			    	} else {
						sheetObj.SetCellBackColor(i, "ntfy_pic_nm", "#8BBDFF");
					}
			    }
			    /*if (carr_pic_phn != "" || carr_pic_fax !="" || carr_pic_eml != "") {
			    	if (carr_pic_nm  == "") {
			    		valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT029'));
			    		siMsgArr += valMsgArr;
			    		sheetObj.SetCellBackColor(i, "carr_pic_nm", "#FFA7A7");
			    	} else {
						sheetObj.SetCellBackColor(i, "carr_pic_nm", "#8BBDFF");
					}
			    }*/
			    
			    if (un_pol_cd == "") {  
			    	valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT032'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "un_pol_cd", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "un_pol_cd", "#8BBDFF");
				}
			    
			    if (un_pod_cd == "") {  
			    	valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT033'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "un_pod_cd", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "un_pod_cd", "#8BBDFF");
				}
			    
			    if (pol_nm == "") {  
			    	valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT034'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "pol_nm", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "pol_nm", "#8BBDFF");
				}
			    
			    if (pod_nm == "") {  
			    	valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT035'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "pod_nm", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "pod_nm", "#8BBDFF");
				}
			    if(obl_tp_nm !='SEAWAY BILL'){
			    	if (trim(org_bl_qty) == "0") {
				    	valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT040'));
				    	siMsgArr += valMsgArr;
				    	sheetObj.SetCellBackColor(i, "org_bl_qty", "#FFA7A7");
				    } else {
						sheetObj.SetCellBackColor(i, "org_bl_qty", "#8BBDFF");
					}
			    }
			    
			    
			    
			    ////////////////////////////////////////////////////////////////////////////////////////////////////////
			    
			    if (pck_qty == "" || pck_qty*1 == 0) {  
			    	valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT015'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "pck_qty", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "pck_qty", "#8BBDFF");
				}
			    
			    if (pck_ut_cd == "") {  
			    	valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT036'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "pck_ut_cd", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "pck_ut_cd", "#8BBDFF");
				}
			    
			    if (grs_wgt == "" || grs_wgt*1 == 0) {  
			    	valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT016'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "grs_wgt", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "grs_wgt", "#8BBDFF");
				}
			    
			    // 1. Desc Check
			    // DESC, Item Check
			    // cmdt 단위로 체크할땐 sheet2의 rmk값을 체크한다.
			    // HBL이 없으면 MBL을 체크한다.
			    if (hbl_cnt > 0){
			    	
			    	// Gross Weight Check
			    	// Packag Count Check
			    	/*
			    	if (item_cnt == 0 ) {  
				    	valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT037'));
				    	siMsgArr += valMsgArr;
				    	sheetObj.SetCellBackColor(i, "item_cnt", "#FFA7A7");
				    } else {
						sheetObj.SetCellBackColor(i, "item_cnt", "#8BBDFF");
					}
			    	
				    if (no_item_desc_wgt_cnt > 0) {
				    	valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT037'));
				    	siMsgArr += valMsgArr;
				    	sheetObj.SetCellBackColor(i, "no_item_desc_wgt_cnt", "#FFA7A7");
				    } else {
						sheetObj.SetCellBackColor(i, "no_item_desc_wgt_cnt", "#8BBDFF");
					}
				    
				    if(no_item_desc_wgt_cnt == 0 && SI_VNDR_CD =="ENP"){	// ENP : E&P , INTTRA : INTTRA
				    	if (no_item_meas_cnt > 0) {
					    	valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT037'));
					    	siMsgArr += valMsgArr;
					    	sheetObj.SetCellBackColor(i, "no_item_meas_cnt", "#FFA7A7");
					    } else {
							sheetObj.SetCellBackColor(i, "no_item_meas_cnt", "#8BBDFF");
						}
				    }
			    	*/
			    	/*var rowCount = itemSheet.RowCount();
			    	if (rowCount == 0){
			    		valMsgArr.push(getLabel('EDI_COM_ALT037'));
			    	}
			    	
			    	var beforeItemCode = "";
			   		var beforePackgeCode = "";
			   		var beforeDesc = "";
			   		var tempMsg = "";
			    	
			    	for(var i=1;i<itemSheet.LastRow() + 1;i++){
			    		
			    		var desc = itemSheet.GetCellValue(i,"desc");
			    		var wgt = itemSheet.GetCellValue(i,"wgt");
			    		var shpCmdtMeas = itemSheet.GetCellValue(i,"meas");
	
			    		var currentItemCode = itemSheet.GetCellValue(i,"shp_cmdt_cd");
			    		var currentPackgeCode = itemSheet.GetCellValue(i,"shp_cmdt_cd");
			    		
			    		if(trim(desc) == "" || wgt*1 == 0){
			    			valMsgArr.push(getLabel('EDI_COM_ALT037'));
			    			break;
			    		}
			    		
			    		if (beforeItemCode == currentItemCode && beforePackgeCode == currentPackgeCode && beforeDesc != desc){
			    			itemSheet.SetCellBackColor(i, "desc", "#AA2233");
			    		}
			    		
			        	beforeItemCode = currentItemCode;
			       		beforePackgeCode = currentPackgeCode;
			       		beforeDesc = desc;
			    	}*/
			    	
			    } else {
			    	// mbl 단위로 체크할땐 mbl의 DESC 값을 체크한다.
			    	if (trim(desc_txt) == "") {  
			    		valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT038'));
			    		siMsgArr += valMsgArr;
			    		sheetObj.SetCellBackColor(i, "desc_txt", "#FFA7A7");
			    	} else {
						sheetObj.SetCellBackColor(i, "desc_txt", "#8BBDFF");
					}
			    }
			    
			    if (trim(itn_no) == "" && pol_cnt_cd == "US") {  
			    	// POL이 US일때 ITN NO가 필수 (일단 POL이 거의 US이므로 일단 US의 체크는 하지 않는다 ) 
			    	valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT039'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "itn_no", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "itn_no", "#8BBDFF");
				}
			    
			    // 0 > 이상인지 체크 
			    if (cntr_cnt == 0 ) {  
			    	valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT018'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "cntr_cnt", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "cntr_cnt", "#8BBDFF");
				}
			    
			    if (no_name_cntr_cnt > 0) {   // 이름 없는 컨테이너가 1개 이상이라면 
			    	valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT041'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "no_name_cntr_cnt", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "no_name_cntr_cnt", "#8BBDFF");
				}
			    
			    //container number format check 20181030 ajs
			    if (sheetObj.GetCellValue(i, "cntr_no_chk") == 'N') {   // 이름 없는 컨테이너가 1개 이상이라면 
			    	valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT350'));
			    	siMsgArr += valMsgArr;
				}
			    //container number format check 20181030 ajs end
			    
			    if (no_tpsz_cntr_cnt > 0) {  // TPSZ 없는 컨테이너가 1개 이상이라면 
			    	valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT042'));
			    	siMsgArr += valMsgArr;
			    	sheetObj.SetCellBackColor(i, "no_tpsz_cntr_cnt", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "no_tpsz_cntr_cnt", "#8BBDFF");
				}
			    
			    if(siMsgArr.length > 0){
			    	sheetObj.SetCellValue(i,"si_valid_yn","E",0);
			    	sheetObj.SetCellBackColor(i, "si_valid_yn", "#FFA7A7");
			    }else{
			    	sheetObj.SetCellValue(i,"si_valid_yn","O",0);
			    	sheetObj.SetCellBackColor(i, "si_valid_yn", "#8BBDFF");
			    }
			}
			
			if(sheetObj.GetCellValue(i, "vgm_send_chk") == 1){
				
				var ediLnrList = new Array();
				var emlLnrList = new Array();
				var isEdiCarr = false;
				var isEmlCarr = false;
				
				// Carrier For EDI
				if (trim(EDILNRCD) != "") {
					ediLnrList = EDILNRCD.split("|");
					if ( ediLnrList.length > 0){
						
						for (var j=0;j<ediLnrList.length;j++) {
							if (ediLnrList[j] == carr_trdp_cd) {
								isEdiCarr = true;
								break;
							}
						}
						
					}
				}
				
				// Carrier For EML
				if (trim(EMLLNRCD) != "") {
					emlLnrList = EMLLNRCD.split("|");
					if ( emlLnrList.length > 0){
						for (var j=0;j<emlLnrList.length;j++) {
							if (emlLnrList[j] == carr_trdp_cd) {
								isEmlCarr = true;
								break;
							}
						}
					}
				}
				
				// EDI, EML 선사가 아니면 Error
				if (!isEdiCarr && !isEmlCarr) {
					//valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT009'));
					vgmMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT009'));
					sheetObj.SetCellBackColor(i, "carr_trdp_cd", "#FFA7A7");
				} else {
					sheetObj.SetCellBackColor(i, "carr_trdp_cd", "#8BBDFF");
				}
				
				// EML 선사인데 Email이 없으면 
				//var carrPicEml = formObj.carr_pic_eml.value;
				/*if (isEmlCarr && trim(carrPicEml)=="") {
					alert(getLabel('FMS_COM_ALT007') + "\n - Carrier's Email");
					formObj.carr_pic_eml.focus();
					return false;
				}*/
				
				// form null check
				if (trim(carr_trdp_nm) == "") {  
					//valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT022'));
					vgmMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT022'));
					sheetObj.SetCellBackColor(i, "carr_trdp_nm", "#FFA7A7");
				} else {
					sheetObj.SetCellBackColor(i, "carr_trdp_nm", "#8BBDFF");
				}
				
				if (trim(lnr_bkg_no) == "") {  
					//valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT043'));
					vgmMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT043'));
					sheetObj.SetCellBackColor(i, "lnr_bkg_no", "#FFA7A7");
				} else {
					sheetObj.SetCellBackColor(i, "lnr_bkg_no", "#8BBDFF");
				}
				
				if((vgm_msg_sts == "S" || vgm_msg_sts == "T") && sendType == "S"){
					//valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT030'));
					vgmMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT030'));
					sheetObj.SetCellBackColor(i, "vgm_msg_sts", "#FFA7A7");
				} else {
					sheetObj.SetCellBackColor(i, "vgm_msg_sts", "#8BBDFF");
				}
				//original amend type 사용자 직접선택
				/*
				if(msg_fnc_cd == "" && sendType == "C"){
					//valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT031'));
					vgmMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT031'));
					sheetObj.SetCellBackColor(i, "msg_fnc_cd", "#FFA7A7");
				} else {
					sheetObj.SetCellBackColor(i, "msg_fnc_cd", "#8BBDFF");
				}
				*/
				if (cntr_cnt == 0 ) {  
			    	//valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT018'));
			    	vgmMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT018'));
			    	sheetObj.SetCellBackColor(i, "cntr_cnt", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "cntr_cnt", "#8BBDFF");
				}
				
				//Cntr NO Check 
			    if (no_name_cntr_cnt > 0) { 
			    	//valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT041'));
			    	vgmMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT041'));
			    	sheetObj.SetCellBackColor(i, "no_name_cntr_cnt", "#FFA7A7");
			    } else {
					sheetObj.SetCellBackColor(i, "no_name_cntr_cnt", "#8BBDFF");
				}
			    
			    //VGM Weight Check 
			    if (no_vgm_cgo_wgt_cnt > 0) { 
					//valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT044'));
					vgmMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT044'));
					sheetObj.SetCellBackColor(i, "no_vgm_cgo_wgt_cnt", "#FFA7A7");
				} else {
					sheetObj.SetCellBackColor(i, "no_vgm_cgo_wgt_cnt", "#8BBDFF");
				}
				
				//VGM Type Check 
			    if (no_vgm_cgo_wgt_tp_cnt > 0) { 
					//valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT045'));
					vgmMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT045'));
					sheetObj.SetCellBackColor(i, "no_vgm_cgo_wgt_tp_cnt", "#FFA7A7");
				} else {
					sheetObj.SetCellBackColor(i, "no_vgm_cgo_wgt_tp_cnt", "#8BBDFF");
				}
				
				//VGM Date Check 
			    if (no_vgm_dt_cnt > 0) { 
					//valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT046'));
					vgmMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT046'));
					sheetObj.SetCellBackColor(i, "no_vgm_dt_cnt", "#FFA7A7");
				} else {
					sheetObj.SetCellBackColor(i, "no_vgm_dt_cnt", "#8BBDFF");
				}
	
				//VGM Time Check 
			    if (no_vgm_tm_cnt > 0) { 
					//valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT047'));
					vgmMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT047'));
					sheetObj.SetCellBackColor(i, "no_vgm_tm_cnt", "#FFA7A7");
				} else {
					sheetObj.SetCellBackColor(i, "no_vgm_tm_cnt", "#8BBDFF");
				}
				
				//VGM Method Check 
			    if (no_vgm_method_cnt > 0) { 
					//valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT048'));
					vgmMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT048'));
					sheetObj.SetCellBackColor(i, "no_vgm_method_cnt", "#FFA7A7");
				} else {
					sheetObj.SetCellBackColor(i, "no_vgm_method_cnt", "#8BBDFF");
				}
				
				//VGM Supplier Check 
			    if (no_vgm_cntr_tp_cnt > 0) { 
					//valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT049'));
					vgmMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT049'));
					sheetObj.SetCellBackColor(i, "no_vgm_cntr_tp_cnt", "#FFA7A7");
				} else {
					sheetObj.SetCellBackColor(i, "no_vgm_cntr_tp_cnt", "#8BBDFF");
				}
	
				//VGM SPC NM Check 
			    if (no_vgm_spc_trdp_nm_cnt > 0) { 
					//valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT050'));
					vgmMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT050'));
					sheetObj.SetCellBackColor(i, "no_vgm_spc_trdp_nm_cnt", "#FFA7A7");
				} else {
					sheetObj.SetCellBackColor(i, "no_vgm_spc_trdp_nm_cnt", "#8BBDFF");
				}
	
				//VGM SPC PIC Check 
			    if (no_vgm_spc_trdp_pic_cnt > 0) { 
					//valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT051'));
					vgmMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT051'));
					sheetObj.SetCellBackColor(i, "no_vgm_spc_trdp_pic_cnt", "#FFA7A7");
				} else {
					sheetObj.SetCellBackColor(i, "no_vgm_spc_trdp_pic_cnt", "#8BBDFF");
				}
	
				//VGM AM NM이 있을경우 AM PIC Check 또는  VGM AM PIC가 있을경우 AM NM Check 
			    if (no_vgm_am_trdp_nm_cnt > 0) { 
					//valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT052'));
					vgmMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT052'));
					sheetObj.SetCellBackColor(i, "no_vgm_am_trdp_nm_cnt", "#FFA7A7");
				} else {
					sheetObj.SetCellBackColor(i, "no_vgm_am_trdp_nm_cnt", "#8BBDFF");
				}
				
			    if (no_vgm_am_trdp_pic_cnt > 0) { 
					//valMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT053'));
					vgmMsgArr.push("Row["+ row +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT053'));
					sheetObj.SetCellBackColor(i, "no_vgm_am_trdp_pic_cnt", "#FFA7A7");
				} else {
					sheetObj.SetCellBackColor(i, "no_vgm_am_trdp_pic_cnt", "#8BBDFF");
				}
			    
				// Cntr > 0
				/*if (sheetObj.GetTotalRows() == 0){
					valMsgArr.push(getLabel('EDI_COM_ALT018'));
				}
					
				// Cntr값 체크 
				for (var i=1; i<sheetObj.LastRow()+1; i++) {
					
					var cntr_no	         = sheetObj.GetCellValue(i, "cntr_no");
					var seal_no1         = sheetObj.GetCellValue(i, "seal_no1");
					var seal_tp1         = sheetObj.GetCellValue(i, "seal_tp1");
					var seal_no2         = sheetObj.GetCellValue(i, "seal_no2");
					var seal_tp2         = sheetObj.GetCellValue(i, "seal_tp2");
					var vgm_cgo_wgt      = sheetObj.GetCellValue(i, "vgm_cgo_wgt");
					var vgm_cgo_wgt_tp   = sheetObj.GetCellValue(i, "vgm_cgo_wgt_tp");
					var vgm_dt           = sheetObj.GetCellValue(i, "vgm_dt");
					var vgm_method       = sheetObj.GetCellValue(i, "vgm_method");
					var vgm_tm           = sheetObj.GetCellValue(i, "vgm_tm");
					var vgm_cntr_tp      = sheetObj.GetCellValue(i, "vgm_cntr_tp");
					var vgm_am_trdp_cd   = sheetObj.GetCellValue(i, "vgm_am_trdp_cd");
					var vgm_am_trdp_nm   = sheetObj.GetCellValue(i, "vgm_am_trdp_nm");
					var vgm_am_trdp_pic  = sheetObj.GetCellValue(i, "vgm_am_trdp_pic");
					var vgm_spc_trdp_cd  = sheetObj.GetCellValue(i, "vgm_spc_trdp_cd");
					var vgm_spc_trdp_nm  = sheetObj.GetCellValue(i, "vgm_spc_trdp_nm");
					var vgm_spc_trdp_pic = sheetObj.GetCellValue(i, "vgm_spc_trdp_pic");
	
					//Cntr NO Check 
					if (trim(cntr_no)=="") {
						valMsgArr.push("Row["+ i +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT041'));
					}
					
					//VGM Weight Check 
					if (trim(vgm_cgo_wgt) == "" || trim(vgm_cgo_wgt)=="0.00") {
						valMsgArr.push("Row["+ i +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT044'));
					}
					
					//VGM Type Check 
					if (trim(vgm_cgo_wgt_tp) == "") {
						valMsgArr.push("Row["+ i +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT045'));
					}
					
					//VGM Date Check 
					if (trim(vgm_dt) == "") {
						valMsgArr.push("Row["+ i +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT046'));
					}
	
					//VGM Time Check 
					if (trim(vgm_tm) == "") {
						valMsgArr.push("Row["+ i +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT047'));
					}
					
					//VGM Method Check 
					if (trim(vgm_method) == "") {
						valMsgArr.push("Row["+ i +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT048'));
					}
					
					//VGM Supplier Check 
					if (trim(vgm_cntr_tp) == "") {
						valMsgArr.push("Row["+ i +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT049'));
					}
	
					//VGM SPC NM Check 
					if (trim(vgm_spc_trdp_nm) == "") {
						valMsgArr.push("Row["+ i +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT050'));
					}
	
					//VGM SPC PIC Check 
					if (trim(vgm_spc_trdp_pic) == "") {
						valMsgArr.push("Row["+ i +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT051'));
					}
	
					//VGM AM NM이 있을경우 AM PIC Check 또는  VGM AM PIC가 있을경우 AM NM Check 
					if (trim(vgm_am_trdp_nm) == "" && trim(vgm_am_trdp_pic) != "") {
						valMsgArr.push("Row["+ i +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT052'));
					}
					if (trim(vgm_am_trdp_nm) != "" && trim(vgm_am_trdp_pic) == "") {
						valMsgArr.push("Row["+ i +"] "+ ref_no +" : " +  getLabel('EDI_COM_ALT053'));
					}
				}*/
			    
			    if(vgmMsgArr.length > 0){
			    	sheetObj.SetCellValue(i,"vgm_valid_yn","E",0);
			    	sheetObj.SetCellBackColor(i, "vgm_valid_yn", "#FFA7A7");
			    }else{
			    	sheetObj.SetCellValue(i,"vgm_valid_yn","O",0);
			    	sheetObj.SetCellBackColor(i, "vgm_valid_yn", "#8BBDFF");
			    }
			}
		}
	}
	
	if(sheetObj.GetCellValue(sheetObj.GetSelectRow(),"vgm_valid_yn") != ""){
		for(var j=1; j<docObjects[2].LastRow() + 1; j++){
			vgmCntrListValidate(docObjects[2], j);
		}
	}else{
		for(var j=1; j<docObjects[2].LastRow() + 1; j++){
			for(var k=0; k < docObjects[2].LastCol(); k++){
				if(docObjects[2].GetCellEditable(j, k)){
					docObjects[2].SetCellBackColor(j, k, "#FFFFFF");
				}else{
					docObjects[2].SetCellBackColor(j, k, "#EFEBEF");
				}
			}
		}
	}
		
	
	if(sheetObj.GetCellValue(sheetObj.GetSelectRow(),"si_valid_yn") != ""){
		for(var j=1; j<docObjects[1].LastRow() + 1; j++){
			spiItemListValidate(docObjects[1], j);
		}
	}else{
		for(var j=1; j<docObjects[1].LastRow() + 1; j++){
			for(var k=0; k < docObjects[2].LastCol(); k++){
				if(docObjects[1].GetCellEditable(j, k)){
					docObjects[1].SetCellBackColor(j, k, "#FFFFFF");
				}else{
					docObjects[1].SetCellBackColor(j, k, "#EFEBEF");
				}
			}
		}
	}
    
    if(valMsgArr.length > 0 || vgmMsgArr.length > 0){
    	formObj.val_msg.value = "";
    	
    	for(var i=0; i<valMsgArr.length; i++){
    		if(i==0){
    			formObj.val_msg.value += (getLabel('EDI_COM_ALT246')+ "\n");
    		}
    		formObj.val_msg.value += "  " + ((i+1) + ". " + valMsgArr[i] + "\n");
	    }
    	
    	for(var i=0; i<vgmMsgArr.length; i++){
    		if(i==0){
    			if(valMsgArr.length > 0){
    				formObj.val_msg.value += "\n";
    			}
    			formObj.val_msg.value += (getLabel('EDI_COM_ALT247')+ "\n");
    		}
    		formObj.val_msg.value += "  " + ((i+1) + ". " + vgmMsgArr[i] + "\n");
	    }
    	
    	disp_val_msg.style.display='inline';
    	return false;
    }
    formObj.val_msg.value = "OK";
    return true;
}

function getEdiSpiVgmValidateInfo(reqVal){
	idx = 0;
	var formObj = document.frm1;
	var doc=getAjaxMsgXML(reqVal);
    
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('^@');
			formObj.pck_qty.value 					= rtnArr[idx++];		//0
			formObj.pck_ut_cd.value 				= rtnArr[idx++];
			formObj.grs_wgt.value 					= rtnArr[idx++];
			formObj.meas.value 						= rtnArr[idx++];
			formObj.cntr_cnt.value 					= rtnArr[idx++];
			formObj.itn_no.value 					= rtnArr[idx++];		//5
			formObj.no_name_cntr_cnt.value 			= rtnArr[idx++];
			formObj.no_tpsz_cntr_cnt.value 			= rtnArr[idx++];
			formObj.desc_txt.value 					= rtnArr[idx++];
			formObj.hbl_cnt.value 					= rtnArr[idx++];
			formObj.lnr_bkg_no.value 				= rtnArr[idx++];		//10
			formObj.item_cnt.value 					= rtnArr[idx++];
			formObj.no_item_desc_wgt_cnt.value 		= rtnArr[idx++];
			formObj.no_item_meas_cnt.value 		= rtnArr[idx++];
			formObj.no_vgm_cgo_wgt_cnt.value 		= rtnArr[idx++];
			formObj.no_vgm_cgo_wgt_tp_cnt.value 	= rtnArr[idx++];
			formObj.no_vgm_dt_cnt.value 			= rtnArr[idx++];		//15
			formObj.no_vgm_tm_cnt.value 			= rtnArr[idx++];
			formObj.no_vgm_method_cnt.value 		= rtnArr[idx++];
			formObj.no_vgm_cntr_tp_cnt.value 		= rtnArr[idx++];
			formObj.no_vgm_spc_trdp_nm_cnt.value 	= rtnArr[idx++];
			formObj.no_vgm_spc_trdp_pic_cnt.value 	= rtnArr[idx++];	//20
			formObj.no_vgm_am_trdp_nm_cnt.value 	= rtnArr[idx++];
			formObj.no_vgm_am_trdp_pic_cnt.value 	= rtnArr[idx++];
		}
	}
}

function dataValidationByVndr(vndr, validationItem, validationValue){
	var msg = "";
	if("ENP" == vndr){
		if(validationItem == "MEASUREMENT"){
			if( validationValue * 1 == 0){
				msg = getLabel('EDI_COM_ALT054');
			} 
		}
	}
	return msg;
}

function vslPopup(vslNm){
	if(vslNm == null){
		vslNm = ""
	}
	rtnary=new Array(1);
	rtnary[0]="1";
	rtnary[1]=vslNm;
    callBackFunc = "VSL_POP";
    modal_center_open('./CMM_POP_0140.clt', rtnary, 656,480,"yes");
}
        
function VSL_POP(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.f_trnk_vsl_cd.value=rtnValAry[0];
		frm1.f_trnk_vsl_nm.value=rtnValAry[1];
	}
}


function srOpenPopUp(popName, curObj){
	var formObj=document.frm1;
	try {
		switch(popName) {
            case "MBL_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]='S';
	   			rtnary[1]='O';
//	   			rtnary[2]=formObj.f_bl_no.value;
	   			rtnary[2]="";
	   			rtnary[3]='';
	   			callBackFunc = "srOpenPopUp_MBL_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
				
			break;
			
			case "REF_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]='S';
	   			rtnary[1]='O';
	   			rtnary[2]='';
//	   			rtnary[3]=formObj.f_ref_no.value;
	   			rtnary[3]="";
	   			
	   			callBackFunc = "srOpenPopUp_REF_POPLIST";
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
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        }
	}
}

function srOpenPopUp_REF_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_ref_no.value=rtnValAry[2];
	}
}

function srOpenPopUp_MBL_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_mbl_no.value=rtnValAry[0];
	}
}

function countSameCarrbkgNo(sheetObj,Row,Col){
	var selectedCarrBkgNo = sheetObj.GetCellValue(Row,"lnr_bkg_no");
	var cnt = 1;
	var currCnt = 1;
	var combineBkg = selectedCarrBkgNo.split('+');
	
	for(var i=2;i<sheetObj.LastRow()+1 + 1;i++){
		if(i == Row){
			currCnt = cnt;
			continue;
		}
		
		var carrBkgNo = sheetObj.GetCellValue(i,"lnr_bkg_no");
		if(selectedCarrBkgNo == carrBkgNo){
			if(selectedCarrBkgNo == ""){
				break;
			}
			cnt++;
		}
	}
	

	if (combineBkg.length>1) {
		//#1375 hskang
		if(!sheetObj.GetCellValue(Row,"si_sts")){
			sheetObj.SetCellValue(Row,"si_rmk","COMBINED BL " + selectedCarrBkgNo,0);
		}
	} else if (cnt>1){
		//#1375 hskang
		if(!sheetObj.GetCellValue(Row,"si_sts")){
			sheetObj.SetCellValue(Row,"si_rmk","THIS IS SPLIT BILL " + currCnt + " of " + cnt + " - Booking " +selectedCarrBkgNo,0);
		}
	} 
	
}
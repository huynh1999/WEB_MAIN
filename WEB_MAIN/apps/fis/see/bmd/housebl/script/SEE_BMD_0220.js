/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BMD_0220.js
*@FileTitle  :  co-load
*@author     : 
*@version    : 1.0
*@since      : 
=========================================================*/
var bkgCntrSheet=false;
var docListSheet=false;
var xptListSheet=false;
var cntrListSheet=false;
var cmdtListSheet=false;
var frtSdSheet=false;
var frtBcSheet=false;
var frtDcSheet=false;
var dimListSheet=false;
var jobListSheet=false;
var udfListSheet=false;
var hwiFrtListSheet=false;
var isError=false;
var isInvStsOk=false;
var rtnary=new Array(1);
var callBackFunc = "";
var isMBLCreated = false;
/*Vinh.Vo - 04/17/2015 (S)*/

var isCopy = false;// flag to know sheet13 is loading data in Copy function

   
var tab_pck_qty="";
var tab_meas="";
var tab_meas1="";
var tab_grs_wgt="";
var tab_grs_wgt1="";
var show_delete_complete = "N";
//저장할 데이터를 각 목록에서 가지고 온다
function getSndParam(){
	isError=false;
    var sheetParam='';
  
   
    var cntrListParam=docObjects[1].GetSaveString(true);
	if(cntrListParam!=''){
		isError=cntrListCheckInpuVals(docObjects[1]);
		if(!isError){
			sheetParam+= '&';
	    	sheetParam+= cntrListParam;
	    	cntrListSheet=true;
		}
	}
	 
	   if(!isError){ 
		    var xptListParam=docObjects[2].GetSaveString(true);
		    if(xptListParam!=''){
		    	isError=ediCheckInpuVals(docObjects[2]); 
		    	if(!isError){
			    	sheetParam+= '&';		    	
			    	sheetParam+= xptListParam;
			    //	alert("xptListParam xptListParam "+sheetParam); 
			    	xptListSheet=true;
		    	}
		    }
	    }
	   
	  
    
    if(isError == true)
    {
    	return true;
    }    
	return sheetParam;
}
var bkCheck=0;
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    try {
    	//alert(srcName);
        switch(srcName) {
           
            case "ADD":	//등록
	        case "SAVE":	//등록
	        	
        	   if(frm1.f_bl_no.value==''){
        		   alert(getLabel('FMS_COM_ALT014'));
        		   frm1.f_bl_no.focus();
        		   return;
        	   }
	        	   
	        	cntrInfoSet(docObjects[1]);
	            if(frm1.f_xtra_bl_seq.value==""){
	            	doWork("SAVE_ADD");
	            }else{
	            	doWork("SAVE_MODIFY");
	            }
	            break;	            
 
	            
			case "SAVE_ADD":	//등록
               frm1.f_cmd.value=ADD;
	           	if(frm1.hbl_no.value == "") { 
	        		alert(getLabel('FMS_COM_ALT001'));
	        		moveTab('01');
	        		frm1.hbl_no.focus();
	        		return; 
	        	}	
	           	if(frm1.bl_no.value == "") { 
	        		alert(getLabel('FMS_COM_ALT001'));
	        		moveTab('01');
	        		frm1.bl_no.focus();
	        		return; 
	        	}	
               //	Co-Load B/L No. 중복체크 
        		var formObj=document.frm1;
        		ajaxSendPost(getTbXtraBlDupInfoReq, 'reqVal','&goWhere=aj&bcKey=searchTbXtraBlDupInfo&bl_no='+frm1.bl_no.value,	'./GateServlet.gsl'); 
   
               break;
           case "SAVE_MODIFY":	//등록
               frm1.f_cmd.value=MODIFY;
	    	   if(blCheckInpuVals() && validateAccountPayable()){
	    		   //#48103 remove space
             	   frm1.bl_no.value=trim(frm1.bl_no.value);
             	   frm1.ref_no.value=trim(frm1.ref_no.value);
             		 
	    		   if(!etdRangeOk){
	         			//[Warning] ETD is outside range of 6 months from today. \nPlease kindly check ETD  again.
	    			   alert(getLabel('FMS_COM_ALT021'));		
	    		   }

	    		   /* #47308 스페이스 입력시 null이 입력되는 현상  수정 */
	    		   if(trim(frm1.bl_no.value)==""){
	    			   frm1.bl_no.value = "";
	    		   }
             		
	    		   if(frm1.bl_no.value=="AUTO"){
	          			frm1.bl_no.value="";
	    		   }
 
	    		  
    			   //BL No. 가 없을 경우
    			   //The [HB/L No.] is Blank. Generate the Number? Yes/No. Yes 일 경우 Save 진행 
    			   var blNullChk=true;
 
          		   if(blNullChk){
        			   if(confirm(getLabel('FMS_COM_CFMSAV'))){
                		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
                		   var sndParam=getSndParam();
                		   if(sndParam == true)	{	return false;	}
              				//var sndParam = getSndParam();
                     	    gridAdd(0);
                    	    docObjects[0].SetCellValue(1, 1,1);
                    	    //frm1.f_bl_no.value=frm1.bl_no.value;
                    	    //doShowProcess();
              				docObjects[0].DoAllSave("./SEE_BMD_0220GS.clt", FormQueryString(frm1)+sndParam, true);
              			}
          		    }   
	          	 
	            }
	               	   
               break;
           case "NEW":	//조회 화면에서 클릭시 
        	   frm1.f_xtra_bl_seq.value = "";
           case "SEARCHLIST1":	//조회 화면에서 클릭시 
        	   frm1.f_bl_no.value=trim(frm1.f_bl_no.value);
        	   //if(frm1.f_bkg_no.value==''&&frm1.f_bl_no.value==''){
        	   if(frm1.f_bl_no.value==''){
        		   alert(getLabel('FMS_COM_ALT014'));
        		   frm1.f_bl_no.focus();
        		   return;
        	   }
        	   else{
        		   goTabSelect('01');
                   frm1.f_cmd.value=SEARCHLIST; 
                   doShowProcess();
        		   if (trim(frm1.f_xtra_bl_seq.value) == ""){
        			   frm1.f_tb_xtra_bl_yn.value = "N"; // XTRA_BL_SEQ 없을수이에는 tb_intg_bl 에서 기존 정보를 조회 
        			   submitForm(SEARCHLIST);
        		   } else{
        			   frm1.f_tb_xtra_bl_yn.value = "Y"; // XTRA_BL_SEQ 있는경우 TB_XTRA_BL  정보를 조회 한다.
        			   submitForm(SEARCHLIST);
        		   } 
 
        	   }
        	   break;
        	   
           case "SEARCHLIST":	//조회 
			   frm1.f_bl_no.value=trim(frm1.f_bl_no.value);
        	   //if(frm1.f_bkg_no.value==''&&frm1.f_bl_no.value==''){
        	   if(frm1.f_bl_no.value==''){
        		   alert(getLabel('FMS_COM_ALT014'));
        		   frm1.f_bl_no.focus();
        		   return;
        	   }
        	   else{
        	 
                   frm1.f_cmd.value=SEARCHLIST;
                   doShowProcess();
        	 
        		   //  CO Load Entry 등록여부 로 콤보를 만든다 
                   // 그 콤보 정보를 이용하여 조회 합니다.
        		   getTbXtraBlInfo();
        		   //ajaxSendPost(setTbXtraBlInfo, 'reqVal','&goWhere=aj&bcKey=searchTbUserOrderbyInfoAttr&pgm_usr_id='+formObj.user_id.value+'&pgm_url=./SEE_BMD_0060.clt',	'./GateServlet.gsl');
 
        	   }
        	   break;
       
         
         
           case "REMOVE"://삭제
        	   
        	   if(frm1.intg_bl_seq.value==''){
        		   alert(getLabel('FMS_COM_ALT014'));
        		   frm1.intg_bl_seq.focus();
        		   return;
        	   }
        	   if(frm1.f_xtra_bl_seq.value==''){
        		   alert(getLabel('FMS_COM_ALT014'));
        		   frm1.f_xtra_bl_seq.focus();
        		   return;
        	   }
    		   
        	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
                   frm1.f_cmd.value=REMOVE;
                   show_delete_complete = "Y";
            	  // doShowProcess();
            	   //frm1.submit();
                   submitForm(REMOVE);
        	   }
    		    
    		   break; 
      
		 
           		
		   	case "TRANSSHIPPED":
				rtnary=new Array(2);
		   		rtnary[0]=frm1.pre_vsl_cd.value;
		   		rtnary[1]=frm1.pre_vsl_nm.value;
		   		rtnary[2]=frm1.pre_voy.value;
		   		rtnary[3]=frm1.ts1_port_cd.value;
		   		rtnary[4]=frm1.ts1_port_nm.value;
		   		rtnary[5]=frm1.ts1_eta_dt_tm.value;
		   		rtnary[6]=frm1.ts1_etd_dt_tm.value;
		   		
		   		callBackFunc = "TRANSSHIPPED";
		   		modal_center_open('./SEE_BMD_0190.clt?f_cmd='+SEARCH + '&f_intg_bl_seq='+frm1.intg_bl_seq.value, rtnary, 380,215,"no");
		   	    break;
	   	        
		   	case "PRINT":
		   		
		   		if(frm1.f_xtra_bl_seq.value == ""){ 
					// Select Please.
					alert(getLabel('FMS_COM_ALT004'));
					return;
				} else {
					var reqParam = '?bl_no='+ frm1.f_bl_no.value;
					reqParam += '&intg_bl_seq='+frm1.intg_bl_seq.value;
					reqParam += '&xtra_bl_seq=' + frm1.f_xtra_bl_seq.value;
					reqParam += '&mailTitle='+'Co-Load B/L No.	'+frm1.bl_no.value;
					/*
				var trdp_cd = '';
				trdp_cd += '('
						+ '\''
						+ docObjects[0].GetCellValue(docObjects[0]
								.GetSelectRow(), "shp_trdp_cd") + '\'';
				trdp_cd += ','
						+ '\''
						+ docObjects[0].GetCellValue(docObjects[0]
								.GetSelectRow(), "prnr_trdp_cd") + '\''
						+ ')';
				ajaxSendPost(getMailTo, 'reqVal',
						'&goWhere=aj&bcKey=getMailTo&trdp_cd=' + trdp_cd,
						'./GateServlet.gsl');
				reqParam += '&mailTo=' + mailTo; why??
				*/
					popGET('RPT_PRN_0022.clt' + reqParam, '', 440, 530, "scroll:yes;status:no;help:no;");
				} 
           		break;	
		   	case "HBL_POPLIST"://  openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0] = "S";
	   			rtnary[1] = "O";
	   			callBackFunc = "HBL_POPLIST";
				modal_center_open('./CMM_POP_0170.clt?from_hbl_tp_cd=CL', rtnary, 818,468,"yes");
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

function HBL_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_bl_no.value=rtnValAry[0];//house_bl_no
		formObj.intg_bl_seq.value=rtnValAry[2];//intg_bl_seq
		//formObj.f_bkg_no.value    = rtnValAry[3];//bkg_no
//		if(bndTp!='I'){
//			formObj.f_bkg_no.value = '';	
//		}
		if(formObj.f_bl_no.value !=""){				
			doWork('SEARCHLIST');
		}
	}
	
}

function getTbXtraBlDupInfoReq(reqVal){
	 
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	var bl_dup = "0";
	var tb_xtra_bl_yn = "";
	if(doc[0]=='OK'){
		bl_dup = doc[1];  
	}
	
	if (bl_dup == "0"){
		 if(blCheckInpuValsForAdding() && validateAccountPayable()){ 
    		 
  		   if(!etdRangeOk){
  			   //[Warning] ETD is outside range of 6 months from today. \nPlease kindly check ETD  again.
  			   alert(getLabel('FMS_COM_ALT021'));		
  		   }

  		   //#48103 remove space
  		   frm1.bl_no.value=trim(frm1.bl_no.value);
  		   frm1.ref_no.value=trim(frm1.ref_no.value);
  		  
  		   /* #47308 스페이스 입력시 null이 입력되는 현상  수정 */
  		   if(trim(frm1.bl_no.value)==""){
  			   frm1.bl_no.value = "";
  		   }

  		   
  		   if(frm1.bl_no.value=="AUTO"){
  			   frm1.bl_no.value="";
  		   }
  		       
  		   var blNullChk=true;
    		
    		   if(blNullChk){
    			 if(confirm(getLabel('FMS_COM_CFMSAV'))){
	    		   gridAdd(0); 
          	   docObjects[0].SetCellValue(1, 1,1); 

      		   /* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
      		   var sndParam=getSndParam();
      		   if(sndParam == true)	{	return false;	} 
      		   
          	   //doShowProcess();
          	   //docObjects[0].DoAllSave("./SEE_BMD_0020GS.clt", FormQueryString(frm1)+getSndParam(), true);
          	   docObjects[0].DoAllSave("./SEE_BMD_0220GS.clt", FormQueryString(frm1)+sndParam, true);
    			 }
    		   }
      	  
  	    
     } 
	}else{
		 alert(getLabel('FMS_COM_ALT008')+" Co-Load B/L No.");	
	}
}

function COUNTRY_POPLIST(rtnVal){
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
        else{
		var rtnValAry=rtnVal.split("|");
		frm1.cnt_cd.value=rtnValAry[0];//cd_val
		frm1.cnt_nm.value=rtnValAry[1];//cd_nm
		//frm1.cnt_nm.onchange();
	}
}

 
/* 
* jsjang 2013.7.5 
* 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end 
*/     
function validateAccountPayable(){
 
	return true;
}
 
 
 
function goToBlPage(toPage, toNo){
	if(toNo!==''){
		if(toPage=='view_hbl'){
		   	var paramStr="./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+toNo;
		   	parent.mkNewFrame('Booking & HBL', paramStr);
		}
		else if(toPage=='view_mbl'||toPage=='view_sr'){
			var formObj=document.frm1;
		   	var paramStr="./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST;
		   	paramStr+= '&f_bl_no='+toNo+'&f_hbl_intg_bl_seq='+frm1.intg_bl_seq.value;
		   	parent.mkNewFrame('Master B/L Entry', paramStr);
		}
	}
}

// 그리드 데이타 조회후 GS.jsp 에 그려준다.
function searchGrid(gridIdx){
	switch(gridIdx){
		case 1: //Booking Container 조회			
	        frm1.f_cmd.value=SEARCHLIST01;	 	   	
	        break;	
		case 2:  //Container List 조회			
			frm1.f_cmd.value=SEARCHLIST02;
 			docObjects[1].DoSearch("./SEE_BMD_0221GS.clt", FormQueryString(frm1) );
			break;	
		case 3: //수출신고 번호 조회  (mark tab 클릭시)			
			frm1.f_cmd.value=SEARCHLIST03;
			docObjects[2].DoSearch("./SEE_BMD_0223GS.clt", FormQueryString(frm1)); // DoSearch4Post
			break;
	}
}

/**
 * 파일 업로드 팝업에서 목록 Reload
 */
function reloadDocList(){
	
} 
  
/**
 * Master Container 조회팝업
 */
function getMasterCntrList(){
	/*
	 * AJAX로 Master의 컨테이너를 전부 가져와서 ADD 하도록 변경
	 */ 
	// 기존 BL정보를 불러온다.
	
	if (frm1.intg_bl_seq.value == "") return;
	
	ajaxSendPost(getMasterCntr, 'reqVal', '&goWhere=aj&bcKey=getMasterCntrCoload&f_ref_no='+frm1.ref_no.value+'&f_intg_bl_seq='+frm1.intg_bl_seq.value+'&f_rlt_intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');	//[20130822  ojg] rlt_intg_bl_seq파라미터추가
	   
 
}
function getMasterCntr(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var tmpList=doc[1].split("@;;@");
			var intRows=docObjects[1].LastRow() + 1;
			if(docObjects[1].GetCellValue(1, 'cntr_no')==''){
				intRows--;
			}
			var addCnt=0;
			for(var i=0 ; i<tmpList.length-1 ; i++){
				var tmp=tmpList[i].split("@^^@");
				if(checkAddCntrNo(tmp[0])){
					docObjects[1].DataInsert(intRows);
					docObjects[1].SetCellValue(intRows, 'cntr_no',tmp[0]);
					docObjects[1].SetCellValue(intRows, 'cntr_tpsz_cd',tmp[1]);
					docObjects[1].SetCellValue(intRows, 'seal_no1',(tmp[2]== "null"?"":tmp[2]));
					 /* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 start */ 
					if(tmp[10] != null && tmp[10] != '' && tmp[10] == 'FCL')
					{
						docObjects[1].SetCellValue(intRows, 'cgo_pck_qty',tmp[3]);
						docObjects[1].SetCellValue(intRows, 'cgo_pck_ut',tmp[4]);
						docObjects[1].SetCellValue(intRows, 'cgo_wgt',tmp[5]);
						docObjects[1].SetCellValue(intRows, 'cgo_wgt1',tmp[6]);
						docObjects[1].SetCellValue(intRows, 'cgo_meas',tmp[7]);
						docObjects[1].SetCellValue(intRows, 'cgo_meas1',tmp[8]);
					}
					 /* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 end */ 
					docObjects[1].SetCellValue(intRows, 'seal_no2',(tmp[9]== "null"?"":tmp[9]));
					// temp_val, temp_cd, vent_cd 추가
					docObjects[1].SetCellValue(intRows, 'temp_val',tmp[16]);
					docObjects[1].SetCellValue(intRows, 'temp_cd',tmp[17]);
					docObjects[1].SetCellValue(intRows, 'vent_cd',tmp[18]);
					docObjects[1].SetCellEditable(intRows, 'cntr_no',0);
					docObjects[1].SetCellEditable(intRows, 'cntr_tpsz_cd',0);
					docObjects[1].SetCellEditable(intRows, 'seal_no1',0);
					docObjects[1].SetCellEditable(intRows, 'seal_no2',0);
					intRows++;
					addCnt++;
				}
			}
 			for(var i=1; i<=docObjects[1].LastRow(); i++){
				docObjects[1].SetCellValue(i, 'Seq',i);
			}
			if(addCnt == 0){
				//alert(getLabel('msg.....')
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}   
/**
* ADD 시에 Container번호 중복확인
*/
function checkAddCntrNo(inCntrNo){
 	var intRows=docObjects[1].LastRow() + 1;
	var loopNum=0;
	for(var i=1; i < intRows; i++){
if(inCntrNo==docObjects[1].GetCellValue(i, 'cntr_no')){
			loopNum++;	
		}
	}
	if(inCntrNo == ""){
		loopNum++;
	}
	if(loopNum>0){
		return false;
	}else{
		return true;
	}
} 
/**
 * 화면초기화
 */
function clearScreen(){
	//if(confirm("Do you want to New?")){
		doShowProcess();
		frm1.f_cmd.value='';
		frm1.submit();
//		submitForm('');
	//}
}
 
function sheet1_OnSearchEnd(errMsg){
	
	doHideProcess();
}

function sheet2_OnSearchEnd(sheetObj, row, col) {
 
	
 	for (var idx=1; idx < sheetObj.LastRow() + 1; idx++) {
 		if ( getCntrGrpCd(sheetObj.GetCellValue(idx,"cntr_tpsz_cd")) == "RF") {
			sheetObj.SetCellEditable(idx,"temp_val",1);
			sheetObj.SetCellEditable(idx,"temp_cd",1);
			sheetObj.SetCellEditable(idx,"vent_cd",1);
		} else {
			sheetObj.SetCellValue(idx,"temp_val","",0);
			sheetObj.SetCellValue(idx,"temp_cd","",0);
			sheetObj.SetCellValue(idx,"vent_cd","",0);
			sheetObj.SetCellEditable(idx,"temp_val",0);
			sheetObj.SetCellEditable(idx,"temp_cd",0);
			sheetObj.SetCellEditable(idx,"vent_cd",0);
		}
	}
 	
	searchGrid(3); 
}

// 그리드 row add 버튼 클릭 
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
	       /* var cal=new ComCalendar();
	        cal.select(obj.name, 'MM-dd-yyyy');*/
	        var cal=new ComCalendar();
	        cal.select(obj, 'MM-dd-yyyy');

	    break;
    }
}
 
 

//--------------------------------------------------------------------------------------------------------------
//                                             Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
var tab1click = '';
var tab2click = ''; 
var tab3click = ''; 
var isFreightText = true;

// tab 클릭시  
function goTabSelect(isNumSep) {
	
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	frm1.f_isNumSep.value = isNumSep;
	
	var tabObjs = document.getElementsByName('tabLayer');
 
	
    if( isNumSep == "01" ) { // booking & HB/L 탭 
    
    	currTab = isNumSep;	//탭상태저장
    	
        tabObjs[0].style.display = 'inline';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        
        if(tab1click == ""){
	        tab1click = "Y"
	        
	        //doWork('SEARCHCNTR');
	    }	         
	
    } else if( isNumSep == "02" ) {  //Mark Description 탭
    	currTab = isNumSep;	//탭상태저장
    	
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = "inline";        
        tabObjs[2].style.display = "none";        
     
        if(tab2click== ""){ 
	        tab2click= "Y";
	        //doWork('SEARCH_XPT'); // E/D Inform 그리드 조회 
    	}         
    }else if( isNumSep == "03" ) {  //other 탭
    	currTab = isNumSep;	//탭상태저장
    	
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = "inline";        
     
        if(tab3click== ""){ 
	        tab3click= "Y";
	        //doWork('SEARCH_XPT'); // E/D Inform 그리드 조회 
    	}         
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
var isRun = true;
var blFrtChkYn = "N"; // option : OEH_BL_FRT_CHK_YN 관련 전역 변수


/*
 * on_load
 * */
function loadPage() {
	var opt_key = "EXP_BL_YN";
	ajaxSendPost(setExpressTpCdVal, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	var opt_key_sec = "OEH_BL_FRT_CHK_YN";
	ajaxSendPost(setblFrtChkYn, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");

	
    for(var i=0;isRun && i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
        if(i == docObjects.length - 1){
        	isRun = false;
        }
    }
    
    if(pps_use_flg != "Y"){
    	getObj("btnPierpass").style.display = "none";
    }
    
    
    frm1.pck_qty.value=doMoneyFmt(Number(frm1.pck_qty.value).toFixed(0));
    frm1.grs_wgt.value=doMoneyFmt(Number(frm1.grs_wgt.value).toFixed(3));
    frm1.grs_wgt1.value=doMoneyFmt(Number(frm1.grs_wgt1.value).toFixed(3));
    frm1.meas.value=doMoneyFmt(Number(frm1.meas.value).toFixed(3));
    frm1.meas1.value=doMoneyFmt(Number(frm1.meas1.value).toFixed(0));
    
   
    if(frm1.intg_bl_seq.value==""){
    	if(user_ofc_cnt_cd=="US"){
    		frm1.wgt_disp_cd.value='KL';
    	}else{
    		frm1.wgt_disp_cd.value='K';
    	}
    	
  
    	
    	//clean on board
    	cobChange();
    	/* oyh 2013.11.08 #23113 : DESC항목에 값을 입력하기 이전에 초기값을 설정 */
        /* oyh 2013.09.04 #20421 : [BINEX] B/L type의 default를 Express에 Y로 */
        /* oyh 2013.09.04 #20420 : [BINEX] BL ENTRY에 Package 정보 default setting*/
 
    	/*
         *  2012.02.17 아래 내용을 Description에 추가한다.
         * "FREIGHT COLLECT"
         * "EXPRESS B/L"
         * Copy 했을 때는 나오지 않도록 desc_txt가 값이 없을 경우만 적용한다.
         */
        //사용안함 
    	if(frm1.exp_frt_desc.value==""){
    		//frm1.exp_frt_desc.value += '\r\n';
    		if(frm1.frt_term_c_cd.value=="PP"){
    			frm1.exp_frt_desc.value += '"FREIGHT PREPAID"';
    		}else{
    			frm1.exp_frt_desc.value += '"FREIGHT COLLECT"';
    		}
    		if(frm1.express_tp_cd.value=="Y"){
    			frm1.exp_frt_desc.value += '\r\n';
    			frm1.exp_frt_desc.value += '"EXPRESS B/L"';
    		}
    	}
    	//frm1.bl_no.value="AUTO"; 
    }
 
    /* LHK 20130822 #19706 Main Tab 의 Express B/L 을 Yes 로 했을 떄 Mark &Desc. Tab 의 Number of Original B/L 을 0 으로 변경, - No 로 하면 3 으로 변경 */
    if(frm1.express_tp_cd.value=="Y"){
		frm1.org_bl_qty.value="0";
	}else{
		frm1.org_bl_qty.value="3";
	}    
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	goTabSelect(frm1.f_isNumSep.value);
 
}


function setShortcut(){
	shortcut.remove("Alt+Q");
	shortcut.add("Alt+Q",function() {
		if(frm1.bl_sts_cd.value == 'NA'){
			doWork('ADD');
		}else{
			doWork('MODIFY');
		}
	});
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
	switch(sheet_obj.id){
		case "sheet1":  // hidden
			docObjects[0]=sheet_obj;
		break;
		case "sheet2": // container
			docObjects[1]=sheet_obj;
		break;
		case "sheet3": // 세관 수출입 
			docObjects[2]=sheet_obj;
		break;
	}
   //docObjects[sheetCnt++] = sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {	
    switch(sheetNo) {
		case 1:     
		    with(sheetObj){
					      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );
				
					      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
					      var headers = [ { Text:getLabel('SEE_BMD_0020_HDR1'), Align:"Center"} ];
					      InitHeaders(headers, info);
				
					      var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
					             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_intg_bl_seq" },
					             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bkg_no" },
					             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_no" },
					             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_sts_cd" },
					             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_sts_label" } ];
					       
					      InitColumns(cols);
				
					      SetEditable(1);
					      SetVisible(false);
	            	}
        break;
		
       //Container List 그리드
	   case 2:
		   with(sheetObj){
		  
		       //  (27, 0, 0, true);
		         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );
					
							         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
							         var headers = [ { Text:getLabel('SEE_BMD_HDR4'), Align:"Center"} ];
							         InitHeaders(headers, info);
					
							         var cols = [ {Type:"DelCheck",  Hidden:0, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"Del" },
							                {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"conls_ibflag" },
							                {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"Seq",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
							                {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"soc_flg",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
							                {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:0,   SaveName:"cntr_tpsz_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"seal_no1",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
							                {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"seal_no2",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
							                {Type:"Text",      Hidden:1, Width:60,   Align:"Left",    ColMerge:0,   SaveName:"seal_no3",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
							                {Type:"Int",       Hidden:0,  Width:50,   Align:"Right",   ColMerge:0,   SaveName:"cgo_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
							                {Type:"Combo",     Hidden:0, Width:90,   Align:"Left",    ColMerge:0,   SaveName:"cgo_pck_ut",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
							                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cgo_wgt1",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
							                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 },
							                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas1",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 },
							                {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"vol_meas",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:6,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"cntr_sprl_trdp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_sprl_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"temp_val",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:4 },
							                {Type:"Combo",     Hidden:0, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"temp_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Combo",     Hidden:0, Width:80,   Align:"Left",    ColMerge:0,   SaveName:"vent_cd",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"dg_gds_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:0,  Width:150,   Align:"Left",    ColMerge:0,   SaveName:"cntr_rmk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
							                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_list_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"vol_tot",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
							                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rgst_cntr_yn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
							          
							         InitColumns(cols);
					
							        // SetGetCountPosition()(0);
							         SetEditable(1);
		                                 SetColProperty('cgo_pck_ut', {ComboText:PCKCD1, ComboCode:PCKCD2} );
		                                 SetColProperty('soc_flg', {ComboText:LSTCD1, ComboCode:LSTCD2} );
		                      		   SetColProperty('cntr_tpsz_cd', {ComboText:'|'+TPCD1, ComboCode:'|'+TPCD2} );
		                      		   SetColProperty('temp_cd', {ComboText:'|'+TEMPCD1, ComboCode:'|'+TEMPCD2} );
		                      		   SetColProperty('vent_cd', {ComboText:'|'+VENTCD1, ComboCode:'|'+VENTCD2} );
		                      		   SetColProperty('dg_gds_flg', {ComboText:'N|Y', ComboCode:'N|Y'} );
		                      		           SetSheetHeight(250);
		                      		         //sheetObj.SetFocusAfterProcess(0);
		                      		       //sheetObj.SetFocusAfterRowTransaction(0);
		                     /* oyh 2013.09.04 #20420 : [BINEX] BL ENTRY에 Package 정보 default setting*/
		         } 
                             
		break;
       
	   //국내세관 수출신고 품목정보
	   case 3:
		    with(sheetObj){
	      //  SetSheetHeight(0);
	     // (16, 0, 0, true);

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('SEE_BMD_0223-1'), Align:"Center"},
	                  { Text:getLabel('SEE_BMD_0223-2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"DelCheck",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"del",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"xpt_ibflag",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"xpt_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"edi_snd_sts_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:"xpt_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:18 },
	             {Type:"Int",       Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"edi_pck_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
	             {Type:"Combo",     Hidden:0, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"edi_pck_ut_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"edi_pck_ut_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"edi_grs_wt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
	             {Type:"Combo",     Hidden:0, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"sprt_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1 },
	             {Type:"Int",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"sprt_seq",        KeyField:0,   CalcLogic:"",   Format:"Integer",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"sam_pck_tp",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1 },
	             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"sam_pck_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:8 },
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"sam_pck_ut_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"edi_xpt_seq" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"edi_snd_sts_cd" } ];
	       
	      InitColumns(cols);

	    //  SetGetCountPosition()(0);
	      SetEditable(1);
	      SetColProperty('edi_pck_ut_cd', {ComboText:PCKCD1, ComboCode:PCKCD2} ); 
	      SetColProperty("sprt_flg", {ComboText:"NO|YES", ComboCode:"N|Y"} );
	      SetVisible(true);

	      }


		break;
	   
    	}
} 
 
function getCntrGrpCd (v_cntr_tpsz_cd) {
	var v_cntr_grp_cd='';
	var arrTpszCd=TPCD1.split('|');
	var arrGrpCd=TPCD3.split('|');
	for (var idx=0; idx < arrTpszCd.length ; idx++ ) {
		if (v_cntr_tpsz_cd == arrTpszCd[idx]) {
			v_cntr_grp_cd=arrGrpCd[idx];
			break;
		}
	}
	return v_cntr_grp_cd;
}

function sheet3_OnSearchEnd(errMsg){
 
	sheetObj.SetBlur();	//IBSheet Focus out 처리
}
 
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doHideProcess();
	 
	
	if (frm1.f_cmd.value == ADD){
		frm1.f_cmd.value=SEARCHLIST;
		showCompleteProcess();
		// 저장시에는 콤보를 만들어서 조회한다 (저장한 정보롤 재조회 하기 위하여..)
		getTbXtraBlInfo();
	}else{	
		frm1.f_cmd.value=SEARCHLIST;
		showCompleteProcess();
		// 수정시에는 콤보를 건들지 않고 조회한다 (기존수정이기 떄문에..)
		submitForm(SEARCHLIST);
	}

}
 

/**
* Item 탭 처리
*/
/**
 * 열 추가시 Container 번호가 Container List에 있는지 확인함
 */
var cntrListed=false;
function setItemCntrList(){
	if(!cntrListed){
		var cntrListObj=docObjects[1];
 		var cntrSize=cntrListObj.LastRow() + 1;
		var cntrCd='';
		var cntrLabel='';
		if(cntrSize>1){
			var hasCntr=false;
			for(var i=1; i < cntrSize; i++){
				//26239 HiddenRow면 무시
				if(!cntrListObj.GetRowHidden(i)) {
					if(cntrListObj.GetCellValue(i, 'cntr_list_seq')!=''){
						if(hasCntr){
							cntrCd    += '|';
							cntrLabel += '|';
						}else{
							hasCntr=true;
						}
						cntrLabel+= cntrListObj.GetCellValue(i, 'cntr_no');
						cntrCd   += cntrListObj.GetCellValue(i, 'cntr_list_seq');
					}				
				}
			}
			if(hasCntr){
				//docObjects[3].InitDataCombo (0, 'item_cntr_list_seq', cntrLabel, cntrCd);
				cntrListed=true;
			}
		}
	}
}
  
  
 
var etdRangeOk=true;
/**
 *Booking&B/L 메인 화면의 입력값 확인
 */
function blCheckInpuVals(){
	var isOk=true; 

	//---------------20121130 OJG---------------------------
	if(!chkCmpAddr(frm1.shpr_trdp_addr, 'Shipper Address')){
		isOk=false;
		moveTab('01');
		//frm1.shpr_trdp_addr.focus();
	}
	if(!chkCmpAddr(frm1.cnee_trdp_addr, 'Consignee Address')){
		isOk=false;
		moveTab('01');
		//frm1.cnee_trdp_addr.focus();
	}
	if(!chkCmpAddr(frm1.ntfy_trdp_addr, 'Notify Address')){
		isOk=false;
		moveTab('01');
		//frm1.ntfy_trdp_addr.focus();
	}
	//---------------20121130 OJG--------------------------
 
 
	//else if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "DD", 'ETD')!='O'){ //S.Y BAIK (2013.01.23)
	if(!checkInType(frm1.etd_dt_tm.value, "DD")){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ETD_')); 
		isOk=false;
		moveTab('01');
		frm1.etd_dt_tm.focus();
		return isOk; 
	}
	if(trim(frm1.etd_dt_tm.value)!= "" && trim(frm1.eta_dt_tm.value) != ""){
		if(getDaysBetweenFormat(frm1.etd_dt_tm, frm1.eta_dt_tm, "MM-dd-yyyy") < 0){
			// 'ETD date must be greater than ETA date
			alert(getLabel("SEA_COM_ALT021"));
			moveTab('01');
			frm1.eta_dt_tm.focus();
			isOk=false;
			return isOk; 
		}
	}
 	//#25246, 25247 필수값 설정 추가
	if(frm1.pol_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.pol_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.pod_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.pod_cd.focus();
		isOk=false;
		return isOk; 
	}
 
	//today를 기준으로 6개월 차이가 나면 안됨
	var tmpEtdDate=frm1.etd_dt_tm.value.replaceAll("-", "");
	var etdDate=new Date(tmpEtdDate.substring(4,8), tmpEtdDate.substring(0,2)-1, tmpEtdDate.substring(2,4));
	var tmpDate=new Date();
	var today=new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()); 
	if((today-etdDate)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	} else if((etdDate-today)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	} else{
		etdRangeOk=true;
	}
 
	 
	return isOk;
}
/**
 * Container List의 입력값 확인
 */
function cntrListCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1;
	var isError=false; 
	var workItems=0;
	for(var i=1; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'conls_ibflag')=='U'||sheetObj.GetCellValue(i, 'conls_ibflag')=='I'){
			if(checkInputVal(sheetObj.GetCellValue(i, 'cntr_no'),      0, 14, "T", 'Container No.')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'cntr_tpsz_cd'), 2, 6, "T", 'Container Type/Size')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'seal_no1'),     0,20, "T", 'Seal No.1')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'seal_no2'),     0,20, "T", 'Seal No.2')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'seal_no3'),     0,20, "T", 'Seal No.3')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'cgo_pck_qty'),  0, 7, "N", 'Package Qty')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'cgo_pck_ut'),   0, 6, "T", 'Package Unit')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'cgo_wgt'),      0, 10, "N", 'Weight')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'cgo_meas'),     0, 12, "N", 'Meas.')!='O'){
				isError=true;
			}else if(checkInputVal(sheetObj.GetCellValue(i, 'vol_meas'),     0, 12, "N", 'Volume')!='O'){
				isError=true;
			}
 
			else if(checkInputVal(sheetObj.GetCellValue(i, 'cntr_rmk'),     0, 50, "T", 'Remark.')!='O'){
				isError=true;
			}
		}
	}
	return isError;
}
/**
 * Item Commodity입력값 확인
 */
function itemCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1;
	var isError=false; 
	var workItems=0;
	for(var i=1; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'item_ibflag')=='U'||sheetObj.GetCellValue(i, 'item_ibflag')=='I'){
	 
			if(checkInputVal(sheetObj.GetCellText(i, 'item_cntr_list_seq'), 1, 14, "T", 'Container No.')!='O'){
				isError=true;				
			}
		}
	}
	return isError;
}

 

/**
 * EDI 입력값 체크
 */
function ediCheckInpuVals(sheetObj){
	var totRow=sheetObj.LastRow() + 1;
	var isError=false; 
	var workItems=0;
	for(var i=1; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'xpt_ibflag')=='U'||sheetObj.GetCellValue(i, 'xpt_ibflag')=='I'){
			if(checkInputVal(sheetObj.GetCellValue(i, 'xpt_no'), 10, 20, "T", 'Exportation entry No.')!='O'){
				isError=true;
			}
		}
	}
	return isError;
}
 
 
  
function setOfficeData(){
	var formObj=document.frm1;
	var sheetObj=docObjects[1];
	
}
function weightChange(obj){
	var formObj=document.frm1;
	if(obj.name=="grs_wgt"){
		var rndXLValue=roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 3);
		formObj.grs_wgt1.value=rndXLValue;
		formObj.mk_grs_wgt1.value=rndXLValue;
		formObj.mk_grs_wgt.value=formObj.grs_wgt.value; 
		chkComma(formObj.grs_wgt1, 8, 3);
		formObj.mk_grs_wgt1.value = doMoneyFmt(formObj.mk_grs_wgt1.value);
		formObj.mk_grs_wgt.value = doMoneyFmt(formObj.mk_grs_wgt.value);
	}
	else if(obj.name=="grs_wgt1"){
		var rndXLValue=roundXL(formObj.grs_wgt1.value.replaceAll(",","") / CNVT_CNST_KG_LB, 3);
		formObj.grs_wgt.value=rndXLValue;
		formObj.mk_grs_wgt.value=rndXLValue;
		formObj.mk_grs_wgt1.value=formObj.grs_wgt1.value; 
		chkComma(formObj.grs_wgt, 8, 3);
		formObj.mk_grs_wgt.value = doMoneyFmt(formObj.mk_grs_wgt.value);
		formObj.mk_grs_wgt1.value = doMoneyFmt(formObj.mk_grs_wgt1.value);
	}
 
}
function cbmChange(obj){
	var formObj=document.frm1;
	if(obj.name=="meas"){
		var rndXLValue=roundXL(formObj.meas.value.replaceAll(",", "") * CNVT_CNST_CBM_CFT, 3);
		formObj.meas1.value=doMoneyFmt(Number(rndXLValue).toFixed(0));
		formObj.mk_meas1.value=doMoneyFmt(Number(rndXLValue).toFixed(0));
		formObj.mk_meas.value=formObj.meas.value.replaceAll(",", ""); 
		formObj.mk_meas1.value=doMoneyFmt(formObj.mk_meas1.value);
		formObj.mk_meas.value=doMoneyFmt(formObj.mk_meas.value);
	}
	// CFT ==> CBM 기능  
	else if(obj.name=="meas1"){
		var rndXLValue=roundXL(formObj.meas1.value.replaceAll(",", "") / CNVT_CNST_CBM_CFT, 3);
		formObj.meas.value=rndXLValue;
		formObj.mk_meas.value=rndXLValue;
		formObj.mk_meas1.value=formObj.meas1.value;
		chkComma(formObj.meas, 8, 3);
		formObj.mk_meas.value=doMoneyFmt(formObj.mk_meas.value);
		formObj.mk_meas1.value=doMoneyFmt(formObj.mk_meas1.value);
	}
 
	//amountChange(frm1.agent_rt); 사용안함
	//amountChange(frm1.cust_rt); 사용안함
}
function amountChange(obj){
	var formObj=document.frm1;
	//Selling/Buying Amount 계산시 R/T(G.WT/1000) 과 CBM 비교하여 값이 큰 것으로 계산한다.
	var grsWgtKg=formObj.grs_wgt.value.replaceAll(",","");
	var retWgt=roundXL(grsWgtKg / 1000, 3);
	var cbm=formObj.meas.value.replaceAll(",","");
	var volume=0;
	if(retWgt - cbm > 0){
		volume=retWgt;
	}else{
		volume=cbm;
	}
	if(obj.name=="agent_rt"){		
		if(formObj.agent_rt.value!=''){
			if(formObj.agent_curr_cd.value=="KRW"){
				formObj.agent_amt.value=roundXL(formObj.agent_rt.value.replaceAll(",","") * (volume<1 ? 1 : volume), 0);
				numberCommaLen(formObj.agent_amt, 8, 0);
			}else{
				if(volume<1){
					volume=1;
				}
				var curSum=getMultiplyFloat(formObj.agent_rt.value.replaceAll(",",""),  volume);
			    curSum=strToFloatByNDecimalTp(curSum, TP_TRM3);
			    if(curSum>9999999999999.99){
			    	alert(getLabel('FMS_COM_ALT002'));
			    	formObj.agent_rt.value=0;
			    	formObj.agent_amt.value=0;
			    	formObj.agent_rt.focus();
			    	return;
			    }
				formObj.agent_amt.value=curSum;
				chkComma(formObj.agent_amt, 8, 2);
			}			
		}
		//chkComma(formObj.agent_amt,8,2);
	}else if(obj.name=="cust_rt"){
		if(formObj.cust_rt.value!=''){
			if(formObj.cust_curr_cd.value=="KRW"){
				formObj.cust_amt.value=roundXL(formObj.cust_rt.value.replaceAll(",","") * (volume<1 ? 1 : volume), 0);
				numberCommaLen(formObj.cust_amt, 8, 0);
			}else{
				if(volume<1){
					volume=1;
				}
				var curSum=getMultiplyFloat(formObj.cust_rt.value.replaceAll(",",""),  volume);
			    curSum=strToFloatByNDecimalTp(curSum, TP_TRM3);
			    if(curSum>9999999999999.99){
			    	alert(getLabel('FMS_COM_ALT002'));
			    	formObj.cust_rt.value=0;
			    	formObj.cust_amt.value=0;
			    	formObj.cust_rt.focus();
			    	return;
			    }
				formObj.cust_amt.value=curSum;
				chkComma(formObj.cust_amt,8,2);
			}
			//chkComma(formObj.cust_amt,8,2);			
		}
	}
	if(obj.name=="agent_amt"){
		if(formObj.agent_curr_cd.value=="KRW"){
			numberCommaLen(formObj.agent_amt, 8, 0);
		}else{
			chkComma(formObj.agent_amt,8,2);
		}
	}else if(obj.name=="cust_amt"){
		if(formObj.cust_curr_cd.value=="KRW"){
			numberCommaLen(formObj.cust_amt, 8, 0);
		}else{
			chkComma(formObj.cust_amt,8,2);
		}
	}
}
function shipModeChange(){
	var formObj=document.frm1;
	var isOk=true;
	if(isOk){
		//office에서 설정한 FCL, LCL 문장을 가져온다.
		if(formObj.shp_mod_cd.value=="FCL"){
			formObj.desc_txt1.value=formObj.h_sea_fcl_desc.value;
		}else if(formObj.shp_mod_cd.value=="LCL" || formObj.shp_mod_cd.value=="FAK"){
			formObj.desc_txt1.value=formObj.h_sea_lcl_desc.value;
			//frm1.fm_svc_term_cd.value='CF';
			//frm1.to_svc_term_cd.value='CF';
		}else{
			formObj.desc_txt1.value='';
		}
	}
}
function shipModeChangeDef(obj){
	var formObj=document.frm1;
	if (obj.value == 'FCL' || obj.value == 'BLK') {
		formObj.to_svc_term_cd.value='CY';
		formObj.fm_svc_term_cd.value='CY';
	} else {
		formObj.to_svc_term_cd.value='CF';
		formObj.fm_svc_term_cd.value='CF';
	}
}
function setActShipper(){ // 사용안함
	var formObj=document.frm1;
 
	formObj.act_shpr_trdp_cd.value=formObj.shpr_trdp_cd.value;
	formObj.act_shpr_trdp_nm.value=formObj.shpr_trdp_nm.value;
	//#25711 [SUNWAY]Sales Man 자동 설정 
	if (typeof(formObj.sls_usrid.value)!='undefined'
		&& typeof(formObj.sls_usr_nm.value)!='undefined'
			&& typeof(formObj.sls_ofc_cd.value)!='undefined'
				&& typeof(formObj.sls_dept_cd.value)!='undefined')
	{
		setSalesMan(formObj.act_shpr_trdp_cd.value);
	}
} 

function setLiner(){
	var formObj=document.frm1;
	//2011.10.28 Kim,Jin-Hyuk
	//해상 수출 HBL Shipper 입력하면 A/Shipper도 같이 입력해준다. 수정은 가능
	formObj.carr_trdp_cd1.value=formObj.lnr_trdp_cd.value;
	formObj.carr_trdp_nm1.value=formObj.lnr_trdp_nm.value; 
	
}
function svcTermChange(){
	var formObj=document.frm1;
	formObj.to_svc_term_cd.value=formObj.fm_svc_term_cd.value;
}
/*
 * on board date, vsl name
 * clean on board 내용을 만들어 준다.
 */
function cobChange(){
	var formObj=document.frm1;
	formObj.clean_on_board.value=sea_cob;
	formObj.clean_on_board.value += "\r\n";
	
	if(formObj.obrd_dt_tm.value != ""){
		formObj.clean_on_board.value += mkCharDateFormat(formObj.obrd_dt_tm.value);
		formObj.clean_on_board.value += "\r\n";
	}
 
	formObj.clean_on_board.value += "\r\n";		 
	formObj.clean_on_board.value += "-------------------";
	if(vsl_show_flg=="Y"){
		formObj.clean_on_board.value += "\r\n";
		formObj.clean_on_board.value += formObj.trnk_vsl_nm.value + " " + formObj.trnk_voy.value;
	}
	if(load_port_show_flg=="Y"){
		formObj.clean_on_board.value += "\r\n";
		formObj.clean_on_board.value += formObj.pol_nm.value;
	}
	
 
}
/* #21016 ETD of POL 이 변경되면 Onboard date도 자동변경  jsjang 2013.9.26 */ 
function chgOnboard(obj)
{
	var formObj=document.frm1;
	formObj.obrd_dt_tm.value=formObj.etd_dt_tm.value;
	cobChange();
}
 
 

//화면로드시 데이터 표시
function loadData(){
	  
	
	var formObj=document.frm1;
	//alert(formObj.param_bl_no.value)
	if (formObj.param_bl_no.value != ""){
		frm1.f_cmd.value=SEARCHLIST;
		
		frm1.f_bl_no.value=formObj.param_bl_no.value;
		frm1.intg_bl_seq.value=formObj.param_intg_bl_seq.value;
		frm1.param_intg_bl_seq.value="";
		frm1.param_bl_no.value="";
		//frm1.f_cmd.value=formObj.param_xtra_bl_seq.value;
        doShowProcess();
	 
		//  CO Load Entry 등록여부 로 콤보를 만든다 
        // 그 콤보 정보를 이용하여 조회 합니다.
		getTbXtraBlInfo();
	}
	
	
	frm1.bl_no.focus();
}
  
 
 
 
var isHblCrtOk = false;
       
/* jsjang 2013.7.22 요구사항 #15952 Container Info 자동 필드값 반영요건  */
function setPacQty(){
	var formObj=document.frm1;
	if(formObj.shp_mod_cd.value !="FCL")
	{
		//formObj.sad_txt.value = formObj.pck_qty.value + "  " + formObj.pck_ut_cd.options[formObj.pck_ut_cd.selectedIndex].text;
		mkSaidTxt(docObjects[1], formObj.sad_txt);
	}
}
function checkTrdpCode(obj){
	if(obj.name=="prnr_trdp_nm"){
	}else if(obj.name=="shpr_trdp_nm"){
		if(frm1.shpr_trdp_cd.value==""){
			frm1.shpr_trdp_addr.value=obj.value;
		}
	}else if(obj.name=="cnee_trdp_nm"){
		if(frm1.cnee_trdp_cd.value==""){
			frm1.cnee_trdp_addr.value=obj.value;
		}
	}else if(obj.name=="ntfy_trdp_nm"){
		if(frm1.ntfy_trdp_cd.value==""){
			frm1.ntfy_trdp_addr.value=obj.value;
		}
	}else if(obj.name=="act_shpr_trdp_nm"){ // 사용안함
		if(frm1.act_shpr_trdp_cd.value==""){
			frm1.act_shp_info.value=obj.value;
		}
	}else if(obj.name=="cust_trdp_nm"){
		if(frm1.cust_trdp_cd.value==""){
			frm1.cust_trdp_addr.value=obj.value;
		}
	}else if(obj.name=="lnr_trdp_nm"){
	}else if(obj.name=="carr_trdp_nm"){
	}else if(obj.name=="prnr_trdp_nm2"){
	}else if(obj.name=="iss_trdp_nm"){
	}else if(obj.name=="third_trdp_nm"){
	}
}
/* Bug #21113 : Express B/L 자동입력 관련, jsjang 2013.9.27 */
function expressChange(obj, obj1){
	var tmp=obj.value.split("\n");
	var num=0;
	var num1=0;
	var text='"EXPRESS B/L"';
	for(var i=0 ; i<tmp.length ; i++){
		var chk=tmp[i].indexOf(text);
		if(chk>0){
			num=num + 1;
		}
	}
	if(frm1.express_tp_cd.value=="Y"){
		if(num == 0)
		{
			obj.value += '\r\n"EXPRESS B/L"';
		}
		obj1.value='"EXPRESS B/L"';
		/* LHK 20130822 #19706 Main Tab 의 Express B/L 을 Yes 로 했을 떄 Mark &Desc. Tab 의 Number of Original B/L 을 0 으로 변경, - No 로 하면 3 으로 변경 */
		frm1.org_bl_qty.value="0";
	}else{
		obj.value=obj.value.replace(/\n/g, "");
		obj.value=obj.value.replace(/\r/g, "");
		obj.value=obj.value.replace('"EXPRESS B/L"', '');
		frm1.org_bl_qty.value="3";
	}
}
var grobalFlag="";

//#2081 - [PATENT] OEM Container Information 버튼 옵션추가
//BL_CODE_UTIL.js 파일의 addCntrInfo(sheet, obj, type) 함수를 공통 적용
/*var cntrInfoType = "";
var cntrInfoHead = true;

function checkAddCntrInfo(){
	
	 *  2012.02.24
	 * 하우스의 컨테이너 정보가 달려있으면 해당 내용을 조합해서 찍어주고,
	 * 없으면 마스터의 컨테이너 정보를 가져온다.
	 
	
	var cnt=docObjects[1].LastRow() + 1;
	var tmp="";
	var chkFlg=false;
	if(frm1.mk_txt.value != ""){
		tmp="\r\n";
	}
	
	//#466 [Fulltrans] strengthen the function for "container info" copy button
	var opt_key = "OE_CNTR_INFO_TYPE";
	ajaxSendPost(setCntrInfoType, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	//#786 [FULLTRANS] HBL 수정 사항 정리
	var opt_key = "CNTR_INFO_HEAD";
	ajaxSendPost(setCntrInfoHead, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	if(cntrInfoHead){
		if(cntrInfoType == "1"){//CNTR No + "/" + Seal No1
			tmp += "Container No/Seal No";
			tmp += "\r\n";
		}else if(cntrInfoType == "2"){//CNTR No + "/" + Seal No1 + Package No + Package Type + "/" + Weight K +"KGS /" + CBM + "CBM"
			tmp += "Container No/Seal No";
			tmp += "\r\n";
			tmp += "Package/Weight/CBM";
			tmp += "\r\n";
		}else if(cntrInfoType == "3"){//CNTR No + "/" + Seal No1 + Package No+Package Type + "/" + Weight K +"KGS"
			tmp += "Container No/Seal No";
			tmp += "\r\n";
			tmp += "Package/Weight";
			tmp += "\r\n";
		}else{//JP Option
			tmp += "Container No/Type/Seal No";
			tmp += "\r\n";
		}
	}
	
	for(var i = 1 ; i < cnt ; i++){
		if(docObjects[1].GetCellValue(i, "cntr_no")!=''){
			chkFlg=true;
			
			var sText = docObjects[1].GetComboInfo(i,"cgo_pck_ut", "Text");
			var sCode = docObjects[1].GetComboInfo(i,"cgo_pck_ut", "Code");
			
			var arrText = sText.split("|");
			var arrCode = sCode.split("|");
			
			var pck_nm = "";
			for(j = 0; j < arrCode.length; j++) {
				if(docObjects[1].GetCellValue(i, "cgo_pck_ut") == arrCode[j]) {
					pck_nm = arrText[j];
					break;
				}
			}
			
			if(cntrInfoType == "1"){//CNTR No + "/" + Seal No1
				tmp += docObjects[1].GetCellValue(i, "cntr_no") + "/" + docObjects[1].GetCellValue(i, "seal_no1");
				if(docObjects[1].GetCellValue(i, "seal_no2") != ''){
					tmp += ', ' + docObjects[1].GetCellValue(i, "seal_no2");
				}
			}else if(cntrInfoType == "2"){//CNTR No + "/" + Seal No1 + Package No + Package Type + "/" + Weight K +"KGS /" + CBM + "CBM"
				tmp += docObjects[1].GetCellValue(i, "cntr_no") + "/" + docObjects[1].GetCellValue(i, "seal_no1");
				if(docObjects[1].GetCellValue(i, "seal_no2") != ''){
					tmp += ', ' + docObjects[1].GetCellValue(i, "seal_no2");
				}
				tmp += "\r\n";
//				tmp += docObjects[1].GetCellValue(i, "cgo_pck_qty") + docObjects[1].GetCellValue(i, "cgo_pck_ut") + "/";
				tmp += docObjects[1].GetCellValue(i, "cgo_pck_qty") + pck_nm + "/";
				tmp += docObjects[1].GetCellValue(i, "cgo_wgt") + "KGS/" + docObjects[1].GetCellValue(i, "cgo_meas") + "CBM";
			}else if(cntrInfoType == "3"){//CNTR No + "/" + Seal No1 + Package No+Package Type + "/" + Weight K +"KGS"
				tmp += docObjects[1].GetCellValue(i, "cntr_no") + "/" + docObjects[1].GetCellValue(i, "seal_no1");
				if(docObjects[1].GetCellValue(i, "seal_no2") != ''){
					tmp += ', ' + docObjects[1].GetCellValue(i, "seal_no2");
				}
				tmp += "\r\n";
//				tmp += docObjects[1].GetCellValue(i, "cgo_pck_qty") + docObjects[1].GetCellValue(i, "cgo_pck_ut") + "/";
				tmp += docObjects[1].GetCellValue(i, "cgo_pck_qty") + pck_nm + "/";
				tmp += docObjects[1].GetCellValue(i, "cgo_wgt") + "KGS";
			}else{//JP Option
				tmp += docObjects[1].GetCellValue(i, "cntr_no") + "/" + docObjects[1].GetCellValue(i, "cntr_tpsz_cd") + "/" + docObjects[1].GetCellValue(i, "seal_no1");
				if(docObjects[1].GetCellValue(i, "seal_no2") != ''){
					tmp += ', ' + docObjects[1].GetCellValue(i, "seal_no2");
				}
			}
			tmp += "\r\n";
		}
	}
	if(chkFlg){
		frm1.mk_txt.value += tmp;
	}else{
		if(user_ofc_cnt_cd=="JP"){
			addCntrInfoType('H');
		}else{
			//addCntrInfo('H');
			addCntrInfo(docObjects[2], 'H', 'OE');
		}
	}	
}

//#466 [Fulltrans] strengthen the function for "container info" copy button
function setCntrInfoType(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		cntrInfoType = doc[1];
	}else{
	}
}
function setCntrInfoHead(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		if(doc[1] == "Y"){
			cntrInfoHead = true;
		}else{
			cntrInfoHead = false;
		}
	}else{
	}
}
*/

function descFreight(){
	if(frm1.frt_term_c_cd.value=="CC"){
		frm1.exp_frt_desc.value=frm1.exp_frt_desc.value.replace("FREIGHT PREPAID", "FREIGHT COLLECT");
	}else{
		frm1.exp_frt_desc.value=frm1.exp_frt_desc.value.replace("FREIGHT COLLECT", "FREIGHT PREPAID");
	}
}
//###############################################################################
  
function TRANSSHIPPED(rtnVal)
{ 
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
       else{
		var rtnValAry=rtnVal.split("|");
		frm1.pre_vsl_cd.value=rtnValAry[0];
		frm1.pre_vsl_nm.value=rtnValAry[1];
		frm1.pre_voy.value=rtnValAry[2];
		frm1.ts1_port_cd.value=rtnValAry[3];
		frm1.ts1_port_nm.value=rtnValAry[4];
		frm1.ts1_eta_dt_tm.value=rtnValAry[5];
		frm1.ts1_etd_dt_tm.value=rtnValAry[6];
	}
}


function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_cmd.value = getParam(url,"f_cmd");
	formObj.f_bl_no.value = getParam(url,"f_bl_no");
	formObj.f_intg_bl_seq.value = getParam(url,"f_intg_bl_seq");
	
	doWork('SEARCHLIST');
}

function submitForm(cmd){
	 
	var formObj=document.frm1;
	//doShowProcess();
	for(var i=0;i<docObjects.length;i++) {
		docObjects[i].RemoveAll();
	}
	//alert( frm1.f_tb_xtra_bl_yn.value);
	$.ajax({
		   type: "POST",
		   url: "./SEE_BMD_0220AJ.clt",
		   dataType: 'xml',
		   data: $(formObj).serialize(),
		   success: function(data){
			   
			   var hbl_tp_cd = $('hbl_tp_cd',data).text();
			   //hbl_tp_cd = "CL";
			   //alert(hbl_tp_cd);
			   if (hbl_tp_cd == "CL") { // coload 일떄만  
			   setFieldValue( formObj.bl_sts_cd, $('bl_sts_cd',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   //setFieldValue( formObj.f_intg_bl_seq, $('intg_bl_seq',data).text()); 
			   setFieldValue( formObj.mk_bl_no, $('bl_no',data).text());
			   setFieldValue( formObj.h_curr_cd, $('curr_cd',data).text());
			   setFieldValue( formObj.h_mbl_curr_cd, $('mbl_curr_cd',data).text());
			   setFieldValue( formObj.h_ooh_bkg_rmk, $('ooh_bkg_rmk',data).text());
			   setFieldValue( formObj.f_isNumSep, $('f_isNumSep',data).text());
			   //setFieldValue( formObj.f_bl_no, $('f_bl_no',data).text());
			   setFieldValue( formObj.bl_sts_label, $('bl_sts_label',data).text());
			   	   
			   setFieldValue( formObj.h_bl_no, $('bl_no',data).text());
			   if(frm1.f_xtra_bl_seq.value==""){ // // 신규
				   setFieldValue( formObj.hbl_no, $('bl_no',data).text()); 
				   setFieldValue( formObj.bl_no, "");		
				   setFieldValue( formObj.shpr_trdp_nm, "");
				   setFieldValue( formObj.shpr_trdp_cd, "");
				   setFieldValue( formObj.shpr_trdp_addr, "");
				   setFieldValue( formObj.cnee_trdp_cd, "");
				   setFieldValue( formObj.cnee_trdp_nm, "");
				   setFieldValue( formObj.cnee_trdp_addr, "");
				   setFieldValue( formObj.ntfy_trdp_cd, "");
				   setFieldValue( formObj.ntfy_trdp_nm, "");
				   setFieldValue( formObj.ntfy_trdp_addr, ""); 
				    

				   setFieldValue( formObj.bl_iss_dt, ComGetNowInfo());
				   setFieldValue( formObj.opr_usrid, formObj.user_id.value);
				   
				   setFieldValue( formObj.opr_usrnm, formObj.user_usrnm.value);
				   setFieldValue( formObj.opr_ofc_cd, formObj.user_ofc_cd.value);
				   setFieldValue( formObj.opr_dept_cd, formObj.user_dept_cd.value);
				   setFieldValue( formObj.nomi_flg, "C"); // coload default
				   //alert("C " +formObj.opr_dept_cd.value);
				   
				   formObj.bl_no.disabled = false; 
				   
			   }else{ // 수정
				   setFieldValue( formObj.hbl_no, $('hbl_no',data).text()); 
				   setFieldValue( formObj.bl_no, $('bl_no',data).text());		
				   setFieldValue( formObj.shpr_trdp_nm, $('shpr_trdp_nm',data).text());
				   setFieldValue( formObj.shpr_trdp_cd, $('shpr_trdp_cd',data).text());
				   setFieldValue( formObj.shpr_trdp_addr, $('shpr_trdp_addr',data).text());
				   setFieldValue( formObj.cnee_trdp_cd, $('cnee_trdp_cd',data).text());
				   setFieldValue( formObj.cnee_trdp_nm, $('cnee_trdp_nm',data).text());
				   setFieldValue( formObj.cnee_trdp_addr, $('cnee_trdp_addr',data).text());
				   setFieldValue( formObj.ntfy_trdp_cd, $('ntfy_trdp_cd',data).text());
				   setFieldValue( formObj.ntfy_trdp_nm, $('ntfy_trdp_nm',data).text());
				   setFieldValue( formObj.ntfy_trdp_addr, $('ntfy_trdp_addr',data).text());		
				   

				   setFieldValue( formObj.bl_iss_dt, $('bl_iss_dt',data).text());
				   setFieldValue( formObj.opr_usrid, $('issued_by',data).text());
				   
				   setFieldValue( formObj.opr_usrnm, $('proc_usrnm',data).text());
				   setFieldValue( formObj.opr_ofc_cd, $('proc_ofccd',data).text());
				   setFieldValue( formObj.opr_dept_cd, $('proc_dept_cd',data).text());
				   //alert($('nomi_flg',data).text());
				   setFieldValue( formObj.nomi_flg, $('nomi_flg',data).text());
				   formObj.bl_no.disabled = true; 
				   
				   //alert("U " +formObj.opr_dept_cd.value);
			   }
			   
			   setFieldValue( formObj.hbl_tp_cd, $('hbl_tp_cd',data).text());
			   setFieldValue( formObj.lnr_bkg_no, $('lnr_bkg_no',data).text());
			   setFieldValue( formObj.mbl_no, $('mbl_no',data).text());
			   setFieldValue( formObj.reserve_field03, $('reserve_field03',data).text());
			   setFieldValue( formObj.ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.ref_ofc_cd, $('ref_ofc_cd',data).text());
			   setFieldValue( formObj.rlt_intg_bl_seq, $('rlt_intg_bl_seq',data).text());
			   setFieldValue( formObj.post_dt, $('post_dt',data).text());
			   setFieldValue( formObj.mrn, $('mrn',data).text());
			   setFieldValue( formObj.doc_recpt_no, $('doc_recpt_no',data).text());
			   
			   setFieldValue( formObj.lc_no, $('lc_no',data).text());
			   setFieldValue( formObj.h_lc_no, $('lc_no',data).text());
			   setFieldValue( formObj.inv_no, $('inv_no',data).text());
			   setFieldValue( formObj.h_inv_no, $('inv_no',data).text());
			   setFieldValue( formObj.cust_ref_no, $('cust_ref_no',data).text());
			   setFieldValue( formObj.h_cust_ref_no, $('cust_ref_no',data).text());
			   setFieldValue( formObj.bkg_no, $('bkg_no',data).text());
			   setFieldValue( formObj.f_bkg_no, $('bkg_no',data).text());
			   
			   setFieldValue( formObj.prnr_trdp_cd, $('prnr_trdp_cd',data).text());
			   setFieldValue( formObj.prnr_trdp_nm, $('prnr_trdp_nm',data).text());
			   setFieldValue( formObj.prnr_trdp_addr, $('prnr_trdp_addr',data).text());
			   
			   
			   setFieldValue( formObj.act_shp_info, $('act_shp_info',data).text());
			   
			   setFieldValue( formObj.exp_ref_no, $('exp_ref_no',data).text());
			   
			   setFieldValue( formObj.cntr_info, $('cntr_info',data).text());
			   setFieldValue( formObj.obrd_dt_tm, $('obrd_dt_tm',data).text());
			   setFieldValue( formObj.trnk_vsl_cd, $('trnk_vsl_cd',data).text());
			   setFieldValue( formObj.trnk_vsl_nm, $('trnk_vsl_nm',data).text());
			   setFieldValue( formObj.trnk_voy, $('trnk_voy',data).text());
			   setFieldValue( formObj.pre_vsl_cd, $('pre_vsl_cd',data).text());
			   setFieldValue( formObj.pre_vsl_nm, $('pre_vsl_nm',data).text());
			   setFieldValue( formObj.pre_voy, $('pre_voy',data).text());
			   setFieldValue( formObj.ts1_port_cd, $('ts1_port_cd',data).text());
			   setFieldValue( formObj.ts1_port_nm, $('ts1_port_nm',data).text());
			   setFieldValue( formObj.ts1_etd_dt_tm, $('ts1_etd_dt_tm',data).text());
			   setFieldValue( formObj.ts1_eta_dt_tm, $('ts1_eta_dt_tm',data).text());
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
			   setFieldValue( formObj.lnr_trdp_cd, $('lnr_trdp_cd',data).text());
			   setFieldValue( formObj.lnr_trdp_nm, $('lnr_trdp_nm',data).text());
			   setFieldValue( formObj.etd_dt_tm, $('etd_dt_tm',data).text());
			   setFieldValue( formObj.eta_dt_tm, $('eta_dt_tm',data).text());
			   setFieldValue( formObj.etd_por_tm, $('etd_por_tm',data).text());
			   setFieldValue( formObj.inco_cd, $('inco_cd',data).text());
			   setFieldValue( formObj.shp_mod_cd, $('shp_mod_cd',data).text());
			   setFieldValue( formObj.rep_cmdt_cd, $('rep_cmdt_cd',data).text());
			   setFieldValue( formObj.rep_cmdt_nm, $('rep_cmdt_nm',data).text());
			   setFieldValue( formObj.h_rep_cmdt_nm, $('rep_cmdt_nm',data).text());
			   
			   
			   setFieldValue( formObj.state_cd, $('state_cd',data).text());
			   setFieldValue( formObj.state_nm, $('state_nm',data).text());
			   setFieldValue( formObj.cnt_cd, $('cnt_cd',data).text());
			   setFieldValue( formObj.cnt_nm, $('cnt_nm',data).text());
			   setFieldValue( formObj.pck_qty, $('pck_qty',data).text());
			   setFieldValue( formObj.pck_ut_cd, $('pck_ut_cd',data).text());
			   setFieldValue( formObj.grs_wgt, $('grs_wgt',data).text());
			   setFieldValue( formObj.grs_wgt1, $('grs_wgt1',data).text());
			   setFieldValue( formObj.meas, $('meas',data).text());
			   setFieldValue( formObj.meas1, $('meas1',data).text());
			   
			   setFieldValue( formObj.wh_recp_no, $('wh_recp_no',data).text());
			   setFieldValue( formObj.agent_rt, $('agent_rt',data).text());
			   setFieldValue( formObj.agent_amt, $('agent_amt',data).text());
			   
			   setFieldValue( formObj.cust_rt, $('cust_rt',data).text());
			   setFieldValue( formObj.cust_amt, $('cust_amt',data).text());
			   
			   setFieldValue( formObj.frt_term_a_cd, $('frt_term_a_cd',data).text());
			   setFieldValue( formObj.h_frt_term_a_cd, $('frt_term_a_cd',data).text());
			   setFieldValue( formObj.frt_term_c_cd, $('frt_term_c_cd',data).text());
			   setFieldValue( formObj.h_frt_term_c_cd, $('frt_term_c_cd',data).text());
			   setFieldValue( formObj.fm_svc_term_cd, $('fm_svc_term_cd',data).text());
			   setFieldValue( formObj.to_svc_term_cd, $('to_svc_term_cd',data).text());
			   setFieldValue( formObj.h_fm_svc_term_cd, $('fm_svc_term_cd',data).text());
			   setFieldValue( formObj.h_to_svc_term_cd, $('to_svc_term_cd',data).text());
			   setFieldValue( formObj.profit_share, $('profit_share',data).text());
			   setFieldValue( formObj.h_profit_share, $('profit_share',data).text());
			   setFieldValue( formObj.express_tp_cd, $('express_tp_cd',data).text());
			   setFieldValue( formObj.h_express_tp_cd, $('express_tp_cd',data).text());
			   setFieldValue( formObj.cargo_tp_cd, $('cargo_tp_cd',data).text());
			   
			   setFieldValue( formObj.shp_tp_cd, $('shp_tp_cd',data).text());
			   setFieldValue( formObj.wh_cut_off_dt, $('wh_cut_off_dt',data).text());
			   setFieldValue( formObj.wh_cut_off_tm, $('wh_cut_off_tm',data).text());
			   
			   
			   
			   
			   setFieldValue( formObj.bkg_dt_tm, $('bkg_dt_tm',data).text());

			   setFieldValue( formObj.iss_loc_nm1, $('iss_loc_nm1',data).text());
			   setFieldValue( formObj.obrd_dt_tm1, $('obrd_dt_tm1',data).text());
			   setFieldValue( formObj.org_bl_qty, $('org_bl_qty',data).text());
			   setFieldValue( formObj.itn_no, $('itn_no',data).text());
			   setFieldValue( formObj.trans_shipment, $('trans_shipment',data).text());
			   setFieldValue( formObj.onward_rout, $('onward_rout',data).text());
			   setFieldValue( formObj.sad_txt, $('sad_txt',data).text());
			   setFieldValue( formObj.say_txt, $('say_txt',data).text());
			   setFieldValue( formObj.mk_grs_wgt, $('mk_grs_wgt',data).text());
			   setFieldValue( formObj.mk_grs_wgt1, $('mk_grs_wgt1',data).text());
			   setFieldValue( formObj.mk_meas, $('mk_meas',data).text());
			   setFieldValue( formObj.mk_meas1, $('mk_meas1',data).text());
			   setFieldValue( formObj.carr_trdp_cd, $('carr_trdp_cd',data).text());
			   setFieldValue( formObj.carr_trdp_nm, $('carr_trdp_nm',data).text());
			   setFieldValue( formObj.mk_txt, $('mk_txt',data).text());
			   setFieldValue( formObj.desc_txt1, $('desc_txt1',data).text());
			   setFieldValue( formObj.desc_txt, $('desc_txt',data).text());
			   setFieldValue( formObj.exp_frt_desc, $('exp_frt_desc',data).text());
			   setFieldValue( formObj.clean_on_board, $('clean_on_board',data).text());
			   setFieldValue( formObj.h_clean_on_board, $('clean_on_board',data).text());
			   setFieldValue( formObj.wgt_disp_cd, $('wgt_disp_cd',data).text());
			   setFieldValue( formObj.h_wgt_disp_cd, $('wgt_disp_cd',data).text());
			   setFieldValue( formObj.rmk, $('rmk',data).text());
			   setFieldValue( formObj.mrn_no, $('mrn_no',data).text());
			 
			   
			   
			   
			   setFieldValue( formObj.co_bl_no, $('co_bl_no',data).text()); // co-load 추가 
			  
			   var obrddttm = $('obrd_dt_tm',data).text().replaceAll('-','');
			   setFieldValue( formObj.xcrtDt, obrddttm);
			   
			   doBtnAuthority(attr_extension);
			   
			   tab1click = '';
			   tab2click = '';
			   tab3click = ''; 
			   
			   setupPage(); // 초기 로드   setOfficeData() btnLoad() loadPage() doHideProcess() loadData()
			   
			   //alert("cmdcmd " +cmd);
			   if (cmd == REMOVE){ // 삭제하고 콤보 만들고  새로 조회
					frm1.f_cmd.value=SEARCHLIST;
					moveTab('01');
					getTbXtraBlInfo();
			   }else{ // 조회시 완료후 그리드 조회
				   //alert(frm1.intg_bl_seq.value);
				   
				   if (formObj.hbl_no.value == ""){					   
					   $("#f_xtra_bl_seq").html("<option value=''>NEW</option>");
				   }
				   
				   
				   if(frm1.f_xtra_bl_seq.value==""){ // // 신규 
					   // 신규 Container ListAdd 자동 조회 
					   getMasterCntrList();if(docObjects[1].RowCount()>0){cntrInfoSet(docObjects[1]);}
					   
				   }else{
					   searchGrid(2);
				   }
			   }
				   
			   
			   }else {
				   //alert("cmdcmd111111111111 " +cmd);
				   // coload가 아니다 
				   doHideProcess();
				   if (cmd == REMOVE){ // 삭제하고 콤보 만들고  새로 조회
					   	moveTab('01');
						frm1.f_cmd.value=SEARCHLIST;
						getTbXtraBlInfo();
				   }else{
					   alert(getLabel('FMS_COM_ALT004')+" Co-Load B/L Type.");	
					   moveTab('01');
				   }
			   }
               if(show_delete_complete == "Y"){
            	   showCompleteProcess();
            	   show_delete_complete = "N";
               }
			   
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });	
} 
 
 
function btnLoad(){
	 
}

 
 

// #48988 [JP LOGISTICS] OEH BL ENTRY 에서 EXPRESS B/L DEFAULT 옵션 NO로 설정
function setExpressTpCdVal(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var express_cd = frm1.h_express_tp_cd.value;
	
	if(express_cd == null || express_cd == ""){
		if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
			if(doc[1] == "Y"){
				frm1.express_tp_cd.value = "Y";
			} else {
				frm1.express_tp_cd.value = "N";
			}
		} else {
			frm1.express_tp_cd.value = "Y";
		}
		
		frm1.h_express_tp_cd.value = doc[1];
	}
}

//#48327 [Impex] HBL -- Option to Show D/C Freight Charges 설정
function setblFrtChkYn(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
	    if(doc[1] == "Y"){
	    	blFrtChkYn = "Y";
		}else{
		}
	}else{
	}
}


/**
 *Booking&B/L 메인 화면의 입력값 확인
 */
function blCheckInpuValsForAdding(){
	var isOk=true;
	//---------------20121130 OJG---------------------------
	if(!chkCmpAddr(frm1.shpr_trdp_addr, 'Shipper Address')){
		isOk=false;
		moveTab('01');
		//frm1.shpr_trdp_addr.focus();
	}
	if(!chkCmpAddr(frm1.cnee_trdp_addr, 'Consignee Address')){
		isOk=false;
		moveTab('01');
		//frm1.cnee_trdp_addr.focus();
	}
	if(!chkCmpAddr(frm1.ntfy_trdp_addr, 'Notify Address')){
		isOk=false;
		moveTab('01');
	}
	//else if(checkInputVal(frm1.etd_dt_tm.value, 10, 10, "DD", 'ETD')!='O'){ //S.Y BAIK (2013.01.23)
	if(!checkInType(frm1.etd_dt_tm.value, "DD")){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ETD_')); 
		isOk=false;
		moveTab('01');
		frm1.etd_dt_tm.focus();
		return isOk; 
	}
	if(trim(frm1.etd_dt_tm.value)!= "" && trim(frm1.eta_dt_tm.value) != ""){
		if(getDaysBetweenFormat(frm1.etd_dt_tm, frm1.eta_dt_tm, "MM-dd-yyyy") < 0){
			// 'ETD date must be greater than ETA date
			alert(getLabel("SEA_COM_ALT021"));
			moveTab('01');
			frm1.eta_dt_tm.focus();
			isOk=false;
			return isOk; 
		}
	}
	//#25246, 25247 필수값 설정 추가
	if(frm1.pol_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.pol_cd.focus();
		isOk=false;
		return isOk; 
	}
	if(frm1.pod_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.pod_cd.focus();
		isOk=false;
		return isOk; 
	}
 
	//today를 기준으로 6개월 차이가 나면 안됨
	var tmpEtdDate=frm1.etd_dt_tm.value.replaceAll("-", "");
	var etdDate=new Date(tmpEtdDate.substring(4,8), tmpEtdDate.substring(0,2)-1, tmpEtdDate.substring(2,4));
	var tmpDate=new Date();
	var today=new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()); 
	if((today-etdDate)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	} else if((etdDate-today)/(60*60*24*1000) > 180){
		etdRangeOk=false;
	} else{
		etdRangeOk=true;
	}
	 
	return isOk;
}

  
// co-load 저장된 컴보 생성 (BL_NO 로 TB_XTRA_BL 의 XTRA_BL_SEQ 대상을 조회한다)
function getTbXtraBlInfo() {
	
	var formObj=document.frm1;
	ajaxSendPost(getTbXtraBlInfoReq, 'reqVal','&goWhere=aj&bcKey=searchTbXtraBlInfo&bl_no='+formObj.f_bl_no.value,	'./GateServlet.gsl');
}

function getTbXtraBlInfoReq(reqVal){
 
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	var tb_xtra_bl_value = "";
	var tb_xtra_bl_yn = "";
	if(doc[0]=='OK'){
		tb_xtra_bl_value = doc[1];  
	}
	
	if (tb_xtra_bl_value == "" || tb_xtra_bl_value == "undefined" || tb_xtra_bl_value == undefined){
		tb_xtra_bl_yn = "N"; // 신규 
	}else{
		tb_xtra_bl_yn = "Y"; // TB_XTRA_BL 존재 
	} 
	
	// 대상 존재 여부에 따라 신규(기존bl) 아니면 (TB_XTRA_BL) 에서 조회할지 판단
	formObj.f_tb_xtra_bl_yn.value = tb_xtra_bl_yn;
	//alert(tb_xtra_bl_value);
	//alert(formObj.f_tb_xtra_bl_yn.value);
	
	var tmp = tb_xtra_bl_value;
	var optionStr = "";
	$("#f_xtra_bl_seq").html(optionStr);
	
	
	//TB_XTRA_BL 에 존재 하므로 컴보를 만든다 
	if (tb_xtra_bl_yn == "Y"){				 
		var tmpstr = tmp.split("^");
		for(var i=0; i < tmpstr.length; i++) {   
			var tmpStr2 = tmpstr[i].split("@");
			if (tmpstr[i] != ""){
				optionStr = optionStr + "<option value='"+tmpStr2[0]+"'>"+tmpStr2[1]+"</option>";
				cnt ++ ;
			}
		}		
	}else{ 
	}
	 
	optionStr = optionStr + "<option value=''>NEW</option>";		// 컴보 option new 용 추가 생성
	//alert(optionStr);
	$("#f_xtra_bl_seq").html(optionStr);
	//OFVFOUR-7433 [PQC] [OEH Co-Load B/L Entry] The Loading popup is shown long time and is not disappeared
	var cnt = $("#f_xtra_bl_seq option").length;
	//alert(cnt);
	
	if (formObj.param_new.value=="Y"){ // 리스트에서 new 로 넘어옴 
		formObj.param_new.value = "";
		formObj.f_tb_xtra_bl_yn.value = "N";
		cnt = eval(cnt-1); // new 
	}else{
		cnt = eval(cnt-2); // new 보다 전의 최신 정보를 위하여 -2
	}
	
	//alert(cnt);
	
	
	if (formObj.param_xtra_bl_seq.value==""){
		$("#f_xtra_bl_seq option:eq("+cnt+")").attr("selected", "selected");  // 컴보 최신 option 선택 
	}else{
		$("#f_xtra_bl_seq").val(formObj.param_xtra_bl_seq.value);
		formObj.param_xtra_bl_seq.value="";
	}
 
	// 해당 컴보의 조회조건을 이용하여 조회 f_tb_xtra_bl_yn 에 따른 조회입니다. 
	submitForm(SEARCHLIST); // 조회
}

function setCargoPuckup(){ 
    
}


function sheet2_OnChange(sheetObj, row, col, value) {
	switch (sheetObj.ColSaveName(col)) {
	case "cgo_pck_qty" :
	case "cgo_wgt" :
	case "cgo_wgt1" :
	case "cgo_meas" :
	case "cgo_meas1" :
		if (value < 0) {
			//Input data must be greater than 0.
			alert(getLabel("FMS_COM_ALT042"));
			sheetObj.SetCellValue(row, col,"",0);
			return;
		}
	break;
	case "Del" :
		for(var i=1; i<=sheetObj.LastRow() + 1; i++){
			sheetObj.SetCellValue(i, 'Seq',i);
		}
    	cntrInfoSet(docObjects[1]);
    break;
	case "cntr_tpsz_cd" :
    	cntrInfoSet(docObjects[1]);
if ( getCntrGrpCd(sheetObj.GetCellValue(row,"cntr_tpsz_cd")) == "RF") {
    		sheetObj.SetCellEditable(row,"temp_val",1);
    		sheetObj.SetCellEditable(row,"temp_cd",1);
    		sheetObj.SetCellEditable(row,"vent_cd",1);
    	} else {
    		sheetObj.SetCellValue(row,"temp_val","",0);
    		sheetObj.SetCellValue(row,"temp_cd","",0);
    		sheetObj.SetCellValue(row,"vent_cd","",0);
    		sheetObj.SetCellEditable(row,"temp_val",0);
    		sheetObj.SetCellEditable(row,"temp_cd",0);
    		sheetObj.SetCellEditable(row,"vent_cd",0);
    	}
    break;
	case "temp_val" :
if(sheetObj.GetCellValue(row,"temp_cd") != "" && sheetObj.GetCellValue(row,"vent_cd") !="") {
var keyTxt=sheetObj.GetCellValue(row, "cntr_no") + " / " ;
			var sText=sheetObj.GetComboInfo(row,"vent_cd", "Text");
			var arrText=sText.split("|");
			var idx=sheetObj.GetComboInfo(row,"vent_cd", "SelectedIndex");
			var descTxt=
				sheetObj.GetCellValue(row, "temp_val") + " DEG." +
				sheetObj.GetCellValue(row, "temp_cd") + " / " +
				 arrText[idx] + " OPEN";
			 textdescAdd(frm1.desc_txt, keyTxt , descTxt, frm1.h_temp_val);
		}
		break;
	case "temp_cd" :
		if(sheetObj.GetCellValue(row,"temp_cd") != "" && sheetObj.GetCellValue(row,"vent_cd") !="") {
var keyTxt=sheetObj.GetCellValue(row, "cntr_no") + " / " ;
			var sText=sheetObj.GetComboInfo(row,"vent_cd", "Text");
			var arrText=sText.split("|");
			var idx=sheetObj.GetComboInfo(row,"vent_cd", "SelectedIndex");
			var descTxt=
				sheetObj.GetCellValue(row, "temp_val") + " DEG." +
				sheetObj.GetCellValue(row, "temp_cd") + " / " +
				 arrText[idx] + " OPEN";
			 textdescAdd(frm1.desc_txt, keyTxt , descTxt, frm1.h_temp_val);
		}
		break;
	case "vent_cd" :
if(sheetObj.GetCellValue(row,"temp_cd") != "" && sheetObj.GetCellValue(row,"vent_cd") !="") {
var keyTxt=sheetObj.GetCellValue(row, "cntr_no") + " / " ;
			var sText=sheetObj.GetComboInfo(row,"vent_cd", "Text");
			var arrText=sText.split("|");
			var idx=sheetObj.GetComboInfo(row,"vent_cd", "SelectedIndex");
			var descTxt=
sheetObj.GetCellValue(row, "temp_val") + " DEG." +
sheetObj.GetCellValue(row, "temp_cd") + " / " +
				 arrText[idx] + " OPEN";
			 textdescAdd(frm1.desc_txt, keyTxt , descTxt, frm1.h_temp_val);
		}
		break;
}
switch(sheetObj.ColSaveName(col)){
	case "cgo_wgt":
sheetObj.SetCellValue(row, "cgo_wgt1",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, 2),0);
	break;
	case "cgo_wgt1":
sheetObj.SetCellValue(row, "cgo_wgt",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, 2),0);
	break;
	case "cgo_meas":
sheetObj.SetCellValue(row, "cgo_meas1",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_CBM_CFT, 3),0);
	break;
	case "cgo_meas1":
sheetObj.SetCellValue(row, "cgo_meas",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_CBM_CFT, 3),0);
	break;
}
/* jsjang 2013.7.5  요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 Start  */
var sumFlag='N';
var colNm=sheetObj.ColSaveName(col);
if(colNm == "cgo_pck_qty" || colNm == "cgo_wgt" || colNm == "cgo_wgt1" || colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "Del")
{
	sumFlag='A';
}	
if(sumFlag == 'A' && sheetObj.ColSaveName(col) != 'Seq')
{
	var cgo_pck_qty='0';
	var meas='0.000000';
	var meas1='0.000000';
	var grs_wgt='0.000';
	var grs_wgt1='0.00';
	for(var i=1; i<=sheetObj.LastRow(); i++){
if(sheetObj.GetCellValue(i, "Del") == 0)
	   {
cgo_pck_qty=parseInt(cgo_pck_qty) 			+ parseInt(sheetObj.GetCellValue(i,"cgo_pck_qty"));
		   //meas 	= roundXL(parseFloat(meas), 6) 		+ roundXL(parseFloat(sheetObj.CellValue(i,"cgo_meas"), 6));
meas=roundXL(parseFloat(meas), 6) 		+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas")), 6);
meas1=roundXL(parseFloat(meas1), 6) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_meas1")), 6);
grs_wgt=roundXL(parseFloat(grs_wgt), 3) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_wgt")), 3);
grs_wgt1=roundXL(parseFloat(grs_wgt1), 2) 	+ roundXL(parseFloat(sheetObj.GetCellValue(i,"cgo_wgt1")), 2);
	   }
	}
	var formObj=document.frm1;
	if((colNm == "cgo_pck_qty" || colNm == "Del") && cgo_pck_qty > 0){
		formObj.pck_qty.value=cgo_pck_qty;
	}
	if((colNm == "cgo_wgt" || colNm == "cgo_wgt1" || colNm == "Del") && grs_wgt > 0){
		formObj.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(3));
		formObj.grs_wgt1.value=roundXL(formObj.grs_wgt.value.replaceAll(",","") * CNVT_CNST_KG_LB, 0);
		formObj.mk_grs_wgt1.value=formObj.grs_wgt1.value;
		formObj.mk_grs_wgt.value=formObj.grs_wgt.value;
		chkComma(formObj.grs_wgt1,8,2);	
		formObj.mk_grs_wgt1.value = doMoneyFmt(formObj.mk_grs_wgt1.value);
		formObj.mk_grs_wgt.value = doMoneyFmt(formObj.mk_grs_wgt.value);		
		formObj.grs_wgt1.value=doMoneyFmt(Number(grs_wgt1).toFixed(2));
		formObj.grs_wgt.value=doMoneyFmt(Number(grs_wgt).toFixed(2)); //roundXL(formObj.grs_wgt1.value.replaceAll(",","") / CNVT_CNST_KG_LB, 3);
		formObj.mk_grs_wgt.value=formObj.grs_wgt.value;
		formObj.mk_grs_wgt1.value=formObj.grs_wgt1.value;
		chkComma(formObj.grs_wgt,8,3);			
		formObj.mk_grs_wgt.value = doMoneyFmt(formObj.mk_grs_wgt.value);
		formObj.mk_grs_wgt1.value = doMoneyFmt(formObj.mk_grs_wgt1.value);		
	}
	if((colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "Del") && meas > 0){
		formObj.meas.value=doMoneyFmt(Number(meas).toFixed(3));
		formObj.meas1.value=roundXL(formObj.meas.value.replaceAll(",","") * CNVT_CNST_CBM_CFT, 3);
		formObj.mk_meas1.value=formObj.meas1.value;
		formObj.mk_meas.value=formObj.meas.value;		
		chkComma(formObj.meas1,8,3);
		formObj.mk_meas.value = doMoneyFmt(formObj.mk_meas.value);
		formObj.mk_meas1.value = doMoneyFmt(formObj.mk_meas1.value);
		// chkComma(formObj.mk_meas1, 8, 3);
		// chkComma(formObj.mk_meas, 8, 3);	
		formObj.meas1.value=doMoneyFmt(Number(meas1).toFixed(3));
		formObj.meas.value=roundXL(formObj.meas1.value.replaceAll(",","") / CNVT_CNST_CBM_CFT, 3);
		formObj.mk_meas.value=formObj.meas.value;
		formObj.mk_meas1.value=formObj.meas1.value;	
		// chkComma(formObj.mk_meas, 8, 3);
		// chkComma(formObj.mk_meas1, 8, 3);		
		chkComma(formObj.meas,8,3);
		formObj.mk_meas.value = doMoneyFmt(formObj.mk_meas.value);
		formObj.mk_meas1.value = doMoneyFmt(formObj.mk_meas1.value);
	}
	/* jsjang 2013.7.22  요구사항 #15952 Container Info 자동 필드값 반영요건  */
	if((colNm == "cgo_pck_qty" || colNm == "cgo_wgt" || colNm == "cgo_wgt1" || colNm == "cgo_meas" || colNm == "cgo_meas1" || colNm == "Del") && formObj.shp_mod_cd.value =="FCL"){
		mkSaidTxt(docObjects[1], formObj.sad_txt);
		mkSayTxt(docObjects[1], formObj.say_txt, frm1.intg_bl_seq.value, 'O');
	}
}
/* jsjang 2013.7.5 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건 End */	
}

function sheet3_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="sam_pck_ut_cd"){
		gridAdd(2);
		sheetObj.SelectCell(row+1, 1);
	}
}

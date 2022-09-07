/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BMD_0020.js
*@FileTitle  :  HGBL등록
*@author     : PhiTran
*@version    : 1.0
*@since      : 2014/06/23
=========================================================*/
var tab2click="";
var tab3click="";
var tab4click="";

var itemListSheet=false;
var udfListSheet=false;
var docListSheet=false;

var isInvStsOk=false;
var poDupl=false;
var poBkgYn=false;
var itemBlYn=false;

var rtnary=new Array(1);
var callBackFunc = "";
var poNoti = false;
var delete_show_complete = "N";

/* 
 * jsjang 2013.7.5 
 * 요구사항 #15963 (container infomation(pkg/whight/measurement)  자동연계요건
 * end 
 */  
//저장할 데이터를 각 목록에서 가지고 온다
function getSndParam(){
	var itemListParam=docObjects[1].GetSaveString(false);
	var udfListParam=docObjects[2].GetSaveString(false);
	var docListParam=docObjects[3].GetSaveString(false);
	
	var sheetParam='';
	
	isError=false;
	
	if(itemListParam!=''){
	  	sheetParam+= '&';
	  	sheetParam+= itemListParam;
	  	itemListSheet=true;
	}
	
	if(udfListParam!=''){
		sheetParam+= '&';
    	sheetParam+= udfListParam;
    	udfListSheet=true;
    }
	
	if(docListParam!=''){
	  	sheetParam+= '&';
	  	sheetParam+= docListParam;
	  	docListSheet=true;
	}
	
    if(isError == true)
    {
    	return true;
    }
    return sheetParam;
}

var refCheck=true;

function doWork(srcName){
	
	// #1624 - [Split - 1] #36226 - [JC2] OPUS Forwarding [Save] Changes
	setSaveConfirmMsg(srcName);
	
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    try{
		var formObj=document.frm1;
		var sheetObj=docObjects[0];
		var sheetObj2=docObjects[1];
		var sheetObj3=docObjects[2];
		var sheetObj4=docObjects[3];
		
        switch(srcName) {
        	case "NEW":
        		// #2084 - [PATENT] NEW 버튼 Confirm 메시지 추가
        		if(confirm(getLabel('FMS_COM_CFMNEW'))){
	        		doShowProcess();
	        		var currLocUrl=this.location.href;
	        		currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
	        		currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
	//        		parent.mkNewFrame(document.getElementById("bigtitle").innerHTML, currLocUrl);
	        		window.location.href = currLocUrl
	        		//var delete_show_complete = "N";
	           		if(delete_show_complete == "Y"){
	           			delete_show_complete = "N";
	           			showCompleteProcess();
	           		}
        		}
        		break;
           	
        	case "ITEM_ROWADD":
        		if(formObj.cust_trdp_cd.value!="" && formObj.ctrt_no.value!=""){
    				var intRows=sheetObj2.LastRow() + 1;
    				sheetObj2.DataInsert(intRows);
    			}else{
    				if(formObj.ctrt_no.value==""){
    					alert("Please select Contract No. before add new items !");
    					moveTab('01');
        				formObj.ctrt_no.focus();
        				return;
    				}
    				if(formObj.cust_trdp_cd.value==""){
    					alert("Please select Customer before add new items !");
    					moveTab('01');
        				formObj.cust_trdp_cd.focus();
        				return;
    				}
    			}
    		break;
    		
        	case "UDF_ROWADD":
    			var intRows=sheetObj3.LastRow()+1;
    			sheetObj3.DataInsert(intRows);
    		break;
    		
    		
	   	 	case "REMOVE":
	   	 	
	   	 		if(formObj.org_ord_sts_cd.value == "A" || formObj.org_ord_sts_cd.value == "E"){
	   	 			alert(getLabel('FMS_COM_ALT007') + "\n - " +"PO Status");  
	   	 			break;
	   	 		}
				// 'Do you want to delete?')){
				if (confirm(getLabel('FMS_COM_CFMDEL'))) {
					formObj.f_cmd.value = REMOVE;
					delete_show_complete = "Y";
					formObj.po_sys_no.value=trim(formObj.po_sys_no.value);
					docObjects[0].DoSearch("./OTH_OPR_0030GS.clt", FormQueryString(formObj));
					doWork('NEW');
				} 
			break;
    		
        	case "SAVE":
        		poDupl=false;
        		poBkgYn=false;
        		itemBlYn=false;
        		var mail_send_yn ="N"; 
        		// Customer PO No 중복체크
        		checkDupCustPoNo();
        		
        		if (poDupl){
					return;
				}
        		
        		// Order Status Check
        		if(!ordStsCheck()) return;
        		
        		// Approved => Ready, Approved => Canceled로 PO Status 변경시 Booking 여부 체크
    			/*checkPoBkgYn();
    			
    			if (poBkgYn){
					return;
				}*/
    			
    			// Approved => Ready, Approved => Canceled로 PO Status 변경시 B/L 여부 체크
    			/*checkStsPoItemBlYn();
    			
    			if (itemBlYn){
					return;
				}*/
        		
        		if(blCheckInpuVals()){
        			if(confirm(getLabel(saveMsg))){
						formObj.po_sys_no.value=trim(formObj.po_sys_no.value);

						// Sys_opt에 PO_NOTI = 'Y' 일 경우에만 Alert메시지를 보여준다.
						if (poNoti){
						
							if (!formObj.noti_send_yn.checked){
							
								if(confirm(getLabel('FMS_COM_NOTISAV'))){
									if (formObj.vndr_trdp_eml.value ==""){
										alert(getLabel('FMS_COM_ALT080'));
										return false;
									}else{
										mail_send_yn ="Y";
									}
									
								}else{
									mail_send_yn ="N";
								}
							}
							
						} else {
							mail_send_yn ="N";
						}
						
						
		        		if(formObj.po_sys_no.value=="" || formObj.po_sys_no.value=="1"){
		        			frm1.save_sts_flg.value="I";
		        		}
		        		else{
		        			frm1.save_sts_flg.value="U";
		        		}
		        		 
		        		
		        		formObj.f_cmd.value=MODIFY;
						var intRows=sheetObj.LastRow() + 1;
				        sheetObj.DataInsert(intRows);
				        
				        if(formObj.org_po_sys_no.value != ""){
				        	for(var i=2; i < sheetObj2.LastRow() + 1 ; i++){
				        		if(sheetObj2.GetCellValue(i, "item_ibflag") != "D"){
				        			sheetObj2.SetCellValue(i, "item_ibflag", "I");
				        		}
				        	}
				        		
				        	for(var i=1; i < sheetObj3.LastRow() + 1 ; i++){
				        		if(sheetObj3.GetCellValue(i, "udf_ibflag") != "D"){
				        			sheetObj3.SetCellValue(i, "udf_ibflag", "I");
				        		}
				        	}

				        	for(var i=1; i < sheetObj4.LastRow() + 1 ; i++){
				        		if(sheetObj4.GetCellValue(i, "doc_ibflag") != "D"){
				        			sheetObj4.SetCellValue(i, "doc_ibflag", "I");
				        		}
				        	}
				        }
				        
				        var sndParam=getSndParam();
		     		   	if(sndParam == true)	{	return false;	}
		     		    
		     		   if (formObj.org_po_sys_no.value != ""){
		     			  formObj.org_po_sys_no.value = "";
	        		   }
		     		   
		     		   	doShowProcess();
		     		   	docObjects[0].DoAllSave("./OTH_OPR_0030GS.clt", FormQueryString(frm1)+"&mail_send_yn="+mail_send_yn+sndParam, false);
	        		}
        		}
        		break;
        		
           case "COPY":
        	    frm1.f_cmd.value=COMMAND02;
        	    doShowProcess();
        	    frm1.submit();
	   	 		break;
        	   
           case "DOCFILE":	//첨부파일
       			var reqParam='?po_sys_no='+formObj.po_sys_no.value;
       			reqParam += '&openMean=SEARCH01';
      	   		popGET('./OTH_OPR_0050.clt'+reqParam, 'seeShipDoc', 806, 450, "scroll:no;status:no;help:no;");
      	   		break;
      	   		
      	   		// Email 전송로직 삭제 Bug 10366
//           case "SNDEML":	//Email전송
//          		var reqParam = '?intg_bl_seq='+formObj.intg_bl_seq.value;
//             	
//          		reqParam += '&openMean=SEARCH01';
//         	   	popGET('./SEE_BMD_0052.clt'+reqParam, 'seeShipDoc', 471, 450, "scroll:no;status:no;help:no;");
//       	   
//         	   	break;
      	   		
           case "SEARCHLIST":	//조회
			   formObj.f_po_sys_no.value=trim(formObj.f_po_sys_no.value);
			   formObj.f_cust_po_no.value=trim(formObj.f_cust_po_no.value);
			   
        	   if(formObj.f_po_sys_no.value==''&&formObj.f_cust_po_no.value==''){
        		   //Please enter more than one Search Condition!
        		   alert(getLabel('FMS_COM_ALT014'));
        		   formObj.f_cust_po_no.focus();
        		   return;
        	   }
        	   else{
        		   
        		   if (formObj.org_po_sys_no.value != ""){
        			   formObj.org_po_sys_no.value = "";
        		   }
        		   
                   formObj.f_cmd.value=SEARCHLIST;
                   submitForm(SEARCHLIST);
        	   }
        	   break;
        	   
           case "SEARCH_ITEM":	// Item 조회
        	   if(formObj.po_sys_no.value!='' || formObj.org_po_sys_no.value!=''){
        		   formObj.f_cmd.value=SEARCHLIST01;
        		   sheetObj2.DoSearch("OTH_OPR_0030_1GS.clt", FormQueryString(frm1) );
        	   }
        	   break;
        	   
           case "SEARCH_UDF":	// User Define Field 조회
        	   if(formObj.po_sys_no.value!='' || formObj.org_po_sys_no.value!=''){
        		   formObj.f_cmd.value=SEARCHLIST02;
        		   sheetObj3.DoSearch("OTH_OPR_0030_2GS.clt", FormQueryString(frm1) );
        	   }
        	   break;
        	   
           case "SEARCH_DOC":	//첨부문서 조회
        	   if(formObj.po_sys_no.value!='' || formObj.org_po_sys_no.value!=''){
		   	       formObj.f_cmd.value=SEARCHLIST03;
		   	       sheetObj4.DoSearch("./OTH_OPR_0030_3GS.clt", FormQueryString(frm1) );
        	   }	   	 	   
        	   break;
        	   
           //#21635 oyh  shipping document report 출력  
           case "S_DOC":
	   	 		if(sheetObj4.RowCount()> 0){
	   	 			formObj.file_name.value='po_doc_list.mrd';
	   	 			formObj.title.value='Document List';
	   	 			//Parameter Setting
	   	 			var param='[' + formObj.po_sys_no.value + ']';			// [1]
	   	 			param += '[' + formObj.cust_po_no.value + ']';			// [2] Buyer PO No.
	   	 			param += '[' + formObj.user_id.value + ']';				// [3]
	   	 			formObj.rd_param.value=param;
	   	 			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   	 		}
	   	 		break;
	   	 		
           case "CUST_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(1);
				rtnary[0]="";
				rtnary[1]=formObj.cust_trdp_nm.value;
				rtnary[2]=window;
		   		
		   		callBackFunc = "CUST_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	        break;
	   	        
           case "BUYER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(1);
				rtnary[0]="";
				rtnary[1]=formObj.buyr_trdp_nm.value;
				rtnary[2]=window;
		   		
		   		callBackFunc = "BUYER_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	        break;
	   	        
           case "VENDOR_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
		   	 	rtnary[0]="";
//				rtnary[1]=formObj.vndr_trdp_nm.value;
				rtnary[1]="";
				rtnary[2]=window;
				
		   		callBackFunc = "VENDOR_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	 		break;

           case "VENDOR_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
		   	 	rtnary[0]="";
				rtnary[1]=formObj.vndr_trdp_nm.value;
				rtnary[2]=window;
				
		   		callBackFunc = "VENDOR_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	 		break;
	   	 		
           case "FACTORY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
		   	 	rtnary[0]="";
				rtnary[1]=formObj.fctry_trdp_nm.value;
				rtnary[2]=window;
				
		   		callBackFunc = "FACTORY_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	 		break;
           case "SHPTO_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
		   	 	rtnary[0]="";
//				rtnary[1]=formObj.shpto_trdp_nm.value;
				rtnary[1]="";
				rtnary[2]=window;
				
		   		callBackFunc = "SHPTO_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	 		break;	

           case "SHPTO_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
		   	 	rtnary[0]="";
				rtnary[1]=formObj.shpto_trdp_nm.value;
				rtnary[2]=window;
				
		   		callBackFunc = "SHPTO_POPLIST";
		   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	 		break;	
	   	 		
	   	 	case "ORGIN_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
//				rtnary[2]=formObj.org_loc_nm.value;
				rtnary[2]="";
				
		   		callBackFunc = "ORGIN_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
	        break;

	   	 	case "ORGIN_LOCATION_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]=formObj.org_loc_nm.value;
				
		   		callBackFunc = "ORGIN_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
	        break;
	        
			case "DEST_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
//				rtnary[2]=formObj.dest_loc_nm.value;
				rtnary[2]="";
				
		   		callBackFunc = "DEST_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		   		break;

			case "DEST_LOCATION_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]="";
				rtnary[1]="";
				rtnary[2]=formObj.dest_loc_nm.value;
				
		   		callBackFunc = "DEST_LOCATION_POPLIST";
		   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		   		break;
		   		
			case "btn_ctrt_no":	
				var sUrl="./ContractRoutePopup.clt";
				callBackFunc = "setCtrtNoInfo";
				modal_center_open(sUrl, callBackFunc, 900,620,"yes");
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


function checkBoxSetting(){
	
	var formObj=document.frm1;
	if(formObj.shpwin_alert_yn.value=="Y"){
		formObj.shpwin_alert_yn.checked=true;
	}else{
		formObj.shpwin_alert_yn.checked=false;
	}	
	
	if(formObj.noti_send_yn.value=="Y"){
		formObj.noti_send_yn.checked=true;
	}else{
		formObj.noti_send_yn.checked=false;
	}
	
}



function refreshAjaxTab(url){
	var formObj=document.frm1;
	formObj.f_cust_po_no.value = getParam(url,"f_cust_po_no");
	formObj.f_po_sys_no.value = getParam(url,"f_po_sys_no");
	
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
		   url: "./OTH_OPR_0030AJ.clt",
		   dataType: 'xml',
		   data: $(formObj).serialize(),
		   success: function(data){
			   setFieldValue( formObj.f_isNumSep, $('f_isNumSep',data).text());
			   setFieldValue( formObj.f_cust_po_no, $('f_cust_po_no',data).text());
			   setFieldValue( formObj.f_po_sys_no, $('f_po_sys_no',data).text());
			   setFieldValue( formObj.org_cust_po_no, $('cust_po_no',data).text());
			   setFieldValue( formObj.cust_po_no, $('cust_po_no',data).text());
			   setFieldValue( formObj.h_ref_ofc_cd, $('ref_ofc_cd',data).text());
			   setFieldValue( formObj.po_sys_no, $('po_sys_no',data).text());
			   setFieldValue( formObj.org_ord_sts_cd, $('ord_sts_cd',data).text());
			   setFieldValue( formObj.h_ord_sts_cd, $('ord_sts_cd',data).text());
			   setFieldValue( formObj.ctrt_no, $('ctrt_no',data).text());
			   setFieldValue( formObj.ctrt_nm, $('ctrt_nm',data).text());
			   setFieldValue( formObj.cust_trdp_cd, $('cust_trdp_cd',data).text());
			   setFieldValue( formObj.cust_trdp_nm, $('cust_trdp_nm',data).text());
			   setFieldValue( formObj.cust_trdp_addr, $('cust_trdp_addr',data).text());
			   setFieldValue( formObj.cust_trdp_pic, $('cust_trdp_pic',data).text());
			   setFieldValue( formObj.cust_trdp_eml, $('cust_trdp_eml',data).text());
			   setFieldValue( formObj.cust_trdp_phn, $('cust_trdp_phn',data).text());
			   setFieldValue( formObj.cust_trdp_fax, $('cust_trdp_fax',data).text());
			   setFieldValue( formObj.buyr_trdp_cd, $('buyr_trdp_cd',data).text());
			   setFieldValue( formObj.buyr_trdp_nm, $('buyr_trdp_nm',data).text());
			   setFieldValue( formObj.vndr_trdp_cd, $('vndr_trdp_cd',data).text());
			   setFieldValue( formObj.vndr_trdp_nm, $('vndr_trdp_nm',data).text());
			   setFieldValue( formObj.vndr_trdp_addr, $('vndr_trdp_addr',data).text());
			   setFieldValue( formObj.vndr_trdp_pic, $('vndr_trdp_pic',data).text());
			   setFieldValue( formObj.vndr_trdp_eml, $('vndr_trdp_eml',data).text());
			   setFieldValue( formObj.vndr_trdp_phn, $('vndr_trdp_phn',data).text());
			   setFieldValue( formObj.vndr_trdp_fax, $('vndr_trdp_fax',data).text());
			   setFieldValue( formObj.fctry_trdp_cd, $('fctry_trdp_cd',data).text());
			   setFieldValue( formObj.fctry_trdp_nm, $('fctry_trdp_nm',data).text());
			   setFieldValue( formObj.fctry_trdp_addr, $('fctry_trdp_addr',data).text());
			   setFieldValue( formObj.fctry_trdp_pic, $('fctry_trdp_pic',data).text());
			   setFieldValue( formObj.fctry_trdp_eml, $('fctry_trdp_eml',data).text());
			   setFieldValue( formObj.fctry_trdp_phn, $('fctry_trdp_phn',data).text());
			   setFieldValue( formObj.fctry_trdp_fax, $('fctry_trdp_fax',data).text());
			   setFieldValue( formObj.org_loc_cd, $('org_loc_cd',data).text());
			   setFieldValue( formObj.org_loc_nm, $('org_loc_nm',data).text());
			   setFieldValue( formObj.dest_loc_cd, $('dest_loc_cd',data).text());
			   setFieldValue( formObj.dest_loc_nm, $('dest_loc_nm',data).text());
			   setFieldValue( formObj.h_air_sea_clss_cd, $('air_sea_clss_cd',data).text());
			   setFieldValue( formObj.h_frt_term_cd, $('frt_term_cd',data).text());
			   setFieldValue( formObj.h_inco_cd, $('inco_cd',data).text());
			   setFieldValue( formObj.cust_instr_txt, $('cust_instr_txt',data).text());
			   setFieldValue( formObj.po_rmk, $('po_rmk',data).text());
			   
			   setFieldValue( formObj.ord_dt, $('ord_dt',data).text());
			   setFieldValue( formObj.arr_dt, $('arr_dt',data).text());
			   setFieldValue( formObj.shpwin_fr_dt, $('shpwin_fr_dt',data).text());
			   setFieldValue( formObj.shpwin_to_dt, $('shpwin_to_dt',data).text());
			   setFieldValue( formObj.cgo_rdy_dt, $('cgo_rdy_dt',data).text());
			   setFieldValue( formObj.dept_cd, $('dept_cd',data).text());
			   setFieldValue( formObj.cntr_qty, $('cntr_qty',data).text());
			   numberCommaLen(formObj.cntr_qty,5,0);
			   setFieldValue( formObj.h_cntr_tpsz_cd, $('cntr_tpsz_cd',data).text());
			   setFieldValue( formObj.rgst_usrid, $('rgst_usrid',data).text());
			   var t_rgst_tms = $('rgst_tms',data).text().substring(0,2)+"-"+ $('rgst_tms',data).text().substring(2,4)+"-"+ $('rgst_tms',data).text().substring(4,8);
			   setFieldValue( formObj.rgst_tms, t_rgst_tms);
			   setFieldValue( formObj.modi_usrid, $('modi_usrid',data).text());
			   var t_modi_tms = $('modi_tms',data).text().substring(0,2)+"-"+ $('modi_tms',data).text().substring(2,4)+"-"+ $('modi_tms',data).text().substring(4,8);
			   setFieldValue( formObj.modi_tms, t_modi_tms);
			   setFieldValue( formObj.shpto_trdp_cd, $('shpto_trdp_cd',data).text());
			   setFieldValue( formObj.shpto_trdp_nm, $('shpto_trdp_nm',data).text());
			   setFieldValue( formObj.shpto_trdp_addr, $('shpto_trdp_addr',data).text());
			   setFieldValue( formObj.shpto_trdp_pic, $('shpto_trdp_pic',data).text());
			   setFieldValue( formObj.shpto_trdp_eml, $('shpto_trdp_eml',data).text());
			   setFieldValue( formObj.shpto_trdp_phn, $('shpto_trdp_phn',data).text());
			   setFieldValue( formObj.shpto_trdp_fax, $('shpto_trdp_fax',data).text());
			   
			   $(formObj.shpwin_alert_yn).val($('shpwin_alert_yn',data).text());
			   $(formObj.noti_send_yn).val($('noti_send_yn',data).text());

			   tab2click="";
			   tab3click="";
			   tab4click="";
			   
			   doBtnAuthority(attr_extension);
			   setOfficeData();
			   loadPage();
			   btnLoad();
			   loadData();
			   
			   doHideProcess();
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
	
	if(errMsg==''&&frm1.po_sys_no.value==''){
		frm1.f_po_sys_no.value=docObjects[0].GetCellValue(1, "sv_po_sys_no");
		frm1.po_sys_no.value=docObjects[0].GetCellValue(1, "sv_po_sys_no");
	}
	
	frm1.f_cust_po_no.value=docObjects[0].GetCellValue(1, "sv_cust_po_no");
	frm1.org_cust_po_no.value=docObjects[0].GetCellValue(1, "sv_cust_po_no");
	frm1.rgst_usrid.value=docObjects[0].GetCellValue(1, "sv_rgst_usrid");
	
	frm1.modi_usrid.value=docObjects[0].GetCellValue(1, "sv_modi_usrid");
	
	var t_modi_tms =docObjects[0].GetCellValue(1, "sv_modi_tms");
	frm1.modi_tms.value=t_modi_tms.substring(0,2)+"-"+ t_modi_tms.substring(2,4)+"-"+ t_modi_tms.substring(4,8);
	
	var t_rgst_tms = docObjects[0].GetCellValue(1, "sv_rgst_tms");///
	frm1.rgst_tms.value=t_rgst_tms.substring(0,2)+"-"+ t_rgst_tms.substring(2,4)+"-"+ t_rgst_tms.substring(4,8);
	
	if( docObjects[0].GetCellValue(1, "sv_noti_send_yn") =="Y"){
		frm1.noti_send_yn.checked = true ;
	}
	
	frm1.org_ord_sts_cd.value=frm1.ord_sts_cd.value;
	
	//#2068 - Document 번호 Title 에 반영
	setTabTitle(frm1.cust_po_no.value);
	
	if(itemListSheet){
		doWork('SEARCH_ITEM');		
	}
	
	if(udfListSheet){
		doWork('SEARCH_UDF');
	}
	
	if(docListSheet){
		doWork('SEARCH_DOC');
	}
	
	//버튼 초기화
	btnLoad();
	
	if(errMsg =='' ){
		showCompleteProcess();
	}
	
	sheetObj.SetBlur();	
}

/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat, obj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
        	var cal=new ComCalendar();
            cal.select(obj, 'MM-dd-yyyy');
        break;
        
        case 'DATE2':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(obj.shpwin_fr_dt, obj.shpwin_to_dt, 'MM-dd-yyyy');
        break;

        case 'DATE3':   //달력 조회 팝업 호출         	
            var cal=new ComCalendar(); 
            //cal.displayType="date";
            cal.setEndFunction("weekSelect");
            cal.select(frm1.ord_yr, 'yyyyMMdd');
            
        break;
    }
}

/**
 * 파일목록 조회시. 3번째 Sheet를 리턴함.
 */
function getSelectedFiles(){
	return docObjects[3];
}
//--------------------------------------------------------------------------------------------------------------
//                                             Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
function goTabSelect(isNumSep) {
	
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	frm1.f_isNumSep.value = isNumSep;	
	
	var tabObjs = document.getElementsByName('tabLayer');
	
    if( isNumSep == "01" ) {
    	currTab = isNumSep;	//탭상태저장
    	
        tabObjs[0].style.display = 'inline';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';

    // Item 탭
    }else if( isNumSep == "02" ) {
    	currTab = isNumSep;	//탭상태저장
    	
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'inline';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'none';
        
        if(tab2click == ""){
        	tab2click = "Y";
        	doWork('SEARCH_ITEM');
        }
        
    // User Define Field 탭
    }else if( isNumSep == "03" ) {
    	currTab = isNumSep;	//탭상태저장
    	
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'inline';
        tabObjs[3].style.display = 'none';
        
        if(tab3click == ""){
        	tab3click = "Y";
        	doWork('SEARCH_UDF');
        }
       
    // Document List 탭    
    }else if( isNumSep == "04" ) {
    	currTab = isNumSep;	//탭상태저장
    	
        tabObjs[0].style.display = 'none';
        tabObjs[1].style.display = 'none';
        tabObjs[2].style.display = 'none';
        tabObjs[3].style.display = 'inline';
        
        if(tab4click == ""){
        	tab4click = "Y";
        	doWork('SEARCH_DOC');
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
var docObjects = new Array();
var sheetCnt = 0;

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
var isRun = false;
function loadPage() {
	
    for(var i=0;!isRun && i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
        if(i == docObjects.length - 1){
        	isRun = true;
        }
    }
    
    //PO Notification을 실행할지 체크한다.
	var opt_key = "PO_NOTI";
	ajaxSendPost(setPoNotiReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	if (poNoti){
		var po_notification = document.getElementById('po_notification');
		po_notification.style.display = 'inline';
	}
	
    checkBoxSetting();
	/* jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. */
	goTabSelect(frm1.f_isNumSep.value);

	
	// 현재 년도를 설정한다.
	if (frm1.ord_yr.value == ""){
		frm1.ord_yr.value = selectCurYear();
	}
	// 저장된 값이 없으면 Default로 현재 주를 설정한다.
	if (frm1.ord_wk_h.value != ""){
		frm1.ord_wk.value = frm1.ord_wk_h.value;
	} else {
		frm1.ord_wk.value = selectCurWeek();
	}
	// 주 리스트를 만든다
	
	//makeWeekList(frm1.ord_wk.value);

	/* 2016-12-12 자동완성 기능 추가 S */
	fnSetAutocompleteCallBack('cust_trdp_nm'	, 'CUST_POPLIST'  , 'LINER_POPLIST'); 		//Customer
	fnSetAutocompleteCallBack('vndr_trdp_nm'	, 'VENDOR_POPLIST', 'LINER_POPLIST'); 		//Vendor
	fnSetAutocompleteCallBack('shpto_trdp_nm'	, 'SHPTO_POPLIST' , 'LINER_POPLIST'); 		//Ship To
	fnSetAutocompleteCallBack('org_loc_nm'		, 'ORGIN_LOCATION_POPLIST', 'LOCATION_POPLIST'); 		//Origin
	fnSetAutocompleteCallBack('dest_loc_nm'		, 'DEST_LOCATION_POPLIST' , 'LOCATION_POPLIST'); 		//Destination	
    /* 2016-12-12 자동완성 기능 추가 E */		
}

/**
 * 날짜 콤보를 선택한 값을 주차로 변환한다.
 */
function weekSelect(){
	
	var selectedDt = frm1.ord_yr.value;
	var year = selectedDt.substring(0,4);	
	frm1.ord_yr.value = year;
	
	//var week = getSecofWeek(selectedDt);
	frm1.ord_wk.value = selectWeek(selectedDt);
	//alert(selectWeek(selectedDt));
}

	
/**
 * 현재 년도를 취득한다.
 */
function selectCurYear() {
	
	var date = new Date();
	return date.getFullYear();
}

/**
 * 현재 주를 취득한다.
 */
function selectCurWeek() {
	
	var date = new Date();	
	var onejan = new Date(date.getFullYear(),0,1);
    return Math.ceil((((date - onejan) / 86400000) + onejan.getDay()+1)/7);
}

/**
 * 특정일의 주를 취득한다.
 */
function selectWeek(date) {
	
	var date = new Date( date.substring(0,4), parseInt(date.substring(4,6))-1, date.substring(6,8) );
	var onejan = new Date(date.getFullYear(),0,1);
	return Math.ceil((((date - onejan) / 86400000) + onejan.getDay()+1)/7);
}


/**
 * MM-DD-YYYY 형식으로 반환한다
 */
function dateFormat(date){
	var d = new Date( date.substring(0,4), parseInt(date.substring(4,6))-1, date.substring(6,8) );
	return 	("00" + (d.getMonth() + 1)).slice(-2) + "-" + ("00" + d.getDate()).slice(-2) + "-" + d.getFullYear();
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
			with(sheetObj){
		    	SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );
	
		    	var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		    	var headers = [ { Text:getLabel('OTH_OPR_0030_HDR1'), Align:"Center"} ];
		    	InitHeaders(headers, info);
		    	
		    	var cols = [ {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_po_sys_no" },
		    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_cust_po_no" },
		    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_rgst_usrid" },
		    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_rgst_tms" },
		    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_modi_usrid" },
		    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_modi_tms" },
		    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_noti_send_yn" },
		    	             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" } ];
		       
		    	InitColumns(cols);
		    	SetEditable(1);
		    	
		    	SetVisible(false);

			}
        break;
		
		case 2:     //Item
		    with(sheetObj){
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, TabStop:0 } );

				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('OTH_OPR_0030_HDR2_1'), Align:"Center"},
			                    { Text:getLabel('OTH_OPR_0030_HDR2_2'), Align:"Center"} ];
				InitHeaders(headers, info);

				var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"Del" },
				             {Type:"Popup", 	Hidden:0, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"cust_itm_id",    	KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,	EditLen:20 	},
				             {Type:"Text",      Hidden:0, Width:160,  Align:"Left",    ColMerge:1,   SaveName:"cust_itm_nm",    	KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"AutoSum",   Hidden:0, Width:100,  Align:"Right",   ColMerge:0,   SaveName:"pck_qty",        	KeyField:0,   CalcLogic:"",   Format:"Integer",   	PointCount:0,   UpdateEdit:1,   InsertEdit:1,	EditLen:7 	},
				             {Type:"AutoSum",   Hidden:0, Width:100,  Align:"Right",   ColMerge:0,   SaveName:"rmn_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",   	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text", 		Hidden:1, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"pck_ut_cd",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Popup", 	Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"pck_ut_nm",      	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Float",     Hidden:0, Width:100,  Align:"Right",   ColMerge:0,   SaveName:"pck_inr_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",   	PointCount:0,   UpdateEdit:1,   InsertEdit:1,	EditLen:7 	},
				             {Type:"AutoSum",   Hidden:0, Width:100,  Align:"Right",   ColMerge:0,   SaveName:"ea_cnt",        		KeyField:0,   CalcLogic:"",   Format:"Integer",   	PointCount:0,   UpdateEdit:1,   InsertEdit:1,	EditLen:7 	},
				             {Type:"AutoSum",   Hidden:0, Width:100,  Align:"Right",   ColMerge:0,   SaveName:"rmn_ea_cnt",        	KeyField:0,   CalcLogic:"",   Format:"Integer",   	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"AutoSum",   Hidden:0, Width:130,  Align:"Right",   ColMerge:0,   SaveName:"ttl_qty",        	KeyField:0,   CalcLogic:"",   Format:"Integer",   	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"AutoSum",   Hidden:0, Width:130,  Align:"Right",   ColMerge:0,   SaveName:"rmn_ttl_qty",        KeyField:0,   CalcLogic:"",   Format:"Integer",   	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",      Hidden:0, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"cmdt_rmk",         	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,	EditLen:50  },
				             {Type:"AutoSum",   Hidden:0, Width:120,  Align:"Right",   ColMerge:0,   SaveName:"cmdt_kgs_wgt",       KeyField:0,   CalcLogic:"",   Format:"Float",   	PointCount:2,   UpdateEdit:1,   InsertEdit:1,	EditLen:10  },
				             {Type:"AutoSum",   Hidden:0, Width:120,  Align:"Right",   ColMerge:0,   SaveName:"cmdt_lbs_wgt",       KeyField:0,   CalcLogic:"",   Format:"Float",   	PointCount:2,   UpdateEdit:1,   InsertEdit:1,	EditLen:10  },
				             {Type:"AutoSum",   Hidden:0, Width:120,  Align:"Right",   ColMerge:0,   SaveName:"cmdt_cbm_meas",      KeyField:0,   CalcLogic:"",   Format:"Float",   	PointCount:3,   UpdateEdit:1,   InsertEdit:1,	EditLen:11  },
				             {Type:"AutoSum",   Hidden:0, Width:120,  Align:"Right",   ColMerge:0,   SaveName:"cmdt_cft_meas",      KeyField:0,   CalcLogic:"",   Format:"Float",   	PointCount:3,   UpdateEdit:1,   InsertEdit:1,	EditLen:11  },
				             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"po_cmdt_seq" },
				             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"po_sys_no" },
				             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ctrt_no" },
				             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"item_sys_no" },
				             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"item_ibflag" } ];
	       
		      InitColumns(cols);
	
		      SetEditable(1);
		      //SetColProperty(0 ,"cust_itm_id" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
		      //SetColProperty('pck_ut_cd', {ComboText:PCKCD1, ComboCode:PCKCD2, DefaultValue:"CT"} );
		      SetSheetHeight(400);
           }                                                      
	    break;
	    
		case 3:		//User Define Field
		    with(sheetObj){
		    	SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );

		      	var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      	var headers = [ { Text:getLabel('OTH_OPR_0030_HDR3'), Align:"Center"} ];
		      	InitHeaders(headers, info);

		      	var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"Del" },
				             {Type:"Combo",     Hidden:0, Width:400,  Align:"Left",    ColMerge:0,   SaveName:"udf_cd",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:50 	},
				             {Type:"Text",      Hidden:0, Width:500,  Align:"Left",    ColMerge:0,   SaveName:"udf_val",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:200  	},
				             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"po_sys_no" },
				             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"udf_ibflag" } ];
		       
		      	InitColumns(cols);

		      	SetEditable(1);
		      	SetColProperty('udf_cd', {ComboText:UDFCD1, ComboCode:UDFCD2} );
		      	SetSheetHeight(400);
			}
		break;
		
	    case 4:					//첨부파일
	        with(sheetObj){
	    		SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:0, TabStop:0 } );

	    		var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	    		var headers = [ { Text:getLabel('OTH_OPR_0030_HDR4'), Align:"Center"} ];
	    		InitHeaders(headers, info);

	    		var cols = [ {Type:"Status",    Hidden:1, Width:45,   Align:"Center",  ColMerge:0,   SaveName:"doc_ibflag" },
	    		             {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"Del",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"po_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	    		             {Type:"Text",      Hidden:0,  Width:55,   Align:"Center", ColMerge:0,   SaveName:"po_ext_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"palt_doc_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"po_doc_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"po_doc_tp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"po_doc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",   ColMerge:0,   SaveName:"po_doc_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:0,  Width:480,  Align:"Left",   ColMerge:0,   SaveName:"po_doc_msg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"po_doc_img_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"po_doc_pdf_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"po_doc_rmk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center", ColMerge:0,   SaveName:"rgst_tms",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	    		             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"po_sys_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
	       
	    		InitColumns(cols);

	    		SetEditable(1);
	    		SetImageList(0,APP_PATH+"/web/img/button/bt_img.gif");
	    		SetImageList(1,APP_PATH+"/web/img/button/bt_pdf.gif");
	    		sheetObj.SetDataLinkMouse("po_doc_nm",1);
	    		sheetObj.SetDataLinkMouse("po_doc_img_url",1);
	    		sheetObj.SetDataLinkMouse("po_doc_pdf_url",1);
	    		//InitViewFormat(0, "rgst_tms", "MM-dd-yyyy");//날짜 포맷을 월/일/년 으로 설정
	    		SetSheetHeight(400);
	      	}
	    break;
    }
}

//########################## 첨부문서 ##########################
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet4_OnDblClick(sheetObj,Row,Col){
	//Name선택 시에만 팝업 호출
	if(sheetObj.ColSaveName(Col)=='po_doc_no' || sheetObj.ColSaveName(Col)=='po_doc_msg'){
		var reqParam='?po_sys_no='+frm1.po_sys_no.value;
		reqParam += '&s_palt_doc_seq='+sheetObj.GetCellValue(Row,"palt_doc_seq");
		reqParam += '&openMean='+SEARCH02;
		popGET('./OTH_OPR_0050.clt'+reqParam, 'seeShipDocUp', 806, 450, "scroll:no;status:no;help:no;");
	}
}
function sheet4_OnMouseMove(sheetObj, row, col){
	if(sheetObj.MouseCol()==9){
		sheetObj.ToolTipOption="balloon:true;width:320;backcolor:#FFFFE0;forecolor:#000000;icon:0;title:Message";
		var memo=sheetObj.GetCellValue(sheetObj.MouseRow(), "po_doc_msg");
		memo=memo.replaceAll("@^^@", "\n");
		sheetObj.SetToolTipText(sheetObj.MouseRow(), sheetObj.MouseCol(),memo);
	}
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet4_OnClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet4_OnClick(sheetObj, Row, Col){	
   	var downType;
   	var s_palt_doc_seq;
   	var s_po_sys_no;
	switch (sheetObj.ColSaveName(Col)) {
        case "po_doc_img_url" :
         	if(sheetObj.GetCellImage(Row, "po_doc_img_url")  != ""){
         		s_palt_doc_seq=sheetObj.GetCellValue(Row,"palt_doc_seq");
         		s_po_sys_no=sheetObj.GetCellValue(Row,"po_sys_no");
                downloadFile('org', s_po_sys_no, s_palt_doc_seq);
        	}
        	break;
        case "po_doc_pdf_url" :
         	if(sheetObj.GetCellImage(Row, "po_doc_pdf_url") != ""){
         		s_palt_doc_seq=sheetObj.GetCellValue(Row,"palt_doc_seq");
         		s_po_sys_no=sheetObj.GetCellValue(Row,"po_sys_no");
	            downloadFile('pdf', s_po_sys_no, s_palt_doc_seq);
        	}
        	break;
	} // end switch
}

//파일 다운로드
function downloadFile(downType, s_po_sys_no, s_palt_doc_seq){
	document.frm2.docType.value=downType;
	document.frm2.s_palt_doc_seq.value=s_palt_doc_seq;
	document.frm2.po_sys_no.value=s_po_sys_no;
	document.frm2.submit();
}
/**
 * 파일 업로드 팝업에서 목록 Reload
 */
function reloadDocList(){
	doWork('SEARCH_DOC');
}
/**
 *Booking&B/L 메인 화면의 입력값 확인
 */
function blCheckInpuVals(){
	var isOk=true;
	
	if(!chkCmpAddr(frm1.cust_trdp_addr, 'Customer Address')){
		isOk=false;
		moveTab('01');
		return isOk; 
	}
	if(!chkCmpAddr(frm1.vndr_trdp_addr, 'Vendor Address')){
		isOk=false;
		moveTab('01');
		return isOk; 
	}
	
	/*if(!chkCmpAddr(frm1.fctry_trdp_addr, 'Factory Address')){
		isOk=false;
		moveTab('01');
		return isOk; 
	}*/
	
	if(frm1.cust_po_no.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.cust_po_no.focus();
		isOk=false;
		return isOk; 
	}
	
	if(frm1.ref_ofc_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.ref_ofc_cd.focus();
		isOk = false;
		return isOk; 
	}
	
	if(frm1.ctrt_no.value == ""){
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.ctrt_no.focus();
		isOk=false;
		return isOk; 
	}
	
	if(frm1.cust_trdp_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.cust_trdp_cd.focus();
		isOk=false;
		return isOk; 
	}
	
	if(frm1.cust_trdp_nm.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.cust_trdp_nm.focus();
		isOk=false;
		return isOk; 
	}
	
	if(checkInputVal(frm1.cust_trdp_nm.value, 0, 50, "T", 'Customer')!='O'){
		moveTab('01');
		frm1.cust_trdp_nm.focus();
		isOk=false;
		return isOk; 
		
	}
	
	if(checkInputVal(frm1.cust_trdp_addr.value, 0, 400, "T", 'Customer Address')!='O'){
		moveTab('01');
		frm1.cust_trdp_addr.focus();
		isOk=false;		
		return isOk; 
	}
	/*
	if(frm1.buyr_trdp_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.buyr_trdp_cd.focus();
		isOk=false;
		return isOk; 
	}
	
	if(frm1.buyr_trdp_nm.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.buyr_trdp_nm.focus();
		isOk=false;
		return isOk; 
	}
	
	if(checkInputVal(frm1.buyr_trdp_nm.value, 0, 50, "T", 'Buyer')!='O'){
		moveTab('01');
		frm1.buyr_trdp_nm.focus();
		isOk=false;
		return isOk; 
		
	}*/
	
	if(frm1.vndr_trdp_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.vndr_trdp_cd.focus();
		isOk=false;
		return isOk; 
	}
	
	if(frm1.vndr_trdp_nm.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.vndr_trdp_nm.focus();
		isOk=false;
		return isOk; 
	}
	
	if(checkInputVal(frm1.vndr_trdp_nm.value, 0, 50, "T", 'Vendor')!='O'){
		moveTab('01');
		frm1.vndr_trdp_nm.focus();
		isOk=false;
		return isOk; 
		
	}
	
	if(checkInputVal(frm1.vndr_trdp_addr.value, 0, 400, "T", 'Vendor Address')!='O'){
		moveTab('01');
		frm1.vndr_trdp_addr.focus();
		isOk=false;		
		return isOk; 
	}
	/*
	if(checkInputVal(frm1.fctry_trdp_nm.value, 0, 50, "T", 'Factory')!='O'){
		moveTab('01');
		frm1.fctry_trdp_nm.focus();
		isOk=false;
		return isOk; 
		
	}
	
	if(checkInputVal(frm1.fctry_trdp_addr.value, 0, 400, "T", 'Factory Address')!='O'){
		moveTab('01');
		frm1.fctry_trdp_addr.focus();
		isOk=false;		
		return isOk; 
	}*/
	
	/*if(frm1.org_loc_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.org_loc_cd.focus();
		isOk=false;
		return isOk; 
	}
	
	if(frm1.dest_loc_cd.value == "") { 
		alert(getLabel('FMS_COM_ALT001'));
		moveTab('01');
		frm1.dest_loc_cd.focus();
		isOk=false;
		return isOk; 
	}*/
	
	if(!checkInType(frm1.ord_dt.value, "DD")){	
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ORDT'));
		moveTab('01');
		frm1.ord_dt.focus();
		isOk=false;
		return isOk; 
	}
	
	if(!checkInType(frm1.shpwin_fr_dt.value, "DD")){	
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_SHPW'));
		moveTab('01');
		frm1.shpwin_fr_dt.focus();
		isOk=false;
		return isOk; 
	}
	
	if(!checkInType(frm1.shpwin_to_dt.value, "DD")){	
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_SHPW'));
		moveTab('01');
		frm1.shpwin_to_dt.focus();
		isOk=false;
		return isOk; 
	}
	
	if(trim(frm1.shpwin_fr_dt.value)!= "" && trim(frm1.shpwin_to_dt.value) != ""){
		if(getDaysBetweenFormat(frm1.shpwin_fr_dt, frm1.shpwin_to_dt, "MM-dd-yyyy") < 0){
			// "End date must be greater than start date"
			alert(getLabel("FMS_COM_ALT033"));
			moveTab('01');
			frm1.shpwin_fr_dt.focus();
			isOk=false;
			return isOk; 
		}
	}
	
	// Item List validation.
    var itemListParam=docObjects[1].GetSaveString(false);
    if(docObjects[1].IsDataModified() && itemListParam == "") { isOk=false; };
	if(itemListParam!=''){
		if(itemListCheckInpuVals(docObjects[1])){
			isOk=false;
			return isOk; 
		}
	}
	
	// User Define Field List validation.
    var udfListParam=docObjects[2].GetSaveString(false);
    if(docObjects[2].IsDataModified() && udfListParam == "") { isOk=false; };
	if(udfListParam!=''){
		if(udfListCheckInpuVals(docObjects[2])){
			isOk=false;
			return isOk; 
		}
	}
	
	return isOk;
}

 /**
  * Item List의 입력값 확인
  */
function itemListCheckInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1;
 	var isError=false; 
 	
 	for(var i=2; i < totRow ; i++){
 		if(sheetObj.GetCellValue(i, 'item_ibflag')=='U' || sheetObj.GetCellValue(i, 'item_ibflag')=='I'){
 			if(sheetObj.GetCellValue(i,"cust_itm_id") == "" || sheetObj.GetCellValue(i,"cust_itm_nm") == ""){
				isError=true;
				moveTab('02');
				alert(getLabel('FMS_COM_ALT001'));				
				sheetObj.SelectCell(i,"cust_itm_id");
				break;
			}
			
			if(sheetObj.GetCellValue(i,"pck_ut_nm") == ""){
				isError=true;
				moveTab('02');
				alert(getLabel('FMS_COM_ALT001'));			
				sheetObj.SelectCell(i,"pck_ut_nm");
				break;
			}
 			
 			if(Number(sheetObj.GetCellValue(i, 'pck_inr_qty')) == 0){
 				isError=true;
 				moveTab('02');
 				// Input data must be greater than 0.
 				alert(getLabel("FMS_COM_ALT042"));
 				sheetObj.SelectCell(i, 'pck_inr_qty', false);
 				break;
 			}
 			/*
 			if(Number(sheetObj.GetCellValue(i, 'pck_qty')) == 0){
 				isError=true;
 				moveTab('02');
 				// Input data must be greater than 0.
 				alert(getLabel("FMS_COM_ALT042"));
 				sheetObj.SelectCell(i, 'pck_qty', false);
 				break;
 			}*/
 			
 			if(Number(sheetObj.GetCellValue(i, 'ttl_qty')) == 0){
 				isError=true;
 				moveTab('02');
 				// Input data must be greater than 0.
 				alert(getLabel("FMS_COM_ALT042"));
 				sheetObj.SelectCell(i, 'ttl_qty', false);
 				break;
 			}
 			
 			if(frm1.ord_sts_cd.value == "A" && frm1.po_rmk.value == ""){
 				isError=true;
				moveTab('01');
				alert("You have changed items. Please enter the remark.");				
				frm1.po_rmk.focus();
				break;
 			}
 		}else if(sheetObj.GetCellValue(i, 'item_ibflag')=='D'){
 			checkPoItemBlYn(i);
 			
 			if (itemBlYn){
 				isError=true;
 				moveTab('02');
 				break;
 			}
 		}
 	}
 	return isError;
} 

/**
 * User Define Field List의 입력값 확인
 */
function udfListCheckInpuVals(sheetObj){
	var totRow=sheetObj.LastRow() + 1;
	var isError=false; 
	
	for(var i=1; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'udf_ibflag')=='U' || sheetObj.GetCellValue(i, 'udf_ibflag')=='I'){
			if(sheetObj.GetCellValue(i,"udf_cd") == ""){
				isError=true;
				moveTab('03');
				alert(getLabel("FMS_COM_ALT001"));
				sheetObj.SelectCell(i, 'udf_cd', false);
				break;
			}
		}
	}
	return isError;
} 

function chkCmpAddr(obj, msgTxt){
	//20121130 OJG 
	//checkTxtAreaLn(obj, 100, 10, msgTxt);
	textarea_autoenter_50(obj);
	return checkTxtAreaLn(obj, 62, 6, msgTxt); 
}

function textarea_autoenter_50(obj){
   	var enterText='\r\n';
	var textareaVal=obj.value.replace(/\r/g, '');
	var txtValArr=textareaVal.split('\n');
	var replaceVal='';
	for (var i=0 ; i < txtValArr.length; i++) {
		var rowVal=txtValArr[i];
		var rowLen=rowVal.length;
		if (rowLen > 60) {
			var replaceRowVal='';
			for (var j=0 ; j < rowLen ; j++) {
				rowVal=rowVal.replace(/\n/g, ''); 
				var tempChar=rowVal.charAt(j);
				if (0 < j && j%60 == 0) {
					replaceRowVal += (enterText + tempChar);
				} else {
					replaceRowVal += tempChar;
				}
			}
			rowVal=replaceRowVal;
		}
		if(i>0){
			replaceVal += (enterText + rowVal);
		}else{
			replaceVal += rowVal;
		}
	}
	obj.value=replaceVal;
}

function setOfficeData(){
	var formObj=document.frm1;
	
	//office code
	formObj.ref_ofc_cd.value = v_ofc_cd;
}

function loadData(){
	if(frm1.po_sys_no.value!="" || frm1.org_po_sys_no.value!=""){
		frm1.ref_ofc_cd.value		= frm1.h_ref_ofc_cd.value;
		frm1.ord_sts_cd.value		= frm1.h_ord_sts_cd.value;
		frm1.air_sea_clss_cd.value	= frm1.h_air_sea_clss_cd.value;
		frm1.frt_term_cd.value		= frm1.h_frt_term_cd.value;
		frm1.inco_cd.value			= frm1.h_inco_cd.value;
		frm1.cntr_tpsz_cd.value		= frm1.h_cntr_tpsz_cd.value;
		
		//#2068 - Document 번호 Title 에 반영
		setTabTitle(frm1.cust_po_no.value);
		
		//Textbox 로 변경 Combo로 갈경우 아래 주석 해제
		//addDeptCd();		
		
	}
	
	if(frm1.org_po_sys_no.value != ""){
		frm1.ref_ofc_cd.value = v_ofc_cd;
		
		tab2click = "Y";
		tab3click = "Y";
		tab4click = "Y";
		
		doWork('SEARCH_ITEM');
		doWork('SEARCH_UDF');
		doWork('SEARCH_DOC');
	}
	 
	frm1.cust_po_no.focus();
}

function sheet2_OnSearchEnd(){
	docObjects[1].ShowSum();
	docObjects[1].SetSumText(0,0,"Total");
	docObjects[1].SetMergeCell(docObjects[1].LastRow(), 0, 1, 3);
	//Column, Width 재조정하기
	docObjects[1].FitSize(1, 0);
	sheetObj.SetBlur();
}

var cur_row;

function sheet2_OnPopupClick(sheetObj, row, col) {
	
	var formObj = document.frm1;
	var colName=sheetObj.ColSaveName(col);
	var colValue=sheetObj.GetCellValue(row, col) ;
	
	if(colName == "cust_itm_id"){
		if (isNull(formObj.ctrt_no)) {
			alert(getLabel('FMS_COM_ALT001'));
			sheetObj.SetCellValue(row,"cust_itm_id","",0);
			sheetObj.SetCellValue(row,"cust_itm_nm","",0);
			moveTab('01');
			formObj.ctrt_no.focus();
			return;
		}
		OpenCustItmPop(colValue);
		
	}else if(colName == "pck_ut_nm"){
		callBackFunc = "setPkgunitGrid";
		var sUrl="CommonCodePopup.clt?grp_cd=A6&code="+""+"&wh_flag=Y&ctrt_no="+encodeURIComponent(ComGetObjValue(formObj.ctrt_no)) +"&item_sys_no="+sheetObj.GetCellValue(row, "item_sys_no");
		modal_center_open(sUrl, callBackFunc, 450, 520, "0,0", true);
	}
	
	/*cur_row = row;
	
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	
	// Item Code조회
	if(colStr == "cust_itm_id"){
		OpenCustItmPop();
	}*/
}

function setPkgunitGrid(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var arrVal = rtnVal.split("|");
		var row = docObjects[1].GetSelectRow();
		if( docObjects[1].GetCellValue(row, "pck_ut_cd")!= arrVal[1]){
			docObjects[1].SetCellValue(row,"pck_ut_nm",0,0);
			docObjects[1].SetCellValue(row,"pck_inr_qty",0,0);
			docObjects[1].SetCellValue(row,"pck_qty",0,0);
			docObjects[1].SetCellValue(row,"ea_cnt",0,0);
			docObjects[1].SetCellValue(row,"ttl_qty",0,0);
			docObjects[1].SetCellValue(row,"cmdt_kgs_wgt",0,0);
			docObjects[1].SetCellValue(row,"cmdt_lbs_wgt",0,0);
			docObjects[1].SetCellValue(row,"cmdt_cbm_meas",0,0);
			docObjects[1].SetCellValue(row,"cmdt_cft_meas",0,0);
		}
		docObjects[1].SetCellValue(docObjects[1].GetSelectRow(), "pck_ut_cd",arrVal[1],0);
		docObjects[1].SetCellValue(docObjects[1].GetSelectRow(), "pck_ut_nm",arrVal[2],0);
	}
	// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
	ajaxSendPost(getInfo_Item_byCtrtNo_UnitCd, 'reqVal', '&goWhere=aj&bcKey=getInfo_Item_byCtrtNo_UnitCd&ctrt_no='+encodeURIComponent(formObj.ctrt_no.value)+"&unit_cd="+arrVal[1]+"&itm_cd="+ docObjects[1].GetCellValue(docObjects[1].GetSelectRow(), "cust_itm_id"), './GateServlet.gsl');
}

function getInfo_Item_byCtrtNo_UnitCd(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				var arrVal = rtnArr[0].split("|");
				docObjects[1].SetCellValue(docObjects[1].GetSelectRow(),"pck_inr_qty",arrVal[0],0);
				if(arrVal.length > 2){
					var row = docObjects[1].GetSelectRow();
					docObjects[1].SetCellValue(row,'cmdt_kgs_wgt',arrVal[4]);
//					docObjects[1].SetCellValue(row, "itm_dim_wgt_lbs",roundXL(arrVal[4] * CNVT_CNST_KG_LB, 2),0);
//					docObjects[1].SetCellValue(row,'itm_act_wgt',arrVal[5],0);
//					docObjects[1].SetCellValue(row, "itm_act_wgt_lbs",roundXL(arrVal[5] * CNVT_CNST_KG_LB, 2),0);
					docObjects[1].SetCellValue(row,'cmdt_cbm_meas',arrVal[6]);
//					docObjects[1].SetCellValue(row, "itm_vol_cft",roundXL(arrVal[6] *35.3147, 2),0);
				}
			}
		}
	}
}

function CUST_ITM_ID(rtnVal, sheetObj, row, col){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[1].SetCellValue(cur_row, 'cust_itm_id', rtnValAry[0], 0);
		docObjects[1].SetCellValue(cur_row, 'cust_itm_nm',rtnValAry[1], 0);
	}
}

function sheet2_OnChange(sheetObj, row, col, value){
	var formObj=document.frm1;
	var inv_amt = (Number(sheetObj.GetCellValue(row, "pck_inr_qty")) * Number(sheetObj.GetCellValue(row, "pck_qty"))) + Number(sheetObj.GetCellValue(row, "ea_cnt"));
	switch (sheetObj.ColSaveName(col)) {
		case "pck_inr_qty" :
		case "pck_qty" :
		case "ea_cnt" :
		case "cmdt_kgs_wgt" :
		case "cmdt_lbs_wgt" :
		case "cmdt_cbm_meas" :
		case "cmdt_cft_meas" :
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
		case "cust_itm_id":
			var curVal=sheetObj.GetCellValue(row, "cust_itm_id");
			if(curVal==''){
				sheetObj.SetCellValue(row, "cust_itm_nm","");
				return;
			}else{
				if(!checkCustItmId(sheetObj.GetCellValue(row, "cust_itm_id"))){
					//This Container Number is already used!\nPlease check the Container Number!
					alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('ITEM'));
					sheetObj.SetCellValue(row, "cust_itm_id",'',0);
					sheetObj.SetCellValue(row, "cust_itm_nm",'',0);
					sheetObj.SelectCell(row, "cust_itm_id");
					return;
				} else {
					ajaxSendPost(searchCustItem, 'reqVal', '&goWhere=aj&bcKey=getWHItem&ctrt_no='+encodeURIComponent(formObj.ctrt_no.value)+"&itm_cd="+sheetObj.GetCellValue(row, "cust_itm_id"), './GateServlet.gsl');
					//var row = docObjects[1].GetSelectRow();
					//var xml = loadDftItmVal(curVal);
					//displayDftItmVal(xml,row);
				}
			}
		break;
		
		case "pck_inr_qty":
			if(inv_amt > 9999999) {//7 digit
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row,'pck_inr_qty',0);
				return;
			} else {
				sheetObj.SetCellValue(row, "ttl_qty",inv_amt,0);
			}
			
			break;
		case "pck_qty":
			if(inv_amt > 9999999) {//7 digit
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row,'pck_qty',0);
				return;
			} else {
				sheetObj.SetCellValue(row, "ttl_qty",inv_amt,0);
			}
		case "ea_cnt":
			
			if(inv_amt > 9999999) {//7 digit
				ComShowCodeMessage('COM03230');
				sheetObj.SetCellValue(row,'ea_cnt',0);
				return;
			} else {
				sheetObj.SetCellValue(row, "ttl_qty",inv_amt,0);
			}
			
			break;
		
		case "cmdt_kgs_wgt":
			sheetObj.SetCellValue(row, "cmdt_lbs_wgt",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_KG_LB, 2),0);
			if (sheetObj.GetCellValue(row, "cmdt_lbs_wgt") >99999999.99) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGWEIG'));				
				sheetObj.SetCellValue(row, "cmdt_kgs_wgt","",0);
				sheetObj.SelectCell(row, "cmdt_kgs_wgt");
			}
			break;
			
		case "cmdt_lbs_wgt":
			sheetObj.SetCellValue(row, "cmdt_kgs_wgt",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_KG_LB, 2),0);
			break;
			
		case "cmdt_cbm_meas":
			sheetObj.SetCellValue(row, "cmdt_cft_meas",roundXL(sheetObj.GetCellValue(row, col) * CNVT_CNST_CBM_CFT, 3),0);
			if (sheetObj.GetCellValue(row, "cmdt_cft_meas") > 999999.999999) {
				alert(getLabel('FMS_COM_ALT007') + " \n - " + getLabel('FMS_COD_CAGMEAS'));
				sheetObj.SetCellValue(row, "cmdt_cbm_meas","",0);
				sheetObj.SelectCell(row, "cmdt_cbm_meas");
			}
			break;
			
		case "cmdt_cft_meas":
			sheetObj.SetCellValue(row, "cmdt_cbm_meas",roundXL(sheetObj.GetCellValue(row, col) / CNVT_CNST_CBM_CFT, 3),0);
			break;
	}
}

/**
 * Item Code 중복확인
 */
function checkCustItmId(inCustItmId){
 	var intRows=docObjects[1].LastRow() +1;
	var loopNum=0;
	for(var i=1; i < intRows; i++){
		if(inCustItmId==docObjects[1].GetCellValue(i, 'cust_itm_id')){
			loopNum++;	
		}
	}
	if(loopNum>1){
		return false;
	}else{
		return true;
	}
}

function sheet3_OnChange(sheetObj, row, col, value){
	var udfColStr="udf_cd";
	
	if(sheetObj.ColSaveName(col)==udfColStr){
		// User Define Field 유효성 검증
		if(sheetObj.GetCellValue(row, udfColStr)!==''){
			if(!checkUdfCd(sheetObj.GetCellValue(row, udfColStr))){
				//This Container Number is already used!\nPlease check the User Define Field!
				alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('FMS_COD_UDFCD'));
				sheetObj.SetCellValue(row, udfColStr,'',0);
				sheetObj.SelectCell(row, udfColStr);
			}
		}
	}
}

/**
 * User Define Field Code 중복확인
 */
function checkUdfCd(inUdfCd){
 	var intRows=docObjects[2].LastRow() +1;
	var loopNum=0;
	for(var i=1; i < intRows; i++){
		if(inUdfCd==docObjects[2].GetCellValue(i, 'udf_cd')){
			loopNum++;	
		}
	}
	if(loopNum>1){
		return false;
	}else{
		return true;
	}
}

function checkTrdpCode(obj){
	if(obj.name=="cust_trdp_nm"){
		if(frm1.cust_trdp_cd.value==""){
			//#3707 [JAPT]OEM/OEH ENTRY- TRDP 선택
			if(frm1.cust_trdp_addr.value == ""){
				//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
				frm1.cust_trdp_addr.value=$(obj).val().substring($(obj).val().indexOf("｜")+1,$(obj).val().length);
			}			
		}
	}
	else if(obj.name=="vndr_trdp_nm"){
		if(frm1.vndr_trdp_cd.value==""){
			//#3707 [JAPT]OEM/OEH ENTRY- TRDP 선택
			if(frm1.vndr_trdp_addr.value == ""){
				//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
				frm1.vndr_trdp_addr.value=$(obj).val().substring($(obj).val().indexOf("｜")+1,$(obj).val().length);
			}			
		}
	}
	else if(obj.name=="fctry_trdp_nm"){
		if(frm1.fctry_trdp_cd.value==""){
			//#3707 [JAPT]OEM/OEH ENTRY- TRDP 선택
			if(frm1.fctry_trdp_addr.value == ""){
				//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
				frm1.fctry_trdp_addr.value=$(obj).val().substring($(obj).val().indexOf("｜")+1,$(obj).val().length);
			}			
		}
	}
}

/**
* Customer PO No 중복 체크
*/
function checkDupCustPoNo(){
	var formObj=document.frm1;
	if(formObj.cust_po_no.value != ""){
		if(formObj.cust_po_no.value != formObj.org_cust_po_no.value){
			ajaxSendPost(checkDupCustPoNoReq, 'reqVal', '&goWhere=aj&bcKey=searchDupCustPoNo&cust_po_no='+formObj.cust_po_no.value, './GateServlet.gsl');
		}
	}
}

/**
 * AJAX RETURN
 * Buyer PO No 중복체크
 */
function checkDupCustPoNoReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				//DUP BKG No ==> proceed with Confirmation.
				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_CUPN'));
				poDupl=true;
			} else {
				poDupl=false;
			}
		}
	}
}

/**
* Order Status Check
*/
function ordStsCheck(){
	var formObj=document.frm1;
	var po_sys_no = formObj.po_sys_no.value;
	
	if (formObj.org_ord_sts_cd.value == "A" && (formObj.ord_sts_cd.value == "R" || formObj.ord_sts_cd.value == "C")){
		ajaxSendPost(checkPoBkgYnReq, 'reqVal', '&goWhere=aj&bcKey=searchPoBkgYn&f_po_sys_no='+po_sys_no, './GateServlet.gsl');
		
		if (poBkgYn){
			return false;
		} else {
			ajaxSendPost(checkStsPoItemBlYnReq, 'reqVal', '&goWhere=aj&bcKey=searchPoItemBlYn&f_po_sys_no='+po_sys_no, './GateServlet.gsl');
			
			if (itemBlYn){
				return false;
			} else {
				return true;
			}
		}
	} else {
		return true;
	}
}

/**
 * AJAX RETURN
 * PO Booking 여부 체크
 */
function checkPoBkgYnReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				alert(getLabel2('FMS_COM_ALT073', new Array("PO has been Booked")));
				poBkgYn=true;
			} else {
				poBkgYn=false;
			}
		}
	}
}

/**
 * AJAX RETURN
 * Item B/L 등록 여부 체크 (상태값 변경시)
 */
function checkStsPoItemBlYnReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				alert(getLabel2('FMS_COM_ALT073', new Array("Item ["+rtnArr[0]+"] was used")));
				itemBlYn=true;
			} else {
				itemBlYn=false;
			}
		}
	}
}

/**
* Item B/L 등록 여부 체크
*/
function checkPoItemBlYn(curRow){
	var formObj=document.frm1;
	var po_cmdt_seq=docObjects[1].GetCellValue(curRow, 'po_cmdt_seq');
	var po_sys_no=docObjects[1].GetCellValue(curRow, 'po_sys_no');
	
	itemBlYn=false;
	
	if (formObj.ord_sts_cd.value == "A" || formObj.ord_sts_cd.value == "E"){
		ajaxSendPost(checkPoItemBlYnReq, 'reqVal', '&goWhere=aj&bcKey=searchPoItemBlYn&f_po_cmdt_seq='+po_cmdt_seq + '&f_po_sys_no='+po_sys_no, './GateServlet.gsl');
	}
}

/**
 * AJAX RETURN
 * Item B/L 등록 여부 체크
 */
function checkPoItemBlYnReq(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				alert(getLabel2('FMS_COM_ALT074', new Array(rtnArr[0])));
				itemBlYn=true;
			} else {
				itemBlYn=false;
			}
		}
	}
}

function clearPoPrnr(type){
	var formObj=document.frm1;
	switch(type) {
		case "C":			// C	Customer
			formObj.cust_trdp_cd.value="";
			formObj.cust_trdp_nm.value="";
			formObj.cust_trdp_addr.value="";
			formObj.cust_trdp_pic.value="";
			formObj.cust_trdp_eml.value="";
			formObj.cust_trdp_phn.value="";
			formObj.cust_trdp_fax.value="";
			break;
		case "V":			// V	Vendor
			formObj.vndr_trdp_cd.value="";
			formObj.vndr_trdp_nm.value="";
			formObj.vndr_trdp_addr.value="";
			formObj.vndr_trdp_pic.value="";
			formObj.vndr_trdp_eml.value="";
			formObj.vndr_trdp_phn.value="";
			formObj.vndr_trdp_fax.value="";
			break;
		case "F":			//F	Factory
			formObj.fctry_trdp_cd.value="";
			formObj.fctry_trdp_nm.value="";
			formObj.fctry_trdp_addr.value="";
			formObj.fctry_trdp_pic.value="";
			formObj.fctry_trdp_eml.value="";
			formObj.fctry_trdp_phn.value="";
			formObj.fctry_trdp_fax.value="";
			break;
		case "S":			//Ship To
			formObj.shpto_trdp_cd.value="";
			formObj.shpto_trdp_nm.value="";
			formObj.shpto_trdp_addr.value="";
			formObj.shpto_trdp_pic.value="";
			formObj.shpto_trdp_eml.value="";
			formObj.shpto_trdp_phn.value="";
			formObj.shpto_trdp_fax.value="";
			break;
	}
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
			if(str=="BUYER" || str=="CUST" || str=="VENDOR" || str=="FACTORY"|| str=="SHPTO"){
				s_type="trdpCode";
			}else if(str=="ORGIN" || str=="DEST"){
				s_type="location";
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
		}
	} else if ( tmp == "onBlur" ) {
		CODETYPE=str;		
		if(str=="BUYER" || str=="CUST" || str=="VENDOR" || str=="FACTORY"|| str=="SHPTO"){
			s_type="trdpCode";
		}else if(str=="ORGIN" || str=="DEST"){
			s_type="location";
		}
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
	}
	
	var formObj=document.frm1;
	
	if(s_code == ""){
		if(str=="VENDOR"){
			formObj.vndr_trdp_cd.value = "";
			formObj.vndr_trdp_nm.value = "";
		}else if(str=="SHPTO"){
			formObj.shpto_trdp_cd.value = "";
			formObj.shpto_trdp_nm.value = "";
		}else if(str=="ORGIN"){
			formObj.org_loc_cd.value = "";
			formObj.org_loc_nm.value = "";
		}else if(str=="DEST"){
			formObj.dest_loc_cd.value = "";
			formObj.dest_loc_nm.value = "";
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
				formObj.cust_trdp_cd.value=Vals[0]; 
				formObj.cust_trdp_nm.value=Vals[16]; // local trdp name 
				formObj.cust_trdp_addr.value=Vals[14]; // trdp_addr
				formObj.cust_trdp_pic.value=Vals[10]; // pic_nm
				formObj.cust_trdp_eml.value=Vals[19]; // pic_eml
				formObj.cust_trdp_phn.value=Vals[11]; // pic_phn
				formObj.cust_trdp_fax.value=Vals[12]; // pic_fax
				
				if(formObj.shpto_trdp_cd.value == "" && formObj.shpto_trdp_nm.value == ""){
					formObj.shpto_trdp_cd.value=Vals[0];
					formObj.shpto_trdp_nm.value=Vals[16]; // local trdp name 
					formObj.shpto_trdp_addr.value=Vals[1]; // trdp_addr
					formObj.shpto_trdp_pic.value=Vals[10]; // pic_nm
					formObj.shpto_trdp_eml.value=Vals[19]; // pic_eml
					formObj.shpto_trdp_phn.value=Vals[11]; // pic_phn
					formObj.shpto_trdp_fax.value=Vals[12]; // pic_fax
				}
				//addDeptCd();
			}if(CODETYPE == "BUYER"){
				formObj.buyr_trdp_cd.value=Vals[0]; 
				formObj.buyr_trdp_nm.value=Vals[16]; // local trdp name 
				
				//addDeptCd();
				
			}else if(CODETYPE == "VENDOR"){
				formObj.vndr_trdp_cd.value=Vals[0];
				formObj.vndr_trdp_nm.value=Vals[16]; // local trdp name 
				formObj.vndr_trdp_addr.value=Vals[14]; // trdp_addr
				formObj.vndr_trdp_pic.value=Vals[10]; // pic_nm
				formObj.vndr_trdp_eml.value=Vals[19]; // pic_eml
				formObj.vndr_trdp_phn.value=Vals[11]; // pic_phn
				formObj.vndr_trdp_fax.value=Vals[12]; // pic_fax
				
				// Factory가 비어있을 때 Vendor 데이터를 Factory에 동일하게 Setting
				if(formObj.fctry_trdp_cd.value == "" && formObj.fctry_trdp_nm.value == ""){
					formObj.fctry_trdp_cd.value=Vals[0];
					formObj.fctry_trdp_nm.value=Vals[16]; // local trdp name 
					formObj.fctry_trdp_addr.value=Vals[14]; // trdp_addr
					formObj.fctry_trdp_pic.value=Vals[10]; // pic_nm
					formObj.fctry_trdp_eml.value=Vals[19]; // pic_eml
					formObj.fctry_trdp_phn.value=Vals[11]; // pic_phn
					formObj.fctry_trdp_fax.value=Vals[12]; // pic_fax
					
				}
				
				
				
			}else if(CODETYPE == "FACTORY"){
				formObj.fctry_trdp_cd.value=Vals[0]; 
				formObj.fctry_trdp_nm.value=Vals[16]; // local trdp name 
				formObj.fctry_trdp_addr.value=Vals[14]; // trdp_addr
				formObj.fctry_trdp_pic.value=Vals[10]; // pic_nm
				formObj.fctry_trdp_eml.value=Vals[19]; // pic_eml
				formObj.fctry_trdp_phn.value=Vals[11]; // pic_phn
				formObj.fctry_trdp_fax.value=Vals[12]; // pic_fax
			}else if(CODETYPE == "SHPTO"){
				
				formObj.shpto_trdp_cd.value=Vals[0]; 
				formObj.shpto_trdp_nm.value=Vals[16]; // local trdp name 
				formObj.shpto_trdp_addr.value=Vals[1]; // trdp_addr
				formObj.shpto_trdp_pic.value=Vals[10]; // pic_nm
				formObj.shpto_trdp_eml.value=Vals[19]; // pic_eml
				formObj.shpto_trdp_phn.value=Vals[11]; // pic_phn
				formObj.shpto_trdp_fax.value=Vals[12]; // pic_fax
				
			}else if(CODETYPE == "ORGIN"){
				formObj.org_loc_cd.value=Vals[0];
				formObj.org_loc_nm.value=Vals[3];
				
			}else if(CODETYPE == "DEST"){
				formObj.dest_loc_cd.value=Vals[0];
				formObj.dest_loc_nm.value=Vals[3];
			}
		}else{
			if(CODETYPE == "CUST"){
				formObj.cust_trdp_cd.value=""; 
				formObj.cust_trdp_nm.value="";
				formObj.cust_trdp_addr.value="";
				formObj.cust_trdp_pic.value="";
				formObj.cust_trdp_eml.value="";
				formObj.cust_trdp_phn.value="";
				formObj.cust_trdp_fax.value="";
				//addDeptCd();
			} else if(CODETYPE == "BUYER"){
				formObj.buyr_trdp_cd.value=""; 
				formObj.buyr_trdp_nm.value="";
				
				//addDeptCd();
				
			}else if(CODETYPE == "VENDOR"){
				formObj.vndr_trdp_cd.value=""; 
				formObj.vndr_trdp_nm.value=""; 
				formObj.vndr_trdp_addr.value=""; 
				formObj.vndr_trdp_pic.value=""; 
				formObj.vndr_trdp_eml.value=""; 
				formObj.vndr_trdp_phn.value=""; 
				formObj.vndr_trdp_fax.value=""; 
				
			}else if(CODETYPE == "FACTORY"){
				formObj.fctry_trdp_cd.value=""; 
				formObj.fctry_trdp_nm.value=""; 
				formObj.fctry_trdp_addr.value=""; 
				formObj.fctry_trdp_pic.value=""; 
				formObj.fctry_trdp_eml.value=""; 
				formObj.fctry_trdp_phn.value=""; 
				formObj.fctry_trdp_fax.value=""; 
				
			}else if(CODETYPE == "ORGIN"){
				formObj.org_loc_cd.value="";
				formObj.org_loc_nm.value="";
				
			}else if(CODETYPE == "DEST"){
				formObj.dest_loc_cd.value="";
				formObj.dest_loc_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

//Calendar flag value
var firCalFlag=false;

function CUST_POPLIST(rtnVal){
	var formObj=document.frm1;
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.cust_trdp_cd.value=rtnValAry[0];
		formObj.cust_trdp_nm.value=rtnValAry[10];
		formObj.cust_trdp_addr.value=rtnValAry[26];
		formObj.cust_trdp_pic.value=rtnValAry[3];
		formObj.cust_trdp_eml.value=rtnValAry[6];
		formObj.cust_trdp_phn.value=rtnValAry[4];
		formObj.cust_trdp_fax.value=rtnValAry[5];
		//addDeptCd();
		
		// Shpto 비어있을 때 Vendor 데이터를 shpto 동일하게 Setting
		if(formObj.shpto_trdp_cd.value == "" && formObj.shpto_trdp_nm.value == ""){
			formObj.shpto_trdp_cd.value=rtnValAry[0];
			formObj.shpto_trdp_nm.value=rtnValAry[10];
			formObj.shpto_trdp_addr.value=rtnValAry[7];
			formObj.shpto_trdp_pic.value=rtnValAry[3];
			formObj.shpto_trdp_eml.value=rtnValAry[6];
			formObj.shpto_trdp_phn.value=rtnValAry[4];
			formObj.shpto_trdp_fax.value=rtnValAry[5];
		}
		
		
	}
}

function BUYER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.buyr_trdp_cd.value=rtnValAry[0];
		formObj.buyr_trdp_nm.value=rtnValAry[10];
	}
	//addDeptCd();
}

function VENDOR_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.vndr_trdp_cd.value=rtnValAry[0];
		formObj.vndr_trdp_nm.value=rtnValAry[10];
		formObj.vndr_trdp_addr.value=rtnValAry[26];
		formObj.vndr_trdp_pic.value=rtnValAry[3];
		formObj.vndr_trdp_eml.value=rtnValAry[6];
		formObj.vndr_trdp_phn.value=rtnValAry[4];
		formObj.vndr_trdp_fax.value=rtnValAry[5];
		
		// Factory가 비어있을 때 Vendor 데이터를 Factory에 동일하게 Setting
		if(formObj.fctry_trdp_cd.value == "" && formObj.fctry_trdp_nm.value == ""){
			formObj.fctry_trdp_cd.value=rtnValAry[0];
			formObj.fctry_trdp_nm.value=rtnValAry[10];
			formObj.fctry_trdp_addr.value=rtnValAry[26];
			formObj.fctry_trdp_pic.value=rtnValAry[3];
			formObj.fctry_trdp_eml.value=rtnValAry[6];
			formObj.fctry_trdp_phn.value=rtnValAry[4];
			formObj.fctry_trdp_fax.value=rtnValAry[5];
		}
	} 
}

function FACTORY_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.fctry_trdp_cd.value=rtnValAry[0];
		formObj.fctry_trdp_nm.value=rtnValAry[10];
		formObj.fctry_trdp_addr.value=rtnValAry[26];
		formObj.fctry_trdp_pic.value=rtnValAry[3];
		formObj.fctry_trdp_eml.value=rtnValAry[6];
		formObj.fctry_trdp_phn.value=rtnValAry[4];
		formObj.fctry_trdp_fax.value=rtnValAry[5];
	} 
}


function SHPTO_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		
		var rtnValAry=rtnVal.split("|");
		
		formObj.shpto_trdp_cd.value=rtnValAry[0];
		formObj.shpto_trdp_nm.value=rtnValAry[10];
		formObj.shpto_trdp_addr.value=rtnValAry[7];
		formObj.shpto_trdp_pic.value=rtnValAry[3];
		formObj.shpto_trdp_eml.value=rtnValAry[6];
		formObj.shpto_trdp_phn.value=rtnValAry[4];
		formObj.shpto_trdp_fax.value=rtnValAry[5];
	} 
}

function ORGIN_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.org_loc_cd.value=rtnValAry[0];
		formObj.org_loc_nm.value=rtnValAry[2];
	} 
}

function DEST_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.dest_loc_cd.value=rtnValAry[0];
		formObj.dest_loc_nm.value=rtnValAry[2];
	} 
}

/**
 * 탭이동
 */
function moveTab(callTabIdx){
	if(typeof(currTab)!='undefined'&&currTab!=callTabIdx){
		goTabSelect(callTabIdx);
	}
}

/*function OpenCustItmPop(){
	var formObj=document.frm1;
	 rtnary=new Array(1);
	   
	 rtnary[0]="1";
	 rtnary[1]=formObj.cust_trdp_cd.value;
	 rtnary[2]=formObj.cust_trdp_nm.value;
	 rtnary[3]=window;
	   
	 callBackFunc = "OPEN_CUST_ITM_POP";
	 modal_center_open('./WHM_ITL_0001.clt', rtnary, 1150,480,"yes");
}


function OPEN_CUST_ITM_POP(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var row = docObjects[1].GetSelectRow();
		var rtnValAry=rtnVal.split("|");
		docObjects[1].SetCellValue(row,"cust_itm_nm",rtnValAry[1],0);
		docObjects[1].SetCellValue(row,"cust_itm_id",rtnValAry[2],1);
	}    
}*/

function loadDftItmVal(itemId){
	doShowProcess();
	var params = "?f_cmd="+SEARCH06 + "&cust_itm_id="+itemId;
	var xml = docObjects[1].GetSearchData("./WHM_WHM_0005_06GS.clt"+params);
	doHideProcess();
	return xml;
}

function displayDftItmVal(xml,row){
	var xmlDoc = $.parseXML(xml);
	  var $xml = $(xmlDoc);
	  docObjects[1].SetCellValue(row,'cust_itm_id',$xml.find( "cust_itm_id").text(),0);
	  docObjects[1].SetCellValue(row,'cust_itm_nm',$xml.find( "itm_nm").text(),0);
	  docObjects[1].SetCellValue(row,'pck_ut_cd',$xml.find( "itm_ut_cd").text(),0);
	  docObjects[1].SetCellValue(row,'pck_inr_qty',$xml.find( "itm_inr_qty").text());
	  docObjects[1].SetCellValue(row,'cmdt_kgs_wgt',$xml.find( "itm_wgt").text(),0);
	  docObjects[1].SetCellValue(row,'cmdt_lbs_wgt',$xml.find( "itm_wgt_lbs").text(),0);
	  docObjects[1].SetCellValue(row,'cmdt_cbm_meas',$xml.find( "itm_vol").text(),0);
	  docObjects[1].SetCellValue(row,'cmdt_cft_meas',$xml.find( "itm_vol_cft").text(),0);
}

/*
function addDeptCd(){
	var formObj=document.frm1;
	ajaxSendPost(setDeptCdListCombo, 'reqVal', '&goWhere=aj&bcKey=searchDeptCdListCombo&f_buyr_trdp_cd='+formObj.cust_trdp_cd.value, './GateServlet.gsl');
}*/

/*
//Department List 조회
function setDeptCdListCombo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	//alert("reqVal===>");
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var arrLen=rtnArr.length;
			
			var f_dept_cd = frm1.dept_cd.value;
			
			document.frm1.dept_cd.length = 0;
			for( var i=1; i < arrLen ; i++ ){
				var masterVals=rtnArr[i-1].split(',');	
				document.frm1.dept_cd.options[i]=new Option(masterVals[1],masterVals[0]);
			}
			
			var dept_cd = document.getElementById('dept_cd');
			
			  for (var i = 0; i < dept_cd.options.length; i++) {
			      if (dept_cd.options[i].value == f_dept_cd) {
			    	  dept_cd.selectedIndex = i;
			          break;
			      }
			  }
		} else {
			document.frm1.dept_cd.length = 0;
			document.frm1.dept_cd.options[0]=new Option("","");
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}*/

function OpenCustItmPop(colValue){
	var formObj=document.frm1;
	rtnary=new Array(1);
    
	//#5537 [Binex] PO Input Issue - rtnary 목적없는 쓰레기 값 전달하여, 팝업에서 엉뚱한 값 Parsing 하는 오류 발생하여 제거
	//rtnary[0]="1";
    //rtnary[1]=formObj.ctrt_no.value;
	
	rtnary[0]="";
	rtnary[1]="";
    rtnary[2]="";
    rtnary[3]=window;
   
    callBackFunc = "OPEN_CUST_ITM_POP";
	var sUrl="CtrtItemPopup.clt?ctrt_no="+encodeURIComponent(formObj.ctrt_no.value);
		
	modal_center_open(sUrl, callBackFunc, 400, 550,"yes");
}

function OPEN_CUST_ITM_POP(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	   return;
	}else{
		var row = docObjects[1].GetSelectRow();
		var rtnValAry=rtnVal.split("|");
		
		docObjects[1].SetCellValue(row, "cust_itm_id",rtnValAry[0],0);
		
		if(!checkCustItmId(docObjects[1].GetCellValue(row, "cust_itm_id"))){
			// Data already used! \n - Item
			alert(getLabel('FMS_COM_ALT025') + " - " + getLabel('ITEM'));
			docObjects[1].SetCellValue(row, "cust_itm_id",'',0);
			docObjects[1].SetCellValue(row, "cust_itm_nm",'',0);
			docObjects[1].SelectCell(row, "cust_itm_id");
			return;
		} else {
			docObjects[1].SetCellValue(row,"cust_itm_id",rtnValAry[0],0);
			docObjects[1].SetCellValue(row,"cust_itm_nm",rtnValAry[1],0);
			setItemGrid(rtnVal);
			   
//			var xml = loadDftItmVal(rtnValAry[2]);
//			displayDftItmVal(xml,row)
			setTotal(row);
		}
	}    
}

function setItemGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValArr = rtnVal.split("|");
		var sheetObj=docObjects[1];
		var prefix="";
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"cust_itm_id",rtnValArr[0],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"cust_itm_nm",rtnValArr[1],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"ctrt_no",rtnValArr[2],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_sys_no",rtnValArr[3],0);
		/*sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lot_no",rtnValArr[4],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_cbm",rtnValArr[8],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_cbf",rtnValArr[9],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_grs_kgs",rtnValArr[10],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_grs_lbs",rtnValArr[11],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_net_kgs",rtnValArr[12],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_net_lbs",rtnValArr[13],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv1_qty",rtnValArr[7],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv1_unit_cd",rtnValArr[15],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv2_qty",rtnValArr[5],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv2_unit_cd",rtnValArr[6],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv3_qty",rtnValArr[16],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv3_unit_cd",rtnValArr[17],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv4_qty",rtnValArr[18],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv4_unit_cd",rtnValArr[19],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_info",rtnValArr[20],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"curr_cd",rtnValArr[21],0);
		sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"unit_price",rtnValArr[22],0);*/
	}
}

function setTotal(row){
	var total = parseInt(docObjects[1].GetCellValue(row,"pck_inr_qty")) * parseInt(docObjects[1].GetCellValue(row,"pck_qty")) + parseInt(docObjects[1].GetCellValue(row,"ea_cnt"));
	docObjects[1].SetCellValue(row,"ttl_qty",total,0);
}

function getCtrtInfo(obj){
	/*if(obj.value ==""){
		return;
	}*/
	var formObj=document.frm1;
	if(obj.value ==""){
		formObj.ctrt_no.value="";
		formObj.ctrt_nm.value="";
		formObj.cust_trdp_cd.value = "";
		formObj.cust_trdp_nm.value = "";
		formObj.cust_trdp_addr.value = "";
		formObj.cust_trdp_pic.value = "";
		formObj.cust_trdp_eml.value = "";
		formObj.cust_trdp_phn.value = "";
		formObj.cust_trdp_fax.value = "";
		return;
	}
		ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCtrtInfo&ctrt_no='+encodeURIComponent(obj.value), './GateServlet.gsl');

}

function resultCtrtInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr = doc[1].split('^@');
		formObj.ctrt_nm.value = rtnArr[0];
		formObj.cust_trdp_cd.value = rtnArr[1];
		
		CODETYPE="CUST";
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code='+formObj.cust_trdp_cd.value, './GateServlet.gsl');
	}else{
		formObj.ctrt_no.value = "";
		formObj.ctrt_nm.value = "";
		formObj.cust_trdp_cd.value = "";
		formObj.cust_trdp_nm.value = "";
		formObj.cust_trdp_addr.value = "";
		formObj.cust_trdp_pic.value = "";
		formObj.cust_trdp_eml.value = "";
		formObj.cust_trdp_phn.value = "";
		formObj.cust_trdp_fax.value = "";
	}
}

function setCtrtNoInfo(aryPopupData){
	var formObj=document.frm1;
    if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
	 	return;
	}else{
		var rtnValAry=aryPopupData.split("|");
		formObj.ctrt_no.value=rtnValAry[0];
		formObj.ctrt_nm.value=rtnValAry[1];
		formObj.cust_trdp_cd.value=rtnValAry[8];
		
		CODETYPE="CUST";
		ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code='+formObj.cust_trdp_cd.value, './GateServlet.gsl');
	}
}


function setPoNotiReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		doc[1]=="Y"?poNoti=true:poNoti=false;
	} else {
		poNoti="";
	}
}

function searchCustItem(reqVal){
	var formObj = document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				var row = sheet1.GetSelectRow();
				var arrVal = rtnArr[0].split("|");
				
				docObjects[1].SetCellValue(row,"cust_itm_id",arrVal[0],0);
				docObjects[1].SetCellValue(row,"cust_itm_nm",arrVal[1],0);

				setItemGrid(rtnArr[0]);
				setTotal(row);
			}
		}
	}
}

function onlyNumberCheckModified(obj) {
    var keyValue=obj.value;
    obj.value = obj.value.replace(/\D/g, '');
    numberCommaLen(obj,5,0);
}

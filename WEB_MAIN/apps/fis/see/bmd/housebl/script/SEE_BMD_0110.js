var rtnary=new Array(1);
var callBackFunc = "";

var BL_SEARCH=false;
/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDt(document.frm1.obrd_strdt, document.frm1.obrd_enddt);
}
function doWork(srcName){
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
	try {
		switch(srcName) {
    	   	case "HBL_POPLIST"://  openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(2);
	   			rtnary[0]="S";
	   			rtnary[1]="O";
	   			BL_SEARCH=false;
//				if(formObj.txt_hbl_no.value !=""){	
//					//ajax bl정보를 가져온다.
//					ajaxSendPost(getBlInfo, 'reqVal', '&goWhere=aj&bcKey=getBlInfo&txt_hbl_no='+frm1.txt_hbl_no.value, './GateServlet.gsl');
//				}
//				if (BL_SEARCH == false) {
//					rtnary[2]=formObj.txt_hbl_no.value;
					rtnary[2]="";
					
					callBackFunc = "HBL_POPLIST";
					modal_center_open('./CMM_POP_0170.clt', rtnary, 818,468,"yes");
				    
	   	        	BL_SEARCH=false;
//				}
			break;
	   	 	case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(1);
	   	 		rtnary[0]="";
//	   	 		rtnary[1]=formObj.txt_ship_nm.value;
	   	 		rtnary[1]="";
	   	 		rtnary[2]=window;
	   	 		
		   	 	callBackFunc = "CUSTOMER_POPLIST";
				modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
          	break;
	   	    case "CUSTOMER_POPLIST2"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(1);
	   	    	rtnary[0]="";
//	   	    	rtnary[1]=formObj.txt_to_nm.value;
	   	    	rtnary[1]="";
	   	    	rtnary[2]=window;
	   	    	
	   	    	callBackFunc = "CUSTOMER_POPLIST2";
				modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
				
	   	    break;
	   	    case "CUSTOMER_POPLIST3"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(1);
	   	    	rtnary[0]="";
//	   	    	rtnary[1]=formObj.txt_glt_nm.value;
	   	    	rtnary[1]="";
	   	    	rtnary[2]=window;

	   	    	callBackFunc = "CUSTOMER_POPLIST3";
				modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	    break;
	   	 	case "PRINT":
		   	 	formObj.file_name.value='bank_draft_01.mrd';
	        	formObj.title.value='BANK DRAFT';	        	
				//Parameter Setting
	        	var param='[' + formObj.txt_us_amt.value + ']';			// [1]
	        	param += '[' + formObj.issue_dt.value + ']';				// [2]
				param += '[' + formObj.txt_first_ext.value + ']';			// [3]
				param += '[' + formObj.txt_ship_nm.value + ']';				// [4]
				param += '[' + formObj.txt_lc_no.value + ']';					// [5]
				param += '[' + formObj.txt_open_bank.value + ']';				// [6]
				param += '[' + formObj.open_dt.value + ']';					// [7]
				param += '[' + formObj.txt_input_01.value + ']';				// [8]
				param += '[' + formObj.txt_to_nm.value + ']';					// [9]
				param += '[' + formObj.txt_to_addr.value + ']';				// [10]
				param += '[' + formObj.txt_no_nm.value + ']';					// [11]
				param += '[' + formObj.txt_nty_nm.value + ']';				// [12]
				param += '[' + formObj.txt_input_02.value + ']';				// [13]
				param += '[' + formObj.txt_input_03.value + ']';				// [14]
				param += '[' + formObj.txt_glt_addr.value + ']';				// [15]
				param += '[' + formObj.txt_glt_nm.value + ']';				// [16]
				if(formObj.origin_cpy_chk[0].checked){
					param += '[Y]';											// [17]
		  		}else{
		  			param += '[N]';											// [17]
		  		}
		  		if(formObj.origin_cpy_chk[1].checked){
		  			param += '[Y]';											// [18]
		  		}else{
		  			param += '[N]';											// [18]
		  		}
		  		if(formObj.origin_cpy_chk[2].checked){
		  			param += '[Y]';											// [19]
		  		}else{
		  			param += '[N]';											// [19]
		  		}
		  		param += '[' + formObj.txt_input_04.value + ']';				// [20]
		  		param += '[' + formObj.txt_input_05.value + ']';				// [21]
		  		param += '[' + formObj.txt_input_06.value + ']';				// [22]
		  		param += '[' + formObj.txt_input_07.value + ']';				// [23]
		  		param += '[' + formObj.txt_input_08.value + ']';				// [24]
		  		param += '[' + formObj.txt_input_09.value + ']';				// [25]
		  		param += '[' + formObj.txt_input_10.value + ']';				// [26]
		  		param += '[' + formObj.txt_input_11.value + ']';				// [27]
		  		param += '[' + formObj.txt_input_12.value + ']';				// [28]
		  		param += '[' + formObj.txt_input_13.value + ']';				// [29]
		  		param += '[' + formObj.txt_input_14.value + ']';				// [30]
		  		//BILL OF LADING ~ WGT CTF 값이 모두 없을경우
				var chkVal="N";
				if(formObj.txt_input_06.value == "" && formObj.txt_input_07.value == "" && formObj.txt_input_08.value == "" &&
						formObj.txt_input_09.value == "" && formObj.txt_input_10.value == "" && formObj.txt_input_11.value == "" &&
						formObj.txt_input_12.value == "" && formObj.txt_input_13.value == ""){
					chkVal="Y";
				}
				param += '[' + chkVal + ']';									// [31]
				param += '[' + formObj.userNm.value + ']';						// [32]
				param += '[' + formObj.code_nm.value + ']';						// [33]
				param += '[' + formObj.pic_nm.value + ']';						// [34]
				param += '[' + formObj.pic_phn.value + ']';						// [35]
				
				//#1136   [STAR CLUSTER ATL/MIA] BANK DRAFT ADDRESS AND PHONE # sub_code 대신 dflt_addr로 변경함.
//				param += '[' + formObj.sub_code.value + ']';				    // [36]
				param += '[' + formObj.dflt_addr.value + ']';				    // [36]
				
				formObj.rd_param.value=param;
				popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	   	 	break;
	   	 	case "SEARCHLIST"://  openMean S=해운에서 오픈, A=항공에서 오픈
	   	 		
	   	 		HBL_POPLIST2(intgBlNo,blNo);
	   	 		
			break;
	   	 	
	   	 	
        } // end switch
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
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	//#1160 Cannot auto suggestion when name inputted
	fnSetAutocompleteCallBack('txt_ship_nm', 'CUSTOMER_POPLIST', 'LINER_POPLIST');
	fnSetAutocompleteCallBack('txt_to_nm', 'CUSTOMER_POPLIST2', 'LINER_POPLIST');
	fnSetAutocompleteCallBack('txt_glt_nm', 'CUSTOMER_POPLIST3', 'LINER_POPLIST');
	var formObj=document.frm1;
	var today=getTodayStr();
	formObj.issue_dt.value=today;
	formObj.open_dt.value=today;
	formObj.txt_us_amt.focus();
	if(intgBlNo !=''){
		searchLink(intgBlNo,blNo);
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
        	var cal=new ComCalendar();
            cal.select(formObj.issue_dt, 'MM-dd-yyyy');
        break;
        case 'DATE2':    //달력 조회 팝업 호출      
        	var cal=new ComCalendar();
            cal.select(formObj.open_dt, 'MM-dd-yyyy');
        break;
    }
}
/**
 * AJAX RETURN
 * BL_INFO를 가져온다.
 */
function getBlInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null"){
				frm1.txt_ship_nm.value=rtnArr[0];
				frm1.txt_input_03.value=rtnArr[0];
			}
			if(rtnArr[2] != "null"){
				frm1.txt_nty_nm.value=rtnArr[2];
			}
			// 값이 있는 경우
			if(rtnArr[0] != "" && rtnArr[2] != "") {
				BL_SEARCH=true;
			} else {
				BL_SEARCH=false;
			}
		} else {
			BL_SEARCH=false;
		}
	}else{
		BL_SEARCH=false;
	}
}
function openPopup(srcName){
	var formObj=document.frm1;
	if(event.keyCode == 13){
		try {
			switch(srcName) {
	    	   	case "HBL_POPLIST"://  openMean S=해운에서 오픈, A=항공에서 오픈
	    	   		doWork(srcName);
				break;
		   	 	case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			   		rtnary=new Array(1);
		   	 		rtnary[0]="";
		   	 		rtnary[1]=formObj.txt_ship_nm.value;
		   	 		rtnary[2]=window;
		   	 		callBackFunc = "CUSTOMER_POPLIST";
		   	 		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	          	break;
		   	    case "CUSTOMER_POPLIST2"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			   		rtnary=new Array(1);
		   	    	rtnary[0]="";
		   	    	rtnary[1]=formObj.txt_to_nm.value;
		   	    	rtnary[2]=window;
		   	    	callBackFunc = "CUSTOMER_POPLIST2";
		   	 		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		   	    break;
		   	    case "CUSTOMER_POPLIST3"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			   		rtnary=new Array(1);
		   	    	rtnary[0]="";
		   	    	rtnary[1]=formObj.txt_glt_nm.value;
		   	    	rtnary[2]=window;
		   	    	callBackFunc = "CUSTOMER_POPLIST3";
		   	 		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		   	 		
		   	    break;
	        } // end switch
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
}
//US$값을 셋팅한다.
function setUSValue(){
	var formObj=document.frm1;
	if(formObj.txt_us_amt.value == ""){
		formObj.txt_us_amt.value=".00";
	}
}
function HBL_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.intg_bl_seq.value=rtnValAry[3];//intg_bl_seq
		formObj.txt_hbl_no.value=rtnValAry[0];//house_bl_no
		if (rtnValAry[0] != '') {
			ajaxSendPost(getBlInfo, 'reqVal', '&goWhere=aj&bcKey=getBlInfo&txt_hbl_no='+frm1.txt_hbl_no.value, './GateServlet.gsl');
		}
	}
}
function searchLink(intg_bl_seq,hbl_no){
	var formObj=document.frm1;
		formObj.intg_bl_seq.value	=	intg_bl_seq;
		formObj.txt_hbl_no.value	=	hbl_no;//house_bl_no
		if (hbl_no != '') {
			ajaxSendPost(getBlInfo, 'reqVal', '&goWhere=aj&bcKey=getBlInfo&txt_hbl_no='+frm1.txt_hbl_no.value, './GateServlet.gsl');
		}
}
function CUSTOMER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.txt_ship_nm.value=rtnValAry[2];//full_nm
	}
}
function CUSTOMER_POPLIST2(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.txt_to_nm.value=rtnValAry[2];//full_nm
		formObj.txt_to_addr.value=rtnValAry[7];//address
	}   
}
function CUSTOMER_POPLIST3(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.txt_glt_nm.value=rtnValAry[2];//full_nm
		formObj.txt_glt_addr.value=rtnValAry[7];//address
	}
}
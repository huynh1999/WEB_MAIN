/*=========================================================
* 1.0 Creation
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : PFM_MGT_0030.js
*@FileTitle  :  Profit Report
*@author     : CLT
*@version    : 1.0
*@since      : 2010/06/25
=========================================================*/

//#3593 [JTC]Profit Report & Performance Report 수정 사항
var GL_VIEW_FALG = "N";

var pdf = false;
function pdfDown(prn){
	pdf = true;
	doWork(prn);
}

function doWork(srcName){
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var sheetObj3=docObjects[2];
    var sheetObj4=docObjects[3];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
		    frm1.f_cmd.value=-1;
	        formObj.submit();
	   break;
       case "SEARCHLIST":
            formObj.f_cmd.value=SEARCHLIST;
            if(!chkSearchCmprPrd(true, frm1.s_prd_strdt, frm1.s_prd_enddt)){
            	return;
            }
			if(formObj.s_sel_val.value == "" && formObj.s_sel_sub_val.value == ""){
				//Can't Retrieve. Please, Print. //MESSAGE REFINE???
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('SELECT'));
				formObj.s_sel_val.focus();
				return;
			}
			
			formObj.rpt_tp_opt_col.value 		= getReportType("s_rpt_tp_opt",  "CD", "WHERE");
			formObj.rpt_sub_opt_col.value 		= getReportType("s_rpt_sub_opt", "CD", "WHERE");
			formObj.rpt_tp_opt_nm_col.value 	= getReportType("s_rpt_tp_opt",  "NM", "WHERE");
			formObj.rpt_sub_opt_nm_col.value 	= getReportType("s_rpt_sub_opt", "NM", "WHERE");
			
             sheetObj2.DoSearch("./PFM_MGT_0030GS.clt", FormQueryString(formObj) );
       break;
       case "CURR_SEARCH":
    	    
    	    //#52849 - [BNX] PROFIT REPORT TO HAVE "GROUP BY OFFICE" OPTION
    	    if(formObj.s_ofc_cd.value == ""){
    	    	jQuery("input#s_grp_by_ofc_flg").removeAttr("disabled");
    	    }else{
    	    	jQuery("input#s_grp_by_ofc_flg").prop("checked",false);
    	    	jQuery("input#s_grp_by_ofc_flg").attr("disabled", true);
    	    };
    	    
            formObj.f_cmd.value=SEARCHLIST01;
            var dptm_flg=setDeptVal();
            
            formObj.in_air_sea_clss_cd.value = getDeptStr('air_sea_clss_cd');
            formObj.in_bnd_clss_cd.value 	 = getDeptStr('bnd_clss_cd');
            
            if(!dptm_flg){
            	sheetObj.RemoveAll();
	       }else{
	            var s_curr_opt=document.getElementsByName("s_curr_opt");	//Currency Option
	 	        var curr_opt=getRadioVal(s_curr_opt);
	 	       if(curr_opt != "O"){
	 	    	   return;                    
				}
			    if(formObj.s_curr_cd.value == ""){
			    	//Please, select the [To Currency]
			    	alert(getLabel('FMS_COM_ALT004') + " \n- " + getLabel('FMS_COD_TCUR'));
			    	formObj.s_curr_cd.focus();  
					return;
				}
			   //WMS ACCOUNT LKH 2015.01.20
			   setCurrCheckBoxValue(); 
 	           sheetObj.DoSearch("./PFM_MGT_0030_1GS.clt", FormQueryString(formObj) );
	       }    
      break;
       case "ALL":
    	   var dept_cd=formObj.f_dept_cd.value;
    	   //LHK, 20140404, 유저별 접근권한 차별화 로직 제거
//    	   if(dept_cd == "2" 
//    			|| dept_cd == "3"
//    				|| dept_cd == "4"
//    					|| dept_cd == "5"
//    						|| dept_cd == "6"
//    							|| dept_cd == "7"){
//    		   return; 
//    	   }else{
    		   formObj.s_oi_dptm_flg.checked=true;
        	   formObj.s_ai_dptm_flg.checked=true;
        	   formObj.s_oe_dptm_flg.checked=true;
        	   formObj.s_ae_dptm_flg.checked=true;
        	   //WMS ACCOUNT LKH 2015.01.20
        	   if(formObj.rpt_tp_opt.value == "3" || formObj.rpt_tp_opt.value == "5" 
        		   || formObj.rpt_tp_opt.value == "7" || formObj.rpt_tp_opt.value == "13"){ // HBL or HWAB NO, Agent, Carrier 일 경우 Other 는 print 대상에서 제외.
        		   formObj.s_on_dptm_flg.checked=false;
        		   formObj.s_on_dptm_flg.disabled=true;
        		   formObj.s_wm_dptm_flg.checked=false;
        		   formObj.s_wm_dptm_flg.disabled=true;
        	   }else{
        		   formObj.s_on_dptm_flg.disabled=false;
        		   formObj.s_on_dptm_flg.checked=true;
        		   formObj.s_wm_dptm_flg.disabled=false;
        		   formObj.s_wm_dptm_flg.checked=true;
        	   }
        	   
        	   //Sales Type Check
        	   setSlsTp();
//    	   }
    	   
    	doWork('CURR_SEARCH');
       break;
       case "CLEAR":
    	   var dept_cd=formObj.f_dept_cd.value;
    	   //LHK, 20140404, 유저별 접근권한 차별화 로직 제거
//    	   if(dept_cd == "2" 
//    			|| dept_cd == "3"
//    				|| dept_cd == "4"
//    					|| dept_cd == "5"
//    						|| dept_cd == "6"
//    							|| dept_cd == "7"){
//    		   return; 
//    	   }else{
    		   formObj.s_oi_dptm_flg.checked=false;
        	   formObj.s_ai_dptm_flg.checked=false;
        	   formObj.s_oe_dptm_flg.checked=false;
        	   formObj.s_ae_dptm_flg.checked=false;
        	   formObj.s_on_dptm_flg.checked=false;
        	   //WMS ACCOUNT LKH 2015.01.20
        	   if(formObj.rpt_tp_opt.value == "3" || formObj.rpt_tp_opt.value == "5" 
        		   || formObj.rpt_tp_opt.value == "7" || formObj.rpt_tp_opt.value == "13"){ // HBL or HWAB NO, Agent, Carrier 일 경우 Other 는 print 대상에서 제외.
        		   formObj.s_on_dptm_flg.checked=false;
        		   formObj.s_on_dptm_flg.disabled=true;
        		   formObj.s_wm_dptm_flg.checked=false;
        		   formObj.s_wm_dptm_flg.disabled=true;
        	   }else{
        		   formObj.s_on_dptm_flg.disabled=false;
        		   formObj.s_on_dptm_flg.checked=false;
        		   formObj.s_wm_dptm_flg.disabled=false;
        		   formObj.s_wm_dptm_flg.checked=false;
        	   }
        	   
        	   //Sales Type Check
        	   setSlsTp();
//    	   }
       break;
       case "ADD":
    	   var initCnt=sheetObj3.RowCount();
    	    //sheet1의 내용을  sheet2로 옮긴다.
			//Copy2SheetCol(TargetSheet,SrcColumns DestColumns, StartRow ,  EndRow,DestRow,AddType,useSameSaveName,raiseChangeEvent, SrcCheckCol, DestCheckCol) 
    	   sheetObj2.Copy2SheetCol(sheetObj3, "1|2|3|4","1|2|3|4", -1,	-1,	-1, 2, true, true, 0, 0);
    	   
    	   if(initCnt==0 && sheetObj3.RowCount()> 0){
    		   var s_rpt_tp_opt=document.getElementsByName("s_rpt_tp_opt");
			   var s_rpt_sub_opt=document.getElementsByName("s_rpt_sub_opt");
			   for(var i=0; i<s_rpt_tp_opt.length; i++){
				   s_rpt_tp_opt[i].disabled=true;
			   } 
			   for(var i=0; i<s_rpt_sub_opt.length; i++){
				   s_rpt_sub_opt[i].disabled=true;
			   } 
    	   }
       break;
       case "ALLCLEAR":
    	    doWork('CLEAR');
    		var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
    		for(var i=0; i<collTxt.length; i++){
    		  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
    			  collTxt[i].value="";
    		  }           
    		}
    		formObj.s_prn_opt[0].checked=true;
    		formObj.s_sort_opt[0].checked=true;
    		formObj.s_curr_opt[0].checked=true;
    		formObj.s_curr_cd.value="";
    		formObj.s_loss_only_flg.checked=false;
    		formObj.s_dt_clss_cd.value="PDT";
    		var s_rpt_tp_opt=document.getElementsByName("s_rpt_tp_opt");
			var s_rpt_sub_opt=document.getElementsByName("s_rpt_sub_opt");
			  
		    for(var i=0; i<s_rpt_tp_opt.length; i++){
		 	   s_rpt_tp_opt[i].disabled=false;
		 	   if(i==0) s_rpt_tp_opt[i].checked=true;
		    } 
		    for(var i=0; i<s_rpt_sub_opt.length; i++){
		 	   s_rpt_sub_opt[i].disabled=false;
		 	  if(i==0) s_rpt_sub_opt[i].checked=true;
		    } 
		    
		    // #52497 
		    formObj.s_sales_type_y.checked = true;
		    formObj.s_sales_type_n.checked = true;
		    formObj.s_sales_type_c.checked = true;
		    
		    //LHK, 20141029 #44986 [BINEX]Office - All Option
		    setOfficeAllOption(formObj.s_ofc_cd);
		    
    		formObj.s_sel_sub_val.className='search_form-disable';
    		formObj.s_sel_sub_val.readOnly=true;
    		sheetObj.RemoveAll();
    		sheetObj2.RemoveAll();
    		sheetObj3.RemoveAll();
    		initFinish();
    		setRadioVal();
       break;	   
       case 'PRINT':
    	   formObj.title.value='Profit Report';
           var param="";
           var file_names="";
	       var dptm_flg=setDeptVal();								//Department Option
	       var s_prn_opt=document.getElementsByName("s_prn_opt");		//Print Option
	       var prn_opt=getRadioVal(s_prn_opt);
	       var s_curr_opt=document.getElementsByName("s_curr_opt");	//Currency Option
	       var curr_opt=getRadioVal(s_curr_opt);
	       //1.Department Type check
	       if(!dptm_flg){
	       		//Please select a [Department Type]!
	       		alert(getLabel('FMS_COM_ALT004') + " \n - " + getLabel('FMS_COD_DETP'));
	       		return;
	       }
           if(!chkSearchCmprPrd(true, frm1.s_prd_strdt, frm1.s_prd_enddt)){
           		return;
           }
           //2.Currency check 
	       //3.Month 일 경우 기간 확인 
    	   if(prn_opt == "M" && isIntervalDt()){  //Month 일 경우 3개월 이내인지 확인
    		   	//If option is month, the period should be set within three months.
    		   	alert(getLabel('PFM_COM_ALT003'));
    	   		return;
    	   }
		   //============== Currency Check ==============
		   var multi_curr_flg="";	//One Currency 인 경우
		   if(curr_opt == "M"){		//Multil 인 경우
			   multi_curr_flg="T";
		   }
		   
		   //WMS ACCOUNT LKH 2015.01.20
		   if(curr_opt == "O"){	
			   //Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
	           if(currRateCheck(sheetObj)){
	           	return;
	           }
		   }
		   
		   //Batch Performance LKH 2015.01.28            
           createBatchPrf();
	   break;
       case "BATCH_PRF_END_ACTION":
    	   formObj.title.value='Profit Report';
           var param="";
           var file_names="";
	       var dptm_flg=setDeptVal();								//Department Option
	       var s_prn_opt=document.getElementsByName("s_prn_opt");		//Print Option
	       var prn_opt=getRadioVal(s_prn_opt);
	       var s_curr_opt=document.getElementsByName("s_curr_opt");	//Currency Option
	       var curr_opt=getRadioVal(s_curr_opt);
	       //1.Department Type check
	       if(!dptm_flg){
	       		//Please select a [Department Type]!
	       		alert(getLabel('FMS_COM_ALT004') + " \n - " + getLabel('FMS_COD_DETP'));
	       		return;
	       }
           if(!chkSearchCmprPrd(true, frm1.s_prd_strdt, frm1.s_prd_enddt)){
           		return;
           }
           //2.Currency check 
	       //3.Month 일 경우 기간 확인 
    	   if(prn_opt == "M" && isIntervalDt()){  //Month 일 경우 3개월 이내인지 확인
    		   	//If option is month, the period should be set within three months.
    		   	alert(getLabel('PFM_COM_ALT003'));
    	   		return;
    	   }
		   //============== Currency Check ==============
		   var multi_curr_flg="";	//One Currency 인 경우
		   if(curr_opt == "M"){		//Multil 인 경우
			   multi_curr_flg="T";
		   }
		   
		   //WMS ACCOUNT LKH 2015.01.20
		   if(curr_opt == "O"){	
			   //Currency List(Rate 이 등록되지 않은 data) 에 Rate 입력 확인, 0보다 커야 한다. 
	           if(currRateCheck(sheetObj)){
	           	return;
	           }
		   }

           //==============  Period 조회 조건  ==============
           var periodCol="";
           var periodSql="";
           var s_dt_clss_cd=formObj.s_dt_clss_cd.value; 
           var s_prd_strdt=mkFormat1(formObj.s_prd_strdt.value); 
           var s_prd_enddt=mkFormat1(formObj.s_prd_enddt.value); 
           if(s_dt_clss_cd == "PDT"){
        	   periodCol="post_dt";
           }
           if(s_dt_clss_cd == "IDT"){
        	   periodCol="inv_post_dt ";
           }
           periodSql=" AND " + periodCol + " BETWEEN '" + s_prd_strdt + "' AND '" + s_prd_enddt + "' ";
           //==============  sort 조건 query  ==============
           var s_sort_opt=document.getElementsByName("s_sort_opt");
           var sort_opt=getRadioVal(s_sort_opt);
           var sort_sql="";
           if(sort_opt ==  "1"){sort_sql="OPT1_COL";}
           if(sort_opt ==  "2"){
        	   if(prn_opt == "P"){
        		   sort_sql="PROFIT_AMT DESC, OPT1_COL";
        	   }else{        		   
        		   sort_sql="PROFIT_AMT DESC";
        	   }	   
           }
           //==============  Loss_Only 조건   ==============
           var s_loss_only_sql="";
           if(formObj.s_loss_only_flg.checked == true){
        	   s_loss_only_sql="AND PROFIT_AMT < 0 ";
           }
           //==============  option 조회 조건 query  ==============
		   var opt1_col=getReportType("s_rpt_tp_opt", "NM", "SELECT"); 
		   //============== One Currency ==============
		   
		   //#3593 [JTC]Profit Report & Performance Report 수정 사항
		   var exRateCol ="";
		   if(GL_VIEW_FALG == "Y"  && formObj.ex_rate_type.value == "OER"
			  &&    formObj.locl_curr_cd.value ==  formObj.s_curr_cd.value
		   ) {
			   exRateCol="* (CASE WHEN ISNULL(LOCL_CURR_CD,'') ='" + formObj.locl_curr_cd.value + "' " 
			   +   "        THEN 0 "
			   +   "        WHEN inv_curr_cd='" + formObj.s_curr_cd.value + "'"
			   +   "        THEN 1 "
			   +   " 	     ELSE ISNULL(dd_ex_rt.xch_rt_ut, ISNULL(mm_ex_rt.xch_rt_ut, ISNULL(gd_ex_rt.xch_rt_ut, 0)))"
			   +   "   END) "
			   +   "  + (CASE  WHEN   ISNULL(LOCL_CURR_CD,'')='" + formObj.locl_curr_cd.value + "' " 
			   +   "     THEN 1 " 
			   +   "     ELSE 0  END)"  ;
			   
		   }else{
			   exRateCol="* (CASE WHEN inv_curr_cd='" + formObj.s_curr_cd.value + "'"
			   +   "        THEN 1 "
			   +   " 	     ELSE ISNULL(dd_ex_rt.xch_rt_ut, ISNULL(mm_ex_rt.xch_rt_ut, ISNULL(gd_ex_rt.xch_rt_ut, 0)))"
			   +   "   END) "
			   +   "  +   0  ";
		   }
		   
		   var loclAmtCol = ""
		   
		   
			//============== Parameter Setting ==============	
			param += '[' + formObj.f_dptm_val.value + ']'; 		//$1	Department Type
			param += '[' + prn_opt + ']';  						//$2	Print Option
			param += '[' + sort_opt + ']';						//$3    Sort By
			param += '[' + formObj.s_dt_clss_cd.value + ']';	//$4	Period
			param += '[' + formObj.s_prd_strdt.value + ']';		//$5	StartDt	(05-01-2014)
			param += '[' + formObj.s_prd_enddt.value + ']';		//$6	EndDt   (05-31-2014)
			param += '[' + formObj.rpt_tp_opt.value + ']';		//$7	Report Type
			param += '[' + formObj.rpt_sub_opt.value + ']';		//$8	Sub Option
			param += '[' + formObj.s_ofc_cd.value + ']';		//$9	Office
			param += '[' + glo_usr_nm  + ']';					//$10	User Name
			param += '[' + mkFormat1(formObj.s_prd_strdt.value) + ']';	//$11	StartDt (20140501)
			param += '[' + mkFormat1(formObj.s_prd_enddt.value) + ']';	//$12	EndDt   (20140531)
			param += '[' + periodCol + ']';						//$13	Period column
			param += '[' + periodSql + ']';						//$14	Period 조회 조건 query 
			param += '[' + opt1_col + ']';						//$15	Report Type 조회 column
			param += '[' + sort_sql + ']';						//$16	sort 조회 조건 column
			param += '[' + getOptionQuery() + ']';				//$17	option 조회 조건 query 
			//if(prn_opt == "M"){									
			param += '[' + s_prd_strdt + ']';					//$18   option Month 조회시 - StartDt (주쿼리에서 +1 , +2 next month 를 search해 sub query 에서 사용)						
			//}
			//Multi Currency 인 경우 'F', One Currency 인 경우 ''
			param += '[' + multi_curr_flg + ']'; 				//$19
			param += '[' + s_loss_only_sql + ']'; 				//$20
			param += '[' + formObj.s_curr_cd.value + ']'; 		//$21	One 인 경우 Currency
			param += '[' + getRateQuery() + ']';   		  		//$22 	One currency  일 경우 currency  table query 를 보낸다.
			param += '[' + exRateCol + ']';   					//$23   One currency  일 경우
			param += '[' + formObj.f_ofc_locl_nm.value + ']';   //$24
			
			//LHK , 20140723, 추가 
			var air_sea_clss_cd = getDeptStr('air_sea_clss_cd');
			var bnd_clss_cd 	= getDeptStr('bnd_clss_cd');
			
			param += '[' + air_sea_clss_cd + ']';   			//$25
			param += '[' + bnd_clss_cd + ']';   				//$26
			param += '[' + curr_opt + ']';   				    //$27
			param += '[' + MULTI_CURR_FLAG + ']';   			//$28
			param += '[' + formObj.f_usrId.value + ']';   	    //$29
			
			//#52497 추가
			var salesY = "";
			var salesN = "";
			var salesC = "";
			var cnt = 0;
			if (formObj.s_sales_type_y.checked == true){
				salesY = ",'Y'"; cnt++;
			}
			if (formObj.s_sales_type_n.checked == true){
				salesN = ",'N'"; cnt++;
			}
			if (formObj.s_sales_type_c.checked == true){
				salesC = ",'C'"; cnt++;
			}
			
			//#1953 [BINEX] WMS PROFIT REPORT
            var onlyWmsChk = false;
			if(formObj.s_oi_dptm_flg.checked == false && formObj.s_ai_dptm_flg.checked ==false
			   && formObj.s_oe_dptm_flg.checked == false && formObj.s_ae_dptm_flg.checked == false 
			   && formObj.s_on_dptm_flg.checked == false && formObj.s_wm_dptm_flg.checked == true){
				onlyWmsChk = true; //only Wms Check
			}		
			if(onlyWmsChk == false){
				if (cnt == 0){
					alert(getLabel('FMS_COM_ALT004') + "\n - Sales Type");
					return;
				}
			}
							 
			var sales_value = salesY+salesN+salesC;			
			sales_value = sales_value.substring(1); 
			//alert(cnt + " "+sales_value);
			if (cnt == 3 || onlyWmsChk){ //#1953 [BINEX] WMS PROFIT REPORT  
				param += "[]";   	    //$30			
			}else{
				param += "[ AND NOMI_FLG IN ("+sales_value+")]";   	    //$30			
			}  
			
			//#52849 - [BNX] PROFIT REPORT TO HAVE "GROUP BY OFFICE" OPTION 추가
			var grp_by_ofc_flg = "";
			
			if(formObj.s_grp_by_ofc_flg.checked){				
				grp_by_ofc_flg = "T"
			}
			param += '[' + grp_by_ofc_flg + ']';						//$31
			
			//#1651 [Split - 1] [PATENT] 0215_02 Report Exchange Rate - Financial/Operational Option
			if(formObj.ex_rate_type.value == "OER"){
				param += '[tb_inv_xcrt]';                //$32
				param += '[inv_xcrt_dt]';                //$33
			}else{
				param += '[tb_finc_perf_xcrt]';          //$32
				param += '[inv_post_dt]';                //$33
			}
			
			//#628 [UNICO] PROFIT REPORT HEADER UPDATE (WITH SEARCH CONDITION)
			var dupRowsType = sheetObj3.ColValueDupRows("rpt_option_nm",{"IncludeDelRow" : 0});
			var arrRowType=dupRowsType.split(",");	
			var reportType ="";
			var dupFlagType = false;
			for(var j=sheetObj3.HeaderRows(); j <= sheetObj3.LastRow(); j++) {
				dupFlagType = false;
	        	for(var i=0; i<arrRowType.length; i++) {
	        		if(j == arrRowType[i]){
	        			dupFlagType = true;
	        		} 
	        	}	
	        	if(!dupFlagType && sheetObj3.GetCellValue(j, "rpt_option_nm") != "")
	        		reportType += sheetObj3.GetCellValue(j, "rpt_option_nm") + ", ";
			}
			if(reportType.length > 0){
				reportType = reportType.substring(0,reportType.length-2);
			}
			param += '['+reportType+']';                //$34
			
			
			var dupRowsOpt = sheetObj3.ColValueDupRows("rpt_sub_option_nm",{"IncludeDelRow" : 0});
			var arrRowOpt=dupRowsOpt.split(",");	
			var reportOpt ="";
			var dupFlagOpt = false;
			for(var j=sheetObj3.HeaderRows(); j <= sheetObj3.LastRow(); j++) {
				dupFlagOpt = false;
	        	for(var i=0; i<arrRowOpt.length; i++) {
	        		if(j == arrRowOpt[i]){
	        			dupFlagOpt = true;
	        		} 
	        	}	
	        	if(!dupFlagOpt && sheetObj3.GetCellValue(j, "rpt_sub_option_nm") != "")
	        		reportOpt += sheetObj3.GetCellValue(j, "rpt_sub_option_nm") + ", ";
			}
			if(reportOpt.length > 0){
				reportOpt = reportOpt.substring(0,reportOpt.length-2);
			}
			param += '['+reportOpt+']';                //$35			
			
			//#4790 [BNX FRA] OPUS 프로그램 문의
			param += '['+formObj.ex_rate_type.value+']';                //$36
			param += '['+formObj.locl_curr_cd.value+']';                //$37			
			param += '['+formObj.gl_view_falg.value+']';                //$38			
			if(GL_VIEW_FALG == "Y"  && formObj.ex_rate_type.value == "OER"
				  &&    formObj.locl_curr_cd.value ==  formObj.s_curr_cd.value
			   ) {
				param += '[Y]'; //$39
			}else{
				param += '[]'; //$39
			}
			
			//console.log(param);
			//==============  file_names  ==============
			file_names=getFileNames(prn_opt, curr_opt);
			//console.log(param);
			formObj.rd_param.value=param;
			formObj.file_name.value=file_names; 
			//alert("file_name : " + formObj.file_name.value + " \n\r rd_param : "+ formObj.rd_param.value); 
			//popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
			if (pdf) {
				popPOST(formObj, 'RPT_RD_0070.clt', 'popTest', 1025, 740);
				pdf = false;
			} else {
				popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
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

//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.frm1.f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.frm1.f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.frm1.f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
    
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.s_ofc_cd);
    
	//#3593 [JTC]Profit Report & Performance Report 수정 사항
	opt_key = "USE_LOCL_GL_VIEW_FALG";
	ajaxSendPost(setUseLoclGlViewFalg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");	    
	frm1.gl_view_falg.value = GL_VIEW_FALG;
    
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	initFinish();
	//선택된 radio 버튼을 값을 rpt_tp_opt, rpt_sub_opt 에 set
	setRadioVal();
	//LHK, 20140404, 유저별 접근권한 차별화 로직 제거
	//setDeptType();
	formObj.s_curr_cd.value=ofc_curr_cd;
	doWork('CURR_SEARCH');
	formObj.s_dt_clss_cd.value="PDT";

	//#3411 [JTC]Accounting & Performance 수정사항
	formObj.s_curr_opt.value = ACCT_FINC_CURR_DFLT;
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
	    case 1:      //IBSheet2 init
	        with(sheetObj){
	      
	     // (3, 0, 0, true);
	      var cnt=0;

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
	            SetSheetHeight(120);
	      }


		break;
    	case 2:      //IBSheet1 init
    	    with(sheetObj){
          
        //  (5, 0, 0, true);
          var cnt=0;

          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
          var headers = [ { Text:getLabel('PFM_MGT_0030_HDR2'), Align:"Center"} ];
          InitHeaders(headers, info);

          var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"chk",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                 {Type:"Text",      Hidden:1, Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rpt_option",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:1, Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rpt_sub_option",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rpt_option_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rpt_sub_option_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
           
          InitColumns(cols);

          SetEditable(1);
          SetSheetHeight(170);
                }

                                                   
         break;
         case 3:      //IBSheet2 init
        	    with(sheetObj){
            
         //  (5, 0, 0, true);
           var cnt=0;

           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, NewRowDeleteMode:1 } );

           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel('PFM_MGT_0030_HDR3'), Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"resetChk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:1, Width:180,  Align:"Center",  ColMerge:1,   SaveName:"rpt_option",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                  {Type:"Text",      Hidden:1, Width:180,  Align:"Center",  ColMerge:1,   SaveName:"rpt_sub_option",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                  {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rpt_option_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"rpt_sub_option_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" } ];
            
           InitColumns(cols);

           SetEditable(1);
           SetSheetHeight(170);
                 }


         break;
         case 4:      //IBSheet2 init
             with(sheetObj){
//             SetSheetHeight(0);
//          (1, 0, 0, true);
          var cnt=0;

          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
          var headers = [ { Text:getLabel('PFM_MGT_0030_HDR4'), Align:"Center"} ];
          InitHeaders(headers, info);

          var cols = [ {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"multi_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
           
          InitColumns(cols);

          SetEditable(1);
          SetVisible(false);

                   }


	     break;
     }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
} 
function sheet2_OnSearchEnd(){
}

function sheet3_OnBeforeCheckAll(sheetObj, Row, Col) { 
	switch(sheetObj.ColSaveName(Col)){
	case "resetChk":
		if(confirm('Do you really want to delete the whole?')){
			return true;
		}else{
			return false;
		}
	}
} 

function openPopUp(popName, curObj){
	var formObj=document.frm1;
	try {
		switch(popName) {
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
//필수항목체크
function checkVal(){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	return true;
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.s_prd_strdt, formObj.s_prd_enddt, 'MM-dd-yyyy');
        break;
    }
}
/**
* 화면로드 후 초기값 세팅
*/
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	var formObj=document.frm1;
    var date="";
    var year, month, day="";
    var year1, month1, day1="";
    var s_prd_strdt, s_prd_enddt="";           
    date=new Date(); 
    s_prd_strdt=new Date(date.getFullYear(),date.getMonth()-1,1);    
    month=s_prd_strdt.getMonth()+1;
    day=s_prd_strdt.getDate();
    year=s_prd_strdt.getFullYear();
    if(month<10){month='0'+ month;}    
    if(day<10){day='0' + day;}    
    s_prd_strdt=month + "-" + day + "-" + year;  
    s_prd_enddt=new Date(date.getFullYear(),date.getMonth(),0);     
    month1=s_prd_enddt.getMonth()+1;
    day1=s_prd_enddt.getDate();
    year1=s_prd_enddt.getFullYear();        
    if(month1<10){month1='0'+ month1;}    
    if(day1<10){day1='0' + day1;}
    s_prd_enddt=month1 + "-" + day1 + "-" + year1;
    formObj.s_prd_strdt.value=s_prd_strdt;
    formObj.s_prd_enddt.value=s_prd_enddt;
    
    // #52497 
    formObj.s_sales_type_y.checked = true;
    formObj.s_sales_type_n.checked = true;
    formObj.s_sales_type_c.checked = true;    
}
function rRadio(value) {
	var formObj=document.frm1;
	//WMS ACCOUNT LKH 2015.01.20
	if(value == "3" || value == "5" || value == "7" || value == "13"){ // HBL or HWAB NO, Agent, Carrier 일 경우 Other 는 print 대상에서 제외.
		   formObj.s_on_dptm_flg.checked=false;
		   formObj.s_on_dptm_flg.disabled=true;
		   formObj.s_wm_dptm_flg.checked=false;
		   formObj.s_wm_dptm_flg.disabled=true;
	}else if(value == "6" || value == "8" || value == "9" || value == "11" || value == "14"){ //Shipper,Consignee,POL,POD,DEL 일 경우 WMS 는 print 대상에서 제외.
		   formObj.s_wm_dptm_flg.checked=false;
		   formObj.s_wm_dptm_flg.disabled=true;
	}else{
		   formObj.s_on_dptm_flg.disabled=false;
		   formObj.s_wm_dptm_flg.disabled=false;
	}
	//선택된 radio 버튼을 값을 rpt_tp_opt, rpt_sub_opt 에 set
	setRadioVal();
}
function fRadio(value) {
	var formObj=document.frm1;
	if(value == ""){
		formObj.s_sel_sub_val.value="";//trdp_cd
		formObj.s_sel_sub_val.className='search_form-disable';
		formObj.s_sel_sub_val.readOnly=true;
	}else{
		formObj.s_sel_sub_val.className='search_form';
		formObj.s_sel_sub_val.readOnly=false;
	}
	//선택된 radio 버튼을 값을 rpt_tp_opt, rpt_sub_opt 에 set
	setRadioVal();
}
/**
 * 선택된 radio 버튼을 값을 rpt_tp_opt, rpt_sub_opt 에 set
 * @return
 */
function setRadioVal(){
	var formObj=document.frm1;
	var s_rpt_tp_opt=document.getElementsByName("s_rpt_tp_opt");
    var s_rpt_sub_opt=document.getElementsByName("s_rpt_sub_opt");
	formObj.rpt_tp_opt.value=getRadioVal(s_rpt_tp_opt);
	formObj.rpt_sub_opt.value=getRadioVal(s_rpt_sub_opt);
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
function mkFormat1(dtStr){
	 var rtnStr="";
	 var dtStr=dtStr.replace('-','').replace('-',''); 
	 rtnStr=dtStr.substring(4,8) + dtStr.substring(0,2) + dtStr.substring(2,4); 
	 return rtnStr;
}
function isIntervalDt(){
	var formObj=document.frm1;
    var s_prd_strdt=formObj.s_prd_strdt.value;
    var s_prd_enddt=formObj.s_prd_enddt.value;
    s_prd_strdt=mkFormat1(s_prd_strdt).substring(0,6); 
    s_prd_enddt=mkFormat1(s_prd_enddt).substring(0,6); 
    var s_prd_strYm=s_prd_strdt; 
    var date=new Date(); 
    date.setFullYear( parseInt(s_prd_strYm.substring(0,4))); 
    date.setMonth(parseInt(s_prd_strYm.substring(4)) + 2); 
    var year=date.getFullYear();
    var month=date.getMonth();
    if(month<10){month='0'+ month;}    
    var s_prd_endYm=year + month;
    if(s_prd_enddt > s_prd_endYm){
    	return true;
    }
    return false;
}
function getFileNames(prn_opt, curr_opt){
	var formObj=document.frm1; 
	var file_names="";
	//[Detail]
	if(prn_opt == "D"){
		file_names='pfm_profit_detail.mrd';
	}
	//[Summary]
	if(prn_opt == "S"){
		file_names='pfm_profit_summary.mrd';
	}
	//[Special]
	if(prn_opt == "P"){	
		file_names='pfm_profit_special.mrd';
	}
	//[Month]
	if(prn_opt == "M"){	
		file_names='pfm_profit_month.mrd';
	}
	return file_names;
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

function getReportType(radioNmVal, colType, searchType){
	
	//
	var colVal		= "";
	var colVal_		= "";
	var colVal_0 	= "";
	var colVal_1 	= "";
	var colVal_2 	= "";
	var colVal_3 	= "";	
	var colVal_4 	= "";
	var colVal_5 	= "";
	var colVal_6 	= "";
	var colVal_7 	= "";
	var colVal_8 	= "";
	var colVal_9 	= "";
	var colVal_10  	= "";
	var colVal_11 	= "";
	var colVal_12 	= "";
	var colVal_13 	= "";
	var colVal_14 	= "";
	var colVal_17 	= "";
	
	if(colType == "NM"){
		colVal		= "";
		colVal_		= "";
		colVal_0 	= "";
		colVal_1 	= "ref_no";
		colVal_2 	= "";
		colVal_3 	= "bl_no";	
		colVal_4 	= "sls_usr_nm";
		colVal_5 	= "agent_nm";
		colVal_6 	= "shpr_nm";
		colVal_7 	= "carr_nm";
		colVal_8 	= "cnee_nm";
		colVal_9 	= "pol_nm";
		colVal_10  	= "cust_nm";
		colVal_11 	= "pod_nm";
		colVal_12 	= "";
		colVal_13 	= "acc_grp_id";
		colVal_14 	= "del_nm";
		colVal_15 	= "opr_usr_nm";
		//#289 [BINEX] PROFIT REPORT TO ADD REPORT TYPE: TEAM/OPERATOR OPTION
		if(searchType == "SELECT"){
			//OFVFINS-372 [AWS3] V4.7.0.09 NEW RELEASE UPGRADE ON 01/14/2021
			//colVal_17 	= "ISNULL(team, \'none\') \+ \'\/\' \+ ISNULL(opr_usr_nm, \'none\')";
			colVal_17 	= "ISNULL(team, CHAR(110) + CHAR(111) + CHAR(110) + CHAR(101)) + CHAR(47) + ISNULL(opr_usr_nm, CHAR(110) + CHAR(111) + CHAR(110) + CHAR(101))";
		}else{
			
			colVal_17 	= "opr_usr_nm";
		}
	}
	
	if(colType == "CD"){
		colVal		= "";
		colVal_		= "";
		colVal_0 	= "";
		colVal_1 	= "ref_no";
		colVal_2 	= "";
		colVal_3 	= "bl_no";	
		colVal_4 	= "sls_usr_nm";
		colVal_5 	= "agent_cd";
		colVal_6 	= "shpr_cd";
		colVal_7 	= "carr_cd";
		colVal_8 	= "cnee_cd";
		colVal_9 	= "pol_cd";
		colVal_10  	= "cust_cd";
		colVal_11 	= "pod_cd";
		colVal_12 	= "";
		colVal_13 	= "acc_grp_id";
		colVal_14 	= "del_cd";
		colVal_15 	= "opr_usr_nm";
		//#289 [BINEX] PROFIT REPORT TO ADD REPORT TYPE: TEAM/OPERATOR OPTION
		if(searchType == "SELECT"){
			//OFVFINS-372 [AWS3] V4.7.0.09 NEW RELEASE UPGRADE ON 01/14/2021
			//colVal_17 	= "ISNULL(team, \'none\') \+ \'\/\' \+ ISNULL(opr_usr_nm, \'none\')";
			colVal_17 	= "ISNULL(team, CHAR(110) + CHAR(111) + CHAR(110) + CHAR(101)) + CHAR(47) + ISNULL(opr_usr_nm, CHAR(110) + CHAR(111) + CHAR(110) + CHAR(101))";
		}else{
			
			colVal_17 	= "opr_usr_nm";
		}
	}
	
	var s_rpt_tp_opt 	= document.getElementsByName(radioNmVal);
	var optCol			= "";
	
    for(var i=0; i<s_rpt_tp_opt.length; i++){
    	if(s_rpt_tp_opt[i].checked){
    		optCol	=	eval("colVal_"+s_rpt_tp_opt[i].value);
    	}
    } 
   
    return optCol;
	
}

function getOptionQuery(){
	optCol1 = " " + getReportType("s_rpt_tp_opt", "NM", "WHERE") + " ";
	optCol2 = " " + getReportType("s_rpt_sub_opt", "NM", "WHERE") + " ";
	var sheetObj3=docObjects[2];
	var formObj=document.frm1;
	var optListValSql="";
	for(var i=1; i<=sheetObj3.LastRow();i++){
		if(i == 1){
			optListValSql += " AND (";
		}else{
			optListValSql += " OR ";
		}
		var rpt_option_nm=sheetObj3.GetCellValue(i, "rpt_option_nm").replaceAll("'", "^^@@").replaceAll("^^@@", "''");
		var rpt_sub_option_nm=sheetObj3.GetCellValue(i, "rpt_sub_option_nm").replaceAll("'", "^^@@").replaceAll("^^@@", "''");
		if(sheetObj3.GetCellValue(i, "rpt_option") != "" && sheetObj3.GetCellValue(i, "rpt_sub_option") != ""){
			optListValSql += " (" + optCol1 + "='" + rpt_option_nm
			                         + "' AND " + optCol2 + "='" + rpt_sub_option_nm
			                     +"') "
			                 ;
		}
		if(sheetObj3.GetCellValue(i, "rpt_option") != "" && sheetObj3.GetCellValue(i, "rpt_sub_option") == ""){
			optListValSql +=  optCol1 + "='" + rpt_option_nm + "' "
                            ;
		}
		if(sheetObj3.GetCellValue(i, "rpt_option") == "" && sheetObj3.GetCellValue(i, "rpt_sub_option") != ""){
			optListValSql +=  optCol2 + "='" + rpt_sub_option_nm + "' "
                            ;
		}
    	if(i == sheetObj3.LastRow()){
			optListValSql += " ) ";
    	}	
    }
	return optListValSql;
}
/**
* Department type Set
* userInfo.getDept_cd() 에 따라 Department type 사용 권한을 차별화 한다.
* Dept_cd 권한 
* 1 : Manager        -- 모든 권한 , else 도 모든 권한
* 2 : Air Export     -- Air Export 권한 
* 3 : Air Import     -- Air Import 권한 
* 4 : Ocean Export   -- Ocean Export 권한 
* 5 : Ocean Import   -- Ocean Import 권한 
* 6 : Sales Team     -- 권한 x
* 7 : Accounting     -- 권한 x
*/
function setDeptType(){
	var formObj=document.frm1;
	var dept_cd=formObj.f_dept_cd.value;
	formObj.s_oi_dptm_flg.checked=false;
  	formObj.s_ai_dptm_flg.checked=false;
  	formObj.s_oe_dptm_flg.checked=false;
  	formObj.s_ae_dptm_flg.checked=false;
  	formObj.s_on_dptm_flg.checked=false;

	if(dept_cd == "2"){
		formObj.s_ae_dptm_flg.checked=true;
	}else if(dept_cd == "3"){
	   	formObj.s_ai_dptm_flg.checked=true;
	}else if(dept_cd == "4"){
	   	formObj.s_oe_dptm_flg.checked=true;
	}else if(dept_cd == "5"){
	   	formObj.s_oi_dptm_flg.checked=true;
	}
	if(dept_cd == "2" 
		|| dept_cd == "3"
			|| dept_cd == "4"
				|| dept_cd == "5"
					|| dept_cd == "6"
						|| dept_cd == "7"){
		formObj.s_oi_dptm_flg.disabled=true;
	   	formObj.s_ai_dptm_flg.disabled=true;
	   	formObj.s_oe_dptm_flg.disabled=true;
	   	formObj.s_ae_dptm_flg.disabled=true;
	   	formObj.s_on_dptm_flg.disabled=true;
	}else{
		formObj.s_oi_dptm_flg.disabled=false;
	   	formObj.s_ai_dptm_flg.disabled=false;
	   	formObj.s_oe_dptm_flg.disabled=false;
	   	formObj.s_ae_dptm_flg.disabled=false;
	   	formObj.s_on_dptm_flg.disabled=false;
	}
}
function setDeptVal(){
	var formObj=document.frm1;
	var f_dptm_val="";
	//WMS ACCOUNT LKH 2015.01.20
	var arr_dptm_flg=new Array(6);								//Department Option
	var cnt=0;
	arr_dptm_flg[0]=formObj.s_oi_dptm_flg;
	arr_dptm_flg[1]=formObj.s_oe_dptm_flg;
	arr_dptm_flg[2]=formObj.s_ai_dptm_flg;
	arr_dptm_flg[3]=formObj.s_ae_dptm_flg;
	arr_dptm_flg[4]=formObj.s_on_dptm_flg;
	arr_dptm_flg[5]=formObj.s_wm_dptm_flg;
	for(var i=0 ; i < arr_dptm_flg.length; i ++){
		   if(arr_dptm_flg[i].checked){
			   f_dptm_val	+= "'" + arr_dptm_flg[i].value + "', ";
			   cnt++;
		   }
	} 
	if(cnt > 0){
		formObj.f_dptm_val.value=f_dptm_val.substring(0,f_dptm_val.length-2);
		return true;
	}else{
		formObj.f_dptm_val.value="";
		return false;
	}
}

function getDeptStr(cdVal){

	var formObj  = document.frm1;
	
	var f_dptm_val = "";
	//WMS ACCOUNT LKH 2015.01.20
	var arr_dptm_flg = new Array(6);								//Department Option
	var cnt			 = 0;
	
	arr_dptm_flg[0] = formObj.s_oi_dptm_flg;
	arr_dptm_flg[1] = formObj.s_oe_dptm_flg;
	arr_dptm_flg[2] = formObj.s_ai_dptm_flg;
	arr_dptm_flg[3] = formObj.s_ae_dptm_flg;
	arr_dptm_flg[4] = formObj.s_on_dptm_flg;
	arr_dptm_flg[5] = formObj.s_wm_dptm_flg;
	for(var i = 0 ; i < arr_dptm_flg.length; i ++){
		   if(arr_dptm_flg[i].checked){
			   
			   if(cdVal == 'air_sea_clss_cd'){
				   f_dptm_val	+= "'" + arr_dptm_flg[i].value.substring(0,1) + "', ";
			   }else{	//bnd_clss_cd 인 경우
				   f_dptm_val	+= "'" + arr_dptm_flg[i].value.substring(1) + "', ";
			   }
			   cnt++;
		   }
	} 
	
	if(cnt > 0){
		f_dptm_val = f_dptm_val.substring(0,f_dptm_val.length-2);
	}else{
		f_dptm_val = "";
	}
	
	return f_dptm_val;
}

//WMS ACCOUNT LKH 2015.01.20
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
//WMS ACCOUNT LKH 2015.01.20
function setCurrCheckBoxValue(){
	var formObj = document.frm1;

	var s_air_sea_clss_cd = "";
	var s_bnd_clss_cd 	  = "";
	
	var arr_dptm_flg = new Array(6);								//Department Option
	var cnt			 = 0;
	
	arr_dptm_flg[0] = formObj.s_oe_dptm_flg;
	arr_dptm_flg[1] = formObj.s_ae_dptm_flg;
	arr_dptm_flg[2] = formObj.s_oi_dptm_flg;
	arr_dptm_flg[3] = formObj.s_ai_dptm_flg;
	arr_dptm_flg[4] = formObj.s_on_dptm_flg;
	arr_dptm_flg[5] = formObj.s_wm_dptm_flg;
	
	//Department : fms
	if(formObj.s_oe_dptm_flg.checked == true || formObj.s_oi_dptm_flg.checked == true || formObj.s_ae_dptm_flg.checked == true || formObj.s_ai_dptm_flg.checked == true){
		formObj.s_fms_flg.value = 'T';
	}else{
		formObj.s_fms_flg.value = 'F';
	}
	
	//Department : Other
	if(formObj.s_on_dptm_flg.checked == true){
		formObj.s_oth_flg.value = 'T';
	}else{
		formObj.s_oth_flg.value = 'F';
	}
	//Department : wms
	if(formObj.s_wm_dptm_flg.checked == true){
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
}

function setSlsTp(){
	var formObj = document.frm1;
	//wms 옵션에 대한 visible여부 확인 후 로직 적용
	if(formObj.s_wm_dptm_flg.style.display == "inline"){
		if(formObj.s_wm_dptm_flg.checked){
			jQuery("input#s_sales_type_y").prop("disabled",true);
			jQuery("input#s_sales_type_n").prop("disabled",true);
			jQuery("input#s_sales_type_c").prop("disabled",true);
		}else{
			jQuery("input#s_sales_type_y").prop("disabled",false);
			jQuery("input#s_sales_type_n").prop("disabled",false);
			jQuery("input#s_sales_type_c").prop("disabled",false);
		}
	}else{
		jQuery("input#s_sales_type_y").prop("disabled",false);
		jQuery("input#s_sales_type_n").prop("disabled",false);
		jQuery("input#s_sales_type_c").prop("disabled",false);
	}
}

//Calendar flag value
var firCalFlag=false;

//#3593 [JTC]Profit Report & Performance Report 수정 사항
function setUseLoclGlViewFalg(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		GL_VIEW_FALG=doc[1];
	} else {
		GL_VIEW_FALG="N";
	}	
}
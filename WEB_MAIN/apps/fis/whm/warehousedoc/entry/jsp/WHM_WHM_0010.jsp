<%--
=========================================================
*@FileName   : WHM_WHM_0010.jsp
*@FileTitle  : WM Doc. Entry
*@Description: WM Doc. Entry
*@author     : 
*@version    : 1.0 - 10/20/2011
*@since      : 10/20/2011

=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/whm/warehousedoc/entry/script/WHM_WHM_0010.js?ver=<%=CLT_JS_VER%>"></script>
	
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String usrId		= userInfo.getUsrid();
		String ofcEngNm 	= userInfo.getOfc_eng_nm();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
		String doc_ref_no 		= request.getParameter("doc_ref_no");
		if("".equals(doc_ref_no) || doc_ref_no==null){
			doc_ref_no = "";
		}
		
	%>

	<bean:define id="valMap"  		name="EventResponse" property="mapVal"/>
	<bean:define id="othDetailsVO" 	name="EventResponse" property="objVal"/>
	<bean:define id="ofcVO" 		name="valMap" property="ofcInfo"/>
	<bean:define id="ofcInfo"  		name="valMap" property="ofcInfo"/>
	
		
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
	</script>
	
	
	<script>
		function setSelection(){
			frm1.ofc_cd.value = '<bean:write name="ofcInfo" property="ofc_cd"/>';
			frm1.curr_cd.value = '<bean:write name="ofcVO" property="trf_cur_cd"/>';
			
			
			
			if(frm1.h_ofc_cd.value != ""){
				frm1.ofc_cd.value = frm1.h_ofc_cd.value;
			}

			if(frm1.h_curr_cd.value != ""){
				frm1.curr_cd.value = frm1.h_curr_cd.value;
			}
		}
		
		
		var TPCD1 = '';
        var TPCD2 = '';
        <% boolean isBegin = false; %>
        <!--Role 코드조회-->
        <bean:define id="tpszList"  name="valMap" property="cntrTpszList"/>
        <logic:iterate id="codeVO" name="tpszList">
            <% if(isBegin){ %>
                TPCD1+= '|';
                TPCD2+= '|';
            <% }else{
                  isBegin = true;
               } 
            %>
            TPCD1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
            TPCD2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
        </logic:iterate>

        var h_ref_no = '<bean:write name="othDetailsVO" property="ref_no"/>';

        //button control
        function btnLoad(){
	        if(h_ref_no==''){
	        	/* getBtnObj('btnSave').style.display = "none";
	        	getObj('sndEmlObj').style.display = "none";
	        	getObj('s_docObj').style.display = "none";
	        	getObj('fileUpObj').style.display = "none"; */

	        	/* #20552 : [ADVC] Other Operation 에 Copy 기능 추가, jsjang 2013.10.24 */
	        	/* getBtnObj('btnCopy').style.display  = 'none'; */
	        	getBtnObj('btnAccounting').style.display  = 'inline';
	        	
	        }else{
	        	/* getBtnObj('btnSave').style.display = 'inline';
	        	getObj('sndEmlObj').style.display = 'inline';
	        	getObj('s_docObj').style.display = 'inline';
	        	getObj('fileUpObj').style.display = 'inline';
 				*/
	        	/* #20552 : [ADVC] Other Operation 에 Copy 기능 추가, jsjang 2013.10.24 */
				/* getBtnObj('btnCopy').style.display  = 'inline'; */
	        	getBtnObj('btnAccounting').style.display  = 'inline';
	        }
        }
	</script>

<script>
function setupPage(){
	loadPage();
	setSelection();
	
	btnLoad();
	
	//2016.04.21 C.W.Park Added
	//#52109 버튼 로딩 후 ofc별 blck_dt 셋업
	setBlock_dt();
	if(frm1.show_complete.value == "Y"){
		showCompleteProcess();
	}
}
</script>
<style>
<!--
.required {
	background-color: #d4f6ff;
}
-->
</style>
<form name="frm1" method="POST" action="./WHM_WHM_0010.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="save_sts_flg"/>
	
	<input type="hidden" name="f_sts_cd" value="<bean:write name="othDetailsVO" property="sts_cd"/>"/>
	<input type="hidden" name="delt_flg" value="<bean:write name="othDetailsVO" property="delt_flg"/>"/>
	<input type="hidden" name="old_doc_ref_no" value="<bean:write name="othDetailsVO" property="doc_ref_no"/>"/>
	<input type="hidden" name="wm_doc_seq" value="<bean:write name="othDetailsVO" property="wm_doc_seq"/>"/>
	<input type="hidden" name="old_ref_no" value="<bean:write name="othDetailsVO" property="ref_no"/>"/>
	<input type="hidden" name="h_wh_cd" value="<bean:write name="othDetailsVO" property="wh_cd"/>">
	<input type="hidden" name="f_ibflag"/>
	
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_usr_id" value="<%= usrId %>"/>
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email"  value="<%= email %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
		
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	
	<input type="hidden" name="show_complete" 	value='<bean:write name="valMap" property="show_complete"/>'> 
	
	<!-- 업데이트 시에 변경된 값과 비교해 보기 위해서 -->
    <input type="hidden" name="org_post_dt"  value='<bean:write  name="othDetailsVO" property="post_dt" />'> 
	
	<!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <div class="opus_design_btn TOP">
	   	   <%-- 
	   	   <button type="button" class="btn_accent" onClick="doWork('SELECT')" ><bean:message key="Search"/></button>
		   <button type="button" class="btn_normal" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="doWork('NEW')"><bean:message key="New"/></button> 
		   <button id="btnModify" type="button" class="btn_normal" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('MODIFY')"><bean:message key="Save"/></button> 
		   <button id="btnDelete" type="button" btnAuth="<%= roleBtnVO.getAttr4() %>" style="cursor:hand; display:none;" class="btn_normal" onclick="doWork('REMOVE')"><bean:message key="Delete"/></button>
		   <button id="btnAccounting" style="cursor:hand; display:none;" type="button" btnAuth="ACCOUNTING" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('GOTOACCT')"><bean:message key="Accounting"/></button>
		    --%>
	   </div>
	 <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	<!-- Search option -->
<div class="over_wrap">
    <div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel">
			<table>
            	<colgroup>
            		<col width="130"></col>
            		<col width="*"></col>
            	</colgroup>
            	<tbody>
					<tr>
						<th><bean:message key="Doc_ref_no"/></th>
						<td>
							<input type="text" name="f_doc_ref_no" maxlength="20"   onKeyPress="ComKeyOnlyAlphabet('num')" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled;width:235px;text-transform:uppercase;" value="<%=doc_ref_no%>" >
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_inquiry">
		    <div class="layout_vertical_3 pad_rgt_8" style="width: 33%;">
		    	<table>
					<tr>
	      				<th width="120px" ><bean:message key="Doc_ref_no"/></th>
	           			<td class="table_search_head"> 
	           				 <input type="text" name="doc_ref_no" onBlur="strToUpper(this);checkRefNo();" value="<bean:write name="othDetailsVO" property="doc_ref_no"/>" onclick="if(frm1.doc_ref_no.value=='AUTO'){frm1.doc_ref_no.value=''}" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" maxlength="20"/><!-- 
	           			--><bean:define id="oficeList" name="valMap" property="ofcList"/><!-- 
	           			 --><select name="ofc_cd" style="width:67px;" onChange="setBlock_dt();" >
	                        <logic:iterate id="ofcVO" name="oficeList">
	                                <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                        </logic:iterate>
	                            </select>
	                            <input type="hidden" name="h_ofc_cd" value="<bean:write name="othDetailsVO" property="ofc_cd"/>">
	           			</td>
	       			</tr>
	       			
	       			<tr>
						<th ><bean:message key="Warehouse"/></th>
		            	<td nowrap>
		            		<bean:define id="warehouseCdList" name="valMap" property="whCdList"/>
							<select required name="wh_cd" id="wh_cd"  style="width:242px;"/>
							<option value=''></option>
							 <bean:size id="len" name="warehouseCdList" />
				        	<logic:iterate id="InventoryVO" name="warehouseCdList">
				        		<option value='<bean:write name="InventoryVO" property="wh_cd"/>'><bean:write name="InventoryVO" property="wh_nm"/></option>
				        	</logic:iterate>
			        		</select>
			        		
			        		
						</td>
	       			</tr>
	       			<tr>
	       				<th><bean:message key="Contract_No"/></th>
						<td>
							<input name="s_ctrt_no" id="s_ctrt_no" type="text" value="<bean:write name="othDetailsVO" property="ctrt_no"/>" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);getCtrtInfo(this);" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" onChange="getCtrtInfo(this)" required /><!-- 
							 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" onclick="doWork('btn_ctrt_no')" class="input_seach_btn" tabindex="-1"></button><!-- 						
							 --><input name="ctrt_nm" id="ctrt_nm" value="<bean:write name="othDetailsVO" property="ctrt_nm"/>" type="text" class="L_input" style="width:130px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);"  readonly />
						</td>
	       			</tr>
	       			<tr>
						<th ><bean:message key="Customer"/></th>
		            	<td>
		            		<input  type="text" name="cust_cd" maxlength="20" disabled="disabled" value="<bean:write name="othDetailsVO" property="cust_cd"/>" onKeyDown="codeNameAction('trdpCode_cs',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_cs',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:80px;"><!-- 
		            	<button type="button" class="input_seach_btn" tabindex="-1" id="cust" disabled="disabled" onclick="doWork('CUSTOMER_POPLIST')"></button> 
		            	 --><input disabled="disabled"  name="cust_nm" maxlength="50" value="<bean:write name="othDetailsVO" property="cust_nm"/>" type="text" onKeyDown="custEnterAction(this,'CUSTOMER')" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:160px;">
		            	</td>
	       			</tr>
	       			<tr>
						<th ><bean:message key="Customer_Ref_No"/></th>
		            	<td>
		            		<input type="text" name="cust_ref_no" maxlength="20" value="<bean:write name="othDetailsVO" property="cust_ref_no"/>"  onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"/>
		            	</td>
		        	</tr>
		        	<tr>
				        <th ><bean:message key="Internal_Remark"/></th>
			            <td>
			            	<textarea name="int_memo" rows="10"   onblur="strToUpper(this);" dataformat="excepthan" style="width:245px;height:100px;"  WRAP="off"><bean:write name="othDetailsVO" property="int_memo"/></textarea>
			            </td>
			        </tr>
			        <tr>
				        <th ><bean:message key="External_Remark"/></th>
			            <td>
			            	<textarea name="ext_memo" rows="10"   onblur="strToUpper(this);" dataformat="excepthan" style="width:245px;height:100px;"  WRAP="off"><bean:write name="othDetailsVO" property="ext_memo"/></textarea>
			            </td>
			        </tr>
				</table>				
		    </div>
		    
		    <div class="layout_vertical_3 pad_rgt_8" style="width: 35%;">
	    	<table>
	    			<tr>
						<th ><bean:message key="Container"/><br><bean:message key="Information"/></th>
		            	<td>
		            		<textarea name="cntr_info" rows="10"   onblur="strToUpper(this);" dataformat="excepthan" style="width:220px;height:45px;"  WRAP="off"><bean:write name="othDetailsVO" property="cntr_info"/></textarea>
		            	</td>
		        	</tr>
	    			<tr>
						<th ><bean:message key="MBL_No"/></th>
		            	<td>
		            		<input type="text" name="mbl_no" maxlength="20" value="<bean:write name="othDetailsVO" property="mbl_no"/>"  onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"/>
	           			</td>
	       			</tr>
	       			<tr>
						<th ><bean:message key="HBL_No"/></th>
		           	 	<td>	
		           	 		<input type="text" name="hbl_no" maxlength="20" value="<bean:write name="othDetailsVO" property="hbl_no"/>"  onBlur="strToUpper(this);"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"/>
		            	</td>
	       			</tr>
	       			<tr>
						<th ><bean:message key="Currency"/></th>
						<td> 
							<select name="curr_cd" style="width:75px;">
		                	<bean:define id="currCdList"  name="valMap" property="currCdList"/>
							<logic:iterate id="CurrVO" name="currCdList">
		                 			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
		                	</logic:iterate>
		                     </select>
							 <input type="hidden" name="h_curr_cd" value="<bean:write name="othDetailsVO" property="curr_cd"/>">
						</td>
					</tr>
					<tr>
			            <th ><bean:message key="Post_Date"/></th>
			        	<td> 
				            <input required type="text" name="post_dt" id="post_dt" value="<bean:write  name="othDetailsVO" property="post_dt" />" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Post Date');checkPostDate(this);" size='11' maxlength="10"  dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!-- 
				         --><button type="button" id="post_dt_cal" onclick="doDisplay('DATE_POST', frm1); setCtrbMgn(frm1.cust_cd.value);" class="calendar" tabindex="-1"></button>
				        </td>
			        </tr>
					<tr>
						<th ><bean:message key="Sales_PIC"/></th>
					    <td>
						           	<input type="text" name="sls_usrid" value="<bean:write name="othDetailsVO" property="sls_usrid"/>" class="search_form-disable" style="width:130px;" readOnly><!-- 
						       --><button type="button" class="input_seach_btn" tabindex="-1" id="salesperson" onClick="openPopUp('USER_POPLIST',this)"></button>
						</td>
					</tr>
					<tr>
								<th ><bean:message key="Sales_OFC"/></th>
					            <td width="200"> 
						            <input type="text" name="sls_ofc_cd" value="<bean:write name="othDetailsVO" property="sls_ofc_cd"/>" class="search_form-disable" style="width:130px;" readOnly><!-- 
						         --><button type="button" class="input_seach_btn" tabindex="-1" id="salesofc" onclick="openPopUp('OFFICE_GRID_POPLIST',this)"></button>
						       </td>
					</tr>
					<tr>
					            <th ><bean:message key="Operator"/></th>
					            <td>
						            <input type="text" name="opr_usrid" value="<bean:write name="othDetailsVO" property="opr_usrid"/>" class="search_form-disable" style="width:130px;" readOnly><!-- 
						          --><button type="button" class="input_seach_btn" tabindex="-1" id="salesofc" id="operator" onClick="openPopUp('USER_POPLIST2',this)"></button>
								</td>
					</tr>
					<tr>					        	
					            <th ><bean:message key="Contrib_Office"/></th>
					            <td>
						             <input type="text"   name="ctrb_ofc_cd" value='<bean:write name="othDetailsVO" property="ctrb_ofc_cd"/>' class="search_form" onKeyDown="codeNameAction('officeCd_ctrbOfc',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('officeCd_ctrbOfc',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
                                    --><button type="button" name="ctrbOfc" id="ctrbOfc" class="input_seach_btn" tabindex="-1" onClick="openPopUp('OFFICE_GRID_POPLIST',this)"></button>
								</td>
					            					        
					        </tr>
					        <tr>
					        	<th><bean:message key="Use_Ratio"/></th>
								<td>
									<input type="checkBox" name="ctrb_ratio_yn" id="ctrb_ratio_yn" value="<bean:write name="othDetailsVO" property="ctrb_ratio_yn"/>" onclick="flgChange(this);clickCtrbRatioYn();">
									<input type="text" name="ctrb_mgn" value="<bean:write name="othDetailsVO" property="ctrb_mgn"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,20,2);chkComma(this,20,2);checkRatioValid();" maxlength="23" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right;">
								</td>					
					        </tr>
					        <tr>
					        	<th><bean:message key="Contrib_Dept"/></th>
								<td>
									<bean:define id="ctrbDeptList" name="valMap" property="ctrbDeptList"/>
	                                <html:select name="othDetailsVO" property="ctrb_dept_cd" styleClass="search_form" style="width:150px;">
	                                    <option value=""></option>
	                                    <html:options collection="ctrbDeptList" property="cd_val" labelProperty="cd_nm"/>
	                                </html:select>
								</td>
					        </tr>		        
				</table>				
		    </div>
		    <div class="layout_vertical_3" style="width: 30%;">
			    	<table>
							<tr>
								<td>
								&nbsp;
								</td>
							</tr>
						</table> 
		    </div>
		</div>				
	</div>

	<table>
			<colgroup>
				<col width="20">
				<col width="60">
				<col width="*">
				</colgroup>
            	<tbody>
            	<tr>
            		<td>&nbsp;
            		</td>
					<td><h3 class="title_design mar_btm_8"><bean:message key="List" /></h3>
					</td>
					<td>&nbsp;
            		</td>
				</tr>
            	</tbody>
			
	</table>
		

	<div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel">
			<table>
            	<colgroup>
				<col width="50">
				<col width="110">
				<col width="320">
				<col width="900">
				<col width="250">
				<col width="90">
				<col width="*">
				</colgroup>
            	<tbody>
					<tr>
		            	<th><bean:message key="Status"/></th>
						<td nowrap><select name="f_rcv_shp_tp_cd" style="width:100px;"/>
			        		<option value="">ALL</option>
				        	<option value="RCV">Receiving</option>
				        	<option value="SHP">Shipping</option>			        	
			        	</select></td>
	        			<td><select name="f_tp_date" id="f_tp_date" style="width:120px;">
			        			<option value="BKG">Booking Date</option>
			        			<option value="RCV">Received date</option>
			        		</select><input  type="text" name="f_rcvshp_fmdt" id="f_rcvshp_fmdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_rcvshp_todt);firCalFlag=false;" size='11' maxlength="10" style="width:75px;"><!--
			        	-->~<!--																																																			
			        	--><input  type="text" name="f_rcvshp_todt" id="f_rcvshp_todt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_rcvshp_fmdt, this);firCalFlag=false;" size='11' maxlength="10" style="width:75px;"><!--
			        	--><button type="button" id="f_reptdt_cal" onclick="doDisplay('DATE11', frm1);" class="calendar" tabindex="-1"></button></td>
			        	<td><button type="button" class="btn_accent" onClick="doWork('SEARCHLIST02')" ><bean:message key="Search"/></td>
		            	
		            	<th style="display:none"><bean:message key="Warehouse"/></th>
		            	<td style="display:none" nowrap>
		            		<bean:define id="warehouseCdList" name="valMap" property="whCdList"/>
							<select  name="f_wh_cd" id="f_wh_cd" style="width:242px;"/>
							<option value=''></option>
							 <bean:size id="len" name="warehouseCdList" />
				        	<logic:iterate id="InventoryVO" name="warehouseCdList">
				        		<option value='<bean:write name="InventoryVO" property="wh_cd"/>'><bean:write name="InventoryVO" property="wh_nm"/></option>
				        	</logic:iterate>
			        		</select>			        	
						</td>		            	
			        	<th style="display:none" ><bean:message key="Customer"/></th>
		            	<td style="display:none">
		            		<input  type="text" name="f_cust_cd" maxlength="20" value='' onKeyDown="codeNameAction('trdpCode',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:70px;"><!-- 
		            	--><button type="button" class="input_seach_btn" tabindex="-1" id="cust" onclick="doWork('CUSTOMER_POPLIST_F')"></button><!-- 
		            	 --><input  name="f_cust_nm" maxlength="50" value='' type="text" onKeyDown="custEnterAction(this,'CUSTOMER')" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:117px;">
		            	</td>
		            	
		            	
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result">		
		
		<div class="opus_design_grid">
   			<script language="javascript">comSheetObject('sheet1');</script>  <!-- Header bind용 sheet --> 
	   		<script language="javascript">comSheetObject('sheet2');</script>
   		</div>
	</div>
</div>
</form>
	<form name="frm2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="blFileDown"/>
    <input type="hidden" name="s_palt_doc_seq" value=""/>
    <input type="hidden" name="docType" value=""/>
</form>
  
<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>	



<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0120.jsp
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
	<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0120.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/cookie.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:parameter id="intg_bl_seq" name="intg_bl_seq"/>
	<bean:parameter id="air_sea_tp" name="air_sea_tp"/>
	<bean:parameter id="ref_ofc_cd" name="ref_ofc_cd"/>
	
	<bean:parameter id="cust_trdp_cd" name="cust_trdp_cd"/>
	<bean:parameter id="cust_trdp_nm" name="cust_trdp_nm"/>
	<bean:parameter id="cust_trdp_addr" name="cust_trdp_addr"/>
<%
	String ofcLoclNm = userInfo.getOfc_locl_nm();
	String blTitle = air_sea_tp.equals("S") ? "HBL No." : "HAWB No.";
%>

	<script type="text/javascript">
		var usrNm = "<%= userInfo.getUser_name() %>";
		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var temp_chk_ans = "<bean:write name='air_sea_tp'/>";
		var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
		function setupPage()
	    {
	    	loadPage();
	    }
		
		$(document).ready(function() {
		
			//$(':radio[name="f_to_radio"]:checked').val();
			if(temp_chk_ans == "A"){
				$('#pod').attr('disabled',true);  //버튼 비활성화 
				$('#trdp_cd').attr('disabled',true);  //버튼 비활성화
				$('#trdp_nm').attr('disabled',true);  //버튼 비활성화
				$('#trdp_addr').attr('disabled',true);  //버튼 비활성화
				
				//크기조정.
				//window.resizeTo(450, 515);
			}else{				
				//$("input[name=testradio]").bind("click", fn_radioClicks)  //bind 로 click 함수 연결
				$('#f_to_radio5').hide();
				$('#f_to_radio6').hide();
				$('#pod').hide(); 
				$('#trdp_cd').hide();
				$('#trdp_nm').hide();
				$('#trdp_addr').hide();
			}
	          
	        $("input[name=f_to_radio]").click(function() {  //click 함수
	        	if($(this).val() == "brk"){
	        		$('#pod').attr('disabled',false);  //버튼 비활성화 
	    			$('#trdp_cd').attr('disabled',false);  //버튼 비활성화
	    			$('#trdp_nm').attr('disabled',false);  //버튼 비활성화
	    			$('#trdp_addr').attr('disabled',false);  //버튼 비활성화
	        	}else{
	        		$('#pod').attr('disabled',true);  //버튼 비활성화 
	    			$('#trdp_cd').attr('disabled',true);  //버튼 비활성화
	    			$('#trdp_nm').attr('disabled',true);  //버튼 비활성화
	    			$('#trdp_addr').attr('disabled',true);  //버튼 비활성화
	        	}
	        });
	    });
	
	</script>
	

<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
<style> body { border-top-width: 6px!important; } </style>
<form name="form" method="POST" action="./">
	<!-- Report Value -->
	<input	type="hidden" name="f_cmd" id="f_cmd"/> 
	<input	type="hidden" name="file_name" id="file_name"/> 
	<input	type="hidden" name="rd_param" id="rd_param"/> 
	<input	type="hidden" name="f_intg_bl_seq" id="f_intg_bl_seq" value="<bean:write name="intg_bl_seq"/>"/>
	<input	type="hidden" name="intg_bl_seq" id="intg_bl_seq" value="<bean:write name="intg_bl_seq"/>"/>
	<input	type="hidden" name="f_air_sea_tp" id="f_air_sea_tp" value="<bean:write name="air_sea_tp"/>"/>
	<input	type="hidden" name="f_ref_ofc_cd" id="f_ref_ofc_cd" value="<bean:write name="ref_ofc_cd"/>"/>
	<input	type="hidden" name="f_to_type" id="f_to_type"/>
	<input	type="hidden" name="cmd_type" id="cmd_type"/>
	<input	type="hidden" name="title" id="title"/>	
	<input	type="hidden" name="cust_trdp_cd" id="cust_trdp_cd" value="<bean:write name="cust_trdp_cd"/>"/>
	<input	type="hidden" name="cust_trdp_nm" id="cust_trdp_nm" value="<bean:write name="cust_trdp_nm"/>"/>
	<input	type="hidden" name="cust_trdp_addr" id="cust_trdp_addr" value="<bean:write name="cust_trdp_addr"/>"/>

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_tp"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	<input	type="hidden" name="mailTitle" id="mailTitle" value="<bean:write name="tmpMap" property="mailTitle"/>"/>
	<input	type="hidden" name="mailTo" id="mailTo" value="<bean:write name="tmpMap" property="mailTo"/>"/>
	<input type="hidden" id="prt_option" name="prt_option" value="opt_print"/>

	<div class="layer_popup_title">
		<!-- 소타이틀, 대버튼 -->
		 <div class="page_title_area clear">
		   <h2 class="page_title "><bean:message key="Shipping_Advice"/></h2>
			   <!-- btn_div -->
			   <div class="opus_design_btn">
				   <button type="button" class="btn_accent" id="btnPrint" onclick="doWork('Print');"><bean:message key="Print"/></button><!--
					--><button type="button" class="btn_accent" onclick="doWork('PREVIEW')" id="btnPreview"><bean:message key="Preview"/></button><!-- 
				    --><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			   </div>
			 	 <div class="location">	
				</div>
			   <!-- btn_div -->
		</div>
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
		<div class= "wrap_search">
	 		<div class= "opus_design_inquiry">
	 		<table>
	 			<colgroup>
	 				<col width="80px">
	 				<col width="*">
	 			</colgroup>
	 			<tbody>
	 				<tr>
	 						<th><%= blTitle %></th>
	 						<td>
				            	<bean:parameter name="bl_no" id="bl_no"/><!-- 
				             --><input name="f_bl_no" type="text" value='<bean:write name="bl_no"/>' class="search_form" readOnly>
				            </td> 
				          
	 					</tr>
	 					
	 			</tbody>
	 		</table>
	 		</div>
	 	</div>
		<div class= "wrap_search">
	 		<div class= "opus_design_inquiry" >
	 			<table>
	 				
	 					<colgroup>
	 						<col width="50px">
	 						<col width="*">
	 					</colgroup>
	 					<tbody>
		 					<tr>
				                <td><b><bean:message key="Company_Name_on_Report"></bean:message></b></td>
				                <td></td>
				            </tr>
				            <tr>
				            	<td colspan="2"><input name="f_ofc_locl_nm" type="text" value="<%= ofcLoclNm %>" class="search_form" style="width:180px;" maxlength="100" id="f_ofc_locl_nm" /> </td>
				            </tr>
				            <tr>
				                <td><b><bean:message key="To"></bean:message></b></td>
				                <td></td>
				            </tr>
			              	<tr>
				                <td colspan="2">
					                <table>
					                	<tr>
							                <td width="100px;">
								                <input type="radio" name="f_to_radio" id="f_to_radio1" value="agt" checked><!--
											--><label for="f_to_radio1"><bean:message key="Agent"/></label>
											</td>
							                <td>
											<input type="radio" name="f_to_radio" id="f_to_radio2" value="shp" /><!--
											--><label for="f_to_radio2"><bean:message key="Shipper"/></label>
											</td>
										
							            </tr>
							            <tr>  
							                <td>
								                 <input type="radio" name="f_to_radio" id="f_to_radio3" value="cne"  /><!--
												--><label for="f_to_radio3"><bean:message key="Consignee"/></label>
								             </td>
							                <td>
								                 <input type="radio" name="f_to_radio" id="f_to_radio4" value="ntf"  /><!--
												--><label for="f_to_radio4"><bean:message key="Notify"/></label>
								             </td>
							            </tr>
							          <div class="cBrokers" id="cBrokers">  
							            <tr>
							            	<td>
							            		<input type="radio" name="f_to_radio" id="f_to_radio5" value="brk"  /><!-- 
							            		--><label id="f_to_radio6" for="f_to_radio5"><bean:message key="C_Broker"/></label>
							            	</td>
							            	<td>	 
							            		<input type="text" id="trdp_cd" name="trdp_cd" value='<bean:write name="cust_trdp_cd"/>' class="search_form" style="width:60px;"  onKeyDown="getTrdpInfo(this, 'onKeyDown')" onBlur="getTrdpInfo(this, 'onBlur')"><!--
                        					 --><button type="button" class="input_seach_btn" tabindex="-1" id="pod" onclick="doWork('PARTNER_POPLIST', this)"></button><!--
                        					 --><input type="text" tabindex="-1" id="trdp_nm" name="trdp_nm" value='<bean:write name="cust_trdp_nm"/>' class="search_form-disable" style="width:154px;" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', this, form.trdp_nm.value);}" >                                			 	
                                    		</td>
                                    	</tr>
                                    	<tr>	
                                    		<td colspan="2">
                                    			<textarea id="trdp_addr" name="trdp_addr" class="search_form" style="width:350px;height:60px"><bean:write name="cust_trdp_nm"/></textarea>
                                    		</td>
                                    		
										</tr>
									  </div>	
					                </table>
								</td>
							
				            </tr>
				            <tr>
				                <td><b><bean:message key="Remark"></bean:message></b></td>
				                <td></td>
				            </tr>
				            <tr>
				            	<td>
				            	<textarea name="f_rmk" id="f_rmk" class="search_form" style="width:450px;height:180px; text-transform: none;"></textarea>
				                </td>
				            </tr>
			            
					</tbody>
	 			</table>
	 		</div>
	 	</div>
	 </div>
    <div style="float: right; margin-right:0; font-weight: bold;"><input type="checkbox" name="chk_auto_close" id="chk_auto_close" /><label><bean:message key="AUTO_CLOSE"/></label></div>
</div>
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script> 						

<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0020.jsp
*@FileTitle  : HGBL등록
*@Description: HBL 등록 및 조회
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
=========================================================
--%>
	<!-- grid  start -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td width="510" valign="top">
                <table width="100%" cellpadding="0" cellspacing="4" border="0">
                    <tr> <!-- Item  -->
                        <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td width="180">
                                        <table border="0" cellpadding="0" cellspacing="0" >
                                            <tr>
                                                <td class="sub_title" width="180"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Rate_Combination_Point"/></td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="10" align="right"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="5"></td>
                                    <td align="right">
                                        <table id="rcpBtnObj" border="0" cellpadding="0" cellspacing="0" align="right" style="display:none;cursor:hand">
                                            <tr>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                                <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name" onClick="javascript:gridAdd(1);"><bean:message key="New"/></td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table border="0" width="100%" id="mainTable" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <script language="javascript">comSheetObject('sheet2');</script>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
            <td width="10"></td>
            <td valign="top">
                <table width="100%" cellpadding="0" cellspacing="4">
                    <tr><!-- document list  -->
                        <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td width="150">
                                        <table border="0" cellpadding="0" cellspacing="0" >
                                            <tr>
                                                <td class="sub_title" width="150"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Document_List"/></td>
                                            </tr>
                                        </table>
                                    </td>                                   
                                    <td width="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                    <td align="right">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <table id="sndEmlObj" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('SNDEML')" style="display:none;margin-left:5px;cursor:hand">
                                                        <tr>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                                            <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Email"/></td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                                        </tr>
                                                    </table>        
                                                </td>
                                                <td width="3"></td>
                                                <td>
                                                    <table id="fileUpObj" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('DOCFILE')" style="display:none;margin-left:5px;cursor:hand">
                                                        <tr>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                                            <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Upload"/></td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                                        </tr>
                                                    </table>        
                                                </td>
                                            </tr>
                                        </table>
                                    </td>               
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table border="0" width="100%" id="mainTable" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <script language="javascript">comSheetObject('sheet3');</script>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
		<tr>
			<td height="10px" colspan="3"></td>
		</tr>
    </table>
    <table width="100%" border="0" bordercolor="blue" cellspacing="0" cellpadding="0">
        <tr>
            <td nowrap="nowrap" width="160">
            	<table border="0" cellpadding="0" cellspacing="0">
            		<tr>
            			<td nowrap="nowrap"  class="sub_title"  width="160">
            				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Dimension"/>
            			</td>
            		</tr>
            	</table>
            </td>
            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
            <td align="right">
               <table border="0" cellpadding="0" cellspacing="0">
                   <tr>
                        <td align="right">
                            <table id="dimAdd" onClick="javascript:gridAdd(3);" style="cursor:hand;display:none;" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name" ><bean:message key="New"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td height="5" colspan="3"></td>
        </tr>
        <tr>
            <td align="center" colspan="3">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td>
                            <table border="0" width="100%" id="mainTable">
                                <tr>
                                    <td>
                                      <script language="javascript">comSheetObject('sheet4');</script>
                                    </td>
                                 </tr>
                              </table>    
                          </td>                                   
                      </tr>
                  </table>
              </td>
          </tr>
    </table>
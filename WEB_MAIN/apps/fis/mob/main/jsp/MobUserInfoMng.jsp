<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>
<script type="text/javascript">
	$( document ).ready(function() {
		userInfoJS.selectCode();
	});
	
	function valiPwd(){
		var curr_pwd = $.trim($("#curr_pwd").val());
		var new_pwd1 = $.trim($("#new_pwd1").val());
		var new_pwd2 = $.trim($("#new_pwd2").val());
		
		if(curr_pwd == ""){
			wmsCommonJS.wmsMobAlert({content : getLabel('MOB_USR_CHECK_PWD')});
			return false;
		}
		if(new_pwd1 == ""){
			wmsCommonJS.wmsMobAlert({content : getLabel('MOB_USR_CHECK_NEW_PWD1')});
			return false;
		}
		if(new_pwd2 == ""){
			wmsCommonJS.wmsMobAlert({content : getLabel('MOB_USR_CHECK_NEW_PWD2')});
			return false;
		}
		if(new_pwd1 != new_pwd2){
			wmsCommonJS.wmsMobAlert({content : getLabel('MOB_USR_CHECK_NEW_PWD3')});
			return false;
		}
		
		return true;
	}
	
	var userInfoJS = {
		item : [],
		selectCode : function () {
			ajaxSendPost(userInfoJS.setCode, 'reqVal', '&goWhere=aj&bcKey=selectUserSettingCode', './GateServlet.gsl');
		},
		setCode : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					$.each(returnVal.codeB,function(index, value){
						var selectVal = "";
						if(returnVal.userInfo.def_wh_cd == value.code_cd){
							selectVal = "selected";
						}
						$("#wh_code").append("<option value='"+value.code_cd+"' "+selectVal+">"+value.code_nm+"</option>");
					});
					$.each(returnVal.codeA,function(index, value){
						var selectVal = "";
						if(returnVal.userInfo.use_lang_cd == value.code_cd){
							selectVal = "selected";
						}
						$("#lang_code").append("<option value='"+value.code_cd+"' "+selectVal+">"+value.code_nm+"</option>");
					});
				
					$("#sUsrNm").append(returnVal.userInfo.user_name);
					$("#sWhNm").append(returnVal.userInfo.def_wh_nm);
				}
			}
		},

		savePwdInfo : function(){
			
			//if(valiPwd()){
			//	$('#myModal').modal('hide');
			//}else{
			//}

			var curr_pwd = $.trim($("#curr_pwd").val());
			var new_pwd1 = $.trim($("#new_pwd1").val());
			var new_pwd2 = $.trim($("#new_pwd2").val());
			
			if(curr_pwd == ""){
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_USR_CHECK_PWD')});
				return false;
			}
			if(new_pwd1 == ""){
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_USR_CHECK_NEW_PWD1')});
				return false;
			}
			if(new_pwd2 == ""){
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_USR_CHECK_NEW_PWD2')});
				return false;
			}
			if(new_pwd1 != new_pwd2){
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_USR_CHECK_NEW_PWD3')});
				return false;
			}			
			
			if(confirm('Do you want to change?')){
				ajaxSendPost(userInfoJS.chkPassWord, 'reqVal', '&goWhere=aj&bcKey=changeMobPassWord&userPwd='+curr_pwd +'&newPwd='+new_pwd2, './GateServlet.gsl');
			}
		},
		chkPassWord : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_USR_PWD_CNG_SCS')});
					$('#myModal').modal('hide');
				}else if(returnVal.resultCode == "fail_password"){
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_USR_PWD_CNG_FAIL')});
				}else if(returnVal.resultCode == "wrong_password"){
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_USR_PWD_DIFF')});
				}else if(returnVal.resultCode == "wrong_user"){
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_USR_NO_USR')});
				}
			}
		} ,		
		complete : function(){
			ajaxSendPost(userInfoJS.completeEnd, 'reqVal', '&goWhere=aj&bcKey=changeMobUserInfo&dflt_wh_cd='+$("#wh_code").val()+'&use_lang_cd='+$("#lang_code").val(), './GateServlet.gsl');
		},
		completeEnd : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_CMPL_MSG')});
					
				}else{
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_FAIL_MSG')});
				}
			}
		}
		

	}
</script>	



<div class="panel panel-default">
	<div class="panel-body title-align-center">
		<span id="sUsrNm"></span> / <span id="sWhNm"></span>
	</div>
</div>
	<form class="form-horizontal">
		<div class="well">
			<div class="row form-group form-margin-bottom">
				<label for="orderLineId" class="form-title">Warehouse</label>
				<div class="col-xs-7 form-padding-0">
					<select class="form-control" id="wh_code">
					<option value='' ></option>
					</select>
				</div>
			</div>
			<div class="form-group form-margin-bottom">
				<label for="orderLineId" class="form-title">Language</label>
				<div class="col-xs-7 form-padding-0">
					<select class="form-control" id="lang_code">
					<option value='' ></option>
					</select>
				</div>
			</div>
		</div>
		<div class="btn-group btn-group-justified" role="group" aria-label="...">
			<div class="btn-group" role="group">
			  	<button type="button" class="btn btn-info footer-button" data-dismiss="modal" data-toggle="modal" data-target="#myModal">Change Password</button>
			</div>
		</div>
		<div class="navbar-fixed-bottom btn-group-justified" role="group">
			<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
			<button type="button" class="btn btn-primary">Save</button>
		</div>

	</form>
<div class="navbar-fixed-bottom">
	<div class="btn-group btn-group-justified" role="group" aria-label="...">
		<div class="btn-group" role="group">
			<button id="btComplete" type="button" class="btn btn-primary footer-button" onClick="javascript:userInfoJS.complete();">Save</button>
		</div>
	</div>
</div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Change Password</h4>
			</div>
			<div class="modal-body">
			
				<form class="form-horizontal">
					<div class="well">
						<div class="row form-group has-error form-margin-bottom">
							<div class="col-xs-12 form-padding-0">
								<input type="password" id="curr_pwd" class="form-control" placeholder="Current Password">
							</div>
						</div>
						<div class="row form-group has-error form-margin-bottom">
							<div class="col-xs-12 form-padding-0">
								<input type="password" id="new_pwd1" class="form-control" placeholder="New Password">
							</div>
						</div>
						<div class="row form-group has-error form-margin-bottom">
							<div class="col-xs-12 form-padding-0">
								<input type="password" id="new_pwd2" class="form-control" placeholder="Confirm New Password">
							</div>
						</div>
					</div>
					
				</form>
			
			</div>
			<div class="modal-footer">
				<div class="btn-group btn-group-justified" role="group" aria-label="...">
					<div class="btn-group" role="group">
					  	<button type="button" style="width:50%" class="btn btn-default" data-dismiss="modal">Cancel</button>
						<button type="button" style="width:50%" class="btn btn-primary" onClick="javascript:userInfoJS.savePwdInfo();">Save</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
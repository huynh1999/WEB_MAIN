<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>
<%
String plan_no   = request.getParameter("plan_no");

//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
String lotAlias = request.getParameter("lotAlias");
String lot4_alias = lotAlias.substring(0, lotAlias.indexOf("|"));
String lot5_alias = lotAlias.substring(lotAlias.indexOf("|")+1);
%>
<script type="text/javascript">
	$( document ).ready(function() {
		invtMoveItemListJS.selectInCompleteList();
		
		$('#myModal').on('show.bs.modal', function (e) {
			invtMoveItemListJS.reSetItemPop();
			invtMoveItemListJS.openItemPop();
		});		
	});
	
	$(window).on('load', function(){
		$('#p_move_date').datetimepicker({
			format: 'mm-dd-yyyy',
		    todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 2,
			forceParse: 0
		});
		
	});
	
	var invtMoveItemListJS = {
		plan_no   : ('<%=plan_no%>' == 'null') ? '' : '<%=plan_no%>',
		lot4_alias : ('<%=lot4_alias%>' == 'null') ? '' : '<%=lot4_alias%>',	//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
		lot5_alias : ('<%=lot5_alias%>' == 'null') ? '' : '<%=lot5_alias%>',	//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
		item : [],
		itemIdx : 0,
		selectInCompleteList : function(){
			var sendData = JSON.stringify({
				"plan_no":invtMoveItemListJS.plan_no
			});
			ajaxSendPost(invtMoveItemListJS.setInvMoveItemList, 'reqVal', '&goWhere=aj&bcKey=selectInvMoveItemList&data='+sendData, './GateServlet.gsl');
		},
        trim: function(val) {
            val = val.replace(/^\s+/g, '').replace(/\s+$/g, '');
            return val;
        },		
		//tempTr : $("<tr onClick=\"javascript:invtMoveItemListJS.setIdx({});\"></tr>"), 
		tempTr : $("<tr></tr>"),
		tempTd_1 : $("<td style=\"text-align: center;\" scope=\"row\"><input type=\"checkbox\" name=\"itemCheck\"  disabled ></td>"), 
		tempTd_2 : $("<td style=\"text-align: center;\"></td>"), 
		tempTd_3 : $("<td style=\"text-align: center;\"></td>"),
		tempTd_4 : $("<td style=\"text-align: right;\"></td>"),
		tempTd_5 : $("<td style=\"text-align: center;display:none;\"></td>"),
		tempTd_6 : $("<td style=\"text-align: center;display:none;\"></td>"),
		tempTd_7 : $("<td style=\"text-align: center;display:none;\"></td>"),
		tempTd_8 : $("<td style=\"text-align: center;display:none;\"></td>"),

		
		setInvMoveItemList : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal);
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					// 검색 결과가 하나 인 경우 상세 페이지로 이동
					if(returnVal.moveItemCmpls.length < 0){
						//$(location).attr('href', 'MobWHInDtl.clt?wibBkNo='+returnVal.moveCmpls[0].ctrtNo);
					// 검색 결과가 없는 경우 얼럿 메시지 
					}else if (returnVal.moveItemCmpls.length == 0){
						wmsCommonJS.wmsMobAlert({content : getLabel('MOB_SRCH_RESULT_MSG1'), page : "back"});
					// 검색 결과가 하나 이상 인 경우.
					}else{
						$(".content").html("");
						var content = "";
						$.each(returnVal.moveItemCmpls,function(index, value){
							var trTag = invtMoveItemListJS.tempTr.clone();
							var td1Tag = $("<td style=\"text-align: center;\" scope=\"row\"><input type=\"checkbox\" name=\"itemCheck\" value='"+index + "' disabled ></td>");
							var td2Tag = invtMoveItemListJS.tempTd_2.clone();
							var td3Tag = invtMoveItemListJS.tempTd_3.clone();
							var td4Tag = $("<td style=\"text-align: right;\" id=\"td"+index+"\"></td>");
							var td5Tag = invtMoveItemListJS.tempTd_5.clone();
							var td6Tag = invtMoveItemListJS.tempTd_6.clone();
							var td7Tag = invtMoveItemListJS.tempTd_7.clone();
							var td8Tag = invtMoveItemListJS.tempTd_8.clone();

							
							td3Tag[0].setAttribute('data-toggle', 'modal');
							td3Tag[0].setAttribute('data-target', '#myModal')
							td3Tag[0].setAttribute('style', 'color: #337ab7; text-decoration: underline')
							td3Tag[0].setAttribute('onClick', 'javascript:invtMoveItemListJS.setIdx(\"'+index+'\",\"'+value.plan_no+'\",\"'+value.plan_seq+'\" );');
							
							td2Tag.append(value.fr_wh_loc_cd_nm);
							td3Tag.append(value.item_nm);
							//td4Tag.append($.commaSet(value.pl_fr_ea_qty));
							td4Tag.append($("<div style=\"text-align: right;\" id=\"div"+index+"\">"+$.commaSet(value.pl_fr_ea_qty)+"</div>"));

							
							trTag.append(td1Tag);
							trTag.append(td2Tag);
							trTag.append(td3Tag);
							trTag.append(td4Tag);
							trTag.append(td5Tag);
							trTag.append(td6Tag);
							trTag.append(td7Tag);
							trTag.append(td8Tag);
							
							$(".content").append(trTag[0].outerHTML);
							invtMoveItemListJS.item.push(value);
						});
					}
				}
			}
		},
		setIdx : function(idx,plan_no,plan_seq){
			if(idx){
				invtMoveItemListJS.itemIdx = idx;
			}else{
				invtMoveItemListJS.itemIdx = "";
			}
			//alert(idx+ '  /  ' + plan_no+ '  /  ' + plan_seq);
		},
		openItemPop : function(){
			$(".itemContract")[0].innerHTML = invtMoveItemListJS.item[invtMoveItemListJS.itemIdx].ctrt_no;
			$(".itemSku")[0].innerHTML = invtMoveItemListJS.item[invtMoveItemListJS.itemIdx].item_cd;
			$(".itemDesc")[0].innerHTML = invtMoveItemListJS.item[invtMoveItemListJS.itemIdx].item_nm;
			$(".itemDesc")[0].innerHTML = invtMoveItemListJS.item[invtMoveItemListJS.itemIdx].item_nm;
			$(".itemLotNo")[0].innerHTML = invtMoveItemListJS.item[invtMoveItemListJS.itemIdx].lot_no;
			$(".itemLot4")[0].innerHTML = invtMoveItemListJS.item[invtMoveItemListJS.itemIdx].lot_4;
			$(".itemLot5")[0].innerHTML = invtMoveItemListJS.item[invtMoveItemListJS.itemIdx].lot_5;
			$(".itemLP")[0].innerHTML = invtMoveItemListJS.item[invtMoveItemListJS.itemIdx].lic_plat_no;
			$(".itemLFromLoc")[0].innerHTML = invtMoveItemListJS.item[invtMoveItemListJS.itemIdx].fr_wh_loc_cd_nm;
			$(".itemMovableQty")[0].innerHTML = $.commaSet(invtMoveItemListJS.item[invtMoveItemListJS.itemIdx].pl_fr_ea_qty);
			//$("#p_move_date").val(new Date().format("MM-dd-yyyy"));
			$("#p_pl_to_wh_loc_cd").val(invtMoveItemListJS.item[invtMoveItemListJS.itemIdx].pl_to_wh_loc_cd);
			$("#p_pl_to_wh_loc_nm").val(invtMoveItemListJS.item[invtMoveItemListJS.itemIdx].pl_to_wh_loc_nm);
			$("#p_pl_to_wh_loc_prop_cd").val(invtMoveItemListJS.item[invtMoveItemListJS.itemIdx].pl_to_wh_loc_prop_cd);
			//$("#p_lic_plat_no").val(invtMoveItemListJS.item[invtMoveItemListJS.itemIdx].lic_plat_no);
			$("#p_pl_to_ea_qty").val($.commaSet(invtMoveItemListJS.item[invtMoveItemListJS.itemIdx].pl_to_ea_qty));
			$("#p_item_index").val(invtMoveItemListJS.itemIdx);
			
			if($("input[name=itemCheck][value=" + invtMoveItemListJS.itemIdx + "]").is(":checked")){
				$("#p_move_date").val(invtMoveItemListJS.item[invtMoveItemListJS.itemIdx].p_move_date);
			}
			
			if(invtMoveItemListJS.item[invtMoveItemListJS.itemIdx].edit_yn=="N"){
				jQuery('#edit_n').show();  
				jQuery('#edit_y').hide();  
			}else{
				jQuery('#edit_y').show();  
				jQuery('#edit_n').hide();  				
			}
		},
		reSetItemPop : function(){
			$(".itemContract")[0].innerHTML = "";
			$(".itemSku")[0].innerHTML = "";
			$(".itemDesc")[0].innerHTML = "";
			$(".itemDesc")[0].innerHTML = "";
			$(".itemLotNo")[0].innerHTML = "";
			$(".itemLot4")[0].innerHTML = "";
			$(".itemLot5")[0].innerHTML = "";
			$(".itemLP")[0].innerHTML = "";
			$(".itemLFromLoc")[0].innerHTML = "";
			$(".itemMovableQty")[0].innerHTML = "";
			//$("#p_move_date").val(new Date().format("MM-dd-yyyy"));
			$('#p_move_date').datetimepicker('update', new Date());
			$("#p_pl_to_wh_loc_cd").val("");
			$("#p_pl_to_wh_loc_nm").val("");
			$("#p_pl_to_wh_loc_prop_cd").val("");
			//$("#p_lic_plat_no").val("");
			$("#p_pl_to_ea_qty").val("");
			$("#p_item_index").val("");			
		},
		setItemInfo : function(){
			var p_move_date            = $("#p_move_date").val();
			var p_pl_to_wh_loc_cd      = $("#p_pl_to_wh_loc_cd").val();
			var p_pl_to_wh_loc_nm      = $("#p_pl_to_wh_loc_nm").val();
			var p_pl_to_wh_loc_prop_cd = $("#p_pl_to_wh_loc_prop_cd").val();	
			//var p_lic_plat_no     = $("#p_lic_plat_no").val();
			var p_pl_to_ea_qty    = wmsCommonJS.removeComma($("#p_pl_to_ea_qty").val());
			var p_item_index      = $("#p_item_index").val();
			
			if (p_move_date == null || this.trim(p_move_date) == "") {
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_INVT_DATA_MOVE_DATE_MSG')});
				return;
			}
			if (p_pl_to_wh_loc_nm == null || this.trim(p_pl_to_wh_loc_nm) == "") {
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_LOC_MSG')});
				return;				
			}
			if (p_pl_to_wh_loc_cd == null || this.trim(p_pl_to_wh_loc_cd) == "") {
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_LOC_MSG')});
				return;				
			}
			if (p_pl_to_wh_loc_prop_cd == null || this.trim(p_pl_to_wh_loc_prop_cd) == "") {
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_LOC_MSG')});
				return;				
			}
			/*
			if (p_lic_plat_no == null || this.trim(p_lic_plat_no) == "") {
				alert("LP# is required value");
				return;				
			}
			*/
			if (p_pl_to_ea_qty == null || this.trim(p_pl_to_ea_qty) == "") {
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_INVT_DATA_MOVE_QTY_MSG')});
				return;				
			}
			if (p_item_index == null || this.trim(p_item_index) == "") {
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_INVT_DATA_MOVE_REQ_MSG')});
				return;				
			}
			
			invtMoveItemListJS.item[p_item_index].p_move_date = p_move_date;
			invtMoveItemListJS.item[p_item_index].pl_to_wh_loc_cd = p_pl_to_wh_loc_cd;
			invtMoveItemListJS.item[p_item_index].pl_to_wh_loc_prop_cd = p_pl_to_wh_loc_prop_cd;
			//invtMoveItemListJS.item[p_item_index].lic_plat_no = p_lic_plat_no;
			invtMoveItemListJS.item[p_item_index].pl_to_ea_qty = p_pl_to_ea_qty;
			
			setQtyValue(p_item_index , p_pl_to_ea_qty);
			
			
			$("input[name=itemCheck][value=" + p_item_index + "]").attr("checked", true);
			$('#div'+p_item_index).remove();
			$('#td'+p_item_index).append($("<div style=\"text-align: right;\" id=\"div"+p_item_index+"\">"+$.commaSet(eval(p_pl_to_ea_qty))+"</div>"));
			$('#myModal').modal('hide');
			//$('#td'+p_item_index).innerHTML = 55;
		},
		loctionFlag : true,
		getLocation :function(){
			ajaxSendPost(invtMoveItemListJS.setLocation, 'reqVal', '&goWhere=aj&bcKey=selectGetLocation&wh_loc_nm='+$("#p_pl_to_wh_loc_nm").val(), './GateServlet.gsl');			
		},
		setLocation : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode != "success"){
					
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_LOC_MSG'), focus: $('#toLocation')});
					invtMoveItemListJS.loctionFlag = false;
					return;
				}else{
					invtMoveItemListJS.loctionFlag = true;
				}
			}
		},
		goComplete : function(){
			
			/*
			var totCnt = $('input:checkbox[name="itemCheck"]').length;
			var chkCnt = $('input:checkbox[name="itemCheck"]:checked').length;

			if(totCnt > 0 & totCnt != chkCnt){
				alert("Can not request.");
				return;
			}
			*/
			
			var dateFlug  = true;
			var checkFlug = true;
			var edit_yn_no_n_cnt=0;
			
			
			var fr_curr_cnt=0;
			var to_curr_cnt=0;
			//★
			var fr_curr_cbm=0;
			var fr_curr_cbf=0;
			var fr_curr_grs_kgs=0;
			var fr_curr_grs_lbs=0;
			var fr_curr_net_kgs=0;
			var fr_curr_net_lbs=0;
			var to_curr_cbm=0;
			var to_curr_cbf=0;
			var to_curr_grs_kgs=0;
			var to_curr_grs_lbs=0;
			var to_curr_net_kgs=0;
			var to_curr_net_lbs=0;
			//★
			var wh_loc_cd_arr=new Array();
			var move_date_arr=new Array();
			var stock_curr_cnt=0;
			//★
			var stock_curr_cbm=0;
			var stock_curr_cbf=0;
			var stock_curr_grs_kgs=0;
			var stock_curr_grs_lbs=0;
			var stock_curr_net_kgs=0;
			var stock_curr_net_lbs=0;
			//★			
			
			$.each(invtMoveItemListJS.item,function(index, value){

				if(invtMoveItemListJS.item[index].edit_yn != "N" ){
					
					
					//체크 확인
					var isChecked =  $("input[name=itemCheck][value=" + index + "]").is(":checked");
					if(!isChecked){
						wmsCommonJS.wmsMobAlert({content : getLabel('MOB_IB_DTL_DATA_CHECK_SKU_MSG')});
						checkFlug = false;
						return false; //break
					}
					
					
					var to_wh_loc_cd=invtMoveItemListJS.item[index].pl_to_wh_loc_cd.trim();
					var fr_wh_loc_cd=invtMoveItemListJS.item[index].pl_fr_wh_loc_cd.trim();
					var to_eq_qty=eval(invtMoveItemListJS.item[index].pl_to_ea_qty);
					
					
					edit_yn_no_n_cnt ++;
								//★
					var to_cbm=eval(invtMoveItemListJS.item[index].to_cbm);
					var to_cbf=eval(invtMoveItemListJS.item[index].to_cbf);
					var to_grs_kgs=eval(invtMoveItemListJS.item[index].to_grs_kgs);
					var to_grs_lbs=eval(invtMoveItemListJS.item[index].to_grs_lbs);
					var to_net_kgs=eval(invtMoveItemListJS.item[index].to_net_kgs);
					var to_net_lbs=eval(invtMoveItemListJS.item[index].to_net_lbs);
								//★
					
					
					//---1. to loc cd 체크
					if(to_wh_loc_cd == "")
					{
						wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_LOC_MSG')});
						checkFlug = false;
						return false; //break
					}
					//-----2. to loc qty 0보다 커야한다.
					if( to_eq_qty <= 0)
					{
						//ComShowCodeMessage("COM0114","To Location Qty");
						wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_LOC_MSG')});
						checkFlug = false;
						return false; //break
					}		
					
					//-----3. to location정보와 current location정보는 달라야한다.
					if(to_wh_loc_cd == fr_wh_loc_cd)
					{
						//ComShowCodeMessage("COM0345");
						wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_DATA_CHECK_LOC_MSG')});
						checkFlug = false;
						return false; //break
					}		
					
					//-----4. 동일loc여부체크
					for(var k=0; k<wh_loc_cd_arr.length; k++)
					{
						if(wh_loc_cd_arr[k] == to_wh_loc_cd)
						{
							//ComShowCodeMessage("COM0354", sheetObj.GetCellValue(i, fix_grid01 + "to_wh_loc_cd_nm").trim());
							//sheetObj.SelectCell(i, fix_grid01 +  "to_wh_loc_cd_nm");
							wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_DATA_CHECK_LOC_MSG2')});
							checkFlug = false;
							return false; //break
						}
					}
					if(to_wh_loc_cd != "")
					{
						wh_loc_cd_arr.push(to_wh_loc_cd);	
					}					
					
					
					
					//-----5. to location의 qty의 합이 fr location qty보다 작은지 체크.
					to_curr_cnt=to_curr_cnt + to_eq_qty;
					//★
					to_curr_cbm=to_curr_cbm + to_cbm;
					to_curr_cbf=to_curr_cbf + to_cbf;
					to_curr_grs_kgs=to_curr_grs_kgs + to_grs_kgs;
					to_curr_grs_lbs=to_curr_grs_lbs + to_grs_lbs;
					to_curr_net_kgs=to_curr_net_kgs + to_net_kgs;
					to_curr_net_lbs=to_curr_net_lbs + to_net_lbs;
					//★			
					var div="";
					if(index + 1 > invtMoveItemListJS.item.length-1) //마지막
					{
						fr_curr_cnt=eval(invtMoveItemListJS.item[index].fr_ea_qty);
						//★
						fr_curr_cbm=eval(invtMoveItemListJS.item[index].fr_cbm);
						fr_curr_cbf=eval(invtMoveItemListJS.item[index].fr_cbf);
						fr_curr_grs_kgs=eval(invtMoveItemListJS.item[index].fr_grs_kgs);
						fr_curr_grs_lbs=eval(invtMoveItemListJS.item[index].fr_grs_lbs);
						fr_curr_net_kgs=eval(invtMoveItemListJS.item[index].fr_net_kgs);
						fr_curr_net_lbs=eval(invtMoveItemListJS.item[index].fr_net_lbs);
										//★
						stock_curr_cnt=eval(invtMoveItemListJS.item[index].stock_qty);
										//★
						stock_curr_cbm=eval(invtMoveItemListJS.item[index].stock_cbm);
						stock_curr_cbf=eval(invtMoveItemListJS.item[index].stock_cbf);
						stock_curr_grs_kgs=eval(invtMoveItemListJS.item[index].stock_grs_kgs);
						stock_curr_grs_lbs=eval(invtMoveItemListJS.item[index].stock_grs_lbs);
						stock_curr_net_kgs=eval(invtMoveItemListJS.item[index].stock_net_kgs);
						stock_curr_net_lbs=eval(invtMoveItemListJS.item[index].stock_net_lbs);
						//★
						div="E";						
					}
					else
					{
						if(invtMoveItemListJS.item[index].merge_key.trim() != invtMoveItemListJS.item[index+1].merge_key.trim())
						{
							fr_curr_cnt=eval(invtMoveItemListJS.item[index].fr_ea_qty);
												//★
							fr_curr_cbm=eval(invtMoveItemListJS.item[index].fr_cbm);
							fr_curr_cbf=eval(invtMoveItemListJS.item[index].fr_cbf);
							fr_curr_grs_kgs=eval(invtMoveItemListJS.item[index].fr_grs_kgs);
							fr_curr_grs_lbs=eval(invtMoveItemListJS.item[index].fr_grs_lbs);
							fr_curr_net_kgs=eval(invtMoveItemListJS.item[index].fr_net_kgs);
							fr_curr_net_lbs=eval(invtMoveItemListJS.item[index].fr_net_lbs);
												//★
							stock_curr_cnt=eval(invtMoveItemListJS.item[index].stock_qty);
												//★
							stock_curr_cbm=eval(invtMoveItemListJS.item[index].stock_cbm);
							stock_curr_cbf=eval(invtMoveItemListJS.item[index].stock_cbf);
							stock_curr_grs_kgs=eval(invtMoveItemListJS.item[index].stock_grs_kgs);
							stock_curr_grs_lbs=eval(invtMoveItemListJS.item[index].stock_grs_lbs);
							stock_curr_net_kgs=eval(invtMoveItemListJS.item[index].stock_net_kgs);
							stock_curr_net_lbs=eval(invtMoveItemListJS.item[index].stock_net_lbs);
							//★
							div="E";
						}
					}	
					
					if(div == "E")
					{
						//--수량체크
						if(fr_curr_cnt > stock_curr_cnt)
						{
							if(stock_curr_cnt < to_curr_cnt) //PLAN된건의 재고가 변경되었습니다. 현재고를 초과할수없습니다.
							{
								//ComShowCodeMessage("COM0349", stock_curr_cnt, to_curr_cnt);
								//sheetObj.SelectCell(i, fix_grid01 +  "to_ea_qty");
								var values = [];
								values.push(stock_curr_cnt);
								values.push(to_ea_qty);
								wmsCommonJS.wmsMobAlert({content : wmsCommonJS.messageReplace(getLabel('MOB_INVT_DATA_CHECK_STOCK_CNT_MSG'), values)});
							
								checkFlug = false;
								return false; //break
							}
						}
						else
						{
							if(fr_curr_cnt < to_curr_cnt)//재고조정시 To Location의 qty가 Current Location qty를 초과할수없습니다.
							{
								//ComShowCodeMessage("COM0348",fr_curr_cnt, to_curr_cnt);
								//sheetObj.SelectCell(i, fix_grid01 +  "to_ea_qty");
								checkFlug = false;
								var values = [];
								values.push(fr_curr_cnt);
								values.push(to_curr_cnt);
								wmsCommonJS.wmsMobAlert({content : wmsCommonJS.messageReplace(getLabel('MOB_INVT_DATA_CHECK_FR_CNT_MSG'), values)});

								return false; //break
							}
						}			
						//★
						//--measure정보 체크
						if(checkMeasureInfo( "CBM", index, "to_cbm", fr_curr_cbm, stock_curr_cbm, to_curr_cbm) == false)
						{
							checkFlug = false;
							return false; //break
						}
						if(checkMeasureInfo( "CBF", index, "to_cbf", fr_curr_cbf, stock_curr_cbf, to_curr_cbf) == false)
						{
							checkFlug = false;
							return false; //break
						}
						if(checkMeasureInfo( "G.KGS", index, "to_grs_kgs", fr_curr_grs_kgs, stock_curr_grs_kgs, to_curr_grs_kgs) == false)
						{
							checkFlug = false;
							return false; //break
						}
						if(checkMeasureInfo( "G.LBS", index, "to_grs_lbs", fr_curr_grs_lbs, stock_curr_grs_lbs, to_curr_grs_lbs) == false)
						{
							checkFlug = false;
							return false; //break
						}
						if(checkMeasureInfo( "N.KGS", index, "to_net_kgs", fr_curr_net_kgs, stock_curr_net_kgs, to_curr_net_kgs) == false)
						{
							checkFlug = false;
							return false; //break
						}
						if(checkMeasureInfo( "N.LGS", index, "to_net_lbs", fr_curr_net_lbs, stock_curr_net_lbs, to_curr_net_lbs) == false)
						{
							checkFlug = false;
							return false; //break
						}
						//--초기화
						to_curr_cnt=0; 
						//★
						to_curr_cbm=0;
						to_curr_cbf=0;
						to_curr_grs_kgs=0;
						to_curr_grs_lbs=0;
						to_curr_net_kgs=0;
						to_curr_net_lbs=0;
						//★
						wh_loc_cd_arr=new Array();
					}					
					
					//move date 는 같아야 한다.
					var date = invtMoveItemListJS.item[0].p_move_date;
					if( date != invtMoveItemListJS.item[index].p_move_date){
						dateFlug = false;
					}	
					
					//-----4. 동일move date 여부체크
					for(var k=0; k<move_date_arr.length; k++)
					{
						if(move_date_arr[k] != invtMoveItemListJS.item[index].p_move_date)
						{
							//ComShowCodeMessage("COM0354", sheetObj.GetCellValue(i, fix_grid01 + "to_wh_loc_cd_nm").trim());
							//sheetObj.SelectCell(i, fix_grid01 +  "to_wh_loc_cd_nm");
							wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_MOVE_DATE_MSG2')});
							checkFlug = false;
							return false; //break
						}
					}
					move_date_arr.push(invtMoveItemListJS.item[index].p_move_date);	

				}
			});
			
			if(checkFlug){
				//#1811 [WMS4.0]Item Code 특수문자 허용
				var sendData = encodeURIComponent(JSON.stringify(invtMoveItemListJS.item));
				ajaxSendPost(invtMoveItemListJS.setCompletInvMove, 'reqVal', '&goWhere=aj&bcKey=completInvMove&data='+sendData, './GateServlet.gsl');
			}
			
			
		},
		setCompletInvMove : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_CMPL_MSG')});
					$.historyBack();
					return;
				}
			}
			wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_FAIL_MSG')})
		},
		getLocation :function(){
			ajaxSendPost(invtMoveItemListJS.setLocation, 'reqVal', '&goWhere=aj&bcKey=selectGetLocation&wh_loc_nm='+$("#p_pl_to_wh_loc_nm").val(), './GateServlet.gsl');			
		},
		setLocation : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					$("#p_pl_to_wh_loc_cd").val(returnVal.wh_loc_cd);
					$("#p_pl_to_wh_loc_nm").val(returnVal.wh_loc_nm);
					$("#p_pl_to_wh_loc_prop_cd").val(returnVal.prop_cd);
					return;
				}
			}			
			$("#p_pl_to_wh_loc_cd").val("");
			$("#p_pl_to_wh_loc_nm").val("");
			$("#p_pl_to_wh_loc_prop_cd").val("");					
		} 
	}
	
	function checkMeasureInfo( div, row, col, fr_curr, stock_curr, to_curr)
	{
		if(parseFloat(fr_curr.toFixed(3)) > parseFloat(stock_curr.toFixed(3)))
		{
			if(parseFloat(stock_curr.toFixed(3)) < parseFloat(to_curr.toFixed(3))) 
			{
				//ComShowCodeMessage("COM0370", div, stock_curr.toFixed(3), to_curr.toFixed(3));
				wmsCommonJS.wmsMobAlert({content : "COM0370"});
				return false;
			}
		}
		else
		{
			if(parseFloat(fr_curr.toFixed(3)) < parseFloat(to_curr.toFixed(3)))
			{
				//ComShowCodeMessage("COM0369", div, fr_curr.toFixed(3), to_curr.toFixed(3));
				var values = [];
				values.push(div);
				values.push(fr_curr.toFixed(3));
				values.push(to_curr.toFixed(3));
				wmsCommonJS.wmsMobAlert({content : wmsCommonJS.messageReplace(getLabel('MOB_INVT_DATA_CHECK_FR_CNT_MSG'), values)});
				return false;
			}
		}
		return true;
	}	
	
	function setQtyValue(idx ,Value){
		
		
		var qty=Value;
		//음수체크
		if(Value < 0)
		{
			qty=Math.abs(Value);
			invtMoveItemListJS.item[idx].pl_to_ea_qty = qty;
		}
		//CBM, KGS, LBS 계산
		var pkg_lv1_qty=eval(invtMoveItemListJS.item[idx].pkg_lv1_qty);
		var lv1_cbm=eval(invtMoveItemListJS.item[idx].lv1_cbm);
		var lv1_cbf=eval(invtMoveItemListJS.item[idx].lv1_cbf);
		var lv1_grs_kgs=eval(invtMoveItemListJS.item[idx].lv1_grs_kgs);
		var lv1_grs_lbs=eval(invtMoveItemListJS.item[idx].lv1_grs_lbs);
		var lv1_net_kgs=eval(invtMoveItemListJS.item[idx].lv1_net_kgs);
		var lv1_net_lbs=eval(invtMoveItemListJS.item[idx].lv1_net_lbs);
		
		invtMoveItemListJS.item[idx].to_cbm = (pkg_lv1_qty * qty) * lv1_cbm;
		invtMoveItemListJS.item[idx].to_cbf = (pkg_lv1_qty * qty) * lv1_cbf;
		invtMoveItemListJS.item[idx].to_grs_kgs = (pkg_lv1_qty * qty) * lv1_grs_kgs;
		invtMoveItemListJS.item[idx].to_grs_lbs = (pkg_lv1_qty * qty) * lv1_grs_lbs;
		invtMoveItemListJS.item[idx].to_net_kgs = (pkg_lv1_qty * qty) * lv1_net_kgs;
		invtMoveItemListJS.item[idx].to_net_lbs = (pkg_lv1_qty * qty) * lv1_net_lbs;		
	}
</script>
	
<div class="well">
	<table class="table panel panel-default" border="1">
		<colgroup>
			<col width="20">
			<col width="100">
			<col width="150">
			<col width="0" >
			<col width="0" >
			<col width="0" >
			<col width="0" >
			<col width="*" >
		</colgroup>	
		<thead>
			<tr>
				<th style="text-align: center;"></th>
				<th style="text-align: center;">From Loc</th>
				<th style="text-align: center;">SKU</th>
				<th style="text-align: center;">QTY</th>
				<th style="text-align: right;display:none;"></th>
				<th style="text-align: right;display:none;"></th>
				<th style="text-align: right;display:none;"></th>
				<th style="text-align: right;display:none;"></th>
			</tr>
		</thead>
		<tbody class="content">

		</tbody>
	</table>
</div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Movement Detail</h4>
			</div>
			<div class="modal-body">
				<table class="table panel panel-default">
					<tbody>
						<tr>
							<td class="info width-120">Contract</td>
							<td class="itemContract"></td>
						</tr>
						<tr>
							<td class="info width-120">SKU</td>
							<td class="itemSku"></td>
						</tr>
						<tr>
							<td class="info width-120">Description</td>
							<td class="itemDesc"></td>
						</tr>
						<tr>
							<td class="info width-120">Item Lot</td>
							<td class="itemLotNo"></td>
						</tr>
						<tr>
							<td class="info width-120"><%=lot4_alias %></td>
							<td class="itemLot4"></td>
						</tr>
						<tr>
							<td class="info width-120"><%=lot5_alias %></td>
							<td class="itemLot5"></td>
						</tr>
						<tr>
							<td class="info width-120">LP#</td>
							<td class="itemLP"></td>
						</tr>
						<tr>
							<td class="info width-120">From Loc.</td>
							<td class="itemLFromLoc"> </td>
						</tr>
						<tr>
							<td class="info width-120">Movable Qty</td>
							<td class="itemMovableQty" style="text-align: right;"></td>
						</tr>
					</tbody>
				</table>

				<table class="table panel panel-default">
					<tbody>
						<tr>
							<td class="info width-120">Move. Date</td>
							<td>
								<div class="input-group">
							    <input id="p_move_date" type="text" style="width:100%" class="form-control col-xs-4" placeholder="Move. Date" aria-describedby="sizing-addon" readonly><span class="input-group-addon"><span class="glyphicon glyphicon-remove" onClick="javascript:wmsCommonJS.removeFormVal('p_move_date')"></span></span>
							    </div>
							</td>

						</tr>
						<tr>
							<td class="info width-120">To Loc.</td>
							<td>
								<div class="col-xs-12 form-padding-0">
									<input type="text" class="form-control" id="p_pl_to_wh_loc_nm" placeholder="To Loc." onChange="invtMoveItemListJS.getLocation();";>
									<input type="hidden" class="form-control" id="p_pl_to_wh_loc_cd">
									<input type="hidden" class="form-control" id="p_pl_to_wh_loc_prop_cd">
								</div>
							</td>
						</tr>
						<!-- tr>
							<td class="info width-120">LP#</td>
							<td>
								<div class="col-xs-12 form-padding-0">
									<input type="text" class="form-control" id="p_lic_plat_no" placeholder="LP#">
								</div>
							</td>
						</tr -->
						<tr>
							<td class="info width-120">Moved Qty</td>
							<td>
								<div class="col-xs-12 form-padding-0">
									<input type="number" class="form-control number-only" id="p_pl_to_ea_qty" placeholder="Moved Qty" numberOnly="true">
									<input type="hidden" class="form-control" id="p_item_index" placeholder="">
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="modal-footer">
				<div class="btn-group btn-group-justified" role="group" aria-label="..." id="edit_y">
					<div class="btn-group" role="group">
					  	<button type="button" style="width:50%" class="btn btn-default" data-dismiss="modal">Cancel</button>
						<button type="button" style="width:50%" class="btn btn-primary" onClick="javascript:invtMoveItemListJS.setItemInfo();">OK</button>
					</div>
				</div>
				<div class="btn-group btn-group-justified" role="group" aria-label="..." id="edit_n">
					<div class="btn-group" role="group">
					  	<button type="button" style="width:100%" class="btn btn-default" data-dismiss="modal">Cancel</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


<div class="navbar-fixed-bottom">
	<div class="btn-group btn-group-justified" role="group" aria-label="...">
	  <div class="btn-group" role="group">
	    <button type="button" class="btn btn-primary footer-button footer-button" onClick="javascript:invtMoveItemListJS.goComplete();">Complete</button>
	  </div>
	</div>
</div>
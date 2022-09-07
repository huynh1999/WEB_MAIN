/**
 * esl 공통 API
 * @namespace   comm
 * @memberof    esl
 */
var esl = esl || {};

var __authVal__ = {
		R : "N",
		I : "N",
		U : "N",
		D : "N",
		IUD : "N",
		ACT : "N"
};

var __replaceVal__ = "__NO_DEFAULT_"; // combo, chainCombo 에서 사용

var __internationalization__ = "internationalization_";
var __authValArr__ = [ "R", "I", "U", "D", "IUD", "ACT"];

var __eslGlobal__={
	popSearchYn : "search-yn",
	popSearchYnDefVal: "Y",
	excelExctVal : ["procFlag","DelCheck"],
	excelParamList : ["CheckBoxOnValue","CheckBoxOffValue","Merge","KeyFieldMark","DownCols"]
};


(function() {
    (function(esl) {
        esl["comm"] = (function() {
            var ec      = {},
            __dateArr__=["Ym","Ymd"],
            __numTypeArr__=["Float","Int"];

            return {
                init : function() {
                    ec = this;

                    // create module shotcut
                    if (typeof clt.util !== "undefined") {
                        cu = clt.util;
                    }
                    // create module shotcut
                    if (typeof clt.comm !== "undefined") {
                    	cc = clt.comm;
                    }

                    return this;
                },

                /**
                 * 값이 빈 문자열인것 체크
                 */
                isNull : function(val){
                    var ret = false;
                    if(val === '' || val === null || val === undefined)
                    {
                        ret = true;
                    }
                    return ret;
                },

                /**
                 * 값이 빈 문자열이거나 널일 경우 대체 문자 반환
                 */
                nvl : function(val, defaultVal)
                {
                    if(ec.isNull(val))
                    {
                        return ec.isNull(defaultVal)?'':defaultVal;
                    }
                    else
                    {
                        return val;
                    }
                },

                /**언어팩omm->json*/
            	langChgOmmToJson : function()
            	{
            		var defIncludeLang = __internationalization__;
            		var includeLangJson = defIncludeLang+ec.getGlobalParam("sesLang");
            		var includeLangUrl = "/eslwms/script/common/"+includeLangJson+".js";
            		var enIncludeLangUrl = "/eslwms/script/common/"+defIncludeLang+"en.js";

            		$("head").append('<script type="text/javascript" src="' + enIncludeLangUrl + '"></script>');
            		$("head").append('<script type="text/javascript" src="' + includeLangUrl + '"></script>');
            		__LANG_PACK__ =	window[includeLangJson];
            		__EN_LANG_PACK__ =	window[defIncludeLang+"en"];
            	},

            	/**시스템공통코드 omm->json*/
            	confChgOmmToJson : function(arrays){
            		var arrayInt = arrays.length;
            		if(arrayInt > 0)
            		{
            			for(var i = 0; i < arrays.length; i++)
            			{
            				__SYS_CFG__[arrays[i].cfgCd] = arrays[i].actVal;
            			}
            		}
            	},

            	/**언어팩가져옴*/
            	getLangMsg : function(code){
            		var rtnVal = code,
                        tops = top || window,
                		defIncludeLang = __internationalization__,
                		includeLangJson = defIncludeLang+ec.getGlobalParam("sesLang"),
                		includeLangEnJson = defIncludeLang+"en";

            		if((tops.__LANG_PACK__) && code)
            		{
//            			var langpack = tops.__LANG_PACK__;
//            			var enLangpack = tops.__EN_LANG_PACK__;
            			var langpack = tops[includeLangJson];
            			var enLangpack = tops[includeLangEnJson];
            			rtnVal = ec.nvl(ec.nvl(langpack[code],enLangpack[code]),code) === undefined ? code : ec.nvl(ec.nvl(langpack[code],enLangpack[code]),code);
            			rtnVal = rtnVal.replace(/<br>|<\br>/gi,"\n");
            		}
            		return rtnVal;
            	},

            	/**배열언어팩*/
            	getRepLangMsg : function( msg, args )
                {
                    if(clt.util.isArray(args))
                    {
                        for(var n=0; n<args.length; n++)
                        {
                            msg = ec.getLangMsg(msg).replace('{'+n+'}', args[n]);
                        }
                        return msg;
                    }
                    else
                    {
                        return ec.getLangMsg(msg).replace('{0}', args);
                    }
                },

                /**Form Disabled 하기 위함*/
                setFormDisable : function( sheet, form, arr, OldRow, NewRow, allId)
                {
                	var oldProcFlag = ec.isNull(sheet.GetRowData(OldRow).procFlag) ? "R" : sheet.GetRowData(OldRow).procFlag;
                	var newProcFlag = ec.isNull(sheet.GetRowData(NewRow).procFlag) ? "R" : sheet.GetRowData(NewRow).procFlag;
                	if(oldProcFlag === "I" || oldProcFlag === "U")
                	{
                		cc.setFormToGrid(sheet, OldRow, form);
                	}

                	if(newProcFlag !== "I")
                	{
                		ec.disabledSlice(allId, arr);
                	}
                	else
                	{
                		ec.disabledAct(false, arr);
                	}
                },


            	/**시스템코드가져옴*/
            	getSysConfig : function(code){
            		var rtnVal = code,
                    tops = top || window;

            		if((tops.__SYS_CFG__) && code)
            		{
            			var configpack = tops.__SYS_CFG__;
            			rtnVal = clt.util.nvl(configpack[code],code) === undefined ? code : clt.util.nvl(configpack[code],code);
            		}
            		return rtnVal;
            	},

            	/**html 언어교환*/
            	htmlRename : function(){
            		var items = [],
                        tops = top || window,
            		    rename = tops.__htmlsRename__;

            	   	items = document.querySelectorAll('['+rename+']');
            	   	if (items.length == 0) return;
            	   	var id;
            	   	var type;
            	   	for(var i=0; i < items.length; i++)
            	   	{
            	   		id = items[i].id;
            	   		type = $("#"+id).attr("type");
            	   		if(type == "button")
            	   		{
            	   			$("#"+id).attr("value",ec.getLangMsg($("#"+id).attr(rename)));
            	   			$("#"+id).text(ec.getLangMsg($("#"+id).attr(rename)));
            	   			$("#"+id + "> span").text(ec.getLangMsg($("#"+id).attr(rename)));
            	   		} else {
            	   			$("#"+id).text(ec.getLangMsg($("#"+id).attr(rename)));
            	   		}
            	   	}
            	},

            	/**그리드 언어 교환*/
            	gridRename : function(opt,auth)
            	{
            		var headerVal;
            	    var arr = [];
            	    var typeVal = "";
            	    var authArrs = ec.nvl(opt.__authVal__, __authVal__);

            	    var i = 0,
            	    	len = 0,
            	    	cols = opt.init.Cols,
            	    	col = "";

            	    for(i = 0, len = cols.length; i < len; i++)
            	    {
            	    	col = cols[i];

            	    	headerVal = col.Header;
            	    	orgFormatVal = ec.nvl(col.Format, "");
            	    	typeVal = ec.subStr(orgFormatVal,0,3);

            	    	if(ec.arrayParamCheck(__dateArr__, typeVal))
            	    	{
            	    		col.Format = ec.setGridDateFormat(orgFormatVal);
            	    	}

            	    	if(ec.isNull(orgFormatVal) && ec.arrayParamCheck(__numTypeArr__, col["Type"]))
            	    	{
            	    		col.Format = ec.setGridNumberFormat(col["Type"]);
            	    	}

            	    	if(ec.isNull(auth) || auth == "Y")
            	    	{
	            	    	if(authArrs["D"] == "N"
	            	    		&& col["Type"] == "DelCheck")
	            	    	{
	            	    		col.Hidden = 1;
	            	    	}

	            	    	if(authArrs["U"] == "N"
	            	    		&& col["SaveName"] != "selectChk"
	            	    		&& col["Type"] != "DelCheck"
	            	    		&& col["Type"] != "Status")
	            	    	{
	            	    		col.UpdateEdit = 0;
	            	    	}

	            	    	if(authArrs["I"] == "N"
	            	    		&& col["Type"] != "DelCheck"
	            	    		&& col["Type"] != "Status")
	            	    	{
	            	    		col.InsertEdit = 0;
	            	    	}
	            	    	if(col["Type"] == "Status")
	            	    	{
	            	    		var chkVal = "Y";
	            	    		$.each(__authValArr__, function(val,val2)
	            	    		{
	            	    			if((val2 == "I" || val2 == "U" || val2 == "D" ) && authArrs[val2] != "N" && chkVal == "Y") chkVal = "N";
	            	    		});
	            	    		if(chkVal == "Y")
	            	    		{
	            	    			col.Hidden = 1;
	            	    		}
	            	    	}
            	    	}

            	    	arr = headerVal.split("|");
            	    	if(arr.length > 1)
            	    	{
            	    		col.Header = ec.separatorRename(headerVal);
            	    	}
            	    	else
            	    	{
            	    		col.Header = ec.getLangMsg(headerVal);
            	    	}
            	    }
            	},

            	/**그리드 언어 교환 권한없음*/
            	gridRenameNoAuth : function(opt)
            	{
            		ec.gridRename(opt,"N");
            	},
            	/**index from length*/
            	subStr : function(param,from,to){
            		return ec.isNull(param) ? param : ec.subStrAct(param,from,to);
            	},
            	/**index from to*/
            	subString : function(param,from,to){
            		return ec.isNull(param) ? param : ec.subStringAct(param,from,to);
            	},
            	/**substr rapping*/
            	subStrAct : function(param,from,to){
            		return param.substr(0,3);
            	},
            	/**substring rapping*/
            	subStringAct : function(param,from,to){
            		return param.substring(0,3);
            	},
            	/**
            	 * 그리드 format설정
            	 * row grid row
            	 */
            	setGridDateFormat : function(typeVal)
            	{
            		//if(formatVal);
            		var dtFormat = ec.nvl(ec.getSysConfig("DATE_FORMAT"),ec.getSysConfig("DF_YMD"));

            		var hms = typeVal.replace('Ymd','');

            		var hmVal = " HH:mm";
            		var sVal = ":ss";

            		if(hms === "Hms")
            		{
            			dtFormat += hmVal+sVal;
            		}
            		else if(hms === "Hm")
            		{
            			dtFormat += hmVal;
            		}
    	    		return dtFormat;
            	},
            	/**
            	 * 그리드 format설정
            	 * row grid row
            	 */
            	setGridNumberFormat : function(typeVal)
            	{
            		var numFormat="";
            		if("Int" == typeVal)
            		{
            			numFormat = ec.nvl(ec.getSysConfig("INT_FORMAT"),"#,##0");
            		}
            		else if("Float" == typeVal)
            		{
            			numFormat = ec.nvl(ec.getSysConfig("FLOAT_FORMAT"),"#,##0.00");
            		}
            		return numFormat;
            	},
            	/**전역변수(Json) Get*/
            	getGlobalParam : function(param)
            	{
            		tops = top || window;
            		var globalParams = tops.__GLOBAL_PARAM__;
            		return ec.isNull(param) ? params : globalParams[param];
            	},
            	/**전역변수(Json) Setting*/
            	setGlobalParam : function(param,vals)
            	{
            		tops = top || window;
            		tops.__GLOBAL_PARAM__[param] = vals;
            	},

               /**
            	 	SPLIT 언어팩 적용
               */
               separatorRename : function(val,sep)
               {
            	   var sepVal = sep === undefined ? "|" : sep;
            	   var conVal = "";
            	   var arr = val.split(sepVal);
	    	       if(arr.length > 1)
	    	       {
	    	    	   for(var j=0; j < arr.length; j++)
	    	    	   {
		    	    	   conVal += j > 0 ? sepVal : "";
		    	    	   conVal += ec.getLangMsg(arr[j]);
	    	    	   }
	    	       }
	    	       else
	    	       {
	    	    	   conVal = val;
	    	       }
	    	       return conVal;
               },
               /**Rd Report Popup*/
               reportPop : function(param){
            	var d= document
            		, root= d.documentElement
            		, body= d.body
            		, wid= window.innerWidth || root.clientWidth || body.clientWidth
            		, hi= window.innerHeight || root.clientHeight || body.clientHeight
            		, width = (wid * 0.6)
            		, height = (hi * 1.1);

          		 var popOpt = {
 		            	btnDisplay : ec.nvl(param.btnDisplay, true),
 		                modal: ec.nvl(param.modal, true),
 		                width: ec.nvl(param.width, width),
 			            height: ec.nvl(param.height, height),
 		                url : "/eslwms/template/rdViewer.html",
 		                title : ec.getLangMsg(ec.nvl(param.title, "REPORT")),
 		                cond: param.cond
 	               };

      		       $.extend(true, popOpt.cond, {
        	            "reportFile": param.reportFile
        	       });

          		 clt.comm.showPopup(popOpt);
               },

               /** Mobile Popup */
               mobilePop : function(param) {
            	var width  = 400
            	  , height = 610;

          		 var popOpt = {
 		            	btnDisplay : ec.nvl(param.btnDisplay, true),
 		                modal: ec.nvl(param.modal, true),
 		                width: ec.nvl(param.width, width),
 			            height: ec.nvl(param.height, height),
 		                url : '/eslwms/' + param.id + '.do',
 		                title : ec.getLangMsg(ec.nvl(param.title, "MOB")),
 		                cond: param.cond
 	               };

      		       $.extend(true, popOpt.cond, {
        	            menuNm : ec.getLangMsg(param.menuNm),
        	       });

          		 clt.comm.showPopup(popOpt);
               },

               /**
                * 메인그리드가 아닌 다른 그리드의 컬럼을 조회조건으로 사용시
                */
               getDsSetSubQuerySearchconditionValue : function( param, conds )
               {
            	   var vals = "";
            	   var cond = (typeof conds === "undefined" ? ec.getSearchData("VALUE") : conds);

            	   if(!param) return vals;
            	   if(!cond) return vals;
                   if(cond.dsSearchcondition)
                   {
                	   condList = cond.dsSearchcondition;
                	   if(condList.length > 0)
                	   {
                		   var dsRow;
                		   for(var i = 0; i < condList.length; i++)
                		   {
                			   dsRow = condList[i];
                			   if(dsRow.val0 == param)
                			   {
                				  vals = ec.getPcSubQuery(dsRow);
                            	  break;
                			   }
                		   }
                	   }
                   }
                   return vals;
               },
               /**Client 에서 Dynamic 쿼리 생성*/
               getPcSubQuery : function(condOmm)
               {
               	var returnStr = " AND ";
               	if ((condOmm.val2 === "LIKE") || (condOmm.val2 === "NOT LIKE"))
               	{
               		if (condOmm.val2 === "NOT LIKE") {
               			returnStr += "(";
               		}
               		returnStr += "UPPER("+condOmm.val0+")";
               		returnStr += " ";
               		returnStr += condOmm.val2;

               		var paramStr = condOmm.val3;
               		returnStr += " '%'||";
               		returnStr += "UPPER('"+clt.util.replaceAll(paramStr,"'", "''")+"')";
               		returnStr += "||'%' ";

               		if (condOmm.val2==="NOT LIKE") {
               			returnStr +=" or ";
               			returnStr += condOmm.val0;
               			returnStr += " is null";
               			returnStr += ")";
               		}

               	}
               	else if ((condOmm.val2==="LSAME") || (condOmm.val2==="RSAME"))
               	{
               		returnStr += "UPPER("+condOmm.val0+")";
               		returnStr += " ";
               		returnStr += "LIKE";
               		returnStr += " ";

               		var paramStr = condOmm.val3;

               		if (condOmm.val2==="RSAME")
               		{
               			returnStr += "'%'||";
               		}
               		returnStr += "UPPER('"+clt.util.replaceAll(paramStr,"'", "''")+"')";
               		if (condOmm.val2==="LSAME")
               		{
               			returnStr == "||'%' ";
               		}
               	}
               	else if (condOmm.val2==="IN")
               	{
               		returnStr += condOmm.val0;
               		returnStr += " ";
               		returnStr += condOmm.val2;
               		returnStr += " ";
               		returnStr += ec.getInQuery(condOmm.val3);
               		returnStr += " ";
               	}
               	else
               	{
               		if (condOmm.val2=== "<>") {
               			returnStr += "(";
               		}
               		returnStr += condOmm.val0;
               		returnStr += " ";
               		returnStr += condOmm.val2;

               		var paramStr = condOmm.val3;

               		if(!esl.comm.isNull(condOmm.val4) && "DATE"===condOmm.val4)
               		{
               			returnStr += paramStr;
               		}
               		else
               		{
               			returnStr += "'"+clt.util.replaceAll(paramStr,"'", "''")+"'";
               		}

               		if (condOmm.val2==="<>") {
               			returnStr += " OR ";
               			returnStr += condOmm.val0;
               			returnStr += " IS NULL";
               			returnStr += ")";
               		}
               	}
               return returnStr;
               },

               /**Client 에서 Dynamic query 관련 String 연결*/
               getInQuery  : function (val)
               {
	               var tokens = val.split(",");
	               var ret = "(''";

	               if(cu.isArray(tokens)){
	               	var datas;

	               	var tokensLength = tokens.length;
	               	for(var i = 0; i<tokensLength; i++){
	               		datas = tokens[i]+","+ tokens[i+1].trim()+"'" ;
	               	}
	               	datas += ")";

	               	return datas;
	               }
	               return "";
               },



          	   /**
                * 공통 조회조건 값 가져오는 api
                * @memberOf esl.comm#
                * @method   getDsSearchconditionValue
                * @public
                * @param    {string) 공통 조회조건 JSON, 가져오고싶은 DB컬럼값
                * @return   (string) vals;
                */
               getDsSearchconditionValue : function( param, conds )
               {
            	   var vals = "";
            	   var cond = (typeof conds === "undefined" ? ec.getSearchData("VALUE") : conds);
            	   if(!param) return vals;
            	   if(!cond) return vals;
                   if(cond.dsSearchcondition)
                   {
                	   condList = cond.dsSearchcondition;
                	   if(condList.length > 0)
                	   {
                		   var dsRow;
                		   for(var i = 0; i < condList.length; i++)
                		   {
                			   dsRow = condList[i];
                			   if(dsRow.val0 == param)
                			   {
                				   vals = dsRow.val3;
                				   break;
                			   }
                		   }
                	   }
                   }
                   return vals;
               },

          	   /**
                * 공통 조회조건 입력받는 값만 삭제하는 API
                * @memberOf esl.comm#
                * @method   getDsSearchconditionValue
                * @public
                * @param    {string) 공통 조회조건 JSON, 지우고싶은 DB컬럼값
                * @return   (string) vals;
                */
               removeDsSearchconditionCol : function( params, cond )
               {
            	   var conds = (typeof cond === "undefined" ? ec.getSearchData() : cond);
            	   return ec.pushDsSearchconditionCol(conds, params, "REMOVE");
               },

               /**
                * 공통 조회조건 입력받는값만 남기는 API
                * @memberOf esl.comm#
                * @method   getDsSearchconditionValue
                * @public
                * @param    {string) 공통 조회조건 JSON, 남기고싶은 DB컬럼값
                * @return   (string) vals;
                */
               remainDsSearchconditionCol : function(  params , cond )
               {
            	   var conds = (typeof cond === "undefined" ? ec.getSearchData() : cond);
            	   return ec.pushDsSearchconditionCol(conds, params, "REMAIN");
               },
               /*Form에서 ID 리스트 가져옴*/
               getFormIdList : function(insertForm,addArr)
               {
            	    var formName = $("#"+insertForm).attr("name");
            	    var allElem = document[formName];
            	    var arr = [];

            	    if(cu.isArray(addArr))
            	    {
            	    	for(var i = 0; i < addArr.length; i++)
            	    	{
            	    		arr.push(addArr[i]);

            	    	}
            	    }
            	    else
            	    {
            	    	if(!ec.isNull(addArr) && addArr.length > 0)
            	    	{
            	    		arr.push(addArr);
            	    	}
            	    }

            	    $.each(allElem, function(i) {
            	        elemType = $(this).attr("type");
            	        elemId = $(this).attr("id");
            	        elemVal = $("#" + elemId).val();

            	        switch (elemType) {
            	            //case undefined:
            	            case "button":
            	            case "reset":
            	            case "submit":
            	                break;
            	            case "select-one":
            	                arr.push(elemId);
            	                break;
            	            case "radio":
            	            	arr.push(elemId);
            	                break;
            	            case "checkbox":
            	            	arr.push(elemId);
            	                break;
            	            default:
            	            	arr.push(elemId);
            	                break;
            	        }
            	    });

             	    return arr;
               },

               /**
                * 조회조건 PUSH하는 API
                * @memberOf esl.comm#
                * @method   getDsSearchconditionValue
                * @public
                * @param    {string) 공통 조회조건 JSON, 남기고싶은 DB컬럼값, REMOVE/REMAIN
                * @return   (string) vals;
                */
               pushDsSearchconditionCol : function(cond, params, checkVal)
               {
            	   var vals = [];
            	   if(!params) return cond;
            	   if(!cond) return cond;
            	   var check = (checkVal == "REMAIN") ? "Y" : "N";
            	   if(cond.dsSearchcondition)
            	   {
            		   condList = cond.dsSearchcondition;
        			   var dsRow;
        			   for(var i = 0; i < condList.length; i++)
        			   {
        				   dsRow = condList[i];
        				   if((check == "Y" && ec.arrayParamCheck(params, dsRow.val0))
        					  || (check == "N" && !ec.arrayParamCheck(params, dsRow.val0)))
        					   vals.push(dsRow);
        			   }
            	   }
            	   cond.dsSearchcondition = vals;
            	   return cond;
               },

               /**
                * Array 값 , 대상
                * Array에서 일치하는 값이 있으면 true
                */
               arrayParamCheck : function(params, val)
               {
            	   var rtnVal = false;

            	   if(clt.util.isArray(params))
            	   {
                	   for(var i = 0; i < params.length; i++)
                	   {
                		   if(val == params[i]) return true;
                	   }
            	   }
            	   else if(val == params)  return true;

            	   return rtnVal;
               },

               /**
                * 	우편번호 Masking체크
                *
                */
               getMaskingData : function(dataset, zipcodeMasking){
	           		var zipcodeMask=0, countryNm;
	           		var maskOmmLength = dataset.maskOmms.length ;
	           		var checkVal = 'N';
	           		if(esl.comm.isNull(dataset.maskOmms[0].maskValue)) return 'Y';
	           		for(var i = 0 ; i < maskOmmLength ; i++){
	           			zipcodeMask = dataset.maskOmms[i].maskValue;
	           			countryNm = dataset.maskOmms[i].countryNm;
	           			if(ec.zipcodeCheck(zipcodeMask, zipcodeMasking) === 'Y'){
	           				checkVal = 'Y';
	           				break;
	           			}else{
	           				checkVal = 'N';
	           			}
	           		}
	           		if(checkVal === 'N'){
	           			alert(esl.comm.getRepLangMsg('ZIPCODEMSG',[countryNm,zipcodeMask]));
	           			return 'N';
	           		}
	           		return checkVal;

	           	},

            	/**
                 * 	우편번호 Masking할 데이터 가져옴
                 *
                 */
            	 zipcodeMasking : function(inputCountryCd, checkZipcode){
	            	   if (esl.comm.isNull(checkZipcode)) {
	            			return 'Y';
	            	   }
	            	   var rtnVsl = "N";
	            	   var countryCd = inputCountryCd;
	        		   var opt = {
	        				header: {
	        				        "application": "EslTMS",
	        				        "service": "SvcTMSMask",
	        				        "operation": "search"
	        				    },
	        				    async: false,
	        				    reqOMM: "TMSMaskCondOMM",
	        				    cond: {"countryCd":countryCd},
	        				    callback: function(res, head, dataset) {
	        				    	var checkResult = ec.getMaskingData(dataset, checkZipcode);
	        				    	if(checkResult === 'N') rtnVsl = 'N';
	        				    	else rtnVsl = 'Y';
//	        				    	saveData();
	        				    }
	        			};
	        			clt.comm.search(opt);
	        			return rtnVsl;
            	},

            	/**
                 * 	우편번호 Masking체크
                 *
                 */
            	zipcodeCheck : function(maskValue, insertZipcodeMasking){
            		var pattern1 = /[0-9]/; // 숫자만 입력
            		var pattern2 = /[a-zA-Z]/; // 문자만 입력

            		var checkZipcode = insertZipcodeMasking;
            		var maskValueLength = maskValue.length;
            		var returnResult = 'Y';
            		 if(ec.checkZipcodeLength(maskValue, checkZipcode) === 'N') return 'N';
            		 for(var i=0 ; i<maskValueLength ; i++){
            		      if(maskValue.charAt(i) === "#"){
            		    	  if(!pattern1.test(checkZipcode.charAt(i)))  return 'N';

            		      }else if(maskValue.charAt(i) === "$"){
            		    	  if(!pattern2.test(checkZipcode.charAt(i))) return 'N';

            		      }else if(maskValue.charAt(i) === "*"){
            		    		  return 'Y';
            		      }else{
            		    	  if(maskValue.charAt(i) !== checkZipcode.charAt(i)) return 'N';
            			  }
            		 }

            		return returnResult;
            	},

            	/**
                 * 	우편번호 길이체크
                 *
                 */
            	checkZipcodeLength : function(maskValue, insertZipcode){
            		var maskValueLength = maskValue.length;
            		var checkZipcode = insertZipcode;
            		var ckeckZipcodeLength = checkZipcode.length;
            		if(maskValueLength != ckeckZipcodeLength){
            			return 'N';
            		}
            	},

            	/**
            	 * id 배열을 받아 해당 id를 제외한 나머지를 활성
            	 */
            	disabledSlice : function (allId,arr){
            		   var forArr = [];
            		   var disArr = [];
            		   for(var i = 0; i<allId.length+1; i++){
            			   if(esl.comm.arrayParamCheck(arr, allId[i]))
            			   {
            				   disArr.push(allId[i]);
            			   }
            			   else
        				   {
            				   forArr.push(allId[i]);
        				   }
            		   }
            		   esl.comm.disabledAct(false, forArr); //활성
            		   esl.comm.disabledAct(true, disArr); //비활성
            	},

            	/**
            	 * 버튼 활성
            	 */
            	enabled : function(idval)
            	{
            		ec.disabledAct(false,idval);
            		ec.changeClassAct(false, idval);
            	},
            	/**
            	 * 버튼 비활성
            	 */
            	disabled :function(idval)
            	{
            		ec.disabledAct(true,idval);
            		ec.changeClassAct(true, idval);
            	},
            	/**
            	 * 버튼 디자인 class change
            	 */
            	changeClassAct : function( tfVal, idval){

            		if(!esl.comm.isNull(idval))
            		   {
            		      if(clt.util.isArray(idval))
            		      {
            		         for(var i=0; i< idval.length;i++)
            		         {
            		        	 var attrAuth = ec.getid(idval[i]).attr("data-auth");

            		        	 if(tfVal === true){
            		        		 ec.getid(idval[i]).attr("class", "txt_btn disabled");
            		        	 }else{
            		        		 if(attrAuth==="IUD") ec.getid(idval[i]).attr("class", "txt_btn point");
            		        		 else ec.getid(idval[i]).attr("class", "txt_btn");
            		        	 }
            		         }
            		      }
            		   }
            	},
            	/**
            	 * 버튼 disalbed Active
            	 */
            	disabledAct : function(tfVal,idval)
            	{
            	 if(!esl.comm.isNull(idval))
            	 {
            	    if(clt.util.isArray(idval))
            	    {
            	       for(var i=0; i< idval.length;i++)
            	       {
            	          ec.attr(ec.getid(idval[i]),"disabled",tfVal);
            	       }
            	    }
            	 }
            	},
            	/**
            	 * id 받아서 $("# ID") 형태로 리턴
            	 */
            	getid : function(idval){
            		return $("#"+idval);
            	},
            	/**
            	 * 버튼 활성 비활성 attr
            	 */
            	attr : function(comp,pre,val)
            	{
            		  comp.attr(pre,val);
            	},


               /**
                obj 복제
                */
               clone : function(obj)
            	{
        		  if (obj === null || typeof(obj) !== 'object') return obj;

    			  var copy = obj.constructor();

    			  for (var attr in obj)
    			  {
    			    if (obj.hasOwnProperty(attr))
    			    {
    			      copy[attr] = obj[attr];
    			    }
    			  }
    			  return copy;
            	},
            	/**
            	 임의 Popup
            	 */
            	showCustomPopup : function(opt)
            	{
            	    var modal = (typeof opt.modal === "undefined") ? true : opt.modal,
            	            multi = (typeof opt.multi === "undefined") ? false : opt.multi,
            	            pageSize = (typeof opt.pageSize === "undefined") ? "0" : opt.pageSize,
            	            progress = (typeof opt.progress === "undefined") ? false : opt.progress,
            	            btnDisplay = (typeof opt.btnDisplay === "undefined") ? false : opt.btnDisplay,
            	            row = 0,
            	            target = null,
            	            grid = null,
            	            chkObj = null;

            	        $.extend(true, opt.cond, {
            	            "multi": multi
            	        });

            	        if (pageSize === "") pageSize = "0";
            	        $.extend(true, opt.cond, {
            	            "pageCount": pageSize
            	        });

            	        grid = opt.grid;
            	        if (typeof(grid) !== "undefined") {
            	            chkObj = clt.comm._checkObject(grid);
            	            if (chkObj[0] === "ibsheet") {
            	                row = grid.GetSelectRow();
            	                target = opt.target;
            	            }else {
                                target = opt.target;
                            }
            	        } else {
            	            target = opt.target;
            	        }

            	        var pOpt = {
            	            modal: modal, // 옵션
            	            title: opt.title,
            	            width: typeof opt.width === "undefined" || opt.width === null || opt.width === "" ? 500 : opt.width,
            	            height: typeof opt.height === "undefined" || opt.height === null || opt.height === "" ? 500 : opt.height,
            	            type: typeof opt.type === "undefined" || opt.type === null || opt.type === "" ? "common" : opt.type,
            	            cond: opt.cond,
            	            context: opt.context,
            	            progress: progress,
            	            btnDisplay : btnDisplay,
            	            url: typeof opt.url === "undefined" || opt.url === null || opt.url === "" ? "/eslwms/template/codePopup.html" : opt.url,
            	            resFuncName: "getCheckedSheetData",
            	            callback: function(data) {
            	                var paramidx = 20;
            	                if (chkObj !== null && chkObj[0] === "ibsheet") {
            	                    // sheet
            	                    grid.SetCellValue(row, target.code, data[0]);
            	                    if (target.name) {grid.SetCellValue(row, target.name, data[1]);}

            	                    for(var foridx = 1; foridx <= paramidx; foridx++)
                                    {
                                        if(!esl.comm.isNull(target["param"+foridx]))
                                            grid.SetCellValue(row, target["param"+foridx], data[foridx + 1]);
                                    }

            	                } else {
            	                    // form
            	                    $("#" + target.code).val(data[0]);
            	                    $("#" + target.code).trigger("change");
            	                    if (target.name) {
            	                        $("#" + target.name).val(data[1]);
            	                        $("#" + target.name).trigger("change");
            	                    }

            	                    for(var foridx = 1; foridx <= paramidx; foridx++)
                                    {
                                        if (!esl.comm.isNull(target["param"+foridx]))
                                        {
                                            $("#" + target["param"+foridx]).val(data[foridx + 1]);
                                            $("#" + target["param"+foridx]).trigger("change");
                                        }
                                    }
            	                }

            	                // 호출하는 부모창에 callback 함수가 있는 경우
            	                if (typeof opt.callback === "function") {
            	                    opt.callback(data);
            	                }
            	            }
            	        };

            	        clt.comm.showPopup(pOpt);
            	},

            	/**
                 * form 형태의 화면에서 클릭 했을 때 display를 한다.
                 * @memberOf   esl.comm#
                 * @method     btnBulletDisplay
                 * @public
                 */
            	btnBulletDisplay : function() {
            		$(".form_list .form_tit.tgl_btn").on("click",function() {
            			if($(this).hasClass("off")){
            				$(this).removeClass("off");
            				$(this).next().show();
            			} else {
            				$(this).addClass("off");
            				$(this).next().hide();
            			}
            		});
            	},


            	/**
                 * 검색조건 숨기기/보이기
                 * @memberOf   esl.comm#
                 * @method     searchToggle
                 * @public
                 */
                searchToggle : function() {
                    $(".type_toggle").each(function() {
                        var obj = $(this);
                        obj.find(".list:nth-child(1)").after("<p class='btn_toggle' tabindex='-1'><span>Detailed Search</span></p>");

                        var btn_tgl = $(this).find(".btn_toggle");
                        obj.addClass("on");
                        btn_tgl.nextAll().show();

                        btn_tgl.on("click",function() {

                            if(obj.hasClass("on")) {
                                obj.removeClass("on");
                                btn_tgl.nextAll().hide();
                            } else {
                                obj.addClass("on");
                                btn_tgl.nextAll().show();
                            }

                            var innerLayout;
                            innerLayout = $("body > .ui-layout-center").layout({
                                closable:true
                            });

                            innerLayout.sizePane("north");

                        });
                    });
            	},

            	/**
                 * 조회조건을 설정 한다.
                 * @memberOf   esl.comm#
                 * @method     popSearchOpt
                 * @public
                 * @param      {string)     code      해당 화면에 id
                 */
            	popSearchOpt : function(code)
            	{
//            		var pOpt = {
//            		    modal: true, // 옵션
//            		    title: ec.getLangMsg("USERSEARCHCONDITION"),
//            		    width: 800,
//            		    height: 600,
//            		    type: "common",
//            		    cond: {"menucode" : code},
//            		    context: "",
//            		    url: "/eslwms/module/COMUserSearchConditionPop.html",
//            		    resFuncName: "getCheckedSheetData",
//            		    callback: function(data) {}
//            		};
//            		clt.comm.showPopup(pOpt);
            	},


                /**
                 * 해당 화면에 조회조건을 가져온다.
                 * @memberOf   esl.comm#
                 * @method     setSearchForm
                 * @public
                 * @param      {string)     code      해당 화면에 id
                 */
                setSearchForm : function(code) {
                    var opt = {
                        header: {
                            "application": "EslADM",
                            "service": "SvcCOMSearchCondition",
                            "operation": "selectSearchCondition"
                        },
                        reqOMM: "CommonSearchConditionCondOMM",
                        cond: {"menucode" : code },
                        async: false,
                        callback: function(res, head, dataset) {

                            var btndata = dataset["commonButtonAuthOmms"],    // 버튼 권한
                                data = dataset["commonSearchConditionOmms"],
                                sb = new StringBuffer(),                      // 조회 조건
                                ulChk = 0,
                                liCnt = 3,
                                divHasClass = $("#div_search").hasClass("type_toggle");

                            var btnObjData = $('button[data-auth]');
                            var items;

                            /*권한별 버튼 및 조회조건 셋팅 START 2016.11.15 김형준*/
                            $.each(__authValArr__, function(i, items) {
                            	__authVal__[items] = "N";
                            });

                            for(var i = 0; i < btndata.length; i++)
                            {
                            	items = btndata[i]["rolecode"];

                            	if(ec.arrayParamCheck(__authValArr__, items))
                            	{
                            		__authVal__[items] = "Y";
                            	}
                            }
                            /*권한별 버튼 및 조회조건 셋팅 END 2016.11.15 김형준*/

                            $.each(btnObjData, function(k, btn) {
                                var btnFlag = false,
                                    btnObj = btn,
                                    auth = btn.getAttribute('data-auth');

                                // 버튼 권한
                                $.each(btndata, function(i, item) {
                                    if (auth === item["rolecode"]) {
                                        btnFlag = true;
                                        return;
                                    }
                                });

                                if (btnFlag === false) {
                                    if (typeof btnObj !== "undefined" && typeof btnObj.prop === "undefined") {
                                        btnObj = $("#" + btnObj.id);
                                    }
                                    btnObj.remove();
                                }
                            });

//                            sb.append("<div class='panel_btn_area'>");
//                            sb.append("<ul class='list'>");
//                            sb.append("<li class='item setting'><button type='button' class='btn' id='_btnSchOpt' name='_btnSchOpt'><span>조회조건 설정</span></button></li>");
//                            sb.append("</ul>");
//                            sb.append("</div>");
                            sb.append("<div class='form_list srch'>");

                            // 조회 조건 - makeHtml
                            $.each(data, function(i, item) {

                                if (ulChk == 0) {
                                    sb.append("<ul class='list'>");
                                }

                                sb.append("<li class='item type_combo' id='_li_"+i+"' >");
                                sb.append( ec._makeHtml(i, item) );
                                sb.append("</li>");
                                ulChk++;

                                if (divHasClass) {
                                    if((i == 0) || (i == 1)) {
                                        liCnt = 2;
                                    } else {
                                        liCnt = 3;
                                    }
                                } else {
                                    liCnt = 3;
                                }

                                if (ulChk % liCnt == 0) {
                                    sb.append("</ul>");
                                    ulChk = 0;
                                }

                            });

                            sb.append("</div>");

                            $("#div_search").prepend(sb.toString());

                            // 검색조건 숨기기/보이기
                            if($(".type_toggle").length > 0 && $(".wrap_pop").length <= 0) {
                                ec.searchToggle();
                            }

                            var searcnCond = new MaskSearchCond();
                            $("#div_search > div.form_list > ul > li > div > [id^='_opr_']").each(function() {
                            	 searcnCond.setOperationStore(this.id , this.getAttribute("data-fix") , this.getAttribute("data-value"));
                            });

                            // 팝업 호출
                            $("#div_search > div.form_list > ul > li > span > [id^='_pop_']").on({
                                click : function() {
                                    var target = $(this),
                                        id = target.attr("id"),
                                        idx = id.replace("_pop_", ""),
                                        searchYn = target.attr("search-yn"),
                                        minInput = data[idx].nextline,
                                        multiVal = false,
                                        oprVal = $("#_opr_"+idx+"  input[name ^='_opr_"+idx+"']")[0].value;

                                    if(ec.arrayParamCheck(['IN','NOT'], oprVal))
                                    {
                                    	multiVal = true;
                                    }

                                    if (ec.isNull(minInput)) {
                                    	minInput = "";
                                    }
                                   /* if (typeof minInput === "undefined") {
                                    	minInput = "";
                                    }*/

                                    condParam = {
                                        "keyparam": data[idx].keyparam,
                                        "sqlprop" : data[idx].sqlprop,
                                        "module"  : data[idx].module,
                                        "param1"  : data[idx].param1,
                                        "param2"  : data[idx].param2,
                                        "param3"  : data[idx].param3,
                                        "param4"  : data[idx].param4,
                                        "param5"  : data[idx].param5,
                                        "param6"  : data[idx].param6,
                                        "param7"  : data[idx].param7,
                                        "param8"  : data[idx].param8,
                                        "param9"  : data[idx].param9,
                                        "param10" : data[idx].param10,
//                                        "nextline": data[idx].nextline
                                        "nextline": minInput
                                    };

                                    // 2016.11.09 변용민
                                    // 검색조건 관계형 조회기능 추가
                                    var paramNames = ['keyparam','sqlprop','module','param1','param2','param3','param4','param5','param6','param7','param8', 'param9', 'param10'];

                                    for(var i = 0; i < paramNames.length; i++)
                                    {
                                    	var sqlParam = condParam[paramNames[i]];
                                    	var paramVal = sqlParam;

                                        //다른 조회조건의 값이 필요할 때. 필수는 아님.
                                        if(esl.comm.nvl(sqlParam, '').indexOf('GET:') == 0)
                                        {
                                        	//paramVal = $("#div_search [msgVal="+sqlParam.substr(4)+"]").val();
                                        	paramVal = clt.util.getMaskValue($("#div_search [msgVal="+sqlParam.substr(4)+"]"));
                                        }
                                        //다른 조회조건의 값이 필요할 때. 필수.
                                        else if(esl.comm.nvl(sqlParam, '').indexOf('REQ:') == 0)
                                        {
                                        	//paramVal = $("#div_search [msgVal="+sqlParam.substr(4)+"]").val();
                                        	paramVal = clt.util.getMaskValue($("#div_search [msgVal="+sqlParam.substr(4)+"]"));
                                            if(esl.comm.isNull(paramVal))
                                            {
                                            	alert(esl.comm.getRepLangMsg('MSG_REQUIRE_OTHER_INPUT', esl.comm.getLangMsg(sqlParam.substr(4))));
                                            	$(this).val("");
                                                return;
                                            }
                                        }

                                        condParam[paramNames[i]] = paramVal;
                                    }

                                    var opt = {
                                        title : data[idx].columndescrLang,
                                        multi : multiVal,
                                        target : {"code":"_search_"+idx, "name":"name_search_"+idx},
                                        cond : condParam,
                                        pageSize : data[idx].pagesize,
                                        fieldClear : "Y",
                                        searchYn : searchYn
                                    };
                                    ec.showSearchCommPopup(opt);
                                }
                            });

                            // 공통코드 팝업 사용하는 입력 란에 keydown 이벤트 삽입
                            $("#div_search > div.form_list > ul > li > span > [tempcode^='_pop_']").on({
                                keydown : function(ev) {
                                    var target = $(this),
                                        tempcode = target.attr("tempcode"),
                                        idx = tempcode.replace("_pop_", "");
                                    if (ev.which == "13") {
                                        $(this).blur();
                                    } else if ((ev.which == "8") || (ev.which == "46")) {
                                        if (typeof target.attr("attrcode") !== "undefined") {
                                            $("#name_search_"+idx).val("");
                                        }
                                        if (typeof target.attr("attrname") !== "undefined") {
                                            $("#_search_"+idx).val("");
                                        }
                                    }
                                },

                                blur : function(ev) {
                                    var target = $(this),
                                        code = "",
                                        name = "",
                                        tempcode = target.attr("tempcode"),
                                        attrcode = target.attr("attrcode"),
                                        attrname = target.attr("attrname"),
                                        minInput = target.attr("minInput"),
                                        idx = tempcode.replace("_pop_", ""),
                                        searchYn = "N",
                                        multiVal = false,
                                        oprVal = $("#_opr_"+idx+"  input[name ^='_opr_"+idx+"']")[0].value;


                                    if(ec.arrayParamCheck(['IN','NOT'], oprVal)) {
                                        multiVal = true;
                                    }

                                    if (typeof attrcode === "undefined") {
                                        code = "";
                                    } else {
                                        code = target[0].value;
                                        //code = code.toUpperCase();
                                    }

                                    if (typeof attrname === "undefined") {
                                        name = "";
                                    } else {
                                        name = target[0].value;
                                    }

                                    if (typeof minInput === "undefined") {
                                    	minInput = "";
                                    }

                                    var autoSearch = "N";
                                    if(!ec.isNull(code) || !ec.isNull(name)){
                                    	autoSearch = "Y";
                                    }
                                    if(ec.isNull(code)&&ec.isNull(name)){
                                    	return;
                                    }

                                    condParam = {
                                            "keyparam"   : data[idx].keyparam,
                                            "sqlprop"    : data[idx].sqlprop,
                                            "module"     : data[idx].module,
                                            "param1"     : data[idx].param1,
                                            "param2"     : data[idx].param2,
                                            "param3"     : data[idx].param3,
                                            "param4"     : data[idx].param4,
                                            "param5"     : data[idx].param5,
                                            "param6"     : data[idx].param6,
                                            "param7"     : data[idx].param7,
                                            "param8"     : data[idx].param8,
                                            "param9"     : data[idx].param9,
                                            "param10"    : data[idx].param10,
                                            "nextline"   : minInput,
                                            "code"       : code,
                                            "name"       : name,
                                            "autoSearch" : autoSearch
                                    };

                                    // 2016.11.09 변용민
                                    // 검색조건 관계형 조회기능 추가
                                    var paramNames = ['keyparam','sqlprop','module','param1','param2','param3','param4','param5','param6','param7','param8', 'param9', 'param10'];

                                    for(var i = 0; i < paramNames.length; i++) {
                                        var sqlParam = condParam[paramNames[i]];
                                        var paramVal = sqlParam;

                                        if(esl.comm.nvl(sqlParam, '').indexOf('GET:') == 0) {
                                            //다른 조회조건의 값이 필요할 때. 필수는 아님.
                                            //paramVal = $("#div_search [msgVal="+sqlParam.substr(4)+"]").val();
                                        	paramVal = clt.util.getMaskValue($("#div_search [msgVal="+sqlParam.substr(4)+"]"));
                                        } else if(esl.comm.nvl(sqlParam, '').indexOf('REQ:') == 0) {
                                            //다른 조회조건의 값이 필요할 때. 필수.
                                            //paramVal = $("#div_search [msgVal="+sqlParam.substr(4)+"]").val();
                                        	paramVal = clt.util.getMaskValue($("#div_search [msgVal="+sqlParam.substr(4)+"]"));
                                            if(esl.comm.isNull(paramVal)) {
                                                alert(esl.comm.getRepLangMsg('MSG_REQUIRE_OTHER_INPUT', esl.comm.getLangMsg(sqlParam.substr(4))));
                                                $(this).val("");
                                                return;
                                            }
                                        }
                                        condParam[paramNames[i]] = paramVal;
                                    }

                                    var opt = {
                                            title : data[idx].columndescrLang,
                                            multi : multiVal,
                                            target : {"code":"_search_"+idx, "name":"name_search_"+idx},
                                            cond : condParam,
                                            pageSize : data[idx].pagesize,
                                            fieldClear : "Y",
                                            searchYn : searchYn
                                        };
                                    ec.setSearchCondCodeSearch(opt);
                                }
                            });

                            // SELECT
                            $("#div_search > div.form_list > ul > li > span > select:not([id ^='_opr'])").each(function() {
                                var target = $(this),
                                    defaultvalue = target.attr("data-value"),
                                    id = target.attr("id"),
                                    chkVal = "",
                                    tempcombo = target.attr("tempcombo"),
                                    idx,
                                    condParam,
                                    opt;

                                if (typeof tempcombo !== "undefined") {
                                    idx = tempcombo.replace("_combo_", "");
	                                condParam = {
	                                    "keyparam": data[idx].keyparam,
	                                    "sqlprop" : data[idx].sqlprop,
	                                    "module"  : data[idx].module,
	                                    "param1"  : data[idx].param1,
	                                    "param2"  : data[idx].param2,
	                                    "param3"  : data[idx].param3,
	                                    "param4"  : data[idx].param4,
	                                    "param5"  : data[idx].param5,
	                                    "param6"  : data[idx].param6,
	                                    "param7"  : data[idx].param7,
	                                    "param8"  : data[idx].param8,
	                                    "param9"  : data[idx].param9,
	                                    "param10" : data[idx].param10
	                                };

	                                if (data[idx].type === "CHAINCOMBO") {
	                                    opt = {
	                                            cond: condParam,
	                                            target: id,
	                                            cols: [id, "chain" + id],
	                                            callback : function(res, header, data) {
	                                                if(!ec.isNull(data)){
	                                                    if(data.selectCodeOmms.length > 0) {
	                                                        chkVal = $("#"+id).children().eq(0).val();
	                                                    }
	                                                }
	                                                target.val(ec.isNull(defaultvalue.replace( __replaceVal__, ""))? chkVal : defaultvalue);
	                                            }
	                                        };
	                                } else {
	                                    opt = {
	                                        cond: condParam,
	                                        target: id,
	                                        callback : function(res, header, data) {
	                                            if(!ec.isNull(data)){

	                                            	if(data.selectCodeOmms.length > 0) {
	                                                    chkVal = $("#"+id).children().eq(0).val();
	                                                }
	                                            }
	                                            target.val(ec.isNull(defaultvalue.replace( __replaceVal__, ""))? chkVal : defaultvalue);
	                                        }
	                                    };
	                                }
	                                clt.comm.setSelectCombo(opt);
                                }
	                        });
                        }
                    };
                    clt.comm.search(opt);
                },

                /**
                 * 해당 화면에 조회조건을 가져온다. .
                 * @memberOf   clt.comm#
                 * @method     _makeHtml
                 * @private
                 * @param      {string)     opt.columndescr     조회 조건 title
                 * @param      {string}     opt.dbcolumn        input 에 name (동일 name 생성가능)
                 * @param      {string}     opt.type            type : FIELD,POP,COMBO, YM, YMD ,YMDHM,BETWEEN
                 * @param      {string}     opt.datatype        type : NUMBER, DATE
                 */
                _makeHtml : function(i, item) {
                    var strText,
                        viewyn = item["viewyn"];

                    strText = ec._makeTitle(i, item);

                    if (viewyn === "Y") {
                        return strText;
                    } else {
                        return strText + ec._makeInput(i, item);
                    }
                },

                _makeTitle : function(i, item) {
                    var columndescr = item["columndescr"],     // 조회 조건 title
                        operator = item["operator"],           // 부등호 버튼
                        operatorfix = item["operatorfix"],     // 연산자 고정
                        requirement = item["requirement"],
                        datatype = item["datatype"],
                        opr = "_opr_"+i,
                        tops = top || window,
                        rename = tops.__htmlsRename__,
                        str;

                    if (requirement === "Y") {
                        requirement = "GMKeyfield";
                    } else {
                        requirement = "";
                    }

                    str  = "<div class='label'>";
                    str += "<span class='title "+requirement+"' id=_title_"+i+" "+rename+"='"+columndescr+"'>" + ec.getLangMsg(columndescr) + "</span>";
                    str += "<div id='"+opr+"' data-fix='"+operatorfix+"'  data-value='"+operator+"'  style='width:60px;height:21px;'; datatype='"+datatype+"'></div>";
                    str += "</div>";

                    return str;
                },

                _makeInput : function(i , item) {
                    var dbcolumn  = item["dbcolumn"],            // input 에 name ( 동일 name으로 생성가능)
                        columndescr  = item["columndescr"],      // input 에 언어팩
                        type = item["type"] ,                    // input 에 type
                        datatype = item["datatype"],             // data type NUMBER. DATA
                        requirement = item["requirement"],       // 필수입력 여부
                        sqlprop = item["sqlprop"],               // select box  공통 / 일반 구분
                        defaultvalue = item["dfVal"],            // defaultvalue
                        viewyn = item["viewyn"],                 //  viewyn 이 Y 이면 hidden
                        minInput = item["nextline"],
                        id = "_search_"+i,
                        btn = "_btn_"+i,
                        inputType = "text",
                        str = "",
                        getTmpDate = "",
                        searchyn = "N";

                    if (datatype == "NUMBER") {
                        datatype = " data-mask-type='num' ";
                    } else {
                        datatype = "";
                    }

                    if (requirement === "Y") {
                        requirement = "required";
                    } else {
                        requirement = "";
                    }

                    if (minInput === null || minInput === "null") {
                    	minInput = "";
                    }

                    if (defaultvalue === null || defaultvalue === "null") {
                        defaultvalue = "''";
                    }

                    if (viewyn === "Y") {
                        inputType = "hidden";
                    }

                    switch (type) {
                        case "FIELD":
                            str = "<span class='label_r'><input type="+inputType+" name="+dbcolumn+"  id="+id+"  value="+defaultvalue+"   "+datatype+ "   "+requirement+ "   msgVal="+columndescr+" maxlength=1000></span>";
                            break;

                        case "POP":
                            btn = "_pop_"+i;
                            datatype = " data-mask-type='searchcodeupper' ";
                            str = "<span class='label_r srch_trigger'><input type="+inputType+"  class='input_e'  style='width:38%'  "+ datatype +"  name="+dbcolumn+"  id="+id+"  value="+defaultvalue+"  "+datatype+ "  attrcode  tempcode="+btn+"  "+requirement+ "   msgVal="+columndescr+"  minInput="+minInput+"  maxlength=1000 search-yn="+searchyn+">";
                            if (inputType !== "hidden") {
                                str += "<button type='button' id="+btn+" "+__eslGlobal__.popSearchYn+"="+__eslGlobal__.popSearchYnDefVal+">돋보기</button>";
                            }
                            str += "<input type="+inputType+"  class='input_e'  style='width:50%'  name=name_"+dbcolumn+"  id=name"+id+"  value="+defaultvalue+"  attrname  tempcode="+btn+"  msgVal="+columndescr+"  disabled='disabled'  maxlength=1000></span>";
                            break;

                        case "POPNAME":
                            btn = "_pop_"+i;
                            datatype = " data-mask-type='searchcodeupper' ";
                            str = "<span class='label_r srch_trigger'><input type="+inputType+"  class='input_e'  style='width:38%'    "+ datatype +"  name="+dbcolumn+"  id="+id+"  value="+defaultvalue+"  "+datatype+ "attrcode  tempcode="+btn+"  "+requirement+ "   msgVal="+columndescr+"  minInput="+minInput+"  search-yn="+searchyn+">";
                            str += "<input type="+inputType+"  class='input_e'  style='width:50%'  name=name_"+dbcolumn+"  id=name"+id+"  value="+defaultvalue+"  attrname  tempcode="+btn+"  "+requirement+ "   msgVal="+columndescr+"  minInput="+minInput+"  maxlength=1000>";
                            if (inputType !== "hidden") {
                                str += "<button type='button' id="+btn+" "+__eslGlobal__.popSearchYn+"="+__eslGlobal__.popSearchYnDefVal+">돋보기</button>";
                            }
                            str += "</span>";
                            break;

                        case "COMBO":
                            btn = "_combo_"+i;
                            if (!requirement && defaultvalue === "''") {
                                defaultvalue = "";
                            }
                            //여기
                            str = "<span class='label_r'><select name="+dbcolumn+"  id="+id+"  tempcombo="+btn+"  "+datatype+ "  "+requirement+ "  data-value="+ec.nvl(defaultvalue, __replaceVal__)+"   msgVal="+columndescr+" ></select></span>";
                            break;

                        case "CHAINCOMBO":
                            btn = "_combo_"+i;
                            if (!requirement && defaultvalue === "''") {
                                defaultvalue = "";
                            }
                        	str  = "<span class='label_r'>";
                        	str += "<select name="+dbcolumn+"  id="+id+"  style='width:49%'  tempcombo="+btn+"  "+datatype+ "  "+requirement+ "  data-value="+ec.nvl(defaultvalue, __replaceVal__)+"   msgVal="+columndescr+" ></select>";
                        	str += "<select name="+dbcolumn+"  id=chain"+id+"  style='width:49%'  "+datatype+ "  "+requirement+ "  data-value="+ec.nvl(defaultvalue, __replaceVal__)+"   msgVal="+columndescr+" ></select>";
                        	str += "</span>";
                        	break;

                        case "YM":
                            getTmpDate = clt.util.getSearchCondToday("ym");
                            //getTmpDate = clt.util.getToday("ym");
                            if (defaultvalue === "''") {
                                defaultvalue = getTmpDate;
                            } else {
                                //defaultvalue = clt.util.getDateAdd(getTmpDate, defaultvalue, "MM");
                                defaultvalue = clt.util.getSearchcondSeparatorDate(defaultvalue, "MM");
                                defaultvalue = clt.util.getSeparatorDate(defaultvalue, "MM");
                            }
                            datatype = " data-mask-type='dateym' ";
                            str = "<span class='label_r cal_trigger'><input type="+inputType+"  name="+dbcolumn+"  id="+id+"  value="+defaultvalue+"   data-format='ym'  "+datatype+ "  "+requirement+ "   msgVal="+columndescr+"  maxlength=1000>";

                            if (inputType !== "hidden"){
                                str += "<button type='button' id="+btn+"  data-cal-id="+id+" data-format='ym'    msgVal="+columndescr+" >달력</button></span>";
                            }
                            break;

                        case "YMD":
                            //getTmpDate = clt.util.getToday();
                            getTmpDate = clt.util.getSearchCondToday();
                            if (defaultvalue === "''") {
                                defaultvalue = getTmpDate;
                            } else {
                                defaultvalue = clt.util.getDateAdd(getTmpDate, defaultvalue, "DD");
                                //defaultvalue = clt.util.getSeparatorDate(defaultvalue, "DD");
                                defaultvalue = clt.util.getSearchcondSeparatorDate(defaultvalue, "DD");
                            }
                            datatype = " data-mask-type='date' ";
                            str = "<span class='label_r cal_trigger'><input type="+inputType+"  name="+dbcolumn+"  id="+id+"  value="+defaultvalue+"  data-format='ymd'  "+datatype+ "  "+requirement+ "   msgVal="+columndescr+"  maxlength=1000>";

                            if (inputType !== "hidden"){
                                str += "<button type='button' id="+btn+"  data-cal-id="+id+" data-format='ymd'  msgVal="+columndescr+" >달력</button></span>";
                            }
                            break;

                        case "YMDHI":
                            getTmpDate = clt.util.getCurrentTime();
                            if (defaultvalue === "''") {
                                defaultvalue = getTmpDate;
                            } else {
                                defaultvalue = clt.util.getDateAdd(getTmpDate, defaultvalue, "DD");
                                defaultvalue = clt.util.getSearchcondSeparatorDate(defaultvalue, "DD");
                                //defaultvalue = clt.util.getSeparatorDate(defaultvalue, "DD");
                            }
                            datatype = " data-mask-type='date' ";
                            str = "<span class='label_r cal_trigger'><input type="+inputType+" name="+dbcolumn+" id="+id+"  value="+defaultvalue+"  data-format='ymdhm'  "+datatype+ "  "+requirement+ "   msgVal="+columndescr+"  maxlength=1000>";

                            if (inputType !== "hidden"){
                                str += "<button type='button' id="+btn+"  data-cal-id="+id+" data-format='ymdhm' msgVal="+columndescr+" >달력</button></span>";
                            }
                            break;

                        case "YMDHIS":
                        	getTmpDate = clt.util.getCurrentTime();
                        	if (defaultvalue === "''") {
                        		defaultvalue = getTmpDate;
                        	} else {
                        		defaultvalue = clt.util.getDateAdd(getTmpDate, defaultvalue, "DD");
                        		//defaultvalue = clt.util.getSeparatorDate(defaultvalue, "DD", ".");
                        		defaultvalue = clt.util.getSearchcondSeparatorDate(defaultvalue, "DD");
                        	}
                        	datatype = " data-mask-type='date' ";
                        	str = "<span class='label_r cal_trigger'><input type="+inputType+" name="+dbcolumn+" id="+id+"  value="+defaultvalue+"  data-format='ymdhms'  "+datatype+ "  "+requirement+ " msgVal="+columndescr+"  maxlength=1000>";

                        	if (inputType !== "hidden"){
                        		str += "<button type='button' id="+btn+"  data-cal-id="+id+" data-format='ymdhms'  msgVal="+columndescr+" >달력</button></span>";
                        	}
                        	break;
                    }
                    return str;
                },

                getSearchData : function(getType) {
                    var searchCond = {},
                        val0,
                        val1,
                        val2,
                        val3,
                        val4,
                        dataMaskType,
                        dataFormat,
                        tops = top || window,
                        rename = tops.__htmlsRename__;

                    if (this._isSearchValid(getType)) {
                        searchCond["dsSearchcondition"] = [];
                        $("#div_search > div.form_list > ul > li").each(function(i, item) {
                            val0 = clt.util.replaceAll($("#_search_"+i).attr("name"), "_text" , "");     // dbcolumn
                            val1 = $("#_title_"+i).attr(rename);                                         // title text
                            val2 =  $("#_opr_"+i+"  input[name ^='_opr_"+i+"']")[0].value;               // operator
                            val3 = clt.util.getMaskValue($("#_search_"+i));                              // field value
                            val4 = "";                                                                   // 사용안함
                            val5 = "";

                            if (!(val3 === null || val3 === "") && !(val2 === "NOT")) {

                                dataMaskType = $("#_search_"+i).attr("data-mask-type");
                                dataFormat   = $("#_search_"+i).attr("data-format");
                                if (dataMaskType === "date") {
                                    if (dataFormat === "ymdhms") {
                                        val3 = "TO_DATE(" + val3 + ",'YYYYMMDDHH24MISS')";
                                        val4 = "DATE";
                                    } else if (dataFormat === "ymdhm") {
                                        if ((val2 === "<") || (val2 === ">=")) {
                                            val3 = "TO_DATE(" + val3 + "||'00','YYYYMMDDHH24MISS')";
                                        } else if ((val2 === ">") || (val2 === "<=")) {
                                            val3 = "TO_DATE(" + val3 + "||'59','YYYYMMDDHH24MISS')";
                                        } else {
                                            val3 = "TO_DATE(" + val3 + ",'YYYYMMDDHH24MI')";
                                        }
                                    	val4 = "DATE";
                                    } else if (dataFormat === "ymd") {
                                        if ((val2 === "<") || (val2 === ">=")) {
                                            val3 = "TO_DATE(" + val3 + "||'000000','YYYYMMDDHH24MISS')";
                                        } else if ((val2 === ">") || (val2 === "<=")) {
                                            val3 = "TO_DATE(" + val3 + "||'235959','YYYYMMDDHH24MISS')";
                                        } else {
                                        	val5 = "TRUNC("+val0+")";
                                            val3 = "TO_DATE(" + val3 + ",'YYYYMMDD')";
                                        }
                                        val4 = "DATE";
                                    }
                                }

                                searchCond["dsSearchcondition"].push({"val0" : val0, "val1" : val1, "val2" : val2, "val3" : val3, "val4" : val4, "val5" : val5});

                            }
                        });
                    } else {
                        return null;
                    }
                    return searchCond;
                },

                // 필수
                _isSearchValid : function(getType) {
                    var reqflag = true;
                    $("#div_search > div.form_list > ul > li > span > [required]").each(function(index) {
                        var label = "",
                            msg = "";

                        if (this.value === "" && ec.nvl(getType,"MAKE") === "MAKE") {
                            reqflag  = false;
                            label = $(this).parents("li").find(".title").get(0).innerText;
                            msg = ec.getRepLangMsg(ec.getLangMsg("MSG_REQUIRED_FIELD_REP"), label);
                            alert(msg);
                            $(this).focus();
                            return false;
                        }
                        return true;
                    });
                    return reqflag;
                },

                /**
                 * 창고의 기본 ReportID를 가져온다.
                 * @memberOf   esl.comm#
                 * @method     getWhseReportId
                 * @public
                 * @param      {string)     [opt.whCd]     			창고코드
                 * @param      {string}     [opt.labelTcd] 			라벨유형
             	 * @returns    {type}                desc
             	 */
                getWhseReportId : function(opt) {

                	var reportUrl = '';

                	var reportOpt = {
    	                    header: {
    	                        "application":"EslWMS",
    	                        "service":"SvcWMS731",
    	                        "operation":"search"
    	                    },
    	                    reqOMM:"CommonCondListOMM",
    	                    cond: ["condForm", {
		    	       				 "param1"      : opt.whCd,
		    	       				 "param2"      : opt.labelTcd
		    	                    }],
    	                    async: false,
    	                    blockUI: false,
    	                    callback: function(res, head, dataset) {
    	                    	if(dataset.wmsCenterprintOmms.length == 0) {
    	                    		clt.comm.alert(esl.comm.getRepLangMsg('MSG_WMS_20038', [opt.whCd, opt.labelTcd]));
    	                    	}
    	                    	else {
    	                    		reportUrl = "wms/" + dataset.wmsCenterprintOmms[0].reportFileNm;
    	                    	}
    	                    }
                	};
                	clt.comm.search(reportOpt);

                	return reportUrl;
                },

                /**
                 * 화주의 기본 ReportID를 가져온다.
                 * @memberOf   esl.comm#
                 * @method     getOwnerReportId
                 * @public
                 * @param      {string)     [opt.whCd]     			창고코드
                 * @param      {string)     [opt.strrId]     		계약화주
                 * @param      {string)     [opt.shipfrtoId]   		출도착지코드
                 * @param      {string}     [opt.labelTcd] 			라벨유형
             	 * @returns    {type}                desc
             	 */
                getOwnerReportId : function(opt) {

                	var reportUrl = '';

                	var reportOpt = {
    	                    header: {
    	                        "application":"EslWMS",
    	                        "service":"SvcWMS732",
    	                        "operation":"search"
    	                    },
    	                    reqOMM:"CommonCondListOMM",
    	                    cond: ["condForm", {
		    	       				     "param1"      : opt.whCd,
		    	       				     "param2"      : opt.strrId,
		    	       				     "param3"      : opt.shipfrtoId,
		    	       				     "param4"      : opt.labelTcd
		    	                    }],
    	                    async: false,
    	                    blockUI: false,
    	                    callback: function(res, head, dataset) {
    	                    	if(dataset.count == 0) {
    	                    		clt.comm.alert("Report File not found!!! [whCd : " + opt.whCd + ", strrId : " + opt.strrId + ", shipfrtoId : " + opt.shipfrtoId + ", labelTcd : " + opt.labelTcd + "]");
    	                    	}
    	                    	else {
    	                    		reportUrl = "wms/" + dataset.wmsOwnerPrintOmms[0].reportFileNm;
    	                    	}
    	                    }
                	};
                	clt.comm.search(reportOpt);

                	return reportUrl;
                },

                /**
                 * 바코드, QR 스캔 정보 조회
                 * @memberOf   esl.comm#
                 * @method     getQrCodeInfo
                 * @public
                 * @param      {string)     [opt.qr]     			스캔정보
                 * @param      {string)     [opt.strrId]     		계약화주
             	 * @param      {function}   [opt.callback]          callback function
             	 * @returns    {type}                desc
             	 */
                getQrCodeInfo : function(opt) {
                	var isValid = true,
                	    useAlert = false,
                	    url = '',
                	    serial = '',
                	    boxTcd = '',
                	    qr     = '',
                	    strrId = '',
                	    itemCd = '',
                	    qty = 0;

                	qr = opt.qr;
                	strrId = opt.strrId;
                	useAlert = (typeof opt.useAlert === "undefined") ? true : !!opt.useAlert;

                	// 바코드 13, 제품QR코드 16
                	if(qr.length == 13 || qr.length == 16) {
                		itemCd = qr;
                	}

                	// 중박스QR 29, 대박스QR 29
                	else if(qr.length == 29) {
                		serial = qr.substr(0, 16);
                		boxTcd = qr.substr(16, 1);
                		itemCd = qr.substr(17, 8);
                    	qty = parseInt(qr.substr(25, 4));
                	}

                	// 제품QR 52
                	else if(qr.length == 52) {
                		url = qr.substr(0, 23);
                		serial = qr.substr(23, 16);
                		boxTcd = qr.substr(39, 1);
                		itemCd = qr.substr(40, 8);
                    	qty = parseInt(qr.substr(48, 4));
                	}
                	else {
                		itemCd = qr;
                	}

                	var searchOpt = {
                			header: {
                				"application": "EslWMS",
                				"service": "SvcWMS715",
                				"operation": "searchItemInfo"
                				},
                			"WMSItemViewOMM" : { "strrId" : strrId, "itemCd" : itemCd }
                	};

                	cc.ajax({
            			data: searchOpt,
            			async: true,
            			blockUI: true,
            			callback: function(res, head, dataset)
            			{
            				isValid = esl.comm.isNull(dataset.itemCd) ? false : true;

            				if(!isValid && useAlert)
            					alert(esl.comm.getRepLangMsg('SEM510027', esl.comm.getRepLangMsg('ITEM'))); // {0}를 찾을 수 없습니다.

            				var result = {
                        			isValid : isValid,
                        			qrCode  : isValid ? qr : '',
                        			url     : isValid ? url : '',
                        			serial  : isValid ? serial : '',
                        			boxTcd  : isValid ? boxTcd : '',
                        			strrId  : isValid ? dataset.strrId : '',
                        			itemCd  : isValid ? dataset.itemCd : '',
                        			itemNm  : isValid ? dataset.itemNm : '',
                        			qty     : qty
            				};

            				// callback 함수 처리
                            if (typeof opt.callback === "function") {
                                opt.callback(result, dataset);
                            }
            			}
            		});
                },

                /**
                 * 화면 검색조건 창고코드 설정
                 * @memberOf   esl.comm#
                 * @method     setSearchConditionWhcd
                 * @public
             	 */
                setSearchConditionWhcd : function() {

                	if(esl.comm.isNull(esl.comm.getGlobalParam('sesWhse'))) return false;

                	var searchOpt = {
                			header: {
                				"application": "EslBIZ",
                				"service": "SvcBIZWhCenter",
                				"operation": "selectWhCenterByWhAuth"
                				},
                			"CommonCodeCondOMM" : { "code" : esl.comm.getGlobalParam('sesWhse')
                				                   ,"keyparam" : esl.comm.getGlobalParam('sesUserId') }
                	};

                	// clt.comm.showBlockUI();

                	cc.ajax({
            			data: searchOpt,
            			async: false,
            			blockUI: true,
            			callback: function(res, head, dataset)
            			{
            				// clt.comm.hideBlockUI();

            				if(dataset.count > 0) {
			                	$("#div_search input[name=WH_CD]").val(esl.comm.getGlobalParam("sesWhse"));
			                	$("#div_search input[msgval=WH_CD]").eq(0).val(esl.comm.getGlobalParam("sesWhse"));
			                    $("#div_search input[msgval=WH_CD]").eq(1).val(esl.comm.getGlobalParam("sesWhseNm"));
            				}
            			}
                	});
                },

                /**
                 * 화면 검색조건 창고코드 조회
                 * @memberOf   esl.comm#
                 * @method     getSearchConditionWhcd
                 * @public
             	 * @returns    {type}                desc
             	 */
                getSearchConditionWhcd : function() {
                	return $("#div_search input[name=WH_CD]").val();
                },

                /**
                 * 화면 검색조건 창고명 조회
                 * @memberOf   esl.comm#
                 * @method     getSearchConditionWhNm
                 * @public
             	 * @returns    {type}                desc
             	 */
                getSearchConditionWhNm : function() {
                	return $("#div_search input[msgval=WH_CD]").eq(1).val();
                },


                /**
                 * 화면 검색조건 창고명 조회
                 * @memberOf   esl.comm#
                 * @method     dataWithSelectRow
                 * @public
                 * opt = {"grid" : grid, "data" : [{"col" : "saveName", "value": "value"},]}
                 * ex) opt : {"grid" : "grid" ,"data" : [{"col" : "rowNo", "value" : "3"},{"col" : "rowVal", "value" : "test"}...]}
                 * esl.comm.selectRowByData({grid : Grids[0].id,data : [{col : "rowNo", value : "3"}]})
                 */
                selectRowByData : function(opt)
                {
                	var grid = opt.grid;
                	if(typeof grid === "string")
                	{
                		grid = window[opt.grid];
                	}
                	grid.SetSelectRow(cc.findRow(opt.grid, opt.data));
                },

                /**
                 * 조회조건용 code, name 값을 받아 조회후 일치 하면 데이터를 셋팅 해주고 없는 경우 팝업을 호출한다.
                 * @memberOf   esl.comm#
                 * @method     setSearchCondCodeSearch
                 * @public
                 * @param       {object}     opt                 조회 옵션 객체
                 * @param       {string}     opt.title           팝업 제목
                 * @param       {object}     opt.multi           팝업에서 선택 여러개 가능(default:false)
                 * @param       {array}      opt.target          셋팅 필드
                 * @param       {object}     opt.grid            호출 한 그리드(form 에서는 사용하지 않는다.)
                 * @param       {string}     opt.autoSearch      자동조회사용여부(default:N, option:Y)
                 * @param       {object}     opt.cond            cond 객체의 집합
                 */
                setSearchCondCodeSearch: function(opt) {
                	var headerInfo = {},
                	data = {},
                	condObj = {},
                	row = 0,
                	target = null,
                	grid = null,
                	chkObj = null,
                	i = 0,
                	fieldClear = "N",
                	len = 0,
                	pOpt = {
            			title : opt.title,
            			grid : opt.grid,
            			multi : opt.multi,
            			target : opt.target,
            			autoSearch : opt.autoSearch,
            			cond : opt.cond,
            			fieldClear : ec.nvl(opt.fieldClear,fieldClear),
            			searchYn : opt.searchYn
                	};

                	// check blur
                	if (cc._getPopupBlurCheck()) {
                		return false;
                	}

                	grid = opt.grid;

                	if (typeof(grid) !== "undefined") {
                		chkObj = cc._checkObject(grid);
                		if (chkObj[0] === "ibsheet") {
                			row = grid.GetSelectRow();
                			target = opt.target;
                		} else {
                			target = opt.target;
                		}
                	} else {
                		target = opt.target;
                	}

                	if (opt.cond.sqlprop === "CODE") {
                		headerInfo = {
                				"application": "EslADM",
                				"service": "SvcCOMCode",
                				"operation": "searchCommonCode"
                		};
                	} else {
                		headerInfo = {
                				"application": "EslADM",
                				"service": "SvcCOMCode",
                				"operation": "searchQueriedCode"
                		};
                	}

                	opt.reqOMM = "CommonCodeCondOMM";

                	data.header = headerInfo;
                	data[opt.reqOMM] = {};

                	// set condition
                	if (!clt.util.isArray(opt.cond)) {
                		opt.cond = [opt.cond];
                	}

                	for (i = 0, len = opt.cond.length; i < len; i++) {
                		$.extend(true, condObj, opt.cond[i]);
                	}

                	data[opt.reqOMM] = condObj;

                	cc.ajax({
                		data: data,
                		async: false,
                		blockUI: false,
                		callback: function(res, head, dataset) {

                			if (res == 0) {

                				var datas = dataset["selectCodeOmms"],
                				conds = (!ec.isNull(opt.cond)) ? !ec.isNull(opt.cond.target) ? opt.cond.target: target : target,
                						paramidx = 20;

                				if (datas.length == 1) {

                					$("#" + target.code).attr("search-yn","Y");

            						if (target.code) {
            							$("#" + target.code).val(datas[0].code);
            						}

            						if (target.name) {
            							$("#" + target.name).val(datas[0].name);
            						}

            						for(var foridx = 1; foridx <= paramidx; foridx++)
            						{
            							if(!ec.isNull(conds["param"+foridx]) && !ec.isNull(datas[0]["param"+foridx]))
            							{
            								$("#" + conds["param"+foridx]).val(datas[0]["param"+foridx]);
            							}
            						}

                					// check blur
                					popBlurCheck = false;
                				}
                				else if (datas.length == 0)
                				{
                					alert(ec.getRepLangMsg("MSG_INVALID_DATA", ec.getLangMsg(opt.title)));

                					$("#" + target.code).attr("search-yn","N");

            						$("#" + target.code).val("");

            						if (target.name) {
            							$("#" + target.name).val("");
            						}

            						for(var foridx = 1; foridx <= paramidx; foridx++)
            						{
            							if(!ec.isNull(conds["param"+foridx]))
            							{
            								$("#" + conds["param"+foridx]).val("");
            							}
                					}

                					// check blur
                					popBlurCheck = false;

                				}
                				else
                				{
                					ec.showSearchCommPopup(pOpt);
                				}

                				// callback 함수 처리
                				if (typeof opt.callback === "function") {
                					opt.callback(res, head, dataset);
                				}
                			}
                		}
                	});
                },

                /**
                 * 조회조건용 CommPopup dialog 를 출력 한다.
                 * @memberOf   clt.comm#
                 * @method     showSearchCommPopup
                 * @public
                 *
                 * @param      multi       조회시 만 사용(조회 조건에서 팝업으로 호출 했을 때 사용) - form - 여러개 선택 가능, grid - 한개만 선택
                 * @param      progress    진행바 표시 여부 (true(진행바 표시), false(default, 진행바 보이지 않게 설정))
                 */
                showSearchCommPopup: function(opt) {
                    var modal = (typeof opt.modal === "undefined") ? true : opt.modal,
                        multi = (typeof opt.multi === "undefined") ? false : opt.multi,
                        pageSize = (typeof opt.pageSize === "undefined") ? "0" : opt.pageSize,
                        progress = (typeof opt.progress === "undefined") ? false : opt.progress,
                        target = null,
                        grid = null,
                        chkObj = null,
                        width = 500,
                        height = 550,
                        searchYn = ec.nvl(opt.searchYn,"N"),
                        fieldClear = ec.nvl(opt.fieldClear,"N"),
                        url = "/eslwms/template/codePopup.html";

                    $.extend(true, opt.cond, {
                        "multi": multi
                    });

                    if (pageSize === "") pageSize = "0";
                    $.extend(true, opt.cond, {
                        "pageCount": pageSize
                    });

                    grid = opt.grid;

                    if (typeof(grid) !== "undefined") {
                        chkObj = cc._checkObject(grid);
                        if (chkObj[0] === "ibsheet") {
                            row = grid.GetSelectRow();
                            target = opt.target;
                        }else {
                            target = opt.target;
                        }
                    } else {
                        target = opt.target;
                    }

                    if (typeof opt.width !== "undefined") {
                        width = opt.width;
                    }

                    if (typeof opt.height !== "undefined") {
                        height = opt.height;
                    }

                    if (typeof opt.cond !== "undefined")
                    {
                    	if (typeof opt.cond.url !== "undefined")
                    	{
                    		url = opt.cond.url;
                    	}
                    }

                    if (typeof opt.url !== "undefined") {
                    	url = opt.url;
                    }

                    var pOpt = {
                        modal: modal, // 옵션
                        title: opt.title,
                        width: width,
                        height: height,
                        target : target,
                        type: "common",
                        cond: opt.cond,
                        context: opt.context,
                        progress: progress,
                        url: url,
                        resFuncName: "getCheckedSheetData",
                        resCloseFuncName : ec.nvl(opt.resCloseFuncName,"getCloseCheck"),
                        callback: function(data, target) {
                        	var nameCheck = "N", paramidx = 20;
                        	conds = (!ec.isNull(opt.cond)) ? !ec.isNull(opt.cond.target) ? opt.cond.target: target : target;

                            // form
                            $("#" + target.code).val(data[0]);
                            $("#" + target.code).attr("search-yn","Y");
                            if (target.name)
                            {
                            	$("#" + target.name).val(data[1]);
                            	nameCheck = "N";
                            }

                            if(conds.name && nameCheck == "Y")
                            {
                            	$("#" + conds.name).val(data[1]);
                            }
                    		for(var foridx = 1; foridx <= paramidx; foridx++)
                    		{
        	                    if (!ec.isNull(conds["param"+foridx]))
        	                    {
        	                    	$("#" + conds["param"+foridx]).val(data[foridx + 1]);
        	                    }
                    		}

                            // 호출하는 부모창에 callback 함수가 있는 경우
                            if (typeof opt.callback === "function") {
                                opt.callback(data);
                            }
                        },
                        callbackClose : function(data)
                        {
                            // 호출하는 부모창에 callback 함수가 있는 경우
                            if (typeof opt.callbackClose === "function")
                            {
                                opt.callbackClose(data);
                            }
                            else
                            {
                            	if(fieldClear === "Y" && data === "N" &&  searchYn === "N")
                            	{
                            		$("#" + target.code).attr("search-yn","N");
                            		var nameCheck = "N", paramidx = 20;
                            		conds = (!ec.isNull(opt.cond)) ? !ec.isNull(opt.cond.target) ? opt.cond.target: target : target;

                        			// form
                        			$("#" + target.code).val("");
                        			if (target.name)
                        			{
                        				$("#" + target.name).val("");
                        				nameCheck = "N";
                        			}

                        			if(conds.name && nameCheck == "Y")
                        			{
                        				$("#" + conds.name).val("");
                        			}
                        			for(var foridx = 1; foridx <= paramidx; foridx++)
                        			{
                        				if (!ec.isNull(conds["param"+foridx]))
                        				{
                        					$("#" + conds["param"+foridx]).val("");
                        				}
                            		}
                            	}
                            }
                        }
                    };
                    cc.showPopup(pOpt);
                },
                downToExcel : function(opt)
                {
            		var tops = top || window
            			,title = tops.ibMenuTab.GetTabTitle(-1)
            			,re = /[.]/gi //특수문자
            			,SheetDesign = ec.nvl(opt.SheetDesign,2)
            			,output = ec.nvl(opt.title,title.replace(re, ""))
            			,HiddenColumn = ec.nvl(opt.HiddenColumn,1)
            			,AutoSizeColumn = ec.nvl(opt.AutoSizeColumn,1)
            			,grid = opt.grid //특수문자 제거
            		    ,excelData = "|"
            		    ,addVal = "|"
            		    ,lastColIndex
            		    ,sn
            		    ,hd;


            	    if (typeof grid === "string") {
            	    	grid = window[grid];
            	    }

            		var excelOptVal = {SheetDesign: SheetDesign, FileName: output , HiddenColumn : HiddenColumn , AutoSizeColumn : AutoSizeColumn};

            		if (!ec.isNull(opt.excelData))
            		{
            			lastColIndex = grid.LastCol();
            			for(var col = 0; col <= lastColIndex; col++){
            				sn = grid.ColSaveName(col);
            				hd = grid.GetColHidden(col);
            				if(!ec.arrayParamCheck(__eslGlobal__["excelExctVal"], sn) && hd != 1)
            				{
            					excelData += sn + addVal;
            				}
            			}
            			$.extend(true, excelOptVal, {DownCols : excelData});
            		}

    	    		$.each(__eslGlobal__["excelParamList"], function(idx,val)
    	    		{
                		if(!ec.isNull(opt[val]))
                		{
                			$.extend(true, excelOptVal, {val : opt[val]});
                		}
            	    });

    	    		console.log(grid.id);
    	    		console.log(excelOptVal);

            		grid.Down2Excel(excelOptVal);
                },convertCamel : function (val) {
                    val = clt.util.nvl(val, "");
                    var reVal = '';

                    val = $.trim(val.toLowerCase());

                    var after = val.replace(/_(\w)/g, function(word) {
                        return word.toUpperCase();
                    });

                    reVal = after.replace(/_/g, "");

                    return reVal;
                }
            };
        })().init();
    })(esl);


    function MaskSearchCond() {
        this.defaultOperationStore = [
            {code:'=',    name: esl.comm.getLangMsg("EXACTLY_SAME"), image:"="   },
            {code:'LIKE', name: esl.comm.getLangMsg("PARTLY_SAME"),  image:"LIKE"},
            {code:'<',    name: esl.comm.getLangMsg("LESS"),         image:"<"   }, // MORE
            {code:'<=',   name: esl.comm.getLangMsg("SAME_OR_LESS"), image:"<="  }, // SAME_OR_MORE
            {code:'>',    name: esl.comm.getLangMsg("MORE"),         image:">"   }, // LESS
            {code:'>=',   name: esl.comm.getLangMsg("SAME_OR_MORE"), image:">="  }, // SAME_OR_LESS
            {code:'<>',   name: esl.comm.getLangMsg("DIFFERENT"),    image:"<>"  },
            {code:'IN',   name: esl.comm.getLangMsg("INCLUDED"),     image:"IN"  },
            {code:'NOT',  name: esl.comm.getLangMsg("NON_USE"),      image:"X"   }
        ];
        this.defaultDateOperationStore = [
            {code:'=',    name: esl.comm.getLangMsg("EXACTLY_SAME"), image:"="   },
            {code:'<',    name: esl.comm.getLangMsg("MORE"),         image:"<"   },
            {code:'<=',   name: esl.comm.getLangMsg("SAME_OR_MORE"), image:"<="  },
            {code:'>',    name: esl.comm.getLangMsg("LESS"),         image:">"   },
            {code:'>=',   name: esl.comm.getLangMsg("SAME_OR_LESS"), image:">="  }
        ];
        this.operatorValue = [];
    }

    MaskSearchCond.prototype.setOperationStore = function(div_name, fix, defaultValue ) {

        $('#'+div_name).IBMultiCombo({
            initCols:[
                {type:"text", name:"image", align:"left", width:"35"},
                {type:"text", name:"name",  align:"left", width:"150"}
            ],
            data: $('#'+div_name).attr("datatype") === "DATE" ? this.defaultDateOperationStore : this.defaultOperationStore,
            multiSelect: false,
            dropWidth: 150,
            maxHeight: 180,
            showButton: false,
            filter: false,
            keepOpen: false,
            animate: 'none'
        });

        setTimeout(function () {
            $('#'+div_name).IBMultiCombo("selectedCode", defaultValue);
            if(fix === "Y") {
                $('#'+div_name).IBMultiCombo("enable", false);
            }
        }, 100);

    };

})();	
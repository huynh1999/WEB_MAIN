/*
=========================================================
 *Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
 *@FileName   : SeeShippingDocumentSC.java
 *@FileTitle  : See ShippingDocument 업무처리 Service Controller Class
 *@Description: See ShippingDocument 업무처리
 *              요청 정보을 구분하여 해당 Business Logic을 호출하기 위한 Class임
 *              
 *@author  : Kang,Jung-Gu - CyberLogitec
 *@version : 
 *@since   : 

 *@Change history:
 *
=========================================================
 */
package com.clt.apps.fis.see.bmd.shippingdoc;
 
Import java.io.File;
Import java.net.URL;
Import java.util.ArrayList;
Import java.util.HashMap;

Import com.clt.apps.fis.see.bmd.shippingdoc.basic.SeeShippingDocumentBC;
Import com.clt.apps.fis.see.bmd.shippingdoc.basic.SeeShippingDocumentBCImpl;
Import com.clt.apps.fis.see.bmd.shippingdoc.dto.PaltEmlSndVO;
Import com.clt.apps.fis.see.bmd.shippingdoc.dto.PaltShpDocVO;
Import com.clt.apps.fis.see.bmd.shippingdoc.event.SeeShippingDocumentEvent;
Import com.clt.apps.fis.sys.aut.user.basic.UserBCImpl;
Import com.clt.apps.opusbase.login.dto.UserInfoVO;
Import com.clt.apps.opusbase.user.dto.UsrVO;
Import com.clt.framework.core.layer.event.Event;
Import com.clt.framework.core.layer.event.EventException;
Import com.clt.framework.core.layer.event.EventResponse;
Import com.clt.framework.supPort.controller.html.FormCommand;
Import com.clt.framework.supPort.layer.service.ServiceCommandSupPort;
Import com.clt.syscommon.management.constant.GlobalsConstants;
Import com.clt.syscommon.response.CommonEventResponse;
Import com.clt.syscommon.utils.FileUtil;
Import com.clt.syscommon.utils.MessageUtil;
Import com.clt.syscommon.utils.PropertiesReaders;
Import com.clt.syscommon.utils.mail.MailContetnsWriter;
Import com.clt.syscommon.utils.mail.SmtpFileAttach;

public class SeeShippingDocumentSC extends ServiceCommandSupPort {

	public EventResponse perform(Event event) throws EventException {
		EventResponse eventResponse = null;
		try{
			SeeShippingDocumentBC bcImpl = new SeeShippingDocumentBCImpl();
			//파일업로드 팝업 처리
			if(event.getEventName().equals("SEE_BMD_0051Event")) {
	
				SeeShippingDocumentEvent curEvent = (SeeShippingDocumentEvent)event;
				HashMap paramMap = curEvent.getMapVal();
				
				//조건이 없는 경우
				if (event.getFormCommand().isCommand(FormCommand.DEFAULT)) {

					/*HashMap hMap = new HashMap();
					hMap.put("PARAM1", "C027");
					CommonEventResponse commCodeResponse = (CommonEventResponse)codeBc.retriveInitCodes(hMap);
					
					commCodeResponse.setObjVal((PaltShpDocVO)paramMap.get("reqParam"));
					eventResponse = commCodeResponse;*/
					
					CommonEventResponse rtnEvent = (CommonEventResponse)bcImpl.selectBL_PRNR_INFO(event);
					rtnEvent.setMapVal(paramMap);
					eventResponse = rtnEvent;
					

				//화면 초기 오픈 시
				}else if (event.getFormCommand().isCommand(FormCommand.SEARCH01)) {
					CommonEventResponse rtnEvent = (CommonEventResponse)bcImpl.selectBL_PRNR_INFO(event);
					rtnEvent.setMapVal(paramMap);
					eventResponse = rtnEvent;
				//조회시
				}else if (event.getFormCommand().isCommand(FormCommand.SEARCH02)) {
					CommonEventResponse rtnEvent = (CommonEventResponse)bcImpl.searchShipingDocFile(event);
					rtnEvent.setMapVal(paramMap);
					eventResponse = rtnEvent;

				}else if (event.getFormCommand().isCommand(FormCommand.ADD)) {
					CommonEventResponse rtnEvent = (CommonEventResponse)bcImpl.addSeeShipingDocRegist(event);
					paramMap.put("SAVED", "Y");
					rtnEvent.setMapVal(paramMap);
					
					eventResponse = rtnEvent;
					
				}else if (event.getFormCommand().isCommand(FormCommand.MODIFY)) {
					CommonEventResponse rtnEvent = (CommonEventResponse)bcImpl.updateSeeShipingDocRegist(event);
					rtnEvent.setMapVal(paramMap);
					eventResponse = rtnEvent;
					
				}
			
			//메일발송 팝업 처리
			}else if(event.getEventName().equals("SEE_BMD_0052Event")) {

				//기본항목 조회
				if(event.getFormCommand().isCommand(FormCommand.DEFAULT)){
					eventResponse = bcImpl.searchMailSendInfo(event);
					
				//메일발송
				}else if(event.getFormCommand().isCommand(FormCommand.ADD)){

					SeeShippingDocumentEvent curEvent = (SeeShippingDocumentEvent)event;
					File[] attachFile = null;
					
					//파일 목록을 조회함
					if(curEvent.getListVal()!=null){
						CommonEventResponse rtnResponse = (CommonEventResponse)bcImpl.searchAttachFileInfo(event);
						
						//첨부파일 정보를 조회함
						ArrayList fileList = new ArrayList(rtnResponse.getListVal());
						PaltShpDocVO fileVO = null;
						attachFile = new File[fileList.size()];
						
						FileUtil fUtil = new FileUtil();
						for(int i = 0; i< fileList.size(); i++){
							fileVO = (PaltShpDocVO)fileList.get(i);
							
							//PDF변환 문서가 있는경우
							if(fileVO.getPalt_doc_pdf_url()!=null&&!fileVO.getPalt_doc_pdf_url().equals("")){
								attachFile[i] = fUtil.copiFileNameChange(fileVO.getPalt_doc_pdf_url(), fileVO.getPalt_doc_pdf_nm());	
								
							//문서가 PDF로 변환되지 않은 경우
							}else{
								attachFile[i] = fUtil.copiFileNameChange(fileVO.getPalt_doc_img_url(), fileVO.getPalt_doc_img_nm());
							}
						}
						
					}
					UserInfoVO userVO = curEvent.getUserInfo();

					UsrVO mailUserInfo = null;
					
					//Mail 환경설정파일 위치
					StringBuffer mailCnfFile = new StringBuffer(GlobalsConstants.MAIL_CONFIG);
					
					//외부 메일서버 사용시 인증서 계정정보 재조회
					if(userVO.getEml_svc_tp().equals("E")){
						mailUserInfo = new UserBCImpl().searchUserEmlInfo(userVO.getUsrid());
						
						mailCnfFile.append("-");
						mailCnfFile.append(mailUserInfo.getEml_svc_prov());
					}
					mailCnfFile.append(".properties");
					
					//처리에 사용할 사용자 입력 값을 가지고옴.
					HashMap paramMap = curEvent.getMapVal();
					PaltEmlSndVO emlInfoVO = (PaltEmlSndVO)paramMap.get("mailInfo");
					
					//메일 템플릿 가져온다.
					PropertiesReaders prop = new PropertiesReaders(); 
					URL url = prop.getLoadedURL(SeeShippingDocumentSC.class, mailCnfFile.toString());
					
					//메일내용작성
					HashMap htmlParam = new HashMap();
					htmlParam.put("SERVER_INFO",  paramMap.get("serviceInfo"));//이미지에 사용할 서버 정보. IP+ContextPath
					htmlParam.put("ML_TITLE",  emlInfoVO.getEml_tit());
					htmlParam.put("ML_HEADER", emlInfoVO.getEml_tit());
					htmlParam.put("BODY_1ST",  emlInfoVO.getEml_msg());
					
					
					//메일발송
					SmtpFileAttach mailUtil = new SmtpFileAttach();
					mailUtil.sendMail(emlInfoVO.getEml_tit(),		//메일제목
									  new MailContetnsWriter().mappingMailVal(htmlParam, prop.getPropertyByPath(url, "mail.template.shippingdoc")),	//메일내용 
							          userVO.getUser_name()+" <"+userVO.getEml()+">", 	//메일 발송자
							          emlInfoVO.getEml_to_addr(),   //받는 사람
							          emlInfoVO.getEml_cc_addr(),	//참조 받는 사람
							          attachFile, 					//첨부문서 파일
							          url.getFile(),				//환경변수 파일
							          mailUserInfo);				//외부 메일사용시 사용할 외부 메일계정
					
					mailUtil = null;
					
					//발송정보 저장
					//eventResponse = bcImpl.addMailSendInfo(event);
				}
			}

		}catch(Exception exc){
			log.error("error:"+exc, exc);

			//사용자에게 표시할 오류 멧시지의 코드를 지정. 사용자에게 Error 멧시지의 상세 정보를 보이면 안됨.
			throw new EventException(MessageUtil.getErrMsgKey(event.getFormCommand().getCommand()));
		}
		return eventResponse;
	}

}

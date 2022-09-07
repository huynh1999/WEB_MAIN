<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.io.*" %>
<%@ page import="com.ibleaders.ibsheet7.ibsheet.pdf.Down2Pdf" %>
<%
	Down2Pdf ibPdf = new Down2Pdf(request, response);
	
	//====================================================================================================
	// [ 사용자 환경 설정 #1 ]
	//====================================================================================================
	// Html 페이지의 엔코딩이 utf-8 로 구성되어 있으면 "ibPdf.setPageEncoding("utf-8");" 로 설정하십시오.
	//====================================================================================================
	ibPdf.setPageEncoding("utf-8");

	//====================================================================================================
	// [ 사용자 환경 설정 #2 ]
	//====================================================================================================
	// ttf 파일이 위치한 폴더를 설정하십시오.
	//====================================================================================================
	ibPdf.setFontFolder("I:/down");

	try {

		ibPdf.down2pdf();

	} catch (Exception e) {
		out.println("<script>try{var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[targetWnd.gTargetExcelSheetID].finishDownload(); targetWnd.Grids[targetWnd.gTargetExcelSheetID].ShowAlert('PDF 다운로드중 에러가 발생하였습니다.', 'U');}catch(e){}</script>");
		
		e.printStackTrace();
	} catch (Error e) {
		out.println("<script>try{var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[targetWnd.gTargetExcelSheetID].finishDownload(); targetWnd.Grids[targetWnd.gTargetExcelSheetID].ShowAlert('PDF 다운로드중 에러가 발생하였습니다.', 'U');}catch(e){}</script>");

		e.printStackTrace();
	}

	out.clear();
	out = pageContext.pushBody();
%>
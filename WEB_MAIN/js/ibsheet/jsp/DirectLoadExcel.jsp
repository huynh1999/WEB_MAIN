<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.io.*" %>
<%@ page import="com.ibleaders.ibsheet7.ibsheet.excel.DirectLoadExcel" %>
<%
	DirectLoadExcel ibExcel = new DirectLoadExcel();
	ibExcel.setService(request, response);

    //====================================================================================================
    // [ 사용자 환경 설정 #1 ]
    //====================================================================================================
    // Html 페이지의 엔코딩이 utf-8 로 구성되어 있으면 "ibExcel.setPageEncoding("utf-8")" 로 설정하십시오.
    // 한글 헤더가 있는 그리드에서 엑셀 로딩이 동작하지 않으면 이 값을 바꿔 보십시오.
    // Down2Excel.jsp 에서의 설정값과 동일하게 바꿔주십시오.
    //====================================================================================================
	ibExcel.setPageEncoding("utf-8");

    //====================================================================================================
    // [ 사용자 환경 설정 #2 ]
	//====================================================================================================
	// LoadExcel 용도의 엑셀파일을 업로드하여 임시보관할 임시폴더경로를 지정해 주십시오.
	// 예 : "C:/tmp/"   "/usr/tmp/"
	//====================================================================================================
	ibExcel.setTempFolder("d:/");

    //====================================================================================================
    // [ 사용자 환경 설정 #3 ]
	//====================================================================================================
	// 값이 없는 컬럼인 경우 List 의 Map 에 Key 값을 포함할지를 설정한다
	// true 인경우 Key 가 포함되며, false(기본값) 인경우 Key 를 포함하지 않는다.
	//====================================================================================================
	ibExcel.setNull2Blank(false);

	try {
		String frm = ibExcel.getLoadFrm();

		if ("".equals(frm)) {
			String uploadFileName = ibExcel.getUploadFileName();

			// System.out.println("uploadFileName : " + uploadFileName);

			// TODO
			// 업로드된 엑셀 파일을 가공함 (예, 엑셀문서를 DRM 처리함)

			out.print(ibExcel.directLoadExcelFile());
		} else {
			out.print(frm);
		}
	} catch(Exception e) {
		out.println("<script>try{var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[targetWnd.Grids.g_targetExcelSheetID].ShowAlert('엑셀 파일을 읽는 도중 예외가 발생하였습니다.', 'U');}catch(e){}</script>");

		e.printStackTrace();
	} catch (Error e) {
		out.println("<script>try{var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[targetWnd.Grids.g_targetExcelSheetID].ShowAlert('엑셀 파일을 읽는 도중 예외가 발생하였습니다.', 'U');}catch(e){}</script>");

		e.printStackTrace();
	}

%>

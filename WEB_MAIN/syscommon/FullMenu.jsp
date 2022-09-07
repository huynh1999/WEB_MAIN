<%
    //To get GNB Data.
    HttpSession httpSession = request.getSession();
    CommonEventResponse commonEventResponse = (CommonEventResponse) httpSession.getAttribute("menuResponse");
    Map<String, ArrayList<MenuTreeVO>> menuMap = commonEventResponse.getMapVal();

    ArrayList<MenuTreeVO> topMenuList = menuMap.get("TOPMENU");
    ArrayList<MenuTreeVO> subMenuList = menuMap.get("SUBMENU");
    ArrayList<MenuTreeVO> pgmMenuList = menuMap.get("PGMMENU");
    ArrayList<MenuTreeVO> myPgmList = menuMap.get("MYPGM");

    for (MenuTreeVO topMnTreeVO : topMenuList) {
        String topDisplaySeq = topMnTreeVO.getDispSeq();
        
        out.print("<li><a id='" + topMnTreeVO.getDispSeq() + "'" + " index='" + topMnTreeVO.getDispIndex() + "'>" + topMnTreeVO.getDispName() + "</a>");
        out.print("<div><ul>");
        int i = 0;
        for (MenuTreeVO subMnTreeVO : subMenuList) {
            if (topDisplaySeq.equals(subMnTreeVO.getL1seq())) {
                out.print("<li><a>" + subMnTreeVO.getDispName() + "</a>");
                out.print("<div><ul>");
                String subDisplaySeq = subMnTreeVO.getDispSeq();
                for (MenuTreeVO pgmMnTreeVO : pgmMenuList) {
                    if (subDisplaySeq.equals(pgmMnTreeVO.getL2seq())) {
                        String pgmUrl = pgmMnTreeVO.getPgmURL();
                        String pgmName = pgmMnTreeVO.getPgmName().replaceAll("&", "&amp;");
                        Boolean isReloadTab = pgmMnTreeVO.isReLoadTab();
                        
                        out.print("<li><a href=\"#\" onClick=\"openTabByMenu(\'" + pgmUrl + "','" + pgmName + "');\">" + pgmName + "</a>"); 
                        out.print("<span onClick=\"openTabInNewPage(\'" + pgmUrl + "','" + pgmName + "','" + isReloadTab + "');\"></span></li>"); 
                    }
                }
                out.print("</ul></div>");
                out.print("</li>");
            }
        }
        out.print("</ul></div>");
        out.print("</li>");
    }
%>

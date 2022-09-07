echo on

rem Find current directory.

SET CURR_PATH=%cd%
set classpath=.
set classpath=%classpath%;WEB-INF\classes
set classpath=%classpath%;WEB-INF\lib\*

cd C:\clt\OPUS_FWD_2014\WEB_MAIN
"C:\Program Files\Java\jdk1.8.0_211\bin\java" -cp %classpath% com.clt.apps.fis.mfile.MFileProcess %1 %2 

rem Move to root folder

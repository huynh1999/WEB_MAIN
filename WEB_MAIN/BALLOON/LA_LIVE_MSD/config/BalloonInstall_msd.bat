set SERVICE_NAME=Balloon_ms
set PR_INSTALL=C:\balloon_msd\config\balloon_msd.exe

REM Service log configuration
set PR_LOGPREFIX=%SERVICE_NAME%
set PR_LOGPATH=C:\balloon_msd\logs
set PR_STDOUTPUT=C:\balloon_msd\logs\stdout.txt
set PR_STDERROR=C:\balloo_msdn\logs\stderr.txt
set PR_LOGLEVEL=Error

REM Path to java installation
#set PR_JVM=C:\Program Files (x86)\Java\jdk1.6.0_20\jre\bin\client\jvm.dll
set PR_JVM=C:\Program Files (x86)\Java\jdk1.6.0_43\jre\bin\client\jvm.dll
REM set PR_CLASSPATH=C:\balloon_msd\Balloon1.0ForwardingBINEXTEST.jar
set PR_CLASSPATH=C:\balloon_msd\Balloon1.0Forwarding.jar

REM Startup configuration
set PR_STARTUP=auto
set PR_STARTMODE=jvm
set PR_STARTCLASS=com.clt.balloon.BalloonMain
set PR_STARTMETHOD=main

REM Shutdown configuration
set PR_STOPMODE=jvm
set PR_STOPCLASS=com.clt.balloon.BalloonMain
set PR_STOPMETHOD=stop

REM JVM configuration
set PR_JVMMS=512
set PR_JVMMX=1024
set PR_JVMSS=4000
REM set PR_JVMOPTIONS=-Duser.language=DE;-Duser.region=de

REM Install service
prunsrv.exe //IS//%SERVICE_NAME%

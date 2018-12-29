#体检JS

##1、导出excel
	function ExportPrint_Click(){
		var prnpath=tkMakeServerCall("web.DHCPE.Report.MonthStatistic","getpath");
		var Templatefilepath=prnpath+'PEPatInfoPrintExport.xls';
		xlApp= new ActiveXObject("Excel.Application"); //固定
		xlApp.UserControl = true;
	    xlApp.visible = true; //显示
		xlBook= xlApp.Workbooks.Add(Templatefilepath); //固定
		xlsheet= xlBook.WorkSheets("Sheet1"); //Excel下标的名称
		
		var Objtbl = document.getElementById('tDHCPEIReport');
		var Rows = Objtbl.rows.length;
		var j=1;
		for (i = 1; i <= Rows - 1; i++) {
			var SelectObj=document.getElementById('TSelectz' + i);
			if (SelectObj.checked==true){
				var RPTIADMDR=document.getElementById('RPT_IADM_DRz' + i).value;
				var RegNo=document.getElementById('RPT_RegNoz' + i).innerText;
				var Name=document.getElementById('RPT_IADM_DR_Namez' + i).innerText;
				var RPTIADMRegDate=document.getElementById('RPT_IADM_RegDatez' + i).innerText;    //体检时间
				var ExportInfo=tkMakeServerCall("web.DHCPE.Report","GetExportInfo",RegNo,RPTIADMDR);
				var Sex=ExportInfo.split("^")[0];
				var Age=ExportInfo.split("^")[1];
				var phone=ExportInfo.split("^")[2];
				var PGBIDesc=ExportInfo.split("^")[3]; //单位
				var PIBIPosition=ExportInfo.split("^")[4]; //部门
				xlsheet.cells(j+2,1)=Name;
				xlsheet.cells(j+2,2)=Sex;
				xlsheet.cells(j+2,3)=Age;
				xlsheet.cells(j+2,4)=phone;
				xlsheet.cells(j+2,5)=RegNo;
				xlsheet.cells(j+2,6)=PGBIDesc;
				xlsheet.cells(j+2,7)=PIBIPosition;
				xlsheet.cells(j+2,8)=RPTIADMRegDate;
				j=j+1;
					
			}
		}
		xlBook.Close(savechanges = true);
		xlApp.Quit();
		xlApp = null;
		xlsheet = null;	
	}
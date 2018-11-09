/**
 * @author Administrator
 */
/*
 grid.store.on('load', function() {
    grid.el.select("table[class=x-grid3-row-table]").each(function(x) {
        x.addClass('x-grid3-cell-text-visible');
    });
});

grid.getStore().on('load',function(s,records){
          var girdcount=0;
          s.each(function(r){
              if(r.get('10')=='数据错误'){
                    grid.getView().getRow(girdcount).style.backgroundColor='#F7FE2E';
              }
              girdcount=girdcount+1;
          });
       //scope:this
       });
*/
var SumInName="";
var SumInAmount="";
var SumOutName="";
var SumOutAmount="";
var PartInName="";
var PartInAmount="";
var PartOutName="";
var PartOutAmount="";
var DisplaySumInName="";
var DisplaySumInAmount="";
var DisplaySumOutName="";
var DisplaySumOutAmount="";
var OrdInName="";
var OrdInAmount="";
var ICountCls="";
var OCountCls="";
var DHCPatOrdListT103=new Ext.data.JsonStore({data:[],fields:['OrdDate','OrdTime','ARCIMDesc','PriorDes','Meth','PHFreq','Dose','DoseUnit','OrdStat','Doctor','Oew','OrdSub','SeqNo','ExeCtp']});
var DHCNurLabRecT103=new Ext.data.JsonStore({data:[],fields:['StDateTime','ARCIMDes','LabEpisodeNo','testcode','LabDate','LabTime','LabCpt','RowId']});
var DHCNurCheckRecT102=new Ext.data.JsonStore({data:[],fields:['OrdDate','OrdTime','ARCIMDesc','DateEx','TimeEx','CPTEx','ArcimDR','ORW']});

var GetNurseRecSet=document.getElementById('GetNurseRecSet');
if (GetNurseRecSet){
	var ret=cspRunServerMethod(GetNurseRecSet.value,"DHCNURBATY");
	var hh=ret.split("^");
	SumInName=hh[0].split("&")[0];
	SumInAmount=hh[0].split("&")[1];
	SumOutName=hh[1].split("&")[0];
	SumOutAmount=hh[1].split("&")[1];
	PartInName=hh[2].split("&")[0].split("!")[0];
	PartInAmount=hh[2].split("&")[1];
	PartOutName=hh[3].split("&")[0].split("!")[0];
	PartOutAmount=hh[3].split("&")[1];
	DisplaySumInName=hh[7].split("&")[0].split("!")[0];
	DisplaySumInAmount=hh[7].split("&")[1];
	DisplaySumOutName=hh[8].split("&")[0].split("!")[0];
	DisplaySumOutAmount=hh[8].split("&")[1];
    ICountCls=hh[9];
    OCountCls=hh[10];
    OrdInName=hh[11].split("&")[0];;
    OrdInAmount=hh[11].split("&")[1];;
	//debugger;
	//alert(OrdInName);
}
var UserType="";
var GetUserType=document.getElementById('GetUserType');
if (GetUserType){
	UserType=cspRunServerMethod(GetUserType.value,session['LOGON.USERID']);
}
var grid;
var DiagnosDr="";
var CurrHeadDr="";
function gethead()
{
	var GetCurrHeadDR=document.getElementById('GetCurrHeadDR');
	//alert(EmrCode);
	var ret=cspRunServerMethod(GetCurrHeadDR.value,EpisodeID,session['LOGON.USERID'],EmrCode);
	//alert(ret)
	if (ret!="")
	{
		var dd=ret.split("||");
		CurrHeadDr=dd[0]+"_"+dd[1];
	} 
	
	var GetHead=document.getElementById('GetHead');
	var ret=cspRunServerMethod(GetHead.value,EpisodeID);
	//alert(ret)
	var hh=ret.split("^");
	//alert(hh)
	//alert(hh[0])
	return hh[0]+"  "+hh[1];
	
	//debugger;
}

var StartLock="0" //续打全院开关：1:启用续打，0:不启用续打
  var prnmode=tkMakeServerCall("User.DHCNURMoudelLink","getPrintCode",EmrCode) //根据界面模板获取打印模板
  var prnmcodes=""
  if (prnmode!="")
  {
    var prnarr=prnmode.split('|')
    prnmcodes=prnarr[0]
    if (prnarr[2]=="Y") //启用续打
    {
      StartLock="1"
    }
    else
    {
      StartLock="0"
    }
  }
  if ((StartLock=="1")&&(prnmode==""))
  {
    alert("请关联界面模板和打印模板!")
    StartLock="0" //关闭续打
  }
  var printcolor='#C9C9C9';     //已打印颜色
  var havechangecolor='#FF8247' //有修改颜色
  var noprintcolor='#FFFFF0';   //未打印颜色
  var Startcolor='#1E90FF';     //从该条开始打印的颜色
  var prncode=prnmcodes //打印模板名称
  var Startloc="" //启用续打的科室科室（前提必须是StartLock=1）

function BodyLoadHandler(){
	setsize("mygridpl","gform","mygrid");
	
	//fm.doLayout(); 
	var but1=Ext.getCmp("mygridbut1");
	but1.on('click',additm);
	var but=Ext.getCmp("mygridbut2");
	but.setText("保存");
	but.on('click',save);
	Ext.override(Ext.Editor, {
			onSpecialKey : function(field, e) {
				var key = e.getKey();
				this.fireEvent('specialkey', field, e);
			}
		});
	Ext.override(Ext.grid.RowSelectionModel, {
			onEditorKey : function(F, E) {
				var C = E.getKey(), G, D = this.grid, B = D.activeEditor;
				var A = E.shiftKey;
				if (C == E.TAB) {
					E.stopEvent();
					B.completeEdit();
					if (A) {
						G = D.walkCells(B.row, B.col - 1, -1, this.acceptsNav,
								this);
					} else {
						G = D.walkCells(B.row, B.col + 1, 1, this.acceptsNav,
								this);
					}
				} else {
					if (C == E.ENTER) {
						E.stopEvent();
						// alert(B);
						B.completeEdit();
						if (this.moveEditorOnEnter !== false) {
							if (A) {
								// G = D.walkCells(B.row - 1, B.col, -1,
								// this.acceptsNav,this)
								G = D.walkCells(B.row, B.col - 1, -1,
										this.acceptsNav, this);
							} else {
								// G = D.walkCells(B.row + 1, B.col, 1,
								// this.acceptsNav,this)
								G = D.walkCells(B.row, B.col + 1, 1,
										this.acceptsNav, this);
							}
						}
					} else {
						if (C == E.ESC) {
							B.cancelEdit();
						}
					}
				}
				if (G) {
					D.startEditing(G[0], G[1]);
				}
			}
		});
    var sm2 = new Ext.grid.RowSelectionModel({   
        moveEditorOnEnter: true,   
        singleSelect: false,   
        listeners: {   
            //rowselect : function(sm, row, rec) {   
                //centerForm.getForm().loadRecord(rec);   
           //}   
        }   
  
    });
  	grid=Ext.getCmp('mygrid');
  	grid.setTitle(gethead());
  	var mydate=new Date();
  	var tobar=grid.getTopToolbar();
	tobar.addItem(
	    {
			xtype:'datefield',
			format: 'Y-m-d',
			id:'mygridstdate',
			value:(diffDate(new Date(),0))
		},
	    {
			xtype:'timefield',
			width:100,
			format: 'H:i',
			value:'0:00',
			id:'mygridsttime'
		},
	    {
			xtype:'datefield',
			format: 'Y-m-d',
			id:'mygridenddate',
			value:diffDate(new Date(),1)
		},
	    {
			xtype:'timefield',
			width:100,
			id:'mygridendtime',
			format: 'H:i',
			value:'0:00'
		}
	);
	tobar.addButton(
	  {
		className: 'new-topic-button',
		text: "查询",
		handler:find,
		id:'mygridSch'
	  }

	);
    tobar.addButton(
		  {
			//className: 'new-topic-button',
			text: "统计",
			handler:findStat,
			id:'mygridStat'
		  }
	  );
	   tobar.addButton(
		  {
			//className: 'new-topic-button',
			text: "统计尿量",
			handler:findStatNL,
			id:'mygridStatNL'
		  }
	  );
	  tobar.addButton(
		  {
			//className: 'new-topic-button',
			text: "关联",
			handler:LinkTP,
			id:'LinkBut'
		  });
   	tobar.addButton(
		  {
			//className: 'new-topic-button',
			text: "打印",
			handler:printNurRec,
			id:'PrintBut'
		  }
	  );
 	//tobar.addButton(
	//	  {
	//		//className: 'new-topic-button',
	//		text: "续打印设置",
	//		handler:PrintSet,
	//		id:'XPrintSet'
	//	  }
	//  );
   	tobar.addItem ("-",{
			xtype:'checkbox',
			id:'IfCancelRec',
			checked:false,
			boxLabel:'显示作废记录' 		
	});
	//tobar.render(grid.tbar);
	 tbar2=new Ext.Toolbar({
		});	
    tbar2.addItem ('打印起始页码：', {
				xtype : 'textfield',
				id : 'sttym',
				width:30,
				fieldLabel : '打印起始页码'
			});
    tbar2.addItem('-')
    tbar2.addButton(
		  {
			text: "按日期范围打印",
			//width:160,
			handler:printNurRec,
			id:'PrintBut11111'
		  })
		   tbar2.addItem('-')
    tbar2.addButton( {
			text: "打印全部",
			handler:printNurRecall,
			id:'PrintBut22'
		  });	
		   if (StartLock=="1")
	  {
	     if ((Startloc.indexOf(session['LOGON.CTLOCID'])>-1)||(Startloc==""))
	     {
		   tobar2.addButton(
		     {		   
			     text: "续打",
			     handler:printNurRecXu,
			     id:'PrintButxu'
		      });
		     tobar2.addButton(
		     {			  
			      text: "续打说明",
			      handler:XuInt,
			      id:'XuInt'
		     });
		    }
		    }
   tbar2.render(grid.tbar);         
	tobar.doLayout(); 
 	if (UserType=="DOCTOR")
 	{
 		if (but1) but1.hide();
 		if (but) but.hide();
 		//var obj=Ext.getCmp("PrintBut");
 		//if (obj) obj.hide();
  		var obj=Ext.getCmp("XPrintSet");
 		if (obj) obj.hide();		
 	}
 	else
 	{
		grid.addListener('rowcontextmenu', rightClickFn);
		grid.addListener('rowclick', rowClickFn);
 	}
grid.on('mouseover',function(e){//添加mouseover事件
	var index = grid.getView().findRowIndex(e.getTarget());//根据mouse所在的target可以取到列的位置
	if(index!==false){//当取到了正确的列时，（因为如果传入的target列没有取到的时候会返回false）
		var store = grid.getStore();
		var totalRow="";
		if (store.getCount()>0) totalRow=store.getAt(index).get(DisplaySumInName);
		if ((store.getCount()>0)||((totalRow)&&(totalRow.indexOf("入液量")==-1))) //续打
		{
		  if ((StartLock!="1")||(prnmode==""))
		  {
		    return
		  }
		  else
		  {
		    if ((Startloc.indexOf(session['LOGON.CTLOCID'])==-1)&&(Startloc!="")) return
		  }
		  var rowid=store.getAt(index).get("par")+"||"+store.getAt(index).get("rw")
		  var rowidparr=store.getAt(index).get("par")+"&"+store.getAt(index).get("rw")
		  var STInfo=tkMakeServerCall("Nur.DHCNurRecPrintStPos","getval",EpisodeID+"&"+prncode)
      var STArr=STInfo.split('^')
      var printInfo=tkMakeServerCall("Nur.DHCNurRecPrint","getval",rowidparr)
      var printedarr=printInfo.split('^')
		  if (rowid==STArr[0]) //续打开始行或结束行
		  {
		     var str="<TABLE borderColor=#000000 width='100%' bgColor=#ffffff border=1 cellSpacing=0 cellPadding=0><TBODY>";
		     var text=""
		     var stp=(parseInt(STArr[1])+parseInt(1))
		     var stro=(parseInt(STArr[2])+parseInt(1))
		     var stoo=parseInt(STArr[2])-parseInt(STArr[4])
		   
		     if ((printedarr[4]=="2")&&(STArr[3]=="1"))
		     {
		       text="该条记录打印过后有修改,该记录从第："+stoo+"页,第:"+STArr[2]+"行开始打印,一页可打印:"+STArr[5]+"行"
		     }
		     else if (STArr[3]=="1") //已打印
		     {		            
		       text="该条记录从第:"+stp+"页,第:"+stoo+"行开始打印到第:"+STArr[2]+"行,占用:"+STArr[4]+"行,一页可打印:"+STArr[5]+"行"
		     }
		     else 
		     {
		        text="补打开始位置--该条记录从第:"+stp+"页,第:"+stro+"行开始打印,一页可打印:"+STArr[5]+"行"
		     }
			   str=str+"<TR bgColor=#D2E9FF><TD>打印信息</TD></TR>";
			   str=str+"<TR><TD>"+text+"</TD></TR>";
			   str=str+"</TBODY></TABLE>";
			   var rowEl = Ext.get(e.getTarget());//把target转换成Ext.Element对象
			   rowEl.set({
				    'ext:qtip':str  //设置它的tip属性
			       },false);
		  }
		  else if (printInfo!="")
		  {
		     var str="<TABLE borderColor=#000000 width='100%' bgColor=#ffffff border=1 cellSpacing=0 cellPadding=0><TBODY>";
		     var text=""
		     var stpage=parseInt(printedarr[1])+parseInt(1)
		     var strow =parseInt(printedarr[2])+parseInt(1)
		     var edrow =parseInt(printedarr[2])+parseInt(printedarr[3])
		     var rowh=parseInt(printedarr[3])
		     if (printedarr[4]=="1") //已打印
		     {
		        text="该条记录从第:"+stpage+"页,第:"+strow+"行开始打印到第:"+edrow+"行,占用:"+rowh+"行,一页可打印:"+printedarr[5]+"行"
		     }
		     if (printedarr[4]=="0") //未打印
		     {
		        text="该条记录未打印"
		     }
		     if (printedarr[4]=="2") //有修改
		     {
		        text="该条记录打印过后有修改,该记录从第："+stpage+"页,第:"+strow+"行开始打印,一页可打印:"+printedarr[5]+"行"
		     }
			   str=str+"<TR bgColor=#D2E9FF><TD>打印信息</TD></TR>";
			   str=str+"<TR><TD>"+text+"</TD></TR>";
			   str=str+"</TBODY></TABLE>";
			   var rowEl = Ext.get(e.getTarget());//把target转换成Ext.Element对象
			   rowEl.set({
				    'ext:qtip':str  //设置它的tip属性
			       },false);
		  
		  }
		}
		if ((totalRow)&&(totalRow.indexOf("入液量")>-1))
		{
			//var record = store.getAt(index);//把这列的record取出来
			//var str = Ext.encode(record.data);//组装一个字符串，这个需要你自己来完成，这儿我把他序列化
			var par=store.getAt(index).get("par");
			var rw=store.getAt(index).get("rw");
			var totalRow1,totalRow2,totalRow3,totalRow4;
			if ((par)&&(rw))
			{
				var GetSubInOut=document.getElementById('GetSubInOut');
				if (GetSubInOut)
				{
					var ret=cspRunServerMethod(GetSubInOut.value,par+"^"+rw);
					var retArr=ret.split("@");
					totalRow1=retArr[0];
					totalRow2=retArr[1];
					totalRow3=retArr[2];
					totalRow4=retArr[3];
				}	 	
			}
			else
			{
				totalRow1=store.getAt(index).get(PartInName);
				totalRow2=store.getAt(index).get(PartInAmount);
				totalRow3=store.getAt(index).get(PartOutName);
				totalRow4=store.getAt(index).get(PartOutAmount);
			}
			//var str="<p>"+totalRow1+"</p><p>"+totalRow2+"</p><p>"+totalRow3+"</p><p>"+totalRow4+"</p>";
			var str="<TABLE borderColor=#000000 width='100%' bgColor=#ffffff border=1 cellSpacing=0 cellPadding=0><TBODY>";
			str=str+"<TR bgColor=#D2E9FF><TD></TD><TD>名称</TD><TD>量</TD></TR>";
			var totalRow2Arr=totalRow2.split(";");
			str=str+"<TR><TD bgColor=#D2E9FF rowSpan="+(totalRow2Arr.length-1)+">入液量分项</TD><TD>"+totalRow2Arr[0].replace(":","</TD><TD>")+"</TD></TR>";
			for (var i=1;i<(totalRow2Arr.length-1);i++)
			{
				str=str+"<TR><TD>"+totalRow2Arr[i].replace(":","</TD><TD>")+"</TD></TR>";
			}
			var totalRow4Arr=totalRow4.split(";");
			str=str+"<TR><TD bgColor=#D2E9FF rowSpan="+(totalRow4Arr.length-1)+">出液量分项</TD><TD>"+totalRow4Arr[0].replace(":","</TD><TD>")+"</TD></TR>";
			for (var i=1;i<(totalRow4Arr.length-1);i++)
			{
				str=str+"<TR><TD>"+totalRow4Arr[i].replace(":","</TD><TD>")+"</TD></TR>";
			}
			str=str+"</TBODY></TABLE>";
			var rowEl = Ext.get(e.getTarget());//把target转换成Ext.Element对象
			rowEl.set({
				'ext:qtip':str  //设置它的tip属性
			},false);
	  }
	}
});
Ext.QuickTips.init();//注意，提示初始化必须要有
grid.getStore().on('load',function(s,records){
          var girdcount=0;
          s.each(function(r){
              if(r.get(DisplaySumInName)=='总入液量='){
                    grid.getView().getRow(girdcount).style.backgroundColor='#F7FE2E';
              }
              if(r.get(DisplaySumInName)=='入液量='){
                    grid.getView().getRow(girdcount).style.backgroundColor='#A7FE2E';
              }
              if(r.get(DisplaySumOutName)=='总尿量='){
                    grid.getView().getRow(girdcount).style.backgroundColor='#F7FE2E';
              }
              if(r.get(DisplaySumOutName)=='尿量='){
                    grid.getView().getRow(girdcount).style.backgroundColor='#A7FE2E';
              }
              girdcount=girdcount+1;
          });
       //scope:this
       });
//findfirst();
  setTimeout("findfirst()",0)
  setcolor(grid) //续打设置颜色
//alert();
//debugger;
}
function LinkTP()
{
   var store = grid.store;
	 var rowCount = store.getCount(); //记录数
	 var cm = grid.getColumnModel();
	 var colCount = cm.getColumnCount();
	 var list = [];
	 var rowObj = grid.getSelectionModel().getSelections();
	 var len = rowObj.length;
		for (var r = 0;r < len; r++) {
		list.push(rowObj[r].data);
	  }		
	 var grid1=Ext.getCmp('mygrid');
	 var rwIndex=grid1.getSelectionModel().last;
	 var CaseMeasureID="CaseMeasureID|";
	 //debugger;
	 if (MeasureRel.contains(rwIndex))
	 {  
		var rid=MeasureRel.items(rwIndex);		
		CaseMeasureID=CaseMeasureID+rid;
	 }  
	//for (var i = 0; i < store.getCount(); i++) {
	//	list.push(store.getAt(i).data);
	//	//	debugger;
	//}
	var LinkTemp=document.getElementById('LinkTemp');

	for (var i = 0; i < list.length; i++) {
	  var obj=list[i];
	  var str="";
	  var CareDate="";
	  var CareTime="";
	  var flag="0";
		for (var p in obj) {
			var aa = formatDate(obj[p]);				
			if (p=="CareDate") CareDate=aa;
			if (p=='CareTime') CareTime=obj[p];
			if (p=="") continue;
			if ((p == DisplaySumInName) && (obj[p].indexOf("入液量") != -1)) {
				flag = "0";

			}
			if ((p==DisplaySumOutName)&&(obj[p].indexOf("出液量")!= -1))
			{
				flag="0"
			} 
			if (aa == "") 
			{
					str = str + p + "|" + DBC2SBC(obj[p]) + '^';
			}else
			{
			  	str = str + p + "|" + aa + '^';	
			}
		}
		if ((str!="")&&(flag=="0"))
		{
			if (str.indexOf("CareDate")==-1)
			{
				str=str+"CareDate|"+CareDate+"^CareTime|"+CareTime;
				//debugger;
			}
			var diaggrid = Ext.getCmp('diaggrid');
			if (diaggrid) {
	  		var selModel=diaggrid.getSelectionModel();
	  		if (selModel.hasSelection()) {   
	  			var objDiagRow = selModel.getSelections();		  			
					DiagnosDr=objDiagRow[0].get("rw");
				}
				else {
					DiagnosDr="";	
				}
			}
			else {
				DiagnosDr="";
			}
			str=str+"DiagnosDr|"+DiagnosDr;
			str=str+"^"+CaseMeasureID;
			//alert(str);
			var a=cspRunServerMethod(LinkTemp.value,EpisodeID,str,session['LOGON.USERID'],"DHCNURSKCKHLJLD",session['LOGON.GROUPDESC']);
			if (a!="0")
			{
				alert(a);
				return;
			}
			else alert("关联成功！");
		}
	}
	find();
}
function findfirst(){
	//var link="dhcnurtempature.csp?EpisodeID="+EpisodeID;
   /// window.open (link,'体温单','height=1,width=1,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no') 
   // window.close();
  // alert(parent.frames.length);
    MeasureRel = new Hashtable();
    REC = new Array();
	var adm = EpisodeID;
	var StDate = Ext.getCmp("mygridstdate");
	var StTime = Ext.getCmp("mygridsttime");
	var Enddate = Ext.getCmp("mygridenddate");
	var EndTime = Ext.getCmp("mygridendtime");
	var GetQueryData = document.getElementById('GetQueryData');
	var mygrid = Ext.getCmp("mygrid");
	var IfCancelRec=Ext.getCmp("IfCancelRec").getValue();
	var parr = adm + "^" + StDate.value + "^" + StTime.value + "^" + Enddate.value + "^" + EndTime.value + "^"+"DHCNURBATY" + "^" + IfCancelRec+"^"+CurrHeadDr;
	// debugger;
	var a = cspRunServerMethod(GetQueryData.value, "web.DHCNurHCRecComm:GetCareRecCommfirst", "parr$" + parr, "AddRec");
	mygrid.store.loadData(REC);
	setcolor(grid) //续打设置颜色
}
var REC=new Array();
function PrintSet()
{
	var arr = new Array();
	var a = cspRunServerMethod(pdata1, "", "DHCNURXPRNSET", EpisodeID, "");
	arr = eval(a);
	var window = new Ext.Window({
		width: 750,
		height: 250,
		autoScroll: true,
		layout: 'absolute',
		plain: true,
		frame: true,
		//modal: true,
		//bodyStyle: 'padding:5px;',
		///buttonAlign: 'center',
		items: arr
	});
	 var but2=Ext.getCmp('xpprnsetbut2');
	 but2.hide();
     var butin=Ext.getCmp('xpprnsetbut1');
     butin.text="确定";
 //debugger;
     butin.on('click',xpprnsetSave);
	window.show();
	
	var GetNurPrnSet=document.getElementById('GetNurPrnSet');
	var mygrid=Ext.getCmp("xpprnset");
	//alert(parr);
   // debugger;
    REC=new Array();
 	var a=cspRunServerMethod(GetNurPrnSet.value,"DHCNURBATY",EpisodeID,'addprnset');
    mygrid.store.loadData(REC);   
	

}
function addprnset(par)
{
	var a=par.split("^");
	//alert(a);
	a[4]=getDate(a[4]);
	if (a[6]!="")a[6]=getDate(a[6]);
	REC.push({patname:a[0],
	       bedcode:a[1],
	       pagno:a[2],
	       prnpos:a[3],
	       stdate:a[4],
	       sttime:a[5],
	       edate:a[6],
	       etime:a[7],
	       rectyp:a[8],
	       rw:a[9],
	       EpisodeID:a[10]
		   })
}
function xpprnsetSave()
{
	var mygrid=Ext.getCmp("xpprnset");
	var store=mygrid.store;
	//alert(parr);
	var SavePrnSet=document.getElementById('SPrnSet');
		
	    var list = [];
        for (var i = 0; i < store.getCount(); i++) {
		
			list.push(store.getAt(i).data);
		//	debugger;
		}
		for (var i = 0; i < list.length; i++) {
			var obj = list[i];
			var str = "";
    		for (var p in obj) {
				var aa = formatDate(obj[p]);
				if (p == "") 
					continue;
				if (aa == "") {
				
					str = str + p + "|" + obj[p] + '^';
				}
				else {
					str = str + p + "|" + aa + '^';
				}
				
			}
		   var a=cspRunServerMethod(SavePrnSet.value,str); //page, caredattim, prnpos, adm,Typ,user

		}
			

}
function addtitCon(tobar,lab)
{
	var but1=Ext.getCmp(lab+"but1");
	//alert(lab+"but1");
	but1.hide();
	var but2=Ext.getCmp(lab+"but2");
	but2.hide();
	
	tobar.addItem(
	    {
			xtype:'datefield',
			format: 'Y-m-d',
			id:lab+'stdate',
			value:(diffDate(new Date(),-1))
		},
	    {
			xtype:'datefield',
			format: 'Y-m-d',
			id:lab+'enddate',
			value:new Date()
		}
	);
	tobar.addButton(
	  {
		className: 'new-topic-button',
		text: "查询",
		//handler:find,
		id:lab+'Sch'
	  }

	);
}
function find(){
	//var link="dhcnurtempature.csp?EpisodeID="+EpisodeID;
   /// window.open (link,'体温单','height=1,width=1,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no') 
   // window.close();
  // alert(parent.frames.length);
    MeasureRel = new Hashtable();
    REC = new Array();
	var adm = EpisodeID;
	var StDate = Ext.getCmp("mygridstdate");
	var StTime = Ext.getCmp("mygridsttime");
	var Enddate = Ext.getCmp("mygridenddate");
	var EndTime = Ext.getCmp("mygridendtime");
	var GetQueryData = document.getElementById('GetQueryData');
	var mygrid = Ext.getCmp("mygrid");
	var IfCancelRec=Ext.getCmp("IfCancelRec").getValue();
	var parr = adm + "^" + StDate.value + "^" + StTime.value + "^" + Enddate.value + "^" + EndTime.value + "^"+"DHCNURBATY" + "^" + IfCancelRec+"^"+CurrHeadDr;
	// debugger;
	var a = cspRunServerMethod(GetQueryData.value, "web.DHCNurHCRecComm:GetCareRecComm", "parr$" + parr, "AddRec");
	mygrid.store.loadData(REC);
	setcolor(grid) //续打设置颜色
}
function findStat()
{  //查询出入液量合计
    var adm=EpisodeID;
	var StDate= Ext.getCmp("mygridstdate");
	var StTime= Ext.getCmp("mygridsttime");
	var Enddate= Ext.getCmp("mygridenddate");
	var EndTime= Ext.getCmp("mygridendtime");
	var GeInOutAmount=document.getElementById('GeInOutAmount');
	var mygrid=Ext.getCmp("mygrid");
  //alert(adm+"|"+StDate.value+"|"+StTime.value+"|"+Enddate.value+"|"+EndTime.value+"|"+"DHCNURBATY")
 	var a=cspRunServerMethod(GeInOutAmount.value,adm,StDate.value,StTime.value,Enddate.value,EndTime.value,"DHCNURBATY");
	if (a=="") { Ext.Msg.alert('提示', "无护理记录数据!"); return; }
	//additm2(Enddate.value,EndTime.value);
	//alert(Enddate.value)
	additmstat(Enddate.value,EndTime.value);
	var tt=a.split('^');
	//alert(a);
	//mygrid.getSelectionModel().selectRow(mygrid.store.getCount()-1); 
	mygrid.getSelectionModel().selectRow(0);    
	for (i=0;i<tt.length;i++)
	{
		itm=tt[i].split('|');
		mygrid.getSelectionModel().getSelections()[0].set(itm[0],itm[1]); 
	}
	//alert(tt);

}
function findStatNL()
{  //查询出入液量合计
    var adm=EpisodeID;
	var StDate= Ext.getCmp("mygridstdate");
	var StTime= Ext.getCmp("mygridsttime");
	var Enddate= Ext.getCmp("mygridenddate");
	var EndTime= Ext.getCmp("mygridendtime");
	//var GeInOutAmount=document.getElementById('GeInOutAmount');
	var mygrid=Ext.getCmp("mygrid");
  //alert(adm+"|"+StDate.value+"|"+StTime.value+"|"+Enddate.value+"|"+EndTime.value+"|"+"DHCNURBATY")
 	var a=cspRunServerMethod(GeInOutAmountNL.value,adm,StDate.value,StTime.value,Enddate.value,EndTime.value,"DHCNURBATY");
 	//alert(a)
	if (a=="") { Ext.Msg.alert('提示', "无护理记录数据!"); return; }
	//additm();
	additmstat(Enddate.value,EndTime.value);
	var tt=a.split('^');
	//alert(tt);
	//mygrid.getSelectionModel().selectRow(mygrid.store.getCount()-1); 
	mygrid.getSelectionModel().selectRow(0);   
	for (i=0;i<tt.length;i++)
	{
		itm=tt[i].split('|');
		mygrid.getSelectionModel().getSelections()[0].set(itm[0],itm[1]); 
	}
	//alert(tt);

}
function FailChange(val)
{
	if (val>0)
	{
	return '<span style="color:red">' + val + '</span>';
	}
	return val
}

function IntensiveSch()
{
	
}
function AddRec(str)
{
	//var a=new Object(eval(str));
	var obj = eval('(' + str + ')');
	obj.CareDate=getDate(obj.CareDate);
	//obj.PregHPregDate=getDate(obj.PregHPregDate);
	REC.push(obj);
	//debugger;
}

/*function(record,rowIndex,rowParams,store)
 {   
                    //禁用数据显示红色   
 if(record.data.pstate!=0)
 { 
    return 'x-grid-record-red';   
 }
 else
 { 
   return '';   
  }   
                       
} //end for getRowClass  
*/

function save()
{
	
	var store = grid.store;
	var rowCount = store.getCount(); //记录数
	var cm = grid.getColumnModel();
	var colCount = cm.getColumnCount();
	var list = [];
	var rowObj = grid.getSelectionModel().getSelections();
		var len = rowObj.length;
		for (var r = 0;r < len; r++) {
		list.push(rowObj[r].data);
	}	
		
		//for (var i = 0; i < store.getCount(); i++) {
			//list.push(store.getAt(i).data);
			//	debugger;
		//}
	var grid1=Ext.getCmp('mygrid');
	var rwIndex=grid1.getSelectionModel().last;
	var CaseMeasureID="CaseMeasureID|";
	//debugger;
	if (MeasureRel.contains(rwIndex))
	{
		var rid=MeasureRel.items(rwIndex);		
		CaseMeasureID=CaseMeasureID+rid;
	}
	//for (var i = 0; i < store.getCount(); i++) {
		//list.push(store.getAt(i).data);
	   //debugger;
	//}
	var flag=0;
	var RecSave=document.getElementById('RecSave');
	for (var i = 0; i < list.length; i++) {
	  var obj=list[i];
	  var str="";
	  var CareDate="";
	  var CareTime="";
	  var flag="0";
		for (var p in obj) {
			var aa = formatDate(obj[p]);				
			if (p=="CareDate") CareDate=aa;
			if (p=='CareTime') CareTime=obj[p];
			if (p=="") continue;
			if ((p == DisplaySumInName) && (obj[p].indexOf("入液量") != -1)) {
				flag = "1";
			}
			if ((p==DisplaySumOutName)&&(obj[p].indexOf("出液量")!= -1))
			{
				flag="1";
			} 
			if (aa == "") 
			{
					str = str + p + "|" + DBC2SBC(obj[p]) + '^';
			}else
			{
			  	str = str + p + "|" + aa + '^';	
			}
		}
		if ((str!="")&&(flag=="0"))
		{
			if (str.indexOf("CareDate")==-1)
			{
				str=str+"CareDate|"+CareDate+"^CareTime|"+CareTime;
				//debugger;
			}
			var diaggrid = Ext.getCmp('diaggrid');
			if (diaggrid) {
	  		var selModel=diaggrid.getSelectionModel();
	  		if (selModel.hasSelection()) {   
	  			var objDiagRow = selModel.getSelections();		  			
					DiagnosDr=objDiagRow[0].get("rw");
				}
				else {
					DiagnosDr="";	
				}
			}
			else {
				DiagnosDr="";
			}
			str=str+"DiagnosDr|"+DiagnosDr+"^HeadDR|"+CurrHeadDr;
			str=str+"^RecLoc|"+patloc+"^RecBed|"+bedCode;
			str=str+"^"+CaseMeasureID;
			//alert(str);
			if (str.indexOf("rw")==-1)
			{flag=1
			//alert(flag)
			}
			
			var a=cspRunServerMethod(RecSave.value,EpisodeID,str,session['LOGON.USERID'],"DHCNURBATY",session['LOGON.GROUPDESC']);
			if (a!="0")
			{
				alert(a);
				return;
			}
			if ((a==0)&&(flag==0))
			{
			alert("保存成功")
			}
		}
	}
	if (flag==1)
 {
 	find();
 	}
  setTimeout("find()",0)
  setcolor(grid) //续打设置颜色
	//find();
} 
//Ext.util.Format.dateRenderer
//ext.util.format.date(ext.getcmp("控件id").getvalue(),y-m-d)Y-m-d H:m:s
function gettime()
{
	var a=Ext.util.Format.dateRenderer('h:m');
	return a;
}
function diffDate(val,addday){
	var year=val.getYear();
	var mon=val.getMonth();
	var dat=val.getDate()+addday;
	var datt=new Date(year,mon,dat);
	return formatDate(datt);
}
function getDate(val)
{
	var a=val.split('-');
	var dt=new Date(a[0],a[1]-1,a[2]);
	return dt;
}
function formatDate(value){
  	try
	{
	   return value ? value.dateFormat('Y-m-d') : '';
	}
	catch(err)
	{
	   return '';
	}
 };
function additm()
{ 
	
  	var Plant = Ext.data.Record.create([
	{name:'CareDate'}, 
	{name:'CareTime'},
	{name:'Item1'},
	{name:'Item2'},
	{name:'Item3'},
	{name:'Item4'},
	{name:'Item5'},
	{name:'Item6'},
	{name:'Item7'},
	{name:'Item8'},
	{name:'Item9'}, 
	{name:'Item10'},
	{name:'Item11'},
	{name:'Item12'},
	{name:'Item13'},
	{name:'Item14'},
	{name:'Item15'},
	{name:'Item16'},
	{name:'Item17'}, 
	{name:'Item18'},
	{name:'Item19'}, 
	{name:'Item20'},
	{name:'Item21'},
	{name:'Item22'},
	{name:'Item23'},
	{name:'Item24'},
	{name:'Item25'},
	{name:'Item26'},
	{name:'Item27'},
	{name:'Item28'},
	{name:'Item29'},
	{name:'Item30'},
	{name:'Item31'},
	{name:'Item32'},
	{name:'Item33'},
	{name:'Item34'},
	{name:'Item35'},
	{name:'Item36'},
	{name:'Item37'},
	{name:'Item38'},
	{name:'Item39'},
	{name:'Item40'},
	{name:'Item41'},
	{name:'Item42'},
	{name:'Item43'},
	{name:'Item44'},
	{name:'Item45'},
	{name:'Item46'},
	{name:'Item47'}, 
	{name:'Item48'},
	{name:'Item49'},
	{name:'Item50'},
	{name:'CaseMeasure'},
	{name:'User'},
	{name:'rw'},
	{name:'par'}
      ]);
    var count = grid.store.getCount(); 
    //alert(count);
    var r = new Plant({CareDate:new Date(),CareTime:new Date().dateFormat('H:i')}); 
    grid.store.commitChanges(); 
    grid.store.insert(0,r); 
	return;
}

var rightClick = new Ext.menu.Menu(  {
            id : 'rightClickCont',
            items : [  {
                id:'rMenu1',
                text : '医嘱',
                handler:OrdSch
            }, {
                id:'rMenu10',
                text : '补打设置',
                handler:SetXu
            }, {
                id:'rMenu2',
                text : '病情措施及处理',
                handler:Measure
            },  {
                id:'rMenu8',
                text : '插入尿量小结',
                handler:InOutNodNL
            },  {
                id:'rMenu9',
                text : '插入24小时尿量',
                handler:InOutSumNL
            }, {
                id:'rMenu4',
                text : '插入出入液量小结',
                handler:InOutNod
            },  {
                id:'rMenu5',
                text : '插入24小时出入液量',
                handler:InOutSum
            },  {
                id:'rMenu6',
                text : '修改关联诊断',
                handler:UpdateRelDiagnos
            },  {
                id:'rMenu7',
                text : '作废',
                handler:CancelRecord
            }]
        });
function rightClickFn(client, rowIndex, e)  {
          e.preventDefault();
          grid=client;
		  CurrRowIndex=rowIndex;
          rightClick.showAt(e.getXY());
            }
function rowClickFn(grid, rowIndex, e)  {
                //alert('你单击了' + rowIndex);
            }
function MultiFun()
{
	var GetMulti=document.getElementById('GetMulti');
	var getcheckform=document.getElementById('getcheckform');	
	var ret= cspRunServerMethod(GetMulti.value, "DHCNURBATY");
    var grid=Ext.getCmp('mygrid');
    var tt=ret.split('^');
	var ab="";
	for (i=0;i<tt.length;i++)
	{
		if (tt[i]=="") continue;
		//debugger;
		var dd=grid.getSelectionModel().getSelections()[0].get(tt[i]); 
		if (dd==undefined)dd=""
		if (dd!="") ab=ab+dd+"^"+tt[i]+"!";
		else ab=ab+"^"+tt[i]+"!";
	}
	var tabstr=cspRunServerMethod(getcheckform.value, "DHCNURBATY",ab);
	var tabarr=tabstr.split('!');
		var tbitm=new Array();
		for (i = 0; i < tabarr.length; i++) 
		{
			if (tabarr[i] == "") 
				continue;
			var itmm = tabarr[i].split('^');
			tbitm.push({
				xtype: 'panel',
				id: itmm[0],
				title: itmm[1],
				//height: 1000,
				layout: 'absolute',
				//frame:false,
				//palin:false,
				closable: false,
				items: eval(itmm[2])
			
			})
				//alert(itmm[2]);
		}
	var subttab=new Ext.TabPanel({
	    activeTab : 0,//
        autoTabs: true,
        resizeTabs:true, 
        //height:200,
      //  width:300,
        enableTabScroll:true,
 	   items:tbitm
     });
	 
	var window = new Ext.Window({
		title: '多选',
		width: 450,
		height: 480,
		id:'mulForm',
		autoScroll: true,
		layout: 'fit',
		plain: true,
		frame:true,
		items: subttab ,  
		buttons:[{id:'mulselbut',text:'保存',handler:SaveMulCheck}]
	});
	
   window.show();

 
}
var checkret="";

function SaveMulCheck()
{
	alert(1232)
  checkret="";
  var gform=Ext.getCmp("mulForm");
  gform.items.each(eachItem, this);  
	var aa=checkret.split('^');
	var ht = new Hashtable();
	//debugger;
	for (i = 0; i < aa.length; i++) {
		if (aa[i] == "") 
			continue;
		var itm = aa[i].split('|');
		var aitm = itm[0].split('_');
		if (ht.contains(aitm[0])) {
		  var val=ht.items(aitm[0])
		  ht.remove(aitm[0]);
		  var dd=val+";"+itm[1];
		  ht.add(aitm[0],dd);
		}
		else {
		ht.add(aitm[0], itm[1])
	    }		
	}
	var mygrid=Ext.getCmp('mygrid');
	 for(var i in ht.keys())
	 {
	  var key =ht.keys()[i];
      var restr = ht.items(key);
	   mygrid.getSelectionModel().getSelections()[0].set(key,restr); 
	 }
	alert(checkret);

}
function add(a1, a2){
	attenitm.push({
		xtype:'panel',
		id: a1,
		title: a2,
		region:'center',
		height:1000,
		layout:'fit',
		closable:true,
		items:[]
	})
}
function multiSel(ret)
{
		var grid1=Ext.getCmp('multigrid');
		var code=grid1.getSelectionModel().getSelections()[0].get("itm3"); 
    var itname=grid1.getSelectionModel().getSelections()[0].get("itm4"); 
	  var getcheckform=document.getElementById('getcheckform');
		//alert(itname+"!!"+code)
		var ret=cspRunServerMethod(getcheckform.value, "DHCNURBATY",itname,code,"");	
		var CareDate=grid.getSelectionModel().getSelections()[0].get("CareDate"); 
		var aa=new Array();
		aa=eval(aa);
    /*
		debugger;
		for(var i=0;i<items.length;i++){ 

            panl.remove(items[i]); 

          } 
    
       panl.doLayout();
		panl.add(new Ext.form.Checkbox({    
                    id:"addboxModule",                
                    name:"userModule",
                    boxLabel : 'moduleName' 
                   }));*/

		panl.doLayout();
		debugger;
		
 
}
function addMulitm(ret)
{
	var grid1=Ext.getCmp('multigrid');
  	var Plant = Ext.data.Record.create([
	{name:'itm1'},
	{name:'itm2'},
	{name:'itm3'},
	{name:'itm4'}
      ]);
	var itm=ret.split('^');
	for (i = 0; i < itm.length; i++) {
		if (itm[i]=="") continue;
		var aa=itm[i].split('!');
		var count = grid1.store.getCount();
		var r = new Plant({
			itm1: aa[0],
			itm2: "",
			itm3:aa[1],
			itm4:aa[2]
		});
		grid1.store.commitChanges();
		grid1.store.insert(count, r);
	}
   return;
   }
function Measure1()
{
  selections = grid.getSelectionModel().getSelections();
 	var arr = new Array();
	var a = cspRunServerMethod(pdata1, "", "DHCNURMeasure", EpisodeID, "");
	arr = eval(a);
	var window = new Ext.Window({
		title: '医嘱',
		width: 550,
		height: 450,
		autoScroll: true,
		layout: 'absolute',
		plain: true,
		frame:true,
		//modal: true,
		//bodyStyle: 'padding:5px;',
		///buttonAlign: 'center',
		items: arr
	});
 var mydate=new Date();
 var butord=Ext.getCmp('_Button5');
 butord.on=('click',OrdSch1);
 window.show();
}
function InOutNodNL()
{ //小结
    
	var SaveOutInNL=document.getElementById('SaveOutInNL');
	var objRow=grid.getSelectionModel().getSelections();
	if (objRow.length == 0) { Ext.Msg.alert('提示', "请先点'统计'按钮!"); return; }
	else
	{
	  var countstr=""; //合计项
	  var countcls=ICountCls+"&"+OCountCls;
	  var tt=countcls.split('&');
	  for (i=0;i<tt.length;i++)
	  {
	  	if (tt[i]=="") continue;
		countstr=countstr+tt[i]+"|"+objRow[0].get(tt[i])+"^";
	  }
	  var CareDate=objRow[0].get("CareDate");
	  var CareTime=objRow[0].get("CareTime");
	  var inamount=objRow[0].get(DisplaySumInAmount);
	  var OutQtAmount=objRow[0].get(DisplaySumOutAmount);
	  var InPart=objRow[0].get(PartInAmount);
	  var OutPart=objRow[0].get(PartOutAmount);
	  //var StatTime=objRow[0].get("Item1");
	  //var StatHours=objRow[0].get("Item2");
	  var CaseMeasure=objRow[0].get("CaseMeasure");
	  var CaseMeasureArr=CaseMeasure.split(" ");
	  if (CaseMeasureArr.length>1)
	  {
	  	var StatTime=CaseMeasureArr[0];
	  	var StatHours=CaseMeasureArr[1];
	  }
	  else
	  {
	  	var StatTime="";
	  	var StatHours="";
	  }
		var str=countstr+"^SumInAmount|"+inamount+"^SumOutAmount|"+OutQtAmount+"^CareDate|"+formatDate(CareDate)+"^CareTime|"+CareTime+"^Typ|Nod^"+"InPart|"+InPart+"^OutPart|"+OutPart+"^StatTime|"+StatTime+"^StatHours|"+StatHours;
		var diaggrid = Ext.getCmp('diaggrid');
		if (diaggrid) {
  		var selModel=diaggrid.getSelectionModel();
  		if (selModel.hasSelection()) {   
  			var objDiagRow = selModel.getSelections();		  			
				DiagnosDr=objDiagRow[0].get("rw");
			}
			else {
				DiagnosDr="";	
			}
		}
		else {
			DiagnosDr="";
		}
		str=str+"^DiagnosDr|"+DiagnosDr+"^HeadDR|"+CurrHeadDr;
		//alert(str);
		var a=cspRunServerMethod(SaveOutInNL.value,EpisodeID,str,session['LOGON.USERID'],"DHCNURBATY");
		find();
	}
}
function InOutSumNL()
{
	var SaveOutInNL=document.getElementById('SaveOutInNL');
	var objRow=grid.getSelectionModel().getSelections();
	if (objRow.length == 0) { Ext.Msg.alert('提示', "请先点'统计'按钮!"); return; }
	else
	{
	  var countstr=""; //合计项
	  var countcls=ICountCls+"&"+OCountCls;
	  var tt=countcls.split('&');
	  for (i=0;i<tt.length;i++)
	  {
	  	if (tt[i]=="") continue;
		  countstr=countstr+tt[i]+"|"+objRow[0].get(tt[i])+"^";
	  }
      var CareDate=objRow[0].get("CareDate"); 
	  var CareTime=objRow[0].get("CareTime");
	  var inamount=objRow[0].get(DisplaySumInAmount);
	  var OutQtAmount=objRow[0].get(DisplaySumOutAmount);
	  var InPart=objRow[0].get(PartInAmount);
	  var OutPart=objRow[0].get(PartOutAmount);
		//var StatTime=objRow[0].get("Item1");
	  //var StatHours=objRow[0].get("Item2");
	  var CaseMeasure=objRow[0].get("CaseMeasure");
	  var CaseMeasureArr=CaseMeasure.split(" ");
	  if (CaseMeasureArr.length>1)
	  {
	  	var StatTime=CaseMeasureArr[0];
	  	var StatHours=CaseMeasureArr[1];
	  }
	  else
	  {
	  	var StatTime="";
	  	var StatHours="";
	  }
		var str="^SumInAmount|"+"^SumOutAmount|"+OutQtAmount+"^CareDate|"+formatDate(CareDate)+"^CareTime|"+CareTime+"^Typ|Sum^"+"InPart|"+"^OutPart|"+"^StatTime|"+StatTime+"^StatHours|"+StatHours;
		//alert(str);
		var diaggrid = Ext.getCmp('diaggrid');
		if (diaggrid) {
  		var selModel=diaggrid.getSelectionModel();
  		if (selModel.hasSelection()) {   
  			var objDiagRow = selModel.getSelections();		  			
				DiagnosDr=objDiagRow[0].get("rw");
			}
			else {
				DiagnosDr="";	
			}
		}
		else {
			DiagnosDr="";
		}
		str=str+"^DiagnosDr|"+DiagnosDr+"^HeadDR|"+CurrHeadDr;
		//alert(str);
		var a=cspRunServerMethod(SaveOutInNL.value,EpisodeID,str,session['LOGON.USERID'],"DHCNURBATY");
		find();
 }
}
function InOutNod()
{ //小结
    
	var SaveOutIn=document.getElementById('SaveOutIn');
	var objRow=grid.getSelectionModel().getSelections();
	if (objRow.length == 0) { Ext.Msg.alert('提示', "请先点'统计'按钮!"); return; }
	else
	{
	  var countstr=""; //合计项
	  var countcls=ICountCls+"&"+OCountCls;
	  var tt=countcls.split('&');
	  for (i=0;i<tt.length;i++)
	  {
	  	if (tt[i]=="") continue;
		countstr=countstr+tt[i]+"|"+objRow[0].get(tt[i])+"^";
	  }
	  var CareDate=objRow[0].get("CareDate");
	  var CareTime=objRow[0].get("CareTime");
	  var inamount=objRow[0].get(DisplaySumInAmount);
	  var OutQtAmount=objRow[0].get(DisplaySumOutAmount);
	  var InPart=objRow[0].get(PartInAmount);
	  var OutPart=objRow[0].get(PartOutAmount);
	  //var StatTime=objRow[0].get("Item1");
	  //var StatHours=objRow[0].get("Item2");
	  var CaseMeasure=objRow[0].get("CaseMeasure");
	  var CaseMeasureArr=CaseMeasure.split(" ");
	  if (CaseMeasureArr.length>1)
	  {
	  	var StatTime=CaseMeasureArr[0];
	  	var StatHours=CaseMeasureArr[1];
	  }
	  else
	  {
	  	var StatTime="";
	  	var StatHours="";
	  }
		var str=countstr+"^SumInAmount|"+inamount+"^SumOutAmount|"+OutQtAmount+"^CareDate|"+formatDate(CareDate)+"^CareTime|"+CareTime+"^Typ|Nod^"+"InPart|"+InPart+"^OutPart|"+OutPart+"^StatTime|"+StatTime+"^StatHours|"+StatHours;
		var diaggrid = Ext.getCmp('diaggrid');
		if (diaggrid) {
  		var selModel=diaggrid.getSelectionModel();
  		if (selModel.hasSelection()) {   
  			var objDiagRow = selModel.getSelections();		  			
				DiagnosDr=objDiagRow[0].get("rw");
			}
			else {
				DiagnosDr="";	
			}
		}
		else {
			DiagnosDr="";
		}
		str=str+"^DiagnosDr|"+DiagnosDr+"^HeadDR|"+CurrHeadDr;
		//alert(str);
		var a=cspRunServerMethod(SaveOutIn.value,EpisodeID,str,session['LOGON.USERID'],"DHCNURBATY");
		find();
	}
}
function InOutSum()
{
	var SaveOutIn=document.getElementById('SaveOutIn');
	var objRow=grid.getSelectionModel().getSelections();
	if (objRow.length == 0) { Ext.Msg.alert('提示', "请先点'统计'按钮!"); return; }
	else
	{
	  var countstr=""; //合计项
	  var countcls=ICountCls+"&"+OCountCls;
	  var tt=countcls.split('&');
	  for (i=0;i<tt.length;i++)
	  {
	  	if (tt[i]=="") continue;
		countstr=countstr+tt[i]+"|"+objRow[0].get(tt[i])+"^";
	  }
      var CareDate=objRow[0].get("CareDate"); 
	  var CareTime=objRow[0].get("CareTime");
	  var inamount=objRow[0].get(DisplaySumInAmount);
	  var OutQtAmount=objRow[0].get(DisplaySumOutAmount);
	  var InPart=objRow[0].get(PartInAmount);
	  var OutPart=objRow[0].get(PartOutAmount);
		//var StatTime=objRow[0].get("Item1");
	  //var StatHours=objRow[0].get("Item2");
	  var CaseMeasure=objRow[0].get("CaseMeasure");
	  var CaseMeasureArr=CaseMeasure.split(" ");
	  if (CaseMeasureArr.length>1)
	  {
	  	var StatTime=CaseMeasureArr[0];
	  	var StatHours=CaseMeasureArr[1];
	  }
	  else
	  {
	  	var StatTime="";
	  	var StatHours="";
	  }
		var str=countstr+"^SumInAmount|"+inamount+"^SumOutAmount|"+OutQtAmount+"^CareDate|"+formatDate(CareDate)+"^CareTime|"+CareTime+"^Typ|Sum^"+"InPart|"+InPart+"^OutPart|"+OutPart+"^StatTime|"+StatTime+"^StatHours|"+StatHours;
		//alert(str);
		var diaggrid = Ext.getCmp('diaggrid');
		if (diaggrid) {
  		var selModel=diaggrid.getSelectionModel();
  		if (selModel.hasSelection()) {   
  			var objDiagRow = selModel.getSelections();		  			
				DiagnosDr=objDiagRow[0].get("rw");
			}
			else {
				DiagnosDr="";	
			}
		}
		else {
			DiagnosDr="";
		}
		str=str+"^DiagnosDr|"+DiagnosDr+"^HeadDR|"+CurrHeadDr;
		//alert(str);
		var a=cspRunServerMethod(SaveOutIn.value,EpisodeID,str,session['LOGON.USERID'],"DHCNURBATY");
		find();
 }
}
function OrdSch1(){
	// var CurrAdm=selections[rowIndex].get("Adm");
	selections = grid.getSelectionModel().getSelections();
	var arr = new Array();
	var a = cspRunServerMethod(pdata1, "", "DHCPatOrdList", EpisodeID, "");
	arr = eval(a);
	var window = new Ext.Window({
		title: '医嘱',
		width: 550,
		height: 550,
		autoScroll: true,
		layout: 'absolute',
		plain: true,
		frame: true,
		//modal: true,
		//bodyStyle: 'padding:5px;',
		///buttonAlign: 'center',
		items: arr
	});
	var butin=Ext.getCmp('ordgridbut1');
  butin.text="确定";
 	//debugger;
  butin.on('click',SureIn);
  window.show();

}
function OrdSch()
{         
	// var CurrAdm=selections[rowIndex].get("Adm");
	selections = grid.getSelectionModel().getSelections();
	var arr = new Array();
	var a = cspRunServerMethod(pdata1, "", "DHCPatOrdList", EpisodeID, "");
	arr = eval(a);
	var window = new Ext.Window({
		title: '医嘱',
		width: 450,
		height: 550,
		autoScroll: true,
		layout: 'absolute',
		plain: true,
		frame:true,
		//modal: true,
		//bodyStyle: 'padding:5px;',
		///buttonAlign: 'center',
		items: arr
	});
	var mydate=new Date();

	var	grid1=Ext.getCmp("ordgrid");
	tobar=grid1.getTopToolbar();
	tobar.addItem(
	    {
			xtype:'datefield',
			format: 'Y-m-d',
			id:'ordgridstdate',
			value:(diffDate(new Date(),-1))
		},
	    {
			xtype:'datefield',
			format: 'Y-m-d',
			id:'ordgridenddate',
			value:new Date()
		}
	);
	tobar.addButton(
	  {
		className: 'new-topic-button',
		text: "查询",
		//handler:find,
		id:'ordgridSch'
	  }

	);

	var butin=Ext.getCmp('ordgridbut2');
	butin.hide();
	var butin=Ext.getCmp('ordgridbut1');
	butin.text="确定";
	//debugger;
	butin.on('click',SureIn);
	var butschord=Ext.getCmp('ordgridSch');
	butschord.on('click',SchOrd);
	window.show();
}
var condata=new Array();
function addord(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p)
{ //OrdDate,OrdTime,ARCIMDesc,PriorDes,Meth,PHFreq,Dose,PhQtyOrd,OrdStat,Doctor,Oew,OrdSub,Sel,SeqNo
 	condata.push({
		OrdDate: a,
		OrdTime: b,
		ARCIMDesc: c,
		PriorDes: d,
		Meth: e,
		PHFreq: f,
		Dose: g,
		DoseUnit: h,
		PhQtyOrd: i,
		OrdStat: j,
		Doctor: k,
		Oew: l,
		OrdSub: m,
		SeqNo: o,
		ExeCtp: p
		
	});
}
function SureIn()
 {
	var grid = Ext.getCmp('ordgrid');
	var mygrid=Ext.getCmp('mygrid');
	var store = grid.store;
	var rowCount = store.getCount(); //记录数
	/*var cm = grid.getColumnModel();
	var colCount = cm.getColumnCount(); //列数
	var view = grid.getView();*/
	var num=0;
    var selModel = grid.getSelectionModel();   
    if (selModel.hasSelection()) {   
       	// Ext.Msg.confirm("警告", "确定要删除吗？", function(button) {   
				var selections = selModel.getSelections();
				//var rowIndex = grid.store.indexOf(grid.getSelectionModel().getSelected());
				//grid.getSelectionModel().selectRow(rowIndex);
				//debugger;
				var caredate,caretime;
				Ext.each(selections, function(item) {
					var des=item.data.ARCIMDesc;
					des=des.replace("_____","");
					var ml=item.data.Dose;
					var unit=item.data.DoseUnit;
					if ((unit!="ml")&&(unit!="ML")) ml=0;
					var seqno=item.data.SeqNo;
					var rowIndex = grid.store.indexOf(item);
					var Meth=item.data.Meth; 
					var des=Meth;
					for (var i = rowIndex-1; i >=0; i--) {
						var subdes=store.getAt(i).data.ARCIMDesc;
						subdes=subdes.replace("_____","");
						var subml=store.getAt(i).data.Dose;
						var subunit=store.getAt(i).data.DoseUnit;
						if (subunit!="ml") subml=0;
						var subseqno=store.getAt(i).data.SeqNo;
						if (subseqno==seqno)
						{
							//des=subdes+","+des;
							des=Meth
							ml=eval(ml)+eval(subml);
						}
						else
						{
							break;	
						}
					}
					//alert(store.getCount());
					for (var i = rowIndex+1; i < store.getCount(); i++) {
						var subdes=store.getAt(i).data.ARCIMDesc;
						subdes=subdes.replace("_____","");
						var subml=store.getAt(i).data.Dose;
						//alert(subml);
						var subunit=store.getAt(i).data.DoseUnit;
						//alert(subunit);
						if ((subunit!="ml")&&(subunit!="ML")) subml=0;
						var subseqno=store.getAt(i).data.SeqNo;
						if (subseqno==seqno)
						{
							//des=des+","+subdes;
							des=Meth
							ml=eval(ml)+eval(subml);
						}
						else
						{
							break;	
						}
					}
					//alert(num);
					if (num == 0) {
						caredate=mygrid.getStore().getAt(0).get("CareDate");
						caretime=mygrid.getStore().getAt(0).get("CareTime");
						var objRow=mygrid.getSelectionModel().getSelections();
						if (objRow.length == 0) { Ext.Msg.alert('提示', "请先选择某行!"); return; }
						else
						{
								objRow[0].set(OrdInName, des);
								//alert(objRow[0].value);
								objRow[0].set(OrdInAmount, ml);
						}
					}else{
						additm();
						mygrid.getSelectionModel().selectRow(mygrid.store.getCount()-1);   
						mygrid.getSelectionModel().getSelections()[0].set("CareDate", caredate);
						mygrid.getSelectionModel().getSelections()[0].set("CareTime", caretime);
						mygrid.getSelectionModel().getSelections()[0].set(OrdInName, des);
						mygrid.getSelectionModel().getSelections()[0].set(OrdInAmount, ml);
					}
					num++;
				});   
     }
 }
//document.body.onload=BodyLoadHandler;
 //date.on('change', function(){alert(1);});

function Measure()
{
   /* selections = grid.getSelectionModel().getSelections();
 	var arr = new Array();
	var a = cspRunServerMethod(pdata1, "", "DHCNURMeasure", EpisodeID, "");
	arr = eval(a);*/
	//EmrCode,EpisodeId,fieldCode
		MeasureRel = new Hashtable();
     var grid1=Ext.getCmp('mygrid');
     var objRow=grid1.getSelectionModel().getSelections();
	if (objRow.length == 0) { Ext.Msg.alert('提示', "请先选择一条护理记录!"); return; }
	var par=grid1.getSelectionModel().getSelections()[0].get("par"); 
	var rw=grid1.getSelectionModel().getSelections()[0].get("rw"); 
   // debugger;
	var rowid=par+"||"+rw;
	if (par==undefined)
	{
		rowid="";
	}
	var parr="DHCNURBATY^"+EpisodeID+"^CaseMeasureXml^"+rowid;
	//alert(parr);
	var arr = new Array();
	var a = cspRunServerMethod(pdata1, "", "DHCPatOrdList", EpisodeID, "");
	arr = eval(a);
	var arrlab = new Array();
	a = cspRunServerMethod(pdata1, "", "DHCNurLabRec", EpisodeID, "");
	arrlab = eval(a);
	var arrcheck = new Array();
	a = cspRunServerMethod(pdata1, "", "DHCNurCheckRec", EpisodeID, "");
	arrcheck = eval(a);
	var arrResult = new Array();
	a = cspRunServerMethod(pdata1, "", "DHCNurLCResult", EpisodeID, "");
	arrResult = eval(a);
	//DHCNurLCResult
	var north_item = new Ext.Panel({   
			title: '',   
			region: 'north',   
			//contentEl: 'north-div',   
			split: true,   
							frame:true,
			border: true,   
			//collapsible: true,   
			height: 200,   
			items:[{
				xtype:"tabpanel",
				activeTab:0,
				frame:true,
				items:[
	  				{title:"医嘱",
			  			width: 550,
			  			height: 200,
			  			autoScroll: true,
		      			layout:'absolute',
			  			items:arr},		
	         		{title:"检查",
			  			width: 550,
			  			height: 200,
			  			autoScroll: true,
		      			layout:'absolute',
			  			items:arrcheck
			 			},		
	         		{title:"检验",
			  			width: 550,
			  			height: 200,
			  			autoScroll: true,
		      			layout:'absolute',
			  			items:arrlab
			 			}]			
			 }]
		});   
 
            var arr = new Array();
	        var a = cspRunServerMethod(pdata1, "", "DHCNURMeasure", EpisodeID, "");
	        arr = eval(a);
            var emrknowurl="dhcnuremrknow.csp?EmrCode=DHCNurKnowldge&Parr="+parr+"&EpisodeID="+EpisodeID;
			//alert(emrknowurl);
            //中间   
            var center_item = new Ext.Panel({   
                region: 'center',   
          		autoScroll: true,
                split: true,   
                layout: 'fit',   
                collapsible: false,  
				height:50, 
                minSize: 50,   
  				frame:true,
                items: arrResult
            });    
            //南边，状态栏   
            var south_item = new Ext.Panel({   
                region: 'south',   
              	// contentEl: 'south-div',   
                split: true,   
               	// border: true,   
               	// collapsible: true,   
         		autoScroll: true,
                layout: 'absolute',   
                minSize: 200,  
				height:200,
  				frame:true,
                //items: arr 
				buttons: [{
						text: '确定',
						handler: function(){
							//	Save();
							//	window.close();
							sureMeasure();
						}
					}, {
						text: '取消',
						handler: function(){
							window.close();
						}
					}],
				html: '<iframe id ="southTab" name="ddd" style="width:100%; height:100%" src='+emrknowurl+' ></iframe>'
                
            });   
    
            //中间的中间，功能菜单   
 	//alert(parr);
	var window = new Ext.Window({ 
		title: '医嘱',
		width: 550,
		modal:true,
		height: 580,
		id:'CaseForm',
		autoScroll: true,
		layout: 'border',
		plain: true,
		frame:true,
		items: [north_item, center_item,south_item]   
	});
	var grid=Ext.getCmp("LabGrid");
	var tobar=grid.getTopToolbar();
	addtitCon(tobar,grid.id);
	grid=Ext.getCmp("CheckGrid");
	tobar=grid.getTopToolbar();
	addtitCon(tobar,grid.id);
	grid=Ext.getCmp("ordgrid");
	tobar=grid.getTopToolbar();
	addtitCon(tobar,grid.id);
	
	var butschlab=Ext.getCmp('LabGridSch');
	butschlab.on('click',Schlab);
	
	var butschord=Ext.getCmp('ordgridSch');
	butschord.on('click',SchOrd);
	
	var butschcheck=Ext.getCmp('CheckGridSch');
	butschcheck.on('click',SchCheck);
	
	var gridc=Ext.getCmp('CheckGrid');
	gridc.on('click',gridcheckclick);
	
	var gridl=Ext.getCmp('LabGrid');
	gridl.on('click',gridLabclick);
	var mygrid=Ext.getCmp("mygrid");
   
   ////var butsure=Ext.getCmp('_Button6');
   //butsure.on('click',sureMeasure);
	var rowObj = mygrid.getSelectionModel().getSelections();
	var len = rowObj.length;
	if (len < 1) {
		//Ext.Msg.show({title:'注意',msg:'请选择需要修改的数据!',buttons: Ext.Msg.OK,icon:Ext.MessageBox.WARNING});
		return;
	}
	else {
		//var content = rowObj[0].get("CaseMeasure");
		//var TxtCaseMeasure=Ext.getCmp('TxtCaseMeasure');
		//TxtCaseMeasure.setValue(content);
	}
 //var mydate=new Date();
 //var butord=Ext.getCmp('_Button5');
 //butord.on=('click',OrdSch1);

 window.show();
 //alert();
}
var CaseMeasureID=""; //邦定的处置ID
var MeasureRel = new Hashtable();
function sureMeasure()
{
	 var gform=Ext.getCmp("gform");
   //gform.items.each(eachItem, this);  
	var TxtCaseMeasure=Ext.getCmp('TxtCaseMeasure');
	var frm=Ext.getCmp('CaseForm');
	var aa=document.getElementById("southTab");
	var CareCon=Ext.get("southTab").dom.contentWindow.document.getElementById("DesignForm");
	//alert(CareCon.QichTextCon.GetCellText());
	var win=Ext.get("southTab").dom.contentWindow;
   // var parr="DHCNURBATY^"+EpisodeID+"^CaseMeasureXml";
	var ret=southTab.Save();
	var grid1=Ext.getCmp('mygrid');
	CaseMeasureID=ret; 
	var rwIndex=grid1.getSelectionModel().last;
	MeasureRel.add(rwIndex,CaseMeasureID);
	//debugger;
	grid.getSelectionModel().getSelections()[0].set("CaseMeasure",CareCon.QichTextCon.GetCellText());
	frm.close();

}
function gridcheckclick()
{
	 var grid=Ext.getCmp("CheckGrid");
  
	var rowObj = grid.getSelectionModel().getSelections();
	var len = rowObj.length;
	var GetRadiaNote=document.getElementById('GetRadiaNote');
	if(len < 1)
	{
		//Ext.Msg.show({title:'注意',msg:'请选择需要修改的数据!',buttons: Ext.Msg.OK,icon:Ext.MessageBox.WARNING});
		return;
	}
	else
	{
		var rowid = rowObj[0].get("ORW");
		var a=cspRunServerMethod(GetRadiaNote.value,rowid);
        var LCResult=Ext.getCmp('LCResult');
		a=a.replace("_$c(13,10)_",String.fromCharCode(13)+String.fromCharCode(10));
		var aa=a.split("_$c_");
		var txt="";
		for (i=0;i<aa.length;i++)
		{
			if (aa[i]=="")  continue;
			txt=txt+aa[i];//+String.fromCharCode(13)+String.fromCharCode(10);
		}
		LCResult.setValue(txt);
		//EpisodeID=rowObj[0].get("EpisodeId");
		/*for (i = 0; i < top.frames.length; i++) {
			alert(top.frames[i].name);
		}
		var frm = top.frames[0].document.forms["fEPRMENU"];
	    frm.EpisodeID.value=EpisodeID;
        ModConsult();*/
	}
}
function gridLabclick()
{
	 var grid=Ext.getCmp("LabGrid");
  
	var rowObj = grid.getSelectionModel().getSelections();
	var len = rowObj.length;
	var GetLabItemdata=document.getElementById('GetLabItemdata');
	if(len < 1)
	{
		//Ext.Msg.show({title:'注意',msg:'请选择需要修改的数据!',buttons: Ext.Msg.OK,icon:Ext.MessageBox.WARNING});
		return;
	}
	else
	{
		var labno = rowObj[0].get("LabEpisodeNo");
		var tesc=rowObj[0].get("testcode");
		var ARCIMDes=rowObj[0].get("ARCIMDes");
		//alert(labno+"@"+tesc)
		var a=cspRunServerMethod(GetLabItemdata.value,labno,tesc);
		if (a=="-1") return;
		var LCResult=Ext.getCmp('LCResult');
		//a=a.replace("&",String.fromCharCode(13)+String.fromCharCode(10));
		var aa=a.split("$");
		//alert(a)
		var aresult=aa[1].split('&');
		var txt="";
		for (i=0;i<aresult.length;i++)
		{
			if (aresult[i]=="")  continue;
			var labar=aresult[i].split("^");
			txt=txt+labar+String.fromCharCode(13)+String.fromCharCode(10);
		}
		LCResult.setValue("        "+ARCIMDes+String.fromCharCode(13)+String.fromCharCode(10)+txt);
		//EpisodeID=rowObj[0].get("EpisodeId");
		/*for (i = 0; i < top.frames.length; i++) {
			alert(top.frames[i].name);
		}
		var frm = top.frames[0].document.forms["fEPRMENU"];
	    frm.EpisodeID.value=EpisodeID;
        ModConsult();*/
	}
}
function SchOrd()
{
	condata=new Array();
	var adm=EpisodeID;
	var StDate= Ext.getCmp("ordgridstdate");
	var Enddate= Ext.getCmp("ordgridenddate");
	var GetQueryData=document.getElementById('GetQueryData1');
	var ordgrid=Ext.getCmp("ordgrid");
	var parr=adm+"^"+StDate.value+"^"+Enddate.value;
 	var a=cspRunServerMethod(GetQueryData.value,"web.DHCNUREMR:GetPatOrd","parr$"+parr,"addord");
	// grid.width=document.body.offsetWidth;
	Ext.getCmp("ordgrid").store.loadData(condata);
	//Ext.getCmp("mygrid").store.removeAll();
}
function Schlab()
{
	condata=new Array();
	var adm=EpisodeID;
	var StDate= Ext.getCmp("LabGridstdate");
	var Enddate= Ext.getCmp("LabGridenddate");
	var GetQueryData=document.getElementById('GetQueryData1');
	var ordgrid=Ext.getCmp("LabGrid");
  //var parr=adm+"^"+StDate.value+"^"+Enddate.value;
	//alert(adm);
 	var a=cspRunServerMethod(GetQueryData.value,"web.DHCNurJYRESULT:GetLabNo","Adm$"+adm,"AddLab");
  // grid.width=document.body.offsetWidth;
  ordgrid.store.loadData(condata);   
}
function AddLab(a,b,c,d,e,f,g,h)
{
	//OrdDate,OrdTime,ARCIMDesc,ORW,DateEx,TimeEx ,CPTEx,ArcimDR
		condata.push({
			ARCIMDes:a,
			LabEpisodeNo:b,
			StDateTime:c,
			RowId:d,
			testcode:e,
			LabCpt:f,
			LabDate:g,
			LabTime:h
		});
}
function AddCheck(a,b,c,d,e,f,g,h)
{
	//OrdDate,OrdTime,ARCIMDesc,ORW,DateEx,TimeEx ,CPTEx,ArcimDR
		condata.push({
			OrdDate:a,
			OrdTime:b,
			ARCIMDesc:c,
			ORW:d,
			DateEx:e,
			TimeEx:f ,
			CPTEx:g,
			ArcimDR:h
		});
}
function SchCheck()
{
	condata=new Array();
	var adm=EpisodeID;
	var StDate= Ext.getCmp("CheckGridstdate");
	var Enddate= Ext.getCmp("CheckGridenddate");
	var GetQueryData=document.getElementById('GetQueryData1');
	//alert(GetQueryData);
	var ordgrid=Ext.getCmp("CheckGrid");
    var parr=adm+"^"+StDate.value+"^"+Enddate.value;
 	var a=cspRunServerMethod(GetQueryData.value,"web.DHCNurJYRESULT:GetOrdRadia","parr$"+parr,"AddCheck");
   // grid.width=document.body.offsetWidth;
    
    ordgrid.store.loadData(condata);   
}

function printNurRec()
{
		var GetPrnSet=document.getElementById('GetPrnSet');
		var GetHead=document.getElementById('GetPatInfo');
		var ret=cspRunServerMethod(GetHead.value,EpisodeID);
		var hh=ret.split("^");
		//var hh1=hh[11].split("@");
		//alert("ddd");
		//debugger;
		var a=cspRunServerMethod(GetPrnSet.value,"DHCNURBATY",EpisodeID); //page, caredattim, prnpos, adm,Typ,user
		if (a=="") return;
		var GetLableRec=document.getElementById('GetLableRec');
		var LabHead=cspRunServerMethod(GetLableRec.value,"DHCNURBATY^"+session['LOGON.CTLOCID']+"^"+EpisodeID+"^"+session['LOGON.USERID']);
		//alert("DHCNURBATY^"+session['LOGON.CTLOCID']+"^"+EpisodeID+"^"+session['LOGON.USERID'])
		/*if(hh1[1]="张海强")
		{
			ret=ret.replace(/BEDCODE@25/g,"BEDCODE@17");
			ret=ret.replace(/内分泌内科/g,"心血管内科");
		}*/
		//alert(ret);
		var tm=a.split("^");
		var stdate="" //tm[2];
		var stim="" //tm[3];
		var edate="" //tm[4];
		var etim="" //tm[5];
		//PrintComm.RHeadCaption=hh[1];
		//PrintComm.LHeadCaption=hh[0];
		//PrintComm.RFootCaption="第";
		//PrintComm.LFootCaption="页";
		//PrintComm.LFootCaption=hh[2];
		//alert(ret);
		PrintComm.TitleStr=ret;
		PrintComm.SetPreView("1");
			//PrintComm.PrnLoc=session['LOGON.CTLOCID'];
		PrintComm.PrnLoc=patloc ;
		PrintComm.PrnBed=bedCode ;
		PrintComm.WebUrl=WebIp+"/dthealth/web/DWR.DoctorRound.cls";
		var aa=tm[1].split("&");
		//PrintComm.stPage=aa[0];
		//if (aa.length>1) PrintComm.stRow=aa[1];
		PrintComm.stPage=0;
		PrintComm.stRow=0;
		PrintComm.previewPrint="1"; //是否弹出设置界面
		//PrintComm.stprintpos=tm[0];
		PrintComm.stprintpos=0;
		//alert(PrintComm.Pages);
		PrintComm.SetConnectStr(CacheDB);
		PrintComm.ItmName = "DHCNurPrnMouldBATY"; //338155!2010-07-13!0:00!!
		//debugger;
	//	var parr="parr:"+EpisodeID+"!"+stdate+"!"+stim+"!"+edate+"!"+etim+"!DHCNURBATY!"+CurrHeadDr+"^";
	var sttym=Ext.getCmp("sttym").getValue();
		if (isNaN(sttym))
		{
		alert("页码必须为数字")	
		return
		}
		else
		{
		if (sttym>0)
		{
		sttym=sttym-1
	  }
		PrintComm.curPages=sttym;
		}
		var StDate = Ext.getCmp("mygridstdate").value;
	  var StTime = Ext.getCmp("mygridsttime").value;
	  var tt2=StTime.split(":")
	  var StTime2=tt2[0]+"&"+tt2[1]
	  var Enddate = Ext.getCmp("mygridenddate").value;
	  var EndTime = Ext.getCmp("mygridendtime").value;
	  var tt3=EndTime.split(":")
	  var EndTime2=tt3[0]+"&"+tt3[1]
	  var parr="parr:"+EpisodeID+"!"+StDate+"!"+StTime2+"!"+Enddate+"!"+EndTime2+"!DHCNURBATY!"+CurrHeadDr+"^";  //DHCNURBATYSJW界面模板名，相应修改
		//var parr=EpisodeID+"!"+stdate+"!"+stim+"!"+edate+"!"+etim+"!DHCNURBATY!"+CurrHeadDr+"^";
		PrintComm.ID = "";
		PrintComm.MultID = "";
		//PrintComm.MthArr="web.DHCConsult:getConsultInfo&id:"+myid;
		if(LabHead!="")PrintComm.LabHead=LabHead;
		PrintComm.SetParrm(parr); // ="EpisodeId" ; //"p1:0^p2:"
		PrintComm.PrintOut();
		var SavePrnSet=document.getElementById('SavePrnSet');
		//debugger;
		var CareDateTim=PrintComm.CareDateTim;
		if (CareDateTim=="") return ;
		var pages=PrintComm.pages;
		var stRow=PrintComm.stRow;
		//debugger;
		var stprintpos=PrintComm.stPrintPos;
		//alert(pages+","+CareDateTim+","+stprintpos+","+EpisodeID+","+"DHCNURBATY"+","+session['LOGON.USERID']+","+PrintComm.PrnFlag);
		//PrnFlag==1说明是打印预览
		if (PrintComm.PrnFlag==1) return;
		//如果原记录保存打印到第8页则当打印第8页之前页时不保存打印记录
		if (pages<aa[0]) return;
		var a=cspRunServerMethod(SavePrnSet.value,pages,CareDateTim,stprintpos,EpisodeID,"DHCNURBATY",session['LOGON.USERID']); //page, caredattim, prnpos, adm,Typ,user
		//find();
}
function printNurRecall()
{
		var GetPrnSet=document.getElementById('GetPrnSet');
		var GetHead=document.getElementById('GetPatInfo');
		var ret=cspRunServerMethod(GetHead.value,EpisodeID);
		var hh=ret.split("^");
		//alert("ddd");
		//debugger;
		var a=cspRunServerMethod(GetPrnSet.value,"DHCNURBATY",EpisodeID); //page, caredattim, prnpos, adm,Typ,user
		if (a=="") return;
		var GetLableRec=document.getElementById('GetLableRec');
		var LabHead=cspRunServerMethod(GetLableRec.value,"DHCNURBATY^"+session['LOGON.CTLOCID']+"^"+EpisodeID+"^"+session['LOGON.USERID']);
		//alert("DHCNURBATYSJW^"+session['LOGON.CTLOCID']+"^"+EpisodeID+"^"+session['LOGON.USERID'])
		var tm=a.split("^");
		var stdate="" //tm[2];
		var stim="" //tm[3];
		var edate="" //tm[4];
		var etim="" //tm[5];
		//PrintComm.RHeadCaption=hh[1];
		//PrintComm.LHeadCaption=hh[0];
		//PrintComm.RFootCaption="第";
		//PrintComm.LFootCaption="页";
		//PrintComm.LFootCaption=hh[2];
		//alert(ret);
		PrintComm.TitleStr=ret;
		PrintComm.SetPreView("1");
		PrintComm.xuflag=0;        //续打配置：1启用续打 0 普通全部打印	
		PrintComm.PrnLoc=session['LOGON.CTLOCID'];
		PrintComm.WebUrl=WebIp+"/dthealth/web/DWR.DoctorRound.cls";
		var aa=tm[1].split("&");
		//PrintComm.stPage=aa[0];
		//if (aa.length>1) PrintComm.stRow=aa[1];
		PrintComm.stPage=0;
		PrintComm.stRow=0;
		PrintComm.previewPrint="1"; //是否弹出设置界面
		//PrintComm.stprintpos=tm[0];
		PrintComm.stprintpos=0;
		
		var sttym=Ext.getCmp("sttym").getValue();
		//alert(sttym)
		if (isNaN(sttym))
		{
		alert("页码必须为数字")	
		return
		}
		else
		{
		if (sttym>0)
		{
		sttym=sttym-1
	  }
		PrintComm.curPages=sttym;
		}
		//alert(PrintComm.Pages);
		PrintComm.SetConnectStr(CacheDB);
		PrintComm.ItmName = "DHCNurPrnMouldBATY"; //338155!2010-07-13!0:00!!   //打印模板名
		//debugger;
		var parr="parr:"+EpisodeID+"!"+stdate+"!"+stim+"!"+edate+"!"+etim+"!DHCNURBATY!"+CurrHeadDr+"^";   //DHCNURBATYSJW界面模板名，相应修改
		PrintComm.ID = "";
		PrintComm.MultID = "";
		//PrintComm.MthArr="web.DHCConsult:getConsultInfo&id:"+myid;
		if(LabHead!="")PrintComm.LabHead=LabHead;
		PrintComm.SetParrm(parr); // ="EpisodeId" ; //"p1:0^p2:"
		PrintComm.PrintOut();
		var SavePrnSet=document.getElementById('SavePrnSet');
		//debugger;
		var CareDateTim=PrintComm.CareDateTim;
		if (CareDateTim=="") return ;
		var pages=PrintComm.pages;
		var stRow=PrintComm.stRow;
		//debugger;
		var stprintpos=PrintComm.stPrintPos;
		//alert(pages+","+CareDateTim+","+stprintpos+","+EpisodeID+","+"DHCNURBATYSJW"+","+session['LOGON.USERID']+","+PrintComm.PrnFlag);
		//PrnFlag==1说明是打印预览
		if (PrintComm.PrnFlag==1) return;
		//如果原记录保存打印到第8页则当打印第8页之前页时不保存打印记录
		if (pages<aa[0]) return;
		var a=cspRunServerMethod(SavePrnSet.value,pages,CareDateTim,stprintpos,EpisodeID,"DHCNURBATYSJW",session['LOGON.USERID']); //page, caredattim, prnpos, adm,Typ,user
		//find();
}
function eachItem(item,index,length) {   
	if (item.xtype=="checkbox") {   
            //修改下拉框的请求地址    
			//debugger;
			if (item.checked==true) checkret=checkret+item.id+"|"+item.boxLabel+"^";
    } 
	  
    if (item.items && item.items.getCount() > 0) {   
       item.items.each(eachItem, this);   
    }   
}   
function UpdateRelDiagnos()
{
	var arr = new Array();
	var a = cspRunServerMethod(pdata1, "", "DHCNurRelDiagnos", EpisodeID, "");
	arr = eval(a);
	var window = new Ext.Window({
		title: '关联诊断记录',
		width: 615,
		height: 235,
		autoScroll: true,
		layout: 'absolute',
		plain: true,
		frame:true,
		//modal: true,
		//bodyStyle: 'padding:5px;',
		///buttonAlign: 'center',
		items: arr
	});
	var butin=Ext.getCmp('diaggridbut1');
	butin.text="确定";
	butin.on('click',UpdateDiagnos);
	var but2=Ext.getCmp('diaggridbut2');
	but2.text="插入小结";
	but2.on('click',UpdateDiagnos1);
	var diaggrid = Ext.getCmp('diaggrid');
	var diagtobar=diaggrid.getTopToolbar();
	diagtobar.addButton({
		className: 'new-topic-button',
		text: "插入24小时",
		handler:UpdateDiagnos2,
		id:'diaggridbut3'
  	});
	//debugger;
	var objRow=grid.getSelectionModel().getSelections();
	if (objRow.length > 0) {
		var inname = objRow[0].get(DisplaySumInName);
		var outname = objRow[0].get(DisplaySumOutName);
		if ((inname)&&(outname)&&((inname.indexOf("入液量") != -1) || (outname.indexOf("出液量") != -1))) {
			butin.hide();
		}
		else {
			but2.hide();
			var but3 = Ext.getCmp('diaggridbut3');
			but3.hide();
		}
	}
	SchDiag();
	window.show();
}
function UpdateDiagnos()
{
	var diaggrid=Ext.getCmp("diaggrid");
	var objDiagnosRow=diaggrid.getSelectionModel().getSelections();
	if (objDiagnosRow.length == 0) { Ext.Msg.alert('提示', "请先选择一条诊断记录!"); return; }
	var objRow=grid.getSelectionModel().getSelections();
	if (objRow.length == 0) { Ext.Msg.alert('提示', "请先选择一条护理记录!"); return; }
	else
	{
		save();
	}
}
function UpdateDiagnos1()
{
	var diaggrid=Ext.getCmp("diaggrid");
	var objDiagnosRow=diaggrid.getSelectionModel().getSelections();
	if (objDiagnosRow.length == 0) { Ext.Msg.alert('提示', "请先选择一条诊断记录!"); return; }
	var objRow=grid.getSelectionModel().getSelections();
	if (objRow.length == 0) { Ext.Msg.alert('提示', "请先选择一条统计记录!"); return; }
	else
	{
		InOutNod();
	}
}
function UpdateDiagnos2()
{
	var diaggrid=Ext.getCmp("diaggrid");
	var objDiagnosRow=diaggrid.getSelectionModel().getSelections();
	if (objDiagnosRow.length == 0) { Ext.Msg.alert('提示', "请先选择一条诊断记录!"); return; }
	var objRow=grid.getSelectionModel().getSelections();
	if (objRow.length == 0) { Ext.Msg.alert('提示', "请先选择一条统计记录!"); return; }
	else
	{
		InOutSum();
	}
}
function SchDiag()
{
	condata=new Array();
	var adm=EpisodeID;
	//var GetQueryData=document.getElementById('GetQueryDatal');
		var GetQueryData=document.getElementById('GetQueryData1');
	//alert(GetQueryData);
	var diaggrid=Ext.getCmp("diaggrid");
	//alert(adm);
 	var a=cspRunServerMethod(GetQueryData.value,"web.DHCNurseRecordComm:GetCopyDiagnos","parr$"+adm,"AddDiag");
  	diaggrid.store.loadData(condata);   
}
function AddDiag(a1,a2,a3,a4,a5)
{
	condata.push({
		DiagNos:a1,
		RecUser:a2,
		RecDate:a3,
		RecTime:a4,
		rw:a5
	});
}
function DBC2SBC(str)   
{
	var result = '';
	if ((str)&&(str.length)) {
		for (i = 0; i < str.length; i++) {
			code = str.charCodeAt(i);
			if (code >= 65281 && code <= 65373) {
				result += String.fromCharCode(str.charCodeAt(i) - 65248);
			}
			else {
				if (code == 12288) {
					result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
				}
				else {
					result += str.charAt(i);
				}
			}
		}
	}
	else{
		result=str;
	}  
	return result;   
}
function CancelRecord()
{
	var objCancelRecord=document.getElementById('CancelRecord');
	var objRow=grid.getSelectionModel().getSelections();
	if (objRow.length == 0) { Ext.Msg.alert('提示', "请先选择一条护理记录!"); return; }
	else
	{
		Ext.Msg.show({    
	       title:'再确认一下',    
	       msg: '你确定要作废此条护理记录吗?',    
	       buttons:{"ok":"确定","cancel":"取消"},
	       fn:  function(btn, text){    
	            if (btn == 'ok'){    
					var par=objRow[0].get("par");
					var rw=objRow[0].get("rw");
					//alert(par+","+rw+","+session['LOGON.USERID']+","+session['LOGON.GROUPDESC']);
					if (objCancelRecord) {
						var a = cspRunServerMethod(objCancelRecord.value, par, rw, session['LOGON.USERID'], session['LOGON.GROUPDESC']);
						if (a!=0){
							alert(a);
							return;
						}else{
							find();
						}
					}
	            }    
	        },    
	       animEl: 'newbutton'   
	    });
	}
}
function additmstat(statenddate,statendtime)
{
  	var Plant = Ext.data.Record.create([
	{name:'CareDate'}, 
	{name:'CareTime'},
	{name:'Item1'},
	{name:'Item2'},
	{name:'Item3'},
	{name:'Item4'},
	{name:'Item5'},
	{name:'Item6'},
	{name:'Item7'},
	{name:'Item8'},
	{name:'Item9'}, 
	{name:'Item10'},
	{name:'Item11'},
	{name:'Item12'},
	{name:'Item13'},
	{name:'Item14'},
	{name:'Item15'},
	{name:'Item16'},
	{name:'Item17'}, 
	{name:'Item18'},
	{name:'Item19'}, 
	{name:'Item20'},
	{name:'Item21'},
	{name:'Item22'},
	{name:'Item23'},
	{name:'Item24'},
	{name:'Item25'},
	{name:'Item26'},
	{name:'Item27'},
	{name:'Item28'},
	{name:'Item29'},
	{name:'Item30'},
	{name:'Item31'},
	{name:'Item32'},
	{name:'Item33'},
	{name:'Item34'},
	{name:'Item35'},
	{name:'Item36'},
	{name:'Item37'},
	{name:'Item38'},
	{name:'Item39'},
	{name:'Item40'},
	{name:'Item41'},
	{name:'Item42'},
	{name:'Item43'},
	{name:'Item44'},
	{name:'Item45'},
	{name:'Item46'},
	{name:'Item47'}, 
	{name:'Item48'},
	{name:'Item49'},
	{name:'Item50'},
	{name:'CaseMeasure'},
	{name:'User'},
	{name:'rw'},
	{name:'par'}
      ]);
    var count = grid.store.getCount(); 
    var r = new Plant({CareDate:getDate(statenddate),CareTime:statendtime}); 
    grid.store.commitChanges(); 
    grid.store.insert(0,r); 
     //grid.store.insert(count,r);
   return;
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               function XuInt()
{
	var lnk= WebIp+"/dhcmg/续打使用说明.doc" 
	wind22=window.open(lnk,"htmi",'left=10,toolbar=no,location=no,directories=no,resizable=yes,width=1200,height=700');
}
//续打
function printNurRecXu()
{
		var GetPrnSet=document.getElementById('GetPrnSet');
		var GetHead=document.getElementById('GetPatInfo');
		var ret=cspRunServerMethod(GetHead.value,EpisodeID);
		var hh=ret.split("^");
		var a=cspRunServerMethod(GetPrnSet.value,EmrCode,EpisodeID); //page, caredattim, prnpos, adm,Typ,user
		if (a=="") return;
		var GetLableRec=document.getElementById('GetLableRec');
		var LabHead=cspRunServerMethod(GetLableRec.value,EmrCode+"^"+session['LOGON.CTLOCID']);
		var tm=a.split("^");
		var stdate="" //tm[2];
		var stim="" //tm[3];
		var edate="" //tm[4];
		var etim="" //tm[5];
		PrintComm.RHeadCaption=hh[1];
		PrintComm.LHeadCaption=hh[0];
		PrintComm.TitleStr=ret;
		PrintComm.LFootCaption=hh[2];
		PrintComm.SetPreView("1"); //打印时是否预览：1预览，0不预览
		//PrintComm.PrnLoc=session['LOGON.CTLOCID']; //如果没更新转科这句放开
		PrintComm.PrnLoc=patloc ;  //转科打印时设置床号 如果没更新转科这句屏蔽
		PrintComm.PrnBed=bedCode ; //转科打印时设置床号  如果没更新转科这句屏蔽
		PrintComm.tranflag="0"     //转科打印设置:0不启用 1启用转科打印
		PrintComm.dxflag="1"       //分割线设置：1一行记录打印一条线 0 一行打印一条线		
		PrintComm.xuflag=1;        //续打配置：1启用续打 0 普通全部打印	
		PrintComm.previewPrint="0";//是否弹出设置界面:0不弹出，1弹出
		PrintComm.ItmName = prncode;//打印模板名称取的是配置
		PrintComm.WebUrl=WebIp+"/dthealth/web/DWR.DoctorRound.cls";
		PrintComm.stPage=0;
		PrintComm.stRow=0;		
		PrintComm.stprintpos=0;					
		var parr=EpisodeID+"!"+stdate+"!"+stim+"!"+edate+"!"+etim+"!"+EmrCode+"!"; //注意不要少了最后一个！
		PrintComm.ID = "";
		PrintComm.MultID = "";
		//PrintComm.MthArr="web.DHCConsult:getConsultInfo&id:"+myid;	//混合模板打印	
		if(LabHead!="")PrintComm.LabHead=LabHead;	
		PrintComm.SetParrm(parr); // ="EpisodeId" ; //"p1:0^p2:"
		PrintComm.PrintOut();		
    setTimeout("find()",0)
    setcolor(grid) //续打设置颜色	
}
//设置续打起始位置
function SetXu()
{
  if ((StartLock!="1")||(prnmode=="")) //没有开启续打
  {
    return
  }
	var objRow=grid.getSelectionModel().getSelections();
	if (objRow.length > 0) 
	{			
	}
	else
	{
	  Ext.Msg.alert('提示', "请先选择一条记录!"); 
	  return; 
	}
  var arr = new Array();
	var a = cspRunServerMethod(pdata1, "", "DHCNUR_SetXu", EpisodeID, "");
	arr = eval(a);
	var window = new Ext.Window({
		title: '补打设置',
		width: 320,
		height: 200,
		autoScroll: true,
		layout: 'absolute',
		plain: true,
		frame:true,
		//modal: true,
		//bodyStyle: 'padding:5px;',
		///buttonAlign: 'center',
		items: arr
	});	  
	  var idrw = objRow[0].get("rw");
		var idpar = objRow[0].get("par");
		if (idpar==undefined)
    {
            alert("请选择已保存过得记录!");
            find()
						return;
    }
		var User = objRow[0].get("User");
		var CareDate = objRow[0].get("CareDate");
		var CareTime = objRow[0].get("CareTime");
		var select=Ext.getCmp('sel');
		var select2=Ext.getCmp('page')
    var select3=Ext.getCmp('row')
    var hnum=Ext.getCmp('hnum')
    var pflag=Ext.getCmp('pflag')
    pflag.disable()
    hnum.disable()
    select.disable()  
		select.setValue(formatDate(CareDate)+"/"+(CareTime)+"/"+User)
		var but=Ext.getCmp('butSave');
	  but.on('click',SaveSetXu);
	  var but2=Ext.getCmp('Cancel');
	  but2.on('click',Cancel);
	  var id=idpar+"&"+idrw   
	  var info=tkMakeServerCall("Nur.DHCNurRecPrint","getval",id)
	  var infoST=tkMakeServerCall("Nur.DHCNurRecPrintStPos","getval",EpisodeID+"&"+prncode)	
	  var arr 
	  if (infoST!="")
	  {	     	  
	      arr=infoST.split('^') 
	      var nowid=idpar+"||"+idrw   
	      if (arr[0]!=nowid)  //选中行不是续打记录最后一条
	      {
	         if (info!="")
	         {
	           var arr2=info.split('^')  
	           if (arr2[1]!="")   //已打印
	           {
	              var pp2=parseInt(arr2[1])+parseInt(1)
	              var rr2=parseInt(arr2[2])+parseInt(1)     
	              select2.setValue(pp2)
	              select3.setValue(rr2)
	              var hstr=rr2+parseInt(arr2[3])-parseInt(1)+"行(该条记录占"+arr2[3]+"行)"
	              hnum.setValue(hstr)
	              pflag.setValue("已打印")
	           }
	           else
	           {
	              pflag.setValue("未打印")
	           }
	         }
	        else
	        {
	           pflag.setValue("未打印")
	        }
	     }
	    else
	    { 
	      if (arr[3]=="0") //从该条开始打印
	      {
	        var pp=parseInt(arr[1])+parseInt(1)
	        var rr=parseInt(arr[2])+parseInt(1)       
	        select2.setValue(pp)
	        select3.setValue(rr)
	        if (arr[4]!="")
	        {
	          var hstr2=parseInt(arr[2])+parseInt(arr[4])+"行(该条记录占"+arr[4]+"行)"
	          hnum.setValue(hstr2)
	        }
	        pflag.setValue("未打印")
	      }
	      if (arr[3]=="1") //该条已经打印
	      {
	        var pp2=parseInt(arr[1])+parseInt(1)
	        var rr2=parseInt(arr[2])-parseInt(arr[4])+parseInt(1)
	        select2.setValue(pp2)
	        select3.setValue(rr2)
	        var hstr3=arr[2]+"行(该条记录占"+arr[4]+"行)"
	        hnum.setValue(hstr3)
	        pflag.setValue("已打印")
	      }
	    }
	    
	    if (arr[5]!=undefined)
	    {
	      var pstrs=pflag.getValue()+"(每页可打印"+arr[5]+"行)"
	      pflag.setValue(pstrs)
	    }	      
	  }
	  else
	  {
	    pflag.setValue("未打印")
	  }	  
	 window.show();
	 
	 function Cancel()
	 {
	   window.close()
	 }
   function SaveSetXu()
   {
	   
      var pages=select2.getValue()
      var rows=select3.getValue()
      //alert(arr[5])
      if ((pages=="")||(rows==""))
      {
         alert("开始页码和行数都不能为空!");
			   return;
      }
      if (isNaN(pages))
      {
            alert("页码请录入数字!");
						return;
      }
       if (isNaN(rows))
      {
            alert("行数请录入数字!");
						return;
      }
       if ((parseInt(pages)<1)||(parseInt(rows)<1)||(parseInt(rows)>parseInt(arr[5])))
      {
            alert("页码或行数必须大于0!"+"小于等于"+arr[5]+"行");
						return;
      }
      var stpage=parseInt(pages)-parseInt(1)
      var strow=parseInt(rows)-parseInt(1)
      var str=id+"^"+stpage+"^"+strow+"^^^^^"
      var ret=tkMakeServerCall("Nur.DHCNurRecPrintStPos","Save",str,EpisodeID,prncode,"0")
      if (ret=="0")
      {
        Ext.Msg.show({    
	       title:'确认一下',    
	       msg: '设置成功! 您要开始续打吗？',    
	       buttons:{"ok":"是     ","cancel":"  否"},
	       fn:  function(btn, text){    
	            if (btn == 'ok'){   	
	            printNurRecXu()	            
	            }
					        else
	            {     	}	            
	        },    
	       animEl: 'newbutton'   
	       });
	       window.close()
	       setTimeout("find()",0)
         setcolor(grid)       
      }
      //alert(ret)	  
   }
 
} 


//续打设置颜色
function setcolor(grid)
{
  if ((StartLock!="1")||(prnmode=="")) //没有开启续打
  {
    return
  }
  var StDate = Ext.getCmp("mygridstdate");
	var StTime = Ext.getCmp("mygridsttime");
	var Enddate = Ext.getCmp("mygridenddate");
	var EndTime = Ext.getCmp("mygridendtime");
	var mygrid = Ext.getCmp("mygrid");
	var params=EpisodeID+"&"+prncode+"&"+ StDate.value + "&" + StTime.value.replace(":","*") + "&" + Enddate.value + "&" + EndTime.value.replace(":","*")
	printinfo=tkMakeServerCall("Nur.DHCNurRecPrint","getprintinfo",params)
  printarr=printinfo.split('&')
  //alert(printarr)
  printinfoST=tkMakeServerCall("Nur.DHCNurRecPrintStPos","getval",EpisodeID+"&"+prncode+"&")
  printarrST=printinfoST.split('^')
	grid.getStore().on('load',function(s,records){
          var girdcount=0;
          s.each(function(r){             
                 var rowid=r.get("par")+"||"+r.get("rw")  
                 if (printinfoST!="")
                 {    
                    //alert(printinfoST[0]) 
                    //alert(rowid) 
                    if (rowid!=printarrST[0])   
                    {                            
                      if (printarr[0].indexOf(rowid)>-1) //该条记录已打印
                      {                    
                         grid.getView().getRow(girdcount).style.backgroundColor=printcolor;                      
                      }
                      if (printarr[1].indexOf(rowid)>-1) //该条记录未打印
                      {
                         grid.getView().getRow(girdcount).style.backgroundColor=noprintcolor;
                      }
                      if (printarr[2].indexOf(rowid)>-1) //该条记录有修改
                      {
                         grid.getView().getRow(girdcount).style.backgroundColor=havechangecolor;
                      }   
                    }
                    else  //打印记录索引行
                    {          
                      //alert(printarrST[3])  
                          
                      var pinfo=tkMakeServerCall("Nur.DHCNurRecPrint","getval",r.get("par")+"&"+r.get("rw")  )   
                      var pprr=pinfo.split('^')   
                     // alert(pprr)                 
                      if (printarrST[3]=="0")
                      {                        
                         grid.getView().getRow(girdcount).style.backgroundColor=Startcolor;
                      }  
                      else if (pprr[4]=="2") //该条有修改
                      {
                      
                         grid.getView().getRow(girdcount).style.backgroundColor=havechangecolor; 
                      }
                      else
                      {
                        grid.getView().getRow(girdcount).style.backgroundColor=printcolor; 
                      }
                    }               
                  }                    
                   girdcount=girdcount+1;           
                 });
                 //scope:this
          });
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
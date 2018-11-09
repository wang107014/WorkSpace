/**
 * @author Administrator
 */
/*
 grid.store.on('load', function() {
    grid.el.select("table[class=x-grid3-row-table]").each(function(x) {
        x.addClass('x-grid3-cell-text-visible');
    });
});
var DHCPatOrdListT103=new Ext.data.JsonStore({data:[],fields:['OrdDate','OrdTime','ARCIMDesc','PriorDes','Meth','PHFreq','Dose','DoseUnit','OrdStat','Doctor','Oew','OrdSub','SeqNo']});
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
var DHCNurCheckRecT102=new Ext.data.JsonStore({data:[],fields:['OrdDate','OrdTime','ARCIMDesc','DateEx','TimeEx','CPTEx','ArcimDR','ORW']});
var DHCNurLabRecT103=new Ext.data.JsonStore({data:[],fields:['StDateTime','ARCIMDes','LabEpisodeNo','testcode','LabDate','LabTime','LabCpt','RowId']});
var DHCPatOrdListT103=new Ext.data.JsonStore({data:[],fields:['OrdDate','OrdTime','ARCIMDesc','PriorDes','Meth','PHFreq','Dose','DoseUnit','OrdStat','Doctor','Oew','OrdSub','Sel','SeqNo']});
var DHCNurRelDiagnosT101=new Ext.data.JsonStore({data:[],fields:['DiagNos','RecUser','RecDate','RecTime','rw']});
var DHCPatOrdListT103=new Ext.data.JsonStore({data:[],fields:['OrdDate','OrdTime','ARCIMDesc','PriorDes','Meth','PHFreq','Dose','DoseUnit','OrdStat','Doctor','Oew','OrdSub','SeqNo']});
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
var GetNurseRecSet=document.getElementById('GetNurseRecSet');
if (GetNurseRecSet){
	var ret=cspRunServerMethod(GetNurseRecSet.value,"DHCNURBG_XSEKWZHLJLDFY");
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
var grid1;
var DiagnosDr="";
var CurrHeadDr="";
var BFHeadDr="";
function gethead()
{
	var GetCurrHeadDR=document.getElementById('GetCurrHeadDR');
	//alert(EmrCode);
	var ret=cspRunServerMethod(GetCurrHeadDR.value,EpisodeID,session['LOGON.USERID'],EmrCode);
	if (ret!="")
	{
		var dd=ret.split("||");
		CurrHeadDr=dd[0]+"_"+dd[1];
		//alert(CurrHeadDr)
	} 
	//取表头列表
	var list = tkMakeServerCall("Nur.DHCNurRecHeadChangeRec","getbtlist", EpisodeID,session['LOGON.USERID'],EmrCode);
	var listarr=list.split("^")
	//alert(listarr)
	for (i=0;i<listarr.length;i++)
  {
   if ((listarr[i]==CurrHeadDr)&&(i>0))
    {
      BFHeadDr=listarr[i-1]
    }
     if (i==0)
      {
      BFHeadDr=0
      }
   }
 	//alert(BFHeadDr)
 
	var GetHead=document.getElementById('GetHead');
	var ret=cspRunServerMethod(GetHead.value,EpisodeID);
	var hh=ret.split("^");
	return hh[0]+"  "+hh[1];
	//debugger;
}
var locdata = new Array();
var loc = session['LOGON.CTLOCID'];
cspRunServerMethod(getadmhead,EpisodeID,session['LOGON.USERID'],EmrCode,'addloc');
function addloc(a, b) {
	locdata.push({
				loc : a,
				locdes : b
			});
}
var storeloc = new Ext.data.JsonStore({
			data : locdata,
			fields : ['loc', 'locdes']
		});
var locField = new Ext.form.ComboBox({
			id : 'locsys',
			hiddenName : 'loc1',
			store : storeloc,
			width : 600,
			fieldLabel : '表头',
			valueField : 'loc',
			displayField : 'locdes',
			allowBlank : false,
			mode : 'local',
			editable: false,
			triggerAction : 'all',
			anchor : '100%'
		});
var CurrHeadDr=""
locField.on('select', function() {
      CurrHeadDr= Ext.get("loc1").dom.value;
       //alert(CurrHeadDr)
      var a=cspRunServerMethod(Savecurhead,EpisodeID, CurrHeadDr, session['LOGON.USERID'], EmrCode);
      self.location.reload(); 
			find2();
		});
		
function setbt()
{
  CurrHeadDr= Ext.get("loc1").dom.value;
  var a=cspRunServerMethod(Savecurhead,EpisodeID, CurrHeadDr, session['LOGON.USERID'], EmrCode);
  self.location.reload(); 
  find2()
}
 var wind3;   //全局变量
 var kkk=0
 var ddd=0
 
 //表头变更记录
 function btlist()
{
		
		var lnk= "DHCNurEmrComm.csp?"+"&EmrCode=DHCNURHEADCHANGE&EpisodeID="+EpisodeID+"&headcode="+EmrCode //""+"&Status="+""  ;//"&DtId="+DtId+"&ExamId="+ExamId
	 
     var ddd=kkk%2 
	  
	   if (ddd==0)
	   {	   	
	   wind3= window.open(lnk,"html22ww",'left=200,top=300,toolbar=no,location=no,directories=no,resizable=yes,width=800,height=400');
	   kkk=kkk+1;
	   }
	   else 
	   	{
	   		 if(typeof(wind3)!="undefined"&&wind3.open&&!wind3.closed)  //判断是否存在子窗口并处于打开状态
         {   
            wind3.close();  //关闭子窗口
            CurrHeadDr= Ext.get("loc1").dom.value;
            var a=cspRunServerMethod(Savecurhead,EpisodeID, CurrHeadDr, session['LOGON.USERID'], EmrCode);
            self.location.reload(); 
            find()
          }      
          kkk=kkk+1;
	   	}

}
function BodyLoadHandler(){

	setsize("mygridpl","gform","mygrid");
  grid1=Ext.getCmp("mygrid");
	grid1.on('click',gridclick);
	var but1=Ext.getCmp("mygridbut1");
	but1.on('click',additm);
	var but=Ext.getCmp("mygridbut2");
	but.setText("保存");
	//but.icon='../scripts/nurse/image/save.png'
	but.on('click',save);
	
	setsize2("mygrid1pl","gform","mygrid1");
  grid2=Ext.getCmp("mygrid1");
	grid2.on('click',grid1click);
	var but2=Ext.getCmp("mygrid1but1");
	but2.on('click',additm1);
	var but3=Ext.getCmp("mygrid1but2");
	but3.setText("保存");
	but3.on('click',save1);
	
	Ext.override(Ext.Editor, {
			onSpecialKey : function(field, e) {
				var key = e.getKey();
				this.fireEvent('specialkey', field, e);
			}
		});
	Ext.override(Ext.grid.RowSelectionModel, {
			onEditorKey : function(F, E) {
				var C = E.getKey(), G, D = this.grid, B = D.activeEditor;
				var L,K=this.grid1,M=K.activeEditor;
				var A = E.shiftKey;
				if (C == E.TAB) {
					E.stopEvent();
					B.completeEdit();
					M.completeEdit();
					if (A) {
						G = D.walkCells(B.row, B.col - 1, -1, this.acceptsNav,
								this);
								L = K.walkCells(M.row, M.col - 1, -1, this.acceptsNav,
								this);
					} else {
						G = D.walkCells(B.row, B.col + 1, 1, this.acceptsNav,
								this);
						L = K.walkCells(M.row, M.col + 1, 1, this.acceptsNav,
								this);		
					}
				} else {
					if (C == E.ENTER) {
						E.stopEvent();
						// alert(B);
						B.completeEdit();
						M.completeEdit();
						if (this.moveEditorOnEnter !== false) {
							if (A) {
								// G = D.walkCells(B.row - 1, B.col, -1,
								// this.acceptsNav,this)
								G = D.walkCells(B.row, B.col - 1, -1,this.acceptsNav, this);
								L = K.walkCells(M.row, M.col - 1, -1, this.acceptsNav,this);		
							} else {
								// G = D.walkCells(B.row + 1, B.col, 1,
								// this.acceptsNav,this)
								G = D.walkCells(B.row, B.col + 1, 1,this.acceptsNav, this);
								L = K.walkCells(M.row, M.col + 1, 1, this.acceptsNav,this);
							}
						}
					} else {
						if (C == E.ESC) {
							B.cancelEdit();
							M.cancelEdit();
						}
					}
				}
				if (G) {
					D.startEditing(G[0], G[1]);
				}
				if (L) {
					K.startEditing(L[0], L[1]);
				}
			}
		});
		
    var sm2 = new Ext.grid.RowSelectionModel({   
        moveEditorOnEnter: true,   
        singleSelect: false,   
        listeners: {   
            //rowselect : function(sm, row, rec) {   
                //centerForm.getForm().loadRecord(rec);   
           // }     saveAll
        }   
  
    });
     
  	grid=Ext.getCmp('mygrid');
  	grid.setTitle(gethead());
  	var mydate=new Date();
  	var tobar=grid.getTopToolbar();
  	/*
  	tobar.addButton(
	  {
		//className: 'new-topic-button',
		text: "全部保存",
		handler:saveAll,
		//icon:'../scripts/nurse/image/save.png',
		id:'mygridSchall'
	  }

	);
	 tobar.addItem("-"); 
	 */ 
	tobar.addItem(
	    {
			xtype:'datefield',
			format: 'Y-m-d',
			id:'mygridstdate',
			
			value:(diffDate(new Date(),0))
		},
	    {
			xtype:'timefield',
			width:50,
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
			width:50,
			id:'mygridendtime',
			format: 'H:i',
			value:'0:00'
		}
	);
	 tobar.addItem("-"); 
	tobar.addButton(
	  {
		className: 'new-topic-button',
		text: "查询",
		handler:find,
		//icon:'../scripts/nurse/image/find.png',
		id:'mygridSch'
	  }

	);
	/*
	  tobar.addItem("-"); 
    tobar.addButton(
		  {
			//className: 'new-topic-button',
			text: "统计",
			handler:findStat,
			id:'mygridStat'
		  }
	  );
	   */
	  tobar.addItem("-"); 
   // tobar.addButton(
	//	  {
			//className: 'new-topic-button',
	//		text: "24h统计(6-17)",
	//		handler:findStat2,
	//		id:'mygridStat2'
	//	  }
	//  );
	  //tobar.addItem("-"); 
	  /*
	  tobar.addButton(
		  {
			//className: 'new-topic-button',
			text:"出量统计",
			handler:findStatCL,
			id:'mygridStatCL'
		  }
	  );
	 tobar.addButton(
	{
			className: 'new-topic-button',
			text: "特殊字符",
			handler:SepcialChar,
			id:'PrintBut'
		  }
	  );
	 */
   	tobar.addButton(
		  {
			//className: 'new-topic-button',
			text: "打印",
			handler:printNurRec,
			id:'PrintBut'
		  }
	  );
	   tobar.addItem("-"); 
	  tobar.addButton(
		  {
			//className: 'new-topic-button',
			text: "知识链接维护",
			handler:KnLinkGrid,
			id:'KnLinkBut'
		  }
	  );
	   tobar.addItem ("-",{
			xtype:'checkbox',
			id:'IfCancelRec',
			checked:false,
			boxLabel:'显示作废记录' 		
	});
	  /*
	   	tobar.addButton(
		  {
			//className: 'new-topic-button',
			text: "打印",
			handler:printNurRec,
			id:'PrintBut2'
		  }
	  );
	   */
	 
	  
	   //tobar.addButton(
		 // {
			//className: 'new-topic-button',
		//	text: "设为当前表头",
		//	handler:setbt,
			//id:'setbt'
		  //}
	 // );  
 	//tobar.addButton(
	//	  {
	//		//className: 'new-topic-button',
	//		text: "续打印设置",
	//		handler:PrintSet,
	//		id:'XPrintSet'
	//	  }
	//  );
/*
   	tobar.addItem ("-",{
			xtype:'checkbox',
			id:'IfCancelRec',
			checked:false,
			boxLabel:'显示作废记录' 		
	});
	
	 tobar.addItem("-"); 
     tobar.addItem(
	    '开始页码', {
				xtype : 'textfield',
				id : 'curpage',
				width : 20,
				fieldLabel : '起始页码'
			}
	   )
	   tobar.addItem("-"); 
	     tobar.addItem(
	    {
			xtype:'datefield',
			format: 'Y-m-d',
			id:'prndate',
			value:(diffDate(new Date(),0))
		}
		);
		tobar.addButton(
		  {			
			text: "打印",
			handler:printNurRec3,
			id:'PrintBut3'
		  }
	  );  
	  tobar.addItem("-"); 
		tobar.addButton(
		  {			
			text: "打印病情",
			handler:printNurRecbq,
			id:'PrintButbq'
		  }
	  );  
	  */
	//tobar.render(grid.tbar);
	
		tbar2=new Ext.Toolbar({
		
		});	

	
      tbar2.addButton(
		  {
			//className: 'new-topic-button',
			text: "表头变更记录",
			handler:btlist,
			id:'btlist'
		  }
	  );  
	  
	   tbar2.addItem("-"); 
	   tbar2.addItem('当前表头', locField)
	  
  tbar2.render(grid.tbar);

	 tobar.doLayout(); 
	 locField.setValue(CurrHeadDr);
	  
	  
	  grid1=Ext.getCmp('mygrid1');
  	grid1.setTitle(gethead());
  	var mydate=new Date();
  	var tobar1=grid1.getTopToolbar();
  	
	tobar1.addItem(
	    {
			xtype:'datefield',
			format: 'Y-m-d',
			id:'mygridstdate1',
			
			value:(diffDate(new Date(),0))
		},
	    {
			xtype:'timefield',
			width:50,
			format: 'H:i',
			value:'0:00',
			id:'mygridsttime1'
		},
	    {
			xtype:'datefield',
			format: 'Y-m-d',
			id:'mygridenddate1',
			value:diffDate(new Date(),1)
		},
	    {
			xtype:'timefield',
			width:50,
			id:'mygridendtime1',
			format: 'H:i',
			value:'0:00'
		}
	);
	 tobar1.addItem("-"); 
	tobar1.addButton(
	  {
		className: 'new-topic-button',
		text: "查询",
		handler:find1,
		//icon:'../scripts/nurse/image/find.png',
		id:'mygridSch1'
	  }

	);
	  tobar1.addItem("-"); 
    tobar1.addButton(
		  {
			//className: 'new-topic-button',
			text: "统计",
			handler:findStat,
			id:'mygridStat1'
		  }
	  );
	 // tobar.addItem("-"); 
   // tobar.addButton(
	//	  {
			//className: 'new-topic-button',
	//		text: "24h统计(6-17)",
	//		handler:findStat2,
	//		id:'mygridStat2'
	//	  }
	//  );
	  tobar1.addItem("-"); 
	  /*
	  tobar.addButton(
		  {
			//className: 'new-topic-button',
			text:"出量统计",
			handler:findStatCL,
			id:'mygridStatCL'
		  }
	  );
	 tobar.addButton(
	{
			className: 'new-topic-button',
			text: "特殊字符",
			handler:SepcialChar,
			id:'PrintBut'
		  }
	  );
	 
   	tobar.addButton(
		  {
			//className: 'new-topic-button',
			text: "打印",
			handler:printNurRec,
			id:'PrintBut'
		  }
	  );
	  */
	   	tobar1.addButton(
		  {
			//className: 'new-topic-button',
			text: "打印",
			handler:printNurRec1,
			id:'PrintBut21'
		  }
	  );
	  tobar1.addItem("-");  
	 
	  
	   //tobar.addButton(
		 // {
			//className: 'new-topic-button',
		//	text: "设为当前表头",
		//	handler:setbt,
			//id:'setbt'
		  //}
	 // );  
 	//tobar.addButton(
	//	  {
	//		//className: 'new-topic-button',
	//		text: "续打印设置",
	//		handler:PrintSet,
	//		id:'XPrintSet'
	//	  }
	//  );
    tobar1.addButton(
		  {
			//className: 'new-topic-button',
			text: "知识链接维护",
			handler:KnLinkGrid1,
			id:'KnLinkBut1'
		  }
	  );
   	tobar1.addItem ("-",{
			xtype:'checkbox',
			id:'IfCancelRec1',
			checked:false,
			boxLabel:'显示作废记录' 		
	});
	/*
	 tobar.addItem("-"); 
     tobar.addItem(
	    '开始页码', {
				xtype : 'textfield',
				id : 'curpage',
				width : 20,
				fieldLabel : '起始页码'
			}
	   )
	   tobar.addItem("-"); 
	     tobar.addItem(
	    {
			xtype:'datefield',
			format: 'Y-m-d',
			id:'prndate',
			value:(diffDate(new Date(),0))
		}
		);
		tobar.addButton(
		  {			
			text: "打印",
			handler:printNurRec3,
			id:'PrintBut3'
		  }
	  );  
	  tobar.addItem("-"); 
		tobar.addButton(
		  {			
			text: "打印病情",
			handler:printNurRecbq,
			id:'PrintButbq'
		  }
	  );  
	  */
	//tobar.render(grid.tbar);
	
		tbar21=new Ext.Toolbar({
		
		});	

	
             	
	  
  tbar21.render(grid1.tbar);

	tobar1.doLayout(); 
 	//if (UserType=="DOCTOR")
 	//{
 		//if (but1) but1.hide();
 		//if (but) but.hide();
 		//var obj=Ext.getCmp("PrintBut");
 		//if (obj) obj.hide();
  		var obj=Ext.getCmp("XPrintSet");
 		//if (obj) obj.hide();		
 	//}
 	//else
 	{
		grid.addListener('rowcontextmenu', rightClickFn);
		grid.addListener('rowclick', rowClickFn);
		grid.on('beforeedit', beforeEditFn);
		
		grid1.addListener('rowcontextmenu', rightClickFn1);
		grid1.addListener('rowclick', rowClickFn);
		grid1.on('beforeedit', beforeEditFn);
 	}
/*
grid.on('mouseover',function(e){//添加mouseover事件
	var phaLoc = "DHCNURBG_XSEKWZHLJLDFY";
	var rowCount = grid.getStore().getCount();
		if (rowCount>0)
		{  
			var ShowInCellIndex=3;  //在第几列显示
			var index = grid.getView().findRowIndex(e.getTarget());
			var record = grid.getStore().getAt(index);
			if (record)
			{
				var desc=record.data.par;
				var inci=record.data.rw;
			}
	        
			ShowListWin(e,grid,ShowInCellIndex,desc,inci,phaLoc);
		}
	},this,{buffer:200}); 	
*/	
	
grid.on('mouseover',function(e){//添加mouseover事件
	var index = grid.getView().findRowIndex(e.getTarget());//根据mouse所在的target可以取到列的位置
	if(index!==false){//当取到了正确的列时，（因为如果传入的target列没有取到的时候会返回false）
		var store = grid.getStore();
		var totalRow="";
		if (store.getCount()>0) totalRow=store.getAt(index).get(DisplaySumInName);
		var record = grid.getStore().getAt(index);
		var Knlink=tkMakeServerCall("web.DHCNurHCRecComm", "GetKnLink","DHCNURBG_XSEKWZHLJLDFY","mygrid");
		if ((record)&&(Knlink!=""))
		{ 
			
			var KnRow;
			
			var str111=Knlink.split('^');
			var len=str111.length;
			//alert(str111)
			for(var j=0;j<len;j++)
			{
			var tmpstr=str111 [j];
			//alert(tmpstr)
			if(tmpstr==" ") continue;
			KnRow=tmpstr.split('@');
			//alert(KnRow)
			var str="<TABLE borderColor=#000000 width='100%' bgColor=#ffffff border=1 cellSpacing=0 cellPadding=0 fontsize=22 ><TBODY>";
			//str=str+"<TR bgColor=#D2E9FF><TD>说明</TD></TR>";
			var Knstrdd=KnRow[2].replace("#",",")
			str=str+"<TR><TD width=60><font size=3>"+KnRow[0]+"</font></TD><TD><font size=3>"+Knstrdd+"</font></TD></TR>";
			str=str+"</TBODY></TABLE>";
			
			var cellIndex = grid.getView().findCellIndex(e.getTarget());
			if(cellIndex==KnRow[1]){
			var rowEl = Ext.get(e.getTarget());//把target转换成Ext.Element对象
			rowEl.set({
				'ext:qtip':str  //设置它的tip属性
			},false);
				
			}
		}
			//var ShowInCellIndex=3;  //在第几列显示
			//ShowListWin(e,grid,ShowInCellIndex,"DHCNURBG_XSEKWZHLJLDFY");
			}
		if ((totalRow)&&(totalRow.indexOf("入液量")>-1))
		{
			//var record = store.getAt(index);//把这列的record取出来
			//var str = Ext.encode(record.data);//组装一个字符串，这个需要你自己来完成，这儿我把他序列化
			var par=store.getAt(index).get("par");
			var rw=store.getAt(index).get("rw");
			var totalRow1="",totalRow2="",totalRow3="",totalRow4="";
			
			
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
grid1.on('mouseover',function(e){//添加mouseover事件
	var index1 = grid1.getView().findRowIndex(e.getTarget());//根据mouse所在的target可以取到列的位置
	if(index1!==false){//当取到了正确的列时，（因为如果传入的target列没有取到的时候会返回false）
		var store1 = grid1.getStore();
		var totalRow="";
		if (store1.getCount()>0) totalRow=store1.getAt(index1).get(DisplaySumInName);
		var record1 = grid1.getStore().getAt(index1);
		var Knlink1=tkMakeServerCall("web.DHCNurHCRecComm", "GetKnLink","DHCNURBG_XSEKWZHLJLDFY","mygrid1");
		if ((record1)&&(Knlink1!=""))
		{ 
			
			var KnRow1;
			
			var str1112=Knlink1.split('^');
			var len1=str1112.length;
			//alert(str111)
			for(var k=0;k<len1;k++)
			{
			var tmpstr1=str1112 [k];
			//alert(tmpstr)
			if(tmpstr1==" ") continue;
			KnRow1=tmpstr1.split('@');
			//alert(KnRow)
			var str1="<TABLE borderColor=#000000 width='100%' bgColor=#ffffff border=1 cellSpacing=0 cellPadding=0 fontsize=22 ><TBODY>";
			//str=str+"<TR bgColor=#D2E9FF><TD>说明</TD></TR>";
			var Knstrdd1=KnRow1[2].replace("#",",")
			str1=str1+"<TR><TD width=60><font size=3>"+KnRow1[0]+"</font></TD><TD><font size=3>"+Knstrdd1+"</font></TD></TR>";
			str1=str1+"</TBODY></TABLE>";
			
			var cellIndex1 = grid1.getView().findCellIndex(e.getTarget());
			if(cellIndex1==KnRow1[1]){
			var rowEl1 = Ext.get(e.getTarget());//把target转换成Ext.Element对象
			rowEl1.set({
				'ext:qtip':str1  //设置它的tip属性
			},false);
				
			}
		}
			//var ShowInCellIndex=3;  //在第几列显示
			//ShowListWin(e,grid,ShowInCellIndex,"DHCNURBG_XSEKWZHLJLDFY");
			}
		if ((totalRow)&&(totalRow.indexOf("入液量")>-1))
		{
			//var record = store.getAt(index);//把这列的record取出来
			//var str = Ext.encode(record.data);//组装一个字符串，这个需要你自己来完成，这儿我把他序列化
			var par=store1.getAt(index1).get("par1");
			var rw=store1.getAt(index1).get("rw1");
			var totalRow1="",totalRow2="",totalRow3="",totalRow4="";
			
			//alert(par+"^"+rw)
			if ((par)&&(rw))
			{
				var GetSubInOut=document.getElementById('GetSubInOut');
				//alert(GetSubInOut)
				if (GetSubInOut)
				{
					var ret=cspRunServerMethod(GetSubInOut.value,par+"^"+rw);
					//alert(ret)
					var retArr=ret.split("@");
					totalRow1=retArr[0];
					totalRow2=retArr[1];
					totalRow3=retArr[2];
					totalRow4=retArr[3];
				}	 	
			}
			else
			{
				totalRow1=store1.getAt(index1).get(PartInName);
				totalRow2=store1.getAt(index1).get(PartInAmount);
				totalRow3=store1.getAt(index1).get(PartOutName);
				totalRow4=store1.getAt(index1).get(PartOutAmount);
			}
			//var str="<p>"+totalRow1+"</p><p>"+totalRow2+"</p><p>"+totalRow3+"</p><p>"+totalRow4+"</p>";
			var str="<TABLE borderColor=#000000 width='100%' bgColor=#ffffff border=1 cellSpacing=0 cellPadding=0><TBODY>";
			str=str+"<TR bgColor=#D2E9FF><TD></TD><TD>名称</TD><TD>量</TD></TR>";
			var totalRow2Arr="";
			if((totalRow2!="")&&(totalRow2!=undefined)) 
			{
			totalRow2Arr=totalRow2.split(";");
			str=str+"<TR><TD bgColor=#D2E9FF rowSpan="+(totalRow2Arr.length-1)+">入液量分项</TD><TD>"+totalRow2Arr[0].replace(":","</TD><TD>")+"</TD></TR>";
			for (var i=1;i<(totalRow2Arr.length-1);i++)
			{
				str=str+"<TR><TD>"+totalRow2Arr[i].replace(":","</TD><TD>")+"</TD></TR>";
			}
		}
			var totalRow4Arr="";   //totalRow4.split(";");
			if((totalRow4!="")&&(totalRow4!=undefined)) 
			{
			totalRow4Arr=totalRow4.split(";");
			str=str+"<TR><TD bgColor=#D2E9FF rowSpan="+(totalRow4Arr.length-1)+">出液量分项</TD><TD>"+totalRow4Arr[0].replace(":","</TD><TD>")+"</TD></TR>";
			for (var i=1;i<(totalRow4Arr.length-1);i++)
			{
				str=str+"<TR><TD>"+totalRow4Arr[i].replace(":","</TD><TD>")+"</TD></TR>";
			}
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
              girdcount=girdcount+1;
          });
       //scope:this
       });
 grid1.getStore().on('load',function(g,records){
          var girdcount1=0;
          g.each(function(t){
              if(t.get(DisplaySumInName)=='总入液量='){
                    grid1.getView().getRow(girdcount1).style.backgroundColor='#F7FE2E';
              }
              if(t.get(DisplaySumInName)=='入液量='){
                    grid1.getView().getRow(girdcount1).style.backgroundColor='#A7FE2E';
              }
              girdcount1=girdcount1+1;
          });
       //scope:this
       });       
        
  find();
  find1();
	if (BFHeadDr!=0)
 	{
 	   //var lastpage = tkMakeServerCall("web.DHCNurHCRecComm","getlastrec", EpisodeID,EmrCode,BFHeadDr,"Item40");
 	   //alert(lastpage)
 	   //var curpage= Ext.getCmp("curpage");
	   //curpage.setValue(lastpage)
 	}
 	else
 	{
 		//var curpage= Ext.getCmp("curpage");
	  // curpage.setValue("1")
 	
 	}
  var GetCurrHeadDR=document.getElementById('GetCurrHeadDR');
	var ret=cspRunServerMethod(GetCurrHeadDR.value,EpisodeID,session['LOGON.USERID'],EmrCode);
	if (ret==""){alert("请先填写表头变更")}
}
function gridclick()
{
	 var grid=Ext.getCmp("mygrid");
  
	var rowObj = grid.getSelectionModel().getSelections();
	//var rowObjddd = grid.getSelectionModel().hasSelection();
	var len = rowObj.length;
	//alert(len+"@"+rowObjddd)  //getSelectionModel
 
	if(len < 1)
	{
		//Ext.Msg.show({title:'注意',msg:'请选择需要修改的数据!',buttons: Ext.Msg.OK,icon:Ext.MessageBox.WARNING});1
		return;
	}
	else
	{
		//EpisodeIDF=rowObj[0].get("Adm");
		/*for (i = 0; i < top.frames.length; i++) {
			alert(top.frames[i].name);
		}*/
		var frm = top.document.forms["fEPRMENU"];
	  //frm.EpisodeID.value=EpisodeID;
    // ModConsult();
	}
}
function grid1click()
{
	 var grid1=Ext.getCmp("mygrid1");
  
	var rowObj = grid1.getSelectionModel().getSelections();
	//var rowObjddd = grid.getSelectionModel().hasSelection();
	var len = rowObj.length;
	//alert(len+"@"+rowObjddd)  //getSelectionModel
 
	if(len < 1)
	{
		//Ext.Msg.show({title:'注意',msg:'请选择需要修改的数据!',buttons: Ext.Msg.OK,icon:Ext.MessageBox.WARNING});1
		return;
	}
	else
	{
		//EpisodeIDF=rowObj[0].get("Adm");
		/*for (i = 0; i < top.frames.length; i++) {
			alert(top.frames[i].name);
		}*/
		var frm = top.document.forms["fEPRMENU"];
	  //frm.EpisodeID.value=EpisodeID;
    // ModConsult();
	}
}
var storespechar = new Array();
function SepcialChar() {
	var grid = new Ext.grid.GridPanel({
		id : 'mygridspecchar',
		name : 'mygridspecchar',
		title : '',
		stripeRows : true,
		height : 250,
		width : 120,
		tbar : [{
					id : 'insertBtn',
					handler:insertSpecChar,
					text : '插入'
				}],
		store : new Ext.data.JsonStore({
					data : [],
					fields : ['desc', 'rw']
				}),
		colModel : new Ext.grid.ColumnModel({
			columns : [{
						header : '特珠字符',
						dataIndex : 'desc',
						width : 110
					}, {
						header : 'rw',
						dataIndex : 'rw',
						width : 0
					}],
			rows : [],
			defaultSortable : true
		}),
		enableColumnMove : false,
		viewConfig : {
			forceFit : false
		}
	});
	storespechar = new Array();
	var GetQueryData = document.getElementById('GetQueryData11');
	var parr="";
	//alert(11)
	var a = cspRunServerMethod(GetQueryData.value,"User.DHCTEMPSPECIALCHAR:CRItem", "", "AddSpecChar");
	//alert(22)
	grid.store.loadData(storespechar);
	var window = new Ext.Window({
		title: '特殊字符',
		width: 138,
		height: 285,
		autoScroll: true,
		layout: 'absolute',
		plain: true,
		frame:true,
		//modal: true,
		//bodyStyle: 'padding:5px;',
		///buttonAlign: 'center',
		items : grid,
		listeners:{'close':function(){
			Ext.getCmp('mygrid').startEditing(Ext.getCmp('mygrid').rowIndex , Ext.getCmp('mygrid').columnIndex);
		}}
	});
	window.show();
}
function AddSpecChar(str)
{
		//alert(str)
	var obj = eval('(' + str + ')');
	storespechar.push(obj);
}
function insertSpecChar() {
	var grid = Ext.getCmp('mygridspecchar');
	//弹出界面中Grid  DHCNURSPECCHAR
	//var rowObj = grid.getSelectionModel().getSelections();
    var selModel = grid.getSelectionModel();   
    if (selModel.hasSelection()) {  
		var selections = selModel.getSelections();
		var rowIndex = grid.store.indexOf(grid.getSelectionModel().getSelected());
		var specchardesc=grid.store.getAt(rowIndex).data.desc;
		//alert(specchardesc)
		var mygrid=Ext.getCmp('mygrid');
		var myrowIndex = mygrid.store.indexOf(mygrid.getSelectionModel().getSelected());
		var myspecchardesc=mygrid.store.getAt(myrowIndex).data.desc;
		//alert(myspecchardesc)
		var oldStr=mygrid.store.getAt(mygrid.rowIndex).get(mygrid.getColumnModel().getDataIndex(mygrid.columnIndex));
		if (oldStr) specchardesc=oldStr+specchardesc
		mygrid.store.getAt(mygrid.rowIndex).set(mygrid.getColumnModel().getDataIndex(mygrid.columnIndex),specchardesc);
		mygrid.startEditing(mygrid.rowIndex , mygrid.columnIndex);
	}
}
function beforeEditFn(e){
	grid.rowIndex = e.row;   //得到当前的行
	grid.columnIndex = e.column;	//得到当前的列
	//alert(grid.rowIndex+"@"+grid.columnIndex)
	 //grid.getView().getRow(girdcount).style.backgroundColor='#F7FE2E';
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
 	var a=cspRunServerMethod(GetNurPrnSet.value,"DHCNURBG_XSEKWZHLJLDFY",EpisodeID,'addprnset');
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

	//var CurrHeadDr="";
	var parr = adm + "^" + StDate.value + "^" + StTime.value + "^" + Enddate.value + "^" + EndTime.value + "^"+"DHCNURBG_XSEKWZHLJLDFY" + "^" + IfCancelRec+"^"+CurrHeadDr;
	var a = cspRunServerMethod(GetQueryData.value, "web.DHCNurHCRecComm:GetCareRecComm", "parr$" + parr, "AddRec");
	mygrid.store.loadData(REC);
	//find1();
}
function find1(){
  MeasureRel = new Hashtable();
  REC = new Array();
	var adm = EpisodeID;
	var StDate = Ext.getCmp("mygridstdate1");
	var StTime = Ext.getCmp("mygridsttime1");
	var Enddate = Ext.getCmp("mygridenddate1");
	var EndTime = Ext.getCmp("mygridendtime1");
	var GetQueryData = document.getElementById('GetQueryData');
	var mygrid1 = Ext.getCmp("mygrid1");
	var mygrid = Ext.getCmp("mygrid");
	var IfCancelRec1=Ext.getCmp("IfCancelRec1").getValue();
  
	//var CurrHeadDr="";
	var parr = adm + "^" + StDate.value + "^" + StTime.value + "^" + Enddate.value + "^" + EndTime.value + "^"+"DHCNURBG_XSEKWZHLJLDFY" + "^" + IfCancelRec1+"^";
	//alert(parr)
	var a = cspRunServerMethod(GetQueryData.value, "web.DHCNurHCRecComm:GetCareRecComm1", "parr$" + parr, "AddRec");
	mygrid1.store.loadData(REC);
	//mygrid.store.loadData(REC);
}
function find2(){
	//var link="dhcnurtempature.csp?EpisodeID="+EpisodeID;
   /// window.open (link,'体温单','height=1,width=1,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no') 
   // window.close();
  // alert(parent.frames.length);
    MeasureRel = new Hashtable();
    REC = new Array();
	var adm = EpisodeID;
	var StDate = Ext.getCmp("mygridstdate1");
	var StTime = Ext.getCmp("mygridsttime1");
	var Enddate = Ext.getCmp("mygridenddate1");
	var EndTime = Ext.getCmp("mygridendtime1");
	var GetQueryData = document.getElementById('GetQueryData');
	var mygrid = Ext.getCmp("mygrid");
	var IfCancelRec=Ext.getCmp("IfCancelRec1").getValue();
	var parr = adm + "^" + StDate.value + "^" + StTime.value + "^" + Enddate.value + "^" + EndTime.value + "^"+"DHCNURBG_XSEKWZHLJLDFY" + "^" + IfCancelRec+"^"+CurrHeadDr;
	// debugger;
	//alert(parr)
		var a = cspRunServerMethod(GetQueryData.value, "web.DHCNurHCRecComm:GetCareRecComm", "parr$" + parr, "AddRec");
	//var a = cspRunServerMethod(GetQueryData.value, "web.DHCNurHCRecComm:GetCareRecComm", "parr$" + parr, "AddRec");
	mygrid.store.loadData(REC);
}
function findStat()
{  //查询出入液量合计
    var adm=EpisodeID;
	var StDate= Ext.getCmp("mygridstdate1");
	var StTime= Ext.getCmp("mygridsttime1");
	var Enddate= Ext.getCmp("mygridenddate1");
	var EndTime= Ext.getCmp("mygridendtime1");
	var GeInOutAmount=document.getElementById('GeInOutAmount');
	var mygrid=Ext.getCmp("mygrid1");
  //alert(adm+"|"+StDate.value+"|"+StTime.value+"|"+Enddate.value+"|"+EndTime.value+"|"+"DHCNURBG_XSEKWZHLJLDFY")
 	var a=cspRunServerMethod(GeInOutAmount.value,adm,StDate.value,StTime.value,Enddate.value,EndTime.value,"DHCNURBG_XSEKWZHLJLDFY");
	if (a=="") { Ext.Msg.alert('提示', "无护理记录数据!"); return; }
	//additm();
	var count=additmstat(Enddate.value,EndTime.value);
	var tt=a.split('^');
	//alert(a);
	mygrid.getSelectionModel().selectRow(mygrid.store.getCount()-1);   
	//mygrid.getSelectionModel().selectRow(0); 
	//var count = grid.store.getCount();   
	//alert(count+"@"+mygrid.getSelectionModel().getSelections()[0])
	for (i=0;i<tt.length;i++)
	{
		itm=tt[i].split('|');
		mygrid.getSelectionModel().getSelections()[0].set(itm[0],itm[1]); 
	}
	//alert(tt);

}
function findStat2()
{  //查询出入液量合计
  var adm=EpisodeID;
	var StDate= diffDate(new Date(),0);
	var StTime= "06:00"
	var Enddate= diffDate(new Date(),0)
	var EndTime= "17:00"
	//Ext.getCmp("mygridenddate");
	var GeInOutAmount=document.getElementById('GeInOutAmount');
	var mygrid=Ext.getCmp("mygrid");
  //alert(adm+"|"+StDate+"|"+StTime+"|"+Enddate+"|"+EndTime+"|"+"DHCNURBG_XSEKWZHLJLDFY")
 	var a=cspRunServerMethod(GeInOutAmount.value,adm,StDate,StTime,Enddate,EndTime,"DHCNURBG_XSEKWZHLJLDFY");
 	//alert(a)
	if (a=="") { Ext.Msg.alert('提示', "无护理记录数据!"); return; }
	//additm();
	var count=additmstat(Enddate,EndTime);
	var tt=a.split('^');
	//alert(a);
	mygrid.getSelectionModel().selectRow(mygrid.store.getCount()-1);   
	//mygrid.getSelectionModel().selectRow(0); 
	//var count = grid.store.getCount();   
	//alert(count+"@"+mygrid.getSelectionModel().getSelections()[0])
	for (i=0;i<tt.length;i++)
	{
		itm=tt[i].split('|');
		mygrid.getSelectionModel().getSelections()[0].set(itm[0],itm[1]); 
	}
	//alert(tt);

}
function findStatCL()
{  //查询出入液量合计
    var adm=EpisodeID;
	var StDate= Ext.getCmp("mygridstdate");
	var StTime= Ext.getCmp("mygridsttime");
	var Enddate= Ext.getCmp("mygridenddate");
	var EndTime= Ext.getCmp("mygridendtime");
	var GeInOutAmount=document.getElementById('GeInOutAmount');
	var mygrid=Ext.getCmp("mygrid");
  //alert(adm+"|"+StDate.value+"|"+StTime.value+"|"+Enddate.value+"|"+EndTime.value+"|"+"DHCNURBG_XSEKWZHLJLDFY")
 	var a=cspRunServerMethod(GeInOutAmount.value,adm,StDate.value,StTime.value,Enddate.value,EndTime.value,"DHCNURBG_XSEKWZHLJLDFY@CL");
	if (a=="") { Ext.Msg.alert('提示', "无护理记录数据!"); return; }
	//additm();
	var count=additmstat(Enddate.value,EndTime.value);
	var tt=a.split('^');
	//alert(a);
	//mygrid.getSelectionModel().selectRow(mygrid.store.getCount()-1);   
	mygrid.getSelectionModel().selectRow(0); 
	//var count = grid.store.getCount();   
	//alert(count+"@"+mygrid.getSelectionModel().getSelections()[0])
	for (i=0;i<tt.length;i++)
	{
		itm=tt[i].split('|');
		if((itm[0]=="Item6")||(itm[0]=="Item7")){ 
			//continue;
			itm[1]="";
		}
		//alert(itm)
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
	//alert(str)
	var obj = eval('(' + str + ')');
	obj.CareDate=getDate(obj.CareDate);
	obj.CareDate1=getDate(obj.CareDate1);
	//obj.PregHPregDate=getDate(obj.PregHPregDate);
	REC.push(obj);
	//debugger;
}


function(record,rowIndex,rowParams,store)
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
		//	list.push(store.getAt(i).data);
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
	//	list.push(store.getAt(i).data);
	//	//	debugger;
	//}
	var RecSave=document.getElementById('RecSave');
	for (var i = 0; i < list.length; i++) {
	  var obj=list[i];
	  var str="";
	  var CareDate="";
	  var CareTime="";
	  var flag="0";
		for (var p in obj) 
		{
			var aa = formatDate(obj[p]);				
			if (p=="CareDate") CareDate=aa;
			if (p=='CareTime') CareTime=obj[p];
			if (p=="") continue;
			var objval=obj[p]+""
			if ((p == DisplaySumInName) && (objval.indexOf("入液量") != -1)) {
				flag = "1";
			}
			if ((p==DisplaySumOutName)&&(objval.indexOf("出液量")!= -1))
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
			str=str+"^"+CaseMeasureID;
			//alert(str);
			var a=cspRunServerMethod(RecSave.value,EpisodeID,str,session['LOGON.USERID'],"DHCNURBG_XSEKWZHLJLDFY",session['LOGON.GROUPDESC']);
			if (a!="0")
			{
				//alert(a);
				find()
				return;
			}
		}
	}
	find();
}
function save1()
{
	var grid1=Ext.getCmp('mygrid1');
	var store1 = grid1.store;
	var rowCount = store1.getCount(); //记录数
	var cm = grid1.getColumnModel();
	var colCount = cm.getColumnCount();
	var list = [];
	var rowObj = grid1.getSelectionModel().getSelections();
		var len = rowObj.length;
		for (var r = 0;r < len; r++) {
		list.push(rowObj[r].data);
	  }		
		//for (var i = 0; i < store.getCount(); i++) {
		//	list.push(store.getAt(i).data);
			//	debugger;
		//}
	
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
	var RecSave=document.getElementById('RecSave1');
	for (var i = 0; i < list.length; i++) {
	  var obj=list[i];
	  var str="";
	  var CareDate="";
	  var CareTime="";
	  var CareDate1="";
	  var CareTime1="";
	  var flag="0";
		for (var p in obj) 
		{
			var aa = formatDate(obj[p]);				
			if (p=="CareDate") CareDate=aa;
			if (p=='CareTime') CareTime=obj[p];
			if (p=="CareDate1") CareDate1=aa;
			if (p=='CareTime1') CareTime1=obj[p];
			if (p=="") continue;
			var objval=obj[p]+""
			if ((p == DisplaySumInName) && (objval.indexOf("入液量") != -1)) {
				flag = "1";
			}
			if ((p==DisplaySumOutName)&&(objval.indexOf("出液量")!= -1))
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
			if (str.indexOf("CareDate1")==-1)
			{
				str=str+"CareDate1|"+CareDate1+"^CareTime1|"+CareTime1;
				//debugger;
			}
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
			str=str+"DiagnosDr|"+DiagnosDr+"^HeadDR|";
			str=str+"^"+CaseMeasureID;
			//alert(str);
			var a=cspRunServerMethod(RecSave.value,EpisodeID,str,session['LOGON.USERID'],"DHCNURBG_XSEKWZHLJLDFY",session['LOGON.GROUPDESC']);
			if (a!="0")
			{
				//alert(a);
				find1()
				return;
			}
		}
	}
	find1();
}  
function saveAll()
{
	var store = grid.store;
	var rowCount = store.getCount(); //记录数
	var cm = grid.getColumnModel();
	var colCount = cm.getColumnCount();
	var list = [];
	var rowObj = grid.getSelectionModel().getSelections();
		var len = rowObj.length;
	//	for (var r = 0;r < len; r++) {
		//list.push(rowObj[r].data);
	  //}		
		for (var i = 0; i < store.getCount(); i++) {
			list.push(store.getAt(i).data);
				//debugger;
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
			str=str+"^"+CaseMeasureID;
			//alert(str);
			var a=cspRunServerMethod(RecSave.value,EpisodeID,str,session['LOGON.USERID'],"DHCNURBG_XSEKWZHLJLDFY",session['LOGON.GROUPDESC']);
			if (a!="0")
			{
				//alert(a);
				//find()
				//return;
			}
		}
	}
	find();
} 
function savebt()
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
		//	list.push(store.getAt(i).data);
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
	//	list.push(store.getAt(i).data);
	//	//	debugger;
	//}
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
			str=str+"DiagnosDr|"+DiagnosDr+"^HeadDR|"+curhead;
			str=str+"^"+CaseMeasureID;
			//alert(str);
			var a=cspRunServerMethod(RecSave.value,EpisodeID,str,session['LOGON.USERID'],"DHCNURBG_XSEKWZHLJLDFY",session['LOGON.GROUPDESC']);
			if (a!="0")
			{
				alert(a);
				return;
			}
		}
	}
	find();
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
	{name:'Item51'},
	{name:'Item52'},
	{name:'Item53'},
	{name:'Item54'},
	{name:'Item55'},
	{name:'Item56'},
	{name:'Item57'}, 
	{name:'Item58'},
	{name:'Item59'},
	{name:'Item60'},
	{name:'CaseMeasure'},
	{name:'User'},
	{name:'rw'},
	{name:'par'}
      ]);
    var count = grid.store.getCount(); 
    //alert(count)
    var r = new Plant({CareDate:new Date(),CareTime:new Date().dateFormat('H:i')}); 
    grid.store.commitChanges(); 
    //grid.store.insert(count,r);
    grid.store.insert(0,r);    //新建记录在最前面，
	return;
}
function additm1()
{ 
  	var Plant = Ext.data.Record.create([
	{name:'CareDate1'}, 
	{name:'CareTime1'},
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
	{name:'Item51'},
	{name:'Item52'},
	{name:'Item53'},
	{name:'Item54'},
	{name:'Item55'},
	{name:'Item56'},
	{name:'Item57'}, 
	{name:'Item58'},
	{name:'Item59'},
	{name:'Item60'},
	{name:'CaseMeasure1'},
	{name:'User1'},
	{name:'rw1'},
	{name:'par1'}
      ]);
    var count = grid1.store.getCount(); 
    //alert(count)
    var r = new Plant({CareDate1:new Date(),CareTime1:new Date().dateFormat('H:i')}); 
    grid1.store.commitChanges(); 
    //grid1.store.insert(count,r);
    grid1.store.insert(0,r);    //新建记录在最前面，
	return;
}
var rightClick = new Ext.menu.Menu(  {
            id : 'rightClickCont',
            items : [  {
                id:'rMenu1',
                text : '医嘱',
                handler:OrdSch
            },  {
                id:'rMenu2',
                text : '病情措施及处理',
                handler:Measure
            }, 
              
             {
                id:'rMenu7',
                text : '作废',
                handler:CancelRecord
            }]
        }); 
       /*
             {
                id:'rMenu8',
                text : '修改关联表头',
                handler:UpdateRelBT //UpdateRelBT btlist
            },        
         */
var rightClick1 = new Ext.menu.Menu(  {
            id : 'rightClickCont1',
            items : [  {
                id:'rMenu11',
                text : '医嘱',
                handler:OrdSchGrid1
            }, 
             {
                id:'rMenu41',
                text : '插入出入液量小结',
                handler:InOutNod
            },  {
                id:'rMenu5',
                text : '插入24小时出入液量',
                handler:InOutSum
            },  //{
              //  id:'rMenu6',
             //   text : '修改关联诊断',
             //   handler:UpdateRelDiagnos
            //},  
             {
                id:'rMenu71',
                text : '作废',
                handler:CancelRecord1
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
function rightClickFn1(client, rowIndex, e)  {
          e.preventDefault();
          grid=client;
		      CurrRowIndex=rowIndex;
          rightClick1.showAt(e.getXY());
            }
function MultiFun()
{
	var GetMulti=document.getElementById('GetMulti');
	var getcheckform=document.getElementById('getcheckform');	
	var ret= cspRunServerMethod(GetMulti.value, "DHCNURBG_XSEKWZHLJLDFY");
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
	var tabstr=cspRunServerMethod(getcheckform.value, "DHCNURBG_XSEKWZHLJLDFY",ab);
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
		alert(itname+"!!"+code)
		var ret=cspRunServerMethod(getcheckform.value, "DHCNURBG_XSEKWZHLJLDFY",itname,code,"");	
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
function InOutNod()
{ //小结
    //alert(11)
	var SaveOutIn=document.getElementById('SaveOutIn');
	var objRow=grid1.getSelectionModel().getSelections();
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
	  var CareDate=objRow[0].get("CareDate1");
	  var CareTime=objRow[0].get("CareTime1");
	  var inamount=objRow[0].get(DisplaySumInAmount);
	  var OutQtAmount=objRow[0].get(DisplaySumOutAmount);
	  var InPart=objRow[0].get(PartInAmount);
	  var OutPart=objRow[0].get(PartOutAmount);
	  //var StatTime=objRow[0].get("Item1");
	  //var StatHours=objRow[0].get("Item2");
	  //var CaseMeasure=objRow[0].get("CaseMeasure");
	  var CaseMeasure=objRow[0].get("Item42");
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
		var str=countstr+"^SumInAmount|"+inamount+"^SumOutAmount|"+OutQtAmount+"^CareDate1|"+formatDate(CareDate)+"^CareTime1|"+CareTime+"^Typ|Nod^"+"InPart|"+InPart+"^OutPart|"+OutPart+"^StatTime|"+StatTime+"^StatHours|"+StatHours;
		var diaggrid = Ext.getCmp('diaggrid');
		if (diaggrid) {
  		var selModel=diaggrid.getSelectionModel();
  		if (selModel.hasSelection()) {   
  			var objDiagRow = selModel.getSelections();		  			
				DiagnosDr=objDiagRow[0].get("rw1");
				//DiagnosDr="";	
			}
			else {
				DiagnosDr="";	
			}
		}
		else {
			DiagnosDr="";
		}
		//str=str+"^DiagnosDr|"+DiagnosDr+"^HeadDR|"+CurrHeadDr;
		str=str+"^DiagnosDr|"+DiagnosDr+"^HeadDR|";
		//alert(str);
		var a=cspRunServerMethod(SaveOutIn.value,EpisodeID,str,session['LOGON.USERID'],"DHCNURBG_XSEKWZHLJLDFY");
		find1();
	}
}
function InOutSum()
{
	var SaveOutIn=document.getElementById('SaveOutIn');
	var objRow=grid1.getSelectionModel().getSelections();
	if (objRow.length == 0) { Ext.Msg.alert('提示', "请先点'统计'按钮!"); return; }
	else
	{
	  var countstr=""; //合计项
	  //var countcls=ICountCls+"&"+OCountCls;
	  var countcls="Item12&Item13&Item5"
	  var tt=countcls.split('&');
	  for (i=0;i<tt.length;i++)
	  {
	  	if (tt[i]=="") continue;
		countstr=countstr+tt[i]+"|"+objRow[0].get(tt[i])+"^";
	  }
    var CareDate=objRow[0].get("CareDate1"); 
	  var CareTime=objRow[0].get("CareTime1");
	  var inamount=objRow[0].get(DisplaySumInAmount);
	  var OutQtAmount=objRow[0].get(DisplaySumOutAmount);
	  var InPart=objRow[0].get(PartInAmount);
	  var OutPart=objRow[0].get(PartOutAmount);
		//var StatTime=objRow[0].get("Item1");
	  //var StatHours=objRow[0].get("Item2");
	  //var CaseMeasure=objRow[0].get("CaseMeasure");
	  var CaseMeasure=objRow[0].get("Item42");
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
		var str=countstr+"^SumInAmount|"+inamount+"^SumOutAmount|"+OutQtAmount+"^CareDate1|"+formatDate(CareDate)+"^CareTime1|"+CareTime+"^Typ|Sum^"+"InPart|"+InPart+"^OutPart|"+OutPart+"^StatTime|"+StatTime+"^StatHours|"+StatHours;
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
		str=str+"^DiagnosDr|"+DiagnosDr+"^HeadDR|";
		//alert(str);
		var a=cspRunServerMethod(SaveOutIn.value,EpisodeID,str,session['LOGON.USERID'],"DHCNURBG_XSEKWZHLJLDFY");
		find1();
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
function OrdSchGrid1()
{         
	// var CurrAdm=selections[rowIndex].get("Adm");
	selections = grid1.getSelectionModel().getSelections();
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

	var	grid11=Ext.getCmp("ordgrid");
	tobar=grid11.getTopToolbar();
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
	butin.on('click',SureIn1);
	var butschord=Ext.getCmp('ordgridSch');
	butschord.on('click',SchOrd);
	window.show();
}
var condata=new Array();
function add(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o)
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
		SeqNo: o
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
					for (var i = rowIndex-1; i >=0; i--) {
						var subdes=store.getAt(i).data.ARCIMDesc;
						subdes=subdes.replace("_____","");
						var subml=store.getAt(i).data.Dose;
						var subunit=store.getAt(i).data.DoseUnit;
						if (subunit!="ml") subml=0;
						var subseqno=store.getAt(i).data.SeqNo;
						if (subseqno==seqno)
						{
							des=subdes+","+des;
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
							des=des+"\n"+subdes;
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
function SureIn1()
 {
	var grid = Ext.getCmp('ordgrid');
	var mygrid=Ext.getCmp('mygrid1');
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
					for (var i = rowIndex-1; i >=0; i--) {
						var subdes=store.getAt(i).data.ARCIMDesc;
						subdes=subdes.replace("_____","");
						var subml=store.getAt(i).data.Dose;
						var subunit=store.getAt(i).data.DoseUnit;
						if (subunit!="ml") subml=0;
						var subseqno=store.getAt(i).data.SeqNo;
						if (subseqno==seqno)
						{
							des=subdes+","+des;
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
							des=des+"\n"+subdes;
							ml=eval(ml)+eval(subml);
						}
						else
						{
							break;	
						}
					}
					//alert(num);
					if (num == 0) {
						caredate=mygrid.getStore().getAt(0).get("CareDate1");
						caretime=mygrid.getStore().getAt(0).get("CareTime1");
						var objRow=mygrid.getSelectionModel().getSelections();
						if (objRow.length == 0) { Ext.Msg.alert('提示', "请先选择某行!"); return; }
						else
						{
								objRow[0].set(OrdInName, des);
									//alert(objRow[0].value);
								objRow[0].set(OrdInAmount, ml);
						}
					}else{
						additm1();
						mygrid.getSelectionModel().selectRow(mygrid.store.getCount()-1);   
						mygrid.getSelectionModel().getSelections()[0].set("CareDate1", caredate);
						mygrid.getSelectionModel().getSelections()[0].set("CareTime1", caretime);
						mygrid.getSelectionModel().getSelections()[0].set(OrdInName, des);
						mygrid.getSelectionModel().getSelections()[0].set(OrdInAmount, ml);
					}
					num++;
				});   
     }
 }
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
	var parr="DHCNURBG_XSEKWZHLJLDFY^"+EpisodeID+"^CaseMeasureXml^"+rowid;
	//alert(parr);
	var arr = new Array();
	var a = cspRunServerMethod(pdata1, "", "DHCPatOrdList", EpisodeID, "");
	//alert(a)
	arr = eval(a);
	//alert(arr)
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
   // var parr="DHCNURBG_XSEKWZHLJLDFY^"+EpisodeID+"^CaseMeasureXml";
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
		var a=cspRunServerMethod(GetLabItemdata.value,labno,tesc);
		if (a=="-1") return;
		var LCResult=Ext.getCmp('LCResult');
		//a=a.replace("&",String.fromCharCode(13)+String.fromCharCode(10));
		var aa=a.split("$");
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
 	var a=cspRunServerMethod(GetQueryData.value,"web.DHCNUREMR:GetPatOrd","parr$"+parr,"add");
	// grid.width=document.body.offsetWidth;
	ordgrid.store.loadData(condata);
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
		//alert(ret)
		var hh=ret.split("^");
		//alert("ddd");
		//debugger;
		var a=cspRunServerMethod(GetPrnSet.value,"DHCNURBG_XSEKWZHLJLDFY",EpisodeID); //page, caredattim, prnpos, adm,Typ,user
		if (a=="") return;
		var GetLableRec=document.getElementById('GetLableRec');
		var LabHead=cspRunServerMethod(GetLableRec.value,"DHCNURBG_XSEKWZHLJLDFY^"+session['LOGON.CTLOCID']+"^"+EpisodeID+"^"+session['LOGON.USERID']);
		//alert("DHCNURBG_XSEKWZHLJLDFY^"+session['LOGON.CTLOCID']+"^"+EpisodeID+"^"+session['LOGON.USERID'])
		var tm=a.split("^");
		var stdate="" //tm[2];
		var stim="" //tm[3];
		var edate="" //tm[4];
		var etim="" //tm[5];
		PrintComm.RHeadCaption = "111111"; //"日期:"+appdate.value;
    PrintComm.LHeadCaption = "211111"; //"科室:"+dep.getValue();
    PrintComm.LFootCaption = "311111";
    PrintComm.RFootCaption = "411111";
		//PrintComm.RHeadCaption=hh[1];
		//PrintComm.LHeadCaption=hh[0];
		//PrintComm.RFootCaption="第";
		//PrintComm.LFootCaption="页";
		//PrintComm.LFootCaption=hh[2];
		//alert(ret);
		PrintComm.TitleStr=ret;
		PrintComm.SetPreView("1");
		PrintComm.PrnLoc=session['LOGON.CTLOCID'];
		PrintComm.WebUrl=WebIp+"/dthealth/web/DWR.DoctorRound.cls";
		//PrintComm.WebUrl="http://192.168.17.170/dthealth/web/DWR.DoctorRound.cls";
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
		PrintComm.ItmName = "DHCNURMouldPrn_XSEKWZHLJLDFY"; //338155!2010-07-13!0:00!!
		//debugger;
		var parr="parr:"+EpisodeID+"!"+stdate+"!"+stim+"!"+edate+"!"+etim+"!DHCNURBG_XSEKWZHLJLDFY!"+CurrHeadDr;
		//alert(parr)
		PrintComm.ID = "";
		PrintComm.MultID = "";
		//PrintComm.MthArr="web.DHCConsult:getConsultInfo&id:"+myid;
		//alert(LabHead)
		if(LabHead!="")PrintComm.LabHead=LabHead;
		PrintComm.SetParrm(parr); // ="EpisodeId" ; //"p1:0^p2:"
		PrintComm.PrintOut();
		
}
function printNurRec1()
{
		var GetPrnSet=document.getElementById('GetPrnSet');
		var GetHead=document.getElementById('GetPatInfo');
		var ret=cspRunServerMethod(GetHead.value,EpisodeID);
		//alert(ret)
		var hh=ret.split("^");
		//alert("ddd");
		//debugger;
		var a=cspRunServerMethod(GetPrnSet.value,"DHCNURBG_XSEKWZHLJLDFY",EpisodeID); //page, caredattim, prnpos, adm,Typ,user
		if (a=="") return;
		var GetLableRec=document.getElementById('GetLableRec');
		var LabHead=cspRunServerMethod(GetLableRec.value,"DHCNURBG_XSEKWZHLJLDFY^"+session['LOGON.CTLOCID']+"^"+EpisodeID+"^"+session['LOGON.USERID']);
		//alert("DHCNURBG_XSEKWZHLJLDFY^"+session['LOGON.CTLOCID']+"^"+EpisodeID+"^"+session['LOGON.USERID'])
		var tm=a.split("^");
		var stdate="" //tm[2];
		var stim="" //tm[3];
		var edate="" //tm[4];
		var etim="" //tm[5];
		PrintComm.RHeadCaption = "111111"; //"日期:"+appdate.value;
    PrintComm.LHeadCaption = "211111"; //"科室:"+dep.getValue();
    PrintComm.LFootCaption = "311111";
    PrintComm.RFootCaption = "411111";
		//PrintComm.RHeadCaption=hh[1];
		//PrintComm.LHeadCaption=hh[0];
		//PrintComm.RFootCaption="第";
		//PrintComm.LFootCaption="页";
		//PrintComm.LFootCaption=hh[2];
		//alert(ret);
		PrintComm.TitleStr=ret;
		PrintComm.SetPreView("1");
		PrintComm.PrnLoc=session['LOGON.CTLOCID'];
		PrintComm.WebUrl=WebIp+"/dthealth/web/DWR.DoctorRound.cls";
		//PrintComm.WebUrl="http://192.168.17.170/dthealth/web/DWR.DoctorRound.cls";
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
		PrintComm.ItmName = "DHCNURMouldPrn_XSEKWZHLJLDFY2"; //338155!2010-07-13!0:00!!
		//debugger;
		var parr="parr:"+EpisodeID+"!"+stdate+"!"+stim+"!"+edate+"!"+etim+"!DHCNURBG_XSEKWZHLJLDFY!";
		//alert(parr)
		PrintComm.ID = "";
		PrintComm.MultID = "";
		//PrintComm.MthArr="web.DHCConsult:getConsultInfo&id:"+myid;
		//alert(LabHead)
		if(LabHead!="")PrintComm.LabHead=LabHead;
		PrintComm.SetParrm(parr); // ="EpisodeId" ; //"p1:0^p2:"
		PrintComm.PrintOut();
		
}
function printNurRec2()
{
		var GetPrnSet=document.getElementById('GetPrnSet');
		var GetHead=document.getElementById('GetPatInfo');
		var ret=cspRunServerMethod(GetHead.value,EpisodeID);
		//alert(ret)
		var hh=ret.split("^");
		//alert("ddd");
		//debugger;
		var a=cspRunServerMethod(GetPrnSet.value,"DHCNURBG_XSEKWZHLJLDFY",EpisodeID); //page, caredattim, prnpos, adm,Typ,user
		if (a=="") return;
		var GetLableRec=document.getElementById('GetLableRec');
		var LabHead=cspRunServerMethod(GetLableRec.value,"DHCNURBG_XSEKWZHLJLDFY^"+session['LOGON.CTLOCID']+"^"+EpisodeID+"^"+session['LOGON.USERID']);
		//alert("DHCNURBG_XSEKWZHLJLDFY^"+session['LOGON.CTLOCID']+"^"+EpisodeID+"^"+session['LOGON.USERID'])
		var tm=a.split("^");
		var stdate="" //tm[2];
		var stim="" //tm[3];
		var edate="" //tm[4];
		var etim="" //tm[5];
		PrintCommC.RHeadCaption = "111111"; //"日期:"+appdate.value;
    PrintCommC.LHeadCaption = "211111"; //"科室:"+dep.getValue();
    PrintCommC.LFootCaption = "311111";
    PrintCommC.RFootCaption = "411111";
		//PrintComm.RHeadCaption=hh[1];
		//PrintComm.LHeadCaption=hh[0];
		//PrintComm.RFootCaption="第";
		//PrintComm.LFootCaption="页";
		//PrintComm.LFootCaption=hh[2];
		//alert(ret);
		PrintCommC.TitleStr=ret;
		PrintCommC.SetPreView("1");
		PrintCommC.PrnLoc=session['LOGON.CTLOCID'];
		PrintCommC.WebUrl=webIP+"/dthealth/web/DWR.DoctorRound.cls";
		var aa=tm[1].split("&");
		//PrintComm.stPage=aa[0];
		//if (aa.length>1) PrintComm.stRow=aa[1];
		PrintCommC.stPage=0;
		PrintCommC.stRow=0;
		PrintCommC.previewPrint="1"; //是否弹出设置界面
		//PrintComm.stprintpos=tm[0];
		PrintCommC.stprintpos=0;
		//alert(PrintComm.Pages);
		PrintCommC.SetConnectStr(CacheDB);
		PrintCommC.ItmName = "DHCNURMouldPrn_XSEKWZHLJLDFY2"; //338155!2010-07-13!0:00!!
		//debugger;
		var parr=EpisodeID+"!"+stdate+"!"+stim+"!"+edate+"!"+etim+"!DHCNURBG_XSEKWZHLJLDFY!"+CurrHeadDr;
		//alert(parr)
		//alert(LabHead)
		PrintCommC.ID = "";
		PrintCommC.MultID = "";
		//PrintComm.MthArr="web.DHCConsult:getConsultInfo&id:"+myid;
		if(LabHead!="")PrintCommC.LabHead=LabHead;
		PrintCommC.SetParrm(parr); // ="EpisodeId" ; //"p1:0^p2:"
		PrintCommC.PrintOut();
		var lastrowcount=PrintCommC.lastrowcount
		var pagerows=PrintCommC.PageRows
		var allpage=PrintCommC.Allpages
		//additm()
		find()
		var mygrid=Ext.getCmp("mygrid");
		var count = grid.store.getCount(); 
		//alert(count)
		mygrid.getSelectionModel().selectRow(count-1);   
	//mygrid.getSelectionModel().selectRow(0);   
	
		mygrid.getSelectionModel().getSelections()[0].set("Item40",lastrowcount+"/"+pagerows+"/"+allpage); 
	saveprint()
	//alert(33)
		
}
function printNurRec3()
{
		var GetPrnSet=document.getElementById('GetPrnSet');
		var GetHead=document.getElementById('GetPatInfo');
		var ret=cspRunServerMethod(GetHead.value,EpisodeID);
		var hh=ret.split("^");
		var a=cspRunServerMethod(GetPrnSet.value,"DHCNURBG_XSEKWZHLJLDFY",EpisodeID); //page, caredattim, prnpos, adm,Typ,user
		if (a=="") return;
		var GetLableRec=document.getElementById('GetLableRec');
		var LabHead=cspRunServerMethod(GetLableRec.value,"DHCNURBG_XSEKWZHLJLDFY^"+session['LOGON.CTLOCID']+"^"+EpisodeID+"^"+session['LOGON.USERID']);
	
	  
	  	//alert(LabHead)
		var tm=a.split("^");
		var stdate="" //tm[2];
		var stim="" //tm[3];
		var edate="" //tm[4];
		var etim="" //tm[5];
		PrintComm.RHeadCaption = "111111"; //"日期:"+appdate.value;
    PrintComm.LHeadCaption = "211111"; //"科室:"+dep.getValue();
    PrintComm.LFootCaption = "311111";
    PrintComm.RFootCaption = "411111";
    //alert(ret)
    var stdate=Ext.getCmp("prndate").value;
    ret=ret+"^CareDate@"+stdate
    //alert(ret)
		PrintComm.TitleStr=ret;
		PrintComm.SetPreView("1");
		PrintComm.PrnLoc=session['LOGON.CTLOCID'];
		PrintComm.WebUrl=WebIp+"/dthealth/web/DWR.DoctorRound.cls";
		var aa=tm[1].split("&");
		PrintComm.stPage=0;
		PrintComm.stRow=0;
		var curpage=Ext.getCmp("curpage").getValue();
		PrintComm.curPages=curpage-1; 
		PrintComm.previewPrint="1"; //是否弹出设置界面
		PrintComm.stprintpos=0;
		PrintComm.SetConnectStr(CacheDB);
		PrintComm.ItmName = "DHCNURPRNWKHLJL";
		//alert(CurrHeadDr)
		
		
		//alert(prndate) 
		var parr=EpisodeID+"!"+stdate+"!"+stim+"!"+edate+"!"+etim+"!DHCNURBG_XSEKWZHLJLDFY!"+CurrHeadDr;
		//alert(parr)
		PrintComm.ID = "";
		PrintComm.MultID = "";
		if(LabHead!="")PrintComm.LabHead=LabHead;
		PrintComm.SetParrm(parr); 
		PrintComm.PrintOut();
		return
		var lastrowcount2=PrintComm.lastrowcount
		var pagerows2=PrintComm.PageRows
		var allpage2=PrintComm.Allpages
		if(curpage==1){allpage2=allpage2-1}
 	
		//if (lastrowcount2==pagerows2) return
		find()
		var mygrid=Ext.getCmp("mygrid");
		var count = grid.store.getCount(); 

		if (count==0)
		{
		var StDate = Ext.getCmp("mygridstdate"); 
		StDate.setValue("2013-01-01")
		find()
		var mygrid=Ext.getCmp("mygrid");
		var count = grid.store.getCount();  
		if (count>0)
		{
		mygrid.getSelectionModel().selectRow(count-1);   
		mygrid.getSelectionModel().getSelections()[0].set("Item40",lastrowcount2+"/"+pagerows2+"/"+allpage2); 
	  saveprint()
		}
		
		}
		if (count>0)
		{
		mygrid.getSelectionModel().selectRow(count-1);   
		mygrid.getSelectionModel().getSelections()[0].set("Item40",lastrowcount2+"/"+pagerows2+"/"+allpage2); 
	  saveprint()
		}
}
function printNurRecbq()
{
		var GetPrnSet=document.getElementById('GetPrnSet');
		var GetHead=document.getElementById('GetPatInfo');
		var ret=cspRunServerMethod(GetHead.value,EpisodeID);
		var hh=ret.split("^");
		var a=cspRunServerMethod(GetPrnSet.value,"DHCNURBG_XSEKWZHLJLDFY",EpisodeID); //page, caredattim, prnpos, adm,Typ,user
		if (a=="") return;
		var GetLableRec=document.getElementById('GetLableRec');
		var LabHead=cspRunServerMethod(GetLableRec.value,"DHCNURBG_XSEKWZHLJLDFY^"+session['LOGON.CTLOCID']+"^"+EpisodeID+"^"+session['LOGON.USERID']);		
	  	//alert(LabHead)
		var tm=a.split("^");
		var stdate="" //tm[2];
		var stim="" //tm[3];
		var edate="" //tm[4];
		var etim="" //tm[5];
		PrintComm.RHeadCaption = "111111"; //"日期:"+appdate.value;
    PrintComm.LHeadCaption = "211111"; //"科室:"+dep.getValue();
    PrintComm.LFootCaption = "311111";
    PrintComm.RFootCaption = "411111";
    var stdate=Ext.getCmp("prndate").value;
    ret=ret+"^CareDate@"+stdate
    //alert(ret)
		PrintComm.TitleStr=ret;
		PrintComm.SetPreView("1");
		PrintComm.PrnLoc=session['LOGON.CTLOCID'];
		PrintComm.WebUrl=WebIp+"/dthealth/web/DWR.DoctorRound.cls";
		var aa=tm[1].split("&");
		PrintComm.stPage=0;
		PrintComm.stRow=0;
		var curpage=Ext.getCmp("curpage").getValue();
		PrintComm.curPages=curpage-1; 
		PrintComm.previewPrint="1"; //是否弹出设置界面
		PrintComm.stprintpos=0;
		PrintComm.SetConnectStr(CacheDB);
		PrintComm.ItmName = "DHCNurMouldPrnwkbq";
		//alert(CurrHeadDr)
		var parr=EpisodeID+"!"+stdate+"!"+stim+"!"+edate+"!"+etim+"!DHCNURBG_XSEKWZHLJLDFY!"+CurrHeadDr+"!Y";
		//alert(parr)
		PrintComm.ID = "";
		PrintComm.MultID = "";
		if(LabHead!="")PrintComm.LabHead=LabHead;
		PrintComm.SetParrm(parr); 
		PrintComm.PrintOut();
		return
		var lastrowcount2=PrintComm.lastrowcount
		var pagerows2=PrintComm.PageRows
		var allpage2=PrintComm.Allpages
		if(curpage==1){allpage2=allpage2-1}
 	
		//if (lastrowcount2==pagerows2) return
		find()
		var mygrid=Ext.getCmp("mygrid");
		var count = grid.store.getCount(); 

		if (count==0)
		{
		var StDate = Ext.getCmp("mygridstdate"); 
		StDate.setValue("2013-01-01")
		find()
		var mygrid=Ext.getCmp("mygrid");
		var count = grid.store.getCount();  
		if (count>0)
		{
		mygrid.getSelectionModel().selectRow(count-1);   
		mygrid.getSelectionModel().getSelections()[0].set("Item40",lastrowcount2+"/"+pagerows2+"/"+allpage2); 
	  saveprint()
		}
		
		}
		if (count>0)
		{
		mygrid.getSelectionModel().selectRow(count-1);   
		mygrid.getSelectionModel().getSelections()[0].set("Item40",lastrowcount2+"/"+pagerows2+"/"+allpage2); 
	  saveprint()
		}
}
function saveprint()
{
	var store = grid.store;
	var rowCount = store.getCount(); //记录数
	var cm = grid.getColumnModel();
	var colCount = cm.getColumnCount();
	var list = [];
	//var rowObj = grid.getSelectionModel().getSelections();
		//var len = rowObj.length;
		//for (var r = 0;r < len; r++) {
		//list.push(rowObj[r].data);
	  //}		
	for (var i = 0; i < store.getCount(); i++) {
	    if (i==(store.getCount()-1))
	     {
	      //alert(i)
			list.push(store.getAt(i).data);
			}
			//	debugger;
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
			str=str+"^"+CaseMeasureID;
			//alert(str);
			var a=cspRunServerMethod(Saveprn,EpisodeID,str,session['LOGON.USERID'],"DHCNURBG_XSEKWZHLJLDFY",session['LOGON.GROUPDESC']);
			if (a!="0")
			{
				alert(a);
				return;
			}
		}
	}
	find();
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
ERC = new Array();
function UpdateRelBT()
{
	var arrb = new Array();
 //var arrb=[{id:'mybtpl',name:'mybt',tabIndex:'0',x:0,y:-1,height:260,width:932,xtype:'panel',layout:'fit',border:false,items:[new Ext.grid.EditorGridPanel({id:'mybt',name:'mybt',title:'表头变更记录',clicksToEdit: 1, stripeRows: true,height:260,width:932,tbar:[{id:'mybtbut1',text:'新建'},{id:'mybtbut2',text:'修改'}],store:new Ext.data.JsonStore({data:[],fields:['CareDate','CareTime','NurRecTyp','Item31','Item32','Item33','Item34','Item35','Item36','Item37','Item50','par','rw','User','Item38']}),colModel: new Ext.grid.ColumnModel({columns:[{header:'日期',dataIndex:'CareDate',width:73, renderer:Ext.util.Format.dateRenderer('Y-m-d'),editor: new Ext.grid.GridEditor(new Ext.form.DateField({id:'D145',format: 'Y-m-d'}))},{header:'时间',dataIndex:'CareTime',width:50,editor: new Ext.grid.GridEditor(new Ext.form.TimeField({format: 'H:i'}))},{header:'模板',dataIndex:'NurRecTyp',width:174,editor:new Ext.grid.GridEditor(new Ext.form.ComboBox({displayField:'id', valueField:'desc',store:new Ext.data.SimpleStore({data : [['DHCNURCCSJMDDJLNS','催产素静脉点滴记录'],['DHCNURHEADCHANGE2','表头变更记录'],['DHCNURNSSCHJLN','首次护理记录单（老年患者）'],['DHCNURBG_XSEKWZHLJLDFY','一般护理记录单'],['DHCNURSKCKHLJLDXHHX','护理记录单'],['DHCNURXH12','危重护理记录']],fields: ['desc', 'id']}),mode:'local'}))},{header:'空白栏1',dataIndex:'Item31',width:50,editor:new Ext.grid.GridEditor(new Ext.form.ComboBox({displayField:'id', valueField:'desc',store:new Ext.data.SimpleStore({data : [['口腔护理','口腔护理'],['面部清洁和梳头','面部清洁和梳头'],['会阴护理','会阴护理'],['床上洗头','床上洗头'],['床上擦浴','床上擦浴'],['足部清洁','足部清洁'],['趾/指甲护理','趾/指甲护理'],['床单元','床单元'],['更衣裤','更衣裤'],['协助进食水','协助进食水']],fields: ['desc', 'id']}),mode:'local'}))},{header:'空白栏2',dataIndex:'Item32',width:50,editor:new Ext.grid.GridEditor(new Ext.form.ComboBox({displayField:'id', valueField:'desc',store:new Ext.data.SimpleStore({data : [['口腔护理','口腔护理'],['面部清洁和梳头','面部清洁和梳头'],['会阴护理','会阴护理'],['床上洗头','床上洗头'],['床上擦浴','床上擦浴'],['足部清洁','足部清洁'],['趾/指甲护理','趾/指甲护理'],['床单元','床单元'],['更衣裤','更衣裤'],['协助进食水','协助进食水']],fields: ['desc', 'id']}),mode:'local'}))},{header:'空白栏3',dataIndex:'Item33',width:50,editor:new Ext.grid.GridEditor(new Ext.form.ComboBox({displayField:'id', valueField:'desc',store:new Ext.data.SimpleStore({data : [['口腔护理','口腔护理'],['面部清洁和梳头','面部清洁和梳头'],['会阴护理','会阴护理'],['床上洗头','床上洗头'],['床上擦浴','床上擦浴'],['足部清洁','足部清洁'],['趾/指甲护理','趾/指甲护理'],['床单元','床单元'],['更衣裤','更衣裤'],['协助进食水','协助进食水']],fields: ['desc', 'id']}),mode:'local'}))},{header:'空白栏4',dataIndex:'Item34',width:50,editor:new Ext.grid.GridEditor(new Ext.form.ComboBox({displayField:'id', valueField:'desc',store:new Ext.data.SimpleStore({data : [['口腔护理','口腔护理'],['面部清洁和梳头','面部清洁和梳头'],['会阴护理','会阴护理'],['床上洗头','床上洗头'],['床上擦浴','床上擦浴'],['足部清洁','足部清洁'],['趾/指甲护理','趾/指甲护理'],['床单元','床单元'],['更衣裤','更衣裤'],['协助进食水','协助进食水']],fields: ['desc', 'id']}),mode:'local'}))},{header:'空白栏5',dataIndex:'Item35',width:50,editor:new Ext.grid.GridEditor(new Ext.form.ComboBox({displayField:'id', valueField:'desc',store:new Ext.data.SimpleStore({data : [['口腔护理','口腔护理'],['面部清洁和梳头','面部清洁和梳头'],['会阴护理','会阴护理'],['床上洗头','床上洗头'],['床上擦浴','床上擦浴'],['足部清洁','足部清洁'],['趾/指甲护理','趾/指甲护理'],['床单元','床单元'],['更衣裤','更衣裤'],['协助进食水','协助进食水']],fields: ['desc', 'id']}),mode:'local'}))},{header:'空白栏6',dataIndex:'Item36',width:50,editor:new Ext.grid.GridEditor(new Ext.form.ComboBox({displayField:'id', valueField:'desc',store:new Ext.data.SimpleStore({data : [['口腔护理','口腔护理'],['面部清洁和梳头','面部清洁和梳头'],['会阴护理','会阴护理'],['床上洗头','床上洗头'],['床上擦浴','床上擦浴'],['足部清洁','足部清洁'],['趾/指甲护理','趾/指甲护理'],['床单元','床单元'],['更衣裤','更衣裤'],['协助进食水','协助进食水']],fields: ['desc', 'id']}),mode:'local'}))},{header:'空白栏7',dataIndex:'Item37',width:50,editor:new Ext.grid.GridEditor(new Ext.form.ComboBox({displayField:'id', valueField:'desc',store:new Ext.data.SimpleStore({data : [['口腔护理','口腔护理'],['面部清洁和梳头','面部清洁和梳头'],['会阴护理','会阴护理'],['床上洗头','床上洗头'],['床上擦浴','床上擦浴'],['足部清洁','足部清洁'],['趾/指甲护理','趾/指甲护理'],['床单元','床单元'],['更衣裤','更衣裤'],['协助进食水','协助进食水']],fields: ['desc', 'id']}),mode:'local'}))},{header:'当前标志',dataIndex:'Item50',width:50,editor:new Ext.grid.GridEditor(new Ext.form.ComboBox({displayField:'id', valueField:'desc',store:new Ext.data.SimpleStore({//data : [['Y','Y'],['N','N']],fields: ['desc', 'id']}),mode:'local'}))},{header:'par',dataIndex:'par',width:50,editor: new Ext.grid.GridEditor(new Ext.form.TextField({readOnly:false}))},{header:'rw',dataIndex:'rw',width:50,editor: new Ext.grid.GridEditor(new Ext.form.TextField({readOnly:false}))},{header:'签名',dataIndex:'User',width:50,editor: new Ext.grid.GridEditor(new Ext.form.TextField({readOnly:false}))},{header:'空白栏8',dataIndex:'Item38',width:50,editor:new Ext.grid.GridEditor(new Ext.form.ComboBox({displayField:'id', valueField:'desc',store:new Ext.data.SimpleStore({data : [],fields: ['desc', 'id']}),mode:'local'}))}],rows:[],defaultSortable:false}),enableColumnMove: false,viewConfig:{forceFit: false},plugins:[new Ext.ux.plugins.GroupHeaderGrid()],sm: new Ext.grid.RowSelectionModel({ singleSelect: false}),bbar: new Ext.PagingToolbar({store:new Ext.data.JsonStore({data:[],fields:['CareDate','CareTime','NurRecTyp','Item31','Item32','Item33','Item34','Item35','Item36','Item37','Item50','par','rw','User','Item38']}),displayInfo:true,pageSize:10})})]}];
 //var a = cspRunServerMethod(pdata1,false ,"DHCNURHEADCHANGE2", EpisodeID,session['LOGON.CTLOCID'],false );
// var a = cspRunServerMethod(pdata1, "", "DHCNURHEADCHANGE", EpisodeID, "");
 //alert(a)
 //var arrb = eval(a);
var a = cspRunServerMethod(pdata1, "", "DHCNURHEADCHANGE2", EpisodeID, "");
 //alert(a)
 var arrb = eval(a);
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
		items: arrb
	});
	/*arr = eval(a);
	var window = new Ext.Window({
		title: '关联表头记录',
		width: 815,
		height: 435,
		autoScroll: true,
		layout: 'absolute',
		plain: true,
		frame:true,
		//modal: true,
		//bodyStyle: 'padding:5px;',
		///buttonAlign: 'center',
		items: arr
	});*/
	//alert(111)
	var butin=Ext.getCmp('mybtbut1');
	butin.setText("修改关联表头");
	//butin.text="确定";
	butin.on('click',UpdateBT);
	var but2=Ext.getCmp('mybtbut2');
	but2.text="修改表头";
	//but2.on('click',additm2);
	var mybt = Ext.getCmp('mybt');
	var diagtobar=mybt.getTopToolbar();
	mybt.getBottomToolbar().hide()
	//debugger;
	var objRow=grid.getSelectionModel().getSelections();
	SchBT();
	window.show();
}
var curhead =""
function UpdateBT()
{
	var diaggrid=Ext.getCmp("mybt");
	var objDiagnosRow=diaggrid.getSelectionModel().getSelections();
	//alert(objDiagnosRow)
	if (objDiagnosRow.length == 0) { Ext.Msg.alert('提示', "请先选择一条诊断记录!"); return; }
	var grid=Ext.getCmp("mygrid");
	var objRow=grid.getSelectionModel().getSelections();
	if (objRow.length == 0) { Ext.Msg.alert('提示', "请先选择一条护理记录!"); return; }
	else
	{ //alert(objRow)
	  var par= objDiagnosRow[0].get("par"); 
	  var rw= objDiagnosRow[0].get("rw");
	  curhead=par+"_"+rw
	  //alert(curhead)
	  if (curhead!="")
	   {
		  savebt();
		}
	}
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
function SchBT()
{
    MeasureRel = new Hashtable();
    REC = new Array();
	var adm = EpisodeID;
	var GetQueryData = document.getElementById('GetQueryData');
	var mygrid = Ext.getCmp("mybt");
	var parr = adm + "^" +"DHCNURHEADCHANGE" ;
	// debugger;
	//alert(parr)
	var a = cspRunServerMethod(GetQueryData.value, "web.DHCNurRecComm:GetHeadChange", "parr$" + parr, "AddRecbt");
	mygrid.store.loadData(REC);
}
function AddRecbt(str)
{
	//var a=new Object(eval(str));
	//alert(str)
	var obj = eval('(' + str + ')');
	obj.CareDate=getDate(obj.CareDate);
	//obj.PregHPregDate=getDate(obj.PregHPregDate);
	REC.push(obj);
	//debugger;
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
function CancelRecord1()
{
	var objCancelRecord=document.getElementById('CancelRecord');
	var objRow=grid1.getSelectionModel().getSelections();
	if (objRow.length == 0) { Ext.Msg.alert('提示', "请先选择一条护理记录!"); return; }
	else
	{
		Ext.Msg.show({    
	       title:'再确认一下',    
	       msg: '你确定要作废此条护理记录吗?',    
	       buttons:{"ok":"确定","cancel":"取消"},
	       fn:  function(btn, text){    
	            if (btn == 'ok'){    
					var par=objRow[0].get("par1");
					var rw=objRow[0].get("rw1");
					//alert(par+","+rw+","+session['LOGON.USERID']+","+session['LOGON.GROUPDESC']);
					if (objCancelRecord) {
						var a = cspRunServerMethod(objCancelRecord.value, par, rw, session['LOGON.USERID'], session['LOGON.GROUPDESC']);
						if (a!=0){
							alert(a);
							return;
						}else{
							find1();
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
	{name:'CareDate1'}, 
	{name:'CareTime1'},
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
	{name:'Item51'},
	{name:'Item52'},
	{name:'Item53'},
	{name:'Item54'},
	{name:'Item55'},
	{name:'Item56'},
	{name:'Item57'}, 
	{name:'Item58'},
	{name:'Item59'},
	{name:'Item60'},
	{name:'CaseMeasure'},
	{name:'User1'},
	{name:'rw1'},
	{name:'par1'}
      ]);
    var count = grid1.store.getCount(); 
    //alert(count)
    var r = new Plant({CareDate1:getDate(statenddate),CareTime1:statendtime}); 
    grid1.store.commitChanges(); 
    grid1.store.insert(count,r); 
   return count;
}
var wind4;   //全局变量
var kkkk=0
var dddd=0
 
 //知识链接维护
 function KnLinkGrid()
{
		
		var lnk= "DHCNurEmrComm.csp?"+"&EmrCode=DHCNURBG_KnLink&EpisodeID="+EpisodeID+"&headcode=DHCNURBG_XSEKWZHLJLDFY&Grid=mygrid";
	    
     var dddd=kkkk%2 
	  
	   if (dddd==0)
	   {	   	
	   wind4= window.open(lnk,"html22ww",'left=200,top=300,toolbar=no,location=no,directories=no,resizable=yes,width=800,height=400');
	   kkkk=kkkk+1;
	   }
	   else 
	   	{
	   		 if(typeof(wind4)!="undefined"&&wind4.open&&!wind4.closed)  //判断是否存在子窗口并处于打开状态
         {   
            wind4.close();  //关闭子窗口
            //CurrHeadDr= Ext.get("loc1").dom.value;
            //var a=cspRunServerMethod(Savecurhead,EpisodeID, CurrHeadDr, session['LOGON.USERID'], EmrCode);
            self.location.reload(); 
            //find()
          }      
          kkkk=kkkk+1;
	   	}
}
//知识链接维护
 function KnLinkGrid1()
{
		
		var lnk= "DHCNurEmrComm.csp?"+"&EmrCode=DHCNURBG_KnLink&EpisodeID="+EpisodeID+"&headcode=DHCNURBG_XSEKWZHLJLDFY&Grid=mygrid1";
	    
     var dddd=kkkk%2 
	  
	   if (dddd==0)
	   {	   	
	   wind4= window.open(lnk,"html22ww",'left=200,top=300,toolbar=no,location=no,directories=no,resizable=yes,width=800,height=400');
	   kkkk=kkkk+1;
	   }
	   else 
	   	{
	   		 if(typeof(wind4)!="undefined"&&wind4.open&&!wind4.closed)  //判断是否存在子窗口并处于打开状态
         {   
            wind4.close();  //关闭子窗口
            //CurrHeadDr= Ext.get("loc1").dom.value;
            //var a=cspRunServerMethod(Savecurhead,EpisodeID, CurrHeadDr, session['LOGON.USERID'], EmrCode);
            self.location.reload(); 
            //find()
          }      
          kkkk=kkkk+1;
	   	}

}
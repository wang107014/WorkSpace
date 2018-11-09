var ret="";
var checkret="";
var comboret="";
var arrgrid=new Array();



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
function eachItem1(item,index,length) {   
    if (item.xtype=="datefield") {   
            //修改下拉框的请求地址    
			ret=ret+item.id+"|"+formatDate(item.getValue())+"^";   
			
      
    } 
    if (item.xtype=="timefield") {   
            //修改下拉框的请求地址    
			//debugger;
			ret=ret+item.id+"|"+item.getValue()+"^";   
      
    } 
	 if (item.xtype=="combo") {   
            //修改下拉框的请求地址    
			//debugger;
			comboret=comboret+item.id+"|"+item.getValue()+"!"+item.lastSelectionText+"^";   
		
      
    } 
	 if (item.xtype=="textfield") {   
            //修改下拉框的请求地址    
			//debugger;
			ret=ret+item.id+"|"+item.getValue()+"^";   
      
    } 
	 if (item.xtype=="textarea") {   
            //修改下拉框的请求地址    
			ret=ret+item.id+"|"+item.getRawValue()+"^";   
      
    } 
	 if (item.xtype=="checkbox") {   
            //修改下拉框的请求地址    
			//debugger;
			if (item.checked==true)
			{
				 checkret=checkret+item.id+"|"+item.boxLabel+"^"; 
				}
			else
				{
			
					checkret=checkret+item.id+"|^";
				}
      
    } 
	  
    if (item.items && item.items.getCount() > 0) {   
       item.items.each(eachItem1, this);   
    }   
}   
function BsKeyDown(e) //获取enter键盘事件响应
 {
      if(document.all)
      {
       var iekey=window.event.keyCode;
       if(iekey==13)
          {   
           if(event.srcElement.id=="Item104")
             {
             document.getElementById("Item104").value=session['LOGON.USERNAME'];
             }  
             if(event.srcElement.id=="Item105")
             {
             document.getElementById("Item105").value=session['LOGON.USERNAME'];
             }    
             if(event.srcElement.id=="Item106")
             {
             document.getElementById("Item106").value=session['LOGON.USERNAME'];
             }        
          }
       
       }
}

var ITypItm=""; //后取数据字典型
function BodyLoadHandler(){
	//var but=Ext.getCmp("butClose");
   // but.on('click',btclose);
	var but=Ext.getCmp("butSave");
    but.on('click',Save);
	var but=Ext.getCmp("butPrint");
    but.on('click',butPrintFn);
 // var Item11=Ext.getCmp("Item10");
   // Item11.on('select', function() {
		//	checksj();
		//});
		//var Item8=Ext.getCmp("Item8");
   // Item8.on('select', function() {
		//	checksj();
		//});
		//document.onkeydown=BsKeyDown;
		//alert(NurRecId)

	//var gform=Ext.getCmp("gform");
 //gform.items.each(eachItem11, this);
	setvalue()
	 var score1 = Ext.getCmp("Item15"); 
   score1.on('change',scoreAdd,this);
	var score1 = Ext.getCmp("Item16"); 
   score1.on('change',scoreAdd,this);
   var score1 = Ext.getCmp("Item17"); 
   score1.on('change',scoreAdd,this);
   var score1 = Ext.getCmp("Item18"); 
   score1.on('change',scoreAdd,this);
   var score1 = Ext.getCmp("Item19"); 
   score1.on('change',scoreAdd,this);
   var score1 = Ext.getCmp("Item20"); 
   score1.on('change',scoreAdd,this);
   var score1 = Ext.getCmp("Item34"); 
   score1.on('change',scoreAdd2,this);
   var score1 = Ext.getCmp("Item35"); 
   score1.on('change',scoreAdd2,this);
   var score1 = Ext.getCmp("Item36"); 
   score1.on('change',scoreAdd2,this);
   var score1 = Ext.getCmp("Item37"); 
   score1.on('change',scoreAdd2,this);
   var score1 = Ext.getCmp("Item38"); 
   score1.on('change',scoreAdd2,this);
   var score1 = Ext.getCmp("Item39"); 
   score1.on('change',scoreAdd2,this);
   var score1 = Ext.getCmp("Item49"); 
   score1.on('change',scoreAdd3,this);
   var score1 = Ext.getCmp("Item50"); 
   score1.on('change',scoreAdd3,this);
   var score1 = Ext.getCmp("Item51"); 
   score1.on('change',scoreAdd3,this);
   var score1 = Ext.getCmp("Item52"); 
   score1.on('change',scoreAdd3,this);
   var score1 = Ext.getCmp("Item53"); 
   score1.on('change',scoreAdd3,this);
   var score1 = Ext.getCmp("Item54"); 
   score1.on('change',scoreAdd3,this);
   
    var score1 = Ext.getCmp("Item72"); 
   score1.on('change',scoreAdd4,this);
	 var score1 = Ext.getCmp("Item73"); 
   score1.on('change',scoreAdd4,this);
   var score1 = Ext.getCmp("Item74"); 
   score1.on('change',scoreAdd4,this);
   var score1 = Ext.getCmp("Item75"); 
   score1.on('change',scoreAdd4,this);
   var score1 = Ext.getCmp("Item76"); 
   score1.on('change',scoreAdd4,this);
   var score1 = Ext.getCmp("Item77"); 
   score1.on('change',scoreAdd4,this);
   
   var score1 = Ext.getCmp("Item90"); 
   score1.on('change',scoreAdd5,this);
	 var score1 = Ext.getCmp("Item91"); 
   score1.on('change',scoreAdd5,this);
   var score1 = Ext.getCmp("Item92"); 
   score1.on('change',scoreAdd5,this);
   var score1 = Ext.getCmp("Item93"); 
   score1.on('change',scoreAdd5,this);
   var score1 = Ext.getCmp("Item94"); 
   score1.on('change',scoreAdd5,this);
   var score1 = Ext.getCmp("Item95"); 
   score1.on('change',scoreAdd5,this);
	 
}
  var totel=0;
  function scoreAdd(obj)
  {
     var Item15=Ext.getCmp("Item15").getValue()	
     var Item16=Ext.getCmp("Item16").getValue()	
     var Item17=Ext.getCmp("Item17").getValue()	
     var Item18=Ext.getCmp("Item18").getValue()	
     var Item19=Ext.getCmp("Item19").getValue()	
     var Item20=Ext.getCmp("Item20").getValue()	
     var Item12=Ext.getCmp("Item12")
     var Item31=Ext.getCmp("Item31")
     if (Item12.getValue()=="") Item12.setValue(new Date())
     Item31.setValue(session['LOGON.USERNAME'])
     Item31.disable()
     if (Item15=="") Item15=0;
     if (Item16=="") Item16=0;
     if (Item17=="") Item17=0;
     if (Item18=="") Item18=0;
     if (Item19=="") Item19=0;
     if (Item20=="") Item20=0;
     totel=parseInt(Item15)+parseInt(Item16)+parseInt(Item17)+parseInt(Item18)+parseInt(Item19)+parseInt(Item20);
     var amtsum = Ext.getCmp("Item10"); 	//总分元素
     amtsum.setValue(totel);  
} 
 var totel2=0;
  function scoreAdd2(obj)
  {
  	
     var Item15=Ext.getCmp("Item34").getValue()	
     var Item16=Ext.getCmp("Item35").getValue()	
     var Item17=Ext.getCmp("Item36").getValue()	
     var Item18=Ext.getCmp("Item37").getValue()	
     var Item19=Ext.getCmp("Item38").getValue()	
     var Item20=Ext.getCmp("Item39").getValue()	
     var Item12=Ext.getCmp("Item13")
     var Item31=Ext.getCmp("Item32")
     Item31.disable()
     if (Item12.getValue()=="") Item12.setValue(new Date())
     Item31.setValue(session['LOGON.USERNAME'])
     if (Item15=="") Item15=0;
     if (Item16=="") Item16=0;
     if (Item17=="") Item17=0;
     if (Item18=="") Item18=0;
     if (Item19=="") Item19=0;
     if (Item20=="") Item20=0;
     totel2=parseInt(Item15)+parseInt(Item16)+parseInt(Item17)+parseInt(Item18)+parseInt(Item19)+parseInt(Item20);
     var amtsum = Ext.getCmp("Item11"); 	//总分元素
     amtsum.setValue(totel2);  
} 
 var totel3=0;
  function scoreAdd3(obj)
  {
     var Item15=Ext.getCmp("Item49").getValue()	
     var Item16=Ext.getCmp("Item50").getValue()	
     var Item17=Ext.getCmp("Item51").getValue()	
     var Item18=Ext.getCmp("Item52").getValue()	
     var Item19=Ext.getCmp("Item53").getValue()	
     var Item20=Ext.getCmp("Item54").getValue()	
      var Item12=Ext.getCmp("Item14")
     var Item31=Ext.getCmp("Item33")
     if (Item12.getValue()=="") Item12.setValue(new Date())
     Item31.setValue(session['LOGON.USERNAME'])
     Item31.disable()
     if (Item15=="") Item15=0;
     if (Item16=="") Item16=0;
     if (Item17=="") Item17=0;
     if (Item18=="") Item18=0;
     if (Item19=="") Item19=0;
     if (Item20=="") Item20=0;
     totel3=parseInt(Item15)+parseInt(Item16)+parseInt(Item17)+parseInt(Item18)+parseInt(Item19)+parseInt(Item20);
     var amtsum = Ext.getCmp("Item67"); 	//总分元素
     amtsum.setValue(totel3);  
} 

var totel4=0;
  function scoreAdd4(obj)
  {
     var Item15=Ext.getCmp("Item72").getValue()	
     var Item16=Ext.getCmp("Item73").getValue()	
     var Item17=Ext.getCmp("Item74").getValue()	
     var Item18=Ext.getCmp("Item75").getValue()	
     var Item19=Ext.getCmp("Item76").getValue()	
     var Item20=Ext.getCmp("Item77").getValue()	
      var Item12=Ext.getCmp("Item70")
     var Item31=Ext.getCmp("Item86")
     if (Item12.getValue()=="") Item12.setValue(new Date())
     Item31.setValue(session['LOGON.USERNAME'])
     Item31.disable()
     if (Item15=="") Item15=0;
     if (Item16=="") Item16=0;
     if (Item17=="") Item17=0;
     if (Item18=="") Item18=0;
     if (Item19=="") Item19=0;
     if (Item20=="") Item20=0;
     totel4=parseInt(Item15)+parseInt(Item16)+parseInt(Item17)+parseInt(Item18)+parseInt(Item19)+parseInt(Item20);
     var amtsum = Ext.getCmp("Item88"); 	//总分元素
     amtsum.setValue(totel4);  
} 

var totel5=0;
  function scoreAdd5(obj)
  {
     var Item15=Ext.getCmp("Item90").getValue()	
     var Item16=Ext.getCmp("Item91").getValue()	
     var Item17=Ext.getCmp("Item92").getValue()	
     var Item18=Ext.getCmp("Item93").getValue()	
     var Item19=Ext.getCmp("Item94").getValue()	
     var Item20=Ext.getCmp("Item95").getValue()	
      var Item12=Ext.getCmp("Item71")
     var Item31=Ext.getCmp("Item87")
     if (Item12.getValue()=="") Item12.setValue(new Date())
     Item31.setValue(session['LOGON.USERNAME'])
     Item31.disable()
     if (Item15=="") Item15=0;
     if (Item16=="") Item16=0;
     if (Item17=="") Item17=0;
     if (Item18=="") Item18=0;
     if (Item19=="") Item19=0;
     if (Item20=="") Item20=0;
     totel5=parseInt(Item15)+parseInt(Item16)+parseInt(Item17)+parseInt(Item18)+parseInt(Item19)+parseInt(Item20);
     var amtsum = Ext.getCmp("Item89"); 	//总分元素
     amtsum.setValue(totel5);  
} 
//***********************************************************in

function eachItem11(item,index,length) {   
 if (item.xtype == "datafield") {
 	item.on('OnFieldChanged',function(obj, ischecked){checksj(obj)} );
 	
 }

 if (item.items && item.items.getCount() > 0) { 
	      
       item.items.each(eachItem11, this);   
    }   
    
}    
function checksj(item){
	  var str=document.getElementById("Item8").value;
	  var str1=document.getElementById("Item10").value;
     var manydate = document.getElementById('getdate');
   	 var ret = cspRunServerMethod(manydate.value,str+"@"+str1);
   	 document.getElementById("Item9").value=ret;
   	
  
}

function layoutset()
{
	var GetLayoutItem=document.getElementById('GetLayoutItem');
	//alert(GetLayoutItem);
	var ret=cspRunServerMethod(GetLayoutItem.value,session['LOGON.GROUPID'] ,EmrCode);
	var arr=ret.split("^");
	for (var i=0;i<arr.length;i++)
	{
		var itm=arr[i];
		//alert(itm);
		if (itm=="") continue;
		var itmarr=itm.split("|");
		var com=Ext.getCmp(itmarr[0]);
		com.disable();
	}
}
function  setvtf(item,test){ //设置控件显示
var testzsw=Ext.getCmp(test);
         if(item.checked==true)
           {
           
	         testzsw.setVisible(true);
	         }
	       else
	         {
	       document.getElementById(test).value="";
	         testzsw.setVisible(false);
	         }


}
function eachItemcheck(item,index,length) {   
     	if (item.xtype=="checkbox") {   
 			if (item.id.indexOf("_")!=-1)
			{
				var aa=item.id.split("_");
				var bb=checkItem.split("_");
				if (aa[0]==bb[0])
				{
					//alert(item.id+"|"+checkItem);
					if (item.id!=checkItem) 
					{
						checkret=checkret+item.id+"^";
						//checkflag="true";
					}
				}

			}
        } 

	   if (item.items && item.items.getCount() > 0) { 
	      
       item.items.each(eachItemcheck, this);   
    }       
}  
var checkItem=""; 
var checkflag="true";
function checksj1(item)
{  
   if (checkflag=="false") return;  
   checkret="";
   checkItem=item.id;    
   if (item.check=true)
   {  
   	 var gform=Ext.getCmp("gform");
     gform.items.each(eachItemcheck, this);     
	   checkflag="false";	 
	   var aa=checkret.split("^");
	 for (var i=0;i<aa.length;i++)
	 {
	 	if (aa[i]=="")continue;
		var ch=Ext.getCmp(aa[i]);
		ch.setValue(false);
	 }
	  checkflag="true"; 
   }
    
     
} 
//***********************************************************************************out
function scoreAdd11(obj)
{   //alert(obj)
	 //var scorearry1=new Array(); 
	 var scorehj=0; 
	 var tmp=obj.getValue();
	 var tmp11=obj.getId();
	 //alert(tmp)
	 //alert(tmp11)
	 if ((tmp=="7")&&(tmp11=="Item8"))
	 {
	 	var Item7=Ext.getCmp("Item4");
		if(Item7)  Item7.setVisible(true);	
	 }
	 
	 tmp=scoreFormat(tmp);
 
	 if (tmp==null)
	 {  
	    tmp="0";	
	 	
   }	 
	
	 //var amtsum = Ext.getCmp("Item53"); 
	 //tmp=parseInt(tmp)+parseInt(amtsum.getValue())	 
	 //amtsum.setValue(scorehj);  
}

function setVal2(itm,val)
{
	    if (val=="") return ;
	   	var tt=val.split('!');
		//alert(tt);
	 	var cm=Ext.getCmp(itm);
		person=new Array();
		addperson(tt[1],tt[0]);
		cm.store.loadData(person);
		cm.setValue(tt[0]);
		 
}



function btclose()
{
	window.close();
}

function cmbkey(field, e)
{
	if (e.getKey() ==Ext.EventObject.ENTER)
	{
		var pp=field.lastQuery;
		//alert(pp)
		getlistdata(pp,field);
	//	alert(ret);
		
	}
}
var person=new Array();
function getlistdata(p,cmb)
{
	var GetPerson =document.getElementById('GetPerson');
	//debugger;
    var ret=cspRunServerMethod(GetPerson.value,p);
	if (ret!="")
	{
			
		var aa=ret.split('^');

		for (i=0;i<aa.length;i++)
		{
			if (aa[i]=="" ) continue;
			var it=aa[i].split('|');
			addperson(it[1],it[0]);
		}
		//debugger;
		cmb.store.loadData(person);
	}
}
function addperson(a,b)
{
	person.push(
	{
		desc:a,
		id:b
	}
	);
}


function AddRec(str)
{
	//var a=new Object(eval(str));
	var obj = eval('(' + str + ')');
	arrgrid.push(obj);
	//debugger;
}
function setvalue11()
{
	
   var ha = new Hashtable();
   var getid=document.getElementById('GetId');
   var id=cspRunServerMethod(getid.value,EmrCode,EpisodeID);
   if (NurRecId!="")
   {
   	 var getVal=document.getElementById('getVal');
	 var ret=cspRunServerMethod(getVal.value,NurRecId);
     var tm=ret.split('^')
	
	 sethashvalue(ha,tm)

   }
 	 else {
 	 	getPatInfo();	
 	 	return;
 	 }
	
  
    
	 var gform=Ext.getCmp("gform");
     gform.items.each(eachItem, this);  
	
	for (var i=0 ; i<ht.keys().length;i++)//for...in statement get all of Array's index
	{
		var key = ht.keys()[i];
	
		if (key.indexOf("_") == -1) 
		{
		
			var flag=ifflag(key );
			if (flag==true)
			{
				setVal2(key ,ha.items(key));
		
				continue;
			}
			var itm = Ext.getCmp(key);
			if (ha.contains(key)) 
			itm.setValue(getval(ha.items(key)));
			
	    }else{
			var aa=key.split('_');
			if(ha.contains(aa[0]))
			{
			  setcheckvalue(key,ha.items(aa[0]));
			}
		}
    }
 
}
function setvalue()
{
	//alert(ExamId);DHCNURBAYCHL
   var ha = new Hashtable();
   var getid=document.getElementById('GetId');
   var id=cspRunServerMethod(getid.value,EmrCode,EpisodeID);
   //alert(id+""+EmrCode+"@"+EpisodeID);
   if (NurRecId!="")
   {
   	id=NurRecId;
   	}else{
   		id="";
   		}
   	
   if (id != "") {
   	 var getVal=document.getElementById('getVal');
	 var ret=cspRunServerMethod(getVal.value,id);
     var tm=ret.split('^');
	//alert(tm)
	 sethashvalue(ha,tm);
			}
			else {
				getPatInfo();
				return;
				//var PatInfo = document.getElementById('PatInfo');
				//if (PatInfo) {
				//alert(12);
					//var ret = cspRunServerMethod(PatInfo.value, EpisodeID, EmrCode);
					//var tm = ret.split('^')
					//sethashvalue(ha, tm)
				}
			
	// debugger;
    	
  
    
	 var gform=Ext.getCmp("gform");
     gform.items.each(eachItem, this);  
	 //  alert(a);
	for (var i=0 ; i<ht.keys().length;i++)//for...in statement get all of Array's index
	{
		var key = ht.keys()[i];
		//restr += ht.items(key) + " " + ht.parent[key] + "<br/>";
		if (key.indexOf("_") == -1) 
		{
			//alert(key);
			var flag=ifflag(key );   //界面显示
			if (flag==true)
			{
				if (ha.contains(key)) setVal2(key ,ha.items(key));
				//debugger;
				continue;
			} 
  		

			var itm = Ext.getCmp(key);
			if (ha.contains(key)) 
			itm.setValue(getval(ha.items(key)));
			
	    }else{
			var aa=key.split('_');
			if(ha.contains(aa[0]))
			{
			  setcheckvalue(key,ha.items(aa[0]));
			} 
		}
    }
 
}
function getval(itm)
{
	var tm=itm.split('!');
//	alert(tm)
	return tm[0];
}
function ifflag(itm)
{
	var tm=ITypItm.split('|');
	var flag=false;
	for (var i=0;i<tm.length;i++)
	{
		if (itm==tm[i])
		{
			flag=true;
		}
	}
	return flag ;
}
function Save()
{
   ret="";
  checkret="";
  comboret="";
  var getid=document.getElementById("GetId");
   //alert(getid);
   var id=cspRunServerMethod(getid.value,EmrCode,EpisodeID);
   //alert(id);
   //return;
  var SaveRec=document.getElementById("Save");
  var gform=Ext.getCmp("gform");
   gform.items.each(eachItem1, this);  
  //alert(EmrCode)
  //ret+"&"+checkret+"&"+comboret;
 //alert(checkret);
  //alert(ret);
  //alert(comboret);
  //alert(NurRecId)
  //alert(NurRecId+"@"+id)
  if (NurRecId!="")
   {
   	id=NurRecId;
   	}else{
   		id="";
   		}

  if (id!=""){
 var Id=cspRunServerMethod(SaveRec.value,"^EmrUser|"+session['LOGON.USERID']+"^EmrCode|"+EmrCode+"^"+ret+"^DetLocDr|"+session['LOGON.CTLOCID']+"^EpisodeId|"+EpisodeID+"&"+checkret+"&"+comboret,id);
 }
else
	{
		var Id=cspRunServerMethod(SaveRec.value,"^EmrUser|"+session['LOGON.USERID']+"^EmrCode|"+EmrCode+"^"+ret+"^DetLocDr|"+session['LOGON.CTLOCID']+"^EpisodeId|"+EpisodeID+"&"+checkret+"&"+comboret,"");
 
		}
   //alert(Id)
		if (Id!=="")
		{
  alert("已保存");
  NurRecId=Id;
}
else {alert("保存失败");
	return
	}
	 var sum1 = Ext.getCmp("Item10").value;
   var sum2 = Ext.getCmp("Item11").value;
   if((sum1<13)&&(sum2==""))
   {
	 var truthBePrint=window.confirm("是否填写压疮风险预警报告表！");
	 if(truthBePrint){
 
		var lnk= "dhcnuremrcomm.csp?"+"&EmrCode=DHCNURBAYCFXYJBGB&EpisodeID="+EpisodeID  ;//"&DtId="+DtId+"&ExamId="+ExamId
    window.open(lnk,"htm",'left=460,toolbar=no,location=no,directories=no,resizable=yes,width=1000,height=700');
   }
   else
   	{
   		 Ext.Msg.show({    
	       title:'确认一下',    
	       msg: '保存成功! 您要关闭该页面吗？',    
	       buttons:{"ok":"是     ","cancel":"  否"},
	       fn:  function(btn, text){    
	            if (btn == 'ok'){   
	
	            window.close();  //关闭子窗口  
	            window.opener.find();
	            
	            }
					        else
	            {   setvalue()  	}
	            
	        },    
	       animEl: 'newbutton'   
	       });
   		
   		
   		}
   }
 //setvalue();
 //alert(NurRecId);
//window.opener.find();
//window.close();

}
function Save1()
{
  ret="";
  checkret="";
  comboret=""; 
  var getid=document.getElementById("GetId"); 
  var id=cspRunServerMethod(getid.value,EmrCode,EpisodeID); 
  var SaveRec=document.getElementById('Save');
  var gform=Ext.getCmp("gform");
  gform.items.each(eachItem1, this);  
  //alert(EmrCode)
 //alert(ret+"&"+checkret+"&"+comboret)
  //alert(checkret);
 if (id==""){
 var Id=cspRunServerMethod(SaveRec.value,"^EmrUser|"+session['LOGON.USERID']+"^EmrCode|"+EmrCode+"^"+ret+"^DetLocDr|"+session['LOGON.CTLOCID']+"^EpisodeId|"+EpisodeID+"&"+checkret+"&"+comboret,"");
 Ext.Msg.alert('提示', "已保存!");
  return;
 //alert(NurRecId); 
}
else
{
  var Id=cspRunServerMethod(SaveRec.value,"^EmrUser|"+session['LOGON.USERID']+"^EmrCode|"+EmrCode+"^"+ret+"^DetLocDr|"+session['LOGON.CTLOCID']+"^EpisodeId|"+EpisodeID+"&"+checkret+"&"+comboret,id);
  if (Id!=="")
		{
     Ext.Msg.alert('提示', "已保存!");
     return;
    } 
    else
    {  
     Ext.Msg.alert('提示', "保存失败!");
     return;
	  }
 }

}
function getPatInfo()
{
	var PatInfo=document.getElementById('PatInfo');
	if (PatInfo) {
		var ret=cspRunServerMethod(PatInfo.value,EpisodeID);
	 	var tt=ret.split('^');
	 	var patName = Ext.getCmp("Item1");
	 	patName.setValue(getValueByCode(tt[11]));
	 	var sex = Ext.getCmp("Item2");
	 	sex.setValue(getValueByCode(tt[10]));
	 	var  patid= Ext.getCmp("Item6");
	 	patid.setValue(getValueByCode(tt[16]));
	 	var  regno= Ext.getCmp("Item7");
	 	regno.setValue(getValueByCode(tt[7]));
	 	var  regno= Ext.getCmp("Item8");
	 	regno.setValue(getValueByCode(tt[6]));	 	
	 	var age = Ext.getCmp("Item3");
	 	age.setValue(getValueByCode(tt[13]));
	 	var patLoc = Ext.getCmp("Item4");
	 	patLoc.setValue(getValueByCode(tt[8]));
	 	var bedCode = Ext.getCmp("Item5");
	 	bedCode.setValue(getValueByCode(tt[12]));
	  var diag = Ext.getCmp("Item9");
	 	//var bedCode = Ext.getCmp("Item2");
	 	//bedCode.setValue(getValueByCode(tt[5]));
	 // var MedCareNo = Ext.getCmp("Item6");
	 // MedCareNo.setValue(getValueByCode(tt[9]));
	  // var Item10 = Ext.getCmp("Item10");
	 
	    //Item10.setValue(diffDate(new Date(),0));
	  //var manydate = document.getElementById('getdate');
   	//var ret = cspRunServerMethod(manydate.value,getValueByCode(tt[14])+"@"+diffDate(new Date(),0));
   	// var Item9 = Ext.getCmp("Item9");
   	// Item9.setValue(ret);
	}
}
function getValueByCode(tempStr)
{
	var retStr=tempStr;
	var strArr = tempStr.split("@");
	if (strArr.length>1) 
	{
		retStr=strArr[1];
	}
	return retStr;
}
function butPrintFn22()
{
			PrintComm.RHeadCaption='dddd';
			PrintComm.LHeadCaption="3333333";
			//PrintComm.RFootCaption="第";
			//PrintComm.LFootCaption="页";
			//PrintComm.LFootCaption="88";
			//alert(PrintComm.Pages);
			PrintComm.SetConnectStr(CacheDB);
			PrintComm.WebUrl=WebIp+"/dthealth/web/DWR.DoctorRound.cls";
		
			PrintComm.ItmName="DHCNURPRNDDZC";
		
			var parr="@"+EpisodeID+"@DHCNURPRNDDZC";
			//alert(parr)
		  PrintComm.MthArr="Nur.DHCMoudData:GetPrnValComm&parr:"+parr;
		
			PrintComm.PrintOut();
}
function butPrintFn()
{    
      PrintComm.RHeadCaption='dddd';
			PrintComm.LHeadCaption="3333333";
			PrintComm.SetConnectStr(CacheDB);
			PrintComm.WebUrl=WebIp+"/dthealth/web/DWR.DoctorRound.cls";
			PrintComm.ItmName = "DHCNURPRNYCFX";
			var parr="@"+EpisodeID+"@DHCNURBAYCHL";
			//alert(NurRecId)
			PrintComm.previewPrint="1";
			var getid=document.getElementById('GetId');
      var id=cspRunServerMethod(getid.value,EmrCode,EpisodeID);
			//alert(NurRecId+"@"+id)
			//return;
			PrintComm.MthArr="Nur.DHCMoudData:getVal&parr:"+NurRecId+"!";
			PrintComm.PrintOut();	
      }

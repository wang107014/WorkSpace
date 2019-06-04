##<font color=red>pos银行卡结算:</font>



###一、POS银行卡缴费

	DHCBillPayService.js
	//支付服务
	var PayRtn = PayService("OP", PayMode, "", ExpStr);  
	//<pos收费入口>  
	var rtnValue = posPay(tradeType,tradeAmt,hisPrtStr,payMode,expStr);

	DHCBillMisPosPay.js
	var posConfig=ReadIniTxt();	//调用本地配置文件获取银行pos机厂家及终端号
		
	//读取本地配置文件,获取文件信息,保存到全局变量PUBLIC_POSConfig中
	function ReadIniTxt()
			{
				try{
					////创建文件  FSO是FileSystemObject 或 Scripting.FileSystemObject 的缩写，为 IIS 内置组件，用于操作磁盘、文件夹或文本文件
					var fso = new ActiveXObject("Scripting.FileSystemObject"); 
                    //打开并读文件,第二个参数 1 表示只读打开
					var f = fso.OpenTextFile("C:\\POSConfig.txt",1);    
					//AtEndOfStream的结尾
					while (!f.AtEndOfStream) {    
						//'从当前位置向后读取直到遇到换行符（不读取换行符），并将当前位置移动到下一行的第一个字符，注意：无参数'
						var s = f.ReadLine();              
						var sname=s.split("=")[0];
						var svalue=s.split("=")[1];
						for (var name in PUBLIC_POSConfig){
							if(name==sname){
								PUBLIC_POSConfig[name]=svalue;
								break;
							}
						}
					}
					f.Close();
					return true;
				} catch (e) {
					return false;
				}	
			}

	DHCBillMisPosPay.js
	<pos缴费入口>
	var rtnPosPay=BankCardPay(tradeType,tradeAmt,payMode,expStr);
		POS缴费流程：
			1、生成订单：w ##class(DHCBILL.MisPos.BLL.MisPosLogic).CreatePayOrder()
				1.1、在HIS交易信息表(DHC_BillExtTradePay)中插入数据
				1.2、生成HIS端交易号、更新HIS交易信息表

			2、根据银行类型组织参数：w ##class(DHCBILL.MisPos.BLL.MisPosLogic).GetMisPosInput(3420)
			
			3、调用接口：var bankData=CallDLLFun(bankInput);

			4、保存银行的交易数据：w ##class(DHCBILL.MisPos.BLL.MisPosLogic).SaveMisPosData()
				2.1、保存POS交易返回原始数据：w ##class(DHCBILL.ScanPay.BLL.DHCBillScanCodePayLogic).SaveLog()
				2.2、根据pos交易返回的数据串更新交易信息表：w ##class(DHCBILL.MisPos.Adapter.HLMisPos).GetOutBankData()


	DHCBillPayService.js
	HIS业务关联订单服务
	var RelaRtn = RelationService(ETPRowID, PrtRowID, "OP");
		保存子表信息关联业务表：w ##class(DHCBILL.Common.DHCBILLCommon).RelationOrderToHIS()
			1、更新HIS交易信息表中的ETP_HisPrtStr(His业务表指针)
			2、新增HIS交易信息子表(DHC_BillExtTradeConSub)

###二、POS银行卡退费

	1、退费前先调pos签到接口判断pos机是否联机
		var PosExpStr=session['LOGON.USERID'];
		var CheckPos=PosOtherService("Q",PosExpStr)

	2、第三方退费接口
			var ExpStr = session['LOGON.CTLOCID'] + "^" + session['LOGON.GROUPID'] + "^" + session['LOGON.HOSPID'] + "^" + session['LOGON.USERID']+ "^" +StrikeRowID;
			var OrgETPRowID =tkMakeServerCall("DHCBILL.Common.DHCBILLCommon", "GetOrgETPRowIDByPrt",ReceipRowid,"OP");
			var payMode = tkMakeServerCall("DHCBILL.Common.DHCBILLCommon", "GetPayModedrByETPRowID", OrgETPRowID);
			var refundAmt= tkMakeServerCall("DHCBILL.Common.DHCBILLCommon", "GetRefundAmt", "OP",StrikeRowID,myPRTRowID,payMode,"")

			<pos退费入口>
			var refRtn=posPayRefund(ReceipRowid,StrikeRowID,myPRTRowID,"OP",payMode,OrgETPRowID,"OP",refundAmt,ExpStr)   ///DHCBillPayService.js
			<POS退费/退货>		
			var rtnPosPay=BankCardRefund(OrgETPRowID,refundAmt,tradeType,bankTradeType,payMode,expStr);
				POS退费流程：
					1、生成退费订单：w ##class(DHCBILL.MisPos.BLL.MisPosLogic).CreateRefOrder()
						1.1、在HIS交易信息表(DHC_BillExtTradePay)中插入数据
						1.2、生成HIS端交易号、更新HIS交易信息表中的ETP_HISTradeID字段

					2、保存子表信息及关联业务表：w ##class(DHCBILL.Common.DHCBILLCommon).RelationOrderToHIS()
						2.1、更新HIS交易信息表中的ETP_HisPrtStr(His业务表指针)
						2.2、新增HIS交易信息子表(DHC_BillExtTradeConSub)

					3、根据银行类型组织参数：w ##class(DHCBILL.MisPos.BLL.MisPosLogic).GetMisPosInput(3420)
			
					4、调用接口：var bankData=CallDLLFun(bankInput);

					5、保存银行的交易数据：w ##class(DHCBILL.MisPos.BLL.MisPosLogic).SaveMisPosData()
						5.1、保存POS交易返回原始数据：w ##class(DHCBILL.ScanPay.BLL.DHCBillScanCodePayLogic).SaveLog()
						5.2、根据pos交易返回的数据串更新交易信息表：w ##class(DHCBILL.MisPos.Adapter.HLMisPos).GetOutBankData()



##<font color=red>扫码付</font>

	


##二、共用方法
		DHCBillPayService.js中PayService
		DHCBillPayService.js中posPay
		DHCBillMisPosPay.js中的BankCardPay
	
		生成订单:
			w ##class(DHCBILL.MisPos.BLL.MisPosLogic).CreatePayOrder()
		保存交易日志:
			w ##class(DHCBILL.ScanPay.BLL.DHCBillScanCodePayLogic).SaveLog()
		保存银行的交易数据:
			w ##class(DHCBILL.MisPos.BLL.MisPosLogic).SaveMisPosData()
		pos交易返回的数据串:
			w ##class(DHCBILL.MisPos.Adapter.HLMisPos).GetOutBankData(3087,"")
		保存子表信息关联业务表:
			w ##class(DHCBILL.Common.DHCBILLCommon).RelationOrderToHIS("259","36989||4","PRE")

		保存交易信息
			w ##class(DHCBILL.SelfPay.BLL.DHCBillCommon).SavePayInfo()

		w ##class(DHCBILL.MisPos.BLL.MisPosLogic).SaveMisPosData()
		w ##class(DHCBILL.SelfPay.BLL.DHCBillCommon).SavePayInfo()
		w ##class(DHCBILL.SelfPay.BLL.DHCOPBillPayExp).CompleteCharge()
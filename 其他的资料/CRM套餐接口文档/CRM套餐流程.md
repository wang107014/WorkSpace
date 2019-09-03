#CRM套餐流程

1、门诊划扣：医嘱录入审核时，有套餐的医嘱直接划扣
2、停医嘱调退费接口
3、住院划扣：医嘱录入划扣



##表结构流程

	订单表(Pkg_PatientBill)-->订单明细表(Pkg_PatPackage)-->套餐产品(表)Pkg_Product-->套餐产品明细(Pkg_ProductDetails)



##套餐收费

	dhcbill.pkg.charge.main.csp
	dhcbill/pkg/dhcbill.pkg.charge.main.js
	dhcbill/pkg/dhcbill.pkg.balance.paym.js

	一、待支付订单查询
		do ##class(%ResultSet).RunQuery("DHCBILL.Package.WebUI.PkgPatientBill","FindPkgPatBill", 3, "5", "", 2)
		全额支付列表：查找订单状态,（bill_statuscode)为"待支付"状态(10)时,并且(bill_paymode)为"全额支付"状态(5)时显示
		定金支付列表：查找订单状态,（bill_statuscode)为"待支付"状态(10)时,并且(bill_paymode)为"全额支付"状态(10)时显示

		1、点击结算
			dhcbill/pkg/dhcbill.pkg.charge.main.js中的charge_Click方法中
			dhcbill/pkg/dhcbill.pkg.charge.paym.js中的pkgBillCharge方法中
			1.1、全额支付结算流程
				w ##class(DHCBILL.Package.BusinessLogic.DHCPkgInvPrt).PkgBillCharge()
				1.1.1、查找订单状态,非"待支付"状态(10)时不能结算并且非"定金支付"状态(15)时不能补差额 （-101）
				1.1.2、查找订单表实付金额，订单实付金额与页面传入实付金额不等时不能结算   （-102）
				1.1.3、收费表(发票表)新增一条记录：w ##class(DHCBILL.Package.DataAccess.DHCPkgInvPrt).SaveInvPrt(invInfo)
				1.1.4、收费支付方式表新增一条记录：w ##class(DHCBILL.Package.DataAccess.DHCPkgInvPayMode).SaveInvPayMode(prtRowId, payMInfo) 
				1.1.5、收费帐单关联表新增一条记录：w ##class(DHCBILL.Package.DataAccess.DHCPkgInvConBill).SaveInvConBill(icbInfo)
				1.1.6、修改订单表状态为已支付：w ##class(DHCBILL.Package.DataAccess.DHCPkgPatientBill).UpdateBillStatus()
				1.1.7、如果是补差额，需将定金表dep_usingstatus改为已使用（1）：w ##class(DHCBILL.Package.DataAccess.DHCPkgDeposit).UPDATE()

			1.2、定金支付流程
				w ##class(DHCBILL.Package.BusinessLogic.DHCPkgDeposit).PkgDepositCharge()
				1.2.1、计算票据金额：比较订单定金金额和传入定金金额参数，如果不等则不能结算
				1.2.2、收费表新增一条记录：w ##class(DHCBILL.Package.DataAccess.DHCPkgDeposit).SaveDeposit()
				1.2.3、收费支付方式表新增一条记录：w ##class(DHCBILL.Package.DataAccess.DHCPkgDepositPayMode).SaveDepPayMode()
				1.2.4、定金订单关联表：w ##class(DHCBILL.Package.DataAccess.DHCPkgDepConBill).SaveDepConBill
				1.2.5、修改订单表状态为定金支付(15):w ##class(DHCBILL.Package.DataAccess.DHCPkgPatintBill).UpdateBillStatus

	
	二、补差额(定金列表)
		do ##class(%ResultSet).RunQuery("DHCBILL.Package.WebUI.DHCPkgDeposit","FindPkgDeposit", 3, 2)
		   查找定金表中的(dep_usingstatus)状态等于0或空时显示。

		1.点击操作中的补差额按钮
			dhcbill/pkg/dhcbill.pkg.charge.main.js中的balance_Click方法中
		2、点击弹框中的补差额按钮
			dhcbill/pkg/dhcbill.pkg.balance.paym.js中的pkgDepBalance方法中
			w ##class(DHCBILL.Package.BusinessLogic.DHCPkgInvPrt).PkgBillCharge()
			2.1、补差额流程
				2.1.1、查找订单状态,非"待支付"状态(10)时不能结算并且非"定金支付"状态(15)时不能补差额 （-101）
				2.1.2、查找订单表实付金额，订单实付金额与页面传入实付金额不等时不能结算   （-102）
				2.1.3、收费表(发票表)新增一条记录：w ##class(DHCBILL.Package.DataAccess.DHCPkgInvPrt).SaveInvPrt(invInfo)
				2.1.4、收费支付方式表新增一条记录：w ##class(DHCBILL.Package.DataAccess.DHCPkgInvPayMode).SaveInvPayMode(prtRowId, payMInfo) 
				2.1.5、收费帐单关联表新增一条记录：w ##class(DHCBILL.Package.DataAccess.DHCPkgInvConBill).SaveInvConBill(icbInfo)
				2.1.6、修改订单表状态为已支付：w ##class(DHCBILL.Package.DataAccess.DHCPkgPatientBill).UpdateBillStatus()
				2.1.7、如果是补差额，需将定金表dep_usingstatus改为已使用（1）：w ##class(DHCBILL.Package.DataAccess.DHCPkgDeposit).UPDATE()
			

	三、作废票据
		do ##class(%ResultSet).RunQuery("DHCBILL.Package.WebUI.PkgPatientBill","FindPkgInvList","3","2")
		1、点击作废
			dhcbill/pkg/dhcbill.pkg.charge.main.js中的abort_Click方法中
			w ##class(DHCBILL.Package.BusinessLogic.DHCPkgInvPrt).AbortReceipt("13","A","7524","238^119^2")
		2、作废流程
			2.1、更新原来的票据：把收费表的收费状态由正常(N)修改为作废(A)
				w ##class(DHCBILL.Package.DataAccess.DHCPkgInvPrt).ParkInvPrt(prtRowId,sFlag)
			2.2、生成收费表负记录：冲红原纪录ID为原收费表id,票据金额为负的，收费日期时间为当前日期时间
				w ##class(DHCBILL.Package.DataAccess.DHCPkgInvPrt).CancelInvPrt(prtRowId, sFlag, guserId, hospitalId, myCurDate, myCurTime, receiptNo)
			2.3、保存关联表:新增一条发票与订单关联表数据
				w ##class(DHCBILL.Package.DataAccess.DHCPkgInvConBill).SaveInvConBill(icbInfo)
			2.4、修改订单表状态:把订单状态改为待支付(10)
				w ##class(DHCBILL.Package.DataAccess.DHCPkgPatientBill).UpdateBillStatus(myBillId, status, myCurDate, myCurTime, guserId)
			2.5、如果是补差额，需将定金表dep_usingstatus改为已使用
				w ##class(DHCBILL.Package.DataAccess.DHCPkgDeposit).UPDATE(deprowid)
			2.6、生成负记录的支付方式
				w ##class(DHCBILL.Package.DataAccess.DHCPkgInvPayMode).CancelInvPayMode(prtRowId, strikePrtRowId, ctlocId, guserId, myCurDate, myCurTime)


##套餐退费

	dhcbill.pkg.refOrder.csp		
	dhcbill/pkg/dhcbill.pkg.refOrder.js
	dhcbill/pkg/dhcbill.pkg.refund.paym.js

	一、退费单列表
	d ##class(%ResultSet).RunQuery("DHCBILL.Package.WebUI.DHCPkgRefundBill","FindPkgRefundBill","6","","2")
		1、从退费单表中查询数据,(rb_statuscode)状态不为10(待退费)的quit掉。
		2、(rb_billid)退费订单为空时quit掉
		3、根据退费订单id查找订单支付模式,支付模式只要不为5（全额支付）或10（定金支付）的都要quit掉
	
			1、点击退费单列中的退费按钮
				dhcbill/pkg/dhcbill.pkg.refOrder.js中的refund_Click()
			2、点击退费弹框中的退费按钮
				dhcbill/pkg/dhcbill.pkg.refund.paym.js中pkgBillRefund()
				w ##class(DHCBILL.Package.BusinessLogic.DHCPkgRefundBill).PkgBillRefund()
				2.1、套餐退费流程
					2.1.1、在发票表(BS_Bill.pkg_invprt)中新增一条数据:主要收据状态prt_flag为退费(R)
					2.1.2、在发票支付方式表（BS_Bill.Pkg_InvPayMode）中有几种支付方式则新增几条数据
					2.1.3、在发票与订单关联表(BS_Bill.Pkg_InvConBill)中新增一条记录
					2.1.4、更新订单表(BS_Bill.Pkg_PatientBill)中的订单状态(bill_statuscode)为退费（30）
					2.1.5、更新退费单表(BS_Bill.Pkg_RefundBill)中的退费状态(rb_statuscode)为已完成退费（15）
				

##收费单查询

	dhcbill.pkg.InvPrtList.csp
	dhcbill/pkg/dhcbill.pkg.InvPrtList.js
	do ##class(%ResultSet).RunQuery("DHCBILL.Package.WebUI.DHCPkgInvprt","FindPkgInvPrtList", 3, "5", "", 2)


##订单明细页面

	dhcbill.pkg.orderItmDtl.csp
	dhcbill/pkg/dhcbill.pkg.orderItmDtl.js


##门诊收费明细

	dhcbill.opbill.dailyopbillinvdetails.csp
	dhcbill/dhcopbill/dhcbill.opbill.dailyopbillinvdetails.js
	取结算发票明细列头
	w ##class(web.DHCBillGroupConfig).GetInvDetColumns()
	//门诊收费明细信息
	do ##class(%ResultSet).RunQuery("web.DHCOPBillDailyDetails","FindOPBillInvDetails","","","","","33050", "5", "2")

##收费明细日结报表

	dhccpmrunqianreportprint.csp?reportName=DHCOPBILL-套餐收费明细.raq

	do ##class(%ResultSet).RunQuery("web.DHCOPBillDailyDetails","GetPkgInvPrtDetails","2018-12-06","14:07:54","2018-12-06","17:55:35","","7050","2")



##定金报表

	dhccpmrunqianreportprint.csp?reportName=DHCOPBILL-套餐定金明细.raq

	do ##class(%ResultSet).RunQuery("web.DHCOPBillDailyDetails","GetPkgDeposit","2019-02-22","14:07:54","2019-02-25","17:55:35","","7050","2")



##套餐日结

	dhcbill.pkg.dailyhand.csp
	dhcbill/pkg/dhcbill.pkg.dailyhand.js

	1.点击结算
		dhcbill/pkg/dhcbill.pkg.dailyhand.js中的handin_Click()
		w ##class(DHCBILL.Package.BusinessLogic.DHCPkgDailyHandin).Handin()
			1.1、在套餐日结表新增一条记录：w ##class(DHCBILL.Package.DataAccess.PkgReports).INSERT()
			1.2、更新套餐收费表：更新收费表中的结算标志，结算时间，结算日期，日结表的关联id等字段,收费员只能结算自己的记录。
			1.3、更新定金表：更新定金表中的结算标志，结算时间，结算日期，日结表的关联id，结算人员等字段。

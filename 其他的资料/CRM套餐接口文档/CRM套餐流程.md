#CRM套餐流程

1、门诊划扣：医嘱录入审核时，有套餐的医嘱直接划扣
2、停医嘱调退费接口
3、住院划扣：医嘱录入划扣



##表结构流程

	订单表(Pkg_PatientBill)-->订单明细表(Pkg_PatPackage)-->套餐产品(表)Pkg_Product-->套餐产品明细(Pkg_ProductDetails)



##套餐收费

	dhcbill.pkg.charge.main.csp
	dhcbill/pkg/dhcbill.pkg.charge.main.js
	//待支付订单查询
	do ##class(%ResultSet).RunQuery("DHCBILL.Package.WebUI.DHCPkgDeposit","FindPkgDeposit", 3, 2)


##收费单查询

	dhcbill.pkg.InvPrtList.csp
	dhcbill/pkg/dhcbill.pkg.InvPrtList.js
	do ##class(%ResultSet).RunQuery("DHCBILL.Package.WebUI.DHCPkgInvprt","FindPkgInvPrtList", "2019-02-21","2019-02-22","33","","2")



##订单明细

	dhcbill.pkg.orderItmDtl.csp
	dhcbill/pkg/dhcbill.pkg.orderItmDtl.js


##门诊收费明细

	dhcbill.opbill.dailyopbillinvdetails.csp
	dhcbill/dhcopbill/dhcbill.opbill.dailyopbillinvdetails.js
	取结算发票明细列头
	w ##class(web.DHCBillGroupConfig).GetInvDetColumns()
	//门诊收费明细信息
	do ##class(%ResultSet).RunQuery("web.DHCOPBillDailyDetails","FindOPBillInvDetails","","","","","33050", "5", "2")

##套餐收费日结报表

	dhccpmrunqianreportprint.csp?reportName=DHCOPBILL-套餐收费明细.raq

	do ##class(%ResultSet).RunQuery("web.DHCOPBillDailyDetails","GetPkgInvPrtDetails","2018-12-06","14:07:54","2018-12-06","17:55:35","","7050","2")

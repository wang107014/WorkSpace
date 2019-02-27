#CRM套餐接口

##(BOE0152)订单信息推送  --收费结束后向CRM发送收费信息

	1、触发点
	web.DHCBillCons12.cls中的CompleteCharge方法中

	2、推送接口入口
	d ##class(DHCBillCRMPay.OPBillPay).SendChargeInfoToCRM(PrtRowID,Guser)

	3、S00000083对应BOE0152传给平台的方法
	web.DHCENS.STBLL.CRM.METHOD.SendDataToCRM.cls中的SendPayInfo方法中

	4、收费结算后根据发票ID获取结算信息推送给CRM
	w ##class(DHCBillCRMPay.OPBillPay).SendOPBillChargeInfoToCRMNew(375582)







##CRM订单信息推送给HIS

	 w ##class(DHCBILL.Package.DataInteface.DHCPkgPatintBill).ReceivePatintBillFromCRM()
	


##CRM退费订单信息推送给HIS

	w ##class(DHCBILL.Package.DataInteface.DHCPkgRefundBill).ReceivePkgRefundBillFromCRM("")
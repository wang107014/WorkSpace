#POS对账相关

##第三方对账平台

	dhcbill.reconciliations.csp
	dhcbill/dhcbill.reconciliations.js

###对账结果
	dhcbill.recondetails.csp
	dhcbill/dhcbill.recondetails.js
	do ##class(%ResultSet).RunQuery("web.DHCBillReconciliations","JudgeTradePay"）

    一、平账
	1、根据时间循环HIS交易表，找出订单号
	2、排除支付不成功的订单
	3、排除银行卡外的其他支付渠道
	4、排除订单号为空的订单
	5、因为一个订单号可以有多条退费订单记录(订单号都相同)，因此根据订单号循环HIS交易表,获取HIS交易表中该订单号的退费总金额。
	6、根据订单号循环第三方交易明细表的记录,找出交易类型(扣款和退款),和HIS交易表中该订单号的类型比较,不是同一类型的去掉,记录该订单号交易类型的金额总和。
	7、根据交易类型和两个交易表之前的获取总金额比较，该交易类型下总金额不相等的直接去掉。
	8、剩余的就是平账的记录。

###第三方交易明细

	dhcbill.banktradedetails.csp
	dhcbill/dhcbill.banktradedetails.js
	do ##class(%ResultSet).RunQuery("web.DHCBillReconciliations","FindBankTradeDetails")

###HIS业务明细

	dhcbill.histradedetails.csp
	dhcbill/dhcbill.histradedetails.js
	do ##class(%ResultSet).RunQuery("web.DHCBillReconciliations","FindHISTradeDetail")

###HIS交易明细

	dhcbill.hisbanktradedetails.csp
	dhcbill/dhcbill.hisbanktradedetails.js
	do ##class(%ResultSet).RunQuery("web.DHCBillReconciliations","FindHISBankTradeDetail")





##在HIS交易表中操作流程

	

	//保存银行的交易数据
	w ##class(DHCBILL.MisPos.BLL.MisPosLogic).SaveMisPosData

	//保存交易信息
	w ##class(DHCBILL.SelfPay.BLL.DHCBillCommon).SavePayInfo()

	//红鲤pos   自助机传入
	w ##class(DHCBILL.MisPos.Adapter.HLMisPos).GetOutBankDataForZZJ(ETPRowID,BankData)

	//保存POS交易返回原始数据
	w ##class(DHCBILL.MisPos.BLL.MisPosLogic).SaveLog()

	//更新交易流水表
	w ##class(DHCBILL.MisPos.BLL.MisPosLogic).UpdateExtTradePay()


	
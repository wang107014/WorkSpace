#CRMSQL

#收费管理
##收费单

	SELECT * FROM BS_Bill.Pkg_InvPrt

##收费单支付明细

	SELECT * FROM BS_Bill.Pkg_InvPayMode


##发票与订单关联表

	SELECT * FROM BS_Bill.Pkg_InvConBill

##定金表

	SELECT * FROM BS_Bill.Pkg_Deposit

##定金支付方式表

	SELECT * FROM BS_Bill.Pkg_DepositPayMode

##定金订单关联表

	SELECT * FROM BS_Bill.Pkg_DepConBill



#订单管理

##订单表
	SELECT * FROM BS_Bill.Pkg_PatientBill


##客户套餐(订单明细)

	SELECT * FROM BS_Bill.Pkg_PatPackage

##订单优惠政策表

	SELECT * FROM BS_Bill.Pkg_BillDiscount

##套餐医嘱项明细

	SELECT * FROM BS_Bill.Pkg_OrderDetails


##划扣单

	SELECT * FROM BS_Bill.Pkg_DeductBill

##退费单

	SELECT * FROM BS_Bill.Pkg_RefundBill

##退费单明细

	SELECT * FROM BS_Bill.Pkg_RefundBillDetail




##订单套餐关联表

	//订单表
	SELECT * FROM BS_Bill.Pkg_PatientBill
	
	//订单明细表关联套餐产品表
	SELECT * FROM BS_Bill.Pkg_PatPackage
	
	//订单优惠政策表
	SELECT * FROM BS_Bill.Pkg_BillDiscount
	
	//套餐产品表
	SELECT * FROM BS_Bill.Pkg_Product
	
	
	//套餐产品明细表
	SELECT * FROM BS_Bill.Pkg_ProductDetails
	
	//套餐医嘱项明细(订单明细表的子表)
	SELECT * FROM BS_Bill.Pkg_OrderDetails
	
	////套餐产品明细关联医嘱表
	SELECT * FROM arc_itmmast
	
	//套餐加项
	SELECT * FROM BS_Bill.Pkg_AdditionalPackage

#收费SQL


##预交金
	//账户管理(预缴金统一管理)
	SELECT * FROM DHC_AccManager WHERE AccM_PAPMINo='020000000001'
	
	//预交金表
	SELECT * FROM DHC_AccPreDeposit WHERE AccPD_ParRef='43915'

	//预交金表
	SELECT * FROM DHC_AccPreDeposit WHERE AccPD_User_DR="7582" AND AccPD_PreDate='2019-1-11'
	
	SELECT * FROM DHC_BillExtTradeConSub WHERE ETC_HISPRT_DR IN ('45047||3')

	//支付订单表
	SELECT * FROM DHC_BillExtTradePay WHERE ETP_RowID=3042



##根据登记号查找病人医嘱

	//病人基本信息表
	SELECT * FROM PA_PatMas WHERE PAPMI_No='101100000657'
	
	//病人就诊信息表
	SELECT * FROM PA_Adm WHERE (PAADM_PAPMI_DR=536 AND PAADM_Type="I") 
	
	//医嘱表
	SELECT * FROM OE_Order WHERE OEORD_Adm_DR=935
	
	//医嘱表
	SELECT OEORI_ItmMast_DR->ARCIM_Desc,* FROM OE_OrdItem WHERE OEORI_OEORD_ParRef=877
	
	//医嘱项表
	SELECT * FROM ARC_ItmMast WHERE ARCIM_RowId IN ('2108||1')
	
	//医嘱执行表
	SELECT OEORE_OEORI_ParRef->OEORI_ItmMast_DR->ARCIM_Desc,* FROM OE_OrdExec WHERE OEORE_OEORI_ParRef IN ('877||1','877||2','877||3')
	
	//医嘱执行扩展表
	SELECT * FROM OE_OrdExecExt WHERE OEORE_OEORI_ParRef IN ('763||1','763||2')

##找检查医嘱部位

	//病人基本信息表
	SELECT * FROM PA_PatMas WHERE PAPMI_No='020000000092'
	
	//病人就诊信息表
	SELECT * FROM PA_Adm WHERE (PAADM_PAPMI_DR=94) 
	
	//医嘱表
	SELECT * FROM OE_Order WHERE OEORD_Adm_DR=2304
	
	//医嘱表
	SELECT OEORI_ItmMast_DR->ARCIM_Desc,* FROM OE_OrdItem WHERE OEORI_OEORD_ParRef=2167
	
	SELECT * FROM DHC_AppRepArc WHERE AR_OrdItem='2167||2'  --2038
	
	SELECT * FROM DHC_AppRepPart WHERE AR_ParRef_Dr='2038||1'
	
	//检查部位
	SELECT * FROM DHC_AppPart WHERE AP_RowId=390

##获取医嘱费用

	//病人基本信息表
	SELECT * FROM PA_PatMas WHERE PAPMI_No='020000000092'
	
	//病人就诊信息表
	SELECT * FROM PA_Adm WHERE (PAADM_PAPMI_DR=94) 
	
	//医嘱表
	SELECT * FROM OE_Order WHERE OEORD_Adm_DR=2323
	
	//医嘱表
	SELECT OEORI_ItmMast_DR->ARCIM_Desc,* FROM OE_OrdItem WHERE OEORI_OEORD_ParRef=2178
	
		//医嘱项表
	SELECT * FROM ARC_ItmMast WHERE ARCIM_RowId IN ('18757||1')
	
	//医嘱执行表
	SELECT OEORE_OEORI_ParRef->OEORI_ItmMast_DR->ARCIM_Desc,* FROM OE_OrdExec WHERE OEORE_OEORI_ParRef IN ('2178||17')
	
	
	//医嘱状态
	SELECT * FROM OEC_OrderStatus 

	//票据连接表
	SELECT * FROM DHC_BillConINV WHERE DHCBCI_INVDR=381829 --'429041'
   
	//账单主表
	SELECT * FROM DHC_PatientBill WHERE PB_RowId='429041'
   
	//病人医嘱费用明细表
	SELECT * FROM DHC_PatBillOrder  WHERE PBO_PB_ParRef =429041
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




##优惠劵

	SELECT * FROM DHC_INVPRT WHERE PRT_Rowid=382911

	SELECT * FROM DHC_INVPayMode WHERE IPM_PRT_ParRef=382911

	//CRM支付方式关联
	SELECT * FROM DHC_CRMPayCONPRT WHERE CPC_PayMode_DR='382911||2'




##第三方平台对账

	//His交易明细表
	SELECT * FROM DHC_BillExtTradePay WHERE ETP_PayMode=4

	//第三方交易明细表
	SELECT * FROM DHC_BillExtTradeBalance WHERE ETB_OutTradeNo='185357215410'




##基本信息表

	//挂号表
	SELECT * FROM DHCRegistrationFee WHERE RegfeeName="陆民飞"
	
	//医护人员表
	SELECT  * FROM CT_CareProv WHERE CTPCP_RowId1=665
	//科室表
	SELECT * FROM CT_Loc WHERE CTLOC_RowID=22
	
	//就诊表
	SELECT * FROM PA_Adm WHERE PAADM_RowID=4083

	SELECT sum(PRT_PatientShare), * FROM DHC_INVPRT WHERE PRT_Date="2019-1-30"
	
	//账户管理(预缴金统一管理)
	SELECT * FROM DHC_AccManager WHERE AccM_PAPMINo='020000000116'
		
	//预交金表
	SELECT * FROM DHC_AccPreDeposit WHERE AccPD_ParRef='44030' AND AccPD_PreDate='2019-1-30'
	
	//预交金表
	SELECT * FROM DHC_AccPreDeposit WHERE AccPD_User_DR="7582" AND AccPD_PreDate='2019-1-11'



##基础数据表
	//收费项目子分类
	SELECT * FROM DHC_TarSubCate  
	
	//收费项目分类
	SELECT * FROM DHC_TarCate
	
	//收费项目住院子分类
	SELECT * FROM DHC_TarInpatCate 
	
	//收费项目住院分类 
	SELECT * FROM DHC_TarIC 
	
	//收费项目门诊子分类
	SELECT * FROM DHC_TarOutpatCate
	
	//收费项目门诊分类
	SELECT * FROM DHC_TarOC
	
	//收费项目核算子分类
	SELECT * FROM DHC_TarEMCCate
	
	//收费项目核算分类
	SELECT * FROM DHC_TarEC
	
	//收费项目病历首页子分类
	SELECT * FROM DHC_TarMRCate
	
	//收费项目病历首页分类
	SELECT * FROM DHC_TarMC
	
	//收费项目会计子分类
	SELECT * FROM DHC_TarAcctCate
	
	//收费项目会计分类
	SELECT * FROM DHC_TarAC
	
	//医嘱计费点设定
	SELECT * FROM DHC_BillCondition
	
	//病人收费类别
	SELECT * FROM PAC_AdmReason
	
	//病人就诊类别
	SELECT * FROM PAC_EpisodeSubType
	
	//病人类别与标准价格
	SELECT * FROM DHC_TarEpisode
	
	//费用项目表
	SELECT * FROM DHC_TarItem
	
	//费用项目价格表
	SELECT * FROM DHC_TarItemPrice
	
	//医嘱与收费项目关联表
	SELECT * FROM DHC_OrderLinkTar
	
	//费用项目别名表
	SELECT * FROM DHC_TarItemAlias
	
	//病人折扣,记账系数表
	SELECT * FROM DHC_TarFactor
	
	
	//退押金原因DHC_ jfyjrefreason
	SELECT * FROM dhc_jfyjrefreason
	
	
	//病人基本信息表 PA_Person
	SELECT * FROM PA_Person
	
	
	//病人基本信息表 PA_patmas
	SELECT * FROM PA_PatMas
	
	
	//病人就诊信息表 PA_Adm
	SELECT * FROM PA_Adm
	
	//收费项目扩展表DHC_TarItemExpInfo
	SELECT * FROM DHC_TaritemExpInfo
	
	//收费项目更新记录表DHCTaritemUpdInfo
	SELECT * FROM DHCTaritemUpdInfo
	
	//收项目更新记录配置表DHC_TaritemFieldConfig
	SELECT * FROM DHC_TaritemFieldConfig


##门诊收费表


	//收据信息主表Dhc_invprt
	SELECT * FROM DHC_INVPRT
	
	//票据账单连接表：DHC_BillConINV
	SELECT * FROM DHC_BillConINV
	
	//支付方式表 DHC_INVPayMode
	SELECT * FROM DHC_INVPayMode
	
	//发票表的支付方式表：AR_RcptPayMode
	SELECT * FROM AR_RcptPayMode
	
	//票据结算表：DHC_INVPRTReports 
	SELECT * FROM DHC_INVPRTReports
	
	
	//票据结算子表：DHC_INVPRTReportsSub 
	SELECT * FROM DHC_INVPRTReportsSub
	
	//门诊收费组长结算表DHCOPReceipt
	SELECT * FROM DHCOPReceipt
	
	//门诊退费数量 DHC_OERefundQTY
	SELECT * FROM DHC_OERefundQty
	
	
	//帐单的费别表：PAC_ADMReason  
	SELECT * FROM PAC_AdmReason
	
	
	//门诊收费结算数据统一配置：DHC_SOPFConfig 
	SELECT * FROM DHC_SOPFConfig
	
	//详细数据配置表DHC_OPGroupSettings
	SELECT * FROM DHC_OPGroupSettings
	
	//定义一个接收科室的子表：DHC_OPGSRecLoc
	SELECT * FROM DHC_OPGSRecLoc
	
	//定义患者的支付方式表：DHC_OPGSPayMode
	SELECT * FROM DHC_OPGSPayMode
	
	
	//需要审批的收费类别设置
	SELECT * FROM DHC_OPApproved
	
	//需要审批的条件设置
	SELECT * FROM DHC_OPAppCon
##卡消费表

	//账户管理(预缴金统一管理)：DHC_AccManager
	SELECT * FROM DHC_AccManager
	
	//预缴金流水账：DHC_AccPreDeposit
	SELECT * FROM DHC_AccPreDeposit
	
	//帐户预交金的支付方式表：DHC_AccPrePayMode
	SELECT * FROM DHC_AccPrePayMode
	
	//卡支付流水帐：DHC_AccPayList
	SELECT * FROM DHC_AccPayList
	
	//卡支付与预缴金 结算 流水帐对帐：DHC_AccPFoot
	SELECT * FROM DHC_AccPFoot
	
	//卡支付流水帐结算子表：DHC_AccPFootSub
	SELECT * FROM DHC_AccPFootSub
	
	//预缴金结算日报：DHC_AccPDFootLog 
	SELECT * FROM DHC_AccPDFootLog
	
	//账户更改日志：DHC_AccStatusChange
	SELECT * FROM DHC_AccStatusChange
	
	//卡类型定义：DHC_CardTypeDef
	SELECT * FROM DHC_CardTypeDef
	
	//卡表 DHC_CardRef
	SELECT * FROM DHC_CardRef
	
	//卡的状态变化表：DHC_CardStatusChange
	SELECT * FROM DHC_CardStatusChange
	
	//证件类型：DHC_CredType
	SELECT * FROM dhc_credtype
	
	
	//综合打印发票（小票换发票）  此表作用只是为了核销票据
	SELECT * FROM DHC_AccPayINV
	
	//集中打印发票支付方式表
	SELECT * FROM DHC_AccPayINVMode
	
	//集中打印发票表与支付表的关联表
	SELECT * FROM DHC_AccPINVCONPRT 
	
	//集体账户与患者信息关联表 /个人帐户
	SELECT * FROM DHC_AccMConGroup
	
	//银医卡
	SELECT * FROM DHC_INVBankBalance

##医生站表

	//病人表 PA_PatMas 
	SELECT * FROM PA_PatMas
	
	
	//就诊表 PA_Adm 
	SELECT * FROM PA_Adm
	
	//就诊病历表 MR_Adm
	SELECT * FROM MR_Adm
	
	//就诊诊断表MR_Diagnos
	SELECT * FROM MR_Diagnos
	
	//医保诊断表 INSU_Diagnos
	SELECT * FROM INSU_Diagnosis
	
	//症状表 MRC_DiagnosSignSymptom
	SELECT * FROM MRC_DiagnosSignSymptom
	
	//队列表 DHCQueue 
	SELECT * FROM DHCQueue
	
	
	//科室表 CT_Loc
	SELECT * FROM CT_Loc
	
	//医嘱表 OE_Order,OE_OrdItem 
	SELECT * FROM OE_Order
	SELECT * FROM OE_OrdItem
	
	//医嘱扩展表 DHC_OE_OrdItem 
	SELECT * FROM DHC_OE_OrdItem
	
	//医嘱别名表 ARC_Alias
	SELECT * FROM ARC_Alias
	
	//医嘱适应症 DHC_OE_OrdItemDSYM 
	SELECT * FROM DHC_OE_OrdItemDSYM
	
	//库存医嘱发放记录(发药)表 DHC_OEDispensing
	SELECT * FROM DHC_OEDispensing
	
	//用药权限设置表DHC_ArcItemAut
	SELECT * FROM DHC_ArcItemAut
	
	//医嘱套权限控制表 DHC_UserFavItems
	SELECT * FROM DHC_UserFavItems
	
	//处方表 PA_QUE1
	SELECT * FROM PA_Que1
	
	
	//医嘱子类ARC_ItemCat 
	SELECT * FROM ARC_ItemCat
	
	//医嘱大类oec_ordercategory
	SELECT * FROM OEC_OrderCategory
	
	//医嘱项ARC_ItmMast
	SELECT * FROM ARC_ItmMast
	
	//药学项PHC_DrgForm
	SELECT * FROM PHC_DrgForm
	
	//医护人员级别药品管制分类对照DHC_CarPrvTpPHPoison
	SELECT * FROM DHC_CarPrvTpPHPoison
	
	//费别医保医疗类别对照DHC_BillTypeEPType
	SELECT * FROM DHC_BillTypeInsurEPType
	
	//医护人员 CT_CareProv
	SELECT * FROM CT_CareProv
	
	//科室 CT_Loc
	SELECT * FROM CT_Loc
	
	//科室医护人员归属RB_Resource
	SELECT * FROM RB_Resource

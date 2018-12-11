1、根据rowid从表中查出数据存放到PLIST()数组中
	
	查询插入
	&sql(SELECT * INTO PLIST() FROM DHC_OPGroupSettings WHERE GS_RowID= :RowId) 
	
	修改字段
	&sql(update pa_person set paper_ExemptionNumber=:InPatNo where paper_rowid=:PAPMiID)

2、发票详细数据配置表

	SELECT * FROM DHC_OPGroupSettings    

3、医嘱诊断

	//病人诊断
	SELECT MRDIA_ICDCode_DR->MRCID_Desc, * FROM MR_Diagnos WHERE MRDIA_MRADM_ParRef="81"
	//诊断描述
	SELECT * FROM MRC_ICDDX
	SELECT * FROM MR_DiagType
	SELECT TYP_MRCDiagTyp->DTYP_Desc,* FROM MR_DiagType WHERE TYP_ParRef['81'
	//诊断类别
	SELECT * FROM MRC_DiagnosType

4、卡查询

	SELECT * FROM dhc_amtmag
	SELECT * FROM DHC_OPGroupSettings  WHERE GS_RowID="173"
	SELECT * FROM dhc_invoice 
	SELECT * FROM DHC_CardRef WHERE CF_CardNo="101100000080"
	SELECT * FROM PA_PatMas WHERE PAPMI_RowId1="189"

5、退号

	SELECT * FROM DHCRegistrationFee WHERE ID="387"
	//分诊标志
	SELECT * FROM DHCPerState
	//
	SELECT * FROM DHCQueue WHERE QuePaadmDr="760"
	SELECT * FROM PA_AdmExt 
	//就诊表
	SELECT * FROM PA_Adm WHERE PAADM_RowID="760"

	//挂号表
	SELECT * FROM DHCRegistrationFee

	//排班记录表
	SELECT * FROM RB_ApptSchedule WHERE AS_RowId='221||71'
	
	//排班记录扩展表
	SELECT * FROM DHC_RBApptSchedule WHERE AS_RowId='252||22'


#收费
##住院收费

	住院收费账单主表
	SELECT * FROM DHC_PatientBill WHERE PB_Adm_Dr="565"

	//账单主表
	SELECT * FROM dhc_patientbill

	//病人医嘱费用明细表
	SELECT  * FROM dhc_patbillorder WHERE PBO_PB_ParRef="266326"

	//医嘱项指针
	SELECT * FROM ARC_ItmMast	

	//病人就诊信息表
	SELECT * FROM PA_ADM	

	//病人表
	SELECT * FROM PA_PatMas	

	//病人医嘱指针
	SELECT OEORI_ItmMast_DR->ARCIM_Desc,* FROM OE_OrdItem	

	//账单收费项目明细表
	SELECT * FROM dhc_patbilldetails	

	//住院发票表
	SELECT PRT_Adm->PAADM_PAPMI_DR->PAPMI_Name, * FROM dhc_invprtzy

	//就诊表
	SELECT PAADM_PAPMI_DR->PAPMI_Name, * FROM pa_adm

	//病人表
	SELECT * FROM PA_Patmas

##根据登记号查找病人账单 

	//根据登记号查找病人表中的PAPMI_RowId1=478
	SELECT * FROM PA_PatMas	WHERE PAPMI_No="101100000436"
	
	//根据病人表中的PAPMI_RowId1查找病人就诊信息表中的PAADM_RowID=975
	SELECT * FROM PA_ADM WHERE PAADM_PAPMI_DR="478"
	
	//根据病人就诊信息表中的PAADM_RowID查找住院收费账单主表的PB_RowId=267763
	SELECT * FROM DHC_PatientBill WHERE PB_Adm_Dr="975"
	
	//根据账单主表的PB_RowId查找病人医嘱费用明细表
	SELECT  * FROM dhc_patbillorder WHERE PBO_PB_ParRef="267763"

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



##根据就诊id查诊断

	//就诊表
	SELECT * FROM PA_Adm WHERE PAADM_RowID="1"
	
	/就诊病历表
	SELECT * FROM MR_Adm WHERE MRADM_ADM_DR='1'
	
	//就诊诊断表
	SELECT * FROM MR_Diagnos WHERE MRDIA_MRADM_ParRef='1'
	
	//诊断表
	SELECT * FROM MRC_ICDDx WHERE MRCID_RowId='16462'

##收费日结
	//收费员日报结算表
	SELECT * FROM dhc_jfuserjk

##住院担保
	住院担保
	SELECT * FROM dhc_warrant


#门诊收费结算

	//病人表
	SELECT * FROM PA_PatMas WHERE PAPMI_No='101100000657'
	
	//收据信息主表
	SELECT * FROM DHC_INVPRT WHERE PRT_PAPMI_DR='701'
	
	//收费业务表
	SELECT * FROM ar_receipts WHERE ARRCP_RowId="1967"


	/判断医嘱是否结算成功
	//医嘱结算状态，结算成功为P，已账单但未结算为B，未账单为TB
	SELECT OEORI_Billed, * FROM OE_OrdItem WHERE OEORI_OEORD_ParRef='149519'
	
	SELECT * FROM oe_order WHERE OEORD_RowId1='149519'
	
	SELECT PAADM_VisitStatus, * FROM PA_Adm WHERE PAADM_RowID='160856'
	
	SELECT * FROM PA_Person WHERE PAPER_RowId='3238'
	
	
	//账单主表：根据就诊id查找账单记录
	SELECT * FROM DHC_PatientBill WHERE PB_Adm_Dr='160856'
	
	//账单医嘱表：根据账单主表的Rowid查找账单医嘱详细信息
	SELECT * FROM DHC_PatBillOrder WHERE PBO_PB_ParRef='420907'
	
	//账单明细表：根据账单医嘱的Rowid查找账单明细
	SELECT * FROM DHC_PatBillDetails WHERE PBD_PBO_ParRef='420908||1'
	
	//医嘱项表：根据账单医嘱表查找医嘱项表的详细医嘱
	SELECT * FROM ARC_ItmMast WHERE ARCIM_RowId='19352||1'


	//发票表
	SELECT * FROM DHC_INVPRT WHERE PRT_Rowid=380327
	
	//支付方式表
	SELECT * FROM DHC_INVPayMode WHERE IPM_PRT_ParRef=380327
	
	//票据账单连接表
	SELECT * FROM DHC_BillConINV WHERE DHCBCI_INVDR=380327
	
	//账单主表
	SELECT * FROM DHC_PatientBill WHERE PB_RowId='426300'


#门诊日报结算流程


	//门诊报表结算表(票据结算表)
	SELECT * FROM DHC_INVPRTReports
	
	//门诊子类及会计子类
	SELECT * FROM DHC_INVPRTReportsSub
	
	//支付方式子表
	SELECT * FROM DHC_INVPRTReportsPaymode

	//支付方式表
	SELECT * FROM CT_PayMode	

	//病人费别对应的支付方式
	SELECT * FROM DHC_INVPRTReportsInsType
	
	//门诊收据信息主表
	SELECT * FROM Dhc_invprt
	
	//综合打印发票
	SELECT * FROM DHC_AccPayINV
	
	//预交金表
	SELECT * FROM DHC_AccPreDeposit
	
	//卡支付与预交金结算流水帐对帐表
	SELECT * FROM DHC_AccPFoot
	
	//账户结算表
	SELECT * FROM DHC_AccFootInfo
	
	//卡发票表
	SELECT * FROM DHC_CardINVPRT
	
	//作废发票表
	SELECT * FROM DHC_VoidInv

	//接口交易信息表
	SELECT * FROM DHC_BillExtTradePay


###多表查询

	SELECT sum(b.IPM_Amt),* FROM DHC_INVPRT a, DHC_INVPayMode b WHERE a.PRT_Rowid=b.IPM_PRT_ParRef AND a.PRT_Rowid=376472




###门诊收费类别

	SELECT * FROM DHC_TarAC

###住院收费类别

	SELECT * FROM DHC_TarOC


###订单表
	SELECT * FROM DHC_BillExtTradePay
	SELECT * FROM DHC_BillExtTradeConSub


##根据条件获取最新一条记录

	&sql(SELECT TOP 1 %id into :myRowID FROM Dhc_invprt WHERE PRT_PAPMI_DR= :PAPMI ORDER BY PRT_Rowid DESC)


###扫码支付

	SELECT * FROM DHC_BillExtTradePay
	SELECT * FROM DHC_BillExtTradeConSub
	SELECT * FROM DHC_INVPRT WHERE PRT_PAPMI_DR=3418 
	//预交金明细表
	SELECT * FROM dhc_sfprintdetail



##科室楼层

	SELECT CTLOC_Floor,* FROM CT_Loc WHERE CTLOC_Floor='门诊三楼'


##医嘱表信息

	SELECT ARCIM_Text1,* FROM ARC_ItmMast WHERE ARCIM_Desc='凝血四项'


##通过登记号找到急诊病人的当前的分级

	SELECT * FROM PA_PatMas WHERE PAPMI_No='020000000411'

	SELECT PAADM_Priority_DR, * FROM PA_Adm WHERE PAADM_PAPMI_DR='1' AND PAADM_Type='E'

	//急诊分级表
	SELECT * FROM CT_Acuity WHERE CTACU_RowId=3



##根据登记号找病人医嘱和账单

	//根据登记号找裴钱
	SELECT * FROM PA_PatMas WHERE PAPMI_No='020000000411'
	
	//裴钱下诊断找就诊号
	SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR='1'
	
	//裴钱所下医嘱收费收据
	SELECT * FROM Dhc_invprt WHERE PRT_PAPMI_DR='1'
	
	//裴钱所下医嘱费用明细表
	SELECT * FROM DHC_PatientBill WHERE PB_Adm_Dr='201'
	
	//账单收费项目明细表
	SELECT * FROM dhc_patbilldetails WHERE PBD_PBO_ParRef='423005||1'
	
	//收费项目名称
	SELECT * FROM DHC_TarItem WHERE TARI_RowId='18659'
	
	//根据裴钱所下的就诊号找医嘱id
	SELECT * FROM oe_order WHERE OEORD_Adm_DR='201'
	
	//根据医嘱id找医生下的具体医嘱(处方号)
	SELECT OEORI_PrescNo, * FROM OE_OrdItem WHERE OEORI_OEORD_ParRef='197'
	
	//根据医嘱名称id找具体的医嘱名称
	SELECT * FROM ARC_ItmMast WHERE ARCIM_RowId='19095||1'


##门诊药房

	//处方审核/门诊拒绝发药子表
	SELECT * FROM DHC_PHAORDMONITOR 
	
	//处方审核/门诊拒绝发药子表
	SELECT * FROM DHC_PHAORDMONITORLIST 

	//处方审核拒绝表
	SELECT * FROM DHC_PHCNTSREASON WHERE PCR_RowID IN (237,238,241,246)

	//门诊配/发药主表
	SELECT PHD_PYFLAG,phd_pattype, * FROM DHC_PHDISPEN
	
	//门诊配/发药子表
	SELECT PHDI_OEORI_DR, * FROM DHC_PHDISITEM

	//门诊配/发药孙表
	SELECT * FROM DHC_PHDISITMCLB	

	//门诊退药申请主表
	SELECT PHReq_RetFlag, * FROM DHC_PHREQUEST
	
	//门诊退药申请子表
	SELECT * FROM DHC_PHREQITEM
	
	//门诊退药记录主表
	SELECT * FROM DHC_PHRETURN
	
	//门诊退药记录子表
	SELECT * FROM DHC_PHRETITM

	//门诊计费药房中间表(PHA_FINFLAG发药标志)
	SELECT PHA_FINFLAG, * FROM DHC_PHARWIN WHERE PHA_ROWID='47'

	//门诊计费药房中间表(PHA_NOUSER:计费组发票作废或退费)
	SELECT PHA_NOUSER, * FROM DHC_PHARWIN WHERE PHA_ROWID='47'

	//门诊发票表
	SELECT * FROM DHC_INVPRT WHERE PRT_Rowid='378245'
	//发药窗口
	SELECT * FROM DHC_PHWINDOW WHERE PHW_ROWID='66'
	
	//药房定义表
	SELECT * FROM DHC_PHLOC WHERE PHL_ROWID='22'
	
	//发票表
	SELECT * FROM DHC_INVPRT WHERE PRT_Rowid='378100'
	
	//病人信息表
	SELECT * FROM PA_PATMAS WHERE PAPMI_RowId1=11


	//根据处方号找医生下的具体医嘱(处方号)
	SELECT OEORI_PrescNo, * FROM OE_OrdItem WHERE OEORI_PrescNo='O181025000001'

	//医嘱表
	SELECT * FROM OE_OrdItem WHERE OEORI_RowId='19||1'
	
	//医嘱名称表
	SELECT * FROM ARC_ItmMast WHERE ARCIM_RowId='19356||1'



##取科室信息

	SELECT PCL_Loc_Dr, * FROM DHC_EmPatCheckLev
	SELECT * FROM CT_Loc WHERE CTLOC_RowID=37




##找病人就诊信息
	//病人表
	SELECT * FROM PA_PatMas WHERE PAPMI_RowId1 IN (5,1,16,73)
	
	//就诊表:就诊完成标识
	SELECT PAADM_Completed, * FROM PA_Adm WHERE  PAADM_RowID IN (275,276,277,278)
	
	//队列表:排队状态
	SELECT QueStateDr->PersName,QueFirstDr->FirstcName, * FROM DHCQueue WHERE QuePaadmDr IN (275,276,277,278)
	
	//就诊病历表
	SELECT MRADM_ADM_DR, * FROM MR_Adm WHERE MRADM_ADM_DR IN (275,276,277,278)
	
	//就诊诊断表
	SELECT MRDIA_MRADM_Parref,MRDIA_ICDCode_DR, * FROM MR_Diagnos WHERE MRDIA_MRADM_ParRef IN (275,276,277,278)
	
	//诊断表
	SELECT * FROM MRC_ICDDX WHERE MRCID_RowId IN (24983,16462,25320)


#体检

##体检信息

	//个人基本信息表
	SELECT PIBI_RowId, * FROM DHC_PE_PreIBaseInfo WHERE PIBI_PAPMINo='020000000039'
	
	//个人ADM表
	SELECT PIADM_RowId, * FROM DHC_PE_PreIADM WHERE PIADM_PIBI_DR='9782'
	
	//个人项目表
	SELECT PIOI_OrdEnt_DR,PIOI_ItmMast_DR, * FROM DHC_PE_PreIOrdItem WHERE PIOI_ParRef='11805'
	
	//关联医嘱套
	SELECT PIOE_OrderSets_DR, * FROM DHC_PE_PreIOrdEnt WHERE PIOE_RowId='11805||1'
	
	//个人项目套餐表
	SELECT * FROM ARC_OrdSets WHERE ARCOS_RowId1='24980'
	
	//医嘱表
	SELECT * FROM ARC_ItmMast WHERE ARCIM_RowId IN ('17224||1','17222||1','17227||1','20454||1','20460||1')
	
	//团体分组项目表
	SELECT * FROM dhc_pe_preGTOrdItem

	//团体客户ADM表
	SELECT * FROM DHC_PE_PreGADM

	//团体和个人ADM审核表
	SELECT * FROM DHC_PE_PreAudit

	//团体分组表
	SELECT * FROM DHC_PE_PreGTeam
#体检SQL
##体检信息

	//个人基本信息表
	SELECT PIBI_RowId, * FROM DHC_PE_PreIBaseInfo WHERE PIBI_PAPMINo='020000000039'
	
	//个人ADM表
	SELECT PIADM_RowId, * FROM DHC_PE_PreIADM WHERE PIADM_PIBI_DR='9782'
	
	//个人项目表
	SELECT PIOI_OrdEnt_DR,PIOI_ItmMast_DR, * FROM DHC_PE_PreIOrdItem WHERE PIOI_ParRef='11805'
	
	//关联医嘱套
	SELECT PIOE_OrderSets_DR, * FROM DHC_PE_PreIOrdEnt WHERE PIOE_RowId='11805||1'
	
	//具体项目
	SELECT * FROM ARC_ItmMast WHERE ARCIM_RowId IN ('20460||1','20454||1','17227||1','17222||1','20502||1')	

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

	SELECT * FROM DHC_PE_PreTimeManager

	//时间段信息表
	SELECT * FROM DHC_PE_HomeTimeInfo

	//医嘱套餐表
	SELECT * FROM ARC_OrdSets


##1、根据登记号判断是否有交费的预约记录

	//根据登记号在个人基本信息表中找Rowid
	SELECT * FROM DHC_PE_PreIBaseInfo WHERE PIBI_PAPMINo='020000000033'
	
	//根据登记号的Rowid在个人ADM表中找rowid
	SELECT * FROM DHC_PE_PreIADM WHERE PIADM_PIBI_DR='10063'

	//体检人员表ADM
	SELECT IADM_GADM_DR,IADM_AsCharged, * FROM DHC_PE_IADM WHERE IADM_CRMADM='12321'	
	1、当字段(IADM_AsCharged)视同收费为N和字段(IADM_GADM_DR)对应团体ADM不为空时,可能会有交费的记录,否则没有。

	//根据个人ADM表中的Rowid在团体和个人ADM审核表这两字段的值
	SELECT PA_ChargedStatus, PA_FactAmount,PA_GIADM, * FROM DHC_PE_PreAudit WHERE PA_CRMADM IN (12321)
	1、根据字段(PA_ChargedStatus)收费状态来判断，CHARGED已收费则没有记录,UNCHARGED未收费会有。
	2、根据字段(PA_FactAmount)最终金额来判断,当值为0时则没有记录



##2

	//个人ADM表
	SELECT * FROM DHC_PE_PreIADM WHERE PIADM_PIBI_DR='10087'
	
	//个人项目套餐表
	SELECT * FROM DHC_PE_PreIOrdEnt WHERE PIOE_ParRef=12279
	
	//套餐表
	SELECT * FROM ARC_OrdSets WHERE ARCOS_RowId1=25084
	
	//关联医嘱套
	SELECT PIOE_OrderSets_DR, * FROM DHC_PE_PreIOrdEnt WHERE PIOE_OrderSets_DR=24980
	
	//个人项目表
	SELECT * FROM DHC_PE_PreIOrdItem WHERE PIOI_ParRef='12344'
	
	//体检项目表
	SELECT * FROM ARC_ItmMast WHERE ARCIM_RowId IN ('20460||1','20454||1','17227||1','17222||1','20502||1')
	

	//团体和个人ADM审核表
	SELECT * FROM DHC_PE_PreAudit WHERE PA_RowId=27242


##3、根据登记号查体检项目

	SELECT PIBI_Name AS 姓名,PIADM_RowId AS 就诊ID,ARCIM_Desc AS 项目名称,PIOI_OrdEnt_DR,PIOI_Type AS 预约或加项
	FROM DHC_PE_PreIBaseInfo a ,DHC_PE_PreIADM b,DHC_PE_PreIOrdItem c,ARC_ItmMast d
	WHERE a.PIBI_RowId=b.PIADM_PIBI_DR   
	AND b.PIADM_RowId=c.PIOI_ParRef
	AND c.PIOI_ItmMast_DR=d.ARCIM_RowId
	AND a.PIBI_PAPMINo='020000000033'


##4、根据发票号获取支付方式和金额

	//体检发票表
	SELECT 	PRT_ARRCP_DR, * FROM DHC_PE_INVPRT WHERE PRT_INVNO='DHCSSP831'
	
	//收费业务支付方式表
	SELECT 	PAYM_PayMode_DR, * FROM AR_RcptPayMode WHERE PAYM_ParRef=744
	
	//支付方式描述表
	SELECT * FROM CT_PayMode

	SELECT CTPM_Desc AS 支付方式, PAYM_Amt AS 金额 FROM DHC_PE_INVPRT Inv,AR_RcptPayMode Arpm,CT_PayMode Ctpm
	WHERE Inv.PRT_ARRCP_DR = Arpm.PAYM_ParRef
	AND Arpm.PAYM_PayMode_DR= Ctpm.CTPM_RowId
	AND Inv.PRT_INVNO='DHCSSP831'




##5、获取套餐类型

	//体检接口类方法
	SELECT * FROM DHC_PE_ServiceAction

	SELECT * FROM DHC_PE_NetPreRecord WHERE NPR_RegNo='020000000073'

	//体检套餐
	SELECT * FROM ARC_OrdSets

	//套餐类型表
	SELECT * FROM DHC_PE_NetOrdSets WHERE NOS_HisSetsID IN ("24980","25104")


##6、获取部门单位信息

	//体检人员表ADM
	SELECT IADM_CRMADM, * FROM DHC_PE_IADM WHERE IADM_RowId=6859
	
	//个人ADM表
	SELECT PIADM_PGADM_DR,* FROM DHC_PE_PreIADM WHERE PIADM_RowId=12411
	
	//团体客户ADM表
	SELECT PGADM_PGBI_DR,* FROM DHC_PE_PreGADM WHERE PGADM_RowId=376
	
	//团体客户基本信息表
	SELECT PGBI_Desc, * FROM DHC_PE_PreGBaseInfo WHERE PGBI_RowId=233


##7、更新表信息

	&SQL(Update Sqluser.DHC_PE_PreIADM set PIADM_BookDateBegin=:Date,PIADM_BookDateEnd=:Date,PIADM_BookTime=:Time where PIADM_RowID=:PreIADM)
	i SQLCODE'=0
	{
		TROLLBACK
		q "更新预约记录失败"
	}

	//更新预约时间表
	SELECT * FROM DHC_PE_PreDateRecord 

##获取VIP等级

	//（预约）个人ADM表
	SELECT PIADM_Vip, * FROM DHC_PE_PreIADM
	s PackageType=$p($g(^DHCPEVIPLevel("VIP",PIADM_Vip)),"^",2)
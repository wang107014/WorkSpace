#体检SQL

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




	SELECT PIBI_Name AS 姓名,PIADM_RowId AS 就诊ID,ARCIM_Desc AS 项目名称,PIOI_OrdEnt_DR,PIOI_Type AS 预约或加项
	FROM DHC_PE_PreIBaseInfo a ,DHC_PE_PreIADM b,DHC_PE_PreIOrdItem c,ARC_ItmMast d
	WHERE a.PIBI_RowId=b.PIADM_PIBI_DR   
	AND b.PIADM_RowId=c.PIOI_ParRef
	AND c.PIOI_ItmMast_DR=d.ARCIM_RowId
	AND a.PIBI_PAPMINo='020000000033'

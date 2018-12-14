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

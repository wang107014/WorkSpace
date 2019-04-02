#住院收费SQL

##医嘱费用核对

	//病人基本信息表
	SELECT * FROM PA_PatMas WHERE PAPMI_No='020000007814'
	SELECT * FROM PA_PatMas WHERE PAPMI_RowId1="7850"

	/病人就诊信息表
	SELECT * FROM PA_Adm WHERE (PAADM_PAPMI_DR=7850 AND PAADM_Type="I") 
	SELECT * FROM PA_Adm WHERE PAADM_RowID="13436"

	//账单主表
	SELECT * FROM DHC_PatientBill WHERE PB_RowId=429280
	
	//病人医嘱费用明细表
	SELECT * FROM DHC_PatBillOrder WHERE PBO_PB_ParRef=429280
	
	//账单收费项目明细表
	SELECT * FROM DHC_PatBillDetails WHERE PBD_PBO_ParRef IN ('429280||14','429280||15','429280||18','429280||21','429280||23')
	
	//费用项目表
	SELECT * FROM DHC_TarItem WHERE TARI_RowId IN (17417,20030,1,18636)
	
	//住院收据分类
	SELECT * FROM DHC_TarInpatCate WHERE TARIC_RowId IN (1,5,10)
	
	//医嘱表
	SELECT * FROM OE_Order WHERE OEORD_RowId1=2287
	//医嘱扩展表
	SELECT * FROM OE_OrdItem WHERE OEORI_OEORD_ParRef=2287
	
	//医嘱执行表
	SELECT * FROM OE_OrdExec WHERE OEORE_OEORI_ParRef='2287||1'
	
	//医嘱执行状态表
	SELECT * FROM OEC_Order_AdminStatus WHERE STAT_RowId IN (1,2)
 

##查询住院患者

	//病人基本信息表
	SELECT * FROM PA_PatMas WHERE PAPMI_No='020000007814'
	SELECT * FROM PA_PatMas WHERE PAPMI_RowId1="7850"

	/病人就诊信息表
	SELECT * FROM PA_Adm WHERE (PAADM_PAPMI_DR=7850 AND PAADM_Type="I") 
	SELECT * FROM PA_Adm WHERE PAADM_RowID="13436"

	//账单表
	SELECT * FROM DHC_PatientBill WHERE PB_Adm_Dr="13436"

	//住院发票表
	SELECT * FROM DHC_INVPRTZY WHERE PRT_ARPBL IN ('442033',"443304","443305","441948")

	//住院押金表
	SELECT * FROM dhc_sfprintdetail WHERE prt_adm_dr="13758"


##查询医保结算信息

	//医保结算信息
	select * from INSU_Divide

	//查询医保类型
	SELECT REA_Desc,* FROM DHC_PatientBill pb,PAC_AdmReason yblx ,DHC_INVPRTZY zyfp
	WHERE pb.PB_PatInsType_DR=yblx.REA_RowId
	AND zyfp.PRT_ARPBL=pb.PB_RowId
	AND pb.PB_RowId="442462"

##住院收费查询 

	PAADM_EstimDischargeDate：出院日期

	SELECT d.PAPER_TelH,d.PAPER_Name,c.PAPMI_No,a.PRT_ARPBL, *  FROM DHC_INVPRTZY a,PA_Adm b,PA_PatMas c ,PA_Person d WHERE a.PRT_Adm=b.PAADM_RowID AND b.PAADM_PAPMI_DR=c.PAPMI_RowId1 AND c.PAPMI_RowId1=d.PAPER_RowId AND a.PRT_HandDate>"2019-2-28"  ORDER BY b.PAADM_EstimDischargeDate   -- And c.PAPMI_No='990000000731'

##收费项查询
	
	SELECT ALT_Arc_Dr->ARCIM_Desc,ALT_Part_Dr->AP_Desc,ALT_Tar_Dr->TARI_Desc,a.ALT_Qty,c.TP_Price FROM DHC_AppArcLinkTar  a,DHC_TarItem b,DHC_TarItemPrice c WHERE a.ALT_Tar_Dr=b.TARI_RowId AND b.TARI_RowId=c.TP_TARI_ParRef AND  c.TP_ChildSub IN (select max(TP_ChildSub) from DHC_TarItemPrice WHERE TP_TARI_ParRef=b.TARI_RowId) AND  a.ALT_UpdUser_Dr IN("6982","1")


##出院病人查询

	///////////////查找病人的住院费用信息
	//PAADM_VisitStatus:在院状态 A：在院；D：出院；C：取消入院　
	//PAADM_Type:  I：住院；O：门诊；E：急诊；H：体检
	SELECT * FROM PA_PatMas WHERE PAPMI_No='020000001401'
	SELECT * FROM PA_Adm WHERE PAADM_VisitStatus="D" AND PAADM_Type="I" AND PAADM_PAPMI_DR="1436"
	
	///MRCID_ICD9CM_Code:主要诊断编码
	///MRCID_Desc:主要诊断名称
	//PAPMI_IPNo:住院号
	//PAPMI_Name:姓名
	//sex.CTSEX_Desc:性别
	//PAPER_NokAddress2:地址
	//PAADM_AdmDate:入院日期
	//PAADM_AdmTime:入院时间
	//PAADM_DischgDate:出院日期
	//PAADM_DischgTime:出院时间
	//CTLOC_Desc:科室
	//PRT_Date:结算日期
	//PRT_Time:结算时间
	///MRCID_ICD9CM_Code:主要诊断编码
	///MRCID_Desc:主要诊断名称
	///DTYP_Desc:诊断类型
	
	SELECT PAPMI_IPNo,PAPMI_Name,sex.CTSEX_Desc,PAPER_NokAddress2,
	PAADM_AdmDate,PAADM_AdmTime,PAADM_DischgDate,PAADM_DischgTime,CTLOC_Desc,PRT_Date,PRT_Time,
	MRCID_Desc,MRCID_ICD9CM_Code,DTYP_Desc,zdb.MRADM_RowId,zdglb.TYP_ParRef
	FROM PA_Adm jz,CT_Loc ks,DHC_INVPRTZY zyfp,MR_Adm zdb,MR_Diagnos dia,MRC_ICDDx icd,PA_PatMas patm,CT_Sex sex,PA_Person per,MR_DiagType zdglb,MRC_DiagnosType zdlx
	WHERE PAADM_VisitStatus="D" 
	AND PAADM_Type="I" 
	AND jz.PAADM_DepCode_DR=ks.CTLOC_RowID 
	AND jz.PAADM_RowID=zyfp.PRT_Adm              -----
	AND zdb.MRADM_RowId=dia.MRDIA_MRADM_ParRef
	AND dia.MRDIA_ICDCode_DR=icd.MRCID_RowId 
	AND zdb.MRADM_RowId=dia.MRDIA_MRADM_ParRef 
	AND jz.PAADM_MainMRADM_DR=zdb.MRADM_RowId
	AND dia.MRDIA_RowId=zdglb.TYP_ParRef
	AND zdglb.TYP_MRCDiagTyp=zdlx.DTYP_RowId
	AND zdlx.DTYP_RowId IN ("1","4")
	AND patm.PAPMI_Sex_DR=sex.CTSEX_RowId     ---
	AND patm.PAPMI_RowId1=per.PAPER_RowId
	AND jz.PAADM_PAPMI_DR=patm.PAPMI_RowId1
	AND jz.PAADM_DischgDate>"2019-3-1"
	ORDER BY jz.PAADM_DischgDate 

	
	////////////////////////////////根据就诊表找主诊断////////////////////////////////////////
	SELECT PAADM_MainMRAdm_DR, * FROM PA_Adm WHERE PAADM_RowID=4082
	
	///MRCID_ICD9CM_Code:主要诊断编码
	///MRCID_Desc:主要诊断名称
	///DTYP_Desc:诊断类型
	
	SELECT MRCID_Desc,MRCID_ICD9CM_Code,DTYP_Desc
	FROM MR_Adm zdb,MR_Diagnos dia,MRC_ICDDx icd,PA_Adm jz,MR_DiagType zdglb,MRC_DiagnosType zdlx
	WHERE zdb.MRADM_RowId=dia.MRDIA_MRADM_ParRef 
	AND dia.MRDIA_ICDCode_DR=icd.MRCID_RowId 
	AND zdb.MRADM_RowId=dia.MRDIA_MRADM_ParRef 
	AND jz.PAADM_MainMRADM_DR=zdb.MRADM_RowId
	AND dia.MRDIA_RowId=zdglb.TYP_ParRef
	AND zdglb.TYP_MRCDiagTyp=zdlx.DTYP_RowId
	AND zdb.MRADM_RowId="10243"
	AND zdlx.DTYP_RowId IN ("1","4")
	--AND dia.MRDIA_Childsub IN (SELECT max(MRDIA_Childsub) FROM MR_Diagnos WHERE MRDIA_MRADM_ParRef=zdb.MRADM_RowId)
	
	SELECT PAADM_MainMRADM_DR,* FROM PA_Adm WHERE PAADM_RowID="10243"
	SELECT * FROM MR_Adm WHERE MRADM_RowId="10243"          --诊断主表
	SELECT * FROM MR_Diagnos WHERE MRDIA_MRADM_ParRef="4102"  --诊断子表
	SELECT * FROM MRC_DiagnosStatus WHERE DSTAT_RowId=3   --诊断状态
	SELECT * FROM MRC_ICDDx WHERE MRCID_RowId="13795"   --诊断ICD码
	select * from MR_DiagType WHERE TYP_ParRef IN ('4102||1','4102||3','4102||4','4102||2')  --诊断类型关联表
	select * from MRC_DiagnosType WHERE DTYP_RowId IN ("1","3","4")   --诊断类型
	
	SELECT * FROM CT_Loc WHERE CTLOC_RowID=62
	SELECT * FROM DHC_INVPRTZY WHERE PRT_Adm=4081
	
	/////////////////////////////根据就诊找病人基本信息////////////////////////////////////
	//PAPMI_IPNo:住院号
	//PAPMI_Name:姓名
	//sex.CTSEX_Desc:性别
	//PAPER_NokAddress2:地址
	
	SELECT PAPMI_IPNo,PAPMI_Name,sex.CTSEX_Desc,PAPER_NokAddress2
	FROM PA_PatMas patm,CT_Sex sex,PA_Person per,PA_Adm jz
	WHERE PAPMI_RowId1=94 
	AND patm.PAPMI_Sex_DR=sex.CTSEX_RowId 
	AND patm.PAPMI_RowId1=per.PAPER_RowId
	AND jz.PAADM_PAPMI_DR=patm.PAPMI_RowId1
	
	SELECT * FROM PA_PatMas WHERE PAPMI_No='020000001401'
	SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR="1287"

	SELECT * FROM PA_Person WHERE PAPER_RowId=94
	SELECT * FROM PA_Adm WHERE PAADM_RowID="4081"

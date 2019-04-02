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
SELECT * FROM PA_PatMas WHERE PAPMI_No='020000001401'
SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR="1287"

SELECT * FROM PA_Person WHERE PAPER_RowId=94
SELECT * FROM PA_Adm WHERE PAADM_RowID="4081"

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








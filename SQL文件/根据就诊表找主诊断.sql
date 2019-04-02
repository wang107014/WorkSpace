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
AND zdlx.DTYP_RowId IN ("1","4")
--AND zdb.MRADM_RowId="10243"
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

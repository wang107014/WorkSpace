////////////////////////////////根据就诊表找主诊断////////////////////////////////////////
SELECT * FROM PA_PatMas WHERE PAPMI_No="020000010533"
SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR="11580"
SELECT PAADM_MainMRAdm_DR, * FROM PA_Adm WHERE PAADM_RowID=18513

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

SELECT PAADM_MainMRADM_DR,* FROM PA_Adm WHERE PAADM_RowID="18513"
SELECT * FROM MR_Adm WHERE MRADM_RowId=18513          --诊断主表
SELECT MRDIA_DiagStat_DR,MRDIA_ICDCode_DR, * FROM MR_Diagnos WHERE MRDIA_MRADM_ParRef=18513  --诊断子表
SELECT * FROM MRC_DiagnosStatus WHERE DSTAT_RowId=3   --诊断状态
SELECT * FROM MRC_ICDDx WHERE MRCID_RowId IN ('20196','19868','6957')   --诊断ICD码
select * from MR_DiagType WHERE TYP_ParRef IN ('18513||1','18513||2','18513||3')  --诊断类型关联表
select * from MRC_DiagnosType WHERE DTYP_RowId IN ("1","3","4")   --诊断类型


//////////////根据登记号查找病人的所有诊断//////////////////////////////////////////

SELECT PAADM_RowID,PAPMI_Name,MRCID_Desc,PAADM_Type,DTYP_Desc,MRDIA_Date,MRDIA_Time
FROM PA_PatMas pt,PA_Adm pd,MR_Adm md,MR_Diagnos mg ,MRC_ICDDx mc,MR_DiagType mt,MRC_DiagnosType my
WHERE pd.PAADM_PAPMI_DR=pt.PAPMI_RowId1      ---病人表和就诊表关联
AND pd.PAADM_MainMRADM_DR=md.MRADM_RowId     ---就诊表和诊断主表关联
AND mg.MRDIA_MRADM_ParRef=md.MRADM_RowId     ---诊断主表和诊断子表关联
AND mg.MRDIA_ICDCode_DR=mc.MRCID_RowId       ---诊断子表和诊断IDC码关联
AND mg.MRDIA_RowId=mt.TYP_ParRef             ---诊断子表和诊断类型关联表关联
AND mt.TYP_MRCDiagTyp=my.DTYP_RowId
AND pt.PAPMI_No="020000010562"

/////////////////////////////////////////////////////////////////////////////////




SELECT * FROM CT_Loc WHERE CTLOC_RowID=62
SELECT * FROM DHC_INVPRTZY WHERE PRT_Adm=18513

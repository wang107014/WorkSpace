SELECT * FROM SS_User WHERE SSUSR_Name['蒋'

SELECT * FROM PA_PatMas WHERE PAPMI_RowId1=96

//GS_AuditUser_DR 有值为已初检
//总检结论表
SELECT GS_AuditUser_DR, * FROM DHC_PE_GeneralSummarize WHERE GS_PAADM=30664-- GS_UpdateDate="2019-7-16"

SELECT TOP 10 * FROM DHC_PE_IADM WHERE IADM_RowId=15095

SELECT * FROM DHC_PE_PreIADM WHERE PIADM_RowId=22364  -- PIADM_PIBI_DR='17893'
SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR=96

SELECT * FROM INSU_ReferralInfo

///总检结论诊断明细
SELECT TOP 100 GSD_DiagnoseConclusion,GSD_Sort, * FROM DHC_PE_GSDiagnosis WHERE GSD_UpdateDate>"2019-6-1"

///总检结论诊断明细修改记录
SELECT TOP 100 GSDMR_Type, * FROM DHC_PE_GSDModifiedRecords

///体检报告
SELECT * FROM DHC_PE_Report

SELECT * FROM DHC_PE_OtherPatientToHP


///
SELECT peg.*,PAADM_RowID, PIBI_Name,PIBI_PAPMINo,SSUSR_Name FROM DHC_PE_GeneralSummarize peg,DHC_PE_IADM pei,PA_Adm pdm,DHC_PE_PreIADM pri,DHC_PE_PreIBaseInfo pbi,SS_User sr
WHERE peg.GS_IADM_DR=pei.IADM_RowId
AND pei.IADM_PAADM_DR=pdm.PAADM_RowID
AND pei.IADM_CRMADM=pri.PIADM_RowId
AND pri.PIADM_PIBI_DR=pbi.PIBI_RowId
AND peg.GS_AuditUser_DR=sr.SSUSR_RowId


//体检儿童
SELECT TOP 100 GS_AuditUser_DR, PAADM_RowID,IADM_RowId,PIADM_RowId, PAADM_Type,IADM_AdmDate,IADM_Status,* FROM DHC_PE_PreIBaseInfo a,DHC_PE_IADM b ,PA_Adm c ,DHC_PE_PreIADM d, DHC_PE_GeneralSummarize e
WHERE PIBI_DOB>"2010-1-1"
AND d.PIADM_PIBI_DR=a.PIBI_RowId
AND b.IADM_CRMADM=d.PIADM_RowId
AND b.IADM_PAADM_DR=c.PAADM_RowID
AND c.PAADM_Type="H"
AND e.GS_PAADM=c.PAADM_RowID



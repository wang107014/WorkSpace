
///ODR_ARCIM_DR--->ARC_ItmMast医嘱项
///ODR_OD_DR--->DHC_PE_OrderDetail项目子项
select * from DHC_PE_OrderDetailRelate
//医嘱项
SELECT * FROM ARC_ItmMast WHERE ARCIM_RowId='20453||1'
///项目子项
select * from DHC_PE_OrderDetail WHERE OD_RowId='1||41'


///根据登记号查询体检项目的体检结果
SELECT TOP 10 * FROM DHC_PE_PreIBaseInfo WHERE PIBI_PAPMINo='020000000092'
SELECT * FROM DHC_PE_PreIADM WHERE PIADM_PIBI_DR="10457"
SELECT * FROM DHC_PE_IADM WHERE IADM_CRMADM="13521"
SELECT * FROM PA_Adm WHERE PAADM_RowID=156

SELECT IADM_PAADM_DR 就诊id, * FROM DHC_PE_PreIBaseInfo a,DHC_PE_PreIADM b,DHC_PE_IADM c
WHERE b.PIADM_PIBI_DR=a.PIBI_RowId 
AND c.IADM_CRMADM=b.PIADM_RowId
AND a.PIBI_PAPMINo='020000000130'

////体检结果
select * from DHC_PE_Result WHERE RLT_ADM_DR=156 --RLT_OD_DR='1||41' AND RLT_Result["170.2"

///总检结论(建议)
SELECT * FROM DHC_PE_GeneralSummarize WHERE GS_PAADM=156
select * from DHC_PE_GSDiagnosis WHERE GSD_ParRef=784

///体检项目
SELECT * FROM DHC_PE_Station 

///项目子项
select * from DHC_PE_OrderDetail WHERE OD_RowId='1||41'

SELECT * FROM DHC_PE_ODStandard

SELECT * FROM DHC_PE_StationLoc

SELECT * FROM DHC_PE_StationOrder





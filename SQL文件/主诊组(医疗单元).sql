SELECT * FROM SS_User WHERE SSUSR_Name['黄文'

//就诊表
SELECT * FROM PA_Adm WHERE PAADM_RowID IN (69016,69068,69076)

//住院证信息
SELECT CTLocMedUnit->CTMU_Desc, * FROM DHCDocIPBooking

//主诊组
SELECT * FROM DHC_CTLoc_MedUnit 

//主诊组组长标志
SELECT MUCP_LeaderFlag,MUCP_Doctor_DR->CTPCP_Desc,* FROM DHC_CTLoc_MedUnitCareProv WHERE MUCP_LeaderFlag="Y"



//医护人员
SELECT TOP 100 * FROM CT_CareProv

select * from DHCRBC_BookParam
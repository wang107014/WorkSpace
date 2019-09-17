
SELECT * FROM SS_User WHERE SSUSR_Name['薛刚'

SELECT * FROM PA_PatMas WHERE PAPMI_Name['戴宇'

SELECT PAADM_PreAdmitDate, * FROM PA_Adm --WHERE PAADM_PAPMI_DR=36178

SELECT * FROM CT_Loc WHERE CTLOC_RowID IN (30,9)

///挂号表
SELECT TOP 100 RegfeeTime, * FROM DHCRegistrationFee WHERE RegfeeAdmDr=67417

///挂号对列
SELECT TOP  100  QueStateDr->PersName,QueStateDr,* FROM DHCQueue WHERE QueDate="2019-6-20" AND QuePaadmDr="35506"

///报道状态表
SELECT * FROM DHCPerState

//挂号基础数据表 
SELECT WR_Status,WR_PAPMI_DR->PAPMI_Name, * FROM DHCWorkRegReport WHERE WR_ADMDate="2019-6-20"

SELECT TOP 100 * FROM PA_PatMas 

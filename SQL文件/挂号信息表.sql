
SELECT * FROM SS_User WHERE SSUSR_Name['薛刚'


///挂号表
SELECT TOP 100 * FROM DHCRegistrationFee

///挂号对列
SELECT TOP  100  QueStateDr->PersName,QueStateDr,* FROM DHCQueue WHERE QueDate="2019-6-20" AND QuePaadmDr="35506"

///报道状态表
SELECT * FROM DHCPerState

//挂号基础数据表 
SELECT WR_Status,WR_PAPMI_DR->PAPMI_Name, * FROM DHCWorkRegReport WHERE WR_ADMDate="2019-6-20"

SELECT TOP 100 * FROM PA_PatMas 
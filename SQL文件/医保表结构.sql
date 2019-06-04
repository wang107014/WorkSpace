
//就诊表
SELECT PAADM_AdmReason_DR, * FROM PA_Adm WHERE PAADM_AdmReason_DR=36

//病人入院类型字典 
SELECT REA_NationalCode, * FROM PAC_AdmReason WHERE REA_RowId IN (1,36)

SELECT * FROM PA_Adm WHERE PAADM_RowID=21731

////医保就诊信息
///INADM_States:统筹区
SELECT INADM_States,INADM_InsuType, * FROM INSU_AdmInfo WHERE INADM_States IN ('340121','340181','340122','340124','340199')

///医保结算信息
SELECT TOP 100 * FROM INSU_Divide 

//医保字典维护 
///INDID_DicDesc:医保名称(统筹区)
SELECT TOP 100 * FROM INSU_DicData WHERE INDID_DicCode IN ('340121','340181','340122','340124','340199')



//医保返回甲乙丙类
SELECT TOP 100 * FROM INSU_DivideSub


///医保收费项分类分解表,本地算法专有
SELECT * FROM INSU_DivideSubInsuCat

///医保三大目录字典（药品、诊疗、服务设施）
SELECT TOP 100 * FROM INSU_TarItems

SELECT TOP 100 * FROM INSU_TarContrast


///医保申报信息
SELECT * FROM INSU_Report

///医保转诊记录表
SELECT * FROM INSU_ReferralInfo




SELECT * FROM SS_User WHERE SSUSR_Name['张涛'

//就诊表
SELECT PAADM_AdmReason_DR,PAADM_MainMRADM_DR, * FROM PA_Adm WHERE PAADM_AdmReason_DR=36

//病人入院类型字典 
SELECT REA_NationalCode, * FROM PAC_AdmReason WHERE REA_RowId IN (1,36)

SELECT TOP 100 * FROM MR_Adm WHERE MRADM_RowId=12509

SELECT * FROM PA_Adm WHERE PAADM_RowID=36716
SELECT * FROM PA_PatMas WHERE PAPMI_RowId1=16624

////医保就诊信息
///INADM_States:统筹区
SELECT TOP 100 INADM_States,INADM_InsuType, * FROM INSU_AdmInfo WHERE 
INADM_States IN ('340121','340181','340122','340124','340199')
AND INADM_ActiveFlag="A"
AND INADM_AdmDate="2019-06-20"

///医保结算信息
SELECT TOP 100 INPAY_djlsh0, * FROM INSU_Divide 

//医保字典维护 
///INDID_DicDesc:医保名称(统筹区)
SELECT TOP 1000 * FROM INSU_DicData WHERE INDID_DicCode IN ('340121','340181','340122','340124','340199')

SELECT TOP 1000 * FROM INSU_DicData WHERE INDID_DicCode['AHAY'

select * from INSU_DicData WHERE INDID_DicDesc['异地'


//医保返回甲乙丙类
SELECT TOP 100 * FROM INSU_DivideSub


SELECT INADM_InsuType, * from INSU_AdmInfo WHERE INADM_InsuType['AHC'


///医保收费项分类分解表,本地算法专有
SELECT * FROM INSU_DivideSubInsuCat

///医保三大目录字典（药品、诊疗、服务设施）
SELECT TOP 100 * FROM INSU_TarItems
///医保三大目录对照 
SELECT TOP 100 * FROM INSU_TarContrast


///医保收费项分类分解表
SELECT * FROM INSU_DivideSubInsuCat

///医保申报信息
SELECT * FROM INSU_Report

///医保转诊记录表
SELECT * FROM INSU_ReferralInfo

///医保类别
SELECT * FROM DHC_ItmInsuCategory

SELECT * FROM DHC_OPRegInsuComp

SELECT * FROM SS_User WHERE SSUSR_Name['张涛'

/////////////////////////////////////////门诊医保审核数据上报////////////////////////////////////////////////
SELECT * FROM OE_Order WHERE OEORD_RowId1="34666"
SELECT OEORI_UnitCost, * FROM OE_OrdItem WHERE OEORI_OEORD_ParRef='34666'
SELECT * FROM ARC_ItmMast WHERE ARCIM_RowId='18980||1'

///收费项目与医嘱项对应表 
SELECT * FROM DHC_OrderLinkTar WHERE OLT_ARCIM_DR='18980||1'
///收费项目表 
SELECT * FROM DHC_TarItem WHERE TARI_RowId="18544"


///医保三大目录字典（药品、诊疗、服务设施）
SELECT TOP 100 * FROM INSU_TarItems WHERE INTIM_Rowid=488395
///医保三大目录对照 
SELECT TOP 100 INTCT_His_Dr,INTCT_DicType,INTCT_ActiveDate, * FROM INSU_TarContrast WHERE INTCT_His_Dr=18331


SELECT INTIM_xmbm AS 医保项目编码,INTCT_InsuDesc AS 医保项目名称, b.* FROM INSU_TarContrast a,INSU_TarItems b
WHERE a.INTCT_Insu_Dr=b.INTIM_Rowid
AND a.INTCT_His_Dr=18331



SELECT OEORI_RowId AS 医嘱子项id, TARI_RowId AS 收费项id,TARI_Code AS 收费项编码,TARI_Desc AS 收费项名称,OEORI_UnitCost AS 单价
FROM OE_OrdItem a,ARC_ItmMast b,DHC_OrderLinkTar c,DHC_TarItem d
WHERE a.OEORI_ItmMast_DR=b.ARCIM_RowId
AND c.OLT_ARCIM_DR=b.ARCIM_RowId
AND c.OLT_Tariff_DR=d.TARI_RowId
AND a.OEORI_OEORD_ParRef='34666'


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////门诊医保报销明细查询/////////////////////////////////////////

SELECT * FROM PA_PatMas WHERE PAPMI_No="020000016692"

SELECT PRT_InsDiv_DR, * FROM dhc_invprt WHERE PRT_Date="2019-7-3" AND PRT_Flag="N" AND PRT_InsDiv_DR!="NULL" AND PRT_PAPMI_DR=18553
SELECT TOP 100 INPAY_djlsh0, * FROM INSU_Divide WHERE INPAY_Rowid=2910

SELECT * FROM DHC_BillConINV WHERE DHCBCI_INVDR=425023
SELECT * FROM DHC_PatientBill WHERE PB_RowId='482471'

///医保收费项分解表 
///INDIS_Flag:"I":"未上传","N":"已上传",:"其他"
////门诊医保明细数据
SELECT INDIS_INSUCode AS 医保编号,INDIS_INSUDesc AS 医保名称,INDIS_INSUXMLB AS 医保等级,INDIS_Qty AS 数量,
INDIS_Price AS 价格,INDIS_Amount AS 金额,TARC_Desc AS 项目住院分类, INDIS_Scale AS 自付比例,INDIS_Fund AS 统筹支付,
INDIS_Self AS 个人自付,INDIS_Flag AS 上传标志,* 
FROM INSU_DivideSub a,DHC_TarCate b
WHERE INDIS_PB_Dr="482471"
AND a.INDIS_TarCate=b.TARC_RowId

////收费项目类(子类与病人收费有关) 
SELECT * FROM DHC_TarCate  WHERE TARC_RowId=1


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////













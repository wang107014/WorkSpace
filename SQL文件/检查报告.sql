//检查报告
SELECT  AR_RepDate, * from DHC_AppReport WHERE AR_CreateDate="2019-5-7"

//检查报告子表
SELECT AR_SpecCode, * from DHC_AppRepArc

SELECT TOP 1000 AR_Part_Dr->AP_Desc, * from DHC_AppRepPart

//检查报告单
select * from DHCRB_Report WHERE DRPT_StudyNo='1906170825304937'

SELECT DRPT_ExameMethod,DRPT_RegInfo_DR, * from DHCRB_Report WHERE DRPT_OeordItm_DR="56614||387"

//RAR_RegDate:检查日期（登记日期）
SELECT RAR_OEORI_DR,RAR_RegDate, * FROM DHCRB_RegInfo WHERE RAR_OEORI_DR="30325||29"

CALL web_BOE_DataCollection.HDICLIEXAINFO


//检查部位
SELECT * FROM DHC_AppPart


SELECT TOP 1000 ARCIM_ServMaterial,ARCIM_ItemCat_DR->ARCIC_Desc, * FROM ARC_ItmMast WHERE ARCIM_ItemCat_DR=18
SELECT * FROM OE_OrdItem WHERE OEORI_RowId="30325||29"
SELECT * FROM OE_Order WHERE OEORD_RowId1=30325

select * from DHC_AppPisMaster

SELECT * FROM DHC_AppRepOthOpt


//RAR_StudyNo:(病理号)
SELECT TOP 1000 RAR_OEORI_DR, * from DHCRB_RegInfo --WHERE RAR_StudyNo['E'


SELECT TOP 100 ARCIM_ServMaterial,ARCIM_ItemCat_DR->ARCIC_Desc,ARCIM_Desc, * FROM ARC_ItmMast WHERE ARCIM_ServMaterial="S"

//医嘱子分类
SELECT ARCIC_OrdCat_DR->ORCAT_Desc AS 医嘱大类,ARCIC_OrdCat_DR,* from ARC_ItemCat WHERE ARCIC_OrdCat_DR->ORCAT_Desc['检验'

//医嘱大类
select * from OEC_OrderCategory

SELECT TOP 1000 * FROM PA_Adm WHERE PAADM_Type['I'

SELECT TOP 100 * FROM PA_PatMas
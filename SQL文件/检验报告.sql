
SELECT TOP 1000 * FROM PA_Adm

SELECT * FROM oe_order WHERE OEORD_Adm_DR=34780
SELECT OEORI_LabEpisodeNo,OEORI_LabTestSetRow, * from OE_OrdItem WHERE OEORI_OEORD_ParRef=29508 AND OEORI_LabEpisodeNo='1000064579'

SELECT TOP 1000 * from OE_OrdResult WHERE RES_ParRef='29508||9'

///SPEC_Code:检验标本代码
select * from OE_OrdSpecimen WHERE SPEC_ParRef='29508||9'


--HIS医嘱与检验报告ID关联表
SELECT HISOrderID,VisitNumberReportDR,* FROM dbo.RP_VisitNumberTestSet WHERE HISOrderID='29508||9'

--检验标本（OEORD表中有检验号跟VisitNumber对应）
SELECT TOP 1000 * FROM dbo.RP_VisitNumber WHERE VisitNumber='1000064579'

--检验报告
SELECT TOP 1000 VisitNumberDR,* FROM dbo.RP_VisitNumberReport WHERE RowID=47909




--检验报告子项目明细
SELECT TOP 1000 VisitNumberReportDR,* FROM dbo.RP_VisitNumberReportResult WHERE VisitNumberReportDR=47909


////检验报告（检验系统审核报告的同时，可以推送消息到此表）
SELECT TOP 100 * FROM DHCMed_DC_LIS.LabReport WHERE ID=33925

///标本
SELECT * FROM DHCMed_DC_LIS.BTSpecimen

SELECT * FROM oe_order WHERE OEORD_RowId1=150


SELECT * FROM SS_User WHERE SSUSR_Name['胡海'


SELECT TOP 1000 * FROM PA_Adm

SELECT * FROM oe_order WHERE OEORD_Adm_DR=34780
SELECT OEORI_LabEpisodeNo,OEORI_LabTestSetRow, * from OE_OrdItem WHERE OEORI_OEORD_ParRef=29508 AND OEORI_LabEpisodeNo='1000064579'

SELECT TOP 1000 * from OE_OrdResult WHERE RES_ParRef='29508||9'

///SPEC_Code:����걾����
select * from OE_OrdSpecimen WHERE SPEC_ParRef='29508||9'


--HISҽ������鱨��ID������
SELECT HISOrderID,VisitNumberReportDR,* FROM dbo.RP_VisitNumberTestSet WHERE HISOrderID='29508||9'

--����걾��OEORD�����м���Ÿ�VisitNumber��Ӧ��
SELECT TOP 1000 * FROM dbo.RP_VisitNumber WHERE VisitNumber='1000064579'

--���鱨��
SELECT TOP 1000 VisitNumberDR,* FROM dbo.RP_VisitNumberReport WHERE RowID=47909




--���鱨������Ŀ��ϸ
SELECT TOP 1000 VisitNumberReportDR,* FROM dbo.RP_VisitNumberReportResult WHERE VisitNumberReportDR=47909


////���鱨�棨����ϵͳ��˱����ͬʱ������������Ϣ���˱�
SELECT TOP 100 * FROM DHCMed_DC_LIS.LabReport WHERE ID=33925

///�걾
SELECT * FROM DHCMed_DC_LIS.BTSpecimen

SELECT * FROM oe_order WHERE OEORD_RowId1=150


SELECT * FROM SS_User WHERE SSUSR_Name['����'

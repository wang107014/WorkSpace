

//���˻�����Ϣ��
SELECT PIBI_RowId, * FROM DHC_PE_PreIBaseInfo WHERE PIBI_PAPMINo='020000015934'

//����ADM��
SELECT PIADM_RowId, * FROM DHC_PE_PreIADM WHERE PIADM_PIBI_DR='17118'

//������Ŀ��
SELECT PIOI_OrdEnt_DR->PIOE_OrderSets_DR,PIOI_ItmMast_DR,* FROM DHC_PE_PreIOrdItem WHERE PIOI_ParRef='17118'
SELECT * FROM DHC_PE_PreIOrdEnt
SELECT * FROM ARC_OrdSets WHERE ARCOS_RowId1=25444
SELECT * FROM DHC_PE_PreIOrdEntFee



//���ݸ���ADM���е�Rowid������͸���ADM��˱������ֶε�ֵ
///1�������ֶ�(PA_ChargedStatus)�շ�״̬���жϣ�CHARGED���շ���û�м�¼,UNCHARGEDδ�շѻ��С�
///2�������ֶ�(PA_FactAmount)���ս�����ж�,��ֵΪ0ʱ��û�м�¼

//���˻�����Ϣ��
SELECT PIBI_RowId, * FROM DHC_PE_PreIBaseInfo WHERE PIBI_PAPMINo='020000018120'

//����ADM��
SELECT PIADM_RowId, * FROM DHC_PE_PreIADM WHERE PIADM_PIBI_DR='17804'

//�����Ա��ADM
SELECT IADM_GADM_DR,IADM_AsCharged, * FROM DHC_PE_IADM WHERE IADM_CRMADM='22249'


///��ԤԼ��������Ŀ��
SELECT TOP 100 * FROM DHC_PE_PreIOrdItem WHERE PIOI_ParRef=13392

///��ԤԼ��������Ŀ���ñ� 
SELECT TOP 100 PIOIF_PAudit_DR, * from DHC_PE_PreIOrdItemFee WHERE PIOIF_ParRef='22249||2'

////(ԤԼ������͸���ADM��˱�
SELECT PA_ChargedStatus, PA_FactAmount,PA_GIADM, * FROM DHC_PE_PreAudit WHERE  PA_CRMADM IN ('22249')



////////////////////////////////////////////��ѯҽ����Ŀ/////////////////////////
SELECT * FROM PA_PatMas WHERE PAPMI_No='020000015934'

SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR='17727' --and PAADM_AdmDate="2019-6-14"

SELECT * FROM PA_Adm WHERE PAADM_RowID=4283

SELECT * FROM OE_Order WHERE OEORD_Adm_DR=156

SELECT OEORI_LabTestSetRow,OEORI_ItmMast_DR->ARCIM_Desc AS ҽ������,OEORI_Billed AS ����״̬, OEORI_LabEpisodeNo,OEORI_LabTestSetRow,* FROM OE_OrdItem WHERE OEORI_OEORD_ParRef=30058

SELECT OEORI_LabTestSetRow,OEORI_LabEpisodeNo,VisitNumberReportDR,* from OE_OrdItem a, dbo.RP_VisitNumberTestSet b
WHERE a.OEORI_RowId IN ("25611||5","25611||6")
AND a.OEORI_LabTestSetRow=b.RowID

SELECT TOP 100 * FROM dbo.RP_VisitNumberTestSet WHERE HISOrderID IN ('25611||11','25611||14')
	
//ҽ����
SELECT * FROM ARC_ItmMast WHERE ARCIM_RowId IN ('17938||1')

select * from DHC_PE_StationOrder




////////////////////////////////////////////��ѯҽ����Ŀ/////////////////////////
SELECT PAPMI_Name AS ����,PAADM_RowID AS ����,OEORI_RowId AS ҽ��ID, ARCIM_Desc AS ҽ������,ARCIM_RowId as ��Ŀid,OEORI_Billed AS ����״̬,PAADM_AdmDate AS �������� ,
OEORI_LabEpisodeNo AS �����
FROM PA_PatMas a ,PA_Adm b,OE_Order c,OE_OrdItem d,ARC_ItmMast e
WHERE b.PAADM_PAPMI_DR=a.PAPMI_RowId1
AND c.OEORD_Adm_DR=b.PAADM_RowID
AND d.OEORI_OEORD_ParRef=c.OEORD_RowId1
AND d.OEORI_ItmMast_DR=e.ARCIM_RowId
AND a.PAPMI_No='020000017520'
AND b.PAADM_AdmDate="2018-12-14"


////�����
SELECT RLT_OD_DR->OD_Desc, * from DHC_PE_Result WHERE RLT_OEORI_DR IN ("25611||14")
SELECT * from DHC_PE_OrderDetail WHERE OD_RowId='17||13'
SELECT TOP 100 OEORI_OrdEnt_DR,OEORI_LabEpisodeNo,* from OE_OrdItem WHERE OEORI_OEORD_ParRef=25611
SELECT TOP 100 * from DHC_PE_StationOrder WHERE STORD_ARCIM_DR IN ('17277||1','17475||1')
select * from DHC_PE_Station WHERE ST_RowId=35


/////////////////////////////ȡ����Ľ��ֵ
SELECT TOP 100 OEORI_OrdEnt_DR,OEORI_LabEpisodeNo,* from OE_OrdItem WHERE OEORI_OEORD_ParRef=25611


////////////////////////////////////////////////��ѯ�����Ŀ/////////////////////////
SELECT PIBI_Name AS ����,PIADM_RowId AS ������ID,ARCIM_Desc AS ��Ŀ����,ARCIM_RowId as ҽ����Ŀid,PIADM_BookDateBegin AS �Ǽ�����,PIOI_OrdEnt_DR AS ��Ŀִ�� ,
	PIOI_Type AS ԤԼ�����
	FROM DHC_PE_PreIBaseInfo a ,DHC_PE_PreIADM b,DHC_PE_PreIOrdItem c,ARC_ItmMast d 
	WHERE a.PIBI_RowId=b.PIADM_PIBI_DR   
	AND b.PIADM_RowId=c.PIOI_ParRef
	AND c.PIOI_ItmMast_DR=d.ARCIM_RowId
	AND a.PIBI_PAPMINo='020000018120'
	AND b.PIADM_RowId=13463
	
	
SELECT * FROM DHC_PE_INVPRT WHERE PRT_INVNO="DHCPEYJS7058"
SELECT * FROM DHC_INVPRT WHERE PRT_PAPMI_DR=1246
SELECT * FROM DHC_BillConINV WHERE DHCBCI_ADMDR=4029

SELECT * FROM DHC_PatientBill WHERE PB_RowId=430854
SELECT * FROM PA_Adm WHERE PAADM_RowID=4029

SELECT * FROM SS_User WHERE SSUSR_Name['����'

SELECT * FROM SS_User WHERE SSUSR_RowId=6886




SELECT * FROM SS_User WHERE SSUSR_Name['���'
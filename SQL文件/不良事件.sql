///ҽ�Ʋ����¼��ϱ���
///MEDADR_CurStatus_DR ��ǰ״̬ 
///MEDADR_ReportType  ��������
SELECT MEDADR_CurStatus_DR,MEDADR_ReportType, * FROM DHC_MedAdrReport WHERE MEDADR_CreateDate="2019-5-18"

///ҽ�Ʋ����¼������¼�������
///MEDADR_Receive:����״̬��1���ա�2���ء�3ֱ���ύ
SELECT MEDADR_Receive, * FROM DHC_MedAdrRepAudit WHERE MEDADR_AuditDate="2019-5-18"



//�������¼���
SELECT ADV_RepStaus_Dr, * FROM DHC_AdvMaster WHERE ADV_RepDate="2019-4-24"


SELECT ADVDR_CurStatus_DR, * FROM DHC_AdvDrugReport


//�����¼����ͱ�
select * from DHC_MedAdrRepEvent

SELECT * FROM SS_User WHERE SSUSR_RowId=7618



///������Ȩ�����ñ�
SELECT ADRWFG_Itm_Dr, * from DHC_AdrWorkFlowGrant WHERE  ADRWFG_Type=1 AND ADRWFG_Pointer=23  AND ADRWFG_ParRef_Dr=1

//�����¼�����������
select * from DHC_AdrEvtWorkFlow WHERE ADREW_RowID=20

//��������Ŀ
select * from DHC_AdrEvtWorkFlowItm
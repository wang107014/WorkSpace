///ҽ�Ʋ����¼��ϱ���
///MEDADR_CurStatus_DR ��ǰ״̬ 
///MEDADR_ReportType  ��������
SELECT MEDADR_CurStatus_DR,MEDADR_ReportType, * FROM DHC_MedAdrReport WHERE MEDADR_CreateDate="2019-5-18"

///ҽ�Ʋ����¼������¼�������
///MEDADR_Receive:����״̬��1���ա�2���ء�3ֱ���ύ
SELECT MEDADR_Receive, * FROM DHC_MedAdrRepAudit WHERE MEDADR_AuditDate="2019-5-18"

////ҩƷ�����¼�
///ADVDR_ReportType:��������
///ADVDR_CurStatus_DR:��ǰ״̬
SELECT ADVDR_ReportType,ADVDR_CurStatus_DR, * from DHC_AdvDrugReport

//״̬
select * from DHC_AdrEvtWorkFlowItm

//MEDADR_Receive:����״̬("1":"����","2":"����","3":"ֱ���ύ")
SELECT MEDADR_Receive, * from DHC_MedAdrRepAudit WHERE MEDADR_Type=2 AND MEDADR_Pointer IN (1,4)



//�������¼���
SELECT TOP 100 ADV_RepStaus_Dr, * FROM DHC_AdvMaster WHERE ADV_RepDate="2019-3-11"

///��������
SELECT * FROM DHC_MedAdrRepEvent

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

///�����¼���Ӧ����ɲ鿴Ȩ��
select * from DHC_AdvQuerySec WHERE ADVQS_RepTyep_Dr=94

SELECT * FROM SS_User WHERE SSUSR_Name['��'

SELECT * FROM CT_Loc WHERE CTLOC_RowID IN (44,127)
SELECT * FROM SS_Group WHERE SSGRP_RowId IN (117,311)

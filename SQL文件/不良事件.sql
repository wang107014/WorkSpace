///ҽ�Ʋ����¼��ϱ���
///MEDADR_CurStatus_DR ��ǰ״̬
SELECT MEDADR_CreateTime,MEDADR_CurStatus_DR, * FROM DHC_MedAdrReport WHERE MEDADR_CreateDate="2019-4-24"

///ҽ�Ʋ����¼������¼�������
///MEDADR_Receive:����״̬��1���ա�2���ء�3ֱ���ύ
SELECT MEDADR_Receive, * FROM DHC_MedAdrRepAudit WHERE MEDADR_AuditDate="2019-4-24"



//�������¼���
SELECT ADV_RepStaus_Dr, * FROM DHC_AdvMaster WHERE ADV_RepDate="2019-4-24"


SELECT ADVDR_CurStatus_DR, * FROM DHC_AdvDrugReport
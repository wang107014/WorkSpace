///医疗不良事件上报表
///MEDADR_CurStatus_DR 当前状态
SELECT MEDADR_CreateTime,MEDADR_CurStatus_DR, * FROM DHC_MedAdrReport WHERE MEDADR_CreateDate="2019-4-24"

///医疗不良事件报告事件审批表
///MEDADR_Receive:接收状态：1接收、2驳回、3直接提交
SELECT MEDADR_Receive, * FROM DHC_MedAdrRepAudit WHERE MEDADR_AuditDate="2019-4-24"



//护理不良事件表
SELECT ADV_RepStaus_Dr, * FROM DHC_AdvMaster WHERE ADV_RepDate="2019-4-24"


SELECT ADVDR_CurStatus_DR, * FROM DHC_AdvDrugReport
///医疗不良事件上报表
///MEDADR_CurStatus_DR 当前状态 
///MEDADR_ReportType  报告类型
SELECT MEDADR_CurStatus_DR,MEDADR_ReportType, * FROM DHC_MedAdrReport WHERE MEDADR_CreateDate="2019-5-18"

///医疗不良事件报告事件审批表
///MEDADR_Receive:接收状态：1接收、2驳回、3直接提交
SELECT MEDADR_Receive, * FROM DHC_MedAdrRepAudit WHERE MEDADR_AuditDate="2019-5-18"



//护理不良事件表
SELECT ADV_RepStaus_Dr, * FROM DHC_AdvMaster WHERE ADV_RepDate="2019-4-24"


SELECT ADVDR_CurStatus_DR, * FROM DHC_AdvDrugReport


//不良事件类型表
select * from DHC_MedAdrRepEvent

SELECT * FROM SS_User WHERE SSUSR_RowId=7618



///工作流权限设置表
SELECT ADRWFG_Itm_Dr, * from DHC_AdrWorkFlowGrant WHERE  ADRWFG_Type=1 AND ADRWFG_Pointer=23  AND ADRWFG_ParRef_Dr=1

//不良事件工作流定义
select * from DHC_AdrEvtWorkFlow WHERE ADREW_RowID=20

//工作流项目
select * from DHC_AdrEvtWorkFlowItm
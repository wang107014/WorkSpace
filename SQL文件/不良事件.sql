///医疗不良事件上报表
///MEDADR_CurStatus_DR 当前状态 
///MEDADR_ReportType  报告类型
SELECT MEDADR_CurStatus_DR,MEDADR_ReportType, * FROM DHC_MedAdrReport WHERE MEDADR_CreateDate="2019-5-18"

///医疗不良事件报告事件审批表
///MEDADR_Receive:接收状态：1接收、2驳回、3直接提交
SELECT MEDADR_Receive, * FROM DHC_MedAdrRepAudit WHERE MEDADR_AuditDate="2019-5-18"

////药品不良事件
///ADVDR_ReportType:报告类型
///ADVDR_CurStatus_DR:当前状态
SELECT ADVDR_ReportType,ADVDR_CurStatus_DR, * from DHC_AdvDrugReport

//状态
select * from DHC_AdrEvtWorkFlowItm

//MEDADR_Receive:接收状态("1":"接收","2":"驳回","3":"直接提交")
SELECT MEDADR_Receive, * from DHC_MedAdrRepAudit WHERE MEDADR_Type=2 AND MEDADR_Pointer IN (1,4)



//护理不良事件表
SELECT TOP 100 ADV_RepStaus_Dr, * FROM DHC_AdvMaster WHERE ADV_RepDate="2019-3-11"

///报告类型
SELECT * FROM DHC_MedAdrRepEvent

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

///不良事件反应分类可查看权限
select * from DHC_AdvQuerySec WHERE ADVQS_RepTyep_Dr=94

SELECT * FROM SS_User WHERE SSUSR_Name['徐'

SELECT * FROM CT_Loc WHERE CTLOC_RowID IN (44,127)
SELECT * FROM SS_Group WHERE SSGRP_RowId IN (117,311)

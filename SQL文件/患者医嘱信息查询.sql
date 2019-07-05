//患者医嘱信息查询
SELECT 
OE_OrdItem.OEORI_RowId 医嘱明细ID,
OEORI_AdmLoc_DR->CTLOC_Desc 病人当时所在科室或者病区,OEORI_OrdDept_DR->CTLOC_Desc 下医嘱时病人所在科室,
OEORI_Doctor_DR->CTPCP_Desc 开医嘱医生,OEORI_UserDepartment_DR->CTLOC_Desc 医嘱录入科室,OEORI_Date 开医嘱日期,OEORI_Time 开医嘱时间,OEORI_SttDat 医嘱开始日期,OEORI_SttTim 医嘱开始时间,
OEORI_SeeUser_DR->SSUSR_Name 医嘱处理护士,OEORI_SeeDate 医嘱处理日期,OEORI_SeeTime 医嘱处理时间,OEORI_SeeType 处理类型,
OEORI_XCTCP_DR->CTPCP_Desc 医嘱停止人,OEORI_XDate 医嘱停止日期,OEORI_XTime 医嘱停止时间,OEORI_DisconUser_DR->SSUSR_Name 停止医嘱处理人,OEORI_DisconDate 停医嘱处理日期,OEORI_DisconTime 停医嘱处理时间,
ARC_ItmMast.ARCIM_Desc 医嘱项,OEC_OrderStatus.OSTAT_Desc 医嘱状态,OEC_Priority.OECPR_Desc 医嘱类型,OEORI_RecDep_DR->CTLOC_Desc 医嘱接受科室,OEORI_Billed 计费状态,REA_Desc 费别,OEORI_CoverMainIns 医保标识,
OEORI_SeqNo 关联号,OEORI_OEORI_DR 关联医嘱,
OEORI_Instr_DR->PHCIN_Desc1 医嘱用法,OEORI_PHFreq_DR->PHCFR_Desc2 医嘱频率,OEORI_Durat_DR->PHCDU_Desc1 疗程,
OEORI_PrescNo 处方号,OEORI_LabEpisodeNo 标本号,OEORI_AppReport_DR 检查申请单关联,OEORI_OPMultDuraPYFlag 门诊多疗程输液用法标志,
OEORI_AdministerSkinTest 是否皮试,OEORI_Abnormal 皮试结果是否异常,DHCORI_SkinTestCtcp_Dr->CTPCP_Desc 置皮试结果人,DHCORI_SkinTestDate 置皮试结果日期,DHCORI_SkinTestTime 置皮试结果时间,DHCORI_SkinTestAuditCtcp_Dr->CTPCP_Desc 皮试结果审核人,
OEORI_MaterialNo 高值耗材条码,

DHCORI_RefundAuditStatus 门诊退费审核状态,DHCORI_RefundAuditUser_Dr->SSUSR_Name 门诊退费审核用户,DHCORI_RefundAuditDate 门诊退费审核日期,DHCORI_RefundAuditTime 门诊退费审核时间,DHCORI_RefundReason 门诊退费审核原因
--,*
FROM OE_OrdItem		--医嘱明细表
LEFT JOIN OE_Order ON OE_Order.OEORD_RowId1 = OE_OrdItem.OEORI_OEORD_ParRef		--OE_Order医嘱主表关联
LEFT JOIN Pa_Adm ON Pa_Adm.PAADM_RowID = OE_Order.OEORD_Adm_DR		--Pa_Adm就诊表关联
LEFT JOIN ARC_ItmMast ON ARC_ItmMast.ARCIM_RowId = OE_OrdItem.OEORI_ItmMast_DR		--ARC_ItmMast医嘱项表关联
LEFT JOIN OEC_OrderStatus ON OEC_OrderStatus.OSTAT_RowId = OE_OrdItem.OEORI_ItemStat_DR		--OEC_OrderStatus医嘱状态表关联
LEFT JOIN OEC_Priority ON OEC_Priority.OECPR_RowId = OE_OrdItem.OEORI_Priority_DR		--OEC_Priority医嘱优先级表关联
LEFT JOIN PAC_AdmReason ON PAC_AdmReason.REA_RowId = OE_OrdItem.OEORI_BBExtCode		--PAC_AdmReason费别字典表关联
LEFT JOIN OE_OrdItemExt ON OE_OrdItemExt.OEORI_RowId = OE_OrdItem.OEORI_RowId		--OE_OrdItemExt医嘱明细扩展表
LEFT JOIN DHC_OE_OrdItem ON DHC_OE_OrdItem.DHCORI_OEORI_Dr = OE_OrdItem.OEORI_RowId		--DHC_OE_OrdItem医嘱护士扩展表

--PHC_Instruc用法字典表；PHC_Freq频次字典表；PHC_Duration 疗程字典表
WHERE
--OEORI_AdministerSkinTest="Y"		--根据是否皮试查询
Pa_Adm.PAADM_RowID="41545"		--根据就诊号查询
AND PAADM_Type="I"	--根据就诊类型查询；I：住院；O：门诊；E：急诊；H：体检
--AND OSTAT_Desc = "停止"		--根据医嘱状态查询
--AND OECPR_Desc = "长期医嘱"		--根据医嘱优先级查询
--AND OEORI_Billed="P"	--根据计费状态查询；TB:未计费;B:已计费;R:已退费;I:需退费;P:结算
--AND DHCORI_RefundAuditStatus =""	--根据门诊退费审核状态查询：N:正常;A:审核;C:取消


SELECT * FROM PA_PatMas WHERE PAPMI_RowId1=17780

SELECT a.PAADM_PAPMI_DR,b.PAPMI_Name,* FROM PA_Adm a,PA_PatMas b
WHERE a.PAADM_PAPMI_DR=b.PAPMI_RowId1
AND b.PAPMI_No="020000015986"
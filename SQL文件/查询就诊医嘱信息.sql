SELECT
PAPMI_No 登记号,PAPMI_Name 姓名,ARCIM_Desc 医嘱项名称,PAADM_Type 就诊类型IOEH,PAADM_AdmDate 就诊日期,PAADM_AdmTime 就诊时间,OEORI_Billed
--*
FROM Pa_Adm
LEFT JOIN PA_Person ON PA_Person.PAPER_RowId = Pa_Adm.PAADM_PAPMI_DR	--person表关联
LEFT JOIN PA_PatMas ON PA_PatMas.PAPMI_RowId1 = PA_Person.PAPER_RowId	--patmas表关联
LEFT JOIN OE_Order ON Pa_Adm.PAADM_RowID = OE_Order.OEORD_Adm_DR	--医嘱主表关联
LEFT JOIN OE_OrdItem ON OE_Order.OEORD_RowId1 = OE_OrdItem.OEORI_OEORD_ParRef	--医嘱子表关联
--LEFT JOIN OE_OrdExec ON OE_OrdItem.OEORI_RowId=OE_OrdExec.OEORE_OEORI_ParRef	--医嘱执行表关联
LEFT JOIN ARC_ItmMast ON OE_OrdItem.OEORI_ItmMast_DR=ARC_ItmMast.ARCIM_RowId	--医嘱项字典表关联
WHERE PA_PatMas.PAPMI_No='020000017502'
AND OEORI_Billed="P"	--TB:未计费;B:已计费;R:已退费;I:需退费;P:结算
AND OEORI_RecDep_DR="96"


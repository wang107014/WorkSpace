SELECT
PAPMI_No �ǼǺ�,PAPMI_Name ����,ARCIM_Desc ҽ��������,PAADM_Type ��������IOEH,PAADM_AdmDate ��������,PAADM_AdmTime ����ʱ��,OEORI_Billed
--*
FROM Pa_Adm
LEFT JOIN PA_Person ON PA_Person.PAPER_RowId = Pa_Adm.PAADM_PAPMI_DR	--person�����
LEFT JOIN PA_PatMas ON PA_PatMas.PAPMI_RowId1 = PA_Person.PAPER_RowId	--patmas�����
LEFT JOIN OE_Order ON Pa_Adm.PAADM_RowID = OE_Order.OEORD_Adm_DR	--ҽ���������
LEFT JOIN OE_OrdItem ON OE_Order.OEORD_RowId1 = OE_OrdItem.OEORI_OEORD_ParRef	--ҽ���ӱ����
--LEFT JOIN OE_OrdExec ON OE_OrdItem.OEORI_RowId=OE_OrdExec.OEORE_OEORI_ParRef	--ҽ��ִ�б����
LEFT JOIN ARC_ItmMast ON OE_OrdItem.OEORI_ItmMast_DR=ARC_ItmMast.ARCIM_RowId	--ҽ�����ֵ�����
WHERE PA_PatMas.PAPMI_No='020000017502'
AND OEORI_Billed="P"	--TB:δ�Ʒ�;B:�ѼƷ�;R:���˷�;I:���˷�;P:����
AND OEORI_RecDep_DR="96"


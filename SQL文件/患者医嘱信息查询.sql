//����ҽ����Ϣ��ѯ
SELECT 
OE_OrdItem.OEORI_RowId ҽ����ϸID,
OEORI_AdmLoc_DR->CTLOC_Desc ���˵�ʱ���ڿ��һ��߲���,OEORI_OrdDept_DR->CTLOC_Desc ��ҽ��ʱ�������ڿ���,
OEORI_Doctor_DR->CTPCP_Desc ��ҽ��ҽ��,OEORI_UserDepartment_DR->CTLOC_Desc ҽ��¼�����,OEORI_Date ��ҽ������,OEORI_Time ��ҽ��ʱ��,OEORI_SttDat ҽ����ʼ����,OEORI_SttTim ҽ����ʼʱ��,
OEORI_SeeUser_DR->SSUSR_Name ҽ������ʿ,OEORI_SeeDate ҽ����������,OEORI_SeeTime ҽ������ʱ��,OEORI_SeeType ��������,
OEORI_XCTCP_DR->CTPCP_Desc ҽ��ֹͣ��,OEORI_XDate ҽ��ֹͣ����,OEORI_XTime ҽ��ֹͣʱ��,OEORI_DisconUser_DR->SSUSR_Name ֹͣҽ��������,OEORI_DisconDate ͣҽ����������,OEORI_DisconTime ͣҽ������ʱ��,
ARC_ItmMast.ARCIM_Desc ҽ����,OEC_OrderStatus.OSTAT_Desc ҽ��״̬,OEC_Priority.OECPR_Desc ҽ������,OEORI_RecDep_DR->CTLOC_Desc ҽ�����ܿ���,OEORI_Billed �Ʒ�״̬,REA_Desc �ѱ�,OEORI_CoverMainIns ҽ����ʶ,
OEORI_SeqNo ������,OEORI_OEORI_DR ����ҽ��,
OEORI_Instr_DR->PHCIN_Desc1 ҽ���÷�,OEORI_PHFreq_DR->PHCFR_Desc2 ҽ��Ƶ��,OEORI_Durat_DR->PHCDU_Desc1 �Ƴ�,
OEORI_PrescNo ������,OEORI_LabEpisodeNo �걾��,OEORI_AppReport_DR ������뵥����,OEORI_OPMultDuraPYFlag ������Ƴ���Һ�÷���־,
OEORI_AdministerSkinTest �Ƿ�Ƥ��,OEORI_Abnormal Ƥ�Խ���Ƿ��쳣,DHCORI_SkinTestCtcp_Dr->CTPCP_Desc ��Ƥ�Խ����,DHCORI_SkinTestDate ��Ƥ�Խ������,DHCORI_SkinTestTime ��Ƥ�Խ��ʱ��,DHCORI_SkinTestAuditCtcp_Dr->CTPCP_Desc Ƥ�Խ�������,
OEORI_MaterialNo ��ֵ�Ĳ�����,

DHCORI_RefundAuditStatus �����˷����״̬,DHCORI_RefundAuditUser_Dr->SSUSR_Name �����˷�����û�,DHCORI_RefundAuditDate �����˷��������,DHCORI_RefundAuditTime �����˷����ʱ��,DHCORI_RefundReason �����˷����ԭ��
--,*
FROM OE_OrdItem		--ҽ����ϸ��
LEFT JOIN OE_Order ON OE_Order.OEORD_RowId1 = OE_OrdItem.OEORI_OEORD_ParRef		--OE_Orderҽ���������
LEFT JOIN Pa_Adm ON Pa_Adm.PAADM_RowID = OE_Order.OEORD_Adm_DR		--Pa_Adm��������
LEFT JOIN ARC_ItmMast ON ARC_ItmMast.ARCIM_RowId = OE_OrdItem.OEORI_ItmMast_DR		--ARC_ItmMastҽ��������
LEFT JOIN OEC_OrderStatus ON OEC_OrderStatus.OSTAT_RowId = OE_OrdItem.OEORI_ItemStat_DR		--OEC_OrderStatusҽ��״̬�����
LEFT JOIN OEC_Priority ON OEC_Priority.OECPR_RowId = OE_OrdItem.OEORI_Priority_DR		--OEC_Priorityҽ�����ȼ������
LEFT JOIN PAC_AdmReason ON PAC_AdmReason.REA_RowId = OE_OrdItem.OEORI_BBExtCode		--PAC_AdmReason�ѱ��ֵ�����
LEFT JOIN OE_OrdItemExt ON OE_OrdItemExt.OEORI_RowId = OE_OrdItem.OEORI_RowId		--OE_OrdItemExtҽ����ϸ��չ��
LEFT JOIN DHC_OE_OrdItem ON DHC_OE_OrdItem.DHCORI_OEORI_Dr = OE_OrdItem.OEORI_RowId		--DHC_OE_OrdItemҽ����ʿ��չ��

--PHC_Instruc�÷��ֵ��PHC_FreqƵ���ֵ��PHC_Duration �Ƴ��ֵ��
WHERE
--OEORI_AdministerSkinTest="Y"		--�����Ƿ�Ƥ�Բ�ѯ
Pa_Adm.PAADM_RowID="41545"		--���ݾ���Ų�ѯ
AND PAADM_Type="I"	--���ݾ������Ͳ�ѯ��I��סԺ��O�����E�����H�����
--AND OSTAT_Desc = "ֹͣ"		--����ҽ��״̬��ѯ
--AND OECPR_Desc = "����ҽ��"		--����ҽ�����ȼ���ѯ
--AND OEORI_Billed="P"	--���ݼƷ�״̬��ѯ��TB:δ�Ʒ�;B:�ѼƷ�;R:���˷�;I:���˷�;P:����
--AND DHCORI_RefundAuditStatus =""	--���������˷����״̬��ѯ��N:����;A:���;C:ȡ��


SELECT * FROM PA_PatMas WHERE PAPMI_RowId1=17780

SELECT a.PAADM_PAPMI_DR,b.PAPMI_Name,* FROM PA_Adm a,PA_PatMas b
WHERE a.PAADM_PAPMI_DR=b.PAPMI_RowId1
AND b.PAPMI_No="020000015986"
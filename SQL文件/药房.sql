

//ҽ���ӱ�(OE_Order���ӱ�) 
SELECT OEORI_PrescNo, * from OE_OrdItem  WHERE OEORI_OEORD_ParRef=14191 AND OEORI_PrescNo='E190406000047'

//ҽ����
SELECT * FROM ARC_ItmMast WHERE ARCIM_RowId='18323||1'

//ҽ��ִ�м�¼��չ�� 
SELECT * FROM OE_OrdExecExt WHERE OEORE_OEORI_ParRef IN ('14191||12','14191||14')



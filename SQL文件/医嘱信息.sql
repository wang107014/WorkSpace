
SELECT * FROM PA_PatMas 

SELECT * FROM PA_Adm WHERE PAADM_RowID="8505"

//ҽ������
SELECT * FROM OE_Order WHERE  OEORD_Adm_DR='8505'

SELECT * FROM OE_OrdItem WHERE OEORI_ItemStat_DR="12"

//ҽ���ӱ�
SELECT * FROM OE_OrdItem WHERE OEORI_ItmMast_DR->ARCIM_ItemCat_DR->ARCIC_Desc['��ʳ' 
AND OEORI_OEORD_ParRef->OEORD_Adm_DR='5743' 
AND OEORI_ItemStat_DR="4"      --ҽ��״̬

////ҽ�����
SELECT ARCIM_ItemCat_DR, * FROM ARC_ItmMast WHERE ARCIM_RowId IN ('1583||1')

//ҽ��״̬
SELECT * FROM OEC_OrderStatus WHERE OSTAT_RowId IN (2,4)

//ҽ���� 
SELECT * FROM ARC_ItmMast WHERE ARCIM_ItemCat_DR='65' AND ARCIM_RowId='19660||1'  

//ҽ���ӷ���
SELECT * FROM ARC_ItemCat WHERE ARCIC_Desc['��ʳ'

SELECT * FROM OEC_OrderStatus

SELECT * FROM SS_User WHERE SSUSR_Name['��'
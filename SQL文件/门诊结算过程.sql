
///��Ʊ��
SELECT PRT_OPCRoundErr, * FROM DHC_INVPRT WHERE PRT_Date='2019-6-5'
SELECT * FROM DHC_INVPRT WHERE PRT_PAPMI_DR=94

///��Ʊ֧����ʽ��
SELECT * FROM DHC_INVPayMode WHERE IPM_PRT_ParRef=383161

//��Ʊ�����ʵ���Ĺ�����
SELECT * FROM DHC_BillConINV WHERE DHCBCI_ADMDR=4223


///�˵���
SELECT * FROM DHC_PatientBill WHERE PB_Adm_Dr=4223

///����ҽ��������ϸ��
SELECT  * FROM DHC_PatBillOrder WHERE PBO_PB_ParRef='431043'

///�˵��շ���Ŀ��ϸ��
SELECT PBD_TARI_DR->TARI_Desc �շ���Ŀ, * FROM DHC_PatBillDetails WHERE PBD_PBO_ParRef['431043'



SELECT * FROM OE_Order WHERE OEORD_Adm_DR=4223
SELECT OEORI_Billed,OEORI_ItmMast_DR->ARCIM_Desc,OEORI_ARPBLItem_DR, * FROM OE_OrdItem WHERE OEORI_OEORD_ParRef=3779


SELECT * FROM DHC_AccManager WHERE AccM_PAPMI_DR=94
SELECT * FROM DHC_AccPayList WHERE AccPL_PAPMI_DR=94

////����Ʒ�ҩ���м��
SELECT PHA_PHW_DR->PHW_DESC, * FROM  DHC_PHARWIN

///��ҩ����
SELECT * FROM DHC_PHWINDOW


///�Һű�
SELECT Regfeetemp1, * FROM DHCRegistrationFee


///ҽ�����
SELECT TOP 100 * FROM ARC_ItmMast

///�շ���Ŀ��
SELECT TOP 100 * FROM DHC_TarItem
//����Ʊ��
SELECT * FROM dhc_invoice 

SELECT * FROM AR_Receipts WHERE ARRCP_RowId=2738
////��Ʊ���֧����ʽ��
SELECT * FROM ar_rcptpaymode 


///������뵥
SELECT * FROM DHC_AppRepTarItm    
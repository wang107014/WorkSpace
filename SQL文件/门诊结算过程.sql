
///发票表
SELECT PRT_OPCRoundErr, * FROM DHC_INVPRT WHERE PRT_Date='2019-6-4'

///发票支付方式表
SELECT * FROM DHC_INVPayMode WHERE IPM_PRT_ParRef=383164

//发票表与帐单表的关联表
SELECT * FROM DHC_BillConINV WHERE DHCBCI_ADMDR=4223


///账单表
SELECT * FROM DHC_PatientBill WHERE PB_Adm_Dr=4223

///病人医嘱费用明细表
SELECT  * FROM DHC_PatBillOrder WHERE PBO_PB_ParRef='431025'

///账单收费项目明细表
SELECT PBD_TARI_DR->TARI_Desc 收费项目, * FROM DHC_PatBillDetails WHERE PBD_PBO_ParRef['431025'


SELECT * FROM OE_Order WHERE OEORD_Adm_DR=4223
SELECT OEORI_Billed,OEORI_ItmMast_DR->ARCIM_Desc, * FROM OE_OrdItem WHERE OEORI_OEORD_ParRef=3779

  

///医嘱项表
SELECT TOP 100 * FROM ARC_ItmMast

///收费项目表
SELECT TOP 100 * FROM DHC_TarItem
//财务发票表
SELECT * FROM dhc_invoice 

SELECT * FROM AR_Receipts WHERE ARRCP_RowId=2738
////发票表的支付方式表
SELECT * FROM ar_rcptpaymode 

SELECT * FROM DHC_AppRepTarItm    
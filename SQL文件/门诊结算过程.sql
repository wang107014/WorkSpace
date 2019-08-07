
SELECT * FROM PA_PatMas WHERE PAPMI_No="020000000092"
SELECT * FROM DHC_INVPRT WHERE PRT_PAPMI_DR='95'

SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR='94'

SELECT PRT_OldINV_DR, * FROM DHC_INVPRT WHERE PRT_Date="2019-7-1"

SELECT * FROM DHC_BillExtTradePay WHERE ETP_Papmi_Dr='22104'


///发票表
SELECT PRT_OPCRoundErr, * FROM DHC_INVPRT WHERE PRT_Date='2019-6-5'
SELECT * FROM DHC_INVPRT WHERE PRT_PAPMI_DR=94

///发票支付方式表
SELECT * FROM DHC_INVPayMode WHERE IPM_PRT_ParRef=383161

//发票表与帐单表的关联表
SELECT * FROM DHC_BillConINV WHERE DHCBCI_ADMDR=36183


///账单表
SELECT * FROM DHC_PatientBill WHERE PB_Adm_Dr=4223

///病人医嘱费用明细表
SELECT  * FROM DHC_PatBillOrder WHERE PBO_PB_ParRef IN ('476091')


///账单收费项目明细表
SELECT PBD_TARI_DR->TARI_Desc 收费项目, * FROM DHC_PatBillDetails WHERE PBD_PBO_ParRef IN ('476091')



SELECT * FROM OE_Order WHERE OEORD_Adm_DR=36170
SELECT OEORI_PrescNo, OEORI_Billed,OEORI_ItmMast_DR->ARCIM_Desc,OEORI_ARPBLItem_DR, * FROM OE_OrdItem WHERE OEORI_OEORD_ParRef=30643


SELECT * FROM DHC_AccManager WHERE AccM_PAPMI_DR=94
SELECT * FROM DHC_AccPayList WHERE AccPL_PAPMI_DR=94

////门诊计费药房中间表
///PHA_FINFLAG:发药标志
SELECT PHA_PHW_DR->PHW_DESC,PHA_FINFLAG, * FROM  DHC_PHARWIN WHERE PHA_PRT_DR IN (414626)

SELECT PHA_PHW_DR->PHW_DESC,PHA_FINFLAG, * FROM  DHC_PHARWIN WHERE Pha_PrescNo IN ('O190701000005')

SELECT * FROM DHC_PHDISPEN

 

///发药窗口
SELECT * FROM DHC_PHWINDOW


///挂号表
SELECT Regfeetemp1, * FROM DHCRegistrationFee


///医嘱项表
SELECT TOP 100 * FROM ARC_ItmMast

///收费项目表
SELECT TOP 100 * FROM DHC_TarItem
//财务发票表
SELECT * FROM dhc_invoice 

SELECT * FROM AR_Receipts WHERE ARRCP_RowId=2738
////发票表的支付方式表
SELECT * FROM ar_rcptpaymode 


///检查申请单
SELECT * FROM DHC_AppRepTarItm    

SELECT * FROM CT_Loc WHERE CTLOC_RowID=84
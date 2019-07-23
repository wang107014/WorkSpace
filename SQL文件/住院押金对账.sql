///////////////////////////////////////住院押金对账//////////////////////////////////
//病人基本信息表
SELECT * FROM PA_PatMas WHERE PAPMI_No IN ('020000020377') --11650

//就诊表
SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR IN (22870) AND PAADM_Type="I"  --19467

//住院押金表
SELECT prt_adm_dr->PAADM_PAPMI_DR->PAPMI_Name,prt_adm_dr->PAADM_PAPMI_DR,* FROM dhc_sfprintdetail 
WHERE prt_paymode=4 AND prt_adm_dr IN ('40497')  


SELECT * FROM AR_RcptPayMode WHERE PAYM_ParRef IN (15507,15508)

//住院押金管理
SELECT * FROM AR_Receipts WHERE ARRCP_RowId IN (15507,15508)
SELECT * FROM AR_RcptAlloc WHERE ARRAL_ARRCP_ParRef IN (15388,15398)

///HIS交易明细子表
SELECT ETC_HISPRT_DR, * from DHC_BillExtTradeConSub WHERE ETC_TradeType="DEP" 
AND ETC_HISPRT_DR IN ('16297','16298')

SELECT * FROM DHC_BillExtTradePay WHERE ETP_PayMode=4 AND ETP_HisPrtStr IN ('16297','16298')
//His交易明细表
SELECT ETP_Papmi_Dr, * FROM DHC_BillExtTradePay WHERE ETP_PayMode=4 AND ETP_RowID IN (17513,17654)

SELECT ETP_Papmi_Dr, * FROM DHC_BillExtTradePay WHERE ETP_PayMode=4 AND ETP_TradeDate="2019-7-17"

//第三方交易明细表
SELECT * FROM DHC_BillExtTradeBalance WHERE   ETB_TradeDate="2019-7-17" -- ETB_OutTradeNo  IN ('101832255696','164737255822')


38896
38902
38905



SELECT F6.* FROM PA_PatMas F1,PA_Adm F2,dhc_sfprintdetail F3,DHC_BillExtTradeConSub F4,DHC_BillExtTradePay F5,DHC_BillExtTradeBalance F6
WHERE F2.PAADM_PAPMI_DR=F1.PAPMI_RowId1 AND F2.PAADM_Type="I"
AND F2.PAADM_RowID=F3.prt_adm_dr AND F3.prt_paymode="4"
AND F5.ETP_HisPrtStr=F3.prt_rowid
AND F5.ETP_ExtTradeNo=F6.ETB_OutTradeNo
AND F1.PAPMI_No="020000010596"
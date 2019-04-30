///////////////////////////////////////住院押金对账//////////////////////////////////
//病人基本信息表
SELECT * FROM PA_PatMas WHERE PAPMI_No IN ('020000000004') --11650

//就诊表
SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR IN (6) AND PAADM_Type="I"  --19467

//住院押金表
SELECT prt_adm_dr->PAADM_PAPMI_DR->PAPMI_Name,prt_adm_dr->PAADM_PAPMI_DR,* FROM dhc_sfprintdetail 
WHERE prt_paymode=4 AND prt_adm_dr IN ('22257')   --15247,15373
SELECT * FROM AR_RcptPayMode WHERE PAYM_ParRef IN (19211,19425)

//住院押金管理
SELECT * FROM AR_Receipts WHERE ARRCP_RowId IN (15388,15398)
SELECT * FROM AR_RcptAlloc WHERE ARRAL_ARRCP_ParRef IN (15388,15398)

///HIS交易明细子表
SELECT ETC_HISPRT_DR, * from DHC_BillExtTradeConSub WHERE ETC_TradeType="DEP" --14826
AND ETC_HISPRT_DR IN ('15388','15398')

SELECT * FROM DHC_BillExtTradePay WHERE ETP_PayMode=4 AND ETP_HisPrtStr IN ('15388','15398')
//His交易明细表
SELECT ETP_Papmi_Dr, * FROM DHC_BillExtTradePay WHERE ETP_PayMode=4 AND ETP_RowID IN (17513,17654)
//第三方交易明细表
SELECT * FROM DHC_BillExtTradeBalance WHERE ETB_OutTradeNo IN ('101832255696','164737255822')



SELECT F6.* FROM PA_PatMas F1,PA_Adm F2,dhc_sfprintdetail F3,DHC_BillExtTradeConSub F4,DHC_BillExtTradePay F5,DHC_BillExtTradeBalance F6
WHERE F2.PAADM_PAPMI_DR=F1.PAPMI_RowId1 AND F2.PAADM_Type="I"
AND F2.PAADM_RowID=F3.prt_adm_dr AND F3.prt_paymode="4"
AND F5.ETP_HisPrtStr=F3.prt_rowid
AND F5.ETP_ExtTradeNo=F6.ETB_OutTradeNo
AND F1.PAPMI_No="020000010596"
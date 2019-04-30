///////////////////////////////////////住院押金对账//////////////////////////////////
//病人基本信息表
SELECT * FROM PA_PatMas WHERE PAPMI_No IN ('020000000004') --11650

//就诊表
SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR IN (6) AND PAADM_Type="I"  --19467


SELECT * FROM DHC_INVPRTZY WHERE PRT_Adm=22257

'18977||2'
'18979||2'
'18981||2'
'18982||2'
'18984||2'
'18985||2'
'18986||2'
'18987||2'
'18988||2'
'18989||2'
'18990||2'
'18991||2'

SELECT ARRCP_AddTime, A2.* FROM AR_Receipts A1,AR_RcptPayMode A2, AR_RcptAlloc A3 WHERE ARRCP_Date="2019-4-24"
AND A1.ARRCP_RowId=A2.PAYM_ParRef 
AND A2.PAYM_PayMode_DR=4
AND A1.ARRCP_PAPMI_DR=6
AND A3.ARRAL_ARRCP_ParRef=A1.ARRCP_RowId


SELECT * FROM AR_RcptPayMode WHERE PAYM_PayMode_DR=4


SELECT * FROM AR_PatientBill

SELECT TOP 10 * FROM AR_RcptAlloc

//His交易明细表
SELECT * FROM DHC_BillExtTradePay WHERE ETP_Ext_Date="2019-4-24" AND ETP_PayMode=4 AND ETP_TradeType="IP" -- AND ETP_RowID IN (17394,17397,17399) 



SELECT ETC_HISPRT_DR, * from DHC_BillExtTradeConSub WHERE ETC_ETP_ParRef IN (17394,17397,17399)

'18977||2'
'18979||2'
'18981||2'
'18982||2'
'18984||2'
'18985||2'
'18986||2'
'18987||2'
'18988||2'
'18989||2'
'18990||2'
'18991||2'


SELECT * FROM DHC_BillExtTradeConSub WHERE ETC_ETP_ParRef=17390

INSERT INTO SQLUser.DHC_BillExtTradeConSub (ETC_ETP_ParRef, ETC_Sub, ETC_HISPRT_DR, ETC_ConsultStatus, ETC_PRTPayMode_DR, ETC_Status, ETC_TradeType)
VALUES (17399, 1, '18987||2', NULL, NULL, 'N', 'IP');

 

///HIS交易明细子表
SELECT ETC_HISPRT_DR, B1.* from DHC_BillExtTradeConSub B1,DHC_BillExtTradePay B2 
WHERE B1.ETC_ETP_ParRef=B2.ETP_RowID
AND B2.ETP_Ext_Date="2019-4-24" AND B2.ETP_PayMode=4 AND B2.ETP_TradeType="IP"





SELECT * FROM DHC_BillExtTradePay WHERE ETP_PayMode=4 AND ETP_HisPrtStr IN ('15388','15398')
//His交易明细表
SELECT ETP_HisPrtStr, * FROM DHC_BillExtTradePay WHERE ETP_Ext_Date="2019-4-24" AND ETP_PayMode=4 AND ETP_TradeType="IP" -- AND ETP_RowID IN (17394,17397,17399) 
//第三方交易明细表
SELECT * FROM DHC_BillExtTradeBalance WHERE ETB_TradeDate="2019-4-24" AND ETB_TradeTime>"20:13:04" --ETB_OutTradeNo IN ('212935255424')



SELECT F6.* FROM PA_PatMas F1,PA_Adm F2,dhc_sfprintdetail F3,DHC_BillExtTradeConSub F4,DHC_BillExtTradePay F5,DHC_BillExtTradeBalance F6
WHERE F2.PAADM_PAPMI_DR=F1.PAPMI_RowId1 AND F2.PAADM_Type="I"
AND F2.PAADM_RowID=F3.prt_adm_dr AND F3.prt_paymode="4"
AND F5.ETP_HisPrtStr=F3.prt_rowid
AND F5.ETP_ExtTradeNo=F6.ETB_OutTradeNo
AND F1.PAPMI_No="020000010596"
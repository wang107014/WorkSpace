

//住院押金表支付方式为银行卡
SELECT prt_adm_dr->PAADM_PAPMI_DR->PAPMI_No,prt_adm_dr->PAADM_PAPMI_DR->PAPMI_Name,* FROM dhc_sfprintdetail WHERE prt_paymode=4 --prt_adm_dr="17468"


//His交易明细表
//ETP_TradeType:住院押金(DEP)、门诊预交金(PRE)
SELECT ETP_Papmi_Dr, * FROM DHC_BillExtTradePay WHERE ETP_PayMode=4 AND ETP_Papmi_Dr IN (6662,10693,11196,11302,11405) AND ETP_Rc="00" AND ETP_TradeType="DEP"

//第三方交易明细表
SELECT * FROM DHC_BillExtTradeBalance WHERE ETB_OutTradeNo IN ('113943235391','152634249177','110641249070','183400249212','164244249692')

//His交易明细表
SELECT ETP_Papmi_Dr, * FROM DHC_BillExtTradePay WHERE ETP_PayMode=4 AND ETP_Papmi_Dr="11196"

//第三方交易明细表
SELECT * FROM DHC_BillExtTradeBalance WHERE ETB_OutTradeNo='110641249070'


///PRT_FairType:收费类型R:挂号，F：门诊收费、H：体检
SELECT PRT_FairType, * FROM DHC_INVPRT WHERE PRT_FairType="F"



SELECT * FROM DHC_INVPRT

SELECT * FROM DHC_PatientBill

//病人基本信息表
SELECT * FROM PA_PatMas WHERE PAPMI_No='020000010083'   --11029
SELECT * FROM PA_PatMas WHERE PAPMI_RowId1="7850"

//就诊表
SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR=11029 AND PAADM_Type="I"

//住院押金表
SELECT prt_adm_dr->PAADM_PAPMI_DR->PAPMI_No,prt_adm_dr->PAADM_PAPMI_DR,* FROM dhc_sfprintdetail WHERE prt_paymode=4 --prt_adm_dr="17468"

SELECT * FROM PA_Adm WHERE PAADM_RowID IN (10253,17892,16967,18017,18279)

SELECT * FROM CT_PayMode

SELECT * FROM PA_PatMas WHERE PAPMI_No='020000010238'   --11029
//住院押金管理
SELECT * FROM AR_Receipts WHERE ARRCP_PAPMI_DR="6662"  --13408
SELECT * FROM AR_RcptAlloc WHERE ARRAL_ARRCP_ParRef IN (7315,7899)
//发票表的支付方式表 
SELECT * FROM Ar_rcptpaymode WHERE PAYM_ParRef=7899



//住院发票表的支付方式
SELECT c.PAYM_PayMode_DR,* FROM DHC_INVPRTZY a,AR_Receipts b,Ar_rcptpaymode c WHERE a.PRT_ARRCP_DR=b.ARRCP_RowId
AND b.ARRCP_RowId=c.PAYM_ParRef --AND c.PAYM_PayMode_DR="4"



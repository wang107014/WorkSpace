
///////////////////////////////////////�����շѶ���//////////////////////////////////
//���˻�����Ϣ��
SELECT * FROM PA_PatMas WHERE PAPMI_No IN ('020000012299') --11650

//�����
SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR IN (13619) -- AND PAADM_Type="I"  --19467

SELECT * FROM DHC_BillConINV WHERE DHCBCI_ADMDR=22334

SELECT * FROM DHC_INVPRT WHERE PRT_Rowid IN ('399666','399675')

SELECT * FROM DHC_INVPayMode WHERE IPM_PRT_ParRef IN ('399666','399675')

SELECT A2.* FROM DHC_INVPRT A1,DHC_INVPayMode A2
WHERE A1.PRT_Rowid=A2.IPM_PRT_ParRef AND A2.IPM_PayMode_DR="4" 
AND A1.PRT_Rowid IN ('399666','399675')

///HIS������ϸ�ӱ�
SELECT ETC_HISPRT_DR, * from DHC_BillExtTradeConSub WHERE ETC_TradeType="PRE" AND ETC_HISPRT_DR="58728||2"--14826
AND ETC_HISPRT_DR IN ('399666','399675')

SELECT * FROM DHC_BillExtTradePay WHERE ETP_RowID=20491


SELECT * FROM DHC_BillExtTradePay WHERE ETP_PayMode=4 AND ETP_HisPrtStr IN ('15388','15398','399666','399675')
//His������ϸ��
SELECT ETP_Papmi_Dr, * FROM DHC_BillExtTradePay WHERE ETP_PayMode=4 AND ETP_RowID IN (17513,17654)
//������������ϸ��
SELECT * FROM DHC_BillExtTradeBalance WHERE ETB_OutTradeNo IN ('101832255696','164737255822')


 
SELECT ETP_PayMode,ETP_ExtTradeType, * FROM DHC_BillExtTradePay WHERE ETP_ExtTradeType="T"


///////////////////////////////Ԥ�������������//////////////////////////////
//Ԥ����
select * from DHC_AccPreDeposit WHERE AccPD_RowID="58728||2"

//Ԥ����֧����ʽ��
SELECT * FROM DHC_AccPrePayMode WHERE APPM_AccPD_ParRef="58728||2"

SELECT ETC_HISPRT_DR, * from DHC_BillExtTradeConSub WHERE ETC_TradeType="PE" AND ETC_HISPRT_DR="458036"

SELECT * FROM DHC_BillExtTradePay WHERE ETP_TradeType="PE" -- ETP_RowID=20358

SELECT PRT_REFINV_DR, * from DHC_PE_INVPRT WHERE PRT_ROWID=5935

///��������֧����
SELECT * FROM DHC_PE_TradeOrder

SELECT * FROM DHC_PatientBill WHERE PB_RowId='458036'

SELECT * FROM CT_PayMode
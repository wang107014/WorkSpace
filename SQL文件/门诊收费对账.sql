
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
SELECT ETC_HISPRT_DR, * from DHC_BillExtTradeConSub WHERE ETC_TradeType="OP" --14826
AND ETC_HISPRT_DR IN ('399666','399675')




SELECT * FROM DHC_BillExtTradePay WHERE ETP_PayMode=4 AND ETP_HisPrtStr IN ('15388','15398','399666','399675')
//His������ϸ��
SELECT ETP_Papmi_Dr, * FROM DHC_BillExtTradePay WHERE ETP_PayMode=4 AND ETP_RowID IN (17513,17654)
//������������ϸ��
SELECT * FROM DHC_BillExtTradeBalance WHERE ETB_OutTradeNo IN ('101832255696','164737255822')


 
SELECT ETP_PayMode,ETP_ExtTradeType, * FROM DHC_BillExtTradePay WHERE ETP_ExtTradeType="T"












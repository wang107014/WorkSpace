

//סԺѺ���֧����ʽΪ���п�
SELECT prt_adm_dr->PAADM_PAPMI_DR->PAPMI_No,prt_adm_dr->PAADM_PAPMI_DR->PAPMI_Name,* FROM dhc_sfprintdetail WHERE prt_paymode=4 --prt_adm_dr="17468"


//His������ϸ��
//ETP_TradeType:סԺѺ��(DEP)������Ԥ����(PRE)
SELECT ETP_Papmi_Dr, * FROM DHC_BillExtTradePay WHERE ETP_PayMode=4 AND ETP_Papmi_Dr IN (6662,10693,11196,11302,11405) AND ETP_Rc="00" AND ETP_TradeType="DEP"

//������������ϸ��
SELECT * FROM DHC_BillExtTradeBalance WHERE ETB_OutTradeNo IN ('113943235391','152634249177','110641249070','183400249212','164244249692')

//His������ϸ��
SELECT ETP_Papmi_Dr, * FROM DHC_BillExtTradePay WHERE ETP_PayMode=4 AND ETP_Papmi_Dr="11196"

//������������ϸ��
SELECT * FROM DHC_BillExtTradeBalance WHERE ETB_OutTradeNo='110641249070'


///PRT_FairType:�շ����ͣRR:�Һţ�F�������շѡ�H�����
SELECT PRT_FairType, * FROM DHC_INVPRT WHERE PRT_FairType="F"



SELECT * FROM DHC_INVPRT

SELECT * FROM DHC_PatientBill

//���˻�����Ϣ��
SELECT * FROM PA_PatMas WHERE PAPMI_No='020000010083'   --11029
SELECT * FROM PA_PatMas WHERE PAPMI_RowId1="7850"

//�����
SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR=11029 AND PAADM_Type="I"

//סԺѺ���
SELECT prt_adm_dr->PAADM_PAPMI_DR->PAPMI_No,prt_adm_dr->PAADM_PAPMI_DR,* FROM dhc_sfprintdetail WHERE prt_paymode=4 --prt_adm_dr="17468"

SELECT * FROM PA_Adm WHERE PAADM_RowID IN (10253,17892,16967,18017,18279)

SELECT * FROM CT_PayMode

SELECT * FROM PA_PatMas WHERE PAPMI_No='020000010238'   --11029
//סԺѺ�����
SELECT * FROM AR_Receipts WHERE ARRCP_PAPMI_DR="6662"  --13408
SELECT * FROM AR_RcptAlloc WHERE ARRAL_ARRCP_ParRef IN (7315,7899)
//��Ʊ���֧����ʽ�� 
SELECT * FROM Ar_rcptpaymode WHERE PAYM_ParRef=7899



//סԺ��Ʊ���֧����ʽ
SELECT c.PAYM_PayMode_DR,* FROM DHC_INVPRTZY a,AR_Receipts b,Ar_rcptpaymode c WHERE a.PRT_ARRCP_DR=b.ARRCP_RowId
AND b.ARRCP_RowId=c.PAYM_ParRef --AND c.PAYM_PayMode_DR="4"



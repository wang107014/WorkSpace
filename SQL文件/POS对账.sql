

//סԺѺ���֧����ʽΪ���п�
SELECT prt_adm_dr->PAADM_PAPMI_DR->PAPMI_No,prt_adm_dr->PAADM_PAPMI_DR->PAPMI_Name,* FROM dhc_sfprintdetail WHERE prt_paymode=4 --prt_adm_dr="17468"


//His������ϸ��
//ETP_TradeType:סԺѺ��(DEP)������Ԥ����(PRE)
SELECT ETP_Papmi_Dr, * FROM DHC_BillExtTradePay WHERE ETP_PayMode=4 AND ETP_Papmi_Dr IN (6662,10693,11196,11302,11405) AND ETP_Rc="00" AND ETP_TradeType="DEP"

//������������ϸ��
SELECT * FROM DHC_BillExtTradeBalance WHERE ETB_OutTradeNo IN ('113943235391','152634249177','110641249070','183400249212','164244249692')

//His������ϸ��
SELECT ETP_Papmi_Dr, * FROM DHC_BillExtTradePay WHERE ETP_PayMode=4 AND ETP_Papmi_Dr=11613

SELECT ETP_Papmi_Dr, * FROM DHC_BillExtTradePay WHERE ETP_TradeDate="2019-7-28"  AND ETP_TradeType="DEP" 
SELECT ETP_Papmi_Dr, * FROM DHC_BillExtTradePay WHERE ETP_ExtTradeNo='145449319197'
SELECT ETC_HISPRT_DR, * from DHC_BillExtTradeConSub WHERE ETC_TradeType="DEP" AND ETC_HISPRT_DR IN ('15373','15247','15313')

//������������ϸ��
SELECT * FROM DHC_BillExtTradeBalance WHERE ETB_OutTradeNo IN ('145449319197')

SELECT * FROM DHC_BillExtTradeBalance WHERE ETB_TradeDate="2019-7-28"--and ETB_TradeDate<"2019-7-27"

SELECT * FROM PA_PatMas WHERE PAPMI_Name['�´�Ⱥ'

///PRT_FairType:�շ����ͣRR:�Һţ�F�������շѡ�H�����
SELECT PRT_FairType, * FROM DHC_INVPRT WHERE PRT_FairType="F"


SELECT * FROM DHC_INVPRT

SELECT * FROM DHC_PatientBill

//���˻�����Ϣ��
SELECT * FROM PA_PatMas WHERE PAPMI_No IN ('020000011054','020000000004','020000010596')   --11029
SELECT * FROM PA_PatMas WHERE PAPMI_RowId1="7850"

//�����
SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR IN (12157,6,11650) AND PAADM_Type="I"

//סԺѺ���
SELECT prt_adm_dr->PAADM_PAPMI_DR->PAPMI_No,prt_adm_dr->PAADM_PAPMI_DR,* FROM dhc_sfprintdetail 
WHERE prt_paymode=4 AND prt_adm_dr IN ('19467')
//סԺѺ�����
SELECT * FROM AR_Receipts WHERE ARRCP_RowId IN (15265)
SELECT * FROM AR_RcptAlloc WHERE ARRAL_ARRCP_ParRef IN (15265)



SELECT * FROM PA_Adm WHERE PAADM_RowID IN (10253,17892,16967,18017,18279)

SELECT * FROM CT_PayMode

SELECT * FROM PA_PatMas WHERE PAPMI_No='020000010596'   --11029
//סԺѺ�����
SELECT * FROM AR_Receipts WHERE ARRCP_RowId IN (19211,19425)
SELECT * FROM AR_RcptAlloc WHERE ARRAL_ARRCP_ParRef IN (17168)

//��Ʊ���֧����ʽ�� 
SELECT * FROM Ar_rcptpaymode WHERE PAYM_ParRef IN (15265)



//סԺ��Ʊ���֧����ʽ
SELECT c.PAYM_PayMode_DR,* FROM DHC_INVPRTZY a,AR_Receipts b,Ar_rcptpaymode c WHERE a.PRT_ARRCP_DR=b.ARRCP_RowId
AND b.ARRCP_RowId=c.PAYM_ParRef --AND c.PAYM_PayMode_DR="4"

///��������֧����
SELECT * FROM DHC_PE_TradeOrder


SELECT * FROM SS_User WHERE SSUSR_Name['��'
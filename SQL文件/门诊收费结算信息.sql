SELECT * FROM PA_PatMas WHERE PAPMI_No="020000023285"

///PAADM_AdmReason_DR:�ѱ�
SELECT PAADM_AdmReason_DR, * FROM PA_Adm WHERE PAADM_PAPMI_DR=26143

SELECT * FROM DHC_BillConINV WHERE DHCBCI_ADMDR=31905

////////////////////////��Ʊ��////////////////////////////////////
///PRT_InsType_DR:����ѱ�
///PRT_ACCPINV_DR:���д�ӡ��Ʊid
SELECT * FROM DHC_INVPRT WHERE PRT_Rowid IN ('412808')         ---����id��
SELECT PRT_InsType_DR,PRT_ACCPINV_DR,PRT_ARRCP_DR, * FROM DHC_INVPRT WHERE PRT_PAPMI_DR=17558     ---���ݲ���id��
SELECT PRT_initInv_DR,PRT_OldINV_DR, * FROM DHC_INVPRT WHERE PRT_ACCPINV_DR IN ('23942','23943')                 ---���ݼ��д�ӡ��Ʊid��


///��Ʊ��ͼ��д�ӡ��Ʊ��Ĺ�����
select * from DHC_AccPINVCONPRT WHERE ACP_APINV_DR IN (23942,23943,23949)

SELECT * FROM AR_Receipts WHERE ARRCP_RowId='30740'



///��Ʊ֧����ʽ��
SELECT * FROM DHC_INVPayMode WHERE IPM_PRT_ParRef='411238'

//���д�ӡ��Ʊ
SELECT API_INVRep_DR,* from DHC_AccPayINV WHERE API_RowID IN (23942,23943,23949)

///���д�ӡ��Ʊ֧����ʽ��
SELECT * FROM DHC_AccPayINVMode WHERE APM_API_ParRef IN  (23942,23943,23949)

SELECT * FROM CT_PayMode WHERE CTPM_RowId=6


////HIS���ױ�
SELECT * FROM DHC_BillExtTradeConSub WHERE ETC_HISPRT_DR=411175
SELECT * FROM DHC_BillExtTradePay WHERE ETP_RowID=25481

//�˵�����
SELECT * FROM DHC_PatientBill WHERE PB_RowId IN ('468325')

SELECT * FROM SS_User WHERE SSUSR_RowId=7572

///�ʵ��ķѱ��PAC_ADMReason  
SELECT * FROM PAC_AdmReason WHERE REA_RowId=1


///������Ŀ��Ӧ���ⲿcodeid
SELECT * FROM ARC_ItemExternalCodes WHERE EXT_Desc['����'

///CRM�뷢Ʊ��Ĺ�����
SELECT * FROM DHC_CRMPayCONPRT

//�����
SELECT PAADM_AdmReason_DR,PAADM_MainMRADM_DR, * FROM PA_Adm WHERE PAADM_AdmReason_DR=36

//������Ժ�����ֵ� 
SELECT REA_NationalCode, * FROM PAC_AdmReason WHERE REA_RowId IN (1,36)

SELECT TOP 100 * FROM MR_Adm WHERE MRADM_RowId=12509

SELECT * FROM PA_Adm WHERE PAADM_RowID=36716
SELECT * FROM PA_PatMas WHERE PAPMI_RowId1=16624

////ҽ��������Ϣ
///INADM_States:ͳ����
SELECT TOP 100 INADM_States,INADM_InsuType, * FROM INSU_AdmInfo WHERE 
INADM_States IN ('340121','340181','340122','340124','340199')
AND INADM_ActiveFlag="A"
AND INADM_AdmDate="2019-06-20"

///ҽ��������Ϣ
SELECT TOP 100 INPAY_djlsh0, * FROM INSU_Divide 

//ҽ���ֵ�ά�� 
///INDID_DicDesc:ҽ������(ͳ����)
SELECT TOP 1000 * FROM INSU_DicData WHERE INDID_DicCode IN ('340121','340181','340122','340124','340199')

SELECT TOP 1000 * FROM INSU_DicData WHERE INDID_DicCode['AHAY'

select * from INSU_DicData WHERE INDID_DicDesc['���'


//ҽ�����ؼ��ұ���
SELECT TOP 100 * FROM INSU_DivideSub


SELECT INADM_InsuType, * from INSU_AdmInfo WHERE INADM_InsuType['AHC'


///ҽ���շ������ֽ��,�����㷨ר��
SELECT * FROM INSU_DivideSubInsuCat

///ҽ������Ŀ¼�ֵ䣨ҩƷ�����ơ�������ʩ��
SELECT TOP 100 * FROM INSU_TarItems
///ҽ������Ŀ¼���� 
SELECT TOP 100 * FROM INSU_TarContrast


///ҽ���շ������ֽ��
SELECT * FROM INSU_DivideSubInsuCat

///ҽ���걨��Ϣ
SELECT * FROM INSU_Report

///ҽ��ת���¼��
SELECT * FROM INSU_ReferralInfo

///ҽ�����
SELECT * FROM DHC_ItmInsuCategory

SELECT * FROM DHC_OPRegInsuComp

SELECT * FROM SS_User WHERE SSUSR_Name['����'

/////////////////////////////////////////����ҽ����������ϱ�////////////////////////////////////////////////
SELECT * FROM OE_Order WHERE OEORD_RowId1="34666"
SELECT OEORI_UnitCost, * FROM OE_OrdItem WHERE OEORI_OEORD_ParRef='34666'
SELECT * FROM ARC_ItmMast WHERE ARCIM_RowId='18980||1'

///�շ���Ŀ��ҽ�����Ӧ�� 
SELECT * FROM DHC_OrderLinkTar WHERE OLT_ARCIM_DR='18980||1'
///�շ���Ŀ�� 
SELECT * FROM DHC_TarItem WHERE TARI_RowId="18544"


///ҽ������Ŀ¼�ֵ䣨ҩƷ�����ơ�������ʩ��
SELECT TOP 100 * FROM INSU_TarItems WHERE INTIM_Rowid=488395
///ҽ������Ŀ¼���� 
SELECT TOP 100 INTCT_His_Dr,INTCT_DicType,INTCT_ActiveDate, * FROM INSU_TarContrast WHERE INTCT_His_Dr=18331


SELECT INTIM_xmbm AS ҽ����Ŀ����,INTCT_InsuDesc AS ҽ����Ŀ����, b.* FROM INSU_TarContrast a,INSU_TarItems b
WHERE a.INTCT_Insu_Dr=b.INTIM_Rowid
AND a.INTCT_His_Dr=18331



SELECT OEORI_RowId AS ҽ������id, TARI_RowId AS �շ���id,TARI_Code AS �շ������,TARI_Desc AS �շ�������,OEORI_UnitCost AS ����
FROM OE_OrdItem a,ARC_ItmMast b,DHC_OrderLinkTar c,DHC_TarItem d
WHERE a.OEORI_ItmMast_DR=b.ARCIM_RowId
AND c.OLT_ARCIM_DR=b.ARCIM_RowId
AND c.OLT_Tariff_DR=d.TARI_RowId
AND a.OEORI_OEORD_ParRef='34666'


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////����ҽ��������ϸ��ѯ/////////////////////////////////////////

SELECT * FROM PA_PatMas WHERE PAPMI_No="020000016692"

SELECT PRT_InsDiv_DR, * FROM dhc_invprt WHERE PRT_Date="2019-7-3" AND PRT_Flag="N" AND PRT_InsDiv_DR!="NULL" AND PRT_PAPMI_DR=18553
SELECT TOP 100 INPAY_djlsh0, * FROM INSU_Divide WHERE INPAY_Rowid=2910

SELECT * FROM DHC_BillConINV WHERE DHCBCI_INVDR=425023
SELECT * FROM DHC_PatientBill WHERE PB_RowId='482471'

///ҽ���շ���ֽ�� 
///INDIS_Flag:"I":"δ�ϴ�","N":"���ϴ�",:"����"
////����ҽ����ϸ����
SELECT INDIS_INSUCode AS ҽ�����,INDIS_INSUDesc AS ҽ������,INDIS_INSUXMLB AS ҽ���ȼ�,INDIS_Qty AS ����,
INDIS_Price AS �۸�,INDIS_Amount AS ���,TARC_Desc AS ��ĿסԺ����, INDIS_Scale AS �Ը�����,INDIS_Fund AS ͳ��֧��,
INDIS_Self AS �����Ը�,INDIS_Flag AS �ϴ���־,* 
FROM INSU_DivideSub a,DHC_TarCate b
WHERE INDIS_PB_Dr="482471"
AND a.INDIS_TarCate=b.TARC_RowId

////�շ���Ŀ��(�����벡���շ��й�) 
SELECT * FROM DHC_TarCate  WHERE TARC_RowId=1


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////













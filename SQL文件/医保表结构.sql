
//�����
SELECT PAADM_AdmReason_DR, * FROM PA_Adm WHERE PAADM_AdmReason_DR=36

//������Ժ�����ֵ� 
SELECT REA_NationalCode, * FROM PAC_AdmReason WHERE REA_RowId IN (1,36)

SELECT * FROM PA_Adm WHERE PAADM_RowID=21731

////ҽ��������Ϣ
///INADM_States:ͳ����
SELECT INADM_States,INADM_InsuType, * FROM INSU_AdmInfo WHERE INADM_States IN ('340121','340181','340122','340124','340199')

///ҽ��������Ϣ
SELECT TOP 100 * FROM INSU_Divide 

//ҽ���ֵ�ά�� 
///INDID_DicDesc:ҽ������(ͳ����)
SELECT TOP 100 * FROM INSU_DicData WHERE INDID_DicCode IN ('340121','340181','340122','340124','340199')



//ҽ�����ؼ��ұ���
SELECT TOP 100 * FROM INSU_DivideSub


///ҽ���շ������ֽ��,�����㷨ר��
SELECT * FROM INSU_DivideSubInsuCat

///ҽ������Ŀ¼�ֵ䣨ҩƷ�����ơ�������ʩ��
SELECT TOP 100 * FROM INSU_TarItems

SELECT TOP 100 * FROM INSU_TarContrast


///ҽ���걨��Ϣ
SELECT * FROM INSU_Report

///ҽ��ת���¼��
SELECT * FROM INSU_ReferralInfo




SELECT * FROM SS_User WHERE SSUSR_Name['����'


//PRT_inv:��Ʊ�վݺ�
SELECT * FROM DHC_INVPRTZY WHERE PRT_Adm="13745" 



//PB_PatInsType_DR:ҽ������
SELECT PB_PatInsType_DR, * FROM DHC_PatientBill  WHERE PB_RowId="442462"

//ҽ������
select * from PAC_AdmReason WHERE REA_RowId=36

SELECT * FROM PA_Adm WHERE PAADM_RowID="15853"

SELECT * FROM DHC_PatientBill WHERE PB_Adm_Dr="15853"

SELECT * FROM DHC_INVPRTZY WHERE PRT_Adm="15853"

//ҽ��������Ϣ
SELECT * FROM INSU_Divide WHERE INPAY_DHCpblDr='442462'

//ҽ��������Ϣ
select * from INSU_AdmInfo WHERE INADM_Rowid='186'


//////////ҽ��������Ϣ

//INADM_AdmSeriNo:ҽ����
//INPAY_zhzfe0:�����˻�֧��
//INPAY_grzfe0:�����ֽ�
//INPAY_jjzfe0:ͳ�����֧��
//INPAY_bcbxf0:�ϼƽ��
SELECT INADM_AdmSeriNo,INPAY_zhzfe0,INPAY_grzfe0,INPAY_jjzfe0,INPAY_bcbxf0
from INSU_Divide ybjs,DHC_PatientBill pb,INSU_AdmInfo ybjz
WHERE ybjs.INPAY_DHCpblDr=pb.PB_RowId
AND ybjs.INPAY_AdmInfoDr=ybjz.INADM_Rowid
AND pb.PB_RowId="442462"

//��ѯҽ������
//REA_Desc:ҽ������


SELECT REA_Desc,* FROM DHC_PatientBill pb,PAC_AdmReason yblx ,DHC_INVPRTZY zyfp
WHERE pb.PB_PatInsType_DR=yblx.REA_RowId
AND zyfp.PRT_ARPBL=pb.PB_RowId
AND pb.PB_RowId="444285"



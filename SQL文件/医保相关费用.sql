

//PRT_inv:发票收据号
SELECT * FROM DHC_INVPRTZY WHERE PRT_Adm="13745" 



//PB_PatInsType_DR:医保分类
SELECT PB_PatInsType_DR, * FROM DHC_PatientBill  WHERE PB_RowId="442462"

//医保类型
select * from PAC_AdmReason WHERE REA_RowId=36

SELECT * FROM PA_Adm WHERE PAADM_RowID="15853"

SELECT * FROM DHC_PatientBill WHERE PB_Adm_Dr="15853"

SELECT * FROM DHC_INVPRTZY WHERE PRT_Adm="15853"

//医保结算信息
SELECT * FROM INSU_Divide WHERE INPAY_DHCpblDr='442462'

//医保就诊信息
select * from INSU_AdmInfo WHERE INADM_Rowid='186'


//////////医保结算信息

//INADM_AdmSeriNo:医保号
//INPAY_zhzfe0:个人账户支付
//INPAY_grzfe0:个人现金
//INPAY_jjzfe0:统筹基金支付
//INPAY_bcbxf0:合计金额
SELECT INADM_AdmSeriNo,INPAY_zhzfe0,INPAY_grzfe0,INPAY_jjzfe0,INPAY_bcbxf0
from INSU_Divide ybjs,DHC_PatientBill pb,INSU_AdmInfo ybjz
WHERE ybjs.INPAY_DHCpblDr=pb.PB_RowId
AND ybjs.INPAY_AdmInfoDr=ybjz.INADM_Rowid
AND pb.PB_RowId="442462"

//查询医保类型
//REA_Desc:医保名称


SELECT REA_Desc,* FROM DHC_PatientBill pb,PAC_AdmReason yblx ,DHC_INVPRTZY zyfp
WHERE pb.PB_PatInsType_DR=yblx.REA_RowId
AND zyfp.PRT_ARPBL=pb.PB_RowId
AND pb.PB_RowId="444285"



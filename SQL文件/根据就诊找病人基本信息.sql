/////////////////////////////���ݾ����Ҳ��˻�����Ϣ////////////////////////////////////
SELECT * FROM PA_PatMas WHERE PAPMI_No='020000001401'
SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR="1287"

SELECT * FROM PA_Person WHERE PAPER_RowId=94
SELECT * FROM PA_Adm WHERE PAADM_RowID="4081"

//PAPMI_IPNo:סԺ��
//PAPMI_Name:����
//sex.CTSEX_Desc:�Ա�
//PAPER_NokAddress2:��ַ

SELECT PAPMI_IPNo,PAPMI_Name,sex.CTSEX_Desc,PAPER_NokAddress2
FROM PA_PatMas patm,CT_Sex sex,PA_Person per,PA_Adm jz
WHERE PAPMI_RowId1=94 
AND patm.PAPMI_Sex_DR=sex.CTSEX_RowId 
AND patm.PAPMI_RowId1=per.PAPER_RowId
AND jz.PAADM_PAPMI_DR=patm.PAPMI_RowId1


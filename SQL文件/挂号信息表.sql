
SELECT * FROM SS_User WHERE SSUSR_Name['Ѧ��'

SELECT * FROM PA_PatMas WHERE PAPMI_Name['����'

SELECT PAADM_PreAdmitDate, * FROM PA_Adm --WHERE PAADM_PAPMI_DR=36178

SELECT * FROM CT_Loc WHERE CTLOC_RowID IN (30,9)

///�Һű�
SELECT TOP 100 RegfeeTime, * FROM DHCRegistrationFee WHERE RegfeeAdmDr=67417

///�ҺŶ���
SELECT TOP  100  QueStateDr->PersName,QueStateDr,* FROM DHCQueue WHERE QueDate="2019-6-20" AND QuePaadmDr="35506"

///����״̬��
SELECT * FROM DHCPerState

//�ҺŻ������ݱ� 
SELECT WR_Status,WR_PAPMI_DR->PAPMI_Name, * FROM DHCWorkRegReport WHERE WR_ADMDate="2019-6-20"

SELECT TOP 100 * FROM PA_PatMas 

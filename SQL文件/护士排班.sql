select * from DHCMGNUR.MgNurArgJob WHERE Ward_DR=189

SELECT * FROM DHCMGNUR.MgNurPost

//��ʿ�����Ű��
SELECT * FROM DHCMGNUR.MgNurArrangeJob WHERE  AJ_Date>65292 AND AJ_WardDR=189  AND AJ_Nurse='10075233' 

//��ʿ�Ű��
select * from DHCMGNUR.MgNurArgJobChild WHERE Ward_DR=189 AND Nurse_DR='10075233'

//��ʿ
select * from DHCMGNUR.MgNurArgJobNurInfo WHERE Ward_ID=189

SELECT * FROM SS_User WHERE SSUSR_Initials='10115122'
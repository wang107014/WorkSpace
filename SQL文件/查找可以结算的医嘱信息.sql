SELECT * FROM PA_Adm WHERE PAADM_RowID=33970
SELECT * FROM PAC_AdmReason

SELECT * FROM OE_OrdItem WHERE OEORI_OEORD_ParRef=3545

SELECT * FROM OEC_Priority

SELECT * FROM OEC_OrderStatus

SELECT * FROM DHC_INVPRT WHERE PRT_Rowid="398312"

SELECT * FROM DHC_BillConINV WHERE DHCBCI_INVDR="398312"

SELECT * FROM PA_Adm WHERE PAADM_RowID='21650'

SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR="13245"

SELECT * FROM ARC_ItmMast WHERE ARCIM_RowId='1672||1'


SELECT * FROM OE_Order WHERE OEORD_Adm_DR=33970
SELECT OEORI_Date, OEORI_TimeOrd,OEORI_ItmMast_DR->ARCIM_Desc,* FROM OE_OrdItem WHERE OEORI_OEORD_ParRef=28735  AND OEORI_OrdDept_DR=48 AND OEORI_RowId IN ("28735||140","28735||149","28735||155","28735||145")


///ҽ���ӷ��� 
select * from ARC_ItemCat WHERE ARCIC_RowId IN (57,58)
 
//ҽ������ 
SELECT * FROM OEC_OrderCategory WHERE ORCAT_RowId=8


/////////////////////////////////���ҿ��Խ����ҽ����Ϣ////////////////////////////////////
///OEORI_Priority_DR--ҽ������
///yzzb.OEORI_Billed--ҽ������״̬
///yzzb.OEORI_AdministerSkinTest --�Ƿ���Ƥ��ҽ��
///OEORI_ItemStat_DR  --ҽ��״̬
SELECT 
aim.ARCIM_Desc,
yzzb.OEORI_Priority_DR,yzzb.OEORI_Billed,yzzb.OEORI_AdministerSkinTest,
yzlxb.OECPR_Desc,
yzzt.OSTAT_Desc,
yzzb.*
from 
PA_Adm jzb,    --�����
OE_Order yzb,   --ҽ������
OE_OrdItem yzzb, --ҽ���ӱ�
OEC_Priority yzlxb, --ҽ�����ͱ�(����,��ʱ) 
OEC_OrderStatus yzzt, --ҽ��״̬��
ARC_ItmMast aim
WHERE yzb.OEORD_Adm_DR=jzb.PAADM_RowID
AND yzzb.OEORI_OEORD_ParRef=yzb.OEORD_RowId1   --ҽ�������ҽ���ӱ����
AND yzzb.OEORI_Priority_DR=yzlxb.OECPR_RowId   --ҽ���ӱ��ҽ�����ͱ����
AND yzzb.OEORI_ItemStat_DR=yzzt.OSTAT_RowId    --ҽ���ӱ��ҽ��״̬�����
AND yzzb.OEORI_ItmMast_DR=aim.ARCIM_RowId
AND OEORD_Adm_DR='21650'


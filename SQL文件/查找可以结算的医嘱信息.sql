SELECT * FROM PA_PatMas WHERE PAPMI_No="020000020756"
SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR=23286
SELECT * FROM PAC_AdmReason

SELECT * FROM OE_OrdItem WHERE OEORI_OEORD_ParRef=3545

SELECT * FROM OEC_Priority

SELECT * FROM OEC_OrderStatus

SELECT * FROM DHC_INVPRT WHERE PRT_Rowid="398312"

SELECT * FROM DHC_BillConINV WHERE DHCBCI_INVDR="398312"

SELECT * FROM PA_Adm WHERE PAADM_RowID='21650'

SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR="13245"

SELECT TOP 100 ARCIM_BillingUOM_DR, * FROM ARC_ItmMast WHERE ARCIM_RowId='1672||1'

///ҽ�����շ���Ŀ������
SELECT * FROM dhc_orderlinktar
///������Ŀ��
SELECT * FROM DHC_TarItem
///������Ŀ�۸��
SELECT * FROM DHC_TarItemPrice


SELECT * FROM OE_Order WHERE OEORD_Adm_DR=47606
SELECT OEORI_Date, OEORI_TimeOrd,OEORI_ItmMast_DR->ARCIM_Desc,* FROM OE_OrdItem 
WHERE OEORI_OEORD_ParRef=42275
--  AND OEORI_OrdDept_DR=48 
--AND OEORI_RowId IN ("28735||140","28735||149","28735||155","28735||145")


///ҽ���ӷ��� 
select * from ARC_ItemCat WHERE ARCIC_RowId IN (57,58)
 
//ҽ������ 
SELECT * FROM OEC_OrderCategory WHERE ORCAT_RowId=8

///��λ
SELECT TOP 100 * from CT_UOM


/////////////////////////////////���ݾ���id���ҿ��Խ����ҽ����Ϣ////////////////////////////////////
///OEORI_Priority_DR--ҽ������
///yzzb.OEORI_Billed--ҽ������״̬
///yzzb.OEORI_AdministerSkinTest --�Ƿ���Ƥ��ҽ��
///OEORI_ItemStat_DR  --ҽ��״̬

SELECT 
aim.ARCIM_Desc AS ҽ������,
yzzb.OEORI_Billed AS ҽ������״̬,yzzb.OEORI_AdministerSkinTest AS �Ƿ�Ƥ��,
yzlxb.OECPR_Desc AS ҽ������,
yzzt.OSTAT_Desc AS ҽ��״̬,
OEORI_PrescNo AS ������,
OEORI_Date AS ��ҽ������,
OEORI_TimeOrd AS ��ҽ��ʱ��,
ARCIM_BillingUOM_DR->CTUOM_Desc AS ҽ����λ,
OEORI_QtyPackUOM AS ҽ������
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
AND OEORD_Adm_DR='36373'

//////////////���ݾ���id��ѯҽ���۸�///////////////////////

SELECT TARI_Desc AS ��Ŀ����,TP_Price AS ��Ŀ�۸�,ARCIM_RowId AS ��Ŀid,OLT_Qty	AS �Ʒ�����,
a.* 
FROM DHC_TarItemPrice a,DHC_TarItem b,dhc_orderlinktar c,OE_OrdItem d,OE_Order e ,ARC_ItmMast f
WHERE a.TP_TARI_ParRef=b.TARI_RowId
AND c.OLT_Tariff_DR=b.TARI_RowId
AND a.TP_ChildSub IN (select max(TP_ChildSub) from DHC_TarItemPrice WHERE TP_TARI_ParRef=b.TARI_RowId)
AND d.OEORI_OEORD_ParRef=e.OEORD_RowId1
AND d.OEORI_ItmMast_DR=f.ARCIM_RowId
AND c.OLT_ARCIM_DR=f.ARCIM_RowId
AND e.OEORD_Adm_DR='36373'

/////���ݵǼǺŲ�ѯ����id
SELECT PAPMI_Name AS ����,PAPMI_No AS �ǼǺ�,PAPMI_RowId1 AS ����id,PAADM_RowID AS ����id,PAADM_AdmDate AS ����ʱ��
FROM PA_Adm a,PA_PatMas b
WHERE a.PAADM_PAPMI_DR=b.PAPMI_RowId1
AND b.PAPMI_No="020000020875"
ORDER BY a.PAADM_AdmDate DESC
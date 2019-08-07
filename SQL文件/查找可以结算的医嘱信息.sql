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

///医嘱与收费项目关联表
SELECT * FROM dhc_orderlinktar
///费用项目表
SELECT * FROM DHC_TarItem
///费用项目价格表
SELECT * FROM DHC_TarItemPrice


SELECT * FROM OE_Order WHERE OEORD_Adm_DR=47606
SELECT OEORI_Date, OEORI_TimeOrd,OEORI_ItmMast_DR->ARCIM_Desc,* FROM OE_OrdItem 
WHERE OEORI_OEORD_ParRef=42275
--  AND OEORI_OrdDept_DR=48 
--AND OEORI_RowId IN ("28735||140","28735||149","28735||155","28735||145")


///医嘱子分类 
select * from ARC_ItemCat WHERE ARCIC_RowId IN (57,58)
 
//医嘱大类 
SELECT * FROM OEC_OrderCategory WHERE ORCAT_RowId=8

///单位
SELECT TOP 100 * from CT_UOM


/////////////////////////////////根据就诊id查找可以结算的医嘱信息////////////////////////////////////
///OEORI_Priority_DR--医嘱类型
///yzzb.OEORI_Billed--医嘱结算状态
///yzzb.OEORI_AdministerSkinTest --是否是皮试医嘱
///OEORI_ItemStat_DR  --医嘱状态

SELECT 
aim.ARCIM_Desc AS 医嘱名称,
yzzb.OEORI_Billed AS 医嘱结算状态,yzzb.OEORI_AdministerSkinTest AS 是否皮试,
yzlxb.OECPR_Desc AS 医嘱类型,
yzzt.OSTAT_Desc AS 医嘱状态,
OEORI_PrescNo AS 处方号,
OEORI_Date AS 开医嘱日期,
OEORI_TimeOrd AS 开医嘱时间,
ARCIM_BillingUOM_DR->CTUOM_Desc AS 医嘱单位,
OEORI_QtyPackUOM AS 医嘱数量
from 
PA_Adm jzb,    --就诊表
OE_Order yzb,   --医嘱主表
OE_OrdItem yzzb, --医嘱子表
OEC_Priority yzlxb, --医嘱类型表(长期,临时) 
OEC_OrderStatus yzzt, --医嘱状态表
ARC_ItmMast aim
WHERE yzb.OEORD_Adm_DR=jzb.PAADM_RowID
AND yzzb.OEORI_OEORD_ParRef=yzb.OEORD_RowId1   --医嘱主表和医嘱子表关联
AND yzzb.OEORI_Priority_DR=yzlxb.OECPR_RowId   --医嘱子表和医嘱类型表关联
AND yzzb.OEORI_ItemStat_DR=yzzt.OSTAT_RowId    --医嘱子表和医嘱状态表关联
AND yzzb.OEORI_ItmMast_DR=aim.ARCIM_RowId
AND OEORD_Adm_DR='36373'

//////////////根据就诊id查询医嘱价格///////////////////////

SELECT TARI_Desc AS 项目名称,TP_Price AS 项目价格,ARCIM_RowId AS 项目id,OLT_Qty	AS 计费数量,
a.* 
FROM DHC_TarItemPrice a,DHC_TarItem b,dhc_orderlinktar c,OE_OrdItem d,OE_Order e ,ARC_ItmMast f
WHERE a.TP_TARI_ParRef=b.TARI_RowId
AND c.OLT_Tariff_DR=b.TARI_RowId
AND a.TP_ChildSub IN (select max(TP_ChildSub) from DHC_TarItemPrice WHERE TP_TARI_ParRef=b.TARI_RowId)
AND d.OEORI_OEORD_ParRef=e.OEORD_RowId1
AND d.OEORI_ItmMast_DR=f.ARCIM_RowId
AND c.OLT_ARCIM_DR=f.ARCIM_RowId
AND e.OEORD_Adm_DR='36373'

/////根据登记号查询就诊id
SELECT PAPMI_Name AS 姓名,PAPMI_No AS 登记号,PAPMI_RowId1 AS 病人id,PAADM_RowID AS 就诊id,PAADM_AdmDate AS 就诊时间
FROM PA_Adm a,PA_PatMas b
WHERE a.PAADM_PAPMI_DR=b.PAPMI_RowId1
AND b.PAPMI_No="020000020875"
ORDER BY a.PAADM_AdmDate DESC
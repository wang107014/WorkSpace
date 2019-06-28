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


///医嘱子分类 
select * from ARC_ItemCat WHERE ARCIC_RowId IN (57,58)
 
//医嘱大类 
SELECT * FROM OEC_OrderCategory WHERE ORCAT_RowId=8


/////////////////////////////////查找可以结算的医嘱信息////////////////////////////////////
///OEORI_Priority_DR--医嘱类型
///yzzb.OEORI_Billed--医嘱结算状态
///yzzb.OEORI_AdministerSkinTest --是否是皮试医嘱
///OEORI_ItemStat_DR  --医嘱状态
SELECT 
aim.ARCIM_Desc,
yzzb.OEORI_Priority_DR,yzzb.OEORI_Billed,yzzb.OEORI_AdministerSkinTest,
yzlxb.OECPR_Desc,
yzzt.OSTAT_Desc,
yzzb.*
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
AND OEORD_Adm_DR='21650'


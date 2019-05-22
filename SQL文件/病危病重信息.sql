select * from DHC_MRIPDetail WHERE IPDE_Type="BZRS"

("RYRS")="入院"
("ZYRS")="在院"
("ZRKS")="转入"
("ZCKS")="转出"
("CYRS")="出院"
("SWRS")="死亡"
("TYRS")="退院"
("BZRS")="病重"
("BWRS")="病危"
("BEDRS")="在床"
("HLRS1")="一级护理人数"
("HLRS2")="二级护理人数"
("HLRS3")="三级护理人数"
("TJHLRS")="特级护理人数"
("DQJ")="大抢救"
("ZQJ")="中抢救"
("XQJ")="小抢救"

select * from DtPortal_Configure.arcim WHERE ArcimCode="SERIOUSLY"

SELECT * FROM DtPortal_Configure.arcimItem WHERE ParRef IN (1,2)     --病重、病危

SELECT * FROM ARC_ItmMast WHERE ARCIM_RowId IN ('11163||1','11162||1')

SELECT TOP 100 * FROM PA_Adm

select * from OE_Order WHERE OEORD_Adm_DR=163

SELECT OEORI_ItmMast_DR->ARCIM_Desc, * FROM OE_OrdItem WHERE OEORI_OEORD_ParRef=166


SELECT * FROM ARC_ItmMast WHERE ARCIM_Desc="病重"
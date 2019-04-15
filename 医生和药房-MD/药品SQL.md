

	//医嘱子表(OE_Order的子表)
	SELECT OEORI_PrescNo, * from OE_OrdItem  WHERE OEORI_OEORD_ParRef=14191 AND OEORI_PrescNo='E190406000047'

	//医嘱执行记录扩展表 
	SELECT * FROM OE_OrdExecExt WHERE OEORE_OEORI_ParRef IN ('14191||12','14191||14')
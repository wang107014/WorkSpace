#住院收费SQL

##医嘱费用核对
	//账单主表
	SELECT * FROM DHC_PatientBill WHERE PB_RowId=429280
	
	//病人医嘱费用明细表
	SELECT * FROM DHC_PatBillOrder WHERE PBO_PB_ParRef=429280
	
	//账单收费项目明细表
	SELECT * FROM DHC_PatBillDetails WHERE PBD_PBO_ParRef IN ('429280||14','429280||15','429280||18','429280||21','429280||23')
	
	//费用项目表
	SELECT * FROM DHC_TarItem WHERE TARI_RowId IN (17417,20030,1,18636)
	
	//住院收据分类
	SELECT * FROM DHC_TarInpatCate WHERE TARIC_RowId IN (1,5,10)
	
	//医嘱表
	SELECT * FROM OE_Order WHERE OEORD_RowId1=2287
	//医嘱扩展表
	SELECT * FROM OE_OrdItem WHERE OEORI_OEORD_ParRef=2287
	
	//医嘱执行表
	SELECT * FROM OE_OrdExec WHERE OEORE_OEORI_ParRef='2287||1'
	
	//医嘱执行状态表
	SELECT * FROM OEC_Order_AdminStatus WHERE STAT_RowId IN (1,2)
 
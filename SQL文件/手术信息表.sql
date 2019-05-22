//手术表
SELECT ANAOP_Blade_DR,ANAOP_BodySite_DR, * from OR_Anaest_Operation

//手术切口
SELECT * FROM ORC_BladeType

//手术部位
SELECT * FROM OEC_BodySite WHERE BODS_RowId=71
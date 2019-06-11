SELECT * FROM SS_User WHERE SSUSR_Name['胡海洋'



///站点
select * from DHC_PE_Station

//大项
SELECT * FROM DHC_PE_StationOrder WHERE STORD_ParRef=17

select * from DHC_PE_OrderDetailRelate WHERE ODR_ARCIM_DR='17221||1'

SELECT * FROM ARC_ItmMast WHERE ARCIM_RowId IN ('17221||1','20454||1')

SELECT * FROM DHC_PE_OrderDetail

select * from DHC_PE_StationLoc


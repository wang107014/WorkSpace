
SELECT CurWard,TranStatus,TranDate, * from Nur.DHCNurTransAudit WHERE TranStatus="A" --TranDate>'64873'AND TranDate<'65238'

SELECT PAADM_CurrentBed_DR, * FROM PA_Adm WHERE PAADM_Type="I"

//床位
SELECT * FROM PAC_Bed WHERE BED_RowID IN ('11||32','4||7')

//床位类型
SELECT * FROM PAC_BedType

///�Żݼ۸�
SELECT TOP 100 DocCRM_PRDStrikePrice,DocCRM_Price,* FROM DHCDoc_CRMPackageMain WHERE DocCRM_Name['2019��վ��ί���쵼�������ݸ����ײ�'

SELECT TOP 1000 * FROM ARC_OrdSets WHERE ARCOS_Desc['688��쿨�ײͣ�Ů�ѻ飩'

SELECT * FROM DHC_PE_PreGADM

SELECT * FROM SS_User WHERE SSUSR_Name['������'

//����ADM��
SELECT * FROM DHC_PE_PreIADM WHERE PIADM_RowId=22424
	
//������Ŀ�ײͱ� ����ҽ����
SELECT TOP 200 PIOE_OrderSets_DR,* FROM DHC_PE_PreIOrdEnt WHERE PIOE_ParRef=22424
	
//�ײͱ�
SELECT * FROM ARC_OrdSets WHERE ARCOS_RowId1 IN ('25796','25044')
	

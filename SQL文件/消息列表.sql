SELECT TOP 100 * FROM websys.DHCMessageDetails  WHERE DHCDetails_Content_Dr IN (14832,14833) ORDER BY DHCDetails_RowId DESC --    --34849 

SELECT TOP 100 * FROM websys.DHCMessageDetails WHERE DHCDetails_User_Dr="7363"

SELECT TOP 100 * FROM websys.DHCMessageDetails WHERE DHCDetails_RowId='35603'

SELECT TOP 1000 * FROM websys.DHCMessageContent WHERE DHCContent_Action_Dr=62 ORDER BY DHCContent_RowId DESC --  --16376



SELECT  * FROM websys.DHCMessageContent WHERE DHCContent_CreateDate="2019-6-19" AND DHCContent_RowId IN (14832,14833)

//消息动作类型维护
select * from websys.DHCMessageActionType WHERE DHCAction_ReceiveType_Dr=8 --DHCAction_RowId IN (12,51,91,15,92)

select * from websys.DHCMessageReceiveType

SELECT * FROM websys.DHCMessageReplyContent

SELECT * FROM PA_Adm

SELECT * FROM SS_User WHERE SSUSR_Name['张健'

SELECT * FROM SS_User WHERE SSUSR_RowId IN (7054,6758,6,7502,7478)

SELECT * FROM PA_PatMas WHERE PAPMI_No='020000017938'

SELECT * FROM PA_Adm WHERE PAADM_PAPMI_DR=20073   --36304


SELECT * FROM Ens_InterfaceMethod WHERE ID = 447

SELECT TOP 100 * FROM CT_Loc WHERE CTLOC_Desc['院'

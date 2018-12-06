"^9786^^^2018-12-08^2018-12-08^^^PREREG^N^N^N^^N^N^^DC^ID^2^^^^^^^^^1^0^^^^^^N^$$279^24980"



"^9792^^^2018-12-08^2018-12-08^^^PREREG^N^N^N^^N^N^^DC^ID^2^^^^^^^^^1^0^^^^^^N^$$284^24980"

"^9792^^^2018-12-08^2018-12-08^^^PREREG^N^N^N^^N^N^^DC^ID^2^^^^^^^^^1^0^^^^^^N^$$^"






1、输入证件号回车是会调用一下方法来根据证件号和科室查找UseID和SetsID

	dhcpepreiadm.main.hisui.js中的FindPreInfoByIDCard方法中
	w ##class(web.DHCPE.NetPre.GetPreInfo).GetInfo("530323198009080031","117")
	
	s ID=$O(^User.DHCPENetPreRecordI("IDCardIndex",IDCard,ID),-1)
	s Status=$LG(^User.DHCPENetPreRecordD(ID),7)
	q:Status'="0"   //Status为0才会有UseID和SetsID
	s UseID=ID
	s SetsID=$LG(^User.DHCPENetPreRecordD(UseID),8)


2、点预约按钮

	1、dhcpepreiadm.main.hisui.js中的Save方法中先获取参数(网上预约后未被HIS处理前,参数中会有UseID和SetsID)

	2、再调这个##class(web.DHCPE.PreIADM).HISUISave("...")
	在这个方法中会先在个人ADM表(DHC_PE_PreIADM)中新增一条记录信息，产生一个rowid,如果参数中存在UseID和SetsID,则会把网上预约的套餐信息存储在在个人项目表(DHC_PE_PreIOrdItem)中，参数中没有存在UseID和SetsID，则不会存储信息在个人项目表中。

	3、个人信息表中有没有信息，则体现在体检项目中有没有信息。
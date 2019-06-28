#团体导入是判断和建立MDM

##查询MDM系统主索引

	Return:  小于0   失败  等于0  成功但无数据返回   1 成功且返回最匹配数据  
	w ##class(web.DHCPE.Platform.Handler).QueryMDM()
	 



##MDM系统主索引入口

	Flag 1:不查询MDM 直接创建新的
	Return:0  继续执行  <0 终止   1:MDM已存在，HIS不存在  返回MDM集合   2：MDM与HIS都不存在  返回MDM创建的主索引
	w ##class(web.DHCPE.Platform.Handler).Main()
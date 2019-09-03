SELECT * FROM PA_PatMas WHERE PAPMI_RowId1=12461

//退费单
SELECT rb_statuscode,* FROM BS_Bill.Pkg_RefundBill WHERE rb_statuscode=10 --rb_patientid=50

//订单表
SELECT bill_statuscode,bill_paymode, * FROM BS_Bill.Pkg_PatientBill WHERE bill_statuscode=10

///定金表
SELECT dep_usingstatus, * FROM BS_Bill.Pkg_Deposit WHERE dep_patienttid=6
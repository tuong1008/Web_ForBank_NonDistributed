
USE NGANHANG
GO
IF(not EXISTS(select * from syslogins WHERE loginname='adminCN1')
    and EXISTS(select * from sysusers WHERE [name] = '0000000000'))
EXEC sp_dropuser '0000000000'

IF(not EXISTS(select * from syslogins WHERE loginname='adminNH1')
    and EXISTS(select * from sysusers WHERE [name] = '0000000001'))
EXEC sp_dropuser '0000000001'

IF(not EXISTS(select * from syslogins WHERE loginname='adminCN2')
    and EXISTS(select * from sysusers WHERE [name] = '0000000002'))
EXEC sp_dropuser '0000000002'

IF(not EXISTS(select * from syslogins WHERE loginname='adminNH2')
    and EXISTS(select * from sysusers WHERE [name] = '0000000003'))
EXEC sp_dropuser '0000000003'

GO
EXEC SP_TAOLOGIN 'adminCN1', 'Admin1234.', '0000000000', 'ChiNhanh'
GO
EXEC SP_TAOLOGIN 'adminNH1', 'Admin1234.', '0000000001', 'NganHang'
GO
EXEC SP_TAOLOGIN 'adminCN2', 'Admin1234.', '0000000002', 'ChiNhanh'
GO
EXEC SP_TAOLOGIN 'adminNH2', 'Admin1234.', '0000000003', 'NganHang'
GO
EXEC sp_addsrvrolemember 'adminCN1', 'SecurityAdmin'
EXEC sp_addsrvrolemember 'adminCN1', 'ProcessAdmin'
GO
EXEC sp_addsrvrolemember 'adminCN2', 'SecurityAdmin'
EXEC sp_addsrvrolemember 'adminCN2', 'ProcessAdmin'

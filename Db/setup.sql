USE NGANHANG
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

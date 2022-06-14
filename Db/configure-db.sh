#!/bin/bash

# Wait 60 seconds for SQL Server to start up by ensuring that 
# calling SQLCMD does not return an error code, which will ensure that sqlcmd is accessible
# and that system and user databases return "0" which means all databases are in an "online" state
# https://docs.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-databases-transact-sql?view=sql-server-2017 

DBSTATUS=1
i=0

sleep 20s
while [[ $DBSTATUS -ne 0 ]] && [[ $i -lt 60 ]]; do
	i=$i+1
	DBSTATUS=$(/opt/mssql-tools/bin/sqlcmd -h -1 -t 1 -U SA -P Admin1234. -Q "SET NOCOUNT ON; Select SUM(state) from sys.databases")
	sleep 1s
done

# Run the setup script to create the DB and the schema in the DB
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P Admin1234. -Q "RESTORE DATABASE NGANHANG FROM DISK = '/usr/config/NGANHANG.bak' WITH MOVE 'NGANHANG' TO '/var/opt/mssql/data/NGANHANG.mdf', MOVE 'NGANHANG_log' TO '/var/opt/mssql/data/NGANHANG_log.ldf'"
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P Admin1234. -d master -i setup.sql


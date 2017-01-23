--Create a set of DO records for an external table

ATTACH '${dcDB}' as dcDB;

INSERT INTO DO (doRecID,doRecUUID,dcCode)
SELECT ${dc_PK_Fld},${dc_UUID_Fld}, '${dcCode}' as dcCode
FROM dcDB.${dcTable};
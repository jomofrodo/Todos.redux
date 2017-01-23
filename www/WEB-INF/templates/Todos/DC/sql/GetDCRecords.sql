SELECT ${dc_PK_Fld} as doRecID,
${dc_UUID_Fld} as doRecUUID,
* 
FROM ${dcTable}
ORDER BY ${dc_PK_Fld};
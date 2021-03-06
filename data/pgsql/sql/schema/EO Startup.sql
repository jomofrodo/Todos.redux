﻿-- Intial system startup or restart

/*
SELECT * FROM do;
SELECT * FROM do_do;
SELECT * FROM do_class;

SET search_path TO todos,public;
*/
--rollback transaction;
abort;
begin transaction;
-- commit;
-- abort;


SET CONSTRAINTS ALL DEFERRED;
ALTER TABLE do DISABLE TRIGGER USER;

DELETE FROM do_do;
DELETE FROM todos.do;
DELETE FROM do_class;
DELETE FROM do_relation;

--do_class
INSERT INTO do_class (dcCode,dcName,dcDesc)VALUES('EO','EO','EO');
INSERT INTO do_class (dcCode,dcName,dcDesc,dcTable,dc_PK_Fld,dc_UUID_Fld)
VALUES('DO','DO','Base DO','posts','id','uuid');
INSERT INTO do_class (dcCode,dcName,dcDesc,dcTable,dc_PK_Fld,dc_UUID_Fld)
VALUES('TAG','TAG','Tag DO','tags','id','uuid');


--do_relation
INSERT INTO do_relation ( drcode, drdesc) VALUES ('PARENT', 'Parent');
INSERT INTO  do_relation (drcode, drdesc) VALUES ('SELF', 'Self pointer');
INSERT INTO  do_relation ( drcode, drdesc) VALUES ('CHILD', 'Child pointer');

-- Start of the EO
INSERT INTO todos.do VALUES(0,'EO',0,0);


-- Start of GO
INSERT INTO todos.do (doid,dccode,dorecid,dorecuuid) VALUES(1,'EO',0,0);

-- Start of JO
INSERT INTO todos.do (doid,dccode,dorecid,dorecuuid) VALUES(2,'DO',0,0);




INSERT INTO do_do (doID,relDoID,drCode,ddSort,ddLeft,ddRight) VALUES(0,0,'SELF',null,null,null);
INSERT INTO do_do (doID,relDoID,drCode,ddSort,ddLeft,ddRight) VALUES(0,1,'PARENT',null,null,null);
INSERT INTO do_do (doID,relDoID,drCode,ddSort,ddLeft,ddRight) VALUES(0,2,'PARENT',null,null,null);
INSERT INTO do_do (doID,relDoID,drCode,ddSort,ddLeft,ddRight) VALUES(1,0,'SELF',null,null,null);
INSERT INTO do_do (doID,relDoID,drCode,ddSort,ddLeft,ddRight) VALUES(2,0,'SELF',null,null,null);
INSERT INTO do_do (doID,relDoID,drCode,ddSort,ddLeft,ddRight) VALUES(1,0,'CHILD',null,null,null);
INSERT INTO do_do (doID,relDoID,drCode,ddSort,ddLeft,ddRight) VALUES(2,0,'CHILD',null,null,null);

ALTER TABLE do ENABLE TRIGGER USER;
commit transaction;



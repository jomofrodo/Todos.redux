-- Create a new DO record

INSERT INTO public.do
(doid,dccode,dorecid,dorecuuid)
VALUES(currval('seqDo'),'${dcCode}',${doRecID},'${doRecUUID}')
RETURNING doID;

-- Create a new DO record

INSERT INTO public.do
(dccode,dorecid,dorecuuid,doTitle)
VALUES(?,?,?,?)
RETURNING doID;

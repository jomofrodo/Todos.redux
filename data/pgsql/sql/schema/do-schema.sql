/*
  CREATE DATABASE kanbandev
  WITH OWNER = kanban
    ENCODING = 'UTF8'
    TABLESPACE = pg_default;
  */
    
  abort;
  begin transaction;
  -- commit;
  
  SET CONSTRAINTS ALL DEFERRED;
    --DROP TRIGGER IF EXISTS tr_do_after_insert ON public."do";
    --DROP TRIGGER IF EXISTS tr_do_before_delete ON public."do";
    
    DROP TABLE IF EXISTS public.do_do;
    DROP TABLE IF EXISTS public.do_relation;
    DROP TABLE IF EXISTS public.do;
    DROP TABLE IF EXISTS public.do_class;
    

    DROP FUNCTION IF EXISTS public.trf_create_do_do_0();
    DROP FUNCTION IF EXISTS public.trf_create_post_do();
    DROP FUNCTION IF EXISTS public.trf_delete_do_dos();
    
    
-- Table: do_class
CREATE TABLE do_class ( 
    dccode      VARCHAR( 10 )   PRIMARY KEY,
    dcname      VARCHAR( 25 ),
    dcdesc      VARCHAR( 128 ),
    dcdb        VARCHAR( 25 ),
    dctable     VARCHAR( 25 ),
    dc_pk_fld   VARCHAR( 25 ),
    dc_uuid_fld VARCHAR( 25 ) 
);

-- Table: do
CREATE TABLE public.do ( 
    doid      NUMERIC( 12, 0 )  PRIMARY KEY,
    dccode    VARCHAR( 10 )     DEFAULT ( 'DO' ) 
                                REFERENCES do_class ( dccode ),
    dorecid   NUMERIC( 12, 0 ),
    dorecuuid VARCHAR( 36 ) 
);

-- Table: do_relation
CREATE TABLE do_relation ( 
    drcode VARCHAR( 10 )   PRIMARY KEY,
    drdesc VARCHAR( 128 ) 
);

-- Table: do_do
CREATE TABLE do_do ( 
    doid    NUMERIC( 12, 0 )  REFERENCES public.do,
    reldoid NUMERIC( 12, 0 )  REFERENCES public.do,
    drcode  VARCHAR( 10 )     DEFAULT ( 'PARENT' ) 
                              REFERENCES do_relation ( drcode ),
    ddsort  NUMERIC( 12, 0 ),
    ddleft  NUMERIC( 12, 0 ),
    ddright NUMERIC( 12, 0 ),
    PRIMARY KEY ( doid, reldoid, drcode ) 
);


-- Triggers
CREATE FUNCTION trf_create_do_do_0() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO do_do ( 
        doID,
        relDoID,
        drCode,
        ddSort 
    ) 
    VALUES ( 
        new.doID,
        1,
        'CHILD',
        new.doID 
    );
END;
$$;

CREATE FUNCTION trf_delete_do_dos() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE
      FROM do_do
     WHERE reldoid = old.doid;

    DELETE
      FROM do_do
     WHERE doid = old.doid;
END;
$$;


-- And now for a trigger on table posts
-- GHOST Specific

CREATE FUNCTION trf_create_post_do() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO public.do ( 
        doid,
        dorecid,
        dorecuuid,
        dccode 
    ) 
    SELECT max( doid ) + 1,
           NEW.id,
           NEW.uuid,
           'DO'
      FROM public.do;
END;
$$;

-- Don't hook up triggers until after loading EO records 0 and 1
--CREATE TRIGGER tr_do_after_insert AFTER INSERT ON "do" FOR EACH ROW EXECUTE PROCEDURE trf_create_do_do_0();
--CREATE TRIGGER tr_do_after_delete AFTER DELETE ON "do" FOR EACH ROW EXECUTE PROCEDURE trf_delete_do_dos();
--CREATE TRIGGER tr_posts_after_insert AFTER INSERT ON "posts" FOR EACH STATEMENT EXECUTE PROCEDURE trf_create_post_do();

commit;

    
    
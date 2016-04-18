--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: todos; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA todos;


ALTER SCHEMA todos OWNER TO postgres;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


ALTER DATABASE kanbandev SET search_path TO todos,public,pg_catalog;
SET search_path = todos, public, pg_catalog;

DROP SCHEMA IF EXISTS "todos.bak" CASCADE ;
ALTER SCHEMA todos RENAME to "todos.bak";

CREATE SCHEMA todos;
--
-- Name: trf_create_do_do_0(); Type: FUNCTION; Schema: todos; Owner: postgres
--

CREATE FUNCTION trf_create_do_do_0() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO todos.do_do ( 
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
    RETURN new;
END;
$$;


ALTER FUNCTION todos.trf_create_do_do_0() OWNER TO postgres;

--
-- Name: trf_create_post_do(); Type: FUNCTION; Schema: todos; Owner: postgres
--

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


ALTER FUNCTION todos.trf_create_post_do() OWNER TO postgres;

--
-- Name: trf_delete_do_dos(); Type: FUNCTION; Schema: todos; Owner: postgres
--

CREATE FUNCTION trf_delete_do_dos() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE
      FROM todos.do_do
     WHERE reldoid = old.doid;

    DELETE
      FROM todos.do_do
     WHERE doid = old.doid;

     RETURN old;
END;
$$;


ALTER FUNCTION todos.trf_delete_do_dos() OWNER TO postgres;

--
-- Name: seqdo; Type: SEQUENCE; Schema: todos; Owner: postgres
--

CREATE SEQUENCE seqdo
    START WITH 10000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE todos.seqdo OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: do; Type: TABLE; Schema: todos; Owner: postgres; Tablespace: 
--

CREATE TABLE "do" (
    doid numeric(12,0) DEFAULT nextval('seqdo'::regclass) NOT NULL,
    dccode character varying(10) DEFAULT 'DO'::character varying,
    dorecid numeric(12,0),
    dorecuuid character varying(36),
    dotitle text
);


ALTER TABLE todos."do" OWNER TO postgres;

--
-- Name: do_class; Type: TABLE; Schema: todos; Owner: postgres; Tablespace: 
--

CREATE TABLE do_class (
    dccode character varying(10) NOT NULL,
    dcname character varying(25),
    dcdesc character varying(128),
    dcdb character varying(25),
    dctable character varying(25),
    dc_pk_fld character varying(25),
    dc_uuid_fld character varying(25)
);


ALTER TABLE todos.do_class OWNER TO postgres;

--
-- Name: do_do; Type: TABLE; Schema: todos; Owner: postgres; Tablespace: 
--

CREATE TABLE do_do (
    doid numeric(12,0) NOT NULL,
    reldoid numeric(12,0) NOT NULL,
    drcode character varying(10) DEFAULT 'PARENT'::character varying NOT NULL,
    ddsort numeric(12,0),
    ddleft numeric(12,0),
    ddright numeric(12,0)
);


ALTER TABLE todos.do_do OWNER TO postgres;

--
-- Name: do_relation; Type: TABLE; Schema: todos; Owner: postgres; Tablespace: 
--

CREATE TABLE do_relation (
    drcode character varying(10) NOT NULL,
    drdesc character varying(128)
);


ALTER TABLE todos.do_relation OWNER TO postgres;

--
-- Data for Name: do; Type: TABLE DATA; Schema: todos; Owner: postgres
--

COPY "do" (doid, dccode, dorecid, dorecuuid, dotitle) FROM stdin;
0	EO	0	0	\N
1	EO	0	0	\N
2	DO	0	0	\N
3	DO	0	0	\N
\.


--
-- Data for Name: do_class; Type: TABLE DATA; Schema: todos; Owner: postgres
--

COPY do_class (dccode, dcname, dcdesc, dcdb, dctable, dc_pk_fld, dc_uuid_fld) FROM stdin;
EO	EO	EO	\N	\N	\N	\N
DO	DO	Base DO	\N	posts	id	uuid
TAG	TAG	Tag DO	\N	tags	id	uuid
SELF	SELF	SELF id	\N	\N	\N	\N
PARENT	PARENT	Parent id	\N	\N	\N	\N
\.


--
-- Data for Name: do_do; Type: TABLE DATA; Schema: todos; Owner: postgres
--

COPY do_do (doid, reldoid, drcode, ddsort, ddleft, ddright) FROM stdin;
0	0	SELF	\N	\N	\N
0	1	PARENT	\N	\N	\N
0	2	PARENT	\N	\N	\N
1	0	SELF	\N	\N	\N
2	0	SELF	\N	\N	\N
1	0	CHILD	\N	\N	\N
2	0	CHILD	\N	\N	\N
\.


--
-- Data for Name: do_relation; Type: TABLE DATA; Schema: todos; Owner: postgres
--

COPY do_relation (drcode, drdesc) FROM stdin;
PARENT	Parent
SELF	Self pointer
CHILD	Child pointer
\.


--
-- Name: seqdo; Type: SEQUENCE SET; Schema: todos; Owner: postgres
--

SELECT pg_catalog.setval('seqdo', 10002, true);


--
-- Name: do_class_pkey; Type: CONSTRAINT; Schema: todos; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY do_class
    ADD CONSTRAINT do_class_pkey PRIMARY KEY (dccode);


--
-- Name: do_do_pkey; Type: CONSTRAINT; Schema: todos; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY do_do
    ADD CONSTRAINT do_do_pkey PRIMARY KEY (doid, reldoid, drcode);


--
-- Name: do_pkey; Type: CONSTRAINT; Schema: todos; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "do"
    ADD CONSTRAINT do_pkey PRIMARY KEY (doid);


--
-- Name: do_relation_pkey; Type: CONSTRAINT; Schema: todos; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY do_relation
    ADD CONSTRAINT do_relation_pkey PRIMARY KEY (drcode);


--
-- Name: do-after-insert; Type: TRIGGER; Schema: todos; Owner: postgres
--

CREATE TRIGGER "do-after-insert" AFTER INSERT ON "do" FOR EACH ROW EXECUTE PROCEDURE trf_create_do_do_0();


--
-- Name: do-before-delete; Type: TRIGGER; Schema: todos; Owner: postgres
--

CREATE TRIGGER "do-before-delete" BEFORE DELETE ON "do" FOR EACH ROW EXECUTE PROCEDURE trf_delete_do_dos();


--
-- Name: do_dccode_fkey; Type: FK CONSTRAINT; Schema: todos; Owner: postgres
--

ALTER TABLE ONLY "do"
    ADD CONSTRAINT do_dccode_fkey FOREIGN KEY (dccode) REFERENCES do_class(dccode);


--
-- Name: do_do_doid_fkey; Type: FK CONSTRAINT; Schema: todos; Owner: postgres
--

ALTER TABLE ONLY do_do
    ADD CONSTRAINT do_do_doid_fkey FOREIGN KEY (doid) REFERENCES "do"(doid);


--
-- Name: do_do_drcode_fkey; Type: FK CONSTRAINT; Schema: todos; Owner: postgres
--

ALTER TABLE ONLY do_do
    ADD CONSTRAINT do_do_drcode_fkey FOREIGN KEY (drcode) REFERENCES do_relation(drcode);


--
-- Name: do_do_reldoid_fkey; Type: FK CONSTRAINT; Schema: todos; Owner: postgres
--

ALTER TABLE ONLY do_do
    ADD CONSTRAINT do_do_reldoid_fkey FOREIGN KEY (reldoid) REFERENCES "do"(doid);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--


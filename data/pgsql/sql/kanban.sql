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
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: trf_insert_do(); Type: FUNCTION; Schema: public; Owner: kanban
--

CREATE FUNCTION trf_insert_do() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO do_do ( 
        doID,
        doRelID,
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


ALTER FUNCTION public.trf_insert_do() OWNER TO kanban;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: do; Type: TABLE; Schema: public; Owner: kanban; Tablespace: 
--

CREATE TABLE "do" (
    doid numeric(12,0) NOT NULL,
    dccode character varying(10) DEFAULT 'DO'::character varying,
    dorecid numeric(12,0),
    dorecuuid character varying(36)
);


ALTER TABLE public."do" OWNER TO kanban;

--
-- Name: do_class; Type: TABLE; Schema: public; Owner: kanban; Tablespace: 
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


ALTER TABLE public.do_class OWNER TO kanban;

--
-- Name: do_do; Type: TABLE; Schema: public; Owner: kanban; Tablespace: 
--

CREATE TABLE do_do (
    doid numeric(12,0) NOT NULL,
    reldoid numeric(12,0) NOT NULL,
    drcode character varying(10) DEFAULT 'PARENT'::character varying NOT NULL,
    ddsort numeric(12,0),
    ddleft numeric(12,0),
    ddright numeric(12,0)
);


ALTER TABLE public.do_do OWNER TO kanban;

--
-- Name: do_relation; Type: TABLE; Schema: public; Owner: kanban; Tablespace: 
--

CREATE TABLE do_relation (
    drcode character varying(10) NOT NULL,
    drdesc character varying(128)
);


ALTER TABLE public.do_relation OWNER TO kanban;

--
-- Data for Name: do; Type: TABLE DATA; Schema: public; Owner: kanban
--

COPY "do" (doid, dccode, dorecid, dorecuuid) FROM stdin;
\.


--
-- Data for Name: do_class; Type: TABLE DATA; Schema: public; Owner: kanban
--

COPY do_class (dccode, dcname, dcdesc, dcdb, dctable, dc_pk_fld, dc_uuid_fld) FROM stdin;
\.


--
-- Data for Name: do_do; Type: TABLE DATA; Schema: public; Owner: kanban
--

COPY do_do (doid, reldoid, drcode, ddsort, ddleft, ddright) FROM stdin;
\.


--
-- Data for Name: do_relation; Type: TABLE DATA; Schema: public; Owner: kanban
--

COPY do_relation (drcode, drdesc) FROM stdin;
\.


--
-- Name: do_class_pkey; Type: CONSTRAINT; Schema: public; Owner: kanban; Tablespace: 
--

ALTER TABLE ONLY do_class
    ADD CONSTRAINT do_class_pkey PRIMARY KEY (dccode);


--
-- Name: do_do_pkey; Type: CONSTRAINT; Schema: public; Owner: kanban; Tablespace: 
--

ALTER TABLE ONLY do_do
    ADD CONSTRAINT do_do_pkey PRIMARY KEY (doid, reldoid, drcode);


--
-- Name: do_pkey; Type: CONSTRAINT; Schema: public; Owner: kanban; Tablespace: 
--

ALTER TABLE ONLY "do"
    ADD CONSTRAINT do_pkey PRIMARY KEY (doid);


--
-- Name: do_relation_pkey; Type: CONSTRAINT; Schema: public; Owner: kanban; Tablespace: 
--

ALTER TABLE ONLY do_relation
    ADD CONSTRAINT do_relation_pkey PRIMARY KEY (drcode);


--
-- Name: do_tr_before_insert; Type: TRIGGER; Schema: public; Owner: kanban
--

CREATE TRIGGER do_tr_before_insert BEFORE INSERT ON "do" FOR EACH STATEMENT EXECUTE PROCEDURE trf_insert_do();


--
-- Name: do_dccode_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kanban
--

ALTER TABLE ONLY "do"
    ADD CONSTRAINT do_dccode_fkey FOREIGN KEY (dccode) REFERENCES do_class(dccode);


--
-- Name: do_do_doid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kanban
--

ALTER TABLE ONLY do_do
    ADD CONSTRAINT do_do_doid_fkey FOREIGN KEY (doid) REFERENCES "do"(doid);


--
-- Name: do_do_drcode_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kanban
--

ALTER TABLE ONLY do_do
    ADD CONSTRAINT do_do_drcode_fkey FOREIGN KEY (drcode) REFERENCES do_relation(drcode);


--
-- Name: do_do_reldoid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kanban
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


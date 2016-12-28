-- SQL Manager for PostgreSQL 5.2.0.3
-- ---------------------------------------
-- Host      : localhost
-- Database  : kanbandev
-- Version   : PostgreSQL 9.3.2, compiled by Visual C++ build 1600, 64-bit



CREATE SCHEMA kanban AUTHORIZATION kanban;
SET check_function_bodies = false;
--
-- Structure for table lane (OID = 24990) :
--
SET search_path = kanban, todos, public, pg_catalog;
CREATE TABLE kanban.lane (
    laneid numeric(12,0) NOT NULL,
    lanecode varchar(20) NOT NULL,
    lnname varchar(40),
    lndesc varchar(256)
)
WITH (oids = false);
--
-- Structure for table project (OID = 24998) :
--
CREATE TABLE kanban.project (
    projectid numeric(12,0) NOT NULL,
    projectcode varchar(20) NOT NULL,
    prjname varchar(40),
    prjdesc varchar(256),
    projectstatuscode varchar(20),
    prjbegin date,
    prjend date
)
WITH (oids = false);
--
-- Definition for index lane_idx (OID = 25001) :
--
ALTER TABLE ONLY lane
    ADD CONSTRAINT lane_idx
    PRIMARY KEY (laneid);
--
-- Definition for index lane_idx1 (OID = 25003) :
--
ALTER TABLE ONLY lane
    ADD CONSTRAINT lane_idx1
    UNIQUE (lanecode);
--
-- Definition for index project_pkey (OID = 25005) :
--
ALTER TABLE ONLY project
    ADD CONSTRAINT project_pkey
    PRIMARY KEY (projectid);
--
-- Definition for index project_projectcode_key (OID = 25007) :
--
ALTER TABLE ONLY project
    ADD CONSTRAINT project_projectcode_key
    UNIQUE (projectcode);
d
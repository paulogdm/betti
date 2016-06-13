--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.2
-- Dumped by pg_dump version 9.5.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


SET search_path = public, pg_catalog;

--
-- Name: change_fav_status(integer, boolean); Type: FUNCTION; Schema: public; Owner: pguser
--

CREATE FUNCTION change_fav_status(id integer, last_status boolean) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF(last_status) THEN
		PERFORM decrement_nbr_favs(id);
	ELSIF(NOT last_status) THEN
		PERFORM increment_nbr_favs(id);
	END IF;
END;
$$;


ALTER FUNCTION public.change_fav_status(id integer, last_status boolean) OWNER TO pguser;

--
-- Name: change_like_dislike_status(integer, smallint); Type: FUNCTION; Schema: public; Owner: pguser
--

CREATE FUNCTION change_like_dislike_status(id integer, value smallint) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF(value > 0) THEN
		PERFORM decrement_dislikes(id);
	ELSIF(value < 0) THEN
		PERFORM decrement_likes(id);
	END IF;
END;
$$;


ALTER FUNCTION public.change_like_dislike_status(id integer, value smallint) OWNER TO pguser;

--
-- Name: change_shares_status(integer, boolean); Type: FUNCTION; Schema: public; Owner: pguser
--

CREATE FUNCTION change_shares_status(id integer, last_status boolean) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF(last_status) THEN
		PERFORM decrement_nbr_shares(id);
	ELSIF(NOT last_status) THEN
		PERFORM increment_nbr_shares(id);
	END IF;
END;
$$;


ALTER FUNCTION public.change_shares_status(id integer, last_status boolean) OWNER TO pguser;

--
-- Name: decrement_dislikes(integer); Type: FUNCTION; Schema: public; Owner: pguser
--

CREATE FUNCTION decrement_dislikes(id integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
	UPDATE post
	SET n_dislikes = n_dislikes - 1
	WHERE post_id = id;
END;
$$;


ALTER FUNCTION public.decrement_dislikes(id integer) OWNER TO pguser;

--
-- Name: decrement_likes(integer); Type: FUNCTION; Schema: public; Owner: pguser
--

CREATE FUNCTION decrement_likes(id integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
	UPDATE post
	SET n_likes = n_likes - 1
	WHERE post_id = id;
END;
$$;


ALTER FUNCTION public.decrement_likes(id integer) OWNER TO pguser;

--
-- Name: decrement_nbr_favs(integer); Type: FUNCTION; Schema: public; Owner: pguser
--

CREATE FUNCTION decrement_nbr_favs(id integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
	UPDATE post
	SET n_fav = n_fav - 1
	WHERE post_id = id;
END;
$$;


ALTER FUNCTION public.decrement_nbr_favs(id integer) OWNER TO pguser;

--
-- Name: decrement_nbr_shares(integer); Type: FUNCTION; Schema: public; Owner: pguser
--

CREATE FUNCTION decrement_nbr_shares(id integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
	UPDATE post
	SET n_shares = n_shares - 1
	WHERE post_id = id;
END;
$$;


ALTER FUNCTION public.decrement_nbr_shares(id integer) OWNER TO pguser;

--
-- Name: increment_dislikes(integer); Type: FUNCTION; Schema: public; Owner: pguser
--

CREATE FUNCTION increment_dislikes(id integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
	UPDATE post
	SET n_dislikes = n_dislikes + 1
	WHERE post_id = id;
END;
$$;


ALTER FUNCTION public.increment_dislikes(id integer) OWNER TO pguser;

--
-- Name: increment_likes(integer); Type: FUNCTION; Schema: public; Owner: pguser
--

CREATE FUNCTION increment_likes(id integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
	UPDATE post
	SET n_likes = n_likes + 1
	WHERE post_id = id;
END;
$$;


ALTER FUNCTION public.increment_likes(id integer) OWNER TO pguser;

--
-- Name: increment_nbr_favs(integer); Type: FUNCTION; Schema: public; Owner: pguser
--

CREATE FUNCTION increment_nbr_favs(id integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
	UPDATE post
	SET n_fav = n_fav + 1
	WHERE post_id = id;
END;
$$;


ALTER FUNCTION public.increment_nbr_favs(id integer) OWNER TO pguser;

--
-- Name: increment_nbr_shares(integer); Type: FUNCTION; Schema: public; Owner: pguser
--

CREATE FUNCTION increment_nbr_shares(id integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
	UPDATE post
	SET n_shares = n_shares + 1
	WHERE post_id = id;
END;
$$;


ALTER FUNCTION public.increment_nbr_shares(id integer) OWNER TO pguser;

--
-- Name: update_post(); Type: FUNCTION; Schema: public; Owner: pguser
--

CREATE FUNCTION update_post() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
	DECLARE
		pid			integer;
		switch_fav		boolean;
		switch_shares		boolean;
		switch_like_dislike	smallint;
		old_like_dislike 	smallint;
		old_fav			boolean;
		old_shares		boolean;
	BEGIN
		IF(TG_OP = 'DELETE') THEN
			pid = OLD.post_id;
			switch_like_dislike := 0;
			switch_fav := FALSE;
			switch_shares := FALSE;
			old_like_dislike := OLD.like_dislike;
			old_fav := OLD.favorited;
			old_shares := OLD.shared;
			IF(OLD.like_dislike != 0) THEN
				switch_like_dislike := -1*OLD.like_dislike; 
			END IF;
			IF(OLD.favorited) THEN
				switch_fav := TRUE;
			END IF;
			IF(OLD.shared) THEN
				switch_shares := TRUE;
			END IF;
			IF(switch_like_dislike != 0) THEN
				PERFORM change_like_dislike_status(pid, switch_like_dislike);
			END IF;
			IF(switch_fav) THEN
				PERFORM change_fav_status(pid, old_fav);
			END IF;
			IF(switch_shares) THEN
				PERFORM change_shares_status(pid, old_shares);
			END IF;
			RETURN NULL; 
			
		ELSIF(TG_OP = 'UPDATE') THEN
			pid = OLD.post_id;
			switch_like_dislike := 0;
			switch_fav := FALSE;
			switch_shares := FALSE;
			old_like_dislike := NEW.like_dislike;
			old_fav := NEW.favorited;
			old_shares := NEW.shared;
			IF(OLD.like_dislike != NEW.like_dislike) THEN
				switch_like_dislike := -1*OLD.like_dislike;
				IF(switch_like_dislike = 0 AND NEW.like_dislike > 0) THEN
					PERFORM increment_likes(pid);
					RETURN NEW;
				ELSIF(switch_like_dislike = 0 AND NEW.like_dislike < 0) THEN
					PERFORM increment_dislikes(pid);
					RETURN NEW;
				END IF;
			END IF;
			IF(OLD.favorited != NEW.favorited) THEN
				switch_fav := TRUE;
			END IF;
			IF(OLD.shared != NEW.shared) THEN
				switch_shares := TRUE;
			END IF;
			IF(switch_like_dislike != 0) THEN
				PERFORM change_like_dislike_status(pid, switch_like_dislike);
			END IF;
			IF(switch_fav) THEN
				PERFORM change_fav_status(pid, NOT old_fav);
			END IF;
			IF(switch_shares) THEN
				PERFORM change_shares_status(pid, NOT old_shares);
			END IF;
			RETURN NEW;
			
		ELSIF(TG_OP = 'INSERT') THEN
			RETURN NEW;
		END IF;
	END;
$$;


ALTER FUNCTION public.update_post() OWNER TO pguser;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: fav_post; Type: TABLE; Schema: public; Owner: pguser
--

CREATE TABLE fav_post (
    post_id integer NOT NULL,
    webuser character(20) NOT NULL
);


ALTER TABLE fav_post OWNER TO pguser;

--
-- Name: follow; Type: TABLE; Schema: public; Owner: pguser
--

CREATE TABLE follow (
    usender character(20) NOT NULL,
    ureceiver character(20) NOT NULL,
    CONSTRAINT ck_follow CHECK ((usender <> ureceiver))
);


ALTER TABLE follow OWNER TO pguser;

--
-- Name: post; Type: TABLE; Schema: public; Owner: pguser
--

CREATE TABLE post (
    post_id integer NOT NULL,
    powner character(20) NOT NULL,
    title character(50) NOT NULL,
    text character varying(1000) NOT NULL,
    pdate timestamp without time zone DEFAULT now(),
    n_likes integer DEFAULT 0,
    n_dislikes integer DEFAULT 0,
    n_shares integer DEFAULT 0,
    n_fav integer DEFAULT 0
);


ALTER TABLE post OWNER TO pguser;

--
-- Name: post_reaction; Type: TABLE; Schema: public; Owner: pguser
--

CREATE TABLE post_reaction (
    post_id integer NOT NULL,
    preader character(20) NOT NULL,
    like_dislike smallint DEFAULT 0,
    shared boolean DEFAULT false,
    favorited boolean DEFAULT false
);


ALTER TABLE post_reaction OWNER TO pguser;

--
-- Name: posts_post_id_seq; Type: SEQUENCE; Schema: public; Owner: pguser
--

CREATE SEQUENCE posts_post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE posts_post_id_seq OWNER TO pguser;

--
-- Name: posts_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pguser
--

ALTER SEQUENCE posts_post_id_seq OWNED BY post.post_id;


--
-- Name: usergroup; Type: TABLE; Schema: public; Owner: pguser
--

CREATE TABLE usergroup (
    group_id integer NOT NULL,
    gname character(20) NOT NULL,
    gowner character(20) NOT NULL,
    group_photo character(50),
    n_members integer DEFAULT 1
);


ALTER TABLE usergroup OWNER TO pguser;

--
-- Name: webuser; Type: TABLE; Schema: public; Owner: pguser
--

CREATE TABLE webuser (
    login character(20) NOT NULL,
    uname character(20) NOT NULL,
    password character(20) NOT NULL,
    birthday date,
    uphoto character(50),
    ucover character(50),
    motto character(100),
    style_profile smallint DEFAULT 0,
    style_bar smallint DEFAULT 0
);


ALTER TABLE webuser OWNER TO pguser;

--
-- Name: webuser_group; Type: TABLE; Schema: public; Owner: pguser
--

CREATE TABLE webuser_group (
    group_id integer NOT NULL,
    ulogin character(20) NOT NULL
);


ALTER TABLE webuser_group OWNER TO pguser;

--
-- Name: webuserdescription; Type: TABLE; Schema: public; Owner: pguser
--

CREATE TABLE webuserdescription (
    login character(20) NOT NULL,
    description character varying(200)
);


ALTER TABLE webuserdescription OWNER TO pguser;

--
-- Name: post_id; Type: DEFAULT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY post ALTER COLUMN post_id SET DEFAULT nextval('posts_post_id_seq'::regclass);


--
-- Data for Name: fav_post; Type: TABLE DATA; Schema: public; Owner: pguser
--

COPY fav_post (post_id, webuser) FROM stdin;
12	asas                
12	sasa                
\.


--
-- Data for Name: follow; Type: TABLE DATA; Schema: public; Owner: pguser
--

COPY follow (usender, ureceiver) FROM stdin;
sasa                	asas                
asas                	sasa                
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: pguser
--

COPY post (post_id, powner, title, text, pdate, n_likes, n_dislikes, n_shares, n_fav) FROM stdin;
12	asas                	asasas                                            	asasas	2016-06-04 17:32:05.275307	0	0	0	0
13	sasa                	asasas  of SASA                                   	SASA SASA	2016-06-05 00:00:44.279375	0	0	0	0
14	sasa                	asasasas                                          	asas	2016-06-11 11:00:28.644052	0	0	0	0
15	sasa                	SASA                                              	SASASA	2016-06-11 11:02:18.892806	0	0	0	0
16	sasa                	asasas                                            	asasas	2016-06-11 11:03:24.356641	0	0	0	0
17	sasa                	asasasassasasasasasas                             	saasasasasasasasasasasas	2016-06-11 11:03:32.015352	0	0	0	0
27	asas                	post de teste #1                                  	post de teste #1	2016-06-11 21:26:37.966912	0	0	0	0
800	asas                	teste id                                          	assaas	2016-06-12 13:53:11.412972	0	0	0	0
\.


--
-- Data for Name: post_reaction; Type: TABLE DATA; Schema: public; Owner: pguser
--

COPY post_reaction (post_id, preader, like_dislike, shared, favorited) FROM stdin;
\.


--
-- Name: posts_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pguser
--

SELECT pg_catalog.setval('posts_post_id_seq', 28, true);


--
-- Data for Name: usergroup; Type: TABLE DATA; Schema: public; Owner: pguser
--

COPY usergroup (group_id, gname, gowner, group_photo, n_members) FROM stdin;
\.


--
-- Data for Name: webuser; Type: TABLE DATA; Schema: public; Owner: pguser
--

COPY webuser (login, uname, password, birthday, uphoto, ucover, motto, style_profile, style_bar) FROM stdin;
admin               	admin               	admin               	\N	\N	\N	\N	1	1
sasa                	sasasasasas         	sasa                	1993-11-22	\N	\N	\N	0	0
asas                	asas                	asas                	1994-11-22	\N	\N	asasasasasasas                                                                                      	2	5
\.


--
-- Data for Name: webuser_group; Type: TABLE DATA; Schema: public; Owner: pguser
--

COPY webuser_group (group_id, ulogin) FROM stdin;
\.


--
-- Data for Name: webuserdescription; Type: TABLE DATA; Schema: public; Owner: pguser
--

COPY webuserdescription (login, description) FROM stdin;
asas                	teaubayubaybcbabacbnyina
\.


--
-- Name: pk_fav_post; Type: CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY fav_post
    ADD CONSTRAINT pk_fav_post PRIMARY KEY (post_id, webuser);


--
-- Name: pk_follow; Type: CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY follow
    ADD CONSTRAINT pk_follow PRIMARY KEY (usender, ureceiver);


--
-- Name: pk_group; Type: CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY usergroup
    ADD CONSTRAINT pk_group PRIMARY KEY (group_id);


--
-- Name: pk_post_reaction; Type: CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY post_reaction
    ADD CONSTRAINT pk_post_reaction PRIMARY KEY (post_id, preader);


--
-- Name: pk_posts; Type: CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY post
    ADD CONSTRAINT pk_posts PRIMARY KEY (post_id);


--
-- Name: pk_webuser; Type: CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY webuser
    ADD CONSTRAINT pk_webuser PRIMARY KEY (login);


--
-- Name: pk_webuserdesc; Type: CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY webuserdescription
    ADD CONSTRAINT pk_webuserdesc PRIMARY KEY (login);


--
-- Name: pk_webusergroup; Type: CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY webuser_group
    ADD CONSTRAINT pk_webusergroup PRIMARY KEY (group_id, ulogin);


--
-- Name: sk_group; Type: CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY usergroup
    ADD CONSTRAINT sk_group UNIQUE (gname, gowner);


--
-- Name: sk_posts; Type: CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY post
    ADD CONSTRAINT sk_posts UNIQUE (post_id, powner);


--
-- Name: post_reaction_insert; Type: TRIGGER; Schema: public; Owner: pguser
--

CREATE TRIGGER post_reaction_insert AFTER INSERT OR DELETE OR UPDATE ON post_reaction FOR EACH ROW EXECUTE PROCEDURE update_post();


--
-- Name: fk_fav_post; Type: FK CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY fav_post
    ADD CONSTRAINT fk_fav_post FOREIGN KEY (post_id) REFERENCES post(post_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: fk_fav_post1; Type: FK CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY fav_post
    ADD CONSTRAINT fk_fav_post1 FOREIGN KEY (webuser) REFERENCES webuser(login) ON DELETE CASCADE;


--
-- Name: fk_follow; Type: FK CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY follow
    ADD CONSTRAINT fk_follow FOREIGN KEY (usender) REFERENCES webuser(login) ON DELETE CASCADE;


--
-- Name: fk_follow1; Type: FK CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY follow
    ADD CONSTRAINT fk_follow1 FOREIGN KEY (ureceiver) REFERENCES webuser(login) ON DELETE CASCADE;


--
-- Name: fk_group; Type: FK CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY usergroup
    ADD CONSTRAINT fk_group FOREIGN KEY (gowner) REFERENCES webuser(login) ON DELETE CASCADE;


--
-- Name: fk_post_reaction; Type: FK CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY post_reaction
    ADD CONSTRAINT fk_post_reaction FOREIGN KEY (post_id) REFERENCES post(post_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: fk_post_reaction1; Type: FK CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY post_reaction
    ADD CONSTRAINT fk_post_reaction1 FOREIGN KEY (preader) REFERENCES webuser(login) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: fk_posts; Type: FK CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY post
    ADD CONSTRAINT fk_posts FOREIGN KEY (powner) REFERENCES webuser(login) ON DELETE CASCADE;


--
-- Name: fk_webuserdesc; Type: FK CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY webuserdescription
    ADD CONSTRAINT fk_webuserdesc FOREIGN KEY (login) REFERENCES webuser(login) ON DELETE CASCADE;


--
-- Name: fk_webusergroup; Type: FK CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY webuser_group
    ADD CONSTRAINT fk_webusergroup FOREIGN KEY (group_id) REFERENCES usergroup(group_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: fk_webusergroup1; Type: FK CONSTRAINT; Schema: public; Owner: pguser
--

ALTER TABLE ONLY webuser_group
    ADD CONSTRAINT fk_webusergroup1 FOREIGN KEY (ulogin) REFERENCES webuser(login) ON DELETE CASCADE;


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


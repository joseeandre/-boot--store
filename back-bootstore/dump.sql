--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    islogged boolean NOT NULL
);


--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.items (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    "productCategory" integer NOT NULL,
    "clientId" integer NOT NULL,
    size text NOT NULL,
    quantity integer NOT NULL
);


--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- Name: pants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pants (
    id integer NOT NULL,
    name text NOT NULL,
    image text NOT NULL,
    description text NOT NULL,
    category_id integer NOT NULL,
    price text NOT NULL
);


--
-- Name: pants_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pants_id_seq OWNED BY public.pants.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token uuid NOT NULL
);


--
-- Name: session_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.session_id_seq OWNED BY public.session.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    token uuid NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: shirts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shirts (
    id integer NOT NULL,
    name text NOT NULL,
    image text NOT NULL,
    description text NOT NULL,
    category_id integer NOT NULL,
    price text NOT NULL,
    color text NOT NULL
);


--
-- Name: shirts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shirts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shirts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shirts_id_seq OWNED BY public.shirts.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- Name: pants id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pants ALTER COLUMN id SET DEFAULT nextval('public.pants_id_seq'::regclass);


--
-- Name: session id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session ALTER COLUMN id SET DEFAULT nextval('public.session_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: shirts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shirts ALTER COLUMN id SET DEFAULT nextval('public.shirts_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categories VALUES (1, 'Shirts');
INSERT INTO public.categories VALUES (2, 'Pants');


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.clients VALUES (2, 'robot@email.com', '$2b$10$8N1JxxT6QAYCPVChkviU1OTLQ/Stw/Uhaey5LZw/j2cVb6j/vnaNa', 'robot', false);
INSERT INTO public.clients VALUES (1, 'user@email.com', '$2b$10$CRkrPHiIBkdKrfWItBULPe4S5X1lvH8Vl9YZpdgDXGQ7ubq0SpUlm', 'user', false);
INSERT INTO public.clients VALUES (3, 'test@email.com', '$2b$10$SRU3RF9vNHAmIp/FoPAEYeITaVfJcPp26xg2F929X13W8vPw8rXJ.', 'test', false);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.items VALUES (1, 1, 2, 1, '44', 2);
INSERT INTO public.items VALUES (2, 1, 2, 1, '38', 1);
INSERT INTO public.items VALUES (3, 1, 2, 1, '40', 1);
INSERT INTO public.items VALUES (4, 2, 2, 1, '40', 1);
INSERT INTO public.items VALUES (5, 1, 1, 1, 'M', 1);
INSERT INTO public.items VALUES (6, 2, 1, 3, 'P', 1);


--
-- Data for Name: pants; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.pants VALUES (1, 'Calca das mais top puma', 'https://cdn.awsli.com.br/761/761722/produto/57753378/6ac3324b97.jpg', 'calca top das top malha boa preco bom leva ja que soh tem duas', 2, '50.00');
INSERT INTO public.pants VALUES (2, 'Calca das mais top nike', 'https://cdn.awsli.com.br/761/761722/produto/57753378/6ac3324b97.jpg', 'calca top das top malha boa preco bom leva ja que soh tem duas', 2, '60.00');
INSERT INTO public.pants VALUES (3, 'Calca das mais top adidas', 'https://cdn.awsli.com.br/761/761722/produto/57753378/6ac3324b97.jpg', 'calca top das top malha boa preco bom leva ja que soh tem duas', 2, '70.00');
INSERT INTO public.pants VALUES (4, 'Calca das mais top colcci', 'https://cdn.awsli.com.br/761/761722/produto/57753378/6ac3324b97.jpg', 'calca top das top malha boa preco bom leva ja que soh tem duas', 2, '100.00');
INSERT INTO public.pants VALUES (5, 'Calca zoada da addidas', 'https://cdn.awsli.com.br/761/761722/produto/57753378/6ac3324b97.jpg', 'calca top das top malha boa preco bom leva ja que soh tem duas', 2, '20.00');
INSERT INTO public.pants VALUES (6, 'Calca zoada da nike', 'https://cdn.awsli.com.br/761/761722/produto/57753378/6ac3324b97.jpg', 'calca top das top malha boa preco bom leva ja que soh tem duas', 2, '10.00');
INSERT INTO public.pants VALUES (7, 'Calca zoada da puma', 'https://cdn.awsli.com.br/761/761722/produto/57753378/6ac3324b97.jpg', 'calca top das top malha boa preco bom leva ja que soh tem duas', 2, '15.00');


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: shirts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.shirts VALUES (1, 'Camiseta das mais top nikes', 'https://somarmalhas.com.br/site/wp-content/uploads/2018/03/camiseta-510x574.jpg', 'Camiseta das mais top nikes', 1, '50.00', 'blue');
INSERT INTO public.shirts VALUES (2, 'Camiseta das mais top adidas', 'https://somarmalhas.com.br/site/wp-content/uploads/2018/03/camiseta-510x574.jpg', 'Camiseta das mais top adidas', 1, '60.00', 'blue');
INSERT INTO public.shirts VALUES (3, 'Camiseta das mais top puma', 'https://somarmalhas.com.br/site/wp-content/uploads/2018/03/camiseta-510x574.jpg', 'Camiseta das mais top puma', 1, '30.00', 'blue');
INSERT INTO public.shirts VALUES (4, 'Camiseta das mais top Calvin Klein', 'https://somarmalhas.com.br/site/wp-content/uploads/2018/03/camiseta-510x574.jpg', 'Camiseta das mais top Calvin Klein', 1, '70.00', 'blue');
INSERT INTO public.shirts VALUES (5, 'Camiseta das mais top Calvin Klein', 'https://somarmalhas.com.br/site/wp-content/uploads/2018/04/verde-band-510x510.jpg', 'Camiseta das mais top Calvin Klein', 1, '70.00', 'green');
INSERT INTO public.shirts VALUES (6, 'Camiseta das mais top HD', 'https://somarmalhas.com.br/site/wp-content/uploads/2018/04/verde-band-510x510.jpg', 'Camiseta das mais top HD', 1, '40.00', 'green');
INSERT INTO public.shirts VALUES (7, 'Camiseta das mais top Nike', 'https://somarmalhas.com.br/site/wp-content/uploads/2018/04/verde-band-510x510.jpg', 'Camiseta das mais top Nike', 1, '50.00', 'green');
INSERT INTO public.shirts VALUES (8, 'Camiseta das mais top Nike', 'https://somarmalhas.com.br/site/wp-content/uploads/2018/03/camiseta-branca-510x510.jpg', 'Camiseta das mais top Nike', 1, '50.00', 'white');
INSERT INTO public.shirts VALUES (9, 'Camiseta das mais top Puma', 'https://somarmalhas.com.br/site/wp-content/uploads/2018/03/camiseta-branca-510x510.jpg', 'Camiseta das mais top Puma', 1, '20.00', 'white');
INSERT INTO public.shirts VALUES (10, 'Camiseta das mais top Adidas', 'https://somarmalhas.com.br/site/wp-content/uploads/2018/03/camiseta-branca-510x510.jpg', 'Camiseta das mais top Adidas', 1, '60.00', 'white');
INSERT INTO public.shirts VALUES (11, 'Camiseta das mais top Adidas', 'https://somarmalhas.com.br/site/wp-content/uploads/2018/04/amarela-510x510.jpg', 'Camiseta das mais top Adidas', 1, '60.00', 'yellow');
INSERT INTO public.shirts VALUES (12, 'Camiseta das mais top Nike', 'https://somarmalhas.com.br/site/wp-content/uploads/2018/04/amarela-510x510.jpg', 'Camiseta das mais top Nike', 1, '40.00', 'yellow');
INSERT INTO public.shirts VALUES (13, 'Camiseta das mais top Reserva', 'https://somarmalhas.com.br/site/wp-content/uploads/2018/04/amarela-510x510.jpg', 'Camiseta das mais top Reserva', 1, '100.00', 'yellow');
INSERT INTO public.shirts VALUES (14, 'Camiseta das mais top Reserva', 'https://somarmalhas.com.br/site/wp-content/uploads/2018/04/vermelha-247x296.jpg', 'Camiseta das mais top Reserva', 1, '100.00', 'red');
INSERT INTO public.shirts VALUES (15, 'Camiseta das mais top puma', 'https://somarmalhas.com.br/site/wp-content/uploads/2018/04/vermelha-247x296.jpg', 'Camiseta das mais top puma', 1, '40.00', 'red');


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 2, true);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.clients_id_seq', 3, true);


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.items_id_seq', 6, true);


--
-- Name: pants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pants_id_seq', 7, true);


--
-- Name: session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.session_id_seq', 1, false);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 19, true);


--
-- Name: shirts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shirts_id_seq', 15, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: pants pants_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pants
    ADD CONSTRAINT pants_pkey PRIMARY KEY (id);


--
-- Name: shirts shirts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shirts
    ADD CONSTRAINT shirts_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--


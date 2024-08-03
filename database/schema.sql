
-- Enum Types
CREATE TYPE public.project_status_enum AS ENUM ('open', 'closed', 'ordered');
CREATE TYPE public.user_role_enum AS ENUM ('administrator', 'standard', 'premium');

-- Tables
CREATE TABLE public.element_categories
(
    category_id   SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE public.element_colors
(
    color_id   SERIAL PRIMARY KEY,
    color_name VARCHAR(255) NOT NULL
);

CREATE TABLE public.elements
(
    id                SERIAL PRIMARY KEY,
    name              VARCHAR(255)                      NOT NULL,
    color             INTEGER                           NOT NULL,
    category          INTEGER                           NOT NULL,
    width             NUMERIC(10, 2) DEFAULT 0,
    length            NUMERIC(10, 2) DEFAULT 0,
    depth             NUMERIC(10, 2) DEFAULT 0,
    stock_amount      INTEGER        DEFAULT 0          NOT NULL,
    price             NUMERIC(10, 2) DEFAULT 0          NOT NULL,
    installation_cost NUMERIC(10, 2) DEFAULT 0          NOT NULL,
    installation_time INTERVAL       DEFAULT '00:00:00' NOT NULL
);

CREATE TABLE public.projects
(
    id         SERIAL PRIMARY KEY,
    user_id    INTEGER NOT NULL,
    name       VARCHAR(255) DEFAULT 'My Project' NOT NULL ,
    start_date DATE    NOT NULL,
    end_date   DATE,
    status     public.project_status_enum DEFAULT 'open' NOT NULL ,
    to_share   BOOLEAN                    DEFAULT false NOT NULL
);

CREATE TABLE public.users
(
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(255) NOT NULL,
    email    VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role     public.user_role_enum DEFAULT 'standard'
);

CREATE TABLE public.project_elements
(
    project_id INTEGER           NOT NULL,
    element_id INTEGER           NOT NULL,
    quantity   INTEGER DEFAULT 0 NOT NULL,
    PRIMARY KEY (project_id, element_id)
);

CREATE TABLE public.category_compatibility
(
    category_id            INTEGER NOT NULL,
    compatible_category_id INTEGER NOT NULL,
    PRIMARY KEY (category_id, compatible_category_id)
);

-- Foreign Keys
ALTER TABLE public.elements
    ADD CONSTRAINT fk_category FOREIGN KEY (category) REFERENCES public.element_categories (category_id);

ALTER TABLE public.elements
    ADD CONSTRAINT fk_color FOREIGN KEY (color) REFERENCES public.element_colors (color_id);

ALTER TABLE public.project_elements
    ADD CONSTRAINT element_fk FOREIGN KEY (element_id) REFERENCES public.elements (id);

ALTER TABLE public.project_elements
    ADD CONSTRAINT project_fk FOREIGN KEY (project_id) REFERENCES public.projects (id);

ALTER TABLE public.projects
    ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES public.users (id);

ALTER TABLE public.category_compatibility
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.element_categories (category_id);

ALTER TABLE public.category_compatibility
    ADD CONSTRAINT fk_compatible_category FOREIGN KEY (compatible_category_id) REFERENCES public.element_categories (category_id);

-- Add Users
-- Add Users
INSERT INTO public.users (name, email, password, role) VALUES
    ('Admin User', 'admin@example.com', '$2b$10$sTGlj1oNzovpOMVx./hY/ei6pXs459G.UjQLHGuVMFN0KlA/5ibS.', 'administrator'),  -- Password is 'adminpass'
    ('Standard User', 'user@example.com', '$2b$10$VAVPx8KFpBnOVvkpBdIen.ofvYaF4UCmpNW6f5YsT92WfPAEax2Ny', 'standard');  -- Password is 'userpass'

-- Add Categories
INSERT INTO public.element_categories (category_name) VALUES
    ('Legs'),
    ('Tops'),
    ('Frames');

-- Add Colors
INSERT INTO public.element_colors (color_name) VALUES
    ('Red'),
    ('Blue'),
    ('Green');

-- Add Elements
INSERT INTO public.elements (name, color, category, width, length, depth, stock_amount, price, installation_cost, installation_time) VALUES
    ('Short Leg', 1, 1, 5.0, 5.0, 20.0, 100, 10.0, 2.0, '00:30:00'),
    ('Long Leg', 2, 1, 5.0, 5.0, 40.0, 50, 20.0, 3.0, '00:45:00'),
    ('Table Top', 3, 2, 100.0, 200.0, 5.0, 20, 100.0, 10.0, '01:00:00'),
    ('Frame', 1, 3, 50.0, 100.0, 10.0, 30, 50.0, 5.0, '00:40:00');

-- Add Projects
INSERT INTO public.projects (user_id, name, start_date, status) VALUES
    (1, 'Admin Project', '2024-01-01', 'open'),
    (2, 'User Project', '2024-01-02', 'open');

-- Add Project Elements
INSERT INTO public.project_elements (project_id, element_id, quantity) VALUES
    (1, 1, 4),
    (1, 2, 4),
    (1, 3, 1),
    (2, 1, 2),
    (2, 4, 1);

-- Add Category Compatibility
INSERT INTO public.category_compatibility (category_id, compatible_category_id) VALUES
    (1, 2),
    (1, 3),
    (2, 3);

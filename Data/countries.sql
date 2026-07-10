-- ===================================================
-- World Capital Quiz
-- Database Seed File
--
-- This file contains all countries and capitals used
-- by the application.
--
-- Version: 1.2.0
-- ===================================================

-- ===================================================
-- Europe
-- ===================================================

INSERT INTO countries (country, capital)
VALUES
('Belgium', 'Brussels'),
('Netherlands', 'Amsterdam'),
('Portugal', 'Lisbon'),
('Austria', 'Vienna'),
('Switzerland', 'Bern'),
('Poland', 'Warsaw'),
('Norway', 'Oslo'),
('Sweden', 'Stockholm'),
('Finland', 'Helsinki'),
('Denmark', 'Copenhagen');

-- ===================================================
-- Africa
-- ===================================================

INSERT INTO countries (country, capital)
VALUES
('Nigeria', 'Abuja'),
('Kenya', 'Nairobi'),
('Morocco', 'Rabat'),
('Algeria', 'Algiers'),
('Tunisia', 'Tunis'),
('Ghana', 'Accra'),
('Ethiopia', 'Addis Ababa'),
('Uganda', 'Kampala'),
('Zimbabwe', 'Harare'),
('Namibia', 'Windhoek');

-- Current total countries: 30
-- Target for v1.2.0: 50
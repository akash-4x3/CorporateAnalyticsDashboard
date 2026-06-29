-- =====================================================
-- Corporate Analytics Dashboard - Sample Data
-- =====================================================

USE corporate_analytics_dashboard;

-- =====================================================
-- Clear Existing Data
-- =====================================================

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM performance_metrics;
DELETE FROM users;
DELETE FROM departments;
DELETE FROM roles;

ALTER TABLE performance_metrics AUTO_INCREMENT = 1;
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE departments AUTO_INCREMENT = 1;
ALTER TABLE roles AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- Roles
-- =====================================================

INSERT INTO roles(role_name)
VALUES
('Super Admin'),
('Manager'),
('Employee');

-- =====================================================
-- Departments
-- =====================================================

INSERT INTO departments(department_name)
VALUES
('Human Resources'),
('Finance'),
('Sales'),
('Marketing'),
('Research & Innovation'),
('Information Technology'),
('Customer Support'),
('Operations');

-- =====================================================
-- Users
-- Password Hash:
-- $2a$10$Pc.//SN3OmQTs4zzj7M.Yuj/w7czIE7aHjotL06KMifTRYe/w7AGO.
-- =====================================================

INSERT INTO users
(full_name,email,password,role_id,department_id)
VALUES

('Akash Kumar',
'akash@corp.com',
'$2a$10$Pc.//SN3OmQTs4zzj7M.Yuj/w7czIE7aHjotL06KMifTRYe/w7AGO.',
1,
5),

('Rahul Sharma',
'rahul@corp.com',
'$2a$10$Pc.//SN3OmQTs4zzj7M.Yuj/w7czIE7aHjotL06KMifTRYe/w7AGO.',
2,
3),

('Priya Singh',
'priya@corp.com',
'$2a$10$Pc.//SN3OmQTs4zzj7M.Yuj/w7czIE7aHjotL06KMifTRYe/w7AGO.',
2,
1),

('Amit Kumar',
'amit@corp.com',
'$2a$10$Pc.//SN3OmQTs4zzj7M.Yuj/w7czIE7aHjotL06KMifTRYe/w7AGO.',
3,
6),

('Neha Verma',
'neha@corp.com',
'$2a$10$Pc.//SN3OmQTs4zzj7M.Yuj/w7czIE7aHjotL06KMifTRYe/w7AGO.',
3,
4),

('Vikas Patel',
'vikas@corp.com',
'$2a$10$Pc.//SN3OmQTs4zzj7M.Yuj/w7czIE7aHjotL06KMifTRYe/w7AGO.',
2,
5),

('Rohit Das',
'rohit@corp.com',
'$2a$10$Pc.//SN3OmQTs4zzj7M.Yuj/w7czIE7aHjotL06KMifTRYe/w7AGO.',
3,
8),

('Anjali Gupta',
'anjali@corp.com',
'$2a$10$Pc.//SN3OmQTs4zzj7M.Yuj/w7czIE7aHjotL06KMifTRYe/w7AGO.',
3,
2),

('Sneha Das',
'sneha@corp.com',
'$2a$10$Pc.//SN3OmQTs4zzj7M.Yuj/w7czIE7aHjotL06KMifTRYe/w7AGO.',
3,
7),

('Arjun Roy',
'arjun@corp.com',
'$2a$10$Pc.//SN3OmQTs4zzj7M.Yuj/w7czIE7aHjotL06KMifTRYe/w7AGO.',
3,
6);

-- =====================================================
-- Performance Metrics
-- =====================================================

INSERT INTO performance_metrics
(user_id,
review_period,
sales_amount,
tasks_completed,
customer_satisfaction,
performance_score)
VALUES

(1,'2026-Q1',185000,48,96.50,91.80),

(2,'2026-Q1',145000,42,91.20,87.40),

(3,'2026-Q1',172000,45,94.00,89.75),

(4,'2026-Q1',128000,36,88.50,82.30),

(5,'2026-Q1',98000,31,84.70,79.10),

(6,'2026-Q1',160000,43,92.10,88.20),

(7,'2026-Q1',76000,24,78.30,68.90),

(8,'2026-Q1',94000,28,82.00,72.80),

(9,'2026-Q1',118000,35,87.60,81.40),

(10,'2026-Q1',154000,40,90.50,85.60);

-- =====================================================
-- Sample Login Credentials
-- =====================================================

-- Super Admin
-- Email : akash@corp.com

-- Manager
-- Email : rahul@corp.com
-- Email : priya@corp.com
-- Email : vikas@corp.com

-- Employee
-- Email : amit@corp.com
-- Email : neha@corp.com
-- Email : rohit@corp.com
-- Email : anjali@corp.com
-- Email : sneha@corp.com
-- Email : arjun@corp.com
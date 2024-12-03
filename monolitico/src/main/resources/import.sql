
DELETE FROM loans where id >= 0;
INSERT INTO loans(type, max_term, max_amount, min_interest, max_interest) VALUES ("Primera Vivienda", 30, 80, 3.5, 5.0);
INSERT INTO loans(type, max_term, max_amount, min_interest, max_interest) VALUES ("Segunda Vivienda", 20, 70, 4.0, 6.0);
INSERT INTO loans(type, max_term, max_amount, min_interest, max_interest) VALUES ("Propiedades Comerciales", 25, 60, 5.0, 7.0);
INSERT INTO loans(type, max_term, max_amount, min_interest, max_interest) VALUES ("Remodelación", 15, 50, 4.5, 6.0);

SELECT type, COUNT(*) FROM loans GROUP BY type HAVING COUNT(*) > 1;
DELETE l1 FROM loans l1 INNER JOIN loans l2 WHERE l1.id > l2.id AND l1.type = l2.type;

DELETE FROM requirements where id >= 0;
INSERT INTO requirements(type, loan_name) VALUES ("Comprobante de ingresos", "Primera Vivienda");
INSERT INTO requirements(type, loan_name) VALUES ("Comprobante de ingresos", "Segunda Vivienda");
INSERT INTO requirements(type, loan_name) VALUES ("Comprobante de ingresos", "Propiedades Comerciales");
INSERT INTO requirements(type, loan_name) VALUES ("Comprobante de ingresos", "Remodelación");
INSERT INTO requirements(type, loan_name) VALUES ("Certificado de avalúo", "Primera Vivienda");
INSERT INTO requirements(type, loan_name) VALUES ("Certificado de avalúo", "Segunda Vivienda");
INSERT INTO requirements(type, loan_name) VALUES ("Certificado de avalúo", "Propiedades Comerciales");
INSERT INTO requirements(type, loan_name) VALUES ("Historial crediticio", "Primera Vivienda");
INSERT INTO requirements(type, loan_name) VALUES ("Historial crediticio", "Segunda Vivienda");
INSERT INTO requirements(type, loan_name) VALUES ("Escritura de la primera vivienda", "Segunda Vivienda");
INSERT INTO requirements(type, loan_name) VALUES ("Estado financiero del negocio", "Propiedades Comerciales");
INSERT INTO requirements(type, loan_name) VALUES ("Plan de negocios", "Propiedades Comerciales");
INSERT INTO requirements(type, loan_name) VALUES ("Presupuesto de la remodelación", "Remodelación");
INSERT INTO requirements(type, loan_name) VALUES ("Certificado de avalúo actualizado", "Remodelación");

SELECT type, loan_name, COUNT(*) FROM requirements GROUP BY type, loan_name HAVING COUNT(*) > 1;
DELETE l1 FROM requirements l1 INNER JOIN requirements l2 WHERE l1.id > l2.id AND l1.type = l2.type AND l1.loan_name = l2.loan_name;

INSERT INTO users (TYPE, EMAIL, NAME, PASSWORD, RUT) SELECT 1, "asd@asd.com", "Matias", "asdasd", "12345678-9" WHERE NOT EXISTS (SELECT 1 FROM users WHERE RUT = "12345678-9");
SELECT type, loan_name, COUNT(*) FROM requirements GROUP BY type, loan_name HAVING COUNT(*) > 1;
DELETE l1 FROM requirements l1 INNER JOIN requirements l2 WHERE l1.id > l2.id AND l1.type = l2.type AND l1.loan_name = l2.loan_name;


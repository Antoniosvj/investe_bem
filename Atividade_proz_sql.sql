--- Criação das tabelas em FN3 -----------------------------------------------------

CREATE TABLE perfis_investidor (
    id SERIAL PRIMARY KEY,
    tipo_perfil VARCHAR(50) NOT NULL,
    faixa_investimento VARCHAR(50) NOT NULL
);

--- Criação das tabelas em FN3 -----------------------------------------------------

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    idade INT NOT NULL,
    perfil_investidor_id INT,
    FOREIGN KEY (perfil_investidor_id) REFERENCES perfis_investidor(id)
);

--- Criação das tabelas em FN3 -----------------------------------------------------

CREATE TABLE tipos_investimentos (
    id SERIAL PRIMARY KEY,
    nome_investimento VARCHAR(50) NOT NULL,
    perfil_investidor_id INT,
    FOREIGN KEY (perfil_investidor_id) REFERENCES perfis_investidor(id)
);

--- Inserção dos Valores nas tabelas -----------------------------------------------

INSERT INTO usuarios (nome, email, idade, perfil_investidor_id) VALUES
  ('João Ricardo', 'joaoricardo@investebem.com.br', 48, 1),
  ('Roberto Dinamite', 'robertodinamite@investebem.com.br', 36, 2),
  ('Dario Conca', 'darioconca@investebem.com.br', 39, 3),
  ('Julia Roberts', 'juliaroberts@investebem.com.br', 28, 2),
  ('Rebeca Camargo', 'rebecacamargo@investebem.com.br', 54, 2),
  ('João de Deus', 'joaodedeus@investebem.com.br', 45, 1),
  ('Roberto Justos', 'robertojustos@investebem.com.br', 32, 2),
  ('Martin Dario', 'martindario@investebem.com.br', 40, 1),
  ('Juliana Paes', 'jupaes@investebem.com.br', 27, 1),
  ('Renata Celibele', 'celibele_re@investebem.com.br', 55, 3),
  ('Jose Nivaldo', 'josenivaldo@investebem.com.br', 47, 2),
  ('Renato Kaiser', 'renatokaiser@investebem.com.br', 25, 2),
  ('Renan Queiroz', 'queiroz_renan@investebem.com.br', 39, 2),
  ('Juliane Silva', 'ju_silva@investebem.com.br', 21, 1),
  ('Rebeca Andrade', 'rebeca_andrade@investebem.com.br', 55, 1),
  ('Jose Ricardo', 'josericardo@investebem.com.br', 48, 3),
  ('Roberto Dijalma', 'robertodijalma@investebem.com.br', 36, 3),
  ('Darlan Costa', 'darlancosta@investebem.com.br', 52, 3),
  ('Juliano Silva', 'juliano_silva@investebem.com.br', 28, 1),
  ('Renildo Pereira', 'renildo_pereira@investebem.com.br', 44, 2),
  ('João da Silva', 'joaodasilva@investebem.com.br', 89, 1),
  ('Robersson Claid', 'robersson-claid@investebem.com.br', 25, 3),
  ('Genivaldo Martins', 'genivaldo_martins@investebem.com.br', 18, 2),
  ('Julian Silva', 'julian_sil@investebem.com.br', 36, 1),
  ('Renato Dantas', 'dantas_renato@investebem.com.br', 19, 1),
  ('Jose Maria', 'jose-maria@investebem.com.br', 84, 3),
  ('Renato Chivas', 'renato_chivas@investebem.com.br', 34, 2),
  ('Loran Bittencurt', 'loran-bittencurt@investebem.com.br', 33, 2),
  ('Juliana Souza', 'ju_souza@investebem.com.br', 42, 1),
  ('Richard Rios', 'richard-rios@investebem.com.br', 54, 1)


--- Inserção dos Valores nas tabelas -----------------------------------------------

INSERT INTO perfis_investidor (tipo_perfil, faixa_investimento) VALUES
  ('Moderado', 'De 10 a 50 mil'),
  ('Agressivo', 'Acima de 50 mil'),
  ('Conservador', 'Até 10 mil')

--- Inserção dos Valores nas tabelas -----------------------------------------------

INSERT INTO tipos_investimentos (nome_investimento, perfil_investidor_id) VALUES
  ('Poupança', 3),
  ('FIIS', 2),
  ('Ações', 2),
  ('Tesouro Direto', 3),
  ('LCI', 1),
  ('LCA', 1),
  ('Debêntures', 2),
  ('CDB', 3),
  ('Fundos de Investimento', 1)


--- CONSULTAS 

SELECT * FROM usuarios;

SELECT * FROM perfis_investidor;

SELECT * FROM tipos_investimentos;


--- Obter informações sobre usuários junto com seu perfil de investidor:
SELECT u.id, u.nome, u.email, u.idade, p.tipo_perfil, p.faixa_investimento
FROM usuarios u
JOIN perfis_investidor p ON u.perfil_investidor_id = p.id;


--- Obter informações sobre investimentos junto com o tipo de perfil associado:
SELECT t.id, t.nome_investimento, p.tipo_perfil, p.faixa_investimento
FROM tipos_investimentos t
JOIN perfis_investidor p ON t.perfil_investidor_id = p.id;


--- Obter informações completas sobre usuários, seus perfis de investidor e os tipos de investimentos associados a esses perfis:
SELECT u.id AS usuario_id, u.nome AS usuario_nome, u.email, u.idade,
       p.id AS perfil_id, p.tipo_perfil, p.faixa_investimento,
       t.id AS investimento_id, t.nome_investimento
FROM usuarios u
JOIN perfis_investidor p ON u.perfil_investidor_id = p.id
JOIN tipos_investimentos t ON p.id = t.perfil_investidor_id;


--- Obter a contagem de usuários por cada tipo de perfil de investidor:
SELECT p.tipo_perfil, COUNT(u.id) AS numero_usuarios
FROM perfis_investidor p
LEFT JOIN usuarios u ON p.id = u.perfil_investidor_id
GROUP BY p.tipo_perfil;


--- Obter a contagem de tipos de investimentos por cada perfil de investidor:
SELECT p.tipo_perfil, COUNT(t.id) AS numero_investimentos
FROM perfis_investidor p
LEFT JOIN tipos_investimentos t ON p.id = t.perfil_investidor_id
GROUP BY p.tipo_perfil;


--- Obter todos os usuários que têm um perfil de investidor específico (por exemplo, "Moderado"):
SELECT u.id, u.nome, u.email, u.idade
FROM usuarios u
JOIN perfis_investidor p ON u.perfil_investidor_id = p.id
WHERE p.tipo_perfil = 'Moderado';


--- Obter todos os tipos de investimentos para um perfil de investidor específico (por exemplo, "Conservador"):
SELECT t.id, t.nome_investimento
FROM tipos_investimentos t
JOIN perfis_investidor p ON t.perfil_investidor_id = p.id
WHERE p.tipo_perfil = 'Conservador';


--- Mostrar todos os usuários e os tipos de investimentos associados a seus perfis de investidores.
SELECT 
    u.nome AS usuario,
    u.email,
    u.idade,
    ti.nome_investimento
FROM usuarios u
JOIN perfis_investidor p ON u.perfil_investidor_id = p.id
JOIN tipos_investimentos ti ON p.id = ti.perfil_investidor_id
ORDER BY u.nome;


--- Contar quantos usuários estão associados a cada tipo de investimento.
SELECT 
    ti.nome_investimento,
    COUNT(u.id) AS numero_usuarios
FROM tipos_investimentos ti
JOIN usuarios u ON ti.perfil_investidor_id = u.perfil_investidor_id
GROUP BY ti.nome_investimento
ORDER BY numero_usuarios DESC;


--- Mostrar a idade média dos usuários para cada tipo de investimento.
SELECT 
    ti.nome_investimento,
    AVG(u.idade) AS idade_media
FROM tipos_investimentos ti
JOIN usuarios u ON ti.perfil_investidor_id = u.perfil_investidor_id
GROUP BY ti.nome_investimento
ORDER BY idade_media DESC;


--- Mostrar os tipos de investimentos que têm o maior número de usuários associados, com um limite de 5 tipos.
SELECT 
    ti.nome_investimento,
    COUNT(u.id) AS numero_usuarios
FROM tipos_investimentos ti
JOIN usuarios u ON ti.perfil_investidor_id = u.perfil_investidor_id
GROUP BY ti.nome_investimento
ORDER BY numero_usuarios DESC
LIMIT 5;


--- Encontrar usuários que não têm nenhum tipo de investimento associado.
SELECT 
    u.nome,
    u.email,
    u.idade
FROM usuarios u
LEFT JOIN tipos_investimentos ti ON u.perfil_investidor_id = ti.perfil_investidor_id
WHERE ti.nome_investimento IS NULL;


--- Mostrar a distribuição das idades dos usuários para cada tipo de investimento.
SELECT 
    ti.nome_investimento,
    u.idade,
    COUNT(u.id) AS numero_usuarios
FROM tipos_investimentos ti
JOIN usuarios u ON ti.perfil_investidor_id = u.perfil_investidor_id
GROUP BY ti.nome_investimento, u.idade
ORDER BY ti.nome_investimento, u.idade;


--- Mostrar qual perfil de investidor está associado ao maior número de tipos de investimento.
SELECT 
    p.tipo_perfil,
    COUNT(ti.id) AS numero_tipos_investimento
FROM perfis_investidor p
JOIN tipos_investimentos ti ON p.id = ti.perfil_investidor_id
GROUP BY p.tipo_perfil
ORDER BY numero_tipos_investimento DESC;

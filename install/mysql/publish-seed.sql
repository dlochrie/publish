INSERT INTO `user`
  (display_name, slug, email, google_id, created, updated)
VALUES
  ('Leonardo Davinci', 'leonardo-davinci', 'ldavinci@email.com',
      md5(ROUND(100.0 + 400.0 * RAND())), NOW(), NOW()),
  ('Martin Luther King', 'martin-luther-king', 'mlk@email.com',
      md5(ROUND(100.0 + 400.0 * RAND())), NOW(), NOW()),
  ('Michael Jordan', 'michael-jordan', 'mj@email.com',
      md5(ROUND(100.0 + 400.0 * RAND())), NOW(), NOW()),
  ('Neil Armstrong', 'neil-armstrong', 'n.armstrong@email.com',
      md5(ROUND(100.0 + 400.0 * RAND())), NOW(), NOW()),
  ('Julius Caesar', 'julius-caesar', 'caesar1@email.com',
      md5(ROUND(100.0 + 400.0 * RAND())), NOW(), NOW()),
  ('George Washington', 'george-washington', 'pres1@email.com',
      md5(ROUND(100.0 + 400.0 * RAND())), NOW(), NOW());
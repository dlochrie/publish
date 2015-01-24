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


INSERT INTO `post`
(user_id, title, slug, description, description_md, body, body_md, created,
updated)
VALUES (
1, 'First Story', 'first-story', 'First story description.',
'First story description.',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus enim
tellus, bibendum ac mauris ut, lacinia volutpat nisl. Donec mauris diam,
accumsan in condimentum vel, pretium in elit. Nulla viverra felis et lectus
ultricies, vel egestas leo vestibulum. Quisque ultrices metus ac tellus
bibendum, pulvinar hendrerit nisl volutpat. Nullam fermentum, diam eu
accumsan cursus, metus felis faucibus odio, non placerat dui orci a nunc.

Fusce et iaculis orci. Vestibulum ac posuere quam, sit amet interdum nisi.
Etiam rhoncus porta sollicitudin. Praesent aliquet sapien vitae diam rutrum,
at convallis metus vestibulum. Proin a mattis justo. Ut ullamcorper magna
eget est lobortis dapibus. Morbi est ex, mattis id sodales eget, auctor
sodales nisl. Proin odio enim, tincidunt sagittis urna vitae, blandit
scelerisque diam.',
'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus enim
tellus, bibendum ac mauris ut, lacinia volutpat nisl. Donec mauris diam,
accumsan in condimentum vel, pretium in elit. Nulla viverra felis et lectus
ultricies, vel egestas leo vestibulum. Quisque ultrices metus ac tellus
bibendum, pulvinar hendrerit nisl volutpat. Nullam fermentum, diam eu
accumsan cursus, metus felis faucibus odio, non placerat dui orci a nunc.</p>
<p>Fusce et iaculis orci. Vestibulum ac posuere quam, sit amet interdum nisi.
Etiam rhoncus porta sollicitudin. Praesent aliquet sapien vitae diam rutrum,
at convallis metus vestibulum. Proin a mattis justo. Ut ullamcorper magna
eget est lobortis dapibus. Morbi est ex, mattis id sodales eget, auctor
sodales nisl. Proin odio enim, tincidunt sagittis urna vitae, blandit
scelerisque diam.</p>',
NOW(),
NOW()),
(
1, 'Second Story', 'second-story', 'Second story description.',
'Second story description.',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus enim
tellus, bibendum ac mauris ut, lacinia volutpat nisl. Donec mauris diam,
accumsan in condimentum vel, pretium in elit. Nulla viverra felis et lectus
ultricies, vel egestas leo vestibulum. Quisque ultrices metus ac tellus
bibendum, pulvinar hendrerit nisl volutpat. Nullam fermentum, diam eu
accumsan cursus, metus felis faucibus odio, non placerat dui orci a nunc.

Fusce et iaculis orci. Vestibulum ac posuere quam, sit amet interdum nisi.
Etiam rhoncus porta sollicitudin. Praesent aliquet sapien vitae diam rutrum,
at convallis metus vestibulum. Proin a mattis justo. Ut ullamcorper magna
eget est lobortis dapibus. Morbi est ex, mattis id sodales eget, auctor
sodales nisl. Proin odio enim, tincidunt sagittis urna vitae, blandit
scelerisque diam.',
'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus enim
tellus, bibendum ac mauris ut, lacinia volutpat nisl. Donec mauris diam,
accumsan in condimentum vel, pretium in elit. Nulla viverra felis et lectus
ultricies, vel egestas leo vestibulum. Quisque ultrices metus ac tellus
bibendum, pulvinar hendrerit nisl volutpat. Nullam fermentum, diam eu
accumsan cursus, metus felis faucibus odio, non placerat dui orci a nunc.</p>
<p>Fusce et iaculis orci. Vestibulum ac posuere quam, sit amet interdum nisi.
Etiam rhoncus porta sollicitudin. Praesent aliquet sapien vitae diam rutrum,
at convallis metus vestibulum. Proin a mattis justo. Ut ullamcorper magna
eget est lobortis dapibus. Morbi est ex, mattis id sodales eget, auctor
sodales nisl. Proin odio enim, tincidunt sagittis urna vitae, blandit
scelerisque diam.</p>',
NOW(),
NOW()),
(
2, 'Third Story', 'third-story', 'Third story description.',
'Third story description.',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus enim
tellus, bibendum ac mauris ut, lacinia volutpat nisl. Donec mauris diam,
accumsan in condimentum vel, pretium in elit. Nulla viverra felis et lectus
ultricies, vel egestas leo vestibulum. Quisque ultrices metus ac tellus
bibendum, pulvinar hendrerit nisl volutpat. Nullam fermentum, diam eu
accumsan cursus, metus felis faucibus odio, non placerat dui orci a nunc.

Fusce et iaculis orci. Vestibulum ac posuere quam, sit amet interdum nisi.
Etiam rhoncus porta sollicitudin. Praesent aliquet sapien vitae diam rutrum,
at convallis metus vestibulum. Proin a mattis justo. Ut ullamcorper magna
eget est lobortis dapibus. Morbi est ex, mattis id sodales eget, auctor
sodales nisl. Proin odio enim, tincidunt sagittis urna vitae, blandit
scelerisque diam.',
'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus enim
tellus, bibendum ac mauris ut, lacinia volutpat nisl. Donec mauris diam,
accumsan in condimentum vel, pretium in elit. Nulla viverra felis et lectus
ultricies, vel egestas leo vestibulum. Quisque ultrices metus ac tellus
bibendum, pulvinar hendrerit nisl volutpat. Nullam fermentum, diam eu
accumsan cursus, metus felis faucibus odio, non placerat dui orci a nunc.</p>
<p>Fusce et iaculis orci. Vestibulum ac posuere quam, sit amet interdum nisi.
Etiam rhoncus porta sollicitudin. Praesent aliquet sapien vitae diam rutrum,
at convallis metus vestibulum. Proin a mattis justo. Ut ullamcorper magna
eget est lobortis dapibus. Morbi est ex, mattis id sodales eget, auctor
sodales nisl. Proin odio enim, tincidunt sagittis urna vitae, blandit
scelerisque diam.</p>',
NOW(),
NOW());

INSERT INTO `category`
(`name`, `name_short`)
VALUES
('News', 'News'),
('Sports', 'Sports'),
('Music', 'Music'),
('Science and Technology', 'Sciene & Tech');

INSERT INTO `post_category`
(`post_id`, `category_id`)
VALUES
(1, 1), (1, 2), (2, 3), (2, 1), (3, 2);
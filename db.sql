INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Alex', 'Miccio', 'miccio.alex@gmail.com', '$2y$10$xSvy/MRMx7lNHodW3Vbi7OxUvGa4t.vyn.6rUYliwVZirKb7NO9JW', '2016-07-31 10:00:00', '2016-07-31 10:00:00'),
(2, 'Alex', 'Miccio', 'miccio.alex.1@gmail.com', '$2y$10$dTJNIi8vAtZRG.8EBNvisemh4HNQHRkyXCt1.MwDL31qALY.dd/LO', '2016-07-31 10:00:00', '2016-07-31 10:00:00'),
(3, 'Alex', 'Miccio', 'miccio.alex.2@gmail.com', '$2y$10$7hIEJV8koeSdhu1KzugPe.naC8dgXbsKivd0aS.nVU3n9lVzupGS.', '2016-07-31 10:00:00', '2016-07-31 10:00:00'),
(4, 'Alex', 'Miccio', 'miccio.alex.3@gmail.com', '$2y$10$D7Spsq9kVwAgWrSTpTs5SuDHbQRTyDIoEogSK9qfS6eulNwTUvMka', '2016-07-31 10:00:00', '2016-07-31 10:00:00'),
(5, 'Alex', 'Miccio', 'miccio.alex.4@gmail.com', '$2y$10$bNM2nehmdqNr19dgcMjM/O92b1K..Pfl7LXTLbcavvbanu19XppPC', '2016-07-31 10:00:00', '2016-07-31 10:00:00'),
(6, 'Alex', 'Miccio', 'miccio.alex.5@gmail.com', '$2y$10$Cpk/SlLzXTctkvB/f.UyBehMCqEhY6uXe3cNeIZU4bp3lrJ6vqYhe', '2016-07-31 10:00:00', '2016-07-31 10:00:00');

INSERT INTO `categories` (`id`, `name`, `description`, `image`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'name1', 'description1', 'images/categories/1.jpg', 1, '2016-07-31 10:00:00', '2016-07-31 10:00:00'),
(2, 'name2', 'description2', 'images/categories/2.jpg', 2, '2016-07-31 10:00:00', '2016-07-31 10:00:00'),
(3, 'name3', 'description3', 'images/categories/3.jpg', 3, '2016-07-31 10:00:00', '2016-07-31 10:00:00'),
(4, 'name4', 'description4', 'images/categories/4.jpg', 4, '2016-07-31 10:00:00', '2016-07-31 10:00:00'),
(5, 'name5', 'description5', 'images/categories/5.jpg', 5, '2016-07-31 10:00:00', '2016-07-31 10:00:00'),
(6, 'name6', 'description6', 'images/categories/6.jpg', 6, '2016-07-31 10:00:00', '2016-07-31 10:00:00');

INSERT INTO `prs` (`id`, `first_name`, `last_name`, `created_at`, `updated_at`) VALUES
('1', 'Federico', 'Braconi', '2016-07-31 10:00:00', '2016-07-31 10:00:00'),
('2', 'Roland', 'Boga', '2016-07-31 10:00:00', '2016-07-31 10:00:00');

INSERT INTO `category_pr` (`id`, `category_id`, `pr_id`, `created_at`, `updated_at`) VALUES
('1', '1', '1', '2016-07-31 10:00:00', '2016-07-31 10:00:00'),
('2', '1', '2', '2016-07-31 10:00:00', '2016-07-31 10:00:00'),
('3', '2', '1', '2016-07-31 10:00:00', '2016-07-31 10:00:00');

INSERT INTO `events` (`id`, `name`, `description`, `starting_date`, `maximum_partecipants`, `image`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'name1', 'description1', '2016-07-31 10:00:00', 10, 'images/events/1.jpg', 1, '2016-07-31 10:00:00', '2016-07-31 10:00:00'),
(2, 'name2', 'description2', '2016-07-31 11:00:00', 20, 'images/events/2.jpg', 1, '2016-07-31 10:00:00', '2016-07-31 10:00:00');

INSERT INTO `partecipants` (`id`, `name`, `event_id`, `pr_id`, `created_at`, `updated_at`) VALUES
(1, 'Alex Miccio', '1', '1', '2016-07-31 10:00:00', '2016-07-31 10:00:00'),
(2, 'Lorenzo Alberetti', '1', '2', '2016-07-31 10:00:00', '2016-07-31 10:00:00'),
(3, 'Luca Giovannetti', '2', '1', '2016-07-31 10:00:00', '2016-07-31 10:00:00');

INSERT INTO `counters` (`id`, `visitors`, `created_at`, `updated_at`) VALUES
('1', '0', '2016-07-31 10:00:00', '2016-07-31 10:00:00');

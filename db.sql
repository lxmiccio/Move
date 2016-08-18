INSERT INTO `categories` (`id`, `name`, `image`, `created_at`, `updated_at`) VALUES
(1, 'YOUNG PROJECT', 'images/categories/1.jpg', '2016-08-17 10:00:00', '2016-08-17 10:00:00'),
(2, 'SHOWCASE HOUSE GROUP', 'images/categories/2.jpg', '2016-08-17 10:00:00', '2016-08-17 10:00:00'),
(3, 'MEETING & SPORT', 'images/categories/3.jpg', '2016-08-17 10:00:00', '2016-08-17 10:00:00'),
(4, 'APERITIVI', 'images/categories/4.jpg', '2016-08-17 10:00:00', '2016-08-17 10:00:00'),
(5, 'PARTY UNIVERSITARI', 'images/categories/5.jpg', '2016-08-17 10:00:00', '2016-08-17 10:00:00'),
(6, 'GRANDI EVENTI', 'images/categories/6.jpg', '2016-08-17 10:00:00', '2016-08-17 10:00:00');

INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `password`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'Federico', 'Braconi', 'federico', '$2y$10$WRwbazpcsIwfw4wO.1SuTuZsZ1QoTleB4sq5y5LeONaPmPs4tR4Cq', 1, '2016-08-17 10:00:00', '2016-08-17 10:00:00'),
(2, 'Nicolò', 'Gobbi', 'nicolò', '$2y$10$auvx0QFjNBHawPvAuy3FwORsZiOl1F3ROCA9b9ks2dBKjyvAzU5lG', 1, '2016-08-17 10:00:00', '2016-08-17 10:00:00'),
(3, 'Eleonora', 'Grigioni', 'eleonora', '$2y$10$sASKpUH1is07Btj0yRTwqOaXFZLQcbDd4zH8tcptsyQh94RM4Xn5C', 2, '2016-08-17 10:00:00', '2016-08-17 10:00:00'),
(4, 'Alberto', 'Frisso', 'alberto', '$2y$10$s0jH56kT2saWlhLaQw6FAual2sL5cghalJURIj9/L4EgC8yEAp.Dq', 2, '2016-08-17 10:00:00', '2016-08-17 10:00:00'),
(5, 'Giorgio', 'Bonsignore', 'giorgio', '$2y$10$yiiO6acoK.8l83KgIaZ0vueizoohXL6SwGCoWAHHqL9vjtHJg/8uy', 3, '2016-08-17 10:00:00', '2016-08-17 10:00:00'),
(6, 'Simone', 'Tesorini', 'simone', '$2y$10$7HtOM0/VKL17eYPWhtYBvufUMGiWnRI4dEIJakGq1.nOF1A3Doqm2', 4, '2016-08-17 10:00:00', '2016-08-17 10:00:00'),
(7, 'Michelangelo', 'Baldoni', 'michelangelo', '$2y$10$wLfO7iKPWQDBCyVe3MrUeO.YpNYKCZ..TYD4gUcsir5OFXpzHuDuq', 5, '2016-08-17 10:00:00', '2016-08-17 10:00:00'),
(8, 'Lorenzo', 'Baldoni', 'lorenzo', '$2y$10$ji2touVZcjugr3YLNt7JE.rNfr27la4Zo.ScERjJEHqNe05sgs1ti', 5, '2016-08-17 10:00:00', '2016-08-17 10:00:00'),
(9, 'Vincenzo', 'D''Alvia', 'vincenzo', '$2y$10$oaePAa.4l4StqVdnxJ6WwOGgrX.tuYs0eEjWMyT7YXyxG9OcY8B0.', 6, '2016-08-17 10:00:00', '2016-08-17 10:00:00');

INSERT INTO `counters` (`id`, `visitors`, `created_at`, `updated_at`) VALUES
('1', '0', '2016-08-17 10:00:00', '2016-08-17 10:00:00');

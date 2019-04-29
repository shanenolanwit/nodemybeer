
CREATE TABLE IF NOT EXISTS `beer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  `review` VARCHAR(255),
  `latitude` DECIMAL(10, 8) NOT NULL,
  `longitude` DECIMAL(11, 8) NOT NULL,
  `date` DATE,
  `base64img` TEXT NOT NULL,  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

-- create dbs
CREATE DATABASE todos;

-- create table
-- CREATE TABLE `collector` (
--      `id` int(20) NOT NULL AUTO_INCREMENT,
--      `collector` varchar(20) NOT NULL  UNIQUE, 
--      `sampleid` int(9) NOT NULL
--      PRIMARY KEY (`id`)
--      FOREIGN KEY (`sampleid`) REFERENCES Sample(`sampleid`)
--      ON DELETE CASCADE
-- ) ;
CREATE TABLE `Samples` (
     `num` int(20) NOT NULL AUTO_INCREMENT ,
     `id` int(20) NOT NULL ,   
     `user` TINYTEXT(20) NOT NULL ,  
     `species_guess` TINYTEXT(20) NOT NULL ,  
     `time_observed_at` DATETIME NOT NULL ,  
     `longitude` DOUBLE NOT NULL ,  
     `latitude` DOUBLE NOT NULL ,  
      PRIMARY KEY (`num`,`id`) UNIQUE,
) ;
CREATE TABLE `Problems`(
     `id` int(20) NOT NULL,
     `problem_num` int(20) NOT NULL AUTO_INCREMENT,
     `problem_type` TINYTEXT(20) NOT NULL ,
     `problem_short` TINYTEXT(50) NOT NULL,
     `problem_short` TINYTEXT(50) NOT NULL,
     `advice_short` TINYTEXT(50) NOT NULL,
     `long_short` TINYTEXT(50) NOT NULL,
     `picture` BLOB,
      PRIMARY KEY (`problem_num`) UNIQUE,
      FOREIGN KEY (`id`) REFERENCES Samples(`id`)
) ;
 
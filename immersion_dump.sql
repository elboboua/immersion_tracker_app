-- MySQL dump 10.13  Distrib 8.0.17, for osx10.14 (x86_64)
--
-- Host: localhost    Database: immersion_tracker_app
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (4,'20200607191403_initial.js',1,'2020-06-07 17:33:54');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations_lock` (
  `index` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int(11) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` VALUES (1,0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=180 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language`
--

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` VALUES (1,'Acholi'),(2,'Afrikaans'),(3,'Albanian'),(4,'Amharic'),(5,'Arabic'),(6,'Ashante'),(7,'Assyrian'),(8,'Azerbaijani'),(9,'Azeri'),(10,'Bajuni'),(11,'Basque'),(12,'Behdini'),(13,'Belorussian'),(14,'Bengali'),(15,'Berber'),(16,'Bosnian'),(17,'Bravanese'),(18,'Bulgarian'),(19,'Burmese'),(20,'Cakchiquel'),(21,'Cambodian'),(22,'Cantonese'),(23,'Catalan'),(24,'Chaldean'),(25,'Chamorro'),(26,'Chao-chow'),(27,'Chavacano'),(28,'Chuukese'),(29,'Coptic'),(30,'Croatian'),(31,'Czech'),(32,'Danish'),(33,'Dari'),(34,'Dinka'),(35,'Diula'),(36,'Dutch'),(37,'Egyptian Arabic'),(38,'English'),(39,'Estonian'),(40,'Fante'),(41,'Farsi'),(42,'Finnish'),(43,'Flemish'),(44,'French'),(45,'Fukienese'),(46,'Fula'),(47,'Fulani'),(48,'Fuzhou'),(49,'Gaddang'),(50,'Gaelic'),(51,'Gaelic-irish'),(52,'Gaelic-scottish'),(53,'Georgian'),(54,'German'),(55,'Gorani'),(56,'Greek'),(57,'Gujarati'),(58,'Gulf Arabic'),(59,'Haitian Creole'),(60,'Hakka'),(61,'Hakka-chinese'),(62,'Hausa'),(63,'Hebrew'),(64,'Hindi'),(65,'Hmong'),(66,'Hungarian'),(67,'Ibanag'),(68,'Icelandic'),(69,'Igbo'),(70,'Ilocano'),(71,'Indonesian'),(72,'Inuktitut'),(73,'Italian'),(74,'Jakartanese'),(75,'Japanese'),(76,'Javanese'),(77,'Kanjobal'),(78,'Karen'),(79,'Karenni'),(80,'Kashmiri'),(81,'Kazakh'),(82,'Kikuyu'),(83,'Kinyarwanda'),(84,'Kirundi'),(85,'Korean'),(86,'Kosovan'),(87,'Kotokoli'),(88,'Krio'),(89,'Kurdish'),(90,'Kurmanji'),(91,'Kyrgyz'),(92,'Lakota'),(93,'Laotian'),(94,'Latvian'),(95,'Levantine Arabic'),(96,'Lingala'),(97,'Lithuanian'),(98,'Luganda'),(99,'Maay'),(100,'Macedonian'),(101,'Malay'),(102,'Malayalam'),(103,'Maltese'),(104,'Mandarin'),(105,'Mandingo'),(106,'Mandinka'),(107,'Marathi'),(108,'Marshallese'),(109,'Mirpuri'),(110,'Mixteco'),(111,'Moldavan'),(112,'Mongolian'),(113,'Montenegrin'),(114,'Navajo'),(115,'Neapolitan'),(116,'Nepali'),(117,'Nigerian Pidgin'),(118,'North African Arabic'),(119,'Norwegian'),(120,'Oromo'),(121,'Pahari'),(122,'Papago'),(123,'Papiamento'),(124,'Pashto'),(125,'Patois'),(126,'Pidgin English'),(127,'Polish'),(128,'Portug.creole'),(129,'Portuguese'),(130,'Pothwari'),(131,'Pulaar'),(132,'Punjabi'),(133,'Putian'),(134,'Quichua'),(135,'Romanian'),(136,'Russian'),(137,'Samoan'),(138,'Serbian'),(139,'Shanghainese'),(140,'Shona'),(141,'Sichuan'),(142,'Sicilian'),(143,'Sinhalese'),(144,'Slovak'),(145,'Somali'),(146,'Sorani'),(147,'Spanish'),(148,'Sudanese Arabic'),(149,'Sundanese'),(150,'Susu'),(151,'Swahili'),(152,'Swedish'),(153,'Sylhetti'),(154,'Tagalog'),(155,'Taiwanese'),(156,'Tajik'),(157,'Tamil'),(158,'Telugu'),(159,'Thai'),(160,'Tibetan'),(161,'Tigre'),(162,'Tigrinya'),(163,'Toishanese'),(164,'Tongan'),(165,'Toucouleur'),(166,'Trique'),(167,'Tshiluba'),(168,'Turkish'),(169,'Ukrainian'),(170,'Urdu'),(171,'Uyghur'),(172,'Uzbek'),(173,'Vietnamese'),(174,'Visayan'),(175,'Welsh'),(176,'Wolof'),(177,'Yiddish'),(178,'Yoruba'),(179,'Yupik');
/*!40000 ALTER TABLE `language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `language_id` int(10) unsigned DEFAULT NULL,
  `type_id` int(10) unsigned DEFAULT NULL,
  `time` decimal(8,2) NOT NULL,
  `date` date DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `log_user_id_foreign` (`user_id`),
  KEY `log_language_id_foreign` (`language_id`),
  KEY `log_type_id_foreign` (`type_id`),
  CONSTRAINT `log_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`),
  CONSTRAINT `log_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`),
  CONSTRAINT `log_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
INSERT INTO `log` VALUES (1,'Watched some fun youtube playthroughs',3,38,1,60.00,'2020-06-07',0),(2,'I watched a tv show',9,5,1,60.00,'2012-10-03',1),(3,'I created a youtube video',9,2,3,10.00,'2020-12-13',1),(4,'I jumped on a youtube video',9,2,3,10.00,'2020-12-13',1),(5,'I jumped on a youtube video',9,2,3,10.00,'2020-12-13',1),(6,'I jumped on a youtube video',9,2,3,10.00,'2020-12-13',1),(7,'I solved on a youtube video',9,2,3,10.00,'2020-12-13',1),(8,'Talk to the hand',9,2,3,10.00,'2020-12-13',1),(9,'Talk to the hand',9,2,3,14.00,'2020-12-13',1),(11,'test',9,43,3,30.00,'1990-02-12',1),(12,'I did a thin',9,2,3,8.00,'2020-06-09',1),(13,'Went to see the new Avengers movie.',9,44,1,200.00,'2020-06-06',1),(14,'I had an italki lesson',9,95,2,30.00,'2020-06-10',0),(15,'I listened to Alex cook in Spanish.',9,147,1,20.00,'2020-06-10',1),(16,'I wrote to mbc egypt',9,37,3,50.00,'2020-06-10',1),(17,'test',9,1,1,10.00,'2020-06-09',1),(18,'test2',9,11,3,20.00,'2020-06-08',1),(19,'asdf',9,7,4,20.00,'2020-06-08',1),(20,'Totally dude',9,1,1,20.00,'2020-06-06',1),(21,'Totally dude',9,1,1,20.00,'2020-06-06',1),(22,'Totally dude',9,1,1,20.00,'2020-06-06',1),(23,'Tlol',9,1,1,20.00,'2020-06-05',1),(24,'Testing some stuff',9,12,1,100.00,'2020-06-08',1),(25,'Lul',9,1,1,100.00,'2020-06-08',1),(26,'Spent some time planning PC',9,168,5,50.00,'2020-06-09',1),(27,'Testing if this will work',9,95,4,30.00,'2020-06-13',0),(28,'Read',9,95,1,30.00,'2020-06-12',0),(29,'Read',9,95,1,30.00,'2020-06-12',0),(30,'Did a thing',9,168,1,30.00,'2020-06-13',1),(31,'Test',9,95,1,60.00,'2020-06-07',0),(32,'Lul',9,95,1,20.00,'2020-06-08',0),(33,'Jumbo Shrimp',9,95,1,40.00,'2020-06-09',0),(34,'I watched ',9,168,1,30.00,'2020-06-09',0),(35,'talked to my nephew',9,168,2,40.00,'2020-06-12',0),(36,'Test',9,95,7,20.00,'2020-06-07',0),(37,'test',9,95,1,30.00,'2020-06-06',0),(38,'test',9,95,1,50.00,'2020-06-14',0),(39,'test',9,95,1,50.00,'2020-01-01',0),(40,'test',9,95,1,100.00,'2019-06-14',0),(41,'test',9,95,4,30.00,'2020-05-20',0),(42,'test',9,168,7,100.00,'2020-05-17',0),(43,'test',9,38,1,30.00,'2020-06-15',1),(44,'test',9,38,1,30.00,'2020-05-20',1),(45,'test',9,38,1,20.00,'2020-06-11',1),(46,'test',9,95,1,30.00,'2020-02-12',0),(47,'test',9,95,1,300.00,'2019-10-15',0),(48,'test',9,95,3,40.00,'2020-06-16',0),(49,'Tv while at the gym.',9,95,1,30.00,'2020-06-18',0),(50,'I watched some tv',14,38,1,30.00,'2020-06-18',0);
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'Listening'),(2,'Speaking'),(3,'Writing'),(4,'Reading'),(5,'Grammar'),(6,'Vocabulary'),(7,'Pronunciation');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `google_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Johnny Bluegras','jo@apple.co','1234yujgfw5hsgrsev'),(2,'Timothy Winter','abdlhkm@cam.bridge','asdg76as7dfg68af8'),(3,'Kishek Bobbo','Iam@a.cat','asd344g8sfr9s8e'),(9,'Ahmad El-Bobou','ahmad.elbobou@gmail.com','108909432959416394660'),(14,'Rafah Boubou','rafahboubou@gmail.com','118313527957204180340');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-18 19:29:38

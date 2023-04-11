-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: servphone
-- ------------------------------------------------------
-- Server version	5.5.5-10.11.0-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_budget`
--

DROP TABLE IF EXISTS `tb_budget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_budget` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `defect` varchar(255) NOT NULL,
  `brand` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `password_product` varchar(45) DEFAULT NULL,
  `client_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tb_budget_tb_client1_idx` (`client_id`),
  KEY `fk_tb_budget_tb_employee1_idx` (`employee_id`),
  CONSTRAINT `fk_tb_budget_tb_client1` FOREIGN KEY (`client_id`) REFERENCES `tb_client` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_budget_tb_employee1` FOREIGN KEY (`employee_id`) REFERENCES `tb_employee` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8013 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_budget`
--

LOCK TABLES `tb_budget` WRITE;
/*!40000 ALTER TABLE `tb_budget` DISABLE KEYS */;
INSERT INTO `tb_budget` VALUES (1,11,'2023-03-16 00:45:42','2023-03-16 00:45:42','Tela Quebrada','Iphone','Iphone 9','Cliente informa que a tela está quebrada','',2,NULL),(8007,11,'2023-03-22 00:16:13','2023-03-30 22:21:49','Componente fone','Iphone 9','Iphone','Cliente informou que precisa trocar algo','',1,NULL),(8008,7,'2023-03-29 21:53:24','2023-03-30 22:20:20','Bateria','Samsung','Galaxy Y','Bateria Viciada','',2,NULL),(8009,11,'2023-04-05 23:19:48','2023-04-05 23:48:30','Não Liga','Samsung','J8','O Usuario jogou na agua','',3,NULL),(8011,1,'2023-04-05 23:45:31','2023-04-05 23:45:31','ww','ww','aqq','eee','ee',2,NULL),(8012,1,'2023-04-10 00:17:01','2023-04-10 00:17:01','a','a','a','a','a',2,NULL);
/*!40000 ALTER TABLE `tb_budget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_budget_has_tb_product`
--

DROP TABLE IF EXISTS `tb_budget_has_tb_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_budget_has_tb_product` (
  `tb_budget_id` int(11) NOT NULL,
  `tb_product_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `price_value` decimal(10,2) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`tb_budget_id`,`tb_product_id`),
  KEY `fk_tb_budget_has_tb_product_tb_product1_idx` (`tb_product_id`),
  KEY `fk_tb_budget_has_tb_product_tb_budget1_idx` (`tb_budget_id`),
  CONSTRAINT `fk_tb_budget_has_tb_product_tb_budget1` FOREIGN KEY (`tb_budget_id`) REFERENCES `tb_budget` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_budget_has_tb_product_tb_product1` FOREIGN KEY (`tb_product_id`) REFERENCES `tb_product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_budget_has_tb_product`
--

LOCK TABLES `tb_budget_has_tb_product` WRITE;
/*!40000 ALTER TABLE `tb_budget_has_tb_product` DISABLE KEYS */;
INSERT INTO `tb_budget_has_tb_product` VALUES (1,2,'Tela Iphone XR',150.00,1),(8007,8,'Cabo Y',40.00,2),(8008,13,'Bateria Galaxy Y',50.00,1),(8009,13,'Bateria Galaxy Y',50.00,1);
/*!40000 ALTER TABLE `tb_budget_has_tb_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_budget_has_tb_service`
--

DROP TABLE IF EXISTS `tb_budget_has_tb_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_budget_has_tb_service` (
  `tb_budget_id` int(11) NOT NULL,
  `tb_service_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `price_hours` decimal(10,2) NOT NULL,
  `amount_hours` decimal(10,2) NOT NULL,
  PRIMARY KEY (`tb_budget_id`,`tb_service_id`),
  KEY `fk_tb_budget_has_tb_service_tb_service1_idx` (`tb_service_id`),
  KEY `fk_tb_budget_has_tb_service_tb_budget1_idx` (`tb_budget_id`),
  CONSTRAINT `fk_tb_budget_has_tb_service_tb_budget1` FOREIGN KEY (`tb_budget_id`) REFERENCES `tb_budget` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_budget_has_tb_service_tb_service1` FOREIGN KEY (`tb_service_id`) REFERENCES `tb_service` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_budget_has_tb_service`
--

LOCK TABLES `tb_budget_has_tb_service` WRITE;
/*!40000 ALTER TABLE `tb_budget_has_tb_service` DISABLE KEYS */;
INSERT INTO `tb_budget_has_tb_service` VALUES (1,4,'Troca de Tela',40.00,2.00),(8007,5,'Troca de Bateria',20.00,2.00),(8008,5,'Troca de Bateria',20.00,3.00),(8009,5,'Troca de Bateria',20.00,6.00);
/*!40000 ALTER TABLE `tb_budget_has_tb_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_cash_register`
--

DROP TABLE IF EXISTS `tb_cash_register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_cash_register` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL,
  `form_payment` varchar(10) NOT NULL,
  `budget_id` int(11) NOT NULL,
  `discount` double NOT NULL,
  `value_total` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tb_service_order_tb_budget1_idx` (`budget_id`),
  CONSTRAINT `fk_tb_service_order_tb_budget1` FOREIGN KEY (`budget_id`) REFERENCES `tb_budget` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_cash_register`
--

LOCK TABLES `tb_cash_register` WRITE;
/*!40000 ALTER TABLE `tb_cash_register` DISABLE KEYS */;
INSERT INTO `tb_cash_register` VALUES (10,'2023-03-21 00:28:58',NULL,'money',1,20,210),(11,'2023-03-30 22:21:49',NULL,'credit',8007,0,120),(12,'2023-04-05 23:48:30',NULL,'debit',8009,20.5,149.5);
/*!40000 ALTER TABLE `tb_cash_register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_client`
--

DROP TABLE IF EXISTS `tb_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cpf_cnpj` varchar(14) NOT NULL,
  `name` varchar(32) NOT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `cep` varchar(8) NOT NULL,
  `address` varchar(45) NOT NULL,
  `number` varchar(6) DEFAULT NULL,
  `district` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(2) NOT NULL,
  `complement` varchar(45) DEFAULT NULL,
  `phone` varchar(13) NOT NULL,
  `email` varchar(45) NOT NULL,
  `status` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_client`
--

LOCK TABLES `tb_client` WRITE;
/*!40000 ALTER TABLE `tb_client` DISABLE KEYS */;
INSERT INTO `tb_client` VALUES (1,'11071628987','João Lucas','2022-11-07 23:50:16','89237268','Alberto Vinci','258','Vila Nova','Joinville','SC','','47988276458','joaolucas@gmail.com',1),(2,'11045678985','Danilo Silva','2022-11-07 23:53:45','89237268','Alberto Vinci','256','Vila Nova','258','SC','','47992578960','danilo.silva@gmail.com',1),(3,'12022526586','Sestito Ttes','2023-04-05 23:10:02','89268998','Ab','21','Costa e Silva','Joinville','SC','ss','47922181696','sestito@gmail.com',1);
/*!40000 ALTER TABLE `tb_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_employee`
--

DROP TABLE IF EXISTS `tb_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL,
  `phone` varchar(13) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_employee`
--

LOCK TABLES `tb_employee` WRITE;
/*!40000 ALTER TABLE `tb_employee` DISABLE KEYS */;
INSERT INTO `tb_employee` VALUES (1,'Dario Develop Admin','2022-10-31 23:03:27',NULL,'47992181693',1,'dario.kruger','58e3f1bcef86ccbd1e77641bd7310506',0,0.00),(2,'Joao Teste','2022-11-23 22:56:11',NULL,'47992181695',1,'joaoteste','58e3f1bcef86ccbd1e77641bd7310506',1,2000.00),(3,'Dario Kruger Junior','2023-03-30 22:04:37',NULL,'47992181693',1,'dario.kruger@gmail.com','58e3f1bcef86ccbd1e77641bd7310506',0,0.00),(4,'Jhonathan Teste','2023-04-05 23:29:53',NULL,'47992181683',1,'jhonathan@gmail.com','cd0e11b842f07a8b21b8675d76616d50',1,1200.00);
/*!40000 ALTER TABLE `tb_employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_inventory`
--

DROP TABLE IF EXISTS `tb_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_inventory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `status` int(11) NOT NULL,
  `tb_budget_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tb_invetory_tb_budget1_idx` (`tb_budget_id`),
  CONSTRAINT `fk_tb_invetory_tb_budget1` FOREIGN KEY (`tb_budget_id`) REFERENCES `tb_budget` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_inventory`
--

LOCK TABLES `tb_inventory` WRITE;
/*!40000 ALTER TABLE `tb_inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_product`
--

DROP TABLE IF EXISTS `tb_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `value_sale` decimal(10,2) NOT NULL,
  `status` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_product`
--

LOCK TABLES `tb_product` WRITE;
/*!40000 ALTER TABLE `tb_product` DISABLE KEYS */;
INSERT INTO `tb_product` VALUES (1,'2022-10-31 23:05:16',NULL,'Tela Iphone 8',197.00,0),(2,'2022-10-31 23:05:16',NULL,'Tela Iphone XR',150.00,1),(3,'2022-10-31 23:05:16',NULL,'Bateria Iphone',60.00,1),(8,'2022-11-03 23:50:38',NULL,'Cabo Y',40.00,1),(9,'2022-11-03 23:52:05',NULL,'Cabo X',60.00,1),(10,'2022-11-17 23:15:57',NULL,'Carregador',20.00,1),(11,'2022-11-17 23:16:14',NULL,'Cabo C',20.20,1),(12,'2022-12-14 22:22:12',NULL,'Botão Liga Iphone 8',20.00,1),(13,'2023-03-30 22:17:53',NULL,'Bateria Galaxy Y',50.00,1);
/*!40000 ALTER TABLE `tb_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_service`
--

DROP TABLE IF EXISTS `tb_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_service` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `price_hours` decimal(10,2) NOT NULL,
  `status` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_service`
--

LOCK TABLES `tb_service` WRITE;
/*!40000 ALTER TABLE `tb_service` DISABLE KEYS */;
INSERT INTO `tb_service` VALUES (4,'2022-12-14 22:19:02',NULL,'Troca de Tela',40.00,1),(5,'2022-12-14 22:21:37',NULL,'Troca de Bateria',20.00,1);
/*!40000 ALTER TABLE `tb_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'servphone'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-10 21:14:09

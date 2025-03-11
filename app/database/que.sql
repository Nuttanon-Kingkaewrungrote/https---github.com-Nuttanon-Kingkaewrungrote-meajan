-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 17, 2021 at 06:46 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `que`
--

-- --------------------------------------------------------

--
-- Table structure for table `mdate`
--

CREATE TABLE `mdate` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `week` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mdate`
--

INSERT INTO `mdate` (`id`, `date`, `week`) VALUES
(1, '2021-10-18', 42),
(2, '2021-10-19', 42),
(3, '2021-10-20', 43),
(9, '2021-10-21', 42),
(10, '2021-10-26', 43),
(11, '2021-10-27', 43),
(12, '2021-10-28', 43),
(13, '2021-10-29', 43);

-- --------------------------------------------------------

--
-- Table structure for table `mtime`
--

CREATE TABLE `mtime` (
  `id` int(11) NOT NULL,
  `time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mtime`
--

INSERT INTO `mtime` (`id`, `time`) VALUES
(1, '08:00:00'),
(2, '08:30:00'),
(3, '09:00:00'),
(5, '09:30:00'),
(6, '10:00:00'),
(4, '10:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `mtype`
--

CREATE TABLE `mtype` (
  `id` int(11) NOT NULL,
  `type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mtype`
--

INSERT INTO `mtype` (`id`, `type`) VALUES
(1, 'ใบอนุญาตขับรถชนิดชั่วคราว'),
(2, 'ใบอนุญาตขับรถยนต์ส่วนบุคคล'),
(3, 'ใบอนุญาตขับรถยนต์สามล้อส่วนบุคคล'),
(4, 'ใบอนุญาตขับรถยนต์สาธารณะ'),
(5, 'ใบอนุญาตขับรถยนต์สามล้อสาธารณะ'),
(6, 'ใบอนุญาตขับรถจักรยานยนต์ส่วนบุคคล'),
(7, 'ใบอนุญาตขับรถจักรยานยนต์สาธารณะ'),
(8, 'ใบอนุญาตขับรถบดถนน'),
(9, 'ใบอนุญาตขับรถแทรกเตอร์'),
(10, 'ใบอนุญาตขับรถชนิดอื่น'),
(11, 'ใบอนุญาตขับรถตามความตกลงระหว่างประเทศที่ประเทศไทยเป็นภาคี หรือ ใบขับขี่สากล');

-- --------------------------------------------------------

--
-- Table structure for table `muser`
--

CREATE TABLE `muser` (
  `id` int(11) NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `tel` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `muser`
--

INSERT INTO `muser` (`id`, `username`, `password`, `name`, `tel`) VALUES
(1, 'admin', '$2y$10$hXbA4qmyNs4PH9ivreWgL.NEUgZwQ6XY.IsidZHubMQiKbUUUjjHu', 'Administrator', '0123456789'),
(2, 'milk', '$2y$10$REN4kSUy.ekNSTlV8xMKJePhgmSq3s..4/8231Oqo7Ih/iVhgRa4u', 'milk', '0999887412');

-- --------------------------------------------------------

--
-- Table structure for table `setdata`
--

CREATE TABLE `setdata` (
  `id` int(11) NOT NULL,
  `qty` varchar(5) DEFAULT NULL,
  `card_id` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `setdata`
--

INSERT INTO `setdata` (`id`, `qty`, `card_id`) VALUES
(1, 'true', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `setdate`
--

CREATE TABLE `setdate` (
  `id` int(11) NOT NULL,
  `date` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `now` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `setdate`
--

INSERT INTO `setdate` (`id`, `date`, `time`, `qty`, `now`) VALUES
(12, 1, 1, 10, 1),
(13, 1, 2, 10, 2),
(14, 1, 3, 10, 0);

-- --------------------------------------------------------

--
-- Table structure for table `settext`
--

CREATE TABLE `settext` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `head_text` varchar(150) DEFAULT NULL,
  `sub_text1` varchar(100) DEFAULT NULL,
  `sub_text2` varchar(100) DEFAULT NULL,
  `dd1` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `settext`
--

INSERT INTO `settext` (`id`, `title`, `head_text`, `sub_text1`, `sub_text2`, `dd1`, `image`) VALUES
(1, 'จองคิว ทำ-ต่อใบขับขี่', 'สามารถติดตามข้อมูลการจองได้ที่ Line ID : @abc1234', 'อัพเดตเมื่อ', '15/10/2021', 'ประเภท', 'upgrade.png');

-- --------------------------------------------------------

--
-- Table structure for table `tque`
--

CREATE TABLE `tque` (
  `id` int(11) NOT NULL,
  `date` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `tel` varchar(10) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `card_id` varchar(20) DEFAULT NULL,
  `regis_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tque`
--

INSERT INTO `tque` (`id`, `date`, `time`, `type`, `name`, `tel`, `qty`, `card_id`, `regis_date`) VALUES
(28, 1, 1, 2, 'milk milk', '0123456789', 1, '1234555554444', '2021-10-17 11:44:49'),
(29, 1, 2, 2, '5J1C9pNw3g', '124039', 2, 'lJERdV0VGB', '2021-10-17 11:45:48');

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_que`
-- (See below for the actual view)
--
CREATE TABLE `view_que` (
`id` int(11)
,`date` int(11)
,`time` int(11)
,`type` int(11)
,`name` varchar(255)
,`tel` varchar(10)
,`qty` int(11)
,`card_id` varchar(20)
,`date_name` date
,`week` int(11)
,`time_name` time
,`receive_qry` int(11)
,`now_qty` int(11)
,`type_name` varchar(100)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_setdate`
-- (See below for the actual view)
--
CREATE TABLE `view_setdate` (
`id` int(11)
,`date` int(11)
,`time` int(11)
,`qty` int(11)
,`now` int(11)
,`date_name` date
,`week` int(11)
,`time_name` time
,`remain` bigint(12)
);

-- --------------------------------------------------------

--
-- Structure for view `view_que`
--
DROP TABLE IF EXISTS `view_que`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_que`  AS SELECT `a`.`id` AS `id`, `a`.`date` AS `date`, `a`.`time` AS `time`, `a`.`type` AS `type`, `a`.`name` AS `name`, `a`.`tel` AS `tel`, `a`.`qty` AS `qty`, `a`.`card_id` AS `card_id`, `b`.`date` AS `date_name`, `b`.`week` AS `week`, `c`.`time` AS `time_name`, `e`.`qty` AS `receive_qry`, `e`.`now` AS `now_qty`, `f`.`type` AS `type_name` FROM ((((`tque` `a` left join `mdate` `b` on(`b`.`id` = `a`.`date`)) left join `mtime` `c` on(`c`.`id` = `a`.`time`)) left join `setdate` `e` on(`e`.`date` = `a`.`date` and `e`.`time` = `a`.`time`)) left join `mtype` `f` on(`f`.`id` = `a`.`type`)) ;

-- --------------------------------------------------------

--
-- Structure for view `view_setdate`
--
DROP TABLE IF EXISTS `view_setdate`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_setdate`  AS SELECT `a`.`id` AS `id`, `a`.`date` AS `date`, `a`.`time` AS `time`, `a`.`qty` AS `qty`, `a`.`now` AS `now`, `b`.`date` AS `date_name`, `b`.`week` AS `week`, `c`.`time` AS `time_name`, `a`.`qty`- ifnull(`a`.`now`,0) AS `remain` FROM ((`setdate` `a` left join `mdate` `b` on(`b`.`id` = `a`.`date`)) left join `mtime` `c` on(`c`.`id` = `a`.`time`)) ORDER BY `b`.`date` DESC, `c`.`time` DESC ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mdate`
--
ALTER TABLE `mdate`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `date` (`date`);

--
-- Indexes for table `mtime`
--
ALTER TABLE `mtime`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `time` (`time`);

--
-- Indexes for table `mtype`
--
ALTER TABLE `mtype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `muser`
--
ALTER TABLE `muser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `setdata`
--
ALTER TABLE `setdata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `setdate`
--
ALTER TABLE `setdate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_setdate_mdate` (`date`),
  ADD KEY `FK_setdate_mtime` (`time`);

--
-- Indexes for table `settext`
--
ALTER TABLE `settext`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tque`
--
ALTER TABLE `tque`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_tque_mdate` (`date`),
  ADD KEY `FK_tque_mtime` (`time`),
  ADD KEY `FK_tque_mtype` (`type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mdate`
--
ALTER TABLE `mdate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `mtime`
--
ALTER TABLE `mtime`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `mtype`
--
ALTER TABLE `mtype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `muser`
--
ALTER TABLE `muser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `setdata`
--
ALTER TABLE `setdata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `setdate`
--
ALTER TABLE `setdate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `settext`
--
ALTER TABLE `settext`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tque`
--
ALTER TABLE `tque`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `setdate`
--
ALTER TABLE `setdate`
  ADD CONSTRAINT `FK_setdate_mdate` FOREIGN KEY (`date`) REFERENCES `mdate` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_setdate_mtime` FOREIGN KEY (`time`) REFERENCES `mtime` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tque`
--
ALTER TABLE `tque`
  ADD CONSTRAINT `FK_tque_mdate` FOREIGN KEY (`date`) REFERENCES `mdate` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_tque_mtime` FOREIGN KEY (`time`) REFERENCES `mtime` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_tque_mtype` FOREIGN KEY (`type`) REFERENCES `mtype` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

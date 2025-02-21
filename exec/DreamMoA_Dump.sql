-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 3.38.214.23    Database: dream_moa
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_badge`
--

DROP TABLE IF EXISTS `tb_badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_badge` (
  `badge_id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(500) NOT NULL,
  `iconUrl` varchar(500) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`badge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_badge`
--

LOCK TABLES `tb_badge` WRITE;
/*!40000 ALTER TABLE `tb_badge` DISABLE KEYS */;
INSERT INTO `tb_badge` VALUES (1,'새로운 챌린지 제목 첼린지를 성공함','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1739850071140_60a089a7-12f0-4cec-9d6c-20adb3ed1c3d.jpg','새로운 챌린지 제목'),(2,'새로운 챌린지 제목 첼린지를 성공함','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1739850071140_60a089a7-12f0-4cec-9d6c-20adb3ed1c3d.jpg','새로운 챌린지 제목'),(3,'새로운 챌린지 제목 첼린지를 성공함','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1739850071140_60a089a7-12f0-4cec-9d6c-20adb3ed1c3d.jpg','새로운 챌린지 제목'),(4,'새로운 챌린지 제목 첼린지를 성공함','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1739850071140_60a089a7-12f0-4cec-9d6c-20adb3ed1c3d.jpg','새로운 챌린지 제목'),(5,'아침 공부방 첼린지를 성공함','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740052112761_fd9ac764-7ff2-48d4-9e0b-4ef3d39b8270.png','아침 공부방'),(6,'편입 영어 독해반 첼린지를 성공함','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740052669498_6a385cb3-530d-4267-9ca4-ec573d5138be.png','편입 영어 독해반');
/*!40000 ALTER TABLE `tb_badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_board`
--

DROP TABLE IF EXISTS `tb_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_board` (
  `commentCount` int DEFAULT '0',
  `likeCount` int DEFAULT '0',
  `createdAt` datetime(6) DEFAULT NULL,
  `post_id` int unsigned NOT NULL AUTO_INCREMENT,
  `updatedAt` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `viewCount` bigint NOT NULL DEFAULT '0',
  `content` text,
  `title` varchar(255) NOT NULL,
  `category` enum('자유','질문') NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `FK44svnwh9bv561y2hwm2a9qfns` (`user_id`),
  CONSTRAINT `FK44svnwh9bv561y2hwm2a9qfns` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_board`
--

LOCK TABLES `tb_board` WRITE;
/*!40000 ALTER TABLE `tb_board` DISABLE KEYS */;
INSERT INTO `tb_board` VALUES (0,0,'2025-02-17 08:29:55.231285',1,'2025-02-17 08:29:55.480050',1,1,'<p>무작정 공부하는 것은 <strong>길을 정하지 않고 여행을 떠나는 것과 같습니다.</strong></p>\n<p>SMART 원칙(구체적이고, 측정 가능하며, 달성 가능하고, 관련성 있으며, 기한이 있는 목표)을 설정하면 학습 방향이 명확해집니다. 예를 들어,</p>\n<p>❌ \"영어 공부 열심히 해야지!\" → <strong>X</strong></p>\n<p>✅ \"이번 달까지 토익 단어 500개 외우고 모의고사에서 750점 이상 받기\" → <strong>O</strong></p>','안녕하세요~~  공부 팀 공유합니다~','자유'),(0,1,'2025-02-17 08:31:05.787734',2,'2025-02-17 08:31:05.811115',2,1,'<p><strong>복습은 학습의 완성</strong>입니다. 인간의 뇌는 학습한 내용을 시간이 지나면 자연스럽게 잊어버리므로,</p>\n<ul>\n <li><strong>1일 후, 1주 후, 1달 후</strong> 복습하는 주기적인 반복 학습이 중요합니다.</li>\n <li>특히, <strong>아침에 공부한 내용을 자기 전에 한 번 더 복습하면 기억에 오래 남습니다.</strong></li>\n</ul>\n<p><br></p>','에빙하우스 망각 곡선을 기억하자!','자유'),(0,0,'2025-02-17 08:31:59.364609',3,'2025-02-17 08:31:59.376882',3,2,'<h3><strong>1. 삶기 (Boiling)</strong></h3>\n<p>뜨거운 물에서 재료를 익히는 조리법입니다.</p>\n<ul>\n <li><strong>활용 예:</strong> 라면, 파스타, 달걀, 감자 삶기</li>\n <li><strong>Tip:</strong> 면 요리를 할 때 소금을 약간 넣으면 면에 간이 배고 더 쫄깃해집니다.</li>\n</ul>\n<h3><strong>2. 굽기 (Grilling &amp; Pan-frying)</strong></h3>\n<p>불에 직접 굽거나 팬에서 익히는 방법입니다.</p>\n<ul>\n <li><strong>활용 예:</strong> 삼겹살, 스테이크, 생선구이, 팬케이크</li>\n <li><strong>Tip:</strong> 고기를 구울 때 센 불로 표면을 먼저 익히면 육즙이 빠지지 않아 더욱 촉촉해집니다.</li>\n</ul>\n<h3><strong>3. 볶기 (Stir-frying)</strong></h3>\n<p>기름을 두른 팬에서 짧은 시간 동안 빠르게 익히는 방법입니다.</p>\n<ul>\n <li><strong>활용 예:</strong> 볶음밥, 야채볶음, 잡채</li>\n <li><strong>Tip:</strong> <strong>센 불에서 빠르게 조리</strong>해야 재료의 식감과 맛이 살아납니다.</li>\n</ul>\n<p><br></p>','기본적인 요리 방법 7가지','자유'),(0,0,'2025-02-17 08:33:16.031371',4,'2025-02-17 08:33:16.036371',4,2,'<p>✔ <strong>계란말이:</strong> 계란을 풀고 소금, 설탕 약간 넣은 후 프라이팬에서 돌돌 말아 굽기</p>\n<p>✔ <strong>김치볶음밥:</strong> 잘게 썬 김치, 밥, 고추장을 넣고 볶기</p>\n<p>✔ <strong>된장찌개:</strong> 된장, 두부, 채소를 넣고 끓이기</p>\n<p>요리는 연습할수록 실력이 늘어납니다. <strong>맛있게 요리하는 자신만의 노하우를 찾아보세요!</strong> ?✨</p>','초보자를 위한 추천 요리 3가지','자유'),(0,0,'2025-02-17 08:33:34.638829',5,'2025-02-17 08:33:34.644829',4,1,'<p>✅ <strong>1~4명으로 팀 구성</strong> (방 크기와 정리 범위에 따라 조정)</p>\n<p>✅ <strong>역할 분담</strong> – 각자의 역할을 정하면 더 빠르고 효과적으로 정리할 수 있음</p>\n<p>? <strong>추천 역할 분담 예시</strong></p>\n<ul>\n <li>? <strong>정리 담당:</strong> 불필요한 물건을 분류하고 버릴 것 정하기</li>\n <li>? <strong>청소 담당:</strong> 바닥, 가구, 창문 등 청소</li>\n <li>? <strong>수납 담당:</strong> 옷, 책, 소품을 깔끔하게 정리</li>\n <li>? <strong>인테리어 담당:</strong> 배치 변경, 꾸미기</li>\n</ul>\n<p><br></p>','팀 구성 방법','자유'),(0,0,'2025-02-17 08:35:01.852931',6,'2025-02-17 08:35:01.863242',1,1,'<p>✨ <strong>타이머 설정:</strong> 30~45분 동안 집중해서 정리</p>\n<p>✨ <strong>음악 틀기:</strong> 신나는 음악을 들으며 정리하면 지루하지 않음</p>\n<p>✨ <strong>Before &amp; After 사진 찍기:</strong> 변화된 모습을 보면 동기부여 UP!</p>\n<p>✨ <strong>작은 보상 정하기:</strong> 정리 후 맛있는 간식 먹기</p>','2️⃣ 방 정리 순서','자유'),(0,0,'2025-02-17 08:37:13.979156',7,'2025-02-17 08:37:13.988135',2,1,'<h3><strong>? 1. 깨끗한 공간 유지하기</strong></h3>\n<p>✅ <strong>공용 공간 사용 후 정리 정돈 필수!</strong></p>\n<p>✅ <strong>불필요한 물건은 미리 정리하고 버려주세요.</strong></p>\n<p>✅ <strong>개인 물품은 지정된 장소에 보관해 주세요.</strong></p>','관리자 공지사항','자유'),(2,0,'2025-02-17 08:37:56.317450',8,'2025-02-17 08:37:56.326449',2,1,'<p>여러분, 새로운 목표를 향해 도전할 준비가 되었나요?</p>\n<p>함께 하면 더 즐겁고, 더 강해질 수 있습니다! **\"첼린지 팀원 모집\"**을 진행하니, 관심 있는 분들은 지금 바로 참여하세요! ??</p>','함께 도전할 팀원을 모집합니다! ','자유'),(0,0,'2025-02-17 08:38:49.585529',9,'2025-02-17 08:38:49.592541',2,2,'<p>✔ <strong>목표를 세웠지만 꾸준히 실천하기 어려운 분</strong></p>\n<p>✔ <strong>함께 도전하며 동기부여를 얻고 싶은 분</strong></p>\n<p>✔ <strong>책임감을 갖고 목표를 완수하고 싶은 분</strong></p>\n<p>혼자라면 포기할 수도 있지만, <strong>함께라면 끝까지 해낼 수 있습니다!</strong> ?</p>\n<p>도전할 준비가 된 분들은 <strong>지금 바로 신청하세요!</strong> ??</p>\n<p>? <strong>신청 마감:</strong> [ex. 2월 18일까지]</p>\n<p>? <strong>문의:</strong> [연락처 or 커뮤니티 채널]</p>\n<p>? <strong>\"여러분의 도전 목표는 무엇인가요?\"</strong> 댓글로 공유해주세요! ??</p>','이런 분들에게 추천합니다!','자유'),(1,0,'2025-02-17 08:40:57.361017',10,'2025-02-17 08:40:57.370035',2,1,'<p>안녕하세요 수학 문제 관련해서 알려주실 분 구합니다.</p>','첼린지 정보 구합니다.','자유'),(0,0,'2025-02-20 11:37:55.319893',12,'2025-02-20 11:37:55.324148',1,3,'<p>안녕하세요, Spring Boot를 사용하면서 애너테이션(@Annotation)에 대해 궁금한 점이 있어서 질문드립니다.</p>\n<p>Spring Boot에서는 다양한 애너테이션이 사용되는데, 각각의 역할과 차이점을 명확하게 이해하는 것이 중요하다고 생각합니다. 그런데 몇 가지 애너테이션의 동작 방식이 헷갈리는 부분이 있어서, 자세한 설명을 부탁드립니다.</p>','Spring Boot 애너테이션에 대해 질문드립니다.','자유'),(0,0,'2025-02-20 23:37:47.420866',13,'2025-02-20 23:37:47.505623',10,0,'<p>이 사이트에 처음 가입하려고 하는데, 회원가입 절차와 필요한 정보를 알려주세요.</p>','사이트 회원가입은 어떻게 하나요?','질문'),(0,0,'2025-02-20 23:38:06.886285',14,'2025-02-20 23:38:06.891603',10,0,'<p>챌린지에 참여하고 싶은데, 참여 방법과 준비물이 궁금합니다. 초보자도 참여할 수 있나요?</p>','챌린지 참여는 어떻게 하나요?','질문'),(0,0,'2025-02-20 23:38:32.703591',15,'2025-02-20 23:38:32.707000',10,0,'<p>챌린지 참여 시 WebRTC 연결이 계속 끊깁니다. 해결 방법을 아시는 분 계신가요?</p>','WebRTC 연결이 잘 안돼요','질문'),(0,0,'2025-02-20 23:38:59.312877',16,'2025-02-20 23:38:59.318442',10,1,'<p>회원가입 시 설정한 닉네임을 바꾸고 싶습니다. 변경 방법을 알고 싶습니다.</p>','닉네임 변경은 가능한가요?','질문');
/*!40000 ALTER TABLE `tb_board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_board_tag`
--

DROP TABLE IF EXISTS `tb_board_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_board_tag` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` int unsigned DEFAULT NULL,
  `tag_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKeh0chtcn8yfehgw9fh1yaf1hp` (`post_id`),
  KEY `FKb8ci3l3q57ufx4br9q7lcn16l` (`tag_id`),
  CONSTRAINT `FKb8ci3l3q57ufx4br9q7lcn16l` FOREIGN KEY (`tag_id`) REFERENCES `tb_tag` (`tag_id`),
  CONSTRAINT `FKeh0chtcn8yfehgw9fh1yaf1hp` FOREIGN KEY (`post_id`) REFERENCES `tb_board` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_board_tag`
--

LOCK TABLES `tb_board_tag` WRITE;
/*!40000 ALTER TABLE `tb_board_tag` DISABLE KEYS */;
INSERT INTO `tb_board_tag` VALUES (1,1,8),(2,1,9),(3,2,10),(4,2,11),(5,3,12),(6,6,13),(7,7,14),(8,8,15),(9,9,16),(10,10,17),(11,10,10),(14,12,34),(15,13,48),(16,14,49),(17,14,50),(18,15,51),(19,16,52),(20,16,53);
/*!40000 ALTER TABLE `tb_board_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_challenge`
--

DROP TABLE IF EXISTS `tb_challenge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_challenge` (
  `is_active` bit(1) DEFAULT NULL,
  `is_host` bit(1) DEFAULT NULL,
  `max_Participants` int DEFAULT NULL,
  `standard` int DEFAULT NULL,
  `challenge_id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `expire_date` datetime(6) DEFAULT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `description` text,
  `session_id` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`challenge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_challenge`
--

LOCK TABLES `tb_challenge` WRITE;
/*!40000 ALTER TABLE `tb_challenge` DISABLE KEYS */;
INSERT INTO `tb_challenge` VALUES (_binary '',_binary '',6,12,2,'2025-02-17 08:09:22.854693','2025-02-27 15:00:00.000000','2025-02-16 15:00:00.000000','2025-02-21 00:11:56.967216','함께 토익 공부 하실분 모습합니다.','ses_M7DS8XFgYb','TOEIC 990점'),(_binary '\0',_binary '\0',12,21,14,'2025-02-19 17:48:09.309728','2025-03-31 00:00:00.000000','2025-03-01 00:00:00.000000',NULL,'3월 한 달 동안만 미라클모닝 하실 분 구합니다. 주말 빼고 평일만 !! come ONON',NULL,'3월 동안 미라클모닝(6시 기상) !'),(_binary '',_binary '\0',10,1,15,'2025-02-20 01:31:20.146740','2025-03-10 23:59:59.000000','2025-02-10 00:00:00.000000','2025-02-20 17:34:16.986723','이 챌린지는 건강한 습관을 기르는 것을 목표로 합니다.','ses_BO3V8qWkKZ','새로운 챌린지 제목'),(_binary '',_binary '',6,80,16,'2025-02-20 01:32:15.887007','2025-05-30 00:00:00.000000','2025-02-20 00:00:00.000000','2025-02-20 17:58:58.708390','9급 공무원 시험 D-100을 맞이하여 마지막 총력전! 매일 8시간 이상 학습 인증하고, 주 2회 모의고사 풀이를 함께해요. 서로의 학습 현황을 공유하며 동기부여하는 시간을 가져봐요.','ses_H5wbSxRQB3','9급 공무원 FINAL 스터디'),(_binary '',_binary '',6,10,17,'2025-02-20 05:52:44.590929','2025-03-05 00:00:00.000000','2025-02-20 00:00:00.000000','2025-02-20 18:01:56.285806','정보처리기사 실기 대비 스터디입니다. 매일 2시간 이상 실습 문제 풀이, 주 3회 이상 기출문제 풀이 인증해주세요. 합격까지 함께 달려봐요!','ses_LMV1NEVVnr','정보처리기사 합격반'),(_binary '\0',_binary '\0',4,15,18,'2025-02-20 11:42:07.521911','2025-02-28 23:59:59.000000','2025-02-06 00:00:00.000000','2025-02-20 17:00:25.166311','Java 프로그래밍 실력 향상 스터디! 매일 2시간 이상 코딩하고 주 3회 라이브 코딩으로 실전 감각을 키워요. 설계부터 구현까지 완벽하게!',NULL,'SSAFY Java 정복하기'),(_binary '',_binary '\0',8,12,19,'2025-02-20 11:42:40.405976','2025-02-28 23:59:59.000000','2025-02-06 00:00:00.000000','2025-02-20 18:00:16.667541','코딩테스트 대비 알고리즘 스터디! 하루 2문제 이상 풀이 필수, 주 1회 난이도 있는 문제 라이브 코딩으로 실력을 키워요.','ses_NJZorX3U1o','알고리즘 마스터'),(_binary '\0',_binary '\0',6,7,20,'2025-02-20 11:42:56.035789','2025-02-28 23:59:59.000000','2025-02-06 00:00:00.000000',NULL,'매일 아침 6시 기상! 아침 시간을 활용한 효율적인 학습. 기상 인증샷과 함께 아침 루틴을 공유하며 서로 동기부여해요.',NULL,'아침형 인간 되기 프로젝트'),(_binary '\0',_binary '\0',10,15,21,'2025-02-20 11:43:07.648468','2025-02-28 23:59:59.000000','2025-02-06 00:00:00.000000','2025-02-20 16:23:29.308844','블록체인 특화 트랙 프로젝트 팀원 모집합니다! NFT 마켓플레이스 플랫폼 개발 예정. 스마트 컨트랙트 개발에 관심 있으신 분들 함께해요. React + Solidity 스택으로 진행합니다.',NULL,'SSAFY 블록체인 특화PJT 모집'),(_binary '',_binary '\0',12,18,22,'2025-02-20 11:43:28.680764','2025-02-28 23:59:59.000000','2025-02-06 00:00:00.000000','2025-02-21 00:11:57.069418','30일 동안 포트폴리오용 프로젝트 완성하기! 매일 2시간 이상 코딩, 주간 진도 공유로 끝까지 완주해요.','ses_QaCJ7oZshV','사이드 프로젝트'),(_binary '',_binary '\0',5,10,23,'2025-02-20 11:43:43.936234','2025-02-28 23:59:59.000000','2025-02-06 00:00:00.000000','2025-02-21 00:18:35.342689','퇴근 후 1시간 투자로 토익 800점 달성! 평일 패턴 문제 30개, 주말 모의고사 1회 필수 참여.','ses_Lip4WbRyNC','직장인 어학 스터디'),(_binary '\0',_binary '\0',7,14,24,'2025-02-20 11:44:00.426028','2025-02-28 23:59:59.000000','2025-02-06 00:00:00.000000','2025-02-20 13:15:09.290205','기술면접 대비 CS 지식 쌓기! 하루 한 주제씩 깊이 있게 학습하고 발표자료 만들어 공유해요.',NULL,'CS 스터디'),(_binary '\0',_binary '\0',9,16,25,'2025-02-20 11:44:15.089203','2025-02-28 23:59:59.000000','2025-02-06 00:00:00.000000',NULL,'매주 한 권의 책을 완독하고 독후감 공유, 주말 온라인 토론으로 다양한 시각을 나눠보아요.',NULL,'독서 토론 모임'),(_binary '\0',_binary '\0',11,5,26,'2025-02-20 11:44:47.583063','2025-03-02 00:00:00.000000','2025-02-22 00:00:00.000000',NULL,'퇴근 후 2시간, 자격증 공부에 투자하세요! 매일 학습 상황을 공유하고, 주말엔 모의고사로 실전감각을 키워봐요.',NULL,'직장인 자격증 스터디'),(_binary '\0',_binary '\0',7,14,27,'2025-02-20 11:45:03.333570','2025-03-25 00:00:00.000000','2025-02-24 00:00:00.000000',NULL,'정보처리기사 실기 대비 스터디입니다. 매일 2시간 이상 실습 문제 풀이, 주 3회 이상 기출문제 풀이 인증해주세요. 합격까지 함께 달려봐요!',NULL,'정보처리기사 합격반'),(_binary '\0',_binary '\0',9,7,28,'2025-02-20 11:45:11.523807','2025-03-15 00:00:00.000000','2025-02-23 00:00:00.000000',NULL,'식품기사 실기 시험 준비 모임입니다. 매일 기출문제 풀이와 이론 정리, 주 2회 실습 문제 풀이로 실전 감각을 키워요!',NULL,'식품기사 실기 준비반'),(_binary '\0',_binary '\0',11,6,29,'2025-02-20 11:45:24.710093','2025-03-20 00:00:00.000000','2025-02-25 00:00:00.000000','2025-02-20 13:37:28.397896','매일 자기소개서 한 문항씩 작성하고 피드백 주고받기. 주 1회 온라인 모의면접으로 실전 감각도 키워봐요.',NULL,'취준생 자소서 완성반'),(_binary '\0',_binary '\0',6,11,30,'2025-02-20 11:46:01.334594','2025-03-21 00:00:00.000000','2025-02-26 00:00:00.000000',NULL,'면접 답변 연습부터 스피치 교정까지! 매일 예상 질문 3개에 대한 답변을 녹화하여 공유하고, 피드백을 주고받아요.',NULL,'면접 스피치 완성반'),(_binary '\0',_binary '\0',12,3,31,'2025-02-20 11:46:20.214820','2025-03-05 00:00:00.000000','2025-02-24 00:00:00.000000',NULL,'SQLD 자격증 취득을 위한 스터디입니다. SQL 기본, 활용 파트별 주요 개념 정리와 기출문제 풀이를 진행합니다. 매일 모의고사 1회 풀이 필수!',NULL,'SQLD 자격증 스터디'),(_binary '\0',_binary '\0',4,5,32,'2025-02-20 11:46:31.610984','2025-03-10 00:00:00.000000','2025-02-25 00:00:00.000000',NULL,'기업별 면접 질문 분석과 답변 준비! 매일 예상 질문 5개씩 준비하고, 주 2회 모의면접 진행해요.',NULL,'면접 스터디 - 기업별 분석'),(_binary '\0',_binary '\0',12,14,33,'2025-02-20 11:46:47.089733','2025-03-18 00:00:00.000000','2025-02-23 00:00:00.000000',NULL,'토익 900점 목표! 매일 LC 1세트, RC 1세트 풀이와 복습을 진행합니다. 실전 모의고사 주 1회 필수 응시, 오답 분석 스터디도 함께해요.',NULL,'토익 900점 달성 프로젝트'),(_binary '\0',_binary '\0',10,13,34,'2025-02-20 11:47:26.340711','2025-02-27 23:59:59.000000','2025-02-11 00:00:00.000000',NULL,'한능검 1급 취득을 위한 스터디입니다. 매일 기출문제 50문제 풀이, 주 2회 모의고사 진행. 오답노트 작성과 시대별 핵심 정리로 확실한 개념 잡기!',NULL,'한국사능력검정시험 고급 준비반'),(_binary '\0',_binary '\0',6,8,35,'2025-02-20 11:47:37.004383','2025-02-27 23:59:59.000000','2025-02-11 00:00:00.000000',NULL,'컴퓨터활용능력 1급 자격증 취득! 매일 2시간 실습, 주 3회 기출문제 풀이로 실전 감각을 키워요.',NULL,'컴활 1급 달성 프로젝트'),(_binary '\0',_binary '\0',8,15,36,'2025-02-20 11:47:48.170826','2025-02-27 23:59:59.000000','2025-02-11 00:00:00.000000',NULL,'평일 저녁 2시간 투자로 월별 목표 달성! 자격증, 어학, 운동 등 각자의 목표를 위해 노력해요.',NULL,'직장인 자기계발 모임'),(_binary '\0',_binary '\0',12,17,37,'2025-02-20 11:48:20.058396','2025-02-27 23:59:59.000000','2025-02-11 00:00:00.000000','2025-02-20 13:39:54.159467','반려동물관리사 자격증 취득을 위한 스터디입니다. 매일 이론 정리와 기출문제 풀이, 주말 실습 수업으로 실전 감각을 키워요.',NULL,'반려동물관리사 자격증반'),(_binary '',_binary '\0',9,5,38,'2025-02-20 11:48:32.756866','2025-02-27 23:59:59.000000','2025-02-11 00:00:00.000000','2025-02-20 18:05:35.954670','출근 전 2시간 투자로 자격증 취득! 매일 아침 6-8시 실시간 공부 인증으로 함께 성장해요.','ses_FzfeOCvZtR','아침 공부방'),(_binary '\0',_binary '\0',4,19,39,'2025-02-20 11:48:41.842302','2025-02-27 23:59:59.000000','2025-02-11 00:00:00.000000',NULL,'토익스피킹 Level 7 목표! 매일 모의고사 1회 연습, 주 3회 온라인 스피킹 세션으로 회화 실력을 향상시켜요.',NULL,'직장인 TOEIC Speaking 스터디'),(_binary '\0',_binary '\0',6,12,40,'2025-02-20 11:48:54.352773','2025-03-06 23:59:59.000000','2025-02-18 00:00:00.000000','2025-02-21 00:35:45.520552','코딩테스트 대비 알고리즘 스터디! 하루 2문제 이상 풀이 필수, 주 1회 난이도 있는 문제 라이브 코딩으로 실력을 키워요.',NULL,'SSAFY 알고리즘 스터디'),(_binary '',_binary '\0',5,12,41,'2025-02-20 11:49:18.484579','2025-02-27 23:59:59.000000','2025-02-11 00:00:00.000000','2025-02-20 17:41:46.026698','바리스타 2급 자격증 취득을 위한 스터디입니다. 이론 학습과 실전 실습을 병행하여 진행합니다. 주 2회 실습 필수!','ses_Jrr2v8eV0X','바리스타 자격증 취득반'),(_binary '\0',_binary '\0',6,12,42,'2025-02-20 11:49:35.459774','2025-03-05 00:00:00.000000','2025-01-20 00:00:00.000000','2025-02-21 00:33:19.425850','하루 3세트 NCS 문제 풀이 챌린지! 매일 오답 분석하고 유형별 꿀팁 공유해요.',NULL,'공기업 NCS 문제풀이'),(_binary '\0',_binary '\0',6,12,43,'2025-02-20 11:49:48.492313','2025-03-05 00:00:00.000000','2025-01-20 00:00:00.000000','2025-02-20 13:41:08.912456','하루 3세트 NCS 문제 풀이 챌린지! 매일 오답 분석하고 유형별 꿀팁 공유해요.',NULL,'공기업 NCS 문제풀이'),(_binary '\0',_binary '\0',12,7,44,'2025-02-20 11:49:59.965682','2025-02-25 00:00:00.000000','2025-01-25 00:00:00.000000',NULL,'출근 전 2시간으로 자기계발! 기상 인증부터 학습 내용 공유까지, 알찬 아침을 만들어요.',NULL,'직장인 아침 루틴'),(_binary '\0',_binary '\0',8,14,45,'2025-02-20 11:50:16.760521','2025-03-20 00:00:00.000000','2025-02-05 00:00:00.000000','2025-02-21 00:56:41.133462','수능 100일 남은 독서실 자리지킴이 모임! 매일 12시간 이상 독서실 출석 인증하고, 시간대별 학습 계획 공유해요. 같이 수능 준비하면서 동기부여해요!',NULL,'수능 D-100 독서실 스터디'),(_binary '\0',_binary '\0',5,8,47,'2025-02-20 11:53:44.534228','2025-03-10 00:00:00.000000','2025-02-10 00:00:00.000000',NULL,'하루 12시간 독서실 지키기 프로젝트! 오전 8시 출석부터 저녁 10시까지, 열심히 공부하는 습관 만들어봐요. 출퇴근 인증은 필수!',NULL,'독서실 12시간 챌린지'),(_binary '\0',_binary '\0',4,15,48,'2025-02-20 11:54:00.975648','2025-02-28 00:00:00.000000','2025-01-10 00:00:00.000000',NULL,'매일 아침 스터디카페에서 전화영어 수업! 8시-9시 사이 전화영어 수업 후 학습 내용 공유와 복습까지 진행해요.',NULL,'전화영어 스터디카페'),(_binary '\0',_binary '\0',7,12,50,'2025-02-20 11:57:04.674128','2025-03-25 00:00:00.000000','2025-02-15 00:00:00.000000',NULL,'주 5회 스터디카페에서 영어회화 스터디! 미드/영화 한 편 정해서 매일 대본 암기하고 롤플레잉하며 회화 실력 키워요.',NULL,'스터디카페 영어회화 모임'),(_binary '\0',_binary '\0',6,10,51,'2025-02-20 11:57:24.741576','2025-03-15 00:00:00.000000','2025-02-20 00:00:00.000000',NULL,'학원강사를 위한 교재연구실을 운영합니다. 매일 스터디카페에서 수업 준비하고 강의안 작성, 교수법 연구도 함께해요.',NULL,'학원강사 교재연구실'),(_binary '\0',_binary '\0',9,15,52,'2025-02-20 11:57:34.686925','2025-02-25 00:00:00.000000','2025-01-05 00:00:00.000000','2025-02-20 23:51:39.139985','공시생을 위한 독서실 스터디! 매일 출석체크 후 과목별 진도 공유, 일일 테스트로 복습까지 확실하게!',NULL,'독서실 공시생 스터디'),(_binary '\0',_binary '\0',6,12,53,'2025-02-20 11:57:49.495110','2025-03-10 00:00:00.000000','2025-02-01 00:00:00.000000','2025-02-20 15:39:32.664315','편입 영어 독해 집중 스터디입니다. 매일 독서실에서 기출지문 5개 정독 및 해석 인증, 단어 테스트도 함께해요.',NULL,'편입 영어 독해반'),(_binary '\0',_binary '\0',5,13,54,'2025-02-20 11:58:00.899951','2025-03-01 00:00:00.000000','2025-01-15 00:00:00.000000',NULL,'국어 학원강사가 되기 위한 준비반입니다. 매일 스터디카페에서 문법, 문학 강의 준비와 시범 강의 연습을 진행해요.',NULL,'국어교육 강사준비반'),(_binary '\0',_binary '\0',8,11,55,'2025-02-20 11:59:22.080308','2025-03-20 00:00:00.000000','2025-02-10 00:00:00.000000',NULL,'전산세무 2급 자격증 취득을 위한 스터디입니다. 매일 스터디카페에서 이론 정리와 문제풀이, 실무 프로그램 연습까지!',NULL,'전산세무 자격반'),(_binary '\0',_binary '\0',8,6,56,'2025-02-20 12:46:49.244863','2025-02-24 00:00:00.000000','2025-02-18 00:00:00.000000','2025-02-20 15:42:27.383712','토익스피킹 Level 7 목표! 매일 모의고사 1회 연습, 주 3회 온라인 스피킹 세션',NULL,'TOEIC Speaking'),(_binary '\0',_binary '\0',8,6,57,'2025-02-20 13:14:20.315965','2025-02-24 00:00:00.000000','2025-02-18 00:00:00.000000',NULL,'토익스피킹 Level 7 목표! 매일 모의고사 1회 연습, 주 3회 온라인 스피킹 세션',NULL,'TOEIC Speaking');
/*!40000 ALTER TABLE `tb_challenge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_challenge_log`
--

DROP TABLE IF EXISTS `tb_challenge_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_challenge_log` (
  `is_success` bit(1) NOT NULL,
  `pure_study_time` int DEFAULT NULL,
  `record_at` date NOT NULL,
  `screen_time` int DEFAULT NULL,
  `challenge_id` int unsigned NOT NULL,
  `challenge_log_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`challenge_log_id`),
  KEY `FK7tfds9vm9eln6t0p54i4bpohn` (`challenge_id`),
  KEY `FK6fm35ttg31x9mpmnrudf7mp31` (`user_id`),
  CONSTRAINT `FK6fm35ttg31x9mpmnrudf7mp31` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`),
  CONSTRAINT `FK7tfds9vm9eln6t0p54i4bpohn` FOREIGN KEY (`challenge_id`) REFERENCES `tb_challenge` (`challenge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_challenge_log`
--

LOCK TABLES `tb_challenge_log` WRITE;
/*!40000 ALTER TABLE `tb_challenge_log` DISABLE KEYS */;
INSERT INTO `tb_challenge_log` VALUES (_binary '',10000,'2025-02-13',7200,12,1,2),(_binary '',10000,'2025-02-14',7200,12,2,2),(_binary '',10000,'2025-02-15',7200,12,8,3),(_binary '',10000,'2025-02-13',7200,12,9,3),(_binary '',10000,'2025-02-14',7200,12,12,4),(_binary '',10000,'2025-02-15',7200,12,13,4),(_binary '',10000,'2025-02-16',7200,12,16,4),(_binary '',10000,'2025-02-17',7200,12,17,4),(_binary '',10000,'2025-02-18',7200,12,18,4),(_binary '',10000,'2025-02-19',7200,12,19,4),(_binary '',802,'2025-02-18',802,4,21,2),(_binary '',1675,'2025-02-18',1675,12,22,2),(_binary '',3889,'2025-02-19',4105,13,23,6),(_binary '',2,'2025-02-19',63,2,25,7),(_binary '',2,'2025-02-19',63,2,26,7),(_binary '',12,'2025-02-19',58,12,27,7),(_binary '',12,'2025-02-19',58,12,28,7),(_binary '',17,'2025-02-19',72,2,31,6),(_binary '',17,'2025-02-19',72,2,32,6),(_binary '',4,'2025-02-20',53,2,38,1),(_binary '',0,'2025-02-20',37,2,39,10),(_binary '',3,'2025-02-20',77,16,40,5),(_binary '',85,'2025-02-20',1020,16,41,6),(_binary '\0',42,'2025-02-20',87,16,44,9),(_binary '',12,'2025-02-20',867,15,45,6),(_binary '',12,'2025-02-20',867,15,46,6),(_binary '',28,'2025-02-20',422,17,47,6),(_binary '',28,'2025-02-20',422,17,48,6),(_binary '',320,'2025-02-20',352,2,49,6),(_binary '',320,'2025-02-20',352,2,50,6),(_binary '',81,'2025-02-20',91,41,51,7),(_binary '',81,'2025-02-20',91,41,52,7),(_binary '',51,'2025-02-20',174,41,53,9),(_binary '\0',41,'2025-02-20',261,19,54,9),(_binary '',4,'2025-02-20',4,18,55,7),(_binary '',3800,'2025-02-11',3600,38,57,11),(_binary '',4200,'2025-02-12',4200,38,58,11),(_binary '',3300,'2025-02-13',3300,38,59,11),(_binary '\0',2000,'2025-02-14',2000,38,60,11),(_binary '',3200,'2025-02-15',3200,38,61,11),(_binary '',4000,'2025-02-17',4000,38,62,11),(_binary '',3000,'2025-02-21',3000,38,63,11),(_binary '\0',1000,'2025-02-18',1000,38,64,11),(_binary '\0',1200,'2025-02-19',1200,38,65,11),(_binary '',3200,'2025-02-20',3200,38,66,11),(_binary '',2000,'2025-02-01',2000,53,67,11),(_binary '',2400,'2025-02-02',2400,53,68,11),(_binary '',2400,'2025-02-03',2400,53,69,11),(_binary '',2600,'2025-02-05',2600,53,73,11),(_binary '',2600,'2025-02-06',2600,53,74,11),(_binary '',3000,'2025-02-07',3000,53,75,11),(_binary '',2700,'2025-02-08',2700,53,76,11),(_binary '\0',1400,'2025-02-09',1400,53,77,11),(_binary '',2500,'2025-02-10',2500,53,78,11),(_binary '',2500,'2025-02-11',2500,53,79,11),(_binary '',2300,'2025-02-12',2300,53,80,11),(_binary '',2300,'2025-02-13',2300,53,81,11),(_binary '',3000,'2025-02-14',3000,53,82,11),(_binary '',2700,'2025-02-15',2700,53,83,11),(_binary '\0',1800,'2025-02-16',1800,53,84,11),(_binary '',2200,'2025-02-17',2200,53,85,11),(_binary '',2400,'2025-02-18',2400,53,86,11),(_binary '',2300,'2025-02-19',2300,53,87,11),(_binary '',2200,'2025-02-20',2200,53,88,11),(_binary '\0',2200,'2025-02-18',2200,56,89,11),(_binary '\0',2000,'2025-02-19',2000,56,90,11),(_binary '\0',2000,'2025-02-20',2000,56,91,11),(_binary '',26,'2025-02-20',315,19,92,6),(_binary '\0',39,'2025-02-20',339,21,93,7),(_binary '',82800,'2025-02-11',82800,18,94,7),(_binary '',82800,'2025-02-10',82800,18,96,7),(_binary '',82800,'2025-02-09',82800,18,97,7),(_binary '',82800,'2025-02-08',82800,18,99,7),(_binary '',82800,'2025-02-07',82800,18,100,7),(_binary '',3002800,'2025-02-06',3002800,18,103,7),(_binary '',98,'2025-02-20',139,38,104,7),(_binary '',6,'2025-02-20',8,41,105,6),(_binary '',68,'2025-02-20',68,17,106,7),(_binary '',68,'2025-02-20',68,17,107,7),(_binary '',22,'2025-02-20',76,40,108,7),(_binary '\0',1209,'2025-02-20',1936,42,110,7),(_binary '',44,'2025-02-20',209,42,112,11),(_binary '',2,'2025-02-20',4,52,115,11),(_binary '',118,'2025-02-20',120,22,116,11),(_binary '',58,'2025-02-21',74,22,118,11),(_binary '',6,'2025-02-21',93,2,120,6),(_binary '',30,'2025-02-21',30,23,121,11),(_binary '',30,'2025-02-21',30,23,122,11),(_binary '',703,'2025-02-21',703,42,123,11),(_binary '',2,'2025-02-21',2,23,124,7),(_binary '',22,'2025-02-21',35,45,126,7);
/*!40000 ALTER TABLE `tb_challenge_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_challenge_tag`
--

DROP TABLE IF EXISTS `tb_challenge_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_challenge_tag` (
  `challenge_id` int unsigned NOT NULL,
  `challenge_tag_id` bigint NOT NULL AUTO_INCREMENT,
  `tag_id` bigint NOT NULL,
  PRIMARY KEY (`challenge_tag_id`),
  KEY `FK3oujfw0wxrpkyefejs5x69x97` (`challenge_id`),
  KEY `FK82py31pa1345gxq7ehvaj120j` (`tag_id`),
  CONSTRAINT `FK3oujfw0wxrpkyefejs5x69x97` FOREIGN KEY (`challenge_id`) REFERENCES `tb_challenge` (`challenge_id`),
  CONSTRAINT `FK82py31pa1345gxq7ehvaj120j` FOREIGN KEY (`tag_id`) REFERENCES `tb_tag` (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_challenge_tag`
--

LOCK TABLES `tb_challenge_tag` WRITE;
/*!40000 ALTER TABLE `tb_challenge_tag` DISABLE KEYS */;
INSERT INTO `tb_challenge_tag` VALUES (2,4,1),(14,26,22),(14,27,2),(14,28,23),(16,30,24),(16,31,25),(16,32,26),(15,33,8),(15,34,27),(15,35,28),(17,36,29),(17,37,30),(17,38,31),(18,39,35),(18,40,31),(18,41,2),(19,42,31),(19,43,30),(19,44,2),(20,45,22),(20,46,2),(20,47,35),(21,48,35),(21,49,31),(22,51,31),(22,53,2),(23,54,1),(23,55,36),(23,56,26),(24,57,31),(24,58,30),(25,60,37),(25,61,2),(25,62,35),(26,63,29),(26,64,36),(27,65,29),(27,66,30),(28,67,29),(28,68,30),(29,70,30),(29,71,38),(30,73,38),(30,74,30),(30,75,2),(31,76,39),(31,77,29),(31,78,30),(32,79,38),(32,80,30),(33,82,1),(33,83,29),(34,85,29),(34,86,30),(35,88,29),(35,89,30),(36,91,36),(36,92,29),(37,93,29),(38,95,36),(38,96,22),(38,97,29),(39,98,29),(39,99,40),(39,100,41),(40,102,30),(41,105,30),(42,107,42),(42,108,30),(42,109,23),(44,113,36),(44,114,22),(44,115,2),(45,116,28),(45,117,43),(45,118,27),(47,122,43),(47,123,2),(48,125,44),(48,126,1),(48,127,22),(50,131,44),(50,132,1),(50,133,27),(51,134,45),(51,135,44),(51,136,2),(52,137,43),(52,138,25),(52,139,24),(53,140,46),(53,141,43),(53,142,27),(54,143,45),(54,144,44),(54,145,30),(55,146,47),(55,147,44),(55,148,30),(56,149,29),(56,150,40),(56,151,41),(57,152,29),(57,153,40),(57,154,41),(37,155,30),(41,156,29),(41,157,23),(43,158,42),(43,159,30),(40,160,31),(40,161,2);
/*!40000 ALTER TABLE `tb_challenge_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_comment`
--

DROP TABLE IF EXISTS `tb_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_comment` (
  `comment_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `parent_comment_id` bigint DEFAULT NULL,
  `post_id` int unsigned NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKek0p1ecy069l4txrleqoiul26` (`post_id`),
  KEY `FK6lk1d0spfxribt4tdt81hlpl6` (`parent_comment_id`),
  KEY `FK45c1cuqlljd60ihc9j0962ekq` (`user_id`),
  CONSTRAINT `FK45c1cuqlljd60ihc9j0962ekq` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`),
  CONSTRAINT `FK6lk1d0spfxribt4tdt81hlpl6` FOREIGN KEY (`parent_comment_id`) REFERENCES `tb_comment` (`comment_id`),
  CONSTRAINT `FKek0p1ecy069l4txrleqoiul26` FOREIGN KEY (`post_id`) REFERENCES `tb_board` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_comment`
--

LOCK TABLES `tb_comment` WRITE;
/*!40000 ALTER TABLE `tb_comment` DISABLE KEYS */;
INSERT INTO `tb_comment` VALUES (1,'2025-02-18 12:59:26.827886',NULL,8,NULL,6,'지금 바로!'),(2,'2025-02-18 12:59:31.671760',1,8,NULL,6,'헉'),(3,'2025-02-19 03:15:01.855350',NULL,10,NULL,6,'ddd');
/*!40000 ALTER TABLE `tb_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_file`
--

DROP TABLE IF EXISTS `tb_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_file` (
  `createdAt` datetime(6) DEFAULT NULL,
  `fileId` bigint NOT NULL AUTO_INCREMENT,
  `relatedId` bigint NOT NULL,
  `related_id` bigint DEFAULT NULL,
  `filePath` varchar(500) NOT NULL,
  `fileUrl` varchar(500) NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `fileType` varchar(255) NOT NULL,
  `relatedType` enum('CHALLENGE','POST','PROFILE') NOT NULL,
  PRIMARY KEY (`fileId`),
  UNIQUE KEY `UKaaw2ov1lrcwejjp13y568li4x` (`relatedId`,`relatedType`),
  UNIQUE KEY `UKk7u65t4dyjq69ktiw9ogyar9i` (`related_id`),
  CONSTRAINT `FKaraph6dyv77sj322b26mjyy90` FOREIGN KEY (`related_id`) REFERENCES `tb_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_file`
--

LOCK TABLES `tb_file` WRITE;
/*!40000 ALTER TABLE `tb_file` DISABLE KEYS */;
INSERT INTO `tb_file` VALUES ('2025-02-17 08:04:09.050178',1,1,NULL,'challenge/1739779448535_c870961e-60a0-46fe-b06e-f75443e5b4b9.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1739779448535_c870961e-60a0-46fe-b06e-f75443e5b4b9.png','감스트.png','image/png','CHALLENGE'),('2025-02-17 08:09:23.079393',2,2,NULL,'challenge/1739779762862_d5422a1c-09c5-4db9-a0c1-ac24fa7704cc.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1739779762862_d5422a1c-09c5-4db9-a0c1-ac24fa7704cc.jpg','toeic.jpg','image/jpeg','CHALLENGE'),('2025-02-17 08:10:31.139619',3,3,NULL,'challenge/1739779830977_49ecffc9-5a6a-4613-aae9-1de11c1b9048.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1739779830977_49ecffc9-5a6a-4613-aae9-1de11c1b9048.jpg','gunner.jpg','image/jpeg','CHALLENGE'),('2025-02-17 08:12:43.405842',4,4,NULL,'challenge/1739779963241_211c5dd1-9e19-4814-a7f3-f48d63b7f2fc.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1739779963241_211c5dd1-9e19-4814-a7f3-f48d63b7f2fc.jpg','gunner.jpg','image/jpeg','CHALLENGE'),('2025-02-17 08:13:50.897532',5,5,NULL,'challenge/1739780030730_b7088f31-e5bc-4bf0-ad26-532b60c8b36c.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1739780030730_b7088f31-e5bc-4bf0-ad26-532b60c8b36c.png','dreammoalogo.png','image/png','CHALLENGE'),('2025-02-17 08:15:26.622178',6,6,NULL,'challenge/1739780126433_dc825b6b-a0ba-46a6-a8a5-bbd103bf2eaf.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1739780126433_dc825b6b-a0ba-46a6-a8a5-bbd103bf2eaf.jpg','study.jpg','image/jpeg','CHALLENGE'),('2025-02-17 08:16:28.958822',7,7,NULL,'challenge/1739780188813_229b7bff-4262-4c45-a6da-59aa324e1ffd.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1739780188813_229b7bff-4262-4c45-a6da-59aa324e1ffd.jpg','영화방.jpg','image/jpeg','CHALLENGE'),('2025-02-17 08:18:40.903031',8,8,NULL,'challenge/1739780320731_9e8eef6e-b5f2-4b55-bf72-d1630ed57c21.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1739780320731_9e8eef6e-b5f2-4b55-bf72-d1630ed57c21.jpg','사랑.jpg','image/jpeg','CHALLENGE'),('2025-02-17 08:19:29.837053',9,9,NULL,'challenge/1739780369672_209d4b0f-c538-412d-9e22-401d4f8a87a2.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1739780369672_209d4b0f-c538-412d-9e22-401d4f8a87a2.jpg','사랑.jpg','image/jpeg','CHALLENGE'),('2025-02-17 08:20:15.766827',10,10,NULL,'challenge/1739780415621_ab4b860e-d877-44fb-9ed5-c7cf1ace1a2b.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1739780415621_ab4b860e-d877-44fb-9ed5-c7cf1ace1a2b.jpg','study.jpg','image/jpeg','CHALLENGE'),('2025-02-17 08:20:55.739909',11,11,NULL,'challenge/1739780455586_b946bfb1-ccbd-4762-8aa4-d45c07d0f15f.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1739780455586_b946bfb1-ccbd-4762-8aa4-d45c07d0f15f.jpg','영화방.jpg','image/jpeg','CHALLENGE'),('2025-02-18 03:41:11.245114',13,12,NULL,'challenge/1739850071140_60a089a7-12f0-4cec-9d6c-20adb3ed1c3d.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1739850071140_60a089a7-12f0-4cec-9d6c-20adb3ed1c3d.jpg','speech-to-text-apps.jpg','image/jpeg','CHALLENGE'),('2025-02-19 17:48:09.658681',14,14,NULL,'challenge/1739987289317_33009ada-1e84-4ffe-ba06-ef5fdceda7cc.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1739987289317_33009ada-1e84-4ffe-ba06-ef5fdceda7cc.png','스크린샷 2025-02-20 024732.png','image/png','CHALLENGE'),('2025-02-20 01:32:16.056996',16,16,NULL,'challenge/1740015135891_c8765995-648a-47ae-8465-7dc65929ecae.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740015135891_c8765995-648a-47ae-8465-7dc65929ecae.png','스크린샷 2025-02-20 103206.png','image/png','CHALLENGE'),('2025-02-20 01:33:28.368528',17,15,NULL,'challenge/1740015208254_2a584262-b1a6-4a33-a541-e5bc711d9ad0.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740015208254_2a584262-b1a6-4a33-a541-e5bc711d9ad0.jpg','수학 의정석.jpg','image/jpeg','CHALLENGE'),('2025-02-20 05:52:44.869886',18,17,NULL,'challenge/1740030764597_78bfdef8-9b79-4d58-8d09-f2e5c3644da0.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740030764597_78bfdef8-9b79-4d58-8d09-f2e5c3644da0.png','스크린샷 2025-02-20 145213.png','image/png','CHALLENGE'),('2025-02-20 11:42:07.708935',19,18,NULL,'challenge/1740051727527_62afda14-23ed-4afa-9822-f4d1a4ca3910.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740051727527_62afda14-23ed-4afa-9822-f4d1a4ca3910.png','1.png','image/png','CHALLENGE'),('2025-02-20 11:42:56.183168',21,20,NULL,'challenge/1740051776040_899d7139-672c-412c-9fea-44459b7c730e.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740051776040_899d7139-672c-412c-9fea-44459b7c730e.png','3.png','image/png','CHALLENGE'),('2025-02-20 11:44:15.257149',26,25,NULL,'challenge/1740051855092_f775d501-8e2c-4640-941f-c2256c106548.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740051855092_f775d501-8e2c-4640-941f-c2256c106548.png','8.png','image/png','CHALLENGE'),('2025-02-20 11:44:47.678142',27,26,NULL,'challenge/1740051887586_828af305-bd6d-4976-8b6e-8475605bdc4f.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740051887586_828af305-bd6d-4976-8b6e-8475605bdc4f.jpg','1.jpg','image/jpeg','CHALLENGE'),('2025-02-20 11:45:03.491040',28,27,NULL,'challenge/1740051903337_ea983652-977a-4ead-807a-78c75ecd46a5.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740051903337_ea983652-977a-4ead-807a-78c75ecd46a5.png','2.png','image/png','CHALLENGE'),('2025-02-20 11:46:01.454858',31,30,NULL,'challenge/1740051961338_ac868885-a60d-48a6-b4ae-f8c1953eeedd.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740051961338_ac868885-a60d-48a6-b4ae-f8c1953eeedd.png','5.png','image/png','CHALLENGE'),('2025-02-20 11:46:20.291912',32,31,NULL,'challenge/1740051980218_33e3caf2-691d-42ae-82f8-01f22b614a7b.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740051980218_33e3caf2-691d-42ae-82f8-01f22b614a7b.jpg','6.jpg','image/jpeg','CHALLENGE'),('2025-02-20 11:47:48.243195',37,36,NULL,'challenge/1740052068173_f04f132f-a85f-493d-9916-ac42312edf13.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740052068173_f04f132f-a85f-493d-9916-ac42312edf13.jpg','3.jpg','image/jpeg','CHALLENGE'),('2025-02-20 11:48:32.870283',39,38,NULL,'challenge/1740052112761_fd9ac764-7ff2-48d4-9e0b-4ef3d39b8270.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740052112761_fd9ac764-7ff2-48d4-9e0b-4ef3d39b8270.png','6.png','image/png','CHALLENGE'),('2025-02-20 11:48:41.945557',40,39,NULL,'challenge/1740052121845_f7fe4440-1986-4b35-9b10-57d8a9a039ce.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740052121845_f7fe4440-1986-4b35-9b10-57d8a9a039ce.jpg','7.jpg','image/jpeg','CHALLENGE'),('2025-02-20 11:49:35.610838',43,42,NULL,'challenge/1740052175463_bfd7ab37-d955-4583-9286-992d2624f22f.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740052175463_bfd7ab37-d955-4583-9286-992d2624f22f.png','2.png','image/png','CHALLENGE'),('2025-02-20 11:50:00.098716',45,44,NULL,'challenge/1740052199969_9d3a3274-32f7-4e28-a2aa-40f3723e416d.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740052199969_9d3a3274-32f7-4e28-a2aa-40f3723e416d.png','4.png','image/png','CHALLENGE'),('2025-02-20 11:50:16.889320',46,45,NULL,'challenge/1740052216763_17da158c-e7ee-4bc4-8115-0fb0b7659824.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740052216763_17da158c-e7ee-4bc4-8115-0fb0b7659824.png','5.png','image/png','CHALLENGE'),('2025-02-20 11:54:01.127485',48,48,NULL,'challenge/1740052440978_f35691bb-43d7-4b9d-baa6-71592f3332a3.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740052440978_f35691bb-43d7-4b9d-baa6-71592f3332a3.png','7.png','image/png','CHALLENGE'),('2025-02-20 11:57:04.842297',49,50,NULL,'challenge/1740052624677_eb5e44ae-2d88-435e-a274-c3831ea420db.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740052624677_eb5e44ae-2d88-435e-a274-c3831ea420db.png','82.png','image/png','CHALLENGE'),('2025-02-20 11:57:24.857884',50,51,NULL,'challenge/1740052644744_a70d261c-ad15-4547-b499-a363db604680.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740052644744_a70d261c-ad15-4547-b499-a363db604680.png','9.png','image/png','CHALLENGE'),('2025-02-20 11:57:34.839798',51,52,NULL,'challenge/1740052654690_f38d2340-f08d-4ab2-8a4a-e2a27cb2ed23.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740052654690_f38d2340-f08d-4ab2-8a4a-e2a27cb2ed23.png','10.png','image/png','CHALLENGE'),('2025-02-20 11:57:49.633994',52,53,NULL,'challenge/1740052669498_6a385cb3-530d-4267-9ca4-ec573d5138be.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740052669498_6a385cb3-530d-4267-9ca4-ec573d5138be.png','11.png','image/png','CHALLENGE'),('2025-02-20 11:58:01.033473',53,54,NULL,'challenge/1740052680903_cc962756-f1ae-4cac-82c0-9b1f9d273937.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740052680903_cc962756-f1ae-4cac-82c0-9b1f9d273937.png','12.png','image/png','CHALLENGE'),('2025-02-20 11:59:22.223124',54,55,NULL,'challenge/1740052762083_88f44aa7-651a-4c9c-bd76-a80a3559c908.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740052762083_88f44aa7-651a-4c9c-bd76-a80a3559c908.png','mypagechallenge4.png','image/png','CHALLENGE'),('2025-02-20 12:46:49.415540',55,56,NULL,'challenge/1740055609247_0b5d06ea-b372-47ab-b562-27cf5eb1acb4.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740055609247_0b5d06ea-b372-47ab-b562-27cf5eb1acb4.png','1.png','image/png','CHALLENGE'),('2025-02-20 12:57:45.977035',57,19,NULL,'challenge/1740056265835_83d6c73b-a80c-4a65-8abc-982f6b65d9fa.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740056265835_83d6c73b-a80c-4a65-8abc-982f6b65d9fa.png','2.png','image/png','CHALLENGE'),('2025-02-20 13:14:20.496069',60,57,NULL,'challenge/1740057260319_d6b96f44-19f5-4d96-a646-f3a2b558e98e.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740057260319_d6b96f44-19f5-4d96-a646-f3a2b558e98e.png','1.png','image/png','CHALLENGE'),('2025-02-20 13:16:07.187499',62,24,NULL,'challenge/1740057367052_4c91d329-c509-4593-95a0-733a715d0276.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740057367052_4c91d329-c509-4593-95a0-733a715d0276.png','7.png','image/png','CHALLENGE'),('2025-02-20 13:17:32.116164',63,22,NULL,'challenge/1740057452000_bae6a7b5-fbe2-4261-920a-772a541ed903.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740057452000_bae6a7b5-fbe2-4261-920a-772a541ed903.png','5.png','image/png','CHALLENGE'),('2025-02-20 13:33:04.244843',64,21,NULL,'challenge/1740058384141_40fbde3c-719e-4799-b6b0-e97f3ed2b24e.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740058384141_40fbde3c-719e-4799-b6b0-e97f3ed2b24e.png','4.png','image/png','CHALLENGE'),('2025-02-20 13:35:32.829668',65,28,NULL,'challenge/1740058532744_9bb78787-da68-4dce-891a-7690841f4cc8.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740058532744_9bb78787-da68-4dce-891a-7690841f4cc8.jpg','3.jpg','image/jpeg','CHALLENGE'),('2025-02-20 13:37:28.470973',68,29,NULL,'challenge/1740058648399_9b53decf-f3ec-4181-be6e-d08d187268c2.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740058648399_9b53decf-f3ec-4181-be6e-d08d187268c2.jpg','4.jpg','image/jpeg','CHALLENGE'),('2025-02-20 13:37:55.908323',69,32,NULL,'challenge/1740058675866_4cf63f75-e2dc-4e53-a7fd-d86c9efaf1a7.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740058675866_4cf63f75-e2dc-4e53-a7fd-d86c9efaf1a7.jpg','7.jpg','image/jpeg','CHALLENGE'),('2025-02-20 13:38:20.380157',70,33,NULL,'challenge/1740058700308_7af49a50-706d-40ac-b09e-2bc34768df4a.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740058700308_7af49a50-706d-40ac-b09e-2bc34768df4a.jpg','8.jpg','image/jpeg','CHALLENGE'),('2025-02-20 13:38:56.797439',71,34,NULL,'challenge/1740058736731_a1f68378-0e28-4295-ad2b-43e4b8ad846e.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740058736731_a1f68378-0e28-4295-ad2b-43e4b8ad846e.png','1.png','image/png','CHALLENGE'),('2025-02-20 13:39:23.151298',72,35,NULL,'challenge/1740058763065_1f5c7067-2f06-44b3-b87a-17d523765fae.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740058763065_1f5c7067-2f06-44b3-b87a-17d523765fae.jpg','2.jpg','image/jpeg','CHALLENGE'),('2025-02-20 13:39:54.241927',73,37,NULL,'challenge/1740058794161_455d5276-f62d-40cc-9026-ede70fe256ee.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740058794161_455d5276-f62d-40cc-9026-ede70fe256ee.jpg','4.jpg','image/jpeg','CHALLENGE'),('2025-02-20 13:40:27.436396',74,41,NULL,'challenge/1740058827369_0cb4d95f-28ea-4f4c-b371-455bee31b202.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740058827369_0cb4d95f-28ea-4f4c-b371-455bee31b202.jpg','8.jpg','image/jpeg','CHALLENGE'),('2025-02-20 13:41:09.023621',75,43,NULL,'challenge/1740058868915_05f25ba1-d2cb-4400-86f7-86eeaa6a45f5.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740058868915_05f25ba1-d2cb-4400-86f7-86eeaa6a45f5.png','2.png','image/png','CHALLENGE'),('2025-02-20 13:41:56.921344',76,47,NULL,'challenge/1740058916779_fe278dd0-43c5-479f-a8a4-2adaa203f3d5.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740058916779_fe278dd0-43c5-479f-a8a4-2adaa203f3d5.png','62.png','image/png','CHALLENGE'),('2025-02-20 16:49:40.118040',77,10,NULL,'profile/1740070185872_02a54807-f07f-4805-b885-fa782b472691.JPG','https://dream-moa.s3.ap-northeast-2.amazonaws.com/profile/1740070185872_02a54807-f07f-4805-b885-fa782b472691.JPG','IMG_4554.JPG','image/jpeg','PROFILE'),('2025-02-20 17:30:35.832273',78,7,NULL,'profile/1740072635671_dcf6dccf-6f04-475a-a2c3-d5aae76b5f32.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/profile/1740072635671_dcf6dccf-6f04-475a-a2c3-d5aae76b5f32.png','남희.png','image/png','PROFILE'),('2025-02-20 17:34:11.279538',79,11,NULL,'profile/1740072850979_29bf8f90-c1e0-4c03-afe3-5de9350ae912.png','https://dream-moa.s3.ap-northeast-2.amazonaws.com/profile/1740072850979_29bf8f90-c1e0-4c03-afe3-5de9350ae912.png','남희.png','image/png','PROFILE'),('2025-02-21 00:39:38.425680',81,40,NULL,'challenge/1740098378355_9d4716ca-727f-4f32-b5d0-34029c9ff1ac.jpg','https://dream-moa.s3.ap-northeast-2.amazonaws.com/challenge/1740098378355_9d4716ca-727f-4f32-b5d0-34029c9ff1ac.jpg','22.jpg','image/jpeg','CHALLENGE');
/*!40000 ALTER TABLE `tb_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_participant`
--

DROP TABLE IF EXISTS `tb_participant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_participant` (
  `is_active` bit(1) DEFAULT NULL,
  `is_host` bit(1) DEFAULT NULL,
  `challenge_id` int unsigned NOT NULL,
  `joined_at` datetime(6) DEFAULT NULL,
  `participant_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `session_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`participant_id`),
  KEY `FKqvi2d37hnn18xpkbvcbwnrvqi` (`challenge_id`),
  KEY `FK88hyngqbftw93be04fg1uwl49` (`user_id`),
  CONSTRAINT `FK88hyngqbftw93be04fg1uwl49` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`),
  CONSTRAINT `FKqvi2d37hnn18xpkbvcbwnrvqi` FOREIGN KEY (`challenge_id`) REFERENCES `tb_challenge` (`challenge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_participant`
--

LOCK TABLES `tb_participant` WRITE;
/*!40000 ALTER TABLE `tb_participant` DISABLE KEYS */;
INSERT INTO `tb_participant` VALUES (_binary '',_binary '',2,'2025-02-20 01:26:52.784121',2,1,NULL),(_binary '',_binary '\0',2,'2025-02-18 04:21:00.770720',15,2,'wss://dreammoa.duckdns.org:8443?sessionId=ses_PMbfBtTBVy&token=tok_Mo2165YiNZlkJHtP'),(_binary '\0',_binary '\0',2,'2025-02-21 00:13:38.101634',18,6,NULL),(_binary '',_binary '\0',2,'2025-02-20 12:04:41.245207',20,7,NULL),(_binary '\0',_binary '',14,'2025-02-19 17:48:09.315243',26,9,NULL),(_binary '\0',_binary '\0',14,'2025-02-20 00:16:45.390461',27,6,NULL),(_binary '',_binary '\0',2,'2025-02-20 01:25:58.184848',30,10,NULL),(_binary '',_binary '\0',2,'2025-02-20 01:28:28.753261',31,5,NULL),(_binary '\0',_binary '',15,'2025-02-20 01:31:20.149633',32,2,NULL),(_binary '',_binary '',16,'2025-02-20 12:23:16.973147',33,9,NULL),(_binary '',_binary '\0',16,'2025-02-20 01:54:35.731134',34,5,'wss://dreammoa.duckdns.org:8443?sessionId=ses_Exe0R4IwLp&token=tok_AC0Kaa0NAhRVTgBl'),(_binary '',_binary '\0',15,'2025-02-20 17:35:57.095106',35,6,'wss://dreammoa.duckdns.org:8443?sessionId=ses_BO3V8qWkKZ&token=tok_RxjSvzd0O0PRV2U8'),(_binary '\0',_binary '\0',16,'2025-02-20 17:59:40.830452',36,6,NULL),(_binary '',_binary '',17,'2025-02-20 05:54:41.285885',37,9,'wss://dreammoa.duckdns.org:8443?sessionId=ses_Zi9oIULJZz&token=tok_MHeRn3m7dv29liFi'),(_binary '\0',_binary '\0',17,'2025-02-20 06:41:49.088840',38,1,NULL),(_binary '',_binary '\0',17,'2025-02-20 18:01:56.288905',39,6,'wss://dreammoa.duckdns.org:8443?sessionId=ses_LMV1NEVVnr&token=tok_Ke8ldQJ5rrlmrljM'),(_binary '\0',_binary '',18,'2025-02-20 17:00:25.159202',40,7,NULL),(_binary '',_binary '',19,'2025-02-20 12:24:17.056421',41,7,'wss://dreammoa.duckdns.org:8443?sessionId=ses_PX41hQMdQA&token=tok_VcOudAOjUruvPFmA'),(_binary '\0',_binary '',20,'2025-02-20 11:42:56.039400',42,7,NULL),(_binary '\0',_binary '',21,'2025-02-20 16:23:29.292039',43,7,NULL),(_binary '\0',_binary '',22,'2025-02-20 11:43:28.683962',44,7,NULL),(_binary '\0',_binary '',24,'2025-02-20 11:44:00.429014',46,7,NULL),(_binary '\0',_binary '',25,'2025-02-20 11:44:15.092069',47,7,NULL),(_binary '\0',_binary '',26,'2025-02-20 11:44:47.585626',48,7,NULL),(_binary '\0',_binary '',27,'2025-02-20 11:45:03.336406',49,7,NULL),(_binary '\0',_binary '',28,'2025-02-20 11:45:11.526786',50,7,NULL),(_binary '\0',_binary '',29,'2025-02-20 11:45:24.713058',51,7,NULL),(_binary '\0',_binary '',30,'2025-02-20 11:46:01.337610',52,7,NULL),(_binary '\0',_binary '',31,'2025-02-20 11:46:20.217558',53,7,NULL),(_binary '\0',_binary '',32,'2025-02-20 11:46:31.614304',54,7,NULL),(_binary '\0',_binary '',33,'2025-02-20 11:46:47.092882',55,7,NULL),(_binary '\0',_binary '',34,'2025-02-20 11:47:26.343509',56,7,NULL),(_binary '\0',_binary '',35,'2025-02-20 11:47:37.007185',57,7,NULL),(_binary '\0',_binary '',36,'2025-02-20 11:47:48.173106',58,7,NULL),(_binary '\0',_binary '',37,'2025-02-20 11:48:20.060860',59,7,NULL),(_binary '',_binary '',38,'2025-02-20 18:42:25.920036',60,7,NULL),(_binary '\0',_binary '',39,'2025-02-20 11:48:41.844847',61,7,NULL),(_binary '\0',_binary '',40,'2025-02-20 18:40:52.615468',62,7,NULL),(_binary '',_binary '',41,'2025-02-20 18:42:31.485779',63,7,NULL),(_binary '\0',_binary '',42,'2025-02-20 19:50:23.389739',64,7,NULL),(_binary '\0',_binary '',43,'2025-02-20 11:49:48.495168',65,7,NULL),(_binary '\0',_binary '',44,'2025-02-20 11:49:59.968546',66,7,NULL),(_binary '\0',_binary '',45,'2025-02-21 00:56:41.066513',67,7,NULL),(_binary '\0',_binary '',47,'2025-02-20 11:53:44.537008',69,7,NULL),(_binary '\0',_binary '',48,'2025-02-20 11:54:00.978093',70,7,NULL),(_binary '\0',_binary '',50,'2025-02-20 11:57:04.676941',72,7,NULL),(_binary '\0',_binary '',51,'2025-02-20 11:57:24.744037',73,7,NULL),(_binary '\0',_binary '',52,'2025-02-20 11:57:34.689654',74,7,NULL),(_binary '\0',_binary '',53,'2025-02-20 11:57:49.497660',75,7,NULL),(_binary '\0',_binary '',54,'2025-02-20 11:58:00.903092',76,7,NULL),(_binary '\0',_binary '',55,'2025-02-20 11:59:22.082863',77,7,NULL),(_binary '',_binary '\0',17,'2025-02-20 18:05:25.756536',78,7,NULL),(_binary '',_binary '\0',16,'2025-02-20 12:18:21.783310',79,7,NULL),(_binary '\0',_binary '\0',41,'2025-02-20 12:23:00.911771',80,9,NULL),(_binary '\0',_binary '\0',19,'2025-02-20 12:28:36.572169',81,9,NULL),(_binary '\0',_binary '',56,'2025-02-20 12:46:49.247286',82,7,NULL),(_binary '\0',_binary '',57,'2025-02-20 13:14:20.318484',83,7,NULL),(_binary '',_binary '\0',38,'2025-02-21 00:21:14.021936',84,11,NULL),(_binary '\0',_binary '\0',53,'2025-02-20 15:39:32.656287',85,11,NULL),(_binary '\0',_binary '\0',56,'2025-02-20 15:42:27.376906',86,11,NULL),(_binary '',_binary '\0',19,'2025-02-20 18:01:36.336109',87,6,NULL),(_binary '',_binary '\0',15,'2025-02-20 16:50:34.925544',88,10,'wss://dreammoa.duckdns.org:8443?sessionId=ses_GfITtqXPoO&token=tok_QaMnQ6vcAoTJMWDu'),(_binary '\0',_binary '\0',16,'2025-02-20 16:50:46.805930',89,10,NULL),(_binary '',_binary '\0',41,'2025-02-20 17:59:58.853557',90,6,NULL),(_binary '',_binary '\0',23,'2025-02-21 00:44:48.115170',98,7,NULL);
/*!40000 ALTER TABLE `tb_participant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_participant_history`
--

DROP TABLE IF EXISTS `tb_participant_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_participant_history` (
  `action_at` datetime(6) DEFAULT NULL,
  `action_by_user_id` bigint DEFAULT NULL,
  `challenge_id` int unsigned NOT NULL,
  `history_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` enum('INVITED','JOINED','KICKED','LEFT') NOT NULL,
  PRIMARY KEY (`history_id`),
  KEY `FK6gp21a33v2wsdtqdqghcuf4t0` (`action_by_user_id`),
  KEY `FKetsf64piyllb6x1kgpbjbpa1k` (`challenge_id`),
  KEY `FKgpevpsuim0ub2fsnrxt3v0s4y` (`user_id`),
  CONSTRAINT `FK6gp21a33v2wsdtqdqghcuf4t0` FOREIGN KEY (`action_by_user_id`) REFERENCES `tb_user` (`id`),
  CONSTRAINT `FKetsf64piyllb6x1kgpbjbpa1k` FOREIGN KEY (`challenge_id`) REFERENCES `tb_challenge` (`challenge_id`),
  CONSTRAINT `FKgpevpsuim0ub2fsnrxt3v0s4y` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_participant_history`
--

LOCK TABLES `tb_participant_history` WRITE;
/*!40000 ALTER TABLE `tb_participant_history` DISABLE KEYS */;
INSERT INTO `tb_participant_history` VALUES ('2025-02-19 16:41:55.450220',7,12,1,7,'본인이 나가기 선택','LEFT'),('2025-02-21 00:33:44.352439',11,17,2,11,'본인이 나가기 선택','LEFT'),('2025-02-21 00:33:47.369211',11,52,3,11,'본인이 나가기 선택','LEFT'),('2025-02-21 00:33:48.773854',11,22,4,11,'본인이 나가기 선택','LEFT'),('2025-02-21 00:33:50.241749',11,19,5,11,'본인이 나가기 선택','LEFT'),('2025-02-21 00:33:51.753928',11,16,6,11,'본인이 나가기 선택','LEFT'),('2025-02-21 00:33:53.348696',11,23,7,11,'본인이 나가기 선택','LEFT'),('2025-02-21 00:33:54.898035',11,42,8,11,'본인이 나가기 선택','LEFT'),('2025-02-21 00:39:12.776402',7,23,9,7,'본인이 나가기 선택','LEFT');
/*!40000 ALTER TABLE `tb_participant_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_post_like`
--

DROP TABLE IF EXISTS `tb_post_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_post_like` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` int unsigned NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKg9j1qh0ic8r2h896mc1opdb87` (`post_id`,`user_id`),
  KEY `FK2de50645bl1b1tw6g4j14fg9j` (`user_id`),
  CONSTRAINT `FK2de50645bl1b1tw6g4j14fg9j` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`),
  CONSTRAINT `FK69ics60x6j1g8j7w48nu2ynkq` FOREIGN KEY (`post_id`) REFERENCES `tb_board` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_post_like`
--

LOCK TABLES `tb_post_like` WRITE;
/*!40000 ALTER TABLE `tb_post_like` DISABLE KEYS */;
INSERT INTO `tb_post_like` VALUES (2,2,7),(1,7,2);
/*!40000 ALTER TABLE `tb_post_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_report`
--

DROP TABLE IF EXISTS `tb_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_report` (
  `challenge_id` int unsigned DEFAULT NULL,
  `comment_id` bigint DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `post_id` int unsigned DEFAULT NULL,
  `report_id` int unsigned NOT NULL AUTO_INCREMENT,
  `reported_user_id` bigint NOT NULL,
  `reporter_id` bigint NOT NULL,
  `reason` text NOT NULL,
  `report_type` enum('CHALLENGE','COMMENT','POST','USER') NOT NULL,
  PRIMARY KEY (`report_id`),
  KEY `FK7pygydkakwkioiibo9b4bdm2c` (`challenge_id`),
  KEY `FKmcd58fvt81qhxwhu4cl2qlvfb` (`comment_id`),
  KEY `FK471ww0bhm1d7963pt454ra0ag` (`post_id`),
  KEY `FK59s8vclt21jtcphdd1u886noh` (`reported_user_id`),
  KEY `FK98jlodr3fywysrqt1ecu4q2ey` (`reporter_id`),
  CONSTRAINT `FK471ww0bhm1d7963pt454ra0ag` FOREIGN KEY (`post_id`) REFERENCES `tb_board` (`post_id`),
  CONSTRAINT `FK59s8vclt21jtcphdd1u886noh` FOREIGN KEY (`reported_user_id`) REFERENCES `tb_user` (`id`),
  CONSTRAINT `FK7pygydkakwkioiibo9b4bdm2c` FOREIGN KEY (`challenge_id`) REFERENCES `tb_challenge` (`challenge_id`),
  CONSTRAINT `FK98jlodr3fywysrqt1ecu4q2ey` FOREIGN KEY (`reporter_id`) REFERENCES `tb_user` (`id`),
  CONSTRAINT `FKmcd58fvt81qhxwhu4cl2qlvfb` FOREIGN KEY (`comment_id`) REFERENCES `tb_comment` (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_report`
--

LOCK TABLES `tb_report` WRITE;
/*!40000 ALTER TABLE `tb_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_tag`
--

DROP TABLE IF EXISTS `tb_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_tag` (
  `tag_id` bigint NOT NULL AUTO_INCREMENT,
  `tagName` varchar(255) NOT NULL,
  PRIMARY KEY (`tag_id`),
  UNIQUE KEY `UKes2rjbvke1hfinr6wwuo52gyx` (`tagName`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_tag`
--

LOCK TABLES `tb_tag` WRITE;
/*!40000 ALTER TABLE `tb_tag` DISABLE KEYS */;
INSERT INTO `tb_tag` VALUES (23,'30일챌린지'),(26,'9to6'),(32,'Java'),(42,'NCS'),(21,'nginx'),(3,'PS'),(39,'SQLD'),(35,'SSAFY'),(50,'가이드'),(31,'개발자'),(18,'건강'),(24,'공무원'),(8,'공부'),(25,'공시생'),(14,'공지'),(51,'네트워크'),(52,'닉네임'),(6,'다이어트'),(37,'독서모임'),(43,'독서실'),(41,'매일'),(38,'면접준비'),(15,'모집'),(22,'미라클모닝'),(13,'방청소'),(11,'복습'),(4,'산책'),(28,'수능'),(17,'수학'),(44,'스터디카페'),(33,'스프링'),(2,'습관'),(7,'영화'),(20,'오픈비두'),(40,'온라인'),(12,'요리'),(5,'운동'),(29,'자격증'),(34,'자바'),(47,'전산세무'),(36,'직장인'),(49,'챌린지'),(10,'첼린지'),(16,'추천'),(30,'취준생'),(1,'토익'),(9,'팁'),(46,'편입'),(53,'프로필'),(27,'학생'),(45,'학원강사'),(19,'헬스'),(48,'회원가입');
/*!40000 ALTER TABLE `tb_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user` (
  `createdAt` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `lastLogin` datetime(6) DEFAULT NULL,
  `determination` text,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','Google','Kakao','Naver','USER') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK4vih17mube9j7cqyjlfbcrk4m` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES ('2025-02-17 07:50:19.387120',1,'2025-02-20 11:01:25.804377',NULL,'cod0211@nate.com','권남희','권남희','$2a$10$JE7Qu7bQ6bd9GzY6OwaV1O5OYRntoK7yDOWqK7pEmMRP1LDACJy7O','USER'),('2025-02-17 07:50:34.202859',2,'2025-02-20 06:44:11.063227',NULL,'cod0212@nate.com','임남기','임남기','$2a$10$C2jFiXoQMtvDeD4hC48VD.RhSqFXe11xb5kVayC00goRMAb6zOLz2','USER'),('2025-02-17 07:51:00.498630',3,'2025-02-18 03:19:51.063583',NULL,'cod0213@nate.com','김한주','김한주','$2a$10$7qW2w2LeZM8.zAzMhQK5d.olJTNij4sPeSAff6igKz981JgcZJRQO','USER'),('2025-02-17 07:51:23.220763',4,'2025-02-18 03:34:07.572666',NULL,'cod0214@nate.com','신우진','신우진','$2a$10$Bbcrezmk/cc96OQJSYFrfOeuDlhCWv2W4bkm./byx93Spn.YrZIf.','USER'),('2025-02-17 07:51:43.775764',5,'2025-02-20 01:27:50.442653',NULL,'cod0215@nate.com','김소연','김소연','$2a$10$/2ATp6fdGYtjJbZ27gQruObO9w.jLYb2Iqag4LtjVMGCnOFPoWCwG','USER'),('2025-02-18 08:49:14.613079',6,'2025-02-21 01:09:16.367913',NULL,'ksb2725@naver.com','김한주','제발요','$2a$10$W/zHNuC2pgsM1r4u2wkfTOVaCqJJVjd9sEVKzfH7Zvbk13mTRZWTa','USER'),('2025-02-18 13:51:25.556841',7,'2025-02-21 01:11:43.936370',NULL,'happynj2697@gmail.com','권남희','Hui','$2a$10$3PfbB3FfRJfmiIUSvlTa2.T/D4XVmTBdQzQztgS/Pmm8oRkvIuuDK','USER'),('2025-02-19 14:33:55.015881',8,'2025-02-19 14:34:13.909154',NULL,'cod0220@nate.com','찐육','아아','$2a$10$J.eL7cKD8k6X0Sy5ukB7L.U/ncWlgh1pcPz4C0hZ1PuHiAoITNkkm','USER'),('2025-02-19 16:37:57.196210',9,'2025-02-21 00:15:12.306946',NULL,'knaem.edu@gmail.com','냄냄','naem','$2a$10$HT.YRzOJ9PzdUlZwZkHbT.fx.fQHTev5prUdTiwczmSvYrMNnqe52','USER'),('2025-02-20 00:20:08.042138',10,'2025-02-20 23:46:37.881965',NULL,'soyeon3589@naver.com','소연이','sso','$2a$10$TIYB2NMRMMfwQh0L5PeatuGf8boZBO/5aJIntpWNoM4ou0SHtzKRe','USER'),('2025-02-20 14:23:50.244622',11,'2025-02-21 01:00:10.145656','오늘하루 최선을 다해! 아자아자!','happynj2697@naver.com','권남희','NamHui','$2a$10$xeNbPtjq/t5zTDhd07WayugXQD4chYr3Ku0xJ/70zYE3IzDEbmTfS','USER');
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user_badge`
--

DROP TABLE IF EXISTS `tb_user_badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user_badge` (
  `badge_id` bigint NOT NULL,
  `user_badge_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`user_badge_id`),
  KEY `FKhd9y0m8kvkilio0r0rr1q5xxl` (`badge_id`),
  KEY `FKs36y6g068mxlvh9cpjagjyunw` (`user_id`),
  CONSTRAINT `FKhd9y0m8kvkilio0r0rr1q5xxl` FOREIGN KEY (`badge_id`) REFERENCES `tb_badge` (`badge_id`),
  CONSTRAINT `FKs36y6g068mxlvh9cpjagjyunw` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user_badge`
--

LOCK TABLES `tb_user_badge` WRITE;
/*!40000 ALTER TABLE `tb_user_badge` DISABLE KEYS */;
INSERT INTO `tb_user_badge` VALUES (1,1,4),(2,2,2),(3,3,7),(4,4,7),(5,5,11),(6,6,11);
/*!40000 ALTER TABLE `tb_user_badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user_tag`
--

DROP TABLE IF EXISTS `tb_user_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_user_tag` (
  `tag_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `tagName` varchar(255) NOT NULL,
  PRIMARY KEY (`tag_id`),
  KEY `FKritdvxcro9e2l48a2eo9yw04r` (`user_id`),
  CONSTRAINT `FKritdvxcro9e2l48a2eo9yw04r` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1033 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user_tag`
--

LOCK TABLES `tb_user_tag` WRITE;
/*!40000 ALTER TABLE `tb_user_tag` DISABLE KEYS */;
INSERT INTO `tb_user_tag` VALUES (941,10,'nginx'),(942,10,'오픈비두'),(959,6,'nginx'),(960,6,'오픈비두'),(963,9,'자격증'),(964,9,'취준생'),(966,9,'개발자'),(969,11,'습관'),(970,11,'SSAFY'),(971,11,'개발자'),(1030,7,'습관'),(1031,7,'SSAFY'),(1032,7,'개발자');
/*!40000 ALTER TABLE `tb_user_tag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-21 10:20:26

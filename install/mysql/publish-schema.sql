SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `publish` ;
CREATE SCHEMA IF NOT EXISTS `publish` DEFAULT CHARACTER
    SET utf8 COLLATE utf8_unicode_ci ;
USE `publish` ;

-- -----------------------------------------------------
-- Table `publish`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `publish`.`user` ;

CREATE TABLE IF NOT EXISTS `publish`.`user` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `display_name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `google_id` VARCHAR(100) NULL,
  `facebook_id` VARCHAR(100) NULL,
  `twitter_id` VARCHAR(100) NULL,
  `created` DATETIME NULL,
  `updated` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `display_name_UNIQUE` (`display_name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `publish`.`post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `publish`.`post` ;

CREATE TABLE IF NOT EXISTS `publish`.`post` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT(10) UNSIGNED NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `description_md` TEXT NOT NULL,
  `body` TEXT NOT NULL,
  `body_md` TEXT NOT NULL,
  `created` DATETIME NULL,
  `updated` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC),
  INDEX `fk_post_user_user_id_idx` (`user_id` ASC),
  CONSTRAINT `fk_post_user_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `publish`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `publish`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `publish`.`category` ;

CREATE TABLE IF NOT EXISTS `publish`.`category` (
  `id` INT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `name_short` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `publish`.`post_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `publish`.`post_category` ;

CREATE TABLE IF NOT EXISTS `publish`.`post_category` (
  `post_id` INT(10) UNSIGNED NOT NULL,
  `category_id` INT(5) UNSIGNED NOT NULL,
  INDEX `fk_post_category_post_post_id_idx` (`post_id` ASC),
  INDEX `fk_post_category_category_category_id_idx` (`category_id` ASC),
  CONSTRAINT `fk_post_category_post_post_id`
    FOREIGN KEY (`post_id`)
    REFERENCES `publish`.`post` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_post_category_category_category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `publish`.`category` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `publish`.`feature_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `publish`.`feature_type` ;

CREATE TABLE IF NOT EXISTS `publish`.`feature_type` (
  `id` INT(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `publish`.`feature`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `publish`.`feature` ;

CREATE TABLE IF NOT EXISTS `publish`.`feature` (
  `id` INT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type_id` INT(3) UNSIGNED NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_feature_feature_type_type_id_idx` (`type_id` ASC),
  CONSTRAINT `fk_feature_feature_type_type_id`
    FOREIGN KEY (`type_id`)
    REFERENCES `publish`.`feature_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `publish`.`post_feature`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `publish`.`post_feature` ;

CREATE TABLE IF NOT EXISTS `publish`.`post_feature` (
  `post_id` INT(10) UNSIGNED NOT NULL,
  `feature_id` INT(5) UNSIGNED NOT NULL,
  INDEX `fk_post_feature_feature_feature_id_idx` (`feature_id` ASC),
  INDEX `fk_post_feature_post_post_id_idx` (`post_id` ASC),
  CONSTRAINT `fk_post_feature_feature_feature_id`
    FOREIGN KEY (`feature_id`)
    REFERENCES `publish`.`feature` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_post_feature_post_post_id`
    FOREIGN KEY (`post_id`)
    REFERENCES `publish`.`post` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

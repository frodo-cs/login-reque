CREATE TABLE USER(
	full_name VARCHAR(100) NOT NULL,
	username VARCHAR(20) NOT NULL,
	pass VARCHAR(100) NOT NULL,
	validated TINYINT NOT NULL DEFAULT 0,
	PRIMARY KEY(username);
) 
call insert_admin("Administrador", "admin", "admin");


# Procedimiento para insertar usuarios

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_user`(
	IN `p_full_name` VARCHAR(100),
	IN `p_username` VARCHAR(20),
	IN `p_pass` VARCHAR(100)
)
LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN
	INSERT INTO user (full_name, username, pass, validated, admin)
	VALUES (p_full_name, p_username, p_pass, 0, 0);
END

# Procedimiento para insertar administradores

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_admin`(
	IN `p_full_name` VARCHAR(100),
	IN `p_username` VARCHAR(20),
	IN `p_pass` VARCHAR(100)
)
LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN
	INSERT INTO user (full_name, username, pass, validated, admin)
	VALUES (p_full_name, p_username, p_pass, 1, 1);
END
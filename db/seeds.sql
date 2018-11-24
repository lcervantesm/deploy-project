INSERT INTO Roles
VALUES (1, "Admin", NOW(), NOW()), (2, "Manager", NOW(), NOW()), (3, "Author", NOW(), NOW()), (4, "Viewer", NOW(), NOW());

INSERT INTO Groups (id, group_name, createdAt, updatedAt)
VALUES (10000, "Tec de Monterrey", NOW(), NOW()), (10001, "Trilogy", NOW(), NOW());

INSERT INTO Users (id, email, first_name, last_name, createdAt, updatedAt, GroupId, RoleId)
VALUES (10000000, "codingtesting@maildrop.cc", "Edwin", "Vázquez", NOW(), NOW(), 10000, 1), (10000001, "testingmydb2@maildrop.cc", "Franklin", "Henderson", NOW(), NOW(), 10001, 1);

INSERT INTO Forms (id, form_name, createdAt, updatedAt, GroupId, UserId)
VALUES ("a1000000000", "Satisfaction survey", NOW(), NOW(), 10000, 10000000);
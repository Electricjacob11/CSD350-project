/* 
Database starter for Montessori Student Attendance Tracker.
It creates the current tables and adds sample data.
*/
    
CREATE DATABASE IF NOT EXISTS montessori_attendance;
USE montessori_attendance;

DROP TABLE IF EXISTS ATTENDANCE_RECORD;
DROP TABLE IF EXISTS STUDENT_AUTHORIZED_ADULT;
DROP TABLE IF EXISTS AUTHORIZED_ADULT;
DROP TABLE IF EXISTS STUDENT;

CREATE TABLE STUDENT (
    StudentID INT AUTO_INCREMENT PRIMARY KEY,
    StudentName VARCHAR(100) NOT NULL,
    AttendanceStatus VARCHAR(20) NOT NULL
);

CREATE TABLE AUTHORIZED_ADULT (
    AdultID INT AUTO_INCREMENT PRIMARY KEY,
    AdultName VARCHAR(100) NOT NULL,
    AdultCode VARCHAR(4) NOT NULL UNIQUE
);

CREATE TABLE STUDENT_AUTHORIZED_ADULT (
    StudentID INT NOT NULL,
    AdultID INT NOT NULL,
    PRIMARY KEY (StudentID, AdultID),
    FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID),
    FOREIGN KEY (AdultID) REFERENCES AUTHORIZED_ADULT(AdultID)
);

CREATE TABLE ATTENDANCE_RECORD (
    RecordID INT AUTO_INCREMENT PRIMARY KEY,
    StudentID INT NOT NULL,
    AdultID INT NOT NULL,
    CheckIn DATETIME,
    CheckOut DATETIME,
    FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID),
    FOREIGN KEY (AdultID) REFERENCES AUTHORIZED_ADULT(AdultID)
);

INSERT INTO STUDENT (StudentName, AttendanceStatus) VALUES
    ('Jodi Plouffe', 'Checked Out'),
    ('Danielle Brassard', 'Checked In'),
    ('Herbert Barrett', 'Checked Out'),
    ('Denis Gill', 'Checked In'),
    ('Glenn Mercier', 'Checked Out'),
    ('Pauline Caron', 'Checked In'),
    ('Nikki McConnell', 'Checked In'),
    ('Fran Guay', 'Checked Out'),
    ('Bryan Drolet', 'Checked Out'),
    ('Ivan Robinson', 'Checked In'),
    ('Pamela Becker', 'Checked Out'),
    ('Marilyn Nicholson', 'Checked In'),
    ('Deborah Santos', 'Checked Out'),
    ('Leanne Huang', 'Checked In'),
    ('Beatrice Jiang', 'Checked In');

INSERT INTO AUTHORIZED_ADULT (AdultName, AdultCode) VALUES
    ('Kayla Mathieu', '0951'),
    ('Margo Vachon', '1234'),
    ('Pat Mann', '9831'),
    ('Colin McCann', '3872'),
    ('Tatiana Lims', '4712'),
    ('Daryl Bernard', '8716'),
    ('Randy Gagnon', '4905'),
    ('Clement Legault', '2708'),
    ('Guy Trudeau', '5902'),
    ('Barb Burton', '5087'),
    ('Julien Proulx', '2395'),
    ('June Allard', '3690'),
    ('Rhonda Hall', '5064'),
    ('Steeve Hoffman', '6810'),
    ('Karine Mailloux', '6432');

-- Connect students to authorized adults
INSERT INTO STUDENT_AUTHORIZED_ADULT (StudentID, AdultID) VALUES
    -- Two students (siblings) connected to two adults 
    (1, 1),
    (1, 2),
    (2, 1),
    (2, 2),

    -- One student connected to one adult
    (3, 3),
    (4, 4),
    (5, 5),

    -- One student connected to two adults 
    (6, 6),
    (6, 7),

    -- Two students connected to one adult
    (7, 8),
    (8, 8),

    -- One student connected to two adults
    (9, 9),
    (9, 10),

    -- Two students connected to one adult
    (10, 11),
    (11, 11),

    -- Two students connected to two adults
    (12, 12),
    (12, 13),
    (13, 12),
    (13, 13),

    -- One student connected to one adult
    (14, 14),
    (15, 15);
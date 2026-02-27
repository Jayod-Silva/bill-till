-- ======================================================
-- AUTHENTICATION STORED PROCEDURES (SQL SERVER)
-- Includes: Registration, Login and Basic Queries
-- ======================================================

-- 1️⃣ TABLE REFRESH (Optional: For Reference Only)
-- Prisma manages these tables, but here is the SQL for manual setup if needed.

/*
CREATE TABLE [User] (
    id INT IDENTITY(1,1) PRIMARY KEY,
    firstName NVARCHAR(100) NOT NULL,
    lastName NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    password NVARCHAR(MAX) NOT NULL,
    phone NVARCHAR(20),
    role NVARCHAR(20) DEFAULT 'user',
    status NVARCHAR(20) DEFAULT 'active',
    profilePic NVARCHAR(MAX),
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Business (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT UNIQUE NOT NULL,
    name NVARCHAR(200) NOT NULL,
    type NVARCHAR(100) NOT NULL,
    address NVARCHAR(MAX) NOT NULL,
    city NVARCHAR(100) NOT NULL,
    province NVARCHAR(100) NOT NULL,
    zipCode NVARCHAR(20) NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES [User](id) ON DELETE CASCADE
);
*/

GO

-- 2️⃣ STORED PROCEDURE: sp_RegisterUserWithBusiness
-- Handles atomic registration of a User and their Business
CREATE OR ALTER PROCEDURE sp_RegisterUserWithBusiness
    @FirstName NVARCHAR(100),
    @LastName NVARCHAR(100),
    @Email NVARCHAR(100),
    @Password NVARCHAR(MAX),
    @Phone NVARCHAR(20),
    @BusinessName NVARCHAR(200),
    @BusinessType NVARCHAR(100),
    @BusinessAddress NVARCHAR(MAX),
    @City NVARCHAR(100),
    @Province NVARCHAR(100),
    @ZipCode NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        -- Check if email exists
        IF EXISTS (SELECT 1 FROM [User] WHERE email = @Email)
        BEGIN
            THROW 50001, 'Email already registered.', 1;
        END

        -- Insert User
        INSERT INTO [User] (firstName, lastName, email, password, phone, role, status, createdAt, updatedAt)
        VALUES (@FirstName, @LastName, @Email, @Password, @Phone, 'user', 'active', GETDATE(), GETDATE());

        DECLARE @UserId INT = SCOPE_IDENTITY();

        -- Insert Business
        INSERT INTO Business (userId, name, type, address, city, province, zipCode, createdAt, updatedAt)
        VALUES (@UserId, @BusinessName, @BusinessType, @BusinessAddress, @City, @Province, @ZipCode, GETDATE(), GETDATE());

        COMMIT TRANSACTION;
        
        -- Return the created user and business info
        SELECT u.*, b.name AS businessName 
        FROM [User] u
        LEFT JOIN Business b ON u.id = b.userId
        WHERE u.id = @UserId;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

-- 3️⃣ STORED PROCEDURE: sp_LoginUser
-- Retrieves user details by email for verification (password check should be done in backend)
CREATE OR ALTER PROCEDURE sp_LoginUser
    @Email NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT id, firstName, lastName, email, password, role, status
    FROM [User]
    WHERE email = @Email AND status = 'active';
END;
GO

-- 4️⃣ ESSENTIAL QUERIES (DML/DQL)

-- Check if User Exists
-- SELECT 1 FROM [User] WHERE email = 'user@example.com';

-- Update User Profile
-- UPDATE [User] SET firstName = 'John', lastName = 'Doe' WHERE id = 1;

-- Get User with Business Details
-- SELECT u.*, b.name, b.type, b.address 
-- FROM [User] u 
-- JOIN Business b ON u.id = b.userId 
-- WHERE u.id = 1;

-- Delete User (and linked Business via CASCADE)
-- DELETE FROM [User] WHERE id = 1;

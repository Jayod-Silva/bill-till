-- Create Tables (if not using Prisma db push)
-- Note: Prisma will handle table creation if you run 'npx prisma db push'
-- These scripts are for your reference and for creating the Stored Procedures.

-- 1️⃣ PROCEDURE: sp_RegisterUserWithBusiness
-- This handles atomic registration of user and business details
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
        IF EXISTS (SELECT 1 FROM [User] WHERE Email = @Email)
        BEGIN
            THROW 50001, 'Email already registered.', 1;
        END

        -- Insert User
        INSERT INTO [User] (FirstName, LastName, Email, [Password], Phone, [Role], [Status], CreatedAt, UpdatedAt)
        VALUES (@FirstName, @LastName, @Email, @Password, @Phone, 'user', 'active', GETDATE(), GETDATE());

        DECLARE @UserId INT = SCOPE_IDENTITY();

        -- Insert Business
        INSERT INTO Business (UserId, [Name], [Type], [Address], City, Province, ZipCode, CreatedAt, UpdatedAt)
        VALUES (@UserId, @BusinessName, @BusinessType, @BusinessAddress, @City, @Province, @ZipCode, GETDATE(), GETDATE());

        COMMIT TRANSACTION;
        
        -- Return the created user
        SELECT * FROM [User] WHERE Id = @UserId;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

-- 2️⃣ PROCEDURE: sp_GetDashboardData
-- This fetches all necessary dashboard info in a single call
CREATE OR ALTER PROCEDURE sp_GetDashboardData
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Profile Info
    SELECT * FROM [User] WHERE Id = @UserId;

    -- Business Info
    SELECT * FROM Business WHERE UserId = @UserId;

    -- Subscription Info
    SELECT TOP 1 * FROM Subscription 
    WHERE UserId = @UserId 
    ORDER BY CreatedAt DESC;

    -- Recent Payments
    SELECT TOP 10 * FROM Payment 
    WHERE UserId = @UserId 
    ORDER BY CreatedAt DESC;

    -- Unread Notifications
    SELECT * FROM Notification 
    WHERE UserId = @UserId AND IsRead = 0 
    ORDER BY CreatedAt DESC;
END;
GO

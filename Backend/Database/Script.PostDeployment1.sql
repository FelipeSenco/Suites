/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Properties')
BEGIN
    CREATE TABLE Properties
    (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        Name NVARCHAR(100) NOT NULL,
        Address NVARCHAR(255) NOT NULL,
        Rooms INT NULL DEFAULT 0,   
        SysStartTime datetime2(0) GENERATED ALWAYS AS ROW START NOT NULL,
        SysEndTime datetime2(0) GENERATED ALWAYS AS ROW END NOT NULL,
        PERIOD FOR SYSTEM_TIME (SysStartTime, SysEndTime)
    )
    WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.PropertiesHistory));    
    
    -- Insert the data
    INSERT INTO Properties (Id, Name, Address, Rooms)
    VALUES
        (NEWID(), 'Bustamante', 'Rua Bustamante 343, Chacara Santo Antonio, Sao Paulo - SP, 04312-012', 12),
        (NEWID(), 'Bento Barbosa', 'Rua Bento Barbosa 222, Chacara Santo Antonio, Sao Paulo - SP, 04111-050', 8),
        (NEWID(), 'Ramada', 'Rua Ramada 111, Chacara Santo Antonio, Sao Paulo - SP, 03017-012', 9);
END;


IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Tenants')
BEGIN
    CREATE TABLE Tenants
    (
        Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        Name NVARCHAR(100) NOT NULL,
        LastName NVARCHAR(100) NOT NULL,
        Email NVARCHAR(100) NOT NULL,
        CellPhone NVARCHAR(20) NOT NULL,
        PropertyId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Properties(Id),
        RoomNumber INT NOT NULL,
        SysStartTime datetime2(0) GENERATED ALWAYS AS ROW START NOT NULL,
        SysEndTime datetime2(0) GENERATED ALWAYS AS ROW END NOT NULL,
        PERIOD FOR SYSTEM_TIME (SysStartTime, SysEndTime)
    )
    WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.TenantsHistory));
END;

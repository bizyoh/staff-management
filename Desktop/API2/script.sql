USE [StaffManagement]
GO
/****** Object:  Table [dbo].[Staff]    Script Date: 9/15/2023 2:19:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Staff](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](250) NULL,
	[ShortName] [nvarchar](250) NULL,
 CONSTRAINT [PK_Staff] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StaffInTask]    Script Date: 9/15/2023 2:19:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StaffInTask](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[StaffId] [int] NOT NULL,
	[TaskId] [int] NOT NULL,
 CONSTRAINT [PK_StaffInTask] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Task]    Script Date: 9/15/2023 2:19:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Task](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ParentId] [int] NULL,
	[Label] [nchar](100) NULL,
	[Type] [nvarchar](250) NULL,
	[Name] [nvarchar](250) NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[Duration] [int] NULL,
	[Progress] [decimal](30, 0) NULL,
	[IsUnscheduled] [bit] NULL,
 CONSTRAINT [PK_Task] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[StaffInTask]  WITH CHECK ADD FOREIGN KEY([StaffId])
REFERENCES [dbo].[Staff] ([Id])
GO
ALTER TABLE [dbo].[StaffInTask]  WITH CHECK ADD FOREIGN KEY([StaffId])
REFERENCES [dbo].[Staff] ([Id])
GO
ALTER TABLE [dbo].[StaffInTask]  WITH CHECK ADD FOREIGN KEY([TaskId])
REFERENCES [dbo].[Task] ([Id])
GO

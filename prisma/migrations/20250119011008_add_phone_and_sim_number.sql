-- Add phone_number and sim_number fields to User table
ALTER TABLE "User" 
ADD COLUMN "phone_number" TEXT DEFAULT '' NOT NULL,
ADD COLUMN "sim_number" TEXT DEFAULT '' NOT NULL;

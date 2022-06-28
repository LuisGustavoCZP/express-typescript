CREATE TABLE public.users (
	"id" VARCHAR(36),
	"cpf" VARCHAR(14) NOT NULL UNIQUE,
	"name" VARCHAR(255) NOT NULL,
	"email" VARCHAR(255) NOT NULL,
	"birthdate" VARCHAR(10) NOT NULL,
	"created_by" VARCHAR(36),
	"created_at" TIMESTAMP NOT NULL,
	"updated_by" VARCHAR(36),
	"updated_at" TIMESTAMP,
	"deleted_by" VARCHAR(36),
	"deleted_at" TIMESTAMP,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.accounts (
	"id" VARCHAR(36) NOT NULL UNIQUE,
	"owner" VARCHAR(36) NOT NULL,
	"agency" VARCHAR(4) NOT NULL,
	"agency_identifier" VARCHAR(1) NOT NULL,
	"account" VARCHAR(8) NOT NULL,
	"account_identifier" VARCHAR(1) NOT NULL,
	"balance" FLOAT NOT NULL,
	"created_by" VARCHAR(36),
	"created_at" TIMESTAMP NOT NULL,
	"updated_by" VARCHAR(36),
	"updated_at" TIMESTAMP,
	"deleted_by" VARCHAR(36),
	"deleted_at" TIMESTAMP,
	CONSTRAINT "accounts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE SEQUENCE ag_serial MAXVALUE 99999 START 100 CYCLE OWNED BY accounts.agency; 
CREATE SEQUENCE ac_serial MAXVALUE 999999999 START 200 CYCLE OWNED BY accounts.account;

ALTER TABLE "accounts" ADD CONSTRAINT "accounts_fk0" FOREIGN KEY ("owner") REFERENCES "users"("id");

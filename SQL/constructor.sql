CREATE TABLE public.users (
	"id" VARCHAR(36),
	"cpf" varchar(14) NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"birthdate" varchar(10) NOT NULL,
	"created_by" varchar(36),
	"created_at" TIMESTAMP NOT NULL,
	"updated_by" varchar(36),
	"updated_at" TIMESTAMP,
	"deleted_by" varchar(36),
	"deleted_at" TIMESTAMP,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.accounts (
	"id" varchar(36) NOT NULL UNIQUE,
	"owner" varchar(36) NOT NULL,
	"agency" varchar(4) NOT NULL,
	"agency_identifier" varchar(1) NOT NULL,
	"account" varchar(8) NOT NULL,
	"account_identifier" varchar(1) NOT NULL,
	"balance" FLOAT NOT NULL,
	"created_by" varchar(36),
	"created_at" TIMESTAMP NOT NULL,
	"updated_by" varchar(36),
	"updated_at" TIMESTAMP,
	"deleted_by" varchar(36),
	"deleted_at" TIMESTAMP,
	CONSTRAINT "accounts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.transactions (
	"id" varchar(36) NOT NULL,
	"account" varchar(36),
	"type" varchar(50) NOT NULL,
	"value" FLOAT NOT NULL,
	"created_by" varchar(36),
	"created_at" TIMESTAMP NOT NULL,
	"updated_by" varchar(36),
	"updated_at" TIMESTAMP,
	"deleted_by" varchar(36),
	"deleted_at" TIMESTAMP,
	CONSTRAINT "transactions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "accounts" ADD CONSTRAINT "accounts_fk0" FOREIGN KEY ("owner") REFERENCES "users"("id");


ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk0" FOREIGN KEY ("account") REFERENCES "accounts"("id");





CREATE SEQUENCE ag_serial MAXVALUE 99999 START 100 NO CYCLE OWNED BY accounts.agency; 
CREATE SEQUENCE ac_serial MAXVALUE 999999999 START 200 NO CYCLE OWNED BY accounts.account;

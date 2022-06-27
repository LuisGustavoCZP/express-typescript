CREATE TABLE public.users (
	"id" VARCHAR(255),
	"cpf" VARCHAR(255) NOT NULL UNIQUE,
	"name" VARCHAR(255) NOT NULL,
	"email" VARCHAR(255) NOT NULL,
	"birthdate" VARCHAR(255) NOT NULL,
	"created_by" VARCHAR(255),
	"created_at" TIMESTAMP NOT NULL,
	"updated_by" VARCHAR(255),
	"updated_at" TIMESTAMP,
	"deleted_by" VARCHAR(255),
	"deleted_at" TIMESTAMP,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.accounts (
	"id" VARCHAR(255) NOT NULL UNIQUE,
	"owner" VARCHAR(255) NOT NULL,
	"agency" integer NOT NULL,
	"agency_identifier" integer NOT NULL,
	"account" integer NOT NULL,
	"account_identifier" integer NOT NULL,
	"balance" FLOAT NOT NULL,
	"created_by" VARCHAR(255),
	"created_at" TIMESTAMP NOT NULL,
	"updated_by" VARCHAR(255),
	"updated_at" TIMESTAMP,
	"deleted_by" VARCHAR(255),
	"deleted_at" TIMESTAMP,
	CONSTRAINT "accounts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "accounts" ADD CONSTRAINT "accounts_fk0" FOREIGN KEY ("owner") REFERENCES "users"("id");

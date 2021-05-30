-- \dn      // show list of schemas

-- CREATE SCHEMA schema_name [ AUTHORIZATION role_specification ] schema_element [ ... ] 
  -- Use SQL commands as schema_element as below,
  ---- CREATE TABLE
  ---- CREATE VIEW
  ---- CREATE INDEX
  ---- CREATE SEQUENCE
  ---- CREATE TRIGGER
  ---- GRANT
-- CREATE SCHEMA test;
-- CREATE SCHEMA trading AUTHORIZATION ts_trading_db_admin;

-- SHOW search_path;
-- SET search_path TO スキーマ名1,スキーマ名2,...;                    // 一時的にserch_pathを変更
-- SET search_path TO スキーマ名1,スキーマ名2,...;                    // 一時的にserch_pathを変更
-- ALTER ROLE user SET search_path = スキーマ名1,スキーマ名2,...;     // 恒久的にserch_pathを変更

-- ALTER SCHEMA test RENAME TO new_test;
-- ALTER SCHEMA new_test OWNER TO new_owner;

-- DROP SCHEMA IF EXISTS test;



CREATE TABLE IF NOT EXISTS clientContactLog (
client_contact_id serial primary key,
case_id integer ,
  date text,
  time time ,
  contact_type text ,
  num_supported integer ,
  other_support text ,
  name text ,
  att_documents text ,
  outcomes text ,
  vv_worker text ,
  agreed_contact_time text,
  contact_details text
) ;

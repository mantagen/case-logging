
CREATE TABLE IF NOT EXISTS organisationContactLog (
organisation_contact_id serial primary key,
case_id integer ,
contact_name text ,
organisation_name text ,
area text ,
role text ,
contact_type text ,
permission boolean ,
  contact_reason text ,
  att_documents text ,
  vv_worker text ,
  agreed_contact_time text,
  contact_details text
) ;

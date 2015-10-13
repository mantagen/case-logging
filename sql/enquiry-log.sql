CREATE TABLE IF NOT EXISTS enqiryLog (
enqiry_log_id serial primary key,
case_id integer ,
  contact_source text ,
  enquiry_type text ,
  where_hear text ,
  first_name text ,
  last_name text ,
  organisation text ,
  role text ,
  postcode text ,
  phone text ,
  mobile text ,
  email text ,
  enquiry_details text ,
  action text ,
  att_documents text
) ;

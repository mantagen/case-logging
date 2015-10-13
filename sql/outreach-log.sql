
CREATE TABLE IF NOT EXISTS outreachLog (
outreach_log_id serial primary key,
case_id integer ,
goal text ,
main_contact text ,
role text ,
  date text,
 outreach_type text,
 outreach_group text,
  num_participants integer ,
  length_time text ,
  att_documents text ,
  follow_up text ,
  outcomes text ,
  vv_worker_1 text ,
  vv_worker_2 text ,
  vv_worker_3 text ,
  vv_worker_4 text ,
  vv_worker_5 text
) ;

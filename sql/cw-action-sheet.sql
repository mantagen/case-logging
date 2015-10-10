CREATE TABLE IF NOT EXISTS cwactionsheet (
    cw_action_id serial primary key,
    case_id integer ,
  action_date date,
  caseworker_name text ,
  issue text ,
  risk text ,
  goal text ,
  victims_state text ,
  action_type text ,
  action text,
  completed_date date,
  outcome text ,
  victims_state_vv text ,
  review text ,
  three_months text ,
  six_months text
) ;

create table if not exists tblusers(
   userid serial not null primary key ,
   username text unique,
   password text,
   firstname text,
   lastname text,
   role text,
   organisation text,
   address1 text,
   address2 text,
   town text,
   county text,
   postcode text,
   phone text,
   phone_alt text,
   email text,
   monday boolean,
   tuesday boolean,
   wednesday boolean,
   thursday boolean,
   friday boolean,
   saturday boolean,
   access_level text,
   access_cases boolean,
   access_contact_log boolean,
   access_action_log boolean,
   access_outreach_log boolean,
   access_interventions_log boolean,
   access_satisfaction_survey boolean,
   access_user_maintenance boolean,
   access_partners_log boolean,
   access_reports boolean,
   current_employee boolean,
   notes text
);
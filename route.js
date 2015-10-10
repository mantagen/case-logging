// vendor library
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

// custom library
// model
var Model = require('./model');

// index
var index = function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/signin');
    } else {

        var user = req.user;

        if (user !== undefined) {
            user = user.toJSON();
        }
        res.render('index', {
            title: 'Home',
            user: user
        });
    }
};


// sign in
// GET
var signIn = function(req, res, next) {
    if (req.isAuthenticated()) res.redirect('/');
    res.render('signin', {
        title: 'Sign In'
    });
};


// sign in
// POST
var signInPost = function(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/signin'
    }, function(err, user, info) {
        if (err) {
            return res.render('signin', {
                title: 'Sign In',
                errorMessage: err.message
            });
        }

        if (!user) {
            return res.render('signin', {
                title: 'Sign In',
                errorMessage: info.message
            });
        }
        return req.logIn(user, function(err) {
            if (err) {
                return res.render('signin', {
                    title: 'Sign In',
                    errorMessage: err.message
                });
            } else {
                return res.redirect('/');
            }
        });
    })(req, res, next);
};


// user search / delete
// GET
var signUp = function(req, res, next) {
    // if (!req.isAuthenticated()) {
    //     res.redirect('/signin');
    // }     else
    if (!isEmpty(req.query.searchBy)) {
        // if there's been an actual query! (if someone searches for user)
        var searchBy = req.query.searchBy;
        console.log(req.query.searchBy);
        if (searchBy === 'firstname') {
            logPromise = new Model.User()
                .where({
                    firstname: req.query.searchFor
                })
                .fetchAll()
                .then(function(aUser) {
                    res.json(aUser);
                    console.log(JSON.stringify(aUser));
                });
        }
        if (searchBy === 'lastname') {
            logPromise = new Model.User()
                .where({
                    lastname: req.query.searchFor
                })
                .fetchAll()
                .then(function(aUser) {
                    res.json(aUser);
                    console.log(JSON.stringify(aUser));
                });
        }
        if (searchBy === 'role') {
            logPromise = new Model.User()
                .where({
                    role: req.query.searchFor
                })
                .fetchAll()
                .then(function(aUser) {
                    res.json(aUser);
                    console.log(JSON.stringify(aUser));
                });
        }
        if (searchBy === 'organisation') {
            logPromise = new Model.User()
                .where({
                    organisation: req.query.searchFor
                })
                .fetchAll()
                .then(function(aUser) {
                    res.json(aUser);
                    console.log(JSON.stringify(aUser));
                });
        }

    } else if (!isEmpty(req.query.deleteId)) {
        // if there's been an actual query! (if someone searches for user)
        var deleteId = req.query.deleteId;
        var userToDelete = new Model.User({
                userId: deleteId
            })
            .destroy()
            .then(function(model) {
                // clear input fields here
            });
    } else {
        res.render('usermaintenance', {
            title: 'User maintenance'
        });
    }
};

// user edit / create
// POST
var signUpPost = function(req, res, next) {
    var user = req.body;
    var usernamePromise = null;
    usernamePromise = new Model.User({
        username: user.username
    }).fetch();

    return usernamePromise.then(function(model) {
        if (model) {
            // if the username exists, then update the user in the db
            console.log('newname', user.notes);

            model.save({
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role,
                organisation: user.organisation,
                address1: user.address1,
                address2: user.address2,
                town: user.town,
                county: user.county,
                phone: user.phone,
                phone_alt: user.phonealt,
                email: user.email,
                monday: user.monday,
                tuesday: user.tuesday,
                wednesday: user.wednesday,
                thursday: user.thursday,
                friday: user.friday,
                saturday: user.saturday,
                access_level: user.accesslevel,
                access_cases: user.accesscases,
                access_contact_log: user.accesscontactlog,
                access_action_log: user.accessactionlog,
                access_outreach_log: user.accessoutreachlog,
                access_interventions_log: user.accessinterventionslog,
                access_satisfaction_survey: user.accesssatisfactionsurvey,
                access_user_maintenance: user.accessusermaintenance,
                access_partners_log: user.accesspartnerslog,
                access_reports: user.accessreports,
                current_employee: user.currentemployee,
                notes: user.notes
            }).then(function(model) {
                // sign in the newly registered user
                console.log('saved');
            });
            res.render('usermaintenance', {
                title: 'User maintenance'
            });
        } else {
            //****************************************************//
            // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
            //****************************************************//
            var password = user.password;
            var hash = bcrypt.hashSync(password);
            var newUsername = user.firstname + '.' + user.lastname;
            var signUpUser = new Model.User({
                username: newUsername,
                password: hash,
                firstname: user.firstname,
                lastname: user.lastname,
                //role: user.role,
                organisation: user.organisation,
                address1: user.address1,
                address2: user.address2,
                town: user.town,
                county: user.county,
                phone: user.phone,
                phone_alt: user.phonealt
            });

            signUpUser.save().then(function(model) {
                // sign in the newly registered user
                signInPost(req, res, next);
            });
        }
    });
};



function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0) return false;
    if (obj.length === 0) return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and toValue enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
// case maintenance
// GET

var newCasePost = function(req, res, next) {
    var user = req.body;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var thisCase;
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    var thisDate = user.referraldate || today;
    console.log('input date === ', user.referraldate, '\n thisDate ===', thisDate, '\n thisCaseId ===', user.caseid);

    if (user.caseid) {
        thisCase = new Model.Cases({
            case_id: user.caseid,
            log_number: user.lognumber,
            referral_date: thisDate,
            log_type: user.logtype,
            report_taken_by: user.reporttakenby,
            assigned_to: user.assignedto,
            //assigned_date: user.assigneddate,
            referral_type: user.referraltype,
            ref_organisation: user.reforganisation,
            ref_first_name: user.reffirstname,
            ref_last_name: user.reflastname,
            ref_role: user.refrole,
            ref_victim_aware: user.refvictimaware,
            ref_add_1: user.refadd1,
            ref_add_2: user.refadd2,
            ref_town: user.reftown,
            ref_post_code: user.refpostcode,
            ref_tel: user.reftel,
            ref_mob: user.refmob,
            ref_email: user.refemail,
            ref_best_time: user.refbesttime,
            ref_preferred_contact: user.refpreferredcontact,
            ref_referrer: user.refreferrer,
            ref_feedback: user.reffeedback,
            ref_permission: user.refpermmision,
            ref_other_info: user.refotherinfo,
            flags: user.flags,
            flags2: user.flags2,
            flags3: user.flags3,
            flags4: user.flags4,
            flags5: user.flags5,
            vic_first_name: user.vicfirstname,
            vic_last_name: user.viclastname,
            vic_title: user.victitle,
            //vic_dob: user.vicdob,
            vic_gender: user.vicgender,
            vic_ethnic: user.vicethic,
            vic_nationality: user.vicnationality,
            vic_sexuality: user.vicsexuality,
            vic_rorb: user.vicrorb,
            vic_gender_id: user.vicgenderid,
            vic_age: user.vicage,
            vic_add_1: user.vicadd1,
            vic_add_2: user.vicadd2,
            vic_town: user.victown,
            vic_post_code: user.vicpostcode,
            vic_tenure: user.victenure,
            vic_tel: user.victel,
            vic_mob: user.vicmob,
            vic_email: user.vicemail,
            vic_best_time: user.vicbesttime,
            vic_preferred_contact: user.vicpreferredcontact,
            vic_pets: user.vicpets,
            vic_ward: user.vicward,
            vic_other_info: user.vicotherinfo,
            vic_disabilities: user.vicdisabilities,
            cohab_title: user.cohabtitle,
            cohab_first_name: user.cohabfirstname,
            cohab_last_name: user.cohablastname,
            //cohab_dob: user.cohabdob,
            cohab_relationship: user.cohabrelationship,
            cohab2_title: user.cohab2title,
            cohab2_first_name: user.cohab2firstname,
            cohab2_last_name: user.cohab2lastname,
            //cohab2_dob: user.cohab2dob,
            cohab2_relationship: user.cohab2relationship,
            cohab3_title: user.cohab3title,
            cohab3_first_name: user.cohab3firstname,
            cohab3_last_name: user.cohab3lastname,
            //cohab3_dob: user.cohab3dob,
            cohab3_relationship: user.cohab3relationship,
            cohab4_title: user.cohab4title,
            cohab4_first_name: user.cohab4firstname,
            cohab4_last_name: user.cohab4lastname,
            //cohab4_dob: user.cohab4dob,
            cohab4_relationship: user.cohab4relationship,
            cohab5_title: user.cohab5title,
            cohab5_first_name: user.cohab5firstname,
            cohab5_last_name: user.cohab5lastname,
            //cohab5_dob: user.cohab5dob,
            cohab5_relationship: user.cohab5relationship,
            othersupport_permission: user.othersupportpermission,
            othersupport_organisation: user.othersupportorgansation,
            othersupport_title: user.othersupporttitle,
            othersupport_first_name: user.othersupportfirstname,
            othersupport_last_name: user.othersupportlastname,
            othersupport_add_1: user.othersupportadd1,
            othersupport_add_2: user.othersupportadd2,
            othersupport_town: user.othersupporttown,
            othersupport_post_code: user.othersupportpostcode,
            othersupport_tel: user.othersupporttel,
            othersupport_mob: user.othersupportmob,
            othersupport_email: user.othersupportemail,
            othersupport_preferred_contact: user.othersupportpreferredcontact,
            othersupport_best_time: user.othersupportbesttime,
            othersupport_relationship: user.othersupportrelationship,
            othersupport2_permission: user.othersupport2permission,
            othersupport2_organisation: user.othersupport2organsation,
            othersupport2_title: user.othersupport2title,
            othersupport2_first_name: user.othersupport2firstname,
            othersupport2_last_name: user.othersupport2lastname,
            othersupport2_add_1: user.othersupport2add1,
            othersupport2_add_2: user.othersupport2add2,
            othersupport2_town: user.othersupport2town,
            othersupport2_post_code: user.othersupport2postcode,
            othersupport2_tel: user.othersupport2tel,
            othersupport2_mob: user.othersupport2mob,
            othersupport2_email: user.othersupport2email,
            othersupport2_preferred_contact: user.othersupport2preferredcontact,
            othersupport2_best_time: user.othersupport2besttime,
            othersupport2_relationship: user.othersupport2relationship,
            othersupport3_permission: user.othersupport3permission,
            othersupport3_organisation: user.othersupport3organsation,
            othersupport3_title: user.othersupport3title,
            othersupport3_first_name: user.othersupport3firstname,
            othersupport3_last_name: user.othersupport3lastname,
            othersupport3_add_1: user.othersupport3add1,
            othersupport3_add_2: user.othersupport3add2,
            othersupport3_town: user.othersupport3town,
            othersupport3_post_code: user.othersupport3postcode,
            othersupport3_tel: user.othersupport3tel,
            othersupport3_mob: user.othersupport3mob,
            othersupport3_email: user.othersupport3email,
            othersupport3_preferred_contact: user.othersupport3preferredcontact,
            othersupport3_best_time: user.othersupport3besttime,
            othersupport3_relationship: user.othersupport3relationship,
            incident_po_reported: user.incidentporeported,
            incident_po_wanted: user.incdentpowanted,
            incident_po_log_no: user.incidentpologno,
            //incident_po_date: user.indentpodate,
            incident_po_badge: user.incidentpobadge,
            incident_po_name: user.incidentponame,
            //incident_date: user.incidentdate,
            incident_time: user.incidenttime,
            incident_town: user.incidenttown,
            incident_type: user.incidenttype,
            incident_space: user.incidentspace,
            incident_form: user.incidentform,
            incident_add_1: user.incidentadd1,
            incident_add_2: user.incidentadd2,
            incident_post_code: user.incidentpostcode,
            incident_how_affected: user.incidenthowaffected,
            incident_trans: user.incidenttrans,
            incident_trans_town: user.incidenttranstown,
            incident_trans_type: user.incidenttranstype,
            incident_trans_service_number: user.incidenttransservicenumber,
            incident_trans_from: user.incidenttransfrom,
            incident_trans_to: user.incidenttransto,
            incident_desc: user.incidentdesc,
            incident_injury: user.incidentinjury,
            incident_injury_details: user.incidentinjurydetails,
            incident_witness: user.incidentwitness,
            incident_witness_detail: user.incidentwitnessdetail,
            incident_property: user.incidentproperty,
            incident_property_detail: user.incidentpropertydetail,
            incident_cctv: user.incidentcctv,
            incident_cctv_detail: user.incidentcctvdetail,
            offender_no: user.offenderno,
            offender_known: user.offenderknown,
            offender_influ: user.offenderinflu,
            offender_first_name: user.offenderfirstname,
            offender_last_name: user.offenderlastname,
            offender_title: user.offendertitle,
            offender_age: user.offenderage,
            offender_gender: user.offendergender,
            offender_ethnic: user.offenderethnic,
            offender_add_1: user.offenderadd1,
            offender_add_2: user.offenderadd2,
            offender_town: user.offendertown,
            offender_post_code: user.offenderpostcode,
            offender_tel: user.offendertel,
            offender_mob: user.offendermob,
            offender_email: user.offenderemail,
            offender_description: user.offenderdescription,
            offender2_first_name: user.offender2firstname,
            offender2_last_name: user.offender2lastname,
            offender2_title: user.offender2title,
            offender2_age: user.offender2age,
            offender2_gender: user.offender2gender,
            offender2_ethnic: user.offender2ethnic,
            offender2_add_1: user.offender2add1,
            offender2_add_2: user.offender2add2,
            offender2_town: user.offender2town,
            offender2_post_code: user.offender2postcode,
            offender2_tel: user.offender2tel,
            offender2_mob: user.offender2mob,
            offender2_email: user.offender2email,
            offender2_description: user.offender2description,
            offender3_first_name: user.offender3firstname,
            offender3_last_name: user.offender3lastname,
            offender3_title: user.offender3title,
            offender3_age: user.offender3age,
            offender3_gender: user.offender3gender,
            offender3_ethnic: user.offender3ethnic,
            offender3_add_1: user.offender3add1,
            offender3_add_2: user.offender3add2,
            offender3_town: user.offender3town,
            offender3_post_code: user.offender3postcode,
            offender3_tel: user.offender3tel,
            offender3_mob: user.offender3mob,
            offender3_email: user.offender3email,
            offender3_description: user.offender3description,
            offender4_first_name: user.offender4firstname,
            offender4_last_name: user.offender4lastname,
            offender4_title: user.offender4title,
            offender4_age: user.offender4age,
            offender4_gender: user.offender4gender,
            offender4_ethnic: user.offender4ethnic,
            offender4_add_1: user.offender4add1,
            offender4_add_2: user.offender4add2,
            offender4_town: user.offender4town,
            offender4_post_code: user.offender4postcode,
            offender4_tel: user.offender4tel,
            offender4_mob: user.offender4mob,
            offender4_email: user.offender4email,
            offender4_description: user.offender4description,
            offender5_first_name: user.offender5firstname,
            offender5_last_name: user.offender5lastname,
            offender5_title: user.offender5title,
            offender5_age: user.offender5age,
            offender5_gender: user.offender5gender,
            offender5_ethnic: user.offender5ethnic,
            offender5_add_1: user.offender5add1,
            offender5_add_2: user.offender5add2,
            offender5_town: user.offender5town,
            offender5_post_code: user.offender5postcode,
            offender5_tel: user.offender5tel,
            offender5_mob: user.offender5mob,
            offender5_email: user.offender5email,
            offender5_description: user.offender5description,
            offender_vehicle_make: user.offendervehiclemake,
            offender_vehicle_model: user.offendervehiclemodel,
            offender_vehicle_colour: user.offendervehiclecolour,
            offender_vehicle_reg: user.offendervehiclereg,
            others_affected: user.othersaffected,
            others_title: user.otherstitle,
            others_first_name: user.othersfirstname,
            others_last_name: user.otherslastname,
            //others_dob: user.othersdob,
            others_age: user.othersage,
            others_gender: user.othersgender,
            others_ethnic: user.othersethnic,
            others_disability: user.othersdisability,
            others_religion: user.othersreligion,
            others_trans: user.otherstrans,
            others_sexuality: user.otherssexuality,
            others_nationality: user.othersnationality,
            others_add_1: user.othersadd1,
            others_add_2: user.othersadd2,
            others_town: user.otherstown,
            others_post_code: user.otherspostcode,
            others_tel: user.otherstel,
            others_mob: user.othersmob,
            others_relationship: user.othersrelationship,
            others_school: user.othersschool,
            others_org: user.othersorg,
            others_org_name: user.othersorgname,
            others_org_first_name: user.othersorgfirstname,
            others_org_last_name: user.othersorglastname,
            others_org_role: user.othersorgrole,
            others_org_title: user.othersorgtitle,
            others_org_email: user.othersorgemail,
            others_org_add_1: user.othersorgadd1,
            others_org_add_2: user.othersorgadd2,
            others_org_town: user.othersorgtown,
            others_org_post_code: user.othersorgpostcode,
            others_org_tel: user.othersorgtel,
            others_org_mob: user.othersorgmob,
            others_org_best_time: user.othersorgbesttime,
            others_org_preferred_contact: user.othersorgpreferredcontact,
            others_org_feedback: user.othersorgfeedback,
            others_org_info: user.othersorginfo,
            others_org_permission: user.othersorgpermission,
            others2_title: user.others2title,
            others2_first_name: user.others2firstname,
            others2_last_name: user.others2lastname,
            //others2_dob: user.others2dob,
            others2_age: user.others2age,
            others2_gender: user.others2gender,
            others2_ethnic: user.others2ethnic,
            others2_disability: user.others2disability,
            others2_religion: user.others2religion,
            others2_trans: user.others2trans,
            others2_sexuality: user.others2sexuality,
            others2_nationality: user.others2nationality,
            others2_add_1: user.others2add1,
            others2_add_2: user.others2add2,
            others2_town: user.others2town,
            others2_post_code: user.others2postcode,
            others2_tel: user.others2tel,
            others2_mob: user.others2mob,
            others2_relationship: user.others2relationship,
            others2_school: user.others2school,
            others2_org_name: user.others2orgname,
            others2_org_first_name: user.others2orgfirstname,
            others2_org_last_name: user.others2orglastname,
            others2_org_role: user.others2orgrole,
            others2_org_title: user.others2orgtitle,
            others2_org_email: user.others2orgemail,
            others2_org_add_1: user.others2orgadd1,
            others2_org_add_2: user.others2orgadd2,
            others2_org_town: user.others2orgtown,
            others2_org_post_code: user.others2orgpostcode,
            others2_org_tel: user.others2orgtel,
            others2_org_mob: user.others2orgmob,
            others2_org_best_time: user.others2orgbesttime,
            others2_org_preferred_contact: user.others2orgpreferredcontact,
            others2_org_feedback: user.others2orgfeedback,
            others2_org_info: user.others2orginfo,
            others2_org_permission: user.others2orgpermission,
            others3_title: user.others3title,
            others3_first_name: user.others3firstname,
            others3_last_name: user.others3lastname,
            //others3_dob: user.others3dob,
            others3_age: user.others3age,
            others3_gender: user.others3gender,
            others3_ethnic: user.others3ethnic,
            others3_disability: user.others3disability,
            others3_religion: user.others3religion,
            others3_trans: user.others3trans,
            others3_sexuality: user.others3sexuality,
            others3_nationality: user.others3nationality,
            others3_add_1: user.others3add1,
            others3_add_2: user.others3add2,
            others3_town: user.others3town,
            others3_post_code: user.others3postcode,
            others3_tel: user.others3tel,
            others3_mob: user.others3mob,
            others3_relationship: user.others3relationship,
            others3_school: user.others3school,
            others3_org_name: user.others3orgname,
            others3_org_first_name: user.others3orgfirstname,
            others3_org_last_name: user.others3orglastname,
            others3_org_role: user.others3orgrole,
            others3_org_title: user.others3orgtitle,
            others3_org_email: user.others3orgemail,
            others3_org_add_1: user.others3orgadd1,
            others3_org_add_2: user.others3orgadd2,
            others3_org_town: user.others3orgtown,
            others3_org_post_code: user.others3orgpostcode,
            others3_org_tel: user.others3orgtel,
            others3_org_mob: user.others3orgmob,
            others3_org_best_time: user.others3orgbesttime,
            others3_org_preferred_contact: user.others3orgpreferredcontact,
            others3_org_feedback: user.others3orgfeedback,
            others3_org_info: user.others3orginfo,
            others3_org_permission: user.others3orgpermission,
            others4_title: user.others4title,
            others4_first_name: user.others4firstname,
            others4_last_name: user.others4lastname,
            //others4_dob: user.others4dob,
            others4_age: user.others4age,
            others4_gender: user.others4gender,
            others4_ethnic: user.others4ethnic,
            others4_disability: user.others4disability,
            others4_religion: user.others4religion,
            others4_trans: user.others4trans,
            others4_sexuality: user.others4sexuality,
            others4_nationality: user.others4nationality,
            others4_add_1: user.others4add1,
            others4_add_2: user.others4add2,
            others4_town: user.others4town,
            others4_post_code: user.others4postcode,
            others4_tel: user.others4tel,
            others4_mob: user.others4mob,
            others4_relationship: user.others4relationship,
            others4_school: user.others4school,
            others4_org_name: user.others4orgname,
            others4_org_first_name: user.others4orgfirstname,
            others4_org_last_name: user.others4orglastname,
            others4_org_role: user.others4orgrole,
            others4_org_title: user.others4orgtitle,
            others4_org_email: user.others4orgemail,
            others4_org_add_1: user.others4orgadd1,
            others4_org_add_2: user.others4orgadd2,
            others4_org_town: user.others4orgtown,
            others4_org_post_code: user.others4orgpostcode,
            others4_org_tel: user.others4orgtel,
            others4_org_mob: user.others4orgmob,
            others4_org_best_time: user.others4orgbesttime,
            others4_org_preferred_contact: user.others4orgpreferredcontact,
            others4_org_feedback: user.others4orgfeedback,
            others4_org_info: user.others4orginfo,
            others4_org_permission: user.others4orgpermission,
            others5_title: user.others5title,
            others5_first_name: user.others5firstname,
            others5_last_name: user.others5lastname,
            //others5_dob: user.others5dob,
            others5_age: user.others5age,
            others5_gender: user.others5gender,
            others5_ethnic: user.others5ethnic,
            others5_disability: user.others5disability,
            others5_religion: user.others5religion,
            others5_trans: user.others5trans,
            others5_sexuality: user.others5sexuality,
            others5_nationality: user.others5nationality,
            others5_add_1: user.others5add1,
            others5_add_2: user.others5add2,
            others5_town: user.others5town,
            others5_post_code: user.others5postcode,
            others5_tel: user.others5tel,
            others5_mob: user.others5mob,
            others5_relationship: user.others5relationship,
            others5_school: user.others5school,
            others5_org_name: user.others5orgname,
            others5_org_first_name: user.others5orgfirstname,
            others5_org_last_name: user.others5orglastname,
            others5_org_role: user.others5orgrole,
            others5_org_title: user.others5orgtitle,
            others5_org_email: user.others5orgemail,
            others5_org_add_1: user.others5orgadd1,
            others5_org_add_2: user.others5orgadd2,
            others5_org_town: user.others5orgtown,
            others5_org_post_code: user.others5orgpostcode,
            others5_org_tel: user.others5orgtel,
            others5_org_mob: user.others5orgmob,
            others5_org_best_time: user.others5orgbesttime,
            others5_org_preferred_contact: user.others5orgpreferredcontact,
            others5_org_feedback: user.others5orgfeedback,
            others5_org_info: user.others5orginfo,
            others5_org_permission: user.others5orgpermission,
            general_similar_before: user.generalsimilarbefore,
            general_similar_details: user.generalsimilardetails,
            general_desired_outcome: user.generaldesiredoutcome,
            general_support_needs: user.generalsupportneeds
        });
    } else {
        thisCase = new Model.Cases({
            log_number: user.lognumber,
            referral_date: thisDate,
            log_type: user.logtype,
            report_taken_by: user.reporttakenby,
            assigned_to: user.assignedto,
            //assigned_date: user.assigneddate,
            referral_type: user.referraltype,
            ref_organisation: user.reforganisation,
            ref_first_name: user.reffirstname,
            ref_last_name: user.reflastname,
            ref_role: user.refrole,
            ref_victim_aware: user.refvictimaware,
            ref_add_1: user.refadd1,
            ref_add_2: user.refadd2,
            ref_town: user.reftown,
            ref_post_code: user.refpostcode,
            ref_tel: user.reftel,
            ref_mob: user.refmob,
            ref_email: user.refemail,
            ref_best_time: user.refbesttime,
            ref_preferred_contact: user.refpreferredcontact,
            ref_referrer: user.refreferrer,
            ref_feedback: user.reffeedback,
            ref_permission: user.refpermmision,
            ref_other_info: user.refotherinfo,
            flags: user.flags,
            flags2: user.flags2,
            flags3: user.flags3,
            flags4: user.flags4,
            flags5: user.flags5,
            vic_first_name: user.vicfirstname,
            vic_last_name: user.viclastname,
            vic_title: user.victitle,
            //vic_dob: user.vicdob,
            vic_gender: user.vicgender,
            vic_ethnic: user.vicethic,
            vic_nationality: user.vicnationality,
            vic_sexuality: user.vicsexuality,
            vic_rorb: user.vicrorb,
            vic_gender_id: user.vicgenderid,
            vic_age: user.vicage,
            vic_add_1: user.vicadd1,
            vic_add_2: user.vicadd2,
            vic_town: user.victown,
            vic_post_code: user.vicpostcode,
            vic_tenure: user.victenure,
            vic_tel: user.victel,
            vic_mob: user.vicmob,
            vic_email: user.vicemail,
            vic_best_time: user.vicbesttime,
            vic_preferred_contact: user.vicpreferredcontact,
            vic_pets: user.vicpets,
            vic_ward: user.vicward,
            vic_other_info: user.vicotherinfo,
            vic_disabilities: user.vicdisabilities,
            cohab_title: user.cohabtitle,
            cohab_first_name: user.cohabfirstname,
            cohab_last_name: user.cohablastname,
            //cohab_dob: user.cohabdob,
            cohab_relationship: user.cohabrelationship,
            cohab2_title: user.cohab2title,
            cohab2_first_name: user.cohab2firstname,
            cohab2_last_name: user.cohab2lastname,
            //cohab2_dob: user.cohab2dob,
            cohab2_relationship: user.cohab2relationship,
            cohab3_title: user.cohab3title,
            cohab3_first_name: user.cohab3firstname,
            cohab3_last_name: user.cohab3lastname,
            //cohab3_dob: user.cohab3dob,
            cohab3_relationship: user.cohab3relationship,
            cohab4_title: user.cohab4title,
            cohab4_first_name: user.cohab4firstname,
            cohab4_last_name: user.cohab4lastname,
            //cohab4_dob: user.cohab4dob,
            cohab4_relationship: user.cohab4relationship,
            cohab5_title: user.cohab5title,
            cohab5_first_name: user.cohab5firstname,
            cohab5_last_name: user.cohab5lastname,
            //cohab5_dob: user.cohab5dob,
            cohab5_relationship: user.cohab5relationship,
            othersupport_permission: user.othersupportpermission,
            othersupport_organisation: user.othersupportorgansation,
            othersupport_title: user.othersupporttitle,
            othersupport_first_name: user.othersupportfirstname,
            othersupport_last_name: user.othersupportlastname,
            othersupport_add_1: user.othersupportadd1,
            othersupport_add_2: user.othersupportadd2,
            othersupport_town: user.othersupporttown,
            othersupport_post_code: user.othersupportpostcode,
            othersupport_tel: user.othersupporttel,
            othersupport_mob: user.othersupportmob,
            othersupport_email: user.othersupportemail,
            othersupport_preferred_contact: user.othersupportpreferredcontact,
            othersupport_best_time: user.othersupportbesttime,
            othersupport_relationship: user.othersupportrelationship,
            othersupport2_permission: user.othersupport2permission,
            othersupport2_organisation: user.othersupport2organsation,
            othersupport2_title: user.othersupport2title,
            othersupport2_first_name: user.othersupport2firstname,
            othersupport2_last_name: user.othersupport2lastname,
            othersupport2_add_1: user.othersupport2add1,
            othersupport2_add_2: user.othersupport2add2,
            othersupport2_town: user.othersupport2town,
            othersupport2_post_code: user.othersupport2postcode,
            othersupport2_tel: user.othersupport2tel,
            othersupport2_mob: user.othersupport2mob,
            othersupport2_email: user.othersupport2email,
            othersupport2_preferred_contact: user.othersupport2preferredcontact,
            othersupport2_best_time: user.othersupport2besttime,
            othersupport2_relationship: user.othersupport2relationship,
            othersupport3_permission: user.othersupport3permission,
            othersupport3_organisation: user.othersupport3organsation,
            othersupport3_title: user.othersupport3title,
            othersupport3_first_name: user.othersupport3firstname,
            othersupport3_last_name: user.othersupport3lastname,
            othersupport3_add_1: user.othersupport3add1,
            othersupport3_add_2: user.othersupport3add2,
            othersupport3_town: user.othersupport3town,
            othersupport3_post_code: user.othersupport3postcode,
            othersupport3_tel: user.othersupport3tel,
            othersupport3_mob: user.othersupport3mob,
            othersupport3_email: user.othersupport3email,
            othersupport3_preferred_contact: user.othersupport3preferredcontact,
            othersupport3_best_time: user.othersupport3besttime,
            othersupport3_relationship: user.othersupport3relationship,
            incident_po_reported: user.incidentporeported,
            incident_po_wanted: user.incdentpowanted,
            incident_po_log_no: user.incidentpologno,
            //incident_po_date: user.indentpodate,
            incident_po_badge: user.incidentpobadge,
            incident_po_name: user.incidentponame,
            //incident_date: user.incidentdate,
            incident_time: user.incidenttime,
            incident_town: user.incidenttown,
            incident_type: user.incidenttype,
            incident_space: user.incidentspace,
            incident_form: user.incidentform,
            incident_add_1: user.incidentadd1,
            incident_add_2: user.incidentadd2,
            incident_post_code: user.incidentpostcode,
            incident_how_affected: user.incidenthowaffected,
            incident_trans: user.incidenttrans,
            incident_trans_town: user.incidenttranstown,
            incident_trans_type: user.incidenttranstype,
            incident_trans_service_number: user.incidenttransservicenumber,
            incident_trans_from: user.incidenttransfrom,
            incident_trans_to: user.incidenttransto,
            incident_desc: user.incidentdesc,
            incident_injury: user.incidentinjury,
            incident_injury_details: user.incidentinjurydetails,
            incident_witness: user.incidentwitness,
            incident_witness_detail: user.incidentwitnessdetail,
            incident_property: user.incidentproperty,
            incident_property_detail: user.incidentpropertydetail,
            incident_cctv: user.incidentcctv,
            incident_cctv_detail: user.incidentcctvdetail,
            offender_no: user.offenderno,
            offender_known: user.offenderknown,
            offender_influ: user.offenderinflu,
            offender_first_name: user.offenderfirstname,
            offender_last_name: user.offenderlastname,
            offender_title: user.offendertitle,
            offender_age: user.offenderage,
            offender_gender: user.offendergender,
            offender_ethnic: user.offenderethnic,
            offender_add_1: user.offenderadd1,
            offender_add_2: user.offenderadd2,
            offender_town: user.offendertown,
            offender_post_code: user.offenderpostcode,
            offender_tel: user.offendertel,
            offender_mob: user.offendermob,
            offender_email: user.offenderemail,
            offender_description: user.offenderdescription,
            offender2_first_name: user.offender2firstname,
            offender2_last_name: user.offender2lastname,
            offender2_title: user.offender2title,
            offender2_age: user.offender2age,
            offender2_gender: user.offender2gender,
            offender2_ethnic: user.offender2ethnic,
            offender2_add_1: user.offender2add1,
            offender2_add_2: user.offender2add2,
            offender2_town: user.offender2town,
            offender2_post_code: user.offender2postcode,
            offender2_tel: user.offender2tel,
            offender2_mob: user.offender2mob,
            offender2_email: user.offender2email,
            offender2_description: user.offender2description,
            offender3_first_name: user.offender3firstname,
            offender3_last_name: user.offender3lastname,
            offender3_title: user.offender3title,
            offender3_age: user.offender3age,
            offender3_gender: user.offender3gender,
            offender3_ethnic: user.offender3ethnic,
            offender3_add_1: user.offender3add1,
            offender3_add_2: user.offender3add2,
            offender3_town: user.offender3town,
            offender3_post_code: user.offender3postcode,
            offender3_tel: user.offender3tel,
            offender3_mob: user.offender3mob,
            offender3_email: user.offender3email,
            offender3_description: user.offender3description,
            offender4_first_name: user.offender4firstname,
            offender4_last_name: user.offender4lastname,
            offender4_title: user.offender4title,
            offender4_age: user.offender4age,
            offender4_gender: user.offender4gender,
            offender4_ethnic: user.offender4ethnic,
            offender4_add_1: user.offender4add1,
            offender4_add_2: user.offender4add2,
            offender4_town: user.offender4town,
            offender4_post_code: user.offender4postcode,
            offender4_tel: user.offender4tel,
            offender4_mob: user.offender4mob,
            offender4_email: user.offender4email,
            offender4_description: user.offender4description,
            offender5_first_name: user.offender5firstname,
            offender5_last_name: user.offender5lastname,
            offender5_title: user.offender5title,
            offender5_age: user.offender5age,
            offender5_gender: user.offender5gender,
            offender5_ethnic: user.offender5ethnic,
            offender5_add_1: user.offender5add1,
            offender5_add_2: user.offender5add2,
            offender5_town: user.offender5town,
            offender5_post_code: user.offender5postcode,
            offender5_tel: user.offender5tel,
            offender5_mob: user.offender5mob,
            offender5_email: user.offender5email,
            offender5_description: user.offender5description,
            offender_vehicle_make: user.offendervehiclemake,
            offender_vehicle_model: user.offendervehiclemodel,
            offender_vehicle_colour: user.offendervehiclecolour,
            offender_vehicle_reg: user.offendervehiclereg,
            others_affected: user.othersaffected,
            others_title: user.otherstitle,
            others_first_name: user.othersfirstname,
            others_last_name: user.otherslastname,
            //others_dob: user.othersdob,
            others_age: user.othersage,
            others_gender: user.othersgender,
            others_ethnic: user.othersethnic,
            others_disability: user.othersdisability,
            others_religion: user.othersreligion,
            others_trans: user.otherstrans,
            others_sexuality: user.otherssexuality,
            others_nationality: user.othersnationality,
            others_add_1: user.othersadd1,
            others_add_2: user.othersadd2,
            others_town: user.otherstown,
            others_post_code: user.otherspostcode,
            others_tel: user.otherstel,
            others_mob: user.othersmob,
            others_relationship: user.othersrelationship,
            others_school: user.othersschool,
            others_org: user.othersorg,
            others_org_name: user.othersorgname,
            others_org_first_name: user.othersorgfirstname,
            others_org_last_name: user.othersorglastname,
            others_org_role: user.othersorgrole,
            others_org_title: user.othersorgtitle,
            others_org_email: user.othersorgemail,
            others_org_add_1: user.othersorgadd1,
            others_org_add_2: user.othersorgadd2,
            others_org_town: user.othersorgtown,
            others_org_post_code: user.othersorgpostcode,
            others_org_tel: user.othersorgtel,
            others_org_mob: user.othersorgmob,
            others_org_best_time: user.othersorgbesttime,
            others_org_preferred_contact: user.othersorgpreferredcontact,
            others_org_feedback: user.othersorgfeedback,
            others_org_info: user.othersorginfo,
            others_org_permission: user.othersorgpermission,
            others2_title: user.others2title,
            others2_first_name: user.others2firstname,
            others2_last_name: user.others2lastname,
            //others2_dob: user.others2dob,
            others2_age: user.others2age,
            others2_gender: user.others2gender,
            others2_ethnic: user.others2ethnic,
            others2_disability: user.others2disability,
            others2_religion: user.others2religion,
            others2_trans: user.others2trans,
            others2_sexuality: user.others2sexuality,
            others2_nationality: user.others2nationality,
            others2_add_1: user.others2add1,
            others2_add_2: user.others2add2,
            others2_town: user.others2town,
            others2_post_code: user.others2postcode,
            others2_tel: user.others2tel,
            others2_mob: user.others2mob,
            others2_relationship: user.others2relationship,
            others2_school: user.others2school,
            others2_org_name: user.others2orgname,
            others2_org_first_name: user.others2orgfirstname,
            others2_org_last_name: user.others2orglastname,
            others2_org_role: user.others2orgrole,
            others2_org_title: user.others2orgtitle,
            others2_org_email: user.others2orgemail,
            others2_org_add_1: user.others2orgadd1,
            others2_org_add_2: user.others2orgadd2,
            others2_org_town: user.others2orgtown,
            others2_org_post_code: user.others2orgpostcode,
            others2_org_tel: user.others2orgtel,
            others2_org_mob: user.others2orgmob,
            others2_org_best_time: user.others2orgbesttime,
            others2_org_preferred_contact: user.others2orgpreferredcontact,
            others2_org_feedback: user.others2orgfeedback,
            others2_org_info: user.others2orginfo,
            others2_org_permission: user.others2orgpermission,
            others3_title: user.others3title,
            others3_first_name: user.others3firstname,
            others3_last_name: user.others3lastname,
            //others3_dob: user.others3dob,
            others3_age: user.others3age,
            others3_gender: user.others3gender,
            others3_ethnic: user.others3ethnic,
            others3_disability: user.others3disability,
            others3_religion: user.others3religion,
            others3_trans: user.others3trans,
            others3_sexuality: user.others3sexuality,
            others3_nationality: user.others3nationality,
            others3_add_1: user.others3add1,
            others3_add_2: user.others3add2,
            others3_town: user.others3town,
            others3_post_code: user.others3postcode,
            others3_tel: user.others3tel,
            others3_mob: user.others3mob,
            others3_relationship: user.others3relationship,
            others3_school: user.others3school,
            others3_org_name: user.others3orgname,
            others3_org_first_name: user.others3orgfirstname,
            others3_org_last_name: user.others3orglastname,
            others3_org_role: user.others3orgrole,
            others3_org_title: user.others3orgtitle,
            others3_org_email: user.others3orgemail,
            others3_org_add_1: user.others3orgadd1,
            others3_org_add_2: user.others3orgadd2,
            others3_org_town: user.others3orgtown,
            others3_org_post_code: user.others3orgpostcode,
            others3_org_tel: user.others3orgtel,
            others3_org_mob: user.others3orgmob,
            others3_org_best_time: user.others3orgbesttime,
            others3_org_preferred_contact: user.others3orgpreferredcontact,
            others3_org_feedback: user.others3orgfeedback,
            others3_org_info: user.others3orginfo,
            others3_org_permission: user.others3orgpermission,
            others4_title: user.others4title,
            others4_first_name: user.others4firstname,
            others4_last_name: user.others4lastname,
            //others4_dob: user.others4dob,
            others4_age: user.others4age,
            others4_gender: user.others4gender,
            others4_ethnic: user.others4ethnic,
            others4_disability: user.others4disability,
            others4_religion: user.others4religion,
            others4_trans: user.others4trans,
            others4_sexuality: user.others4sexuality,
            others4_nationality: user.others4nationality,
            others4_add_1: user.others4add1,
            others4_add_2: user.others4add2,
            others4_town: user.others4town,
            others4_post_code: user.others4postcode,
            others4_tel: user.others4tel,
            others4_mob: user.others4mob,
            others4_relationship: user.others4relationship,
            others4_school: user.others4school,
            others4_org_name: user.others4orgname,
            others4_org_first_name: user.others4orgfirstname,
            others4_org_last_name: user.others4orglastname,
            others4_org_role: user.others4orgrole,
            others4_org_title: user.others4orgtitle,
            others4_org_email: user.others4orgemail,
            others4_org_add_1: user.others4orgadd1,
            others4_org_add_2: user.others4orgadd2,
            others4_org_town: user.others4orgtown,
            others4_org_post_code: user.others4orgpostcode,
            others4_org_tel: user.others4orgtel,
            others4_org_mob: user.others4orgmob,
            others4_org_best_time: user.others4orgbesttime,
            others4_org_preferred_contact: user.others4orgpreferredcontact,
            others4_org_feedback: user.others4orgfeedback,
            others4_org_info: user.others4orginfo,
            others4_org_permission: user.others4orgpermission,
            others5_title: user.others5title,
            others5_first_name: user.others5firstname,
            others5_last_name: user.others5lastname,
            //others5_dob: user.others5dob,
            others5_age: user.others5age,
            others5_gender: user.others5gender,
            others5_ethnic: user.others5ethnic,
            others5_disability: user.others5disability,
            others5_religion: user.others5religion,
            others5_trans: user.others5trans,
            others5_sexuality: user.others5sexuality,
            others5_nationality: user.others5nationality,
            others5_add_1: user.others5add1,
            others5_add_2: user.others5add2,
            others5_town: user.others5town,
            others5_post_code: user.others5postcode,
            others5_tel: user.others5tel,
            others5_mob: user.others5mob,
            others5_relationship: user.others5relationship,
            others5_school: user.others5school,
            others5_org_name: user.others5orgname,
            others5_org_first_name: user.others5orgfirstname,
            others5_org_last_name: user.others5orglastname,
            others5_org_role: user.others5orgrole,
            others5_org_title: user.others5orgtitle,
            others5_org_email: user.others5orgemail,
            others5_org_add_1: user.others5orgadd1,
            others5_org_add_2: user.others5orgadd2,
            others5_org_town: user.others5orgtown,
            others5_org_post_code: user.others5orgpostcode,
            others5_org_tel: user.others5orgtel,
            others5_org_mob: user.others5orgmob,
            others5_org_best_time: user.others5orgbesttime,
            others5_org_preferred_contact: user.others5orgpreferredcontact,
            others5_org_feedback: user.others5orgfeedback,
            others5_org_info: user.others5orginfo,
            others5_org_permission: user.others5orgpermission,
            general_similar_before: user.generalsimilarbefore,
            general_similar_details: user.generalsimilardetails,
            general_desired_outcome: user.generaldesiredoutcome,
            general_support_needs: user.generalsupportneeds
        });
    }
    thisCase.save().then(function(model, err) {
        // then go to casesPage
        if (err) {
            console.log(err);
        }
        casesPage(req, res, next);
    });

};


// search Cases
var casesPage = function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/signin');
    } else if (!isEmpty(req.query.searchBy)) {
        // if there's been an actual query! (if someone searches for case)
        console.log(req.user.attributes.access_level);

        var searchBy = req.query.searchBy;
        if (searchBy === 'log-no') {
            casePromise = new Model.Cases()
                .where({
                    log_number: req.query.searchFor
                })
                .fetchAll()
                .then(function(aCase) {
                    res.json(aCase);
                });
        }
        if (searchBy === 'lastname') {
            casePromise = new Model.Cases()
                .where({
                    vic_last_name: req.query.searchFor
                })
                .fetchAll()
                .then(function(aCase) {
                    res.json(aCase);
                });
        }
        if (searchBy === 'referrer-org') {
            casePromise = new Model.Cases()
                .where({
                    ref_organisation: req.query.searchFor
                })
                .fetchAll()
                .then(function(aCase) {
                    res.json(aCase);
                });
        }
        if (searchBy === 'referring-person') {
            casePromise = new Model.Cases()
                .where({
                    ref_first_name: req.query.searchFor
                })
                .fetchAll()
                .then(function(aCase) {
                    res.json(aCase);
                });
        }
        if (searchBy === 'dob') {
            casePromise = new Model.Cases()
                .where({
                    victim_dob: req.query.searchFor
                })
                .fetchAll()
                .then(function(aCase) {
                    res.json(aCase);
                });
        }
    } else if (!isEmpty(req.query.case)) {
        // if there's been an actual query! (if someone requests log data)
        console.log('logRequest for caseid', req.query.case, 'and logtype', req.query.logtype);
        var logRequestCaseId = req.query.case;
        var logRequestType = req.query.logtype;
        var logPromise;
        logPromise = new Model.Cases({
            case_id: logRequestCaseId
        }).fetch({
            withRelated: [logRequestType]
        }).then(function(aCase) {
            console.log(JSON.stringify(aCase.related(logRequestType)));
            res.json(aCase.related(logRequestType));
        });
        // res.render('cases', {
        //     title: 'Case maintenance',
        //     //logPromise: logPromise
        // });
    } else {
        res.render('cases', {
            title: 'Case maintenance'
        });
    }
};

// Save case logs
// cw action log
var saveCaseLogs = function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/signin');
    } else {
        var logBody = req.body;
        var saveLog;
        if (logBody.logtable === 'cwactions') {
            saveLog = new Model.CwActions({
                //cw_action_id: logBody.cwactionid,
                case_id: logBody.caseid,
                //action_date: logBody.actiondate,
                caseworker_name: logBody.caseworkername,
                issue: logBody.issue,
                risk: logBody.risk,
                goal: logBody.goal,
                victims_state: logBody.victimsstate,
                action_type: logBody.actiontype,
                action: logBody.action,
                //completed_date: logBody.completeddate,
                outcome: logBody.outcome,
                victims_state_vv: logBody.victimsstatevv,
                review: logBody.review,
                three_months: logBody.threemonths,
                six_months: logBody.sixmonths
            });
        }
        if (logBody.logtable === 'volunteeractions') {
            console.log('save vol');
            saveLog = new Model.VolunteerActions({
                //volunteer_action_id: logBody.volunteeractionid,
                case_id: logBody.caseid,
                //action_date: logBody.actiondate,
                issue: logBody.issue,
                risk: logBody.risk,
                goal: logBody.goal,
                victims_state: logBody.victimsstate,
                action_type: logBody.actiontype,
                action: logBody.action,
                //completed_date: logBody.completeddate,
                outcome: logBody.outcome,
                victims_state_vv: logBody.victimsstatevv,
                review: logBody.review,
                three_months: logBody.threemonths,
                six_months: logBody.sixmonths
            });
        }
        if (logBody.logtable === 'clientcontactlog') {
            console.log('save cli cont');
            saveLog = new Model.ClientContactLog({
                //client_contact_id: logBody.clientcontactid,
                case_id: logBody.caseid,
                //date: logBody.date,
                time: logBody.time,
                contact_type: logBody.contacttype,
                num_supported: logBody.numsupported,
                other_support: logBody.othersupport,
                name: logBody.name,
                att_documents: logBody.attdocuments,
                outcomes: logBody.outcomes,
                vv_worker: logBody.vvworker,
                agreed_contact_time: logBody.agreedcontacttime,
                contact_details: logBody.contactdetails
            });
        }
        if (logBody.logtable === 'orgcontactlog') {
            console.log('save org cont');
            saveLog = new Model.OrganisationContactLog({
                //organisation_contact_id: logBody.organisationcontactid,
                case_id: logBody.caseid,
                contact_name: logBody.contactname,
                organisation_name: logBody.organisationname,
                area: logBody.area,
                role: logBody.role,
                contact_type: logBody.contacttype,
                permission: logBody.permission,
                contact_reason: logBody.contactreason,
                att_documents: logBody.att_documents,
                vv_worker: logBody.vvworker,
                agreed_contact_time: logBody.agreedcontacttime,
                contact_details: logBody.contactdetails
            });
        }
        //TODO satisfaction survey
        //TODO interventions log
        if (logBody.logtable === 'outreachlog') {
            console.log('save outreach');
            saveLog = new Model.OutreachLog({
                //outreach_log_id: outreachlogid,
                case_id: caseid,
                goal: goal,
                main_contact: maincontact,
                role: role,
                //date: date,
                outreach_type: outreachtype,
                group: group,
                num_participants: numparticipants,
                length_time: lengthtime,
                att_documents: att_documents,
                follow_up: followup,
                outcomes: outcomes,
                vv_worker_1: vvworker1,
                vv_worker_2: vvworker2,
                vv_worker_3: vvworker3,
                vv_worker_4: vvworker4,
                vv_worker_5: vvworker5
            });
        }


        saveLog.save().then(function(model) {
            // then go to casesPage
            // TODO this should keep current case open
            casesPage(req, res, next);
        });

        res.redirect('/cases');
    }
};

// case worker action logs
var logRequest = function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/signin');
    } else {
        res.render('cases', {
            title: 'Case maintenance'
        });
    }
};


// sign out
var signOut = function(req, res, next) {
    if (!req.isAuthenticated()) {
        notFound404(req, res, next);
    } else {
        req.logout();
        res.redirect('/signin');
    }
};


// 404 not found
var notFound404 = function(req, res, next) {
    res.status(404);
    res.render('404', {
        title: '404 Not Found'
    });
};



// export functions
/**************************************/
// index
module.exports.index = index;

// sigin in
// GET
module.exports.signIn = signIn;
// POST
module.exports.signInPost = signInPost;

// sign up
// GET
module.exports.signUp = signUp;
// POST
module.exports.signUpPost = signUpPost;

// cases
// casesPage GET
module.exports.casesPage = casesPage;
// POST
module.exports.newCasePost = newCasePost;


//POST saveCaseLogs
module.exports.saveCaseLogs = saveCaseLogs;
// sign out
module.exports.signOut = signOut;

// 404 not found
module.exports.notFound404 = notFound404;

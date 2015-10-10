var DB = require('./db').DB;

var User = DB.Model.extend({
    tableName: 'tblusers',
    idAttribute: 'userid',
});


var Cases = DB.Model.extend({
    tableName: 'casedetails',
    idAttribute: 'case_id',
    cwactions: function() {
        return this.hasMany(CwActions, 'case_id');
    },
    volunteeractions: function() {
        return this.hasMany(VolunteerActions, 'case_id');
    },
    clientcontactlog: function() {
        return this.hasMany(ClientContactLog, 'case_id');
    },
    organisationcontactlog: function() {
        return this.hasMany(OrganisationContactLog, 'case_id');
    },
    outreachlog: function() {
        return this.hasMany(OutreachLog, 'case_id');
    },
});


var CwActions = DB.Model.extend({
    tableName: 'cwactionsheet',
    idAttribute: 'cw_action_id',
    caseId: function() {
        return this.belongsTo(Cases);
    }
});

var VolunteerActions = DB.Model.extend({
    tableName: 'volunteeractionsheet',
    idAttribute: 'volunteer_action_id',
    caseId: function() {
        return this.belongsTo(Cases);
    }
});

var ClientContactLog = DB.Model.extend({
    tableName: 'clientcontactlog',
    idAttribute: 'client_contact_id',
    caseId: function() {
        return this.belongsTo(Cases);
    }
});

var OrganisationContactLog = DB.Model.extend({
    tableName: 'organisationcontactlog',
    idAttribute: 'organisation_contact_id',
    caseId: function() {
        return this.belongsTo(Cases);
    }
});

var OutreachLog = DB.Model.extend({
    tableName: 'outreachlog',
    idAttribute: 'outreach_log_id',
    caseId: function() {
        return this.belongsTo(Cases);
    }
});

var EnquiryLog = DB.Model.extend({
    tableName: 'enqirylog',
    idAttribute: 'enqiry_log_id',
});


module.exports = {
    User: User,
    Cases: Cases,
    CwActions:CwActions,
    VolunteerActions:VolunteerActions,
    ClientContactLog:ClientContactLog,
    OrganisationContactLog:OrganisationContactLog,
    OutreachLog:OutreachLog,
    EnquiryLog: EnquiryLog
};

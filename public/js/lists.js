var Lists = (function() {
    var referral = ['victim self referral',
        'witness',
        '3rd party agency',
        'family or friend',
        'carer/support worker',
        'Victim Support',
        'police',
        'witness care unit',
        'anonymous',
        'local authority',
        'local GP',
        'mental health team',
        'SARCS',
        'IAPT Service',
        'DV Vol Sector Service',
        'Social care',
        'education',
        'housing services',
        'other'
    ];

    var prefer = ['letter',
        'email',
        'phone',
        'phone mobile',
        'text',
        'other'
    ];

    var tenure = ['owner occupier',
        'private rented',
        'council property',
        'social housing',
        'homeless',
        'residential',
        'other',
    ];

    var places = ['home',
        'shop',
        'car park',
        'park',
        'town',
        'street',
        'school',
        'college',
        'PoW',
        'Public Transport',
        'bus stop',
        'pub/restaurant',
        'cinema',
        'work',
        'organisation premises',
        'beach',
        'residential care'
    ];

    var towns = ['Accrington',
        'Bacup',
        'Bamber Bridge',
        'Barnoldswick',
        'Blackburn',
        'Blackpool',
        'Burnley',
        'Burscough',
        'Carnforth',
        'Chapeltown',
        'Chorley',
        'Clitheroe',
        'Colne',
        'Darwen',
        'Fleetwood',
        'Garstang',
        'Great Harwood',
        'Kirkby Lonsdale',
        'Lancaster',
        'Leyland',
        'Lytham St Annes',
        'Morecambe',
        'Nelson',
        'Ormskirk',
        'Padiham',
        'Poulton Le Fylde',
        'Preston',
        'Rossendale',
        'Skelmersdale',
        'Thornton Cleveleys',
        'Todmorden',
        'other'
    ];

    var transport = ['bus',
        'tram',
        'taxi',
        'minibus',
        'train',
        'underground',
        'other'
    ];

    var fiveormore = ['1',
        '2',
        '3',
        '4',
        '5 or more',
        'don\'t know'
    ];

    var reason = ['disability',
        'gender identity',
        'race or ethnicity',
        'religion or belief',
        'sexuality',
        'nationality',
        'age',
        'mental illness',
        'alt sub culture',
        'other'
    ];

    var title = ['Mr',
        'Mrs',
        'Miss',
        'Ms',
        'Dr',
        'other'
    ];

    var form = [
        'abuse- verbal/gestures',
        'arson',
        'cyberbullying',
        'emotional abuse',
        'gang involvement',
        'harassment',
        'missile',
        'sexual',
        'written/printed',
        'abuse- phone/text/email',
        'criminal damage',
        'extremist organisation',
        'disputes/threats',
        'graffiti',
        'mate crime',
        'physical violence',
        'weapons',
        'other'
    ];

    var influences = ['alcohol',
        'drugs',
        'not known'
    ];

    var contact = [
        'phone',
        'email',
        'f2f',
        'group',
        'consultation'

    ];

    var clientcontact = [
        'initial',
        'advice',
        'signposting',
        'reassurance',
        'case feedback',
        'advocacy meeting',
        'introduction',
        'new incident',
        'emotional support',
        'consultation',
        'CAF/TAF',
        'group',
        'risk assessment',
        'advocacy phoning',
        'mediation',
        'intro vol buddy',
        'vol buddy contact',
    ];

    var contactorg = ['update re their client',
        'referral',
        'advocacy',
        'update on case',
        'seeking information on case',
        'arranging meeting',
        'feedback',
        'chasing up',
        'thanking',
        'meeting',
        'information sharing',
        'asking about their service',
        'referring to VV outreach',
        'seeking update',
        'arranging outreach',
        'hate crime awareness',
        'schools session',
        'community action',
        'multi agency meeting',
        'client/perpetrator med',
        'family mediation',
        'community mediation',
        'intro vol buddy',
        'vol buddy contact',
        'vv 3 month satisfaction',
        'vv 6 month satifaction',
    ];

    var victimbefore = [
        'suicidal feelings',
        'anxiety',
        'depression',
        'social isolation',
        'lack of support',
        'not accessing services',
        'some support',
        'does not feel confident in CJS',
        'wants to move',
        'loss of confidence',
        'angry',
        'feeling helpless',
        'not coping',
        'not aware of victims charter',
        'needs support to access services',
        'not claiming all benefits',
        'feels unsafe'
    ];

    var victimafter = [
        'no suicidal feelings',
        'improved mental health',
        'improved physical health',
        'feeling of well-being',
        'feels in control',
        'feels safe',
        'does not want to move',
        'accessing support services',
        'accessing further education',
        'accessing all benefits',
        'improved self-confidence',
        'confidence to report incidents',
        'confident in CJS',
        'reduced social isolation',
        'feels able to cope',
        'accessing peer support',
        'understands rights'
    ];

    var outreach = ['poster campaign',
        'radio',
        'newspaper article',
        'social media campaign',
        'hate crime awareness',
        'stand',
        'assembly',
        'consultation',
        'community action',
        'presentation',
        'conference',
        'special project',
        'reassurance',
        'leaflet drop',
        'roadshow',
        'children\'s activities at event',
        'community event',
        'vv training',
        'third party training',
        'launch',
        'teaching resource pilot',
        'classroom',
        'craft activities'
    ];

    var enquiry = ['individual report',
        'intervention request',
        '3rd party report',
        'agency referral',
        'outreach school',
        'outreach college',
        'outreach organisation',
        'media',
        'information',
        'outreach community',
        'other'
    ];

    var way = [
        'phone',
        'email',
        'tweet',
        'facebook',
        'letter',
        'online report',
        'drop in'
    ];

    var how = [
        'leaflet',
        'poster',
        'agency',
        'website',
        'twitter',
        'facebook',
        'media campaign',
        'friend/colleague',
        'roadshow',
        'outreach',
        'intervention',
        'used us before',
        'letter',
        'consultation'
    ];


    var flags = [
        'Mental health',
        'Self-harm risk',
        'Suicide risk',
        'Needs interpreter',
        'Lip reads',
        'Learning disability',
        'Reading difficulties',
        'Blind/partially sighted',
        'Deaf/hard of hearing',
        'Domestic abuse risk',
        'Pets',
        'Aggressive',
        'Do not visit at home',
        'Joint visits only',
        'Do not call',
        'Warrant for arrest',
        'hoarding',
        'smoker',
        'please read notes on file',
        'please speak to …….'
    ];
    var gender = [
        'male ',
        'female',
        'prefer not to say'
    ];
    var ethnic = [
        'White British/English/Welsh/Scottish/Northern Irish',
        'White Irish',
        'White Gypsy or Irish Traveller',
        'Any other White background, please write',
        'Mixed White & Black Caribbean',
        'Mixed White & Black African',
        'Mixed White & Asian',
        'Any other Mixed Heritage background, please write',
        'Asian British ',
        'Asian Indian',
        'Asian Pakistani',
        'Asian Bangladeshi',
        'Asian Chinese',
        'Any other Asian background, please write',
        'Black British',
        'Black African',
        'Black Caribbean',
        'Any other Black background, please write',
        'Arab',
        'Any other ethnic background, please write'
    ];
    var religion = [
        'Buddhist',
        'Christian',
        'Hindu',
        'Jewish',
        'Muslim',
        'Sikh',
        'Atheist',
        'not stated',
        'no religion',
        'other'
    ];
    var nationality = [
        'British',
        'Indian',
        'Polish',
        'Pakistani',
        'Irish',
        'German',
        'Bangladeshi',
        'South African',
        'Chinese',
        'American',
        'Nigerian',
        'Romanian',
        'Italian',
        'French',
        'Sri Lankan',
        'Lithuanian',
        'Jamaican',
        'Kenyan',
        'Filipino',
        'Portuguese',
        'Australian',
        'Zimbabwean',
        'Spainish',
        'Somalian',
        'Latvian',
        'Ghanaian',
        'Canadian',
        'Turkish',
        'Afghanistani',
        'Iranian',
        'Hungarian',
        'Iraqi',
        'Slovakian',
        'Nepalese',
        'Dutch',
        'Bulgarian',
        'Malaysian',
        'New Zealander',
        'Cypriot',
        'Greek',
        'Ugandan',
        'Brazilian',
        'Singaporean',
        'Czech ',
        'Mauritian',
        'Russian',
        'Thai',
        'Taiwanese',
        'Egyptian',
        'Saudi Arabian',
        'Tanzanian',
        'Zambian',
        'Japanese',
        'Vietnamese',
        'Maltese',
        'Swedish',
        'Danish',
        'Congolese',
        'Libyan',
        'Colombian',
        'Sierra Leonean',
        'other, please write'
    ];
    var genderid = [
        'Agender',
        'Androgynous',
        'Bigender',
        'Cisgender',
        'FTM',
        'MTF',
        'Gender Fluid',
        'Gender Nonconforming',
        'Gender Variant',
        'Genderqueer',
        'Intersex',
        'Neutrois',
        'Non-binary',
        'Pangender',
        'Trans*',
        'Trans Man',
        'Trans Woman',
        'Trans Person',
        'Transgender',
        'Transsexual',
        'other, please write'
    ];
    var sexuality = [
        'Asexual',
        'Bisexual',
        'Gay Man',
        'Gay Woman',
        'Lesbian',
        'Heterosexual',
        'Pansexual',
        '0ther, please write'
    ];

    $.get('/fetchusers', function(data) {
        var name;
        data.forEach(function(user) {
            name = user.firstname + " " + user.lastname;
            users.push(name);
        });
        console.log(users);
        fillSelect(users, 'users');
    });
    $.get('/fetchcaseworkers', function(data) {
        var name;
        data.forEach(function(user) {
            name = user.firstname + " " + user.lastname;
            caseworkers.push(name);
        });
        console.log(caseworkers);
        fillSelect(caseworkers, 'caseworkers');
    });
    var caseworkers = [];
    var users = [];


    return {
        referral: referral,
        prefer: prefer,
        tenure: tenure,
        places: places,
        towns: towns,
        transport: transport,
        fiveormore: fiveormore,
        reason: reason,
        title: title,
        form: form,
        influences: influences,
        contact: contact,
        clientcontact: clientcontact,
        contactorg: contactorg,
        victimbefore: victimbefore,
        victimafter: victimafter,
        outreach: outreach,
        enquiry: enquiry,
        way: way,
        how: how,
        flags: flags,
        gender: gender,
        ethnic: ethnic,
        nationality: nationality,
        sexuality: sexuality,
        religion: religion,
        genderid: genderid,

        caseworkers: caseworkers,
        users: users
    };

})();

function fillSelect(list, name) {
    var option = '';
    for (var i = 0; i < list.length; i++) {
        option += '<option value="' + list[i] + '">' + list[i] + '</option>';
    }
    $("select[data-list='" + name + "']").append(option);
}

for (var list in Lists) {
    fillSelect(Lists[list], list);
}


// <select name="search-by" id="search-by">
//     <option value="log-no">Log number</option>
//     <option value="lastname">Last name</option>
//     <option value="referrer-org">Referring organisation</option>
//     <option value="referring-person">Name of person referring</option>
//     <option value="dob">Date of birth</option>
// </select>

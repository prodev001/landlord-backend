export default {
  APPLICATION_FIELD_MAPPING: {
    expected_move_in_date: 'Expected_move_in_date__c',
    sf_property_id: 'Apartment_Building__c',
    application_id: 'Application_Id__c',
  },
  CONTACT_FIELD_MAPPING: {
    is_us_citizen: 'US_Citizen_or_Green_Card__c',
    first_name: 'firstName',
    last_name: 'lastName',
    mailing_street: 'MailingStreet',
    mailing_state: 'MailingState',
    mailing_city: 'MailingCity',
    mailing_postalcode: 'MailingPostalCode',
    email: 'email',
    phone: 'Phone',
    dob: 'Date_of_Birth__c',
    employer_name: 'Employer_Name__c',
    job_title: 'Job_Title__c',
  },
  CONTACT_FILE_FIELDS_MAPPING: {
    driver_license: 'Driver_License',
    pay_stubs: 'Pay Stubs',
    bank_statement: 'Bank Statement',
  },
  US_CITIZEN_VALUES: {
    yes: 'Yes',
    no: 'No',
  },
  FILE_FIELDS_CONTACTS: ['driver_license', 'pay_stubs', 'bank_statement'],
  CONDITIONAL_FILE_FIELDS_CONTACTS: ['h1b_workvisa', 'passport'],
  ERROR_EMAIL_TEMPLATE:
    'Hey,\n The Properties of <landlord_name> could not be uploaded in salesforce due to the following reasons.\n\n<reasons>\n\nPlease reach out to the <landlord_name> Team and onboard the Landlord again in salesforce.',
  NOTIFICATION_EMAIL_TEMPLATE:
    'Hey,\nAll the Properties of the <landlord_name> have been uploaded successfully in salesforce.',
  DOCUMENT_UPLOAD_FAILURE_EMAIL_SUBJECT:
    'Error! <Application Name> documents of Property Id (xxx) did not push successfully to Entrata from AWS.',
  DOCUMENT_UPLOAD_FAILURE_EMAIL_TEMPLATE:
    'Hey,\nPlease check the error log <PMSAPI Log record link> for more details.',
  GET_APPLICATIONS_FAILURE_EMAIL_SUBJECT:
    'Error in getting <application Type> Applications from Entrata for PropertyId : (xxx) of <landlord Name>',
  SCHEMA_MAPPING: {
    testing: 'testing',
    staging: 'public',
    development: 'public',
    production: 'public',
  },
};

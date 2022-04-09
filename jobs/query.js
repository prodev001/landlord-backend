const landlord = `select 
                    id,
                    NAME, 
                    PHONE, 
                    PRIMARY_CONTACT__R.NAME, 
                    BillingStreet, 
                    BillingCity, 
                    BillingState, 
                    BillingPostalCode, 
                    BillingCountry, 
                    EMAIL_ADDRESS__C, 
                    NUMBER_OF_RESIDENTIAL_BUILDINGS__C, 
                    NUMBER_OF_UNITS__C, 
                    Createddate, 
                    RecordType.Name, 
                    RecordTypeId, 
                    ParentId, 
                    LANDLORD_PRIMARY_CONTACT_EMAIL_RPT__C, 
                    Last_Visit_Date__c
                    from Account
                    where RecordTypeId= '0121I000001BpU2QAK'`

const building = `select 
                    id,
                    NAME, 
                    BUILDING_TYPE__C, 
                    PHONE, 
                    BILLINGSTREET, 
                    PRIMARY_CONTACT__C, 
                    EMAIL_ADDRESS__C, 
                    STUDENT_HOUSING__C, 
                    LANDLORD__R.NAME, 
                    Primary_Contact__r.Email, 
                    PROPERTY_OWNER__C, 
                    TOTAL_OF_UNITS__C, 
                    TOTAL_OF_ACTIVE_LEAP_UNITS__C, 
                    Leap_of_Total_Inventory__c, 
                    Estimated_Applicant_Decline_Rate__c, 
                    Building_Approval_Rate__c, 
                    TOTAL_OF_ISSUED_POLICIES__C, 
                    TOTAL_OF_APPLICATIONS__C, 
                    TOTAL_OF_CANCELLED_APPLICATIONS__C, 
                    TOTAL_OF_DECLINED_APPLICATIONS__C, 
                    LAST_APPLICATION_DATE__C, 
                    Building_Approved_to_Issue_Rate__c, 
                    Cancellation_Percentage__c, 
                    TOTAL_OF_DECISIONED_APPLICATIONS__C, 
                    TOTAL_OF_APPROVED_APPLICATIONS__C, 
                    Decline_Percentage__c, 
                    BILLINGSTATE,
                    Createddate, 
                    BILLINGCITY 
                    from Account 
                    where RecordTypeId= '0121I000001BpU7QAK'`

export default {
    landlord,
    building
}
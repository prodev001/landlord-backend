export default {
  PMS_DICT: {
    ENTRATA: 'entrata',
    REALPAGE: 'realpage',
  },
  PMS_LIST: ['entrata', 'realpage'],
  PMS_PICK_LIST: { entrata: 'Entrata', realpage: 'Real Page' },
  ENTRATA_CONSTANTS: {
    MOVE_OUT_TYPE: 'Actual Move Out',
    REQUEST_TYPE: {
      'content-type': 'application/json',
    },
    RENEWAL_LEASE_STATUS_LIST: [
      'Renewal Offer Started',
      'Renewal Lease Started',
      'Renewal Offer Approved',
      'Renewal Lease Approved',
      'Renewal Offer Cancelled',
    ],
    NON_NEW_APPS: ['06 - Policy Declined', 'Cancelled Application'],
    URL_CONSTANTS: {
      BASE_URL: 'https://<ENTRATA_DOMAIN>.entrata.com/api/v1/<RESOURCE>',
      RESOURCES: [
        'properties',
        'leases',
        'leads',
        'customers',
        'artransactions',
      ],
    },
  },
};

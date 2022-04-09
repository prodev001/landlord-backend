import jsforce from 'jsforce';

async function get_sf_connection() {
    // var conn = new jsforce.Connection({
    //     oauth2 : {
    //     loginUrl : 'https://test.salesforce.com',
    //     clientId : process.env.SALESFORCE_CLIENT_ID,
    //     clientSecret : process.env.SALESFORCE_CLIENT_SECRET,
    //     redirectUri : 'http://localhost:8000'
    //     }
    // })
    // await conn.login(process.env.SALESFORCE_USERNAME, process.env.SALESFORCE_PASSWORD);

    var conn = new jsforce.Connection({
        oauth2 : {
            loginUrl : 'https://leapeasy.my.salesforce.com',
            clientId : '3MVG9g9rbsTkKnAX925KsU1i9q4UNWvw_fce23xIJIgem4GvXKgWBlQ4WJs_DKx0jr8yEh0ZmzL2PglXHhjH2',
            clientSecret : '962395177E8C7EFA4453EE227C5C07380A550D331EAA89DCF8DEE7315B4671DF',
            redirectUri : 'http://localhost:8000/'
        }
    })
    await conn.login('leapeasy@accelerize360.com', 'laflKR1<INi684gDuhAqwiA4BxrMqRIwPqIfhT');

    return conn;
}

async function add_sf_log() {
  
}

export default get_sf_connection;

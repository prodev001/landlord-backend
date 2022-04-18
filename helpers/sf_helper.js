import jsforce from 'jsforce';

async function get_sf_connection() {
    try {
        // var conn = new jsforce.Connection({
        //     oauth2 : {
        //     loginUrl : 'https://test.salesforce.com',
        //     clientId : process.env.DEV_SF_CLIENT_ID,
        //     clientSecret : process.env.DEV_SF_CLIENT_SECRET,
        //     redirectUri : 'http://localhost:8000' 
        //     }
        // })
        // await conn.login(process.env.DEV_SF_USERNAME, process.env.DEV_SF_PASSWORD);
        var conn = new jsforce.Connection({
            oauth2 : {
                loginUrl : process.env.SF_URL,
                clientId : process.env.SF_CLIENT_ID,
                clientSecret : process.env.SF_CLIENT_SECRET,
                redirectUri : 'http://localhost:8000/'
            }
        })
        await conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD);
        console.log('connected SF');
        return conn;
    } catch (error) {
        console.log(error);
    }
}

export default get_sf_connection;

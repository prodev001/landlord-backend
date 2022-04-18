
import get_sf_connection from '../helpers/sf_helper';
import query from "../helpers/query";
import Application_repository from "../controllers/application_controller";

let data = [];

const nextQuery = async (url, sf_conn) => {
    try {
        await sf_conn.queryMore(url, function(err, ret) {
            if (err) {
              return console.error(err);
            }
            data = data.concat(ret.records);
            if(!ret.done) {
              nextQuery(ret.nextRecordsUrl, sf_conn);
            } else {
              Application_repository.create(data);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

async function onboard () {
    let sf_conn = await get_sf_connection();
    try {
        await sf_conn.query(
            query.application,
            function(err, ret) {
              if (err) {
                return console.error(err);
              }
                data = data.concat(ret.records);
                if(!ret.done) {
                  nextQuery(ret.nextRecordsUrl, sf_conn)     
                } else {
                  Application_repository.create(data);
                }
              }
            )
    } catch (error) {
        console.log(error);
    }
  } 

export default {
    onboard
}
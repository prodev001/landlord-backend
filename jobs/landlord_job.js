
import get_sf_connection from '../helpers/sf_helper';
import query from "../helpers/query";
import Landlord_repository from "../controllers/landlord_controller";
import User_repository from "../controllers/user_controller";

let data = [];

const nextQuery = async (url, sf_conn) => {
    sf_conn.queryMore(url, function(err, ret) {
        if (err) {
          return console.error(err)
        }
        data = data.concat(ret.records);
        if(!ret.done) {
            nextQuery(ret.nextRecordsUrl, sf_conn);
        } else {
            Landlord_repository.create(data);
            User_repository.create(data);
        }
    });
}

async function onboard () {
  let sf_conn = await get_sf_connection();
  await sf_conn.query(
    query.landlord,
    function(err, ret) {
      if (err) {
        return console.error(err)
      }
        data = data.concat(ret.records);
        console.log(data);
        // if(!ret.done) {
        //     nextQuery(ret.nextRecordsUrl, sf_conn)     
        // } else {
        //   Landlord_repository.create(data);
        //   User_repository.create(data);
        // }
      }
    )
  } 

export default {
    onboard
}
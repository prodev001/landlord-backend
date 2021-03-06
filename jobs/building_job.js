
import get_sf_connection from '../helpers/sf_helper';
import query from "../helpers/query";
import Building_repository from "../controllers/building_controller";

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
            Building_repository.create(data);
        }
    });
}

async function onboard () {
    let sf_conn = await get_sf_connection();
    await sf_conn.query(
      query.building,
      function(err, ret) {
        if (err) {
          return console.error(err)
        }
        data = data.concat(ret.records);
        if(!ret.done) {
            nextQuery(ret.nextRecordsUrl, sf_conn)     
        } else {
            Building_repository.create(data);
        }
      }
    )
  } 

export default {
    onboard
}
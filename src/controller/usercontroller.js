import bcrypt from 'bcryptjs';
import dbConnection from '../db-config.js';
import userQueries from '../queries/userqueries.js';
import query from '../utils/query.js';


// ex. localhost:3000/api/user/me
const getMe = async (req, res) => {

  if(!req.user){
    return res.status(401).send('Unauthorized');
  }

  const getDbConnection = await dbConnection().catch(err => { throw err});

  const me = await query(getDbConnection, userQueries.GET_USER_BY_ID, [req.user.id]).catch(err => { 
    return res.status(500).send('Error retrieving user from database');
  });

  res.status(200).send(me);
};

const updateUser = async (req, res) => {
  if(!req.user){
    return res.status(401).send('Unauthorized');
  }

  const getDbConnection = await dbConnection().catch(err => { throw err});
  const userWithPass = await query(getDbConnection, userQueries.GET_USER_BY_ID_WITH_PASSWORD, [req.user.id]).catch(err => { 
    return res.status(500).send('Error retrieving user from database');
  });

  //check if password is changed
  const passwordUnchanged = await bcrypt
    .compare(req.body.password, userWithPass[0].password)
    .catch(err => { return res.status(500).send('Error comparing passwords'); });

  if(!passwordUnchanged) {  
    const passwordHash = bcrypt.hashSync(req.body.password);
    const updateUserInfoRequest = await query(getDbConnection, userQueries.UPDATE_USER, [req.body.username, req.body.email, passwordHash, req.user.id]).catch(err => { 
      return res.status(500).send('Could not update user settings.');
    });
    
    if (updateUserInfoRequest.affectedRows != 0) {
      return res.status(404).send('Update successful.');
    } 
  }
  res.status(200).send('Nothing to update.');
};

export default {
  getMe,
  updateUser
};
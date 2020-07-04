import connection from '../../dbConnection';

const Query = {
  users: () => query(findUsersSQL),
  words: () => query(findWordsSQL),
};

const query = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) return reject(error);
      return resolve(results);
    });
  });
};

const findUsersSQL = 'SELECT id, login FROM `users`';
const findWordsSQL = 'SELECT eng_word, ru_word FROM `dictionary`';

export default Query;

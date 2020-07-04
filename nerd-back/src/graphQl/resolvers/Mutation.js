import connection from "../../dbConnection";

const Mutation = {
  addWord: (parent, args, context, info) => insertDictionary(args),
  editWord: (parent, args, context, info) => editDictionary(args),
  deleteWord: (parent, args, context, info) => deleteDictionary(args),
};

const insertDictionary = (args) => {
  const insertWord = `INSERT INTO dictionary (id, user_id, eng_word, ru_word) VALUES (NULL, '1', '${args.data.eng_word}', '${args.data.ru_word}')`;
  return new Promise((resolve, reject) => {
    connection.query(insertWord, (error, results) => {
      if (error) return reject(error);
      return resolve({
        eng_word: args.data.eng_word,
        ru_word: args.data.ru_word,
      });
    });
  });
};

const deleteDictionary = (args) => {
  const insertWord = `DELETE FROM dictionary WHERE dictionary.eng_word = '${args.eng_word}'`;
  return new Promise((resolve, reject) => {
    connection.query(insertWord, (error, results) => {
      if (error) return reject(error);
      return resolve({
        eng_word: args.eng_word,
      });
    });
  });
};

const editDictionary = (args) => {
  const insertWord = `UPDATE dictionary SET eng_word = '${args.new_eng_word}', ru_word = '${args.new_ru_word}' WHERE eng_word='${args.edited_eng_word}'`;
  return new Promise((resolve, reject) => {
    connection.query(insertWord, (error, results) => {
      if (error) return reject(error);
      return resolve({
        eng_word: args.new_eng_word,
        ru_word: args.new_ru_word,
      });
    });
  });
};

export default Mutation;
